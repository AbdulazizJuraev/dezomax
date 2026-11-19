/* ============================================================
   Sayt uchun yengil kinolar fayli: js/data-site.js (+ tavsiflar: js/data-desc.js)
   ------------------------------------------------------------
   js/data-custom.js — admin'ning to'liq fayli (o'zgarmaydi, admin va vositalar shuni o'qiydi).
   Sayt esa yengil nusxani yuklaydi (telefonda tez ochilsin):
     - yashirilgan kinolarning to'liq yozuvlari yo'q (faqat id'lari — bazadagilarni yashirish uchun)
     - faqat admin'ga kerak maydonlar yo'q (updatedAt, size), standart qiymatlar yo'q (colors, featured: false)
     - tavsif ruschasi o'zbekchasi bilan bir xil bo'lsa — bir marta
     - tavsiflar alohida faylda (js/data-desc.js) — faqat kino sahifasida yuklanadi;
       karuselga chiqa oladiganlar (keng rasmi bor / tanlangan) tavsifi qisqa holda shu yerda qoladi
   Ishlatadi: js/admin.js (saqlashda), tools/gen-site-data.js (bump-version, GitHub Actions)
   ============================================================ */
(function (root) {
  const DEF_COLORS = '["#2a3142","#0d1018"]';
  const NAME_PREFIX = /^[^\p{L}\p{N}]*(?:\d+\.\s*)?(?:\p{L}+\s+){0,2}?(?:nomi|название)\s*[:\-–—]\s*/iu;
  // butun izoh nom bo'lib qolgan bo'lsa («🎬 Nomi: Atlas\n🌎 Davlati: …») — «nomi:» dan keyingi qator olinadi
  const NAME_LINE = /(?:^|[^\p{L}])(?:\p{L}+\s+){0,2}?nomi\s*[:\-–—]\s*([^\n]+)/iu;
  const stripNamePrefix = t => {
    const s = String(t || '');
    const line = s.includes('\n') ? (s.match(NAME_LINE) || [])[1] : '';
    const c = (line || s).replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{200B}]/gu, ' ').replace(NAME_PREFIX, '').replace(/\s{2,}/g, ' ').trim();
    return c.length >= 2 ? c : s;
  };
  root.stripNamePrefix = stripNamePrefix;
  function slim(m) {
    const o = Object.assign({}, m);
    delete o.updatedAt; delete o.size;
    if (JSON.stringify(o.colors) === DEF_COLORS) delete o.colors;
    if (!o.featured) delete o.featured;
    if (!o.trailer) delete o.trailer;
    if (Array.isArray(o.cast) && !o.cast.length) delete o.cast;
    // takror/standart — sahifada tiklanadi (pastdagi sikl): nomi ikki tilda bir xil, davlat «—»
    // Telegram'dan kelgan nomlar: «Film nomi: X», «# Kino Nomi: X», «✓• Drama nomi: X» → «X» (saytda avtomatik)
    if (o.title) o.title = { uz: stripNamePrefix(o.title.uz), ru: o.title.ru && stripNamePrefix(o.title.ru) };
    if (o.title && o.title.ru === o.title.uz) o.title = { uz: o.title.uz };
    if (o.country && o.country.uz === '—' && (!o.country.ru || o.country.ru === '—')) delete o.country;
    return o;
  }
  function descOf(m) {
    const d = m.desc || {};
    const uz = String(d.uz || ''), ru = String(d.ru || '');
    if (!uz && !ru) return null;
    return ru && ru !== uz ? { uz, ru } : { uz: uz || ru };
  }
  const short = s => (s.length > 240 ? s.slice(0, 237).replace(/\s+\S*$/, '') + '…' : s);

  /* ---------- Bo'laklar (shards) ----------
     Telefonda 18 MB'lik bitta faylni o'qish sahifani bir necha soniya qotirardi (2026-11-19).
     Endi: js/data-site.js — kichik (birinchi ko'rinadigan ~1000 kino + tartib + yuklovchi),
     qolgani js/data-site-<k>.json bo'laklarida (k = Math.floor(id / BUCKET), id ≥ 1e6 — «x»).
     Bo'lak chegaralari o'zgarmaydi: yangi kino faqat oxirgi bo'lakka tushadi, qolganlari keshda qoladi.
     Guruh qismlari (parts) guruh kartasi bilan bitta bo'lakda (kino sahifasi bitta bo'lak bilan ochiladi). */
  const BUCKET = 2500;
  const keyOf = id => (id >= 0 && id < 1e6 ? String(Math.floor(id / BUCKET)) : 'x');
  const hash = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); };
  // id tartibi ixcham: ayirmalar (36-lik), ketma-ket +1 lar — «~n»
  function encodeOrder(ids) {
    const out = []; let prev = 0, run = 0;
    const flush = () => { if (run) { out.push(run === 1 ? '1' : '~' + run.toString(36)); run = 0; } };
    for (const id of ids) {
      const d = id - prev; prev = id;
      if (d === 1) { run++; continue; }
      flush(); out.push(d < 0 ? '-' + (-d).toString(36) : d.toString(36));
    }
    flush();
    return out.join(',');
  }
  const CAT_FR = ['uzbek', 'konsert', 'tahlil', 'dorama', 'anime', 'hind', 'marvel', 'dc'];
  // opts.baseIds — data.js/data-channels/data-rutube dagi id'lar (shularni almashtiradiganlar birinchi bo'lakka)
  function buildSiteData(list, hidden, opts) {
    opts = opts || {};
    const hide = new Set(hidden || []);
    const out = [], desc = {}, pos = new Map();
    for (const m of list || []) {
      if (!m || hide.has(m.id)) continue;   // yashirilgan — saytga kerak emas (admin to'liq faylda saqlaydi)
      const o = slim(m);
      const d = descOf(m);
      delete o.desc;
      if (d) {
        desc[m.id] = d;
        // karusel tavsifi (js/app.js hv2-desc) — keng rasmlilar uchun qisqa holda
        if (m.hposter || m.cover || m.featured) o.desc = d.ru ? { uz: short(d.uz), ru: short(d.ru) } : { uz: short(d.uz) };
      }
      // takror id — avvalgidek: o'rni birinchisiniki, yozuvi oxirgisiniki
      if (pos.has(o.id)) out[pos.get(o.id)] = o; else { pos.set(o.id, out.length); out.push(o); }
    }
    // qism → guruh kartasi (js/common.js buildParts bilan bir xil: birinchi guruh egallaydi)
    const owner = new Map();
    for (const m of out) {
      if (!Array.isArray(m.parts) || m.parts.length < 2 || owner.has(m.id)) continue;
      for (const p of m.parts) if (p !== m.id && pos.has(p) && !owner.has(p)) owner.set(p, m.id);
    }
    const rootOf = id => { let r = id, n = 0; while (owner.has(r) && n++ < 5) r = owner.get(r); return r; };
    const shardOf = new Map(), moved = {};
    for (const m of out) { const k = keyOf(rootOf(m.id)); shardOf.set(m.id, k); if (k !== keyOf(m.id)) moved[m.id] = k; }
    const groups = {}, dgroups = {};
    for (const m of out) {
      const k = shardOf.get(m.id);
      (groups[k] = groups[k] || []).push(m);
      if (desc[m.id]) (dgroups[k] = dgroups[k] || {})[m.id] = desc[m.id];
    }
    const shards = {}, descShards = {}, sh = {}, dh = {};
    for (const k of Object.keys(groups)) { shards[k] = '[\n' + groups[k].map(m => JSON.stringify(m)).join(',\n') + '\n]'; sh[k] = hash(shards[k]); }
    for (const k of Object.keys(dgroups)) { descShards[k] = JSON.stringify(dgroups[k]); dh[k] = hash(descShards[k]); }

    // birinchi bo'lak — sahifa darhol ko'rsatadiganlar (katalog boshi har turi/olami bo'yicha, eng yangilar, bazani almashtiruvchilar)
    const vis = m => !owner.has(m.id) && !!(String(m.video || '').trim() || String(m.trailer || '').trim() || (Array.isArray(m.parts) && m.parts.length > 1));
    const cand = out.filter(vis);
    const pick = new Set();
    const catCmp = (a, b) => (!!b.poster - !!a.poster) || (b.year || 0) - (a.year || 0);
    const newCmp = (a, b) => (b.addedAt || 0) - (a.addedAt || 0);
    const top = (arr, cmp, n) => arr.slice().sort(cmp).slice(0, n).forEach(m => pick.add(m.id));
    const films = cand.filter(m => m.franchise !== 'tahlil');
    top(films, catCmp, 240);
    for (const t of ['film', 'serial', 'multfilm']) top(films.filter(m => m.type === t), catCmp, 72);
    for (const f of CAT_FR) top(cand.filter(m => m.franchise === f), f === 'tahlil' ? newCmp : catCmp, 72);
    top(films.filter(m => m.addedAt && String(m.video || '').trim()), newCmp, 60);
    if (opts.baseIds) for (const m of out) if (opts.baseIds.has(m.id)) pick.add(m.id);
    const first = out.filter(m => pick.has(m.id));

    const S = { b: BUCKET, order: encodeOrder(out.map(m => m.id)), parts: moved, shards: sh, desc: dh };
    const site = `/* DezoMax — sayt uchun yengil kinolar ro'yxati (js/site-data-build.js yasaydi, qo'lda o'zgartirmang). To'liq fayl: js/data-custom.js
   Bu yerda faqat birinchi ko'rinadigan kinolar; qolgani js/data-site-<k>.json bo'laklarida — sahifa chizilgach yuklanadi (window.dzxData) */
var HIDDEN_MOVIES = /*HIDDEN*/${JSON.stringify([...hide])}/*ENDHIDDEN*/;
var CUSTOM_MOVIES = /*DATA*/[
${first.map(m => JSON.stringify(m)).join(',\n')}
]/*END*/;
var DZX_SITE = ${JSON.stringify(S)};
(${siteLoader.toString()})(DZX_SITE);
`;
    // tavsiflar ham bo'laklarda (js/data-desc-<k>.json); bu fayl — faqat «shu sahifaga tavsif kerak» belgisi
    const descFile = `/* DezoMax — kinolar tavsifi kerakligi belgisi (js/site-data-build.js yasaydi). Tavsiflar: js/data-desc-<k>.json —
   kino sahifasida faqat shu kinoning bo'lagi, boshqa sahifalarda hammasi fonda yuklanadi (js/data-site.js → dzxData) */
window.DZX_DESC = 1;
if (window.dzxData && window.dzxData.wantDesc) window.dzxData.wantDesc();
`;
    return { site, desc: descFile, shards, descShards };
  }

  /* ---------- Brauzerdagi yuklovchi (js/data-site.js ichiga yoziladi) ----------
     window.dzxData:
       .full            — hamma bo'laklar yuklandimi; .done — yuklash urinishi tugadi (internet bo'lmasa full=false)
       .ready           — Promise: hammasi yuklanib MOVIES to'liq bo'lganda
       .need(ids)       — shu kinolar bo'laklarini (va tavsifini) birinchi navbatda yuklaydi → Promise
       .load()          — hammasini yuklashni boshlash (odatda o'zi, sahifa chizilgach)
       .onFull(fn)      — to'liq bo'lganda chaqiradi
     Hodisa: document 'dzx:full'. js/common.js window.dzxDataHooks orqali o'z tozalashlarini (posterlar,
     videosizlarni olib tashlash, guruhlar) har yig'ishda qayta bajaradi.
     Node (tools/*): loadSiteShards — tarmoqsiz, sinxron. */
  function siteLoader(S) {
    var W = typeof window !== 'undefined' ? window : globalThis;
    var HAS = typeof MOVIES !== 'undefined';
    var BASE = HAS ? MOVIES.slice() : [];
    if (HAS) W.BASE_MOVIES = BASE;
    var hide = new Set(HIDDEN_MOVIES);
    var known = new Map(), descs = {}, have = {}, haveDesc = {}, pend = {}, pendDesc = {};
    var ORDER = null, inOrder = null;
    var KEYS = Object.keys(S.shards);
    var fix = function (m) {
      if (m.title && !m.title.ru) m.title.ru = m.title.uz;
      if (!m.country) m.country = { uz: '—', ru: '—' };
      if (!m.colors) m.colors = ['#2a3142', '#0d1018'];
      return m;
    };
    var order = function () {
      if (ORDER) return ORDER;
      var t = S.order ? S.order.split(',') : [], out = [], prev = 0;
      for (var i = 0; i < t.length; i++) {
        var s = t[i];
        if (s.charAt(0) === '~') { for (var n = parseInt(s.slice(1), 36); n > 0; n--) out.push(++prev); }
        else out.push(prev += (s.charAt(0) === '-' ? -parseInt(s.slice(1), 36) : parseInt(s, 36)));
      }
      ORDER = out; inOrder = new Set(out);
      return out;
    };
    var keyOf = function (id) {
      var k = S.parts[id];
      return k != null ? k : (id >= 0 && id < 1e6 ? String(Math.floor(id / S.b)) : 'x');
    };
    var put = function (list) { for (var i = 0; i < list.length; i++) known.set(list[i].id, fix(list[i])); };
    put(CUSTOM_MOVIES);

    var D = W.dzxData = {
      full: false, S: S, keyOf: keyOf,
      has: function (id) { order(); return !inOrder.has(id) || !!have[keyOf(id)]; },
      feed: function (k, list) { if (typeof list === 'string') list = JSON.parse(list); put(list); have[k] = 1; },
      feedDesc: function (k, map) { if (typeof map === 'string') map = JSON.parse(map); for (var id in map) descs[id] = map[id]; haveDesc[k] = 1; },
      // MOVIES qaytadan: asosiy ro'yxat (data.js, kanallar, RuTube) + shu paytgacha ma'lum qo'shilganlar (data-custom tartibida)
      assemble: function () {
        var full = KEYS.every(function (k) { return have[k]; });
        if (!HAS) return full;
        var ids = order(), at = new Map(), out = [], cm = [], i, m, k;
        for (i = 0; i < BASE.length; i++) { at.set(BASE[i].id, out.length); out.push(BASE[i]); }
        for (i = 0; i < ids.length; i++) {
          m = known.get(ids[i]);
          if (!m) continue;
          cm.push(m);
          k = at.get(m.id);
          if (k !== undefined) out[k] = m; else { at.set(m.id, out.length); out.push(m); }
        }
        var RD = typeof RUTUBE_DESC !== 'undefined' ? RUTUBE_DESC : null;
        MOVIES.length = 0;
        for (i = 0; i < out.length; i++) {
          m = out[i];
          if (hide.has(m.id)) continue;
          if (descs[m.id]) m.desc = descs[m.id];
          if (RD && RD[m.id]) m.desc = { uz: RD[m.id] };
          MOVIES.push(m);
        }
        CUSTOM_MOVIES.length = 0;
        for (i = 0; i < cm.length; i++) CUSTOM_MOVIES.push(cm[i]);
        var hooks = W.dzxDataHooks || [];
        for (i = 0; i < hooks.length; i++) { try { hooks[i](full); } catch (e) {} }
        return full;
      }
    };
    D.assemble();
    if (typeof document === 'undefined' || !document.addEventListener || typeof fetch !== 'function') return;

    // bo'lak manzili — shu skript turgan papka (js/)
    var cs = document.currentScript && document.currentScript.src ? document.currentScript : document.querySelector('script[src*="data-site.js"],script[src*="data-home.js"]');
    var dir = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : new URL('js/', document.baseURI).href;
    var url = function (kind, k, h) { return dir + 'data-' + kind + '-' + k + '.json?h=' + h; };
    var get = function (u) {
      var go = function () { return fetch(u).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }); };
      return go().catch(function () { return new Promise(function (r) { setTimeout(r, 2500); }).then(go); });
    };
    // JSON.parse — har bo'lak alohida vazifada (asosiy oqim uzoq band bo'lmasin)
    var tick = typeof MessageChannel !== 'undefined' ? (function () { var c = new MessageChannel(), f = []; c.port1.onmessage = function () { f.shift()(); }; return function (fn) { f.push(fn); c.port2.postMessage(0); }; })() : function (fn) { setTimeout(fn, 0); };
    var q = [], busy = false;
    var pump = function () {
      if (busy || !q.length) return;
      busy = true;
      tick(function () { var j = q.shift(); try { j(); } catch (e) {} busy = false; pump(); });
    };
    var parseLater = function (fn) { return function (txt) { return new Promise(function (res) { q.push(function () { try { fn(txt); } finally { res(); } }); pump(); }); }; };
    // yuklanmasa (internet yo'q) — xato emas: borlari bilan ishlaymiz
    var loadKey = function (k) {
      if (have[k]) return Promise.resolve();
      return pend[k] || (pend[k] = get(url('site', k, S.shards[k])).then(parseLater(function (t) { D.feed(k, t); }), function () { pend[k] = null; }));
    };
    var loadDesc = function (k) {
      if (haveDesc[k] || !S.desc[k]) return Promise.resolve();
      return pendDesc[k] || (pendDesc[k] = get(url('desc', k, S.desc[k])).then(parseLater(function (t) { D.feedDesc(k, t); }), function () { pendDesc[k] = null; }));
    };
    var moviePage = function () { return !!W.DZX_ID || /\/movie\.html$/.test(location.pathname); };
    var fire = function () { try { document.dispatchEvent(new CustomEvent('dzx:full')); } catch (e) {} };
    var resolveReady, all = null;
    D.ready = new Promise(function (r) { resolveReady = r; });
    D.onFull = function (fn) { D.ready.then(function () { tick(fn); }); };
    D.need = function (ids, opt) {
      order();
      var ks = {}, ds = {};
      (ids || []).forEach(function (id) {
        id = Number(id);
        if (!inOrder.has(id)) return;
        var k = keyOf(id);
        if (!have[k]) ks[k] = 1;
        if (W.DZX_DESC && !(opt && opt.desc === false) && !haveDesc[k]) ds[k] = 1;
      });
      var jobs = Object.keys(ks).map(loadKey).concat(Object.keys(ds).map(loadDesc));
      if (!jobs.length) return Promise.resolve(false);
      return Promise.all(jobs).then(function () { if (!D.full) D.assemble(); return true; });
    };
    D.loadDesc = function () {
      return Promise.all(Object.keys(S.desc).map(loadDesc)).then(function () { tick(function () { D.assemble(); fire(); }); });
    };
    D.wantDesc = function () { if (all && !moviePage()) all.then(D.loadDesc); };
    D.load = function () {
      if (all) return all;
      all = Promise.all(KEYS.map(loadKey)).then(function () {
        return new Promise(function (res) {
          tick(function () {
            D.full = D.assemble();
            res();
            tick(function () { D.done = true; resolveReady(D.full); fire(); });
          });
        });
      });
      if (W.DZX_DESC) D.wantDesc();
      return all;
    };
    // birinchi chizishdan keyin (rAF + 0); fon sahifada rAF ishlamasa — 400 ms dan keyin
    var start = function () {
      var done = false, go = function () { if (!done) { done = true; D.load(); } };
      setTimeout(go, 400);
      if (W.requestAnimationFrame) requestAnimationFrame(function () { setTimeout(go, 0); });
    };
    if (W.DZX_SITE_MANUAL) return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  }

  /* Node: data-site.js ni vm kontekstida ishga tushirgandan keyin — bo'laklarni diskdan o'qib, MOVIES/CUSTOM_MOVIES ni to'ldiradi */
  function loadSiteShards(ctx, rootDir, withDesc) {
    const fs = require('fs'), path = require('path');
    const D = (ctx.window && ctx.window.dzxData) || ctx.dzxData;
    if (!D) throw new Error('dzxData topilmadi (data-site.js ishga tushmagan)');
    for (const k of Object.keys(D.S.shards)) D.feed(k, fs.readFileSync(path.join(rootDir, 'js', `data-site-${k}.json`), 'utf8'));
    if (withDesc) for (const k of Object.keys(D.S.desc)) D.feedDesc(k, fs.readFileSync(path.join(rootDir, 'js', `data-desc-${k}.json`), 'utf8'));
    D.assemble();
    return ctx;
  }
  root.buildSiteData = buildSiteData;
  root.loadSiteShards = loadSiteShards;
  if (typeof module !== 'undefined' && module.exports) module.exports = { buildSiteData, loadSiteShards, keyOf };
})(typeof window !== 'undefined' ? window : globalThis);
