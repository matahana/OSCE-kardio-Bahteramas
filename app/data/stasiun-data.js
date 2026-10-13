/* BERKAS HASIL GENERATOR — jangan disunting tangan.
   Sumber: stasiun/*.md. Perbarui dengan: python3 -I tools/buat_data.py */
window.OSCE_DATA = {
 "urutan": [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06"
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
   "rujukan": "- Pedoman pemeriksaan fisik jantung di buku ajar institusi.\n- Guideline katup jantung ACC/AHA dan ESC/EACTS terbaru — **verifikasi versi** sebelum menaikkan butir pertanyaan lanjutan menjadi butir skor.\n\nDaftar lengkap: [referensi/README.md](../referensi/README.md).",
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
  }
 }
};
