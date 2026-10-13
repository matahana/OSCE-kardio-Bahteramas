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
| `main` | Berisi PR #1 (merge `b807f4f`), PR #3 (merge `024a359`: aplikasi simulasi web, tests, CI, dokumentasi), dan PR #4 (merge `5c52eb7`: persiapan GitHub Pages, `noindex`, koreksi wiki) |
| Branch kerja | Sesi 1 (aplikasi): `claude/gallant-babbage-fb0o57` (di-reset ke `main` setelah tiap PR di-merge) · Sesi 2 (stasiun 07–14): `claude/happy-darwin-oxpyko` (nama ditentukan harness tiap sesi) |
| PR | #1, [#3](https://github.com/matahana/OSCE-kardio-Bahteramas/pull/3), dan #4 sudah di-merge ke `main` (13 Oktober 2026). **[#2](https://github.com/matahana/OSCE-kardio-Bahteramas/pull/2) masih terbuka (draft)**: v0.2 dengan stasiun 07–14 dan penyusunan sirkuit, basis `main`; branch-nya sudah digabung dengan `main` dan kini memuat interaksi aplikasi untuk stasiun 07–14 (pemeriksaan lokal hijau, `--ketat` lulus; status CI terkini lihat halaman PR). Merge menunggu keputusan pengguna |
| Visibilitas | Publik. GitHub Pages **belum aktif** (`has_pages: false`) |
| Situs web | Setelah Pages aktif: https://matahana.github.io/OSCE-kardio-Bahteramas/ (mengalihkan ke `app/`). Tidak dapat diaktifkan dari sesi (tidak ada tool, token `gh` tidak valid); pengguna mengaktifkan manual di Settings → Pages (`main` / root) |
| Konten | Bank 14 stasiun (aplikasi memuat interaksi untuk seluruh 14 stasiun), blueprint (bank + sirkuit), standar penilaian, panduan, rubrik komunikasi, template, rujukan, `assets/ekg/README.md`, wiki, `CLAUDE.md`; aplikasi web (`app/`), `tools/` (cek_skor, buat_data, cek_interaksi), `tests/e2e.mjs`, CI `.github/workflows/cek.yml` |
| Status mutu | **DRAF v0.2**, belum direview kardiolog. Angka klinis belum diverifikasi ke teks lengkap kecuali klaim fibrilasi atrium (S08, sebagian S11) yang dicocokkan ke Joglar 2023 pada 13 Oktober 2026; guideline lain tidak punya teks lengkap di PMC |

Saat memulai sesi baru, cek PR terbuka dan riwayat `main`, lalu perbarui tabel ini. Branch basis dan `main` dapat bergerak selama sesi (terjadi di sesi 2: branch PR #1 `f69a580` → `90c689f`, lalu `main` bergerak dua kali oleh sesi paralel); `git fetch` sebelum membuat PR bertumpuk atau mendorong.

## Angka kunci

- Bank 14 stasiun, skor total 305 (S01–S14: 25, 20, 20, 20, 25, 25, 25, 20, 20, 20, 20, 25, 20, 20)
- 8 menit per stasiun + 2 menit pindah; satu sirkuit 6 stasiun dari bank = 60 menit per kandidat
- Contoh sirkuit di blueprint: A (S01, S02, S03, S05, S06, S07) = 140; B (S04–S09) = 135; keduanya memenuhi aturan "tiap domain punya minimal satu stasiun utama"
- Penilaian: checklist + butir kritis ⚠ + penilaian global 1–4; batas lulus usulan dengan *borderline regression method*; syarat lulus usulan: skor total ≥ batas lulus, ≥ 4 dari 6 stasiun lulus, tanpa kegagalan butir kritis

## Hal yang tidak boleh diasumsikan

- Bahteramas = RS Bahteramas (menurut deskripsi repo yang ditulis pengguna), tetapi detail institusi tidak dikonfirmasi: kebijakan kelulusan, sumber daya cathlab/simulator, pemetaan kompetensi. Tanyakan bila relevan.
- Pengguna (kardiolog) menyatakan pada 13 Oktober 2026: aplikasi untuk **latihan mahasiswa (simulasi)** dan untuk **penguji menguji hasil belajar mahasiswa**, diakses online; pengguna akan mereview sendiri setelah aplikasi dinyatakan selesai. Level peserta (dokter muda, dokter umum, atau PPDS) dan formatif/sumatif belum dijawab; draf menargetkan dokter muda/dokter umum.

## Preferensi pengguna yang berlaku di proyek ini

Bahasa Indonesia, profesional dan akurat, berbasis guideline terkini; pengguna mengharapkan sitasi yang benar dan tidak mengarang isi sumber yang tidak terbaca.
