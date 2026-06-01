import { customAlphabet } from "nanoid";
import {
  deleteShortenedLink,
  createShortenedLink,
  getLinksByUserId,
  updateShortenedLink,
  type ShortenedLink,
} from "@/repositories/links";

export type { ShortenedLink };

export type CreateUserLinkInput = {
  userId: string;
  url: string;
  customSlug?: string;
};

export type UpdateUserLinkInput = {
  id: number;
  userId: string;
  url: string;
  shortCode: string;
};

export type DeleteUserLinkInput = {
  id: number;
  userId: string;
};

const SHORT_CODE_LENGTH = 7;
const MAX_SHORT_CODE_RETRIES = 5;
const MAX_CUSTOM_SLUG_LENGTH = 32;

const SHORT_CODE_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const createNanoId = customAlphabet(SHORT_CODE_ALPHABET, SHORT_CODE_LENGTH);

export async function getUserLinks(userId: string): Promise<ShortenedLink[]> {
  return getLinksByUserId(userId);
}

function buildShortCode(): string {
  return createNanoId();
}

function normalizeUrl(input: string): string {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error("Please enter a valid URL.");
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    return new URL(withProtocol).toString();
  } catch {
    throw new Error("Please enter a valid URL.");
  }
}

function isUniqueViolation(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const withCode = error as { code?: string };

  return withCode.code === "23505";
}

function normalizeCustomSlug(input: string): string {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error("Custom slug cannot be empty.");
  }

  if (trimmed.length > MAX_CUSTOM_SLUG_LENGTH) {
    throw new Error("Custom slug must be 32 characters or fewer.");
  }

  if (!/^[A-Za-z0-9_-]+$/.test(trimmed)) {
    throw new Error(
      "Custom slug can only contain letters, numbers, hyphens, and underscores.",
    );
  }

  return trimmed;
}

function normalizeShortCode(input: string): string {
  return normalizeCustomSlug(input);
}

export async function createUserLink(
  input: CreateUserLinkInput,
): Promise<ShortenedLink> {
  if (!input.userId) {
    throw new Error("You must be signed in to create a link.");
  }

  const normalizedUrl = normalizeUrl(input.url);

  if (input.customSlug) {
    const normalizedCustomSlug = normalizeCustomSlug(input.customSlug);

    try {
      return await createShortenedLink({
        userId: input.userId,
        shortCode: normalizedCustomSlug,
        url: normalizedUrl,
      });
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new Error("That custom slug is already in use.");
      }

      throw error;
    }
  }

  for (
    let attemptIndex = 0;
    attemptIndex < MAX_SHORT_CODE_RETRIES;
    attemptIndex += 1
  ) {
    const shortCode = buildShortCode();

    try {
      return await createShortenedLink({
        userId: input.userId,
        shortCode,
        url: normalizedUrl,
      });
    } catch (error) {
      if (!isUniqueViolation(error)) {
        throw error;
      }
    }
  }

  throw new Error("Unable to generate a unique short code. Please try again.");
}

export async function updateUserLink(
  input: UpdateUserLinkInput,
): Promise<ShortenedLink> {
  if (!input.userId) {
    throw new Error("You must be signed in to update a link.");
  }

  const normalizedUrl = normalizeUrl(input.url);
  const normalizedShortCode = normalizeShortCode(input.shortCode);

  try {
    return await updateShortenedLink({
      id: input.id,
      userId: input.userId,
      shortCode: normalizedShortCode,
      url: normalizedUrl,
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new Error("That custom slug is already in use.");
    }

    throw error;
  }
}

export async function deleteUserLink(
  input: DeleteUserLinkInput,
): Promise<ShortenedLink> {
  if (!input.userId) {
    throw new Error("You must be signed in to delete a link.");
  }

  return deleteShortenedLink({
    id: input.id,
    userId: input.userId,
  });
}
