// Administrator yaratadi yoki mavjud administrator parolini yangilaydi.
// Foydalanish: npm run admin:create -- <login> ["Ism Familiya"]
// Parol ADMIN_PASSWORD muhit o'zgaruvchisidan yoki terminaldan so'raladi.
import "./load-env.mjs";
import { createInterface } from "node:readline/promises";
import { eq } from "drizzle-orm";
import { hashPassword, MIN_PASSWORD_LENGTH } from "../lib/auth/password.js";
import { createDb } from "../lib/db/client.js";
import { users } from "../lib/db/schema.js";

const [username, name = "Administrator"] = process.argv.slice(2);

if (!username) {
  console.error('Foydalanish: npm run admin:create -- <login> ["Ism Familiya"]');
  process.exit(1);
}

async function readPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question("Yangi parol: ");
  rl.close();
  return answer;
}

const password = await readPassword();
if (password.length < MIN_PASSWORD_LENGTH) {
  console.error(`Parol kamida ${MIN_PASSWORD_LENGTH} ta belgidan iborat boʻlishi kerak`);
  process.exit(1);
}

const db = createDb();
const passwordHash = await hashPassword(password);
const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.username, username));

if (existing) {
  await db
    .update(users)
    .set({ passwordHash, passwordChangedAt: new Date() })
    .where(eq(users.id, existing.id));
  console.log(`✓ "${username}" paroli yangilandi`);
} else {
  await db.insert(users).values({ username, name, passwordHash });
  console.log(`✓ "${username}" administratori yaratildi`);
}
