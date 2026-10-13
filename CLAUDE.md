# CLAUDE.md — OSCE-kardio-Bahteramas

Repositori materi OSCE kardiovaskular. Instruksi ini dimuat otomatis pada awal sesi.

## Mulai sesi dengan ini (hemat waktu)

1. Baca [`wiki/index.md`](wiki/index.md), lalu [`wiki/open-items.md`](wiki/open-items.md). Jangan menelusuri ulang repositori dari nol.
2. Cek status PR dan branch yang tercatat di [`wiki/overview.md`](wiki/overview.md). PR bisa saja sudah di-merge sejak sesi terakhir; bila sudah, mulai branch baru dari `main`.
3. Kerjakan hanya yang diminta pengguna, dan catat hasilnya di wiki sebelum sesi berakhir (lihat "Akhir sesi").

## Konteks proyek

- Pemilik: dokter spesialis kardiologi dan peneliti epidemiologi. Bahasa: **Bahasa Indonesia**, profesional dan akurat, berbasis guideline terkini (ACC/AHA, ESC, WHO, dan PERKI untuk konteks Indonesia).
- **Hanya repositori ini** yang dikerjakan. Repositori `panduan-ibadah` tidak terkait: jangan dibaca, diubah, atau di-push (permintaan eksplisit pengguna, 13 Oktober 2026).
- Isi: bank 11 stasiun OSCE kardiovaskular (DRAF v0.2; satu sirkuit memakai 6 stasiun), blueprint, standar penilaian, panduan penguji/pasien simulasi, rujukan.

## Struktur

```
CLAUDE.md                 instruksi ini
README.md                 pintu masuk untuk manusia
wiki/                     memori kerja lintas sesi (mulai dari wiki/index.md)
docs/                     blueprint, standar penilaian, panduan penguji/SP, rubrik komunikasi
stasiun/                  satu berkas per stasiun (sumber kebenaran isi stasiun)
assets/ekg/               gambar EKG (belum ada; syaratnya di README folder itu)
templates/                kerangka stasiun baru
referensi/README.md       guideline dan pustaka (terverifikasi PubMed)
tools/cek_skor.py         pemeriksa jumlah skor checklist
```

## Aturan konten klinis

- Jangan menulis angka klinis (dosis, ambang, target waktu, parameter RJP, kriteria diagnosis) tanpa mencatat status verifikasinya di `wiki/guidelines-status.md`. Angka dari ingatan model berstatus **belum diverifikasi** sampai dicocokkan dengan teks guideline.
- Verifikasi sitasi lewat PubMed (alurnya di `wiki/environment.md`). Sitasi harus memuat DOI/PMID yang benar-benar diambil; jangan menebak.
- Tandai DRAF untuk konten yang belum direview kardiolog. Jangan menyebut konten "siap ujian".
- Tidak ada data pasien nyata. Kasus harus fiktif; gambar dan audio hanya dengan lisensi jelas. Isi sumber eksternal **diparafrasekan**, tidak disalin.
- Jangan menggambarkan isi halaman yang tidak berhasil dibaca (lihat `wiki/sources.md`).

## Aturan stasiun

- Pakai [`templates/stasiun-template.md`](templates/stasiun-template.md); penamaan `stasiun/NN-judul.md`.
- Jumlah skor checklist = "Skor maksimum" = angka pada "Skor checklist: ___ / N". Jalankan `python3 -I tools/cek_skor.py` sebelum commit; harus keluar dengan kode 0.
- Butir kritis ditandai ⚠. Penilaian global memakai skala 1–4 (Tidak lulus, Borderline, Lulus, Sangat baik).
- Durasi seragam 8 menit (+2 menit pindah). Bila menambah stasiun, perbarui blueprint, standar penilaian (skor maksimum dan *k* dari *N*), README, dan `wiki/stations.md`.

## Operasi wiki

Wiki adalah memori kerja lintas sesi yang dikelola LLM. Sumber kebenaran isi tetap berkas di `docs/`, `stasiun/`, dan `referensi/`.

- **Ingest** (sumber atau instruksi baru): perbarui halaman terkait dan `index.md`, lalu tambahkan entri di `log.md`.
- **Query**: baca `index.md`, lalu halaman yang relevan, lalu jawab. Simpan jawaban yang bernilai sebagai halaman atau butir baru.
- **Lint** (berkala): cari kontradiksi antar halaman, klaim kedaluwarsa, halaman yatim, dan angka klinis yang belum terverifikasi; jalankan `tools/cek_skor.py`.
- Hindari duplikasi: wiki meringkas dan menunjuk ke berkas sumber, tidak menyalin tabel panjang.

## Akhir sesi

1. Tambahkan entri di `wiki/log.md` (permintaan, tindakan, hasil, keputusan).
2. Perbarui `wiki/open-items.md` (coret yang selesai, tambah yang baru) dan `wiki/overview.md` (status PR dan branch).
3. Perbarui `wiki/index.md` bila ada halaman baru.
4. Commit dan push; pastikan ada PR draft.

## Git

- Branch kerja ditentukan harness tiap sesi; push hanya ke branch itu. PR dibuat sebagai **draft**. Periksa `.github/pull_request_template.md` bila ada.
- Catatan alat, jaringan, dan jebakan lingkungan ada di `wiki/environment.md`.
