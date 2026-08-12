# Module 6: Lists

## What is a List?

A **list** is an ordered, mutable collection of items. Lists can hold any data type, and items can be changed after creation.

```python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["Mahesh", 25, 3.14, True]

print(fruits[0])   # apple
print(len(fruits)) # 3
```

---

## Indexing, Slicing, and Negative Indexing

```python
nums = [10, 20, 30, 40, 50]

print(nums[0])     # 10
print(nums[-1])    # 50
print(nums[1:4])   # [20, 30, 40]
print(nums[::2])   # [10, 30, 50]
print(nums[::-1])  # [50, 40, 30, 20, 10]
```

---

## Important List Methods

| Method | Description | Example |
| --- | --- | --- |
| `append(x)` | Add item to end | `[1,2].append(3)` → `[1, 2, 3]` |
| `extend(iter)` | Add multiple items | `[1,2].extend([3,4])` → `[1, 2, 3, 4]` |
| `insert(i, x)` | Insert at index | `[1,3].insert(1, 2)` → `[1, 2, 3]` |
| `remove(x)` | Remove first occurrence | `[1,2,3].remove(2)` → `[1, 3]` |
| `pop(i)` | Remove and return item at index | `[1,2,3].pop()` → `3` |
| `clear()` | Remove all items | `[1,2].clear()` → `[]` |
| `sort()` | Sort in place | `[3,1,2].sort()` → `[1, 2, 3]` |
| `reverse()` | Reverse in place | `[1,2,3].reverse()` → `[3, 2, 1]` |
| `copy()` | Return shallow copy | `new = old.copy()` |
| `index(x)` | Find index of item | `[1,2,3].index(2)` → `1` |
| `count(x)` | Count occurrences | `[1,2,2,2].count(2)` → `3` |

```python
tasks = ["read", "code"]
tasks.append("review")
tasks.insert(0, "plan")
print(tasks)  # ['plan', 'read', 'code', 'review']
```

---

## List Comprehension

A concise way to create lists.

```python
# Squares of numbers 1 to 5
squares = [x**2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# Even numbers only
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# Convert names to uppercase
names = ["mahesh", "rohan", "priya"]
upper = [n.upper() for n in names]
print(upper)  # ['MAHESH', 'ROHAN', 'PRIYA']
```

---

## Nested Lists (2D Lists)

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix[0])      # [1, 2, 3]
print(matrix[1][2])   # 6

# Iterate over a 2D list
for row in matrix:
    for num in row:
        print(num, end=" ")
    print()
```

---

## List Unpacking

```python
coordinates = [10, 20, 30]
x, y, z = coordinates
print(x, y, z)  # 10 20 30

# Use * to catch remaining items
first, *rest = [1, 2, 3, 4, 5]
print(first)  # 1
print(rest)   # [2, 3, 4, 5]
```

---

## List vs Array

- A **list** can hold mixed types and is built-in.
- An **array** (from the `array` module or NumPy) holds items of the same type and is faster for numerical work.

For most beginner tasks, lists are enough. For data science and ML, you will use NumPy arrays.

---

## Common Mistakes with Lists

### 1. Assigning a list does not copy it

`b = a` does not make a second list. It makes a second **name for the same list**.

```python
a = [1, 2, 3]
b = a
b.append(4)

print(a)        # [1, 2, 3, 4]   ← a changed too!
print(a is b)   # True           ← they were always one list

c = a.copy()    # ✅ a real (shallow) copy
c.append(5)
print(a)        # [1, 2, 3, 4]   ← unaffected
```

This is the number one source of "my data changed and I never touched it" bugs, and it becomes far more painful once lists are passed into functions.

### 2. `sort()` returns `None`

`sort()` sorts the list **in place** and hands back nothing.

```python
nums = [3, 1, 2]

result = nums.sort()
print(result)    # None          ← the classic mistake
print(nums)      # [1, 2, 3]     ← but the list did get sorted

print(sorted([3, 1, 2]))   # [1, 2, 3]   ✅ sorted() returns a new list
```

`nums = nums.sort()` throws your list away and replaces it with `None`. The same applies to `reverse()`, `append()`, `extend()` and `clear()` — every in-place list method returns `None`.

### 3. Building a grid with `[[0] * 3] * 3`

The outer `* 3` copies the **reference** three times, not the row.

```python
grid = [[0] * 3] * 3
grid[0][0] = 9
print(grid)      # [[9, 0, 0], [9, 0, 0], [9, 0, 0]]   ❌ all three rows changed
print(grid[0] is grid[1])   # True — it is one row, listed three times

grid = [[0] * 3 for _ in range(3)]   # ✅ three separate rows
grid[0][0] = 9
print(grid)      # [[9, 0, 0], [0, 0, 0], [0, 0, 0]]
```

### 4. `copy()` is shallow

A shallow copy duplicates the outer list but **shares** every nested list inside it.

```python
original = [[1, 2], [3, 4]]
shallow = original.copy()
shallow[0].append(99)
print(original)   # [[1, 2, 99], [3, 4]]   ← the inner list is shared

import copy
original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)
deep[0].append(99)
print(original)   # [[1, 2], [3, 4]]       ✅ fully independent
```

### 5. Removing items while looping over the list

The loop uses an internal position counter. Removing an item shifts everything left, so the loop **skips** the next element.

```python
nums = [1, 2, 3, 4, 5, 6]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)

print(nums)   # [1, 3, 5]
```

This example happens to look right, which is exactly why it is dangerous — with `[1, 2, 4, 5]` you would silently keep the `4`. It never raises. Build a new list instead:

```python
nums = [1, 2, 3, 4, 5, 6]
odds = [n for n in nums if n % 2 != 0]   # ✅ [1, 3, 5], always
```

### 6. `append()` versus `extend()`

```python
a = [1, 2]; a.append([3, 4]); print(a)   # [1, 2, [3, 4]]   ← one nested item
b = [1, 2]; b.extend([3, 4]); print(b)   # [1, 2, 3, 4]     ← two new items
```

`extend()` iterates whatever you give it, which surprises people with strings:

```python
c = [1, 2]; c.append("ab"); print(c)   # [1, 2, 'ab']
d = [1, 2]; d.extend("ab"); print(d)   # [1, 2, 'a', 'b']   ← split into characters!
```

### 7. `+` rebinds but `+=` mutates

They look interchangeable and are not.

```python
x = [1, 2]; y = x
x = x + [3]      # builds a NEW list and points x at it
print(y)         # [1, 2]      ← y still sees the original

x = [1, 2]; y = x
x += [3]         # modifies the existing list in place
print(y)         # [1, 2, 3]   ← y sees the change
```

### 8. `remove()` and `index()` raise on missing values

```python
[1, 2, 3].remove(9)   # ❌ ValueError: list.remove(x): x not in list
[1, 2, 3].index(9)    # ❌ ValueError: 9 is not in list

if 9 in [1, 2, 3]:    # ✅ check first
    ...
```

Also note `remove()` deletes only the **first** match: `[1, 2, 2, 3].remove(2)` leaves `[1, 2, 3]`.

> ⚠️ Mistakes 1, 3, 4, 5 and 7 all share one root cause: **a list is a box you pass around by reference, not a value you copy.** Once that clicks, all five stop being surprising. This is also why Pandas warns you about `SettingWithCopyWarning` in Module 25 — the same question, one layer up.
>

---

## Quick Reference

| Task | Syntax | Returns |
| --- | --- | --- |
| Create | `[1, 2, 3]` | a list |
| Length | `len(lst)` | `int` |
| First / last | `lst[0]` / `lst[-1]` | the item |
| Slice | `lst[1:4]` | a **new** list |
| Reverse (copy) | `lst[::-1]` | a **new** list |
| Add one item | `lst.append(x)` | `None`, changes `lst` |
| Add many items | `lst.extend([x, y])` | `None`, changes `lst` |
| Insert at position | `lst.insert(i, x)` | `None`, changes `lst` |
| Remove by value | `lst.remove(x)` | `None`, raises if missing |
| Remove by index | `lst.pop(i)` | the removed item |
| Empty it | `lst.clear()` | `None` |
| Sort in place | `lst.sort()` | **`None`** |
| Sort into a new list | `sorted(lst)` | a **new** list |
| Sort descending | `sorted(lst, reverse=True)` | a new list |
| Sort by a rule | `sorted(lst, key=len)` | a new list |
| Reverse in place | `lst.reverse()` | `None` |
| Position of a value | `lst.index(x)` | `int`, raises if missing |
| Count a value | `lst.count(x)` | `int` |
| Contains? | `x in lst` | `True` / `False` |
| Shallow copy | `lst.copy()` | a new outer list |
| Deep copy | `copy.deepcopy(lst)` | fully independent |
| Build from a rule | `[x*2 for x in lst]` | a new list |
| Filter | `[x for x in lst if x > 0]` | a new list |
| Sum / min / max | `sum(lst)` / `min(lst)` / `max(lst)` | a number |
| Join to a string | `", ".join(lst)` | `str` (items must be strings) |
| Unpack | `a, b = [1, 2]` | — |
| Unpack the rest | `first, *rest = lst` | `rest` is a list |
| Pair with an index | `for i, x in enumerate(lst):` | — |
| Walk two lists together | `for a, b in zip(l1, l2):` | — |
