/* ============================================================
   DezoMax — kirishdagi 3 soniyalik intro video: images/intro/intro.mp4 (+ intro-poster.jpg)
   ------------------------------------------------------------
   Kadrlar js/logo.js dagi logotip SVG'sidan chiziladi (sharp), ovoz kod bilan sintez qilinadi,
   ffmpeg bilan H.264 + AAC MP4'ga yig'iladi. Video kvadrat (1080×1080) — telefonda ham,
   kompyuterda ham to'liq ko'rinadi; cheti sayt foni (#07080c) bilan bir xil — chok bilinmaydi.

   0.00–0.65  qorong'ilikdan yorug'lik chizig'i markazga yugurib keladi (+ «vush»)
   0.62       chaqnash: logotip yorug'lik ichidan chiqadi (+ past «bum»)
   0.65–1.20  logotip kattadan joyiga keladi, xiralik ketadi
   1.30–2.10  logotip ustidan oq nur o'tadi (+ jiringlagan ohang)
   0.70–2.80  mayda uchqunlar
   2.65–3.00  hammasi sayt foniga so'nadi

   Ishga tushirish (bir marta, video o'zgarsa):
     cd mobile && npm i --no-save ffmpeg-static     (ffmpeg — loyihaga qo'shilmaydi)
     node tools/make-intro.js
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const MOBILE = path.join(ROOT, 'mobile', 'node_modules');
const sharp = require(path.join(MOBILE, 'sharp'));
const FFMPEG = require(path.join(MOBILE, 'ffmpeg-static'));

const OUT_DIR = path.join(ROOT, 'images', 'intro');
const TMP = path.join(require('os').tmpdir(), 'dzx-intro');
const W = 1080, H = 1080, FPS = 30, DUR = 3, N = FPS * DUR, SR = 44100;

/* ---------- logotip yo'llari (js/logo.js) ---------- */
const ctx = { window: {}, document: { readyState: 'complete', querySelectorAll: () => [], addEventListener() {}, documentElement: {} },
  navigator: { userAgent: '' }, location: { search: '' }, addEventListener() {}, MutationObserver: function () { this.observe = () => {}; } };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'logo.js'), 'utf8'), ctx);
const logoSvg = ctx.window.dezoLogoSVG();
const paths = [...logoSvg.matchAll(/<path fill="([^"]+)" d="([^"]+)"/g)].map(m => ({ white: m[1] === '#fff', d: m[2] }));
const LOGO_W = 9373.44, LOGO_H = 1867.28;

/* ---------- yordamchilar ---------- */
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const seg = (t, a, b) => clamp((t - a) / (b - a));                // a..b oralig'ida 0→1
const easeOut = x => 1 - Math.pow(1 - x, 3);
const easeInOut = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const sparks = Array.from({ length: 46 }, () => ({
  x: 540 + (rnd() - 0.5) * 900, y: 540 + (rnd() - 0.5) * 260, vx: (rnd() - 0.5) * 70, vy: -20 - rnd() * 60,
  r: 1.2 + rnd() * 2.6, t0: 0.65 + rnd() * 0.9, life: 1.0 + rnd() * 1.1, hue: rnd() < 0.6 ? '#7fd4ff' : '#ff7a93'
}));

function frameSVG(t) {
  const logoW = 860, s0 = logoW / LOGO_W;
  const appear = easeOut(seg(t, 0.55, 1.2));
  const scale = s0 * (1.28 - 0.28 * appear);
  const blur = 14 * (1 - appear);
  const fadeAll = 1 - easeInOut(seg(t, 2.65, 3.0));
  const logoOp = clamp(seg(t, 0.55, 0.85)) * fadeAll;
  const lw = LOGO_W * scale, lh = LOGO_H * scale;
  const lx = (W - lw) / 2, ly = (H - lh) / 2;

  // 1) yorug'lik chizig'i: markazga yuguradi, chaqnashda so'nadi
  const streakIn = easeOut(seg(t, 0.0, 0.62));
  const streakOp = (t < 0.62 ? seg(t, 0.0, 0.25) : 1 - seg(t, 0.62, 1.0)) * fadeAll;
  const streakW = 40 + 1000 * streakIn;
  // 2) chaqnash
  const flash = t < 0.62 ? 0 : Math.pow(1 - seg(t, 0.62, 1.35), 2);
  const glowR = 120 + 520 * easeOut(seg(t, 0.6, 1.4));
  // 3) nur logotip ustidan o'tadi
  const sweep = seg(t, 1.3, 2.1);
  const sweepX = -300 + sweep * (W + 600);

  const sparkEls = sparks.map(p => {
    const a = (t - p.t0) / p.life;
    if (a < 0 || a > 1) return '';
    const x = p.x + p.vx * (t - p.t0), y = p.y + p.vy * (t - p.t0);
    const o = Math.sin(Math.PI * a) * 0.9 * fadeAll;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${p.r.toFixed(2)}" fill="${p.hue}" opacity="${o.toFixed(3)}"/>`;
  }).join('');

  const logoPaths = (fillBlue) => paths.map(p => `<path fill="${p.white ? '#fff' : fillBlue}" d="${p.d}"/>`).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="72%"><stop offset="0" stop-color="#0d1622"/><stop offset="0.62" stop-color="#07080c"/></radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#4cb8f0" stop-opacity="0.55"/><stop offset="0.45" stop-color="#0a93dc" stop-opacity="0.18"/><stop offset="1" stop-color="#0a93dc" stop-opacity="0"/></radialGradient>
    <radialGradient id="flash" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff" stop-opacity="0.95"/><stop offset="0.35" stop-color="#9fdcff" stop-opacity="0.45"/><stop offset="1" stop-color="#0a93dc" stop-opacity="0"/></radialGradient>
    <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff4f6d" stop-opacity="0"/><stop offset="0.3" stop-color="#ff7a93"/><stop offset="0.5" stop-color="#ffffff"/><stop offset="0.7" stop-color="#7fd4ff"/><stop offset="1" stop-color="#0a93dc" stop-opacity="0"/></linearGradient>
    <linearGradient id="blue" gradientUnits="userSpaceOnUse" x1="4300" y1="0" x2="12600" y2="0"><stop offset="0" stop-color="#00B2FF"/><stop offset="1" stop-color="#0A7CC0"/></linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5cc8ff" stop-opacity="0"/><stop offset="0.35" stop-color="#5cc8ff" stop-opacity="0.75"/><stop offset="0.5" stop-color="#e9f8ff" stop-opacity="1"/><stop offset="0.65" stop-color="#5cc8ff" stop-opacity="0.75"/><stop offset="1" stop-color="#5cc8ff" stop-opacity="0"/></linearGradient>
    <filter id="b1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${Math.max(0.01, blur).toFixed(2)}"/></filter>
    <filter id="b8" x="-20%" y="-600%" width="140%" height="1300%"><feGaussianBlur stdDeviation="8"/></filter>
    <mask id="logoMask"><g transform="translate(${lx.toFixed(2)} ${ly.toFixed(2)}) scale(${scale.toFixed(5)})">${logoPaths('#fff')}</g></mask>
  </defs>
  <rect width="${W}" height="${H}" fill="#07080c"/>
  <rect width="${W}" height="${H}" fill="url(#bg)" opacity="${fadeAll.toFixed(3)}"/>
  <circle cx="540" cy="540" r="${glowR.toFixed(1)}" fill="url(#glow)" opacity="${(clamp(seg(t, 0.6, 1.0)) * fadeAll).toFixed(3)}"/>
  <g opacity="${streakOp.toFixed(3)}">
    <rect x="${(540 - streakW / 2).toFixed(1)}" y="532" width="${streakW.toFixed(1)}" height="16" fill="url(#streak)" filter="url(#b8)"/>
    <rect x="${(540 - streakW / 2).toFixed(1)}" y="538" width="${streakW.toFixed(1)}" height="4" fill="url(#streak)"/>
  </g>
  <circle cx="540" cy="540" r="${(160 + 420 * (1 - flash)).toFixed(1)}" fill="url(#flash)" opacity="${flash.toFixed(3)}"/>
  <g opacity="${logoOp.toFixed(3)}" filter="url(#b1)">
    <g transform="translate(${lx.toFixed(2)} ${ly.toFixed(2)}) scale(${scale.toFixed(5)})">${logoPaths('url(#blue)')}</g>
  </g>
  ${sweep > 0 && sweep < 1 ? `<g mask="url(#logoMask)" opacity="${fadeAll.toFixed(3)}"><rect x="${sweepX.toFixed(1)}" y="300" width="220" height="480" fill="url(#shine)" transform="skewX(-20)"/></g>` : ''}
  ${sparkEls}
</svg>`;
}

/* ---------- ovoz: «vush» → «bum» → jiringlagan ohang ---------- */
function makeAudio() {
  const n = SR * DUR, out = new Float32Array(n);
  let lp = 0, s2 = 1;
  const noise = () => (s2 = (s2 * 16807) % 2147483647) / 1073741823.5 - 1;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let v = 0;
    // vush: shovqin, filtr ochilib boradi, 0.62 da uziladi
    if (t < 0.66) {
      const k = 0.02 + 0.25 * Math.pow(t / 0.62, 2);
      lp += k * (noise() - lp);
      v += lp * 0.9 * Math.pow(clamp(t / 0.62), 2.2) * (t > 0.62 ? 1 - (t - 0.62) / 0.04 : 1);
    }
    // bum: 0.62 dan past chastotali zarb (55→38 Hz) + qisqa shovqin «tars»
    if (t >= 0.62) {
      const u = t - 0.62;
      const f = 38 + 17 * Math.exp(-u * 6);
      v += Math.sin(2 * Math.PI * f * u + 0.5) * Math.exp(-u * 2.6) * 0.95;
      v += Math.sin(2 * Math.PI * 110 * u) * Math.exp(-u * 7) * 0.35;
      v += noise() * Math.exp(-u * 40) * 0.35;
    }
    // ohang: yumshoq akkord (A mayor), titrab so'nadi
    if (t >= 0.66) {
      const u = t - 0.66;
      const env = Math.min(1, u / 0.25) * Math.exp(-u * 1.1);
      const trem = 0.85 + 0.15 * Math.sin(2 * Math.PI * 5.5 * u);
      v += (Math.sin(2 * Math.PI * 440 * u) + 0.7 * Math.sin(2 * Math.PI * 659.25 * u) + 0.5 * Math.sin(2 * Math.PI * 880 * u) + 0.25 * Math.sin(2 * Math.PI * 1318.5 * u)) * env * trem * 0.12;
    }
    // nur o'tganda yengil jiringlash
    if (t >= 1.3 && t < 2.3) {
      const u = t - 1.3;
      v += Math.sin(2 * Math.PI * (1760 + 600 * u) * u) * Math.sin(Math.PI * u / 1.0) * 0.05;
    }
    out[i] = v * (1 - seg(t, 2.6, 3.0));
  }
  const peak = out.reduce((m, x) => Math.max(m, Math.abs(x)), 0) || 1;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) buf.writeInt16LE(Math.round(clamp(out[i] / peak * 0.7, -1, 1) * 32767), 44 + i * 2);
  return buf;
}

(async () => {
  fs.rmSync(TMP, { recursive: true, force: true });
  fs.mkdirSync(TMP, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (let f = 0; f < N; f++) {
    await sharp(Buffer.from(frameSVG(f / FPS))).png().toFile(path.join(TMP, `f${String(f).padStart(3, '0')}.png`));
  }
  fs.writeFileSync(path.join(TMP, 'audio.wav'), makeAudio());
  const mp4 = path.join(OUT_DIR, 'intro.mp4');
  execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(TMP, 'f%03d.png'), '-i', path.join(TMP, 'audio.wav'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'main', '-crf', '24', '-preset', 'slow', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '96k', '-shortest', mp4]);
  // birinchi kadr — video yuklanguncha fon
  await sharp(path.join(TMP, 'f000.png')).jpeg({ quality: 70 }).toFile(path.join(OUT_DIR, 'intro-poster.jpg'));
  // ko'rib chiqish uchun bir nechta kadr
  for (const f of [15, 24, 36, 50, 75]) fs.copyFileSync(path.join(TMP, `f${String(f).padStart(3, '0')}.png`), path.join(TMP, `preview-${f}.png`));
  console.log(`images/intro/intro.mp4 — ${(fs.statSync(mp4).size / 1024).toFixed(0)} KB, ${N} kadr; ko'rish kadrlari: ${TMP}`);
})().catch(e => { console.error(e); process.exit(1); });
