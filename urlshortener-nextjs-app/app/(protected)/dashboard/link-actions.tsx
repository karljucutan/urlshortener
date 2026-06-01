"use client";

import { type ShortenedLink } from "@/services/links";
import { EditLinkDialog } from "@/app/(protected)/dashboard/edit-link-dialog";
import { DeleteLinkDialog } from "@/app/(protected)/dashboard/delete-link-dialog";

export function LinkActions({ link }: { link: ShortenedLink }) {
  return (
    <div className="flex items-center gap-2">
      <EditLinkDialog link={link} />
      <DeleteLinkDialog link={link} />
    </div>
  );
}