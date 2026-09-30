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
/* Fon uchun kino: bosh sahifa slayderidagilardan (keng rasmi borlaridan) tasodifiy biri */
function rolePickFilm() {
  try {
    const ytId = u => (String(u || '').match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/) || [])[1];
    const wide = m => (m.poster && m.poster.startsWith('images/uz/')) ? m.poster
      : ytId(m.trailer) ? `https://i.ytimg.com/vi/${ytId(m.trailer)}/maxresdefault.jpg` : null;
    const ids = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG?.hero?.ids) || [];
    let pool = ids.map(id => MOVIES.find(m => m.id === id)).filter(Boolean);
    if (!pool.length) pool = MOVIES.filter(m => m.featured);
    pool = pool.filter(m => wide(m) && (typeof hasFilm !== 'function' || hasFilm(m)));
    const m = pool[Math.floor(Math.random() * pool.length)];
    return m ? { img: wide(m), title: title(m) } : null;
  } catch { return null; }
}

function showRolePicker(profile) {
  return new Promise(resolve => {
    const el = document.createElement('div');
    el.className = 'role-pick';
    const film = rolePickFilm();
    const name = r => r === 'adult' && profile?.name ? profile.name : t('role.' + r);
    el.innerHTML = `
      ${film ? `<div class="role-pick-bg" style="background-image:url('${esc(film.img)}')"></div>` : ''}
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
    el.querySelectorAll('[data-role]').forEach(b => b.addEventListener('click', async () => {
      if (el.classList.contains('is-out')) return;
      profile.role = b.dataset.role;
      try { await Auth.saveProfile(profile); } catch {}
      try { sessionStorage.setItem('dezomax_role_asked', '1'); } catch {}
      el.classList.add('is-out');
      document.documentElement.classList.remove('welcome-lock');
      setTimeout(() => el.remove(), 300);
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
