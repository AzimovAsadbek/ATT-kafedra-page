// Next.js ilovasi va CLI skriptlari (scripts/*.mjs) uchun umumiy DB ulanishi.
// Bu faylda "server-only" import qilinmaydi, chunki u Node skriptlarida ham ishlatiladi.
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema.js";

export const DEFAULT_DATABASE_URL = "file:./data/app.db";

export function createDb() {
  const url = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;

  if (url.startsWith("file:")) {
    mkdirSync(dirname(url.slice("file:".length)), { recursive: true });
  }

  const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });
  return drizzle(client, { schema });
}
