# Phase 1 — Automated Judge

Write your solution, run one command, find out whether it is right.

```bash
cd tests
python run_tests.py --new 4     # creates answers/q04.py
# ... write your solution in that file ...
python run_tests.py 4 --diff    # grade it
```

## Commands

```bash
python run_tests.py 4           # run every case for Q4
python run_tests.py 4 --diff    # show the failing case in detail
python run_tests.py --all       # everything you have attempted
python run_tests.py --new 4     # create a blank answer file
python run_tests.py --list      # coverage summary
```

## How grading works

Your program reads with `input()` and prints the answer — exactly what the
question describes. Nothing test-specific.

**Prompts are ignored.** Whatever you pass to `input()` is thrown away by the
grader. All three of these score identically:

```python
length = int(input("Enter length: "))
length = int(input("Length? "))
length = int(input())
```

You are graded on the answer, not on guessing my wording.

**Only your printed answer is compared.** The values fed in are not echoed
back, so for Q4 with input `12` and `5` the expected output is just:

```
Area: 60
Perimeter: 34
```

**Trailing whitespace is ignored**, on every line and at the end of the
output. A stray space after the last item on a line will not fail you.
Everything else is exact — `Area: 60` is not `area = 60` and not `Area:60`.

## Several cases per question, most of them hidden

Each question runs **3–7 test cases**. The first is the one shown in the
question; the rest you never see, and they are chosen to be awkward — zero,
negative numbers, one, and the boundary values.

Q27 (grade calculator) runs marks of 84, 90, 39, 100, **−5**, **101** and 40.
A solution that forgets to reject out-of-range input passes five cases and
fails two:

```
Q27  FAIL  5/7 cases (hidden case)

  input: '-5'
  expected:
    Invalid marks
  you printed:
    Grade: Fail
  line 1, character 1: expected 'I', got 'G'
```

This is why hard-coding the visible answer does not work. Q11 with
`print("Days: 9125")` passes 1 of 4 and fails the moment the age is 0.

## Coverage

| | Count |
| --- | --- |
| Questions graded automatically | **59** |
| Total test cases | **216** |
| Manual | **1** (Q22) |

Q22 is manual because whether `1000 is 1000` prints `True` depends on how your
interpreter folds constants — there is no single correct output, which is the
whole point of that question.

## Where the expected output comes from

Every expected answer was produced by **running a reference solution**, never
typed by hand. Those same solutions are published in
[solutions.md](../solutions.md), and all 59 have been re-extracted from that
file and re-run through this grader to confirm they pass all 216 cases.

## Files

```
tests/
├── README.md      ← this file
├── run_tests.py   ← the grader
├── cases.json     ← inputs + expected answers (generated)
└── answers/       ← your solutions (gitignored)
```

## The rules

1. **Write the code before you open anything else.** The grader tells you
   whether you are right; it cannot tell you how to think.
2. **A failing hidden case is the most useful output here.** It means your
   logic works for the obvious input and breaks on an edge — which is exactly
   the bug that reaches production.
3. **Do not tune to the visible case.** If you find yourself typing `9125`,
   stop.
