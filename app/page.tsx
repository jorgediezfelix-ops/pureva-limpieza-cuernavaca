import { HomeHero } from '@/components/site/home-hero';
import { CtaSection, SectorsGrid, ServicesGrid, StatsStrip } from '@/components/site/sections';

/**
 * Portada corta: cabecera con cotizador rápido y accesos a cada sección.
 * El desarrollo de cada tema vive en su propia ruta.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatsStrip />
      <ServicesGrid
        heading={
          <>
            Servicios de limpieza para <span className="text-gradient-ink">cada espacio.</span>
          </>
        }
        intro="Diseñamos cada servicio según el inmueble, la frecuencia y el resultado que buscas. Tú eliges el nivel de atención; nosotros coordinamos al equipo, los insumos y la supervisión."
      />
      <SectorsGrid
        heading={
          <>
            Limpieza especializada para la forma en que <span className="text-gradient-ink">usas tu espacio.</span>
          </>
        }
        intro="Protocolos, horarios y equipos distintos para cada tipo de inmueble."
      />
      <CtaSection />
    </>
  );
}
