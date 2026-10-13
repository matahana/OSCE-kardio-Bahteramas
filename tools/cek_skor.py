#!/usr/bin/env python3
"""Periksa bahwa jumlah skor checklist tiap stasiun sama dengan skor maksimum yang tertulis.

Pakai (dari akar repo):  python3 -I tools/cek_skor.py
Keluar dengan kode 1 bila ada ketidakcocokan atau berkas stasiun tidak dapat diurai.
"""
import re
import sys
from pathlib import Path

ID_BUTIR = re.compile(r"^[A-Z]?\d+[a-z]?$")


def hitung_checklist(teks):
    """Jumlahkan kolom skor pada baris tabel di bagian '## 5. Lembar penilaian'."""
    bagian = teks.split("## 5. Lembar penilaian", 1)[1].split("\n## 6.", 1)[0]
    total = 0
    for baris in bagian.splitlines():
        if not baris.startswith("|"):
            continue
        sel = [c.strip() for c in baris.strip().strip("|").split("|")]
        if len(sel) >= 4 and ID_BUTIR.match(sel[0]) and sel[-2].isdigit() and "☐" in sel[-1]:
            total += int(sel[-2])
    return total


def main():
    akar = Path(__file__).resolve().parent.parent
    berkas = sorted((akar / "stasiun").glob("*.md"))
    if not berkas:
        print("Tidak ada berkas stasiun ditemukan.")
        return 1
    gagal = False
    jumlah_semua = 0
    for f in berkas:
        teks = f.read_text(encoding="utf-8")
        m_maks = re.search(r"Skor maksimum \| (\d+)", teks)
        m_kaki = re.search(r"Skor checklist: ____ / (\d+)", teks)
        try:
            dihitung = hitung_checklist(teks)
        except IndexError:
            print(f"{f.name}: bagian '## 5. Lembar penilaian' tidak ditemukan  GAGAL")
            gagal = True
            continue
        if not (m_maks and m_kaki):
            print(f"{f.name}: baris 'Skor maksimum' atau 'Skor checklist' tidak ditemukan  GAGAL")
            gagal = True
            continue
        maks, kaki = int(m_maks.group(1)), int(m_kaki.group(1))
        ok = dihitung == maks == kaki
        gagal = gagal or not ok
        jumlah_semua += dihitung
        print(f"{f.name}: dihitung {dihitung}, maksimum {maks}, kaki {kaki}  {'OK' if ok else 'TIDAK COCOK'}")
    print(f"Total skor semua stasiun: {jumlah_semua}")
    return 1 if gagal else 0


if __name__ == "__main__":
    sys.exit(main())
