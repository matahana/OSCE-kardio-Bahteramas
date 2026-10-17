/* Antarmuka: beranda, briefing, ruang simulasi, hasil, mode penguji, riwayat, tentang. */
(function (g) {
  'use strict';
  var OSCE = g.OSCE, U = OSCE.util, el = U.el;
  var UI = (OSCE.ui = { sesi: null, hasil: null, widget: null, widgetUtama: null, penguji: null, tab: null, langsung: false, draf: {}, cari: '', mode: 'latihan', tes: null, pembersih: null });
  var KUNCI_RIWAYAT = 'osce.riwayat.v1';
  var LABEL_GLOBAL = ['', 'Tidak lulus', 'Borderline', 'Lulus', 'Sangat baik'];
  var DESKRIPSI_GLOBAL = [
    '',
    'Kinerja jelas di bawah standar; tidak aman atau tidak kompeten untuk tugas ini',
    'Mendekati standar minimum; sebagian domain memadai, sebagian belum',
    'Memenuhi standar minimum yang diharapkan pada level pendidikan ini',
    'Melampaui standar; sistematis, aman, dan komunikatif'
  ];

  function app() { return document.getElementById('app'); }

  function bersihkan() {
    if (UI.pembersih) { var f = UI.pembersih; UI.pembersih = null; try { f(); } catch (e) { /* abaikan */ } }
    if (UI.widget) { UI.widget.hancurkan(); UI.widget = null; }
    if (UI.widgetUtama) { UI.widgetUtama.hancurkan(); UI.widgetUtama = null; }
    if (UI.penguji && UI.penguji.berhenti) { UI.penguji.berhenti(); UI.penguji = null; }
    app().textContent = '';
  }
  function pasang(node) {
    bersihkan();
    app().appendChild(node);
    g.scrollTo(0, 0);
  }
  function chip(teks, kelas) { return el('span', { class: 'chip' + (kelas ? ' ' + kelas : ''), teks: teks }); }
  function tautan(href, teks, kelas) { return el('a', { href: href, class: 'tombol' + (kelas ? ' ' + kelas : ''), teks: teks }); }
  function tombol(teks, aksi, kelas) { return el('button', { type: 'button', class: 'tombol' + (kelas ? ' ' + kelas : ''), onclick: aksi, teks: teks }); }
  UI.alat = { pasang: pasang, chip: chip, tautan: tautan, tombol: tombol, vitalChips: function (v) { return vitalChips(v); }, bersihkan: bersihkan, riwayat: function () { return Riwayat; } };

  /* ---------- riwayat ---------- */

  var Riwayat = (OSCE.riwayat = {
    semua: function () { return U.simpan.baca(KUNCI_RIWAYAT, []); },
    tambah: function (rec) {
      var a = Riwayat.semua();
      a.unshift(rec);
      U.simpan.tulis(KUNCI_RIWAYAT, a.slice(0, 300));
    },
    hapusSemua: function () { U.simpan.hapus(KUNCI_RIWAYAT); },
    terakhir: function (id, tipe) {
      return Riwayat.semua().filter(function (r) { return r.stasiun === id && (!tipe || r.tipe === tipe); })[0] || null;
    }
  });

  /* ---------- beranda ---------- */

  UI.beranda = function () {
    var kartu = OSCE.daftarStasiun().map(function (st) {
      var akhir = Riwayat.terakhir(st.id, 'latihan') || Riwayat.terakhir(st.id, 'tes');
      return el('article', { class: 'kartu' },
        el('p', { class: 'kartu-no', teks: 'Stasiun ' + st.id }),
        el('h3', { teks: st.judul }),
        el('p', { class: 'chip-baris' }, chip(st.durasiMenit + ' menit'), chip(st.skorMaks + ' poin'), chip(st.meta.Jenis || '', 'redup')),
        akhir ? el('p', { class: 'kartu-akhir', teks: (akhir.tipe === 'tes' ? 'Tes terakhir: ' : 'Latihan terakhir: ') + akhir.skor + '/' + akhir.maks + ' (' + akhir.persen + '%), ' + akhir.global }) : null,
        el('div', { class: 'kartu-aksi' },
          st.interaksi ? tautan('#/briefing/' + st.id, 'Mulai latihan', 'utama') : chip('Segera hadir'),
          st.interaksi ? tautan('#/tes/' + st.id, 'Mulai tes') : null,
          tautan('#/penguji/' + st.id, 'Mode penguji')));
    });
    var riwayat = Riwayat.semua().slice(0, 5);
    pasang(el('div', { class: 'beranda' },
      el('section', { class: 'hero' },
        el('h1', { teks: 'Simulator OSCE Kardiovaskular' }),
        el('p', { teks: 'Latih stasiun OSCE dengan daftar tindakan (latihan), uji diri tanpa menu lewat percakapan ketik atau suara (tes), atau pakai lembar penilaian digital sebagai penguji. Seluruh checklist berasal dari dokumen stasiun di repositori ini.' }),
        el('p', { class: 'peringatan' }, el('strong', { teks: 'DRAF v0.1. ' }), 'Untuk pembelajaran; bukan alat penilaian resmi. Konten belum direview kardiolog dan angka klinis belum diverifikasi ke teks lengkap guideline.')),
      el('section', {}, el('h2', { teks: 'Pilih stasiun' }), el('div', { class: 'kartu-kisi' }, kartu)),
      el('section', {},
        el('h2', { teks: 'Riwayat terakhir' }),
        riwayat.length ? tabelRiwayat(riwayat) : el('p', { class: 'redup', teks: 'Belum ada riwayat. Hasil latihan dan penilaian penguji tersimpan di peramban ini.' }),
        riwayat.length ? tautan('#/riwayat', 'Lihat semua riwayat') : null)));
  };

  function tabelRiwayat(daftar) {
    return el('div', { class: 'tabel-bungkus' }, el('table', { class: 'tabel' },
      el('thead', {}, el('tr', {}, ['Waktu', 'Stasiun', 'Jenis', 'Skor', 'Penilaian global'].map(function (h) { return el('th', { scope: 'col', teks: h }); }))),
      el('tbody', {}, daftar.map(function (r) {
        return el('tr', {},
          el('td', { teks: U.tanggal(r.waktu) }),
          el('td', { teks: r.stasiun + ' ' + r.judul }),
          el('td', { teks: r.tipe === 'penguji' ? 'Penguji' + (r.kandidat ? ' (' + r.kandidat + ')' : '') : r.tipe === 'tes' ? 'Tes' : 'Latihan' }),
          el('td', { teks: r.skor + '/' + r.maks + ' (' + r.persen + '%)' }),
          el('td', { teks: r.global + (r.kritisGagal ? ' · butir kritis tak terpenuhi: ' + r.kritisGagal : '') }));
      }))));
  }

  /* ---------- briefing ---------- */

  UI.briefing = function (id) {
    var st = OSCE.ambil(id);
    if (!st || !st.interaksi) { location.hash = '#/'; return; }
    var def = st.interaksi;
    var langsung = el('input', { type: 'checkbox', id: 'langsung' });
    pasang(el('article', { class: 'briefing' },
      tautan('#/', '← Kembali', 'tipis'),
      el('p', { class: 'kartu-no', teks: 'Stasiun ' + st.id }),
      el('h1', { teks: st.judul }),
      el('p', { class: 'chip-baris' }, chip(st.durasiMenit + ' menit'), chip(st.skorMaks + ' poin'), chip(st.meta.Jenis || '', 'redup')),
      el('section', { class: 'kotak' }, el('h2', { teks: 'Instruksi untuk kandidat' }), el('div', { class: 'md', html: U.md(st.instruksiKandidat) })),
      def.tandaVital && def.tandaVital.length ? el('section', {}, el('h2', { teks: 'Tanda vital awal' }), vitalChips(def.tandaVital)) : null,
      el('section', { class: 'kotak' },
        el('h2', { teks: 'Cara kerja simulasi' }),
        el('ul', {},
          el('li', { teks: 'Jam simulasi ' + U.fmtWaktu(def.waktu) + '. Setiap tindakan memakan waktu simulasi (tercantum di tombolnya); waktu nyata tidak dihitung.' }),
          el('li', { teks: 'Tidak semua hal dapat dilakukan dalam waktu yang ada: prioritaskan yang paling penting.' }),
          el('li', { teks: 'Tidak ada umpan balik sampai stasiun selesai, seperti OSCE sesungguhnya (kecuali Anda mengaktifkan umpan balik langsung).' }),
          el('li', { teks: 'Hasil menampilkan checklist, tindakan yang tidak tepat atau berisiko, pembahasan, dan contoh urutan ideal.' }),
          el('li', { teks: 'Pengguna aplikasi bertanggung jawab: ini alat belajar, bukan pengganti penilaian oleh penguji.' }))),
      el('label', { class: 'pil' }, langsung, ' Umpan balik langsung (mode belajar): tindakan tidak tepat langsung ditandai'),
      el('div', { class: 'aksi-bawah' },
        tombol('Mulai (' + U.fmtWaktu(def.waktu) + ')', function () {
          UI.sesi = OSCE.mulaiSesi(id);
          UI.hasil = null;
          UI.mode = 'latihan';
          UI.tes = null;
          UI.langsung = langsung.checked;
          UI.tab = def.panel[0].id;
          UI.draf = {};
          UI.cari = '';
          location.hash = '#/sesi/' + id;
        }, 'utama'))));
  };

  function vitalChips(vital) {
    return el('p', { class: 'chip-baris' }, vital.map(function (v) { return chip(v[0] + ': ' + v[1], 'vital'); }));
  }

  // Panel jawaban terstruktur (dropdown/centang). Dipakai latihan, dan mode tes bila LLM tidak tersedia.
  UI.panelForm = function (sesi, p, segarkan) {
    var wadah = el('div', { class: 'panel-form' });
    if (p.catatan) wadah.appendChild(el('p', { class: 'catatan', teks: p.catatan }));
    if (sesi.formTerkirim(p.id)) {
      var entri = sesi.log.filter(function (e) { return e.tipe === 'form' && e.id === p.id; })[0];
      wadah.appendChild(el('p', { class: 'ok', teks: 'Jawaban bagian ini sudah dikirim dan tidak dapat diubah.' }));
      wadah.appendChild(el('pre', { class: 'ringkas', teks: entri ? entri.respons : '' }));
      return wadah;
    }
    var awal = UI.draf[p.id] || {};
    var form = el('form', { class: 'form-jawab', onsubmit: function (e) { e.preventDefault(); } });
    var baca = {};
    p.bidang.forEach(function (b) {
      var nilai = awal[b.id], baris;
      if (b.tipe === 'select') {
        var sel = el('select', { 'aria-label': b.label, data: { bidang: b.id } },
          el('option', { value: '', teks: '— pilih —' }),
          b.opsi.map(function (o) { return el('option', { value: o[0], teks: o[1], selected: nilai === o[0] }); }));
        baca[b.id] = function () { return sel.value; };
        baris = el('label', { class: 'bidang' }, el('span', { teks: b.label }), sel);
      } else if (b.tipe === 'multi') {
        var kotak = b.opsi.map(function (o) {
          return el('label', { class: 'pil' }, el('input', { type: 'checkbox', value: o[0], checked: (nilai || []).indexOf(o[0]) >= 0 }), ' ', o[1]);
        });
        var set = el('fieldset', { class: 'bidang', data: { bidang: b.id } }, el('legend', { teks: b.label }), el('div', { class: b.opsi.length > 8 ? 'kisi-cek' : 'tumpuk' }, kotak));
        baca[b.id] = function () {
          return Array.prototype.map.call(set.querySelectorAll('input:checked'), function (i) { return i.value; });
        };
        baris = set;
      } else if (b.tipe === 'cek') {
        var cek = el('input', { type: 'checkbox', checked: !!nilai, data: { bidang: b.id } });
        baca[b.id] = function () { return cek.checked; };
        baris = el('label', { class: 'bidang pil' }, cek, ' ', b.teks || b.label);
      } else {
        var angka = el('input', { type: 'number', min: b.min, max: b.max, step: 1, value: nilai == null ? '' : nilai, 'aria-label': b.label, data: { bidang: b.id } });
        baca[b.id] = function () { return angka.value === '' ? '' : Number(angka.value); };
        baris = el('label', { class: 'bidang' }, el('span', { teks: b.label + (b.satuan ? ' (' + b.satuan + ')' : '') }), angka);
      }
      form.appendChild(baris);
    });
    function bacaSemua() {
      var o = {};
      p.bidang.forEach(function (b) { o[b.id] = baca[b.id](); });
      return o;
    }
    form.addEventListener('input', function () { UI.draf[p.id] = bacaSemua(); });
    form.addEventListener('change', function () { UI.draf[p.id] = bacaSemua(); });
    wadah.appendChild(form);
    wadah.appendChild(el('div', { class: 'aksi-bawah' },
      tombol('Kirim jawaban (−' + (p.biaya || 0) + ' dtk)', function () {
        if (sesi.selesai) return;
        var r = sesi.kirimForm(p.id, bacaSemua());
        if (!r.ok) U.toast(r.alasan, 'peringatan');
        segarkan();
      }, 'utama')));
    return wadah;
  };

  /* ---------- ruang simulasi ---------- */

  UI.ruang = function (id) {
    var sesi = UI.sesi;
    if (sesi && UI.mode === 'tes') { location.hash = '#/tes-sesi/' + id; return; }
    if (!sesi || sesi.stasiun.id !== id) { location.hash = '#/briefing/' + id; return; }
    var st = sesi.stasiun, def = sesi.def;
    var jam = el('output', { class: 'jam', 'aria-label': 'Sisa waktu simulasi' });
    var logEl = el('ol', { class: 'log', 'aria-label': 'Percakapan dan log tindakan' });
    var terbaru = el('div', { class: 'respons-terbaru', 'aria-live': 'polite' });
    var banner = el('div', { class: 'banner-selesai', role: 'alert', hidden: true });
    var tabBar = el('div', { class: 'tab-bar', role: 'tablist' });
    var isi = el('div', { class: 'panel-isi', role: 'tabpanel' });
    var utama = el('div', { class: 'widget-utama' });
    var ui = { segarkan: segarkan, toast: U.toast };

    function panelAktif() {
      return def.panel.filter(function (p) { return p.id === UI.tab; })[0] || def.panel[0];
    }

    function renderJam() {
      jam.textContent = U.fmtWaktu(sesi.sisa);
      jam.className = 'jam' + (sesi.sisa <= 60 ? ' genting' : '');
    }

    function renderLog() {
      logEl.textContent = '';
      sesi.log.forEach(function (e) {
        var wkt = el('span', { class: 'wkt', teks: U.fmtWaktu(e.t) });
        if (e.tipe === 'sistem') {
          logEl.appendChild(el('li', { class: 'log-item t-sistem' }, wkt, ' ', e.label));
          return;
        }
        var kelas = 'log-item t-' + e.tipe + (UI.langsung && e.berisiko ? ' berisiko' : UI.langsung && e.tidakTepat ? ' tidak-tepat' : '');
        var item = el('li', { class: kelas },
          el('div', { class: 'anda' }, wkt, ' ', el('strong', { teks: e.tipe === 'form' ? 'Jawaban dikirim: ' : 'Anda: ' }), e.label),
          e.respons ? el('div', { class: 'resp', teks: e.respons }) : null);
        if (UI.langsung && (e.berisiko || e.tidakTepat)) {
          item.appendChild(el('div', { class: 'flag', teks: (e.berisiko ? 'Berisiko: ' : 'Tidak tepat: ') + (e.berisiko || e.tidakTepat) }));
        }
        logEl.appendChild(item);
      });
      logEl.scrollTop = logEl.scrollHeight;
    }

    function renderTerbaru() {
      terbaru.textContent = '';
      var terakhir = null;
      for (var i = sesi.log.length - 1; i >= 0; i--) {
        if (sesi.log[i].tipe !== 'sistem') { terakhir = sesi.log[i]; break; }
      }
      if (!terakhir || !terakhir.respons) return;
      terbaru.appendChild(el('strong', { teks: 'Respons terbaru: ' }));
      terbaru.appendChild(document.createTextNode(terakhir.respons.split('\n')[0]));
    }

    function renderTab() {
      tabBar.textContent = '';
      def.panel.forEach(function (p) {
        var aktif = p.id === UI.tab;
        var tanda = p.tipe === 'form' && sesi.formTerkirim(p.id) ? ' ✓' : '';
        tabBar.appendChild(el('button', {
          type: 'button', role: 'tab', class: 'tab' + (aktif ? ' aktif' : ''), 'aria-selected': aktif ? 'true' : 'false', data: { panel: p.id },
          onclick: function () { UI.tab = p.id; renderTab(); renderPanel(); }, teks: p.label + tanda
        }));
      });
    }

    function lakukan(idAksi) {
      var r = sesi.lakukan(idAksi);
      if (!r.ok) U.toast(r.alasan, 'peringatan');
      segarkan();
    }

    function panelAksi(p) {
      var wadah = el('div', { class: 'panel-aksi' });
      if (p.catatan) wadah.appendChild(el('p', { class: 'catatan', teks: p.catatan }));
      var cari = null;
      if (p.cari) {
        cari = el('input', {
          type: 'search', class: 'cari', placeholder: 'Cari pertanyaan atau tindakan…', 'aria-label': 'Cari tindakan',
          value: UI.cari, oninput: function (e) { UI.cari = e.target.value; saring(); }
        });
        wadah.appendChild(cari);
      }
      var bagian = [];
      p.grup.forEach(function (gr) {
        var ul = el('ul', { class: 'daftar-aksi' });
        gr.aksi.forEach(function (a) {
          var selesai = a.sekali !== false && sesi.sudah(a.id);
          var btn = el('button', {
            type: 'button', class: 'aksi' + (selesai ? ' selesai' : ''), disabled: selesai || sesi.selesai, data: { id: a.id },
            onclick: function () { lakukan(a.id); }
          }, el('span', { class: 'aksi-teks', teks: a.label }), el('span', { class: 'biaya', teks: selesai ? '✓' : '+' + a.biaya + ' dtk' }));
          ul.appendChild(el('li', { data: { teks: a.label.toLowerCase() } }, btn));
        });
        var seksi = el('section', { class: 'grup-aksi' }, el('h4', { teks: gr.judul }), ul);
        bagian.push(seksi);
        wadah.appendChild(seksi);
      });
      function saring() {
        var q = (UI.cari || '').trim().toLowerCase();
        bagian.forEach(function (seksi) {
          var tampil = 0;
          Array.prototype.forEach.call(seksi.querySelectorAll('li'), function (li) {
            var cocok = !q || li.dataset.teks.indexOf(q) >= 0;
            li.hidden = !cocok;
            if (cocok) tampil++;
          });
          seksi.hidden = tampil === 0;
        });
      }
      saring();
      return wadah;
    }

    function renderPanel() {
      if (UI.widget) { UI.widget.hancurkan(); UI.widget = null; }
      isi.textContent = '';
      var p = panelAktif();
      if (p.tipe === 'aksi') isi.appendChild(panelAksi(p));
      else if (p.tipe === 'form') isi.appendChild(UI.panelForm(sesi, p, segarkan));
      else if (p.tipe === 'widget') {
        if (p.catatan) isi.appendChild(el('p', { class: 'catatan', teks: p.catatan }));
        var wadah = el('div', { class: 'wadah-widget' });
        isi.appendChild(wadah);
        UI.widget = OSCE.widget[p.widget](wadah, sesi, p.opsi || {}, ui);
      }
    }

    function segarkan() {
      renderJam();
      renderLog();
      renderTerbaru();
      renderTab();
      if (panelAktif().tipe !== 'widget') renderPanel();
      if (sesi.selesai) {
        banner.hidden = false;
        banner.textContent = '';
        banner.appendChild(el('strong', { teks: sesi.alasanSelesai === 'waktu' ? 'Waktu habis. ' : 'Stasiun selesai. ' }));
        banner.appendChild(tombol('Lihat hasil', function () { UI.selesaikan(); }, 'utama'));
      }
    }

    var kolomPasien = el('aside', { class: 'kolom-pasien' },
      el('div', { class: 'kartu-pasien' },
        el('div', { class: 'avatar', 'aria-hidden': 'true', teks: (def.pasien.nama || '?').replace(/^(Tn\.|Ny\.|Ibu|Bapak)\s*/, '').charAt(0).toUpperCase() }),
        el('div', {}, el('h3', { teks: def.pasien.nama }), el('p', { class: 'redup', teks: def.pasien.ringkas }))),
      el('p', { class: 'keadaan', teks: def.pasien.keadaan || '' }),
      def.tandaVital && def.tandaVital.length ? vitalChips(def.tandaVital) : el('p', { class: 'redup', teks: 'Tanda vital diperoleh bila diminta.' }),
      def.petunjuk ? el('p', { class: 'petunjuk', teks: def.petunjuk }) : null);

    var widgetUtama = def.widgetUtama ? OSCE.widget[def.widgetUtama.nama](utama, sesi, def.widgetUtama.opsi || {}, ui) : null;

    var atas = el('div', { class: 'bar-atas' },
      el('div', { class: 'judul-ruang' }, el('p', { class: 'kartu-no', teks: 'Stasiun ' + st.id }), el('h2', { teks: st.judul })),
      el('div', { class: 'jam-bungkus' }, el('span', { class: 'jam-label', teks: 'Sisa waktu simulasi' }), jam),
      el('div', { class: 'bar-tombol' },
        tombol('Keluar', function () {
          if (g.confirm('Keluar tanpa menyimpan hasil?')) { UI.sesi = null; location.hash = '#/'; }
        }),
        tombol('Akhiri stasiun', function () {
          if (sesi.selesai || g.confirm('Akhiri stasiun sekarang? Hasil dihitung dari yang sudah Anda lakukan.')) UI.selesaikan();
        }, 'bahaya')));

    pasang(el('div', { class: 'ruang' }, atas, banner,
      el('div', { class: 'kisi-ruang' + (def.widgetUtama ? ' ada-widget' : '') },
        kolomPasien,
        el('section', { class: 'kolom-log' }, utama.childNodes.length ? utama : null, el('h3', { teks: 'Percakapan dan log' }), logEl),
        el('section', { class: 'kolom-aksi' }, tabBar, terbaru, isi))));

    UI.widgetUtama = widgetUtama;
    segarkan();
    if (panelAktif().tipe === 'widget') renderPanel();
  };

  UI.selesaikan = function () {
    var sesi = UI.sesi;
    if (!sesi) { location.hash = '#/'; return; }
    if (!sesi.selesai) sesi.akhiri();
    var ev = sesi.evaluasi();
    var st = sesi.stasiun;
    var tes = UI.mode === 'tes';
    UI.hasil = { id: st.id, stasiun: st, ev: ev, waktu: new Date().toISOString(), log: sesi.log.slice(), langsung: UI.langsung, mode: UI.mode, transkrip: tes && UI.tes ? UI.tes.transkrip.slice() : null, jalurTes: tes && UI.tes ? UI.tes.jalur : null };
    Riwayat.tambah({
      tipe: tes ? 'tes' : 'latihan', stasiun: st.id, judul: st.judul, waktu: UI.hasil.waktu,
      skor: ev.total, maks: ev.maks, persen: ev.persen, global: ev.global.label,
      kritisGagal: ev.kritisGagal.length, berisiko: ev.berisiko.length
    });
    if (tes && UI.tes && UI.tes.bersihkan) UI.tes.bersihkan();
    UI.sesi = null;
    location.hash = '#/hasil';
  };

  /* ---------- hasil ---------- */

  function langkahIdeal(st) {
    var label = {};
    OSCE.semuaAksi(st.interaksi).forEach(function (a) { label[a.id] = a.label; });
    var panel = {};
    st.interaksi.panel.forEach(function (p) { panel[p.id] = p; });
    return st.interaksi.ideal.map(function (l) {
      if (typeof l === 'string') return label[l] || l;
      if (l.form) {
        var p = panel[l.form];
        return 'Kirim bagian "' + p.label + '": ' + p.bidang.map(function (b) { return b.label + ' = ' + OSCE.ringkasJawaban(b, l.jawab[b.id]); }).join('; ');
      }
      return l.info && l.info.label ? l.info.label : null;
    }).filter(Boolean);
  }

  UI.hasilView = function () {
    var h = UI.hasil;
    if (!h) { location.hash = '#/'; return; }
    var st = h.stasiun, ev = h.ev;
    var kelasGlobal = ['', 'gagal', 'batas', 'lulus', 'unggul'][ev.global.kode];
    var baris = [], grupSekarang = '__';
    ev.butir.forEach(function (b) {
      if (b.grup !== grupSekarang) {
        grupSekarang = b.grup;
        if (b.grup) baris.push(el('tr', { class: 'grup-baris' }, el('th', { colspan: 4, scope: 'colgroup', teks: b.grup + '. ' + (st.grup[b.grup] || '') })));
      }
      var ikon = b.status === 'penuh' ? '✓' : b.status === 'sebagian' ? '½' : '✗';
      baris.push(el('tr', { class: 'butir ' + b.status },
        el('td', { class: 'id', teks: b.id }),
        el('td', {}, b.kritis ? el('span', { class: 'kritis', title: 'Butir kritis', teks: '⚠ ' }) : null, el('span', { html: U.mdInline(b.teks) })),
        el('td', { class: 'poin', teks: b.diperoleh + '/' + b.skor }),
        el('td', { class: 'ikon', 'aria-label': b.status, teks: ikon })));
    });

    var peringatan = [];
    if (ev.kritisGagal.length) {
      peringatan.push(el('div', { class: 'peringatan merah' }, el('strong', { teks: 'Butir kritis tidak terpenuhi: ' }),
        ev.kritisGagal.map(function (b) { return b.id; }).join(', ') + '. Pada OSCE sesungguhnya, ini dapat membuat stasiun dinyatakan tidak lulus.'));
    }
    if (ev.berisiko.length) {
      peringatan.push(el('div', { class: 'peringatan merah' }, el('strong', { teks: 'Tindakan berisiko: ' }),
        el('ul', {}, ev.berisiko.map(function (x) { return el('li', {}, x.label, ' — ', el('em', { teks: x.alasan })); }))));
    }
    if (ev.bantuanTeks) peringatan.push(el('div', { class: 'peringatan' }, 'Anda memakai bantuan teks untuk bunyi jantung. Skor tetap dihitung, tetapi latihan mendengarkan tidak teruji.'));

    pasang(el('article', { class: 'hasil' },
      tautan('#/', '← Beranda', 'tipis'),
      el('p', { class: 'kartu-no', teks: (h.mode === 'tes' ? 'Hasil tes · Stasiun ' : 'Hasil · Stasiun ') + st.id }),
      el('h1', { teks: st.judul }),
      el('section', { class: 'ringkasan' },
        el('div', { class: 'skor-besar' }, el('span', { class: 'angka', teks: ev.total }), el('span', { class: 'dari', teks: ' / ' + ev.maks }), el('span', { class: 'persen', teks: ev.persen + '%' })),
        el('div', {}, el('span', { class: 'chip global ' + kelasGlobal, teks: 'Perkiraan: ' + ev.global.label }), el('p', { class: 'redup', teks: ev.global.alasan + ' (perkiraan otomatis untuk belajar; batas lulus resmi ditetapkan oleh tim ujian)' })),
        el('p', { class: 'redup', teks: 'Waktu simulasi terpakai ' + U.fmtWaktu(ev.terpakai) + ' dari ' + U.fmtWaktu(ev.terpakai + ev.sisa) + '.' })),
      peringatan,
      el('section', {}, el('h2', { teks: 'Checklist' }),
        el('div', { class: 'tabel-bungkus' }, el('table', { class: 'tabel hasil-tabel' },
          el('thead', {}, el('tr', {}, el('th', { scope: 'col', teks: 'No' }), el('th', { scope: 'col', teks: 'Butir' }), el('th', { scope: 'col', teks: 'Poin' }), el('th', { scope: 'col', teks: '' }))),
          el('tbody', {}, baris)))),
      ev.tidakTepat.length ? el('section', {}, el('h2', { teks: 'Tindakan tidak tepat' }),
        el('ul', {}, ev.tidakTepat.map(function (x) { return el('li', {}, x.label, ' — ', el('em', { teks: x.alasan })); }))) : null,
      el('section', {}, el('h2', { teks: 'Pertanyaan lanjutan penguji' }), el('div', { class: 'md', html: U.md(st.pertanyaanLanjutan) })),
      h.mode === 'tes' ? UI.transkripView(h) : [
        el('section', {}, el('h2', { teks: 'Contoh urutan ideal' }), el('ol', { class: 'ideal' }, langkahIdeal(st).map(function (t) { return el('li', { teks: t }); }))),
        el('section', {}, el('h2', { teks: 'Catatan pembuat soal' }), el('div', { class: 'md', html: U.md(st.catatan) }))],
      el('section', {}, el('h2', { teks: 'Rujukan' }), el('div', { class: 'md', html: U.md(st.rujukan) })),
      el('details', {}, el('summary', { teks: 'Rekam tindakan Anda (' + h.log.length + ')' }),
        el('ol', { class: 'rekam' }, h.log.map(function (e) {
          return el('li', {}, el('span', { class: 'wkt', teks: U.fmtWaktu(e.t) }), ' ', e.label);
        }))),
      el('div', { class: 'aksi-bawah' },
        tautan((h.mode === 'tes' ? '#/tes/' : '#/briefing/') + st.id, 'Ulangi stasiun', 'utama'),
        tombol('Cetak', function () { g.print(); }),
        tombol('Unduh hasil (JSON)', function () {
          U.unduh('hasil-osce-' + st.id + '.json', JSON.stringify({
            mode: h.mode || 'latihan', jalurTes: h.jalurTes || undefined, transkrip: h.transkrip || undefined,
            stasiun: st.id, judul: st.judul, waktu: h.waktu, skor: ev.total, maks: ev.maks, persen: ev.persen, global: ev.global,
            butir: ev.butir.map(function (b) { return { id: b.id, kritis: b.kritis, diperoleh: b.diperoleh, maks: b.skor }; }),
            tidakTepat: ev.tidakTepat, berisiko: ev.berisiko
          }, null, 2), 'application/json');
        }),
        tautan('#/', 'Beranda'))));
  };

  /* ---------- mode penguji ---------- */

  UI.penguji = null;

  UI.pengujiView = function (id) {
    var st = OSCE.ambil(id);
    if (!st) { location.hash = '#/'; return; }
    var kunci = 'osce.penguji.draf.' + id;
    var draf = U.simpan.baca(kunci, { skor: {}, global: null, catatan: '', kandidat: '', penguji: '' });
    var total = el('output', { class: 'jumlah' });
    var kritisInfo = el('p', { class: 'redup' });
    var durasi = st.durasiMenit * 60;
    var sisa = durasi, berjalan = false, timerId = null, mulaiMs = 0, sisaAwal = durasi;
    var jam = el('output', { class: 'jam besar', 'aria-label': 'Penghitung waktu stasiun' });
    var tombolMulai = el('button', { type: 'button', class: 'tombol utama' });

    function simpanDraf() { U.simpan.tulis(kunci, draf); }
    function hitung() {
      var t = 0, gagal = [];
      st.checklist.forEach(function (b) {
        var v = Number(draf.skor[b.id] || 0);
        t += v;
        if (b.kritis && v < b.skor) gagal.push(b.id);
      });
      var persen = st.skorMaks ? Math.round((t / st.skorMaks) * 1000) / 10 : 0;
      total.textContent = t + ' / ' + st.skorMaks + ' (' + persen + '%)';
      kritisInfo.textContent = gagal.length ? 'Butir kritis belum terpenuhi: ' + gagal.join(', ') : 'Semua butir kritis terpenuhi.';
      kritisInfo.className = gagal.length ? 'peringatan merah' : 'redup';
      return { t: t, persen: persen, gagal: gagal };
    }
    function tampilJam() {
      jam.textContent = U.fmtWaktu(sisa);
      jam.className = 'jam besar' + (sisa <= 60 ? ' genting' : '') + (sisa === 0 ? ' habis' : '');
      tombolMulai.textContent = berjalan ? 'Jeda' : sisa === durasi ? 'Mulai waktu' : 'Lanjut';
    }
    function ketuk() {
      if (!berjalan) {
        berjalan = true; mulaiMs = performance.now(); sisaAwal = sisa;
        timerId = setInterval(function () {
          sisa = Math.max(0, Math.round(sisaAwal - (performance.now() - mulaiMs) / 1000));
          tampilJam();
          if (sisa === 0) { clearInterval(timerId); berjalan = false; tampilJam(); }
        }, 250);
      } else { clearInterval(timerId); berjalan = false; }
      tampilJam();
    }
    tombolMulai.addEventListener('click', ketuk);
    UI.penguji = { berhenti: function () { clearInterval(timerId); } };

    var baris = [], grupSekarang = '__';
    st.checklist.forEach(function (b) {
      if (b.grup !== grupSekarang) {
        grupSekarang = b.grup;
        if (b.grup) baris.push(el('tr', { class: 'grup-baris' }, el('th', { colspan: 3, scope: 'colgroup', teks: b.grup + '. ' + (st.grup[b.grup] || '') })));
      }
      var nilai = Number(draf.skor[b.id] || 0), kontrol;
      if (b.skor === 1) {
        kontrol = el('input', { type: 'checkbox', checked: nilai === 1, 'aria-label': 'Butir ' + b.id + ' dilakukan', onchange: function (e) { draf.skor[b.id] = e.target.checked ? 1 : 0; simpanDraf(); hitung(); } });
      } else {
        var opsi = [];
        for (var i = 0; i <= b.skor; i++) opsi.push(el('option', { value: i, teks: String(i), selected: i === nilai }));
        kontrol = el('select', { 'aria-label': 'Poin butir ' + b.id, onchange: function (e) { draf.skor[b.id] = Number(e.target.value); simpanDraf(); hitung(); } }, opsi);
      }
      baris.push(el('tr', { class: 'butir' },
        el('td', { class: 'id', teks: b.id }),
        el('td', {}, b.kritis ? el('span', { class: 'kritis', title: 'Butir kritis', teks: '⚠ ' }) : null, el('span', { html: U.mdInline(b.teks) })),
        el('td', { class: 'poin' }, kontrol, b.skor > 1 ? el('span', { class: 'redup', teks: ' / ' + b.skor }) : null)));
    });

    var radio = [1, 2, 3, 4].map(function (k) {
      return el('label', { class: 'pil global-pil' },
        el('input', { type: 'radio', name: 'global', value: k, checked: draf.global === k, onchange: function () { draf.global = k; simpanDraf(); } }),
        ' ', el('strong', { teks: k + ' ' + LABEL_GLOBAL[k] }), el('span', { class: 'redup', teks: ' — ' + DESKRIPSI_GLOBAL[k] }));
    });

    function rekam() {
      var h = hitung();
      return {
        tipe: 'penguji', stasiun: id, judul: st.judul, waktu: new Date().toISOString(),
        kandidat: draf.kandidat, penguji: draf.penguji, catatan: draf.catatan,
        skor: h.t, maks: st.skorMaks, persen: h.persen,
        global: draf.global ? LABEL_GLOBAL[draf.global] : '(belum dinilai)', globalKode: draf.global,
        kritisGagal: h.gagal.length, butirKritisGagal: h.gagal,
        butir: st.checklist.map(function (b) { return { id: b.id, kritis: b.kritis, diperoleh: Number(draf.skor[b.id] || 0), maks: b.skor }; }),
        sisaWaktuDetik: sisa
      };
    }

    pasang(el('article', { class: 'penguji' },
      tautan('#/', '← Beranda', 'tipis'),
      el('p', { class: 'kartu-no', teks: 'Mode penguji · Stasiun ' + st.id }),
      el('h1', { teks: st.judul }),
      el('section', { class: 'kotak baris-bidang' },
        el('label', { class: 'bidang' }, el('span', { teks: 'ID/nama kandidat' }), el('input', { type: 'text', value: draf.kandidat, oninput: function (e) { draf.kandidat = e.target.value; simpanDraf(); } })),
        el('label', { class: 'bidang' }, el('span', { teks: 'Penguji' }), el('input', { type: 'text', value: draf.penguji, oninput: function (e) { draf.penguji = e.target.value; simpanDraf(); } }))),
      el('section', { class: 'kotak waktu-penguji' }, jam, tombolMulai,
        tombol('Setel ulang waktu', function () { clearInterval(timerId); berjalan = false; sisa = durasi; sisaAwal = durasi; tampilJam(); })),
      el('section', {}, el('h2', { teks: 'Checklist' }),
        el('p', { class: 'redup', teks: 'Tandai butir hanya bila perilakunya terlihat. ⚠ = butir kritis.' }),
        el('div', { class: 'tabel-bungkus' }, el('table', { class: 'tabel hasil-tabel' },
          el('thead', {}, el('tr', {}, el('th', { scope: 'col', teks: 'No' }), el('th', { scope: 'col', teks: 'Butir' }), el('th', { scope: 'col', teks: 'Poin' }))),
          el('tbody', {}, baris)))),
      el('section', { class: 'kotak sticky-ringkas' }, el('h2', { teks: 'Skor checklist' }), total, kritisInfo),
      el('section', {}, el('h2', { teks: 'Penilaian global' }), el('div', { class: 'tumpuk', role: 'radiogroup', 'aria-label': 'Penilaian global' }, radio)),
      el('section', {}, el('label', { class: 'bidang' }, el('span', { teks: 'Catatan penguji' }),
        el('textarea', { rows: 4, oninput: function (e) { draf.catatan = e.target.value; simpanDraf(); }, teks: draf.catatan }))),
      el('div', { class: 'aksi-bawah' },
        tombol('Simpan ke riwayat', function () { Riwayat.tambah(rekam()); U.toast('Tersimpan di riwayat peramban ini.'); }, 'utama'),
        tombol('Unduh (JSON)', function () { U.unduh('penilaian-osce-' + id + '.json', JSON.stringify(rekam(), null, 2), 'application/json'); }),
        tombol('Cetak', function () { g.print(); }),
        tombol('Hapus isian', function () {
          if (!g.confirm('Hapus semua isian penilaian stasiun ini?')) return;
          U.simpan.hapus(kunci);
          UI.pengujiView(id);
        }, 'bahaya'))));
    hitung();
    tampilJam();
  };

  /* ---------- riwayat dan tentang ---------- */

  UI.riwayatView = function () {
    var semua = Riwayat.semua();
    pasang(el('article', {},
      tautan('#/', '← Beranda', 'tipis'),
      el('h1', { teks: 'Riwayat' }),
      el('p', { class: 'redup', teks: 'Tersimpan hanya di peramban ini (penyimpanan lokal). Mengosongkan data situs menghapusnya; unduh bila perlu.' }),
      semua.length ? tabelRiwayat(semua) : el('p', { teks: 'Belum ada riwayat.' }),
      el('div', { class: 'aksi-bawah' },
        tombol('Unduh JSON', function () { U.unduh('riwayat-osce.json', JSON.stringify(semua, null, 2), 'application/json'); }),
        tombol('Unduh CSV', function () {
          var baris = [['waktu', 'tipe', 'stasiun', 'judul', 'kandidat', 'skor', 'maks', 'persen', 'global', 'butir_kritis_gagal']]
            .concat(semua.map(function (r) { return [r.waktu, r.tipe, r.stasiun, r.judul, r.kandidat || '', r.skor, r.maks, r.persen, r.global, r.kritisGagal || 0]; }));
          U.unduh('riwayat-osce.csv', U.csv(baris), 'text/csv');
        }),
        tombol('Hapus semua', function () {
          if (g.confirm('Hapus seluruh riwayat?')) { Riwayat.hapusSemua(); UI.riwayatView(); }
        }, 'bahaya'))));
  };

  UI.tentang = function () {
    pasang(el('article', { class: 'tentang' },
      tautan('#/', '← Beranda', 'tipis'),
      el('h1', { teks: 'Tentang aplikasi' }),
      el('p', { class: 'peringatan' }, el('strong', { teks: 'DRAF v0.1. ' }), 'Alat belajar; bukan alat penilaian resmi dan bukan pedoman klinis. Konten belum direview kardiolog; dosis, ambang, dan target waktu belum diverifikasi ke teks lengkap guideline.'),
      el('h2', { teks: 'Cara kerja' }),
      el('ul', {},
        el('li', { teks: 'Checklist, instruksi, pertanyaan lanjutan, dan rujukan dibaca dari dokumen stasiun (folder stasiun/) melalui generator; aplikasi dan dokumen tidak dapat menyimpang.' }),
        el('li', { teks: 'Jam simulasi: setiap tindakan memakan waktu; stasiun berakhir saat jam habis. Ini melatih prioritas, bukan kecepatan mengklik.' }),
        el('li', { teks: 'Skor dihitung dari tindakan Anda terhadap butir checklist, dengan skor sebagian bila stasiun mengaturnya.' }),
        el('li', { teks: 'Perkiraan penilaian global bersifat otomatis (persentase, butir kritis, tindakan berisiko). Batas lulus resmi ditetapkan tim ujian.' }),
        el('li', { teks: 'Mode penguji: lembar penilaian digital dengan penghitung waktu, skor langsung, dan ekspor.' })),
      el('h2', { teks: 'Keterbatasan' }),
      el('ul', {},
        el('li', { teks: 'EKG dan bunyi jantung disintesis (ilustrasi), bukan rekaman pasien.' }),
        el('li', { teks: 'Aplikasi tidak dapat menilai teknik fisik. Kedalaman kompresi, posisi tangan, dan penempatan stetoskop nyata harus dilatih pada manikin dan pasien simulasi.' }),
        el('li', { teks: 'Pasien simulasi menjawab dari bank respons tetap; pertanyaan di luar bank tidak dijawab. Pada mode tes, ucapan bebas dipetakan ke bank itu (LLM atau pencocokan kata); ketepatan pemetaan belum diuji pada kandidat sungguhan.' }),
        el('li', { teks: 'Riwayat hanya tersimpan di peramban ini.' })),
      el('h2', { teks: 'Privasi' }),
      el('p', { teks: 'Secara bawaan seluruh proses berjalan di peramban Anda dan tidak ada data yang dikirim ke server. Dua fitur opsional memakai internet: (1) pemahaman ucapan dengan LLM (Claude, Anthropic) pada mode tes, bila Anda mengaktifkannya di Pengaturan, mengirim teks ucapan Anda beserta daftar tindakan stasiun; (2) mikrofon memakai pengenalan ucapan bawaan peramban, yang di Chrome dan Edge mengirim audio ke server Google atau Microsoft. Kasus di aplikasi ini fiktif; jangan menyebut data pasien nyata. Kunci API hanya disimpan di tab ini dan hilang saat tab ditutup.' })));
  };
})(window);
