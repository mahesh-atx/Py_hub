# Topic Deep-Dive 9 — Files (30 Questions)

**Focus:** text/binary/CSV/JSON files, directory work, paths, and file utilities.

**How to practice:** Read the task, write your own code, use the hint if stuck, then check the solution. Each solution creates its own sample files (prefixed `tf_`) so you can run them in any order.

---

## Question 1: Write and read back

**What to do:** Write "Hello, file!" to `tf_basic.txt`, then read and print it.

**Hint:** Mode `"w"` writes (overwrites); `"r"` reads. Always use `with`.

**Solution:**

```python
with open("tf_basic.txt", "w") as file:
    file.write("Hello, file!")

with open("tf_basic.txt", "r") as file:
    print(file.read())
```

**Logic:** `with` auto-closes the file even if an error occurs.

---

## Question 2: Read the first N lines

**What to do:** Create a 5-line file, then print only the first 2 lines.

**Hint:** Loop with a counter and `break`, or use `readlines()[:2]`.

**Solution:**

```python
with open("tf_lines.txt", "w") as file:
    for i in range(1, 6):
        file.write("Line " + str(i) + "\n")

with open("tf_lines.txt", "r") as file:
    for i, line in enumerate(file):
        if i == 2:
            break
        print(line.strip())
```

**Logic:** `enumerate` + `break` limits how many lines you process.

---

## Question 3: Read the last N lines

**What to do:** Print the last 2 lines of `tf_lines.txt`.

**Hint:** `readlines()` returns all lines as a list — slice the tail.

**Solution:**

```python
with open("tf_lines.txt", "r") as file:
    lines = file.readlines()

for line in lines[-2:]:
    print(line.strip())
```

**Logic:** Read everything into a list, then slice from the end.

---

## Question 4: File statistics

**What to do:** For `tf_lines.txt`, print the number of lines, words, and characters.

**Hint:** Count lines by iteration; words via `split()`; characters via `len(line)`.

**Solution:**

```python
lines = 0
words = 0
characters = 0

with open("tf_lines.txt", "r") as file:
    for line in file:
        lines += 1
        words += len(line.split())
        characters += len(line.strip())

print("Lines:", lines)
print("Words:", words)
print("Characters:", characters)
```

**Logic:** Three counters, one pass — the classic file analytics loop.

---

## Question 5: Find the longest line

**What to do:** Print the longest line in `tf_lines.txt` and its length.

**Hint:** The current-best pattern over lines, using `len()`.

**Solution:**

```python
longest = ""
with open("tf_lines.txt", "r") as file:
    for line in file:
        if len(line) > len(longest):
            longest = line

print("Longest:", longest.strip(), "(", len(longest.strip()), "chars )")
```

**Logic:** Current-best, comparing line lengths.

---

## Question 6: Number the lines into a new file

**What to do:** Copy `tf_lines.txt` to `tf_numbered.txt` with "1: " prefixes on each line.

**Hint:** Read line by line, write `str(n) + ": " + line`.

**Solution:**

```python
with open("tf_lines.txt", "r") as source:
    with open("tf_numbered.txt", "w") as target:
        for number, line in enumerate(source, start=1):
            target.write(str(number) + ": " + line)

with open("tf_numbered.txt", "r") as file:
    print(file.read())
```

**Logic:** A read-write pipeline — transform while copying.

---

## Question 7: Reverse a file's content

**What to do:** Write the content of `tf_lines.txt` into `tf_reversed.txt` with the LINE ORDER reversed.

**Hint:** Read all lines, slice `[::-1]`, write them out.

**Solution:**

```python
with open("tf_lines.txt", "r") as source:
    lines = source.readlines()

with open("tf_reversed.txt", "w") as target:
    target.writelines(lines[::-1])

with open("tf_reversed.txt", "r") as file:
    print(file.read())
```

**Logic:** `writelines` accepts any iterable of strings — including a reversed list.

---

## Question 8: Search with line numbers

**What to do:** Print every line in `tf_lines.txt` containing "3", together with its line number.

**Hint:** `enumerate` + `if keyword in line`.

**Solution:**

```python
keyword = "3"

with open("tf_lines.txt", "r") as file:
    for number, line in enumerate(file, start=1):
        if keyword in line:
            print(number, ":", line.strip())
```

**Logic:** The filter pattern over enumerated lines.

---

## Question 9: Replace a word in a file

**What to do:** In `tf_lines.txt`, replace "Line" with "Row" and write the result to `tf_replaced.txt`.

**Hint:** `line.replace("Line", "Row")`.

**Solution:**

```python
with open("tf_lines.txt", "r") as source:
    with open("tf_replaced.txt", "w") as target:
        for line in source:
            target.write(line.replace("Line", "Row"))

with open("tf_replaced.txt", "r") as file:
    print(file.read())
```

**Logic:** Read-transform-write — never modify a file in place.

---

## Question 10: Copy with shutil

**What to do:** Copy `tf_basic.txt` to `tf_copy.txt` using `shutil.copy`.

**Hint:** `shutil.copy(source, destination)`.

**Solution:**

```python
import shutil

shutil.copy("tf_basic.txt", "tf_copy.txt")

with open("tf_copy.txt", "r") as file:
    print(file.read())
```

**Logic:** shutil handles file copying (and more) with one call.

---

## Question 11: Delete a file safely

**What to do:** Create `tf_temp.txt`, then delete it — checking it exists first so it never crashes.

**Hint:** `os.path.exists()` then `os.remove()`.

**Solution:**

```python
import os

with open("tf_temp.txt", "w") as file:
    file.write("temporary")

if os.path.exists("tf_temp.txt"):
    os.remove("tf_temp.txt")
    print("Deleted")
else:
    print("File did not exist")
```

**Logic:** Check-then-delete is the crash-proof deletion pattern.

---

## Question 12: Rename a file

**What to do:** Create `tf_old.txt`, rename it to `tf_new.txt`, and verify.

**Hint:** `os.rename(old, new)`.

**Solution:**

```python
import os

with open("tf_old.txt", "w") as file:
    file.write("renaming me")

os.rename("tf_old.txt", "tf_new.txt")

print("Exists as new name:", os.path.exists("tf_new.txt"))
```

**Logic:** Rename = move within the same folder.

---

## Question 13: List files in a directory

**What to do:** Create a folder `tf_dir` with 3 files, list its contents, and print them.

**Hint:** `os.makedirs` (or `os.mkdir`) to create, `os.listdir` to list.

**Solution:**

```python
import os

os.makedirs("tf_dir", exist_ok=True)
for name in ("a.txt", "b.txt", "c.txt"):
    with open(os.path.join("tf_dir", name), "w") as file:
        file.write(name)

print(os.listdir("tf_dir"))
```

**Logic:** `os.path.join` builds portable paths; `exist_ok=True` avoids errors on re-runs.

---

## Question 14: Filter files by extension

**What to do:** In `tf_dir`, create a mix of .txt and .csv files, then print only the .csv ones.

**Hint:** `name.endswith(".csv")` inside a list comprehension.

**Solution:**

```python
import os

for name in ("a.txt", "b.csv", "c.txt", "d.csv"):
    with open(os.path.join("tf_dir", name), "w") as file:
        file.write(name)

csv_files = [name for name in os.listdir("tf_dir") if name.endswith(".csv")]

print(csv_files)
```

**Logic:** Extension filtering — the first step of any file organizer.

---

## Question 15: File size and modification time

**What to do:** Print `tf_basic.txt`'s size in bytes and its last-modified date.

**Hint:** `os.path.getsize()` and `os.path.getmtime()` + `datetime.fromtimestamp()`.

**Solution:**

```python
import os
import datetime

size = os.path.getsize("tf_basic.txt")
modified = os.path.getmtime("tf_basic.txt")

print("Size:", size, "bytes")
print("Modified:", datetime.datetime.fromtimestamp(modified))
```

**Logic:** os.path answers file metadata questions directly.

---

## Question 16: Write a list with join

**What to do:** Given `names = ["Rahul", "Priya", "Amit"]`, write them to `tf_names.txt` as one line separated by commas — using `join`.

**Hint:** `",".join(names) + "\n"`.

**Solution:**

```python
names = ["Rahul", "Priya", "Amit"]

with open("tf_names.txt", "w") as file:
    file.write(",".join(names) + "\n")

with open("tf_names.txt", "r") as file:
    print(file.read())
```

**Logic:** join builds the whole string in one step — faster and cleaner than a loop.

---

## Question 17: Read a file into a list of lines

**What to do:** Read `tf_names.txt` (one comma line) into a LIST of names using `split`.

**Hint:** `file.read().strip().split(",")`.

**Solution:**

```python
with open("tf_names.txt", "r") as file:
    content = file.read()

names = content.strip().split(",")

print(names)
print(type(names))
```

**Logic:** Read the whole file, then parse — simplest for small files.

---

## Question 18: Append multiple lines at once

**What to do:** Append the lines "A", "B", "C" (each on its own line) to `tf_append.txt` in one operation.

**Hint:** `writelines` with list of "line\n" strings, in mode `"a"`.

**Solution:**

```python
lines = ["A\n", "B\n", "C\n"]

with open("tf_append.txt", "a") as file:
    file.writelines(lines)

with open("tf_append.txt", "r") as file:
    print(file.read())
```

**Logic:** Append mode keeps growing the file; writelines adds a whole batch at once.

---

## Question 19: CSV → list of dicts

**What to do:** Write a small CSV with a header row, then read it back as a LIST OF DICTIONARIES using `DictReader`.

**Hint:** `csv.DictReader(file)` gives each row as `{column: value}`.

**Solution:**

```python
import csv

with open("tf_data.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["name", "age"])
    writer.writerow(["Rahul", "20"])
    writer.writerow(["Priya", "19"])

with open("tf_data.csv", "r") as file:
    reader = csv.DictReader(file)
    rows = list(reader)

print(rows)
```

**Logic:** DictReader turns table rows into dictionaries keyed by the header.

---

## Question 20: List of dicts → CSV

**What to do:** Given `people = [{"name": "Rahul", "age": 20}, {"name": "Priya", "age": 19}]`, write them to `tf_people.csv` using `DictWriter`.

**Hint:** Pass the fieldnames to `DictWriter`, call `writeheader()`, then `writerow()` each dict.

**Solution:**

```python
import csv

people = [
    {"name": "Rahul", "age": 20},
    {"name": "Priya", "age": 19},
]

with open("tf_people.csv", "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "age"])
    writer.writeheader()
    writer.writerows(people)

with open("tf_people.csv", "r") as file:
    print(file.read())
```

**Logic:** DictWriter is the inverse of DictReader — dicts in, CSV out.

---

## Question 21: Read a JSON file

**What to do:** Write `{"name": "Rahul", "skills": ["python", "sql"]}` to `tf_data.json`, then load it back and print the skills.

**Hint:** `json.dump()` writes; `json.load()` reads.

**Solution:**

```python
import json

data = {"name": "Rahul", "skills": ["python", "sql"]}

with open("tf_data.json", "w") as file:
    json.dump(data, file)

with open("tf_data.json", "r") as file:
    loaded = json.load(file)

print(loaded["skills"])
```

**Logic:** JSON keeps structure — lists stay lists, dicts stay dicts.

---

## Question 22: Pretty-print JSON to a file

**What to do:** Write the same dict to `tf_pretty.json` with indentation of 4 spaces.

**Hint:** `json.dump(data, file, indent=4)`.

**Solution:**

```python
import json

data = {"name": "Rahul", "skills": ["python", "sql"]}

with open("tf_pretty.json", "w") as file:
    json.dump(data, file, indent=4)

with open("tf_pretty.json", "r") as file:
    print(file.read())
```

**Logic:** `indent` makes JSON human-readable — essential for config files.

---

## Question 23: Does the file exist and is it empty?

**What to do:** Check `tf_basic.txt` (exists, non-empty) and `tf_missing.txt` (missing). Print a status for each without crashing.

**Hint:** `os.path.exists()` and `os.path.getsize() == 0`.

**Solution:**

```python
import os

for name in ("tf_basic.txt", "tf_missing.txt"):
    if not os.path.exists(name):
        print(name, "-> missing")
    elif os.path.getsize(name) == 0:
        print(name, "-> exists but empty")
    else:
        print(name, "-> exists with", os.path.getsize(name), "bytes")
```

**Logic:** Three-way status — missing, empty, or has content.

---

## Question 24: Write and read binary data

**What to do:** Write the bytes `b"\x48\x49\x4a"` to `tf_binary.dat`, read them back, and print them.

**Hint:** Modes `"wb"` and `"rb"` — no text decoding involved.

**Solution:**

```python
with open("tf_binary.dat", "wb") as file:
    file.write(b"\x48\x49\x4a")

with open("tf_binary.dat", "rb") as file:
    data = file.read()

print(data)
print(data == b"HIJ")
```

**Logic:** Binary mode works with raw bytes — images, audio, everything.

---

## Question 25: Temporary file with tempfile

**What to do:** Create a temporary file, write to it, read it back, then delete it — using the `tempfile` module.

**Hint:** `tempfile.NamedTemporaryFile(delete=False)` gives a real path you control.

**Solution:**

```python
import tempfile
import os

temp = tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False)
temp.write("temporary content")
name = temp.name
temp.close()

with open(name, "r") as file:
    print("Content:", file.read().strip())

os.unlink(name)
print("Cleaned up:", not os.path.exists(name))
```

**Logic:** Temp files for scratch work — with explicit cleanup via `os.unlink`.

---

## Question 26: Path manipulation

**What to do:** Given a full path string `"/home/user/docs/report.txt"`, print its basename, directory, and extension using `os.path`.

**Hint:** `os.path.basename`, `os.path.dirname`, `os.path.splitext`.

**Solution:**

```python
import os

path = "/home/user/docs/report.txt"

print("Basename:", os.path.basename(path))
print("Directory:", os.path.dirname(path))
print("Extension:", os.path.splitext(path)[1])
```

**Logic:** Path tools keep your code portable across Windows/Linux/Mac.

---

## Question 27: Walk a directory tree

**What to do:** Create `tf_tree` with one subfolder and a few files, then count ALL files in the tree using `os.walk`.

**Hint:** `os.walk` yields (root, dirs, files) for every folder — count the files lists.

**Solution:**

```python
import os

os.makedirs("tf_tree/sub", exist_ok=True)
for path in ("tf_tree/a.txt", "tf_tree/b.txt", "tf_tree/sub/c.txt"):
    with open(path, "w") as file:
        file.write("x")

count = 0
for root, dirs, files in os.walk("tf_tree"):
    count += len(files)

print("Total files in tree:", count)
```

**Logic:** os.walk is THE tool for scanning nested folders. (Answer: 3)

---

## Question 28: Read with bad encoding safely

**What to do:** Create a file containing invalid UTF-8 bytes, then read it with `errors="ignore"` so it doesn't crash.

**Hint:** Write bytes with `"wb"`, read with `encoding="utf-8", errors="ignore"`.

**Solution:**

```python
with open("tf_bad.txt", "wb") as file:
    file.write(b"hello\xffworld")

with open("tf_bad.txt", "r", encoding="utf-8", errors="ignore") as file:
    print(file.read())
```

**Logic:** `errors="ignore"` skips undecodable bytes — data survives, crash avoided.

---

## Question 29: Merge multiple files into one

**What to do:** Create `tf_a.txt` and `tf_b.txt`, then merge both into `tf_merged.txt`.

**Hint:** Loop over the input filenames, read each, append to the output.

**Solution:**

```python
with open("tf_a.txt", "w") as file:
    file.write("Alpha\n")
with open("tf_b.txt", "w") as file:
    file.write("Beta\n")

with open("tf_merged.txt", "w") as out:
    for name in ("tf_a.txt", "tf_b.txt"):
        with open(name, "r") as source:
            out.write(source.read())

with open("tf_merged.txt", "r") as file:
    print(file.read())
```

**Logic:** Open the output once, stream each input into it.

---

## Question 30: Split a file into chunks of N lines

**What to do:** Write a 6-line file, then split it into chunks of 2 lines each: `tf_part1.txt`, `tf_part2.txt`, `tf_part3.txt`.

**Hint:** Read all lines, slice in steps, write each slice to a numbered file.

**Solution:**

```python
with open("tf_source.txt", "w") as file:
    for i in range(1, 7):
        file.write("Line " + str(i) + "\n")

with open("tf_source.txt", "r") as file:
    lines = file.readlines()

chunk_size = 2
part = 1
for i in range(0, len(lines), chunk_size):
    with open("tf_part" + str(part) + ".txt", "w") as file:
        file.writelines(lines[i:i + chunk_size])
    part += 1

for i in range(1, 4):
    with open("tf_part" + str(i) + ".txt", "r") as file:
        print("part", i, "->", file.read().strip().replace("\n", " | "))
```

**Logic:** Chunking files is how log rotation and big-data splits work.

---

## Files recap

- **Modes** — `"r"`/`"w"`/`"a"` text, `"rb"`/`"wb"` binary (Q1, 18, 24).
- **Reading styles** — whole, first/last N, line loops (Q2–3).
- **Analytics** — lines/words/chars, longest line, search (Q4–5, 8).
- **Transform pipelines** — number, reverse, replace (Q6–7, 9).
- **os / shutil / os.path** — delete, rename, list, size, paths, walk (Q10–15, 26–27).
- **CSV & JSON** — structured data with DictReader/DictWriter, dump/load (Q19–22).
- **Safety** — existence checks, encoding errors, tempfiles (Q11, 23, 25, 28).
- **Batch operations** — writelines, merge, split (Q18, 29–30).
