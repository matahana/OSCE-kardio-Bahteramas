/* Interaksi Stasiun 11 — Pemeriksaan fisik kardiovaskular sistematis (stenosis mitral rematik dengan fibrilasi atrium).
   Temuan mengikuti stasiun/11-pemeriksaan-fisik-kardiovaskular.md (bagian 3). Bunyi jantung disintesis di peramban
   (ilustrasi). Bising diastolik HANYA terdengar bila kandidat memakai bell, pasien sudah dimiringkan ke kiri, dan
   menahan napas di akhir ekspirasi. Aplikasi tidak dapat menilai teknik fisik nyata; itu dilatih dengan pasien/simulator.
   Klaim antikoagulan (warfarin pada stenosis mitral reumatik) sudah dicocokkan dengan ACC/AHA 2023 (Class 1, B-R);
   klaim lain bersifat buku ajar (wiki/guidelines-status.md). */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h;

  var SITUS = [
    ['aorta', 'Aorta', 'SIK 2 kanan parasternal'],
    ['pulmonal', 'Pulmonal', 'SIK 2 kiri parasternal'],
    ['erb', 'Erb', 'tepi kiri sternum, SIK 3'],
    ['trikuspid', 'Trikuspid', 'SIK 4–5 kiri parasternal'],
    ['mitral', 'Mitral/apeks', 'SIK 5 linea midklavikula kiri'],
    ['karotis', 'Karotis', 'leher'],
    ['aksila', 'Aksila', 'garis aksila anterior kiri']
  ];
  var ACARA = [];
  SITUS.forEach(function (s) { ACARA.push('lis_' + s[0] + '_d', 'lis_' + s[0] + '_b'); });
  ACARA.push('bantuan_teks', 'bising_diastolik_terdengar');

  function lis(situs, mode) {
    var nama = SITUS.filter(function (s) { return s[0] === situs; })[0][1];
    return { acara: 'lis_' + situs + '_' + mode, info: { biaya: 15, label: 'Auskultasi ' + nama + ' (' + (mode === 'd' ? 'diafragma' : 'bell') + ')', respons: '(mendengarkan…)' } };
  }
  function di(c, situs) { return c.salahSatu(['lis_' + situs + '_d', 'lis_' + situs + '_b']); }

  g.OSCE.daftar('11', {
    pasien: { nama: 'Ibu Rahayu (sukarelawan sehat)', ringkas: '38 tahun; sesak saat aktivitas dan berdebar 3 bulan; demam rematik masa SD', keadaan: 'Berbaring di brankar dengan sandaran. Penguji membacakan temuan setelah Anda melakukan tiap manuver.' },
    tandaVital: [],
    waktu: 480,
    petunjuk: 'Anamnesis tidak perlu diulang. Temuan hanya diberikan setelah manuver dilakukan; bunyi jantung bergantung pada alat, posisi pasien, dan fase napas yang Anda pakai. Bunyi bersifat sintetis (ilustrasi).',
    panel: [
      {
        id: 'persiapan', label: 'Persiapan', tipe: 'aksi',
        grup: [{ judul: 'Persiapan dan inspeksi umum', aksi: [
          A('cuci_tangan', 'Cuci tangan.', 'Tangan dicuci dan dikeringkan.', 6),
          A('salam_izin', 'Selamat siang, Bu. Saya dokter. Saya akan memeriksa jantung dan nadi Ibu; bila ada yang tidak nyaman, katakan. Boleh saya mulai?', 'Siang, Dok. Silakan.', 10),
          A('posisi45', 'Posisikan pasien 45° dengan sandaran dan buka dada dengan menjaga privasi.', 'Pasien duduk setengah berbaring; dada terbuka, kain menutup bagian lain.', 10),
          A('inspeksi_umum', 'Inspeksi umum dari ujung tempat tidur.', 'Wanita muda, nyaman saat istirahat, napas 18 x/menit; tidak sianosis; pipi kemerahan keunguan (malar flush).', 8)
        ] }]
      },
      {
        id: 'tangan_leher', label: 'Tangan dan leher', tipe: 'aksi',
        grup: [
          { judul: 'Tangan dan nadi', aksi: [
            A('tangan', 'Periksa tangan: clubbing, splinter hemorrhage, suhu, dan waktu isi kapiler.', 'Hangat; tidak ada clubbing, splinter hemorrhage, atau lesi Osler/Janeway; waktu isi kapiler < 2 detik.', 10),
            A('nadi_radial_30', 'Hitung nadi radial selama 30 detik: laju dan irama.', 'Tidak teratur sama sekali (irregularly irregular), ± 96 x/menit; volume kecil.', 25),
            A('nadi_10dtk', 'Hitung nadi radial 10 detik lalu kalikan enam.', 'Hasil ± 90 x/menit, tetapi pada irama tidak teratur hitungan singkat tidak dapat diandalkan.', 10,
              { tidakTepat: 'Pada irama ireguler, nadi harus dihitung cukup lama (≥ 30 detik).' }),
            A('nadi_karakter', 'Nilai volume nadi, bandingkan kedua radial, dan sebutkan irama.', 'Volume kecil; kedua radial sama; tanpa keterlambatan radio-femoral. Nadi ireguler: curiga fibrilasi atrium.', 8)
          ] },
          { judul: 'Wajah dan leher', aksi: [
            A('wajah_mata_mulut', 'Periksa wajah, mata, dan mulut: malar flush, konjungtiva, sklera, sianosis sentral.', 'Malar flush; konjungtiva tidak pucat; sklera tidak ikterik; lidah merah muda.', 8),
            A('jvp', 'JVP: pasien 45°, kepala menoleh sedikit, kenali vena jugularis interna, ukur tinggi vertikal dari sudut sternum.', 'Tinggi ± 3 cm di atas sudut sternum; tidak tampak gelombang a.', 14),
            A('karotis_satu_sisi', 'Raba nadi karotis satu sisi, satu per satu, dan nilai karakternya.', 'Volume kecil, ireguler; tanpa bruit.', 8),
            A('karotis_dua_sisi', 'Raba kedua karotis bersamaan.', 'Pasien tampak pusing sesaat.', 8,
              { tidakTepat: 'Menekan kedua karotis bersamaan dapat menurunkan aliran darah otak dan merangsang sinus karotis.' })
          ] }
        ]
      },
      {
        id: 'prekordium', label: 'Prekordium', tipe: 'aksi',
        grup: [{ judul: 'Inspeksi dan palpasi', aksi: [
          A('inspeksi_prekordium', 'Inspeksi prekordium: bekas luka, deformitas, denyut yang terlihat.', 'Tidak ada bekas luka atau deformitas; denyut apeks terlihat samar.', 8),
          A('palpasi_apeks', 'Palpasi apeks dengan ujung jari: lokasi, bergeser atau tidak, karakter.', 'Ruang iga 5 garis midklavikula kiri, tidak bergeser; karakter tapping (S1 teraba).', 10),
          A('palpasi_heave_thrill', 'Palpasi tepi kiri sternum untuk heave dan area katup untuk thrill/P2 dengan telapak tangan.',
            function (c) {
              return 'Heave ventrikel kanan ringan; P2 teraba.' + (c.sudah('miring_kiri') ? ' Thrill diastolik apeks teraba pada posisi miring kiri.' : '');
            }, 10)
        ] }]
      },
      {
        id: 'steteskop', label: 'Auskultasi', tipe: 'widget', widget: 'steteskop',
        catatan: 'Pilih alat (diafragma atau bell) dan klik titik. Hasil bergantung pada posisi pasien dan fase napas yang sudah Anda minta pada tab Manuver. Tiap kombinasi titik dan alat pertama kali memakan 15 detik.',
        opsi: {
          situs: SITUS,
          bpm: 96,
          tidakTeratur: true,
          profil: {
            s1: 1.5, s2: 0.7, s2x: { pulmonal: 1.5 },
            sistolik: null,
            snap: { amp: { mitral: 0.9, erb: 0.9, trikuspid: 0.5 } },
            diastolik: { amp: { mitral: 1.0, trikuspid: 0.2, erb: 0.25 }, syarat: { mode: 'b', aksi: ['miring_kiri', 'tahan_ekspirasi'] } }
          },
          deskripsi: {
            umum: 'S1 dan P2 keras. Temuan lain bergantung pada alat, posisi pasien, dan fase napas yang Anda pakai.',
            aorta: 'S1 keras; tidak ada bising.',
            pulmonal: 'S1 keras; P2 keras.',
            erb: function (sesi, mode) {
              return sesi.sudah('miring_kiri') && sesi.sudah('tahan_ekspirasi') && mode === 'b'
                ? 'S1 keras; opening snap setelah S2.'
                : 'S1 keras; tidak ada bising sistolik bermakna.';
            },
            trikuspid: 'S1 keras; tidak ada bising sistolik bermakna.',
            mitral: function (sesi, mode) {
              return sesi.sudah('miring_kiri') && sesi.sudah('tahan_ekspirasi') && mode === 'b'
                ? 'S1 keras; opening snap setelah S2, diikuti bising diastolik berdengung (rumble) terlokalisir di apeks tanpa penjalaran; tanpa aksentuasi presistolik (irama tidak teratur); tidak ada bising sistolik.'
                : 'S1 keras; tidak ada bising sistolik bermakna.';
            },
            karotis: 'Tidak ada bising.',
            aksila: 'Tidak ada bising yang menjalar.'
          }
        }
      },
      {
        id: 'manuver', label: 'Manuver', tipe: 'aksi',
        grup: [{ judul: 'Teknik tambahan untuk auskultasi', aksi: [
          A('palpasi_karotis_bunyi', 'Raba nadi karotis saat mendengar untuk menentukan S1 dan S2.', 'Nadi karotis teraba bersamaan dengan bunyi pertama (S1): ini sistol.', 8),
          A('miring_kiri', 'Minta pasien berbaring miring ke kiri.', 'Pasien berbaring miring ke kiri; apeks lebih dekat dengan dinding dada.', 8),
          A('tahan_ekspirasi', 'Minta pasien menghembuskan napas lalu menahannya (akhir ekspirasi).', 'Pasien menghembuskan napas dan menahannya.', 6),
          A('duduk_condong_ekspirasi', 'Minta pasien duduk condong ke depan dan menahan napas di akhir ekspirasi (untuk bising regurgitasi aorta).', 'Pasien duduk condong ke depan dan menahan napas setelah ekspirasi.', 8)
        ] }]
      },
      {
        id: 'penyerta', label: 'Pemeriksaan penyerta', tipe: 'aksi',
        grup: [{ judul: 'Paru, hepar, edema', aksi: [
          A('paru_basis', 'Auskultasi basis paru.', 'Ronki basah halus minimal di kedua basis.', 8),
          A('hepar', 'Palpasi hepar.', 'Hepar tidak teraba.', 6),
          A('edema', 'Periksa edema tungkai dan sakrum.', 'Tidak ada edema tungkai atau sakrum.', 6)
        ] }]
      },
      {
        id: 'deskripsi', label: 'Deskripsi bunyi', tipe: 'form', biaya: 30,
        bidang: [
          { id: 's1', label: 'Bunyi jantung pertama (S1)', tipe: 'select', opsi: [['keras', 'Mengeras'], ['normal', 'Normal'], ['lemah', 'Melemah']] },
          { id: 'p2', label: 'Komponen pulmonal bunyi kedua (P2)', tipe: 'select', opsi: [['keras', 'Mengeras'], ['normal', 'Normal']] },
          { id: 'snap', label: 'Opening snap', tipe: 'cek', teks: 'Terdengar opening snap setelah S2.' },
          { id: 'diastolik', label: 'Bising diastolik', tipe: 'select', opsi: [
            ['rumble_apeks', 'Berdengung (rumble) di apeks'], ['decrescendo_tepi', 'Decrescendo di tepi kiri sternum'], ['tidak', 'Tidak ada']] },
          { id: 'sistolik', label: 'Bising sistolik', tipe: 'select', opsi: [['tidak', 'Tidak ada bising sistolik bermakna'], ['ejeksi', 'Ejeksi di area aorta'], ['pansistolik', 'Pansistolik di apeks']] }
        ]
      },
      {
        id: 'kesimpulan', label: 'Kesimpulan', tipe: 'form', biaya: 50,
        bidang: [
          { id: 'diagnosis', label: 'Kesimpulan temuan', tipe: 'select', opsi: [
            ['ms_af', 'Stenosis mitral dengan fibrilasi atrium, kemungkinan etiologi rematik'],
            ['mr', 'Regurgitasi mitral'], ['as', 'Stenosis aorta'], ['ar', 'Regurgitasi aorta'], ['gj', 'Gagal jantung kiri tanpa kelainan katup']] },
          { id: 'langkah', label: 'Langkah lanjut', tipe: 'multi', opsi: [
            ['ekg', 'EKG'], ['echo', 'Ekokardiografi'], ['kendali_laju', 'Kendali laju'],
            ['avk', 'Antikoagulasi dengan antagonis vitamin K (warfarin)'],
            ['doac', 'Antikoagulasi dengan DOAC', { tidakTepat: 'Pada stenosis mitral reumatik atau sedang–berat dengan AF, warfarin dianjurkan daripada DOAC (ACC/AHA 2023, Class 1, B-R).' }],
            ['profilaksis', 'Profilaksis sekunder demam rematik']] }
        ]
      },
      {
        id: 'penutup', label: 'Penutup', tipe: 'aksi',
        grup: [{ judul: 'Menutup pemeriksaan', aksi: [
          A('rapikan', 'Rapikan pakaian pasien dan ucapkan terima kasih.', 'Terima kasih, Dok.', 6)
        ] }]
      }
    ],
    acara: ACARA,
    skor: {
      A1: h.all(['cuci_tangan', 'salam_izin']),
      A2: h.any(['posisi45']),
      A3: h.any(['inspeksi_umum']),
      B1: h.any(['tangan']),
      B2: h.any(['nadi_radial_30']),
      B3: h.any(['nadi_karakter']),
      C1: h.any(['wajah_mata_mulut']),
      C2: h.any(['jvp']),
      C3: h.kustom(function (c) { return c.sudah('karotis_satu_sisi') && !c.sudah('karotis_dua_sisi') ? 1 : 0; }, ['karotis_satu_sisi', 'karotis_dua_sisi']),
      D1: h.any(['inspeksi_prekordium']),
      D2: h.any(['palpasi_apeks']),
      D3: h.any(['palpasi_heave_thrill']),
      E1: h.kustom(function (c) {
        var diafragma = c.salahSatu(['lis_mitral_d', 'lis_trikuspid_d', 'lis_pulmonal_d', 'lis_aorta_d']);
        var bell = c.salahSatu(['lis_mitral_b', 'lis_trikuspid_b', 'lis_pulmonal_b', 'lis_aorta_b']);
        return di(c, 'mitral') && di(c, 'trikuspid') && di(c, 'pulmonal') && di(c, 'aorta') && diafragma && bell && c.sudah('palpasi_karotis_bunyi') ? 1 : 0;
      }, ['lis_mitral_d', 'lis_mitral_b', 'lis_trikuspid_d', 'lis_trikuspid_b', 'lis_pulmonal_d', 'lis_pulmonal_b', 'lis_aorta_d', 'lis_aorta_b', 'palpasi_karotis_bunyi']),
      E2: h.any(['bising_diastolik_terdengar']),
      E3: h.all(['duduk_condong_ekspirasi', 'lis_erb_d', 'lis_aorta_d']),
      E4: h.kustom(function (c) { return di(c, 'karotis') && di(c, 'aksila') ? 1 : 0; },
        ['lis_karotis_d', 'lis_karotis_b', 'lis_aksila_d', 'lis_aksila_b']),
      E5: h.kustom(function (c) {
        return c.jawab('s1') === 'keras' && c.jawab('p2') === 'keras' && c.jawab('snap') && c.jawab('diastolik') === 'rumble_apeks' && c.jawab('sistolik') === 'tidak' ? 1 : 0;
      }, ['s1', 'p2', 'snap', 'diastolik', 'sistolik']),
      F1: h.count(['paru_basis', 'hepar', 'edema'], [[2, 1]]),
      G1: h.kustom(function (c) { return c.jawab('diagnosis') === 'ms_af' ? 1 : 0; }, ['diagnosis']),
      G2: h.kustom(function (c) {
        var l = c.jawab('langkah') || [];
        var semua = ['ekg', 'echo', 'kendali_laju', 'avk', 'profilaksis'].every(function (x) { return l.indexOf(x) >= 0; });
        return semua && l.indexOf('doac') < 0 && c.sudah('rapikan') ? 1 : 0;
      }, ['langkah', 'rapikan'])
    },
    ideal: [
      'cuci_tangan', 'salam_izin', 'posisi45', 'inspeksi_umum',
      'tangan', 'nadi_radial_30', 'nadi_karakter', 'wajah_mata_mulut', 'jvp', 'karotis_satu_sisi',
      'inspeksi_prekordium', 'palpasi_apeks',
      'palpasi_karotis_bunyi', lis('aorta', 'd'), lis('pulmonal', 'd'), lis('trikuspid', 'd'), lis('mitral', 'd'),
      'miring_kiri', 'tahan_ekspirasi', 'palpasi_heave_thrill', lis('mitral', 'b'), { acara: 'bising_diastolik_terdengar', nilai: true },
      'duduk_condong_ekspirasi', lis('erb', 'd'), lis('karotis', 'd'), lis('aksila', 'd'),
      'paru_basis', 'hepar',
      { form: 'deskripsi', jawab: { s1: 'keras', p2: 'keras', snap: true, diastolik: 'rumble_apeks', sistolik: 'tidak' } },
      { form: 'kesimpulan', jawab: { diagnosis: 'ms_af', langkah: ['ekg', 'echo', 'kendali_laju', 'avk', 'profilaksis'] } },
      'rapikan'
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
