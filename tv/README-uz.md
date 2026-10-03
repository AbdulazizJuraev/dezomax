# DezoMax — Samsung televizor ilovasi (Tizen)

Ilova kichkina: u ochilganda **dezomax.uz** televizor rejimida yuklanadi. Televizor rejimida sayt pult bilan boshqariladi (`js/tvmode.js`).
Saytdagi har bir o'zgarish televizorda ham darhol ko'rinadi, ilovani qayta o'rnatish shart emas.

## Pult bilan boshqarish

| Tugma | Vazifasi |
|---|---|
| ◀ ▶ ▲ ▼ | kartochkalar va tugmalar orasida yurish |
| OK | ochish yoki bosish |
| Back (↩) | oynani yopish → katta ekrandan chiqish → orqaga |
| Pleyerda ◀ / ▶ | 10 soniya orqaga yoki oldinga |
| Pleyerda OK | pauza yoki davom |
| ⏯ ⏪ ⏩ | pauza, orqaga, oldinga |

Kino boshlanishi bilan pleyer o'zi butun ekranga o'tadi.

Ilovasiz sinash uchun televizor brauzerida **dezomax.uz** ni oching: televizor o'zini Tizen deb tanishtiradi va sayt o'zi televizor rejimiga o'tadi.
Kompyuterda sinash uchun **dezomax.uz/?tv=1** ni oching, televizor rejimini o'chirish uchun **dezomax.uz/?tv=0**.

## Ilovani televizorga o'rnatish (bir marta)

Samsung televizorlar faqat Samsung sertifikati bilan imzolangan ilovani qabul qiladi. Sertifikat sizning Samsung akkauntingiz bilan olinadi. Bu bosqichlarni o'zingiz qilasiz, parol va sertifikat faqat sizning kompyuteringizda qoladi.

### 1. Tizen Studio
1. https://developer.tizen.org/development/tizen-studio/download sahifasidan **Tizen Studio** ni yuklab, o'rnating.
2. **Package Manager** ni oching:
   - **Main SDK** bo'limida eng yangi *Tizen SDK tools*ni o'rnating;
   - **Extension SDK** bo'limida **Samsung Certificate Extension** va **TV Extensions** ni o'rnating.

### 2. Televizorni dasturchi rejimiga o'tkazish
1. Kompyuter va televizor **bitta Wi-Fi tarmog'ida** bo'lsin.
2. Kompyuterning IP manzilini bilib oling. Buyruq satrida `ipconfig` ni yozing va *IPv4 Address* qatoriga qarang, masalan `192.168.1.5`.
3. Televizorda **Apps** (Ilovalar) bo'limini oching va pultda ketma-ket **1 2 3 4 5** ni bosing.
4. Ochilgan oynada **Developer mode → On** ni tanlang, **Host PC IP** ga kompyuter IP manzilini yozing va televizorni o'chirib-yoqing.
5. Televizorning IP manzilini yozib oling: Sozlamalar → Umumiy → Tarmoq → Tarmoq holati.

### 3. Sertifikat (Samsung akkaunti bilan)
1. Tizen Studio → **Tools → Certificate Manager** → **+**.
2. **Samsung** turini tanlang, keyin **TV** ni tanlang.
3. Samsung akkauntingiz bilan kiring. Parolni faqat o'sha oynaga yozasiz.
4. *Distributor* sertifikatini yaratishda televizorning **DUID** raqami so'raladi. Televizor 2-qadamda tarmoqqa ulangan bo'lsa, u ro'yxatda o'zi chiqadi.
5. Profilga nom bering, masalan `dezomax`.

### 4. Ilovani yig'ish va o'rnatish
Buyruq satrida (`C:\tizen-studio\tools` va `C:\tizen-studio\tools\ide\bin` PATH ga qo'shilgan bo'lsin):

```
cd "C:\Users\Abdulazzi\Desktop\Kino Sayt\tv"
sdb connect 192.168.1.20
tizen package -t wgt -s dezomax -- .
tizen install -n DezoMax.wgt -t <televizor nomi>
```

- `192.168.1.20` o'rniga televizoringizning IP manzilini yozing.
- `<televizor nomi>` ni `sdb devices` buyrug'i ko'rsatadi.

Shundan keyin televizordagi **Apps** bo'limida **DezoMax** paydo bo'ladi.

## Samsung TV do'koniga chiqarish (keyinroq)
Barcha televizorlarda paydo bo'lishi uchun ilova **Samsung Apps TV Seller Office** (https://seller.samsungapps.com/tv) orqali yuboriladi. Samsung uni tekshiradi, bu bir necha hafta davom etadi.

Do'kon uchun quyidagilar kerak:
- 512×423 ikonka;
- skrinshotlar;
- maxfiylik siyosati sahifasi (privacy.html);
- kontentga huquq: do'konga faqat huquqi bor kinolar bilan chiqiladi.
