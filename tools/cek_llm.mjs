#!/usr/bin/env node
// Mengukur akurasi pemahaman ucapan oleh LLM SUNGGUHAN (Claude Haiku 5.5) memakai data tests/ucapan, dengan
// modul yang sama dengan aplikasi (app/js/llm.js). Dijalankan PEMILIK repo dengan kunci API sendiri; tidak ikut CI.
//
//   ANTHROPIC_API_KEY=sk-ant-... node tools/cek_llm.mjs [--n=120] [--stasiun=01,07] [--konkurensi=4]
//   node tools/cek_llm.mjs --proxy=https://nama.workers.dev --kode=KODE_AKSES [--n=120]
//   node tools/cek_llm.mjs --simulasi        # uji kabel alat ini dengan server tiruan (tanpa kunci, tanpa biaya)
//
// Biaya: tiap ucapan ≈ 2-3 ribu token masukan (sebagian besar dari cache setelah panggilan pertama per stasiun) dan
// puluhan token keluaran; alat ini mencetak perkiraan dolar dari penggunaan nyata (harga Haiku 5.5: $0,10 / $0,50 per
// juta token masukan/keluaran; baca cache 0,1x; tulis cache 1,25x). Mulai dari --n kecil.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const akar = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = path.join(akar, 'app');
const arg = (nama, awal) => { const a = process.argv.find((x) => x.startsWith('--' + nama + '=')); return a ? a.slice(nama.length + 3) : awal; };
const simulasi = process.argv.includes('--simulasi');
const N = Number(arg('n', 120));
const konkurensi = Math.max(1, Number(arg('konkurensi', 4)));
const hanya = arg('stasiun', '') ? arg('stasiun', '').split(',') : [];
const proxy = arg('proxy', '');
const kode = arg('kode', process.env.KODE_AKSES || '');
const kunci = process.env.ANTHROPIC_API_KEY || '';
if (!simulasi && !proxy && !kunci) { console.error('Butuh ANTHROPIC_API_KEY, atau --proxy=URL --kode=KODE, atau --simulasi.'); process.exit(2); }

const g = { console, setTimeout, clearTimeout, AbortController, Date, URL };
g.window = g; g.globalThis = g;
vm.createContext(g);
const muat = (f) => vm.runInContext(fs.readFileSync(path.join(app, f), 'utf8'), g, { filename: f });
muat('data/stasiun-data.js'); muat('js/engine.js'); muat('js/logika.js');
for (let i = 1; i <= 14; i++) muat('data/interaksi/' + String(i).padStart(2, '0') + '.js');
muat('js/resolver.js'); muat('js/llm.js');
const OSCE = g.OSCE;

// sampel deterministik
let benih = 20261017;
const acak = () => { benih = (benih * 1664525 + 1013904223) % 4294967296; return benih / 4294967296; };

// kumpulkan kasus
const kasus = [];
for (const st of OSCE.daftarStasiun()) {
  if (hanya.length && !hanya.includes(st.id)) continue;
  const f = path.join(akar, 'tests', 'ucapan', `ucapan_${st.id}.json`);
  if (!fs.existsSync(f)) continue;
  const d = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [id, us] of Object.entries(d.aksi || {})) us.forEach((u, i) => kasus.push({ st, jenis: 'aksi', ucapan: u, harap: [id], pos: i }));
  for (const k of d.keluarga || []) k.ucapan.forEach((u, i) => kasus.push({ st, jenis: 'aksi', ucapan: u, harap: k.ids, pos: i }));
  for (const u of d.negatif || []) kasus.push({ st, jenis: 'negatif', ucapan: u, harap: [] });
  for (const x of d.ganda || []) kasus.push({ st, jenis: 'ganda', ucapan: x.ucapan, harap: x.aksi });
  for (const x of d.isian || []) kasus.push({ st, jenis: 'isian', ucapan: x.ucapan, bidang: x.bidang });
}
for (let i = kasus.length - 1; i > 0; i--) { const j = Math.floor(acak() * (i + 1)); [kasus[i], kasus[j]] = [kasus[j], kasus[i]]; }
const sampel = kasus.slice(0, N);

// server tiruan untuk --simulasi: jawab sesuai kunci jawaban (menguji kabel dan perhitungan, bukan model)
let server = null;
if (simulasi) {
  const peta = new Map(sampel.map((k) => [k.ucapan, k]));
  server = http.createServer((req, res) => {
    let b = ''; req.on('data', (d) => { b += d; });
    req.on('end', () => {
      const pesan = JSON.parse(JSON.parse(b).messages[0].content);
      const k = peta.get(pesan.ucapan);
      const ket = { aksi: k && k.jenis !== 'isian' ? k.harap.slice(0, 1) : [], pilihan: [], angka: [], tidak_dipahami: !k || k.jenis === 'negatif' };
      if (k && k.jenis === 'ganda') ket.aksi = k.harap;
      if (k && k.jenis === 'isian') for (const [bid, v] of Object.entries(k.bidang)) { if (typeof v === 'number') ket.angka.push({ bidang: bid, nilai: v }); else ket.pilihan.push({ bidang: bid, opsi: Array.isArray(v) ? v : (v === true ? ['ya'] : [v]) }); }
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ stop_reason: 'end_turn', content: [{ type: 'text', text: JSON.stringify(ket) }], usage: { input_tokens: 2400, output_tokens: 30, cache_read_input_tokens: 2300 } }));
    });
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  const dasar = `http://127.0.0.1:${server.address().port}`;
  g.fetch = (u, i) => fetch(String(u).replace('https://api.anthropic.com', dasar), i);
  OSCE.llm.atur({ mode: 'langsung', kunci: 'simulasi' });
} else {
  g.fetch = fetch;
  if (proxy) OSCE.llm.atur({ mode: 'proxy', proxyUrl: proxy, kodeAkses: kode });
  else OSCE.llm.atur({ mode: 'langsung', kunci });
}

const ix = {};
const stat = { aksiBenar: 0, aksiSalah: 0, aksiKosong: 0, aksi: 0, negBenar: 0, neg: 0, gTP: 0, gFP: 0, gFN: 0, iTP: 0, iFP: 0, iFN: 0, galat: 0, masuk: 0, keluar: 0, cacheBaca: 0, ms: [] };
const galatKode = {};
const salah = [];

async function proses(k) {
  const st = k.st;
  ix[st.id] = ix[st.id] || OSCE.resolver.bangun(st, { ucapan: { aksi: {}, keluarga: [] } });
  try {
    const h = await OSCE.llm.pahami(st, k.ucapan, { sudah: [], riwayat: [], indeks: ix[st.id], batasWaktu: 30000 });
    stat.ms.push(h.ms);
    if (h.pemakaian) { stat.masuk += h.pemakaian.masuk; stat.keluar += h.pemakaian.keluar; stat.cacheBaca += h.pemakaian.cacheBaca; }
    if (k.jenis === 'aksi') {
      stat.aksi++;
      if (!h.aksi.length) { stat.aksiKosong++; salah.push(`[${st.id} kosong] "${k.ucapan}" (harapan ${k.harap.join('/')})`); }
      else if (k.harap.includes(h.aksi[0])) stat.aksiBenar++;
      else { stat.aksiSalah++; salah.push(`[${st.id} SALAH] "${k.ucapan}" → ${h.aksi[0]} (harapan ${k.harap.join('/')})`); }
    } else if (k.jenis === 'negatif') {
      stat.neg++;
      if (!h.aksi.length) stat.negBenar++; else salah.push(`[${st.id} NEGATIF] "${k.ucapan}" → ${h.aksi.join(',')}`);
    } else if (k.jenis === 'ganda') {
      const hasil = new Set(h.aksi), harap = new Set(k.harap);
      for (const x of hasil) { if (harap.has(x)) stat.gTP++; else stat.gFP++; }
      for (const x of harap) if (!hasil.has(x)) stat.gFN++;
    } else if (k.jenis === 'isian') {
      const rata = {};
      Object.values(h.isian).forEach((o) => Object.assign(rata, o));
      for (const [b, v] of Object.entries(rata)) {
        const e = k.bidang[b]; const harap = Array.isArray(e) ? e : e === undefined ? [] : [e];
        (Array.isArray(v) ? v : [v]).forEach((x) => { if (harap.some((y) => String(y) === String(x))) stat.iTP++; else { stat.iFP++; salah.push(`[${st.id} isian] "${k.ucapan}" ${b}=${JSON.stringify(v)} (harapan ${JSON.stringify(e)})`); } });
      }
      for (const [b, e] of Object.entries(k.bidang)) {
        const v = rata[b]; const nilai = Array.isArray(v) ? v : v === undefined ? [] : [v];
        (Array.isArray(e) ? e : [e]).forEach((y) => { if (!nilai.some((x) => String(x) === String(y))) stat.iFN++; });
      }
    }
  } catch (e) {
    stat.galat++; galatKode[e.kode || 'lain'] = (galatKode[e.kode || 'lain'] || 0) + 1;
    if (e.kode === 'auth') { console.error('Kunci/kode akses ditolak: ' + e.message); process.exit(3); }
  }
}

let nxt = 0, selesai = 0;
async function pekerja() { while (nxt < sampel.length) { const k = sampel[nxt++]; await proses(k); selesai++; if (selesai % 25 === 0 || selesai === sampel.length) console.log(`  ${selesai}/${sampel.length}…`); } }
console.log(`Mengevaluasi ${sampel.length} kalimat (dari ${kasus.length}) dengan ${konkurensi} pekerja${simulasi ? ' [SIMULASI: server tiruan]' : ''}.`);
await Promise.all(Array.from({ length: konkurensi }, pekerja));
if (server) server.close();

const p = (a, b) => (b ? Math.round((a / b) * 1000) / 10 + '%' : '-');
const harga = (stat.masuk - stat.cacheBaca) * 0.10 / 1e6 + stat.cacheBaca * 0.01 / 1e6 + stat.keluar * 0.50 / 1e6;
stat.ms.sort((a, b) => a - b);
console.log(`\nLLM (${OSCE.llm.MODEL}), ${sampel.length} kalimat, galat ${stat.galat} ${JSON.stringify(galatKode)}`);
console.log(`aksi tunggal: benar ${p(stat.aksiBenar, stat.aksi)} · salah pilih ${p(stat.aksiSalah, stat.aksi)} · tak dipahami ${p(stat.aksiKosong, stat.aksi)} (n=${stat.aksi})`);
console.log(`negatif ditolak ${p(stat.negBenar, stat.neg)} (n=${stat.neg}) · majemuk recall ${p(stat.gTP, stat.gTP + stat.gFN)} presisi ${p(stat.gTP, stat.gTP + stat.gFP)}`);
console.log(`isian: presisi ${p(stat.iTP, stat.iTP + stat.iFP)} recall ${p(stat.iTP, stat.iTP + stat.iFN)}`);
if (stat.ms.length) console.log(`latensi: median ${stat.ms[Math.floor(stat.ms.length / 2)]} ms, p90 ${stat.ms[Math.floor(stat.ms.length * 0.9)]} ms`);
console.log(`token: masuk ${stat.masuk} (cache ${stat.cacheBaca}), keluar ${stat.keluar} → perkiraan biaya $${harga.toFixed(4)}`);
if (process.argv.includes('--rinci')) console.log('\n' + salah.join('\n'));
else if (salah.length) console.log(`\n${salah.length} kesalahan; jalankan dengan --rinci untuk daftar.`);
process.exit(stat.galat > sampel.length * 0.2 ? 1 : 0);
