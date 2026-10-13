/* Interaksi Stasiun 09 — Hipertensi emergensi.
   Skrip pasien dan data mengikuti stasiun/09-hipertensi-emergensi.md (bagian 3).
   Alasan "tidak tepat/berisiko" (obat oral/sublingual kerja cepat, penurunan terlalu cepat, salah klasifikasi)
   BELUM diverifikasi ke teks guideline (teks tidak tersedia; wiki/guidelines-status.md). Dosis tidak dinilai. */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h;

  g.OSCE.daftar('09', {
    pasien: { nama: 'Bapak Slamet', ringkas: '58 tahun, pedagang; sakit kepala hebat sejak kemarin', keadaan: 'Duduk memegang kepala, bicara lambat, sesekali tampak bingung ringan.' },
    tandaVital: [['TD', '224/134 mmHg (lengan kanan)'], ['Nadi', '94 x/menit'], ['Napas', '20 x/menit'], ['SpO₂', '97% udara ruang'], ['Suhu', '36,8 °C']],
    waktu: 480,
    petunjuk: 'Hasil pemeriksaan dan penunjang hanya muncul bila diminta. Keluarga akan bertanya apakah obat darah tinggi diminum saja agar cepat turun.',
    panel: [
      {
        id: 'awal', label: 'Penilaian awal', tipe: 'aksi',
        grup: [{ judul: 'Penilaian awal dan validasi tekanan darah', aksi: [
          A('salam', 'Selamat siang, Pak. Saya dokter jaga IGD. Boleh saya periksa Bapak sekarang?', 'Silakan, Dok… kepala saya sakit sekali.', 8),
          A('abc_monitor_iv', 'Nilai jalan napas, napas, sirkulasi, dan kesadaran; pasang monitor dan akses IV.', 'Napas spontan baik, nadi 94, sadar tetapi bingung ringan. Monitor dan akses IV terpasang.', 12),
          A('td_dua_lengan', 'Ulangi tekanan darah pada kedua lengan dengan manset yang sesuai.', 'Kanan 222/132, kiri 220/130 mmHg.', 12),
          A('nadi_perifer', 'Periksa nadi perifer kedua sisi (simetri) untuk kecurigaan diseksi aorta.', 'Nadi radialis dan femoralis simetris, kuat.', 8)
        ] }]
      },
      {
        id: 'anamnesis', label: 'Anamnesis', tipe: 'aksi', cari: true,
        grup: [{ judul: 'Anamnesis terfokus', aksi: [
          A('sakit_kepala', 'Bagaimana sakit kepalanya? Sejak kapan, dan seberapa berat?', 'Seluruh kepala, sejak kemarin, makin berat.', 8),
          A('penglihatan', 'Apakah pandangan kabur?', 'Iya, pandangan saya kabur.', 8),
          A('mual_muntah', 'Apakah mual atau muntah?', 'Mual, muntah dua kali.', 6),
          A('kesadaran_kejang', 'Apakah ada kebingungan, kejang, kelemahan separuh badan, atau bicara pelo?', 'Merasa mengantuk dan bingung sejak pagi; tidak ada kelemahan separuh badan, bicara pelo, atau kejang.', 8),
          A('nyeri_dada', 'Apakah ada nyeri dada atau berdebar?', 'Tidak ada.', 6),
          A('sesak', 'Apakah sesak napas?', 'Tidak sesak.', 6),
          A('nyeri_punggung', 'Apakah ada nyeri punggung seperti disobek?', 'Tidak ada nyeri punggung.', 6),
          A('urin', 'Bagaimana buang air kecil dan bengkak kaki?', 'Buang air kecil lebih sedikit dan keruh dua hari ini; kaki sedikit bengkak.', 8),
          A('ht_riwayat', 'Sudah berapa lama punya darah tinggi? Obat apa yang diminum?', 'Sekitar 8 tahun, minum amlodipin 10 mg.', 8),
          A('kepatuhan', 'Apakah obat diminum teratur?', 'Berhenti tiga minggu lalu karena merasa sehat dan obat habis.', 8),
          A('pencetus', 'Apakah memakai obat pereda nyeri, jamu, stimulan, atau dekongestan? Bagaimana asupan garam?', 'Natrium diklofenak tiap hari dua minggu untuk pegal linu, dan jamu. Tidak memakai stimulan. Makan asin.', 10),
          A('komorbid', 'Apakah ada diabetes, penyakit ginjal, stroke, atau penyakit jantung?', 'Tidak tahu menderita diabetes; tidak ada riwayat stroke, jantung, atau ginjal.', 8),
          A('alergi', 'Apakah ada alergi obat?', 'Tidak ada.', 5),
          A('pekerjaan', 'Bapak berdagang apa, dan sudah berapa lama?', 'Jual sembako, Dok, sudah lama… tapi kepala saya sakit.', 8,
            { tidakTepat: 'Tidak relevan pada pasien dengan kemungkinan kerusakan organ akut.' })
        ] }]
      },
      {
        id: 'periksa', label: 'Pemeriksaan', tipe: 'aksi',
        grup: [{ judul: 'Pemeriksaan fisik (hasil diberikan bila diminta)', aksi: [
          A('neuro', 'Pemeriksaan neurologis: GCS, defisit fokal, tanda rangsang meningeal.', 'GCS 14 (E4 V4 M6), bingung ringan; tanpa defisit fokal; pupil isokor; tanda meningeal negatif.', 15),
          A('funduskopi', 'Funduskopi.', 'Perdarahan retina bentuk api dan eksudat; edema papil bilateral.', 12),
          A('jantung', 'Auskultasi jantung.', 'S1–S2 reguler, tanpa bising.', 8),
          A('paru', 'Auskultasi paru.', 'Paru bersih.', 8),
          A('edema', 'Periksa edema tungkai.', 'Edema pitting 1+ di tungkai.', 6),
          A('abdomen_lengkap', 'Pemeriksaan abdomen dan genitalia lengkap.', 'Tidak ada kelainan bermakna.', 20,
            { tidakTepat: 'Tidak ada indikasi mendesak; menyita waktu pada kegawatan.' })
        ] }]
      },
      {
        id: 'penunjang', label: 'Penunjang', tipe: 'aksi',
        grup: [{ judul: 'Pemeriksaan penunjang', aksi: [
          A('ekg', 'EKG 12 sadapan.', 'Sinus 94 x/menit; hipertrofi ventrikel kiri dengan strain; tanpa elevasi ST.', 6),
          A('lab_kreatinin', 'Kreatinin dan ureum.', 'Kreatinin 1,9 mg/dL (baseline 1,3), ureum 52 mg/dL.', 6),
          A('lab_elektrolit', 'Elektrolit.', 'Na 138, K 3,9 mmol/L.', 6),
          A('lab_glukosa', 'Glukosa darah.', '142 mg/dL.', 5),
          A('urinalisis', 'Urinalisis.', 'Protein 2+, eritrosit 5–10/LPB.', 6),
          A('troponin', 'Troponin.', 'Negatif.', 6),
          A('hb', 'Hemoglobin.', 'Hb 12,8 g/dL.', 5),
          A('ct_kepala', 'CT kepala non-kontras.', 'Tidak ada perdarahan atau infark akut.', 10),
          A('foto_toraks', 'Foto toraks.', 'Kardiomegali ringan; tanpa edema paru; mediastinum tidak melebar.', 8),
          A('mri_otak', 'MRI otak sebagai pemeriksaan pertama.', 'Antrean MRI panjang; pasien harus menunggu.', 25,
            { tidakTepat: 'Menunda diagnosis dan terapi; CT kepala non-kontras lebih cepat untuk menyingkirkan perdarahan.' })
        ] }]
      },
      {
        id: 'terapi', label: 'Tatalaksana', tipe: 'aksi',
        grup: [
          { judul: 'Diagnosis dan tempat perawatan', aksi: [
            A('dx_emergensi', 'Nyatakan hipertensi emergensi: tekanan darah sangat tinggi disertai kerusakan organ target akut (ensefalopati, retinopati, cedera ginjal).', 'Penguji: diagnosis dicatat.', 8,
              { eksklusif: 'dx' }),
            A('rawat_icu', 'Rawat di ICU/HCU dengan pemantauan kontinu.', 'Pasien diatur masuk ICU/HCU.', 8),
            A('dx_urgensi', 'Ini hipertensi urgensi; cukup obat oral lalu pulang.', 'Keluarga lega, tetapi pasien makin mengantuk.', 8,
              { eksklusif: 'dx', tidakTepat: 'Ada kerusakan organ target akut (edema papil, ensefalopati, cedera ginjal): ini emergensi, bukan urgensi.' })
          ] },
          { judul: 'Obat antihipertensi', aksi: [
            A('nikardipin_iv', 'Nikardipin IV titrasi dengan pemantauan TD sering.', 'Nikardipin IV dimulai dan dititrasi; TD turun bertahap.', 10, { eksklusif: 'agen' }),
            A('labetalol_iv', 'Labetalol IV titrasi dengan pemantauan TD dan nadi.', 'Labetalol IV dimulai; nadi 78, TD turun bertahap.', 10, { eksklusif: 'agen' }),
            A('nitrogliserin_iv', 'Nitrogliserin IV titrasi.', 'Nitrogliserin IV dimulai; sakit kepala bertambah ringan.', 10, { eksklusif: 'agen' }),
            A('nifedipin_sl', 'Nifedipin sublingual agar tekanan darah cepat turun.', 'TD turun cepat menjadi 150/80; pasien tampak makin mengantuk dan sulit dibangunkan.', 8,
              { eksklusif: 'agen', berisiko: 'Penurunan tekanan darah cepat dan tak terkendali dapat menyebabkan iskemia otak, jantung, atau ginjal pada hipertensi kronik.' }),
            A('captopril_sl', 'Captopril sublingual.', 'TD turun mendadak; pasien pucat dan lemas.', 8,
              { eksklusif: 'agen', berisiko: 'Penurunan tekanan darah cepat dan tak terkendali dapat menyebabkan iskemia organ.' }),
            A('amlodipin_oral', 'Lanjutkan amlodipin oral dosis lebih tinggi.', 'Obat diminum; tekanan darah belum berubah bermakna.', 8,
              { eksklusif: 'agen', tidakTepat: 'Obat oral tidak memberi penurunan yang cepat dan terkendali pada emergensi.' })
          ] },
          { judul: 'Target dan pemantauan', aksi: [
            A('target_bertahap', 'Target: turun tidak lebih dari ± 25% pada jam pertama, lalu menuju sekitar 160/100–110 mmHg dalam 2–6 jam, kemudian normal bertahap dalam 24–48 jam.',
              'Target dicatat; perawat siap memantau.', 10, { eksklusif: 'target' }),
            A('target_normal_cepat', 'Turunkan sampai 130/80 mmHg dalam satu jam.', 'Perawat mengingatkan penurunan terlalu cepat; TD turun tajam, pasien menjadi lemas.', 10,
              { eksklusif: 'target', berisiko: 'Penurunan terlalu cepat melebihi batas autoregulasi organ pada hipertensi kronik.' }),
            A('pantau_td', 'Pantau TD sering selama titrasi (arteri atau tiap beberapa menit).', 'Pemantauan TD sering diatur.', 5),
            A('pantau_neuro', 'Pantau status neurologis berkala.', 'Penilaian neurologis berkala diatur.', 5),
            A('pantau_urin', 'Pasang kateter urin dan pantau produksi urin.', 'Urin dipantau per jam.', 5),
            A('pantau_lab', 'Ulangi kreatinin dan elektrolit berkala.', 'Jadwal laboratorium ulang ditetapkan.', 5),
            A('kenali_pengecualian', 'Ingat pengecualian: diseksi aorta, stroke akut, dan preeklamsia/eklamsia memiliki target dan obat yang berbeda; kasus ini tanpa tanda ke arah itu.',
              'Penguji mengangguk.', 10)
          ] }
        ]
      },
      {
        id: 'komunikasi', label: 'Komunikasi', tipe: 'aksi',
        grup: [{ judul: 'Menjelaskan kepada pasien dan keluarga', aksi: [
          A('jelaskan', 'Jelaskan: tekanan darah yang sangat tinggi sudah memengaruhi otak, mata, dan ginjal sehingga perlu obat lewat infus di ruang pantau, diturunkan bertahap. Obat minum atau di bawah lidah dapat menurunkan terlalu cepat dan berbahaya.',
            'Keluarga: "Oh begitu… baik, Dok, kami mengerti kenapa tidak cukup diminum saja."', 25),
          A('edukasi', 'Edukasi: minum obat teratur walau merasa sehat, hindari obat pegal golongan NSAID dan garam berlebih, periksa penyebab sekunder dan fungsi ginjal, dan kontrol teratur.', 'Baik, Dok. Saya tidak akan berhenti minum obat lagi.', 20),
          A('turuti_keluarga', 'Baik, kami beri obat darah tinggi yang diminum agar cepat turun sesuai permintaan keluarga.', 'Keluarga menyetujui.', 8,
            { berisiko: 'Mengikuti permintaan obat oral/sublingual cepat menurunkan tekanan darah tak terkendali pada emergensi.' }),
          A('jargon', 'Bapak mengalami krisis hipertensi dengan ensefalopati hipertensif dan retinopati grade IV.', 'Maksudnya apa, Dok?', 8,
            { tidakTepat: 'Istilah teknis tanpa penjelasan kepada pasien/keluarga.' })
        ] }]
      }
    ],
    acara: [],
    skor: {
      A1: h.any(['salam']),
      A2: h.any(['abc_monitor_iv']),
      A3: h.all(['td_dua_lengan', 'nadi_perifer']),
      B1: h.count(['sakit_kepala', 'penglihatan', 'mual_muntah', 'kesadaran_kejang'], [[3, 1]]),
      B2: h.count(['nyeri_dada', 'sesak', 'nyeri_punggung'], [[2, 1]]),
      B3: h.all(['ht_riwayat', 'kepatuhan']),
      B4: h.all(['pencetus', 'komorbid', 'alergi']),
      C1: h.any(['neuro']),
      C2: h.any(['funduskopi']),
      C3: h.count(['jantung', 'paru', 'edema'], [[2, 1]]),
      D1: h.any(['ekg']),
      D2: h.count(['lab_kreatinin', 'lab_elektrolit', 'lab_glukosa', 'urinalisis', 'troponin', 'hb'], [[3, 1]]),
      D3: h.all(['ct_kepala', 'foto_toraks']),
      E1: h.all(['dx_emergensi', 'rawat_icu']),
      E2: h.any(['nikardipin_iv', 'labetalol_iv', 'nitrogliserin_iv']),
      E3: h.any(['target_bertahap']),
      E4: h.count(['pantau_td', 'pantau_neuro', 'pantau_urin', 'pantau_lab'], [[3, 1]]),
      E5: h.any(['kenali_pengecualian']),
      F1: h.kustom(function (c) { return c.sudah('jelaskan') && !c.sudah('jargon') && !c.sudah('turuti_keluarga') ? 1 : 0; }, ['jelaskan', 'jargon', 'turuti_keluarga']),
      F2: h.any(['edukasi'])
    },
    ideal: [
      'salam', 'abc_monitor_iv', 'td_dua_lengan', 'nadi_perifer',
      'sakit_kepala', 'penglihatan', 'kesadaran_kejang', 'nyeri_dada', 'nyeri_punggung', 'ht_riwayat', 'kepatuhan', 'pencetus', 'komorbid', 'alergi',
      'neuro', 'funduskopi', 'jantung', 'paru',
      'ekg', 'lab_kreatinin', 'lab_elektrolit', 'urinalisis', 'ct_kepala', 'foto_toraks',
      'dx_emergensi', 'rawat_icu', 'nikardipin_iv', 'target_bertahap', 'pantau_td', 'pantau_neuro', 'pantau_urin', 'kenali_pengecualian',
      'jelaskan', 'edukasi'
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
