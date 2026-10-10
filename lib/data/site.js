import "server-only";
import { join } from "node:path";
import { and, asc, eq, inArray } from "drizzle-orm";
import { cache } from "react";
import sharp from "sharp";
import { SETTINGS_FIELDS } from "@/lib/content-config";
import { cards, db, links, media, programCoordinators, programs, settings, staff } from "@/lib/db";
import { MEDIA_PREFIX } from "@/lib/media";

const bySortOrder = (table) => [asc(table.sortOrder), asc(table.id)];

// Saytda ko'rsatiladigan maydonlar. Shaxsiy ma'lumotlar (telefon, tug'ilgan yil,
// stavka, faoliyat turi) ommaviy sahifalarga umuman uzatilmaydi.
const STAFF_CARD_FIELDS = {
  id: staff.id,
  slug: staff.slug,
  fullName: staff.fullName,
  position: staff.position,
  departmentRole: staff.departmentRole,
  academicDegree: staff.academicDegree,
  academicTitle: staff.academicTitle,
  specialization: staff.specialization,
  photo: staff.photo,
};

const STAFF_PROFILE_FIELDS = {
  ...STAFF_CARD_FIELDS,
  degreeSpecialty: staff.degreeSpecialty,
  degreeYear: staff.degreeYear,
  titleSpecialty: staff.titleSpecialty,
  titleYear: staff.titleYear,
  researchArea: staff.researchArea,
  achievements: staff.achievements,
  workExperience: staff.workExperience,
  subjects: staff.subjects,
  email: staff.email,
};

/** Rasm kengligi (px): yuklangan rasmlar uchun bazadan, /public fayllari uchun sharp orqali. */
const getPhotoWidth = cache(async (src) => {
  try {
    if (src.startsWith(MEDIA_PREFIX)) {
      const [row] = await db
        .select({ width: media.width })
        .from(media)
        .where(eq(media.id, src.slice(MEDIA_PREFIX.length)));
      return row?.width ?? 0;
    }
    if (src.startsWith("/")) {
      const { width } = await sharp(join(process.cwd(), "public", src)).metadata();
      return width ?? 0;
    }
  } catch {
    // Fayl topilmasa, kenglik 0 deb hisoblanadi.
  }
  return 0;
});

/** Portret komponenti past sifatli rasmlarni cho'zmasligi uchun `photoWidth` qo'shadi. */
async function withPhotoWidths(list) {
  const widths = await Promise.all(list.map((member) => (member.photo ? getPhotoWidth(member.photo) : 0)));
  return list.map((member, i) => ({ ...member, photoWidth: widths[i] }));
}

/** Barcha sozlamalar `{ key: value }` ko'rinishida (yo'q kalitlar bo'sh satr). */
export const getSettings = cache(async () => {
  const rows = await db.select().from(settings);
  const values = Object.fromEntries(SETTINGS_FIELDS.map((field) => [field.name, ""]));
  // Faqat SETTINGS_FIELDS'dagi kalitlar: masalan, Telegram tokeni sahifalarga uzatilmaydi.
  for (const row of rows) if (Object.hasOwn(values, row.key)) values[row.key] = row.value;
  return values;
});

export const getPublishedLinks = cache(() =>
  db
    .select({ id: links.id, title: links.title, url: links.url })
    .from(links)
    .where(eq(links.isPublished, true))
    .orderBy(...bySortOrder(links)),
);

export const getPublishedStaff = cache(async () => {
  const list = await db
    .select(STAFF_CARD_FIELDS)
    .from(staff)
    .where(eq(staff.isPublished, true))
    .orderBy(...bySortOrder(staff));
  return withPhotoWidths(list);
});

function getPublishedCards(section) {
  return db
    .select({ id: cards.id, title: cards.title, description: cards.description, image: cards.image })
    .from(cards)
    .where(and(eq(cards.section, section), eq(cards.isPublished, true)))
    .orderBy(...bySortOrder(cards));
}

/** Yo'nalishlar va ularning saytda ko'rinadigan mas'ul o'qituvchilari. */
export const getPublishedPrograms = cache(async () => {
  const programList = await db
    .select({
      id: programs.id,
      title: programs.title,
      code: programs.code,
      level: programs.level,
      description: programs.description,
    })
    .from(programs)
    .where(eq(programs.isPublished, true))
    .orderBy(...bySortOrder(programs));

  const coordinatorRows = programList.length
    ? await db
        .select({ programId: programCoordinators.programId, slug: staff.slug, fullName: staff.fullName })
        .from(programCoordinators)
        .innerJoin(staff, eq(staff.id, programCoordinators.staffId))
        .where(
          and(
            inArray(
              programCoordinators.programId,
              programList.map((program) => program.id),
            ),
            eq(staff.isPublished, true),
          ),
        )
        .orderBy(asc(programCoordinators.sortOrder))
    : [];

  return programList.map((program) => ({
    ...program,
    coordinators: coordinatorRows.filter((row) => row.programId === program.id),
  }));
});

/** Bosh ekran mozaikasi uchun sifatli (kamida `minWidth` px) portretlarni tanlaydi. */
function pickPortraits(staffList, count, minWidth = 240) {
  return staffList.filter((member) => member.photoWidth >= minWidth).slice(0, count);
}

export async function getHomePageData() {
  const [siteSettings, staffList, programList, universityCards, departmentCards] = await Promise.all([
    getSettings(),
    getPublishedStaff(),
    getPublishedPrograms(),
    getPublishedCards("university"),
    getPublishedCards("department"),
  ]);

  return {
    settings: siteSettings,
    staff: staffList,
    portraits: pickPortraits(staffList, 6),
    programs: programList,
    universityCards,
    departmentCards,
    stats: getStaffStats(staffList, programList),
  };
}

export function getStaffStats(staffList, programList = []) {
  return {
    staff: staffList.length,
    withDegree: staffList.filter((member) => member.academicDegree).length,
    withTitle: staffList.filter((member) => member.academicTitle).length,
    programs: programList.length,
  };
}

/** O'qituvchi profili (faqat saytda ko'rinadigan yozuvlar) va u mas'ul bo'lgan yo'nalishlar. */
export const getStaffProfile = cache(async (slug) => {
  const [member] = await db
    .select(STAFF_PROFILE_FIELDS)
    .from(staff)
    .where(and(eq(staff.slug, slug), eq(staff.isPublished, true)));
  if (!member) return null;

  const [withWidth] = await withPhotoWidths([member]);
  const coordinatedPrograms = await db
    .select({ id: programs.id, code: programs.code, title: programs.title, level: programs.level })
    .from(programCoordinators)
    .innerJoin(programs, eq(programs.id, programCoordinators.programId))
    .where(and(eq(programCoordinators.staffId, member.id), eq(programs.isPublished, true)))
    .orderBy(...bySortOrder(programs));

  return { ...withWidth, programs: coordinatedPrograms };
});

export async function getPublishedStaffSlugs() {
  return db.select({ slug: staff.slug }).from(staff).where(eq(staff.isPublished, true));
}
