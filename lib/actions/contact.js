"use server";

import { after } from "next/server";
import { db, messages } from "@/lib/db";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { notifyNewMessage } from "@/lib/telegram";
import { parseFields } from "@/lib/validation";

const CONTACT_FIELDS = [
  { name: "name", type: "text", required: true, minLength: 2, maxLength: 100 },
  { name: "email", type: "email", required: true },
  { name: "phone", type: "tel" },
  { name: "subject", type: "text", required: true, minLength: 3, maxLength: 150 },
  { name: "body", type: "textarea", required: true, minLength: 10, maxLength: 3000 },
];

const SUBMISSION_ID_RE = /^[\w-]{8,80}$/;

export async function submitContact(prevState, formData) {
  const sent = prevState?.sent ?? 0;
  const success = { status: "success", sent: sent + 1 };

  // Spam-botlar uchun yashirin maydon: to'ldirilgan bo'lsa, jimgina "muvaffaqiyat".
  if (formData.get("website")) return success;

  const { data, errors, values } = parseFields(formData, CONTACT_FIELDS, { emptyAsNull: true });
  if (errors) return { status: "error", errors, values, sent };

  const limit = await rateLimit("contact", await getClientIp(), { limit: 5, windowMs: 10 * 60_000 });
  if (!limit.allowed) {
    return {
      status: "error",
      message: `Juda koʻp murojaat yuborildi. ${Math.ceil(limit.retryAfterSec / 60)} daqiqadan soʻng qayta urinib koʻring.`,
      values,
      sent,
    };
  }

  // Bir xil yuborish ID'si bilan kelgan takroriy so'rov (ikki marta bosish, qayta urinish)
  // saqlanmaydi va Telegram'ga qayta yuborilmaydi.
  const rawId = String(formData.get("submissionId") ?? "");
  const submissionId = SUBMISSION_ID_RE.test(rawId) ? rawId : null;
  const [saved] = await db
    .insert(messages)
    .values({ ...data, submissionId })
    .onConflictDoNothing({ target: messages.submissionId })
    .returning({ id: messages.id });

  // Javobni kutib turmasdan, fon rejimida Telegram'ga xabar beriladi.
  if (saved) after(() => notifyNewMessage({ ...data, id: saved.id }));

  return success;
}
