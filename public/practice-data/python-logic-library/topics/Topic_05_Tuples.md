# Topic Deep-Dive 5 — Tuples (30 Questions)

**Focus:** immutability, packing/unpacking, tuple algorithms, zip, namedtuples, and tuples as data records.

**How to practice:** Read the task, write your own code, use the hint if stuck, then check the solution.

---

## Question 1: Build a tuple from user input

**What to do:** Read a line of space-separated numbers from the user and turn it into a tuple of integers.

**Hint:** `tuple(int(x) for x in input(...).split())`.

**Solution:**

```python
text = input("Enter numbers separated by spaces: ")

numbers = tuple(int(x) for x in text.split())

print(numbers)
print(type(numbers))
```

**Logic:** Split into strings → convert each to int → pack into a tuple.

---

## Question 2: Get all statistics in one go

**What to do:** Given `numbers = (4, 7, 2, 9, 5)`, print its length, sum, min, and max in one program.

**Hint:** `len()`, `sum()`, `min()`, `max()` all work on tuples.

**Solution:**

```python
numbers = (4, 7, 2, 9, 5)

print("Length:", len(numbers))
print("Sum:", sum(numbers))
print("Min:", min(numbers))
print("Max:", max(numbers))
```

**Logic:** Tuples support the same built-ins as lists — they just can't be changed.

---

## Question 3: Check if all elements are the same

**What to do:** Given `values = (5, 5, 5, 5)`, print "All same" or "Not all same".

**Hint:** Compare the tuple with a tuple of one element repeated — or check `len(set(values)) == 1`.

**Solution:**

```python
values = (5, 5, 5, 5)

if len(set(values)) == 1:
    print("All same")
else:
    print("Not all same")
```

**Logic:** One unique value means everything matched.

---

## Question 4: Count evens and odds in a tuple

**What to do:** Given `numbers = (1, 2, 3, 4, 5, 6, 7, 8)`, print how many are even and how many odd.

**Hint:** Two counters and the `% 2` test.

**Solution:**

```python
numbers = (1, 2, 3, 4, 5, 6, 7, 8)

even = 0
odd = 0
for number in numbers:
    if number % 2 == 0:
        even += 1
    else:
        odd += 1

print("Even:", even)
print("Odd:", odd)
```

**Logic:** Counting over tuples is identical to counting over lists.

---

## Question 5: Tuple of strings → tuple of ints

**What to do:** Given `strings = ("10", "20", "30")`, produce `(10, 20, 30)`.

**Hint:** A generator expression inside `tuple()`.

**Solution:**

```python
strings = ("10", "20", "30")

numbers = tuple(int(x) for x in strings)

print(numbers)
```

**Logic:** Convert each element — a map operation packed into a tuple.

---

## Question 6: Reverse a tuple without slicing

**What to do:** Given `numbers = (1, 2, 3, 4, 5)`, print the reversed tuple using `reversed()`.

**Hint:** `tuple(reversed(numbers))`.

**Solution:**

```python
numbers = (1, 2, 3, 4, 5)

print(tuple(reversed(numbers)))
```

**Logic:** `reversed()` returns an iterator — wrap it in `tuple()` to materialize it.

---

## Question 7: Sort a tuple

**What to do:** Given `numbers = (9, 1, 7, 3, 5)`, print a sorted tuple.

**Hint:** `sorted()` returns a LIST — convert with `tuple()`.

**Solution:**

```python
numbers = (9, 1, 7, 3, 5)

print(tuple(sorted(numbers)))
```

**Logic:** Tuples have no `.sort()` — you must go through `sorted()`.

---

## Question 8: Tuple palindrome

**What to do:** Given `values = (1, 2, 3, 2, 1)`, print "Palindrome" if it reads the same forwards and backwards.

**Hint:** Compare with `values[::-1]`.

**Solution:**

```python
values = (1, 2, 3, 2, 1)

if values == values[::-1]:
    print("Palindrome")
else:
    print("Not palindrome")
```

**Logic:** Slicing works on tuples exactly like on lists and strings.

---

## Question 9: Index of the maximum element

**What to do:** Given `numbers = (3, 8, 1, 8, 5)`, print the index of the largest value.

**Hint:** `numbers.index(max(numbers))` — note it returns the FIRST occurrence.

**Solution:**

```python
numbers = (3, 8, 1, 8, 5)

print(numbers.index(max(numbers)))
```

**Logic:** First occurrence of the max — index 1 here.

---

## Question 10: Most frequent element in a tuple

**What to do:** Given `values = (1, 3, 2, 3, 4, 3)`, print the element that appears most often.

**Hint:** Build a frequency dictionary, then take `max(freq, key=freq.get)`.

**Solution:**

```python
values = (1, 3, 2, 3, 4, 3)

frequency = {}
for value in values:
    frequency[value] = frequency.get(value, 0) + 1

print(max(frequency, key=frequency.get))
```

**Logic:** The frequency pattern + max-by-value. (Answer: 3)

---

## Question 11: Zip two tuples into pairs

**What to do:** Given `names = ("Rahul", "Priya")` and `ages = (20, 19)`, produce `[("Rahul", 20), ("Priya", 19)]`.

**Hint:** `list(zip(names, ages))`.

**Solution:**

```python
names = ("Rahul", "Priya")
ages = (20, 19)

pairs = list(zip(names, ages))

print(pairs)
```

**Logic:** `zip` pairs position-by-position — the tuple version of "matching up".

---

## Question 12: Unzip pairs back into tuples

**What to do:** Given `pairs = [("Rahul", 20), ("Priya", 19)]`, split it back into two tuples: names and ages.

**Hint:** `zip(*pairs)` — the star unpacks the pairs as separate arguments.

**Solution:**

```python
pairs = [("Rahul", 20), ("Priya", 19)]

names, ages = zip(*pairs)

print(tuple(names))
print(tuple(ages))
```

**Logic:** `zip(*pairs)` is the exact inverse of `zip()` — the classic unzip idiom.

---

## Question 13: Merge two tuples alternately

**What to do:** Given `t1 = (1, 3, 5)` and `t2 = (2, 4, 6, 8)`, produce `(1, 2, 3, 4, 5, 6, 8)`.

**Hint:** Build a list with index guards (like the list version), then convert to a tuple.

**Solution:**

```python
t1 = (1, 3, 5)
t2 = (2, 4, 6, 8)

result = []
for i in range(max(len(t1), len(t2))):
    if i < len(t1):
        result.append(t1[i])
    if i < len(t2):
        result.append(t2[i])

print(tuple(result))
```

**Logic:** Same merge pattern as lists — the final type is just a cast away.

---

## Question 14: First and second halves of a tuple

**What to do:** Given `numbers = (1, 2, 3, 4, 5, 6)`, print the first half and the second half.

**Hint:** `mid = len(numbers) // 2` then two slices.

**Solution:**

```python
numbers = (1, 2, 3, 4, 5, 6)

mid = len(numbers) // 2

print(numbers[:mid])
print(numbers[mid:])
```

**Logic:** Tuple slicing produces new tuples — the originals are never touched.

---

## Question 15: Check if a value appears at least twice

**What to do:** Given `values = (1, 2, 3, 2, 4)`, print "Yes" if 2 appears more than once.

**Hint:** `values.count(2) >= 2`.

**Solution:**

```python
values = (1, 2, 3, 2, 4)

if values.count(2) >= 2:
    print("Yes")
else:
    print("No")
```

**Logic:** Tuples share `count()` with lists.

---

## Question 16: Sum of all elements in a tuple of tuples

**What to do:** Given `matrix = ((1, 2), (3, 4))`, print the sum of ALL elements (10).

**Hint:** `sum(sum(row) for row in matrix)`.

**Solution:**

```python
matrix = ((1, 2), (3, 4))

print(sum(sum(row) for row in matrix))
```

**Logic:** Sum each inner tuple, then sum those sums.

---

## Question 17: Columns of a tuple of tuples

**What to do:** Given `pairs = ((1, 2), (3, 4), (5, 6))`, produce `([1, 3, 5], [2, 4, 6])` — the columns as lists.

**Hint:** `zip(*pairs)` gives the columns; map them to lists.

**Solution:**

```python
pairs = ((1, 2), (3, 4), (5, 6))

columns = tuple(map(list, zip(*pairs)))

print(columns)
```

**Logic:** Unzip + convert — a tuple-of-tuples transposed into columns.

---

## Question 18: Common elements of two tuples

**What to do:** Given `t1 = (1, 2, 3, 4)` and `t2 = (3, 4, 5, 6)`, print their common elements.

**Hint:** Convert to sets and intersect.

**Solution:**

```python
t1 = (1, 2, 3, 4)
t2 = (3, 4, 5, 6)

print(set(t1) & set(t2))
```

**Logic:** Sets are the tool for overlap questions, whatever the original type.

---

## Question 19: Elements in the first tuple but not the second

**What to do:** With the same tuples, print elements in `t1` only.

**Hint:** Set difference: `set(t1) - set(t2)`.

**Solution:**

```python
t1 = (1, 2, 3, 4)
t2 = (3, 4, 5, 6)

print(set(t1) - set(t2))
```

**Logic:** Difference removes everything the second set contains.

---

## Question 20: Swap the halves of a tuple

**What to do:** Given `numbers = (1, 2, 3, 4)`, print `(3, 4, 1, 2)`.

**Hint:** Cut at the middle and reorder the slices.

**Solution:**

```python
numbers = (1, 2, 3, 4)

mid = len(numbers) // 2

print(numbers[mid:] + numbers[:mid])
```

**Logic:** Two slices, concatenated in the new order.

---

## Question 21: Remove duplicates from a tuple (keep order)

**What to do:** Given `values = (1, 2, 2, 3, 4, 4, 5)`, produce `(1, 2, 3, 4, 5)` keeping first-appearance order.

**Hint:** Build a list, appending only new items, then cast to a tuple.

**Solution:**

```python
values = (1, 2, 2, 3, 4, 4, 5)

result = []
for value in values:
    if value not in result:
        result.append(value)

print(tuple(result))
```

**Logic:** Immutable type, mutable building process — standard practice.

---

## Question 22: Second smallest in a tuple

**What to do:** Given `numbers = (7, 2, 9, 1, 5)`, print the second smallest (2).

**Hint:** `sorted(numbers)[1]`.

**Solution:**

```python
numbers = (7, 2, 9, 1, 5)

print(sorted(numbers)[1])
```

**Logic:** Sort a copy and index — the original tuple stays unchanged.

---

## Question 23: Pairwise sums of two tuples

**What to do:** Given `t1 = (1, 2, 3)` and `t2 = (4, 5, 6)`, print `(5, 7, 9)`.

**Hint:** `tuple(a + b for a, b in zip(t1, t2))`.

**Solution:**

```python
t1 = (1, 2, 3)
t2 = (4, 5, 6)

print(tuple(a + b for a, b in zip(t1, t2)))
```

**Logic:** zip pairs the operands; a generator adds them.

---

## Question 24: Check if a tuple is sorted

**What to do:** Given `numbers = (1, 3, 5, 7)`, print "Sorted" if it's in ascending order.

**Hint:** Compare `numbers == tuple(sorted(numbers))`.

**Solution:**

```python
numbers = (1, 3, 5, 7)

if numbers == tuple(sorted(numbers)):
    print("Sorted")
else:
    print("Not sorted")
```

**Logic:** A sequence equals its sorted self exactly when it's already sorted.

---

## Question 25: Rotate a tuple left

**What to do:** Given `numbers = (1, 2, 3, 4, 5)` and `k = 2`, print `(3, 4, 5, 1, 2)`.

**Hint:** `numbers[k:] + numbers[:k]`.

**Solution:**

```python
numbers = (1, 2, 3, 4, 5)
k = 2

print(numbers[k:] + numbers[:k])
```

**Logic:** Same rotation slicing as lists.

---

## Question 26: Named tuples

**What to do:** Create a `Point` namedtuple with fields x and y. Make a point (3, 4), then print the fields by NAME and by index.

**Hint:** `from collections import namedtuple`.

**Solution:**

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])

p = Point(3, 4)

print(p.x, p.y)     # by name
print(p[0], p[1])   # by index
```

**Logic:** Namedtuples give tuples readable attribute access — the best of both worlds.

---

## Question 27: Compare two tuples position by position

**What to do:** Given `t1 = (5, 1, 7)` and `t2 = (3, 2, 9)`, count how many positions have a larger value in `t1`.

**Hint:** `sum(1 for a, b in zip(t1, t2) if a > b)`.

**Solution:**

```python
t1 = (5, 1, 7)
t2 = (3, 2, 9)

wins = sum(1 for a, b in zip(t1, t2) if a > b)

print(wins)
```

**Logic:** zip + filter + count — three patterns in one line. (Answer: 2)

---

## Question 28: Flatten a tuple of tuples

**What to do:** Given `nested = ((1, 2), (3, 4), (5,))`, print `(1, 2, 3, 4, 5)`.

**Hint:** `tuple(item for row in nested for item in row)`.

**Solution:**

```python
nested = ((1, 2), (3, 4), (5,))

print(tuple(item for row in nested for item in row))
```

**Logic:** A nested generator flattens one level.

---

## Question 29: Tuples as dictionary keys — count coordinates

**What to do:** Given `points = [(0, 0), (1, 2), (0, 0), (1, 2), (3, 3)]`, count how many times each coordinate appears, using tuples as dictionary keys.

**Hint:** Tuples are hashable — the counting pattern works directly.

**Solution:**

```python
points = [(0, 0), (1, 2), (0, 0), (1, 2), (3, 3)]

counts = {}
for point in points:
    counts[point] = counts.get(point, 0) + 1

print(counts)
```

**Logic:** Lists CAN'T be dict keys, tuples CAN — a key reason tuples exist.

---

## Question 30: Find the tuple with the maximum sum

**What to do:** Given `pairs = [(1, 5), (3, 3), (2, 8)]`, print the pair with the largest sum.

**Hint:** `max(pairs, key=sum)`.

**Solution:**

```python
pairs = [(1, 5), (3, 3), (2, 8)]

print(max(pairs, key=sum))
```

**Logic:** The `key` argument lets max compare by ANY computed value. (Answer: (2, 8))

---

## Tuples recap

- **Immutability in practice** — build with lists, finalize with `tuple()` (Q21).
- **Packing / unpacking** — `zip(*pairs)`, multiple assignment (Q11–12, 17).
- **Same built-ins as lists** — len, sum, min, max, count, index, slicing (Q2, 7, 9, 14–15).
- **Conversion idioms** — strings→ints, sorted→tuple (Q5–7).
- **Tuples as records** — namedtuples, dict keys, zip columns (Q26, 29).
- **Set bridge** — overlap/difference via set conversion (Q18–19).
