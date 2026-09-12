/* ============================================================
   DezoMax — Sport / Спорт
   Ma'lumot ESPN ning ochiq API sidan olinadi (kalit kerak emas).
   Sayt statik bo'lgani uchun so'rov to'g'ridan-to'g'ri brauzerdan ketadi.
   ============================================================ */

const LEAGUES = [
  { id: 'all',            uz: 'Barcha ligalar',      ru: 'Все лиги' },
  { id: 'eng.1',          uz: 'Angliya · APL',       ru: 'Англия · АПЛ' },
  { id: 'esp.1',          uz: 'Ispaniya · La Liga',  ru: 'Испания · Ла Лига' },
  { id: 'ita.1',          uz: 'Italiya · Serie A',   ru: 'Италия · Серия А' },
  { id: 'ger.1',          uz: 'Germaniya · Bundesliga', ru: 'Германия · Бундеслига' },
  { id: 'fra.1',          uz: 'Fransiya · Ligue 1',  ru: 'Франция · Лига 1' },
  { id: 'uefa.champions', uz: 'Chempionlar ligasi',  ru: 'Лига чемпионов' },
  { id: 'uefa.europa',    uz: 'Yevropa ligasi',      ru: 'Лига Европы' },
  { id: 'rus.1',          uz: 'Rossiya · RPL',       ru: 'Россия · РПЛ' },
  { id: 'tur.1',          uz: 'Turkiya · Super Lig', ru: 'Турция · Суперлига' }
];

let league = new URLSearchParams(location.search).get('league') || 'all';

const leagueName = id => {
  const l = LEAGUES.find(x => x.id === id);
  return l ? (l[LANG] || l.uz) : id;
};

/* ---------- Yordamchi ---------- */

const timeFmt = d => new Date(d).toLocaleTimeString(LANG === 'ru' ? 'ru-RU' : 'uz-UZ',
  { hour: '2-digit', minute: '2-digit' });

function isToday(d) {
  const a = new Date(d), b = new Date();
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/* ESPN javobidan bitta o'yinni soddalashtirib olamiz */
function parseEvent(ev, lgName) {
  const c = ev.competitions && ev.competitions[0];
  if (!c) return null;
  const home = (c.competitors || []).find(x => x.homeAway === 'home');
  const away = (c.competitors || []).find(x => x.homeAway === 'away');
  if (!home || !away) return null;

  const st = (ev.status && ev.status.type) || {};
  return {
    id: ev.id,
    date: ev.date,
    league: lgName,
    home: home.team && (home.team.shortDisplayName || home.team.displayName),
    away: away.team && (away.team.shortDisplayName || away.team.displayName),
    homeLogo: home.team && home.team.logo,
    awayLogo: away.team && away.team.logo,
    homeScore: home.score,
    awayScore: away.score,
    state: st.state,                      // pre | in | post
    clock: (ev.status && ev.status.displayClock) || '',
    detail: st.shortDetail || ''
  };
}

/* ---------- Ma'lumot olish ---------- */

async function fetchMatches() {
  if (league === 'all') {
    const r = await fetch('https://site.api.espn.com/apis/v2/scoreboard/header?sport=soccer');
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    const out = [];
    for (const lg of (j.sports?.[0]?.leagues || [])) {
      for (const ev of (lg.events || [])) {
        // header endpointi boshqacha tuzilishda keladi
        const comp = ev.competitors || [];
        const home = comp.find(x => x.homeAway === 'home') || comp[0];
        const away = comp.find(x => x.homeAway === 'away') || comp[1];
        if (!home || !away) continue;
        out.push({
          id: ev.id,
          date: ev.date,
          league: lg.name,
          home: home.shortDisplayName || home.displayName || home.name,
          away: away.shortDisplayName || away.displayName || away.name,
          homeLogo: home.logo, awayLogo: away.logo,
          homeScore: home.score, awayScore: away.score,
          state: ev.fullStatus?.type?.state || (ev.completed ? 'post' : 'pre'),
          clock: ev.fullStatus?.displayClock || '',
          detail: ev.fullStatus?.type?.shortDetail || ev.status || ''
        });
      }
    }
    return out;
  }

  const r = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard`);
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const j = await r.json();
  const lgName = j.leagues?.[0]?.name || leagueName(league);
  return (j.events || []).map(ev => parseEvent(ev, lgName)).filter(Boolean);
}

async function fetchNews() {
  const lg = league === 'all' ? 'eng.1' : league;
  const r = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${lg}/news`);
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const j = await r.json();
  return j.articles || [];
}

/* ---------- Chizish ---------- */

function matchHTML(m) {
  const live = m.state === 'in';
  const done = m.state === 'post';

  const status = live
    ? `<span class="m-live"><i></i>${t('sport.live')}${m.clock ? ' ' + esc(m.clock) : ''}</span>`
    : done
      ? `<span class="m-status">${t('sport.finished')}</span>`
      : `<span class="m-time">${timeFmt(m.date)}</span>`;

  const score = (live || done)
    ? `<span class="m-score${live ? ' is-live' : ''}">${esc(m.homeScore ?? 0)} : ${esc(m.awayScore ?? 0)}</span>`
    : `<span class="m-vs">–</span>`;

  const logo = (src, name) => src
    ? `<img class="m-logo" src="${esc(src)}" alt="" loading="lazy" onerror="this.remove()">`
    : `<span class="m-logo m-logo-empty">${esc((name || '?').slice(0, 1))}</span>`;

  return `
  <div class="match${live ? ' is-live' : ''}">
    <div class="m-league">${esc(m.league)}</div>
    <div class="m-row">
      <div class="m-team">${logo(m.homeLogo, m.home)}<span>${esc(m.home)}</span></div>
      <div class="m-mid">${score}${status}</div>
      <div class="m-team m-team-away"><span>${esc(m.away)}</span>${logo(m.awayLogo, m.away)}</div>
    </div>
  </div>`;
}

function renderMatches(list) {
  const box = document.getElementById('matches');

  if (!list.length) {
    box.innerHTML = emptyHTML('sport.noMatches', 'sport.noMatchesHint');
    document.getElementById('matchCount').textContent = '';
    return;
  }

  // Bugungilarni ajratamiz, keyin vaqt bo'yicha saralaymiz
  const today = list.filter(m => isToday(m.date)).sort((a, b) => new Date(a.date) - new Date(b.date));
  const rest = list.filter(m => !isToday(m.date)).sort((a, b) => new Date(a.date) - new Date(b.date));

  // Guruhlar: hozir jonli / bugun kechqurun boshlanadigan / qolganlari
  const live = list.filter(m => m.state === 'in');
  const evening = today.filter(m => m.state === 'pre' && new Date(m.date).getHours() >= 17 && !live.includes(m));
  const others = today.filter(m => !live.includes(m) && !evening.includes(m));

  const group = (titleKey, arr, cls = '') => arr.length
    ? `<div class="m-group-title">${t(titleKey)} <b>${arr.length}</b></div>
       <div class="m-list ${cls}">${arr.map(matchHTML).join('')}</div>`
    : '';

  let html = '';
  html += group('sport.liveNow', live, 'm-list-live');
  html += group('sport.evening', evening, 'm-list-hl');
  html += group('sport.otherToday', others);
  if (rest.length) html += group('sport.otherDays', rest);

  box.innerHTML = html;
  document.getElementById('matchCount').textContent = `${today.length || list.length} ${t('sport.matches')}`;
}

function newsHTML(a) {
  const img = a.images && a.images[0] && a.images[0].url;
  const link = a.links?.web?.href || a.links?.mobile?.href;
  const date = a.published ? new Date(a.published).toLocaleDateString(LANG === 'ru' ? 'ru-RU' : 'uz-UZ',
    { day: 'numeric', month: 'long' }) : '';

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

function renderNews(list) {
  const box = document.getElementById('news');
  if (!list.length) { box.innerHTML = ''; return; }
  box.innerHTML = `<div class="news-grid">${list.slice(0, 6).map(newsHTML).join('')}</div>`;
  observeReveals(box);
}

function loadingHTML() {
  return `<div class="empty"><div class="empty-icon">${ICONS.ball}</div><h3>${t('sport.loading')}</h3><p></p></div>`;
}

function errorHTML() {
  return `
  <div class="empty">
    <div class="empty-icon">${ICONS.empty}</div>
    <h3>${t('sport.error')}</h3>
    <p>${t('sport.errorHint')}</p>
    <button class="btn btn-ghost" id="retry" style="margin-top:16px">${t('sport.retry')}</button>
  </div>`;
}

/* ---------- Filtrlar ---------- */

function renderLeagues() {
  const box = document.getElementById('leagueChips');
  box.innerHTML = LEAGUES.map(l =>
    `<button class="chip${league === l.id ? ' is-active' : ''}" data-lg="${l.id}">${esc(l[LANG] || l.uz)}</button>`).join('');
  box.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    league = b.dataset.lg;
    const p = new URLSearchParams();
    if (league !== 'all') p.set('league', league);
    history.replaceState(null, '', p.toString() ? '?' + p : location.pathname);
    renderLeagues();
    load();
  }));
}

/* ---------- Yuklash ---------- */

async function load() {
  document.getElementById('matches').innerHTML = loadingHTML();
  document.getElementById('news').innerHTML = '';

  try {
    const [matches, news] = await Promise.all([
      fetchMatches(),
      fetchNews().catch(() => [])          // yangiliklar bo'lmasa ham o'yinlar ko'rsatiladi
    ]);
    renderMatches(matches);
    renderNews(news);
  } catch (e) {
    document.getElementById('matches').innerHTML = errorHTML();
    document.getElementById('retry')?.addEventListener('click', load);
  }
}

/* ---------- Ishga tushirish ---------- */

initLayout();
renderLeagues();
load();
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('langchange', () => {
  renderLeagues();
  load();
  applyI18n();
});
