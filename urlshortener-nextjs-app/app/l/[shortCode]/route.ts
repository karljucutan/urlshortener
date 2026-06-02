import { NextResponse } from "next/server";
import { getLinkDestinationByShortCode } from "@/services/links";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ shortCode: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { shortCode } = await context.params;
  const destinationUrl = await getLinkDestinationByShortCode(shortCode);

  if (!destinationUrl) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.redirect(destinationUrl);
}
