import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Photo } from '@/components/site/photo';
import { Reveal } from '@/components/site/reveal';
import {
  CtaSection,
  FaqSection,
  HeroActions,
  PageHero,
  ProcessSection,
} from '@/components/site/sections';
import { findService, sectors, services } from '@/lib/content';
import { absoluteUrl, breadcrumbSchema, faqSchema, jsonLd, serviceSchema } from '@/lib/schema';
import { href } from '@/lib/site';

type Params = { slug: string };

/** Una página por servicio; el export estático las descubre desde aquí. */
export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/servicios/${service.slug}/` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: absoluteUrl(`/servicios/${service.slug}`),
      type: 'article',
    },
  };
}

export default async function ServicioPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const trail = [
    { label: 'Inicio', path: '/' },
    { label: 'Servicios', path: '/servicios' },
    { label: service.title },
  ];
  const relatedSectors = sectors.filter((sector) => sector.relatedService === service.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceSchema(service))} />
      {service.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(
            faqSchema(service.faqs, `${absoluteUrl(`/servicios/${service.slug}`)}#faq`),
          )}
        />
      )}

      <PageHero
        eyebrow={service.eyebrow}
        title={service.h1}
        description={service.intro}
        image={service.image}
        imageAlt={service.alt}
        trail={trail}
      >
        <HeroActions />
      </PageHero>

      <section className="py-24 sm:py-28" aria-labelledby="incluye-title">
        <div className="site-shell grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          <Reveal>
            <span className="section-kicker">Qué incluye</span>
            <h2 id="incluye-title" className="section-title mt-4">
              Lo que hacemos <span className="text-gradient-ink">en cada visita.</span>
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.includes.map((item) => (
                <div key={item.title} className="feature-tile p-5">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-[#e8f8f6] to-[#d8f2ee] text-[#0b9d94] ring-1 ring-[#c9ebe6]">
                    <CheckCircle2 className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display font-extrabold text-[#16435e]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#6a8190]">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative min-h-[320px] overflow-hidden rounded-[34px] shadow-[0_30px_80px_rgba(4,42,69,.18)] sm:min-h-[420px]">
              <Photo
                src={service.image}
                alt={service.alt}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="mt-6 rounded-[28px] border border-[#dce9eb] bg-white p-7 shadow-[0_16px_45px_rgba(10,64,87,.06)]">
              <h3 className="font-display text-xl font-extrabold tracking-tight text-[#103e5b]">
                Ideal si tu caso es alguno de estos
              </h3>
              <ul className="mt-5 space-y-3">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm font-bold text-[#31566d]">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#10a88d]" /> {item}
                  </li>
                ))}
              </ul>
              <Button
                nativeButton={false}
                className="btn-shine mt-7 h-12 w-full rounded-full bg-gradient-to-r from-[#08a884] to-[#0cc08d] font-extrabold text-white shadow-[0_12px_28px_rgba(8,168,132,.3)] hover:brightness-[1.06]"
                render={<a href={href('/cotizar')} />}
              >
                Cotizar este servicio <ArrowRight className="size-5" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {relatedSectors.length > 0 && (
        <section className="bg-gradient-to-b from-[#f3f8f9] to-[#eef7f7] py-24 sm:py-28" aria-labelledby="relacionados-title">
          <div className="site-shell">
            <Reveal className="max-w-2xl">
              <span className="section-kicker">Dónde lo aplicamos</span>
              <h2 id="relacionados-title" className="section-title mt-4">
                Sectores que usan <span className="text-gradient-ink">este servicio.</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSectors.map(({ slug: sectorSlug, title, subtitle, image, alt, icon: Icon }, index) => (
                <Reveal key={sectorSlug} delay={index * 110} className="h-full">
                  <a href={href(`/sectores/${sectorSlug}`)} className="sector-card group h-full">
                    <Photo
                      src={image}
                      alt={alt}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#04253c]/92 via-[#04253c]/25 to-transparent" />
                    <span className="relative mt-auto flex items-end justify-between gap-4 p-6 text-white">
                      <span>
                        <span className="block font-display text-2xl font-extrabold tracking-tight">{title}</span>
                        <span className="mt-1 block text-sm font-semibold text-white/78">{subtitle}</span>
                      </span>
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur transition duration-300 group-hover:bg-[#0eb5a8]">
                        <Icon className="size-5" />
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProcessSection />

      {service.faqs.length > 0 && (
        <FaqSection
          items={service.faqs}
          heading={`Dudas sobre ${service.title.toLowerCase()}.`}
          intro="Lo que más nos preguntan antes de contratar este servicio."
        />
      )}

      <CtaSection />
    </>
  );
}
