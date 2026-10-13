/* Widget steteskop: bunyi jantung disintesis dengan Web Audio (ilustrasi, bukan rekaman pasien).
   Klik titik pada dada; pilih diafragma (frekuensi tinggi) atau bell (frekuensi rendah). */
(function (g) {
  'use strict';
  var OSCE = (g.OSCE = g.OSCE || {});
  var U = OSCE.util;
  OSCE.widget = OSCE.widget || {};

  var TITIK = { // koordinat pada viewBox 0 0 200 230 (kanan pasien berada di kiri gambar)
    karotis: [86, 30], aorta: [80, 82], pulmonal: [120, 82], erb: [117, 104], trikuspid: [111, 128], mitral: [140, 148], aksila: [172, 132]
  };
  var SINGKAT = { karotis: 'K', aorta: 'A', pulmonal: 'P', erb: 'E', trikuspid: 'T', mitral: 'M', aksila: 'X' };
  var BEAT = 6;

  var ac = null, noiseBuf = null;
  function konteksAudio() {
    var AC = g.AudioContext || g.webkitAudioContext;
    if (!AC) return null;
    if (!ac) {
      try { ac = new AC(); } catch (e) { return null; }
    }
    if (ac.state === 'suspended') ac.resume();
    if (!noiseBuf) {
      noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      var d = noiseBuf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    return ac;
  }

  function nada(dest, t, f0, f1, dur, gain) {
    var o = ac.createOscillator(), gn = ac.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    gn.gain.setValueAtTime(0.0001, t);
    gn.gain.exponentialRampToValueAtTime(Math.max(gain, 0.0002), t + 0.008);
    gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(gn); gn.connect(dest);
    o.start(t); o.stop(t + dur + 0.02);
  }

  function bising(dest, t, jenis, amp, mode) {
    if (!amp) return;
    var src = ac.createBufferSource(), bp = ac.createBiquadFilter(), gn = ac.createGain();
    src.buffer = noiseBuf;
    bp.type = 'bandpass';
    bp.frequency.value = mode === 'd' ? 340 : 170;
    bp.Q.value = 0.7;
    var puncak = amp * 0.55;
    gn.gain.setValueAtTime(0, t + 0.06);
    if (jenis === 'ejeksi') {
      gn.gain.linearRampToValueAtTime(puncak, t + 0.17);
      gn.gain.linearRampToValueAtTime(0, t + 0.28);
    } else { // pansistolik: plateau
      gn.gain.linearRampToValueAtTime(puncak, t + 0.08);
      gn.gain.setValueAtTime(puncak, t + 0.26);
      gn.gain.linearRampToValueAtTime(0, t + 0.29);
    }
    src.connect(bp); bp.connect(gn); gn.connect(dest);
    src.start(t + 0.06); src.stop(t + 0.30);
  }

  // Bising diastolik berdengung (rumble) frekuensi rendah, decrescendo pada pertengahan diastol.
  function rumble(dest, t, amp) {
    if (!amp) return;
    var src = ac.createBufferSource(), bp = ac.createBiquadFilter(), gn = ac.createGain();
    src.buffer = noiseBuf;
    bp.type = 'bandpass'; bp.frequency.value = 80; bp.Q.value = 1.1;
    var puncak = amp * 0.7;
    gn.gain.setValueAtTime(0, t + 0.40);
    gn.gain.linearRampToValueAtTime(puncak, t + 0.46);
    gn.gain.linearRampToValueAtTime(puncak * 0.55, t + 0.54);
    gn.gain.linearRampToValueAtTime(0, t + 0.60);
    src.connect(bp); bp.connect(gn); gn.connect(dest);
    src.start(t + 0.40); src.stop(t + 0.62);
  }

  // Menjadwalkan BEAT denyut; mengembalikan fungsi penghenti.
  // luar: {diastolik: bool (syarat bising diastolik terpenuhi), tidakTeratur: bool}
  function putar(situs, mode, profil, bpm, luar) {
    luar = luar || {};
    var a = konteksAudio();
    if (!a) return null;
    var master = a.createGain(), saring = a.createBiquadFilter();
    master.gain.value = 0.9;
    saring.type = mode === 'd' ? 'highpass' : 'lowpass';
    saring.frequency.value = mode === 'd' ? 60 : 230;
    master.connect(saring); saring.connect(a.destination);
    var rr = 60 / bpm, t = a.currentTime + 0.08;
    var pola = luar.tidakTeratur ? [1, 0.8, 1.15, 0.9, 1.25, 0.85] : [1, 1, 1, 1, 1, 1];
    var s2x = (profil.s2x && profil.s2x[situs]) || 1;
    for (var b = 0; b < BEAT; b++) {
      if (b > 0) t += rr * pola[b];
      nada(master, t, 62, 42, 0.12, 0.9 * profil.s1);
      nada(master, t, 124, 84, 0.08, 0.3 * profil.s1);
      nada(master, t + 0.30, 100, 66, 0.09, 0.75 * profil.s2 * s2x);
      if (profil.sistolik) bising(master, t, profil.sistolik.jenis, (profil.sistolik.amp || {})[situs], mode);
      if (luar.diastolik && profil.snap && (profil.snap.amp || {})[situs]) nada(master, t + 0.38, 230, 160, 0.05, 0.55 * profil.snap.amp[situs]);
      if (luar.diastolik && profil.diastolik) rumble(master, t, (profil.diastolik.amp || {})[situs]);
    }
    return function () {
      try { master.gain.setValueAtTime(0, a.currentTime); master.disconnect(); } catch (e) { /* abaikan */ }
    };
  }

  function badanSvg() {
    var s = U.svg('svg', { viewBox: '0 0 200 230', class: 'badan', role: 'group', 'aria-label': 'Diagram dada pasien' });
    s.appendChild(U.svg('path', {
      d: 'M70 14 Q70 6 100 6 Q130 6 130 14 L132 44 Q168 52 184 66 L190 230 L10 230 L16 66 Q32 52 68 44 Z',
      fill: 'var(--kulit)', stroke: 'var(--garis-kuat)', 'stroke-width': 1.5
    }));
    s.appendChild(U.svg('line', { x1: 100, y1: 56, x2: 100, y2: 170, stroke: 'var(--garis-kuat)', 'stroke-width': 1, 'stroke-dasharray': '3 3' }));
    s.appendChild(U.svg('text', { x: 100, y: 188, 'text-anchor': 'middle', 'font-size': 8, fill: 'var(--teks-redup)' }, 'sternum'));
    return s;
  }

  OSCE.widget.steteskop = function (kontainer, sesi, opsi, ui) {
    var mode = 'd';
    var henti = null, timerNadi = null;
    var titikEl = {};
    var status = U.el('p', { class: 'steteskop-status', 'aria-live': 'polite', teks: 'Pilih mode, lalu klik titik pada dada.' });
    var bantuan = U.el('p', { class: 'bantuan-teks', hidden: true });
    var nadi = U.el('span', { class: 'nadi-titik', 'aria-hidden': 'true', hidden: true, teks: '●' });

    // Bising diastolik hanya terdengar bila syaratnya terpenuhi (mode alat dan aksi manuver yang sudah dilakukan).
    function diastolikAktif() {
      var d = opsi.profil.diastolik;
      if (!d) return false;
      var s = d.syarat || {};
      if (s.mode && s.mode !== mode) return false;
      return (s.aksi || []).every(function (a) { return sesi.sudah(a); });
    }
    function teksDeskripsi(id) {
      var d = opsi.deskripsi[id];
      return typeof d === 'function' ? d(sesi, mode) : d;
    }

    function hentikan() {
      if (henti) { henti(); henti = null; }
      clearInterval(timerNadi); timerNadi = null;
      nadi.classList.remove('berkedip');
    }

    function dengar(id) {
      if (sesi.selesai) return;
      var dasar = 'lis_' + id + '_' + mode;
      var nama = opsi.situs.filter(function (s) { return s[0] === id; })[0];
      if (!sesi.sudah(dasar)) {
        sesi.emit(dasar, null, {
          biaya: 15,
          label: 'Auskultasi ' + nama[1] + ' (' + (mode === 'd' ? 'diafragma' : 'bell') + ')',
          respons: '(mendengarkan…)'
        });
        ui.segarkan();
      }
      hentikan();
      henti = putar(id, mode, opsi.profil, opsi.bpm, { diastolik: diastolikAktif(), tidakTeratur: !!opsi.tidakTeratur });
      status.textContent = 'Mendengarkan: ' + nama[1] + ' (' + nama[2] + '), ' + (mode === 'd' ? 'diafragma' : 'bell') + '…';
      if (!henti) status.textContent += ' (audio tidak tersedia di peramban ini; gunakan bantuan teks)';
      if (sesi.sudah('palpasi')) {
        nadi.hidden = false;
        var rr = (60 / opsi.bpm) * 1000;
        nadi.classList.add('berkedip');
        nadi.style.animationDuration = rr + 'ms';
      } else {
        nadi.hidden = true;
      }
      if (!bantuan.hidden) bantuan.textContent = teksDeskripsi(id);
      clearTimeout(dengar.timer);
      dengar.timer = setTimeout(function () {
        hentikan();
        status.textContent = 'Selesai mendengarkan ' + nama[1] + '. Klik lagi untuk mengulang (tanpa biaya waktu).';
      }, (BEAT * 60 / opsi.bpm) * 1000 + 300);
    }

    var tombolMode = [['d', 'Diafragma (frekuensi tinggi)'], ['b', 'Bell (frekuensi rendah)']].map(function (m) {
      var radio = U.el('input', { type: 'radio', name: 'mode-steteskop', value: m[0], checked: m[0] === 'd', onchange: function () { mode = m[0]; } });
      return U.el('label', { class: 'pil' }, radio, ' ', m[1]);
    });

    var badan = badanSvg();
    opsi.situs.forEach(function (s) {
      var id = s[0], p = TITIK[id];
      var grup = U.svg('g', { class: 'titik', tabindex: 0, role: 'button', 'aria-label': 'Dengarkan ' + s[1] + ' (' + s[2] + ')' });
      grup.appendChild(U.svg('circle', { cx: p[0], cy: p[1], r: 10 }));
      grup.appendChild(U.svg('text', { x: p[0], y: p[1] + 3.5, 'text-anchor': 'middle', 'font-size': 10, 'font-weight': 700 }, SINGKAT[id]));
      grup.addEventListener('click', function () { dengar(id); });
      grup.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dengar(id); } });
      badan.appendChild(grup);
      titikEl[id] = grup;
    });

    var kunci = U.el('ul', { class: 'steteskop-kunci' }, opsi.situs.map(function (s) {
      return U.el('li', {}, U.el('strong', { teks: SINGKAT[s[0]] + ' = ' + s[1] }), ' — ' + s[2]);
    }));

    var cekBantuan = U.el('input', {
      type: 'checkbox', onchange: function (e) {
        bantuan.hidden = !e.target.checked;
        if (e.target.checked) {
          if (!sesi.sudah('bantuan_teks')) sesi.emit('bantuan_teks', true, { label: 'Menggunakan bantuan teks (deskripsi bunyi)', respons: '' });
          bantuan.textContent = teksDeskripsi('umum');
          ui.segarkan();
        }
      }
    });

    kontainer.appendChild(U.el('div', { class: 'steteskop' },
      U.el('div', { class: 'pilih-mode', role: 'radiogroup', 'aria-label': 'Mode steteskop' }, tombolMode),
      U.el('div', { class: 'steteskop-badan' }, badan, nadi),
      status,
      kunci,
      U.el('label', { class: 'pil' }, cekBantuan, ' Bantuan teks (deskripsi bunyi; tidak mengurangi skor tetapi dicatat)'),
      bantuan));

    return { hancurkan: function () { hentikan(); clearTimeout(dengar.timer); } };
  };
})(window);
