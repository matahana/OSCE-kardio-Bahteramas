/* Interaksi Stasiun 13 — Gagal jantung kronik HFrEF: optimalisasi terapi dan edukasi.
   Skrip pasien dan data mengikuti stasiun/13-gagal-jantung-kronik-optimalisasi-terapi.md (bagian 3). Pasien stabil,
   LVEF 30%, hanya dua golongan dasar pada dosis awal; K 4,5 dan eGFR ± 75 memenuhi syarat MRA. Dosis tidak dinilai.
   Seluruh angka syarat dan klaim "tidak tepat/berisiko" (MRA tanpa kalium/eGFR, ganti ACEi→ARNI tanpa jeda,
   mengubah semua sekaligus, NSAID, penyekat kanal kalsium non-dihidropiridin, diuretik rutin) BELUM dicocokkan
   dengan teks guideline (wiki/guidelines-status.md). */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h;

  function ada(c, bidang, nilai) { return (c.jawab(bidang) || []).indexOf(nilai) >= 0; }
  function rencana(c, nilai) { return ada(c, 'langkah_hari_ini', nilai) || ada(c, 'rencana_berikutnya', nilai); }
  function setelah(id, pesan) { return function (c) { return c.sudah(id) ? null : pesan; }; }

  var DASAR = [
    ['sglt2i', 'Tambah SGLT2i'],
    ['mra_syarat', 'Tambah antagonis mineralokortikoid, setelah kalium dan eGFR diperiksa dan memenuhi syarat'],
    ['bb_titrasi', 'Naikkan penyekat beta (bisoprolol) bertahap menuju dosis target'],
    ['arni_jeda', 'Ganti ramipril ke ARNI: dengan jeda sebelum mulai, tanpa riwayat angioedema, dan TD sistolik cukup']
  ];

  g.OSCE.daftar('13', {
    pasien: { nama: 'Bapak Darmin', ringkas: '58 tahun, pedagang; HFrEF akibat kardiomiopati iskemik (infark anterior 3 tahun lalu, LVEF 30%), kontrol rutin', keadaan: 'Duduk tenang, agak cemas soal "obat tambahan". Tidak sesak berat hari ini.' },
    tandaVital: [],
    waktu: 480,
    petunjuk: 'Data pemeriksaan dan penunjang hanya muncul bila diminta. Kirim keputusan terapi pada tab Keputusan, lalu edukasi pasien. Dosis tidak dinilai.',
    panel: [
      {
        id: 'anamnesis', label: '1. Anamnesis', tipe: 'aksi', cari: true,
        grup: [
          { judul: 'Pembuka', aksi: [
            A('salam', 'Selamat siang, Pak Darmin. Saya dokter yang menangani hari ini. Boleh saya tanya soal keluhan dan obat Bapak?', 'Siang, Dok. Silakan.', 10)
          ] },
          { judul: 'Gejala dan kelas fungsional', aksi: [
            A('gejala_aktivitas', 'Sesak muncul pada aktivitas apa? Sejauh apa Bapak bisa berjalan?', 'Sesak bila jalan sekitar 200 meter atau naik satu lantai.', 8),
            A('ortopnea_pnd', 'Tidur memakai berapa bantal? Pernah terbangun karena sesak?', 'Dua bantal; tidak pernah terbangun karena sesak.', 8),
            A('edema_bb', 'Bagaimana bengkak kaki dan berat badan belakangan?', 'Bengkak kaki sudah hilang; berat badan stabil sekitar 70 kg.', 8),
            A('pusing_td', 'Adakah pusing? Berapa tekanan darah di rumah?', 'Tidak pusing. TD rumah sistolik 110–120.', 6)
          ] },
          { judul: 'Obat, kepatuhan, dan efek samping', aksi: [
            A('obat_sekarang', 'Obat apa yang diminum sekarang dan sudah berapa lama dosisnya sama?', 'Aspirin, atorvastatin, ramipril 2,5 mg, bisoprolol 2,5 mg (dosis sama selama 8 bulan), furosemid 20 mg bila bengkak (jarang), metformin.', 8),
            A('kepatuhan', 'Apakah ada dosis yang terlewat?', '"Kadang lupa dosis sore karena sibuk jualan."', 8),
            A('efek_samping', 'Adakah batuk kering, pusing, atau efek samping lain?', 'Tidak batuk, tidak pusing.', 6),
            A('nsaid_jamu', 'Obat lain: pereda nyeri, jamu, atau suplemen?', 'Ibuprofen sesekali untuk pegal; jamu pegal linu.', 8),
            A('alergi_angioedema', 'Alergi obat? Pernah bengkak di wajah atau bibir?', 'Tidak ada alergi; tidak pernah bengkak di wajah atau bibir.', 6)
          ] },
          { judul: 'Penyebab, komorbid, dan latar', aksi: [
            A('penyebab_riwayat', 'Apa penyebab gagal jantungnya dan tindakan sebelumnya?', 'Infark anterior 3 tahun lalu, sudah dipasang ring.', 6),
            A('komorbid_ginjal', 'Adakah diabetes atau penyakit ginjal?', 'Diabetes tipe 2. Tidak ada riwayat penyakit ginjal.', 6),
            A('diet', 'Bagaimana pola makan sehari-hari?', 'Makan di warung; sering asin dan santan.', 6),
            A('kekhawatiran', 'Apa yang paling Bapak khawatirkan tentang pengobatan?', '"Obatnya sudah banyak, Dok. Kenapa tidak diganti yang lebih kuat? Saya takut ginjal rusak. Obat baru itu ditanggung BPJS?"', 8)
          ] }
        ]
      },
      {
        id: 'periksa', label: '2. Pemeriksaan & data', tipe: 'aksi',
        grup: [
          { judul: 'Pemeriksaan fisik', aksi: [
            A('tanda_vital', 'Ukur TD berbaring, nadi, SpO₂, dan berat badan.', 'TD 118/72 mmHg berbaring; nadi 72 teratur; SpO₂ 97%; BB 70 kg (sama dengan kunjungan lalu).', 10),
            A('tensi_berdiri', 'Ukur TD setelah berdiri.', 'TD berdiri 112/70 mmHg tanpa gejala.', 8,
              { syarat: setelah('tanda_vital', 'Ukur TD berbaring dulu.') }),
            A('fisik_volume', 'Periksa JVP, paru, bunyi jantung ketiga, dan edema tungkai.', 'JVP tidak meningkat; paru bersih; tanpa S3; tanpa edema.', 10),
            A('akral_perfusi', 'Periksa akral dan perfusi perifer.', 'Akral hangat.', 6)
          ] },
          { judul: 'Penunjang', aksi: [
            A('lab_awal', 'Minta kalium, natrium, kreatinin/eGFR, hemoglobin, dan HbA1c, NT-proBNP.', 'K 4,5 mmol/L · Na 139 · kreatinin 1,1 mg/dL (eGFR ± 75) · Hb 13,5 · HbA1c 7,4% · NT-proBNP 780 pg/mL.', 8),
            A('status_besi', 'Minta ferritin dan saturasi transferin.', 'Belum pernah diperiksa; dapat diminta pada kunjungan berikutnya.', 4),
            A('ekg', 'Minta EKG 12 sadapan.', 'Sinus 72 x/menit; gelombang Q V1–V4; QRS 108 ms (tanpa LBBB).', 6),
            A('eko', 'Lihat hasil ekokardiografi terakhir.', 'Empat bulan lalu: LVEF 30%, LV dilatasi ringan, MR ringan.', 6),
            A('cath_ulang', 'Minta angiografi koroner ulang segera.', 'Penguji: "Belum tersedia." Waktu terbuang.', 12,
              { tidakTepat: 'Tanpa angina atau perburukan klinis tidak ada indikasi hari ini; prioritas adalah optimalisasi terapi.' })
          ] }
        ]
      },
      {
        id: 'keputusan', label: '3. Keputusan terapi', tipe: 'form', biaya: 90,
        catatan: 'Kirim sekali. Pilih golongan dasar, langkah hari ini (jangan terlalu banyak sekaligus), dan rencana kunjungan berikutnya.',
        bidang: [
          { id: 'diagnosis', label: 'Penilaian', tipe: 'select', opsi: [
            ['hfref_belum', 'HFrEF (LVEF 30%), kardiomiopati iskemik; terapi belum optimal'],
            ['hfref_optimal', 'HFrEF; terapi sudah optimal karena pasien tidak sesak berat', { tidakTepat: 'LVEF 30% dengan hanya dua golongan pada dosis awal selama 8 bulan: terapi belum optimal.' }],
            ['hfmref', 'Gagal jantung dengan fraksi ejeksi di rentang tengah'],
            ['hfpef', 'Gagal jantung dengan fraksi ejeksi terjaga']] },
          { id: 'golongan', label: 'Golongan terapi dasar HFrEF', tipe: 'multi', opsi: [
            ['arni_acei_arb', 'ARNI, atau penghambat ACE / ARB'],
            ['bb', 'Penyekat beta'],
            ['mra', 'Antagonis mineralokortikoid'],
            ['sglt2i', 'SGLT2i'],
            ['digoksin', 'Digoksin sebagai terapi dasar'],
            ['ccb_nondhp', 'Penyekat kanal kalsium non-dihidropiridin (diltiazem/verapamil)', { tidakTepat: 'Diltiazem/verapamil dihindari pada HFrEF karena efek inotropik negatif.' }],
            ['diuretik_dasar', 'Diuretik rutin sebagai terapi dasar', { tidakTepat: 'Diuretik hanya untuk mengatasi kongesti; bukan terapi dasar HFrEF.' }]] },
          { id: 'langkah_hari_ini', label: 'Langkah yang dimulai hari ini', tipe: 'multi', opsi: DASAR.concat([
            ['mra_langsung', 'Tambah antagonis mineralokortikoid hari ini tanpa menunggu hasil kalium dan eGFR', { berisiko: 'MRA tanpa kalium dan fungsi ginjal yang diketahui berisiko hiperkalemia dan gangguan ginjal.' }],
            ['arni_langsung', 'Hentikan ramipril dan mulai ARNI hari ini juga', { tidakTepat: 'Penggantian ACEi ke ARNI memerlukan jeda sebelum mulai (angioedema).' }],
            ['semua', 'Mulai SGLT2i, MRA, ARNI, dan naikkan bisoprolol sekaligus hari ini', { tidakTepat: 'Mengubah semua sekaligus menaikkan risiko hipotensi, hiperkalemia, dan gangguan ginjal; titrasi bertahap.' }]]) },
          { id: 'rencana_berikutnya', label: 'Rencana kunjungan berikutnya', tipe: 'multi', opsi: DASAR.concat([
            ['cek_besi', 'Periksa status besi (ferritin dan saturasi transferin)'],
            ['evaluasi_perangkat', 'Nilai ulang LVEF setelah terapi optimal untuk pertimbangan ICD/CRT oleh kardiolog']]) },
          { id: 'diuretik', label: 'Furosemid', tipe: 'select', opsi: [
            ['kongesti', 'Hanya bila ada kongesti; saat ini euvolemik'],
            ['rutin', 'Rutin tiap hari untuk mencegah bengkak', { tidakTepat: 'Tanpa kongesti diuretik rutin tidak perlu dan dapat menurunkan volume dan fungsi ginjal.' }],
            ['dinaikkan', 'Naikkan dosis karena sesak saat aktivitas', { tidakTepat: 'Pasien euvolemik; sesak aktivitas tidak diatasi dengan diuretik.' }]] }
        ]
      },
      {
        id: 'edukasi', label: '4. Pemantauan & edukasi', tipe: 'aksi',
        grup: [
          { judul: 'Obat dan keselamatan', aksi: [
            A('edukasi_sglt2i', 'Jelaskan efek samping SGLT2i (infeksi genital, penurunan volume) dan nasihat hari sakit.', 'Pasien: "Kalau muntah atau diare, obat ini saya hentikan dulu ya, Dok?"', 10),
            A('hentikan_nsaid', 'Minta hentikan ibuprofen dan hindari jamu pegal linu; cari alternatif yang aman untuk pegal.', 'Pasien: "Baik, Dok. Saya hentikan."', 8),
            A('nsaid_boleh', 'Ibuprofen sesekali masih boleh, asal tidak setiap hari.', 'Pasien: "Wah, lega, Dok."', 4,
              { tidakTepat: 'NSAID memperburuk retensi cairan dan fungsi ginjal pada gagal jantung.' }),
            A('tanda_bahaya', 'Sebutkan kapan harus menghubungi dokter atau menghentikan sementara obat: pusing berat atau pingsan, bengkak wajah, urin sangat sedikit, muntah atau diare dan tidak bisa minum.', 'Pasien mencatat tanda bahaya.', 10)
          ] },
          { judul: 'Pemantauan', aksi: [
            A('pantau_td', 'Rencanakan pemantauan TD dan gejala hipotensi setelah perubahan obat.', 'Pasien: "TD di rumah saya catat ya."', 5),
            A('pantau_lab', 'Rencanakan kalium dan kreatinin ulang setelah perubahan obat.', 'Dijadwalkan pemeriksaan laboratorium ulang.', 5),
            A('timbang_bb', 'Minta timbang berat badan tiap pagi dan lapor bila naik cepat.', 'Pasien: "Ada timbangan di rumah, Dok."', 5),
            A('jadwal_kontrol', 'Sepakati kontrol dalam 1–2 minggu.', 'Kontrol dijadwalkan.', 5)
          ] },
          { judul: 'Gaya hidup', aksi: [
            A('edukasi_garam', 'Anjurkan batasi garam dan makanan asin/bersantan di warung.', 'Pasien: "Susah juga ya, Dok, tapi saya coba."', 5),
            A('edukasi_aktivitas', 'Anjurkan aktivitas fisik teratur dan rehabilitasi jantung.', 'Pasien: "Jalan pagi boleh, Dok?" "Boleh, bertahap."', 5),
            A('edukasi_rokok', 'Tanyakan dan anjurkan tidak merokok.', 'Pasien tidak merokok.', 4)
          ] },
          { judul: 'Komunikasi', aksi: [
            A('jelaskan_alasan', 'Jelaskan alasan tiap obat dan manfaat jangka panjang dengan bahasa awam.', 'Pasien: "Jadi obatnya saling melengkapi, ya, Dok."', 12),
            A('jawab_ginjal', 'Jawab kekhawatiran ginjal: fungsi ginjal dipantau berkala dan obat diubah bertahap.', 'Pasien tampak lebih tenang.', 8),
            A('jawab_biaya', 'Soal BPJS: katakan belum tahu pasti, akan dicek dengan farmasi, tanpa menjanjikan.', 'Pasien: "Baik, Dok, saya tunggu kabarnya."', 8),
            A('janji_bpjs', 'Pastikan Bapak: semua obat baru ini ditanggung BPJS.', 'Pasien: "Alhamdulillah, Dok."', 4,
              { tidakTepat: 'Menjanjikan penjaminan yang tidak diketahui merusak kepercayaan bila ternyata tidak ditanggung.' }),
            A('teach_back', 'Minta pasien mengulang rencana dengan kata-katanya sendiri (teach-back).', 'Pasien mengulang rencana dengan benar, kecuali lupa nasihat hari sakit; Anda mengoreksi.', 10),
            A('rangkum_sepakat', 'Rangkum rencana dan sepakati jadwal kontrol.', 'Pasien: "Sepakat, Dok."', 8)
          ] }
        ]
      }
    ],
    skor: {
      A1: h.any(['salam']),
      A2: h.all(['gejala_aktivitas', 'ortopnea_pnd', 'edema_bb']),
      A3: h.all(['kepatuhan', 'efek_samping', 'nsaid_jamu']),
      A4: h.all(['penyebab_riwayat', 'komorbid_ginjal', 'alergi_angioedema']),
      B1: h.all(['fisik_volume', 'akral_perfusi']),
      B2: h.all(['tanda_vital', 'tensi_berdiri']),
      B3: h.any(['lab_awal']),
      B4: h.all(['ekg', 'eko']),
      C1: h.kustom(function (c) {
        return c.jawab('diagnosis') === 'hfref_belum' &&
          ['arni_acei_arb', 'bb', 'mra', 'sglt2i'].every(function (x) { return ada(c, 'golongan', x); }) ? 1 : 0;
      }, ['keputusan', 'diagnosis', 'golongan']),
      C2: h.kustom(function (c) { return rencana(c, 'sglt2i') && c.sudah('edukasi_sglt2i') ? 1 : 0; },
        ['keputusan', 'langkah_hari_ini', 'rencana_berikutnya', 'edukasi_sglt2i']),
      C3: h.kustom(function (c) {
        return rencana(c, 'mra_syarat') && c.sudah('lab_awal') && c.sudah('pantau_lab') && !ada(c, 'langkah_hari_ini', 'mra_langsung') ? 1 : 0;
      }, ['keputusan', 'langkah_hari_ini', 'rencana_berikutnya', 'lab_awal', 'pantau_lab']),
      C4: h.kustom(function (c) { return rencana(c, 'bb_titrasi') && c.sudah('tanda_vital') ? 1 : 0; },
        ['keputusan', 'langkah_hari_ini', 'rencana_berikutnya', 'tanda_vital']),
      C5: h.kustom(function (c) {
        return rencana(c, 'arni_jeda') && c.sudah('alergi_angioedema') && !ada(c, 'langkah_hari_ini', 'arni_langsung') ? 1 : 0;
      }, ['keputusan', 'langkah_hari_ini', 'rencana_berikutnya', 'alergi_angioedema']),
      C6: h.kustom(function (c) {
        var n = (c.jawab('langkah_hari_ini') || []).length;
        var buruk = ['semua', 'arni_langsung', 'mra_langsung'].some(function (x) { return ada(c, 'langkah_hari_ini', x); });
        return n >= 1 && n <= 2 && !buruk && c.sudah('jadwal_kontrol') ? 1 : 0;
      }, ['keputusan', 'langkah_hari_ini', 'jadwal_kontrol']),
      C7: h.kustom(function (c) { return c.jawab('diuretik') === 'kongesti' && c.sudah('hentikan_nsaid') && !c.sudah('nsaid_boleh') ? 1 : 0; },
        ['keputusan', 'diuretik', 'hentikan_nsaid', 'nsaid_boleh']),
      D1: h.all(['pantau_td', 'pantau_lab', 'timbang_bb']),
      D2: h.any(['tanda_bahaya']),
      E1: h.all(['edukasi_garam', 'timbang_bb', 'edukasi_aktivitas', 'edukasi_rokok']),
      E2: h.kustom(function (c) {
        return c.sudah('jelaskan_alasan') && c.sudah('jawab_ginjal') && c.sudah('jawab_biaya') && !c.sudah('janji_bpjs') ? 1 : 0;
      }, ['jelaskan_alasan', 'jawab_ginjal', 'jawab_biaya', 'janji_bpjs']),
      E3: h.all(['teach_back', 'rangkum_sepakat'])
    },
    ideal: [
      'salam', 'gejala_aktivitas', 'ortopnea_pnd', 'edema_bb', 'pusing_td',
      'obat_sekarang', 'kepatuhan', 'efek_samping', 'nsaid_jamu', 'alergi_angioedema',
      'penyebab_riwayat', 'komorbid_ginjal', 'diet', 'kekhawatiran',
      'tanda_vital', 'tensi_berdiri', 'fisik_volume', 'akral_perfusi', 'lab_awal', 'ekg', 'eko',
      { form: 'keputusan', jawab: {
        diagnosis: 'hfref_belum',
        golongan: ['arni_acei_arb', 'bb', 'mra', 'sglt2i'],
        langkah_hari_ini: ['sglt2i'],
        rencana_berikutnya: ['mra_syarat', 'bb_titrasi', 'arni_jeda', 'cek_besi', 'evaluasi_perangkat'],
        diuretik: 'kongesti' } },
      'edukasi_sglt2i', 'hentikan_nsaid', 'tanda_bahaya',
      'pantau_td', 'pantau_lab', 'timbang_bb', 'jadwal_kontrol',
      'edukasi_garam', 'edukasi_aktivitas', 'edukasi_rokok',
      'jelaskan_alasan', 'jawab_ginjal', 'jawab_biaya', 'teach_back', 'rangkum_sepakat'
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
