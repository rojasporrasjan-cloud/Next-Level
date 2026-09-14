"""Build card-sized images. Full-size photos remain available in the viewer."""
from pathlib import Path
import re
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'public/media'
names = set(re.findall(r"name: '([^']+)'", (ROOT / 'app/project-gallery.tsx').read_text(encoding='utf-8')))
before = after = 0
for name in sorted(names):
    before += (MEDIA / f'{name}.avif').stat().st_size
    with Image.open(MEDIA / f'{name}.webp') as original:
        for width in (480, 800):
            image = original.convert('RGB')
            height = round(image.height * width / image.width)
            image = image.resize((width, height), Image.Resampling.LANCZOS)
            image.save(MEDIA / f'{name}-{width}.webp', quality=80, method=6)
            image.save(MEDIA / f'{name}-{width}.avif', quality=52, speed=6)
    after += (MEDIA / f'{name}-480.avif').stat().st_size
print(f'{len(names)} unique posters: original AVIF {before} bytes; 480px AVIF {after} bytes')
