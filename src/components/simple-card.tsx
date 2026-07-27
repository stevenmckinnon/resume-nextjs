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
    <Link
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="border-border/50 bg-card hover:border-primary flex items-center gap-4 rounded-2xl border p-4 transition-colors duration-300">
        <Avatar className="bg-muted-foreground dark:bg-foreground size-12">
          <AvatarImage src={logoUrl} alt={altText} className="object-cover" />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h3 className="group-hover:text-primary truncate text-base font-bold transition-colors">
                {title}
              </h3>
              <span className="text-muted-foreground shrink-0 font-mono text-xs">
                {period}
              </span>
            </div>
            {subtitle && (
              <p className="text-muted-foreground truncate font-sans text-sm">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
