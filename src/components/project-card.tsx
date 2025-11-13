"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import useBreakpoint from "@/hooks/useBreakpoints";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ChevronRightIcon,
  ExternalLinkIcon,
  Github,
  Receipt,
  Camera,
  Package,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState, type MouseEvent as ReactMouseEvent } from "react";

const iconMap: Record<string, LucideIcon> = {
  receipt: Receipt,
  camera: Camera,
  package: Package,
};

interface ProjectCardProps {
  logoUrl?: string;
  altText: string;
  title: string;
  description?: string;
  website?: string;
  github?: string;
  defaultExpanded?: boolean;
  index?: number;
  icon?: string;
}

const getDefaultExpanded = (
  isAboveMd: boolean,
  defaultExpanded: boolean,
  index?: number
) => {
  if (index === 0 && !isAboveMd) {
    return true;
  }
  return isAboveMd ? defaultExpanded : false;
};

export const ProjectCard = ({
  logoUrl,
  altText,
  title,
  description,
  website,
  github,
  defaultExpanded = false,
  index,
  icon,
}: ProjectCardProps) => {
  const { isAboveMd } = useBreakpoint("md");
  const [isExpanded, setIsExpanded] = useState(
    getDefaultExpanded(isAboveMd, defaultExpanded, index)
  );

  const handleCardClick = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (description) {
      setIsExpanded(!isExpanded);
    }
  };

  const primaryLink = website || github || "#";
  const hasMultipleLinks = website && github;
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div className="block mb-8 sm:mb-5">
      <Card
        className={cn("flex", description && "cursor-pointer")}
        onClick={handleCardClick}
      >
        <div className="flex-none">
          <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
            {logoUrl ? (
              <AvatarImage src={logoUrl} alt={altText} className="object-cover" />
            ) : null}
            <AvatarFallback>
              {IconComponent ? (
                <IconComponent className="size-6" />
              ) : (
                altText[0]
              )}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex flex-col-reverse items-start gap-x-2 text-base sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                  {title}
                  {description && (
                    <ChevronRightIcon
                      className={cn(
                        "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 ml-1",
                        isExpanded ? "rotate-90" : "rotate-0"
                      )}
                    />
                  )}
                </h3>
              </div>
              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {hasMultipleLinks && (
                  <>
                    {website && (
                      <Link
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`Visit ${title} website`}
                      >
                        <ExternalLinkIcon className="size-4" />
                      </Link>
                    )}
                    {github && (
                      <Link
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`View ${title} on GitHub`}
                      >
                        <Github className="size-4" />
                      </Link>
                    )}
                  </>
                )}
                {!hasMultipleLinks && (
                  <Link
                    href={primaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {website ? "Visit" : "View on GitHub"}
                    <ExternalLinkIcon className="size-3" />
                  </Link>
                )}
              </div>
            </div>
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 pt-2 border-t border-solid border-[hsl(var(--border)] text-xs/normal sm:text-sm/normal whitespace-pre-wrap px-6 pb-4"
            >
              {description}
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
};

