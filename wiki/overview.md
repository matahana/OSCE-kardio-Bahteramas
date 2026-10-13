---
title: Ringkasan proyek
updated: 2026-10-13
---

# Ringkasan proyek

## Tujuan

Menyusun repositori materi OSCE kardiovaskular yang dapat dipakai dan dikembangkan: stasiun lengkap dengan lembar penilaian, blueprint, standar penilaian, panduan penguji dan pasien simulasi, rujukan guideline, dan **aplikasi web simulasi OSCE** (latihan mandiri + mode penguji). Dibuat atas permintaan pengguna (kardiolog), terpisah sepenuhnya dari repositori `panduan-ibadah`. Deskripsi repo yang ditulis pengguna: "aplikasi simulasi OSCE kardiologi untuk RS Bahteramas".

## Status per 13 Oktober 2026

| Hal | Nilai |
|-----|-------|
| Repo | https://github.com/matahana/OSCE-kardio-Bahteramas (nama kanonik; sesi mendaftarkannya sebagai `osce-kardio-bahteramas`, keduanya valid) |
| `main` | Berisi PR #1 (merge `b807f4f`) dan PR #3 (aplikasi simulasi web, tests, CI, dokumentasi; hash merge: lihat `git log`) |
| Branch kerja | `claude/gallant-babbage-fb0o57` (nama ditentukan harness sesi pertama; di-reset ke `main` setelah tiap PR di-merge) |
| PR | #1 dan [#3](https://github.com/matahana/OSCE-kardio-Bahteramas/pull/3) sudah di-merge ke `main` pada 13 Oktober 2026. Tidak ada PR terbuka |
| Konten | 6 stasiun, blueprint, standar penilaian, panduan, rubrik komunikasi, template, rujukan, wiki, `CLAUDE.md`; aplikasi web (`app/`), `tools/` (cek_skor, buat_data, cek_interaksi), `tests/e2e.mjs`, CI `.github/workflows/cek.yml` |
| Status mutu | **DRAF v0.1**, belum direview kardiolog, angka klinis belum diverifikasi ke teks lengkap |

Saat memulai sesi baru, cek PR terbuka dan riwayat `main`, lalu perbarui tabel ini.

## Angka kunci

- 6 stasiun, skor total 135 (25 + 20 + 20 + 20 + 25 + 25)
- 8 menit per stasiun + 2 menit pindah; satu sirkuit 6 stasiun = 60 menit per kandidat
- Penilaian: checklist + butir kritis ⚠ + penilaian global 1–4; batas lulus usulan dengan *borderline regression method*; syarat lulus usulan: skor total ≥ batas lulus, ≥ 4 dari 6 stasiun lulus, tanpa kegagalan butir kritis

## Hal yang tidak boleh diasumsikan

- Bahteramas = RS Bahteramas (menurut deskripsi repo yang ditulis pengguna), tetapi detail institusi tidak dikonfirmasi: kebijakan kelulusan, sumber daya cathlab/simulator, pemetaan kompetensi. Tanyakan bila relevan.
- Level peserta target (dokter muda, dokter umum, atau PPDS) dan jenis ujian (formatif atau sumatif) belum ditetapkan pengguna; draf menargetkan dokter muda/dokter umum.

## Preferensi pengguna yang berlaku di proyek ini

Bahasa Indonesia, profesional dan akurat, berbasis guideline terkini; pengguna mengharapkan sitasi yang benar dan tidak mengarang isi sumber yang tidak terbaca.
