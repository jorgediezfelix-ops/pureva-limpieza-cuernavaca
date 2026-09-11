import type { Metadata } from 'next';

import {
  AboutSection,
  CtaSection,
  HeroActions,
  PageHero,
  ProcessSection,
  StatsStrip,
  TestimonialsSection,
} from '@/components/site/sections';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

const trail = [
  { label: 'Inicio', path: '/' },
  { label: 'Nosotros' },
];

export const metadata: Metadata = {
  title: 'Sobre PUREVA, empresa de limpieza en Cuernavaca',
  description:
    'Quiénes somos: una empresa de limpieza en Cuernavaca que combina personal verificado, protocolos escritos y supervisión con evidencia en cada servicio.',
  alternates: { canonical: '/nosotros/' },
};

export default function NosotrosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      <PageHero
        eyebrow="Confianza que se nota"
        title={
          <>
            Método, personas <span className="text-gradient-brand">y tecnología.</span>
          </>
        }
        description="La diferencia entre una limpieza buena y un servicio confiable está en lo que pasa alrededor: quién entra a tu espacio, cómo se supervisa y qué evidencia queda."
        image="/images/luxury-cleaning.jpg"
        imageAlt="Equipo de PUREVA realizando limpieza detallada en una residencia de Cuernavaca"
        trail={trail}
      >
        <HeroActions />
      </PageHero>
      <div className="h-24 sm:h-28" />
      <StatsStrip />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
