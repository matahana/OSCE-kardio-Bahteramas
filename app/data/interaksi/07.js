/* Interaksi Stasiun 07 — Edukasi pasca-infark miokard dan pencegahan sekunder.
   Stasiun komunikasi: tiap aksi adalah kalimat edukasi kandidat; respons mengikuti skrip SP di
   stasiun/07-edukasi-pasca-infark.md (bagian 3). Dosis tidak dinilai.
   Klaim klinis pada alasan "tidak tepat/berisiko" belum diverifikasi (wiki/guidelines-status.md). */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h;

  // Butir yang dibatalkan oleh pernyataan yang bertentangan (mis. menyuruh berhenti obat sendiri).
  function tanpa(ids, batal) {
    return h.kustom(function (c) { return c.salahSatu(ids) && !c.salahSatu(batal) ? 1 : 0; }, ids.concat(batal));
  }

  g.OSCE.daftar('07', {
    pasien: { nama: 'Bapak Arifin', ringkas: '55 tahun, sopir angkot; hari ke-3 STEMI anterior, ring di LAD proksimal', keadaan: 'Duduk di tempat tidur, tampak lelah dan cemas; bicara santai tetapi menyimpan rasa takut.' },
    tandaVital: [['TD', '126/78 mmHg'], ['Nadi', '68 x/menit'], ['LVEF', '45%'], ['LDL', '142 mg/dL']],
    waktu: 480,
    petunjuk: 'Edukasi sebelum pulang; anamnesis ulang dan pemeriksaan fisik tidak perlu. Pilih apa yang Anda katakan: urutan, kata-kata, dan prioritas memengaruhi hasil. Pasien memakai bahasa awam dan bisa defensif bila dihakimi.',
    panel: [
      {
        id: 'membuka', label: 'Membuka', tipe: 'aksi',
        grup: [{ judul: 'Memulai dan menggali', aksi: [
          A('salam', 'Selamat pagi, Pak Arifin. Saya dokter yang akan menjelaskan persiapan pulang Bapak. Boleh kita bicara sekitar sepuluh menit?', 'Pagi, Dok. Silakan.', 10),
          A('gali_paham', 'Sebelum saya jelaskan, apa yang Bapak pahami tentang penyakit jantung Bapak sekarang?', 'Kata dokter jaga, jantung saya tersumbat lalu dipasang ring. Saya kurang paham.', 12),
          A('gali_khawatir', 'Apa yang paling Bapak khawatirkan, dan apa harapan Bapak setelah pulang?', 'Saya takut mati mendadak di rumah, Dok. Anak saya masih sekolah. Saya juga mau cepat kerja lagi.', 12),
          A('agenda', 'Hari ini kita bahas penyakitnya, obat, kebiasaan sehari-hari, dan tanda bahaya. Ada yang ingin Bapak dahulukan?', 'Soal obat dulu, Dok, sama kapan saya bisa narik lagi.', 10),
          A('langsung_ceramah', 'Baik, saya jelaskan semuanya dari awal sampai akhir sekaligus tanpa berhenti.', 'Pasien mengangguk, tetapi tampak kewalahan dan berhenti menatap Anda.', 20,
            { tidakTepat: 'Ceramah satu arah tanpa jeda dan tanpa menggali pemahaman pasien.' })
        ] }]
      },
      {
        id: 'penyakit', label: 'Penyakit', tipe: 'aksi',
        grup: [{ judul: 'Menjelaskan serangan jantung', aksi: [
          A('b_awam', 'Serangan jantung terjadi karena pembuluh darah jantung tersumbat sehingga otot jantung kekurangan darah. Ring dipasang untuk membuka sumbatan itu.',
            'Oh begitu… jadi ring itu membuka pembuluhnya. Jadi sekarang saya sudah sembuh, Dok? Kata teman, kalau sudah dipasang ring itu beres.', 14),
          A('b_belum_sembuh', 'Ring membuka sumbatan, tetapi penyebab dasarnya, yaitu penyempitan pembuluh dan faktor risiko seperti rokok, tekanan darah, dan kolesterol, masih ada. Jadi pencegahan harus berlanjut seumur hidup.',
            'Jadi ring bukan berarti sembuh ya, Dok. Saya paham.', 14),
          A('b_prognosis', 'Kebanyakan pasien dapat kembali beraktivitas dengan baik bila obat teratur dan faktor risiko dikendalikan. Risikonya dapat ditekan, walaupun tidak nol.',
            'Syukurlah kalau saya masih bisa kerja lagi.', 14),
          A('b_sembuh', 'Dengan ring ini Bapak sudah sembuh total, tidak perlu khawatir lagi.', 'Wah, syukur. Berarti obat dan rokok tidak masalah lagi ya, Dok?', 8,
            { tidakTepat: 'Ring tidak menyembuhkan penyakit dasar; pesan ini mendorong berhenti obat dan melanjutkan merokok.' }),
          A('b_jargon', 'Bapak mengalami STEMI anterior dengan oklusi LAD proksimal yang ditangani PCI dengan DES.', 'Maksudnya apa, Dok? Saya tidak mengerti…', 8,
            { tidakTepat: 'Istilah teknis tanpa penjelasan kepada pasien.' })
        ] }]
      },
      {
        id: 'obat', label: 'Obat', tipe: 'aksi',
        grup: [
          { judul: 'Menjelaskan obat pulang', aksi: [
            A('c_antiplatelet', 'Aspirin dan ticagrelor melindungi ring agar tidak tersumbat lagi. Obat ini tidak boleh dihentikan sendiri walau sudah tidak ada keluhan; bicarakan dulu dengan dokter.',
              'Oh, tidak boleh berhenti sendiri ya, Dok. Kalau sudah tidak sakit pun? Berapa lama?', 16),
            A('c_statin', 'Statin menurunkan kolesterol dan menstabilkan plak di pembuluh. Diminum rutin tiap malam, dan kadar LDL akan kita pantau terhadap target.', 'LDL saya tinggi ya, Dok?', 14),
            A('c_bb_acei', 'Penyekat beta dan penghambat ACE melindungi jantung dan menurunkan tekanan darah.', 'Baik, Dok.', 12),
            A('c_efek', 'Laporkan bila ada perdarahan atau BAB hitam, sesak ringan (dari ticagrelor), batuk kering (dari obat ACE), atau pusing dan lemas.', 'Oke, Dok, saya catat.', 14),
            A('c_praktis', 'Minum teratur sesuai jadwal walau tanpa keluhan, bawa daftar obat saat kontrol, dan jangan minum obat antinyeri seperti ibuprofen tanpa bertanya.',
              'Obat ini mahal tidak, Dok? Ditanggung BPJS?', 14),
            A('c_nitrat', 'Bila nyeri dada, duduk dulu lalu letakkan tablet nitrat di bawah lidah.', 'Di bawah lidah ya, Dok.', 12),
            A('c_biaya_jujur', 'Saya belum tahu pasti penjaminannya; petugas farmasi akan memastikan sebelum Bapak pulang, dan jangan berhenti minum obat karena biaya.', 'Baik, Dok. Terima kasih sudah jujur.', 10)
          ] },
          { judul: 'Pilihan lain', aksi: [
            A('c_boleh_berhenti', 'Kalau sudah tidak ada keluhan, obatnya boleh dikurangi atau dihentikan sendiri.', 'Wah, bagus. Nanti saya hentikan kalau saya merasa sehat.', 8,
              { berisiko: 'Menghentikan antiplatelet ganda sendiri meningkatkan risiko trombosis stent dan infark ulang.' }),
            A('c_biaya', 'Obat ini ditanggung BPJS, Bapak jangan khawatir.', 'Oh, syukurlah.', 8,
              { tidakTepat: 'Menjanjikan penjaminan yang belum diketahui.' }),
            A('c_nsaid_ok', 'Kalau pegal, ibuprofen boleh diminum seperlunya.', 'Baik, Dok.', 8,
              { tidakTepat: 'NSAID bersama antiplatelet ganda meningkatkan risiko perdarahan dan memengaruhi tekanan darah dan ginjal.' })
          ] }
        ]
      },
      {
        id: 'gaya', label: 'Gaya hidup', tipe: 'aksi',
        grup: [{ judul: 'Kebiasaan dan rehabilitasi', aksi: [
          A('d_rokok', 'Berhenti merokok adalah langkah terpenting untuk jantung Bapak. Saya tidak menyalahkan; kami bisa membantu dengan konseling, terapi pengganti nikotin atau obat, dan program berhenti merokok.',
            'Dok, saya boleh merokok sedikit saja? Kalau tidak merokok saya stres.', 16),
          A('d_rokok_tegas', 'Merokok sedikit pun tetap berbahaya bagi pembuluh jantung. Mari kita susun rencana berhenti dan bantuannya bersama.', 'Hmm… baik, Dok. Saya mau coba, tapi tolong dibantu.', 12),
          A('d_diet', 'Kurangi garam, gorengan, santan, dan lemak jenuh; perbanyak sayur, buah, dan ikan; kendalikan berat badan.', 'Susah, Dok, saya sering makan di warung. Tapi saya coba.', 12),
          A('d_aktivitas', 'Mulailah aktivitas fisik secara bertahap, dan kami akan merujuk Bapak ke program rehabilitasi jantung.', 'Rehabilitasi itu apa, Dok? Oh, latihan di bawah pengawasan ya. Boleh.', 14),
          A('d_faktor', 'Tekanan darah, kolesterol, gula darah, dan berat badan akan kita pantau berkala dan dijaga pada target.', 'Baik, Dok.', 12),
          A('d_mood', 'Rasa cemas atau sedih setelah serangan jantung itu wajar dan bisa dibantu. Bagaimana tidur dan suasana hati Bapak?', 'Saya susah tidur, Dok, sering memikirkan kematian.', 12),
          A('d_kembali', 'Soal kembali narik angkot dan hubungan suami-istri: dilakukan bertahap dan kita evaluasi saat kontrol pertama. Aktivitas seksual umumnya aman bila Bapak sudah mampu aktivitas sedang tanpa gejala.',
            'Kapan saya boleh narik lagi? Dan… hubungan suami-istri, apa boleh? (malu-malu)', 16),
          A('d_rokok_boleh', 'Merokok sedikit saja tidak apa-apa, asal jangan banyak.', 'Wah, bagus kalau begitu.', 8,
            { berisiko: 'Merokok setelah infark meningkatkan risiko kejadian ulang; tidak ada batas aman.' }),
          A('d_rokok_marah', 'Bapak sudah tahu rokok itu bahaya, kenapa masih merokok?', 'Saya sudah tahu, Dok. (pasien menjadi defensif)', 8,
            { tidakTepat: 'Menghakimi pasien perokok membuatnya defensif dan menutup percakapan.' }),
          A('d_kembali_angka', 'Bapak boleh narik lagi minggu depan, dan hubungan suami-istri boleh mulai hari ini.', 'Oh, secepat itu ya, Dok?', 8,
            { tidakTepat: 'Memberi angka hari tanpa dasar dan tanpa evaluasi saat kontrol.' })
        ] }]
      },
      {
        id: 'tanda', label: 'Tanda bahaya', tipe: 'aksi',
        grup: [{ judul: 'Keselamatan dan tindak lanjut', aksi: [
          A('e_bahaya', 'Bila nyeri dada, sesak berat, atau pingsan: segera panggil ambulans atau ke IGD, jangan menyetir sendiri, dan jangan menunggu lama di rumah.', 'Baik, Dok. Jadi langsung ke IGD, tidak menunggu.', 14),
          A('e_kontrol', 'Bapak kontrol ke poli jantung pada minggu pertama setelah pulang; kita akan memeriksa EKG, laboratorium, dan ekokardiografi.', 'Baik, Dok, di poli jantung ya.', 12),
          A('e_keluarga', 'Ajak istri atau anak Bapak ikut kontrol supaya mereka juga memahami obat dan tanda bahaya.', 'Nanti istri saya ajak, Dok.', 10),
          A('e_tunggu', 'Kalau nyeri dada, tunggu saja dulu di rumah dan istirahat; bila lebih dari setengah hari baru ke IGD.', 'Oh, begitu ya, Dok.', 8,
            { berisiko: 'Menunda mencari pertolongan pada nyeri dada setelah infark dapat berakibat fatal.' })
        ] }]
      },
      {
        id: 'penutup', label: 'Penutup', tipe: 'aksi',
        grup: [{ judul: 'Empati dan pengecekan pemahaman', aksi: [
          A('f_potongan', 'Saya jelaskan bertahap dan berhenti sejenak setelah tiap bagian. Ada yang belum jelas sampai di sini?', 'Sejauh ini jelas, Dok.', 8),
          A('f_empati', 'Wajar Bapak takut mati mendadak; setelah serangan jantung banyak orang merasa begitu. Kita siapkan rencana supaya Bapak aman di rumah.', 'Terima kasih, Dok. Saya jadi lebih tenang.', 12),
          A('f_teachback', 'Supaya yakin kita sama-sama paham, coba Bapak ulangi: obat apa yang tidak boleh dihentikan, dan apa yang dilakukan bila nyeri dada?',
            'Aspirin dan ticagrelor tidak boleh berhenti sendiri. Kalau nyeri dada, saya duduk, nitrat di bawah lidah, dan langsung ke IGD.', 16),
          A('f_ringkas', 'Ringkasnya: ring membuka sumbatan tetapi pencegahan berlanjut; obat jangan dihentikan sendiri; berhenti merokok; rehabilitasi; kontrol minggu pertama; nyeri dada segera ke IGD. Ada pertanyaan lain?',
            'Tidak ada lagi, Dok. Terima kasih banyak.', 12)
        ] }]
      }
    ],
    acara: [],
    skor: {
      A1: h.any(['salam']),
      A2: h.any(['gali_paham']),
      A3: h.any(['gali_khawatir']),
      A4: h.any(['agenda']),
      B1: h.any(['b_awam']),
      B2: tanpa(['b_belum_sembuh'], ['b_sembuh']),
      B3: h.any(['b_prognosis']),
      C1: tanpa(['c_antiplatelet'], ['c_boleh_berhenti']),
      C2: h.any(['c_statin']),
      C3: h.any(['c_bb_acei']),
      C4: h.any(['c_efek']),
      C5: tanpa(['c_praktis'], ['c_nsaid_ok']),
      C6: h.any(['c_nitrat']),
      D1: h.kustom(function (c) {
        return c.sudah('d_rokok') && c.sudah('d_rokok_tegas') && !c.sudah('d_rokok_boleh') && !c.sudah('d_rokok_marah') ? 1 : 0;
      }, ['d_rokok', 'd_rokok_tegas', 'd_rokok_boleh', 'd_rokok_marah']),
      D2: h.any(['d_diet']),
      D3: h.any(['d_aktivitas']),
      D4: h.any(['d_faktor']),
      D5: h.any(['d_mood']),
      D6: tanpa(['d_kembali'], ['d_kembali_angka']),
      E1: tanpa(['e_bahaya'], ['e_tunggu']),
      E2: h.any(['e_kontrol']),
      E3: h.any(['e_keluarga']),
      F1: h.kustom(function (c) {
        return c.sudah('f_potongan') && !c.sudah('b_jargon') && !c.sudah('langsung_ceramah') ? 1 : 0;
      }, ['f_potongan', 'b_jargon', 'langsung_ceramah']),
      F2: h.kustom(function (c) { return c.sudah('f_empati') && !c.sudah('c_biaya') ? 1 : 0; }, ['f_empati', 'c_biaya']),
      F3: h.all(['f_teachback', 'f_ringkas'])
    },
    ideal: [
      'salam', 'gali_paham', 'gali_khawatir', 'agenda',
      'b_awam', 'b_belum_sembuh', 'b_prognosis',
      'c_antiplatelet', 'c_statin', 'c_bb_acei', 'c_efek', 'c_praktis', 'c_nitrat',
      'd_rokok', 'd_rokok_tegas', 'd_diet', 'd_aktivitas', 'd_faktor', 'd_mood', 'd_kembali',
      'e_bahaya', 'e_kontrol', 'e_keluarga',
      'f_potongan', 'f_empati', 'f_teachback', 'f_ringkas'
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
