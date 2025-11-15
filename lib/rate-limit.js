import "server-only";
import { createHash } from "node:crypto";
import { eq, lt, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { db, rateLimits } from "@/lib/db";

/** So'rov yuborgan mijozning IP manzili (proksi/CDN orqasida ham). */
export async function getClientIp() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || headerList.get("x-real-ip") || "unknown";
}

function bucketKey(scope, identifier) {
  return `${scope}:${createHash("sha256").update(identifier).digest("hex").slice(0, 32)}`;
}

/**
 * Belgilangan oyna ichida urinishlar sonini cheklaydi. Hisoblagich ma'lumotlar
 * bazasida saqlanadi, shuning uchun bir nechta server instansiyasida ham ishlaydi.
 * @returns {Promise<{ allowed: boolean, retryAfterSec: number }>}
 */
export async function rateLimit(scope, identifier, { limit, windowMs }) {
  const key = bucketKey(scope, identifier);
  const now = Date.now();
  const resetAt = now + windowMs;

  const [row] = await db
    .insert(rateLimits)
    .values({ key, count: 1, resetAt })
    .onConflictDoUpdate({
      target: rateLimits.key,
      set: {
        count: sql`CASE WHEN ${rateLimits.resetAt} <= ${now} THEN 1 ELSE ${rateLimits.count} + 1 END`,
        resetAt: sql`CASE WHEN ${rateLimits.resetAt} <= ${now} THEN ${resetAt} ELSE ${rateLimits.resetAt} END`,
      },
    })
    .returning();

  // Eskirgan yozuvlarni vaqti-vaqti bilan tozalash
  if (Math.random() < 0.05) {
    await db.delete(rateLimits).where(lt(rateLimits.resetAt, now));
  }

  return {
    allowed: row.count <= limit,
    retryAfterSec: Math.max(1, Math.ceil((row.resetAt - now) / 1000)),
  };
}

export async function resetRateLimit(scope, identifier) {
  await db.delete(rateLimits).where(eq(rateLimits.key, bucketKey(scope, identifier)));
}
