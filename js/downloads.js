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
  const url = Offline.localUrl(it);
  box.innerHTML = '<div class="mt-loading"><i></i><i></i><i></i></div>';
  // avval faylni tekshiramiz — ochilmasa, sababini aniq ko'rsatamiz (skrinshot bilan muammoni topish oson bo'lsin)
  probeLocal(url).then(d => {
    if (!wrap.isConnected) return;
    if (!d.ok) return showOffError(box, d.reason, d.detail);
    mountVideo(box, url, { poster: it.cover || it.poster || null, wide: !!it.cover, title: it.title,
      onFail: () => {
        const v = box.querySelector('video');
        const err = v && v.error ? ` · MediaError ${v.error.code}: ${v.error.message || ''}` : '';
        showOffError(box, LANG === 'ru' ? 'Видео не открылось' : 'Video ochilmadi', d.detail + err);
      } });
    box.querySelector('#vpCover')?.click();
    // 15 soniyada boshlanmasa — qotib qolgan deb hisoblaymiz
    setTimeout(() => {
      const v = box.querySelector('video');
      if (wrap.isConnected && v && v.readyState < 2) showOffError(box, LANG === 'ru' ? 'Видео не загружается' : 'Video yuklanmayapti', `${d.detail} · readyState ${v.readyState}, error ${v.error?.code || '—'}`);
    }, 15000);
  });
}

/* Telefondagi faylning birinchi baytlarini o'qib, haqiqiy video ekanini tekshirish */
async function probeLocal(url) {
  const ru = LANG === 'ru';
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 8000);
  try {
    const r = await fetch(url, { headers: { Range: 'bytes=0-63' }, cache: 'no-store', signal: ctl.signal });
    const type = r.headers.get('content-type') || '—';
    const total = Number((r.headers.get('content-range') || '').split('/')[1]) || Number(r.headers.get('content-length')) || 0;
    const size = total ? (total >= 1048576 ? Math.round(total / 1048576) + ' MB' : Math.round(total / 1024) + ' KB') : '?';
    const b = new Uint8Array(await r.arrayBuffer()).slice(0, 64);
    const ascii = String.fromCharCode(...b).replace(/[^\x20-\x7e]/g, '.');
    const detail = `HTTP ${r.status} · ${type} · ${size} · «${ascii.slice(0, 16)}»`;
    if (r.status === 404) return { ok: false, reason: ru ? 'Файл не найден на телефоне' : 'Fayl telefonda topilmadi — qayta yuklab oling', detail };
    if (!r.ok) return { ok: false, reason: ru ? 'Приложение не отдаёт файл' : 'Ilova faylni bermayapti — ilovani yangilang', detail };
    if (/^\s*<|<!doctype|<html/i.test(ascii)) return { ok: false, reason: ru ? 'Это не видео: вместо фильма сайт отдал страницу' : 'Bu video emas: manba sayt kino o‘rniga sahifa bergan. Bu kinoni o‘chirib, boshqa manbadan yuklang', detail };
    if (total && total < 2 * 1048576) return { ok: false, reason: ru ? 'Файл скачан не полностью' : 'Fayl to‘liq yuklanmagan — o‘chirib, qayta yuklab oling', detail };
    const isVideo = /ftyp|moov|mdat|webm|\x1aE\xdf\xa3/i.test(String.fromCharCode(...b));
    // surish (seek) tekshiruvi: 0..256K bo'lagidagi 100000-baytdan 64 bayt == alohida so'ralgan 100000..100063 bo'lmog'i kerak;
    // oxirgi 64 bayt ham kelishi kerak. Mos kelmasa — ilova faylni noto'g'ri joydan beryapti (pleyer shuning uchun ochmaydi)
    let seek = '';
    try {
      const get = async range => {
        const rr = await fetch(url, { headers: { Range: 'bytes=' + range }, cache: 'no-store', signal: ctl.signal });
        return { s: rr.status, cr: rr.headers.get('content-range') || '', b: new Uint8Array(await rr.arrayBuffer()) };
      };
      const A = await get('0-262143'), B = await get('100000-100063');
      const same = B.b.length === 64 && B.b.every((x, i) => x === A.b[100000 + i]);
      let tail = '';
      if (total > 1000) { const C = await get(`${total - 64}-${total - 1}`); tail = ` · oxiri ${C.s}/${C.b.length}b`; }
      seek = ` · seek ${same ? 'OK' : `XATO (${B.s} ${B.b.length}b ${B.cr})`}${tail}`;
    } catch (e) { seek = ` · seek ? (${e.name})`; }
    return { ok: true, detail: detail + seek + (isVideo ? '' : ' · format?') };
  } catch (e) {
    return { ok: false, reason: ru ? 'Приложение не отвечает при чтении файла' : 'Ilova faylni o‘qishda javob bermadi', detail: e.name === 'AbortError' ? '8 s kutildi' : String(e.message || e) };
  } finally { clearTimeout(timer); }
}

function showOffError(box, reason, detail) {
  if (typeof destroyVideo === 'function') destroyVideo();
  box.innerHTML = `
    <div class="offline-note">
      <span class="offline-note-ico" aria-hidden="true">!</span>
      <b>${esc(reason)}</b>
      <p class="off-diag">${esc(detail || '')}</p>
    </div>`;
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
