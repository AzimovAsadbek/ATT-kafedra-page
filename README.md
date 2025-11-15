# Axborot tizimlari va texnologiyalari kafedrasi

Namangan davlat texnika universiteti “Axborot tizimlari va texnologiyalari” (ATT) kafedrasining rasmiy sayti va uni boshqarish uchun admin panel.

## Imkoniyatlar

**Sayt**

- Bosh ekran, universitet va kafedra haqida boʻlimlar, taʼlim yoʻnalishlari, professor-oʻqituvchilar, bogʻlanish
- Oʻqituvchilarni lavozim boʻyicha saralash va ism/fan boʻyicha qidirish
- Onlayn murojaat formasi (server tomonda tekshiruv, spam-tuzoq, IP boʻyicha cheklov)
- Mobil qurilmalarga moslashgan dizayn, mobil menyu, faol boʻlimni kuzatuvchi navbar
- SEO: metadata, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`
- Statik generatsiya (ISR): sahifa tez yuklanadi va admin paneldagi har bir oʻzgarishdan soʻng darhol yangilanadi

**Admin panel** (`/admin`)

- Boshqaruv paneli: statistika va soʻnggi murojaatlar
- Oʻqituvchilar, taʼlim yoʻnalishlari, kafedra/universitet kartalari, foydali havolalar — toʻliq CRUD, tartib raqami, saytda koʻrsatish/yashirish
- Rasm yuklash: avtomatik kichraytirish va WebP formatiga oʻtkazish
- Murojaatlar: yangi / oʻqilgan / arxiv, javob yozish, oʻchirish
- Sayt sozlamalari: bosh ekran matni va rasmi, boʻlim matnlari, aloqa maʼlumotlari, xarita, ijtimoiy tarmoqlar
- Parolni almashtirish (boshqa qurilmalardagi sessiyalar avtomatik yopiladi)
- Yangi murojaat haqida Telegram orqali xabar (ixtiyoriy)

## Texnologiyalar

| Qatlam            | Texnologiya                                                   |
| ----------------- | ------------------------------------------------------------- |
| Framework         | Next.js 16 (App Router, Server Components, Server Actions)    |
| UI                | React 19, Tailwind CSS 4, lucide-react, `next/font`           |
| Maʼlumotlar bazasi | SQLite / [Turso](https://turso.tech) (libSQL) + Drizzle ORM   |
| Validatsiya       | Zod                                                           |
| Autentifikatsiya  | JWT (jose) — httpOnly cookie, scrypt parol xeshi              |
| Rasmlar           | sharp (WebP), `next/image`                                    |

## Oʻrnatish

Talab: Node.js 20.12 yoki undan yuqori.

```bash
npm install
cp .env.example .env.local   # qiymatlarni toʻldiring
npm run dev
```

`npm run dev` va `npm run build` avval `npm run db:setup` ni ishga tushiradi: migratsiyalar qoʻllanadi, boʻsh baza boshlangʻich maʼlumotlar bilan toʻldiriladi va birinchi administrator yaratiladi. Agar `ADMIN_PASSWORD` berilmagan boʻlsa, vaqtinchalik parol terminalga chiqariladi — kirgandan soʻng uni `/admin/account` sahifasida almashtiring.

Sayt: <http://localhost:3000>, admin panel: <http://localhost:3000/admin>.

## Muhit oʻzgaruvchilari

| Oʻzgaruvchi                               | Tavsif                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                    | Saytning toʻliq manzili (SEO, sitemap)                                  |
| `DATABASE_URL`                            | `file:./data/app.db` (lokal) yoki `libsql://...` (Turso)               |
| `DATABASE_AUTH_TOKEN`                     | Faqat Turso uchun                                                      |
| `AUTH_SECRET`                             | Sessiyani imzolash kaliti, **productionda majburiy** (≥ 32 belgi)       |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD`        | Birinchi administrator (faqat bazada admin boʻlmaganda ishlatiladi)     |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`  | Ixtiyoriy: yangi murojaatlar haqida Telegram xabarnomasi                |

## Buyruqlar

| Buyruq                                  | Vazifasi                                              |
| --------------------------------------- | ----------------------------------------------------- |
| `npm run dev`                           | Ishlab chiqish serveri                                |
| `npm run build` / `npm start`           | Production build va ishga tushirish                   |
| `npm run lint`                          | ESLint tekshiruvi                                     |
| `npm run db:setup`                      | Migratsiya + boshlangʻich maʼlumotlar (idempotent)     |
| `npm run db:generate`                   | `lib/db/schema.js` oʻzgargach yangi migratsiya yaratish |
| `npm run db:studio`                     | Bazani brauzerda koʻrish (Drizzle Studio)             |
| `npm run admin:create -- <login> [ism]` | Administrator yaratish yoki parolini tiklash          |

## Loyiha tuzilmasi

```
app/
  (site)/            ommaviy sayt (layout + bosh sahifa)
  admin/login/       kirish sahifasi
  admin/(panel)/     himoyalangan admin sahifalari ([resource] — umumiy CRUD)
  media/[id]/        yuklangan rasmlarni berish
components/
  site/  admin/  ui/
lib/
  actions/           Server Actions (murojaat, auth, CRUD, sozlamalar, hisob)
  auth/              sessiya (JWT), parol xeshi
  data/              maʼlumotlarni oʻqish qatlami
  db/                Drizzle sxema, ulanish, boshlangʻich maʼlumotlar
  content-config.js  admin paneldagi kontent turlari va sozlamalar tavsifi
drizzle/             SQL migratsiyalar
scripts/             setup va admin yaratish skriptlari
proxy.js             /admin yoʻllari uchun optimistik auth tekshiruvi
```

Yangi kontent turi qoʻshish uchun `lib/db/schema.js` ga jadval, `lib/content-config.js` dagi `RESOURCES` ga tavsif va `lib/data/content.js` dagi `TABLES` ga havola qoʻshish, soʻng `npm run db:generate` ni ishga tushirish kifoya — admin sahifalari avtomatik paydo boʻladi.

## Deploy

- **Oʻz serveringiz (VPS)**: `npm run build && npm start`. SQLite fayli `data/` papkasida saqlanadi — uni zaxiralab boring.
- **Vercel / Netlify** (serverless): fayl tizimi doimiy emas, shuning uchun [Turso](https://turso.tech) bazasidan foydalaning va `DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `AUTH_SECRET` ni platforma sozlamalarida koʻrsating.
