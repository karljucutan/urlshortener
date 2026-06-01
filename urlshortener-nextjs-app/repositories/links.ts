import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { shortenedLinks } from "@/db/schema";

export type ShortenedLink = typeof shortenedLinks.$inferSelect;

export type CreateShortenedLinkInput = {
  userId: string;
  shortCode: string;
  url: string;
};

export type UpdateShortenedLinkInput = {
  id: number;
  userId: string;
  shortCode: string;
  url: string;
};

export type DeleteShortenedLinkInput = {
  id: number;
  userId: string;
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

export async function updateShortenedLink(
  input: UpdateShortenedLinkInput,
): Promise<ShortenedLink> {
  const [updatedLink] = await db
    .update(shortenedLinks)
    .set({
      shortCode: input.shortCode,
      url: input.url,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(shortenedLinks.id, input.id),
        eq(shortenedLinks.userId, input.userId),
      ),
    )
    .returning();

  if (!updatedLink) {
    throw new Error("Link not found.");
  }

  return updatedLink;
}

export async function deleteShortenedLink(
  input: DeleteShortenedLinkInput,
): Promise<ShortenedLink> {
  const [deletedLink] = await db
    .delete(shortenedLinks)
    .where(
      and(
        eq(shortenedLinks.id, input.id),
        eq(shortenedLinks.userId, input.userId),
      ),
    )
    .returning();

  if (!deletedLink) {
    throw new Error("Link not found.");
  }

  return deletedLink;
}
