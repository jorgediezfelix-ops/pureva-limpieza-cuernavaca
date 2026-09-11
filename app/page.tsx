'use client';

import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
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
    id: 'empresas',
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
  { title: 'Hogares', subtitle: 'Casas y departamentos', image: '/images/home-cleaning.jpg', icon: HomeIcon },
  { title: 'Oficinas', subtitle: 'Espacios de trabajo', image: '/images/office-cleaning.jpg', icon: Building2 },
  { title: 'Colegios', subtitle: 'Instituciones educativas', image: '/images/corporate-cleaning.jpg', icon: GraduationCap },
  { title: 'Condominios', subtitle: 'Áreas comunes', image: '/images/luxury-cleaning.png', icon: Building2 },
  { title: 'Comercios', subtitle: 'Restaurantes y tiendas', image: '/images/man-cleaning.jpg', icon: Store },
  { title: 'Airbnb', subtitle: 'Limpieza entre huéspedes', image: '/images/woman-cleaning-office.jpg', icon: Hotel },
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

const faqs = [
  {
    question: '¿El personal está capacitado y verificado?',
    answer:
      'Sí. Nuestro proceso contempla validación, capacitación por protocolos y supervisión. El personal llega identificado y con el equipo requerido para el servicio contratado.',
  },
  {
    question: '¿Tengo que proporcionar productos o equipo?',
    answer:
      'No. Llevamos productos, microfibras y equipo profesional. Si tu inmueble requiere un tratamiento o material especial, lo confirmamos contigo antes de la visita.',
  },
  {
    question: '¿Puedo contratar un servicio recurrente?',
    answer:
      'Claro. Puedes elegir frecuencia semanal, dos o tres veces por semana, quincenal o mensual. Las frecuencias recurrentes obtienen mejores condiciones y continuidad de equipo.',
  },
  {
    question: '¿Cómo cotizan oficinas, condominios o colegios?',
    answer:
      'Comenzamos con un diagnóstico y, cuando se necesita, coordinamos una visita técnica sin costo. Después entregamos una propuesta con alcance, personal, horarios, supervisión y precio.',
  },
  {
    question: '¿En qué zonas brindan servicio?',
    answer:
      'Nuestra operación principal está en Cuernavaca y su zona metropolitana. Confirma tu colonia en el cotizador o por WhatsApp para validar disponibilidad.',
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

function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`grid size-10 place-items-center rounded-2xl shadow-[0_8px_24px_rgba(5,143,163,.22)] ${
          inverted ? 'bg-white text-[#078fa3]' : 'bg-primary text-white'
        }`}
      >
        <Droplets className="size-6" strokeWidth={1.8} />
      </span>
      <span>
        <span className={`block text-[1.28rem] font-black tracking-[.18em] ${inverted ? 'text-white' : 'text-[#07345b]'}`}>PUREVA</span>
        <span className={`block text-[.58rem] font-bold uppercase tracking-[.24em] ${inverted ? 'text-[#76e1dd]' : 'text-[#129bb0]'}`}>
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
      <div className="grid min-h-[580px] place-items-center rounded-[30px] border border-white/15 bg-white p-7 text-center shadow-2xl sm:p-10">
        <div className="max-w-md">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#def8f0] text-[#078c72]">
            <CheckCircle2 className="size-10" />
          </span>
          <p className="mt-7 text-xs font-black uppercase tracking-[.18em] text-[#0b978e]">Solicitud recibida</p>
          <h3 className="mt-3 text-3xl font-black tracking-tight text-[#07345b]">Tu cotización está en camino</h3>
          <p className="mt-4 leading-7 text-[#5c7485]">
            Folio <strong className="text-[#0d4b69]">{folio}</strong>. Confirmaremos disponibilidad y precio final contigo por WhatsApp.
          </p>
          <div className="mt-7 rounded-2xl bg-[#eff9fa] p-5">
            <span className="text-sm font-bold text-[#668091]">Estimación actual</span>
            <strong className="mt-1 block text-3xl font-black text-[#073c64]">{currency.format(estimate)}</strong>
          </div>
          <Button
            nativeButton={false}
            className="mt-7 h-13 w-full rounded-full bg-[#08a884] px-6 text-base font-extrabold text-white hover:bg-[#078f72]"
            render={<a href="https://wa.me/527775560211" />}
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
    <form onSubmit={submitQuote} className="rounded-[30px] border border-white/15 bg-white p-6 text-[#123c58] shadow-2xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e4eef0] pb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-[.16em] text-[#0b978e]">Cotizador inteligente</span>
          <h3 className="mt-1 text-2xl font-black tracking-tight text-[#07345b]">Configura tu servicio</h3>
        </div>
        <div className="rounded-2xl bg-[#eaf8fa] px-4 py-2 text-right">
          <span className="block text-[.65rem] font-black uppercase tracking-[.14em] text-[#708794]">Estimación</span>
          <strong className="text-xl font-black text-[#087d91]">{currency.format(estimate)}</strong>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-extrabold">1. Tipo de espacio</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
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

      <div className="mt-7 flex flex-col items-center justify-between gap-5 rounded-2xl bg-[#eff9fa] p-5 sm:flex-row">
        <div>
          <span className="block text-xs font-black uppercase tracking-[.13em] text-[#6a8291]">Precio aproximado desde</span>
          <strong className="mt-1 block text-3xl font-black tracking-tight text-[#073c64]">{currency.format(estimate)} MXN</strong>
          <span className="text-xs font-semibold text-[#758a98]">El precio final se confirma antes de reservar.</span>
        </div>
        <Button type="submit" className="h-14 w-full rounded-full bg-[#08a884] px-7 text-base font-extrabold text-white shadow-[0_12px_28px_rgba(8,168,132,.23)] hover:bg-[#078f72] sm:w-auto">
          Solicitar cotización <ArrowRight className="size-5" />
        </Button>
      </div>
    </form>
  );
}

export default function Home() {
  const [heroProperty, setHeroProperty] = useState('hogar');

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/92 backdrop-blur-xl">
        <div className="site-shell flex h-[76px] items-center justify-between gap-5">
          <a href="#inicio" aria-label="PUREVA, inicio"><Brand /></a>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-[#3d566c] xl:flex" aria-label="Navegación principal">
            {navItems.map((item) => (
              <a key={item.label} className="nav-link" href={item.href}>{item.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Button nativeButton={false} variant="ghost" className="hidden h-11 rounded-full px-4 font-bold text-[#0c496d] lg:inline-flex" render={<a href="#contacto" />}>
              Contacto
            </Button>
            <Button nativeButton={false} className="hidden h-11 rounded-full bg-[#08a884] px-5 font-extrabold text-white shadow-[0_8px_22px_rgba(8,168,132,.25)] hover:bg-[#078f72] sm:inline-flex" render={<a href="#cotizar" />}>
              Cotizar ahora <ArrowRight className="size-4" />
            </Button>
            <Sheet>
              <SheetTrigger
                className="grid size-11 place-items-center rounded-full border border-[#dbe8eb] text-[#0c4d6d] transition hover:bg-[#eff8f9] xl:hidden"
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
                      render={<a href={item.href} className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-extrabold text-[#214e69] hover:bg-white" />}
                    >
                      {item.label} <ChevronRight className="size-4 text-[#119eac]" />
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto p-5">
                  <SheetClose render={<a href="#cotizar" className="flex h-13 items-center justify-center gap-2 rounded-full bg-[#08a884] px-5 font-extrabold text-white" />}>
                    Cotizar ahora <ArrowRight className="size-4" />
                  </SheetClose>
                  <a className="mt-3 flex h-13 items-center justify-center gap-2 rounded-full border border-[#cfe1e5] bg-white font-extrabold text-[#0c5672]" href="https://wa.me/527775560211">
                    <MessageCircle className="size-5 text-[#08a884]" /> WhatsApp
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="inicio" className="relative min-h-[810px] pt-[76px] lg:min-h-[760px]">
        <div className="absolute inset-0 top-[76px]">
          <img src="/images/professional-team.jpg" alt="Equipo profesional de limpieza trabajando en una oficina moderna" className="h-full w-full object-cover object-[65%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,253,255,.99)_0%,rgba(248,253,255,.96)_38%,rgba(248,253,255,.32)_67%,rgba(4,33,55,.15)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="site-shell relative grid min-h-[684px] items-center py-14 lg:grid-cols-[1.04fr_.96fr] lg:py-20">
          <div className="max-w-[660px] pb-16 lg:pb-0">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b6e6ea] bg-white/82 px-4 py-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#0b7890] shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-[#08a884]" /> Espacios más limpios, vidas más tranquilas
            </div>
            <h1 className="max-w-[640px] text-balance text-[clamp(3.25rem,6vw,5.7rem)] font-black leading-[.91] tracking-[-.065em] text-[#072f50]">
              Limpieza profesional <span className="text-[#0ba2ae]">donde la necesitas.</span>
            </h1>
            <p className="mt-7 max-w-[585px] text-pretty text-lg leading-8 text-[#425b70] sm:text-xl">
              Servicios confiables para hogares, oficinas, colegios, comercios, condominios y empresas en Cuernavaca.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button nativeButton={false} className="h-14 rounded-full bg-[#073c64] px-7 text-base font-extrabold text-white shadow-[0_12px_30px_rgba(7,60,100,.22)] hover:bg-[#062f4f]" render={<a href="#cotizar" />}>
                Cotizar mi servicio <ArrowRight className="size-5" />
              </Button>
              <Button nativeButton={false} variant="outline" className="h-14 rounded-full border-[#b9d8df] bg-white/88 px-6 text-base font-bold text-[#0a5575] backdrop-blur hover:bg-white" render={<a href="https://wa.me/527775560211" aria-label="Escribir a PUREVA por WhatsApp" />}>
                <MessageCircle className="size-5 text-[#08a884]" /> WhatsApp
              </Button>
            </div>
            <div className="mt-10 grid max-w-[620px] gap-3 sm:grid-cols-3">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm font-bold text-[#254d69]">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#e1f7f3] text-[#078e75]"><Icon className="size-[17px]" /></span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <aside className="relative ml-auto hidden w-full max-w-[420px] self-end pb-5 lg:block">
            <div className="rounded-[28px] border border-white/80 bg-white/93 p-6 shadow-[0_30px_80px_rgba(4,42,69,.18)] backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#0a9b91]">Cotizador rápido</p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight text-[#07345b]">¿Qué espacio limpiamos?</h2>
                </div>
                <span className="grid size-11 place-items-center rounded-2xl bg-[#e9f8fa] text-[#078ca1]"><Sparkles className="size-5" /></span>
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
                    <Icon className="size-5" /> {label} {heroProperty === value && <Check className="ml-auto size-4" />}
                  </button>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#f1f9fa] p-4">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-[.12em] text-[#6c8494]">Estimación desde</span>
                  <span className="mt-1 block text-2xl font-black text-[#073c64]">$690 MXN</span>
                </div>
                <Button nativeButton={false} className="h-11 rounded-full bg-[#08a884] px-5 font-extrabold text-white hover:bg-[#078f72]" render={<a href="#cotizar" />}>
                  Continuar <ArrowRight />
                </Button>
              </div>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#6f8595]"><ShieldCheck className="size-4 text-[#08a884]" /> Sin compromiso · respuesta inmediata</p>
            </div>
          </aside>
        </div>

        <div className="site-shell relative z-10 -mt-8 grid grid-cols-2 overflow-hidden rounded-[26px] border border-[#dfecef] bg-white shadow-[0_18px_60px_rgba(7,50,78,.09)] sm:grid-cols-4">
          {[
            ['+850', 'servicios completados'],
            ['4.9/5', 'satisfacción de clientes'],
            ['100%', 'personal capacitado'],
            ['24 h', 'respuesta a cotizaciones'],
          ].map(([value, label], index) => (
            <div key={label} className={`px-4 py-5 text-center sm:px-6 ${index > 0 ? 'border-l border-[#e3edef]' : ''} ${index === 2 ? 'max-sm:border-l-0 max-sm:border-t' : ''} ${index === 3 ? 'max-sm:border-t' : ''}`}>
              <strong className="block text-2xl font-black tracking-tight text-[#087d91]">{value}</strong>
              <span className="mt-1 block text-xs font-bold text-[#657f90]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="servicios" className="scroll-mt-20 pb-24 pt-32 sm:pb-32 sm:pt-40">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
            <div>
              <span className="section-kicker">Servicios que se adaptan</span>
              <h2 className="section-title mt-4">Un estándar profesional para cada espacio.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#5a7283] lg:justify-self-end">
              Diseñamos cada servicio según el inmueble, la frecuencia y el resultado que buscas. Tú eliges el nivel de atención; nosotros coordinamos al equipo, los insumos y la supervisión.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} id={service.id} className={`service-card group ${service.tone === 'dark' ? 'service-card-dark' : ''}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img src={service.image} alt={service.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061f33]/55 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 grid size-11 place-items-center rounded-2xl bg-white/92 text-[#098fa1] shadow-lg backdrop-blur"><Icon className="size-5" /></span>
                  </div>
                  <div className="p-6 sm:p-7">
                    <span className="text-xs font-black uppercase tracking-[.16em] text-[#0aa196]">{service.eyebrow}</span>
                    <h3 className="mt-2 text-2xl font-black tracking-tight">{service.title}</h3>
                    <p className={`mt-3 leading-7 ${service.tone === 'dark' ? 'text-[#b8ced9]' : 'text-[#627989]'}`}>{service.description}</p>
                    <ul className="mt-5 space-y-2.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm font-bold"><CheckCircle2 className="size-4 text-[#16ae91]" /> {feature}</li>
                      ))}
                    </ul>
                    <a href="#cotizar" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#0997a2]">Ver opciones <ArrowRight className="size-4 transition group-hover:translate-x-1" /></a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="cotizar" className="scroll-mt-16 bg-[#073650] py-24 text-white sm:py-32">
        <div className="site-shell grid gap-12 xl:grid-cols-[.72fr_1.28fr] xl:items-start">
          <div className="xl:sticky xl:top-28">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.17em] text-[#68ddd6]"><Zap className="size-4" /> Cotiza en menos de 2 minutos</span>
            <h2 className="mt-4 max-w-lg text-balance text-4xl font-black leading-[1.03] tracking-[-.045em] sm:text-5xl">Tu espacio, tus necesidades, un precio claro.</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#b9d1da]">Obtén una estimación inmediata y personaliza el servicio. Un especialista confirmará los detalles antes de reservar.</p>
            <div className="mt-9 space-y-4">
              {[
                'Sin pagos ni cargos en este paso',
                'Descuentos por servicio recurrente',
                'Atención personalizada por WhatsApp',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-bold text-[#e4f4f5]"><span className="grid size-8 place-items-center rounded-full bg-white/10 text-[#65ded4]"><Check className="size-4" /></span>{item}</div>
              ))}
            </div>
          </div>
          <QuickQuote />
        </div>
      </section>

      <section id="sectores" className="scroll-mt-20 bg-[#f3f8f9] py-24 sm:py-32">
        <div className="site-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-kicker">Experiencia multisector</span>
            <h2 className="section-title mt-4">Limpieza especializada para la forma en que usas tu espacio.</h2>
            <p className="mt-5 text-lg leading-8 text-[#61798a]">Protocolos, horarios y equipos distintos para cada tipo de inmueble.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map(({ title, subtitle, image, icon: Icon }) => (
              <a key={title} href="#cotizar" className="sector-card group">
                <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#052d49]/90 via-[#052d49]/18 to-transparent" />
                <span className="relative mt-auto flex items-end justify-between gap-4 p-6 text-white">
                  <span>
                    <span className="block text-2xl font-black tracking-tight">{title}</span>
                    <span className="mt-1 block text-sm font-semibold text-white/78">{subtitle}</span>
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-[#0eb5a8]"><Icon className="size-5" /></span>
                </span>
              </a>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {specialities.map(({ icon: Icon, label }) => (
              <a key={label} href="#cotizar" className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-2xl border border-[#dce9eb] bg-white p-4 text-center text-sm font-extrabold text-[#31566d] transition hover:-translate-y-1 hover:border-[#80d3d6] hover:text-[#078793] hover:shadow-lg">
                <Icon className="size-7 text-[#0aa49e]" strokeWidth={1.7} /> {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="site-shell">
          <div className="max-w-2xl">
            <span className="section-kicker">Así de sencillo</span>
            <h2 className="section-title mt-4">De tu solicitud a un espacio impecable.</h2>
          </div>
          <div className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-8 hidden border-t border-dashed border-[#9fd4d8] lg:block" />
            {processSteps.map(({ number, icon: Icon, title, text }) => (
              <article key={number} className="relative rounded-3xl border border-[#deeaec] bg-white p-6 shadow-[0_16px_50px_rgba(10,64,87,.055)]">
                <div className="flex items-center justify-between">
                  <span className="relative z-10 grid size-16 place-items-center rounded-2xl bg-[#e8f8f6] text-[#078d81]"><Icon className="size-7" /></span>
                  <span className="text-4xl font-black tracking-[-.08em] text-[#d9eaec]">{number}</span>
                </div>
                <h3 className="mt-6 text-xl font-black tracking-tight text-[#103e5b]">{title}</h3>
                <p className="mt-3 leading-7 text-[#657d8c]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="empresas" className="scroll-mt-20 pb-24 sm:pb-32">
        <div className="site-shell overflow-hidden rounded-[36px] bg-[#062d48] text-white">
          <div className="grid lg:grid-cols-[1.02fr_.98fr]">
            <div className="relative min-h-[430px] lg:min-h-[650px]">
              <img src="/images/cleaning-crew.jpg" alt="Equipo de limpieza profesional en un edificio corporativo" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062d48]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#062d48]/25" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl border border-white/20 bg-[#062d48]/75 p-4 backdrop-blur-lg sm:left-8 sm:right-auto sm:max-w-sm">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#13aa9e] text-white"><FileCheck2 className="size-5" /></span>
                <span><strong className="block text-sm">Operación documentada</strong><span className="text-xs text-white/65">Checklist, supervisión y reportes</span></span>
              </div>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
              <span className="text-xs font-black uppercase tracking-[.17em] text-[#67ddd5]">Soluciones empresariales</span>
              <h2 className="mt-4 text-balance text-4xl font-black leading-[1.04] tracking-[-.045em] sm:text-5xl">Un aliado operativo, no solo un proveedor.</h2>
              <p className="mt-6 text-lg leading-8 text-[#b8cfda]">Diseñamos planes para oficinas, colegios, condominios, comercios y múltiples ubicaciones con control de calidad y atención centralizada.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {['Personal asignado', 'Supervisor responsable', 'Control de asistencia', 'Reportes periódicos', 'Suministro de consumibles', 'Facturación y contrato'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm font-bold text-[#ecf8f8]"><CheckCircle2 className="size-4 text-[#42d3c4]" /> {item}</div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button nativeButton={false} className="h-13 rounded-full bg-[#10aa96] px-6 text-base font-extrabold text-white hover:bg-[#0d9584]" render={<a href="#contacto" />}>Solicitar propuesta <ArrowRight className="size-5" /></Button>
                <Button nativeButton={false} variant="outline" className="h-13 rounded-full border-white/25 bg-white/5 px-6 text-base font-bold text-white hover:bg-white/12 hover:text-white" render={<a href="tel:+527775171042" />}><Phone className="size-4" /> Hablar con un asesor</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="planes" className="scroll-mt-20 bg-[#f3f8f9] py-24 sm:py-32">
        <div className="site-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-kicker">Planes residenciales</span>
            <h2 className="section-title mt-4">El nivel de cuidado que tu hogar necesita.</h2>
            <p className="mt-5 text-lg leading-8 text-[#61798a]">Precios de referencia para una vivienda de hasta 80 m². Personaliza cualquier plan en el cotizador.</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className={`relative flex flex-col rounded-[28px] border p-7 ${plan.featured ? 'border-[#0aa89b] bg-[#073b58] text-white shadow-[0_26px_70px_rgba(6,56,84,.18)] lg:-translate-y-3' : 'border-[#dce9eb] bg-white text-[#143f5a]'}`}>
                {plan.featured && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#14b59f] px-4 py-1.5 text-[.68rem] font-black uppercase tracking-[.15em] text-white">Más elegido</span>}
                <span className={`text-xs font-black uppercase tracking-[.16em] ${plan.featured ? 'text-[#63ddd4]' : 'text-[#0b9b93]'}`}>Plan</span>
                <h3 className="mt-2 text-3xl font-black tracking-tight">{plan.name}</h3>
                <p className={`mt-2 text-sm ${plan.featured ? 'text-[#b9ced8]' : 'text-[#6b8190]'}`}>{plan.subtitle}</p>
                <strong className="mt-7 text-2xl font-black">{plan.price}</strong>
                <span className={`mt-1 text-xs font-semibold ${plan.featured ? 'text-[#9bb8c6]' : 'text-[#7d919d]'}`}>por servicio · precio estimado</span>
                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm font-bold"><CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${plan.featured ? 'text-[#50d5c8]' : 'text-[#10a88d]'}`} /> {feature}</li>
                  ))}
                </ul>
                <Button nativeButton={false} variant={plan.featured ? 'default' : 'outline'} className={`mt-8 h-12 w-full rounded-full font-extrabold ${plan.featured ? 'bg-[#11ad97] text-white hover:bg-[#0e9785]' : 'border-[#bfd9dd] text-[#0a7182] hover:bg-[#ecf8f8]'}`} render={<a href="#cotizar" />}>Elegir {plan.name} <ArrowRight /></Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" className="scroll-mt-20 py-24 sm:py-32">
        <div className="site-shell grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[520px] overflow-hidden rounded-[34px]">
            <img src="/images/luxury-cleaning.png" alt="Equipo profesional realizando limpieza detallada" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062f4b]/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/92 p-5 text-[#153f59] shadow-xl backdrop-blur sm:left-auto sm:max-w-[300px]">
              <div className="flex items-center gap-1 text-[#f1a72c]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}</div>
              <p className="mt-3 text-sm font-bold leading-6">“Puntuales, cuidadosos y muy profesionales. El departamento quedó impecable.”</p>
              <span className="mt-3 block text-xs font-semibold text-[#748994]">Mariana R. · Cuernavaca</span>
            </div>
          </div>
          <div className="lg:pl-8">
            <span className="section-kicker">Confianza que se nota</span>
            <h2 className="section-title mt-4">Cuidamos tu espacio con método, personas y tecnología.</h2>
            <p className="mt-6 text-lg leading-8 text-[#607888]">PUREVA combina atención humana con procesos claros. Cada servicio se prepara, asigna y supervisa para ofrecer resultados consistentes, ya sea en un hogar o en una operación empresarial.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: 'Personal confiable', text: 'Selección, identificación y capacitación.' },
                { icon: ClipboardCheck, title: 'Calidad controlada', text: 'Checklists y seguimiento por servicio.' },
                { icon: Leaf, title: 'Productos profesionales', text: 'Soluciones eficaces para cada superficie.' },
                { icon: Heart, title: 'Atención cercana', text: 'Acompañamiento antes, durante y después.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-[#dfeaec] bg-[#f9fcfc] p-5">
                  <Icon className="size-6 text-[#0b9d94]" />
                  <h3 className="mt-4 font-black text-[#16435e]">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#6a8190]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="site-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="section-kicker">Preguntas frecuentes</span>
            <h2 className="section-title mt-4">Antes de abrirnos la puerta.</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-[#627989]">Si no encuentras lo que buscas, escríbenos. Una persona de nuestro equipo te responde.</p>
            <Button nativeButton={false} variant="outline" className="mt-7 h-12 rounded-full border-[#bfdadd] px-5 font-extrabold text-[#0b7280]" render={<a href="https://wa.me/527775560211" />}><MessageCircle className="size-5 text-[#0aa38d]" /> Resolver otra duda</Button>
          </div>
          <Accordion className="rounded-[26px] border border-[#dce8eb] bg-white px-5 shadow-[0_16px_50px_rgba(10,64,87,.05)] sm:px-7">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="border-[#e3ecee]">
                <AccordionTrigger className="py-5 text-base font-black text-[#19455f] hover:no-underline sm:text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="pb-5 pr-8 text-[.95rem] leading-7 text-[#647d8d]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contacto" className="scroll-mt-20 px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="relative overflow-hidden rounded-[34px] bg-[#08a497] text-white">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_20%,white_0,transparent_30%),radial-gradient(circle_at_90%_80%,#063c62_0,transparent_36%)]" />
          <div className="site-shell relative grid gap-10 py-16 lg:grid-cols-[1.15fr_.85fr] lg:items-center sm:py-20">
            <div>
              <span className="text-xs font-black uppercase tracking-[.18em] text-white/72">Tu espacio puede sentirse mejor</span>
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-black leading-[1.02] tracking-[-.045em] sm:text-6xl">Hagamos de la limpieza una cosa menos en qué pensar.</h2>
            </div>
            <div className="rounded-[26px] border border-white/20 bg-white/12 p-6 backdrop-blur-md sm:p-7">
              <p className="text-lg font-bold leading-7">Cotiza hoy y recibe atención personalizada para tu hogar o empresa.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a href="https://wa.me/527775560211" className="flex h-13 items-center justify-center gap-2 rounded-full bg-white px-5 font-black text-[#08796f] transition hover:-translate-y-0.5 hover:shadow-xl"><MessageCircle className="size-5" /> 777 556 0211</a>
                <a href="tel:+527775171042" className="flex h-13 items-center justify-center gap-2 rounded-full border border-white/30 bg-[#073d5e] px-5 font-black text-white transition hover:-translate-y-0.5"><Phone className="size-4" /> 777 517 1042</a>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/75"><MapPin className="size-4" /> Cuernavaca, Morelos</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#05283f] py-14 text-white">
        <div className="site-shell">
          <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
            <div>
              <Brand inverted />
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#a9c1cc]">Servicios profesionales de limpieza para hogares, empresas e instituciones. Ambientes que inspiran.</p>
              <div className="mt-6 flex gap-2">
                {['Fb', 'Ig', 'In'].map((label, index) => (
                  <a key={label} href="#" aria-label={['Facebook', 'Instagram', 'LinkedIn'][index]} className="grid size-10 place-items-center rounded-full border border-white/14 text-[.68rem] font-black uppercase tracking-wide text-[#b7ced7] transition hover:border-[#55d7cc] hover:text-white">{label}</a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[.14em] text-[#6adbd3]">Servicios</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-[#b4c9d2]">
                <li><a href="#hogar" className="hover:text-white">Limpieza residencial</a></li>
                <li><a href="#empresas" className="hover:text-white">Limpieza empresarial</a></li>
                <li><a href="#servicios" className="hover:text-white">Servicios especializados</a></li>
                <li><a href="#sectores" className="hover:text-white">Sectores</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[.14em] text-[#6adbd3]">PUREVA</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-[#b4c9d2]">
                <li><a href="#nosotros" className="hover:text-white">Nosotros</a></li>
                <li><a href="#planes" className="hover:text-white">Planes</a></li>
                <li><a href="#cotizar" className="hover:text-white">Cotizar</a></li>
                <li><a href="#contacto" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[.14em] text-[#6adbd3]">Contacto</h3>
              <ul className="mt-5 space-y-4 text-sm font-semibold text-[#b4c9d2]">
                <li><a className="flex gap-2.5 hover:text-white" href="tel:+527775171042"><Phone className="mt-0.5 size-4 shrink-0 text-[#5bd2c8]" /> 777 517 1042</a></li>
                <li><a className="flex gap-2.5 hover:text-white" href="mailto:info@pureva.mx"><Mail className="mt-0.5 size-4 shrink-0 text-[#5bd2c8]" /> info@pureva.mx</a></li>
                <li><span className="flex gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-[#5bd2c8]" /> Cuernavaca, Morelos</span></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-7 text-xs font-semibold text-[#88a7b5] sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 PUREVA. Todos los derechos reservados.</span>
            <span>Privacidad · Términos · Cobertura</span>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/527775560211" aria-label="Cotizar por WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[#12b76a] px-4 text-sm font-black text-white shadow-[0_16px_35px_rgba(18,183,106,.33)] transition hover:-translate-y-1 hover:bg-[#0da35d] sm:px-5">
        <MessageCircle className="size-5" /><span className="hidden sm:inline">WhatsApp</span>
      </a>
    </main>
  );
}
