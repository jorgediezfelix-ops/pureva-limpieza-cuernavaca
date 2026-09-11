import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { Reveal } from '@/components/site/reveal';
import { CtaSection, PageHero } from '@/components/site/sections';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { business, coverage } from '@/lib/site';

const trail = [
  { label: 'Inicio', path: '/' },
  { label: 'Contacto' },
];

export const metadata: Metadata = {
  title: 'Contacto | Empresa de limpieza en Cuernavaca',
  description:
    'Contacta a PUREVA, empresa de limpieza en Cuernavaca: WhatsApp, teléfono y correo. Respuesta a cotizaciones en menos de 24 horas, lunes a sábado.',
  alternates: { canonical: '/contacto/' },
};

const channels = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: business.whatsappDisplay,
    href: business.whatsappUrl,
    note: 'La vía más rápida: respondemos en horario laboral.',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: business.phoneDisplay,
    href: `tel:${business.phone}`,
    note: 'Para cotizaciones de empresa y visitas técnicas.',
  },
  {
    icon: Mail,
    label: 'Correo',
    value: business.email,
    href: `mailto:${business.email}`,
    note: 'Propuestas, contratos y facturación.',
  },
];

const schedule = [
  { days: 'Lunes a viernes', hours: '8:00 – 19:00' },
  { days: 'Sábado', hours: '9:00 – 14:00' },
  { days: 'Domingo', hours: 'Cerrado' },
];

export default function ContactoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      <PageHero
        eyebrow="Hablemos"
        title={
          <>
            Cuéntanos qué <span className="text-gradient-brand">necesitas limpiar.</span>
          </>
        }
        description="Respondemos cotizaciones en menos de 24 horas. Para oficinas, colegios y condominios coordinamos una visita técnica sin costo."
        image="/images/man-cleaning.jpg"
        imageAlt="Personal de limpieza profesional de PUREVA trabajando en Cuernavaca"
        trail={trail}
      />

      <section className="py-24 sm:py-28" aria-labelledby="canales-title">
        <div className="site-shell">
          <Reveal className="max-w-2xl">
            <span className="section-kicker">Canales de atención</span>
            <h2 id="canales-title" className="section-title mt-4">
              Elige por dónde <span className="text-gradient-ink">prefieres hablar.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {channels.map(({ icon: Icon, label, value, href: url, note }, index) => (
              <Reveal key={label} delay={index * 110} className="h-full">
                <a
                  href={url}
                  className="feature-tile flex h-full flex-col p-7 transition hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(10,64,87,.12)]"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-[#e8f8f6] to-[#d8f2ee] text-[#0b9d94] ring-1 ring-[#c9ebe6]">
                    <Icon className="size-5" />
                  </span>
                  <span className="mt-5 text-xs font-black uppercase tracking-[.16em] text-[#0aa196]">{label}</span>
                  <strong className="mt-1 font-display text-xl font-extrabold tracking-tight text-[#103e5b]">{value}</strong>
                  <span className="mt-3 text-sm leading-6 text-[#6a8190]">{note}</span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[28px] border border-[#dce9eb] bg-white p-7 shadow-[0_16px_45px_rgba(10,64,87,.06)]">
                <h3 className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-[#103e5b]">
                  <Clock className="size-5 text-[#0aa49e]" /> Horario de atención
                </h3>
                <ul className="mt-6 divide-y divide-[#eef4f5]">
                  {schedule.map((row) => (
                    <li key={row.days} className="flex items-center justify-between py-3 text-sm font-bold text-[#31566d]">
                      <span>{row.days}</span>
                      <span className="text-[#6a8190]">{row.hours}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-6 text-[#6a8190]">
                  Los servicios se programan también fuera de este horario cuando la operación del cliente lo requiere:
                  turnos nocturnos en oficinas y rotaciones de fin de semana en rentas vacacionales.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="h-full rounded-[28px] border border-[#dce9eb] bg-white p-7 shadow-[0_16px_45px_rgba(10,64,87,.06)]">
                <h3 className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-[#103e5b]">
                  <MapPin className="size-5 text-[#0aa49e]" /> Dónde damos servicio
                </h3>
                <p className="mt-6 leading-7 text-[#5a7283]">
                  Operamos en {business.address.locality} y su zona metropolitana. Si tu colonia no aparece, escríbenos:
                  atendemos fuera de cobertura según la carga de trabajo de la semana.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {coverage.map((city) => (
                    <li
                      key={city}
                      className="rounded-full border border-[#d6e8ea] bg-[#f3fbfb] px-3.5 py-1.5 text-sm font-bold text-[#0b7280]"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
                <address className="mt-6 text-sm font-semibold not-italic leading-6 text-[#6a8190]">
                  {business.legalName}
                  <br />
                  {business.address.locality}, {business.address.region}, México
                </address>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
