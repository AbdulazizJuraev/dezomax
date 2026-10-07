/* ============================================================
   DezoMax — Sport / Спорт
   ------------------------------------------------------------
   Ma'lumot ESPN ning ochiq API sidan (kalit kerak emas, CORS ruxsat).
   Har bir sport turi o'z bo'limida: avval jonli o'yinlar, keyin bugungi,
   keyin yaqin kunlardagi. Yangi sport qo'shish — SPORTS ro'yxatiga yozing.
   ============================================================ */

const API = 'https://site.api.espn.com/apis';

const SPORT_ICONS = {
  soccer: ICONS.ball,
  basketball: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="9.2"/><path d="M2.8 12h18.4M12 2.8v18.4M5.6 5.4c2.8 2.3 2.8 10.9 0 13.2M18.4 5.4c-2.8 2.3-2.8 10.9 0 13.2"/></svg>',
  tennis: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="9.2"/><path d="M5.2 5.6c3.4 3.2 3.4 9.6 0 12.8M18.8 5.6c-3.4 3.2-3.4 9.6 0 12.8"/></svg>',
  hockey: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l6.5 13.5H19a1.5 1.5 0 0 1 0 3h-7.5L3.5 3"/><ellipse cx="7" cy="19.3" rx="3" ry="1.4"/></svg>',
  mma: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10V6.5A2.5 2.5 0 0 1 9.5 4h5A2.5 2.5 0 0 1 17 6.5V13a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-1"/><path d="M7 10H5.5a1.5 1.5 0 0 0 0 3H7M10 18v2.5h4V18M11 8h3"/></svg>',
  f1: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h13l-2.5 4L18 12H5"/><path d="M9 4v8M13 4v8M5 8h13"/></svg>'
};

/* kind: 'header'  — bitta so'rovda barcha ligalar
         'league'  — aniq liga scoreboard'i
         'f1'      — Formula 1 (poyga bosqichi, jamoalar yo'q) */
const SPORTS = [
  { id: 'soccer',     limit: 12, sources: [{ kind: 'header', sport: 'soccer', days: [0, 1] }] },
  { id: 'basketball', limit: 6,  sources: [{ kind: 'league', path: 'basketball/fiba' },
                                           { kind: 'league', path: 'basketball/nba' },
                                           { kind: 'league', path: 'basketball/wnba' }] },
  { id: 'tennis',     limit: 8,  sources: [{ kind: 'header', sport: 'tennis', days: [0, 1] }] },
  { id: 'hockey',     limit: 6,  sources: [{ kind: 'header', sport: 'hockey', days: [0, 1, null] }] },
  { id: 'mma',        limit: 6,  sources: [{ kind: 'header', sport: 'mma' }, { kind: 'league', path: 'mma/ufc' }] },
  { id: 'f1',         limit: 1,  sources: [{ kind: 'f1' }] }
];

const state = {};              // sport id -> { status: 'loading'|'ok'|'error', events: [] }
const expanded = new Set();    // "Yana ko'rsatish" bosilgan bo'limlar

/* ---------- Vaqt yordamchilari ---------- */

const timeFmt = d => { const x = new Date(d); return String(x.getHours()).padStart(2, '0') + ':' + String(x.getMinutes()).padStart(2, '0'); };

function dayDiff(d) {
  const a = new Date(d); a.setHours(0, 0, 0, 0);
  const b = new Date(); b.setHours(0, 0, 0, 0);
  return Math.round((a - b) / 86400000);
}

const MONTHS = {
  uz: ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek'],
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
};

const shortDate = d => { const x = new Date(d); return x.getDate() + ' ' + (MONTHS[LANG] || MONTHS.uz)[x.getMonth()]; };

const ymd = offset => {
  const x = new Date(); x.setDate(x.getDate() + offset);
  return x.getFullYear() + String(x.getMonth() + 1).padStart(2, '0') + String(x.getDate()).padStart(2, '0');
};

function dayLabel(d) {
  const n = dayDiff(d);
  if (n === 0) return t('sport.today');
  if (n === 1) return t('sport.tomorrow');
  if (n === -1) return t('sport.yesterday');
  return shortDate(d);
}

/* ---------- Ma'lumotni bir xil ko'rinishga keltirish ---------- */

function side(c) {
  if (!c) return { name: '?', logo: null, score: '', winner: false };
  const team = c.team || {};
  return {
    id: c.id || team.id || null,
    name: c.shortDisplayName || c.displayName || c.name || team.shortDisplayName || team.displayName || c.athlete?.displayName || '?',
    full: c.displayName || team.displayName || c.name || '',
    logo: c.logo || team.logo || c.athlete?.flag?.href || null,
    score: c.score ?? '',
    winner: !!c.winner,
    form: c.form || '',
    record: typeof c.record === 'string' ? c.record : (c.records?.[0]?.summary || ''),
    color: c.color || team.color || '',
    alt: c.alternateColor || team.alternateColor || ''
  };
}

function orderPair(list) {
  const home = list.find(x => x.homeAway === 'home');
  const away = list.find(x => x.homeAway === 'away');
  return home && away ? [home, away] : [list[0], list[1]];
}

/* header endpointidagi tadbir */
function fromHeader(ev, lg, sport) {
  const [a, b] = orderPair(ev.competitors || []);
  if (!a || !b) return null;
  const st = ev.fullStatus?.type || {};
  return {
    id: ev.id, date: ev.date,
    path: sport && lg.slug ? `${sport}/${lg.slug}` : null,
    league: lg.shortName || lg.abbreviation || lg.name,
    a: side(a), b: side(b),
    state: st.state || ev.status || 'pre',
    clock: ev.fullStatus?.displayClock || '',
    detail: st.shortDetail || ''
  };
}

/* liga scoreboard'idagi tadbir */
function fromLeague(ev, lgName, path) {
  const c = ev.competitions?.[0];
  if (!c) return null;
  const [a, b] = orderPair(c.competitors || []);
  if (!a || !b) return null;
  const st = ev.status?.type || {};
  return {
    id: ev.id, date: ev.date, league: lgName, path,
    a: side(a), b: side(b),
    state: st.state || 'pre',
    clock: ev.status?.displayClock || '',
    detail: st.shortDetail || ''
  };
}

async function getJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}

async function loadSource(src) {
  if (src.kind === 'header') {
    // days: [0, 1] — bugun va ertaga (sanasiz so'rov ko'pincha kechagi o'yinlarni qaytaradi)
    const urls = (src.days || [null]).map(d =>
      `${API}/v2/scoreboard/header?sport=${src.sport}${d === null ? '' : '&dates=' + ymd(d)}`);
    const res = await Promise.allSettled(urls.map(getJSON));
    if (!res.some(r => r.status === 'fulfilled')) throw new Error('header failed');
    const out = [];
    for (const r of res) {
      if (r.status !== 'fulfilled') continue;
      for (const lg of (r.value.sports?.[0]?.leagues || [])) {
        for (const ev of (lg.events || [])) {
          const e = fromHeader(ev, lg, src.sport);
          if (e) out.push(e);
        }
      }
    }
    return out;
  }

  if (src.kind === 'league') {
    const j = await getJSON(`${API}/site/v2/sports/${src.path}/scoreboard`);
    const lgName = j.leagues?.[0]?.abbreviation || j.leagues?.[0]?.name || '';
    return (j.events || []).map(ev => fromLeague(ev, lgName, src.path)).filter(Boolean);
  }

  if (src.kind === 'f1') {
    const j = await getJSON(`${API}/site/v2/sports/racing/f1/scoreboard`);
    F1_CAL = j.leagues?.[0]?.calendar || [];   // keyingi Gran-pri (slayder uchun)
    return (j.events || []).map(ev => ({
      id: ev.id, date: ev.date, f1: true,
      name: ev.name,
      state: ev.status?.type?.state || 'pre',
      sessions: (ev.competitions || []).map(c => ({
        type: c.type?.abbreviation || '',
        date: c.date,
        state: c.status?.type?.state || 'pre',
        top: (c.competitors || [])
          .filter(x => x.order)
          .sort((x, y) => x.order - y.order)
          .slice(0, 3)
          .map(x => ({ name: x.athlete?.displayName || '?', flag: x.athlete?.flag?.href || null }))
      }))
    }));
  }
  return [];
}

/* Tartib: jonli → bugun boshlanadigan → yaqinda tugagan → keyingi kunlar */
function arrange(events) {
  const now = Date.now();
  const keep = events.filter(e => {
    const t0 = new Date(e.date).getTime();
    return e.state === 'in' || (t0 > now - 30 * 3600e3 && t0 < now + 14 * 86400e3);
  });
  if (!keep.length) {
    keep.push(...events.filter(e => new Date(e.date).getTime() > now)
      .sort((x, y) => new Date(x.date) - new Date(y.date)).slice(0, 3));
  }

  const rank = e => {
    if (e.state === 'in') return 0;
    if (e.state === 'pre' && dayDiff(e.date) <= 0) return 1;
    if (e.state === 'post') return 2;
    return 3;
  };

  // bir xil tadbir ikki manbadan kelsa — bittasini qoldiramiz
  const seen = new Set();
  return keep
    .filter(e => (seen.has(e.id) ? false : seen.add(e.id)))
    .sort((x, y) => {
      const r = rank(x) - rank(y);
      if (r) return r;
      const dx = new Date(x.date), dy = new Date(y.date);
      return rank(x) === 2 ? dy - dx : dx - dy;   // tugaganlar — eng yangisi birinchi
    });
}

async function loadSport(sp) {
  state[sp.id] = { status: 'loading', events: [] };
  renderSport(sp);
  try {
    const parts = await Promise.allSettled(sp.sources.map(loadSource));
    const ok = parts.filter(p => p.status === 'fulfilled');
    if (!ok.length) throw new Error('all failed');
    const all = ok.flatMap(p => p.value);
    state[sp.id] = { status: 'ok', events: sp.id === 'f1' ? all : arrange(all) };
  } catch {
    state[sp.id] = { status: 'error', events: [] };
  }
  renderSport(sp);
}

/* ---------- Chizish ---------- */

const logoHTML = s => s.logo
  ? `<img class="m-logo" src="${esc(s.logo)}" alt="" loading="lazy" onerror="this.remove()">`
  : `<span class="m-logo m-logo-empty">${esc((s.name || '?').slice(0, 1))}</span>`;

/* uzun hisob (tennis setlari) — kichikroq va qatorga o'tadigan */
const scoreCls = e => (String(e.a.score).length + String(e.b.score).length > 9 ? ' m-score-long' : '');

function matchHTML(e, sportId) {
  const live = e.state === 'in';
  const done = e.state === 'post';
  const hasScore = String(e.a.score) !== '' || String(e.b.score) !== '';

  let mid;
  if (live) {
    mid = `${hasScore ? `<span class="m-score is-live${scoreCls(e)}">${esc(e.a.score || 0)} : ${esc(e.b.score || 0)}</span>` : ''}
           <span class="m-live"><i></i>${t('sport.live')}${e.clock && e.clock !== '0:00' ? ' ' + esc(e.clock) : ''}</span>`;
  } else if (done) {
    mid = `${hasScore ? `<span class="m-score${scoreCls(e)}">${esc(e.a.score)} : ${esc(e.b.score)}</span>` : ''}
           <span class="m-status">${t('sport.finished')}</span>`;
  } else {
    mid = `<span class="m-day">${esc(dayLabel(e.date))}</span><span class="m-time">${timeFmt(e.date)}</span>`;
  }

  const evening = sportId === 'soccer' && e.state === 'pre' && dayDiff(e.date) === 0 && new Date(e.date).getHours() >= 17;

  const key = `${sportId}:${e.id}`;
  EVENT_INDEX.set(key, { e, sportId });

  return `
  <div class="match m-click${live ? ' is-live' : ''}${evening ? ' is-evening' : ''}" data-ev="${esc(key)}" role="button" tabindex="0">
    <div class="m-league">${esc(e.league || '')}${live ? `<span class="m-watch">${ICONS.play}${t('sport.watchLive')}</span>` : `<span class="m-more">${t('sport.details')} ›</span>`}</div>
    <div class="m-row">
      <div class="m-team${e.a.winner ? ' m-win' : ''}">${logoHTML(e.a)}<span>${esc(e.a.name)}</span></div>
      <div class="m-mid">${mid}</div>
      <div class="m-team m-team-away${e.b.winner ? ' m-win' : ''}"><span>${esc(e.b.name)}</span>${logoHTML(e.b)}</div>
    </div>
  </div>`;
}

const SESSION_LABEL = type => {
  if (/^FP/.test(type)) return `${t('sport.practice')} ${type.slice(2)}`;
  if (/^Qual/i.test(type)) return t('sport.qual');
  if (/^Race/i.test(type)) return t('sport.race');
  if (/^(Sprint|SS|SR)/i.test(type)) return t('sport.sprint');
  return type;
};

function f1HTML(e) {
  const race = e.sessions.find(s => /^Race/i.test(s.type));
  const podium = race && race.state === 'post' && race.top.length ? race.top : null;

  return `
  <div class="match f1-card${e.state === 'in' ? ' is-live' : ''}">
    <div class="m-league">Formula 1</div>
    <div class="f1-name">${esc(e.name)}</div>

    ${podium ? `
      <div class="f1-podium">
        <span class="f1-podium-title">${t('sport.podium')}</span>
        ${podium.map((p, i) => `
          <span class="f1-pos"><b>${i + 1}</b>${p.flag ? `<img src="${esc(p.flag)}" alt="" loading="lazy" onerror="this.remove()">` : ''}${esc(p.name)}</span>`).join('')}
      </div>` : ''}

    <div class="f1-sessions">
      ${e.sessions.map(s => `
        <div class="f1-session${s.state === 'in' ? ' is-live' : ''}${s.state === 'post' ? ' is-done' : ''}">
          <span class="f1-s-name">${esc(SESSION_LABEL(s.type))}</span>
          <span class="f1-s-time">${s.state === 'in'
            ? `<span class="m-live"><i></i>${t('sport.live')}</span>`
            : `${esc(dayLabel(s.date))}, ${timeFmt(s.date)}`}</span>
        </div>`).join('')}
    </div>
  </div>`;
}

function sectionShell(sp) {
  let el = document.getElementById('sp-' + sp.id);
  if (!el) {
    el = document.createElement('section');
    el.className = 'sport-sec';
    el.id = 'sp-' + sp.id;
    document.getElementById('sports').appendChild(el);
  }
  return el;
}

function renderSport(sp) {
  const el = sectionShell(sp);
  const st = state[sp.id] || { status: 'loading', events: [] };
  const liveN = st.events.filter(e => e.state === 'in').length;

  const head = `
    <div class="sport-sec-head">
      <span class="sport-ico">${SPORT_ICONS[sp.id]}</span>
      <h2>${t('sport.' + sp.id)}</h2>
      ${liveN ? `<span class="sport-live-badge"><i></i>${liveN} ${t('sport.liveCount')}</span>` : ''}
    </div>`;

  let body;
  if (st.status === 'loading') {
    body = `<div class="sport-msg">${t('sport.loading')}</div>`;
  } else if (st.status === 'error') {
    body = `<div class="sport-msg">${t('sport.error')} <button class="chip" data-retry="${sp.id}">${t('sport.retry')}</button></div>`;
  } else if (!st.events.length) {
    body = `<div class="sport-msg">${t('sport.noEvents')}</div>`;
  } else if (sp.id === 'f1') {
    body = `<div class="m-list">${st.events.map(f1HTML).join('')}</div>`;
  } else {
    const open = expanded.has(sp.id);
    const shown = open ? st.events : st.events.slice(0, sp.limit);
    const rest = st.events.length - sp.limit;
    body = `<div class="m-list">${shown.map(e => matchHTML(e, sp.id)).join('')}</div>
            ${rest > 0 ? `<button class="btn btn-ghost btn-sm sport-more" data-more="${sp.id}">
               ${open ? t('sport.less') : `${t('sport.more')} (${rest})`}</button>` : ''}`;
  }

  el.innerHTML = head + body;
  el.hidden = spFilter !== 'all' && spFilter !== sp.id;
  scheduleTop();

  el.querySelectorAll('[data-ev]').forEach(card => {
    const open = () => openMatch(EVENT_INDEX.get(card.dataset.ev));
    card.addEventListener('click', open);
    card.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open(); } });
  });

  el.querySelector('[data-retry]')?.addEventListener('click', () => loadSport(sp));
  el.querySelector('[data-more]')?.addEventListener('click', () => {
    expanded.has(sp.id) ? expanded.delete(sp.id) : expanded.add(sp.id);
    renderSport(sp);
    if (!expanded.has(sp.id)) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ---------- Futbol yangiliklari ---------- */

function newsHTML(a) {
  const img = a.images?.[0]?.url;
  const link = a.links?.web?.href || a.links?.mobile?.href;
  const date = a.published ? shortDate(a.published) : '';
  return `
  <a class="news-card reveal" href="${esc(link || '#')}" target="_blank" rel="noopener">
    <div class="news-img">${img ? `<img src="${esc(img)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</div>
    <div class="news-body">
      <h3>${esc(a.headline || '')}</h3>
      <p>${esc(a.description || '')}</p>
      <span class="news-meta">${esc(date)} · ${t('sport.readMore')} ↗</span>
    </div>
  </a>`;
}

let newsCache = null;

async function loadNews() {
  const box = document.getElementById('news');
  try {
    if (!newsCache) newsCache = (await getJSON(`${API}/site/v2/sports/soccer/eng.1/news`)).articles || [];
    box.innerHTML = newsCache.length ? `<div class="news-grid">${newsCache.slice(0, 6).map(newsHTML).join('')}</div>` : '';
    observeReveals(box);
  } catch {
    box.innerHTML = '';
  }
}

/* ================= Yuqori qism (Kinopoisk uslubi) =================
   1) Katta slayder — eng muhim o'yinlar: jamoa ranglaridan fon, katta logolar, vaqt, liga, «Batafsil»
   2) «Ligalar va chempionatlar» — sport turi bo'yicha filtr
   3) Rangli sport plitkalari — bosilsa o'sha bo'limga
   4) «Bugun sportda» — bugungi o'yinlar kartochkalari (hisob bilan)
   O'yinchilar surati ochiq manbada yo'q — slayd foni jamoa ranglari va logolaridan yasaladi. */

const SPORT_TILE = {
  soccer: '#1fb94a', mma: '#e3202d', basketball: '#f2661c', tennis: '#a9bd12', hockey: '#1f6fe0', f1: '#a3101f'
};
// slayderga birinchi chiqadigan ligalar (ESPN slug yoki nom bo'lagi)
const TOP_LEAGUES = /uefa\.champions|uefa\.europa|eng\.1|esp\.1|ita\.1|ger\.1|fra\.1|fifa\.world|uefa\.nations|uzb|nba|ufc|euroleague|nhl|atp|wta/i;

let spFilter = 'all';
let topT = null;
const scheduleTop = () => { clearTimeout(topT); topT = setTimeout(renderTop, 120); };

const hexOk = h => /^[0-9a-f]{6}$/i.test(h || '') && !/^(ffffff|000000)$/i.test(h);
const teamColor = (s, fb) => '#' + (hexOk(s.color) ? s.color : hexOk(s.alt) ? s.alt : fb);

function allEvents() {
  return SPORTS.flatMap(sp => (state[sp.id]?.status === 'ok' && sp.id !== 'f1' ? state[sp.id].events : [])
    .map(e => ({ e, sportId: sp.id })))
    .filter(x => spFilter === 'all' || x.sportId === spFilter);
}

function whenLabel(e) {
  if (e.state === 'in') return `<span class="sph-time is-live"><i></i>${t('sport.live')}</span>`;
  if (e.state === 'post') return `<span class="sph-time">${t('sport.finished')}</span>`;
  const n = dayDiff(e.date);
  return `<span class="sph-time">${n === 0 ? '' : esc(dayLabel(e.date)) + ', '}${timeFmt(e.date)}</span>`;
}

/* ---- Slayd suratlari (ESPN) ----
   Jamoa o'yinlari: har jamoadan bitta o'yinchining foni olib tashlangan haqiqiy surati (roster headshot).
   Yakkalik sportlar (tennis, MMA): sportchining o'z surati. Surat yo'q bo'lsa — jamoa yangiligining fotosurati fon bo'ladi.
   Natija 6 soat saqlanadi (har safar qayta so'ralmaydi). */
const PHOTO = new Map();            // event key -> { a, b, bg } | 'loading'
const SOLO = { tennis: 'tennis', mma: 'mma' };

function photoCache(k, v, ttlH = 6) {
  try {
    const all = JSON.parse(localStorage.getItem('dzxSpPhoto') || '{}');
    if (v === undefined) { const x = all[k]; return x && Date.now() - x.t < (x.h || 6) * 3600e3 ? x.v : undefined; }
    all[k] = { v, t: Date.now(), h: ttlH };
    const keys = Object.keys(all); if (keys.length > 300) keys.slice(0, 100).forEach(x => delete all[x]);
    localStorage.setItem('dzxSpPhoto', JSON.stringify(all));
  } catch {}
  return v;
}

async function teamHeadshot(path, teamId) {
  if (!path || !teamId) return null;
  const ck = 'h:' + path + ':' + teamId;
  const c = photoCache(ck); if (c !== undefined) return c;
  try {
    const j = await getJSON(`${API}/site/v2/sports/${path}/teams/${teamId}/roster`);
    const list = (j.athletes || []).flatMap(g => g.items || [g]).filter(x => x.headshot?.href);
    return photoCache(ck, list[0]?.headshot.href || null);
  } catch { return null; }
}

async function teamNewsPhoto(path, teamId) {
  if (!path) return null;
  const ck = 'n2:' + path + ':' + (teamId || '');
  const c = photoCache(ck); if (c !== undefined) return c;
  try {
    const j = await getJSON(`${API}/site/v2/sports/${path}/news?limit=8${teamId ? '&team=' + teamId : ''}`);
    const imgs = (j.articles || []).map(a => a.images?.[0]?.url).filter(Boolean);
    return photoCache(ck, imgs.length ? imgs : null);
  } catch { return null; }
}

/* TheSportsDB — o'yinchilarning fonsiz, butun gavdali suratlari (render; yo'q bo'lsa — beligacha «cutout»).
   Bepul ochiq kalit (123): daqiqasiga ~30 so'rov — navbat bilan, bittadan, 2.1 s oraliq; chegaraga urilsa 25 s kutib bir marta qayta;
   natija 7 kun saqlanadi. */
const TSDB = 'https://www.thesportsdb.com/api/v1/json/123';
const TSDB_SPORT = { soccer: /soccer/i, basketball: /basketball/i, hockey: /hockey/i, mma: /fight|mma/i, tennis: /tennis/i, f1: /motorsport|formula/i };
let tsdbBusy = 0; const tsdbQ = [];
function tsdb(path) {
  return new Promise((res, rej) => {
    const run = (retry) => getJSON(TSDB + path).then(res, err => retry ? setTimeout(() => { tsdbQ.push(() => run(false)); tsdbNext(); }, 25000) : rej(err))
      .finally(() => { tsdbBusy--; setTimeout(tsdbNext, 2100); });
    tsdbQ.push(() => run(true));
    tsdbNext();
  });
}
function tsdbNext() { while (tsdbBusy < 1 && tsdbQ.length) { tsdbBusy++; tsdbQ.shift()(); } }

const bodyOf = p => p && (p.strRender || p.strCutout) ? { src: p.strRender || p.strCutout, body: !!p.strRender } : null;

async function tsdbTeamBody(name, sportId) {
  if (!name) return null;
  const ck = 'tb2:' + sportId + ':' + name;
  const c = photoCache(ck); if (c !== undefined) return c;
  try {
    const teams = (await tsdb('/searchteams.php?t=' + encodeURIComponent(name))).teams || [];
    const team = teams.find(x => TSDB_SPORT[sportId]?.test(x.strSport || '')) || null;
    if (!team) return photoCache(ck, null, 168);
    const ps = (await tsdb('/lookup_all_players.php?id=' + team.idTeam)).player || [];
    // eng yangi yuklangan butun gavdali surat — o'yinchi hozirgi jamoa formasida bo'lishi ehtimoli katta
    // (eski suratlarda boshqa klub formasida chiqardi). Fayl nomi oxirida yuklangan vaqt (unix soniya).
    const ts = u => +((u || '').match(/(\d{10})\.\w+$/) || [])[1] || 0;
    const pick = ps.filter(p => p.strRender).sort((x, y) => ts(y.strRender) - ts(x.strRender))[0] || ps.find(p => p.strCutout);
    return photoCache(ck, bodyOf(pick), 168);
  } catch { return null; }
}

async function tsdbPersonBody(name, sportId) {
  if (!name) return null;
  const ck = 'pb:' + sportId + ':' + name;
  const c = photoCache(ck); if (c !== undefined) return c;
  try {
    const ps = (await tsdb('/searchplayers.php?p=' + encodeURIComponent(name))).player || [];
    let p = ps.find(x => TSDB_SPORT[sportId]?.test(x.strSport || '')) || null;
    // qidiruv natijasida butun gavdali «render» bo'lmaydi — alohida so'raymiz; bo'lmasa beligacha surat qoladi
    if (p && !p.strRender) { try { p = ((await tsdb('/lookupplayer.php?id=' + p.idPlayer)).players || [])[0] || p; } catch {} }
    return photoCache(ck, bodyOf(p), 168);
  } catch { return null; }
}

const imgOk = src => !src ? Promise.resolve(null) : new Promise(res => {
  const i = new Image();
  i.onload = () => res(i.naturalWidth > 40 ? src : null);
  i.onerror = () => res(null);
  i.src = src;
});

function loadPhotos(key, e, sportId) {
  if (PHOTO.has(key)) return;
  PHOTO.set(key, 'loading');
  (async () => {
    // butun gavdali surat — faqat yakkalik sportda (tennis, MMA). Jamoa o'yinlarida TheSportsDB suratlari ko'pincha
    // o'yinchining OLDINGI klubi formasida (Capitals o'yinida Dallas formasi chiqdi) — shuning uchun u yerda ESPN surati:
    // u doim hozirgi jamoa formasida (ko'kragigacha).
    const body = x => SOLO[sportId] ? tsdbPersonBody(x.full || x.name, sportId) : Promise.resolve(null);
    const head = x => SOLO[sportId]
      ? (x.id ? `https://a.espncdn.com/i/headshots/${SOLO[sportId]}/players/full/${x.id}.png` : null)
      : teamHeadshot(e.path, x.id);
    // 1) butun gavdali surat (TheSportsDB)  2) ESPN portreti (yelkagacha); ochilishi tekshiriladi (404 bo'lishi mumkin)
    const one = async x => {
      const bd = await body(x);
      if (bd && await imgOk(bd.src)) return bd;
      const h = await imgOk(await head(x));
      return h ? { src: h, body: false } : null;
    };
    let [a, b] = await Promise.all([one(e.a), one(e.b)]);
    // biri butun gavdali, ikkinchisi faqat portret bo'lsa — g'alati ko'rinadi: butun gavdalisi yolg'iz qoladi
    if (a && b && a.body !== b.body) { if (a.body) b = null; else a = null; }
    // surat yo'q — jamoa (yoki liga) yangiligining fotosurati; har o'yinga boshqasi (bir xil rasm takrorlanmasin)
    let bg = null;
    if (!a && !b) {
      const list = (await teamNewsPhoto(e.path, SOLO[sportId] ? null : e.a.id)) || (await teamNewsPhoto(e.path, null)) || [];
      const h = [...String(e.id)].reduce((n, ch) => n * 31 + ch.charCodeAt(0) >>> 0, 7);
      bg = await imgOk(list[h % (list.length || 1)]);
    }
    PHOTO.set(key, { a, b, bg });
    scheduleTop();
  })();
}

function slideHTML({ e, sportId }) {
  const key = `${sportId}:${e.id}`;
  EVENT_INDEX.set(key, { e, sportId });
  const ca = teamColor(e.a, SPORT_TILE[sportId].slice(1)), cb = teamColor(e.b, '0b2a6b');
  const score = e.state !== 'pre' && (String(e.a.score) !== '' || String(e.b.score) !== '');
  const big = x => x.logo ? `<img src="${esc(x.logo)}" alt="" loading="lazy" onerror="this.remove()">` : '';
  loadPhotos(key, e, sportId);
  const ph = PHOTO.get(key);
  const pic = ph && ph !== 'loading' ? ph : {};
  const player = (p, cls) => p && p.src ? `<img class="sph-pl ${cls}${p.body ? ' is-body' : ''}" src="${esc(p.src)}" alt="" onerror="this.remove()">` : '';
  const hasPl = !!(pic.a || pic.b);
  return `
  <article class="sph-slide${hasPl ? ' has-pl' : ''}${pic.bg ? ' has-bg' : ''}" data-ev="${esc(key)}" style="--ca:${ca};--cb:${cb}">
    <div class="sph-art" aria-hidden="true">
      ${pic.bg ? `<img class="sph-photo" src="${esc(pic.bg)}" alt="" onerror="this.remove()">` : ''}
      <span class="sph-ico">${SPORT_ICONS[sportId]}</span>
      <span class="sph-big sph-big-a">${big(e.a)}</span>
      <span class="sph-big sph-big-b">${big(e.b)}</span>
      ${player(pic.a, 'sph-pl-a')}${player(pic.b, 'sph-pl-b')}
    </div>
    <div class="sph-body">
      <div class="sph-meta">${whenLabel(e)}<span>${esc(t('sport.' + sportId))}${e.league ? ', ' + esc(e.league) : ''}</span></div>
      <div class="sph-team">${logoHTML(e.a)}<b>${esc(e.a.name)}</b>${score ? `<em>${esc(e.a.score)}</em>` : ''}</div>
      <div class="sph-team">${logoHTML(e.b)}<b>${esc(e.b.name)}</b>${score ? `<em>${esc(e.b.score)}</em>` : ''}</div>
      ${e.detail && e.state !== 'pre' ? `<p class="sph-desc">${esc(e.detail)}</p>` : ''}
      <button class="sph-btn" type="button">${e.state === 'in' ? ICONS.play + t('sport.watchLive') : t('sport.details')}</button>
    </div>
  </article>`;
}

/* ---- Formula 1 — alohida slayd ----
   Navbatdagi Gran-pri: keyingi (yoki jonli) bosqich vaqti, chempionat yetakchilari — haqiqiy, butun gavdali suratlari bilan */
let f1Leaders = null;
let F1_CAL = [];
async function loadF1Leaders() {
  if (f1Leaders) return;
  f1Leaders = [];
  const c = photoCache('f1lead');
  if (c !== undefined) { f1Leaders = c; scheduleTop(); return; }
  try {
    const j = await getJSON('https://site.api.espn.com/apis/v2/sports/racing/f1/standings');
    const rows = j.children?.[0]?.standings?.entries || [];
    const top = rows.slice(0, 2).map(r => ({
      name: r.athlete?.displayName || '',
      pts: (r.stats || []).find(x => x.name === 'championshipPts')?.displayValue || ''
    })).filter(x => x.name);
    const bodies = await Promise.all(top.map(x => tsdbPersonBody(x.name, 'f1')));
    f1Leaders = await Promise.all(top.map(async (x, i) => ({ ...x, src: (bodies[i] && await imgOk(bodies[i].src)) || null })));
    if (f1Leaders.every(x => x.src)) photoCache('f1lead', f1Leaders);
    else setTimeout(() => { f1Leaders = null; scheduleTop(); }, 60000);   // surat kelmadi — 1 daqiqadan keyin qayta
  } catch { f1Leaders = []; setTimeout(() => { f1Leaders = null; scheduleTop(); }, 60000); }
  scheduleTop();
}

function f1SlideHTML() {
  const st = state.f1;
  const ev = st?.status === 'ok' ? st.events[0] : null;
  if (!ev || (spFilter !== 'all' && spFilter !== 'f1')) return '';
  loadF1Leaders();
  const live = ev.sessions.find(x => x.state === 'in');
  const next = live || ev.sessions.find(x => x.state === 'pre');
  // bu bosqich tugagan — keyingi Gran-pri (ESPN kalendari)
  const nextGp = !next ? F1_CAL.find(c => new Date(c.startDate) > Date.now()) : null;
  const when = nextGp ? `<span class="sph-time">${esc(dayLabel(nextGp.startDate))}, ${timeFmt(nextGp.startDate)}</span>`
    : !next ? `<span class="sph-time">${t('sport.finished')}</span>`
    : live ? `<span class="sph-time is-live"><i></i>${t('sport.live')}</span>`
    : `<span class="sph-time">${dayDiff(next.date) === 0 ? '' : esc(dayLabel(next.date)) + ', '}${timeFmt(next.date)}</span>`;
  const lead = f1Leaders || [];
  const pics = lead.filter(x => x.src);
  return `
  <article class="sph-slide sph-f1${pics.length ? ' has-pl' : ''}" data-f1="1" style="--ca:#e10600;--cb:#15151e">
    <div class="sph-art" aria-hidden="true">
      <span class="sph-ico">${SPORT_ICONS.f1}</span>
      <span class="sph-f1-stripes"></span>
      ${pics.map((x, i) => `<img class="sph-pl is-body ${i ? 'sph-pl-b' : 'sph-pl-a'}" src="${esc(x.src)}" alt="" onerror="this.remove()">`).join('')}
    </div>
    <div class="sph-body">
      <div class="sph-meta">${when}<span>Formula 1${next ? ', ' + esc(SESSION_LABEL(next.type)) : nextGp ? ', ' + t('sport.nextGp') : ''}</span></div>
      <h3 class="sph-f1-name">${esc(nextGp ? nextGp.label : ev.name)}</h3>
      ${lead.length ? `<p class="sph-desc">${t('sport.f1Leaders')}: ${lead.map(x => esc(x.name) + (x.pts ? ` (${esc(x.pts)})` : '')).join(' · ')}</p>` : ''}
      <button class="sph-btn" type="button">${t('sport.details')}</button>
    </div>
  </article>`;
}

function todayCardHTML({ e, sportId }) {
  const key = `${sportId}:${e.id}`;
  EVENT_INDEX.set(key, { e, sportId });
  const sc = x => (e.state !== 'pre' ? `<em>${esc(x.score)}</em>` : '');
  return `
  <div class="spt-card${e.state === 'in' ? ' is-live' : ''}" data-ev="${esc(key)}" role="button" tabindex="0">
    <small>${esc(t('sport.' + sportId))}</small>
    <b class="spt-lg">${esc(e.league || '')}</b>
    <div class="spt-when">${whenLabel(e)}</div>
    <div class="spt-team">${logoHTML(e.a)}<span>${esc(e.a.name)}</span>${sc(e.a)}</div>
    <div class="spt-team">${logoHTML(e.b)}<span>${esc(e.b.name)}</span>${sc(e.b)}</div>
  </div>`;
}

function renderTop() {
  const box = document.getElementById('spTop');
  if (!box) return;
  const evs = allEvents();
  const now = Date.now();
  // jonli → katta liga → futbol → ikkala logosi bor; AQSh talabalar ligalari (NCAA) — eng oxirida
  const lowTier = x => /ncaa|college|usl|friendly.w|liga de expansi/i.test((x.e.path || '') + ' ' + (x.e.league || ''));
  const rank = x => (x.e.state === 'in' ? 0 : 10) + (TOP_LEAGUES.test((x.e.path || '') + ' ' + (x.e.league || '')) ? 0 : 5)
    + (x.sportId === 'soccer' ? 0 : 2) + (x.e.a.logo && x.e.b.logo ? 0 : 1) + (lowTier(x) ? 8 : 0);
  // bugun: jonli → boshlanadigan → tugagan; talabalar ligalari oxirida
  const todayRank = x => ({ in: 0, pre: 1, post: 2 }[x.e.state] ?? 1) + (lowTier(x) ? 3 : 0);
  const hero = evs.filter(x => x.e.a.logo && x.e.b.logo).filter(x => x.e.state === 'in' || (x.e.state === 'pre' && new Date(x.e.date) - now < 3 * 86400e3))
    .sort((x, y) => rank(x) - rank(y) || new Date(x.e.date) - new Date(y.e.date)).slice(0, 8);
  const today = evs.filter(x => x.e.state === 'in' || dayDiff(x.e.date) === 0)
    .sort((x, y) => todayRank(x) - todayRank(y) || new Date(x.e.date) - new Date(y.e.date)).slice(0, 20);

  // qayta chizilganda slayder joyidan sakramasin
  const keepHero = box.querySelector('.sph-track')?.scrollLeft || 0;
  const keepToday = box.querySelector('.spt-track')?.scrollLeft || 0;
  const ids = ['all', ...SPORTS.map(x => x.id)];
  const f1Html = f1SlideHTML();
  const f1Ev = state.f1?.events?.[0];
  const f1Soon = (f1Ev && f1Ev.sessions.some(x => x.state === 'in' || (x.state === 'pre' && new Date(x.date) - now < 3 * 86400e3)))
    || F1_CAL.some(c => new Date(c.startDate) > now && new Date(c.startDate) - now < 3 * 86400e3);
  const heroParts = hero.map(slideHTML);
  heroParts.splice(f1Soon || spFilter === 'f1' ? 0 : Math.min(1, heroParts.length), 0, f1Html);
  const heroSlides = heroParts.join('');
  const html = `
    ${hero.length || f1Html ? `<div class="sph-track">${heroSlides}</div>` : ''}
    <h2 class="spx-title">${t('sport.leagues')}</h2>
    <div class="spx-chips">${ids.map(id => `<button type="button" class="spx-chip${spFilter === id ? ' is-on' : ''}" data-f="${id}">${id === 'all' ? t('sport.all') : esc(t('sport.' + id))}</button>`).join('')}</div>
    <div class="spx-tiles">${SPORTS.map(x => `
      <a class="spx-tile" href="#sp-${x.id}" data-tile="${x.id}" style="--tc:${SPORT_TILE[x.id]}">
        <span class="spx-tile-ico">${SPORT_ICONS[x.id]}</span><b>${esc(t('sport.' + x.id))}</b>
      </a>`).join('')}</div>
    ${today.length ? `<h2 class="spx-title">${t('sport.todayIn')}</h2><div class="spt-track">${today.map(todayCardHTML).join('')}</div>` : ''}`;
  // o'zgarmagan bo'lsa qayta chizilmaydi (rasmlar miltillamasin; har 60 s yangilanish)
  if (html === box._html) return;
  box._html = html;
  box.innerHTML = html;
  const h = box.querySelector('.sph-track'); if (h) h.scrollLeft = keepHero;
  const d = box.querySelector('.spt-track'); if (d) d.scrollLeft = keepToday;

  box.querySelectorAll('[data-ev]').forEach(card => {
    const open = () => openMatch(EVENT_INDEX.get(card.dataset.ev));
    card.addEventListener('click', open);
    card.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open(); } });
  });
  box.querySelector('[data-f1]')?.addEventListener('click', () => document.getElementById('sp-f1')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  box.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => {
    spFilter = b.dataset.f;
    const tr = box.querySelector('.sph-track'); if (tr) tr.scrollLeft = 0;   // yangi filtr — slayder boshidan
    SPORTS.forEach(x => { const el = document.getElementById('sp-' + x.id); if (el) el.hidden = spFilter !== 'all' && spFilter !== x.id; });
    renderTop();
  }));
  box.querySelectorAll('[data-tile]').forEach(a => a.addEventListener('click', ev => {
    ev.preventDefault();
    if (spFilter !== 'all' && spFilter !== a.dataset.tile) box.querySelector('[data-f="all"]')?.click();
    document.getElementById('sp-' + a.dataset.tile)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}

/* ---------- Ishga tushirish ---------- */

initLayout();
SPORTS.forEach(loadSport);
loadNews();
document.getElementById('year').textContent = new Date().getFullYear();

// Jonli hisob yangilanib tursin — har 60 soniyada, sahifa ko'rinib turgan bo'lsa
setInterval(() => {
  if (document.hidden) return;
  SPORTS.forEach(sp => { if (state[sp.id]?.status !== 'loading') loadSportQuiet(sp); });
}, 60000);

/* Yuklash xabarini ko'rsatmasdan yangilash (sahifa sakramasin) */
async function loadSportQuiet(sp) {
  try {
    const parts = await Promise.allSettled(sp.sources.map(loadSource));
    const ok = parts.filter(p => p.status === 'fulfilled');
    if (!ok.length) return;
    const all = ok.flatMap(p => p.value);
    state[sp.id] = { status: 'ok', events: sp.id === 'f1' ? all : arrange(all) };
    renderSport(sp);
  } catch { /* keyingi safar */ }
}

document.addEventListener('langchange', () => {
  SPORTS.forEach(renderSport);
  loadNews();
  applyI18n();
});
