import { sql } from "drizzle-orm";
import { blob, index, integer, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

const createdAt = integer("created_at", { mode: "timestamp" })
  .notNull()
  .default(sql`(unixepoch())`);

const timestamps = {
  createdAt,
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date()),
};

const ordering = {
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),
};

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  passwordChangedAt: integer("password_changed_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  ...timestamps,
});

export const staff = sqliteTable(
  "staff",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    fullName: text("full_name").notNull(),
    position: text("position").notNull(),
    departmentRole: text("department_role"),
    employmentType: text("employment_type").notNull().default("Asosiy"),
    rate: real("rate").notNull().default(1),
    birthYear: integer("birth_year"),
    academicDegree: text("academic_degree"),
    degreeSpecialty: text("degree_specialty"),
    degreeYear: integer("degree_year"),
    academicTitle: text("academic_title"),
    titleSpecialty: text("title_specialty"),
    titleYear: integer("title_year"),
    specialization: text("specialization"),
    researchArea: text("research_area"),
    achievements: text("achievements"),
    workExperience: text("work_experience"),
    subjects: text("subjects"),
    email: text("email"),
    phone: text("phone"),
    photo: text("photo"),
    ...ordering,
    ...timestamps,
  },
  (t) => [index("staff_order_idx").on(t.isPublished, t.sortOrder)],
);

export const programs = sqliteTable(
  "programs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    code: text("code"),
    level: text("level").notNull(),
    description: text("description"),
    ...ordering,
    ...timestamps,
  },
  (t) => [index("programs_order_idx").on(t.isPublished, t.sortOrder)],
);

/** Ta'lim yo'nalishlari bo'yicha mas'ul o'qituvchilar (ko'pga-ko'p bog'lanish). */
export const programCoordinators = sqliteTable(
  "program_coordinators",
  {
    programId: integer("program_id")
      .notNull()
      .references(() => programs.id, { onDelete: "cascade" }),
    staffId: integer("staff_id")
      .notNull()
      .references(() => staff.id, { onDelete: "cascade" }),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.programId, t.staffId] }), index("program_coordinators_staff_idx").on(t.staffId)],
);

/** "Universitet haqida" va "Kafedra haqida" bo'limlaridagi kartalar. */
export const cards = sqliteTable(
  "cards",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    section: text("section", { enum: ["university", "department"] }).notNull(),
    title: text("title").notNull(),
    description: text("description"),
    image: text("image"),
    ...ordering,
    ...timestamps,
  },
  (t) => [index("cards_section_idx").on(t.section, t.isPublished, t.sortOrder)],
);

export const links = sqliteTable("links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  ...ordering,
  ...timestamps,
});

export const messages = sqliteTable(
  "messages",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    subject: text("subject").notNull(),
    body: text("body").notNull(),
    status: text("status", { enum: ["new", "read", "archived"] })
      .notNull()
      .default("new"),
    createdAt,
  },
  (t) => [index("messages_status_idx").on(t.status, t.createdAt)],
);

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
});

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  mimeType: text("mime_type").notNull(),
  data: blob("data", { mode: "buffer" }).notNull(),
  width: integer("width"),
  height: integer("height"),
  size: integer("size").notNull(),
  createdAt,
});

export const rateLimits = sqliteTable("rate_limits", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  resetAt: integer("reset_at").notNull(),
});
