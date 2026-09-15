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

  // Harflar chegaralari (logotip koordinatalarida): D e z o M a x
  const STOPS = [1285, 1625, 1945, 2312, 2828, 3180, 3525];
  const LETTER_START = 700;   // ms — belgi paydo bo'lgach
  const LETTER_MS = 240;
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
    Object.entries({ x: 700, y: -20, width: 0, height: 700 }).forEach(([k, v]) => rect.setAttribute(k, v));
    clip.appendChild(rect);
    defs.appendChild(clip);

    const letters = document.createElementNS(SVGNS, 'g');
    letters.setAttribute('clip-path', 'url(#introReveal)');
    const icon = document.createElementNS(SVGNS, 'g');
    icon.setAttribute('class', 'intro-icon');
    [...svg.children].forEach(ch => {
      if (ch === defs) return;
      // harflar: oq «Dezo» guruhi va gradientli «Max»; qolgani — kvadrat belgi
      const isLetters = ch.matches('g[fill="#FEFEFE"]') || ch.matches('path.logo-max');
      (isLetters ? letters : icon).appendChild(ch);
    });
    svg.append(icon, letters);

    cursor = document.createElementNS(SVGNS, 'rect');
    Object.entries({ class: 'intro-cursor', x: 740, y: 130, width: 34, height: 410, rx: 8 }).forEach(([k, v]) => cursor.setAttribute(k, v));
    svg.appendChild(cursor);
    svg.setAttribute('viewBox', '-20 -20 3565 700');
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
      rect.setAttribute('width', x - 700 + 10);
      cursor.setAttribute('x', x + 30);
      whoosh(i);
    }));
    const endAt = LETTER_START + STOPS.length * LETTER_MS + 120;
    later(endAt, () => { el.classList.add('is-done'); sparkle(); });
    later(endAt + 900, () => el.classList.remove('is-typing'));
  }

  const done = () => {
    timers.forEach(clearTimeout);
    if (rect) { rect.setAttribute('width', 2900); el.classList.add('is-icon', 'is-done'); el.classList.remove('is-typing'); }
    el.classList.add('is-out');
    document.documentElement.classList.remove('intro-lock');
    setTimeout(() => { el.remove(); try { ctx && ctx.close(); } catch {} }, 600);
  };
  later(DURATION - 500, done);
  // bosilsa — o'tkazib yuborish
  el.addEventListener('click', done, { once: true });
})();
