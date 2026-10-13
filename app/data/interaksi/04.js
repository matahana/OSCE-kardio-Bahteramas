/* Interaksi Stasiun 04 — Pengukuran tekanan darah (auskultasi).
   Tensimeter virtual: nilai sebenarnya 152/94 mmHg (stasiun/04-pengukuran-tekanan-darah.md).
   Ukuran manset memengaruhi pembacaan: kecil → lebih tinggi, besar → lebih rendah. */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h, L = g.OSCE.logika;

  var CFG = { sist: 152, dia: 94, hr: 75 };
  var ACARA = ['bp_baca', 'bp_palp_ok', 'bp_inflasi_ok', 'bp_laju_ok', 'bp_sist_ok', 'bp_dia_ok', 'bp_ok_keduanya'];

  function bacaIdeal(nomor, est) {
    var m = { sist: 152, dia: 94, maxP: est + 28, laju: 2.5, est: est };
    var rencana = [{ acara: 'bp_baca', nilai: m, info: { biaya: 45, label: 'Pengukuran #' + nomor, respons: 'Sistolik 152, diastolik 94 mmHg.' } }];
    L.bp(m, { sist: CFG.sist, dia: CFG.dia, bias: 0 }).forEach(function (id) { rencana.push({ acara: id }); });
    return rencana;
  }

  g.OSCE.daftar('04', {
    pasien: { nama: 'Ibu Sari', ringkas: '45 tahun, guru, sakit kepala ringan', keadaan: 'Kooperatif, sedikit cemas.' },
    tandaVital: [],
    waktu: 480,
    petunjuk: 'Urutan langkah penting: siapkan pasien, pilih dan pasang manset, palpasi lalu auskultasi di tensimeter virtual, ulangi, dan catat.',
    panel: [
      {
        id: 'persiapan', label: 'Persiapan', tipe: 'aksi',
        grup: [{ judul: 'Persiapan pasien dan alat', aksi: [
          A('salam', 'Selamat siang, Bu. Saya akan mengukur tekanan darah Ibu. Apakah Ibu bersedia?', 'Siang, Dok. Silakan.', 8),
          A('posisi_duduk', 'Dudukkan pasien nyaman: punggung bersandar, kaki menapak (tidak disilang), lengan ditopang setinggi jantung.', 'Ibu duduk bersandar, kaki menapak, lengan kiri di atas meja setinggi jantung.', 12,
            { eksklusif: 'posisi' }),
          A('posisi_berdiri', 'Ukur dengan pasien berdiri.', 'Ibu berdiri dengan lengan menggantung.', 8,
            { eksklusif: 'posisi', tidakTepat: 'Posisi dan lengan yang tidak setinggi jantung memengaruhi nilai.' }),
          A('tanya_kafein', 'Apakah Ibu minum kopi, merokok, atau berolahraga dalam 30 menit terakhir?', 'Tadi pagi, sekitar 20 menit lalu, saya minum kopi. Tidak merokok, tidak olahraga.', 10),
          A('istirahat', 'Istirahatkan pasien ≥ 5 menit tanpa bicara.', 'Ibu beristirahat 5 menit dalam diam.', 20),
          A('alat_kalibrasi', 'Pastikan alat terkalibrasi dan lengan terbuka tanpa pakaian ketat.', 'Alat diperiksa, jarum di nol. Lengan baju digulung longgar.', 8),
          A('bicara', 'Ajak pasien mengobrol santai saat mengukur.', 'Oh iya, Dok, kemarin anak saya…', 8,
            { tidakTepat: 'Bicara saat pengukuran dapat menaikkan tekanan darah.' })
        ] }]
      },
      {
        id: 'manset', label: 'Manset', tipe: 'aksi',
        grup: [
          { judul: 'Ukuran manset', aksi: [
            A('ukur_lingkar', 'Ukur lingkar lengan atas.', 'Lingkar lengan atas 29 cm.', 8),
            A('manset_kecil', 'Pakai manset ukuran kecil.', 'Manset kecil terpasang di lengan.', 6, { eksklusif: 'ukuran', tidakTepat: 'Manset terlalu kecil membuat pembacaan terlalu tinggi.' }),
            A('manset_standar', 'Pakai manset ukuran dewasa standar.', 'Manset standar terpasang di lengan.', 6, { eksklusif: 'ukuran' }),
            A('manset_besar', 'Pakai manset ukuran besar.', 'Manset besar terpasang di lengan.', 6, { eksklusif: 'ukuran', tidakTepat: 'Manset terlalu besar membuat pembacaan terlalu rendah.' })
          ] },
          { judul: 'Pemasangan', aksi: [
            A('manset_pasang', 'Pasang manset: tepi bawah 2–3 cm di atas lipat siku, bladder di atas a. brakialis.', 'Manset terpasang rapi, bladder tepat di atas arteri brakialis.', 8, { eksklusif: 'pasang' }),
            A('manset_rendah', 'Pasang manset menutupi lipat siku.', 'Manset menutupi lipat siku.', 6, { eksklusif: 'pasang', tidakTepat: 'Manset terlalu rendah mengganggu penempatan stetoskop.' }),
            A('stetoskop_brakialis', 'Letakkan kepala stetoskop di atas a. brakialis tanpa menyentuh manset atau selang.', 'Stetoskop berada di lipat siku, tidak menyentuh manset.', 6, { eksklusif: 'steto' }),
            A('stetoskop_manset', 'Letakkan stetoskop di bawah manset.', 'Stetoskop terselip di bawah manset.', 6, { eksklusif: 'steto', tidakTepat: 'Stetoskop di bawah manset menimbulkan artefak dan menekan arteri.' })
          ] }
        ]
      },
      {
        id: 'tensimeter', label: 'Tensimeter', tipe: 'widget', widget: 'tensimeter',
        catatan: 'Pompa manset, palpasi nadi radialis untuk estimasi sistolik, lalu auskultasi saat membuka katup. Tiap pengukuran memakan 45 detik simulasi.',
        opsi: {
          sist: CFG.sist, dia: CFG.dia, hr: CFG.hr,
          bias: function (ctx) { return ctx.sudah('manset_kecil') ? 10 : ctx.sudah('manset_besar') ? -8 : 0; },
          siap: function (ctx) {
            if (!ctx.salahSatu(['manset_kecil', 'manset_standar', 'manset_besar'])) return 'Pilih ukuran manset dulu.';
            if (!ctx.salahSatu(['manset_pasang', 'manset_rendah'])) return 'Pasang manset dulu.';
            if (!ctx.salahSatu(['stetoskop_brakialis', 'stetoskop_manset'])) return 'Letakkan stetoskop dulu.';
            return null;
          },
          biaya: 45
        }
      },
      {
        id: 'ulang', label: 'Ulang & lengan', tipe: 'aksi',
        grup: [{ judul: 'Pengulangan dan kedua lengan', aksi: [
          A('tunggu', 'Tunggu 1–2 menit dengan manset dikempeskan penuh sebelum mengulang.', 'Satu setengah menit berlalu; lengan pasien diistirahatkan.', 60),
          A('dua_lengan', 'Nyatakan: pada kunjungan pertama TD diukur di kedua lengan, dan lengan dengan nilai lebih tinggi dipakai selanjutnya.', 'Dicatat: lengan kanan akan diukur pada kunjungan ini; lengan lebih tinggi dipakai berikutnya.', 10)
        ] }]
      },
      {
        id: 'catat', label: 'Catat & interpretasi', tipe: 'form', biaya: 40,
        bidang: [
          { id: 'sist', label: 'Tekanan sistolik yang dicatat', tipe: 'number', satuan: 'mmHg', min: 50, max: 300 },
          { id: 'dia', label: 'Tekanan diastolik yang dicatat', tipe: 'number', satuan: 'mmHg', min: 30, max: 200 },
          { id: 'catat_apa', label: 'Yang dicantumkan pada catatan', tipe: 'multi', opsi: [
            ['rerata', 'Nilai rerata pengukuran'], ['lengan', 'Lengan yang diukur'], ['posisi', 'Posisi pasien'],
            ['manset', 'Ukuran manset'], ['waktu', 'Waktu pengukuran'], ['nama_dokter', 'Nama dokter pemeriksa']] },
          { id: 'klas', label: 'Klasifikasi hasil', tipe: 'select', opsi: [
            ['normal', 'Normal'], ['elevated', 'Meningkat (prahipertensi)'], ['ht', 'Hipertensi (TD kantor ≥ 140/90 mmHg)'], ['krisis', 'Krisis hipertensi']] },
          { id: 'acuan', label: 'Guideline acuan', tipe: 'select', opsi: [
            ['acc', 'ACC/AHA'], ['esc', 'ESC'], ['perki', 'PERKI'], ['tidak', 'Tidak menyebut acuan']] },
          { id: 'konfirmasi', label: 'Langkah konfirmasi diagnosis', tipe: 'multi', opsi: [
            ['hbpm', 'Pemantauan TD di rumah (HBPM)'], ['abpm', 'Pemantauan TD ambulatori 24 jam (ABPM)'], ['ulang', 'Pengukuran ulang pada kunjungan lain'],
            ['obat_langsung', 'Mulai obat sekarang tanpa konfirmasi', { tidakTepat: 'Diagnosis hipertensi perlu dikonfirmasi dahulu pada kebanyakan pasien.' }]] }
        ]
      },
      {
        id: 'komunikasi', label: 'Komunikasi', tipe: 'aksi',
        grup: [{ judul: 'Menyampaikan hasil', aksi: [
          A('jelaskan_awam', 'Sampaikan hasil dengan bahasa awam: tekanan darah Ibu tinggi saat ini, kita perlu memastikannya dengan pengukuran ulang. Untuk obat, keputusan menunggu konfirmasi dulu.', 'Oh begitu, Dok. Jadi belum tentu harus minum obat seumur hidup ya?', 20),
          A('edukasi', 'Edukasi: kurangi garam, aktif bergerak, jaga berat badan, hindari rokok; kontrol ulang, dan segera datang bila sakit kepala hebat, nyeri dada, sesak, atau lemah satu sisi.', 'Baik, Dok. Saya akan kurangi asin.', 20),
          A('rapikan', 'Bereskan alat, cuci tangan, tutup dengan sopan.', 'Terima kasih, Dok.', 10),
          A('jargon', 'Tensi Ibu hipertensi derajat dua.', 'Maksudnya apa, Dok?', 8, { tidakTepat: 'Memakai istilah teknis tanpa penjelasan.' })
        ] }]
      }
    ],
    acara: ACARA,
    skor: {
      A1: h.any(['salam']),
      A2: h.any(['posisi_duduk']),
      A3: h.all(['tanya_kafein', 'istirahat']),
      A4: h.any(['alat_kalibrasi']),
      B1: h.any(['manset_standar']),
      B2: h.any(['manset_pasang']),
      B3: h.any(['bp_palp_ok']),
      B4: h.any(['stetoskop_brakialis']),
      B5: h.any(['bp_inflasi_ok']),
      B6: h.any(['bp_laju_ok']),
      B7: h.any(['bp_ok_keduanya']),
      B8: h.kustom(function (c) {
        var s = Number(c.jawab('sist')), d = Number(c.jawab('dia'));
        return Number.isFinite(s) && Number.isFinite(d) && s % 2 === 0 && d % 2 === 0 ? 1 : 0;
      }, ['sist', 'dia']),
      B9: h.kustom(function (c) { return c.hitung('bp_baca') >= 2 && c.sudah('tunggu') ? 1 : 0; }, ['bp_baca', 'tunggu']),
      B10: h.any(['dua_lengan']),
      C1: h.kustom(function (c) {
        var dicatat = (c.jawab('catat_apa') || []).filter(function (x) { return x !== 'nama_dokter'; });
        return dicatat.length >= 4 ? 1 : 0;
      }, ['catat_apa']),
      C2: h.kustom(function (c) { return c.jawab('klas') === 'ht' && c.jawab('acuan') && c.jawab('acuan') !== 'tidak' ? 1 : 0; }, ['klas', 'acuan']),
      C3: h.kustom(function (c) {
        var k = c.jawab('konfirmasi') || [];
        return k.indexOf('hbpm') >= 0 || k.indexOf('abpm') >= 0 || k.indexOf('ulang') >= 0 ? 1 : 0;
      }, ['konfirmasi']),
      C4: h.any(['jelaskan_awam']),
      C5: h.any(['edukasi']),
      C6: h.any(['rapikan'])
    },
    ideal: [].concat(
      ['salam', 'posisi_duduk', 'tanya_kafein', 'istirahat', 'alat_kalibrasi', 'ukur_lingkar', 'manset_standar', 'manset_pasang', 'stetoskop_brakialis'],
      bacaIdeal(1, 150),
      ['tunggu'],
      bacaIdeal(2, 152),
      ['dua_lengan',
        { form: 'catat', jawab: { sist: 152, dia: 94, catat_apa: ['rerata', 'lengan', 'posisi', 'manset', 'waktu'], klas: 'ht', acuan: 'esc', konfirmasi: ['hbpm', 'ulang'] } },
        'jelaskan_awam', 'edukasi', 'rapikan']
    )
  });
})(typeof window !== 'undefined' ? window : globalThis);
