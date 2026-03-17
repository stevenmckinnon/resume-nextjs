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
        "group hover:border-primary relative cursor-pointer border-l-2 border-transparent pl-4 transition-all duration-300",
        isExpanded ? "border-primary" : "border-border/40",
      )}
    >
      <div className="flex items-start gap-4">
        <Avatar className="border-border bg-muted-background dark:bg-foreground size-12 border">
          <AvatarImage
            src={logoUrl}
            alt={altText}
            className="object-cover transition-all duration-300"
          />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-display text-foreground group-hover:text-primary text-lg font-bold transition-colors">
              {href ? (
                <Link
                  href={href}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="decoration-primary underline-offset-4 hover:underline"
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </h3>
            <span className="text-muted-foreground/80 font-mono text-xs">
              {period}
            </span>
          </div>

          {subtitle && (
            <p className="text-muted-foreground font-sans text-sm">
              {subtitle}
            </p>
          )}

          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {badges.map((badge) => (
                <Badge
                  variant="secondary"
                  className="border-border text-muted-foreground bg-transparent px-1 py-0 text-[10px] tracking-wider uppercase"
                  key={badge}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="text-muted-foreground/90 border-border/40 mt-4 border-t pt-4 font-sans text-sm leading-relaxed">
              {description}
            </div>
          </motion.div>
        </div>

        {description && (
          <ChevronRightIcon
            className={cn(
              "text-muted-foreground/50 group-hover:text-primary size-5 transition-transform duration-300",
              isExpanded ? "rotate-90" : "rotate-0",
            )}
          />
        )}
      </div>
    </div>
  );
};
