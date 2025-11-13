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
  const commonClasses = cn(
    "group relative inline-flex h-11 items-center justify-center rounded-full px-8 py-2 font-medium transition-all duration-300",
    "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    className
  );

  if (href) {
    return (
      <Link href={href} className={commonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} className={commonClasses} {...props}>
      {children}
    </button>
  );
});

RainbowButton.displayName = "RainbowButton";
