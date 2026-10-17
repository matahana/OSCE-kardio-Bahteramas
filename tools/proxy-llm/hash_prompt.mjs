#!/usr/bin/env node
// Mencetak hash SHA-256 prompt sistem tiap stasiun, untuk variabel SISTEM_SHA256 pada proxy (worker.mjs).
// Jalankan ulang dan perbarui variabel itu setiap isi stasiun, aksi, atau bidang formulir berubah:
//   node tools/proxy-llm/hash_prompt.mjs            # satu baris dipisah koma (tempel ke SISTEM_SHA256)
//   node tools/proxy-llm/hash_prompt.mjs --daftar   # per stasiun
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const akar = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const g = { console };
g.window = g; g.globalThis = g;
vm.createContext(g);
const muat = (f) => vm.runInContext(fs.readFileSync(path.join(akar, 'app', f), 'utf8'), g, { filename: f });
muat('data/stasiun-data.js'); muat('js/engine.js'); muat('js/logika.js');
for (let i = 1; i <= 14; i++) muat('data/interaksi/' + String(i).padStart(2, '0') + '.js');
muat('js/resolver.js'); muat('js/llm.js');
const OSCE = g.OSCE;
const hasil = OSCE.daftarStasiun().filter((st) => st.interaksi).map((st) => [st.id, crypto.createHash('sha256').update(OSCE.llm.sistemUntuk(st)).digest('hex')]);
if (process.argv.includes('--daftar')) console.log(hasil.map(([id, h]) => `${id} ${h}`).join('\n'));
else console.log(hasil.map(([, h]) => h).join(','));
