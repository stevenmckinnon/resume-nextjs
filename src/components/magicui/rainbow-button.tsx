import React, { Ref } from "react";
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
        ref={ref as unknown as Ref<HTMLAnchorElement>}
        href={href}
        className={cn(
          "group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-primary-foreground transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          // before styles
          "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:[filter:blur(calc(0.8*1rem))]",
          // light mode colors
          "bg-[linear-gradient(hsl(var(--foreground)),hsl(var(--foreground))),linear-gradient(hsl(var(--foreground))_50%,hsla(var(--foreground)/0.6)_80%,hsla(var(--foreground)/0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
          // dark mode colors
          "dark:bg-[linear-gradient(hsl(var(--foreground)),hsl(var(--foreground))),linear-gradient(hsl(var(--foreground))_50%,hsla(var(--foreground)/0.6)_80%,hsla(var(--foreground)/0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
          className
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-primary-foreground transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        // before styles
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:[filter:blur(calc(0.8*1rem))]",
        // light mode colors
        "bg-[linear-gradient(hsl(var(--background)),hsl(var(--background))),linear-gradient(hsl(var(--background))_50%,hsla(var(--background)/0.6)_80%,hsla(var(--background)/0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        // dark mode colors
        "dark:bg-[linear-gradient(hsl(var(--foreground)),hsl(var(--foreground))),linear-gradient(hsl(var(--foreground))_50%,hsla(var(--foreground)/0.6)_80%,hsla(var(--foreground)/0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

RainbowButton.displayName = "RainbowButton";
