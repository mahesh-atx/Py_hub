# 📋 Phase 2 — Assignments

Five graded assignments for **Modules 5–8**. Each takes 2–4 hours.

**Constraints for this phase:**

- Use strings, lists, tuples, sets, dictionaries and comprehensions freely.
- **No user-defined functions and no imports.** Those arrive in Phase 3 — write everything at top level.
- Where an assignment says *"without using `X`"*, that restriction is the exercise.

> 💡 **Tip:** After finishing each assignment, reread it and ask: *where did I use a loop where a dictionary would have been clearer?* Recognising when a dict replaces a search loop is the single most useful instinct this phase can give you.
>

---

## 📋 Assignment 5 — Text Analysis Engine

**Builds on:** Q1–Q12, Q36, Q56

**Scenario.** Paste in any paragraph and produce a full linguistic report.

### Tasks

1. **Take a multi-line paragraph** as input (or hard-code one of at least 150 words).

2. **Basic counts:** characters with and without spaces, words, sentences, and paragraphs.

3. **Cleaning.** Build a normalised word list: lowercase, punctuation stripped, empty strings removed. Show the count before and after cleaning.

4. **Frequency analysis** with a dictionary. Print the top 10 words sorted by count descending, then alphabetically for ties.

5. **Stopword filtering.** Remove `the, a, an, is, of, and, to, in, for, on, with, that, it, as`. Report the top 10 again and note how different the two lists are.

6. **Character statistics:** vowels, consonants, digits, spaces and punctuation. Then the frequency of each letter, printed as a bar chart of `#` characters scaled so the most common letter gets 40 marks.

7. **Word length distribution** as a dictionary of length → count, printed in order.

8. **Palindrome detection.** Find every palindromic word of 3+ letters. Then test whether the whole paragraph is a palindrome ignoring case, spaces and punctuation.

9. **Readability.** Average word length, average sentence length in words, and the longest and shortest sentence.

10. **Hapax legomena** — words appearing exactly once. Report the count and the first ten.

### Marking guide

| Criterion | Weight |
| --- | --- |
| All basic counts correct | 15% |
| Cleaning handles punctuation and case | 15% |
| Frequency sorted by count then alphabetically | 20% |
| Stopword comparison shown both ways | 15% |
| Bar chart scaled correctly | 15% |
| Readability and hapax statistics | 20% |

### Self-check

Your word count before and after cleaning should differ only by empty strings. If cleaning removes 20% of your words, your punctuation stripping is eating real characters — probably apostrophes in contractions.

---

## 📋 Assignment 6 — Sorting and Searching Laboratory

**Builds on:** Q13–Q24

**Scenario.** Implement the algorithms yourself, measure them, and prove your versions match Python's built-ins.

### Tasks

1. **Generate test data** — a list of 200 numbers using a nested comprehension or a repeatable arithmetic pattern (no `random`, since imports are not allowed yet).

2. **Implement four sorts by hand:** bubble, selection, insertion, and merge. For bubble sort, print the list after each complete pass on a 5-element example.

3. **Verify each** against `sorted()` using `==`. All four must match exactly.

4. **Count operations.** For each sort, count comparisons and swaps on the same 200-element list. Present as a table. Explain why the counts differ so much.

5. **Implement both searches** — linear and binary — returning the index or `-1`, and counting comparisons.

   Verify with the practice example: searching for `72` in `[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]` gives index **8**, in **9** comparisons linear and **2** binary.

6. **Search on unsorted data.** Run binary search on an unsorted list and show it returns a wrong answer *without erroring*. This is the silent failure that matters.

7. **Statistics without built-ins.** Compute sum, mean, median, mode, min, max, range and standard deviation by hand. Verify each against the built-in equivalent where one exists.

8. **Second largest and second smallest** without sorting the list. Handle the case where all elements are identical.

9. **Merge two sorted lists** into one sorted list without using `sorted()` — the two-pointer walk.

### Marking guide

| Criterion | Weight |
| --- | --- |
| All four sorts match `sorted()` | 25% |
| Operation counts tabulated and explained | 15% |
| Both searches with correct comparison counts | 20% |
| Binary search on unsorted data shown to fail silently | 15% |
| Statistics verified against built-ins | 15% |
| Second largest handles all-identical input | 10% |

### Self-check

Run all four sorts on an already-sorted list and on a reverse-sorted list. Insertion sort should be dramatically faster on the first and slowest on the second. If your counts do not show that, your inner loop is not breaking early.

---

## 📋 Assignment 7 — Student Grade Management System

**Builds on:** Q57

**Scenario.** The full version of practice Q57 — a nested-dictionary database with a complete menu.

### Tasks

1. **The data structure:** `{name: {"marks": {subject: score}, "percentage": float, "grade": str}}`. Design it before writing any code and document your choice in a comment.

2. **Menu with seven options:** add student, view one, view all, update a mark, delete, class statistics, exit.

3. **Add student.** Name plus marks in five subjects. Reject duplicate names. Validate each mark is 0–100, re-asking on failure. Compute and store percentage and grade on entry.

4. **View all** as a table sorted by percentage descending, with rank, name, total, percentage, grade and result. Columns must align.

5. **Update marks.** Select a student and a subject, change the score, and recompute the derived fields. Show the before and after percentage.

6. **Delete** with a confirmation prompt.

7. **Class statistics:** class average, topper, lowest, pass/fail counts, subject-wise averages, the hardest subject (lowest average), and a grade distribution as a dictionary.

8. **Search.** Partial name matching — typing `ro` finds both `Rohan` and `Rohit`. Case-insensitive.

9. **Handle every error:** student not found, empty database, invalid menu choice, invalid marks, deleting the last student.

### Marking guide

| Criterion | Weight |
| --- | --- |
| Nested structure designed and documented first | 10% |
| All seven menu options work | 25% |
| Table sorted and aligned | 15% |
| Update recomputes derived fields | 15% |
| All seven statistics correct | 20% |
| Partial search and error handling | 15% |

### Self-check

Delete every student, then choose "class statistics". If you get a `ZeroDivisionError`, the empty-database case is unhandled — and an empty database is the state your program starts in.

---

## 📋 Assignment 8 — Contact Book with Search

**Builds on:** Q58

**Scenario.** A contact manager exercising nested dictionaries, sets and string methods together.

### Tasks

1. **Structure:** `{name: {"phone": str, "email": str, "city": str, "tags": set}}`. Tags as a **set** — this is what makes tag operations clean.

2. **Add a contact.** Reject duplicate names. Validate: phone is exactly 10 digits after stripping `+91`, spaces and hyphens; email contains `@` and a `.` after the `@`.

3. **Partial name search**, case-insensitive, matching anywhere in the name. Report the match count.

4. **Search by city** and **search by tag**, each listing all matches.

5. **Set operations on tags.** Given two tags, find contacts having both (intersection), either (union), and one but not the other (difference). This is the assignment's core exercise.

6. **Update** any single field, including adding or removing a tag.

7. **Delete** with confirmation.

8. **List all**, sorted alphabetically, in an aligned table.

9. **Statistics:** total contacts, contacts per city as a dictionary, all unique tags as a set, the most common tag, and any contacts with no tags.

10. **Bulk import.** Accept a multi-line string of `name,phone,email,city,tags` records, parse it, validate each row, and report how many were imported and how many rejected with reasons.

### Marking guide

| Criterion | Weight |
| --- | --- |
| Phone and email validation both work | 15% |
| Partial search matches anywhere, case-insensitively | 15% |
| All three tag set operations correct | 25% |
| Update handles adding and removing tags | 15% |
| Statistics including most common tag | 15% |
| Bulk import reports rejections with reasons | 15% |

### Self-check

Add a contact with phone `+91 98765 43210` and another with `09876543210`. Both must normalise to the same 10 digits — and your duplicate check should then be able to spot that they might be the same person.

---

## 📋 Assignment 9 — Data Structure Conversion Toolkit

**Builds on:** Q25–Q34, Q47–Q56

**Scenario.** Move data between every structure and learn what each conversion costs you.

### Tasks

1. **Build one dataset five ways.** The same 10 employee records as: a list of lists, a list of tuples, a list of dictionaries, a dictionary of dictionaries, and a dictionary of lists.

2. **Write conversions** between all five. Verify each round-trip returns the original data.

3. **The comparison table.** For each structure rate: lookup by ID, iteration, adding a record, deleting a record, sorting, memory intuition, and readability. Then state which you would choose for: a lookup table, a CSV export, and a record you must frequently update.

4. **Demonstrate what conversion destroys.** Convert a list with duplicates to a set and back — show the count dropping and the order changing. Convert a dictionary to a list of values — show the keys disappearing.

5. **Three ways to deduplicate**, from Q31. Report which preserve order:
   - `set()` — order lost
   - loop with a seen-check — order kept
   - `dict.fromkeys()` — order kept

6. **Nested access.** Given the dictionary-of-dictionaries, write safe access using `.get()` with defaults so a missing key never raises. Demonstrate with a key that does not exist.

7. **Invert a dictionary** two ways: the naive swap that loses data on duplicate values, and the safe version mapping each value to a list of keys. Show a case where the naive version silently drops a record.

8. **Group and aggregate.** From the list of dictionaries, build: a dictionary of department → list of names, department → average salary, and city → count. Use comprehensions where they are clearer than loops.

9. **Sort the same data four ways:** by one key, by two keys, descending, and by a computed value. Use `sorted()` with `lambda`.

10. **Frozenset as a key.** Build a dictionary mapping frozensets of skills to job titles, look one up, and show that a plain `set` raises `TypeError: unhashable type: 'set'`.

### Marking guide

| Criterion | Weight |
| --- | --- |
| All five structures built and inter-converted | 20% |
| Round-trips verified | 10% |
| Comparison table with three recommendations | 15% |
| Data loss demonstrated concretely | 15% |
| Naive vs safe dictionary inversion | 15% |
| Grouping and multi-key sorting | 15% |
| Frozenset key with the TypeError shown | 10% |

### Self-check

Convert your list of dictionaries to a dictionary keyed by employee name, then back. If your original list had two employees with the same name, one has now vanished — and that is exactly the bug this assignment exists to make visible.

---

## Grading yourself

1. **Verify against the built-in.** Every algorithm you implement by hand has a `sorted()`, `max()` or `sum()` equivalent. Agreement is your test.
2. **Test the degenerate cases** — empty list, one element, all identical, all duplicates. Assignments 6 and 9 both break loudly there if you skip them.
3. **Reread for loops that should be dicts.** That review pass is where the learning consolidates.

> ⚠️ The mistake that will cost you the most time in this phase is **mutating a list while iterating over it**. Removing items inside a `for` loop silently skips elements — no error, wrong result. Assignments 6, 8 and 9 all give you the opportunity. When you need to filter, build a new list with a comprehension.
>

---

[← Phase 2 index](README.md) · [Practice Questions](practice-questions.md)
