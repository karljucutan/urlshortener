"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createUserLink } from "@/services/links";
import {
  CreateLinkActionState,
  initialCreateLinkActionState,
} from "@/app/(protected)/dashboard/types";

export async function createLinkFromFormAction(
  formData: FormData,
): Promise<CreateLinkActionState> {
  return createLinkAction(initialCreateLinkActionState, formData);
}

export async function createLinkAction(
  _previousState: CreateLinkActionState,
  formData: FormData,
): Promise<CreateLinkActionState> {
  const { userId } = await auth();

  if (!userId) {
    return {
      status: "error",
      message: "You must be signed in to create a link.",
    };
  }

  const rawUrl = formData.get("url");
  const rawCustomSlug = formData.get("customSlug");

  if (typeof rawUrl !== "string" || rawUrl.trim().length === 0) {
    return {
      status: "error",
      message: "Please enter a valid URL.",
    };
  }

  const customSlug =
    typeof rawCustomSlug === "string" ? rawCustomSlug.trim() : "";

  try {
    await createUserLink({
      userId,
      url: rawUrl,
      customSlug: customSlug.length > 0 ? customSlug : undefined,
    });
    revalidatePath("/dashboard");

    return {
      status: "success",
      message: "Link created.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "error",
      message: "Unable to create link. Please try again.",
    };
  }
}
