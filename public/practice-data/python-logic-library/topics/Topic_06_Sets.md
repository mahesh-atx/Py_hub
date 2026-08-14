# Topic Deep-Dive 6 — Sets (30 Questions)

**Focus:** uniqueness, set algebra, frozensets, powersets, and using sets to solve list/string problems fast.

**How to practice:** Read the task, write your own code, use the hint if stuck, then check the solution.

---

## Question 1: Create a set and add multiple items

**What to do:** Create the set `{1, 2, 3}`, add 4 and 5, then add 3 again. Print the result.

**Hint:** `add()` inserts one item; duplicates are silently ignored.

**Solution:**

```python
s = {1, 2, 3}

s.add(4)
s.add(5)
s.add(3)  # duplicate — ignored

print(s)
```

**Logic:** Sets keep each value exactly once.

---

## Question 2: Set comprehension

**What to do:** Build the set of squares of 1..5 using a set comprehension.

**Hint:** `{x * x for x in range(1, 6)}`.

**Solution:**

```python
squares = {x * x for x in range(1, 6)}

print(squares)
```

**Logic:** Curly braces around a comprehension make a set.

---

## Question 3: Union of three sets

**What to do:** Given `a = {1, 2}`, `b = {2, 3}`, `c = {3, 4}`, print everything present in at least one set.

**Hint:** `a | b | c` or `a.union(b, c)`.

**Solution:**

```python
a, b, c = {1, 2}, {2, 3}, {3, 4}

print(a | b | c)
print(a.union(b, c))
```

**Logic:** Union chains naturally across any number of sets.

---

## Question 4: Intersection of three sets

**What to do:** Given `a = {1, 2, 3, 4}`, `b = {2, 3, 4, 5}`, `c = {3, 4, 5, 6}`, print the elements in ALL three.

**Hint:** `a & b & c` or `a.intersection(b, c)`.

**Solution:**

```python
a = {1, 2, 3, 4}
b = {2, 3, 4, 5}
c = {3, 4, 5, 6}

print(a & b & c)
```

**Logic:** Intersection keeps only what every set shares. (Answer: {3, 4})

---

## Question 5: Check if two sets are disjoint

**What to do:** Given `a = {1, 2, 3}` and `b = {4, 5, 6}`, print "Disjoint" if they share nothing.

**Hint:** `a.isdisjoint(b)` — or check if `a & b` is empty.

**Solution:**

```python
a = {1, 2, 3}
b = {4, 5, 6}

if a.isdisjoint(b):
    print("Disjoint")
else:
    print("They share elements")
```

**Logic:** Disjoint = empty intersection.

---

## Question 6: Elements unique to each set

**What to do:** Given `a = {1, 2, 3}` and `b = {3, 4, 5}`, print elements that are in exactly ONE of the sets.

**Hint:** Symmetric difference: `a ^ b`.

**Solution:**

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a ^ b)
```

**Logic:** XOR of sets = union minus intersection. (Answer: {1, 2, 4, 5})

---

## Question 7: Remove items safely

**What to do:** Given `s = {1, 2, 3}`, remove 2 and try to remove 99 WITHOUT crashing. Print the set.

**Hint:** `discard()` is the safe version of `remove()`.

**Solution:**

```python
s = {1, 2, 3}

s.remove(2)     # exists — fine
s.discard(99)   # missing — no error

print(s)
```

**Logic:** `remove` raises on missing items; `discard` never does.

---

## Question 8: Frozen set basics

**What to do:** Create a frozenset from `[1, 2, 3]`, show that it supports set operations, and note why it can be a dictionary key.

**Hint:** `frozenset([1, 2, 3])` — immutable version of a set.

**Solution:**

```python
frozen = frozenset([1, 2, 3])

print(frozen)
print(frozen | {4})            # operations still work
print({frozen: "valid key"})   # hashable -> usable as a dict key
```

**Logic:** Frozensets are sets you can't modify — which makes them hashable.

---

## Question 9: Set of vowels used in a sentence

**What to do:** Given `sentence = "the quick brown fox"`, print WHICH vowels appear in it (not how many).

**Hint:** Convert to a set and intersect with `set("aeiou")`.

**Solution:**

```python
sentence = "the quick brown fox"

vowels_used = set(sentence) & set("aeiou")

print(vowels_used)
```

**Logic:** Intersection answers "which of these appear" in one operation.

---

## Question 10: Letters in one word but not another

**What to do:** Given `word1 = "python"` and `word2 = "typhoon"`, print letters in `word1` that are NOT in `word2`.

**Hint:** `set(word1) - set(word2)`.

**Solution:**

```python
word1, word2 = "python", "typhoon"

print(set(word1) - set(word2))
```

**Logic:** Set difference over strings = letter comparison in one line. (Answer: set())

---

## Question 11: Count common elements between two lists

**What to do:** Given `a = [1, 2, 3, 4, 5]` and `b = [4, 5, 6, 7]`, print how many values appear in both.

**Hint:** `len(set(a) & set(b))`.

**Solution:**

```python
a = [1, 2, 3, 4, 5]
b = [4, 5, 6, 7]

print(len(set(a) & set(b)))
```

**Logic:** Convert both, intersect, count. (Answer: 2)

---

## Question 12: Detect duplicates with a set

**What to do:** Given `numbers = [1, 2, 3, 4, 2]`, print "Has duplicates" or "All unique".

**Hint:** Compare `len(numbers)` with `len(set(numbers))`.

**Solution:**

```python
numbers = [1, 2, 3, 4, 2]

if len(numbers) != len(set(numbers)):
    print("Has duplicates")
else:
    print("All unique")
```

**Logic:** If the set shrank, something repeated.

---

## Question 13: Do two strings share any character?

**What to do:** Given `s1 = "hello"` and `s2 = "world"`, print "Yes" if they share at least one character.

**Hint:** `set(s1) & set(s2)` — a non-empty intersection.

**Solution:**

```python
s1, s2 = "hello", "world"

if set(s1) & set(s2):
    print("Yes")
else:
    print("No")
```

**Logic:** A non-empty set is truthy — the `if` works directly.

---

## Question 14: Generate all subsets (powerset)

**What to do:** Given `items = [1, 2, 3]`, print every subset including the empty set — 8 total.

**Hint:** Start with `[[]]`; for each item, add a copy of every existing subset plus that item.

**Solution:**

```python
items = [1, 2, 3]

subsets = [[]]
for item in items:
    subsets += [subset + [item] for subset in subsets]

print(subsets)
print(len(subsets))
```

**Logic:** Each new item DOUBLES the subsets — with it or without it. 2^n total.

---

## Question 15: Cartesian product of two sets

**What to do:** Given `a = {1, 2}` and `b = {"x", "y"}`, print every pair (element from a, element from b) as a set of tuples.

**Hint:** A set comprehension with two `for` clauses.

**Solution:**

```python
a = {1, 2}
b = {"x", "y"}

product = {(x, y) for x in a for y in b}

print(product)
```

**Logic:** Same idea as the list version — pairs as tuples in a set.

---

## Question 16: Sorted set of characters

**What to do:** Given `text = "banana"`, print the unique letters as a sorted string.

**Hint:** `"".join(sorted(set(text)))`.

**Solution:**

```python
text = "banana"

print("".join(sorted(set(text))))
```

**Logic:** Set removes repeats, sorted orders them, join makes a string.

---

## Question 17: Total unique values across several lists

**What to do:** Given `lists = [[1, 2], [2, 3], [3, 4]]`, print how many unique values exist across ALL of them.

**Hint:** Union the sets of each list — or build one combined set in a loop.

**Solution:**

```python
lists = [[1, 2], [2, 3], [3, 4]]

combined = set()
for lst in lists:
    combined.update(lst)

print(len(combined))
```

**Logic:** `update()` adds a whole collection at once. (Answer: 4)

---

## Question 18: Proper subset check

**What to do:** Given `a = {1, 2}` and `b = {1, 2, 3}`, print "Proper subset" — `a` is contained in `b` but is NOT equal to it.

**Hint:** `a < b` is the proper-subset operator (strictly smaller).

**Solution:**

```python
a = {1, 2}
b = {1, 2, 3}

if a < b:
    print("Proper subset")
else:
    print("Not a proper subset")
```

**Logic:** `<=` allows equality; `<` requires at least one extra element in the superset.

---

## Question 19: Round-trip a set through a sorted list

**What to do:** Given `s = {9, 1, 5, 3}`, print the values as a sorted list, then show the set is unchanged.

**Hint:** `sorted(s)` never modifies `s`.

**Solution:**

```python
s = {9, 1, 5, 3}

sorted_list = sorted(s)
print(sorted_list)
print(s)  # original set untouched
```

**Logic:** Sorting produces a list view; the set itself is never ordered.

---

## Question 20: Combine multiple lists without any duplicates

**What to do:** Given `a = [1, 2, 2, 3]`, `b = [3, 4]`, `c = [4, 5, 5]`, print one set of all values.

**Hint:** Union the three set conversions.

**Solution:**

```python
a = [1, 2, 2, 3]
b = [3, 4]
c = [4, 5, 5]

print(set(a) | set(b) | set(c))
```

**Logic:** Union across collections = deduplicated merge.

---

## Question 21: In-place set operators (|=, &=, -=)

**What to do:** Given `a = {1, 2, 3}` and `b = {3, 4}`, modify `a` with `|=`, then `-=`, printing `a` after each step.

**Hint:** `a |= b` updates `a` in place, like `a.update(b)`.

**Solution:**

```python
a = {1, 2, 3}
b = {3, 4}

a |= b
print(a)     # {1, 2, 3, 4}

a -= b
print(a)     # {1, 2}
```

**Logic:** The compound operators mutate the set instead of creating new ones.

---

## Question 22: Unique vowels across two strings

**What to do:** Given `s1 = "education"` and `s2 = "programming"`, print the vowels that appear in EITHER string.

**Hint:** Union the two vowel intersections.

**Solution:**

```python
s1, s2 = "education", "programming"

vowels1 = set(s1) & set("aeiou")
vowels2 = set(s2) & set("aeiou")

print(vowels1 | vowels2)
```

**Logic:** Two intersections, one union — set algebra composed.

---

## Question 23: Filter a list using an allowed set

**What to do:** Given `words = ["cat", "dog", "rat", "bat", "cow"]` and `allowed = {"cat", "bat", "cow"}`, keep only the allowed words.

**Hint:** Check membership with `in allowed`.

**Solution:**

```python
words = ["cat", "dog", "rat", "bat", "cow"]
allowed = {"cat", "bat", "cow"}

filtered = [word for word in words if word in allowed]

print(filtered)
```

**Logic:** Set membership is O(1) — filtering with sets stays fast on big data.

---

## Question 24: Symmetric difference of three sets

**What to do:** Given `a = {1, 2, 3}`, `b = {3, 4, 5}`, `c = {5, 6, 1}`, print elements in an ODD number of the three sets.

**Hint:** Chain XOR: `a ^ b ^ c`.

**Solution:**

```python
a = {1, 2, 3}
b = {3, 4, 5}
c = {5, 6, 1}

print(a ^ b ^ c)
```

**Logic:** Symmetric difference is associative — chaining gives "in an odd count of sets".

---

## Question 25: Elements in exactly one of two lists

**What to do:** Given `a = [1, 2, 3, 3]` and `b = [3, 4, 5]`, print values that occur in exactly ONE list (ignoring in-list duplicates).

**Hint:** Symmetric difference of the two sets.

**Solution:**

```python
a = [1, 2, 3, 3]
b = [3, 4, 5]

print(set(a) ^ set(b))
```

**Logic:** Convert first — duplicates within a list don't matter for "which list".

---

## Question 26: Compare dictionary keys with sets

**What to do:** Given `d1 = {"a": 1, "b": 2, "c": 3}` and `d2 = {"c": 30, "d": 40}`, print keys only in `d1`, keys in both, and keys only in `d2`.

**Hint:** `set(d1)` gives the keys — then use `-`, `&`.

**Solution:**

```python
d1 = {"a": 1, "b": 2, "c": 3}
d2 = {"c": 30, "d": 40}

print("Only d1:", set(d1) - set(d2))
print("Both:", set(d1) & set(d2))
print("Only d2:", set(d2) - set(d1))
```

**Logic:** Dictionary keys ARE a set — convert and use set algebra.

---

## Question 27: Unique digits across several numbers

**What to do:** Given `numbers = [123, 456, 178]`, print the set of all DISTINCT digits used.

**Hint:** Convert each number to a string and union its characters.

**Solution:**

```python
numbers = [123, 456, 178]

digits = set()
for number in numbers:
    digits.update(str(number))

print(digits)
```

**Logic:** `update(str(number))` adds each character of the string. (Answer: {'1','2','3','4','5','6','7','8'})

---

## Question 28: Random sample from a set

**What to do:** Given `s = {1, 2, 3, 4, 5}`, pick 2 random distinct elements and print them.

**Hint:** `random.sample(s, 2)` — works on sets since Python 3.9+ (or convert to a list first).

**Solution:**

```python
import random

s = {1, 2, 3, 4, 5}

print(random.sample(list(s), 2))
```

**Logic:** Sampling a list-converted set is the portable approach.

---

## Question 29: Find missing numbers in a range

**What to do:** Given `numbers = [2, 3, 7, 9]` and a full range 1..10, print the missing values.

**Hint:** `set(range(1, 11)) - set(numbers)`.

**Solution:**

```python
numbers = [2, 3, 7, 9]

missing = set(range(1, 11)) - set(numbers)

print(sorted(missing))
```

**Logic:** The universe minus what you have = what's missing.

---

## Question 30: Sudoku row validator

**What to do:** Given `row = [5, 3, 4, 6, 7, 8, 9, 1, 2]`, print "Valid" if it contains every digit 1–9 exactly once.

**Hint:** `set(row) == set(range(1, 10))` and `len(row) == 9`.

**Solution:**

```python
row = [5, 3, 4, 6, 7, 8, 9, 1, 2]

if len(row) == 9 and set(row) == set(range(1, 10)):
    print("Valid")
else:
    print("Invalid")
```

**Logic:** 9 cells AND all digits 1–9 present = a legal sudoku line.

---

## Sets recap

- **Uniqueness** — sets drop duplicates by design (Q1, 12, 20).
- **Set algebra** — `|`, `&`, `-`, `^` and their method/compound forms (Q3–6, 18, 21, 24).
- **Frozensets** — immutable, hashable sets (Q8).
- **Sets over strings** — letter comparisons, vowels, digits (Q9–10, 16, 22, 27).
- **Fast membership** — filtering with `in set` (Q23).
- **Conversion bridges** — lists ↔ sets ↔ sorted lists (Q11, 17, 19, 25).
- **Powerset & products** — building combinations (Q14–15).
- **Range checks** — missing numbers, sudoku lines (Q29–30).
