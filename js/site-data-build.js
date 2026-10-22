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
  function buildSiteData(list, hidden) {
    const hide = new Set(hidden || []);
    const out = [], desc = {};
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
      out.push(o);
    }
    const site = `/* DezoMax — sayt uchun yengil kinolar ro'yxati (js/site-data-build.js yasaydi, qo'lda o'zgartirmang). To'liq fayl: js/data-custom.js */
var CUSTOM_MOVIES = /*DATA*/[
${out.map(m => JSON.stringify(m)).join(',\n')}
]/*END*/;
var HIDDEN_MOVIES = /*HIDDEN*/${JSON.stringify([...hide])}/*ENDHIDDEN*/;
if (typeof MOVIES !== 'undefined') {
  window.BASE_MOVIES = MOVIES.slice();
  var _at = new Map(MOVIES.map(function (x, i) { return [x.id, i]; }));
  for (var _i = 0; _i < CUSTOM_MOVIES.length; _i++) {
    var _m = CUSTOM_MOVIES[_i], _k = _at.get(_m.id);
    if (_m.title && !_m.title.ru) _m.title.ru = _m.title.uz;
    if (!_m.country) _m.country = { uz: '—', ru: '—' };
    if (!_m.colors) _m.colors = ['#2a3142', '#0d1018'];
    if (_k !== undefined) MOVIES[_k] = _m; else { _at.set(_m.id, MOVIES.length); MOVIES.push(_m); }
  }
  var _hide = new Set(HIDDEN_MOVIES);
  if (_hide.size) MOVIES.splice(0, MOVIES.length, ...MOVIES.filter(function (x) { return !_hide.has(x.id); }));
}
`;
    const descFile = `/* DezoMax — kinolar tavsifi (faqat kino sahifasida yuklanadi; js/site-data-build.js yasaydi) */
var DESC_MAP = ${JSON.stringify(desc)};
if (typeof MOVIES !== 'undefined') for (var _j = 0; _j < MOVIES.length; _j++) { var _d = DESC_MAP[MOVIES[_j].id]; if (_d) MOVIES[_j].desc = _d; }
if (typeof PART_MOVIES !== 'undefined') PART_MOVIES.forEach(function (m) { var d = DESC_MAP[m.id]; if (d) m.desc = d; });
`;
    return { site, desc: descFile };
  }
  root.buildSiteData = buildSiteData;
  if (typeof module !== 'undefined' && module.exports) module.exports = { buildSiteData };
})(typeof window !== 'undefined' ? window : globalThis);
