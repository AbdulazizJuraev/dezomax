/* Kanalga reklama afishasini yuborish (promo/dezomax-telegram-reklama.png) — tg-post.yml → «promo» bilan, bir marta. */
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.TG_BOT_TOKEN || '';
const CHANNEL = process.env.TG_CHANNEL || '@dezomaxuz';
const CAPTION = '🎬 <b>DezoMax — kinolar endi bepul va o‘zbek tilida!</b>\n\nHar kuni yangi kinolar, seriallar va multfilmlar. Do‘stlaringizga ham ulashing 👇\n\n📢 t.me/dezomaxuz\n🌐 dezomax.uz';

(async () => {
  if (!TOKEN) { console.log('TG_BOT_TOKEN yo‘q'); process.exit(1); }
  const form = new FormData();
  form.append('chat_id', CHANNEL);
  form.append('caption', CAPTION);
  form.append('parse_mode', 'HTML');
  form.append('reply_markup', JSON.stringify({ inline_keyboard: [[{ text: '🎬 Saytga o‘tish', url: 'https://dezomax.uz/' }], [{ text: '📢 Kanalni ulashish', url: 'https://t.me/share/url?url=https%3A%2F%2Ft.me%2Fdezomaxuz' }]] }));
  form.append('photo', new Blob([fs.readFileSync(path.join(__dirname, '..', 'promo', 'dezomax-telegram-reklama.png'))], { type: 'image/png' }), 'dezomax.png');
  const j = await fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, { method: 'POST', body: form }).then(r => r.json());
  console.log(j.ok ? '✓ Afisha kanalga yuborildi' : `✗ ${j.description}`);
  if (!j.ok) process.exit(1);
})();
