/* Widget tensimeter aneroid virtual dengan bunyi Korotkoff.
   Alur: pompa → estimasi palpatoir (nadi radialis hilang) → pompa 20–30 mmHg di atasnya →
   buka katup pelan (2–3 mmHg/detik) → tandai bunyi pertama dan bunyi hilang → catat pengukuran. */
(function (g) {
  'use strict';
  var OSCE = (g.OSCE = g.OSCE || {});
  var U = OSCE.util;
  OSCE.widget = OSCE.widget || {};

  var PUSAT = [110, 105], R = 80;
  function sudut(p) { return -120 + (Math.min(Math.max(p, 0), 300) / 300) * 240; }
  function titikPolar(sdt, r) {
    var a = (sdt - 90) * Math.PI / 180;
    return [PUSAT[0] + r * Math.cos(a), PUSAT[1] + r * Math.sin(a)];
  }

  function gambarMuka() {
    var s = U.svg('svg', { viewBox: '0 0 220 200', class: 'tensi-muka', role: 'img', 'aria-label': 'Tensimeter aneroid, skala 0 sampai 300 mmHg' });
    s.appendChild(U.svg('circle', { cx: PUSAT[0], cy: PUSAT[1], r: R + 14, fill: 'var(--permukaan)', stroke: 'var(--garis-kuat)', 'stroke-width': 3 }));
    for (var p = 0; p <= 300; p += 2) {
      var besar = p % 50 === 0, sedang = p % 10 === 0;
      if (!sedang && p % 2 !== 0) continue;
      var a = titikPolar(sudut(p), R), b = titikPolar(sudut(p), R - (besar ? 14 : sedang ? 9 : 4));
      s.appendChild(U.svg('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: 'var(--teks)', 'stroke-width': besar ? 1.8 : sedang ? 1.1 : 0.5 }));
      if (besar) {
        var t = titikPolar(sudut(p), R - 26);
        s.appendChild(U.svg('text', { x: t[0], y: t[1] + 3.5, 'text-anchor': 'middle', 'font-size': 10, 'font-weight': 600, fill: 'var(--teks)' }, String(p)));
      }
    }
    s.appendChild(U.svg('text', { x: PUSAT[0], y: PUSAT[1] + 50, 'text-anchor': 'middle', 'font-size': 9, fill: 'var(--teks-redup)' }, 'mmHg'));
    var jarum = U.svg('line', { x1: PUSAT[0], y1: PUSAT[1], x2: PUSAT[0], y2: PUSAT[1] - (R - 6), stroke: '#c0392b', 'stroke-width': 2.4, 'stroke-linecap': 'round' });
    jarum.style.transformOrigin = PUSAT[0] + 'px ' + PUSAT[1] + 'px';
    s.appendChild(jarum);
    s.appendChild(U.svg('circle', { cx: PUSAT[0], cy: PUSAT[1], r: 5, fill: '#444' }));
    return { svg: s, jarum: jarum };
  }

  OSCE.widget.tensimeter = function (kontainer, sesi, opsi, ui) {
    var cfg = { sist: opsi.sist, dia: opsi.dia };
    var rr = 60 / opsi.hr;
    var st = sesi.widgetState = sesi.widgetState || { bacaan: [] };
    var P = 0, maxP = 0, katup = 0, memompa = false, buang = false;
    var est = null, sistTangkap = null, diaTangkap = null;
    var first = null, last = null, t160 = null, t90 = null, laju = null;
    var akum = 0, sebelum = 0, terakhir = performance.now();
    var suara = true;

    var pesan = U.el('p', { class: 'tensi-pesan', 'aria-live': 'polite' });
    var muka = gambarMuka();
    var lampuNadi = U.el('span', { class: 'lampu', teks: 'Nadi radialis' });
    var lampuBunyi = U.el('span', { class: 'lampu', teks: 'Bunyi Korotkoff' });
    var catatan = U.el('p', { class: 'tensi-tangkap' });
    var daftarBacaan = U.el('ul', { class: 'tensi-bacaan' });

    function bias() { return typeof opsi.bias === 'function' ? opsi.bias(sesi.ctx) : 0; }
    function sistEf() { return cfg.sist + bias(); }
    function diaEf() { return cfg.dia + bias(); }

    function bunyi() {
      if (!suara) return;
      var AC = g.AudioContext || g.webkitAudioContext;
      if (!AC) return;
      try {
        g.OSCE._acTensi = g.OSCE._acTensi || new AC();
        var a = g.OSCE._acTensi;
        if (a.state === 'suspended') a.resume();
        var o = a.createOscillator(), gn = a.createGain(), t = a.currentTime;
        o.type = 'sine';
        o.frequency.setValueAtTime(110, t);
        o.frequency.exponentialRampToValueAtTime(55, t + 0.07);
        gn.gain.setValueAtTime(0.0001, t);
        gn.gain.exponentialRampToValueAtTime(0.5, t + 0.006);
        gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
        o.connect(gn); gn.connect(a.destination);
        o.start(t); o.stop(t + 0.1);
      } catch (e) { /* abaikan */ }
    }

    function kedip(el) {
      el.classList.add('nyala');
      setTimeout(function () { el.classList.remove('nyala'); }, 140);
    }

    function denyut() {
      if (P < sistEf()) kedip(lampuNadi);
      if (P < sistEf() && P > diaEf()) {
        if (first == null) first = P;
        last = P;
        kedip(lampuBunyi);
        bunyi();
      }
    }

    function jarumPerbarui() { muka.jarum.style.transform = 'rotate(' + sudut(P) + 'deg)'; }

    function langkah() {
      var kini = performance.now(), dt = Math.min((kini - terakhir) / 1000, 0.2);
      terakhir = kini;
      var lama = P;
      if (memompa) P = Math.min(300, P + 45 * dt);
      else if (buang) P = Math.max(0, P - 60 * dt);
      else if (katup > 0) P = Math.max(0, P - katup * 1.2 * dt);
      if (P > maxP) maxP = P;
      if (P > 175 && P > lama) { t160 = null; t90 = null; first = null; last = null; laju = null; }
      if (P < lama) {
        if (t160 == null && lama > 160 && P <= 160) t160 = kini;
        if (t160 != null && t90 == null && lama > 90 && P <= 90) { t90 = kini; laju = 70 / ((t90 - t160) / 1000); }
      }
      akum += dt;
      if (akum >= rr) { akum -= rr; denyut(); }
      jarumPerbarui();
      sebelum = P;
    }

    function dasarTombol(teks, aksi, kelas) { return U.el('button', { type: 'button', class: 'tombol ' + (kelas || ''), onclick: aksi, teks: teks }); }

    var tombolPompa = U.el('button', {
      type: 'button', class: 'tombol utama', teks: 'Pompa (tahan)',
      onpointerdown: function (e) { e.preventDefault(); memompa = true; },
      onpointerup: function () { memompa = false; },
      onpointerleave: function () { memompa = false; },
      onpointercancel: function () { memompa = false; },
      onclick: function (e) { if (e.detail === 0) P = Math.min(300, P + 10); }
    });
    var geser = U.el('input', {
      type: 'range', min: 0, max: 10, step: 0.5, value: 0, 'aria-label': 'Katup pembuang udara',
      oninput: function (e) { katup = Number(e.target.value); }
    });
    var tombolBuang = U.el('button', {
      type: 'button', class: 'tombol', teks: 'Kosongkan cepat (tahan)',
      onpointerdown: function (e) { e.preventDefault(); buang = true; },
      onpointerup: function () { buang = false; },
      onpointerleave: function () { buang = false; },
      onpointercancel: function () { buang = false; },
      onclick: function (e) { if (e.detail === 0) P = 0; }
    });

    function tampilTangkap() {
      var bagian = [];
      if (est != null) bagian.push('Estimasi palpatoir: ' + Math.round(est) + ' mmHg');
      if (sistTangkap != null) bagian.push('Sistolik (bunyi pertama): ' + Math.round(sistTangkap) + ' mmHg');
      if (diaTangkap != null) bagian.push('Diastolik (bunyi hilang): ' + Math.round(diaTangkap) + ' mmHg');
      catatan.textContent = bagian.length ? bagian.join(' · ') : 'Belum ada nilai yang ditandai.';
    }

    function mulaiUlang() {
      P = 0; maxP = 0; est = null; sistTangkap = null; diaTangkap = null;
      first = null; last = null; t160 = null; t90 = null; laju = null; katup = 0; geser.value = 0;
      tampilTangkap();
    }

    function gambarBacaan() {
      daftarBacaan.textContent = '';
      st.bacaan.forEach(function (b, i) {
        daftarBacaan.appendChild(U.el('li', { teks: 'Pengukuran ' + (i + 1) + ': ' + b.sist + '/' + b.dia + ' mmHg' }));
      });
    }

    function catatPengukuran() {
      var belumSiap = typeof opsi.siap === 'function' ? opsi.siap(sesi.ctx) : null;
      if (belumSiap) { pesan.textContent = belumSiap; return; }
      if (est == null) { pesan.textContent = 'Catat estimasi palpatoir dulu (saat nadi radialis hilang).'; return; }
      if (sistTangkap == null || diaTangkap == null) { pesan.textContent = 'Tandai bunyi pertama dan bunyi hilang dulu.'; return; }
      if (sesi.selesai) return;
      var m = { sist: Math.round(sistTangkap), dia: Math.round(diaTangkap), maxP: Math.round(maxP), laju: laju == null ? null : Math.round(laju * 10) / 10, est: Math.round(est) };
      var nomor = st.bacaan.length + 1;
      sesi.emit('bp_baca', m, { biaya: opsi.biaya, label: 'Pengukuran tekanan darah #' + nomor, respons: 'Dicatat: ' + m.sist + '/' + m.dia + ' mmHg.' });
      OSCE.logika.bp(m, { sist: cfg.sist, dia: cfg.dia, bias: bias() }).forEach(function (id) { sesi.emit(id, m); });
      st.bacaan.push(m);
      gambarBacaan();
      mulaiUlang();
      pesan.textContent = 'Pengukuran ' + nomor + ' dicatat. Ulangi setelah menunggu 1–2 menit (aksi "Ulang & lengan").';
      ui.segarkan();
    }

    var siapPesan = typeof opsi.siap === 'function' ? opsi.siap(sesi.ctx) : null;
    var papan = U.el('div', { class: 'tensi' },
      U.el('div', { class: 'tensi-atas' }, muka.svg,
        U.el('div', { class: 'tensi-lampu' }, lampuNadi, lampuBunyi,
          U.el('label', { class: 'pil' }, U.el('input', { type: 'checkbox', checked: true, onchange: function (e) { suara = e.target.checked; } }), ' Suara'))),
      U.el('div', { class: 'tensi-kontrol' },
        tombolPompa,
        U.el('label', { class: 'katup' }, 'Katup (0 = tertutup; target deflasi 2–3 mmHg/detik)', geser),
        tombolBuang),
      U.el('div', { class: 'tensi-kontrol' },
        dasarTombol('1. Catat estimasi (nadi radialis hilang)', function () { est = P; tampilTangkap(); }),
        dasarTombol('2. Bunyi pertama terdengar', function () {
          if (first == null) { pesan.textContent = 'Belum ada bunyi Korotkoff. Buka katup perlahan dari tekanan di atas sistolik.'; return; }
          sistTangkap = first; tampilTangkap();
        }),
        dasarTombol('3. Bunyi menghilang', function () {
          if (last == null) { pesan.textContent = 'Belum ada bunyi yang terdengar.'; return; }
          diaTangkap = last; tampilTangkap();
        }),
        dasarTombol('4. Catat pengukuran', catatPengukuran, 'utama')),
      catatan, pesan, daftarBacaan);

    if (siapPesan) {
      kontainer.appendChild(U.el('p', { class: 'peringatan-kecil', teks: siapPesan }));
      // widget tetap ditampilkan agar pengguna dapat berlatih, tetapi pengukuran tidak dapat dicatat tanpa prasyarat
    }
    kontainer.appendChild(papan);
    tampilTangkap();
    gambarBacaan();
    jarumPerbarui();
    var interval = setInterval(langkah, 50);

    return { hancurkan: function () { clearInterval(interval); } };
  };
})(window);
