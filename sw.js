/* ============================================================
   DezoMax — service worker: internetsiz ishlash
   - Sahifalar (HTML): avval internet; internet yo'q yoki ishlamasa (yoqilgan, lekin trafik yo'q) — saqlangan nusxa.
     Har ochilgan sahifa saqlanadi (kino sahifalari ham), eng ko'pi ~250 ta
   - Kod va dizayn (js/css, ?v= versiyali): saqlangan nusxa, yo'q bo'lsa internetdan; eski versiyalari o'chiriladi
   - Ma'lumot (data-custom.js?t=…): avval internet (4 s), bo'lmasa saqlangani — bitta nusxa (?t= siz)
   - Posterlar va rasmlar: saqlangan nusxa (internetsiz ham ko'rinadi), eng ko'pi ~900 ta
   - Video, API, reklama, YouTube — tegilmaydi (to'g'ridan-to'g'ri internet)
   - /_dzx_offline/… — ilovada yuklab olingan kinolar (Android tomoni beradi), tegilmaydi
   ============================================================ */

const SHELL = 'dzx-shell-v1';
const PAGES = 'dzx-pages-v1';
const IMG = 'dzx-img-v1';
const KEEP = [SHELL, PAGES, IMG];
const IMG_MAX = 900;
const PAGES_MAX = 250;
// asosiy sahifalar — eski sahifalar tozalanganda o'chirilmaydi
const CORE = /\/(index|catalog|movie|search|downloads|favorites|tv|sport|account|marvel|plans|shorts)\.html$|\/$/;

self.addEventListener('install', () => self.skipWaiting());

/* Sahifa yuboradi: { type: 'precache', pages: [...], assets: [...] } — asosiy sahifalar va hozirgi kod fayllari
   birinchi ochilishdayoq saqlanadi (keyin internetsiz ochiladi, oldin kirilmagan bo'lsa ham).
   Sahifalar Accept: text/html bilan so'raladi — ilovada Capacitor ularga o'z ko'prigini qo'shadi. */
self.addEventListener('message', e => {
  const d = e.data || {};
  if (d.type === 'images') {
    const job = (async () => {
      const c = await caches.open(IMG);
      const list = (d.images || []).slice(0, 600);
      const one = async u => {
        try {
          if (await c.match(u, { ignoreSearch: false })) return;
          let res = null;
          try { res = await fetch(u, { mode: 'cors', credentials: 'omit' }); } catch {}
          if (!res || !res.ok) res = await fetch(u, { mode: 'no-cors' });
          if (res && (res.ok || res.type === 'opaque')) await c.put(u, res);
        } catch {}
      };
      // 3 tadan parallel — tezroq, lekin telefonni og'irlashtirmaydi
      await Promise.all([0, 1, 2].map(async () => { while (list.length) await one(list.shift()); }));
      trim(c);
    })();
    // ekrandagi rasmlar (≤80) — oxirigacha kutiladi; butun katalog (bulk) — fonda, sayt yangilanishini to'smaydi
    if (!d.bulk) e.waitUntil(job);
    return;
  }
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
    const fresh = new Map();                     // yo'l → hozirgi to'liq manzil (?v= bilan)
    for (const u of d.assets || []) {
      try {
        const url = new URL(u, self.registration.scope);
        if (url.origin !== self.location.origin || !/\.(js|css)$/i.test(url.pathname)) continue;
        if (url.searchParams.has('t')) continue;     // data-custom.js?t= — networkFirst o'zi saqlaydi
        fresh.set(url.pathname, url.href);
        if (await shell.match(url.href)) continue;
        const res = await fetch(url.href);
        if (res.ok) await shell.put(url.href, res);
      } catch {}
    }
    // shu fayllarning eski versiyalari (?v=eski) va ?t= bilan saqlangan ko'p nusxalar — joy egallamasin
    try {
      for (const k of await shell.keys()) {
        const url = new URL(k.url);
        const cur = fresh.get(url.pathname);
        if ((cur && cur !== url.href) || url.searchParams.has('t')) await shell.delete(k);
      }
    } catch {}
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('dzx-') && !KEEP.includes(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

const IMG_HOSTS = /(^|\.)(ytimg\.com|ggpht\.com|googleusercontent\.com|tmdb\.org|wikimedia\.org|dezocloud\.uz|kinopoisk\.ru|yandex\.net)$/i;

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  const url = new URL(req.url);
  if (url.pathname.includes('/_dzx_offline/')) return;            // telefondagi kino — Android beradi
  const same = url.origin === self.location.origin;

  // sahifalar: avval internet; ishlamasa — aynan shu sahifaning saqlangan nusxasi
  // (boshqa sahifaga, masalan bosh sahifaga «almashtirib» yuborilmaydi)
  if (req.mode === 'navigate') {
    if (!same) return;
    e.respondWith(page(e, req, url));
    return;
  }

  if (same) {
    const p = url.pathname;
    if (/\.(js|css)$/i.test(p)) {
      // admin va tez o'zgaradigan ma'lumot — avval internet
      if (url.searchParams.has('t') || /data-custom\.js$|site-config\.js$|admin/i.test(p)) e.respondWith(networkFirst(req, SHELL, url.origin + p));
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
  if (netDead()) {
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

/* Tarmoq javobi yoki (internet yo'q / `wait` ms ichida javob kelmasa) saqlangan nusxa.
   Telefonda internet «yoqilgan», lekin ishlamayotgan bo'lsa ham (trafik tugagan, signal yo'q) ilova ochilaveradi. */
// tarmoq so'nggi daqiqada ishlamadi (internet yoqilgan, lekin trafik yo'q) — rasmlar ham saqlangan nusxadan
let netDeadUntil = 0;
const netDead = () => self.navigator.onLine === false || Date.now() < netDeadUntil;

function raceCache(net, hit, wait) {
  net.then(res => { if (res) netDeadUntil = 0; }, () => { netDeadUntil = Date.now() + 60000; });
  if (!hit) return net;                                  // saqlanmagan — odatdagidek (xato bo'lsa ilovada «Internet yo'q» sahifasi)
  if (self.navigator.onLine === false) { net.catch(() => {}); return Promise.resolve(hit); }
  return new Promise(resolve => {
    const t = setTimeout(() => { netDeadUntil = Date.now() + 60000; resolve(hit); }, wait);
    net.then(res => { clearTimeout(t); resolve(res && (res.ok || res.type === 'opaqueredirect') ? res : hit); },
             () => { clearTimeout(t); resolve(hit); });
  });
}

function page(e, req, url) {
  const key = url.origin + url.pathname;
  const net = fetch(req);
  // yangi javob saqlanadi (keyingi safar internetsiz ochilishi uchun)
  e.waitUntil(net.then(async res => {
    if (!res || !res.ok || res.type !== 'basic') return;
    const copy = res.clone();
    const cache = await caches.open(PAGES);
    await cache.put(key, copy);
    trimPages(cache);
  }).catch(() => {}));
  return caches.open(PAGES).then(c => c.match(key, { ignoreSearch: true })).then(hit => raceCache(net, hit, 6000));
}

async function networkFirst(req, name, key) {
  const cache = await caches.open(name);
  key = key || req.url;
  const net = fetch(req).then(res => {
    if (res && res.ok) cache.put(key, res.clone()).catch(() => {});
    return res;
  });
  const hit = await cache.match(key, { ignoreSearch: true });
  return raceCache(net, hit, 4000);
}

let trimmingPages = false;
async function trimPages(cache) {
  if (trimmingPages || Math.random() > 0.1) return;
  trimmingPages = true;
  try {
    const keys = (await cache.keys()).filter(k => !CORE.test(new URL(k.url).pathname));
    for (let i = 0; i < keys.length - PAGES_MAX; i++) await cache.delete(keys[i]);
  } finally { trimmingPages = false; }
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
