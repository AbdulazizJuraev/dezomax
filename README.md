# DezoMax — Onlayn kinoteatr

Sof HTML / CSS / JavaScript'da yozilgan kino sayti. Hech qanday o'rnatish, server yoki
`npm install` talab qilinmaydi — `index.html` faylini brauzerda ochsangiz bas.

**Jonli sayt:** https://abdulazizjuraev.github.io/dezomax/

## Ishga tushirish

1. `index.html` faylini ikki marta bosing (yoki brauzerga sudrab tashlang).
2. Tayyor.

## Saytni yangilash

Sayt GitHub Pages'da turadi va `main` tarmog'iga har bir push'dan keyin
**avtomatik** qayta quriladi. Ya'ni o'zgarish kiritganingizdan so'ng:

```bash
node tools/bump-version.js
git add -A
git commit -m "Nima o'zgargani haqida qisqacha"
git push
```

> `tools/bump-version.js` barcha HTML fayllardagi css/js havolalariga yangi `?v=` versiya
> qo'yadi. Busiz brauzer yangi sahifani keshdagi eski JavaScript bilan ochib qolishi
> mumkin (GitHub Pages fayllarni 10 daqiqagacha keshlaydi) va sahifa buziladi.

Yangilanish 30–90 soniyada jonli saytda paydo bo'ladi. Hech qanday qo'shimcha
sozlash, build yoki deploy buyrug'i kerak emas.

Qurilish holatini ko'rish:

```bash
gh api repos/AbdulazizJuraev/dezomax/pages/builds/latest --jq .status
```

> Brauzer eski nusxani keshdan ko'rsatishi mumkin — `Ctrl+F5` bilan yangilang.

## Fayllar tuzilishi

```
index.html        Bosh sahifa (slider + kinolar qatorlari)
sport.html        Sport: 6 ta sport turi, jonli hisob, futbol yangiliklari
tv.html           Telekanallar: jonli efir (HLS)
plans.html        Obuna rejalari va narxlar
downloads.html    Yuklab olinganlar
catalog.html      Katalog: qidiruv, janr/tur filtrlari, saralash
movie.html        Kino sahifasi: tavsif, pleyer, o'xshash kinolar
favorites.html    Sevimlilar (brauzer xotirasida saqlanadi)

images/           Kinolar posterlari (61 ta)
css/style.css     Barcha uslublar
js/data.js        >>> KINOLAR BAZASI — asosan shu faylni tahrirlaysiz
js/channels.js    >>> TELEKANALLAR RO‘YXATI
js/i18n.js        O'zbekcha / ruscha tarjimalar
js/common.js      Umumiy funksiyalar (kartochka, poster, sevimlilar, header)
js/app.js         Bosh sahifa logikasi
js/catalog.js     Katalog logikasi
js/movie.js       Kino sahifasi logikasi
js/favorites.js   Sevimlilar logikasi
js/sport.js       Sport logikasi (ESPN API)
js/tv.js          Telekanallar pleyeri
js/plans.js       Obuna rejalari
js/downloads.js   Yuklab olinganlar
```

## Yangi kino qo'shish

`js/data.js` faylidagi `MOVIES` ro'yxatiga yangi obyekt qo'shing:

```js
{
  id: 62,                          // takrorlanmas raqam
  slug: 'yangi-kino',
  year: 2025,
  type: 'film',                    // 'film' | 'serial' | 'multfilm'
  franchise: 'marvel',             // ixtiyoriy: 'marvel' | 'dc'
  title:   { uz: 'Yangi kino',  ru: 'Новый фильм' },
  genres:  ['action', 'drama'],    // GENRES ro'yxatidagi kodlar
  rating:  8.2,
  duration: 120,                   // daqiqada (serial uchun: seasons: 3)
  country: { uz: 'AQSh', ru: 'США' },
  director: 'Ism Familiya',
  cast: ['Aktyor 1', 'Aktyor 2'],
  tags: ['Batman', 'Бэтмен'],      // ixtiyoriy: qo'shimcha qidiruv kalitlari
  desc: { uz: 'Qisqacha tavsif...', ru: 'Краткое описание...' },
  colors: ['#1b3a5c', '#0a1628'],  // poster gradienti (zaxira)
  poster: 'images/yangi-kino.jpg',
  trailer: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
  video: '',                       // to'liq kino havolasi
  featured: false                  // true bo'lsa bosh sahifadagi sliderda chiqadi
}
```

### `franchise` — Marvel va DC

`franchise: 'marvel'` yoki `franchise: 'dc'` yozsangiz, kino avtomatik ravishda
bosh sahifadagi **Marvel olami** / **DC olami** qatorida va katalogdagi "Olam"
filtrida paydo bo'ladi. Yangi olam qo'shish uchun `js/catalog.js` dagi
`FRANCHISES` ro'yxatiga kod qo'shing va `js/i18n.js` ga nomini yozing.

### `tags` — qidiruvni yaxshilash

Kinoning nomida bo'lmagan, lekin odamlar qidiradigan so'zlar. Masalan
"Qorong'u ritsar" nomida "Betmen" so'zi yo'q, shuning uchun:

```js
tags: ['Batman', 'Betmen', 'Бэтмен', 'Joker']
```

### Posterlar

Barcha 61 ta kinoning posteri `images/` papkasida (jami ~6.9 MB) va oflayn ishlaydi.
Yangi kino uchun rasmni shu papkaga tashlang va yo'lini ko'rsating:

```js
poster: 'images/yangi-kino.jpg'     // yoki to'liq URL
```

Agar `poster` ko'rsatilmasa yoki rasm topilmasa, `colors` gradientidan avtomatik
yasalgan poster ko'rsatiladi — sayt hech qachon bo'sh katak bilan qolmaydi.

### Video havolalari

Ikkita alohida maydon bor:

| Maydon | Vazifasi |
|---|---|
| `trailer` | Treyler havolasi. 61 ta kinoning hammasida to'ldirilgan (YouTube). |
| `video`   | To'liq kino havolasi. Bo'sh bo'lsa — pleyerda treyler ko'rsatiladi. |

Ikkalasi ham bo'lsa, pleyer ustida **Kino / Treyler** tugmalari paydo bo'ladi.

Pleyer havola turini o'zi aniqlaydi:

```js
video: 'https://www.youtube.com/watch?v=XXXXXXXXXXX'       // YouTube
video: 'https://vimeo.com/123456789'                        // Vimeo
video: 'https://drive.google.com/file/d/FILE_ID/view'       // Google Drive
video: 'videos/kino.mp4'                                    // lokal fayl
video: 'https://server.uz/kino.mp4'                         // to'g'ridan-to'g'ri havola
video: 'https://server.uz/playlist.m3u8'                    // HLS oqim
video: 'https://boshqa-pleyer.com/embed/123'                // har qanday embed
```

`.m3u8` uchun hls.js kutubxonasi faqat kerak bo'lganda avtomatik yuklanadi.
Pleyer ostida "Yangi oynada ochish" havolasi ham bor — agar biror video
sayt ichida ochilishni taqiqlasa, foydalanuvchi uni alohida oynada ko'radi.

**"Katta quyon Bak"** (id 31) — to'liq ishlaydigan namuna: bu Blender Foundation'ning
CC BY litsenziyasidagi erkin filmi, saytda boshidan oxirigacha ko'rish mumkin.
Uning ustida `video` maydoni qanday ishlashini sinab ko'rishingiz mumkin.

> Eslatma: qolgan 60 ta kinoda `video` maydoni bo'sh qoldirilgan — chunki ularning
> to'liq nusxalari mualliflik huquqi bilan himoyalangan. O'zingizdagi yoki litsenziya
> olgan manbalaringiz havolasini shu maydonga qo'ysangiz, pleyer darhol ishlaydi.

## Telekanallar

`js/channels.js` da 66 ta kanal: 32 ta o'zbek va 34 ta rus kanali (Первый канал,
Карусель, НТВ Мир, ТНТ4, Дом кино, Матч! va boshqalar). Oqimlar iptv-org ochiq
katalogidan olingan, har biri brauzerdan tekshirilgan. Sahifada ular davlat bo'yicha
guruhlanadi. 27 ta kanalning logotipi `images/tv/` da.

Yangi kanal qo'shish:

```js
{ id: 'YangiTV', name: 'Yangi TV', country: 'uz', category: 'general',
  logo: 'images/tv/YangiTV.png',          // yoki null
  url: 'https://server.uz/live/playlist.m3u8',
  colors: ['#2a4a6b', '#0a1220'] }
```

> **Muhim:** havola albatta `https://` bo'lishi kerak — sayt HTTPS da turgani uchun
> brauzer `http://` oqimlarni bloklaydi. Server CORS ruxsatini ham berishi shart.

Pleyerda "Katta ekran" tugmasi bor; telefonda ovozli avtoijro taqiqlangan bo'lsa,
kanal ovozsiz ochiladi va "Ovozni yoqish" tugmasi chiqadi.

## Sport

Ma'lumot ESPN ning ochiq API sidan (kalit kerak emas). Sahifa sport turlari bo'yicha
bo'limlarga bo'lingan: **Futbol, Basketbol, Tennis, Xokkey, UFC / MMA, Formula 1**.
Har bir bo'limda avval jonli o'yinlar, keyin bugungi, yaqinda tugagan va keyingi
kunlardagilar. Jonli hisob har 60 soniyada yangilanadi.

Yangi sport qo'shish uchun `js/sport.js` dagi `SPORTS` ro'yxatiga yozing va
`js/i18n.js` ga nomini qo'shing (`sport.<id>`).

> O'zbekiston Superligasi ESPN da yo'q. Osiyo Chempionlar ligasidagi o'zbek klublari
> (masalan Neftchi) esa chiqadi.

## Obunalar

`js/plans.js` da uchta reja: Bepul, Standart (29 000 so'm/oy), Premium (49 000 so'm/oy).
Yillik to'lovda 2 oy bepul (−17%). Narx va imkoniyatlarni shu faylda o'zgartirasiz.

> **To'lov tizimi ulanmagan.** Tanlangan reja faqat brauzerda saqlanadi, hech qanday
> pul yechilmaydi. Haqiqiy to'lov (Payme, Click, Stripe) server tomonini talab qiladi —
> maxfiy kalitni statik saytga qo'yib bo'lmaydi, u hammaga ko'rinib qoladi.

## Yuklab olinganlar

Kino sahifasidagi «Yuklab olish» tugmasi kinoni ro'yxatga qo'shadi.

- Agar kinoning `video` maydonida to'g'ridan-to'g'ri fayl bo'lsa (mp4/webm) —
  haqiqiy yuklab olish havolasi beriladi;
- YouTube treyler yoki HLS oqim bo'lsa — «Yuklab bo'lmaydi» deb ko'rsatiladi.

> Ilovalardagi kabi haqiqiy oflayn ko'rish uchun sayt o'z video fayllariga va
> Service Worker'ga ega bo'lishi kerak. Hozircha bunday fayllar yo'q.

## Yangi janr qo'shish

`js/data.js` boshidagi `GENRES` ro'yxatiga qo'shing — katalog filtri va futer
avtomatik yangilanadi:

```js
{ id: 'sport', uz: 'Sport', ru: 'Спорт' }
```

## Matnlarni tarjima qilish

Interfeys matnlari `js/i18n.js` faylida. HTML'da `data-i18n="kalit"` atributi
ishlatiladi, til almashtirilganda hammasi avtomatik yangilanadi.

## Xususiyatlar

- Haqiqiy posterlar va har bir kino uchun treyler
- Pleyer: YouTube, Vimeo, Google Drive, mp4/webm, HLS (.m3u8) va embed havolalar
- Avtomatik aylanuvchi hero-slider
- Gorizontal kinolar qatorlari (strelkalar bilan)
- Jonli qidiruv: nom, rejissyor, aktyor, janr, yil, olam va qo‘shimcha kalitlar
- Marvel va DC uchun alohida bo‘limlar hamda katalog filtri
- Tur, olam va janr filtrlari, 4 xil saralash
- Sevimlilar ro'yxati (`localStorage`)
- O'zbekcha / ruscha til almashtirish (tanlov saqlanadi)
- To'liq moslashuvchan dizayn (telefon, planshet, kompyuter)
- 66 ta telekanal jonli efirda (o'zbek va rus), logotiplar va katta ekran
- Sport: futbol, basketbol, tennis, xokkey, UFC va Formula 1 — jonli hisob (ESPN)
- Obuna rejalari va narxlar sahifasi
- Telefonda pastki navbar va "Yana" menyusi
- Kirish animatsiyalari, `prefers-reduced-motion` qo'llab-quvvatlanadi

## Eslatma

Posterlar Vikipediyadan olingan va faqat ushbu demo loyiha uchun ishlatilmoqda —
ular mualliflik huquqi bilan himoyalangan. Saytni ommaga chiqaradigan bo'lsangiz,
o'z posterlaringizni yoki litsenziya olgan rasmlarni qo'yishingiz kerak.
Treylerlar YouTube'dan embed qilinadi, ya'ni video DezoMax serverida saqlanmaydi.
Telekanallar ham ochiq efirdan uzatiladi va saytda saqlanmaydi. Sport ma'lumotlari
ESPN ning ochiq API sidan olinadi.
