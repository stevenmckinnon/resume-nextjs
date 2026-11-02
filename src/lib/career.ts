import { DATA } from "@/data/resume";
import { monthIndex, parseMonthYear } from "@/lib/utils";
import type { WorkExperience } from "@/types/resume";

export type TrackId = "engineering" | "broadcast" | "photography";

export const TRACKS: { id: TrackId; label: string }[] = [
  { id: "engineering", label: "Engineering" },
  { id: "broadcast", label: "Broadcast" },
  { id: "photography", label: "Photography" },
];

/**
 * One stretch of work on a track. Everything is plain data with month offsets
 * from the start of the timeline, because it crosses the server/client boundary
 * as a prop: if the client worked out "now" for itself, a page built last month
 * would hydrate with a different playhead from the one it was rendered with.
 */
export type Clip = {
  id: string;
  track: TrackId;
  start: number;
  end: number;
  /** Short enough to sit inside the clip. */
  label: string;
  title: string;
  organisation: string;
  result: string;
};

export type Timeline = {
  /** Absolute month index of offset 0. */
  origin: number;
  /** Offset of the current month, which is also the last playhead position. */
  length: number;
  clips: Clip[];
};

const firstLine = (description: WorkExperience["description"]) =>
  (Array.isArray(description) ? description[0] : description) ?? "";

/**
 * Lays overlapping roles on one track by splitting at each start date, so a
 * track never needs a second lane: ICW alone, then "WWE and ICW" from the month
 * WWE begins.
 */
const stackOverlapping = (
  roles: WorkExperience[],
  track: TrackId,
  toOffset: (month: number) => number,
  length: number,
): Clip[] => {
  const spans = roles
    .map((role) => ({
      role,
      start: toOffset(parseMonthYear(role.start)),
      end: role.end ? toOffset(parseMonthYear(role.end)) : length,
    }))
    .sort((a, b) => a.start - b.start);

  return spans.map((span, index) => {
    const next = spans[index + 1];
    const running = spans.slice(0, index + 1).filter((s) => s.end > span.start);
    // Most recent first, so the name you would recognise leads the label.
    const names = running
      .map((s) => s.role.shortName ?? s.role.company)
      .reverse()
      .join(" and ");

    return {
      id: `${track}-${index}`,
      track,
      start: span.start,
      end: next ? next.start : span.end,
      label: names,
      title: span.role.title,
      // Its short name repeats the job title: "Photographer, Photography".
      organisation: track === "photography" ? span.role.company : names,
      result: firstLine(span.role.description),
    };
  });
};

export function buildTimeline(now: Date): Timeline {
  const origin = Math.min(
    ...DATA.work.map((role) => parseMonthYear(role.start)),
  );
  const length = monthIndex(now) - origin;
  const toOffset = (month: number) => month - origin;

  const engineering: Clip[] = [...DATA.work]
    .sort((a, b) => parseMonthYear(a.start) - parseMonthYear(b.start))
    .map((role, index) => ({
      id: `engineering-${index}`,
      track: "engineering",
      start: toOffset(parseMonthYear(role.start)),
      end: role.end ? toOffset(parseMonthYear(role.end)) : length,
      label: role.company,
      title: role.title,
      organisation: role.company,
      result: firstLine(role.description),
    }));

  const photography = DATA.otherWork.filter(
    (role) => role.title === "Photographer",
  );
  const broadcast = DATA.otherWork.filter(
    (role) => role.title === "Camera Operator",
  );

  return {
    origin,
    length,
    clips: [
      ...engineering,
      ...stackOverlapping(broadcast, "broadcast", toOffset, length),
      ...stackOverlapping(photography, "photography", toOffset, length),
    ],
  };
}

/**
 * The clip on a track at a month. A clip's end is inclusive and the latest start
 * wins, so the month two roles share belongs to the new one and a one-month gap
 * between jobs (December 2020 to January 2021) does not read as unemployment.
 */
export function clipAt(
  clips: Clip[],
  track: TrackId,
  month: number,
): Clip | undefined {
  return clips
    .filter(
      (clip) =>
        clip.track === track && clip.start <= month && month <= clip.end,
    )
    .at(-1);
}
