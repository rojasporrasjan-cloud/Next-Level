from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root / '.tools'))
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
media = root / 'public' / 'media'
for video in sorted(media.glob('*.mp4')):
    for second in (2, 7, 12):
        output = video.with_name(f'{video.stem}-{second}.jpg')
        subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-ss', str(second), '-i', str(video), '-frames:v', '1', '-q:v', '2', str(output)], check=True)
        print(output.name)
