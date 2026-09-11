'use client';

import type { ReactNode } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Droplets,
  FileCheck2,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Photo } from '@/components/site/photo';
import { QuickQuote } from '@/components/site/quick-quote';
import { Reveal } from '@/components/site/reveal';
import { StatValue } from '@/components/site/stat-value';
import {
  heroStats,
  marqueeItems,
  plans,
  processSteps,
  sectors,
  services,
  specialities,
  testimonials,
} from '@/lib/content';
import { business, href } from '@/lib/site';

/**
 * Bloques compartidos entre páginas.
 *
 * El archivo entero es cliente: `Accordion` y `Button` envuelven primitivas de
 * Base UI con estado. Las rutas (`app/**\/page.tsx`) sí son de servidor, que es
 * donde viven `metadata` y los datos estructurados.
 */

/** Migas de pan visibles; el equivalente en JSON-LD lo emite cada ruta. */
export function Breadcrumbs({ trail }: { trail: { label: string; path?: string }[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-bold text-[#9dc3d2]">
      {trail.map((crumb, index) => (
        <span key={crumb.label} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="size-3.5 text-[#5d8ba0]" aria-hidden="true" />}
          {crumb.path ? (
            <a href={href(crumb.path)} className="transition hover:text-white">
              {crumb.label}
            </a>
          ) : (
            <span className="text-[#d5eaf2]" aria-current="page">
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

/** Cabecera oscura de las páginas interiores. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  trail,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  trail: { label: string; path?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#04233c] pt-[76px] text-white">
      <div className="absolute inset-0 -z-10">
        <Photo
          src={image}
          alt={imageAlt}
          sizes="100vw"
          priority
          className="h-full w-full scale-105 object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(103deg,rgba(4,35,60,.95)_0%,rgba(4,35,60,.86)_38%,rgba(4,35,60,.55)_68%,rgba(3,26,45,.24)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(13,180,180,.2),transparent_48%)]" />
        <div className="orb pv-float-slow left-[-6%] top-[12%] size-[420px] bg-[#0eb5b0]/16" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="site-shell relative grid min-h-[380px] items-center gap-10 py-14 sm:min-h-[420px] sm:py-16 lg:py-20">
        <div className="max-w-[720px]">
          <Breadcrumbs trail={trail} />
          <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#b9f2ea]">
            <Sparkles className="size-4 text-[#5fe6cd]" /> {eyebrow}
          </span>
          <h1 className="mt-6 text-balance font-display text-[clamp(2.2rem,5.2vw,3.9rem)] font-extrabold leading-[1.02] tracking-[-.04em]">
            {title}
          </h1>
          <p className="mt-6 max-w-[620px] text-pretty text-lg leading-8 text-[#b6d2dd]">{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Par de botones de acción, repetido en casi todas las cabeceras. */
export function HeroActions() {
  return (
    <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
      <Button
        nativeButton={false}
        className="btn-shine h-14 rounded-full bg-gradient-to-r from-[#08a884] to-[#0dc794] px-7 text-base font-extrabold text-white shadow-[0_18px_42px_rgba(8,168,132,.4)] transition hover:-translate-y-0.5 hover:brightness-[1.07]"
        render={<a href={href('/cotizar')} />}
      >
        Cotizar mi servicio <ArrowRight className="size-5" />
      </Button>
      <Button
        nativeButton={false}
        variant="outline"
        className="h-14 rounded-full border-white/25 bg-white/10 px-6 text-base font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/18 hover:text-white"
        render={<a href={business.whatsappUrl} aria-label="Escribir a PUREVA por WhatsApp" />}
      >
        <Phone className="size-5 text-[#4fe3bd]" /> WhatsApp
      </Button>
    </div>
  );
}

export function StatsStrip() {
  return (
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
  );
}

export function ServicesGrid({ heading, intro }: { heading: ReactNode; intro: string }) {
  return (
    <section id="servicios" className="relative scroll-mt-20 pb-24 pt-24 sm:pb-32 sm:pt-28">
      <div className="dot-pattern pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-45 [mask-image:linear-gradient(180deg,#000,transparent)]" />
      <div className="site-shell">
        <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <Reveal>
            <span className="section-kicker">Servicios que se adaptan</span>
            <h2 className="section-title mt-4">{heading}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-2xl text-lg leading-8 text-[#5a7283] lg:justify-self-end">{intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={index * 110} className="h-full">
                <article className={`service-card group h-full ${service.tone === 'dark' ? 'service-card-dark' : ''}`}>
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
                    <span
                      className={`text-xs font-black uppercase tracking-[.16em] ${service.tone === 'dark' ? 'text-[#5fe0d4]' : 'text-[#0aa196]'}`}
                    >
                      {service.eyebrow}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
                      {/* El enlace envuelve el título y `absolute inset-0` hace clicable
                          toda la tarjeta sin anidar enlaces ni romper la navegación. */}
                      <a href={href(`/servicios/${service.slug}`)} className="after:absolute after:inset-0">
                        {service.title}
                      </a>
                    </h3>
                    <p className={`mt-3 leading-7 ${service.tone === 'dark' ? 'text-[#b8ced9]' : 'text-[#627989]'}`}>
                      {service.description}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm font-bold">
                          <CheckCircle2 className={`size-4 ${service.tone === 'dark' ? 'text-[#4fdcc4]' : 'text-[#16ae91]'}`} />{' '}
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <span
                      className={`mt-7 inline-flex items-center gap-2 text-sm font-black ${service.tone === 'dark' ? 'text-[#6de3d6]' : 'text-[#0997a2]'}`}
                    >
                      Ver el servicio <ArrowRight className="size-4 transition group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectorsGrid({
  heading,
  intro,
  showSpecialities = true,
}: {
  heading: ReactNode;
  intro: string;
  showSpecialities?: boolean;
}) {
  return (
    <section id="sectores" className="scroll-mt-20 bg-gradient-to-b from-[#f3f8f9] to-[#eef7f7] py-24 sm:py-32">
      <div className="site-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Experiencia multisector</span>
          <h2 className="section-title mx-auto mt-4">{heading}</h2>
          <p className="mt-5 text-lg leading-8 text-[#61798a]">{intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map(({ slug, title, subtitle, image, alt, icon: Icon }, index) => (
            <Reveal key={slug} delay={(index % 3) * 110} className="h-full">
              <a href={href(`/sectores/${slug}`)} className="sector-card group h-full">
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

        {showSpecialities && (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {specialities.map(({ icon: Icon, label }, index) => (
              <Reveal key={label} delay={index * 70} className="h-full">
                <a
                  href={href('/servicios/limpieza-especializada')}
                  className="feature-tile flex h-full min-h-28 flex-col items-center justify-center gap-3 p-4 text-center text-sm font-extrabold text-[#31566d] hover:text-[#078793]"
                >
                  <Icon className="size-7 text-[#0aa49e]" strokeWidth={1.7} /> {label}
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
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
  );
}

export function EnterpriseSection() {
  return (
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
              <h2
                id="empresas-title"
                className="mt-4 text-balance font-display text-[clamp(2rem,5.4vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-.035em]"
              >
                Limpieza de oficinas y empresas: <span className="text-gradient-brand">un aliado operativo.</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#b8cfda]">
                Diseñamos planes para oficinas, colegios, condominios, comercios y múltiples ubicaciones con control de
                calidad y atención centralizada.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  'Personal asignado',
                  'Supervisor responsable',
                  'Control de asistencia',
                  'Reportes periódicos',
                  'Suministro de consumibles',
                  'Facturación y contrato',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm font-bold text-[#ecf8f8]">
                    <CheckCircle2 className="size-4 text-[#42d3c4]" /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  nativeButton={false}
                  className="btn-shine h-13 rounded-full bg-gradient-to-r from-[#10aa96] to-[#0dc08f] px-6 text-base font-extrabold text-white shadow-[0_14px_32px_rgba(13,192,143,.28)] transition hover:-translate-y-0.5 hover:brightness-[1.06]"
                  render={<a href={href('/empresas')} />}
                >
                  Ver soluciones para empresas <ArrowRight className="size-5" />
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
  );
}

export function PlansGrid({ intro }: { intro: string }) {
  return (
    <section id="planes" aria-labelledby="planes-title" className="scroll-mt-20 bg-gradient-to-b from-[#f3f8f9] to-[#eef7f7] py-24 sm:py-32">
      <div className="site-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Planes residenciales</span>
          <h2 id="planes-title" className="section-title mx-auto mt-4">
            Precios de limpieza para <span className="text-gradient-ink">tu hogar.</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#61798a]">{intro}</p>
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
                <span className={`text-xs font-black uppercase tracking-[.16em] ${plan.featured ? 'text-[#63ddd4]' : 'text-[#0b9b93]'}`}>
                  Plan
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight lg:text-3xl">{plan.name}</h3>
                <p className={`mt-2 text-sm ${plan.featured ? 'text-[#b9ced8]' : 'text-[#6b8190]'}`}>{plan.subtitle}</p>
                <strong className="mt-7 font-display text-2xl font-extrabold">{plan.price}</strong>
                <span className={`mt-1 text-xs font-semibold ${plan.featured ? 'text-[#9bb8c6]' : 'text-[#7d919d]'}`}>
                  por servicio · precio estimado
                </span>
                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm font-bold">
                      <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${plan.featured ? 'text-[#50d5c8]' : 'text-[#10a88d]'}`} />{' '}
                      {feature}
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
                  render={<a href={href('/cotizar')} />}
                >
                  Elegir {plan.name} <ArrowRight />
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="opiniones"
      aria-labelledby="opiniones-title"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#f3f8f9] to-[#eef7f7] py-24 sm:py-28"
    >
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
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[1.02rem] font-medium leading-7 text-[#46647a]">
                  “{item.quote}”
                </blockquote>
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
  );
}

export function FaqSection({
  items,
  heading = 'Preguntas frecuentes sobre nuestro servicio de limpieza.',
  intro = 'Si no encuentras lo que buscas, escríbenos. Una persona de nuestro equipo te responde.',
}: {
  items: readonly { question: string; answer: string }[];
  heading?: string;
  intro?: string;
}) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="site-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <span className="section-kicker">Preguntas frecuentes</span>
          <h2 id="faq-title" className="section-title mt-4">
            {heading}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-[#627989]">{intro}</p>
          <Button
            nativeButton={false}
            variant="outline"
            className="mt-7 h-12 rounded-full border-[#bfdadd] px-5 font-extrabold text-[#0b7280] transition hover:-translate-y-0.5 hover:bg-[#eefafa]"
            render={<a href={business.whatsappUrl} />}
          >
            <Sparkles className="size-5 text-[#0aa38d]" /> Resolver otra duda
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <Accordion className="rounded-[26px] border border-[#dce8eb] bg-white px-5 shadow-[0_16px_50px_rgba(10,64,87,.06)] sm:px-7">
            {items.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="border-[#e3ecee]">
                <AccordionTrigger className="py-5 text-base font-extrabold text-[#19455f] hover:no-underline sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 pr-8 text-[.95rem] leading-7 text-[#647d8d]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

export function QuoteSection({
  heading,
  intro,
}: {
  heading: ReactNode;
  intro: string;
}) {
  return (
    <section
      id="cotizar"
      aria-labelledby="cotizar-title"
      className="relative isolate scroll-mt-16 overflow-hidden bg-[#052f47] py-24 text-white sm:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(13,180,180,.26),transparent_45%),radial-gradient(circle_at_88%_82%,rgba(8,168,132,.24),transparent_48%)]" />
        <div className="grid-pattern absolute inset-0 opacity-70" />
      </div>

      <div className="site-shell grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.17em] text-[#68ddd6]">
            <Zap className="size-4" /> Cotiza en menos de 2 minutos
          </span>
          <h2
            id="cotizar-title"
            className="mt-4 max-w-lg text-balance font-display text-[clamp(2rem,5.4vw,3.1rem)] font-extrabold leading-[1.05] tracking-[-.035em]"
          >
            {heading}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#b9d1da]">{intro}</p>
          <div className="mt-9 space-y-4">
            {[
              'Sin pagos ni cargos en este paso',
              'Descuentos por servicio recurrente',
              'Atención personalizada por WhatsApp',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-bold text-[#e4f4f5]">
                <span className="grid size-8 place-items-center rounded-full bg-white/10 text-[#65ded4] ring-1 ring-white/15">
                  <CheckCircle2 className="size-4" />
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
  );
}

export function AboutSection() {
  return (
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
            PUREVA combina atención humana con procesos claros. Cada servicio se prepara, asigna y supervisa para ofrecer
            resultados consistentes, ya sea en un hogar o en una operación empresarial.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Personal confiable', text: 'Selección, identificación y capacitación.' },
              { title: 'Calidad controlada', text: 'Checklists y seguimiento por servicio.' },
              { title: 'Productos profesionales', text: 'Soluciones eficaces para cada superficie.' },
              { title: 'Atención cercana', text: 'Acompañamiento antes, durante y después.' },
            ].map(({ title, text }) => (
              <div key={title} className="feature-tile p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-[#e8f8f6] to-[#d8f2ee] text-[#0b9d94] ring-1 ring-[#c9ebe6]">
                  <ShieldCheck className="size-5" />
                </span>
                <h3 className="mt-4 font-display font-extrabold text-[#16435e]">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#6a8190]">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section id="contacto" aria-labelledby="cta-title" className="scroll-mt-20 px-3 pb-3 sm:px-5 sm:pb-5">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[34px] bg-gradient-to-br from-[#0aa39b] via-[#08a497] to-[#0b8fa6] text-white">
          <div className="absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(circle_at_15%_20%,white_0,transparent_32%),radial-gradient(circle_at_88%_82%,#063c62_0,transparent_38%)]" />
          <div className="grid-pattern absolute inset-0 -z-10 opacity-60" />
          <div className="orb pv-float-slow -left-[8%] top-[-20%] size-[380px] bg-white/18" />

          <div className="site-shell relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-[.18em] text-white/75">
                Tu espacio puede sentirse mejor
              </span>
              <h2
                id="cta-title"
                className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.1rem,6.2vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-.035em]"
              >
                Hagamos de la limpieza una cosa menos en qué pensar.
              </h2>
            </div>
            <div className="rounded-[26px] border border-white/25 bg-white/14 p-6 shadow-[0_26px_60px_rgba(3,45,60,.22)] backdrop-blur-md sm:p-7">
              <p className="text-lg font-bold leading-7">
                Cotiza hoy y recibe atención personalizada para tu hogar o empresa.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a
                  href={business.whatsappUrl}
                  className="btn-shine flex h-13 items-center justify-center gap-2 rounded-full bg-white px-5 font-black text-[#08796f] transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Sparkles className="size-5" /> {business.whatsappDisplay}
                </a>
                <a
                  href={`tel:${business.phone}`}
                  className="flex h-13 items-center justify-center gap-2 rounded-full border border-white/30 bg-[#063c5e] px-5 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#05334f]"
                >
                  <Phone className="size-4" /> {business.phoneDisplay}
                </a>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/78">
                <ShieldCheck className="size-4" /> {business.address.locality}, {business.address.region}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
