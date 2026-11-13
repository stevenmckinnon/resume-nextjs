import { Reveal } from "@/components/reveal";
import { RoleTitle } from "@/components/role-title";
import { DATA } from "@/data/resume";
import { cn, formatDuration, monthIndex, parseMonthYear } from "@/lib/utils";
import type { WorkExperience } from "@/types/resume";

// Module scope for the same Cache Components reason as the hero's timeline.
const NOW = monthIndex(new Date());

const roleMonths = (role: WorkExperience) =>
  (role.end ? parseMonthYear(role.end) : NOW) - parseMonthYear(role.start);

const LONGEST = Math.max(...DATA.work.map(roleMonths));

/**
 * Experience as a running order: every role, every result, already open.
 *
 * This replaced five accordions with four shut by default, which hid most of the
 * CV behind a click and put a link inside a `role="button"`. There is nothing to
 * operate here, so there is nothing to get wrong. The short version keeps the
 * first line of each role, which is why each description leads with its result.
 */
export const Rundown = () => (
  <ol className="flex flex-col gap-4 md:gap-5">
    {DATA.work.map((role, index) => {
      const months = roleMonths(role);
      const isCurrent = !role.end;
      const lines = Array.isArray(role.description)
        ? role.description
        : role.description
          ? [role.description]
          : [];

      return (
        <li key={`${role.company}-${role.start}`}>
          <Reveal order={index === 0 ? 0 : 1}>
            <article
              className={cn(
                "grid grid-cols-1 gap-x-10 gap-y-4 rounded-lg p-5 md:p-8 lg:grid-cols-12",
                isCurrent && "bg-card",
              )}
            >
              <div className="flex flex-col gap-2 lg:col-span-3">
                <p className="text-foreground flex items-center gap-2 text-sm font-semibold tabular-nums">
                  {isCurrent && (
                    <span
                      aria-hidden="true"
                      className="tally bg-tally size-2.5 rounded-full"
                    />
                  )}
                  {role.start} to {role.end ?? "now"}
                </p>
                <p className="text-muted-foreground text-sm">
                  {formatDuration(months)}
                </p>
                {/* The same clip as on the timeline: its length is the fact. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-2 max-w-44",
                    isCurrent ? "bg-primary" : "bg-muted-foreground/40",
                  )}
                  style={{ width: `${(months / LONGEST) * 100}%` }}
                />
              </div>

              <div className="order-first lg:order-0 lg:col-span-4">
                <h3 className="text-foreground font-display text-3xl/tight font-bold tracking-tight text-balance md:text-4xl">
                  <RoleTitle title={role.title} />
                </h3>
                <a
                  href={role.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary-accent mt-1 inline-block py-1 font-semibold underline-offset-4 transition-colors hover:underline"
                >
                  {role.company}
                </a>
              </div>

              <ul className="flex max-w-[64ch] flex-col gap-2.5 text-base/relaxed text-pretty lg:col-span-5">
                {lines.map((line, lineIndex) => (
                  <li
                    key={line}
                    className={cn(
                      lineIndex === 0
                        ? "text-foreground font-medium"
                        : "text-muted-foreground short:hidden",
                    )}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </li>
      );
    })}
  </ol>
);
