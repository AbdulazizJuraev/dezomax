/* ============================================================
   DezoMax — "Kimsiz?" (rol tanlash)
   Google/Telegram orqali birinchi marta kirgan foydalanuvchidan so'raladi.
   profile.role: 'adult' | 'child' | 'guest'. Tanlanmaguncha davom etilmaydi.
   "Bola" tanlansa — katalog/qidiruv/bosh sahifada faqat multfilmlar
   ko'rinadi (js/common.js). "Mehmon" — oddiy bepul tarif, faqat belgi sifatida.
   ============================================================ */

Object.assign(I18N.uz, {
  'role.title': 'Kim tomosha qiladi?',
  'role.sub': 'Kontentni sizga moslashtirish uchun birini tanlang',
  'role.adult': 'Katta odamman',
  'role.adultSub': 'Barcha kontent ochiq',
  'role.child': 'Bolalar',
  'role.childSub': 'Faqat multfilmlar ko‘rinadi',
  'role.guest': 'Mehmon',
  'role.guestSub': 'Bepul tarifda ko‘rish'
});
Object.assign(I18N.ru, {
  'role.title': 'Кто будет смотреть?',
  'role.sub': 'Выберите, чтобы подобрать контент для вас',
  'role.adult': 'Я взрослый',
  'role.adultSub': 'Весь контент открыт',
  'role.child': 'Дети',
  'role.childSub': 'Показываются только мультфильмы',
  'role.guest': 'Гость',
  'role.guestSub': 'Просмотр на бесплатном тарифе'
});

const ROLE_ICONS = {
  adult: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>',
  child: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3.2"/><path d="M6 20c0-3.5 2.8-5.8 6-5.8s6 2.3 6 5.8"/><path d="M9.5 6.2a3 3 0 0 1 5-1.5M8.5 3.5a2 2 0 0 1 1 2.3"/></svg>',
  guest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 9h18"/><circle cx="8" cy="14" r="1.3" fill="currentColor" stroke="none"/></svg>'
};

/* Tanlash ekranini ko'rsatadi va tanlanguncha kutadi (har safar chaqirilganda so'raydi —
   profile.role oldingi tanlovni saqlab turadi, lekin bu funksiya har safar qayta so'raydi) */
/* ---------- Fon: rasmiy posterlar, har 4 soniyada keyingi kino ----------
   Bosh sahifa slayderidagi kinolar (admin tanlaganlari + sayt o'zi qo'shadiganlari), tasodifiy tartibda.
   Video emas — rasm: tez ochiladi, YouTube belgilari (pauza, oldinga/orqaga) ko'rinmaydi.
   Rasm: vertikal rasmiy poster (vposter) → muqova → treyler rasmi → poster. Keyingisi oldindan yuklanadi. */
const RP_SCENE_MS = 4000;
const rpYtId = u => (String(u || '').match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/) || [])[1];
const rpArt = m => {
  if (m.vposter) return m.vposter;
  const big = s => (typeof imgBig === 'function' ? imgBig(s) : s) || s;
  if (m.cover) return big(m.cover);
  const yt = rpYtId(m.trailer);
  if (yt) return `https://i.ytimg.com/vi/${yt}/maxresdefault.jpg`;
  return m.poster ? big(m.poster) : '';
};

function rolePickFilms() {
  try {
    const ids = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG?.hero?.ids) || [];
    let pool = ids.map(id => MOVIES.find(m => m.id === id)).filter(Boolean);
    if (typeof heroCompose === 'function') pool = heroCompose(pool);
    if (pool.length < 4) pool = [...pool, ...MOVIES.filter(m => m.featured && !pool.includes(m))];
    pool = pool.filter(m => rpArt(m));
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    return pool.slice(0, 12).map(m => ({ art: rpArt(m), yt: rpYtId(m.trailer), title: title(m) }));
  } catch { return []; }
}

function startRoleBackdrop(el, films) {
  const stage = el.querySelector('.role-pick-bg');
  const cap = el.querySelector('.role-pick-film b');
  if (!stage || !films.length) return () => {};
  let cur = -1, timer = 0, dead = false;
  const scenes = new Map();   // indeks -> sahna

  // YouTube rasmi: maxresdefault yo'q eski videolarda 120×90 kulrang rasm keladi — hq variantiga tushamiz
  const load = (f, cb) => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth <= 120 && f.yt && !img.src.includes('hqdefault')) { img.src = `https://i.ytimg.com/vi/${f.yt}/hqdefault.jpg`; return; }
      cb(img.src);
    };
    img.onerror = () => { if (f.yt && !img.src.includes('hqdefault')) img.src = `https://i.ytimg.com/vi/${f.yt}/hqdefault.jpg`; };
    img.src = f.art;
  };
  const make = i => {
    if (scenes.has(i)) return scenes.get(i);
    const box = document.createElement('div');
    box.className = 'rp-scene';
    load(films[i], src => { box.style.backgroundImage = `url('${src}')`; });
    stage.appendChild(box);
    scenes.set(i, box);
    return box;
  };

  const show = i => {
    if (dead) return;
    clearTimeout(timer);
    cur = i;
    const box = make(i);
    stage.querySelectorAll('.rp-scene').forEach(b => b.classList.toggle('is-on', b === box));
    if (cap) { cap.style.opacity = 0; setTimeout(() => { cap.textContent = films[i].title; cap.style.opacity = 1; }, 180); }
    const next = (i + 1) % films.length;
    for (const [k, v] of scenes) if (k !== i && k !== next) { setTimeout(() => v.remove(), 800); scenes.delete(k); }
    if (films.length < 2) return;
    make(next);   // keyingisi oldindan yuklanadi
    timer = setTimeout(() => show(next), RP_SCENE_MS);
  };
  show(0);

  return () => { dead = true; clearTimeout(timer); stage.innerHTML = ''; };
}

function showRolePicker(profile) {
  return new Promise(resolve => {
    const el = document.createElement('div');
    el.className = 'role-pick';
    const films = rolePickFilms();
    const film = films[0];
    const name = r => r === 'adult' && profile?.name ? profile.name : t('role.' + r);
    el.innerHTML = `
      ${film ? `<div class="role-pick-bg"></div>` : ''}
      <div class="role-pick-box">
        <img class="role-pick-logo" src="images/logo/logo.png" alt="DezoMax">
        <h1>${esc(t('role.title'))}</h1>
        <div class="role-pick-avatars">
          ${['adult', 'child', 'guest'].map(r => `
            <button type="button" class="role-pick-av${profile?.role === r ? ' is-last' : ''}" data-role="${r}">
              <span class="role-pick-circle role-pick-c-${r}"><img src="images/role/${r}.webp" alt=""></span>
              <span class="role-pick-text">
                <b>${esc(name(r))}</b>
                <small>${esc(t('role.' + r + 'Sub'))}</small>
              </span>
            </button>`).join('')}
        </div>
      </div>
      ${film ? `<div class="role-pick-film"><small>DezoMax’da</small><b>${esc(film.title)}</b></div>` : ''}`;
    document.body.appendChild(el);
    document.documentElement.classList.add('welcome-lock');
    const stopBackdrop = startRoleBackdrop(el, films);
    el.querySelectorAll('[data-role]').forEach(b => b.addEventListener('click', async () => {
      if (el.classList.contains('is-out')) return;
      profile.role = b.dataset.role;
      try { await Auth.saveProfile(profile); } catch {}
      try { sessionStorage.setItem('dezomax_role_asked', '1'); } catch {}
      el.classList.add('is-out');
      document.documentElement.classList.remove('welcome-lock');
      setTimeout(() => { stopBackdrop(); el.remove(); }, 300);
      resolve();
    }));
  });
}

/* Har safar ilova/sayt ochilganda (yangi sessiyada) allaqachon kirgan foydalanuvchidan
   ham qayta so'raladi — "kim tomosha qiladi" Netflix uslubidagi tanlov kabi.
   Bir sessiya ichida (bir necha sahifa ko'rilsa) faqat bir marta so'raladi. */
(function () {
  try {
    if (typeof Auth === 'undefined') return;
    const user = Auth.user();
    if (!user) return;
    if (sessionStorage.getItem('dezomax_role_asked') === '1') return;
    const run = async () => {
      try {
        const profile = await Auth.loadProfile(user);
        await showRolePicker(profile);
      } catch {}
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
    else run();
  } catch {}
})();
