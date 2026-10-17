# Proxy LLM untuk Simulator OSCE (opsional)

Proxy ini dipakai bila peserta ujian **tidak boleh** memegang kunci API: kunci Anthropic tersimpan di server,
peserta hanya memasukkan *kode akses* ujian di halaman Pengaturan aplikasi (jalur "Proxy lembaga"). Tanpa proxy,
pemilik/penguji dapat memakai jalur "Kunci API saya" pada perangkat sendiri.

**Status:** `worker.mjs` diuji dengan `fetch` tiruan (`node tools/uji_llm.mjs`), **belum diuji pada Cloudflare
sungguhan** dan belum pernah memanggil API Anthropic dari sesi pengembangan (tidak ada kunci). Uji dengan satu
permintaan nyata sebelum dipakai ujian.

## Yang dilakukan proxy

- Hanya menerima `POST` dari `Origin` yang terdaftar dan dengan header `x-kode-akses` yang benar.
- Hanya meneruskan model `claude-haiku-5-5`; menolak `stream`, `tools`, `mcp_servers`, `container`.
- Membatasi `max_tokens` (1500) dan ukuran badan (80 KB); memasang kunci API dari variabel lingkungan.
- Menambahkan header CORS hanya untuk `Origin` yang diizinkan.

Yang **tidak** dilakukan: pembatasan laju. Pasang *Rate limiting rules* Cloudflare (mis. per IP) dan pantau pemakaian
di Console Anthropic; kode akses yang bocor dapat dipakai siapa pun sampai Anda menggantinya.

## Memasang di Cloudflare Workers

```bash
# di folder tools/proxy-llm/
cat > wrangler.toml <<'T'
name = "osce-llm-proxy"
main = "worker.mjs"
compatibility_date = "2026-10-01"

[vars]
ASAL_DIIZINKAN = "https://matahana.github.io"
T
npx wrangler secret put ANTHROPIC_API_KEY   # tempel kunci API lembaga
npx wrangler secret put KODE_AKSES          # kode untuk hari ujian; ganti setelah ujian
npx wrangler deploy
```

Lalu di aplikasi: **Pengaturan → Proxy lembaga**, isi URL Worker (mis. `https://osce-llm-proxy.<akun>.workers.dev`)
dan kode akses, tekan **Uji koneksi**. Untuk uji lokal dari `http://localhost:8000`, tambahkan origin itu ke
`ASAL_DIIZINKAN` (dipisah koma).

## Privasi dan biaya

- Isi permintaan: ucapan peserta, daftar tindakan stasiun, dan beberapa ucapan sebelumnya. Kasus fiktif; peserta
  diminta tidak menyebut data pasien nyata.
- Model `claude-haiku-5-5` dengan prompt sistem yang di-*cache*; per ucapan kira-kira 2–3 ribu token masukan
  (sebagian besar dari cache setelah ucapan pertama). Hitung ulang dengan harga terbaru sebelum ujian besar.
