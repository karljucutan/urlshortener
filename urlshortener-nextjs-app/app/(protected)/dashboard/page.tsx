import { auth } from "@clerk/nextjs/server";
import { ExternalLinkIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { getUserLinks } from "@/services/links";
import { CreateLinkDialog } from "@/components/create-link-dialog";
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
                  <CardTitle className="text-base font-medium">
                    <Link
                      href={`/${link.shortCode}`}
                      className="hover:underline text-zinc-900"
                    >
                      /{link.shortCode}
                    </Link>
                  </CardTitle>
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    {link.createdAt.toLocaleDateString()}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1 truncate">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate hover:underline flex items-center gap-1"
                  >
                    {link.url}
                    <ExternalLinkIcon className="h-3 w-3 shrink-0" />
                  </a>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}