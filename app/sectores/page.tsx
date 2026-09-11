import type { Metadata } from 'next';

import { CtaSection, HeroActions, PageHero, SectorsGrid } from '@/components/site/sections';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

const trail = [
  { label: 'Inicio', path: '/' },
  { label: 'Sectores' },
];

export const metadata: Metadata = {
  title: 'Sectores que atendemos en Cuernavaca',
  description:
    'Limpieza por sector en Cuernavaca: hogares, oficinas, colegios, condominios, comercios y Airbnb, cada uno con su protocolo, sus horarios y su equipo.',
  alternates: { canonical: '/sectores/' },
};

export default function SectoresPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      <PageHero
        eyebrow="Experiencia multisector"
        title={
          <>
            Cada sector tiene <span className="text-gradient-brand">su protocolo.</span>
          </>
        }
        description="Hogares, oficinas, colegios, condominios, comercios y Airbnb. Seis formas distintas de entrar a un espacio, con horarios y reportes propios."
        image="/images/office-cleaning.jpg"
        imageAlt="Limpieza profesional de oficinas y espacios de trabajo en Cuernavaca"
        trail={trail}
      >
        <HeroActions />
      </PageHero>
      <SectorsGrid
        heading={
          <>
            Limpieza especializada para la forma en que <span className="text-gradient-ink">usas tu espacio.</span>
          </>
        }
        intro="Un colegio, un Airbnb y una oficina no se limpian igual ni a la misma hora. Cada sector tiene su protocolo, su frecuencia y su forma de reportar."
      />
      <CtaSection />
    </>
  );
}
