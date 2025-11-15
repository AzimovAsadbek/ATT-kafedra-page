import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { cache } from "react";
import { SETTINGS_FIELDS } from "@/lib/content-config";
import { cards, db, links, programs, settings, staff } from "@/lib/db";

const bySortOrder = (table) => [asc(table.sortOrder), asc(table.id)];

/** Barcha sozlamalar `{ key: value }` ko'rinishida (yo'q kalitlar bo'sh satr). */
export const getSettings = cache(async () => {
  const rows = await db.select().from(settings);
  const values = Object.fromEntries(SETTINGS_FIELDS.map((field) => [field.name, ""]));
  for (const row of rows) values[row.key] = row.value;
  return values;
});

export const getPublishedLinks = cache(() =>
  db
    .select({ id: links.id, title: links.title, url: links.url })
    .from(links)
    .where(eq(links.isPublished, true))
    .orderBy(...bySortOrder(links)),
);

function getPublishedCards(section) {
  return db
    .select({ id: cards.id, title: cards.title, description: cards.description, image: cards.image })
    .from(cards)
    .where(and(eq(cards.section, section), eq(cards.isPublished, true)))
    .orderBy(...bySortOrder(cards));
}

export async function getHomePageData() {
  const [siteSettings, staffList, programList, universityCards, departmentCards] = await Promise.all([
    getSettings(),
    db
      // Shaxsiy ma'lumotlar (telefon, tug'ilgan yil, stavka) ommaviy sahifaga uzatilmaydi.
      .select({
        id: staff.id,
        fullName: staff.fullName,
        position: staff.position,
        academicDegree: staff.academicDegree,
        degreeSpecialty: staff.degreeSpecialty,
        academicTitle: staff.academicTitle,
        subjects: staff.subjects,
        email: staff.email,
        photo: staff.photo,
      })
      .from(staff)
      .where(eq(staff.isPublished, true))
      .orderBy(...bySortOrder(staff)),
    db
      .select({
        id: programs.id,
        title: programs.title,
        code: programs.code,
        level: programs.level,
        description: programs.description,
      })
      .from(programs)
      .where(eq(programs.isPublished, true))
      .orderBy(...bySortOrder(programs)),
    getPublishedCards("university"),
    getPublishedCards("department"),
  ]);

  const stats = {
    staff: staffList.length,
    withDegree: staffList.filter((member) => member.academicDegree).length,
    withTitle: staffList.filter((member) => member.academicTitle).length,
    programs: programList.length,
  };

  return { settings: siteSettings, staff: staffList, programs: programList, universityCards, departmentCards, stats };
}
