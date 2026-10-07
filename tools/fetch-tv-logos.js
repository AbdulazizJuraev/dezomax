/* Telekanallar logolari — iptv-org ochiq katalogidan (oqimlar ham shu katalogdan).
   js/channels.js dagi logo: null bo'lgan kanallarga logotip topadi, images/tv/<id>.<ext> ga yuklab qo'yadi
   va logo maydonini yozadi. Ishga tushirish:  node tools/fetch-tv-logos.js */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'js/channels.js');
const OUT = path.join(ROOT, 'images/tv');

const norm = s => String(s || '').toLowerCase()
  .replace(/[ʻʼ'‘’`]/g, '').replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/g, '');

(async () => {
  let src = fs.readFileSync(FILE, 'utf8');
  // [^}] — bitta kanal ichida qoladi (aks holda qo'shni kanalning «logo: null» iga o'tib ketadi)
  const re = /\{ id: '([^']+)', name: "([^"]+)", country: '(\w+)'[^}]*?logo: (null|'[^']*'),/g;
  const todo = [];
  let m;
  while ((m = re.exec(src))) if (m[4] === 'null') todo.push({ id: m[1], name: m[2], country: m[3] });
  console.log('logosiz kanallar:', todo.length);
  if (!todo.length) return;

  const [channels, logos] = await Promise.all([
    fetch('https://iptv-org.github.io/api/channels.json').then(r => r.json()),
    fetch('https://iptv-org.github.io/api/logos.json').then(r => r.json())
  ]);

  const byCountry = {};
  for (const c of channels) (byCountry[c.country] ||= []).push(c);

  const findChannel = t => {
    const list = byCountry[t.country.toUpperCase()] || [];
    const direct = list.find(c => c.id.toLowerCase() === (t.id + '.' + t.country).toLowerCase());
    if (direct) return direct;
    const n = norm(t.name);
    return list.find(c => norm(c.name) === n)
      || list.find(c => (c.alt_names || []).some(a => norm(a) === n))
      || list.find(c => norm(c.name).startsWith(n) || n.startsWith(norm(c.name)) && norm(c.name).length > 3);
  };

  // PNG/JPEG oldin (SVG ham bo'ladi), eng katta; kvadratga yaqini afzal
  const pickLogo = id => {
    const list = logos.filter(l => l.channel === id && !l.feed);
    const all = list.length ? list : logos.filter(l => l.channel === id);
    const score = l => (/svg/i.test(l.format || '') ? 0 : 2) + Math.min(1, (l.width || 0) / 400)
      - Math.abs(Math.log((l.width || 1) / (l.height || 1))) * 0.3;
    return all.sort((a, b) => score(b) - score(a))[0];
  };

  let done = 0;
  const missed = [];
  for (const t of todo) {
    const ch = findChannel(t);
    const lg = ch && pickLogo(ch.id);
    if (!lg) { missed.push(t.name); continue; }
    try {
      // i.imgur.com ba'zi tarmoqlarda bloklangan — i.imgur.io o'sha fayl; bo'lmasa DuckDuckGo rasm proksisi
      const tries = [lg.url.replace('//i.imgur.com/', '//i.imgur.io/'), lg.url, 'https://proxy.duckduckgo.com/iu/?u=' + encodeURIComponent(lg.url)];
      let r = null;
      for (const u of tries) { try { r = await fetch(u); if (r.ok) break; } catch { r = null; } }
      if (!r || !r.ok) throw new Error('yuklab bo‘lmadi');
      const type = r.headers.get('content-type') || '';
      const ext = /svg/.test(type) || /\.svg/i.test(lg.url) ? 'svg' : /jpe?g/.test(type) ? 'jpg' : /webp/.test(type) ? 'webp' : 'png';
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 200) throw new Error('bo‘sh fayl');
      const file = `${t.id}.${ext}`;
      fs.writeFileSync(path.join(OUT, file), buf);
      src = src.replace(new RegExp(`(\\{ id: '${t.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[^}]*?logo: )null,`), `$1'images/tv/${file}',`);
      done++;
      console.log('✓', t.name, '←', ch.id, lg.width + '×' + lg.height);
    } catch (e) {
      missed.push(t.name + ' (' + e.message + ')');
    }
  }
  fs.writeFileSync(FILE, src);
  console.log(`\n${done} ta logo qo'yildi.` + (missed.length ? ` Topilmadi: ${missed.join(', ')}` : ''));
})();
