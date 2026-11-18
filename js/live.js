/* ============================================================
   DezoMax — «Jonli efir»: YouTube'da hozir efirda bo'lgan o'zbekcha jonli efirlar (tv.html, telekanallar ustida)
   Ro'yxat to'lov serveridan: PAY_API/api/yt/live (server/server.js → ytLive; 5 daqiqa kesh, faqat embed ruxsat
   etilganlar, qimor/18+ chiqarilmaydi). Ko'rsatish — YouTube'ning o'z pleyeri: ko'rishlar, layk va donatlar kanal egasida.
   Yengil: bitta pleyer; telefonda pleyer faqat bosilganda yuklanadi (avtoijro sahifani qotirmasin).
   ============================================================ */
(function () {
  const main = document.querySelector('main');
  // live.html — alohida sahifa: menyu, tilni va h.k. shu yerda ishga tushiramiz (tv.html'da tv.js qilardi)
  if (main && main.classList.contains('lv-page') && typeof initLayout === 'function') try { initLayout(); } catch (e) {}
  if (!main || typeof PAY_API === 'undefined' || !PAY_API) return;
  const ru = typeof LANG !== 'undefined' && LANG === 'ru';
  const L = (uz, r) => (ru ? r : uz);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K' : String(n || 0);
  const desk = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const sec = document.createElement('section');
  sec.className = 'lv';
  sec.hidden = true;
  sec.innerHTML = `
    <div class="section-head" style="margin-bottom:14px"><i class="bar"></i><h2><span class="lv-dot"></span>${L('Jonli efirlar', 'Прямые эфиры')}</h2>
      <span class="result-count" id="lvCount"></span></div>
    <div class="lv-stage">
      <div class="lv-main">
        <div class="lv-player" id="lvPlayer"></div>
        <div class="lv-info" id="lvInfo"></div>
      </div>
      <aside class="lv-side"><h3>${L('Boshqa jonli efirlar', 'Другие эфиры')}</h3><div class="lv-row" id="lvRow"></div></aside>
    </div>`;
  main.insertBefore(sec, main.firstElementChild);

  let items = [], cur = -1;
  const thumb = x => x.thumb || `https://i.ytimg.com/vi/${x.id}/hqdefault_live.jpg`;
  function frame(x, auto) {
    return `<iframe src="https://www.youtube-nocookie.com/embed/${x.id}?autoplay=${auto ? 1 : 0}&mute=${auto ? 1 : 0}&playsinline=1&rel=0&modestbranding=1"
      title="${esc(x.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  }
  function show(i, user) {
    const x = items[i];
    if (!x) return;
    cur = i;
    const host = document.getElementById('lvPlayer');
    if (typeof mountYouTube === 'function') {
      // DezoMax o'z pleyeri (js/ytplayer.js): bizning panel, ⚙ sifat, ovoz, katta ekran; jonli efirda chiziq va vaqt yo'q
      host.innerHTML = '<div class="player-wrap is-live" id="lvBox"></div>';
      const box = host.firstElementChild;
      mountYouTube(box, 'https://www.youtube.com/watch?v=' + x.id, { title: x.title, poster: `https://i.ytimg.com/vi/${x.id}/maxresdefault_live.jpg` });
      box.querySelector('.vp-top')?.insertAdjacentHTML('afterbegin', `<button class="vp-live" type="button" title="${L('Hozirgi efirga o‘tish', 'К прямому эфиру')}"><i></i>${L('JONLI', 'ЭФИР')}</button>`);
      liveControl(box);
      // kompyuterda — darhol boshlanadi (brauzer ovozni taqiqlasa ovozsiz); telefonda — muqovadagi ▶ bosilganda (sahifa qotmaydi)
      if (desk || user) box.querySelector('#ytpCover')?.click();
    } else {
      if (desk || user) host.innerHTML = frame(x, true);
      else host.innerHTML = `<button class="lv-cover" type="button" aria-label="${L('Ko‘rish', 'Смотреть')}"><img src="${esc(thumb(x))}" alt="" decoding="async"><span class="lv-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span></button>`;
      host.querySelector('.lv-cover')?.addEventListener('click', () => { host.innerHTML = frame(x, true); });
    }
    document.getElementById('lvInfo').innerHTML = `
      <h3><span class="lv-badge">LIVE</span>${esc(x.title)}</h3>
      <div class="lv-meta">
        <div class="lv-ch">${x.avatar ? `<img src="${esc(x.avatar)}" alt="" loading="lazy">` : `<span class="lv-av">${esc((x.channel || '?')[0])}</span>`}<span><b>${esc(x.channel)}</b>${x.viewers ? `<small>${fmt(x.viewers)} ${L('kishi ko‘rmoqda', 'смотрят')}</small>` : ''}</span></div>
        <div class="lv-acts">
          <div class="lv-rate"><button type="button" class="lv-b" data-act="like" aria-label="${L('Yoqdi', 'Нравится')}">${IC.like}<span data-n="like"></span></button><i></i><button type="button" class="lv-b" data-act="dislike" aria-label="${L('Yoqmadi', 'Не нравится')}">${IC.dislike}<span data-n="dislike"></span></button></div>
          <button type="button" class="lv-b" data-act="share">${IC.share}<span>${L('Ulashish', 'Поделиться')}</span></button>
          <button type="button" class="lv-b" data-act="report">${IC.flag}<span>${L('Shikoyat', 'Пожаловаться')}</span></button>
          <a class="lv-b" href="https://www.youtube.com/watch?v=${x.id}" target="_blank" rel="noopener">${IC.yt}<span>${L('Chat va donat', 'Чат и донаты')}</span></a>
        </div>
      </div>`;
    loadSocial(x.id);
    document.querySelectorAll('.lv-card').forEach((c, k) => c.classList.toggle('is-on', k === i));
    if (user) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  /* Jonli efirni boshqarish (YouTube'dagidek): chiziq bo'ylab orqaga surish mumkin (efir arxivi), ±10 s;
     «● JONLI» — hozirgi efirda bo'lsa qizil, orqada bo'lsa kulrang; bosilsa — hozirgi joyga (efir chetiga) o'tadi.
     Boshlanganda efir orqada (boshidan) ochilib qolsa — avtomatik hozirgi joyga o'tkaziladi. */
  let liveT = null;
  function liveControl(box) {
    clearInterval(liveT);
    const btn = box.querySelector('.vp-live');
    let fixed = false;
    const P = () => (typeof ytActive !== 'undefined' && ytActive && ytActive.box === box ? ytActive.player : null);
    const num = f => { try { return +f() || 0; } catch (e) { return 0; } };
    // efirning eng chetiga emas — 6 s orqaroqqa: aks holda bufer bo'lmay video tez-tez to'xtab qolardi (uzilishlar)
    const toEdge = () => { const p = P(); if (!p) return; const d = num(() => p.getDuration()); if (d > 0) p.seekTo(Math.max(0, d - 6), true); try { p.playVideo(); } catch (e) {} };
    btn.addEventListener('click', e => { e.stopPropagation(); toEdge(); });
    liveT = setInterval(() => {
      if (!box.isConnected) { clearInterval(liveT); return; }
      const p = P(); if (!p) return;
      const cur = num(() => p.getCurrentTime()), dur = num(() => p.getDuration());
      if (!dur || !cur) return;
      const behind = dur - cur > 30;
      btn.classList.toggle('is-behind', behind);
      if (!fixed) { fixed = true; if (dur - cur > 60) toEdge(); }   // birinchi marta efir boshidan ochilsa — hozirgi joyga
    }, 1000);
  }

  /* ---------- Yoqdi / Yoqmadi / Ulashish / Shikoyat ----------
     Baho — saytning o'z tizimi (to'lov serveri /social, /api/react — kinolar va shortslar bilan bir xil); efir uchun
     YouTube ID'dan barqaror raqam (8 000 000 000 + xesh). Shikoyat — /api/report: 3 ta shikoyat (yoki admin) — efir
     hammaga chiqmaydi; shikoyat qilgan odamda darhol yashiriladi. */
  const IC = {
    like: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3zM7 10l4-8a3 3 0 0 1 3 3v4h5.5a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.1 21H7"/></svg>',
    dislike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-3zM17 14l-4 8a3 3 0 0 1-3-3v-4H4.5a2 2 0 0 1-2-2.3l1.4-8A2 2 0 0 1 5.9 3H17"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4M4 4h12l-2 4 2 4H4"/></svg>',
    yt: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>'
  };
  const API = String(PAY_API).replace(/\/+$/, '');
  const token = () => (typeof Pay !== 'undefined' && Pay.token ? Pay.token() : '');
  const sid = yid => { let h = 2166136261; for (const c of 'live:' + yid) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return 8e9 + h % 1e9; };
  async function req(method, path, body) {
    const headers = { 'Content-Type': 'application/json' };
    if (token()) headers.Authorization = 'Bearer ' + token();
    const r = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw Object.assign(new Error(j.error || 'xato'), { status: r.status });
    return j;
  }
  const toast = msg => {
    let t = document.getElementById('lvToast');
    if (!t) { t = document.createElement('div'); t.id = 'lvToast'; t.className = 'lv-toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('is-on'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('is-on'), 2600);
  };
  const needLogin = () => { toast(L('Buning uchun akkauntga kiring', 'Для этого войдите в аккаунт')); setTimeout(() => { location.href = 'account.html'; }, 1400); };
  const soc = {};
  function paintSocial(yid) {
    const s = soc[yid], box = document.getElementById('lvInfo');
    if (!s || !box || items[cur]?.id !== yid) return;
    box.querySelector('[data-n="like"]').textContent = s.likes ? fmt(s.likes) : '';
    box.querySelector('[data-n="dislike"]').textContent = s.dislikes ? fmt(s.dislikes) : '';
    box.querySelector('[data-act="like"]').classList.toggle('is-on', s.mine === 1);
    box.querySelector('[data-act="dislike"]').classList.toggle('is-on', s.mine === -1);
  }
  function loadSocial(yid) {
    if (soc[yid]) return paintSocial(yid);
    soc[yid] = { likes: 0, dislikes: 0, mine: 0 };
    req('GET', `/social?movie=${sid(yid)}`).then(j => { Object.assign(soc[yid], j); paintSocial(yid); }).catch(() => {});
  }
  async function react(value) {
    const x = items[cur]; if (!x) return;
    if (!token()) return needLogin();
    const s = soc[x.id] || (soc[x.id] = { likes: 0, dislikes: 0, mine: 0 });
    const v = s.mine === value ? 0 : value;
    try { Object.assign(s, await req('POST', '/api/react', { movie: sid(x.id), value: v })); paintSocial(x.id); }
    catch (e) { toast(e.status === 401 ? L('Qayta kiring', 'Войдите снова') : L('Vaqtincha ishlamayapti', 'Временно недоступно')); }
  }
  /* Ulashish — o'z oynamiz (Windows/brauzer oynasi o'rniga): havola + «Nusxalash», messenjerlar, «Boshqa» (tizim oynasi) */
  const SH = {
    tg: ['Telegram', '#2AABEE', '<path fill="#fff" d="M21.9 4.3 18.6 19.9c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L6.1 13.4l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.6 3c.9-.3 1.6.2 1.3 1.3z"/>', (u, t) => `https://t.me/share/url?url=${u}&text=${t}`],
    wa: ['WhatsApp', '#25D366', '<path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/>', (u, t) => `https://wa.me/?text=${t}%20${u}`],
    fb: ['Facebook', '#1877F2', '<path fill="#fff" d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9H16l.5-4h-3V8.8c0-.5.3-.8.5-.8z"/>', u => `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    x: ['X', '#000', '<path fill="#fff" d="M17.8 3h3.3l-7.2 8.2L22.3 21h-6.6l-5.2-6.8L4.6 21H1.3l7.7-8.8L1 3h6.8l4.7 6.2zm-1.2 16h1.8L7.5 4.9H5.6z"/>', (u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}`],
    vk: ['VK', '#0077FF', '<path fill="#fff" d="M12.8 17.5c-5.5 0-8.6-3.8-8.8-10h2.8c.1 4.6 2.1 6.5 3.7 6.9V7.5h2.6v3.9c1.6-.2 3.3-2 3.8-3.9h2.6c-.4 2.4-2.2 4.2-3.4 4.9 1.2.6 3.2 2.1 4 5.1h-2.9c-.6-1.9-2.2-3.4-4.1-3.6v3.6z"/>', (u, t) => `https://vk.com/share.php?url=${u}&title=${t}`],
    mail: ['Email', '#5B6470', '<path fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round" d="M3 6h18v12H3zM3 6l9 7 9-7"/>', (u, t) => `mailto:?subject=${t}&body=${u}`]
  };
  function share() {
    const x = items[cur]; if (!x) return;
    const url = `https://dezomax.uz/live.html#v=${x.id}`;
    const u = encodeURIComponent(url), t = encodeURIComponent(x.title + ' — DezoMax');
    document.querySelector('.lv-sh')?.remove();
    const m = document.createElement('div');
    m.className = 'lv-sh';
    m.innerHTML = `<div class="lv-sh-box" role="dialog" aria-modal="true" aria-label="${L('Ulashish', 'Поделиться')}">
      <div class="lv-sh-head"><b>${L('Ulashish', 'Поделиться')}</b><button type="button" class="lv-sh-x" data-x aria-label="${L('Yopish', 'Закрыть')}">✕</button></div>
      <div class="lv-sh-prev"><img src="${esc(thumb(x))}" alt=""><span><span class="lv-badge">LIVE</span><b>${esc(x.title)}</b><small>${esc(x.channel)}</small></span></div>
      <div class="lv-sh-grid">${Object.entries(SH).map(([k, [n, c, svg, f]]) => `<a href="${esc(f(u, t))}" target="_blank" rel="noopener"><i style="background:${c}"><svg viewBox="0 0 24 24">${svg}</svg></i><span>${n}</span></a>`).join('')}
        ${navigator.share ? `<button type="button" data-native><i style="background:rgba(255,255,255,.12)"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg></i><span>${L('Boshqa', 'Другое')}</span></button>` : ''}</div>
      <div class="lv-sh-link"><input readonly value="${esc(url)}" aria-label="${L('Havola', 'Ссылка')}"><button type="button" data-copy>${L('Nusxalash', 'Копировать')}</button></div>
    </div>`;
    document.body.appendChild(m);
    requestAnimationFrame(() => m.classList.add('is-on'));
    const close = () => { m.classList.remove('is-on'); setTimeout(() => m.remove(), 200); };
    m.addEventListener('click', async e => {
      if (e.target === m || e.target.closest('[data-x]')) return close();
      if (e.target.closest('[data-copy]')) {
        const inp = m.querySelector('input');
        try { await navigator.clipboard.writeText(url); } catch (er) { inp.select(); document.execCommand('copy'); }
        const btn = m.querySelector('[data-copy]'); btn.textContent = L('Nusxalandi ✓', 'Скопировано ✓'); btn.classList.add('is-ok');
        return;
      }
      if (e.target.closest('[data-native]')) { try { await navigator.share({ title: x.title, url }); } catch (er) {} return; }
      if (e.target.closest('.lv-sh-grid a')) setTimeout(close, 300);
    });
    addEventListener('keydown', function esc2(e) { if (e.key === 'Escape') { close(); removeEventListener('keydown', esc2); } });
  }
  const HID = 'dzxLiveHidden';
  const hidden = () => { try { return JSON.parse(localStorage.getItem(HID) || '[]'); } catch (e) { return []; } };
  function report() {
    const x = items[cur]; if (!x) return;
    const R = [['bad', L('Nomaqbul kontent', 'Неприемлемый контент')], ['gamble', L('Qimor yoki reklama', 'Азартные игры / реклама')],
      ['notuz', L('O‘zbekcha emas', 'Не на узбекском')], ['broken', L('Efir ishlamayapti', 'Эфир не работает')], ['other', L('Boshqa sabab', 'Другое')]];
    const m = document.createElement('div');
    m.className = 'lv-rep';
    m.innerHTML = `<div class="lv-rep-box" role="dialog" aria-modal="true"><h4>${L('Shikoyat sababi', 'Причина жалобы')}</h4>
      ${R.map(([k, t]) => `<button type="button" data-r="${k}">${esc(t)}</button>`).join('')}
      <button type="button" class="lv-rep-x" data-x>${L('Bekor qilish', 'Отмена')}</button></div>`;
    document.body.appendChild(m);
    m.addEventListener('click', async e => {
      const b = e.target.closest('[data-r]');
      if (e.target === m || e.target.closest('[data-x]')) { m.remove(); return; }
      if (!b) return;
      m.remove();
      // shu odamda darhol yashiriladi
      try { localStorage.setItem(HID, JSON.stringify([...new Set([x.id, ...hidden()])].slice(0, 300))); } catch (e2) {}
      if (token()) req('POST', '/api/report', { video: x.id, reason: b.dataset.r }).catch(() => {});
      toast(L('Rahmat! Shikoyat qabul qilindi — bu efir sizga boshqa ko‘rsatilmaydi', 'Спасибо! Жалоба принята — этот эфир больше не покажем'));
      items = items.filter(y => y.id !== x.id);
      cur = -1; render();
    });
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('#lvInfo [data-act]');
    if (!b) return;
    const a = b.dataset.act;
    if (a === 'like') react(1); else if (a === 'dislike') react(-1); else if (a === 'share') share(); else if (a === 'report') report();
  });
  function render() {
    sec.hidden = !items.length;
    const empty = document.getElementById('lvEmpty');   // live.html: hozir efir yo'q
    if (empty) { empty.hidden = !!items.length; empty.textContent = L('Hozir o‘zbekcha jonli efir topilmadi — birozdan keyin qayta kiring.', 'Сейчас прямых эфиров нет — загляните чуть позже.'); }
    if (!items.length) return;
    document.getElementById('lvCount').textContent = L(`${items.length} ta efirda`, `${items.length} в эфире`);
    document.getElementById('lvRow').innerHTML = items.map((x, i) => `
      <button class="lv-card" type="button" data-i="${i}">
        <span class="lv-th"><img src="${esc(thumb(x))}" alt="" loading="lazy" decoding="async" onerror="this.src='https://i.ytimg.com/vi/${x.id}/hqdefault.jpg'"><i>LIVE</i>${x.viewers ? `<em>${fmt(x.viewers)}</em>` : ''}</span>
        <span class="lv-ct"><b>${esc(x.title)}</b><small>${esc(x.channel)}</small>${x.viewers ? `<small>${fmt(x.viewers)} ${L('kishi ko‘rmoqda', 'смотрят')}</small>` : ''}</span>
      </button>`).join('');
    show(0, false);
  }
  document.addEventListener('click', e => {
    const c = e.target.closest('.lv-card');
    if (c) { show(+c.dataset.i, true); return; }
  });

  const KEY = 'dzxLive';
  try { const c = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (c && Date.now() - c.at < 3 * 60000) { const hid = new Set(hidden()); items = c.items.filter(x => !hid.has(x.id)); render(); } } catch (e) {}
  fetch(String(PAY_API).replace(/\/+$/, '') + '/api/yt/live').then(r => r.ok ? r.json() : null).then(d => {
    if (!d || !Array.isArray(d.items)) { if (!items.length) render(); return; }
    const was = items.map(x => x.id).join();
    const hid = new Set(hidden());
    items = d.items.filter(x => x && /^[\w-]{11}$/.test(x.id) && !hid.has(x.id));
    const want = (location.hash.match(/v=([\w-]{11})/) || [])[1], k = want ? items.findIndex(x => x.id === want) : -1;
    if (k > 0) items.unshift(items.splice(k, 1)[0]);
    try { sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), items })); } catch (e) {}
    if (items.map(x => x.id).join() !== was || !items.length) render();
  }).catch(() => {});
})();
