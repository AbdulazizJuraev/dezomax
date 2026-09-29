/* ============================================================
   DezoMax — "Kimsiz?" (rol tanlash)
   Google/Telegram orqali birinchi marta kirgan foydalanuvchidan so'raladi.
   profile.role: 'adult' | 'child' | 'guest'. Tanlanmaguncha davom etilmaydi.
   "Bola" tanlansa — katalog/qidiruv/bosh sahifada faqat multfilmlar
   ko'rinadi (js/common.js). "Mehmon" — oddiy bepul tarif, faqat belgi sifatida.
   ============================================================ */

Object.assign(I18N.uz, {
  'role.title': 'Kimsiz?',
  'role.sub': 'Kontentni sizga moslashtirish uchun birini tanlang',
  'role.adult': 'Katta odamman',
  'role.adultSub': 'Barcha kontent ochiq',
  'role.child': 'Bolaman',
  'role.childSub': 'Faqat multfilmlar ko‘rinadi',
  'role.guest': 'Mehmon',
  'role.guestSub': 'Bepul tarifda ko‘rish'
});
Object.assign(I18N.ru, {
  'role.title': 'Кто вы?',
  'role.sub': 'Выберите, чтобы подобрать контент для вас',
  'role.adult': 'Я взрослый',
  'role.adultSub': 'Весь контент открыт',
  'role.child': 'Я ребёнок',
  'role.childSub': 'Показываются только мультфильмы',
  'role.guest': 'Гость',
  'role.guestSub': 'Просмотр на бесплатном тарифе'
});

const ROLE_ICONS = {
  adult: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>',
  child: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3.2"/><path d="M6 20c0-3.5 2.8-5.8 6-5.8s6 2.3 6 5.8"/><path d="M9.5 6.2a3 3 0 0 1 5-1.5M8.5 3.5a2 2 0 0 1 1 2.3"/></svg>',
  guest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 9h18"/><circle cx="8" cy="14" r="1.3" fill="currentColor" stroke="none"/></svg>'
};

/* profile.role bo'lmasa — tanlash ekranini ko'rsatadi va tanlanguncha kutadi */
function showRolePicker(profile) {
  if (profile.role) return Promise.resolve();
  return new Promise(resolve => {
    const el = document.createElement('div');
    el.className = 'role-pick';
    el.innerHTML = `
      <div class="role-pick-box">
        <h1>${esc(t('role.title'))}</h1>
        <div class="role-pick-avatars">
          ${['adult', 'child', 'guest'].map(r => `
            <button type="button" class="role-pick-av" data-role="${r}">
              <span class="role-pick-circle role-pick-c-${r}">${ROLE_ICONS[r]}</span>
              <b>${esc(t('role.' + r))}</b>
              <small>${esc(t('role.' + r + 'Sub'))}</small>
            </button>`).join('')}
        </div>
      </div>`;
    document.body.appendChild(el);
    document.documentElement.classList.add('welcome-lock');
    el.querySelectorAll('[data-role]').forEach(b => b.addEventListener('click', async () => {
      if (el.classList.contains('is-out')) return;
      profile.role = b.dataset.role;
      try { await Auth.saveProfile(profile); } catch {}
      el.classList.add('is-out');
      document.documentElement.classList.remove('welcome-lock');
      setTimeout(() => el.remove(), 300);
      resolve();
    }));
  });
}
