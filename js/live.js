/* ============================================================
   DezoMax — «Jonli efir»: YouTube'da hozir efirda bo'lgan o'zbekcha jonli efirlar (tv.html, telekanallar ustida)
   Ro'yxat to'lov serveridan: PAY_API/api/yt/live (server/server.js → ytLive; 5 daqiqa kesh, faqat embed ruxsat
   etilganlar, qimor/18+ chiqarilmaydi). Ko'rsatish — YouTube'ning o'z pleyeri: ko'rishlar, layk va donatlar kanal egasida.
   Yengil: bitta pleyer; telefonda pleyer faqat bosilganda yuklanadi (avtoijro sahifani qotirmasin).
   ============================================================ */
(function () {
  const main = document.querySelector('main');
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
      <div class="lv-player" id="lvPlayer"></div>
      <div class="lv-info" id="lvInfo"></div>
    </div>
    <div class="lv-row" id="lvRow"></div>`;
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
    const box = document.getElementById('lvPlayer');
    // kompyuterda — darhol (ovozsiz); telefonda — rasm + «Ko'rish», bosilganda pleyer (sahifa qotmaydi)
    if (desk || user) box.innerHTML = frame(x, true);
    else box.innerHTML = `<button class="lv-cover" type="button" aria-label="${L('Ko‘rish', 'Смотреть')}"><img src="${esc(thumb(x))}" alt="" decoding="async"><span class="lv-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span></button>`;
    box.querySelector('.lv-cover')?.addEventListener('click', () => { box.innerHTML = frame(x, true); });
    document.getElementById('lvInfo').innerHTML = `
      <span class="lv-badge">LIVE</span>
      <h3>${esc(x.title)}</h3>
      <div class="lv-ch">${x.avatar ? `<img src="${esc(x.avatar)}" alt="" loading="lazy">` : ''}<b>${esc(x.channel)}</b>${x.viewers ? `<small>${fmt(x.viewers)} ${L('kishi ko‘rmoqda', 'смотрят')}</small>` : ''}</div>
      <a class="lv-yt" href="https://www.youtube.com/watch?v=${x.id}" target="_blank" rel="noopener">${L('YouTube’da ochish — chat va donat', 'Открыть на YouTube — чат и донаты')} ↗</a>`;
    document.querySelectorAll('.lv-card').forEach((c, k) => c.classList.toggle('is-on', k === i));
    if (user) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function render() {
    sec.hidden = !items.length;
    if (!items.length) return;
    document.getElementById('lvCount').textContent = L(`${items.length} ta efirda`, `${items.length} в эфире`);
    document.getElementById('lvRow').innerHTML = items.map((x, i) => `
      <button class="lv-card" type="button" data-i="${i}">
        <span class="lv-th"><img src="${esc(thumb(x))}" alt="" loading="lazy" decoding="async" onerror="this.src='https://i.ytimg.com/vi/${x.id}/hqdefault.jpg'"><i>LIVE</i>${x.viewers ? `<em>${fmt(x.viewers)}</em>` : ''}</span>
        <b>${esc(x.title)}</b><small>${esc(x.channel)}</small>
      </button>`).join('');
    show(0, false);
  }
  document.addEventListener('click', e => {
    const c = e.target.closest('.lv-card');
    if (c) { show(+c.dataset.i, true); return; }
    // telekanal yoqilsa — jonli efir pleyeri to'xtaydi (ikki ovoz bir vaqtda chiqmasin)
    if (e.target.closest('#tvGroups') && cur >= 0) {
      const x = items[cur], box = document.getElementById('lvPlayer');
      if (box.querySelector('iframe')) box.innerHTML = `<button class="lv-cover" type="button"><img src="${esc(thumb(x))}" alt=""><span class="lv-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span></button>`;
      box.querySelector('.lv-cover')?.addEventListener('click', () => { box.innerHTML = frame(x, true); });
    }
  });

  const KEY = 'dzxLive';
  try { const c = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (c && Date.now() - c.at < 3 * 60000) { items = c.items; render(); } } catch (e) {}
  fetch(String(PAY_API).replace(/\/+$/, '') + '/api/yt/live').then(r => r.ok ? r.json() : null).then(d => {
    if (!d || !Array.isArray(d.items)) return;
    const was = items.map(x => x.id).join();
    items = d.items.filter(x => x && /^[\w-]{11}$/.test(x.id));
    try { sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), items })); } catch (e) {}
    if (items.map(x => x.id).join() !== was) render();
  }).catch(() => {});
})();
