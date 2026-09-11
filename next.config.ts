import type { NextConfig } from 'next';

/**
 * GitHub Pages sirve archivos estáticos, así que la app se exporta a HTML.
 * Al publicarse en https://<usuario>.github.io/<repo>/, todo cuelga de un
 * subdirectorio: `basePath` reescribe las rutas que genera el framework y
 * `BASE_PATH` (lib/site.ts) prefija las que escribimos a mano.
 */
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/pureva-limpieza-cuernavaca',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
