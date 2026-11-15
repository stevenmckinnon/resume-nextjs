import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/resume";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const linkClass =
  "text-muted-foreground hover:text-primary-accent flex min-h-6 w-fit items-center gap-1.5 py-2 text-sm font-semibold transition-colors";

/**
 * The primary link plus Source, shared by every project layout. Internal
 * paths (the Log Dumper demo) stay in the tab; everything else opens a new
 * one. Closed-source projects have no `github`, so Source is skipped rather
 * than pointing somewhere private.
 */
export const ProjectLinks = ({
  project,
  className,
}: {
  project: Pick<Project, "name" | "website" | "github" | "linkLabel">;
  className?: string;
}) => {
  const label = project.linkLabel ?? "Visit";
  return (
    <div
      className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}
    >
      <Link
        href={project.website}
        {...(project.website.startsWith("/")
          ? {}
          : { target: "_blank", rel: "noopener noreferrer" })}
        aria-label={`${project.name}: ${label}`}
        className={linkClass}
      >
        {label}
        <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
      </Link>
      {project.github && (
        <Link
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name}: source on GitHub`}
          className={cn(linkClass, "gap-2")}
        >
          <Icons.github className="size-4" />
          Source
        </Link>
      )}
    </div>
  );
};

/** "macOS", "Web" and so on, in the same mono voice as the tags. */
export const ProjectPlatform = ({
  platform,
  className,
}: {
  platform?: string;
  className?: string;
}) =>
  platform ? (
    // A span, not a p: it sits inside the tile's button, which only allows
    // phrasing content.
    <span
      className={cn(
        "text-primary-accent block font-mono text-xs tracking-wide uppercase",
        className,
      )}
    >
      {platform}
    </span>
  ) : null;
