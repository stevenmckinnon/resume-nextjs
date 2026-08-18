"use client";

import { usePastHero } from "@/hooks/usePastHero";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The running index, in the left margin.
 *
 * This replaced a bottom dock of ten icons. The dock held four different kinds
 * of thing at identical weight — destinations, an action, four outbound
 * profiles and a setting — none of them labelled, and it never indicated which
 * section you were in. On a page this tall, position is the one piece of
 * information a persistent nav can give that nothing else on the site does,
 * and it was the one thing the dock did not do.
 *
 * Type rather than glyphs, so it labels itself and needs no hover to be read.
 */

/**
 * Document order, and it has to stay that way — `resolveActive` walks this list
 * top to bottom and stops at the first section still below the reading line.
 *
 * Two omissions against the command palette's list. `#github` is a 109px strip
 * between Projects and Other, deliberately sized to get out of the way; giving
 * it a rail entry equal to Experience argues the opposite. And the labels are
 * shorter, because the rail lives in a ~100px gutter. The palette is where the
 * full names and the search terms belong.
 */
const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "other", label: "Other Job" },
  { id: "contact", label: "Contact" },
];

/** Where in the viewport a section counts as the one being read. */
const READING_LINE = 0.4;

export const SectionIndex = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  /* The Other Job runs its two photographs edge to edge, and --foreground and
     --muted-foreground both assume the page background is behind them. Over a
     lit crowd shot neither token survives, in either theme.

     The first fix here restyled the rail to white on a soft dark vignette,
     which was legible but put a second column of small white caps directly
     against the section's own overlaid heading. So it steps aside instead.
     That section is built as a break in the page's rhythm — it drops the
     240px grid and runs to the edges — and it names itself in 60px type, so
     nothing is lost while the rail is away. */
  const [isOverMedia, setIsOverMedia] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const isVisible = usePastHero();

  /* Geometry per scroll frame rather than an IntersectionObserver band.
     A band fails this page twice: it goes stale in the 900px colophon, where
     nothing intersects and the last-lit section stays lit, and it can miss a
     section shorter than the band itself. Taking the last section whose top has
     crossed the reading line has neither problem — the gaps between sections
     belong to the section above them, and Contact stays lit through the footer.

     Rects are read fresh because the page moves under itself: resume cards
     expand, the project dialog opens, images land. Seven reads with no writes
     between them, on a rAF-throttled motion value, is not worth caching for. */
  const resolve = useCallback(() => {
    const line = window.innerHeight * READING_LINE;
    let current: string | null = null;

    for (const { id } of SECTIONS) {
      const element = document.getElementById(id);
      if (!element) continue;
      if (element.getBoundingClientRect().top > line) break;
      current = id;
    }

    setActiveId(current);

    /* Vertical overlap only. Everything marked data-full-bleed spans the
       viewport horizontally by definition, so the rail's own left offset
       cannot take it out from under one. */
    const rail = navRef.current?.getBoundingClientRect();
    if (!rail) return;

    const media = document.querySelectorAll("[data-full-bleed]");
    let overlapping = false;

    for (const element of media) {
      const rect = element.getBoundingClientRect();
      if (rect.top < rail.bottom && rect.bottom > rail.top) {
        overlapping = true;
        break;
      }
    }

    setIsOverMedia(overlapping);
  }, []);

  useMotionValueEvent(scrollY, "change", resolve);

  /* Covers a reload partway down the page, where no scroll event fires. On a
     frame rather than synchronously, so the first read happens after paint —
     which is also when the rects it measures have stopped moving. */
  useEffect(() => {
    const frame = requestAnimationFrame(resolve);
    return () => cancelAnimationFrame(frame);
  }, [resolve]);

  return (
    <AnimatePresence>
      {isVisible && (
        /* Hidden below xl. At 1280px the 1200px column leaves ~136px of
           gutter, which is the narrowest this rail reads in. Under that the
           command palette is the wayfinding, as it already was. */
        <motion.nav
          ref={navRef}
          aria-label="Sections"
          /* inert as well as invisible: pointer-events alone still leaves the
             links in the tab order and the a11y tree, and focus landing on
             something the reader cannot see is worse than the collision. */
          inert={isOverMedia}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: isOverMedia ? 0 : 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed top-1/2 left-6 z-30 hidden -translate-y-1/2 xl:block",
            isOverMedia && "pointer-events-none",
          )}
        >
          <ul className="flex flex-col gap-3">
            {SECTIONS.map(({ id, label }) => {
              const isActive = id === activeId;

              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group flex items-center gap-2.5 py-0.5 transition-colors",
                      /* Inactive is full --muted-foreground, not a faded one.
                         At /60 these labels measured 2.55:1 against the light
                         background, and 10px text needs 4.5:1. The active item
                         is still unmistakable: it carries --foreground and a
                         full-length accent rule, not just more opacity. */
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {/* scaleX on a fixed-width rule rather than an animated
                        width, so the transition stays on the compositor. */}
                    <span
                      aria-hidden
                      className={cn(
                        "h-px w-5 origin-left transition-[transform,background-color] duration-300 ease-out",
                        isActive
                          ? "bg-primary-accent scale-x-100"
                          : "bg-muted-foreground/40 scale-x-[0.35] group-hover:scale-x-75",
                      )}
                    />
                    <span className="font-mono text-[10px] tracking-[0.16em] whitespace-nowrap uppercase">
                      {label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
