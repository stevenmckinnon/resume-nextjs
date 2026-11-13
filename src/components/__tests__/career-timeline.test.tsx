import { CareerTimeline } from "@/components/career-timeline";
import { buildTimeline } from "@/lib/career";
import { render, screen } from "@/test/utils";
import { fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const timeline = buildTimeline(new Date(2026, 10, 15));

const tileImage = (track: string) =>
  screen
    .getByRole("radio", { name: track })
    .closest("label")!
    .querySelector("img");

const setup = () => {
  render(<CareerTimeline timeline={timeline} />);
  return screen.getByRole("slider", { name: /move through career/i });
};

describe("CareerTimeline", () => {
  it("opens on the current role", () => {
    const slider = setup();

    expect(slider).toHaveValue(String(timeline.length));
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      "Now: Senior Lead Front-End Developer, JPMorgan Chase",
    );
    expect(
      screen.getByText("On air now", { selector: "p" }),
    ).toBeInTheDocument();
  });

  it("names the date and role for screen readers as it moves", () => {
    const slider = setup();
    // March 2022 onwards is &Open.
    fireEvent.change(slider, { target: { value: 100 } });

    expect(slider.getAttribute("aria-valuetext")).toMatch(
      /2022: Lead Front-End Developer, &Open/,
    );
  });

  it("switches the monitor to another track", () => {
    setup();
    fireEvent.click(screen.getByRole("radio", { name: "Broadcast" }));

    expect(screen.getByText("Camera Operator")).toBeInTheDocument();
    expect(
      screen.getByText("WWE and ICW", { selector: "p" }),
    ).toBeInTheDocument();
  });

  it("shows the WWE picture on the broadcast tile once WWE has started", () => {
    const slider = setup();

    // Both WWE and ICW by now, so the WWE picture.
    expect(tileImage("Broadcast")).toHaveAttribute("src", "/timeline-wwe.jpg");

    // October 2020 is ICW on its own.
    fireEvent.change(slider, { target: { value: 76 } });
    expect(tileImage("Broadcast")).toHaveAttribute("src", "/timeline-icw.jpg");
  });

  it("marks a track that had not started yet", () => {
    const slider = setup();
    fireEvent.change(slider, { target: { value: 0 } });

    expect(screen.getAllByText("(not yet)")).toHaveLength(2);
  });

  it("keeps the track names as the radios' names", () => {
    setup();

    // The tile pictures are decorative, so they add nothing to the name.
    expect(tileImage("Photography")).toHaveAttribute("alt", "");
    expect(
      screen.getByRole("radio", { name: "Photography" }),
    ).toBeInTheDocument();
  });

  it("falls back to engineering when a track had not started", () => {
    const slider = setup();
    fireEvent.click(screen.getByRole("radio", { name: "Broadcast" }));
    fireEvent.change(slider, { target: { value: 0 } });

    expect(slider.getAttribute("aria-valuetext")).toBe(
      "June 2014: Front-End Developer, JPMorgan Chase",
    );
  });

  it("shows every track without needing a script to run", () => {
    setup();
    for (const name of ["Engineering", "Broadcast", "Photography"]) {
      expect(screen.getByRole("radio", { name })).toBeInTheDocument();
    }
  });
});
