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
// Pembatasan: hanya POST; model dari daftar boleh; tanpa stream, tools, atau server MCP; max_tokens dibatasi;
// ukuran badan dibatasi. Batas laju per alamat IP sebaiknya dipasang lewat "Rate limiting rules" Cloudflare.
// Berkas ini diuji dengan fetch tiruan (tools/uji_llm.mjs); belum diuji pada Cloudflare sungguhan.

const MODEL_BOLEH = ['claude-haiku-5-5'];
const MAKS_TOKEN = 1500;
const MAKS_BADAN = 80 * 1024;
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
    badan.max_tokens = Math.min(Number(badan.max_tokens) || 1024, MAKS_TOKEN);

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
