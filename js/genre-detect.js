/* ============================================================
   DezoMax — janrni avtomatik aniqlash (nomi + tavsifi + teglari bo'yicha, o'zbek/rus tilida)
   detectGenres(movie) → ['comedy', 'romance', ...] (js/data.js GENRES kodlari, ko'pi bilan 3 ta)
   - Tavsifda «Janri: …» / «Жанр: …» yozilgan bo'lsa — eng kuchli belgi
   - Aks holda kalit so'zlar: nomida — 2 ball, tavsifda — 1 ball; 2 balldan yuqorisi olinadi
   - «Drama» faqat matnda drama belgisi bo'lsa yoki boshqa janr topilmasa qoladi
   Ishlatiladi: admin (Kinolar → «Janrlarni aniqlash», kino formasi) va tools/auto-genres.js
   ============================================================ */
(function (root) {
  // matn: kichik harf, o‘ g‘ va apostroflar olib tashlanadi («qo‘rqinchli» → «qorqinchli»)
  const prep = s => String(s || '').toLowerCase().replace(/[‘’'`ʻʼ]/g, '').replace(/ё/g, 'е');

  const RULES = {
    comedy:    /komediy|kulgili|kulgu|hajviy|hajv\b|hazil|yumor|komik|qiziqchi|комеди|смешн|юмор/g,
    romance:   /melodram|romantik|sevgi|muhabbat|oshiq|ishq\b|sevishgan|sevib qol|kelin.?kuyov|tanishib qol|uylanish|turmushga chiq|мелодрам|романтич|любов|влюбл/g,
    family:    /oilaviy|qaynona|qaynota|kelin\b|kelinlar|ota.?ona|aka.?uka|opa.?singil|nevara|семейн|свекров/g,
    crime:     /jinoyat|qotil|mafiya|ogri|qamoq|politsiya|militsiya|giyohvand|bandit|reket|kontrabanda|криминал|убийств|бандит|мафи|тюрьм/g,
    detective: /detektiv|tergov|tergovchi|izquvar|детектив|расследова|следовател/g,
    thriller:  /triller|tahdid|garovga|ogirla|tuzoq|qochoq|ta.?qib|триллер|похищ|погон/g,
    action:    /jangari|jangovar|maxsus kuch|otishma|qasos|боевик|перестрел|спецназ/g,
    horror:    /qorqinchli|qorqinch|arvoh|alvasti|jinlar|jin urgan|lanat|dahshat|ужас|хоррор|призрак|демон/g,
    history:   /tarixiy|amir temur|temuriy|xonlik|podsho|sulton|saroy|istilo|bobur|исторически|царь|султан/g,
    war:       /urush|frontda|askar|harbiy|jang maydoni|война|военн|фронт|солдат/g,
    adventure: /sarguzasht|sayohat|xazina|ekspeditsiya|приключ|путешеств|сокровищ/g,
    scifi:     /fantastik|kelajak|robot|kosmos|o.?zga sayyora|vaqt mashinasi|фантаст|космос|будущ/g,
    fantasy:   /sehr|sehrgar|ertak|afsona|devlar|фэнтези|сказк|волшеб|магия/g,
    animation: /multfilm|multserial|animatsi|мультфильм|мультсериал|анимаци/g,
    biography: /biografi|hayot yoli|haqiqiy voqea|real voqea|биографи|реальн\S* событ/g,
    drama:     /\bdrama|dramatik|драм/g
  };
  // «Janri: Jangari Fantastika» — aniq ko'rsatilgan janr so'zlari
  const NAMED = [
    ['comedy', /komed|комед/], ['romance', /melodram|romant|мелодрам/], ['action', /jangari|boevik|боевик/],
    ['scifi', /fantast|фантаст/], ['thriller', /triller|триллер/], ['crime', /kriminal|jinoyat|криминал/],
    ['fantasy', /fentez|fantasy|фэнтез/], ['horror', /qorqinch|uzhas|ужас|horror/], ['animation', /multfilm|animats|мульт|анима/],
    ['adventure', /sarguzasht|приключ/], ['biography', /biograf|биограф/], ['war', /harbiy|urush|военн/],
    ['detective', /detektiv|детектив/], ['family', /oilaviy|семейн/], ['history', /tarixiy|истор/], ['drama', /drama|драм/]
  ];

  function detectGenres(m) {
    if (!m) return [];
    const title = prep(typeof m.title === 'object' ? `${m.title.uz || ''} ${m.title.ru || ''}` : m.title);
    const desc = prep(typeof m.desc === 'object' ? `${m.desc.uz || ''} ${m.desc.ru || ''}` : m.desc) + ' ' + prep((m.tags || []).join(' '));
    const score = {};
    const add = (g, n) => { score[g] = (score[g] || 0) + n; };

    // 1) «Janri: …» / «Жанр: …»
    const named = desc.match(/(?:janri|жанр\S*)\s*[:\-–—]\s*([^\n.;|]{2,80})/);
    if (named) for (const [g, rx] of NAMED) if (rx.test(named[1])) add(g, 5);

    // 2) kalit so'zlar
    for (const g in RULES) {
      const t = (title.match(RULES[g]) || []).length, d = (desc.match(RULES[g]) || []).length;
      if (t) add(g, 2 * t);
      if (d) add(g, Math.min(d, 3));
    }
    if (m.type === 'multfilm') add('animation', 3);

    const found = Object.keys(score).filter(g => g !== 'drama' && score[g] >= 2)
      .sort((a, b) => score[b] - score[a]).slice(0, 3);
    if ((score.drama || 0) >= 1 && found.length < 3 && !found.includes('comedy') && !found.includes('animation')) found.push('drama');
    return found.length ? found : ['drama'];
  }

  root.detectGenres = detectGenres;
  if (typeof module !== 'undefined' && module.exports) module.exports = { detectGenres };
})(typeof window !== 'undefined' ? window : globalThis);
