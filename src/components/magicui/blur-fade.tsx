"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animateOnLoad?: boolean;
}

const BlurFade = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  animateOnLoad = false,
}: BlurFadeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // Only the bottom edge is inset. Content rising from below still waits until
  // it is properly on screen, but content sitting at the top of the viewport
  // counts as visible — a symmetric inset hid whatever you landed on when
  // following a hash link straight to a section.
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  // Anything already above the viewport on arrival can never intersect the
  // observer, so it would stay at opacity 0 forever. That is the whole page
  // when you land mid-document via a hash link, a reload, or back/forward.
  // Show those immediately rather than animating something the reader has
  // conceptually already passed.
  const [alreadyPassed, setAlreadyPassed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Only a page that opens partway down can strand content above the
    // viewport. A normal load starts at the top, so skip the work entirely and
    // let the observer do its job.
    if (!window.location.hash && window.scrollY === 0) return;

    // That opening scroll is animated (scroll-behavior: smooth), so geometry is
    // not final for a few hundred ms. Re-read until it settles, then stop for
    // good — a one-shot latch, not an animation loop.
    const deadline = performance.now() + 1200;
    let raf = requestAnimationFrame(function check() {
      if (!el.isConnected) return;
      if (el.getBoundingClientRect().bottom < 0) {
        setAlreadyPassed(true);
        return;
      }
      if (performance.now() < deadline) raf = requestAnimationFrame(check);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const shouldAnimate = animateOnLoad || isInView;

  const variants: Variants = {
    hidden: { y: 8, opacity: 0, filter: "blur(4px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate || alreadyPassed ? "visible" : "hidden"}
      variants={variants}
      transition={
        alreadyPassed ? { duration: 0 } : { delay, duration, ease: "easeOut" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default BlurFade;
