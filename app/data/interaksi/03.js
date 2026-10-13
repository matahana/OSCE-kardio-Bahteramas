/* Interaksi Stasiun 03 — Auskultasi jantung (stenosis aorta).
   Bunyi jantung disintesis di browser (ilustrasi, bukan rekaman pasien).
   Data mengikuti stasiun/03-auskultasi-jantung.md (bagian 3). */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h;

  var SITUS = [
    ['aorta', 'Aorta', 'SIK 2 kanan parasternal'],
    ['pulmonal', 'Pulmonal', 'SIK 2 kiri parasternal'],
    ['erb', 'Erb', 'SIK 3 kiri parasternal'],
    ['trikuspid', 'Trikuspid', 'SIK 4–5 kiri parasternal'],
    ['mitral', 'Mitral/apeks', 'SIK 5 linea midklavikula kiri'],
    ['karotis', 'Karotis', 'leher, kanan/kiri']
  ];
  var ACARA = [];
  SITUS.forEach(function (s) { ACARA.push('lis_' + s[0] + '_d', 'lis_' + s[0] + '_b'); });
  ACARA.push('bantuan_teks');

  function lis(situs, mode) {
    var nama = SITUS.filter(function (s) { return s[0] === situs; })[0][1];
    return { acara: 'lis_' + situs + '_' + mode, info: { biaya: 15, label: 'Auskultasi ' + nama + ' (' + (mode === 'd' ? 'diafragma' : 'bell') + ')', respons: '(mendengarkan…)' } };
  }

  g.OSCE.daftar('03', {
    pasien: { nama: 'Pasien (pria 70 tahun)', ringkas: 'Sesak saat aktivitas dan satu kali pingsan saat naik tangga', keadaan: 'Manikin simulator auskultasi (dianggap pasien).' },
    tandaVital: [],
    waktu: 480,
    petunjuk: 'Dengarkan dengan headphone atau speaker. Bunyi bersifat sintetis; bila tidak dapat mendengar, gunakan bantuan teks (ditandai di hasil).',
    panel: [
      {
        id: 'persiapan', label: 'Persiapan', tipe: 'aksi',
        grup: [{ judul: 'Persiapan pemeriksaan', aksi: [
          A('salam', 'Selamat siang, Pak. Saya dokter. Saya akan memeriksa jantung Bapak dengan stetoskop.', 'Siang, Dok. Silakan.', 8),
          A('cuci_tangan', 'Cuci tangan.', 'Tangan dicuci dan dikeringkan.', 6),
          A('posisi', 'Posisikan pasien terlentang 30–45° dan buka dada dengan menjaga privasi.', 'Pasien berbaring setengah duduk; dada terbuka, selimut menutup bagian lain.', 10),
          A('vital', 'Minta tanda vital.', 'TD 120/80 mmHg, nadi 78 x/menit teratur.', 6),
          A('steteskop_pakaian', 'Auskultasi di atas pakaian pasien.', 'Terdengar gesekan kain; bunyi jantung kurang jelas.', 8,
            { tidakTepat: 'Pakaian menimbulkan artefak; auskultasi harus pada kulit.' })
        ] }]
      },
      {
        id: 'steteskop', label: 'Auskultasi', tipe: 'widget', widget: 'steteskop',
        catatan: 'Pilih mode (diafragma atau bell), lalu klik titik pada dada. Tiap kombinasi titik dan mode pertama kali memakan 15 detik.',
        opsi: {
          situs: SITUS,
          bpm: 75,
          profil: {
            s1: 1.0, s2: 0.45,
            sistolik: { jenis: 'ejeksi', amp: { aorta: 1.0, pulmonal: 0.5, erb: 0.7, trikuspid: 0.35, mitral: 0.45, karotis: 0.85 } },
            diastolik: null
          },
          deskripsi: {
            umum: 'S1 normal; S2 melemah (A2 lemah); bising ejeksi sistolik kasar, crescendo–decrescendo, terkeras di area aorta dan menjalar ke karotis; tidak ada bising diastolik.',
            aorta: 'S2 lemah. Bising ejeksi sistolik crescendo–decrescendo, paling keras di sini.',
            pulmonal: 'Bising ejeksi sistolik lebih lemah.',
            erb: 'Bising ejeksi sistolik sedang.',
            trikuspid: 'Bising ejeksi sistolik lemah.',
            mitral: 'Bising sistolik lemah; S1 normal. Tidak ada bising diastolik.',
            karotis: 'Bising ejeksi sistolik menjalar ke karotis.'
          }
        }
      },
      {
        id: 'manuver', label: 'Manuver', tipe: 'aksi',
        grup: [{ judul: 'Teknik tambahan', aksi: [
          A('palpasi', 'Palpasi nadi karotis/radial bersamaan dengan auskultasi untuk menentukan sistol dan diastol.', 'Nadi teraba bersamaan dengan bunyi pertama (S1): ini sistol.', 8),
          A('miring_kiri', 'Minta pasien berbaring miring ke kiri untuk mendengar area mitral.', 'Pasien berbaring miring kiri; apeks lebih mudah didengar.', 8),
          A('duduk_condong', 'Minta pasien duduk condong ke depan saat ekspirasi (untuk bising diastolik regurgitasi aorta).', 'Pasien duduk condong ke depan dan menahan napas setelah ekspirasi.', 8)
        ] }]
      },
      {
        id: 'interpretasi', label: 'Interpretasi', tipe: 'form', biaya: 60,
        bidang: [
          { id: 's1s2', label: 'Bunyi jantung', tipe: 'select', opsi: [
            ['normal', 'S1–S2 normal'], ['s1_keras', 'S1 mengeras'], ['s2_lemah', 'S2 melemah (A2 lemah)'], ['s2_keras', 'S2 mengeras'], ['s3', 'Ada S3 gallop']] },
          { id: 'bising', label: 'Bising', tipe: 'select', opsi: [['tidak', 'Tidak ada bising'], ['ada', 'Ada bising']] },
          { id: 'waktu', label: 'Waktu bising', tipe: 'select', opsi: [['sistolik', 'Sistolik'], ['diastolik', 'Diastolik'], ['kontinu', 'Kontinu']] },
          { id: 'lokasi', label: 'Lokasi terkeras', tipe: 'select', opsi: [
            ['aorta', 'Area aorta'], ['pulmonal', 'Area pulmonal'], ['erb', 'Titik Erb'], ['trikuspid', 'Area trikuspid'], ['mitral', 'Area mitral/apeks']] },
          { id: 'karakter', label: 'Karakter bising', tipe: 'select', opsi: [
            ['ejeksi', 'Ejeksi: crescendo–decrescendo'], ['pansistolik', 'Pansistolik (plateau)'], ['decrescendo', 'Decrescendo awal-diastolik'], ['rumbling', 'Rumbling diastolik + opening snap']] },
          { id: 'penjalaran', label: 'Penjalaran', tipe: 'select', opsi: [
            ['karotis', 'Ke karotis/leher'], ['aksila', 'Ke aksila'], ['apeks', 'Ke apeks'], ['tidak', 'Tidak menjalar']] },
          { id: 'diagnosis', label: 'Kemungkinan diagnosis', tipe: 'select', opsi: [
            ['as', 'Stenosis aorta'], ['mr', 'Regurgitasi mitral'], ['ms', 'Stenosis mitral'], ['ar', 'Regurgitasi aorta'],
            ['vsd', 'Defek septum ventrikel'], ['fungsional', 'Bising fungsional/innocent']] },
          { id: 'lanjutan', label: 'Pemeriksaan lanjutan', tipe: 'multi', opsi: [
            ['ekg', 'EKG'], ['echo', 'Ekokardiografi transtorakal'], ['foto', 'Foto toraks'],
            ['ct_angio', 'CT angiografi koroner sebagai langkah awal', { tidakTepat: 'Bukan langkah awal untuk menilai katup; ekokardiografi lebih dahulu.' }],
            ['treadmill', 'Uji treadmill', { berisiko: 'Uji beban tidak aman pada kecurigaan stenosis aorta berat bergejala.' }],
            ['holter', 'Holter 24 jam', { tidakTepat: 'Tidak menjawab pertanyaan utama (penilaian katup).' }]
          ] }
        ]
      },
      {
        id: 'komunikasi', label: 'Komunikasi', tipe: 'aksi',
        grup: [{ judul: 'Menyampaikan temuan', aksi: [
          A('jelaskan_awam', 'Jelaskan dengan bahasa awam: ada suara aliran darah yang menyempit pada katup jantung; kita perlu USG jantung untuk memastikan.', 'Oh begitu, Dok. Apa bisa diobati?', 15),
          A('ringkas_struktur', 'Ringkas temuan secara terstruktur: bunyi jantung, bising (waktu, lokasi, karakter), penjalaran, rencana pemeriksaan.', 'Baik, Dok, saya paham urutannya.', 15),
          A('rapikan', 'Rapikan pakaian pasien dan ucapkan terima kasih.', 'Terima kasih, Dok.', 6),
          A('jelaskan_jargon', 'Bapak punya stenosis aorta dengan bising ejeksi sistolik.', 'Maksudnya apa, Dok?', 10,
            { tidakTepat: 'Memakai istilah teknis tanpa penjelasan.' }),
          A('diagnosis_pasti', 'Bapak pasti perlu operasi katup.', 'Operasi? Saya takut, Dok…', 8,
            { tidakTepat: 'Keputusan operasi belum bisa dibuat tanpa ekokardiografi dan penilaian tim jantung.' })
        ] }]
      }
    ],
    acara: ACARA,
    skor: {
      A1: h.any(['salam']),
      A2: h.any(['cuci_tangan']),
      A3: h.any(['posisi']),
      B1: h.any(['lis_aorta_d', 'lis_aorta_b']),
      B2: h.any(['lis_pulmonal_d', 'lis_pulmonal_b']),
      B3: h.any(['lis_erb_d', 'lis_erb_b']),
      B4: h.any(['lis_trikuspid_d', 'lis_trikuspid_b']),
      B5: h.any(['lis_mitral_d', 'lis_mitral_b']),
      B6: h.kustom(function (c) {
        var diafragma = c.salahSatu(['lis_aorta_d', 'lis_pulmonal_d', 'lis_erb_d', 'lis_trikuspid_d', 'lis_mitral_d']);
        return diafragma && c.sudah('lis_mitral_b') ? 1 : 0;
      }, ['lis_aorta_d', 'lis_pulmonal_d', 'lis_erb_d', 'lis_trikuspid_d', 'lis_mitral_d', 'lis_mitral_b']),
      B7: h.any(['palpasi']),
      B8: h.kustom(function (c) {
        return c.salahSatu(['lis_karotis_d', 'lis_karotis_b']) && c.salahSatu(['miring_kiri', 'duduk_condong']) ? 1 : 0;
      }, ['lis_karotis_d', 'lis_karotis_b', 'miring_kiri', 'duduk_condong']),
      C1: h.kustom(function (c) { return c.jawab('s1s2') === 's2_lemah' ? 1 : 0; }, ['s1s2']),
      C2: h.kustom(function (c) { return c.jawab('bising') === 'ada' && c.jawab('waktu') === 'sistolik' ? 1 : 0; }, ['bising', 'waktu']),
      C3: h.kustom(function (c) { return c.jawab('lokasi') === 'aorta' ? 1 : 0; }, ['lokasi']),
      C4: h.kustom(function (c) { return c.jawab('karakter') === 'ejeksi' && c.jawab('penjalaran') === 'karotis' ? 1 : 0; }, ['karakter', 'penjalaran']),
      C5: h.kustom(function (c) { return c.jawab('diagnosis') === 'as' ? 1 : 0; }, ['diagnosis']),
      C6: h.kustom(function (c) {
        var l = c.jawab('lanjutan') || [];
        return l.indexOf('ekg') >= 0 && l.indexOf('echo') >= 0 ? 1 : 0;
      }, ['lanjutan']),
      D1: h.any(['jelaskan_awam']),
      D2: h.any(['ringkas_struktur']),
      D3: h.any(['rapikan'])
    },
    ideal: [
      'salam', 'cuci_tangan', 'posisi',
      lis('aorta', 'd'), lis('pulmonal', 'd'), lis('erb', 'd'), lis('trikuspid', 'd'), lis('mitral', 'd'), lis('mitral', 'b'),
      'palpasi', 'miring_kiri', lis('karotis', 'd'),
      { form: 'interpretasi', jawab: {
        s1s2: 's2_lemah', bising: 'ada', waktu: 'sistolik', lokasi: 'aorta', karakter: 'ejeksi', penjalaran: 'karotis',
        diagnosis: 'as', lanjutan: ['ekg', 'echo'] } },
      'jelaskan_awam', 'ringkas_struktur', 'rapikan'
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
