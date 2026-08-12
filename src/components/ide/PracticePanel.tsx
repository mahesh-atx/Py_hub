"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Loader2, CircleCheck, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, Folder, FolderOpen, BookOpen, TerminalSquare, PlayCircle, Trophy, Lightbulb, Target, Lock, LayoutDashboard, X } from "lucide-react";
import { toast } from "@/components/ide/ToastContainer";
import { getKV, setKV } from "@/lib/storage/idb";
import confetti from "canvas-confetti";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { terminalStore } from "@/lib/terminal/store";

interface TestCase {
  input: string;
  expected_output: string;
  match?: "contains";
  contains?: string[];
}

interface Challenge {
  id: string;
  title: string;
  markdown: string;
  solution: string | null;
  tests: TestCase[];
  difficulty?: string;
  objective?: string;
  hintText?: string;
  explanation?: string;
}

const HINT_LABELS = ["Hint", "More code", "Full solution"];

function StatBar({ pct, color = "bg-sky-500" }: { pct: number; color?: string }) {
  return (
    <div className="h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
    </div>
  );
}

interface ManifestFile { id: string; title: string; type: 'markdown' | 'practice'; total?: number; }
interface Manifest {
  batches: { id: string; title: string; path: string; files: ManifestFile[] }[];
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

function normalize(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

function compareOutputs(actual: string, expected: string, test?: TestCase): boolean {
  const aNorm = normalize(actual);
  const eNorm = normalize(expected);
  if (test?.contains && Array.isArray(test.contains) && test.contains.length > 0) {
    const low = aNorm.toLowerCase();
    return test.contains.every(s => s.length > 0 && low.includes(s.toLowerCase()));
  }
  if (test?.match === "contains" && eNorm) return aNorm.includes(eNorm);
  if (aNorm === eNorm) return true;

  if ((eNorm.startsWith("{") && eNorm.endsWith("}")) || (eNorm.startsWith("[") && eNorm.endsWith("]"))) {
    try {
      const cleanA = aNorm.replace(/[{}[\]]/g, "").split(",").map(s => s.trim()).sort();
      const cleanE = eNorm.replace(/[{}[\]]/g, "").split(",").map(s => s.trim()).sort();
      return JSON.stringify(cleanA) === JSON.stringify(cleanE);
    } catch {
      return false;
    }
  }
  return false;
}

type RunCapture = (code: string, stdin?: string, timeoutMs?: number) => Promise<{
  stdout: string;
  stderr: string;
  traceback?: string;
  status: number;
}>;

interface ConstraintRule {
  pattern: RegExp;
  allow?: RegExp;
  reason: string;
}

const PHASE_CONSTRAINTS: Record<string, ConstraintRule[]> = {
  "phase-1": [
    {
      pattern: /\[/,
      reason: "Phase 1 rule: lists are not allowed yet (no [ ] brackets).",
    },
    {
      pattern: /\bdef\s+[A-Za-z_]/,
      reason: "Phase 1 rule: user-defined functions are not allowed yet (no def).",
    },
    {
      pattern: /\bimport\b/,
      reason: "Phase 1 rule: imports are not allowed yet.",
    },
  ],
  "phase-2": [
    {
      pattern: /\bdef\s+[A-Za-z_]/,
      reason: "Phase 2 rule: user-defined functions are not allowed yet (no def).",
    },
    {
      pattern: /\bimport\b/,
      reason: "Phase 2 rule: imports are not allowed yet.",
    },
  ],
  "phase-3": [
    {
      pattern: /\bclass\s+[A-Za-z_]\w*/,
      allow: /class\s+[A-Za-z_]\w*\s*\(\s*(?:[A-Za-z_]\w*Error|Exception|BaseException)\b/,
      reason: "Phase 3 rule: classes are not allowed yet (custom Exception subclasses are the one exception).",
    },
  ],
};

function stripCommentsAndStrings(code: string): string {
  return code
    .replace(/"""[\s\S]*?"""|'''[\s\S]*?'''/g, "")
    .replace(/#[^\n]*/g, "")
    .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, "");
}

function getConstraintViolation(code: string, batchId: string): string | null {
  const phase = batchId.match(/phase-(\d+)/)?.[1];
  const rules = phase ? PHASE_CONSTRAINTS[`phase-${phase}`] : undefined;
  if (!rules) return null;
  const cleaned = stripCommentsAndStrings(code);
  for (const rule of rules) {
    if (rule.pattern.test(cleaned) && !(rule.allow && rule.allow.test(cleaned))) {
      return rule.reason;
    }
  }
  return null;
}

export function PracticeSidebar({ 
  runTest, 
  onCreateFile, 
  onOpenOrCreateFile,
  onSeedFiles,
  activeFileContent,
  onPracticeStateChange,
  onTestResults
}: { 
  runTest: RunCapture; 
  onCreateFile: (name: string, content: string, append?: boolean) => void;
  onOpenOrCreateFile: (name: string, content: string) => void;
  onSeedFiles?: (relativePaths: string[], batchId: string, batchTitle: string) => Promise<string[]>;
  activeFileContent: string;
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

  // Hint reveal state (3 levels: hint -> more code -> full solution)
  const [hintOpen, setHintOpen] = useState(false);
  const [hintLevel, setHintLevel] = useState(0); // highest level revealed (0-3)
  const [hintView, setHintView] = useState(1); // level currently displayed
  const [hintAttempts, setHintAttempts] = useState(0); // failed submits for active challenge

  // Dashboard view
  const [dashboardOpen, setDashboardOpen] = useState(false);

  // Multi-file deliverables
  const [deliverables, setDeliverables] = useState<Record<string, Record<string, string[]>>>({});

  const categoryRef = useRef<{ type: "batch"; id: string; fileId: string } | null>(null);
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
        colors: ['#4ade80', '#38bdf8', '#fbbf24']
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
               colors: ['#4ade80', '#38bdf8', '#fbbf24']
             });
             confetti({
               particleCount: 5,
               angle: 120,
               spread: 55,
               origin: { x: 1 },
               colors: ['#4ade80', '#38bdf8', '#fbbf24']
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
  }, [activeChallenge, onPracticeStateChange, challenges]);

  const getBatchTitle = (id: string) => {
    return manifest?.batches.find(b => b.id === id)?.title || id.replace("phase-", "");
  };

  const loadMarkdown = async (batchId: string, fileId: string) => {
    try {
      const res = await fetch(`/practice-data/${batchId}/${fileId}`);
      if (res.ok) {
        const text = await res.text();
        const batchTitle = getBatchTitle(batchId);
        onOpenOrCreateFile(`.course/${batchTitle}/${fileId}`, text);
      }
    } catch(e) {}
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
    setActiveCategory({ type, id, fileId });
    setChallenges([]);
    setActiveChallenge(null);
    setResults(null);
    seedPhase6IfNeeded(id);
    const isProjects = fileId === "projects.md";
    const isAssignments = fileId === "assignments.md";
    const prefix: "Q" | "P" | "A" = isProjects ? "P" : isAssignments ? "A" : "Q";
    setQuestionKind(prefix);
    try {
      const mdRes = await fetch(`/practice-data/${id}/${fileId}`);
      const mdText = await mdRes.text();

      let testsData: any = { questions: [] };
      let solutionsParts: string[] = [];
      if (isProjects) {
        try {
          const solRes = await fetch(`/practice-data/${id}/project-solutions.md`);
          if (solRes.ok) {
            const solText = await solRes.text();
            solutionsParts = solText.split(/^## P\d+\.\s*/m);
            solutionsParts.shift();
          }
        } catch {
          // ignore
        }
      } else {
        try {
          const testsFile = isAssignments ? "assignment-tests.json" : "hidden-tests.json";
          const solFile = isAssignments ? "assignment-solutions.md" : "solutions.md";
          const [testsRes, solRes] = await Promise.all([
            fetch(`/practice-data/${id}/${testsFile}`),
            fetch(`/practice-data/${id}/${solFile}`),
          ]);
          
          if (testsRes.ok) testsData = await testsRes.json();
          if (solRes.ok) {
            const solText = await solRes.text();
            solutionsParts = solText.split(isAssignments ? /^## A\d+\.\s*/m : /^## Q\d+\.\s*/m);
            solutionsParts.shift(); // remove intro
          }
        } catch {
          // ignore
        }
      }
      if (!testsData.questions) testsData.questions = [];

      const parts = isAssignments
        ? mdText.split(/^##\s*📋\s*/m)
        : mdText.split(new RegExp(`^## ${prefix}\\d+\\.\\s*`, "m"));
      parts.shift(); // remove intro text

      const parsedChallenges = parts.map((part, idx): Challenge | null => {
        const lines = part.split('\n');
        const rawTitle = lines[0].trim();
        // Skip trailing sections like "Grading yourself" that are not challenges.
        if (isAssignments && /^Grading\s+yourself/i.test(rawTitle)) return null;

        let title = rawTitle;
        let num: number | null = null;
        if (isAssignments) {
          const mNum = rawTitle.match(/Assignment\s*(\d+)\s*[—–-]\s*(.*)/i);
          if (mNum) {
            num = parseInt(mNum[1], 10);
            title = mNum[2].trim();
          } else if (/^Capstone\b/i.test(rawTitle)) {
            title = rawTitle.replace(/^[^—–-]*[—–-]\s*/, "").trim();
          }
        }

        // Fix formatting: sections can lack blank lines between **BoldText:** lines.
        // This regex ensures a blank line exists before any **BoldText:** line.
        const rawMarkdown = part.replace(lines[0], "").trim()
                             .replace(/\n(\*\*[A-Za-z]+:\*\*)/g, '\n\n$1');
        
        let difficulty = "Medium";
        const diffMatch = rawMarkdown.match(/\*\*Difficulty:\*\*\s*(.+)/i);
        if (diffMatch) {
            difficulty = diffMatch[1].trim();
        }
        
        let objective: string | undefined = undefined;
        const objMatch = rawMarkdown.match(/\*\*Learning Objective:\*\*\s*(.+)/i);
        if (objMatch) {
            objective = objMatch[1].trim();
        }
        
        let hintText: string | undefined = undefined;
        const hintMatch = rawMarkdown.match(/^\*\*Hint:\*\*\s*(.+)$/im);
        if (hintMatch) {
            hintText = hintMatch[1].trim();
        }

        let explanation: string | undefined = undefined;
        const explMatch = rawMarkdown.match(/^\*\*Explanation:\*\*\s*(.+)$/im);
        if (explMatch) {
            explanation = explMatch[1].trim();
        }

        const markdown = rawMarkdown
                           .replace(/\*\*Difficulty:\*\*\s*(.+)\n?/i, "")
                           .replace(/\*\*Learning Objective:\*\*\s*(.+)\n?/i, "")
                           .replace(/^\*\*Hint:\*\*[^\n]*\n?/gm, "")
                           .replace(/^\*\*Explanation:\*\*[^\n]*\n?/gm, "")
                           .replace(/\n{3,}/g, "\n\n")
                           .trim();

        let actualQId: number | null = null;
        let challengeTitle: string;
        if (isAssignments) {
          actualQId = num;
          if (num !== null) {
            challengeTitle = `A${num}. ${title}`;
          } else if (/^Capstone\b/i.test(rawTitle)) {
            challengeTitle = `Capstone: ${title}`;
          } else {
            challengeTitle = title;
          }
        } else {
          actualQId = testsData.questions[idx]?.question_id ?? (idx + 1);
          challengeTitle = `${prefix}${actualQId}. ${title}`;
        }

        const testObj = isAssignments
          ? testsData.questions.find((q: any) => q.question_id === num) ?? testsData.questions[idx] ?? null
          : testsData.questions[idx] || null;
        
        let solution = null;
        if (solutionsParts[idx]) {
          const rawSol = solutionsParts[idx];
          const codeMatch = rawSol.match(/```(?:python)?\n([\s\S]*?)\n```/);
          if (codeMatch) {
            solution = codeMatch[1].trim();
          } else {
            const solLines = rawSol.split('\n');
            solution = rawSol.replace(solLines[0], "").trim();
          }
        }

        return {
          id: isAssignments
            ? (num !== null ? `A${num}` : /^Capstone\b/i.test(rawTitle) ? "ACap" : `A${idx + 1}`)
            : `${prefix}${actualQId}`,
          title: challengeTitle,
          markdown,
          solution,
          tests: testObj ? testObj.tests : [],
          difficulty,
          objective,
          hintText,
          explanation
        };
      }).filter((c): c is Challenge => c !== null);

      setChallenges(parsedChallenges);
      if (parsedChallenges.length > 0) {
        getKV("practiceState").then((state: any) => {
          const sSet = new Set(state?.solved || []);
          const firstUnsolved = parsedChallenges.find(c => !sSet.has(`${id}__${c.id}`));
          selectChallenge(firstUnsolved || parsedChallenges[0]);
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

  const selectChallenge = (c: Challenge | null) => {
    setActiveChallenge(c);
    setResults(null);
    terminalStore.clear();
    if (onTestResults) onTestResults(null);
    setHintOpen(false);
    if (c) {
      const uniqueId = activeCategory ? `${activeCategory.id}__${c.id}` : c.id;
      const batchTitle = activeCategory ? getBatchTitle(activeCategory.id) : "General";
      
      getKV("practiceState").then((state: any) => {
        const s = state || {};
        setHintLevel(Math.min(3, s.hints?.[uniqueId] || (s.solved?.includes(uniqueId) ? 3 : 0)));
        setHintView(Math.max(1, s.hints?.[uniqueId] || 1));
        setHintAttempts(s.hintAttempts?.[uniqueId] || 0);
      });
      if (questionKind === "P" || questionKind === "A") {
        const fileList = deliverables[activeCategory?.id || ""]?.[c.id];
        const categoryName = questionKind === "P" ? "Projects" : "Assignments";
        if (fileList && fileList.length > 0) {
          const folder = `.practice/${batchTitle}/${categoryName}/${projectFileName(c).replace(/\.py$/, "")}`;
          const headerFor = (f: string) => {
            if (f.endsWith(".md")) return `# ${c.title}\n# ${f}\n\nDesign notes, reflections, and written answers live here.\n`;
            if (f.endsWith(".json")) return `{}\n`;
            return `# ${c.title} — ${f}\n# Write your solution below:\n\n`;
          };
          // create in reverse so the first manifest file ends up active in the editor
          [...fileList].reverse().forEach(f => onOpenOrCreateFile(`${folder}/${f}`, headerFor(f)));
        } else {
          onOpenOrCreateFile(`.practice/${batchTitle}/${categoryName}/${projectFileName(c)}`, `# ${c.title}\n# Write your solution below:\n\n`);
        }
      } else {
        const fileName = `${c.id}-${c.title.replace(/^[APQ]\d+\.\s*/, "").trim().replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, "-")}.py`;
        onOpenOrCreateFile(`.practice/${batchTitle}/Practice Questions/${fileName}`, `# ${c.title}\n# Write your solution below:\n\n`);
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

    const out: { passed: boolean; actual: string; expected: string }[] = [];
    
    if (activeChallenge.tests.length === 0) {
      const res = await runTest(codeToTest, "");
      const passed = res.status === 0;
      out.push({
        passed,
        actual: passed ? (res.stdout ? `Output:\n${res.stdout}` : "Execution successful (no output).") : res.stderr || res.traceback || "Runtime Error",
        expected: "Code should execute without errors. Please visually verify your output.",
      });
    } else {
      for (const t of activeChallenge.tests) {
        const res = await runTest(codeToTest, t.input);
        const passed = res.status === 0 && compareOutputs(res.stdout, t.expected_output, t);
        out.push({
          passed,
          actual: res.status === 0 ? res.stdout : res.stderr || res.traceback || "",
          expected: t.expected_output,
        });
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

  const markProjectComplete = () => {
    if (!activeChallenge || !activeCategory) return;
    markSolved(activeChallenge.id, activeCategory.id, challenges.length);
    const idx = challenges.findIndex(c => c.id === activeChallenge.id);
    if (idx < challenges.length - 1) {
      setTimeout(() => selectChallenge(challenges[idx + 1]), 1200);
    }
  };

  useEffect(() => {
    fetch("/practice-data/deliverables.json")
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d) setDeliverables(d); })
      .catch(() => {});
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
      {/* Custom Header */}
      <div className="h-[35px] flex items-center justify-between px-3 text-[11px] uppercase tracking-wider text-[var(--vscode-text)] font-semibold shrink-0 overflow-hidden border-b border-transparent">
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <span className="whitespace-nowrap truncate">Practice</span>
        </div>
        {!activeCategory && (
          <button
            onClick={() => setDashboardOpen(o => !o)}
            className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded transition-colors ${
              dashboardOpen ? "text-emerald-400" : "text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]"
            }`}
            title="Course progress dashboard"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="normal-case tracking-normal text-[10px]">{dashboardOpen ? "Modules" : "Dashboard"}</span>
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
         <div className="h-[2px] w-full bg-black/20 shrink-0">
            <div 
              className="h-full bg-sky-500 transition-all duration-500" 
              style={{ width: `${(Array.from(solvedChallenges).filter(x => x.startsWith(activeCategory.id + "__" + questionKind)).length / challenges.length) * 100}%` }}
            ></div>
         </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        {!activeCategory ? (
          dashboardOpen && courseStats ? (
            <div className="flex flex-col gap-4 p-3">
              <div className="rounded-lg border border-[var(--vscode-border)] bg-black/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[13px] font-bold text-[var(--vscode-text)] flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-400" /> Course Progress
                  </h2>
                  <span className="text-[12px] font-bold text-sky-400">{courseStats.pctAll}%</span>
                </div>
                <StatBar pct={courseStats.pctAll} />
                <p className="text-[11px] text-[var(--vscode-text-muted)] mt-2">
                  {courseStats.solvedAll} of {courseStats.totalAll} challenges solved across all modules.
                </p>
              </div>

              <div className="rounded-lg border border-[var(--vscode-border)] bg-black/20 p-4">
                {courseStats.next ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">What&apos;s next</div>
                      <div className="text-[13px] font-semibold text-[var(--vscode-text)] truncate">
                        {courseStats.next.phase.b.title} — {courseStats.next.item.f.title}
                      </div>
                      <div className="text-[11px] text-[var(--vscode-text-muted)] mt-0.5">
                        {courseStats.next.item.solved}/{courseStats.next.item.total} solved. Pick up where you left off.
                      </div>
                    </div>
                    <button
                      onClick={() => loadContent("batch", courseStats.next!.phase.b.id, courseStats.next!.item.f.id)}
                      className="shrink-0 rounded bg-emerald-600 px-3 py-2 text-[11px] font-semibold text-white hover:bg-emerald-500 transition-colors flex items-center gap-1.5"
                    >
                      <PlayCircle className="h-3.5 w-3.5" /> Resume
                    </button>
                  </div>
                ) : (
                  <div className="text-[13px] font-semibold text-amber-400 flex items-center gap-2">
                    <Trophy className="h-4 w-4" /> All challenges complete — amazing work!
                  </div>
                )}
              </div>

              {courseStats.phases.map(p => (
                <div key={p.b.id} className="rounded-lg border border-[var(--vscode-border)] bg-black/20 overflow-hidden">
                  <button
                    onClick={() => setExpandedFolders(prev => ({ ...prev, [p.b.id]: !prev[p.b.id] }))}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[var(--vscode-hover)] transition-colors"
                  >
                    <span className="flex items-center gap-2 text-[12.5px] font-semibold text-[var(--vscode-text)] min-w-0">
                      {expandedFolders[p.b.id] ? <ChevronDown className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                      <span className="truncate">{p.b.title}</span>
                      {p.complete && <CircleCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />}
                    </span>
                    <span className="text-[11px] font-bold text-sky-400 shrink-0">{p.pct}%</span>
                  </button>
                  {expandedFolders[p.b.id] && (
                    <div className="px-4 pb-3 flex flex-col gap-2.5">
                      {p.items.map(it => (
                        <div key={it.f.id} className="flex items-center gap-3">
                          <span className="text-[11px] text-[var(--vscode-text-muted)] w-40 shrink-0 truncate" title={it.f.title}>{it.f.title}</span>
                          <div className="flex-1">
                            <StatBar pct={it.total ? (it.solved / it.total) * 100 : 0} color={it.complete ? "bg-amber-400" : "bg-sky-500"} />
                          </div>
                          <span className={`text-[10px] w-12 text-right shrink-0 tabular-nums ${it.complete ? "text-amber-400/80 font-bold" : "text-[var(--vscode-text-muted)]"}`}>
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
          ) : (
          <div className="flex flex-col py-2">
            
            {/* Batches Section */}
            <div 
              className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold text-[var(--vscode-text)] uppercase tracking-wide cursor-pointer hover:bg-[var(--vscode-hover)] select-none"
              onClick={() => setBatchesExpanded(!batchesExpanded)}
            >
              {batchesExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              Python Programming
            </div>
            {batchesExpanded && (
              <div className="flex flex-col pb-2">
                {manifest.batches.map(b => {
                  const isActive = lastActive?.id === b.id;
                  const isExpanded = expandedFolders[b.id] || false;
                  
                  return (
                    <div key={b.id} className="flex flex-col">
                      <div
                        onClick={() => setExpandedFolders(prev => ({ ...prev, [b.id]: !prev[b.id] }))}
                        className={`flex items-center justify-between pl-5 pr-6 py-1.5 cursor-pointer border-l-2 border-transparent hover:bg-[var(--vscode-hover)]`}
                      >
                        <div className="flex items-center gap-2 truncate text-[13px] text-[var(--vscode-text)]">
                          {isExpanded ? <FolderOpen className="h-4 w-4 text-emerald-400" /> : <Folder className="h-4 w-4 text-emerald-400" />}
                          <span className="truncate font-medium">{b.title}</span>
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
                                className={`flex items-center justify-between pl-10 pr-6 py-1 cursor-pointer hover:bg-[var(--vscode-hover)] text-[12.5px] text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  {isPractice ? <TerminalSquare className="h-3.5 w-3.5 text-sky-400" /> : <BookOpen className="h-3.5 w-3.5 text-amber-400/80" />}
                                  <span className="truncate">{f.title}</span>
                                </div>
                                {isPractice && (
                                  <span className={`text-[10px] ${fileComplete ? 'text-amber-400/80 font-bold' : 'text-[var(--vscode-text-muted)]'}`}>
                                    [{fileSolved}/{fileTotal}]
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
          )
        ) : (
          <div className="flex flex-col p-3">
            {loading ? (
              <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin text-[var(--vscode-text-muted)]" /></div>
            ) : activeChallenge ? (
              <div className="flex flex-col">

                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-[15.5px] font-bold text-sky-400 flex items-start gap-2 flex-1 tracking-wide">
                    <span title={activeChallenge.difficulty ? `Difficulty: ${activeChallenge.difficulty}` : undefined}>
                      <TerminalSquare 
                        className={`h-4 w-4 mt-0.5 shrink-0 ${
                          !activeChallenge.difficulty ? "text-sky-400" :
                          activeChallenge.difficulty.toLowerCase().includes("easy") ? "text-emerald-400" :
                          activeChallenge.difficulty.toLowerCase().includes("hard") ? "text-rose-400" :
                          "text-amber-400"
                        }`} 
                      />
                    </span>
                    <span className="leading-tight">{activeChallenge.title}</span>
                  </h3>

                  <div className="flex items-center gap-1 shrink-0">
                    {activeChallenge.objective && (
                      <div className="relative group shrink-0">
                        <div className="p-1.5 rounded hover:bg-[var(--vscode-hover)] cursor-help transition-colors border border-transparent hover:border-sky-900/30">
                          <Target className="h-4 w-4 text-sky-400" />
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
                          <Lightbulb className="h-4 w-4 text-amber-400" />
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
                  <MarkdownRenderer content={activeChallenge.markdown} isCompact={true} fileId={activeCategory ? `${activeCategory.id}__${activeChallenge.id}` : activeChallenge.id} />
                </div>

                {allPassed && activeIndex < challenges.length - 1 && (
                  <button
                    onClick={() => selectChallenge(challenges[activeIndex + 1])}
                    className="flex items-center justify-center gap-1.5 rounded bg-sky-600 px-3 py-2 text-[11px] font-semibold text-white hover:bg-sky-500 transition-colors mt-2 shadow-lg shadow-sky-500/20 animate-in fade-in zoom-in duration-300 w-full"
                  >
                    Next Question <ArrowRight className="h-3 w-3" />
                  </button>
                )}

              </div>
            ) : (
              <div className="text-xs text-[var(--vscode-text-muted)]">No challenges found.</div>
            )}
          </div>
        )}
      </div>

      {/* Floating Resume Button */}
      {!activeCategory && lastActive && (
        <button
          onClick={() => loadContent(lastActive.type, lastActive.id, lastActive.fileId || "questions.md")}
          className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-[var(--vscode-accent)] text-[#ffffff] flex items-center justify-center transition-transform hover:scale-110 z-50 group border border-[var(--vscode-border)]"
          title="Resume Practice"
        >
          <PlayCircle className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
        </button>
      )}
    </div>
  );
}
