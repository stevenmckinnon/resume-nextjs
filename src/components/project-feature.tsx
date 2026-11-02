"use client";

import { Icons } from "@/components/icons";
import { projectLayoutId, useProjectDialog } from "@/components/project-dialog";
import { ProjectTags } from "@/components/project-tags";
import type { Project } from "@/types/resume";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * The lead project: the picture uncropped, with its name and links beside it, so
 * the whole entry fits on one laptop screen. Stacked full width, the picture
 * alone was taller than the viewport and pushed the title out of sight.
 *
 * Projects used to be five alternating image-and-text rows, which is the
 * "banal zigzag" pattern: the same move repeated five times, with every
 * project carrying identical visual weight whether or not it deserved it.
 * One feature plus a grid says which one matters.
 *
 * The title's button is stretched over the entry, which keeps one tab stop for
 * opening the dialog. The prose and links sit above it so they stay usable.
 */
export const ProjectFeature = ({ project }: { project: Project }) => {
  const { open, active } = useProjectDialog();
  const isOpen = active?.name === project.name;

  return (
    <article className="group short:block relative grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-12 md:items-center">
      {project.image && (
        <div className="short:hidden relative aspect-4/3 w-full overflow-hidden rounded-lg md:col-span-7 md:max-h-[calc(100dvh-6.5rem)]">
          {!isOpen && (
            <motion.div
              layoutId={projectLayoutId(project.name)}
              className="absolute inset-0"
            >
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </motion.div>
          )}
          <div className="image-outline pointer-events-none absolute inset-0 rounded-lg" />
        </div>
      )}

      <div className="flex flex-col gap-3 md:col-span-5">
        <h3 className="font-display short:text-2xl short:lg:text-3xl text-4xl font-bold tracking-tight lg:text-5xl">
          <button
            type="button"
            onClick={() => open(project)}
            aria-haspopup="dialog"
            className="group-hover:text-primary-accent focus-visible:after:ring-ring/50 inline-flex cursor-pointer items-baseline gap-1.5 text-left tracking-tight transition-colors after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none focus-visible:after:ring-2"
          >
            {project.name}
            <ArrowUpRight
              className="size-5 self-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </h3>

        {project.description && (
          <p className="text-muted-foreground short:text-sm/relaxed short:md:text-sm/relaxed relative z-10 max-w-[60ch] text-base/relaxed text-pretty md:text-lg/relaxed">
            {project.description}
          </p>
        )}

        <ProjectTags
          tags={project.tags ?? []}
          className="short:hidden relative z-10 mt-1"
        />

        <div className="relative z-10 mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href={project.website}
            {...(project.website.startsWith("/")
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" })}
            className="text-muted-foreground hover:text-primary-accent flex min-h-6 w-fit items-center gap-1.5 py-2 text-sm font-semibold transition-colors"
          >
            Visit
            <ArrowUpRight className="size-4" strokeWidth={2} />
          </Link>
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary-accent flex min-h-6 w-fit items-center gap-2 py-2 text-sm font-semibold transition-colors"
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
