"use client";

import { copyEmail } from "@/components/command-palette";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useReducedMotion,
} from "framer-motion";
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
 * tick, the label says "Copied", and the button springs to the width of the
 * new word. A toast would put the answer in the corner of the screen, away
 * from the thing that was just pressed.
 *
 * The width is measured, not guessed: the label on its way in is the one that
 * is not currently on show, so it is absolutely positioned and has its natural
 * width. The label box animates from the width it has right now (so a press
 * during the reverse still starts from where it is) to that number. Until the
 * first press the box has no width of its own and simply fits "Copy address".
 *
 * A failed copy keeps the button as it was and shows the toast, since there is
 * no "Copied" to claim.
 */
export const CopyEmailButton = ({ className }: { className?: string }) => {
  const [copied, setCopied] = useState(false);
  const [labelBox, animateLabelBox] = useAnimate<HTMLSpanElement>();
  const idleRef = useRef<HTMLSpanElement>(null);
  const copiedRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const show = (next: boolean) => {
    const incoming = next ? copiedRef.current : idleRef.current;
    const box = labelBox.current;
    if (incoming && box) {
      // Explicit keyframes: given only a target, Framer has no starting width
      // on the first press and snaps instead of animating.
      void animateLabelBox(
        box,
        { width: [box.getBoundingClientRect().width, incoming.offsetWidth] },
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", duration: 0.35, bounce: 0.2 },
      );
    }
    setCopied(next);
  };

  const handleCopy = async () => {
    if (!(await copyEmail({ quiet: true }))) return;
    show(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => show(false), REVERT_DELAY_MS);
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
        {/* Fixed-size box so the icon swap doesn't nudge the label. */}
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
        <span
          ref={labelBox}
          className="relative block overflow-hidden text-left whitespace-nowrap"
        >
          <span
            ref={idleRef}
            aria-hidden={copied}
            className={cn(
              "transition-opacity duration-150",
              copied ? "absolute top-0 left-0 opacity-0" : "block",
            )}
          >
            Copy address
          </span>
          <span
            ref={copiedRef}
            aria-hidden={!copied}
            className={cn(
              "transition-opacity duration-150",
              copied ? "block" : "absolute top-0 left-0 opacity-0",
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
