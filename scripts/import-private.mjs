// Foydalanish: npm run db:import-private
// private/staff-private.json dagi shaxsiy maydonlarni mavjud bazaga (masalan, Turso) yozadi.
import "./load-env.mjs";
import { closeDb, createDb } from "../lib/db/client.js";
import { importPrivateStaffData, PRIVATE_STAFF_FILE } from "./private-staff.mjs";

const db = createDb();
const updated = await importPrivateStaffData(db);
await closeDb(db);
console.log(updated ? `✓ ${updated} ta xodim yangilandi` : `${PRIVATE_STAFF_FILE} topilmadi yoki mos xodim yoʻq`);
