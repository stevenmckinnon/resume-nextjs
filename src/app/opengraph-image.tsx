import { DATA } from "@/data/resume";
import { buildTimeline, TRACKS } from "@/lib/career";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = `${DATA.name}: ${DATA.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The hex equivalents of --background, --foreground, --muted and --primary in
// the dark theme. Satori does not read CSS variables or oklch().
const BACKGROUND = "#110f0e";
const FOREGROUND = "#f9f7f5";
const MUTED = "#a8a29f";
const TRACK = "#2b2725";
const LIVE = "#b4383f";

// Module scope, or the Date would make this route dynamic.
const { clips, length } = buildTimeline(new Date());

/**
 * The share card when a link lands in Slack or LinkedIn. It used to be a square
 * portrait declared as 1200x630, which every preview cropped through the face.
 */
export default async function OpengraphImage() {
  // A static TTF, because Satori cannot read woff2 or variable fonts.
  const display = await readFile(
    join(process.cwd(), "src/app/fonts/ArchivoNarrow-Bold.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: BACKGROUND,
        color: FOREGROUND,
        fontFamily: "Archivo Narrow",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 176,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          {DATA.name}
        </div>
        <div style={{ fontSize: 42, color: MUTED, maxWidth: 1040 }}>
          {DATA.description}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {TRACKS.map(({ id }) => (
          <div
            key={id}
            style={{
              position: "relative",
              display: "flex",
              height: 30,
              background: BACKGROUND,
            }}
          >
            {clips
              .filter((clip) => clip.track === id)
              .map((clip) => (
                <div
                  key={clip.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: `${(clip.start / length) * 100}%`,
                    width: `${((clip.end - clip.start) / length) * 100 - 0.3}%`,
                    background: clip.end === length ? LIVE : TRACK,
                    borderRadius: 4,
                  }}
                />
              ))}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Archivo Narrow",
          data: display,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
