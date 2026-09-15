/* ============================================================
   DezoMax — admin.html orqali qo'shilgan / tahrirlangan kinolar
   Bu faylni admin sahifa avtomatik yozadi. Qo'lda tahrirlash shart emas.
   - CUSTOM_MOVIES: yangi kinolar va tahrirlangan mavjud kinolar (id bo'yicha almashtiriladi)
   - HIDDEN_MOVIES: saytdan yashirilgan kinolar id'lari
   ============================================================ */

const CUSTOM_MOVIES = /*DATA*/[
  {
    "id": 40,
    "slug": "avengers-endgame",
    "type": "film",
    "title": {
      "uz": "Qasoskorlar: Final",
      "ru": "Мстители: Финал"
    },
    "genres": [
      "action",
      "drama",
      "scifi",
      "adventure"
    ],
    "country": {
      "uz": "AQSh",
      "ru": "США"
    },
    "cast": [
      "Robert Downey Jr.",
      "Chris Evans",
      "Scarlett Johansson",
      "Mark Ruffalo",
      "Josh Brolin"
    ],
    "desc": {
      "uz": "Tanosning qirg‘inidan omon qolgan qahramonlar yo‘qotilgan hamma narsani qaytarish uchun so‘nggi umidsiz rejani amalga oshiradi.",
      "ru": "Выжившие после щелчка Таноса герои идут на отчаянный шаг, чтобы вернуть всё потерянное."
    },
    "colors": [
      "#2a4a5a",
      "#08131a"
    ],
    "poster": "images/avengers-endgame.jpg",
    "trailer": "https://www.youtube.com/watch?v=Io2dwq7B7xM",
    "video": "https://drive.google.com/file/d/16tKacOI7B6ZIV1R7TgrsxBvg8sndFPHD/view?usp=drivesdk",
    "featured": true,
    "addedAt": 1789461867370,
    "updatedAt": 1789462913078,
    "year": 2019,
    "duration": 181,
    "rating": 8.4,
    "director": "Anthony & Joe Russo",
    "franchise": "marvel",
    "source": {
      "name": "DezoMax",
      "url": ""
    }
  }
]/*END*/;
const HIDDEN_MOVIES = /*HIDDEN*/[]/*ENDHIDDEN*/;

if (typeof MOVIES !== 'undefined') {
  window.BASE_MOVIES = MOVIES.slice();        // admin sahifa asl ro'yxatni ko'rishi uchun
  for (const m of CUSTOM_MOVIES) {
    const i = MOVIES.findIndex(x => x.id === m.id);
    if (i > -1) MOVIES[i] = m; else MOVIES.push(m);
  }
  for (let i = MOVIES.length - 1; i >= 0; i--) {
    if (HIDDEN_MOVIES.includes(MOVIES[i].id)) MOVIES.splice(i, 1);
  }
}
