/* Logika murni widget (tanpa DOM): dipakai widget di browser dan rencana ideal pada uji Node. */
(function (g) {
  'use strict';
  var OSCE = (g.OSCE = g.OSCE || {});

  OSCE.logika = {
    // Pengukuran tekanan darah. m: {sist, dia, maxP, laju (mmHg/dtk), est (estimasi palpatoir)}
    // cfg: {sist, dia (nilai sebenarnya simulator), bias (mmHg, akibat ukuran manset)}
    // Mengembalikan daftar id peristiwa yang terpenuhi.
    bp: function (m, cfg) {
      var acara = [];
      var sistEf = cfg.sist + (cfg.bias || 0);
      if (m.est != null && Math.abs(m.est - sistEf) <= 10) acara.push('bp_palp_ok');
      if (m.est != null && m.maxP - m.est >= 15 && m.maxP - m.est <= 40) acara.push('bp_inflasi_ok');
      if (m.laju != null && m.laju >= 1.5 && m.laju <= 4) acara.push('bp_laju_ok');
      var sOk = Math.abs(m.sist - cfg.sist) <= 4;
      var dOk = Math.abs(m.dia - cfg.dia) <= 4;
      if (sOk) acara.push('bp_sist_ok');
      if (dOk) acara.push('bp_dia_ok');
      if (sOk && dOk) acara.push('bp_ok_keduanya');
      return acara;
    },

    // Uji ritme kompresi: laju (x/menit) dari ketukan.
    ketuk: function (laju) {
      return laju >= 100 && laju <= 120 ? ['rjp_laju_ok'] : [];
    },

    // Pembangkit irama EKG deterministik (waktu dalam detik, dari awal rekaman 10 detik).
    // opsi.irama: 'sinus' (default; reguler pada opsi.bpm), 'fa' (R–R tidak teratur, rata-rata opsi.bpm,
    // tanpa gelombang P) atau 'blok_av3' (P teratur pada opsi.bpmAtrium, QRS pelarian teratur pada opsi.bpm,
    // saling bebas). Mengembalikan {jenis, qrs: [waktu], p: [waktu]}.
    irama: function (opsi, durasi) {
      opsi = opsi || {};
      durasi = (durasi || 10) + 1;
      var jenis = opsi.irama || 'sinus';
      var qrs = [], p = [], t;
      function acak(seed) {
        var a = seed >>> 0;
        return function () {
          a = (a + 0x6D2B79F5) >>> 0;
          var r = Math.imul(a ^ (a >>> 15), 1 | a);
          r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
          return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
        };
      }
      if (jenis === 'fa') {
        var rr = 60 / (opsi.bpm || 130), u = acak(opsi.seed != null ? opsi.seed : 7);
        t = 0.2;
        while (t < durasi) { qrs.push(t); t += Math.max(0.26, rr * (0.62 + 0.76 * u())); }
      } else if (jenis === 'blok_av3') {
        var rrV = 60 / (opsi.bpm || 34), rrA = 60 / (opsi.bpmAtrium || 90);
        for (t = opsi.mulaiV != null ? opsi.mulaiV : 0.6; t < durasi; t += rrV) qrs.push(t);
        for (t = opsi.mulaiA != null ? opsi.mulaiA : 0.15; t < durasi; t += rrA) p.push(t);
      } else {
        var rrS = 60 / (opsi.bpm || 75);
        for (t = 0.3; t < durasi; t += rrS) { qrs.push(t); p.push(t - 0.16); }
      }
      return { jenis: jenis, qrs: qrs, p: p };
    },

    // Jumlah QRS dalam jendela [mulai, mulai+lebar) detik.
    hitungQRS: function (irama, mulai, lebar) {
      return irama.qrs.filter(function (x) { return x >= mulai && x < mulai + lebar; }).length;
    },

    // Laju dari daftar waktu ketukan (milidetik): median selang antar ketukan.
    lajuDariKetukan: function (waktu) {
      if (waktu.length < 2) return null;
      var selang = [];
      for (var i = 1; i < waktu.length; i++) selang.push(waktu[i] - waktu[i - 1]);
      selang.sort(function (a, b) { return a - b; });
      var tengah = selang[Math.floor(selang.length / 2)];
      return tengah > 0 ? Math.round(60000 / tengah) : null;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
