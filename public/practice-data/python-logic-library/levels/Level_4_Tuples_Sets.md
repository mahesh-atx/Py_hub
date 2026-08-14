# Level 4 — Tuples + Sets (30 Questions)

**What this level teaches:** tuples (immutable sequences) — creation, indexing, unpacking, slicing, conversions — and sets (unordered collections of unique values) — union, intersection, difference, subset checks, and removing duplicates.

**Total questions:** 30

> Tuples use `( )`, sets use `{ }`. Write your own code first, then check the solution.

---

## Question 1: Create a tuple and access an element

**What to do:** Create `coordinates = (10, 20, 30)` and print the *second* element.

**Hint:** Same indexing as lists — the second element is at index 1.

**Solution:**

```python
coordinates = (10, 20, 30)

print(coordinates[1])
```

**Logic:** Tuples are indexed exactly like lists. (Answer: 20)

---

## Question 2: Access the last element of a tuple

**What to do:** Given `numbers = (5, 10, 15, 20, 25)`, print the last element.

**Hint:** Negative index `-1`.

**Solution:**

```python
numbers = (5, 10, 15, 20, 25)

print(numbers[-1])
```

**Logic:** `-1` always points at the last item, however long the tuple is.

---

## Question 3: Tuple unpacking

**What to do:** Given `coordinates = (10, 20, 30)`, assign the three values to `x`, `y`, `z` in one line and print them.

**Hint:** `x, y, z = coordinates`.

**Solution:**

```python
coordinates = (10, 20, 30)

x, y, z = coordinates

print("x =", x)
print("y =", y)
print("z =", z)
```

**Logic:** One assignment line "unpacks" the tuple into separate variables.

---

## Question 4: Swap two variables using a tuple

**What to do:** Given `a = 5, b = 10`, swap their values in a single line so `a` becomes 10 and `b` becomes 5.

**Hint:** `a, b = b, a` — Python packs the right side into a tuple and unpacks it.

**Solution:**

```python
a = 5
b = 10

a, b = b, a

print("a =", a)
print("b =", b)
```

**Logic:** The classic no-temp-variable swap, powered by tuple packing/unpacking.

---

## Question 5: Find the length of a tuple

**What to do:** Given `colors = ("red", "green", "blue", "yellow")`, print how many items it has.

**Hint:** `len(colors)`.

**Solution:**

```python
colors = ("red", "green", "blue", "yellow")

print(len(colors))
```

**Logic:** `len()` works on every collection type. (Answer: 4)

---

## Question 6: Count occurrences in a tuple

**What to do:** Given `numbers = (1, 2, 3, 2, 4, 2)`, print how many times 2 appears.

**Hint:** The tuple method `numbers.count(2)`.

**Solution:**

```python
numbers = (1, 2, 3, 2, 4, 2)

print(numbers.count(2))
```

**Logic:** Tuples share `count()` and `index()` with lists. (Answer: 3)

---

## Question 7: Find the index of an element in a tuple

**What to do:** Given `days = ("Mon", "Tue", "Wed", "Thu", "Fri")`, print the index of "Wed".

**Hint:** `days.index("Wed")`.

**Solution:**

```python
days = ("Mon", "Tue", "Wed", "Thu", "Fri")

print(days.index("Wed"))
```

**Logic:** The first position where the value appears. (Answer: 2)

---

## Question 8: Concatenate two tuples

**What to do:** Given `t1 = (1, 2, 3)` and `t2 = (4, 5, 6)`, create `(1, 2, 3, 4, 5, 6)` and print it.

**Hint:** `t1 + t2` — just like list concatenation.

**Solution:**

```python
t1 = (1, 2, 3)
t2 = (4, 5, 6)

combined = t1 + t2

print(combined)
```

**Logic:** `+` builds a brand-new tuple; the originals are untouched.

---

## Question 9: Repeat a tuple

**What to do:** Given `t = ("a", "b")`, print the tuple repeated 3 times: `("a", "b", "a", "b", "a", "b")`.

**Hint:** `t * 3`.

**Solution:**

```python
t = ("a", "b")

print(t * 3)
```

**Logic:** Multiplication repeats a sequence, same as with strings.

---

## Question 10: Check if an element exists in a tuple

**What to do:** Given `fruits = ("apple", "banana", "mango")`, print "Yes" if "mango" is in the tuple, else "No".

**Hint:** The `in` operator works on tuples.

**Solution:**

```python
fruits = ("apple", "banana", "mango")

if "mango" in fruits:
    print("Yes")
else:
    print("No")
```

**Logic:** Membership testing is the same for tuples, lists, and sets.

---

## Question 11: Convert between list and tuple

**What to do:** Given `my_list = [1, 2, 3]`, convert it to a tuple, then convert that tuple back to a list. Print both conversions.

**Hint:** `tuple(my_list)` and `list(my_tuple)`.

**Solution:**

```python
my_list = [1, 2, 3]

my_tuple = tuple(my_list)
print(my_tuple)

back_to_list = list(my_tuple)
print(back_to_list)
```

**Logic:** Converting is how you "unlock" mutability when you need to change data.

---

## Question 12: Min and max of a tuple

**What to do:** Given `numbers = (45, 12, 89, 3, 67)`, print the smallest and the largest value.

**Hint:** `min(numbers)` and `max(numbers)`.

**Solution:**

```python
numbers = (45, 12, 89, 3, 67)

print("Smallest:", min(numbers))
print("Largest:", max(numbers))
```

**Logic:** Built-ins do the "current best" pattern for you in one call.

---

## Question 13: Sum of tuple elements

**What to do:** Given `numbers = (10, 20, 30, 40)`, print their sum.

**Hint:** `sum(numbers)`.

**Solution:**

```python
numbers = (10, 20, 30, 40)

print(sum(numbers))
```

**Logic:** Tuples work with `sum()` just like lists.

---

## Question 14: Slice a tuple

**What to do:** Given `numbers = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)`, print elements from index 2 to 5 (not including 6), and print the whole tuple reversed.

**Hint:** `numbers[2:6]` and `numbers[::-1]`.

**Solution:**

```python
numbers = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

print(numbers[2:6])
print(numbers[::-1])
```

**Logic:** Slicing works identically for tuples and lists, and always creates a new tuple.

---

## Question 15: Access a nested tuple

**What to do:** Given `matrix = ((1, 2), (3, 4))`, print the value 4 using two indexes.

**Hint:** First index picks the inner tuple, second picks the value: `matrix[1][1]`.

**Solution:**

```python
matrix = ((1, 2), (3, 4))

print(matrix[1][1])
```

**Logic:** Tuples can hold other tuples — index from the outside in.

---

## Question 16: Create a set and add elements

**What to do:** Start with `fruits = {"apple", "banana"}`, add "mango" and "banana" (again), then print the set. Notice what happens to the duplicate.

**Hint:** `fruits.add("mango")`.

**Solution:**

```python
fruits = {"apple", "banana"}

fruits.add("mango")
fruits.add("banana")  # already present — will be ignored

print(fruits)
```

**Logic:** Sets store each value only once. Adding an existing value does nothing.

---

## Question 17: Remove duplicates from a list using a set

**What to do:** Given `numbers = [1, 2, 2, 3, 4, 4, 5]`, print a list of the unique values using a set.

**Hint:** `set(numbers)` removes duplicates; `list(...)` converts back.

**Solution:**

```python
numbers = [1, 2, 2, 3, 4, 4, 5]

unique = list(set(numbers))

print(unique)
```

**Logic:** The one-line duplicate remover. Remember: the *order* of the result is not guaranteed (that's fine when order doesn't matter).

---

## Question 18: Union of two sets

**What to do:** Given `set1 = {1, 2, 3}` and `set2 = {3, 4, 5}`, print all elements that are in either set.

**Hint:** `set1 | set2` or `set1.union(set2)`.

**Solution:**

```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

print(set1 | set2)
print(set1.union(set2))
```

**Logic:** Union = everything from both, duplicates kept once. (Answer: {1, 2, 3, 4, 5})

---

## Question 19: Intersection of two sets

**What to do:** With `set1 = {1, 2, 3}` and `set2 = {3, 4, 5}`, print the elements present in *both*.

**Hint:** `set1 & set2` or `set1.intersection(set2)`.

**Solution:**

```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

print(set1 & set2)
print(set1.intersection(set2))
```

**Logic:** Intersection = common elements. (Answer: {3})

---

## Question 20: Difference of two sets

**What to do:** With `set1 = {1, 2, 3, 4}` and `set2 = {3, 4, 5}`, print the elements that are in `set1` but *not* in `set2`.

**Hint:** `set1 - set2` or `set1.difference(set2)`.

**Solution:**

```python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5}

print(set1 - set2)
print(set1.difference(set2))
```

**Logic:** Difference removes everything the second set contains. (Answer: {1, 2})

---

## Question 21: Symmetric difference

**What to do:** With `set1 = {1, 2, 3}` and `set2 = {3, 4, 5}`, print elements that are in exactly *one* of the two sets.

**Hint:** `set1 ^ set2` or `set1.symmetric_difference(set2)`.

**Solution:**

```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

print(set1 ^ set2)
print(set1.symmetric_difference(set2))
```

**Logic:** Symmetric difference = union minus intersection. (Answer: {1, 2, 4, 5})

---

## Question 22: Check subset and superset

**What to do:** Given `a = {1, 2}` and `b = {1, 2, 3, 4}`, print whether `a` is a subset of `b` and whether `b` is a superset of `a`.

**Hint:** `a.issubset(b)` / `a <= b`, and `b.issuperset(a)` / `b >= a`.

**Solution:**

```python
a = {1, 2}
b = {1, 2, 3, 4}

print(a.issubset(b))     # True
print(a <= b)            # True
print(b.issuperset(a))   # True
print(b >= a)            # True
```

**Logic:** Subset = every element of `a` is in `b`. Superset is the reverse.

---

## Question 23: Count unique values in a list

**What to do:** Given `numbers = [5, 2, 5, 8, 2, 2, 8, 9]`, print how many *different* values it contains.

**Hint:** Convert to a set and take its length.

**Solution:**

```python
numbers = [5, 2, 5, 8, 2, 2, 8, 9]

unique_count = len(set(numbers))

print(unique_count)
```

**Logic:** A set keeps one copy of each value, so its size is the number of unique values. (Answer: 4)

---

## Question 24: Count unique characters in a string

**What to do:** Given `text = "mississippi"`, print how many different letters it contains.

**Hint:** Strings convert to sets of characters directly: `set(text)`.

**Solution:**

```python
text = "mississippi"

unique_letters = set(text)

print(len(unique_letters))
print(sorted(unique_letters))  # bonus: see them in order
```

**Logic:** Same idea as Question 23, applied to characters. (Answer: 4)

---

## Question 25: Common elements using sets

**What to do:** Given `list1 = [1, 2, 3, 4]` and `list2 = [3, 4, 5, 6]`, print their common elements using sets.

**Hint:** `set(list1) & set(list2)`.

**Solution:**

```python
list1 = [1, 2, 3, 4]
list2 = [3, 4, 5, 6]

common = set(list1) & set(list2)

print(common)
```

**Logic:** The set version of "find common elements" is one clean line. (Answer: {3, 4})

---

## Question 26: Elements in the first list but not the second

**What to do:** Given `list1 = [1, 2, 3, 4, 5]` and `list2 = [3, 4]`, print the elements that are in `list1` but not in `list2`.

**Hint:** `set(list1) - set(list2)`.

**Solution:**

```python
list1 = [1, 2, 3, 4, 5]
list2 = [3, 4]

only_in_first = set(list1) - set(list2)

print(only_in_first)
```

**Logic:** Set difference = "remove everything they share". (Answer: {1, 2, 5})

---

## Question 27: Merge two lists without duplicates

**What to do:** Given `list1 = [1, 2, 3]` and `list2 = [3, 4, 5]`, create one collection containing every value exactly once.

**Hint:** Union of the two sets: `set(list1) | set(list2)`.

**Solution:**

```python
list1 = [1, 2, 3]
list2 = [3, 4, 5]

merged = set(list1) | set(list2)

print(merged)
```

**Logic:** Combining collections without duplicates is exactly what union does. (Answer: {1, 2, 3, 4, 5})

---

## Question 28: Compare two lists by their unique elements

**What to do:** Given `list1 = [1, 1, 2, 3]` and `list2 = [3, 2, 1]`, print whether both lists contain the *same unique values* (ignoring order and duplicates).

**Hint:** Compare the two sets: `set(list1) == set(list2)`.

**Solution:**

```python
list1 = [1, 1, 2, 3]
list2 = [3, 2, 1]

if set(list1) == set(list2):
    print("Same unique values")
else:
    print("Different unique values")
```

**Logic:** Sets ignore order and duplicates, so equality means "same elements". (Answer: Same unique values)

---

## Question 29: Convert a set to a sorted list

**What to do:** Given `s = {9, 2, 7, 4, 5}`, print the set's values as a list sorted from smallest to largest.

**Hint:** `sorted(s)` returns a sorted list directly.

**Solution:**

```python
s = {9, 2, 7, 4, 5}

sorted_list = sorted(s)

print(sorted_list)
```

**Logic:** `sorted()` works on any iterable — including sets — and always returns a list.

---

## Question 30: Remove elements from a set safely

**What to do:** Given `fruits = {"apple", "banana", "mango"}`, try removing "banana" and "kiwi" *without crashing* even though "kiwi" isn't in the set. Print the final set.

**Hint:** `discard()` removes if present and stays silent otherwise; `remove()` would raise an error.

**Solution:**

```python
fruits = {"apple", "banana", "mango"}

fruits.remove("banana")   # exists — fine
fruits.discard("kiwi")    # missing — no error, just ignored

print(fruits)
```

**Logic:** Use `discard()` when the value might be missing; use `remove()` when it *should* exist and an error would be useful.

---

## Level 4 recap — what you now know

- **Tuples** — immutable, indexed, sliceable, packable/unpackable (Q1–15).
- **When to use tuples** — fixed data that shouldn't change, like coordinates or days.
- **Sets** — unique values only, no order, no indexing (Q16–17).
- **Set operations** — union `|`, intersection `&`, difference `-`, symmetric difference `^` (Q18–21, 25–27).
- **Comparisons** — subset, superset, equality of unique values (Q22, 28).
- **Conversions** — list ↔ tuple ↔ set ↔ sorted list (Q11, 17, 29).
- **Removing safely** — `remove()` vs `discard()` (Q30).
