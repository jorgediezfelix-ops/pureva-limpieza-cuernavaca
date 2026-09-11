import type { MetadataRoute } from 'next';
import { sectors, services } from '@/lib/content';
import { absoluteUrl } from '@/lib/schema';

/**
 * Índice de todas las páginas publicadas.
 *
 * `scripts/export-static.mjs` lee este mismo sitemap para saber qué capturar,
 * así que una ruta que falte aquí no se exporta: sitemap y sitio no pueden
 * desincronizarse.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPaths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    { path: '/servicios', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/sectores', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/empresas', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/planes', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/cotizar', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/nosotros', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/contacto', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/preguntas-frecuentes', priority: 0.6, changeFrequency: 'yearly' },
  ];

  return [
    ...staticPaths.map((entry) => ({
      url: absoluteUrl(entry.path),
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/servicios/${service.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...sectors.map((sector) => ({
      url: absoluteUrl(`/sectores/${sector.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];
}
