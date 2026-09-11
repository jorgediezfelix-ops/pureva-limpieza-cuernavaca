import type { NextConfig } from 'next';

/**
 * El sitio se publica bajo un subdirectorio (GitHub Pages sirve los repos de
 * proyecto en `https://<usuario>.github.io/<repo>/`): `basePath` reescribe las
 * rutas que genera el framework y `BASE_PATH` (lib/site.ts) prefija las que
 * escribimos a mano.
 *
 * No se usa `output: 'export'`: en vinext 1.0.0-beta.5 el prerenderizado de
 * rutas dinámicas responde 404 y aborta el build. El HTML estático lo produce
 * `scripts/export-static.mjs` capturando el servidor de producción.
 */
const nextConfig: NextConfig = {
  basePath: '/pureva-limpieza-cuernavaca',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
