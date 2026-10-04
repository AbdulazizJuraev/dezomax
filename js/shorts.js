/* ============================================================
   DezoMax — Shorts lentasi (shorts.html)
   Ruxsat berilgan kanallarning qisqa videolari (js/data-shorts.js → SHORTS).
   - Telefonda butun ekran, tepaga surilsa — keyingisi (scroll-snap); kompyuterda o'rtada tik ustun, ↑ ↓ tugmalari
   - Faqat ko'rinib turgan short uchun YouTube pleyeri yuklanadi (qolganlari — muqova), sahifa yengil
   - Bir bosish — pauza / davom; ovoz tugmasi (birinchisi ovozsiz boshlanadi — brauzerlar talabi)
   - Kanalga «Obuna bo'lish» — kanal egasi uchun (ko'rishlar ham YouTube'da, egasida)
   shorts.html#VIDEO_ID — shu shortdan boshlanadi (bosh sahifadagi «Shorts» qatori)
   ============================================================ */

(function () {
  const feed = document.getElementById('shortsFeed');
  const list = typeof SHORTS !== 'undefined' ? SHORTS.filter(x => x && /^[\w-]{11}$/.test(x.id)) : [];
  const ru = typeof LANG !== 'undefined' && LANG === 'ru';
  if (typeof initLayout === 'function') try { initLayout(); } catch {}
  if (!list.length) { feed.innerHTML = `<p class="sh-empty">${ru ? 'Пока нет коротких видео' : 'Hozircha shorts yo‘q'}</p>`; return; }

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const handle = u => '@' + (String(u).match(/@([\w.-]+)/) || [, 'kanal'])[1];
  const ICON = {
    muted: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M23 9l-6 6M17 9l6 6"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>',
  };

  feed.innerHTML = list.map((s, i) => `
    <section class="sh-slide" data-i="${i}" data-id="${s.id}">
      <img class="sh-thumb" src="https://i.ytimg.com/vi/${s.id}/oardefault.jpg" alt="" ${i > 1 ? 'loading="lazy"' : ''} decoding="async">
      <div class="sh-frame"></div>
      <button class="sh-tap" type="button" aria-label="${ru ? 'Пауза / воспроизвести' : 'Pauza / davom ettirish'}"><span class="sh-paused">${ICON.play}</span></button>
      <div class="sh-info">
        <div class="sh-chrow">
          <a class="sh-ch" href="${esc(s.u)}" target="_blank" rel="noopener">${esc(handle(s.u))}</a>
          <a class="sh-sub" href="${esc(s.u)}?sub_confirmation=1" target="_blank" rel="noopener">${ru ? 'Подписаться' : 'Obuna bo‘lish'}</a>
        </div>
        <p class="sh-title">${esc(s.t)}</p>
      </div>
      <div class="sh-actions">
        <button class="sh-btn sh-sound" type="button" aria-label="${ru ? 'Звук' : 'Ovoz'}">${ICON.muted}</button>
        <button class="sh-btn sh-share" type="button" aria-label="${ru ? 'Поделиться' : 'Ulashish'}">${ICON.share}</button>
      </div>
    </section>`).join('');

  const slides = [...feed.querySelectorAll('.sh-slide')];
  let muted = true, active = -1;

  const send = (slide, func, args = []) => {
    const f = slide && slide.querySelector('iframe');
    if (f && f.contentWindow) f.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
  };
  const paintSound = () => feed.querySelectorAll('.sh-sound').forEach(b => { b.innerHTML = muted ? ICON.muted : ICON.sound; });

  function activate(i) {
    if (i === active) return;
    // avvalgi pleyer olib tashlanadi — bir vaqtda faqat bitta video (telefon xotirasi va trafigi)
    slides.forEach((sl, k) => { if (k !== i) { sl.querySelector('.sh-frame').innerHTML = ''; sl.classList.remove('is-playing', 'is-paused'); } });
    active = i;
    const sl = slides[i], id = sl.dataset.id;
    sl.querySelector('.sh-frame').innerHTML =
      `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=${muted ? 1 : 0}&playsinline=1&loop=1&playlist=${id}` +
      `&controls=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&origin=${encodeURIComponent(location.origin)}"` +
      ` allow="autoplay; encrypted-media; picture-in-picture" title="${esc(list[i].t)}"></iframe>`;
    sl.classList.add('is-playing');
    try { history.replaceState(null, '', '#' + id); } catch {}
    // keyingi shortning muqovasi oldindan
    const next = slides[i + 1] && slides[i + 1].querySelector('.sh-thumb');
    if (next) next.loading = 'eager';
  }

  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting && e.intersectionRatio >= 0.6) activate(+e.target.dataset.i);
  }, { root: feed, threshold: [0.6] });
  slides.forEach(sl => io.observe(sl));

  feed.addEventListener('click', e => {
    const sl = e.target.closest('.sh-slide');
    if (!sl) return;
    if (e.target.closest('.sh-tap')) {
      const paused = sl.classList.toggle('is-paused');
      send(sl, paused ? 'pauseVideo' : 'playVideo');
      if (!paused && muted) { muted = false; send(sl, 'unMute'); paintSound(); }   // birinchi bosish — ovoz ham yoqiladi
      return;
    }
    if (e.target.closest('.sh-sound')) {
      muted = !muted;
      send(sl, muted ? 'mute' : 'unMute');
      if (!muted) send(sl, 'playVideo');
      paintSound();
      return;
    }
    if (e.target.closest('.sh-share')) {
      const url = `${location.origin}${location.pathname}#${sl.dataset.id}`;
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
  activate(start);
})();
