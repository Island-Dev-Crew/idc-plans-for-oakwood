from pathlib import Path
import base64
import mimetypes
import re

root = Path(__file__).resolve().parent
source = root / "dist-portable" / "index.html"
html = source.read_text(encoding="utf-8")
asset_dir = root / "public" / "assets"
seen = {}

for path in sorted(asset_dir.iterdir()):
    if not path.is_file():
        continue
    token = f"./assets/{path.name}"
    count = html.count(token)
    if not count:
        continue
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    data = base64.b64encode(path.read_bytes()).decode("ascii")
    html = html.replace(token, f"data:{mime};base64,{data}")
    seen[path.name] = {"references": count, "base64_chars": len(data)}

remaining = sorted(set(re.findall(r"\./assets/[A-Za-z0-9_.-]+", html)))
if remaining:
    raise RuntimeError(f"Unembedded local assets remain: {remaining}")

out = root / "IDC_Oakwood_Compilation_Hub_Portable.html"
out.write_text(html, encoding="utf-8")
print(f"Wrote {out} ({out.stat().st_size:,} bytes); embedded {len(seen)} assets")
for name, info in sorted(seen.items()):
    print(f"  {name}: {info['references']} ref(s), {info['base64_chars']:,} base64 chars")
