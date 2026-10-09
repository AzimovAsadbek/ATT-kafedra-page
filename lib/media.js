import "server-only";
import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import sharp from "sharp";
import { db, media } from "@/lib/db";

export const MEDIA_PREFIX = "/media/";
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const MAX_DIMENSION = 1600;
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

export const isUploadedFile = (value) => value instanceof File && value.size > 0;

export function validateImageFile(file) {
  if (!ACCEPTED_TYPES.has(file.type)) return "Faqat JPG, PNG, WEBP, AVIF yoki GIF rasm yuklang";
  if (file.size > MAX_UPLOAD_BYTES) return "Rasm hajmi 5 MB dan oshmasligi kerak";
  return null;
}

/**
 * Rasmni o'lchamini kichraytirib, WebP formatiga o'tkazadi va bazaga saqlaydi.
 * @returns {Promise<string>} rasmning ommaviy manzili (/media/<id>)
 */
export async function storeImage(file) {
  const input = Buffer.from(await file.arrayBuffer());
  const { data, info } = await sharp(input, { limitInputPixels: 50_000_000 })
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer({ resolveWithObject: true });

  const id = randomBytes(12).toString("base64url");
  await db.insert(media).values({
    id,
    mimeType: "image/webp",
    data: data.toString("base64"),
    width: info.width,
    height: info.height,
    size: info.size,
  });
  return `${MEDIA_PREFIX}${id}`;
}

/** Bazada saqlangan rasmni o'chiradi (tashqi URL va /images/ fayllariga tegmaydi). */
export async function deleteStoredImage(src) {
  if (!src?.startsWith(MEDIA_PREFIX)) return;
  await db.delete(media).where(eq(media.id, src.slice(MEDIA_PREFIX.length)));
}

/**
 * Formadagi rasm maydonini qayta ishlaydi: yangi fayl yuklangan bo'lsa saqlaydi,
 * "o'chirish" belgilangan bo'lsa null qaytaradi, aks holda joriy qiymatni saqlab qoladi.
 * @returns {Promise<{ value: string | null, error?: string }>}
 */
export async function resolveImageField(formData, name, currentValue) {
  const file = formData.get(`${name}__file`);

  if (isUploadedFile(file)) {
    const error = validateImageFile(file);
    if (error) return { value: currentValue, error };
    try {
      return { value: await storeImage(file) };
    } catch {
      return { value: currentValue, error: "Rasm faylini oʻqib boʻlmadi" };
    }
  }

  if (formData.get(`${name}__remove`) === "on") return { value: null };
  return { value: currentValue ?? null };
}
