/**
 * Fuente única de verdad para NAP (nombre, dirección, teléfono), cobertura,
 * catálogo de servicios y FAQs.
 *
 * Se consume desde `app/layout.tsx` (metadata + JSON-LD renderado en el
 * servidor) y desde `app/page.tsx` (contenido visible). Mantener un solo
 * origen evita que los datos estructurados se desincronicen del HTML, que es
 * justo lo que Google penaliza.
 */

/**
 * Subdirectorio bajo el que se sirve el sitio. GitHub Pages publica los
 * repositorios de proyecto en `https://<usuario>.github.io/<repo>/`, así que
 * todas las rutas absolutas que escribimos a mano necesitan este prefijo.
 * Con dominio propio se deja como cadena vacía.
 */
export const BASE_PATH = '/pureva-limpieza-cuernavaca';

/**
 * Dominio de producción. Cambiar aquí actualiza canonical, Open Graph,
 * robots.txt y sitemap.xml de una sola vez.
 *
 * La cuenta tiene kinvitalgroup.com como dominio propio de GitHub Pages, así
 * que `jorgediezfelix-ops.github.io` redirige (301) aquí: el canonical debe
 * apuntar al destino final, nunca al origen de una redirección.
 */
export const SITE_URL = `https://kinvitalgroup.com${BASE_PATH}`;

/** Prefija una ruta de `public/` con el subdirectorio de publicación. */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}

export const business = {
  name: 'PUREVA',
  legalName: 'PUREVA Limpieza Profesional',
  tagline: 'Limpieza profesional en Cuernavaca',
  description:
    'Empresa de limpieza profesional en Cuernavaca, Morelos. Servicio para casas, oficinas, colegios, condominios, comercios y Airbnb, con personal capacitado, supervisión e insumos incluidos.',
  email: 'info@pureva.mx',
  /** Formato E.164 para schema.org y enlaces tel: */
  phone: '+527775171042',
  phoneDisplay: '777 517 1042',
  whatsapp: '+527775560211',
  whatsappDisplay: '777 556 0211',
  whatsappUrl: 'https://wa.me/527775560211',
  priceRange: '$$',
  currency: 'MXN',
  address: {
    locality: 'Cuernavaca',
    region: 'Morelos',
    regionCode: 'MX-MOR',
    country: 'MX',
    postalCode: '62000',
  },
  /** Centro aproximado de Cuernavaca; ajustar al domicilio real si se publica. */
  geo: { latitude: 18.9186, longitude: -99.2342 },
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '19:00' },
    { days: ['Saturday'], opens: '09:00', closes: '14:00' },
  ],
} as const;

/**
 * Municipios atendidos. Alimentan `areaServed` en JSON-LD y la lista de
 * cobertura del footer: señal directa de SEO local.
 */
export const coverage = [
  'Cuernavaca',
  'Jiutepec',
  'Temixco',
  'Emiliano Zapata',
  'Xochitepec',
  'Tepoztlán',
  'Cuautla',
] as const;

/**
 * Perfiles sociales para `sameAs`. Se renderizan solo cuando tienen URL real:
 * un enlace vacío o `href="#"` no aporta nada y ensucia el rastreo.
 */
export const socialLinks: { label: string; short: string; url: string }[] = [
  { label: 'Facebook', short: 'Fb', url: '' },
  { label: 'Instagram', short: 'Ig', url: '' },
  { label: 'LinkedIn', short: 'In', url: '' },
];

/** Catálogo para `hasOfferCatalog`; refleja los servicios visibles en la página. */
export const serviceCatalog = [
  {
    name: 'Limpieza residencial en Cuernavaca',
    description:
      'Limpieza regular y profunda para casas y departamentos, servicios recurrentes y limpieza por mudanza o entrega.',
  },
  {
    name: 'Limpieza de oficinas y empresas',
    description:
      'Limpieza empresarial con personal asignado, supervisor responsable, checklists y reportes periódicos.',
  },
  {
    name: 'Limpieza de colegios e instituciones',
    description: 'Protocolos de higiene y desinfección para aulas, sanitarios y áreas comunes.',
  },
  {
    name: 'Limpieza de condominios y áreas comunes',
    description: 'Mantenimiento de lobbies, pasillos, estacionamientos y amenidades.',
  },
  {
    name: 'Limpieza de comercios y restaurantes',
    description: 'Limpieza de locales comerciales, tiendas y restaurantes con horarios flexibles.',
  },
  {
    name: 'Limpieza de Airbnb entre huéspedes',
    description: 'Rotación rápida con checklist fotográfico y reposición de blancos.',
  },
  {
    name: 'Servicios especializados de limpieza',
    description: 'Lavado de salas y colchones, cristales, pisos, alfombras, desinfección y limpieza post-obra.',
  },
] as const;

/**
 * FAQs mostradas en la página y publicadas como FAQPage.
 * Google exige que el texto del schema coincida con el visible en el HTML.
 */
export const faqs = [
  {
    question: '¿El personal de limpieza está capacitado y verificado?',
    answer:
      'Sí. Nuestro proceso contempla validación, capacitación por protocolos y supervisión. El personal llega identificado y con el equipo requerido para el servicio contratado.',
  },
  {
    question: '¿Tengo que proporcionar productos o equipo de limpieza?',
    answer:
      'No. Llevamos productos, microfibras y equipo profesional. Si tu inmueble requiere un tratamiento o material especial, lo confirmamos contigo antes de la visita.',
  },
  {
    question: '¿Puedo contratar un servicio de limpieza recurrente?',
    answer:
      'Claro. Puedes elegir frecuencia semanal, dos o tres veces por semana, quincenal o mensual. Las frecuencias recurrentes obtienen mejores condiciones y continuidad de equipo.',
  },
  {
    question: '¿Cómo cotizan la limpieza de oficinas, condominios o colegios?',
    answer:
      'Comenzamos con un diagnóstico y, cuando se necesita, coordinamos una visita técnica sin costo. Después entregamos una propuesta con alcance, personal, horarios, supervisión y precio.',
  },
  {
    question: '¿En qué zonas de Cuernavaca y Morelos dan servicio?',
    answer:
      'Nuestra operación principal está en Cuernavaca y su zona metropolitana: Jiutepec, Temixco, Emiliano Zapata, Xochitepec y alrededores. Confirma tu colonia en el cotizador o por WhatsApp para validar disponibilidad.',
  },
  {
    question: '¿Cuánto cuesta un servicio de limpieza en Cuernavaca?',
    answer:
      'Una vivienda de hasta 80 m² parte desde $690 MXN por servicio. El precio final depende de la superficie, el número de baños, el tipo de limpieza y la frecuencia; puedes estimarlo en segundos con el cotizador de esta página.',
  },
] as const;

/**
 * Reseñas verificadas. Google aplica acciones manuales cuando se marca
 * `aggregateRating` sin reseñas reales y comprobables, así que el bloque solo
 * se emite cuando `enabled` es true.
 */
export const reviewData = {
  enabled: false,
  ratingValue: 4.9,
  reviewCount: 850,
};
