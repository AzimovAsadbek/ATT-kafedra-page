import "./scripts/load-env.mjs";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: process.env.DATABASE_AUTH_TOKEN ? "turso" : "sqlite",
  schema: "./lib/db/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL || "file:./data/app.db",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});
