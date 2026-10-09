import "./scripts/load-env.mjs";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.js",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL || process.env.POSTGRES_URL },
});
