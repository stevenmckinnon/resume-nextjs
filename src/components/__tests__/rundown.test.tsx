import { Rundown } from "@/components/rundown";
import { DATA } from "@/data/resume";
import { render, screen } from "@/test/utils";
import { describe, expect, it } from "vitest";

describe("Rundown", () => {
  it("shows every role and every line without any interaction", () => {
    render(<Rundown />);

    for (const role of DATA.work) {
      expect(
        screen.getAllByRole("heading", { level: 3, name: role.title }).length,
      ).toBeGreaterThan(0);
      for (const line of role.description ?? []) {
        expect(screen.getByText(line)).toBeVisible();
      }
    }
  });

  it("has no controls that can hide content", () => {
    render(<Rundown />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(document.querySelector("[aria-expanded]")).toBeNull();
  });

  it("marks only the current role as ongoing", () => {
    render(<Rundown />);

    expect(screen.getAllByText(/to now$/)).toHaveLength(1);
  });
});
