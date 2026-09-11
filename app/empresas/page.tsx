import type { Metadata } from 'next';

import {
  CtaSection,
  EnterpriseSection,
  HeroActions,
  PageHero,
  ProcessSection,
  SectorsGrid,
} from '@/components/site/sections';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

const trail = [
  { label: 'Inicio', path: '/' },
  { label: 'Empresas' },
];

export const metadata: Metadata = {
  title: 'Limpieza para empresas en Cuernavaca',
  description:
    'Servicio de limpieza empresarial en Cuernavaca: personal asignado, supervisor responsable, control de asistencia, reportes periódicos, consumibles, contrato y facturación.',
  alternates: { canonical: '/empresas/' },
};

export default function EmpresasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      <PageHero
        eyebrow="Soluciones empresariales"
        title={
          <>
            Un aliado operativo, <span className="text-gradient-brand">no solo un proveedor.</span>
          </>
        }
        description="En una operación empresarial el reto no es la primera limpieza, es sostener el mismo resultado el mes catorce. Personal asignado, protocolos escritos y un supervisor que responde."
        image="/images/cleaning-team-office.jpg"
        imageAlt="Equipo de limpieza empresarial de PUREVA en una oficina corporativa de Cuernavaca"
        trail={trail}
      >
        <HeroActions />
      </PageHero>
      <div className="pt-24 sm:pt-28" />
      <EnterpriseSection />
      <ProcessSection />
      <SectorsGrid
        heading={
          <>
            Sectores con <span className="text-gradient-ink">operación documentada.</span>
          </>
        }
        intro="Oficinas, colegios, condominios y comercios: cada uno con su alcance, su horario y su reporte."
        showSpecialities={false}
      />
      <CtaSection />
    </>
  );
}
