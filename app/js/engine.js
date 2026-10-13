/* Engine simulasi OSCE — tanpa DOM, sehingga dapat dijalankan di Node untuk pengujian.

   Model:
   - Jam simulasi: tiap aksi memakan biaya detik; stasiun berakhir saat jam habis.
     Waktu nyata tidak dihitung (hasil deterministik, tidak bisa ditembak "asal klik").
   - Aksi = pertanyaan, pemeriksaan, permintaan, tindakan. Form = jawaban terstruktur.
     Peristiwa = keluaran widget interaktif (EKG, steteskop, tensimeter, ketukan RJP).
   - Skor per butir checklist dihitung oleh fungsi di definisi interaksi (OSCE.h.*),
     berdasarkan apa yang dilakukan kandidat. Checklist sendiri berasal dari markdown stasiun. */
(function (g) {
  'use strict';
  var OSCE = (g.OSCE = g.OSCE || {});
  var registry = (OSCE.interaksi = OSCE.interaksi || {});
  OSCE.versi = '0.1.0';

  /* ---------- pembantu penulisan definisi interaksi ---------- */

  function tandai(fn, refs) {
    fn.refs = refs || [];
    return fn;
  }

  OSCE.h = {
    any: function (ids) {
      return tandai(function (c, m) { return c.salahSatu(ids) ? m : 0; }, ids);
    },
    all: function (ids) {
      return tandai(function (c, m) { return ids.every(c.sudah) ? m : 0; }, ids);
    },
    // tiers: [[minimalJumlah, poin], ...] urut dari yang terbesar
    count: function (ids, tiers) {
      return tandai(function (c) {
        var n = c.jumlah(ids);
        for (var i = 0; i < tiers.length; i++) if (n >= tiers[i][0]) return tiers[i][1];
        return 0;
      }, ids);
    },
    kustom: function (fn, refs) { return tandai(fn, refs); }
  };

  // A(id, label, respons, biaya, opsi) — opsi: tidakTepat, berisiko (alasan), syarat(ctx),
  // efek(ctx), eksklusif (kunci), sekali (default true)
  OSCE.A = function (id, label, respons, biaya, opsi) {
    var a = { id: id, label: label, respons: respons, biaya: biaya, sekali: true };
    if (opsi) for (var k in opsi) a[k] = opsi[k];
    return a;
  };

  OSCE.daftar = function (id, def) { registry[id] = def; };

  OSCE.ambil = function (id) {
    var data = g.OSCE_DATA && g.OSCE_DATA.stasiun[id];
    if (!data) return null;
    return Object.assign({}, data, { interaksi: registry[id] || null });
  };

  OSCE.daftarStasiun = function () {
    return ((g.OSCE_DATA && g.OSCE_DATA.urutan) || []).map(OSCE.ambil);
  };

  /* ---------- indeks dan validasi definisi ---------- */

  function indeksAksi(def) {
    var peta = new Map();
    var semua = [];
    (def.panel || []).forEach(function (p) {
      if (p.tipe === 'aksi') {
        p.grup.forEach(function (gr) {
          gr.aksi.forEach(function (a) {
            peta.set(a.id, { tipe: 'aksi', aksi: a, panel: p.id });
            semua.push(a);
          });
        });
      } else if (p.tipe === 'form') {
        peta.set(p.id, { tipe: 'form', panel: p });
      }
    });
    return { peta: peta, semua: semua };
  }

  function idBidang(def) {
    var ids = [];
    (def.panel || []).forEach(function (p) {
      if (p.tipe === 'form') p.bidang.forEach(function (b) { ids.push(b.id); });
    });
    return ids;
  }

  // Mengembalikan daftar masalah (string); kosong berarti konsisten.
  OSCE.periksaInteraksi = function (id) {
    var st = OSCE.ambil(id);
    var masalah = [];
    if (!st) return ['Stasiun ' + id + ' tidak ada pada data hasil generator'];
    var def = st.interaksi;
    if (!def) return ['Stasiun ' + id + ' belum punya definisi interaksi'];
    if (typeof def.waktu !== 'number' || def.waktu <= 0) masalah.push('waktu tidak valid');
    var idx = indeksAksi(def);
    var dikenal = new Set();
    var ganda = function (x, asal) {
      if (dikenal.has(x)) masalah.push('id ganda: ' + x + ' (' + asal + ')');
      dikenal.add(x);
    };
    idx.semua.forEach(function (a) {
      ganda(a.id, 'aksi');
      if (typeof a.biaya !== 'number' || a.biaya < 0) masalah.push('biaya aksi tidak valid: ' + a.id);
    });
    (def.panel || []).forEach(function (p) {
      if (p.tipe === 'form') ganda(p.id, 'panel');
    });
    idBidang(def).forEach(function (b) { ganda(b, 'bidang'); });
    (def.acara || []).forEach(function (e) { ganda(e, 'acara'); });
    (def.jadwal || []).forEach(function (j) { if (j.id) ganda(j.id, 'jadwal'); });
    st.checklist.forEach(function (it) {
      var fn = def.skor && def.skor[it.id];
      if (typeof fn !== 'function') { masalah.push('butir ' + it.id + ' tidak punya fungsi skor'); return; }
      (fn.refs || []).forEach(function (r) {
        if (!dikenal.has(r)) masalah.push('butir ' + it.id + ' merujuk id tak dikenal: ' + r);
      });
    });
    Object.keys(def.skor || {}).forEach(function (k) {
      if (!st.checklist.some(function (it) { return it.id === k; })) masalah.push('skor untuk butir yang tidak ada di checklist: ' + k);
    });
    if (!Array.isArray(def.ideal) || !def.ideal.length) masalah.push('rencana ideal kosong');
    return masalah;
  };

  /* ---------- sesi simulasi ---------- */

  function daftarPilihan(bidang) {
    return (bidang.opsi || []).reduce(function (m, o) { m[o[0]] = o; return m; }, {});
  }

  function ringkasJawaban(bidang, nilai) {
    if (bidang.tipe === 'cek') return nilai ? 'Ya' : 'Tidak';
    if (bidang.tipe === 'number') return nilai === '' || nilai == null ? '(kosong)' : String(nilai) + (bidang.satuan ? ' ' + bidang.satuan : '');
    if (bidang.tipe === 'teks') return nilai ? String(nilai) : '(kosong)';
    var pilihan = daftarPilihan(bidang);
    if (bidang.tipe === 'multi') {
      var dipilih = (nilai || []).map(function (v) { return pilihan[v] ? pilihan[v][1] : v; });
      return dipilih.length ? dipilih.join('; ') : '(tidak ada)';
    }
    return pilihan[nilai] ? pilihan[nilai][1] : '(belum dipilih)';
  }

  OSCE.mulaiSesi = function (id) {
    var st = OSCE.ambil(id);
    if (!st || !st.interaksi) throw new Error('Stasiun tidak tersedia: ' + id);
    var def = st.interaksi;
    var idx = indeksAksi(def);
    var selesaiAksi = new Map();
    var peristiwa = new Map();
    var jawaban = {};
    var formTerkirim = new Set();
    var log = [];
    var tidakTepat = [];
    var berisiko = [];
    var jadwalTerpicu = new Set();
    var terpakai = 0;
    var selesai = false;
    var alasanSelesai = null;

    var ctx = {
      sudah: function (i) { return selesaiAksi.has(i) || peristiwa.has(i) || formTerkirim.has(i); },
      salahSatu: function (ids) { return ids.some(ctx.sudah); },
      jumlah: function (ids) { return ids.filter(ctx.sudah).length; },
      hitung: function (i) { return peristiwa.has(i) ? peristiwa.get(i).n : 0; },
      nilai: function (i) { return peristiwa.has(i) ? peristiwa.get(i).nilai : undefined; },
      jawab: function (f) { return jawaban[f]; },
      waktuAksi: function (i) { return selesaiAksi.get(i); },
      get terpakai() { return terpakai; },
      get sisa() { return Math.max(0, def.waktu - terpakai); }
    };

    function akhiri(alasan) {
      if (selesai) return;
      selesai = true;
      alasanSelesai = alasan;
      log.push({ tipe: 'sistem', label: alasan === 'waktu' ? 'Waktu habis. Stasiun selesai.' : 'Stasiun diakhiri.', t: terpakai });
    }

    function periksaJadwal() {
      (def.jadwal || []).forEach(function (j, i) {
        if (!jadwalTerpicu.has(i) && terpakai >= j.pada) {
          jadwalTerpicu.add(i);
          if (j.id) peristiwa.set(j.id, { n: 1, nilai: true });
          log.push({ tipe: 'sistem', label: j.pesan, t: terpakai });
        }
      });
      if (!selesai && terpakai >= def.waktu) akhiri('waktu');
    }

    function catatBendera(sumber, label, info) {
      if (info.tidakTepat) tidakTepat.push({ id: sumber, label: label, alasan: info.tidakTepat });
      if (info.berisiko) berisiko.push({ id: sumber, label: label, alasan: info.berisiko });
    }

    function lakukan(idAksi) {
      if (selesai) return { ok: false, alasan: 'Stasiun telah selesai.' };
      var e = idx.peta.get(idAksi);
      if (!e || e.tipe !== 'aksi') return { ok: false, alasan: 'Aksi tidak dikenal: ' + idAksi };
      var a = e.aksi;
      if (a.sekali !== false && selesaiAksi.has(a.id)) return { ok: false, alasan: 'Sudah dilakukan.' };
      if (a.eksklusif) {
        var bentrok = idx.semua.some(function (x) {
          return x.id !== a.id && x.eksklusif === a.eksklusif && selesaiAksi.has(x.id);
        });
        if (bentrok) return { ok: false, alasan: 'Pilihan lain untuk hal yang sama sudah diambil.' };
      }
      var tolak = a.syarat ? a.syarat(ctx) : null;
      if (tolak) return { ok: false, alasan: tolak };
      terpakai += a.biaya;
      selesaiAksi.set(a.id, terpakai);
      var resp = typeof a.respons === 'function' ? a.respons(ctx) : a.respons;
      log.push({ tipe: 'aksi', id: a.id, label: a.label, respons: resp, t: terpakai, biaya: a.biaya, panel: e.panel, tidakTepat: a.tidakTepat, berisiko: a.berisiko });
      catatBendera(a.id, a.label, a);
      if (a.efek) a.efek(ctx);
      periksaJadwal();
      return { ok: true, respons: resp, biaya: a.biaya };
    }

    // Keluaran widget. info: {label, respons, biaya, tidakTepat, berisiko}
    function emit(idAcara, nilai, info) {
      if (selesai) return { ok: false, alasan: 'Stasiun telah selesai.' };
      info = info || {};
      var p = peristiwa.get(idAcara) || { n: 0 };
      p.n += 1;
      p.nilai = nilai;
      peristiwa.set(idAcara, p);
      if (info.biaya) terpakai += info.biaya;
      if (info.label || info.respons) {
        log.push({ tipe: 'peristiwa', id: idAcara, label: info.label || idAcara, respons: info.respons || '', t: terpakai, biaya: info.biaya || 0 });
      }
      catatBendera(idAcara, info.label || idAcara, info);
      periksaJadwal();
      return { ok: true };
    }

    function kirimForm(idPanel, jwb) {
      if (selesai) return { ok: false, alasan: 'Stasiun telah selesai.' };
      var e = idx.peta.get(idPanel);
      if (!e || e.tipe !== 'form') return { ok: false, alasan: 'Panel form tidak dikenal: ' + idPanel };
      if (formTerkirim.has(idPanel)) return { ok: false, alasan: 'Jawaban panel ini sudah dikirim.' };
      jwb = jwb || {};
      var ringkas = [];
      e.panel.bidang.forEach(function (b) {
        var nilai = jwb[b.id];
        if (b.tipe === 'multi' && !Array.isArray(nilai)) nilai = [];
        jawaban[b.id] = nilai;
        var pilihan = daftarPilihan(b);
        var terpilih = b.tipe === 'multi' ? nilai : b.tipe === 'select' ? [nilai] : [];
        terpilih.forEach(function (v) {
          var o = pilihan[v];
          if (o && o[2]) catatBendera(b.id + ':' + v, o[1], o[2]);
        });
        ringkas.push(b.label + ': ' + ringkasJawaban(b, nilai));
      });
      formTerkirim.add(idPanel);
      terpakai += e.panel.biaya || 0;
      log.push({ tipe: 'form', id: idPanel, label: e.panel.label, respons: ringkas.join('\n'), t: terpakai, biaya: e.panel.biaya || 0 });
      periksaJadwal();
      return { ok: true };
    }

    function perkiraanGlobal(persen, kritisGagal) {
      if (kritisGagal.length || berisiko.length) {
        return { kode: 1, label: 'Tidak lulus', alasan: kritisGagal.length ? 'Ada butir kritis yang tidak terpenuhi.' : 'Ada tindakan yang berisiko bagi pasien.' };
      }
      var kode = persen < 55 ? 1 : persen < 70 ? 2 : persen < 85 ? 3 : 4;
      var alasan = 'Berdasarkan persentase skor checklist.';
      if (tidakTepat.length >= 3 && kode > 2) {
        kode = 2;
        alasan = 'Banyak tindakan tidak tepat (≥ 3) menurunkan perkiraan ke Borderline.';
      }
      if (alasanSelesai === 'waktu' && kode > 3) {
        kode = 3;
        alasan = 'Waktu habis sebelum semua tugas selesai; perkiraan dibatasi pada Lulus.';
      }
      var label = ['', 'Tidak lulus', 'Borderline', 'Lulus', 'Sangat baik'][kode];
      return { kode: kode, label: label, alasan: alasan };
    }

    function evaluasi() {
      var butir = st.checklist.map(function (it) {
        var fn = def.skor[it.id];
        var p = fn ? fn(ctx, it.skor) : 0;
        p = Math.max(0, Math.min(it.skor, Number(p) || 0));
        return Object.assign({}, it, {
          diperoleh: p,
          status: p >= it.skor ? 'penuh' : p > 0 ? 'sebagian' : 'nol'
        });
      });
      var total = butir.reduce(function (s, b) { return s + b.diperoleh; }, 0);
      var maks = st.checklist.reduce(function (s, b) { return s + b.skor; }, 0);
      var persen = maks ? Math.round((total / maks) * 1000) / 10 : 0;
      var kritisGagal = butir.filter(function (b) { return b.kritis && b.diperoleh < b.skor; });
      return {
        butir: butir,
        total: total,
        maks: maks,
        persen: persen,
        kritisGagal: kritisGagal,
        berisiko: berisiko.slice(),
        tidakTepat: tidakTepat.slice(),
        bantuanTeks: peristiwa.has('bantuan_teks'),
        terpakai: terpakai,
        sisa: ctx.sisa,
        alasanSelesai: alasanSelesai,
        global: perkiraanGlobal(persen, kritisGagal)
      };
    }

    return {
      stasiun: st,
      def: def,
      ctx: ctx,
      log: log,
      lakukan: lakukan,
      emit: emit,
      kirimForm: kirimForm,
      akhiri: function () { akhiri('manual'); },
      evaluasi: evaluasi,
      sudah: ctx.sudah,
      get terpakai() { return terpakai; },
      get sisa() { return ctx.sisa; },
      get selesai() { return selesai; },
      get alasanSelesai() { return alasanSelesai; },
      formTerkirim: function (i) { return formTerkirim.has(i); },
      jawaban: function () { return Object.assign({}, jawaban); }
    };
  };

  // Menjalankan rencana (string = aksi; {form, jawab}; {acara, nilai, info}) — untuk uji dan "contoh ideal".
  OSCE.jalankanRencana = function (sesi, rencana) {
    var galat = [];
    rencana.forEach(function (langkah, i) {
      var r;
      if (typeof langkah === 'string') r = sesi.lakukan(langkah);
      else if (langkah.form) r = sesi.kirimForm(langkah.form, langkah.jawab);
      else if (langkah.acara) r = sesi.emit(langkah.acara, langkah.nilai, langkah.info);
      if (!r || !r.ok) galat.push('langkah ' + (i + 1) + ' ' + JSON.stringify(langkah) + ': ' + (r ? r.alasan : 'tidak dikenal'));
    });
    return galat;
  };

  OSCE.semuaAksi = function (def) { return indeksAksi(def).semua; };
  OSCE.ringkasJawaban = ringkasJawaban;
})(typeof window !== 'undefined' ? window : globalThis);
