// Page-based shortcode redirect implementation (reference only).
// This file is intentionally non-routable because Next.js does not allow
// having both page.tsx and route.ts in the same segment.
//
// import { notFound, redirect } from "next/navigation";
// import { getLinkDestinationByShortCode } from "@/services/links";
//
// type ShortCodePageProps = {
//   params: Promise<{ shortCode: string }>;
// };
//
// export default async function ShortCodePage({
//   params,
// }: ShortCodePageProps): Promise<never> {
//   const { shortCode } = await params;
//   const destinationUrl = await getLinkDestinationByShortCode(shortCode);
//
//   if (!destinationUrl) {
//     notFound();
//   }
//
//   redirect(destinationUrl);
// }

export {};
