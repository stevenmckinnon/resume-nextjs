"use client";

import { projectLayoutId, useProjectDialog } from "@/components/project-dialog";
import { ProjectLinks, ProjectPlatform } from "@/components/project-links";
import { ProjectTags } from "@/components/project-tags";
import type { Project } from "@/types/resume";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useId } from "react";

/**
 * A supporting project in the grid below the feature. Same parts as
 * `ProjectFeature`, one step down in scale, and no card chrome: the image is
 * the object and the spacing does the grouping.
 *
 * The card opens a dialog; the links below it go where they say they go. That
 * split matters: making the whole card a link to the live site meant the
 * screenshot was never legible at any size, and making the whole card a button
 * would have taken the real URLs out of the page entirely.
 */
export const ProjectTile = ({ project }: { project: Project }) => {
  const { open, active } = useProjectDialog();
  const titleId = useId();
  const isOpen = active?.name === project.name;

  return (
    <article className="group flex flex-col">
      <button
        type="button"
        onClick={() => open(project)}
        aria-labelledby={titleId}
        aria-haspopup="dialog"
        className="focus-visible:ring-ring/50 block w-full cursor-pointer text-left focus-visible:rounded-lg focus-visible:ring-2 focus-visible:outline-none"
      >
        {project.image && (
          <div className="short:hidden relative aspect-16/10 w-full overflow-hidden rounded-lg">
            {/* Only one element may carry a given layoutId at a time. While
                this project's dialog is open the dialog owns the id, and the
                tile leaves a same-sized hole so the grid doesn't reflow. */}
            {!isOpen && (
              <motion.div
                layoutId={projectLayoutId(project.name)}
                className="absolute inset-0"
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </motion.div>
            )}
            <div className="image-outline pointer-events-none absolute inset-0 rounded-lg" />
          </div>
        )}

        <ProjectPlatform
          platform={project.platform}
          className="short:mt-0 mt-5"
        />
        <h3
          id={titleId}
          className="group-hover:text-primary-accent font-display mt-1 inline-flex items-baseline gap-1.5 text-2xl font-bold tracking-tight transition-colors lg:text-3xl"
        >
          {project.name}
          <ArrowUpRight
            className="size-4 self-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </h3>
      </button>

      {project.description && (
        <p className="text-muted-foreground mt-2 max-w-[48ch] text-sm/relaxed text-pretty">
          {project.description}
        </p>
      )}

      <ProjectTags tags={project.tags ?? []} className="short:hidden mt-3" />

      <ProjectLinks project={project} className="mt-4" />
    </article>
  );
};
