import {
  bigint,
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const id = () => integer("id").primaryKey().generatedAlwaysAsIdentity();
const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();

const timestamps = () => ({
  createdAt: createdAt(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

const ordering = () => ({
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
});

export const users = pgTable("users", {
  id: id(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  passwordChangedAt: timestamp("password_changed_at", { withTimezone: true }).notNull().defaultNow(),
  ...timestamps(),
});

export const staff = pgTable(
  "staff",
  {
    id: id(),
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
    ...ordering(),
    ...timestamps(),
  },
  (t) => [index("staff_order_idx").on(t.isPublished, t.sortOrder)],
);

export const programs = pgTable(
  "programs",
  {
    id: id(),
    title: text("title").notNull(),
    code: text("code"),
    level: text("level").notNull(),
    description: text("description"),
    ...ordering(),
    ...timestamps(),
  },
  (t) => [index("programs_order_idx").on(t.isPublished, t.sortOrder)],
);

/** Ta'lim yo'nalishlari bo'yicha mas'ul o'qituvchilar (ko'pga-ko'p bog'lanish). */
export const programCoordinators = pgTable(
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

/** "Faoliyat" va "Universitet" bo'limlaridagi bloklar. */
export const cards = pgTable(
  "cards",
  {
    id: id(),
    section: text("section", { enum: ["university", "department"] }).notNull(),
    title: text("title").notNull(),
    description: text("description"),
    image: text("image"),
    ...ordering(),
    ...timestamps(),
  },
  (t) => [index("cards_section_idx").on(t.section, t.isPublished, t.sortOrder)],
);

export const links = pgTable("links", {
  id: id(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  ...ordering(),
  ...timestamps(),
});

export const messages = pgTable(
  "messages",
  {
    id: id(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    subject: text("subject").notNull(),
    body: text("body").notNull(),
    status: text("status", { enum: ["new", "read", "archived"] })
      .notNull()
      .default("new"),
    createdAt: createdAt(),
  },
  (t) => [index("messages_status_idx").on(t.status, t.createdAt)],
);

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
});

/** Admin paneldan yuklangan rasmlar (WebP). `data` — base64 (har qanday Postgres drayverida bir xil ishlaydi). */
export const media = pgTable("media", {
  id: text("id").primaryKey(),
  mimeType: text("mime_type").notNull(),
  data: text("data").notNull(),
  width: integer("width"),
  height: integer("height"),
  size: integer("size").notNull(),
  createdAt: createdAt(),
});

export const rateLimits = pgTable("rate_limits", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  resetAt: bigint("reset_at", { mode: "number" }).notNull(),
});
