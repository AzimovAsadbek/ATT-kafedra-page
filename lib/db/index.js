import "server-only";
import { createDb } from "./client.js";

// Dev rejimida HMR har safar yangi ulanish ochmasligi uchun global keshlaymiz.
const globalForDb = globalThis;

export const db = globalForDb.__attDb ?? createDb();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__attDb = db;
}

export * from "./schema.js";
