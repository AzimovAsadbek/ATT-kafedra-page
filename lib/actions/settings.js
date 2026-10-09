"use server";

import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { SETTINGS_FIELDS } from "@/lib/content-config";
import { getSettings } from "@/lib/data/site";
import { db, settings } from "@/lib/db";
import { deleteStoredImage, resolveImageField } from "@/lib/media";
import { parseFields } from "@/lib/validation";

export async function saveSettings(_prevState, formData) {
  await requireAdmin();

  const { data, errors, values } = parseFields(formData, SETTINGS_FIELDS);
  if (errors) return { status: "error", errors, values };

  const current = await getSettings();
  const replacedImages = [];

  for (const field of SETTINGS_FIELDS.filter((f) => f.type === "image")) {
    const { value, error } = await resolveImageField(formData, field.name, current[field.name] || null);
    if (error) return { status: "error", errors: { [field.name]: error }, values };
    data[field.name] = value ?? "";
    if (current[field.name] !== data[field.name]) replacedImages.push(current[field.name]);
  }

  await db
    .insert(settings)
    .values(Object.entries(data).map(([key, value]) => ({ key, value: String(value) })))
    .onConflictDoUpdate({ target: settings.key, set: { value: sql`excluded.value` } });

  await Promise.all(replacedImages.map(deleteStoredImage));
  revalidatePath("/", "layout");

  return { status: "success" };
}
