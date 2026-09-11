/**
 * Exporta el sitio a HTML estático para GitHub Pages.
 *
 * vinext 1.0.0-beta.5 trae el módulo de `output: 'export'` pero su CLI no lo
 * invoca: `vinext build` marca la home como "dynamic" y no escribe ningún
 * index.html. Como toda la página es un componente de cliente, basta con
 * levantar el servidor de producción, pedir las rutas y guardar la respuesta.
 *
 * El directorio resultante (`out/`) se sirve tal cual bajo BASE_PATH:
 *
 *   out/index.html      ->  https://<usuario>.github.io/<repo>/
 *   out/_next/...       ->  referenciado como /<repo>/_next/... por el framework
 *   out/images/...      ->  referenciado como /<repo>/images/... vía asset()
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PORT = Number(process.env.EXPORT_PORT ?? 4321);
const BASE_PATH = '/pureva-limpieza-cuernavaca';
const ROOT = process.cwd();
const DIST_CLIENT = path.join(ROOT, 'dist', 'client');
const OUT = path.join(ROOT, 'out');

/** Archivos de dist/client que solo sirven a Cloudflare Workers. */
const SKIP = new Set(['_headers', '.assetsignore', '.vite', 'vinext-client-entry-manifest.json']);

/**
 * Lista de páginas a capturar, leída del propio sitemap del sitio.
 * Así una ruta nueva solo hay que darla de alta en `app/sitemap.ts`.
 */
async function routesFromSitemap(origin) {
  const res = await fetch(`${origin}${BASE_PATH}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml devolvió ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) throw new Error('El sitemap no contiene ninguna URL');

  return locs.map((loc) => {
    // De la URL absoluta solo interesa la ruta relativa a BASE_PATH.
    const path = new URL(loc).pathname.slice(BASE_PATH.length).replace(/^\/|\/$/g, '');
    return {
      url: `${BASE_PATH}/${path ? `${path}/` : ''}`,
      file: path ? `${path}/index.html` : 'index.html',
    };
  });
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else fs.copyFileSync(src, dst);
  }
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // el servidor aún no acepta conexiones
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`El servidor no respondió en ${url}`);
}

const server = spawn('node', ['node_modules/vinext/dist/cli.js', 'start', '-p', String(PORT)], {
  stdio: ['ignore', 'pipe', 'pipe'],
  env: process.env,
});
server.stdout.on('data', (d) => process.stdout.write(`[servidor] ${d}`));
server.stderr.on('data', (d) => process.stderr.write(`[servidor] ${d}`));

try {
  const origin = `http://127.0.0.1:${PORT}`;
  await waitForServer(`${origin}${BASE_PATH}/`);

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  // 1. Assets de public/ y los chunks del framework.
  for (const entry of fs.readdirSync(DIST_CLIENT, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const src = path.join(DIST_CLIENT, entry.name);
    // dist/client/<basePath>/_next -> out/_next (Pages ya sirve bajo el prefijo)
    if (entry.name === BASE_PATH.slice(1)) {
      copyDir(path.join(src, '_next'), path.join(OUT, '_next'));
      continue;
    }
    if (entry.isDirectory()) copyDir(src, path.join(OUT, entry.name));
    else fs.copyFileSync(src, path.join(OUT, entry.name));
  }

  // 2. HTML y metadatos renderizados por el servidor.
  const routes = [
    ...(await routesFromSitemap(origin)),
    { url: `${BASE_PATH}/robots.txt`, file: 'robots.txt' },
    { url: `${BASE_PATH}/sitemap.xml`, file: 'sitemap.xml' },
  ];

  for (const route of routes) {
    const res = await fetch(`${origin}${route.url}`);
    if (!res.ok) throw new Error(`${route.url} devolvió ${res.status}`);
    const body = Buffer.from(await res.arrayBuffer());
    const dest = path.join(OUT, route.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, body);
    console.log(`  ${route.file.padEnd(40)} ${String(body.length).padStart(7)} bytes`);
  }
  console.log(`\n  ${routes.length} rutas capturadas`);

  // 3. Sin esto, Pages pasa la carpeta por Jekyll y descarta todo lo que
  //    empieza por guion bajo, incluido _next.
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

  console.log(`\nExportado a ${path.relative(ROOT, OUT)}/`);
} finally {
  server.kill('SIGTERM');
}
