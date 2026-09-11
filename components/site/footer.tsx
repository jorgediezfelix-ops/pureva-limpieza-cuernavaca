import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { Brand } from '@/components/site/brand';
import { sectors, services } from '@/lib/content';
import { business, coverage, href, socialLinks } from '@/lib/site';

/**
 * Pie común a todas las páginas.
 *
 * Enlaza cada servicio y cada sector desde cualquier punto del sitio: con
 * subpáginas, el footer es lo que mantiene el enlazado interno y evita que las
 * páginas de detalle queden a más de un clic de la portada.
 */
export function SiteFooter() {
  return (
    <>
      <footer className="relative overflow-hidden bg-[#04233c] py-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(13,180,180,.16),transparent_45%)]" />
        <div className="site-shell relative">
          <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_.9fr_.9fr_.9fr]">
            <div>
              <Brand inverted />
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#a9c1cc]">
                Servicios profesionales de limpieza para hogares, empresas e instituciones en Cuernavaca y su zona
                metropolitana.
              </p>
              <ul className="mt-6 space-y-4 text-sm font-semibold text-[#b4c9d2]">
                <li>
                  <a className="flex gap-2.5 transition hover:text-white" href={`tel:${business.phone}`}>
                    <Phone className="mt-0.5 size-4 shrink-0 text-[#5bd2c8]" /> {business.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a className="flex gap-2.5 transition hover:text-white" href={`mailto:${business.email}`}>
                    <Mail className="mt-0.5 size-4 shrink-0 text-[#5bd2c8]" /> {business.email}
                  </a>
                </li>
                <li>
                  <span className="flex gap-2.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-[#5bd2c8]" /> {business.address.locality},{' '}
                    {business.address.region}
                  </span>
                </li>
              </ul>
              {socialLinks.some((link) => link.url) && (
                <div className="mt-6 flex gap-2">
                  {socialLinks
                    .filter((link) => link.url)
                    .map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label={`${business.name} en ${link.label}`}
                        className="grid size-10 place-items-center rounded-full border border-white/14 text-[.68rem] font-black uppercase tracking-wide text-[#b7ced7] transition hover:-translate-y-0.5 hover:border-[#55d7cc] hover:bg-white/8 hover:text-white"
                      >
                        {link.short}
                      </a>
                    ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-sm font-black uppercase tracking-[.14em] text-[#6adbd3]">Servicios</h2>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-[#b4c9d2]">
                {services.map((service) => (
                  <li key={service.slug}>
                    <a href={href(`/servicios/${service.slug}`)} className="transition hover:text-white">
                      {service.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={href('/empresas')} className="transition hover:text-white">
                    Soluciones para empresas
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-black uppercase tracking-[.14em] text-[#6adbd3]">Sectores</h2>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-[#b4c9d2]">
                {sectors.map((sector) => (
                  <li key={sector.slug}>
                    <a href={href(`/sectores/${sector.slug}`)} className="transition hover:text-white">
                      {sector.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-black uppercase tracking-[.14em] text-[#6adbd3]">PUREVA</h2>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-[#b4c9d2]">
                <li>
                  <a href={href('/nosotros')} className="transition hover:text-white">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href={href('/planes')} className="transition hover:text-white">
                    Planes y precios
                  </a>
                </li>
                <li>
                  <a href={href('/cotizar')} className="transition hover:text-white">
                    Cotizar en línea
                  </a>
                </li>
                <li>
                  <a href={href('/preguntas-frecuentes')} className="transition hover:text-white">
                    Preguntas frecuentes
                  </a>
                </li>
                <li>
                  <a href={href('/contacto')} className="transition hover:text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-b border-white/10 py-8">
            <h2 className="text-sm font-black uppercase tracking-[.14em] text-[#6adbd3]">Zonas de servicio</h2>
            <p className="mt-4 text-sm leading-7 text-[#a9c1cc]">
              Damos servicio de limpieza en{' '}
              {coverage.map((city, index) => (
                <span key={city}>
                  {index > 0 && ' · '}
                  <strong className="font-bold text-[#d3e6ed]">{city}</strong>
                </span>
              ))}{' '}
              y el resto de la zona metropolitana de {business.address.region}.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-7 text-xs font-semibold text-[#88a7b5] sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 {business.legalName}. Todos los derechos reservados.</span>
            <address className="not-italic">
              {business.address.locality}, {business.address.region}, México · {business.phoneDisplay}
            </address>
          </div>
        </div>
      </footer>

      <a
        href={business.whatsappUrl}
        aria-label="Cotizar por WhatsApp"
        className="whatsapp-fab fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[#12b76a] px-4 text-sm font-black text-white shadow-[0_16px_35px_rgba(18,183,106,.36)] transition hover:-translate-y-1 hover:bg-[#0da35d] sm:px-5"
      >
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </>
  );
}
