# DezoMax — to'lov serveri (Click)

Bu dastur Click to'lovlarini qabul qiladi va foydalanuvchilar balansini saqlaydi. Sayt (GitHub Pages) statik bo'lgani uchun to'lovni faqat alohida server qabul qila oladi.

**Maxfiy kalit (`CLICK_SECRET_KEY`) faqat serverdagi `/etc/dezomax-pay.env` faylida turadi. Uni kodga, GitHub'ga, chatga yozmang.**

## Nima kerak
- **Statik IP'li server (VPS)** — Click shuni talab qiladi. Ubuntu 22.04/24.04, 1 GB xotira yetadi (oyiga ~$4–6). O'zbekistondagi hosting bo'lsa Click'ga IP qo'shdirish shart bo'lmasligi mumkin (TAS-IX tarmog'i), chet eldagi bo'lsa — qo'shdiriladi.
- **Domen.** Pulli domen shart emas: server IP'si `12.34.56.78` bo'lsa, bepul `12-34-56-78.sslip.io` ishlaydi va HTTPS sertifikatini Caddy o'zi oladi.

## O'rnatish (serverda, bir marta)

```bash
# 1) Node 22 va Caddy
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs git caddy

# 2) dastur
sudo git clone https://github.com/AbdulazizJuraev/dezomax.git /opt/dezomax
sudo useradd --system --home /opt/dezomax-data --create-home dezomax
```

**3) Maxfiy sozlamalar** — `sudo nano /etc/dezomax-pay.env` va shularni yozing (kalitni Click kabinetidan o'zingiz qo'yasiz):

```
CLICK_SERVICE_ID=91486
CLICK_MERCHANT_ID=53547
CLICK_SECRET_KEY=BU_YERGA_CLICK_MAXFIY_KALITI
GOOGLE_CLIENT_ID=908276451743-a2o6sj3n1fgfbm93q0e09ephcrotanvt.apps.googleusercontent.com
DB_FILE=/opt/dezomax-data/pay.db
```

```bash
sudo chmod 600 /etc/dezomax-pay.env
sudo cp /opt/dezomax/server/dezomax-pay.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now dezomax-pay
```

**4) HTTPS** — `sudo nano /etc/caddy/Caddyfile`:

```
12-34-56-78.sslip.io {
    reverse_proxy 127.0.0.1:8787
}
```

```bash
sudo systemctl reload caddy
curl https://12-34-56-78.sslip.io/health      # {"ok":true} chiqishi kerak
```

## Click kabinetida (merchant.click.uz)
1. **Servislar** → qalam belgisi → manzillarni yozing:
   - Prepare: `https://SIZNING-DOMEN/click/prepare`
   - Complete: `https://SIZNING-DOMEN/click/complete`
2. Click'ning **test dasturi** bilan tekshiring: https://docs.click.uz/click-api-testing
3. **Fiskalizatsiya (IKPU)** kodini xizmat sozlamasida kiriting (tasnif.soliq.uz dan mos kodni tanlaysiz, buxgalter bilan maslahatlashing). Bitta IKPU bo'lsa qo'shimcha metod kerak emas.
4. Click'ga xabar bering: **domen, IP manzil va port (443)** — ular xavfsizlik devoriga qo'shadi (server TAS-IX tarmog'ida bo'lmasa) va servisni yoqadi. **IP o'zgarsa — oldin Click'ga xabar bering.**

## Telegram orqali tasdiqlash (ixtiyoriy)

1. Telegramda **@BotFather** ga yozing: `/newbot` → bot nomi va foydalanuvchi nomini tanlaysiz (masalan `dezomaxuserbot`).
2. BotFather bergan **tokenni** `/etc/dezomax-pay.env` ga qo'shing:

```
TG_BOT_TOKEN=BotFather_bergan_token
TG_BOT_NAME=dezomaxuserbot
TG_WEBHOOK_SECRET=uzun_tasodifiy_matn
```

3. Xizmatni qayta ishga tushiring: `sudo systemctl restart dezomax-pay`
4. Telegramga webhook manzilini ayting (bir marta, o'z tokeningiz bilan):

```bash
curl -F "url=https://SIZNING-DOMEN/tg/webhook" -F "secret_token=uzun_tasodifiy_matn"   https://api.telegram.org/botTOKEN/setWebhook
```

5. Saytda `js/firebase-config.js` dagi `TG_BOT` ga bot nomini yozing (`dezomaxuserbot`), commit va push.

Qanday ishlaydi: foydalanuvchi «Telegram orqali tasdiqlash» ni bosadi → bot ochiladi → bot 6 xonali kod yuboradi →
kod saytdagi oynaga yoziladi. Kod 10 daqiqa amal qiladi, bazada faqat xeshi saqlanadi, 5 marta xato kiritilsa bloklanadi.

## Saytni ulash
Server ishlagach, `js/firebase-config.js` dagi `PAY_API` ga domenni yozing (`https://12-34-56-78.sslip.io`), commit va push. Shundan keyin "Balansni to'ldirish" ishlaydi.

## Ishlashini tekshirish
- Sinov (Click kaliti va internetsiz): `cd server && node --disable-warning=ExperimentalWarning test.js` — 38 ta tekshiruv (Click va Telegram).
- Loglar: `sudo journalctl -u dezomax-pay -f` (maxfiy kalit yozilmaydi).
- Zaxira: `sudo cp /opt/dezomax-data/pay.db /somewhere/pay-$(date +%F).db` (har kuni cron bilan).

## Qanday ishlaydi
1. Foydalanuvchi Google bilan kiradi → sayt serverga Google tokenini beradi → server sessiya beradi.
2. "Click orqali to'lash" → server buyurtma yaratadi va Click to'lov havolasini qaytaradi.
3. Click Prepare/Complete so'rovlarini yuboradi → server MD5 imzoni maxfiy kalit bilan tekshiradi → balansni oshiradi (bir buyurtma ikki marta to'lanmaydi).
4. Tarif sotib olinganda pul serverdagi balansdan yechiladi.
