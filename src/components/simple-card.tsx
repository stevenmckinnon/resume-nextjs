"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface SimpleCardProps {
  href?: string;
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  period: string;
}

export const SimpleCard = ({
  href,
  logoUrl,
  altText,
  title,
  subtitle,
  period,
}: SimpleCardProps) => {
  return (
    <Link href={href || "#"} className="block group">
      <div className="flex rounded-md items-center gap-4 p-4 border border-border/50 bg-card hover:border-primary transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(var(--primary))]">
        <Avatar className="border size-12 bg-muted-background dark:bg-foreground">
          <AvatarImage
            src={logoUrl}
            alt={altText}
            className="object-cover transition-all duration-300"
          />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
              <h4 className="font-display font-bold text-base truncate group-hover:text-primary transition-colors">
                {title}
              </h4>
              <span className="text-xs font-mono text-muted-foreground shrink-0">
                {period}
              </span>
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground truncate font-sans">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
