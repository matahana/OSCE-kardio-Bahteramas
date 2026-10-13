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

## Prinsip yang dipegang

- Jangan mengarang isi sumber yang tidak terbaca; catat sebagai tidak terbaca.
- Sitasi hanya yang metadatanya diverifikasi; bedakan "metadata terverifikasi" dari "angka klinis terverifikasi".
- Skor stasiun harus konsisten (dicek dengan skrip).
