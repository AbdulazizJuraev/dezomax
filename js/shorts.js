/* ============================================================
   DezoMax — Shorts lentasi (shorts.html)
   Ruxsat berilgan kanallarning qisqa videolari (js/data-shorts.js → SHORTS).
   - Telefonda butun ekran, tepaga surilsa — keyingisi (scroll-snap); kompyuterda o'rtada tik ustun, ↑ ↓ tugmalari
   - Faqat ko'rinib turgan short uchun YouTube pleyeri yuklanadi (qolganlari — muqova), sahifa yengil
   - Bir bosish — pauza / davom; ovoz tugmasi (birinchisi ovozsiz boshlanadi — brauzerlar talabi)
   - Kanalga «Obuna bo'lish» — kanal egasi uchun (ko'rishlar ham YouTube'da, egasida)
   shorts.html#VIDEO_ID — shu shortdan boshlanadi (bosh sahifadagi «Shorts» qatori)
   ============================================================ */

/* Yangi shortslar — avtomatik (2026-10-07): kanal egasi ruxsat bergan kanallarning eng yangi shortslari yangi server
   orqali (/api/yt/shorts, serverda kesh). js/data-shorts.js dagi eng yangisidan KEYIN chiqqanlari va faqat kinoga oidlari
   (tools/fetch-yt-meta.js MOVIE_RX bilan bir xil) ro'yxat boshiga qo'shiladi; telefonda 6 soat saqlanadi.
   Admin o'chirgan eski shortslar qaytib kelmaydi. Yangi kanal — FAQAT egasi ruxsat bergandan keyin qo'shiladi. */
const LIVE_SHORT_CHANNELS = [
  { ch: 'farzidguy', id: 'UC40y8Eqvoans8S-n8bBqoOw', n: 'FarZidGuy', u: 'https://www.youtube.com/@FarZidGuy' },
  // 2026-10-07: egasi ruxsat berdi (foydalanuvchi aytdi). Ruscha, kino (Marvel/DC) haqida
  { ch: 'mrmomentinc', id: 'UCWIoDsZugYNNXqdxqrmbUog', n: 'Mr. Moment Inc', u: 'https://www.youtube.com/@mrmomentinc' }
];
// ruscha kino so'zlari (Mr. Moment Inc kabi ruscha kanallar uchun)
const SHORT_MOVIE_RX_RU = /марвел|marvel|мстител|железн\S* челове|капитан\S* америк|локи|дэдпул|росомах|\bтор\b|мьёльнир|халк|супермен|бэтмен|человек.паук|паук|танос|гамор|квм|киновселенн|злоде|супергеро|фильм|кино|сцен\S* котор|трейлер|актер|актёр|\bdc\b|джокер|веном|флэш|аквамен|чудо.женщин|стражи галакт|звёздн\S* войн|гарри поттер/i;
const SHORT_MOVIE_RX = /marvel|qasoskor|avenger|transformer|avtobot|autobot|deseptikon|decepticon|optimus|praym|prime|megatron|bumblebee|bambilbi|drift|lockdown|shockwave|starscream|wheeljack|devastator|crosshairs|kogman|cogman|sentinal|sentinel|iron ?hide|wrekker|\bdc\b|#dc|supermen|superman|betmen|batman|flash|wonder ?woman|temir odam|iron ?man|#thor|\btor\b|torga|loki|wanda|vijin|vision|altron|ultron|kang\b|odin|tanos|thanos|selestial|celestial|ikaris|cheksizlik tosh|kuch tosh|yulduzlar lordi|spider|o.rgimchak|wednesday|uenzdey|deyneris|daenerys|taxtlar|\bfilm|kino|premyera|oskar|oscar|aktyor|multfilm|makvin|mcqueen|jekson bo.ron|mortal kombat|call of duty|dedpul|deadpool|momaqaldiroq|thunderbolt|tay ?lung|kung ?fu|afsonaviy uchlik|adolat liga|justice league|qizil.?jodugar|venom|joker|star ?wars|yulduzlar jang|harry ?pot|garri ?pot|bolg.a|mjolnir/i;

(async function () {
  const feed = document.getElementById('shortsFeed');
  const base = typeof SHORTS !== 'undefined' ? SHORTS.filter(x => x && /^[\w-]{11}$/.test(x.id)) : [];
  const ru = typeof LANG !== 'undefined' && LANG === 'ru';
  if (typeof initLayout === 'function') try { initLayout(); } catch {}

  // --- yangi shortslar (yuqoridagi izoh) ---
  const LIVE_KEY = 'dzxShortsLive', LIVE_TTL = 6 * 3600e3;
  const API0 = typeof PAY_API !== 'undefined' && PAY_API ? String(PAY_API).replace(/\/+$/, '') : '';
  const uzQ = s => s.replace(/([oOgG])['‘’`ʻ]/g, '$1‘').replace(/['`ʻ]/g, '’');
  const tidy = raw => {      // heshteg/emojisiz, KATTA HARFLAR — oddiy (tools/fetch-yt-meta.js shortTitle)
    let t = String(raw).replace(/#[\p{L}\p{N}_]+/gu, '').replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').replace(/\s{2,}/g, ' ').trim();
    const letters = t.replace(/[^\p{L}]/gu, '');
    if (letters && letters === letters.toUpperCase()) t = t.toLowerCase();
    t = t.replace(/(^|[.!?]\s+)(\p{L})/gu, (m, a, b) => a + b.toUpperCase()).replace(/[\s|\-–—:]+$/, '');
    return uzQ(t || String(raw).trim());
  };
  async function fetchLive() {
    const out = {};
    for (const c of LIVE_SHORT_CHANNELS) {
      const r = await fetch(`${API0}/api/yt/shorts?ch=${c.id}`);
      if (r.ok) out[c.ch] = ((await r.json()).items || []).map(x => ({ id: x.id, title: x.title }));
    }
    if (Object.keys(out).length) try { localStorage.setItem(LIVE_KEY, JSON.stringify({ at: Date.now(), ch: out })); } catch {}
    return out;
  }
  function mergeLive(byCh) {
    const have = new Set(base.map(x => x.id)), add = [], extra = [];
    // oilaviy sayt (bolalar profili bor): yalang'ochlik/18+ haqidagi sarlavhalar olinmaydi
    const adult = /обнаж|голая|голый|эрот|секс|18\+|nude|naked|yalang.och/i;
    const isMovie = t => (SHORT_MOVIE_RX.test(t) || SHORT_MOVIE_RX_RU.test(t)) && !adult.test(t);
    for (const c of LIVE_SHORT_CHANNELS) {
      const items = (byCh[c.ch] || []).filter(x => /^[\w-]{11}$/.test(x.id));
      const own = base.some(x => x.ch === c.ch);
      // saytda bor kanal — faqat saytdagi eng yangisidan oldingilari (yangilari) boshiga;
      // saytda hali yo'q kanal — kinoga oid shortslari (40 tagacha) ro'yxat orasiga aralashtiriladi
      const known = items.findIndex(x => have.has(x.id));
      const fresh = own ? (known > 0 ? items.slice(0, known) : []) : items.filter(x => !have.has(x.id)).slice(0, 40);
      for (const x of fresh) if (isMovie(x.title)) (own ? add : extra).push({ id: x.id, t: tidy(x.title), ch: c.ch, n: c.n, u: c.u });
    }
    if (!add.length && !extra.length) return base;
    const out = [...add];
    base.forEach((x, i) => { out.push(x); if (i % 3 === 2 && extra.length) out.push(extra.shift()); });   // har 3 tadan keyin bittadan
    return out.concat(extra);
  }
  let cache = null;
  try { cache = JSON.parse(localStorage.getItem(LIVE_KEY) || 'null'); } catch {}
  let live = cache && cache.ch;
  if (API0 && (!cache || Date.now() - cache.at > LIVE_TTL)) {
    const p = fetchLive().catch(() => null);                    // eskirgan bo'lsa — fonda yangilanadi
    // birinchi marta ham kutmaymiz (avval 1,5 s kutilardi — lenta sekin ochilardi): yangilari keyingi ochilishda qo'shiladi
  }
  // har ochilganda aralash tartib (har safar bir xil ketma-ketlik zeriktirardi): har kanal ichida tasodifiy, kanallar esa
  // bir tekis navbatlashadi — bir kanal ketma-ket kelmaydi (avval lenta deyarli faqat FarZidGuy edi);
  // havola bilan ochilgan short (shorts.html#ID) — birinchi bo'lib
  const list = (arr => {
    const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const groups = {};
    arr.forEach(x => (groups[x.ch] = groups[x.ch] || []).push(x));
    const q = Object.values(groups).map(g => ({ g: shuffle(g), k: 0 }));
    const a = [];
    let prev = null;
    while (a.length < arr.length) {
      let best = null, br = 2;                                // ulushi eng kam olingan kanal (oldingisidan boshqa)
      for (const c of q) if (c.k < c.g.length && c !== prev) { const r = (c.k + Math.random() * 0.6) / c.g.length; if (r < br) { best = c; br = r; } }
      const c = best || prev;
      a.push(c.g[c.k++]); prev = c;
    }
    const k = a.findIndex(x => x.id === location.hash.slice(1));
    if (k > 0) a.unshift(a.splice(k, 1)[0]);
    return a;
  })(mergeLive(live || {}));

  if (!list.length) { feed.innerHTML = `<p class="sh-empty">${ru ? 'Пока нет коротких видео' : 'Hozircha shorts yo‘q'}</p>`; return; }

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const handle = u => '@' + (String(u).match(/@([\w.-]+)/) || [, 'kanal'])[1];
  // kanal logolari (YouTube kanal sahifasidagi avatar, 88 px)
  const AVATAR = {
    farzidguy: 'https://yt3.googleusercontent.com/1SSSigRbfHcDJemcfw2QXOMqe5ApSr1Mi4gqZhIUwf4JWOWQF7zdXINh35OLHofA9n73NiigcoI=s88-c-k-c0x00ffffff-no-rj',
    mrmomentinc: 'https://yt3.googleusercontent.com/ytc/AIdro_nQS4e5OgJ3lhEdWQF5hZiTVQrVkM6hJjPrRZQKXkEhCg=s88-c-k-c0x00ffffff-no-rj'
  };
  const chName = s => s.n || handle(s.u).slice(1);
  const avatarHTML = s => AVATAR[s.ch]
    ? `<img src="${AVATAR[s.ch]}" alt="" loading="lazy" decoding="async" onerror="this.replaceWith(document.createTextNode('${esc(chName(s).charAt(0).toUpperCase())}'))">`
    : esc(chName(s).charAt(0).toUpperCase());
  const ICON = {
    muted: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M23 9l-6 6M17 9l6 6"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>',
    like: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3zM7 10l4-8a3 3 0 0 1 3 3v4h5.5a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.1 21H7"/></svg>',
    dislike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-3zM17 14l-4 8a3 3 0 0 1-3-3v-4H4.5a2 2 0 0 1-2-2.3l1.4-8A2 2 0 0 1 5.9 3H17"/></svg>',
    comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.2L4 21l1.8-5.1A8 8 0 1 1 21 12z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>',
  };
  const T = ru
    ? { like: 'Нравится', dislike: 'Не нравится', comments: 'Комментарии', share: 'Поделиться', sound: 'Звук', login: 'Войдите, чтобы оценить или написать', loginBtn: 'Войти', ph: 'Напишите комментарий…', empty: 'Пока нет комментариев — будьте первым', yt: 'Комментарии YouTube', off: 'Временно недоступно', short: 'Слишком коротко' }
    : { like: 'Yoqdi', dislike: 'Yoqmadi', comments: 'Izohlar', share: 'Ulashish', sound: 'Ovoz', login: 'Baho berish va izoh yozish uchun kiring', loginBtn: 'Kirish', ph: 'Fikringizni yozing…', empty: 'Hali izoh yo‘q — birinchi bo‘lib yozing', yt: 'YouTube izohlari', off: 'Vaqtincha ishlamayapti', short: 'Izoh juda qisqa' };
  const fmtN = n => n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K' : String(n || 0);

  /* Baho va izohlar — saytning o'z tizimi (to'lov serveri: /social, /api/react, /api/comment, js/social.js bilan bir xil).
     Server kinolarni raqamli ID bilan taniydi — short uchun YouTube ID'dan barqaror raqam (9 000 000 000 + xesh). */
  const API = typeof PAY_API !== 'undefined' && PAY_API ? String(PAY_API).replace(/\/+$/, '') : '';
  const token = () => (typeof Pay !== 'undefined' && Pay.token ? Pay.token() : '');
  const sid = yid => { let h = 2166136261; for (const c of 'short:' + yid) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return 9e9 + h % 1e9; };
  async function req(method, path, body) {
    const headers = { 'Content-Type': 'application/json' };
    if (token()) headers.Authorization = 'Bearer ' + token();
    const r = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw Object.assign(new Error(j.error || 'xato'), { status: r.status });
    return j;
  }
  const social = {};          // yid → { likes, dislikes, mine, total, comments, yt }

  /* Tezlik (2026-11-19): 690 ta slaydning hammasi to'liq chizilsa (~27 000 element) telefonda sahifa 20 s qotardi.
     Endi har bir slayd — yengil qobiq (muqova + pleyer joyi); matn va tugmalar faqat joriy va yonidagi slaydlarda (fill). */
  /* Reels uslubi (2026-11-19): o'ngda doirasiz oq belgilar (yoqdi, izoh, ulashish, saqlash, yana), pastda kanal + «Obuna», bir qatorli tavsif,
     eng pastda — ko'rilgan qism chizig'i */
  const IG = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M12 20.3s-7.4-4.5-9.2-9.1C1.5 7.8 3.7 4.5 7.1 4.5c2 0 3.6 1.1 4.9 2.9 1.3-1.8 2.9-2.9 4.9-2.9 3.4 0 5.6 3.3 4.3 6.7-1.8 4.6-9.2 9.1-9.2 9.1z"/></svg>',
    comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M20.6 12a8.6 8.6 0 0 1-12.8 7.5l-4.3 1.1 1.2-4.1A8.6 8.6 0 1 1 20.6 12z"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M21.6 3.3 10.4 13.6M21.6 3.3 15.2 20.6l-4.8-7-7.6-4.3z"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M5.8 3.5h12.4v17l-6.2-4.6-6.2 4.6z"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 9.5h14M9.5 15h9.5"/></svg>'
  };
  const SAVE_KEY = 'dzxShortsSaved';
  const saved = new Set((() => { try { return JSON.parse(localStorage.getItem(SAVE_KEY) || '[]'); } catch (e) { return []; } })());
  const subUrl = u => /youtube\.com\//.test(u) ? u + (u.includes('?') ? '&' : '?') + 'sub_confirmation=1' : u;
  const fullHTML = (s, i) => `
      <button class="sh-tap" type="button" aria-label="${ru ? 'Пауза / воспроизвести' : 'Pauza / davom ettirish'}"><span class="sh-paused">${ICON.play}</span></button>
      <div class="sh-info">
        <div class="sh-user">
          <a class="sh-ch" href="${esc(s.u)}" target="_blank" rel="noopener" aria-label="${esc(chName(s))}">${avatarHTML(s)}</a>
          <a class="sh-name" href="${esc(s.u)}" target="_blank" rel="noopener">${esc(chName(s))}</a>
        </div>
        <p class="sh-title">${esc(s.t)}<span data-n="views"></span></p>
      </div>
      <div class="sh-actions">
        <button class="sh-act sh-like" type="button" aria-label="${T.like}"><span class="sh-btn">${IG.heart}</span><b data-n="like"></b></button>
        <button class="sh-act sh-comments" type="button" aria-label="${T.comments}"><span class="sh-btn">${IG.comment}</span><b data-n="comments"></b></button>
        <button class="sh-act sh-share" type="button" aria-label="${T.share}"><span class="sh-btn">${IG.send}</span></button>
        <button class="sh-act sh-save${saved.has(s.id) ? ' is-on' : ''}" type="button" aria-label="${ru ? 'Сохранить' : 'Saqlash'}"><span class="sh-btn">${IG.save}</span></button>
        <a class="sh-act sh-more" href="https://www.youtube.com/shorts/${s.id}" target="_blank" rel="noopener" aria-label="${ru ? 'Открыть в YouTube' : 'YouTube’da ochish'}"><span class="sh-btn">${IG.more}</span></a>
      </div>
      <div class="sh-prog"><i></i></div>`;
  const slideHTML = (s, i) => `<section class="sh-slide" data-i="${i}" data-id="${s.id}"><img class="sh-thumb" data-src="https://i.ytimg.com/vi/${s.id}/oardefault.jpg" alt="" decoding="async"><div class="sh-frame"></div></section>`;
  // shorts.html dagi tezkor boshlangan birinchi slayd (sh-early) — o'chirilmaydi (pleyeri allaqachon yuklanmoqda), qolganlari undan keyin
  const early = feed.querySelector('.sh-early');
  const keepEarly = !!(early && early.dataset.id === list[0].id && early.querySelector('iframe'));
  if (keepEarly) early.insertAdjacentHTML('afterend', list.slice(1).map((s, i) => slideHTML(s, i + 1)).join(''));
  else feed.innerHTML = list.map(slideHTML).join('');

  const slides = [...feed.querySelectorAll('.sh-slide')];
  const fill = k => { const sl = slides[k]; if (sl && !sl._f) { sl._f = 1; sl.insertAdjacentHTML('beforeend', fullHTML(list[k], k)); } };
  const thumbEls = slides.map(sl => sl.querySelector('.sh-thumb'));
  const isApp = /DezoMaxApp|; wv\)/.test(navigator.userAgent) || !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  // ovoz bilan boshlanadi (foydalanuvchi so'rovi); brauzer ovozli avtoijroga ruxsat bermasa — 1,5 s dan keyin ovozsiz
  // davom etadi va birinchi teginishda ovoz o'zi yoqiladi
  let muted = false, autoMuted = false, active = -1;

  const send = (slide, func, args = []) => {
    const f = slide && slide.querySelector('iframe');
    if (f && f.contentWindow) f.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
  };
  // ovoz — bitta umumiy tugma (tepada o'ngda)
  const soundBtn = document.createElement('button');
  soundBtn.className = 'sh-sound';
  soundBtn.type = 'button';
  soundBtn.setAttribute('aria-label', T.sound);
  (document.getElementById('shBar') || document.body).appendChild(soundBtn);
  const paintSound = () => { soundBtn.innerHTML = muted ? ICON.muted : ICON.sound; };
  paintSound();
  soundBtn.addEventListener('click', () => {
    const sl = slides[active];
    muted = !muted;
    send(sl, muted ? 'mute' : 'unMute');
    if (!muted) send(sl, 'playVideo');
    paintSound();
  });

  /* ---------- baho va izohlar ---------- */
  function paintSocial(i) {
    const sl = slides[i], s = social[list[i].id];
    if (!sl || !s || !sl._f) return;
    const yt = s.yt || {};
    const set = (q, v) => { const el = sl.querySelector(q); if (el) el.textContent = v; };
    const likes = (s.likes || 0) + (yt.likes || 0), com = (s.total || 0) + (yt.commentCount || 0);
    set('[data-n="like"]', likes ? fmtN(likes) : '');
    set('[data-n="comments"]', com ? fmtN(com) : '');
    if (yt.views) set('[data-n="views"]', ` · ${fmtN(yt.views)} ${ru ? 'просмотров' : 'marta ko‘rildi'}`);
    sl.querySelector('.sh-like')?.classList.toggle('is-on', s.mine === 1);
  }
  function loadSocial(i) {
    const yid = list[i].id;
    if (social[yid]) { paintSocial(i); return; }
    social[yid] = { likes: 0, dislikes: 0, mine: 0, total: 0, comments: [], yt: null };
    if (API) req('GET', `/social?movie=${sid(yid)}`).then(j => { Object.assign(social[yid], j); paintSocial(i); if (sheetFor === i) drawSheet(); }).catch(() => { social[yid].down = true; });
    fetch('https://dezocloud.uz/api/yt/info?v=' + yid).then(r => r.ok ? r.json() : null)
      .then(j => { if (j && typeof j.views === 'number') { social[yid].yt = j; paintSocial(i); if (sheetFor === i) drawSheet(); } }).catch(() => {});
  }
  async function react(i, value) {
    const yid = list[i].id, s = social[yid];
    if (!API || !s || s.down) return toastMsg(T.off);
    if (!token()) return openSheet(i);                        // kirish taklifi — izohlar panelida
    const v = s.mine === value ? 0 : value;
    try { Object.assign(s, await req('POST', '/api/react', { movie: sid(yid), value: v })); paintSocial(i); }
    catch (e) { toastMsg(e.status === 401 ? T.login : (e.message || T.off)); }
  }
  const toastMsg = m => { if (typeof toast === 'function') toast(m); else alert(m); };

  // izohlar paneli (pastdan chiqadi)
  const sheet = document.createElement('div');
  sheet.className = 'sh-sheet';
  sheet.hidden = true;
  sheet.innerHTML = `<div class="sh-sheet-bg" data-close></div><div class="sh-sheet-box" role="dialog" aria-label="${T.comments}">
      <div class="sh-sheet-head"><b>${T.comments}</b><small id="shSheetN"></small><button class="sh-btn" type="button" data-close aria-label="×">${ICON.close}</button></div>
      <div class="sh-sheet-list" id="shSheetList"></div>
      <form class="sh-sheet-form" id="shSheetForm"></form>
    </div>`;
  document.body.appendChild(sheet);
  let sheetFor = -1;
  const timeAgo = at => { const m = Math.max(0, Math.round((Date.now() - at) / 60000)); return m < 1 ? (ru ? 'только что' : 'hozirgina') : m < 60 ? `${m} ${ru ? 'мин' : 'daq. oldin'}` : m < 1440 ? `${Math.round(m / 60)} ${ru ? 'ч' : 'soat oldin'}` : `${Math.round(m / 1440)} ${ru ? 'дн' : 'kun oldin'}`; };
  function drawSheet() {
    const s = social[list[sheetFor].id] || {}, yt = s.yt || {};
    sheet.querySelector('#shSheetN').textContent = fmtN((s.total || 0) + (yt.commentCount || 0));
    const own = (s.comments || []).map(c => `<div class="sh-c"><span class="sh-c-av">${esc((c.name || '?').charAt(0).toUpperCase())}</span><div><b>${esc(c.name)}</b> <small>${timeAgo(c.at)}</small><p>${esc(c.text)}</p></div></div>`).join('');
    const ytc = (yt.comments || []).map(c => `<div class="sh-c"><img class="sh-c-av" src="${esc(c.avatar || '')}" alt="" loading="lazy" onerror="this.remove()"><div><b>${esc(c.author)}</b> <small>${esc(c.time || '')}</small><p>${esc(c.text)}</p>${c.likes ? `<small class="sh-c-like">${ICON.like}${fmtN(c.likes)}</small>` : ''}</div></div>`).join('');
    sheet.querySelector('#shSheetList').innerHTML = (own || (!ytc ? `<p class="sh-c-empty">${T.empty}</p>` : '')) + (ytc ? `<p class="sh-c-sec">${T.yt}</p>${ytc}` : '');
    sheet.querySelector('#shSheetForm').innerHTML = token()
      ? `<input class="acc-input" name="text" maxlength="1000" placeholder="${T.ph}" autocomplete="off"><button class="sh-btn" type="submit" aria-label="${T.comments}">${ICON.send}</button>`
      : `<span>${T.login}</span><a class="btn btn-primary btn-sm" href="account.html">${T.loginBtn}</a>`;
  }
  function openSheet(i) { sheetFor = i; drawSheet(); sheet.hidden = false; requestAnimationFrame(() => sheet.classList.add('is-open')); }
  function closeSheet() { sheet.classList.remove('is-open'); setTimeout(() => { sheet.hidden = true; }, 250); }
  sheet.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeSheet(); });
  sheet.querySelector('#shSheetForm').addEventListener('submit', async e => {
    e.preventDefault();
    const inp = e.currentTarget.querySelector('input'), text = (inp.value || '').trim();
    if (text.length < 2) return toastMsg(T.short);
    const yid = list[sheetFor].id, s = social[yid];
    inp.disabled = true;
    try {
      const c = await req('POST', '/api/comment', { movie: sid(yid), text });
      s.comments = [c, ...(s.comments || [])]; s.total = (s.total || 0) + 1;
      inp.value = ''; drawSheet(); paintSocial(sheetFor);
    } catch (err) { toastMsg(err.message || T.off); }
    finally { const i2 = sheet.querySelector('#shSheetForm input'); if (i2) { i2.disabled = false; i2.focus(); } }
  });

  /* Qotmaslik uchun (2026-11-02):
     - bir vaqtda ko'pi bilan 2 ta YouTube pleyeri: ko'rinib turgani va (u o'ynay boshlagach) keyingisi — oldindan, pauzada;
       ekrandan chiqqan pleyer DOM'dan olib tashlanadi — xotira bo'shaydi;
     - muqovalar faqat yonidagi slaydlarda (oldingi 1 ta, keyingi 2 ta): har biri 1080×1920 (~8 MB xotira), avval ko'rilganlari
       yig'ilib qolib telefonni qotirardi;
     - pleyer surish tugagandan keyin almashtiriladi — surish o'rtasida iframe yaratish/o'chirish animatsiyani to'xtatardi. */
  const frames = new Map();                                   // slayd raqami → iframe
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  let prewarmT;
  function thumbs(i) {
    for (let k = Math.max(0, i - 2); k <= i + 3; k++) fill(k);
    thumbEls.forEach((img, k) => {
      const near = k >= i - 1 && k <= i + 2;
      if (near && !img.getAttribute('src')) img.src = img.dataset.src;
      else if (!near && img.getAttribute('src')) img.removeAttribute('src');
    });
  }
  function dropFrame(k) {
    const f = frames.get(k);
    if (!f) return;
    frames.delete(k); slides[k]._warm = 0;
    f.src = 'about:blank';                                    // pleyer darhol to'xtaydi
    f.remove();
    slides[k].classList.remove('is-playing', 'is-paused', 'is-live', 'is-yt-stop');
    const pb = slides[k].querySelector('.sh-prog i'); if (pb) pb.style.transform = '';
  }
  function mountFrame(k, play) {
    const sl = slides[k], id = sl.dataset.id;
    sl.querySelector('.sh-frame').innerHTML =
      `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=${play ? 1 : 0}&mute=${play === true && !muted ? 0 : 1}&playsinline=1&disablekb=1&fs=0` +
      `&controls=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&origin=${encodeURIComponent(location.origin)}"` +
      ` allow="autoplay; encrypted-media; picture-in-picture" title="${esc(list[k].t)}"></iframe>`;
    const fr = sl.querySelector('iframe');
    frames.set(k, fr);
    // YouTube holatini eshitamiz: video haqiqatan o'ynay boshlaganda muqova olinadi (is-live)
    fr.addEventListener('load', () => {
      try { fr.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: k, channel: 'widget' }), '*'); } catch {}
    });
  }
  const startFrame = k => { const sl = slides[k]; if (sl._warm) { sl._warm = 0; send(sl, 'seekTo', [0, true]); } send(sl, muted ? 'mute' : 'unMute'); send(sl, 'playVideo'); };

  function activate(i) {
    if (i === active || !slides[i]) return;
    for (const k of [...frames.keys()]) if (k !== i) dropFrame(k);
    clearTimeout(prewarmT);
    active = i;
    const sl = slides[i], id = sl.dataset.id;
    sl.classList.remove('is-paused', 'is-live', 'is-yt-stop');
    if (frames.has(i)) startFrame(i);                         // oldindan yuklangan — darhol o'ynaydi
    else mountFrame(i, true);
    sl.classList.add('is-playing');
    clearTimeout(sl._soundT);
    // Brauzer ovozli avtoijroni taqiqlagan bo'lsagina ovozsizga o'tamiz (odatda buni oldindan soundProbe aniqlaydi; bu — zaxira). Avval 1,5 s kutilardi — internet sekin bo'lsa
    // video kech boshlanib, ovoz bekorga o'chib qolardi. Ilovada (WebView) ovozli avtoijro doim ruxsat — o'chirilmaydi.
    if (!muted && !isApp) sl._soundT = setTimeout(() => {
      if (active !== i || sl.classList.contains('is-live')) return;
      muted = true; autoMuted = true; send(sl, 'mute'); send(sl, 'playVideo'); paintSound();
    }, 2500);
    thumbs(i);
    loadSocial(i);
    try { history.replaceState(null, '', '#' + id); } catch {}
  }
  // joriy video o'ynay boshlagach — keyingisining pleyeri oldindan (pauzada, ovozsiz); trafik tejash rejimida — yo'q
  function prewarm(k) {
    clearTimeout(prewarmT);
    if (saveData || !slides[k + 1] || frames.has(k + 1)) return;
    // 2026-11-20: oldindan yuklangan pleyer endi videoning boshini ham yuklab qo'yadi — ovozsiz o'ynay boshlaydi va birinchi
    // kadrdayoq pauza qilinadi (pastda, st === 1). Avval faqat pleyer yuklanardi, video surilgandan keyin 1–3 s yuklanardi.
    prewarmT = setTimeout(() => { if (active === k && !frames.has(k + 1)) { slides[k + 1]._warm = 1; mountFrame(k + 1, 'warm'); } }, 400);
  }

  const durs = {};
  addEventListener('message', e => {
    // ko'rilgan qism chizig'i: faqat joriy pleyerning vaqti (sekundiga bir necha marta keladi — yengil)
    if (typeof e.data === 'string' && e.data.indexOf('"currentTime"') > 0) {
      const f = frames.get(active);
      if (f && f.contentWindow === e.source) try {
        const inf = JSON.parse(e.data).info || {};
        if (inf.duration) durs[active] = inf.duration;
        if (durs[active] && inf.currentTime != null) { const b = slides[active].querySelector('.sh-prog i'); if (b) b.style.transform = `scaleX(${Math.min(1, inf.currentTime / durs[active])})`; }
      } catch (er) {}
    }
    // YouTube sekundiga bir necha marta vaqt yuboradi — holatsiz xabarlar tahlil qilinmay o'tkaziladi
    if (typeof e.data === 'string' && !/playerState|onStateChange|onReady/.test(e.data)) return;
    if (!/youtube(-nocookie)?\.com$/.test(String(e.origin).replace(/^https?:\/\/(www\.)?/, ''))) return;
    let d;
    try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch { return; }
    let k = -1;
    for (const [n, f] of frames) if (f.contentWindow === e.source) { k = n; break; }
    if (k < 0 || !d) return;
    const sl = slides[k];
    // oldindan yuklangan pleyerga u tayyor bo'lmasdan o'tilgan bo'lsa — tayyor bo'lganda boshlanadi
    if (d.event === 'onReady') { if (k === active && !sl.classList.contains('is-paused')) startFrame(k); return; }
    const st = d.event === 'onStateChange' ? d.info : d.info && d.info.playerState;
    if (st === undefined || st === null) return;
    if (st === 1 && k !== active) { send(sl, 'pauseVideo'); sl._warm = 1; return; }   // oldindan yuklangani o'zi o'ynamasin
    if (st === 1) { if (!window.__shLive) { window.__shLive = 1; dispatchEvent(new Event('dzx-short-live')); } sl.classList.add('is-live'); sl.classList.remove('is-yt-stop'); prewarm(k); }     // 1 — o'ynayapti
    // YouTube o'zi to'xtatsa (pauza/tugadi/boshlanmadi) — uning tugmalari ko'rinmasin: muqova yopib turadi
    // tugadi — boshidan qayta (pleylist parametri yo'q: u ⏮ ⏭ tugmalarini chiqarardi)
    else if (st === 0 && k === active && !sl.classList.contains('is-paused')) { send(sl, 'seekTo', [0, true]); send(sl, 'playVideo'); }
    else if (st === 2 || st === 0 || st === -1 || st === 5) sl.classList.add('is-yt-stop');
  });

  // surish tugagach (scrollend yoki 180 ms jimlik) — eng ko'p ko'rinib turgan slayd faollashadi
  let cand = -1, settleT;
  const settle = () => { clearTimeout(settleT); if (cand >= 0) activate(cand); };
  const settleSoon = () => { clearTimeout(settleT); settleT = setTimeout(settle, 180); };
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting && e.intersectionRatio >= 0.6) { cand = +e.target.dataset.i; settleSoon(); }
  }, { root: feed, threshold: [0.6] });
  slides.forEach(sl => io.observe(sl));
  feed.addEventListener('scroll', settleSoon, { passive: true });
  feed.addEventListener('scrollend', settle);

  // boshqa ilova/varaqqa o'tilganda video to'xtaydi (fonda batareya va trafik sarflamasin), qaytganda davom etadi
  document.addEventListener('visibilitychange', () => {
    const sl = slides[active];
    if (!sl || sl.classList.contains('is-paused')) return;
    send(sl, document.hidden ? 'pauseVideo' : 'playVideo');
  });

  // ovoz avtomatik o'chirilgan bo'lsa — birinchi teginishda (har qanday joyda) yoqiladi
  addEventListener('pointerup', () => {
    if (!autoMuted || !muted) return;
    autoMuted = false; muted = false;
    const sl = slides[active]; send(sl, 'unMute'); send(sl, 'playVideo'); paintSound();
  }, true);

  feed.addEventListener('click', e => {
    const sl = e.target.closest('.sh-slide');
    if (!sl) return;
    if (e.target.closest('.sh-tap')) {
      // avtomatik boshlanmagan bo'lsa (brauzer ruxsat bermagan) — birinchi bosish ishga tushiradi, ovoz bilan
      if (!sl.classList.contains('is-live')) {
        sl.classList.remove('is-paused');
        send(sl, 'playVideo');
        if (muted) { muted = false; send(sl, 'unMute'); paintSound(); }
        return;
      }
      const paused = sl.classList.toggle('is-paused');
      send(sl, paused ? 'pauseVideo' : 'playVideo');
      if (!paused && muted) { muted = false; send(sl, 'unMute'); paintSound(); }   // birinchi bosish — ovoz ham yoqiladi
      return;
    }
    if (e.target.closest('.sh-save')) {
      const id = sl.dataset.id, on = !saved.has(id);
      on ? saved.add(id) : saved.delete(id);
      try { localStorage.setItem(SAVE_KEY, JSON.stringify([...saved].slice(-500))); } catch (er) {}
      sl.querySelector('.sh-save').classList.toggle('is-on', on);
      return toastMsg(on ? (ru ? 'Сохранено' : 'Saqlandi') : (ru ? 'Удалено из сохранённых' : 'Saqlanganlardan olindi'));
    }
    if (e.target.closest('.sh-like')) return react(+sl.dataset.i, 1);
    if (e.target.closest('.sh-dislike')) return react(+sl.dataset.i, -1);
    if (e.target.closest('.sh-comments')) return openSheet(+sl.dataset.i);
    if (e.target.closest('.sh-share')) {
      const url = `https://dezomax.uz/shorts.html#${sl.dataset.id}`;   // doim asosiy domen (ilovada zaxira manzil emas)
      if (navigator.share) navigator.share({ title: list[+sl.dataset.i].t, url }).catch(() => {});
      else navigator.clipboard?.writeText(url).then(() => typeof toast === 'function' && toast(ru ? 'Ссылка скопирована' : 'Havola nusxalandi'));
    }
  });

  // kompyuter: ↑ ↓ / PageUp PageDown — oldingi / keyingi
  addEventListener('keydown', e => {
    if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) return;
    e.preventDefault();
    const to = Math.max(0, Math.min(slides.length - 1, active + (e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : -1)));
    slides[to].scrollIntoView({ behavior: 'smooth' });
  });

  // shorts.html#ID — shu shortdan boshlash
  const start = Math.max(0, list.findIndex(x => x.id === location.hash.slice(1)));
  if (start) slides[start].scrollIntoView();
  // Ovozli avtoijroga ruxsat bormi — oldindan, bir zumda tekshiriladi (2026-11-20). Avval brauzer ruxsat bermasa
  // 4,5 s kutilib, keyin ovozsiz qo'yilardi — shorts ochilgach video 4–5 s turib qolardi. Endi ruxsat yo'q bo'lsa darrov
  // ovozsiz boshlanadi, birinchi teginishda ovoz yoqiladi (pastdagi pointerup).
  const soundProbe = isApp ? Promise.resolve(true) : new Promise(done => {
    try {
      if (navigator.getAutoplayPolicy) return done(navigator.getAutoplayPolicy('mediaelement') === 'allowed');
      const n = 400, b = new Uint8Array(44 + n), v = new DataView(b.buffer), w = (o, t) => [...t].forEach((c, i) => { b[o + i] = c.charCodeAt(0); });
      w(0, 'RIFF'); v.setUint32(4, 36 + n, true); w(8, 'WAVEfmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
      v.setUint32(24, 8000, true); v.setUint32(28, 8000, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true); w(36, 'data'); v.setUint32(40, n, true); b.fill(128, 44);
      const url = URL.createObjectURL(new Blob([b], { type: 'audio/wav' })), a = new Audio(url);
      const end = ok => { try { a.pause(); URL.revokeObjectURL(url); } catch (e) {} done(ok); };
      const pr = a.play();
      if (!pr) return end(true);
      pr.then(() => end(true), e => end(!(e && e.name === 'NotAllowedError')));
      setTimeout(() => end(true), 400);                       // javob kelmasa — zaxira (2,5 s) ishlaydi
    } catch (e) { done(true); }
  });
  // tezkor boshlangan pleyer — ro'yxatga olinadi, YouTube holatini eshitish yoqiladi (yuklangan bo'lsa ham, keyin ham)
  if (keepEarly) {
    const fr = slides[0].querySelector('iframe');
    fr.title = list[0].t;
    frames.set(0, fr);
    const hello = () => { try { fr.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 0, channel: 'widget' }), '*'); } catch (e) {} };
    hello(); fr.addEventListener('load', hello);
  }
  soundProbe.then(ok => { if (!ok && !muted) { muted = true; autoMuted = true; paintSound(); } activate(start); });
})();
