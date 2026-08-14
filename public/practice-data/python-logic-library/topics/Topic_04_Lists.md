# Topic Deep-Dive 4 — Lists (30 Questions)

**Focus:** transformations, rotations, searching, pair problems, flattening, and classic array algorithms.

**How to practice:** Read the task, write your own code, use the hint if stuck, then check the solution.

---

## Question 1: Reverse a list in place

**What to do:** Given `numbers = [1, 2, 3, 4, 5]`, reverse the SAME list (no new list) and print it.

**Hint:** `numbers.reverse()` changes the list itself; `numbers[::-1]` makes a copy.

**Solution:**

```python
numbers = [1, 2, 3, 4, 5]

numbers.reverse()

print(numbers)
```

**Logic:** In-place vs new-list is a crucial distinction — `reverse()` mutates.

---

## Question 2: Rotate a list left by k

**What to do:** Given `numbers = [1, 2, 3, 4, 5]` and `k = 2`, rotate left: `[3, 4, 5, 1, 2]`.

**Hint:** Slicing: `numbers[k:] + numbers[:k]`.

**Solution:**

```python
numbers = [1, 2, 3, 4, 5]
k = 2

rotated = numbers[k:] + numbers[:k]

print(rotated)
```

**Logic:** Left rotation = cut at k and swap the two pieces.

---

## Question 3: Rotate a list right by k

**What to do:** Given `numbers = [1, 2, 3, 4, 5]` and `k = 2`, rotate right: `[4, 5, 1, 2, 3]`.

**Hint:** Right rotation by k is left rotation by `len - k`.

**Solution:**

```python
numbers = [1, 2, 3, 4, 5]
k = 2

n = len(numbers)
rotated = numbers[n - k:] + numbers[:n - k]

print(rotated)
```

**Logic:** Same slicing idea, cutting from the other end.

---

## Question 4: Find the k-th largest element

**What to do:** Given `numbers = [3, 1, 4, 1, 5, 9, 2, 6]` and `k = 3`, print the 3rd largest (5).

**Hint:** Sort descending and index `[k-1]`.

**Solution:**

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
k = 3

sorted_desc = sorted(numbers, reverse=True)

print(sorted_desc[k - 1])
```

**Logic:** Sorting makes the k-th element trivially accessible.

---

## Question 5: Elements at odd indexes

**What to do:** Given `numbers = [10, 20, 30, 40, 50, 60]`, print the elements at odd indexes (20, 40, 60).

**Hint:** Slice starting at index 1 with step 2: `numbers[1::2]`.

**Solution:**

```python
numbers = [10, 20, 30, 40, 50, 60]

print(numbers[1::2])
```

**Logic:** Start, stop, step — the slice does the filtering.

---

## Question 6: Multiply all elements of a list

**What to do:** Given `numbers = [2, 3, 4]`, print their product (24).

**Hint:** Start the accumulator at 1 and multiply.

**Solution:**

```python
numbers = [2, 3, 4]

product = 1
for number in numbers:
    product *= number

print(product)
```

**Logic:** The running-product version of the total pattern.

---

## Question 7: Remove ALL occurrences of a value

**What to do:** Given `numbers = [1, 2, 3, 2, 4, 2]` and `target = 2`, produce `[1, 3, 4]` using a loop (not `remove` in a loop).

**Hint:** Build a new list, skipping the target — or use a list comprehension.

**Solution:**

```python
numbers = [1, 2, 3, 2, 4, 2]
target = 2

result = [number for number in numbers if number != target]

print(result)
```

**Logic:** Filtering is safer than deleting while iterating (which skips elements).

---

## Question 8: Replace all occurrences of a value

**What to do:** Given `numbers = [1, 2, 3, 2, 4]` and `target = 2, new = 9`, produce `[1, 9, 3, 9, 4]`.

**Hint:** Loop with indexes, or a comprehension with a conditional expression.

**Solution:**

```python
numbers = [1, 2, 3, 2, 4]
target, new = 2, 9

result = [new if number == target else number for number in numbers]

print(result)
```

**Logic:** Map + conditional — replace in one pass.

---

## Question 9: Indexes of the min and max

**What to do:** Given `numbers = [5, 12, 3, 8, 15]`, print the POSITIONS of the smallest and largest values.

**Hint:** `numbers.index(min(numbers))` — or find them in one loop.

**Solution:**

```python
numbers = [5, 12, 3, 8, 15]

print("Min index:", numbers.index(min(numbers)))
print("Max index:", numbers.index(max(numbers)))
```

**Logic:** `index()` finds the first position of a value — combine with min/max. (Answer: 2, 4)

---

## Question 10: Check if a list is sorted

**What to do:** Given `numbers = [1, 3, 5, 7, 9]`, print "Sorted" if it's in ascending order, else "Not sorted".

**Hint:** Compare each element with the previous one; a flag tracks order.

**Solution:**

```python
numbers = [1, 3, 5, 7, 9]

sorted_flag = True
for i in range(1, len(numbers)):
    if numbers[i] < numbers[i - 1]:
        sorted_flag = False
        break

if sorted_flag:
    print("Sorted")
else:
    print("Not sorted")
```

**Logic:** Check adjacent pairs — one violation is enough to declare "not sorted".

---

## Question 11: Frequency of each element

**What to do:** Given `numbers = [1, 2, 2, 3, 3, 3]`, print a dictionary of counts.

**Hint:** The "if key exists else start at 1" pattern — or use `.count()` in a comprehension.

**Solution:**

```python
numbers = [1, 2, 2, 3, 3, 3]

frequency = {}
for number in numbers:
    if number in frequency:
        frequency[number] += 1
    else:
        frequency[number] = 1

print(frequency)
```

**Logic:** The dictionary counting pattern — the foundation of frequency analysis.

---

## Question 12: Find all duplicates

**What to do:** Given `numbers = [4, 3, 2, 7, 8, 2, 3, 1]`, print the values that appear more than once, each once.

**Hint:** Count frequencies first, then filter for count > 1.

**Solution:**

```python
numbers = [4, 3, 2, 7, 8, 2, 3, 1]

frequency = {}
for number in numbers:
    frequency[number] = frequency.get(number, 0) + 1

duplicates = [number for number, count in frequency.items() if count > 1]

print(duplicates)
```

**Logic:** Frequency dict → filter. Two patterns chained. (Answer: [3, 2])

---

## Question 13: Find elements that appear exactly once

**What to do:** Given `numbers = [1, 2, 2, 3, 4, 4, 5]`, print the elements that appear exactly once.

**Hint:** `numbers.count(x) == 1` — or the frequency dict with `count == 1`.

**Solution:**

```python
numbers = [1, 2, 2, 3, 4, 4, 5]

unique = [number for number in numbers if numbers.count(number) == 1]

print(unique)
```

**Logic:** Filter by exact count. (Answer: [1, 3, 5])

---

## Question 14: Merge two sorted lists into one sorted list

**What to do:** Given `a = [1, 4, 7]` and `b = [2, 5, 6]`, produce `[1, 2, 4, 5, 6, 7]` WITHOUT concatenating and re-sorting.

**Hint:** Two pointers `i` and `j`; each step take the smaller head and advance its pointer.

**Solution:**

```python
a = [1, 4, 7]
b = [2, 5, 6]

merged = []
i = j = 0
while i < len(a) and j < len(b):
    if a[i] < b[j]:
        merged.append(a[i])
        i += 1
    else:
        merged.append(b[j])
        j += 1

merged.extend(a[i:])
merged.extend(b[j:])

print(merged)
```

**Logic:** The merge step of merge sort — take the smaller head until one list runs out, then append the leftovers.

---

## Question 15: Split a list into two halves

**What to do:** Given `numbers = [1, 2, 3, 4, 5, 6]`, print the first half `[1, 2, 3]` and second half `[4, 5, 6]`.

**Hint:** `mid = len(numbers) // 2`, then two slices.

**Solution:**

```python
numbers = [1, 2, 3, 4, 5, 6]

mid = len(numbers) // 2

print(numbers[:mid])
print(numbers[mid:])
```

**Logic:** Integer division handles odd lengths gracefully.

---

## Question 16: Move all zeros to the end

**What to do:** Given `numbers = [0, 1, 0, 3, 12]`, produce `[1, 3, 12, 0, 0]` keeping the non-zero order.

**Hint:** Collect non-zeros, then add the right number of zeros.

**Solution:**

```python
numbers = [0, 1, 0, 3, 12]

result = [number for number in numbers if number != 0]
result += [0] * numbers.count(0)

print(result)
```

**Logic:** Partition into two groups and recombine — simpler than in-place swaps.

---

## Question 17: Find all pairs that sum to a target

**What to do:** Given `numbers = [1, 4, 2, 3, 5]` and `target = 6`, print all pairs (values) that sum to 6.

**Hint:** Nested loops over positions, inner starting at `i + 1`.

**Solution:**

```python
numbers = [1, 4, 2, 3, 5]
target = 6

for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):
        if numbers[i] + numbers[j] == target:
            print(numbers[i], "+", numbers[j])
```

**Logic:** The pair enumeration pattern from the loops topic, applied to lists.

---

## Question 18: Find the missing number

**What to do:** Given `numbers = [1, 2, 4, 5, 6]` (one number from 1..6 is missing), print the missing number without sorting or searching.

**Hint:** The sum of 1..n is `n*(n+1)//2`. Subtract the actual sum.

**Solution:**

```python
numbers = [1, 2, 4, 5, 6]

n = len(numbers) + 1
expected = n * (n + 1) // 2
missing = expected - sum(numbers)

print(missing)
```

**Logic:** The arithmetic-series trick — one subtraction instead of a search. (Answer: 3)

---

## Question 19: Flatten a list of lists (one level)

**What to do:** Given `nested = [[1, 2], [3, 4], [5]]`, produce `[1, 2, 3, 4, 5]`.

**Hint:** A nested loop appending each inner element.

**Solution:**

```python
nested = [[1, 2], [3, 4], [5]]

flat = [item for sublist in nested for item in sublist]

print(flat)
```

**Logic:** The comprehension reads like the nested loop: "for each sublist, for each item".

---

## Question 20: Flatten deeply nested lists (recursive)

**What to do:** Given `nested = [1, [2, [3, [4]]], 5]`, produce `[1, 2, 3, 4, 5]` using recursion.

**Hint:** If an item is a list, recurse into it; otherwise keep it.

**Solution:**

```python
nested = [1, [2, [3, [4]]], 5]

def flatten(items):
    result = []
    for item in items:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

print(flatten(nested))
```

**Logic:** Recursion handles nesting of ANY depth — loops can't know how deep it goes.

---

## Question 21: Cumulative sum list

**What to do:** Given `numbers = [1, 2, 3, 4]`, produce `[1, 3, 6, 10]` — each element is the sum of everything before it.

**Hint:** Keep a running total and append it at each step.

**Solution:**

```python
numbers = [1, 2, 3, 4]

result = []
total = 0
for number in numbers:
    total += number
    result.append(total)

print(result)
```

**Logic:** The running-total pattern that RECORDS each step instead of just the end.

---

## Question 22: Running average list

**What to do:** Given `numbers = [10, 20, 30]`, produce `[10.0, 15.0, 20.0]` — the average of the first k elements for each k.

**Hint:** Track total and count; append `total / count` each step.

**Solution:**

```python
numbers = [10, 20, 30]

result = []
total = 0
for count, number in enumerate(numbers, start=1):
    total += number
    result.append(total / count)

print(result)
```

**Logic:** `enumerate(..., start=1)` supplies the running count for free.

---

## Question 23: Differences between adjacent elements

**What to do:** Given `numbers = [3, 8, 6, 12]`, print `[5, -2, 6]` — each element minus the one before it.

**Hint:** Loop from index 1 and subtract `numbers[i-1]`.

**Solution:**

```python
numbers = [3, 8, 6, 12]

differences = [numbers[i] - numbers[i - 1] for i in range(1, len(numbers))]

print(differences)
```

**Logic:** Adjacent-difference is the foundation of trend detection.

---

## Question 24: Same elements, different order?

**What to do:** Given `a = [1, 2, 3, 2]` and `b = [2, 3, 1, 2]`, print "Same elements" if both lists contain the same multiset of values.

**Hint:** Compare `sorted(a) == sorted(b)`.

**Solution:**

```python
a = [1, 2, 3, 2]
b = [2, 3, 1, 2]

if sorted(a) == sorted(b):
    print("Same elements")
else:
    print("Different elements")
```

**Logic:** Sorting normalizes order so the comparison tests content only.

---

## Question 25: Second smallest element

**What to do:** Given `numbers = [5, 2, 8, 1, 9]`, print the second smallest (2).

**Hint:** Sort ascending and take index 1.

**Solution:**

```python
numbers = [5, 2, 8, 1, 9]

print(sorted(numbers)[1])
```

**Logic:** After sorting, index 1 is always the second smallest.

---

## Question 26: Longest increasing consecutive run

**What to do:** Given `numbers = [1, 2, 3, 1, 2, 3, 4]`, print the length of the longest run of consecutive increasing numbers (4).

**Hint:** Track the current run length; reset to 1 when the sequence breaks; keep a max.

**Solution:**

```python
numbers = [1, 2, 3, 1, 2, 3, 4]

longest = 1
current = 1
for i in range(1, len(numbers)):
    if numbers[i] > numbers[i - 1]:
        current += 1
        if current > longest:
            longest = current
    else:
        current = 1

print(longest)
```

**Logic:** Two trackers — the current run and the best run so far.

---

## Question 27: Majority element

**What to do:** Given `numbers = [3, 3, 4, 3, 3, 2, 3]`, print the element that appears MORE than half the time (3).

**Hint:** Sort the list — the majority element always lands in the middle.

**Solution:**

```python
numbers = [3, 3, 4, 3, 3, 2, 3]

numbers.sort()

print(numbers[len(numbers) // 2])
```

**Logic:** A majority element occupies the middle index after sorting — the classic shortcut.

---

## Question 28: Leaders in a list

**What to do:** Given `numbers = [16, 17, 4, 3, 5, 2]`, print all "leaders" — elements greater than EVERY element to their right (17, 5, 2).

**Hint:** Scan from the right, keeping the maximum seen so far.

**Solution:**

```python
numbers = [16, 17, 4, 3, 5, 2]

leaders = []
max_so_far = float("-inf")
for number in reversed(numbers):
    if number > max_so_far:
        leaders.append(number)
        max_so_far = number

leaders.reverse()
print(leaders)
```

**Logic:** A right-to-left scan turns "greater than everything to the right" into "greater than the max so far".

---

## Question 29: Comprehension — squares of evens

**What to do:** Print the squares of all even numbers from 1 to 20 using one list comprehension.

**Hint:** `[x * x for x in range(1, 21) if x % 2 == 0]`.

**Solution:**

```python
squares = [x * x for x in range(1, 21) if x % 2 == 0]

print(squares)
```

**Logic:** Filter and transform in one expression.

---

## Question 30: Cartesian product of two lists

**What to do:** Given `a = [1, 2, 3]` and `b = ["x", "y"]`, print every pair (a-item, b-item).

**Hint:** A comprehension with two `for` clauses.

**Solution:**

```python
a = [1, 2, 3]
b = ["x", "y"]

pairs = [(x, y) for x in a for y in b]

print(pairs)
```

**Logic:** The nested comprehension produces all combinations — the list version of a nested loop.

---

## Lists recap

- **In-place vs new list** — `reverse()`/`sort()` vs `reversed()`/`sorted()` (Q1, 27).
- **Slicing operations** — rotations, halves, index filters (Q2–3, 5, 15).
- **Frequency pattern** — count, duplicates, uniques (Q11–13).
- **Pair problems** — nested index loops, merge, cartesian product (Q14, 17, 30).
- **Math tricks** — missing number via series sum, majority via middle (Q18, 27).
- **Two-pass / right-to-left scans** — leaders, runs (Q26, 28).
- **Recursion for nesting** — flattening arbitrary depth (Q20).
- **Comprehensions** — filter, transform, flatten, combine (Q7–8, 19, 29–30).
