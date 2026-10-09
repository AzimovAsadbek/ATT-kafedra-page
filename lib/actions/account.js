"use server";

import { eq } from "drizzle-orm";
import { hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from "@/lib/auth/password";
import { createSession, requireAdmin } from "@/lib/auth/session";
import { db, users } from "@/lib/db";

export async function changePassword(_prevState, formData) {
  const user = await requireAdmin();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const errors = {};
  if (!currentPassword) errors.currentPassword = "Joriy parolni kiriting";
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    errors.newPassword = `Parol kamida ${MIN_PASSWORD_LENGTH} ta belgidan iborat boʻlishi kerak`;
  }
  if (newPassword !== confirmPassword) errors.confirmPassword = "Parollar mos kelmadi";
  if (Object.keys(errors).length) return { status: "error", errors };

  const [record] = await db
    .select({ passwordHash: users.passwordHash })
    .from(users)
    .where(eq(users.id, user.id));

  if (!(await verifyPassword(currentPassword, record.passwordHash))) {
    return { status: "error", errors: { currentPassword: "Joriy parol notoʻgʻri" } };
  }

  await db
    .update(users)
    .set({ passwordHash: await hashPassword(newPassword), passwordChangedAt: new Date() })
    .where(eq(users.id, user.id));

  // Boshqa qurilmalardagi sessiyalar bekor bo'ladi, joriy sessiya yangilanadi.
  await createSession(user.id);
  return { status: "success" };
}
