# DezoMax — Android ilova

Sayt (loyiha ildizidagi fayllar) [Capacitor](https://capacitorjs.com) yordamida Android
ilovasiga o'raladi. Sayt kodi o'zgarmaydi: `scripts/copy-web.js` uni `www/` ga nusxalaydi
va faqat ilovada ishlaydigan `native/app-native.js` ni ulaydi (orqaga tugmasi,
video katta ekranda gorizontal holat, tashqi havolalar).

## Kerakli dasturlar

- Node.js
- Android Studio (Java va Android SDK u bilan keladi)

## APK yig'ish

```bash
cd mobile
npm install          # faqat birinchi marta
npm run apk:release  # imzolangan APK
```

Tayyor fayl: `android/app/build/outputs/apk/release/app-release.apk`

Sinov uchun imzosiz variant: `npm run apk:debug`.

## Saytni yangilagandan keyin

Ilova saytning **nusxasini** o'z ichida olib yuradi. Saytdagi o'zgarish ilovaga
o'zi tushmaydi: APK'ni qayta yig'ib, foydalanuvchilarga yangisini tarqatish kerak.
Har safar `android/app/build.gradle` dagi `versionCode` ni 1 ga oshiring
(`versionName` — ko'rinadigan versiya, masalan "1.1"), aks holda telefon eski
ilova ustiga o'rnatmaydi.

## ⚠️ Imzo kaliti

`android/dezomax-release.jks` va `android/keystore.properties` — ilovaning imzo kaliti
va paroli. Ular `.gitignore` da, GitHub'ga yuklanmaydi.

**Ikkalasining ham zaxira nusxasini xavfsiz joyda saqlang** (fleshka, parolli arxiv).
Kalit yo'qolsa, telefonlarga o'rnatilgan ilovani yangilab bo'lmaydi — foydalanuvchilar
eskisini o'chirib, yangisini qayta o'rnatishga majbur bo'ladi. Google Play'ga
chiqarsangiz ham shu kalit kerak bo'ladi.

## Ikonka va ochilish ekrani

`scripts/make-icons.js` saytdagi logotipdan `assets/` ga rasmlar yasaydi, keyin:

```bash
npx @capacitor/assets generate --android --iconBackgroundColor "#ff2e4c" --splashBackgroundColor "#07080c" --splashBackgroundColorDark "#07080c"
```

## Texnik eslatmalar

- Android Studio ichidagi Java 25 ni Gradle 8.x tanimaydi, shuning uchun wrapper
  Gradle 9.1.0 ga ko'tarilgan.
- `scripts/gradle.js` Java uchun oddiy vaqtinchalik papka (`.tmp/`) beradi — aks holda
  Windows'da "Unable to establish loopback connection" xatosi chiqadi.
