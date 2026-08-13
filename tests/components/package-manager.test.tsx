import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PackageManager } from "@/components/package-manager/PackageManager";
import { KNOWN_PACKAGES } from "@/lib/packages";

describe("PackageManager", () => {
  it("describes compatible packages without claiming they are preinstalled", () => {
    render(<PackageManager installed={[]} installing={null} onInstall={vi.fn()} />);
    expect(screen.getAllByText("Pyodide compatible").length).toBe(KNOWN_PACKAGES.length);
    expect(screen.queryByText("built-in")).not.toBeInTheDocument();
    expect(screen.getAllByText("Internet required")).toHaveLength(KNOWN_PACKAGES.length);
    expect(screen.getByText("No optional packages installed yet.")).toBeVisible();
  });

  it("distinguishes same-origin bundles from packages that need internet", () => {
    render(
      <PackageManager
        installed={[]}
        bundled={["numpy"]}
        installing={null}
        onInstall={vi.fn()}
      />,
    );
    expect(within(screen.getByTestId("package-numpy")).getByText("Bundled")).toBeVisible();
    expect(
      within(screen.getByTestId("package-plotly")).getByText("Internet required"),
    ).toBeVisible();
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

  it("installs the complete curriculum stack in one action", () => {
    const onInstall = vi.fn();
    render(<PackageManager installed={[]} installing={null} onInstall={onInstall} />);
    fireEvent.click(screen.getByRole("button", { name: "Install curriculum packages" }));
    expect(onInstall).toHaveBeenCalledWith(
      KNOWN_PACKAGES.filter((pkg) => pkg.curriculum).map((pkg) => pkg.name),
    );
  });
});
