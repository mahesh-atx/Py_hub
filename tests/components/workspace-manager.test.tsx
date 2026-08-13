import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WorkspaceManager } from "@/components/ide/WorkspaceManager";

function renderManager() {
  const callbacks = {
    onSwitchWorkspace: vi.fn(),
    onCreateWorkspace: vi.fn(),
    onDeleteWorkspace: vi.fn(),
    onRenameWorkspace: vi.fn(),
  };
  render(
    <WorkspaceManager
      workspaces={[
        { id: "default", name: "Default Workspace" },
        { id: "course", name: "Course Work" },
      ]}
      currentWorkspaceId="default"
      {...callbacks}
    />,
  );
  return callbacks;
}

describe("WorkspaceManager", () => {
  it("switches to a selected workspace", () => {
    const callbacks = renderManager();
    fireEvent.click(screen.getByText("Course Work"));
    expect(callbacks.onSwitchWorkspace).toHaveBeenCalledWith("course");
  });

  it("creates a trimmed workspace name", () => {
    const callbacks = renderManager();
    fireEvent.click(screen.getByRole("button", { name: /new workspace/i }));
    fireEvent.change(screen.getByPlaceholderText("Workspace name..."), {
      target: { value: "  Data Science  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(callbacks.onCreateWorkspace).toHaveBeenCalledWith("Data Science");
    expect(screen.getByRole("button", { name: /new workspace/i })).toBeVisible();
  });

  it("renames a workspace", () => {
    const callbacks = renderManager();
    fireEvent.click(screen.getAllByTitle("Rename")[1]);
    const input = screen.getByDisplayValue("Course Work");
    fireEvent.change(input, { target: { value: "Exercises" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(callbacks.onRenameWorkspace).toHaveBeenCalledWith("course", "Exercises");
  });

  it("requires confirmation before deleting", () => {
    const callbacks = renderManager();
    fireEvent.click(screen.getAllByTitle("Delete")[1]);
    expect(screen.getByText(/Delete "Course Work"/)).toBeVisible();
    const confirm = screen
      .getAllByRole("button", { name: "Delete" })
      .find((button) => button.textContent === "Delete");
    expect(confirm).toBeDefined();
    fireEvent.click(confirm!);
    expect(callbacks.onDeleteWorkspace).toHaveBeenCalledWith("course");
  });
});
