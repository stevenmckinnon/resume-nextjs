"use client";

import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/** The wordmark only has room in the header from here up. */
const DOCKING_QUERY =
  "(min-width: 1280px) and (prefers-reduced-motion: no-preference)";

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(DOCKING_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

type Flight = {
  fontSize: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  scale: number;
  /** Scroll distance the flight takes, in px. */
  distance: number;
};

/**
 * Works out the path from the hero name to the wordmark's place in the header.
 * Both are read as they sit in the page, so the flight starts exactly over the
 * real heading wherever the fitted font size has landed.
 */
export function measureFlight(
  name: { left: number; top: number; height: number; fontSize: number },
  slot: { left: number; top: number; height: number; fontSize: number },
): Flight {
  const scale = slot.fontSize / name.fontSize;

  return {
    fontSize: name.fontSize,
    from: { x: name.left, y: name.top },
    // Centred on the slot's line, since the name's line height is much tighter.
    to: {
      x: slot.left,
      y: slot.top + (slot.height - name.height * scale) / 2,
    },
    scale,
    distance: name.height * 1.4,
  };
}

// Shrinks early and rises late, so the name stays under the bar until it is small
// enough to clear the nav links, then lifts into its place. A straight line runs
// it across them.
const shrink = (t: number) => 1 - (1 - t) ** 3;
const rise = (t: number) => t ** 4;

/**
 * The hero name shrinks into the header as you scroll, so the name only ever
 * appears once. A broadcast title moving to its corner, rather than a second
 * copy sitting in the bar from the start.
 *
 * The moving copy is `position: fixed` and purely decorative. Pinning the real
 * heading to the header would mean countering the scroll in JavaScript, which
 * always jitters. The heading stays in the page for screen readers, invisible
 * while this stands in for it, and the header link underneath keeps the focus
 * ring and the click: a ring on the scaled copy would shrink to nothing.
 *
 * Below 1280px or with reduced motion none of this runs. The heading just
 * scrolls away, and the plain wordmark is used where it fits.
 */
export const DockingName = () => {
  const canDock = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DOCKING_QUERY).matches,
    () => false,
  );
  const slotRef = useRef<HTMLAnchorElement>(null);
  const [flight, setFlight] = useState<Flight | null>(null);

  const measure = useCallback(() => {
    const heading = document.querySelector<HTMLElement>(".hero-name");
    const slot = slotRef.current;
    if (!heading || !slot) return setFlight(null);

    const name = heading.getBoundingClientRect();
    const place = slot.getBoundingClientRect();

    setFlight(
      measureFlight(
        {
          left: name.left,
          top: name.top + window.scrollY,
          height: name.height,
          fontSize: parseFloat(getComputedStyle(heading).fontSize),
        },
        {
          left: place.left,
          top: place.top,
          height: place.height,
          fontSize: parseFloat(getComputedStyle(slot).fontSize),
        },
      ),
    );
  }, []);

  useLayoutEffect(() => {
    if (!canDock) return;

    // Layout can only be read once mounted, and this has to land before the
    // first paint or the heading would visibly swap with its copy.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    measure();
    document.documentElement.dataset.nameDocking = "";

    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    void document.fonts?.ready.then(measure);

    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.nameDocking;
      setFlight(null);
    };
  }, [canDock, measure]);

  return (
    <>
      <a
        ref={slotRef}
        href="#content"
        className={cn(
          "peer font-display hidden shrink-0 py-0.5 text-lg font-bold tracking-tight transition-colors xl:block",
          flight
            ? "text-transparent"
            : "text-foreground hover:text-primary-accent",
        )}
      >
        {DATA.name}
      </a>
      {flight && <Flyer flight={flight} />}
    </>
  );
};

const Flyer = ({ flight }: { flight: Flight }) => {
  const { scrollY } = useScroll();
  const range = [0, flight.distance];

  const x = useTransform(scrollY, range, [flight.from.x, flight.to.x], {
    ease: shrink,
  });
  const y = useTransform(scrollY, range, [flight.from.y, flight.to.y], {
    ease: rise,
  });
  const scale = useTransform(scrollY, range, [1, flight.scale], {
    ease: shrink,
  });

  return (
    <motion.span
      aria-hidden="true"
      style={{ x, y, scale, fontSize: flight.fontSize, transformOrigin: "0 0" }}
      className="docking-name peer-hover:text-primary-accent font-display text-foreground pointer-events-none fixed top-0 left-0 font-bold whitespace-nowrap transition-colors select-none"
    >
      {DATA.name}
    </motion.span>
  );
};
