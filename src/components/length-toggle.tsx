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
 */
export const LengthToggle = ({ className }: { className?: string }) => {
  const length = usePageLength();
  const name = useId();

  return (
    <fieldset
      data-needs-js
      className={cn(
        "bg-muted inline-flex shrink-0 items-center gap-0.5 rounded-md p-0.5",
        className,
      )}
    >
      <legend className="sr-only">Page length</legend>
      {OPTIONS.map(({ value, label }) => (
        <label
          key={value}
          className={cn(
            "has-focus-visible:outline-ring flex h-8 cursor-pointer items-center rounded-sm px-2.5 text-[0.8125rem] font-semibold outline-offset-1 transition-colors has-focus-visible:outline-2",
            length === value
              ? "bg-background text-foreground"
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
