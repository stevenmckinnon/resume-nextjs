"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { forwardRef, useCallback } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

// Keep the element/UI from ModeToggle, but adopt the animated transition logic
// from theme-switch (inject temporary CSS and clean it up after).
export const ModeToggle = forwardRef<HTMLButtonElement>((_, ref) => {
  const { theme, setTheme } = useTheme();

  const handleClick = useCallback(() => {
    // Inject animation styles for a circular reveal from center
    const styleId = `theme-transition-${Date.now()}`;
    const style = document.createElement("style");
    style.id = styleId;

    const cx = "50";
    const cy = "50";
    const css = `
      @supports (view-transition-name: root) {
        ::view-transition-old(root) { 
          animation: none;
        }
        ::view-transition-new(root) {
          animation: circle-expand 0.4s ease-out;
          transform-origin: center;
        }
        @keyframes circle-expand {
          from { clip-path: circle(0% at ${cx}% ${cy}%); }
          to { clip-path: circle(150% at ${cx}% ${cy}%); }
        }
      }
    `;

    style.textContent = css;
    document.head.appendChild(style);

    const performToggle = () => setTheme(theme === "dark" ? "light" : "dark");

    // If View Transitions API is available, wrap the update
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        performToggle();
      });
    } else {
      performToggle();
    }

    // Clean up animation styles after transition
    setTimeout(() => {
      const styleEl = document.getElementById(styleId);
      if (styleEl) styleEl.remove();
    }, 3000);
  }, [setTheme, theme]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          ref={ref}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-12 rounded-full bg-transparent transition-colors duration-300 hover:bg-muted/80"
          )}
          onClick={handleClick}
        >
          <SunIcon className="size-4 dark:hidden " />
          <MoonIcon className="size-4 hidden dark:block" />
          <span className="sr-only">Theme switch</span>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  );
});

ModeToggle.displayName = "ModeToggle";
