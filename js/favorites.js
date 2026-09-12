/* ============================================================
   DezoMax — sevimlilar sahifasi / страница избранного
   ============================================================ */

function renderFavorites() {
  const box = document.getElementById('favGrid');
  const ids = getFavs();
  const list = ids.map(id => MOVIES.find(m => m.id === id)).filter(Boolean);

  document.getElementById('count').textContent = list.length ? resultsText(list.length) : '';

  if (!list.length) {
    box.className = '';
    box.innerHTML = emptyHTML('fav.empty', 'fav.emptyHint');
    return;
  }

  box.className = 'grid';
  box.innerHTML = list.map(m => `
    <div class="card-wrap">
      ${cardHTML(m)}
      <button class="card-remove" data-remove="${m.id}" aria-label="O‘chirish">${ICONS.close}</button>
    </div>`).join('');

  box.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      toggleFav(btn.dataset.remove);
      renderFavorites();
    });
  });

  observeReveals(box);
}

initLayout();
renderFavorites();
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('langchange', () => {
  renderFavorites();
  applyI18n();
});
