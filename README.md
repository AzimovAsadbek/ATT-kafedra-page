# Axborot tizimlari va texnologiyalari kafedrasi

Namangan davlat texnika universiteti “Axborot tizimlari va texnologiyalari” (ATT) kafedrasining rasmiy sayti va uni boshqarish uchun admin panel.

## Imkoniyatlar

**Sayt**

- Bosh sahifa: kafedra maqsad va vazifalari, rahbariyat, taʼlim yoʻnalishlari (shifr va masʼul oʻqituvchilar bilan), ilmiy faoliyat, universitet haqida, bogʻlanish
- `/oqituvchilar` — barcha professor-oʻqituvchilar: lavozim boʻyicha saralash va qidiruv
- `/oqituvchilar/<slug>` — har bir oʻqituvchining sahifasi: ilmiy daraja va unvon, mutaxassislik, ilmiy yoʻnalish, ilmiy-oʻquv natijalari, oʻtadigan fanlar, masʼul yoʻnalishlar, mehnat faoliyati
- Shaxsiy maʼlumotlar (telefon, tugʻilgan yil, stavka) faqat admin panelda saqlanadi, saytga uzatilmaydi
- Onlayn murojaat formasi (server tomonda tekshiruv, spam-tuzoq, IP boʻyicha cheklov)
- Mobil qurilmalarga moslashgan dizayn, maksimal kenglik 1440px
- SEO: metadata, Open Graph, JSON-LD (tashkilot va shaxs), `sitemap.xml` (barcha profillar bilan), `robots.txt`
- Statik generatsiya (ISR): sahifalar tez yuklanadi va admin paneldagi har bir oʻzgarishdan soʻng darhol yangilanadi

**Admin panel** (`/admin`)

- Boshqaruv paneli: statistika va soʻnggi murojaatlar
- Oʻqituvchilar (Excel tarkibidagi barcha ustunlar + profil maʼlumotlari), taʼlim yoʻnalishlari (masʼul oʻqituvchilarni belgilash bilan), kafedra faoliyati va universitet bloklari, foydali havolalar — toʻliq CRUD, tartib raqami, saytda koʻrsatish/yashirish
- Rasm yuklash: avtomatik kichraytirish va WebP formatiga oʻtkazish
- Murojaatlar: yangi / oʻqilgan / arxiv, javob yozish, oʻchirish
- Sayt sozlamalari: bosh ekran matni va rasmi, boʻlim matnlari, aloqa maʼlumotlari, xarita, ijtimoiy tarmoqlar
- Parolni almashtirish (boshqa qurilmalardagi sessiyalar avtomatik yopiladi)
- Telegram xabarnomalari: admin → **Telegram xabarnoma** sahifasida bot tokeni va qabul qiluvchi chatlar sozlanadi (chatlarni avtomatik aniqlash, sinov xabari). Har bir yangi murojaat “Admin panelda ochish” tugmasi bilan Telegram'ga keladi

## Texnologiyalar

| Qatlam            | Texnologiya                                                   |
| ----------------- | ------------------------------------------------------------- |
| Framework         | Next.js 16 (App Router, Server Components, Server Actions)    |
| UI                | React 19, Tailwind CSS 4, lucide-react, `next/font` (Source Serif 4 + Source Sans 3) |
| Maʼlumotlar bazasi | PostgreSQL: [Neon](https://neon.tech) (production), Docker (lokal) + Drizzle ORM |
| Validatsiya       | Zod                                                           |
| Autentifikatsiya  | JWT (jose) — httpOnly cookie, scrypt parol xeshi              |
| Rasmlar           | sharp (WebP), `next/image`                                    |

## Oʻrnatish

Talab: Node.js 20.12 yoki undan yuqori.

```bash
npm install
cp .env.example .env.local   # qiymatlarni toʻldiring
npm run db:up                # lokal PostgreSQL (Docker)
npm run dev
```

Lokal PostgreSQL uchun ikki yoʻl bor:

- **Docker** (tavsiya): `npm run db:up` — `docker-compose.yml` dagi PostgreSQL 17 ni ishga tushiradi. `.env.example` dagi `DATABASE_URL` aynan shu bazaga moslangan.
- **Neon**: `.env.local` dagi `DATABASE_URL` ga Neon bazasi (yoki uning alohida dev branch'i) manzilini yozing.

`npm run dev` va `npm run build` avval `npm run db:setup` ni ishga tushiradi: migratsiyalar qoʻllanadi, boʻsh baza boshlangʻich maʼlumotlar bilan toʻldiriladi va birinchi administrator yaratiladi. Agar `ADMIN_PASSWORD` berilmagan boʻlsa, vaqtinchalik parol terminalga chiqariladi — kirgandan soʻng uni `/admin/account` sahifasida almashtiring.

Sayt: <http://localhost:3000>, admin panel: <http://localhost:3000/admin>.

## Maʼlumotlar manbalari

Boshlangʻich maʼlumotlar (`lib/db/seed-data.js`) [namdtu.uz](https://namdtu.uz/uz/departments/axborot-tizimlari-va-texnologiyalari-kafedrasi) rasmiy saytidan olingan: kafedra tarkibi, ism-familiyalar, lavozim, ilmiy daraja va mutaxassislik, emaillar, mehnat faoliyati, ilmiy yoʻnalishlar, rasmlar (`public/images/staff/`), yoʻnalish shifrlari va masʼul oʻqituvchilar, kafedra va universitet maʼlumotlari, NamDTU logotipi.

Xodimlarning shaxsiy maʼlumotlari (telefon, tugʻilgan yil, stavka, faoliyat turi) **repoda saqlanmaydi**. Ular gitga kirmaydigan `private/staff-private.json` faylida turadi va:

- yangi baza yaratilganda (`npm run db:setup`) avtomatik import qilinadi;
- mavjud bazaga (masalan, Neon) `npm run db:import-private` orqali yoziladi.

Fayl formati: `[{ "slug": "...", "phone": "...", "birthYear": 1980, "rate": 1, "employmentType": "Asosiy" }]`.

## Muhit oʻzgaruvchilari

| Oʻzgaruvchi                               | Tavsif                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                    | Saytning toʻliq manzili (SEO, sitemap)                                  |
| `DATABASE_URL`                            | PostgreSQL manzili: Neon (`*.neon.tech` — HTTP drayveri) yoki lokal Docker |
| `AUTH_SECRET`                             | Sessiyani imzolash kaliti, **productionda majburiy** (≥ 32 belgi)       |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD`        | Birinchi administrator (faqat bazada admin boʻlmaganda ishlatiladi)     |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`  | Ixtiyoriy zaxira: odatda Telegram admin paneldan sozlanadi              |

## Buyruqlar

| Buyruq                                  | Vazifasi                                              |
| --------------------------------------- | ----------------------------------------------------- |
| `npm run dev`                           | Ishlab chiqish serveri                                |
| `npm run build` / `npm start`           | Production build va ishga tushirish                   |
| `npm run lint`                          | ESLint tekshiruvi                                     |
| `npm run db:up` / `db:down`             | Lokal PostgreSQL'ni (Docker) ishga tushirish / toʻxtatish |
| `npm run db:setup`                      | Migratsiya + boshlangʻich maʼlumotlar (idempotent)     |
| `npm run db:generate`                   | `lib/db/schema.js` oʻzgargach yangi migratsiya yaratish |
| `npm run db:studio`                     | Bazani brauzerda koʻrish (Drizzle Studio)             |
| `npm run db:import-private`             | Shaxsiy maʼlumotlarni `private/` dan bazaga yozish    |
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

- **Vercel** (<https://att-kafedra.vercel.app>): proyekt GitHub repoga ulangan — `master`ga har bir push avtomatik deploy qilinadi. Maʼlumotlar bazasi Vercel → Storage → **Neon** integratsiyasi orqali ulanadi (`DATABASE_URL` avtomatik qoʻshiladi). Build vaqtida `npm run db:setup` migratsiyalarni (tranzaksiya ichida, `DATABASE_URL_UNPOOLED` orqali) qoʻllaydi va boʻsh bazani toʻldiradi. Shuningdek `AUTH_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL` koʻrsatilishi kerak. Baza ulanmagan boʻlsa, build aniq xabar bilan toʻxtaydi.
- **Oʻz serveringiz (VPS)**: `DATABASE_URL` ni Neon bazasiga yoʻnaltirib, `npm run build && npm start`.
