---
title: Status verifikasi klaim klinis
updated: 2026-10-13
---

# Status verifikasi klaim klinis

Dua tingkat verifikasi yang berbeda:

- **Metadata sitasi terverifikasi** (judul, jurnal, volume/halaman, DOI/PMID dicocokkan lewat PubMed). Daftar lengkap: `../referensi/README.md`.
- **Angka/klaim klinis terverifikasi** = dicocokkan dengan teks lengkap guideline. **Belum ada satu pun yang terverifikasi pada tingkat ini.** Semua angka di bawah berasal dari pengetahuan model dan harus dicek.

Cara memverifikasi: lihat alur PubMed di [environment](environment.md). Teks lengkap hanya bisa diambil bila artikel ada di PubMed Central.

## Klaim yang perlu diverifikasi, per stasiun

| Stasiun | Klaim | Rujukan yang dicantumkan | Status |
|---------|-------|--------------------------|--------|
| 01 | EKG 12 sadapan dalam 10 menit sejak kontak medis pertama | Gulati 2021 (PMID 34709879) | Belum diverifikasi |
| 02 | Aspirin dosis muat 150–300 mg (ESC 2023) / 162–325 mg (ACC/AHA) | Byrne 2023; Rao 2025 | Belum diverifikasi |
| 02 | Prasugrel/ticagrelor lebih dipilih; klopidogrel bila tidak tersedia; UFH sebagai antikoagulan | Byrne 2023; Rao 2025 | Belum diverifikasi |
| 02 | PCI primer ≤ 120 menit dari diagnosis (ESC); kontak medis pertama ke alat ≤ 90 menit (ACC/AHA); fibrinolisis door-to-needle ≤ 30 menit | Byrne 2023; Rao 2025 | Belum diverifikasi |
| 02 | Daftar kontraindikasi fibrinolisis (pertanyaan lanjutan) | Byrne 2023 | Belum diverifikasi |
| 03 | Titik auskultasi dan temuan stenosis aorta; gejala klasik sebagai indikasi intervensi | Buku ajar; guideline katup tidak dikutip | Standar buku ajar; **guideline katup belum ditambahkan** |
| 04 | Bladder ≥ 80% lingkar lengan; manset 2–3 cm di atas lipat siku; estimasi palpatoir; pompa 20–30 mmHg di atas sistolik; deflasi 2–3 mmHg/detik; Korotkoff I dan V; pembulatan 2 mmHg; ≥ 2 pengukuran selang 1–2 menit; kedua lengan pada kunjungan pertama; hindari kafein/rokok/olahraga 30 menit; istirahat ≥ 5 menit | McEvoy 2024; Jones 2025 | Belum diverifikasi |
| 04 | TD kantor ≥ 140/90 = hipertensi menurut ACC/AHA, ESC, dan PERKI; konfirmasi dengan HBPM/ABPM | McEvoy 2024; Jones 2025; PERKI **tidak diperiksa** | Belum diverifikasi |
| 05 | Kompresi 100–120/menit, kedalaman 5–6 cm, recoil penuh, 30:2, cek napas/nadi ≤ 10 detik, jeda < 10 detik, ganti penolong tiap ± 2 menit | Del Rios 2025 Part 1 (hanya ringkasan eksekutif; bab BLS dewasa tidak dibaca) | Belum diverifikasi |
| 06 | Diuretik loop IV dengan dosis awal ≥ dosis oral harian (contoh 40–80 mg); oksigen bila SpO₂ < 90%; NIV bila distres; nitrat bila TD sistolik adekuat; morfin tidak rutin; pencetus akut (SKA, krisis hipertensi, aritmia, penyebab mekanik, emboli paru; dalam ESC 2021 disingkat CHAMP); profil hangat–basah/dingin–basah | McDonagh 2021; Heidenreich 2022 | Belum diverifikasi |

## Yang sudah diverifikasi

- Metadata 6 guideline (Gulati 2021, Rao 2025, Byrne 2023, McEvoy 2024, Jones 2025, Del Rios 2025 Part 1) lewat `get_article_metadata`.
- McDonagh 2021 (PMID 34447992), Heidenreich 2022 (PMID 35363499), Harden 1975 (PMID 1115966), Miller 1990 (PMID 2400509), Kurtz 1996 (PMID 8736242): dicocokkan lewat `lookup_article_by_citation` (jurnal, tahun, volume, halaman awal, penulis pertama); judul dan DOI belum diambil.
- PERKI: tidak ada sitasi sama sekali.

## Aturan

- Jangan menaikkan pertanyaan lanjutan menjadi butir skor, dan jangan menyebut konten "siap ujian", sebelum angkanya terverifikasi dan direview kardiolog.
- Setelah memverifikasi sebuah klaim, ubah statusnya di tabel ini dan catat di [log](log.md).
