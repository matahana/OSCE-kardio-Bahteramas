# Blueprint OSCE Kardiovaskular

> **DRAF v0.2** — bank berisi 10 stasiun; satu sirkuit ujian terdiri dari 6 stasiun yang dipilih dari bank (lihat [Menyusun sirkuit](#menyusun-sirkuit-dari-bank-stasiun)).

Blueprint memastikan ujian mencakup kompetensi yang direncanakan secara proporsional, bukan sekadar kumpulan stasiun yang kebetulan tersedia.

## Prinsip desain

- **Level Miller:** seluruh stasiun menguji *Shows how* (peragaan terstandar). Pengetahuan (*Knows*, *Knows how*) diuji dengan MCQ/essay di luar OSCE.
- **Satu tugas klinis utama per stasiun.** Tugas sekunder (mis. komunikasi) dinilai sebagai komponen dalam stasiun yang sama, bukan stasiun terpisah.
- **Durasi seragam:** 8 menit per stasiun + 2 menit pindah/membaca instruksi, supaya rotasi sinkron.
- **Satu sirkuit = 6 stasiun dari bank = 60 menit per kandidat.** Enam kandidat dapat diuji serentak dalam satu sirkuit; tambah sirkuit paralel sesuai jumlah kandidat.
- **Penilaian:** checklist per butir + penilaian global ([standar-penilaian.md](standar-penilaian.md)).

## Matriks blueprint (v0.2)

● = domain utama stasiun · ○ = domain sekunder yang ikut dinilai

| No | Stasiun | Anamnesis | Pemeriksaan fisik / prosedur | Interpretasi data | Tatalaksana | Komunikasi / edukasi | Keselamatan & kerja tim |
|----|---------|:---------:|:----------------------------:|:-----------------:|:-----------:|:--------------------:|:-----------------------:|
| 01 | [Anamnesis nyeri dada akut](../stasiun/01-anamnesis-nyeri-dada.md) | ● |   | ○ | ○ | ● | ○ |
| 02 | [Interpretasi EKG — STEMI inferior](../stasiun/02-ekg-stemi-inferior.md) |   |   | ● | ● | ○ |   |
| 03 | [Auskultasi jantung](../stasiun/03-auskultasi-jantung.md) |   | ● | ○ |   | ○ |   |
| 04 | [Pengukuran tekanan darah](../stasiun/04-pengukuran-tekanan-darah.md) |   | ● | ○ |   | ○ | ○ |
| 05 | [BLS henti jantung + AED](../stasiun/05-bls-henti-jantung.md) |   | ● |   |   | ○ | ● |
| 06 | [Gagal jantung akut dekompensasi](../stasiun/06-gagal-jantung-akut-dekompensasi.md) | ● | ● | ● | ● | ○ | ○ |
| 07 | [Edukasi pasca-infark miokard](../stasiun/07-edukasi-pasca-infark.md) |   |   | ○ | ○ | ● | ○ |
| 08 | [Interpretasi EKG — fibrilasi atrium](../stasiun/08-ekg-fibrilasi-atrium.md) |   |   | ● | ● | ○ | ○ |
| 09 | [Hipertensi emergensi](../stasiun/09-hipertensi-emergensi.md) | ● | ● | ○ | ● | ○ | ○ |
| 10 | [Sinkop: anamnesis dan stratifikasi risiko](../stasiun/10-sinkop.md) | ● | ○ | ● | ○ | ○ | ○ |

## Menyusun sirkuit dari bank stasiun

Pilih 6 stasiun per sirkuit dengan aturan berikut, lalu periksa matriks di atas:

1. Tiap domain (kolom) punya **minimal satu stasiun utama (●)** dalam sirkuit.
2. Bila lebih dari satu sirkuit dipakai pada hari yang sama, stasiun yang sama dinilai dengan lembar yang sama, dan batas lulus dihitung per stasiun (lihat [standar penilaian](standar-penilaian.md#7-lebih-dari-satu-sirkuit)).

Contoh sirkuit (keduanya memenuhi aturan 1):

| Sirkuit | Stasiun | Skor total |
|---------|---------|:----------:|
| A (IGD dan emergensi) | S01, S02, S03, S05, S06, S07 | 140 |
| B (tatalaksana dan edukasi) | S04, S05, S06, S07, S08, S09 | 135 |

Sirkuit A menekankan SKA dan kegawatan; sirkuit B menekankan hipertensi, aritmia, dan edukasi. Tim ujian dapat menyusun sirkuit lain selama memenuhi aturan di atas.

## Pemetaan ke standar kompetensi

Petakan tiap stasiun ke area kompetensi dan tingkat kemampuan yang berlaku di institusi (SNPPDI/KKI atau kurikulum lokal). Kolom pemetaan diisi oleh tim kurikulum — belum diisi pada draf ini.

## Bank stasiun yang direncanakan

- [ ] Gagal jantung kronik: optimalisasi terapi medis dan edukasi pulang (melengkapi S06 yang berfokus akut)
- [x] Edukasi pasca-infark miokard dan pencegahan sekunder (S07)
- [x] Interpretasi EKG: fibrilasi atrium (S08)
- [ ] Interpretasi EKG lain: blok AV derajat tinggi, takikardia kompleks lebar
- [ ] ACLS: irama tidak dapat diberi syok dan penggunaan obat
- [x] Hipertensi emergensi: penilaian kerusakan organ target dan tatalaksana awal (S09)
- [x] Sinkop: anamnesis, pemeriksaan ortostatik, dan stratifikasi risiko (S10)
- [ ] Pemeriksaan fisik kardiovaskular lengkap (palpasi prekordium, nadi perifer)
- [ ] Interpretasi foto toraks: kardiomegali dan edema paru
- [ ] Varian auskultasi: MR, MS, AR, S3/S4
