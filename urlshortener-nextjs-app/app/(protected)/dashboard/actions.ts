"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createUserLink, deleteUserLink, updateUserLink } from "@/services/links";
import {
  DeleteLinkActionState,
  CreateLinkActionState,
  UpdateLinkActionState,
  initialCreateLinkActionState,
  initialDeleteLinkActionState,
  initialUpdateLinkActionState,
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

export async function updateLinkFromFormAction(
  formData: FormData,
): Promise<UpdateLinkActionState> {
  return updateLinkAction(initialUpdateLinkActionState, formData);
}

export async function updateLinkAction(
  _previousState: UpdateLinkActionState,
  formData: FormData,
): Promise<UpdateLinkActionState> {
  const { userId } = await auth();

  if (!userId) {
    return {
      status: "error",
      message: "You must be signed in to update a link.",
    };
  }

  const rawId = formData.get("id");
  const rawUrl = formData.get("url");
  const rawShortCode = formData.get("shortCode");
  const rawOriginalShortCode = formData.get("originalShortCode");

  const id = typeof rawId === "string" ? Number.parseInt(rawId, 10) : NaN;

  if (Number.isNaN(id) || id <= 0) {
    return {
      status: "error",
      message: "Unable to identify the link to update.",
    };
  }

  if (typeof rawUrl !== "string" || rawUrl.trim().length === 0) {
    return {
      status: "error",
      message: "Please enter a valid URL.",
    };
  }

  const shortCode =
    typeof rawShortCode === "string" && rawShortCode.trim().length > 0
      ? rawShortCode
      : typeof rawOriginalShortCode === "string"
        ? rawOriginalShortCode
        : "";

  try {
    await updateUserLink({
      id,
      userId,
      url: rawUrl,
      shortCode,
    });
    revalidatePath("/dashboard");

    return {
      status: "success",
      message: "Link updated.",
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
      message: "Unable to update link. Please try again.",
    };
  }
}

export async function deleteLinkFromFormAction(
  formData: FormData,
): Promise<DeleteLinkActionState> {
  return deleteLinkAction(initialDeleteLinkActionState, formData);
}

export async function deleteLinkAction(
  _previousState: DeleteLinkActionState,
  formData: FormData,
): Promise<DeleteLinkActionState> {
  const { userId } = await auth();

  if (!userId) {
    return {
      status: "error",
      message: "You must be signed in to delete a link.",
    };
  }

  const rawId = formData.get("id");
  const id = typeof rawId === "string" ? Number.parseInt(rawId, 10) : NaN;

  if (Number.isNaN(id) || id <= 0) {
    return {
      status: "error",
      message: "Unable to identify the link to delete.",
    };
  }

  try {
    await deleteUserLink({
      id,
      userId,
    });
    revalidatePath("/dashboard");

    return {
      status: "success",
      message: "Link deleted.",
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
      message: "Unable to delete link. Please try again.",
    };
  }
}
