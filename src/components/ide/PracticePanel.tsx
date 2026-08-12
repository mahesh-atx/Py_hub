"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2, CircleCheck, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, Folder, FolderOpen, BookOpen, TerminalSquare, PlayCircle, Trophy, Lightbulb, Target } from "lucide-react";
import { toast } from "@/components/ide/ToastContainer";
import { getKV, setKV } from "@/lib/storage/idb";
import confetti from "canvas-confetti";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { terminalStore } from "@/lib/terminal/store";

interface TestCase {
  input: string;
  expected_output: string;
}

interface Challenge {
  id: string;
  title: string;
  markdown: string;
  solution: string | null;
  tests: TestCase[];
  difficulty?: string;
  objective?: string;
}

interface ManifestFile { id: string; title: string; type: 'markdown' | 'practice'; total?: number; }
interface Manifest {
  batches: { id: string; title: string; path: string; files: ManifestFile[] }[];
}

function normalize(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

function compareOutputs(actual: string, expected: string): boolean {
  const aNorm = normalize(actual);
  const eNorm = normalize(expected);
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

export function PracticeSidebar({ 
  runTest, 
  onCreateFile, 
  onOpenOrCreateFile,
  activeFileContent,
  onPracticeStateChange,
  onTestResults
}: { 
  runTest: RunCapture; 
  onCreateFile: (name: string, content: string, append?: boolean) => void;
  onOpenOrCreateFile: (name: string, content: string) => void;
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

  const [keepCodeEnabled, setKeepCodeEnabled] = useState(true);
  const [questionKind, setQuestionKind] = useState<"Q" | "P">("Q");

  // Persistence State
  const [solvedChallenges, setSolvedChallenges] = useState<Set<string>>(new Set());
  const [lastActive, setLastActive] = useState<{ type: "batch", id: string, fileId: string, challengeId: string } | null>(null);

  useEffect(() => {
    getKV("practiceState").then((state: any) => {
      if (state) {
        setSolvedChallenges(new Set(state.solved || []));
        setLastActive(state.lastActive || null);
      }
    });
  }, []);

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
           toast.info(`🏆 Incredible! You completed all ${categoryTotal} ${questionKind === "P" ? "projects" : "questions"} in this module!`);
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
    if (onPracticeStateChange) {
      if (activeChallenge) {
        const activeIndex = challenges.findIndex(c => c.id === activeChallenge.id);
        const canSkip = activeIndex >= 0 && activeIndex < challenges.length - 1;
        const skipFn = canSkip ? () => selectChallenge(challenges[activeIndex + 1], keepCodeEnabled) : null;

        onPracticeStateChange({
          isActive: true,
          hasTests: activeChallenge.tests && activeChallenge.tests.length > 0,
          submitFn: runTests,
          judgeStdoutFn: (stdout: string) => {
             if (!activeChallenge.tests || activeChallenge.tests.length === 0) return;
             const passedAny = activeChallenge.tests.some(t => compareOutputs(stdout, t.expected_output));
             if (passedAny) {
                toast.info("Correct output! Auto-advancing to next question...");
                markSolved(activeChallenge.id, activeCategory!.id, challenges.length);
                if (activeIndex >= 0 && activeIndex < challenges.length - 1) {
                  setTimeout(() => selectChallenge(challenges[activeIndex + 1], keepCodeEnabled), 1000);
                }
             }
          },
          skipFn,
          canSkip
        });
      } else {
        onPracticeStateChange({ isActive: false, hasTests: false, submitFn: null, judgeStdoutFn: null, skipFn: null, canSkip: false });
      }
    }
  }, [activeChallenge, onPracticeStateChange, challenges, keepCodeEnabled]);

  const loadMarkdown = async (batchId: string, fileId: string) => {
    try {
      const res = await fetch(`/practice-data/${batchId}/${fileId}`);
      if (res.ok) {
        const text = await res.text();
        onCreateFile(fileId, text, false);
      }
    } catch(e) {}
  };

  const loadContent = async (type: "batch", id: string, fileId = "questions.md") => {
    setLoading(true);
    setActiveCategory({ type, id, fileId });
    setChallenges([]);
    setActiveChallenge(null);
    setResults(null);
    const isProjects = fileId === "projects.md";
    const prefix: "Q" | "P" = isProjects ? "P" : "Q";
    setQuestionKind(prefix);
    try {
      const mdRes = await fetch(`/practice-data/${id}/${fileId}`);
      const mdText = await mdRes.text();

      let testsData: any = { questions: [] };
      let solutionsParts: string[] = [];
      if (!isProjects) {
        try {
          const [testsRes, solRes] = await Promise.all([
            fetch(`/practice-data/${id}/hidden-tests.json`),
            fetch(`/practice-data/${id}/solutions.md`),
          ]);
          
          if (testsRes.ok) testsData = await testsRes.json();
          if (solRes.ok) {
            const solText = await solRes.text();
            solutionsParts = solText.split(/^## Q\d+\.\s*/m);
            solutionsParts.shift(); // remove intro
          }
        } catch {
          // ignore
        }
      }

      const parts = mdText.split(new RegExp(`^## ${prefix}\\d+\\.\\s*`, "m"));
      parts.shift(); // remove intro text

      const parsedChallenges = parts.map((part, idx) => {
        const lines = part.split('\n');
        const title = lines[0].trim();
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
        
        const markdown = rawMarkdown
                           .replace(/\*\*Difficulty:\*\*\s*(.+)\n?/i, "")
                           .replace(/\*\*Learning Objective:\*\*\s*(.+)\n?/i, "")
                           .trim();

        const testObj = testsData.questions ? testsData.questions[idx] : null;
        const actualQId = testObj ? testObj.question_id : (idx + 1);
        
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
          id: `${prefix}${actualQId}`,
          title: `${prefix}${actualQId}. ${title}`,
          markdown,
          solution,
          tests: testObj ? testObj.tests : [],
          difficulty,
          objective
        };
      });

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
      .replace(/^P\d+\.\s*/, "")
      .trim()
      .replace(/[\\/:*?"<>|]+/g, "")
      .replace(/\s+/g, "-");
    return `${c.id}-${base}.py`;
  };

  const selectChallenge = (c: Challenge | null, keepCode = false) => {
    setActiveChallenge(c);
    setResults(null);
    terminalStore.clear();
    if (onTestResults) onTestResults(null);
    if (c) {
      if (questionKind === "P") {
        onOpenOrCreateFile(projectFileName(c), `# ${c.title}\n# Write your solution below:\n\n`);
      } else {
        onCreateFile(`practice.py`, `# ${c.title}\n# Write your solution below:\n\n`, keepCode);
      }
    }
  };

  const runTests = async (codeToTest: string) => {
    if (!activeChallenge || activeChallenge.tests.length === 0) return;
    setRunning(true);
    setResults(null);
    const out: { passed: boolean; actual: string; expected: string }[] = [];
    
    for (const t of activeChallenge.tests) {
      const res = await runTest(codeToTest, t.input);
      const passed = res.status === 0 && compareOutputs(res.stdout, t.expected_output);
      out.push({
        passed,
        actual: res.status === 0 ? res.stdout : res.stderr || res.traceback || "",
        expected: t.expected_output,
      });
    }
    setResults(out);
    if (onTestResults) onTestResults(out);
    setRunning(false);

    const allPassed = out.every(r => r.passed);
    if (allPassed) {
      markSolved(activeChallenge.id, activeCategory!.id, challenges.length);
      const activeIndex = challenges.findIndex(c => c.id === activeChallenge.id);
      if (activeIndex < challenges.length - 1) {
        setTimeout(() => selectChallenge(challenges[activeIndex + 1], keepCodeEnabled), 800);
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
      setTimeout(() => selectChallenge(challenges[idx + 1], true), 1200);
    }
  };

  if (!manifest) return <div className="p-4 text-xs text-[var(--vscode-text-muted)]">Loading...</div>;

  return (
    <div className="flex h-full flex-col overflow-hidden text-sm text-[var(--vscode-text)] relative">
      {/* Custom Header */}
      <div className="h-[35px] flex items-center justify-between px-3 text-[11px] uppercase tracking-wider text-[var(--vscode-text)] font-semibold shrink-0 overflow-hidden border-b border-transparent">
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <span className="whitespace-nowrap truncate">Practice</span>
        </div>
        {activeCategory && (
          <div className="flex items-center gap-4">
            {questionKind === "Q" && (
              <button
                onClick={() => setKeepCodeEnabled(!keepCodeEnabled)}
                className={`flex items-center gap-1.5 transition-colors ${
                  keepCodeEnabled ? "text-emerald-400" : "text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]"
                }`}
                title="Keep previously typed code when advancing to the next question"
              >
                <div className={`h-1.5 w-1.5 rounded-full ${keepCodeEnabled ? "bg-emerald-400 shadow-[0_0_4px_#34d399]" : "bg-transparent border border-current"}`} />
                <span className="normal-case tracking-normal text-[10px]">Keep Code</span>
              </button>
            )}
            
            <div className="flex items-center gap-0.5">
              <button 
                onClick={() => {
                  if (activeIndex > 0) selectChallenge(challenges[activeIndex - 1], keepCodeEnabled);
                  else { setActiveCategory(null); setChallenges([]); setActiveChallenge(null); setResults(null); }
                }}
                className="p-1 hover:bg-[var(--vscode-hover)] rounded text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)] transition-colors"
                title={activeIndex > 0 ? "Previous Question" : "Back to Categories"}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={() => {
                  if (activeIndex < challenges.length - 1) selectChallenge(challenges[activeIndex + 1], keepCodeEnabled);
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
                            const fileSolved = isPractice
                              ? Array.from(solvedChallenges).filter(x => x.startsWith(`${b.id}__${f.id === "projects.md" ? "P" : "Q"}`)).length
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

                    {activeChallenge.solution && (
                      <div className="relative group shrink-0">
                        <div className="p-1.5 rounded hover:bg-[var(--vscode-hover)] cursor-help transition-colors border border-transparent hover:border-amber-900/30">
                          <Lightbulb className="h-4 w-4 text-amber-400" />
                        </div>
                        <div className="absolute right-0 top-full mt-1 w-72 p-3.5 bg-[#252526] border border-[var(--vscode-border)] rounded-md shadow-xl z-50 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
                          <h4 className="text-[12px] text-amber-400 font-bold mb-2 flex items-center gap-1.5"><Lightbulb className="h-4 w-4" /> Quick Hint</h4>
                          <pre className="text-[12.5px] bg-black/40 border border-amber-900/30 p-3 rounded font-mono text-emerald-200/90 whitespace-pre-wrap">{activeChallenge.solution.split('\n').slice(0, 3).join('\n')}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-[var(--vscode-text)] mb-4">
                  <MarkdownRenderer content={activeChallenge.markdown} isCompact={true} fileId={activeChallenge.id} />
                </div>

                {allPassed && activeIndex < challenges.length - 1 && (
                  <button
                    onClick={() => selectChallenge(challenges[activeIndex + 1], keepCodeEnabled)}
                    className="flex items-center justify-center gap-1.5 rounded bg-sky-600 px-3 py-2 text-[11px] font-semibold text-white hover:bg-sky-500 transition-colors mt-2 shadow-lg shadow-sky-500/20 animate-in fade-in zoom-in duration-300 w-full"
                  >
                    Next Question <ArrowRight className="h-3 w-3" />
                  </button>
                )}

                {questionKind === "P" && activeChallenge && (
                  <button
                    onClick={markProjectComplete}
                    disabled={isProjectSolved}
                    className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded px-3 py-2 text-[11px] font-semibold text-white transition-colors shadow-lg ${
                      isProjectSolved
                        ? "cursor-default bg-emerald-700/60 shadow-emerald-900/20"
                        : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20 animate-in fade-in zoom-in duration-300"
                    }`}
                  >
                    {isProjectSolved ? (
                      <>
                        <CircleCheck className="h-3 w-3" /> Project Completed
                      </>
                    ) : (
                      <>
                        <Trophy className="h-3 w-3" /> Mark as Complete
                      </>
                    )}
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
