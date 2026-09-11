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
| `app/layout.tsx` | Cabecera, pie, metadata base y JSON-LD del negocio |
| `app/page.tsx` | Portada corta: hero con cotizador rápido y accesos |
| `app/servicios/[slug]/` | Una página por servicio |
| `app/sectores/[slug]/` | Una página por sector |
| `app/{empresas,planes,nosotros,cotizar,contacto,preguntas-frecuentes}/` | Páginas fijas |
| `app/robots.ts`, `app/sitemap.ts` | `robots.txt` y `sitemap.xml` generados |
| `components/site/` | Cabecera, pie y bloques compartidos entre páginas |
| `lib/site.ts` | NAP, cobertura, FAQs generales, `BASE_PATH` y `SITE_URL` |
| `lib/content.ts` | Navegación, servicios, sectores y planes con su texto |
| `lib/schema.ts` | Datos estructurados por página (migas, `Service`, FAQ) |
| `public/images/` | Fotos con variantes `-640` y `-1024` para `srcset` |

### Páginas

```
/                               /empresas
/servicios                      /planes
  /servicios/<slug>             /cotizar
/sectores                       /nosotros
  /sectores/<slug>              /contacto
                                /preguntas-frecuentes
```

Cada página lleva su propio `title`, `description`, canonical y `BreadcrumbList`;
las de servicio añaden `Service` y sus FAQ. Para dar de alta una página nueva
basta con añadirla a `app/sitemap.ts`: el script de exportación lee ese sitemap
para saber qué capturar.

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

Pages solo sirve archivos estáticos y el `output: 'export'` de vinext
1.0.0-beta.5 no sirve aquí: con rutas estáticas no escribe HTML y con rutas
dinámicas aborta el build (`RSC handler returned 404`). En su lugar,
`scripts/export-static.mjs` levanta el servidor de producción, recorre las URLs
del sitemap y guarda cada respuesta renderizada en `out/`. La interactividad
—cotizador, menú, acordeones— se conserva porque hidrata con normalidad.

Al publicarse en un subdirectorio, las rutas absolutas escritas a mano se
prefijan con `BASE_PATH` (`lib/site.ts`) mediante `asset()`. Con dominio propio
se deja `BASE_PATH` vacío, se actualiza `SITE_URL` y se configura el dominio
en los ajustes de Pages.
