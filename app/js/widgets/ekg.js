/* Widget EKG 12 sadapan sintetis (ilustrasi pendidikan, bukan rekaman pasien).
   Kertas 25 mm/detik, 10 mm/mV. Bentuk gelombang dibangkitkan dari parameter per sadapan. */
(function (g) {
  'use strict';
  var OSCE = (g.OSCE = g.OSCE || {});
  var U = OSCE.util;
  OSCE.widget = OSCE.widget || {};

  var DASAR = {
    I: { p: 0.10, q: 0.04, r: 0.65, s: 0.08, t: 0.25, st: 0 },
    II: { p: 0.15, q: 0.04, r: 1.00, s: 0.10, t: 0.30, st: 0 },
    III: { p: 0.08, q: 0.04, r: 0.45, s: 0.10, t: 0.15, st: 0 },
    aVR: { p: -0.10, q: 0.00, r: 0.08, s: 0.60, t: -0.22, st: 0 },
    aVL: { p: 0.04, q: 0.03, r: 0.40, s: 0.10, t: 0.10, st: 0 },
    aVF: { p: 0.12, q: 0.04, r: 0.70, s: 0.10, t: 0.22, st: 0 },
    V1: { p: 0.05, q: 0.00, r: 0.15, s: 0.85, t: 0.12, st: 0 },
    V2: { p: 0.06, q: 0.00, r: 0.40, s: 0.95, t: 0.38, st: 0 },
    V3: { p: 0.07, q: 0.00, r: 0.65, s: 0.65, t: 0.30, st: 0 },
    V4: { p: 0.09, q: 0.03, r: 1.10, s: 0.30, t: 0.30, st: 0 },
    V5: { p: 0.10, q: 0.06, r: 1.00, s: 0.15, t: 0.25, st: 0 },
    V6: { p: 0.10, q: 0.06, r: 0.80, s: 0.10, t: 0.20, st: 0 }
  };
  var TATA = [['I', 'aVR', 'V1', 'V4'], ['II', 'aVL', 'V2', 'V5'], ['III', 'aVF', 'V3', 'V6']];
  var LEBAR = 62.5, TINGGI = 30, MARGIN = 6; // mm

  function sig(x) { return 1 / (1 + Math.exp(-x)); }

  // Tegangan (mV) pada waktu t (detik) dalam satu siklus.
  function gelombang(t, p) {
    function gauss(pusat, lebar, amp) { return amp * Math.exp(-0.5 * Math.pow((t - pusat) / lebar, 2)); }
    var v = gauss(0.14, 0.022, p.p);
    v += gauss(0.285, 0.008, -p.q);
    v += gauss(0.300, 0.011, p.r);
    v += gauss(0.318, 0.010, -p.s);
    v += p.st * (sig((t - 0.335) / 0.012) - sig((t - 0.60) / 0.03));
    v += gauss(0.47, 0.055, p.t);
    return v;
  }

  function jalur(p, bpm, mulai, durasi, x0, yDasar) {
    var rr = 60 / bpm, langkah = 0.004, titik = [];
    for (var t = 0; t <= durasi + 1e-9; t += langkah) {
      var fase = ((mulai + t) % rr + rr) % rr;
      var x = x0 + t * 25;
      var y = yDasar - gelombang(fase, p) * 10;
      titik.push(x.toFixed(2) + ',' + y.toFixed(2));
    }
    return 'M' + titik.join(' L');
  }

  /* ---------- irama berbasis kejadian: fibrilasi atrium dan blok AV total ---------- */

  function gauss(x, pusat, lebar, amp) { return amp * Math.exp(-0.5 * Math.pow((x - pusat) / lebar, 2)); }

  // Kompleks ventrikel pada tau detik dari puncak R. w = faktor pelebaran QRS (1 = sempit);
  // diskordan = gelombang T berlawanan arah dengan defleksi utama QRS (khas pelarian QRS lebar).
  function kompleksV(tau, p, w, diskordan) {
    if (tau < -0.12 || tau > 0.8) return 0;
    var v = gauss(tau, -0.015 * w, 0.008 * w, -p.q);
    v += gauss(tau, 0, 0.011 * w, p.r);
    v += gauss(tau, 0.018 * w, 0.010 * w, -p.s);
    v += p.st * (sig((tau - 0.035 * w) / 0.012) - sig((tau - (0.30 + 0.05 * (w - 1))) / 0.03));
    var utama = p.r - p.s;
    var tAmp = diskordan ? -(utama >= 0 ? 1 : -1) * Math.max(0.12, 0.3 * Math.abs(utama)) : p.t;
    v += gauss(tau, 0.17 + 0.07 * (w - 1), 0.055 * (1 + 0.3 * (w - 1)), tAmp);
    return v;
  }

  // Gelombang fibrilasi (f) halus pada garis dasar; amp = amplitudo (mV).
  function fibrilasi(t, amp) {
    var mod = 0.7 + 0.3 * Math.sin(2 * Math.PI * 0.35 * t + 1);
    return amp * (mod * Math.sin(2 * Math.PI * 6.3 * t + 0.4) + 0.6 * Math.sin(2 * Math.PI * 8.1 * t + 1.3) + 0.4 * Math.sin(2 * Math.PI * 5.2 * t + 2.2));
  }
  var AMP_FIB = { V1: 0.08, II: 0.05, III: 0.045, aVF: 0.045 };

  function jalurIrama(p, kej, w, diskordan, fibAmp, mulai, durasi, x0, yDasar) {
    var langkah = 0.004, titik = [];
    for (var t = 0; t <= durasi + 1e-9; t += langkah) {
      var T = mulai + t, v = 0, i;
      for (i = 0; i < kej.qrs.length; i++) {
        var tau = T - kej.qrs[i];
        if (tau >= -0.12 && tau <= 0.8) v += kompleksV(tau, p, w, diskordan);
      }
      for (i = 0; i < kej.p.length; i++) v += gauss(T, kej.p[i], 0.022, p.p);
      if (fibAmp) v += fibrilasi(T, fibAmp);
      titik.push((x0 + t * 25).toFixed(2) + ',' + (yDasar - v * 10).toFixed(2));
    }
    return 'M' + titik.join(' L');
  }

  // Menghasilkan elemen <svg> EKG.
  // opsi: {bpm, sadapan: {nama: {p,q,r,s,t,st}}, irama: 'sinus' (default) | 'fa' | 'blok_av3',
  //        bpmAtrium, seed, lebarQRS} — irama 'fa' dan 'blok_av3' memakai OSCE.logika.irama.
  // opsi.sadapan menimpa nilai dasar per sadapan.
  OSCE.ekg = {
    gambar: function (opsi) {
      opsi = opsi || {};
      var bpm = opsi.bpm || 75;
      var lead = {};
      Object.keys(DASAR).forEach(function (k) { lead[k] = Object.assign({}, DASAR[k], (opsi.sadapan || {})[k] || {}); });
      var kej = (opsi.irama === 'fa' || opsi.irama === 'blok_av3') && OSCE.logika ? OSCE.logika.irama(opsi) : null;
      var w = kej && opsi.irama === 'blok_av3' ? (opsi.lebarQRS || 1.9) : 1;
      var diskordan = !!kej && opsi.irama === 'blok_av3' && w > 1.3;
      var fibAmp = function (nama) { return kej && opsi.irama === 'fa' ? (AMP_FIB[nama] || 0.03) : 0; };
      var lebarTotal = MARGIN * 2 + LEBAR * 4, tinggiTotal = MARGIN * 2 + TINGGI * 4;
      var svg = U.svg('svg', {
        viewBox: '0 0 ' + lebarTotal + ' ' + tinggiTotal, class: 'ekg', role: 'img',
        'aria-label': 'EKG 12 sadapan sintetis, kecepatan 25 mm per detik, 10 mm per mV'
      });
      var defs = U.svg('defs', {},
        U.svg('pattern', { id: 'ekg-kecil', width: 1, height: 1, patternUnits: 'userSpaceOnUse' },
          U.svg('path', { d: 'M1 0H0V1', fill: 'none', stroke: '#f3c4c4', 'stroke-width': 0.08 })),
        U.svg('pattern', { id: 'ekg-besar', width: 5, height: 5, patternUnits: 'userSpaceOnUse' },
          U.svg('rect', { width: 5, height: 5, fill: 'url(#ekg-kecil)' }),
          U.svg('path', { d: 'M5 0H0V5', fill: 'none', stroke: '#e79a9a', 'stroke-width': 0.18 })));
      svg.appendChild(defs);
      svg.appendChild(U.svg('rect', { width: lebarTotal, height: tinggiTotal, fill: '#fff6f6' }));
      svg.appendChild(U.svg('rect', { width: lebarTotal, height: tinggiTotal, fill: 'url(#ekg-besar)' }));

      TATA.forEach(function (baris, r) {
        baris.forEach(function (nama, c) {
          var x0 = MARGIN + c * LEBAR, y0 = MARGIN + r * TINGGI;
          svg.appendChild(U.svg('path', {
            d: kej ? jalurIrama(lead[nama], kej, w, diskordan, fibAmp(nama), c * 2.5, 2.5, x0, y0 + TINGGI / 2)
                   : jalur(lead[nama], bpm, c * 2.5, 2.5, x0, y0 + TINGGI / 2),
            fill: 'none', stroke: '#1a1a1a', 'stroke-width': 0.28, 'stroke-linejoin': 'round'
          }));
          svg.appendChild(U.svg('text', { x: x0 + 1, y: y0 + 4, 'font-size': 3.6, 'font-weight': 700, fill: '#7a1f1f' }, nama));
        });
      });
      var yr = MARGIN + 3 * TINGGI;
      svg.appendChild(U.svg('path', {
        d: kej ? jalurIrama(lead.II, kej, w, diskordan, fibAmp('II'), 0, 10, MARGIN, yr + TINGGI / 2)
               : jalur(lead.II, bpm, 0, 10, MARGIN, yr + TINGGI / 2),
        fill: 'none', stroke: '#1a1a1a', 'stroke-width': 0.28, 'stroke-linejoin': 'round'
      }));
      svg.appendChild(U.svg('text', { x: MARGIN + 1, y: yr + 4, 'font-size': 3.6, 'font-weight': 700, fill: '#7a1f1f' }, 'II (ritme)'));
      return svg;
    }
  };

  OSCE.widget.ekg = function (kontainer, sesi, opsi) {
    var kertas = U.el('figure', { class: 'ekg-kertas' });
    var tombol = U.el('button', { type: 'button', class: 'tombol kecil', teks: 'Perbesar (layar penuh)' });
    function atur(besar) {
      kertas.classList.toggle('layar-penuh', besar);
      tombol.textContent = besar ? 'Perkecil (Esc)' : 'Perbesar (layar penuh)';
    }
    function tombolEsc(e) { if (e.key === 'Escape') atur(false); }
    tombol.addEventListener('click', function () { atur(!kertas.classList.contains('layar-penuh')); });
    g.addEventListener('keydown', tombolEsc);
    kertas.appendChild(OSCE.ekg.gambar(opsi));
    kertas.appendChild(U.el('figcaption', {}, 'EKG sintetis untuk latihan (25 mm/detik, 10 mm/mV). Bukan rekaman pasien. ', tombol));
    kontainer.appendChild(kertas);
    return { hancurkan: function () { g.removeEventListener('keydown', tombolEsc); } };
  };
})(window);
