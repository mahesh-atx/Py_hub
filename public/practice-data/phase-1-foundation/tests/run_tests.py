"""Phase 1 judge — write your solution, run it against the test cases.

    python run_tests.py 4          run every case for Q4
    python run_tests.py 4 --diff   show the failing case in detail
    python run_tests.py --all      everything you have attempted
    python run_tests.py --new 4    create answers/q04.py to write in
    python run_tests.py --list     coverage summary

How grading works
-----------------
Your program reads with `input()` and writes with `print()`, exactly as the
question describes.

**Prompts are ignored.** Whatever you pass to `input()` is discarded by the
grader, so `input("Enter length: ")`, `input("Length: ")` and `input()` all
score the same. You are graded on the answer, not on guessing my wording.

**Only what you print is compared.** The values you read are not echoed back,
so the expected output contains your answer lines and nothing else.

**Trailing whitespace is ignored**, on each line and at the end. Everything
else must match exactly - `Area: 60` is not `area = 60`.

Each question runs several test cases. **One is shown in the question; the
rest are hidden**, and they include the awkward inputs: zero, negatives, one,
and the boundaries. Hard-coding the visible answer will not get you far.
"""

import argparse
import builtins
import contextlib
import io
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ANSWERS = HERE / "answers"
CASES = json.loads((HERE / "cases.json").read_text(encoding="utf-8"))

G, R, Y, D, B, O = ("\033[32m", "\033[31m", "\033[33m",
                    "\033[90m", "\033[1m", "\033[0m")
if not sys.stdout.isatty():
    G = R = Y = D = B = O = ""


def norm(s):
    """Trailing whitespace is not graded."""
    return "\n".join(l.rstrip() for l in s.rstrip("\n").split("\n"))


def execute(path, feed):
    """Run the learner's script. Prompts are swallowed; output is captured."""
    it = iter(feed)
    buf = io.StringIO()
    real = builtins.input

    def fake(prompt=""):
        try:
            return next(it)
        except StopIteration:
            raise EOFError(
                "your program asked for more input than this case provides - "
                "check for an extra input() or a loop that never ends") from None

    builtins.input = fake
    try:
        with contextlib.redirect_stdout(buf):
            exec(compile(path.read_text(encoding="utf-8"), str(path), "exec"),
                 {"__name__": "__main__", "__file__": str(path)})
    finally:
        builtins.input = real
    return norm(buf.getvalue())


def show_case(case, got, err=None):
    inp = ", ".join(repr(i) for i in case["input"]) or "(no input)"
    print(f"\n  {D}input:{O} {inp}")
    print(f"  {D}expected:{O}")
    for l in case["output"].split("\n"):
        print(f"    {G}{l}{O}")
    if err:
        print(f"  {D}your program raised:{O}\n    {R}{err}{O}")
        return
    print(f"  {D}you printed:{O}")
    for l in (got.split("\n") if got else ["(nothing)"]):
        print(f"    {R}{l}{O}")
    exp, act = case["output"].split("\n"), got.split("\n")
    for i in range(max(len(exp), len(act))):
        e = exp[i] if i < len(exp) else None
        a = act[i] if i < len(act) else None
        if e != a:
            if e is None:
                print(f"  {Y}line {i+1}: you printed an extra line {a!r}{O}")
            elif a is None:
                print(f"  {Y}line {i+1}: missing - expected {e!r}{O}")
            else:
                for c in range(max(len(e), len(a))):
                    ec = e[c] if c < len(e) else None
                    ac = a[c] if c < len(a) else None
                    if ec != ac:
                        print(f"  {Y}line {i+1}, character {c+1}: "
                              f"expected {ec!r}, got {ac!r}{O}")
                        break
            break


def test_one(qid, want_diff=False, quiet=False):
    entry = CASES.get(str(qid))
    if entry is None:
        print(f"{R}Q{qid} has no test.{O}")
        return None
    if entry.get("manual"):
        if not quiet:
            print(f"{Y}Q{qid:<3} MANUAL{O}  {entry['manual']}")
        return None

    path = ANSWERS / f"q{qid:02d}.py"
    if not path.exists():
        if not quiet:
            print(f"{D}Q{qid:<3} not attempted{O}  "
                  f"(start it: python run_tests.py --new {qid})")
        return None

    cases = entry["cases"]
    passed, first_bad, first_got, first_err = 0, None, None, None
    for case in cases:
        try:
            got = execute(path, case["input"])
            err = None
        except Exception as e:
            got, err = None, f"{type(e).__name__}: {e}"
        if err is None and got == case["output"]:
            passed += 1
        elif first_bad is None:
            first_bad, first_got, first_err = case, got, err

    n = len(cases)
    if passed == n:
        print(f"{G}Q{qid:<3} PASS{O}  {passed}/{n} cases")
        return True

    hidden = "" if first_bad["visible"] else f" {D}(hidden case){O}"
    print(f"{R}Q{qid:<3} FAIL{O}  {passed}/{n} cases{hidden}")
    if want_diff:
        show_case(first_bad, first_got, first_err)
    else:
        print(f"  {D}run again with --diff to see the failing case{O}")
    return False


def main():
    ap = argparse.ArgumentParser(add_help=True)
    ap.add_argument("question", nargs="?", type=int)
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--diff", action="store_true")
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--new", type=int)
    args = ap.parse_args()

    ANSWERS.mkdir(exist_ok=True)

    if args.new:
        p = ANSWERS / f"q{args.new:02d}.py"
        if p.exists():
            print(f"{p.relative_to(HERE)} already exists")
        else:
            p.write_text(f"# Phase 1 - Q{args.new}\n"
                         f"# Read with input(), print the answer.\n"
                         f"# Prompts are ignored by the grader.\n"
                         f"#   python run_tests.py {args.new} --diff\n\n")
            print(f"created {p.relative_to(HERE)}")
        return

    if args.list:
        auto = {k: v for k, v in CASES.items() if "cases" in v}
        man = [k for k, v in CASES.items() if v.get("manual")]
        total = sum(len(v["cases"]) for v in auto.values())
        print(f"{len(auto)} questions graded automatically, "
              f"{total} test cases in total")
        print(f"{len(man)} manual: {', '.join('Q' + m for m in man)}")
        return

    if args.question:
        test_one(args.question, want_diff=args.diff)
        return

    if args.all:
        res = [r for k in sorted(CASES, key=int)
               if (r := test_one(int(k), quiet=True)) is not None]
        total = len([v for v in CASES.values() if "cases" in v])
        if res:
            print(f"\n{B}{sum(res)}/{len(res)} attempted questions pass{O}"
                  f"  {D}({total - len(res)} of {total} not started){O}")
        else:
            print("nothing attempted yet - python run_tests.py --new 1")
        return

    ap.print_help()


if __name__ == "__main__":
    main()
