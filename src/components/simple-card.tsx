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
    <Link href={href || "#"} className="block">
      <div className="flex items-center gap-4">
        <Avatar className="border size-12 bg-muted-background dark:bg-foreground">
          <AvatarImage src={logoUrl} alt={altText} className="object-cover" />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:justify-between">
            <div>
              <p className="font-semibold leading-none text-sm sm:text-base">
                {title}
              </p>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <p className="text-sm text-muted-foreground sm:text-right tabular-nums">
              {period}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
