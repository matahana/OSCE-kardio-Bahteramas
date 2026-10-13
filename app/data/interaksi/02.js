/* Interaksi Stasiun 02 — Interpretasi EKG: STEMI inferior.
   Stasiun berbasis form: kandidat membaca EKG (sintetis, ilustrasi) lalu menjawab terstruktur.
   Data mengikuti stasiun/02-ekg-stemi-inferior.md (bagian 3). */
(function (g) {
  'use strict';
  var h = g.OSCE.h;

  var SADAPAN = [['I', 'I'], ['II', 'II'], ['III', 'III'], ['aVR', 'aVR'], ['aVL', 'aVL'], ['aVF', 'aVF'],
    ['V1', 'V1'], ['V2', 'V2'], ['V3', 'V3'], ['V4', 'V4'], ['V5', 'V5'], ['V6', 'V6']];

  function irisan(a, b) { return (a || []).filter(function (x) { return b.indexOf(x) >= 0; }).length; }

  g.OSCE.daftar('02', {
    pasien: { nama: 'Pasien (pria 58 tahun)', ringkas: 'Nyeri dada tipikal 1 jam, keringat dingin', keadaan: 'EKG 12 sadapan di hadapan Anda.' },
    tandaVital: [['TD', '110/70 mmHg'], ['Nadi', '75 x/menit'], ['Napas', '20 x/menit'], ['SpO₂', '95% udara ruang']],
    waktu: 480,
    petunjuk: 'Baca EKG (25 mm/detik, 10 mm/mV), lalu kirim tiga bagian jawaban secara berurutan. Tiap bagian hanya bisa dikirim sekali.',
    widgetUtama: { nama: 'ekg', opsi: {
      bpm: 75,
      sadapan: {
        II: { st: 0.25, t: 0.55 }, III: { st: 0.35, t: 0.45, r: 0.35 }, aVF: { st: 0.3, t: 0.5 },
        I: { st: -0.1, t: 0.0 }, aVL: { st: -0.18, t: -0.25 },
        aVR: { st: 0.0 }, V1: { st: -0.03 }, V2: { st: -0.03 }
      }
    } },
    panel: [
      {
        id: 'interpretasi', label: '1. Interpretasi', tipe: 'form', biaya: 150,
        bidang: [
          { id: 'laju', label: 'Laju jantung', tipe: 'number', satuan: 'x/menit', min: 20, max: 250 },
          { id: 'irama', label: 'Irama', tipe: 'select', opsi: [
            ['sinus', 'Sinus, reguler'], ['fa', 'Fibrilasi atrium'], ['flutter', 'Flutter atrium'], ['svt', 'Takikardia supraventrikular'], ['vt', 'Takikardia ventrikel']] },
          { id: 'pr', label: 'Interval PR', tipe: 'select', opsi: [['normal', 'Normal'], ['panjang', 'Memanjang'], ['pendek', 'Memendek']] },
          { id: 'qrs', label: 'Kompleks QRS', tipe: 'select', opsi: [['normal', 'Normal'], ['lebar', 'Melebar']] },
          { id: 'qt', label: 'Interval QT', tipe: 'select', opsi: [['normal', 'Normal'], ['panjang', 'Memanjang']] },
          { id: 'st_naik', label: 'Sadapan dengan elevasi ST', tipe: 'multi', opsi: SADAPAN },
          { id: 'kriteria', label: 'Elevasi ST bermakna pada', tipe: 'select', opsi: [
            ['satu', 'Hanya 1 sadapan'], ['dua', '≥ 2 sadapan yang berdekatan'], ['tidak', 'Tidak ada elevasi bermakna']] },
          { id: 'morfologi', label: 'Morfologi pendukung', tipe: 'multi', opsi: [
            ['konveks', 'ST konveks (dome)'], ['hiperakut', 'Gelombang T hiperakut'], ['q_baru', 'Q patologis baru'],
            ['konkaf', 'ST konkaf difus'], ['pr_turun', 'Depresi PR difus'], ['repol_dini', 'Pola repolarisasi dini']] },
          { id: 'st_turun', label: 'Sadapan dengan depresi ST', tipe: 'multi', opsi: SADAPAN },
          { id: 'resiprokal', label: 'Depresi tersebut merupakan', tipe: 'select', opsi: [
            ['ya', 'Perubahan resiprokal'], ['tidak', 'Perubahan independen / tidak terkait']] }
        ]
      },
      {
        id: 'diagnosis', label: '2. Diagnosis', tipe: 'form', biaya: 40,
        bidang: [
          { id: 'dx_jenis', label: 'Diagnosis', tipe: 'select', opsi: [
            ['stemi', 'STEMI'], ['nstemi', 'NSTEMI'], ['ap_tidak_stabil', 'Angina tidak stabil'], ['perikarditis', 'Perikarditis akut'], ['repol', 'Repolarisasi dini jinak']] },
          { id: 'dx_lokasi', label: 'Lokasi', tipe: 'select', opsi: [
            ['inferior', 'Inferior'], ['anterior', 'Anterior'], ['lateral', 'Lateral'], ['posterior', 'Posterior murni'], ['septal', 'Septal']] },
          { id: 'dx_darurat', label: 'Kedaruratan', tipe: 'cek', teks: 'Ini kedaruratan yang bergantung waktu; aktifkan jalur reperfusi.' }
        ]
      },
      {
        id: 'tatalaksana', label: '3. Tatalaksana awal', tipe: 'form', biaya: 90,
        bidang: [
          { id: 'tx_obat', label: 'Terapi yang diberikan', tipe: 'multi', opsi: [
            ['aspirin', 'Aspirin dosis muat dikunyah'],
            ['p2y12', 'Penghambat P2Y12 (prasugrel/ticagrelor; klopidogrel bila tidak tersedia)'],
            ['ufh', 'Heparin tak terfraksi (UFH) parenteral'],
            ['nitrat', 'Nitrat sublingual segera tanpa menilai ventrikel kanan/tekanan darah',
              { tidakTepat: 'Hindari nitrat pada kecurigaan infark ventrikel kanan atau hipotensi; periksa V4R dan tekanan darah dulu.' }],
            ['morfin', 'Morfin IV rutin', { tidakTepat: 'Tidak rutin; dapat menunda efek antiplatelet oral dan menurunkan tekanan darah.' }],
            ['o2_rutin', 'Oksigen rutin untuk semua pasien', { tidakTepat: 'Oksigen hanya bila SpO₂ < 90%.' }]
          ] },
          { id: 'tx_reperfusi', label: 'Strategi reperfusi', tipe: 'select', opsi: [
            ['tepat', 'PCI primer, atau fibrinolisis bila PCI tidak dapat dilakukan tepat waktu'],
            ['tunggu_troponin', 'Tunggu troponin lalu putuskan', { berisiko: 'Menunda reperfusi pada STEMI; troponin tidak perlu ditunggu.' }],
            ['konservatif', 'Terapi medis konservatif saja', { berisiko: 'STEMI membutuhkan reperfusi segera.' }],
            ['ct_dulu', 'CT angiografi koroner terlebih dahulu', { berisiko: 'Menunda reperfusi tanpa indikasi.' }]
          ] },
          { id: 'tx_eskalasi', label: 'Eskalasi', tipe: 'cek', teks: 'Konsultasi kardiolog dan aktifkan tim kateterisasi.' }
        ]
      }
    ],
    acara: [],
    skor: {
      '1': h.kustom(function (c) { var v = Number(c.jawab('laju')); return Math.abs(v - 75) <= 5 ? 1 : 0; }, ['laju']),
      '2': h.kustom(function (c) { return c.jawab('irama') === 'sinus' ? 1 : 0; }, ['irama']),
      '3': h.kustom(function (c) {
        return (c.jawab('pr') === 'normal' ? 1 : 0) + (c.jawab('qrs') === 'normal' ? 1 : 0) + (c.jawab('qt') === 'normal' ? 1 : 0);
      }, ['pr', 'qrs', 'qt']),
      '4a': h.kustom(function (c) {
        var j = c.jawab('st_naik') || [], benar = irisan(j, ['II', 'III', 'aVF']), salah = j.length - benar;
        if (benar === 3 && salah === 0) return 2;
        return benar >= 2 && salah <= 1 ? 1 : 0;
      }, ['st_naik']),
      '4b': h.kustom(function (c) { return c.jawab('kriteria') === 'dua' ? 1 : 0; }, ['kriteria']),
      '4c': h.kustom(function (c) {
        var m = c.jawab('morfologi') || [];
        return (m.indexOf('konveks') >= 0 || m.indexOf('hiperakut') >= 0) && m.indexOf('konkaf') < 0 ? 1 : 0;
      }, ['morfologi']),
      '5a': h.kustom(function (c) {
        var j = c.jawab('st_turun') || [];
        return j.indexOf('I') >= 0 && j.indexOf('aVL') >= 0 && j.length - irisan(j, ['I', 'aVL']) <= 1 ? 1 : 0;
      }, ['st_turun']),
      '5b': h.kustom(function (c) { return c.jawab('resiprokal') === 'ya' ? 1 : 0; }, ['resiprokal']),
      '6a': h.kustom(function (c) { return c.jawab('dx_jenis') === 'stemi' ? 1 : 0; }, ['dx_jenis']),
      '6b': h.kustom(function (c) { return c.jawab('dx_lokasi') === 'inferior' ? 1 : 0; }, ['dx_lokasi']),
      '6c': h.kustom(function (c) { return c.jawab('dx_darurat') ? 1 : 0; }, ['dx_darurat']),
      '7a': h.kustom(function (c) { return (c.jawab('tx_obat') || []).indexOf('aspirin') >= 0 ? 1 : 0; }, ['tx_obat']),
      '7b': h.kustom(function (c) { return (c.jawab('tx_obat') || []).indexOf('p2y12') >= 0 ? 1 : 0; }, ['tx_obat']),
      '7c': h.kustom(function (c) { return (c.jawab('tx_obat') || []).indexOf('ufh') >= 0 ? 1 : 0; }, ['tx_obat']),
      '7d': h.kustom(function (c) { return c.jawab('tx_reperfusi') === 'tepat' ? 1 : 0; }, ['tx_reperfusi']),
      '8a': h.kustom(function (c) { return c.sudah('interpretasi') && c.sudah('diagnosis') && c.sudah('tatalaksana') ? 1 : 0; }, ['interpretasi', 'diagnosis', 'tatalaksana']),
      '8b': h.kustom(function (c) { return c.jawab('tx_eskalasi') ? 1 : 0; }, ['tx_eskalasi'])
    },
    ideal: [
      { form: 'interpretasi', jawab: {
        laju: 75, irama: 'sinus', pr: 'normal', qrs: 'normal', qt: 'normal',
        st_naik: ['II', 'III', 'aVF'], kriteria: 'dua', morfologi: ['konveks', 'hiperakut'],
        st_turun: ['I', 'aVL'], resiprokal: 'ya' } },
      { form: 'diagnosis', jawab: { dx_jenis: 'stemi', dx_lokasi: 'inferior', dx_darurat: true } },
      { form: 'tatalaksana', jawab: { tx_obat: ['aspirin', 'p2y12', 'ufh'], tx_reperfusi: 'tepat', tx_eskalasi: true } }
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
