import {
  ChevronDownIcon,
  ExitIcon,
  GearIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import { auth, signOut } from "@/auth";
import { TechQuestionsLogoIcon } from "@/components/icons/tech-questions-logo-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ThemeDropdownSub } from "@/features/theming/theme-dropdown-sub";
import { ThemeToggle } from "@/features/theming/theme-toggle";
import { capitalizeFirstLetter, cn } from "@/lib/utils";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border border-border/40 bg-background/60 py-2 backdrop-blur">
      <div className="container grid grid-cols-[1fr_,auto_,_auto] gap-8">
        <Link
          href="/"
          className="grid w-8 place-items-center transition-colors hover:text-foreground/90"
        >
          <TechQuestionsLogoIcon className="size-7" />
        </Link>

        <div className="relative">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-2.5 size-4" />
          <Input placeholder="Search..." className="pl-9" />
        </div>

        <div>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "group max-w-48 pl-2",
                )}
              >
                <Avatar className="size-6 rounded-sm">
                  <AvatarImage src={session.user.image || undefined} />

                  <AvatarFallback>
                    {capitalizeFirstLetter(session.user.username || "A")}
                  </AvatarFallback>
                </Avatar>

                <span className="ml-2 line-clamp-1">
                  {session.user.username}
                </span>

                <ChevronDownIcon
                  className="relative top-[1px] ml-2 size-3 transition duration-300 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <PersonIcon />
                    <span className="ml-2">Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <GearIcon />
                    <span className="ml-2">Settings</span>
                  </Link>
                </DropdownMenuItem>

                <ThemeDropdownSub />

                <form
                  action={async () => {
                    "use server";

                    await signOut();
                  }}
                >
                  <DropdownMenuItem asChild>
                    <button type="submit" className="w-full">
                      <ExitIcon />

                      <span className="ml-2">Sign out</span>
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-4">
              <ThemeToggle />
              <Link
                href="/login"
                className={buttonVariants({ variant: "secondary" })}
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
