/* ============================================================
   DezoMax — service worker: internetsiz ishlash
   - Sahifalar (HTML): avval internet, bo'lmasa saqlangan nusxa (oxirgi ochilgan holati)
   - Kod va dizayn (js/css, ?v= versiyali): saqlangan nusxa, yo'q bo'lsa internetdan
   - Ma'lumot (data-custom.js?t=…): avval internet, bo'lmasa saqlangani
   - Posterlar va rasmlar: saqlangan nusxa (internetsiz ham ko'rinadi), eng ko'pi ~900 ta
   - Video, API, reklama, YouTube — tegilmaydi (to'g'ridan-to'g'ri internet)
   - /_dzx_offline/… — ilovada yuklab olingan kinolar (Android tomoni beradi), tegilmaydi
   ============================================================ */

const SHELL = 'dzx-shell-v1';
const PAGES = 'dzx-pages-v1';
const IMG = 'dzx-img-v1';
const KEEP = [SHELL, PAGES, IMG];
const IMG_MAX = 900;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('dzx-') && !KEEP.includes(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

const IMG_HOSTS = /(^|\.)(ytimg\.com|ggpht\.com|googleusercontent\.com|tmdb\.org|wikimedia\.org|githubusercontent\.com|dezocloud\.uz|kinopoisk\.ru|yandex\.net)$/i;

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  const url = new URL(req.url);
  if (url.pathname.includes('/_dzx_offline/')) return;            // telefondagi kino — Android beradi
  const same = url.origin === self.location.origin;

  // sahifalar
  if (req.mode === 'navigate') {
    if (!same) return;
    e.respondWith(networkFirst(req, PAGES, new Request(url.origin + url.pathname)));
    return;
  }

  if (same) {
    const p = url.pathname;
    if (/\.(js|css)$/i.test(p)) {
      // admin va tez o'zgaradigan ma'lumot — avval internet
      if (url.searchParams.has('t') || /data-custom\.js$|site-config\.js$|admin/i.test(p)) e.respondWith(networkFirst(req, SHELL));
      else e.respondWith(cacheFirst(req, SHELL));
      return;
    }
    if (/\.(png|jpe?g|webp|gif|svg|ico|avif)$/i.test(p)) { e.respondWith(cacheFirst(req, IMG, true)); return; }
    if (/\.(woff2?|ttf|json|webmanifest)$/i.test(p) && !p.includes('/data/')) { e.respondWith(cacheFirst(req, SHELL)); return; }
    return;
  }

  // boshqa saytlardagi posterlar va shriftlar
  // (destination '' — sahifa posterni oldindan saqlash uchun fetch() bilan so'raganda)
  if ((req.destination === 'image' || req.destination === '') && (IMG_HOSTS.test(url.hostname) || /\.(png|jpe?g|webp|gif|avif)(\?|$)/i.test(url.pathname))) {
    if (url.hostname.endsWith('dezocloud.uz') && !url.pathname.startsWith('/t/')) return;
    e.respondWith(cacheFirst(req, IMG, true));
    return;
  }
  if (/fonts\.(googleapis|gstatic)\.com$/i.test(url.hostname)) { e.respondWith(cacheFirst(req, SHELL)); return; }
});

async function networkFirst(req, name, key) {
  const cache = await caches.open(name);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(key || req, res.clone()).catch(() => {});
    return res;
  } catch (err) {
    const hit = await cache.match(key || req, { ignoreSearch: true }) ||
                (req.mode === 'navigate' && await cache.match(new URL('index.html', self.registration.scope).href, { ignoreSearch: true }));
    if (hit) return hit;
    throw err;
  }
}

async function cacheFirst(req, name, isImg) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    // boshqa saytdagi rasm "opaque" (status 0) bo'lishi mumkin — u ham saqlanadi
    if (res && (res.ok || res.type === 'opaque')) {
      cache.put(req, res.clone()).then(() => { if (isImg) trim(cache); }).catch(() => {});
    }
    return res;
  } catch (err) {
    const old = await cache.match(req, { ignoreSearch: true });
    if (old) return old;
    throw err;
  }
}

let trimming = false;
async function trim(cache) {
  if (trimming || Math.random() > 0.05) return;     // har 20-saqlashda bir marta tekshiramiz
  trimming = true;
  try {
    const keys = await cache.keys();
    for (let i = 0; i < keys.length - IMG_MAX; i++) await cache.delete(keys[i]);
  } finally { trimming = false; }
}
