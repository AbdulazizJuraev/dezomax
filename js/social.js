/* ============================================================
   DezoMax — kino sahifasida like/dislike, ulashish va izohlar
   Ma'lumot to'lov serverida (server/server.js: /social, /api/react, /api/comment).
   Baho va izoh — faqat kirgan foydalanuvchi (Google/Telegram); ko'rish — hamma.
   Guruhli seriallarda baho va izohlar butun serialga (guruh kartasiga) yoziladi.
   ============================================================ */

Object.assign(I18N.uz, {
  'soc.like': 'Yoqdi',
  'soc.dislike': 'Yoqmadi',
  'soc.share': 'Ulashish',
  'soc.copy': 'Havolani nusxalash',
  'soc.copied': 'Havola nusxalandi',
  'soc.comments': 'Izohlar',
  'soc.placeholder': 'Fikringizni yozing…',
  'soc.send': 'Yuborish',
  'soc.login': 'Baho berish va izoh yozish uchun kiring',
  'soc.loginBtn': 'Kirish',
  'soc.empty': 'Hali izoh yo‘q — birinchi bo‘lib yozing',
  'soc.delete': 'O‘chirish',
  'soc.delAsk': 'Izoh o‘chirilsinmi?',
  'soc.more': 'Yana ko‘rsatish',
  'soc.off': 'Izohlar vaqtincha ishlamayapti',
  'soc.now': 'hozirgina',
  'soc.min': 'daq. oldin',
  'soc.hour': 'soat oldin',
  'soc.day': 'kun oldin',
  'soc.views': 'marta ko‘rilgan',
  'soc.added': 'Yuklangan',
  'soc.times': 'marta',
  'soc.yana': '…yana',
  'soc.about': 'Tavsifi',
  'soc.likes': 'Layklar',
  'soc.viewsT': 'Tomoshalar',
  'soc.yearT': 'Yili',
  'soc.rateOff': 'Baholash vaqtincha ishlamayapti — tez orada yoqiladi'
});
Object.assign(I18N.ru, {
  'soc.like': 'Нравится',
  'soc.dislike': 'Не нравится',
  'soc.share': 'Поделиться',
  'soc.copy': 'Скопировать ссылку',
  'soc.copied': 'Ссылка скопирована',
  'soc.comments': 'Комментарии',
  'soc.placeholder': 'Напишите своё мнение…',
  'soc.send': 'Отправить',
  'soc.login': 'Войдите, чтобы оценивать и комментировать',
  'soc.loginBtn': 'Войти',
  'soc.empty': 'Комментариев пока нет — будьте первым',
  'soc.delete': 'Удалить',
  'soc.delAsk': 'Удалить комментарий?',
  'soc.more': 'Показать ещё',
  'soc.off': 'Комментарии временно недоступны',
  'soc.now': 'только что',
  'soc.min': 'мин. назад',
  'soc.hour': 'ч. назад',
  'soc.day': 'дн. назад',
  'soc.views': 'просмотров',
  'soc.added': 'Добавлено',
  'soc.times': 'просмотров',
  'soc.yana': '…ещё',
  'soc.about': 'Описание',
  'soc.likes': 'Нравится',
  'soc.viewsT': 'Просмотры',
  'soc.yearT': 'Год',
  'soc.rateOff': 'Оценки временно недоступны — скоро заработают'
});

const SOC_ICONS = {
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v11H3.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1H7z"/><path d="M7 10l4.2-7.4a1.9 1.9 0 0 1 3.5 1.3L13.8 9H19a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 17.6 21H7"/></svg>',
  down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V3h3.5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H17z"/><path d="M17 14l-4.2 7.4a1.9 1.9 0 0 1-3.5-1.3l.9-5.1H5a2 2 0 0 1-2-2.3l1.4-8A2 2 0 0 1 6.4 3H17"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l6 6-6 6"/><path d="M21 11H11a7 7 0 0 0-7 7v1"/></svg>',
  tg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.4 4.6L2.9 11.7c-1.2.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.5-1.4zM8.3 14.4l9.6-6.1c.5-.3.9-.1.5.2l-8.1 7.3-.3 3.4-1.7-4.8z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3A22 22 0 0 0 14.6 2C12.3 2 10.7 3.4 10.7 6v2.5H8V12h2.7v10H14V12h2.7l.4-3.5H14z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>'
};

const socApi = () => (typeof PAY_API !== 'undefined' && PAY_API ? String(PAY_API).replace(/\/+$/, '') : '');
const socToken = () => (typeof Pay !== 'undefined' ? Pay.token() : '');
const socLoggedIn = () => !!socToken();

async function socReq(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };
  if (socToken()) headers.Authorization = 'Bearer ' + socToken();
  const r = await fetch(socApi() + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (r.status === 401 && typeof Pay !== 'undefined') Pay.clear();
  if (!r.ok) throw Object.assign(new Error(j.error || 'xato'), { status: r.status });
  return j;
}

function socTime(at) {
  const s = Math.max(0, (Date.now() - at) / 1000);
  if (s < 60) return t('soc.now');
  if (s < 3600) return `${Math.floor(s / 60)} ${t('soc.min')}`;
  if (s < 86400) return `${Math.floor(s / 3600)} ${t('soc.hour')}`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)} ${t('soc.day')}`;
  return new Date(at).toLocaleDateString(LANG === 'ru' ? 'ru-RU' : 'uz-UZ');
}

// 1 043 → «1 ming», 2 500 000 → «2,5 mln» (YouTube'dagidek)
const socFmt = n => {
  const f = (v, u) => `${(Math.floor(v * 10) / 10).toString().replace('.', ',').replace(',0', '')} ${u}`;
  if (n >= 1e6) return f(n / 1e6, LANG === 'ru' ? 'млн' : 'mln');
  if (n >= 1e3) return f(n / 1e3, LANG === 'ru' ? 'тыс.' : 'ming');
  return String(n);
};

function socToast(msg) {
  let el = document.querySelector('.soc-toast');
  if (!el) { el = document.createElement('div'); el.className = 'soc-toast'; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add('is-on');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('is-on'), 2200);
}

const SOC_MONTHS = {
  uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
};
function socDate(ts) {
  const d = new Date(ts);
  if (isNaN(d)) return '';
  const mo = (SOC_MONTHS[LANG] || SOC_MONTHS.uz)[d.getMonth()];
  return LANG === 'ru' ? `${d.getDate()} ${mo} ${d.getFullYear()}` : `${d.getDate()}-${mo}, ${d.getFullYear()}`;
}
// 12 345 ko'rinishida (to'liq son, bo'sh joy bilan)
const socNum = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* Ilovada ham (localhost) ulashish havolasi — saytning ochiq manzili */
function socShareUrl(m, part) {
  return `https://dezomax.uz/movie.html?id=${m.id}${part ? `&part=${part}` : ''}`;
}

function initSocial(m, part, opts = {}) {
  const bar = document.getElementById('mvSocial');
  const stats = document.getElementById('mvStats');
  const box = document.getElementById('comments');
  if (!bar || !box || !m) return;
  const api = socApi();
  const shareUrl = socShareUrl(m, part);
  const shareText = title(m) + (part ? ` · ${LANG === 'ru' ? part + ' серия' : part + '-qism'}` : '') + ' — DezoMax';
  let state = { views: null, likes: 0, dislikes: 0, mine: 0, total: 0, comments: [] }, shown = 20, busy = false, down = false;   // down — server bu imkoniyatni hali bilmaydi / ishlamayapti

  /* ---- ko'rishlar soni va yuklangan sana (pleyer ostida, chapda) ---- */
  // YouTube'dagidek: «12 345 marta · 3 kun oldin …yana» — «yana» tavsif oynasini ochadi
  const drawStats = () => {
    if (!stats) return;
    const parts = [];
    if (state.views !== null) parts.push(`<span>${socNum(state.views)} ${esc(t('soc.times'))}</span>`);
    if (opts.addedAt) parts.push(`<span>${esc(socTime(opts.addedAt))}</span>`);
    else if (opts.year) parts.push(`<span>${opts.year}</span>`);
    stats.innerHTML = `<button type="button" class="mv-stats-btn" id="socMoreInfo">${parts.join('')}<b>${esc(t('soc.yana'))}</b></button>`;
    stats.querySelector('#socMoreInfo').addEventListener('click', openInfo);
  };

  /* ---- «Tavsifi» oynasi: layklar, tomoshalar, sana, tavsif ---- */
  function openInfo() {
    closeInfo();
    const d = opts.addedAt ? new Date(opts.addedAt) : null;
    const mo = d ? (SOC_MONTHS[LANG] || SOC_MONTHS.uz)[d.getMonth()] : '';
    const desc = typeof opts.desc === 'function' ? opts.desc() : opts.desc;
    const tile = (big, small) => `<div class="soc-tile"><b>${esc(String(big))}</b><small>${esc(small)}</small></div>`;
    const el = document.createElement('div');
    el.className = 'soc-sheet-wrap';
    el.innerHTML = `
      <div class="soc-sheet-back" data-close></div>
      <div class="soc-sheet" role="dialog" aria-modal="true" aria-label="${esc(t('soc.about'))}">
        <i class="soc-sheet-grip"></i>
        <div class="soc-sheet-head"><h3>${esc(t('soc.about'))}</h3><button type="button" class="soc-sheet-x" data-close aria-label="×">✕</button></div>
        <div class="soc-sheet-body">
          <h4>${esc(opts.title || title(m))}</h4>
          <div class="soc-tiles">
            ${tile(socFmt(state.likes), t('soc.likes'))}
            ${tile(state.views !== null ? socNum(state.views) : '—', t('soc.viewsT'))}
            ${d ? tile(d.getFullYear(), LANG === 'ru' ? `${d.getDate()} ${mo}` : `${d.getDate()}-${mo}`) : tile(opts.year || '—', t('soc.yearT'))}
          </div>
          ${desc ? `<div class="soc-desc">${esc(desc)}</div>` : ''}
          ${(opts.info || []).length ? `
          <dl class="mv-info soc-info">
            ${opts.info.map(([k, v], i) => `
              <div class="mv-info-item${i === opts.info.length - 1 && opts.info.length % 2 ? ' is-wide' : ''}"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
          </dl>` : ''}
        </div>
      </div>`;
    document.body.appendChild(el);
    document.documentElement.classList.add('soc-lock');
    requestAnimationFrame(() => el.classList.add('is-open'));
    el.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeInfo));
    el._key = e => { if (e.key === 'Escape') closeInfo(); };
    document.addEventListener('keydown', el._key);
  }
  function closeInfo() {
    const el = document.querySelector('.soc-sheet-wrap');
    if (!el) return;
    document.removeEventListener('keydown', el._key);
    document.documentElement.classList.remove('soc-lock');
    el.classList.remove('is-open');
    setTimeout(() => el.remove(), 250);
  }
  // ko'rish — pleyerni birinchi bosganda bir marta sanaladi (server bir IP'ni 6 soatda bir marta sanaydi)
  const playerBox = document.getElementById('playerBox');
  if (playerBox && api) {
    playerBox.addEventListener('click', () => {
      fetch(api + '/view', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ movie: m.id }), keepalive: true })
        .then(r => r.json()).then(j => { if (typeof j.views === 'number') { state.views = j.views; drawStats(); } }).catch(() => {});
    }, { once: true, capture: true });
  }

  /* ---- like / dislike / ulashish ---- */
  const drawBar = () => {
    bar.innerHTML = `
      <div class="soc-rate${api ? '' : ' is-off'}">
        <button type="button" class="soc-btn${state.mine === 1 ? ' is-on' : ''}" data-rate="1" aria-pressed="${state.mine === 1}" title="${esc(t('soc.like'))}">${SOC_ICONS.up}<b>${socFmt(state.likes)}</b></button>
        <i class="soc-sep"></i>
        <button type="button" class="soc-btn${state.mine === -1 ? ' is-on' : ''}" data-rate="-1" aria-pressed="${state.mine === -1}" title="${esc(t('soc.dislike'))}">${SOC_ICONS.down}<b>${socFmt(state.dislikes)}</b></button>
      </div>
      <div class="soc-share-wrap">
        <button type="button" class="soc-btn soc-pill" id="socShare">${SOC_ICONS.share}<b>${esc(t('soc.share'))}</b></button>
        <div class="soc-menu" id="socMenu" hidden>
          <a href="https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}" target="_blank" rel="noopener">${SOC_ICONS.tg}<span>Telegram</span></a>
          <a href="https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}" target="_blank" rel="noopener">${SOC_ICONS.wa}<span>WhatsApp</span></a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener">${SOC_ICONS.fb}<span>Facebook</span></a>
          <button type="button" id="socCopy">${SOC_ICONS.link}<span>${esc(t('soc.copy'))}</span></button>
        </div>
      </div>`;

    bar.querySelectorAll('[data-rate]').forEach(b => b.addEventListener('click', () => rate(+b.dataset.rate)));
    const menu = bar.querySelector('#socMenu');
    bar.querySelector('#socShare').addEventListener('click', async e => {
      e.stopPropagation();
      // telefonda — tizimning o'z ulashish oynasi (Telegram, Instagram, SMS…)
      if (navigator.share && matchMedia('(pointer: coarse)').matches) {
        try { await navigator.share({ title: shareText, url: shareUrl }); return; } catch (er) { if (er && er.name === 'AbortError') return; }
      }
      menu.hidden = !menu.hidden;
    });
    bar.querySelector('#socCopy').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(shareUrl); }
      catch {
        const ta = document.createElement('textarea'); ta.value = shareUrl; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch {} ta.remove();
      }
      menu.hidden = true;
      socToast(t('soc.copied'));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.hidden = true; }));
    drawPlayerRate();
  };
  document.addEventListener('click', e => {
    const menu = document.getElementById('socMenu');
    if (menu && !menu.hidden && !e.target.closest('.soc-share-wrap')) menu.hidden = true;
  });

  /* ---- pleyer panelida ham like/dislike (fonsiz, vaqt va «1x» orasida) ---- */
  const prateHTML = () => `
    <button type="button" class="ytp-btn soc-pbtn${state.mine === 1 ? ' is-on' : ''}" data-prate="1" aria-label="${esc(t('soc.like'))}">${SOC_ICONS.up}<span>${socFmt(state.likes)}</span></button>
    <button type="button" class="ytp-btn soc-pbtn${state.mine === -1 ? ' is-on' : ''}" data-prate="-1" aria-label="${esc(t('soc.dislike'))}">${SOC_ICONS.down}<span>${socFmt(state.dislikes)}</span></button>`;
  const drawPlayerRate = () => {
    const pb = document.getElementById('playerBox');
    if (!pb || !api) return;
    let wrap = pb.querySelector('.soc-prate');
    if (!wrap) {
      const anchor = pb.querySelector('#vpSpeed') || pb.querySelector('#ytpFs');
      if (!anchor) return;
      wrap = document.createElement('span');
      wrap.className = 'soc-prate';
      anchor.before(wrap);
      wrap.addEventListener('click', e => {
        const b = e.target.closest('[data-prate]');
        if (b) { e.stopPropagation(); rate(+b.dataset.prate); }
      });
    }
    wrap.innerHTML = prateHTML();
  };
  // pleyer qayta chizilganda (kino ↔ treyler) tugmalar qayta qo'yiladi
  const pbox = document.getElementById('playerBox');
  if (pbox && api) new MutationObserver(() => { if (!pbox.querySelector('.soc-prate')) drawPlayerRate(); }).observe(pbox, { childList: true, subtree: true });

  const needLogin = () => { box.querySelector('.soc-login')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); socToast(t('soc.login')); };

  async function rate(v) {
    if (!api || busy) return;
    if (down) return socToast(t('soc.rateOff'));
    if (!socLoggedIn()) return needLogin();
    const next = state.mine === v ? 0 : v;
    // darhol ko'rsatamiz, server javobi bilan tuzatamiz
    const prev = { ...state };
    if (state.mine === 1) state.likes--; if (state.mine === -1) state.dislikes--;
    if (next === 1) state.likes++; if (next === -1) state.dislikes++;
    state.mine = next; drawBar();
    busy = true;
    try { Object.assign(state, await socReq('POST', '/api/react', { movie: m.id, value: next })); }
    catch (er) { state = prev; if (er.status === 401) needLogin(); else if (er.status === 404) { down = true; socToast(t('soc.rateOff')); } else socToast(er.message); }
    finally { busy = false; drawBar(); }
  }

  /* ---- izohlar ---- */
  const commentHTML = c => `
    <div class="soc-c" data-id="${c.id}">
      <span class="soc-ava" style="background:hsl(${[...c.name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 360} 55% 42%)">${esc((c.name.trim()[0] || '?').toUpperCase())}</span>
      <div class="soc-c-body">
        <div class="soc-c-head"><b>${esc(c.name)}</b><small>${esc(socTime(c.at))}</small>
          ${c.canDelete ? `<button type="button" class="soc-del" data-del="${c.id}">${esc(t('soc.delete'))}</button>` : ''}</div>
        <p>${esc(c.text)}</p>
      </div>
    </div>`;

  const drawComments = () => {
    const list = state.comments.slice(0, shown);
    box.innerHTML = `
      <div class="section-head"><i class="bar"></i><h2>${esc(t('soc.comments'))}</h2><span class="soc-count">${state.total || ''}</span></div>
      ${!api ? `<p class="acc-muted">${esc(t('soc.off'))}</p>` : socLoggedIn() ? `
        <form class="soc-form" id="socForm">
          <span class="soc-ava soc-ava-me">${esc(((typeof Auth !== 'undefined' && Auth.user()?.name) || '?').trim()[0]?.toUpperCase() || '?')}</span>
          <div class="soc-form-main">
            <textarea id="socText" rows="1" maxlength="1000" placeholder="${esc(t('soc.placeholder'))}"></textarea>
            <div class="soc-form-row"><small id="socErr" class="soc-err" hidden></small>
              <button class="btn btn-primary btn-sm" type="submit" id="socSend" disabled>${SOC_ICONS.send}<span>${esc(t('soc.send'))}</span></button></div>
          </div>
        </form>` : `
        <div class="soc-login"><span>${esc(t('soc.login'))}</span><a class="btn btn-primary btn-sm" href="account.html?next=${encodeURIComponent(location.pathname.split('/').pop() + location.search)}">${esc(t('soc.loginBtn'))}</a></div>`}
      <div class="soc-list">
        ${list.length ? list.map(commentHTML).join('') : api ? `<p class="acc-muted soc-empty">${esc(t('soc.empty'))}</p>` : ''}
      </div>
      ${state.comments.length > shown ? `<button class="btn btn-ghost soc-more" type="button" id="socMore">${esc(t('soc.more'))}</button>` : ''}`;

    const form = box.querySelector('#socForm');
    if (form) {
      const ta = form.querySelector('#socText'), send = form.querySelector('#socSend'), err = form.querySelector('#socErr');
      const fit = () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 220) + 'px'; send.disabled = ta.value.trim().length < 2; };
      ta.addEventListener('input', fit);
      ta.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) form.requestSubmit(); });
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const text = ta.value.trim();
        if (text.length < 2) return;
        send.disabled = true; err.hidden = true;
        try {
          const c = await socReq('POST', '/api/comment', { movie: m.id, text });
          state.comments.unshift(c); state.total++;
          drawComments();
        } catch (er) {
          if (er.status === 401) { drawComments(); return needLogin(); }
          err.textContent = er.status === 404 ? t('soc.off') : er.message; err.hidden = false; send.disabled = false;
        }
      });
    }
    box.querySelector('#socMore')?.addEventListener('click', () => { shown += 30; drawComments(); });
    box.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', async () => {
      if (!confirm(t('soc.delAsk'))) return;
      b.disabled = true;
      try {
        await socReq('POST', '/api/comment/delete', { id: +b.dataset.del });
        state.comments = state.comments.filter(c => c.id !== +b.dataset.del); state.total = Math.max(0, state.total - 1);
        drawComments();
      } catch (er) { b.disabled = false; socToast(er.message); }
    }));
  };

  drawStats();
  drawBar();
  drawComments();
  if (!api) return;
  socReq('GET', `/social?movie=${m.id}`)
    .then(j => { state = { ...state, ...j }; if (typeof j.views !== 'number') state.views = null; drawStats(); drawBar(); drawComments(); })
    .catch(() => { down = true; box.querySelector('.soc-list').innerHTML = `<p class="acc-muted">${esc(t('soc.off'))}</p>`; });
}
