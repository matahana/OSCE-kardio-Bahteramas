/* Interaksi Stasiun 05 — BLS henti jantung dewasa + AED.
   Aplikasi menilai urutan algoritma, pilihan parameter RJP, dan ritme kompresi (uji ketukan).
   Teknik fisik (posisi tangan, kedalaman nyata) tetap harus dilatih dengan manikin.
   Skenario mengikuti stasiun/05-bls-henti-jantung.md (bagian 2–3). */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h, L = g.OSCE.logika;

  var AED_TIBA = 45; // detik setelah AED diminta
  function aedSiap(ctx) {
    if (!ctx.sudah('tunjuk_aed')) return 'Belum ada AED di tangan; minta seseorang mengambilnya.';
    if (ctx.terpakai < ctx.waktuAksi('tunjuk_aed') + AED_TIBA) return 'AED belum tiba. Lanjutkan kompresi dada.';
    return null;
  }
  function timTiba(ctx) { return ctx.sudah('tim_tiba') ? null : 'Tim ACLS belum tiba. Lanjutkan RJP.'; }

  g.OSCE.daftar('05', {
    pasien: { nama: 'Pria dewasa (manikin)', ringkas: 'Kolaps tiba-tiba di ruang tunggu poliklinik jantung', keadaan: 'Tergeletak telentang, tidak bergerak. Belum ada orang yang menolong.' },
    tandaVital: [],
    waktu: 480,
    petunjuk: 'Waktu berjalan sesuai lamanya tindakan. AED tiba ± 45 detik setelah diminta. Tim ACLS tiba pada menit ke-6.',
    panel: [
      {
        id: 'penilaian', label: 'Penilaian', tipe: 'aksi',
        grup: [{ judul: 'Keamanan, respons, dan bantuan', aksi: [
          A('aman', 'Pastikan lokasi aman bagi penolong dan pasien.', 'Lokasi aman; tidak ada bahaya di sekitar.', 5),
          A('respons', 'Periksa respons: tepuk bahu dan panggil.', 'Tidak ada respons.', 6),
          A('tunjuk_bantuan', 'Tunjuk orang: "Bapak berbaju biru, aktifkan kode biru dan panggil bantuan!"', 'Baik, Dok!', 6),
          A('tunjuk_aed', 'Tunjuk orang lain: "Ibu berkerudung, ambilkan AED sekarang!"', 'Baik, Dok! Saya cari AED.', 6),
          A('closed_loop', 'Minta konfirmasi: "Tolong ulangi perintah saya."', '"Panggil bantuan dan ambil AED, Dok."', 4),
          A('instruksi_tenang', 'Beri instruksi singkat dan tenang kepada orang sekitar: beri ruang, bantu AED.', 'Orang-orang menjauh memberi ruang.', 6),
          A('cek_napas_nadi', 'Periksa napas dan nadi karotis bersamaan (≤ 10 detik).', 'Tidak bernapas normal (gasping). Nadi karotis tidak teraba.', 10),
          A('nyatakan_henti', 'Nyatakan: pasien henti jantung.', 'Henti jantung dikonfirmasi.', 3),
          A('teriak', 'Berteriak "Tolong!" tanpa menunjuk siapa pun.', 'Orang-orang menoleh, tetapi tidak ada yang bergerak.', 4,
            { tidakTepat: 'Tanpa penugasan yang jelas, tidak ada yang bertindak.' }),
          A('cek_lama', 'Periksa nadi saja selama 30 detik.', 'Nadi karotis tidak teraba.', 30,
            { tidakTepat: 'Penundaan RJP; pemeriksaan napas/nadi maksimal 10 detik.' }),
          A('telepon_sendiri', 'Tinggalkan pasien untuk menelepon sendiri.', 'Anda kembali setelah beberapa menit.', 30,
            { tidakTepat: 'Meninggalkan pasien menunda RJP; tunjuk orang lain.' })
        ] }]
      },
      {
        id: 'teknik', label: 'Teknik RJP', tipe: 'form', biaya: 40,
        catatan: 'Pilih parameter RJP berkualitas tinggi. Laju kompresi diuji terpisah pada "Uji ritme".',
        bidang: [
          { id: 'posisi_pasien', label: 'Posisi pasien', tipe: 'select', opsi: [['keras', 'Telentang pada permukaan keras'], ['kasur', 'Telentang di kasur empuk'], ['miring', 'Miring']] },
          { id: 'posisi_tangan', label: 'Posisi tangan', tipe: 'select', opsi: [['sternum_bawah', 'Setengah bawah sternum'], ['xifoid', 'Ulu hati (prosesus xifoid)'], ['sternum_atas', 'Sepertiga atas sternum']] },
          { id: 'postur', label: 'Postur penolong', tipe: 'select', opsi: [['lurus', 'Lengan lurus, bahu tepat di atas dada'], ['tekuk', 'Siku menekuk, bahu menjauh dari dada']] },
          { id: 'kedalaman', label: 'Kedalaman kompresi', tipe: 'select', opsi: [['dangkal', '3–4 cm'], ['5_6', '5–6 cm'], ['dalam', '7–8 cm']] },
          { id: 'recoil', label: 'Antar kompresi', tipe: 'select', opsi: [['penuh', 'Biarkan dada recoil penuh'], ['sandar', 'Tetap bersandar di dada']] },
          { id: 'interupsi', label: 'Lama jeda kompresi (interupsi)', tipe: 'select', opsi: [['kurang10', '< 10 detik'], ['30', '± 30 detik'], ['nadi', 'Berhenti tiap 5 siklus untuk cek nadi']] },
          { id: 'rasio', label: 'Rasio kompresi:ventilasi (tanpa jalan napas lanjut)', tipe: 'select', opsi: [['30_2', '30:2'], ['15_2', '15:2'], ['5_1', '5:1']] },
          { id: 'jalan_napas', label: 'Membuka jalan napas', tipe: 'select', opsi: [['htcl', 'Head tilt–chin lift'], ['angkat_kepala', 'Mengangkat kepala tanpa chin lift'], ['fleksi', 'Fleksi leher']] },
          { id: 'ventilasi', label: 'Ventilasi', tipe: 'select', opsi: [['1dtk', '± 1 detik per tiupan, dada terangkat'], ['3dtk', 'Tiupan kuat 3 detik'], ['cepat', 'Tiupan cepat berulang']] }
        ]
      },
      {
        id: 'ketuk', label: 'Uji ritme', tipe: 'widget', widget: 'ketuk',
        catatan: 'Ketuk tombol (atau tekan spasi) mengikuti ritme kompresi yang Anda yakini benar selama 15 detik. Latihan boleh memakai metronom; uji tidak.',
        opsi: { durasi: 15, minimal: 20, biaya: 20, target: [100, 120] }
      },
      {
        id: 'rjp', label: 'RJP & AED', tipe: 'aksi',
        grup: [
          { judul: 'Kompresi dada', aksi: [
            A('rjp_blok1', 'Lakukan RJP berkualitas selama 1 menit sambil menunggu AED.', 'RJP 1 menit berjalan; siklus 30:2.', 60,
              { syarat: function (c) { return c.sudah('nyatakan_henti') ? null : 'Pastikan henti jantung dulu (periksa napas dan nadi).'; } }),
            A('ganti_penolong', 'Minta orang lain menggantikan kompresi (tiap ± 2 menit).', 'Penolong lain mengambil alih kompresi.', 6),
            A('rjp_lanjut', 'Lanjutkan RJP 1 menit lagi.', 'RJP berlanjut tanpa jeda berarti.', 60,
              { sekali: false, syarat: function (c) { return c.sudah('nyatakan_henti') ? null : 'Pastikan henti jantung dulu.'; } })
          ] },
          { judul: 'AED', aksi: [
            A('aed_nyala', 'Nyalakan AED dan ikuti instruksinya.', 'AED menyala: "Pasang pad pada dada pasien."', 5, { syarat: aedSiap }),
            A('pad_benar', 'Pasang pad: infraklavikula kanan dan apeks kiri; dada kering.', 'Pad terpasang. AED: "Jangan sentuh pasien. Menganalisis irama."', 10,
              { eksklusif: 'pad', syarat: function (c) { return c.sudah('aed_nyala') ? null : 'Nyalakan AED dulu.'; } }),
            A('pad_salah', 'Pasang pad di punggung dan perut.', 'AED: "Periksa pad."', 10,
              { eksklusif: 'pad', tidakTepat: 'Posisi pad salah; analisis dan syok tidak efektif.', syarat: function (c) { return c.sudah('aed_nyala') ? null : 'Nyalakan AED dulu.'; } }),
            A('aed_clear', 'Seru "Semua menjauh!" dan pastikan tak ada yang menyentuh pasien saat analisis.', 'AED: "Syok disarankan. Menjauh dari pasien."', 6,
              { syarat: function (c) { return c.sudah('pad_benar') ? null : 'Pasang pad dengan benar dulu.'; } }),
            A('syok', 'Tekan tombol syok.', 'Syok diberikan. Segera lanjutkan kompresi.', 6,
              { syarat: function (c) { return c.sudah('aed_clear') ? null : 'AED belum menganalisis irama.'; } }),
            A('cek_nadi_pascasyok', 'Periksa nadi segera setelah syok.', 'Nadi tidak teraba; 20 detik terbuang.', 20,
              { tidakTepat: 'Setelah syok langsung lanjutkan kompresi 2 menit; jangan cek nadi.', syarat: function (c) { return c.sudah('syok') ? null : 'Belum ada syok.'; } }),
            A('rjp_pascasyok', 'Lanjutkan kompresi segera setelah syok (2 menit).', 'RJP 2 menit setelah syok berjalan.', 120,
              { syarat: function (c) { return c.sudah('syok') ? null : 'Belum ada syok untuk dilanjutkan.'; } }),
            A('aed_analisis2', 'Nilai ulang irama: biarkan AED menganalisis lagi.', 'AED: "Syok tidak disarankan. Lanjutkan RJP."', 10,
              { syarat: function (c) { return c.sudah('rjp_pascasyok') ? null : 'Belum waktunya analisis ulang (setelah ± 2 menit RJP).'; } })
          ] },
          { judul: 'Serah terima', aksi: [
            A('serah_terima', 'Serah terima ke tim ACLS: waktu henti, durasi RJP, jumlah syok, irama.', 'Tim: "Baik, kami ambil alih."', 15, { syarat: timTiba }),
            A('serah_terima_kosong', 'Katakan: "Ini pasien tadi jatuh."', 'Tim: "Sudah berapa lama? Berapa kali disyok?" Anda tidak tahu.', 10,
              { tidakTepat: 'Serah terima tanpa data waktu, durasi RJP, syok, dan irama.', syarat: timTiba })
          ] }
        ]
      }
    ],
    jadwal: [{ pada: 360, id: 'tim_tiba', pesan: 'Tim ACLS tiba. Silakan serah terima.' }],
    acara: ['rjp_laju', 'rjp_laju_ok'],
    skor: {
      A1: h.any(['aman']),
      A2: h.any(['respons']),
      A3: h.all(['tunjuk_bantuan', 'tunjuk_aed']),
      A4: h.any(['cek_napas_nadi']),
      A5: h.any(['nyatakan_henti']),
      B1: h.kustom(function (c) { return c.jawab('posisi_pasien') === 'keras' ? 1 : 0; }, ['posisi_pasien']),
      B2: h.kustom(function (c) { return c.jawab('posisi_tangan') === 'sternum_bawah' ? 1 : 0; }, ['posisi_tangan']),
      B3: h.kustom(function (c) { return c.jawab('postur') === 'lurus' ? 1 : 0; }, ['postur']),
      B4: h.any(['rjp_laju_ok']),
      B5: h.kustom(function (c) { return c.jawab('kedalaman') === '5_6' ? 1 : 0; }, ['kedalaman']),
      B6: h.kustom(function (c) { return c.jawab('recoil') === 'penuh' ? 1 : 0; }, ['recoil']),
      B7: h.kustom(function (c) { return c.jawab('interupsi') === 'kurang10' ? 1 : 0; }, ['interupsi']),
      B8: h.kustom(function (c) { return c.jawab('rasio') === '30_2' ? 1 : 0; }, ['rasio']),
      B9: h.kustom(function (c) { return c.jawab('jalan_napas') === 'htcl' ? 1 : 0; }, ['jalan_napas']),
      B10: h.kustom(function (c) { return c.jawab('ventilasi') === '1dtk' ? 1 : 0; }, ['ventilasi']),
      C1: h.any(['aed_nyala']),
      C2: h.any(['pad_benar']),
      C3: h.any(['aed_clear']),
      C4: h.any(['syok']),
      C5: h.any(['rjp_pascasyok']),
      C6: h.any(['aed_analisis2']),
      D1: h.all(['tunjuk_bantuan', 'tunjuk_aed', 'closed_loop']),
      D2: h.any(['instruksi_tenang']),
      D3: h.any(['serah_terima']),
      D4: h.any(['ganti_penolong'])
    },
    ideal: [].concat(
      ['aman', 'respons', 'tunjuk_bantuan', 'tunjuk_aed', 'closed_loop', 'cek_napas_nadi', 'nyatakan_henti', 'instruksi_tenang',
        { form: 'teknik', jawab: {
          posisi_pasien: 'keras', posisi_tangan: 'sternum_bawah', postur: 'lurus', kedalaman: '5_6', recoil: 'penuh',
          interupsi: 'kurang10', rasio: '30_2', jalan_napas: 'htcl', ventilasi: '1dtk' } },
        { acara: 'rjp_laju', nilai: 110, info: { biaya: 20, label: 'Uji ritme kompresi', respons: 'Laju Anda 110 x/menit (target 100–120).' } }],
      L.ketuk(110).map(function (id) { return { acara: id }; }),
      ['rjp_blok1', 'aed_nyala', 'pad_benar', 'aed_clear', 'syok', 'rjp_pascasyok', 'aed_analisis2', 'ganti_penolong', 'rjp_lanjut', 'serah_terima']
    )
  });
})(typeof window !== 'undefined' ? window : globalThis);
