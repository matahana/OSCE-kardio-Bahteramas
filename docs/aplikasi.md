# Aplikasi simulasi OSCE

Aplikasi web statis (HTML, CSS, JavaScript klasik; tanpa build dan tanpa server) untuk melatih stasiun OSCE di folder `stasiun/` dan sebagai lembar penilaian digital penguji. **Status: DRAF v0.1**, alat belajar, bukan penilaian resmi.

## Menjalankan

| Cara | Langkah |
|------|---------|
| Lokal, tanpa server | Buka `app/index.html` di peramban (berfungsi dari `file://`) |
| Server lokal | `python3 -m http.server` di akar repo, buka `http://localhost:8000/app/` |
| GitHub Pages | Hanya pemilik repo yang dapat mengaktifkan: https://github.com/matahana/OSCE-kardio-Bahteramas/settings/pages → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)` → Save. Situs: https://matahana.github.io/OSCE-kardio-Bahteramas/ (mengalihkan ke `app/`). `.nojekyll` sudah ada. Halaman memuat `<meta name="robots" content="noindex, nofollow">` agar tidak masuk mesin pencari sebelum konten direview; hapus meta itu di `app/index.html` dan `index.html` bila sudah siap. |

Seluruh proses berjalan di peramban; tidak ada data yang dikirim ke server. Riwayat disimpan di penyimpanan lokal peramban.

## Fitur

- **Latihan mandiri** untuk 6 stasiun (01–06; stasiun 07–14 sudah ada di bank markdown dan generator, tetapi belum punya definisi interaksi sehingga beranda menandainya "Segera hadir"): bank pertanyaan/tindakan dengan respons pasien simulasi, form jawaban terstruktur, dan widget interaktif.
- **Jam simulasi**: tiap tindakan memakan detik simulasi (tertera di tombol); stasiun berakhir saat jam habis. Waktu nyata tidak dihitung, sehingga hasil deterministik dan "klik semua" tidak berhasil. Pertanyaan wajar tetapi tidak menentukan skor sengaja ada agar kandidat harus memprioritaskan.
- **Penilaian otomatis** per butir checklist, termasuk skor sebagian, butir kritis ⚠, tindakan tidak tepat (berisiko waktu) dan tindakan berisiko (menggagalkan perkiraan global).
- **Hasil**: checklist, tindakan tidak tepat/berisiko, pertanyaan lanjutan, contoh urutan ideal, catatan pembuat soal, rujukan, rekam tindakan, ekspor JSON, cetak.
- **Mode penguji**: lembar penilaian digital dengan penghitung waktu, skor langsung, penilaian global 1–4, catatan, ekspor JSON, cetak.
- **Riwayat** lokal dengan ekspor JSON/CSV.
- Mode gelap otomatis, responsif sampai lebar ponsel, kontrol dapat diakses keyboard.

### Widget

| Widget | Stasiun | Isi |
|--------|---------|-----|
| EKG 12 sadapan sintetis | 02 | Dibangkitkan dari parameter per sadapan (25 mm/dtk, 10 mm/mV); tombol layar penuh |
| Steteskop | 03 | Bunyi jantung disintesis (Web Audio); titik auskultasi, diafragma/bell, bantuan teks |
| Tensimeter aneroid + Korotkoff | 04 | Pompa, katup, nadi radialis, bunyi Korotkoff; ukuran manset memengaruhi pembacaan |
| Uji ritme kompresi | 05 | Ketukan 15 detik; laju dari median selang; metronom untuk latihan |

EKG dan bunyi bersifat sintetis (ilustrasi). Aplikasi tidak dapat menilai teknik fisik (kedalaman kompresi nyata, penempatan stetoskop); itu tetap perlu dilatih dengan manikin dan pasien simulasi.

## Arsitektur

```
stasiun/NN-*.md  ──tools/buat_data.py──▶  app/data/stasiun-data.js   (checklist, instruksi, pembahasan; HASIL GENERATOR)
                                          app/data/interaksi/NN.js    (bank aksi, form, widget, pemetaan skor; ditulis tangan)
app/js/engine.js    sesi, jam simulasi, log, penilaian (tanpa DOM; diuji di Node)
app/js/logika.js    logika murni widget (penilaian tensimeter, ritme ketukan)
app/js/util.js      pembuat elemen, markdown mini, penyimpanan lokal, unduhan
app/js/widgets/*.js ekg, steteskop, tensimeter, ketuk
app/js/ui.js        beranda, briefing, ruang, hasil, penguji, riwayat, tentang
app/js/main.js      router hash (#/...)
```

Prinsip: **checklist hanya ada di markdown stasiun.** Generator membacanya (id, grup, teks, skor, butir kritis); aplikasi tidak menyimpan salinan sendiri, sehingga dokumen dan aplikasi tidak dapat menyimpang. Berkas hasil generator tetap di-commit agar aplikasi jalan tanpa build; CI memeriksa kesinkronannya.

## Menambah atau mengubah stasiun

1. Tulis/ubah `stasiun/NN-judul.md` mengikuti [templates/stasiun-template.md](../templates/stasiun-template.md).
2. Jalankan `python3 -I tools/buat_data.py` (hasilnya di-commit).
3. Tulis `app/data/interaksi/NN.js` dan tambahkan `<script defer src="data/interaksi/NN.js">` di `app/index.html` (setelah `logika.js`).
4. Jalankan pemeriksaan di bawah sampai lulus.

### Definisi interaksi (`OSCE.daftar(id, definisi)`)

| Kunci | Fungsi |
|-------|--------|
| `pasien`, `tandaVital`, `petunjuk` | Kartu pasien dan tanda vital awal |
| `waktu` | Detik jam simulasi (480 untuk 8 menit) |
| `panel` | Tab: `aksi` (daftar tombol bergrup), `form` (jawaban terstruktur, `biaya`), `widget` (`widget` + `opsi`) |
| `widgetUtama` | Widget yang selalu tampil (mis. EKG pada stasiun 02) |
| `jadwal` | Peristiwa terpicu waktu: `{pada, id, pesan}` (mis. tim ACLS tiba pada 360 dtk) |
| `acara` | Daftar id peristiwa yang boleh dipancarkan widget |
| `skor` | Fungsi skor per id butir checklist |
| `ideal` | Rencana ideal (aksi, `{form, jawab}`, `{acara, nilai, info}`); dipakai uji dan halaman hasil |

Aksi dibuat dengan `A(id, label, respons, biaya, opsi)`; `opsi` dapat berisi `tidakTepat` (alasan), `berisiko` (alasan), `syarat(ctx)` (mengembalikan pesan penolakan atau `null`), `eksklusif` (kunci pilihan saling meniadakan), `sekali: false`, `efek(ctx)`.

Skor: `h.any(ids)`, `h.all(ids)`, `h.count(ids, [[minimal, poin], ...])` untuk skor sebagian, dan `h.kustom(fn, refs)` untuk aturan khusus; `ctx` menyediakan `sudah`, `jumlah`, `jawab`, `hitung`, `nilai`, `waktuAksi`, `terpakai`, `sisa`.

Opsi form dapat membawa bendera pada elemen ketiga: `['nitrat', 'Nitrat …', {tidakTepat: '…'}]` atau `{berisiko: '…'}`.

## Pemeriksaan

Stasiun yang belum punya `app/data/interaksi/NN.js` dilaporkan **"segera hadir"** (sama seperti beranda) dan tidak menggagalkan pemeriksaan; stasiun yang punya interaksi diperiksa penuh.

```bash
python3 -I tools/cek_skor.py              # jumlah skor checklist tiap stasiun
python3 -I tools/buat_data.py --cek       # berkas hasil generator sinkron dengan markdown
node tools/cek_interaksi.mjs              # interaksi konsisten dengan checklist; rencana ideal 100%; "klik semua" tidak 100% tanpa catatan
node tools/cek_interaksi.mjs --ketat      # sama, tetapi stasiun tanpa interaksi juga dianggap gagal (pakai bila semua stasiun harus lengkap)
PLAYWRIGHT_DIR=/jalur/node_modules/playwright node tests/e2e.mjs [--shots=folder]   # uji di Chromium dari file://
```

`tests/e2e.mjs` menjalankan tiap stasiun lewat antarmuka sesuai rencana ideal (harus 100%), kontrol negatif (manset kecil, deflasi terlalu cepat, ritme ketukan terlalu cepat tidak boleh mendapat poin), tindakan berisiko, jalur waktu habis, mode penguji, dan riwayat. Jam peramban dibekukan dan dimajukan manual agar widget berbasis waktu deterministik. CI (`.github/workflows/cek.yml`) menjalankan tiga pemeriksaan pertama; uji Chromium dijalankan lokal.

## Keterbatasan dan catatan mutu

- Seluruh konten **DRAF**: belum direview kardiolog; angka klinis belum diverifikasi ke teks lengkap (lihat `wiki/guidelines-status.md`).
- Pasien simulasi menjawab dari bank respons tetap.
- Perkiraan penilaian global memakai aturan sederhana (persentase 55/70/85, butir kritis, tindakan berisiko, waktu habis); batas lulus resmi ditetapkan tim ujian.
- Toleransi widget: tensimeter ±4 mmHg untuk nilai, laju deflasi 1,5–4 mmHg/dtk (target 2–3), jarak inflasi 15–40 mmHg di atas estimasi palpatoir (target 20–30); ritme ketukan 100–120/menit.
- Belum diuji dengan pembaca layar secara menyeluruh dan belum ada uji coba dengan pengguna sebenarnya.
