"use client";

import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  ChevronDownIcon,
  HouseIcon,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export function AppNavbar() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const fullName = user?.fullName ?? user?.firstName ?? "Account";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((value) => value[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg border bg-muted">
            <LayoutDashboardIcon className="size-4" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">
              URL Shortener
            </p>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </Link>
{/* 
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">
                  <HouseIcon data-icon="inline-start" />
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}

        <div className="flex items-center gap-3">
          <Separator orientation="vertical" className="hidden h-8 md:block" />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none ring-offset-background transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <Avatar className="size-8">
                <AvatarImage src={user?.imageUrl ?? undefined} alt={fullName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium leading-none">{fullName}</p>
                <p className="mt-1 text-xs text-muted-foreground">Account</p>
              </div>
              <ChevronDownIcon className="hidden size-4 text-muted-foreground md:block" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium leading-none">
                    {fullName}
                  </span>
                  {user?.primaryEmailAddress?.emailAddress ? (
                    <span className="text-xs text-muted-foreground">
                      {user.primaryEmailAddress.emailAddress}
                    </span>
                  ) : null}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <LayoutDashboardIcon data-icon="inline-start" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onSelect={(event) => {
                  event.preventDefault();
                  void signOut({ redirectUrl: "/" });
                }}
              >
                <LogOutIcon data-icon="inline-start" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
