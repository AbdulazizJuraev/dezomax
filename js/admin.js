/* ============================================================
   DezoMax — admin: kinolarni qo'lda qo'shish / tahrirlash / o'chirish
   ------------------------------------------------------------
   Server yo'q: o'zgarishlar GitHub API orqali to'g'ridan-to'g'ri repoga yoziladi
   (js/data-custom.js va images/custom/*.jpg), GitHub Pages ~1 daqiqada saytni yangilaydi.

   Token: GitHub fine-grained token (faqat shu repo, Contents: Read and write).
   Faqat shu brauzerning localStorage'ida saqlanadi — repoga HECH QACHON yozilmaydi.

   Faqat huquqi bor kontent (litsenziyali fayllar, rasmiy YouTube videolari).
   ============================================================ */

const GH = { owner: 'AbdulazizJuraev', repo: 'dezomax', branch: 'main' };
const SITE_URL = 'https://abdulazizjuraev.github.io/dezomax/';
const DATA_PATH = 'js/data-custom.js';
const TOKEN_KEY = 'dezomax_admin_token';

// Ruxsatsiz kontent tarqatuvchi xostlar — bunday havolalar qabul qilinmaydi
const BLOCKED_HOSTS = /(asilmedia|terabox|1024tera|teraboxapp|uzmovi|uztube|kinogo|hdrezka|rezka\.ag|filmix|lordfilm)/i;

const $ = s => document.querySelector(s);
const token = () => localStorage.getItem(TOKEN_KEY) || '';

let customList = [];      // hozirgi data-custom.js dagi kinolar
let dataSha = null;       // fayl versiyasi (to'qnashuvni oldini olish uchun)
let editingId = null;

/* ---------- GitHub API ---------- */

async function gh(path, opts = {}) {
  const r = await fetch(`https://api.github.com/repos/${GH.owner}/${GH.repo}${path}`, {
    ...opts,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token()}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(opts.body ? { 'Content-Type': 'application/json' } : {})
    }
  });
  if (!r.ok) {
    let msg = `GitHub ${r.status}`;
    try { msg += ': ' + (await r.json()).message; } catch {}
    throw Object.assign(new Error(msg), { status: r.status });
  }
  return r.status === 204 ? null : r.json();
}

const b64encode = str => btoa(unescape(encodeURIComponent(str)));
const b64decode = b64 => decodeURIComponent(escape(atob(b64.replace(/\n/g, ''))));

async function getFile(path) {
  try {
    return await gh(`/contents/${path}?ref=${GH.branch}&t=${Date.now()}`);
  } catch (e) {
    if (e.status === 404) return null;
    throw e;
  }
}

async function putFile(path, contentB64, message, sha) {
  return gh(`/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({ message, content: contentB64, branch: GH.branch, ...(sha ? { sha } : {}) })
  });
}

/* ---------- data-custom.js o'qish / yozish ---------- */

let hiddenList = [];      // saytdan yashirilgan kinolar id'lari

async function loadCustom() {
  const f = await getFile(DATA_PATH);
  if (!f) { customList = []; hiddenList = []; dataSha = null; return; }
  dataSha = f.sha;
  const text = b64decode(f.content);
  const m = text.match(/\/\*DATA\*\/([\s\S]*?)\/\*END\*\//);
  const h = text.match(/\/\*HIDDEN\*\/([\s\S]*?)\/\*ENDHIDDEN\*\//);
  customList = m ? JSON.parse(m[1]) : [];
  hiddenList = h ? JSON.parse(h[1]) : [];
}

function buildDataFile(list, hidden) {
  return `/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/${JSON.stringify(list, null, 2)}/*END*/;
const HIDDEN_MOVIES = /*HIDDEN*/${JSON.stringify(hidden)}/*ENDHIDDEN*/;

if (typeof MOVIES !== 'undefined') {
  window.BASE_MOVIES = MOVIES.slice();        // admin sahifa asl ro'yxatni ko'rishi uchun
  for (const m of CUSTOM_MOVIES) {
    const i = MOVIES.findIndex(x => x.id === m.id);
    if (i > -1) MOVIES[i] = m; else MOVIES.push(m);
  }
  for (let i = MOVIES.length - 1; i >= 0; i--) {
    if (HIDDEN_MOVIES.includes(MOVIES[i].id)) MOVIES.splice(i, 1);
  }
}
`;
}

/* Yozish; boshqa joyda o'zgargan bo'lsa (409) — qayta o'qib, o'zgarishni qayta qo'llaymiz.
   mutate(list, hidden) — ro'yxatni qaytaradi, hidden massivini joyida o'zgartiradi */
async function saveCustom(mutate, message) {
  for (let attempt = 0; attempt < 2; attempt++) {
    await loadCustom();
    const hidden = [...hiddenList];
    const next = mutate(structuredClone(customList), hidden);
    try {
      const res = await putFile(DATA_PATH, b64encode(buildDataFile(next, hidden)), message, dataSha);
      dataSha = res.content.sha;
      customList = next;
      hiddenList = hidden;
      return;
    } catch (e) {
      if (e.status !== 409 || attempt) throw e;
    }
  }
}

/* ---------- Poster: siqish va yuklash ---------- */

function compressImage(file, maxW = 600) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxW / img.naturalWidth);
      const c = document.createElement('canvas');
      c.width = Math.round(img.naturalWidth * scale);
      c.height = Math.round(img.naturalHeight * scale);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL('image/jpeg', 0.86).split(',')[1]);
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error('Rasmni o‘qib bo‘lmadi'));
    img.src = URL.createObjectURL(file);
  });
}

async function uploadPoster(file, slug) {
  const b64 = await compressImage(file);
  const path = `images/custom/${slug}.jpg`;
  const existing = await getFile(path);
  await putFile(path, b64, `Poster: ${slug}`, existing?.sha);
  // APK ham ko'rsata olishi uchun to'liq manzil
  return SITE_URL + path;
}

/* ---------- Yordamchilar ---------- */

const slugify = s => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'kino';

/* data.js dagi asl kinolar (data-custom.js qo'shimchalarisiz) */
const baseMovies = () => window.BASE_MOVIES || MOVIES;
const isBase = id => baseMovies().some(m => m.id === id);

function nextId() {
  const ids = [...baseMovies().map(m => m.id), ...customList.map(m => m.id)];
  return Math.max(999, ...ids) + 1;
}

/* Hozirgi holat: asl kino + tahrir (bo'lsa) */
function currentMovie(id) {
  return customList.find(m => m.id === id) || baseMovies().find(m => m.id === id) || null;
}

function checkVideoUrl(url) {
  if (!url) return { ok: true };
  let u;
  try { u = new URL(url); } catch { return { ok: false, msg: 'Havola noto‘g‘ri' }; }
  if (BLOCKED_HOSTS.test(u.hostname)) {
    return { ok: false, msg: 'Bu xostdagi kontent ruxsatsiz tarqatiladi — qabul qilinmaydi.' };
  }
  // Istalgan sayt qabul qilinadi: YouTube, Vimeo, Google Drive, .mp4/.m3u8 — o'z pleyerida,
  // qolgan havolalar sayt ichida iframe sifatida ochiladi (js/movie.js → embedFor)
  if (u.protocol === 'http:') return { ok: true, warn: 'Havola «http://» — sayt HTTPS bo‘lgani uchun brauzer uni to‘sib qo‘yishi mumkin. Imkon bo‘lsa «https://» ishlating.' };
  return { ok: true };
}

function toast(msg, isErr) {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast' + (isErr ? ' is-error' : '');
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-in'));
  setTimeout(() => { el.classList.remove('is-in'); setTimeout(() => el.remove(), 300); }, 3500);
}

/* ---------- Token ekrani ---------- */

function renderTokenScreen(err = '') {
  $('#admin').innerHTML = `
    <div class="acc-card adm-token">
      <h1>Admin — kino qo‘shish</h1>
      <p class="acc-muted">Kinolar GitHub'dagi saytingizga to‘g‘ridan-to‘g‘ri yoziladi. Buning uchun GitHub token kerak.</p>
      <ol class="adm-steps">
        <li><a class="acc-link" href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">github.com → Fine-grained token</a> sahifasini oching</li>
        <li><b>Repository access:</b> Only select repositories → <code>dezomax</code></li>
        <li><b>Permissions → Contents:</b> Read and write</li>
        <li>Tokenni nusxalab, pastga qo‘ying</li>
      </ol>
      <label class="acc-label" for="tokInput">GitHub token</label>
      <input class="acc-input" id="tokInput" type="password" autocomplete="off" placeholder="github_pat_...">
      <p class="acc-error" ${err ? '' : 'hidden'}>${esc(err)}</p>
      <button class="btn btn-primary acc-submit" id="tokSave" type="button">Kirish</button>
      <p class="acc-note">${ICONS.info}<span>Token faqat shu brauzerda saqlanadi va saytga yozilmaydi. Begona kompyuterda ishlatmang.</span></p>
    </div>`;

  $('#tokSave').addEventListener('click', async () => {
    // nusxalashda qo'shilib qoladigan bo'sh joy, qator, qo'shtirnoq va ko'rinmas belgilarni tozalaymiz
    const v = $('#tokInput').value.replace(/[\s"'`​-‍﻿]/g, '');
    if (!v) return;
    if (!/^(github_pat_|ghp_)[A-Za-z0-9_]{20,}$/.test(v)) {
      return renderTokenScreen('Bu GitHub token emas. Token «github_pat_» (yoki «ghp_») bilan boshlanadi va juda uzun bo‘ladi — to‘liq nusxalang.');
    }
    localStorage.setItem(TOKEN_KEY, v);
    $('#tokSave').disabled = true;
    try {
      const repo = await gh('');
      if (!repo.permissions?.push) throw Object.assign(new Error('perm'), { status: 'perm' });
      await boot();
    } catch (e) {
      localStorage.removeItem(TOKEN_KEY);
      const msg = {
        401: 'GitHub tokenni tanimadi (401). Token noto‘g‘ri/to‘liq emas, o‘chirilgan yoki muddati o‘tgan. Yangi token yaratib, «Generate token» dan keyin chiqqan qiymatni to‘liq nusxalang.',
        403: 'Tokenga ruxsat yetarli emas (403). Permissions → Contents: «Read and write» bo‘lishi kerak.',
        404: '«dezomax» repozitoriyasiga ruxsat yo‘q (404). Repository access → Only select repositories → dezomax ni tanlang.',
        perm: 'Token faqat o‘qiy oladi. Permissions → Contents: «Read and write» ni tanlang.'
      }[e.status] || e.message;
      renderTokenScreen(msg);
    }
  });
}

/* ---------- Forma ---------- */

const ADM_ICONS = {
  info:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h10M4 18h7"/></svg>',
  list:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 9h10M7 13h6"/></svg>',
  tag:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/></svg>',
  text:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5h14M5 10h14M5 15h9M5 20h6"/></svg>',
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="15" height="14" rx="2.5"/><path d="M17.5 10l4-2.5v9l-4-2.5"/></svg>',
  gear:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
  upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
};

function formHTML(m = {}) {
  const val = v => esc(v ?? '');
  const field = (label, input, cls = '') => `<div class="adm-field ${cls}"><label class="adm-label">${label}</label>${input}</div>`;
  const section = (icon, title, body, hint = '') => `
    <section class="adm-sec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${ADM_ICONS[icon]}</span><h3>${title}</h3>${hint ? `<small>${hint}</small>` : ''}</div>
      ${body}
    </section>`;
  const editing = !!m.id;

  return `
    <form class="adm-form" id="admForm" novalidate>
      <!-- Sarlavha: poster + nom -->
      <div class="adm-hero">
        <div class="adm-hero-bg" style="${m.poster ? `background-image:url('${esc(m.poster)}')` : ''}"></div>
        <div class="adm-hero-poster" id="admPosterPrev">${m.poster ? `<img src="${esc(m.poster)}" alt="" onerror="this.remove()">` : ADM_ICONS.media}</div>
        <div class="adm-hero-info">
          <span class="adm-hero-kicker">${editing ? 'Tahrirlash' : 'Yangi kino'}${editing ? ` · ID ${m.id}` : ''}</span>
          <h2 id="admHeadTitle">${esc(m.title?.uz || 'Nomsiz kino')}</h2>
          <div class="adm-hero-tags">
            ${editing && isBase(m.id) ? '<span class="adm-badge">Saytdagi asl kino</span>' : ''}
            ${m.year ? `<span class="adm-chip-sm">${m.year}</span>` : ''}
            ${m.type ? `<span class="adm-chip-sm">${typeName(m.type)}</span>` : ''}
          </div>
        </div>
        ${editing ? `<button class="adm-hero-close" type="button" id="admCancel" aria-label="Bekor qilish">${ICONS.close}</button>` : ''}
      </div>

      ${section('info', 'Asosiy', `
        <div class="adm-row adm-row-2">
          ${field('Nomi (o‘zbekcha) <b class="adm-req">*</b>', `<input class="acc-input" name="titleUz" required value="${val(m.title?.uz)}" placeholder="Masalan: Yulduzlararo">`)}
          ${field('Nomi (ruscha)', `<input class="acc-input" name="titleRu" value="${val(m.title?.ru)}" placeholder="Интерстеллар">`)}
        </div>
        <div class="adm-row adm-row-4">
          ${field('Turi', `<select class="acc-input" name="type">${['film', 'serial', 'multfilm'].map(x => `<option value="${x}"${m.type === x ? ' selected' : ''}>${typeName(x)}</option>`).join('')}</select>`)}
          ${field('Yili', `<input class="acc-input" name="year" type="number" inputmode="numeric" min="1900" max="2100" value="${val(m.year)}" placeholder="2024">`)}
          ${field('Davomiyligi', `<div class="adm-suffix"><input class="acc-input" name="duration" type="number" inputmode="numeric" min="1" max="1000" value="${val(m.duration)}" placeholder="120"><span>daq.</span></div>`)}
          ${field('Reyting', `<div class="adm-suffix"><input class="acc-input" name="rating" type="number" inputmode="decimal" step="0.1" min="0" max="10" value="${val(m.rating)}" placeholder="8.5"><span>★</span></div>`)}
        </div>
      `)}

      ${section('list', 'Tafsilotlar', `
        <div class="adm-row adm-row-2">
          ${field('Davlat (o‘zbekcha)', `<input class="acc-input" name="countryUz" value="${val(m.country?.uz)}" placeholder="O‘zbekiston">`)}
          ${field('Davlat (ruscha)', `<input class="acc-input" name="countryRu" value="${val(m.country?.ru)}" placeholder="Узбекистан">`)}
          ${field('Rejissyor', `<input class="acc-input" name="director" value="${val(m.director)}">`)}
          ${field('Bo‘lim', `<select class="acc-input" name="franchise">${[['', 'Yo‘q'], ['uzbek', 'O‘zbek kino'], ['marvel', 'Marvel'], ['dc', 'DC']].map(([v, l]) => `<option value="${v}"${(m.franchise || '') === v ? ' selected' : ''}>${l}</option>`).join('')}</select>`)}
        </div>
        ${field('Rollarda', `<input class="acc-input" name="cast" value="${val((m.cast || []).join(', '))}" placeholder="Aktyorlarni vergul bilan ajrating">`)}
      `)}

      ${section('tag', 'Janrlar', `
        <div class="adm-genres">
          ${GENRES.map(g => `<label class="adm-genre"><input type="checkbox" name="genres" value="${g.id}"${(m.genres || []).includes(g.id) ? ' checked' : ''}><span>${ADM_ICONS.check}${esc(g.uz)}</span></label>`).join('')}
        </div>
      `, 'bir nechtasini tanlash mumkin')}

      ${section('text', 'Tavsif', `
        ${field('O‘zbekcha', `<textarea class="acc-input adm-text" name="descUz" rows="4" placeholder="Kino haqida qisqacha...">${val(m.desc?.uz)}</textarea>`)}
        ${field('Ruscha', `<textarea class="acc-input adm-text" name="descRu" rows="3" placeholder="Коротко о фильме...">${val(m.desc?.ru)}</textarea>`)}
      `)}

      ${section('media', 'Poster va video', `
        <label class="adm-drop">
          <input type="file" name="posterFile" accept="image/*">
          <span class="adm-drop-icon">${ADM_ICONS.upload}</span>
          <span class="adm-drop-text"><b>Poster yuklash</b><small id="admFileName">Rasm tanlang — avtomatik kichraytiriladi</small></span>
        </label>
        ${field('yoki poster havolasi', `<input class="acc-input" name="posterUrl" value="${val(m.poster)}" placeholder="https://...jpg">`)}
        <div class="adm-row adm-row-2">
          ${field('To‘liq kino havolasi', `<input class="acc-input" name="video" value="${val(m.video)}" placeholder="YouTube, Vimeo, .mp4, .m3u8, embed...">`)}
          ${field('Treyler havolasi', `<input class="acc-input" name="trailer" value="${val(m.trailer)}" placeholder="https://youtube.com/watch?v=...">`)}
          ${field('Manba nomi', `<input class="acc-input" name="sourceName" value="${val(m.source?.name)}" placeholder="Rasmiy kanal yoki distribyutor">`)}
          ${field('Manba havolasi', `<input class="acc-input" name="sourceUrl" value="${val(m.source?.url)}" placeholder="https://...">`)}
        </div>
        <p class="adm-hint" id="admVideoHint" hidden></p>
      `)}

      ${section('gear', 'Ko‘rinish', `
        <div class="adm-switches">
          <label class="acc-toggle"><span><b>O‘zbek tilida</b><small>Kartada «O‘zbekcha» belgisi chiqadi</small></span><input type="checkbox" name="audioUz"${m.audio === 'uz' ? ' checked' : ''}><i></i></label>
          <label class="acc-toggle"><span><b>Bosh sahifa slayderida</b><small>Katta slayderda ko‘rsatiladi</small></span><input type="checkbox" name="featured"${m.featured ? ' checked' : ''}><i></i></label>
        </div>
      `)}

      <label class="adm-rights">
        <input type="checkbox" name="rights" required${editing ? ' checked' : ''}>
        <span>Men ushbu kinoni saytda ko‘rsatish huquqiga egaman (litsenziya, huquq egasining ruxsati yoki rasmiy manba).</span>
      </label>

      <!-- Pastda doim ko'rinadigan saqlash paneli -->
      <div class="adm-savebar">
        <p class="acc-error" id="admErr" hidden></p>
        <div class="adm-savebar-row">
          ${editing ? '<button class="btn btn-ghost" type="button" data-cancel>Bekor qilish</button>' : ''}
          <button class="btn btn-primary" id="admSubmit" type="submit">${editing ? 'O‘zgarishlarni saqlash' : 'Kino qo‘shish'}</button>
        </div>
      </div>
    </form>`;
}

function readForm(form, old = {}) {
  const f = new FormData(form);
  const s = k => String(f.get(k) || '').trim();
  const num = k => { const v = parseFloat(s(k)); return Number.isFinite(v) ? v : undefined; };
  // formada bo'lmagan maydonlar (tags, audio va h.k.) saqlanib qoladi
  const m = {
    ...old,
    id: old.id || nextId(),
    slug: old.slug || slugify(s('titleUz')),
    type: s('type') || 'film',
    title: { uz: s('titleUz'), ru: s('titleRu') || s('titleUz') },
    genres: f.getAll('genres'),
    country: { uz: s('countryUz') || '—', ru: s('countryRu') || s('countryUz') || '—' },
    cast: s('cast') ? s('cast').split(',').map(x => x.trim()).filter(Boolean) : [],
    desc: { uz: s('descUz'), ru: s('descRu') || s('descUz') },
    colors: old.colors || ['#2a3142', '#0d1018'],
    poster: s('posterUrl'),
    trailer: s('trailer'),
    video: s('video'),
    featured: f.get('featured') === 'on',
    addedAt: old.addedAt || Date.now()
  };
  // ixtiyoriy maydonlar: bo'sh qoldirilsa o'chiriladi
  ['year', 'duration', 'rating', 'director', 'franchise', 'audio', 'source'].forEach(k => delete m[k]);
  if (num('year')) m.year = Math.round(num('year'));
  if (num('duration')) m.duration = Math.round(num('duration'));
  if (num('rating') !== undefined && s('rating')) m.rating = num('rating');
  if (s('director')) m.director = s('director');
  if (s('franchise')) m.franchise = s('franchise');
  if (f.get('audioUz') === 'on') m.audio = 'uz';
  if (s('sourceName')) m.source = { name: s('sourceName'), url: s('sourceUrl') };
  if (old.seasons && !m.duration) m.seasons = old.seasons;
  if (!m.genres.length) m.genres = ['drama'];
  return m;
}

function bindForm(old) {
  const form = $('#admForm');
  const err = $('#admErr');
  const showErr = msg => { err.textContent = msg; err.hidden = !msg; };

  const prev = $('#admPosterPrev');
  const cancel = () => { editingId = null; renderMain(); };
  $('#admCancel')?.addEventListener('click', cancel);
  form.querySelector('[data-cancel]')?.addEventListener('click', cancel);
  form.titleUz.addEventListener('input', () => { $('#admHeadTitle').textContent = form.titleUz.value.trim() || 'Nomsiz kino'; });
  const setHeroImg = src => {
    prev.innerHTML = `<img src="${esc(src)}" alt="" onerror="this.remove()">`;
    const bg = form.querySelector('.adm-hero-bg');
    if (bg) bg.style.backgroundImage = `url('${src}')`;
  };

  // poster oldindan ko'rish
  form.posterFile.addEventListener('change', () => {
    const file = form.posterFile.files[0];
    if (!file) return;
    setHeroImg(URL.createObjectURL(file));
    $('#admFileName').textContent = file.name;
  });
  form.posterUrl.addEventListener('change', () => {
    if (form.posterUrl.value.trim()) setHeroImg(form.posterUrl.value.trim());
  });

  // havolani tekshirish
  const hint = $('#admVideoHint');
  [form.video, form.trailer].forEach(inp => inp.addEventListener('input', () => {
    const res = [checkVideoUrl(form.video.value.trim()), checkVideoUrl(form.trailer.value.trim())].find(r => !r.ok || r.warn);
    hint.hidden = !res;
    if (res) { hint.textContent = res.msg || res.warn; hint.classList.toggle('is-error', !res.ok); }
  }));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    showErr('');
    if (!form.titleUz.value.trim()) return showErr('Kino nomini yozing');
    if (!form.rights.checked) return showErr('Ko‘rsatish huquqingizni tasdiqlang');
    for (const inp of [form.video, form.trailer]) {
      const r = checkVideoUrl(inp.value.trim());
      if (!r.ok) return showErr(r.msg);
    }
    // poster va manba: nisbiy yo'l ham bo'lishi mumkin, faqat taqiqlangan xostlar tekshiriladi
    for (const inp of [form.posterUrl, form.sourceUrl]) {
      if (BLOCKED_HOSTS.test(inp.value)) return showErr('Bu xostdagi kontent ruxsatsiz tarqatiladi — qabul qilinmaydi.');
    }
    if (!form.video.value.trim() && !form.trailer.value.trim()) return showErr('Kino yoki treyler havolasini kiriting');

    const btn = $('#admSubmit');
    btn.disabled = true;
    btn.textContent = 'Saqlanmoqda...';
    try {
      const movie = readForm(form, old);
      const file = form.posterFile.files[0];
      if (file) movie.poster = await uploadPoster(file, `${movie.slug}-${movie.id}`);

      await saveCustom(list => {
        const i = list.findIndex(x => x.id === movie.id);
        if (i > -1) list[i] = movie; else list.unshift(movie);
        return list;
      }, `${old.id ? 'Kino tahrirlandi' : 'Kino qo‘shildi'}: ${movie.title.uz}`);

      toast(`Saqlandi. Saytda 1–2 daqiqada ko‘rinadi.`);
      editingId = null;
      renderMain();
    } catch (ex) {
      console.warn(ex);
      showErr(ex.status === 401 ? 'Token yaroqsiz yoki muddati tugagan' : ex.message);
      btn.disabled = false;
      btn.textContent = old.id ? 'O‘zgarishlarni saqlash' : 'Kino qo‘shish';
    }
  });
}

/* ---------- Ro'yxat ---------- */

let listTab = 'custom';   // 'custom' — qo'shilganlar, 'all' — saytdagi barcha kinolar
let listQuery = '';

function itemHTML(m) {
  const base = isBase(m.id);
  const edited = base && customList.some(x => x.id === m.id);
  const hidden = hiddenList.includes(m.id);
  const tags = [
    m.year, typeName(m.type), m.video ? 'To‘liq kino' : 'Treyler', `ID ${m.id}`,
    edited ? '✏️ tahrirlangan' : '', hidden ? '🚫 yashirilgan' : ''
  ].filter(Boolean);
  return `
    <div class="acc-item adm-item${hidden ? ' is-hidden' : ''}">
      <span class="adm-thumb">${m.poster ? `<img src="${esc(m.poster)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</span>
      <div class="acc-item-main">
        <b>${esc(m.title?.uz || '')}</b>
        <small>${tags.map(esc).join(' · ')}</small>
      </div>
      <div class="adm-actions">
        <a class="btn btn-ghost btn-sm" href="${SITE_URL}movie.html?id=${m.id}" target="_blank" rel="noopener">Ko‘rish</a>
        <button class="btn btn-ghost btn-sm" type="button" data-edit="${m.id}">Tahrirlash</button>
        ${base
          ? `${edited ? `<button class="btn btn-ghost btn-sm" type="button" data-restore="${m.id}">Asliga qaytarish</button>` : ''}
             <button class="btn btn-ghost btn-sm${hidden ? '' : ' adm-del'}" type="button" data-hide="${m.id}">${hidden ? 'Saytda ko‘rsatish' : 'Yashirish'}</button>`
          : `<button class="btn btn-ghost btn-sm adm-del" type="button" data-del="${m.id}">O‘chirish</button>`}
      </div>
    </div>`;
}

function listItems() {
  let items;
  if (listTab === 'custom') {
    items = customList.filter(m => !isBase(m.id));
  } else {
    items = [...baseMovies().map(m => currentMovie(m.id)), ...customList.filter(m => !isBase(m.id))];
  }
  const q = norm(listQuery);
  if (q) items = items.filter(m => norm(`${m.title?.uz} ${m.title?.ru} ${m.year || ''} ${m.id}`).includes(q));
  return items;
}

function listHTML() {
  const items = listItems();
  if (!items.length) {
    return listTab === 'custom' && !listQuery
      ? `<div class="acc-empty"><b>Hali kino qo‘shilmagan</b><p>Formani to‘ldirib birinchi kinoni qo‘shing yoki «Saytdagi barcha kinolar» dan mavjudini tahrirlang.</p></div>`
      : `<div class="acc-empty"><b>Hech narsa topilmadi</b></div>`;
  }
  return `<div class="acc-list">${items.map(itemHTML).join('')}</div>`;
}

function renderList() {
  const box = document.getElementById('admListBox');
  if (!box) return;
  box.innerHTML = listHTML();
  document.querySelectorAll('.adm-tabs [data-tab]').forEach(b => b.classList.toggle('is-active', b.dataset.tab === listTab));
  bindList();
}

function renderMain() {
  const editing = editingId !== null ? currentMovie(editingId) : null;
  const ownCount = customList.filter(m => !isBase(m.id)).length;
  $('#admin').innerHTML = `
    <div class="adm-top">
      <h1>Admin — kinolar</h1>
      <div class="adm-top-actions">
        <span class="acc-muted">${ownCount} ta qo‘shilgan · ${baseMovies().length} ta asl</span>
        <button class="btn btn-ghost btn-sm" type="button" id="admLogout">Tokenni o‘chirish</button>
      </div>
    </div>
    <div class="adm-layout">
      ${formHTML(editing || {})}
      <section class="adm-list">
        <div class="mt-tabs adm-tabs">
          <button type="button" data-tab="custom" class="${listTab === 'custom' ? 'is-active' : ''}">Qo‘shilganlar</button>
          <button type="button" data-tab="all" class="${listTab === 'all' ? 'is-active' : ''}">Saytdagi barcha kinolar</button>
        </div>
        <input class="acc-input adm-search" id="admSearch" type="search" placeholder="Nomi, yili yoki ID bo‘yicha qidirish" value="${esc(listQuery)}">
        <div id="admListBox">${listHTML()}</div>
      </section>
    </div>`;

  bindForm(editing || {});

  $('#admLogout').addEventListener('click', () => {
    if (!confirm('Token shu brauzerdan o‘chirilsinmi?')) return;
    localStorage.removeItem(TOKEN_KEY);
    renderTokenScreen();
  });

  document.querySelectorAll('.adm-tabs [data-tab]').forEach(b => b.addEventListener('click', () => {
    listTab = b.dataset.tab;
    renderList();
  }));
  let t0;
  $('#admSearch').addEventListener('input', e => {
    clearTimeout(t0);
    t0 = setTimeout(() => { listQuery = e.target.value; renderList(); }, 150);
  });

  bindList();
}

async function runAction(btn, fn, okMsg) {
  btn.disabled = true;
  try {
    await fn();
    toast(okMsg);
    renderMain();
  } catch (ex) {
    toast(ex.status === 401 ? 'Token yaroqsiz yoki muddati tugagan' : ex.message, true);
    btn.disabled = false;
  }
}

function bindList() {
  document.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => {
    editingId = +b.dataset.edit;
    renderMain();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }));

  // o'zimiz qo'shgan kinoni butunlay o'chirish
  document.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
    const id = +b.dataset.del;
    const m = customList.find(x => x.id === id);
    if (!m || !confirm(`«${m.title.uz}» o‘chirilsinmi?`)) return;
    runAction(b, async () => {
      await saveCustom(list => list.filter(x => x.id !== id), `Kino o‘chirildi: ${m.title.uz}`);
      if (m.poster && m.poster.startsWith(SITE_URL + 'images/custom/')) {
        const path = m.poster.slice(SITE_URL.length);
        const f = await getFile(path);
        if (f) await gh(`/contents/${path}`, { method: 'DELETE', body: JSON.stringify({ message: `Poster o‘chirildi: ${m.slug}`, sha: f.sha, branch: GH.branch }) });
      }
    }, 'O‘chirildi');
  }));

  // saytdagi asl kinoni yashirish / qayta ko'rsatish
  document.querySelectorAll('[data-hide]').forEach(b => b.addEventListener('click', () => {
    const id = +b.dataset.hide;
    const m = currentMovie(id);
    const hide = !hiddenList.includes(id);
    if (hide && !confirm(`«${m.title.uz}» saytdan yashirilsinmi? (Keyin qayta ko‘rsatish mumkin)`)) return;
    runAction(b, () => saveCustom((list, hidden) => {
      const i = hidden.indexOf(id);
      if (hide && i === -1) hidden.push(id);
      if (!hide && i > -1) hidden.splice(i, 1);
      return list;
    }, `${hide ? 'Yashirildi' : 'Qayta ko‘rsatildi'}: ${m.title.uz}`), hide ? 'Saytdan yashirildi' : 'Saytda qayta ko‘rsatiladi');
  }));

  // tahrirlangan asl kinoni data.js dagi holatiga qaytarish
  document.querySelectorAll('[data-restore]').forEach(b => b.addEventListener('click', () => {
    const id = +b.dataset.restore;
    const m = currentMovie(id);
    if (!confirm(`«${m.title.uz}» asl holatiga qaytarilsinmi? Qilingan o‘zgarishlar o‘chadi.`)) return;
    runAction(b, () => saveCustom(list => list.filter(x => x.id !== id), `Asliga qaytarildi: ${m.title.uz}`), 'Asl holatiga qaytarildi');
  }));
}

/* ---------- Ishga tushirish ---------- */

async function boot() {
  if (!token()) return renderTokenScreen();
  $('#admin').innerHTML = '<div class="mt-loading"><i></i><i></i><i></i></div>';
  try {
    await loadCustom();
    renderMain();
  } catch (e) {
    if (e.status === 401 || e.status === 403) {
      localStorage.removeItem(TOKEN_KEY);
      return renderTokenScreen('Token yaroqsiz yoki ruxsati yetarli emas');
    }
    $('#admin').innerHTML = `<p class="acc-error">Yuklab bo‘lmadi: ${esc(e.message)}</p>`;
  }
}

initLayout();
boot();
