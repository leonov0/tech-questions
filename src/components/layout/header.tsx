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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ThemeDropdownSub } from "@/features/theming/theme-dropdown-sub";
import { ThemeToggle } from "@/features/theming/theme-toggle";
import { capitalizeFirstLetter, cn } from "@/lib/utils";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border border-border/40 bg-background/60 py-2 backdrop-blur">
      <div className="container grid grid-cols-[auto_,1fr_,_auto] gap-x-8 gap-y-4 sm:grid-cols-[auto_,1fr_,auto_,_auto]">
        <Link
          href="/"
          className="grid w-8 place-items-center transition-colors hover:text-foreground/90"
        >
          <TechQuestionsLogoIcon className="size-7" />
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Browse questions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="sm:-[400px] grid w-64 gap-3 p-4 lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      >
                        <TechQuestionsLogoIcon className="size-6" />

                        <div className="mb-2 mt-4 text-lg font-medium">
                          Browse all questions
                        </div>

                        <p className="text-sm leading-tight text-muted-foreground">
                          Explore real questions from interviews at it
                          companies.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>

                  <ListItem href="/questions" title="Google">
                    Leaders in AI and cloud, known for challenging
                    problem-solving interviews.
                  </ListItem>

                  <ListItem href="/questions" title="Apple">
                    Innovators in design, with a focus on creativity and
                    technical mastery.
                  </ListItem>

                  <ListItem href="/questions" title="Microsoft">
                    Driving productivity with a focus on collaboration and
                    technical depth.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="relative hidden sm:block">
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

                <span className="ml-2 line-clamp-1 hidden sm:block">
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
