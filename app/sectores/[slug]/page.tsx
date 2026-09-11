import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Photo } from '@/components/site/photo';
import { Reveal } from '@/components/site/reveal';
import { CtaSection, HeroActions, PageHero, ProcessSection } from '@/components/site/sections';
import { findSector, findService, sectors } from '@/lib/content';
import { absoluteUrl, breadcrumbSchema, jsonLd } from '@/lib/schema';
import { coverage, href } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return sectors.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const sector = findSector(slug);
  if (!sector) return {};

  return {
    title: sector.metaTitle,
    description: sector.metaDescription,
    alternates: { canonical: `/sectores/${sector.slug}/` },
    openGraph: {
      title: sector.metaTitle,
      description: sector.metaDescription,
      url: absoluteUrl(`/sectores/${sector.slug}`),
      type: 'article',
    },
  };
}

export default async function SectorPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const sector = findSector(slug);
  if (!sector) notFound();

  const trail = [
    { label: 'Inicio', path: '/' },
    { label: 'Sectores', path: '/sectores' },
    { label: sector.title },
  ];
  const service = findService(sector.relatedService);
  const others = sectors.filter((item) => item.slug !== sector.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />

      <PageHero
        eyebrow={sector.subtitle}
        title={sector.h1}
        description={sector.intro}
        image={sector.image}
        imageAlt={sector.alt}
        trail={trail}
      >
        <HeroActions />
      </PageHero>

      <section className="py-24 sm:py-28" aria-labelledby="cubre-title">
        <div className="site-shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <span className="section-kicker">Qué cubrimos</span>
            <h2 id="cubre-title" className="section-title mt-4">
              El servicio, <span className="text-gradient-ink">punto por punto.</span>
            </h2>
            <ul className="mt-9 space-y-4">
              {sector.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1.02rem] font-bold text-[#31566d]">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#e4f6f3] text-[#0b9d94]">
                    <CheckCircle2 className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {service && (
              <div className="mt-10 rounded-[26px] border border-[#dce9eb] bg-white p-6 shadow-[0_16px_45px_rgba(10,64,87,.06)]">
                <span className="text-xs font-black uppercase tracking-[.16em] text-[#0aa196]">Servicio relacionado</span>
                <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight text-[#103e5b]">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6a8190]">{service.description}</p>
                <a
                  href={href(`/servicios/${service.slug}`)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#0997a2]"
                >
                  Ver el servicio completo <ArrowRight className="size-4" />
                </a>
              </div>
            )}
          </Reveal>

          <Reveal delay={120}>
            <div className="relative min-h-[380px] overflow-hidden rounded-[34px] shadow-[0_30px_80px_rgba(4,42,69,.18)] sm:min-h-[520px]">
              <Photo
                src={sector.image}
                alt={sector.alt}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#042f4b]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-white/94 p-5 text-[#153f59] shadow-xl backdrop-blur">
                <strong className="block text-sm font-extrabold">Cobertura</strong>
                <p className="mt-1 text-xs font-semibold leading-5 text-[#748994]">
                  {coverage.join(' · ')} y el resto de la zona metropolitana.
                </p>
              </div>
            </div>

            <Button
              nativeButton={false}
              className="btn-shine mt-6 h-13 w-full rounded-full bg-gradient-to-r from-[#08a884] to-[#0cc08d] text-base font-extrabold text-white shadow-[0_14px_32px_rgba(8,168,132,.3)] hover:brightness-[1.06]"
              render={<a href={href('/cotizar')} />}
            >
              Cotizar limpieza para {sector.title.toLowerCase()} <ArrowRight className="size-5" />
            </Button>
          </Reveal>
        </div>
      </section>

      <ProcessSection />

      <section className="bg-gradient-to-b from-[#f3f8f9] to-[#eef7f7] py-24 sm:py-28" aria-labelledby="otros-title">
        <div className="site-shell">
          <Reveal className="max-w-2xl">
            <span className="section-kicker">Otros sectores</span>
            <h2 id="otros-title" className="section-title mt-4">
              También atendemos <span className="text-gradient-ink">estos espacios.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map(({ slug: otherSlug, title, subtitle, image, alt, icon: Icon }, index) => (
              <Reveal key={otherSlug} delay={index * 110} className="h-full">
                <a href={href(`/sectores/${otherSlug}`)} className="sector-card group h-full">
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

      <CtaSection />
    </>
  );
}
