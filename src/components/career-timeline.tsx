"use client";

import {
  type Clip,
  type Timeline,
  type TrackId,
  TRACKS,
  clipAt,
} from "@/lib/career";
import { RoleTitle } from "@/components/role-title";
import { cn, formatMonthIndex } from "@/lib/utils";
import Image from "next/image";
import { type PointerEvent, useId, useState } from "react";

type FeedId = "engineering" | "icw" | "wwe" | "photography";

/**
 * The picture on each track's tile. Chosen per clip rather than per track, since
 * the Broadcast track changes picture the month WWE joins ICW. Engineering has no
 * footage, so it shows the person doing it.
 *
 * Decorative: each tile is a radio named by its track, and the panel beside the
 * tiles says in words what is on air.
 */
const FEEDS: Record<FeedId, { src: string; position: string }> = {
  engineering: { src: "/me.jpg", position: "object-[50%_25%]" },
  icw: { src: "/timeline-icw.jpg", position: "object-[75%_15%]" },
  wwe: { src: "/timeline-wwe.jpg", position: "object-[85%_35%]" },
  photography: {
    src: "/timeline-photography.jpg",
    position: "object-[35%_0%]",
  },
};

const feedFor = (track: TrackId, clip: Clip | undefined): FeedId => {
  if (track === "engineering") return "engineering";
  if (track === "photography") return "photography";
  return clip?.label.includes("WWE") ? "wwe" : "icw";
};

/** Half the range thumb. The clips are inset by this so the playhead lines up. */
const THUMB_INSET = 12;
const YEARS_STEP = 3;

const playheadLeft = (position: number) =>
  `calc(${THUMB_INSET}px + (100% - ${THUMB_INSET * 2}px) * ${position})`;

/**
 * The career, cut like an edit: one track per line of work, and a playhead you
 * can move through twelve years to see what was on air at any point.
 *
 * It is a convenience over the rundown further down the page, never a gate in
 * front of it. Nothing here has to be touched to read the CV, and with scripts
 * off the slider disappears and the panel beside the tiles simply states the current role.
 *
 * The scrubber is a native range input stretched over the tracks, not a custom
 * drag handler, which is where the arrow keys, Home and End, touch and the
 * screen reader's value announcements all come from.
 */
export const CareerTimeline = ({ timeline }: { timeline: Timeline }) => {
  const { clips, length, origin } = timeline;
  const [month, setMonth] = useState(length);
  const [track, setTrack] = useState<TrackId>("engineering");
  const groupName = useId();

  // A track that had not started by this month hands the panel back to the
  // day job rather than showing nothing.
  const onAir =
    clipAt(clips, track, month) ?? clipAt(clips, "engineering", month);
  const alsoRunning = TRACKS.flatMap(({ id }) => {
    if (id === onAir?.track) return [];
    const clip = clipAt(clips, id, month);
    return clip ? [clip] : [];
  });

  const when = month === length ? "Now" : formatMonthIndex(origin + month);
  const position = month / length;

  // Clicking a row is how a pointer picks a track, as the radios do for a
  // keyboard. The input covers all the rows, so the row comes from the height.
  const selectTrackFromPointer = (event: PointerEvent<HTMLInputElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const row = Math.floor(
      ((event.clientY - rect.top) / rect.height) * TRACKS.length,
    );
    const next = TRACKS[row];
    if (next) setTrack(next.id);
  };

  const firstYear = Math.floor(origin / 12) + 1;
  const lastYear = Math.floor((origin + length) / 12);
  const years: number[] = [];
  for (let year = firstYear; year <= lastYear - 1; year += YEARS_STEP) {
    years.push(year);
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
        {/* Fixed height, so the page never shifts under the playhead as the
            text changes length. */}
        <div className="flex min-h-44 flex-col justify-end gap-2 lg:col-span-5 lg:min-h-56 lg:justify-center">
          <p className="text-muted-foreground flex items-center gap-2 text-sm font-semibold tabular-nums">
            <span
              aria-hidden="true"
              className="tally bg-tally size-2.5 rounded-full"
            />
            {when === "Now" ? "On air now" : when}
          </p>
          <p className="text-foreground text-xl font-bold tracking-tight text-balance md:text-2xl">
            {onAir && <RoleTitle title={onAir.title} />}
          </p>
          <p className="text-foreground text-base font-semibold">
            {onAir?.organisation}
          </p>
          <p className="text-muted-foreground max-w-[48ch] text-sm/relaxed text-pretty md:text-base/relaxed">
            {onAir?.result}
          </p>
          {alsoRunning.length > 0 && (
            <p className="text-muted-foreground mt-1 text-sm">
              Also running: {alsoRunning.map(clipSummary).join(", ")}
            </p>
          )}
        </div>

        {/* One tab stop, arrow keys between tracks. */}
        <fieldset
          data-ui
          className="grid grid-cols-3 content-center gap-3 md:gap-4 lg:col-span-7"
        >
          <legend className="sr-only">Show this track</legend>
          {TRACKS.map(({ id, label }) => {
            const clip = clipAt(clips, id, month);
            const feed = FEEDS[feedFor(id, clip)];
            const isLive = (onAir?.track ?? "engineering") === id;

            return (
              <label
                key={id}
                className="group has-focus-visible:outline-ring flex cursor-pointer flex-col gap-2.5 outline-offset-4 has-focus-visible:outline-2"
              >
                <input
                  type="radio"
                  name={groupName}
                  value={id}
                  checked={track === id}
                  onChange={() => setTrack(id)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "bg-muted outline-tally relative block aspect-4/3 overflow-hidden transition-[opacity,outline-width] duration-200",
                    isLive ? "outline-4" : "opacity-55 group-hover:opacity-100",
                  )}
                >
                  <Image
                    src={feed.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 33vw, 20vw"
                    className={cn("object-cover", feed.position)}
                  />
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold transition-colors md:text-base",
                    isLive
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {label}
                  {!clip && (
                    <span className="text-muted-foreground font-medium">
                      {" "}
                      (not yet)
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </fieldset>
      </div>

      <div
        data-ui
        className="grid grid-cols-[5.75rem_minmax(0,1fr)] gap-x-2 md:grid-cols-[7rem_minmax(0,1fr)]"
      >
        <div aria-hidden="true" className="flex flex-col">
          {TRACKS.map(({ id, label }) => (
            <span
              key={id}
              className={cn(
                "scrub-row flex items-center gap-2 text-[0.8125rem] font-semibold transition-colors md:text-sm",
                (onAir?.track ?? "engineering") === id
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full transition-colors",
                  (onAir?.track ?? "engineering") === id
                    ? "bg-tally"
                    : "bg-muted-foreground/40",
                )}
              />
              {label}
            </span>
          ))}
        </div>

        <div className="@container relative">
          <div className="scrub-reveal flex flex-col">
            {TRACKS.map(({ id }) => (
              <div key={id} className="scrub-row relative">
                <div
                  className="bg-muted/40 absolute inset-y-0.5 rounded-sm"
                  style={{ left: THUMB_INSET, right: THUMB_INSET }}
                >
                  {clips
                    .filter((clip) => clip.track === id)
                    .map((clip) => (
                      <ClipBlock
                        key={clip.id}
                        clip={clip}
                        length={length}
                        isCurrent={month >= clip.start && month <= clip.end}
                        isOnAir={clip.id === onAir?.id}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>

          <input
            data-needs-js
            type="range"
            min={0}
            max={length}
            step={1}
            value={month}
            onChange={(event) => setMonth(Number(event.target.value))}
            onPointerDown={selectTrackFromPointer}
            aria-label="Move through career by month"
            aria-valuetext={
              onAir ? `${when}: ${onAir.title}, ${onAir.organisation}` : when
            }
            className="scrub"
          />

          <div
            data-needs-js
            aria-hidden="true"
            className="scrub-playhead-rail pointer-events-none absolute inset-x-0 top-0"
          >
            <div
              className="scrub-playhead bg-tally absolute inset-y-0 w-0.5 -translate-x-1/2"
              style={{ left: playheadLeft(position) }}
            >
              <span className="bg-tally absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full" />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="text-muted-foreground relative mt-1 h-5 text-[0.8125rem] font-medium tabular-nums"
          >
            <div
              className="absolute inset-y-0"
              style={{ left: THUMB_INSET, right: THUMB_INSET }}
            >
              {years.map((year) => (
                <span
                  key={year}
                  className="absolute -translate-x-1/2"
                  style={{ left: `${((year * 12 - origin) / length) * 100}%` }}
                >
                  {year}
                </span>
              ))}
              <span className="absolute right-0">Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const clipSummary = (clip: Clip) =>
  clip.track === "photography"
    ? clip.title
    : `${clip.title} (${clip.organisation})`;

const ClipBlock = ({
  clip,
  length,
  isCurrent,
  isOnAir,
}: {
  clip: Clip;
  length: number;
  isCurrent: boolean;
  isOnAir: boolean;
}) => (
  <div
    className={cn(
      "absolute inset-y-0 overflow-hidden rounded-sm px-1.5 text-[0.8125rem]/7 font-semibold whitespace-nowrap transition-colors md:px-2 md:leading-8",
      isOnAir
        ? "bg-primary text-primary-foreground"
        : isCurrent
          ? "bg-accent text-accent-foreground"
          : "bg-muted text-muted-foreground",
    )}
    style={{
      left: `${(clip.start / length) * 100}%`,
      // A hair short, so neighbouring clips read as separate cuts.
      width: `calc(${((clip.end - clip.start) / length) * 100}% - 2px)`,
    }}
  >
    <span className="hidden @2xl:inline">{clip.label}</span>
  </div>
);
