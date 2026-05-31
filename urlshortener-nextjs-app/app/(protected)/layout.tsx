import { auth } from "@clerk/nextjs/server";
import { AppNavbar } from "@/components/app-navbar";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await auth.protect();

  return (
    <div className="min-h-screen bg-zinc-50">
      <AppNavbar />
      <main className="mx-auto w-full max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}