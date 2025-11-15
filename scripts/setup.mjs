// Ma'lumotlar bazasini tayyorlaydi: migratsiyalarni qo'llaydi, bo'sh jadvallarni
// boshlang'ich ma'lumotlar bilan to'ldiradi va birinchi administratorni yaratadi.
// Idempotent: har safar `npm run dev` / `npm run build` dan oldin xavfsiz ishga tushadi.
import "./load-env.mjs";
import { count } from "drizzle-orm";
import { migrate } from "drizzle-orm/libsql/migrator";
import { generatePassword, hashPassword } from "../lib/auth/password.js";
import { createDb } from "../lib/db/client.js";
import { cards, links, programs, settings, staff, users } from "../lib/db/schema.js";
import { seedCards, seedLinks, seedPrograms, seedSettings, seedStaff } from "../lib/db/seed-data.js";

const db = createDb();

async function isEmpty(table) {
  const [{ total }] = await db.select({ total: count() }).from(table);
  return total === 0;
}

async function seedTable(table, rows, name) {
  if (!(await isEmpty(table))) return;
  await db.insert(table).values(rows);
  console.log(`  ✓ ${name}: ${rows.length} ta yozuv qoʻshildi`);
}

async function ensureAdmin() {
  if (!(await isEmpty(users))) return;

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || generatePassword();

  await db.insert(users).values({
    username,
    name: "Administrator",
    passwordHash: await hashPassword(password),
  });

  console.log(`  ✓ Administrator yaratildi: ${username}`);
  if (!process.env.ADMIN_PASSWORD) {
    console.log(`  ! Vaqtinchalik parol: ${password}`);
    console.log("    Kirgandan soʻng /admin/account sahifasida parolni almashtiring.");
  }
}

await migrate(db, { migrationsFolder: "./drizzle" });

await db
  .insert(settings)
  .values(Object.entries(seedSettings).map(([key, value]) => ({ key, value })))
  .onConflictDoNothing();

await seedTable(staff, seedStaff, "Oʻqituvchilar");
await seedTable(programs, seedPrograms, "Taʼlim yoʻnalishlari");
await seedTable(cards, seedCards, "Kartalar");
await seedTable(links, seedLinks, "Havolalar");
await ensureAdmin();

console.log("✓ Maʼlumotlar bazasi tayyor");
