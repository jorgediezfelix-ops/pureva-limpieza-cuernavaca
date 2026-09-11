# PUREVA — Limpieza profesional en Cuernavaca

Sitio de una sola página para PUREVA, empresa de limpieza en Cuernavaca, Morelos.
Incluye cotizador interactivo, catálogo de servicios por sector, planes
residenciales y bloques de contacto por WhatsApp y teléfono.

## Stack

- [vinext](https://www.npmjs.com/package/vinext) (App Router de Next sobre Vite + RSC)
- React 19, TypeScript
- Tailwind CSS 4 + componentes shadcn sobre Base UI
- Despliegue pensado para Cloudflare Workers (`wrangler`)

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run start    # sirve el build con wrangler
npm run export   # build + sitio estático en out/ (GitHub Pages)
npm run lint     # oxlint
```

## Estructura

| Ruta | Contenido |
| --- | --- |
| `app/page.tsx` | Toda la landing (header, hero, cotizador, secciones, footer) |
| `app/layout.tsx` | Metadata, datos estructurados JSON-LD, iconos, fuentes |
| `app/robots.ts`, `app/sitemap.ts` | `robots.txt` y `sitemap.xml` generados |
| `lib/site.ts` | NAP, cobertura, catálogo de servicios y FAQs (fuente única) |
| `public/images/` | Fotos con variantes `-640` y `-1024` para `srcset` |

## SEO

`lib/site.ts` es la fuente única de los datos del negocio: teléfono, correo,
municipios atendidos, catálogo de servicios y preguntas frecuentes. De ahí salen
tanto el contenido visible como los datos estructurados (`ProfessionalService`,
`WebSite`, `FAQPage`), de modo que no puedan desincronizarse.

Al cambiar de dominio basta con actualizar `SITE_URL` en ese archivo: canonical,
Open Graph, `robots.txt` y `sitemap.xml` se derivan de ahí.

`reviewData.enabled` está en `false` a propósito: el bloque `aggregateRating`
solo debe publicarse cuando existan reseñas reales y verificables, porque Google
aplica acciones manuales a las valoraciones inventadas.

## Publicación

El sitio se publica en GitHub Pages en cada push a `main`
(`.github/workflows/deploy.yml`):

https://kinvitalgroup.com/pureva-limpieza-cuernavaca/

Pages solo sirve archivos estáticos y vinext 1.0.0-beta.5 no expone
`output: 'export'` en su CLI (marca la home como dinámica y no escribe HTML),
así que `scripts/export-static.mjs` levanta el servidor de producción, guarda
la respuesta renderizada y arma `out/`. Como toda la página es un componente de
cliente, el resultado conserva el cotizador y el resto de la interactividad.

Al publicarse en un subdirectorio, las rutas absolutas escritas a mano se
prefijan con `BASE_PATH` (`lib/site.ts`) mediante `asset()`. Con dominio propio
se deja `BASE_PATH` vacío, se actualiza `SITE_URL` y se configura el dominio
en los ajustes de Pages.
