// Proxy LLM untuk Simulator OSCE (Cloudflare Workers atau runtime fetch-standar lain).
//
// Peran: menyimpan kunci API Anthropic di sisi server agar tidak berada di peramban peserta. Peramban mengirim
// persis badan permintaan /v1/messages yang dibuat app/js/llm.js, plus header `x-kode-akses`. Proxy hanya
// meneruskan permintaan yang lolos pembatasan di bawah ini.
//
// Variabel lingkungan (Workers: Settings → Variables):
//   ANTHROPIC_API_KEY   (secret)  kunci API milik lembaga
//   KODE_AKSES          (secret)  kode bersama untuk hari ujian; ganti setelah ujian
//   ASAL_DIIZINKAN      (teks)    daftar Origin dipisah koma, mis. https://matahana.github.io
//
// Pembatasan: hanya POST; model dari daftar boleh; badan harus berbentuk persis permintaan penerjemah ucapan dari
// app/js/llm.js (satu blok system, SATU pesan user berupa JSON kecil, skema keluaran dikunci, tanpa field lain);
// max_tokens dan ukuran dibatasi. Opsional SISTEM_SHA256 (daftar hash dipisah koma, dibuat oleh
// tools/proxy-llm/hash_prompt.mjs) mengunci prompt sistem ke prompt stasiun yang dikenal.
// Maksudnya mencegah proxy dipakai sebagai asisten umum atau jalur gratis ke kunci lembaga oleh klien yang
// dipalsukan. Origin dan kode akses TIDAK menjamin siapa pelakunya (Origin dapat dipalsukan di luar peramban;
// kode akses terlihat di devtools peserta), jadi pasang juga "Rate limiting rules" Cloudflare dan pantau pemakaian.
// Berkas ini diuji dengan fetch tiruan (tools/uji_llm.mjs); belum diuji pada Cloudflare sungguhan.

const MODEL_BOLEH = ['claude-haiku-5-5'];
const MAKS_TOKEN = 600;
const MAKS_BADAN = 80 * 1024;
const MAKS_SISTEM = 24 * 1024;
const MAKS_PESAN = 8 * 1024;
const MAKS_UCAPAN = 600;
const KUNCI_TINGKAT_ATAS = ['model', 'max_tokens', 'system', 'messages', 'output_config'];
const KUNCI_PESAN = ['ucapan', 'sudah_dilakukan', 'percakapan_sebelumnya'];
// Harus sama dengan OSCE.llm.SKEMA di app/js/llm.js (diuji di tools/uji_llm.mjs).
export const SKEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['aksi', 'pilihan', 'angka', 'tidak_dipahami'],
  properties: {
    aksi: { type: 'array', items: { type: 'string' } },
    pilihan: {
      type: 'array',
      items: { type: 'object', additionalProperties: false, required: ['bidang', 'opsi'], properties: { bidang: { type: 'string' }, opsi: { type: 'array', items: { type: 'string' } } } }
    },
    angka: {
      type: 'array',
      items: { type: 'object', additionalProperties: false, required: ['bidang', 'nilai'], properties: { bidang: { type: 'string' }, nilai: { type: 'number' } } }
    },
    tidak_dipahami: { type: 'boolean' }
  }
};
const SKEMA_JSON = JSON.stringify(SKEMA);

const adalahObjek = (x) => !!x && typeof x === 'object' && !Array.isArray(x);
const hanyaKunci = (obj, boleh) => Object.keys(obj).every((k) => boleh.includes(k));

async function sha256(teks) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(teks));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Mengembalikan pesan galat bila badan bukan permintaan penerjemah ucapan yang sah; null bila sah.
async function periksaBentuk(badan, env) {
  if (!hanyaKunci(badan, KUNCI_TINGKAT_ATAS)) return 'Field di luar yang diizinkan';
  const sistem = badan.system;
  if (!Array.isArray(sistem) || sistem.length !== 1 || !adalahObjek(sistem[0]) || sistem[0].type !== 'text' || typeof sistem[0].text !== 'string') return 'Prompt sistem tidak sah';
  if (!hanyaKunci(sistem[0], ['type', 'text', 'cache_control'])) return 'Prompt sistem tidak sah';
  if (sistem[0].cache_control !== undefined && JSON.stringify(sistem[0].cache_control) !== '{"type":"ephemeral"}') return 'Prompt sistem tidak sah';
  if (!sistem[0].text || sistem[0].text.length > MAKS_SISTEM) return 'Prompt sistem tidak sah';
  const pin = String(env.SISTEM_SHA256 || '').split(',').map((x) => x.trim().toLowerCase()).filter(Boolean);
  if (pin.length && !pin.includes(await sha256(sistem[0].text))) return 'Prompt sistem tidak dikenal';
  const pesan = badan.messages;
  if (!Array.isArray(pesan) || pesan.length !== 1 || !adalahObjek(pesan[0]) || pesan[0].role !== 'user' || !hanyaKunci(pesan[0], ['role', 'content'])) return 'Pesan tidak sah';
  const isi = pesan[0].content;
  if (typeof isi !== 'string' || isi.length > MAKS_PESAN) return 'Pesan tidak sah';
  let d;
  try { d = JSON.parse(isi); } catch (e) { return 'Pesan tidak sah'; }
  if (!adalahObjek(d) || !hanyaKunci(d, KUNCI_PESAN) || typeof d.ucapan !== 'string' || d.ucapan.length > MAKS_UCAPAN) return 'Pesan tidak sah';
  const oc = badan.output_config;
  if (!adalahObjek(oc) || !hanyaKunci(oc, ['effort', 'format']) || (oc.effort !== undefined && oc.effort !== 'low')) return 'Konfigurasi keluaran tidak sah';
  if (!adalahObjek(oc.format) || oc.format.type !== 'json_schema' || JSON.stringify(oc.format.schema) !== SKEMA_JSON || !hanyaKunci(oc.format, ['type', 'schema'])) return 'Skema keluaran tidak sah';
  return null;
}
const URL_ANTHROPIC = 'https://api.anthropic.com/v1/messages';

function samaAman(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

function kepalaCors(asal, izin) {
  const ok = izin.length && izin.includes(asal);
  return {
    'access-control-allow-origin': ok ? asal : 'null',
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type, x-kode-akses, anthropic-version',
    'access-control-max-age': '600',
    vary: 'Origin'
  };
}

function jawab(status, obj, kepala) {
  return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json', ...kepala } });
}

export default {
  async fetch(req, env) {
    const izin = String(env.ASAL_DIIZINKAN || '').split(',').map((s) => s.trim()).filter(Boolean);
    const asal = req.headers.get('Origin') || '';
    const cors = kepalaCors(asal, izin);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return jawab(405, { error: { type: 'method_not_allowed', message: 'Gunakan POST' } }, cors);
    if (!izin.length || !izin.includes(asal)) return jawab(403, { error: { type: 'forbidden', message: 'Asal tidak diizinkan' } }, cors);
    if (!env.KODE_AKSES || !env.ANTHROPIC_API_KEY) return jawab(500, { error: { type: 'misconfigured', message: 'Proxy belum dikonfigurasi' } }, cors);
    if (!samaAman(req.headers.get('x-kode-akses') || '', env.KODE_AKSES)) return jawab(401, { error: { type: 'unauthorized', message: 'Kode akses salah' } }, cors);

    const teks = await req.text();
    if (teks.length > MAKS_BADAN) return jawab(413, { error: { type: 'too_large', message: 'Badan terlalu besar' } }, cors);
    let badan;
    try { badan = JSON.parse(teks); } catch (e) { return jawab(400, { error: { type: 'bad_request', message: 'JSON tidak valid' } }, cors); }
    if (!badan || typeof badan !== 'object') return jawab(400, { error: { type: 'bad_request', message: 'Badan tidak valid' } }, cors);
    if (!MODEL_BOLEH.includes(badan.model)) return jawab(400, { error: { type: 'bad_request', message: 'Model tidak diizinkan' } }, cors);
    if (badan.stream || badan.tools || badan.mcp_servers || badan.container) return jawab(400, { error: { type: 'bad_request', message: 'Fitur tidak diizinkan' } }, cors);
    const salah = await periksaBentuk(badan, env);
    if (salah) return jawab(400, { error: { type: 'bad_request', message: salah } }, cors);
    badan.max_tokens = Math.min(Number(badan.max_tokens) || MAKS_TOKEN, MAKS_TOKEN);

    let hulu;
    try {
      hulu = await fetch(URL_ANTHROPIC, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': req.headers.get('anthropic-version') || '2023-06-01' },
        body: JSON.stringify(badan)
      });
    } catch (e) {
      return jawab(502, { error: { type: 'upstream_unreachable', message: 'Layanan tidak terjangkau' } }, cors);
    }
    return new Response(hulu.body, { status: hulu.status, headers: { 'content-type': hulu.headers.get('content-type') || 'application/json', ...cors } });
  }
};
