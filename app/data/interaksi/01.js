/* Interaksi Stasiun 01 — Anamnesis nyeri dada akut.
   Skrip pasien mengikuti stasiun/01-anamnesis-nyeri-dada.md (bagian 3).
   Checklist (id, poin, butir kritis) berasal dari markdown melalui data hasil generator. */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h;

  g.OSCE.daftar('01', {
    pasien: { nama: 'Tn. Rahmat', ringkas: '58 tahun, pedagang', keadaan: 'Tampak cemas, memegang dada, bicara singkat.' },
    tandaVital: [['TD', '150/90 mmHg'], ['Nadi', '96 x/menit'], ['Napas', '20 x/menit'], ['SpO₂', '96% udara ruang'], ['Suhu', '36,8 °C']],
    waktu: 480,
    petunjuk: 'Pilih pertanyaan yang paling penting lebih dulu. Setiap pertanyaan memakan waktu simulasi.',
    panel: [
      {
        id: 'anamnesis', label: 'Anamnesis', tipe: 'aksi', cari: true,
        grup: [
          { judul: 'Pembukaan', aksi: [
            A('salam', 'Selamat siang, Pak. Saya dokter jaga IGD.', 'Siang, Dok… (meringis, memegang dada)', 8),
            A('identitas', 'Boleh saya konfirmasi nama dan usia Bapak?', 'Rahmat, Dok. Umur 58.', 8),
            A('tujuan', 'Saya akan menanyakan beberapa hal tentang nyeri dada Bapak supaya kami bisa menolong dengan tepat. Apakah Bapak bersedia?', 'Bersedia, Dok. Tolong cepat ya.', 10)
          ] },
          { judul: 'Karakteristik nyeri dada', aksi: [
            A('lokasi', 'Di sebelah mana dada Bapak yang sakit? Boleh ditunjukkan?', '(mengepalkan tangan di tengah dada) Di sini, Dok. Di balik tulang dada.', 12),
            A('onset', 'Kapan nyeri ini mulai, dan apakah masih berlangsung sekarang?', 'Sekitar satu jam lalu, waktu saya naik tangga ke toko. Sampai sekarang masih sakit.', 12),
            A('kualitas', 'Seperti apa rasa nyerinya: ditusuk, terbakar, atau ditekan?', 'Seperti ditindih beban berat, Dok. Diremas.', 10),
            A('penjalaran', 'Apakah nyerinya menjalar ke tempat lain, misalnya lengan, rahang, atau punggung?', 'Ke lengan kiri sama rahang kiri. Ke punggung tidak.', 12),
            A('pencetus', 'Apa yang memicu nyeri ini? Aktivitas, emosi, makan, perubahan posisi, atau tarikan napas?', 'Mulainya waktu naik tangga. Makan atau tarik napas tidak memengaruhi.', 14),
            A('pereda', 'Apa yang membuatnya lebih ringan atau lebih berat? Apakah membaik dengan istirahat atau obat?', 'Duduk istirahat lima belas menit tidak membaik. Saya belum minum obat apa-apa.', 12),
            A('keparahan', 'Dari skala 0 sampai 10, seberapa berat nyerinya?', 'Delapan, Dok.', 8),
            A('sesak', 'Apakah disertai sesak napas?', 'Iya, sesak sedikit.', 8),
            A('keringat', 'Apakah ada keringat dingin?', 'Iya, keringat dingin dari tadi.', 8),
            A('mual', 'Apakah ada mual atau muntah?', 'Mual, tapi tidak muntah.', 8),
            A('berdebar', 'Apakah jantung terasa berdebar?', 'Tidak, Dok.', 8),
            A('sinkop', 'Apakah Bapak sempat pingsan atau hampir pingsan?', 'Tidak pingsan.', 8),
            A('pola', 'Apakah sebelumnya pernah nyeri dada seperti ini? Bagaimana pola dua minggu terakhir?', 'Dua minggu ini sering nyeri dada kalau jalan sekitar dua ratus meter, hilang kalau istirahat. Hari ini lebih lama dan lebih berat.', 14),
            A('aktivitas_hari_ini', 'Apa yang Bapak kerjakan sebelum nyeri mulai?', 'Habis mengangkat barang dagangan, terus naik tangga.', 14),
            A('makan_terakhir', 'Kapan terakhir kali Bapak makan, dan apa yang dimakan?', 'Tadi pagi nasi kuning, Dok.', 14),
            A('pernah_dirawat', 'Apakah pernah dirawat karena keluhan serupa?', 'Belum pernah, Dok.', 14),
            A('ekg_sebelumnya', 'Apakah jantung Bapak pernah direkam (EKG) sebelumnya?', 'Pernah dua tahun lalu waktu cek kesehatan, katanya normal.', 14)
          ] },
          { judul: 'Diagnosis banding dan tanda bahaya', aksi: [
            A('disobek', 'Apakah nyerinya terasa seperti disobek atau menjalar ke punggung?', 'Bukan seperti disobek, Dok. Ke punggung juga tidak.', 14),
            A('pleuritik', 'Apakah nyeri bertambah saat menarik napas dalam atau berubah bila berganti posisi? Ada demam atau batuk?', 'Tidak, Dok. Tidak demam, tidak batuk.', 14),
            A('emboli', 'Apakah Bapak baru bepergian jauh, lama berbaring, atau kakinya bengkak?', 'Tidak ada. Kaki tidak bengkak.', 14),
            A('gerd', 'Apakah nyeri berkaitan dengan makan, terasa asam atau terbakar, atau sakit bila dada ditekan?', 'Tidak, Dok. Tidak ada hubungannya dengan makan. Ditekan juga tidak sakit.', 14)
          ] },
          { judul: 'Faktor risiko dan riwayat', aksi: [
            A('ht', 'Apakah Bapak punya riwayat darah tinggi?', 'Ada, sudah lima tahun. Obatnya amlodipin, tapi minumnya tidak teratur.', 10),
            A('dm', 'Apakah ada kencing manis?', 'Ada, minum metformin.', 8),
            A('dislipidemia', 'Apakah kolesterol Bapak pernah diperiksa?', 'Tidak tahu, Dok. Belum pernah cek.', 8),
            A('rokok', 'Apakah Bapak merokok? Berapa batang sehari dan sudah berapa lama?', 'Dua puluh batang sehari, sudah tiga puluh tahun.', 12),
            A('keluarga', 'Adakah keluarga dengan sakit jantung atau meninggal mendadak pada usia muda?', 'Ayah saya meninggal mendadak umur lima puluh dua, katanya serangan jantung.', 12),
            A('riwayat_jantung', 'Apakah pernah sakit jantung, stroke, atau menjalani tindakan jantung sebelumnya?', 'Tidak pernah, Dok.', 10),
            A('obat', 'Obat apa saja yang sedang Bapak minum?', 'Amlodipin dan metformin.', 10),
            A('alergi', 'Apakah ada alergi obat?', 'Tidak ada.', 8),
            A('perdarahan', 'Apakah pernah muntah darah, BAB hitam, tukak lambung, atau stroke perdarahan?', 'Tidak pernah.', 10),
            A('narkoba', 'Apakah Bapak memakai kokain atau obat terlarang lain?', 'Tidak, Dok.', 8),
            A('alkohol', 'Apakah Bapak minum alkohol?', 'Jarang, Dok.', 14),
            A('olahraga', 'Apakah Bapak rutin berolahraga?', 'Jarang, Dok. Sibuk di toko.', 14),
            A('stres', 'Apakah ada beban pikiran atau stres akhir-akhir ini?', 'Tokonya lagi sepi, Dok. Agak kepikiran.', 14),
            A('diet', 'Bagaimana pola makan Bapak sehari-hari?', 'Sering gorengan sama santan, Dok.', 14),
            A('berat_badan', 'Apakah berat badan Bapak berubah belakangan ini?', 'Naik sedikit, Dok.', 14),
            A('herbal', 'Apakah Bapak minum jamu atau suplemen?', 'Kadang jamu pegal linu.', 14),
            A('stroke_keluarga', 'Apakah ada keluarga dengan stroke atau diabetes?', 'Ibu saya kencing manis, Dok.', 14),
            A('ginjal', 'Apakah Bapak punya penyakit ginjal?', 'Tidak ada, Dok.', 14)
          ] },
          { judul: 'Penutup dan komunikasi', aksi: [
            A('ringkas', 'Jadi, nyeri tengah dada seperti ditindih sejak satu jam, menjalar ke lengan dan rahang kiri, disertai keringat dingin; Bapak punya darah tinggi, diabetes, dan merokok. Apakah ringkasan ini sudah benar?', 'Benar, Dok.', 20),
            A('rencana', 'Kami akan segera merekam jantung (EKG), memasang monitor, dan memeriksa darah. Hasilnya menentukan terapi berikutnya.', 'Baik, Dok. Tolong, Dok.', 20),
            A('empati', 'Saya mengerti Bapak cemas. Kami akan menangani ini dengan serius dan Bapak tidak sendirian.', 'Terima kasih, Dok. Saya jadi agak tenang.', 15)
          ] },
          { judul: 'Pertanyaan lain', aksi: [
            A('menikah', 'Apakah Bapak sudah menikah?', 'Sudah, Dok. Tapi apa hubungannya? Dada saya sakit sekali!', 12,
              { tidakTepat: 'Tidak relevan dengan nyeri dada akut dan memakan waktu.' }),
            A('penghasilan', 'Berapa penghasilan Bapak per bulan?', 'Hm… cukup, Dok. Tapi tolong, dada saya!', 12,
              { tidakTepat: 'Tidak relevan dengan nyeri dada akut.' }),
            A('masuk_angin', 'Tenang saja, Pak, ini pasti cuma masuk angin.', 'Oh… syukurlah kalau begitu, Dok.', 8,
              { berisiko: 'Menenangkan dengan diagnosis ringan tanpa menyingkirkan sindrom koroner akut (anchoring) berisiko bagi pasien.' })
          ] }
        ]
      }
    ],
    acara: [],
    skor: {
      A1: h.any(['salam']),
      A2: h.any(['identitas']),
      A3: h.any(['tujuan']),
      B1: h.any(['lokasi']),
      B2: h.any(['onset']),
      B3: h.any(['kualitas']),
      B4: h.any(['penjalaran']),
      B5: h.any(['pencetus']),
      B6: h.any(['pereda']),
      B7: h.any(['keparahan']),
      B8: h.count(['sesak', 'keringat', 'mual', 'berdebar', 'sinkop'], [[3, 2], [1, 1]]),
      B9: h.any(['pola']),
      C1: h.any(['disobek']),
      C2: h.any(['pleuritik']),
      C3: h.any(['emboli']),
      C4: h.any(['gerd']),
      D1: h.all(['ht', 'dm', 'dislipidemia']),
      D2: h.any(['rokok']),
      D3: h.any(['keluarga']),
      D4: h.all(['riwayat_jantung', 'obat']),
      D5: h.all(['alergi', 'perdarahan']),
      E1: h.any(['ringkas']),
      E2: h.any(['rencana']),
      E3: h.any(['empati'])
    },
    ideal: [
      'salam', 'identitas', 'tujuan',
      'lokasi', 'onset', 'kualitas', 'penjalaran', 'pencetus', 'pereda', 'keparahan', 'sesak', 'keringat', 'mual', 'pola',
      'disobek', 'pleuritik', 'emboli', 'gerd',
      'ht', 'dm', 'dislipidemia', 'rokok', 'keluarga', 'riwayat_jantung', 'obat', 'alergi', 'perdarahan',
      'ringkas', 'rencana', 'empati'
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
