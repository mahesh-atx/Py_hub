import JSZip from "jszip";

export function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadText(
  filename: string,
  text: string,
  mime = "text/plain;charset=utf-8",
): void {
  downloadBlob(filename, new Blob([text], { type: mime }));
}

export async function downloadProject(
  files: { path: string; content: string }[],
): Promise<void> {
  const zip = new JSZip();
  for (const f of files) {
    zip.file(f.path || "untitled.txt", f.content ?? "");
  }
  const blob = await zip.generateAsync({ type: "blob" });
  downloadBlob("python-project.zip", blob);
}

export function readFileAsText(file: File): Promise<string> {
  return file.text();
}
