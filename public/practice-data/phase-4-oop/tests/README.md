# Phase 4 — Automated Judge

Write your solution, run one command, find out whether it is right.

```bash
cd tests
python run_tests.py --new 3     # creates answers/q03.py
# ... write your solution in that file ...
python run_tests.py 3 --diff    # grade it
```

## Commands

```bash
python run_tests.py 3           # run every check for Q3
python run_tests.py 3 --diff    # show exactly what failed
python run_tests.py --all       # everything you have attempted
python run_tests.py --new 3     # create a blank answer file
python run_tests.py --list      # coverage summary
```

## How grading works

The grader builds objects from your classes, calls methods and reads
attributes:

```python
Rectangle(5, 5).area()      # must RETURN 25
Circle(-1)                  # must RAISE ValueError
Point(1, 2) == Point(1, 2)  # must be True once __eq__ exists
```

**Names matter.** Class names, method names and attribute names must match the
question exactly, or the grader cannot find them.

**Some checks build several objects in one line**, separated by semicolons, to
test how instances interact - Q14's shared-mutable trap needs two dogs before
the bug is visible.

**Tuples and lists are interchangeable** in a returned value.

## Coverage

| | Count |
| --- | --- |
| Questions graded automatically | **56** |
| Total checks | **192** |
| Manual | **4** (Q57, Q58, Q59, Q60) |

Manual questions need something the grader cannot judge - a separate module file, real command-line arguments, today's date, your actual filesystem, or a whole multi-class design. Each one says which.

## Where the expected answers come from

Every expected value was produced by **running a reference solution**, never
typed by hand. Those solutions are published in [solutions.md](../solutions.md),
and all 56 have been re-extracted from that file and re-run through this
grader to confirm they pass all 192 checks.

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
