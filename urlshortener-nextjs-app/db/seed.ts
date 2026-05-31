import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";

import { shortenedLinks } from "./schema";

// Prefer local dev env first, then fallback to .env.
config({ path: ".env.local" });
config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Add it to .env.local or your environment.");
}

const db = drizzle(databaseUrl);

const seedRows = [
  {
    userId: "demo-user-1",
    shortCode: "ghcopilot",
    url: "https://github.com/features/copilot",
  },
  {
    userId: "demo-user-1",
    shortCode: "nextjs",
    url: "https://nextjs.org/",
  },
  {
    userId: "demo-user-2",
    shortCode: "drizzle",
    url: "https://orm.drizzle.team/",
  },
];

async function run() {
  const countResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(shortenedLinks);

  if (countResult[0]?.count > 0) {
    console.log("Seed skipped: shortened_links already has data.");
    return;
  }

  await db.insert(shortenedLinks).values(seedRows);
  console.log(`Seed complete: inserted ${seedRows.length} rows.`);
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
