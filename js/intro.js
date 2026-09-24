/* ============================================================
   DezoMax — kirishdagi 5 soniyalik logo animatsiyasi
   Belgi paydo bo'ladi, keyin «DezoMax» harfma-harf yoziladi — har harfda
   yengil «vush» (shamol) tovushi, oxirida yaltirash. Tovushlar Web Audio bilan
   hosil qilinadi (fayl yo'q).
   <body> ning boshida yuklanadi — sahifa ko'rinishidan oldin ekranni yopadi.
   Bir seansda bir marta ko'rsatiladi (ilovada — har ochilganda).
   Brauzer ovozni bloklasa (foydalanuvchi hali ekranga tegmagan) — animatsiya tovushsiz o'tadi.
   ============================================================ */

(function () {
  const KEY = 'dezomax_intro_seen';
  let seen = false;
  try { seen = sessionStorage.getItem(KEY) === '1'; } catch {}
  if (seen || /[?&]nointro\b/.test(location.search)) return;
  try { sessionStorage.setItem(KEY, '1'); } catch {}

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = reduce ? 1200 : 5000;

  // Harflar o'ng chegaralari (yangi logotip koordinatalarida): D E Z O M A X + plyonka dumi
  const STOPS = [963, 2136, 3310, 4695, 6218, 7475, 8452, 9373];
  const VB_W = 9373.44, VB_H = 1867.28;
  const LETTER_START = 700;   // ms — belgi paydo bo'lgach
  const LETTER_MS = 210;
  const SVGNS = 'http://www.w3.org/2000/svg';

  const el = document.createElement('div');
  el.className = 'intro intro-type';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `
    <div class="intro-glow"></div>
    <div class="intro-logo">
      ${window.dezoLogoSVG ? window.dezoLogoSVG() : '<img src="images/logo/logo.png" alt="">'}
    </div>
    <div class="intro-bar"><i></i></div>`;
  document.body.appendChild(el);
  document.documentElement.classList.add('intro-lock');

  /* ---------- SVG: belgi alohida, harflar kesish (clip) orqasida ---------- */
  const svg = el.querySelector('svg');
  let rect = null, cursor = null;
  if (svg && !reduce) {
    const defs = svg.querySelector('defs');
    const clip = document.createElementNS(SVGNS, 'clipPath');
    clip.id = 'introReveal';
    rect = document.createElementNS(SVGNS, 'rect');
    // «D» dan keyingi hamma narsa shu to'rtburchak ostida ochiladi
    Object.entries({ x: STOPS[0], y: -60, width: 0, height: VB_H + 120 }).forEach(([k, v]) => rect.setAttribute(k, v));
    clip.appendChild(rect);
    defs.appendChild(clip);

    const letters = document.createElementNS(SVGNS, 'g');
    letters.setAttribute('clip-path', 'url(#introReveal)');
    const icon = document.createElementNS(SVGNS, 'g');
    icon.setAttribute('class', 'intro-icon');
    // Yangi logotipda barcha shakllar bitta <g> ichida: «D» (birinchi shakl) — belgi,
    // qolgani harflar sifatida kesish ostida ochiladi.
    const shapes = [...svg.querySelectorAll('g > path, g > polygon')];
    shapes.forEach((sh, i) => (i === 0 ? icon : letters).appendChild(sh));
    [...svg.querySelectorAll('g')].forEach(g => { if (!g.children.length && g !== icon && g !== letters) g.remove(); });
    svg.append(icon, letters);

    cursor = document.createElementNS(SVGNS, 'rect');
    Object.entries({ class: 'intro-cursor', x: STOPS[0] + 60, y: 380, width: 90, height: 1120, rx: 24 }).forEach(([k, v]) => cursor.setAttribute(k, v));
    svg.appendChild(cursor);
    svg.setAttribute('viewBox', '-60 -60 ' + (VB_W + 120) + ' ' + (VB_H + 120));
    svg.style.overflow = 'visible';
  }

  /* ---------- Tovush: «Shamol» ---------- */
  let ctx = null, master = null;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC && !reduce) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    }
  } catch { ctx = null; }

  const canPlay = () => ctx && ctx.state === 'running';

  function whoosh(i) {
    if (!canPlay()) return;
    const t = ctx.currentTime + 0.005, dur = 0.14;
    const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * (dur + 0.05)), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let k = 0; k < d.length; k++) d[k] = Math.random() * 2 - 1;
    src.buffer = buf;
    f.type = 'bandpass'; f.Q.value = 2.5;
    f.frequency.setValueAtTime(600 + i * 250, t);
    f.frequency.exponentialRampToValueAtTime(3500 + i * 300, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.35, t + dur * 0.5);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(master);
    src.start(t); src.stop(t + dur + 0.05);
  }

  function sparkle() {
    if (!canPlay()) return;
    const t0 = ctx.currentTime + 0.005;
    [2637, 3136, 3951, 5274].forEach((freq, k) => {
      const t = t0 + k * 0.05, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.07, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.705);
      o.connect(g).connect(master);
      o.start(t); o.stop(t + 0.75);
    });
  }

  /* ---------- Vaqt jadvali ---------- */
  const timers = [];
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));

  if (rect) {
    later(120, () => el.classList.add('is-icon'));
    later(LETTER_START - 250, () => el.classList.add('is-typing'));
    STOPS.forEach((x, i) => later(LETTER_START + i * LETTER_MS, () => {
      rect.setAttribute('width', x - STOPS[0] + 40);
      cursor.setAttribute('x', x + 60);
      whoosh(i);
    }));
    const endAt = LETTER_START + STOPS.length * LETTER_MS + 120;
    later(endAt, () => { el.classList.add('is-done'); sparkle(); });
    later(endAt + 900, () => el.classList.remove('is-typing'));
  }

  const done = () => {
    timers.forEach(clearTimeout);
    if (rect) { rect.setAttribute('width', VB_W); el.classList.add('is-icon', 'is-done'); el.classList.remove('is-typing'); }
    el.classList.add('is-out');
    document.documentElement.classList.remove('intro-lock');
    setTimeout(() => { el.remove(); try { ctx && ctx.close(); } catch {} }, 600);
  };
  later(DURATION - 500, done);
  // bosilsa — o'tkazib yuborish
  el.addEventListener('click', done, { once: true });
})();
