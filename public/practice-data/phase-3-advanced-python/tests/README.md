# Phase 3 — Automated Judge

Write your solution, run one command, find out whether it is right.

```bash
cd tests
python run_tests.py --new 13     # creates answers/q13.py
# ... write your solution in that file ...
python run_tests.py 13 --diff    # grade it
```

## Commands

```bash
python run_tests.py 13           # run every check for Q13
python run_tests.py 13 --diff    # show exactly what failed
python run_tests.py --all       # everything you have attempted
python run_tests.py --new 13     # create a blank answer file
python run_tests.py --list      # coverage summary
```

## How grading works

This phase does **not** compare printed text. The grader imports your file and
evaluates expressions against it:

```python
factorial(6)    # must RETURN 720
factorial(-1)   # must RAISE ValueError
```

**Names matter.** If the question says write `factorial(n)`, the grader calls
`factorial`. A perfect function named `fact` scores zero, because the grader
cannot find it.

**Returning is not printing.** `print(720)` fails a check that wants `720`
returned - the caller has nothing to work with.

**Tuples and lists are interchangeable.** Returning `(14, 6)` or `[14, 6]`
both pass; the question asks for four values, not a specific container.

**File questions run in a scratch directory** that is created fresh and
deleted afterwards, with any fixture files already in place. Nothing you write
touches your real folders.

## Coverage

| | Count |
| --- | --- |
| Questions graded automatically | **50** |
| Total checks | **166** |
| Manual | **10** (Q25, Q26, Q30, Q32, Q33, Q34, Q57, Q58, Q59, Q60) |

Manual questions need something the grader cannot judge - a separate module file, real command-line arguments, today's date, your actual filesystem, or a whole multi-class design. Each one says which.

## Where the expected answers come from

Every expected value was produced by **running a reference solution**, never
typed by hand. Those solutions are published in [solutions.md](../solutions.md),
and all 50 have been re-extracted from that file and re-run through this
grader to confirm they pass all 166 checks.

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
