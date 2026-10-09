import "server-only";
import { and, asc, eq, inArray, ne } from "drizzle-orm";
import { RESOURCES } from "@/lib/content-config";
import { cards, db, links, programCoordinators, programs, staff } from "@/lib/db";
import { slugify, uniqueSlug } from "@/lib/slug";

const TABLES = { staff, programs, cards, links };

/**
 * Ko'pga-ko'p bog'lanishlar. `owner` — formada tahrirlanadigan jadval,
 * `target` — tanlanadigan yozuvlar jadvali.
 */
const RELATIONS = {
  coordinators: {
    table: programCoordinators,
    owner: "programs",
    target: "staff",
    ownerField: "programId",
    targetField: "staffId",
    options: () =>
      db
        .select({ value: staff.id, label: staff.fullName })
        .from(staff)
        .orderBy(asc(staff.sortOrder), asc(staff.id)),
  },
};

const ownerKey = (relation) => relation.table[relation.ownerField];
const targetKey = (relation) => relation.table[relation.targetField];

/**
 * Admin panel uchun umumiy CRUD qatlami. `resourceKey` RESOURCES kalitlaridan biri;
 * `scope` (masalan, kartalar bo'limi) har bir so'rovga avtomatik qo'shiladi.
 */
export function getResource(resourceKey) {
  if (!Object.hasOwn(RESOURCES, resourceKey)) return null;
  const config = RESOURCES[resourceKey];
  return { key: resourceKey, config, table: TABLES[config.table] };
}

const relationFields = (resource) => resource.config.fields.filter((field) => field.type === "relation");

function scopeConditions({ config, table }) {
  return Object.entries(config.scope ?? {}).map(([column, value]) => eq(table[column], value));
}

function byId(resource, id) {
  return and(eq(resource.table.id, id), ...scopeConditions(resource));
}

export function parseId(value) {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export function listItems(resource) {
  const { table } = resource;
  return db
    .select()
    .from(table)
    .where(and(...scopeConditions(resource)))
    .orderBy(asc(table.sortOrder), asc(table.id));
}

export async function getItem(resource, id) {
  const [item] = await db.select().from(resource.table).where(byId(resource, id));
  return item ?? null;
}

/** Yozuvni bog'lanishlari bilan qaytaradi (masalan, `coordinatorIds: [3, 7]`). */
export async function getItemWithRelations(resource, id) {
  const item = await getItem(resource, id);
  if (!item) return null;

  for (const field of relationFields(resource)) {
    const relation = RELATIONS[field.relation];
    const rows = await db
      .select({ id: targetKey(relation) })
      .from(relation.table)
      .where(eq(ownerKey(relation), id))
      .orderBy(asc(relation.table.sortOrder));
    item[field.name] = rows.map((row) => row.id);
  }
  return item;
}

/** Relation maydonlari uchun tanlov variantlarini bazadan to'ldiradi. */
export async function withFieldOptions(fields) {
  return Promise.all(
    fields.map(async (field) =>
      field.type === "relation" ? { ...field, options: await RELATIONS[field.relation].options() } : field,
    ),
  );
}

/** Slug ustuni bor jadvallar uchun noyob slug tayyorlaydi. */
async function withSlug(resource, data, id) {
  const { table, config } = resource;
  if (!table.slug) return data;

  const existing = await db
    .select({ slug: table.slug })
    .from(table)
    .where(id ? ne(table.id, id) : undefined);
  const base = data.slug || slugify(data[config.titleField]);
  return { ...data, slug: uniqueSlug(base, new Set(existing.map((row) => row.slug))) };
}

async function saveRelations(resource, id, formData) {
  for (const field of relationFields(resource)) {
    const relation = RELATIONS[field.relation];
    const targetTable = TABLES[relation.target];
    const requested = [...new Set(formData.getAll(field.name).map(Number))].filter(Number.isSafeInteger);

    // Faqat haqiqatan mavjud yozuvlarni bog'laymiz.
    const valid = requested.length
      ? await db.select({ id: targetTable.id }).from(targetTable).where(inArray(targetTable.id, requested))
      : [];
    const validIds = new Set(valid.map((row) => row.id));

    await db.delete(relation.table).where(eq(ownerKey(relation), id));
    const rows = requested
      .filter((targetId) => validIds.has(targetId))
      .map((targetId, index) => ({ [relation.ownerField]: id, [relation.targetField]: targetId, sortOrder: index }));
    if (rows.length) await db.insert(relation.table).values(rows);
  }
}

export async function createItem(resource, data, formData) {
  const values = await withSlug(resource, { ...data, ...resource.config.scope }, null);
  const [{ id }] = await db.insert(resource.table).values(values).returning({ id: resource.table.id });
  await saveRelations(resource, id, formData);
  return id;
}

export async function updateItem(resource, id, data, formData) {
  // Faqat to'liq forma saqlanganda slug qayta hisoblanadi (masalan, ko'rinishni almashtirishda emas).
  const values = resource.config.titleField in data ? await withSlug(resource, data, id) : data;
  await db.update(resource.table).set(values).where(byId(resource, id));
  if (formData) await saveRelations(resource, id, formData);
}

export async function deleteItem(resource, id) {
  // Bog'lanish jadvallaridagi yozuvlarni ham tozalaymiz (SQLite'da FK cascade o'chiq bo'lishi mumkin).
  for (const relation of Object.values(RELATIONS)) {
    if (relation.owner === resource.config.table) await db.delete(relation.table).where(eq(ownerKey(relation), id));
    if (relation.target === resource.config.table) await db.delete(relation.table).where(eq(targetKey(relation), id));
  }
  await db.delete(resource.table).where(byId(resource, id));
}
