# OSCE-kardio-Bahteramas

Repositori materi OSCE (*Objective Structured Clinical Examination*) kardiovaskular: blueprint, stasiun lengkap dengan lembar penilaian, panduan penguji dan pasien simulasi, serta rujukan guideline.

> **Status: DRAF v0.2.** Seluruh stasiun dan lembar penilaian harus direview dan disahkan oleh tim penguji/kardiolog institusi sebelum dipakai pada ujian sumatif. Lihat [Catatan penggunaan](#catatan-penggunaan).

## Bank stasiun (v0.2)

Semua stasiun berdurasi 8 menit (+ 2 menit pindah) dan menguji level Miller *Shows how*. Satu sirkuit ujian memakai 6 dari 9 stasiun; lihat [cara menyusun sirkuit](docs/blueprint.md#menyusun-sirkuit-dari-bank-stasiun).

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

## Struktur repositori

```
README.md
CLAUDE.md                               instruksi untuk sesi Claude (dimuat otomatis)
wiki/                                   memori kerja lintas sesi; mulai dari wiki/index.md
docs/
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
