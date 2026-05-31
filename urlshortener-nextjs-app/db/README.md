# Database Commands (Drizzle)

This folder contains the database schema and seed script.

## Files

- `schema.ts`: Drizzle schema definitions
- `seed.ts`: seed data script
- `../drizzle.config.ts`: Drizzle Kit configuration

## Prerequisites

1. Run commands from project root:

```powershell
cd D:\GitHubRepositories\urlshortener\urlshortener-nextjs-app
```

2. Make sure `DATABASE_URL` exists in `.env.local` (or `.env`).

Example:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
```

## Drizzle Commands (direct)

Generate migration files from schema changes:

```powershell
npx drizzle-kit generate
```

Generate migration files with a custom migration name/message:

```powershell
npx drizzle-kit generate --name add_shortened_links_indexes
```

Apply schema changes to the database:

```powershell
npx drizzle-kit push
```

Open Drizzle Studio:

```powershell
npx drizzle-kit studio
```

## Seeding

Run seed script directly:

```powershell
npx tsx db/seed.ts
```

Important:
- Seeding is not included in `npx drizzle-kit push`.
- `push` only applies schema changes.
- `seed.ts` inserts demo rows only when `shortened_links` is empty, otherwise it skips.

## Typical Local Workflow

1. Edit `db/schema.ts`
2. Run `npx drizzle-kit generate`
3. Run `npx drizzle-kit push`
4. Run `npx tsx db/seed.ts`
