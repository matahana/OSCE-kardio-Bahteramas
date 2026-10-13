# Standar Penilaian OSCE

Dokumen ini menetapkan cara menilai, menetapkan batas lulus, dan menganalisis hasil. **Seluruh angka kebijakan di sini adalah usulan draf**; tim ujian institusi menetapkannya sebelum ujian dan mengumumkannya kepada kandidat.

## 1. Komponen penilaian per stasiun

1. **Checklist butir.** Setiap butir dinilai oleh penguji saat perilaku terlihat (dilakukan / tidak dilakukan; sebagian butir punya skor parsial yang tertulis di stasiun). Penguji tidak menebak niat kandidat.
2. **Butir kritis (⚠).** Butir yang berkaitan dengan keselamatan pasien atau keputusan klinis yang tidak boleh terlewat. Ditandai ⚠ pada lembar penilaian.
3. **Penilaian global.** Diisi penguji *setelah* checklist, berdasarkan kesan keseluruhan, bukan hasil hitung skor:

| Kode | Kategori | Makna |
|:----:|----------|-------|
| 1 | Tidak lulus | Kinerja jelas di bawah standar; tidak aman atau tidak kompeten untuk tugas ini |
| 2 | Borderline | Mendekati standar minimum; sebagian domain memadai, sebagian belum |
| 3 | Lulus | Memenuhi standar minimum yang diharapkan pada level pendidikan ini |
| 4 | Sangat baik | Melampaui standar; sistematis, aman, dan komunikatif |

## 2. Skor stasiun

```
Skor stasiun (%) = skor checklist / skor maksimum stasiun × 100
```

Skor maksimum tiap stasiun tercantum pada lembar penilaiannya (S01 = 25, S02 = 20, S03 = 20, S04 = 20, S05 = 25, S06 = 25, S07 = 25, S08 = 20, S09 = 20, S10 = 20, S11 = 20). Skor maksimum sirkuit adalah jumlah skor 6 stasiun yang dipilih (lihat [blueprint](blueprint.md#menyusun-sirkuit-dari-bank-stasiun)).

## 3. Penetapan batas lulus (*standard setting*)

Metode yang diusulkan: **borderline regression method (BRM)**.

1. Untuk setiap stasiun, kumpulkan pasangan (skor checklist, penilaian global) dari seluruh kandidat.
2. Regresikan skor checklist (Y) terhadap kode penilaian global (X = 1–4).
3. **Batas lulus stasiun** = nilai Y prediksi pada X = 2 (borderline).
4. **Batas lulus ujian** = jumlah batas lulus seluruh stasiun. Sebagian institusi menambahkan 1 *standard error of measurement* (SEM); putuskan kebijakannya sebelum ujian.

Catatan: BRM lebih stabil bila pengamatan per stasiun banyak. Pada kohort kecil, batas lulus bisa bergeser antar angkatan; gunakan metode lain (mis. Angoff termodifikasi atau *borderline group*) sebagai pembanding.

## 4. Keputusan kelulusan (usulan)

Kandidat lulus bila **semua** syarat berikut terpenuhi:

- skor total ≥ batas lulus ujian;
- lulus minimal *k* dari *N* stasiun dalam sirkuit yang dijalani (usulan: 4 dari 6);
- tidak ada kegagalan pada butir kritis. Usulan default: kegagalan butir kritis menjadikan stasiun itu tidak lulus terlepas dari skor total, dan ditinjau panitia.

Nilai *k* dan kebijakan butir kritis ditetapkan tim ujian dan diumumkan sebelum ujian.

## 5. Analisis pasca-ujian

| Analisis | Tujuan | Acuan umum |
|----------|--------|------------|
| Cronbach's α antar stasiun | Reliabilitas ujian | ≥ 0,7 minimal; ≥ 0,8 diharapkan untuk keputusan berisiko tinggi |
| SEM = SD × √(1 − α) | Ketidakpastian skor di sekitar batas lulus | Dilaporkan bersama batas lulus |
| Korelasi stasiun–total (*item-rest*) | Daya beda stasiun | Korelasi rendah/negatif → tinjau stasiun |
| Distribusi penilaian global | Kalibrasi penguji | Hindari penguji yang selalu memberi nilai yang sama |
| Konsistensi antar penguji (ICC) | Bila ada dua penguji pada stasiun yang sama | Tinjau penguji yang menyimpang |

## 6. Umpan balik untuk kandidat

Berikan umpan balik per domain (anamnesis, pemeriksaan, interpretasi, tatalaksana, komunikasi, keselamatan), bukan hanya angka. Pada OSCE formatif, perlihatkan checklist stasiun setelah ujian.

## 7. Lebih dari satu sirkuit

Bila kandidat menjalani sirkuit dengan susunan stasiun berbeda (mis. sirkuit A dan B pada [blueprint](blueprint.md#menyusun-sirkuit-dari-bank-stasiun)), tingkat kesulitan antar sirkuit tidak otomatis setara. Usulan:

1. Hitung batas lulus **per stasiun** dengan BRM memakai data seluruh kandidat yang menjalani stasiun itu, lintas sirkuit.
2. Batas lulus ujian tiap kandidat = jumlah batas lulus stasiun pada sirkuit yang ia jalani. Bandingkan skor kandidat dengan batas itu (atau dalam persen terhadap skor maksimum sirkuit), bukan dengan angka tetap yang sama untuk semua sirkuit.
3. Laporkan Cronbach's α, SEM, dan korelasi stasiun–total **per sirkuit**. Bila jumlah kandidat per sirkuit kecil, tafsirkan dengan hati-hati dan pertimbangkan satu sirkuit saja.
4. Tetapkan kebijakan ini sebelum ujian, bersama nilai *k* dan kebijakan butir kritis.
