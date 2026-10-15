/* Telegram kanal (@dezomaxuz) tavsifi va surati — bot orqali (bir marta; tg-post.yml → «setup» bilan ishga tushiriladi).
   Bot kanalda admin va «Kanal ma'lumotlarini o'zgartirish» ruxsati bo'lishi kerak. Token — faqat GitHub secret'da. */
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.TG_BOT_TOKEN || '';
const CHANNEL = process.env.TG_CHANNEL || '@dezomaxuz';
const DESC = 'DezoMax — o‘zbek tilidagi kinolar, seriallar va multfilmlar bepul onlayn. Har kuni yangi kinolar: o‘zbek filmlari, Mosfilm va Soyuzmultfilm klassikasi.\n\n🎬 Sayt: dezomax.uz\n📱 Ilova: dezomax.uz';
const PHOTO = path.join(__dirname, '..', 'images', 'logo', 'telegram-avatar.png');

(async () => {
  if (!TOKEN) { console.log('TG_BOT_TOKEN yo‘q'); process.exit(1); }
  const api = `https://api.telegram.org/bot${TOKEN}/`;
  const d = await fetch(api + 'setChatDescription', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: CHANNEL, description: DESC }) }).then(r => r.json());
  console.log(d.ok ? '✓ Kanal tavsifi o‘rnatildi' : `✗ Tavsif: ${d.description}`);
  const form = new FormData();
  form.append('chat_id', CHANNEL);
  form.append('photo', new Blob([fs.readFileSync(PHOTO)], { type: 'image/png' }), 'dezomax.png');
  const p = await fetch(api + 'setChatPhoto', { method: 'POST', body: form }).then(r => r.json());
  console.log(p.ok ? '✓ Kanal surati o‘rnatildi' : `✗ Surat: ${p.description}`);
  if (!d.ok && !p.ok) process.exit(1);
})();
