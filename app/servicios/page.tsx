import type { Metadata } from 'next';

import {
  CtaSection,
  HeroActions,
  PageHero,
  ProcessSection,
  ServicesGrid,
} from '@/components/site/sections';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

const trail = [
  { label: 'Inicio', path: '/' },
  { label: 'Servicios' },
];

export const metadata: Metadata = {
  title: 'Servicios de limpieza en Cuernavaca',
  description:
    'Servicios de limpieza en Cuernavaca: limpieza residencial, limpieza de oficinas y empresas, y servicios especializados de lavado de salas, cristales, pisos y post-obra.',
  alternates: { canonical: '/servicios/' },
};

export default function ServiciosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      <PageHero
        eyebrow="Catálogo de servicios"
        title={
          <>
            Servicios de limpieza <span className="text-gradient-brand">en Cuernavaca.</span>
          </>
        }
        description="Limpieza residencial, limpieza de oficinas y empresas, y servicios especializados. Todos con personal capacitado, insumos incluidos y supervisión por visita."
        image="/images/cleaning-team-office.jpg"
        imageAlt="Equipo de limpieza profesional de PUREVA atendiendo una oficina en Cuernavaca"
        trail={trail}
      >
        <HeroActions />
      </PageHero>
      <ServicesGrid
        heading={
          <>
            Servicios de limpieza para <span className="text-gradient-ink">cada espacio.</span>
          </>
        }
        intro="Tres formas de trabajar según lo que necesitas resolver: mantener un hogar, sostener una operación empresarial o atacar un problema puntual con equipo especializado."
      />
      <ProcessSection />
      <CtaSection />
    </>
  );
}
