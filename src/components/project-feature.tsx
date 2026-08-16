import { Icons } from "@/components/icons";
import { ProjectTags } from "@/components/project-tags";
import { iconMap } from "@/types/resume";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectFeatureProps {
  title: string;
  description?: string;
  website: string;
  github: string;
  tags: (keyof typeof iconMap)[];
  image?: string;
}

/**
 * The lead project, given the full column width and a 16:9 image.
 *
 * Projects used to be five alternating image-and-text rows, which is the
 * "banal zigzag" pattern: the same move repeated five times, with every
 * project carrying identical visual weight whether or not it deserved it.
 * One feature plus a grid says which one matters.
 */
export const ProjectFeature = ({
  title,
  description,
  website,
  github,
  tags,
  image,
}: ProjectFeatureProps) => (
  <article className="group">
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
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="image-outline pointer-events-none absolute inset-0 rounded-2xl" />
      </Link>
    )}

    <div className="mt-6 flex max-w-[60ch] flex-col gap-3 md:mt-8">
      <h3 className="text-3xl font-black tracking-tight lg:text-4xl">
        <Link
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-accent inline-flex items-baseline gap-1.5 transition-colors"
        >
          {title}
          <ArrowUpRight
            className="size-5 self-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </Link>
      </h3>

      {description && (
        <p className="text-muted-foreground text-base/relaxed text-pretty md:text-lg/relaxed">
          {description}
        </p>
      )}

      <ProjectTags tags={tags} className="mt-1" />

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
