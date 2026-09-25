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
    color: c.color || team.color || ''
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
