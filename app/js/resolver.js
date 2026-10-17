/* Resolver ucapan (mode tes), tanpa DOM dan tanpa jaringan: mengubah kalimat bebas kandidat (ketik atau hasil
   pengenalan suara) menjadi aksi stasiun dan isian form. Ini jalur OFFLINE; OSCE.llm menjadi jalur utama bila
   dikonfigurasi dan memakai resolver ini sebagai cadangan.

   Cara kerja: tiap aksi punya contoh kalimat (labelnya + parafrase latih di OSCE.ucapan[id].aksi). Kalimat kandidat
   dinormalisasi (huruf kecil, singkatan lazim, sinonim medis awam→baku, stemming ringan, buang kata pengisi),
   lalu dicocokkan ke tiap contoh dengan skor cakupan berbobot IDF. Aksi yang sama-sama cocok dipilih menurut
   ketersediaan saat ini (mis. cek_irama_1..5), dan kalimat majemuk ditangani dengan menutup token yang sudah
   dipakai lalu mencari sisanya. Akurasi diukur oleh tools/cek_resolver.mjs pada kalimat uji yang TIDAK dipakai
   untuk melatih. */
(function (g) {
  'use strict';
  var OSCE = (g.OSCE = g.OSCE || {});

  var SINGKATAN = {
    yg: 'yang', dgn: 'dengan', dg: 'dengan', tdk: 'tidak', gak: 'tidak', ga: 'tidak', gk: 'tidak', nggak: 'tidak',
    ngga: 'tidak', enggak: 'tidak', ndak: 'tidak', nda: 'tidak', udah: 'sudah', sdh: 'sudah', blm: 'belum',
    brp: 'berapa', kpn: 'kapan', dmn: 'dimana', gmn: 'bagaimana', bgmn: 'bagaimana', utk: 'untuk', krn: 'karena',
    sy: 'saya', dr: 'dokter', ecg: 'ekg', ekg: 'ekg', ttv: 'tandavital', td: 'tekanan darah', tensi: 'tekanan darah',
    tekdar: 'tekanan darah', hr: 'nadi', rr: 'napas', iv: 'iv', io: 'io', o2: 'oksigen', dm: 'diabetes', ht: 'hipertensi',
    bab: 'bab', bak: 'bak', rs: 'rumahsakit', ugd: 'igd', icu: 'icu', iccu: 'icu'
  };

  // Frasa → token tunggal (diterapkan pada teks yang sudah dinormalisasi, sebelum tokenisasi).
  var FRASA = [
    ['susah napas', 'sesak'], ['sulit napas', 'sesak'], ['sulit bernapas', 'sesak'], ['susah bernapas', 'sesak'],
    ['napas pendek', 'sesak'], ['sesak napas', 'sesak'], ['kehabisan napas', 'sesak'], ['ngos ngosan', 'sesak'],
    ['rekam jantung', 'ekg'], ['rekaman jantung', 'ekg'], ['elektrokardiogram', 'ekg'], ['elektro kardiogram', 'ekg'],
    ['darah tinggi', 'hipertensi'], ['tekanan darah tinggi', 'hipertensi'],
    ['kencing manis', 'diabetes'], ['gula darah', 'glukosa'], ['kadar gula', 'glukosa'], ['gula', 'glukosa'],
    ['keringat dingin', 'keringat'], ['berkeringat', 'keringat'], ['keringetan', 'keringat'],
    ['lemak darah', 'kolesterol'], ['deg degan', 'berdebar'], ['jantung kencang', 'berdebar'], ['palpitasi', 'berdebar'],
    ['hampir pingsan', 'pingsan'], ['sinkop', 'pingsan'], ['tidak sadar', 'pingsan'], ['hilang kesadaran', 'pingsan'],
    ['minuman keras', 'alkohol'], ['miras', 'alkohol'], ['orang tua', 'keluarga'], ['anggota keluarga', 'keluarga'],
    ['riwayat penyakit', 'riwayat'], ['sakit jantung', 'penyakit jantung'], ['serangan jantung', 'infark'],
    ['henti jantung', 'hentijantung'], ['kode biru', 'kodebiru'], ['tim resusitasi', 'kodebiru'],
    ['tanda tanda vital', 'tandavital'], ['tanda vital', 'tandavital'], ['denyut nadi', 'nadi'],
    ['aliran darah', 'perfusi'], ['pengisian kapiler', 'kapiler'], ['isi kapiler', 'kapiler'],
    ['pemeriksaan fisik', 'periksafisik'], ['persetujuan tindakan', 'persetujuan'], ['informed consent', 'persetujuan'],
    ['boleh saya tanya', ''], ['saya mau tanya', ''], ['saya ingin bertanya', ''], ['izin bertanya', ''],
    ['ijin bertanya', ''], ['mohon izin', ''], ['permisi', ''], ['selamat pagi', 'salam'], ['selamat siang', 'salam'],
    ['selamat sore', 'salam'], ['selamat malam', 'salam'], ['assalamualaikum', 'salam'], ['perkenalkan', 'salam'],
    ['terima kasih', 'terimakasih']
  ];

  // Kelas sinonim (setelah stemming). Anggota dipetakan ke anggota pertama.
  var KELAS = [
    ['nyeri', 'sakit', 'perih', 'pedih', 'ngilu', 'cekot', 'nyut'],
    ['jalar', 'sebar', 'rambat', 'tembus', 'alih'],
    ['periksa', 'cek', 'test', 'tes', 'evaluasi', 'nilai', 'pantau', 'monitor'],
    ['minta', 'suruh', 'perintah', 'instruksi', 'minta'],
    ['pasang', 'pakai', 'sambung', 'letak'],
    ['berikan', 'beri', 'kasih', 'suntik', 'suntikkan', 'berikankan'],
    ['obat', 'pil', 'tablet', 'resep', 'medikasi'],
    ['mual', 'muntah', 'eneg'],
    ['rokok', 'perokok', 'tembakau', 'nikotin', 'ngerokok'],
    ['makan', 'konsumsi', 'santap'],
    ['bengkak', 'edema', 'sembab'],
    ['jelaskan', 'terang', 'sampaikan', 'informasikan', 'edukasi', 'beritahu', 'komunikasikan'],
    ['rencana', 'program', 'langkah'],
    ['pernah', 'riwayat', 'dahulu', 'sebelum', 'lampau'],
    ['berat', 'parah', 'hebat', 'skala'],
    ['ringan', 'reda', 'baik', 'berkurang', 'lega'],
    ['pencetus', 'picu', 'cetus', 'sebab'],
    ['kerja', 'pekerjaan', 'profesi', 'bekerja'],
    ['sehari', 'harian'],
    ['bantuan', 'tolong', 'bantu'],
    ['hasil', 'temuan'],
    ['lengan', 'tangan'],
    ['gelisah', 'cemas', 'khawatir', 'takut', 'kuatir', 'was'],
    ['mulai', 'muncul', 'awal', 'sejak', 'timbul', 'terjadi', 'onset', 'kambuh'],
    ['lama', 'durasi', 'berlangsung', 'bertahan'],
    ['dada', 'prekordium', 'torak', 'toraks'],
    ['darah', 'hematologi']
  ];
  var KANON = {};
  KELAS.forEach(function (k) { k.forEach(function (w) { KANON[w] = k[0]; }); });

  var STOP = {};
  ('yang di ke dari dan atau dengan untuk pada itu ini saya anda kamu aku kami kita bapak pak ibu bu dok dokter ' +
    'mas mbak ya kah lah tah pun boleh bisa dapat tolong mohon silakan silahkan coba apakah apa adakah ada akan sedang ' +
    'sudah telah mau ingin hendak saja sih dong deh nih kok kan lagi juga masih cuma hanya sangat sekali agak ' +
    'tanya tanyakan menanyakan bertanya tahu mengetahui sebentar dulu nanti sambil kalau jika maka lalu kemudian ' +
    'serta terus oke baik ok mari ayo yuk tidak bukan gimana bagaimana kenapa mengapa').split(' ').forEach(function (w) { STOP[w] = 1; });

  function norm(teks) {
    var t = String(teks == null ? '' : teks).toLowerCase();
    t = t.replace(/[‘’“”"'`´]/g, '');
    t = t.replace(/[^a-z0-9à-ÿ\s]/g, ' ').replace(/\s+/g, ' ').trim();
    t = ' ' + t + ' ';
    FRASA.forEach(function (f) { t = t.split(' ' + f[0] + ' ').join(' ' + f[1] + ' '); });
    return t.replace(/\s+/g, ' ').trim();
  }

  // Stemming ringan bahasa Indonesia. Tidak sempurna, tetapi konsisten untuk indeks dan kueri.
  var AWALAN = ['meng', 'meny', 'men', 'mem', 'peng', 'peny', 'pen', 'pem', 'ber', 'ter', 'me', 'pe', 'di', 'se'];
  var cacheStem = {};
  function stem(w) {
    if (cacheStem[w] !== undefined) return cacheStem[w];
    var s = w;
    if (/^[0-9]+$/.test(s) || s.length <= 4) { cacheStem[w] = KANON[s] || s; return cacheStem[w]; }
    s = s.replace(/(lah|kah|pun)$/, '');
    s = s.replace(/(nya)$/, function (m) { return s.length > 6 ? '' : m; });
    for (var i = 0; i < 2; i++) {
      var m = /(kan|an|i)$/.exec(s);
      if (m && s.length - m[1].length >= 4) { s = s.slice(0, -m[1].length); break; }
    }
    if (s.length > 4) {
      for (var j = 0; j < AWALAN.length; j++) {
        var aw = AWALAN[j];
        if (s.indexOf(aw) === 0 && s.length - aw.length >= 4) { s = s.slice(aw.length); break; }
      }
    }
    if (s.length > 4 && /^(ke|se)/.test(s) && /an$/.test(w)) s = s.slice(2);
    cacheStem[w] = KANON[s] || KANON[w] || s;
    return cacheStem[w];
  }

  function tokenisasi(teks) {
    var kata = norm(teks).split(' '), hasil = [], lihat = {};
    kata.forEach(function (k) {
      if (!k || STOP[k]) return;
      var s = stem(k);
      if (!s || STOP[s] || lihat[s]) return;
      lihat[s] = 1;
      hasil.push(s);
    });
    return hasil;
  }

  var NEGASI = { tidak: 1, bukan: 1, tanpa: 1, belum: 1, jangan: 1 };

  function samaLemah(a, b) {
    if (a === b) return 1;
    if (a.length >= 5 && b.length >= 5) {
      var p = 0, n = Math.min(a.length, b.length);
      while (p < n && a.charAt(p) === b.charAt(p)) p++;
      if (p >= 5 && p >= Math.min(a.length, b.length) - 2) return 0.8;
    }
    return 0;
  }

  /* ---------- indeks aksi ---------- */

  function indeksAksi(st, opsi) {
    opsi = opsi || {};
    var ucapan = (opsi.ucapan || (OSCE.ucapan && OSCE.ucapan[st.id]) || {});
    var aksiList = OSCE.semuaAksi(st.interaksi);
    var contoh = {};
    (ucapan.aksi ? Object.keys(ucapan.aksi) : []).forEach(function (id) { contoh[id] = (ucapan.aksi[id] || []).slice(); });
    (ucapan.keluarga || []).forEach(function (kel) {
      kel.ids.forEach(function (id) { contoh[id] = (contoh[id] || []).concat(kel.ucapan || []); });
    });
    var df = {}, docs = [];
    aksiList.forEach(function (a, urutan) {
      var ex = [tokenisasi(a.label)];
      (contoh[a.id] || []).forEach(function (u) { var t = tokenisasi(u); if (t.length) ex.push(t); });
      var semua = {};
      ex.forEach(function (t) { t.forEach(function (w) { semua[w] = 1; }); });
      Object.keys(semua).forEach(function (w) { df[w] = (df[w] || 0) + 1; });
      docs.push({ id: a.id, urutan: urutan, contoh: ex });
    });
    var N = docs.length;
    function idf(w) { return Math.log(1 + (N - (df[w] || 0) + 0.5) / ((df[w] || 0) + 0.5)); }
    return { stasiun: st.id, docs: docs, df: df, N: N, idf: idf, unk: Math.log(1 + N) * 0.6, aksi: aksiList };
  }

  function skorContoh(ix, q, w) {
    // q: token kueri aktif; w: bobot per token. Mengembalikan {skor, cocok:[token kueri terpakai]}.
    var tot = 0, ok = 0, cocokQ = [];
    q.forEach(function (t) { tot += w[t]; });
    return function (ex) {
      var exSet = ex, okQ = 0, docTot = 0, docOk = 0;
      cocokQ = [];
      ex.forEach(function (e) { docTot += ix.idf(e); });
      var terpakaiDoc = {};
      q.forEach(function (t) {
        var terbaik = 0, pasangan = null;
        for (var i = 0; i < exSet.length; i++) {
          var s = samaLemah(t, exSet[i]);
          if (s > terbaik) { terbaik = s; pasangan = exSet[i]; }
        }
        if (terbaik > 0) { okQ += terbaik * w[t]; cocokQ.push(t); if (!terpakaiDoc[pasangan]) { terpakaiDoc[pasangan] = 1; docOk += ix.idf(pasangan) * terbaik; } }
      });
      var cov = tot ? okQ / tot : 0;
      var prec = docTot ? docOk / docTot : 0;
      return { skor: cov * (0.6 + 0.4 * Math.min(1, prec * 2)), cov: cov, prec: prec, cocok: cocokQ.slice() };
    };
  }

  var AMBANG = { satu: 0.52, tambahan: 0.62, sisaMin: 0.28, selisih: 0.04, maks: 4 };

  function segmen(ucapan) {
    return String(ucapan || '').split(/[,;.?!\n]+|\s(?:dan|atau|serta|lalu|kemudian|juga|terus|sama|plus)\s/i)
      .map(function (x) { return x.trim(); }).filter(function (x) { return x.length > 1; });
  }

  // Mencocokkan kalimat ke aksi. Dua tahap: kalimat utuh, lalu per segmen bila ucapan majemuk (≥ 2 aksi berbeda).
  function cocokkan(ix, ucapan, opsi) {
    opsi = opsi || {};
    var utuh = cocokkanSatu(ix, ucapan, opsi);
    var seg = segmen(ucapan);
    if (seg.length > 1) {
      var gabung = [], lihat = {};
      seg.forEach(function (sg) {
        var r = cocokkanSatu(ix, sg, Object.assign({}, opsi, { maks: 1 }));
        r.aksi.forEach(function (a) { if (!lihat[a.id]) { lihat[a.id] = 1; gabung.push(a); } });
      });
      if (gabung.length >= 2) {
        utuh.aksi = gabung.slice(0, opsi.maks || AMBANG.maks);
        utuh.dariSegmen = true;
      }
    }
    return utuh;
  }

  function cocokkanSatu(ix, ucapan, opsi) {
    opsi = opsi || {};
    var amb = Object.assign({}, AMBANG, opsi.ambang || {});
    var q = tokenisasi(ucapan);
    var hasil = { aksi: [], token: q, skorTertinggi: 0, sisa: [] };
    if (!q.length) return hasil;
    var bobot = {};
    q.forEach(function (t) { bobot[t] = ix.df[t] ? ix.idf(t) : ix.unk; });
    var aktif = q.slice();
    var terpilih = {};
    for (var putaran = 0; putaran < (opsi.maks || amb.maks); putaran++) {
      var skorFn = skorContoh(ix, aktif, bobot);
      var kandidat = [];
      ix.docs.forEach(function (d) {
        if (terpilih[d.id]) return;
        var terbaik = null;
        d.contoh.forEach(function (ex) {
          var r = skorFn(ex);
          if (!terbaik || r.skor > terbaik.skor) terbaik = r;
        });
        if (terbaik && terbaik.skor > 0) kandidat.push({ doc: d, r: terbaik });
      });
      if (!kandidat.length) break;
      kandidat.sort(function (a, b) { return b.r.skor - a.r.skor || a.doc.urutan - b.doc.urutan; });
      var puncak = kandidat[0].r.skor;
      var ambangIni = putaran === 0 ? amb.satu : amb.tambahan;
      if (putaran === 0) hasil.skorTertinggi = puncak;
      if (puncak < ambangIni) break;
      var dekat = kandidat.filter(function (k) { return puncak - k.r.skor <= amb.selisih; });
      var pilih = dekat[0];
      if (opsi.tersedia) {
        var tersedia = dekat.filter(function (k) { return opsi.tersedia(k.doc.id); });
        if (tersedia.length) pilih = tersedia[0];
      }
      terpilih[pilih.doc.id] = 1;
      hasil.aksi.push({ id: pilih.doc.id, skor: Math.round(pilih.r.skor * 1000) / 1000, alternatif: dekat.length > 1 ? dekat.map(function (k) { return k.doc.id; }) : undefined });
      var pakai = {};
      pilih.r.cocok.forEach(function (t) { pakai[t] = 1; });
      var sisaTok = aktif.filter(function (t) { return !pakai[t]; });
      var bobotSisa = 0, bobotAwal = 0;
      sisaTok.forEach(function (t) { bobotSisa += bobot[t]; });
      q.forEach(function (t) { bobotAwal += bobot[t]; });
      aktif = sisaTok;
      if (!aktif.length || bobotSisa / bobotAwal < amb.sisaMin) break;
    }
    hasil.sisa = aktif;
    return hasil;
  }

  /* ---------- isian form ---------- */

  function indeksForm(st) {
    var panel = st.interaksi.panel.filter(function (p) { return p.tipe === 'form'; });
    var df = {}, opsiList = [];
    panel.forEach(function (p) {
      p.bidang.forEach(function (b) {
        if (b.tipe === 'select' || b.tipe === 'multi') {
          b.opsi.forEach(function (o) {
            var tok = tokenisasi(o[1]);
            tok.forEach(function (w) { df[w] = (df[w] || 0) + 1; });
            opsiList.push({ panel: p.id, bidang: b.id, tipe: b.tipe, nilai: o[0], token: tok, label: o[1], negasi: norm(o[1]).split(' ').some(function (k) { return NEGASI[k]; }) });
          });
        } else if (b.tipe === 'cek') {
          var tok2 = tokenisasi((b.teks || b.label || ''));
          tok2.forEach(function (w) { df[w] = (df[w] || 0) + 1; });
          opsiList.push({ panel: p.id, bidang: b.id, tipe: 'cek', nilai: true, token: tok2, label: b.teks || b.label, negasi: false });
        }
      });
    });
    var N = Math.max(1, opsiList.length);
    function idf(w) { return Math.log(1 + (N - (df[w] || 0) + 0.5) / ((df[w] || 0) + 0.5)); }
    return { panel: panel, opsi: opsiList, idf: idf };
  }

  // Ekstraksi isian offline. Hasil: { panelId: { bidangId: nilai } } hanya untuk bidang yang terdeteksi.
  function ekstrak(ixf, ucapan, opsi) {
    opsi = opsi || {};
    var kalimat = String(ucapan || '').split(/[,;.\n]+/).map(function (k) { return k.trim(); }).filter(Boolean);
    var hasil = {};
    function taruh(panel, bidang, nilai, tambah) {
      hasil[panel] = hasil[panel] || {};
      if (tambah) { hasil[panel][bidang] = (hasil[panel][bidang] || []).concat(nilai); } else hasil[panel][bidang] = nilai;
    }
    var perBidang = {};
    ixf.opsi.forEach(function (o) {
      var k = o.panel + '|' + o.bidang;
      (perBidang[k] = perBidang[k] || []).push(o);
    });
    var seluruh = tokenisasi(ucapan);
    Object.keys(perBidang).forEach(function (k) {
      var daftar = perBidang[k];
      var skorOpsi = daftar.map(function (o) {
        if (!o.token.length) return { o: o, skor: 0 };
        var terbaik = 0;
        // skor = cakupan token opsi oleh satu klausa (agar negasi dapat dikaitkan ke klausa yang sama)
        kalimat.forEach(function (kal) {
          var tk = tokenisasi(kal), tot = 0, ok = 0;
          o.token.forEach(function (w) {
            var bobot = ixf.idf(w); tot += bobot;
            for (var i = 0; i < tk.length; i++) { var s = samaLemah(w, tk[i]); if (s) { ok += bobot * s; break; } }
          });
          var skor = tot ? ok / tot : 0;
          var neg = kal.toLowerCase().split(/\s+/).some(function (kata) { return NEGASI[kata]; });
          if (neg && !o.negasi) skor = 0;
          if (skor > terbaik) terbaik = skor;
        });
        return { o: o, skor: terbaik };
      });
      skorOpsi.sort(function (a, b) { return b.skor - a.skor; });
      var tipe = daftar[0].tipe;
      if (tipe === 'select') {
        if (skorOpsi[0].skor >= 0.6 && (!skorOpsi[1] || skorOpsi[0].skor - skorOpsi[1].skor >= 0.15)) taruh(skorOpsi[0].o.panel, skorOpsi[0].o.bidang, skorOpsi[0].o.nilai);
      } else if (tipe === 'multi') {
        skorOpsi.filter(function (x) { return x.skor >= 0.6; }).forEach(function (x) { taruh(x.o.panel, x.o.bidang, [x.o.nilai], true); });
      } else if (tipe === 'cek') {
        if (skorOpsi[0].skor >= 0.6) taruh(skorOpsi[0].o.panel, skorOpsi[0].o.bidang, true);
      }
    });
    // bidang angka: ambil angka dari klausa yang memuat kata label bidang; bila hanya satu bidang angka, pakai angka pertama
    var angkaBidang = [];
    ixf.panel.forEach(function (p) { p.bidang.forEach(function (b) { if (b.tipe === 'number') angkaBidang.push({ panel: p.id, b: b }); }); });
    if (angkaBidang.length) {
      var angkaKlausa = kalimat.map(function (kal) { return { kal: kal, angka: (kal.match(/\d+(?:[.,]\d+)?/g) || []).map(function (x) { return Number(x.replace(',', '.')); }) }; }).filter(function (x) { return x.angka.length; });
      angkaBidang.forEach(function (ab) {
        var tokLabel = tokenisasi(ab.b.label);
        var terpilih = null;
        angkaKlausa.forEach(function (x) {
          var tk = tokenisasi(x.kal);
          var irisan = tokLabel.filter(function (w) { return tk.indexOf(w) >= 0; }).length;
          if (irisan && !terpilih) terpilih = x.angka[0];
        });
        if (terpilih == null && angkaBidang.length === 1 && angkaKlausa.length === 1) terpilih = angkaKlausa[0].angka[0];
        if (terpilih != null && (ab.b.min == null || terpilih >= ab.b.min) && (ab.b.max == null || terpilih <= ab.b.max)) taruh(ab.panel, ab.b.id, terpilih);
      });
    }
    return hasil;
  }

  OSCE.resolver = {
    norm: norm, tokenisasi: tokenisasi, stem: stem, AMBANG: AMBANG,
    bangun: function (st, opsi) { return { aksi: indeksAksi(st, opsi), form: indeksForm(st) }; },
    cocokkan: function (ix, ucapan, opsi) { return cocokkan(ix.aksi, ucapan, opsi); },
    ekstrak: function (ix, ucapan, opsi) { return ekstrak(ix.form, ucapan, opsi); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
