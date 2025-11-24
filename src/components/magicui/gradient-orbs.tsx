"use client";

import { cn } from "@/lib/utils";

interface GradientOrbsProps {
  className?: string;
}

export const GradientOrbs = ({ className }: GradientOrbsProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {/* Primary orb - using CSS animation instead of framer-motion for better iOS performance */}
      <div className="animate-orb-1 from-primary/20 via-primary/5 absolute -top-[40%] -right-[20%] h-[60vh] w-[60vh] rounded-full bg-linear-to-br to-transparent blur-[80px] will-change-transform" />

      {/* Secondary orb */}
      <div className="animate-orb-2 from-secondary/15 via-secondary/5 absolute -bottom-[30%] -left-[20%] h-[50vh] w-[50vh] rounded-full bg-linear-to-tr to-transparent blur-[60px] will-change-transform" />

      {/* Accent orb */}
      <div className="animate-orb-3 from-accent/10 to-primary/5 absolute top-1/2 left-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r via-transparent blur-[50px] will-change-transform" />
    </div>
  );
};
