import {
  buildCommandGroups,
  CommandPaletteProvider,
  matchesQuery,
  type Command,
} from "@/components/command-palette";
import { DATA } from "@/data/resume";
import { render, screen } from "@/test/utils";
import { fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const command = (overrides: Partial<Command> = {}): Command => ({
  value: "test",
  label: "Download CV",
  keywords: "resume pdf",
  icon: () => null,
  ...overrides,
});

const groups = () =>
  buildCommandGroups({ resolvedTheme: "dark", setTheme: vi.fn() });

const allCommands = () => groups().flatMap((group) => group.items);

describe("matchesQuery", () => {
  it("matches an empty query against everything", () => {
    expect(matchesQuery(command(), "")).toBe(true);
  });

  it("matches the label regardless of case", () => {
    expect(matchesQuery(command(), "download")).toBe(true);
    expect(matchesQuery(command(), "DOWNLOAD")).toBe(true);
  });

  it("matches keywords that never appear on screen", () => {
    expect(matchesQuery(command(), "resume")).toBe(true);
  });

  it("requires every token to match", () => {
    expect(matchesQuery(command(), "download resume")).toBe(true);
    expect(matchesQuery(command(), "download spreadsheet")).toBe(false);
  });

  it("ignores surrounding whitespace", () => {
    expect(matchesQuery(command(), "  cv  ")).toBe(true);
  });
});

describe("buildCommandGroups", () => {
  it("groups commands into jump targets, actions and links", () => {
    expect(groups().map((group) => group.value)).toEqual([
      "Jump to",
      "Actions",
      "Elsewhere",
    ]);
  });

  it("gives every command a unique value", () => {
    const values = allCommands().map((entry) => entry.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it("points jump targets at the section ids rendered on the page", () => {
    const targets = groups()[0]!.items.map((entry) => entry.scrollTo);
    expect(targets).toEqual([
      "about",
      "skills",
      "work",
      "education",
      "projects",
      "github",
      "other",
      "contact",
    ]);
  });

  it("serves the CV from the download route", () => {
    const cv = allCommands().find((entry) => entry.value === "download-cv");
    expect(cv?.href).toBe("/api/cv");
    expect(cv?.download).toBe("Steve McKinnon CV.pdf");
  });

  it("labels the theme command with the theme it switches to", () => {
    const setTheme = vi.fn();
    const dark = buildCommandGroups({ resolvedTheme: "dark", setTheme })
      .flatMap((group) => group.items)
      .find((entry) => entry.value === "toggle-theme");
    const light = buildCommandGroups({ resolvedTheme: "light", setTheme })
      .flatMap((group) => group.items)
      .find((entry) => entry.value === "toggle-theme");

    expect(dark?.label).toBe("Switch to light mode");
    expect(light?.label).toBe("Switch to dark mode");
  });

  it("links out to every social profile shown in the navbar", () => {
    const expected = Object.values(DATA.contact.social)
      .filter((social) => social.navbar)
      .map((social) => social.url);
    const linked = groups()[2]!.items.map((entry) => entry.href);

    expect(linked).toEqual(expected);
    expect(groups()[2]!.items.every((entry) => entry.external)).toBe(true);
  });
});

describe("CommandPaletteProvider", () => {
  it("renders its children", () => {
    render(
      <CommandPaletteProvider>
        <p>page content</p>
      </CommandPaletteProvider>,
    );

    expect(screen.getByText("page content")).toBeInTheDocument();
  });

  it("opens on ⌘K and closes on a second press", async () => {
    render(
      <CommandPaletteProvider>
        <p>page content</p>
      </CommandPaletteProvider>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.keyDown(document, { key: "k", metaKey: true });
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "k", metaKey: true });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on Ctrl+K for people without a Command key", async () => {
    render(
      <CommandPaletteProvider>
        <p>page content</p>
      </CommandPaletteProvider>,
    );

    fireEvent.keyDown(document, { key: "k", ctrlKey: true });
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("ignores an unmodified k so typing still works", () => {
    render(
      <CommandPaletteProvider>
        <p>page content</p>
      </CommandPaletteProvider>,
    );

    fireEvent.keyDown(document, { key: "k" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
