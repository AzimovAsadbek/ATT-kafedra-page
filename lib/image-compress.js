// Brauzerda rasmni yuklashdan oldin kichraytirish. Vercel funksiyalari 4,5 MB dan katta
// so'rovni qabul qilmaydi, telefon rasmlari esa ko'pincha undan katta bo'ladi.
export const MAX_DIMENSION = 1600;
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/**
 * Rasmni eng uzun tomoni MAX_DIMENSION px bo'ladigan qilib kichraytiradi va WebP (qo'llab-
 * quvvatlanmasa — JPEG) formatiga o'tkazadi. EXIF bo'yicha burilish hisobga olinadi.
 * @returns {Promise<File>}
 */
export async function compressImage(file) {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  // Eski Safari WebP kodlay olmaydi — u holda toBlob PNG qaytaradi, JPEG'ga o'tamiz.
  let blob = await canvasToBlob(canvas, "image/webp", 0.86);
  if (!blob || blob.type !== "image/webp") blob = await canvasToBlob(canvas, "image/jpeg", 0.88);
  if (!blob) throw new Error("Rasmni qayta ishlab boʻlmadi");

  const extension = blob.type === "image/webp" ? "webp" : "jpg";
  const baseName = file.name.replace(/\.[^.]+$/, "") || "rasm";
  return new File([blob], `${baseName}.${extension}`, { type: blob.type });
}

export function formatBytes(bytes) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
