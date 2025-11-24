"use client";

import { cn } from "@/lib/utils";
import { IconProps } from "@/components/icons";
import { motion } from "framer-motion";
import { ComponentType, useState } from "react";

interface SkillOrbProps {
  name: string;
  icon?: ComponentType<IconProps>;
  className?: string;
  index?: number;
}

export const SkillOrb = ({
  name,
  icon: Icon,
  className,
  index = 0,
}: SkillOrbProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.05,
      }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("group relative cursor-default", className)}
    >
      {/* Main orb */}
      <div className="border-border/50 bg-card/80 hover:border-primary hover:bg-card relative flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]">
        {/* Animated ring on hover */}
        <motion.div
          className="border-primary pointer-events-none absolute -inset-1 rounded-full border-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Icon */}
        {Icon && (
          <Icon className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
        )}

        {/* Name */}
        <span className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
          {name}
        </span>
      </div>
    </motion.div>
  );
};
