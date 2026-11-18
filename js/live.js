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
      box.querySelector('.vp-top')?.insertAdjacentHTML('afterbegin', `<span class="vp-live"><i></i>${L('JONLI', 'ЭФИР')}</span>`);
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
        <a class="lv-yt" href="https://www.youtube.com/watch?v=${x.id}" target="_blank" rel="noopener">${L('YouTube’da ochish — chat va donat', 'Открыть на YouTube — чат и донаты')} ↗</a>
      </div>`;
    document.querySelectorAll('.lv-card').forEach((c, k) => c.classList.toggle('is-on', k === i));
    if (user) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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
  try { const c = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (c && Date.now() - c.at < 3 * 60000) { items = c.items; render(); } } catch (e) {}
  fetch(String(PAY_API).replace(/\/+$/, '') + '/api/yt/live').then(r => r.ok ? r.json() : null).then(d => {
    if (!d || !Array.isArray(d.items)) { if (!items.length) render(); return; }
    const was = items.map(x => x.id).join();
    items = d.items.filter(x => x && /^[\w-]{11}$/.test(x.id));
    try { sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), items })); } catch (e) {}
    if (items.map(x => x.id).join() !== was || !items.length) render();
  }).catch(() => {});
})();
