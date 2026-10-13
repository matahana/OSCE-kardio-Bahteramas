---
title: Pekerjaan terbuka
updated: 2026-10-13
---

# Pekerjaan terbuka

Berurutan prioritas. Coret yang selesai dan catat di [log](log.md).

## P0 — sebelum konten dipakai untuk ujian

- [ ] **Review kardiolog** atas seluruh stasiun (pemilik repo adalah kardiolog; minta tinjauan substansi dan kesesuaian dengan praktik setempat).
- [ ] **Verifikasi angka klinis ke teks lengkap** — daftar lengkap di [guidelines-status](guidelines-status.md). Prioritas: stasiun 02 (dosis aspirin, target waktu reperfusi), 09 (target penurunan TD bertahap dan pengecualian), 05 (parameter RJP), 06 (diuretik IV, kriteria NIV, nitrat), 08 (syarat kardioversi, kendali laju), 07 (lama antiplatelet ganda, target LDL), 04 (teknik dan klasifikasi TD). Gunakan `convert_article_ids` lalu `get_full_text_article` untuk artikel yang ada di PMC.
- [ ] **Tambahkan rujukan PERKI/PERHI** (SKA, hipertensi, gagal jantung, fibrilasi atrium, pencegahan sekunder) dengan edisi yang berlaku; sesuaikan butir stasiun bila PERKI berbeda.
- [ ] Tambahkan sitasi ESC/EAS dislipidemia 2019 (dipakai di pertanyaan lanjutan S07, belum ada di `referensi/README.md`).

## P1 — kelengkapan

- [ ] Gambar EKG stasiun 02 dan 08 (`assets/ekg/`, syarat di README folder itu): EKG anonim dengan lisensi jelas; tambah juga EKG untuk S06 (sinus takikardia, Q V1–V3) bila memakai gambar.
- [ ] Audio/simulator auskultasi stasiun 03 yang berlisensi, plus varian (MR, MS, AR, S3).
- [ ] Uji coba waktu stasiun 06; putuskan tetap satu stasiun atau pecah menjadi S06a/S06b.
- [ ] Isi pemetaan ke SNPPDI/KKI (kolom di blueprint belum diisi).
- [ ] Tetapkan lisensi repositori dan visibilitas (publik/privat).
- [ ] Tambahkan guideline katup jantung untuk stasiun 03 dan rujukannya.

## P2 — pengembangan

- [ ] Stasiun dari bank di [blueprint](../docs/blueprint.md) yang tersisa: gagal jantung kronik (optimalisasi terapi), EKG lain (blok AV derajat tinggi, takikardia kompleks lebar), ACLS (irama tidak dapat disyok), sinkop, pemeriksaan fisik kardiovaskular lengkap, foto toraks, varian auskultasi. (Selesai di sesi 2: edukasi pasca-IMA = S07, EKG fibrilasi atrium = S08, hipertensi emergensi = S09.)
- [ ] Uji coba waktu S07 (25 butir) dan S09; putuskan pangkas bila padat.
- [ ] Ide dari sumber 5 dan 6: stasiun flutter atrium, infark inferior dengan angina pasca-infark, SKA dua tahap (depresi ST lalu elevasi ST).
- [ ] Paket pelatihan SP dan penguji (rekaman contoh untuk kalibrasi).
- [ ] Lembar penilaian siap cetak dan versi digital; opsi spreadsheet untuk analisis BRM dan Cronbach's α.
- [ ] Rencana uji coba (pilot) dan analisis psikometrik setelah ujian pertama.

## P3 — sumber yang tertunda

- [ ] Sumber 1–4 ([sources](sources.md)): bila domain dibuka atau teks ditempel, bandingkan dengan stasiun 06 dan rubrik komunikasi lalu perbarui.

## Proses

- [ ] PR #1 masih draft. Pengguna memutuskan kapan di-merge. Setelah merge: arahkan basis PR #2 ke `main`, perbarui `overview.md`, mulai branch baru untuk pekerjaan berikutnya.
- [ ] PR #2 draft, bertumpuk di atas branch PR #1. Sesi 2 berlangganan pemantauan PR #2 (review dan CI). Repo belum punya CI/workflow, jadi yang masuk hanya komentar review. Langganan berakhir bersama sesi; pasang ulang di sesi berikutnya bila diminta.

## Pertanyaan terbuka untuk pengguna

1. Level peserta target: dokter muda, dokter umum, atau PPDS kardiologi? (mengubah kedalaman butir dan pertanyaan lanjutan)
2. Formatif atau sumatif? (mengubah kebijakan butir kritis dan batas lulus)
3. Sumber daya setempat: cathlab 24 jam? fibrinolitik apa yang tersedia? simulator auskultasi/EKG/RJP berumpan balik? ruang dan jumlah SP?
4. Institusi di balik nama "Bahteramas" dan bentuk pemetaan kompetensi yang dipakai.
5. Apakah repo akan publik? (memengaruhi lisensi, kehati-hatian konten, dan hak cipta gambar/audio)
6. Apakah ingin versi bahasa Inggris?
7. Prioritas stasiun berikutnya? S07–S09 dipilih Claude dari bank blueprint (D16); apakah urutan ini sesuai, dan apakah S06 sebaiknya dipecah?
