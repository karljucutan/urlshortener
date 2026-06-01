import { auth } from "@clerk/nextjs/server";
import { ExternalLinkIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { getUserLinks } from "@/services/links";
import { CreateLinkDialog } from "@/app/(protected)/dashboard/create-link-dialog";
import { LinkActions } from "@/app/(protected)/dashboard/link-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const { userId } = await auth();

  const links = await getUserLinks(userId!);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Your Links</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {links.length} shortened {links.length === 1 ? "link" : "links"}
          </p>
        </div>
        <CreateLinkDialog />
      </div>

      {links.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <LinkIcon className="h-10 w-10 text-zinc-300 mb-4" />
            <p className="text-zinc-500 font-medium">No links yet</p>
            <p className="text-sm text-zinc-400 mt-1">
              Shorten your first URL to see it here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <Card key={link.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-1">
                    <CardTitle className="text-base font-medium">
                      <Link
                        href={`/l/${link.shortCode}`}
                        className="text-zinc-900 hover:underline"
                      >
                        /l/{link.shortCode}
                      </Link>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 truncate">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 truncate hover:underline"
                      >
                        {link.url}
                        <ExternalLinkIcon className="h-3 w-3 shrink-0" />
                      </a>
                    </CardDescription>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {link.createdAt.toLocaleDateString()}
                    </Badge>
                    <LinkActions link={link} />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}