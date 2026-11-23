/* ============================================================
   DezoMax — «Siz uchun Qiziqarli» bo'limi (2026-11-22: Audio Kitoblar o'rniga Oshxona, Ilm-fan, Sayohat, Avto) (qiziqarli.html, bosh sahifadagi qator). 2026-11-21
   Har bo'lim — YouTube kanallari. Videolar kanalning o'zidan, YouTube pleyerida ko'rsatiladi
   (ko'rishlar, layklar va reklama daromadi kanal egasida). Shortslar chiqmaydi: kanalning faqat uzun videolari
   (UULF… pleylisti) olinadi.
   Karta rasmi: images/fun/<key>.webp (gameplay 420x600, qolganlari 600x600).
   Ro'yxat: dezomax.uz/_yt/feed?ch=UC…,UC… (cloudflare/site/worker.js — YouTube RSS, 30 daqiqa kesh).
   Kanal qo'shish: { id: 'UC…', name: '…' } — id YouTube kanal sahifasidagi «channel_id».
   ============================================================ */
const FUN_SECTIONS = [
  {
    key: 'gameplay', uz: 'Gameplaylar', ru: 'Геймплеи', c1: '#A78BFA', c2: '#DDD6FE',
    sub: ['O‘zbekcha va dunyo o‘yinlari', 'Прохождения игр'],
    icon: '<rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7.5 10.5v4M5.5 12.5h4"/><circle cx="15.5" cy="11.5" r=".9"/><circle cx="17.8" cy="13.8" r=".9"/>',
    ch: [
      // 2026-11-23: faqat FEZOT (egasidan ruxsat olingan); rasm — kanalning YouTube'dagi avatari (images/fun/fezot.webp)
      { id: 'UCxIDGzyWz-leezRPIIQnAkQ', name: 'FEZOT', av: 'images/fun/fezot.webp' }
    ]
  },
  {
    key: 'podcast', uz: 'Podcast', ru: 'Подкасты', c1: '#FB7185', c2: '#FECDD3',
    sub: ['O‘zbekcha suhbatlar', 'Узбекские подкасты'],
    icon: '<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v4M8.5 21.5h7"/>',
    ch: [
      { id: 'UC0iyxdzqjDgajBX8KJBhd7Q', name: 'NmaGap' },
      { id: 'UCpwLPh8qvA13tHStxV2-QEg', name: 'O‘zimiz' },
      { id: 'UCky2T4K_s1_zF_OViHyH5eA', name: 'Bemalol' },
      { id: 'UCAbBjvOlxbpx8RC9OrHednw', name: 'ZBS Podcast' },
      { id: 'UC6ori1JrTlZsFtrMqa9DFMg', name: 'Sigma Podcast' },
      { id: 'UCQnciwtALk_Z_WMLhu4YMoA', name: 'qiyofa.podcast' }
    ]
  },
  {
    key: 'animals', uz: 'National Animals', ru: 'Мир животных', c1: '#FBBF24', c2: '#FDE68A',
    sub: ['Hayvonot olami haqida', 'Дикая природа'],
    icon: '<circle cx="6" cy="9.5" r="1.8"/><circle cx="10" cy="5.8" r="1.8"/><circle cx="14" cy="5.8" r="1.8"/><circle cx="18" cy="9.5" r="1.8"/><path d="M12 11c-3 0-5.5 3.6-5.5 6.2 0 1.6 1.3 2.3 2.8 2.3 1.2 0 1.8-.6 2.7-.6s1.5.6 2.7.6c1.5 0 2.8-.7 2.8-2.3C17.5 14.6 15 11 12 11z"/>',
    ch: [
      { id: 'UCDPk9MG2RexnOMGTD-YnSnA', name: 'Nat Geo Animals' },
      { id: 'UCwmZiChSryoWQCZMIQezgTg', name: 'BBC Earth' },
      { id: 'UCXVCgDuD_QCkI7gTKU7-tpg', name: 'Nat Geo Kids' },
      { id: 'UCO_DaPp4ifhMAmiyybSLx9w', name: 'BBC Earth Kids' }
    ]
  },
  {
    key: 'music', uz: 'Music', ru: 'Музыка', c1: '#60A5FA', c2: '#BFDBFE',
    sub: ['Yangi o‘zbek qo‘shiqlari', 'Новые узбекские песни'],
    icon: '<path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    ch: [
      { id: 'UCkaUg9b9LplVoJdx1JwwyOg', name: 'NevoMusic' },
      { id: 'UCrwGAQfaJhRapPETC-la2pQ', name: 'Yulduz Usmonova' },
      { id: 'UCBTkFkZUXfuPKisU6kZdn5A', name: 'Ozoda' },
      { id: 'UCh9shDtuxe5Wyp5W4E1715A', name: 'Jaloliddin Ahmadaliyev' },
      { id: 'UC4O88FyMTPqFckXLhvdDeTg', name: 'Ulug‘bek Rahmatullayev' }
    ]
  },
  {
    key: 'oshxona', uz: 'Oshxona', ru: 'Кухня', c1: '#FB923C', c2: '#FED7AA',
    sub: ['Taomlar va retseptlar', 'Рецепты и блюда'],
    ch: [
      { id: 'UCYfeKTGkLSdeS24dFk-5fSw', name: 'Shef-povar Nishonov' },
      { id: 'UCj4KP216972cPp2w_BAHy8g', name: 'Wilderness Cooking' },
      { id: 'UCQexaAjPn3-1MCE4DmBK3Tg', name: 'Village Food Secrets' },
      { id: 'UCJFp8uSYCjXOMnkUyb3CQ3Q', name: 'Tasty' }
    ]
  },
  {
    key: 'ilm', uz: 'Ilm-fan', ru: 'Наука', c1: '#22D3EE', c2: '#A5F3FC',
    sub: ['Kosmos, texnologiya, faktlar', 'Космос, технологии, факты'],
    ch: [
      { id: 'UCvFGofYpm12Jxydfev_ksog', name: 'FANTEX' },
      { id: 'UCpFIJt8SBWaJFNQIB9tmFJw', name: 'bu QIZIQ' },
      { id: 'UCsXVk37bltHxD1rDPwtNM8Q', name: 'Kurzgesagt' },
      { id: 'UCHnyfMqiRRG1u-2MsSQLbXA', name: 'Veritasium' }
    ]
  },
  {
    key: 'sayohat', uz: 'Sayohat', ru: 'Путешествия', c1: '#A3E635', c2: '#D9F99D',
    sub: ['O‘zbekiston va dunyo', 'Узбекистан и мир'],
    ch: [
      { id: 'UCNhBg9DSwW2ftcFLbmZZ0FQ', name: 'O‘zbekiston ekspeditsiyasi' },
      { id: 'UCqpH-sBCE4IQvycA-46g78A', name: 'Masik Travel' },
      { id: 'UC0Ize0RLIbGdH5x4wI45G-A', name: 'Drew Binsky' }
    ]
  },
  {
    key: 'avto', uz: 'Avto', ru: 'Авто', c1: '#818CF8', c2: '#C7D2FE',
    sub: ['Mashina sharhlari', 'Обзоры авто'],
    ch: [
      { id: 'UCk6SevtvW1QCcN3iWJrWvEg', name: 'Xurshid Obzor' },
      { id: 'UCeVs_9nUeDGSisPAfkF-ziQ', name: 'JAHONGIR UZ' },
      { id: 'UCrszDJh4ETj8-R_kYOg_YIw', name: 'Sherzod Abzor' },
      { id: 'UCaEg_BfZewkjNf2D15_H6UQ', name: 'Obzor Time' },
      { id: 'UCUhFaUpnq31m6TNX2VKVSVA', name: 'carwow' },
      { id: 'UCjOl2AUblVmg2rA_cRgZkFg', name: 'Top Gear' }
    ]
  }
];
