'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, FormEvent, ReactNode } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Droplets,
  FileCheck2,
  GraduationCap,
  Hammer,
  Heart,
  HomeIcon,
  Hotel,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PanelsTopLeft,
  Phone,
  Quote,
  ShieldCheck,
  Sofa,
  Sparkles,
  SprayCan,
  Star,
  Store,
  UsersRound,
  Waves,
  Zap,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { business, coverage, faqs, socialLinks } from '@/lib/site';

const navItems = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Hogar', href: '#hogar' },
  { label: 'Empresas', href: '#empresas' },
  { label: 'Sectores', href: '#sectores' },
  { label: 'Planes', href: '#planes' },
  { label: 'Nosotros', href: '#nosotros' },
];

const trustItems = [
  { icon: BadgeCheck, label: 'Personal capacitado' },
  { icon: ClipboardCheck, label: 'Servicio supervisado' },
  { icon: CalendarCheck, label: 'Horarios flexibles' },
];

const heroStats = [
  { value: 850, prefix: '+', suffix: '', label: 'servicios completados' },
  { value: 4.9, prefix: '', suffix: '/5', decimals: 1, label: 'satisfacción de clientes' },
  { value: 100, prefix: '', suffix: '%', label: 'personal capacitado' },
  { value: 24, prefix: '', suffix: ' h', label: 'respuesta a cotizaciones' },
];

const marqueeItems = [
  'Personal verificado',
  'Insumos y equipo incluidos',
  'Supervisión por servicio',
  'Cotización en menos de 24 h',
  'Cobertura en Cuernavaca y zona metropolitana',
  'Horarios flexibles',
  'Facturación disponible',
];

const services = [
  {
    id: 'hogar',
    eyebrow: 'Para tu hogar',
    title: 'Limpieza residencial',
    description:
      'Desde el mantenimiento semanal hasta una limpieza profunda: cuidamos cada espacio como si fuera nuestro.',
    image: '/images/home-cleaning.jpg',
    alt: 'Profesional realizando limpieza residencial',
    icon: HomeIcon,
    features: ['Regular y profunda', 'Mudanzas y entregas', 'Servicios recurrentes'],
    tone: 'light',
  },
  {
    id: 'empresas-servicio',
    eyebrow: 'Para tu organización',
    title: 'Limpieza empresarial',
    description:
      'Operación consistente para oficinas, corporativos y sucursales, con personal asignado y seguimiento.',
    image: '/images/professional-team.jpg',
    alt: 'Equipo profesional limpiando una oficina',
    icon: Building2,
    features: ['Supervisor asignado', 'Reportes y checklists', 'Horarios personalizados'],
    tone: 'dark',
  },
  {
    id: 'especializados',
    eyebrow: 'Resultados a detalle',
    title: 'Servicios especializados',
    description:
      'Soluciones puntuales con equipo profesional para superficies, textiles y necesidades de alta exigencia.',
    image: '/images/detail-cleaning.jpg',
    alt: 'Limpieza profesional detallada de una superficie',
    icon: Sparkles,
    features: ['Salas y colchones', 'Cristales y pisos', 'Desinfección profunda'],
    tone: 'light',
  },
];

const sectors = [
  { title: 'Hogares', subtitle: 'Casas y departamentos', image: '/images/home-cleaning.jpg', alt: 'Limpieza de casas y departamentos en Cuernavaca', icon: HomeIcon },
  { title: 'Oficinas', subtitle: 'Espacios de trabajo', image: '/images/office-cleaning.jpg', alt: 'Limpieza de oficinas y espacios de trabajo en Cuernavaca', icon: Building2 },
  { title: 'Colegios', subtitle: 'Instituciones educativas', image: '/images/corporate-cleaning.jpg', alt: 'Limpieza y desinfección de colegios e instituciones educativas', icon: GraduationCap },
  { title: 'Condominios', subtitle: 'Áreas comunes', image: '/images/luxury-cleaning.jpg', alt: 'Limpieza de áreas comunes en condominios de Cuernavaca', icon: Building2 },
  { title: 'Comercios', subtitle: 'Restaurantes y tiendas', image: '/images/man-cleaning.jpg', alt: 'Limpieza de comercios, restaurantes y tiendas', icon: Store },
  { title: 'Airbnb', subtitle: 'Limpieza entre huéspedes', image: '/images/woman-cleaning-office.jpg', alt: 'Limpieza de Airbnb entre huéspedes en Cuernavaca', icon: Hotel },
];

const specialities = [
  { icon: Sparkles, label: 'Limpieza profunda' },
  { icon: SprayCan, label: 'Desinfección' },
  { icon: Sofa, label: 'Salas y colchones' },
  { icon: PanelsTopLeft, label: 'Cristales' },
  { icon: Hammer, label: 'Post-obra' },
  { icon: Waves, label: 'Pisos y alfombras' },
];

const processSteps = [
  { number: '01', icon: ClipboardList, title: 'Cuéntanos qué necesitas', text: 'Elige tu espacio, tamaño y tipo de limpieza.' },
  { number: '02', icon: CalendarCheck, title: 'Agenda a tu ritmo', text: 'Selecciona fecha, horario y frecuencia ideal.' },
  { number: '03', icon: UsersRound, title: 'Asignamos al equipo', text: 'Personal verificado llega con todo lo necesario.' },
  { number: '04', icon: Camera, title: 'Recibe el resultado', text: 'Supervisión, evidencia y cierre de cada servicio.' },
];

const plans = [
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

const testimonials = [
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

const propertyOptions = [
  { value: 'hogar', label: 'Hogar', icon: HomeIcon },
  { value: 'oficina', label: 'Oficina', icon: Building2 },
  { value: 'comercio', label: 'Comercio', icon: Store },
  { value: 'condominio', label: 'Condominio', icon: Building2 },
  { value: 'airbnb', label: 'Airbnb', icon: Hotel },
];

const extrasList = ['Refrigerador', 'Horno', 'Ventanas', 'Sala o colchón'];

const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      const fallback = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(fallback);
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      }
    }, { threshold: 0.01, rootMargin: '0px 0px -90px 0px', ...options });

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function StatValue({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      const fallback = requestAnimationFrame(() => setCurrent(value));
      return () => cancelAnimationFrame(fallback);
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1500;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/**
 * Dimensiones reales de cada foto y de sus variantes reducidas.
 * Los anchos del `srcset` deben ser los verdaderos: si se declaran de más, el
 * navegador descarga un archivo mayor del necesario.
 */
type PhotoMeta = {
  width: number;
  height: number;
  sources: { suffix: string; width: number }[];
};

const photoMeta: Record<string, PhotoMeta> = {
  '/images/cleaning-crew.jpg': { width: 1024, height: 1024, sources: [{ suffix: '-640', width: 640 }] },
  '/images/luxury-cleaning.jpg': { width: 1024, height: 1024, sources: [{ suffix: '-640', width: 640 }] },
  '/images/cleaning-team-office.jpg': { width: 1600, height: 1066, sources: [{ suffix: '-640', width: 640 }, { suffix: '-1024', width: 1024 }] },
  '/images/professional-team.jpg': { width: 1600, height: 1066, sources: [{ suffix: '-640', width: 640 }, { suffix: '-1024', width: 1024 }] },
  '/images/home-cleaning.jpg': { width: 1344, height: 768, sources: [{ suffix: '-640', width: 640 }, { suffix: '-1024', width: 1024 }] },
  '/images/corporate-cleaning.jpg': { width: 768, height: 1344, sources: [{ suffix: '-640', width: 365 }, { suffix: '-1024', width: 585 }] },
  '/images/detail-cleaning.jpg': { width: 816, height: 1456, sources: [{ suffix: '-640', width: 358 }, { suffix: '-1024', width: 574 }] },
  '/images/man-cleaning.jpg': { width: 1066, height: 1600, sources: [{ suffix: '-640', width: 426 }, { suffix: '-1024', width: 682 }] },
  '/images/office-cleaning.jpg': { width: 1066, height: 1600, sources: [{ suffix: '-640', width: 426 }, { suffix: '-1024', width: 682 }] },
  '/images/woman-cleaning-office.jpg': { width: 1066, height: 1600, sources: [{ suffix: '-640', width: 426 }, { suffix: '-1024', width: 682 }] },
};

/**
 * `<img>` con `srcset`/`sizes`, dimensiones intrínsecas (evita CLS) y carga
 * diferida salvo en el hero, que es el LCP y se marca con `priority`.
 */
function Photo({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const meta = photoMeta[src];
  const srcSet = meta
    ? [
        ...meta.sources.map((source) => `${src.replace('.jpg', `${source.suffix}.jpg`)} ${source.width}w`),
        `${src} ${meta.width}w`,
      ].join(', ')
    : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={meta?.width}
      height={meta?.height}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}

function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* Isotipo de la marca. El alt va vacío: el nombre accesible lo aporta el
          texto contiguo, así los lectores de pantalla no lo anuncian dos veces. */}
      <img
        src="/logo-mark.png"
        alt=""
        width={256}
        height={256}
        className="size-11 shrink-0 object-contain"
        decoding="async"
      />
      <span>
        <span
          className={`block font-display text-[1.28rem] font-extrabold tracking-[.18em] transition-colors duration-300 ${
            inverted ? 'text-white' : 'text-[#07345b]'
          }`}
        >
          PUREVA
        </span>
        <span
          className={`block text-[.58rem] font-bold uppercase tracking-[.24em] transition-colors duration-300 ${
            inverted ? 'text-[#7ce4de]' : 'text-[#129bb0]'
          }`}
        >
          Limpieza profesional
        </span>
      </span>
    </span>
  );
}

function QuickQuote() {
  const [property, setProperty] = useState('hogar');
  const [area, setArea] = useState(80);
  const [bathrooms, setBathrooms] = useState(2);
  const [service, setService] = useState('regular');
  const [frequency, setFrequency] = useState('unica');
  const [extras, setExtras] = useState<string[]>([]);
  const [folio, setFolio] = useState('');

  const estimate = useMemo(() => {
    const base: Record<string, number> = {
      hogar: 220,
      oficina: 460,
      comercio: 520,
      condominio: 630,
      airbnb: 300,
    };
    const areaRate: Record<string, number> = {
      hogar: 4,
      oficina: 5.2,
      comercio: 5.6,
      condominio: 5.8,
      airbnb: 4.4,
    };
    const serviceFactor: Record<string, number> = { regular: 1, profunda: 1.42, mudanza: 1.64 };
    const frequencyFactor: Record<string, number> = { unica: 1, semanal: 0.9, quincenal: 0.94, mensual: 0.97 };
    const raw = (base[property] + area * areaRate[property] + bathrooms * 75 + extras.length * 160) * serviceFactor[service] * frequencyFactor[frequency];
    return Math.max(590, Math.round(raw / 10) * 10);
  }, [area, bathrooms, extras.length, frequency, property, service]);

  function toggleExtra(extra: string) {
    setExtras((current) =>
      current.includes(extra) ? current.filter((item) => item !== extra) : [...current, extra],
    );
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFolio(`PV-${String(Date.now()).slice(-6)}`);
  }

  if (folio) {
    return (
      <div className="grid min-h-[580px] place-items-center rounded-[30px] border border-white/15 bg-white p-7 text-center shadow-[0_40px_90px_rgba(2,24,42,.45)] sm:p-10">
        <div className="max-w-md">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-[#def8f0] to-[#c9f2e6] text-[#078c72] shadow-inner">
            <CheckCircle2 className="size-10" />
          </span>
          <p className="mt-7 text-xs font-black uppercase tracking-[.18em] text-[#0b978e]">Solicitud recibida</p>
          <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-[#07345b]">Tu cotización está en camino</h3>
          <p className="mt-4 leading-7 text-[#5c7485]">
            Folio <strong className="text-[#0d4b69]">{folio}</strong>. Confirmaremos disponibilidad y precio final contigo por WhatsApp.
          </p>
          <div className="mt-7 rounded-2xl bg-gradient-to-br from-[#eff9fa] to-[#e6f6f4] p-5">
            <span className="text-sm font-bold text-[#668091]">Estimación actual</span>
            <strong className="mt-1 block text-3xl font-extrabold text-[#073c64]">{currency.format(estimate)}</strong>
          </div>
          <Button
            nativeButton={false}
            className="btn-shine mt-7 h-13 w-full rounded-full bg-gradient-to-r from-[#08a884] to-[#0bbf8c] px-6 text-base font-extrabold text-white shadow-[0_14px_32px_rgba(8,168,132,.32)] hover:brightness-[1.06]"
            render={<a href={business.whatsappUrl} />}
          >
            <MessageCircle className="size-5" /> Confirmar por WhatsApp
          </Button>
          <button className="mt-5 text-sm font-bold text-[#5c7485] hover:text-[#087e8e]" onClick={() => setFolio('')} type="button">
            Crear otra cotización
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitQuote}
      className="rounded-[30px] border border-white/15 bg-white p-6 text-[#123c58] shadow-[0_40px_90px_rgba(2,24,42,.45)] sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e4eef0] pb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-[.16em] text-[#0b978e]">Cotizador inteligente</span>
          <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-[#07345b]">Configura tu servicio</h3>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-[#eaf8fa] to-[#e2f6f2] px-4 py-2 text-right ring-1 ring-[#d2ecec]">
          <span className="block text-[.65rem] font-black uppercase tracking-[.14em] text-[#708794]">Estimación</span>
          <strong className="text-xl font-extrabold text-[#087d91]">{currency.format(estimate)}</strong>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-extrabold">1. Tipo de espacio</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {propertyOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              className={`property-choice ${property === value ? 'property-choice-active' : ''}`}
              onClick={() => setProperty(value)}
              type="button"
              aria-pressed={property === value}
            >
              <Icon className="size-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="quote-field">
          <span>Superficie aproximada</span>
          <span className="quote-input-wrap">
            <input min="20" max="3000" value={area} onChange={(event) => setArea(Number(event.target.value))} type="number" required />
            <small>m²</small>
          </span>
        </label>
        <label className="quote-field">
          <span>Número de baños</span>
          <span className="quote-input-wrap">
            <input min="1" max="30" value={bathrooms} onChange={(event) => setBathrooms(Number(event.target.value))} type="number" required />
            <small>baños</small>
          </span>
        </label>
        <label className="quote-field">
          <span>Tipo de servicio</span>
          <select value={service} onChange={(event) => setService(event.target.value)}>
            <option value="regular">Limpieza regular</option>
            <option value="profunda">Limpieza profunda</option>
            <option value="mudanza">Mudanza / entrega</option>
          </select>
        </label>
        <label className="quote-field">
          <span>Frecuencia</span>
          <select value={frequency} onChange={(event) => setFrequency(event.target.value)}>
            <option value="unica">Servicio único</option>
            <option value="semanal">Cada semana · ahorra 10%</option>
            <option value="quincenal">Cada 15 días · ahorra 6%</option>
            <option value="mensual">Cada mes · ahorra 3%</option>
          </select>
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-extrabold">2. ¿Quieres agregar algo más?</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {extrasList.map((extra) => {
            const selected = extras.includes(extra);
            return (
              <button
                key={extra}
                type="button"
                onClick={() => toggleExtra(extra)}
                aria-pressed={selected}
                className={`extra-choice ${selected ? 'extra-choice-active' : ''}`}
              >
                <span>{selected ? <Check className="size-4" /> : <Sparkles className="size-4" />}</span>
                {extra}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 border-t border-[#e4eef0] pt-6 sm:grid-cols-3">
        <label className="quote-field">
          <span>Nombre</span>
          <input className="standalone-input" placeholder="Tu nombre" required />
        </label>
        <label className="quote-field">
          <span>WhatsApp</span>
          <input className="standalone-input" inputMode="tel" placeholder="777 000 0000" required />
        </label>
        <label className="quote-field">
          <span>Fecha preferida</span>
          <input className="standalone-input" type="date" required />
        </label>
      </div>

      <div className="mt-7 flex flex-col items-center justify-between gap-5 rounded-2xl bg-gradient-to-br from-[#eff9fa] to-[#e8f6f3] p-5 ring-1 ring-[#dbeeee] sm:flex-row">
        <div>
          <span className="block text-xs font-black uppercase tracking-[.13em] text-[#6a8291]">Precio aproximado desde</span>
          <strong className="mt-1 block text-3xl font-extrabold tracking-tight text-[#073c64]">{currency.format(estimate)} MXN</strong>
          <span className="text-xs font-semibold text-[#758a98]">El precio final se confirma antes de reservar.</span>
        </div>
        <Button
          type="submit"
          className="btn-shine h-14 w-full rounded-full bg-gradient-to-r from-[#08a884] to-[#0cc08d] px-7 text-base font-extrabold text-white shadow-[0_14px_32px_rgba(8,168,132,.3)] transition hover:-translate-y-0.5 hover:brightness-[1.06] sm:w-auto"
        >
          Solicitar cotización <ArrowRight className="size-5" />
        </Button>
      </div>
    </form>
  );
}

export default function Home() {
  const [heroProperty, setHeroProperty] = useState('hogar');
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 28);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    }

    const initial = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-[#e3eef0] bg-white/92 shadow-[0_10px_34px_rgba(4,42,69,.08)] backdrop-blur-xl'
            : 'border-b border-white/10 bg-transparent'
        }`}
      >
        <div className="site-shell flex h-[76px] items-center justify-between gap-5">
          <a href="#inicio" aria-label="PUREVA, inicio"><Brand inverted={!scrolled} /></a>

          <nav
            className={`hidden items-center gap-4 text-sm font-semibold lg:flex xl:gap-6 ${scrolled ? 'text-[#3d566c]' : 'text-white/80'}`}
            aria-label="Navegación principal"
          >
            {navItems.map((item) => (
              <a key={item.label} className={`nav-link ${scrolled ? 'nav-link-light' : 'nav-link-dark'}`} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Button
              nativeButton={false}
              variant="ghost"
              className={`hidden h-11 rounded-full px-4 font-bold xl:inline-flex ${
                scrolled ? 'text-[#0c496d]' : 'text-white hover:bg-white/12 hover:text-white'
              }`}
              render={<a href="#contacto" />}
            >
              Contacto
            </Button>
            <Button
              nativeButton={false}
              className="btn-shine hidden h-11 rounded-full bg-gradient-to-r from-[#08a884] to-[#0cc08d] px-5 font-extrabold text-white shadow-[0_10px_26px_rgba(8,168,132,.3)] transition hover:-translate-y-0.5 hover:brightness-[1.06] sm:inline-flex"
              render={<a href="#cotizar" />}
            >
              Cotizar ahora <ArrowRight className="size-4" />
            </Button>
            <Sheet>
              <SheetTrigger
                className={`grid size-11 place-items-center rounded-full border transition lg:hidden ${
                  scrolled
                    ? 'border-[#dbe8eb] text-[#0c4d6d] hover:bg-[#eff8f9]'
                    : 'border-white/25 text-white hover:bg-white/12'
                }`}
                aria-label="Abrir menú"
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent className="w-[88%] border-l-0 bg-[#f8fcfc] p-0 sm:max-w-[390px]">
                <SheetHeader className="border-b border-[#dfeaec] p-6 text-left">
                  <SheetTitle><Brand /></SheetTitle>
                  <SheetDescription>Servicios profesionales para cada espacio.</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col px-4 py-5" aria-label="Menú móvil">
                  {navItems.map((item) => (
                    <SheetClose
                      key={item.label}
                      render={<a href={item.href} className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-extrabold text-[#214e69] transition hover:bg-white" />}
                    >
                      {item.label} <ChevronRight className="size-4 text-[#119eac]" />
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto p-5">
                  <SheetClose render={<a href="#cotizar" className="flex h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#08a884] to-[#0cc08d] px-5 font-extrabold text-white" />}>
                    Cotizar ahora <ArrowRight className="size-4" />
                  </SheetClose>
                  <a className="mt-3 flex h-13 items-center justify-center gap-2 rounded-full border border-[#cfe1e5] bg-white font-extrabold text-[#0c5672]" href={business.whatsappUrl}>
                    <MessageCircle className="size-5 text-[#08a884]" /> WhatsApp
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="inicio" className="relative isolate overflow-hidden bg-[#04233c] pt-[76px] text-white">
        <div className="absolute inset-0 -z-10">
          <Photo
            src="/images/cleaning-crew.jpg"
            alt="Equipo de limpieza profesional de PUREVA trabajando en el lobby de un edificio corporativo en Cuernavaca"
            sizes="100vw"
            priority
            className="h-full w-full scale-105 object-cover object-[center_46%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(103deg,rgba(4,35,60,.94)_0%,rgba(4,35,60,.82)_30%,rgba(4,35,60,.45)_56%,rgba(3,26,45,.12)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(13,180,180,.2),transparent_48%),radial-gradient(circle_at_84%_78%,rgba(8,168,132,.16),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,35,60,.42)_0%,rgba(4,35,60,.3)_50%,rgba(4,35,60,.5)_100%)] lg:hidden" />
          <div className="orb pv-float-slow left-[-6%] top-[12%] size-[420px] bg-[#0eb5b0]/16" />
          <div className="orb pv-float right-[6%] top-[46%] size-[320px] bg-[#08a884]/14" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <div className="site-shell relative grid min-h-[540px] items-center gap-10 py-14 sm:min-h-[600px] sm:py-16 lg:min-h-[660px] lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          <div className="max-w-[660px]">
            <div className="glass-panel mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#b9f2ea]">
              <Sparkles className="size-4 text-[#5fe6cd]" /> Espacios más limpios, vidas más tranquilas
            </div>

            <h1 className="max-w-[640px] text-balance font-display text-[clamp(3rem,5.6vw,5.4rem)] font-extrabold leading-[.96] tracking-[-.04em]">
              Limpieza profesional en Cuernavaca{' '}
              <span className="text-gradient-brand">donde la necesitas.</span>
            </h1>

            <p className="mt-7 max-w-[560px] text-pretty text-lg leading-8 text-[#b6d2dd] sm:text-xl">
              Empresa de limpieza para hogares, oficinas, colegios, comercios, condominios y Airbnb en Cuernavaca y su zona
              metropolitana. Personal capacitado, supervisión e insumos incluidos.
            </p>

            <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
              <Button
                nativeButton={false}
                className="btn-shine h-14 rounded-full bg-gradient-to-r from-[#08a884] to-[#0dc794] px-7 text-base font-extrabold text-white shadow-[0_18px_42px_rgba(8,168,132,.4)] transition hover:-translate-y-0.5 hover:brightness-[1.07]"
                render={<a href="#cotizar" />}
              >
                Cotizar mi servicio <ArrowRight className="size-5" />
              </Button>
              <Button
                nativeButton={false}
                variant="outline"
                className="h-14 rounded-full border-white/25 bg-white/10 px-6 text-base font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/18 hover:text-white"
                render={<a href={business.whatsappUrl} aria-label="Escribir a PUREVA por WhatsApp" />}
              >
                <MessageCircle className="size-5 text-[#4fe3bd]" /> WhatsApp
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="flex items-center gap-0.5 text-[#f4b23c]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </span>
              <span className="text-sm font-semibold text-[#a9c8d4]">
                <strong className="font-extrabold text-white">4.9/5</strong> en satisfacción · +850 servicios completados
              </span>
            </div>

            <div className="mt-9 grid max-w-[620px] gap-2.5 sm:grid-cols-3">
              {trustItems.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/12 bg-white/6 px-3 py-2.5 text-sm font-bold text-[#dbeef3] backdrop-blur-sm"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#0eb8a0]/22 text-[#5fe6cd]">
                    <Icon className="size-[17px]" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <aside className="relative ml-auto hidden w-full max-w-[420px] lg:block">
            <div className="pv-float glass-panel relative rounded-[28px] bg-[#05304d]/62 p-6 shadow-[0_40px_90px_rgba(2,22,38,.55)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#6fe3d2]">Cotizador rápido</p>
                  <p className="mt-1 font-display text-2xl font-extrabold tracking-tight text-white">¿Qué espacio limpiamos?</p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/12 text-[#7ae9d8] ring-1 ring-white/20">
                  <Sparkles className="size-5" />
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {propertyOptions.slice(0, 4).map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    className={`quote-choice ${heroProperty === value ? 'quote-choice-active' : ''}`}
                    type="button"
                    onClick={() => setHeroProperty(value)}
                    aria-pressed={heroProperty === value}
                  >
                    <Icon className="size-5" /> {label} {heroProperty === value && <Check className="ml-auto size-4 text-[#5fe6cd]" />}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/12 bg-[#032438]/55 p-4">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-[.12em] text-[#8fb3c2]">Estimación desde</span>
                  <span className="mt-1 block font-display text-2xl font-extrabold text-white">$690 MXN</span>
                </div>
                <Button
                  nativeButton={false}
                  className="btn-shine h-11 rounded-full bg-gradient-to-r from-[#08a884] to-[#0cc08d] px-5 font-extrabold text-white shadow-[0_10px_24px_rgba(8,168,132,.35)] hover:brightness-[1.06]"
                  render={<a href="#cotizar" />}
                >
                  Continuar <ArrowRight />
                </Button>
              </div>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#93b6c4]">
                <ShieldCheck className="size-4 text-[#4fe3bd]" /> Sin compromiso · respuesta inmediata
              </p>
            </div>
          </aside>
        </div>

        <div className="h-24 sm:h-28" />
      </section>

      {/* ---------------- STATS + MARQUEE ---------------- */}
      <div className="relative z-20 -mt-24 sm:-mt-28">
        <div className="site-shell">
          <div className="stat-strip grid grid-cols-2 overflow-hidden sm:grid-cols-4">
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`px-4 py-6 text-center sm:px-6 ${index > 0 ? 'border-l border-[#e3edef]' : ''} ${index === 2 ? 'max-sm:border-l-0 max-sm:border-t' : ''} ${index === 3 ? 'max-sm:border-t' : ''}`}
              >
                <strong className="text-gradient-ink block font-display text-[1.9rem] font-extrabold tracking-tight">
                  <StatValue value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                </strong>
                <span className="mt-1 block text-xs font-bold text-[#657f90]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-mask mt-10 overflow-hidden border-y border-[#e4eef0] bg-[#f7fbfb] py-4">
          <div className="marquee-track gap-8">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex shrink-0 items-center gap-3 text-sm font-extrabold uppercase tracking-[.13em] text-[#3f6577]"
              >
                <Droplets className="size-4 text-[#0fb1a6]" /> {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- SERVICIOS ---------------- */}
      <section id="servicios" aria-labelledby="servicios-title" className="relative scroll-mt-20 pb-24 pt-24 sm:pb-32 sm:pt-28">
        <div className="dot-pattern pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-45 [mask-image:linear-gradient(180deg,#000,transparent)]" />
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
            <Reveal>
              <span className="section-kicker">Servicios que se adaptan</span>
              <h2 id="servicios-title" className="section-title mt-4">
                Servicios de limpieza para <span className="text-gradient-ink">cada espacio.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-2xl text-lg leading-8 text-[#5a7283] lg:justify-self-end">
                Diseñamos cada servicio según el inmueble, la frecuencia y el resultado que buscas. Tú eliges el nivel de atención; nosotros coordinamos al equipo, los insumos y la supervisión.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={index * 110} className="h-full">
                  <article id={service.id} className={`service-card group h-full ${service.tone === 'dark' ? 'service-card-dark' : ''}`}>
                    <div className="relative h-56 overflow-hidden sm:h-64">
                      <Photo
                        src={service.image}
                        alt={service.alt}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#061f33]/65 via-[#061f33]/10 to-transparent" />
                      <span className="absolute left-5 top-5 grid size-11 place-items-center rounded-2xl bg-white/92 text-[#098fa1] shadow-lg backdrop-blur transition duration-500 group-hover:scale-110 group-hover:bg-white">
                        <Icon className="size-5" />
                      </span>
                    </div>
                    <div className="p-6 sm:p-7">
                      <span className={`text-xs font-black uppercase tracking-[.16em] ${service.tone === 'dark' ? 'text-[#5fe0d4]' : 'text-[#0aa196]'}`}>
                        {service.eyebrow}
                      </span>
                      <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">{service.title}</h3>
                      <p className={`mt-3 leading-7 ${service.tone === 'dark' ? 'text-[#b8ced9]' : 'text-[#627989]'}`}>{service.description}</p>
                      <ul className="mt-5 space-y-2.5">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-sm font-bold">
                            <CheckCircle2 className={`size-4 ${service.tone === 'dark' ? 'text-[#4fdcc4]' : 'text-[#16ae91]'}`} /> {feature}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#cotizar"
                        className={`mt-7 inline-flex items-center gap-2 text-sm font-black ${service.tone === 'dark' ? 'text-[#6de3d6]' : 'text-[#0997a2]'}`}
                      >
                        Ver opciones <ArrowRight className="size-4 transition group-hover:translate-x-1.5" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- COTIZADOR ---------------- */}
      <section id="cotizar" aria-labelledby="cotizar-title" className="relative isolate scroll-mt-16 overflow-hidden bg-[#052f47] py-24 text-white sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(13,180,180,.26),transparent_45%),radial-gradient(circle_at_88%_82%,rgba(8,168,132,.24),transparent_48%)]" />
          <div className="grid-pattern absolute inset-0 opacity-70" />
        </div>

        <div className="site-shell grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.17em] text-[#68ddd6]">
              <Zap className="size-4" /> Cotiza en menos de 2 minutos
            </span>
            <h2 id="cotizar-title" className="mt-4 max-w-lg text-balance font-display text-[clamp(2rem,5.4vw,3.1rem)] font-extrabold leading-[1.05] tracking-[-.035em]">
              Cotiza tu limpieza en Cuernavaca: <span className="text-gradient-brand">un precio claro.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#b9d1da]">
              Obtén una estimación inmediata y personaliza el servicio. Un especialista confirmará los detalles antes de reservar.
            </p>
            <div className="mt-9 space-y-4">
              {[
                'Sin pagos ni cargos en este paso',
                'Descuentos por servicio recurrente',
                'Atención personalizada por WhatsApp',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-bold text-[#e4f4f5]">
                  <span className="grid size-8 place-items-center rounded-full bg-white/10 text-[#65ded4] ring-1 ring-white/15">
                    <Check className="size-4" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <QuickQuote />
          </Reveal>
        </div>
      </section>

      {/* ---------------- SECTORES ---------------- */}
      <section id="sectores" aria-labelledby="sectores-title" className="scroll-mt-20 bg-gradient-to-b from-[#f3f8f9] to-[#eef7f7] py-24 sm:py-32">
        <div className="site-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="section-kicker">Experiencia multisector</span>
            <h2 id="sectores-title" className="section-title mx-auto mt-4">
              Limpieza especializada para la forma en que <span className="text-gradient-ink">usas tu espacio.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#61798a]">Protocolos, horarios y equipos distintos para cada tipo de inmueble.</p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map(({ title, subtitle, image, alt, icon: Icon }, index) => (
              <Reveal key={title} delay={(index % 3) * 110} className="h-full">
                <a href="#cotizar" className="sector-card group h-full">
                  <Photo
                    src={image}
                    alt={alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#04253c]/92 via-[#04253c]/25 to-transparent transition duration-500 group-hover:from-[#04253c]/95" />
                  <span className="relative mt-auto flex items-end justify-between gap-4 p-6 text-white">
                    <span>
                      <span className="block font-display text-2xl font-extrabold tracking-tight">{title}</span>
                      <span className="mt-1 block text-sm font-semibold text-white/78">{subtitle}</span>
                    </span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur transition duration-300 group-hover:bg-[#0eb5a8] group-hover:ring-[#0eb5a8]">
                      <Icon className="size-5" />
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {specialities.map(({ icon: Icon, label }, index) => (
              <Reveal key={label} delay={index * 70} className="h-full">
                <a href="#cotizar" className="feature-tile flex h-full min-h-28 flex-col items-center justify-center gap-3 p-4 text-center text-sm font-extrabold text-[#31566d] hover:text-[#078793]">
                  <Icon className="size-7 text-[#0aa49e]" strokeWidth={1.7} /> {label}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PROCESO ---------------- */}
      <section id="proceso" aria-labelledby="proceso-title" className="scroll-mt-20 py-24 sm:py-32">
        <div className="site-shell">
          <Reveal className="max-w-2xl">
            <span className="section-kicker">Así de sencillo</span>
            <h2 id="proceso-title" className="section-title mt-4">
              De tu solicitud a un <span className="text-gradient-ink">espacio impecable.</span>
            </h2>
          </Reveal>

          <div className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-[4.2rem] hidden h-0.5 bg-[linear-gradient(90deg,transparent,#9fd4d8_12%,#9fd4d8_88%,transparent)] lg:block" />
            {processSteps.map(({ number, icon: Icon, title, text }, index) => (
              <Reveal key={number} delay={index * 110} className="h-full">
                <article className="step-card h-full p-6">
                  <div className="flex items-center justify-between">
                    <span className="relative z-10 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-[#e8f8f6] to-[#d8f2ee] text-[#078d81] ring-1 ring-[#c6ebe5]">
                      <Icon className="size-7" />
                    </span>
                    <span className="font-display text-4xl font-extrabold tracking-[-.06em] text-[#d9eaec]">{number}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-[#103e5b]">{title}</h3>
                  <p className="mt-3 leading-7 text-[#657d8c]">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- EMPRESAS ---------------- */}
      <section id="empresas" aria-labelledby="empresas-title" className="scroll-mt-20 pb-24 sm:pb-32">
        <Reveal>
          <div className="site-shell relative isolate overflow-hidden rounded-[36px] bg-[#052c47] text-white shadow-[0_40px_100px_rgba(4,35,60,.28)]">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(13,180,180,.28),transparent_45%)]" />
            <div className="grid lg:grid-cols-[1.02fr_.98fr]">
              <div className="relative min-h-[300px] sm:min-h-[420px] lg:min-h-[650px]">
                <Photo
                  src="/images/professional-team.jpg"
                  alt="Personal de limpieza empresarial de PUREVA dando servicio en una oficina corporativa"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052c47]/75 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#052c47]/35" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl border border-white/20 bg-[#052c47]/78 p-4 backdrop-blur-lg sm:left-8 sm:right-auto sm:max-w-sm">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#13aa9e] to-[#0dc08f] text-white">
                    <FileCheck2 className="size-5" />
                  </span>
                  <span>
                    <strong className="block text-sm">Operación documentada</strong>
                    <span className="text-xs text-white/65">Checklist, supervisión y reportes</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
                <span className="section-kicker section-kicker-light">Soluciones empresariales</span>
                <h2 id="empresas-title" className="mt-4 text-balance font-display text-[clamp(2rem,5.4vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-.035em]">
                  Limpieza de oficinas y empresas: <span className="text-gradient-brand">un aliado operativo.</span>
                </h2>
                <p className="mt-6 text-lg leading-8 text-[#b8cfda]">
                  Diseñamos planes para oficinas, colegios, condominios, comercios y múltiples ubicaciones con control de calidad y atención centralizada.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {['Personal asignado', 'Supervisor responsable', 'Control de asistencia', 'Reportes periódicos', 'Suministro de consumibles', 'Facturación y contrato'].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm font-bold text-[#ecf8f8]">
                      <CheckCircle2 className="size-4 text-[#42d3c4]" /> {item}
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button
                    nativeButton={false}
                    className="btn-shine h-13 rounded-full bg-gradient-to-r from-[#10aa96] to-[#0dc08f] px-6 text-base font-extrabold text-white shadow-[0_14px_32px_rgba(13,192,143,.28)] transition hover:-translate-y-0.5 hover:brightness-[1.06]"
                    render={<a href="#contacto" />}
                  >
                    Solicitar propuesta <ArrowRight className="size-5" />
                  </Button>
                  <Button
                    nativeButton={false}
                    variant="outline"
                    className="h-13 rounded-full border-white/25 bg-white/6 px-6 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/14 hover:text-white"
                    render={<a href={`tel:${business.phone}`} />}
                  >
                    <Phone className="size-4" /> Hablar con un asesor
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- PLANES ---------------- */}
      <section id="planes" aria-labelledby="planes-title" className="scroll-mt-20 bg-gradient-to-b from-[#f3f8f9] to-[#eef7f7] py-24 sm:py-32">
        <div className="site-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="section-kicker">Planes residenciales</span>
            <h2 id="planes-title" className="section-title mx-auto mt-4">
              Precios de limpieza para <span className="text-gradient-ink">tu hogar.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#61798a]">
              Precios de referencia para una vivienda de hasta 80 m². Personaliza cualquier plan en el cotizador.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3 md:items-center">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 110} className="h-full">
                <article
                  className={`relative flex h-full flex-col rounded-[28px] border p-6 transition duration-300 lg:p-7 ${
                    plan.featured
                      ? 'border-[#0aa89b] bg-gradient-to-br from-[#08425f] to-[#052f47] text-white shadow-[0_34px_80px_rgba(6,56,84,.3)] md:scale-[1.045]'
                      : 'border-[#dce9eb] bg-white text-[#143f5a] shadow-[0_16px_45px_rgba(10,64,87,.06)] hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(10,64,87,.12)]'
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#14b59f] to-[#0dc08f] px-4 py-1.5 text-[.68rem] font-black uppercase tracking-[.15em] text-white shadow-[0_10px_24px_rgba(13,192,143,.4)]">
                      Más elegido
                    </span>
                  )}
                  <span className={`text-xs font-black uppercase tracking-[.16em] ${plan.featured ? 'text-[#63ddd4]' : 'text-[#0b9b93]'}`}>Plan</span>
                  <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight lg:text-3xl">{plan.name}</h3>
                  <p className={`mt-2 text-sm ${plan.featured ? 'text-[#b9ced8]' : 'text-[#6b8190]'}`}>{plan.subtitle}</p>
                  <strong className="mt-7 font-display text-2xl font-extrabold">{plan.price}</strong>
                  <span className={`mt-1 text-xs font-semibold ${plan.featured ? 'text-[#9bb8c6]' : 'text-[#7d919d]'}`}>por servicio · precio estimado</span>
                  <ul className="mt-7 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-sm font-bold">
                        <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${plan.featured ? 'text-[#50d5c8]' : 'text-[#10a88d]'}`} /> {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    nativeButton={false}
                    variant={plan.featured ? 'default' : 'outline'}
                    className={`mt-8 h-12 w-full rounded-full font-extrabold ${
                      plan.featured
                        ? 'btn-shine bg-gradient-to-r from-[#11ad97] to-[#0dc08f] text-white shadow-[0_12px_28px_rgba(13,192,143,.3)] hover:brightness-[1.06]'
                        : 'border-[#bfd9dd] text-[#0a7182] hover:bg-[#ecf8f8]'
                    }`}
                    render={<a href="#cotizar" />}
                  >
                    Elegir {plan.name} <ArrowRight />
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- NOSOTROS ---------------- */}
      <section id="nosotros" aria-labelledby="nosotros-title" className="scroll-mt-20 py-24 sm:py-32">
        <div className="site-shell grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="relative min-h-[360px] overflow-hidden rounded-[34px] shadow-[0_30px_80px_rgba(4,42,69,.18)] sm:min-h-[460px] lg:min-h-[520px]">
              <Photo
                src="/images/luxury-cleaning.jpg"
                alt="Equipo de PUREVA realizando limpieza profunda y detallada en una residencia de Cuernavaca"
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#042f4b]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-white/94 p-5 text-[#153f59] shadow-xl backdrop-blur sm:left-auto sm:max-w-[300px]">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0aa3ad] to-[#0bb59c] text-white">
                    <ShieldCheck className="size-5" />
                  </span>
                  <span>
                    <strong className="block text-sm font-extrabold">Servicio supervisado</strong>
                    <span className="text-xs font-semibold text-[#748994]">Checklist y evidencia en cada visita</span>
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-4 border-t border-[#e8f0f1] pt-4">
                  <span>
                    <strong className="block font-display text-xl font-extrabold text-[#0a7f92]">4.9/5</strong>
                    <span className="text-[.68rem] font-bold uppercase tracking-[.1em] text-[#8399a4]">Satisfacción</span>
                  </span>
                  <span className="h-8 w-px bg-[#e3ecee]" />
                  <span>
                    <strong className="block font-display text-xl font-extrabold text-[#0a7f92]">+850</strong>
                    <span className="text-[.68rem] font-bold uppercase tracking-[.1em] text-[#8399a4]">Servicios</span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:pl-8">
            <span className="section-kicker">Confianza que se nota</span>
            <h2 id="nosotros-title" className="section-title mt-4">
              Cuidamos tu espacio con <span className="text-gradient-ink">método, personas y tecnología.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#607888]">
              PUREVA combina atención humana con procesos claros. Cada servicio se prepara, asigna y supervisa para ofrecer resultados consistentes, ya sea en un hogar o en una operación empresarial.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: 'Personal confiable', text: 'Selección, identificación y capacitación.' },
                { icon: ClipboardCheck, title: 'Calidad controlada', text: 'Checklists y seguimiento por servicio.' },
                { icon: Leaf, title: 'Productos profesionales', text: 'Soluciones eficaces para cada superficie.' },
                { icon: Heart, title: 'Atención cercana', text: 'Acompañamiento antes, durante y después.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="feature-tile p-5">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-[#e8f8f6] to-[#d8f2ee] text-[#0b9d94] ring-1 ring-[#c9ebe6]">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display font-extrabold text-[#16435e]">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#6a8190]">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- TESTIMONIOS ---------------- */}
      <section id="opiniones" aria-labelledby="opiniones-title" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#f3f8f9] to-[#eef7f7] py-24 sm:py-28">
        <div className="site-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="section-kicker">Lo que dicen nuestros clientes</span>
            <h2 id="opiniones-title" className="section-title mx-auto mt-4">
              Resultados que se <span className="text-gradient-ink">recomiendan solos.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 110} className="h-full">
                <figure className="testimonial-card h-full p-7">
                  <Quote className="size-8 text-[#b7e5e2]" />
                  <div className="mt-4 flex items-center gap-1 text-[#f4b23c]">
                    {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="size-4 fill-current" />)}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[1.02rem] font-medium leading-7 text-[#46647a]">“{item.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-[#e8f0f1] pt-5">
                    <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-[#0aa3ad] to-[#0bb59c] font-display text-sm font-extrabold text-white">
                      {item.name.charAt(0)}
                    </span>
                    <span>
                      <strong className="block text-sm font-extrabold text-[#143f5a]">{item.name}</strong>
                      <span className="text-xs font-semibold text-[#7b8f9b]">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 py-24 sm:py-32">
        <div className="site-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <span className="section-kicker">Preguntas frecuentes</span>
            <h2 id="faq-title" className="section-title mt-4">Preguntas frecuentes sobre nuestro servicio de limpieza.</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-[#627989]">
              Si no encuentras lo que buscas, escríbenos. Una persona de nuestro equipo te responde.
            </p>
            <Button
              nativeButton={false}
              variant="outline"
              className="mt-7 h-12 rounded-full border-[#bfdadd] px-5 font-extrabold text-[#0b7280] transition hover:-translate-y-0.5 hover:bg-[#eefafa]"
              render={<a href={business.whatsappUrl} />}
            >
              <MessageCircle className="size-5 text-[#0aa38d]" /> Resolver otra duda
            </Button>
          </Reveal>

          <Reveal delay={120}>
            <Accordion className="rounded-[26px] border border-[#dce8eb] bg-white px-5 shadow-[0_16px_50px_rgba(10,64,87,.06)] sm:px-7">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question} className="border-[#e3ecee]">
                  <AccordionTrigger className="py-5 text-base font-extrabold text-[#19455f] hover:no-underline sm:text-lg">{faq.question}</AccordionTrigger>
                  <AccordionContent className="pb-5 pr-8 text-[.95rem] leading-7 text-[#647d8d]">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section id="contacto" aria-labelledby="contacto-title" className="scroll-mt-20 px-3 pb-3 sm:px-5 sm:pb-5">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[34px] bg-gradient-to-br from-[#0aa39b] via-[#08a497] to-[#0b8fa6] text-white">
            <div className="absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(circle_at_15%_20%,white_0,transparent_32%),radial-gradient(circle_at_88%_82%,#063c62_0,transparent_38%)]" />
            <div className="grid-pattern absolute inset-0 -z-10 opacity-60" />
            <div className="orb pv-float-slow -left-[8%] top-[-20%] size-[380px] bg-white/18" />

            <div className="site-shell relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
              <div>
                <span className="text-xs font-black uppercase tracking-[.18em] text-white/75">Tu espacio puede sentirse mejor</span>
                <h2 id="contacto-title" className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.1rem,6.2vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-.035em]">
                  Hagamos de la limpieza una cosa menos en qué pensar.
                </h2>
              </div>
              <div className="rounded-[26px] border border-white/25 bg-white/14 p-6 shadow-[0_26px_60px_rgba(3,45,60,.22)] backdrop-blur-md sm:p-7">
                <p className="text-lg font-bold leading-7">Cotiza hoy y recibe atención personalizada para tu hogar o empresa.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <a
                    href={business.whatsappUrl}
                    className="btn-shine flex h-13 items-center justify-center gap-2 rounded-full bg-white px-5 font-black text-[#08796f] transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <MessageCircle className="size-5" /> {business.whatsappDisplay}
                  </a>
                  <a
                    href={`tel:${business.phone}`}
                    className="flex h-13 items-center justify-center gap-2 rounded-full border border-white/30 bg-[#063c5e] px-5 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#05334f]"
                  >
                    <Phone className="size-4" /> {business.phoneDisplay}
                  </a>
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/78">
                  <MapPin className="size-4" /> Cuernavaca, Morelos
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="relative overflow-hidden bg-[#04233c] py-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(13,180,180,.16),transparent_45%)]" />
        <div className="site-shell relative">
          <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
            <div>
              <Brand inverted />
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#a9c1cc]">
                Servicios profesionales de limpieza para hogares, empresas e instituciones. Ambientes que inspiran.
              </p>
              {socialLinks.some((link) => link.url) && (
                <div className="mt-6 flex gap-2">
                  {socialLinks
                    .filter((link) => link.url)
                    .map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label={`${business.name} en ${link.label}`}
                        className="grid size-10 place-items-center rounded-full border border-white/14 text-[.68rem] font-black uppercase tracking-wide text-[#b7ced7] transition hover:-translate-y-0.5 hover:border-[#55d7cc] hover:bg-white/8 hover:text-white"
                      >
                        {link.short}
                      </a>
                    ))}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[.14em] text-[#6adbd3]">Servicios</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-[#b4c9d2]">
                <li><a href="#hogar" className="transition hover:text-white">Limpieza residencial</a></li>
                <li><a href="#empresas" className="transition hover:text-white">Limpieza empresarial</a></li>
                <li><a href="#servicios" className="transition hover:text-white">Servicios especializados</a></li>
                <li><a href="#sectores" className="transition hover:text-white">Sectores</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[.14em] text-[#6adbd3]">PUREVA</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-[#b4c9d2]">
                <li><a href="#nosotros" className="transition hover:text-white">Nosotros</a></li>
                <li><a href="#planes" className="transition hover:text-white">Planes</a></li>
                <li><a href="#cotizar" className="transition hover:text-white">Cotizar</a></li>
                <li><a href="#contacto" className="transition hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[.14em] text-[#6adbd3]">Contacto</h3>
              <ul className="mt-5 space-y-4 text-sm font-semibold text-[#b4c9d2]">
                <li><a className="flex gap-2.5 transition hover:text-white" href={`tel:${business.phone}`}><Phone className="mt-0.5 size-4 shrink-0 text-[#5bd2c8]" /> {business.phoneDisplay}</a></li>
                <li><a className="flex gap-2.5 transition hover:text-white" href={`mailto:${business.email}`}><Mail className="mt-0.5 size-4 shrink-0 text-[#5bd2c8]" /> {business.email}</a></li>
                <li><span className="flex gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-[#5bd2c8]" /> Cuernavaca, Morelos</span></li>
              </ul>
            </div>
          </div>
          <div className="border-b border-white/10 py-8">
            <h3 className="text-sm font-black uppercase tracking-[.14em] text-[#6adbd3]">Zonas de servicio</h3>
            <p className="mt-4 text-sm leading-7 text-[#a9c1cc]">
              Damos servicio de limpieza en{' '}
              {coverage.map((city, index) => (
                <span key={city}>
                  {index > 0 && ' · '}
                  <strong className="font-bold text-[#d3e6ed]">{city}</strong>
                </span>
              ))}{' '}
              y el resto de la zona metropolitana de {business.address.region}.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-7 text-xs font-semibold text-[#88a7b5] sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 {business.legalName}. Todos los derechos reservados.</span>
            <address className="not-italic">
              {business.address.locality}, {business.address.region}, México · {business.phoneDisplay}
            </address>
          </div>
        </div>
      </footer>

      <a
        href={business.whatsappUrl}
        aria-label="Cotizar por WhatsApp"
        className="whatsapp-fab fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[#12b76a] px-4 text-sm font-black text-white shadow-[0_16px_35px_rgba(18,183,106,.36)] transition hover:-translate-y-1 hover:bg-[#0da35d] sm:px-5"
      >
        <MessageCircle className="size-5" /><span className="hidden sm:inline">WhatsApp</span>
      </a>
    </main>
  );
}
