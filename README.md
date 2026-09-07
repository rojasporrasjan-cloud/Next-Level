# Next Level Concrete Coatings & More

Landing page con React, TypeScript, Vinext y Tailwind CSS. Incluye medios locales, animaciones accesibles y contacto por WhatsApp.

## Desarrollo local

```sh
npm ci
npm run dev
```

## Desplegar en Vercel

1. En Vercel, seleccioná **Add New → Project** e importá este repositorio.
2. Usá la raíz del repositorio y el preset **Other**. `vercel.json` configura la instalación, la compilación y el directorio de salida automáticamente.
3. Presioná **Deploy**. No se requieren claves de API ni variables de entorno.
4. Para conectar tu dominio, abrí **Settings → Domains**, agregá el dominio y configurá los registros DNS que Vercel indique.

La compilación `npm run build:vercel` genera el sitio estático en `dist/client`, incluidos HTML, JavaScript, estilos, fuentes, imágenes y videos. Las interacciones se ejecutan en el navegador; no hay formularios ni servicios de servidor.

El comando `npm run build` conserva la compilación original para Sites/Cloudflare Workers. No selecciones el preset Next.js en Vercel: este proyecto utiliza Vinext.

## Contenido

Los videos de proyectos son material real del negocio. La imagen principal es una visualización de inspiración creada con IA, identificada en la página. Los destinos de contacto se definen en `app/page.tsx`.

Usá Node.js 22 LTS. La exportación se verificó con esa versión; Node 24 presenta un fallo al cerrar el proceso de prerender en Windows. Vercel selecciona Node 22 mediante el campo engines del proyecto.
