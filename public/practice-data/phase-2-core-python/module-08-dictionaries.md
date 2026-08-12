# Module 8: Dictionaries

## What is a Dictionary?

A **dictionary** stores data as key-value pairs. Keys must be unique and immutable (strings, numbers, tuples). Values can be anything.

```python
person = {
    "name": "Mahesh",
    "age": 25,
    "city": "Mumbai"
}

print(person["name"])  # Mahesh
print(len(person))     # 3
```

---

## Creating, Accessing, Updating, and Deleting Items

```python
student = {}

# Adding items
student["name"] = "Rohan"
student["marks"] = 85

# Updating
student["marks"] = 90

# Accessing safely
print(student.get("name"))       # Rohan
print(student.get("grade", "N/A"))  # N/A

# Deleting
del student["marks"]
# or
marks = student.pop("marks", None)
```

---

## Important Dictionary Methods

| Method | Description | Example |
| --- | --- | --- |
| `keys()` | All keys | `dict.keys()` |
| `values()` | All values | `dict.values()` |
| `items()` | All key-value pairs | `dict.items()` |
| `get(key, default)` | Safe access | `dict.get("age", 0)` |
| `setdefault(key, val)` | Set value if key missing | `dict.setdefault("count", 0)` |
| `update(dict)` | Merge dictionaries | `dict1.update(dict2)` |
| `pop(key)` | Remove and return value | `dict.pop("age")` |
| `popitem()` | Remove and return last item | `dict.popitem()` |
| `copy()` | Shallow copy | `new = dict.copy()` |
| `clear()` | Remove all items | `dict.clear()` |

```python
for key, value in person.items():
    print(f"{key}: {value}")
```

---

## Dictionary Comprehension

```python
# Squares dictionary
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Filter scores above 80
scores = {"Mahesh": 85, "Rohan": 72, "Priya": 91}
passed = {k: v for k, v in scores.items() if v >= 80}
print(passed)  # {'Mahesh': 85, 'Priya': 91}
```

---

## Nested Dictionaries

```python
company = {
    "emp1": {"name": "Mahesh", "role": "Data Scientist"},
    "emp2": {"name": "Priya", "role": "Engineer"}
}

print(company["emp1"]["name"])  # Mahesh
```

---

## Iterating Through Dictionaries

```python
person = {"name": "Mahesh", "age": 25, "city": "Mumbai"}

for key in person:
    print(key)

for value in person.values():
    print(value)

for key, value in person.items():
    print(f"{key} = {value}")
```

---

## Dictionary vs JSON

Python dictionaries look very similar to JSON, but they are not the same.

| Dictionary | JSON |
| --- | --- |
| Python object | String format |
| Keys can be any immutable type | Keys must be strings |
| Uses `True`, `False`, `None` | Uses `true`, `false`, `null` |
| Used in Python code | Used for data exchange |

You can convert between them using the `json` module:

```python
import json

data = {"name": "Mahesh", "age": 25}
json_string = json.dumps(data)
print(json_string)  # {"name": "Mahesh", "age": 25}

parsed = json.loads(json_string)
print(parsed)  # {'name': 'Mahesh', 'age': 25}
```

---

## Common Mistakes with Dictionaries

### 1. `d[key]` raises; `d.get(key)` returns `None`

```python
d = {"name": "Mahesh", "age": 25}

d["missing"]              # ❌ KeyError: 'missing'
print(d.get("missing"))   # None        ← no error
print(d.get("missing", 0))  # 0         ✅ supply a sensible default
```

`get()` looks safer, and its danger is that the failure moves somewhere else:

```python
total = d.get("missing") + 1
# ❌ TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'
```

The traceback now points at the arithmetic, not at the missing key. Pass a default whenever you intend to use the result.

### 2. Using `or` for a default when the value can be `0`

```python
counts = {"a": 0}

print(counts.get("a") or 5)   # 5   ❌ 0 is falsy, so `or` replaced a real value
print(counts.get("a", 5))     # 0   ✅ the key exists; its value is 0
```

`or` cannot tell "missing" from "present but zero, empty or False". In counting and pricing code that is a real bug that reports plausible numbers.

### 3. Changing the dictionary while looping over it

```python
d = {"a": 1, "b": 2, "c": 3}
for k in d:
    if d[k] == 2:
        del d[k]
# ❌ RuntimeError: dictionary changed size during iteration
```

Two safe options:

```python
d = {"a": 1, "b": 2, "c": 3}
d = {k: v for k, v in d.items() if v != 2}   # ✅ build a new one

for k in list(d):        # ✅ iterate a snapshot of the keys
    if d[k] == 2:
        del d[k]
```

Unlike the list version of this mistake, the dictionary one **does** raise. Be grateful.

### 4. `copy()` is shallow

```python
original = {"scores": [1, 2]}
copied = original.copy()
copied["scores"].append(3)
print(original)   # {'scores': [1, 2, 3]}   ← the inner list is shared
```

Use `copy.deepcopy()` when the values are themselves lists or dictionaries — the same rule as Module 6.

### 5. Keys must be hashable

```python
{[1, 2]: "x"}   # ❌ TypeError: unhashable type: 'list'
{(1, 2): "x"}   # ✅ tuples work
```

### 6. `True` and `1` are the same key

```python
print({1: "int", True: "bool"})   # {1: 'bool'}
print({1.0: "f", 1: "i"})         # {1.0: 'i'}
```

Because `1 == True` and `1 == 1.0`, the later value overwrites the earlier one and **the first key is the one that survives**. Duplicate literal keys behave the same way:

```python
print({"a": 1, "a": 2})   # {'a': 2}   ← no warning at all
```

### 7. Expecting `sorted(d)` to sort by value

Iterating a dictionary gives you **keys**, in insertion order.

```python
scores = {"z": 1, "a": 2, "m": 3}

print(list(scores.keys()))   # ['z', 'a', 'm']   ← insertion order (Python 3.7+)
print(sorted(scores))        # ['a', 'm', 'z']   ← sorts the KEYS

# Sort by value:
print(sorted(scores.items(), key=lambda kv: kv[1], reverse=True))
# [('m', 3), ('a', 2), ('z', 1)]
```

### 8. Reinventing counting and grouping

```python
words = ["a", "b", "a", "c", "a"]

counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1     # ✅ the idiom worth memorising
print(counts)   # {'a': 3, 'b': 1, 'c': 1}

from collections import Counter
print(dict(Counter(words)))              # {'a': 3, 'b': 1, 'c': 1}
```

For grouping, `setdefault` avoids a `KeyError` on the first item:

```python
inventory = {}
inventory.setdefault("fruit", []).append("apple")
inventory.setdefault("fruit", []).append("mango")
print(inventory)   # {'fruit': ['apple', 'mango']}
```

### 9. Assuming a dictionary survives a JSON round trip unchanged

JSON keys are **always strings**. Anything else is converted, quietly.

```python
import json

print(json.dumps({1: "a"}))              # '{"1": "a"}'    ← key became a string
print(json.loads(json.dumps({1: "a"})))  # {'1': 'a'}      ← and stays a string

json.dumps({(1, 2): "x"})
# ❌ TypeError: keys must be str, int, float, bool or None, not tuple
```

Python's `True` and `None` also change spelling on the way out — `json.dumps({"ok": True})` gives `'{"ok": true}'` and `None` becomes `null`. This matters the moment you save a dictionary to a file and load it back with integer IDs.

> ⚠️ Mistakes 1, 2 and 6 all produce **plausible wrong answers** rather than errors. A missing key defaulting to `None`, a real `0` replaced by `or`, a `True` silently overwriting a `1` — none of them raises, and all of them will happily flow into a report. When a dictionary lookup feeds a calculation, be explicit about what "missing" should mean.
>

---

## Quick Reference

| Task | Syntax | Note |
| --- | --- | --- |
| Create | `{"a": 1}` | |
| Empty | `{}` | this is a dict, **not** a set |
| Access (raises) | `d["a"]` | `KeyError` if missing |
| Access (safe) | `d.get("a")` | `None` if missing |
| Access with a default | `d.get("a", 0)` | ✅ prefer this |
| Add / update | `d["b"] = 2` | same syntax for both |
| Merge | `d1.update(d2)` | `d2` wins on conflicts |
| Merge into a new dict | `d3 = d1 \| d2` | Python 3.9+ |
| Delete (raises) | `del d["a"]` | `KeyError` if missing |
| Delete (safe) | `d.pop("a", None)` | returns the value |
| Remove the last item | `d.popitem()` | returns `(key, value)` |
| Contains a key? | `"a" in d` | checks **keys**, not values |
| Number of items | `len(d)` | |
| All keys | `d.keys()` | a live view |
| All values | `d.values()` | a live view |
| All pairs | `d.items()` | a live view |
| Loop over pairs | `for k, v in d.items():` | the usual loop |
| Default then use | `d.setdefault("k", []).append(x)` | grouping idiom |
| Count occurrences | `d[x] = d.get(x, 0) + 1` | counting idiom |
| Sort by key | `sorted(d)` | returns a list of keys |
| Sort by value | `sorted(d.items(), key=lambda kv: kv[1])` | returns a list of pairs |
| Largest by value | `max(d, key=d.get)` | returns the key |
| Build from a rule | `{k: v*2 for k, v in d.items()}` | dict comprehension |
| Filter | `{k: v for k, v in d.items() if v > 5}` | dict comprehension |
| Invert | `{v: k for k, v in d.items()}` | values must be unique |
| From two lists | `dict(zip(keys, values))` | |
| Unique keys from a list | `dict.fromkeys(items)` | order-preserving dedupe |
| Shallow copy | `d.copy()` | nested values are shared |
| Deep copy | `copy.deepcopy(d)` | fully independent |
| To a JSON string | `json.dumps(d)` | keys become strings |
| From a JSON string | `json.loads(s)` | |
