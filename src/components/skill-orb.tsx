import { IconProps } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ComponentType } from "react";

interface SkillOrbProps {
  name: string;
  icon?: ComponentType<IconProps>;
  className?: string;
}

// Skills are read-only labels, not controls, so they carry no hover or press
// affordance — motion here would promise an interaction that doesn't exist.
export const SkillOrb = ({ name, icon: Icon, className }: SkillOrbProps) => (
  <div
    className={cn(
      `border-border/60 bg-card/60 flex items-center gap-2 rounded-md border px-3 py-1.5 backdrop-blur-sm`,
      className,
    )}
  >
    {Icon && <Icon className="text-muted-foreground size-4" />}
    <span className="text-foreground text-sm font-medium">{name}</span>
  </div>
);
