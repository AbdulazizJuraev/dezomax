/* ============================================================
   DezoMax — RuTube: filmning til bo'yicha videolari (rasmiy embed pleyer)
   Ma'lumot: js/lang-videos.js (LANG_VIDEOS) — admin → «Til videolari» yozadi.
     kalit: 'movie:<id>' (movie.html / kino/*.html) yoki 'marvel:<id>' (marvel/*.html)
     qiymat: { ru: { rt: '<32 belgili ID>', p: '<maxfiy kalit, ixtiyoriy>', ok: true }, uz: {...}, en: {...} }
   Faqat ok === true (admin «ko'rsatishga ruxsat bor» deb belgilagan) videolar chiqadi.
   Havola emas, faqat tekshirilgan ID saqlanadi; pleyer manzili shu yerda ID'dan yasaladi.
   Ishlatadi: js/movie.js, js/marvel.js, js/admin.js
   ============================================================ */

// Tugmalar tartibi. Yangi til qo'shish: shu ro'yxatga kod + RT_NAMES ga nomi (bayroq — js/common.js LANG_FLAGS)
const RT_LANGS = ['ru', 'uz', 'en'];
const RT_NAMES = { ru: 'Русский', uz: 'O‘zbekcha', en: 'English', tr: 'Türkçe' };
// «… tilidagi video yo'q» xabari uchun
const RT_IN = { uz: { ru: 'Rus', uz: 'O‘zbek', en: 'Ingliz', tr: 'Turk' }, ru: { ru: 'русском', uz: 'узбекском', en: 'английском', tr: 'турецком' } };
const RT_ID = /^[0-9a-f]{32}$/;
const RT_KEY = /^[\w-]{1,64}$/;

const RT_TXT = {
  uz: {
    pick: 'Tilni tanlang', back: 'Asosiy video', trailer: 'Treyler',
    none: '{lang} tilidagi video bu film uchun hali qo‘shilmagan.',
    error: 'Video ochilmadi. Internetni tekshiring yoki birozdan keyin qayta urinib ko‘ring.',
    gone: 'Video RuTube’da topilmadi yoki ko‘rsatish cheklangan (o‘chirilgan, yopiq yoki boshqa saytlarda ko‘rsatish taqiqlangan).',
    slow: 'Video ochilmayaptimi?', retry: 'Qayta urinish', open: 'RuTube’da ochish', via: 'Pleyer: RuTube'
  },
  ru: {
    pick: 'Выберите язык', back: 'Основное видео', trailer: 'Трейлер',
    none: 'Видео на {lang} языке для этого фильма пока не добавлено.',
    error: 'Видео не открылось. Проверьте интернет или попробуйте позже.',
    gone: 'Видео не найдено на RuTube или его показ ограничен (удалено, скрыто или запрещено встраивание).',
    slow: 'Видео не открывается?', retry: 'Повторить', open: 'Открыть на RuTube', via: 'Плеер: RuTube'
  }
};
const rtT = k => (RT_TXT[typeof LANG !== 'undefined' ? LANG : 'uz'] || RT_TXT.uz)[k];
const rtEsc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* RuTube havolasidan video ID (va maxfiy video kaliti ?p=) — faqat rutube.ru, faqat tanish yo'llar.
   rutube.ru/video/<id>/, rutube.ru/video/private/<id>/?p=KEY, rutube.ru/play/embed/<id>, rutube.ru/shorts/<id>/ */
function rtParse(input) {
  let u;
  try { u = new URL(String(input || '').trim()); } catch { return null; }
  if (!/^https?:$/.test(u.protocol) || !/^(?:www\.|m\.)?rutube\.ru$/i.test(u.hostname)) return null;
  const m = u.pathname.match(/^\/(?:video(?:\/private)?|play\/embed|shorts)\/([0-9a-fA-F]{32})\/?$/);
  if (!m) return null;
  const p = u.searchParams.get('p') || '';
  if (p && !RT_KEY.test(p)) return null;
  return { rt: m[1].toLowerCase(), p };
}
// saqlangan ID'dan oddiy (ko'rish) havola — admin maydoni va «RuTube'da ochish» uchun
const rtWatchUrl = v => v.p ? `https://rutube.ru/video/private/${v.rt}/?p=${encodeURIComponent(v.p)}` : `https://rutube.ru/video/${v.rt}/`;
const rtEmbedUrl = v => `https://rutube.ru/play/embed/${v.rt}${v.p ? `?p=${encodeURIComponent(v.p)}` : ''}`;

/* Filmning faol videolari { ru: {rt, p}, ... } — ma'lumot qayta tekshiriladi (fayl qo'lda buzilgan bo'lsa ham xavfsiz) */
function rtVideos(key) {
  const all = (typeof LANG_VIDEOS !== 'undefined' && LANG_VIDEOS && LANG_VIDEOS[key]) || {};
  const out = {};
  for (const [code, v] of Object.entries(all)) {
    if (v && v.ok === true && /^[a-z]{2}$/.test(code) && RT_ID.test(v.rt || '') && (!v.p || RT_KEY.test(v.p))) out[code] = { rt: v.rt, p: v.p || '' };
  }
  return out;
}
const rtHas = key => Object.keys(rtVideos(key)).length > 0;

/* Til tugmalari. always — video bo'lmasa ham ko'rsatiladi (Русский doim turadi, boshqalari — qo'shilgan bo'lsa) */
function rtBarHTML(key, { always = false, backLabel = '' } = {}) {
  const vids = rtVideos(key);
  if (!always && !Object.keys(vids).length) return '';
  const codes = [...new Set(['ru', ...RT_LANGS.filter(c => vids[c]), ...Object.keys(vids)])];
  const flag = c => (typeof LANG_FLAGS !== 'undefined' && LANG_FLAGS[c]) || '';
  return `
    <div class="rt-bar" data-rt-key="${rtEsc(key)}">
      <span class="rt-bar-label">${rtT('pick')}:</span>
      <div class="rt-langs" role="group" aria-label="${rtT('pick')}">
        ${backLabel ? `<button type="button" class="rt-lang rt-back is-active" data-rt-back aria-pressed="true">${typeof ICONS !== 'undefined' ? ICONS.play : ''}<span>${rtEsc(backLabel)}</span></button>` : ''}
        ${codes.map(c => `<button type="button" class="rt-lang${vids[c] ? '' : ' is-empty'}" data-rt-lang="${c}" aria-pressed="false">${flag(c)}<span>${rtEsc(RT_NAMES[c] || c.toUpperCase())}</span></button>`).join('')}
      </div>
      <p class="rt-msg" role="status" hidden></p>
    </div>`;
}

/* Boshqa pleyerlarni to'xtatib, RuTube'ning rasmiy embed pleyerini qo'yadi */
let rtWatch = null;
function rtPlay(box, v, title = '') {
  if (typeof destroyYouTube === 'function') destroyYouTube();
  if (typeof destroyVideo === 'function') destroyVideo();
  clearTimeout(rtWatch);
  box.classList.remove('ytp', 'vp', 'vp-paused', 'is-paused', 'ytp-idle', 'ytp-fill', 'rt-failed');
  box.classList.add('rt-box');
  // saytdagi qoida bilan bir xil (js/movie.js): film ko'rish — faqat ro'yxatdan o'tganlarga
  if (typeof Auth !== 'undefined' && typeof Auth.user === 'function' && !Auth.user()) {
    const ru = typeof LANG !== 'undefined' && LANG === 'ru';
    box.innerHTML = `
      <div class="player-placeholder player-gate rt-gate">
        <div class="pp-icon">${typeof ICONS !== 'undefined' ? ICONS.user : ''}</div>
        <h3>${ru ? 'Войдите, чтобы смотреть' : 'Ko‘rish uchun ro‘yxatdan o‘ting'}</h3>
        <a class="btn btn-primary" href="account.html?next=${encodeURIComponent(location.pathname.replace(/^\//, '') + location.search)}" style="margin-top:14px">${ru ? 'Войти / Регистрация' : 'Kirish / Ro‘yxatdan o‘tish'}</a>
      </div>`;
    return;
  }
  box.innerHTML = `
    <iframe class="rt-frame" src="${rtEsc(rtEmbedUrl(v))}" title="${rtEsc(title || 'RuTube')}" frameborder="0"
      allow="clipboard-write; autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
    <div class="rt-error" hidden>
      <p>${rtT('error')}</p>
      <div><button type="button" class="rt-retry">${rtT('retry')}</button><a href="${rtEsc(rtWatchUrl(v))}" target="_blank" rel="noopener">${rtT('open')} ↗</a></div>
    </div>
    <div class="rt-slow" hidden>${rtT('slow')} <button type="button" class="rt-retry">${rtT('retry')}</button> · <a href="${rtEsc(rtWatchUrl(v))}" target="_blank" rel="noopener">${rtT('open')} ↗</a></div>`;
  const fail = (text = rtT('error')) => {
    const er = box.querySelector('.rt-error');
    if (!er) return;
    box.classList.add('rt-failed');
    er.querySelector('p').textContent = text;
    er.hidden = false;
    box.querySelector('.rt-slow').hidden = true;
  };
  box.querySelectorAll('.rt-retry').forEach(b => b.addEventListener('click', () => rtPlay(box, v, title)));
  if (navigator.onLine === false) { fail(); return; }
  let ready = false;
  box._rtReady = () => { ready = true; clearTimeout(rtWatch); box.querySelector('.rt-slow')?.setAttribute('hidden', ''); };
  box._rtFail = fail;
  // RuTube pleyeri postMessage bilan holatini yuboradi; 15 soniyada javob bo'lmasa — yumshoq eslatma (pleyerni yopmaydi)
  rtWatch = setTimeout(() => { if (!ready) { const s = box.querySelector('.rt-slow'); if (s) s.hidden = false; } }, 15000);
}

// RuTube pleyeridan kelgan xabarlar (faqat rutube.ru'dan): tayyor / xato
window.addEventListener('message', e => {
  if (!/^https:\/\/(?:www\.)?rutube\.ru$/.test(e.origin)) return;
  let d = e.data;
  if (typeof d === 'string') { try { d = JSON.parse(d); } catch { return; } }
  const type = String((d && d.type) || '');
  const box = [...document.querySelectorAll('.rt-box')].find(b => b.querySelector('iframe')?.contentWindow === e.source);
  if (!box) return;
  // playOptionsLoaded + detail (masalan «default_does_not_exists_video») — video yo'q / yopiq / embed taqiqlangan
  const detail = type === 'player:playOptionsLoaded' && d.data && d.data.playOptions && d.data.playOptions.detail;
  if (detail && detail.name) { box._rtReady?.(); box._rtFail?.(rtT('gone')); }
  else if (/error/i.test(type)) box._rtFail?.();
  else if (/^player:(ready|init|changeState|playComplete|durationChange|currentTime)/.test(type)) box._rtReady?.();
});

/* Tugmalarni ulash. box — pleyer joyi; onBack — asosiy videoga qaytish (bo'lmasa tugma ham yo'q) */
function rtBind(root, { key, box, title = '', onBack = null } = {}) {
  const bar = root && root.querySelector(`.rt-bar[data-rt-key="${CSS.escape(key)}"]`);
  if (!bar || !box) return;
  const vids = rtVideos(key);
  const msg = bar.querySelector('.rt-msg');
  const btns = [...bar.querySelectorAll('.rt-lang')];
  const mark = btn => btns.forEach(b => { const on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', String(on)); });
  bar.addEventListener('click', e => {
    const b = e.target.closest('.rt-lang');
    if (!b) return;
    msg.hidden = true;
    if (b.hasAttribute('data-rt-back')) {
      mark(b);
      clearTimeout(rtWatch);
      box.classList.remove('rt-box', 'rt-failed');
      box.innerHTML = '';
      onBack && onBack();
      return;
    }
    const code = b.dataset.rtLang, v = vids[code];
    if (!v) {
      const ui = typeof LANG !== 'undefined' && RT_IN[LANG] ? LANG : 'uz';
      msg.textContent = rtT('none').replace('{lang}', RT_IN[ui][code] || RT_NAMES[code] || code);
      msg.hidden = false;
      return;
    }
    mark(b);
    rtPlay(box, v, title);
  });
}
