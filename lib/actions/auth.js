"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { db, users } from "@/lib/db";
import { getClientIp, rateLimit, resetRateLimit } from "@/lib/rate-limit";

const LOGIN_LIMIT = { limit: 10, windowMs: 15 * 60_000 };

// Mavjud bo'lmagan login uchun ham xeshlash bajariladi — javob vaqti orqali
// loginlar mavjudligini aniqlab bo'lmasligi uchun.
let dummyHash;
const getDummyHash = async () => (dummyHash ??= await hashPassword("timing-safe-dummy-password"));

export async function login(_prevState, formData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Login va parolni kiriting", values: { username } };
  }

  const ip = await getClientIp();
  const limit = await rateLimit("login", ip, LOGIN_LIMIT);
  if (!limit.allowed) {
    return {
      error: `Juda koʻp urinish. ${Math.ceil(limit.retryAfterSec / 60)} daqiqadan soʻng qayta urinib koʻring.`,
      values: { username },
    };
  }

  const [user] = await db
    .select({ id: users.id, passwordHash: users.passwordHash })
    .from(users)
    .where(eq(users.username, username));

  const isValid = await verifyPassword(password, user?.passwordHash ?? (await getDummyHash()));
  if (!user || !isValid) {
    return { error: "Login yoki parol notoʻgʻri", values: { username } };
  }

  await resetRateLimit("login", ip);
  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
