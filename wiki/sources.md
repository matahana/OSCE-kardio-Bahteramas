---
title: Sumber contoh dari pengguna
updated: 2026-10-13
---

# Sumber contoh dari pengguna

Pengguna mengirim enam tautan sebagai contoh desain stasiun. Status akses per 13 Oktober 2026:

| # | Sumber | Status | Dipakai? |
|---|--------|--------|----------|
| 1 | https://www.oscesense.com/osce-practice-cardiovascular-heartfailure-exacerbation | **Tidak terbaca** (DNS gagal) | Tidak |
| 2 | https://www.oscefinals.com/post/acuteheartfailure | **Tidak terbaca** (DNS gagal) | Tidak |
| 3 | https://osce.ai/osce-stations/#station-cardio | **Tidak terbaca** (DNS gagal) | Tidak |
| 4 | https://mbchb.dundee.ac.uk/files/students/osce/commstest.html | **Tidak terbaca** (DNS gagal) | Tidak |
| 5 | https://pmc.ncbi.nlm.nih.gov/articles/PMC7597946/ | Fetch web gagal; **terbaca lewat tool PubMed** (`get_full_text_article`) | Ya, diparafrasekan |
| 6 | https://pmc.ncbi.nlm.nih.gov/articles/PMC12392693/ | Fetch web gagal; **terbaca lewat tool PubMed** | Ya, diparafrasekan |

**Jangan mengarang isi sumber 1–4.** Stasiun 06 dan rubrik komunikasi disusun dari guideline dan pengetahuan klinis, bukan dari halaman-halaman itu. Hal ini dinyatakan di `../referensi/README.md` dan di deskripsi PR #1.

## Cara membuka sumber 1–4

- Pengguna menambahkan domain ke Network access environment (menu environment di title bar sesi → Edit → Allowed domains), atau
- Pengguna menempelkan teksnya ke chat. Setelah itu: bandingkan dengan stasiun 06 dan rubrik komunikasi, perbarui [stations](stations.md), dan catat di [log](log.md).

## Sumber 5: MedEdPORTAL, Simulated Cardiology Clinic

DOI 10.15766/mep_2374-8265.11008 · PMID 33150203 · PMC7597946. Lisensi pemakaian ulang **tidak diverifikasi**; jangan menyalin lampiran, tabel, atau instrumennya.

Pelajaran (parafrase) yang dipakai atau relevan:
- Empat kasus pasien simulasi: stenosis aorta (katup aorta bikuspid), infark inferior dengan angina pasca-infark, gagal jantung akut akibat hipertensi lama, flutter atrium. Setiap kasus dilengkapi audio bunyi jantung dan gambar EKG.
- Anamnesis berbasis hipotesis; pemeriksaan fisik tidak dilakukan pada SP (data diberikan tertulis/audio).
- Data penunjang (EKG) lebih baik diberikan **setelah** pertemuan agar mengikuti urutan klinis nyata; stasiun 06 meniru ini dengan membuat kandidat meminta data.
- Pelatihan SP 1 jam; debrief tatap muka lebih disukai daripada tertulis; penugasan kamar berdekatan untuk meminimalkan waktu pindah.
- Keterbatasan: satu institusi, respons survei rendah (19–29%), tanpa data performa klinis.

Kasus-kasus ini dapat menjadi bahan bank stasiun lanjutan (flutter atrium, infark inferior dengan angina pasca-infark).

## Sumber 6: Cureus, simulasi SKA mahasiswa tingkat akhir

DOI 10.7759/cureus.88968 · PMID 40895944 · PMC12392693. Lisensi tidak diverifikasi.

Pelajaran (parafrase):
- Simulasi 45 menit, kelompok 5–7 mahasiswa, SP di balik tirai; fasilitator memegang panduan agar konsisten antar kelompok.
- Skenario dua tahap: depresi ST (NSTE-ACS) lalu rekurensi dengan elevasi ST (STEMI).
- Debrief model *Gather–Analyze–Summarize*.
- Hasil (n = 50 dari 120): skor pengetahuan 3,74 → 5,34 dari 7 (p < 0,0001); kepercayaan diri naik. Keterbatasan: tingkat respons 42%, MCQ tidak divalidasi, tanpa tindak lanjut.

Ide yang dapat diambil: stasiun SKA dua tahap (perubahan klinis di tengah stasiun) sebagai stasiun lanjutan; debrief terstruktur untuk OSCE formatif.
