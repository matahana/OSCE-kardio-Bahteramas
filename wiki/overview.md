---
title: Ringkasan proyek
updated: 2026-10-13
---

# Ringkasan proyek

## Tujuan

Menyusun repositori materi OSCE kardiovaskular yang dapat dipakai dan dikembangkan: stasiun lengkap dengan lembar penilaian, blueprint, standar penilaian, panduan penguji dan pasien simulasi, serta rujukan guideline. Dibuat atas permintaan pengguna (kardiolog), terpisah sepenuhnya dari repositori `panduan-ibadah`.

## Status per 13 Oktober 2026

| Hal | Nilai |
|-----|-------|
| Repo | https://github.com/matahana/OSCE-kardio-Bahteramas (nama kanonik; sesi mendaftarkannya sebagai `osce-kardio-bahteramas`, keduanya valid) |
| `main` | Hanya commit awal `556c575` (stub README) |
| Branch kerja | `claude/gallant-babbage-fb0o57` (nama ditentukan harness sesi pertama) |
| PR | [#1](https://github.com/matahana/OSCE-kardio-Bahteramas/pull/1), **draft**, belum di-merge saat catatan ini ditulis |
| Konten | 6 stasiun, blueprint, standar penilaian, panduan, rubrik komunikasi, template, rujukan, wiki, `CLAUDE.md`, `tools/cek_skor.py` |
| Status mutu | **DRAF v0.1**, belum direview kardiolog, angka klinis belum diverifikasi ke teks lengkap |

Saat memulai sesi baru, cek dulu apakah PR #1 sudah di-merge atau ditutup, lalu perbarui tabel ini.

## Angka kunci

- 6 stasiun, skor total 135 (25 + 20 + 20 + 20 + 25 + 25)
- 8 menit per stasiun + 2 menit pindah; satu sirkuit 6 stasiun = 60 menit per kandidat
- Penilaian: checklist + butir kritis ⚠ + penilaian global 1–4; batas lulus usulan dengan *borderline regression method*; syarat lulus usulan: skor total ≥ batas lulus, ≥ 4 dari 6 stasiun lulus, tanpa kegagalan butir kritis

## Hal yang tidak boleh diasumsikan

- Identitas institusi di balik nama "Bahteramas" tidak dikonfirmasi pengguna. Tanyakan bila relevan (mis. untuk sumber daya cathlab, kebijakan kelulusan, pemetaan kompetensi).
- Level peserta target (dokter muda, dokter umum, atau PPDS) dan jenis ujian (formatif atau sumatif) belum ditetapkan pengguna; draf menargetkan dokter muda/dokter umum.

## Preferensi pengguna yang berlaku di proyek ini

Bahasa Indonesia, profesional dan akurat, berbasis guideline terkini; pengguna mengharapkan sitasi yang benar dan tidak mengarang isi sumber yang tidak terbaca.
