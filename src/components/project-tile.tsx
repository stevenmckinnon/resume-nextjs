import { Icons } from "@/components/icons";
import { ProjectTags } from "@/components/project-tags";
import { iconMap } from "@/types/resume";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectTileProps {
  title: string;
  description?: string;
  website: string;
  github: string;
  tags: (keyof typeof iconMap)[];
  image?: string;
}

/**
 * A supporting project in the grid below the feature. Same parts as
 * `ProjectFeature`, one step down in scale, and no card chrome: the image is
 * the object and the spacing does the grouping.
 */
export const ProjectTile = ({
  title,
  description,
  website,
  github,
  tags,
  image,
}: ProjectTileProps) => (
  <article className="group flex flex-col">
    {image && (
      <Link
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-visible:ring-ring/50 relative block aspect-16/10 overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
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

    <h3 className="mt-5 text-xl font-black tracking-tight lg:text-2xl">
      <Link
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary-accent inline-flex items-baseline gap-1.5 transition-colors"
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
      <p className="text-muted-foreground mt-2 max-w-[48ch] text-sm/relaxed text-pretty">
        {description}
      </p>
    )}

    <ProjectTags tags={tags} className="mt-3" />

    {github && (
      <Link
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary-accent mt-4 flex w-fit items-center gap-2 text-sm font-semibold transition-colors"
      >
        <Icons.github className="size-4" />
        Source
      </Link>
    )}
  </article>
);
