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

/* Sahifa yuboradi: { type: 'precache', pages: [...], assets: [...] } — asosiy sahifalar va hozirgi kod fayllari
   birinchi ochilishdayoq saqlanadi (keyin internetsiz ochiladi, oldin kirilmagan bo'lsa ham).
   Sahifalar Accept: text/html bilan so'raladi — ilovada Capacitor ularga o'z ko'prigini qo'shadi. */
self.addEventListener('message', e => {
  const d = e.data || {};
  if (d.type !== 'precache') return;
  e.waitUntil((async () => {
    const pages = await caches.open(PAGES), shell = await caches.open(SHELL);
    for (const u of d.pages || []) {
      try {
        const url = new URL(u, self.registration.scope);
        if (url.origin !== self.location.origin) continue;
        const key = new Request(url.origin + url.pathname);
        const res = await fetch(new Request(url.href, { headers: { Accept: 'text/html' }, credentials: 'same-origin' }));
        if (!res.ok) continue;
        // sahifaning o'z js/css fayllari ham (masalan catalog.js) — aks holda internetsiz sahifa bo'sh ochiladi
        const html = await res.clone().text();
        for (const m of html.matchAll(/(?:src|href)="((?:js|css)\/[^"]+\.(?:js|css)(?:\?[^"]*)?)"/g)) (d.assets = d.assets || []).push(new URL(m[1], url).href);
        await pages.put(key, res);
      } catch {}
    }
    for (const u of d.assets || []) {
      try {
        const url = new URL(u, self.registration.scope);
        if (url.origin !== self.location.origin || !/\.(js|css)$/i.test(url.pathname)) continue;
        if (await shell.match(url.href)) continue;
        const res = await fetch(url.href);
        if (res.ok) await shell.put(url.href, res);
      } catch {}
    }
  })());
});

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

  // sahifalar: internet bor — tegilmaydi (ilovada Capacitor sahifani o'zi ochadi, avvalgidek);
  // internet yo'q — saqlangan nusxa (aynan shu sahifa; boshqa sahifaga «almashtirib» yuborilmaydi)
  if (req.mode === 'navigate') {
    if (!same || self.navigator.onLine !== false) return;
    e.respondWith(offlinePage(req, url));
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
    if (/\.(png|jpe?g|webp|gif|svg|ico|avif)$/i.test(p)) { image(e, req); return; }
    if (/\.(woff2?|ttf|json|webmanifest)$/i.test(p) && !p.includes('/data/')) { e.respondWith(cacheFirst(req, SHELL)); return; }
    return;
  }

  // boshqa saytlardagi posterlar va shriftlar
  // (destination '' — sahifa posterni oldindan saqlash uchun fetch() bilan so'raganda)
  if ((req.destination === 'image' || req.destination === '') && (IMG_HOSTS.test(url.hostname) || /\.(png|jpe?g|webp|gif|avif)(\?|$)/i.test(url.pathname))) {
    if (url.hostname.endsWith('dezocloud.uz') && !url.pathname.startsWith('/t/')) return;
    image(e, req);
    return;
  }
  if (/fonts\.(googleapis|gstatic)\.com$/i.test(url.hostname)) { e.respondWith(cacheFirst(req, SHELL)); return; }
});

/* Rasmlar: internet bor — sahifaga aralashmaymiz (odatdagidek yuklanadi), nusxasini fonda saqlaymiz;
   internet yo'q — saqlangan nusxa. Sahifa yuklanishi va aylantirish og'irlashmaydi. */
function image(e, req) {
  if (self.navigator.onLine === false) {
    e.respondWith(caches.open(IMG).then(c => c.match(req, { ignoreSearch: true })).then(hit => hit || fetch(req)));
    return;
  }
  e.waitUntil((async () => {
    try {
      const c = await caches.open(IMG);
      if (await c.match(req)) return;
      const res = await fetch(req);                       // odatda brauzer keshidan, qayta yuklanmaydi
      if (res && (res.ok || res.type === 'opaque')) { await c.put(req, res); trim(c); }
    } catch {}
  })());
}

async function offlinePage(req, url) {
  const cache = await caches.open(PAGES);
  const hit = await cache.match(new Request(url.origin + url.pathname), { ignoreSearch: true });
  return hit || fetch(req);          // saqlanmagan bo'lsa — odatdagi xato (ilovada «Internet yo'q» sahifasi)
}

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
