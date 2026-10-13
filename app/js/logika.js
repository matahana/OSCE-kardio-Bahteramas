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
