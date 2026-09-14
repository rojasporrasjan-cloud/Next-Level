import { spawnSync } from 'node:child_process';
import { existsSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { siteUrl } from '../lib/site-url.mjs';

const OUT_DIR = 'dist/client';

// Archivos sin los que el sitio no funciona. Se comprueban después del build
// porque el prerender de vinext puede abortar al cerrar el proceso en Node 24
// (Windows) *después* de haber escrito una salida completa y correcta.
const REQUIRED = [
  `${OUT_DIR}/index.html`,
  `${OUT_DIR}/media/bright-garage-inspiration.avif`,
  `${OUT_DIR}/media/og-image.jpg`,
  `${OUT_DIR}/fonts/manrope-400.woff2`,
];

// Se parte de cero para que la verificación no pueda pasar con restos de un
// build anterior.
rmSync(OUT_DIR, { recursive: true, force: true });

const result = spawnSync(process.execPath, ['node_modules/vinext/dist/cli.js', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, NEXT_LEVEL_STATIC_EXPORT: '1' },
});
if (result.error) throw result.error;

const missing = REQUIRED.filter(file => !existsSync(file) || statSync(file).size === 0);
if (missing.length > 0) {
  console.error(`\nLa exportación estática no generó:\n  ${missing.join('\n  ')}`);
  process.exit(result.status === 0 ? 1 : (result.status ?? 1));
}

if (result.status !== 0) {
  console.warn(
    `\nEl proceso de build terminó con código ${result.status}, pero ${OUT_DIR} está completo.\n` +
      'Es el fallo conocido al cerrar el prerender en Node 24 sobre Windows; Vercel usa Node 22 (campo engines).',
  );
}

// vinext no implementa las rutas de metadatos `app/robots.ts` y `app/sitemap.ts`
// de Next, así que ambos archivos se escriben acá con la misma URL que usan los
// metadatos de la página.
writeFileSync(
  `${OUT_DIR}/robots.txt`,
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
writeFileSync(
  `${OUT_DIR}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <url>\n` +
    `    <loc>${siteUrl}/</loc>\n` +
    `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n` +
    `    <changefreq>monthly</changefreq>\n` +
    `    <priority>1.0</priority>\n` +
    `  </url>\n` +
    `</urlset>\n`,
);

console.log(`\nExportación estática lista en ${OUT_DIR} (sitio: ${siteUrl}).`);
