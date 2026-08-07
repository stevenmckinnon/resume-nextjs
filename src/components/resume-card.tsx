"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import {
  useId,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string | string[];
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
  const descriptionId = useId();

  const handleClick = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!description || e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={description ? "button" : undefined}
      tabIndex={description ? 0 : undefined}
      aria-expanded={description ? isExpanded : undefined}
      aria-controls={description ? descriptionId : undefined}
      className={cn(
        `group hover:border-primary-accent focus-visible:ring-ring/50 relative border-l-2 border-transparent pl-4 transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none`,
        description && "cursor-pointer",
        isExpanded ? "border-primary-accent" : "border-border/40",
      )}
    >
      <div className="flex items-start gap-4">
        <Avatar className="bg-muted-foreground dark:bg-foreground size-12">
          <AvatarImage src={logoUrl} alt={altText} className="object-cover" />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-foreground group-hover:text-primary-accent text-lg font-bold transition-colors">
              {href ? (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
        </div>

        {description && (
          <ChevronRightIcon
            className={cn(
              `text-muted-foreground/50 group-hover:text-primary-accent size-5 transition-transform duration-300`,
              isExpanded ? "rotate-90" : "rotate-0",
            )}
          />
        )}
      </div>

      {/* Sits outside the header row so it clears the avatar's 64px offset.
          On mobile that offset costs a fifth of the available measure; from
          sm up there is room to spare, so it realigns under the title. */}
      <motion.div
        id={descriptionId}
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="overflow-hidden sm:pl-16"
        aria-hidden={!isExpanded}
      >
        <div className="border-border/40 text-muted-foreground/90 mt-4 border-t pt-4 font-sans text-sm/relaxed">
          {Array.isArray(description) ? (
            // Rule above stays full-bleed; the prose is capped so the wide
            // desktop column doesn't push lines past a readable measure.
            <ul className="max-w-[68ch] space-y-2">
              {description.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="bg-primary-accent/70 mt-2 size-1 shrink-0 rounded-full"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            description
          )}
        </div>
      </motion.div>
    </div>
  );
};
