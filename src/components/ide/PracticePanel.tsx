"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Loader2, CircleCheck, CircleX, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, Folder, FolderOpen, BookOpen, Code2, ArrowLeft, TerminalSquare, Sparkles, PlayCircle, Trophy, Lightbulb } from "lucide-react";
import { toast } from "@/components/ide/ToastContainer";
import { getKV, setKV } from "@/lib/storage/idb";
import confetti from "canvas-confetti";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
}

interface Manifest {
  batches: { id: string; title: string; path: string; total?: number }[];
  topicDrills: { id: string; title: string; path: string; total?: number }[];
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
  activeFileContent,
  onPracticeStateChange,
  onTestResults
}: { 
  runTest: RunCapture; 
  onCreateFile: (name: string, content: string) => void;
  activeFileContent: string;
  onPracticeStateChange?: (state: { isActive: boolean; hasTests: boolean; submitFn: ((code: string) => Promise<void>) | null; judgeStdoutFn: ((stdout: string) => void) | null; skipFn: (() => void) | null; canSkip: boolean }) => void;
  onTestResults?: (results: { passed: boolean; actual: string; expected: string }[] | null) => void;
}) {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [activeCategory, setActiveCategory] = useState<{ type: "batch" | "drill", id: string } | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(false);
  
  // UI State
  const [batchesExpanded, setBatchesExpanded] = useState(true);
  const [drillsExpanded, setDrillsExpanded] = useState(true);
  const [questionsExpanded, setQuestionsExpanded] = useState(false);

  // Persistence State
  const [solvedChallenges, setSolvedChallenges] = useState<Set<string>>(new Set());
  const [lastActive, setLastActive] = useState<{ type: "batch" | "drill", id: string, challengeId: string } | null>(null);

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
      const newLastActive = { type: activeCategory.type, id: activeCategory.id, challengeId: activeChallenge.id };
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
      const solvedInCat = Array.from(next).filter(x => x.startsWith(categoryId + "__")).length;
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
           toast.info(`🏆 Incredible! You completed all ${categoryTotal} questions in this module!`);
        }, 1000);
      }

      return next;
    });
  };

  const [results, setResults] = useState<{ passed: boolean; actual: string; expected: string }[] | null>(null);
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);

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
        const skipFn = canSkip ? () => selectChallenge(challenges[activeIndex + 1]) : null;

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
                  setTimeout(() => selectChallenge(challenges[activeIndex + 1]), 1000);
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
  }, [activeChallenge, onPracticeStateChange, challenges]);

  const loadContent = async (type: "batch" | "drill", id: string, initialChallengeId?: string) => {
    setLoading(true);
    setActiveCategory({ type, id });
    setChallenges([]);
    setActiveChallenge(null);
    setResults(null);
    try {
      let mdUrl = type === "batch" ? `/practice-data/${id}/questions.md` : `/practice-data/topic-drills/${id}/questions.md`;
      const mdRes = await fetch(mdUrl);
      const mdText = await mdRes.text();

      let testsData: any = { questions: [] };
      let solutionsParts: string[] = [];
      try {
        const testsUrl = type === "batch" ? `/practice-data/${id}/hidden-tests.json` : `/practice-data/topic-drills/${id}/hidden-tests.json`;
        const solUrl = type === "batch" ? `/practice-data/${id}/solutions.md` : `/practice-data/topic-drills/${id}/solutions.md`;
        
        const [testsRes, solRes] = await Promise.all([fetch(testsUrl), fetch(solUrl)]);
        
        if (testsRes.ok) testsData = await testsRes.json();
        if (solRes.ok) {
          const solText = await solRes.text();
          solutionsParts = solText.split(/^## Q\d+\.\s*/m);
          solutionsParts.shift(); // remove intro
        }
      } catch {
        // ignore
      }

      const parts = mdText.split(/^## Q\d+\.\s*/m);
      parts.shift(); // remove intro text

      const parsedChallenges = parts.map((part, idx) => {
        const lines = part.split('\n');
        const title = lines[0].trim();
        // Fix formatting: Topic drills lack blank lines between **Property:** lines.
        // This regex ensures a blank line exists before any **BoldText:** line.
        const rawMarkdown = part.replace(lines[0], "").trim()
                             .replace(/\n(\*\*[A-Za-z]+:\*\*)/g, '\n\n$1');
        
        let difficulty = "Medium";
        const diffMatch = rawMarkdown.match(/\*\*Difficulty:\*\*\s*(.+)/i);
        if (diffMatch) {
            difficulty = diffMatch[1].trim();
        }
        
        const markdown = rawMarkdown.replace(/\*\*Difficulty:\*\*\s*(.+)\n?/i, "").trim();

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
          id: String(actualQId),
          title: `Q${actualQId}. ${title}`,
          markdown,
          solution,
          tests: testObj ? testObj.tests : [],
          difficulty
        };
      });

      setChallenges(parsedChallenges);
      if (parsedChallenges.length > 0) {
        if (initialChallengeId) {
          const found = parsedChallenges.find(c => c.id === initialChallengeId);
          selectChallenge(found || parsedChallenges[0]);
        } else {
          selectChallenge(parsedChallenges[0]);
        }
      }
    } catch (e) {
      console.error("Failed to load content", e);
    }
    setLoading(false);
  };

  const openDescription = (c: Challenge) => {
    const filename = `practice.md`;
    let content = c.markdown;
    if (c.solution) {
      content += `\n\n---\n\n<details><summary><b>View Reference Solution</b></summary>\n\n${c.solution}\n\n</details>`;
    }
    onCreateFile(filename, content);
  };

  const selectChallenge = (c: Challenge | null) => {
    setActiveChallenge(c);
    setResults(null);
    setShowHint(false);
    setShowSolution(false);
    if (onTestResults) onTestResults(null);
    if (c) {
      const filename = `practice.py`;
      onCreateFile(filename, `# ${c.title}\n# Write your solution below:\n\n`);
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
        setTimeout(() => selectChallenge(challenges[activeIndex + 1]), 800);
      }
    }
  };

  const allPassed = results && results.length > 0 && results.every(r => r.passed);
  const activeIndex = activeChallenge ? challenges.findIndex(c => c.id === activeChallenge.id) : -1;

  if (!manifest) return <div className="p-4 text-xs text-[var(--vscode-text-muted)]">Loading...</div>;

  return (
    <div className="flex h-full flex-col overflow-hidden text-sm text-[var(--vscode-text)]">
      {/* Custom Header */}
      <div className="h-[35px] flex items-center justify-between px-5 text-[11px] uppercase tracking-wider text-[var(--vscode-text)] font-medium shrink-0">
        <span>Practice Explorer</span>
        {activeCategory && (
          <div className="flex items-center gap-1.5">
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
        )}
      </div>

      {/* Global progress bar for active category */}
      {activeCategory && challenges.length > 0 && (
         <div className="h-[2px] w-full bg-black/20 shrink-0">
            <div 
              className="h-full bg-sky-500 transition-all duration-500" 
              style={{ width: `${(Array.from(solvedChallenges).filter(x => x.startsWith(activeCategory.id + "__")).length / challenges.length) * 100}%` }}
            ></div>
         </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        {!activeCategory ? (
          <div className="flex flex-col py-2">
            
            {/* Resume Button */}
            {lastActive && (
              <div className="px-3 mb-4 mt-2">
                <button 
                  onClick={() => loadContent(lastActive.type, lastActive.id, lastActive.challengeId)}
                  className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold py-2 rounded shadow-lg shadow-sky-900/20 transition-all"
                >
                  <PlayCircle className="h-4 w-4" />
                  Resume Practice
                </button>
              </div>
            )}

            {/* Batches Section */}
            <div 
              className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-[var(--vscode-text)] uppercase tracking-wide cursor-pointer hover:bg-[var(--vscode-hover)] select-none"
              onClick={() => setBatchesExpanded(!batchesExpanded)}
            >
              {batchesExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              Course Batches
            </div>
            {batchesExpanded && (
              <div className="flex flex-col pb-2">
                {manifest.batches.map(b => {
                  const bTotal = b.total || 100;
                  const bSolved = Array.from(solvedChallenges).filter(x => x.startsWith(b.id + "__")).length;
                  const bComplete = bSolved === bTotal;
                  const isActive = lastActive?.id === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => loadContent("batch", b.id)}
                      className={`flex flex-col pl-5 pr-6 py-1.5 cursor-pointer border-l-2 transition-all ${
                        isActive ? 'border-sky-500 bg-sky-900/15' : 'border-transparent hover:bg-[var(--vscode-hover)]'
                      }`}
                    >
                      <div className={`flex items-center justify-between text-[13px] ${isActive ? 'text-[var(--vscode-text)] font-medium' : 'text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]'}`}>
                        <div className="flex items-center gap-2 truncate">
                          {bComplete ? <Trophy className="h-4 w-4 text-amber-400" /> : <Folder className={`h-4 w-4 ${isActive ? 'text-sky-400' : 'text-emerald-400'}`} />}
                          <span className="truncate">{b.title}</span>
                        </div>
                        <span className={`text-[10px] ${bComplete ? 'text-amber-400/80 font-bold' : isActive ? 'text-sky-400/90 font-semibold' : 'text-[var(--vscode-text-muted)]'}`}>
                          [{bSolved}/{bTotal}]
                        </span>
                      </div>
                      
                      {/* Mini Progress bar underneath */}
                      {(isActive || (bSolved > 0 && !bComplete)) && (
                        <div className="mt-1 h-[2px] w-full bg-black/20 rounded-full overflow-hidden">
                          <div className={`h-full ${isActive ? 'bg-sky-500' : 'bg-emerald-500/50'}`} style={{ width: `${(bSolved / bTotal) * 100}%` }}></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Topic Drills Section */}
            <div 
              className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-[var(--vscode-text)] uppercase tracking-wide cursor-pointer hover:bg-[var(--vscode-hover)] select-none mt-2"
              onClick={() => setDrillsExpanded(!drillsExpanded)}
            >
              {drillsExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              Topic Drills
            </div>
            {drillsExpanded && (
              <div className="flex flex-col pb-2">
                {manifest.topicDrills.map(d => {
                  const dTotal = d.total || 30;
                  const dSolved = Array.from(solvedChallenges).filter(x => x.startsWith(d.id + "__")).length;
                  const dComplete = dSolved === dTotal;
                  const isActive = lastActive?.id === d.id;
                  return (
                    <div
                      key={d.id}
                      onClick={() => loadContent("drill", d.id)}
                      className={`flex flex-col pl-5 pr-6 py-1.5 cursor-pointer border-l-2 transition-all ${
                        isActive ? 'border-sky-500 bg-sky-900/15' : 'border-transparent hover:bg-[var(--vscode-hover)]'
                      }`}
                    >
                      <div className={`flex items-center justify-between text-[13px] ${isActive ? 'text-[var(--vscode-text)] font-medium' : 'text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]'}`}>
                        <div className="flex items-center gap-2 truncate">
                          {dComplete ? <Trophy className="h-4 w-4 text-amber-400" /> : <BookOpen className={`h-4 w-4 ${isActive ? 'text-sky-400' : 'text-sky-400/80'}`} />}
                          <span className="truncate">{d.title}</span>
                        </div>
                        <span className={`text-[10px] ${dComplete ? 'text-amber-400/80 font-bold' : isActive ? 'text-sky-400/90 font-semibold' : 'text-[var(--vscode-text-muted)]'}`}>
                          [{dSolved}/{dTotal}]
                        </span>
                      </div>
                      {(isActive || (dSolved > 0 && !dComplete)) && (
                        <div className="mt-1 h-[2px] w-full bg-black/20 rounded-full overflow-hidden">
                          <div className={`h-full ${isActive ? 'bg-sky-500' : 'bg-sky-400/50'}`} style={{ width: `${(dSolved / dTotal) * 100}%` }}></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {/* ... rest of category list remains same ... */}
          </div>
        ) : (
          <div className="flex flex-col p-3">
            {loading ? (
              <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin text-[var(--vscode-text-muted)]" /></div>
            ) : activeChallenge ? (
              <div className="flex flex-col">

                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold text-sky-400 flex items-start gap-2 flex-1">
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

                  {activeChallenge.solution && (
                    <div className="relative group shrink-0">
                      <div className="p-1.5 rounded hover:bg-[var(--vscode-hover)] cursor-help transition-colors border border-transparent hover:border-amber-900/30">
                        <Lightbulb className="h-4 w-4 text-amber-400" />
                      </div>
                      <div className="absolute right-0 top-full mt-1 w-64 p-3 bg-[#252526] border border-[var(--vscode-border)] rounded-md shadow-xl z-50 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
                        <h4 className="text-[11px] text-amber-400 font-semibold mb-2 flex items-center gap-1.5"><Lightbulb className="h-3.5 w-3.5" /> Quick Hint</h4>
                        <pre className="text-[11px] bg-black/40 border border-amber-900/30 p-2.5 rounded font-mono text-emerald-200/90 whitespace-pre-wrap">{activeChallenge.solution.split('\n').slice(0, 3).join('\n')}</pre>
                      </div>
                    </div>
                  )}
                </div>

                <div className="prose prose-invert prose-sm max-w-none text-[var(--vscode-text)] text-[13px] leading-relaxed mb-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{activeChallenge.markdown}</ReactMarkdown>
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
    </div>
  );
}
