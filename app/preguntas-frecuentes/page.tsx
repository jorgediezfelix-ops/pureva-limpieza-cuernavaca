import type { Metadata } from 'next';

import { CtaSection, FaqSection, PageHero } from '@/components/site/sections';
import { services } from '@/lib/content';
import { absoluteUrl, breadcrumbSchema, faqSchema, jsonLd } from '@/lib/schema';
import { faqs } from '@/lib/site';

const trail = [
  { label: 'Inicio', path: '/' },
  { label: 'Preguntas frecuentes' },
];

export const metadata: Metadata = {
  title: 'Preguntas frecuentes sobre nuestro servicio de limpieza',
  description:
    'Resolvemos las dudas más comunes sobre el servicio de limpieza en Cuernavaca: personal, insumos, frecuencias, cotización de empresas, zonas de cobertura y precios.',
  alternates: { canonical: '/preguntas-frecuentes/' },
};

/** Las FAQ generales más las específicas de cada servicio, en un solo lugar. */
const allFaqs = [...faqs, ...services.flatMap((service) => service.faqs)];

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(allFaqs, `${absoluteUrl('/preguntas-frecuentes')}#faq`))}
      />
      <PageHero
        eyebrow="Antes de abrirnos la puerta"
        title={
          <>
            Preguntas <span className="text-gradient-brand">frecuentes.</span>
          </>
        }
        description="Todo lo que suelen preguntarnos antes de contratar: personal, insumos, frecuencias, cobertura y precios."
        image="/images/woman-cleaning-office.jpg"
        imageAlt="Personal de limpieza de PUREVA atendiendo un espacio en Cuernavaca"
        trail={trail}
      />
      <FaqSection items={allFaqs} heading="Todo lo que suelen preguntarnos." />
      <CtaSection />
    </>
  );
}
