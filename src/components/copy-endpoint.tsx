"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CopyEndpointProps {
  /** The URL to display and copy. Shown verbatim, so pass it absolute. */
  value: string;
  className?: string;
}

const REVERT_DELAY_MS = 2000;

/**
 * The endpoint itself is the button. A separate icon-only copy control next to
 * a block of monospace text gives you a 44px target beside a 300px one that
 * looks equally clickable and isn't; making the whole row the control removes
 * the guess.
 *
 * Failure is real here rather than theoretical: `navigator.clipboard` is
 * undefined outside a secure context, so the fallback selects the text instead
 * of silently doing nothing.
 */
export const CopyEndpoint = ({ value, className }: CopyEndpointProps) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const selectFallback = () => {
    const node = codeRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), REVERT_DELAY_MS);
    } catch {
      selectFallback();
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "group border-border/70 bg-card/40 flex w-full items-center justify-between gap-4 rounded-lg border px-4 py-3 text-left",
        "hover:border-primary-accent/40 hover:bg-card/70 transition-colors duration-200",
        "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
        "cursor-pointer",
        className,
      )}
    >
      <code
        ref={codeRef}
        className="text-foreground font-code truncate text-sm/none tracking-tight"
      >
        {value}
      </code>

      {/* Fixed-size box so the row doesn't reflow when the glyph swaps. */}
      <span className="relative size-4 shrink-0">
        <AnimatePresence initial={false} mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0.4 }}
              className="absolute inset-0"
            >
              <Check className="text-primary-accent size-4" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0.4 }}
              className="absolute inset-0"
            >
              <Copy className="text-muted-foreground group-hover:text-foreground size-4 transition-colors" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {/* The visible label never changes, so the state has to be announced.
          Polite rather than assertive: copying is a confirmation, not an alert. */}
      <span className="sr-only" aria-live="polite">
        {copied ? `Copied ${value} to clipboard` : `Copy ${value} to clipboard`}
      </span>
    </button>
  );
};
