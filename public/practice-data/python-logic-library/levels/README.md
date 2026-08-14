# Python Logic — Complete Practice Library (660 Questions + Projects)

A complete step-by-step practice course in 3 parts:

1. **9 Levels × 30 questions** (270) — the progression path
2. **12 Topic deep-dives × 30 questions** (360) — master each topic separately
3. **30 Advanced projects** — build real applications

Every question has:

- ✅ A clear statement of **what to do**
- 💡 A **hint** (the key idea, without spoiling the answer)
- 🐍 A complete **Python solution** with a short **logic** explanation

## The levels

| # | File | Focus |
|---|------|-------|
| 1 | [Level_1_Basic_Thinking.md](Level_1_Basic_Thinking.md) | print, variables, loops, if/else, counting, sums, largest/smallest, strings |
| 2 | [Level_2_Conditions_Loops.md](Level_2_Conditions_Loops.md) | while loops, break, nested loops, prime, factorial, Fibonacci, patterns |
| 3 | [Level_3_Strings_Lists.md](Level_3_Strings_Lists.md) | slicing, split/join, string methods, list operations, anagrams |
| 4 | [Level_4_Tuples_Sets.md](Level_4_Tuples_Sets.md) | tuples, unpacking, set operations, duplicates, unique values |
| 5 | [Level_5_Dictionaries.md](Level_5_Dictionaries.md) | keys/values, frequency, grouping, nested dicts, sorting |
| 6 | [Level_6_Functions.md](Level_6_Functions.md) | def/return, *args/**kwargs, lambda, recursion, composition |
| 7 | [Level_7_Files_Errors.md](Level_7_Files_Errors.md) | read/write, CSV, try/except, validation, persistence |
| 8 | [Level_8_Modules_OOP.md](Level_8_Modules_OOP.md) | math/random/datetime, own modules, classes, inheritance |
| 9 | [Level_9_Projects.md](Level_9_Projects.md) | calculator, games, to-do, tracker, contact book, OOP systems |

## How to use this course

1. **Hide the solution** — read the question, then the hint. Try to write the code yourself.
2. **Check your answer** — compare with the solution. Different code that gives the right result is still correct!
3. **Trace it** — for the tricky ones, follow the variables step by step on paper (like the traces shown in Level 1 Q24 and Q30).
4. **Break it and fix it** — change values, add edge cases, make the code fail, then understand why.
5. **Move on only when the patterns click** — the same 7 patterns repeat through every level:
   - **Counting** — `count = 0` … `count += 1`
   - **Running total** — `total = 0` … `total += item`
   - **Current best** — largest / smallest / most frequent
   - **Search** — find a target, stop when found
   - **Filter** — keep only items that pass a condition
   - **Build** — construct a new list/string/dict from an old one
   - **Menu loop** — `while True` + options (from Level 5 onward)

## Progression

```
Basic thinking → Conditions → Loops → Strings → Lists → Tuples → Sets
→ Dictionaries → Functions → Files → Errors → Modules → OOP → Projects
```

## Topic deep-dives (12 topics × 30 questions = 360)

After finishing the levels, go deeper into ONE topic at a time. Each file has 30 harder questions in the same format (task → hint → solution → logic):

| File | Topic | Sample of what's inside |
|------|-------|------------------------|
| [Topic_01_Conditions.md](../topics/Topic_01_Conditions.md) | Conditions | slabs/bills, triangle rules, zodiac, loan eligibility, match-case |
| [Topic_02_Loops.md](../topics/Topic_02_Loops.md) | Loops | Pascal/Floyd patterns, Collatz, perfect numbers, digit peeling |
| [Topic_03_Strings.md](../topics/Topic_03_Strings.md) | Strings | anagram-adjacent checks, rotations, Caesar cipher, snake↔Camel |
| [Topic_04_Lists.md](../topics/Topic_04_Lists.md) | Lists | rotations, missing number, leaders, recursive flattening, pairs |
| [Topic_05_Tuples.md](../topics/Topic_05_Tuples.md) | Tuples | zip/unzip, namedtuples, tuples as dict keys, columns |
| [Topic_06_Sets.md](../topics/Topic_06_Sets.md) | Sets | powerset, disjoint/proper subsets, sudoku row check, frozensets |
| [Topic_07_Dictionaries.md](../topics/Topic_07_Dictionaries.md) | Dictionaries | defaultdict/Counter, inverting, grouping, composite sorting |
| [Topic_08_Functions.md](../topics/Topic_08_Functions.md) | Functions | closures, generators, recursion, decorators, reduce/partial |
| [Topic_09_Files.md](../topics/Topic_09_Files.md) | Files | CSV/JSON, binary, tempfiles, os.walk, merge/split, zip |
| [Topic_10_Errors.md](../topics/Topic_10_Errors.md) | Errors | custom exceptions, chaining, assertions, context managers |
| [Topic_11_Modules.md](../topics/Topic_11_Modules.md) | Modules | itertools, functools, re, zipfile, hashlib, your own package |
| [Topic_12_OOP.md](../topics/Topic_12_OOP.md) | OOP | properties, magic methods, ABCs, dataclasses, enums, patterns |

## Advanced projects (30)

[Projects_Advanced.md](../projects/Projects_Advanced.md) — build real applications. Each has a **build plan** (steps to think through before you code) plus a full solution. Includes: SQLite apps, a tic-tac-toe AI with minimax, a Sudoku solver with backtracking, tkinter GUIs, a Snake game, an email sender, a socket chat app, a web scraper, a markdown→HTML converter, a Wordle clone, and more.

> Every solution in these files has been verified to run without errors (and the key algorithms verified for correct output). Solutions that use `input()` are meant to be run on your own computer (or an online Python runner), where you can type responses. GUI/network projects need your computer with Python installed.
