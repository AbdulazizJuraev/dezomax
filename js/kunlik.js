/* ============================================================
   DezoMax — Ob-havo va valyuta kursi (2026-11-24)
   ------------------------------------------------------------
   Sahifalar: ob-havo.html (+ ob-havo/<shahar>.html — tools/gen-weather-pages.js), valyuta.html.
   Bosh sahifada «Kunlik» blok (#dzxKunlik, js/home5.js).
   Ma'lumot — Worker (cloudflare/site/worker.js):
     /_w/wx?lat=&lon=   MET Norway prognozi (CC BY 4.0) · /_w/wx-all  viloyatlar · /_w/fx  Markaziy bank kurslari · /_w/fx-hist  kurs tarixi
   Dizayn: D:\MARK\DezoMax-dizaynlar\Ob-havo-*.png va Figma «Valyuta kursi» sahifasi.
   ============================================================ */
(function () {
  const ru = typeof LANG !== 'undefined' && LANG === 'ru';
  const L = (u, r) => (ru ? r : u);
  const API = /^(dezomax\.uz|localhost|127\.0\.0\.1)$/.test(location.hostname) ? '' : 'https://dezomax.uz';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const getJSON = (p, ms = 0) => {
    const k = 'dzxK:' + p;
    if (ms) try { const c = JSON.parse(sessionStorage.getItem(k) || 'null'); if (c && Date.now() - c.t < ms) return Promise.resolve(c.v); } catch (e) {}
    return fetch(API + p).then(r => (r.ok ? r.json() : Promise.reject(r.status))).then(v => { if (ms) try { sessionStorage.setItem(k, JSON.stringify({ t: Date.now(), v })); } catch (e) {} return v; });
  };

  /* ---------- shaharlar (viloyat markazlari) ---------- */
  const CITIES = [
    ['toshkent', 'Toshkent', 'Ташкент', 41.311, 69.280], ['samarqand', 'Samarqand', 'Самарканд', 39.654, 66.960],
    ['buxoro', 'Buxoro', 'Бухара', 39.768, 64.421], ['andijon', 'Andijon', 'Андижан', 40.783, 72.344],
    ['namangan', 'Namangan', 'Наманган', 41.000, 71.668], ['fargona', 'Farg‘ona', 'Фергана', 40.389, 71.784],
    ['qarshi', 'Qarshi', 'Карши', 38.861, 65.789], ['termiz', 'Termiz', 'Термез', 37.224, 67.278],
    ['nukus', 'Nukus', 'Нукус', 42.461, 59.616], ['urganch', 'Urganch', 'Ургенч', 41.550, 60.631],
    ['navoiy', 'Navoiy', 'Навои', 40.084, 65.379], ['jizzax', 'Jizzax', 'Джизак', 40.116, 67.842],
    ['guliston', 'Guliston', 'Гулистан', 40.490, 68.784], ['nurafshon', 'Nurafshon', 'Нурафшан', 41.042, 69.358]
  ];
  const cityBy = s => CITIES.find(c => c[0] === s) || CITIES[0];
  const cityName = c => (ru ? c[2] : c[1]);
  const savedCity = () => { try { return localStorage.getItem('dzx_wx_city') || ''; } catch (e) { return ''; } };
  const saveCity = s => { try { localStorage.setItem('dzx_wx_city', s); } catch (e) {} };
  // ob-havo/<shahar>.html da <base href="../"> — shu sababli hamma joyda ildizga nisbatan manzil
  const cityUrl = s => 'ob-havo/' + s + '.html';

  /* ---------- ob-havo belgilari ---------- */
  const SUNP = '<circle cx="24" cy="24" r="9" fill="#FFD23F"/><g stroke="#FFD23F" stroke-width="3" stroke-linecap="round"><path d="M24 5v5M24 38v5M5 24h5M38 24h5M10.6 10.6l3.5 3.5M33.9 33.9l3.5 3.5M10.6 37.4l3.5-3.5M33.9 14.1l3.5-3.5"/></g>';
  const MOONP = '<path d="M31 9a15 15 0 1 0 9 22A12 12 0 0 1 31 9z" fill="#DCE7FF"/>';
  const CL = (x, y, c = '#E8EEF2') => `<path transform="translate(${x} ${y})" d="M14 38h22a8 8 0 0 0 0-16 11 11 0 0 0-21-3 9 9 0 0 0-1 19z" fill="${c}"/>`;
  const ICONS = {
    clear: SUNP, night: MOONP,
    partly: '<g transform="translate(-4 -6) scale(.8)">' + SUNP + '</g>' + CL(4, 4),
    partlyn: '<g transform="translate(-2 -4) scale(.75)">' + MOONP + '</g>' + CL(4, 4),
    cloudy: CL(-6, -4, '#9AA9B4') + CL(2, 2),
    fog: CL(0, -8) + '<g stroke="#C9D3DA" stroke-width="3" stroke-linecap="round"><path d="M9 38h30M13 44h22"/></g>',
    rain: CL(0, -6) + '<g stroke="#7CC4FF" stroke-width="3" stroke-linecap="round"><path d="M17 38l-2 6M25 38l-2 6M33 38l-2 6"/></g>',
    snow: CL(0, -6) + '<g fill="#FFFFFF"><circle cx="16" cy="40" r="2.4"/><circle cx="24" cy="44" r="2.4"/><circle cx="32" cy="40" r="2.4"/></g>',
    thunder: CL(0, -6, '#9AA9B4') + '<path d="M25 30l-6 9h5l-3 8 8-11h-5l3-6z" fill="#FFD23F"/>'
  };
  function iconKey(code) {
    const c = String(code || ''), n = /_night/.test(c);
    if (/thunder/.test(c)) return 'thunder';
    if (/snow/.test(c)) return 'snow';
    if (/rain|sleet/.test(c)) return 'rain';
    if (/fog/.test(c)) return 'fog';
    if (/cloudy$|^cloudy/.test(c.replace(/_(day|night|polartwilight)$/, '')) && !/partly/.test(c)) return 'cloudy';
    if (/partly|fair/.test(c)) return n ? 'partlyn' : 'partly';
    return n ? 'night' : 'clear';
  }
  const icon = (code, cls = '') => `<svg class="wx-ic ${cls}" viewBox="0 0 48 48" aria-hidden="true">${ICONS[iconKey(code)]}</svg>`;
  function condText(code) {
    const b = String(code || '').replace(/_(day|night|polartwilight)$/, '');
    const T = {
      clearsky: ['Ochiq osmon', 'Ясно'], fair: ['Asosan ochiq', 'Малооблачно'], partlycloudy: ['Qisman bulutli', 'Переменная облачность'],
      cloudy: ['Bulutli', 'Облачно'], fog: ['Tuman', 'Туман'], lightrain: ['Yengil yomg‘ir', 'Небольшой дождь'], rain: ['Yomg‘ir', 'Дождь'],
      heavyrain: ['Kuchli yomg‘ir', 'Сильный дождь'], lightsnow: ['Yengil qor', 'Небольшой снег'], snow: ['Qor', 'Снег'], heavysnow: ['Kuchli qor', 'Сильный снег'],
      sleet: ['Qor aralash yomg‘ir', 'Мокрый снег'], lightsleet: ['Qor aralash yomg‘ir', 'Мокрый снег']
    };
    if (T[b]) return L(...T[b]);
    if (/thunder/.test(b)) return L('Momaqaldiroq', 'Гроза');
    if (/showers/.test(b)) return /snow/.test(b) ? L('Qor yog‘adi', 'Снегопад') : L('Jala', 'Ливень');
    if (/snow/.test(b)) return L('Qor', 'Снег');
    if (/rain|sleet/.test(b)) return L('Yomg‘ir', 'Дождь');
    return '';
  }
  const deg = t => (t > 0 ? '+' : t < 0 ? '−' : '') + Math.abs(Math.round(t)) + '°';
  const WD = ru ? ['северный', 'северо-восточный', 'восточный', 'юго-восточный', 'южный', 'юго-западный', 'западный', 'северо-западный']
    : ['shimoliy', 'shimoli-sharqiy', 'sharqiy', 'janubi-sharqiy', 'janubiy', 'janubi-g‘arbiy', 'g‘arbiy', 'shimoli-g‘arbiy'];
  const windDir = d => WD[Math.round(((d % 360) + 360) % 360 / 45) % 8];
  const DAYN = ru ? ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] : ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
  const MON = ru ? ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    : ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
  const dOf = s => new Date(s + 'T12:00:00Z');
  const dateTxt = s => { const d = dOf(s); return ru ? `${d.getUTCDate()} ${MON[d.getUTCMonth()]}` : `${d.getUTCDate()}-${MON[d.getUTCMonth()]}`; };
  // quyosh chiqishi/botishi (NOAA soddalashtirilgan formulasi), O'zbekiston vaqti (UTC+5)
  function sunTimes(lat, lon, iso) {
    const d = dOf(iso), rad = Math.PI / 180;
    const doy = Math.floor((d - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5);
    const g = 2 * Math.PI / 365 * (doy - 1);
    const eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    const dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    const ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(dec)) - Math.tan(lat * rad) * Math.tan(dec)) / rad;
    const noon = 720 - 4 * lon - eqt + 300;
    const hm = m => { m = ((Math.round(m) % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
    return [hm(noon - 4 * ha), hm(noon + 4 * ha)];
  }
  const wxOf = c => getJSON(`/_w/wx?lat=${c[3].toFixed(2)}&lon=${c[4].toFixed(2)}`, 10 * 60000);

  /* ---------- valyuta ---------- */
  const SYM = { USD: '$', EUR: '€', RUB: '₽', KZT: '₸', CNY: '¥', GBP: '£', TRY: '₺', KRW: '₩', JPY: '¥', CHF: 'Fr', KGS: 'с', TJS: 'SM', AED: 'AED', UZS: 'so‘m', INR: '₹', UAH: '₴' };
  const POPULAR = ['EUR', 'RUB', 'KZT', 'CNY', 'GBP', 'TRY', 'AED', 'KRW', 'JPY', 'CHF', 'KGS', 'TJS'];
  const num = (n, d = 2) => Number(n).toLocaleString('ru-RU', { minimumFractionDigits: d, maximumFractionDigits: d }).replace(/\u00a0/g, ' ');
  const fxName = x => (ru ? x.nr : x.n) || x.c;
  const fxAll = () => getJSON('/_w/fx', 20 * 60000);
  const diffHtml = (d, short) => `<span class="fx-diff ${d > 0 ? 'is-up' : d < 0 ? 'is-down' : ''}">${d > 0 ? '▲ +' : d < 0 ? '▼ −' : '• '}${num(Math.abs(d)).replace(/,00$/, '')}${short ? '' : ' ' + L('so‘m', 'сум')}</span>`;

  /* ================= «Kunlik» blok (bosh sahifa, sahifalar pastida) ================= */
  function mountKunlik(el) {
    if (!el || el.dataset.on) return;
    el.dataset.on = '1';
    const c = cityBy(savedCity() || 'toshkent');
    el.innerHTML = `<a class="kn-tile" href="${cityUrl(c[0])}" id="knWx"><span class="kn-ic">${icon('fair_day')}</span><span><small>${esc(cityName(c))}</small><b>—</b></span></a>
      <a class="kn-tile" href="valyuta.html" id="knFx"><span class="kn-ic kn-cur">$</span><span><small>${L('Dollar kursi', 'Курс доллара')}</small><b>—</b></span></a>`;
    wxOf(c).then(w => {
      const t = el.querySelector('#knWx');
      t.querySelector('.kn-ic').innerHTML = icon(w.now.s);
      t.querySelector('small').textContent = `${cityName(c)} · ${condText(w.now.s).toLowerCase()}`;
      const tm = w.days[1];
      t.querySelector('b').textContent = deg(w.now.t) + (tm ? ` · ${L('ertaga', 'завтра')} ${deg(tm[2])}` : '');
    }).catch(() => { el.querySelector('#knWx b').textContent = L('Ob-havo', 'Погода'); });
    fxAll().then(j => {
      const u = j.list.find(x => x.c === 'USD');
      if (u) el.querySelector('#knFx b').textContent = `$1 = ${num(u.r)}`;
    }).catch(() => { el.querySelector('#knFx b').textContent = L('Valyuta kursi', 'Курсы валют'); });
  }

  /* ================= Ob-havo sahifasi ================= */
  function weatherPage(main) {
    const c = cityBy(window.DZX_CITY || savedCity() || 'toshkent');
    if (window.DZX_CITY) saveCity(c[0]);
    main.innerHTML = `
      <div class="wx-top"><div><h1>${L('Ob-havo', 'Погода')}${window.DZX_CITY ? ` <em>${esc(cityName(c))}</em>` : ''}</h1>
        <p class="wx-sub">${L('O‘zbekiston shaharlari · soatlik va 10 kunlik prognoz', 'Города Узбекистана · почасовой прогноз и на 10 дней')}</p></div>
        <div class="wx-find"><input type="search" id="wxQ" placeholder="${L('Shaharni qidiring', 'Найти город')}" autocomplete="off" aria-label="${L('Shaharni qidiring', 'Найти город')}"><div class="wx-res" id="wxRes" hidden></div></div></div>
      <div class="wx-grid"><div class="wx-col"><div class="wx-card wx-hero" id="wxHero"><div class="wx-sk"></div></div><div class="wx-card" id="wxHours"><h2>${L('Soatlik prognoz', 'Почасовой прогноз')}</h2><div class="wx-sk"></div></div></div>
        <div class="wx-card" id="wxDays"><h2>${L('10 kunlik prognoz', 'Прогноз на 10 дней')}</h2><div class="wx-sk"></div></div></div>
      <section class="wx-regs"><div class="wx-rh"><h2>${L('Viloyatlar bo‘yicha', 'По областям')}</h2><small>${L('hozir', 'сейчас')}</small></div>
        <div class="wx-rg" id="wxRegs">${CITIES.map(x => `<a class="wx-reg${x[0] === c[0] ? ' is-on' : ''}" href="${cityUrl(x[0])}" data-c="${x[0]}"><span class="wx-reg-ic"></span><span class="wx-reg-n"><b>${esc(cityName(x))}</b><small></small></span><em></em></a>`).join('')}</div></section>
      <section class="kunlik kn-page" id="dzxKunlik"></section>
      <p class="wx-note">${L('Ma’lumot: MET Norway (Norvegiya meteorologiya instituti), CC BY 4.0. Har 30 daqiqada yangilanadi.', 'Данные: MET Norway (Норвежский метеорологический институт), CC BY 4.0. Обновляется каждые 30 минут.')}</p>`;
    // qidiruv
    const q = $('wxQ'), res = $('wxRes');
    q.addEventListener('input', () => {
      const s = q.value.trim().toLowerCase();
      const list = s ? CITIES.filter(x => x[1].toLowerCase().includes(s) || x[2].toLowerCase().includes(s) || x[0].includes(s)) : [];
      res.hidden = !list.length;
      res.innerHTML = list.map(x => `<a href="${cityUrl(x[0])}">${esc(cityName(x))}</a>`).join('');
    });
    q.addEventListener('keydown', e => { if (e.key === 'Enter') { const a = res.querySelector('a'); if (a) location.href = a.href; } });
    document.addEventListener('click', e => { if (!e.target.closest('.wx-find')) res.hidden = true; });
    main.addEventListener('click', e => { const a = e.target.closest('a[data-c]'); if (a) saveCity(a.dataset.c); });

    wxOf(c).then(w => {
      const n = w.now, today = w.days[0] ? w.days[0][0] : new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10);
      const [rise, set] = sunTimes(c[3], c[4], today);
      const hourNow = w.hours[0] ? w.hours[0][0] : '';
      $('wxHero').innerHTML = `
        <div class="wx-htop"><div><div class="wx-city">${esc(cityName(c))}</div><div class="wx-when">${DAYN[dOf(today).getUTCDay()]}, ${dateTxt(today)} · ${L('hozir', 'сейчас')} ${hourNow}</div></div>
          <button type="button" class="wx-chip" id="wxGeo">◎ ${L('Joylashuvim', 'Моё место')}</button></div>
        <div class="wx-now">${icon(n.s, 'wx-big')}<div><div class="wx-deg">${deg(n.t)}</div><div class="wx-cond">${esc(condText(n.s))}</div></div></div>
        <div class="wx-det">${[[L('Namlik', 'Влажность'), Math.round(n.h) + '%'], [L('Shamol', 'Ветер'), `${Math.round(n.w)} ${L('m/s', 'м/с')} · ${windDir(n.wd)}`],
          [L('Bosim', 'Давление'), Math.round(n.p * 0.750062) + L(' mm', ' мм')], [L('Yog‘in (6 soat)', 'Осадки (6 ч)'), n.r6 + L(' mm', ' мм')],
          [L('Quyosh chiqishi', 'Восход'), rise], [L('Quyosh botishi', 'Закат'), set]].map(([a, b]) => `<div><small>${a}</small><b>${esc(b)}</b></div>`).join('')}</div>`;
      $('wxGeo').addEventListener('click', geo);
      $('wxHours').innerHTML = `<h2>${L('Soatlik prognoz', 'Почасовой прогноз')}</h2><div class="wx-hours">${w.hours.slice(0, 24).filter((_, i) => i % 2 === 0)
        .map((h, i) => `<div class="wx-h${i ? '' : ' is-now'}"><small>${i ? h[0] : L('Hozir', 'Сейчас')}</small>${icon(h[2])}<b>${deg(h[1])}</b></div>`).join('')}</div>`;
      const mn = Math.min(...w.days.map(d => d[1])), mx = Math.max(...w.days.map(d => d[2])), span = Math.max(1, mx - mn);
      $('wxDays').innerHTML = `<h2>${L('10 kunlik prognoz', 'Прогноз на 10 дней')}</h2>${w.days.map((d, i) => `<div class="wx-day">
          <div class="wx-dn"><b>${i === 0 ? L('Bugun', 'Сегодня') : i === 1 ? L('Ertaga', 'Завтра') : DAYN[dOf(d[0]).getUTCDay()]}</b><small>${dateTxt(d[0])}</small></div>
          ${icon(d[3])}<span class="wx-mn">${deg(d[1])}</span><span class="wx-bar"><i style="left:${(d[1] - mn) / span * 100}%;width:${Math.max(4, (d[2] - d[1]) / span * 100)}%"></i></span><span class="wx-mx">${deg(d[2])}</span></div>`).join('')}`;
    }).catch(() => {
      $('wxHero').innerHTML = `<p class="wx-err">${L('Ob-havo ma’lumoti yuklanmadi. Birozdan keyin qayta urinib ko‘ring.', 'Не удалось загрузить погоду. Попробуйте позже.')}</p>`;
      $('wxHours').hidden = $('wxDays').hidden = true;
    });
    getJSON('/_w/wx-all?ll=' + CITIES.map(x => x[3].toFixed(2) + ',' + x[4].toFixed(2)).join(';'), 10 * 60000).then(j => {
      (j.list || []).forEach((r, i) => {
        if (!r) return;
        const a = document.querySelector(`#wxRegs [data-c="${CITIES[i][0]}"]`);
        if (!a) return;
        a.querySelector('.wx-reg-ic').innerHTML = icon(r.s);
        a.querySelector('small').textContent = condText(r.s);
        a.querySelector('em').textContent = deg(r.t);
      });
    }).catch(() => {});
    mountKunlik($('dzxKunlik'));
  }
  // «Joylashuvim» — eng yaqin viloyat markazi
  function geo() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(p => {
      const { latitude: a, longitude: b } = p.coords;
      const best = CITIES.reduce((m, x) => { const d = (x[3] - a) ** 2 + ((x[4] - b) * Math.cos(a * Math.PI / 180)) ** 2; return d < m[0] ? [d, x] : m; }, [1e9, CITIES[0]])[1];
      saveCity(best[0]);
      location.href = cityUrl(best[0]);
    }, () => { if (typeof toast === 'function') toast(L('Joylashuvni aniqlab bo‘lmadi', 'Не удалось определить местоположение')); }, { timeout: 8000, maximumAge: 600000 });
  }

  /* ================= Valyuta sahifasi ================= */
  function fxPage(main) {
    let all = [], range = '30', mode = 'pop', fq = '';
    main.innerHTML = `
      <div class="wx-top"><div><h1>${L('Valyuta kursi', 'Курсы валют')}</h1><p class="wx-sub" id="fxSub">${L('O‘zbekiston Markaziy banki rasmiy kursi', 'Официальный курс Центрального банка Узбекистана')}</p></div>
        <span class="wx-chip is-static">● ${L('Har kuni yangilanadi', 'Обновляется ежедневно')}</span></div>
      <div class="fx-grid"><div class="wx-card fx-hero" id="fxHero"><div class="wx-sk"></div></div><div class="wx-card fx-conv" id="fxConv"><div class="wx-sk"></div></div></div>
      <div class="fx-head"><div class="fx-hl"><h2>${L('Barcha valyutalar', 'Все валюты')}</h2><button type="button" class="wx-chip is-on" data-mode="pop">${L('Mashhur', 'Популярные')}</button><button type="button" class="wx-chip" data-mode="all" id="fxAllBtn">${L('Hammasi', 'Все')}</button></div>
        <input type="search" class="fx-q" id="fxQ" placeholder="${L('Valyutani qidirish', 'Поиск валюты')}" aria-label="${L('Valyutani qidirish', 'Поиск валюты')}"></div>
      <div class="fx-cards" id="fxCards"></div>
      <section class="kunlik kn-page" id="dzxKunlik"></section>
      <p class="wx-note">${L('Manba: O‘zbekiston Respublikasi Markaziy banki (cbu.uz). Banklarda sotib olish va sotish kursi biroz farq qiladi.', 'Источник: Центральный банк Республики Узбекистан (cbu.uz). Курсы покупки и продажи в банках немного отличаются.')}</p>`;
    const per = x => x.r / (x.nom || 1);
    function cards() {
      let list = mode === 'pop' && !fq ? POPULAR.map(c => all.find(x => x.c === c)).filter(Boolean) : all.filter(x => x.c !== 'USD' || fq);
      if (fq) { const s = fq.toLowerCase(); list = list.filter(x => x.c.toLowerCase().includes(s) || String(x.n).toLowerCase().includes(s) || String(x.nr).toLowerCase().includes(s)); }
      $('fxCards').innerHTML = list.map(x => `<div class="fx-card"><div class="fx-ct"><span class="fx-sym">${esc(SYM[x.c] || x.c)}</span><span><b>${x.nom > 1 ? x.nom + ' ' : ''}${esc(x.c)}</b><small>${esc(fxName(x))}</small></span></div>
        <div class="fx-rate">${num(x.r).replace(/,00$/, '')}<small> ${L('so‘m', 'сум')}</small></div>${diffHtml(x.d)}</div>`).join('') || `<p class="wx-note">${L('Topilmadi', 'Не найдено')}</p>`;
    }
    function chart() {
      const box = $('fxChart');
      if (!box) return;
      box.innerHTML = '<div class="wx-sk is-chart"></div>';
      getJSON(`/_w/fx-hist?c=USD&r=${range}`, 60 * 60000).then(j => {
        const p = j.pts || [];
        if (p.length < 2) { box.innerHTML = ''; return; }
        const W = 760, H = 170, v = p.map(x => x[1]), lo = Math.min(...v), hi = Math.max(...v), sp = hi - lo || 1;
        const xy = p.map((x, i) => [i / (p.length - 1) * W, 10 + (1 - (x[1] - lo) / sp) * (H - 20)]);
        const d = xy.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' ');
        const last = xy[xy.length - 1];
        const lbl = s => dateTxt(s);
        box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" class="fx-svg" aria-hidden="true"><defs><linearGradient id="fxg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C6FF3D" stop-opacity=".28"/><stop offset="1" stop-color="#C6FF3D" stop-opacity="0"/></linearGradient></defs>
          <path d="${d} L ${W} ${H} L 0 ${H} Z" fill="url(#fxg)"/><path d="${d}" fill="none" stroke="#C6FF3D" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
          <circle cx="${last[0] - 3}" cy="${last[1]}" r="5" fill="#C6FF3D"/></svg>
          <div class="fx-ax"><span>${lbl(p[0][0])}</span><span>${L('eng past', 'мин.')} ${num(lo)} · ${L('eng yuqori', 'макс.')} ${num(hi)}</span><span>${lbl(p[p.length - 1][0])}</span></div>`;
      }).catch(() => { box.innerHTML = ''; });
    }
    function conv() {
      const opts = sel => [{ c: 'UZS', n: L('O‘zbek so‘mi', 'Узбекский сум'), nr: 'Узбекский сум', r: 1, nom: 1 }, ...all].map(x => `<option value="${x.c}"${x.c === sel ? ' selected' : ''}>${esc(x.c)} — ${esc(fxName(x))}</option>`).join('');
      $('fxConv').innerHTML = `<h2>${L('Konvertor', 'Конвертер')}</h2>
        <label class="fx-f"><small>${L('Berasiz', 'Отдаёте')}</small><span class="fx-box"><input type="text" inputmode="decimal" id="fxA" value="100"><select id="fxFrom">${opts('USD')}</select></span></label>
        <div class="fx-swap"><button type="button" id="fxSwap" aria-label="${L('Almashtirish', 'Поменять')}">⇅</button></div>
        <label class="fx-f"><small>${L('Olasiz', 'Получаете')}</small><span class="fx-box"><output id="fxOut">—</output><select id="fxTo">${opts('UZS')}</select></span></label>
        <div class="fx-quick">${[['100', 'USD', '$100'], ['500', 'USD', '$500'], ['1000', 'USD', '$1 000'], ['100', 'EUR', '€100'], ['10000', 'RUB', '10 000 ₽']].map(([a, c, l]) => `<button type="button" class="wx-chip" data-a="${a}" data-c="${c}">${l}</button>`).join('')}</div>
        <p class="wx-note">${L('Markaziy bank kursi bo‘yicha. Banklarda kurs biroz farq qiladi.', 'По курсу Центрального банка. В банках курс немного отличается.')}</p>`;
      const rate = c => (c === 'UZS' ? 1 : per(all.find(x => x.c === c) || { r: 1, nom: 1 }));
      const calc = () => {
        const a = parseFloat(String($('fxA').value).replace(/\s/g, '').replace(',', '.')) || 0;
        const v = a * rate($('fxFrom').value) / rate($('fxTo').value);
        $('fxOut').textContent = num(v, v >= 100 ? 2 : 4);
      };
      $('fxConv').addEventListener('input', calc);
      $('fxConv').addEventListener('change', calc);
      $('fxSwap').addEventListener('click', () => { const f = $('fxFrom').value; $('fxFrom').value = $('fxTo').value; $('fxTo').value = f; calc(); });
      $('fxConv').querySelector('.fx-quick').addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (!b) return; $('fxA').value = b.dataset.a; $('fxFrom').value = b.dataset.c; $('fxTo').value = 'UZS'; calc(); });
      calc();
    }
    fxAll().then(j => {
      all = (j.list || []).map(x => ({ ...x, n: x.c === 'EUR' ? 'Yevro' : x.n }));
      const u = all.find(x => x.c === 'USD');
      if (j.date) $('fxSub').textContent += ' · ' + j.date;
      $('fxAllBtn').textContent = L('Hammasi', 'Все') + ' · ' + all.length;
      if (u) $('fxHero').innerHTML = `
        <div class="fx-ht"><span class="fx-sym is-big">$</span><span><b>${esc(fxName(u))}</b><small>USD · ${L('Markaziy bank kursi', 'курс ЦБ')}</small></span></div>
        <div class="fx-big">${num(u.r)}<small> ${L('so‘m', 'сум')}</small></div>
        <div class="fx-dr">${diffHtml(u.d)}<small>${L('kechagiga nisbatan', 'по сравнению со вчера')}</small></div>
        <div class="fx-tabs">${[['7', L('7 kun', '7 дней')], ['30', L('30 kun', '30 дней')], ['365', L('1 yil', '1 год')]].map(([k, l]) => `<button type="button" class="wx-chip${k === range ? ' is-on' : ''}" data-r="${k}">${l}</button>`).join('')}</div>
        <div id="fxChart" class="fx-chart"></div>`;
      $('fxHero').querySelector('.fx-tabs').addEventListener('click', e => {
        const b = e.target.closest('[data-r]'); if (!b) return;
        range = b.dataset.r; $('fxHero').querySelectorAll('[data-r]').forEach(x => x.classList.toggle('is-on', x === b)); chart();
      });
      conv(); cards(); chart();
    }).catch(() => { $('fxHero').innerHTML = `<p class="wx-err">${L('Kurslar yuklanmadi. Birozdan keyin qayta urinib ko‘ring.', 'Не удалось загрузить курсы. Попробуйте позже.')}</p>`; $('fxConv').hidden = true; });
    main.querySelector('.fx-hl').addEventListener('click', e => {
      const b = e.target.closest('[data-mode]'); if (!b) return;
      mode = b.dataset.mode; main.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('is-on', x === b)); cards();
    });
    $('fxQ').addEventListener('input', e => { fq = e.target.value.trim(); cards(); });
    mountKunlik($('dzxKunlik'));
  }

  window.DZK = { mountKunlik, CITIES };
  const boot = () => {
    if (typeof initLayout === 'function' && ($('wx') || $('fx'))) try { initLayout(); } catch (e) {}
    const y = $('year'); if (y) y.textContent = new Date().getFullYear();
    if ($('wx')) weatherPage($('wx'));
    if ($('fx')) fxPage($('fx'));
    const k = $('dzxKunlik'); if (k) mountKunlik(k);
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
