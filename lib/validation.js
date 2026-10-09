import "server-only";
import * as z from "zod";

const REQUIRED = "Ushbu maydonni toʻldiring";
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const DEFAULT_MAX_LENGTH = { textarea: 5000, url: 2048 };

const isEmail = (value) => z.email().safeParse(value).success;
const isHttpUrl = (value) => /^https?:\/\//i.test(value) && URL.canParse(value);

function stringSchema(field) {
  const max = field.maxLength ?? DEFAULT_MAX_LENGTH[field.type] ?? 255;
  let schema = z.string().trim().max(max, `Koʻpi bilan ${max} ta belgi kiriting`);
  if (field.required) schema = schema.min(1, REQUIRED);
  if (field.minLength) {
    schema = schema.refine(
      (v) => !v || v.length >= field.minLength,
      `Kamida ${field.minLength} ta belgi kiriting`,
    );
  }

  if (field.type === "email") {
    schema = schema.refine((v) => !v || isEmail(v), "Email manzil notoʻgʻri");
  }
  if (field.pattern === "slug") {
    schema = schema.refine(
      (v) => !v || SLUG_RE.test(v),
      "Faqat kichik lotin harflari, raqamlar va chiziqcha (-) ishlating",
    );
  }
  if (field.type === "tel") {
    schema = schema.refine((v) => !v || PHONE_RE.test(v), "Telefon raqam notoʻgʻri");
  }
  if (field.type === "url") {
    schema = schema.refine((v) => !v || isHttpUrl(v), "Havola http:// yoki https:// bilan boshlanishi kerak");
    if (field.allowedPrefix) {
      schema = schema.refine(
        (v) => !v || v.startsWith(field.allowedPrefix),
        `Havola ${field.allowedPrefix} bilan boshlanishi kerak`,
      );
    }
  }
  return schema;
}

function numberSchema(field) {
  const min = field.min ?? -1e6;
  const max = field.max ?? 1e6;
  let number = z.coerce
    .number({ message: "Raqam kiriting" })
    .min(min, `Qiymat ${min} dan kichik boʻlmasin`)
    .max(max, `Qiymat ${max} dan katta boʻlmasin`);
  if (!field.step || Number.isInteger(field.step)) number = number.int("Butun son kiriting");

  return z.string().transform((value, ctx) => {
    // Bo'sh qiymat: standart qiymat, u ham bo'lmasa null (majburiy maydonda — xato).
    if (value === "") {
      const fallback = field.default ?? null;
      if (fallback === null && field.required) {
        ctx.addIssue({ code: "custom", message: REQUIRED });
        return z.NEVER;
      }
      return fallback;
    }
    const result = number.safeParse(value.replace(",", "."));
    if (!result.success) {
      ctx.addIssue({ code: "custom", message: result.error.issues[0].message });
      return z.NEVER;
    }
    return result.data;
  });
}

function fieldSchema(field) {
  switch (field.type) {
    case "number":
      return numberSchema(field);
    case "checkbox":
      return z.boolean();
    case "select": {
      const option = z.enum(field.options, { message: "Roʻyxatdan tanlang" });
      return field.required ? option : z.union([z.literal(""), option], { message: "Roʻyxatdan tanlang" });
    }
    default:
      return stringSchema(field);
  }
}

function readField(formData, field) {
  if (field.type === "checkbox") return formData.get(field.name) === "on";
  const value = formData.get(field.name);
  return typeof value === "string" ? value.trim() : "";
}

// Bu turlar alohida qayta ishlanadi: rasm — lib/media.js, relation — lib/data/content.js.
const NON_COLUMN_TYPES = new Set(["image", "relation"]);

/**
 * FormData'ni maydonlar tavsifi (lib/content-config.js) asosida tekshiradi.
 *
 * @param {{ emptyAsNull?: boolean }} options bo'sh satrlarni null'ga aylantirish
 * @returns {{ data: object, errors: null, values: object } | { data: null, errors: Record<string,string>, values: object }}
 */
export function parseFields(formData, fields, { emptyAsNull = false } = {}) {
  const plainFields = fields.filter((field) => !NON_COLUMN_TYPES.has(field.type));
  const values = Object.fromEntries(plainFields.map((field) => [field.name, readField(formData, field)]));
  const schema = z.object(Object.fromEntries(plainFields.map((field) => [field.name, fieldSchema(field)])));
  const result = schema.safeParse(values);

  if (!result.success) {
    const errors = {};
    for (const issue of result.error.issues) {
      const name = issue.path[0];
      errors[name] ??= issue.message;
    }
    return { data: null, errors, values };
  }

  const data = emptyAsNull
    ? Object.fromEntries(Object.entries(result.data).map(([key, value]) => [key, value === "" ? null : value]))
    : result.data;

  return { data, errors: null, values };
}
