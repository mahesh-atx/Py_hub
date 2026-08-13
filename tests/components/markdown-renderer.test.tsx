import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MarkdownRenderer from "@/components/MarkdownRenderer";

describe("MarkdownRenderer course navigation", () => {
  it("routes relative Markdown links through the IDE callback", () => {
    const onNavigateLink = vi.fn();
    render(
      <MarkdownRenderer
        content="Continue to [Functions](module-09-functions.md#parameters)."
        fileId="course-readme"
        onNavigateLink={onNavigateLink}
      />,
    );

    fireEvent.click(screen.getByRole("link", { name: "Functions" }));
    expect(onNavigateLink).toHaveBeenCalledWith(
      "module-09-functions.md#parameters",
    );
  });

  it("does not intercept page anchors", () => {
    const onNavigateLink = vi.fn();
    render(
      <MarkdownRenderer
        content="Jump to [Examples](#examples)."
        fileId="course-module"
        onNavigateLink={onNavigateLink}
      />,
    );

    fireEvent.click(screen.getByRole("link", { name: "Examples" }));
    expect(onNavigateLink).not.toHaveBeenCalled();
  });
});
