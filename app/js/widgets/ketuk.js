/* Widget uji ritme kompresi: ketuk (atau tekan spasi) selama beberapa detik; laju dihitung dari median selang.
   Latihan memakai metronom 110/menit; uji berjalan tanpa metronom. */
(function (g) {
  'use strict';
  var OSCE = (g.OSCE = g.OSCE || {});
  var U = OSCE.util;
  OSCE.widget = OSCE.widget || {};

  OSCE.widget.ketuk = function (kontainer, sesi, opsi, ui) {
    var waktu = [];
    var mode = 'diam'; // diam | uji | latihan
    var mulai = 0, sisaTimer = null, metronom = null, ac = null;

    var tombol = U.el('button', { type: 'button', class: 'tombol-ketuk', teks: 'KOMPRESI', disabled: true });
    var info = U.el('p', { class: 'ketuk-info', 'aria-live': 'polite', teks: 'Tekan "Mulai uji" lalu ketuk dengan ritme yang Anda yakini benar.' });
    var hitung = U.el('p', { class: 'ketuk-hitung', teks: '' });
    var hasil = U.el('p', { class: 'ketuk-hasil', 'aria-live': 'polite' });

    function bip() {
      var AC = g.AudioContext || g.webkitAudioContext;
      if (!AC) return;
      try {
        ac = ac || new AC();
        if (ac.state === 'suspended') ac.resume();
        var o = ac.createOscillator(), gn = ac.createGain(), t = ac.currentTime;
        o.frequency.value = 880;
        gn.gain.setValueAtTime(0.0001, t);
        gn.gain.exponentialRampToValueAtTime(0.25, t + 0.004);
        gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
        o.connect(gn); gn.connect(ac.destination);
        o.start(t); o.stop(t + 0.06);
      } catch (e) { /* abaikan */ }
    }

    function hentikanSemua() {
      clearInterval(sisaTimer); sisaTimer = null;
      clearInterval(metronom); metronom = null;
      mode = 'diam';
      tombol.disabled = true;
    }

    function ketuk() {
      if (mode === 'diam') return;
      var t = performance.now();
      if (mode === 'uji') waktu.push(t);
      tombol.classList.add('tekan');
      setTimeout(function () { tombol.classList.remove('tekan'); }, 80);
      hitung.textContent = mode === 'uji' ? waktu.length + ' ketukan' : '';
    }

    function selesaiUji() {
      hentikanSemua();
      var laju = OSCE.logika.lajuDariKetukan(waktu);
      if (waktu.length < opsi.minimal || laju == null) {
        info.textContent = 'Terlalu sedikit ketukan (' + waktu.length + '; minimal ' + opsi.minimal + '). Uji tidak dihitung; ulangi.';
        hasil.textContent = '';
        return;
      }
      var ok = laju >= opsi.target[0] && laju <= opsi.target[1];
      info.textContent = 'Selesai.';
      hasil.textContent = 'Laju Anda: ' + laju + ' x/menit (target ' + opsi.target[0] + '–' + opsi.target[1] + '). ' + (ok ? 'Sesuai.' : 'Di luar target.');
      if (sesi.selesai) return;
      sesi.emit('rjp_laju', laju, { biaya: opsi.biaya, label: 'Uji ritme kompresi', respons: 'Laju Anda ' + laju + ' x/menit (target ' + opsi.target[0] + '–' + opsi.target[1] + ').' });
      OSCE.logika.ketuk(laju).forEach(function (id) { sesi.emit(id, laju); });
      ui.segarkan();
    }

    function mulaiUji() {
      if (sesi.selesai) return;
      hentikanSemua();
      waktu = [];
      mode = 'uji';
      tombol.disabled = false;
      tombol.focus();
      mulai = performance.now();
      hasil.textContent = '';
      sisaTimer = setInterval(function () {
        var sisa = opsi.durasi - (performance.now() - mulai) / 1000;
        info.textContent = 'Ketuk terus… sisa ' + Math.max(0, Math.ceil(sisa)) + ' detik.';
        if (sisa <= 0) selesaiUji();
      }, 200);
    }

    function mulaiLatihan() {
      hentikanSemua();
      mode = 'latihan';
      tombol.disabled = false;
      hasil.textContent = '';
      info.textContent = 'Latihan: ikuti bunyi metronom (110/menit). Tekan "Hentikan" bila selesai.';
      metronom = setInterval(bip, 60000 / 110);
    }

    tombol.addEventListener('pointerdown', function (e) { e.preventDefault(); ketuk(); });
    function tombolSpasi(e) {
      if (mode === 'diam' || e.repeat) return;
      if (e.code === 'Space') { e.preventDefault(); ketuk(); }
    }
    g.addEventListener('keydown', tombolSpasi);

    kontainer.appendChild(U.el('div', { class: 'ketuk' },
      tombol, hitung, info, hasil,
      U.el('div', { class: 'tensi-kontrol' },
        U.el('button', { type: 'button', class: 'tombol utama', onclick: mulaiUji, teks: 'Mulai uji (' + opsi.durasi + ' detik)' }),
        U.el('button', { type: 'button', class: 'tombol', onclick: mulaiLatihan, teks: 'Latihan dengan metronom' }),
        U.el('button', { type: 'button', class: 'tombol', onclick: function () { hentikanSemua(); info.textContent = 'Dihentikan.'; }, teks: 'Hentikan' })),
      U.el('p', { class: 'peringatan-kecil', teks: 'Catatan: aplikasi hanya dapat menilai ritme. Kedalaman, posisi tangan, dan recoil nyata harus dilatih pada manikin berumpan balik.' })));

    return { hancurkan: function () { hentikanSemua(); g.removeEventListener('keydown', tombolSpasi); } };
  };
})(window);
