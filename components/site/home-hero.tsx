'use client';

import { useState } from 'react';
import { ArrowRight, Check, MessageCircle, ShieldCheck, Sparkles, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Photo } from '@/components/site/photo';
import { propertyOptions, trustItems } from '@/lib/content';
import { business, href } from '@/lib/site';

/** Cabecera de la portada, con el cotizador rápido que lleva a /cotizar. */
export function HomeHero() {
  const [heroProperty, setHeroProperty] = useState('hogar');

  return (
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
                  render={<a href={href('/cotizar')} />}
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
  );
}
