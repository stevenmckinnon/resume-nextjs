import { DATA } from "@/data/resume";
import { getGitHubContributions } from "@/lib/github";
import type { ContributionWeek } from "@/lib/github";
import { cn } from "@/lib/utils";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

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
  return sorted[0]?.[0] ?? "—";
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-3xl font-black">{value}</span>
      <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

export async function GitHubActivity() {
  const username = DATA.contact.social.GitHub.url.split("/").pop()!;
  const data = await getGitHubContributions(username);

  if (!data) return null;

  const weeks = data.weeks.slice(-26);
  const currentStreak = calculateCurrentStreak(weeks);
  const mostActiveMonth = getMostActiveMonth(weeks);

  return (
    <div className="flex flex-col gap-8">
      {/* Stats */}
      <div className="flex flex-wrap gap-10">
        <Stat
          label="Contributions this year"
          value={data.totalContributions.toLocaleString()}
        />
        <Stat label="Current streak" value={`${currentStreak}d`} />
        <Stat label="Most active month" value={mostActiveMonth} />
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex min-w-max flex-col gap-1.5">
          {/* Month labels */}
          <div className="ml-9 flex gap-1">
            {weeks.map((week, i) => {
              const firstDay = week.contributionDays[0];
              if (!firstDay) return <div key={i} className="w-3 shrink-0" />;
              const date = new Date(firstDay.date);
              const isNewMonth = date.getDate() <= 7;
              return (
                <div key={i} className="w-3 shrink-0">
                  {isNewMonth && (
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {MONTH_NAMES[date.getMonth()]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid with day labels */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex w-8 flex-col gap-1">
              {DAY_LABELS.map((label, i) => (
                <div key={i} className="flex h-3 items-center">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Contribution columns */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                    className={cn(
                      "h-3 w-3 rounded-sm",
                      getIntensityClass(day.contributionCount),
                    )}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-1 flex items-center justify-end gap-2">
            <span className="font-mono text-[10px] text-muted-foreground">
              Less
            </span>
            {[0, 3, 6, 9, 12].map((count) => (
              <div
                key={count}
                className={cn("h-3 w-3 rounded-sm", getIntensityClass(count))}
              />
            ))}
            <span className="font-mono text-[10px] text-muted-foreground">
              More
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
