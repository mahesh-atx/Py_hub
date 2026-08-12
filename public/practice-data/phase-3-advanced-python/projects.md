# 🚀 Practice Projects for Phase 3

Projects for **Modules 9–12**: functions, modules and packages, file handling, and exception handling.

**Rules for this set:**

- Every project must be built with functions — `main()`, helper functions, and `if __name__ == "__main__":`.
- Use `with open(...)` for every file read/write, never bare `open()` without a close.
- Use `json`/`csv` modules instead of parsing text by hand.
- Catch **specific** exceptions; never a bare `except:`. Write custom exceptions where the project asks for it.
- File paths may live in the same directory as the script (the IDE workspace) so you can test round-trips.

---

## P1. Scientific Calculator

**Difficulty:** Medium
**Learning Objective:** Refactor a program into reusable functions — one function per operation with clean signature and error handling.

**Scenario.** A console scientific calculator with a menu: add, subtract, multiply, divide, power, square root, and factorial. Each operation is a function; the menu loop calls them. Faulty input raises or returns a clear error instead of crashing.

**Requirements**

- [ ]  One function per operation: `add(a, b)`, `sub(a, b)`, `mul(a, b)`, `div(a, b)`, `pow(a, b)`, `sqrt(n)`, `fact(n)`.
- [ ]  `div` raises `ZeroDivisionError` naturally or returns `None` with a printed message — pick one and document it.
- [ ]  `sqrt` must reject negative numbers with a clear message.
- [ ]  `fact` requires `n >= 0` and integer input; non-integers print `n must be a whole number.`
- [ ]  Menu loops until the user chooses Exit; bad menu choices re-prompt.
- [ ]  All results printed with 4 decimals max.

**Sample Run**

```
1. Add  2. Subtract  3. Multiply  4. Divide  5. Power  6. Square Root  7. Factorial  8. Exit
Choice: 7
n: 5
5! = 120
Choice: 8
```

**Hint:** `fact` is the classic recursion drill: `fact(0) = 1`, `fact(n) = n * fact(n-1)`. Add `from math import sqrt` or use `n ** 0.5`.

---

## P2. Contact Book with File Storage

**Difficulty:** Medium
**Learning Objective:** Persist data with the `json` module — saving and loading a dictionary to disk, then treating JSON round-trips like a real database.

**Scenario.** The Phase 2 contact book, upgraded: contacts live in `contacts.json` on disk and survive restarts. Save on every change; load on startup. If the file is missing or corrupt, start empty — never crash.

**Requirements**

- [ ]  Load contacts from `contacts.json` at startup; missing file → empty dict.
- [ ]  Add/delete/update always `save()` afterwards — one helper function writes the whole dict with `json.dump(..., indent=2)`.
- [ ]  Corrupt JSON (hand-edited file) prints `contacts.json is corrupt, starting fresh.` and continues.
- [ ]  List All shows contact count: `2 contacts.` plus sorted lines.
- [ ]  Search finds partial matches (substring, case-insensitive) and prints all matches, else `No contacts found`.

**Sample Run**

```
Loading contacts... 2 contacts loaded.
1. Add  2. Search  3. List All  4. Delete  5. Exit
Choice: 1
Name: ram
Phone: 9988776655
Saved. Remaining on disk: 3 contacts.
```

**Hint:** `with open(path, "w", encoding="utf-8") as f: json.dump(contacts, f, indent=2)` and wrap the load in `try/except (FileNotFoundError, json.JSONDecodeError)`.

---

## P3. Expense Tracker

**Difficulty:** Hard
**Learning Objective:** Use the `csv` module, aggregate data across categories, and build a monthly summary report.

**Scenario.** An app that records expenses to `expenses.csv` (date, category, amount, note) and prints a monthly summary: total spent, spending per category, and the top category. Data must survive restarts.

**Requirements**

- [ ]  Add Expense writes one row: `YYYY-MM-DD, category, amount, note` (ask for a date or default to today).
- [ ]  Reject amounts `<= 0` and empty categories.
- [ ]  Monthly Summary reads the CSV, asks for `YYYY-MM`, and prints total for that month plus a per-category breakdown, biggest first.
- [ ]  Print a plain-text report also to `summary.txt` with the same numbers.
- [ ]  Menu: `1. Add Expense` `2. Monthly Summary` `3. Exit`; missing CSV handled as an empty ledger.

**Sample Run**

```
1. Add Expense  2. Monthly Summary  3. Exit
Choice: 2
Month (YYYY-MM): 2026-07
July 2026 summary:
  Total: 420.50
  food: 250.00
  travel: 120.50
  bills: 50.00
Top category: food
Report written to summary.txt
```

**Hint:** Read with `csv.DictReader` (first row = headers) and sum into a `totals` dict. Write rows with `csv.writer` + `writerow`.

---

## P4. Student Report Card Generator

**Difficulty:** Hard
**Learning Objective:** Transform data from one format into another — read a marks file, compute grades, write a report file.

**Scenario.** The teacher drops `marks.csv` with rows `name,subject,marks` (one row per student per subject). The program reads it, computes each student's average and grade, and writes `report.txt` sorted by average (best first).

**Requirements**

- [ ]  Read `marks.csv` with `csv.DictReader`; missing file prints a helpful error and exits cleanly.
- [ ]  Grade scale: 90+ `A`, 75+ `B`, 60+ `C`, 40+ `D`, else `F`.
- [ ]  Handle blank or invalid marks (e.g. `"abc"`) by skipping the row and counting it: `Skipped 2 invalid rows.`
- [ ]  Write `report.txt`: for each student `Name - 82.50 - B`, centered, then the class average at the end.
- [ ]  Print the report to the console too, so the user sees the result immediately.

**Sample Run**

```
Reading marks.csv... 
Skipped 1 invalid row.
Report written to report.txt
=== Class Report ===
Priya - 91.00 - A
Rahul - 74.00 - C
Class average: 82.50
```

**Hint:** Aggregate with a dict `students[name] = [marks]`, then `statistics.mean` (or `sum/len`) per student. Wrap the whole pipeline in `try/except` with specific error messages.

---

## P5. Password Manager (basic)

**Difficulty:** Medium
**Learning Objective:** Build a persistence layer with a secret twist — encrypt nothing yet, but validate every field and store structured data.

**Scenario.** A vault that stores `service -> {"username": ..., "password": ...}` into `vault.json`. Includes a master-PIN gate so the app mimics how a real password manager feels before you learn cryptography.

**Requirements**

- [ ]  Master PIN prompt at startup (e.g. `2468`); 3 wrong attempts print `Locked.` and exit.
- [ ]  Menu: `1. Save Credential` `2. Get Credential` `3. List Services` `4. Delete` `5. Exit`.
- [ ]  Reject empty service names, empty usernames, and passwords shorter than 6 characters.
- [ ]  `Get` prints the stored username/password — never print the whole vault at once.
- [ ]  Save-after-any-change with `json.dump`. Load on startup with full exception handling.
- [ ]  Plaintext on disk is fine for this project; a note in the code says "encrypt in Phase 4-style project".

**Sample Run**

```
Enter PIN: 2468
1. Save Credential  2. Get Credential  3. List Services  4. Delete  5. Exit
Choice: 1
Service: github
Username: priya.sharma
Password: gh-p4ss!
Saved github.
```

**Hint:** One `load()` and one `save()` pair of functions; every menu handler calls `ensure_loaded_saved` via a shared pattern: `save(vault)` after each mutation.

---

## P6. Custom Utility Package

**Difficulty:** Hard
**Learning Objective:** Create your own package with `__init__.py`, separate modules, and `if __name__ == "__main__"` in every module — then import it in a demo script.

**Scenario.** Build a `mytools/` package with two modules: `mathutil.py` (is_prime, gcd, lcm, factorial) and `strutil.py` (reverse, count_vowels, is_palindrome, title_case). Then a `demo.py` imports and exercises every function. This is the "build a small library" experience.

**Requirements**

- [ ]  Folder layout: `mytools/__init__.py`, `mytools/mathutil.py`, `mytools/strutil.py`, `demo.py`.
- [ ]  `__init__.py` re-exports the useful names: `from .mathutil import is_prime, gcd` etc.
- [ ]  Every module guards with `if __name__ == "__main__":` showing example calls when run directly.
- [ ]  `is_prime` must be efficient enough for numbers up to 1,000,000 (check up to `int(sqrt(n))`).
- [ ]  `demo.py` imports `from mytools import *` and prints a table of 10 demo results.
- [ ]  Invalid inputs (`gcd(0, 0)`, `factorial(-1)`) raise `ValueError` with clear messages.

**Sample Run**

```
$ python demo.py
Prime checks: 2->True 97->True 99->False
gcd(48, 36) = 12
lcm(4, 6) = 12
'recursion' reversed = 'noisrucer'
vowels in 'hello world' = 3
```

**Hint:** `from math import isqrt` gives exact integer square roots (`isqrt(n) + 1` as loop bound). `__init__.py` can be a single `from .mathutil import *` plus `__all__`.

---

## P7. Log File Analyser

**Difficulty:** Medium
**Learning Objective:** Read a real-shaped text file, classify lines with functions, and produce aggregate statistics.

**Scenario.** `server.log` contains lines like `[2026-07-21 10:14:02] ERROR db timeout` mixed with INFO/WARN lines and junk. The analyser reads it and prints: counts per level, the top 3 error messages, and the busiest hour.

**Requirements**

- [ ]  Parse only lines starting with `[`; skip junk lines, counting them separately: `Ignored 4 malformed lines.`
- [ ]  Extract the level token (`ERROR`/`WARN`/`INFO`) and print a count table.
- [ ]  Group ERROR messages by text and print the top 3, with counts and percentages.
- [ ]  Extract the hour from the timestamp and print the hour with the most lines.
- [ ]  Functions: `parse_line(line) -> dict|None`, `summarise(log_lines) -> stats`, `report(stats)`.
- [ ]  Missing log file prints `server.log not found.` and exits gracefully.

**Sample Run**

```
Reading server.log... 128 lines read
Levels:
  INFO: 82
  WARN: 21
  ERROR: 25
Top errors:
  1. db timeout (12)
  2. auth failed (9)
  3. 500 on /api/orders (4)
Busiest hour: 14:00-15:00 (19 lines)
```

**Hint:** `line.split()` puts the level at index 1 and the message at index 3+. Use `time` extraction with `line[1:12]`. Collections-free: plain dicts.

---

## P8. Quiz App with Persistence

**Difficulty:** Hard
**Learning Objective:** Combine structured JSON data loading, configuration files, and appending scores to a leaderboard file.

**Scenario.** The Phase 2 quiz app, upgraded: questions come from `questions.json`, the player's score is appended to `scores.csv` with a timestamp, and the app shows a high-score table.

**Requirements**

- [ ]  Load questions from `questions.json` — array of `{q, options, answer}`; fine to copy the Phase 2 bank into JSON shape.
- [ ]  At login, ask for the player's name; empty names rejected.
- [ ]  After the quiz, append `name,score,timestamp` to `scores.csv` with `csv.writer`.
- [ ]  Print the top-5 leaderboard sorted by score descending, using tie-break by earliest timestamp.
- [ ]  If `questions.json` is missing or invalid, exit with `Failed to load questions: <reason>`.
- [ ]  Catch answer-input errors per question (invalid letters re-prompt, no crash).

**Sample Run**

```
Loading questions.json... 10 questions.
Name: priya
Q1. Which type is immutable?
... (8/10 correct)
Appended to scores.csv.
=== Leaderboard ===
1. priya    8 2026-07-21 10:14:02
2. ram      6 2026-07-20 09:01:00
```

**Hint:** Write the score with `datetime.now().strftime("%Y-%m-%d %H:%M:%S")`, sort with `key=lambda r: (-int(r[1]), r[2])`.

---

## P9. File Organiser

**Difficulty:** Medium
**Learning Objective:** Walk a folder with `os`/`pathlib`, create subfolders, and move files by extension — the classic real-world automation script.

**Scenario.** `~/Downloads` (use `./files/` in the IDE workspace for testing) contains a mess of `.pdf`, `.png`, `.jpg`, `.txt`, `.csv`. The script moves each file into `Images/`, `Documents/`, `Data/`, or strays into `Other/`, and prints a summary.

**Requirements**

- [ ]  Use `os.listdir` or `pathlib.Path.iterdir` — but **do not** descend into subdirectories.
- [ ]  Target folders: `.pdf .docx .txt` → `Documents`, `.png .jpg .jpeg .gif` → `Images`, `.csv .json .log` → `Data`, else `Other`.
- [ ]  Create destination folders only when needed (`os.makedirs(..., exist_ok=True)`).
- [ ]  Never crash if a file disappears mid-run (wrap the move in try/except and report it).
- [ ]  Print `Moved report.pdf -> Documents/` per file plus a summary table with counts.
- [ ]  Run idempotently — re-running moves nothing new.

**Sample Run**

```
Scanning ./files/ ... 12 files found
Moved report.pdf -> Documents/
Moved photo.png -> Images/
...
Summary:
  Documents: 3
  Images: 5
  Data: 2
  Other: 2
```

**Hint:** `os.path.splitext(name)[1].lower()` gives the extension; `os.rename(src, dest)` moves a file. `pathlib` alternative: `f.suffix`, `f.replace(dest)`.

---

## P10. Bank Account Simulator

**Difficulty:** Hard
**Learning Objective:** Use custom exceptions, `try/except`, and clean error messages the way professional codebases do — no printing inside business logic.

**Scenario.** A bank simulator with a `BankAccount`-style module: `create_account`, `deposit`, `withdraw`, `transfer`, plus custom exceptions `InsufficientFundsError`, `NegativeAmountError`, `AccountNotFoundError`. The menu-driven UI catches these and prints friendly messages. (No classes yet — functions with a global accounts dict keep it Phase 3.)

**Requirements**

- [ ]  Custom exceptions: `class InsufficientFundsError(Exception): ...` plus the other two, each with messages.
- [ ]  `deposit/withdraw/transfer` **raise** the exceptions; the menu layer catches and prints them — never `print()` inside the logic functions.
- [ ]  Transfer between two accounts checks both balances and updates both only on success (test with an over-draft transfer).
- [ ]  Accounts stored in a dict `acc_no -> name/balance`; account numbers auto-increment.
- [ ]  Save accounts to `accounts.json` on change and load at startup (reuse the P2 pattern).
- [ ]  Menu: `1. Create Account` `2. Deposit` `3. Withdraw` `4. Transfer` `5. Balances` `6. Exit`.

**Sample Run**

```
1. Create Account  2. Deposit  3. Withdraw  4. Transfer  5. Balances  6. Exit
Choice: 4
From account: 1
To account: 2
Amount: 1000
Transfer failed: Insufficient funds in account 1 (balance 500.00)
Choice: 6
```

**Hint:** One pattern for all: `try: transfer(...) except BankError as e: print(f"Transfer failed: {e}")` — the `BankError` base class makes `except` clean.