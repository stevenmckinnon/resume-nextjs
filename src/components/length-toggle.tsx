"use client";

import {
  type PageLength,
  setPageLength,
  usePageLength,
} from "@/lib/preferences";
import { cn } from "@/lib/utils";
import { useId } from "react";

const OPTIONS: { value: PageLength; label: string }[] = [
  { value: "full", label: "Full" },
  { value: "short", label: "Short" },
];

/**
 * Radios rather than a toggle button: "pressed" says nothing about what the
 * unpressed state is, and here both options are worth naming.
 *
 * Set as two words rather than a segmented pill. The pill is the stock control
 * of every component kit; an underline under the length you are reading says
 * the same thing with nothing to draw.
 */
export const LengthToggle = ({ className }: { className?: string }) => {
  const length = usePageLength();
  const name = useId();

  return (
    <fieldset
      data-needs-js
      className={cn("inline-flex shrink-0 items-center gap-3", className)}
    >
      <legend className="sr-only">Page length</legend>
      {OPTIONS.map(({ value, label }) => (
        <label
          key={value}
          className={cn(
            "has-focus-visible:outline-ring flex h-9 cursor-pointer items-center text-sm font-semibold decoration-2 underline-offset-[6px] outline-offset-2 transition-colors has-focus-visible:outline-2",
            length === value
              ? "text-foreground underline"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <input
            type="radio"
            name={name}
            value={value}
            checked={length === value}
            onChange={() => setPageLength(value)}
            className="sr-only"
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
};
