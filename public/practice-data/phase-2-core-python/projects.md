# 🚀 Practice Projects for Phase 2

Projects for **Modules 5–8**: strings, lists, tuples, sets and dictionaries.

**Rules for this set:**

- Use the Phase 2 toolkit — strings with slicing and methods, lists, tuples, sets, dictionaries, `for`/`while` loops and comprehensions.
- **No functions `def` and no file/JSON usage** — save those for Phase 3. These projects are about choosing the right data structure.
- Every menu must survive bad input without crashing.

---

## P1. Contact Book

**Difficulty:** Easy
**Learning Objective:** Store and manage structured data in a dictionary — the most used Python data structure in real projects.

**Scenario.** A contact manager that keeps names and phone numbers in a dictionary. The user can add a contact, look one up, see all contacts sorted by name, and delete one.

**Requirements**

- [ ]  Menu: `1. Add` `2. Search` `3. List All` `4. Delete` `5. Exit`.
- [ ]  Phone numbers are stored as strings; reject an add with a non-digit number (empty or with letters).
- [ ]  Adding an existing name updates the number (dicts overwrite naturally).
- [ ]  `Search` prints `No contact found for "<name>"` when the key is missing — don't crash.
- [ ]  `List All` prints contacts alphabetically, one per line: `Riya: 9123456789`.
- [ ]  `Delete` removes the entry if present, else prints a friendly message.

**Sample Run**

```
1. Add  2. Search  3. List All  4. Delete  5. Exit
Choice: 1
Name: riya
Phone: 9123456789
Added riya -> 9123456789
Choice: 3
riya: 9123456789
Choice: 5
Bye!
```

**Hint:** The phone is a key decision: store it as a string, then validate with `isinstance()` or by checking `.isdigit()`.

---

## P2. Quiz App

**Difficulty:** Medium
**Learning Objective:** Model questions and answers with a list of tuples/dicts and iterate cleanly.

**Scenario.** A quiz that stores questions, options, and correct answers in a list of dictionaries. It shuffles nothing (no sets yet for difficulty) but asks each question in order, shows 4 options, and reports a final score with a verdict.

**Requirements**

- [ ]  Build the question bank as a list of dictionaries:
      `{"q": "...", "options": [...], "answer": "b"}`
- [ ]  Present options with letters `a)` `b)` `c)` `d)`.
- [ ]  Accept answers case-insensitively; on a wrong answer print the correct one.
- [ ]  Score out of 10 at the end, then a verdict: 80%+ `Excellent`, 50%+ `Good`, else `Keep practicing`.
- [ ]  Handle invalid letters by asking again for the same question (don't count as answered).

**Sample Run**

```
Q1. Which data structure is mutable and ordered?
   a) tuple   b) list   c) set   d) dict
Your answer: b
Correct!
...
You scored 8/10
Verdict: Good
```

**Hint:** Loop with `enumerate(questions, 1)`, and use a `while True:` for the answer retry. The `options` list indexes `0..3` map to letters `a..d`.

---

## P3. Word Counter

**Difficulty:** Medium
**Learning Objective:** Use dictionaries for frequency counting — the foundational pattern behind most analytics code.

**Scenario.** The user types a sentence; the program counts how many times each word appears and prints the results sorted by frequency (most frequent first), then repeats with a new sentence.

**Requirements**

- [ ]  Count words case-insensitively (`The` and `the` are the same word).
- [ ]  Strip punctuation: trailing `.`, `,`, `!`, `?` must not be part of a word.
- [ ]  Print `word -> count` sorted by count descending, ties broken alphabetically.
- [ ]  Empty input prints `No words to count.` and asks again.
- [ ]  After printing, ask `Count another sentence? (y/n)` and loop.

**Sample Run**

```
Enter a sentence: the cat and the dog and the bird
the -> 3
and -> 2
bird -> 1
cat -> 1
dog -> 1
Count another sentence? (y/n): n
```

**Hint:** `word.strip(".,!?")` cleans a token; `counts.get(word, 0) + 1` avoids a missing-key crash. Sort with `sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))`.

---

## P4. Palindrome Checker

**Difficulty:** Easy
**Learning Objective:** Master the string toolkit — slicing, casing, and cleaning input.

**Scenario.** A tool that tells the user whether a phrase is a palindrome: it reads the same forwards and backwards. Classic input to handle: `A man, a plan, a canal: Panama`.

**Requirements**

- [ ]  Normalize the input: lowercase it and remove **everything** that is not a letter (punctuation and spaces).
- [ ]  Check with slicing `[::-1]` and print `"<clean>" is a palindrome` or `is not a palindrome`.
- [ ]  **Bonus (not required):** reuse step 1 inside a loop to check multiple phrases until the user enters `quit`.
- [ ]  Empty input after cleaning prints `Nothing to check.`.

**Sample Run**

```
Enter a phrase: A man, a plan, a canal: Panama
"amanaplanacanalpanama" is a palindrome.
```

**Hint:** `phrase.isalpha()` is True only for letters — a comprehension `"".join(ch for ch in phrase if ch.isalpha())` cleans the phrase in one line.

---

## P5. To-Do List

**Difficulty:** Medium
**Learning Objective:** Experience the classic bug of sharing a mutable list — and the fix: work on copies.

**Scenario.** A task manager with a menu: add a task, list tasks, mark a task done, remove a task, and exit. Tasks are stored as a list of strings, done-status as a parallel list of booleans (or, if you are comfortable, a list of dictionaries).

**Requirements**

- [ ]  Menu: `1. Add` `2. List` `3. Mark Done` `4. Remove` `5. Exit`.
- [ ]  Adding an empty task prints `Task cannot be empty.`
- [ ]  `List` prints numbered tasks with a checkbox: `1. [ ] buy milk`, `2. [x] pay rent`.
- [ ]  `Mark Done` and `Remove` take a number; out-of-range numbers print a clear error, not a crash.
- [ ]  After marking done, print `Task 2 marked as done.`

**Sample Run**

```
1. Add  2. List  3. Mark Done  4. Remove  5. Exit
Choice: 1
Task: buy milk
Added: buy milk
Choice: 3
Task number: 1
Task 1 marked as done.
Choice: 2
1. [x] buy milk
```

**Hint:** Store a list of strings plus a list of booleans in sync, or a single list of dicts `{"task": ..., "done": ...}`. For `Mark Done`, index with `n - 1`.

---

## P6. Duplicate Remover

**Difficulty:** Easy
**Learning Objective:** Use sets for uniqueness and understand order-preserving deduplication.

**Scenario.** The user types a line of numbers separated by spaces; the program prints the unique numbers in the order they first appeared, then counts how many were duplicates removed.

**Requirements**

- [  ]  Parse the input with `.split()` and filter to integers — ignore tokens that aren't digits.
- [ ]  Deduplicate **preserving first-seen order** (a plain `set()` alone loses order).
- [  ]  Print `Unique numbers: 3 7 2 9` and `Removed 2 duplicates.`
- [  ]  Show the sorted unique values too: `Sorted: 2 3 7 9`.
- [  ]  Empty input prints `Nothing to deduplicate.`

**Sample Run**

```
Enter numbers: 3 7 3 2 9 7 3
Unique numbers: 3 7 2 9
Sorted: 2 3 7 9
Removed 2 duplicates.
```

**Hint:** Keep a `seen = set()` and only append to a list when `n not in seen`.

---

## P7. Inventory System

**Difficulty:** Hard
**Learning Objective:** Build a data-heavy program where dictionaries of dictionaries model real-world relationships.

**Scenario.** A shopkeeper's inventory. Items map to `{"price": ..., "stock": ...}`. The system supports adding items, restocking, selling (which checks stock), printing a low-stock report, and showing total inventory value.

**Requirements**

- [ ]  Menu: `1. Add Item` `2. Restock` `3. Sell` `4. Low Stock Report` `5. Total Value` `6. Exit`.
- [ ]  Add Item takes a name, price, and starting stock; overwriting an existing item prints a warning.
- [ ]  Selling more than stock prints `Not enough stock for "pen" (3 in stock).`
- [ ]  Selling below 1 unit prints `Amount must be positive.`
- [ ]  Low Stock Report lists every item with stock below 5, else `All items are well stocked.`
- [ ]  Total Value sums `stock * price` for every item, printed with 2 decimals.

**Sample Run**

```
1. Add Item  2. Restock  3. Sell  4. Low Stock Report  5. Total Value  6. Exit
Choice: 1
Item: pen
Price: 10
Stock: 3
Added pen at $10.00 x 3
Choice: 4
LOW STOCK: pen (3)
Choice: 6
```

**Hint:** Model each item as `inventory[name] = {"price": price, "stock": stock}`. Validate price and stock are positive before inserting.

---

## P8. Number Frequency Counter

**Difficulty:** Easy
**Learning Objective:** Count frequencies with a dictionary and format ranked output.

**Scenario.** The user enters any count of numbers, one per line, ending with `done`. The program prints each number with how many times it appeared, most frequent first.

**Requirements**

- [ ]  Read numbers until the user types `done` (any non-number token ends the session too, with a message).
- [ ]  Count frequency in a dictionary.
- [  ]  Print `NUMBER: count` lines sorted by count descending, ties by value ascending.
- [  ]  Also print the mode — the number with the highest count (if a tie, the smaller number).
- [  ]  Print how many distinct numbers were entered.

**Sample Run**

```
Enter numbers (type 'done' to finish): 4
Enter numbers (type 'done' to finish): 7
Enter numbers (type 'done' to finish): 4
Enter numbers (type 'done' to finish): done
4: 2
7: 1
4 distinct numbers
Mode: 4
```

**Hint:** `counts.get(n, 0) + 1` then `max(counts.items(), key=lambda kv: (kv[1], -kv[0]))` picks the mode with tie-break by smaller value.