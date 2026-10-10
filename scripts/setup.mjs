// Ma'lumotlar bazasini tayyorlaydi: migratsiyalarni qo'llaydi, bo'sh jadvallarni
// boshlang'ich ma'lumotlar bilan to'ldiradi va birinchi administratorni yaratadi.
// Idempotent: har safar `npm run dev` / `npm run build` dan oldin xavfsiz ishga tushadi.
import "./load-env.mjs";
import { count } from "drizzle-orm";
import { generatePassword, hashPassword } from "../lib/auth/password.js";
import { closeDb, createDb, migrateDb } from "../lib/db/client.js";
import { cards, links, programCoordinators, programs, settings, staff, users } from "../lib/db/schema.js";
import { seedCards, seedLinks, seedPrograms, seedSettings, seedStaff } from "../lib/db/seed-data.js";
import { importPrivateStaffData } from "./private-staff.mjs";

const db = createDb();

async function isEmpty(table) {
  const [{ total }] = await db.select({ total: count() }).from(table);
  return total === 0;
}

/** @returns {Promise<boolean>} jadval hozirgina to'ldirilgan bo'lsa true */
async function seedTable(table, rows, name) {
  if (!(await isEmpty(table))) return false;
  await db.insert(table).values(rows);
  console.log(`  ✓ ${name}: ${rows.length} ta yozuv qoʻshildi`);
  return true;
}

async function seedProgramsWithCoordinators() {
  if (!(await isEmpty(programs))) return;

  const members = await db.select({ id: staff.id, fullName: staff.fullName }).from(staff);
  const findStaff = (surname) => members.find((member) => member.fullName.startsWith(`${surname} `));

  for (const { coordinators, ...program } of seedPrograms) {
    const [{ id }] = await db.insert(programs).values(program).returning({ id: programs.id });
    const rows = coordinators
      .map(findStaff)
      .filter(Boolean)
      .map((member, sortOrder) => ({ programId: id, staffId: member.id, sortOrder }));
    if (rows.length) await db.insert(programCoordinators).values(rows);
  }
  console.log(`  ✓ Taʼlim yoʻnalishlari: ${seedPrograms.length} ta yozuv qoʻshildi`);
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

await migrateDb();

await db
  .insert(settings)
  .values(Object.entries(seedSettings).map(([key, value]) => ({ key, value })))
  .onConflictDoNothing();

if (await seedTable(staff, seedStaff, "Oʻqituvchilar")) {
  const updated = await importPrivateStaffData(db);
  if (updated) console.log(`  ✓ ${updated} ta xodimning shaxsiy maʼlumotlari import qilindi`);
}
await seedProgramsWithCoordinators();
await seedTable(cards, seedCards, "Kartalar");
await seedTable(links, seedLinks, "Havolalar");
await ensureAdmin();

await closeDb(db);
console.log("✓ Maʼlumotlar bazasi tayyor");
