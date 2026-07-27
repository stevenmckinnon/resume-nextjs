"use client";

import { buttonVariants } from "@/components/ui/button";
import { toggleTheme } from "@/lib/theme-transition";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { forwardRef, useCallback } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

export const ModeToggle = forwardRef<HTMLButtonElement>((_, ref) => {
  const { theme, setTheme } = useTheme();

  const handleClick = useCallback(
    () => toggleTheme(theme, setTheme),
    [setTheme, theme],
  );

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            ref={ref}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hover:bg-muted/80 size-12 rounded-full bg-transparent transition-colors duration-300",
            )}
            onClick={handleClick}
          >
            <SunIcon className="size-4 dark:hidden" />
            <MoonIcon className="hidden size-4 dark:block" />
            <span className="sr-only">Theme switch</span>
          </button>
        }
      />
      <TooltipContent>
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  );
});

ModeToggle.displayName = "ModeToggle";
