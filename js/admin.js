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

async function getFile(path, ref = GH.branch) {
  try {
    const f = await gh(`/contents/${path}?ref=${encodeURIComponent(ref)}&t=${Date.now()}`);
    // GitHub 1 MB dan katta faylning matnini bermaydi (content bo'sh, encoding 'none') — git blob orqali o'qiymiz.
    // 2026-10-03: shu sabab data-custom.js «bo'sh» deb o'qilib, 980 ta kino ustidan yozib yuborilgan edi.
    if (f && f.type === 'file' && f.size > 0 && (!f.content || f.encoding === 'none')) {
      const b = await gh(`/git/blobs/${f.sha}`);
      if (!b || !b.content) throw new Error(`${path} o‘qilmadi (${f.size} bayt)`);
      f.content = b.content;
      f.encoding = b.encoding;
    }
    return f;
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
  // fayl bor-u, ro'yxat topilmadi — bo'sh deb hisoblamaymiz (aks holda saqlashda hamma kino o'chib ketadi)
  if (!m && f.size > 0) throw new Error('data-custom.js o‘qilmadi — saqlash to‘xtatildi. Sahifani yangilab, qayta urining.');
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
/* Admin sahifa uzoq ochiq qolsa, xotirada ESKI kod ishlaydi (2026-10-03: eski kod 1095 ta kinoni 400 taga almashtirgan).
   Saqlashdan oldin saytdagi versiya bilan solishtiramiz — yangisi chiqqan bo'lsa, sahifa yangilanadi. */
async function ensureFreshAdmin() {
  const mine = ([...document.scripts].map(s => s.src).find(s => /\/js\/admin\.js\?v=/.test(s)) || '').match(/v=(\d+)/)?.[1];
  if (!mine) return;
  try {
    const html = await (await fetch(`admin.html?t=${Date.now()}`, { cache: 'no-store' })).text();
    const live = html.match(/js\/admin\.js\?v=(\d+)/)?.[1];
    if (live && live !== mine) {
      toast('Admin panelning yangi versiyasi chiqqan — sahifa yangilanmoqda. Keyin qayta urining.', true);
      setTimeout(() => location.reload(), 1200);
      throw new Error('Admin panel eskirgan — yangilanmoqda, keyin qayta urining.');
    }
  } catch (e) { if (/eskirgan/.test(e.message)) throw e; }
}

async function saveCustom(mutate, message, opts = {}) {
  await ensureFreshAdmin();
  for (let attempt = 0; attempt < 2; attempt++) {
    await loadCustom();
    // sahifa ochilganda yuklangan ro'yxat (js/data-custom.js) — GitHub'dan o'qilgani undan ancha kam bo'lsa, o'qishda xato bor
    if (typeof CUSTOM_MOVIES !== 'undefined' && CUSTOM_MOVIES.length > 20 && customList.length < CUSTOM_MOVIES.length / 2) {
      throw new Error(`Saqlash to‘xtatildi: GitHub’dan ${customList.length} ta kino o‘qildi, saytda esa ${CUSTOM_MOVIES.length} ta. Sahifani yangilab, qayta urining.`);
    }
    const hidden = [...hiddenList];
    const next = mutate(structuredClone(customList), hidden);
    // himoya: admin'dagi har bir amal ko'pi bilan BITTA yozuvni olib tashlaydi (o'chirish / asliga qaytarish).
    // Bittadan ko'p yo'qolsa — bu xato (2026-10-03 da shunday 980 ta kino o'chgan edi), yozmaymiz.
    // (GitHub'dagi qo'riqchi ham tekshiradi — tools/data-guard.js)
    const ids = new Set(next.map(m => m.id));
    // opts.dropCopies — Dublikatlar: faqat AYNAN bir xil nusxalar olib tashlanadi; har bir id ro'yxatda qolishi shart
    const copiesOnly = opts.dropCopies && customList.every(m => ids.has(m.id));
    if ((!copiesOnly && next.length < customList.length - 1) || hidden.length < hiddenList.length - 1) {
      throw new Error(`Saqlash to‘xtatildi: ${customList.length} ta kinodan ${next.length} tasi qolardi. Hech narsa o‘zgarmadi — sahifani yangilab, qayta urining.`);
    }
    if ([...customList].some(m => !ids.has(m.id)) && next.length > customList.length) {
      throw new Error('Saqlash to‘xtatildi: ro‘yxatdagi kinolar almashib ketdi. Sahifani yangilab, qayta urining.');
    }
    try {
      const res = await putFile(DATA_PATH, b64encode(buildDataFile(next, hidden)), message, dataSha);
      dataSha = res.content.sha;
      customList = next;
      hiddenList = hidden;
      verifySaved(next.length);
      return;
    } catch (e) {
      if (e.status !== 409 || attempt) throw e;
    }
  }
}

/* Saqlangandan keyin GitHub'dan qayta o'qib, kinolar soni to'g'riligini tekshiramiz (fonda).
   Mos kelmasa — ekranda ogohlantirish (qo'riqchi baribir tiklaydi, lekin egasi bilishi kerak). */
async function verifySaved(expected) {
  try {
    const f = await getFile(DATA_PATH);
    if (!f || f.sha !== dataSha) return;          // boshqa saqlash ulgurgan yoki kesh — solishtirmaymiz
    const m = b64decode(f.content).match(/\/\*DATA\*\/([\s\S]*?)\/\*END\*\//);
    const n = m ? JSON.parse(m[1]).length : -1;
    if (n !== expected && n !== -1 && n < expected) toast(`Diqqat: saqlangandan keyin ${expected} o‘rniga ${n} ta kino ko‘rindi. Admin → Zaxira bo‘limini tekshiring.`, true);
  } catch {}
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

async function uploadPoster(file, slug, maxW = 600) {
  const b64 = await compressImage(file, maxW);
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

/* Kinolar 28 000+ — id bo'yicha qidiruv Map orqali. Oldin har tekshiruv butun ro'yxatni aylanib chiqardi
   (ro'yxat × ro'yxat) va admin ilovasi qotib qolardi. */
let baseMap = null;
const baseById = () => baseMap || (baseMap = new Map(baseMovies().map(m => [m.id, m])));
const isBase = id => baseById().has(id);

function nextId() {
  // 100000 dan yuqori id'lar — kutubxona (js/data-lib2.js); qo'lda qo'shilganlar ular bilan to'qnashmasin
  let max = 999;
  for (const m of baseMovies()) if (m.id < 100000 && m.id > max) max = m.id;
  for (const m of customList) if (m.id < 100000 && m.id > max) max = m.id;
  return max + 1;
}

/* Hozirgi holat: asl kino + tahrir (bo'lsa) */
function currentMovie(id) {
  return customList.find(m => m.id === id) || baseById().get(id) || null;
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
  if (!/^https?:$/.test(u.protocol)) return { ok: false, msg: 'Havola http:// yoki https:// bilan boshlanishi kerak' };
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
  star:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z"/></svg>',
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

      ${tmdbSectionHTML(m)}

      ${section('info', 'Asosiy', `
        <div class="adm-row adm-row-2">
          ${field('Nomi (o‘zbekcha) <b class="adm-req">*</b>', `<input class="acc-input" name="titleUz" required value="${val(m.title?.uz)}" placeholder="Masalan: Yulduzlararo">
            <button class="acc-link adm-tr-btn" type="button" data-tr="titleRu>titleUz">${ICONS.globe || '⇄'} Ruschadan o‘girish</button>
            <p class="adm-hint" data-tr-note="titleUz" hidden></p>`)}
          ${field('Nomi (ruscha)', `<input class="acc-input" name="titleRu" value="${val(m.title?.ru)}" placeholder="Интерстеллар">`)}
        </div>
        ${field('Boshqa nomlari', `<input class="acc-input" name="tags" value="${val((m.tags || []).join(', '))}" placeholder="Vergul bilan: Qasoskorlar: Intiho, Avengers: Endgame, Мстители 4">`)}
        <p class="adm-hint">Qidiruv va Google/Yandex uchun boshqa nomlar.</p>
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
          ${field('Bo‘lim', `<select class="acc-input" name="franchise">${[['', 'Yo‘q'], ['uzbek', 'O‘zbek kino'], ['konsert', 'Konsert'], ['dorama', 'Koreys doramasi'], ['anime', 'Anime'], ['hind', 'Hind kino'], ['marvel', 'Marvel'], ['dc', 'DC']].map(([v, l]) => `<option value="${v}"${(m.franchise || '') === v ? ' selected' : ''}>${l}</option>`).join('')}</select>`)}
        </div>
        ${field('Rollarda', `<input class="acc-input" name="cast" value="${val((m.cast || []).join(', '))}" placeholder="Aktyorlarni vergul bilan ajrating">`)}
      `)}

      <div id="admMxBox"${m.franchise === 'marvel' ? '' : ' hidden'}>${section('star', 'Marvel sahifasi', `
        <p class="adm-hint">Bo‘sh qolsa — Wikidata ma’lumoti.</p>
        <div class="adm-row adm-row-2">
          ${field('Inglizcha nomi', `<input class="acc-input" name="mxEn" value="${val(mxOf(m).en)}" placeholder="Avengers: Endgame">`)}
          ${field('Premyera sanasi', `<input class="acc-input" name="mxDate" type="date" value="${val(mxOf(m).date)}">`)}
          ${field('Byudjet (mln $)', `<input class="acc-input" name="mxBudget" type="number" inputmode="decimal" min="0" step="0.1" value="${val(mxOf(m).budget ? mxOf(m).budget / 1e6 : '')}" placeholder="356">`)}
          ${field('Kassa, butun dunyo (mln $)', `<input class="acc-input" name="mxGross" type="number" inputmode="decimal" min="0" step="0.1" value="${val(mxOf(m).gross ? mxOf(m).gross / 1e6 : '')}" placeholder="2797.5">`)}
          ${field('Rasmiy treyler (YouTube)', `<input class="acc-input" name="mxYt" value="${val(mxOf(m).yt ? 'https://www.youtube.com/watch?v=' + mxOf(m).yt : '')}" placeholder="https://www.youtube.com/watch?v=...">`)}
          ${field('Davomiyligi (daq.)', `<input class="acc-input" name="mxRuntime" type="number" inputmode="numeric" min="1" value="${val(mxOf(m).runtime)}" placeholder="181">`)}
        </div>
        <p class="adm-hint">Studiyaning o‘z kanalidan bo‘lsa — «Rasmiy treyler».</p>
      `)}</div>

      ${section('tag', 'Janrlar', `
        <div class="adm-genres">
          ${GENRES.map(g => `<label class="adm-genre"><input type="checkbox" name="genres" value="${g.id}"${(m.genres || []).includes(g.id) ? ' checked' : ''}><span>${ADM_ICONS.check}${esc(g.uz)}</span></label>`).join('')}
        </div>
      `, 'bir nechtasini tanlash mumkin')}

      ${section('text', 'Tavsif', `
        ${field('O‘zbekcha', `<textarea class="acc-input adm-text" name="descUz" rows="4" placeholder="Kino haqida qisqacha...">${val(m.desc?.uz)}</textarea>
          <button class="acc-link adm-tr-btn" type="button" data-tr="descRu>descUz">${ICONS.globe || '⇄'} Ruschadan o‘zbekchaga o‘girish</button>`)}
        ${field('Ruscha', `<textarea class="acc-input adm-text" name="descRu" rows="3" placeholder="Коротко о фильме...">${val(m.desc?.ru)}</textarea>
          <button class="acc-link adm-tr-btn" type="button" data-tr="descUz>descRu">${ICONS.globe || '⇄'} O‘zbekchadan ruschaga o‘girish</button>`)}
        <p class="adm-hint" id="admTrNote" hidden></p>
      `)}

      ${section('media', 'Poster va video', `
        <label class="adm-drop">
          <input type="file" name="posterFile" accept="image/*">
          <span class="adm-drop-icon">${ADM_ICONS.upload}</span>
          <span class="adm-drop-text"><b>Poster yuklash</b><small id="admFileName">Rasm tanlang — avtomatik kichraytiriladi</small></span>
        </label>
        ${field('yoki poster havolasi', `<input class="acc-input" name="posterUrl" value="${val(m.poster)}" placeholder="https://...jpg">`)}
        <div class="adm-cover">
          <div class="adm-cover-prev" id="admCoverPrev">${m.cover ? `<img src="${esc(m.cover)}" alt="" onerror="this.remove()">` : '<span>16:9</span>'}</div>
          <div class="adm-cover-body">
            <label class="adm-label">Pleyer muqovasi (keng rasm)</label>
            <p class="adm-hint">Bo‘sh qolsa — treyler rasmi yoki poster.</p>
            <label class="adm-drop adm-drop-sm">
              <input type="file" name="coverFile" accept="image/*">
              <span class="adm-drop-icon">${ADM_ICONS.upload}</span>
              <span class="adm-drop-text"><b>Muqova yuklash</b><small id="admCoverName">Gorizontal rasm tanlang</small></span>
            </label>
            <input class="acc-input" name="coverUrl" value="${val(m.cover)}" placeholder="yoki havola: https://...jpg">
          </div>
        </div>
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
  ['year', 'duration', 'rating', 'director', 'franchise', 'audio', 'source', 'cover'].forEach(k => delete m[k]);
  if (s('coverUrl')) m.cover = s('coverUrl');
  if (num('year')) m.year = Math.round(num('year'));
  if (num('duration')) m.duration = Math.round(num('duration'));
  if (num('rating') !== undefined && s('rating')) m.rating = num('rating');
  if (s('director')) m.director = s('director');
  if (s('franchise')) m.franchise = s('franchise');
  if (f.get('audioUz') === 'on') m.audio = 'uz';
  if (s('sourceName')) m.source = { name: s('sourceName'), url: s('sourceUrl') };
  // boshqa nomlari (teglar): vergul bilan — "Qasoskorlar: Intiho" dagi ikki nuqta nom ichida qoladi
  const tags = [...new Set(s('tags').split(',').map(x => x.trim()).filter(Boolean))];
  if (tags.length) m.tags = tags; else delete m.tags;
  if (old.seasons && !m.duration) m.seasons = old.seasons;
  // qo'shimcha sifatlar (.mp4): pleyerda sifat tanlash uchun
  const videos = ['1080p', '720p', '480p', '360p'].map(label => ({ label, url: s('q_' + label) })).filter(v => v.url);
  if (videos.length) m.videos = videos; else delete m.videos;
  if (!m.genres.length) m.genres = ['drama'];
  // Marvel sahifasi ma'lumotlari (marvel.js: Wikidata ustidan ishlatiladi)
  delete m.mx;
  if (m.franchise === 'marvel') {
    const mx = {};
    if (s('mxEn')) mx.en = s('mxEn');
    if (s('mxDate')) mx.date = s('mxDate');
    if (num('mxBudget')) mx.budget = Math.round(num('mxBudget') * 1e6);
    if (num('mxGross')) mx.gross = Math.round(num('mxGross') * 1e6);
    if (num('mxRuntime')) mx.runtime = Math.round(num('mxRuntime'));
    const ytv = (s('mxYt').match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/) || [])[1];
    if (ytv) mx.yt = ytv;
    // faqat Wikidata'dagidan farq qiladigan maydonlar saqlanadi
    const base = (typeof MARVEL_INFO !== 'undefined' && MARVEL_INFO[m.id]) || {};
    for (const k of Object.keys(mx)) if (mx[k] === base[k]) delete mx[k];
    if (Object.keys(mx).length) m.mx = mx;
  }
  return m;
}

/* Marvel ma'lumotlari: Wikidata (js/marvel-data.js) + admin'da kiritilgani (m.mx) */
function mxOf(m) {
  const base = (typeof MARVEL_INFO !== 'undefined' && m && MARVEL_INFO[m.id]) || {};
  return { ...base, ...((m && m.mx) || {}) };
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
  // pleyer muqovasi oldindan ko'rish
  const coverPrev = $('#admCoverPrev');
  const setCover = src => { coverPrev.innerHTML = src ? `<img src="${esc(src)}" alt="" onerror="this.remove()">` : '<span>16:9</span>'; };
  form.coverFile.addEventListener('change', () => {
    const file = form.coverFile.files[0];
    if (!file) return;
    setCover(URL.createObjectURL(file));
    $('#admCoverName').textContent = file.name;
  });
  form.coverUrl.addEventListener('change', () => setCover(form.coverUrl.value.trim()));

  bindTmdb(form, { setHeroImg, setCover });
  form.franchise.addEventListener('change', () => { $('#admMxBox').hidden = form.franchise.value !== 'marvel'; });
  bindTranslate(form);

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
    for (const inp of [form.posterUrl, form.sourceUrl, form.coverUrl]) {
      if (BLOCKED_HOSTS.test(inp.value)) return showErr('Bu xostdagi kontent ruxsatsiz tarqatiladi — qabul qilinmaydi.');
    }
    if (!form.video.value.trim() && !form.trailer.value.trim()) return showErr('Kino yoki treyler havolasini kiriting');

    const btn = $('#admSubmit');
    btn.disabled = true;
    btn.textContent = 'Saqlanmoqda...';
    try {
      const movie = readForm(form, old);
      if (form._tmdb) movie.tmdb = form._tmdb;
      const file = form.posterFile.files[0] || await tmdbImageFile(movie.poster);
      if (file) movie.poster = await uploadPoster(file, `${movie.slug}-${movie.id}`);
      const coverFile = form.coverFile.files[0] || await tmdbImageFile(movie.cover);
      if (coverFile) movie.cover = await uploadPoster(coverFile, `${movie.slug}-${movie.id}-cover`, 1280);

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
let listFilter = 'all';     // 'all' | 'added' | 'edited' | 'hidden' | 'marvel'
let listQuery = '';
let commitsCache = null;    // oxirgi o'zgarishlar (GitHub commit tarixi)

const NAV_ICONS = {
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12.2l2.2 2.2 4.4-4.6"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2.5L4.5 13.5H12l-1 8 8.5-11H12z"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor"/></svg>',
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
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  tg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 4.5L2.8 11.7c-.9.4-.9 1.6.1 1.9l4.6 1.4 1.8 5.5c.3.8 1.3 1 1.9.4l2.6-2.5 4.9 3.6c.7.5 1.7.1 1.9-.7l3-15c.2-1-.8-1.8-1.7-1.4z"/><path d="M8 15l9.5-7.5"/></svg>',
  group: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="14" height="14" rx="2.5"/><path d="M7 3h11.5A2.5 2.5 0 0 1 21 5.5V17"/></svg>'
};

const addedList = () => customList.filter(m => !isBase(m.id));
const editedList = () => customList.filter(m => isBase(m.id));
/* Asl + tahrirlangan + qo'shilgan kinolar. customList o'zgarmaguncha bir marta hisoblanadi (u faqat qayta tayinlanadi). */
let allCache = null, allById = null, allFor = null;
function allMovies() {
  if (allFor !== customList || !allCache) {
    const edits = new Map(customList.map(m => [m.id, m]));
    allCache = [...baseMovies().map(m => edits.get(m.id) || m), ...addedList()];
    allById = new Map(allCache.map(m => [m.id, m]));
    allFor = customList;
  }
  return allCache;
}

/* Qidiruv matni har kino uchun bir marta tayyorlanadi */
const ADM_HAY = new WeakMap();
const hayOf = m => {
  let h = ADM_HAY.get(m);
  if (h === undefined) { h = norm(`${m.title?.uz} ${m.title?.ru} ${m.year || ''} ${m.id}`); ADM_HAY.set(m, h); }
  return h;
};

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
      <button type="button" data-view="groups" class="${view === 'groups' ? 'is-active' : ''}">${NAV_ICONS.group}<span>Guruhlar</span></button>
      <button type="button" data-view="dups" class="${view === 'dups' ? 'is-active' : ''}">${NAV_ICONS.copy}<span>Dublikatlar</span></button>
      <button type="button" data-view="site" class="${view === 'site' ? 'is-active' : ''}">${NAV_ICONS.gear}<span>Sayt</span></button>
      <button type="button" data-view="notify" class="${view === 'notify' ? 'is-active' : ''}">${NAV_ICONS.bell}<span>Xabar</span></button>
      <button type="button" data-view="tg" class="${view === 'tg' ? 'is-active' : ''}">${NAV_ICONS.tg}<span>Telegram</span></button>
      <button type="button" data-view="channels" class="${view === 'channels' ? 'is-active' : ''}">${NAV_ICONS.yt}<span>Kanallar</span></button>
      <button type="button" data-view="backup" class="${view === 'backup' ? 'is-active' : ''}">${NAV_ICONS.shield}<span>Zaxira</span></button>
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
  else if (view === 'tg') renderTgView();
  else if (view === 'channels') renderChannelsView();
  else if (view === 'groups') renderGroupsView();
  else if (view === 'backup') renderBackupView();
  else if (view === 'dups') renderDupView();
  else renderFormView();
}

/* ---------- Bosh sahifa ---------- */

function renderHome() {
  const all = allMovies();
  const visible = all.filter(m => !hiddenList.includes(m.id));
  const stats = [
    ['bolt', 'Faol kinolar', activeList().length, 'active'],
    ['film', 'Saytdagi kinolar', visible.length, 'all'],
    ['plus', 'Qo‘shilgan', addedList().length, 'added'],
    ['edit', 'Tahrirlangan', editedList().length, 'edited'],
    ['eyeOff', 'Yashirilgan', hiddenList.length, 'hidden'],
    ['yt', 'Kanallardan (YouTube)', channelIds().size, 'channels']
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
    m.year, typeName(m.type), m.video ? 'To‘liq kino' : m.trailer ? 'Treyler' : 'Faqat ma’lumot', `ID ${m.id}`
  ].filter(Boolean);
  const state = hidden ? '<span class="adm-state is-hide">Yashirilgan</span>'
    : !base ? '<span class="adm-state is-add">Qo‘shilgan</span>'
    : edited ? '<span class="adm-state is-edit">Tahrirlangan</span>' : '';
  return `
    <div class="acc-item adm-item${hidden ? ' is-hidden' : ''}">
      <span class="adm-thumb">${m.poster ? `<img src="${esc(m.poster)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ''}</span>
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
          : hidden ? `<button class="btn btn-ghost btn-sm" type="button" data-hide="${m.id}">Ko‘rsatish</button>`
          : `<button class="btn btn-ghost btn-sm adm-del" type="button" data-del="${m.id}">O‘chirish</button>`}
      </div>
    </div>`;
}

/* Rasmiy YouTube kanallaridan kelgan kinolar (js/data-channels.js) — admin tahrirlasa ham shu yerda sanaladi */
const channelIds = () => new Set((typeof CHANNEL_MOVIES !== 'undefined' ? CHANNEL_MOVIES : []).map(m => m.id));
/* Faol kinolar — qo'shilgan, tahrirlangan va kanallardan kelganlar (yashirilganlarsiz), har biri bir marta */
function activeList() {
  const ids = channelIds();
  for (const m of customList) ids.add(m.id);
  return allMovies().filter(m => ids.has(m.id) && !hiddenList.includes(m.id));
}

function listItems() {
  let items = allMovies();
  if (listFilter === 'active') items = activeList();
  if (listFilter === 'added') items = addedList();
  if (listFilter === 'edited') items = editedList();
  if (listFilter === 'hidden') items = items.filter(m => hiddenList.includes(m.id));
  if (listFilter === 'marvel') items = items.filter(m => m.franchise === 'marvel');
  if (listFilter === 'channels') { const ids = channelIds(); items = items.filter(m => ids.has(m.id)); }
  const q = norm(listQuery);
  if (q) items = items.filter(m => hayOf(m).includes(q));
  return items;
}

function renderListView() {
  const counts = { active: activeList().length, all: allMovies().length, added: addedList().length, edited: editedList().length, hidden: hiddenList.length, marvel: allMovies().filter(m => m.franchise === 'marvel').length, channels: channelIds().size };
  $('#admView').innerHTML = `
    <div class="adm-filters">
      ${[['active', 'Faol'], ['all', 'Hammasi'], ['added', 'Qo‘shilgan'], ['edited', 'Tahrirlangan'], ['hidden', 'Yashirilgan'], ['marvel', 'Marvel'], ['channels', 'Kanallardan']].map(([id, l]) =>
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

/* ---------- TMDB: nomi bo'yicha ma'lumotlarni avtomatik to'ldirish ----------
   themoviedb.org bepul API kaliti — faqat shu brauzerda (localStorage) saqlanadi, repoga yozilmaydi.
   Qidiruv → natijani tanlash → nom, yil, davomiylik, reyting, davlat, rejissyor, aktyorlar, janrlar,
   tavsif (o'zbekcha bo'lsa — o'zbekcha, ruscha), poster, keng muqova va rasmiy treyler formaga yoziladi.
   Poster va muqova saqlashda saytning o'ziga yuklanadi (images/custom/). */
const TMDB_KEY = 'dezomax_tmdb_key';
const TMDB_IMG = 'https://image.tmdb.org/t/p/';
const tmdbKey = () => { try { return localStorage.getItem(TMDB_KEY) || ''; } catch { return ''; } };

// TMDB janrlari → sayt janrlari (js/data.js GENRES); seriallarning qo'shma janrlari ikkiga bo'linadi
const TMDB_GENRES = {
  28: ['action'], 12: ['adventure'], 16: ['animation'], 35: ['comedy'], 80: ['crime'], 18: ['drama'],
  10751: ['family'], 14: ['fantasy'], 36: ['history'], 27: ['horror'], 9648: ['detective'], 10749: ['romance'],
  878: ['scifi'], 53: ['thriller'], 10752: ['war'], 37: ['adventure'],
  10759: ['action', 'adventure'], 10765: ['scifi', 'fantasy'], 10768: ['war'], 10762: ['family']
};
const COUNTRY_UZ = { US: 'AQSh', GB: 'Buyuk Britaniya', RU: 'Rossiya', UZ: 'O‘zbekiston', KR: 'Janubiy Koreya', IN: 'Hindiston', TR: 'Turkiya',
  FR: 'Fransiya', DE: 'Germaniya', JP: 'Yaponiya', CN: 'Xitoy', CA: 'Kanada', NZ: 'Yangi Zelandiya', AU: 'Avstraliya', IT: 'Italiya', ES: 'Ispaniya', KZ: 'Qozog‘iston' };
const COUNTRY_RU = { US: 'США', GB: 'Великобритания' };
const regionName = (code, lang) => {
  if (lang === 'uz' && COUNTRY_UZ[code]) return COUNTRY_UZ[code];
  if (lang === 'ru' && COUNTRY_RU[code]) return COUNTRY_RU[code];
  try { return new Intl.DisplayNames([lang], { type: 'region' }).of(code) || code; } catch { return code; }
};

async function tmdb(path, params = {}) {
  const key = tmdbKey();
  const url = new URL('https://api.themoviedb.org/3' + path);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  // v4 «API Read Access Token» (eyJ...) — sarlavhada; v3 «API Key» — havolada
  const bearer = key.startsWith('eyJ');
  if (!bearer) url.searchParams.set('api_key', key);
  const r = await fetch(url, bearer ? { headers: { Authorization: 'Bearer ' + key } } : {})
    .catch(() => { throw new Error('TMDB’ga ulanib bo‘lmadi — internetni tekshiring'); });
  if (r.status === 401) throw new Error('TMDB kaliti noto‘g‘ri — «Kalitni o‘zgartirish» orqali qayta kiriting');
  if (!r.ok) throw new Error(`TMDB xatosi (${r.status})`);
  return r.json();
}

function tmdbSectionHTML(m) {
  const key = tmdbKey();
  return `
    <section class="adm-sec adm-tmdb" id="tmdbBox">
      <div class="adm-sec-head"><span class="adm-sec-icon">${ICONS.search}</span><h3>Avtomatik to‘ldirish</h3><small>TMDB</small></div>
      ${key ? `
        <p class="adm-hint">Nomini yozib, kinoni tanlang.</p>
        <div class="adm-tmdb-row">
          <input class="acc-input" id="tmdbQ" type="search" value="${esc(m.title?.uz || '')}" placeholder="Kino nomi — masalan: Inception yoki Qizil oyna" autocomplete="off">
          <select class="acc-input" id="tmdbType"><option value="multi">Hammasi</option><option value="movie">Film</option><option value="tv">Serial</option></select>
          <button class="btn btn-primary" type="button" id="tmdbGo">Qidirish</button>
        </div>
        <p class="acc-error" id="tmdbErr" hidden></p>
        <div class="adm-tmdb-res" id="tmdbRes"></div>
        <div class="adm-tmdb-foot"><button class="acc-link" type="button" id="tmdbKeyReset">Kalitni o‘zgartirish</button><span>Ma’lumotlar: The Movie Database (TMDB)</span></div>` : `
        <p class="adm-hint">Avtomatik to‘ldirish uchun bepul TMDB kaliti kerak:</p>
        <ol class="adm-steps">
          <li><a href="https://www.themoviedb.org/signup" target="_blank" rel="noopener">themoviedb.org</a> saytida ro‘yxatdan o‘ting (email tasdiqlanadi)</li>
          <li><a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener">Settings → API</a> sahifasida «Create» → «Developer» ni tanlang, shartlarga rozilik bering</li>
          <li>Ilova ma’lumotlari: nomi — DezoMax, turi — Website, manzil — https://dezomax.uz</li>
          <li>Chiqqan <b>API Key</b> (yoki <b>API Read Access Token</b>) ni nusxalab, pastga qo‘ying</li>
        </ol>
        <div class="adm-tmdb-row">
          <input class="acc-input" id="tmdbKeyIn" type="password" placeholder="TMDB API kaliti" autocomplete="off">
          <button class="btn btn-primary" type="button" id="tmdbKeySave">Saqlash</button>
        </div>
        <p class="acc-error" id="tmdbErr" hidden></p>
        <p class="adm-hint">Kalit faqat shu qurilmada saqlanadi.</p>`}
    </section>`;
}

function bindTmdb(form, { setHeroImg, setCover }) {
  const box = $('#tmdbBox');
  if (!box) return;
  const err = $('#tmdbErr');
  const showErr = m => { err.textContent = m || ''; err.hidden = !m; };
  const redraw = () => { box.outerHTML = tmdbSectionHTML({ title: { uz: form.titleUz.value } }); bindTmdb(form, { setHeroImg, setCover }); };

  $('#tmdbKeySave')?.addEventListener('click', async e => {
    const v = $('#tmdbKeyIn').value.trim();
    if (!v) return showErr('Kalitni qo‘ying');
    e.currentTarget.disabled = true;
    try {
      localStorage.setItem(TMDB_KEY, v);
      await tmdb('/configuration');        // kalitni tekshiramiz
      redraw();
    } catch (ex) {
      localStorage.removeItem(TMDB_KEY);
      showErr(ex.message);
      e.currentTarget.disabled = false;
    }
  });
  $('#tmdbKeyReset')?.addEventListener('click', () => {
    if (!confirm('TMDB kaliti shu qurilmadan o‘chirilsinmi?')) return;
    localStorage.removeItem(TMDB_KEY);
    redraw();
  });

  const q = $('#tmdbQ'), res = $('#tmdbRes');
  if (!q) return;
  const search = async () => {
    const text = q.value.trim();
    if (!text) return showErr('Kino nomini yozing');
    showErr('');
    res.innerHTML = '<p class="acc-muted">Qidirilmoqda…</p>';
    try {
      const type = $('#tmdbType').value;
      const j = await tmdb(`/search/${type}`, { query: text, language: 'ru-RU', include_adult: 'false' });
      const items = (j.results || []).filter(x => type !== 'multi' || x.media_type === 'movie' || x.media_type === 'tv').slice(0, 12)
        .map(x => ({ ...x, media_type: x.media_type || type }));
      res.innerHTML = items.length ? items.map(x => {
        const name = x.title || x.name, orig = x.original_title || x.original_name;
        const year = (x.release_date || x.first_air_date || '').slice(0, 4);
        return `<button type="button" class="adm-tmdb-item" data-tid="${x.id}" data-ttype="${x.media_type}">
          <span class="adm-thumb">${x.poster_path ? `<img src="${TMDB_IMG}w92${esc(x.poster_path)}" alt="" loading="lazy">` : ''}</span>
          <span><b>${esc(name)}</b><small>${[orig !== name ? orig : '', year, x.media_type === 'tv' ? 'Serial' : 'Film'].filter(Boolean).map(esc).join(' · ')}</small>
            ${x.overview ? `<em>${esc(x.overview.slice(0, 140))}${x.overview.length > 140 ? '…' : ''}</em>` : ''}</span>
        </button>`;
      }).join('') : '<p class="acc-muted">Topilmadi — boshqacha yozib ko‘ring (inglizcha yoki ruscha nomi bilan ham).</p>';
      res.querySelectorAll('[data-tid]').forEach(b => b.addEventListener('click', () => pick(b.dataset.ttype, +b.dataset.tid, b)));
    } catch (ex) { res.innerHTML = ''; showErr(ex.message); }
  };
  $('#tmdbGo').addEventListener('click', search);
  q.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); search(); } });

  async function pick(type, id, btn) {
    res.querySelectorAll('.adm-tmdb-item').forEach(x => x.classList.toggle('is-on', x === btn));
    showErr('');
    try {
      const d = await tmdb(`/${type}/${id}`, { language: 'ru-RU', append_to_response: 'credits,videos,translations', include_video_language: 'ru,en,null' });
      fillFromTmdb(form, type, d, { setHeroImg, setCover });
      form._tmdb = { id, type };
      res.innerHTML = `<p class="adm-tmdb-ok">✓ «${esc(d.title || d.name)}» ma’lumotlari formaga yozildi — tekshirib, saqlang.</p>`;
    } catch (ex) { showErr(ex.message); }
  }
}

function fillFromTmdb(form, type, d, { setHeroImg, setCover }) {
  const tr = code => (d.translations?.translations || []).find(t => t.iso_639_1 === code)?.data || {};
  const uz = tr('uz'), en = tr('en');
  const name = x => x.title || x.name || '';
  const set = (field, v, onlyEmpty = false) => {
    if (v === undefined || v === null || v === '') return;
    if (onlyEmpty && form[field].value.trim()) return;
    form[field].value = v;
  };
  const ruTitle = d.title || d.name, orig = d.original_title || d.original_name;
  set('titleUz', name(uz) || form.titleUz.value.trim() || name(en) || orig);
  if (!name(uz) && (ruTitle || name(en))) { form.titleUz.dataset.autoTr = '1'; autoTranslate(form, 'titleUz', ruTitle ? 'ru' : 'en', ruTitle || name(en)); }
  set('titleRu', ruTitle);
  $('#admHeadTitle').textContent = form.titleUz.value.trim() || 'Nomsiz kino';
  // boshqa nomlari: asl, inglizcha, ruscha — qidiruvda topilishi uchun
  const tags = [...new Set([...form.tags.value.split(',').map(x => x.trim()), orig, name(en), ruTitle].filter(x => x && x !== name(uz)))];   // o'zbekcha nom tarjima qilinsa ham inglizchasi teglarda qoladi
  form.tags.value = tags.join(', ');

  const genreIds = (d.genres || []).map(g => g.id);
  form.type.value = type === 'tv' ? 'serial' : genreIds.includes(16) ? 'multfilm' : 'film';
  const year = (d.release_date || d.first_air_date || '').slice(0, 4);
  set('year', year);
  set('duration', d.runtime || d.episode_run_time?.[0]);
  if (d.vote_count > 20) set('rating', Math.round(d.vote_average * 10) / 10);

  const cc = (d.production_countries || []).map(c => c.iso_3166_1)[0] || d.origin_country?.[0];
  if (cc) { set('countryUz', regionName(cc, 'uz')); set('countryRu', regionName(cc, 'ru')); }
  const directors = type === 'tv' ? (d.created_by || []).map(p => p.name) : (d.credits?.crew || []).filter(p => p.job === 'Director').map(p => p.name);
  set('director', directors.slice(0, 3).join(', '));
  set('cast', (d.credits?.cast || []).slice(0, 6).map(p => p.name).join(', '));

  const site = new Set(genreIds.flatMap(g => TMDB_GENRES[g] || []));
  if (site.size) form.querySelectorAll('input[name="genres"]').forEach(cb => { cb.checked = site.has(cb.value); });

  // bo'lim: faqat tanlanmagan bo'lsa
  if (!form.franchise.value) {
    const comp = (d.production_companies || []).map(c => c.name).join(' ');
    const fr = /Marvel Studios/i.test(comp) ? 'marvel' : /\bDC\b|DC Films|DC Entertainment|DC Studios/i.test(comp) ? 'dc'
      : cc === 'UZ' ? 'uzbek' : cc === 'IN' ? 'hind' : cc === 'KR' && type === 'tv' ? 'dorama' : cc === 'JP' && genreIds.includes(16) ? 'anime' : '';
    if (fr) form.franchise.value = fr;
  }

  // tavsif: o'zbekchasi bo'lsa — o'zbekcha; bo'lmasa o'zbekcha maydon o'zgarmaydi
  if (uz.overview) form.descUz.value = uz.overview;
  if (d.overview) form.descRu.value = d.overview;
  // tavsifning o'zbekchasi (yoki ruschasi) TMDB'da bo'lmasa — avtomatik tarjima (keyin tekshirib to'g'rilash mumkin)
  if (!uz.overview && (d.overview || en.overview)) autoTranslate(form, 'descUz', d.overview ? 'ru' : 'en', d.overview || en.overview);
  if (!d.overview && en.overview) autoTranslate(form, 'descRu', 'en', en.overview);

  if (d.poster_path) { form.posterUrl.value = `${TMDB_IMG}w500${d.poster_path}`; setHeroImg(form.posterUrl.value); }
  if (d.backdrop_path) { form.coverUrl.value = `${TMDB_IMG}w1280${d.backdrop_path}`; setCover(form.coverUrl.value); }

  // rasmiy treyler (YouTube): ruscha bo'lsa — ruscha, bo'lmasa inglizcha
  const vids = (d.videos?.results || []).filter(v => v.site === 'YouTube' && v.official !== false && /Trailer|Teaser/.test(v.type));
  vids.sort((a, b) => (a.type === 'Trailer' ? 0 : 1) - (b.type === 'Trailer' ? 0 : 1) || (a.iso_639_1 === 'ru' ? 0 : 1) - (b.iso_639_1 === 'ru' ? 0 : 1));
  if (vids[0]) set('trailer', `https://www.youtube.com/watch?v=${vids[0].key}`, true);
  form.trailer.dispatchEvent(new Event('input'));
}

/* ---------- Tarjimon: tavsifni o'zbekcha ↔ ruscha (inglizchadan ham) ----------
   Bepul MyMemory xizmati (kalitsiz, kuniga ~5000 belgi). Bir so'rovga 500 belgigacha — gaplarga bo'lib yuboriladi.
   Mashina tarjimasi — saqlashdan oldin o'qib chiqish kerak. */
async function translateText(text, from, to) {
  const parts = [];
  let cur = '';
  for (const s of String(text).match(/[^.!?]+[.!?]*\s*/g) || [text]) {
    if ((cur + s).length > 450 && cur) { parts.push(cur); cur = ''; }
    cur += s;
  }
  if (cur.trim()) parts.push(cur);
  const decode = s => { const t = document.createElement('textarea'); t.innerHTML = s; return t.value; };
  const out = [];
  for (const p of parts) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(p.trim().slice(0, 480))}&langpair=${from}|${to}`;
    const r = await fetch(url).catch(() => { throw new Error('Tarjima xizmatiga ulanib bo‘lmadi'); });
    const j = await r.json().catch(() => ({}));
    if (j.quotaFinished || r.status === 429) throw new Error('Bugungi bepul tarjima limiti tugadi — ertaga qayta urinib ko‘ring');
    if (j.responseStatus !== 200 || !j.responseData?.translatedText) throw new Error('Tarjima qilinmadi — qayta urinib ko‘ring');
    out.push(decode(j.responseData.translatedText));
  }
  let res = out.join(' ').replace(/\s+/g, ' ').trim();
  // o'zbek lotin yozuvi: o‘, g‘ (saytdagi kabi) va ’ (tutuq belgisi)
  if (to === 'uz') res = res.replace(/([oOgG])['’`ʻʼ]/g, '$1‘').replace(/['`ʻʼ]/g, '’');
  return res;
}

async function autoTranslate(form, field, from, text) {
  const note = form.querySelector(`[data-tr-note="${field}"]`) || $('#admTrNote'), box = form[field];
  const to = /Uz$/.test(field) ? 'uz' : 'ru';
  const isTitle = field.startsWith('title');
  const prevPh = box.placeholder;
  box.placeholder = 'O‘girilmoqda…';
  if (note) { note.hidden = true; note.classList.remove('is-error'); }
  try {
    let res = await translateText(text, from, to);
    if (isTitle) res = res.replace(/[.!]+$/, '').replace(/^./, c => c.toUpperCase());
    if (!box.value.trim() || box.dataset.autoTr) {
      box.value = res; box.dataset.autoTr = '1';
      if (field === 'titleUz') $('#admHeadTitle').textContent = res;
    }
    if (note) { note.textContent = `${to === 'uz' ? 'O‘zbekcha' : 'Ruscha'} ${isTitle ? 'nomi' : 'tavsif'} avtomatik tarjima qilindi — saqlashdan oldin tekshirib, kerak bo‘lsa to‘g‘rilang.`; note.hidden = false; }
  } catch (ex) {
    if (note) { note.textContent = ex.message; note.classList.add('is-error'); note.hidden = false; }
  } finally { box.placeholder = prevPh; }
}

function bindTranslate(form) {
  form.querySelectorAll('[data-tr]').forEach(b => b.addEventListener('click', async () => {
    const [srcField, dstField] = b.dataset.tr.split('>');
    const from = /Ru$/.test(srcField) ? 'ru' : 'uz';
    const src = form[srcField].value.trim();
    const dst = form[dstField];
    if (!src) {
      const n = form.querySelector(`[data-tr-note="${dstField}"]`) || $('#admTrNote');
      n.textContent = `Avval ${from === 'ru' ? 'ruscha' : 'o‘zbekcha'} ${srcField.startsWith('title') ? 'nomini' : 'tavsifni'} yozing.`; n.classList.add('is-error'); n.hidden = false; return;
    }
    if (dst.value.trim() && !dst.dataset.autoTr && !confirm('Mavjud matn tarjima bilan almashtirilsinmi?')) return;
    b.disabled = true;
    dst.dataset.autoTr = '1';
    await autoTranslate(form, dstField, from, src);
    b.disabled = false;
  }));
  // qo'lda tahrirlangan matnni avtomatik tarjima endi ustidan yozmaydi
  ['descUz', 'descRu', 'titleUz'].forEach(k => form[k].addEventListener('input', () => { delete form[k].dataset.autoTr; }));
}

/* Saqlashda TMDB rasmi saytning o'ziga yuklanadi (images/custom/) — tashqi xostga bog'liq bo'lmasin */
async function tmdbImageFile(url) {
  if (!url || !url.startsWith(TMDB_IMG)) return null;
  const r = await fetch(url).catch(() => null);
  if (!r || !r.ok) return null;
  const blob = await r.blob();
  return new File([blob], 'tmdb.jpg', { type: blob.type || 'image/jpeg' });
}

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
  dorama: 'Koreys doramalari (avtomatik)', anime: 'Anime (avtomatik)', hind: 'Hind kinolari (avtomatik)',
  marvel: 'Marvel (avtomatik)', dc: 'DC (avtomatik)', top: 'Eng yuqori reyting (avtomatik)',
  popular: 'Mashhur kinolar — TOP 10 (eng ko‘p ko‘rilgan)', series: 'Seriallar (avtomatik)', cartoons: 'Multfilmlar (avtomatik)', custom: 'Qo‘lda tanlangan kinolar'
};
const ROW_DEFAULT_TITLES = {
  uzbek: 'row.uzbek', konsert: 'row.konsert', trending: 'row.trending', new: 'row.new', dorama: 'row.dorama', anime: 'row.anime', hind: 'row.hind', marvel: 'row.marvel', dc: 'row.dc',
  top: 'row.top', popular: 'row.popular', series: 'row.series', cartoons: 'row.cartoons'
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

const movieById = id => (allMovies(), allById.get(id));

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
              <span class="adm-thumb">${m.poster ? `<img src="${esc(m.poster)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ''}</span>
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
  let t0;
  input.addEventListener('input', () => { clearTimeout(t0); t0 = setTimeout(search, 150); });
  function search() {
    const q = norm(input.value);
    if (!q) { results.hidden = true; return; }
    const picked = new Set(getIds()), found = [];
    for (const m of allMovies()) {
      if (!picked.has(m.id) && hayOf(m).includes(q)) { found.push(m); if (found.length === 8) break; }
    }
    results.hidden = false;
    results.innerHTML = found.length ? found.map(m => `
      <button type="button" data-add="${m.id}">
        <span class="adm-thumb">${m.poster ? `<img src="${esc(m.poster)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ''}</span>
        <span><b>${esc(m.title.uz)}</b><small>${[m.year, typeName(m.type)].filter(Boolean).join(' · ')}</small></span>
        <em>+</em>
      </button>`).join('') : '<p class="acc-muted">Topilmadi</p>';
    results.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => {
      setIds([...getIds(), +b.dataset.add]); rerender();
    }));
  }
}

const delayText = s => +s >= 60 ? '1 daqiqa' : `${+s} soniya`;

/* ---------- Sayt teglari (SEO): bosh sahifaning sarlavhasi, tavsifi va kalit so'zlari ----------
   index.html ning o'ziga yoziladi (GitHub API) — qidiruv tizimlari JavaScript'siz ham ko'radi. */
function seoSectionHTML() {
  queueMicrotask(bindSeo);
  return `
    <section class="adm-sec" id="admSeo">
      <div class="adm-sec-head"><span class="adm-sec-icon">${ADM_ICONS.tag}</span><h3>Sayt teglari (SEO)</h3><small>bosh sahifa</small></div>
      <p class="adm-hint">Sarlavha — 60, tavsif — 160 belgigacha.</p>
      <div class="adm-field"><label class="adm-label" for="seoTitle">Sarlavha <small id="seoTitleN"></small></label>
        <input class="acc-input" id="seoTitle" maxlength="90" placeholder="Yuklanmoqda…"></div>
      <div class="adm-field"><label class="adm-label" for="seoDesc">Tavsif <small id="seoDescN"></small></label>
        <textarea class="acc-input adm-text" id="seoDesc" rows="3" maxlength="300" placeholder="Yuklanmoqda…"></textarea></div>
      <div class="adm-field"><label class="adm-label" for="seoKeys">Teglar (kalit so‘zlar, vergul bilan)</label>
        <textarea class="acc-input adm-text" id="seoKeys" rows="3" placeholder="o‘zbek kino, onlayn kino, seriallar, uzbek kino 2026, tarjima kinolar"></textarea></div>
      <div class="adm-tag-chips" id="seoChips"></div>
      <p class="acc-error" id="seoErr" hidden></p>
      <button class="btn btn-primary" type="button" id="seoSave" disabled>Teglarni saqlash</button>
    </section>`;
}

const seoAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const seoUnattr = s => String(s || '').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

async function bindSeo() {
  const box = $('#admSeo');
  if (!box) return;
  const ti = $('#seoTitle'), de = $('#seoDesc'), ke = $('#seoKeys'), btn = $('#seoSave'), err = $('#seoErr');
  const counts = () => {
    $('#seoTitleN').textContent = `· ${ti.value.length}/60`;
    $('#seoDescN').textContent = `· ${de.value.length}/160`;
    const tags = ke.value.split(',').map(x => x.trim()).filter(Boolean);
    $('#seoChips').innerHTML = tags.map(x => `<span class="adm-chip-sm">${esc(x)}</span>`).join('');
  };
  try {
    const f = await getFile('index.html');
    const html = b64decode(f.content);
    ti.value = seoUnattr(html.match(/<title>([^<]*)<\/title>/)?.[1]);
    de.value = seoUnattr(html.match(/<meta name="description" content="([^"]*)"/)?.[1]);
    ke.value = seoUnattr(html.match(/<meta name="keywords" content="([^"]*)"/)?.[1]);
    ti.placeholder = de.placeholder = '';
    btn.disabled = false;
    counts();
  } catch (e) { err.textContent = friendlyError(e); err.hidden = false; return; }
  [ti, de, ke].forEach(x => x.addEventListener('input', counts));

  btn.addEventListener('click', () => {
    const title = ti.value.trim(), desc = de.value.trim();
    const keys = [...new Set(ke.value.split(',').map(x => x.trim()).filter(Boolean))].join(', ');
    if (title.length < 5 || desc.length < 20) { err.textContent = 'Sarlavha va tavsifni to‘ldiring.'; err.hidden = false; return; }
    err.hidden = true;
    runAction(btn, async () => {
      const f = await getFile('index.html');
      let html = b64decode(f.content);
      const set = (rx, line) => { html = rx.test(html) ? html.replace(rx, line) : html; };
      set(/<title>[^<]*<\/title>/, `<title>${seoAttr(title)}</title>`);
      set(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${seoAttr(desc)}">`);
      set(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${seoAttr(title)}">`);
      set(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${seoAttr(desc)}">`);
      set(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${seoAttr(title)}">`);
      set(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${seoAttr(desc)}">`);
      if (/<meta name="keywords" content="[^"]*">/.test(html)) {
        html = keys ? html.replace(/<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="${seoAttr(keys)}">`)
                    : html.replace(/<meta name="keywords" content="[^"]*">\r?\n?/, '');
      } else if (keys) {
        html = html.replace(/(<meta name="description" content="[^"]*">)(\r?\n)/, `$1$2<meta name="keywords" content="${seoAttr(keys)}">$2`);
      }
      await putFile('index.html', b64encode(html), 'Sayt teglari (SEO) yangilandi', f.sha);
    }, 'Teglar saqlandi — ~1 daqiqada saytda');
  });
}

async function renderSiteView() {
  const box = $('#admView');
  if (!siteDraft) {
    box.innerHTML = '<div class="mt-loading"><i></i><i></i><i></i></div>';
    try { await loadConfig(); } catch (e) { box.innerHTML = `<p class="acc-error">${esc(friendlyError(e))}</p>`; return; }
  }
  const d = siteDraft;

  box.innerHTML = seoSectionHTML() + `
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
  // ro'yxatda faqat asosiy kinolar (id 2000 gacha) va qo'lda qo'shilganlar — 28 000 lik kutubxona
  // <select> ga sig'maydi (telefonda ilova qotib qolardi)
  const hidden = new Set(hiddenList);
  const movies = allMovies().filter(m => !hidden.has(m.id) && (m.id < 2000 || !isBase(m.id) || d.link === `movie.html?id=${m.id}`))
    .sort((a, b) => (b.year || 0) - (a.year || 0));
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

/* ---------- Guruhlar: bir nechta video bitta kartaga (1-qism, 2-qism…) ----------
   Guruh kartasi — ro'yxatdagi birinchi kino; unga parts: [id, ...] yoziladi (saytda js/common.js o'qiydi).
   Qolgan qismlar o'chirilmaydi: saytda ro'yxatlardan chiqadi va kino sahifasida qism sifatida ochiladi.
   Guruh tarqatilsa — kartaning asl nomi/turi qaytariladi (groupOrig). */
let grpDraft = null;   // { orig: tahrirlanayotgan guruh kartasi id | null, ids, name, nameRu, type }

const groupsList = () => allMovies().filter(m => Array.isArray(m.parts) && m.parts.length > 1);
const stripPartNo = s => String(s || '').replace(/[\s\-–—:.,#(]*\d+\s*-?\s*(qism|qisim|seriya|серия|часть|bo['‘’]?lim)?[\s).]*$/i, '').trim();
const grpCollator = new Intl.Collator('uz', { numeric: true, sensitivity: 'base' });
/* Nomdagi qism raqami: «12-qism», «qism 12», «12 серия» — topilmasa nomdagi oxirgi raqam; raqamsiz nom — 1-qism («Bo‘rilar», «Bo‘rilar 2») */
// guruh kartasining nomi guruh nomiga almashgan — qism raqami uchun asl nomi olinadi
const origTitle = id => { const m = movieById(id); return m?.groupOrig?.title?.uz || m?.title?.uz || ''; };
function partNoOf(title) {
  const s = String(title || '');
  const m = s.match(/(\d+)\s*-?\s*(?:qism|qisim|қисм|кисм|seriya|серия|часть|qisim|bo['‘’]?lim|бўлим|epizod|эпизод)/i) ||
    s.match(/(?:qism|қисм|seriya|серия|часть|epizod|эпизод)\s*-?\s*(\d+)/i);
  if (m) return +m[1];
  const all = s.match(/\d+/g);
  return all ? +all[all.length - 1] : 1;
}

function groupRowHTML(id, i, n) {
  const m = movieById(id);
  if (!m) return '';
  return `
    <div class="adm-pick adm-grp-row">
      <span class="adm-pick-n">${i + 1}</span>
      <span class="adm-thumb">${m.poster ? `<img src="${esc(m.poster)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ''}</span>
      <span class="adm-pick-title"><b>${esc(m.title.uz)}</b><small>${i === 0 ? 'Guruh kartasi · ' : ''}${i + 1}-qism${m.duration ? ` · ${m.duration} daq.` : ''}${m.size ? ` · ${fmtSize(m.size)}` : ''} · ID ${m.id}${m.video ? '' : ' · video yo‘q'}</small></span>
      <span class="adm-pick-btns">
        <button type="button" data-gmove="-1" data-i="${i}" ${i === 0 ? 'disabled' : ''} aria-label="Yuqoriga">↑</button>
        <button type="button" data-gmove="1" data-i="${i}" ${i === n - 1 ? 'disabled' : ''} aria-label="Pastga">↓</button>
        <button type="button" data-gremove="${i}" class="adm-del" aria-label="Guruhdan chiqarish">✕</button>
      </span>
    </div>`;
}

function renderGroupsView() {
  const box = $('#admView');
  if (!grpDraft) {
    const groups = groupsList();
    box.innerHTML = `
      <section class="adm-sec">
        <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.group}</span><h3>Guruhlar</h3><small>bir nechta video — bitta karta</small></div>
        <p class="acc-muted">Qismlarga bo‘lingan kino yoki serialni bitta kartaga yig‘ing. Saytda faqat birinchi qism karta bo‘lib ko‘rinadi, ichiga kirganda «1-qism, 2-qism…» tugmalari chiqadi. Videolar o‘chirilmaydi.</p>
        <button class="btn btn-primary" type="button" id="grpNew">${NAV_ICONS.plus}<span>Yangi guruh</span></button>
      </section>
      <section class="adm-sec">
        <div class="adm-sec-head"><h3>Mavjud guruhlar</h3><small>${groups.length} ta</small></div>
        ${groups.length ? `<div class="acc-list">${groups.map(g => `
          <div class="acc-item adm-item">
            <span class="adm-thumb">${g.poster ? `<img src="${esc(g.poster)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ''}</span>
            <div class="acc-item-main"><b>${esc(g.title.uz)}</b><small>${g.parts.length} qism${(() => { const min = g.parts.reduce((s, id) => s + (movieById(id)?.duration || 0), 0); return min ? ` · jami ${fmtDur(min * 60)}` : ''; })()} · ${esc(typeName(g.type))} · ID ${g.id}</small></div>
            <div class="adm-actions">
              <button class="btn btn-ghost btn-sm" type="button" data-gedit="${g.id}">Tahrirlash</button>
              <a class="btn btn-ghost btn-sm" href="${SITE_URL}movie.html?id=${g.id}" target="_blank" rel="noopener">Ko‘rish</a>
              <button class="btn btn-ghost btn-sm adm-del" type="button" data-gsplit="${g.id}">Tarqatish</button>
            </div>
          </div>`).join('')}</div>` : '<p class="acc-muted">Hozircha guruh yo‘q.</p>'}
      </section>`;
    $('#grpNew').addEventListener('click', () => { grpDraft = { orig: null, ids: [], name: '', nameRu: '', type: 'serial', langMain: '', langTab: 'uz', langs: {} }; renderGroupsView(); });
    box.querySelectorAll('[data-gedit]').forEach(b => b.addEventListener('click', () => {
      const g = movieById(+b.dataset.gedit);
      const ids = g.parts.filter(id => movieById(id));
      const langMain = g.lang || (g.audio === 'uz' ? 'uz' : '');
      grpDraft = { orig: g.id, ids, name: g.title.uz, nameRu: g.title.ru === g.title.uz ? '' : g.title.ru || '', type: g.type, cover: g.cover || '', poster: g.poster || '',
        langMain, langTab: langMain || 'uz', langs: Object.fromEntries(ids.map(id => [id, { ...(movieById(id).langs || {}) }])) };
      renderGroupsView();
    }));
    box.querySelectorAll('[data-gsplit]').forEach(b => b.addEventListener('click', () => {
      const g = movieById(+b.dataset.gsplit);
      if (!confirm(`«${g.title.uz}» guruhi tarqatilsinmi? Qismlar yana alohida kartalar bo‘lib ko‘rinadi (hech narsa o‘chmaydi).`)) return;
      runAction(b, () => saveCustom(list => {
        let m = list.find(x => x.id === g.id);
        if (!m) { m = structuredClone(baseById().get(g.id)); list.push(m); }
        ungroupMovie(m);
        return list;
      }, `Guruh tarqatildi: ${g.title.uz}`), 'Guruh tarqatildi — ~1 daqiqada saytda');
    }));
    return;
  }

  const d = grpDraft;
  box.innerHTML = `
    <section class="adm-sec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.group}</span><h3>${d.orig ? 'Guruhni tahrirlash' : 'Yangi guruh'}</h3><small>${d.ids.length} qism</small></div>
      <div class="adm-row adm-row-2">
        <div class="adm-field"><label class="adm-label" for="grpName">Guruh nomi (o‘zbekcha)</label>
          <input class="acc-input" id="grpName" value="${esc(d.name)}" placeholder="Masalan: Bo‘rilar"></div>
        <div class="adm-field"><label class="adm-label" for="grpNameRu">Ruscha nomi (ixtiyoriy)</label>
          <input class="acc-input" id="grpNameRu" value="${esc(d.nameRu)}"></div>
      </div>
      <div class="adm-field"><label class="adm-label" for="grpType">Turi</label>
        <select class="acc-input" id="grpType">${['serial', 'film', 'multfilm'].map(x => `<option value="${x}"${x === d.type ? ' selected' : ''}>${typeName(x)}</option>`).join('')}</select></div>
      <div class="adm-cover adm-grp-poster">
        <div class="adm-cover-prev is-tall" id="grpPosterPrev">${d.posterFile ? `<img src="${esc(URL.createObjectURL(d.posterFile))}" alt="">` : d.poster ? `<img src="${esc(d.poster)}" alt="" onerror="this.remove()">` : '<span>2:3</span>'}</div>
        <div class="adm-cover-body">
          <label class="adm-label">Asosiy poster (tik rasm)</label>
          <p class="adm-hint">Bo‘sh qolsa — hozirgi poster.</p>
          <label class="adm-drop adm-drop-sm">
            <input type="file" id="grpPosterFile" accept="image/*">
            <span class="adm-drop-icon">${ADM_ICONS.upload}</span>
            <span class="adm-drop-text"><b>Poster yuklash</b><small>${d.posterFile ? esc(d.posterFile.name) : 'Tik rasm tanlang'}</small></span>
          </label>
          <input class="acc-input" id="grpPoster" value="${esc(d.posterFile ? '' : d.poster || '')}" placeholder="yoki havola: https://...jpg">
        </div>
      </div>
      <div class="adm-cover">
        <div class="adm-cover-prev" id="grpCoverPrev">${d.coverFile ? `<img src="${esc(URL.createObjectURL(d.coverFile))}" alt="">` : d.cover ? `<img src="${esc(d.cover)}" alt="" onerror="this.remove()">` : '<span>16:9</span>'}</div>
        <div class="adm-cover-body">
          <label class="adm-label">Pleyer muqovasi (keng rasm)</label>
          <p class="adm-hint">Qism boshlanishidan oldingi rasm.</p>
          <label class="adm-drop adm-drop-sm">
            <input type="file" id="grpCoverFile" accept="image/*">
            <span class="adm-drop-icon">${ADM_ICONS.upload}</span>
            <span class="adm-drop-text"><b>Muqova yuklash</b><small>${d.coverFile ? esc(d.coverFile.name) : 'Gorizontal rasm tanlang'}</small></span>
          </label>
          <input class="acc-input" id="grpCover" value="${esc(d.coverFile ? '' : d.cover || '')}" placeholder="yoki havola: https://...jpg">
        </div>
      </div>

      <div class="adm-field">
        <label class="adm-label" for="grpSearch">Qism qo‘shish</label>
        <div class="adm-pick-search">
          <input class="acc-input" id="grpSearch" type="search" placeholder="Nomini yozing — masalan, serial nomi" autocomplete="off" value="${esc(d.q || '')}">
          <div class="adm-pick-results" id="grpResults" hidden></div>
        </div>
      </div>

      <div class="adm-grp-tools">
        <span class="acc-muted">Tartib:</span>
        <button class="acc-link" type="button" data-gsort="name">Nomidagi raqam bo‘yicha</button>
        <button class="acc-link" type="button" data-gsort="id">Qo‘shilgan tartibda</button>
        <button class="acc-link" type="button" data-gsort="dur">Davomiyligi bo‘yicha</button>
        <button class="acc-link" type="button" data-gsort="size">Hajmi bo‘yicha</button>
        <button class="acc-link" type="button" data-gsort="rev">Teskari</button>
        ${d.ids.length ? '<button class="acc-link adm-del" type="button" id="grpClear">Hammasini olib tashlash</button>' : ''}
      </div>
      <div class="adm-picked adm-grp-list">
        ${d.ids.length ? d.ids.map((id, i) => groupRowHTML(id, i, d.ids.length)).join('') : '<p class="acc-muted adm-empty-pick">Qism tanlanmagan — yuqoridan qidirib qo‘shing</p>'}
      </div>

      ${d.ids.length ? grpLangsHTML(d) : ''}

      <p class="acc-error" id="grpErr" hidden></p>
      <div class="adm-grp-save">
        <button class="btn btn-ghost" type="button" id="grpCancel">Bekor qilish</button>
        <button class="btn btn-primary" type="button" id="grpSave" ${d.ids.length < 2 ? 'disabled' : ''}>Guruhni saqlash</button>
      </div>
    </section>`;

  const keep = () => {
    d.name = $('#grpName').value; d.nameRu = $('#grpNameRu').value; d.type = $('#grpType').value;
    if (!d.coverFile) d.cover = $('#grpCover').value.trim();
    if (!d.posterFile) d.poster = $('#grpPoster').value.trim();
    if ($('#grpLangMain')) d.langMain = $('#grpLangMain').value;
    d.langs = d.langs || {};
    box.querySelectorAll('[data-glurl]').forEach(inp => { (d.langs[inp.dataset.glurl] ||= {})[d.langTab] = inp.value.trim(); });
  };
  $('#grpPosterFile').addEventListener('change', e => { const f = e.target.files[0]; if (f) { keep(); d.posterFile = f; redraw(); } });
  $('#grpPoster').addEventListener('change', () => { d.posterFile = null; keep(); redraw(); });
  $('#grpCoverFile').addEventListener('change', e => { const f = e.target.files[0]; if (f) { keep(); d.coverFile = f; redraw(); } });
  $('#grpCover').addEventListener('change', () => { d.coverFile = null; keep(); redraw(); });
  const redraw = () => { keep(); const y = window.scrollY; renderGroupsView(); window.scrollTo(0, y); };
  const addIds = ids => {
    d.resTop = $('#grpResults').scrollTop;      // ro'yxat ochiq qoladi, joyi saqlanadi
    const have = new Set(d.ids);
    for (const id of ids) if (!have.has(id)) { d.ids.push(id); have.add(id); }
    if (!$('#grpName').value.trim() && d.ids.length) $('#grpName').value = stripPartNo(movieById(d.ids[0]).title.uz);
    redraw();
  };

  box.querySelectorAll('[data-gmove]').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.i, j = i + +b.dataset.gmove;
    [d.ids[i], d.ids[j]] = [d.ids[j], d.ids[i]]; redraw();
  }));
  box.querySelectorAll('[data-gremove]').forEach(b => b.addEventListener('click', () => { d.ids.splice(+b.dataset.gremove, 1); redraw(); }));
  box.querySelectorAll('[data-gsort]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.gsort;
    if (k === 'rev') d.ids.reverse();
    else if (k === 'id') d.ids.sort((a, b2) => a - b2);
    // davomiylik / hajm: kichigidan kattasiga; ma'lumoti yo'qlari oxirida («Teskari» — aksincha)
    else if (k === 'dur' || k === 'size') {
      const f = k === 'dur' ? 'duration' : 'size';
      const v = id => movieById(id)?.[f] || Infinity;
      d.ids.sort((a, b2) => v(a) - v(b2) || a - b2);
    }
    // nomidagi qism raqami bo'yicha — nomning boshi har xil bo'lsa ham («... 476-қисм», «... 544-qism»)
    else d.ids.sort((a, b2) => partNoOf(origTitle(a)) - partNoOf(origTitle(b2)) ||
      grpCollator.compare(movieById(a).title.uz, movieById(b2).title.uz) || a - b2);
    redraw();
  }));
  // redraw() yana keep() qiladi — u yangi tabga eski tabning havolalarini yozib yuborardi; shuning uchun to'g'ridan-to'g'ri chizamiz
  box.querySelectorAll('[data-gltab]').forEach(b => b.addEventListener('click', () => {
    keep(); d.langTab = b.dataset.gltab;
    const y = window.scrollY; renderGroupsView(); window.scrollTo(0, y);
  }));
  $('#grpLangMain')?.addEventListener('change', () => { keep(); redraw(); });
  $('#grpClear')?.addEventListener('click', () => { if (confirm('Tanlangan qismlar ro‘yxati tozalansinmi?')) { d.ids = []; redraw(); } });
  $('#grpCancel').addEventListener('click', () => { grpDraft = null; renderGroupsView(); });

  // qidiruv: avval 30 tasi, «Yana ko'rsatish» — yana 50 tadan; «hammasini qo'shish» — barcha topilganlar.
  // Qo'shilgandan keyin ro'yxat yopilmaydi — faqat «Yopish» tugmasi yoki qidiruvni tozalash bilan.
  const input = $('#grpSearch'), results = $('#grpResults');
  let t0;
  input.addEventListener('input', () => { clearTimeout(t0); t0 = setTimeout(() => { d.lim = 30; d.resTop = 0; search(); }, 150); });
  function search() {
    d.q = input.value;
    const q = norm(input.value);
    if (!q) { results.hidden = true; return; }
    const lim = d.lim || 30;
    const picked = new Set(d.ids);
    const found = allMovies().filter(m => !picked.has(m.id) && hayOf(m).includes(q))
      .sort((a, b) => grpCollator.compare(a.title.uz, b.title.uz) || a.id - b.id);
    results.hidden = false;
    results.innerHTML = `<div class="adm-grp-res-head"><span>${found.length} ta topildi</span><button type="button" data-gclose>Yopish ✕</button></div>` + (found.length ? `
      ${found.length > 1 ? `<button type="button" class="adm-grp-all" data-gall><b>Topilganlarning hammasini qo‘shish (${found.length})</b><em>+</em></button>` : ''}
      ${found.slice(0, lim).map(m => `
        <button type="button" data-gadd="${m.id}">
          <span class="adm-thumb">${m.poster ? `<img src="${esc(m.poster)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ''}</span>
          <span><b>${esc(m.title.uz)}</b><small>${[m.year, typeName(m.type), `ID ${m.id}`, Array.isArray(m.parts) && m.parts.length > 1 ? `guruh: ${m.parts.length} qism` : ''].filter(Boolean).join(' · ')}</small></span>
          <em>+</em>
        </button>`).join('')}
      ${found.length > lim ? `<button type="button" class="adm-grp-more" data-gmore>Yana ko‘rsatish (${found.length - lim} ta)</button>` : ''}` : '<p class="acc-muted">Topilmadi</p>');
    results.querySelector('[data-gclose]').addEventListener('click', () => { results.hidden = true; d.q = ''; input.value = ''; });
    results.querySelector('[data-gmore]')?.addEventListener('click', () => { d.resTop = results.scrollTop; d.lim = lim + 50; search(); });
    results.scrollTop = d.resTop || 0;
    results.querySelector('[data-gall]')?.addEventListener('click', () => addIds(found.map(m => m.id)));
    results.querySelectorAll('[data-gadd]').forEach(b => b.addEventListener('click', () => addIds([+b.dataset.gadd])));
  }

  if (d.q) search();   // qayta chizilgandan keyin qidiruv natijalari ochiq qoladi

  $('#grpSave').addEventListener('click', e => {
    keep();
    const err = $('#grpErr');
    const name = d.name.trim();
    if (d.ids.length < 2) { err.textContent = 'Guruhga kamida 2 ta video kerak.'; err.hidden = false; return; }
    if (!name) { err.textContent = 'Guruh nomini yozing.'; err.hidden = false; return; }
    const ids = [...d.ids], head = ids[0], set = new Set(ids);
    if (BLOCKED_HOSTS.test(d.cover || '') || BLOCKED_HOSTS.test(d.poster || '')) { err.textContent = 'Bu xostdagi rasm qabul qilinmaydi.'; err.hidden = false; return; }
    const langUrls = Object.values(d.langs || {}).flatMap(o => Object.values(o)).filter(Boolean);
    if (langUrls.some(u => !/^https?:\/\//i.test(u))) { err.textContent = 'Til videosi havolasi https:// bilan boshlanishi kerak.'; err.hidden = false; return; }
    if (langUrls.some(u => BLOCKED_HOSTS.test(u))) { err.textContent = 'Bu xostdagi video qabul qilinmaydi.'; err.hidden = false; return; }
    runAction(e.currentTarget, async () => {
      const cover = d.coverFile ? await uploadPoster(d.coverFile, `${slugify(name)}-${head}-cover`, 1280) : d.cover;
      const poster = d.posterFile ? await uploadPoster(d.posterFile, `${slugify(name)}-${head}`) : d.poster;
      await saveCustom(list => {
        const get = id => {
          let m = list.find(x => x.id === id);
          if (!m) { m = structuredClone(baseById().get(id)); list.push(m); }
          return m;
        };
        // eski guruh kartasi o'zgargan bo'lsa — uni tarqatamiz; boshqa guruhlardan bu qismlarni chiqaramiz
        for (const m of list) {
          if (!Array.isArray(m.parts) || m.id === head) continue;
          if (m.id === d.orig || set.has(m.id)) ungroupMovie(m);
          else if (m.parts.some(id => set.has(id))) {
            m.parts = m.parts.filter(id => !set.has(id));
            if (m.parts.length < 2) ungroupMovie(m);
          }
        }
        const h = get(head);
        if (!h.groupOrig) h.groupOrig = { title: h.title, type: h.type };
        h.parts = ids;
        h.title = { uz: name, ru: d.nameRu.trim() || name };
        h.type = d.type;
        if (cover) h.cover = cover; else delete h.cover;
        if (poster) h.poster = poster;
        // ovoz tillari: har bir qismga — asosiy til (lang) va boshqa tildagi versiyalar (langs)
        for (const id of ids) {
          const m = get(id);
          if (d.langMain) m.lang = d.langMain; else delete m.lang;
          const extra = Object.fromEntries(Object.entries((d.langs || {})[id] || {}).filter(([code, url]) => url && code !== d.langMain));
          if (Object.keys(extra).length) m.langs = extra; else delete m.langs;
          if (id !== head) m.updatedAt = Date.now();
        }
        h.updatedAt = Date.now();
        return list;
      }, `Guruh: ${name} (${ids.length} qism)`);
      grpDraft = null;
    }, `«${name}» guruhi saqlandi — ~1 daqiqada saytda`);
  });
}

/* Guruh: ovoz tillari — tepada bayroqli tablar, tanlangan tilda har bir qismning video havolasi.
   Asosiy til — qismlarning o'z videosi (o'zgartirilmaydi); boshqa tillar — langs. Saytda pleyer tepasida bayroq. */
function grpLangsHTML(d) {
  const main = d.langMain || '', tab = d.langTab || 'uz';
  const name = c => (LANG_NAMES[c] || {}).uz || c;
  const count = c => c === main ? d.ids.filter(id => movieById(id)?.video).length : d.ids.filter(id => d.langs?.[id]?.[c]).length;
  return `
      <div class="adm-field adm-langs">
        <label class="adm-label">Ovoz tillari</label>
        <p class="adm-hint">Har bir til — pleyerda bayroq bo‘lib chiqadi.</p>
        <div class="adm-lang-main">
          <label for="grpLangMain">Asosiy videolar tili</label>
          <select class="acc-input" id="grpLangMain">
            <option value=""${main ? '' : ' selected'}>Belgilanmagan</option>
            ${AUDIO_LANGS.map(c => `<option value="${c}"${c === main ? ' selected' : ''}>${name(c)}</option>`).join('')}
          </select>
        </div>
        <div class="adm-lang-tabs" role="tablist">${AUDIO_LANGS.map(c => `
          <button type="button" role="tab" class="adm-lang-tab${c === tab ? ' is-on' : ''}" data-gltab="${c}" aria-selected="${c === tab}">
            ${LANG_FLAGS[c]}<span>${name(c).replace(/ tilida.*$/, '')}</span>${count(c) ? `<em>${count(c)}</em>` : ''}
          </button>`).join('')}
        </div>
        <div class="adm-lang-list">
          ${d.ids.map((id, i) => {
            const m = movieById(id);
            if (!m) return '';
            return `<div class="adm-lang-row"><b>${i + 1}-qism</b>${tab === main
              ? `<span class="adm-lang-own" title="${esc(m.video || '')}">${m.video ? esc(m.video) : 'video yo‘q'}<small>asosiy video</small></span>`
              : `<input class="acc-input" data-glurl="${id}" value="${esc(d.langs?.[id]?.[tab] || '')}" placeholder="${esc(name(tab))} video havolasi: https://..." inputmode="url" autocomplete="off">`}</div>`;
          }).join('')}
        </div>
        ${!main && d.ids.some(id => Object.values(d.langs?.[id] || {}).some(Boolean)) ? '<p class="adm-hint">Asosiy videolar tilini belgilang.</p>' : ''}
      </div>`;
}

function ungroupMovie(m) {
  if (m.groupOrig) { m.title = m.groupOrig.title; m.type = m.groupOrig.type; }
  delete m.parts;
  delete m.groupOrig;
  m.updatedAt = Date.now();
}

/* ---------- Telegram: o'z kanalingizdan video import (DezoCloud orqali) ----------
   DezoCloud (dezocloud.uz) Telegram akkauntingiz egasi/admini bo'lgan kanallarni ko'rsatadi.
   Tanlangan videolar Telegram ichida DezoCloud omboriga forward qilinadi (qayta yuklanmaydi),
   ulashish havolasi olinadi va kino sifatida data-custom.js ga yoziladi. Nomi post matnidan. */

const DC_URL = 'https://dezocloud.uz';
const DC_KEY = 'dezomax_dc_key';
const dcKey = () => localStorage.getItem(DC_KEY) || '';
let tgState = { channel: null, channels: null, items: [], next: null, sel: new Map() };   // sel: msgId -> title

async function dc(path, opts = {}) {
  const r = await fetch(DC_URL + path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + dcKey(), ...(opts.headers || {}) }
  }).catch(() => { throw new Error('DezoCloud serveriga ulanib bo‘lmadi'); });
  const j = await r.json().catch(() => ({}));
  if (r.status === 401 && !path.startsWith('/api/tg/key')) localStorage.removeItem(DC_KEY);
  if (!r.ok) throw Object.assign(new Error(j.error || `DezoCloud xatosi (${r.status})`), { status: r.status });
  return j;
}

const onSite = url => !!url && customList.some(m => m.video === url);
const fmtDur = s => { if (!s) return ''; s = Math.round(s); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60); return h ? `${h} soat ${m} daq.` : `${m || 1} daq.`; };
const fmtSize = b => b >= 1073741824 ? (b / 1073741824).toFixed(1) + ' GB' : Math.max(1, Math.round(b / 1048576)) + ' MB';

/* ---------- Kanallar: rasmiy YouTube kanallaridan seriallar va filmlar ----------
   js/data-channels.js: CHANNELS (kanallar ro'yxati) + CHANNEL_MOVIES (ularning kinolari, ch: kanal kaliti).
   «Yangilash» — DezoCloud kanal playlistlarini o'qiydi (fonda, 1–3 daqiqa), yangi qism/serial/film qo'shiladi,
   borlari yangilanadi; hech narsa o'chirilmaydi (vaqtincha ko'rinmagan playlist yo'qolmasin).
   Videolar yuklab olinmaydi — sayt YouTube pleyeri orqali ko'rsatadi. Faqat tasdiqlangan (✓) kanallar. */
const CH_PATH = 'js/data-channels.js';
let chState = null;           // { channels, items, sha }
let chBusy = null;            // { key, done, total, note }
const CH_KINDS = { series: 'Seriallar va filmlar (playlistlar)', trailers: 'Rasmiy treylerlar (Marvel kabi)' };

async function loadChannels() {
  const f = await getFile(CH_PATH);
  if (!f) { chState = { channels: [], items: [], sha: null }; return; }
  const text = b64decode(f.content);
  const part = (a, b) => JSON.parse(text.slice(text.indexOf(a) + a.length, text.indexOf(b)));
  chState = { channels: part('/*CHANNELS*/', '/*ENDCHANNELS*/'), items: part('/*CHDATA*/', '/*ENDCHDATA*/'), sha: f.sha };
}
function buildChannelsFile(channels, items) {
  return `/* DezoMax — rasmiy YouTube kanallaridan seriallar va filmlar (admin → «Kanallar» yozadi, qo'lda o'zgartirmang).
   Videolar YouTube pleyeri orqali ko'rsatiladi — yuklab olinmaydi. Qismlar ixcham: eps [[youtubeId, daqiqa], ...]. */
var CHANNELS = /*CHANNELS*/${JSON.stringify(channels)}/*ENDCHANNELS*/;
var CHANNEL_MOVIES = /*CHDATA*/[
${items.map(m => JSON.stringify(m)).join(',\n')}
]/*ENDCHDATA*/;
if (typeof MOVIES !== 'undefined') for (var i = 0; i < CHANNEL_MOVIES.length; i++) MOVIES.push(CHANNEL_MOVIES[i]);
`;
}
async function saveChannels(mutate, message) {
  for (let attempt = 0; attempt < 2; attempt++) {
    await loadChannels();
    const next = mutate({ channels: structuredClone(chState.channels), items: chState.items.slice() });
    try {
      const res = await putFile(CH_PATH, b64encode(buildChannelsFile(next.channels, next.items)), message, chState.sha);
      chState = { ...next, sha: res.content.sha };
      return;
    } catch (e) { if (e.status !== 409 || attempt) throw e; }
  }
}
const chNorm = s => String(s || '').toLowerCase().replace(/[‘’'`ʻ]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

async function renderChannelsView() {
  const box = $('#admView');
  if (!dcKey()) {
    box.innerHTML = `
      <section class="adm-sec">
        <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.yt}</span><h3>Kanallar</h3></div>
        <p class="acc-muted">Kanallarni yangilash DezoCloud orqali ishlaydi. Avval «Telegram» bo‘limida DezoCloud’ga ulaning (bir marta).</p>
        <button class="btn btn-primary" type="button" id="chToTg">DezoCloud’ga ulash</button>
      </section>`;
    $('#chToTg').addEventListener('click', () => go('tg'));
    return;
  }
  if (!chState) {
    box.innerHTML = '<div class="mt-loading"><i></i><i></i><i></i></div>';
    try { await loadChannels(); } catch (e) { box.innerHTML = `<p class="acc-error">${esc(friendlyError(e))}</p>`; return; }
    if (view !== 'channels') return;
  }
  const count = key => chState.items.filter(m => m.ch === key).length;
  box.innerHTML = `
    <section class="adm-sec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.yt}</span><h3>YouTube kanallari</h3><small>${chState.channels.length} ta</small></div>
      <p class="adm-hint">Yangi videolar uchun — «Yangilash».</p>
      <div class="acc-list">${chState.channels.map(c => `
        <div class="acc-item adm-item adm-ch">
          <span class="adm-ch-ico">${NAV_ICONS.yt}</span>
          <div class="acc-item-main"><b>${esc(c.name)}</b>
            <small>${esc(CH_KINDS[c.kind] || (c.kind === 'playlist' ? 'Ruxsat berilgan playlist' : c.kind))} · ${count(c.key)} ta · ${c.updatedAt ? 'yangilangan: ' + new Date(c.updatedAt).toLocaleString('uz') : 'hali yangilanmagan'}</small>
            <small><a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.url.replace('https://www.', ''))}</a></small>
            ${chBusy && chBusy.key === c.key ? `<div class="adm-ch-prog"><i style="width:${chBusy.total ? Math.round(chBusy.done / chBusy.total * 100) : 5}%"></i></div><small class="adm-ch-note">${chBusy.total ? `${chBusy.done}/${chBusy.total} · ` : ''}${esc(chBusy.note || 'Kanal o‘qilmoqda…')}</small>` : ''}
          </div>
          <div class="adm-actions">
            <button class="btn btn-primary btn-sm" type="button" data-chsync="${esc(c.key)}" ${chBusy ? 'disabled' : ''}>Yangilash</button>
            <button class="btn btn-ghost btn-sm adm-del" type="button" data-chdel="${esc(c.key)}" ${chBusy ? 'disabled' : ''}>O‘chirish</button>
          </div>
        </div>`).join('') || '<p class="acc-muted">Hozircha kanal yo‘q.</p>'}
      </div>
    </section>

    <section class="adm-sec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.film}</span><h3>Kinostudiyalar</h3><small>rasmiy kanal — rasmiy treylerlar</small></div>
      <p class="acc-muted adm-note"><span>Studiyani tanlab, «Tekshirish va qo‘shish».</span></p>
      <div class="adm-studios">${STUDIOS.map(x => {
        const on = chState.channels.some(c => c.franchise === x.key);
        return `<button type="button" class="adm-studio${on ? ' is-on' : ''}" data-studio="${x.key}" style="--studio:${x.bg}" ${on ? 'disabled' : ''}>
          <span class="adm-studio-logo">${x.logo}</span><span>${esc(x.name)}</span><small>${on ? '✓ qo‘shilgan' : 'Qo‘shish'}</small></button>`;
      }).join('')}</div>
    </section>

    <section class="adm-sec" id="chAddSec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.plus}</span><h3>Kanal qo‘shish</h3><small>faqat rasmiy (✓) kanallar</small></div>
      <div class="adm-field"><label class="adm-label" for="chUrl">Kanal havolasi</label>
        <input class="acc-input" id="chUrl" placeholder="https://www.youtube.com/@kanal" inputmode="url" autocomplete="off"></div>
      <div class="adm-row adm-row-2">
        <div class="adm-field"><label class="adm-label" for="chKind">Nima olinadi</label>
          <select class="acc-input" id="chKind">${Object.entries(CH_KINDS).map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}</select></div>
        <div class="adm-field"><label class="adm-label" for="chFr">Bo‘lim</label>
          <select class="acc-input" id="chFr">${[['uzbek', 'O‘zbek kino'], ['', 'Yo‘q'], ...STUDIOS.map(x => [x.key, x.name + ' (studiya)']), ['konsert', 'Konsert'], ['dorama', 'Koreys doramasi'], ['anime', 'Anime'], ['hind', 'Hind kino']].map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></div>
      </div>
      <label class="adm-rights"><input type="checkbox" id="chRights"><span>Bu kanal kontent egasining rasmiy kanali (studiya, telekanal, distribyutor) va uning videolarini saytda ko‘rsatish mumkin.</span></label>
      <p class="acc-error" id="chErr" hidden></p>
      <button class="btn btn-primary" type="button" id="chAdd" ${chBusy ? 'disabled' : ''}>Tekshirish va qo‘shish</button>
    </section>`;

  box.querySelectorAll('[data-chsync]').forEach(b => b.addEventListener('click', () => syncChannel(chState.channels.find(c => c.key === b.dataset.chsync))));
  // studiya tugmasi — formani to'ldiradi (rasmiy kanal, «Treylerlar», bo'lim — studiya)
  box.querySelectorAll('[data-studio]').forEach(b => b.addEventListener('click', () => {
    const x = STUDIOS.find(y => y.key === b.dataset.studio);
    $('#chUrl').value = x.channel;
    if ([...$('#chKind').options].some(o => o.value === 'trailers')) $('#chKind').value = 'trailers';
    $('#chFr').value = x.key;
    $('#chAddSec').scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast(`«${x.name}» — rasmiy ekanini tasdiqlab, «Tekshirish va qo‘shish» ni bosing`);
  }));
  box.querySelectorAll('[data-chdel]').forEach(b => b.addEventListener('click', () => {
    const c = chState.channels.find(x => x.key === b.dataset.chdel);
    if (!confirm(`«${c.name}» kanali va uning ${count(c.key)} ta kinosi saytdan olib tashlansinmi? (YouTube’dagi videolarga tegilmaydi)`)) return;
    runAction(b, () => saveChannels(st => ({ channels: st.channels.filter(x => x.key !== c.key), items: st.items.filter(m => m.ch !== c.key) }), `Kanal olib tashlandi: ${c.name}`), 'Kanal olib tashlandi');
  }));
  $('#chAdd').addEventListener('click', async e => {
    const err = $('#chErr'), btn = e.currentTarget;
    const show = m => { err.textContent = m; err.hidden = !m; };
    let url = $('#chUrl').value.trim();
    if (/^@[\w.-]+$/.test(url)) url = 'https://www.youtube.com/' + url;
    url = url.replace(/^https?:\/\/(m\.)?youtube\.com/i, 'https://www.youtube.com').replace(/[?#].*$/, '').replace(/\/(videos|playlists|featured|about|shorts|streams)\/?$/, '').replace(/\/+$/, '');
    if (!/^https:\/\/www\.youtube\.com\/(@[\w.-]+|channel\/UC[\w-]{22}|c\/[\w.-]+)$/.test(url)) return show('YouTube kanal havolasini kiriting: https://www.youtube.com/@kanal');
    if (!$('#chRights').checked) return show('Kanal rasmiy ekanini tasdiqlang.');
    show(''); btn.disabled = true; btn.textContent = 'Tekshirilmoqda…';
    try {
      const info = await dc('/api/yt/channel?url=' + encodeURIComponent(url));
      if (!info.verified) throw new Error(`«${info.name}» kanali YouTube’da tasdiqlanmagan (✓ yo‘q) — faqat rasmiy kanallar qo‘shiladi.`);
      if (chState.channels.some(c => c.url === info.url || c.id === info.id)) throw new Error('Bu kanal allaqachon ro‘yxatda — «Yangilash» ni bosing.');
      const key = (info.url.match(/@([\w.-]+)/)?.[1] || info.id).toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 20) || 'ch' + Date.now();
      const ch = { key, id: info.id, name: info.name, url: info.url, kind: $('#chKind').value, franchise: $('#chFr').value, prefix: key.slice(0, 6), updatedAt: null, count: 0 };
      await saveChannels(st => ({ channels: [...st.channels, ch], items: st.items }), `Kanal qo‘shildi: ${ch.name}`);
      toast(`«${ch.name}» qo‘shildi (${info.subs || ''} obunachi) — videolari yuklanmoqda…`);
      syncChannel(ch);
    } catch (ex) { show(ex.status ? ex.message : friendlyError(ex)); btn.disabled = false; btn.textContent = 'Tekshirish va qo‘shish'; }
  });
}

/* ---------- Ruxsat berilgan YouTube ma'lumotlari (to'lov serveri: server/server.js → /api/yt/playlist, /api/yt/meta) ----------
   - kind 'playlist' kanallar (egasi ruxsat bergan playlist, masalan FarZidGuy «Kino Tahlil») — yangi videolar shu yerda qo'shiladi
   - rasmiy o'zbek kanallari — yangi kino/serial kanal egasining video tavsifidan to'ldiriladi (mazmun, yil, janr, rejissyor, rollar)
   tools/fetch-yt-meta.js bilan bir xil natija. */
const YT_SERVER = 'https://pay.2-29-60-133.sslip.io';
async function ytApi(p) {
  const r = await fetch(YT_SERVER + p);
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'Server javob bermadi');
  return j;
}
const ytStableId = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return 7000000 + (h % 1000000); };
const ytSlug = s => s.toLowerCase().replace(/[‘’'`ʻ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'video';
const ytMinutes = len => { const p = String(len).split(':').map(Number); if (!p.length || p.some(isNaN)) return 0; const s = p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + (p[1] || 0); return Math.max(1, Math.round(s / 60)); };
const ytUz = s => String(s).replace(/([oOgG])['‘’`ʻ]/g, '$1‘').replace(/['`ʻ]/g, '’');
function ytVideoTitle(raw) {
  const parts = String(raw).replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').split(/\s*\|\s*/).map(p => p.replace(/\s{2,}/g, ' ').trim())
    .filter(p => p && !/^o['‘’`ʻ]?zbek tilida$/i.test(p));
  return parts.map(p => {
    const letters = p.replace(/[^\p{L}]/gu, '');
    if (letters && letters === letters.toUpperCase()) p = p.toLowerCase();
    return ytUz(p.replace(/(^|[.!?:]\s+|\s[-–—]\s+)(\p{L})/gu, (m, a, b) => a + b.toUpperCase()));
  }).join(' — ');
}
function applyYtMeta(m, meta) {
  const it = { ...m, meta: 1 };
  if (!meta || meta.error) return it;
  const generic = !it.desc || /kanalidagi|kanalidan/.test(it.desc.uz || '');
  if (meta.summary && meta.summary.length > 40 && generic) it.desc = { uz: ytUz(meta.summary), ru: it.desc?.ru || it.desc?.uz || '' };
  if (!it.year && meta.year) it.year = meta.year;
  if (meta.genres?.length && (!it.genres?.length || (it.genres.length === 1 && it.genres[0] === 'drama'))) it.genres = meta.genres;
  if (meta.cast?.length && !(it.cast || []).length) it.cast = meta.cast.map(ytUz);
  if (meta.director && !it.director) it.director = ytUz(meta.director);
  if (meta.writer && !it.writer) it.writer = ytUz(meta.writer);
  return it;
}
const ytFirstVideo = m => (m.eps && m.eps[0] && m.eps[0][0]) || (String(m.video || '').match(/[?&]v=([\w-]{11})/) || [])[1];

/* yangi kelgan (hali to'ldirilmagan) kinolar — bir yangilashda ko'pi bilan 30 ta, qolgani keyingi safar */
async function enrichChannel(ch, limit = 30) {
  const todo = chState.items.filter(m => m.ch === ch.key && !m.meta).slice(0, limit);
  const got = new Map();
  for (const [k, m] of todo.entries()) {
    Object.assign(chBusy, { done: k, total: todo.length, note: `Ma’lumot: ${m.title?.uz || ''}` });
    if (view === 'channels') renderChannelsView();
    const vid = ytFirstVideo(m);
    if (!vid) continue;
    try { got.set(m.id, await ytApi('/api/yt/meta?v=' + vid)); } catch { /* keyingi safar */ }
  }
  if (!got.size) return 0;
  await saveChannels(st => ({ channels: st.channels, items: st.items.map(m => got.has(m.id) ? applyYtMeta(m, got.get(m.id)) : m) }),
    `Ma’lumot to‘ldirildi: ${ch.name} (${got.size} ta)`);
  return got.size;
}

/* egasi ruxsat bergan playlist — yangi videolar qo'shiladi (bir safarda ko'pi bilan 40 ta) */
async function syncPlaylist(ch) {
  chBusy.note = 'Playlist o‘qilmoqda…';
  if (view === 'channels') renderChannelsView();
  const pl = await ytApi('/api/yt/playlist?list=' + encodeURIComponent(ch.playlist));
  // haqiqiy shortslar — kanalning «Shorts» bo'limidan; ular bo'limga emas, js/data-shorts.js ga (shorts.html lentasi)
  let shorts = null;
  if (ch.shorts && ch.id) { chBusy.note = 'Shorts o‘qilmoqda…'; shorts = (await ytApi('/api/yt/shorts?ch=' + encodeURIComponent(ch.id))).items; }
  const shortIds = new Set((shorts || []).map(x => x.id));
  const have = new Set(chState.items.filter(m => m.ch === ch.key).map(m => m.id));
  const fresh = pl.items.map((v, k) => ({ v, k, id: ytStableId(`${ch.prefix}:${v.id}`) }))
    .filter(x => !have.has(x.id) && x.v.len && !shortIds.has(x.v.id)).slice(0, 40);
  const add = [];
  for (const [n, { v, k, id }] of fresh.entries()) {
    Object.assign(chBusy, { done: n, total: fresh.length, note: v.title });
    if (view === 'channels') renderChannelsView();
    let meta = {};
    try { meta = await ytApi('/api/yt/meta?v=' + v.id); } catch {}
    const t = ytVideoTitle(v.title);
    add.push({
      id, slug: `${ch.prefix}-${ytSlug(t)}`, type: ch.type || 'tahlil', franchise: ch.franchise, audio: 'uz',
      title: { uz: t, ru: t }, genres: [], ...(meta.year ? { year: meta.year } : {}),
      country: { uz: 'O‘zbekiston', ru: 'Узбекистан' }, cast: [],
      desc: { uz: meta.summary && meta.summary.length > 30 ? ytUz(meta.summary) : `«${t}» — ${ch.name} kanalidagi kino tahlili, o‘zbek tilida.`, ru: `«${t}» — разбор фильма на узбекском языке с канала ${ch.name}.` },
      colors: ['#1a2a4a', '#070a12'],
      poster: `https://i.ytimg.com/vi/${v.id}/hq720.jpg`, wide: true, cover: `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
      trailer: '', video: `https://www.youtube.com/watch?v=${v.id}`, duration: ytMinutes(v.len) || meta.duration || 0,
      source: { name: ch.name, url: ch.url }, featured: false,
      addedAt: meta.published ? Date.parse(meta.published) : Date.now() - k * 60000, meta: 1, ch: ch.key,
    });
  }
  await saveChannels(st => {
    const ids = new Set(st.items.map(m => m.id));
    const items = [...st.items, ...add.filter(m => !ids.has(m.id))];
    return { items, channels: st.channels.map(c => c.key === ch.key ? { ...c, updatedAt: Date.now(), count: items.filter(m => m.ch === ch.key).length } : c) };
  }, `Playlist yangilandi: ${ch.name}${add.length ? ` (+${add.length})` : ''}`);
  let newShorts = 0;
  if (shorts) newShorts = await saveShorts(ch, shorts, new Map(pl.items.map(v => [v.id, v.len])));
  commitsCache = null;
  toast(add.length || newShorts ? `${ch.name}: ${add.length} ta yangi video, ${newShorts} ta yangi shorts — ~1 daqiqada saytda` : `${ch.name}: yangi video yo‘q`);
}

/* js/data-shorts.js — shu kanal shortslari yangilanadi (boshqa kanallarnikiga tegilmaydi). Natija: yangi shortslar soni */
const SHORTS_PATH = 'js/data-shorts.js';
function ytShortTitle(raw) {
  let t = String(raw).replace(/#[\p{L}\p{N}_]+/gu, '').replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').replace(/\s{2,}/g, ' ').trim();
  const letters = t.replace(/[^\p{L}]/gu, '');
  if (letters && letters === letters.toUpperCase()) t = t.toLowerCase();
  t = t.replace(/(^|[.!?]\s+)(\p{L})/gu, (m, a, b) => a + b.toUpperCase()).replace(/[\s|\-–—:]+$/, '');
  return ytUz(t || String(raw).trim());
}
async function saveShorts(ch, shorts, lenOf) {
  const secs = len => { const p = String(len || '').split(':').map(Number); return p.some(isNaN) ? 0 : p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + (p[1] || 0); };
  const f = await getFile(SHORTS_PATH);
  let cur = [];
  if (f) {
    const m = b64decode(f.content).match(/\/\*SHORTS\*\/([\s\S]*?)\/\*ENDSHORTS\*\//);
    if (!m) throw new Error('data-shorts.js o‘qilmadi — saqlanmadi');
    cur = JSON.parse(m[1]);
  }
  const mine = shorts.map(v => ({ id: v.id, t: ytShortTitle(v.title), ch: ch.key, n: ch.name, u: ch.url, s: secs(lenOf.get(v.id)) }));
  // himoya: YouTube bir martada kam qaytarsa ham avvalgilari o'chmaydi
  const keepOld = cur.filter(x => x.ch === ch.key && !mine.some(y => y.id === x.id));
  const next = [...mine, ...keepOld, ...cur.filter(x => x.ch !== ch.key)];
  const added = mine.filter(x => !cur.some(y => y.id === x.id)).length;
  if (!added && next.length === cur.length) return 0;
  const body = `/* DezoMax Shorts — ruxsat berilgan kanallarning qisqa videolari (tools/fetch-yt-meta.js, admin → «Kanallar» yozadi).\n   YouTube pleyeri orqali ko'rsatiladi (shorts.html). id — YouTube video ID, t — nomi, s — soniya. */\nvar SHORTS = /*SHORTS*/[\n${next.map(x => JSON.stringify(x)).join(',\n')}\n]/*ENDSHORTS*/;\n`;
  await putFile(SHORTS_PATH, b64encode(body), `Shorts yangilandi: ${ch.name}${added ? ` (+${added})` : ''}`, f && f.sha);
  return added;
}

async function syncChannel(ch) {
  if (!ch || chBusy) return;
  chBusy = { key: ch.key, done: 0, total: 0, note: '' };
  if (view === 'channels') renderChannelsView();
  try {
    if (ch.kind === 'playlist') { await syncPlaylist(ch); return; }
    const { job } = await dc('/api/yt/sync', { method: 'POST', body: JSON.stringify({ url: ch.url, kind: ch.kind, franchise: ch.franchise, prefix: ch.prefix }) });
    let j;
    for (;;) {
      await new Promise(r => setTimeout(r, 3000));
      j = await dc('/api/yt/sync/' + job);
      Object.assign(chBusy, { done: j.done, total: j.total, note: j.note });
      if (view === 'channels') renderChannelsView();
      if (j.state !== 'run') break;
    }
    if (j.state === 'error') throw new Error(j.error);
    // saytda allaqachon bor kinolar (boshqa manbadan) takrorlanmaydi
    // (katalog kutubxonasidagi videosiz kartalar hisobga olinmaydi — faqat saytda ko'rinadiganlar)
    const others = allMovies().filter(m => !m.ch && (hasFilm(m) || m.franchise === 'marvel'));
    const known = new Set(others.flatMap(m => [m.title?.uz, m.title?.ru, ...(m.tags || [])]).filter(Boolean).map(chNorm));
    if (typeof MARVEL_INFO !== 'undefined') Object.values(MARVEL_INFO).forEach(x => x.en && known.add(chNorm(x.en)));
    let added = 0, updated = 0;
    await saveChannels(st => {
      const items = st.items.slice();
      const byId = new Map(items.map((m, i) => [m.id, i]));
      // studiya treylerlari (Marvel'dan boshqa): DezoCloud matni Marvel uchun yozilgan — studiyaga moslanadi;
      // tools/fetch-studio-trailers.js qo'shgan ma'lumotlar (ruscha nom, yil, aktyorlar, teglar) saqlanadi
      const studio = ch.kind === 'trailers' && ch.franchise !== 'marvel' && typeof STUDIOS !== 'undefined' ? STUDIOS.find(s => s.key === ch.franchise) : null;
      // DreamWorks treylerlari Universal kanalida (studio.via) — yangilarini Universal oladi, bu yerda faqat borlari yangilanadi
      const shared = studio && studio.via;
      const KEEP = ['title', 'desc', 'tags', 'year', 'cast', 'director', 'genres', 'type', 'wd', 'slug', 'colors', 'id'];
      // video tavsifidan to'ldirilganlar (meta) — DezoCloud'ning qisqa matni ustidan yozilmaydi
      const KEEP_META = ['desc', 'year', 'cast', 'director', 'writer', 'genres', 'meta'];
      // skript yozgan treylerlarning ID'si boshqacha — bir xil YouTube video bo'lsa, o'sha yozuv yangilanadi
      const byTrailer = new Map(items.map((m, i) => [m.ch === ch.key && m.trailer, i]));
      for (const m of j.items || []) {
        let it = { ...m, ch: ch.key };
        if (studio) {
          const { mx, ...rest } = it;
          it = { ...rest, desc: { uz: `«${m.title.uz}» — ${studio.name}. Rasmiy treyler.`, ru: `«${m.title.ru}» — ${studio.name}. Официальный трейлер.` } };
          if (!byId.has(m.id) && byTrailer.has(m.trailer)) byId.set(m.id, byTrailer.get(m.trailer));
        }
        if (byId.has(m.id)) {
          const old = items[byId.get(m.id)];
          if (studio) KEEP.forEach(k => { if (old[k] !== undefined) it[k] = old[k]; });
          else if (old.meta) KEEP_META.forEach(k => { if (old[k] !== undefined) it[k] = old[k]; });
          items[byId.get(m.id)] = it; updated++; continue;
        }
        if (shared) continue;
        if (known.has(chNorm(m.title.uz)) || (m.mx && known.has(chNorm(m.mx.en)))) continue;
        items.push(it); byId.set(m.id, items.length - 1); added++;
      }
      const channels = st.channels.map(c => c.key === ch.key ? { ...c, name: j.channel?.name || c.name, updatedAt: Date.now(), count: items.filter(m => m.ch === ch.key).length } : c);
      return { channels, items };
    }, `Kanal yangilandi: ${ch.name}`);
    commitsCache = null;
    toast(added ? `${ch.name}: ${added} ta yangi, ${updated} ta yangilandi — ~1 daqiqada saytda` : `${ch.name}: yangi video yo‘q (${updated} ta tekshirildi)`);
    // seriallar/filmlar kanali — yangilari kanal egasining video tavsifidan to'ldiriladi
    if (ch.kind === 'series') {
      try { const n = await enrichChannel(ch); if (n) toast(`${ch.name}: ${n} ta kinoga ma’lumot qo‘shildi (yil, janr, rollar)`); }
      catch (e) { toast('Ma’lumot to‘ldirilmadi: ' + (e.message || ''), true); }
    }
  } catch (e) {
    toast(e.message || 'Yangilanmadi', true);
  } finally {
    chBusy = null;
    if (view === 'channels') renderChannelsView();
  }
}

async function renderTgView() {
  const box = $('#admView');
  if (!dcKey()) {
    box.innerHTML = `
      <section class="adm-sec">
        <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.tg}</span><h3>DezoCloud’ga ulash</h3><small>bir marta</small></div>
        <p class="acc-muted">Telegram kanalingizdagi videolar DezoCloud orqali saytga qo‘shiladi. Ulash uchun DezoCloud (dezocloud.uz) parolini kiriting — u faqat kalit olish uchun ishlatiladi, saqlanmaydi.</p>
        <div class="adm-field">
          <label class="adm-label" for="dcPass">DezoCloud paroli</label>
          <input class="acc-input" id="dcPass" type="password" autocomplete="current-password">
        </div>
        <p class="acc-error" id="dcErr" hidden></p>
        <button class="btn btn-primary" type="button" id="dcLogin">Ulash</button>
      </section>`;
    const go1 = async () => {
      const btn = $('#dcLogin'), err = $('#dcErr');
      btn.disabled = true; err.hidden = true;
      try {
        const j = await dc('/api/tg/key', { method: 'POST', body: JSON.stringify({ password: $('#dcPass').value }) });
        localStorage.setItem(DC_KEY, j.key);
        renderTgView();
      } catch (e) { err.textContent = e.message; err.hidden = false; btn.disabled = false; }
    };
    $('#dcLogin').addEventListener('click', go1);
    $('#dcPass').addEventListener('keydown', e => { if (e.key === 'Enter') go1(); });
    return;
  }

  box.innerHTML = '<div class="mt-loading"><i></i><i></i><i></i></div>';
  try {
    if (!tgState.channels) tgState.channels = (await dc('/api/tg/channels')).items;
  } catch (e) {
    if (e.status === 401) return renderTgView();
    box.innerHTML = `<p class="acc-error">${esc(e.message)}</p>`; return;
  }
  if (view !== 'tg') return;
  const chans = tgState.channels;
  if (!tgState.channel && chans.length === 1) tgState.channel = chans[0].id;

  box.innerHTML = `
    <section class="adm-sec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.tg}</span><h3>Telegramdan qo‘shish</h3><small>faqat o‘z kanallaringiz</small></div>
      <div class="adm-field">
        <label class="adm-label" for="tgLink">Kanal havolasi</label>
        <div class="adm-tg-link">
          <input class="acc-input" id="tgLink" placeholder="https://t.me/kanal_nomi yoki @kanal_nomi" autocomplete="off" spellcheck="false">
          <button class="btn btn-primary" type="button" id="tgLinkGo">Topish</button>
        </div>
        <p class="acc-error" id="tgLinkErr" hidden></p>
      </div>
      ${chans.length ? `
      <div class="adm-field">
        <label class="adm-label" for="tgChan">Kanal</label>
        <select class="acc-input" id="tgChan">
          <option value="">— kanalni tanlang —</option>
          ${chans.map(c => `<option value="${esc(c.id)}"${c.id === tgState.channel ? ' selected' : ''}>${esc(c.title)}${c.username ? ` (@${esc(c.username)})` : ''}</option>`).join('')}
        </select>
      </div>` : `<p class="acc-muted">Telegram akkauntingiz egasi yoki admini bo‘lgan kanal topilmadi. Kanal ochib (yoki mavjud kanalga shu akkauntni admin qilib), <button class="acc-link" type="button" id="tgRefresh">qayta tekshiring</button>.</p>`}
      <div id="tgList"></div>
    </section>`;

  $('#tgRefresh')?.addEventListener('click', async () => {
    tgState.channels = (await dc('/api/tg/channels?refresh=1').catch(() => ({ items: [] }))).items; renderTgView();
  });
  const findLink = async () => {
    const inp = $('#tgLink'), btn = $('#tgLinkGo'), err = $('#tgLinkErr');
    const link = inp.value.trim();
    if (!link) return inp.focus();
    err.hidden = true; btn.disabled = true; btn.textContent = 'Qidirilmoqda…';
    try {
      const ch = await dc('/api/tg/resolve?link=' + encodeURIComponent(link));
      if (!tgState.channels.some(c => c.id === ch.id)) tgState.channels = [ch, ...tgState.channels];
      tgState = { ...tgState, channel: ch.id, items: [], next: null, sel: new Map() };
      renderTgView();
    } catch (e) {
      err.textContent = e.message; err.hidden = false;
      btn.disabled = false; btn.textContent = 'Topish';
    }
  };
  $('#tgLinkGo').addEventListener('click', findLink);
  $('#tgLink').addEventListener('keydown', e => { if (e.key === 'Enter') findLink(); });
  $('#tgChan')?.addEventListener('change', e => {
    tgState = { ...tgState, channel: e.target.value || null, items: [], next: null, sel: new Map() };
    loadTgVideos(true);
  });
  if (tgState.channel) tgState.items.length ? drawTgList() : loadTgVideos(true);
}

async function loadTgVideos(reset) {
  const list = $('#tgList');
  if (!list || !tgState.channel) { if (list) list.innerHTML = ''; return; }
  if (reset) list.innerHTML = '<div class="mt-loading"><i></i><i></i><i></i></div>';
  try {
    const j = await dc(`/api/tg/videos?channel=${encodeURIComponent(tgState.channel)}${!reset && tgState.next ? `&offset=${tgState.next}` : ''}`);
    tgState.items = reset ? j.items : [...tgState.items, ...j.items];
    tgState.next = j.next;
    if (view === 'tg') drawTgList();
  } catch (e) { list.innerHTML = `<p class="acc-error">${esc(e.message)}</p>`; }
}

function drawTgList() {
  const list = $('#tgList');
  if (!list) return;
  const items = tgState.items;
  const thumb = it => it.hasThumb ? `${DC_URL}/api/tg/thumb?channel=${encodeURIComponent(tgState.channel)}&msg=${it.msgId}&k=${encodeURIComponent(dcKey())}` : '';

  list.innerHTML = `
    ${items.length ? `
    <div class="adm-tg-bar">
      <span class="acc-muted">${items.length} ta video${tgState.next ? '+' : ''}</span>
      <button class="acc-link" type="button" id="tgAll">Qo‘shilmaganlarning hammasini belgilash</button>
    </div>
    <div class="adm-tg-grid">
      ${items.map(it => `
        <label class="adm-tg-item${onSite(it.imported) ? ' is-done' : ''}${tgState.sel.has(it.msgId) ? ' is-sel' : ''}">
          <span class="adm-tg-thumb">${thumb(it) ? `<img src="${esc(thumb(it))}" alt="" loading="lazy" onerror="this.remove()">` : ''}
            ${it.duration ? `<em>${fmtDur(it.duration)}</em>` : ''}</span>
          <span class="adm-tg-body">
            <input class="acc-input adm-tg-title" data-title="${it.msgId}" value="${esc(tgState.sel.get(it.msgId) ?? it.title)}" ${onSite(it.imported) ? 'disabled' : ''}>
            <small>${fmtSize(it.size)} · ${new Date(it.date).toLocaleDateString('uz')}${it.caption ? ` · ${esc(it.caption.split('\n')[0].slice(0, 60))}` : ''}</small>
          </span>
          ${onSite(it.imported) ? '<span class="adm-tg-done">Saytda bor ✓</span>' : `<input type="checkbox" class="adm-tg-check" data-msg="${it.msgId}"${tgState.sel.has(it.msgId) ? ' checked' : ''}>`}
        </label>`).join('')}
    </div>
    ${tgState.next ? '<button class="btn btn-ghost" type="button" id="tgMore">Yana yuklash</button>' : ''}` : '<p class="acc-muted">Bu kanalda video topilmadi.</p>'}

    <div class="adm-tg-opts">
      <div class="adm-row adm-row-2">
        <div class="adm-field"><label class="adm-label">Turi</label>
          <select class="acc-input" id="tgType">${['film', 'serial', 'multfilm'].map(x => `<option value="${x}">${typeName(x)}</option>`).join('')}</select></div>
        <div class="adm-field"><label class="adm-label">Janr</label>
          <select class="acc-input" id="tgGenre">${GENRES.map(g => `<option value="${g.id}"${g.id === 'drama' ? ' selected' : ''}>${esc(g.uz)}</option>`).join('')}</select></div>
        <div class="adm-field"><label class="adm-label">Bo‘lim</label>
          <select class="acc-input" id="tgFr">${[['', 'Yo‘q'], ['uzbek', 'O‘zbek kino'], ['konsert', 'Konsert'], ['dorama', 'Koreys doramasi'], ['anime', 'Anime'], ['hind', 'Hind kino']].map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></div>
        <label class="acc-toggle adm-tg-uz"><span><b>O‘zbek tilida</b></span><input type="checkbox" id="tgUz" checked><i></i></label>
      </div>
      <label class="adm-rights">
        <input type="checkbox" id="tgRights">
        <span>Bu videolar menga tegishli yoki ularni ko‘rsatish huquqiga egaman.</span>
      </label>
      <p class="acc-error" id="tgErr" hidden></p>
      <button class="btn btn-primary" type="button" id="tgImport" ${tgState.sel.size ? '' : 'disabled'}>${NAV_ICONS.plus}<span>Saytga qo‘shish (${tgState.sel.size})</span></button>
    </div>`;

  const upd = () => {
    const b = $('#tgImport');
    b.disabled = !tgState.sel.size;
    b.querySelector('span').textContent = `Saytga qo‘shish (${tgState.sel.size})`;
  };
  list.querySelectorAll('.adm-tg-check').forEach(cb => cb.addEventListener('change', () => {
    const id = +cb.dataset.msg;
    const title = list.querySelector(`[data-title="${id}"]`).value;
    cb.checked ? tgState.sel.set(id, title) : tgState.sel.delete(id);
    cb.closest('.adm-tg-item').classList.toggle('is-sel', cb.checked);
    upd();
  }));
  list.querySelectorAll('.adm-tg-title').forEach(inp => {
    inp.addEventListener('click', e => e.preventDefault());   // label ichida — belgi o'zgarmasin
    inp.addEventListener('input', () => { const id = +inp.dataset.title; if (tgState.sel.has(id)) tgState.sel.set(id, inp.value); });
  });
  $('#tgAll')?.addEventListener('click', () => {
    for (const it of items) if (!onSite(it.imported)) tgState.sel.set(it.msgId, list.querySelector(`[data-title="${it.msgId}"]`).value);
    drawTgList();
  });
  $('#tgMore')?.addEventListener('click', e => { e.target.disabled = true; loadTgVideos(false); });
  $('#tgImport').addEventListener('click', importTgSelected);
}

async function importTgSelected() {
  const err = $('#tgErr'), btn = $('#tgImport');
  const showErr = m => { err.textContent = m; err.hidden = !m; };
  if (!$('#tgRights').checked) return showErr('Videolar sizniki ekanini tasdiqlang.');
  const picked = [...tgState.sel].map(([msgId, title]) => ({ msgId, title: String(title).trim() }));
  if (picked.some(p => !p.title)) return showErr('Har bir videoga nom yozing.');
  showErr('');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'DezoCloud’ga qo‘shilmoqda…';

  const opts = { type: $('#tgType').value, genre: $('#tgGenre').value, franchise: $('#tgFr').value, uz: $('#tgUz').checked };
  try {
    // 25 tadan — tugmada jarayon ko'rinib turadi (avval bitta so'rov daqiqalab «qotib» turardi)
    const items = [];
    const CHUNK = 25;
    for (let i = 0; i < picked.length; i += CHUNK) {
      btn.querySelector('span').textContent = `DezoCloud’ga qo‘shilmoqda… ${Math.min(i + CHUNK, picked.length)}/${picked.length}`;
      const part = await dc('/api/tg/import', { method: 'POST', body: JSON.stringify({ channel: tgState.channel, items: picked.slice(i, i + CHUNK) }) });
      items.push(...part.items);
    }
    // DezoCloud'da bor, lekin saytga yozilmay qolganlar (oldingi urinish yarim qolgan bo'lsa) ham qo'shiladi
    const ok = items.filter(r => r.ok && !onSite(r.url));
    const failed = items.filter(r => !r.ok);
    const byMsg = new Map(tgState.items.map(it => [it.msgId, it]));
    const titleOf = new Map(picked.map(p => [p.msgId, p.title]));

    if (ok.length) {
      btn.querySelector('span').textContent = 'Saytga yozilmoqda…';
      let id = nextId();
      const now = Date.now();
      const movies = ok.map(r => {
        const it = byMsg.get(r.msgId) || {};
        const title = titleOf.get(r.msgId);
        const desc = (it.caption || '').replace(/https?:\/\/\S+|(^|\s)[@#][\wЀ-ӿ]+/g, ' ').replace(/[ \t]+/g, ' ').trim().slice(0, 600);
        const m = {
          id: id++, slug: slugify(title), type: opts.type,
          title: { uz: title, ru: title },
          genres: [opts.genre],
          country: { uz: '—', ru: '—' },
          cast: [],
          desc: { uz: desc, ru: desc },
          colors: ['#2a3142', '#0d1018'],
          poster: r.thumb || '',
          trailer: '',
          video: r.url,
          featured: false,
          addedAt: now, updatedAt: now
        };
        if (it.duration) m.duration = Math.max(1, Math.round(it.duration / 60));
        if (it.size) m.size = it.size;     // fayl hajmi (bayt) — Guruhlarda hajm bo'yicha tartiblash uchun
        if (it.date) m.year = new Date(it.date).getFullYear();
        if (opts.franchise) m.franchise = opts.franchise;
        if (opts.uz) m.audio = 'uz';
        return m;
      });
      await saveCustom(list => [...list, ...movies], `Telegramdan qo‘shildi: ${movies.length} ta video`);
      commitsCache = null;
    }
    for (const r of items) if (r.ok) { tgState.sel.delete(r.msgId); const it = byMsg.get(r.msgId); if (it) it.imported = r.url; }
    drawTgList();
    if (failed.length) {
      $('#tgErr').textContent = failed.map(f => `${titleOf.get(f.msgId) || f.msgId}: ${f.error}`).join('\n');
      $('#tgErr').hidden = false;
    }
    toast(ok.length ? `${ok.length} ta video saytga qo‘shildi — ~1 daqiqada ko‘rinadi` : (failed.length ? 'Qo‘shilmadi' : 'Hammasi allaqachon saytda'), !ok.length && !!failed.length);
  } catch (e) {
    showErr(e.status ? e.message : friendlyError(e));
    btn.disabled = false;
    btn.querySelector('span').textContent = `Saytga qo‘shish (${tgState.sel.size})`;
  }
}

/* ---------- Ishga tushirish ---------- */

/* Admin ilovasi (va brauzer) admin.html ni 10 daqiqagacha keshdan ochadi — yangi versiya chiqqan bo'lsa,
   sahifani keshsiz qayta yuklaymiz (bir sessiyada bir marta, aylanib qolmasligi uchun). */
async function checkAdminUpdate() {
  try {
    const mine = (document.querySelector('script[src*="js/admin.js"]')?.getAttribute('src').match(/v=(\d+)/) || [])[1];
    if (!mine) return;
    const html = await (await fetch('admin.html?nc=' + Date.now(), { cache: 'no-store' })).text();
    const live = (html.match(/js\/admin\.js\?v=(\d+)/) || [])[1];
    if (live && live !== mine && sessionStorage.getItem('dezomax_admin_reload') !== live) {
      sessionStorage.setItem('dezomax_admin_reload', live);
      location.replace(location.pathname + '?v=' + live + location.hash);
    }
  } catch {}
}

async function boot() {
  checkAdminUpdate();
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

/* ---------- Zaxira: kinolar faylining avvalgi holatlari va tiklash ----------
   Har bir saqlash GitHub'da alohida nusxa (commit) bo'lib qoladi. Bu yerda oxirgi 40 tasi ko'rinadi:
   «Sanash» — o'sha paytda nechta kino bo'lgani, «Tiklash» — o'sha holatni qaytarish.
   GitHub'dagi qo'riqchi (tools/data-guard.js) ko'p kino yo'qolsa o'zi ham tiklaydi. */
const bkCounts = new Map();     // commit sha → { custom, hidden, text }

async function versionAt(sha) {
  if (bkCounts.has(sha)) return bkCounts.get(sha);
  const f = await getFile(DATA_PATH, sha);
  const text = f ? b64decode(f.content) : '';
  const m = text.match(/\/\*DATA\*\/([\s\S]*?)\/\*END\*\//);
  const h = text.match(/\/\*HIDDEN\*\/([\s\S]*?)\/\*ENDHIDDEN\*\//);
  const v = { custom: m ? JSON.parse(m[1]).length : null, hidden: h ? JSON.parse(h[1]).length : 0, text: m ? text : '' };
  bkCounts.set(sha, v);
  return v;
}

/* ---------- Dublikatlar: saytda ishlayotgan (videosi bor, yashirilmagan) kinolar ichida takrorlar ----------
   Aniq — bir xil video (YouTube ID yoki bir xil havola). Ehtimoliy — bir xil nom (uz/ru/«A / B» qismlari, shovqin so'zlarsiz),
   bir xil tur, yili mos (yoki biri yo'q), davomiyligi yaqin. Ortiqchalari O'CHIRILMAYDI — yashiriladi (Kinolar → Yashirilgan → Ko'rsatish).
   Qaysi biri qoladi: ma'lumoti to'liqrog'i (poster, tavsif, yil, janr, o'zbekcha, aktyorlar), teng bo'lsa — eskirog'i (kichik ID). */
const DUP_IGNORE = 'dzx_dup_ignore';
const DUP_NOISE = new Set(['uzbek', 'ozbek', 'uzbekcha', 'ozbekcha', 'tilida', 'tarjima', 'tarjimasi', 'kino', 'kinolar', 'kinosi', 'film', 'filmi', 'filmlar',
  'multfilm', 'multfilmi', 'serial', 'seriali', 'hd', 'fullhd', 'full', '720p', '1080p', '4k', 'premyera', 'yangi', 'jahon', 'ujas', 'uzhas',
  'treyler', 'trailer', 'official', 'smotret', 'onlayn', 'online', 'na', 'v', 'horoshem', 'kachestve', 'barcha', 'qismlar', 'nomi', 'kinoning']);
let dupState = { shown: 40 };

function dupVideoKey(m) {
  const v = String(m.video || '').trim();
  if (!v) return '';
  const yt = v.match(/(?:[?&]v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  if (yt) return 'yt:' + yt[1];
  try { const u = new URL(v); return 'u:' + u.host.replace(/^www\./, '') + u.pathname.replace(/\/+$/, '') + u.search; } catch { return 'u:' + v; }
}
function dupTitles(m) {
  const raw = [m.title?.uz, m.title?.ru].filter(Boolean).flatMap(t => String(t).split(/\s+\/\s+|\s+\|\s+/));
  const out = new Set();
  for (const t of raw) {
    // qavs ichidagi «2-qism» saqlanadi (qismlar dublikat emas), yillar olib tashlanadi — yil alohida solishtiriladi
    const words = norm(t).replace(/[​-‏﻿]/g, '').replace(/\b(19[0-9]{2}|20[0-9]{2})\b/g, ' ')
      .replace(/[^\p{L}\p{N}]+/gu, ' ').split(' ').filter(w => w && !DUP_NOISE.has(w));
    const key = words.join(' ');
    // juda umumiy nomlar («kodi», «1») bo'yicha birlashtirilmaydi
    if (key.replace(/\s/g, '').length >= 4 && !/^(kino )?kodi?$|^qism|^\d+$/.test(key)) out.add(key);
  }
  return [...out];
}
function dupScore(m) {
  return (m.poster ? 3 : 0) + ((m.desc?.uz || '').length > 40 ? 2 : 0) + (m.year ? 1 : 0) + ((m.genres || []).length ? 1 : 0)
    + (m.audio === 'uz' ? 2 : 0) + ((m.cast || []).length ? 1 : 0) + (m.duration ? 1 : 0);
}

/* Bir xil ID'li bir nechta yozuv (Telegram importidagi xato). Yashirish ID bo'yicha ishlaydi — avval shularni tuzatish kerak.
   copies — aynan bir xil nusxalar (ortiqchasi olib tashlanadi), clashes — turli kinolar bir ID'da (keyingisiga yangi ID). */
function idCollisions() {
  const by = new Map();
  for (const m of addedList()) { if (!by.has(m.id)) by.set(m.id, []); by.get(m.id).push(m); }
  let copies = 0, clashes = 0;
  const ids = [];
  for (const [id, list] of by) {
    if (list.length < 2) continue;
    ids.push(id);
    const seen = new Set();
    for (const m of list) { const s = JSON.stringify(m); if (seen.has(s)) copies++; else { if (seen.size) clashes++; seen.add(s); } }
  }
  return { ids: new Set(ids), copies, clashes };
}

function fixIdCollisions(list) {
  let free = nextId();
  const byId = new Map();                 // id → shu id'dagi saqlangan nusxalar (JSON)
  const out = [];
  for (const m of list) {
    if (isBase(m.id)) { out.push(m); continue; }
    const s = JSON.stringify(m), seen = byId.get(m.id);
    if (!seen) { byId.set(m.id, new Set([s])); out.push(m); continue; }
    if (seen.has(s)) continue;            // aynan nusxa — olib tashlanadi
    seen.add(s);
    out.push({ ...m, id: free++ });       // boshqa kino — yangi ID
  }
  return out;
}

function findDuplicates(skipIds = new Set()) {
  const items = allMovies().filter(m => hasFilm(m) && !hiddenList.includes(m.id) && !skipIds.has(m.id) && !(Array.isArray(m.parts) && m.parts.length > 1));
  const parent = new Map(items.map(m => [m.id, m.id]));
  const find = x => { while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x))); x = parent.get(x); } return x; };
  const why = new Map();      // ildiz → 'video' | 'title'
  const join = (a, b, reason) => {
    const ra = find(a.id), rb = find(b.id);
    if (ra === rb) return;
    parent.set(rb, ra);
    const r = why.get(ra) === 'video' || why.get(rb) === 'video' || reason === 'video' ? 'video' : 'title';
    why.set(ra, r);
  };
  // 1) bir xil video
  const byVideo = new Map();
  for (const m of items) {
    const k = dupVideoKey(m);
    if (!k) continue;
    if (byVideo.has(k)) join(byVideo.get(k), m, 'video'); else byVideo.set(k, m);
  }
  // 2) bir xil nom + tur, yili va davomiyligi mos
  const byTitle = new Map();
  for (const m of items) for (const t of dupTitles(m)) {
    const k = (m.type || 'film') + '|' + t;
    if (!byTitle.has(k)) byTitle.set(k, []);
    byTitle.get(k).push(m);
  }
  const fits = (a, b) => (!a.year || !b.year || a.year === b.year)
    && (!a.duration || !b.duration || Math.abs(a.duration - b.duration) <= Math.max(a.duration, b.duration) * 0.15);
  for (const list of byTitle.values()) {
    if (list.length < 2 || list.length > 12) continue;          // 12 dan ko'p bir xil nom — umumiy so'z, dublikat emas
    // ketma-ket qo'shilgan, videolari har xil 3+ yozuv — serial qismlari («LOKI» × 7), dublikat emas
    const vids = new Set(list.map(dupVideoKey)), idsSorted = list.map(m => m.id).sort((a, b) => a - b);
    if (list.length >= 3 && vids.size === list.length && idsSorted[idsSorted.length - 1] - idsSorted[0] < list.length * 3) continue;
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) if (fits(list[i], list[j])) join(list[i], list[j], 'title');
  }
  const groups = new Map();
  for (const m of items) {
    const r = find(m.id);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r).push(m);
  }
  let ignore = [];
  try { ignore = JSON.parse(localStorage.getItem(DUP_IGNORE) || '[]'); } catch {}
  return [...groups.entries()].filter(([, g]) => g.length > 1).map(([r, g]) => {
    g.sort((a, b) => dupScore(b) - dupScore(a) || a.id - b.id);
    return { key: g.map(m => m.id).sort((a, b) => a - b).join(','), exact: why.get(r) === 'video', items: g, keep: g[0].id };
  }).filter(x => !ignore.includes(x.key))
    .sort((a, b) => b.exact - a.exact || b.items.length - a.items.length);
}

function dupHost(m) {
  const k = dupVideoKey(m);
  return k.startsWith('yt:') ? 'YouTube' : k.slice(2).split('/')[0];
}

function renderDupView() {
  const box = $('#admView');
  box.innerHTML = '<div class="mt-loading"><i></i><i></i><i></i></div>';
  setTimeout(() => {                                      // hisoblash bir oz vaqt oladi — avval yuklanish ko'rinsin
    if (view !== 'dups') return;
    const coll = idCollisions();
    const groups = findDuplicates(coll.ids);
    dupState.groups = groups;
    const exact = groups.filter(g => g.exact), extra = exact.reduce((s, g) => s + g.items.length - 1, 0);
    const extraAll = groups.reduce((s, g) => s + g.items.length - 1, 0);
    box.innerHTML = `
      ${coll.ids.size ? `<section class="adm-sec adm-warn">
        <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.shield}</span><h3>Bir xil ID’li yozuvlar</h3><small>${coll.ids.size} ta ID</small></div>
        <p class="adm-hint">${coll.copies ? `${coll.copies} ta nusxa` : ''}${coll.copies && coll.clashes ? ', ' : ''}${coll.clashes ? `${coll.clashes} ta kino eski ID bilan` : ''} — hech biri yo‘qolmaydi.</p>
        <button class="btn btn-primary" type="button" id="dupFixIds">ID’larni tuzatish</button>
      </section>` : ''}
      <section class="adm-sec">
        <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.copy}</span><h3>Dublikatlar</h3><small>${groups.length} ta guruh · ${extraAll} ta ortiqcha</small></div>
        <p class="adm-hint"><b>Aniq</b> — bir xil video, <b>ehtimoliy</b> — bir xil nom. Ortiqchasi yashiriladi, qaytarish mumkin.</p>
        ${extra ? `<button class="btn btn-primary" type="button" id="dupAllExact">Aniq dublikatlarni yashirish (${extra} ta)</button>` : ''}
      </section>
      ${groups.length ? `<div class="adm-dups">${groups.slice(0, dupState.shown).map(dupGroupHTML).join('')}</div>
        ${groups.length > dupState.shown ? `<button class="btn btn-ghost adm-more" type="button" id="dupMore">Yana ${groups.length - dupState.shown} ta guruh</button>` : ''}`
        : '<section class="adm-sec"><p class="acc-muted">Dublikat topilmadi 🎉</p></section>'}`;
    bindDupView();
  }, 30);
}

function dupGroupHTML(g) {
  const ids = g.items.map(m => m.id);
  // videolari har xil va ketma-ket qo'shilgan — 1- va 2-qism bo'lishi mumkin
  const parts = !g.exact && new Set(g.items.map(dupVideoKey)).size === g.items.length && Math.max(...ids) - Math.min(...ids) < g.items.length * 2;
  return `
    <section class="adm-sec adm-dup" data-dup="${g.key}">
      <div class="adm-dup-head"><span class="adm-state ${g.exact ? 'is-hide' : 'is-edit'}">${g.exact ? 'Aniq · bir xil video' : 'Ehtimoliy · bir xil nom'}</span><small>${g.items.length} ta</small></div>
      ${parts ? '<p class="adm-dup-warn">1- va 2-qism bo‘lishi mumkin.</p>' : ''}
      ${g.items.map(m => `
        <label class="acc-item adm-item adm-dup-item">
          <input type="radio" name="keep-${g.key}" value="${m.id}" ${m.id === g.keep ? 'checked' : ''}>
          <span class="adm-thumb">${m.poster ? `<img src="${esc(m.poster)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ''}</span>
          <span class="acc-item-main"><b>${esc(m.title?.uz || '')}</b>
            <small>${[m.year, typeName(m.type), m.audio === 'uz' ? 'O‘zbekcha' : '', dupHost(m), `ID ${m.id}`].filter(Boolean).map(esc).join(' · ')}</small></span>
          <span class="adm-dup-tag"></span>
          <a class="btn btn-ghost btn-sm" href="${SITE_URL}movie.html?id=${m.id}" target="_blank" rel="noopener">Ko‘rish</a>
        </label>`).join('')}
      <div class="adm-actions">
        <button class="btn btn-primary btn-sm" type="button" data-duphide="${g.key}">Qolganini yashirish</button>
        <button class="btn btn-ghost btn-sm" type="button" data-dupskip="${g.key}">Dublikat emas</button>
      </div>
    </section>`;
}

function bindDupView() {
  const byKey = new Map(dupState.groups.map(g => [g.key, g]));
  const keepOf = g => +(document.querySelector(`input[name="keep-${g.key}"]:checked`)?.value || g.keep);
  const hideIds = (ids, msg, btn) => runAction(btn, () => saveCustom((list, hidden) => {
    for (const id of ids) if (!hidden.includes(id)) hidden.push(id);
    return list;
  }, msg), `${ids.length} ta dublikat yashirildi`).then(() => { if (view === 'dups') renderDupView(); });

  $('#dupMore')?.addEventListener('click', () => { dupState.shown += 40; renderDupView(); });
  $('#dupFixIds')?.addEventListener('click', e => {
    const c = idCollisions();
    if (!confirm(`${c.copies} ta aynan nusxa olib tashlansin, ${c.clashes} ta kinoga yangi ID berilsinmi?`)) return;
    // [guard-skip]: nusxalar olib tashlanadi — GitHub qo'riqchisi buni yo'qotish deb o'ylamasin (saveCustom o'zi tekshiradi: har bir ID qoladi)
    runAction(e.currentTarget, () => saveCustom(list => fixIdCollisions(list),
      `Bir xil ID’lar tuzatildi: ${c.copies} ta nusxa olib tashlandi, ${c.clashes} ta kinoga yangi ID${c.copies > 1 ? ' [guard-skip]' : ''}`,
      { dropCopies: true }), 'ID’lar tuzatildi').then(() => { if (view === 'dups') renderDupView(); });
  });
  $('#dupAllExact')?.addEventListener('click', e => {
    const ids = dupState.groups.filter(g => g.exact).flatMap(g => g.items.filter(m => m.id !== keepOf(g)).map(m => m.id));
    if (!confirm(`${ids.length} ta aniq dublikat (bir xil video) saytdan yashirilsinmi? Har guruhdan bittasi qoladi. Keyin qaytarish mumkin.`)) return;
    hideIds(ids, `Dublikatlar yashirildi: ${ids.length} ta (bir xil video)`, e.currentTarget);
  });
  document.querySelectorAll('[data-duphide]').forEach(b => b.addEventListener('click', () => {
    const g = byKey.get(b.dataset.duphide), keep = keepOf(g);
    const ids = g.items.filter(m => m.id !== keep).map(m => m.id);
    const k = g.items.find(m => m.id === keep);
    if (!confirm(`«${k.title.uz}» (ID ${keep}) qoladi, qolgan ${ids.length} tasi yashirilsinmi?`)) return;
    hideIds(ids, `Dublikat yashirildi: ${k.title.uz} (${ids.join(', ')})`, b);
  }));
  document.querySelectorAll('[data-dupskip]').forEach(b => b.addEventListener('click', () => {
    let ignore = [];
    try { ignore = JSON.parse(localStorage.getItem(DUP_IGNORE) || '[]'); } catch {}
    ignore.push(b.dataset.dupskip);
    try { localStorage.setItem(DUP_IGNORE, JSON.stringify(ignore.slice(-2000))); } catch {}
    b.closest('.adm-dup').remove();
    toast('Bu guruh endi ko‘rsatilmaydi');
  }));
  // tanlangan («qoladi») belgisi
  const paintKeep = sec => sec.querySelectorAll('.adm-dup-item').forEach(l => {
    const on = l.querySelector('input').checked;
    l.classList.toggle('is-keep', on);
    l.querySelector('.adm-dup-tag').textContent = on ? 'Qoladi' : 'Yashiriladi';
  });
  document.querySelectorAll('.adm-dup').forEach(sec => { paintKeep(sec); sec.addEventListener('change', () => paintKeep(sec)); });
}

async function renderBackupView() {
  const box = $('#admView');
  box.innerHTML = `
    <section class="adm-sec">
      <div class="adm-sec-head"><span class="adm-sec-icon">${NAV_ICONS.shield}</span><h3>Zaxira va tiklash</h3><small>kinolar fayli</small></div>
      <p class="acc-muted adm-note">${NAV_ICONS.info || ''}<span>Har bir saqlash — alohida nusxa. «Sanash» bilan tekshirib, «Tiklash».
        GitHub’dagi qo‘riqchi ham bittadan ko‘p kino yo‘qolsa, avvalgi holatni o‘zi qaytaradi.</span></p>
      <p class="adm-bk-now" id="bkNow">Hozir: <b>${customList.length}</b> ta qo‘shilgan/tahrirlangan, <b>${hiddenList.length}</b> ta yashirilgan</p>
      <div id="bkList"><div class="mt-loading"><i></i><i></i><i></i></div></div>
    </section>`;
  let list;
  try {
    list = await gh(`/commits?path=${encodeURIComponent(DATA_PATH)}&sha=${GH.branch}&per_page=40&t=${Date.now()}`);
  } catch (e) { $('#bkList').innerHTML = `<p class="acc-error">${esc(friendlyError(e))}</p>`; return; }
  const cur = customList.length;
  const row = (c, i) => {
    const v = bkCounts.get(c.sha);
    const guard = /^Qo'riqchi|dezomax-guard/i.test(c.commit.message + ' ' + (c.commit.author?.name || ''));
    const diff = v && v.custom != null ? v.custom - cur : null;
    return `
      <div class="adm-bk${guard ? ' is-guard' : ''}" data-sha="${c.sha}">
        <div class="adm-bk-main">
          <b>${esc(c.commit.message.split('\n')[0])}</b>
          <small>${fmtDateTime(c.commit.author?.date)} · ${esc(c.commit.author?.name || '')}${i === 0 ? ' · <span class="adm-bk-cur">hozirgi holat</span>' : ''}</small>
          ${v ? `<small class="adm-bk-count">${v.custom == null ? 'Fayl o‘qilmaydi (buzilgan)' : `${v.custom} ta kino, ${v.hidden} ta yashirilgan${diff ? ` <i class="${diff < 0 ? 'is-less' : 'is-more'}">(${diff > 0 ? '+' : ''}${diff} hozirgiga nisbatan)</i>` : ''}`}</small>` : ''}
        </div>
        <div class="adm-actions">
          ${v ? '' : `<button class="btn btn-ghost btn-sm" type="button" data-bk-count>Sanash</button>`}
          ${i === 0 ? '' : `<button class="btn btn-ghost btn-sm" type="button" data-bk-restore>Tiklash</button>`}
        </div>
      </div>`;
  };
  const draw = () => {
    $('#bkList').innerHTML = `<div class="adm-bk-list">${list.map(row).join('')}</div>`;
    $('#bkList').querySelectorAll('[data-bk-count]').forEach(b => b.addEventListener('click', async () => {
      b.disabled = true; b.textContent = '…';
      try { await versionAt(b.closest('[data-sha]').dataset.sha); draw(); }
      catch (e) { b.disabled = false; b.textContent = 'Sanash'; toast(friendlyError(e), true); }
    }));
    $('#bkList').querySelectorAll('[data-bk-restore]').forEach(b => b.addEventListener('click', async () => {
      const sha = b.closest('[data-sha]').dataset.sha;
      const c = list.find(x => x.sha === sha);
      b.disabled = true;
      try {
        const v = await versionAt(sha);
        if (v.custom == null) { toast('Bu nusxa buzilgan — uni tiklab bo‘lmaydi', true); b.disabled = false; return; }
        await loadCustom();
        const when = fmtDateTime(c.commit.author?.date);
        if (!confirm(`${when} dagi holat tiklansinmi?\n\nHozir: ${customList.length} ta kino → tiklangandan keyin: ${v.custom} ta.\nShu vaqtdan keyin qilingan o‘zgarishlar bekor bo‘ladi (ular ham shu ro‘yxatda nusxa bo‘lib qoladi).`)) { b.disabled = false; return; }
        // [guard-skip] — ataylab tiklash, qo'riqchi to'xtatmasin
        const res = await putFile(DATA_PATH, b64encode(v.text), `Zaxiradan tiklandi: ${when} holati (${v.custom} ta kino) [guard-skip]`, dataSha);
        dataSha = res.content.sha;
        await loadCustom();
        commitsCache = null;
        toast(`Tiklandi: ${customList.length} ta kino — saytda ~1 daqiqada`);
        renderBackupView();
      } catch (e) { b.disabled = false; toast(friendlyError(e), true); }
    }));
  };
  draw();
}

initLayout();
boot();
