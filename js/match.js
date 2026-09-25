/* ============================================================
   DezoMax — Sport: o'yin oynasi (o'yin kartasiga bosilganda)
   ------------------------------------------------------------
   - Jonli o'yin: "Jonli ko'rish" — sport telekanaliga o'tish (tv.html?ch=...)
   - Jamoalar: logotip, forma (so'nggi 5 o'yin), liga jadvali
   - Futbolchilar: tarkib e'lon qilingan bo'lsa — asosiy tarkib,
     aks holda jamoa ro'yxati (surat bo'lsa surat, bo'lmasa raqam)
   Ma'lumot: ESPN ochiq API (summary va team roster).
   sport.js dan oldin yuklanadi.
   ============================================================ */

const EVENT_INDEX = new Map();     // "soccer:12345" -> { e, sportId }

Object.assign(I18N.uz, {
  'sport.watchLive': 'Jonli ko‘rish',
  'sport.details': 'Batafsil',
  'sport.liveTitle': 'O‘yin hozir efirda',
  'sport.liveHint': 'Sport telekanallaridan birini tanlang. Kanal boshqa o‘yin yoki ko‘rsatuvni efirga uzatayotgan bo‘lishi mumkin.',
  'sport.officialTv': 'Rasmiy translyatsiya',
  'sport.venue': 'Stadion',
  'sport.form': 'So‘nggi o‘yinlar',
  'sport.lineup': 'Tarkib',
  'sport.squad': 'Jamoa tarkibi',
  'sport.starters': 'Asosiy tarkib',
  'sport.subs': 'Zaxira',
  'sport.table': 'Jadval',
  'sport.pts': 'O',
  'sport.gp': 'O‘',
  'sport.noPlayers': 'Futbolchilar ro‘yxati hali e’lon qilinmagan',
  'sport.age': 'yosh',
  'sport.startsIn': 'Boshlanishiga',
  'sport.h': 'soat',
  'sport.m': 'daq.',
  'sport.pos.G': 'Darvozabon', 'sport.pos.D': 'Himoyachi', 'sport.pos.M': 'Yarim himoyachi', 'sport.pos.F': 'Hujumchi'
});
Object.assign(I18N.ru, {
  'sport.watchLive': 'Смотреть',
  'sport.details': 'Подробнее',
  'sport.liveTitle': 'Матч сейчас в эфире',
  'sport.liveHint': 'Выберите спортивный телеканал. На канале может идти другой матч или передача.',
  'sport.officialTv': 'Официальная трансляция',
  'sport.venue': 'Стадион',
  'sport.form': 'Последние матчи',
  'sport.lineup': 'Состав',
  'sport.squad': 'Состав команды',
  'sport.starters': 'Основной состав',
  'sport.subs': 'Запасные',
  'sport.table': 'Таблица',
  'sport.pts': 'О',
  'sport.gp': 'И',
  'sport.noPlayers': 'Список игроков пока не объявлен',
  'sport.age': 'лет',
  'sport.startsIn': 'До начала',
  'sport.h': 'ч',
  'sport.m': 'мин',
  'sport.pos.G': 'Вратарь', 'sport.pos.D': 'Защитник', 'sport.pos.M': 'Полузащитник', 'sport.pos.F': 'Нападающий'
});

/* Sport telekanallari (sport.html channels.js ni yuklamaydi — id'lar channels.js bilan bir xil) */
const CHANNELS_LITE = [
  { id: 'Sport',          name: 'Sport',         logo: 'images/tv/Sport.jpg' },
  { id: 'MatchPlanetaRU', name: 'Матч! Планета', logo: 'images/tv/MatchPlanetaRU.png' },
  { id: 'MatchUltraRU',   name: 'Матч! Ультра',  logo: 'images/tv/MatchUltraRU.jpg' },
  { id: 'KHLRU',          name: 'КХЛ',           logo: 'images/tv/KHLRU.png' },
  { id: 'KHLPrimeRU',     name: 'КХЛ Prime',     logo: 'images/tv/KHLPrimeRU.png' }
];

/* Sport turiga mos jonli kanallar */
const LIVE_CHANNELS = {
  soccer:     ['Sport', 'MatchPlanetaRU', 'MatchUltraRU'],
  hockey:     ['KHLRU', 'KHLPrimeRU', 'Sport'],
  basketball: ['Sport', 'MatchPlanetaRU'],
  tennis:     ['Sport', 'MatchPlanetaRU'],
  mma:        ['MatchUltraRU', 'Sport']
};

const FORM_CLASS = { W: 'is-w', D: 'is-d', L: 'is-l', V: 'is-w', N: 'is-d', P: 'is-l' };

let matchReq = 0;

function openMatch(item) {
  if (!item) return;
  const { e, sportId } = item;
  closeMoreSheet();

  const wrap = document.createElement('div');
  wrap.className = 'sheet-wrap mt-wrap';
  wrap.innerHTML = `
    <div class="sheet-backdrop" data-sheet-close></div>
    <div class="mt-panel" role="dialog" aria-modal="true">
      <button class="mt-close" type="button" data-sheet-close aria-label="${esc(t('nav.close'))}">${ICONS.close}</button>
      <div class="mt-scroll">
        ${matchHeadHTML(e)}
        ${e.state === 'in' ? liveBoxHTML(sportId) : ''}
        <div class="mt-body" id="mtBody"><div class="mt-loading"><i></i><i></i><i></i></div></div>
      </div>
    </div>`;

  document.body.appendChild(wrap);
  document.body.classList.add('no-scroll');
  fitToVisible(wrap);
  requestAnimationFrame(() => wrap.classList.add('is-open'));
  wrap.querySelectorAll('[data-sheet-close]').forEach(el => el.addEventListener('click', closeMoreSheet));
  document.addEventListener('keydown', escCloseSheet);

  const countdown = wrap.querySelector('[data-countdown]');
  if (countdown) {
    const tick = () => {
      if (!document.body.contains(countdown)) return clearInterval(timer);
      countdown.textContent = countdownText(e.date);
    };
    const timer = setInterval(tick, 30000);
  }

  loadMatchDetails(e, sportId, ++matchReq);
}

/* Ba'zi qurilmalarda (Fold va h.k.) fixed oyna ko'rinadigan ekrandan kengroq chiqadi —
   oynani qurilma haqiqatan ko'rib turgan kenglikka (visualViewport) moslaymiz */
function fitToVisible(wrap) {
  const vv = window.visualViewport;
  if (!vv) return;
  const fit = () => {
    if (!wrap.isConnected) { vv.removeEventListener('resize', fit); vv.removeEventListener('scroll', fit); return; }
    const w = Math.round(vv.width);
    if (w > 0 && w < document.documentElement.clientWidth - 1) {
      wrap.style.right = 'auto';
      wrap.style.left = Math.round(vv.offsetLeft) + 'px';
      wrap.style.width = w + 'px';
    } else {
      wrap.style.left = wrap.style.right = wrap.style.width = '';
    }
  };
  fit();
  vv.addEventListener('resize', fit);
  vv.addEventListener('scroll', fit);
}

function countdownText(date) {
  const ms = new Date(date) - Date.now();
  if (ms <= 0) return '';
  const h = Math.floor(ms / 3600e3), m = Math.floor(ms % 3600e3 / 60e3);
  return `${t('sport.startsIn')}: ${h ? `${h} ${t('sport.h')} ` : ''}${m} ${t('sport.m')}`;
}

function matchHeadHTML(e) {
  const live = e.state === 'in', done = e.state === 'post';
  const big = s => s.logo
    ? `<img class="mt-logo" src="${esc(s.logo)}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'mt-logo mt-logo-empty',textContent:'${esc((s.name || '?')[0])}'}))">`
    : `<span class="mt-logo mt-logo-empty">${esc((s.name || '?')[0])}</span>`;

  let center;
  if (live || done) {
    center = `<div class="mt-score${live ? ' is-live' : ''}">${esc(e.a.score || 0)}<span>:</span>${esc(e.b.score || 0)}</div>
      ${live ? `<span class="m-live"><i></i>${t('sport.live')}${e.clock && e.clock !== '0:00' ? ' ' + esc(e.clock) : ''}</span>`
             : `<span class="mt-status">${t('sport.finished')}</span>`}`;
  } else {
    center = `<div class="mt-time">${timeFmt(e.date)}</div>
      <span class="mt-status">${esc(dayLabel(e.date))}</span>
      <span class="mt-countdown" data-countdown>${countdownText(e.date)}</span>`;
  }

  return `
    <div class="mt-head">
      <div class="mt-league">${esc(e.league || '')}</div>
      <div class="mt-teams">
        <div class="mt-team">${big(e.a)}<b>${esc(e.a.full || e.a.name)}</b>${formHTML(e.a.form)}</div>
        <div class="mt-center">${center}</div>
        <div class="mt-team">${big(e.b)}<b>${esc(e.b.full || e.b.name)}</b>${formHTML(e.b.form)}</div>
      </div>
      <div class="mt-meta" id="mtMeta"></div>
    </div>`;
}

function formHTML(form) {
  if (!form) return '';
  return `<span class="mt-form">${[...String(form).slice(-5)].map(c =>
    `<i class="${FORM_CLASS[c] || ''}">${esc(c)}</i>`).join('')}</span>`;
}

function liveBoxHTML(sportId) {
  const ids = LIVE_CHANNELS[sportId] || LIVE_CHANNELS.soccer;
  const list = ids.map(id => CHANNELS_LITE.find(c => c.id === id)).filter(Boolean);
  if (!list.length) return '';
  return `
    <div class="mt-live">
      <div class="mt-live-head"><span class="mt-live-dot"></span><b>${t('sport.liveTitle')}</b></div>
      <div class="mt-live-list">
        ${list.map(c => `
          <a class="mt-ch" href="tv.html?ch=${encodeURIComponent(c.id)}">
            <span class="mt-ch-logo">${c.logo ? `<img src="${esc(c.logo)}" alt="" onerror="this.remove()">` : ''}<em>${esc(c.name.slice(0, 2))}</em></span>
            <span class="mt-ch-name">${esc(c.name)}</span>
            <span class="mt-ch-play">${ICONS.play}</span>
          </a>`).join('')}
      </div>
      <p class="mt-live-hint">${t('sport.liveHint')}</p>
    </div>`;
}

/* ---------- Tafsilotlar ---------- */

async function loadMatchDetails(e, sportId, req) {
  const body = () => document.getElementById('mtBody');
  if (!e.path) { body() && (body().innerHTML = ''); return; }

  let s;
  try {
    s = await getJSON(`${API}/site/v2/sports/${e.path}/summary?event=${e.id}`);
  } catch {
    if (req === matchReq && body()) body().innerHTML = `<p class="mt-empty">${t('sport.error')}</p>`;
    return;
  }
  if (req !== matchReq || !body()) return;

  // stadion, rasmiy translyatsiya
  const venue = s.gameInfo?.venue;
  const tv = [...new Set((s.broadcasts || []).map(b => b.media?.shortName || b.media?.name).filter(Boolean))];
  const meta = document.getElementById('mtMeta');
  if (meta) meta.innerHTML = [
    venue ? `<span>🏟️ ${esc(venue.fullName)}${venue.address?.city ? ', ' + esc(venue.address.city) : ''}</span>` : '',
    tv.length ? `<span>📺 ${t('sport.officialTv')}: ${esc(tv.join(', '))}</span>` : ''
  ].join('');

  // jamoalar (uy / mehmon tartibida)
  const comps = s.header?.competitions?.[0]?.competitors || [];
  const home = comps.find(c => c.homeAway === 'home') || comps[0];
  const away = comps.find(c => c.homeAway === 'away') || comps[1];
  const teams = [home, away].filter(Boolean).map(c => ({
    id: c.team?.id || c.id,
    name: c.team?.displayName || '',
    short: c.team?.abbreviation || c.team?.shortDisplayName || '',
    logo: c.team?.logos?.[0]?.href || c.team?.logo || '',
    color: c.team?.color ? '#' + c.team.color : '#0a93dc'
  }));

  // ro'yxatda logotip bo'lmagan bo'lsa — batafsil ma'lumotdagisini qo'yamiz
  document.querySelectorAll('.mt-team .mt-logo-empty').forEach((el, i) => {
    if (!teams[i]?.logo) return;
    const img = document.createElement('img');
    img.className = 'mt-logo';
    img.src = teams[i].logo;
    img.alt = '';
    img.onload = () => el.replaceWith(img);
  });

  const tabs = [];
  if (teams.length === 2 && !/tennis|mma|racing/.test(e.path)) tabs.push(['players', t('sport.lineup')]);
  if (s.lastFiveGames?.length) tabs.push(['form', t('sport.form')]);
  if (s.standings?.groups?.length) tabs.push(['table', t('sport.table')]);

  if (!tabs.length) { body().innerHTML = ''; return; }

  body().innerHTML = `
    <div class="mt-tabs">${tabs.map(([id, label], i) => `<button type="button" data-tab="${id}" class="${i ? '' : 'is-active'}">${esc(label)}</button>`).join('')}</div>
    <div class="mt-tab" id="mtTab"></div>`;

  const show = async id => {
    body().querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('is-active', b.dataset.tab === id));
    const box = document.getElementById('mtTab');
    if (id === 'form') box.innerHTML = lastFiveHTML(s.lastFiveGames);
    if (id === 'table') box.innerHTML = standingsHTML(s.standings, teams);
    if (id === 'players') await renderPlayers(box, e, s, teams, req);
  };
  body().querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => show(b.dataset.tab)));
  show(tabs[0][0]);
}

/* ---------- Futbolchilar ---------- */

async function renderPlayers(box, e, s, teams, req) {
  box.innerHTML = `
    <div class="mt-team-switch">${teams.map((tm, i) => `
      <button type="button" data-team="${i}" class="${i ? '' : 'is-active'}" style="--tc:${esc(tm.color)}">
        ${tm.logo ? `<img src="${esc(tm.logo)}" alt="" onerror="this.remove()">` : ''}<span>${esc(tm.short || tm.name)}</span>
      </button>`).join('')}</div>
    <div id="mtPlayers"><div class="mt-loading"><i></i><i></i><i></i></div></div>`;

  const cache = {};
  const load = async i => {
    box.querySelectorAll('[data-team]').forEach(b => b.classList.toggle('is-active', +b.dataset.team === i));
    const out = box.querySelector('#mtPlayers');
    const tm = teams[i];

    // 1) o'yin tarkibi e'lon qilingan bo'lsa
    const lineup = (s.rosters || []).find(r => String(r.team?.id) === String(tm.id));
    if (lineup?.roster?.length) {
      const toP = x => ({
        name: x.athlete?.displayName, pos: x.position?.abbreviation, jersey: x.jersey,
        head: x.athlete?.headshot?.href, flag: x.athlete?.flag?.href, starter: x.starter
      });
      const all = lineup.roster.map(toP);
      out.innerHTML = playersGridHTML(all.filter(p => p.starter), t('sport.starters'), tm)
                    + playersGridHTML(all.filter(p => !p.starter), t('sport.subs'), tm);
      return;
    }

    // 2) jamoaning to'liq ro'yxati
    if (!cache[i]) {
      try {
        const j = await getJSON(`${API}/site/v2/sports/${e.path}/teams/${tm.id}/roster`);
        let a = j.athletes || [];
        if (a[0]?.items) a = a.flatMap(g => g.items);        // ba'zi sportlarda pozitsiya bo'yicha guruhlangan
        cache[i] = a.map(x => ({
          name: x.displayName || x.fullName, pos: x.position?.abbreviation, jersey: x.jersey,
          head: x.headshot?.href, flag: x.flag?.href, age: x.age
        }));
      } catch { cache[i] = []; }
    }
    if (req !== matchReq) return;
    const list = cache[i];
    if (!list.length) { out.innerHTML = `<p class="mt-empty">${t('sport.noPlayers')}</p>`; return; }
    // suratli futbolchilar birinchi
    const sorted = [...list].sort((x, y) => (!!y.head - !!x.head));
    out.innerHTML = playersGridHTML(sorted, t('sport.squad'), tm);
  };

  box.querySelectorAll('[data-team]').forEach(b => b.addEventListener('click', () => load(+b.dataset.team)));
  await load(0);
}

function playersGridHTML(list, title, tm) {
  if (!list.length) return '';
  return `
    <h4 class="mt-h4">${esc(title)} <small>${list.length}</small></h4>
    <div class="mt-players">
      ${list.map(p => `
        <div class="mt-player" style="--tc:${esc(tm.color)}">
          <span class="mt-ph">
            ${p.head ? `<img src="${esc(p.head)}" alt="" loading="lazy" onerror="this.remove()">` : ''}
            <em>${esc(p.jersey || (p.name || '?')[0])}</em>
            ${p.flag ? `<img class="mt-flag" src="${esc(p.flag)}" alt="" loading="lazy" onerror="this.remove()">` : ''}
          </span>
          <b>${esc(p.name || '')}</b>
          <small>${esc([p.jersey ? '#' + p.jersey : '', I18N[LANG]['sport.pos.' + p.pos] || p.pos || '', p.age ? `${p.age} ${t('sport.age')}` : ''].filter(Boolean).join(' · '))}</small>
        </div>`).join('')}
    </div>`;
}

/* ---------- So'nggi o'yinlar ---------- */

function lastFiveHTML(groups) {
  return groups.map(g => `
    <div class="mt-l5">
      <div class="mt-l5-team">${g.team?.logo ? `<img src="${esc(g.team.logo)}" alt="" onerror="this.remove()">` : ''}<b>${esc(g.team?.displayName || '')}</b></div>
      ${(g.events || []).slice(0, 5).map(ev => `
        <div class="mt-l5-row">
          <i class="mt-res ${FORM_CLASS[ev.gameResult] || ''}">${esc(ev.gameResult || '·')}</i>
          <span class="mt-l5-opp">${ev.atVs === '@' ? '@ ' : ''}${esc(ev.opponent?.displayName || '')}</span>
          <span class="mt-l5-score">${esc(ev.score || '')}</span>
          <span class="mt-l5-date">${ev.gameDate ? esc(shortDate(ev.gameDate)) : ''}</span>
        </div>`).join('')}
    </div>`).join('');
}

/* ---------- Liga jadvali ---------- */

function standingsHTML(st, teams) {
  const group = st.groups.find(g => (g.standings?.entries || []).some(en => teams.some(tm => String(en.id || en.team?.id) === String(tm.id) || en.team === tm.name))) || st.groups[0];
  const entries = group.standings?.entries || [];
  const stat = (en, name) => en.stats?.find(x => x.name === name || x.type === name)?.displayValue ?? '';
  const isOurs = en => teams.some(tm => en.team === tm.name || String(en.id) === String(tm.id) || en.team?.displayName === tm.name);

  return `
    ${group.header ? `<h4 class="mt-h4">${esc(group.header)}</h4>` : ''}
    <div class="mt-table-wrap">
      <table class="mt-table">
        <thead><tr><th>#</th><th></th><th>${t('sport.gp')}</th><th>+/−</th><th>${t('sport.pts')}</th></tr></thead>
        <tbody>
          ${entries.map((en, i) => `
            <tr class="${isOurs(en) ? 'is-ours' : ''}">
              <td>${i + 1}</td>
              <td class="mt-t-team">${en.logo?.[0]?.href ? `<img src="${esc(en.logo[0].href)}" alt="" loading="lazy" onerror="this.remove()">` : ''}<span>${esc(typeof en.team === 'string' ? en.team : en.team?.displayName || '')}</span></td>
              <td>${esc(stat(en, 'gamesPlayed'))}</td>
              <td>${esc(stat(en, 'pointDifferential'))}</td>
              <td><b>${esc(stat(en, 'points'))}</b></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}
