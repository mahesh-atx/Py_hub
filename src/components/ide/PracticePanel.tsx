"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Loader2, CircleCheck, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, BookOpen, TerminalSquare, PlayCircle, Lightbulb, Target, Lock, LayoutDashboard, X, Brain } from "lucide-react";
import { toast } from "@/components/ide/ToastContainer";
import { getKV, setKV } from "@/lib/storage/idb";
import confetti from "canvas-confetti";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ManualReviewCard } from "@/components/ide/ManualReviewCard";
import { terminalStore } from "@/lib/terminal/store";
import {
  evaluatePracticeTest,
  getConstraintViolation,
} from "@/lib/practice/judge";
import { parsePracticeContent } from "@/lib/practice/parser";
import {
  requiresManualReview,
  reviewManualSubmission,
  type ManualSubmissionReview,
  type WorkspaceTextFile,
} from "@/lib/practice/manual";
import type {
  CapturedRun,
  Challenge,
  PracticeManifest as Manifest,
  PracticeTestsDocument,
} from "@/lib/practice/types";

const HINT_LABELS = ["Hint", "More code", "Full solution"];

function StatBar({ pct, color = "bg-[var(--vscode-accent)]" }: { pct: number; color?: string }) {
  return (
    <div className="h-[2px] w-full overflow-hidden bg-[var(--vscode-border)]">
      <div className={`h-full ${color} transition-[width] duration-300`} style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
    </div>
  );
}

// starter-project files that the Data Science tab needs inside the browser
// workspace so learners can open the data, run the generator scripts, and
// compare against the reference pipeline without leaving the sandbox.
const PHASE_6_STARTER_FILES = [
  "starter-project/README.md",
  "starter-project/profile_raw.py",
  "starter-project/data/make_messy_data.py",
  "starter-project/data/make_weather_data.py",
  "starter-project/data/make_stock_data.py",
  "starter-project/data/sales_raw.csv",
  "starter-project/data/customers_raw.csv",
  "starter-project/data/sales_clean.csv",
  "starter-project/data/customers_clean.csv",
  "starter-project/data/merged_clean.csv",
  "starter-project/data/titanic.csv",
  "starter-project/data/iris.csv",
  "starter-project/data/weather_sample.csv",
  "starter-project/data/stock_sample.csv",
  "starter-project/src/__init__.py",
  "starter-project/src/clean.py",
  "starter-project/src/eda.py",
  "starter-project/src/charts.py",
];

type RunCapture = (
  code: string,
  stdin?: string,
  timeoutMs?: number,
) => Promise<CapturedRun>;

export function PracticeSidebar({ 
  runTest, 
  onOpenOrCreateFile,
  onSeedFiles,
  activeFilePath,
  workspaceFiles,
  onPracticeStateChange,
  onTestResults
}: { 
  runTest: RunCapture; 
  onOpenOrCreateFile: (name: string, content: string, autoCreate?: boolean) => void;
  onSeedFiles?: (relativePaths: string[], batchId: string, batchTitle: string) => Promise<string[]>;
  activeFilePath: string;
  workspaceFiles: WorkspaceTextFile[];
  onPracticeStateChange?: (state: { isActive: boolean; hasTests: boolean; submitFn: ((code: string) => Promise<void>) | null; judgeStdoutFn: ((stdout: string) => void) | null; skipFn: (() => void) | null; canSkip: boolean }) => void;
  onTestResults?: (results: { passed: boolean; actual: string; expected: string }[] | null) => void;
}) {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [activeCategory, setActiveCategory] = useState<{ type: "batch", id: string, fileId: string } | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(false);
  
  
  // UI State
  const [batchesExpanded, setBatchesExpanded] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const [questionKind, setQuestionKind] = useState<"Q" | "P" | "A">("Q");

  const hasStarted = (c: Challenge | null) => {
    if (!c || !activeCategory) return false;
    const batchTitle = getBatchTitle(activeCategory.id) || "General";
    let targetFile = "";
    if (questionKind === "P" || questionKind === "A") {
      const categoryName = questionKind === "P" ? "Projects" : "Assignments";
      const folder = `.practice/${batchTitle}/${categoryName}/${c.id}-${c.title.replace(/^[APQ]\d+\.\s*/, "").replace(/^Capstone:\s*/, "").trim().replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, "-")}`;
      const fileList = deliverablesRef.current[activeCategory.id]?.[c.id];
      if (fileList && fileList.length > 0) targetFile = `${folder}/${fileList[0]}`;
      else targetFile = `${folder}.py`;
    } else {
      const fileName = `${c.id}-${c.title.replace(/^[APQ]\d+\.\s*/, "").trim().replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, "-")}.py`;
      targetFile = `.practice/${batchTitle}/Practice Questions/${fileName}`;
    }
    return workspaceFiles.some(f => f.path === targetFile);
  };

  // Hint reveal state (3 levels: hint -> more code -> full solution)
  const [hintOpen, setHintOpen] = useState(false);
  const [hintLevel, setHintLevel] = useState(0); // highest level revealed (0-3)
  const [hintView, setHintView] = useState(1); // level currently displayed
  const [hintAttempts, setHintAttempts] = useState(0); // failed submits for active challenge

  // Dashboard view
  const [dashboardOpen, setDashboardOpen] = useState(false);

  // Multi-file deliverables and manual-review state for challenges without tests.
  const deliverablesRef = useRef<Record<string, Record<string, string[]>>>({});
  const deliverablesPromiseRef = useRef<Promise<Record<string, Record<string, string[]>>> | null>(null);
  const ensureDeliverables = () => {
    if (!deliverablesPromiseRef.current) {
      deliverablesPromiseRef.current = fetch("/practice-data/deliverables.json")
        .then((response) => (response.ok ? response.json() : {}))
        .then((data) => {
          deliverablesRef.current = data;
          return data;
        })
        .catch(() => ({}));
    }
    return deliverablesPromiseRef.current;
  };
  const [manualScopePath, setManualScopePath] = useState<string | undefined>();
  const [manualReview, setManualReview] = useState<ManualSubmissionReview | null>(null);
  const [manualExecutionPassed, setManualExecutionPassed] = useState(false);

  const practiceStateRef = useRef<any>(null);

  // Persistence State
  const [solvedChallenges, setSolvedChallenges] = useState<Set<string>>(new Set());
  const [lastActive, setLastActive] = useState<{ type: "batch", id: string, fileId: string, challengeId: string } | null>(null);

  useEffect(() => {
    getKV("practiceState").then((state: any) => {
      practiceStateRef.current = state || {};
      if (state) {
        setSolvedChallenges(new Set(state.solved || []));
        setLastActive(state.lastActive || null);
      }
    });
  }, []);

  const updatePracticeState = (patch: (s: any) => any) => {
    getKV("practiceState").then((state: any) => {
      const base = state || practiceStateRef.current || {};
      const next = { ...base, ...patch(base) };
      practiceStateRef.current = next;
      setKV("practiceState", next);
    });
  };

  useEffect(() => {
    if (activeCategory && activeChallenge) {
      const newLastActive = { type: activeCategory.type, id: activeCategory.id, fileId: activeCategory.fileId, challengeId: activeChallenge.id };
      setLastActive(newLastActive);
      getKV("practiceState").then((state: any) => {
        setKV("practiceState", { ...(state || {}), lastActive: newLastActive });
      });
    }
  }, [activeCategory, activeChallenge]);

  const markSolved = (id: string, categoryId: string, categoryTotal: number) => {
    const uniqueId = `${categoryId}__${id}`;
    updatePracticeState(s => {
      const prevLevel = s.hints?.[uniqueId] || 0;
      if (prevLevel < 3) {
        setHintLevel(3);
        setHintView(3);
      }
      return { ...s, hints: { ...(s.hints || {}), [uniqueId]: 3 } };
    });
    setSolvedChallenges(prev => {
      if (prev.has(uniqueId)) return prev;
      const next = new Set(prev);
      next.add(uniqueId);
      getKV("practiceState").then((state: any) => {
        setKV("practiceState", { ...(state || {}), solved: Array.from(next) });
      });

      // Confetti for single solve
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8, x: 0.8 },
        colors: ['#4ade80', '#38bdf8', '#fbbf24'],
        zIndex: 9999
      });

      // Check for batch completion
      const solvedInCat = Array.from(next).filter(x => x.startsWith(categoryId + "__" + questionKind)).length;
      if (solvedInCat === categoryTotal) {
        setTimeout(() => {
           // Massive fireworks!
           const duration = 3000;
           const end = Date.now() + duration;
           (function frame() {
             confetti({
               particleCount: 5,
               angle: 60,
               spread: 55,
               origin: { x: 0 },
               colors: ['#4ade80', '#38bdf8', '#fbbf24'],
               zIndex: 9999
             });
             confetti({
               particleCount: 5,
               angle: 120,
               spread: 55,
               origin: { x: 1 },
               colors: ['#4ade80', '#38bdf8', '#fbbf24'],
               zIndex: 9999
             });
             if (Date.now() < end) requestAnimationFrame(frame);
           }());
           toast.info(`🏆 Incredible! You completed all ${categoryTotal} ${questionKind === "Q" ? "questions" : questionKind === "A" ? "assignments" : "projects"} in this module!`);
        }, 1000);
      }

      return next;
    });
  };

  const [results, setResults] = useState<{ passed: boolean; actual: string; expected: string }[] | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    fetch("/practice-data/manifest.json")
      .then(r => r.json())
      .then(data => {
        setManifest(data);
      })
      .catch(err => console.error("Could not load manifest", err));
  }, []);

  useEffect(() => {
    if (!onPracticeStateChange) return;
    if (activeChallenge) {
      const activeIndex = challenges.findIndex(c => c.id === activeChallenge.id);
      const canSkip = activeIndex >= 0 && activeIndex < challenges.length - 1;
      const skipFn = canSkip ? () => selectChallenge(challenges[activeIndex + 1]) : null;

      onPracticeStateChange({
        isActive: true,
        hasTests: true,
        submitFn: runTests,
        judgeStdoutFn: null,
        skipFn,
        canSkip
      });
    } else {
      onPracticeStateChange({ isActive: false, hasTests: false, submitFn: null, judgeStdoutFn: null, skipFn: null, canSkip: false });
    }
    // Submission callbacks intentionally refresh when the active challenge changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChallenge, onPracticeStateChange, challenges]);

  const getBatchTitle = (id: string) => {
    return manifest?.batches.find(b => b.id === id)?.title || id.replace("phase-", "");
  };

  const loadMarkdown = async (batchId: string, fileId: string) => {
    try {
      const batch = manifest?.batches.find(b => b.id === batchId);
      const basePath = batch?.path || `/practice-data/${batchId}`;
      const response = await fetch(`${basePath}/${fileId}`);
      if (!response.ok) {
        toast.error(`Course page not found: ${fileId}`);
        return;
      }
      onOpenOrCreateFile(
        `.course/${batchId}/${fileId}`,
        await response.text(),
      );
    } catch {
      toast.error(`Could not open course page: ${fileId}`);
    }
    seedPhase6IfNeeded(batchId);
  };

  const seedPhase6Ref = useRef(false);

  const seedPhase6IfNeeded = (batchId: string) => {
    if (batchId !== "phase-6-data-science" || !onSeedFiles) return;
    if (seedPhase6Ref.current) return;
    seedPhase6Ref.current = true;
    getKV("phase6StarterSeeded").then((alreadySeeded: any) => {
      if (alreadySeeded) return;
      const batchTitle = getBatchTitle(batchId);
      onSeedFiles(PHASE_6_STARTER_FILES, batchId, batchTitle).then((created) => {
        if (created.length > 0) {
          toast.info(`📦 Seeded the starter-project data & scripts (${created.length} files) into your workspace.`);
        }
        setKV("phase6StarterSeeded", true);
      });
    });
  };

  const loadContent = async (type: "batch", id: string, fileId = "questions.md") => {
    setLoading(true);
    await ensureDeliverables();
    setActiveCategory({ type, id, fileId });
    setChallenges([]);
    setActiveChallenge(null);
    setResults(null);
    seedPhase6IfNeeded(id);
    const isProjects = fileId === "projects.md";
    const isAssignments = fileId === "assignments.md";
    try {
      // Find custom path from manifest if defined
      const batch = manifest?.batches.find(b => b.id === id);
      const basePath = batch?.path || `/practice-data/${id}`;
      
      const mdRes = await fetch(`${basePath}/${fileId}`);
      const mdText = await mdRes.text();

      let testsData: PracticeTestsDocument = { questions: [] };
      let solutionsMarkdown = "";
      try {
        const testsFile = isProjects
          ? null
          : isAssignments
            ? "assignment-tests.json"
            : "tests/cases.json"; // fallback to new path
        const solutionsFile = isProjects
          ? "project-solutions.md"
          : isAssignments
            ? "assignment-solutions.md"
            : "solutions.md";
        const [testsRes, solutionsRes] = await Promise.all([
          testsFile
            ? fetch(`${basePath}/${testsFile}`)
            : Promise.resolve(null),
          fetch(`${basePath}/${solutionsFile}`),
        ]);
        
        if (testsRes?.ok) {
          const rawTests = await testsRes.json();
          // If it's the new cases.json format (object keyed by strings)
          if (rawTests && !rawTests.questions && typeof rawTests === 'object') {
            testsData = {
              questions: Object.entries(rawTests).map(([key, value]: [string, any]) => ({
                question_id: parseInt(key, 10),
                tests: value.cases
              }))
            };
          } else {
            testsData = rawTests;
          }
        }
        if (solutionsRes.ok) solutionsMarkdown = await solutionsRes.text();
      } catch {
        // Missing optional tests/solutions do not prevent opening a challenge.
      }

      const parsed = parsePracticeContent({
        markdown: mdText,
        fileId,
        tests: testsData,
        solutionsMarkdown,
      });
      setQuestionKind(parsed.kind);
      setChallenges(parsed.challenges);
      if (parsed.challenges.length > 0) {
        getKV("practiceState").then((state: any) => {
          const solved = new Set<string>(state?.solved || []);
          const firstUnsolved = parsed.challenges.find(
            (challenge) => !solved.has(`${id}__${challenge.id}`),
          );
          selectChallenge(
            firstUnsolved || parsed.challenges[0],
            { type, id, fileId },
            parsed.kind,
          );
        });
      }
    } catch (e) {
      console.error("Failed to load content", e);
    }
    setLoading(false);
  };

  const projectFileName = (c: Challenge) => {
    const base = c.title
      .replace(/^[APQ]\d+\.\s*/, "")
      .replace(/^Capstone:\s*/, "")
      .trim()
      .replace(/[\\/:*?"<>|]+/g, "")
      .replace(/\s+/g, "-");
    return `${c.id}-${base}.py`;
  };

  const selectChallenge = (
    c: Challenge | null,
    category = activeCategory,
    kind = questionKind,
    autoCreate = true
  ) => {
    setActiveChallenge(c);
    setResults(null);
    setManualReview(null);
    setManualExecutionPassed(false);
    setManualScopePath(undefined);
    terminalStore.clear();
    if (onTestResults) onTestResults(null);
    setHintOpen(false);
    if (c) {
      const uniqueId = category ? `${category.id}__${c.id}` : c.id;
      const batchTitle = category ? getBatchTitle(category.id) : "General";
      
      getKV("practiceState").then((state: any) => {
        const s = state || {};
        setHintLevel(Math.min(3, s.hints?.[uniqueId] || (s.solved?.includes(uniqueId) ? 3 : 0)));
        setHintView(Math.max(1, s.hints?.[uniqueId] || 1));
        setHintAttempts(s.hintAttempts?.[uniqueId] || 0);
      });
      if (kind === "P" || kind === "A") {
        const fileList = deliverablesRef.current[category?.id || ""]?.[c.id];
        const categoryName = kind === "P" ? "Projects" : "Assignments";
        if (fileList && fileList.length > 0) {
          const folder = `.practice/${batchTitle}/${categoryName}/${projectFileName(c).replace(/\.py$/, "")}`;
          setManualScopePath(folder);
          const headerFor = (f: string) => {
            if (f.endsWith(".md")) return `# ${c.title}\n# ${f}\n\nDesign notes, reflections, and written answers live here.\n`;
            if (f.endsWith(".json")) return `{}\n`;
            return `# ${c.title} — ${f}\n# Write your solution below:\n\n`;
          };
          // create in reverse so the first manifest file ends up active in the editor
          [...fileList].reverse().forEach(f => onOpenOrCreateFile(`${folder}/${f}`, headerFor(f), autoCreate));
        } else {
          onOpenOrCreateFile(`.practice/${batchTitle}/${categoryName}/${projectFileName(c)}`, `# ${c.title}\n# Write your solution below:\n\n`, autoCreate);
        }
      } else {
        const fileName = `${c.id}-${c.title.replace(/^[APQ]\d+\.\s*/, "").trim().replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, "-")}.py`;
        onOpenOrCreateFile(`.practice/${batchTitle}/Practice Questions/${fileName}`, `# ${c.title}\n# Write your solution below:\n\n`, autoCreate);
      }
    }
  };

  const runTests = async (codeToTest: string) => {
    if (!activeChallenge || !activeCategory) return;
    setRunning(true);
    setResults(null);

    const violation = getConstraintViolation(codeToTest, activeCategory.id);
    if (violation) {
      const out = [{ passed: false, actual: `🚫 ${violation}`, expected: "(phase rule)" }];
      setResults(out);
      if (onTestResults) onTestResults(out);
      toast.error(violation);
      setRunning(false);
      return;
    }

    const out: { passed: boolean; actual: string; expected: string; crashError?: string }[] = [];
    const requiredFiles = deliverablesRef.current[activeCategory.id]?.[activeChallenge.id] ?? [];
    const needsManualReview = requiresManualReview(
      questionKind,
      activeChallenge.tests.length,
    );

    if (needsManualReview) {
      const review = reviewManualSubmission({
        activePath: activeFilePath,
        activeContent: codeToTest,
        scopePath: manualScopePath,
        requiredFiles,
        workspaceFiles,
      });
      setManualReview(review);
      if (!review.ready) {
        const details = [
          review.missing.length ? `Missing: ${review.missing.join(", ")}` : "",
          review.incomplete.length
            ? `Still placeholders: ${review.incomplete.join(", ")}`
            : "",
        ].filter(Boolean).join("\n");
        out.push({
          passed: false,
          actual: details || "No substantive solution was found.",
          expected: "Complete the required deliverables before requesting manual review.",
        });
        setManualExecutionPassed(false);
      } else if (requiredFiles.length > 0) {
        out.push({
          passed: true,
          actual: `${review.checks.length} required deliverable(s) are ready for review.`,
          expected: "Review the rubric, run the relevant entry point, then confirm completion.",
        });
        setManualExecutionPassed(true);
      } else {
        const res = await runTest(codeToTest, "");
        const passed = res.status === 0;
        out.push({
          passed,
          actual: passed
            ? res.stdout || "Execution successful (no output)."
            : res.stdout || "Execution failed.",
          crashError: passed ? undefined : res.traceback || res.stderr,
          expected: "A substantive solution that executes without errors, followed by manual rubric confirmation.",
        });
        setManualExecutionPassed(passed);
      }

      setResults(out);
      onTestResults?.(out);
      setRunning(false);
      if (out.every((result) => result.passed)) {
        toast.info("Validation passed. Review the rubric and confirm completion.");
      } else {
        toast.warn("Complete the missing or placeholder deliverables first.");
      }
      return;
    }
    
    if (activeChallenge.tests.length === 0) {
      const res = await runTest(codeToTest, "");
      const passed = res.status === 0;
      out.push({
        passed,
        actual: passed ? (res.stdout ? `Output:\n${res.stdout}` : "Execution successful (no output).") : res.stdout || "Execution failed.",
        crashError: passed ? undefined : res.traceback || res.stderr,
        expected: "Code should execute without errors. Please visually verify your output.",
      });
    } else {
      for (const test of activeChallenge.tests) {
        const rawInput = "input" in test ? test.input ?? "" : "";
        const stdin = Array.isArray(rawInput) ? rawInput.join("\n") : rawInput;
        const res = await runTest(codeToTest, stdin);
        const passed = evaluatePracticeTest(codeToTest, res, test);
        const expected =
          test.type === "ast"
            ? test.hint ?? `Source should match /${test.pattern}/.`
            : test.type === "quality"
              ? test.hint ?? "Source must satisfy the inferred structural requirements."
              : test.output ?? test.expected_output ?? "Expected output was not provided.";
        const actual =
          test.type === "quality"
            ? res.sourceAnalysis?.syntaxValid
              ? `AST valid; ${res.sourceAnalysis.statementCount} statement(s) analyzed.`
              : "Python source could not be parsed."
            : res.status === 0
              ? res.plots?.length
                ? `${res.stdout}Generated ${res.plots.length} plot(s).`
                : res.stdout
              : res.stdout;
        const crashError = res.status === 0 ? undefined : res.traceback || res.stderr;
        out.push({ passed, actual, expected, crashError });
      }
    }
    setResults(out);
    if (onTestResults) onTestResults(out);
    setRunning(false);

    const allPassed = out.every(r => r.passed);
    if (allPassed) {
      markSolved(activeChallenge.id, activeCategory.id, challenges.length);
      const activeIndex = challenges.findIndex(c => c.id === activeChallenge.id);
      if (activeIndex < challenges.length - 1) {
        toast.info("Correct! Well done.");
        setTimeout(() => selectChallenge(challenges[activeIndex + 1]), 800);
      } else {
        toast.info("Module Complete! 🎉");
      }
    } else {
      const uniqueId = `${activeCategory.id}__${activeChallenge.id}`;
      const attempts = hintAttempts + 1;
      setHintAttempts(attempts);
      updatePracticeState(s => ({ ...s, hintAttempts: { ...(s.hintAttempts || {}), [uniqueId]: attempts } }));
      if ((attempts === 1 || attempts === 3) && hintLevel < (attempts === 1 ? 2 : 3)) {
        setHintLevel(attempts === 1 ? 2 : 3);
        updatePracticeState(s => ({ ...s, hints: { ...(s.hints || {}), [uniqueId]: attempts === 1 ? 2 : 3 } }));
        toast.info(attempts === 1 ? "💡 Hint Level 2 unlocked!" : "💡 Hint Level 3 unlocked!");
      }
    }
  };

  const allPassed = results && results.length > 0 && results.every(r => r.passed);
  const activeIndex = activeChallenge ? challenges.findIndex(c => c.id === activeChallenge.id) : -1;
  const isProjectSolved = !!activeCategory && !!activeChallenge && solvedChallenges.has(activeCategory.id + "__" + activeChallenge.id);
  const requiresManualConfirmation =
    !!activeChallenge &&
    requiresManualReview(questionKind, activeChallenge.tests.length);

  const markProjectComplete = () => {
    if (!activeChallenge || !activeCategory || !manualExecutionPassed) return;
    markSolved(activeChallenge.id, activeCategory.id, challenges.length);
    const idx = challenges.findIndex(c => c.id === activeChallenge.id);
    if (idx < challenges.length - 1) {
      setTimeout(() => selectChallenge(challenges[idx + 1]), 1200);
    }
  };

  useEffect(() => {
    void ensureDeliverables();
    // The promise is memoized in a ref and should only be started on mount.
  }, []);

  const uniqueHintId = activeCategory && activeChallenge ? `${activeCategory.id}__${activeChallenge.id}` : null;
  const solvedHintCheck = uniqueHintId ? solvedChallenges.has(uniqueHintId) : false;
  const hintHasTests = !!activeChallenge && activeChallenge.tests.length > 0;
  // Challenges without tests can't be failed-submitted, so exempt them from attempt gating entirely.
  const allowedHintLevel = solvedHintCheck || !hintHasTests || hintAttempts >= 3 ? 3 : hintAttempts >= 1 ? 2 : 1;

  const hintContent = (level: number): string => {
    const solLines = activeChallenge?.solution ? activeChallenge.solution.split("\n") : [];
    const fence = (lines: string[]) => ["```python", ...lines, "```"].join("\n");
    if (level === 1) {
      if (activeChallenge?.hintText) return activeChallenge.hintText;
      if (activeChallenge?.solution) return "A peek at the shape of the solution:\n\n" + fence(solLines.slice(0, 3));
      return "No hint is provided for this challenge — reread the task and check the self-check list.";
    }
    if (level === 2) {
      const parts: string[] = [];
      if (activeChallenge?.explanation) parts.push(`💡 ${activeChallenge.explanation}`);
      if (activeChallenge?.solution) {
        const half = Math.max(2, Math.ceil(solLines.length / 2));
        parts.push("Roughly half the solution:\n\n" + fence(solLines.slice(0, half)));
      }
      return parts.join("\n\n") || "No deeper hint available for this challenge.";
    }
    if (activeChallenge?.solution) return fence(solLines);
    return "No full solution is published for this challenge.";
  };

  const revealNextHint = () => {
    if (!uniqueHintId) return;
    if (hintLevel >= 3) return;
    const next = hintLevel + 1;
    if (next > allowedHintLevel) {
      toast.info(hintHasTests ? "🔒 Locked — submit your code at least once to unlock the next level." : "🔒 Locked — a few more failed attempts will unlock it.");
      return;
    }
    setHintLevel(next);
    setHintView(next);
    updatePracticeState(s => ({ ...s, hints: { ...(s.hints || {}), [uniqueHintId]: next } }));
  };

  const courseStats = useMemo(() => {
    if (!manifest) return null;
    const phases = manifest.batches.map(b => {
      const items = b.files.filter(f => f.type === "practice").map(f => {
        const kind = f.id === "projects.md" ? "P" : f.id === "assignments.md" ? "A" : "Q";
        const solved = Math.min(f.total || 0, Array.from(solvedChallenges).filter(x => x.startsWith(`${b.id}__${kind}`)).length);
        return { f, kind, solved, total: f.total || 0, complete: (f.total || 0) > 0 && solved >= (f.total || 0) };
      });
      const solvedTotal = items.reduce((a, i) => a + i.solved, 0);
      const totalTotal = items.reduce((a, i) => a + i.total, 0);
      return {
        b, items, solvedTotal, totalTotal,
        complete: totalTotal > 0 && solvedTotal >= totalTotal,
        pct: totalTotal ? Math.round((solvedTotal / totalTotal) * 100) : 0,
      };
    });
    const solvedAll = phases.reduce((a, p) => a + p.solvedTotal, 0);
    const totalAll = phases.reduce((a, p) => a + p.totalTotal, 0);
    const pctAll = totalAll ? Math.round((solvedAll / totalAll) * 100) : 0;
    let next: { phase: typeof phases[number]; item: typeof phases[number]["items"][number] } | null = null;
    for (const p of phases) {
      const it = p.items.find(i => !i.complete && i.total > 0);
      if (it) { next = { phase: p, item: it }; break; }
    }
    return { phases, solvedAll, totalAll, pctAll, next };
  }, [manifest, solvedChallenges]);

  if (!manifest) return <div className="p-4 text-xs text-[var(--vscode-text-muted)]">Loading...</div>;

  return (
    <div className="flex h-full flex-col overflow-hidden text-sm text-[var(--vscode-text)] relative">
      <div className="flex h-[35px] shrink-0 items-center justify-between overflow-hidden px-4 text-[11px] font-medium uppercase tracking-wider text-[var(--vscode-text)]">
        <div className="min-w-0 pr-2">
          <span className="truncate whitespace-nowrap">Practice</span>
        </div>
        {!activeCategory && (
          <button
            onClick={() => setDashboardOpen(o => !o)}
            className={`flex h-6 w-6 items-center justify-center outline-none transition-colors hover:bg-[var(--vscode-hover)] focus-visible:ring-1 focus-visible:ring-[var(--vscode-accent)] ${
              dashboardOpen ? "text-[var(--vscode-text)]" : "text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]"
            }`}
            title={dashboardOpen ? "Show modules" : "Show progress"}
            aria-label={dashboardOpen ? "Show modules" : "Show progress"}
          >
            <LayoutDashboard className="h-4 w-4" />
          </button>
        )}
        {activeCategory && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <button 
                onClick={() => {
                  if (activeIndex > 0) selectChallenge(challenges[activeIndex - 1]);
                  else { setActiveCategory(null); setChallenges([]); setActiveChallenge(null); setResults(null); }
                }}
                className="p-1 hover:bg-[var(--vscode-hover)] rounded text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)] transition-colors"
                title={activeIndex > 0 ? "Previous Question" : "Back to Categories"}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={() => {
                  if (activeIndex < challenges.length - 1) selectChallenge(challenges[activeIndex + 1]);
                }}
                disabled={activeIndex >= challenges.length - 1}
                className={`p-1 rounded transition-colors ${activeIndex < challenges.length - 1 ? 'hover:bg-[var(--vscode-hover)] text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]' : 'opacity-30 cursor-not-allowed text-[var(--vscode-text-muted)]'}`}
                title="Next Question"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global progress bar for active category */}
      {activeCategory && challenges.length > 0 && (
         <div className="h-[2px] w-full shrink-0 bg-[var(--vscode-border)]">
            <div 
              className="h-full bg-[var(--vscode-accent)] transition-[width] duration-300"
              style={{ width: `${(Array.from(solvedChallenges).filter(x => x.startsWith(activeCategory.id + "__" + questionKind)).length / challenges.length) * 100}%` }}
            ></div>
         </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        {!activeCategory ? (
          dashboardOpen && courseStats ? (
            <div className="flex flex-col">
              <div className="border-b border-[var(--vscode-border)] px-3 py-3">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-[11px] font-semibold uppercase tracking-wide text-[var(--vscode-text)]">
                    Course progress
                  </h2>
                  <span className="text-[11px] tabular-nums text-[var(--vscode-text-muted)]">{courseStats.pctAll}%</span>
                </div>
                <StatBar pct={courseStats.pctAll} />
                <p className="mt-2 text-[11px] text-[var(--vscode-text-muted)]">
                  {courseStats.solvedAll} of {courseStats.totalAll} challenges solved
                </p>
              </div>

              <div className="border-b border-[var(--vscode-border)] px-3 py-3">
                {courseStats.next ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--vscode-text-muted)]">Up next</div>
                      <div className="truncate text-[12px] font-medium text-[var(--vscode-text)]">
                        {courseStats.next.phase.b.title} — {courseStats.next.item.f.title}
                      </div>
                      <div className="text-[11px] text-[var(--vscode-text-muted)] mt-0.5">
                        {courseStats.next.item.solved}/{courseStats.next.item.total} solved. Pick up where you left off.
                      </div>
                    </div>
                    <button
                      onClick={() => loadContent("batch", courseStats.next!.phase.b.id, courseStats.next!.item.f.id)}
                      className="flex h-7 shrink-0 items-center gap-1.5 bg-[var(--vscode-accent)] px-2 text-[11px] font-medium text-white outline-none hover:brightness-110 focus-visible:ring-1 focus-visible:ring-white"
                    >
                      <PlayCircle className="h-3.5 w-3.5" /> Resume
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[12px] text-[var(--vscode-text)]">
                    <CircleCheck className="h-4 w-4 text-[var(--vscode-text-muted)]" /> All challenges complete
                  </div>
                )}
              </div>

              {Array.from(new Set(courseStats.phases.map(p => p.b.topic || "Main"))).map(topic => {
                const topicPhases = courseStats.phases.filter(p => (p.b.topic || "Main") === topic);
                const isTopicExpanded = expandedFolders[`dashboard_topic_${topic}`] !== false;
                
                // Calculate topic stats
                const topicSolved = topicPhases.reduce((a, p) => a + p.solvedTotal, 0);
                const topicTotal = topicPhases.reduce((a, p) => a + p.totalTotal, 0);
                const topicPct = topicTotal > 0 ? Math.round((topicSolved / topicTotal) * 100) : 0;
                
                return (
                  <div key={topic} className="border-b border-[var(--vscode-border)]">
                    <div 
                      className="flex cursor-pointer select-none items-center justify-between px-3 py-2 text-[12px] font-semibold text-[var(--vscode-text)] hover:bg-[var(--vscode-hover)]"
                      onClick={() => setExpandedFolders(prev => ({ ...prev, [`dashboard_topic_${topic}`]: !isTopicExpanded }))}
                    >
                      <div className="flex items-center gap-1.5">
                        {isTopicExpanded ? <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[var(--vscode-text-muted)]" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[var(--vscode-text-muted)]" />}
                        {topic}
                      </div>
                      <span className="shrink-0 text-[10px] tabular-nums text-[var(--vscode-text-muted)] font-normal">{topicPct}%</span>
                    </div>
                    
                    {isTopicExpanded && (
                      <div className="flex flex-col">
                        {topicPhases.map(p => (
                          <div key={p.b.id} className="border-t border-[var(--vscode-border)]/50">
                            <button
                              onClick={() => setExpandedFolders(prev => ({ ...prev, [p.b.id]: !prev[p.b.id] }))}
                              className="flex w-full items-center justify-between px-3 py-2 pl-6 text-left hover:bg-[var(--vscode-hover)]"
                            >
                              <span className="flex min-w-0 items-center gap-1.5 text-[12px] text-[var(--vscode-text)]">
                                {expandedFolders[p.b.id] ? <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[var(--vscode-text-muted)]" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[var(--vscode-text-muted)]" />}
                                <span className="truncate">{p.b.title}</span>
                                {p.complete && <CircleCheck className="h-3.5 w-3.5 shrink-0 text-[var(--vscode-text-muted)]" />}
                              </span>
                              <span className="shrink-0 text-[10px] tabular-nums text-[var(--vscode-text-muted)]">{p.pct}%</span>
                            </button>
                            {expandedFolders[p.b.id] && (
                              <div className="flex flex-col gap-2 px-3 pb-3 pl-11">
                                {p.items.map(it => (
                                  <div key={it.f.id} className="flex items-center gap-3">
                                    <span className="text-[11px] text-[var(--vscode-text-muted)] w-40 shrink-0 truncate" title={it.f.title}>{it.f.title}</span>
                                    <div className="flex-1">
                                      <StatBar pct={it.total ? (it.solved / it.total) * 100 : 0} />
                                    </div>
                                    <span className="w-12 shrink-0 text-right text-[10px] tabular-nums text-[var(--vscode-text-muted)]">
                                      {it.solved}/{it.total}
                                    </span>
                                  </div>
                                ))}
                                {p.items.length === 0 && <div className="text-[11px] text-[var(--vscode-text-muted)]">No practice files.</div>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
          <div className="flex flex-col">
            
            {/* Batches Section */}
            <div className="flex flex-col pb-2">
              {Array.from(new Set(manifest.batches.map(b => b.topic || "Main"))).map(topic => {
                const topicBatches = manifest.batches.filter(b => (b.topic || "Main") === topic);
                const isTopicExpanded = expandedFolders[`topic_${topic}`] !== false;
                
                return (
                  <div key={topic} className="flex flex-col mb-1">
                    <div 
                      className="flex cursor-pointer select-none items-center gap-1 px-2 py-1.5 text-[12px] font-semibold text-[var(--vscode-text)] hover:bg-[var(--vscode-hover)]"
                      onClick={() => setExpandedFolders(prev => ({ ...prev, [`topic_${topic}`]: !isTopicExpanded }))}
                    >
                      {isTopicExpanded ? <ChevronDown className="h-3 w-3 shrink-0" /> : <ChevronRight className="h-3 w-3 shrink-0" />}
                      {topic}
                    </div>
                    {isTopicExpanded && (
                      <div className="flex flex-col">
                        {topicBatches.map(b => {
                          const isActive = lastActive?.id === b.id;
                          const isExpanded = expandedFolders[b.id] || false;
                          
                          return (
                            <div key={b.id} className="flex flex-col">
                              <div
                                onClick={() => setExpandedFolders(prev => ({ ...prev, [b.id]: !prev[b.id] }))}
                                className="flex cursor-pointer items-center justify-between py-1 pl-4 pr-2 hover:bg-[var(--vscode-hover)]"
                              >
                                <div className="flex min-w-0 items-center gap-1.5 truncate text-[12px] text-[var(--vscode-text)]">
                                  {isExpanded ? <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[var(--vscode-text-muted)]" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[var(--vscode-text-muted)]" />}
                                  <span className="truncate">{b.title}</span>
                                </div>
                              </div>
                              
                              {isExpanded && b.files && (
                                <div className="flex flex-col pb-1">
                                  {b.files.map(f => {
                                    const isPractice = f.type === 'practice';
                                    const fileKind = f.id === "projects.md" ? "P" : f.id === "assignments.md" ? "A" : "Q";
                                    const fileSolved = isPractice
                                      ? Array.from(solvedChallenges).filter(x => x.startsWith(`${b.id}__${fileKind}`)).length
                                      : 0;
                                    const fileTotal = isPractice ? (f.total || 0) : 0;
                                    const fileComplete = isPractice && fileTotal > 0 && fileSolved === fileTotal;
                                    return (
                                      <div
                                        key={f.id}
                                        draggable
                                        onDragStart={(e) => {
                                          e.dataTransfer.setData("application/x-practice-file", JSON.stringify({ batchId: b.id, fileId: f.id, isPractice }));
                                        }}
                                        onClick={() => {
                                          if (isPractice) {
                                            loadContent("batch", b.id, f.id);
                                          } else {
                                            loadMarkdown(b.id, f.id);
                                          }
                                        }}
                                        className="flex cursor-pointer items-center justify-between py-1 pl-10 pr-2 text-[12px] text-[var(--vscode-text-muted)] hover:bg-[var(--vscode-hover)] hover:text-[var(--vscode-text)]"
                                      >
                                        <div className="flex min-w-0 items-center gap-1.5 truncate">
                                          {isPractice ? <TerminalSquare className="h-3.5 w-3.5 shrink-0" /> : <BookOpen className="h-3.5 w-3.5 shrink-0" />}
                                          <span className="truncate">{f.title}</span>
                                        </div>
                                        {isPractice && (
                                          <span className="text-[10px] tabular-nums text-[var(--vscode-text-muted)]">
                                            {fileComplete ? "Done" : `${fileSolved}/${fileTotal}`}
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>


          </div>
          )
        ) : (
          <div className="flex flex-col p-3">
            {loading ? (
              <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin text-[var(--vscode-text-muted)]" /></div>
            ) : activeChallenge ? (
              <div className="flex flex-col">

                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="flex flex-1 items-start gap-1.5 text-[13px] font-semibold text-[var(--vscode-text)]">
                    <span title={activeChallenge.difficulty ? `Difficulty: ${activeChallenge.difficulty}` : undefined}>
                      <TerminalSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--vscode-text-muted)]" />
                    </span>
                    <span className="leading-tight">{activeChallenge.title}</span>
                  </h3>

                  <div className="flex items-center gap-1 shrink-0">
                    {activeChallenge.objective && (
                      <div className="relative group shrink-0">
                        <div className="p-1.5 rounded hover:bg-[var(--vscode-hover)] cursor-help transition-colors border border-transparent hover:border-sky-900/30">
                          <Target className="h-4 w-4 text-[var(--vscode-text-muted)]" />
                        </div>
                        <div className="absolute right-0 top-full mt-1 w-72 p-3.5 bg-[#252526] border border-[var(--vscode-border)] rounded-md shadow-xl z-50 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
                          <h4 className="text-[12px] text-sky-400 font-bold mb-2 flex items-center gap-1.5"><Target className="h-4 w-4" /> Learning Objective</h4>
                          <p className="text-[12.5px] bg-black/40 border border-sky-900/30 p-3 rounded text-slate-300 leading-relaxed">{activeChallenge.objective}</p>
                        </div>
                      </div>
                    )}

                    {activeChallenge.solution || activeChallenge.hintText ? (
                      <div className="relative shrink-0 z-50">
                        <button
                          onClick={() => {
                            setHintOpen(o => {
                              const next = !o;
                              if (next) setHintView(Math.max(1, hintLevel));
                              return next;
                            });
                          }}
                          className={`p-1.5 rounded transition-colors border ${
                            hintOpen ? "bg-[var(--vscode-hover)] border-amber-900/30" : "border-transparent hover:bg-[var(--vscode-hover)]"
                          }`}
                          title="Progressive hints"
                        >
                          <Lightbulb className="h-4 w-4 text-[var(--vscode-text-muted)]" />
                        </button>

                        {hintOpen && (
                          <div className="absolute right-0 top-full mt-1 w-80 max-w-[calc(100vw-2rem)] bg-[#252526] border border-[var(--vscode-border)] rounded-md shadow-xl z-50 overflow-hidden">
                            <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--vscode-border)] bg-black/20">
                              <h4 className="text-[11px] text-amber-400 font-bold flex items-center gap-1.5">
                                <Lightbulb className="h-3.5 w-3.5" /> Progressive Hints
                              </h4>
                              <button onClick={() => setHintOpen(false)} className="p-0.5 rounded text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)] hover:bg-[var(--vscode-hover)]">
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-1 px-3 pt-2.5">
                              {HINT_LABELS.map((label, i) => {
                                const level = i + 1;
                                const locked = level > hintLevel;
                                const isCurrent = hintView === level;
                                return (
                                  <button
                                    key={label}
                                    onClick={() => { if (!locked) setHintView(level); }}
                                    disabled={locked}
                                    className={`flex items-center gap-1 px-2 py-1 rounded text-[10.5px] font-semibold transition-colors ${
                                      isCurrent ? "bg-amber-500/20 text-amber-400 border border-amber-800/40" :
                                      locked ? "text-[var(--vscode-text-muted)] opacity-50 cursor-not-allowed" :
                                      "text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)] hover:bg-[var(--vscode-hover)]"
                                    }`}
                                  >
                                    {locked && <Lock className="h-3 w-3" />}
                                    {level}. {label}
                                  </button>
                                );
                              })}
                            </div>

                            <div className="m-3 p-2.5 bg-black/40 border border-[var(--vscode-border)] rounded max-h-56 overflow-y-auto">
                              <pre className="whitespace-pre-wrap text-[12px] leading-relaxed font-mono text-emerald-200/90 break-words">{hintContent(hintView)}</pre>
                            </div>

                            <div className="px-3 pb-3 flex items-center justify-between gap-2">
                              <span className="text-[10px] text-[var(--vscode-text-muted)]">
                                {hintLevel >= 3
                                  ? "All levels revealed."
                                  : !hintHasTests
                                    ? "No automated tests for this challenge — all hint levels are unlocked."
                                    : hintLevel === 0
                                      ? "Level 2 unlocks after your first failed submit; level 3 after 3 fails or when solved."
                                      : "Level 3 unlocks after 3 failed submits — or instantly when you solve it."}
                              </span>
                              <button
                                onClick={revealNextHint}
                                disabled={hintLevel >= 3}
                                className="shrink-0 rounded bg-amber-600 px-2.5 py-1.5 text-[10.5px] font-semibold text-white hover:bg-amber-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                {hintLevel >= 3 ? "All revealed" : hintLevel === 0 ? "Reveal hint" : "Reveal more"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="text-[var(--vscode-text)] mb-4">
                  <MarkdownRenderer
                    content={activeChallenge.markdown}
                    isCompact={true}
                    fileId={activeCategory ? `${activeCategory.id}__${activeChallenge.id}` : activeChallenge.id}
                    dirPath={activeCategory ? (manifest?.batches.find(b => b.id === activeCategory.id)?.path || `/practice-data/${activeCategory.id}`) : ""}
                  />
                </div>

                {!hasStarted(activeChallenge) && (
                  <div className="mb-4 rounded-md border border-[var(--vscode-border)] bg-black/20 p-5 flex flex-col items-center justify-center gap-3">
                    <p className="text-[12px] text-[var(--vscode-text-muted)] text-center max-w-xs">
                      You haven't started this challenge yet. Ready to write some code?
                    </p>
                    <button
                      onClick={() => selectChallenge(activeChallenge, activeCategory, questionKind, true)}
                      className="rounded bg-[var(--vscode-accent)] px-4 py-1.5 text-[12px] font-medium text-white hover:brightness-110"
                    >
                      Start Challenge
                    </button>
                  </div>
                )}

                {requiresManualConfirmation && (
                  <ManualReviewCard
                    review={manualReview}
                    validated={manualExecutionPassed}
                    solved={isProjectSolved}
                    onConfirm={markProjectComplete}
                  />
                )}



              </div>
            ) : (
              <div className="text-xs text-[var(--vscode-text-muted)]">No challenges found.</div>
            )}
          </div>
        )}
      </div>

      {!activeCategory && lastActive && (
        <div className="shrink-0 border-t border-[var(--vscode-border)] p-2">
          <button
            onClick={() => loadContent(lastActive.type, lastActive.id, lastActive.fileId || "questions.md")}
            className="flex h-7 w-full items-center gap-2 px-2 text-left text-[11px] text-[var(--vscode-text)] outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-1 focus-visible:ring-[var(--vscode-accent)]"
            title="Resume Practice"
          >
            <PlayCircle className="h-3.5 w-3.5 shrink-0 text-[var(--vscode-text-muted)]" />
            <span className="truncate">Resume last practice</span>
          </button>
        </div>
      )}
    </div>
  );
}
