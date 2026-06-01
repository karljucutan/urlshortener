"use client";

import { useRef, useState } from "react";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { createLinkFromFormAction } from "@/app/(protected)/dashboard/actions";
import { type CreateLinkActionState } from "@/app/(protected)/dashboard/types";
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
      {pending ? "Creating..." : "Create Link"}
    </Button>
  );
}

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<CreateLinkActionState>({
    status: "idle",
    message: "",
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  async function handleCreateLink(formData: FormData) {
    setPending(true);

    try {
      const result = await createLinkFromFormAction(formData);
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
        <Button>
          <PlusIcon className="h-4 w-4" />
          Create Link
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Short Link</DialogTitle>
          <DialogDescription>
            Paste a destination URL and optionally choose a custom slug.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={handleCreateLink} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Destination URL</Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customSlug">Custom slug (optional)</Label>
            <Input
              id="customSlug"
              name="customSlug"
              type="text"
              placeholder="my-link"
              maxLength={32}
            />
            <p className="text-xs text-zinc-500">
              Leave empty to auto-generate.
            </p>
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
