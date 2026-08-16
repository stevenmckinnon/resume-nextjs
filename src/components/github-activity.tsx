import { DATA } from "@/data/resume";
import { getGitHubContributions } from "@/lib/github";
import type { ContributionWeek } from "@/lib/github";
import { cn } from "@/lib/utils";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getIntensityClass(count: number): string {
  if (count === 0) return "bg-muted";
  if (count <= 3) return "bg-primary/25";
  if (count <= 6) return "bg-primary/50";
  if (count <= 9) return "bg-primary/75";
  return "bg-primary";
}

function calculateCurrentStreak(weeks: ContributionWeek[]): number {
  const allDays = weeks.flatMap((w) => w.contributionDays).reverse();
  let streak = 0;
  let started = false;
  for (const day of allDays) {
    if (day.contributionCount > 0) {
      started = true;
      streak++;
    } else if (started) {
      break;
    }
  }
  return streak;
}

function getMostActiveMonth(weeks: ContributionWeek[]): string {
  const monthTotals: Record<string, number> = {};
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      const month = MONTH_NAMES[new Date(day.date).getMonth()];
      if (month) {
        monthTotals[month] = (monthTotals[month] ?? 0) + day.contributionCount;
      }
    }
  }
  const sorted = Object.entries(monthTotals).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? "n/a";
}

/**
 * A supporting detail, not a section. This used to be a full numbered section
 * with 3xl stat blocks and a labelled 26-week grid — roughly the same page
 * weight as Experience, for something that is corroboration at best. It now
 * reads as one line of evidence and gets out of the way.
 */
export async function GitHubActivity() {
  const username = DATA.contact.social.GitHub.url.split("/").pop()!;
  const data = await getGitHubContributions(username);

  if (!data) return null;

  const weeks = data.weeks.slice(-26);
  const currentStreak = calculateCurrentStreak(weeks);
  const mostActiveMonth = getMostActiveMonth(weeks);

  return (
    <section
      id="github"
      aria-label="GitHub activity"
      className="border-border/50 mb-24 flex flex-col gap-4 border-y py-5 md:mb-32 md:flex-row md:items-center md:justify-between md:gap-8"
    >
      <p className="text-muted-foreground text-sm/relaxed">
        <span className="text-foreground font-semibold tabular-nums">
          {data.totalContributions.toLocaleString()}
        </span>{" "}
        contributions in the last year
        {/* One separator, not two. A middle dot between every clause turns a
            sentence into a metadata strip, which is the look this line is
            trying to avoid; the second break is a plain comma. */}
        <span aria-hidden="true" className="text-muted-foreground/40 px-2">
          ·
        </span>
        <span className="text-foreground font-semibold tabular-nums">
          {currentStreak}
        </span>
        -day streak, busiest in{" "}
        <span className="text-foreground font-semibold">{mostActiveMonth}</span>
      </p>

      {/* Decorative at this size — the sentence above carries the same facts,
          so the grid is aria-hidden rather than read out cell by cell. */}
      <div aria-hidden="true" className="flex gap-[3px] overflow-hidden">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.contributionDays.map((day) => (
              <div
                key={day.date}
                className={cn(
                  "size-[7px] rounded-[2px]",
                  getIntensityClass(day.contributionCount),
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
