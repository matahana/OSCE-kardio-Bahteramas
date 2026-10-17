#!/usr/bin/env python3
"""Membuat app/data/ucapan.js dari tests/ucapan/ucapan_NN.json.

Kelima parafrase per aksi (dan per keluarga) dimuat aplikasi sebagai contoh untuk resolver offline. Kalimat
negatif, majemuk, dan isian TIDAK dimuat; itu dipakai tools/cek_resolver.mjs, yang mengukur akurasi dengan
leave-one-out (tiap parafrase diuji pada indeks yang dibangun tanpa parafrase itu).

  python3 -I tools/buat_ucapan.py          # menulis app/data/ucapan.js
  python3 -I tools/buat_ucapan.py --cek    # gagal bila berkas hasil tidak sinkron
"""
import json
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent
SUMBER = AKAR / "tests" / "ucapan"
TUJUAN = AKAR / "app" / "data" / "ucapan.js"
LATIH = 5


def bangun() -> str:
    data = {}
    for berkas in sorted(SUMBER.glob("ucapan_*.json")):
        d = json.loads(berkas.read_text(encoding="utf-8"))
        nomor = d["stasiun"]
        aksi = {i: [u.strip() for u in us[:LATIH]] for i, us in d.get("aksi", {}).items()}
        keluarga = [{"ids": k["ids"], "ucapan": [u.strip() for u in k["ucapan"][:LATIH]]} for k in d.get("keluarga", [])]
        data[nomor] = {"aksi": aksi, "keluarga": keluarga}
    isi = json.dumps(data, ensure_ascii=False, indent=1, sort_keys=True)
    return (
        "/* HASIL GENERATOR: jangan disunting tangan. Dibuat oleh tools/buat_ucapan.py dari tests/ucapan/*.json.\n"
        "   Contoh (5 parafrase per aksi) untuk resolver ucapan offline (app/js/resolver.js). */\n"
        "(function (g) {\n  'use strict';\n  var OSCE = (g.OSCE = g.OSCE || {});\n  OSCE.ucapan = " + isi + ";\n"
        "})(typeof window !== 'undefined' ? window : globalThis);\n"
    )


def main() -> int:
    if not SUMBER.exists():
        print("tests/ucapan tidak ada; dilewati.")
        return 0
    hasil = bangun()
    if "--cek" in sys.argv:
        ada = TUJUAN.read_text(encoding="utf-8") if TUJUAN.exists() else ""
        if ada != hasil:
            print("app/data/ucapan.js tidak sinkron dengan tests/ucapan; jalankan: python3 -I tools/buat_ucapan.py")
            return 1
        print("app/data/ucapan.js sinkron dengan tests/ucapan")
        return 0
    TUJUAN.write_text(hasil, encoding="utf-8")
    print(f"Ditulis: {TUJUAN.relative_to(AKAR)} ({len(hasil)//1024} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
