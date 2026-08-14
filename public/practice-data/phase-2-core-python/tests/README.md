# Phase 2 — Automated Judge

Write your solution, run one command, find out whether it is right.

```bash
cd tests
python run_tests.py --new 4     # creates answers/q04.py
# ... write your solution in that file ...
python run_tests.py 4 --diff    # grade it
```

## Commands

```bash
python run_tests.py 4           # run every check for Q4
python run_tests.py 4 --diff    # show exactly what failed
python run_tests.py --all       # everything you have attempted
python run_tests.py --new 4     # create a blank answer file
python run_tests.py --list      # coverage summary
```

## How grading works

Your program reads with `input()` and prints the answer.

**Prompts are ignored.** Whatever you pass to `input()` is thrown away by the
grader, so `input("Enter text: ")` and `input()` score identically. You are
graded on the answer, not on guessing my wording.

**Trailing whitespace is ignored**, on every line and at the end. Everything
else is exact.

**Sets must be printed sorted.** A raw `print(my_set)` produces a different
order on every run - verified, it changes between processes - so any question
involving a set expects `sorted(...)`. That is not a grader quirk; it is why
you should never print a bare set in real code either.

## Coverage

| | Count |
| --- | --- |
| Questions graded automatically | **60** |
| Total test cases | **116** |
| Manual | **0** |

Every question in this phase is graded automatically.

## Where the expected answers come from

Every expected value was produced by **running a reference solution**, never
typed by hand. Those solutions are published in [solutions.md](../solutions.md),
and all 60 have been re-extracted from that file and re-run through this
grader to confirm they pass all 116 test cases.

## Files

```
tests/
├── README.md      ← this file
├── run_tests.py   ← the grader
├── cases.json     ← inputs and expected answers (generated)
└── answers/       ← your solutions (gitignored)
```

## The rules

1. **Write the code before you open anything else.** The grader tells you
   whether you are right; it cannot tell you how to think.
2. **A failing check is information, not a verdict.** Read it, fix one thing,
   run it again.
3. **Do not tune to the visible case.** If you find yourself hard-coding an
   expected number, stop.
