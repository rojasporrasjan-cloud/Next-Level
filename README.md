# Next Level Concrete Coatings & More

Landing page de una sola ruta para el negocio de Boiling Springs (Carolina del
Sur). React 19 + TypeScript sobre [Vinext](https://www.npmjs.com/package/vinext),
exportada como sitio estático. Medios locales, animaciones que respetan
`prefers-reduced-motion` y contacto por WhatsApp.

No usa ningún framework de CSS: los estilos son propios y viven completos en
[`app/globals.css`](app/globals.css).

## Desarrollo local

```sh
npm ci
npm run dev
```

Usá **Node.js 22 LTS**. En Node 24 sobre Windows el proceso de prerender aborta
al cerrarse; el build detecta ese caso, verifica que la salida esté completa y
continúa. Vercel selecciona Node 22 por el campo `engines`.

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build:vercel` | Exportación estática a `dist/client` (lo que despliega Vercel) |
| `npm run build` | Build original para Sites / Cloudflare Workers |
| `npm run lint` | oxlint |
| `npm run typecheck` | `tsc --noEmit` |

## Desplegar en Vercel

1. **Add New → Project** e importá este repositorio.
2. Raíz del repositorio, preset **Other**. `vercel.json` ya define instalación,
   compilación y directorio de salida. No selecciones el preset Next.js: este
   proyecto usa Vinext.
3. **Configurá `NEXT_PUBLIC_SITE_URL`** en *Settings → Environment Variables*
   con el dominio definitivo (por ejemplo `https://nextlevelcoatings.com`).
   De esa variable dependen el canonical, las URL de Open Graph, el JSON-LD y
   el `sitemap.xml`. Sin ella se usa el valor de respaldo de
   [`lib/site-url.mjs`](lib/site-url.mjs), y las vistas previas al compartir el
   enlace apuntarán al dominio equivocado.
4. **Deploy**. No hacen falta más variables ni claves de API.
5. Para el dominio propio: **Settings → Domains**, agregalo y cargá los
   registros DNS que indique Vercel.

Todo se resuelve en el navegador: no hay formularios, base de datos ni servicios
de servidor.

## Contenido y datos del negocio

Teléfono, WhatsApp, Facebook y localidad están centralizados en
[`lib/site.ts`](lib/site.ts); de ahí salen también los metadatos y el JSON-LD
`HomeAndConstructionBusiness`. Editá ese archivo, no las secciones sueltas.

El JSON-LD sólo declara datos verificados (ver [SOURCES.md](SOURCES.md)). No
agregues horarios, reseñas, valoraciones, radio de servicio ni credenciales sin
confirmarlos con el cliente: son justamente los campos que Google penaliza si
no son ciertos.

## Medios

Las tarjetas tienen dimensiones reservadas y no usan animaciones de opacidad al
entrar en pantalla. La galería selecciona miniaturas de 480 u 800 px según el
tamaño de pantalla; las fotos completas solo se abren en el visor. Regenerá las
miniaturas con `python scripts/prepare-gallery-thumbnails.py` después de editar
los originales o las fotos de la galería.

Ningún reproductor ni fuente MP4 se monta hasta que la persona pulsa reproducir.
Los nueve videos conservan su calidad de origen (H.264, 1024×576, aproximadamente
0.84–1.41 Mbps) y tienen los metadatos antes del contenido para iniciar sin
descargar el archivo completo. `vercel.json` permite reutilizar los medios en
caché durante un día; no usa caché inmutable para fotos/videos que pueden cambiar.
Esto reduce transferencias repetidas, pero el consumo total depende de las
visitas, reproducciones y del comportamiento de caché del navegador.

Los vídeos son material real de obra. La imagen del hero es una visualización
generada con IA y está etiquetada como tal en la página.

```
media-src/           originales que NO se despliegan (visualizaciones IA)
public/media/*.mp4   vídeos originales
public/media/*.avif  \ derivados generados, versionados
public/media/*.webp  /
public/media/og-image.jpg   1200x630 para compartir el enlace
```

Para regenerar todos los derivados desde los originales:

```sh
pip install Pillow imageio-ffmpeg
python scripts/prepare-media.py
```

El script es idempotente. Si cambiás un vídeo o la imagen del hero, corrélo y
volvé a compilar. Las fuentes (`public/fonts/*.woff2`) son subconjuntos Latin de
Barlow Condensed 800 y Manrope 400/700 descargadas de Google Fonts.
