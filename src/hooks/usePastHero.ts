"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useState } from "react";

/**
 * True once the reader has left the hero.
 *
 * Both persistent chrome elements stay hidden until then, for the same reason:
 * the hero already carries "Download CV", "Get in touch" and the social links,
 * and the section index has nothing to point at while you are still above the
 * first section. Chrome that duplicates what is already on screen is clutter.
 */
export const usePastHero = (threshold = 0.6) => {
  const { scrollY } = useScroll();
  const [isPast, setIsPast] = useState(false);

  const check = useCallback(
    (latest: number) => setIsPast(latest > window.innerHeight * threshold),
    [threshold],
  );

  useMotionValueEvent(scrollY, "change", check);

  // Covers a reload partway down the page, where no scroll event fires.
  useEffect(() => {
    const frame = requestAnimationFrame(() => check(scrollY.get()));
    return () => cancelAnimationFrame(frame);
  }, [check, scrollY]);

  return isPast;
};
