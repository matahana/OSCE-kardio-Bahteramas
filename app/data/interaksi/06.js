/* Interaksi Stasiun 06 — Gagal jantung akut dekompensasi.
   Skrip pasien dan data mengikuti stasiun/06-gagal-jantung-akut-dekompensasi.md (bagian 3). */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h;

  g.OSCE.daftar('06', {
    pasien: { nama: 'Ibu Hartini', ringkas: '68 tahun, riwayat gagal jantung', keadaan: 'Duduk membungkuk ke depan, sesak, berbicara dalam kalimat pendek.' },
    tandaVital: [['TD', '138/84 mmHg'], ['Nadi', '104 x/menit, reguler'], ['Napas', '28 x/menit'], ['SpO₂', '88% udara ruang'], ['Suhu', '36,9 °C']],
    waktu: 480,
    petunjuk: 'Pasien tidak stabil: nilai dan tangani bersamaan. Hasil pemeriksaan hanya muncul bila diminta.',
    panel: [
      {
        id: 'awal', label: 'Penilaian awal', tipe: 'aksi',
        grup: [{ judul: 'Penilaian awal dan stabilisasi', aksi: [
          A('salam', 'Selamat siang, Bu. Saya dokter jaga IGD. Kami akan menolong Ibu sekarang.', 'Tolong, Dok… saya sesak sekali.', 8),
          A('nilai_distres', 'Nilai distres napas: laju napas, SpO₂, kemampuan berbicara, otot bantu napas.', 'Napas 28 x/menit, SpO₂ 88%, bicara hanya kalimat pendek, otot bantu napas aktif.', 6),
          A('duduk', 'Posisikan pasien duduk tegak.', 'Pasien duduk tegak dengan bantal di punggung; sesak sedikit berkurang.', 5),
          A('monitor', 'Pasang monitor (EKG, SpO₂, tekanan darah).', 'Monitor terpasang: nadi 104, SpO₂ 88%.', 8),
          A('iv', 'Pasang akses IV dan ambil darah untuk laboratorium.', 'Akses IV terpasang; sampel darah dikirim.', 10),
          A('o2', 'Beri oksigen karena SpO₂ < 90%.', 'Oksigen 4 L/menit; SpO₂ naik menjadi 92%, napas masih 26 x/menit.', 8),
          A('paralel', 'Nyatakan: pasien tidak stabil, penilaian dan terapi dilakukan bersamaan.', 'Tim mengerti. Perawat siap membantu.', 5),
          A('baring', 'Baringkan pasien datar untuk pemeriksaan.', 'Saya tidak bisa berbaring, Dok… sesak!', 5,
            { tidakTepat: 'Posisi berbaring memperberat ortopnea pada kongesti paru.' })
        ] }]
      },
      {
        id: 'anamnesis', label: 'Anamnesis', tipe: 'aksi', cari: true,
        grup: [{ judul: 'Anamnesis terfokus', aksi: [
          A('ortopnea', 'Apakah sesak bertambah saat berbaring? Berapa bantal untuk tidur? Sering terbangun malam karena sesak?', 'Tiga bantal, Dok… terbangun malam karena sesak.', 10),
          A('aktivitas', 'Seberapa jauh Ibu bisa berjalan sekarang?', 'Ke kamar mandi saja sudah sesak.', 8),
          A('edema', 'Apakah kaki bengkak?', 'Iya, sejak seminggu.', 8),
          A('bb', 'Apakah berat badan naik?', 'Naik sekitar empat kilo.', 6),
          A('urin', 'Apakah buang air kecil berkurang?', 'Iya, makin sedikit.', 6),
          A('riwayat_gj', 'Sejak kapan ada penyakit jantung, dan apa penyebabnya?', 'Tiga tahun, "jantung lemah". Dulu pernah serangan jantung.', 10),
          A('obat', 'Obat apa yang diminum sekarang?', 'Furosemid, bisoprolol, ramipril, spironolakton, dan metformin.', 8),
          A('kepatuhan', 'Apakah obat diminum teratur? Adakah yang habis?', 'Furosemidnya habis seminggu lalu, belum sempat kontrol.', 8),
          A('garam', 'Bagaimana asupan garam dan cairan akhir-akhir ini?', 'Minggu lalu pesta keluarga, banyak makan asin dan santan.', 8),
          A('nsaid', 'Apakah minum obat pereda nyeri seperti ibuprofen?', 'Iya, beberapa hari karena nyeri lutut.', 8),
          A('nyeri_dada', 'Apakah ada nyeri dada?', 'Tidak ada.', 6),
          A('berdebar', 'Apakah jantung berdebar?', 'Tidak.', 6),
          A('infeksi', 'Apakah ada demam atau batuk berdahak?', 'Tidak demam, tidak batuk berdahak.', 6),
          A('alergi', 'Apakah ada alergi obat?', 'Tidak ada.', 6),
          A('komorbid', 'Apakah ada penyakit lain: diabetes, penyakit ginjal, PPOK?', 'Diabetes saja. Tidak ada PPOK.', 8),
          A('pekerjaan', 'Ibu bekerja sebagai apa dulunya?', 'Guru, Dok… tapi saya sesak!', 8,
            { tidakTepat: 'Tidak relevan pada pasien yang tidak stabil.' })
        ] }]
      },
      {
        id: 'periksa', label: 'Pemeriksaan', tipe: 'aksi',
        grup: [{ judul: 'Pemeriksaan fisik (hasil diberikan bila diminta)', aksi: [
          A('jvp', 'Periksa JVP.', 'JVP meningkat, ± 8 cm H₂O di atas sudut sternum pada posisi 45°.', 12),
          A('paru', 'Auskultasi paru.', 'Ronki basah halus bibasal sampai 2/3 bawah lapang paru, tanpa mengi.', 15),
          A('jantung', 'Auskultasi jantung.', 'S1–S2 reguler, S3 gallop, bising pansistolik 2/6 di apeks.', 15),
          A('abdomen', 'Periksa abdomen.', 'Hepar teraba 2 jari, nyeri tekan ringan; tidak ada asites jelas.', 12),
          A('edema_tungkai', 'Periksa edema tungkai.', 'Edema pitting 2+ sampai lutut, simetris.', 10),
          A('perfusi', 'Nilai perfusi perifer: akral dan waktu isi kapiler.', 'Akral hangat, waktu isi kapiler < 2 detik.', 10),
          A('neuro', 'Lakukan pemeriksaan neurologis lengkap.', 'Kesadaran compos mentis; tidak ada defisit fokal.', 20,
            { tidakTepat: 'Tidak ada indikasi; memakan waktu pada pasien tidak stabil.' })
        ] }]
      },
      {
        id: 'penunjang', label: 'Penunjang', tipe: 'aksi',
        grup: [{ judul: 'Pemeriksaan penunjang', aksi: [
          A('ekg', 'EKG 12 sadapan.', 'Sinus takikardia ± 104 x/menit; Q patologis V1–V3; tidak ada elevasi ST akut.', 6),
          A('troponin', 'Troponin.', 'Sedikit meningkat dan tidak berubah pada pengulangan: cedera miokard kronik, bukan infark akut.', 5),
          A('bnp', 'NT-proBNP / BNP.', 'NT-proBNP 6.200 pg/mL.', 5),
          A('ginjal', 'Kreatinin dan elektrolit.', 'Kreatinin 1,5 mg/dL (baseline 1,2); Na 133 mmol/L; K 4,1 mmol/L.', 5),
          A('hb', 'Hemoglobin dan darah rutin.', 'Hb 11,8 g/dL.', 5),
          A('foto_toraks', 'Foto toraks.', 'Kardiomegali, kongesti paru, efusi pleura bilateral minimal.', 6),
          A('echo', 'Ekokardiografi (segera atau pada rawat inap).', 'Akan dikerjakan di ruang rawat.', 6),
          A('ct_angio', 'CT angiografi koroner.', 'Belum tersedia; pasien tidak stabil untuk dipindahkan.', 10,
            { tidakTepat: 'Tidak indikasi pada pasien tidak stabil dan menunda terapi.' }),
          A('kultur', 'Kultur darah dan antibiotik empiris.', 'Tidak ada tanda infeksi pada anamnesis maupun pemeriksaan.', 8,
            { tidakTepat: 'Tidak ada tanda infeksi.' })
        ] }]
      },
      {
        id: 'terapi', label: 'Tatalaksana', tipe: 'aksi',
        grup: [
          { judul: 'Diuretik', aksi: [
            A('furosemid_80', 'Furosemid 80 mg IV bolus.', 'Furosemid 80 mg IV diberikan. Urin mulai keluar.', 8, { eksklusif: 'furosemid' }),
            A('furosemid_40', 'Furosemid 40 mg IV bolus (setara dosis oral harian).', 'Furosemid 40 mg IV diberikan. Urin mulai keluar.', 8, { eksklusif: 'furosemid' }),
            A('furosemid_20', 'Furosemid 20 mg IV bolus.', 'Furosemid 20 mg IV diberikan. Diuresis kurang.', 8,
              { eksklusif: 'furosemid', tidakTepat: 'Di bawah dosis oral harian; respons diuretik tidak memadai.' }),
            A('furosemid_po', 'Furosemid 40 mg per oral.', 'Obat oral diberikan; pasien sulit menelan karena sesak.', 8,
              { eksklusif: 'furosemid', tidakTepat: 'Jalur oral tidak memadai pada kongesti berat.' })
          ] },
          { judul: 'Dukungan napas dan vasodilator', aksi: [
            A('niv', 'Pasang NIV (CPAP/BiPAP) karena distres menetap.', 'CPAP terpasang; napas turun menjadi 22 x/menit, SpO₂ 95%.', 10),
            A('nitrat', 'Nitrat (sublingual/IV); tekanan darah sistolik 138 mmHg, adekuat.', 'Nitrat diberikan; sesak berkurang, TD 124/76.', 8)
          ] },
          { judul: 'Pemantauan dan tindak lanjut', aksi: [
            A('kateter', 'Pasang kateter urin dan pantau diuresis per jam.', 'Kateter terpasang; urin 150 mL pada jam pertama.', 8),
            A('balans', 'Catat balans cairan dan timbang berat badan.', 'Balans cairan dicatat; target negatif.', 5),
            A('elektrolit_ulang', 'Pantau elektrolit dan kreatinin berkala.', 'Jadwal ulang elektrolit dan kreatinin ditetapkan.', 5),
            A('ttv_berkala', 'Pantau tanda vital berkala.', 'Tanda vital setiap 15 menit.', 5),
            A('stop_nsaid', 'Hentikan ibuprofen dan lanjutkan terapi gagal jantung sesuai kondisi.', 'NSAID dihentikan; terapi rumatan dievaluasi ulang.', 5),
            A('rawat', 'Rawat di HCU/ruang rawat jantung.', 'Pasien diatur untuk rawat di HCU.', 8),
            A('konsul', 'Konsultasi kardiologi.', 'Kardiolog menyetujui rencana dan akan menilai.', 8)
          ] },
          { judul: 'Pilihan lain', aksi: [
            A('morfin', 'Morfin IV untuk mengurangi sesak.', 'Pasien tampak mengantuk, napas melambat.', 8,
              { tidakTepat: 'Opioid tidak direkomendasikan secara rutin pada gagal jantung akut.' }),
            A('inotrop', 'Mulai inotrop IV.', 'Inotrop disiapkan.', 8,
              { tidakTepat: 'Profil hangat–basah; inotrop tidak diindikasikan.' }),
            A('cairan_bolus', 'Berikan bolus NaCl 0,9% 500 mL.', 'Setelah cairan masuk, sesak memburuk, ronki meluas, SpO₂ turun.', 8,
              { berisiko: 'Bolus cairan memperberat kongesti dan edema paru.' }),
            A('beta_blocker_iv', 'Beri penghambat beta IV untuk menurunkan nadi.', 'Tekanan darah turun, pasien tampak lebih lemas.', 8,
              { berisiko: 'Penghambat beta IV pada dekompensasi akut dapat memperburuk curah jantung.' }),
            A('ibuprofen', 'Beri ibuprofen untuk nyeri lutut.', 'Obat diberikan.', 6,
              { berisiko: 'NSAID memperburuk retensi cairan dan fungsi ginjal.' })
          ] }
        ]
      },
      {
        id: 'komunikasi', label: 'Komunikasi', tipe: 'aksi',
        grup: [{ judul: 'Menjelaskan kepada pasien dan keluarga', aksi: [
          A('jelaskan', 'Jelaskan bahwa jantung Ibu sedang kewalahan sehingga cairan menumpuk di paru dan kaki; kami memberi obat pengeluar cairan dan bantuan napas, dan Ibu perlu dirawat.', 'Baik, Dok. Jadi ibu harus dirawat ya? Keluarga bertanya: "Apakah ibu akan baik-baik saja?"', 25),
          A('edukasi', 'Edukasi: minum obat teratur, batasi garam, timbang berat badan tiap pagi, hindari obat pereda nyeri golongan NSAID, dan kenali tanda bahaya.', 'Baik, Dok. Saya akan lebih patuh.', 25),
          A('jargon', 'Ibu mengalami dekompensasio kordis dengan edema pulmo akut dan efusi pleura.', 'Maksudnya apa, Dok? Saya tidak mengerti…', 15,
            { tidakTepat: 'Memakai istilah teknis tanpa penjelasan kepada pasien/keluarga.' })
        ] }]
      }
    ],
    acara: [],
    skor: {
      A1: h.any(['salam']),
      A2: h.all(['nilai_distres', 'duduk']),
      A3: h.all(['monitor', 'iv', 'o2']),
      A4: h.any(['paralel']),
      B1: h.all(['ortopnea', 'aktivitas']),
      B2: h.count(['edema', 'bb', 'urin'], [[2, 1]]),
      B3: h.all(['riwayat_gj', 'obat']),
      B4: h.all(['kepatuhan', 'garam']),
      B5: h.count(['nsaid', 'nyeri_dada', 'berdebar', 'infeksi'], [[3, 1]]),
      B6: h.all(['alergi', 'komorbid']),
      C1: h.any(['jvp']),
      C2: h.any(['paru']),
      C3: h.any(['jantung']),
      C4: h.all(['edema_tungkai', 'perfusi']),
      D1: h.any(['ekg']),
      D2: h.count(['troponin', 'bnp', 'ginjal', 'hb'], [[3, 1]]),
      D3: h.any(['foto_toraks']),
      D4: h.any(['echo']),
      E1: h.any(['furosemid_40', 'furosemid_80']),
      E2: h.all(['o2', 'niv']),
      E3: h.any(['nitrat']),
      E4: h.count(['kateter', 'balans', 'elektrolit_ulang', 'ttv_berkala'], [[3, 1]]),
      E5: h.count(['stop_nsaid', 'rawat', 'konsul'], [[2, 1]]),
      F1: h.any(['jelaskan']),
      F2: h.any(['edukasi'])
    },
    ideal: [
      'salam', 'nilai_distres', 'duduk', 'monitor', 'iv', 'o2', 'paralel',
      'ortopnea', 'aktivitas', 'edema', 'bb', 'riwayat_gj', 'obat', 'kepatuhan', 'garam', 'nsaid', 'nyeri_dada', 'infeksi', 'alergi', 'komorbid',
      'jvp', 'paru', 'jantung', 'edema_tungkai', 'perfusi',
      'ekg', 'troponin', 'bnp', 'ginjal', 'foto_toraks', 'echo',
      'furosemid_80', 'niv', 'nitrat', 'kateter', 'balans', 'ttv_berkala', 'stop_nsaid', 'rawat', 'konsul',
      'jelaskan', 'edukasi'
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
