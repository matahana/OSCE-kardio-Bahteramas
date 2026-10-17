# Aplikasi simulasi OSCE

Aplikasi web statis (HTML, CSS, JavaScript klasik; tanpa build dan tanpa server) untuk melatih stasiun OSCE di folder `stasiun/` dan sebagai lembar penilaian digital penguji. **Status: DRAF v0.1**, alat belajar, bukan penilaian resmi.

## Menjalankan

| Cara | Langkah |
|------|---------|
| Lokal, tanpa server | Buka `app/index.html` di peramban (berfungsi dari `file://`) |
| Server lokal | `python3 -m http.server` di akar repo, buka `http://localhost:8000/app/` |
| GitHub Pages | Hanya pemilik repo yang dapat mengaktifkan: https://github.com/matahana/OSCE-kardio-Bahteramas/settings/pages → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)` → Save. Situs: https://matahana.github.io/OSCE-kardio-Bahteramas/ (mengalihkan ke `app/`). `.nojekyll` sudah ada. Halaman memuat `<meta name="robots" content="noindex, nofollow">` agar tidak masuk mesin pencari sebelum konten direview; hapus meta itu di `app/index.html` dan `index.html` bila sudah siap. |

Secara bawaan seluruh proses berjalan di peramban dan tidak ada data yang dikirim ke server. **Dua fitur opsional pada mode tes memakai internet:** LLM (teks ucapan dan daftar tindakan stasiun dikirim ke Anthropic, langsung atau lewat proxy) dan mikrofon (audio diproses pengenalan ucapan bawaan peramban; di Chrome/Edge oleh server Google/Microsoft). Keduanya mati sampai pengguna mengaktifkan dan menyetujui. Kunci API hanya di `sessionStorage` tab. Riwayat disimpan di penyimpanan lokal peramban.

## Fitur

- **Latihan mandiri** untuk seluruh 14 stasiun (stasiun baru yang belum punya definisi interaksi tetap tampil di beranda sebagai "Segera hadir"): bank pertanyaan/tindakan dengan respons pasien simulasi, form jawaban terstruktur, dan widget interaktif.
- **Mode tes** (tanpa menu): peserta mengetik atau berbicara, jawaban hanya muncul bila ditanya; pemahaman ucapan lewat LLM (opsional) atau pencocokan kata offline; suara pasien dan mikrofon opsional. Lihat bagian "Mode tes" di bawah.
- **Jam simulasi**: tiap tindakan memakan detik simulasi (tertera di tombol); stasiun berakhir saat jam habis. Waktu nyata tidak dihitung, sehingga hasil deterministik dan "klik semua" tidak berhasil. Pertanyaan wajar tetapi tidak menentukan skor sengaja ada agar kandidat harus memprioritaskan.
- **Penilaian otomatis** per butir checklist, termasuk skor sebagian, butir kritis ⚠, tindakan tidak tepat (berisiko waktu) dan tindakan berisiko (menggagalkan perkiraan global).
- **Hasil**: checklist, tindakan tidak tepat/berisiko, pertanyaan lanjutan, contoh urutan ideal, catatan pembuat soal, rujukan, rekam tindakan, ekspor JSON, cetak.
- **Mode penguji**: lembar penilaian digital dengan penghitung waktu, skor langsung, penilaian global 1–4, catatan, ekspor JSON, cetak.
- **Riwayat** lokal dengan ekspor JSON/CSV.
- Mode gelap otomatis, responsif sampai lebar ponsel, kontrol dapat diakses keyboard.

### Mode tes (tanpa menu)

Latihan menampilkan daftar tindakan; **tes** tidak. Peserta mengetik atau berbicara, dan pasien/tim menjawab **hanya yang
ditanyakan**; yang tidak ditanyakan tidak muncul di mana pun. Tombol "Mulai tes" ada di tiap kartu stasiun.

| Aspek | Perilaku di tes |
|-------|-----------------|
| Input | Kotak ketik dan (opsional) mikrofon; Enter mengirim. Kalimat majemuk menjalankan beberapa aksi |
| Pemahaman | LLM (Claude Haiku 5.5) bila dikonfigurasi, dengan resolver offline sebagai cadangan; keduanya hanya memetakan ke aksi/isian milik stasiun |
| Jawaban | Selalu dari skrip stasiun (`respons`), tidak dikarang model; dibacakan suara bila diaktifkan |
| Waktu | Jam simulasi seperti latihan. Ucapan tak dipahami, aksi yang belum bisa dilakukan, dan pengulangan memakan 3 dtk |
| Penolakan | Netral ("Belum bisa dilakukan saat ini"), tanpa membocorkan syarat urutan |
| Jawaban terstruktur | Dengan LLM: diucapkan bebas, diekstrak ke bidang form (`sesi.tambahJawaban`; biaya form dikenakan sekali pada penyebutan pertama). Tanpa LLM: formulir pilihan sebagai cadangan (pilihannya terlihat) |
| Alat | Widget (steteskop, tensimeter, uji ritme) dan EKG tetap; bantuan teks bunyi dinonaktifkan |
| Umpan balik | Tidak ada sampai selesai; hasil menampilkan checklist dan **transkrip** (ucapan, dipahami sebagai apa, sumber), tanpa contoh urutan ideal dan catatan pembuat soal |

**Jalur LLM** (Pengaturan): *Kunci API saya* (peramban memanggil `api.anthropic.com`; kunci hanya di `sessionStorage` tab)
atau *Proxy lembaga* ([tools/proxy-llm/README.md](../tools/proxy-llm/README.md); kunci di server, peserta memakai kode akses).
Permintaan: `claude-haiku-5-5`, `output_config.effort: "low"`, keluaran JSON terstruktur, prompt sistem per stasiun
(kamus aksi + bidang form) dengan `cache_control`. Keluaran divalidasi: id harus ada di stasiun, maksimum 4 aksi,
opsi form harus salah satu opsi, angka dalam rentang; ucapan yang berusaha mengarahkan model dikosongkan. Kegagalan
(jaringan, kuota, format, penolakan) memakai resolver offline dan dicatat di transkrip.

**Suara:** pengenalan ucapan memakai `SpeechRecognition` peramban (`id-ID`); di Chrome/Edge audio diproses server
Google/Microsoft dan butuh internet, Firefox tidak mendukung. Suara pasien memakai `speechSynthesis` (suara terpasang di
perangkat). "Percakapan suara" menyalakan mikrofon lagi otomatis setelah jawaban dibacakan, dan berhenti setelah dua
kali senyap. Briefing tes meminta persetujuan privasi bila LLM atau mikrofon dipakai.

**Akurasi resolver offline** (`node tools/cek_resolver.mjs`, leave-one-out pada 2.309 kalimat yang ditulis LLM):
48% dipahami dengan benar, 13,5% salah pilih, 38% tidak dipahami; kalimat majemuk recall 89% dan presisi 96,5%;
89% kalimat di luar bank ditolak; ekstraksi isian offline presisi 83%, recall 47%. Ini batas pencocok kata; kalimat
yang berjauhan dari kata-kata bank sering tidak dipahami. **Akurasi pada kandidat sungguhan belum diukur**, dan
akurasi LLM belum diukur (tidak ada kunci API di sesi pengembangan): jalankan `tools/cek_llm.mjs` dengan kunci Anda untuk
mengukurnya pada data yang sama. Gunakan LLM untuk tes yang sebenarnya, dan biarkan penguji meninjau transkrip.

**Batas keamanan ujian:** aplikasi statis; seluruh skrip stasiun (jawaban pasien, kunci skor) terunduh di peramban dan
dapat dibaca lewat alat pengembang. Cukup untuk ujian formatif/latihan terawasi, **tidak** untuk ujian berisiko tinggi
tanpa pengawasan. Menyembunyikan skrip menuntut resolver dan skor berjalan di server.

### Widget

| Widget | Stasiun | Isi |
|--------|---------|-----|
| EKG 12 sadapan sintetis | 02, 08, 14 | Dibangkitkan dari parameter per sadapan (25 mm/dtk, 10 mm/mV); tombol layar penuh. Irama `sinus` (default), `fa` (R–R ireguler tanpa P; 08) dan `blok_av3` (P teratur + QRS pelarian lebar teratur; 14) dibangkitkan deterministik oleh `OSCE.logika.irama` |
| Steteskop | 03, 11 | Bunyi jantung disintesis (Web Audio); titik auskultasi (stasiun 11 menambah aksila), diafragma/bell, bantuan teks. Stasiun 11: irama tidak teratur, aksentuasi P2, opening snap, dan rumble diastolik apeks yang hanya terdengar dengan bell + miring kiri + tahan ekspirasi (`profil.diastolik.syarat`) |
| Tensimeter aneroid + Korotkoff | 04 | Pompa, katup, nadi radialis, bunyi Korotkoff; ukuran manset memengaruhi pembacaan |
| Uji ritme kompresi | 05 | Ketukan 15 detik; laju dari median selang; metronom untuk latihan |

EKG dan bunyi bersifat sintetis (ilustrasi). Aplikasi tidak dapat menilai teknik fisik (kedalaman kompresi nyata, penempatan stetoskop); itu tetap perlu dilatih dengan manikin dan pasien simulasi.

## Arsitektur

```
stasiun/NN-*.md  ──tools/buat_data.py──▶  app/data/stasiun-data.js   (checklist, instruksi, pembahasan; HASIL GENERATOR)
                                          app/data/interaksi/NN.js    (bank aksi, form, widget, pemetaan skor; ditulis tangan)
app/js/engine.js    sesi, jam simulasi, log, penilaian (tanpa DOM; diuji di Node)
app/js/logika.js    logika murni widget (penilaian tensimeter, ritme ketukan)
app/js/util.js      pembuat elemen, markdown mini, penyimpanan lokal, unduhan
app/js/widgets/*.js ekg, steteskop, tensimeter, ketuk
app/js/ui.js        beranda, briefing, ruang (latihan), hasil, penguji, riwayat, tentang
app/js/ujian.js     mode tes: briefing, ruang percakapan, transkrip hasil, halaman Pengaturan
app/js/resolver.js  ucapan bebas → aksi/isian, OFFLINE (leksikon, IDF); tanpa DOM, diuji di Node
app/js/llm.js       ucapan bebas → aksi/isian lewat Claude (opsional, internet); validasi ketat, cadangan offline
app/js/suara.js     mikrofon (pengenalan ucapan) dan suara pasien (Web Speech API)
app/js/main.js      router hash (#/...)
app/data/ucapan.js  HASIL GENERATOR: parafrase ucapan per aksi untuk resolver (dari tests/ucapan/*.json)
tools/proxy-llm/    proxy LLM opsional (Cloudflare Workers) agar kunci API tidak di peramban
```

Prinsip: **checklist hanya ada di markdown stasiun.** Generator membacanya (id, grup, teks, skor, butir kritis); aplikasi tidak menyimpan salinan sendiri, sehingga dokumen dan aplikasi tidak dapat menyimpang. Berkas hasil generator tetap di-commit agar aplikasi jalan tanpa build; CI memeriksa kesinkronannya.

## Menambah atau mengubah stasiun

1. Tulis/ubah `stasiun/NN-judul.md` mengikuti [templates/stasiun-template.md](../templates/stasiun-template.md).
2. Jalankan `python3 -I tools/buat_data.py` (hasilnya di-commit).
3. Tulis `app/data/interaksi/NN.js` dan tambahkan `<script defer src="data/interaksi/NN.js">` di `app/index.html` (setelah `logika.js`).
4. Jalankan pemeriksaan di bawah sampai lulus.

### Definisi interaksi (`OSCE.daftar(id, definisi)`)

| Kunci | Fungsi |
|-------|--------|
| `pasien`, `tandaVital`, `petunjuk` | Kartu pasien dan tanda vital awal |
| `waktu` | Detik jam simulasi (480 untuk 8 menit) |
| `panel` | Tab: `aksi` (daftar tombol bergrup), `form` (jawaban terstruktur, `biaya`), `widget` (`widget` + `opsi`) |
| `widgetUtama` | Widget yang selalu tampil (mis. EKG pada stasiun 02, 08, 14) |
| `jadwal` | Peristiwa terpicu waktu: `{pada, id, pesan}` (mis. tim ACLS tiba pada 360 dtk) |
| `acara` | Daftar id peristiwa yang boleh dipancarkan widget |
| `skor` | Fungsi skor per id butir checklist |
| `ideal` | Rencana ideal (aksi, `{form, jawab}`, `{acara, nilai, info}`); dipakai uji dan halaman hasil |

Aksi dibuat dengan `A(id, label, respons, biaya, opsi)`; `opsi` dapat berisi `tidakTepat` (alasan), `berisiko` (alasan), `syarat(ctx)` (mengembalikan pesan penolakan atau `null`), `eksklusif` (kunci pilihan saling meniadakan), `sekali: false`, `efek(ctx)`.

Skor: `h.any(ids)`, `h.all(ids)`, `h.count(ids, [[minimal, poin], ...])` untuk skor sebagian, dan `h.kustom(fn, refs)` untuk aturan khusus; `ctx` menyediakan `sudah`, `jumlah`, `jawab`, `hitung`, `nilai`, `waktuAksi`, `terpakai`, `sisa`.

Opsi form dapat membawa bendera pada elemen ketiga: `['nitrat', 'Nitrat …', {tidakTepat: '…'}]` atau `{berisiko: '…'}`.

## Pemeriksaan

Stasiun yang belum punya `app/data/interaksi/NN.js` dilaporkan **"segera hadir"** (sama seperti beranda) dan tidak menggagalkan pemeriksaan; stasiun yang punya interaksi diperiksa penuh.

```bash
python3 -I tools/cek_skor.py              # jumlah skor checklist tiap stasiun
python3 -I tools/buat_data.py --cek       # berkas hasil generator sinkron dengan markdown
node tools/cek_interaksi.mjs              # interaksi konsisten dengan checklist; rencana ideal 100%; "klik semua" tidak 100% tanpa catatan
node tools/cek_interaksi.mjs --ketat      # sama, tetapi stasiun tanpa interaksi juga dianggap gagal (pakai bila semua stasiun harus lengkap)
PLAYWRIGHT_DIR=/jalur/node_modules/playwright node tests/e2e.mjs [--shots=folder]   # uji di Chromium dari file://
PLAYWRIGHT_DIR=/jalur/node_modules/playwright node tests/e2e_tes.mjs [--shots=folder] # uji mode tes (suara dan API tiruan)
python3 -I tools/buat_ucapan.py [--cek]   # app/data/ucapan.js dari tests/ucapan/*.json
node tools/cek_resolver.mjs [--rinci]     # akurasi resolver offline (leave-one-out), gagal bila di bawah ambang
node tools/uji_llm.mjs                    # modul LLM dan proxy dengan server Anthropic tiruan (tanpa kunci/jaringan)
ANTHROPIC_API_KEY=... node tools/cek_llm.mjs --n=120   # akurasi LLM SUNGGUHAN pada data ucapan (pemilik; berbiaya kecil; --simulasi untuk uji kabel)
```

`tests/e2e.mjs` menjalankan tiap stasiun lewat antarmuka sesuai rencana ideal (harus 100%), kontrol negatif (manset kecil, deflasi terlalu cepat, ritme ketukan terlalu cepat tidak boleh mendapat poin), tindakan berisiko, jalur waktu habis, mode penguji, dan riwayat. Jam peramban dibekukan dan dimajukan manual agar widget berbasis waktu deterministik. CI (`.github/workflows/cek.yml`) menjalankan semua pemeriksaan non-browser (termasuk `buat_ucapan.py --cek`, `cek_resolver.mjs`, `uji_llm.mjs`); uji Chromium (`e2e.mjs`, `e2e_tes.mjs`) dijalankan lokal.

## Keterbatasan dan catatan mutu

- Seluruh konten **DRAF**: belum direview kardiolog; angka klinis belum diverifikasi ke teks lengkap (lihat `wiki/guidelines-status.md`).
- Pasien simulasi menjawab dari bank respons tetap; pertanyaan di luar bank tidak dijawab. Pada mode tes, ketepatan pemetaan ucapan bebas ke bank belum diukur pada kandidat sungguhan (lihat "Akurasi resolver offline" di atas); data parafrase ditulis LLM, bukan kandidat.
- Mode tes bukan ujian aman: skrip stasiun terunduh di peramban. Transkrip dan penilaian otomatis perlu ditinjau penguji.
- Perkiraan penilaian global memakai aturan sederhana (persentase 55/70/85, butir kritis, tindakan berisiko, waktu habis); batas lulus resmi ditetapkan tim ujian.
- Toleransi widget: tensimeter ±4 mmHg untuk nilai, laju deflasi 1,5–4 mmHg/dtk (target 2–3), jarak inflasi 15–40 mmHg di atas estimasi palpatoir (target 20–30); ritme ketukan 100–120/menit.
- Belum diuji dengan pembaca layar secara menyeluruh dan belum ada uji coba dengan pengguna sebenarnya.
