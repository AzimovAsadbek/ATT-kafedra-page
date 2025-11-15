import "server-only";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { db, users } from "@/lib/db";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySession } from "./jwt";

export async function createSession(userId) {
  const token = await signSession(userId);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Joriy administratorni qaytaradi. Token parol almashtirilgandan oldin berilgan
 * bo'lsa, u bekor hisoblanadi (boshqa qurilmalardagi sessiyalar yopiladi).
 */
export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const payload = await verifySession(cookieStore.get(SESSION_COOKIE)?.value);
  if (!payload) return null;

  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      name: users.name,
      passwordChangedAt: users.passwordChangedAt,
    })
    .from(users)
    .where(eq(users.id, Number(payload.sub)));

  if (!user) return null;
  if (payload.iat < Math.floor(user.passwordChangedAt.getTime() / 1000)) return null;

  return { id: user.id, username: user.username, name: user.name };
});

/** Admin sahifalari va server action'larida majburiy autentifikatsiya tekshiruvi. */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}
