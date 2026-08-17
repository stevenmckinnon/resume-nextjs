"use client";

import { Icons } from "@/components/icons";
import { ProjectTags } from "@/components/project-tags";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/resume";
import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useMemo, useRef, useState } from "react";

/**
 * Shared-layout id for the screenshot. The tile and the dialog render the same
 * id, so Framer treats them as one element and flies it between the two boxes
 * instead of cross-fading a pair of images.
 */
export const projectLayoutId = (name: string) => `project-image-${name}`;

type ProjectDialogApi = {
  /** The project whose dialog is open, or null. */
  active: Project | null;
  open: (project: Project) => void;
  close: () => void;
};

const ProjectDialogContext = createContext<ProjectDialogApi | null>(null);

export function useProjectDialog() {
  const context = useContext(ProjectDialogContext);
  if (!context) {
    throw new Error(
      "useProjectDialog must be used inside a <ProjectDialogProvider>",
    );
  }
  return context;
}

/**
 * The expand animation is a spring rather than a duration. A screenshot
 * travelling several hundred pixels and roughly doubling in size on a linear
 * ease reads as a slide; the overshoot-free spring reads as the object being
 * picked up, which is the whole point of morphing it rather than fading it.
 */
const MORPH_TRANSITION = {
  type: "spring",
  duration: 0.45,
  bounce: 0.08,
} as const;

export function ProjectDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<Project | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const api = useMemo<ProjectDialogApi>(
    () => ({
      active,
      open: (project) => setActive(project),
      close: () => setActive(null),
    }),
    [active],
  );

  const details = active?.details;

  return (
    <ProjectDialogContext.Provider value={api}>
      {children}

      <Dialog.Root
        open={active !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setActive(null);
        }}
      >
        {/* Base UI unmounts the popup the moment it closes, which would cut
            the exit morph off at the first frame. `keepMounted` on the Portal
            plus AnimatePresence hands the mount lifecycle to Framer, which is
            the arrangement Base UI's own animation guide prescribes. */}
        <AnimatePresence>
          {active && (
            <Dialog.Portal keepMounted>
              <Dialog.Backdrop
                render={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                }
                className="bg-background/70 fixed inset-0 z-50 backdrop-blur-sm"
              />

              <Dialog.Viewport className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain p-4 py-[6vh]">
                <Dialog.Popup
                  // Without this, focus lands on the first tabbable thing in
                  // the popup — the "Visit the site" link — and a screen
                  // reader opens on "link" with no idea what was expanded.
                  // Close is the conventional entry point and sits beside the
                  // title.
                  initialFocus={closeRef}
                  render={
                    <motion.div
                      // No enter/exit transform of its own. The screenshot
                      // inside carries the movement, and a shell that also
                      // scales makes the image appear to move twice.
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  }
                  className="border-border/60 bg-card relative w-full max-w-3xl overflow-hidden rounded-2xl border shadow-2xl outline-none"
                >
                  <motion.div
                    layoutId={projectLayoutId(active.name)}
                    transition={MORPH_TRANSITION}
                    className="relative aspect-16/10 w-full overflow-hidden"
                  >
                    {active.image && (
                      <Image
                        src={active.image}
                        alt={active.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover object-center"
                      />
                    )}
                  </motion.div>

                  {/* Fades in after the morph has largely settled. Bringing the
                      text in at the same time as a moving, resizing image gives
                      the eye two things to track at once. */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.2 }}
                    className="flex flex-col gap-5 p-6 md:p-8"
                  >
                    <div className="flex flex-col gap-3">
                      <Dialog.Title className="text-2xl font-black tracking-tight md:text-3xl">
                        {active.name}
                      </Dialog.Title>

                      <Dialog.Description className="text-muted-foreground max-w-[58ch] text-base/relaxed text-pretty">
                        {details?.standfirst ?? active.description}
                      </Dialog.Description>
                    </div>

                    {(details?.role || details?.year) && (
                      <dl className="text-muted-foreground flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs tracking-widest uppercase">
                        {details.role && (
                          <div className="flex gap-2">
                            <dt>Role</dt>
                            <dd className="text-foreground/90">
                              {details.role}
                            </dd>
                          </div>
                        )}
                        {details.year && (
                          <div className="flex gap-2">
                            <dt>Year</dt>
                            <dd className="text-foreground/90">
                              {details.year}
                            </dd>
                          </div>
                        )}
                      </dl>
                    )}

                    {details?.sections?.map((section) => (
                      <section
                        key={section.heading}
                        className="flex flex-col gap-2"
                      >
                        <h3 className="text-foreground text-sm font-black tracking-widest uppercase">
                          {section.heading}
                        </h3>
                        <div className="text-muted-foreground flex max-w-[62ch] flex-col gap-3 text-base/relaxed text-pretty">
                          {section.body.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                      </section>
                    ))}

                    <ProjectTags tags={active.tags ?? []} />

                    <div className="border-border/40 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-5">
                      <Link
                        href={active.website}
                        {...(active.website.startsWith("/")
                          ? {}
                          : { target: "_blank", rel: "noopener noreferrer" })}
                        className="text-foreground hover:text-primary-accent flex w-fit items-center gap-1.5 text-sm font-semibold transition-colors"
                      >
                        Visit the site
                        <ArrowUpRight className="size-4" strokeWidth={2} />
                      </Link>
                      {active.github && (
                        <Link
                          href={active.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary-accent flex w-fit items-center gap-2 text-sm font-semibold transition-colors"
                        >
                          <Icons.github className="size-4" />
                          Source
                        </Link>
                      )}
                    </div>
                  </motion.div>

                  <Dialog.Close
                    ref={closeRef}
                    className={cn(
                      "absolute top-4 right-4 flex size-9 items-center justify-center rounded-full",
                      // The close button sits on the photograph, so it carries
                      // its own scrim rather than relying on whatever happens
                      // to be in that corner of the screenshot.
                      "bg-background/70 text-foreground backdrop-blur-md",
                      "hover:bg-background transition-colors",
                      "focus-visible:ring-ring/50 cursor-pointer focus-visible:ring-2 focus-visible:outline-none",
                    )}
                  >
                    <X className="size-4" strokeWidth={2.5} />
                    <span className="sr-only">Close</span>
                  </Dialog.Close>
                </Dialog.Popup>
              </Dialog.Viewport>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </ProjectDialogContext.Provider>
  );
}
