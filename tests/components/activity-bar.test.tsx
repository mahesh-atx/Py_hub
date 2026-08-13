import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ActivityBar } from "@/components/ide/ActivityBar";

describe("ActivityBar", () => {
  it("selects a new activity and toggles the current one", () => {
    const onSelect = vi.fn();
    const onToggleCurrent = vi.fn();
    render(
      <ActivityBar
        activity="explorer"
        sidebarOpen
        onSelect={onSelect}
        onToggleCurrent={onToggleCurrent}
        onOpenSettings={vi.fn()}
      />,
    );

    expect(screen.queryByTitle(/Search \(planned\)/)).not.toBeInTheDocument();
    expect(screen.queryByTitle("Local profile")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle("Packages"));
    expect(onSelect).toHaveBeenCalledWith("extensions");
    fireEvent.click(screen.getByTitle(/Explorer/));
    expect(onToggleCurrent).toHaveBeenCalledOnce();
  });

  it("opens settings", () => {
    const onOpenSettings = vi.fn();
    render(
      <ActivityBar
        activity="explorer"
        sidebarOpen
        onSelect={vi.fn()}
        onToggleCurrent={vi.fn()}
        onOpenSettings={onOpenSettings}
      />,
    );
    fireEvent.click(screen.getByTitle("Manage Settings"));
    expect(onOpenSettings).toHaveBeenCalledOnce();
  });
});
