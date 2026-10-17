#!/usr/bin/env node
// Mengukur akurasi resolver ucapan OFFLINE (app/js/resolver.js) pada kalimat uji yang tidak dipakai untuk melatih.
//
//   node tools/cek_resolver.mjs            # ringkasan + gagal bila di bawah ambang
//   node tools/cek_resolver.mjs --rinci    # cetak setiap kesalahan
//   node tools/cek_resolver.mjs --rinci 07 # hanya stasiun tertentu
//
// Data: tests/ucapan/NN.json (parafrase per aksi). Hanya 3 parafrase pertama per aksi yang dimuat aplikasi
// (app/data/ucapan.js, dibuat tools/buat_ucapan.py); parafrase ke-4 (dev) dan ke-5 (uji) tidak pernah dilatih.
// Kalimat uji ditulis oleh LLM, bukan oleh kandidat sungguhan; angka di sini batas bawah-atas untuk kualitas
// teknis pencocok, bukan jaminan akurasi pada ucapan nyata (lihat docs/aplikasi.md).
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const akar = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = path.join(akar, 'app');
const rinci = process.argv.includes('--rinci');
const hanya = process.argv.slice(2).filter((a) => /^\d\d$/.test(a));

// Ambang minimum (diperbarui bila resolver membaik; sengaja sedikit di bawah hasil terukur).
const AMBANG = { top1_uji: 0.7, negatif: 0.8, ganda_recall: 0.5, isian_presisi: 0.0 };
const LATIH = 3;

const g = { console };
g.window = g; g.globalThis = g;
vm.createContext(g);
const muat = (f) => vm.runInContext(fs.readFileSync(path.join(app, f), 'utf8'), g, { filename: f });
muat('data/stasiun-data.js'); muat('js/engine.js'); muat('js/logika.js');
for (let i = 1; i <= 14; i++) muat('data/interaksi/' + String(i).padStart(2, '0') + '.js');
muat('js/resolver.js');
const OSCE = g.OSCE;

const dirData = path.join(akar, 'tests', 'ucapan');
if (!fs.existsSync(dirData)) { console.log('Belum ada data di tests/ucapan; dilewati.'); process.exit(0); }

const tot = { uji: [0, 0], dev: [0, 0], neg: [0, 0], gandaTP: 0, gandaFP: 0, gandaFN: 0, isTP: 0, isFP: 0, isFN: 0 };
const galat = [];
const baris = [];

for (const st of OSCE.daftarStasiun()) {
  if (hanya.length && !hanya.includes(st.id)) continue;
  const berkas = path.join(dirData, `ucapan_${st.id}.json`);
  if (!fs.existsSync(berkas)) continue;
  const d = JSON.parse(fs.readFileSync(berkas, 'utf8'));
  const ids = new Set(OSCE.semuaAksi(st.interaksi).map((a) => a.id));
  const latih = { aksi: {}, keluarga: [] };
  for (const [id, u] of Object.entries(d.aksi || {})) { if (!ids.has(id)) galat.push(`${st.id}: id tak dikenal ${id}`); latih.aksi[id] = u.slice(0, LATIH); }
  for (const k of d.keluarga || []) latih.keluarga.push({ ids: k.ids, ucapan: k.ucapan.slice(0, LATIH) });
  const ix = OSCE.resolver.bangun(st, { ucapan: latih });
  const sedia = () => true;
  const s = { uji: [0, 0], dev: [0, 0], neg: [0, 0] };
  const cek = (kelompok, u, benar, pesan) => {
    s[kelompok][1]++; tot[kelompok][1]++;
    if (benar) { s[kelompok][0]++; tot[kelompok][0]++; } else if (rinci) console.log(`  [${st.id} ${kelompok}] ${pesan}`);
  };
  for (const [id, u] of Object.entries(d.aksi || {})) {
    [[3, 'dev'], [4, 'uji']].forEach(([i, k]) => {
      if (!u[i]) return;
      const r = OSCE.resolver.cocokkan(ix, u[i], { tersedia: sedia });
      cek(k, u[i], r.aksi.length && r.aksi[0].id === id, `"${u[i]}" → ${r.aksi.map((a) => a.id).join(',') || '(kosong)'}  (harapan ${id}; skor ${Math.round(r.skorTertinggi * 100) / 100})`);
    });
  }
  for (const k of d.keluarga || []) {
    k.ucapan.slice(LATIH).forEach((u, j) => {
      const r = OSCE.resolver.cocokkan(ix, u, { tersedia: sedia });
      cek(j === 0 ? 'dev' : 'uji', u, r.aksi.length && k.ids.includes(r.aksi[0].id), `"${u}" → ${r.aksi.map((a) => a.id).join(',') || '(kosong)'}  (harapan salah satu ${k.ids.join('/')})`);
    });
  }
  for (const u of d.negatif || []) {
    const r = OSCE.resolver.cocokkan(ix, u, { tersedia: sedia });
    cek('neg', u, r.aksi.length === 0, `NEGATIF "${u}" → ${r.aksi.map((a) => a.id).join(',')}`);
  }
  for (const gd of d.ganda || []) {
    const r = OSCE.resolver.cocokkan(ix, gd.ucapan, { tersedia: sedia });
    const hasil = new Set(r.aksi.map((a) => a.id)), harap = new Set(gd.aksi);
    for (const x of hasil) { if (harap.has(x)) tot.gandaTP++; else tot.gandaFP++; }
    for (const x of harap) if (!hasil.has(x)) tot.gandaFN++;
    if (rinci && (hasil.size !== harap.size || [...harap].some((x) => !hasil.has(x)))) console.log(`  [${st.id} ganda] "${gd.ucapan}" → ${[...hasil].join(',') || '(kosong)'}  (harapan ${[...harap].join(',')})`);
  }
  for (const it of d.isian || []) {
    const h = OSCE.resolver.ekstrak(ix, it.ucapan);
    const rata = {};
    Object.values(h).forEach((o) => Object.assign(rata, o));
    for (const [b, v] of Object.entries(rata)) {
      const e = it.bidang[b];
      const nilai = Array.isArray(v) ? v : [v];
      const harap = Array.isArray(e) ? e : e === undefined ? [] : [e];
      nilai.forEach((x) => { if (harap.some((y) => String(y) === String(x))) tot.isTP++; else tot.isFP++; });
    }
    for (const [b, e] of Object.entries(it.bidang)) {
      const v = rata[b];
      const nilai = Array.isArray(v) ? v : v === undefined ? [] : [v];
      (Array.isArray(e) ? e : [e]).forEach((y) => { if (!nilai.some((x) => String(x) === String(y))) tot.isFN++; });
    }
  }
  const pct = (a) => (a[1] ? Math.round((a[0] / a[1]) * 100) + '%' : '-');
  baris.push(`${st.id} ${st.judul.slice(0, 44).padEnd(44)} dev ${pct(s.dev).padStart(4)} (${s.dev[0]}/${s.dev[1]})  uji ${pct(s.uji).padStart(4)} (${s.uji[0]}/${s.uji[1]})  negatif ${pct(s.neg).padStart(4)} (${s.neg[0]}/${s.neg[1]})`);
}

console.log(baris.join('\n'));
const r1 = (x) => Math.round(x * 1000) / 10;
const top1Uji = tot.uji[1] ? tot.uji[0] / tot.uji[1] : 0;
const top1Dev = tot.dev[1] ? tot.dev[0] / tot.dev[1] : 0;
const neg = tot.neg[1] ? tot.neg[0] / tot.neg[1] : 1;
const gR = tot.gandaTP + tot.gandaFN ? tot.gandaTP / (tot.gandaTP + tot.gandaFN) : 1;
const gP = tot.gandaTP + tot.gandaFP ? tot.gandaTP / (tot.gandaTP + tot.gandaFP) : 1;
const iP = tot.isTP + tot.isFP ? tot.isTP / (tot.isTP + tot.isFP) : 1;
const iR = tot.isTP + tot.isFN ? tot.isTP / (tot.isTP + tot.isFN) : 1;
console.log(`\nTOTAL top-1 dev ${r1(top1Dev)}% · top-1 uji ${r1(top1Uji)}% (${tot.uji[0]}/${tot.uji[1]}) · negatif benar ditolak ${r1(neg)}% (${tot.neg[0]}/${tot.neg[1]})`);
console.log(`ganda: recall ${r1(gR)}% presisi ${r1(gP)}% · isian offline: presisi ${r1(iP)}% recall ${r1(iR)}%`);
const gagal = [];
if (top1Uji < AMBANG.top1_uji) gagal.push(`top-1 uji ${r1(top1Uji)}% < ${AMBANG.top1_uji * 100}%`);
if (neg < AMBANG.negatif) gagal.push(`negatif ${r1(neg)}% < ${AMBANG.negatif * 100}%`);
if (gR < AMBANG.ganda_recall) gagal.push(`ganda recall ${r1(gR)}% < ${AMBANG.ganda_recall * 100}%`);
galat.forEach((m) => gagal.push(m));
if (gagal.length) { console.log('\nGAGAL:\n - ' + gagal.join('\n - ')); process.exit(1); }
console.log('Resolver offline memenuhi ambang.');
