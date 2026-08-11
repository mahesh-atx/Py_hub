#!/usr/bin/env python3
"""Shared generator for topic-drill hidden-tests.json and solutions.md.

Each topic's QUESTIONS dict maps question_id -> {
    "title": str,          # question title
    "difficulty": str,
    "code": str,           # reference solution (reads stdin, prints result)
    "tests": [str, ...],   # input strings (one per hidden test)
}
This runner executes each reference solution against each input to compute the
expected output, then writes hidden-tests.json and solutions.md into the topic
folder. solutions.md is auto-generated from the same reference code, keeping the
two layers perfectly consistent.
"""
import json
import os
import subprocess
import sys


def _expected(code, inp):
    proc = subprocess.run(
        [sys.executable, "-c", code],
        input=inp,
        capture_output=True,
        text=True,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"Reference solution errored:\n{proc.stderr}")
    return proc.stdout


def build(topic_folder, topic_id, questions, topics_list):
    qlist = []
    for qid in sorted(questions):
        entry = questions[qid]
        tests = []
        for inp in entry["tests"]:
            tests.append({
                "input": inp,
                "expected_output": _expected(entry["code"], inp),
            })
        qlist.append({"question_id": qid, "tests": tests})

    data = {"topic": topic_id, "topics": topics_list, "questions": qlist}
    tests_path = os.path.join(topic_folder, "hidden-tests.json")
    with open(tests_path, "w") as f:
        json.dump(data, f, indent=2)

    lines = ["# Solutions — " + os.path.basename(topic_folder)]
    lines.append("")
    lines.append("> Try each problem yourself first. Solutions are for checking after a genuine attempt.")
    lines.append("")
    for qid in sorted(questions):
        e = questions[qid]
        lines.append(f"## Q{qid}. {e['title']}")
        lines.append("")
        lines.append(f"**Difficulty:** {e['difficulty']}")
        lines.append("")
        lines.append("```python")
        lines.append(e["code"].rstrip("\n"))
        lines.append("```")
        lines.append("")
    sol_path = os.path.join(topic_folder, "solutions.md")
    with open(sol_path, "w") as f:
        f.write("\n".join(lines))

    n_tests = sum(len(q["tests"]) for q in qlist)
    print(f"  {os.path.basename(topic_folder)}: {len(qlist)} questions, {n_tests} tests -> hidden-tests.json, solutions.md")
