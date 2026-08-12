# Module 5: Strings

## What is a String?

A **string** is a sequence of characters enclosed in single, double, or triple quotes. Strings are used to store and manipulate text.

```python
name = 'Mahesh'
city = "Mumbai"
quote = """Python is powerful."""

print(name)    # Mahesh
print(city)    # Mumbai
print(quote)   # Python is powerful.
```

Strings are **immutable** in Python. Once created, you cannot change individual characters directly.

```python
text = "hello"
# text[0] = "H"  # ❌ TypeError: 'str' object does not support item assignment
```

---

## Creating and Accessing Strings

```python
text = "Python"

print(text[0])    # P
print(text[-1])   # n (last character)
print(len(text))  # 6
```

---

## String Indexing and Slicing

Slicing syntax: `string[start:end:step]`

```python
text = "Python Programming"

print(text[0:6])       # Python
print(text[7:])        # Programming
print(text[:6])        # Python
print(text[::2])       # Pto rgamn
print(text[::-1])      # gnimmargorP nohtyP
```

---

## Important String Methods

| Method | Description | Example |
| --- | --- | --- |
| `upper()` | Convert to uppercase | `"python".upper()` → `"PYTHON"` |
| `lower()` | Convert to lowercase | `"PYTHON".lower()` → `"python"` |
| `title()` | Capitalize each word | `"mahesh dongare".title()` → `"Mahesh Dongare"` |
| `capitalize()` | Capitalize first letter only | `"python".capitalize()` → `"Python"` |
| `strip()` | Remove spaces from both ends | `"  hello  ".strip()` → `"hello"` |
| `lstrip()` / `rstrip()` | Remove spaces from left / right | `"  hello".lstrip()` → `"hello"` |
| `find()` | Return index of substring (or -1) | `"python".find("th")` → `2` |
| `index()` | Return index of substring (raises error if not found) | `"python".index("th")` → `2` |
| `count()` | Count occurrences | `"banana".count("a")` → `3` |
| `replace()` | Replace occurrences | `"hello world".replace("world", "Python")` → `"hello Python"` |
| `split()` | Split into list | `"a,b,c".split(",")` → `['a', 'b', 'c']` |
| `join()` | Join list into string | `"-".join(['a', 'b', 'c'])` → `"a-b-c"` |
| `startswith()` / `endswith()` | Check prefix / suffix | `"python".startswith("py")` → `True` |
| `isalpha()` | Letters only? | `"Python".isalpha()` → `True` |
| `isdigit()` | Digits only? | `"123".isdigit()` → `True` |
| `isalnum()` | Letters or digits? | `"python3".isalnum()` → `True` |
| `isspace()` | Whitespace only? | `"   ".isspace()` → `True` |

```python
email = "  Mahesh.Dongare@Example.com  "
email = email.strip().lower()
print(email)  # mahesh.dongare@example.com
```

---

## String Concatenation and Repetition

```python
first = "Mahesh"
last = "Dongare"
full = first + " " + last
print(full)  # Mahesh Dongare

print("-" * 20)  # --------------------
```

---

## Escape Characters and Raw Strings

| Escape | Meaning |
| --- | --- |
| `\n` | New line |
| `\t` | Tab |
| `\\` | Backslash |
| `\'` | Single quote |
| `\"` | Double quote |

```python
print("Line 1\nLine 2")
print("Tab\tSeparated")

# Raw string — treats backslashes as literal characters
path = r"C:\Users\Mahesh\Documents"
print(path)  # C:\Users\Mahesh\Documents
```

---

## String Formatting (f-strings Deep Dive)

f-strings are the cleanest way to combine text and variables.

```python
name = "Mahesh"
age = 25
pi = 3.14159

print(f"My name is {name} and I am {age} years old.")
print(f"Next year I will be {age + 1}.")
print(f"Pi = {pi:.2f}")        # Pi = 3.14
print(f"Number = {42:05d}")    # Number = 00042
print(f"{name:>15}")           # right-aligned in 15 chars
print(f"{name:<15}")           # left-aligned in 15 chars
print(f"{name:^15}")           # center-aligned in 15 chars
```

---

## Common Mistakes with Strings

### 1. Forgetting that string methods return a new string

This is the single most common string bug, and it raises nothing.

```python
name = "mahesh"
name.upper()
print(name)          # mahesh   ← unchanged!

name = name.upper()  # ✅ you must reassign
print(name)          # MAHESH
```

Strings are **immutable**, so no method can ever modify one in place. `upper()`, `strip()`, `replace()` and every other method hand you a *new* string and leave the original alone. The same trap applies to `replace`:

```python
text = "hello world"
text.replace("world", "python")
print(text)          # hello world   ← the replacement was thrown away
```

### 2. Using `find()` in an `if` statement

`find()` returns `-1` when the substring is missing — and `-1` is **truthy**.

```python
word = "python"

print(word.find("p"))        # 0    ← found at the start
print(bool(word.find("p")))  # False  ← 0 is falsy!
print(word.find("z"))        # -1   ← not found
print(bool(word.find("z")))  # True   ← -1 is truthy!
```

So `if word.find("p"):` is `False` when the substring *is* there, and `if word.find("z"):` is `True` when it is *not*. Exactly backwards, and it never raises. Use `in` instead:

```python
word = "python"

if "p" in word:       # ✅ clear and correct
    print("found")    # found
```

Use `find()` only when you actually need the position, and compare explicitly: `if word.find("p") != -1:`.

### 3. `index()` raises where `find()` returns -1

```python
"python".find("z")    # -1
"python".index("z")   # ❌ ValueError: substring not found
```

Both are useful — just know which one you called. `find` for "maybe it is there", `index` for "it must be there or something is wrong".

### 4. `split(" ")` versus `split()`

They behave differently on repeated spaces, and the difference shows up the moment you touch real, untidy text.

```python
line = "a  b   c"          # note the double and triple spaces

print(line.split(" "))     # ['a', '', 'b', '', '', 'c']   ← empty strings!
print(line.split())        # ['a', 'b', 'c']               ✅
```

Bare `split()` splits on *runs* of any whitespace and discards empties. `split(" ")` splits on each single space literally. Empty strings on the same theme:

```python
print("".split())          # []
print("".split(","))       # ['']   ← a list containing one empty string
```

### 5. Thinking `strip(".txt")` removes the suffix

`strip()` takes a **set of characters**, not a substring. It removes any of those characters from both ends, repeatedly, until it hits something else.

```python
print("report.txt".strip(".txt"))       # 'repor'   ← not 'report'!
print("banana".strip("ba"))             # 'nan'     ← stripped b and a from both ends
print("xxhelloxx".strip("x"))           # 'hello'   ← this is what strip is for
```

`".txt"` is read as the character set `{'.', 't', 'x'}`. Working in from the right of `"report.txt"` it removes `t`, `x`, `t`, `.` — and then keeps going, removing the `t` of `"report"` too, stopping only at `r`. You are left with `'repor'`. To remove an actual suffix:

```python
print("report.txt".removesuffix(".txt"))   # 'report'   ✅ (Python 3.9+)
```

### 6. Comparing strings with `is` instead of `==`

`==` compares **value**. `is` compares **identity** — whether they are the same object in memory.

```python
a = "hello"
b = "hello"
print(a == b)   # True
print(a is b)   # True    ← Python interned these two literals

d = "".join(["h", "e", "l", "l", "o"])
print(d == a)   # True    ✅ the value is the same
print(d is a)   # False   ← a different object, built at runtime
```

`is` appearing to work on short literals is what makes this dangerous: it passes in your test and fails on the string that came from a file. **Always use `==` for text.**

### 7. Building a string with `+=` in a loop

Every `+=` on a string creates a whole new string and copies everything across, because strings cannot be modified in place.

```python
# Slow — measured on 40,000 characters
s = ""
for i in range(40000):
    s += "x"                          # 20.45 ms

# Fast
s = "".join("x" for _ in range(40000))  # 2.61 ms  → 7.8x faster
```

At 40,000 characters this is 7.8× on this machine; the gap widens as the string grows. Build a list and `join` it once at the end.

> 💡 **Tip:** `"" in "python"` is `True`. The empty string is considered present in every string, which can quietly break a validity check written as `if user_input in allowed_text:`.
>

---

## Quick Reference

| Task | Syntax | Result |
| --- | --- | --- |
| Length | `len(s)` | `len("Python")` → `6` |
| First / last character | `s[0]` / `s[-1]` | `"Python"[-1]` → `'n'` |
| Slice | `s[start:end]` | `"Python"[0:3]` → `'Pyt'` |
| Every other character | `s[::2]` | `"Python"[::2]` → `'Pto'` |
| Reverse | `s[::-1]` | `"Python"[::-1]` → `'nohtyP'` |
| Uppercase / lowercase | `s.upper()` / `s.lower()` | returns a **new** string |
| Title case | `s.title()` | `"raj kumar".title()` → `'Raj Kumar'` |
| Trim whitespace | `s.strip()` | `"  hi  ".strip()` → `'hi'` |
| Remove a suffix | `s.removesuffix(".txt")` | `'report'` |
| Contains? | `sub in s` | `"th" in "python"` → `True` |
| Position (or -1) | `s.find(sub)` | `"python".find("z")` → `-1` |
| Position (or error) | `s.index(sub)` | raises `ValueError` |
| Count occurrences | `s.count(sub)` | `"banana".count("a")` → `3` |
| Replace | `s.replace(old, new)` | returns a **new** string |
| Split on whitespace | `s.split()` | discards empty pieces |
| Split on a character | `s.split(",")` | keeps empty pieces |
| Join a list | `"-".join(items)` | `'a-b-c'` |
| Starts / ends with | `s.startswith(p)` / `s.endswith(p)` | `True` / `False` |
| Letters only? | `s.isalpha()` | `"Python".isalpha()` → `True` |
| Digits only? | `s.isdigit()` | `"123".isdigit()` → `True` |
| Insert a value | `f"{name}"` | `f"Hi {name}"` |
| 2 decimal places | `f"{x:.2f}"` | `f"{3.14159:.2f}"` → `'3.14'` |
| Pad with zeros | `f"{n:05d}"` | `f"{42:05d}"` → `'00042'` |
| Align right / left / centre | `f"{s:>10}"` / `f"{s:<10}"` / `f"{s:^10}"` | width 10 |
| Raw string (no escapes) | `r"C:\path"` | backslashes stay literal |
