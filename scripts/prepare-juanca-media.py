"""Optimize Juanca's September 8 originals without altering the project imagery."""
from pathlib import Path
import subprocess
from PIL import Image, ImageOps, ImageDraw
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'media-src'
OUTPUT = ROOT / 'public/media'
REVIEW = ROOT / 'work/media-review'
sys.path.insert(0, str(ROOT / '.tools'))
import imageio_ffmpeg
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

VIDEOS = {
    'residential-walkthrough': 'residential-walkthrough-original.mp4',
    'interior-finish': 'interior-finish-original.mp4',
    'hall-preparation': 'WhatsApp Video 2026-09-08 at 6.51.35 AM.mp4',
    'hall-finished': 'WhatsApp Video 2026-09-08 at 6.52.41 AM.mp4',
    'porch-walkthrough': 'WhatsApp Video 2026-09-08 at 7.01.50 AM.mp4',
    'concrete-overlay': 'WhatsApp Video 2026-09-08 at 7.13.22 AM.mp4',
}
PHOTOS = {
    'hall-before': 'hall-before.jpeg',
    'hall-during': 'WhatsApp Image 2026-09-08 at 6.50.32 AM.jpeg',
    'porch-finish': 'porch-finish.jpeg',
    'porch-detail': 'WhatsApp Image 2026-09-08 at 7.01.50 AM.jpeg',
}

def encode(image, stem):
    image = ImageOps.exif_transpose(image).convert('RGB')
    image.thumbnail((1400, 1400))
    image.save(OUTPUT / f'{stem}.webp', quality=82, method=6)
    image.save(OUTPUT / f'{stem}.avif', quality=58, speed=4)

def review():
    REVIEW.mkdir(parents=True, exist_ok=True)
    for stem, original in VIDEOS.items():
        seconds = (5, 12, 20) if stem == 'concrete-overlay' else (10, 25, 40)
        sheet = Image.new('RGB', (720, 470), 'white')
        for index, second in enumerate(seconds):
            frame = REVIEW / f'{stem}-{second}.png'
            subprocess.run([FFMPEG, '-loglevel', 'error', '-y', '-ss', str(second),
                            '-i', str(SOURCE / original), '-frames:v', '1', str(frame)], check=True)
            with Image.open(frame) as image:
                image.thumbnail((230, 420))
                sheet.paste(image, (index * 240, 25))
            ImageDraw.Draw(sheet).text((index * 240 + 8, 5), f'{stem} / {second}s', fill='black')
        sheet.save(REVIEW / f'{stem}.jpg')

def build():
    if not (REVIEW / 'concrete-overlay-20.png').exists():
        review()
    for stem, original in PHOTOS.items():
        with Image.open(SOURCE / original) as image:
            encode(image, stem)
    # Trim only the white document margins; the supplied mark stays unchanged.
    with Image.open(SOURCE / 'next-level-logo-original.jpeg') as image:
        logo = image.crop((160, 375, 1440, 1230))
        logo.thumbnail((640, 428))
        logo.save(OUTPUT / 'next-level-logo.webp', lossless=True)
    for stem, original in VIDEOS.items():
        destination = OUTPUT / f'{stem}.mp4'
        if not destination.exists() or destination.stat().st_size > (SOURCE / original).stat().st_size * 1.05:
            subprocess.run([FFMPEG, '-loglevel', 'error', '-y', '-i', str(SOURCE / original),
                            '-map_metadata', '-1', '-c', 'copy',
                            '-movflags', '+faststart', str(destination)], check=True)
        second = {'residential-walkthrough': 40, 'interior-finish': 25,
                  'hall-preparation': 10, 'hall-finished': 25,
                  'porch-walkthrough': 25, 'concrete-overlay': 20}[stem]
        with Image.open(REVIEW / f'{stem}-{second}.png') as image:
            encode(image, f'{stem}-poster')
        print(f'{stem}: {destination.stat().st_size // 1024} KB')

if __name__ == '__main__':
    review() if '--review' in sys.argv else build()
