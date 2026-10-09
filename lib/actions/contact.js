"use server";

import { after } from "next/server";
import { db, messages } from "@/lib/db";
import { notifyNewMessage } from "@/lib/notify";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { parseFields } from "@/lib/validation";

const CONTACT_FIELDS = [
  { name: "name", type: "text", required: true, minLength: 2, maxLength: 100 },
  { name: "email", type: "email", required: true },
  { name: "phone", type: "tel" },
  { name: "subject", type: "text", required: true, minLength: 3, maxLength: 150 },
  { name: "body", type: "textarea", required: true, minLength: 10, maxLength: 3000 },
];

export async function submitContact(_prevState, formData) {
  // Spam-botlar uchun yashirin maydon: to'ldirilgan bo'lsa, jimgina "muvaffaqiyat".
  if (formData.get("website")) return { status: "success" };

  const { data, errors, values } = parseFields(formData, CONTACT_FIELDS, { emptyAsNull: true });
  if (errors) return { status: "error", errors, values };

  const limit = await rateLimit("contact", await getClientIp(), { limit: 5, windowMs: 10 * 60_000 });
  if (!limit.allowed) {
    return {
      status: "error",
      message: `Juda koʻp murojaat yuborildi. ${Math.ceil(limit.retryAfterSec / 60)} daqiqadan soʻng qayta urinib koʻring.`,
      values,
    };
  }

  await db.insert(messages).values(data);
  after(() => notifyNewMessage(data));

  return { status: "success" };
}
