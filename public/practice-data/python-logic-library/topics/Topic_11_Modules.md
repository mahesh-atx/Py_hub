# Topic Deep-Dive 11 — Modules (30 Questions)

**Focus:** the standard library's most useful modules — os, sys, math, random, datetime, collections, itertools, functools, re, json, string, zipfile, hashlib — and building your own package.

**How to practice:** Read the task, write your own code, use the hint if stuck, then check the solution.

---

## Question 1: os — working directory and contents

**What to do:** Print the current working directory and list its contents using the `os` module.

**Hint:** `os.getcwd()` and `os.listdir(".")`.

**Solution:**

```python
import os

print("Current directory:", os.getcwd())
print("Contents:", os.listdir("."))
```

**Logic:** os is the bridge between your program and the operating system.

---

## Question 2: sys — command-line arguments

**What to do:** Print the script name and all command-line arguments from `sys.argv`. (Run any script with arguments to see it live.)

**Hint:** `sys.argv[0]` is the script; `sys.argv[1:]` holds the arguments.

**Solution:**

```python
import sys

print("Script:", sys.argv[0])
print("Arguments:", sys.argv[1:])
```

**Logic:** sys.argv is how CLI tools receive input — the foundation of `python script.py arg1 arg2`.

---

## Question 3: math — the power tools

**What to do:** Print `math.factorial(5)`, `math.gcd(36, 60)`, and `math.pow(2, 10)`.

**Hint:** One import, three one-liners.

**Solution:**

```python
import math

print(math.factorial(5))    # 120
print(math.gcd(36, 60))     # 12
print(math.pow(2, 10))      # 1024.0
```

**Logic:** Don't re-implement what the stdlib already perfected.

---

## Question 4: random — all four basics

**What to do:** Demonstrate `randint`, `choice`, `shuffle`, and `sample` in one program.

**Hint:** Each returns a different kind of randomness.

**Solution:**

```python
import random

print("Random int 1-10:", random.randint(1, 10))
print("Random choice:", random.choice(["a", "b", "c"]))

cards = [1, 2, 3, 4, 5]
random.shuffle(cards)
print("Shuffled:", cards)

print("Sample of 2:", random.sample(range(1, 11), 2))
```

**Logic:** Randomness comes in four flavors — pick the right one for the job.

---

## Question 5: datetime — parsing and formatting

**What to do:** Parse "14-08-2026" into a date object with `strptime`, then format it back as "14 August 2026" with `strftime`.

**Hint:** `strptime` reads with a pattern; `strftime` writes with a pattern.

**Solution:**

```python
import datetime

date_obj = datetime.datetime.strptime("14-08-2026", "%d-%m-%Y")

print(date_obj.strftime("%d %B %Y"))
```

**Logic:** The same format codes drive both directions.

---

## Question 6: time — measuring and sleeping

**What to do:** Measure how long `sum(range(10_000_000))` takes using `time.time()`, and demo `time.sleep(0.5)`.

**Hint:** Subtract start time from end time.

**Solution:**

```python
import time

start = time.time()
total = sum(range(10_000_000))
end = time.time()

print("Sum:", total)
print("Took", round(end - start, 3), "seconds")

time.sleep(0.5)
print("Slept for half a second")
```

**Logic:** time.time() is the stopwatch; sleep is the pause button.

---

## Question 7: statistics — mean, median, mode

**What to do:** Given `data = [2, 2, 3, 5, 8, 10]`, print the mean, median, and mode.

**Hint:** Three functions, same module.

**Solution:**

```python
import statistics

data = [2, 2, 3, 5, 8, 10]

print("Mean:", statistics.mean(data))
print("Median:", statistics.median(data))
print("Mode:", statistics.mode(data))
```

**Logic:** statistics handles edge cases (odd/even medians) for you.

---

## Question 8: collections.Counter

**What to do:** Count the characters of "abracadabra" with Counter and print the 3 most common.

**Hint:** `Counter(text).most_common(3)`.

**Solution:**

```python
from collections import Counter

text = "abracadabra"

counter = Counter(text)

print(counter.most_common(3))
print("Total characters:", sum(counter.values()))
```

**Logic:** Counter is a frequency dictionary with batteries included.

---

## Question 9: collections.defaultdict

**What to do:** Group words by first letter using `defaultdict(list)`.

**Hint:** `groups[word[0]].append(word)` — no key-existence checks.

**Solution:**

```python
from collections import defaultdict

words = ["apple", "avocado", "banana", "cherry", "blueberry"]

groups = defaultdict(list)
for word in words:
    groups[word[0]].append(word)

print(dict(groups))
```

**Logic:** defaultdict(list) auto-creates lists — the grouping pattern, minimal.

---

## Question 10: collections.deque

**What to do:** Create a deque of 1–5, rotate it by 2, and append to the LEFT.

**Hint:** `deque.rotate(n)` rotates right for positive n; `appendleft` adds to the front.

**Solution:**

```python
from collections import deque

dq = deque([1, 2, 3, 4, 5])

dq.rotate(2)
print(dq)          # deque([4, 5, 1, 2, 3])

dq.appendleft(0)
print(dq)          # deque([0, 4, 5, 1, 2, 3])
```

**Logic:** deques give O(1) operations at BOTH ends — lists are slow at the left.

---

## Question 11: collections.namedtuple

**What to do:** Define a `Student` namedtuple (name, age, grade), create one, and print fields by name.

**Hint:** `namedtuple("Student", ["name", "age", "grade"])`.

**Solution:**

```python
from collections import namedtuple

Student = namedtuple("Student", ["name", "age", "grade"])

student = Student("Rahul", 20, "A")

print(student.name, student.age, student.grade)
```

**Logic:** Namedtuples = immutable records with readable attribute access.

---

## Question 12: collections.OrderedDict

**What to do:** Show that OrderedDict preserves insertion order and supports `move_to_end`.

**Hint:** `move_to_end(key)` moves an existing key to the back (or front with `last=False`).

**Solution:**

```python
from collections import OrderedDict

od = OrderedDict([("a", 1), ("b", 2), ("c", 3)])

od.move_to_end("a")
print(list(od.items()))

od.move_to_end("b", last=False)
print(list(od.items()))
```

**Logic:** In modern Python all dicts keep order — OrderedDict adds reordering tools.

---

## Question 13: itertools.count and cycle

**What to do:** Print the first 5 numbers starting from 10 using `count`, and the first 6 elements of cycling "AB" using `cycle` — with `islice` to stop.

**Hint:** Infinite iterators need `islice(iterator, n)` to slice safely.

**Solution:**

```python
from itertools import count, cycle, islice

print(list(islice(count(10), 5)))
print(list(islice(cycle("AB"), 6)))
```

**Logic:** count and cycle never end — islice is the safe way to take a piece.

---

## Question 14: itertools.permutations

**What to do:** Print all permutations of "ABC".

**Hint:** `permutations("ABC")` — order matters.

**Solution:**

```python
from itertools import permutations

for perm in permutations("ABC"):
    print("".join(perm))
```

**Logic:** 3! = 6 arrangements — permutations generates them all.

---

## Question 15: itertools.combinations

**What to do:** Print all 2-element combinations of [1, 2, 3, 4].

**Hint:** `combinations(items, 2)` — order does NOT matter.

**Solution:**

```python
from itertools import combinations

for combo in combinations([1, 2, 3, 4], 2):
    print(combo)
```

**Logic:** 4 choose 2 = 6 pairs — combinations skips duplicates like (2,1).

---

## Question 16: itertools.chain

**What to do:** Flatten `[[1, 2], [3, 4], [5]]` into one flat list using `chain`.

**Hint:** `chain(*lists)` or `chain.from_iterable(lists)`.

**Solution:**

```python
from itertools import chain

nested = [[1, 2], [3, 4], [5]]

print(list(chain.from_iterable(nested)))
```

**Logic:** chain glues iterables together lazily — no copying until you consume.

---

## Question 17: itertools.groupby

**What to do:** Given `data = [("a", 1), ("a", 2), ("b", 3), ("b", 4)]`, group values by their letter using groupby.

**Hint:** groupby groups CONSECUTIVE equal keys — sort the data first if needed.

**Solution:**

```python
from itertools import groupby

data = [("a", 1), ("a", 2), ("b", 3), ("b", 4)]

for key, group in groupby(data, key=lambda pair: pair[0]):
    values = [value for _, value in group]
    print(key, "->", values)
```

**Logic:** groupby slices runs of equal keys — with a key function to decide equality.

---

## Question 18: functools.reduce

**What to do:** Use reduce to find the maximum of `[3, 1, 4, 1, 5, 9]` without max().

**Hint:** `reduce(lambda a, b: a if a > b else b, numbers)`.

**Solution:**

```python
from functools import reduce

numbers = [3, 1, 4, 1, 5, 9]

print(reduce(lambda a, b: a if a > b else b, numbers))
```

**Logic:** reduce folds a whole list into one value using ANY rule you write.

---

## Question 19: functools.partial

**What to do:** Create `double = partial(multiply, 2)` from `operator.mul`, then use it on 5.

**Hint:** partial pre-fills arguments, making a specialized function.

**Solution:**

```python
from functools import partial
from operator import mul

double = partial(mul, 2)

print(double(5))
```

**Logic:** partial is the function-factory pattern, built in.

---

## Question 20: re — findall digits

**What to do:** Extract ALL numbers from `text = "Room 101, floor 3, pin 2026"` using regex.

**Hint:** `re.findall(r"\d+", text)`.

**Solution:**

```python
import re

text = "Room 101, floor 3, pin 2026"

print(re.findall(r"\d+", text))
```

**Logic:** `\d+` = one or more digits — the simplest real regex.

---

## Question 21: re — validate an email pattern

**What to do:** Check whether `user@example.com` matches a basic email pattern.

**Hint:** Pattern like `r"^[\w.+-]+@[\w-]+\.[\w.]+$"` with `re.match`.

**Solution:**

```python
import re

pattern = r"^[\w.+-]+@[\w-]+\.[\w.]+$"

for email in ("user@example.com", "not-an-email", "a@b.c"):
    if re.match(pattern, email):
        print(email, "-> valid")
    else:
        print(email, "-> invalid")
```

**Logic:** `^...$` anchors the whole string — no partial matches.

---

## Question 22: re — substitute

**What to do:** Replace every digit in `text = "Call 911 on 2026-08-14"` with "#" using `re.sub`.

**Hint:** `re.sub(r"\d", "#", text)`.

**Solution:**

```python
import re

text = "Call 911 on 2026-08-14"

print(re.sub(r"\d", "#", text))
```

**Logic:** sub replaces every match — the regex version of replace().

---

## Question 23: json — dump and load

**What to do:** Save a nested dict (with a list inside) to `tf_config.json`, load it back, and verify it's identical.

**Hint:** `json.dump(obj, file)` and `json.load(file)`.

**Solution:**

```python
import json

config = {
    "app": "analyzer",
    "limits": [10, 100],
    "nested": {"key": "value"},
}

with open("tf_config.json", "w") as file:
    json.dump(config, file)

with open("tf_config.json", "r") as file:
    loaded = json.load(file)

print(loaded == config)
print(loaded["limits"])
```

**Logic:** JSON round-trips Python structures — the data-exchange standard.

---

## Question 24: json — pretty printing

**What to do:** Print the same config as an indented JSON STRING (not to a file).

**Hint:** `json.dumps(obj, indent=2)`.

**Solution:**

```python
import json

config = {"app": "analyzer", "limits": [10, 100]}

print(json.dumps(config, indent=2))
```

**Logic:** `dumps` (with an s) returns a string — for printing and sending.

---

## Question 25: string — constants

**What to do:** Print `string.ascii_lowercase`, `string.digits`, and `string.punctuation`.

**Hint:** The string module pre-defines every character set you'll need.

**Solution:**

```python
import string

print(string.ascii_lowercase)
print(string.digits)
print(string.punctuation)
```

**Logic:** No more hand-typing "abcdefghijklmnopqrstuvwxyz".

---

## Question 26: os.path — decompose a path

**What to do:** Given `path = "/home/user/docs/report.txt"`, print its basename, directory, and stem (name without extension).

**Hint:** `os.path.basename`, `os.path.dirname`, `os.path.splitext`.

**Solution:**

```python
import os

path = "/home/user/docs/report.txt"

print("Basename:", os.path.basename(path))
print("Directory:", os.path.dirname(path))
print("Stem:", os.path.splitext(os.path.basename(path))[0])
```

**Logic:** Path decomposition is the bread and butter of file tools.

---

## Question 27: shutil — copy, move, and remove trees

**What to do:** Create a small folder, copy it with `copytree`, move the copy with `move`, then delete both with `rmtree`.

**Hint:** One function per operation — all in shutil.

**Solution:**

```python
import os
import shutil

os.makedirs("tf_src", exist_ok=True)
with open("tf_src/data.txt", "w") as file:
    file.write("data")

shutil.copytree("tf_src", "tf_copy_tree")
print("Copied:", os.path.exists("tf_copy_tree/data.txt"))

shutil.move("tf_copy_tree", "tf_moved_tree")
print("Moved:", os.path.exists("tf_moved_tree/data.txt"))

shutil.rmtree("tf_src")
shutil.rmtree("tf_moved_tree")
print("Cleaned up")
```

**Logic:** shutil = file operations on entire trees, not just single files.

---

## Question 28: zipfile — create and read archives

**What to do:** Create `tf_archive.zip` containing two text files, then read back the list of names and one file's content.

**Hint:** `ZipFile(path, "w")` to write; `"r"` to read; `namelist()` lists contents.

**Solution:**

```python
import zipfile

with open("tf_one.txt", "w") as file:
    file.write("first file content")
with open("tf_two.txt", "w") as file:
    file.write("second file content")

with zipfile.ZipFile("tf_archive.zip", "w") as archive:
    archive.write("tf_one.txt")
    archive.write("tf_two.txt")

with zipfile.ZipFile("tf_archive.zip", "r") as archive:
    print("Contents:", archive.namelist())
    print("tf_one.txt says:", archive.read("tf_one.txt").decode())
```

**Logic:** ZipFile archives with two lines of code — backups made simple.

---

## Question 29: hashlib — file hashes

**What to do:** Compute the MD5 and SHA-256 hashes of the string "python" and show they differ in length.

**Hint:** `hashlib.md5(data.encode()).hexdigest()`.

**Solution:**

```python
import hashlib

text = "python"

md5 = hashlib.md5(text.encode()).hexdigest()
sha256 = hashlib.sha256(text.encode()).hexdigest()

print("MD5:", md5, "(", len(md5), "chars )")
print("SHA-256:", sha256, "(", len(sha256), "chars )")
```

**Logic:** Hashes are one-way fingerprints — the basis of passwords and integrity checks.

---

## Question 30: Create your own package

**What to do:** Build a package called `mypackage` with a `maths.py` module (add/multiply) and a `helpers.py` module (greet), an `__init__.py`, then import and use both from a script.

**Hint:** A package is a folder with `__init__.py`; import as `from mypackage.maths import add`.

**Solution:**

```python
# Step 1 — create the folder and files:
#   mypackage/__init__.py   (empty file)
#   mypackage/maths.py      -> def add(a, b): return a + b
#                              def multiply(a, b): return a * b
#   mypackage/helpers.py    -> def greet(name): return "Hello, " + name

# Step 2 — use it from any script in the same folder:
from mypackage.maths import add, multiply
from mypackage.helpers import greet

print(add(3, 4))
print(multiply(3, 4))
print(greet("Rahul"))
```

**Logic:** Once you can make a package, you can organize ANY project — this is how libraries are born.

---

## Modules recap

- **OS bridge** — os, sys, os.path, shutil (Q1–2, 26–27).
- **Math & randomness** — math, random (Q3–4).
- **Time** — datetime, time (Q5–6).
- **Data tools** — statistics, Counter, defaultdict, deque, namedtuple, OrderedDict (Q7–12).
- **Iterators** — count, cycle, permutations, combinations, chain, groupby, islice (Q13–17).
- **Functional helpers** — reduce, partial (Q18–19).
- **Regex** — findall, match, sub (Q20–22).
- **JSON** — dump/load, dumps pretty (Q23–24).
- **String constants** (Q25).
- **Archives & hashes** — zipfile, hashlib (Q28–29).
- **Your own package** — folder + __init__.py (Q30).
