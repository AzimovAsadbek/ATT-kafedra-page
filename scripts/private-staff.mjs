// Xodimlarning shaxsiy maydonlarini (telefon, tug'ilgan yil, stavka, faoliyat turi)
// git'ga kirmaydigan private/staff-private.json faylidan bazaga yozadi (slug bo'yicha).
import { existsSync, readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { staff } from "../lib/db/schema.js";

export const PRIVATE_STAFF_FILE = "private/staff-private.json";
const FIELDS = ["phone", "birthYear", "rate", "employmentType"];

export async function importPrivateStaffData(db) {
  if (!existsSync(PRIVATE_STAFF_FILE)) return 0;

  const rows = JSON.parse(readFileSync(PRIVATE_STAFF_FILE, "utf8"));
  let updated = 0;
  for (const { slug, ...values } of rows) {
    const data = Object.fromEntries(FIELDS.filter((field) => field in values).map((field) => [field, values[field]]));
    if (!slug || !Object.keys(data).length) continue;
    const result = await db.update(staff).set(data).where(eq(staff.slug, slug)).returning({ id: staff.id });
    updated += result.length;
  }
  return updated;
}
