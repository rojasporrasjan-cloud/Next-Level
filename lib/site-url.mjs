/* Fuente única de la URL pública. La consumen `lib/site.ts` (dentro del bundle)
   y `scripts/build-vercel.mjs` (que genera robots.txt y sitemap.xml), para que
   los metadatos y los archivos de rastreo no puedan quedar desincronizados.

   Configurá NEXT_PUBLIC_SITE_URL en Vercel → Settings → Environment Variables
   con el dominio definitivo. Sin esa variable se usa el valor de respaldo. */

export const FALLBACK_SITE_URL =
  'https://next-level-concrete-juanca.janrojasporras.chatgpt.site';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL)
  .replace(/\/+$/, '');
