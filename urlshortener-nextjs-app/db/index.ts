import { drizzle } from 'drizzle-orm/neon-http';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error(
		"DATABASE_URL is not set. Configure it in Cloudflare Variables and Secrets for this environment.",
	);
}

const db = drizzle(databaseUrl);

export { db };