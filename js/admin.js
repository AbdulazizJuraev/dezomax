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

/* GitHub xatolarini tushunarli o'zbekcha matnga aylantirish */
function friendlyError(ex) {
  const s = ex?.status;
  if (s === 401) return 'Token yaroqsiz yoki muddati tugagan. Yangi token kiriting.';
  if (s === 403) return 'Tokenga yozish ruxsati yo‘q (403). GitHub → token → Edit → Permissions → Contents: «Read and write».';
  if (s === 404) return 'Token bu repoga yoza olmaydi (404). GitHub → token → Edit → Repository access → «Only select repositories» → dezomax, Permissions → Contents: «Read and write» → Update.';
  if (s === 409 || s === 422) return 'Fayl boshqa joyda o‘zgargan. Sahifani yangilab, qayta urinib ko‘ring.';
  return ex?.message || 'Noma’lum xato';
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
          ${field('Bo‘lim', `<select class="acc-input" name="franchise">${[['', 'Yo‘q'], ['uzbek', 'O‘zbek kino'], ['konsert', 'Konsert'], ['marvel', 'Marvel'], ['dc', 'DC']].map(([v, l]) => `<option value="${v}"${(m.franchise || '') === v ? ' selected' : ''}>${l}</option>`).join('')}</select>`)}
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
        <details class="adm-more-q"${(m.videos || []).length ? ' open' : ''}>
          <summary>Qo‘shimcha sifatlar (.mp4 uchun)</summary>
          <p class="acc-muted adm-more-q-hint">Bir kinoning turli sifatdagi fayllari bo‘lsa, havolalarini kiriting — pleyerda sifat tanlash chiqadi. «.m3u8» oqimda sifatlar avtomatik aniqlanadi.</p>
          <div class="adm-row adm-row-2">
            ${['1080p', '720p', '480p', '360p'].map(q => field(q, `<input class="acc-input" name="q_${q}" value="${val((m.videos || []).find(v => v.label === q)?.url)}" placeholder="https://...${q}.mp4">`)).join('')}
          </div>
        </details>
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
    addedAt: old.addedAt || Date.now(),
    updatedAt: Date.now()
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
  // qo'shimcha sifatlar (.mp4): pleyerda sifat tanlash uchun
  const videos = ['1080p', '720p', '480p', '360p'].map(label => ({ label, url: s('q_' + label) })).filter(v => v.url);
  if (videos.length) m.videos = videos; else delete m.videos;
  if (!m.genres.length) m.genres = ['drama'];
  return m;
}

function bindForm(old) {
  const form = $('#admForm');
  const err = $('#admErr');
  const showErr = msg => { err.textContent = msg; err.hidden = !msg; };

  const prev = $('#admPosterPrev');
  const cancel = () => go(editingId !== null ? 'list' : 'home');
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
    for (const inp of [form.video, form.trailer, ...['1080p', '720p', '480p', '360p'].map(q => form['q_' + q])]) {
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
      commitsCache = null;
      go('home');
    } catch (ex) {
      console.warn(ex);
      showErr(friendlyError(ex));
      btn.disabled = false;
      btn.textContent = old.id ? 'O‘zgarishlarni saqlash' : 'Kino qo‘shish';
    }
  });
}

/* ---------- Ko'rinishlar: Bosh sahifa · Kinolar · Qo'shish/Tahrirlash ---------- */

let view = 'home';          // 'home' | 'list' | 'form'
let listFilter = 'all';     // 'all' | 'added' | 'edited' | 'hidden'
let listQuery = '';
let commitsCache = null;    // oxirgi o'zgarishlar (GitHub commit tarixi)

const NAV_ICONS = {
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3.5l9 7"/><path d="M5.5 9.5V20h13V9.5"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="16" rx="2.5"/><path d="M7 4v16M17 4v16M2.5 12h19"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.6C3.8 8.3 2 12 2 12s4 7 10 7a9.6 9.6 0 0 0 4.4-1"/></svg>',
  uz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>'
};

const addedList = () => customList.filter(m => !isBase(m.id));
const editedList = () => customList.filter(m => isBase(m.id));
const allMovies = () => [...baseMovies().map(m => currentMovie(m.id)), ...addedList()];

function go(v) {
  view = v;
  if (v !== 'form') editingId = null;
  renderMain();
  window.scrollTo({ top: 0 });
}

function timeAgo(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso)) / 1000);
  if (s < 60) return 'hozirgina';
  if (s < 3600) return `${Math.floor(s / 60)} daq. oldin`;
  if (s < 86400) return `${Math.floor(s / 3600)} soat oldin`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)} kun oldin`;
  const d = new Date(iso), p = n => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/* ---------- Umumiy qobiq ---------- */

function renderMain() {
  $('#admin').innerHTML = `
    <div class="adm-top">
      <div>
        <h1>DezoMax Admin</h1>
        <span class="acc-muted">Kinolarni boshqarish paneli</span>
      </div>
      <button class="btn btn-ghost btn-sm" type="button" id="admLogout">Chiqish</button>
    </div>
    <nav class="adm-nav">
      <button type="button" data-view="home" class="${view === 'home' ? 'is-active' : ''}">${NAV_ICONS.home}<span>Bosh sahifa</span></button>
      <button type="button" data-view="list" class="${view === 'list' ? 'is-active' : ''}">${NAV_ICONS.list}<span>Kinolar</span></button>
      <button type="button" data-view="form" class="${view === 'form' && !editingId ? 'is-active' : ''}">${NAV_ICONS.plus}<span>Qo‘shish</span></button>
      <button type="button" data-view="site" class="${view === 'site' ? 'is-active' : ''}">${NAV_ICONS.gear}<span>Sayt</span></button>
      <button type="button" data-view="notify" class="${view === 'notify' ? 'is-active' : ''}">${NAV_ICONS.bell}<span>Xabar</span></button>
    </nav>
    <div id="admView"></div>`;

  $('#admLogout').addEventListener('click', () => {
    if (!confirm('Token shu qurilmadan o‘chirilsinmi?')) return;
    localStorage.removeItem(TOKEN_KEY);
    renderTokenScreen();
  });
  document.querySelectorAll('.adm-nav [data-view]').forEach(b => b.addEventListener('click', () => go(b.dataset.view)));

  if (view === 'home') renderHome();
  else if (view === 'list') renderListView();
  else if (view === 'site') renderSiteView();
  else if (view === 'notify') renderNotifyView();
  else renderFormView();
}

/* ---------- Bosh sahifa ---------- */

function renderHome() {
  const all = allMovies();
  const visible = all.filter(m => !hiddenList.includes(m.id));
  const stats = [
    ['film', 'Saytdagi kinolar', visible.length, 'all'],
    ['plus', 'Qo‘shilgan', addedList().length, 'added'],
    ['edit', 'Tahrirlangan', editedList().length, 'edited'],
    ['eyeOff', 'Yashirilgan', hiddenList.length, 'hidden']
  ];
  const fullUz = visible.filter(m => m.video && (m.audio === 'uz' || m.franchise === 'uzbek')).length;
  const recent = [...customList].sort((a, b) => (b.updatedAt || b.addedAt || 0) - (a.updatedAt || a.addedAt || 0)).slice(0, 6);

  $('#admView').innerHTML = `
    <div class="adm-stats">
      ${stats.map(([ic, label, n, filter]) => `
        <button class="adm-stat" type="button" data-stat="${filter}">
          <span class="adm-stat-icon">${NAV_ICONS[ic]}</span>
          <b>${n}</b><small>${label}</small>
        </button>`).join('')}
    </div>

    <div class="adm-quick">
      <button class="btn btn-primary" type="button" data-go="form">${NAV_ICONS.plus}<span>Yangi kino qo‘shish</span></button>
      <a class="btn btn-ghost" href="${SITE_URL}" target="_blank" rel="noopener">${NAV_ICONS.link}<span>Saytni ochish</span></a>
    </div>
    <p class="acc-muted adm-note">${NAV_ICONS.uz}<span>O‘zbek tilidagi to‘liq filmlar: <b>${fullUz}</b> ta</span></p>

    <section class="adm-sec">
      <div class="adm-sec-head">
        <span class="adm-sec-icon">${NAV_ICONS.list}</span><h3>Kinolar ro‘yxati</h3>
        <button class="acc-link adm-more" type="button" data-go="list">Hammasi (${all.length}) →</button>
      </div>
      ${recent.length
        ? `<div class="acc-list">${recent.map(itemHTML).join('')}</div>`
        : `<div class="adm-mini-list">${all.slice(0, 6).map(itemHTML).join('')}</div>`}
    </section>

    <section class="adm-sec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.clock}</span><h3>Oxirgi o‘zgarishlar</h3></div>
      <div id="admCommits"><div class="mt-loading"><i></i><i></i><i></i></div></div>
    </section>`;

  document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));
  document.querySelectorAll('[data-stat]').forEach(b => b.addEventListener('click', () => { listFilter = b.dataset.stat; listQuery = ''; go('list'); }));
  bindList();
  loadCommits();
}

async function loadCommits(force = false) {
  const box = document.getElementById('admCommits');
  if (!box) return;
  try {
    if (!commitsCache || force) {
      const [a1, a2] = await Promise.all([
        gh(`/commits?path=${encodeURIComponent(DATA_PATH)}&sha=${GH.branch}&per_page=15&t=${Date.now()}`),
        gh(`/commits?path=${encodeURIComponent('js/site-config.js')}&sha=${GH.branch}&per_page=10&t=${Date.now()}`).catch(() => [])
      ]);
      commitsCache = [...a1, ...a2].sort((x, y) => new Date(y.commit.author.date) - new Date(x.commit.author.date)).slice(0, 15);
    }
    const list = commitsCache.filter(c => !/^Admin sahifa|README/i.test(c.commit.message));
    if (!list.length) { box.innerHTML = '<p class="acc-muted">Hali o‘zgarish yo‘q</p>'; return; }
    box.innerHTML = `<div class="adm-commits">${list.map(c => {
      const msg = c.commit.message.split('\n')[0];
      const kind = /qo‘shildi/i.test(msg) ? 'is-add' : /o‘chirildi/i.test(msg) ? 'is-del' : /yashirildi/i.test(msg) ? 'is-hide' : 'is-edit';
      return `
        <a class="adm-commit ${kind}" href="${esc(c.html_url)}" target="_blank" rel="noopener">
          <i></i>
          <span class="adm-commit-main"><b>${esc(msg)}</b><small>${esc(c.commit.author?.name || '')} · ${timeAgo(c.commit.author?.date)}</small></span>
        </a>`;
    }).join('')}</div>`;
  } catch (e) {
    box.innerHTML = `<p class="acc-muted">Tarixni yuklab bo‘lmadi: ${esc(e.message)}</p>`;
  }
}

/* ---------- Kinolar ro'yxati ---------- */

function itemHTML(m) {
  const base = isBase(m.id);
  const edited = base && customList.some(x => x.id === m.id);
  const hidden = hiddenList.includes(m.id);
  const tags = [
    m.year, typeName(m.type), m.video ? 'To‘liq kino' : 'Treyler', `ID ${m.id}`
  ].filter(Boolean);
  const state = hidden ? '<span class="adm-state is-hide">Yashirilgan</span>'
    : !base ? '<span class="adm-state is-add">Qo‘shilgan</span>'
    : edited ? '<span class="adm-state is-edit">Tahrirlangan</span>' : '';
  return `
    <div class="acc-item adm-item${hidden ? ' is-hidden' : ''}">
      <span class="adm-thumb">${m.poster ? `<img src="${esc(m.poster)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</span>
      <div class="acc-item-main">
        <b>${esc(m.title?.uz || '')} ${state}</b>
        <small>${tags.map(esc).join(' · ')}</small>
      </div>
      <div class="adm-actions">
        <button class="btn btn-ghost btn-sm" type="button" data-edit="${m.id}">Tahrirlash</button>
        <a class="btn btn-ghost btn-sm" href="${SITE_URL}movie.html?id=${m.id}" target="_blank" rel="noopener">Ko‘rish</a>
        ${base
          ? `${edited ? `<button class="btn btn-ghost btn-sm" type="button" data-restore="${m.id}">Asliga qaytarish</button>` : ''}
             <button class="btn btn-ghost btn-sm${hidden ? '' : ' adm-del'}" type="button" data-hide="${m.id}">${hidden ? 'Ko‘rsatish' : 'Yashirish'}</button>`
          : `<button class="btn btn-ghost btn-sm adm-del" type="button" data-del="${m.id}">O‘chirish</button>`}
      </div>
    </div>`;
}

function listItems() {
  let items = allMovies();
  if (listFilter === 'added') items = addedList();
  if (listFilter === 'edited') items = editedList();
  if (listFilter === 'hidden') items = items.filter(m => hiddenList.includes(m.id));
  const q = norm(listQuery);
  if (q) items = items.filter(m => norm(`${m.title?.uz} ${m.title?.ru} ${m.year || ''} ${m.id}`).includes(q));
  return items;
}

function renderListView() {
  const counts = { all: allMovies().length, added: addedList().length, edited: editedList().length, hidden: hiddenList.length };
  $('#admView').innerHTML = `
    <div class="adm-filters">
      ${[['all', 'Hammasi'], ['added', 'Qo‘shilgan'], ['edited', 'Tahrirlangan'], ['hidden', 'Yashirilgan']].map(([id, l]) =>
        `<button type="button" data-filter="${id}" class="${listFilter === id ? 'is-active' : ''}">${l} <small>${counts[id]}</small></button>`).join('')}
    </div>
    <input class="acc-input adm-search" id="admSearch" type="search" placeholder="Nomi, yili yoki ID bo‘yicha qidirish" value="${esc(listQuery)}">
    <div id="admListBox"></div>`;

  // kinolar 1000+ — ro'yxat 60 tadan chiziladi
  let limit = 60;
  const fill = () => {
    const items = listItems();
    const shown = items.slice(0, limit);
    $('#admListBox').innerHTML = items.length
      ? `<p class="acc-muted adm-count">${items.length} ta kino</p><div class="acc-list">${shown.map(itemHTML).join('')}</div>
         ${items.length > limit ? `<button class="btn btn-ghost adm-more" type="button" id="admMore">Yana ko‘rsatish (${items.length - limit})</button>` : ''}`
      : `<div class="acc-empty"><b>Hech narsa topilmadi</b></div>`;
    $('#admMore')?.addEventListener('click', () => { limit += 60; const y = window.scrollY; fill(); window.scrollTo(0, y); });
    bindList();
  };

  document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => {
    listFilter = b.dataset.filter; limit = 60;
    document.querySelectorAll('[data-filter]').forEach(x => x.classList.toggle('is-active', x === b));
    fill();
  }));
  let t0;
  $('#admSearch').addEventListener('input', e => {
    clearTimeout(t0);
    t0 = setTimeout(() => { listQuery = e.target.value; limit = 60; fill(); }, 150);
  });
  fill();
}

/* ---------- Forma ---------- */

function renderFormView() {
  const editing = editingId !== null ? currentMovie(editingId) : null;
  $('#admView').innerHTML = formHTML(editing || {});
  bindForm(editing || {});
}

async function runAction(btn, fn, okMsg) {
  btn.disabled = true;
  try {
    await fn();
    commitsCache = null;
    toast(okMsg);
    renderMain();
  } catch (ex) {
    toast(friendlyError(ex), true);
    btn.disabled = false;
  }
}

function bindList() {
  document.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => {
    editingId = +b.dataset.edit;
    view = 'form';
    renderMain();
    window.scrollTo({ top: 0 });
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

/* ---------- «Sayt» bo'limi: bosh sahifa slayderi va qatorlari ---------- */

const CONFIG_PATH = 'js/site-config.js';
const ROW_SOURCE_NAMES = {
  uzbek: 'O‘zbek kinolari (avtomatik)', konsert: 'Konsertlar (avtomatik)', trending: 'Trendda (avtomatik)', new: 'Yangi qo‘shilganlar (avtomatik)',
  marvel: 'Marvel (avtomatik)', dc: 'DC (avtomatik)', top: 'Eng yuqori reyting (avtomatik)',
  series: 'Seriallar (avtomatik)', cartoons: 'Multfilmlar (avtomatik)', custom: 'Qo‘lda tanlangan kinolar'
};
const ROW_DEFAULT_TITLES = {
  uzbek: 'row.uzbek', konsert: 'row.konsert', trending: 'row.trending', new: 'row.new', marvel: 'row.marvel', dc: 'row.dc',
  top: 'row.top', series: 'row.series', cartoons: 'row.cartoons'
};

let siteDraft = null;     // tahrirlanayotgan sozlama
let configSha = null;

function defaultConfig() {
  const heroIds = MOVIES.filter(m => m.featured)
    .sort((a, b) => (watchStatus(a) === 'uz' ? 0 : 1) - (watchStatus(b) === 'uz' ? 0 : 1))
    .slice(0, 10).map(m => m.id);
  return {
    hero: { ids: heroIds, delay: 7 },
    rows: Object.keys(ROW_DEFAULT_TITLES).map(source => ({ source, visible: true, title: { uz: '', ru: '' } }))
  };
}

async function loadConfig() {
  const f = await getFile(CONFIG_PATH);
  configSha = f?.sha || null;
  let cfg = null;
  if (f) {
    const m = b64decode(f.content).match(/\/\*CONFIG\*\/([\s\S]*?)\/\*ENDCONFIG\*\//);
    cfg = m ? JSON.parse(m[1]) : null;
  }
  const def = defaultConfig();
  siteDraft = {
    hero: { ids: cfg?.hero?.ids?.length ? cfg.hero.ids : def.hero.ids, delay: Math.min(60, Math.max(3, +cfg?.hero?.delay || 7)) },
    rows: cfg?.rows?.length ? cfg.rows.map(r => ({ title: { uz: '', ru: '' }, visible: true, ...r })) : def.rows
  };
}

function buildConfigFile(cfg) {
  return `/* ============================================================
   DezoMax — bosh sahifa sozlamalari (admin → «Sayt» bo'limi yozadi)
   null — standart holat (js/app.js dagi DEFAULT_ROWS va featured kinolar)
   ============================================================ */

const SITE_CONFIG = /*CONFIG*/${cfg ? JSON.stringify(cfg, null, 2) : 'null'}/*ENDCONFIG*/;
`;
}

async function saveConfig(cfg, message) {
  const existing = await getFile(CONFIG_PATH);
  const res = await putFile(CONFIG_PATH, b64encode(buildConfigFile(cfg)), message, existing?.sha);
  configSha = res.content.sha;
}

const movieById = id => allMovies().find(m => m.id === id);

/* Kino tanlagich: tanlanganlar (tartiblash, o'chirish) + qidirib qo'shish */
function pickerHTML(key, ids, max) {
  return `
    <div class="adm-picker" data-picker="${key}">
      <div class="adm-picked">
        ${ids.length ? ids.map((id, i) => {
          const m = movieById(id);
          if (!m) return '';
          return `
            <div class="adm-pick">
              <span class="adm-pick-n">${i + 1}</span>
              <span class="adm-thumb">${m.poster ? `<img src="${esc(m.poster)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</span>
              <span class="adm-pick-title"><b>${esc(m.title.uz)}</b><small>${[m.year, typeName(m.type)].filter(Boolean).join(' · ')}</small></span>
              <span class="adm-pick-btns">
                <button type="button" data-move="-1" data-i="${i}" ${i === 0 ? 'disabled' : ''} aria-label="Yuqoriga">↑</button>
                <button type="button" data-move="1" data-i="${i}" ${i === ids.length - 1 ? 'disabled' : ''} aria-label="Pastga">↓</button>
                <button type="button" data-remove="${i}" class="adm-del" aria-label="Olib tashlash">✕</button>
              </span>
            </div>`;
        }).join('') : '<p class="acc-muted adm-empty-pick">Kino tanlanmagan</p>'}
      </div>
      ${ids.length < max ? `
        <div class="adm-pick-search">
          <input class="acc-input" type="search" placeholder="Kino qo‘shish — nomini yozing" data-search>
          <div class="adm-pick-results" data-results hidden></div>
        </div>` : `<p class="acc-muted">Eng ko‘pi ${max} ta</p>`}
    </div>`;
}

function bindPicker(root, getIds, setIds, rerender) {
  root.querySelectorAll('[data-move]').forEach(b => b.addEventListener('click', () => {
    const ids = [...getIds()], i = +b.dataset.i, j = i + +b.dataset.move;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    setIds(ids); rerender();
  }));
  root.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => {
    const ids = [...getIds()]; ids.splice(+b.dataset.remove, 1);
    setIds(ids); rerender();
  }));
  const input = root.querySelector('[data-search]');
  const results = root.querySelector('[data-results]');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = norm(input.value);
    if (!q) { results.hidden = true; return; }
    const found = allMovies().filter(m => !getIds().includes(m.id) && norm(`${m.title.uz} ${m.title.ru} ${m.year || ''}`).includes(q)).slice(0, 8);
    results.hidden = false;
    results.innerHTML = found.length ? found.map(m => `
      <button type="button" data-add="${m.id}">
        <span class="adm-thumb">${m.poster ? `<img src="${esc(m.poster)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</span>
        <span><b>${esc(m.title.uz)}</b><small>${[m.year, typeName(m.type)].filter(Boolean).join(' · ')}</small></span>
        <em>+</em>
      </button>`).join('') : '<p class="acc-muted">Topilmadi</p>';
    results.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => {
      setIds([...getIds(), +b.dataset.add]); rerender();
    }));
  });
}

const delayText = s => +s >= 60 ? '1 daqiqa' : `${+s} soniya`;

async function renderSiteView() {
  const box = $('#admView');
  if (!siteDraft) {
    box.innerHTML = '<div class="mt-loading"><i></i><i></i><i></i></div>';
    try { await loadConfig(); } catch (e) { box.innerHTML = `<p class="acc-error">${esc(friendlyError(e))}</p>`; return; }
  }
  const d = siteDraft;

  box.innerHTML = `
    <section class="adm-sec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.film}</span><h3>Katta slayder (karusel)</h3><small>${d.hero.ids.length} ta kino</small></div>
      <div class="adm-field">
        <label class="adm-label">Har bir treyler necha soniya ko‘rinsin: <b id="admDelayVal">${delayText(d.hero.delay)}</b></label>
        <div class="adm-seg" data-delay>
          ${[5, 7, 10, 15, 20, 30, 45, 60].map(s => `<button type="button" data-sec="${s}" class="${+d.hero.delay === s ? 'is-active' : ''}">${delayText(s)}</button>`).join('')}
        </div>
        <input class="adm-range" type="range" id="admDelay" min="3" max="60" step="1" value="${+d.hero.delay}" aria-label="Treyler davomiyligi (soniya)">
        <small class="acc-muted">3 soniyadan 1 daqiqagacha. Treyler undan qisqa bo‘lsa, tugashi bilan keyingi slaydga o‘tadi.</small>
      </div>
      <label class="adm-label">Slayderdagi kinolar (tartib bo‘yicha)</label>
      <div id="admHeroPicker">${pickerHTML('hero', d.hero.ids, 15)}</div>
    </section>

    <section class="adm-sec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.list}</span><h3>Bosh sahifa qatorlari</h3><small>${d.rows.filter(r => r.visible !== false).length} ta ko‘rinadi</small></div>
      <div class="adm-rows">
        ${d.rows.map((r, i) => `
          <div class="adm-rowcard${r.visible === false ? ' is-off' : ''}" data-row="${i}">
            <div class="adm-rowcard-head">
              <span class="adm-pick-n">${i + 1}</span>
              <b>${esc(r.title?.uz || (ROW_DEFAULT_TITLES[r.source] ? t(ROW_DEFAULT_TITLES[r.source]) : 'Yangi qator'))}</b>
              <span class="adm-pick-btns">
                <button type="button" data-row-move="-1" ${i === 0 ? 'disabled' : ''} aria-label="Yuqoriga">↑</button>
                <button type="button" data-row-move="1" ${i === d.rows.length - 1 ? 'disabled' : ''} aria-label="Pastga">↓</button>
                ${r.source === 'custom' ? '<button type="button" data-row-del class="adm-del" aria-label="O‘chirish">✕</button>' : ''}
              </span>
            </div>
            <small class="acc-muted">${ROW_SOURCE_NAMES[r.source] || r.source}</small>
            <div class="adm-row adm-row-2">
              <div class="adm-field"><label class="adm-label">Nomi (o‘zbekcha)</label><input class="acc-input" data-row-title="uz" value="${esc(r.title?.uz || '')}" placeholder="${esc(ROW_DEFAULT_TITLES[r.source] ? I18N.uz[ROW_DEFAULT_TITLES[r.source]] : 'Masalan: Tavsiya etamiz')}"></div>
              <div class="adm-field"><label class="adm-label">Nomi (ruscha)</label><input class="acc-input" data-row-title="ru" value="${esc(r.title?.ru || '')}" placeholder="${esc(ROW_DEFAULT_TITLES[r.source] ? I18N.ru[ROW_DEFAULT_TITLES[r.source]] : 'Рекомендуем')}"></div>
            </div>
            <label class="acc-toggle"><span><b>Saytda ko‘rsatish</b></span><input type="checkbox" data-row-visible${r.visible !== false ? ' checked' : ''}><i></i></label>
            ${r.source === 'custom' ? `<div data-row-picker>${pickerHTML('row' + i, r.ids || [], 30)}</div>` : ''}
          </div>`).join('')}
      </div>
      <button class="btn btn-ghost adm-addrow" type="button" id="admAddRow">${NAV_ICONS.plus}<span>Yangi qator qo‘shish</span></button>
    </section>

    <div class="adm-savebar">
      <p class="acc-error" id="siteErr" hidden></p>
      <div class="adm-savebar-row">
        <button class="btn btn-ghost" type="button" id="siteReset">Standart holat</button>
        <button class="btn btn-primary" type="button" id="siteSave">Saytga saqlash</button>
      </div>
    </div>`;

  const rerender = () => { const y = window.scrollY; renderSiteView().then(() => window.scrollTo(0, y)); };

  // slayder
  box.querySelectorAll('[data-sec]').forEach(b => b.addEventListener('click', () => { d.hero.delay = +b.dataset.sec; rerender(); }));
  $('#admDelay').addEventListener('input', e => {
    d.hero.delay = +e.target.value;
    $('#admDelayVal').textContent = delayText(d.hero.delay);
    box.querySelectorAll('[data-sec]').forEach(b => b.classList.toggle('is-active', +b.dataset.sec === d.hero.delay));
  });
  bindPicker($('#admHeroPicker'), () => d.hero.ids, ids => { d.hero.ids = ids; }, rerender);

  // qatorlar
  box.querySelectorAll('[data-row]').forEach(card => {
    const i = +card.dataset.row, r = d.rows[i];
    card.querySelectorAll('[data-row-title]').forEach(inp => inp.addEventListener('input', () => {
      r.title = { ...(r.title || {}), [inp.dataset.rowTitle]: inp.value };
    }));
    card.querySelector('[data-row-visible]').addEventListener('change', e => { r.visible = e.target.checked; card.classList.toggle('is-off', !r.visible); });
    card.querySelectorAll('[data-row-move]').forEach(b => b.addEventListener('click', () => {
      const j = i + +b.dataset.rowMove;
      [d.rows[i], d.rows[j]] = [d.rows[j], d.rows[i]];
      rerender();
    }));
    card.querySelector('[data-row-del]')?.addEventListener('click', () => {
      if (!confirm('Bu qator o‘chirilsinmi?')) return;
      d.rows.splice(i, 1); rerender();
    });
    const picker = card.querySelector('[data-row-picker]');
    if (picker) bindPicker(picker, () => r.ids || [], ids => { r.ids = ids; }, rerender);
  });
  $('#admAddRow').addEventListener('click', () => {
    d.rows.unshift({ source: 'custom', visible: true, title: { uz: '', ru: '' }, ids: [] });
    rerender();
  });

  // saqlash
  const err = $('#siteErr');
  $('#siteReset').addEventListener('click', async () => {
    if (!confirm('Bosh sahifa standart holatga qaytarilsinmi? (slayder va qatorlar)')) return;
    try {
      await saveConfig(null, 'Sayt sozlamalari standart holatga qaytarildi');
      siteDraft = null; commitsCache = null;
      toast('Standart holat tiklandi. Saytda 1–2 daqiqada ko‘rinadi.');
      renderSiteView();
    } catch (e) { err.textContent = friendlyError(e); err.hidden = false; }
  });
  $('#siteSave').addEventListener('click', async e => {
    const btn = e.currentTarget;
    const custom = d.rows.find(r => r.source === 'custom' && r.visible !== false && !(r.ids || []).length);
    if (custom) { err.textContent = 'Qo‘lda tanlanadigan qatorga kamida bitta kino qo‘shing yoki uni o‘chiring.'; err.hidden = false; return; }
    if (!d.hero.ids.length) { err.textContent = 'Slayderga kamida bitta kino qo‘shing.'; err.hidden = false; return; }
    err.hidden = true;
    btn.disabled = true; btn.textContent = 'Saqlanmoqda...';
    try {
      const clean = {
        hero: { ids: d.hero.ids, delay: d.hero.delay },
        rows: d.rows.map(r => {
          const o = { source: r.source, visible: r.visible !== false };
          if (r.title?.uz || r.title?.ru) o.title = { uz: r.title.uz || '', ru: r.title.ru || '' };
          if (r.source === 'custom') o.ids = r.ids || [];
          return o;
        })
      };
      await saveConfig(clean, 'Sayt sozlamalari o‘zgartirildi: slayder va qatorlar');
      commitsCache = null;
      toast('Saqlandi. Saytda 1–2 daqiqada ko‘rinadi.');
    } catch (ex) {
      err.textContent = friendlyError(ex); err.hidden = false;
    } finally {
      btn.disabled = false; btn.textContent = 'Saytga saqlash';
    }
  });
}

/* ---------- Bildirishnomalar (DezoMax ilovasiga) ----------
   Xabarlar data/notifications.json fayliga yoziladi. DezoMax ilovasi uni ochilganda va fonda
   ~15 daqiqada bir tekshiradi va telefon bildirishnomasi sifatida ko'rsatadi (vaqt belgilangan bo'lsa — o'sha vaqtda). */

const NOTIFY_PATH = 'data/notifications.json';
const NOTIFY_MAX = 30;
const NOTIFY_TEMPLATES = [
  { label: 'Yangi kino', title: 'Yangi kino qo‘shildi 🎬', body: '«Kino nomi» endi DezoMax’da. Hoziroq tomosha qiling!' },
  { label: 'Futbol', title: 'Bugun kechqurun futbol ⚽', body: 'Bugun soat 20:00 da katta o‘yin. Jonli efirni DezoMax’da ko‘ring!' },
  { label: 'Konsert', title: 'Yangi konsert 🎤', body: 'Yangi konsert dasturi qo‘shildi — kulgu kafolatlanadi!' },
];
let notifyDraft = { title: '', body: '', when: 'now', at: '', link: '' };

async function loadNotifications() {
  const f = await getFile(NOTIFY_PATH);
  if (!f) return { sha: null, items: [] };
  try { return { sha: f.sha, items: JSON.parse(b64decode(f.content)).items || [] }; }
  catch { return { sha: f.sha, items: [] }; }
}

async function saveNotifications(mutate, message) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const cur = await loadNotifications();
    const items = mutate(cur.items.slice()).slice(-NOTIFY_MAX);
    const text = JSON.stringify({ updated: new Date().toISOString(), items }, null, 2) + '\n';
    try { await putFile(NOTIFY_PATH, b64encode(text), message, cur.sha); return items; }
    catch (e) { if (e.status !== 409 || attempt) throw e; }
  }
}

function fmtDateTime(iso) {
  const d = new Date(iso), p = n => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

async function renderNotifyView() {
  const box = $('#admView');
  box.innerHTML = '<div class="mt-loading"><i></i><i></i><i></i></div>';
  let sent = [];
  try { sent = (await loadNotifications()).items; }
  catch (e) { box.innerHTML = `<p class="acc-error">${esc(friendlyError(e))}</p>`; return; }
  if (view !== 'notify') return;

  const d = notifyDraft;
  const movies = allMovies().filter(m => !hiddenList.includes(m.id)).sort((a, b) => (b.year || 0) - (a.year || 0));
  const now = Date.now();

  box.innerHTML = `
    <section class="adm-sec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.bell}</span><h3>Yangi bildirishnoma</h3><small>DezoMax ilovasiga</small></div>
      <div class="adm-field">
        <label class="adm-label">Tayyor shablonlar</label>
        <div class="adm-seg">${NOTIFY_TEMPLATES.map((tp, i) => `<button type="button" data-tpl="${i}">${esc(tp.label)}</button>`).join('')}</div>
      </div>
      <div class="adm-field">
        <label class="adm-label" for="nTitle">Sarlavha <span class="adm-req">*</span></label>
        <input class="acc-input" id="nTitle" maxlength="60" value="${esc(d.title)}" placeholder="Masalan: Bugun kechqurun futbol ⚽">
      </div>
      <div class="adm-field">
        <label class="adm-label" for="nBody">Matn <span class="adm-req">*</span></label>
        <textarea class="acc-input adm-textarea" id="nBody" rows="3" maxlength="240" placeholder="Masalan: Bugun soat 20:00 da Real — Barselona. Jonli efirni ko‘ring!">${esc(d.body)}</textarea>
      </div>
      <div class="adm-field">
        <label class="adm-label">Qachon kelsin</label>
        <div class="adm-seg" id="nWhen">
          <button type="button" data-when="now" class="${d.when === 'now' ? 'is-active' : ''}">Hozir</button>
          <button type="button" data-when="at" class="${d.when === 'at' ? 'is-active' : ''}">Vaqtini belgilash</button>
        </div>
        <input class="acc-input" id="nAt" type="datetime-local" value="${esc(d.at)}" ${d.when === 'at' ? '' : 'hidden'}>
      </div>
      <div class="adm-field">
        <label class="adm-label" for="nLink">Bosilganda nima ochilsin</label>
        <select class="acc-input" id="nLink">
          <option value="">Bosh sahifa</option>
          <option value="sport.html"${d.link === 'sport.html' ? ' selected' : ''}>Sport</option>
          <option value="tv.html"${d.link === 'tv.html' ? ' selected' : ''}>Telekanallar</option>
          <optgroup label="Kino sahifasi">
            ${movies.map(m => `<option value="movie.html?id=${m.id}"${d.link === `movie.html?id=${m.id}` ? ' selected' : ''}>${esc(m.title?.uz || '')}${m.year ? ` (${m.year})` : ''}</option>`).join('')}
          </optgroup>
        </select>
      </div>
      <div class="adm-notify-preview" aria-label="Telefonda ko‘rinishi">
        <span class="adm-notify-app">DezoMax · hozir</span>
        <b id="nPrevTitle">${esc(d.title || 'Sarlavha')}</b>
        <span id="nPrevBody">${esc(d.body || 'Bildirishnoma matni shu yerda ko‘rinadi')}</span>
      </div>
      <p class="acc-muted adm-notify-note">Ilova ochiq bo‘lsa — darhol, yopiq bo‘lsa — odatda 15–30 daqiqa ichida keladi. Belgilangan vaqtli xabar o‘sha vaqtda chiqadi (ilova undan oldin kamida bir marta tekshirgan bo‘lishi kerak).</p>
      <p class="acc-error" id="nErr" hidden></p>
      <button class="btn btn-primary" type="button" id="nSend">${NAV_ICONS.bell}<span>Yuborish</span></button>
    </section>

    <section class="adm-sec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.clock}</span><h3>Yuborilganlar</h3><small>${sent.length} ta</small></div>
      ${sent.length ? `<div class="adm-notify-list">${sent.slice().reverse().map(n => {
        const at = n.at ? Date.parse(n.at) : 0;
        const pending = at && at > now;
        return `
        <div class="adm-notify-item">
          <div class="adm-notify-text">
            <b>${esc(n.title)}</b>
            <span>${esc(n.body)}</span>
            <small class="acc-muted">${pending ? `⏰ ${fmtDateTime(n.at)} da chiqadi` : `Yuborildi: ${timeAgo(n.created)}`}${n.url ? ` · ${esc(n.url)}` : ''}</small>
          </div>
          <button type="button" class="adm-del" data-ndel="${esc(n.id)}" aria-label="O‘chirish">✕</button>
        </div>`;
      }).join('')}</div>` : '<p class="acc-muted">Hali bildirishnoma yuborilmagan.</p>'}
    </section>`;

  const title = $('#nTitle'), body = $('#nBody'), at = $('#nAt'), link = $('#nLink'), err = $('#nErr');
  const syncPreview = () => {
    d.title = title.value; d.body = body.value; d.at = at.value; d.link = link.value;
    $('#nPrevTitle').textContent = d.title || 'Sarlavha';
    $('#nPrevBody').textContent = d.body || 'Bildirishnoma matni shu yerda ko‘rinadi';
  };
  [title, body, at].forEach(el => el.addEventListener('input', syncPreview));
  link.addEventListener('change', syncPreview);
  box.querySelectorAll('[data-tpl]').forEach(b => b.addEventListener('click', () => {
    const tp = NOTIFY_TEMPLATES[+b.dataset.tpl];
    title.value = tp.title; body.value = tp.body; syncPreview();
  }));
  box.querySelectorAll('[data-when]').forEach(b => b.addEventListener('click', () => {
    d.when = b.dataset.when;
    box.querySelectorAll('[data-when]').forEach(x => x.classList.toggle('is-active', x === b));
    at.hidden = d.when !== 'at';
    if (d.when === 'at' && !at.value) {
      const t0 = new Date(Date.now() + 3600e3), p = n => String(n).padStart(2, '0');
      at.value = `${t0.getFullYear()}-${p(t0.getMonth() + 1)}-${p(t0.getDate())}T${p(t0.getHours())}:00`;
      syncPreview();
    }
  }));

  $('#nSend').addEventListener('click', async e => {
    const btn = e.currentTarget;
    syncPreview();
    if (!d.title.trim() || !d.body.trim()) { err.textContent = 'Sarlavha va matnni yozing.'; err.hidden = false; return; }
    let atIso = null;
    if (d.when === 'at') {
      const t0 = new Date(d.at);
      if (!d.at || isNaN(t0)) { err.textContent = 'Vaqtini tanlang.'; err.hidden = false; return; }
      if (t0.getTime() < Date.now() - 60e3) { err.textContent = 'Belgilangan vaqt o‘tib ketgan — kelajak vaqtni tanlang.'; err.hidden = false; return; }
      atIso = t0.toISOString();
    }
    if (!confirm(`«${d.title}» bildirishnomasi DezoMax ilovasi foydalanuvchilariga yuborilsinmi?`)) return;
    err.hidden = true;
    btn.disabled = true;
    try {
      const item = {
        id: 'n' + Date.now().toString(36),
        title: d.title.trim(),
        body: d.body.trim(),
        at: atIso,
        url: d.link || '',
        created: new Date().toISOString()
      };
      await saveNotifications(items => [...items, item], `Bildirishnoma: ${item.title}`);
      commitsCache = null;
      notifyDraft = { title: '', body: '', when: 'now', at: '', link: '' };
      toast(atIso ? `Rejalashtirildi: ${fmtDateTime(atIso)}` : 'Yuborildi. Ilovalarga tez orada yetib boradi.');
      renderNotifyView();
    } catch (ex) {
      err.textContent = friendlyError(ex); err.hidden = false;
      btn.disabled = false;
    }
  });

  box.querySelectorAll('[data-ndel]').forEach(b => b.addEventListener('click', async () => {
    if (!confirm('Bu bildirishnoma ro‘yxatdan o‘chirilsinmi?\n(Telefonlarga allaqachon yetib borgan bo‘lsa, u yerda qoladi.)')) return;
    b.disabled = true;
    try {
      await saveNotifications(items => items.filter(n => n.id !== b.dataset.ndel), 'Bildirishnoma o‘chirildi');
      toast('O‘chirildi');
      renderNotifyView();
    } catch (ex) { toast(friendlyError(ex), true); b.disabled = false; }
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
