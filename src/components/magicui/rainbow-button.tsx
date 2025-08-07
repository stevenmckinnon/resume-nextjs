import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

export const RainbowButton = React.forwardRef<
  HTMLButtonElement,
  RainbowButtonProps
>(({ children, className, href, ...props }, ref) => {
  if (href) {
    // Allow for rendering as a link
    return (
      <Link
        href={href}
        className={cn(
          "group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-full border px-8 py-2 font-medium transition-all duration-300 [background-clip:padding-box,border-box,border-box] [background-origin:border-box] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          // before styles
          "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:[filter:blur(calc(0.8*1rem))]",
          // light mode colors
          "bg-foreground text-background shadow-lg hover:bg-foreground/90 hover:shadow-xl dark:bg-white dark:text-gray-900 dark:hover:bg-white/90",
          // rainbow gradient overlay
          "bg-[linear-gradient(hsl(var(--foreground)),hsl(var(--foreground))),linear-gradient(hsl(var(--foreground))_50%,hsla(var(--foreground)/0.6)_80%,hsla(var(--foreground)/0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(255,255,255,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
          className
        )}
        style={{
          // Add subtle inner glow effect
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-full border px-8 py-2 font-medium transition-all duration-300 [background-clip:padding-box,border-box,border-box] [background-origin:border-box] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        // before styles
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:[filter:blur(calc(0.8*1rem))]",
        // light mode colors
        "bg-foreground text-background shadow-lg hover:bg-foreground/90 hover:shadow-xl dark:bg-white dark:text-gray-900 dark:hover:bg-white/90",
        // rainbow gradient overlay
        "bg-[linear-gradient(hsl(var(--foreground)),hsl(var(--foreground))),linear-gradient(hsl(var(--foreground))_50%,hsla(var(--foreground)/0.6)_80%,hsla(var(--foreground)/0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(255,255,255,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        className
      )}
      style={{
        // Add subtle inner glow effect
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
      {...props}
    >
      {children}
    </button>
  );
});

RainbowButton.displayName = "RainbowButton";
