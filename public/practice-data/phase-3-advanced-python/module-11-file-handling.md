# Module 11: File Handling

## What is File Handling?

**File handling** means creating, reading, writing, and deleting files from your Python program. It is how your program remembers data after it stops running.

Without files, everything your program stores in variables disappears the moment it ends. Files give you **permanent storage**.

### Real-world uses

- Saving user data, settings, and scores.
- Reading data for analysis (CSV, JSON, logs).
- Writing reports and exporting results.
- Keeping log files of what your program did.

### Types of files

| Type | Description | Examples |
| --- | --- | --- |
| **Text files** | Human-readable characters | `.txt`, `.csv`, `.json`, `.py` |
| **Binary files** | Raw bytes, not readable in a text editor | `.jpg`, `.mp3`, `.pdf`, `.exe` |

---

## Opening a File

Python uses the built-in `open()` function.

### Syntax

```python
file = open("filename.txt", "mode")
```

The three steps of file handling are always:

1. **Open** the file.
2. **Read** from or **write** to it.
3. **Close** it.

```python
file = open("data.txt", "r")
content = file.read()
print(content)
file.close()
```

> ⚠️ Always close a file. An unclosed file can lose data that is still sitting in the buffer and wastes system resources.
>

---

## File Modes

The second argument to `open()` decides what you are allowed to do.

| Mode | Name | Behaviour | If file missing |
| --- | --- | --- | --- |
| `"r"` | Read | Read only (default) | ❌ Error |
| `"w"` | Write | **Erases** the file, then writes | ✅ Creates it |
| `"a"` | Append | Adds to the end, keeps existing content | ✅ Creates it |
| `"x"` | Exclusive create | Creates a new file | ❌ Error if it exists |
| `"r+"` | Read + Write | Both, does not erase | ❌ Error |
| `"w+"` | Write + Read | Both, **erases** first | ✅ Creates it |
| `"a+"` | Append + Read | Both, adds to end | ✅ Creates it |

Add `b` for binary mode and `t` for text mode (text is the default).

| Mode | Meaning |
| --- | --- |
| `"rb"` | Read binary |
| `"wb"` | Write binary |
| `"rt"` | Read text (same as `"r"`) |

> ⚠️ Be very careful with `"w"`. It **deletes everything** in the file without warning. Use `"a"` when you want to keep the old content.
>

---

## The `with` Statement (Recommended Way)

The `with` statement closes the file automatically — even if an error happens in the middle.

```python
with open("data.txt", "r") as file:
    content = file.read()
    print(content)

# file is closed automatically here
```

### Why `with` is better

```python
# Manual way — risky
file = open("data.txt", "r")
content = file.read()
# if an error happens here, close() is never reached
file.close()

# with statement — safe
with open("data.txt", "r") as file:
    content = file.read()
```

You can also check that it closed:

```python
with open("data.txt", "r") as file:
    print(file.closed)     # False

print(file.closed)         # True
```

> 💡 Always use `with open(...)`. Treat the manual `open()` / `close()` pattern as something you only need to recognise in old code.
>

---

## Reading Files

Assume `data.txt` contains:

```
Line 1: Hello
Line 2: Python
Line 3: File Handling
```

### `read()` — the whole file as one string

```python
with open("data.txt", "r") as file:
    content = file.read()
    print(content)
```

Output:

```
Line 1: Hello
Line 2: Python
Line 3: File Handling
```

Read only a number of characters:

```python
with open("data.txt", "r") as file:
    print(file.read(5))     # Line   ← 5 characters: 'L', 'i', 'n', 'e', ' '
```

### `readline()` — one line at a time

```python
with open("data.txt", "r") as file:
    print(file.readline())     # Line 1: Hello
    print(file.readline())     # Line 2: Python
```

### `readlines()` — all lines as a list

```python
with open("data.txt", "r") as file:
    lines = file.readlines()
    print(lines)
```

Output:

```
['Line 1: Hello\n', 'Line 2: Python\n', 'Line 3: File Handling']
```

Note the `\n` at the end of each line. Remove it with `.strip()`:

```python
with open("data.txt", "r") as file:
    lines = [line.strip() for line in file.readlines()]
    print(lines)
```

Output:

```
['Line 1: Hello', 'Line 2: Python', 'Line 3: File Handling']
```

### Looping through a file (best for large files)

This reads one line at a time instead of loading the whole file into memory.

```python
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())
```

Output:

```
Line 1: Hello
Line 2: Python
Line 3: File Handling
```

### Comparison of reading methods

| Method | Returns | Best for |
| --- | --- | --- |
| `read()` | One big string | Small files |
| `read(n)` | First `n` characters | Reading in chunks |
| `readline()` | One line (string) | Processing line by line manually |
| `readlines()` | List of lines | When you need a list |
| `for line in file` | One line per loop | Large files — most memory efficient |

---

## Writing Files

### `write()` — write a string

```python
with open("output.txt", "w") as file:
    file.write("Hello, World!")
    file.write("This is Python.")
```

`output.txt` now contains:

```
Hello, World!This is Python.
```

Notice there is **no automatic newline**. You must add `\n` yourself:

```python
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is Python.\n")
```

Now:

```
Hello, World!
This is Python.
```

### `writelines()` — write a list of strings

```python
lines = ["Python\n", "Java\n", "C++\n"]

with open("languages.txt", "w") as file:
    file.writelines(lines)
```

`writelines()` also does **not** add newlines — include them yourself.

### Writing non-string data

`write()` only accepts strings, so convert numbers first:

```python
number = 100

with open("output.txt", "w") as file:
    file.write(str(number))     # must convert
```

```python
with open("output.txt", "w") as file:
    file.write(100)     # ❌ TypeError: write() argument must be str
```

### Using `print()` to write to a file

```python
with open("output.txt", "w") as file:
    print("Hello", file=file)
    print("Age:", 25, file=file)
```

This automatically adds newlines, which is often more convenient.

---

## Appending to Files

Mode `"a"` adds to the end without erasing.

```python
with open("log.txt", "a") as file:
    file.write("New log entry\n")
```

Run it three times and the file grows:

```
New log entry
New log entry
New log entry
```

### `"w"` vs `"a"` — the crucial difference

```python
# Mode "w" — destroys existing content
with open("test.txt", "w") as file:
    file.write("First\n")

with open("test.txt", "w") as file:
    file.write("Second\n")

# File now contains only: Second
```

```python
# Mode "a" — keeps existing content
with open("test.txt", "a") as file:
    file.write("First\n")

with open("test.txt", "a") as file:
    file.write("Second\n")

# File now contains: First, then Second
```

### A simple logger

```python
import datetime

def log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open("app.log", "a") as file:
        file.write(f"[{timestamp}] {message}\n")

log("Program started")
log("User logged in")
log("Program ended")
```

`app.log`:

```
[2026-07-27 14:30:01] Program started
[2026-07-27 14:30:05] User logged in
[2026-07-27 14:31:12] Program ended
```

---

## File Pointer: `seek()` and `tell()`

The **file pointer** marks your current position inside the file.

### `tell()` — where am I?

```python
with open("data.txt", "r") as file:
    print(file.tell())     # 0 (start of file)
    file.read(5)
    print(file.tell())     # 5
```

### `seek()` — move the pointer

```python
with open("data.txt", "r") as file:
    print(file.read())     # reads everything
    print(file.read())     # '' — pointer is at the end

    file.seek(0)           # go back to the start
    print(file.read())     # reads everything again
```

```python
with open("data.txt", "r") as file:
    file.seek(7)           # jump to character 7
    print(file.read())     # reads from there onwards
```

> 💡 Forgetting `seek(0)` is a very common bug. Once you have read a file, the pointer sits at the end and a second `read()` returns an empty string.
>

---

## Checking if a File Exists

### With the `os` module

```python
import os

if os.path.exists("data.txt"):
    with open("data.txt", "r") as file:
        print(file.read())
else:
    print("File not found!")
```

Related helpers:

```python
import os

print(os.path.exists("data.txt"))    # True / False
print(os.path.isfile("data.txt"))    # is it a file?
print(os.path.isdir("myfolder"))     # is it a folder?
print(os.path.getsize("data.txt"))   # size in bytes
```

### With `try` / `except` (more Pythonic)

```python
try:
    with open("data.txt", "r") as file:
        print(file.read())
except FileNotFoundError:
    print("File not found!")
```

---

## Deleting and Renaming Files

```python
import os

# Delete a file
os.remove("unwanted.txt")

# Delete safely
if os.path.exists("unwanted.txt"):
    os.remove("unwanted.txt")
else:
    print("File does not exist")

# Rename a file
os.rename("old_name.txt", "new_name.txt")

# Create a folder
os.mkdir("new_folder")

# Delete an empty folder
os.rmdir("new_folder")
```

To delete a folder that still has files inside:

```python
import shutil

shutil.rmtree("folder_with_files")
```

> ⚠️ `os.remove()` and `shutil.rmtree()` delete permanently. There is no recycle bin. Double-check the path before running.
>

---

## Working with CSV Files

**CSV** (Comma-Separated Values) is the standard format for tabular data — spreadsheets, exports, datasets.

A CSV file looks like this:

```
name,age,city
Mahesh,25,Mumbai
Priya,23,Delhi
Ravi,30,Pune
```

### Reading a CSV

```python
import csv

with open("people.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

Output:

```
['name', 'age', 'city']
['Mahesh', '25', 'Mumbai']
['Priya', '23', 'Delhi']
['Ravi', '30', 'Pune']
```

Skip the header row:

```python
import csv

with open("people.csv", "r") as file:
    reader = csv.reader(file)
    next(reader)              # skip header
    for row in reader:
        print(f"{row[0]} is {row[1]} years old")
```

### Writing a CSV

```python
import csv

data = [
    ["name", "age", "city"],
    ["Mahesh", 25, "Mumbai"],
    ["Priya", 23, "Delhi"]
]

with open("output.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)
```

> 💡 Always pass `newline=""` when writing CSV files. Without it, Windows inserts an extra blank line between rows.
>

### `DictReader` — rows as dictionaries

```python
import csv

with open("people.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["name"], "-", row["city"])
```

Output:

```
Mahesh - Mumbai
Priya - Delhi
Ravi - Pune
```

### `DictWriter` — write from dictionaries

```python
import csv

data = [
    {"name": "Mahesh", "age": 25, "city": "Mumbai"},
    {"name": "Priya", "age": 23, "city": "Delhi"}
]

with open("output.csv", "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "age", "city"])
    writer.writeheader()
    writer.writerows(data)
```

---

## Working with JSON Files

**JSON** is the standard format for exchanging data between programs and APIs.

### Writing JSON

```python
import json

data = {
    "name": "Mahesh",
    "age": 25,
    "skills": ["Python", "SQL"],
    "active": True
}

with open("data.json", "w") as file:
    json.dump(data, file, indent=4)
```

`data.json`:

```
{
    "name": "Mahesh",
    "age": 25,
    "skills": [
        "Python",
        "SQL"
    ],
    "active": true
}
```

### Reading JSON

```python
import json

with open("data.json", "r") as file:
    data = json.load(file)

print(data["name"])       # Mahesh
print(data["skills"])     # ['Python', 'SQL']
print(type(data))         # <class 'dict'>
```

### The four JSON functions

| Function | Direction | Works with |
| --- | --- | --- |
| `json.dump(obj, file)` | Python → file | File |
| `json.load(file)` | File → Python | File |
| `json.dumps(obj)` | Python → string | String |
| `json.loads(string)` | String → Python | String |

Remember: the `s` stands for **string**.

---

## Working with Binary Files

Binary mode is for images, audio, video, and any non-text data.

```python
# Copy an image
with open("photo.jpg", "rb") as source:
    data = source.read()

with open("copy.jpg", "wb") as target:
    target.write(data)
```

Efficient copying for large files:

```python
with open("big_video.mp4", "rb") as source:
    with open("copy.mp4", "wb") as target:
        while chunk := source.read(4096):
            target.write(chunk)
```

---

## Useful File Attributes

```python
with open("data.txt", "r") as file:
    print(file.name)       # data.txt
    print(file.mode)       # r
    print(file.closed)     # False

print(file.closed)         # True
```

---

## Practical Examples

### 1. Count lines, words, and characters

```python
with open("data.txt", "r") as file:
    content = file.read()

lines = content.split("\n")
words = content.split()
characters = len(content)

print(f"Lines: {len(lines)}")
print(f"Words: {len(words)}")
print(f"Characters: {characters}")
```

### 2. Copy a text file

```python
with open("source.txt", "r") as source:
    content = source.read()

with open("destination.txt", "w") as target:
    target.write(content)

print("File copied successfully")
```

### 3. Search for a word in a file

```python
search_word = "Python"

with open("data.txt", "r") as file:
    for line_number, line in enumerate(file, start=1):
        if search_word in line:
            print(f"Found on line {line_number}: {line.strip()}")
```

### 4. Merge multiple files

```python
files = ["file1.txt", "file2.txt", "file3.txt"]

with open("merged.txt", "w") as output:
    for filename in files:
        with open(filename, "r") as file:
            output.write(file.read())
            output.write("\n")

print("Files merged")
```

### 5. Remove blank lines

```python
with open("data.txt", "r") as file:
    lines = file.readlines()

with open("cleaned.txt", "w") as file:
    for line in lines:
        if line.strip():
            file.write(line)
```

### 6. Word frequency counter

```python
with open("data.txt", "r") as file:
    words = file.read().lower().split()

frequency = {}
for word in words:
    frequency[word] = frequency.get(word, 0) + 1

for word, count in sorted(frequency.items(), key=lambda x: x[1], reverse=True):
    print(f"{word}: {count}")
```

### 7. A simple student records system

```python
def add_student(name, marks):
    with open("students.txt", "a") as file:
        file.write(f"{name},{marks}\n")

def show_students():
    try:
        with open("students.txt", "r") as file:
            for line in file:
                name, marks = line.strip().split(",")
                print(f"{name} scored {marks}")
    except FileNotFoundError:
        print("No records found")

add_student("Mahesh", 85)
add_student("Priya", 92)
show_students()
```

Output:

```
Mahesh scored 85
Priya scored 92
```

---

## Common Mistakes with Files

### 1. Using `"w"` when you meant `"a"`

```python
# Wrong — erases the log every time
with open("log.txt", "w") as file:
    file.write("entry\n")

# Correct
with open("log.txt", "a") as file:
    file.write("entry\n")
```

### 2. Forgetting `\n`

```python
# Wrong — everything ends up on one line
file.write("Line 1")
file.write("Line 2")

# Correct
file.write("Line 1\n")
file.write("Line 2\n")
```

### 3. Reading twice without `seek(0)`

```python
with open("data.txt", "r") as file:
    print(file.read())     # full content
    print(file.read())     # '' — pointer is at the end
    file.seek(0)
    print(file.read())     # works again
```

### 4. Forgetting to close (when not using `with`)

```python
# Wrong
file = open("data.txt", "w")
file.write("Hello")
# data may never reach the disk

# Correct
with open("data.txt", "w") as file:
    file.write("Hello")
```

### 5. Backslash problems in Windows paths

```python
# Wrong — \n and \t become escape characters
path = "C:\new\table.txt"

# Correct — raw string
path = r"C:\new\table.txt"

# Also correct — forward slashes work on Windows too
path = "C:/new/table.txt"
```

### 6. Writing a number without converting

```python
file.write(100)        # ❌ TypeError
file.write(str(100))   # ✅
```

---

## Quick Reference

| Task | Code |
| --- | --- |
| Open for reading | `open("f.txt", "r")` |
| Open for writing (erases) | `open("f.txt", "w")` |
| Open for appending | `open("f.txt", "a")` |
| Safe open | `with open("f.txt") as f:` |
| Read all | `f.read()` |
| Read one line | `f.readline()` |
| Read into a list | `f.readlines()` |
| Loop over lines | `for line in f:` |
| Write a string | `f.write("text")` |
| Write a list | `f.writelines(list)` |
| Current position | `f.tell()` |
| Move pointer | `f.seek(0)` |
| Close | `f.close()` |
| Does it exist? | `os.path.exists("f.txt")` |
| Delete | `os.remove("f.txt")` |
| Rename | `os.rename("a.txt", "b.txt")` |
| Read CSV | `csv.reader(f)` |
| Write CSV | `csv.writer(f)` |
| Read JSON | `json.load(f)` |
| Write JSON | `json.dump(data, f)` |
