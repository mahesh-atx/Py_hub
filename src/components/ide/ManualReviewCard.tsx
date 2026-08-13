"use client";

import { CircleCheck } from "lucide-react";
import type { ManualSubmissionReview } from "@/lib/practice/manual";

export function ManualReviewCard({
  review,
  validated,
  solved,
  onConfirm,
}: {
  review: ManualSubmissionReview | null;
  validated: boolean;
  solved: boolean;
  onConfirm: () => void;
}) {
  return (
    <div className="mb-3 rounded border border-amber-700/40 bg-amber-500/10 p-3 text-[11px] text-[var(--vscode-text)]">
      <div className="mb-2 flex items-center gap-2 font-semibold text-amber-300">
        <CircleCheck className="h-4 w-4" /> Manual rubric confirmation
      </div>
      <p className="mb-2 text-[var(--vscode-text-muted)]">
        This challenge has no reliable output assertion. Submit first to validate
        substantive code and required files. Then run the relevant entry point,
        compare it with the task rubric, and confirm only when every requirement
        is satisfied.
      </p>
      {review?.checks.length ? (
        <ul className="mb-2 list-disc space-y-1 pl-4 text-emerald-300/90">
          {review.checks.map((check) => (
            <li key={check}>{check}</li>
          ))}
        </ul>
      ) : null}
      <button
        onClick={onConfirm}
        disabled={!validated || solved}
        className="w-full rounded bg-amber-600 px-3 py-2 font-semibold text-white hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {solved
          ? "Completion confirmed"
          : validated
            ? "I ran and reviewed every rubric item — mark complete"
            : "Submit a complete solution to unlock confirmation"}
      </button>
    </div>
  );
}
