# OSCE-kardio-Bahteramas

Repositori materi OSCE (*Objective Structured Clinical Examination*) kardiovaskular: blueprint, stasiun lengkap dengan lembar penilaian, panduan penguji dan pasien simulasi, rujukan guideline, serta **aplikasi web simulasi** untuk berlatih dan menilai.

> **Status: DRAF v0.2.** Seluruh stasiun dan lembar penilaian harus direview dan disahkan oleh tim penguji/kardiolog institusi sebelum dipakai pada ujian sumatif. Lihat [Catatan penggunaan](#catatan-penggunaan).

## Aplikasi simulasi (web)

Buka [`app/index.html`](app/index.html) di peramban (tanpa server, tanpa instalasi), atau lewat web setelah GitHub Pages diaktifkan (Settings → Pages → `main` / root): https://matahana.github.io/OSCE-kardio-Bahteramas/ (mengalihkan ke `app/`; belum masuk mesin pencari karena `noindex` sampai konten direview).

- **Latihan mandiri** untuk seluruh 14 stasiun: pasien simulasi, form jawaban, EKG sintetis (STEMI inferior, fibrilasi atrium, blok AV derajat tiga), steteskop (bunyi jantung dan bising mitral bersyarat), tensimeter virtual, dan uji ritme kompresi. Jam simulasi memaksa prioritas; hasil menampilkan checklist, tindakan berisiko, pembahasan, dan contoh urutan ideal.
- **Mode penguji**: lembar penilaian digital dengan penghitung waktu, skor langsung, penilaian global, dan ekspor.
- Checklist dibaca dari dokumen stasiun lewat generator, sehingga aplikasi dan dokumen tidak menyimpang. Rincian arsitektur, cara menambah stasiun, dan pemeriksaan: [docs/aplikasi.md](docs/aplikasi.md).

## Bank stasiun (v0.2)

Semua stasiun berdurasi 8 menit (+ 2 menit pindah) dan menguji level Miller *Shows how*. Satu sirkuit ujian memakai 6 dari 14 stasiun; lihat [cara menyusun sirkuit](docs/blueprint.md#menyusun-sirkuit-dari-bank-stasiun).

| No | Stasiun | Jenis | Skor |
|----|---------|-------|:----:|
| 01 | [Anamnesis nyeri dada akut](stasiun/01-anamnesis-nyeri-dada.md) | Pasien simulasi | 25 |
| 02 | [Interpretasi EKG — STEMI inferior](stasiun/02-ekg-stemi-inferior.md) | Data (EKG) | 20 |
| 03 | [Auskultasi jantung (stenosis aorta)](stasiun/03-auskultasi-jantung.md) | Manikin/audio | 20 |
| 04 | [Pengukuran tekanan darah](stasiun/04-pengukuran-tekanan-darah.md) | Simulator lengan | 20 |
| 05 | [BLS henti jantung + AED](stasiun/05-bls-henti-jantung.md) | Manikin RJP | 25 |
| 06 | [Gagal jantung akut dekompensasi](stasiun/06-gagal-jantung-akut-dekompensasi.md) | Pasien simulasi + data | 25 |
| 07 | [Edukasi pasca-infark miokard](stasiun/07-edukasi-pasca-infark.md) | Pasien simulasi | 25 |
| 08 | [Interpretasi EKG — fibrilasi atrium](stasiun/08-ekg-fibrilasi-atrium.md) | Data (EKG) | 20 |
| 09 | [Hipertensi emergensi](stasiun/09-hipertensi-emergensi.md) | Pasien simulasi + data | 20 |
| 10 | [Sinkop: anamnesis dan stratifikasi risiko](stasiun/10-sinkop.md) | Pasien simulasi + data | 20 |
| 11 | [Pemeriksaan fisik kardiovaskular sistematis](stasiun/11-pemeriksaan-fisik-kardiovaskular.md) | Sukarelawan + penguji / simulator | 20 |
| 12 | [ACLS: henti jantung irama tidak dapat disyok](stasiun/12-acls-irama-tidak-dapat-disyok.md) | Manikin RJP + monitor simulasi + penguji | 25 |
| 13 | [Gagal jantung kronik HFrEF: optimalisasi terapi](stasiun/13-gagal-jantung-kronik-optimalisasi-terapi.md) | Pasien simulasi + data | 20 |
| 14 | [Interpretasi EKG: blok AV derajat tiga](stasiun/14-ekg-blok-av-total.md) | Data (EKG) + penguji | 20 |

## Struktur repositori

```
README.md
CLAUDE.md                               instruksi untuk sesi Claude (dimuat otomatis)
wiki/                                   memori kerja lintas sesi; mulai dari wiki/index.md
index.html                              mengalihkan ke app/ (GitHub Pages)
app/                                    aplikasi web simulasi (HTML/CSS/JS statis)
  index.html, css/, js/, data/          data/stasiun-data.js = hasil generator; data/interaksi/ = bank aksi per stasiun
tests/
  e2e.mjs                               uji end-to-end di Chromium (Playwright)
docs/
  aplikasi.md                           arsitektur, cara menambah stasiun, pemeriksaan
  blueprint.md                          matriks domain × stasiun, penyusunan sirkuit, rencana stasiun lanjutan
  standar-penilaian.md                  skor, butir kritis, penetapan batas lulus (BRM), analisis
  panduan-penguji-dan-pasien-simulasi.md
  rubrik-komunikasi.md                  rubrik komunikasi opsional (0–2 per domain)
templates/
  stasiun-template.md                   kerangka stasiun baru
stasiun/                                satu berkas per stasiun
assets/ekg/                             gambar EKG (belum ada; lihat README di dalamnya)
referensi/
  README.md                             guideline dan pustaka (terverifikasi PubMed) + sumber yang belum terbaca
tools/
  cek_skor.py                           pemeriksa jumlah skor checklist (python3 -I tools/cek_skor.py)
  buat_data.py                          generator app/data/stasiun-data.js dari stasiun/*.md
  cek_interaksi.mjs                     uji konsistensi interaksi aplikasi (node tools/cek_interaksi.mjs)
.github/workflows/cek.yml               CI: tiga pemeriksaan di atas pada PR dan push ke main
```

## Melanjutkan di sesi berikutnya

Baca [wiki/index.md](wiki/index.md), lalu [wiki/open-items.md](wiki/open-items.md). Wiki berisi status proyek, keputusan desain, katalog stasiun, status verifikasi klaim klinis, sumber contoh, dan catatan lingkungan. Aturan kerja ada di [CLAUDE.md](CLAUDE.md).

## Isi satu stasiun

Setiap stasiun memuat: metadata, instruksi kandidat, instruksi penguji, skrip pasien/data, peralatan, lembar penilaian (butir kritis ditandai ⚠), penilaian global (1–4), pertanyaan lanjutan penguji, catatan pembuat soal, dan rujukan.

## Menambah stasiun baru

1. Salin [templates/stasiun-template.md](templates/stasiun-template.md) ke `stasiun/NN-judul.md`.
2. Isi seluruh bagian; pastikan jumlah skor checklist sama dengan skor maksimum.
3. Tambahkan ke tabel di atas dan ke [blueprint](docs/blueprint.md); perbarui skor maksimum di [standar penilaian](docs/standar-penilaian.md).
4. Cantumkan rujukan dengan tahun dan versi guideline, lalu minta review kardiolog.

## Catatan penggunaan

- **Bukan pengganti guideline.** Dosis, ambang, dan target waktu pada checklist mengikuti guideline yang dirujuk; verifikasi terhadap teks lengkap dan pedoman PERKI/institusi sebelum ujian.
- **Sesuaikan dengan sumber daya setempat** (cathlab 24 jam, fibrinolitik, simulator, AED) dan kebijakan kelulusan institusi.
- **Jangan memasukkan data pasien nyata.** Gunakan kasus fiktif dan gambar/audio dengan lisensi jelas. Gambar EKG stasiun 02 dan 08 belum disertakan; lihat [assets/ekg/README.md](assets/ekg/README.md) untuk syaratnya.
- **Lisensi belum ditetapkan.** Tentukan lisensi sebelum repositori dibuka untuk umum.
- Contoh desain dari artikel publik diparafrasekan dan tidak disalin; lihat [referensi](referensi/README.md).

## Rencana pengembangan

Lihat daftar bank stasiun pada [blueprint](docs/blueprint.md#bank-stasiun-yang-direncanakan).
