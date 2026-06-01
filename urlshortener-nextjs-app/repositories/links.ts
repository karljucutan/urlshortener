import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { shortenedLinks } from "@/db/schema";

export type ShortenedLink = typeof shortenedLinks.$inferSelect;

export type CreateShortenedLinkInput = {
  userId: string;
  shortCode: string;
  url: string;
};

export async function getLinksByUserId(userId: string): Promise<ShortenedLink[]> {
  return db
    .select()
    .from(shortenedLinks)
    .where(eq(shortenedLinks.userId, userId))
    .orderBy(desc(shortenedLinks.createdAt), desc(shortenedLinks.updatedAt));
}

export async function createShortenedLink(
  input: CreateShortenedLinkInput,
): Promise<ShortenedLink> {
  const [createdLink] = await db
    .insert(shortenedLinks)
    .values({
      userId: input.userId,
      shortCode: input.shortCode,
      url: input.url,
    })
    .returning();

  return createdLink;
}
