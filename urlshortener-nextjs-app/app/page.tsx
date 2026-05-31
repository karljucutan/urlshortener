import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import {
  ArrowRightIcon,
  BarChart3Icon,
  CheckCircle2Icon,
  CopyIcon,
  Link2Icon,
  MousePointerClickIcon,
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
      icon: ZapIcon,
      title: "Instant short links",
      description:
        "Paste a long URL and get a clean short link in one click. No friction, no fuss.",
    },
    {
      icon: MousePointerClickIcon,
      title: "Click tracking",
      description:
        "See how your links perform. Know which campaigns are driving traffic.",
    },
    {
      icon: CopyIcon,
      title: "One-click copy",
      description:
        "Copy any short link to your clipboard instantly and share it anywhere.",
    },
    {
      icon: BarChart3Icon,
      title: "Campaign management",
      description:
        "Organize links by campaign, channel, or purpose from your dashboard.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure by default",
      description:
        "Every link is tied to your account. Only you control your workspace.",
    },
    {
      icon: Link2Icon,
      title: "Clean, memorable URLs",
      description:
        "Replace unwieldy URLs with short links your audience actually reads.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Create your account",
      description: "Sign up in seconds with your email. No credit card required.",
    },
    {
      step: "02",
      title: "Paste your long URL",
      description: "Drop any URL into the dashboard and generate a short link instantly.",
    },
    {
      step: "03",
      title: "Share and track",
      description: "Copy your short link, share it anywhere, and watch the clicks roll in.",
    },
  ];

  const stats = [
    { value: "1-click", label: "link creation" },
    { value: "100%", label: "account-backed" },
    { value: "∞", label: "links supported" },
    { value: "0ms", label: "extra setup" },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* ── Sticky Navbar ── */}
      <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
              <Link2Icon className="size-4" />
            </div>
            <span className="text-foreground text-sm font-semibold">Snip</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Show when="signed-in">
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Separator orientation="vertical" className="h-5" />
              <UserButton />
            </Show>

            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">Sign in</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Get started free</Button>
              </SignUpButton>
            </Show>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        {/* subtle radial glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.08),transparent)]" />

        <div className="mx-auto max-w-3xl">
          <Badge variant="outline" className="mb-6 gap-1.5 px-3 py-1 text-xs">
            <span className="bg-primary size-1.5 rounded-full" />
            Simple URL shortener for modern teams
          </Badge>

          <h1 className="text-foreground text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Short links that{" "}
            <span className="text-primary">actually work</span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-relaxed">
            Create, manage, and share clean short URLs from a single dashboard.
            Built for marketers, developers, and anyone who shares links.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button size="lg" className="h-12 px-8">
                  Start for free
                  <ArrowRightIcon className="size-4" />
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  Sign in
                </Button>
              </SignInButton>
            </Show>

            <Show when="signed-in">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/dashboard">
                  Go to dashboard
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
            </Show>
          </div>

          <p className="text-muted-foreground mt-4 text-sm">
            No credit card required · Free to start
          </p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y">
        <div className="mx-auto grid max-w-4xl grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-8 py-8">
              <span className="text-foreground text-3xl font-bold tracking-tight">{value}</span>
              <span className="text-muted-foreground text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to manage links
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
              A focused set of tools so you can spend less time managing URLs
              and more time on things that matter.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="mt-4 text-base">{title}</CardTitle>
                  <CardDescription className="leading-relaxed">{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="bg-muted/40 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <Badge variant="secondary" className="mb-4">How it works</Badge>
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Up and running in 3 steps
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(({ step, title, description }, i) => (
              <div key={step} className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="relative">
                  <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-2xl text-sm font-bold">
                    {step}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="border-muted-foreground/30 absolute top-6 left-full hidden h-px w-full border-t border-dashed md:block" />
                  )}
                </div>
                <h3 className="text-foreground mt-5 text-lg font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Card className="bg-primary text-primary-foreground ring-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-inherit sm:text-3xl">
                Start shortening links today
              </CardTitle>
              <CardDescription className="text-primary-foreground/70 text-base">
                Join and get a clean, organized workspace for all your short links — free.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                {["Free to start", "No credit card", "Instant access"].map((item) => (
                  <li key={item} className="text-primary-foreground/80 flex items-center gap-1.5 text-sm">
                    <CheckCircle2Icon className="size-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="bg-transparent justify-center gap-3 border-0 pt-0">
              <Show when="signed-out">
                <SignUpButton mode="modal">
                  <Button variant="secondary" size="lg">
                    Create free account
                    <ArrowRightIcon className="size-4" />
                  </Button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Button asChild variant="secondary" size="lg">
                  <Link href="/dashboard">
                    Open dashboard
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
              </Show>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
              <Link2Icon className="size-3.5" />
            </div>
            <span className="text-foreground text-sm font-semibold">Snip</span>
          </div>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Snip. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
