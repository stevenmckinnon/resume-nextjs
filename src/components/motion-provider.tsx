"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes `prefers-reduced-motion` actually reach Framer Motion.
 *
 * The `@media (prefers-reduced-motion: reduce)` block in globals.css only
 * overrides CSS `transition-duration` and `animation-duration`. Framer Motion
 * does neither — it writes inline `transform`/`opacity`/`filter` on every
 * frame from its own rAF loop — so every entrance, the navbar slide and the
 * hero stagger ran at full duration for people who had explicitly asked for
 * less. `reducedMotion="user"` disables transform and layout animation while
 * still allowing opacity to cross-fade, so content appears rather than snaps.
 *
 * Scroll-linked `useTransform` bindings are not animations and are not covered
 * by this — those check `useReducedMotion()` at their own call site.
 */
export const MotionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <MotionConfig reducedMotion="user">{children}</MotionConfig>;
