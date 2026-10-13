/* Utilitas antarmuka: pembuat elemen, markdown mini, penyimpanan lokal, unduhan. */
(function (g) {
  'use strict';
  var OSCE = (g.OSCE = g.OSCE || {});
  var U = (OSCE.util = {});

  function tambahAnak(e, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { tambahAnak(e, x); }); return; }
    e.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
  }

  // el('div', {class:'x', onclick: fn, teks:'...'}, anak...) — "html" hanya untuk HTML yang sudah di-escape.
  U.el = function (tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'class') e.className = v;
        else if (k === 'teks') e.textContent = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k === 'data') Object.keys(v).forEach(function (d) { e.dataset[d] = v[d]; });
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') e.addEventListener(k.slice(2), v);
        else if (k === 'value') e.value = v;
        else e.setAttribute(k, v === true ? '' : v);
      });
    }
    for (var i = 2; i < arguments.length; i++) tambahAnak(e, arguments[i]);
    return e;
  };

  U.svg = function (tag, attrs) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    for (var i = 2; i < arguments.length; i++) tambahAnak(e, arguments[i]);
    return e;
  };

  U.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  // Inline markdown (teks sudah di-escape): **tebal**, *miring*, `kode`, [teks](http...)
  U.mdInline = function (teks) {
    var s = U.esc(teks);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, t, u) {
      return /^https?:/.test(u) ? '<a href="' + u + '" target="_blank" rel="noopener">' + t + '</a>' : t;
    });
    return s;
  };

  // Markdown blok mini: paragraf, daftar bernomor, daftar butir.
  U.md = function (teks) {
    var html = '', daftar = null, para = [];
    function tutupPara() { if (para.length) { html += '<p>' + U.mdInline(para.join(' ')) + '</p>'; para = []; } }
    function tutupDaftar() { if (daftar) { html += '</' + daftar + '>'; daftar = null; } }
    String(teks || '').split('\n').forEach(function (baris) {
      var no = /^\s*\d+\.\s+(.*)$/.exec(baris);
      var bt = /^\s*[-*]\s+(.*)$/.exec(baris);
      if (!baris.trim()) { tutupPara(); tutupDaftar(); return; }
      if (no || bt) {
        tutupPara();
        var jenis = no ? 'ol' : 'ul';
        if (daftar !== jenis) { tutupDaftar(); html += '<' + jenis + '>'; daftar = jenis; }
        html += '<li>' + U.mdInline((no || bt)[1]) + '</li>';
        return;
      }
      tutupDaftar();
      para.push(baris.trim());
    });
    tutupPara(); tutupDaftar();
    return html;
  };

  U.fmtWaktu = function (detik) {
    detik = Math.max(0, Math.round(detik));
    var m = Math.floor(detik / 60), s = detik % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  };

  U.tanggal = function (iso) {
    try {
      return new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    } catch (e) { return iso; }
  };

  // Penyimpanan lokal yang aman bila diblokir.
  U.simpan = {
    baca: function (kunci, awal) {
      try {
        var v = g.localStorage.getItem(kunci);
        return v == null ? awal : JSON.parse(v);
      } catch (e) { return awal; }
    },
    tulis: function (kunci, nilai) {
      try { g.localStorage.setItem(kunci, JSON.stringify(nilai)); return true; } catch (e) { return false; }
    },
    hapus: function (kunci) {
      try { g.localStorage.removeItem(kunci); } catch (e) { /* abaikan */ }
    }
  };

  U.unduh = function (nama, isi, mime) {
    var blob = new Blob([isi], { type: mime || 'application/octet-stream' });
    var url = URL.createObjectURL(blob);
    var a = U.el('a', { href: url, download: nama });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  };

  var timerToast = null;
  U.toast = function (pesan, jenis) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = pesan;
    t.className = 'toast tampil' + (jenis ? ' ' + jenis : '');
    clearTimeout(timerToast);
    timerToast = setTimeout(function () { t.className = 'toast'; }, 3200);
  };

  U.csv = function (baris) {
    return baris.map(function (r) {
      return r.map(function (c) { return '"' + String(c == null ? '' : c).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\r\n');
  };
})(window);
