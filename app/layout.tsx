import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import {
  SITE_URL,
  asset,
  business,
  coverage,
  faqs,
  reviewData,
  serviceCatalog,
  socialLinks,
} from '@/lib/site';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Empresa de limpieza en Cuernavaca | PUREVA Limpieza Profesional',
    template: '%s | PUREVA',
  },
  description:
    'Empresa de limpieza profesional en Cuernavaca, Morelos. Limpieza de casas, oficinas, colegios, condominios, comercios y Airbnb con personal capacitado, supervisión e insumos incluidos. Cotiza en línea desde $690 MXN.',
  applicationName: business.name,
  authors: [{ name: business.legalName }],
  creator: business.legalName,
  publisher: business.legalName,
  category: 'Servicios de limpieza',
  keywords: [
    'empresa de limpieza en Cuernavaca',
    'servicio de limpieza Cuernavaca',
    'limpieza de oficinas Cuernavaca',
    'limpieza de casas Cuernavaca',
    'limpieza profunda Cuernavaca',
    'limpieza de condominios Morelos',
    'limpieza de colegios Cuernavaca',
    'limpieza Airbnb Cuernavaca',
    'limpieza post obra Cuernavaca',
    'servicio de limpieza Jiutepec',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Empresa de limpieza en Cuernavaca | PUREVA Limpieza Profesional',
    description:
      'Limpieza profesional para hogares, oficinas, colegios, condominios y comercios en Cuernavaca y su zona metropolitana. Cotización en menos de 24 horas.',
    url: SITE_URL,
    siteName: business.name,
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: asset('/og.jpg'),
        width: 1200,
        height: 628,
        alt: 'PUREVA — Limpieza profesional en Cuernavaca',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Empresa de limpieza en Cuernavaca | PUREVA',
    description:
      'Limpieza profesional para hogares y empresas en Cuernavaca. Cotiza en línea en menos de 2 minutos.',
    images: [asset('/og.jpg')],
  },
  icons: {
    icon: [
      { url: asset('/icon-192.png'), sizes: '192x192', type: 'image/png' },
      { url: asset('/icon-512.png'), sizes: '512x512', type: 'image/png' },
    ],
    shortcut: asset('/icon-192.png'),
    // iOS no admite SVG como icono de pantalla de inicio: necesita un PNG opaco.
    apple: [{ url: asset('/apple-touch-icon.png'), sizes: '180x180', type: 'image/png' }],
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // La página usa `env(safe-area-inset-*)`: sin `cover` esos valores son 0 en iPhone.
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#04233c' },
  ],
};

const sameAs = socialLinks.filter((link) => link.url).map((link) => link.url);

const postalAddress = {
  '@type': 'PostalAddress',
  addressLocality: business.address.locality,
  addressRegion: business.address.region,
  postalCode: business.address.postalCode,
  addressCountry: business.address.country,
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: business.name,
  legalName: business.legalName,
  description: business.description,
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/logo-pureva.png`,
  telephone: business.phone,
  email: business.email,
  priceRange: business.priceRange,
  currenciesAccepted: business.currency,
  paymentAccepted: 'Efectivo, Transferencia, Tarjeta',
  address: postalAddress,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  },
  areaServed: coverage.map((city) => ({
    '@type': 'City',
    name: city,
    containedInPlace: { '@type': 'State', name: business.address.region },
  })),
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    geoRadius: 35000,
  },
  openingHoursSpecification: business.openingHours.map((slot) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: slot.days,
    opens: slot.opens,
    closes: slot.closes,
  })),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: business.phone,
      contactType: 'customer service',
      areaServed: 'MX',
      availableLanguage: ['es-MX'],
    },
    {
      '@type': 'ContactPoint',
      telephone: business.whatsapp,
      contactType: 'sales',
      contactOption: 'TollFree',
      areaServed: 'MX',
      availableLanguage: ['es-MX'],
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de limpieza',
    itemListElement: serviceCatalog.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        serviceType: service.name,
        areaServed: coverage.map((city) => ({ '@type': 'City', name: city })),
        provider: { '@id': `${SITE_URL}/#business` },
      },
    })),
  },
  // Solo se publica cuando existan reseñas reales y verificables (ver lib/site.ts).
  ...(reviewData.enabled
    ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: reviewData.ratingValue,
          reviewCount: reviewData.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }
    : {}),
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: business.name,
  description: business.description,
  inLanguage: 'es-MX',
  publisher: { '@id': `${SITE_URL}/#business` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

/** `<` escapado para que el JSON no pueda cerrar el `<script>` que lo contiene. */
function jsonLd(schema: object) {
  return { __html: JSON.stringify(schema).replace(/</g, '\\u003c') };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <head>
        {/* El hero es el LCP: se precarga la variante que realmente usará cada viewport. */}
        <link
          rel="preload"
          as="image"
          href={asset('/images/cleaning-crew.jpg')}
          imageSrcSet={`${asset('/images/cleaning-crew-640.jpg')} 640w, ${asset('/images/cleaning-crew.jpg')} 1024w`}
          imageSizes="100vw"
          fetchPriority="high"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessSchema)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} antialiased`}
      >
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <a href="#inicio" className="skip-link">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
