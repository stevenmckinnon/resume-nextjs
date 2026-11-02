"use client";

import {
  useCommandPalette,
  useShortcutLabel,
} from "@/components/command-palette";
import { LengthToggle } from "@/components/length-toggle";
import { DATA } from "@/data/resume";
import { useNumberKeysEnabled } from "@/lib/preferences";
import { toggleTheme } from "@/lib/theme-transition";
import { cn } from "@/lib/utils";
import { DownloadIcon, MoonIcon, SearchIcon, SunIcon } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

/**
 * Document order, and it has to stay that way: `resolve` walks the list top to
 * bottom and stops at the first section still below the reading line. The array
 * position is also the number key that cuts to it.
 */
export const MIXER_SECTIONS = [
  { id: "about", label: "About", short: "About" },
  { id: "work", label: "Experience", short: "Work" },
  { id: "projects", label: "Projects", short: "Projects" },
  { id: "other", label: "Other job", short: "Other" },
  { id: "contact", label: "Contact", short: "Contact" },
];

/** Where in the viewport a section counts as the one being read. */
const READING_LINE = 0.4;

// Text entry only. A focused slider or radio takes arrow keys, not digits, so
// someone who has just used the timeline can still cut away from it.
const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target.matches(
      'input:not([type="range"], [type="radio"], [type="checkbox"]), textarea, select',
    ));

/**
 * The site's one piece of persistent chrome, modelled on a vision mixer: a row
 * of sources, a lit tally on whichever is live, and a number key to cut to each.
 *
 * It replaces a margin rail and a separate floating toolbar. The rail only fitted
 * at 1280px and up, so phones never had wayfinding at all. One bar at every width
 * (top on a desktop, under the thumb on a phone) is one thing to learn.
 */
export const Mixer = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const commandPalette = useCommandPalette();
  const shortcutLabel = useShortcutLabel();
  const { theme, setTheme } = useTheme();
  const numberKeys = useNumberKeysEnabled();

  /* Geometry per scroll frame rather than an IntersectionObserver band, which
     goes stale in the colophon and can miss a section shorter than the band.
     Taking the last section whose top has crossed the reading line has neither
     problem. Rects are read fresh because the page changes length under itself
     when the reader switches between the full and short versions. */
  const resolve = useCallback(() => {
    const line = window.innerHeight * READING_LINE;
    let current: string | null = null;

    for (const { id } of MIXER_SECTIONS) {
      const element = document.getElementById(id);
      if (!element) continue;
      if (element.getBoundingClientRect().top > line) break;
      current = id;
    }

    setActiveId(current);
  }, []);

  useMotionValueEvent(scrollY, "change", resolve);

  // Covers a reload partway down the page, where no scroll event fires.
  useEffect(() => {
    const frame = requestAnimationFrame(resolve);
    return () => cancelAnimationFrame(frame);
  }, [resolve]);

  useEffect(() => {
    if (!numberKeys) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      if (document.querySelector('[role="dialog"]')) return;

      const section = MIXER_SECTIONS[Number(event.key) - 1];
      if (!section) return;

      // A real fragment navigation, so focus moves with the scroll and the back
      // button still works.
      window.location.hash = section.id;
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [numberKeys]);

  return (
    <header className="bg-background fixed inset-x-0 bottom-0 z-40 md:sticky md:top-0 md:bottom-auto">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-1 px-2 md:h-16 md:gap-6 md:px-10">
        <a
          href="#content"
          className="text-foreground hover:text-primary-accent font-display hidden shrink-0 py-0.5 text-lg font-bold tracking-tight transition-colors xl:block"
        >
          {DATA.name}
        </a>

        <nav
          aria-label="Sections"
          className="no-scrollbar min-w-0 flex-1 overflow-x-auto"
        >
          <ul className="flex items-center md:gap-1">
            {MIXER_SECTIONS.map(({ id, label, short }, index) => {
              const isActive = id === activeId;

              return (
                <li
                  key={id}
                  className={cn(id === "about" && "hidden md:block")}
                >
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "location" : undefined}
                    aria-keyshortcuts={numberKeys ? `${index + 1}` : undefined}
                    className={cn(
                      "group flex h-11 items-center gap-1.5 rounded-md px-1.5 text-[0.8125rem] font-semibold whitespace-nowrap transition-colors md:h-9 md:px-2.5 md:text-sm",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-1.5 shrink-0 rounded-full transition-[background-color,scale] duration-200",
                        isActive
                          ? "bg-tally scale-125"
                          : "bg-muted-foreground/40 group-hover:bg-muted-foreground",
                      )}
                    />
                    <span aria-hidden="true" className="md:hidden">
                      {short}
                    </span>
                    <span className="sr-only md:hidden">{label}</span>
                    <span className="hidden md:inline">{label}</span>
                    {numberKeys && (
                      <kbd
                        aria-hidden="true"
                        className="text-muted-foreground bg-muted ml-0.5 hidden size-5 items-center justify-center rounded-sm font-sans text-[0.8125rem] font-semibold tabular-nums xl:inline-flex"
                      >
                        {index + 1}
                      </kbd>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <LengthToggle className="hidden lg:inline-flex" />

        <div className="flex shrink-0 items-center gap-0.5">
          <a
            href="/api/cv"
            download="Steve McKinnon CV.pdf"
            className="hover:bg-muted text-foreground flex h-11 items-center gap-1.5 rounded-md px-2 text-[0.8125rem] font-semibold transition-colors md:h-9 md:px-3"
          >
            <DownloadIcon aria-hidden="true" className="size-3.5" />
            <span className="sr-only lg:not-sr-only">Download</span> CV
          </a>

          <button
            data-needs-js
            type="button"
            onClick={commandPalette.open}
            className="hover:bg-muted text-muted-foreground hover:text-foreground flex h-11 cursor-pointer items-center gap-1.5 rounded-md px-2 transition-colors md:h-9"
          >
            <SearchIcon aria-hidden="true" className="size-4 md:size-3.5" />
            <span className="hidden text-[0.8125rem] font-semibold lg:inline">
              {shortcutLabel}
            </span>
            <span className="sr-only">Open command palette</span>
          </button>

          <button
            data-needs-js
            type="button"
            onClick={() => toggleTheme(theme, setTheme)}
            className="hover:bg-muted text-muted-foreground hover:text-foreground hidden size-9 cursor-pointer items-center justify-center rounded-md transition-colors md:flex"
          >
            <SunIcon aria-hidden="true" className="size-3.5 dark:hidden" />
            <MoonIcon
              aria-hidden="true"
              className="hidden size-3.5 dark:block"
            />
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  );
};
