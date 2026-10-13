---
title: Pekerjaan terbuka
updated: 2026-10-13
---

# Pekerjaan terbuka

Berurutan prioritas. Coret yang selesai dan catat di [log](log.md).

## P0 — sebelum konten dipakai untuk ujian

- [ ] **Review kardiolog** atas seluruh stasiun (pemilik repo adalah kardiolog; minta tinjauan substansi dan kesesuaian dengan praktik setempat).
- [ ] **Verifikasi angka klinis ke teks lengkap** — daftar lengkap di [guidelines-status](guidelines-status.md). Prioritas: stasiun 02 (dosis aspirin, target waktu reperfusi), 05 (parameter RJP), 06 (diuretik IV, kriteria NIV, nitrat), 04 (teknik dan klasifikasi TD). Gunakan `convert_article_ids` lalu `get_full_text_article` untuk artikel yang ada di PMC.
- [ ] **Tambahkan rujukan PERKI** (SKA, hipertensi, gagal jantung) dengan edisi yang berlaku; sesuaikan butir stasiun bila PERKI berbeda.

## P0 — aplikasi

- [ ] Uji coba dengan pengguna nyata (kandidat dan penguji) lalu perbaiki alur, biaya waktu, dan teks respons berdasarkan umpan balik.
- [ ] Review kardiolog juga atas teks respons pasien, pengecoh, dan alasan "tidak tepat/berisiko" di `app/data/interaksi/*.js`.

## P1 — kelengkapan

- [ ] Gambar EKG stasiun 02 (`assets/ekg/`): EKG anonim dengan lisensi jelas; tambah juga EKG untuk S06 (sinus takikardia, Q V1–V3) bila memakai gambar.
- [ ] Audio/simulator auskultasi stasiun 03 yang berlisensi, plus varian (MR, MS, AR, S3).
- [ ] Uji coba waktu stasiun 06; putuskan tetap satu stasiun atau pecah menjadi S06a/S06b.
- [ ] Isi pemetaan ke SNPPDI/KKI (kolom di blueprint belum diisi).
- [ ] Tetapkan lisensi repositori dan visibilitas (publik/privat).
- [ ] Tambahkan guideline katup jantung untuk stasiun 03 dan rujukannya.
- [ ] Aktifkan GitHub Pages bila ingin akses lewat tautan (perhatikan visibilitas repo).
- [ ] Ganti EKG/bunyi sintetis dengan rekaman berlisensi atau perluas variasi (S03: MR/MS/AR/S3; S04: nilai TD lain; S02: EKG lain) lewat varian interaksi.
- [ ] Audit aksesibilitas dengan pembaca layar (alur keyboard sudah ada, belum diuji menyeluruh).

## P2 — pengembangan

- [ ] Stasiun dari bank di [blueprint](../docs/blueprint.md): gagal jantung kronik (optimalisasi terapi), edukasi pasca-IMA, EKG lain (FA, blok AV, takikardia kompleks lebar), ACLS (irama tidak dapat disyok), hipertensi emergensi, sinkop, pemeriksaan fisik kardiovaskular lengkap, foto toraks, varian auskultasi.
- [ ] Ide dari sumber 5 dan 6: stasiun flutter atrium, infark inferior dengan angina pasca-infark, SKA dua tahap (depresi ST lalu elevasi ST).
- [ ] Paket pelatihan SP dan penguji (rekaman contoh untuk kalibrasi).
- [ ] Lembar penilaian siap cetak dan versi digital; opsi spreadsheet untuk analisis BRM dan Cronbach's α.
- [ ] Rencana uji coba (pilot) dan analisis psikometrik setelah ujian pertama.
- [ ] Fitur analisis di aplikasi: impor riwayat mode penguji (CSV/JSON) lalu hitung batas lulus *borderline regression*, α Cronbach, SEM.
- [ ] Ekspor lembar penilaian penguji ke PDF dan paket cetak per stasiun.
- [ ] Kemas sebagai PWA (instal dan offline penuh) bila dibutuhkan.
- [ ] Stasiun baru dari bank blueprint beserta interaksinya (mengikuti `docs/aplikasi.md`).

## P3 — sumber yang tertunda

- [ ] Sumber 1–4 ([sources](sources.md)): bila domain dibuka atau teks ditempel, bandingkan dengan stasiun 06 dan rubrik komunikasi lalu perbarui.

## Proses

- [ ] PR #1 sudah di-merge. PR #3 (aplikasi) draft: pengguna memutuskan kapan di-merge. Setelah merge: perbarui `overview.md`, mulai branch baru untuk pekerjaan berikutnya.
- [ ] Belum ada langganan pemantauan PR; tawarkan lagi bila pengguna ingin komentar review ditangani otomatis.

## Pertanyaan terbuka untuk pengguna

1. Level peserta target: dokter muda, dokter umum, atau PPDS kardiologi? (mengubah kedalaman butir dan pertanyaan lanjutan)
2. Formatif atau sumatif? (mengubah kebijakan butir kritis dan batas lulus)
3. Sumber daya setempat: cathlab 24 jam? fibrinolitik apa yang tersedia? simulator auskultasi/EKG/RJP berumpan balik? ruang dan jumlah SP?
4. Institusi di balik nama "Bahteramas" dan bentuk pemetaan kompetensi yang dipakai.
5. Apakah repo akan publik? (memengaruhi lisensi, kehati-hatian konten, dan hak cipta gambar/audio)
6. Apakah ingin versi bahasa Inggris?
7. Aplikasi untuk siapa: latihan mandiri mahasiswa, penguji, atau keduanya? Dipakai offline di rumah sakit atau lewat tautan (Pages)?
8. Apakah perkiraan penilaian global otomatis (ambang 55/70/85) sesuai, atau ingin kebijakan lain?
