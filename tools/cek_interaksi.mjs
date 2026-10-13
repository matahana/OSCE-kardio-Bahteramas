#!/usr/bin/env node
// Uji konsistensi aplikasi simulasi OSCE (tanpa browser).
//   node tools/cek_interaksi.mjs
//
// Untuk setiap stasiun:
//   1. definisi interaksi konsisten dengan checklist (semua butir punya fungsi skor, id dikenal);
//   2. rencana ideal berjalan tanpa penolakan, bernilai 100%, tanpa tindakan tidak tepat/berisiko,
//      dan selesai sebelum jam habis;
//   3. strategi "klik semua aksi sesuai urutan daftar" tidak mencapai 100% tanpa catatan.
// Keluar dengan kode 1 bila ada yang gagal.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const akar = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = path.join(akar, 'app');

function muatKonteks() {
  const konteks = vm.createContext({ console });
  konteks.window = konteks;
  const muat = (berkas) => vm.runInContext(fs.readFileSync(berkas, 'utf8'), konteks, { filename: berkas });
  muat(path.join(app, 'data', 'stasiun-data.js'));
  muat(path.join(app, 'js', 'engine.js'));
  muat(path.join(app, 'js', 'logika.js'));
  const dir = path.join(app, 'data', 'interaksi');
  for (const f of fs.readdirSync(dir).filter((x) => /^\d\d\.js$/.test(x)).sort()) muat(path.join(dir, f));
  return konteks;
}

const gagal = [];
const catat = (id, pesan) => { gagal.push(`[${id}] ${pesan}`); };
const konteks = muatKonteks();
const OSCE = konteks.OSCE;

for (const id of konteks.OSCE_DATA.urutan) {
  const st = OSCE.ambil(id);
  const masalah = OSCE.periksaInteraksi(id);
  masalah.forEach((m) => catat(id, m));
  if (masalah.length) { console.log(`${id} ${st.judul}: ${masalah.length} masalah konsistensi`); continue; }

  // rencana ideal
  const ideal = OSCE.mulaiSesi(id);
  const galat = OSCE.jalankanRencana(ideal, st.interaksi.ideal);
  galat.forEach((m) => catat(id, 'rencana ideal ditolak: ' + m));
  const e = ideal.evaluasi();
  const kurang = e.butir.filter((b) => b.diperoleh < b.skor).map((b) => `${b.id}(${b.diperoleh}/${b.skor})`);
  if (e.persen !== 100) catat(id, `rencana ideal ${e.persen}% (kurang: ${kurang.join(', ')})`);
  if (e.tidakTepat.length || e.berisiko.length) catat(id, 'rencana ideal memuat tindakan tidak tepat/berisiko');
  if (e.alasanSelesai === 'waktu') catat(id, 'jam habis sebelum rencana ideal selesai');
  if (e.sisa < st.interaksi.waktu * 0.1) catat(id, `sisa waktu rencana ideal terlalu tipis: ${e.sisa} detik`);

  // "klik semua": semua aksi berurutan sampai jam habis; widget/form tidak dijawab
  const asal = OSCE.mulaiSesi(id);
  for (const a of OSCE.semuaAksi(st.interaksi)) { if (asal.selesai) break; asal.lakukan(a.id); }
  const s = asal.evaluasi();
  const aman = s.persen < 100 || s.tidakTepat.length > 0 || s.berisiko.length > 0;
  if (!aman) catat(id, 'strategi "klik semua" mencapai 100% tanpa catatan');

  console.log(
    `${id} ${st.judul}: ideal ${e.persen}% (sisa ${e.sisa}/${st.interaksi.waktu} dtk, ${e.global.label}); ` +
    `klik-semua ${s.persen}% (${s.global.label}, tidak tepat ${s.tidakTepat.length}, berisiko ${s.berisiko.length})`
  );
}

if (gagal.length) {
  console.log('\nGAGAL:\n' + gagal.map((x) => ' - ' + x).join('\n'));
  process.exit(1);
}
console.log('\nSemua stasiun konsisten.');
