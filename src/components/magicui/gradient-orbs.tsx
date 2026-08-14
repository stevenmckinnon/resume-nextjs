"use client";

import { cn } from "@/lib/utils";

interface GradientOrbsProps {
  className?: string;
}

/**
 * One orb, not three.
 *
 * The other two were built from `--secondary` and `--accent`, which in this
 * palette are neutrals — so they were painting grey onto a grey page. Measured
 * against the page background before their own 60–80px blur, they sat 3 and 2
 * RGB units away in light mode and 7 and 3 in dark: below the threshold where
 * a difference is visible at all. They cost two fixed, infinitely animating
 * `will-change: transform` layers to render nothing.
 *
 * CSS animation rather than framer-motion, for iOS performance.
 */
export const GradientOrbs = ({ className }: GradientOrbsProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div className="animate-orb-1 from-primary/20 via-primary/5 absolute -top-[40%] -right-[20%] h-[60vh] w-[60vh] rounded-full bg-linear-to-br to-transparent blur-[80px] will-change-transform" />
    </div>
  );
};
