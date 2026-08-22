from pathlib import Path
import base64
import mimetypes
import re

root = Path(__file__).resolve().parent
source = root / "dist-portable" / "index.html"
if not source.exists():
    raise FileNotFoundError("Portable build missing. Run `npm run build:portable` first.")
html = source.read_text(encoding="utf-8")
seen = {}

asset_roots = [
    (root / "public" / "assets", ("./assets/", "/assets/")),
    (root / "public" / "fonts", ("./fonts/", "/fonts/")),
]

for directory, prefixes in asset_roots:
    for path in sorted(directory.iterdir()):
        if not path.is_file():
            continue
        tokens = [f"{prefix}{path.name}" for prefix in prefixes]
        counts = {token: html.count(token) for token in tokens}
        count = sum(counts.values())
        if not count:
            continue
        mime = mimetypes.guess_type(path.name)[0]
        if path.suffix == ".woff2":
            mime = "font/woff2"
        mime = mime or "application/octet-stream"
        data = base64.b64encode(path.read_bytes()).decode("ascii")
        uri = f"data:{mime};base64,{data}"
        for token, token_count in counts.items():
            if token_count:
                html = html.replace(token, uri)
        seen[path.name] = {"references": count, "base64_chars": len(data)}

remaining = sorted(set(re.findall(r"(?:\./|/)(?:assets|fonts)/[A-Za-z0-9_.-]+", html)))
if remaining:
    raise RuntimeError(f"Unembedded local assets remain: {remaining}")
if "fonts.googleapis.com" in html or "fonts.gstatic.com" in html:
    raise RuntimeError("External Google Font dependency remains")

out = root / "IDC_Oakwood_Compilation_Hub_Portable.html"
out.write_text(html, encoding="utf-8")
print(f"Wrote {out} ({out.stat().st_size:,} bytes); embedded {len(seen)} assets")
for name, info in sorted(seen.items()):
    print(f"  {name}: {info['references']} ref(s), {info['base64_chars']:,} base64 chars")
