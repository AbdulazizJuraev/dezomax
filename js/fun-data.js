/* ============================================================
   DezoMax — «Siz uchun Qiziqarli» bo'limi (qiziqarli.html, bosh sahifadagi qator). 2026-11-21
   Har bo'lim — YouTube kanallari. Videolar kanalning o'zidan, YouTube pleyerida ko'rsatiladi
   (ko'rishlar, layklar va reklama daromadi kanal egasida). Shortslar chiqmaydi: kanalning faqat uzun videolari
   (UULF… pleylisti) olinadi.
   Ro'yxat: dezomax.uz/_yt/feed?ch=UC…,UC… (cloudflare/site/worker.js — YouTube RSS, 30 daqiqa kesh).
   Kanal qo'shish: { id: 'UC…', name: '…' } — id YouTube kanal sahifasidagi «channel_id».
   ============================================================ */
const FUN_SECTIONS = [
  {
    key: 'gameplay', uz: 'Gameplaylar', ru: 'Геймплеи', c1: '#5B2BD6', c2: '#120634',
    sub: ['O‘zbekcha va dunyo o‘yinlari', 'Прохождения игр'],
    icon: '<rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7.5 10.5v4M5.5 12.5h4"/><circle cx="15.5" cy="11.5" r=".9"/><circle cx="17.8" cy="13.8" r=".9"/>',
    ch: [
      { id: 'UCX9w2U1VGvyjgFdkJWRp5bQ', name: 'UZB GAMING' },
      { id: 'UClm66D_EeAaLXEQapOMt0sQ', name: 'UPG GAMING' },
      { id: 'UCTjLXqpWy0U6RbrSNWokyGw', name: 'Oripov Play' },
      { id: 'UC7eAfUjR9gdIjoaoQaS0W-A', name: 'Shirrako' },
      { id: 'UCdVrPfq-B9N5v01axUoDfLA', name: 'IGN Games' }
    ]
  },
  {
    key: 'animals', uz: 'National Animals', ru: 'Мир животных', c1: '#E0A100', c2: '#2B1A00',
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
    key: 'podcast', uz: 'Podcast', ru: 'Подкасты', c1: '#E8483B', c2: '#2E0806',
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
    key: 'audio', uz: 'Audio Kitoblar', ru: 'Аудиокниги', c1: '#1E9E6A', c2: '#03251A',
    sub: ['Tinglab o‘qing', 'Слушайте книги'],
    icon: '<path d="M3.5 14.5v-2a8.5 8.5 0 0 1 17 0v2"/><rect x="2.5" y="14" width="4.5" height="6.5" rx="1.8"/><rect x="17" y="14" width="4.5" height="6.5" rx="1.8"/>',
    ch: [
      { id: 'UCLyK7lJj1DUkA6SvyGLJHQA', name: 'Audio kitoblar to‘plam' },
      { id: 'UCve_BM48fxEURF9UupLzt5A', name: 'Audio kitob' },
      { id: 'UCQSR5j3gOiX-ahIrA5LFegQ', name: 'Ilmparvar kutubxonasi' },
      { id: 'UC_Hb-L-1OjExhmHUSgbJSwQ', name: 'Nurli Media Kitoblar' }
    ]
  },
  {
    key: 'music', uz: 'Music', ru: 'Музыка', c1: '#2F7BEA', c2: '#06173A',
    sub: ['Yangi o‘zbek qo‘shiqlari', 'Новые узбекские песни'],
    icon: '<path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    ch: [
      { id: 'UCkaUg9b9LplVoJdx1JwwyOg', name: 'NevoMusic' },
      { id: 'UCrwGAQfaJhRapPETC-la2pQ', name: 'Yulduz Usmonova' },
      { id: 'UCBTkFkZUXfuPKisU6kZdn5A', name: 'Ozoda' },
      { id: 'UCh9shDtuxe5Wyp5W4E1715A', name: 'Jaloliddin Ahmadaliyev' },
      { id: 'UC4O88FyMTPqFckXLhvdDeTg', name: 'Ulug‘bek Rahmatullayev' }
    ]
  }
];
