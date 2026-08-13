/// <reference lib="webworker" />

// Bundle Monaco's editor worker through the application toolchain so the IDE
// remains self-hosted and does not emit failed CDN/worker promises.
import "monaco-editor/editor/editor.worker.js";

export {};
