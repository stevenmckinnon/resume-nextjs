"use client";

import { copyEmail } from "@/components/command-palette";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const REVERT_DELAY_MS = 2000;

const SWAP = {
  initial: { scale: 0.6, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.6, opacity: 0 },
  transition: { type: "spring", duration: 0.3, bounce: 0.4 },
} as const;

/**
 * Copies the address and confirms in the button itself: the icon becomes a
 * tick and the label says "Copied". A toast would put the answer in the corner
 * of the screen, away from the thing that was just pressed.
 *
 * Both labels sit in one grid cell so the button keeps the width of the longer
 * one and nothing beside it moves when the state changes.
 *
 * A failed copy keeps the button as it was and shows the toast, since there is
 * no "Copied" to claim.
 */
export const CopyEmailButton = ({ className }: { className?: string }) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const handleCopy = async () => {
    if (!(await copyEmail({ quiet: true }))) return;
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), REVERT_DELAY_MS);
  };

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        data-needs-js
        onClick={() => void handleCopy()}
        className={cn(
          "active:scale-[0.96]",
          copied && "text-success hover:text-success",
          className,
        )}
      >
        {/* Fixed-size box so the row doesn't reflow when the glyph swaps. */}
        <span aria-hidden="true" className="relative size-4 shrink-0">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={copied ? "copied" : "idle"}
              {...SWAP}
              className="absolute inset-0"
            >
              {copied ? (
                <Check className="size-4" strokeWidth={2.5} />
              ) : (
                <Copy className="size-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="inline-grid text-left">
          <span
            aria-hidden={copied}
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-150",
              copied && "opacity-0",
            )}
          >
            Copy address
          </span>
          <span
            aria-hidden={!copied}
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-150",
              !copied && "opacity-0",
            )}
          >
            Copied
          </span>
        </span>
      </Button>

      {/* The visible label changes, but a screen reader on a focused button
          does not reliably announce that. Polite: it is a confirmation. */}
      <span className="sr-only" aria-live="polite">
        {copied ? `Copied ${DATA.contact.email} to clipboard` : ""}
      </span>
    </>
  );
};
