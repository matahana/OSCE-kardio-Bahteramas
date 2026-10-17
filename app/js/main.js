/* Router berbasis hash (#/...) — berjalan juga dari file:// tanpa server. */
(function (g) {
  'use strict';
  var OSCE = g.OSCE, UI = OSCE.ui;

  var RUTE = [
    [/^$|^\/$/, function () { UI.beranda(); }],
    [/^\/briefing\/(\d+)$/, function (m) { UI.briefing(m[1]); }],
    [/^\/sesi\/(\d+)$/, function (m) { UI.ruang(m[1]); }],
    [/^\/hasil$/, function () { UI.hasilView(); }],
    [/^\/tes\/(\d+)$/, function (m) { UI.briefingTes(m[1]); }],
    [/^\/tes-sesi\/(\d+)$/, function (m) { UI.ruangTes(m[1]); }],
    [/^\/pengaturan$/, function () { UI.pengaturan(); }],
    [/^\/penguji\/(\d+)$/, function (m) { UI.pengujiView(m[1]); }],
    [/^\/riwayat$/, function () { UI.riwayatView(); }],
    [/^\/tentang$/, function () { UI.tentang(); }]
  ];

  function tampil() {
    var jalur = (g.location.hash || '').replace(/^#/, '');
    for (var i = 0; i < RUTE.length; i++) {
      var m = RUTE[i][0].exec(jalur);
      if (m) { RUTE[i][1](m); return; }
    }
    g.location.hash = '#/';
  }

  g.addEventListener('hashchange', tampil);
  document.addEventListener('DOMContentLoaded', function () {
    var galat = OSCE.daftarStasiun().length === 0;
    if (galat) {
      document.getElementById('app').textContent = 'Data stasiun tidak termuat. Jalankan: python3 -I tools/buat_data.py';
      return;
    }
    tampil();
  });
})(window);
