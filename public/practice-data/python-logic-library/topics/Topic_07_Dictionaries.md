# Topic Deep-Dive 7 — Dictionaries (30 Questions)

**Focus:** comprehensions, defaultdict/Counter, merging, inverting, grouping, nested dicts, and lookups.

**How to practice:** Read the task, write your own code, use the hint if stuck, then check the solution.

---

## Question 1: Build a dictionary from two lists

**What to do:** Given `keys = ["a", "b", "c"]` and `values = [1, 2, 3]`, build `{"a": 1, "b": 2, "c": 3}`.

**Hint:** `dict(zip(keys, values))`.

**Solution:**

```python
keys = ["a", "b", "c"]
values = [1, 2, 3]

print(dict(zip(keys, values)))
```

**Logic:** zip pairs them, dict converts pairs to entries.

---

## Question 2: Dict comprehension with a condition

**What to do:** Build `{x: x*x}` for x from 1 to 10 but ONLY for even x.

**Hint:** `{x: x * x for x in range(1, 11) if x % 2 == 0}`.

**Solution:**

```python
squares = {x: x * x for x in range(1, 11) if x % 2 == 0}

print(squares)
```

**Logic:** Comprehension + filter — the dict version of the list pattern.

---

## Question 3: Reverse a mapping (values → keys)

**What to do:** Given `capitals = {"India": "Delhi", "Japan": "Tokyo"}`, build `{"Delhi": "India", "Tokyo": "Japan"}`.

**Hint:** Loop over `.items()` and assign with swapped roles.

**Solution:**

```python
capitals = {"India": "Delhi", "Japan": "Tokyo"}

reversed_map = {city: country for country, city in capitals.items()}

print(reversed_map)
```

**Logic:** Inverting works cleanly when values are unique.

---

## Question 4: Frequency with defaultdict

**What to do:** Given `letters = "mississippi"`, count each letter using `collections.defaultdict(int)` — no "if key exists" check.

**Hint:** `defaultdict(int)` starts every new key at 0 automatically.

**Solution:**

```python
from collections import defaultdict

letters = "mississippi"

frequency = defaultdict(int)
for letter in letters:
    frequency[letter] += 1

print(dict(frequency))
```

**Logic:** The default factory removes the if/else boilerplate from counting.

---

## Question 5: Merge two dicts — sum values of common keys

**What to do:** Given `d1 = {"a": 1, "b": 2}` and `d2 = {"b": 3, "c": 4}`, produce `{"a": 1, "b": 5, "c": 4}` — common keys add up.

**Hint:** Loop over d2, adding into d1 with `.get(key, 0)`.

**Solution:**

```python
d1 = {"a": 1, "b": 2}
d2 = {"b": 3, "c": 4}

for key, value in d2.items():
    d1[key] = d1.get(key, 0) + value

print(d1)
```

**Logic:** `.get(key, 0)` makes missing keys behave like zeros — the merge-with-sum idiom.

---

## Question 6: ALL keys with the maximum value

**What to do:** Given `scores = {"a": 5, "b": 9, "c": 9, "d": 3}`, print every key tied for the highest score.

**Hint:** Find the max value first, then collect keys matching it.

**Solution:**

```python
scores = {"a": 5, "b": 9, "c": 9, "d": 3}

max_value = max(scores.values())
winners = [key for key, value in scores.items() if value == max_value]

print(winners)
```

**Logic:** Two passes — find the target, then filter. (Answer: ['b', 'c'])

---

## Question 7: Sort by value, then by key

**What to do:** Given `data = {"b": 2, "a": 2, "c": 1}`, print the items sorted by value ascending, breaking ties by key alphabetically.

**Hint:** `sorted(data.items(), key=lambda item: (item[1], item[0]))` — a tuple key sorts by the first element, then the second.

**Solution:**

```python
data = {"b": 2, "a": 2, "c": 1}

sorted_items = sorted(data.items(), key=lambda item: (item[1], item[0]))

print(sorted_items)
```

**Logic:** Composite sort keys handle ties elegantly. (Answer: [('c',1), ('a',2), ('b',2)])

---

## Question 8: Filter a dict by value threshold

**What to do:** Given `prices = {"pen": 10, "book": 50, "bag": 500}`, produce a dict of only items costing more than 20.

**Hint:** A comprehension with an `if`.

**Solution:**

```python
prices = {"pen": 10, "book": 50, "bag": 500}

expensive = {item: price for item, price in prices.items() if price > 20}

print(expensive)
```

**Logic:** The filter pattern for dictionaries.

---

## Question 9: Safely update a nested dict

**What to do:** Given `students = {"Rahul": {"math": 85}}`, add Priya's science mark 92 — creating missing intermediate dicts with `setdefault`.

**Hint:** `students.setdefault("Priya", {})["science"] = 92`.

**Solution:**

```python
students = {"Rahul": {"math": 85}}

students.setdefault("Priya", {})["science"] = 92

print(students)
```

**Logic:** `setdefault` returns the existing dict or creates a new one — perfect for nested structures.

---

## Question 10: Dict of lists — append to the right key

**What to do:** Given `sales = [("North", 100), ("South", 200), ("North", 150)]`, build `{"North": [100, 150], "South": [200]}`.

**Hint:** `setdefault(region, []).append(amount)`.

**Solution:**

```python
sales = [("North", 100), ("South", 200), ("North", 150)]

by_region = {}
for region, amount in sales:
    by_region.setdefault(region, []).append(amount)

print(by_region)
```

**Logic:** The grouping pattern — dictionary values that are lists.

---

## Question 11: Group words by length

**What to do:** Given `words = ["cat", "dog", "fish", "bird", "ant"]`, group them into a dict keyed by word length.

**Hint:** Same grouping pattern with `len(word)` as the key.

**Solution:**

```python
words = ["cat", "dog", "fish", "bird", "ant"]

groups = {}
for word in words:
    groups.setdefault(len(word), []).append(word)

print(groups)
```

**Logic:** The key can be ANY computed value — grouping is fully general.

---

## Question 12: Invert a dict with duplicate values

**What to do:** Given `grades = {"Rahul": "A", "Priya": "B", "Amit": "A"}`, build `{"A": ["Rahul", "Amit"], "B": ["Priya"]}`.

**Hint:** When inverting with duplicates, values must become LISTS.

**Solution:**

```python
grades = {"Rahul": "A", "Priya": "B", "Amit": "A"}

inverted = {}
for name, grade in grades.items():
    inverted.setdefault(grade, []).append(name)

print(inverted)
```

**Logic:** The setdefault-list pattern handles many-to-one mappings safely.

---

## Question 13: Swap keys and values where unique

**What to do:** Given `data = {"a": 1, "b": 2, "c": 3}`, build `{1: "a", 2: "b", 3: "c"}`.

**Hint:** A comprehension: `{value: key for key, value in data.items()}`.

**Solution:**

```python
data = {"a": 1, "b": 2, "c": 3}

swapped = {value: key for key, value in data.items()}

print(swapped)
```

**Logic:** Safe only because values are unique — see Question 12 for the duplicate case.

---

## Question 14: Difference between two dicts

**What to do:** Given `d1 = {"a": 1, "b": 2}` and `d2 = {"b": 2, "c": 3}`, print keys only in d1 and keys only in d2.

**Hint:** `set(d1) - set(d2)` and the reverse.

**Solution:**

```python
d1 = {"a": 1, "b": 2}
d2 = {"b": 2, "c": 3}

print("Only in d1:", set(d1) - set(d2))
print("Only in d2:", set(d2) - set(d1))
```

**Logic:** Key sets support subtraction directly.

---

## Question 15: Sum values of common keys between two dicts

**What to do:** Given `d1 = {"a": 1, "b": 2, "c": 3}` and `d2 = {"b": 10, "c": 20, "d": 30}`, print the sum of values for keys present in BOTH (2+10 + 3+20 = 35).

**Hint:** Intersect the key sets, then sum both dicts' values for those keys.

**Solution:**

```python
d1 = {"a": 1, "b": 2, "c": 3}
d2 = {"b": 10, "c": 20, "d": 30}

common = set(d1) & set(d2)
total = sum(d1[key] + d2[key] for key in common)

print(total)
```

**Logic:** Set intersection picks the keys; a generator sums their values.

---

## Question 16: Default values with defaultdict(list)

**What to do:** Given `pairs = [("fruit", "apple"), ("fruit", "banana"), ("veg", "carrot")]`, build a dict of lists using `defaultdict(list)`.

**Hint:** `groups = defaultdict(list); groups[key].append(value)`.

**Solution:**

```python
from collections import defaultdict

pairs = [("fruit", "apple"), ("fruit", "banana"), ("veg", "carrot")]

groups = defaultdict(list)
for category, item in pairs:
    groups[category].append(item)

print(dict(groups))
```

**Logic:** `defaultdict(list)` auto-creates empty lists — no setdefault needed.

---

## Question 17: Word → list of positions (index)

**What to do:** Given `words = ["the", "cat", "the", "dog"]`, build `{"the": [0, 2], "cat": [1], "dog": [3]}`.

**Hint:** `enumerate` gives positions; append each position to the word's list.

**Solution:**

```python
words = ["the", "cat", "the", "dog"]

index = {}
for position, word in enumerate(words):
    index.setdefault(word, []).append(position)

print(index)
```

**Logic:** This is how search engines build inverted indexes.

---

## Question 18: Flatten a nested dict one level

**What to do:** Given `nested = {"Rahul": {"math": 85, "sci": 90}}`, build `{"Rahul_math": 85, "Rahul_sci": 90}`.

**Hint:** A comprehension with two loops: `for name, marks in nested.items() for subject, score in marks.items()`.

**Solution:**

```python
nested = {"Rahul": {"math": 85, "sci": 90}}

flat = {name + "_" + subject: score
        for name, marks in nested.items()
        for subject, score in marks.items()}

print(flat)
```

**Logic:** Key-joining with underscores preserves the structure in flat form.

---

## Question 19: Check if two dicts are equal

**What to do:** Given `d1 = {"a": 1, "b": 2}` and `d2 = {"b": 2, "a": 1}`, print "Equal" — remember dicts ignore insertion order when comparing.

**Hint:** `d1 == d2`.

**Solution:**

```python
d1 = {"a": 1, "b": 2}
d2 = {"b": 2, "a": 1}

if d1 == d2:
    print("Equal")
else:
    print("Not equal")
```

**Logic:** Dict equality is about content, not order.

---

## Question 20: Find all keys with a given value

**What to do:** Given `grades = {"Rahul": "A", "Priya": "B", "Amit": "A"}`, print everyone with grade "A".

**Hint:** Filter `.items()` by value.

**Solution:**

```python
grades = {"Rahul": "A", "Priya": "B", "Amit": "A"}

result = [name for name, grade in grades.items() if grade == "A"]

print(result)
```

**Logic:** The reverse lookup — search by value instead of key.

---

## Question 21: Two-level lookup (nested access with safety)

**What to do:** Given `company = {"sales": {"rahul": 50000}}`, safely print `company["sales"]["rahul"]` without crashing if any level is missing.

**Hint:** Chain `.get()`: `company.get("sales", {}).get("rahul", "Not found")`.

**Solution:**

```python
company = {"sales": {"rahul": 50000}}

print(company.get("sales", {}).get("rahul", "Not found"))
print(company.get("hr", {}).get("rahul", "Not found"))
```

**Logic:** Each `.get` supplies a fallback dict, so the chain never fails.

---

## Question 22: Dict comprehension from a list of tuples

**What to do:** Given `pairs = [("a", 1), ("b", 2), ("c", 3)]`, build a dict with a comprehension.

**Hint:** `{key: value for key, value in pairs}`.

**Solution:**

```python
pairs = [("a", 1), ("b", 2), ("c", 3)]

result = {key: value for key, value in pairs}

print(result)
```

**Logic:** Comprehensions can consume any iterable of pairs.

---

## Question 23: Merge dicts with ** and update

**What to do:** Given `d1 = {"a": 1}` and `d2 = {"b": 2}`, merge them TWO ways: with `{**d1, **d2}` (new dict) and `d1.update(d2)` (in place).

**Hint:** Compare which original dict changes afterwards.

**Solution:**

```python
d1 = {"a": 1}
d2 = {"b": 2}

merged_new = {**d1, **d2}
print(merged_new)

d1.update(d2)
print(d1)
```

**Logic:** `**` builds a fresh dict; `update` mutates an existing one. Know both.

---

## Question 24: Most common word with Counter

**What to do:** Given `words = ["apple", "banana", "apple", "cherry", "apple"]`, print the most common word and its count using `Counter`.

**Hint:** `Counter(words).most_common(1)`.

**Solution:**

```python
from collections import Counter

words = ["apple", "banana", "apple", "cherry", "apple"]

print(Counter(words).most_common(1))
```

**Logic:** `Counter` IS a frequency dict with extras built in. (Answer: [('apple', 3)])

---

## Question 25: Least common element

**What to do:** With the same list, print the LEAST common word.

**Hint:** `Counter(...).most_common()[-1]`.

**Solution:**

```python
from collections import Counter

words = ["apple", "banana", "apple", "cherry", "apple"]

print(Counter(words).most_common()[-1])
```

**Logic:** `most_common()` returns everything sorted — the last item is the rarest.

---

## Question 26: Convert a dict to a sorted list of tuples

**What to do:** Given `scores = {"b": 2, "a": 1, "c": 3}`, print the items as a list of tuples sorted by value ascending.

**Hint:** `sorted(scores.items(), key=lambda item: item[1])`.

**Solution:**

```python
scores = {"b": 2, "a": 1, "c": 3}

print(sorted(scores.items(), key=lambda item: item[1]))
```

**Logic:** Sorting dict items by their second element — the standard ranking move.

---

## Question 27: Group students by grade

**What to do:** Given `students = [("Rahul", "A"), ("Priya", "B"), ("Amit", "A"), ("Sneha", "C")]`, build a dict grade → list of names.

**Hint:** The setdefault-list grouping pattern.

**Solution:**

```python
students = [("Rahul", "A"), ("Priya", "B"), ("Amit", "A"), ("Sneha", "C")]

by_grade = {}
for name, grade in students:
    by_grade.setdefault(grade, []).append(name)

print(by_grade)
```

**Logic:** Grouping by a category — the pattern behind every "reports by X" feature.

---

## Question 28: Average marks per student (nested dicts)

**What to do:** Given `marks = {"Rahul": {"math": 85, "sci": 90}, "Priya": {"math": 92, "sci": 88}}`, print each student's average.

**Hint:** Loop over items; average each inner dict's values.

**Solution:**

```python
marks = {"Rahul": {"math": 85, "sci": 90},
         "Priya": {"math": 92, "sci": 88}}

for name, subjects in marks.items():
    average = sum(subjects.values()) / len(subjects)
    print(name, "->", average)
```

**Logic:** Two-level iteration — outer for students, inner for their subjects.

---

## Question 29: Remove entries with empty values

**What to do:** Given `data = {"name": "Rahul", "email": "", "phone": None, "city": "Beed"}`, produce a dict with the empty/None values dropped.

**Hint:** A comprehension testing `if value` — empty strings and None are falsy.

**Solution:**

```python
data = {"name": "Rahul", "email": "", "phone": None, "city": "Beed"}

cleaned = {key: value for key, value in data.items() if value}

print(cleaned)
```

**Logic:** Falsy-value filtering — a common data-cleaning step.

---

## Question 30: Phone book with prefix search

**What to do:** Given `book = {"Rahul": "9876543210", "Rakesh": "9123456780", "Priya": "9988776655"}`, write a function that finds all names starting with a given prefix.

**Hint:** `name.startswith(prefix)` over the keys.

**Solution:**

```python
book = {"Rahul": "9876543210", "Rakesh": "9123456780", "Priya": "9988776655"}

def search(prefix):
    return [name for name in book if name.startswith(prefix)]

print(search("Ra"))
```

**Logic:** Prefix matching over keys — how autocomplete begins.

---

## Dictionaries recap

- **Comprehensions** — build, filter, invert, flatten (Q2–3, 8, 13, 18, 22, 29).
- **defaultdict & Counter** — less boilerplate, more power (Q4, 16, 24–25).
- **Merging** — sum common keys, `**`, `update` (Q5, 23).
- **Grouping** — setdefault-list pattern (Q10–12, 17, 27).
- **Sorting** — by value, composite keys, ties (Q6–7, 26).
- **Nested dicts** — safe access, flattening, averages (Q9, 18, 21, 28).
- **Set-bridge** — key set operations (Q14–15).
