import { CopyEmailButton } from "@/components/copy-email-button";
import { DATA } from "@/data/resume";
import { act, fireEvent, render, screen, waitFor } from "@/test/utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const toast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }));
vi.mock("sonner", () => ({ toast }));

const setClipboard = (writeText: (text: string) => Promise<void>) =>
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });

describe("CopyEmailButton", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    toast.success.mockClear();
    toast.error.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("copies the address, confirms in the button and skips the toast", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);
    render(<CopyEmailButton />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(screen.getByRole("button")).toHaveClass("text-success"),
    );
    expect(writeText).toHaveBeenCalledWith(DATA.contact.email);
    expect(screen.getByRole("button")).toHaveAccessibleName("Copied");
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("announces the copy to screen readers", async () => {
    setClipboard(vi.fn().mockResolvedValue(undefined));
    render(<CopyEmailButton />);

    fireEvent.click(screen.getByRole("button"));

    expect(
      await screen.findByText(`Copied ${DATA.contact.email} to clipboard`),
    ).toBeInTheDocument();
  });

  it("goes back to Copy address after two seconds", async () => {
    setClipboard(vi.fn().mockResolvedValue(undefined));
    render(<CopyEmailButton />);

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(screen.getByRole("button")).toHaveAccessibleName("Copied"),
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByRole("button")).toHaveAccessibleName("Copy address");
    expect(screen.getByRole("button")).not.toHaveClass("text-success");
  });

  it("keeps the button as it was and shows the error toast when copying fails", async () => {
    setClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    render(<CopyEmailButton />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(toast.error).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("button")).toHaveAccessibleName("Copy address");
    expect(screen.getByRole("button")).not.toHaveClass("text-success");
  });
});
