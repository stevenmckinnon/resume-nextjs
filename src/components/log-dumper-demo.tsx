"use client";

import { Icons } from "@/components/icons";
import { ProjectTags } from "@/components/project-tags";
import { cn } from "@/lib/utils";
import { Logger, type LogEntry } from "@stevenmckinnon/log-dumper";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** Newest first, so arrivals land at the top and nothing has to auto-scroll. */
const MAX_VISIBLE = 12;

type Context = { component?: string; userId?: string; ms?: number };

/**
 * Every button emits through a real `Logger` instance from the published
 * package. The ids, timestamps, levels and metadata below are the library's
 * own output, not a mock: the whole point of putting this on the page is that
 * a screenshot of a logging tool proves nothing about whether it works.
 */
const ACTIONS: {
  label: string;
  run: (log: Logger<Context>) => void;
}[] = [
  {
    label: "Log an action",
    run: (log) =>
      log.logAction("Checkout button clicked", {
        component: "CartSummary",
        userId: "u_8842",
      }),
  },
  {
    label: "Log a warning",
    run: (log) =>
      log.logWarn("Session expires in 60s", {
        component: "AuthProvider",
        userId: "u_8842",
      }),
  },
  {
    label: "Log a slow call",
    run: (log) =>
      log.logDebug("GET /api/orders resolved", {
        component: "OrdersTable",
        ms: 1240,
      }),
  },
  {
    label: "Throw an error",
    run: (log) =>
      log.logError(new Error("Payment intent already captured"), {
        component: "CheckoutForm",
        userId: "u_8842",
      }),
  },
];

/**
 * Level is carried by the word first and the colour second, and only the top
 * of the ramp is coloured. A four-hue scale would need an amber and a blue
 * that exist nowhere else in the palette, which is a lot of new colour to
 * introduce for a demo panel.
 */
const LEVEL_STYLES: Record<string, string> = {
  debug: "text-muted-foreground/70",
  info: "text-muted-foreground",
  warn: "text-foreground font-bold",
  error: "text-destructive font-bold",
};

const formatContext = (context?: Context) => {
  if (!context) return null;
  const pairs = Object.entries(context).filter(([, v]) => v !== undefined);
  if (pairs.length === 0) return null;
  return pairs.map(([k, v]) => `${k}=${v}`).join(" ");
};

const ControlButton = ({
  children,
  onClick,
  className,
  ...props
}: React.ComponentProps<"button">) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "border-border/70 text-muted-foreground hover:border-primary-accent/40 hover:text-foreground rounded-md border px-3 py-1.5 font-mono text-xs transition-colors",
      "focus-visible:ring-ring/50 cursor-pointer focus-visible:ring-2 focus-visible:outline-none",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export const LogDumperDemo = () => {
  // Lazy init: `new Logger()` on every render would throw away the
  // subscription the effect below sets up.
  const [logger] = useState(
    () =>
      new Logger<Context>({
        maxLogs: 50,
        // Off deliberately. A visitor who opens devtools on a portfolio and
        // finds it printing red errors reads that as a broken site.
        forwardToConsole: false,
        captureMetadata: true,
        name: "demo",
      }),
  );
  const [entries, setEntries] = useState<LogEntry<Context>[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const unsubscribe = logger.subscribe((entry) =>
      setEntries((prev) => [entry, ...prev].slice(0, MAX_VISIBLE)),
    );

    // One entry on mount so the panel shows its shape rather than an empty
    // box the reader has to guess the purpose of.
    logger.logInfo("Logger mounted", { component: "LogDumperDemo" });

    const unsubscribeClear = logger.subscribeToClear(() => setEntries([]));

    return () => {
      unsubscribe();
      unsubscribeClear();
    };
  }, [logger]);

  return (
    <article className="border-border/50 grid grid-cols-1 gap-10 rounded-2xl border p-6 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] md:gap-12 md:p-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="bg-primary-accent size-1.5 animate-pulse rounded-full" />
          <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            Running on this page
          </span>
        </div>

        <h3 className="text-2xl font-black tracking-tight lg:text-3xl">
          <Link
            href="https://www.npmjs.com/package/@stevenmckinnon/log-dumper"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-accent group inline-flex items-baseline gap-1.5 transition-colors"
          >
            Log Dumper
            <ArrowUpRight
              className="size-5 self-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </h3>

        <p className="text-muted-foreground max-w-[42ch] text-base/relaxed text-pretty">
          A TypeScript logging library for React: typed context, error
          boundaries, a live DevTools panel and exportable logs. The console on
          the right is the published package, imported and running here.
        </p>

        <ProjectTags tags={["typescript"]} className="mt-1" />

        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href="https://github.com/stevenmckinnon/log-dumper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary-accent flex w-fit items-center gap-2 text-sm font-semibold transition-colors"
          >
            <Icons.github className="size-4" />
            Source
          </Link>
          <Link
            href="/log-dumper"
            className="text-muted-foreground hover:text-primary-accent flex w-fit items-center gap-2 text-sm font-semibold transition-colors"
          >
            Full demo
            <ArrowUpRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="border-border/70 bg-card/40 overflow-hidden rounded-lg border">
          <div className="border-border/50 text-muted-foreground flex items-center justify-between border-b px-4 py-2.5 font-mono text-[11px] tracking-wide">
            <span className="uppercase">log stream</span>
            <span className="tabular-nums">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          <ul
            ref={listRef}
            className="divide-border/40 relative h-[260px] divide-y overflow-y-auto"
          >
            {/* Clearing the stream otherwise leaves a 260px void with no
                indication that the buttons below refill it. */}
            {entries.length === 0 && (
              <li className="text-muted-foreground/60 font-code absolute inset-0 flex items-center justify-center text-[11px]">
                Press a button below to emit an entry
              </li>
            )}

            <AnimatePresence initial={false}>
              {entries.map((entry) => {
                const context = formatContext(entry.context);
                return (
                  <motion.li
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                    className="font-code flex items-baseline gap-3 px-4 py-2.5 text-[11px]/relaxed"
                  >
                    <time
                      dateTime={entry.timestamp}
                      className="text-muted-foreground/60 shrink-0 tabular-nums"
                    >
                      {new Date(entry.timestamp).toLocaleTimeString("en-GB", {
                        hour12: false,
                      })}
                    </time>
                    <span
                      className={cn(
                        "w-10 shrink-0 uppercase",
                        LEVEL_STYLES[entry.level],
                      )}
                    >
                      {entry.level}
                    </span>
                    {/* Context on its own line rather than trailing the
                        message. Inline, a long message and a long context
                        wrap into one ragged block and the eye can't find where
                        one ends and the other starts. */}
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-foreground/90 wrap-break-word">
                        {entry.message}
                      </span>
                      {context && (
                        <span className="text-muted-foreground/70 wrap-break-word">
                          {context}
                        </span>
                      )}
                    </span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {ACTIONS.map(({ label, run }) => (
            <ControlButton key={label} onClick={() => run(logger)}>
              {label}
            </ControlButton>
          ))}

          <ControlButton
            onClick={() => logger.downloadLog("log-dumper-demo.json")}
            disabled={entries.length === 0}
            className="ml-auto inline-flex items-center gap-1.5 disabled:pointer-events-none disabled:opacity-40"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Export
          </ControlButton>
          <ControlButton
            onClick={() => logger.clearLogs()}
            disabled={entries.length === 0}
            className="inline-flex items-center gap-1.5 disabled:pointer-events-none disabled:opacity-40"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
            <span className="sr-only">Clear the log stream</span>
            <span aria-hidden="true">Clear</span>
          </ControlButton>
        </div>
      </div>
    </article>
  );
};
