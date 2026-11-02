import { DATA } from "@/data/resume";
import { buildTimeline, clipAt } from "@/lib/career";
import { parseMonthYear } from "@/lib/utils";
import { describe, expect, it } from "vitest";

const timeline = buildTimeline(new Date(2026, 10, 15));
const { clips, length, origin } = timeline;
const month = (label: string) => parseMonthYear(label) - origin;

describe("buildTimeline", () => {
  it("starts at the first job and ends at the current month", () => {
    expect(origin).toBe(parseMonthYear("June 2014"));
    expect(length).toBe(149);
  });

  it("puts every role in the CV on the engineering track", () => {
    expect(clips.filter((clip) => clip.track === "engineering")).toHaveLength(
      DATA.work.length,
    );
  });

  it("runs the current role through to now", () => {
    expect(clipAt(clips, "engineering", length)?.title).toBe(
      DATA.work[0]?.title,
    );
  });

  it("splits overlapping camera work rather than stacking it", () => {
    expect(clipAt(clips, "broadcast", month("October 2020"))?.label).toBe(
      "ICW",
    );
    expect(clipAt(clips, "broadcast", month("November 2021"))?.label).toBe(
      "WWE and ICW",
    );
    expect(clipAt(clips, "broadcast", length)?.label).toBe("WWE and ICW");
  });
});

describe("clipAt", () => {
  it("returns nothing before a track has started", () => {
    expect(clipAt(clips, "broadcast", month("January 2015"))).toBeUndefined();
    expect(clipAt(clips, "photography", month("June 2015"))).toBeUndefined();
  });

  it("gives a shared month to the role that starts in it", () => {
    expect(clipAt(clips, "engineering", month("May 2019"))?.title).toBe(
      "Senior Front-End Developer",
    );
  });

  it("leaves no gap between consecutive jobs", () => {
    for (let at = 0; at <= length; at++) {
      expect(clipAt(clips, "engineering", at)).toBeDefined();
    }
  });
});
