#!/usr/bin/env node
// Mengukur akurasi resolver ucapan OFFLINE (app/js/resolver.js) dengan leave-one-out.
//
//   node tools/cek_resolver.mjs            # ringkasan; gagal bila di bawah ambang
//   node tools/cek_resolver.mjs --rinci    # cetak tiap kesalahan
//   node tools/cek_resolver.mjs --rinci 07 # hanya stasiun tertentu
//
// Data: tests/ucapan/ucapan_NN.json, lima parafrase per aksi yang ditulis LLM (bukan kandidat sungguhan).
// Untuk tiap posisi k=1..5, indeks dibangun dari label + empat parafrase lain lalu parafrase ke-k diuji
// (tidak pernah ikut melatih indeksnya). Kalimat negatif (harus ditolak), majemuk, dan isian form diuji pada
// indeks penuh yang dipakai aplikasi. Hasilnya batas kualitas teknis pencocok kata, BUKAN jaminan akurasi pada
// ucapan kandidat sungguhan; leksikon dan ambang disetel dengan melihat data ini, jadi angkanya agak optimistis.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const akar = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = path.join(akar, 'app');
const rinci = process.argv.includes('--rinci');
const hanya = process.argv.slice(2).filter((a) => /^\d\d$/.test(a));

// Ambang minimum untuk CI (sedikit di bawah hasil terukur supaya perubahan kecil tidak menggagalkan).
const AMBANG = { benar: 0.44, salah: 0.17, negatif: 0.85, gandaRecall: 0.75, isianPresisi: 0.75 };

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

const tot = { benar: 0, salah: 0, kosong: 0, peringkat: 0, n: 0, neg: [0, 0], gTP: 0, gFP: 0, gFN: 0, iTP: 0, iFP: 0, iFN: 0 };
const galat = [];
const baris = [];
const sedia = () => true;

for (const st of OSCE.daftarStasiun()) {
  if (hanya.length && !hanya.includes(st.id)) continue;
  const berkas = path.join(dirData, `ucapan_${st.id}.json`);
  if (!fs.existsSync(berkas)) continue;
  const d = JSON.parse(fs.readFileSync(berkas, 'utf8'));
  const ids = new Set(OSCE.semuaAksi(st.interaksi).map((a) => a.id));
  Object.keys(d.aksi || {}).forEach((id) => { if (!ids.has(id)) galat.push(`${st.id}: id tak dikenal ${id}`); });
  (d.keluarga || []).forEach((k) => k.ids.forEach((id) => { if (!ids.has(id)) galat.push(`${st.id}: id keluarga tak dikenal ${id}`); }));
  (d.ganda || []).forEach((x) => x.aksi.forEach((id) => { if (!ids.has(id)) galat.push(`${st.id}: id ganda tak dikenal ${id}`); }));
  const s = { benar: 0, salah: 0, kosong: 0, n: 0 };
  for (let k = 0; k < 5; k++) {
    const latih = { aksi: {}, keluarga: [] };
    for (const [id, u] of Object.entries(d.aksi || {})) latih.aksi[id] = u.filter((_, i) => i !== k);
    for (const kel of d.keluarga || []) latih.keluarga.push({ ids: kel.ids, ucapan: kel.ucapan.filter((_, i) => i !== k) });
    const ix = OSCE.resolver.bangun(st, { ucapan: latih });
    const uji = [];
    for (const [id, u] of Object.entries(d.aksi || {})) if (u[k]) uji.push([u[k], [id]]);
    for (const kel of d.keluarga || []) if (kel.ucapan[k]) uji.push([kel.ucapan[k], kel.ids]);
    for (const [u, harap] of uji) {
      const r = OSCE.resolver.cocokkan(ix, u, { tersedia: sedia, maks: 1 });
      const r0 = OSCE.resolver.cocokkan(ix, u, { tersedia: sedia, maks: 1, ambang: { satu: 0, margin: 0 } });
      s.n++; tot.n++;
      if (r0.aksi.length && harap.includes(r0.aksi[0].id)) tot.peringkat++;
      if (!r.aksi.length) { s.kosong++; tot.kosong++; if (rinci) console.log(`  [${st.id} kosong] "${u}"  (harapan ${harap.join('/')}${r.ambigu ? '; ambigu ' + r.ambigu.join('/') : ''})`); }
      else if (harap.includes(r.aksi[0].id)) { s.benar++; tot.benar++; }
      else { s.salah++; tot.salah++; if (rinci) console.log(`  [${st.id} SALAH] "${u}" → ${r.aksi[0].id}  (harapan ${harap.join('/')})`); }
    }
  }
  // indeks penuh (yang dikirim ke aplikasi)
  const penuh = { aksi: d.aksi || {}, keluarga: d.keluarga || [] };
  const ix = OSCE.resolver.bangun(st, { ucapan: penuh });
  let negOk = 0;
  for (const u of d.negatif || []) {
    const r = OSCE.resolver.cocokkan(ix, u, { tersedia: sedia });
    tot.neg[1]++;
    if (!r.aksi.length) { negOk++; tot.neg[0]++; } else if (rinci) console.log(`  [${st.id} NEGATIF] "${u}" → ${r.aksi.map((a) => a.id).join(',')}`);
  }
  for (const gd of d.ganda || []) {
    const r = OSCE.resolver.cocokkan(ix, gd.ucapan, { tersedia: sedia });
    const hasil = new Set(r.aksi.map((a) => a.id)), harap = new Set(gd.aksi);
    for (const x of hasil) { if (harap.has(x)) tot.gTP++; else tot.gFP++; }
    for (const x of harap) if (!hasil.has(x)) tot.gFN++;
    if (rinci && ([...harap].some((x) => !hasil.has(x)) || hasil.size !== harap.size)) console.log(`  [${st.id} ganda] "${gd.ucapan}" → ${[...hasil].join(',') || '(kosong)'}  (harapan ${[...harap].join(',')})`);
  }
  for (const it of d.isian || []) {
    const h = OSCE.resolver.ekstrak(ix, it.ucapan);
    const rata = {};
    Object.values(h).forEach((o) => Object.assign(rata, o));
    for (const [b, v] of Object.entries(rata)) {
      const e = it.bidang[b];
      const harap = Array.isArray(e) ? e : e === undefined ? [] : [e];
      (Array.isArray(v) ? v : [v]).forEach((x) => { if (harap.some((y) => String(y) === String(x))) tot.iTP++; else tot.iFP++; });
    }
    for (const [b, e] of Object.entries(it.bidang)) {
      const v = rata[b];
      const nilai = Array.isArray(v) ? v : v === undefined ? [] : [v];
      (Array.isArray(e) ? e : [e]).forEach((y) => { if (!nilai.some((x) => String(x) === String(y))) tot.iFN++; });
    }
  }
  const pct = (a, n) => (n ? String(Math.round((a / n) * 100)).padStart(3) + '%' : '  - ');
  baris.push(`${st.id} ${st.judul.slice(0, 40).padEnd(40)} benar ${pct(s.benar, s.n)}  salah ${pct(s.salah, s.n)}  tak dipahami ${pct(s.kosong, s.n)}  (n=${s.n})  negatif ditolak ${negOk}/${(d.negatif || []).length}`);
}

console.log(baris.join('\n'));
const r1 = (x) => Math.round(x * 1000) / 10;
const benar = tot.n ? tot.benar / tot.n : 0, salah = tot.n ? tot.salah / tot.n : 0, kosong = tot.n ? tot.kosong / tot.n : 0;
const neg = tot.neg[1] ? tot.neg[0] / tot.neg[1] : 1;
const gR = tot.gTP + tot.gFN ? tot.gTP / (tot.gTP + tot.gFN) : 1, gP = tot.gTP + tot.gFP ? tot.gTP / (tot.gTP + tot.gFP) : 1;
const iP = tot.iTP + tot.iFP ? tot.iTP / (tot.iTP + tot.iFP) : 1, iR = tot.iTP + tot.iFN ? tot.iTP / (tot.iTP + tot.iFN) : 1;
console.log(`\nLOO (${tot.n} kalimat): benar ${r1(benar)}% · salah pilih ${r1(salah)}% · tak dipahami ${r1(kosong)}% · peringkat-1 tanpa ambang ${r1(tot.peringkat / tot.n)}%`);
console.log(`negatif ditolak ${r1(neg)}% (${tot.neg[0]}/${tot.neg[1]}) · majemuk: recall ${r1(gR)}% presisi ${r1(gP)}% · isian offline: presisi ${r1(iP)}% recall ${r1(iR)}%`);
const gagal = [];
if (benar < AMBANG.benar) gagal.push(`benar ${r1(benar)}% < ${AMBANG.benar * 100}%`);
if (salah > AMBANG.salah) gagal.push(`salah pilih ${r1(salah)}% > ${AMBANG.salah * 100}%`);
if (neg < AMBANG.negatif) gagal.push(`negatif ditolak ${r1(neg)}% < ${AMBANG.negatif * 100}%`);
if (gR < AMBANG.gandaRecall) gagal.push(`majemuk recall ${r1(gR)}% < ${AMBANG.gandaRecall * 100}%`);
if (iP < AMBANG.isianPresisi) gagal.push(`isian presisi ${r1(iP)}% < ${AMBANG.isianPresisi * 100}%`);
galat.forEach((m) => gagal.push(m));
if (gagal.length) { console.log('\nGAGAL:\n - ' + gagal.join('\n - ')); process.exit(1); }
console.log('Resolver offline memenuhi ambang.');
