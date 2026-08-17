"use client";

import { Icons } from "@/components/icons";
import { projectLayoutId, useProjectDialog } from "@/components/project-dialog";
import { ProjectTags } from "@/components/project-tags";
import type { Project } from "@/types/resume";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";

/**
 * The lead project, given the full column width and a 16:9 image.
 *
 * Projects used to be five alternating image-and-text rows, which is the
 * "banal zigzag" pattern: the same move repeated five times, with every
 * project carrying identical visual weight whether or not it deserved it.
 * One feature plus a grid says which one matters.
 */
export const ProjectFeature = ({ project }: { project: Project }) => {
  const { open, active } = useProjectDialog();
  const titleId = useId();
  const isOpen = active?.name === project.name;

  return (
    <article className="group">
      <button
        type="button"
        onClick={() => open(project)}
        aria-labelledby={titleId}
        aria-haspopup="dialog"
        className="focus-visible:ring-ring/50 block w-full cursor-pointer text-left focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
      >
        {project.image && (
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl">
            {!isOpen && (
              <motion.div
                layoutId={projectLayoutId(project.name)}
                className="absolute inset-0"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </motion.div>
            )}
            <div className="image-outline pointer-events-none absolute inset-0 rounded-2xl" />
          </div>
        )}

        <h3
          id={titleId}
          className="group-hover:text-primary-accent mt-6 inline-flex items-baseline gap-1.5 text-3xl font-black tracking-tight transition-colors md:mt-8 lg:text-4xl"
        >
          {project.name}
          <ArrowUpRight
            className="size-5 self-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </h3>
      </button>

      <div className="mt-3 flex max-w-[60ch] flex-col gap-3">
        {project.description && (
          <p className="text-muted-foreground text-base/relaxed text-pretty md:text-lg/relaxed">
            {project.description}
          </p>
        )}

        <ProjectTags tags={project.tags ?? []} className="mt-1" />

        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href={project.website}
            {...(project.website.startsWith("/")
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" })}
            className="text-muted-foreground hover:text-primary-accent flex w-fit items-center gap-1.5 text-sm font-semibold transition-colors"
          >
            Visit
            <ArrowUpRight className="size-4" strokeWidth={2} />
          </Link>
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary-accent flex w-fit items-center gap-2 text-sm font-semibold transition-colors"
            >
              <Icons.github className="size-4" />
              Source
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
