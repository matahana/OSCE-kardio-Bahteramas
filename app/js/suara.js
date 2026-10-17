/* Suara untuk mode tes: mikrofon (pengenalan ucapan) dan suara pasien (sintesis ucapan), memakai Web Speech API
   peramban. Tidak ada layanan suara pihak ketiga yang dipanggil langsung oleh aplikasi.

   Catatan privasi: di Chrome dan Edge, pengenalan ucapan mengirim audio ke server penyedia peramban (Google /
   Microsoft) dan butuh internet; Firefox tidak mendukungnya. Sintesis ucapan memakai suara yang terpasang di
   perangkat. UI wajib memberi tahu pengguna sebelum mikrofon dipakai.

   Modul ini dapat diuji tanpa peramban nyata: SpeechRecognition dan speechSynthesis dibaca dari objek global
   setiap kali dipakai, sehingga uji dapat memasang tiruan. */
(function (g) {
  'use strict';
  var OSCE = (g.OSCE = g.OSCE || {});

  var BAHASA = 'id-ID';
  var pengaturan = { bahasa: BAHASA, laju: 1, bicara: true };
  var pengenalAktif = null; // pegangan {berhenti, batal} dari dengar() yang sedang berjalan
  var sedangBicara = false;
  var nomorBicara = 0; // naik tiap bicara() atau hentiBicara(); suara yang kalah tidak dihitung selesai

  function kelasKenali() { return g.SpeechRecognition || g.webkitSpeechRecognition || null; }
  function sintesis() { return g.speechSynthesis || null; }
  function kelasUcapan() { return g.SpeechSynthesisUtterance || null; }

  function dukungan() {
    return { kenali: !!kelasKenali(), bicara: !!(sintesis() && kelasUcapan()) };
  }

  // Menyederhanakan teks agar enak dibacakan suara sintetis.
  function untukUcapan(teks) {
    var t = String(teks == null ? '' : teks);
    t = t.replace(/\([^)]*\)/g, ' '); // petunjuk gerak/keadaan dalam kurung bukan ucapan pasien
    t = t.replace(/\bmmHg\b/g, 'milimeter merkuri').replace(/\bx\/menit\b/g, 'kali per menit').replace(/°C/g, ' derajat Celsius')
      .replace(/SpO₂|SpO2/g, 'saturasi oksigen').replace(/mg\/dL/g, 'miligram per desiliter').replace(/mmol\/L/g, 'milimol per liter')
      .replace(/(\d+)\s*\/\s*(\d+)/g, '$1 per $2').replace(/%/g, ' persen').replace(/\bdtk\b/g, 'detik')
      .replace(/\bEKG\b/g, 'E K G').replace(/\bIV\b/g, 'I V').replace(/\bAED\b/g, 'A E D').replace(/\bRJP\b/g, 'R J P')
      .replace(/\bPEA\b/g, 'P E A').replace(/\bICU\b/g, 'I C U').replace(/\bBPJS\b/g, 'B P J S')
      .replace(/[“”"]/g, '').replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim();
    return t;
  }

  function pilihSuara(bahasa) {
    var s = sintesis();
    if (!s || !s.getVoices) return null;
    var daftar = s.getVoices() || [];
    var awal = String(bahasa || BAHASA).slice(0, 2).toLowerCase();
    var persis = daftar.filter(function (v) { return v.lang && v.lang.replace('_', '-').toLowerCase() === String(bahasa).toLowerCase(); })[0];
    return persis || daftar.filter(function (v) { return v.lang && v.lang.slice(0, 2).toLowerCase() === awal; })[0] || null;
  }

  // Membacakan teks. Mengembalikan Promise (tidak pernah ditolak) yang bernilai true bila suara selesai dibacakan,
  // dan false bila terpotong (bicara() lain, hentiBicara()), tak didukung, atau teksnya kosong.
  function bicara(teks, opsi) {
    opsi = opsi || {};
    return new Promise(function (selesai) {
      var s = sintesis(), K = kelasUcapan();
      var isi = untukUcapan(teks);
      if (!s || !K || !isi) { selesai(false); return; }
      var nomor = ++nomorBicara;
      try { s.cancel(); } catch (e) { /* abaikan */ }
      var u = new K(isi);
      u.lang = opsi.bahasa || pengaturan.bahasa;
      u.rate = opsi.laju || pengaturan.laju;
      var v = pilihSuara(u.lang);
      if (v) u.voice = v;
      var tuntas = false;
      function akhir(ok) { if (tuntas) return; tuntas = true; if (nomor === nomorBicara) sedangBicara = false; selesai(ok && nomor === nomorBicara); }
      u.onend = function () { akhir(true); };
      u.onerror = function (e) { akhir(!(e && (e.error === 'canceled' || e.error === 'interrupted'))); };
      sedangBicara = true;
      try { s.speak(u); } catch (e) { akhir(false); }
    });
  }

  function hentiBicara() {
    var s = sintesis();
    nomorBicara++;
    sedangBicara = false;
    if (s) { try { s.cancel(); } catch (e) { /* abaikan */ } }
  }

  // Mulai mendengarkan satu ucapan. opsi: {saatSementara(teks), saatAkhir(teks), saatKosong(kode), saatGalat(kode),
  // saatBerhenti()}. saatBerhenti() selalu dipanggil tepat sekali saat sesi mendengar berakhir, termasuk bila dibatalkan.
  // Mengembalikan {berhenti(), batal()} atau null bila tidak didukung. berhenti() meminta hasil akhir dulu (stop);
  // batal() membuang hasil dan tidak memanggil saatAkhir/saatGalat/saatKosong.
  function dengar(opsi) {
    opsi = opsi || {};
    var K = kelasKenali();
    if (!K) { if (opsi.saatGalat) opsi.saatGalat('tidak-didukung'); return null; }
    if (pengenalAktif) pengenalAktif.batal();
    var r = new K();
    r.lang = opsi.bahasa || pengaturan.bahasa;
    r.continuous = false;
    r.interimResults = true;
    r.maxAlternatives = 1;
    var hasilAkhir = '', tuntas = false, dibatalkan = false, galatKode = null;
    var pegangan = null;
    function akhiri() {
      if (tuntas) return;
      tuntas = true;
      if (pengenalAktif === pegangan) pengenalAktif = null;
      if (opsi.saatBerhenti) opsi.saatBerhenti();
    }
    r.onresult = function (e) {
      var sementara = '';
      for (var i = e.resultIndex; i < e.results.length; i++) {
        var alt = e.results[i][0];
        if (e.results[i].isFinal) hasilAkhir += alt.transcript; else sementara += alt.transcript;
      }
      if (sementara && opsi.saatSementara) opsi.saatSementara(sementara);
    };
    r.onerror = function (e) { galatKode = e && e.error ? e.error : 'galat'; };
    r.onend = function () {
      if (tuntas) return;
      if (!dibatalkan) {
        var teks = hasilAkhir.trim();
        if (teks && opsi.saatAkhir) opsi.saatAkhir(teks);
        else if (galatKode && galatKode !== 'no-speech' && galatKode !== 'aborted' && opsi.saatGalat) opsi.saatGalat(galatKode);
        else if (!teks && opsi.saatKosong) opsi.saatKosong(galatKode);
      }
      akhiri();
    };
    pegangan = {
      berhenti: function () { try { r.stop(); } catch (e) { /* abaikan */ } },
      batal: function () { dibatalkan = true; try { r.abort(); } catch (e) { /* abaikan */ } akhiri(); }
    };
    try { r.start(); } catch (e) { if (opsi.saatGalat) opsi.saatGalat('gagal-mulai'); return null; }
    pengenalAktif = pegangan;
    return pegangan;
  }

  var PESAN_GALAT = {
    'not-allowed': 'Izin mikrofon ditolak. Izinkan mikrofon untuk situs ini di pengaturan peramban.',
    'service-not-allowed': 'Layanan pengenalan suara tidak diizinkan oleh peramban atau perangkat.',
    'audio-capture': 'Mikrofon tidak ditemukan atau sedang dipakai aplikasi lain.',
    'network': 'Pengenalan suara butuh internet; sambungan gagal.',
    'language-not-supported': 'Bahasa Indonesia tidak didukung pengenalan suara di peramban ini.',
    'tidak-didukung': 'Peramban ini tidak mendukung pengenalan suara. Gunakan Chrome atau Edge, atau ketik.',
    'gagal-mulai': 'Pengenalan suara tidak dapat dimulai.'
  };

  OSCE.suara = {
    BAHASA: BAHASA,
    dukungan: dukungan,
    untukUcapan: untukUcapan,
    bicara: bicara,
    hentiBicara: hentiBicara,
    dengar: dengar,
    pesanGalat: function (kode) { return PESAN_GALAT[kode] || ('Pengenalan suara gagal (' + kode + ').'); },
    atur: function (p) { Object.assign(pengaturan, p || {}); },
    pengaturan: function () { return Object.assign({}, pengaturan); },
    get sedangBicara() { return sedangBicara; },
    hentiMendengar: function () { if (pengenalAktif) pengenalAktif.batal(); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
