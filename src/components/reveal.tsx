import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

/**
 * Entrance driven entirely by CSS (`.reveal` in globals.css), using a view
 * timeline rather than Framer Motion and an IntersectionObserver.
 *
 * The old version server-rendered `opacity: 0` and relied on JavaScript to undo
 * it: 49 blocks of the page were invisible until hydration, and stayed invisible
 * if a script failed. Here the content is simply visible, and a browser that
 * supports view timelines adds the movement on top. Landing partway down the
 * page needs no special case either, because anything above the viewport is
 * already past the end of its timeline.
 */
export const Reveal = ({
  children,
  className,
  order = 0,
  onLoad = false,
}: {
  children: ReactNode;
  className?: string;
  /** Position within its group. Later items start a little further on. */
  order?: number;
  /** Plays once on arrival, for content already on screen at load. */
  onLoad?: boolean;
}) => (
  <div
    className={cn(onLoad ? "reveal-load" : "reveal", className)}
    style={{ "--reveal-order": order } as CSSProperties}
  >
    {children}
  </div>
);
