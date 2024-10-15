"use client";

import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeDropdownSub() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <SunIcon className="dark:hidden" />
        <MoonIcon className="hidden dark:block" />
        <span className="ml-2">Themes</span>
      </DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <SunIcon />
            <span className="ml-2">Light</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <MoonIcon />
            <span className="ml-2">Dark</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme("system")}>
            <LaptopIcon />
            <span className="ml-2">System</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
