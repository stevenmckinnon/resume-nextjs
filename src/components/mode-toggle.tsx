"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { forwardRef, useCallback } from "react";

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
      (document as any).startViewTransition(() => {
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
    <button
      ref={ref}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "size-12",
        "rounded-full bg-transparent hover:border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:backdrop-blur-sm dark:border-gray-700/10 dark:hover:bg-gray-800/10 dark:hover:border-gray-700/20"
      )}
      onClick={handleClick}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
      <span className="sr-only">Theme switch</span>
    </button>
  );
});

ModeToggle.displayName = "ModeToggle";
