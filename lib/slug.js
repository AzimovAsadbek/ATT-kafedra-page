// O'zbekcha ism-familiyadan URL uchun slug: "Erkaboyev Ulugʻbek" → "erkaboyev-ulugbek".
const APOSTROPHES = /[ʻʼ'‘’`´]/g;

export function slugify(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(APOSTROPHES, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** `taken` to'plamida bo'lmagan noyob slug qaytaradi (kerak bo'lsa -2, -3 qo'shadi). */
export function uniqueSlug(base, taken) {
  const root = base || "xodim";
  let slug = root;
  for (let n = 2; taken.has(slug); n += 1) slug = `${root}-${n}`;
  return slug;
}
