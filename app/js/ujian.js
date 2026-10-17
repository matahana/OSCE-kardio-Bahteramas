/* Mode tes: peserta bertanya/memerintah lewat ketikan atau suara; jawaban hanya muncul bila diminta.
   Tidak ada daftar tindakan atau pilihan jawaban. Ucapan dipetakan ke aksi stasiun oleh LLM (bila dikonfigurasi)
   atau resolver offline; jawaban pasien tetap dari skrip stasiun. Alat fisik (steteskop, tensimeter, uji ritme)
   dan EKG tetap berupa widget. Jawaban terstruktur (diagnosis, rencana) diucapkan bebas dan diekstrak LLM;
   tanpa LLM, formulir pilihan dipakai sebagai cadangan (pilihannya terlihat). Halaman Pengaturan juga ada di sini. */
(function (g) {
  'use strict';
  var OSCE = g.OSCE, UI = OSCE.ui, U = OSCE.util, el = U.el, A = UI.alat;

  var BIAYA_SALAH = 3;
  var KUNCI_SUARA = 'osce.suara.v1';
  var TIDAK_PAHAM = [
    'Maaf, Dok, saya kurang mengerti maksud pertanyaannya. Boleh diulang dengan cara lain?',
    'Hmm, maksud Dokter bagaimana ya? Bisa diulang?',
    'Maaf, saya belum paham yang Dokter maksud.'
  ];
  var SUDAH = 'Itu sudah ditanyakan atau dilakukan tadi, Dok.';
  var BELUM = 'Belum bisa dilakukan saat ini.';
  var GALAT_LLM = {
    auth: 'Kunci API atau kode akses ditolak',
    kuota: 'Batas laju layanan tercapai',
    server: 'Layanan LLM sedang bermasalah',
    jaringan: 'Tidak dapat menyambung ke layanan LLM',
    timeout: 'Layanan LLM terlalu lama menjawab',
    refusal: 'Model menolak permintaan',
    format: 'Respons LLM tidak sesuai format',
    permintaan: 'Permintaan ke LLM ditolak (periksa URL dan model)',
    nonaktif: 'LLM tidak dikonfigurasi'
  };

  function pengaturanSuara() { return Object.assign({ balas: true, otomatisKirim: true, percakapan: false, laju: 1 }, U.simpan.baca(KUNCI_SUARA, {})); }
  function acak(a) { return a[Math.floor(Math.random() * a.length)]; }
  function idSudah(sesi) { return OSCE.semuaAksi(sesi.def).filter(function (a) { return sesi.sudah(a.id); }).map(function (a) { return a.id; }); }

  /* ---------- briefing tes ---------- */

  UI.briefingTes = function (id) {
    var st = OSCE.ambil(id);
    if (!st || !st.interaksi) { location.hash = '#/'; return; }
    var def = st.interaksi;
    var llmSiap = OSCE.llm.siap();
    var dk = OSCE.suara.dukungan();
    var ps = pengaturanSuara();
    var punyaForm = def.panel.some(function (p) { return p.tipe === 'form'; });
    var cekMic = el('input', { type: 'checkbox', id: 'pakai-mic', disabled: !dk.kenali });
    var cekBicara = el('input', { type: 'checkbox', id: 'pakai-suara', checked: ps.balas && dk.bicara, disabled: !dk.bicara });
    var cekSetuju = el('input', { type: 'checkbox', id: 'setuju' });
    var tombolMulai = A.tombol('Mulai tes (' + U.fmtWaktu(def.waktu) + ')', mulai, 'utama');

    function perluSetuju() { return llmSiap || cekMic.checked; }
    function segarkan() {
      var perlu = perluSetuju();
      setujuBaris.hidden = !perlu;
      tombolMulai.disabled = perlu && !cekSetuju.checked;
    }
    cekMic.addEventListener('change', segarkan);
    cekSetuju.addEventListener('change', segarkan);

    function mulai() {
      var tes = baruKeadaan(st, { llm: llmSiap, mikrofon: cekMic.checked && dk.kenali, suara: cekBicara.checked && dk.bicara });
      UI.sesi = OSCE.mulaiSesi(id);
      UI.hasil = null; UI.mode = 'tes'; UI.langsung = false; UI.tes = tes; UI.draf = {};
      U.simpan.tulis(KUNCI_SUARA, Object.assign(pengaturanSuara(), { balas: cekBicara.checked }));
      location.hash = '#/tes-sesi/' + id;
    }

    var setujuBaris = el('label', { class: 'pil kotak-setuju' }, cekSetuju,
      el('span', {}, ' Saya mengerti: ',
        llmSiap ? 'teks ucapan saya dikirim ke layanan LLM (Anthropic) untuk dipahami; ' : '',
        'bila mikrofon dipakai, audio saya diproses oleh pengenalan ucapan bawaan peramban (di Chrome/Edge dikirim ke server Google/Microsoft). Kasus ini fiktif; saya tidak akan menyebut data pasien nyata.'));

    A.pasang(el('article', { class: 'briefing' },
      A.tautan('#/', '← Kembali', 'tipis'),
      el('p', { class: 'kartu-no', teks: 'Tes · Stasiun ' + st.id }),
      el('h1', { teks: st.judul }),
      el('p', { class: 'chip-baris' }, A.chip(st.durasiMenit + ' menit'), A.chip(st.skorMaks + ' poin'), A.chip('Tes tanpa menu', 'vital')),
      el('section', { class: 'kotak' }, el('h2', { teks: 'Instruksi untuk kandidat' }), el('div', { class: 'md', html: U.md(st.instruksiKandidat) })),
      def.tandaVital && def.tandaVital.length ? el('section', {}, el('h2', { teks: 'Tanda vital awal' }), A.vitalChips(def.tandaVital)) : null,
      el('section', { class: 'kotak' },
        el('h2', { teks: 'Cara kerja tes' }),
        el('ul', {},
          el('li', { teks: 'Tidak ada daftar pertanyaan atau pilihan. Ketik atau ucapkan apa yang Anda tanyakan, minta, atau lakukan; pasien/tim menjawab hanya yang Anda tanyakan. Yang tidak Anda tanyakan tidak akan muncul.' }),
          el('li', { teks: 'Jam simulasi ' + U.fmtWaktu(def.waktu) + '. Tiap tindakan memakan waktu simulasi; ucapan yang tidak dipahami atau tidak bisa dilakukan memakan ' + BIAYA_SALAH + ' detik.' }),
          el('li', { teks: 'Tidak ada umpan balik sampai stasiun selesai. Hasil menampilkan checklist dan transkrip ucapan Anda; kunci jawaban tidak ditampilkan.' }),
          punyaForm ? el('li', { teks: llmSiap ? 'Sampaikan interpretasi, diagnosis, dan rencana secara lisan atau tertulis seperti kepada penguji; sistem membacanya.' : 'LLM belum dikonfigurasi: jawaban terstruktur (interpretasi, diagnosis, rencana) dikumpulkan lewat formulir pilihan, sehingga pilihannya terlihat. Untuk jawaban bebas, aktifkan LLM di Pengaturan.' }) : null,
          el('li', { teks: 'Alat fisik (steteskop, tensimeter, uji ritme) dan EKG tetap berupa alat di layar.' }))),
      el('section', { class: 'kotak' },
        el('h2', { teks: 'Jalur yang dipakai' }),
        el('p', {}, el('strong', { teks: 'Pemahaman ucapan: ' }), llmSiap ? 'LLM (' + (OSCE.llm.konfigurasi().model || OSCE.llm.MODEL) + ', lewat ' + (OSCE.llm.konfigurasi().mode === 'proxy' ? 'proxy' : 'kunci API Anda') + '), dengan pencocokan kata offline sebagai cadangan.' : 'pencocokan kata offline (lebih terbatas; kalimat bebas yang jauh dari tindakan yang dikenal dapat tidak dipahami). ', el('a', { href: '#/pengaturan', teks: 'Atur LLM' })),
        el('label', { class: 'pil' }, cekMic, ' Pakai mikrofon (pengenalan ucapan bahasa Indonesia)', dk.kenali ? null : el('span', { class: 'redup', teks: ' — tidak didukung peramban ini' })),
        el('label', { class: 'pil' }, cekBicara, ' Bacakan jawaban pasien dengan suara', dk.bicara ? null : el('span', { class: 'redup', teks: ' — tidak didukung peramban ini' }))),
      setujuBaris,
      el('div', { class: 'aksi-bawah' }, tombolMulai)));
    segarkan();
  };

  function baruKeadaan(st, jalur) {
    var punyaForm = st.interaksi.panel.some(function (p) { return p.tipe === 'form'; });
    return {
      indeks: OSCE.resolver.bangun(st),
      penanda: [], transkrip: [], riwayat: [], tab: null,
      sibuk: false, mendengar: false, kosongBerturut: 0, jalur: jalur,
      modeIsian: !punyaForm ? 'tidak ada' : jalur.llm ? 'bebas' : 'terstruktur',
      galatDiberitahu: false,
      bersihkan: function () { OSCE.suara.hentiBicara(); OSCE.suara.hentiMendengar(); }
    };
  }

  /* ---------- ruang tes ---------- */

  UI.ruangTes = function (id) {
    var sesi = UI.sesi, tes = UI.tes;
    if (!sesi || !tes || UI.mode !== 'tes' || sesi.stasiun.id !== id) { location.hash = '#/tes/' + id; return; }
    var st = sesi.stasiun, def = sesi.def;
    var ps = pengaturanSuara();
    var dk = OSCE.suara.dukungan();
    var jam = el('output', { class: 'jam', 'aria-label': 'Sisa waktu simulasi' });
    var daftar = el('ol', { class: 'percakapan', 'aria-label': 'Percakapan' });
    var terbaru = el('div', { class: 'respons-terbaru', 'aria-live': 'polite' });
    var banner = el('div', { class: 'banner-selesai', role: 'alert', hidden: true });
    var status = el('p', { class: 'status-tes redup', 'aria-live': 'polite', teks: '' });
    var tabBar = el('div', { class: 'tab-bar', role: 'tablist' });
    var isiAlat = el('div', { class: 'panel-isi', role: 'tabpanel' });
    var utama = el('div', { class: 'widget-utama' });
    var ui = { segarkan: segarkan, toast: U.toast };
    var alat = def.panel.filter(function (p) { return p.tipe === 'widget' || (p.tipe === 'form' && tes.modeIsian === 'terstruktur'); });
    if (!tes.tab && alat.length) tes.tab = alat[0].id;

    var input = el('textarea', {
      id: 'ucapan', rows: 3, class: 'ucapan', 'aria-label': 'Ketik apa yang Anda tanyakan atau lakukan', placeholder: 'Ketik di sini, atau tekan mikrofon dan bicara…',
      onkeydown: function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); kirim(); } }
    });
    var tombolKirim = A.tombol('Kirim', function () { kirim(); }, 'utama');
    var tombolMic = el('button', { type: 'button', class: 'tombol mic', 'aria-pressed': 'false', hidden: !tes.jalur.mikrofon, onclick: aturMic, teks: '🎤 Bicara' });
    var cekBicara = el('input', { type: 'checkbox', checked: !!tes.jalur.suara, disabled: !dk.bicara, onchange: function (e) { tes.jalur.suara = e.target.checked; if (!e.target.checked) OSCE.suara.hentiBicara(); } });
    var cekPercakapan = el('input', { type: 'checkbox', checked: !!ps.percakapan, disabled: !tes.jalur.mikrofon, onchange: function (e) { var p = pengaturanSuara(); p.percakapan = e.target.checked; U.simpan.tulis(KUNCI_SUARA, p); } });

    function panelAktif() { return alat.filter(function (p) { return p.id === tes.tab; })[0] || alat[0]; }
    function renderJam() { jam.textContent = U.fmtWaktu(sesi.sisa); jam.className = 'jam' + (sesi.sisa <= 60 ? ' genting' : ''); }

    function gelembung(kelas, teks, kecil) {
      return el('li', { class: 'gelembung ' + kelas }, kecil ? el('span', { class: 'kecil', teks: kecil }) : null, teks);
    }

    function renderPercakapan() {
      daftar.textContent = '';
      var log = sesi.log;
      for (var i = 0; i <= log.length; i++) {
        tes.penanda.filter(function (m) { return m.indeks === i; }).forEach(function (m) {
          daftar.appendChild(gelembung('anda', m.teks, m.lisan ? 'Anda (suara)' : 'Anda'));
        });
        if (i === log.length) break;
        var e = log[i];
        if (e.tipe === 'sistem') daftar.appendChild(gelembung('sistem', e.label));
        else if (e.tipe === 'form') daftar.appendChild(gelembung('pasien', 'Baik, dicatat.'));
        else if (e.tipe === 'peristiwa') daftar.appendChild(gelembung('alat', e.respons ? e.label + ' — ' + e.respons : e.label));
        else if (e.respons) daftar.appendChild(gelembung('pasien', e.respons));
      }
      daftar.scrollTop = daftar.scrollHeight;
    }

    function renderTerbaru() {
      terbaru.textContent = '';
      for (var i = sesi.log.length - 1; i >= 0; i--) {
        var e = sesi.log[i];
        if ((e.tipe === 'aksi' || e.tipe === 'ucapan') && e.respons) { terbaru.appendChild(el('strong', { teks: 'Jawaban terbaru: ' })); terbaru.appendChild(document.createTextNode(e.respons.split('\n')[0])); return; }
      }
    }

    function renderTab() {
      tabBar.textContent = '';
      if (alat.length < 2) return;
      alat.forEach(function (p) {
        var aktif = p.id === tes.tab;
        tabBar.appendChild(el('button', {
          type: 'button', role: 'tab', class: 'tab' + (aktif ? ' aktif' : ''), 'aria-selected': aktif ? 'true' : 'false', data: { panel: p.id },
          onclick: function () { tes.tab = p.id; renderTab(); renderAlat(); }, teks: p.label
        }));
      });
    }

    function renderAlat() {
      if (UI.widget) { UI.widget.hancurkan(); UI.widget = null; }
      isiAlat.textContent = '';
      var p = panelAktif();
      if (!p) return;
      if (p.tipe === 'widget') {
        if (p.catatan) isiAlat.appendChild(el('p', { class: 'catatan', teks: p.catatan }));
        var wadah = el('div', { class: 'wadah-widget' });
        isiAlat.appendChild(wadah);
        UI.widget = OSCE.widget[p.widget](wadah, sesi, Object.assign({}, p.opsi || {}, { tanpaBantuan: true }), ui);
      } else if (p.tipe === 'form') {
        isiAlat.appendChild(el('p', { class: 'peringatan' }, 'LLM tidak dikonfigurasi, jadi jawaban terstruktur memakai formulir pilihan (pilihan terlihat). Aktifkan LLM di Pengaturan untuk menjawab bebas.'));
        isiAlat.appendChild(UI.panelForm(sesi, p, segarkan));
      }
    }

    function segarkan() {
      renderJam(); renderPercakapan(); renderTerbaru(); renderTab();
      if (panelAktif() && panelAktif().tipe !== 'widget') renderAlat();
      var habis = sesi.selesai;
      input.disabled = habis || tes.sibuk; tombolKirim.disabled = habis || tes.sibuk; tombolMic.disabled = habis;
      if (habis) {
        banner.hidden = false; banner.textContent = '';
        banner.appendChild(el('strong', { teks: sesi.alasanSelesai === 'waktu' ? 'Waktu habis. ' : 'Stasiun selesai. ' }));
        banner.appendChild(A.tombol('Lihat hasil', function () { UI.selesaikan(); }, 'utama'));
        OSCE.suara.hentiMendengar();
      }
    }

    /* --- pemahaman ucapan --- */
    function pahami(teks) {
      var tersedia = function (i) { return sesi.bolehDilakukan(i).ok; };
      function offline() {
        var r = OSCE.resolver.cocokkan(tes.indeks, teks, { tersedia: tersedia });
        var isian = tes.modeIsian === 'bebas' ? OSCE.resolver.ekstrak(tes.indeks, teks) : {};
        return { aksi: r.aksi.map(function (a) { return a.id; }), isian: isian, sumber: 'offline' };
      }
      if (tes.jalur.llm && OSCE.llm.siap()) {
        return OSCE.llm.pahami(st, teks, { sudah: idSudah(sesi), riwayat: tes.riwayat, indeks: tes.indeks }).catch(function (e) {
          var h = offline();
          h.sumber = 'offline (cadangan)';
          h.galatLlm = (GALAT_LLM[e.kode] || 'Galat LLM') + (e.rinci && e.rinci.status ? ' (HTTP ' + e.rinci.status + ')' : '');
          if (!tes.galatDiberitahu) { tes.galatDiberitahu = true; U.toast(h.galatLlm + '. Memakai pencocokan offline untuk ucapan berikutnya yang gagal.', 'peringatan'); }
          return h;
        });
      }
      return Promise.resolve(offline());
    }

    function terapkan(teks, h) {
      var entri = { t: sesi.terpakai, ucapan: teks, sumber: h.sumber, aksi: [], ditolak: [], isian: {}, tidakDipahami: false, galatLlm: h.galatLlm || null, ms: h.ms || null, dicurigai: !!h.dicurigai };
      var ada = false;
      (h.aksi || []).forEach(function (idAksi) {
        if (sesi.selesai) return;
        var c = sesi.bolehDilakukan(idAksi);
        if (c.ok) { sesi.lakukan(idAksi); entri.aksi.push(idAksi); ada = true; }
        else if (c.kode === 'sudah') { sesi.catatTambahan(teks, SUDAH, BIAYA_SALAH, { id: idAksi, kodeUcapan: 'sudah' }); entri.ditolak.push(idAksi + ': sudah'); ada = true; }
        else if (c.kode === 'syarat' || c.kode === 'eksklusif') { sesi.catatTambahan(teks, BELUM, BIAYA_SALAH, { id: idAksi, kodeUcapan: c.kode, alasan: c.alasan }); entri.ditolak.push(idAksi + ': ' + c.kode + ' (' + c.alasan + ')'); ada = true; }
      });
      Object.keys(h.isian || {}).forEach(function (panel) {
        if (sesi.selesai) return;
        var r = sesi.tambahJawaban(panel, h.isian[panel]);
        if (r.ok && r.diisi) { entri.isian[panel] = Object.keys(h.isian[panel]); ada = true; }
      });
      if (!ada && !sesi.selesai) {
        sesi.catatTambahan(teks, acak(TIDAK_PAHAM), BIAYA_SALAH, { kodeUcapan: 'tidak_dipahami' });
        entri.tidakDipahami = true;
      }
      tes.transkrip.push(entri);
      tes.riwayat.push({ kandidat: teks, aksi: entri.aksi });
      return entri;
    }

    function kirim(teksLangsung, lisan) {
      var teks = String(teksLangsung != null ? teksLangsung : input.value).replace(/\s+/g, ' ').trim();
      if (!teks || tes.sibuk || sesi.selesai) return Promise.resolve();
      tes.sibuk = true;
      var awalLog = sesi.log.length;
      tes.penanda.push({ indeks: awalLog, teks: teks, lisan: !!lisan });
      input.value = '';
      status.textContent = tes.jalur.llm ? 'Memahami ucapan (LLM)…' : 'Memahami ucapan…';
      segarkan();
      return pahami(teks).then(function (h) {
        terapkan(teks, h);
        tes.sibuk = false;
        status.textContent = '';
        segarkan();
        if (!sesi.selesai && !tes.mendengar) input.focus();
        var baru = sesi.log.slice(awalLog).filter(function (e) { return (e.tipe === 'aksi' || e.tipe === 'ucapan') && e.respons; }).map(function (e) { return e.respons; });
        return ucapkan(baru.join(' '));
      }).then(function () { lanjutPercakapan(); }, function (e) {
        tes.sibuk = false; status.textContent = ''; segarkan();
        U.toast('Terjadi kesalahan memproses ucapan: ' + (e && e.message || e), 'peringatan');
      });
    }

    function ucapkan(teks) {
      if (!tes.jalur.suara || !teks || sesi.selesai) return Promise.resolve();
      return OSCE.suara.bicara(teks, { laju: pengaturanSuara().laju });
    }

    /* --- mikrofon --- */
    var pegangan = null;
    function renderMic() {
      tombolMic.textContent = tes.mendengar ? '⏹ Berhenti' : '🎤 Bicara';
      tombolMic.className = 'tombol mic' + (tes.mendengar ? ' aktif' : '');
      tombolMic.setAttribute('aria-pressed', tes.mendengar ? 'true' : 'false');
    }
    function mulaiDengar() {
      if (tes.mendengar || tes.sibuk || sesi.selesai) return;
      OSCE.suara.hentiBicara();
      pegangan = OSCE.suara.dengar({
        bahasa: pengaturanSuara().bahasa || OSCE.suara.BAHASA,
        saatSementara: function (t) { input.value = t; },
        saatAkhir: function (t) {
          tes.kosongBerturut = 0; input.value = t;
          if (pengaturanSuara().otomatisKirim) kirim(t, true);
        },
        saatKosong: function () { tes.kosongBerturut++; },
        saatGalat: function (kode) { tes.percakapanBerhenti = true; U.toast(OSCE.suara.pesanGalat(kode), 'peringatan'); },
        saatBerhenti: function () { tes.mendengar = false; renderMic(); status.textContent = tes.sibuk ? status.textContent : ''; }
      });
      tes.mendengar = !!pegangan;
      status.textContent = tes.mendengar ? 'Mendengarkan… silakan bicara.' : '';
      renderMic();
    }
    function aturMic() {
      if (tes.mendengar) { if (pegangan) pegangan.berhenti(); return; }
      tes.kosongBerturut = 0; tes.percakapanBerhenti = false;
      mulaiDengar();
    }
    function lanjutPercakapan() {
      if (!pengaturanSuara().percakapan || !tes.jalur.mikrofon || sesi.selesai || tes.percakapanBerhenti) return;
      if (tes.kosongBerturut >= 2) { U.toast('Percakapan suara dijeda karena tidak ada suara terdengar. Tekan Bicara untuk melanjutkan.'); return; }
      if (UI.ruangAktif !== id) return;
      setTimeout(function () { if (UI.ruangAktif === id && !tes.mendengar && !tes.sibuk && !sesi.selesai) mulaiDengar(); }, 250);
    }

    /* --- rangka halaman --- */
    var kolomPasien = el('aside', { class: 'kolom-pasien' },
      el('div', { class: 'kartu-pasien' },
        el('div', { class: 'avatar', 'aria-hidden': 'true', teks: (def.pasien.nama || '?').replace(/^(Tn\.|Ny\.|Ibu|Bapak)\s*/, '').charAt(0).toUpperCase() }),
        el('div', {}, el('h3', { teks: def.pasien.nama }), el('p', { class: 'redup', teks: def.pasien.ringkas }))),
      el('p', { class: 'keadaan', teks: def.pasien.keadaan || '' }),
      def.tandaVital && def.tandaVital.length ? A.vitalChips(def.tandaVital) : el('p', { class: 'redup', teks: 'Tanda vital diperoleh bila Anda memintanya.' }),
      el('p', { class: 'petunjuk', teks: 'Mode tes: tanyakan atau lakukan sendiri. Jawaban hanya muncul bila diminta.' }));

    var widgetUtama = def.widgetUtama ? OSCE.widget[def.widgetUtama.nama](utama, sesi, def.widgetUtama.opsi || {}, ui) : null;

    var atas = el('div', { class: 'bar-atas' },
      el('div', { class: 'judul-ruang' }, el('p', { class: 'kartu-no', teks: 'Tes · Stasiun ' + st.id }), el('h2', { teks: st.judul })),
      el('div', { class: 'jam-bungkus' }, el('span', { class: 'jam-label', teks: 'Sisa waktu simulasi' }), jam),
      el('div', { class: 'bar-tombol' },
        A.tombol('Keluar', function () { if (g.confirm('Keluar tanpa menyimpan hasil?')) { tes.bersihkan(); UI.sesi = null; UI.tes = null; location.hash = '#/'; } }),
        A.tombol('Akhiri stasiun', function () { if (sesi.selesai || g.confirm('Akhiri stasiun sekarang? Hasil dihitung dari yang sudah Anda lakukan.')) UI.selesaikan(); }, 'bahaya')));

    var kolomInput = el('section', { class: 'kolom-aksi' },
      el('h3', { teks: 'Ucapkan atau ketik' }),
      terbaru,
      el('div', { class: 'input-ucapan' },
        el('label', { for: 'ucapan', class: 'sr-saja', teks: 'Ucapan Anda' }),
        input,
        el('div', { class: 'baris-tombol' }, tombolKirim, tombolMic),
        status,
        tes.jalur.mikrofon || dk.bicara ? el('div', { class: 'opsi-suara' },
          dk.bicara ? el('label', { class: 'pil' }, cekBicara, ' Bacakan jawaban') : null,
          tes.jalur.mikrofon ? el('label', { class: 'pil' }, cekPercakapan, ' Percakapan suara (mendengar otomatis setelah jawaban)') : null) : null,
        tes.jalur.llm ? el('p', { class: 'redup kecil', teks: 'Pemahaman ucapan: LLM, cadangan offline.' }) : el('p', { class: 'redup kecil', teks: 'Pemahaman ucapan: pencocokan kata offline.' })),
      alat.length ? el('div', { class: 'alat-tes' }, el('h3', { teks: 'Alat' }), tabBar, isiAlat) : null);

    A.pasang(el('div', { class: 'ruang ruang-tes' }, atas, banner,
      el('div', { class: 'kisi-ruang' + (def.widgetUtama ? ' ada-widget' : '') },
        kolomPasien,
        el('section', { class: 'kolom-log' }, utama.childNodes.length ? utama : null, el('h3', { teks: 'Percakapan' }), daftar),
        kolomInput)));
    UI.widgetUtama = widgetUtama;
    UI.pembersih = function () { UI.ruangAktif = null; tes.bersihkan(); };
    UI.ruangAktif = id;
    segarkan();
    renderAlat();
    renderMic();
    input.focus();
  };

  /* ---------- transkrip (hasil tes) ---------- */

  UI.transkripView = function (h) {
    var label = {};
    OSCE.semuaAksi(h.stasiun.interaksi).forEach(function (a) { label[a.id] = a.label; });
    var tr = h.transkrip || [];
    var tidakDipahami = tr.filter(function (x) { return x.tidakDipahami; }).length;
    var jalur = h.jalurTes || {};
    return el('section', {},
      el('h2', { teks: 'Transkrip tes' }),
      el('p', { class: 'redup', teks: 'Untuk penguji: apa yang Anda ucapkan dan bagaimana sistem memahaminya. Pemetaan otomatis dapat keliru; penguji dapat meninjau dan mengoreksi penilaian. ' +
        'Jalur: pemahaman ' + (jalur.llm ? 'LLM' : 'offline') + ', mikrofon ' + (jalur.mikrofon ? 'dipakai' : 'tidak dipakai') + '. ' + tr.length + ' ucapan, ' + tidakDipahami + ' tidak dipahami.' }),
      tr.length ? el('div', { class: 'tabel-bungkus' }, el('table', { class: 'tabel' },
        el('thead', {}, el('tr', {}, ['Waktu', 'Ucapan Anda', 'Dipahami sebagai', 'Sumber'].map(function (x) { return el('th', { scope: 'col', teks: x }); }))),
        el('tbody', {}, tr.map(function (x) {
          var paham = x.aksi.map(function (i) { return label[i] || i; }).concat(Object.keys(x.isian).map(function (p) { return 'jawaban: ' + x.isian[p].join(', '); })).concat(x.ditolak.map(function (d) { return '(ditolak) ' + d; }));
          return el('tr', {},
            el('td', { teks: U.fmtWaktu(x.t) }),
            el('td', { teks: x.ucapan }),
            el('td', { teks: x.tidakDipahami ? '(tidak dipahami)' : paham.join(' · ') }),
            el('td', { teks: x.sumber + (x.galatLlm ? ' — ' + x.galatLlm : '') + (x.dicurigai ? ' — ucapan dicurigai mengarahkan sistem' : '') }));
        })))) : el('p', { class: 'redup', teks: 'Tidak ada ucapan tercatat.' }));
  };

  /* ---------- pengaturan ---------- */

  UI.pengaturan = function () {
    var c = OSCE.llm.konfigurasi();
    var dk = OSCE.suara.dukungan();
    var ps = pengaturanSuara();
    var mode = c.mode;
    var radio = function (nilai, teks, ket) {
      return el('label', { class: 'pil' }, el('input', { type: 'radio', name: 'mode-llm', value: nilai, checked: mode === nilai, onchange: function () { mode = nilai; tampil(); } }),
        el('span', {}, el('strong', { teks: teks }), el('span', { class: 'redup', teks: ' — ' + ket })));
    };
    var kunci = el('input', { type: 'password', id: 'kunci-api', autocomplete: 'off', spellcheck: 'false', placeholder: c.adaKunci ? '(tersimpan di tab ini; kosongkan untuk menghapus)' : 'sk-ant-…', 'aria-label': 'Kunci API Anthropic' });
    var proxy = el('input', { type: 'url', id: 'proxy-url', value: c.proxyUrl, placeholder: 'https://nama-proxy.workers.dev', 'aria-label': 'URL proxy' });
    var akses = el('input', { type: 'password', id: 'kode-akses', autocomplete: 'off', spellcheck: 'false', placeholder: c.adaAkses ? '(tersimpan di tab ini)' : 'kode akses ujian', 'aria-label': 'Kode akses proxy' });
    var wadahKunci = el('div', { class: 'bidang-pengaturan' }, el('label', { class: 'bidang' }, el('span', { teks: 'Kunci API Anthropic' }), kunci),
      el('p', { class: 'redup kecil', teks: 'Disimpan hanya di tab ini (sessionStorage) dan hilang saat tab ditutup; dikirim hanya ke api.anthropic.com. Siapa pun yang memakai perangkat ini selama tab terbuka dapat memakainya, jadi jangan dipakai pada perangkat bersama. Untuk peserta ujian, gunakan proxy lembaga.' }));
    var wadahProxy = el('div', { class: 'bidang-pengaturan' }, el('label', { class: 'bidang' }, el('span', { teks: 'URL proxy lembaga' }), proxy), el('label', { class: 'bidang' }, el('span', { teks: 'Kode akses' }), akses),
      el('p', { class: 'redup kecil', teks: 'Proxy menyimpan kunci API di sisi server (lihat docs/aplikasi.md dan tools/proxy-llm/). Kode akses dibagikan penguji pada hari ujian.' }));
    var hasilUji = el('p', { class: 'redup', 'aria-live': 'polite', teks: '' });
    function tampil() { wadahKunci.hidden = mode !== 'langsung'; wadahProxy.hidden = mode !== 'proxy'; }

    function simpan() {
      OSCE.llm.atur({ mode: mode, proxyUrl: proxy.value });
      if (kunci.value) OSCE.llm.atur({ kunci: kunci.value });
      if (akses.value) OSCE.llm.atur({ kodeAkses: akses.value });
      kunci.value = ''; akses.value = '';
      return OSCE.llm.konfigurasi();
    }

    var cekBicara = el('input', { type: 'checkbox', checked: ps.balas && dk.bicara, disabled: !dk.bicara });
    var cekKirim = el('input', { type: 'checkbox', checked: ps.otomatisKirim, disabled: !dk.kenali });
    var laju = el('input', { type: 'range', min: 0.7, max: 1.4, step: 0.1, value: ps.laju, 'aria-label': 'Kecepatan suara pasien' });

    A.pasang(el('article', { class: 'pengaturan' },
      A.tautan('#/', '← Beranda', 'tipis'),
      el('h1', { teks: 'Pengaturan' }),
      el('section', { class: 'kotak' },
        el('h2', { teks: 'Pemahaman ucapan pada mode tes' }),
        el('p', { class: 'redup', teks: 'Mengubah ucapan bebas menjadi tindakan stasiun. LLM hanya memetakan; jawaban pasien tetap dari skrip stasiun dan tidak dikarang model. Bila LLM gagal, pencocokan kata offline dipakai.' }),
        el('div', { class: 'tumpuk', role: 'radiogroup', 'aria-label': 'Jalur pemahaman ucapan' },
          radio('mati', 'Offline saja', 'tanpa internet; pencocokan kata, lebih terbatas'),
          radio('langsung', 'Kunci API saya', 'LLM (' + OSCE.llm.MODEL + ') dipanggil langsung dari peramban'),
          radio('proxy', 'Proxy lembaga', 'LLM lewat proxy yang dikelola penguji/lembaga')),
        wadahKunci, wadahProxy,
        el('div', { class: 'aksi-bawah' },
          A.tombol('Simpan', function () { simpan(); U.toast('Pengaturan tersimpan.'); }, 'utama'),
          A.tombol('Hapus kunci dan kode akses', function () { OSCE.llm.atur({ kunci: '', kodeAkses: '' }); U.toast('Kunci dan kode akses dihapus dari tab ini.'); UI.pengaturan(); }),
          A.tombol('Uji koneksi', function () {
            var k = simpan();
            if (k.mode === 'mati') { hasilUji.textContent = 'Mode offline: tidak ada sambungan untuk diuji.'; return; }
            if (!OSCE.llm.siap()) { hasilUji.textContent = 'Lengkapi ' + (k.mode === 'langsung' ? 'kunci API' : 'URL proxy dan kode akses') + ' dulu.'; return; }
            hasilUji.textContent = 'Menguji…';
            OSCE.llm.uji(OSCE.daftarStasiun().filter(function (x) { return x.interaksi; })[0]).then(function (r) { hasilUji.textContent = 'Berhasil (' + r.ms + ' ms).'; },
              function (e) { hasilUji.textContent = 'Gagal: ' + (GALAT_LLM[e.kode] || 'galat') + (e.message ? ' — ' + e.message : '') + '.'; });
          })),
        hasilUji,
        el('p', { class: 'peringatan' }, 'Privasi: bila LLM aktif, teks ucapan Anda dan daftar tindakan stasiun dikirim ke Anthropic (lewat proxy bila dipakai). Kasus aplikasi ini fiktif; jangan menyebut data pasien nyata.')),
      el('section', { class: 'kotak' },
        el('h2', { teks: 'Suara' }),
        el('p', { class: 'redup', teks: 'Pengenalan ucapan: ' + (dk.kenali ? 'didukung (bahasa Indonesia; di Chrome/Edge audio diproses server penyedia peramban dan butuh internet)' : 'tidak didukung peramban ini — gunakan Chrome atau Edge, atau ketik') + '. Suara pasien: ' + (dk.bicara ? 'didukung' : 'tidak didukung') + '.' }),
        el('label', { class: 'pil' }, cekBicara, ' Bacakan jawaban pasien dengan suara (bawaan)'),
        el('label', { class: 'pil' }, cekKirim, ' Kirim otomatis setelah selesai bicara'),
        el('label', { class: 'bidang' }, el('span', { teks: 'Kecepatan suara pasien' }), laju),
        el('div', { class: 'aksi-bawah' },
          A.tombol('Simpan', function () { var p = pengaturanSuara(); p.balas = cekBicara.checked; p.otomatisKirim = cekKirim.checked; p.laju = Number(laju.value); U.simpan.tulis(KUNCI_SUARA, p); U.toast('Pengaturan suara tersimpan.'); }, 'utama'),
          A.tombol('Coba suara pasien', function () { OSCE.suara.bicara('Selamat siang, Dok. Dada saya terasa ditindih sejak satu jam lalu.', { laju: Number(laju.value) }); })))));
    tampil();
  };
})(window);
