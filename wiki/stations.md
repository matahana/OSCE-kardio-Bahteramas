---
title: Katalog stasiun
updated: 2026-10-13
---

# Katalog stasiun

Ringkasan untuk orientasi cepat. **Isi lengkap ada di `stasiun/NN-*.md`** (sumber kebenaran). Semua stasiun: 8 menit, level Miller *Shows how*, status DRAF.

| No | Berkas | Skor | Jenis | Butir kritis ⚠ |
|----|--------|:----:|-------|----------------|
| 01 | `01-anamnesis-nyeri-dada.md` | 25 | SP | C1 (tanya diseksi aorta), D5 (alergi dan perdarahan sebelum antitrombotik) |
| 02 | `02-ekg-stemi-inferior.md` | 20 | Data EKG | 6a (diagnosis STEMI), 7d (strategi reperfusi) |
| 03 | `03-auskultasi-jantung.md` | 20 | Manikin/audio | Tidak ada |
| 04 | `04-pengukuran-tekanan-darah.md` | 20 | Simulator lengan + SP | B1 (ukuran manset) |
| 05 | `05-bls-henti-jantung.md` | 25 | Manikin RJP + AED | A3, A4, B2, B4, B5, C3, C4 |
| 06 | `06-gagal-jantung-akut-dekompensasi.md` | 25 | SP + data | D1 (EKG), E1 (diuretik loop IV) |

## Biji skenario per stasiun

**01 Anamnesis nyeri dada.** Tn. Rahmat, 58 th, pedagang. Nyeri retrosternal 1 jam, seperti ditindih, menjalar ke lengan dan rahang kiri, 8/10, keringat dingin, mual. Angina crescendo 2 minggu. Faktor risiko: hipertensi tidak teratur, DM2, perokok 20 batang/hari × 30 tahun, ayah meninggal mendadak usia 52. TD 150/90, nadi 96, napas 20, SpO₂ 96%. Jawaban negatif tersedia untuk diseksi aorta, emboli paru, perikarditis, GERD. Pertanyaan lanjutan: diagnosis banding, 10 menit pertama. Varian: SP wanita 62 th presentasi atipikal.

**02 EKG STEMI inferior.** Pria 58 th, nyeri dada tipikal 1 jam. TD 110/70, nadi 75, SpO₂ 95%. EKG: sinus ± 75, elevasi ST II/III/aVF, depresi resiprokal I/aVL. 17 butir dengan butir bercabang (4a–4c, 5a–5b, 6a–6c, 7a–7d, 8a–8b). Pertanyaan lanjutan: V4R/V7–V9, hindari nitrat pada infark RV, komplikasi, kontraindikasi fibrinolisis, tidak menunggu troponin. **Gambar EKG belum ada** (`assets/ekg/` belum dibuat).

**03 Auskultasi jantung.** Pria 70 th, sesak aktivitas dan sinkop. Kasus stenosis aorta: S2 melemah, bising ejeksi sistolik crescendo–decrescendo terkeras di SIK 2 kanan, menjalar ke karotis. TD 120/80, nadi 78 bila ditanya. Varian: MR, MS, AR, S3. Butuh simulator atau audio berlisensi.

**04 Pengukuran TD.** Ibu Sari, 45 th, guru, sakit kepala ringan. Simulator Korotkoff diset 152/94 mmHg, toleransi ± 4. SP mengaku minum kopi 20 menit lalu bila ditanya. Varian: 128/82, 178/108. Manset tiga ukuran harus tersedia.

**05 BLS + AED.** Pria dewasa kolaps di ruang tunggu poliklinik jantung. Penguji berperan sebagai orang di sekitar; tidak ada yang bergerak tanpa penugasan jelas. AED analisis 1: syok disarankan; analisis 2: tidak disarankan. Tim ACLS tiba menit ke-6 (serah terima).

**06 Gagal jantung akut.** Ibu Hartini, 68 th, riwayat gagal jantung iskemik. 3 hari sesak, ortopnea, edema, +4 kg. Pencetus: furosemid habis 1 minggu, makan asin/santan, ibuprofen. TD 138/84, nadi 104, napas 28, SpO₂ 88%. Data bila diminta: JVP naik, ronki bibasal, S3, edema 2+, akral hangat (hangat–basah); EKG sinus takikardia dan Q V1–V3; foto toraks kongesti; NT-proBNP 6.200, kreatinin 1,5 (baseline 1,2), Na 133, troponin sedikit naik dan stabil. Pertanyaan lanjutan: profil klinis, dingin–basah, pencetus akut, morfin, terapi pulang.

## Kelemahan yang diketahui (jangan diabaikan)

- Semua stasiun belum direview kardiolog; angka klinis belum diverifikasi ke teks lengkap ([guidelines-status](guidelines-status.md)).
- 06 padat untuk 8 menit; uji coba waktu atau pecah menjadi S06a dan S06b.
- 02 tanpa gambar EKG; 03 tanpa audio/simulator yang ditentukan.
- Beberapa butir memakai skor bertingkat: 4a di stasiun 02 (3 sadapan = 2; 2 sadapan = 1), butir 3 di stasiun 02 (1 poin per interval), dan B8 di stasiun 01 (≥ 3 dari 5 gejala = 2; 1–2 = 1). Pastikan penguji memahaminya.
- Pemetaan ke SNPPDI/KKI belum diisi.
- Belum ada uji coba (pilot) dan data psikometrik.

## Cara menambah atau mengubah stasiun

Lihat `CLAUDE.md` bagian "Aturan stasiun". Setelah mengubah skor, jalankan `python3 -I tools/cek_skor.py`.
