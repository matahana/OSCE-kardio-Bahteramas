/* Interaksi Stasiun 12 — ACLS: henti jantung irama tidak dapat disyok (asistol/PEA), hiperkalemia.
   Pemimpin tim menjalankan algoritme lewat perintah; jam simulasi dipadatkan (satu siklus RJP 2 menit ≈ 45 detik
   waktu simulasi), jadi yang dinilai adalah urutan dan keputusan, bukan lamanya. Irama mengikuti jumlah siklus:
   asistol (cek 1–2) → PEA (cek 3) → ROSC pada cek berikutnya bila kalsium IV sudah diberikan sebelum cek itu.
   Skenario mengikuti stasiun/12-acls-asistol-pea.md (bagian 2–3). Dosis tidak dinilai. Alasan "tidak tepat/berisiko"
   (syok pada asistol/PEA, atropin, antiaritmia, hiperventilasi, insulin tanpa dekstrosa) belum dicocokkan dengan
   teks AHA 2025 (lihat wiki/guidelines-status.md). */
(function (g) {
  'use strict';
  var A = g.OSCE.A, h = g.OSCE.h;

  var T_MENURUN = 150; // detik simulasi: kualitas kompresi menurun
  var BIAYA_KOREKSI = 5;

  function setelah(id, pesan) { return function (c) { return c.sudah(id) ? null : pesan; }; }
  function ada(c, bidang, nilai) { return (c.jawab(bidang) || []).indexOf(nilai) >= 0; }

  function waktuKalsium(c) { return c.waktuAksi('kalsium_klorida') || c.waktuAksi('kalsium_glukonat') || 0; }
  // ROSC terjadi pada cek irama ke-4/ke-5 bila kalsium IV sudah diberikan sebelum cek itu
  function roscPada(c, k) {
    var t = waktuKalsium(c);
    return !!t && c.sudah('cek_irama_' + k) && t < c.waktuAksi('cek_irama_' + k);
  }
  function rosc(c) { return roscPada(c, 4) || roscPada(c, 5); }
  function belumRosc(c) { return rosc(c) ? 'Sudah ROSC; tidak perlu siklus RJP lagi.' : null; }
  function setelahRosc(c) { return rosc(c) ? null : 'Belum ada ROSC.'; }

  function cekIrama(k) {
    var label = k === 1 ? 'Analisis irama pertama (jeda singkat, kompresi segera dilanjutkan).' : 'Cek irama dan nadi (jeda ≤ 10 detik) di akhir siklus ' + (k - 1) + '.';
    return A('cek_irama_' + k, label, function (c) {
      if (k === 1) {
        return c.sudah('cek_sadapan')
          ? 'Monitor: asistol (garis datar pada dua sadapan, gain sudah dinaikkan). Nadi karotis tidak teraba.'
          : 'Monitor: garis datar. Namun sadapan, pad, dan gain belum Anda pastikan; asistol belum dapat dipastikan.';
      }
      if (k === 2) return 'Tetap asistol. Nadi karotis tidak teraba.';
      if (k === 3) return 'Monitor: kompleks sempit ± 40 x/menit tanpa nadi karotis teraba (PEA).';
      return roscPada(c, k)
        ? 'Monitor: irama sinus ± 90 x/menit. Periksa nadi dan tekanan darah.'
        : 'Masih PEA, kompleks sempit ± 40 x/menit; nadi karotis tidak teraba.';
    }, 8, {
      syarat: function (c) {
        if (k === 1) return c.sudah('pasang_pad') ? null : 'Pasang pad/monitor dulu.';
        if (k >= 4 && rosc(c)) return 'Sudah ROSC.';
        return c.sudah('siklus_' + (k - 1)) ? null : 'Belum ada siklus RJP 2 menit untuk dievaluasi.';
      }
    });
  }

  function siklus(k) {
    return A('siklus_' + k, k === 1
      ? 'Lanjutkan RJP berkualitas 1 siklus (2 menit); kompresi tanpa jeda, ventilasi sesuai rasio/jalan napas.'
      : 'Lanjutkan RJP 1 siklus lagi (2 menit) dengan irama yang sama.',
    'Siklus ' + k + ' selesai. Kompresi berlanjut dengan jeda minimal.', 45, {
      syarat: function (c) {
        if (k === 1) return c.sudah('nyatakan_henti') ? null : 'Nyatakan henti jantung dulu.';
        if (k >= 4 && rosc(c)) return 'Sudah ROSC.';
        return c.sudah('cek_irama_' + k) ? null : 'Cek irama di akhir siklus sebelumnya dulu.';
      }
    });
  }

  g.OSCE.daftar('12', {
    pasien: { nama: 'Bapak Surya (62 tahun)', ringkas: 'Pasien PGK dengan hemodialisis, lemas sejak kemarin, melewatkan dua sesi dialisis; ditemukan tidak responsif', ringkasTes: 'Pasien gagal ginjal kronik dengan hemodialisis; ditemukan tidak responsif', keadaan: 'Telentang di tempat tidur, tidak responsif. Kompresi dada sedang dilakukan perawat; troli darurat dan defibrilator di sisi tempat tidur. Anda pemimpin tim.' },
    tandaVital: [['Kesadaran', 'Tidak responsif'], ['Napas', 'Tidak normal'], ['Nadi karotis', 'Tidak teraba'], ['Kompresi', 'Berlangsung (perawat)']],
    waktu: 480,
    petunjuk: 'Anda pemimpin tim: ucapkan perintah lewat tab di bawah. Jam berjalan menurut biaya tiap perintah; satu siklus RJP dipadatkan menjadi ± 45 detik. Irama berubah menurut jumlah siklus dan terapi Anda. Dosis tidak dinilai.',
    panel: [
      {
        id: 'awal', label: '1. Penilaian awal & tim', tipe: 'aksi',
        grup: [
          { judul: 'Keamanan dan penilaian', aksi: [
            A('aman', 'Pastikan lokasi aman bagi tim dan pasien.', 'Aman. Tempat tidur diberi papan alas.', 4),
            A('cek_henti', 'Periksa respons, napas, dan nadi karotis bersamaan (≤ 10 detik).', 'Tidak responsif, tidak bernapas normal, nadi karotis tidak teraba.', 10),
            A('nyatakan_henti', 'Nyatakan: pasien henti jantung.', 'Henti jantung dikonfirmasi; waktu dicatat.', 3,
              { syarat: setelah('cek_henti', 'Periksa respons, napas, dan nadi dulu.') }),
            A('cek_henti_lama', 'Periksa nadi karotis selama 30 detik sambil menunggu kompresi dihentikan.', 'Nadi karotis tidak teraba; kompresi terhenti sepanjang pemeriksaan.', 30,
              { tidakTepat: 'Pemeriksaan napas/nadi maksimal 10 detik; jeda kompresi harus minimal.' })
          ] },
          { judul: 'Tim dan peralatan', aksi: [
            A('panggil_tim', 'Minta tim henti jantung (kode biru) dipanggil.', 'Perawat: "Kode biru diaktifkan, Dok."', 5),
            A('siapkan_troli', 'Minta defibrilator dan troli darurat disiapkan di sisi tempat tidur.', 'Troli darurat dan defibrilator siap.', 5),
            A('perkenalan', 'Perkenalkan diri: "Saya dokter jaga, saya pemimpin tim."', 'Tim: "Baik, Dok."', 4),
            A('peran_kompresi', 'Tunjuk peran: kompresi dada (dan bergantian tiap siklus).', 'Perawat 1: "Saya kompresi, Dok."', 3),
            A('peran_napas', 'Tunjuk peran: jalan napas dan ventilasi dengan oksigen.', 'Penolong 2: "Saya jalan napas dan ventilasi, Dok."', 3),
            A('peran_akses', 'Tunjuk peran: akses IV/IO dan pemberian obat.', 'Perawat 3: "Saya akses dan obat, Dok."', 3),
            A('peran_catat', 'Tunjuk peran: pencatat waktu, irama, dan obat.', 'Asisten: "Saya mencatat, Dok."', 3)
          ] },
          { judul: 'Kompresi, pad, dan ventilasi', aksi: [
            A('nilai_kompresi', 'Pastikan kompresi dada berkualitas: laju, kedalaman, recoil penuh, jeda minimal.', 'Kompresi dalam dan cepat, recoil penuh, tanpa jeda berarti.', 5),
            A('pasang_pad', 'Minta pad/monitor dipasang tanpa menghentikan kompresi.', 'Pad terpasang; sadapan menampilkan garis datar.', 8),
            A('oksigen_bvm', 'Berikan oksigen konsentrasi tinggi dengan balon-sungkup (BVM).', 'Ventilasi dengan BVM dan oksigen tinggi; dada terangkat.', 6)
          ] }
        ]
      },
      {
        id: 'algoritme', label: '2. Irama & algoritme', tipe: 'aksi',
        grup: [
          { judul: 'Irama', aksi: [
            A('cek_sadapan', 'Pastikan sadapan, pad, dan gain monitor benar (periksa di dua sadapan).', 'Sadapan terpasang baik dan gain dinaikkan; garis tetap datar.', 5),
            cekIrama(1), cekIrama(2), cekIrama(3), cekIrama(4), cekIrama(5),
            A('nyatakan_asistol', 'Nyatakan: asistol, irama TIDAK dapat disyok; lanjutkan RJP.', 'Tim: "Asistol, tidak disyok, RJP lanjut."', 3,
              { syarat: setelah('cek_irama_1', 'Analisis irama dulu.') }),
            A('nyatakan_pea', 'Nyatakan: PEA, tetap tidak dapat disyok; lanjutkan algoritme yang sama.', 'Tim: "PEA, tidak disyok, RJP dan epinefrin lanjut."', 3,
              { syarat: setelah('cek_irama_3', 'Belum ada temuan PEA.') }),
            A('syok_asistol', 'Minta defibrilator diisi dan syok.', 'Defibrilator: "Syok tidak disarankan." Irama tidak berubah; RJP tertunda.', 8,
              { tidakTepat: 'Asistol dan PEA tidak dapat disyok; syok tidak bermanfaat dan menunda RJP dan obat.',
                syarat: setelah('pasang_pad', 'Belum ada pad/monitor.') })
          ] },
          { judul: 'Siklus RJP', aksi: [
            siklus(1), siklus(2), siklus(3), siklus(4),
            A('ganti_penolong', 'Minta penolong kompresi bergantian.', 'Penolong bergantian tanpa jeda berarti.', 4)
          ] },
          { judul: 'Obat dan jalan napas', aksi: [
            A('akses_iv_io', 'Minta akses IV atau IO (tanpa menghentikan kompresi).', 'Akses IV terpasang di lengan kiri.', 8),
            A('epinefrin_1', 'Minta epinefrin IV/IO sekarang (irama tidak dapat disyok).', 'Epinefrin diberikan, waktu dicatat. Flush dan lanjut RJP.', 6,
              { syarat: setelah('akses_iv_io', 'Belum ada akses IV/IO.') }),
            A('epinefrin_2', 'Ulangi epinefrin (tiap 3–5 menit) pada siklus berikutnya.', 'Epinefrin kedua diberikan, waktu dicatat.', 6,
              { syarat: function (c) { return c.sudah('epinefrin_1') && c.sudah('siklus_2') ? null : 'Belum waktunya mengulang epinefrin (setelah siklus RJP berikutnya).'; } }),
            A('jalan_napas_lanjut', 'Minta jalan napas lanjut dipasang tanpa menghentikan kompresi (jeda minimal).', 'Jalan napas lanjut terpasang; kompresi berlanjut, ventilasi tidak berlebihan.', 8,
              { syarat: setelah('siklus_1', 'Mulai siklus RJP dulu.') }),
            A('kapnografi', 'Pasang kapnografi.', 'Kapnografi terpasang: gelombang rendah, sesuai henti jantung.', 5,
              { syarat: setelah('jalan_napas_lanjut', 'Pasang jalan napas lanjut dulu.') }),
            A('ventilasi_cepat', 'Minta ventilasi lebih cepat dan kuat supaya oksigenasi lebih baik.', 'Penolong memberi tiupan cepat berulang; dada naik berlebihan.', 4,
              { tidakTepat: 'Hiperventilasi menurunkan aliran balik vena dan curah jantung; ventilasi tidak berlebihan.' }),
            A('atropin', 'Minta atropin untuk irama lambat.', 'Atropin diberikan; irama tidak berubah.', 6,
              { tidakTepat: 'Atropin tidak termasuk algoritme asistol/PEA.', syarat: setelah('akses_iv_io', 'Belum ada akses IV/IO.') }),
            A('amiodaron', 'Minta amiodaron.', 'Amiodaron diberikan; tidak ada perubahan irama.', 6,
              { tidakTepat: 'Antiaritmia untuk VF/VT tanpa nadi refrakter, bukan untuk asistol/PEA.', syarat: setelah('akses_iv_io', 'Belum ada akses IV/IO.') })
          ] }
        ]
      },
      {
        id: 'penyebab', label: '3. Penyebab & terapi', tipe: 'aksi',
        grup: [
          { judul: 'Cari penyebab reversibel', aksi: [
            A('sebut_h', 'Sebut dan telusuri "H": hipoksia, hipovolemia, hiperkalemia/gangguan elektrolit, hipotermia, ion hidrogen (asidosis).', 'Tim mencatat. Perawat: "Pasien ini dialisis, Dok."', 6),
            A('sebut_t', 'Sebut dan telusuri "T": tension pneumotoraks, tamponade, toksin, trombosis koroner/paru.', 'Tim mencatat. Tidak ada tanda tension pneumotoraks atau tamponade pada pemeriksaan cepat.', 6),
            A('minta_gas_darah', 'Minta gas darah dengan elektrolit (kalium) dan glukosa segera.', 'Hasil: pH 7,18 · K 7,4 mmol/L · glukosa 130 mg/dL.', 6),
            A('tanya_riwayat', 'Tanya perawat: riwayat dialisis dan keluhan sebelum henti.', 'Melewatkan dua sesi dialisis; lemas sejak kemarin.', 6),
            A('tanya_ekg_pagi', 'Minta EKG pagi tadi (bila ada).', 'EKG pagi tadi: gelombang T runcing tinggi.', 4),
            A('simpulkan_hiperkalemia', 'Simpulkan: hiperkalemia penyebab paling mungkin; tangani sekarang.', 'Tim: "Siap, hiperkalemia."', 3, {
              eksklusif: 'simpulan',
              syarat: function (c) { return c.sudah('minta_gas_darah') || c.sudah('tanya_riwayat') ? null : 'Data belum cukup; cari penyebab dulu (gas darah, riwayat).'; }
            }),
            A('simpulkan_lain', 'Simpulkan: penyebab paling mungkin adalah tamponade atau pneumotoraks.', 'Tim: "Baik, Dok." Tidak ada temuan yang mendukung.', 3,
              { eksklusif: 'simpulan', tidakTepat: 'Data pasien (dialisis terlewat, T runcing, K 7,4) mengarah ke hiperkalemia.' })
          ] },
          { judul: 'Terapi hiperkalemia (tanpa menghentikan RJP)', aksi: [
            A('kalsium_klorida', 'Minta kalsium klorida IV/IO sekarang.', 'Kalsium klorida diberikan IV; RJP berlanjut.', 6,
              { eksklusif: 'kalsium', syarat: setelah('akses_iv_io', 'Belum ada akses IV/IO.') }),
            A('kalsium_glukonat', 'Minta kalsium glukonat IV/IO sekarang.', 'Kalsium glukonat diberikan IV; RJP berlanjut.', 6,
              { eksklusif: 'kalsium', syarat: setelah('akses_iv_io', 'Belum ada akses IV/IO.') }),
            A('insulin_dekstrosa', 'Minta insulin reguler bersama dekstrosa IV.', 'Insulin dengan dekstrosa diberikan; glukosa akan dipantau.', 8,
              { eksklusif: 'insulin', syarat: setelah('akses_iv_io', 'Belum ada akses IV/IO.') }),
            A('insulin_saja', 'Minta insulin reguler IV tanpa dekstrosa.', 'Insulin diberikan.', 6,
              { eksklusif: 'insulin', tidakTepat: 'Insulin tanpa dekstrosa berisiko hipoglikemia.', syarat: setelah('akses_iv_io', 'Belum ada akses IV/IO.') }),
            A('pertimbangkan_bikarbonat', 'Pertimbangkan natrium bikarbonat (asidosis pH 7,18 dengan hiperkalemia).', 'Natrium bikarbonat diberikan IV; RJP berlanjut.', 6,
              { syarat: setelah('akses_iv_io', 'Belum ada akses IV/IO.') }),
            A('tunggu_stop', 'Hentikan RJP sementara sambil menunggu hasil gas darah.', 'Kompresi berhenti; tidak ada perfusi sepanjang menunggu.', 30,
              { berisiko: 'Menghentikan kompresi tanpa alasan memperpanjang henti perfusi; RJP berlanjut selama menunggu hasil.' })
          ] }
        ]
      },
      {
        id: 'tim', label: '4. Kepemimpinan & kerja tim', tipe: 'aksi',
        grup: [{ judul: 'Komunikasi dan kualitas', aksi: [
          A('closed_loop', 'Minta anggota mengulang instruksi dan melapor setelah terlaksana (closed-loop).', 'Tim mengulang instruksi dan melapor setelah selesai.', 4),
          A('catat_waktu', 'Sebut waktu siklus; minta pencatat mencatat waktu henti, obat, dan irama.', 'Pencatat: "Henti tercatat, epinefrin dan irama dicatat per siklus."', 4),
          A('ringkas_tim', 'Ringkas keadaan untuk seluruh tim: irama, obat yang sudah diberikan, penyebab dugaan.', 'Tim menyimak.', 5),
          A('minta_masukan', 'Tanya tim: "Ada masukan atau penyebab lain yang terlewat?"', 'Tidak ada tambahan dari tim.', 3),
          A('koreksi_kompresi', 'Periksa kualitas kompresi; koreksi dengan sopan bila dangkal/lambat dan minta bergantian.', function (c) {
            return c.terpakai - BIAYA_KOREKSI >= T_MENURUN
              ? 'Kompresi kembali dalam dan sesuai laju setelah dikoreksi; penolong bergantian.'
              : 'Kompresi saat ini sudah baik (dalam, laju sesuai, recoil penuh).';
          }, BIAYA_KOREKSI, { sekali: false }),
          A('apresiasi_tim', 'Ucapkan terima kasih kepada tim dengan nada tenang dan jelas.', 'Tim: "Siap, Dok."', 3),
          A('bentak_tim', 'Tegur keras perawat di depan tim: "Kompresi Anda salah!"', 'Suasana tegang; tim ragu menjawab.', 4,
            { tidakTepat: 'Menyalahkan atau membentak anggota tim merusak komunikasi; koreksi dengan sopan.' })
        ] }]
      },
      {
        id: 'rosc', label: '5. Pasca-ROSC', tipe: 'aksi',
        catatan: 'Aktif setelah ROSC.',
        grup: [{ judul: 'Setelah nadi kembali', aksi: [
          A('kenali_rosc', 'Pastikan ROSC: nadi karotis/radialis, tekanan darah, kapnografi; hentikan kompresi.', 'Nadi teraba, TD 88/50 mmHg, SpO₂ 93% dengan bantuan napas; kapnografi meningkat. Kompresi dihentikan.', 8,
            { syarat: setelahRosc }),
          A('oksigen_terkontrol', 'Oksigenasi dan ventilasi terkontrol (hindari hipoksia dan hiperventilasi).', 'Oksigen dititrasi dan ventilasi terkontrol; SpO₂ membaik tanpa hiperventilasi.', 6,
            { syarat: setelah('kenali_rosc', 'Pastikan ROSC dulu.') }),
          A('ventilasi_agresif', 'Ventilasi cepat dan oksigen penuh terus-menerus.', 'Pasien dihiperventilasi; tekanan darah menurun.', 4,
            { tidakTepat: 'Hiperventilasi dan hiperoksia setelah ROSC merugikan; titrasi oksigen dan ventilasi terkontrol.', syarat: setelah('kenali_rosc', 'Pastikan ROSC dulu.') }),
          A('atasi_hipotensi', 'Atasi hipotensi: akses adekuat, cairan sesuai kondisi, vasopresor bila perlu.', 'Hipotensi ditangani; TD dipantau ketat.', 6,
            { syarat: setelah('kenali_rosc', 'Pastikan ROSC dulu.') }),
          A('ekg_12', 'Rekam EKG 12 sadapan.', 'EKG: irama sinus, gelombang T runcing, tanpa elevasi ST.', 8,
            { syarat: setelah('kenali_rosc', 'Pastikan ROSC dulu.') }),
          A('pantau_k_glukosa', 'Pantau kalium dan glukosa serial (ulang gas darah).', 'Pemeriksaan kalium dan glukosa ulang dijadwalkan.', 5,
            { syarat: setelah('kenali_rosc', 'Pastikan ROSC dulu.') }),
          A('dialisis_nefro', 'Hubungi nefrologi: rencanakan dialisis darurat.', 'Nefrologi menerima konsultasi; dialisis darurat disiapkan.', 5,
            { syarat: setelah('kenali_rosc', 'Pastikan ROSC dulu.') }),
          A('rawat_icu', 'Putuskan perawatan ICU.', 'ICU menerima pasien.', 4,
            { syarat: setelah('kenali_rosc', 'Pastikan ROSC dulu.') }),
          A('ttm_neuro', 'Rencanakan pemantauan neurologis dan pengendalian suhu terarah.', 'Pemantauan neurologis dan suhu terarah direncanakan.', 5,
            { syarat: setelah('kenali_rosc', 'Pastikan ROSC dulu.') })
        ] }]
      },
      {
        id: 'serah_terima', label: '6. Serah terima', tipe: 'form', biaya: 15,
        catatan: 'Aktif setelah ROSC. Dokter ICU (penguji) menerima pasien.',
        bidang: [
          { id: 'bentuk_serah', label: 'Bentuk serah terima', tipe: 'select', opsi: [
            ['sbar', 'Terstruktur (SBAR)'],
            ['bebas', 'Bercerita bebas tanpa urutan', { tidakTepat: 'Serah terima tanpa struktur memudahkan informasi penting terlewat.' }]] },
          { id: 'isi_serah', label: 'Isi yang disampaikan', tipe: 'multi', opsi: [
            ['identitas', 'Identitas dan latar: pria 62 tahun, PGK dialisis, melewatkan dua sesi'],
            ['waktu_henti', 'Waktu henti jantung dan lama RJP'],
            ['irama', 'Perjalanan irama: asistol → PEA → ROSC'],
            ['obat', 'Obat yang diberikan beserta waktunya'],
            ['penyebab', 'Dugaan penyebab: hiperkalemia, dengan hasil gas darah'],
            ['kondisi', 'Kondisi sekarang: TD, nadi, SpO₂, kesadaran'],
            ['rencana', 'Permintaan: perawatan ICU, dialisis darurat, pemantauan kalium dan glukosa']] }
        ]
      }
    ],
    jadwal: [{ pada: T_MENURUN, id: 'kompresi_menurun', pesan: 'Perawat yang menekan dada tampak lelah: kompresi mulai dangkal dan melambat.' }],
    skor: {
      A1: h.all(['aman', 'cek_henti', 'nyatakan_henti']),
      A2: h.all(['panggil_tim', 'siapkan_troli']),
      A3: h.any(['nilai_kompresi']),
      A4: h.all(['pasang_pad', 'oksigen_bvm']),
      B1: h.all(['cek_sadapan', 'cek_irama_1']),
      B2: h.kustom(function (c) { return c.sudah('nyatakan_asistol') && !c.sudah('syok_asistol') ? 1 : 0; }, ['nyatakan_asistol', 'syok_asistol']),
      B3: h.all(['akses_iv_io', 'epinefrin_1', 'epinefrin_2']),
      B4: h.all(['siklus_1', 'cek_irama_2', 'siklus_2', 'ganti_penolong']),
      B5: h.all(['jalan_napas_lanjut', 'kapnografi']),
      B6: h.all(['cek_irama_3', 'nyatakan_pea']),
      C1: h.all(['sebut_h', 'sebut_t']),
      C2: h.all(['minta_gas_darah', 'tanya_riwayat']),
      C3: h.any(['simpulkan_hiperkalemia']),
      C4: h.kustom(function (c) {
        return (c.sudah('kalsium_klorida') || c.sudah('kalsium_glukonat')) && c.sudah('insulin_dekstrosa') && c.sudah('pertimbangkan_bikarbonat') ? 1 : 0;
      }, ['kalsium_klorida', 'kalsium_glukonat', 'insulin_dekstrosa', 'pertimbangkan_bikarbonat']),
      D1: h.all(['perkenalan', 'peran_kompresi', 'peran_napas', 'peran_akses', 'peran_catat']),
      D2: h.any(['closed_loop']),
      D3: h.all(['ringkas_tim', 'minta_masukan']),
      D4: h.kustom(function (c) {
        return c.sudah('kompresi_menurun') && c.sudah('koreksi_kompresi') && c.waktuAksi('koreksi_kompresi') - BIAYA_KOREKSI >= T_MENURUN ? 1 : 0;
      }, ['kompresi_menurun', 'koreksi_kompresi']),
      D5: h.any(['catat_waktu']),
      D6: h.kustom(function (c) { return c.sudah('apresiasi_tim') && !c.sudah('bentak_tim') ? 1 : 0; }, ['apresiasi_tim', 'bentak_tim']),
      E1: h.any(['kenali_rosc']),
      E2: h.all(['oksigen_terkontrol', 'atasi_hipotensi', 'ekg_12']),
      E3: h.all(['pantau_k_glukosa', 'dialisis_nefro']),
      E4: h.all(['rawat_icu', 'ttm_neuro']),
      E5: h.kustom(function (c) {
        return rosc(c) && c.sudah('serah_terima') && c.jawab('bentuk_serah') === 'sbar' &&
          ['waktu_henti', 'obat', 'penyebab', 'kondisi'].every(function (x) { return ada(c, 'isi_serah', x); }) ? 1 : 0;
      }, ['serah_terima', 'bentuk_serah', 'isi_serah'])
    },
    ideal: [
      'aman', 'cek_henti', 'nyatakan_henti', 'panggil_tim', 'siapkan_troli', 'perkenalan',
      'peran_kompresi', 'peran_napas', 'peran_akses', 'peran_catat',
      'nilai_kompresi', 'pasang_pad', 'oksigen_bvm', 'cek_sadapan', 'cek_irama_1', 'nyatakan_asistol',
      'akses_iv_io', 'epinefrin_1', 'closed_loop', 'catat_waktu',
      'sebut_h', 'sebut_t', 'minta_gas_darah', 'tanya_riwayat', 'tanya_ekg_pagi', 'simpulkan_hiperkalemia',
      'siklus_1', 'koreksi_kompresi', 'ganti_penolong', 'cek_irama_2',
      'kalsium_klorida', 'insulin_dekstrosa', 'pertimbangkan_bikarbonat',
      'siklus_2', 'epinefrin_2', 'jalan_napas_lanjut', 'kapnografi', 'ringkas_tim', 'minta_masukan', 'cek_irama_3', 'nyatakan_pea',
      'siklus_3', 'cek_irama_4',
      'kenali_rosc', 'oksigen_terkontrol', 'atasi_hipotensi', 'ekg_12', 'pantau_k_glukosa', 'dialisis_nefro', 'rawat_icu', 'ttm_neuro',
      'apresiasi_tim',
      { form: 'serah_terima', jawab: { bentuk_serah: 'sbar', isi_serah: ['identitas', 'waktu_henti', 'irama', 'obat', 'penyebab', 'kondisi', 'rencana'] } }
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
