/* BERKAS HASIL GENERATOR — jangan disunting tangan.
   Sumber: stasiun/*.md. Perbarui dengan: python3 -I tools/buat_data.py */
window.OSCE_DATA = {
 "urutan": [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14"
 ],
 "stasiun": {
  "01": {
   "id": "01",
   "judul": "Anamnesis nyeri dada akut",
   "berkas": "stasiun/01-anamnesis-nyeri-dada.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "25",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Analyze",
    "Domain": "Anamnesis, penalaran klinis, komunikasi",
    "Jenis": "Pasien simulasi (SP)",
    "Level peserta": "Dokter muda klinik / dokter umum (dapat dinaikkan untuk PPDS dengan menambah pertanyaan lanjutan)",
    "Status": "DRAF — belum direview kardiolog"
   },
   "durasiMenit": 8,
   "skorMaks": 25,
   "instruksiKandidat": "Anda dokter jaga IGD. Seorang laki-laki berusia 58 tahun datang dengan keluhan **nyeri dada sejak 1 jam yang lalu**. Perawat telah mengukur tanda vital dan EKG sedang disiapkan.\n\nTanda vital: TD 150/90 mmHg · nadi 96 x/menit · napas 20 x/menit · SpO₂ 96% udara ruang · suhu 36,8 °C.\n\n**Tugas:**\n1. Lakukan anamnesis terfokus pada keluhan nyeri dada, termasuk faktor risiko.\n2. Pada akhir stasiun, sampaikan ringkasan dan rencana awal kepada pasien.\n\nPemeriksaan fisik **tidak perlu** dilakukan. Waktu 8 menit; penguji memberi tanda saat tersisa 1 menit.",
   "pertanyaanLanjutan": "1. \"Sebutkan diagnosis kerja dan diagnosis banding yang tidak boleh terlewat pada pasien ini.\" *(SKA/IMA; diseksi aorta, emboli paru, pneumotoraks tension, ruptur esofagus.)*\n2. \"Apa yang Anda lakukan dalam 10 menit pertama?\" *(EKG 12 sadapan dalam 10 menit sejak kontak medis pertama, monitor, akses IV, troponin, terapi sesuai hasil EKG.)*",
   "catatan": "- Kesalahan umum: terpaku pada SKA tanpa menyingkirkan diseksi aorta/emboli paru; lupa menanyakan kontraindikasi antitrombotik; menggunakan istilah medis tanpa penjelasan.\n- Variasi: ubah ke SP wanita 62 tahun dengan presentasi atipikal (sesak, kelelahan, nyeri epigastrium) untuk menguji bias presentasi.\n- Waktu EKG dan data troponin sengaja tidak diberikan agar stasiun fokus pada anamnesis.",
   "rujukan": "- Gulati M, et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR Guideline for the Evaluation and Diagnosis of Chest Pain. *Circulation*. 2021;144:e368–e454.\n- Rao SV, et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes. *Circulation*. 2025;151:e771–e862.\n- Byrne RA, et al. 2023 ESC Guidelines for the management of acute coronary syndromes. *Eur Heart J*. 2023;44:3720–3826.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "A": "Pembukaan",
    "B": "Karakteristik nyeri dada",
    "C": "Diagnosis banding dan tanda bahaya",
    "D": "Faktor risiko dan riwayat",
    "E": "Penutup dan komunikasi"
   },
   "checklist": [
    {
     "id": "A1",
     "grup": "A",
     "teks": "Memberi salam, memperkenalkan diri, menyebutkan peran",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A2",
     "grup": "A",
     "teks": "Mengonfirmasi identitas pasien (nama, usia)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A3",
     "grup": "A",
     "teks": "Menjelaskan tujuan anamnesis dan meminta persetujuan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B1",
     "grup": "B",
     "teks": "Lokasi nyeri",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B2",
     "grup": "B",
     "teks": "Onset dan durasi (kapan mulai, masih berlangsung)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B3",
     "grup": "B",
     "teks": "Kualitas nyeri",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B4",
     "grup": "B",
     "teks": "Penjalaran (lengan, rahang, punggung)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B5",
     "grup": "B",
     "teks": "Faktor pencetus (aktivitas, emosi, makan, posisi, napas)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B6",
     "grup": "B",
     "teks": "Faktor pereda/pemberat (istirahat, nitrat, posisi)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B7",
     "grup": "B",
     "teks": "Keparahan (skala 0–10)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B8",
     "grup": "B",
     "teks": "Gejala penyerta: sesak, keringat dingin, mual/muntah, berdebar, sinkop (≥ 3 dari 5 = 2 poin; 1–2 = 1 poin)",
     "skor": 2,
     "kritis": false
    },
    {
     "id": "B9",
     "grup": "B",
     "teks": "Pola/progresi: episode sebelumnya, memburuk atau tidak",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C1",
     "grup": "C",
     "teks": "Menanyakan nyeri seperti disobek / menjalar ke punggung (diseksi aorta)",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "C2",
     "grup": "C",
     "teks": "Menanyakan nyeri pleuritik/posisional, demam, batuk (perikarditis, pleuritis, pneumonia)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C3",
     "grup": "C",
     "teks": "Menanyakan sesak mendadak, imobilisasi/perjalanan jauh, bengkak tungkai (emboli paru)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C4",
     "grup": "C",
     "teks": "Menanyakan kaitan dengan makan/rasa asam dan nyeri dinding dada (GERD, muskuloskeletal)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D1",
     "grup": "D",
     "teks": "Hipertensi, diabetes, dan dislipidemia (ketiganya ditanyakan)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D2",
     "grup": "D",
     "teks": "Merokok (jumlah dan lama)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D3",
     "grup": "D",
     "teks": "Riwayat keluarga PJK/kematian mendadak usia muda",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D4",
     "grup": "D",
     "teks": "Riwayat penyakit/prosedur jantung dan obat yang sedang dikonsumsi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D5",
     "grup": "D",
     "teks": "Alergi obat dan riwayat perdarahan (ulkus/perdarahan saluran cerna, stroke hemoragik) sebelum terapi antitrombotik",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "E1",
     "grup": "E",
     "teks": "Meringkas anamnesis dan memeriksa pemahaman pasien",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E2",
     "grup": "E",
     "teks": "Menyampaikan rencana awal (EKG segera, pemantauan, pemeriksaan darah) dengan bahasa awam",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E3",
     "grup": "E",
     "teks": "Menunjukkan empati dan menanggapi kecemasan pasien",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "02": {
   "id": "02",
   "judul": "Interpretasi EKG: STEMI inferior",
   "berkas": "stasiun/02-ekg-stemi-inferior.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "20",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Analyze",
    "Domain": "Interpretasi data, tatalaksana awal, presentasi kasus",
    "Jenis": "Data (EKG 12 sadapan) + penguji",
    "Level peserta": "Dokter muda klinik / dokter umum",
    "Status": "DRAF — **gambar EKG belum disertakan**"
   },
   "durasiMenit": 8,
   "skorMaks": 20,
   "instruksiKandidat": "Anda dokter jaga IGD. Seorang laki-laki 58 tahun datang dengan nyeri dada tipikal sejak 1 jam disertai keringat dingin. TD 110/70 mmHg, nadi 75 x/menit, napas 20 x/menit, SpO₂ 95% udara ruang. EKG 12 sadapan di hadapan Anda.\n\n**Tugas:**\n1. Interpretasikan EKG secara sistematis (secara lisan).\n2. Sebutkan diagnosis.\n3. Sebutkan tatalaksana awal yang Anda lakukan di IGD.",
   "pertanyaanLanjutan": "1. \"Sadapan tambahan apa yang Anda minta, dan mengapa?\" *(V4R untuk infark ventrikel kanan; V7–V9 bila dicurigai posterior.)*\n2. \"Obat apa yang harus Anda hindari bila ada infark ventrikel kanan atau hipotensi?\" *(Nitrat; pasien bergantung preload.)*\n3. \"Komplikasi apa yang perlu diantisipasi pada STEMI inferior?\" *(Bradikardia/blok AV, hipotensi, infark RV.)*\n4. \"Sebutkan kontraindikasi fibrinolisis.\" *(Riwayat perdarahan intrakranial, stroke iskemik < 3 bulan, tumor intrakranial, diseksi aorta, perdarahan aktif, trauma kepala/wajah berat < 3 bulan.)*\n5. \"Apakah Anda menunggu hasil troponin sebelum reperfusi?\" *(Tidak.)*",
   "catatan": "- Sesuaikan butir 7d dengan ketersediaan cathlab 24 jam dan fibrinolitik di rumah sakit setempat serta pedoman PERKI terbaru.\n- Variasi: STEMI anterior (V1–V4), STEMI posterior (depresi ST V1–V3), blok cabang berkas dengan nyeri dada.\n- Kesalahan umum: menyebut \"iskemia inferior\" tanpa mengatakan STEMI; lupa perubahan resiprokal; menunggu troponin; memberi nitrat pada kecurigaan infark RV.",
   "rujukan": "- Rao SV, et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes. *Circulation*. 2025;151:e771–e862.\n- Byrne RA, et al. 2023 ESC Guidelines for the management of acute coronary syndromes. *Eur Heart J*. 2023;44:3720–3826.\n- Pedoman PERKI terbaru untuk SKA — verifikasi edisi yang berlaku.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {},
   "checklist": [
    {
     "id": "1",
     "grup": null,
     "teks": "Laju jantung ± 75 x/menit (rentang 70–80 diterima)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "2",
     "grup": null,
     "teks": "Irama: sinus, reguler",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "3",
     "grup": null,
     "teks": "Interval PR, QRS, QT normal (1 poin per interval)",
     "skor": 3,
     "kritis": false
    },
    {
     "id": "4a",
     "grup": null,
     "teks": "Menyebut elevasi ST di II, III, aVF (3 sadapan = 2 poin; 2 sadapan = 1 poin)",
     "skor": 2,
     "kritis": false
    },
    {
     "id": "4b",
     "grup": null,
     "teks": "Menyatakan elevasi ST bermakna pada ≥ 2 sadapan yang berdekatan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "4c",
     "grup": null,
     "teks": "Menyebut morfologi pendukung (ST konveks, T hiperakut, atau Q baru)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "5a",
     "grup": null,
     "teks": "Menyebut depresi ST di I dan aVL",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "5b",
     "grup": null,
     "teks": "Mengenalinya sebagai perubahan resiprokal",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "6a",
     "grup": null,
     "teks": "Diagnosis: **STEMI**",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "6b",
     "grup": null,
     "teks": "Lokasi: **inferior**",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "6c",
     "grup": null,
     "teks": "Menyatakan kondisi ini kedaruratan yang bergantung waktu (aktivasi jalur reperfusi, konsultasi kardiolog)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "7a",
     "grup": null,
     "teks": "Aspirin dosis muat dikunyah",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "7b",
     "grup": null,
     "teks": "Penghambat P2Y12 (prasugrel atau ticagrelor; klopidogrel bila tidak tersedia/kontraindikasi)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "7c",
     "grup": null,
     "teks": "Antikoagulan parenteral (UFH)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "7d",
     "grup": null,
     "teks": "Strategi reperfusi: PCI primer, atau fibrinolisis bila PCI tidak dapat dilakukan tepat waktu",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "8a",
     "grup": null,
     "teks": "Presentasi sistematis dan terstruktur",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "8b",
     "grup": null,
     "teks": "Jelas, ringkas, menyebut eskalasi/tindak lanjut",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "03": {
   "id": "03",
   "judul": "Auskultasi jantung",
   "berkas": "stasiun/03-auskultasi-jantung.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "20",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Analyze",
    "Domain": "Pemeriksaan fisik, interpretasi, komunikasi",
    "Jenis": "Manikin simulator auskultasi (atau rekaman audio)",
    "Level peserta": "Dokter muda klinik / dokter umum",
    "Status": "DRAF — butuh simulator atau rekaman audio berlisensi"
   },
   "durasiMenit": 8,
   "skorMaks": 20,
   "instruksiKandidat": "Seorang laki-laki 70 tahun datang ke poliklinik dengan **sesak saat aktivitas** dan **satu kali pingsan** saat naik tangga. Di hadapan Anda tersedia manikin simulator auskultasi (dianggap sebagai pasien).\n\n**Tugas:**\n1. Lakukan auskultasi jantung secara sistematis.\n2. Jelaskan temuan Anda.\n3. Sebutkan kemungkinan diagnosis dan pemeriksaan lanjutan.\n\nAnda dapat menyatakan secara lisan hal yang tidak dapat diperagakan pada manikin (mis. posisi pasien).",
   "pertanyaanLanjutan": "1. \"Mengapa pasien ini bisa pingsan saat aktivitas?\" *(Curah jantung tidak dapat meningkat melawan obstruksi tetap + vasodilatasi saat aktivitas.)*\n2. \"Gejala apa yang menandakan stenosis aorta berat bergejala?\" *(Angina, sinkop, gagal jantung.)*\n3. \"Apa yang menentukan perlunya intervensi katup?\" *(Keparahan berdasarkan ekokardiografi dan adanya gejala; ditentukan bersama tim jantung.)*",
   "catatan": "- Kesalahan umum: tidak menentukan sistol/diastol, hanya menyebut \"ada bising\"; tidak mendengarkan penjalaran; tidak menyebut lokasi.\n- Jika simulator tidak ada, gunakan rekaman audio lewat headset dan stetoskop kandidat; isi C1–C6 tetap sama.",
   "rujukan": "- Pedoman pemeriksaan fisik jantung di buku ajar institusi.\n- Otto CM, et al. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease. *Circulation*. 2021;143:e72–e227.\n- Vahanian A, et al. 2021 ESC/EACTS Guidelines for the management of valvular heart disease. *Eur Heart J*. 2022;43:561–632.\n- Kedua guideline katup di atas: metadata terverifikasi, **isi belum dicocokkan** (teks tidak tersedia di PMC); verifikasi sebelum menaikkan butir pertanyaan lanjutan menjadi butir skor.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "A": "Persiapan",
    "B": "Teknik",
    "C": "Interpretasi",
    "D": "Komunikasi"
   },
   "checklist": [
    {
     "id": "A1",
     "grup": "A",
     "teks": "Memberi salam, memperkenalkan diri, menjelaskan pemeriksaan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A2",
     "grup": "A",
     "teks": "Mencuci tangan / menyatakan cuci tangan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A3",
     "grup": "A",
     "teks": "Memposisikan pasien (terlentang 30–45°) dan memajankan dada dengan menjaga privasi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B1",
     "grup": "B",
     "teks": "Area aorta (SIK 2 kanan parasternal)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B2",
     "grup": "B",
     "teks": "Area pulmonal (SIK 2 kiri parasternal)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B3",
     "grup": "B",
     "teks": "Titik Erb (SIK 3 kiri parasternal)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B4",
     "grup": "B",
     "teks": "Area trikuspid (SIK 4–5 kiri parasternal)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B5",
     "grup": "B",
     "teks": "Area mitral/apeks (SIK 5 linea midklavikula kiri)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B6",
     "grup": "B",
     "teks": "Diafragma untuk frekuensi tinggi dan bell untuk frekuensi rendah (apeks)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B7",
     "grup": "B",
     "teks": "Palpasi nadi karotis/radial bersamaan untuk menentukan sistol dan diastol",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B8",
     "grup": "B",
     "teks": "Auskultasi penjalaran (karotis) dan menyebut manuver tambahan yang sesuai (lateral kiri untuk mitral; duduk condong ke depan saat ekspirasi untuk AR)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C1",
     "grup": "C",
     "teks": "Menyebut S1 dan S2 (intensitas; S2 melemah)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C2",
     "grup": "C",
     "teks": "Menyebut adanya bising dan waktunya (sistolik)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C3",
     "grup": "C",
     "teks": "Menyebut lokasi terkeras (area aorta)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C4",
     "grup": "C",
     "teks": "Menyebut karakter dan penjalaran (ejeksi, crescendo–decrescendo; ke karotis)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C5",
     "grup": "C",
     "teks": "Diagnosis: stenosis aorta",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C6",
     "grup": "C",
     "teks": "Pemeriksaan lanjutan: EKG dan ekokardiografi transtorakal",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D1",
     "grup": "D",
     "teks": "Menjelaskan temuan kepada pasien dengan bahasa awam",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D2",
     "grup": "D",
     "teks": "Bahasa jelas dan terstruktur, tidak terburu-buru",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D3",
     "grup": "D",
     "teks": "Merapikan pakaian pasien, menutup dengan sopan",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "04": {
   "id": "04",
   "judul": "Pengukuran tekanan darah (auskultasi)",
   "berkas": "stasiun/04-pengukuran-tekanan-darah.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "20",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply",
    "Domain": "Prosedur/pemeriksaan fisik, interpretasi, edukasi",
    "Jenis": "Lengan simulator tekanan darah (Korotkoff) + SP untuk komunikasi",
    "Level peserta": "Dokter muda klinik / dokter umum",
    "Status": "DRAF — butuh simulator lengan Korotkoff dengan nilai tetap"
   },
   "durasiMenit": 8,
   "skorMaks": 20,
   "instruksiKandidat": "Anda dokter di poliklinik. **Ibu Sari, 45 tahun**, datang dengan keluhan sakit kepala ringan. Anda akan mengukur tekanan darahnya.\n\n**Tugas:**\n1. Ukur tekanan darah dengan teknik auskultasi pada lengan simulator yang tersedia.\n2. Interpretasikan hasilnya.\n3. Berikan edukasi singkat kepada pasien.\n\nBila ada langkah yang tidak dapat diperagakan pada simulator, nyatakan secara lisan.",
   "pertanyaanLanjutan": "1. \"Pasien mengaku minum kopi 20 menit lalu. Apa yang Anda lakukan?\" *(Menunda dan mengulang setelah ≥ 30 menit, atau mencatat sebagai faktor pengganggu.)*\n2. \"Apa dampak ukuran manset yang terlalu kecil atau terlalu besar?\" *(Terlalu kecil → pembacaan terlalu tinggi; terlalu besar → terlalu rendah.)*\n3. \"Apa itu celah auskultasi dan mengapa estimasi palpatoir penting?\"\n4. \"Kapan Anda mempertimbangkan ABPM atau HBPM?\" *(Konfirmasi diagnosis, hipertensi jas putih/terselubung.)*",
   "catatan": "- Kesalahan umum: ukuran manset keliru; pasien tidak diistirahatkan; deflasi terlalu cepat; hanya satu pengukuran; tidak menanyakan kafein/rokok.\n- Penguji menerima klasifikasi menurut ACC/AHA, ESC, atau PERKI selama konsisten dengan guideline yang disebut kandidat. Tim ujian dapat mengubah butir C2 sesuai pedoman nasional yang berlaku.\n- Nilai simulator dapat diubah (mis. 128/82 untuk kategori \"elevated\"/prahipertensi, atau 178/108 untuk derajat berat dengan pertanyaan lanjutan tentang kerusakan organ target).",
   "rujukan": "- McEvoy JW, et al. 2024 ESC Guidelines for the management of elevated blood pressure and hypertension. *Eur Heart J*. 2024;45:3912–4018.\n- Jones DW, et al. 2025 AHA/ACC/AANP/AAPA/ABC/ACCP/ACPM/AGS/AMA/ASPC/NMA/PCNA/SGIM Guideline for the Prevention, Detection, Evaluation and Management of High Blood Pressure in Adults. *Circulation*. 2025;152:e114–e218.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "A": "Persiapan",
    "B": "Teknik",
    "C": "Interpretasi dan komunikasi"
   },
   "checklist": [
    {
     "id": "A1",
     "grup": "A",
     "teks": "Salam, perkenalan, menjelaskan prosedur dan meminta persetujuan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A2",
     "grup": "A",
     "teks": "Pasien duduk nyaman, punggung bersandar, kaki menapak (tidak disilang), lengan ditopang setinggi jantung",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A3",
     "grup": "A",
     "teks": "Menanyakan kafein, rokok, olahraga 30 menit terakhir, dan memastikan istirahat ≥ 5 menit tanpa bicara",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A4",
     "grup": "A",
     "teks": "Memastikan alat terkalibrasi dan lengan terbuka tanpa pakaian ketat",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B1",
     "grup": "B",
     "teks": "Memilih ukuran manset sesuai lingkar lengan (bladder melingkari ≥ 80% lingkar lengan)",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "B2",
     "grup": "B",
     "teks": "Memasang manset dengan tepi bawah 2–3 cm di atas lipat siku; bladder di atas a. brakialis",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B3",
     "grup": "B",
     "teks": "Palpasi a. brakialis/radialis dan estimasi tekanan sistolik secara palpatoir",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B4",
     "grup": "B",
     "teks": "Meletakkan kepala stetoskop di atas a. brakialis tanpa menyentuh manset/selang",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B5",
     "grup": "B",
     "teks": "Memompa 20–30 mmHg di atas sistolik palpatoir",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B6",
     "grup": "B",
     "teks": "Deflasi dengan kecepatan 2–3 mmHg/detik",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B7",
     "grup": "B",
     "teks": "Menentukan sistolik (Korotkoff I) dan diastolik (Korotkoff V) dengan benar (± 4 mmHg dari nilai simulator)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B8",
     "grup": "B",
     "teks": "Mencatat ke 2 mmHg terdekat (tidak dibulatkan ke 0/5)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B9",
     "grup": "B",
     "teks": "Mengulang ≥ 2 pengukuran dengan jeda 1–2 menit (deflasi penuh) dan merata-ratakan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B10",
     "grup": "B",
     "teks": "Menyebut bahwa pada kunjungan pertama TD diukur pada kedua lengan, dan lengan dengan nilai lebih tinggi dipakai untuk pengukuran selanjutnya",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C1",
     "grup": "C",
     "teks": "Mencatat hasil dengan benar (nilai rerata, lengan, posisi, ukuran manset, waktu)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C2",
     "grup": "C",
     "teks": "Mengklasifikasikan hasil dan menyebut guideline acuan (TD kantor ≥ 140/90 mmHg masuk kategori hipertensi menurut ACC/AHA, ESC, dan PERKI)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C3",
     "grup": "C",
     "teks": "Menyebut perlunya konfirmasi (pengukuran ulang dan, bila memungkinkan, HBPM/ABPM) sebelum menegakkan diagnosis",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C4",
     "grup": "C",
     "teks": "Menyampaikan hasil kepada pasien dengan bahasa awam dan menjawab kekhawatiran",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C5",
     "grup": "C",
     "teks": "Edukasi: gaya hidup (garam, aktivitas, berat badan, rokok), kapan kontrol, dan tanda bahaya (sakit kepala berat, nyeri dada, sesak, kelemahan satu sisi)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C6",
     "grup": "C",
     "teks": "Membereskan alat, mencuci tangan, menutup dengan sopan",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "05": {
   "id": "05",
   "judul": "BLS henti jantung dewasa + AED",
   "berkas": "stasiun/05-bls-henti-jantung.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "25",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply",
    "Domain": "Prosedur resusitasi, keselamatan, kerja tim",
    "Jenis": "Manikin RJP dengan umpan balik + AED trainer + penguji berperan sebagai orang di sekitar",
    "Level peserta": "Dokter muda klinik / dokter umum / PPDS tahun awal",
    "Status": "DRAF — sesuaikan dengan alur kode biru dan pelatihan BLS/ACLS institusi"
   },
   "durasiMenit": 8,
   "skorMaks": 25,
   "instruksiKandidat": "Anda sedang berada di ruang tunggu poliklinik jantung. Tiba-tiba seorang laki-laki dewasa terjatuh di depan Anda dan tidak bergerak. Belum ada orang yang menolongnya. Di dekat Anda tersedia manikin (dianggap sebagai pasien) dan AED.\n\n**Tugas:** lakukan penanganan henti jantung dewasa sampai tim ACLS tiba. Penguji akan memberi tahu bila tim tiba. Anda dapat meminta bantuan kepada orang di sekitar (diperankan penguji).",
   "pertanyaanLanjutan": "1. \"Apa yang Anda lakukan bila AED tidak segera tersedia?\" *(Mulai RJP dan lanjutkan sampai AED tiba.)*\n2. \"Sebutkan penyebab reversibel henti jantung yang Anda cari.\" *(H dan T.)*\n3. \"Kapan Anda menghentikan RJP?\" *(Tim lanjutan mengambil alih, pasien pulih sirkulasi spontan, penolong kelelahan/ tidak aman, atau keputusan menghentikan oleh tim.)*",
   "catatan": "- Kesalahan umum: tidak menugaskan orang secara spesifik; memeriksa nadi > 10 detik; kompresi terlalu dangkal atau lambat; berhenti terlalu lama untuk AED; memeriksa nadi setelah syok.\n- Butir kritis dipertahankan agar kandidat yang aman-tapi-tidak-efektif tidak lulus hanya dari skor total.\n- Bila fasilitas menyediakan simulator dengan umpan balik, jadikan data laju/kedalaman sebagai dasar objektif B4, B5, B6.\n- Parameter RJP di atas konsisten untuk dewasa; verifikasi terhadap sertifikasi BLS/ACLS institusi.",
   "rujukan": "- Del Rios M, et al. Part 1: Executive Summary: 2025 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. *Circulation*. 2025;152(16 suppl 2):S284–S312.\n- Bab *Adult Basic Life Support* pada pedoman yang sama — **periksa teks lengkapnya** sebelum menaikkan batas angka di checklist.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "A": "Keamanan dan penilaian awal",
    "B": "RJP berkualitas tinggi",
    "C": "Penggunaan AED",
    "D": "Kerja tim dan komunikasi"
   },
   "checklist": [
    {
     "id": "A1",
     "grup": "A",
     "teks": "Memastikan lokasi aman bagi penolong dan pasien",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A2",
     "grup": "A",
     "teks": "Memeriksa respons (menepuk bahu dan memanggil)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A3",
     "grup": "A",
     "teks": "Meminta bantuan / mengaktifkan sistem emergensi dan meminta AED",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "A4",
     "grup": "A",
     "teks": "Memeriksa napas dan nadi karotis bersamaan, ≤ 10 detik",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "A5",
     "grup": "A",
     "teks": "Menyatakan pasien mengalami henti jantung (tidak responsif, napas tidak normal, nadi tidak teraba)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B1",
     "grup": "B",
     "teks": "Memposisikan pasien telentang pada permukaan keras",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B2",
     "grup": "B",
     "teks": "Posisi tangan di setengah bawah sternum",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "B3",
     "grup": "B",
     "teks": "Lengan lurus dan bahu tepat di atas dada pasien",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B4",
     "grup": "B",
     "teks": "Laju kompresi 100–120 x/menit",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "B5",
     "grup": "B",
     "teks": "Kedalaman 5–6 cm",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "B6",
     "grup": "B",
     "teks": "Recoil dada penuh (tidak bersandar)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B7",
     "grup": "B",
     "teks": "Interupsi minimal (setiap jeda < 10 detik)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B8",
     "grup": "B",
     "teks": "Rasio kompresi:ventilasi 30:2",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B9",
     "grup": "B",
     "teks": "Membuka jalan napas dengan *head tilt–chin lift*",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B10",
     "grup": "B",
     "teks": "Ventilasi ≈ 1 detik per tiupan, dada terangkat",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C1",
     "grup": "C",
     "teks": "Menyalakan AED dan mengikuti instruksinya",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C2",
     "grup": "C",
     "teks": "Memasang pad pada lokasi yang benar (dada kering)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C3",
     "grup": "C",
     "teks": "Memastikan tidak ada yang menyentuh pasien saat analisis dan syok (\"Semua menjauh!\")",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "C4",
     "grup": "C",
     "teks": "Memberikan syok bila disarankan",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "C5",
     "grup": "C",
     "teks": "Melanjutkan kompresi segera setelah syok tanpa memeriksa nadi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C6",
     "grup": "C",
     "teks": "Menilai ulang setiap ± 2 menit (≈ 5 siklus)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D1",
     "grup": "D",
     "teks": "Menugaskan peran dengan jelas (menunjuk orang, instruksi spesifik) dan mengonfirmasi (*closed-loop*)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D2",
     "grup": "D",
     "teks": "Berkomunikasi dengan jelas dan tenang",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D3",
     "grup": "D",
     "teks": "Serah terima ke tim ACLS secara ringkas (waktu henti, durasi RJP, jumlah syok, irama)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D4",
     "grup": "D",
     "teks": "Meminta/melakukan pergantian penolong kompresi tiap ± 2 menit",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "06": {
   "id": "06",
   "judul": "Gagal jantung akut dekompensasi",
   "berkas": "stasiun/06-gagal-jantung-akut-dekompensasi.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "25",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Analyze",
    "Domain": "Penilaian awal, anamnesis terfokus, pemeriksaan, investigasi, tatalaksana awal, edukasi",
    "Jenis": "Pasien simulasi (SP) + penguji memberi data pemeriksaan/penunjang bila diminta",
    "Level peserta": "Dokter umum / dokter muda akhir / PPDS tahun awal",
    "Status": "DRAF — belum direview kardiolog; tugas padat, uji coba waktu dulu"
   },
   "durasiMenit": 8,
   "skorMaks": 25,
   "instruksiKandidat": "Anda dokter jaga IGD. **Ibu Hartini, 68 tahun**, dibawa keluarga karena **sesak napas yang memberat selama 3 hari**. Ia memiliki riwayat gagal jantung. Perawat telah memasang pulse oximeter.\n\nTanda vital: TD 138/84 mmHg · nadi 104 x/menit, reguler · napas 28 x/menit · SpO₂ 88% udara ruang · suhu 36,9 °C.\n\n**Tugas** (penilaian dan penatalaksanaan dilakukan bersamaan karena pasien tidak stabil):\n1. Lakukan penilaian awal dan anamnesis terfokus, termasuk mencari pencetus.\n2. Minta pemeriksaan fisik dan pemeriksaan penunjang yang diperlukan; penguji akan memberi hasilnya.\n3. Sebutkan dan lakukan tatalaksana awal.\n4. Jelaskan kepada pasien dan keluarganya.",
   "pertanyaanLanjutan": "1. \"Profil klinis pasien ini apa?\" *(Hangat–basah.)* \"Apa yang berubah bila akral dingin dan TD 80/50?\" *(Dingin–basah/syok kardiogenik: hindari vasodilator, cari penyebab, pertimbangkan inotrop/vasopresor, rujuk ICU.)*\n2. \"Sebutkan pencetus akut yang harus Anda singkirkan segera.\" *(SKA, krisis hipertensi, aritmia, penyebab mekanik akut, emboli paru.)*\n3. \"Apakah morfin rutin diberikan?\" *(Tidak direkomendasikan secara rutin.)*\n4. \"Obat apa yang Anda lanjutkan atau optimalkan sebelum pulang?\" *(Terapi medis optimal gagal jantung dengan fraksi ejeksi menurun sesuai guideline, dimulai/ditingkatkan bertahap bila tidak ada kontraindikasi.)*",
   "catatan": "- Kesalahan umum: memberi oksigen tanpa memeriksa SpO₂; lupa menanyakan kepatuhan obat dan NSAID; memberi nitrat tanpa memeriksa tekanan darah; tidak membuat rencana rawat; berbicara dengan istilah medis kepada keluarga.\n- Stasiun ini padat. Uji coba waktu; bila terlalu padat, pecah menjadi dua stasiun (S06a anamnesis + pemeriksaan; S06b interpretasi data + tatalaksana).\n- Variasi: pasien baru tanpa riwayat gagal jantung (pencetus: fibrilasi atrium cepat), atau GJ dengan fraksi ejeksi terjaga; ubah data untuk \"dingin–basah\".\n- Pada contoh simulasi kardiologi yang dipublikasikan, data penunjang (mis. EKG) sebaiknya diberikan setelah anamnesis agar urutan data mengikuti alur klinis nyata. Stasiun ini meniru urutan itu: kandidat harus memintanya.",
   "rujukan": "- McDonagh TA, et al. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. *Eur Heart J*. 2021;42:3599–3726.\n- Heidenreich PA, et al. 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure. *Circulation*. 2022;145:e895–e1032.\n- Pedoman PERKI untuk gagal jantung — verifikasi edisi yang berlaku.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "A": "Penilaian awal",
    "B": "Anamnesis terfokus",
    "C": "Pemeriksaan fisik yang diminta",
    "D": "Pemeriksaan penunjang",
    "E": "Tatalaksana",
    "F": "Komunikasi dan edukasi"
   },
   "checklist": [
    {
     "id": "A1",
     "grup": "A",
     "teks": "Salam, perkenalan, meminta persetujuan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A2",
     "grup": "A",
     "teks": "Mengenali distres napas (napas 28, SpO₂ 88%, kalimat pendek) dan memposisikan pasien duduk tegak",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A3",
     "grup": "A",
     "teks": "Meminta monitor, memasang akses IV, dan memberi oksigen karena SpO₂ < 90%",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A4",
     "grup": "A",
     "teks": "Menyatakan pasien tidak stabil sehingga menilai dan menangani secara bersamaan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B1",
     "grup": "B",
     "teks": "Ortopnea/PND dan toleransi aktivitas",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B2",
     "grup": "B",
     "teks": "Edema, kenaikan berat badan, produksi urin",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B3",
     "grup": "B",
     "teks": "Riwayat gagal jantung (etiologi/infark) dan obat saat ini",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B4",
     "grup": "B",
     "teks": "Pencetus: kepatuhan obat dan asupan garam/cairan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B5",
     "grup": "B",
     "teks": "Pencetus lain: NSAID, infeksi, nyeri dada, berdebar",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B6",
     "grup": "B",
     "teks": "Alergi dan komorbid (DM, penyakit ginjal, PPOK)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C1",
     "grup": "C",
     "teks": "JVP",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C2",
     "grup": "C",
     "teks": "Auskultasi paru",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C3",
     "grup": "C",
     "teks": "Auskultasi jantung (S3, bising)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C4",
     "grup": "C",
     "teks": "Edema tungkai dan perfusi perifer (akral, waktu isi kapiler)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D1",
     "grup": "D",
     "teks": "EKG 12 sadapan",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "D2",
     "grup": "D",
     "teks": "Laboratorium: troponin, NT-proBNP/BNP, kreatinin & elektrolit, Hb (≥ 3 jenis)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D3",
     "grup": "D",
     "teks": "Foto toraks",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D4",
     "grup": "D",
     "teks": "Ekokardiografi (segera atau pada rawat inap)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E1",
     "grup": "E",
     "teks": "Diuretik loop IV (furosemid) dengan dosis awal ≥ dosis oral harian",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "E2",
     "grup": "E",
     "teks": "Oksigen bila SpO₂ < 90%, dan NIV (CPAP/BiPAP) bila distres menetap",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E3",
     "grup": "E",
     "teks": "Vasodilator (nitrat) hanya bila tekanan darah sistolik adekuat dan tanpa hipotensi simptomatik",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E4",
     "grup": "E",
     "teks": "Pemantauan: urin/balans cairan, elektrolit, berat badan, tanda vital berkala",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E5",
     "grup": "E",
     "teks": "Menangani pencetus (kembalikan diuretik, hentikan NSAID), memutuskan rawat (HCU/ruang rawat), konsultasi kardiologi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "F1",
     "grup": "F",
     "teks": "Menjelaskan diagnosis dan rencana kepada pasien/keluarga dengan bahasa awam, menjawab pertanyaan rawat",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "F2",
     "grup": "F",
     "teks": "Edukasi: kepatuhan obat, batasi garam, timbang berat badan harian, hindari NSAID, tanda bahaya",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "07": {
   "id": "07",
   "judul": "Edukasi pasca-infark miokard dan pencegahan sekunder",
   "berkas": "stasiun/07-edukasi-pasca-infark.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "25",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Create",
    "Domain": "Komunikasi dan edukasi, farmakoterapi pencegahan sekunder, perubahan gaya hidup",
    "Jenis": "Pasien simulasi (SP) + resume medis",
    "Level peserta": "Dokter umum / dokter muda akhir / PPDS tahun awal",
    "Status": "DRAF — belum direview kardiolog; regimen obat dan batas waktu perlu dicek terhadap pedoman PERKI/institusi"
   },
   "durasiMenit": 8,
   "skorMaks": 25,
   "instruksiKandidat": "Anda dokter di bangsal jantung. **Bapak Arifin, 55 tahun**, sopir angkot, berada pada hari ke-3 setelah serangan jantung (STEMI anterior) yang ditangani dengan pemasangan ring (PCI primer). Ia direncanakan pulang besok. Resume medis ada di hadapan Anda.\n\n**Tugas:** berikan edukasi sebelum pulang kepada pasien. Cakup penyakitnya, obat yang dibawa pulang, perubahan gaya hidup, serta tanda bahaya dan rencana kontrol. Pasien boleh mengajukan pertanyaan. Anamnesis ulang dan pemeriksaan fisik **tidak perlu** dilakukan.\n\n**Resume medis**\n\n| Item | Isi |\n|------|-----|\n| Diagnosis | STEMI anterior; PCI primer dengan 1 *drug-eluting stent* di LAD proksimal; tanpa komplikasi |\n| Ekokardiografi | LVEF 45%, hipokinesis anterior ringan; tanpa gejala gagal jantung |\n| Tanda vital | TD 126/78 mmHg · nadi 68 x/menit |\n| Laboratorium | LDL 142 mg/dL · HbA1c 5,8% · kreatinin 1,0 mg/dL |\n| Faktor risiko | Merokok 20 batang/hari selama 30 tahun · hipertensi (berobat tidak teratur) · IMT 29 kg/m² |\n| Obat pulang | Aspirin 80 mg 1×1 · ticagrelor 90 mg 2×1 · atorvastatin 40 mg 1×1 malam · bisoprolol 2,5 mg 1×1 · ramipril 2,5 mg 1×1 · isosorbid dinitrat 5 mg sublingual bila nyeri dada |",
   "pertanyaanLanjutan": "1. \"Mengapa pasien tidak boleh berhenti sendiri dari ticagrelor dan aspirin?\" *(Risiko trombosis stent dan infark ulang, terutama pada tahun pertama.)*\n2. \"Apa target LDL pasien ini?\" *(Risiko sangat tinggi; target mengikuti guideline yang dipakai, mis. ESC: < 55 mg/dL dan penurunan ≥ 50%; bila belum tercapai pada statin dosis maksimal yang ditoleransi, tambahkan ezetimibe lalu pertimbangkan penghambat PCSK9.)*\n3. \"Apa efek samping khas ticagrelor?\" *(Sesak ringan dan perdarahan.)*\n4. \"Bila pasien tidak sanggup membeli ticagrelor, apa yang Anda lakukan?\" *(Jangan biarkan berhenti; diskusikan dengan DPJP alternatif seperti klopidogrel; cek ketersediaan dan penjaminan.)*\n5. \"Pilihan farmakologis untuk membantu berhenti merokok?\" *(Terapi pengganti nikotin, varenicline, bupropion, dikombinasikan dengan konseling perilaku.)*\n6. \"Apa yang berubah bila LVEF 35%?\" *(Tambah antagonis mineralokortikoid dan pertimbangkan SGLT2i; evaluasi indikasi ICD setelah terapi optimal dan waktu yang cukup.)*",
   "catatan": "- Kesalahan umum: ceramah panjang tanpa mengecek pemahaman; menghakimi perokok; memakai singkatan (STEMI, DAPT, PCI) tanpa penjelasan; melewatkan rehabilitasi jantung; tidak membahas rasa takut pasien; menjanjikan penjaminan obat.\n- Stasiun ini sengaja tidak berisi anamnesis atau pemeriksaan fisik agar 8 menit cukup untuk edukasi yang layak.\n- Variasi: pasien perempuan; pasca-NSTEMI; pasien dengan diabetes (tambahkan SGLT2i atau GLP-1 RA sesuai indikasi); pasien dengan LVEF ≤ 40% (tambah terapi gagal jantung); pasien yang menolak berhenti merokok (menguji wawancara motivasional).\n- Sesuaikan butir C dengan formularium dan penjaminan setempat. Bila rubrik komunikasi bersama dipakai ([rubrik](../docs/rubrik-komunikasi.md)), hapus butir F agar tidak dihitung ganda.",
   "rujukan": "- Rao SV, et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes. *Circulation*. 2025;151:e771–e862.\n- Byrne RA, et al. 2023 ESC Guidelines for the management of acute coronary syndromes. *Eur Heart J*. 2023;44:3720–3826.\n- Virani SS, et al. 2023 AHA/ACC/ACCP/ASPC/NLA/PCNA Guideline for the Management of Patients With Chronic Coronary Disease. *Circulation*. 2023;148:e9–e119.\n- Mach F, et al. 2019 ESC/EAS Guidelines for the management of dyslipidaemias: lipid modification to reduce cardiovascular risk. *Eur Heart J*. 2020;41:111–188. (Dasar pertanyaan lanjutan tentang target LDL; isi belum dicocokkan.)\n- Kurtz SM, Silverman JD. The Calgary-Cambridge Referenced Observation Guides. *Med Educ*. 1996;30:83–89.\n- Pedoman PERKI untuk SKA dan pencegahan sekunder — verifikasi edisi yang berlaku.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "A": "Memulai dan menggali",
    "B": "Penjelasan penyakit",
    "C": "Obat",
    "D": "Gaya hidup dan rehabilitasi",
    "E": "Tanda bahaya dan tindak lanjut",
    "F": "Keterampilan komunikasi"
   },
   "checklist": [
    {
     "id": "A1",
     "grup": "A",
     "teks": "Salam, perkenalan, konfirmasi identitas, menjelaskan tujuan pertemuan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A2",
     "grup": "A",
     "teks": "Menggali pemahaman pasien tentang penyakitnya sebelum menjelaskan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A3",
     "grup": "A",
     "teks": "Menggali kekhawatiran dan harapan pasien",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A4",
     "grup": "A",
     "teks": "Menyepakati agenda atau prioritas pembahasan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B1",
     "grup": "B",
     "teks": "Menjelaskan serangan jantung dengan bahasa awam (pembuluh jantung tersumbat, otot jantung kekurangan darah) dan fungsi ring",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B2",
     "grup": "B",
     "teks": "Menjelaskan bahwa penyebab dasar (penyempitan pembuluh, faktor risiko) masih ada sehingga pencegahan harus berlanjut seumur hidup; ring bukan \"kesembuhan\"",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B3",
     "grup": "B",
     "teks": "Menyampaikan prognosis dengan jujur dan realistis, termasuk bahwa kebanyakan pasien dapat kembali beraktivitas",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C1",
     "grup": "C",
     "teks": "Menjelaskan fungsi dua obat antiplatelet (aspirin dan ticagrelor), melindungi ring dari penyumbatan, dan **tidak boleh dihentikan sendiri** tanpa bicara dengan dokter",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "C2",
     "grup": "C",
     "teks": "Statin: menurunkan kolesterol dan menstabilkan plak, diminum rutin, kadar LDL akan dipantau terhadap target",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C3",
     "grup": "C",
     "teks": "Penyekat beta dan penghambat ACE: melindungi jantung dan menurunkan tekanan darah",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C4",
     "grup": "C",
     "teks": "Efek samping utama dan kapan melapor: perdarahan atau BAB hitam, sesak ringan (ticagrelor), batuk kering (ACEi), pusing atau lemas",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C5",
     "grup": "C",
     "teks": "Praktis: jadwal minum, tetap minum walau tanpa keluhan, bawa daftar obat saat kontrol, hindari obat antinyeri golongan NSAID tanpa konsultasi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C6",
     "grup": "C",
     "teks": "Nitrat sublingual: kapan dipakai dan cara pakai (duduk, di bawah lidah)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D1",
     "grup": "D",
     "teks": "Berhenti merokok: menyatakan sebagai langkah terpenting, tidak menghakimi, menawarkan bantuan (konseling, terapi pengganti nikotin atau obat, program berhenti merokok), dan tidak menyetujui \"merokok sedikit\"",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "D2",
     "grup": "D",
     "teks": "Diet: kurangi garam, gorengan, santan dan lemak jenuh; tambah sayur, buah, ikan; kendalikan berat badan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D3",
     "grup": "D",
     "teks": "Aktivitas fisik bertahap dan rujukan program rehabilitasi jantung",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D4",
     "grup": "D",
     "teks": "Pengendalian faktor risiko: tekanan darah, kolesterol, gula darah, berat badan, dengan pemantauan berkala",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D5",
     "grup": "D",
     "teks": "Suasana hati, tidur, dan stres: menanyakan atau menyebut bahwa rasa cemas atau sedih pasca-serangan itu wajar dan dapat dibantu",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D6",
     "grup": "D",
     "teks": "Kembali bekerja, mengemudi, dan aktivitas seksual: menjawab realistis dan bertahap, atau menjanjikan evaluasi pada kontrol, tanpa memberi angka hari yang tidak berdasar",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E1",
     "grup": "E",
     "teks": "Nyeri dada, sesak berat, atau pingsan: segera hubungi ambulans atau ke IGD, tidak menyetir sendiri, tidak menunggu lama di rumah",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "E2",
     "grup": "E",
     "teks": "Rencana kontrol: waktu, tempat, dan pemeriksaan yang akan dilakukan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E3",
     "grup": "E",
     "teks": "Melibatkan keluarga: mengajak keluarga memahami obat dan tanda bahaya",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "F1",
     "grup": "F",
     "teks": "Bahasa awam, informasi dalam potongan kecil, tidak berceramah satu arah",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "F2",
     "grup": "F",
     "teks": "Empati terucap terhadap rasa takut pasien dan menanggapi pertanyaan secara langsung",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "F3",
     "grup": "F",
     "teks": "Mengecek pemahaman (*teach-back*), merangkum, dan memberi kesempatan bertanya",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "08": {
   "id": "08",
   "judul": "Interpretasi EKG: fibrilasi atrium respons ventrikel cepat",
   "berkas": "stasiun/08-ekg-fibrilasi-atrium.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "20",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Analyze",
    "Domain": "Interpretasi data, penilaian stabilitas, stratifikasi risiko stroke, tatalaksana awal",
    "Jenis": "Data (EKG 12 sadapan + data klinis) + penguji",
    "Level peserta": "Dokter umum / PPDS tahun awal",
    "Status": "DRAF — **gambar EKG belum disertakan**; belum direview kardiolog. Klaim tatalaksana AF dicocokkan dengan teks lengkap guideline ACC/AHA 2023 pada 13 Oktober 2026 (lihat catatan bagian 5)"
   },
   "durasiMenit": 8,
   "skorMaks": 20,
   "instruksiKandidat": "Anda dokter jaga IGD. **Ibu Sumiati, 72 tahun**, datang dengan **berdebar dan mudah lelah sejak sekitar 10 jam yang lalu**. Ia memiliki hipertensi dan diabetes tipe 2. Tanda vital: TD 124/78 mmHg · nadi 130 x/menit, tidak teratur · napas 20 x/menit · SpO₂ 97% udara ruang · suhu 36,8 °C. EKG 12 sadapan dengan strip ritme di hadapan Anda.\n\n**Tugas:**\n1. Interpretasikan EKG secara sistematis (secara lisan).\n2. Sebutkan diagnosis dan langkah penilaian lanjutan yang Anda lakukan.\n3. Sebutkan tatalaksana awal, termasuk pencegahan stroke.",
   "pertanyaanLanjutan": "1. \"Bagaimana bila TD 80/50, nyeri dada, dan edema paru akut?\" *(Tidak stabil akibat takiaritmia: kardioversi listrik sinkron segera, tidak menunggu antikoagulasi.)*\n2. \"Kapan kardioversi dapat dilakukan pada pasien stabil?\" *(ACC/AHA 2023: AF ≥ 48 jam: antikoagulasi terapeutik tanpa putus 3 minggu atau pencitraan yang menyingkirkan trombus sebelum kardioversi elektif (Class 1, B-R). Pada setiap kardioversi, antikoagulasi terapeutik dibentuk sebelum kardioversi dan dilanjutkan ≥ 4 minggu sesudahnya (Class 1, B-NR). Pada AF < 48 jam dengan risiko tromboemboli tinggi (CHA₂DS₂-VASc ≥ 2), pencitraan prakardioversi dapat dipertimbangkan (2b); manfaatnya tidak pasti pada risiko rendah dengan durasi < 12 jam. Pasien ini berisiko tinggi.)*\n3. \"Apa yang Anda lakukan bila EKG menunjukkan QRS lebar ireguler dengan laju sangat cepat dan gelombang delta?\" *(AF pre-eksitasi: penghambat nodus AV (verapamil, diltiazem, amiodaron, digoksin, adenosin, penyekat beta) kontraindikasi (Class 3: Harm, B-NR); bila tidak stabil, kardioversi listrik (Class 1, B-NR); bila stabil, prokainamid atau ibutilid IV sebagai alternatif kardioversi elektif (Class 1, C-LD); ablasi jalur aksesori (Class 1, B-NR); rujuk elektrofisiologi.)*\n4. \"Mengapa kendali laju belum menghilangkan risiko stroke?\" *(Risiko stroke ditentukan oleh profil risiko, bukan oleh laju atau ritme; antikoagulasi tetap diperlukan.)*\n5. \"Pilihan antikoagulan bila DOAC tidak tersedia?\" *(Warfarin dengan target INR 2–3 dan pemantauan teratur, sesuai teks guideline ACC/AHA 2023.)*",
   "catatan": "- Kesalahan umum: menghitung laju dari satu interval R–R; lupa menilai stabilitas; memberi digoksin atau diltiazem tanpa memeriksa fungsi ventrikel; menghitung skor risiko stroke salah (lupa jenis kelamin atau usia); menunda antikoagulasi menunggu ekokardiografi; langsung kardioversi tanpa mempertimbangkan trombus.\n- Penyakit jantung rematik dan stenosis mitral masih relevan di Indonesia; butir J5 dan K4 sengaja memisahkan AF nonvalvular dari AF dengan stenosis mitral sedang–berat atau katup mekanik.\n- Variasi: AF dengan gagal jantung (data: LVEF 30%, kendali laju dengan penyekat beta atau digoksin atau amiodaron); AF dengan hipotensi (stabilitas); AF baru terdeteksi tanpa gejala; flutter atrium; takikardia kompleks lebar sebagai stasiun terpisah.\n- Sesuaikan K1 dan K4 dengan ketersediaan obat di rumah sakit dan formularium.",
   "rujukan": "- Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. *Circulation*. 2024;149:e1–e156. (Teks lengkap dicocokkan lewat PMC11095842.)\n- Van Gelder IC, et al. 2024 ESC Guidelines for the management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS). *Eur Heart J*. 2024;45:3314–3414.\n- Pedoman PERKI untuk fibrilasi atrium — verifikasi edisi yang berlaku.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "I": "Interpretasi EKG",
    "J": "Penilaian klinis",
    "K": "Tatalaksana",
    "L": "Presentasi dan tindak lanjut"
   },
   "checklist": [
    {
     "id": "I1",
     "grup": "I",
     "teks": "Laju ventrikel ± 130 x/menit (rentang 120–140 diterima)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I2",
     "grup": "I",
     "teks": "Menjelaskan cara menghitung laju pada irama ireguler (jumlah QRS pada strip 6 detik × 10, bukan satu interval R–R)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I3",
     "grup": "I",
     "teks": "Irama ireguler tidak teratur (*irregularly irregular*)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I4",
     "grup": "I",
     "teks": "Tidak ada gelombang P, digantikan aktivitas fibrilasi pada garis dasar",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I5",
     "grup": "I",
     "teks": "QRS sempit (< 120 ms)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I6",
     "grup": "I",
     "teks": "Sumbu normal",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I7",
     "grup": "I",
     "teks": "Segmen ST: tanpa elevasi ST; depresi ST lateral ringan konsisten dengan laju cepat, tetapi iskemia tidak disingkirkan sehingga troponin dan klinis perlu dinilai",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I8",
     "grup": "I",
     "teks": "Diagnosis: **fibrilasi atrium dengan respons ventrikel cepat**",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "J1",
     "grup": "J",
     "teks": "Menilai stabilitas hemodinamik (tekanan darah, nyeri dada iskemik, edema paru, penurunan kesadaran) dan menyatakan bahwa **bila tidak stabil** dilakukan kardioversi listrik sinkron segera",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "J2",
     "grup": "J",
     "teks": "Mencari pencetus atau penyebab reversibel (≥ 3): tirotoksikosis, infeksi atau sepsis, anemia, gangguan elektrolit, alkohol, nyeri atau stres; iskemia atau emboli paru dicari hanya bila ada gejala atau tanda",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "J3",
     "grup": "J",
     "teks": "Pemeriksaan penunjang: monitor jantung, laboratorium (hitung darah lengkap, elektrolit dan kreatinin, fungsi tiroid; troponin bila ada gejala atau tanda iskemia), ekokardiografi transtorasik (segera atau pada rawat inap)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "J4",
     "grup": "J",
     "teks": "Memasang monitor dan akses IV",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "J5",
     "grup": "J",
     "teks": "Menanyakan stenosis mitral sedang–berat atau katup mekanik (menentukan jenis antikoagulan)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "K1",
     "grup": "K",
     "teks": "Kendali laju pada pasien stabil: penyekat beta atau CCB non-dihidropiridin (diltiazem/verapamil) bila EF > 40%",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "K2",
     "grup": "K",
     "teks": "Menyebut bahwa CCB non-dihidropiridin IV tidak diberikan pada disfungsi sistolik LV sedang–berat, dengan atau tanpa gagal jantung dekompensasi (digoksin, atau amiodaron IV pada pasien kritis, sebagai alternatif)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "K3",
     "grup": "K",
     "teks": "Menghitung skor risiko stroke dengan benar: CHA₂DS₂-VASc = **4** (hipertensi 1, diabetes 1, usia 65–74 1, perempuan 1); CHA₂DS₂-VA = 3 diterima",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "K4",
     "grup": "K",
     "teks": "Antikoagulan oral jangka panjang karena skor tinggi; DOAC lebih dipilih daripada warfarin pada AF nonvalvular (warfarin bila stenosis mitral sedang–berat atau katup mekanik)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "K5",
     "grup": "K",
     "teks": "Tidak melakukan kardioversi elektif tanpa antikoagulasi memadai atau penyingkiran trombus atrium; strategi kontrol ritme diputuskan bersama kardiolog; rawat atau konsultasi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "L1",
     "grup": "L",
     "teks": "Presentasi sistematis, terstruktur, dan ringkas",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "L2",
     "grup": "L",
     "teks": "Menyebut penanganan faktor risiko dan komorbid (tekanan darah, gula darah, berat badan, alkohol, apnea tidur) dan edukasi kepatuhan antikoagulan",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "09": {
   "id": "09",
   "judul": "Hipertensi emergensi",
   "berkas": "stasiun/09-hipertensi-emergensi.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "20",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Analyze",
    "Domain": "Penilaian awal, anamnesis terfokus, pemeriksaan, investigasi, tatalaksana awal",
    "Jenis": "Pasien simulasi (SP) + penguji memberi data pemeriksaan/penunjang bila diminta",
    "Level peserta": "Dokter umum / dokter muda akhir / PPDS tahun awal",
    "Status": "DRAF — belum direview kardiolog; target penurunan tekanan darah dan pilihan obat perlu dicek terhadap guideline dan formularium setempat"
   },
   "durasiMenit": 8,
   "skorMaks": 20,
   "instruksiKandidat": "Anda dokter jaga IGD. **Bapak Slamet, 58 tahun**, pedagang, datang diantar keluarga dengan **sakit kepala hebat sejak kemarin**. Perawat telah mengukur tanda vital.\n\nTanda vital: TD 224/134 mmHg (lengan kanan) · nadi 94 x/menit · napas 20 x/menit · SpO₂ 97% udara ruang · suhu 36,8 °C.\n\n**Tugas:**\n1. Lakukan penilaian awal dan anamnesis terfokus.\n2. Minta pemeriksaan fisik dan penunjang yang diperlukan; penguji akan memberi hasilnya.\n3. Sebutkan diagnosis dan tatalaksana awal, termasuk target penurunan tekanan darah.\n4. Jelaskan kepada pasien dan keluarga.",
   "pertanyaanLanjutan": "1. \"Apa beda hipertensi emergensi dan urgensi?\" *(Emergensi: TD sangat tinggi dengan kerusakan organ target akut, perlu penurunan terkontrol dengan obat IV. Urgensi: TD sangat tinggi tanpa kerusakan organ target akut; obat oral dan tindak lanjut cepat, tanpa penurunan agresif.)*\n2. \"Apa yang berubah bila terdapat diseksi aorta?\" *(Nyeri hebat dan mendadak, perbedaan TD antarlengan; target TD dan laju jantung jauh lebih rendah dan lebih cepat daripada krisis hipertensi lain (mis. TD sistolik < 120 mmHg dalam jam pertama menurut pedoman diseksi), penyekat beta lebih dulu; konsultasi bedah/vaskular.)*\n3. \"Bagaimana bila CT kepala menunjukkan infark iskemik akut?\" *(Tidak menurunkan TD secara agresif; target spesifik stroke, bergantung pada kandidat trombolisis.)*\n4. \"Penyebab hipertensi sekunder apa yang perlu dipikirkan pada pasien ini kelak?\" *(Penyakit parenkim ginjal, stenosis arteri renalis, hiperaldosteronisme primer, apnea tidur, feokromositoma, obat/zat.)*\n5. \"Mengapa penurunan terlalu cepat berbahaya?\" *(Autoregulasi organ bergeser ke kanan pada hipertensi kronik; penurunan terlalu cepat dapat menyebabkan iskemia otak, jantung, atau ginjal.)*",
   "catatan": "- Kesalahan umum: menyebut \"hipertensi urgensi\" dan memberi obat oral; memberi nifedipin sublingual; menurunkan TD ke normal dalam beberapa jam; tidak melakukan CT kepala; tidak memeriksa funduskopi; lupa menanyakan putus obat dan NSAID; tidak menjawab pertanyaan keluarga.\n- Variasi: edema paru akut hipertensif (nitrat IV dan diuretik; berpotongan dengan S06); diseksi aorta (nyeri robek, selisih TD antarlengan); preeklamsia berat pada perempuan hamil; hipertensi urgensi tanpa kerusakan organ (butir E1 diubah menjadi pilihan obat oral dan tindak lanjut rawat jalan).\n- Sesuaikan E2 dengan obat IV yang tersedia di rumah sakit (nikardipin, labetalol, nitrogliserin) dan kemampuan ICU/HCU.",
   "rujukan": "- Jones DW, et al. 2025 AHA/ACC/AANP/AAPA/ABC/ACCP/ACPM/AGS/AMA/ASPC/NMA/PCNA/SGIM Guideline for the Prevention, Detection, Evaluation and Management of High Blood Pressure in Adults. *Circulation*. 2025;152:e114–e218.\n- McEvoy JW, et al. 2024 ESC Guidelines for the management of elevated blood pressure and hypertension. *Eur Heart J*. 2024;45:3912–4018.\n- van den Born BH, et al. ESC Council on hypertension position document on the management of hypertensive emergencies. *Eur Heart J Cardiovasc Pharmacother*. 2019;5:37–46. (Hanya abstrak yang terbaca.)\n- Bress AP, et al. The Management of Elevated Blood Pressure in the Acute Care Setting: A Scientific Statement From the American Heart Association. *Hypertension*. 2024;81:e94–e106. (Hanya abstrak yang terbaca.)\n- Pedoman PERKI/PERHI untuk hipertensi — verifikasi edisi yang berlaku.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "A": "Penilaian awal",
    "B": "Anamnesis terfokus",
    "C": "Pemeriksaan fisik",
    "D": "Pemeriksaan penunjang",
    "E": "Tatalaksana",
    "F": "Komunikasi dan edukasi"
   },
   "checklist": [
    {
     "id": "A1",
     "grup": "A",
     "teks": "Salam, perkenalan, meminta persetujuan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A2",
     "grup": "A",
     "teks": "Menilai jalan napas, napas, sirkulasi, dan kesadaran; memasang monitor dan akses IV",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "A3",
     "grup": "A",
     "teks": "Mengulang TD dengan benar pada kedua lengan dan memeriksa nadi perifer (kecurigaan diseksi, validasi pengukuran)",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "B1",
     "grup": "B",
     "teks": "Gejala neurologis dan penglihatan: sakit kepala, pandangan kabur, mual muntah, kesadaran, kejang, defisit fokal",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B2",
     "grup": "B",
     "teks": "Gejala kardiopulmonal dan diseksi: nyeri dada, sesak, nyeri punggung seperti disobek",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B3",
     "grup": "B",
     "teks": "Riwayat hipertensi, obat, dan kepatuhan (putus obat)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B4",
     "grup": "B",
     "teks": "Pencetus (NSAID, jamu, stimulan, dekongestan, asupan garam) dan komorbid (diabetes, ginjal, stroke, jantung), alergi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C1",
     "grup": "C",
     "teks": "Pemeriksaan neurologis (GCS, defisit fokal, tanda meningeal)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C2",
     "grup": "C",
     "teks": "Funduskopi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C3",
     "grup": "C",
     "teks": "Jantung dan paru, edema",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D1",
     "grup": "D",
     "teks": "EKG 12 sadapan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D2",
     "grup": "D",
     "teks": "Laboratorium dan urinalisis (≥ 3 dari: kreatinin/ureum, elektrolit, glukosa, urinalisis, troponin, Hb)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D3",
     "grup": "D",
     "teks": "Pencitraan: CT kepala non-kontras untuk menyingkirkan stroke atau perdarahan; foto toraks",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E1",
     "grup": "E",
     "teks": "Menegakkan diagnosis **hipertensi emergensi** (TD sangat tinggi disertai kerusakan organ target akut: ensefalopati, retinopati, cedera ginjal) dan merawat di ICU/HCU dengan pemantauan kontinu",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "E2",
     "grup": "E",
     "teks": "Obat antihipertensi **IV dengan titrasi** (mis. nikardipin, labetalol, nitrogliserin sesuai organ target); tidak memberi obat oral atau sublingual kerja cepat yang menurunkan TD tak terkendali",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "E3",
     "grup": "E",
     "teks": "Target terukur dan bertahap: penurunan tidak lebih dari ± 25% (TD sistolik atau TD arteri rerata, sesuai pedoman yang dirujuk) dalam jam pertama, lalu menuju sekitar 160/100–110 mmHg dalam 2–6 jam, kemudian normalisasi bertahap dalam 24–48 jam; hindari penurunan terlalu cepat",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "E4",
     "grup": "E",
     "teks": "Pemantauan: TD sering saat titrasi, status neurologis, produksi urin, kreatinin dan elektrolit",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E5",
     "grup": "E",
     "teks": "Mengenali pengecualian yang target dan obatnya berbeda: diseksi aorta, stroke akut, preeklamsia/eklamsia",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "F1",
     "grup": "F",
     "teks": "Menjelaskan diagnosis dan rencana kepada pasien dan keluarga dengan bahasa awam, menjawab pertanyaan \"obat diminum biar cepat turun\"",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "F2",
     "grup": "F",
     "teks": "Edukasi dan tindak lanjut: kepatuhan obat, hindari NSAID dan garam, evaluasi penyebab sekunder dan fungsi ginjal, kontrol teratur",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "10": {
   "id": "10",
   "judul": "Sinkop: anamnesis, pemeriksaan ortostatik, dan stratifikasi risiko",
   "berkas": "stasiun/10-sinkop.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "20",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Analyze",
    "Domain": "Anamnesis terfokus, pemeriksaan ortostatik, interpretasi EKG, stratifikasi risiko, keputusan rawat",
    "Jenis": "Pasien simulasi (SP) + penguji memberi data pemeriksaan/penunjang bila diminta",
    "Level peserta": "Dokter umum / PPDS tahun awal",
    "Status": "DRAF — belum direview kardiolog; kriteria risiko tinggi dan indikasi rawat perlu dicek terhadap teks lengkap guideline"
   },
   "durasiMenit": 8,
   "skorMaks": 20,
   "instruksiKandidat": "Anda dokter jaga IGD. **Bapak Hendra, 64 tahun**, pensiunan, datang diantar anaknya setelah **pingsan sekitar 2 jam yang lalu**. Saat ini ia sadar penuh dan merasa baik. Perawat telah mengukur tanda vital.\n\nTanda vital: TD 128/76 mmHg (berbaring) · nadi 62 x/menit · napas 18 x/menit · SpO₂ 97% udara ruang · suhu 36,7 °C.\n\n**Tugas:**\n1. Lakukan anamnesis terfokus pada kejadian pingsan.\n2. Minta pemeriksaan fisik dan penunjang yang diperlukan; penguji akan memberi hasilnya.\n3. Sampaikan penilaian risiko dan keputusan Anda (pulang atau rawat), lalu jelaskan kepada pasien.",
   "pertanyaanLanjutan": "1. \"Sebutkan ciri sinkop yang menunjukkan sebab jantung atau risiko tinggi.\" *(Penyakit jantung struktural atau LVEF rendah, sinkop saat aktivitas atau berbaring, palpitasi sebelum pingsan, tanpa prodromal, EKG abnormal, riwayat keluarga kematian mendadak, sinkop berulang atau cedera.)*\n2. \"Bagaimana bila pingsan terjadi saat berdiri lama di tempat ramai, didahului pusing, keringat dingin, dan mual, dengan EKG normal?\" *(Sinkop refleks/vasovagal, risiko rendah: edukasi, hindari pemicu, hidrasi dan manuver kontra-tekanan; umumnya tidak perlu rawat.)*\n3. \"Kapan Anda mendiagnosis hipotensi ortostatik?\" *(Penurunan TD sistolik ≥ 20 atau diastolik ≥ 10 mmHg dalam 3 menit berdiri; atau sistolik < 90 mmHg.)*\n4. \"Apa yang dipertimbangkan bila LVEF kini 30% setelah terapi optimal?\" *(Indikasi ICD pencegahan primer sesuai kriteria; terapi gagal jantung optimal; ablasi atau antiaritmia bila VT; keputusan oleh kardiolog.)*\n5. \"Mengapa tamsulosin bukan penjelasan yang cukup di sini?\" *(Hasil ortostatik normal, sinkop saat aktivitas dengan palpitasi, dan substrat jantung yang jelas.)*",
   "catatan": "- Stasiun ini sengaja menyisipkan pengecoh (obat prostat, \"kurang minum\") agar kandidat yang berhenti pada hipotensi ortostatik tidak lulus butir E1–E2. Kasus ortostatik atau refleks sebenarnya dapat dibuat sebagai variasi.\n- Kesalahan umum: memulangkan pasien setelah EKG \"tidak ada elevasi ST\"; menyalahkan obat tanpa mengukur TD berdiri; melewatkan riwayat keluarga kematian mendadak; tidak menanyakan palpitasi dan aktivitas saat kejadian; tidak memberi nasihat mengemudi; tidak memasang monitor.\n- Variasi: sinkop refleks (prodromal khas, risiko rendah, rencana pulang dan edukasi); hipotensi ortostatik akibat obat atau dehidrasi; sinkop saat aktivitas dengan bising stenosis aorta (menyambung ke stasiun 03); blok AV derajat tinggi; EKG pola Brugada atau QT panjang.\n- Sesuaikan E2 dengan ketersediaan telemetri, ekokardiografi, dan kardiolog di rumah sakit setempat.",
   "rujukan": "- Shen WK, et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients With Syncope. *Circulation*. 2017;136:e60–e122.\n- Brignole M, et al. 2018 ESC Guidelines for the diagnosis and management of syncope. *Eur Heart J*. 2018;39:1883–1948.\n- Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias and the Prevention of Sudden Cardiac Death. *Circulation*. 2018;138:e272–e391. (Dasar pertanyaan lanjutan tentang ICD; isi belum dicocokkan.)\n- Zeppenfeld K, et al. 2022 ESC Guidelines for the management of patients with ventricular arrhythmias and the prevention of sudden cardiac death. *Eur Heart J*. 2022;43:3997–4126. (Idem.)\n- Pedoman PERKI untuk sinkop dan aritmia — verifikasi edisi yang berlaku.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "A": "Penilaian awal",
    "B": "Anamnesis terfokus",
    "C": "Pemeriksaan fisik",
    "D": "Pemeriksaan penunjang",
    "E": "Penilaian risiko dan keputusan",
    "F": "Komunikasi"
   },
   "checklist": [
    {
     "id": "A1",
     "grup": "A",
     "teks": "Salam, perkenalan, meminta persetujuan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A2",
     "grup": "A",
     "teks": "Memasang monitor jantung dan akses IV, memeriksa glukosa; menyatakan pasien perlu pemantauan walau sudah sadar",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "B1",
     "grup": "B",
     "teks": "Aktivitas dan posisi saat kejadian (berjalan cepat atau saat aktivitas; bukan berdiri lama)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B2",
     "grup": "B",
     "teks": "Prodromal dan pemicu: berdebar, nyeri dada, sesak, pusing, berkeringat, mual; pemicu situasional",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B3",
     "grup": "B",
     "teks": "Keterangan saksi: durasi, warna kulit, kejang, inkontinensia, kecepatan pulih",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B4",
     "grup": "B",
     "teks": "Penyakit jantung struktural atau aritmia (infark lama, gagal jantung) dan **riwayat keluarga kematian mendadak**",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "B5",
     "grup": "B",
     "teks": "Obat: antihipertensi, alfa-bloker, diuretik, antiaritmia, obat yang memperpanjang QT",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B6",
     "grup": "B",
     "teks": "Pembeda: kejang atau epilepsi, diabetes dan hipoglikemia, stroke atau TIA, perdarahan, trauma kepala",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C1",
     "grup": "C",
     "teks": "TD dan nadi berbaring lalu berdiri dengan teknik benar (istirahat berbaring terlebih dahulu; ukur pada menit 1 dan menit 3)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C2",
     "grup": "C",
     "teks": "Menyimpulkan hasil ortostatik tidak memenuhi kriteria hipotensi ortostatik (penurunan sistolik ≥ 20 atau diastolik ≥ 10 mmHg) sehingga tidak cukup menjelaskan sinkop",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C3",
     "grup": "C",
     "teks": "Pemeriksaan jantung, paru, dan tanda gagal jantung, serta neurologis singkat",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D1",
     "grup": "D",
     "teks": "EKG 12 sadapan segera",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D2",
     "grup": "D",
     "teks": "Interpretasi EKG: Q patologis anterior (infark lama), ekstrasistol ventrikel sering; menyatakan yang dicari dan tidak ada: blok AV, QT panjang, pola Brugada, pre-eksitasi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D3",
     "grup": "D",
     "teks": "Laboratorium: Hb, glukosa, elektrolit (termasuk Mg), kreatinin, troponin (≥ 3 jenis)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D4",
     "grup": "D",
     "teks": "Ekokardiografi dan pemantauan telemetri berkelanjutan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E1",
     "grup": "E",
     "teks": "Menyatakan sinkop **berisiko tinggi** dengan sebab jantung (aritmia) yang paling mungkin, berdasarkan penyakit jantung struktural dengan LVEF rendah, sinkop saat aktivitas dengan palpitasi, EKG abnormal, dan riwayat keluarga",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "E2",
     "grup": "E",
     "teks": "**Merawat** pasien dengan telemetri dan tidak memulangkannya; konsultasi kardiologi atau elektrofisiologi",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "E3",
     "grup": "E",
     "teks": "Rencana lanjutan: ekokardiografi, evaluasi iskemia, optimalisasi terapi gagal jantung, penilaian indikasi ICD atau terapi aritmia",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E4",
     "grup": "E",
     "teks": "Edukasi keselamatan: tidak mengemudi, hindari aktivitas berisiko (ketinggian, mesin), ditemani",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "F1",
     "grup": "F",
     "teks": "Menjelaskan dengan bahasa awam mengapa pasien perlu dirawat, menanggapi keinginan pulang dan dugaan \"obat prostat\" tanpa meremehkan",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "11": {
   "id": "11",
   "judul": "Pemeriksaan fisik kardiovaskular sistematis",
   "berkas": "stasiun/11-pemeriksaan-fisik-kardiovaskular.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "20",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Analyze",
    "Domain": "Pemeriksaan fisik (teknik dan urutan), sintesis temuan, langkah lanjut",
    "Jenis": "Sukarelawan sehat sebagai pasien simulasi + penguji membacakan temuan (atau audio/simulator bunyi jantung bila tersedia)",
    "Level peserta": "Dokter muda klinik / dokter umum",
    "Status": "DRAF — belum direview kardiolog; **tugas padat, uji coba waktu dulu**; audio/simulator belum ditentukan. Klaim antikoagulan pada AF dengan stenosis mitral dicocokkan dengan teks lengkap ACC/AHA 2023 (13 Oktober 2026); temuan auskultasi mengikuti buku ajar"
   },
   "durasiMenit": 8,
   "skorMaks": 20,
   "instruksiKandidat": "Anda dokter di poliklinik jantung. **Ibu Rahayu, 38 tahun**, datang dengan **sesak saat aktivitas dan berdebar sejak 3 bulan**. Sewaktu SD ia pernah menderita demam rematik. Pasien berada di hadapan Anda (diperankan oleh sukarelawan sehat). Anamnesis **tidak perlu** diulang.\n\n**Tugas:**\n1. Lakukan pemeriksaan fisik kardiovaskular secara sistematis dan **ucapkan apa yang Anda lakukan dan cari**. Penguji akan menyebutkan temuan setelah Anda melakukan tiap manuver.\n2. Di akhir, rangkum temuan, sebutkan kesimpulan, dan langkah lanjut yang Anda rencanakan.",
   "pertanyaanLanjutan": "1. \"Mengapa bising diastolik ini hanya terdengar pada posisi tertentu?\" *(Berfrekuensi rendah dan terlokalisir di apeks; miring kiri mendekatkan apeks ke dinding dada, bell menangkap frekuensi rendah, akhir ekspirasi meningkatkan aliran dan kedekatan jantung.)*\n2. \"Mengapa tidak ada aksentuasi presistolik dan gelombang a pada JVP?\" *(Fibrilasi atrium: tidak ada kontraksi atrium efektif.)*\n3. \"Sebutkan komplikasi stenosis mitral.\" *(Fibrilasi atrium, tromboemboli/stroke, hipertensi pulmonal dan gagal jantung kanan, edema paru, endokarditis.)*\n4. \"Mengapa antikoagulan yang dipilih adalah antagonis vitamin K dan bukan DOAC?\" *(ACC/AHA 2023: pada stenosis mitral reumatik atau sedang–berat dengan AF, warfarin dianjurkan daripada DOAC, tanpa memandang skor CHA₂DS₂-VASc (Class 1, B-R); pasien dengan stenosis mitral sedang–berat dan katup mekanik dikeluarkan dari uji DOAC. Target INR 2–3; pantau INR.)*\n5. \"Apa yang berubah pada pemeriksaan bila regurgitasi mitral?\" *(Apeks bergeser ke lateral dan inferior, heaving; bising pansistolik di apeks menjalar ke aksila; S3 mungkin ada.)*",
   "catatan": "- Kesalahan umum: auskultasi telentang dengan diafragma saja sehingga melewatkan bising diastolik; menghitung nadi hanya 10 detik pada irama ireguler; meraba kedua karotis bersamaan; tidak mengukur JVP dari sudut sternum; melewatkan palpasi apeks; tidak menyimpulkan; tidak menutup pakaian pasien.\n- Stasiun ini sengaja menyambung ke [stasiun 08](08-ekg-fibrilasi-atrium.md): pasien dengan AF dan stenosis mitral sedang–berat memerlukan antagonis vitamin K. Bila keduanya dipakai dalam satu sirkuit, ubah salah satu kasusnya.\n- Variasi: regurgitasi aorta (nadi *collapsing*, bising diastolik dekresendo di tepi kiri sternum); regurgitasi mitral; stenosis aorta (lihat [stasiun 03](03-auskultasi-jantung.md)); gagal jantung kiri-kanan (S3, JVP naik, edema); pemeriksaan normal.\n- Tugas padat: 20 butir dengan banyak manuver dalam 8 menit. Uji coba waktu; bila terlalu padat, hilangkan butir F1 dan E4 atau pecah menjadi dua stasiun (leher dan nadi; prekordium).\n- Gunakan sukarelawan sehat; jangan memakai pasien nyata. Sesuaikan butir E dengan ketersediaan simulator atau audio berlisensi.",
   "rujukan": "- Otto CM, et al. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease. *Circulation*. 2021;143:e72–e227.\n- Vahanian A, et al. 2021 ESC/EACTS Guidelines for the management of valvular heart disease. *Eur Heart J*. 2022;43:561–632.\n- Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. *Circulation*. 2024;149:e1–e156 (antikoagulan pada AF dengan stenosis mitral; teks lengkap dicocokkan lewat PMC11095842).\n- Kumar RK, et al. Contemporary Diagnosis and Management of Rheumatic Heart Disease: Implications for Closing the Gap: A Scientific Statement From the American Heart Association. *Circulation*. 2020;142:e337–e357. (Hanya abstrak dibaca.)\n- Teknik pemeriksaan fisik: buku ajar pemeriksaan fisik institusi (tidak dikutip spesifik).\n- Pedoman PERKI untuk penyakit jantung rematik dan katup — verifikasi edisi yang berlaku.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "A": "Persiapan dan umum",
    "B": "Tangan dan nadi",
    "C": "Wajah dan leher",
    "D": "Prekordium: inspeksi dan palpasi",
    "E": "Auskultasi",
    "F": "Pemeriksaan penyerta",
    "G": "Kesimpulan"
   },
   "checklist": [
    {
     "id": "A1",
     "grup": "A",
     "teks": "Mencuci tangan, perkenalan, konfirmasi identitas, menjelaskan prosedur, meminta persetujuan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A2",
     "grup": "A",
     "teks": "Memposisikan pasien 45° dengan sandaran, membuka dada dengan menjaga privasi dan kenyamanan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A3",
     "grup": "A",
     "teks": "Inspeksi umum dari ujung tempat tidur: sesak, sianosis, malar flush, dan tanda khas lain",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B1",
     "grup": "B",
     "teks": "Tangan: clubbing, splinter hemorrhage, suhu, waktu isi kapiler (≥ 3 hal)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B2",
     "grup": "B",
     "teks": "Nadi radial: laju dan irama, dihitung cukup lama (≥ 30 detik bila ireguler)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B3",
     "grup": "B",
     "teks": "Karakter nadi (volume) dan membandingkan kedua sisi; menyebut nadi ireguler dan kecurigaan fibrilasi atrium",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C1",
     "grup": "C",
     "teks": "Wajah, mata, mulut: malar flush, konjungtiva, sklera, sianosis sentral",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C2",
     "grup": "C",
     "teks": "JVP: posisi 45°, kepala menoleh sedikit, mengidentifikasi vena jugularis interna, mengukur tinggi vertikal dari sudut sternum",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C3",
     "grup": "C",
     "teks": "Nadi karotis satu sisi per satu waktu (tidak menekan kedua sisi bersamaan) dan karakternya",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D1",
     "grup": "D",
     "teks": "Inspeksi: bekas luka (sternotomi, torakotomi), deformitas, denyut yang terlihat",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D2",
     "grup": "D",
     "teks": "Palpasi apeks: lokasi (ruang iga dan garis), bergeser atau tidak, karakter (*tapping* atau *heaving*)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D3",
     "grup": "D",
     "teks": "Palpasi sisi kiri sternum untuk heave dan area katup untuk thrill/P2 teraba dengan telapak tangan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E1",
     "grup": "E",
     "teks": "Memakai diafragma dan bell dengan benar; memeriksa area apeks, trikuspid, pulmonal, dan aorta sambil meraba nadi karotis untuk menentukan S1 dan S2",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E2",
     "grup": "E",
     "teks": "**Pasien miring ke kiri, bell di apeks, menahan napas di akhir ekspirasi** untuk mencari bising diastolik mitral",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "E3",
     "grup": "E",
     "teks": "Pasien duduk condong ke depan, akhir ekspirasi, diafragma di tepi kiri sternum dan area aorta (regurgitasi aorta)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E4",
     "grup": "E",
     "teks": "Auskultasi karotis dan aksila (penjalaran)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E5",
     "grup": "E",
     "teks": "Mendeskripsikan bunyi dan bising dengan benar: S1 keras, P2 keras, *opening snap*, bising diastolik berdengung di apeks, tanpa bising sistolik",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "F1",
     "grup": "F",
     "teks": "Auskultasi basis paru, palpasi hepar, dan edema tungkai atau sakrum (≥ 2 dari 3)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "G1",
     "grup": "G",
     "teks": "Merangkum temuan dan menyimpulkan **stenosis mitral dengan fibrilasi atrium**, kemungkinan etiologi rematik",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "G2",
     "grup": "G",
     "teks": "Menyebut langkah lanjut: EKG, ekokardiografi, kendali laju, antikoagulasi dengan antagonis vitamin K, dan profilaksis sekunder demam rematik; merapikan pakaian dan berterima kasih",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "12": {
   "id": "12",
   "judul": "ACLS: henti jantung irama tidak dapat disyok (asistol/PEA)",
   "berkas": "stasiun/12-acls-irama-tidak-dapat-disyok.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "25",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Analyze",
    "Domain": "Resusitasi lanjut, kepemimpinan tim, penyebab reversibel, tatalaksana pasca-ROSC",
    "Jenis": "Manikin RJP dengan monitor/defibrilator simulasi + penguji yang berperan sebagai anggota tim",
    "Level peserta": "Dokter umum / PPDS tahun awal; bersertifikat BLS",
    "Status": "DRAF — belum direview kardiolog; algoritme dan terapi hiperkalemia perlu dicek terhadap Part 9–11 pedoman AHA 2025 (teks tidak dapat diambil dari sesi) dan pedoman institusi"
   },
   "durasiMenit": 8,
   "skorMaks": 25,
   "instruksiKandidat": "Anda dokter jaga di bangsal penyakit dalam. **Bapak Surya, 62 tahun**, pasien gagal ginjal kronik dengan hemodialisis, ditemukan perawat **tidak responsif**. Perawat dan satu penolong lain (dua anggota tim, diperankan penguji dan asisten) sudah mulai kompresi dada. Troli darurat, defibrilator, dan oksigen berada di sisi tempat tidur.\n\n**Tugas:** Anda tiba dan menjadi **pemimpin tim**. Pimpin resusitasi dari saat ini hingga serah terima. Ucapkan keputusan dan instruksi Anda dengan lantang. Penguji akan menjawab sebagai anggota tim dan memberi hasil sesuai instruksi Anda.",
   "pertanyaanLanjutan": "1. \"Mengapa irama ini tidak disyok?\" *(Asistol dan PEA bukan irama yang responsif terhadap defibrilasi; manfaat datang dari RJP berkualitas, epinefrin, dan menangani penyebab.)*\n2. \"Bagaimana bila irama menjadi VF/VT tanpa nadi?\" *(Beralih ke jalur dapat disyok: syok segera, RJP 2 menit, epinefrin dan antiaritmia sesuai algoritme.)*\n3. \"Mengapa kalsium diberikan pada hiperkalemia?\" *(Menstabilkan membran miokard; tidak menurunkan kadar kalium. Insulin dengan dekstrosa dan terapi lain memindahkan atau mengeluarkan kalium.)*\n4. \"Kapan Anda mempertimbangkan menghentikan resusitasi?\" *(Tidak ada ROSC setelah upaya memadai, mempertimbangkan penyebab, kondisi dasar, dan kebijakan institusi; keputusan oleh pemimpin tim dengan masukan tim.)*\n5. \"Sebutkan pemantauan pasca-ROSC yang penting.\" *(Oksigenasi dan ventilasi, tekanan darah, glukosa, suhu, elektrolit, EKG, fungsi neurologis.)*",
   "catatan": "- Kesalahan umum: meminta defibrilasi pada asistol; tidak menunjuk peran; menghentikan kompresi terlalu lama untuk cek irama atau jalan napas; lupa epinefrin; tidak menyebut penyebab reversibel; tidak mencari kalium pada pasien dialisis; tidak memberi kalsium; menyerahkan pasien tanpa informasi waktu dan obat.\n- Stasiun ini memerlukan penguji yang mengendalikan irama dan waktu dengan konsisten; latih penguji dengan alur waktu di bagian 2. Dua stasiun resusitasi dalam satu sirkuit (S05 dan S12) dianjurkan dihindari; pilih salah satu.\n- Variasi: PEA akibat tension pneumotoraks atau tamponade; asistol akibat hipotermia; kasus dengan transisi ke VF (jalur dapat disyok); henti jantung pasca-operasi jantung.\n- Sesuaikan butir B dan C dengan algoritme institusi (pedoman AHA/ERC atau protokol rumah sakit) dan obat yang tersedia di troli darurat. Kebijakan menghentikan resusitasi harus sesuai aturan institusi.",
   "rujukan": "- Wigginton JG, et al. Part 9: Adult Advanced Life Support: 2025 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. *Circulation*. 2025;152(16 suppl 2):S538–S577. (Dasar algoritme asistol/PEA; teks tidak tersedia di PMC dan belum dicocokkan.)\n- Cao D, et al. Part 10: Adult and Pediatric Special Circumstances of Resuscitation: 2025 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. *Circulation*. 2025;152(16 suppl 2):S578–S672. (Memuat bagian hiperkalemia; belum dicocokkan.)\n- Hirsch KG, et al. Part 11: Post-Cardiac Arrest Care: 2025 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. *Circulation*. 2025;152(16 suppl 2):S673–S718. (Dasar butir pasca-ROSC; belum dicocokkan.)\n- Del Rios M, et al. Part 1: Executive Summary: 2025 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. *Circulation*. 2025;152(16 suppl 2):S284–S312.\n- Pedoman resusitasi institusi/PERKI — verifikasi edisi yang berlaku.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "A": "Penilaian awal",
    "B": "Irama dan algoritme",
    "C": "Penyebab reversibel",
    "D": "Kepemimpinan dan kerja tim",
    "E": "Pasca-ROSC dan serah terima"
   },
   "checklist": [
    {
     "id": "A1",
     "grup": "A",
     "teks": "Memastikan keamanan dan menilai respons, napas, dan nadi (≤ 10 detik); menyatakan henti jantung",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "A2",
     "grup": "A",
     "teks": "Memastikan tim henti jantung dipanggil dan defibrilator/troli darurat disiapkan",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "A3",
     "grup": "A",
     "teks": "Memastikan kompresi dada berkualitas (100–120 x/menit, kedalaman 5–6 cm, recoil penuh) berlangsung dengan jeda minimal",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A4",
     "grup": "A",
     "teks": "Memasang pad/monitor dan memastikan ventilasi dengan oksigen tinggi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B1",
     "grup": "B",
     "teks": "Menganalisis irama dengan jeda minimal dan mengenali asistol (memastikan sadapan dan gain)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B2",
     "grup": "B",
     "teks": "Menyatakan irama **tidak dapat disyok** dan tidak memberi syok; melanjutkan RJP",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "B3",
     "grup": "B",
     "teks": "Meminta akses IV/IO dan epinefrin segera, diulang tiap 3–5 menit",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "B4",
     "grup": "B",
     "teks": "Siklus RJP 2 menit, cek irama dan nadi tiap 2 menit, bergantian penolong kompresi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B5",
     "grup": "B",
     "teks": "Jalan napas lanjut dan kapnografi (bila tersedia) dengan kompresi berkelanjutan dan ventilasi tidak berlebihan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B6",
     "grup": "B",
     "teks": "Mengenali PEA saat cek irama berikutnya, tetap tidak dapat disyok, dan melanjutkan algoritme yang sama",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C1",
     "grup": "C",
     "teks": "Menyebut dan mencari penyebab reversibel secara sistematis (H: hipoksia, hipovolemia, hiperkalemia/gangguan elektrolit, hipotermia, ion hidrogen; T: tension pneumotoraks, tamponade, toksin, trombosis koroner/paru)",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "C2",
     "grup": "C",
     "teks": "Meminta gas darah dengan elektrolit dan kalium segera, glukosa, serta riwayat dari perawat (dialisis terlewat)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C3",
     "grup": "C",
     "teks": "Menyimpulkan hiperkalemia sebagai penyebab yang paling mungkin pada pasien ini",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C4",
     "grup": "C",
     "teks": "Memerintahkan terapi hiperkalemia: kalsium IV segera, insulin dengan dekstrosa, dan mempertimbangkan natrium bikarbonat; tanpa menghentikan RJP",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D1",
     "grup": "D",
     "teks": "Memperkenalkan diri sebagai pemimpin dan menunjuk peran spesifik (kompresi, jalan napas/ventilasi, akses dan obat, pencatat)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D2",
     "grup": "D",
     "teks": "Komunikasi *closed-loop*: instruksi jelas, anggota mengulang, pemimpin memastikan terlaksana",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D3",
     "grup": "D",
     "teks": "Meringkas keadaan secara berkala dan meminta masukan tim",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D4",
     "grup": "D",
     "teks": "Mengoreksi kualitas kompresi atau ventilasi bila menurun dengan sopan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D5",
     "grup": "D",
     "teks": "Mengelola waktu: menyebut waktu siklus, mencatat waktu obat dan irama",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D6",
     "grup": "D",
     "teks": "Tenang, jelas, dan menghargai anggota tim",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E1",
     "grup": "E",
     "teks": "Mengenali ROSC (nadi teraba, TD, kapnografi meningkat) dan menghentikan kompresi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E2",
     "grup": "E",
     "teks": "Oksigenasi dan ventilasi terkontrol (hindari hipoksia dan hiperventilasi), mengatasi hipotensi, EKG 12 sadapan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E3",
     "grup": "E",
     "teks": "Melanjutkan terapi penyebab: pantau kalium dan glukosa, rencanakan dialisis darurat dan konsultasi nefrologi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E4",
     "grup": "E",
     "teks": "Memutuskan perawatan ICU dan pemantauan neurologis serta suhu terarah",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E5",
     "grup": "E",
     "teks": "Serah terima terstruktur (misalnya SBAR) kepada tim ICU, termasuk waktu henti, obat, dan penyebab dugaan",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "13": {
   "id": "13",
   "judul": "Gagal jantung kronik HFrEF: optimalisasi terapi dan edukasi",
   "berkas": "stasiun/13-gagal-jantung-kronik-optimalisasi-terapi.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "20",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Create",
    "Domain": "Telaah terapi, keputusan titrasi yang aman, pemantauan, edukasi",
    "Jenis": "Pasien simulasi (SP) + penguji memberi data pemeriksaan/penunjang bila diminta",
    "Level peserta": "Dokter umum / PPDS tahun awal",
    "Status": "DRAF — belum direview kardiolog; **seluruh angka dan syarat terapi belum diverifikasi ke teks guideline** (teks tidak tersedia di PMC); dosis tidak dinilai"
   },
   "durasiMenit": 8,
   "skorMaks": 20,
   "instruksiKandidat": "Anda dokter di poliklinik jantung. **Bapak Darmin, 58 tahun**, pedagang, kontrol rutin. Ia memiliki **gagal jantung dengan fraksi ejeksi menurun akibat kardiomiopati iskemik** (infark anterior 3 tahun lalu, sudah dipasang ring). Ekokardiografi 4 bulan lalu: LVEF 30%. Hari ini ia tidak mengeluh sesak berat.\n\n**Tugas:**\n1. Telaah kondisi dan terapinya melalui anamnesis terfokus.\n2. Minta pemeriksaan fisik dan penunjang yang Anda perlukan; penguji akan memberi hasilnya.\n3. Putuskan langkah **optimalisasi terapi** hari ini, sebutkan rencana pemantauannya, dan jelaskan kepada pasien.",
   "pertanyaanLanjutan": "1. \"Mengapa ACEi dan penyekat beta saja tidak cukup?\" *(Manfaat bertahan hidup dan penurunan rawat inap muncul dari kombinasi empat golongan; tiap golongan menambah manfaat pada HFrEF.)*\n2. \"Kalium menjadi 5,6 setelah antagonis mineralokortikoid. Apa yang Anda lakukan?\" *(Tinjau dosis dan penyebab, hentikan atau kurangi sementara, ulang pemeriksaan, hindari NSAID dan suplemen kalium; keputusan sesuai ambang guideline.)*\n3. \"Kapan Anda mempertimbangkan ICD dan CRT?\" *(ICD pencegahan primer bila LVEF masih rendah setelah terapi optimal minimal 3 bulan dan harapan hidup baik; CRT bila QRS lebar dengan morfologi tertentu; keputusan oleh kardiolog. Pasien ini QRS 108 ms, tidak memenuhi CRT.)*\n4. \"Apa efek samping SGLT2i yang perlu dijelaskan?\" *(Infeksi genital, penurunan volume, ketoasidosis euglikemik; nasihat hari sakit.)*\n5. \"Kapan Anda memeriksa status besi?\" *(Pada HFrEF; defisiensi besi dapat memperburuk gejala; perlu ferritin dan saturasi transferin.)*",
   "catatan": "- Kesalahan umum: hanya menaikkan dosis tanpa menambah golongan; memberi antagonis mineralokortikoid tanpa memeriksa kalium dan kreatinin; mengganti ke ARNI tanpa jeda atau tanpa menanyakan angioedema; mengubah semua obat sekaligus; lupa NSAID dan jamu; tidak menyebut pemantauan; menjanjikan penjaminan.\n- Stasiun ini melengkapi [stasiun 06](06-gagal-jantung-akut-dekompensasi.md) yang berfokus akut. Hindari keduanya dalam satu sirkuit bila ingin menguji domain gagal jantung sekali.\n- Variasi: kalium 5,4 (menguji kehati-hatian MRA); TD sistolik 98 (menguji prioritas titrasi); LBBB dengan QRS 160 ms (CRT); HFmrEF atau HFpEF (tambah SGLT2i); pasien dengan gejala kongesti (diuretik).\n- Sesuaikan butir C dengan Fornas dan ketersediaan obat di rumah sakit setempat.",
   "rujukan": "- McDonagh TA, et al. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. *Eur Heart J*. 2021;42:3599–3726. (Metadata terverifikasi; teks tidak tersedia di PMC dan belum dicocokkan.)\n- Heidenreich PA, et al. 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure. *Circulation*. 2022;145:e895–e1032. (Idem.)\n- Pedoman PERKI untuk gagal jantung — verifikasi edisi yang berlaku.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "A": "Anamnesis terfokus",
    "B": "Penilaian status dan data",
    "C": "Optimalisasi terapi",
    "D": "Pemantauan dan keselamatan",
    "E": "Edukasi dan komunikasi"
   },
   "checklist": [
    {
     "id": "A1",
     "grup": "A",
     "teks": "Salam, perkenalan, konfirmasi identitas, meminta persetujuan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A2",
     "grup": "A",
     "teks": "Gejala dan kelas fungsional: sesak saat aktivitas, ortopnea dan PND, edema, perubahan berat badan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A3",
     "grup": "A",
     "teks": "Kepatuhan dan efek samping obat (pusing, batuk, bengkak wajah); obat lain yang memperburuk (NSAID, jamu)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "A4",
     "grup": "A",
     "teks": "Penyebab dan komorbid (infark, diabetes, ginjal) serta alergi, termasuk riwayat angioedema",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B1",
     "grup": "B",
     "teks": "Menilai status volume dan perfusi (JVP, paru, edema, berat badan, akral)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B2",
     "grup": "B",
     "teks": "Tekanan darah dan nadi, termasuk berdiri bila relevan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B3",
     "grup": "B",
     "teks": "Laboratorium sebelum menambah obat: kalium, kreatinin/eGFR, natrium (± Hb dan status besi)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "B4",
     "grup": "B",
     "teks": "EKG dan hasil ekokardiografi (LVEF, QRS) untuk menilai kelas HFrEF dan kebutuhan perangkat",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C1",
     "grup": "C",
     "teks": "Mengenali HFrEF (LVEF ≤ 40%) dengan terapi belum optimal dan menyebut **empat golongan dasar**: ARNI atau penghambat ACE/ARB, penyekat beta, antagonis mineralokortikoid, dan SGLT2i",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "C2",
     "grup": "C",
     "teks": "Menambahkan SGLT2i (manfaat ganda pada diabetes), dengan efek samping dan nasihat hari sakit",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C3",
     "grup": "C",
     "teks": "Antagonis mineralokortikoid hanya setelah memeriksa kalium dan fungsi ginjal (kalium dan eGFR memenuhi syarat), dengan rencana pemantauan",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "C4",
     "grup": "C",
     "teks": "Penyekat beta: menaikkan dosis bertahap menuju dosis target bila nadi dan TD memungkinkan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C5",
     "grup": "C",
     "teks": "ARNI sebagai pengganti ACEi bila memenuhi syarat: jeda sebelum mengganti ACEi (36 jam), tanpa riwayat angioedema, TD sistolik cukup",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C6",
     "grup": "C",
     "teks": "Tidak mengubah semuanya sekaligus: memilih langkah awal yang aman, titrasi bertahap, kontrol dalam 1–2 minggu",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "C7",
     "grup": "C",
     "teks": "Diuretik hanya untuk kongesti; menghentikan NSAID; tidak ada diuretik rutin bila euvolemik",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D1",
     "grup": "D",
     "teks": "Rencana pemantauan setelah perubahan: TD dan gejala hipotensi, kalium dan kreatinin, berat badan, jadwal kontrol",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "D2",
     "grup": "D",
     "teks": "Kapan menghubungi dokter atau menghentikan sementara obat: pusing berat atau pingsan, bengkak wajah, urin sangat sedikit, muntah atau diare dan tidak bisa minum",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E1",
     "grup": "E",
     "teks": "Gaya hidup: batasi garam, timbang berat badan harian dan lapor bila naik cepat, aktivitas fisik dan rehabilitasi, tidak merokok",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E2",
     "grup": "E",
     "teks": "Menjelaskan alasan tiap obat dan manfaat jangka panjang dengan bahasa awam; menjawab kekhawatiran tentang ginjal dan biaya tanpa menjanjikan penjaminan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "E3",
     "grup": "E",
     "teks": "Mengecek pemahaman (*teach-back*), merangkum, dan menyepakati rencana kontrol",
     "skor": 1,
     "kritis": false
    }
   ]
  },
  "14": {
   "id": "14",
   "judul": "Interpretasi EKG: blok AV derajat tiga dengan bradikardia tidak stabil",
   "berkas": "stasiun/14-ekg-blok-av-total.md",
   "meta": {
    "Durasi": "8 menit (+ 2 menit pindah/baca instruksi)",
    "Skor maksimum": "20",
    "Level Miller": "Shows how",
    "Level Bloom": "Apply–Analyze",
    "Domain": "Interpretasi EKG, penilaian stabilitas, tatalaksana awal bradikardia, penyebab reversibel",
    "Jenis": "Data (EKG + data klinis) + penguji",
    "Level peserta": "Dokter umum / PPDS tahun awal",
    "Status": "DRAF — **gambar EKG belum disertakan**; belum direview kardiolog; **algoritme dan obat belum diverifikasi ke teks guideline** (teks tidak tersedia di PMC); dosis tidak dinilai"
   },
   "durasiMenit": 8,
   "skorMaks": 20,
   "instruksiKandidat": "Anda dokter jaga IGD. **Ibu Marta, 74 tahun**, datang dengan **lemas, pusing, dan hampir pingsan sejak 3 jam**. Ia memiliki hipertensi. Perawat telah mengukur tanda vital.\n\nTanda vital: TD 78/48 mmHg · nadi 34 x/menit · napas 22 x/menit · SpO₂ 94% udara ruang · suhu 36,6 °C. Pasien tampak bingung ringan; EKG 12 sadapan di hadapan Anda.\n\n**Tugas:**\n1. Interpretasikan EKG secara sistematis (secara lisan).\n2. Sebutkan diagnosis dan penilaian lanjutan yang Anda lakukan.\n3. Sebutkan tatalaksana awal yang Anda lakukan sekarang.",
   "pertanyaanLanjutan": "1. \"Bagaimana membedakan blok AV derajat dua tipe Mobitz I dan Mobitz II?\" *(Mobitz I: PR memanjang bertahap lalu satu P tidak dihantar; biasanya di nodus AV. Mobitz II: PR tetap lalu P tiba-tiba tidak dihantar; biasanya di bawah nodus AV, berisiko menjadi blok total.)*\n2. \"Mengapa atropin sering tidak efektif pada pasien ini?\" *(Atropin bekerja pada nodus AV melalui penghambatan vagal; pada blok di bawah nodus AV dengan QRS lebar, efeknya terbatas.)*\n3. \"Bagaimana bila ini blok AV pada infark inferior?\" *(Sering di nodus AV, pelarian QRS sempit, sering membaik; tetap nilai kebutuhan pacu; cari infark ventrikel kanan.)*\n4. \"Kapan pacu jantung permanen diindikasikan?\" *(Blok AV derajat tiga atau Mobitz II yang bukan akibat penyebab reversibel, terutama bila simtomatik; keputusan kardiolog.)*\n5. \"Apa yang Anda lakukan bila terdapat hiperkalemia sebagai penyebab?\" *(Kalsium IV, insulin dengan dekstrosa, dan terapi hiperkalemia lain; lihat stasiun 12.)*",
   "catatan": "- Kesalahan umum: menyebut \"bradikardia sinus\" atau \"blok AV derajat dua\"; tidak menilai stabilitas; memberi penyekat beta atau CCB tambahan; menunggu laboratorium sebelum menyiapkan pacu; hanya mengandalkan atropin; tidak berpikir ke infark inferior atau hiperkalemia; lupa menahan obat penghambat nodus AV.\n- Variasi: blok AV derajat tiga dengan QRS sempit (infark inferior, pelarian junctional); Mobitz II; blok AV derajat satu dengan sinkop; bradikardia sinus pada penyekat beta atau digoksin (kadar digoksin, antidot).\n- Stasiun ini menyambung ke [stasiun 02](02-ekg-stemi-inferior.md) dan [stasiun 12](12-acls-irama-tidak-dapat-disyok.md). Sesuaikan K1–K5 dengan ketersediaan alat pacu dan ICCU di rumah sakit setempat.",
   "rujukan": "- Kusumoto FM, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay. *Circulation*. 2019;140:e382–e482. (Metadata terverifikasi; teks tidak tersedia di PMC dan belum dicocokkan.)\n- Wigginton JG, et al. Part 9: Adult Advanced Life Support: 2025 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. *Circulation*. 2025;152(16 suppl 2):S538–S577. (Idem.)\n- Pedoman PERKI untuk bradiaritmia dan pacu jantung — verifikasi edisi yang berlaku.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
   "grup": {
    "I": "Interpretasi EKG",
    "J": "Penilaian klinis",
    "K": "Tatalaksana",
    "L": "Komunikasi"
   },
   "checklist": [
    {
     "id": "I1",
     "grup": "I",
     "teks": "Laju atrium ± 90 x/menit (P teratur) dan laju ventrikel ± 34 x/menit (QRS teratur)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I2",
     "grup": "I",
     "teks": "Disosiasi AV: tidak ada hubungan tetap antara P dan QRS, interval PR bervariasi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I3",
     "grup": "I",
     "teks": "QRS lebar (± 140 ms) sebagai ritme pelarian dari bawah nodus AV",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I4",
     "grup": "I",
     "teks": "Segmen ST dan T: tidak ada elevasi ST; menyebut mencari infark (terutama inferior) sebagai penyebab",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I5",
     "grup": "I",
     "teks": "Diagnosis: **blok AV derajat tiga (total)** dengan ritme pelarian",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "I6",
     "grup": "I",
     "teks": "Menyatakan bahwa ritme pelarian lambat dan lebar kurang andal dan berisiko berhenti (asistol)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "I7",
     "grup": "I",
     "teks": "Presentasi sistematis (laju, irama, P, PR, QRS, ST) dan terstruktur",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "J1",
     "grup": "J",
     "teks": "Menilai stabilitas dan menyatakan **bradikardia dengan tanda hipoperfusi** (hipotensi, akral dingin, penurunan kesadaran) sehingga memerlukan tindakan segera",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "J2",
     "grup": "J",
     "teks": "Memasang monitor dan akses IV, oksigen bila hipoksia, dan menyiapkan alat pacu jantung/defibrilator",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "J3",
     "grup": "J",
     "teks": "Mencari penyebab yang dapat dikoreksi: obat penghambat nodus AV (penyekat beta), gangguan elektrolit (hiperkalemia), iskemia atau infark, hipotiroid",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "J4",
     "grup": "J",
     "teks": "Pemeriksaan penunjang: elektrolit, troponin, fungsi tiroid, ekokardiografi, foto toraks",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "K1",
     "grup": "K",
     "teks": "Menyiapkan **pacu jantung transkutan** untuk bradikardia tidak stabil, tanpa menunda",
     "skor": 1,
     "kritis": true
    },
    {
     "id": "K2",
     "grup": "K",
     "teks": "Atropin IV dapat dicoba sambil menyiapkan pacu, dengan menyebut keterbatasannya pada blok di bawah nodus AV/QRS lebar (boleh langsung memilih pacu dengan alasan yang sama)",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "K3",
     "grup": "K",
     "teks": "Infus dopamin atau epinefrin sebagai jembatan bila atropin tidak efektif atau pacu belum tersedia",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "K4",
     "grup": "K",
     "teks": "Menahan penyekat beta dan obat penghambat nodus AV lain serta mengoreksi penyebab yang ditemukan",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "K5",
     "grup": "K",
     "teks": "Merencanakan pacu jantung sementara transvena dan merawat di ICU/ICCU dengan konsultasi kardiologi atau elektrofisiologi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "K6",
     "grup": "K",
     "teks": "Menyebut bahwa blok AV derajat tiga yang bukan akibat penyebab reversibel umumnya memerlukan pacu jantung permanen",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "K7",
     "grup": "K",
     "teks": "Memantau respons (laju, TD, perfusi), mengevaluasi ulang secara berkala, dan menghindari obat yang memperlambat konduksi AV",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "L1",
     "grup": "L",
     "teks": "Presentasi ringkas dan jelas kepada penguji/senior, menyebut rencana eskalasi",
     "skor": 1,
     "kritis": false
    },
    {
     "id": "L2",
     "grup": "L",
     "teks": "Menjelaskan kondisi dan rencana kepada pasien/keluarga dengan bahasa awam, menyebut perlunya alat pacu dan meminta persetujuan",
     "skor": 1,
     "kritis": false
    }
   ]
  }
 }
};
