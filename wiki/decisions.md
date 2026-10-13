---
title: Keputusan desain
updated: 2026-10-13
---

# Keputusan desain

Format: keputusan, alasan, siapa yang memutuskan. "Usulan" berarti belum disetujui pengguna dan boleh diubah.

| # | Keputusan | Alasan | Oleh |
|---|-----------|--------|------|
| D1 | Repo OSCE terpisah; `panduan-ibadah` tidak disentuh | Permintaan pengguna ("lepaskan repositori panduan-ibadah agar tidak terganggu") | Pengguna |
| D2 | Repo dibuat manual oleh pengguna | `create_repository` lewat integrasi ditolak 403; integrasi tidak bisa membuat repo di akun pengguna | Keadaan |
| D3 | `main` hanya berisi commit awal; isi masuk lewat branch kerja dan draft PR | Konten klinis perlu direview sebelum masuk `main`; repo kosong tidak punya base branch | Claude (usulan, diterima pengguna secara implisit) |
| D4 | Durasi seragam 8 menit + 2 menit pindah | Rotasi sirkuit sinkron | Claude (usulan) |
| D5 | Semua stasiun level Miller *Shows how* | OSCE menguji peragaan terstandar; pengetahuan diuji dengan MCQ | Claude (usulan) |
| D6 | Checklist + butir kritis ⚠ + penilaian global 1–4 | Standar umum OSCE; butir kritis mencegah kandidat tidak aman tetapi skor total tinggi lulus | Claude (usulan) |
| D7 | Batas lulus dengan *borderline regression method*; syarat lulus 4 dari 6 stasiun; gagal butir kritis = stasiun tidak lulus | Praktik umum; angka dan kebijakan diumumkan tim ujian sebelum ujian | Claude (usulan) |
| D8 | Aspirin dosis muat: penguji menerima rentang ESC (150–300 mg) atau ACC/AHA (162–325 mg) | Guideline berbeda; kandidat boleh merujuk salah satu | Claude (usulan, **angka belum diverifikasi**) |
| D9 | Konteks lokal diakomodasi: fibrinolisis bila PCI tidak tepat waktu; menyebut PERKI | Ketersediaan cathlab 24 jam bervariasi | Claude (usulan) |
| D10 | Stasiun 06 (gagal jantung akut) ditambahkan setelah pengguna mengirim contoh bertema gagal jantung | Dua dari enam contoh pengguna bertema gagal jantung | Claude, mengikuti isyarat pengguna |
| D11 | Rubrik komunikasi memakai kerangka Calgary–Cambridge | Halaman Dundee tidak terbaca; kerangka ini terverifikasi di PubMed (PMID 8736242) | Claude |
| D12 | Sumber eksternal diparafrasekan, tidak disalin; tidak ada data pasien nyata | Hak cipta dan privasi | Claude |
| D13 | Wiki + `CLAUDE.md` + `tools/cek_skor.py` disimpan di repo OSCE | Permintaan pengguna agar sesi berikutnya efisien | Pengguna |
| D14 | Aplikasi web statis: HTML/CSS/JS klasik, tanpa build, tanpa CDN, tanpa fetch; berjalan dari `file://` dan GitHub Pages | Dapat dipakai offline di rumah sakit; mudah dirawat; tanpa data keluar dari peramban | Claude (usulan) |
| D15 | Checklist hanya di markdown stasiun; generator `tools/buat_data.py` menghasilkan `app/data/stasiun-data.js`; interaksi ditulis tangan; CI memeriksa sinkron | Dokumen dan aplikasi tidak boleh menyimpang | Claude (usulan) |
| D16 | Jam simulasi berbasis biaya aksi (bukan waktu nyata); pertanyaan wajar tetapi tidak menentukan skor diberi biaya 14 dtk | Hasil deterministik; "tanya semua" tidak muat dalam 480 dtk sehingga prioritas teruji | Claude (usulan) |
| D17 | Penilaian otomatis: skor sebagian lewat `h.count`; tindakan tidak tepat tidak mengurangi skor tetapi ≥ 3 membatasi perkiraan ke Borderline; tindakan berisiko atau butir kritis gagal → Tidak lulus; waktu habis membatasi ke Lulus; ambang 55/70/85 | Meniru logika standar penilaian (D7) untuk umpan balik belajar; ambang bersifat usulan | Claude (usulan) |
| D18 | EKG dan bunyi jantung disintesis di peramban dan diberi label sintetis | Menghindari masalah lisensi dan data pasien nyata; gambar/audio berlisensi dapat menggantikan kelak | Claude (usulan) |
| D19 | Aplikasi tidak menilai teknik fisik; stasiun 05 menilai parameter lewat form dan ritme lewat uji ketukan; keterbatasan dinyatakan di UI | Jujur soal batas alat; manikin tetap diperlukan | Claude |
| D20 | Toleransi widget: tensimeter ±4 mmHg, laju deflasi 1,5–4 mmHg/dtk (target 2–3), inflasi 15–40 mmHg di atas estimasi palpatoir (target 20–30), ketukan 100–120/menit | Kontrol manual sulit; toleransi sedikit lebih longgar dari teks butir | Claude (usulan) |
| D21 | Uji end-to-end Chromium dijalankan lokal dengan jam dibekukan; CI hanya tiga cek tanpa browser | Menjaga CI cepat; widget berbasis waktu deterministik | Claude |
| D22 | Umpan balik langsung bersifat opsional (default mati) | OSCE sesungguhnya tidak memberi umpan balik; mode belajar tersedia bagi yang butuh | Claude |
| D23 | Halaman aplikasi memuat `noindex, nofollow` sampai konten direview kardiolog; situs dipublikasikan lewat GitHub Pages dari `main` / root | Pengguna ingin aplikasi dapat dibuka online; konten masih DRAF sehingga tidak boleh muncul di mesin pencari. Tautan tetap dapat dibagikan | Pengguna (Pages), Claude (noindex; mudah dihapus) |
| D24 | Bank stasiun dipisah dari sirkuit: 9 stasiun di bank, 1 sirkuit = 6 stasiun yang dipilih dengan aturan "tiap domain minimal satu stasiun utama (●)" | Kebutuhan variasi antar angkatan/sirkuit tanpa mengubah durasi ujian 60 menit | Claude (usulan, sesi 2) |
| D25 | Bila lebih dari satu sirkuit dipakai: batas lulus per stasiun (BRM lintas sirkuit), batas lulus kandidat = jumlah batas stasiun sirkuitnya; α/SEM dilaporkan per sirkuit | Kesulitan antar sirkuit tidak otomatis setara | Claude (usulan, sesi 2) |
| D26 | S07–S09 dipilih dari bank blueprint (edukasi pasca-IMA, EKG fibrilasi atrium, hipertensi emergensi) | Pengguna hanya meminta "lanjutkan sesi OSCE"; dipilih yang menambah cakupan domain (komunikasi sebelumnya hanya sekunder) dan topik tinggi-yield | Claude (usulan, sesi 2; pengguna belum memilih prioritas) |
| D27 | PR #2 dibuat bertumpuk di atas branch PR #1 (basis = branch PR #1, bukan `main`) | Diff hanya memuat perubahan baru karena PR #1 belum di-merge | Claude (usulan, sesi 2); **diganti**: setelah PR #1 di-merge, basis dialihkan ke `main` |
| D28 | S10 sinkop dipilih sebagai stasiun berikutnya atas permintaan "lanjut stasiun berikutnya"; kasus dibuat berisiko tinggi dengan pengecoh (tamsulosin) | Menguji stratifikasi risiko dan keputusan rawat, bukan sekadar menyalahkan hipotensi ortostatik; anamnesis sebelumnya hanya nyeri dada (S01) dan GJ/hipertensi | Claude (usulan, sesi 2) |
| D29 | S11 pemeriksaan fisik kardiovaskular memakai sukarelawan sehat + penguji membacakan temuan; kasus stenosis mitral rematik dengan AF; bising diastolik hanya dibacakan bila bell + miring kiri + akhir ekspirasi | Mengisi domain pemeriksaan (teknik utuh) yang belum diuji; menyambung ke S08 (AF valvular) dan relevan dengan penyakit jantung rematik di Indonesia; sedikit angka klinis sehingga risiko konten belum terverifikasi lebih kecil | Claude (usulan, sesi 2) |
| D30 | S12 ACLS irama tidak dapat disyok dengan penyebab hiperkalemia (pasien dialisis); alur waktu dikendalikan penguji; dosis obat tidak dinilai | Domain keselamatan dan kerja tim hanya punya satu stasiun utama (S05); menguji kepemimpinan tim, penyebab reversibel, dan serah terima. Dosis tidak dinilai karena belum terverifikasi dan bervariasi antar protokol | Claude (usulan, sesi 2) |
| D31 | Klaim hanya berstatus "Terverifikasi (teks lengkap)" bila dicocokkan ke teks guideline dan dicatat dengan COR/LOE dari teksnya; bila teks bertentangan atau lebih sempit dari stasiun, stasiun diperbaiki dan koreksi dicatat di `guidelines-status` | Menjaga kejujuran status verifikasi; pemeriksaan AF menemukan satu jawaban yang menyiratkan hal yang tidak ada di guideline | Claude (usulan, sesi 2) |
| D32 | S13 gagal jantung kronik HFrEF: menilai pilihan golongan, syarat keamanan, dan titrasi bertahap; **dosis dan ambang angka tidak dinilai** (K, eGFR, TD tidak ditulis sebagai angka di checklist) | Teks guideline tidak tersedia di sesi; menghindari angka yang belum diverifikasi sebagai butir skor | Claude (usulan, sesi 2) |
| D33 | S14 EKG blok AV derajat tiga dengan bradikardia tidak stabil; dosis dan pengaturan pacu tidak dinilai; atropin boleh dicoba atau dilewati dengan alasan benar | Melengkapi bank EKG (S02 STEMI, S08 AF) dan tatalaksana bradikardia; sedikit angka; guideline tidak tersedia di PMC | Claude (usulan, sesi 2) |

## Prinsip yang dipegang

- Jangan mengarang isi sumber yang tidak terbaca; catat sebagai tidak terbaca.
- Sitasi hanya yang metadatanya diverifikasi; bedakan "metadata terverifikasi" dari "angka klinis terverifikasi".
- Skor stasiun harus konsisten (dicek dengan skrip).
