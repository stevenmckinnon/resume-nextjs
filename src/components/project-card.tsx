"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ExternalLinkIcon,
  Github,
  Receipt,
  Camera,
  Package,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

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
  icon?: string;
}

export const ProjectCard = ({
  logoUrl,
  altText,
  title,
  description,
  website,
  github,
  icon,
}: ProjectCardProps) => {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="border size-12 bg-muted">
            {logoUrl ? (
              <AvatarImage
                src={logoUrl}
                alt={altText}
                className="object-cover"
              />
            ) : null}
            <AvatarFallback>
              {IconComponent ? (
                <IconComponent className="size-6" />
              ) : (
                altText[0]
              )}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
              <div className="flex items-center gap-2">
                {website && (
                  <Link
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`Visit ${title} website`}
                    onClick={(e) => e.stopPropagation()}
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      {description && (
        <CardContent className="text-xs/normal sm:text-sm/normal whitespace-pre-wrap flex-grow">
          {description}
        </CardContent>
      )}
    </Card>
  );
};
