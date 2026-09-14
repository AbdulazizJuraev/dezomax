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

/* ---------- Ishga tushirish ---------- */

initLayout();
renderDownloads();
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('langchange', () => {
  renderDownloads();
  applyI18n();
});
