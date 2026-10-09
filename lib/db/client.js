// Next.js ilovasi va CLI skriptlari (scripts/*.mjs) uchun umumiy DB ulanishi.
// Bu faylda "server-only" import qilinmaydi, chunki u Node skriptlarida ham ishlatiladi.
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema.js";

export const DEFAULT_DATABASE_URL = "file:./data/app.db";

/**
 * Ulanish parametrlari. Vercel Marketplace'dagi Turso integratsiyasi
 * TURSO_DATABASE_URL / TURSO_AUTH_TOKEN nomlarini qo'shadi — ular ham qabul qilinadi.
 */
export function getDatabaseConfig() {
  const url = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL || DEFAULT_DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

  // Serverless muhitda fayl tizimi doimiy emas: lokal SQLite ma'lumotlarni yo'qotadi.
  if (process.env.VERCEL && url.startsWith("file:")) {
    throw new Error(
      "Vercel'da maʼlumotlar bazasi ulanmagan: Storage → Turso integratsiyasini ulang " +
        "yoki DATABASE_URL va DATABASE_AUTH_TOKEN muhit oʻzgaruvchilarini kiriting.",
    );
  }
  return { url, authToken };
}

export function createDb() {
  const { url, authToken } = getDatabaseConfig();

  if (url.startsWith("file:")) {
    mkdirSync(dirname(url.slice("file:".length)), { recursive: true });
  }

  return drizzle(createClient({ url, authToken }), { schema });
}
