import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import {
  ArrowRightIcon,
  BarChart3Icon,
  CheckCircle2Icon,
  Link2Icon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const features = [
    {
      title: "Short links in seconds",
      description:
        "Create branded, easy-to-share links from a clean dashboard without extra setup.",
      icon: Link2Icon,
    },
    {
      title: "Performance-focused redirects",
      description:
        "Send visitors to the right destination quickly with a lightweight link experience.",
      icon: ZapIcon,
    },
    {
      title: "Trackable campaign links",
      description:
        "Organize your links for launches, newsletters, and social campaigns in one place.",
      icon: BarChart3Icon,
    },
    {
      title: "Account-backed management",
      description:
        "Keep your links tied to your account so your workspace stays secure and portable.",
      icon: ShieldCheckIcon,
    },
  ];

  const highlights = [
    "Create and manage links from one dashboard",
    "Share cleaner URLs across marketing channels",
    "Keep access protected with Clerk authentication",
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        {/* Navbar */}
        <header className="mb-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl">
              <Link2Icon className="size-5" />
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">URL Shortener</p>
              <p className="text-muted-foreground text-xs">Cleaner links for every campaign</p>
            </div>
          </div>

          <Show when="signed-in">
            <div className="flex items-center gap-3">
              <Button asChild variant="outline">
                <Link href="/dashboard">Open dashboard</Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <UserButton />
            </div>
          </Show>

          <Show when="signed-out">
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <Button variant="ghost">Sign in</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Get started</Button>
              </SignUpButton>
            </div>
          </Show>
        </header>

        {/* Hero + features grid */}
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: hero copy */}
          <div>
            <Badge variant="secondary" className="mb-4">
              Launch short links with a polished workflow
            </Badge>
            <h1 className="text-foreground mt-2 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
              Turn long URLs into fast, memorable links.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8">
              Build a central home for campaign links, internal resources, and
              shareable destinations — with secure account access and a focused
              dashboard experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Show when="signed-out">
                <SignUpButton mode="modal">
                  <Button size="lg">
                    Create free account
                    <ArrowRightIcon className="size-4" />
                  </Button>
                </SignUpButton>
              </Show>

              <Show when="signed-out">
                <SignInButton mode="modal">
                  <Button variant="outline" size="lg">
                    Sign in to continue
                  </Button>
                </SignInButton>
              </Show>

              <Show when="signed-in">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Go to dashboard
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
              </Show>
            </div>

            {/* Highlights */}
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {highlights.map((highlight) => (
                <Card key={highlight} size="sm">
                  <CardContent className="flex items-start gap-2 pt-3">
                    <CheckCircle2Icon className="text-foreground mt-0.5 size-4 shrink-0" />
                    <p className="text-muted-foreground text-sm leading-5">{highlight}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: feature cards */}
          <div className="flex flex-col gap-4">
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
              Why teams use it
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map(({ title, description, icon: Icon }) => (
                <Card key={title}>
                  <CardHeader>
                    <div className="bg-muted flex size-9 items-center justify-center rounded-lg">
                      <Icon className="size-4" />
                    </div>
                    <CardTitle className="mt-3">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/40">
              <CardHeader>
                <CardTitle>Ready to ship cleaner links?</CardTitle>
                <CardDescription>
                  Sign in to create links, keep your destinations organized, and
                  move from raw URLs to a better sharing experience.
                </CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Show when="signed-out">
                  <SignUpButton mode="modal">
                    <Button size="sm">
                      Get started
                      <ArrowRightIcon className="size-3.5" />
                    </Button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <Button asChild size="sm">
                    <Link href="/dashboard">
                      Open dashboard
                      <ArrowRightIcon className="size-3.5" />
                    </Link>
                  </Button>
                </Show>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
