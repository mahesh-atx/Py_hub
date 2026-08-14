"""Phase 3 judge - write your functions, run them against the checks.

    python run_tests.py 4          run every check for Q4
    python run_tests.py 4 --diff   show which check failed and why
    python run_tests.py --all      everything you have attempted
    python run_tests.py --new 4    create answers/q04.py to write in
    python run_tests.py --list     coverage summary

How grading works
-----------------
Unlike Phase 1, this phase does **not** compare printed text. It imports your
file and evaluates expressions against it - `factorial(6)` must **return**
`720`. What you print is ignored unless a question specifically asks for
printed output.

That means **naming matters**. If the question says write `factorial(n)`, the
grader calls `factorial`. A perfect function called `fact` scores zero, because
the grader cannot find it.

Some checks expect an **exception**. `factorial(-1)` must raise `ValueError`;
returning `None` instead is a failure, because the caller cannot tell the
difference between "invalid" and "no answer".
"""

import argparse
import contextlib
import importlib.util
import io
import json
import os
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
ANSWERS = HERE / "answers"
CASES = json.loads((HERE / "cases.json").read_text(encoding="utf-8"))
HELPERS = (HERE / "_helpers.py").read_text(encoding="utf-8")

G, R, Y, D, B, O = ("\033[32m", "\033[31m", "\033[33m",
                    "\033[90m", "\033[1m", "\033[0m")
if not sys.stdout.isatty():
    G = R = Y = D = B = O = ""


def load(path, fixtures, workdir):
    """Import the learner's file inside a scratch directory."""
    for name, content in (fixtures or {}).items():
        (Path(workdir) / name).write_text(content, encoding="utf-8")
    ns = {"__name__": "__main__", "__file__": str(path)}
    with contextlib.redirect_stdout(io.StringIO()):
        exec(compile(path.read_text(encoding="utf-8"), str(path), "exec"), ns)
        exec(compile(HELPERS, "<helpers>", "exec"), ns)
    return ns


def normalise(value):
    """JSON has no tuple type, so compare tuples and lists structurally.

    A function that returns (14, 6) and one that returns [14, 6] are both
    accepted - the question asks for four values, not for a specific
    container. Everything else is compared exactly.
    """
    if isinstance(value, (list, tuple)):
        return [normalise(v) for v in value]
    if isinstance(value, dict):
        return {k: normalise(v) for k, v in value.items()}
    return value


def evaluate(ns, expr):
    """Run one check expression. Returns ('value', v) or ('raise', name)."""
    try:
        with contextlib.redirect_stdout(io.StringIO()):
            if ";" in expr:
                *setup, final = expr.split(";")
                for line in setup:
                    exec(line.strip(), ns)
                return "value", eval(final.strip(), ns)
            return "value", eval(expr, ns)
    except Exception as e:
        return "raise", type(e).__name__


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

    checks = entry["checks"]
    passed, failures = 0, []
    cwd = os.getcwd()
    with tempfile.TemporaryDirectory() as td:
        os.chdir(td)
        try:
            ns = load(path, entry.get("fixtures"), td)
        except Exception as e:
            os.chdir(cwd)
            print(f"{R}Q{qid:<3} ERROR{O}   your file failed to run: "
                  f"{type(e).__name__}: {e}")
            return False
        try:
            for check in checks:
                kind, value = evaluate(ns, check["expr"])
                if check["raises"]:
                    ok = kind == "raise" and value == check["expected"]
                    got = f"raised {value}" if kind == "raise" else repr(value)
                    want = f"raises {check['expected']}"
                else:
                    ok = (kind == "value"
                          and normalise(value) == normalise(check["expected"]))
                    got = f"raised {value}" if kind == "raise" else repr(value)
                    want = repr(check["expected"])
                if ok:
                    passed += 1
                else:
                    failures.append((check["expr"], want, got))
        finally:
            os.chdir(cwd)

    n = len(checks)
    if passed == n:
        print(f"{G}Q{qid:<3} PASS{O}  {passed}/{n} checks")
        return True

    print(f"{R}Q{qid:<3} FAIL{O}  {passed}/{n} checks")
    if want_diff:
        for expr, want, got in failures:
            print(f"\n  {D}check:{O}    {expr}")
            print(f"  {D}expected:{O} {G}{want}{O}")
            print(f"  {D}you gave:{O} {R}{got}{O}")
    else:
        print(f"  {D}run again with --diff to see which checks failed{O}")
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
            p.write_text(f"# Phase 3 - Q{args.new}\n"
                         f"# Define what the question asks for, using exactly\n"
                         f"# the names it gives you.\n"
                         f"#   python run_tests.py {args.new} --diff\n\n")
            print(f"created {p.relative_to(HERE)}")
        return

    if args.list:
        auto = {k: v for k, v in CASES.items() if "checks" in v}
        man = [k for k, v in CASES.items() if v.get("manual")]
        total = sum(len(v["checks"]) for v in auto.values())
        print(f"{len(auto)} questions graded automatically, {total} checks in total")
        print(f"{len(man)} manual: {', '.join('Q' + m for m in sorted(man, key=int))}")
        return

    if args.question:
        test_one(args.question, want_diff=args.diff)
        return

    if args.all:
        res = [r for k in sorted(CASES, key=int)
               if (r := test_one(int(k), quiet=True)) is not None]
        total = len([v for v in CASES.values() if "checks" in v])
        if res:
            print(f"\n{B}{sum(res)}/{len(res)} attempted questions pass{O}"
                  f"  {D}({total - len(res)} of {total} not started){O}")
        else:
            print("nothing attempted yet - python run_tests.py --new 1")
        return

    ap.print_help()


if __name__ == "__main__":
    main()
