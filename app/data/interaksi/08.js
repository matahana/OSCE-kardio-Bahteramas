/* Interaksi Stasiun 08 — Interpretasi EKG: fibrilasi atrium respons ventrikel cepat.
   EKG sintetis (OSCE.logika.irama, irama 'fa'): R–R tidak teratur tanpa P, 130/menit, QRS sempit.
   Data mengikuti stasiun/08-ekg-fibrilasi-atrium.md (bagian 3). Alasan "tidak tepat/berisiko" untuk
   antikoagulasi, kendali laju, dan kardioversi sudah dicocokkan dengan teks lengkap ACC/AHA 2023
   (Joglar et al., PMC11095842; lihat wiki/guidelines-status.md). Dosis tidak dinilai. */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h;

  var PENCETUS = ['pencetus_tiroid', 'pencetus_infeksi', 'pencetus_alkohol', 'pencetus_anemia', 'pencetus_elektrolit'];
  var FAKTOR = ['tekanan_darah', 'gula', 'berat', 'alkohol', 'apnea'];

  function ada(c, bidang, nilai) { return (c.jawab(bidang) || []).indexOf(nilai) >= 0; }

  g.OSCE.daftar('08', {
    pasien: { nama: 'Ibu Sumiati', ringkas: '72 tahun, hipertensi dan diabetes tipe 2; berdebar dan mudah lelah sejak ± 10 jam', keadaan: 'Duduk, sadar penuh, tampak cemas. EKG 12 sadapan dengan strip ritme di hadapan Anda.' },
    tandaVital: [['TD', '124/78 mmHg'], ['Nadi', '130 x/menit, tidak teratur'], ['Napas', '20 x/menit'], ['SpO₂', '97% udara ruang'], ['Suhu', '36,8 °C']],
    waktu: 480,
    petunjuk: 'Baca EKG (25 mm/detik, 10 mm/mV; sintetis, ilustrasi). Kirim jawaban interpretasi dan tatalaksana (masing-masing sekali), dan minta data yang Anda perlukan pada tab Penilaian.',
    widgetUtama: { nama: 'ekg', opsi: {
      irama: 'fa', bpm: 130, seed: 46,
      sadapan: { I: { st: -0.05 }, aVL: { st: -0.05 }, V4: { st: -0.09, t: 0.12 }, V5: { st: -0.1, t: 0.1 }, V6: { st: -0.09, t: 0.1 } }
    } },
    panel: [
      {
        id: 'interpretasi', label: '1. Interpretasi', tipe: 'form', biaya: 150,
        bidang: [
          { id: 'laju', label: 'Laju ventrikel', tipe: 'number', satuan: 'x/menit', min: 20, max: 250 },
          { id: 'cara_hitung', label: 'Cara menghitung laju pada irama ini', tipe: 'select', opsi: [
            ['qrs6', 'Jumlah QRS pada strip 6 detik × 10'],
            ['rr1', 'Satu interval R–R (300 dibagi jumlah kotak besar)', { tidakTepat: 'Pada irama tidak teratur satu interval R–R menyesatkan; hitung QRS pada strip 6 detik × 10.' }],
            ['p', 'Menghitung gelombang P', { tidakTepat: 'Tidak ada gelombang P yang dapat dihitung pada irama ini.' }]] },
          { id: 'keteraturan', label: 'Keteraturan irama', tipe: 'select', opsi: [
            ['teratur', 'Teratur'], ['ireguler_total', 'Ireguler total (*irregularly irregular*)'], ['ireguler_pola', 'Ireguler berpola (grup)']] },
          { id: 'gel_p', label: 'Gelombang P dan garis dasar', tipe: 'select', opsi: [
            ['ada', 'Gelombang P jelas sebelum tiap QRS'], ['tidak_fib', 'Tidak ada gelombang P; garis dasar berfibrilasi'], ['gergaji', 'Gelombang flutter bentuk gigi gergaji']] },
          { id: 'qrs', label: 'Kompleks QRS', tipe: 'select', opsi: [['sempit', 'Sempit (< 120 ms)'], ['lebar', 'Lebar (≥ 120 ms)']] },
          { id: 'sumbu', label: 'Sumbu QRS', tipe: 'select', opsi: [['normal', 'Normal'], ['kiri', 'Deviasi ke kiri'], ['kanan', 'Deviasi ke kanan']] },
          { id: 'st', label: 'Segmen ST', tipe: 'multi', opsi: [
            ['tanpa_elevasi', 'Tanpa elevasi ST'],
            ['depresi_lateral', 'Depresi ST lateral ringan, konsisten dengan laju cepat'],
            ['elevasi', 'Elevasi ST'],
            ['singkir_iskemia', 'Iskemia belum dapat disingkirkan; nilai troponin dan klinis']] },
          { id: 'dx', label: 'Diagnosis', tipe: 'select', opsi: [
            ['fa_rvr', 'Fibrilasi atrium dengan respons ventrikel cepat'], ['flutter', 'Flutter atrium'], ['svt', 'Takikardia supraventrikular'],
            ['sinus_takikardia', 'Sinus takikardia'], ['vt', 'Takikardia ventrikel']] }
        ]
      },
      {
        id: 'penilaian', label: '2. Penilaian', tipe: 'aksi',
        grup: [
          { judul: 'Stabilitas dan stabilisasi', aksi: [
            A('stabil_nilai', 'Nilai stabilitas hemodinamik: tekanan darah, nyeri dada, tanda edema paru, kesadaran.', 'TD 124/78, nadi 130 tidak teratur, SpO₂ 97%; tidak ada nyeri dada atau sesak berat; sadar penuh. Pasien stabil.', 10),
            A('kriteria_dc', 'Nyatakan: bila tidak stabil (hipotensi, nyeri dada iskemik, edema paru, penurunan kesadaran), lakukan kardioversi listrik sinkron segera.', 'Dicatat oleh penguji.', 8),
            A('monitor_iv', 'Pasang monitor jantung dan akses IV.', 'Monitor terpasang: AF 130 x/menit; akses IV terpasang.', 8)
          ] },
          { judul: 'Anamnesis: pencetus dan katup', aksi: [
            A('pencetus_tiroid', 'Tanyakan gejala tirotoksikosis: tremor, penurunan berat badan, tidak tahan panas.', 'Tidak ada.', 6),
            A('pencetus_infeksi', 'Tanyakan demam, batuk, atau infeksi.', 'Tidak demam dan tidak ada infeksi.', 6),
            A('pencetus_alkohol', 'Tanyakan konsumsi alkohol.', 'Tidak minum alkohol.', 6),
            A('pencetus_anemia', 'Tanyakan perdarahan atau tanda anemia.', 'Tidak ada perdarahan; Hb nanti diperiksa.', 6),
            A('pencetus_elektrolit', 'Tanyakan muntah, diare, atau pemakaian diuretik (gangguan elektrolit).', 'Tidak ada.', 6),
            A('tanya_katup', 'Tanyakan riwayat stenosis mitral sedang–berat atau katup mekanik.', 'Tidak ada stenosis mitral atau katup mekanik yang diketahui. Tidak ada riwayat stroke atau perdarahan.', 8),
            A('cari_iskemia_rutin', 'Lakukan uji iskemia dan CT angiografi paru pada semua pasien fibrilasi atrium baru.', 'Pemeriksaan dijadwalkan; penguji mencatat tidak ada gejala atau tanda yang mengarah ke iskemia atau emboli paru.', 15,
              { tidakTepat: 'Tanpa gejala atau tanda, pemeriksaan iskemia/ACS/emboli paru rutin pada AF baru tidak bermanfaat (ACC/AHA 2023, Class 3: No benefit).' })
          ] },
          { judul: 'Pemeriksaan penunjang', aksi: [
            A('lab_darah', 'Hitung darah lengkap.', 'Hb 12,6 g/dL.', 8),
            A('lab_elektrolit', 'Elektrolit (termasuk magnesium) dan kreatinin.', 'K 4,0 · Mg 2,0 · Na 138 · kreatinin 1,1 mg/dL.', 8),
            A('lab_tiroid', 'Fungsi tiroid (TSH).', 'TSH normal.', 8),
            A('echo_tt', 'Ekokardiografi transtorasik (segera atau pada rawat inap).', 'Akan dikerjakan di ruang rawat.', 8),
            A('troponin', 'Troponin (karena depresi ST lateral).', 'Negatif.', 8)
          ] }
        ]
      },
      {
        id: 'tatalaksana', label: '3. Tatalaksana', tipe: 'form', biaya: 100,
        bidang: [
          { id: 'kendali_laju', label: 'Kendali laju pada pasien stabil', tipe: 'multi', opsi: [
            ['bb', 'Penyekat beta'],
            ['ccb_nondhp', 'CCB non-dihidropiridin (diltiazem/verapamil), bila EF > 40%'],
            ['digoksin', 'Digoksin'],
            ['amiodaron', 'Amiodaron IV'],
            ['adenosin', 'Adenosin', { tidakTepat: 'Adenosin bukan obat kendali laju AF dan tidak menghentikan AF.' }]] },
          { id: 'ccb_catatan', label: 'Catatan keselamatan', tipe: 'cek', teks: 'CCB non-dihidropiridin IV tidak diberikan pada disfungsi sistolik LV sedang–berat, dengan atau tanpa gagal jantung dekompensasi (alternatif: digoksin, atau amiodaron IV pada pasien kritis).' },
          { id: 'skor_cha', label: 'Skor risiko stroke (CHA₂DS₂-VASc atau CHA₂DS₂-VA)', tipe: 'number', satuan: 'poin', min: 0, max: 9 },
          { id: 'antikoagulan', label: 'Pencegahan stroke', tipe: 'select', opsi: [
            ['doac', 'Antikoagulan oral jangka panjang, DOAC (tanpa stenosis mitral sedang–berat atau katup mekanik)'],
            ['warfarin', 'Antikoagulan oral jangka panjang, warfarin (target INR 2–3)'],
            ['aspirin', 'Aspirin saja', { tidakTepat: 'Aspirin sendiri atau dengan klopidogrel sebagai pengganti antikoagulan tidak dianjurkan (ACC/AHA 2023, Class 3: Harm).' }],
            ['tidak', 'Tidak perlu antikoagulan', { berisiko: 'Perempuan dengan CHA₂DS₂-VASc ≥ 3 memerlukan antikoagulasi (ACC/AHA 2023, Class 1); tanpa itu risiko stroke tinggi.' }]] },
          { id: 'kardioversi', label: 'Strategi ritme', tipe: 'select', opsi: [
            ['tunda', 'Tidak kardioversi elektif sebelum antikoagulasi memadai atau trombus disingkirkan; kontrol ritme diputuskan bersama kardiolog; rawat atau konsultasi'],
            ['segera', 'Kardioversi listrik elektif sekarang', { berisiko: 'Antikoagulasi terapeutik harus terbentuk sebelum kardioversi dan dilanjutkan ≥ 4 minggu (ACC/AHA 2023, Class 1); kardioversi elektif tanpa itu berisiko tromboemboli.' }],
            ['obat_segera', 'Kardioversi farmakologis sekarang tanpa antikoagulan', { berisiko: 'Kardioversi farmakologis memiliki risiko tromboemboli yang sama; antikoagulasi harus diatur lebih dulu.' }]] },
          { id: 'faktor', label: 'Faktor risiko dan tindak lanjut', tipe: 'multi', opsi: [
            ['tekanan_darah', 'Pengendalian tekanan darah'], ['gula', 'Pengendalian gula darah'], ['berat', 'Berat badan'], ['alkohol', 'Alkohol'],
            ['apnea', 'Skrining apnea tidur'], ['kepatuhan', 'Edukasi kepatuhan antikoagulan']] }
        ]
      },
      {
        id: 'presentasi', label: '4. Presentasi', tipe: 'aksi',
        grup: [{ judul: 'Menyampaikan kepada penguji', aksi: [
          A('presentasi', 'Presentasikan secara sistematis dan ringkas: laju, irama, P, QRS, sumbu, ST; diagnosis; penilaian stabilitas dan pencetus; rencana kendali laju, antikoagulasi, dan strategi ritme.',
            'Penguji: "Terima kasih. Presentasinya terstruktur."', 20,
            { syarat: function (c) { return c.sudah('interpretasi') && c.sudah('tatalaksana') ? null : 'Kirim jawaban interpretasi dan tatalaksana dulu.'; } }),
          A('presentasi_acak', 'Sampaikan temuan sesuai urutan yang terlintas, melompat antara EKG, obat, dan pemeriksaan.', 'Penguji tampak kesulitan mengikuti.', 12,
            { tidakTepat: 'Presentasi tidak sistematis menyulitkan serah terima.' })
        ] }]
      }
    ],
    acara: [],
    skor: {
      I1: h.kustom(function (c) { var v = Number(c.jawab('laju')); return Math.abs(v - 130) <= 10 ? 1 : 0; }, ['laju']),
      I2: h.kustom(function (c) { return c.jawab('cara_hitung') === 'qrs6' ? 1 : 0; }, ['cara_hitung']),
      I3: h.kustom(function (c) { return c.jawab('keteraturan') === 'ireguler_total' ? 1 : 0; }, ['keteraturan']),
      I4: h.kustom(function (c) { return c.jawab('gel_p') === 'tidak_fib' ? 1 : 0; }, ['gel_p']),
      I5: h.kustom(function (c) { return c.jawab('qrs') === 'sempit' ? 1 : 0; }, ['qrs']),
      I6: h.kustom(function (c) { return c.jawab('sumbu') === 'normal' ? 1 : 0; }, ['sumbu']),
      I7: h.kustom(function (c) {
        return ada(c, 'st', 'tanpa_elevasi') && ada(c, 'st', 'depresi_lateral') && ada(c, 'st', 'singkir_iskemia') && !ada(c, 'st', 'elevasi') ? 1 : 0;
      }, ['st']),
      I8: h.kustom(function (c) { return c.jawab('dx') === 'fa_rvr' ? 1 : 0; }, ['dx']),
      J1: h.all(['stabil_nilai', 'kriteria_dc']),
      J2: h.count(PENCETUS, [[3, 1]]),
      J3: h.all(['lab_darah', 'lab_elektrolit', 'lab_tiroid', 'echo_tt']),
      J4: h.any(['monitor_iv']),
      J5: h.any(['tanya_katup']),
      K1: h.kustom(function (c) { return ada(c, 'kendali_laju', 'bb') || ada(c, 'kendali_laju', 'ccb_nondhp') ? 1 : 0; }, ['kendali_laju']),
      K2: h.kustom(function (c) { return c.jawab('ccb_catatan') ? 1 : 0; }, ['ccb_catatan']),
      K3: h.kustom(function (c) { var v = Number(c.jawab('skor_cha')); return v === 4 || v === 3 ? 1 : 0; }, ['skor_cha']),
      K4: h.kustom(function (c) { return c.jawab('antikoagulan') === 'doac' ? 1 : 0; }, ['antikoagulan']),
      K5: h.kustom(function (c) { return c.jawab('kardioversi') === 'tunda' ? 1 : 0; }, ['kardioversi']),
      L1: h.any(['presentasi']),
      L2: h.kustom(function (c) {
        var f = c.jawab('faktor') || [];
        var n = FAKTOR.filter(function (x) { return f.indexOf(x) >= 0; }).length;
        return f.indexOf('kepatuhan') >= 0 && n >= 3 ? 1 : 0;
      }, ['faktor'])
    },
    ideal: [
      { form: 'interpretasi', jawab: {
        laju: 130, cara_hitung: 'qrs6', keteraturan: 'ireguler_total', gel_p: 'tidak_fib', qrs: 'sempit', sumbu: 'normal',
        st: ['tanpa_elevasi', 'depresi_lateral', 'singkir_iskemia'], dx: 'fa_rvr' } },
      'stabil_nilai', 'kriteria_dc', 'monitor_iv',
      'pencetus_tiroid', 'pencetus_infeksi', 'pencetus_alkohol', 'tanya_katup',
      'lab_darah', 'lab_elektrolit', 'lab_tiroid', 'echo_tt',
      { form: 'tatalaksana', jawab: {
        kendali_laju: ['bb'], ccb_catatan: true, skor_cha: 4, antikoagulan: 'doac', kardioversi: 'tunda',
        faktor: ['tekanan_darah', 'gula', 'berat', 'apnea', 'kepatuhan'] } },
      'presentasi'
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
