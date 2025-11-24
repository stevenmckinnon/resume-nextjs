"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      {/* Primary orb */}
      <motion.div
        className="from-primary/30 via-primary/10 absolute -top-[40%] -right-[20%] h-[80vh] w-[80vh] rounded-full bg-linear-to-br to-transparent blur-[120px]"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary orb */}
      <motion.div
        className="from-secondary/20 via-secondary/5 absolute -bottom-[30%] -left-[20%] h-[70vh] w-[70vh] rounded-full bg-linear-to-tr to-transparent blur-[100px]"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Accent orb */}
      <motion.div
        className="from-accent/15 to-primary/10 absolute top-1/2 left-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r via-transparent blur-[80px]"
        animate={{
          rotate: [0, 360],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
