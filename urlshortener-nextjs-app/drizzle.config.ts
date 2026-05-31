import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Prefer local dev secrets, then fallback to default .env.
config({ path: ".env.local" });
config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Add it to .env.local or your environment.");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
