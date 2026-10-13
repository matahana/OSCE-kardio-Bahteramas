#!/usr/bin/env node
// Uji end-to-end aplikasi simulasi di Chromium, dibuka dari file:// (tanpa server).
//
//   PLAYWRIGHT_DIR=/jalur/ke/node_modules/playwright node tests/e2e.mjs [--shots=folder]
//
// Tiap stasiun dijalankan lewat antarmuka sesuai "rencana ideal" (hasil harus 100%); jam dibekukan dan
// dimajukan manual untuk widget berbasis waktu (tensimeter, ketukan RJP). Uji lain: beranda tanpa galat,
// tindakan berisiko, mode penguji, riwayat. Keluar dengan kode 1 bila ada yang gagal.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const akar = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const URL_APP = pathToFileURL(path.join(akar, 'app', 'index.html')).href;
const shots = (process.argv.find((a) => a.startsWith('--shots=')) || '').slice(8);
if (shots) fs.mkdirSync(shots, { recursive: true });

async function muatPlaywright() {
  const calon = [process.env.PLAYWRIGHT_DIR, '/opt/node-tools/node_modules/playwright'].filter(Boolean);
  for (const dir of calon) {
    const berkas = path.join(dir, 'index.mjs');
    if (fs.existsSync(berkas)) return import(pathToFileURL(berkas).href);
  }
  return import('playwright');
}

const { chromium } = await muatPlaywright();
const browser = await chromium.launch();
const gagal = [];
const lulus = [];
const cek = (kondisi, pesan) => { (kondisi ? lulus : gagal).push(pesan); if (!kondisi) console.log('  GAGAL: ' + pesan); };

async function halamanBaru(lebar = 1280, tinggi = 900) {
  const ctx = await browser.newContext({ viewport: { width: lebar, height: tinggi } });
  const page = await ctx.newPage();
  page.setDefaultTimeout(15000);
  page.galat = [];
  page.on('pageerror', (e) => page.galat.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') page.galat.push('console: ' + m.text()); });
  page.on('dialog', (d) => d.accept());
  await page.clock.install({ time: new Date('2026-10-13T10:00:00') });
  await page.goto(URL_APP);
  await page.waitForSelector('.beranda');
  await page.clock.pauseAt(new Date('2026-10-13T10:00:05'));
  return page;
}
const foto = async (page, nama) => { if (shots) await page.screenshot({ path: path.join(shots, nama + '.png'), fullPage: false }); };

async function infoStasiun(page, id) {
  return page.evaluate((id) => {
    const d = OSCE.ambil(id).interaksi;
    const panelAksi = {}, panelForm = {};
    d.panel.forEach((p) => {
      if (p.tipe === 'aksi') p.grup.forEach((g) => g.aksi.forEach((a) => { panelAksi[a.id] = p.id; }));
      if (p.tipe === 'form') panelForm[p.id] = p;
    });
    return { ideal: d.ideal, panelAksi, panelForm, panel: d.panel.map((p) => ({ id: p.id, tipe: p.tipe })) };
  }, id);
}

async function buka(page, id) {
  await page.click('a[href="#/briefing/' + id + '"]');
  await page.click('button:has-text("Mulai (")');
  await page.waitForSelector('.ruang');
}
async function pilihTab(page, panel) {
  const tab = page.locator('button.tab[data-panel="' + panel + '"]');
  if ((await tab.getAttribute('aria-selected')) !== 'true') await tab.click();
}
async function isiForm(page, panel, jawab, def) {
  await pilihTab(page, panel);
  for (const b of def.bidang) {
    const v = jawab[b.id];
    const sel = '[data-bidang="' + b.id + '"]';
    if (b.tipe === 'select') await page.selectOption(sel, String(v));
    else if (b.tipe === 'number') await page.fill(sel, String(v));
    else if (b.tipe === 'cek') { if (v) await page.check(sel); }
    else if (b.tipe === 'multi') for (const x of v) await page.check(sel + ' input[value="' + x + '"]');
  }
  await page.click('button:has-text("Kirim jawaban")');
  cek((await page.locator('button.tab[data-panel="' + panel + '"]').innerText()).includes('✓'), 'form ' + panel + ' terkirim');
}

async function ukurTensi(page) {
  await pilihTab(page, 'tensimeter');
  const pompa = page.locator('button:has-text("Pompa (tahan)")');
  await pompa.dispatchEvent('pointerdown');
  await page.clock.runFor(3500);
  await page.click('button:has-text("1. Catat estimasi")');
  await page.clock.runFor(700);
  await pompa.dispatchEvent('pointerup');
  await page.evaluate(() => { const r = document.querySelector('input[type=range]'); r.value = 2; r.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.clock.runFor(17000);
  await fotoSekali(page, '08-tensimeter');
  await page.click('button:has-text("2. Bunyi pertama")');
  await page.clock.runFor(25000);
  await page.click('button:has-text("3. Bunyi menghilang")');
  await page.click('button:has-text("4. Catat pengukuran")');
}

async function ujiKetuk(page, selangMs) {
  await pilihTab(page, 'ketuk');
  await page.click('button:has-text("Mulai uji")');
  const t = page.locator('.tombol-ketuk');
  for (let i = 0; i < 60; i++) {
    await t.dispatchEvent('pointerdown');
    await page.clock.runFor(selangMs);
    if (!(await t.isEnabled())) break;
  }
  await page.clock.runFor(500);
  await fotoSekali(page, '09-ketuk');
}

async function lisSteteskop(page, panel, situs, mode) {
  await pilihTab(page, panel);
  await page.check('input[name="mode-steteskop"][value="' + mode + '"]');
  await page.locator('g.titik[aria-label^="Dengarkan ' + situs + '"]').click();
  await fotoSekali(page, '07-steteskop');
}

const sudahFoto = new Set();
const fotoSekali = async (page, nama) => { if (!sudahFoto.has(nama)) { sudahFoto.add(nama); await foto(page, nama); } };
const NAMA_SITUS = { aorta: 'Aorta', pulmonal: 'Pulmonal', erb: 'Erb', trikuspid: 'Trikuspid', mitral: 'Mitral', karotis: 'Karotis', aksila: 'Aksila' };

async function jalankanIdeal(page, id) {
  const info = await infoStasiun(page, id);
  await buka(page, id);
  for (let i = 0; i < info.ideal.length; i++) {
    const l = info.ideal[i];
    if (typeof l === 'string') {
      await pilihTab(page, info.panelAksi[l]);
      const sebelum = await page.locator('.log-item').count();
      await page.click('button[data-id="' + l + '"]');
      cek((await page.locator('.log-item').count()) > sebelum, id + ' aksi ' + l + ' tercatat');
    } else if (l.form) {
      await isiForm(page, l.form, l.jawab, info.panelForm[l.form]);
    } else if (l.acara && l.acara.startsWith('lis_')) {
      const [, situs, mode] = l.acara.split('_');
      const panel = info.panel.find((p) => p.tipe === 'widget').id;
      await lisSteteskop(page, panel, NAMA_SITUS[situs], mode);
    } else if (l.acara === 'bp_baca') {
      await ukurTensi(page);
      while (info.ideal[i + 1] && info.ideal[i + 1].acara && info.ideal[i + 1].acara.startsWith('bp_')) i++;
    } else if (l.acara === 'rjp_laju') {
      await ujiKetuk(page, 545);
      while (info.ideal[i + 1] && info.ideal[i + 1].acara === 'rjp_laju_ok') i++;
    }
  }
}

async function akhiriDanBaca(page) {
  await page.click('button:has-text("Akhiri stasiun")');
  await page.waitForSelector('.hasil');
  const angka = await page.locator('.skor-besar .angka').innerText();
  const dari = await page.locator('.skor-besar .dari').innerText();
  const persen = await page.locator('.skor-besar .persen').innerText();
  return { angka: Number(angka), maks: Number(dari.replace(/[^\d]/g, '')), persen, merah: await page.locator('.peringatan.merah').count() };
}

try {
  // 1. beranda
  console.log('Beranda');
  let page = await halamanBaru();
  const jumlahBank = await page.evaluate(() => window.OSCE_DATA.urutan.length);
  cek((await page.locator('.kartu').count()) === jumlahBank, `beranda menampilkan seluruh stasiun di bank (${jumlahBank})`);
  const idInteraksi = await page.evaluate(() => window.OSCE_DATA.urutan.filter((i) => OSCE.ambil(i).interaksi));
  cek(idInteraksi.length >= 6, `sedikitnya 6 stasiun punya interaksi (ada ${idInteraksi.length} dari ${jumlahBank})`);
  cek((await page.locator('.kartu a:has-text("Mulai latihan")').count()) === idInteraksi.length, 'setiap stasiun berinteraksi dapat dilatih');
  cek((await page.locator('.kartu :text("Segera hadir")').count()) === jumlahBank - idInteraksi.length, 'stasiun tanpa interaksi berlabel "Segera hadir"');
  await foto(page, '01-beranda');
  cek(page.galat.length === 0, 'beranda tanpa galat: ' + page.galat.join(' | '));
  await page.context().close();

  // 2. rencana ideal per stasiun lewat antarmuka
  for (const id of idInteraksi) {
    console.log('Stasiun ' + id);
    page = await halamanBaru();
    await jalankanIdeal(page, id);
    if (id === '01') await foto(page, '02-ruang-01-selesai');
    const r = await akhiriDanBaca(page);
    cek(r.angka === r.maks && r.persen === '100%', `stasiun ${id}: ${r.angka}/${r.maks} ${r.persen} (harus 100%)`);
    cek(r.merah === 0, `stasiun ${id}: tanpa peringatan merah pada rencana ideal`);
    cek(page.galat.length === 0, `stasiun ${id} tanpa galat: ` + page.galat.join(' | '));
    if (id === '04') await foto(page, '03-hasil-04');
    await page.context().close();
  }

  // 3. tindakan berisiko menurunkan perkiraan penilaian
  console.log('Tindakan berisiko');
  page = await halamanBaru();
  await buka(page, '06');
  await pilihTab(page, 'terapi');
  await page.click('button[data-id="cairan_bolus"]');
  const rb = await akhiriDanBaca(page);
  const global = await page.locator('.chip.global').innerText();
  cek(global.includes('Tidak lulus') && rb.merah >= 1, 'bolus cairan pada gagal jantung → Tidak lulus + peringatan: ' + global);
  cek(page.galat.length === 0, 'tindakan berisiko tanpa galat');
  await page.context().close();

  // 3b. kontrol negatif widget: ukuran/ritme yang salah tidak boleh mendapat poin
  console.log('Kontrol negatif widget');
  page = await halamanBaru();
  await buka(page, '04');
  for (const l of ['salam', 'posisi_duduk', 'tanya_kafein', 'istirahat', 'alat_kalibrasi', 'ukur_lingkar']) {
    await pilihTab(page, l === 'ukur_lingkar' ? 'manset' : 'persiapan');
    await page.click('button[data-id="' + l + '"]');
  }
  await pilihTab(page, 'manset');
  for (const l of ['manset_kecil', 'manset_pasang', 'stetoskop_brakialis']) await page.click('button[data-id="' + l + '"]');
  await pilihTab(page, 'tensimeter');
  const pompa2 = page.locator('button:has-text("Pompa (tahan)")');
  await pompa2.dispatchEvent('pointerdown');
  await page.clock.runFor(3500);
  await page.click('button:has-text("1. Catat estimasi")');
  await page.clock.runFor(700);
  await pompa2.dispatchEvent('pointerup');
  await page.evaluate(() => { const r = document.querySelector('input[type=range]'); r.value = 9; r.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.clock.runFor(8000);
  await page.click('button:has-text("2. Bunyi pertama")');
  await page.clock.runFor(10000);
  await page.click('button:has-text("3. Bunyi menghilang")');
  await page.click('button:has-text("4. Catat pengukuran")');
  await akhiriDanBaca(page);
  const kelasButir = async (id) => page.locator('tr.butir:has(td.id:text-is("' + id + '"))').getAttribute('class');
  cek((await kelasButir('B1')).includes('nol'), 'tensimeter: manset kecil → B1 tidak mendapat poin');
  cek((await kelasButir('B6')).includes('nol'), 'tensimeter: deflasi terlalu cepat → B6 tidak mendapat poin');
  cek((await kelasButir('B7')).includes('nol'), 'tensimeter: manset kecil + deflasi cepat → B7 tidak mendapat poin');
  cek((await kelasButir('B3')).includes('penuh'), 'tensimeter: estimasi palpatoir benar tetap mendapat poin (B3)');
  await page.context().close();

  page = await halamanBaru();
  await buka(page, '05');
  await ujiKetuk(page, 200);
  await akhiriDanBaca(page);
  cek((await page.locator('tr.butir:has(td.id:text-is("B4"))').getAttribute('class')).includes('nol'), 'ketukan 300/menit → B4 tidak mendapat poin');
  await page.context().close();

  // 3c. jalur waktu habis: klik semua aksi sampai jam habis
  console.log('Waktu habis');
  page = await halamanBaru();
  await buka(page, '01');
  const semuaAksi = await page.evaluate(() => OSCE.semuaAksi(OSCE.ambil('01').interaksi).map((a) => a.id));
  for (const aksi of semuaAksi) {
    if (await page.locator('.banner-selesai').isVisible()) break;
    await page.click('button[data-id="' + aksi + '"]');
  }
  cek(await page.locator('.banner-selesai').isVisible(), 'waktu habis memunculkan banner');
  cek((await page.locator('.banner-selesai').innerText()).includes('Waktu habis'), 'banner menyebut waktu habis');
  await page.click('button:has-text("Lihat hasil")');
  await page.waitForSelector('.hasil');
  cek((await page.locator('.hasil').innerText()).includes('Waktu simulasi terpakai'), 'hasil setelah waktu habis tampil');
  cek(page.galat.length === 0, 'jalur waktu habis tanpa galat: ' + page.galat.join(' | '));
  await page.context().close();

  // 4. tampilan ruang simulasi (desktop, EKG, ponsel)
  console.log('Tangkapan layar');
  page = await halamanBaru();
  await buka(page, '06');
  for (const [panel, ids] of [['awal', ['salam', 'nilai_distres', 'duduk', 'monitor', 'o2']], ['anamnesis', ['ortopnea', 'kepatuhan', 'nsaid']], ['periksa', ['jvp', 'paru']]]) {
    await pilihTab(page, panel);
    for (const i of ids) await page.click('button[data-id="' + i + '"]');
  }
  await foto(page, '10-ruang-06');
  await page.context().close();
  page = await halamanBaru();
  await buka(page, '02');
  await foto(page, '04-ruang-02-ekg');
  await page.context().close();
  page = await halamanBaru(390, 844);
  await buka(page, '01');
  await page.click('button[data-id="salam"]');
  await page.click('button[data-id="lokasi"]');
  await foto(page, '05-ponsel-01');
  cek(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'ponsel: tanpa gulir horizontal pada ruang simulasi');
  await page.context().close();

  // 5. mode penguji + riwayat
  console.log('Mode penguji');
  page = await halamanBaru();
  await page.goto(URL_APP + '#/penguji/01');
  await page.waitForSelector('.penguji');
  await page.fill('input[type="text"] >> nth=0', 'K-001');
  const kotak = page.locator('td.poin input[type="checkbox"]');
  for (let i = 0; i < (await kotak.count()); i++) await kotak.nth(i).check();
  const pilihan = page.locator('td.poin select');
  for (let i = 0; i < (await pilihan.count()); i++) await pilihan.nth(i).selectOption({ index: (await pilihan.nth(i).locator('option').count()) - 1 });
  cek((await page.locator('.jumlah').innerText()).startsWith('25 / 25'), 'penguji: skor langsung 25 / 25');
  await page.check('input[name="global"][value="4"]');
  await page.click('button:has-text("Mulai waktu")');
  await page.clock.runFor(61000);
  cek((await page.locator('.jam.besar').innerText()) === '06:59', 'penguji: penghitung waktu berjalan (06:59 setelah 61 detik)');
  await foto(page, '06-penguji');
  await page.click('button:has-text("Simpan ke riwayat")');
  const riwayat = await page.evaluate(() => JSON.parse(localStorage.getItem('osce.riwayat.v1') || '[]'));
  cek(riwayat.length === 1 && riwayat[0].tipe === 'penguji' && riwayat[0].skor === 25 && riwayat[0].kandidat === 'K-001', 'penguji: riwayat tersimpan');
  await page.goto(URL_APP + '#/riwayat');
  await page.waitForSelector('.tabel');
  cek((await page.locator('.tabel tbody tr').count()) === 1, 'halaman riwayat menampilkan 1 baris');
  cek(page.galat.length === 0, 'penguji/riwayat tanpa galat: ' + page.galat.join(' | '));
  await page.context().close();
} finally {
  await browser.close();
}

console.log(`\nLulus ${lulus.length}, gagal ${gagal.length}`);
if (gagal.length) { console.log(gagal.map((g) => ' - ' + g).join('\n')); process.exit(1); }
console.log('Semua uji end-to-end lulus.');
