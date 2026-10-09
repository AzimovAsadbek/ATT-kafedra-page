"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { createItem, deleteItem, getItem, getResource, parseId, updateItem } from "@/lib/data/content";
import { deleteStoredImage, resolveImageField } from "@/lib/media";
import { parseFields } from "@/lib/validation";

const imageFields = (resource) => resource.config.fields.filter((field) => field.type === "image");

function revalidateSite() {
  revalidatePath("/", "layout");
}

async function loadResource(resourceKey) {
  await requireAdmin();
  const resource = getResource(resourceKey);
  if (!resource) throw new Error(`Nomaʼlum boʻlim: ${resourceKey}`);
  return resource;
}

/** Yangi yozuv yaratadi (`id` null bo'lsa) yoki mavjudini yangilaydi. */
export async function saveItem(resourceKey, id, _prevState, formData) {
  const resource = await loadResource(resourceKey);
  const itemId = id === null ? null : parseId(id);
  const existing = itemId ? await getItem(resource, itemId) : null;
  if (id !== null && !existing) return { message: "Yozuv topilmadi yoki oʻchirilgan" };

  const { data, errors, values } = parseFields(formData, resource.config.fields, { emptyAsNull: true });
  for (const field of resource.config.fields.filter((f) => f.type === "relation")) {
    values[field.name] = formData.getAll(field.name).map(Number);
  }
  if (errors) return { errors, values };

  for (const field of imageFields(resource)) {
    const { value, error } = await resolveImageField(formData, field.name, existing?.[field.name]);
    if (error) return { errors: { [field.name]: error }, values };
    data[field.name] = value;
  }

  if (existing) {
    await updateItem(resource, itemId, data, formData);
    for (const field of imageFields(resource)) {
      if (existing[field.name] !== data[field.name]) await deleteStoredImage(existing[field.name]);
    }
  } else {
    await createItem(resource, data, formData);
  }

  revalidateSite();
  redirect(`/admin/${resourceKey}?saved=1`);
}

export async function removeItem(resourceKey, id) {
  const resource = await loadResource(resourceKey);
  const itemId = parseId(id);
  const item = itemId && (await getItem(resource, itemId));
  if (!item) return;

  await deleteItem(resource, itemId);
  for (const field of imageFields(resource)) await deleteStoredImage(item[field.name]);
  revalidateSite();
}

export async function togglePublished(resourceKey, id) {
  const resource = await loadResource(resourceKey);
  const itemId = parseId(id);
  const item = itemId && (await getItem(resource, itemId));
  if (!item) return;

  await updateItem(resource, itemId, { isPublished: !item.isPublished });
  revalidateSite();
}
