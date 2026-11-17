import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const generator = require('./gen-seo-metadata.js');
const { moviePath } = require('./movie-seo.js');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workerSource = fs.readFileSync(path.join(root, 'cloudflare/site/worker.js'), 'utf8').replace('export default {', 'globalThis.__worker = {');
const workerContext = { Request, Response, Headers, URL, fetch, console };
workerContext.globalThis = workerContext;
vm.runInNewContext(workerSource, workerContext, { filename: 'cloudflare/site/worker.js' });
const worker = workerContext.__worker;
const { movies, hidden, genres } = generator.loadDatabase();
const seoPages = generator.loadSeoPages();
const { rows, shards } = generator.buildIndex({ movies, hidden, genres, seoPages });
assert.ok(rows.size > 1000, `Kino/serial yozuvlari kam: ${rows.size}`);
assert.equal(new Set([...rows.values()].map(row => row.title)).size, rows.size, 'meta title takrorlangan');
assert.equal(new Set([...rows.values()].map(row => row.description)).size, rows.size, 'meta description takrorlangan');
assert.equal(new Set([...rows.values()].map(row => row.canonicalPath)).size, rows.size, 'canonical URL takrorlangan');
for (const row of rows.values()) {
  assert.equal(row.shareImage, row.poster || 'https://dezomax.uz/images/no-poster.svg', `ID ${row.id}: poster placeholder noto‘g‘ri`);
  assert.ok(Array.from(row.description).length <= 300, `ID ${row.id}: description 300 belgidan uzun`);
  if (!row.hasDescription) {
    assert.ok(row.description.includes('DezoMax katalogidagi'), `ID ${row.id}: faktlarga asoslangan tavsif fallback yo‘q`);
    for (const genre of row.genres) assert.ok(row.description.includes(genre), `ID ${row.id}: mavjud janr tavsifda yo‘q`);
  }
}

const locs = xml => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].replaceAll('&amp;', '&'));
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
// sitemap indeks bo'lsa — bo'laklarini o'qiymiz (har biri 50 000 dan kam)
const sitemapUrls = /<sitemapindex/.test(sitemap)
  ? locs(sitemap).flatMap(loc => {
      const xml = fs.readFileSync(path.join(root, new URL(loc).pathname.slice(1)), 'utf8');
      assert.ok(locs(xml).length <= 50000, `${loc}: 50 000 dan ko'p manzil`);
      return locs(xml);
    })
  : locs(sitemap);
assert.ok(sitemapUrls.length > 0, `sitemap URL soni noto‘g‘ri: ${sitemapUrls.length}`);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'sitemap ichida takroriy URL bor');
assert.ok(sitemapUrls.every(value => value.startsWith('https://dezomax.uz/')), 'sitemap ichida boshqa host bor');
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
assert.ok(!/^Disallow:\s*\/(?:film|kino|movie|catalog)(?:\/|\?|$)/im.test(robots), 'robot.txt kino/katalog yo‘llarini bloklagan');
assert.match(robots, /^Allow:\s*\/\s*$/im, 'robots.txt saytni umumiy ruxsat qilmaydi');
assert.deepEqual([...robots.matchAll(/^Sitemap:\s*(\S+)\s*$/gim)].map(match => match[1]), ['https://dezomax.uz/sitemap.xml'], 'robots.txt sitemap manzili noto‘g‘ri yoki takror');
for (const route of ['catalog.html', 'kino/index.html', 'toplam/ozbek-filmlari.html', 'teg/index.html']) {
  assert.ok(sitemapUrls.includes(`https://dezomax.uz/${route}`), `kategoriya sitemapda yo‘q: ${route}`);
}
const sitemapMovieUrls = new Set(sitemapUrls.filter(value => {
  const pathname = new URL(value).pathname;
  return pathname.startsWith('/film/') || (pathname.startsWith('/kino/') && pathname !== '/kino/index.html');
}));
const sitemapMovies = new Map();
for (const movie of movies) if (movie && movie.id != null && !hidden.has(Number(movie.id))) sitemapMovies.set(movie.id, movie);
for (const movie of [...sitemapMovies.values()]) if (Array.isArray(movie.parts) && movie.parts.length > 1) {
  for (const id of movie.parts) if (id !== movie.id) sitemapMovies.delete(id);
}
const expectedMovieUrls = [...sitemapMovies.values()].map(movie => new URL(moviePath(movie, seoPages).slice(1), 'https://dezomax.uz/').href);
assert.equal(sitemapMovieUrls.size, expectedMovieUrls.length, 'sitemap kino URLlari soni ma’lumotlar bazasiga mos emas');
assert.ok(expectedMovieUrls.every(value => sitemapMovieUrls.has(value)), 'sitemap kino URLlari canonical ro‘yxatiga mos emas');

function verifyStaticPages(dir) {
  if (!fs.existsSync(dir)) return 0;
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.html'));
  const titles = new Set(), descriptions = new Set(), canonicals = new Set();
  for (const file of files) {
    const html = fs.readFileSync(path.join(dir, file), 'utf8');
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
    const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    assert.ok(title && description && canonical, `${dir}/${file}: title/description/canonical yetishmaydi`);
    assert.ok(html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i)?.[1], `${dir}/${file}: OG title yo‘q`);
    assert.ok(html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i)?.[1], `${dir}/${file}: OG description yo‘q`);
    if (file !== 'index.html') {
      assert.ok(html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i)?.[1], `${dir}/${file}: OG image yo‘q`);
      assert.ok(html.match(/<meta\s+name="twitter:card"\s+content="([^"]*)"/i)?.[1], `${dir}/${file}: Twitter card yo‘q`);
      assert.ok(html.match(/<meta\s+name="twitter:title"\s+content="([^"]*)"/i)?.[1], `${dir}/${file}: Twitter title yo‘q`);
      assert.ok(html.match(/<meta\s+name="twitter:description"\s+content="([^"]*)"/i)?.[1], `${dir}/${file}: Twitter description yo‘q`);
      assert.ok(html.match(/<meta\s+name="twitter:image"\s+content="([^"]*)"/i)?.[1], `${dir}/${file}: Twitter image yo‘q`);
    }
    assert.equal(html.match(/<meta\s+property="og:url"\s+content="([^"]+)"/i)?.[1], canonical, `${dir}/${file}: OG URL canonical bilan mos emas`);
    const robotsMeta = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] || '';
    assert.ok(!/noindex|nofollow/i.test(robotsMeta), `${dir}/${file}: robots meta crawlni bloklaydi`);
    assert.ok(!titles.has(title), `${dir}/${file}: takror title`);
    assert.ok(!descriptions.has(description), `${dir}/${file}: takror description`);
    assert.ok(!canonicals.has(canonical), `${dir}/${file}: takror canonical`);
    titles.add(title); descriptions.add(description); canonicals.add(canonical);
  }
  return files.length;
}
const staticUzPages = verifyStaticPages(path.join(root, 'kino'));
const staticRuPages = verifyStaticPages(path.join(root, 'ru', 'kino'));

const seoTitles = new Map(), seoDescriptions = new Map(), seoCanonicals = new Map();
const movieMetaByPath = new Map([...rows.values()].map(row => [row.canonicalPath, row]));
for (const sitemapUrl of sitemapUrls) {
  const route = new URL(sitemapUrl).pathname;
  let title, description, canonical;
  const dynamic = movieMetaByPath.get(route);
  if (dynamic) {
    title = dynamic.title;
    description = dynamic.description;
    canonical = sitemapUrl;
  } else {
    let relative = decodeURIComponent(route).replace(/^\//, '');
    if (!relative || relative.endsWith('/')) relative += 'index.html';
    const localFile = path.resolve(root, relative);
    assert.ok(localFile.startsWith(root + path.sep) && fs.existsSync(localFile), `sitemap URL uchun fayl yo‘q: ${route}`);
    const html = fs.readFileSync(localFile, 'utf8');
    title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
    description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
    canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    assert.ok(title && description && canonical, `${route}: sitemapdagi sahifada SEO meta yetishmaydi`);
    assert.equal(canonical, sitemapUrl, `${route}: canonical sitemap URLiga mos emas`);
    const robotsMeta = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] || '';
    assert.ok(!/noindex|nofollow/i.test(robotsMeta), `${route}: sitemap sahifasi robots meta bilan bloklangan`);
    assert.ok(html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i)?.[1], `${route}: Open Graph title yo‘q`);
    assert.ok(html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i)?.[1], `${route}: Open Graph description yo‘q`);
  }
  assert.ok(!seoTitles.has(title), `sitemapda takror title: ${route} va ${seoTitles.get(title)}`);
  assert.ok(!seoDescriptions.has(description), `sitemapda takror description: ${route} va ${seoDescriptions.get(description)}`);
  assert.ok(!seoCanonicals.has(canonical), `sitemapda takror canonical: ${route} va ${seoCanonicals.get(canonical)}`);
  seoTitles.set(title, route); seoDescriptions.set(description, route); seoCanonicals.set(canonical, route);
}

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'dezomax-seo-'));
try {
  generator.writeShards(temp, shards);
  const shellHtml = fs.readFileSync(path.join(root, 'movie.html'), 'utf8');
  const shardIndex = new Map(shards.map((shard, index) => [String(index).padStart(3, '0'), shard]));
  const assets = {
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === '/movie.html') return new Response(shellHtml, { headers: { 'content-type': 'text/html; charset=utf-8' } });
      if (url.pathname.startsWith('/_seo/')) {
        const shard = shardIndex.get(path.basename(url.pathname, '.json'));
        if (shard) return { ok: true, async json() { return shard; } };
      }
      let relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
      if (!relative || relative.endsWith('/')) relative += 'index.html';
      const file = path.resolve(root, relative);
      if (file.startsWith(root + path.sep) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        const type = file.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream';
        return new Response(fs.readFileSync(file), { headers: { 'content-type': type } });
      }
      return new Response('Not Found', { status: 404 });
    }
  };

  const samples = [
    [...rows.values()].find(row => !row.canonicalPath.startsWith('/kino/')),
    [...rows.values()].find(row => row.type === 'TVSeries')
  ].filter(Boolean);
  assert.ok(samples.length >= 2, 'Film va serial uchun sinov namunasi topilmadi');
  const esc = value => String(value || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const decodeAttr = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

  // Check every legacy route, its one 301 target, and the canonical initial HTML.
  let checkedWorkerPages = 0;
  for (const metadata of rows.values()) {
    const googlebot = { headers: { 'user-agent': 'Googlebot' } };
    const legacy = await worker.fetch(new Request(`https://dezomax.uz/movie.html?id=${metadata.id}`, googlebot), { ASSETS: assets });
    assert.equal(legacy.status, 301, `Legacy ID ${metadata.id}: HTTP ${legacy.status}, 301 kutilgan`);
    assert.equal(legacy.headers.get('location'), metadata.canonical, `Legacy ID ${metadata.id}: redirect canonical URL noto‘g‘ri`);
    const response = await worker.fetch(new Request(metadata.canonical, googlebot), { ASSETS: assets });
    assert.equal(response.status, 200, `Canonical ID ${metadata.id}: HTTP ${response.status}`);
    assert.ok(!response.headers.has('location'), `Canonical ID ${metadata.id}: yana redirect qildi`);
    const html = await response.text();
    const attrEquals = (pattern, expected) => decodeAttr(html.match(pattern)?.[1] || '') === expected;
    assert.equal(html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1], metadata.canonical, `ID ${metadata.id}: HTML canonical xato`);
    if (metadata.canonicalPath.startsWith('/film/')) {
      assert.ok(html.includes(`<title>${esc(metadata.title)}</title>`), `Worker ${metadata.id}: title`);
      assert.ok(attrEquals(/<meta name="description" content="([^"]*)"/, metadata.description), `Worker ${metadata.id}: description`);
      assert.ok(html.includes(`property="og:title" content="${esc(metadata.title)}"`), `Worker ${metadata.id}: OG title`);
      assert.ok(attrEquals(/<meta property="og:description" content="([^"]*)"/, metadata.description), `Worker ${metadata.id}: OG description`);
      assert.ok(html.includes(`property="og:image" content="${esc(metadata.shareImage)}"`) && html.includes(`property="og:url" content="${esc(metadata.canonical)}"`), `Worker ${metadata.id}: OG image/URL`);
      assert.ok(html.includes(`name="twitter:card" content="${metadata.poster ? 'summary_large_image' : 'summary'}"`) && html.includes(`name="twitter:title" content="${esc(metadata.title)}"`) && attrEquals(/<meta name="twitter:description" content="([^"]*)"/, metadata.description) && html.includes(`name="twitter:image" content="${esc(metadata.shareImage)}"`), `Worker ${metadata.id}: Twitter tags`);
      const robotsMeta = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] || '';
      assert.ok(!/noindex|nofollow/i.test(robotsMeta), `Worker ${metadata.id}: robots metadata blocks crawl`);
      assert.ok(html.includes(`window.DZX_ID=${metadata.id}`), `Worker ${metadata.id}: player ID`);
      const jsonLdText = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
      assert.ok(jsonLdText, `Worker ${metadata.id}: JSON-LD`);
      const graph = JSON.parse(jsonLdText)['@graph'];
      assert.ok(graph.some(node => node['@type'] === metadata.type), `Worker ${metadata.id}: ${metadata.type} schema`);
      assert.ok(graph.some(node => node['@type'] === 'BreadcrumbList') && graph.some(node => node['@type'] === 'Organization') && graph.some(node => node['@type'] === 'WebSite'), `Worker ${metadata.id}: shared JSON-LD schema`);
    } else {
      const jsonLdText = html.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i)?.[1];
      assert.ok(jsonLdText, `Static canonical ID ${metadata.id}: JSON-LD yo‘q`);
      const jsonLd = JSON.parse(jsonLdText);
      const nodes = Array.isArray(jsonLd) ? jsonLd : jsonLd['@graph'] || [jsonLd];
      assert.ok(nodes.some(node => node['@type'] === metadata.type), `Static canonical ID ${metadata.id}: ${metadata.type} schema yo‘q`);
    }
    checkedWorkerPages++;
  }
  for (const sample of samples.filter(row => row.canonicalPath.startsWith('/film/'))) {
    const html = await (await worker.fetch(new Request(sample.canonical, { headers: { 'user-agent': 'Googlebot' } }), { ASSETS: assets })).text();
    assert.equal((html.match(/<base\s/gi) || []).length, 1, 'SEO-friendly URL uchun base href yo‘q yoki takror');
    assert.ok(html.indexOf('<base href="/">') < html.indexOf('href="css/'), 'base href relative CSS’dan keyin joylashgan');
  }
  for (const sitemapUrl of sitemapUrls) {
    const response = await worker.fetch(new Request(sitemapUrl, { headers: { 'user-agent': 'Googlebot' } }), { ASSETS: assets });
    assert.equal(response.status, 200, `Sitemap URL ${sitemapUrl}: HTTP ${response.status}`);
    assert.ok(!response.headers.has('location'), `Sitemap URL redirect qiladi: ${sitemapUrl}`);
  }
  const wrongSlug = [...rows.values()].find(row => row.canonicalPath.startsWith('/film/'));
  const badSlugResponse = await worker.fetch(new Request(`https://dezomax.uz/film/wrong-slug-${wrongSlug.id}.html`), { ASSETS: assets });
  assert.equal(badSlugResponse.status, 301, 'Noto‘g‘ri film slug canonical URLga redirect bo‘lmadi');
  assert.equal(badSlugResponse.headers.get('location'), wrongSlug.canonical, 'Noto‘g‘ri slug redirect maqsadi canonical emas');
  for (const unknown of ['https://dezomax.uz/movie.html', 'https://dezomax.uz/movie.html?id=999999999999', 'https://dezomax.uz/film/not-found-999999999999.html']) {
    const response = await worker.fetch(new Request(unknown), { ASSETS: assets });
    assert.equal(response.status, 404, `Noma’lum film URL 404 bermadi: ${unknown}`);
  }
  console.log(`SEO tekshiruvi o‘tdi: ${rows.size} metadata; ${checkedWorkerPages} canonical film/serial URL; legacy uchun 301; ${sitemapUrls.length} sitemap URL 200/no redirect; 404, OG/Twitter, robots, JSON-LD va duplicate tekshiruvlari.`);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
