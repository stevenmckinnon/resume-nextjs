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
    <div className="group relative rounded-md overflow-hidden flex flex-col h-full border border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-2xl">
      {/* Image Section */}
      {image && (
        <div className="relative overflow-hidden aspect-video border-b border-border group-hover:border-primary/50 transition-colors">
          <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer"
          >
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-multiply pointer-events-none" />
            <Image
              src={image}
              alt={title}
              width={800}
              height={450}
              className="object-cover w-full h-full md:grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          </Link>
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-display font-bold text-2xl tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-muted-foreground font-sans text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {tags?.map((tag) => {
            const Icon = iconMap[tag];
            return (
              <div
                key={tag}
                className="flex items-center gap-1 text-xs rounded-md font-mono text-muted-foreground border border-border px-2 py-1 bg-muted/50"
              >
                {Icon && <Icon className="size-3" />}
                <span>{tag}</span>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border/50">
          {website && (
            <Link
              href={website}
              target="_blank"
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors"
            >
              <ExternalLinkIcon className="size-4" />
              Live Demo
            </Link>
          )}
          {github && (
            <Link
              href={github}
              target="_blank"
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors ml-auto"
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
