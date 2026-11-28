/* Arsenal AI — ko'rinishi: «Ultron»dagi kabi to'q sariq gologramma shar (canvas 2D).
   Shar bir necha qatlamdan iborat: tashqi qobiqlar mayda yorug' bo'laklardan, ichkarida yadro
   atrofida har xil o'qda aylanuvchi halqalar; o'rtada porlab turgan yadro.
   ArsenalAI.mount(canvas) — chizishni boshlaydi; canvas sahifadan olib tashlansa, o'zi to'xtaydi.
   ArsenalAI.say(matn)    — gapiradi; gapirayotganda shar kengayadi, yadro kuchayadi, halqalar tezlashadi. */
const ArsenalAI = (() => {
  let level = 0, target = 0, speaking = false, punch = 0;
  let listening = false, mic = 0, dragged = 0;
  let appStates = [];   // halqalar tartibida dasturlar holati: 'on' | 'off' | ...
  const Voice = window.Capacitor?.Plugins?.ArsenalVoice || null;     // APK'da native TTS
  Voice?.addListener?.('word', () => { punch = 1; });

  // gapirish: APK'da Android TTS, brauzerda speechSynthesis. O'zbekcha ovoz bo'lmasa — turkcha (lotinni yaqin o'qiydi)
  async function say(text) {
    stop();
    speaking = true; punch = 1;
    try {
      if (Voice) { await Voice.speak({ text }); return; }
      const ss = window.speechSynthesis;
      if (!ss) { await new Promise(r => setTimeout(r, 1500)); return; }
      const vs = ss.getVoices();
      const u = new SpeechSynthesisUtterance(text);
      u.voice = vs.find(v => /^uz/i.test(v.lang)) || vs.find(v => /^tr/i.test(v.lang)) || null;
      u.lang = u.voice ? u.voice.lang : 'tr-TR';
      u.pitch = .9;
      u.onboundary = () => { punch = 1; };
      await new Promise(r => { u.onend = u.onerror = r; ss.speak(u); });
    } catch (e) {} finally { speaking = false; }
  }
  function stop() {
    speaking = false;
    if (Voice) Voice.stop().catch(() => {}); else window.speechSynthesis?.cancel();
  }
  window.speechSynthesis?.getVoices();   // ovozlar ro'yxati oldindan yuklansin

  // 3x3 burish matritsalari
  const mul = (a, b) => [0, 1, 2].map(i => [0, 1, 2].map(j => a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j]));
  const rotX = a => [[1, 0, 0], [0, Math.cos(a), -Math.sin(a)], [0, Math.sin(a), Math.cos(a)]];
  const rotY = a => [[Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)]];
  const rotZ = a => [[Math.cos(a), -Math.sin(a), 0], [Math.sin(a), Math.cos(a), 0], [0, 0, 1]];

  function mount(cv) {
    const ctx = cv.getContext('2d');
    const small = matchMedia('(max-width: 640px)').matches;
    const F = small ? 650 : 950;           // yorug' bo'laklar soni
    let W = 0, H = 0, R = 0, t = 0, last = performance.now();
    const born = last;

    const fit = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2), r = cv.getBoundingClientRect();
      W = r.width; H = r.height; R = Math.min(W, H) * 0.34;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(cv);

    // qatlamlar: r — radius, share — bo'laklar ulushi, band — kenglik (1 = butun shar, kichik = halqa),
    // sp — aylanish tezligi, tx/tz — o'z o'qining og'ishi
    // doimiy urug' — shar har ochilganda bir xil ko'rinadi
    let seed = 20261024;
    const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
    const rand = (a, b) => a + rnd() * (b - a);

    // barmoq / sichqoncha: surish — aylantirish (inersiya bilan), ikki barmoq bilan siqish — kattalashtirish
    let yaw = 0, pitch = 0, vYaw = 0, vPitch = 0, zoom = 1;
    const pts = new Map();
    let pinch0 = 0, zoom0 = 1, moved = 0;
    cv.style.touchAction = 'none';
    cv.addEventListener('pointerdown', e => { try { cv.setPointerCapture(e.pointerId); } catch (x) {} pts.set(e.pointerId, [e.clientX, e.clientY]); moved = 0;
      if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]); zoom0 = zoom; } });
    cv.addEventListener('pointermove', e => {
      const p = pts.get(e.pointerId); if (!p) return;
      const dx = e.clientX - p[0], dy = e.clientY - p[1];
      pts.set(e.pointerId, [e.clientX, e.clientY]);
      if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        zoom = Math.max(.7, Math.min(1.3, zoom0 * Math.hypot(a[0] - b[0], a[1] - b[1]) / (pinch0 || 1)));
        moved += 99; return;
      }
      moved += Math.abs(dx) + Math.abs(dy);
      vYaw = dx * .012; vPitch = dy * .008;
      yaw += vYaw; pitch = Math.max(-1, Math.min(1, pitch + vPitch));
    });
    const up = e => { pts.delete(e.pointerId); if (moved > 8) dragged = Date.now(); };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    cv.addEventListener('wheel', e => { e.preventDefault(); zoom = Math.max(.7, Math.min(1.3, zoom * (e.deltaY < 0 ? 1.06 : .94))); }, { passive: false });

    // sekin telefonda o'zi yengillashadi: 0 — to'liq, 1 — porlashsiz, 2 — bo'laklar ham yarmi
    let quality = 0, slowFor = 0, fastFor = 0, ema = 16;
    const shells = [
      { r: 1.00, share: .40, band: 1,   sp: .22,  tx: .3,  tz: .1 },
      { r: .94,  share: .24, band: 1,   sp: -.3,  tx: -.5, tz: .4 },
      { r: .76,  share: .09, band: .12, sp: .9,   tx: 1.1, tz: .2 },
      { r: .64,  share: .08, band: .1,  sp: -1.2, tx: -.7, tz: -.9 },
      { r: .52,  share: .09, band: .5,  sp: .6,   tx: .2,  tz: 1.2 },
      { r: .36,  share: .06, band: .08, sp: 2,    tx: 1.4, tz: -.3 },
      { r: .30,  share: .04, band: .08, sp: -2.4, tx: -.2, tz: .8 }
    ];
    // 8 ta relsli halqa (har bir dasturga bittadan): katta / o'rta / kichik, har biri o'z o'qida aylanadi va yadroga nurlar bilan ulangan.
    // Yoylar to'liq emas — bir qismi ochiq.
    const rings = Array.from({ length: 8 }, (_, i) => {
      const size = i % 3, r = size === 0 ? rand(1.02, 1.18) : size === 1 ? rand(.66, .9) : rand(.32, .55);
      return { r, bw: r * rand(.06, .11), span: rand(.8, 1.8), off: rnd() * 6.283,
        tilt: mul(rotY(rand(-.45, .45)), rotX(rand(-.45, .45))),   // kameraga qaragan — markaz atrofida aylanishi ko'rinsin
        sp: rand(.15, .5) * (rnd() < .5 ? -1 : 1) * (size === 2 ? 1.4 : 1), n: 0 };
    });
    rings.forEach(g => { g.n = Math.max(16, Math.round(g.span * g.r * 22)); });

    // bo'laklar: halqalarda qisqa yoylar; qolganlari — kod belgilari: qatlam bilan aylanadi va vaqti-vaqti bilan
    // boshqa belgiga almashadi (ma'lumot qayta ishlanayotgandek)
    const CODES = ["const core = new Reactor(0x7F);", "if (signal.ok) arsenal.sync(apps);", "for (let i = 0; i < 256; i++) mesh[i] ^= key;", "await ai.think({ depth: 3, mode: \"fast\" });", "return Math.sqrt(x * x + y * y) / dt;", "0x1F 0xA3 0x7E 0xFF 0x00 0xC4 0x3D", "01101001 01110010 01101111 01101110", "socket.emit(\"pulse\", { t: Date.now() });", "neural.train(batch, { lr: 0.003 });", "vec3 n = normalize(cross(a, b));", "status = ping(server) ? \"on\" : \"off\";", "matrix[r][c] += weight * input[c];", "λx.λy.(x y) => fold(map(f, xs))", "sudo systemctl restart dezocloud", "fn scan(q) -> Result<Vec<Node>>", "git push origin main --force-lease", "SELECT * FROM apps WHERE ok = 1;", "hash = sha256(salt + secret);", "while (alive) { listen(); reply(); }", "∑ wᵢ·xᵢ + b → σ(z) → 0.9731"];
    const frags = [];
    shells.forEach((s, si) => {
      s.tilt = mul(rotZ(s.tz), rotX(s.tx));
      const n = Math.round(F * s.share);
      for (let i = 0; i < n; i++) {
        const lat = Math.asin((rnd() * 2 - 1) * s.band), lon = rnd() * 6.283, rj = 1 + (rnd() - .5) * .04;
        const at = a => [Math.cos(lat) * Math.cos(a) * rj, Math.sin(lat) * rj, Math.cos(lat) * Math.sin(a) * rj];
        {
          const len = .03 + rnd() * .14;
          frags.push({ s: si, pts: [at(lon), at(lon + len / 2), at(lon + len)], w: .7 + rnd() * 1.6 });
        }
      }
    });
    // kod halqalari: dastur matni aylana bo'ylab yozilgan, har biri o'z og'ishida aylanadi, matn halqa bo'ylab oqadi
    const codeRings = Array.from({ length: 6 }, (_, i) => {
      const r = rand(.5, .95), text = Array.from({ length: 6 }, () => CODES[rnd() * CODES.length | 0]).join('   ');
      return { r, text, n: Math.round(r * (small ? 190 : 240)), sp: rand(.15, .45) * (i % 2 ? -1 : 1), flow: rand(3, 8),
        tilt: mul(rotZ(rand(-1.5, 1.5)), mul(rotY(rand(-1.2, 1.2)), rotX(rand(-1.2, 1.2)))) };
    });
    // skelet: qutbdan qutbga meridianlar (videodagi «g'ildirak» qovurg'alari)
    const meridians = Array.from({ length: 5 }, (_, i) => {
      const lon = i / 5 * Math.PI;
      return Array.from({ length: 33 }, (_, j) => { const a = j / 32 * 6.283; return [Math.cos(a) * Math.cos(lon), Math.sin(a), Math.cos(a) * Math.sin(lon)]; });
    });
    // tashqi qobiqdagi miltillovchi zarrachalar
    const glitter = Array.from({ length: small ? 160 : 240 }, () => {
      const y = rnd() * 2 - 1, a = rnd() * 6.283, c = Math.sqrt(1 - y * y);
      return [c * Math.cos(a), y, c * Math.sin(a), rnd() * 6.283];
    });
    const SP = 40;   // g'ildirak nurlari soni
    const ease = x => x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(1 - x, 3);

    const B = 5;   // chuqurlik qatlamlari: orqadagilar xira, oldingilar yorqin
    function frame(now) {
      if (!cv.isConnected) { ro.disconnect(); return; }
      requestAnimationFrame(frame);
      if (document.hidden || !W) return;
      const raw = now - last, dt = Math.min(raw / 1000, .05); last = now; t += dt;
      // kadr vaqti: 2 s davomida sekin bo'lsa — sifat pasayadi, 6 s tez bo'lsa — qaytadi
      ema += (raw - ema) * .05;
      if (raw < 200) {
        if (ema > 28) { slowFor += raw; fastFor = 0; if (slowFor > 2000 && quality < 2) { quality++; slowFor = 0; } }
        else if (ema < 18) { fastFor += raw; slowFor = 0; if (fastFor > 6000 && quality > 0) { quality--; fastFor = 0; } }
      }
      // inersiya: qo'yib yuborilgandan keyin sekin to'xtaydi
      if (!pts.size) { yaw += vYaw; pitch = Math.max(-1, Math.min(1, pitch + vPitch)); vYaw *= .94; vPitch *= .9; }
      // gapirayotganda: nutqqa o'xshash tebranish + har bir so'zda urilish; tinglayotganda — mikrofon balandligi
      punch = Math.max(0, punch - dt * 3);
      const aim = speaking ? Math.min(1, .35 + .3 * Math.abs(Math.sin(t * 13) * Math.sin(t * 7.3)) + punch * .5)
        : listening ? Math.min(1, .2 + mic * .8) : target;
      level += (aim - level) * Math.min(1, dt * (speaking || listening ? 14 : 6));
      const cx = W / 2, cy = H / 2;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,.58)'; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      // har bir qobiq uchun shu kadrdagi matritsa: ko'rinish × og'ish × o'z aylanishi
      const view = mul(rotX(pitch), rotY(yaw));   // o'ngga-chapga tebranmaydi; faqat barmoq bilan aylantiriladi
      // paydo bo'lish: barcha qismlar bir vaqtda — 0.6 s da so'nib-kattalashib chiqadi
      const age = (now - born) / 1000, build = ease(age / .6), wheel = 1;
      const spin = 1 + level * 2.5, breathe = zoom * (.75 + .25 * ease(age / .6)) * (1 + Math.sin(t * 1.4) * .012 + level * .08);
      ctx.globalAlpha = build;
      const mats = shells.map(s => mul(view, mul(s.tilt, rotY(t * s.sp * spin))));
      const paths = Array.from({ length: B }, () => [new Path2D(), new Path2D()]);   // [ingichka, qalin]
      let bad = null;
      const P = (m, v, r) => [cx + (m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2]) * r, cy + (m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2]) * r, m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2]];

      // g'ildirak: gardish + markazdan chiquvchi nurlar, tik o'q atrofida aylanadi
      const wm = mul(view, mul(rotY(-.9 + t * .7 * spin), rotZ(.15)));
      const wa = wheel * (1 - build * .55), rw = R * breathe;
      if (wa > .01) {
        const sweep = wheel * 6.283, rim = new Path2D(), spokes = new Path2D();
        for (let j = 0; j <= 64; j++) {
          const a = -1.57 + Math.min(j / 64 * 6.283, sweep), [x, y] = P(wm, [0, Math.sin(a), Math.cos(a)], rw);
          j ? rim.lineTo(x, y) : rim.moveTo(x, y);
        }
        for (let j = 0; j < SP; j++) {
          const a = -1.57 + j / SP * 6.283; if (a + 1.57 > sweep) break;
          const [x0, y0] = P(wm, [0, Math.sin(a) * .18, Math.cos(a) * .18], rw), [x1, y1] = P(wm, [0, Math.sin(a), Math.cos(a)], rw);
          spokes.moveTo(x0, y0); spokes.lineTo(x1, y1);
        }
        ctx.strokeStyle = `rgba(255,190,90,${wa * .9})`; ctx.lineWidth = 3; ctx.stroke(rim);
        ctx.strokeStyle = `rgba(255,130,30,${wa * .25})`; ctx.lineWidth = 12; ctx.stroke(rim);
        ctx.strokeStyle = `rgba(255,150,35,${wa * .7})`; ctx.lineWidth = 1.2; ctx.stroke(spokes);
      }

      // skelet: meridianlar tashqi qobiq bilan birga aylanadi, oldingi yarmi yorqinroq
      if (build > 0) {
        const front = new Path2D(), back = new Path2D();
        for (const mer of meridians) {
          let prev = null;
          for (const v of mer) {
            const p = P(mats[0], v, R * 1.0 * breathe);
            if (prev) { const path = p[2] > 0 ? front : back; path.moveTo(prev[0], prev[1]); path.lineTo(p[0], p[1]); }
            prev = p;
          }
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255,150,50,${build * .1})`; ctx.stroke(back);
        ctx.strokeStyle = `rgba(255,150,35,${build * .3})`; ctx.stroke(front);
      }

      // 8 ta relsli halqa: uch qatorli «rels» + ko'ndalang qovurg'alar, har biri yadroga nurlar bilan ulangan,
      // o'z o'qi atrofida aylanadi; oldingi yarmi yorqin, orqasi xira
      if (build > 0) {
        // ishlamayotgan dasturning halqasi — qizil, uzuq-uzuq miltillaydi
        const rails = [new Path2D(), new Path2D(), new Path2D()], ribs = [new Path2D(), new Path2D(), new Path2D()], spk = new Path2D();
        const rh = R * breathe;
        rings.forEach((g, gi) => {
          const off = appStates[gi] === 'off';
          const hm = mul(view, mul(g.tilt, rotZ(g.off + t * g.sp * spin * (off ? .3 : 1))));
          // halqalar markazdan 10 % uzoqroq
          const ks = [g.r, g.r + g.bw / 2, g.r + g.bw].map(k => k * 1.1), every = Math.max(4, Math.round(g.n / 5));
          let prev = [];
          for (let j = 0; j <= g.n; j++) {
            const a = j / g.n * g.span, c = Math.cos(a), s = Math.sin(a), cur = [];
            for (const k of ks) cur.push(P(hm, [c * k, s * k, 0], rh));
            const side = off ? 2 : cur[1][2] > 0 ? 1 : 0;
            if (j && !(off && j % 6 < 2)) for (let i = 0; i < 3; i++) { rails[side].moveTo(prev[i][0], prev[i][1]); rails[side].lineTo(cur[i][0], cur[i][1]); }
            if (j % 2 === 0 && (j * 7) % 11 > 2) { ribs[side].moveTo(cur[0][0], cur[0][1]); ribs[side].lineTo(cur[2][0], cur[2][1]); }
            // yadroga ulovchi nur
            if (j % every === 0 && !off) { const [x0, y0] = P(hm, [c * .2, s * .2, 0], rh); spk.moveTo(x0, y0); spk.lineTo(cur[0][0], cur[0][1]); }
            prev = cur;
          }
        });
        bad = [rails[2], ribs[2]];   // qizil halqalar eng oxirida chiziladi — oltin bo'laklar ularni yopmasin
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255,140,40,${build * .16})`; ctx.stroke(rails[0]); ctx.stroke(ribs[0]);
        ctx.strokeStyle = `rgba(255,150,50,${build * .14})`; ctx.stroke(spk);
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = `rgba(255,165,40,${build * (.55 + level * .3)})`; ctx.stroke(rails[1]);
        ctx.lineWidth = 1; ctx.strokeStyle = `rgba(255,150,30,${build * (.5 + level * .3)})`; ctx.stroke(ribs[1]);
      }

      const codes = Array.from({ length: B }, () => []);
      for (let fi = 0; fi < frags.length; fi += quality > 1 ? 2 : 1) {
        const f = frags[fi], m = mats[f.s], r = R * shells[f.s].r * breathe;
        if (f.c) {
          const [x0, y0, z0] = f.c;
          const z = m[2][0] * x0 + m[2][1] * y0 + m[2][2] * z0, k = (z + 1) / 2;
          if (Math.random() < dt / f.sw) f.code = CODES[Math.random() * CODES.length | 0];   // belgi almashadi
          codes[Math.min(B - 1, k * B | 0)].push(cx + (m[0][0] * x0 + m[0][1] * y0 + m[0][2] * z0) * r, cy + (m[1][0] * x0 + m[1][1] * y0 + m[1][2] * z0) * r, f.code);
          continue;
        }
        let z = 0, first = true;
        const thick = f.w > 1.6 ? 1 : 0;
        let p;
        for (const [x0, y0, z0] of f.pts) {
          const x = m[0][0] * x0 + m[0][1] * y0 + m[0][2] * z0;
          const y = m[1][0] * x0 + m[1][1] * y0 + m[1][2] * z0;
          z = m[2][0] * x0 + m[2][1] * y0 + m[2][2] * z0;
          if (first) { p = paths[Math.min(B - 1, ((z + 1) / 2 * B) | 0)][thick]; p.moveTo(cx + x * r, cy + y * r); first = false; }
          else p.lineTo(cx + x * r, cy + y * r);
        }
      }
      for (let b = 0; b < B; b++) {
        const k = b / (B - 1), a = .12 + k * (.6 + level * .25);
        ctx.strokeStyle = `rgba(255,${105 + k * 55 | 0},${10 + k * 25 | 0},${a})`;
        ctx.lineWidth = .45 + k * .4; ctx.stroke(paths[b][0]);
        ctx.lineWidth = 1 + k * .9; ctx.stroke(paths[b][1]);
      }
      for (const g of codeRings) {
        const m = mul(view, mul(g.tilt, rotZ(t * g.sp * spin))), off = t * g.flow | 0;
        for (let j = 0; j < g.n; j++) {
          const ch = g.text[(j + off) % g.text.length];
          if (ch === ' ') continue;
          const a = j / g.n * 6.283, [x, y, z] = P(m, [Math.cos(a) * g.r, Math.sin(a) * g.r, 0], R * breathe);
          codes[Math.min(B - 1, (z + 1) / 2 * B | 0)].push(x, y, ch);
        }
      }
      // kod belgilari: oldingilari kattaroq va yorqin, orqadagilari mayda va xira
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (let b = 0; b < B; b++) {
        const k = b / (B - 1), list = codes[b];
        if (!list.length) continue;
        ctx.font = `600 ${(R / 120) * (3.2 + k * 1.8)}px ui-monospace, Menlo, Consolas, monospace`;
        ctx.fillStyle = `rgba(255,${115 + k * 55 | 0},${15 + k * 25 | 0},${.15 + k * (.65 + level * .2)})`;
        for (let i = 0; i < list.length; i += 3) ctx.fillText(list[i + 2], list[i], list[i + 1]);
      }

      // miltillovchi zarrachalar (faqat oldingi yarmida)
      for (const [x0, y0, z0, ph] of glitter) {
        const [x, y, z] = P(mats[0], [x0, y0, z0], R * .99 * breathe);
        const a = build * Math.max(0, Math.sin(t * 5 + ph * 7)) * (.3 + z * .7);
        if (a < .05) continue;
        ctx.fillStyle = `rgba(255,190,80,${a})`; ctx.fillRect(x - 1, y - 1, 2, 2);
      }

      // chap cheti: videodagidek yorqin yarim oy (yorug'lik chapdan tushgandek)
      const rr = R * 1.01 * breathe;
      ctx.lineCap = 'round';
      if (build > 0) {
        ctx.strokeStyle = `rgba(255,165,45,${build * (.8 + level * .2)})`; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.arc(cx, cy, rr, 1.75, 4.55); ctx.stroke();
      }
      // shar cheti: ikki yoy qarama-qarshi aylanadi
      ctx.globalAlpha = build;
      for (const [a0, len, dir, w] of [[0, 4.2, 1, 2.2], [2.5, 1.6, -1, 1.4]]) {
        const s0 = a0 + t * .3 * dir * spin;
        ctx.strokeStyle = `rgba(255,145,35,${.45 + level * .3})`; ctx.lineWidth = w;
        ctx.beginPath(); ctx.arc(cx, cy, rr, s0, s0 + len); ctx.stroke();
      }

      // ishlamayotgan dasturlar halqasi: oddiy ustma-ust chizish (qo'shib chizilsa qizil oltin ustida to'q sariqqa aylanadi)
      if (bad) {
        const blink = .35 + .65 * (Math.sin(t * 9) > -.2 ? 1 : 0);
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 1.6; ctx.strokeStyle = `rgba(255,45,35,${build * .95 * blink})`; ctx.stroke(bad[0]); ctx.stroke(bad[1]);
        ctx.globalCompositeOperation = 'lighter';
      }

      ctx.globalAlpha = .2 + .8 * build;
      // yadro: iliq porlash + ichki yorqin nuqta, yurak urishidek
      const pulse = .5 + .5 * Math.sin(t * 2.4), cr = R * (.2 + pulse * .02 + level * .1);
      // rasmdagidek: o'rtasi to'q, atrofi porlovchi to'q sariq halqa
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr * 1.8);
      g.addColorStop(0, 'rgba(255,90,10,.05)');
      g.addColorStop(.28, `rgba(255,110,15,${.25 + level * .2})`);
      g.addColorStop(.42, `rgba(255,170,45,${.75 + level * .25})`);
      g.addColorStop(.58, `rgba(255,120,20,${.4 + level * .3})`);
      g.addColorStop(1, 'rgba(255,80,10,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, cr * 1.8, 0, 6.283); ctx.fill();
      ctx.strokeStyle = `rgba(255,175,60,${.45 + level * .3})`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, cr * .75, 0, 6.283); ctx.stroke();

      ctx.globalAlpha = 1;
      // porlash (bloom): kadrning xiralashtirilgan nusxasini ustiga qo'shamiz — kinodagi gologramma nuri
      if (quality === 0) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.filter = `blur(${(small ? 3 : 4) * Math.min(devicePixelRatio || 1, 2)}px)`;
        ctx.globalAlpha = .14 + level * .1;
        ctx.drawImage(cv, 0, 0);
        ctx.restore();
      }
      ctx.lineCap = 'butt';
      ctx.globalCompositeOperation = 'source-over';
    }
    requestAnimationFrame(frame);
  }

  return {
    mount, say, stop,
    get speaking() { return speaking; },
    talk(v) { target = Math.max(0, Math.min(1, v)); },
    setApps(states) { appStates = states; },                                  // halqa = dastur; 'off' — qizil
    listen(on) { listening = on; if (!on) mic = 0; },                         // tinglash holati
    hear(v) { mic = Math.max(0, Math.min(1, v)); if (v > .5) punch = 1; },    // mikrofon balandligi 0..1
    get justDragged() { return Date.now() - dragged < 350; }                  // surishdan keyin bosish hisoblanmaydi
  };
})();
