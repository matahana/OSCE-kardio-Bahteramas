/* Interaksi Stasiun 10 — Sinkop: anamnesis, pemeriksaan ortostatik, dan stratifikasi risiko.
   Skrip pasien dan data mengikuti stasiun/10-sinkop.md (bagian 3). Kasus berisiko tinggi dengan pengecoh
   (tamsulosin, "kurang minum"). Klaim klinis pada alasan "tidak tepat/berisiko" BELUM diverifikasi ke teks
   guideline (wiki/guidelines-status.md). Dosis tidak dinilai. */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h;

  function ada(c, bidang, nilai) { return (c.jawab(bidang) || []).indexOf(nilai) >= 0; }

  g.OSCE.daftar('10', {
    pasien: { nama: 'Bapak Hendra', ringkas: '64 tahun, pensiunan; pingsan 2 jam lalu saat berjalan cepat', keadaan: 'Duduk tenang, sedikit malu, cenderung menganggap enteng. Sadar penuh.' },
    tandaVital: [['TD', '128/76 mmHg (berbaring)'], ['Nadi', '62 x/menit'], ['Napas', '18 x/menit'], ['SpO₂', '97% udara ruang'], ['Suhu', '36,7 °C']],
    waktu: 480,
    petunjuk: 'Pasien sudah sadar dan merasa baik; ia akan meminimalkan keluhan dan menawarkan penjelasan lain. Hasil hanya muncul bila diminta.',
    panel: [
      {
        id: 'awal', label: 'Penilaian awal', tipe: 'aksi',
        grup: [{ judul: 'Salam dan keselamatan', aksi: [
          A('salam', 'Selamat siang, Pak. Saya dokter jaga IGD. Boleh saya tanya dan periksa Bapak?', 'Siang, Dok. Silakan, saya sudah baik-baik saja kok.', 8),
          A('monitor_iv', 'Pasang monitor jantung dan akses IV.', 'Monitor terpasang: sinus 62 x/menit dengan denyut ekstra sesekali. Akses IV terpasang.', 8),
          A('glukosa', 'Periksa glukosa darah sewaktu.', 'Glukosa 112 mg/dL.', 5),
          A('pantau_sadar', 'Nyatakan: walau sudah sadar, pasien perlu pemantauan jantung kontinu.', 'Pasien: "Lho, saya kan sudah sehat, Dok?"', 6)
        ] }]
      },
      {
        id: 'anamnesis', label: 'Anamnesis', tipe: 'aksi', cari: true,
        grup: [
          { judul: 'Kejadian pingsan', aksi: [
            A('aktivitas_saat', 'Bapak sedang apa saat pingsan: berdiri lama, duduk, baru bangun, atau beraktivitas?', 'Sedang berjalan cepat membawa belanjaan di pasar; bukan berdiri lama atau baru bangun.', 8),
            A('prodromal', 'Apa yang dirasakan sebelum pingsan: berdebar, nyeri dada, sesak, pusing, berkeringat, mual?', 'Jantung berdebar kencang sekitar 10 detik, lalu gelap. Tidak pusing berputar, mual, atau berkeringat; tidak ada nyeri dada.', 8),
            A('pemicu', 'Adakah pemicu: nyeri, rasa takut, melihat darah, batuk, buang air kecil, menoleh?', 'Tidak ada.', 6),
            A('saksi', 'Tanyakan kepada anak (saksi): berapa lama, warna kulit, kejang, mengompol, dan bagaimana pulihnya.', 'Wajah pucat kebiruan; tidak kejang; tidak mengompol atau menggigit lidah; sadar dalam sekitar 1 menit, tidak bingung lama.', 12),
            A('cedera_sebelum', 'Adakah cedera akibat jatuh, dan pernah pingsan sebelumnya?', 'Lecet lutut kanan; kepala tidak terbentur. Satu kali serupa tiga bulan lalu saat naik tangga, tidak diperiksa.', 8)
          ] },
          { judul: 'Faktor risiko jantung dan obat', aksi: [
            A('riwayat_jantung', 'Adakah penyakit jantung: serangan jantung, gagal jantung, aritmia?', 'Serangan jantung enam tahun lalu, dipasang ring. Sesak bila jalan sekitar 300 meter, tidur dengan dua bantal.', 8),
            A('keluarga', 'Adakah keluarga yang meninggal mendadak atau pingsan berulang?', 'Adik laki-laki meninggal mendadak usia 44 tahun saat tidur.', 8),
            A('obat', 'Obat apa yang diminum sekarang?', 'Aspirin, atorvastatin, bisoprolol, ramipril, dan tamsulosin untuk prostat. "Mungkin gara-gara obat prostat saya, Dok, atau kurang minum."', 8),
            A('terima_prostat', 'Mungkin benar karena obat prostat; kita ganti obatnya dan Bapak minum lebih banyak.', 'Nah, betul kan, Dok. Saya pulang saja ya.', 8,
              { tidakTepat: 'Menyimpulkan penyebab dari obat sebelum hasil ortostatik dan EKG; mengalihkan dari kemungkinan sebab jantung.' })
          ] },
          { judul: 'Pembeda lain', aksi: [
            A('epilepsi', 'Adakah riwayat epilepsi atau kejang?', 'Tidak ada.', 6),
            A('dm_hipoglikemia', 'Adakah diabetes atau keluhan gula darah rendah?', 'Tidak ada diabetes.', 6),
            A('stroke_tia', 'Adakah riwayat stroke atau TIA, atau kelemahan separuh badan?', 'Tidak ada.', 6),
            A('perdarahan', 'Adakah perdarahan, BAB hitam, atau muntah darah?', 'Tidak ada.', 6),
            A('trauma_kepala', 'Apakah kepala terbentur?', 'Tidak, hanya lutut yang lecet.', 6),
            A('alkohol_rokok', 'Apakah minum alkohol atau merokok?', 'Tidak minum alkohol; berhenti merokok enam tahun lalu.', 6)
          ] }
        ]
      },
      {
        id: 'periksa', label: 'Pemeriksaan', tipe: 'aksi',
        grup: [
          { judul: 'Tekanan darah ortostatik', aksi: [
            A('ortostatik_baring', 'Minta pasien berbaring istirahat, lalu ukur TD dan nadi.', 'Berbaring: 128/76 mmHg, nadi 62.', 12),
            A('ortostatik_m1', 'Minta pasien berdiri; ukur TD dan nadi pada menit pertama.', 'Menit 1: 122/74 mmHg, nadi 68; tanpa gejala.', 8,
              { syarat: function (c) { return c.sudah('ortostatik_baring') ? null : 'Ukur TD berbaring setelah istirahat dulu.'; } }),
            A('ortostatik_m3', 'Ukur lagi TD dan nadi pada menit ketiga berdiri.', 'Menit 3: 118/72 mmHg, nadi 70; tanpa gejala.', 8,
              { syarat: function (c) { return c.sudah('ortostatik_m1') ? null : 'Ukur pada menit pertama berdiri dulu.'; } }),
            A('ortostatik_langsung', 'Minta pasien berdiri langsung dan ukur TD sekali saja.', 'TD berdiri 120/74; pasien tampak tidak nyaman. Tidak jelas apakah sudah cukup istirahat berbaring.', 8,
              { tidakTepat: 'Pengukuran ortostatik memerlukan istirahat berbaring dulu dan pengukuran pada menit 1 dan 3.' }),
            A('simpul_ortostatik', 'Simpulkan: penurunan sistolik 10 dan diastolik 4 mmHg tidak memenuhi kriteria hipotensi ortostatik sehingga tidak cukup menjelaskan sinkop.', 'Penguji mencatat kesimpulan.', 8,
              { syarat: function (c) { return c.sudah('ortostatik_m3') ? null : 'Selesaikan pengukuran menit 1 dan menit 3 dulu.'; } })
          ] },
          { judul: 'Pemeriksaan fisik', aksi: [
            A('jantung', 'Auskultasi jantung.', 'Bunyi jantung reguler dengan denyut ekstra sesekali; tanpa bising bermakna.', 8),
            A('paru_jvp', 'Periksa JVP, paru, dan edema tungkai.', 'JVP tidak meningkat; paru bersih; tanpa edema.', 8),
            A('neuro_singkat', 'Pemeriksaan neurologis singkat.', 'Kesadaran penuh; tanpa defisit fokal.', 10),
            A('abdomen_rektal', 'Pemeriksaan abdomen dan colok dubur lengkap.', 'Tidak ada kelainan.', 20,
              { tidakTepat: 'Tidak ada indikasi (tanpa tanda perdarahan); menyita waktu.' })
          ] }
        ]
      },
      {
        id: 'penunjang', label: 'Penunjang', tipe: 'aksi',
        grup: [{ judul: 'Pemeriksaan penunjang', aksi: [
          A('ekg', 'EKG 12 sadapan segera.', 'Sinus 62 x/menit; PR 180 ms; QRS 104 ms; QTc 440 ms; Q patologis V1–V4; ekstrasistol ventrikel unifokal sering (6–8 per menit). Tanpa blok AV, gelombang delta, atau pola Brugada. (Kirim interpretasi pada tab Interpretasi EKG.)', 6),
          A('lab_hb', 'Hemoglobin.', 'Hb 13,4 g/dL.', 5),
          A('lab_elektrolit', 'Elektrolit termasuk magnesium.', 'Na 138 · K 4,1 · Mg 2,0 mmol/L.', 6),
          A('lab_kreatinin', 'Kreatinin.', '1,2 mg/dL.', 5),
          A('troponin', 'Troponin.', 'Negatif.', 6),
          A('echo', 'Ekokardiografi.', 'Belum dikerjakan; catatan lama (setahun lalu): LVEF 35% setelah infark anterior.', 8),
          A('telemetri', 'Pantau telemetri berkelanjutan.', 'Telemetri dipasang di ruang pantau.', 6),
          A('ct_kepala', 'CT kepala rutin.', 'Dijadwalkan; tidak ada trauma kepala atau defisit fokal.', 15,
            { tidakTepat: 'Pencitraan otak rutin pada sinkop tanpa trauma kepala atau defisit neurologis fokal tidak bermanfaat.' }),
          A('eeg', 'EEG rutin.', 'Dijadwalkan; tidak ada gambaran kejang pada anamnesis.', 12,
            { tidakTepat: 'Tidak ada gambaran kejang; EEG rutin tidak bermanfaat pada sinkop yang dicurigai kardiak.' })
        ] }]
      },
      {
        id: 'interpretasi_ekg', label: 'Interpretasi EKG', tipe: 'form', biaya: 40,
        bidang: [
          { id: 'temuan', label: 'Temuan EKG', tipe: 'multi', opsi: [
            ['q_anterior', 'Q patologis anterior (infark lama)'],
            ['pvc', 'Ekstrasistol ventrikel sering'],
            ['elevasi_st', 'Elevasi ST akut'],
            ['blok_av', 'Blok AV derajat tinggi'],
            ['af', 'Fibrilasi atrium']] },
          { id: 'dicari', label: 'Yang dicari dan tidak ada', tipe: 'multi', opsi: [
            ['tanpa_blok_av', 'Tidak ada blok AV'], ['qt_normal', 'QTc tidak memanjang'], ['tanpa_brugada', 'Tanpa pola Brugada'], ['tanpa_preeksitasi', 'Tanpa pre-eksitasi (gelombang delta)']] }
        ]
      },
      {
        id: 'keputusan', label: 'Penilaian risiko', tipe: 'form', biaya: 60,
        bidang: [
          { id: 'risiko', label: 'Stratifikasi risiko sinkop', tipe: 'select', opsi: [
            ['tinggi', 'Risiko tinggi: sebab jantung (aritmia) paling mungkin'],
            ['rendah', 'Risiko rendah: sinkop refleks'],
            ['ortostatik', 'Hipotensi ortostatik akibat obat prostat', { tidakTepat: 'Tekanan darah ortostatik tidak memenuhi kriteria; penjelasan ini mengabaikan sebab jantung.' }]] },
          { id: 'alasan', label: 'Dasar penilaian', tipe: 'multi', opsi: [
            ['jantung_struktural', 'Penyakit jantung struktural dengan LVEF rendah'],
            ['saat_aktivitas', 'Sinkop saat aktivitas dengan palpitasi'],
            ['ekg_abnormal', 'EKG abnormal'],
            ['keluarga', 'Riwayat keluarga kematian mendadak'],
            ['prodromal_refleks', 'Prodromal khas refleks', { tidakTepat: 'Pasien tidak mengalami prodromal khas refleks.' }]] },
          { id: 'dispo', label: 'Keputusan', tipe: 'select', opsi: [
            ['rawat_tele', 'Rawat dengan telemetri dan konsultasi kardiologi/elektrofisiologi'],
            ['observasi', 'Observasi beberapa jam di IGD lalu pulang bila stabil', { tidakTepat: 'Sinkop berisiko tinggi dengan penyakit jantung struktural memerlukan evaluasi dan pemantauan di rumah sakit.' }],
            ['pulang', 'Pulang dengan kontrol poli', { berisiko: 'Memulangkan sinkop berisiko tinggi dengan LVEF rendah dapat berakibat aritmia fatal di rumah.' }]] },
          { id: 'rencana', label: 'Rencana lanjutan', tipe: 'multi', opsi: [
            ['echo', 'Ekokardiografi'], ['iskemia', 'Evaluasi iskemia'], ['gdmt', 'Optimalisasi terapi gagal jantung'], ['icd', 'Penilaian indikasi ICD atau terapi aritmia']] }
        ]
      },
      {
        id: 'komunikasi', label: 'Komunikasi', tipe: 'aksi',
        grup: [{ judul: 'Menjelaskan kepada pasien', aksi: [
          A('jelaskan_rawat', 'Saya mengerti Bapak merasa sehat. Pingsan saat aktivitas dengan jantung berdebar, ditambah riwayat serangan jantung dan keluarga yang meninggal mendadak, membuat kami curiga gangguan irama jantung. Obat prostat bisa kami tinjau, tetapi belum menjelaskan semuanya. Karena itu sebaiknya Bapak dirawat dan dipantau.',
            'Hmm… baik, Dok. Kalau begitu saya bersedia dirawat. Tolong kabari anak saya.', 25),
          A('edukasi_keselamatan', 'Selama evaluasi belum selesai, Bapak jangan mengemudi, hindari ketinggian atau mesin, dan sebaiknya ditemani.', 'Baik, Dok. Anak saya yang antar.', 12),
          A('remehkan', 'Itu tidak mungkin karena obat prostat; Bapak tidak mengerti soal ini.', 'Pasien tersinggung dan diam.', 8,
            { tidakTepat: 'Meremehkan dugaan pasien membuat pasien menutup diri; tanggapi dengan menjelaskan.' }),
          A('setuju_pulang', 'Baik, Bapak boleh pulang dan kontrol ke poli.', 'Pasien tersenyum lega dan bersiap pulang.', 8,
            { berisiko: 'Mengikuti keinginan pulang pada sinkop berisiko tinggi dapat berakibat aritmia fatal di rumah.' }),
          A('jargon', 'Bapak punya sinkop aritmogenik pada kardiomiopati iskemik dengan LVEF rendah.', 'Maksudnya apa, Dok?', 8,
            { tidakTepat: 'Istilah teknis tanpa penjelasan kepada pasien.' })
        ] }]
      }
    ],
    acara: [],
    skor: {
      A1: h.any(['salam']),
      A2: h.all(['monitor_iv', 'glukosa', 'pantau_sadar']),
      B1: h.any(['aktivitas_saat']),
      B2: h.all(['prodromal', 'pemicu']),
      B3: h.any(['saksi']),
      B4: h.all(['riwayat_jantung', 'keluarga']),
      B5: h.any(['obat']),
      B6: h.count(['epilepsi', 'dm_hipoglikemia', 'stroke_tia', 'perdarahan', 'trauma_kepala'], [[3, 1]]),
      C1: h.all(['ortostatik_baring', 'ortostatik_m1', 'ortostatik_m3']),
      C2: h.any(['simpul_ortostatik']),
      C3: h.all(['jantung', 'paru_jvp', 'neuro_singkat']),
      D1: h.any(['ekg']),
      D2: h.kustom(function (c) {
        var d = (c.jawab('dicari') || []).length;
        return ada(c, 'temuan', 'q_anterior') && ada(c, 'temuan', 'pvc') && !ada(c, 'temuan', 'elevasi_st') && !ada(c, 'temuan', 'blok_av') && !ada(c, 'temuan', 'af') && d >= 3 ? 1 : 0;
      }, ['temuan', 'dicari']),
      D3: h.count(['lab_hb', 'glukosa', 'lab_elektrolit', 'lab_kreatinin', 'troponin'], [[3, 1]]),
      D4: h.all(['echo', 'telemetri']),
      E1: h.kustom(function (c) {
        var a = c.jawab('alasan') || [];
        var benar = ['jantung_struktural', 'saat_aktivitas', 'ekg_abnormal', 'keluarga'].filter(function (x) { return a.indexOf(x) >= 0; }).length;
        return c.jawab('risiko') === 'tinggi' && benar >= 3 && a.indexOf('prodromal_refleks') < 0 ? 1 : 0;
      }, ['risiko', 'alasan']),
      E2: h.kustom(function (c) { return c.jawab('dispo') === 'rawat_tele' ? 1 : 0; }, ['dispo']),
      E3: h.kustom(function (c) { return (c.jawab('rencana') || []).length >= 3 ? 1 : 0; }, ['rencana']),
      E4: h.any(['edukasi_keselamatan']),
      F1: h.kustom(function (c) {
        return c.sudah('jelaskan_rawat') && !c.sudah('remehkan') && !c.sudah('setuju_pulang') && !c.sudah('jargon') ? 1 : 0;
      }, ['jelaskan_rawat', 'remehkan', 'setuju_pulang', 'jargon'])
    },
    ideal: [
      'salam', 'monitor_iv', 'glukosa', 'pantau_sadar',
      'aktivitas_saat', 'prodromal', 'pemicu', 'saksi', 'riwayat_jantung', 'keluarga', 'obat', 'epilepsi', 'dm_hipoglikemia', 'stroke_tia',
      'ortostatik_baring', 'ortostatik_m1', 'ortostatik_m3', 'simpul_ortostatik', 'jantung', 'paru_jvp', 'neuro_singkat',
      'ekg',
      { form: 'interpretasi_ekg', jawab: { temuan: ['q_anterior', 'pvc'], dicari: ['tanpa_blok_av', 'qt_normal', 'tanpa_brugada', 'tanpa_preeksitasi'] } },
      'lab_hb', 'lab_elektrolit', 'troponin', 'echo', 'telemetri',
      { form: 'keputusan', jawab: {
        risiko: 'tinggi', alasan: ['jantung_struktural', 'saat_aktivitas', 'ekg_abnormal', 'keluarga'], dispo: 'rawat_tele', rencana: ['echo', 'iskemia', 'gdmt', 'icd'] } },
      'edukasi_keselamatan', 'jelaskan_rawat'
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
