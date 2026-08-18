"use client";

import {
  useCommandPalette,
  useShortcutLabel,
} from "@/components/command-palette";
import { usePastHero } from "@/hooks/usePastHero";
import { toggleTheme } from "@/lib/theme-transition";
import { AnimatePresence, motion } from "motion/react";
import { DownloadIcon, MoonIcon, SearchIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * What to do next, bottom right.
 *
 * The other half of the dock's replacement. The dock mixed navigation with
 * actions and outbound links; this holds only the three things a reader might
 * want at any point on the page, and the section index holds only position.
 *
 * Nothing the dock did was dropped. Its four section links became the index,
 * its four social links were already in the hero and the palette, and search,
 * theme and the CV live here.
 */
export const UtilityBar = () => {
  const isVisible = usePastHero();
  const commandPalette = useCommandPalette();
  const shortcutLabel = useShortcutLabel();
  const { theme, setTheme } = useTheme();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          /* rounded-lg, not rounded-full. The site's radius scale is built on
             a 0.5rem --radius and every other surface on the page uses it; the
             dock's pill was the one shape that sat outside the system.

             The surface is /90 rather than /80 because this bar crosses The
             Other Job's full-bleed photographs, and a lit arena behind a /80
             panel pushes it far enough toward the image to soften the label.
             Against the page background the two are indistinguishable. */
          className="border-border bg-background/90 fixed right-6 bottom-6 z-40 flex items-center gap-1 rounded-lg border p-1 shadow-lg backdrop-blur-xl"
        >
          <a
            href="/api/cv"
            download="Steve McKinnon CV.pdf"
            className="hover:bg-muted/80 text-foreground flex h-10 items-center gap-2 rounded-md px-3 text-xs font-semibold transition-colors sm:h-9"
          >
            <DownloadIcon className="size-3.5" />
            Download CV
          </a>

          <button
            type="button"
            onClick={commandPalette.open}
            className="hover:bg-muted/80 text-muted-foreground hover:text-foreground flex h-10 cursor-pointer items-center gap-2 rounded-md px-2.5 transition-colors sm:h-9"
          >
            <SearchIcon className="size-3.5" />
            {/* The shortcut hint is the label on anything with a keyboard.
                Below sm the glyph carries it alone, because "⌘K" is an
                instruction you cannot follow on a phone. */}
            <span className="hidden font-mono text-[10px] tracking-wider sm:inline">
              {shortcutLabel}
            </span>
            <span className="sr-only">Open command palette</span>
          </button>

          <button
            type="button"
            onClick={() => toggleTheme(theme, setTheme)}
            className="hover:bg-muted/80 text-muted-foreground hover:text-foreground flex size-10 cursor-pointer items-center justify-center rounded-md transition-colors sm:size-9"
          >
            <SunIcon className="size-3.5 dark:hidden" />
            <MoonIcon className="hidden size-3.5 dark:block" />
            <span className="sr-only">Toggle theme</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
