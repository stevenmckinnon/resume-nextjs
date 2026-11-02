import { Reveal } from "@/components/reveal";
import { render, screen } from "@/test/utils";
import { describe, expect, it } from "vitest";

describe("Reveal", () => {
  it("never renders its content hidden", () => {
    render(<Reveal>Visible</Reveal>);
    const wrapper = screen.getByText("Visible");

    expect(wrapper.style.opacity).toBe("");
    expect(wrapper).toHaveClass("reveal");
  });

  it("passes its order to CSS for the stagger", () => {
    render(<Reveal order={2}>Second</Reveal>);

    expect(
      screen.getByText("Second").style.getPropertyValue("--reveal-order"),
    ).toBe("2");
  });

  it("uses the time-based entrance for content on screen at load", () => {
    render(<Reveal onLoad>Now</Reveal>);

    expect(screen.getByText("Now")).toHaveClass("reveal-load");
  });
});
