import type { Metadata } from 'next';

import { CtaSection, HeroActions, PageHero, PlansGrid, TestimonialsSection } from '@/components/site/sections';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

const trail = [
  { label: 'Inicio', path: '/' },
  { label: 'Planes' },
];

export const metadata: Metadata = {
  title: 'Precios y planes de limpieza en Cuernavaca',
  description:
    'Planes de limpieza para hogar en Cuernavaca desde $690 MXN: Essential, Complete y Premium. Precios de referencia para vivienda de hasta 80 m², personalizables en el cotizador.',
  alternates: { canonical: '/planes/' },
};

export default function PlanesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      <PageHero
        eyebrow="Planes residenciales"
        title={
          <>
            Precios claros, <span className="text-gradient-brand">sin sorpresas.</span>
          </>
        }
        description="Tres niveles de cuidado para el hogar. Todos incluyen personal capacitado, insumos y equipo profesional; lo que cambia es la profundidad del trabajo."
        image="/images/home-cleaning.jpg"
        imageAlt="Limpieza residencial profesional en una casa de Cuernavaca"
        trail={trail}
      >
        <HeroActions />
      </PageHero>
      <PlansGrid intro="Precios de referencia para una vivienda de hasta 80 m². El precio final depende de la superficie, el número de baños y la frecuencia: puedes calcularlo en el cotizador." />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
