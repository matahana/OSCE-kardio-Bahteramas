/* Interaksi Stasiun 14 — Interpretasi EKG: blok AV derajat tiga dengan bradikardia tidak stabil.
   EKG sintetis (OSCE.logika.irama, irama 'blok_av3'): P teratur ± 90/menit, QRS pelarian lebar teratur ± 34/menit,
   tanpa hubungan tetap P–QRS. Data mengikuti stasiun/14-ekg-blok-av-total.md (bagian 3). Algoritme bradikardia
   (pacu transkutan, atropin, infus jembatan, penahanan obat penghambat nodus AV, pacu permanen) BELUM dicocokkan
   dengan teks ACC/AHA/HRS 2018 maupun AHA 2025 (wiki/guidelines-status.md). Dosis dan pengaturan pacu tidak dinilai. */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h;

  function ada(c, bidang, nilai) { return (c.jawab(bidang) || []).indexOf(nilai) >= 0; }
  function setelah(id, pesan) { return function (c) { return c.sudah(id) ? null : pesan; }; }
  function dalam(v, lo, hi) { v = Number(v); return isFinite(v) && v >= lo && v <= hi; }

  g.OSCE.daftar('14', {
    pasien: { nama: 'Ibu Marta', ringkas: '74 tahun, hipertensi; lemas, pusing, hampir pingsan sejak 3 jam', keadaan: 'Pucat, mengantuk, bingung ringan. EKG 12 sadapan dan strip ritme di hadapan Anda.' },
    tandaVital: [['TD', '78/48 mmHg'], ['Nadi', '34 x/menit'], ['Napas', '22 x/menit'], ['SpO₂', '94% udara ruang'], ['Suhu', '36,6 °C']],
    waktu: 480,
    petunjuk: 'Baca EKG (25 mm/detik, 10 mm/mV; sintetis, ilustrasi), lalu nilai stabilitas dan mulai tatalaksana. Data tambahan hanya muncul bila diminta. Dosis dan pengaturan pacu tidak dinilai.',
    widgetUtama: { nama: 'ekg', opsi: { irama: 'blok_av3', bpm: 34, bpmAtrium: 90, lebarQRS: 2.8, seed: 14 } },
    panel: [
      {
        id: 'interpretasi', label: '1. Interpretasi', tipe: 'form', biaya: 150,
        bidang: [
          { id: 'laju_atrium', label: 'Laju atrium (gelombang P)', tipe: 'number', satuan: 'x/menit', min: 20, max: 250 },
          { id: 'laju_ventrikel', label: 'Laju ventrikel (QRS)', tipe: 'number', satuan: 'x/menit', min: 10, max: 250 },
          { id: 'cara_hitung', label: 'Cara menghitung laju ventrikel', tipe: 'select', opsi: [
            ['kotak', 'Interval R–R: 300 dibagi jumlah kotak besar (irama teratur)'],
            ['qrs6', 'Jumlah QRS pada strip 6 detik × 10 (kasar, karena hanya beberapa kompleks)'],
            ['p_saja', 'Laju P dianggap sebagai laju nadi', { tidakTepat: 'Laju nadi mengikuti QRS, bukan P; keduanya berjalan sendiri-sendiri pada irama ini.' }]] },
          { id: 'hubungan', label: 'Hubungan gelombang P dan QRS', tipe: 'select', opsi: [
            ['disosiasi', 'Tidak ada hubungan tetap; PR bervariasi (disosiasi AV)'],
            ['pr_panjang', 'PR memanjang tetap, tiap P dihantar'],
            ['wenckebach', 'PR memanjang bertahap lalu satu P tidak dihantar'],
            ['mobitz2', 'PR tetap lalu satu P mendadak tidak dihantar'],
            ['normal', 'Tiap P diikuti QRS dengan PR normal']] },
          { id: 'qrs', label: 'Lebar QRS', tipe: 'select', opsi: [['lebar', 'Lebar (± 140 ms)'], ['sempit', 'Sempit (< 120 ms)']] },
          { id: 'asal_qrs', label: 'Asal QRS', tipe: 'select', opsi: [
            ['ventrikel', 'Ritme pelarian dari bawah nodus AV'],
            ['junctional', 'Pelarian junctional dari nodus AV', { tidakTepat: 'Pelarian junctional umumnya ber-QRS sempit; QRS lebar ± 140 ms mengarah ke pelarian lebih distal.' }],
            ['sinus', 'Irama sinus dengan blok cabang berkas', { tidakTepat: 'Gelombang P tidak dihantar ke ventrikel sehingga bukan irama sinus yang dihantar.' }]] },
          { id: 'st', label: 'Segmen ST dan T', tipe: 'multi', opsi: [
            ['tanpa_elevasi', 'Tanpa elevasi ST'],
            ['cari_inferior', 'Cari infark (terutama inferior) sebagai penyebab'],
            ['elevasi', 'Elevasi ST'],
            ['t_runcing', 'Gelombang T runcing tinggi']] },
          { id: 'dx', label: 'Diagnosis', tipe: 'select', opsi: [
            ['blok_av3', 'Blok AV derajat tiga (total) dengan ritme pelarian'],
            ['blok_av2', 'Blok AV derajat dua'],
            ['brady_sinus', 'Bradikardia sinus'],
            ['af_lambat', 'Fibrilasi atrium dengan respons ventrikel lambat'],
            ['junctional', 'Irama junctional']] },
          { id: 'pelarian_nilai', label: 'Keandalan ritme pelarian', tipe: 'select', opsi: [
            ['kurang_andal', 'Lambat dan lebar sehingga kurang andal; dapat berhenti sewaktu-waktu (asistol)'],
            ['stabil', 'Cukup andal dan tidak berbahaya', { berisiko: 'Pelarian lambat berQRS lebar tidak andal dan dapat berhenti (asistol); tanpa pacu risiko henti jantung.' }]] }
        ]
      },
      {
        id: 'penilaian', label: '2. Penilaian & persiapan', tipe: 'aksi',
        grup: [
          { judul: 'Stabilitas dan persiapan', aksi: [
            A('periksa_fisik', 'Periksa perfusi dan kesadaran: akral, waktu isi kapiler, GCS, JVP, paru.', 'Akral dingin, waktu isi kapiler 4 detik; GCS 14 (bingung ringan); JVP dengan gelombang a besar sesekali (cannon); ronki halus minimal di basis paru; tanpa edema.', 10),
            A('nyatakan_tidak_stabil', 'Nyatakan: bradikardia dengan tanda hipoperfusi (hipotensi, akral dingin, penurunan kesadaran); butuh tindakan segera.', 'Penguji mencatat: pasien tidak stabil.', 6,
              { syarat: setelah('periksa_fisik', 'Periksa perfusi dan kesadaran dulu.') }),
            A('tunggu_lab', 'Nyatakan pasien stabil dan tunggu laboratorium dan ekokardiografi dulu sebelum menyiapkan pacu.', 'Waktu berjalan; keadaan pasien belum membaik.', 25,
              { berisiko: 'Bradikardia dengan hipoperfusi adalah keadaan tidak stabil; menunda pacu menunggu hasil laboratorium berbahaya.' }),
            A('monitor_iv', 'Pasang monitor jantung dan akses IV.', 'Monitor terpasang: blok AV total, QRS lebar 34 x/menit; akses IV terpasang.', 8),
            A('siapkan_pacu_alat', 'Minta alat pacu transkutan/defibrilator dibawa ke sisi pasien.', 'Alat pacu transkutan disiapkan di sisi tempat tidur.', 8)
          ] },
          { judul: 'Anamnesis dan penyebab', aksi: [
            A('anamnesis_obat', 'Tanya obat dan riwayat: digoksin, antiaritmia, nyeri dada, penyakit jantung atau tiroid.', 'Bisoprolol 5 mg, amlodipin 5 mg, ramipril 5 mg. Tidak memakai digoksin atau antiaritmia. Tidak ada nyeri dada; satu kali hampir pingsan saat berdiri. Tidak ada penyakit jantung lain atau hipotiroid.', 8),
            A('sebut_penyebab', 'Sebutkan penyebab yang dapat dikoreksi: obat penghambat nodus AV (penyekat beta), hiperkalemia, iskemia/infark inferior, hipotiroid.', 'Penguji mencatat penyebab yang dicari.', 6)
          ] },
          { judul: 'Pemeriksaan penunjang', aksi: [
            A('lab_elektrolit', 'Elektrolit, kreatinin, glukosa, dan hemoglobin.', 'K 4,6 mmol/L · Na 138 · kreatinin 1,4 mg/dL · glukosa 126 mg/dL · Hb 12,2.', 6),
            A('troponin', 'Troponin.', 'Negatif.', 5),
            A('tsh', 'Fungsi tiroid (TSH).', 'TSH normal.', 5),
            A('echo', 'Ekokardiografi.', 'Akan dikerjakan di ruang rawat.', 6),
            A('foto_toraks', 'Foto toraks.', 'Kardiomegali ringan, kongesti minimal.', 6)
          ] }
        ]
      },
      {
        id: 'tatalaksana', label: '3. Tatalaksana', tipe: 'aksi',
        grup: [
          { judul: 'Pacu dan obat', aksi: [
            A('atropin', 'Beri atropin IV sambil menyiapkan pacu.', 'Setelah atropin, tidak ada perubahan laju.', 8,
              { syarat: setelah('monitor_iv', 'Pasang monitor dan akses IV dulu.') }),
            A('sebut_batas_atropin', 'Nyatakan: atropin mungkin tidak efektif pada blok di bawah nodus AV dengan QRS lebar; jangan menunda pacu.', 'Penguji mencatat keterbatasan atropin.', 6),
            A('atropin_berulang', 'Beri atropin berulang dan tunggu responsnya sebelum memutuskan pacu.', 'Laju tetap 34 x/menit; TD 76/46 mmHg.', 20,
              { berisiko: 'Menunggu respons atropin pada blok di bawah nodus AV dengan QRS lebar menunda pacu pada pasien tidak stabil.',
                syarat: setelah('atropin', 'Beri atropin sekali dulu.') }),
            A('pacu_transkutan', 'Mulai pacu jantung transkutan: pad terpasang, analgesia/sedasi sesuai kondisi.', 'Pad terpasang; pacu dimulai. Kompleks pacu muncul pada monitor.', 20,
              { syarat: setelah('siapkan_pacu_alat', 'Siapkan alat pacu dulu.') }),
            A('pastikan_tangkap', 'Pastikan penangkapan: kompleks pacu diikuti nadi teraba atau gelombang tekanan.', 'Nadi femoralis teraba setiap kompleks pacu; TD naik ke 96/58 mmHg.', 10,
              { syarat: setelah('pacu_transkutan', 'Pacu belum dimulai.') }),
            A('andalkan_monitor', 'Anggap pacu berhasil karena ada kompleks pacu pada monitor.', 'Anda tidak memeriksa nadi; kesadaran pasien tidak membaik.', 4,
              { tidakTepat: 'Kompleks pacu di monitor belum tentu disertai kontraksi; pastikan nadi teraba atau gelombang tekanan.',
                syarat: setelah('pacu_transkutan', 'Pacu belum dimulai.') }),
            A('infus_jembatan', 'Siapkan infus dopamin atau epinefrin sebagai jembatan bila atropin tidak efektif atau pacu belum bisa dipasang.', 'Infus dimulai; TD naik sedikit, laju tetap rendah.', 8,
              { syarat: setelah('siapkan_pacu_alat', 'Minta alat pacu disiapkan dulu.') })
          ] },
          { judul: 'Obat rumah dan penyebab', aksi: [
            A('tahan_obat', 'Tahan bisoprolol dan antihipertensi lain; koreksi penyebab yang ditemukan.', 'Obat ditahan; perawat mencatat.', 8),
            A('lanjut_obat_lama', 'Lanjutkan semua obat rumah (bisoprolol, amlodipin, ramipril) karena ada riwayat hipertensi.', 'Perawat: "Baik, Dok."', 4,
              { berisiko: 'Penyekat beta memperlambat konduksi AV dan antihipertensi memperburuk hipotensi; ditahan pada blok AV derajat tiga dengan hipoperfusi.' })
          ] },
          { judul: 'Pemantauan dan rencana lanjut', aksi: [
            A('pantau_respons', 'Pantau laju, TD, dan perfusi secara berkala dan evaluasi ulang.', 'Pasien lebih sadar; akral hangat. Evaluasi ulang dijadwalkan.', 8,
              { syarat: setelah('pacu_transkutan', 'Mulai tindakan dulu.') }),
            A('rencana_icu', 'Rencanakan pacu jantung sementara transvena; rawat di ICU/ICCU; konsultasi kardiologi atau elektrofisiologi.', 'Kardiolog jaga dihubungi; ICU/ICCU menerima.', 10),
            A('rencana_permanen', 'Nyatakan: blok AV derajat tiga tanpa penyebab reversibel umumnya memerlukan pacu jantung permanen.', 'Penguji mencatat.', 6)
          ] }
        ]
      },
      {
        id: 'komunikasi', label: '4. Presentasi & komunikasi', tipe: 'aksi',
        grup: [{ judul: 'Menyampaikan', aksi: [
          A('presentasi', 'Presentasikan sistematis: laju, irama, P, PR, QRS, ST; diagnosis; stabilitas dan tatalaksana.', 'Penguji: "Terima kasih. Presentasinya terstruktur."', 20,
            { syarat: setelah('interpretasi', 'Kirim jawaban interpretasi dulu.') }),
          A('presentasi_acak', 'Sampaikan temuan sesuai urutan yang terlintas, melompat antara EKG, obat, dan data.', 'Penguji tampak kesulitan mengikuti.', 12,
            { tidakTepat: 'Presentasi tidak sistematis menyulitkan serah terima.' }),
          A('lapor_senior', 'Lapor ringkas kepada senior/kardiolog jaga: kondisi, tindakan sejauh ini, dan rencana eskalasi.', 'Senior: "Baik, kita siapkan pacu transvena."', 10),
          A('jelaskan_pasien', 'Jelaskan kepada pasien dan keluarga dengan bahasa awam: denyut jantung terlalu lambat sehingga perlu alat pacu.', 'Keluarga: "Jadi jantungnya perlu dibantu alat, Dok?"', 12),
          A('minta_persetujuan', 'Minta persetujuan tindakan pemasangan alat pacu.', 'Keluarga menyetujui.', 8),
          A('jargon_pasien', 'Katakan: "Ibu mengalami complete heart block dengan ventricular escape rhythm."', 'Keluarga tampak bingung.', 6,
            { tidakTepat: 'Gunakan bahasa awam dan beri kesempatan bertanya.' })
        ] }]
      }
    ],
    acara: [],
    skor: {
      I1: h.kustom(function (c) {
        return dalam(c.jawab('laju_atrium'), 80, 100) && dalam(c.jawab('laju_ventrikel'), 28, 40) &&
          ['kotak', 'qrs6'].indexOf(c.jawab('cara_hitung')) >= 0 ? 1 : 0;
      }, ['laju_atrium', 'laju_ventrikel', 'cara_hitung']),
      I2: h.kustom(function (c) { return c.jawab('hubungan') === 'disosiasi' ? 1 : 0; }, ['hubungan']),
      I3: h.kustom(function (c) { return c.jawab('qrs') === 'lebar' && c.jawab('asal_qrs') === 'ventrikel' ? 1 : 0; }, ['qrs', 'asal_qrs']),
      I4: h.kustom(function (c) {
        return ada(c, 'st', 'tanpa_elevasi') && ada(c, 'st', 'cari_inferior') && !ada(c, 'st', 'elevasi') && !ada(c, 'st', 't_runcing') ? 1 : 0;
      }, ['st']),
      I5: h.kustom(function (c) { return c.jawab('dx') === 'blok_av3' ? 1 : 0; }, ['dx']),
      I6: h.kustom(function (c) { return c.jawab('pelarian_nilai') === 'kurang_andal' ? 1 : 0; }, ['pelarian_nilai']),
      I7: h.any(['presentasi']),
      J1: h.kustom(function (c) { return c.sudah('periksa_fisik') && c.sudah('nyatakan_tidak_stabil') && !c.sudah('tunggu_lab') ? 1 : 0; },
        ['periksa_fisik', 'nyatakan_tidak_stabil', 'tunggu_lab']),
      J2: h.all(['monitor_iv', 'siapkan_pacu_alat']),
      J3: h.all(['anamnesis_obat', 'sebut_penyebab']),
      J4: h.all(['lab_elektrolit', 'troponin', 'tsh', 'echo', 'foto_toraks']),
      K1: h.any(['pacu_transkutan']),
      K2: h.any(['sebut_batas_atropin']),
      K3: h.any(['infus_jembatan']),
      K4: h.kustom(function (c) { return c.sudah('tahan_obat') && !c.sudah('lanjut_obat_lama') ? 1 : 0; }, ['tahan_obat', 'lanjut_obat_lama']),
      K5: h.any(['rencana_icu']),
      K6: h.any(['rencana_permanen']),
      K7: h.kustom(function (c) { return c.sudah('pastikan_tangkap') && c.sudah('pantau_respons') && !c.sudah('andalkan_monitor') ? 1 : 0; },
        ['pastikan_tangkap', 'pantau_respons', 'andalkan_monitor']),
      L1: h.any(['lapor_senior']),
      L2: h.kustom(function (c) { return c.sudah('jelaskan_pasien') && c.sudah('minta_persetujuan') && !c.sudah('jargon_pasien') ? 1 : 0; },
        ['jelaskan_pasien', 'minta_persetujuan', 'jargon_pasien'])
    },
    ideal: [
      'periksa_fisik', 'nyatakan_tidak_stabil', 'monitor_iv', 'siapkan_pacu_alat',
      { form: 'interpretasi', jawab: {
        laju_atrium: 90, laju_ventrikel: 34, cara_hitung: 'kotak', hubungan: 'disosiasi', qrs: 'lebar', asal_qrs: 'ventrikel',
        st: ['tanpa_elevasi', 'cari_inferior'], dx: 'blok_av3', pelarian_nilai: 'kurang_andal' } },
      'atropin', 'sebut_batas_atropin', 'pacu_transkutan', 'pastikan_tangkap', 'infus_jembatan', 'tahan_obat', 'pantau_respons',
      'anamnesis_obat', 'sebut_penyebab', 'lab_elektrolit', 'troponin', 'tsh', 'echo', 'foto_toraks',
      'rencana_icu', 'rencana_permanen', 'presentasi', 'lapor_senior', 'jelaskan_pasien', 'minta_persetujuan'
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
