import { DockingName, measureFlight } from "@/components/docking-name";
import { DATA } from "@/data/resume";
import { render, screen } from "@/test/utils";
import { describe, expect, it } from "vitest";

describe("measureFlight", () => {
  const flight = measureFlight(
    { left: 40, top: 80, height: 200, fontSize: 200 },
    { left: 40, top: 16, height: 32, fontSize: 20 },
  );

  it("starts exactly over the heading", () => {
    expect(flight.from).toEqual({ x: 40, y: 80 });
    expect(flight.fontSize).toBe(200);
  });

  it("scales the name down to the wordmark's size", () => {
    expect(flight.scale).toBe(0.1);
  });

  it("centres the name on the wordmark's line", () => {
    // The scaled name is 20px tall in a 32px line starting at 16.
    expect(flight.to).toEqual({ x: 40, y: 22 });
  });

  it("takes a little longer to arrive than the name is tall", () => {
    expect(flight.distance).toBe(280);
  });
});

describe("DockingName", () => {
  it("is a plain link to the top when it cannot dock", () => {
    render(<DockingName />);
    const link = screen.getByRole("link", { name: DATA.name });

    expect(link).toHaveAttribute("href", "#content");
    expect(link).toHaveClass("text-foreground");
    expect(document.documentElement.dataset.nameDocking).toBeUndefined();
  });
});
