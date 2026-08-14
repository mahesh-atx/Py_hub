# 📋 Phase 3 — Assignments

Five graded assignments for **Modules 9–12**. Each takes 3–5 hours.

**Constraints for this phase:**

- Every piece of logic must live in a **function** with a docstring and type hints.
- Standard library imports are allowed and expected: `math`, `random`, `datetime`, `os`, `sys`, `json`, `csv`, `functools`, `time`.
- **No classes** — those are Phase 4. Defining a custom `Exception` subclass is the one permitted exception, since exceptions require it.
- Work in a scratch directory. Clean up your test files.

> 💡 **Tip:** A function that both computes *and* prints is hard to test and impossible to reuse. Make functions **return** values and let one caller do the printing. You will feel the benefit in Assignment 13, where functions start calling each other.
>

---

## 📋 Assignment 10 — Function Library and Test Suite

**Builds on:** Q1–Q24

**Scenario.** Build the reusable utility module you will import for the rest of the phase, and prove every function works.

**Deliverable.** `utils.py` plus `test_utils.py`.

### Tasks

1. **Twelve utility functions**, each with a docstring stating what it takes, returns, and raises:
   - `is_prime(n)`, `factorial(n)`, `fibonacci(n)`, `gcd(a, b)`, `lcm(a, b)`
   - `reverse_number(n)`, `digit_sum(n)`, `is_palindrome(text)`
   - `celsius_to_fahrenheit(c)`, `safe_divide(a, b)`
   - `word_count(text)`, `clean_text(text)`

2. **Type hints everywhere**, including return types. Run `python -m mypy utils.py` if available; if not, verify by reading.

3. **Recursive and iterative versions** of `factorial` and `fibonacci`. Time both at n = 30 and report the ratio. The recursive Fibonacci should be dramatically slower — explain why in a comment.

4. **Memoisation.** Add a memoised Fibonacci using a dictionary default argument, then a second version using `functools.lru_cache`. Time `fib(35)` for all three approaches and tabulate.

5. **`*args` and `**kwargs`.** Write `summarise(*numbers, **options)` where options control rounding, whether to include the median, and the output format. Demonstrate five different call signatures.

6. **A closure.** Write `make_multiplier(n)` returning a function. Build `double` and `triple` from it and explain in a comment what the returned function remembers.

7. **A function taking a function.** Write `apply_n_times(func, value, n)` and `time_it(func, *args)` — the latter returning both the result and the elapsed seconds.

8. **The mutable default trap.** Write `add_item(item, cart=[])`, call it three times, and show the list persisting. Then write the corrected version. **Explain the mechanism in a comment**, not just the fix.

9. **A test file** with at least 25 assertions covering happy paths, edge cases (0, 1, negatives, empty strings) and error cases. Every `raise` in your library must be triggered by at least one test.

### Marking guide

| Criterion | Weight |
| --- | --- |
| All twelve functions with docstrings and hints | 25% |
| Recursive vs iterative timing measured | 15% |
| Three memoisation approaches compared | 15% |
| `*args`/`**kwargs` demonstrated five ways | 10% |
| Mutable default trap shown and explained | 15% |
| 25+ assertions including every error path | 20% |

### Self-check

Run your test file twice in the same session. If any test fails on the second run, you have shared mutable state between tests — which is the same bug as task 8, now in your own test code.

---

## 📋 Assignment 11 — File Processing Pipeline

**Builds on:** Q35–Q46

**Scenario.** Read, transform and write across three formats, handling every failure the filesystem can produce.

**Deliverable.** `pipeline.py` plus generated data files.

### Tasks

1. **Generate test data.** Write a function creating a CSV of 200 sales records with `random.seed(42)` for reproducibility. Columns: date, region, product, units, unit_price. Report the file size in bytes.

2. **Read it three ways** — `csv.reader`, `csv.DictReader`, and manual `split(",")`. Time each. Explain in a comment which breaks first and why (hint: a comma inside a quoted field).

3. **File statistics.** Write `file_stats(path)` returning a dictionary of lines, words, characters and bytes. Verify against the OS where you can.

4. **Search.** Write `find_in_file(path, term)` returning `(line_number, line_text)` tuples, case-insensitively.

5. **Transform and write.** Filter to one region, add a computed `revenue` column, and write to a new CSV. Report rows read versus rows written.

6. **JSON round trip.** Convert the CSV to a nested JSON structure grouped by region. Write it with `indent=2`, read it back, and assert the loaded object equals the original.

7. **JSON update.** Load the config, change a nested value, add a key, delete another, write it back. Print the before and after.

8. **A log analyser.** Generate a log file with lines like `2025-03-15 10:23:45 ERROR Database connection failed`. Report total entries, counts by level, all error messages, and the busiest hour.

9. **`seek()` and `tell()`.** Read the first 20 characters, report the position, seek back to 0, and confirm you read the same bytes. Then read the last 100 bytes of a file without loading the whole thing.

10. **Handle every filesystem failure:** file missing, directory missing, empty file, permission denied, and a malformed row mid-file. Each must produce a specific message and let the program continue.

### Marking guide

| Criterion | Weight |
| --- | --- |
| Reproducible data generation | 10% |
| Three read methods compared, quoted-field issue identified | 15% |
| CSV → JSON round trip asserts equality | 20% |
| Log analyser produces all four reports | 20% |
| `seek`/`tell` used correctly | 10% |
| Five failure modes each handled specifically | 25% |

### Self-check

Put a comma inside a quoted product name, like `"Widget, Large"`. Your `split(",")` version must break and your `csv.reader` version must not. If both work, your test data is not exercising the problem.

---

## 📋 Assignment 12 — Robust Error Handling

**Builds on:** Q47–Q56

**Scenario.** Take working code and make it unbreakable. This assignment is about the paths your program takes when things go wrong.

**Deliverable.** `robust.py` plus an error-handling report.

### Tasks

1. **Safe input functions.** `get_int(prompt, min_val, max_val)`, `get_float(...)`, `get_choice(prompt, options)`, and `get_yes_no(prompt)`. Each loops until valid, catching `ValueError`, and each handles `KeyboardInterrupt` gracefully.

2. **All four blocks.** Write one function using `try`, `except`, `else` and `finally` with a print in each, then call it once succeeding and once failing. Record the execution order for both:

   ```
   success: try -> else -> finally
   failure: try -> except -> finally
   ```

3. **Specific exceptions.** Write a file-reading function catching `FileNotFoundError`, `PermissionError`, `IsADirectoryError`, `UnicodeDecodeError` and `ValueError` separately, each with a distinct message.

4. **Why bare `except` is wrong.** Write a function with `except:` that accidentally swallows a typo in your own code. Show that fixing it to `except ValueError:` surfaces the real bug. This is the most valuable task in the assignment.

5. **Three custom exceptions:** `ValidationError`, `InsufficientFundsError` (with `requested` and `available` attributes), and `ConfigurationError`. Raise and catch each, and print the shortfall from the second.

6. **Exception chaining.** Catch a low-level `ValueError` and re-raise a `ConfigurationError` using `raise ... from err`. Print the full traceback and confirm both exceptions appear.

7. **A retry decorator-style function.** `retry(func, attempts=3, delay=0.1)` that retries on exception, prints the attempt number, and re-raises the last failure. Test with a function that fails randomly using `random.seed`.

8. **Assertions vs exceptions.** Write a function using `assert` for an internal invariant and `raise` for user input. Then run with `python -O` and show the assertion disappearing. Explain why assertions must never validate user input.

9. **A resilient processor.** `process_file(path)` returning `{"success": bool, "data": ..., "error": str}` instead of raising. Test it against: a missing file, an empty file, a directory, a binary file, and a file with one malformed row.

10. **Report.** For each of the ten failures you handled, state: what raised it, what the user sees, and whether the program continues or exits.

### Marking guide

| Criterion | Weight |
| --- | --- |
| Four safe input functions | 15% |
| Execution order recorded for both paths | 10% |
| Five exception types caught separately | 15% |
| Bare `except` swallowing a real bug demonstrated | 20% |
| Three custom exceptions with attributes | 15% |
| `process_file` survives all five bad inputs | 25% |

### Self-check

Point `process_file` at a directory rather than a file. On Linux this raises `IsADirectoryError`, on Windows `PermissionError`. If your code only handles one, it is not portable — catch both.

---

## 📋 Assignment 13 — Expense Tracker with Persistence

**Builds on:** Q57, Q60

**Scenario.** The full version of practice Q60 — a complete application that survives restarts.

**Deliverable.** `expense_tracker.py` plus `expenses.json`.

### Tasks

1. **Data layer.** Expenses as a list of dictionaries in `expenses.json`, each with `id`, `date`, `category`, `amount`, `note`. Write `load_expenses(path)` returning an empty list if the file is missing, and `save_expenses(expenses, path)` writing with `indent=2`.

2. **`add_expense(...)`.** Validate the date with `datetime.strptime` and a defined format, require a positive amount, restrict the category to a defined set, and auto-assign the next id. Raise `ValidationError` with a specific message on each failure.

3. **`delete_expense(expense_id)`** raising a custom `NotFoundError` when the id does not exist.

4. **`filter_expenses(expenses, **criteria)`** — flexible filtering by category, date range, amount range and a note substring, using `**kwargs`. Demonstrate four different filter combinations.

5. **`summary_by_category(expenses)`** returning totals and percentages, sorted by total descending.

6. **`monthly_report(expenses, year, month)`** with total, daily average, the largest single expense, category breakdown, and comparison against the previous month.

7. **CSV export and import.** `export_csv(path)` and `import_csv(path)` which validates every row, imports the good ones, and reports the failures with row numbers and reasons.

8. **A menu loop** that never crashes whatever the user types. Every function call wrapped, every custom exception caught and displayed as a readable message.

9. **A `--demo` flag** via `sys.argv` loading 20 sample expenses so a reviewer can test in seconds without typing.

10. **The persistence test.** Run the program, add expenses, exit. Restart. **The data must still be there.** Document this test in your report — it is the one that matters.

### Marking guide

| Criterion | Weight |
| --- | --- |
| Every function has a docstring and type hints | 10% |
| Validation raises specific custom exceptions | 20% |
| `**kwargs` filtering demonstrated four ways | 15% |
| Monthly report with previous-month comparison | 15% |
| CSV import reports failures with row numbers | 15% |
| Menu never crashes on any input | 15% |
| Data survives a restart | 10% |

### Self-check

Delete `expenses.json` while the program is running, then add an expense. It must recreate the file rather than crashing. Then corrupt the JSON by hand — insert a stray `}` — and restart. The program must report the corruption clearly and start fresh, not raise a raw `JSONDecodeError` at the user.

---

## 📋 Assignment 14 — Data Analysis CLI

**Builds on:** Q58, Q59, and everything above

**Scenario.** A command-line tool that ingests a CSV and produces a report. This is the closest Phase 3 gets to real data work.

**Deliverable.** `analyse.py` runnable as `python analyse.py data.csv --report`.

### Tasks

1. **Generate the dataset.** 500 sales rows with `random.seed(42)`, including deliberate problems: 15 rows with a missing amount, 8 with an invalid date, and 5 exact duplicates. Report exactly how many of each you injected.

2. **Argument parsing** with `sys.argv` (not `argparse`, so you handle it yourself): a required file path, plus `--report`, `--category X`, `--month YYYY-MM`, `--export out.csv` and `--help`. Print usage and `sys.exit(1)` on bad arguments.

3. **Loading with a validation report.** `load_data(path)` returning `(good_rows, problems)` where problems lists row number and reason. Your counts must match what you injected in task 1.

4. **Cleaning functions**, each separate and testable: `parse_date`, `parse_amount`, `normalise_category`, `remove_duplicates`. Each returns the cleaned value or `None`, never raises.

5. **Analysis functions:** total, mean, median, mode, standard deviation, min, max — all computed by hand, then verified against the `statistics` module. Report any discrepancy and explain it.

   Note from Phase 1: `statistics.stdev([85,92,78,90,85])` is **5.431390245600108** — the *sample* standard deviation. Confirm you know which one you computed.

6. **Grouping.** By category, by month, and by category-within-month. Each returning a dictionary of aggregates.

7. **A text report** written to a file: header, record counts (read/valid/rejected), summary statistics, top 5 categories with percentages, monthly trend, and a footer listing every data quality problem found.

8. **An ASCII bar chart** of monthly totals, scaled so the largest month gets 50 characters.

9. **Full error handling.** Missing file, empty file, header-only file, wrong column names, and a file that is not CSV at all. Each with a specific message and exit code.

10. **A timing summary** using `time.perf_counter`: how long loading, cleaning and analysis each took.

### Marking guide

| Criterion | Weight |
| --- | --- |
| Injected problems match the validation report | 15% |
| Argument parsing with `--help` and exit codes | 15% |
| Cleaning functions return `None` rather than raising | 15% |
| Hand-computed statistics verified against `statistics` | 20% |
| Text report complete with the data quality footer | 20% |
| Five file-level failures handled with exit codes | 15% |

### Self-check

Run `python analyse.py` with no arguments. You must get usage text and exit code 1, not a traceback. Then check with `echo $?` — an exit code of 0 after an error is a bug that breaks any script calling yours.

---

## Grading yourself

1. **Functions return, callers print.** If you find yourself unable to test a function because it only prints, that is the design lesson landing.
2. **Every `raise` needs a test.** Assignment 10 requires it explicitly, and it is worth doing in all five.
3. **The persistence test is binary.** Assignment 13 either survives a restart or it does not.

> ⚠️ Two traps will cost you the most time in this phase. **The mutable default argument** (Assignment 10, task 8) produces wrong results silently, with no error — and it is genuinely surprising the first time. And **bare `except:`** catches everything including your own typos, turning a five-second bug hunt into an hour. Assignment 12 makes you produce both on purpose so you recognise them later.
>

---

[← Phase 3 index](README.md) · [Practice Questions](practice-questions.md)
