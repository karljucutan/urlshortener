"use client";

import { useRef, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteLinkFromFormAction } from "@/app/(protected)/dashboard/actions";
import { type LinkActionState } from "@/app/(protected)/dashboard/types";
import { type ShortenedLink } from "@/services/links";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" variant="destructive" disabled={pending}>
      {pending ? "Deleting..." : "Delete Link"}
    </Button>
  );
}

export function DeleteLinkDialog({ link }: { link: ShortenedLink }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<LinkActionState>({
    status: "idle",
    message: "",
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  async function handleDeleteLink(formData: FormData) {
    setPending(true);

    try {
      const result = await deleteLinkFromFormAction(formData);
      setState(result);

      if (result.status === "success") {
        formRef.current?.reset();
        setOpen(false);
        router.refresh();
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (nextOpen) {
          setState({ status: "idle", message: "" });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" variant="destructive" size="sm">
          <Trash2Icon className="h-3.5 w-3.5" />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Short Link?</DialogTitle>
          <DialogDescription>
            This will permanently remove /{link.shortCode}. The original
            destination URL is {link.url}.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={handleDeleteLink} className="space-y-4">
          <input type="hidden" name="id" value={link.id} />

          {state.status === "error" ? (
            <p className="text-sm text-red-600">{state.message}</p>
          ) : null}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={pending}>
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton pending={pending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}