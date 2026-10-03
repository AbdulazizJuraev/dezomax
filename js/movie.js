/* ============================================================
   DezoMax — kino sahifasi / страница фильма
   URL: movie.html?id=1   (&play=1 — darhol pleyerga o'tish)
   ============================================================ */

const qp = new URLSearchParams(location.search);
const movieId = Number(window.DZX_ID || qp.get('id'));   // kino/<slug>.html — tools/gen-pages.js

/* Guruh (qismlar, js/common.js): qismning o'zi ochilsa — guruh sahifasiga, shu qism tanlangan holda */
const partRedirect = typeof PART_OF !== 'undefined' && PART_OF.get(movieId);
if (partRedirect) {
  // qism raqami — saytda ko'rinadigan tartib bo'yicha (videosiz guruh kartasi sanalmaydi)
  const idx = partsOf(MOVIES.find(m => m.id === partRedirect.parent)).findIndex(p => p.id === movieId);
  location.replace(`movie.html?id=${partRedirect.parent}&part=${idx > -1 ? idx + 1 : partRedirect.n}${qp.get('play') ? '&play=1' : ''}`);
}
const group = partRedirect ? null : MOVIES.find(m => m.id === movieId);
const PARTS = typeof partsOf === 'function' ? partsOf(group) : [];
const partNo = PARTS.length ? Math.min(Math.max(1, Math.round(+qp.get('part') || 1)), PARTS.length) : 0;
// sahifa ma'lumotlari — guruh kartasidan, pleyer videosi — tanlangan qismdan
// qismning o'z muqovasi bo'lsa (YouTube seriallari) — o'shanisi, aks holda guruhniki
const movie = partNo ? (({ video, videos, source, lang, langs, cover }) => ({ ...group, video, videos, source: source || group.source, lang: lang || group.lang, langs, cover: (group.eps && cover) || group.cover }))(PARTS[partNo - 1]) : group;
const partUrl = n => `movie.html?id=${group.id}&part=${n}&play=1`;

/* ---------- Pleyer ----------
   Qo'llab-quvvatlanadigan havolalar:
     YouTube, Vimeo, Google Drive, .mp4/.webm, .m3u8 (HLS) va boshqa embed havolalar
   -------------------------------------------------------------- */

function embedFor(url) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return {
    html: `<iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0&modestbranding=1"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowfullscreen loading="lazy"></iframe>`,
    external: 'https://www.youtube.com/watch?v=' + yt[1]
  };

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return {
    html: `<iframe src="https://player.vimeo.com/video/${vimeo[1]}"
             allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`,
    external: url
  };

  const drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (drive) return {
    html: `<iframe src="https://drive.google.com/file/d/${drive[1]}/preview"
             allow="autoplay" allowfullscreen loading="lazy"></iframe>`,
    external: url
  };

  if (/\.m3u8(\?|$)/i.test(url)) return {
    html: `<video controls playsinline poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-hls="${esc(url)}"></video>`,
    external: url
  };

  if (/\.(mp4|webm|ogv|ogg|mov|m4v)(\?|$)/i.test(url)) return {
    html: `<video controls playsinline preload="metadata" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><source src="${esc(url)}"></video>`,
    external: url
  };

  // Boshqa har qanday havola — oddiy iframe sifatida
  return { html: `<iframe src="${esc(url)}" allow="autoplay; encrypted-media; fullscreen" allowfullscreen loading="lazy"></iframe>`, external: url };
}

/* .m3u8 uchun hls.js ni faqat kerak bo'lganda yuklaymiz */
function initHls(video) {
  const src = video.dataset.hls;
  if (video.canPlayType('application/vnd.apple.mpegurl')) { video.src = src; return; }
  if (window.Hls) { attach(); return; }
  const s = document.createElement('script');
  s.src = 'js/hls.min.js';
  s.onload = attach;
  document.head.appendChild(s);
  function attach() {
    if (window.Hls && Hls.isSupported()) { const h = new Hls(); h.loadSource(src); h.attachMedia(video); }
    else video.src = src;
  }
}

/* Mavjud manbalar: to'liq kino va/yoki treyler */
function sourcesOf(m) {
  const list = [];
  if (m.video)   list.push({ key: 'film',    label: t('player.film'),    url: m.video });
  if (m.trailer) list.push({ key: 'trailer', label: t('player.trailer'), url: m.trailer });
  return list;
}

/* Pleyer muqovasi uchun albom (keng, 16:9) rasm: o'zbek filmlarining keng muqovasi yoki
   rasmiy treylerning YouTube rasmi (bosh sahifa slayderidagi kabi). Topilmasa — null (tik poster) */
function wideCover(m) {
  if (!m) return null;
  if (m.cover) return m.cover;                     // admin'da qo'lda qo'yilgan muqova
  if (m.poster && m.poster.startsWith('images/uz/')) return m.poster;
  const id = m.trailer && typeof youTubeId === 'function' ? youTubeId(m.trailer) : null;
  return id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : null;
}

/* maxresdefault bo'lmagan eski videolarda YouTube 120×90 kulrang rasm beradi — kattarog'iga o'tamiz */
function ytThumbFix(img) {
  if (!img || !/i\.ytimg\.com/.test(img.src)) return;
  // YouTube'da kerakli o'lcham bo'lmasa: 404 (ilova brauzeri rasmni «xato» deb olib tashlaydi — inline onerror)
  // yoki kulrang 120×90 belgi. Ketma-ket: maxres → sd → hq → kinoning o'z posteri (tik, xira fon ustida o'rtada).
  const host = img.parentElement, anchor = img.nextSibling;
  img.removeAttribute('onerror');
  const next = () => {
    if (!img.isConnected && host) host.insertBefore(img, anchor && anchor.parentNode === host ? anchor : null);
    const n = img.src.includes('maxresdefault') ? 'sddefault' : img.src.includes('sddefault') ? 'hqdefault' : null;
    if (n) { img.src = img.src.replace(/(maxresdefault|sddefault)/, n); return; }
    const poster = movie && movie.poster;
    if (!poster || img.dataset.fallback) { img.remove(); return; }
    img.dataset.fallback = '1';
    img.classList.remove('is-wide');
    if (host && !host.querySelector('.vp-cover-bg')) {
      img.insertAdjacentHTML('beforebegin', `<span class="vp-cover-bg" style="background-image:url('${esc(poster)}')"></span>`);
    }
    img.src = poster;
  };
  img.addEventListener('load', () => { if (!img.dataset.fallback && img.naturalWidth > 0 && img.naturalWidth <= 120) next(); });
  img.addEventListener('error', () => { if (!img.dataset.fallback) next(); else img.remove(); });
  if (img.complete && (img.naturalWidth === 0 || img.naturalWidth <= 120)) next();
}

function mountPlayer(url) {
  const box = document.getElementById('playerBox');
  const link = document.getElementById('playerExternal');
  const { html, external } = embedFor(url);

  if (typeof destroyVideo === 'function') destroyVideo();

  // «http://» havola (YouTube/Vimeo/Drive emas — ular https'ga o'giriladi): HTTPS saytda brauzer
  // uni sahifa ichida to'sadi (aralash kontent). Ilovada sahifa ichida o'ynaydi (allowMixedContent),
  // brauzerda esa video alohida oynada ochiladi.
  const inApp = !!(window.Capacitor?.isNativePlatform?.()) || /DezoMaxApp/.test(navigator.userAgent);
  if (/^http:\/\//i.test(url) && location.protocol === 'https:' && !inApp &&
      !(typeof youTubeId === 'function' && youTubeId(url)) && !/youtu.?be|vimeo\.com|drive\.google\.com/i.test(url)) {
    if (typeof destroyYouTube === 'function') destroyYouTube();
    box.classList.remove('ytp');
    box.innerHTML = `
      <div class="player-placeholder">
        <div class="pp-icon">${ICONS.play}</div>
        <h3>${LANG === 'ru' ? 'Видео откроется в новом окне' : 'Video yangi oynada ochiladi'}</h3>
        <p>${LANG === 'ru' ? 'Источник работает по http:// — браузер не даёт встроить его в страницу.' : 'Manba http:// orqali ishlaydi — brauzer uni sahifa ichida ko‘rsatishga ruxsat bermaydi.'}</p>
        <a class="btn btn-primary" href="${esc(url)}" target="_blank" rel="noopener" style="margin-top:14px">${ICONS.play}<span>${LANG === 'ru' ? 'Смотреть' : 'Tomosha qilish'}</span></a>
      </div>`;
    if (link) { link.href = url; link.hidden = false; }
    return;
  }

  // Telefonga yuklab olingan bo'lsa — internetsiz, telefondagi fayldan (js/offline.js)
  const local = typeof Offline !== 'undefined' ? Offline.localFor(url) : null;
  if (local && typeof mountVideo === 'function') {
    const wide = wideCover(movie);
    mountVideo(box, local, {
      poster: wide || movie?.poster || null,
      wide: !!wide,
      title: movie ? title(movie) + (typeof partNo !== 'undefined' && partNo ? ` · ${partLabel(partNo)}` : '') : ''
    });
    if (link) link.hidden = true;
    return;
  }
  if (!navigator.onLine && typeof offlineNoticeHTML === 'function') {
    box.innerHTML = offlineNoticeHTML();
    box.querySelector('[data-offline-close]')?.remove();
    addEventListener('online', () => location.reload(), { once: true });
    if (link) link.hidden = true;
    return;
  }

  // DezoCloud ulashish havolasi (dezocloud.uz/s/…) — faylni to'g'ridan-to'g'ri o'z pleyerimizda (/v/…).
  // Fayl brauzerda o'ynamasa — DezoCloud sahifasi pleyer bo'yicha to'liq (embed=1) ochiladi.
  const dcTok = (String(url).match(/^https?:\/\/(?:www\.)?dezocloud\.uz\/s\/([\w-]+)/i) || [])[1];
  if (dcTok && typeof mountVideo === 'function') {
    const isFilm = movie && url === movie.video;
    const wide = wideCover(movie);
    mountVideo(box, `https://dezocloud.uz/v/${dcTok}`, {
      poster: wide || movie?.poster || null,
      wide: !!wide,
      title: movie ? title(movie) + (typeof partNo !== 'undefined' && partNo ? ` · ${partLabel(partNo)}` : '') : '',
      preroll: isFilm,
      onFail: () => {
        if (typeof destroyVideo === 'function') destroyVideo();
        box.classList.remove('ytp', 'vp', 'ytp-idle');
        box.innerHTML = `<iframe src="https://dezocloud.uz/s/${dcTok}?embed=1" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>`;
      }
    });
    ytThumbFix(box.querySelector('.vp-cover-img'));
    if (link) { link.href = external; link.hidden = false; }
    return;
  }

  // .mp4 / .webm / .m3u8 — o'z pleyerimiz (js/vplayer.js): sifat, tezlik, ±10 s, katta ekran
  if (typeof mountVideo === 'function' && /\.(mp4|webm|ogv|m4v|mov|m3u8)(\?|$)/i.test(url)) {
    const isFilm = movie && url === movie.video;
    const wide = wideCover(movie);
    mountVideo(box, url, {
      poster: wide || movie?.poster || null,
      wide: !!wide,
      title: movie ? title(movie) : '',
      qualities: isFilm ? (movie.videos || []) : [],
      preroll: isFilm
    });
    ytThumbFix(box.querySelector('.vp-cover-img'));
    if (link) { link.href = external; link.hidden = false; }
    return;
  }

  // YouTube — o'z pleyerimiz (js/ytplayer.js): o'z posterimiz, tugmalarimiz
  if (typeof mountYouTube === 'function' && youTubeId(url)) {
    // tik poster keng ekranga sig'maydi — faqat keng muqovali (o'zbek filmlari) rasmini beramiz
    const wide = movie ? movie.cover || (movie.poster && movie.poster.startsWith('images/uz/') ? movie.poster : null) : null;
    // treylerdan oldin reklama yo'q — faqat to'liq film oldidan (js/ads.js)
    mountYouTube(box, url, { poster: wide, title: movie ? title(movie) : '', preroll: !!movie && url === movie.video });
    if (link) { link.href = external; link.hidden = false; }
    return;
  }

  if (typeof destroyYouTube === 'function') destroyYouTube();
  box.classList.remove('ytp');
  if (link) { link.href = external; link.hidden = false; }
  const embed = () => {
    box.innerHTML = html;
    const v = box.querySelector('video[data-hls]');
    if (v) initHls(v);
  };
  // Tashqi pleyer (iframe) — filmda avval o'z muqovamiz (albom rasm + play), bosilganda
  // (reklama bo'lsa — reklama, keyin) tashqi pleyer ochiladi
  if (movie && url === movie.video) {
    const wide = wideCover(movie);
    box.innerHTML = `
      <button class="ytp-cover" type="button" aria-label="${esc(t('player.play'))}">
        ${wide ? `<img class="vp-cover-img is-wide" src="${esc(wide)}" alt="">`
          : movie.poster ? `<span class="vp-cover-bg" style="background-image:url('${esc(movie.poster)}')"></span><img class="vp-cover-img" src="${esc(movie.poster)}" alt="" onerror="this.remove()">` : ''}
        <span class="ytp-cover-shade"></span>
        <span class="ytp-big">${YT_ICONS.play}</span>
        <span class="ytp-cover-title">${esc(title(movie))}</span>
      </button>`;
    const cover = box.querySelector('.ytp-cover');
    ytThumbFix(cover.querySelector('.vp-cover-img'));
    cover.addEventListener('click', async () => {
      cover.disabled = true;
      if (typeof Ads !== 'undefined') await Ads.preroll(box);
      if (cover.isConnected) embed();
    }, { once: true });
    return;
  }
  embed();
}

/* ---------- Ovoz tili: bayroqli tugmalar ----------
   Kino (yoki qism) maydonlari:  lang: 'en'  — asosiy video (m.video) tili;
   langs: { ru: 'https://…', uz: 'https://…' } — shu kinoning boshqa tildagi qonuniy versiyalari.
   Tanlangan til eslab qolinadi (keyingi qism/kino ham shu tilda ochiladi, bo'lsa). */
// bayroqlar va til nomlari — js/common.js (LANG_FLAGS, LANG_NAMES; admin ham ishlatadi)
const AUDIO_KEY = 'dezomax_audio_lang';

function langsOf(m) {
  if (!m || !m.video) return [];
  const main = m.lang || (m.audio === 'uz' ? 'uz' : '') || (m.langs && Object.values(m.langs).some(Boolean) ? 'orig' : '');
  const list = main ? [{ code: main, url: m.video }] : [];
  for (const [code, url] of Object.entries(m.langs || {})) {
    if (url && !list.some(l => l.code === code)) list.push({ code, url });
  }
  return list;
}

function pickLang(list) {
  let want = '';
  try { want = localStorage.getItem(AUDIO_KEY) || ''; } catch (e) {}
  return list.find(l => l.code === want) || list.find(l => l.code === LANG) || list[0];
}

function langsHTML(list, active) {
  if (!list.length) return '';
  return `<div class="player-langs" role="group" aria-label="${LANG === 'ru' ? 'Язык озвучки' : 'Ovoz tili'}">${list.map(l => {
    const name = (LANG_NAMES[l.code] || {})[LANG] || l.code.toUpperCase();
    return `<button type="button" class="player-lang${l === active ? ' is-active' : ''}" data-lang="${esc(l.code)}" data-src="${esc(l.url)}" title="${esc(name)}" aria-label="${esc(name)}" aria-pressed="${l === active}">${LANG_FLAGS[l.code] || `<b>${esc(l.code.toUpperCase())}</b>`}</button>`;
  }).join('')}</div>`;
}

function playerSectionHTML(m) {
  const sources = sourcesOf(m);
  const langs = langsOf(m);
  const lang = langs.length ? pickLang(langs) : null;
  if (lang && sources[0] && sources[0].key === 'film') sources[0].url = lang.url;

  if (!sources.length) {
    return `
      <div class="player-wrap">
        <div class="player-placeholder">
          <div class="pp-icon">${ICONS.play}</div>
          <h3>${t('player.noSource')}</h3>
          <p>${t('player.hint')}</p>
        </div>
      </div>`;
  }

  const tabs = sources.length > 1 || langs.length
    ? `<div class="player-tabs">${sources.length > 1 ? sources.map((s, i) =>
        `<button class="chip${i === 0 ? ' is-active' : ''}" data-key="${s.key}" data-src="${esc(s.url)}">${esc(s.label)}</button>`).join('') : ''}${langsHTML(langs, lang)}</div>`
    : '';

  const note = !m.video && m.trailer
    ? `<p class="player-note">${t('player.trailerOnly')}</p>`
    : '';

  // Rasmiy manba (masalan studiyaning YouTube kanali) — kim joylaganini ochiq ko'rsatamiz
  const source = m.source
    ? `<p class="player-note">${t('player.source')}: <a href="${esc(m.source.url)}" target="_blank" rel="noopener">${esc(m.source.name)}</a></p>`
    : '';

  return `
    ${tabs}
    <div class="player-wrap" id="playerBox"></div>
    <div class="player-foot">
      ${note}${source}
    </div>`;
}

/* Rasmiy manbadan olingan video — sahifaga kirganda darhol ko'rinadi (masalan Marvel'ning YouTube kanali) */
function officialHTML(m) {
  if (!m.source || !m.source.name || !hasFilm(m)) return '';
  const yt = /youtube\.com|youtu\.be/.test(m.source.url || '');
  const text = LANG === 'ru'
    ? (yt ? `Официальный YouTube-канал ${m.source.name}` : `Официальный источник: ${m.source.name}`)
    : (yt ? `${m.source.name}’ning rasmiy YouTube kanalidan` : `Rasmiy manba: ${m.source.name}`);
  // studiya/servis logotiplari (kino maydoni brands: ['marvel', 'disney-plus'] → images/brands/)
  const BRANDS = { marvel: ['marvel.svg', 'Marvel'], 'disney-plus': ['disney-plus-white.svg', 'Disney+'] };
  const logos = (m.brands || []).filter(b => BRANDS[b])
    .map(b => `<img class="mv-brand is-${b}" src="images/brands/${BRANDS[b][0]}" alt="${BRANDS[b][1]}" title="${BRANDS[b][1]}">`).join('');
  return `<a class="mv-official${logos ? ' has-brands' : ''}" id="mvOfficial" href="${esc(m.source.url || '#')}" target="_blank" rel="noopener">
    ${logos ? `<span class="mv-brands">${logos}</span>` : ''}
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
    <span>${esc(text)}</span><i>✓</i></a>`;
}

/* «Rasmiy manba» belgisi faqat o'sha manbadagi video ochiq turganda ko'rinadi — boshqa tildagi
   versiya (masalan admin qo'shgan tarjima) rasmiy kanalniki deb ko'rinib qolmasin */
function syncOfficial(url) {
  const el = document.getElementById('mvOfficial');
  if (!el || !movie.source || !movie.source.url) return;
  const host = u => { try { return new URL(u).hostname.replace(/^(www|m)\./, '').replace('youtu.be', 'youtube.com'); } catch (e) { return ''; } };
  el.hidden = !!url && host(url) !== host(movie.source.url);
}

/* ---------- Guruh qismlari: «1-qism, 2-qism…» tugmalari ---------- */
const partLabel = n => LANG === 'ru' ? `${n} серия` : `${n}-qism`;

function partsBarHTML() {
  if (!partNo) return '';
  return `
    <div class="mv-parts">
      <div class="mv-parts-head">
        <b>${LANG === 'ru' ? 'Серии' : 'Qismlar'}</b>
        <span>${esc(durationText(group))}</span>
      </div>
      <div class="mv-parts-list">
        ${PARTS.map((p, i) => `<a class="mv-part${i + 1 === partNo ? ' is-on' : ''}" href="${partUrl(i + 1)}"${i + 1 === partNo ? ' aria-current="true"' : ''}><b>${partLabel(i + 1)}</b>${p.duration ? `<small>${p.duration} ${t('movie.min')}</small>` : ''}</a>`).join('')}
      </div>
    </div>`;
}

/* ---------- O'xshash kinolar ---------- */

function similarOf(m) {
  return MOVIES
    // faqat to'liq film qo'shilganlar (movie.html'da MOVIES to'liq — o'xshashlar orasidan filtrlaymiz)
    .filter(x => x.id !== m.id && (typeof hasFilm !== 'function' || hasFilm(x)))
    // bir xil olam (o'zbek kino, Marvel, DC) — janr mosligidan ham muhimroq
    .map(x => ({ x, score: x.genres.filter(g => m.genres.includes(g)).length + (m.franchise && x.franchise === m.franchise ? 3 : 0) }))
    .filter(o => o.score > 0)
    .sort((a, b) => b.score - a.score || (b.x.rating || 0) - (a.x.rating || 0))
    .slice(0, 12)
    .map(o => o.x);
}

/* ---------- Qidiruv tizimlari uchun (Google, Yandex) ----------
   Sarlavha, tavsif, ijtimoiy tarmoq kartasi va schema.org Movie ma'lumoti — kino nomi bilan
   qidirganda aynan shu sahifa chiqishi uchun */
/* Boshqa nomlari (admin → teglar): odamlar kinoni turlicha qidiradi — "Qasoskorlar: Intiho",
   "Avengers: Endgame". Sahifada ko'rinadi va qidiruv tizimlariga ham beriladi */
function akaOf(m) {
  const own = [m.title.uz, m.title.ru].map(x => (x || '').toLowerCase());
  return [...new Set(m.tags || [])].filter(x => x && x.length > 2 && !own.includes(x.toLowerCase()) && !/^(marvel|dc)$/i.test(x));
}

function setMovieSeo(m) {
  const name = title(m);
  const watch = watchStatus(m) === 'trailer'
    ? (LANG === 'ru' ? 'трейлер' : 'treyler')
    : (LANG === 'ru' ? 'смотреть онлайн' : 'onlayn ko‘rish');
  const aka = akaOf(m);
  const desc = `${name}${m.year ? ` (${m.year})` : ''} — ${watch}.${aka.length ? ` (${aka.join(', ')})` : ''} ${descOf(m)}`.slice(0, 300);
  const abs = p => p ? new URL(p, 'https://dezomax.uz/').href : '';
  const setMeta = (attr, key, val) => {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
    el.setAttribute('content', val);
  };
  setMeta('name', 'description', desc);
  setMeta('property', 'og:title', document.title);
  setMeta('property', 'og:description', desc);
  setMeta('property', 'og:type', 'video.movie');
  setMeta('name', 'twitter:title', document.title);
  setMeta('name', 'twitter:description', desc);
  if (m.poster) { setMeta('property', 'og:image', abs(m.poster)); setMeta('name', 'twitter:image', abs(m.poster)); }

  const ld = {
    '@context': 'https://schema.org',
    '@type': m.type === 'serial' ? 'TVSeries' : 'Movie',
    name,
    alternateName: [m.title.uz, m.title.ru, ...aka].filter(x => x && x !== name),
    description: descOf(m),
    url: 'https://dezomax.uz/' + movieHref(m),
    ...(m.poster ? { image: abs(m.poster) } : {}),
    ...(m.year ? { datePublished: String(m.year) } : {}),
    ...(m.genres?.length ? { genre: m.genres.map(genreName) } : {}),
    ...(m.director ? { director: m.director.split(/,\s*/).map(n => ({ '@type': 'Person', name: n })) } : {}),
    ...(m.cast?.length ? { actor: m.cast.map(n => ({ '@type': 'Person', name: n })) } : {}),
    ...(m.duration && m.type !== 'serial' ? { duration: `PT${m.duration}M` } : {})
  };
  let s = document.getElementById('movieLd');
  if (!s) { s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'movieLd'; document.head.appendChild(s); }
  s.textContent = JSON.stringify(ld);
  // qidiruv uchun tayyor sahifasi bor kino — asosiy manzil o'sha (movie.html?id=N uning nusxasi)
  if (!partNo) {
    let c = document.head.querySelector('link[rel="canonical"]');
    if (!c) { c = document.createElement('link'); c.rel = 'canonical'; document.head.appendChild(c); }
    c.href = ld.url;
    setMeta('property', 'og:url', ld.url);
  }
}

/* ---------- Sahifani chizish ---------- */

function renderMovie() {
  const page = document.getElementById('page');
  if (partRedirect) return;

  if (!movie) {
    document.title = t('movie.notFound') + ' — DezoMax';
    page.innerHTML = `
      <div class="wrap" style="padding-top:calc(var(--header-h) + 80px)">
        <div class="empty">
          <div class="empty-icon">${ICONS.empty}</div>
          <h3>${t('movie.notFound')}</h3>
          <p><a class="chip" href="index.html" style="margin-top:14px;display:inline-block">${t('movie.backHome')}</a></p>
        </div>
      </div>`;
    return;
  }

  // kino/<slug>.html sarlavhasi qidiruv uchun yozilgan (tools/gen-pages.js) — o'zbekcha bo'lsa o'zgartirmaymiz
  if (!(window.DZX_ID && LANG === 'uz'))
  document.title = `${title(movie)}${partNo ? ` · ${partLabel(partNo)}` : ''}${movie.year ? ` (${movie.year})` : ''} — DezoMax`;
  setMovieSeo(movie);

  // Noma'lum maydonlar (yil, rejissyor, reyting) umuman ko'rsatilmaydi
  const info = [
    [t('movie.year'), movie.year],
    [t('movie.country'), countryOf(movie)],
    [partNo ? (LANG === 'ru' ? 'Серии' : 'Qismlar') : movie.type === 'serial' ? t('movie.seasons') : t('movie.duration'), durationText(partNo ? group : movie)],
    [t('movie.director'), movie.director],
    [t('movie.rating'), movie.rating ? movie.rating.toFixed(1) + ' / 10' : '']
  ].filter(([, v]) => v && v !== '—');

  // Faqat treyleri bor kinoda "Hozir ko'rish" emas — "Treylerni ko'rish" (foydalanuvchi aldanmasin)
  const watchSt = watchStatus(movie);

  const subTitle = [LANG === 'uz' ? movie.title.ru : movie.title.uz, movie.year]
    .filter(x => x && x !== title(movie)).join(' · ');

  page.innerHTML = `
  <section class="mv-hero mv-hero-top">
    <div class="mv-hero-bg${movie.poster ? ' has-art' : ''}" style="background-image:${movie.poster ? `url('${esc(movie.poster)}')` : backdropCSS(movie)}"></div>
    <div class="wrap">
      <div class="mv-layout">
        <div class="mv-poster">${posterHTML(movie)}</div>

        <div>
          <h1 class="mv-title">${esc(title(movie))}</h1>
          ${subTitle ? `<div class="mv-sub">${esc(subTitle)}</div>` : ''}
          ${akaOf(movie).length ? `<div class="mv-aka">${LANG === 'ru' ? 'Также известен как' : 'Boshqa nomlari'}: ${esc(akaOf(movie).join(' · '))}</div>` : ''}

          <div class="mv-tags">
            ${watchSt === 'uz' ? `<span class="tag tag-watch is-uz">${ICONS.play} ${t('watch.statusUz')}</span>` : ''}
            ${watchSt === 'full' ? `<span class="tag tag-watch is-full">${ICONS.play} ${t('watch.statusFull')}</span>` : ''}
            ${watchSt === 'trailer' ? `<span class="tag tag-watch is-trailer">${t('watch.statusTrailer')}</span>` : ''}
            ${movie.rating ? `<span class="tag tag-rating">${ICONS.star} ${movie.rating.toFixed(1)}</span>` : ''}
            <span class="tag">${typeName(movie.type)}</span>
            ${movie.genres.map(g => `<a class="tag" href="catalog.html?genre=${g}">${esc(genreName(g))}</a>`).join('')}
            <span class="tag">${esc(durationText(partNo ? group : movie))}</span>
          </div>
          ${officialHTML(movie)}

        </div>
      </div>
    </div>
  </section>

  <div class="wrap mv-watch" id="player">
    ${playerSectionHTML(movie)}
    <h2 class="mv-watch-title">${esc(title(movie))}${partNo ? ` <span>· ${partLabel(partNo)}</span>` : ''}</h2>
    <div class="mv-meta-row">
      <div class="mv-stats" id="mvStats"></div>
      <div class="mv-meta-right"><div class="mv-social" id="mvSocial"></div><div class="mv-dl" id="mvDl"></div></div>
    </div>
    ${partNo && partNo < PARTS.length ? `<div class="mv-next-wrap"><a class="btn btn-primary mv-next" href="${partUrl(partNo + 1)}"><span>${LANG === 'ru' ? 'Следующая серия' : 'Keyingi qism'}: ${partLabel(partNo + 1)}</span>${ICONS.right}</a></div>` : ''}
    ${partsBarHTML()}
  </div>

  <div class="wrap">
    <div class="ad-slot" data-ad-slot="movie"></div>

    <section class="section mv-comments" id="comments"></section>

    ${(movie.cast || []).length ? `
    <section class="section">
      <div class="section-head"><i class="bar"></i><h2>${t('movie.cast')}</h2></div>
      <div class="cast-list">
        ${movie.cast.map(c => `<span class="tag">${esc(c)}</span>`).join('')}
      </div>
    </section>` : ''}

    <section class="section">
      <div class="section-head">
        <i class="bar"></i><h2>${t('movie.similar')}</h2>
        <div class="row-nav" id="similarNav">
          <button data-dir="-1" aria-label="Chapga">${ICONS.left}</button>
          <button data-dir="1" aria-label="O‘ngga">${ICONS.right}</button>
        </div>
      </div>
      <!-- bosh sahifadagi kabi bitta qatorli karusel -->
      <div class="row" id="similar"></div>
    </section>
  </div>`;

  const similarRow = document.getElementById('similar');
  renderCards(similarRow, similarOf(movie));
  if (typeof Ads !== 'undefined') Ads.fill(page);
  document.querySelectorAll('#similarNav button').forEach(b => b.addEventListener('click', () => {
    similarRow.scrollBy({ left: +b.dataset.dir * Math.max(similarRow.clientWidth * .8, 240), behavior: 'smooth' });
  }));

  // Pleyer: birinchi manbani yuklaymiz, tablar orqali almashtiriladi
  const sources = sourcesOf(movie);
  if (sources.length) {
    const startLang = langsOf(movie).length ? pickLang(langsOf(movie)) : null;   // film — tanlangan tildagisi
    mountPlayer(startLang && sources[0].key === 'film' ? startLang.url : sources[0].url);
    syncOfficial(startLang ? startLang.url : movie.video);

    const tabs = [...document.querySelectorAll('.player-tabs .chip')];
    const flags = [...document.querySelectorAll('.player-lang')];
    const selectTab = btn => {
      tabs.forEach(x => x.classList.toggle('is-active', x === btn));
      mountPlayer(btn.dataset.src);
    };
    tabs.forEach(b => b.addEventListener('click', () => selectTab(b)));
    // bayroq bosilsa — film shu tilda (treyler ochiq turgan bo'lsa ham filmga qaytadi)
    flags.forEach(f => f.addEventListener('click', () => {
      flags.forEach(x => { x.classList.toggle('is-active', x === f); x.setAttribute('aria-pressed', x === f); });
      try { localStorage.setItem(AUDIO_KEY, f.dataset.lang); } catch (e) {}
      const film = tabs.find(x => x.dataset.key === 'film');
      if (film) { film.dataset.src = f.dataset.src; selectTab(film); } else mountPlayer(f.dataset.src);
      syncOfficial(f.dataset.src);
    }));
  }

  // telefonga yuklab olish (faqat ilovada, js/offline.js)
  if (typeof mountOfflineButton === 'function') mountOfflineButton(document.getElementById('mvDl'), group || movie, partNo, movie.video, partNo ? partLabel(partNo) : '');

  // like/dislike, ulashish va izohlar (js/social.js)
  if (typeof initSocial === 'function') initSocial(group || movie, partNo, {
    addedAt: (partNo && PARTS[partNo - 1].addedAt) || movie.addedAt || null,
    title: title(movie) + (partNo ? ` · ${partLabel(partNo)}` : ''),
    // tavsif va ma'lumotlar «…yana» oynasida (ruscha tavsif Wikipedia'dan kelishi mumkin — ochilganda olinadi)
    desc: () => (LANG === 'ru' && wikiText) || descOf(movie),
    info,
    year: movie.year || null,
    // YouTube'dagi ko'rishlar, layklar va izohlar ham qo'shiladi (film YouTube'da bo'lsa — film, aks holda treyler)
    video: movie.video || movie.trailer || ''
  });

  // ?play=1 bo'lsa pleyerga o'tamiz
  if (qp.get('play')) {
    setTimeout(() => document.getElementById('player').scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
  }
}

/* ---------- Kutubxona kinolari: ruscha tavsif Wikipedia'dan (sahifa ochilganda) ----------
   js/data-lib2.js dagi kinolarning tavsifi faylga yozilmagan (hajmni kichik tutish uchun) —
   rus tilida ko'rilganda maqolaning birinchi jumlalari to'g'ridan-to'g'ri ru.wikipedia'dan olinadi. */
let wikiText = null;
async function wikiDesc() {
  if (!movie || !movie.wiki || LANG !== 'ru') return;
  try {
    if (wikiText === null) {
      const r = await fetch('https://ru.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&redirects=1' +
        '&prop=extracts&exintro=1&explaintext=1&titles=' + encodeURIComponent(movie.wiki));
      const p = (await r.json()).query?.pages?.[0];
      const para = String(p?.extract || '').split('\n')[0].replace(/́/g, '').replace(/\s*\([^()]*\)/g, '').replace(/\s+/g, ' ').trim();
      wikiText = (para.match(/[^.!?]+[.!?]+/g) || [para]).slice(0, 3).join('').trim();
    }
    const box = document.querySelector('.mv-desc');
    if (box && wikiText && LANG === 'ru') box.textContent = wikiText;
  } catch (e) { wikiText = ''; }
}

/* ---------- Sahifa tepasida fon treyler ----------
   Ovozsiz, xira, takrorlanib turadi — matn va tugmalarga xalaqit bermaydi (sichqoncha/barmoq unga tegmaydi).
   Pastdagi pleyer ishga tushirilganda to'xtatiladi. Harakat kamaytirilgan yoki trafik tejash rejimida — yo'q. */
function mountBgTrailer() {
  const hero = document.querySelector('.mv-hero');
  const id = movie && typeof youTubeId === 'function' ? youTubeId(movie.trailer) : null;
  if (!hero || !id || hero.querySelector('.mv-hero-clip')) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return;

  const clip = document.createElement('div');
  clip.className = 'mv-hero-clip';
  clip.setAttribute('aria-hidden', 'true');
  const params = 'autoplay=1&mute=1&controls=0&loop=1&playlist=' + id + '&start=15&playsinline=1&rel=0' +
    '&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&origin=' + encodeURIComponent(location.origin);
  clip.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?${params}" tabindex="-1"
    allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin" title=""></iframe>`;
  hero.querySelector('.mv-hero-bg').after(clip);
  // faqat video haqiqatan o'ynay boshlaganda sekin paydo bo'ladi (avtoijro to'silsa — YouTube'ning
  // qizil tugmasi ko'rinib qolmasin, fon umuman chiqmaydi)
  const frame = clip.querySelector('iframe');
  let heard = false;          // YouTube'dan birorta holat xabari keldimi
  const onMsg = e => {
    if (e.source !== frame.contentWindow) return;
    let d; try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch { return; }
    if (!/infoDelivery|initialDelivery|onStateChange/.test(d?.event || '')) return;
    heard = true;
    const st = d?.info?.playerState ?? (d?.event === 'onStateChange' ? d.info : undefined);
    if (st === 1 && !clip.classList.contains('is-on')) setTimeout(() => clip.classList.add('is-on'), 600);
  };
  window.addEventListener('message', onMsg);
  frame.addEventListener('load', () => {
    // YouTube holat xabarlarini yuborishi uchun «tinglayapman» deymiz (bir necha marta — iframe ichi kech tayyor bo'lishi mumkin)
    const ping = () => frame.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'mvbg' }), '*');
    ping(); setTimeout(ping, 500); setTimeout(ping, 1500); setTimeout(ping, 3000);
    // xabar almashinuvi umuman ishlamaydigan muhitda — kutib, baribir sekin ko'rsatamiz
    setTimeout(() => { if (!heard) clip.classList.add('is-on'); }, 5000);
    setTimeout(() => { if (heard && !clip.classList.contains('is-on')) { clip.remove(); window.removeEventListener('message', onMsg); } }, 12000);
  });

  // asosiy pleyer bosilsa — fon treyler to'xtaydi va yo'qoladi
  const stop = () => {
    const f = clip.querySelector('iframe');
    f?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
    clip.classList.remove('is-on');
    setTimeout(() => clip.remove(), 900);
    document.removeEventListener('pointerdown', onDown, true);
  };
  const onDown = e => { if (e.target.closest('#playerBox, .player-tabs, .mv-actions a[href="#player"]')) stop(); };
  document.addEventListener('pointerdown', onDown, true);
}

/* ---------- Ishga tushirish ---------- */

initLayout();
renderMovie();
wikiDesc();
mountBgTrailer();
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('langchange', () => {
  renderMovie();
  wikiDesc();
  mountBgTrailer();
  applyI18n();
});
