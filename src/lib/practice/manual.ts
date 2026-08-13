export interface WorkspaceTextFile {
  path: string;
  content: string;
}

export interface ManualSubmissionReview {
  ready: boolean;
  missing: string[];
  incomplete: string[];
  checks: string[];
}

export function requiresManualReview(
  kind: "Q" | "P" | "A",
  testCount: number,
): boolean {
  return testCount === 0 && (kind === "P" || kind === "A");
}

function meaningfulPython(content: string): boolean {
  return content
    .split("\n")
    .map((line) => line.trim())
    .some((line) => line.length > 0 && !line.startsWith("#"));
}

function meaningfulMarkdown(content: string): boolean {
  const body = content
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line &&
        !line.startsWith("#") &&
        !/^Design notes, reflections, and written answers live here\.?$/i.test(line),
    )
    .join(" ");
  return body.length >= 20;
}

function meaningfulJson(content: string): boolean {
  try {
    const value = JSON.parse(content);
    if (Array.isArray(value)) return value.length > 0;
    return value != null && typeof value === "object"
      ? Object.keys(value).length > 0
      : true;
  } catch {
    return false;
  }
}

export function hasMeaningfulDeliverable(path: string, content: string): boolean {
  const lower = path.toLowerCase();
  if (lower.endsWith("/__init__.py")) return true;
  if (lower.endsWith(".py")) return meaningfulPython(content);
  if (lower.endsWith(".md")) return meaningfulMarkdown(content);
  if (lower.endsWith(".json")) return meaningfulJson(content);
  return content.trim().length > 0;
}

/**
 * Gate manual completion for projects/assignments that have no output tests.
 * Required multi-file deliverables must exist inside the challenge scope and
 * contain more than the generated starter placeholders.
 */
export function reviewManualSubmission({
  activePath,
  activeContent,
  scopePath,
  requiredFiles,
  workspaceFiles,
}: {
  activePath: string;
  activeContent: string;
  scopePath?: string;
  requiredFiles?: string[];
  workspaceFiles: WorkspaceTextFile[];
}): ManualSubmissionReview {
  const required = requiredFiles ?? [];
  if (required.length === 0) {
    const complete = hasMeaningfulDeliverable(activePath, activeContent);
    return {
      ready: complete,
      missing: [],
      incomplete: complete ? [] : [activePath || "active solution"],
      checks: complete
        ? ["Solution contains executable or substantive content."]
        : [],
    };
  }

  const normalizedScope = scopePath?.replace(/\/$/, "") ?? "";
  const byPath = new Map(workspaceFiles.map((file) => [file.path, file]));
  const missing: string[] = [];
  const incomplete: string[] = [];
  const checks: string[] = [];

  for (const relative of required) {
    const expectedPath = normalizedScope
      ? `${normalizedScope}/${relative}`
      : relative;
    const file = byPath.get(expectedPath);
    if (!file) {
      missing.push(relative);
    } else if (!hasMeaningfulDeliverable(expectedPath, file.content)) {
      incomplete.push(relative);
    } else {
      checks.push(`${relative} is present and contains substantive content.`);
    }
  }

  return {
    ready: missing.length === 0 && incomplete.length === 0,
    missing,
    incomplete,
    checks,
  };
}
