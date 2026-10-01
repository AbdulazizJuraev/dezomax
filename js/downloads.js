/* ============================================================
   DezoMax — Yuklab olinganlar / Загрузки
   ------------------------------------------------------------
   Sayt statik va video fayllarni o'zida saqlamaydi. Shuning uchun:
     - "video" maydonida to'g'ridan-to'g'ri fayl (mp4/webm) bo'lsa —
       haqiqiy yuklab olish havolasi beriladi;
     - YouTube treyler yoki HLS oqim bo'lsa — yuklab bo'lmaydi,
       buni foydalanuvchiga ochiq aytamiz.
   ============================================================ */

/* Havola to'g'ridan-to'g'ri fayl ekanini tekshiramiz */
const isDirectFile = url => !!url && /\.(mp4|webm|ogv|ogg|mov|m4v)(\?|$)/i.test(url);

function rowHTML(m) {
  const can = isDirectFile(m.video);
  const file = can ? m.video.split('/').pop().split('?')[0] : '';

  return `
  <div class="dl-row reveal">
    <a class="dl-poster" href="movie.html?id=${m.id}">
      <div class="card-poster">${posterHTML(m)}</div>
    </a>

    <div class="dl-info">
      <a class="dl-title" href="movie.html?id=${m.id}">${esc(title(m))}</a>
      <div class="dl-meta">${[m.year, typeName(m.type), durationText(m)].filter(x => x && x !== '—').map(esc).join(' · ')}</div>
      ${can
        ? `<div class="dl-file">${esc(file)}</div>`
        : `<div class="dl-warn">${t('dl.unavailableHint')}</div>`}
    </div>

    <div class="dl-actions">
      ${can
        ? `<a class="btn btn-primary btn-sm" href="${esc(m.video)}" download target="_blank" rel="noopener">
             ${ICONS.download}<span>${t('dl.open')}</span></a>`
        : `<span class="dl-badge">${t('dl.unavailable')}</span>`}
      <button class="btn btn-ghost btn-sm" data-remove="${m.id}">${t('dl.remove')}</button>
    </div>
  </div>`;
}

function renderDownloads() {
  const box = document.getElementById('dlList');
  const list = getDownloads().map(id => MOVIES.find(m => m.id === id)).filter(Boolean);

  document.getElementById('dlCount').textContent = list.length ? resultsText(list.length) : '';

  if (!list.length) {
    box.innerHTML = emptyHTML('dl.empty', 'dl.emptyHint');
    return;
  }

  box.innerHTML = `<div class="dl-list">${list.map(rowHTML).join('')}</div>`;

  box.querySelectorAll('[data-remove]').forEach(btn =>
    btn.addEventListener('click', () => { toggleDownload(btn.dataset.remove); renderDownloads(); }));

  observeReveals(box);
}

/* ---------- Telefonga yuklanganlar (faqat ilovada, js/offline.js) ----------
   Internetsiz ko'riladi: pleyer sahifaning o'zida ochiladi (oyna ustida), fayl telefondan o'qiladi. */
let offTimer = 0;
async function renderOffline() {
  if (typeof Offline === 'undefined' || !Offline.enabled()) return;
  let box = document.getElementById('offList');
  if (!box) {
    box = document.createElement('section');
    box.id = 'offList';
    box.className = 'off-sec';
    document.querySelector('main .section-head').before(box);
  }
  const list = await Offline.refresh();
  const sp = await Offline.space();
  box.innerHTML = `
    <div class="section-head" style="margin-bottom:6px"><i class="bar"></i><h2>${esc(t('off.title'))}</h2><span class="result-count">${list.length || ''}</span></div>
    <p class="acc-muted off-hint">${esc(t('off.hint'))}${sp ? ` · ${esc(t('off.space').replace('{used}', offSize(sp.used) || '0 MB').replace('{free}', offSize(sp.free)))}` : ''}</p>
    ${list.length ? `<div class="dl-list">${list.map(it => {
      const run = ['pending', 'running', 'paused'].includes(it.state);
      const pct = offPct(it);
      return `
      <div class="dl-row off-row" data-key="${esc(it.key)}">
        <button class="dl-poster" type="button" data-watch="${esc(it.key)}" ${it.state === 'done' ? '' : 'disabled'}>
          <div class="card-poster">${it.poster ? `<img src="${esc(it.poster)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</div>
        </button>
        <div class="dl-info">
          <span class="dl-title">${esc(it.title)}</span>
          <div class="dl-meta">${it.state === 'done' ? `${OFF_ICONS.done} ${esc(t('off.done'))}${it.total > 0 ? ` · ${offSize(it.total)}` : ''}`
            : run ? `${esc(it.total > 0 ? `${t('off.downloading')} ${pct}% · ${offSize(it.loaded)} / ${offSize(it.total)}` : t('off.queued'))}`
            : esc(t('off.failed'))}</div>
          ${run ? `<div class="off-bar"><i style="width:${pct}%"></i></div>` : ''}
        </div>
        <div class="dl-actions">
          ${it.state === 'done' ? `<button class="btn btn-primary btn-sm" type="button" data-watch="${esc(it.key)}">${ICONS.play}<span>${esc(t('off.watch'))}</span></button>` : ''}
          <button class="btn btn-ghost btn-sm" type="button" data-offdel="${esc(it.key)}">${esc(t('off.delete'))}</button>
        </div>
      </div>`;
    }).join('')}</div>` : `<p class="acc-muted off-empty">${esc(t('off.empty'))}</p>`}`;

  box.querySelectorAll('[data-watch]').forEach(b => b.addEventListener('click', () => playOffline(b.dataset.watch)));
  box.querySelectorAll('[data-offdel]').forEach(b => b.addEventListener('click', async () => {
    if (!confirm(t('off.removeAsk'))) return;
    await Offline.remove(b.dataset.offdel);
    renderOffline();
  }));
  clearTimeout(offTimer);
  if (list.some(x => ['pending', 'running', 'paused'].includes(x.state))) offTimer = setTimeout(renderOffline, 2000);
}

function playOffline(key) {
  const it = Offline.list().find(x => x.key === key && x.state === 'done');
  if (!it) return;
  const wrap = document.createElement('div');
  wrap.className = 'off-player';
  wrap.innerHTML = `
    <div class="off-player-top"><b>${esc(it.title)}</b><button type="button" class="soc-sheet-x" aria-label="×">✕</button></div>
    <div class="player-wrap" id="offBox"></div>`;
  document.body.appendChild(wrap);
  document.documentElement.classList.add('soc-lock');
  const close = () => {
    if (typeof destroyVideo === 'function') destroyVideo();
    wrap.remove();
    document.documentElement.classList.remove('soc-lock');
  };
  wrap.querySelector('.soc-sheet-x').addEventListener('click', close);
  const box = wrap.querySelector('#offBox');
  mountVideo(box, Offline.localUrl(it), { poster: it.cover || it.poster || null, wide: !!it.cover, title: it.title });
  box.querySelector('#vpCover')?.click();
}

/* ---------- Ishga tushirish ---------- */

initLayout();
renderOffline();
renderDownloads();
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('langchange', () => {
  renderDownloads();
  applyI18n();
});
