import { build } from 'esbuild';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const at = path => new URL(path, root);
await mkdir(at('dist/'), { recursive: true });
await cp(at('public/'), at('dist/'), { recursive: true });
await cp(at('licenses/'), at('dist/licenses/'), { recursive: true });
await build({
  absWorkingDir: fileURLToPath(root),
  entryPoints: ['client/main.js'],
  outfile: 'dist/client.js',
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: ['es2021'],
  minify: true,
  legalComments: 'eof',
});

const [html, css, code, cover, font, fontLicense] = await Promise.all([
  readFile(at('dist/index.html'), 'utf8'),
  readFile(at('dist/style.css'), 'utf8'),
  readFile(at('dist/client.js'), 'utf8'),
  readFile(at('dist/coast.webp')),
  readFile(at('dist/barlow.ttf')),
  readFile(at('licenses/BARLOW-OFL.txt'), 'utf8'),
]);
const embeddedCSS = css.replace('./coast.webp', 'data:image/webp;base64,' + cover.toString('base64'))
  .replace('./barlow.ttf', 'data:font/ttf;base64,' + font.toString('base64'));
const standalone = html
  .replace('<link rel="stylesheet" href="./style.css">', () => '<style>' + embeddedCSS + '</style>')
  .replace('<script src="./client.js" defer></script>', () => '<script>' + code.replace(/<\/script/gi, '<\\/script') + '</script>')
  .replace('</body>', () => '<script type="text/plain" id="font-license">' + fontLicense + '</script>\n</body>');
await mkdir(at('build/'), { recursive: true });
await writeFile(at('build/Tidefront.html'), standalone);
console.log('Built dist/ and build/Tidefront.html');
