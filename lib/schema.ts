/**
 * Datos estructurados por página.
 *
 * El negocio (`ProfessionalService`), el sitio (`WebSite`) y las FAQ generales
 * se declaran una sola vez en `app/layout.tsx`. Aquí están los bloques que
 * cambian de una ruta a otra: migas de pan y ficha de servicio.
 */
import { SITE_URL, business, coverage } from '@/lib/site';
import type { Service } from '@/lib/content';

/** URL absoluta de una ruta interna, con barra final. */
export function absoluteUrl(path: string) {
  if (path === '/') return `${SITE_URL}/`;
  const clean = path.endsWith('/') ? path : `${path}/`;
  return `${SITE_URL}${clean}`;
}

export type Crumb = { label: string; path?: string };

/**
 * `BreadcrumbList` a partir de la misma ruta que se pinta en pantalla, para que
 * lo que ve Google y lo que ve el visitante no se separen.
 */
export function breadcrumbSchema(trail: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.path ? { item: absoluteUrl(crumb.path) } : {}),
    })),
  };
}

/** Ficha `Service` de una página de servicio, enlazada al negocio del layout. */
export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(`/servicios/${service.slug}`)}#service`,
    name: service.h1,
    description: service.metaDescription,
    serviceType: service.title,
    url: absoluteUrl(`/servicios/${service.slug}`),
    image: `${SITE_URL}${service.image}`,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: coverage.map((city) => ({
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'State', name: business.address.region },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.includes.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item.title, description: item.text },
      })),
    },
  };
}

export function faqSchema(items: readonly { question: string; answer: string }[], id: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** `<` escapado para que el JSON no pueda cerrar el `<script>` que lo contiene. */
export function jsonLd(schema: object) {
  return { __html: JSON.stringify(schema).replace(/</g, '\\u003c') };
}
