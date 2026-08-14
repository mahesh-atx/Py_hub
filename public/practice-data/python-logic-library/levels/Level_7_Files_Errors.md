# Level 7 — Files + Errors (30 Questions)

**What this level teaches:** reading and writing text files, working with lines, CSV files, storing program data, and handling errors with `try/except` so your programs don't crash.

**Total questions:** 30

> Files keep data after the program ends. Errors are handled, not feared. Write your own code first, then check the solution.

---

## Question 1: Write text to a file

**What to do:** Write the line "Hello, Python!" to a file named `message.txt`, then open it and print its content.

**Hint:** Open with `"w"` to write (it overwrites any old content), and `"r"` to read.

**Solution:**

```python
with open("message.txt", "w") as file:
    file.write("Hello, Python!")

with open("message.txt", "r") as file:
    print(file.read())
```

**Logic:** `with open(...)` automatically closes the file for you — always use it.

---

## Question 2: Read an entire file

**What to do:** Given a file `sample.txt` (create it first with a few lines), read and print its *entire* content at once.

**Hint:** `file.read()` returns the whole file as one string.

**Solution:**

```python
# First create the file:
with open("sample.txt", "w") as file:
    file.write("First line\nSecond line\nThird line")

# Now read it all at once:
with open("sample.txt", "r") as file:
    content = file.read()

print(content)
```

**Logic:** `read()` grabs everything in one go — good for small files.

---

## Question 3: Read a file line by line

**What to do:** Read `sample.txt` and print each line separately with its line number.

**Hint:** Loop over the file object directly, and keep a counter for the line number.

**Solution:**

```python
with open("sample.txt", "r") as file:
    line_number = 1
    for line in file:
        print(str(line_number) + ": " + line.strip())
        line_number += 1
```

**Logic:** A file object is iterable — each loop pass gives one line. `.strip()` removes the trailing newline.

---

## Question 4: Count the lines in a file

**What to do:** Count how many lines `sample.txt` has and print the number.

**Hint:** Loop over the lines and count, or use `len(file.readlines())`.

**Solution:**

```python
count = 0
with open("sample.txt", "r") as file:
    for line in file:
        count += 1

print("Lines:", count)
```

**Logic:** The counting pattern applied to file lines.

---

## Question 5: Count the words in a file

**What to do:** Count all the words in `sample.txt` and print the total.

**Hint:** For each line, `line.split()` gives the words — add their count to a total.

**Solution:**

```python
total_words = 0
with open("sample.txt", "r") as file:
    for line in file:
        total_words += len(line.split())

print("Words:", total_words)
```

**Logic:** Words per line, summed across all lines.

---

## Question 6: Count the characters in a file

**What to do:** Count the total characters (including spaces, excluding newlines) in `sample.txt`.

**Hint:** Sum `len(line.strip())` for every line — or `len(file.read())`.

**Solution:**

```python
total_chars = 0
with open("sample.txt", "r") as file:
    for line in file:
        total_chars += len(line.strip())

print("Characters:", total_chars)
```

**Logic:** `.strip()` removes the newline before counting, so it isn't included.

---

## Question 7: Append text to a file

**What to do:** Add the line "New line added" to the *end* of `sample.txt` without deleting the existing content, then print the file.

**Hint:** Open with mode `"a"` (append) instead of `"w"` (write).

**Solution:**

```python
with open("sample.txt", "a") as file:
    file.write("\nNew line added")

with open("sample.txt", "r") as file:
    print(file.read())
```

**Logic:** `"a"` puts the cursor at the end; `"w"` wipes the file first. Choose carefully!

---

## Question 8: Copy a file

**What to do:** Copy the contents of `sample.txt` into a new file called `sample_copy.txt`, then print the copy to verify.

**Hint:** Read from one file and write to another in the same program.

**Solution:**

```python
with open("sample.txt", "r") as source:
    content = source.read()

with open("sample_copy.txt", "w") as target:
    target.write(content)

with open("sample_copy.txt", "r") as file:
    print(file.read())
```

**Logic:** Read → store in memory → write elsewhere. That's all a copy is.

---

## Question 9: Check if a file exists

**What to do:** Check whether `sample.txt` exists and print "Exists" or "Missing" without crashing.

**Hint:** `import os` and use `os.path.exists("sample.txt")`.

**Solution:**

```python
import os

if os.path.exists("sample.txt"):
    print("Exists")
else:
    print("Missing")
```

**Logic:** `os.path.exists()` is the safe way to check before you try to read.

---

## Question 10: Print lines containing a keyword

**What to do:** Print every line of `sample.txt` that contains the word "Python".

**Hint:** Filter the lines with `if "Python" in line`.

**Solution:**

```python
with open("sample.txt", "r") as file:
    for line in file:
        if "Python" in line:
            print(line.strip())
```

**Logic:** The filter pattern applied to lines instead of list items.

---

## Question 11: Count occurrences of a word in a file

**What to do:** Count how many times the word "the" appears in `sample.txt`.

**Hint:** Split each line into words and count exact matches (or use `line.lower().split()` for case-insensitive counting).

**Solution:**

```python
count = 0
with open("sample.txt", "r") as file:
    for line in file:
        for word in line.lower().split():
            if word == "the":
                count += 1

print("Occurrences of 'the':", count)
```

**Logic:** A nested loop — lines on the outside, words on the inside.

---

## Question 12: Write a list of names to a file

**What to do:** Given `names = ["Rahul", "Priya", "Amit"]`, write each name on its own line in `names.txt`, then read and print it back.

**Hint:** Loop over the list and `file.write(name + "\n")`.

**Solution:**

```python
names = ["Rahul", "Priya", "Amit"]

with open("names.txt", "w") as file:
    for name in names:
        file.write(name + "\n")

with open("names.txt", "r") as file:
    for line in file:
        print(line.strip())
```

**Logic:** `\n` is the newline character — without it, everything lands on one line.

---

## Question 13: Read numbers from a file and find their sum

**What to do:** Create `numbers.txt` with the values 10, 20, 30, 40 (one per line), read them back, and print their sum.

**Hint:** `int(line.strip())` converts each line of text into a number.

**Solution:**

```python
# Create the file first:
with open("numbers.txt", "w") as file:
    file.write("10\n20\n30\n40")

total = 0
with open("numbers.txt", "r") as file:
    for line in file:
        total += int(line.strip())

print("Sum:", total)
```

**Logic:** Files store *text* — you must convert to numbers before doing math.

---

## Question 14: Largest and smallest from a numbers file

**What to do:** Read `numbers.txt` and print the largest and smallest value in it.

**Hint:** Collect the numbers into a list first, then use `max()` and `min()`.

**Solution:**

```python
numbers = []
with open("numbers.txt", "r") as file:
    for line in file:
        numbers.append(int(line.strip()))

print("Largest:", max(numbers))
print("Smallest:", min(numbers))
```

**Logic:** Read → collect → analyze. (Answer: 40 and 10)

---

## Question 15: Store program data — save a dictionary to a file

**What to do:** Save the dictionary `{"name": "Rahul", "age": 25, "city": "Beed"}` into `data.txt` in the format `key,value` per line, then read it back into a new dictionary.

**Hint:** Write `key + "," + str(value) + "\n"` for each item, and split on `","` when reading.

**Solution:**

```python
data = {"name": "Rahul", "age": 25, "city": "Beed"}

# Save:
with open("data.txt", "w") as file:
    for key, value in data.items():
        file.write(key + "," + str(value) + "\n")

# Load:
loaded = {}
with open("data.txt", "r") as file:
    for line in file:
        key, value = line.strip().split(",")
        loaded[key] = value

print(loaded)
```

**Logic:** This simple format (one record per line, fields split by a comma) is the core idea behind CSV files.

---

## Question 16: Write CSV rows with the csv module

**What to do:** Using the `csv` module, write a table of students (name, marks) to `students.csv`, then read it back and print each row.

**Hint:** `csv.writer(file)` and `writer.writerow([...])`.

**Solution:**

```python
import csv

rows = [
    ["Name", "Marks"],
    ["Rahul", "85"],
    ["Priya", "92"],
    ["Amit", "78"],
]

with open("students.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(rows)

with open("students.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

**Logic:** The `csv` module handles commas and quoting correctly — never invent your own CSV parser for real data.

---

## Question 17: Read a CSV file and do math with it

**What to do:** Read `students.csv` (skip the header row) and print the average marks.

**Hint:** `next(reader)` skips the first row; then convert `row[1]` to an integer.

**Solution:**

```python
import csv

total = 0
count = 0

with open("students.csv", "r") as file:
    reader = csv.reader(file)
    next(reader)  # skip the header row
    for row in reader:
        total += int(row[1])
        count += 1

print("Average marks:", total / count)
```

**Logic:** Files + CSV + the average pattern from Level 1, all together.

---

## Question 18: try/except — division by zero

**What to do:** Ask the user for a divisor and divide 100 by it — but don't crash if they enter 0. Print a friendly message instead.

**Hint:** Wrap the division in `try: ... except ZeroDivisionError: ...`.

**Solution:**

```python
try:
    divisor = float(input("Enter a divisor: "))
    print("100 /", divisor, "=", 100 / divisor)
except ZeroDivisionError:
    print("You cannot divide by zero!")
```

**Logic:** The `try` block runs until something breaks; the `except` block catches it.

---

## Question 19: try/except — invalid number input

**What to do:** Ask the user for a number and print its double — but if they type letters, show "That is not a number" instead of crashing.

**Hint:** Catch `ValueError` from `int(input(...))`.

**Solution:**

```python
try:
    number = int(input("Enter a number: "))
    print("Double:", number * 2)
except ValueError:
    print("That is not a number")
```

**Logic:** Converting text to numbers fails loudly with `ValueError` — catch it.

---

## Question 20: try/except — file not found

**What to do:** Try to read a file that doesn't exist (`missing.txt`) and print "File not found" instead of crashing.

**Hint:** Catch `FileNotFoundError`.

**Solution:**

```python
try:
    with open("missing.txt", "r") as file:
        print(file.read())
except FileNotFoundError:
    print("File not found")
```

**Logic:** Different problems raise different error types — you can catch exactly the one you expect.

---

## Question 21: Validate a positive number

**What to do:** Keep asking the user for a number until they enter a positive one (greater than 0), then print it.

**Hint:** A `while True` loop, `try/except` for `ValueError`, and a `break` when the value is valid.

**Solution:**

```python
while True:
    try:
        number = float(input("Enter a positive number: "))
        if number <= 0:
            print("Must be greater than 0. Try again.")
            continue
        break
    except ValueError:
        print("That is not a number. Try again.")

print("You entered:", number)
```

**Logic:** Validation = loop + try/except + a condition. `break` only happens when everything passes.

---

## Question 22: Validate an integer in a range

**What to do:** Ask for a number between 1 and 10 (both included) and refuse anything else — repeating until valid.

**Hint:** Same structure as Question 21, with a range check.

**Solution:**

```python
while True:
    try:
        number = int(input("Enter a number from 1 to 10: "))
        if 1 <= number <= 10:
            break
        print("Out of range. Try again.")
    except ValueError:
        print("That is not an integer. Try again.")

print("Valid:", number)
```

**Logic:** Chained comparison `1 <= number <= 10` tests both limits at once.

---

## Question 23: try/except/else

**What to do:** Read a number from the user and print its square. Use `else` to show "No errors occurred!" after a successful read.

**Hint:** The `else` block runs only when the `try` block finishes without any exception.

**Solution:**

```python
try:
    number = int(input("Enter a number: "))
except ValueError:
    print("That is not a number")
else:
    print("Square:", number * number)
    print("No errors occurred!")
```

**Logic:** `else` = "code that runs only on success" — it keeps the `try` block clean.

---

## Question 24: try/except/finally

**What to do:** Read a number and print its double. Use `finally` to always print "Done" — whether the input was valid or not.

**Hint:** `finally` runs no matter what happens.

**Solution:**

```python
try:
    number = int(input("Enter a number: "))
    print("Double:", number * 2)
except ValueError:
    print("That is not a number")
finally:
    print("Done")
```

**Logic:** `finally` is for cleanup that must always happen (closing files, printing status, etc.).

---

## Question 25: Catch multiple exceptions

**What to do:** Write a program that reads a number from the user and divides 100 by it. Handle `ValueError`, `ZeroDivisionError`, and catch *anything else* with a general `except Exception`.

**Hint:** Several `except` blocks in a row, from specific to general.

**Solution:**

```python
try:
    number = float(input("Enter a number: "))
    print("Result:", 100 / number)
except ValueError:
    print("That is not a number")
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print("Something else went wrong:", e)
```

**Logic:** Python checks the `except` blocks top to bottom — put specific errors first.

---

## Question 26: Retry loop for a whole operation

**What to do:** Build a program that keeps asking for two numbers and printing their sum until the user types "quit" — and never crashes on bad input.

**Hint:** Outer loop for the session, inner try/except for each entry.

**Solution:**

```python
while True:
    text = input("Enter a number (or 'quit' to stop): ")
    if text.lower() == "quit":
        print("Bye!")
        break
    try:
        number = float(text)
        print("Double:", number * 2)
    except ValueError:
        print("That is not a number. Try again.")
```

**Logic:** This "never-crash loop" structure is the backbone of every real interactive program.

---

## Question 27: A number logger program

**What to do:** Write a program that keeps asking for numbers and appends the *valid* ones to `log.txt` (one per line), ignoring invalid input, until the user types "quit". Then print the file.

**Hint:** Combine append mode, validation, and a quit loop — Levels 7's everything in one.

**Solution:**

```python
while True:
    text = input("Enter a number (or 'quit' to stop): ")
    if text.lower() == "quit":
        break
    try:
        number = float(text)
    except ValueError:
        print("Not a number, skipped.")
        continue
    try:
        with open("log.txt", "a") as file:
            file.write(str(number) + "\n")
        print("Saved.")
    except OSError:
        print("Could not write to file.")

try:
    with open("log.txt", "r") as file:
        print("Log contents:")
        print(file.read())
except FileNotFoundError:
    print("Nothing saved yet.")
```

**Logic:** Input validation, file appending, and error handling working together in one small tool. The final read is guarded too, in case the user quits without saving anything.

---

## Question 28: Save and load a to-do list

**What to do:** Given `todos = ["Buy milk", "Study Python"]`, save it to `todos.txt` (one item per line), then load it back into a list and print it.

**Hint:** Write with a loop and `"\n"`; read back with `line.strip()` and `append`.

**Solution:**

```python
todos = ["Buy milk", "Study Python"]

# Save:
with open("todos.txt", "w") as file:
    for task in todos:
        file.write(task + "\n")

# Load:
loaded = []
with open("todos.txt", "r") as file:
    for line in file:
        loaded.append(line.strip())

print(loaded)
```

**Logic:** Persistence — data survives after the program ends. Level 9 projects all build on this.

---

## Question 29: Count words in a file, ignoring common words

**What to do:** Count the words in `sample.txt`, but skip the stop words `{"the", "a", "an", "and", "of"}`. Print the total.

**Hint:** Check each word against a set of words to ignore.

**Solution:**

```python
stop_words = {"the", "a", "an", "and", "of"}

count = 0
with open("sample.txt", "r") as file:
    for line in file:
        for word in line.lower().split():
            if word not in stop_words:
                count += 1

print("Words (excluding stop words):", count)
```

**Logic:** Sets make exclusion checks fast and clean — a taste of real text processing.

---

## Question 30: Read a file safely with a fallback

**What to do:** Write a function `safe_read(filename)` that returns the file's content, or a friendly message if the file doesn't exist. Test it with both `sample.txt` and `missing.txt`.

**Hint:** Wrap the read in try/except *inside* the function.

**Solution:**

```python
def safe_read(filename):
    try:
        with open(filename, "r") as file:
            return file.read()
    except FileNotFoundError:
        return "File '" + filename + "' not found."

print(safe_read("sample.txt"))
print(safe_read("missing.txt"))
```

**Logic:** Error handling inside a function = a reusable "never crashes" building block.

---

## Level 7 recap — what you now know

- **File modes** — `"r"` read, `"w"` write (overwrites), `"a"` append (Q1, 7).
- **Reading styles** — whole file, line by line, with line numbers (Q2–3).
- **File analytics** — counting lines, words, characters, keywords (Q4–6, 10–11).
- **Text → numbers** — `int()` / `float()` conversions when reading (Q13–14).
- **CSV module** — writing and reading structured data (Q16–17).
- **Error types** — `ValueError`, `ZeroDivisionError`, `FileNotFoundError`, `OSError` (Q18–20).
- **try/except/else/finally** — the full error-handling toolkit (Q23–24).
- **Validation loops** — "ask until valid" (Q21–22, 26–27).
- **Persistence** — save/load lists and dictionaries (Q15, 28, 30).
