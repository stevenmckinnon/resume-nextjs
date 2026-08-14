"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY } from "@/lib/utils";

/**
 * Was a single 80px row of bordered chips — a footnote for the thing the site
 * is actually selling. Now a set-width list where each skill gets a line, the
 * icon reads at a usable size, and the type carries the weight.
 *
 * Still read-only labels rather than controls, so there is no hover or press
 * affordance: motion here would promise an interaction that does not exist.
 */
export const SkillsSection = () => (
  <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-3">
    {DATA.skills.map(({ name, icon: Icon }) => (
      <li key={name} className="border-border/40 border-b">
        {/* One delay for the whole list, not a per-item stagger. Staggering
            ten reference labels drew the eye across them one at a time for no
            reason — a stagger should communicate hierarchy, and these are
            peers. */}
        <BlurFade
          delay={BLUR_FADE_DELAY}
          className="flex items-center gap-3 py-4"
        >
          {Icon && <Icon className="text-primary-accent size-5 shrink-0" />}
          <span className="text-foreground truncate text-base font-semibold tracking-tight md:text-lg">
            {name}
          </span>
        </BlurFade>
      </li>
    ))}
  </ul>
);
