import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pureva-limpieza-cuernavaca.jediez.chatgpt.site'),
  title: 'PUREVA | Limpieza profesional en Cuernavaca',
  description:
    'Servicios profesionales de limpieza para hogares, oficinas, colegios, comercios, condominios y empresas en Cuernavaca.',
  openGraph: {
    title: 'PUREVA | Limpieza profesional donde la necesitas',
    description:
      'Servicios confiables para hogares y empresas en Cuernavaca.',
    url: 'https://pureva-limpieza-cuernavaca.jediez.chatgpt.site',
    siteName: 'PUREVA',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1733,
        height: 907,
        alt: 'PUREVA — Limpieza profesional donde la necesitas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUREVA | Limpieza profesional donde la necesitas',
    description:
      'Servicios confiables para hogares y empresas en Cuernavaca.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
