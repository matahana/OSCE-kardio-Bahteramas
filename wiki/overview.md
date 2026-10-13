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
| `main` | `b807f4f`: merge PR #1 (kerangka v0.1 + wiki + `CLAUDE.md` + `tools/cek_skor.py`), di-merge pengguna 13 Oktober 2026 16:31 UTC |
| Branch kerja | Sesi 1: `claude/gallant-babbage-fb0o57` · Sesi 2: `claude/happy-darwin-oxpyko` (nama ditentukan harness tiap sesi) |
| PR | [#1](https://github.com/matahana/OSCE-kardio-Bahteramas/pull/1) (v0.1) **sudah di-merge** · [#2](https://github.com/matahana/OSCE-kardio-Bahteramas/pull/2) (v0.2: S07–S13), **draft**, basis sudah dialihkan ke `main` (semula branch PR #1); sesi 2 berlangganan pemantauan PR #2 |
| Konten | 13 stasiun, blueprint (bank + sirkuit), standar penilaian, panduan, rubrik komunikasi, template, rujukan, `assets/ekg/README.md`, wiki, `CLAUDE.md`, `tools/cek_skor.py` |
| Status mutu | **DRAF v0.2**, belum direview kardiolog. Angka klinis belum diverifikasi ke teks lengkap kecuali klaim fibrilasi atrium (S08, sebagian S11) yang dicocokkan ke Joglar 2023 pada 13 Oktober 2026; guideline lain tidak punya teks lengkap di PMC |

Saat memulai sesi baru, cek dulu apakah PR #2 sudah di-merge atau ditutup, lalu perbarui tabel ini. Branch basis dapat bergerak selama sesi (terjadi di sesi 2: `f69a580` → `90c689f`); `git fetch` sebelum membuat PR bertumpuk.

## Angka kunci

- Bank 13 stasiun, skor total 285 (S01–S13: 25, 20, 20, 20, 25, 25, 25, 20, 20, 20, 20, 25, 20)
- 8 menit per stasiun + 2 menit pindah; satu sirkuit 6 stasiun dari bank = 60 menit per kandidat
- Contoh sirkuit di blueprint: A (S01, S02, S03, S05, S06, S07) = 140; B (S04–S09) = 135; keduanya memenuhi aturan "tiap domain punya minimal satu stasiun utama"
- Penilaian: checklist + butir kritis ⚠ + penilaian global 1–4; batas lulus usulan dengan *borderline regression method*; syarat lulus usulan: skor total ≥ batas lulus, ≥ 4 dari 6 stasiun lulus, tanpa kegagalan butir kritis

## Hal yang tidak boleh diasumsikan

- Identitas institusi di balik nama "Bahteramas" tidak dikonfirmasi pengguna. Tanyakan bila relevan (mis. untuk sumber daya cathlab, kebijakan kelulusan, pemetaan kompetensi).
- Level peserta target (dokter muda, dokter umum, atau PPDS) dan jenis ujian (formatif atau sumatif) belum ditetapkan pengguna; draf menargetkan dokter muda/dokter umum.

## Preferensi pengguna yang berlaku di proyek ini

Bahasa Indonesia, profesional dan akurat, berbasis guideline terkini; pengguna mengharapkan sitasi yang benar dan tidak mengarang isi sumber yang tidak terbaca.
