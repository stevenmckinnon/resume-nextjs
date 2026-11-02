import { CommandPaletteProvider } from "@/components/command-palette";
import { MIXER_SECTIONS, Mixer } from "@/components/mixer";
import { setNumberKeysEnabled } from "@/lib/preferences";
import { act, render, screen } from "@/test/utils";
import { fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const setup = () =>
  render(
    <CommandPaletteProvider>
      <Mixer />
      <input aria-label="A field" />
    </CommandPaletteProvider>,
  );

describe("Mixer", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  afterEach(() => {
    act(() => setNumberKeysEnabled(true));
    vi.unstubAllGlobals();
  });

  it("links to every section", () => {
    setup();
    const nav = screen.getByRole("navigation", { name: "Sections" });

    for (const { id } of MIXER_SECTIONS) {
      expect(nav.querySelector(`a[href="#${id}"]`)).not.toBeNull();
    }
  });

  it("cuts to a section on its number key", () => {
    setup();
    fireEvent.keyDown(document.body, { key: "3" });

    expect(window.location.hash).toBe("#projects");
  });

  it("ignores number keys while typing", () => {
    setup();
    fireEvent.keyDown(screen.getByRole("textbox", { name: "A field" }), {
      key: "3",
    });

    expect(window.location.hash).toBe("");
  });

  it("still cuts away from a focused slider", () => {
    setup();
    const slider = document.createElement("input");
    slider.type = "range";
    document.body.append(slider);
    fireEvent.keyDown(slider, { key: "4" });
    slider.remove();

    expect(window.location.hash).toBe("#other");
  });

  it("ignores number keys with a modifier, which belong to the browser", () => {
    setup();
    fireEvent.keyDown(document.body, { key: "3", metaKey: true });
    fireEvent.keyDown(document.body, { key: "3", ctrlKey: true });

    expect(window.location.hash).toBe("");
  });

  it("can have its shortcuts turned off", () => {
    // jsdom's storage is not available under this test config.
    const stored = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => stored.get(key) ?? null,
      setItem: (key: string, value: string) => stored.set(key, value),
    });

    setup();
    act(() => setNumberKeysEnabled(false));
    fireEvent.keyDown(document.body, { key: "2" });

    expect(window.location.hash).toBe("");
  });

  it("ignores keys with no section", () => {
    setup();
    fireEvent.keyDown(document.body, { key: "9" });
    fireEvent.keyDown(document.body, { key: "a" });

    expect(window.location.hash).toBe("");
  });
});
