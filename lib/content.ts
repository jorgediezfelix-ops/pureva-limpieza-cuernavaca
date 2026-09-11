/**
 * Contenido de las páginas: navegación, servicios, sectores, planes y demás
 * bloques reutilizables.
 *
 * Los datos del negocio (NAP, cobertura, FAQs generales) viven en `lib/site.ts`.
 * Aquí está lo que cambia de una página a otra: cada servicio y cada sector
 * lleva su `slug`, su titular, su meta y su texto propio, de modo que las
 * subpáginas no sean variaciones vacías de la misma plantilla —contenido
 * duplicado o escaso es justo lo que Google descarta.
 */
import {
  BadgeCheck,
  Building2,
  CalendarCheck,
  Camera,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  Hammer,
  HomeIcon,
  Hotel,
  PanelsTopLeft,
  Sofa,
  Sparkles,
  SprayCan,
  Store,
  UsersRound,
  Waves,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const navItems = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Sectores', href: '/sectores' },
  { label: 'Empresas', href: '/empresas' },
  { label: 'Planes', href: '/planes' },
  { label: 'Nosotros', href: '/nosotros' },
];

export const trustItems = [
  { icon: BadgeCheck, label: 'Personal capacitado' },
  { icon: ClipboardCheck, label: 'Servicio supervisado' },
  { icon: CalendarCheck, label: 'Horarios flexibles' },
];

export const heroStats = [
  { value: 850, prefix: '+', suffix: '', label: 'servicios completados' },
  { value: 4.9, prefix: '', suffix: '/5', decimals: 1, label: 'satisfacción de clientes' },
  { value: 100, prefix: '', suffix: '%', label: 'personal capacitado' },
  { value: 24, prefix: '', suffix: ' h', label: 'respuesta a cotizaciones' },
];

export const marqueeItems = [
  'Personal verificado',
  'Insumos y equipo incluidos',
  'Supervisión por servicio',
  'Cotización en menos de 24 h',
  'Cobertura en Cuernavaca y zona metropolitana',
  'Horarios flexibles',
  'Facturación disponible',
];

/** Una entrada = una página bajo /servicios/<slug>. */
export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  /** Resumen de tarjeta, en la home y en /servicios. */
  description: string;
  image: string;
  alt: string;
  icon: LucideIcon;
  features: string[];
  tone: 'light' | 'dark';
  /** Titular y metadatos de su propia página. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  includes: { title: string; text: string }[];
  idealFor: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: 'limpieza-residencial',
    title: 'Limpieza residencial',
    eyebrow: 'Para tu hogar',
    description:
      'Desde el mantenimiento semanal hasta una limpieza profunda: cuidamos cada espacio como si fuera nuestro.',
    image: '/images/home-cleaning.jpg',
    alt: 'Profesional de PUREVA realizando limpieza residencial en una casa de Cuernavaca',
    icon: HomeIcon,
    features: ['Regular y profunda', 'Mudanzas y entregas', 'Servicios recurrentes'],
    tone: 'light',
    h1: 'Limpieza residencial en Cuernavaca',
    metaTitle: 'Limpieza residencial en Cuernavaca | Casas y departamentos',
    metaDescription:
      'Servicio de limpieza de casas y departamentos en Cuernavaca. Limpieza regular, profunda, por mudanza y planes recurrentes con personal capacitado e insumos incluidos. Desde $690 MXN.',
    intro:
      'Llegar a una casa limpia no debería costarte el fin de semana. Nos encargamos del mantenimiento semanal, de la limpieza profunda que se posterga durante meses y de las entregas por mudanza, siempre con el mismo equipo y el mismo estándar.',
    includes: [
      {
        title: 'Cocina y baños a detalle',
        text: 'Desengrase de estufa y campana, interior de microondas, azulejos, sanitarios y mamparas.',
      },
      {
        title: 'Recámaras y áreas comunes',
        text: 'Aspirado, trapeado, cambio de blancos, polvo en superficies altas y marcos de puertas.',
      },
      {
        title: 'Insumos y equipo incluidos',
        text: 'Llevamos productos profesionales, microfibras y aspiradora. Tú no compras nada.',
      },
      {
        title: 'Extras a la carta',
        text: 'Interior de refrigerador y horno, ventanas, lavado de salas y colchones.',
      },
    ],
    idealFor: [
      'Casas y departamentos habitados',
      'Limpieza profunda una o dos veces al año',
      'Entrega o recepción por mudanza',
      'Familias con mascotas o alergias',
    ],
    faqs: [
      {
        question: '¿Cuánto dura una limpieza residencial?',
        answer:
          'Una vivienda de hasta 80 m² con limpieza regular toma entre 3 y 4 horas con una persona. La limpieza profunda puede duplicar ese tiempo o resolverse con dos personas en una sola visita.',
      },
      {
        question: '¿Necesito estar en casa durante el servicio?',
        answer:
          'No es obligatorio. Muchos clientes nos dejan acceso y reciben el reporte al terminar. Si prefieres estar presente la primera vez para mostrar prioridades, lo coordinamos sin problema.',
      },
      {
        question: '¿Qué diferencia hay entre limpieza regular y profunda?',
        answer:
          'La regular mantiene lo que ya está limpio: pisos, superficies, cocina y baños. La profunda ataca lo acumulado —interior de muebles y electrodomésticos, zoclos, azulejos, luminarias— y se recomienda al iniciar un servicio recurrente.',
      },
    ],
  },
  {
    slug: 'limpieza-empresarial',
    title: 'Limpieza empresarial',
    eyebrow: 'Para tu organización',
    description:
      'Operación consistente para oficinas, corporativos y sucursales, con personal asignado y seguimiento.',
    image: '/images/professional-team.jpg',
    alt: 'Equipo de limpieza empresarial de PUREVA trabajando en una oficina corporativa',
    icon: Building2,
    features: ['Supervisor asignado', 'Reportes y checklists', 'Horarios personalizados'],
    tone: 'dark',
    h1: 'Limpieza de oficinas y empresas en Cuernavaca',
    metaTitle: 'Limpieza de oficinas en Cuernavaca | Servicio empresarial',
    metaDescription:
      'Limpieza empresarial en Cuernavaca para oficinas, corporativos y sucursales: personal asignado, supervisor responsable, control de asistencia, reportes y facturación.',
    intro:
      'En una operación empresarial el problema rara vez es la primera limpieza: es sostener el mismo resultado el mes catorce. Trabajamos con personal asignado, protocolos escritos y un supervisor que responde por el servicio, para que la calidad no dependa de quién haya ido ese día.',
    includes: [
      {
        title: 'Personal asignado y suplencias',
        text: 'El mismo equipo cada visita, con relevo cubierto por nosotros cuando alguien falta.',
      },
      {
        title: 'Supervisión y reportes',
        text: 'Checklist por área, control de asistencia y reporte periódico con evidencia fotográfica.',
      },
      {
        title: 'Horarios que no interrumpen',
        text: 'Turnos matutinos, nocturnos o de fin de semana, según la operación de tu empresa.',
      },
      {
        title: 'Consumibles y facturación',
        text: 'Suministro de papel, jabón y aromatizantes, contrato y factura con complemento de pago.',
      },
    ],
    idealFor: [
      'Oficinas y corporativos',
      'Empresas con varias ubicaciones',
      'Naves, bodegas y áreas de producción',
      'Organizaciones que requieren contrato y factura',
    ],
    faqs: [
      {
        question: '¿Trabajan con contrato y facturación?',
        answer:
          'Sí. Los servicios empresariales se formalizan con contrato de prestación de servicios, alcance documentado y facturación mensual con complemento de pago.',
      },
      {
        question: '¿Qué pasa si falta alguien del equipo asignado?',
        answer:
          'La suplencia corre por nuestra cuenta. El supervisor coordina el relevo el mismo día para que la operación no se interrumpa ni tengas que gestionarlo tú.',
      },
      {
        question: '¿Pueden atender varias sucursales a la vez?',
        answer:
          'Sí. Centralizamos la coordinación en un solo contacto y un solo reporte consolidado, aunque las ubicaciones tengan horarios y alcances distintos.',
      },
    ],
  },
  {
    slug: 'limpieza-especializada',
    title: 'Servicios especializados',
    eyebrow: 'Resultados a detalle',
    description:
      'Soluciones puntuales con equipo profesional para superficies, textiles y necesidades de alta exigencia.',
    image: '/images/detail-cleaning.jpg',
    alt: 'Limpieza profesional detallada de una superficie con equipo especializado',
    icon: Sparkles,
    features: ['Salas y colchones', 'Cristales y pisos', 'Desinfección profunda'],
    tone: 'light',
    h1: 'Servicios especializados de limpieza en Cuernavaca',
    metaTitle: 'Lavado de salas, colchones y cristales en Cuernavaca',
    metaDescription:
      'Servicios especializados de limpieza en Cuernavaca: lavado de salas y colchones, cristales, pulido de pisos, alfombras, desinfección y limpieza post-obra con equipo profesional.',
    intro:
      'Hay trabajos que no se resuelven con trapo y buena voluntad. Para textiles, superficies delicadas y limpieza post-obra usamos inyección-extracción, pulidoras y productos específicos por material, con el tiempo de secado calculado antes de empezar.',
    includes: [
      {
        title: 'Salas, sillones y colchones',
        text: 'Inyección-extracción que retira ácaros, manchas y olores sin dejar el textil empapado.',
      },
      {
        title: 'Cristales y cancelería',
        text: 'Cristal interior y exterior accesible, marcos, rieles y mamparas sin marcas de agua.',
      },
      {
        title: 'Pisos y alfombras',
        text: 'Pulido, encerado y lavado según el material: porcelanato, duela, mármol o alfombra.',
      },
      {
        title: 'Post-obra y desinfección',
        text: 'Retiro de residuos finos de construcción y desinfección de puntos de contacto.',
      },
    ],
    idealFor: [
      'Entrega de obra o remodelación',
      'Textiles con manchas u olores persistentes',
      'Pisos que perdieron brillo',
      'Espacios que requieren desinfección documentada',
    ],
    faqs: [
      {
        question: '¿Cuánto tarda en secar una sala o un colchón?',
        answer:
          'Entre 4 y 8 horas según ventilación y tipo de textil. Si el servicio es por la mañana, el mueble queda utilizable el mismo día.',
      },
      {
        question: '¿La limpieza post-obra incluye retiro de escombro?',
        answer:
          'Incluye el retiro del polvo fino y los residuos de acabado. El escombro voluminoso se cotiza aparte porque requiere transporte y disposición distinta.',
      },
    ],
  },
];

/** Una entrada = una página bajo /sectores/<slug>. */
export type Sector = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  icon: LucideIcon;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  highlights: string[];
  /** Servicio relacionado, para enlazar entre secciones. */
  relatedService: string;
};

export const sectors: Sector[] = [
  {
    slug: 'hogares',
    title: 'Hogares',
    subtitle: 'Casas y departamentos',
    image: '/images/home-cleaning.jpg',
    alt: 'Limpieza de casas y departamentos en Cuernavaca',
    icon: HomeIcon,
    h1: 'Limpieza de casas y departamentos en Cuernavaca',
    metaTitle: 'Limpieza de casas y departamentos en Cuernavaca',
    metaDescription:
      'Servicio de limpieza para casas y departamentos en Cuernavaca y su zona metropolitana, con personal verificado, insumos incluidos y planes recurrentes desde $690 MXN.',
    intro:
      'Cada casa tiene sus prioridades: en una es la cocina, en otra son los pisos con mascotas. Levantamos esas prioridades en la primera visita y las dejamos por escrito, para que el equipo no tenga que adivinarlas en la segunda.',
    highlights: [
      'Personal verificado e identificado',
      'Frecuencia semanal, quincenal o mensual',
      'Insumos y equipo profesional incluidos',
      'Atención a mascotas y alergias',
    ],
    relatedService: 'limpieza-residencial',
  },
  {
    slug: 'oficinas',
    title: 'Oficinas',
    subtitle: 'Espacios de trabajo',
    image: '/images/office-cleaning.jpg',
    alt: 'Limpieza de oficinas y espacios de trabajo en Cuernavaca',
    icon: Building2,
    h1: 'Limpieza de espacios de trabajo y coworkings',
    metaTitle: 'Limpieza de espacios de trabajo y coworkings en Cuernavaca',
    metaDescription:
      'Cómo trabajamos dentro de una oficina en Cuernavaca: turnos antes o después de la jornada, checklist por área, reposición de consumibles y reporte de incidencias.',
    intro:
      'Una oficina limpia se nota en los detalles que nadie menciona: el vidrio sin huellas, el bote vaciado, el baño surtido. Trabajamos en turnos que no interrumpen la jornada y con checklist por área para que esos detalles no dependan de la memoria de nadie.',
    highlights: [
      'Turnos matutinos, nocturnos o de fin de semana',
      'Escritorios, salas de junta y áreas comunes',
      'Sanitarios con reposición de consumibles',
      'Reporte de incidencias por visita',
    ],
    relatedService: 'limpieza-empresarial',
  },
  {
    slug: 'colegios',
    title: 'Colegios',
    subtitle: 'Instituciones educativas',
    image: '/images/corporate-cleaning.jpg',
    alt: 'Limpieza y desinfección de colegios e instituciones educativas',
    icon: GraduationCap,
    h1: 'Limpieza de colegios e instituciones educativas',
    metaTitle: 'Limpieza de colegios en Cuernavaca | Aulas y sanitarios',
    metaDescription:
      'Limpieza y desinfección de colegios en Cuernavaca: aulas, sanitarios, comedores y áreas comunes, con protocolos de higiene y personal capacitado para entornos escolares.',
    intro:
      'En un colegio la higiene es prevención: sanitarios, comedores y superficies de contacto concentran la mayor parte del riesgo. Programamos el servicio alrededor del calendario escolar, con refuerzos en periodos de mayor incidencia.',
    highlights: [
      'Aulas, laboratorios y salas de maestros',
      'Sanitarios con protocolo reforzado',
      'Comedores y áreas de patio',
      'Personal capacitado para entornos con menores',
    ],
    relatedService: 'limpieza-empresarial',
  },
  {
    slug: 'condominios',
    title: 'Condominios',
    subtitle: 'Áreas comunes',
    image: '/images/luxury-cleaning.jpg',
    alt: 'Limpieza de áreas comunes en condominios de Cuernavaca',
    icon: Building2,
    h1: 'Limpieza de condominios y áreas comunes',
    metaTitle: 'Limpieza de condominios en Cuernavaca | Áreas comunes',
    metaDescription:
      'Mantenimiento y limpieza de áreas comunes en condominios de Cuernavaca: lobbies, pasillos, elevadores, estacionamientos, albercas y amenidades, con reporte a la administración.',
    intro:
      'La administración de un condominio responde ante muchos ojos a la vez. Entregamos un reporte por visita —con fecha, áreas atendidas e incidencias— que sirve de respaldo en asamblea y evita discusiones sobre lo que se hizo y lo que no.',
    highlights: [
      'Lobbies, pasillos y elevadores',
      'Estacionamientos y escaleras de servicio',
      'Amenidades: gimnasio, salón y terrazas',
      'Reporte mensual para la administración',
    ],
    relatedService: 'limpieza-empresarial',
  },
  {
    slug: 'comercios',
    title: 'Comercios',
    subtitle: 'Restaurantes y tiendas',
    image: '/images/man-cleaning.jpg',
    alt: 'Limpieza de comercios, restaurantes y tiendas en Cuernavaca',
    icon: Store,
    h1: 'Limpieza de comercios y restaurantes en Cuernavaca',
    metaTitle: 'Limpieza de comercios y restaurantes en Cuernavaca',
    metaDescription:
      'Limpieza para locales comerciales, tiendas y restaurantes en Cuernavaca: pisos, cristales, sanitarios y áreas de cocina, en horarios fuera del servicio al público.',
    intro:
      'En un comercio la limpieza es parte del escaparate y, en un restaurante, parte de la operación sanitaria. Trabajamos antes de abrir o después de cerrar, con desengrase de cocina y atención especial a pisos y cristales de acceso.',
    highlights: [
      'Horarios fuera del servicio al público',
      'Desengrase de cocina y campanas',
      'Pisos, cristales y escaparates',
      'Sanitarios de clientes y de personal',
    ],
    relatedService: 'limpieza-empresarial',
  },
  {
    slug: 'airbnb',
    title: 'Airbnb',
    subtitle: 'Limpieza entre huéspedes',
    image: '/images/woman-cleaning-office.jpg',
    alt: 'Limpieza de Airbnb entre huéspedes en Cuernavaca',
    icon: Hotel,
    h1: 'Limpieza de Airbnb en Cuernavaca',
    metaTitle: 'Limpieza de Airbnb en Cuernavaca | Entre huéspedes',
    metaDescription:
      'Limpieza de Airbnb y rentas vacacionales en Cuernavaca: rotación entre huéspedes, cambio de blancos, checklist fotográfico y reposición de amenidades.',
    intro:
      'En una renta vacacional el margen entre un check-out y un check-in es de horas, y una reseña de cuatro estrellas por una toalla olvidada cuesta más que el servicio. Cerramos cada rotación con checklist fotográfico para que sepas cómo quedó antes de que llegue el siguiente huésped.',
    highlights: [
      'Rotación entre check-out y check-in',
      'Cambio y lavado de blancos',
      'Checklist fotográfico al cerrar',
      'Reposición de amenidades y consumibles',
    ],
    relatedService: 'limpieza-residencial',
  },
];

export const specialities = [
  { icon: Sparkles, label: 'Limpieza profunda' },
  { icon: SprayCan, label: 'Desinfección' },
  { icon: Sofa, label: 'Salas y colchones' },
  { icon: PanelsTopLeft, label: 'Cristales' },
  { icon: Hammer, label: 'Post-obra' },
  { icon: Waves, label: 'Pisos y alfombras' },
];

export const processSteps = [
  { number: '01', icon: ClipboardList, title: 'Cuéntanos qué necesitas', text: 'Elige tu espacio, tamaño y tipo de limpieza.' },
  { number: '02', icon: CalendarCheck, title: 'Agenda a tu ritmo', text: 'Selecciona fecha, horario y frecuencia ideal.' },
  { number: '03', icon: UsersRound, title: 'Asignamos al equipo', text: 'Personal verificado llega con todo lo necesario.' },
  { number: '04', icon: Camera, title: 'Recibe el resultado', text: 'Supervisión, evidencia y cierre de cada servicio.' },
];

export const plans = [
  {
    name: 'Essential',
    subtitle: 'Mantenimiento sin complicaciones',
    price: 'Desde $690',
    features: ['Limpieza general', 'Cocina y baños', 'Pisos y superficies', 'Equipo capacitado'],
  },
  {
    name: 'Complete',
    subtitle: 'Nuestro favorito para el hogar',
    price: 'Desde $990',
    features: ['Todo en Essential', 'Detalle por habitación', 'Desinfección de puntos clave', 'Supervisión incluida'],
    featured: true,
  },
  {
    name: 'Premium',
    subtitle: 'Una renovación a fondo',
    price: 'Desde $1,490',
    features: ['Limpieza profunda', 'Interior de muebles', 'Cristales interiores', 'Extras personalizables'],
  },
];

export const testimonials = [
  {
    quote:
      'Puntuales, cuidadosos y muy profesionales. El departamento quedó impecable y el equipo trabajó sin necesidad de supervisión.',
    name: 'Mariana R.',
    role: 'Departamento · Cuernavaca',
  },
  {
    quote:
      'Llevamos varios meses con servicio recurrente en la oficina. La diferencia es la constancia: siempre el mismo estándar.',
    name: 'Luis A.',
    role: 'Oficina corporativa · Jiutepec',
  },
  {
    quote:
      'Coordinamos la limpieza entre huéspedes y nunca hemos tenido un retraso. El reporte con evidencia nos da mucha tranquilidad.',
    name: 'Paola M.',
    role: 'Anfitriona Airbnb · Cuernavaca',
  },
];

export const propertyOptions = [
  { value: 'hogar', label: 'Hogar', icon: HomeIcon },
  { value: 'oficina', label: 'Oficina', icon: Building2 },
  { value: 'comercio', label: 'Comercio', icon: Store },
  { value: 'condominio', label: 'Condominio', icon: Building2 },
  { value: 'airbnb', label: 'Airbnb', icon: Hotel },
];

export const extrasList = ['Refrigerador', 'Horno', 'Ventanas', 'Sala o colchón'];

export const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

export function findService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function findSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}
