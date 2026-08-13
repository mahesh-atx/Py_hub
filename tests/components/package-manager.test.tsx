import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PackageManager } from "@/components/package-manager/PackageManager";
import { KNOWN_PACKAGES } from "@/lib/packages";

describe("PackageManager", () => {
  it("renders all known packages with logos and install buttons", () => {
    render(<PackageManager installed={[]} installing={null} onInstall={vi.fn()} />);
    for (const pkg of KNOWN_PACKAGES) {
      expect(screen.getByTestId(`package-${pkg.name}`)).toBeVisible();
      expect(screen.getByAltText(`${pkg.name} logo`)).toBeInTheDocument();
    }
    expect(screen.queryByText("built-in")).not.toBeInTheDocument();
    expect(screen.getByText("No packages installed yet.")).toBeVisible();
  });

  it("shows installed state for bundled packages", () => {
    render(
      <PackageManager
        installed={["numpy"]}
        bundled={["numpy"]}
        installing={null}
        onInstall={vi.fn()}
      />,
    );
    const row = screen.getByTestId("package-numpy");
    expect(within(row).getByText("Installed")).toBeVisible();
    const plotlyRow = screen.getByTestId("package-plotly");
    expect(within(plotlyRow).getByText("Install")).toBeVisible();
  });

  it("shows a useful failure and retries only that package", () => {
    const onInstall = vi.fn();
    render(
      <PackageManager
        installed={[]}
        installing={null}
        failures={{ matplotlib: "The package download failed. Check your network connection and retry." }}
        onInstall={onInstall}
      />,
    );
    const row = screen.getByTestId("package-matplotlib");
    expect(within(row).getByRole("alert")).toHaveTextContent("network connection");
    fireEvent.click(within(row).getByRole("button", { name: "Retry installing matplotlib" }));
    expect(onInstall).toHaveBeenCalledWith(["matplotlib"]);
  });

  it("installs individual packages via their install button", () => {
    const onInstall = vi.fn();
    render(<PackageManager installed={[]} installing={null} onInstall={onInstall} />);
    fireEvent.click(screen.getByRole("button", { name: "Install numpy" }));
    expect(onInstall).toHaveBeenCalledWith(["numpy"]);
  });
});
