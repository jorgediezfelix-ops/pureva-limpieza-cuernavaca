import { asset } from '@/lib/site';

/**
 * Dimensiones reales de cada foto y de sus variantes reducidas.
 * Los anchos del `srcset` deben ser los verdaderos: si se declaran de más, el
 * navegador descarga un archivo mayor del necesario.
 */
type PhotoMeta = {
  width: number;
  height: number;
  sources: { suffix: string; width: number }[];
};

const photoMeta: Record<string, PhotoMeta> = {
  '/images/cleaning-crew.jpg': { width: 1024, height: 1024, sources: [{ suffix: '-640', width: 640 }] },
  '/images/luxury-cleaning.jpg': { width: 1024, height: 1024, sources: [{ suffix: '-640', width: 640 }] },
  '/images/cleaning-team-office.jpg': { width: 1600, height: 1066, sources: [{ suffix: '-640', width: 640 }, { suffix: '-1024', width: 1024 }] },
  '/images/professional-team.jpg': { width: 1600, height: 1066, sources: [{ suffix: '-640', width: 640 }, { suffix: '-1024', width: 1024 }] },
  '/images/home-cleaning.jpg': { width: 1344, height: 768, sources: [{ suffix: '-640', width: 640 }, { suffix: '-1024', width: 1024 }] },
  '/images/corporate-cleaning.jpg': { width: 768, height: 1344, sources: [{ suffix: '-640', width: 365 }, { suffix: '-1024', width: 585 }] },
  '/images/detail-cleaning.jpg': { width: 816, height: 1456, sources: [{ suffix: '-640', width: 358 }, { suffix: '-1024', width: 574 }] },
  '/images/man-cleaning.jpg': { width: 1066, height: 1600, sources: [{ suffix: '-640', width: 426 }, { suffix: '-1024', width: 682 }] },
  '/images/office-cleaning.jpg': { width: 1066, height: 1600, sources: [{ suffix: '-640', width: 426 }, { suffix: '-1024', width: 682 }] },
  '/images/woman-cleaning-office.jpg': { width: 1066, height: 1600, sources: [{ suffix: '-640', width: 426 }, { suffix: '-1024', width: 682 }] },
};

/**
 * `<img>` con `srcset`/`sizes`, dimensiones intrínsecas (evita CLS) y carga
 * diferida salvo en el hero, que es el LCP y se marca con `priority`.
 */
export function Photo({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const meta = photoMeta[src];
  const srcSet = meta
    ? [
        ...meta.sources.map(
          (source) => `${asset(src.replace('.jpg', `${source.suffix}.jpg`))} ${source.width}w`,
        ),
        `${asset(src)} ${meta.width}w`,
      ].join(', ')
    : undefined;

  return (
    <img
      src={asset(src)}
      srcSet={srcSet}
      sizes={sizes}
      width={meta?.width}
      height={meta?.height}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
