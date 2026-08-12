# Module 7: Tuples and Sets

## Tuples

A **tuple** is an ordered, immutable collection. Once created, you cannot change its items.

```python
point = (10, 20)
person = ("Mahesh", 25, "India")

print(point[0])    # 10
print(len(person)) # 3
```

### Why use tuples?

- **Immutable**: Data stays safe from accidental changes.
- **Faster**: Tuples are slightly faster than lists.
- **Hashable**: Can be used as dictionary keys or set items (lists cannot).

### Tuple packing and unpacking

```python
# Packing
coordinates = (10, 20, 30)

# Unpacking
x, y, z = coordinates
print(x, y, z)  # 10 20 30

# Single-item tuple needs a comma
single = (5,)  # NOT (5)
print(type(single))  # <class 'tuple'>
```

### Tuple methods

```python
t = (1, 2, 3, 2, 2)
print(t.count(2))   # 3
print(t.index(3))   # 2
```

### When to use tuples vs lists

| Use a tuple when... | Use a list when... |
| --- | --- |
| You want data that should not change (coordinates, RGB colors, records). | You need to add, remove, or modify items over time. |

## Sets

A **set** is an unordered collection of unique items. Sets are useful for removing duplicates and performing mathematical set operations.

```python
fruits = {"apple", "banana", "cherry"}
numbers = set([1, 2, 2, 3, 3, 3])  # {1, 2, 3}

print(numbers)  # {1, 2, 3}
```

### Set methods

```python
s = {1, 2, 3}

s.add(4)
s.remove(2)      # raises KeyError if not found
s.discard(10)    # no error if not found
s.pop()          # removes and returns arbitrary item
s.clear()        # empties the set
```

### Set operations

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)   # Union: {1, 2, 3, 4, 5, 6}
print(a & b)   # Intersection: {3, 4}
print(a - b)   # Difference: {1, 2}
print(a ^ b)   # Symmetric Difference: {1, 2, 5, 6}
```

### Frozen Sets

A `frozenset` is an immutable version of a set. You can use it as a dictionary key or as an item in another set.

```python
fs = frozenset([1, 2, 3])
# fs.add(4)  # ❌ AttributeError
```

### Set comprehension

```python
squares = {x**2 for x in range(1, 6)}
print(squares)  # {1, 4, 9, 16, 25}
```

---

## Common Mistakes with Tuples and Sets

### 1. Forgetting the comma in a one-item tuple

Parentheses do not make a tuple. **The comma makes a tuple.**

```python
not_a_tuple = (5)
print(type(not_a_tuple))   # <class 'int'>     ← just a number in brackets

real_tuple = (5,)
print(type(real_tuple))    # <class 'tuple'>
print(len(real_tuple))     # 1

print(type(()))            # <class 'tuple'>   ← the empty tuple is the exception
```

This bites hardest when returning a single value or building a one-element argument.

### 2. Believing a tuple protects what is inside it

A tuple's immutability is **shallow**. It fixes which objects it holds, not what those objects contain.

```python
t = (1, [2, 3])
t[1].append(4)
print(t)      # (1, [2, 3, 4])   ← the tuple "changed"
```

The tuple still points at the same list; that list simply grew. If you need a genuinely fixed record, hold only immutable things inside it.

There is a genuinely strange corner here:

```python
t = (1, [2, 3])
t[1] += [4]     # ❌ TypeError: 'tuple' object does not support item assignment
print(t)        # (1, [2, 3, 4])   ← but it appended anyway!
```

`+=` extends the list first and *then* tries to reassign `t[1]`, which fails. You get an exception **and** the mutation. Do not write this.

### 3. `{}` creates an empty dictionary, not an empty set

```python
print(type({}))       # <class 'dict'>   ← surprise
print(type(set()))    # <class 'set'>    ✅ the only way to make an empty set
print(type({1, 2}))   # <class 'set'>    (non-empty braces are fine)
```

### 4. Expecting a set to keep its order

Sets are **unordered**. Any order you see is an implementation detail, and for strings it changes between runs because Python randomises string hashing for security.

```python
print(list(set([10, 3, 7, 1])))   # [1, 10, 3, 7]   ← not sorted, not insertion order
```

Running `print(set("banana"))` in two separate processes can genuinely print `{'a', 'n', 'b'}` once and `{'n', 'b', 'a'}` the next time. If order matters, sort at the point of use:

```python
print(sorted(set([10, 3, 7, 1])))   # [1, 3, 7, 10]   ✅ predictable
```

For the same reason a set cannot be indexed:

```python
{1, 2, 3}[0]   # ❌ TypeError: 'set' object is not subscriptable
```

### 5. Deduplicating a list and losing the order

`list(set(items))` is the famous one-liner and it scrambles your data. To dedupe *and* keep the original order, use a dictionary — keys are unique and, since Python 3.7, ordered:

```python
items = ["b", "a", "b", "c", "a"]

print(list(set(items)))         # order is arbitrary
print(list(dict.fromkeys(items)))   # ['b', 'a', 'c']   ✅ first-seen order kept
```

### 6. `remove()` raises, `discard()` does not

```python
s = {1, 2, 3}
s.remove(9)    # ❌ KeyError: 9
s.discard(9)   # ✅ does nothing, no error
```

### 7. Set operations return a new set

```python
a = {1, 2, 3}
b = {3, 4}

a | b
print(a)     # {1, 2, 3}       ← the union was discarded

a |= {4}     # ✅ update in place
print(a)     # {1, 2, 3, 4}
```

### 8. Trying to put a list in a set

Set items and dictionary keys must be **hashable**, which in practice means immutable.

```python
{[1, 2]}          # ❌ TypeError: unhashable type: 'list'
{(1, 2)}          # ✅ {(1, 2)}          tuples are fine
{frozenset([1, 2])}  # ✅ frozensets are fine
```

This is the real reason tuples exist alongside lists, and it is why `frozenset` exists at all.

> 💡 **Tip:** Membership testing is where sets earn their place. Checking `x in collection` 300 times against 200,000 items, measured on this machine: **list 0.975 ms per lookup, set 0.000295 ms per lookup — about 3,300× faster.** A list checks every element in turn; a set jumps straight to the answer by hash. If you are testing membership inside a loop, build a set first.
>

---

## Quick Reference

### Tuples

| Task | Syntax | Note |
| --- | --- | --- |
| Create | `(1, 2, 3)` | parentheses optional: `1, 2, 3` |
| **One item** | `(5,)` | **the comma is what matters** |
| Empty | `()` | |
| Access | `t[0]` | same indexing as lists |
| Slice | `t[1:3]` | returns a new tuple |
| Length | `len(t)` | |
| Count / find | `t.count(x)` / `t.index(x)` | the only two methods |
| Unpack | `x, y, z = t` | counts must match |
| Unpack the rest | `first, *rest = t` | `rest` is a **list** |
| Convert | `list(t)` / `tuple(lst)` | |
| Contains? | `x in t` | |

### Sets

| Task | Syntax | Result |
| --- | --- | --- |
| Create | `{1, 2, 3}` | |
| **Empty set** | `set()` | **not `{}`** |
| From a list | `set([1, 2, 2])` | `{1, 2}` |
| Add / remove | `s.add(x)` / `s.remove(x)` | `remove` raises if missing |
| Remove safely | `s.discard(x)` | never raises |
| Union | `a \| b` or `a.union(b)` | everything in either |
| Intersection | `a & b` | in both |
| Difference | `a - b` | in `a` only |
| Symmetric difference | `a ^ b` | in exactly one |
| Subset / superset | `a <= b` / `a >= b` | `True` / `False` |
| No overlap? | `a.isdisjoint(b)` | `True` / `False` |
| Update in place | `a \|= b`, `a &= b`, `a -= b` | changes `a` |
| Contains? | `x in s` | **very fast** |
| Dedupe (order lost) | `list(set(items))` | |
| Dedupe (order kept) | `list(dict.fromkeys(items))` | |
| Immutable set | `frozenset([1, 2])` | can be a dict key |
| Build from a rule | `{x**2 for x in range(5)}` | set comprehension |
