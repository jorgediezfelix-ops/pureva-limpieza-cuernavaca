import type { Metadata } from 'next';

import { CtaSection, PageHero, ProcessSection, QuoteSection } from '@/components/site/sections';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

const trail = [
  { label: 'Inicio', path: '/' },
  { label: 'Cotizar' },
];

export const metadata: Metadata = {
  title: 'Cotizar limpieza en Cuernavaca en línea',
  description:
    'Calcula el precio de tu limpieza en Cuernavaca en menos de dos minutos: elige tipo de espacio, superficie, baños, frecuencia y extras. Sin pagos ni cargos en este paso.',
  alternates: { canonical: '/cotizar/' },
};

export default function CotizarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      <PageHero
        eyebrow="Cotiza en menos de 2 minutos"
        title={
          <>
            Tu espacio, tus necesidades, <span className="text-gradient-brand">un precio claro.</span>
          </>
        }
        description="Obtén una estimación inmediata y personaliza el servicio. Un especialista confirma los detalles antes de reservar."
        image="/images/detail-cleaning.jpg"
        imageAlt="Limpieza profesional a detalle realizada por el equipo de PUREVA"
        trail={trail}
      />
      <QuoteSection
        heading={
          <>
            Calcula tu limpieza <span className="text-gradient-brand">ahora mismo.</span>
          </>
        }
        intro="El cotizador estima a partir del tipo de inmueble, la superficie, los baños y la frecuencia. El precio final se confirma antes de reservar."
      />
      <ProcessSection />
      <CtaSection />
    </>
  );
}
