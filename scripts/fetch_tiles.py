"""Download local map tiles for central Marrakech so the demo works fully offline."""
import math
import os
import time
import urllib.request

# Area covering Medina / Gueliz / Hivernage / Menara edges of Marrakech.
# z13 gets a wider box so zooming out to z13 stays fully tiled on a 1440px screen.
BOUNDS_BY_Z = {
    13: (31.565, 31.695, -8.085, -7.845),
    14: (31.598, 31.658, -8.06, -7.905),
    15: (31.613, 31.643, -8.012, -7.958),
    16: (31.603, 31.657, -8.039, -7.927),
}
ZMIN, ZMAX = 13, 16

SOURCES = [
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
    "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
]

OUTDIR = os.path.join(os.path.dirname(__file__), "..", "public", "tiles")
UA = {"User-Agent": "MadinatiWorkshopDemo/1.0 (local workshop prototype)"}


def ll2tile(lat, lng, z):
    n = 2 ** z
    x = (lng + 180.0) / 360.0 * n
    latr = math.radians(lat)
    y = (1.0 - math.log(math.tan(latr) + 1 / math.cos(latr)) / math.pi) / 2.0 * n
    return x, y


def main():
    count = 0
    missing = []
    for z in range(ZMIN, ZMAX + 1):
        S, N, W, E = BOUNDS_BY_Z[z]
        x0f, y0f = ll2tile(N, W, z)
        x1f, y1f = ll2tile(S, E, z)
        x0, x1 = int(math.floor(x0f)), int(math.floor(x1f))
        y0, y1 = int(math.floor(y0f)), int(math.floor(y1f))
        print(f"z={z}: tiles x {x0}..{x1}, y {y0}..{y1}")
        for x in range(x0, x1 + 1):
            for y in range(y0, y1 + 1):
                path = os.path.join(OUTDIR, str(z), str(x), f"{y}.png")
                if os.path.exists(path) and os.path.getsize(path) > 3000:
                    continue  # ignore les petites tuiles "erreur" déjà téléchargées
                ok = False
                for src in SOURCES:
                    url = src.format(z=z, x=x, y=y)
                    try:
                        req = urllib.request.Request(url, headers=UA)
                        data = urllib.request.urlopen(req, timeout=25).read()
                        if len(data) > 3000 and data[:8] == b"\x89PNG\r\n\x1a\n":
                            os.makedirs(os.path.dirname(path), exist_ok=True)
                            with open(path, "wb") as f:
                                f.write(data)
                            ok = True
                            count += 1
                            break
                    except Exception as e:
                        print("  fail", url, repr(e)[:80])
                if not ok:
                    missing.append((z, x, y))
                time.sleep(0.15)
    print("downloaded:", count)
    print("missing:", missing)


if __name__ == "__main__":
    main()
