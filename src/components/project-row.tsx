import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { iconMap } from "@/types/resume";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectRowProps {
  title: string;
  description?: string;
  website: string;
  github: string;
  tags: (keyof typeof iconMap)[];
  image?: string;
  /** Flips the image to the right. Alternated by the caller. */
  reversed?: boolean;
}

/**
 * Replaces the uniform two-up card grid. Each project is a wide asymmetric row
 * whose image side alternates, so scrolling the section has a rhythm instead of
 * presenting five identical boxes. The card chrome is gone: the image is the
 * object, and the border only appears on the image itself.
 */
export const ProjectRow = ({
  title,
  description,
  website,
  github,
  tags,
  image,
  reversed = false,
}: ProjectRowProps) => (
  <article className="group grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-12">
    {image && (
      <Link
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "focus-visible:ring-ring/50 relative block aspect-16/10 overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:outline-none",
          reversed && "md:order-2",
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="image-outline pointer-events-none absolute inset-0 rounded-2xl" />
      </Link>
    )}

    <div className={cn("flex flex-col gap-4", reversed && "md:order-1")}>
      <h3 className="text-2xl font-black tracking-tight lg:text-3xl">
        <Link
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-accent inline-flex items-baseline gap-1 transition-colors"
        >
          {title}
          <ArrowUpRight
            className="size-4 self-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </Link>
      </h3>

      {description && (
        <p className="text-muted-foreground max-w-[52ch] text-base/relaxed text-pretty">
          {description}
        </p>
      )}

      {/* Plain text, no chips. Five bordered pills per project across five
          projects was 30-odd boxes competing with the screenshots. */}
      <p className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
        {tags?.map((tag, i) => (
          <span key={tag} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-muted-foreground/30">
                ·
              </span>
            )}
            {tag}
          </span>
        ))}
      </p>

      {github && (
        <Link
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary-accent mt-2 flex w-fit items-center gap-2 text-sm font-semibold transition-colors"
        >
          <Icons.github className="size-4" />
          Source
        </Link>
      )}
    </div>
  </article>
);
