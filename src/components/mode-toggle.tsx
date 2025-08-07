"use client";

import { buttonVariants } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const ModeToggle = forwardRef<HTMLButtonElement>((_, ref) => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      ref={ref}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "size-12",
        "rounded-full bg-transparent border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm dark:border-gray-700/10 dark:hover:bg-gray-800/10 dark:hover:border-gray-700/20"
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
      <span className="sr-only">Theme switch</span>
    </button>
  );
});

ModeToggle.displayName = "ModeToggle";
