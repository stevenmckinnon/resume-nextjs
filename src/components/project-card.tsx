"use client";
import { iconMap } from "@/types/resume";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description?: string;
  website: string;
  github: string;
  tags: (keyof typeof iconMap)[];
  image?: string;
}

export const ProjectCard = ({
  title,
  description,
  website,
  github,
  tags,
  image,
}: ProjectCardProps) => {
  return (
    <div className="group border-border bg-card hover:border-primary relative flex h-full flex-col overflow-hidden rounded-md border transition-all duration-300 hover:shadow-2xl">
      {/* Image Section */}
      {image && (
        <div className="border-border group-hover:border-primary/50 relative aspect-4/3 overflow-hidden border-b transition-colors">
          <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer"
          >
            <div className="bg-primary/20 pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-multiply transition-opacity group-hover:opacity-100" />
            <Image
              src={image}
              alt={title}
              width={800}
              height={450}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
            />
          </Link>
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-1 flex-col space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="font-display group-hover:text-primary text-2xl font-bold tracking-tight transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-muted-foreground font-sans text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {tags?.map((tag) => {
            const Icon = iconMap[tag];
            return (
              <div
                key={tag}
                className="text-muted-foreground border-border bg-muted/50 flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-xs"
              >
                {Icon && <Icon className="size-3" />}
                <span>{tag}</span>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="border-border/50 mt-4 flex items-center gap-3 border-t pt-4">
          {website && (
            <Link
              href={website}
              target="_blank"
              className="hover:text-primary flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-colors"
            >
              <ExternalLinkIcon className="size-4" />
              Live Demo
            </Link>
          )}
          {github && (
            <Link
              href={github}
              target="_blank"
              className="hover:text-primary ml-auto flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-colors"
            >
              <GitHubLogoIcon className="size-4" />
              Source
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
