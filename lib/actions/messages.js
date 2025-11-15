"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { parseId } from "@/lib/data/content";
import { db, messages } from "@/lib/db";

const STATUSES = new Set(["new", "read", "archived"]);

export async function setMessageStatus(id, status) {
  await requireAdmin();
  const messageId = parseId(id);
  if (!messageId || !STATUSES.has(status)) return;

  await db.update(messages).set({ status }).where(eq(messages.id, messageId));
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(id) {
  await requireAdmin();
  const messageId = parseId(id);
  if (!messageId) return;

  await db.delete(messages).where(eq(messages.id, messageId));
  revalidatePath("/admin", "layout");
}
