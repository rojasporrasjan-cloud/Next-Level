/* Datos del negocio en un único lugar: los consumen la página, los metadatos
   y el JSON-LD. Todo lo de acá está verificado en SOURCES.md — no agregar
   horarios, reseñas, radio de servicio ni credenciales sin confirmarlos. */

import { siteUrl } from './site-url.mjs';

export const site = {
  // De esta URL dependen Open Graph, el canonical, el JSON-LD y el sitemap.
  url: siteUrl,
  name: 'Next Level Concrete Coatings & More',
  shortName: 'Next Level',
  locality: 'Boiling Springs',
  region: 'SC',
  regionName: 'South Carolina',
  country: 'US',
  description:
    'Explore real decorative flake floors, outdoor projects, and concrete preparation from Next Level in Boiling Springs, South Carolina. Contact Juanca on WhatsApp.',
  phone: '+18644948712',
  phoneDisplay: '(864) 494-8712',
  facebook: 'https://www.facebook.com/share/1JuezjgG6z/',
  ogImage: '/media/og-image.jpg',
} as const;

export const whatsapp =
  'https://wa.me/19734454908?text=Hi%20Next%20Level!%20I%27d%20like%20to%20discuss%20a%20concrete%20coating%20project.%20My%20ZIP%20code%20is%20';

/** Datos estructurados para el panel de negocio local de Google. */
export const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}${site.ogImage}`,
  telephone: site.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  sameAs: [site.facebook],
};
