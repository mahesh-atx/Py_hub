import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MobileNavigation } from "@/components/ide/MobileNavigation";

describe("MobileNavigation", () => {
  it("switches between editor and terminal views", () => {
    const onView = vi.fn();
    render(
      <MobileNavigation
        view="editor"
        activity="explorer"
        onView={onView}
        onActivity={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /terminal/i }));
    expect(onView).toHaveBeenCalledWith("terminal");
  });

  it("opens learning and package activities in the sidebar", () => {
    const onView = vi.fn();
    const onActivity = vi.fn();
    render(
      <MobileNavigation
        view="sidebar"
        activity="explorer"
        onView={onView}
        onActivity={onActivity}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /learn/i }));
    expect(onActivity).toHaveBeenCalledWith("practice");
    expect(onView).toHaveBeenCalledWith("sidebar");

    fireEvent.click(screen.getByRole("button", { name: /packages/i }));
    expect(onActivity).toHaveBeenCalledWith("extensions");
  });
});
