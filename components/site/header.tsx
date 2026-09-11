'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, MessageCircle, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Brand } from '@/components/site/brand';
import { navItems } from '@/lib/content';
import { business, href } from '@/lib/site';

/**
 * Cabecera fija con barra de progreso de lectura.
 *
 * Los enlaces son `<a>` normales, no `next/link`: el sitio se publica como
 * export estático y el router de cliente pediría cargas RSC que no existen en
 * un host de archivos.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 28);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    }

    const initial = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-[#e3eef0] bg-white/92 shadow-[0_10px_34px_rgba(4,42,69,.08)] backdrop-blur-xl'
            : 'border-b border-white/10 bg-transparent'
        }`}
      >
        <div className="site-shell flex h-[76px] items-center justify-between gap-5">
          <a href={href('/')} aria-label="PUREVA, inicio"><Brand inverted={!scrolled} /></a>

          <nav
            className={`hidden items-center gap-4 text-sm font-semibold lg:flex xl:gap-6 ${scrolled ? 'text-[#3d566c]' : 'text-white/80'}`}
            aria-label="Navegación principal"
          >
            {navItems.map((item) => (
              <a key={item.label} className={`nav-link ${scrolled ? 'nav-link-light' : 'nav-link-dark'}`} href={href(item.href)}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Button
              nativeButton={false}
              variant="ghost"
              className={`hidden h-11 rounded-full px-4 font-bold xl:inline-flex ${
                scrolled ? 'text-[#0c496d]' : 'text-white hover:bg-white/12 hover:text-white'
              }`}
              render={<a href={href('/contacto')} />}
            >
              Contacto
            </Button>
            <Button
              nativeButton={false}
              className="btn-shine hidden h-11 rounded-full bg-gradient-to-r from-[#08a884] to-[#0cc08d] px-5 font-extrabold text-white shadow-[0_10px_26px_rgba(8,168,132,.3)] transition hover:-translate-y-0.5 hover:brightness-[1.06] sm:inline-flex"
              render={<a href={href('/cotizar')} />}
            >
              Cotizar ahora <ArrowRight className="size-4" />
            </Button>
            <Sheet>
              <SheetTrigger
                className={`grid size-11 place-items-center rounded-full border transition lg:hidden ${
                  scrolled
                    ? 'border-[#dbe8eb] text-[#0c4d6d] hover:bg-[#eff8f9]'
                    : 'border-white/25 text-white hover:bg-white/12'
                }`}
                aria-label="Abrir menú"
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent className="w-[88%] border-l-0 bg-[#f8fcfc] p-0 sm:max-w-[390px]">
                <SheetHeader className="border-b border-[#dfeaec] p-6 text-left">
                  <SheetTitle><Brand /></SheetTitle>
                  <SheetDescription>Servicios profesionales para cada espacio.</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col px-4 py-5" aria-label="Menú móvil">
                  {navItems.map((item) => (
                    <SheetClose
                      key={item.label}
                      render={<a href={href(item.href)} className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-extrabold text-[#214e69] transition hover:bg-white" />}
                    >
                      {item.label} <ChevronRight className="size-4 text-[#119eac]" />
                    </SheetClose>
                  ))}
                  <SheetClose
                    render={<a href={href('/contacto')} className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-extrabold text-[#214e69] transition hover:bg-white" />}
                  >
                    Contacto <ChevronRight className="size-4 text-[#119eac]" />
                  </SheetClose>
                </nav>
                <div className="mt-auto p-5">
                  <SheetClose render={<a href={href('/cotizar')} className="flex h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#08a884] to-[#0cc08d] px-5 font-extrabold text-white" />}>
                    Cotizar ahora <ArrowRight className="size-4" />
                  </SheetClose>
                  <a className="mt-3 flex h-13 items-center justify-center gap-2 rounded-full border border-[#cfe1e5] bg-white font-extrabold text-[#0c5672]" href={business.whatsappUrl}>
                    <MessageCircle className="size-5 text-[#08a884]" /> WhatsApp
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
