"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useState, type MouseEvent as ReactMouseEvent } from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  index?: number;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  index,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  const handleClick = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "rounded-lg border border-primary/50 bg-accent/5 text-card-foreground shadow-sm p-4 space-y-4 cursor-pointer transition-all duration-300 hover:shadow-md",
        isExpanded ? "scale-[1.01] shadow-md bg-card" : "hover:bg-accent/50"
      )}
    >
      <div className="flex items-center space-x-4 mb-0!">
        <Avatar className="border size-12 bg-muted-background dark:bg-foreground">
          <AvatarImage src={logoUrl} alt={altText} className="object-cover" />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={href || "#"}
              className="font-semibold text-sm sm:text-base"
              onClick={(e) => e.stopPropagation()}
            >
              {title}
            </Link>
            <div className="text-xs sm:text-sm text-muted-foreground sm:text-right">
              {period}
            </div>
          </div>
          {subtitle && (
            <div className="font-sans text-xs text-muted-foreground">
              {subtitle}
            </div>
          )}
        </div>
        {description && (
          <ChevronRightIcon
            className={cn(
              "size-4 transition-transform duration-300",
              isExpanded ? "rotate-90" : "rotate-0"
            )}
          />
        )}
      </div>

      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {badges.map((badge) => (
            <Badge
              variant="secondary"
              className="align-middle text-xs"
              key={badge}
            >
              {badge}
            </Badge>
          ))}
        </div>
      )}

      {description && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? "auto" : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="text-xs/normal sm:text-sm/normal whitespace-pre-wrap overflow-hidden"
        >
          <div className="pt-4">{description}</div>
        </motion.div>
      )}
    </div>
  );
};
