"use client";

import { useRef, useState } from "react";
import { Edit3Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateLinkFromFormAction } from "@/app/(protected)/dashboard/actions";
import { type LinkActionState } from "@/app/(protected)/dashboard/types";
import { type ShortenedLink } from "@/services/links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

export function EditLinkDialog({ link }: { link: ShortenedLink }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<LinkActionState>({
    status: "idle",
    message: "",
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  async function handleUpdateLink(formData: FormData) {
    setPending(true);

    try {
      const result = await updateLinkFromFormAction(formData);
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
        <Button type="button" variant="outline" size="sm">
          <Edit3Icon className="h-3.5 w-3.5" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Short Link</DialogTitle>
          <DialogDescription>
            Update the destination URL or short code for this link.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={handleUpdateLink} className="space-y-4">
          <input type="hidden" name="id" value={link.id} />
          <input type="hidden" name="originalShortCode" value={link.shortCode} />

          <div className="space-y-2">
            <Label htmlFor={`shortCode-${link.id}`}>Short code</Label>
            <Input
              id={`shortCode-${link.id}`}
              name="shortCode"
              type="text"
              placeholder="my-link"
              defaultValue={link.shortCode}
              maxLength={32}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`url-${link.id}`}>Destination URL</Label>
            <Input
              id={`url-${link.id}`}
              name="url"
              type="url"
              placeholder="https://example.com"
              defaultValue={link.url}
              required
            />
          </div>

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