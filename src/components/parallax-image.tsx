"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Applied to the frame, which is what crops the oversized image inside. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Drift as a percentage of frame height, each way. Keep it small. */
  strength?: number;
}

/**
 * A full-bleed image that drifts slowly inside its frame as it passes.
 *
 * This is the site's one repeated motion idea, not a new trick: the hero photo
 * already moves against the scroll, so extending the same language to the
 * full-bleed photography reads as a house style rather than a pile of
 * unrelated effects. One idea used three times beats three ideas used once.
 *
 * The image layer is inset by the drift distance on both edges so the frame
 * never runs past it. `useTransform` on a scroll position is a binding rather
 * than an animation, so `MotionConfig reducedMotion` does not cover it — this
 * checks the preference itself and holds still.
 */
export const ParallaxImage = ({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  strength = 8,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{
          // Inset by 1.5× the drift, not 1×. A percentage `y` resolves against
          // this layer's own height rather than the frame's, so an 8% drift on
          // a layer that is already 116% of the frame travels 9.28% of the
          // frame — further than a flat 8% inset can cover, and a hairline of
          // page background shows at the extremes of the transit.
          top: `-${strength * 1.5}%`,
          bottom: `-${strength * 1.5}%`,
          ...(reduced ? {} : { y }),
        }}
        className="absolute inset-x-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-center"
        />
      </motion.div>
    </div>
  );
};
