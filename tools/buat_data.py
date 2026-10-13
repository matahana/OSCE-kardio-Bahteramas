#!/usr/bin/env python3
"""Hasilkan app/data/stasiun-data.js dari berkas markdown di stasiun/.

Sumber kebenaran checklist, instruksi kandidat, pertanyaan lanjutan, catatan, dan rujukan
tetap berkas markdown; aplikasi hanya membaca hasil generator ini.

Pakai (dari akar repo):
  python3 -I tools/buat_data.py          # tulis app/data/stasiun-data.js
  python3 -I tools/buat_data.py --cek    # kode keluar 1 bila berkas di disk tidak sinkron
"""
import json
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent
KELUARAN = AKAR / "app" / "data" / "stasiun-data.js"
ID_BUTIR = re.compile(r"^[A-Z]?\d+[a-z]?$")
JUDUL = re.compile(r"^# Stasiun (\d+) — (.+)$", re.M)
BAGIAN = re.compile(r"^## (\d+)\. (.+?)\n(.*?)(?=^## \d+\. |\Z)", re.M | re.S)


def sel_baris(baris):
    return [c.strip() for c in baris.strip().strip("|").split("|")]


def baca_meta(teks):
    kepala = teks.split("\n## ", 1)[0]
    meta = {}
    for baris in kepala.splitlines():
        if not baris.startswith("|"):
            continue
        sel = sel_baris(baris)
        if len(sel) == 2 and sel[0] not in ("Item",) and not set(sel[0]) <= set("-: "):
            meta[sel[0]] = sel[1]
    return meta


def baca_checklist(isi):
    butir, grup, grup_sekarang = [], {}, None
    for baris in isi.splitlines():
        if not baris.startswith("|"):
            continue
        sel = sel_baris(baris)
        if len(sel) < 4:
            continue
        nama = sel[0].strip("*")
        if sel[0].startswith("**") and re.fullmatch(r"[A-Z]", nama):
            grup_sekarang = nama
            grup[nama] = re.sub(r"\s*\(\d+\)\s*$", "", sel[1].strip("*")).strip()
            continue
        if ID_BUTIR.match(sel[0]) and sel[-2].isdigit() and "☐" in sel[-1]:
            teks = sel[1]
            kritis = teks.startswith("⚠")
            teks = teks.lstrip("⚠").strip()
            butir.append({
                "id": sel[0],
                "grup": grup_sekarang,
                "teks": teks,
                "skor": int(sel[-2]),
                "kritis": kritis,
            })
    return butir, grup


def baca_stasiun(berkas):
    teks = berkas.read_text(encoding="utf-8")
    m = JUDUL.search(teks)
    if not m:
        raise ValueError(f"{berkas.name}: judul '# Stasiun NN — ...' tidak ditemukan")
    bagian = {int(n): (j.strip(), isi.strip()) for n, j, isi in BAGIAN.findall(teks)}
    for wajib in (1, 5, 7, 8, 9):
        if wajib not in bagian:
            raise ValueError(f"{berkas.name}: bagian '## {wajib}.' tidak ditemukan")
    meta = baca_meta(teks)
    checklist, grup = baca_checklist(bagian[5][1])
    durasi = int(re.search(r"\d+", meta["Durasi"]).group())
    skor_maks = int(meta["Skor maksimum"])
    return {
        "id": m.group(1),
        "judul": m.group(2).strip(),
        "berkas": f"stasiun/{berkas.name}",
        "meta": meta,
        "durasiMenit": durasi,
        "skorMaks": skor_maks,
        "instruksiKandidat": bagian[1][1],
        "pertanyaanLanjutan": bagian[7][1],
        "catatan": bagian[8][1],
        "rujukan": bagian[9][1],
        "grup": grup,
        "checklist": checklist,
    }


def bangun():
    stasiun, urutan = {}, []
    for berkas in sorted((AKAR / "stasiun").glob("[0-9][0-9]-*.md")):
        data = baca_stasiun(berkas)
        jumlah = sum(b["skor"] for b in data["checklist"])
        if jumlah != data["skorMaks"]:
            raise ValueError(f"{berkas.name}: jumlah checklist {jumlah} != skor maksimum {data['skorMaks']}")
        stasiun[data["id"]] = data
        urutan.append(data["id"])
    isi = json.dumps({"urutan": urutan, "stasiun": stasiun}, ensure_ascii=False, indent=1)
    return (
        "/* BERKAS HASIL GENERATOR — jangan disunting tangan.\n"
        "   Sumber: stasiun/*.md. Perbarui dengan: python3 -I tools/buat_data.py */\n"
        f"window.OSCE_DATA = {isi};\n"
    )


def main():
    try:
        hasil = bangun()
    except ValueError as galat:
        print(f"GAGAL: {galat}")
        return 1
    if "--cek" in sys.argv[1:]:
        ada = KELUARAN.read_text(encoding="utf-8") if KELUARAN.exists() else None
        if ada != hasil:
            print("app/data/stasiun-data.js tidak sinkron dengan stasiun/*.md; jalankan tools/buat_data.py")
            return 1
        print("app/data/stasiun-data.js sinkron dengan stasiun/*.md")
        return 0
    KELUARAN.parent.mkdir(parents=True, exist_ok=True)
    KELUARAN.write_text(hasil, encoding="utf-8")
    print(f"Ditulis: {KELUARAN.relative_to(AKAR)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
