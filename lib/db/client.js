// Next.js ilovasi va CLI skriptlari (scripts/*.mjs) uchun umumiy PostgreSQL ulanishi.
// Bu faylda "server-only" import qilinmaydi, chunki u Node skriptlarida ham ishlatiladi.
//
// - Neon manzili (*.neon.tech) — serverless HTTP drayveri (Vercel uchun eng mos);
// - boshqa har qanday Postgres (masalan, `npm run db:up` dagi lokal Docker) — oddiy TCP drayveri.
import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { migrate as migratePostgres } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "./schema.js";

const MIGRATIONS_FOLDER = "./drizzle";

/** Vercel'ning Neon integratsiyasi DATABASE_URL (va POSTGRES_URL) qo'shadi. */
export function getDatabaseUrl() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    throw new Error(
      process.env.VERCEL
        ? "Vercel'da maʼlumotlar bazasi ulanmagan: Storage → Neon integratsiyasini ulang yoki DATABASE_URL kiriting."
        : "DATABASE_URL koʻrsatilmagan. Lokal Postgres uchun `npm run db:up` ni ishga tushiring va .env.example dagi " +
            "DATABASE_URL ni .env.local ga yozing (yoki Neon bazasi manzilini kiriting).",
    );
  }
  return url;
}

const isNeonUrl = (url) => new URL(url).hostname.endsWith(".neon.tech");

export function createDb() {
  const url = getDatabaseUrl();
  if (isNeonUrl(url)) return drizzleNeon({ client: neon(url), schema });
  return drizzlePostgres({ client: postgres(url, { max: 5, onnotice: () => {} }), schema });
}

/** CLI skriptlari oxirida: TCP ulanishlarini yopadi (aks holda Node jarayoni tugamaydi). */
export async function closeDb(db) {
  await db.$client.end?.();
}

/**
 * Migratsiyalarni tranzaksiya ichida qo'llaydi. Neon HTTP drayveri tranzaksiyani qo'llamaydi
 * (uzilishda jadvallar qisman yaratilib qoladi), shuning uchun migratsiya har doim alohida TCP
 * ulanish orqali bajariladi — Neon'da pooler'siz manzil (DATABASE_URL_UNPOOLED) afzal.
 */
export async function migrateDb() {
  const url = process.env.DATABASE_URL_UNPOOLED || getDatabaseUrl();
  const client = postgres(url, { max: 1, onnotice: () => {} });
  try {
    await migratePostgres(drizzlePostgres({ client }), { migrationsFolder: MIGRATIONS_FOLDER });
  } finally {
    await client.end();
  }
}
