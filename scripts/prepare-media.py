"""Regenera todos los derivados de imagen que sirve el sitio.

    pip install Pillow imageio-ffmpeg
    python scripts/prepare-media.py

Fuentes (ninguna se despliega):
  - public/media/*.mp4        vídeos reales de obra; de ellos sale cada póster
  - media-src/*.png           visualizaciones IA en resolución original

Salidas (public/media, todas versionadas):
  - <video>-<segundo>.avif/.webp           pósters y fotos de las tarjetas
  - bright-garage-inspiration.avif/.webp   imagen del hero
  - og-image.jpg              1200x630 para Open Graph; JPEG porque varios
                              rastreadores sociales aún no leen AVIF/WebP

El script es idempotente: se puede volver a correr sin efectos secundarios.
"""
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'public' / 'media'
SOURCE = ROOT / 'media-src'

# Segundo del vídeo del que sale cada fotograma que referencia app/page.tsx.
# El nombre del archivo lleva ese segundo como sufijo.
FRAMES = {
    'flake-floor': (2, 12),          # 12 = póster + tarjeta 01, 2 = tarjeta 02
    'next-level-project': (12,),     # póster + tarjeta 03
    'surface-preparation': (12,),    # póster + tarjeta 04
}

HERO = 'bright-garage-inspiration'
OG_SIZE = (1200, 630)
# Mismo encuadre que `object-position: center 35%` en el hero de escritorio.
OG_FOCUS = 0.35

WEBP = {'quality': 82, 'method': 6}
AVIF = {'quality': 58, 'speed': 2}


def find_ffmpeg() -> str:
    """ffmpeg del sistema si existe; si no, el binario vendorizado en .tools."""
    system = shutil.which('ffmpeg')
    if system:
        return system
    sys.path.insert(0, str(ROOT / '.tools'))
    try:
        import imageio_ffmpeg
    except ImportError:
        sys.exit('Falta ffmpeg. Instalalo o ejecutá: pip install imageio-ffmpeg')
    return imageio_ffmpeg.get_ffmpeg_exe()


def encode(image: Image.Image, stem: str) -> None:
    """Escribe el par AVIF + WebP que consume cada <picture> de la página."""
    image.save(MEDIA / f'{stem}.webp', 'WEBP', **WEBP)
    image.save(MEDIA / f'{stem}.avif', 'AVIF', **AVIF)
    sizes = ' / '.join(
        f'{ext} {(MEDIA / f"{stem}.{ext}").stat().st_size / 1024:.0f}K'
        for ext in ('avif', 'webp')
    )
    print(f'  {stem}: {image.width}x{image.height}  {sizes}')


def build_frames(ffmpeg: str) -> None:
    print('Fotogramas extraídos de los vídeos:')
    with tempfile.TemporaryDirectory() as tmp:
        for stem, seconds in FRAMES.items():
            video = MEDIA / f'{stem}.mp4'
            if not video.exists():
                sys.exit(f'Falta el vídeo original: {video}')
            for second in seconds:
                frame = Path(tmp) / f'{stem}-{second}.png'
                subprocess.run(
                    [ffmpeg, '-hide_banner', '-loglevel', 'error', '-y',
                     '-ss', str(second), '-i', str(video),
                     '-frames:v', '1', str(frame)],
                    check=True,
                )
                with Image.open(frame) as image:
                    encode(image.convert('RGB'), f'{stem}-{second}')


def build_hero_and_og() -> None:
    source = SOURCE / f'{HERO}.png'
    if not source.exists():
        sys.exit(f'Falta la imagen original: {source}')

    print('Hero y Open Graph:')
    with Image.open(source) as raw:
        hero = raw.convert('RGB')
        encode(hero, HERO)

        crop_height = round(hero.width / (OG_SIZE[0] / OG_SIZE[1]))
        top = round((hero.height - crop_height) * OG_FOCUS)
        og = hero.crop((0, top, hero.width, top + crop_height)).resize(OG_SIZE, Image.LANCZOS)
        og.save(MEDIA / 'og-image.jpg', 'JPEG', quality=86, optimize=True, progressive=True)
        print(f'  og-image.jpg: {OG_SIZE[0]}x{OG_SIZE[1]}  '
              f'{(MEDIA / "og-image.jpg").stat().st_size / 1024:.0f}K')


if __name__ == '__main__':
    build_frames(find_ffmpeg())
    build_hero_and_og()
