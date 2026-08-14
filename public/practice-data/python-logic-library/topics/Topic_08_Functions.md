# Topic Deep-Dive 8 — Functions (30 Questions)

**Focus:** closures, generators, recursion, decorators, higher-order functions, argument tricks.

**How to practice:** Read the task, write your own code, use the hint if stuck, then check the solution.

---

## Question 1: Function with type hints

**What to do:** Write `add(a: int, b: int) -> int` with type hints and a docstring, then call it.

**Hint:** Hints go after parameter names and after `->` for the return type.

**Solution:**

```python
def add(a: int, b: int) -> int:
    """Return the sum of two integers."""
    return a + b

print(add(3, 4))
print(add.__doc__)
```

**Logic:** Hints document intent; `__doc__` stores the docstring — both are readable at runtime.

---

## Question 2: Multiple return values as a dict

**What to do:** Write `stats(numbers)` returning a DICT with min, max, and average.

**Hint:** Return `{"min": ..., "max": ..., "avg": ...}` — labeled results.

**Solution:**

```python
def stats(numbers):
    return {
        "min": min(numbers),
        "max": max(numbers),
        "avg": sum(numbers) / len(numbers),
    }

print(stats([4, 8, 6]))
```

**Logic:** Dicts make multi-value returns self-documenting.

---

## Question 3: The default-mutable-argument trap

**What to do:** Write `append_item(item, items=[])` and explain why the list GROWS between calls. Then fix it using `None`.

**Hint:** Default values are created ONCE at function definition — not per call.

**Solution:**

```python
def append_item_buggy(item, items=[]):
    items.append(item)
    return items

print(append_item_buggy(1))   # [1]
print(append_item_buggy(2))   # [1, 2] — the SAME list!

def append_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(append_item(1))   # [1]
print(append_item(2))   # [2] — fresh list each call
```

**Logic:** The `None` default + create-inside pattern is the standard fix.

---

## Question 4: Function factory (closure)

**What to do:** Write `make_adder(n)` that returns a function which adds n to its argument. Use it to make `add5 = make_adder(5)`.

**Hint:** The inner function remembers `n` from the enclosing scope — that's a closure.

**Solution:**

```python
def make_adder(n):
    def adder(x):
        return x + n
    return adder

add5 = make_adder(5)
add10 = make_adder(10)

print(add5(3))    # 8
print(add10(3))   # 13
```

**Logic:** Returning functions turns functions into configurable machines.

---

## Question 5: Functions as arguments

**What to do:** Write `apply_twice(f, x)` that applies function f to x TWICE (f(f(x))). Test with `lambda x: x + 3`.

**Hint:** `return f(f(x))`.

**Solution:**

```python
def apply_twice(f, x):
    return f(f(x))

result = apply_twice(lambda x: x + 3, 10)

print(result)
```

**Logic:** Passing functions around is the heart of higher-order programming. (Answer: 16)

---

## Question 6: reduce() — product of a list

**What to do:** Compute the product of `[1, 2, 3, 4, 5]` using `functools.reduce`.

**Hint:** `reduce(lambda a, b: a * b, numbers)`.

**Solution:**

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

print(reduce(lambda a, b: a * b, numbers))
```

**Logic:** reduce repeatedly combines pairs into one running result. (Answer: 120)

---

## Question 7: Generator — countdown

**What to do:** Write a generator `countdown(n)` that yields n, n-1, ..., 1. Consume it with a for loop.

**Hint:** A function with `yield` instead of `return` IS a generator.

**Solution:**

```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for number in countdown(5):
    print(number, end=" ")
print()
```

**Logic:** `yield` pauses the function and hands out one value at a time.

---

## Question 8: Generator — Fibonacci

**What to do:** Write a generator `fibonacci(limit)` yielding Fibonacci numbers up to `limit`, and print them all.

**Hint:** The two-variable trick inside a while loop with `yield`.

**Solution:**

```python
def fibonacci(limit):
    a, b = 0, 1
    while a <= limit:
        yield a
        a, b = b, a + b

print(list(fibonacci(50)))
```

**Logic:** Generators make infinite-ish sequences finite on demand.

---

## Question 9: Generator — even numbers

**What to do:** Write a generator `evens(n)` yielding even numbers from 0 up to n, and sum them with `sum()`.

**Hint:** Loop with a step of 2, yielding each value.

**Solution:**

```python
def evens(n):
    for number in range(0, n + 1, 2):
        yield number

print(sum(evens(10)))
```

**Logic:** Generators work directly with `sum`, `list`, `max` — any consumer.

---

## Question 10: Recursion — sum of digits

**What to do:** Write a recursive `digit_sum(n)`: digit_sum(1234) = 4 + digit_sum(123).

**Hint:** Base case: single digit (`n < 10`) returns n. Otherwise `n % 10 + digit_sum(n // 10)`.

**Solution:**

```python
def digit_sum(n):
    if n < 10:
        return n
    return n % 10 + digit_sum(n // 10)

print(digit_sum(1234))
```

**Logic:** Peel one digit and recurse on the rest. (Answer: 10)

---

## Question 11: Recursion — power

**What to do:** Write recursive `power(x, n)` computing x^n.

**Hint:** Base case `n == 0` returns 1; otherwise `x * power(x, n - 1)`.

**Solution:**

```python
def power(x, n):
    if n == 0:
        return 1
    return x * power(x, n - 1)

print(power(2, 10))
```

**Logic:** Each call multiplies once and shrinks n — until the base case. (Answer: 1024)

---

## Question 12: Recursion — reverse a string

**What to do:** Write recursive `reverse(text)`: reverse("abc") = "c" + reverse("ab").

**Hint:** Base case: empty string returns "". Otherwise `text[-1] + reverse(text[:-1])`.

**Solution:**

```python
def reverse(text):
    if text == "":
        return ""
    return text[-1] + reverse(text[:-1])

print(reverse("python"))
```

**Logic:** Take the last character, recurse on the rest.

---

## Question 13: Recursion — GCD (Euclid)

**What to do:** Write recursive `gcd(a, b)` using Euclid's algorithm: gcd(a, b) = gcd(b, a % b), stopping when b == 0.

**Hint:** Base case `if b == 0: return a`.

**Solution:**

```python
def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)

print(gcd(36, 60))
```

**Logic:** Euclid's 2000-year-old algorithm, in 4 lines. (Answer: 12)

---

## Question 14: Recursion — sum of a list

**What to do:** Write recursive `list_sum(numbers)`: sum = first element + sum of the rest.

**Hint:** Base case: empty list returns 0.

**Solution:**

```python
def list_sum(numbers):
    if not numbers:
        return 0
    return numbers[0] + list_sum(numbers[1:])

print(list_sum([1, 2, 3, 4, 5]))
```

**Logic:** Slicing `[1:]` passes a smaller list each call. (Answer: 15)

---

## Question 15: Recursion — binary search

**What to do:** Write recursive `binary_search(numbers, target, low, high)` returning the index of target or -1.

**Hint:** Compare the middle element; recurse on the correct half; base case `low > high`.

**Solution:**

```python
def binary_search(numbers, target, low, high):
    if low > high:
        return -1
    mid = (low + high) // 2
    if numbers[mid] == target:
        return mid
    if numbers[mid] < target:
        return binary_search(numbers, target, mid + 1, high)
    return binary_search(numbers, target, low, mid - 1)

numbers = [1, 3, 5, 7, 9, 11]
print(binary_search(numbers, 7, 0, len(numbers) - 1))
```

**Logic:** Halve the search space each call — O(log n) instead of O(n).

---

## Question 16: Memoization by hand

**What to do:** Write a Fibonacci function that remembers results in a dict so it doesn't recompute.

**Hint:** Check the cache dict before recursing; store results after computing.

**Solution:**

```python
cache = {}

def fib(n):
    if n in cache:
        return cache[n]
    if n < 2:
        result = n
    else:
        result = fib(n - 1) + fib(n - 2)
    cache[n] = result
    return result

print(fib(30))
```

**Logic:** Memoization turns exponential time into near-linear time.

---

## Question 17: lru_cache decorator

**What to do:** Achieve the same Fibonacci speed-up with `@lru_cache` in one line.

**Hint:** `from functools import lru_cache`; decorate with `@lru_cache(maxsize=None)`.

**Solution:**

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(30))
```

**Logic:** The decorator does Question 16's bookkeeping automatically.

---

## Question 18: Write your own decorator (timing)

**What to do:** Write a decorator `timed` that prints how long a function took to run. Apply it to a function that sums range(1_000_000).

**Hint:** Use `time.perf_counter()` around the call inside a wrapper; use `functools.wraps`.

**Solution:**

```python
import time
from functools import wraps

def timed(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(func.__name__, "took", round(elapsed, 4), "seconds")
        return result
    return wrapper

@timed
def big_sum():
    return sum(range(1_000_000))

print(big_sum())
```

**Logic:** A decorator wraps a function with extra behavior — timing here.

---

## Question 19: Decorator that repeats a function

**What to do:** Write `repeat(n)` — a decorator FACTORY — that runs the decorated function n times.

**Hint:** Outer function takes n, returns a decorator whose wrapper loops n times.

**Solution:**

```python
from functools import wraps

def repeat(n):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def greet():
    print("Hello!")

greet()
```

**Logic:** A factory-decorator needs three nesting levels — parameters on decorators.

---

## Question 20: nonlocal — closure with state

**What to do:** Write `make_counter()` returning an `increment()` function that adds 1 to a private count each call and returns it.

**Hint:** `nonlocal count` lets the inner function modify the outer variable.

**Solution:**

```python
def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

counter = make_counter()
print(counter())
print(counter())
print(counter())
```

**Logic:** `nonlocal` binds the inner function to the enclosing scope's variable.

---

## Question 21: Closure with reset

**What to do:** Upgrade the counter: return TWO functions — `increment(step=1)` and `reset()`.

**Hint:** Both closures share the same enclosing `count`.

**Solution:**

```python
def make_counter(start=0):
    count = start

    def increment(step=1):
        nonlocal count
        count += step
        return count

    def reset():
        nonlocal count
        count = start

    return increment, reset

increment, reset = make_counter(10)
print(increment())   # 11
print(increment(5))  # 16
reset()
print(increment())   # 11
```

**Logic:** Multiple closures over one scope = a tiny object with private state.

---

## Question 22: lambda with multi-key sorting

**What to do:** Given students (name, marks), sort by marks DESCENDING, breaking ties by name ascending, using one sorted() call.

**Hint:** `key=lambda s: (-s["marks"], s["name"])` — negating flips the order.

**Solution:**

```python
students = [
    {"name": "Amit", "marks": 85},
    {"name": "Bina", "marks": 92},
    {"name": "Chetan", "marks": 85},
]

ranked = sorted(students, key=lambda s: (-s["marks"], s["name"]))

for student in ranked:
    print(student["name"], student["marks"])
```

**Logic:** The minus sign gives descending order inside a composite key.

---

## Question 23: lambda with map over tuples

**What to do:** Given `pairs = [(1, 2), (3, 4)]`, double each second element using `map` and a lambda.

**Hint:** `map(lambda p: (p[0], p[1] * 2), pairs)`.

**Solution:**

```python
pairs = [(1, 2), (3, 4)]

result = list(map(lambda p: (p[0], p[1] * 2), pairs))

print(result)
```

**Logic:** map applies the transformation to each pair. (Answer: [(1,4), (3,8)])

---

## Question 24: Unpacking a list into *args

**What to do:** Given `numbers = [3, 4]`, call `add(a, b)` with the list unpacked as arguments.

**Hint:** `add(*numbers)` — the star expands the list positionally.

**Solution:**

```python
def add(a, b):
    return a + b

numbers = [3, 4]

print(add(*numbers))
```

**Logic:** `*` splats a sequence into separate positional arguments.

---

## Question 25: Passing a dict as **kwargs

**What to do:** Given `data = {"name": "Rahul", "age": 20}`, call `introduce(**data)` where the function takes name and age parameters.

**Hint:** `**` expands a dict into keyword arguments.

**Solution:**

```python
def introduce(name, age):
    print(name, "is", age, "years old")

data = {"name": "Rahul", "age": 20}

introduce(**data)
```

**Logic:** `**` maps dict keys to parameter names — the bridge between data and functions.

---

## Question 26: Recursion — Tower of Hanoi

**What to do:** Write a recursive solver that prints the moves to move n disks from peg A to C using B as the helper. Test with 3 disks.

**Hint:** Move n-1 to the helper, move the biggest disk, move n-1 to the target.

**Solution:**

```python
def hanoi(n, source, helper, target):
    if n == 1:
        print("Move disk from", source, "to", target)
        return
    hanoi(n - 1, source, target, helper)
    print("Move disk from", source, "to", target)
    hanoi(n - 1, helper, source, target)

hanoi(3, "A", "B", "C")
```

**Logic:** The definition is recursive: solve a smaller tower twice around one direct move. (3 disks → 7 moves)

---

## Question 27: Recursion — flatten any nesting

**What to do:** Write `flatten(items)` that converts `[1, [2, [3, [4]]], 5]` into `[1, 2, 3, 4, 5]`.

**Hint:** If an item is a list, recurse and extend; otherwise append.

**Solution:**

```python
def flatten(items):
    result = []
    for item in items:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

print(flatten([1, [2, [3, [4]]], 5]))
```

**Logic:** Recursion is the natural tool for arbitrarily deep structures.

---

## Question 28: Return a summary dict from a function

**What to do:** Write `analyze(text)` returning a dict with word count, character count, and unique-word count.

**Hint:** Use split, len, and a set.

**Solution:**

```python
def analyze(text):
    words = text.split()
    return {
        "words": len(words),
        "characters": len(text),
        "unique_words": len(set(words)),
    }

print(analyze("the cat and the dog"))
```

**Logic:** Functions that return structured summaries are the backbone of data pipelines.

---

## Question 29: Compose two functions

**What to do:** Write `compose(f, g)` returning a function that computes f(g(x)). Build `add_then_double = compose(double, increment)` and test it.

**Hint:** `return lambda x: f(g(x))`.

**Solution:**

```python
def compose(f, g):
    return lambda x: f(g(x))

double = lambda x: x * 2
increment = lambda x: x + 1

add_then_double = compose(double, increment)

print(add_then_double(5))
```

**Logic:** Composition chains simple functions into pipelines. (Answer: 12)

---

## Question 30: validate → process → report design

**What to do:** Write three functions — `validate(age)` (raises ValueError if age < 0), `process(age)` (returns age in days), `report(age)` (calls both, prints the result or the error) — and test with 25 and -5.

**Hint:** `report` wraps the pipeline in try/except.

**Solution:**

```python
def validate(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

def process(age):
    return age * 365

def report(age):
    try:
        days = process(validate(age))
        print(age, "years is about", days, "days")
    except ValueError as e:
        print("Error:", e)

report(25)
report(-5)
```

**Logic:** Small functions with single jobs, orchestrated by one caller — professional structure.

---

## Functions recap

- **Type hints & docstrings** (Q1) — documentation that lives in code.
- **Closures & factories** — `make_adder`, counters, state (Q4, 20–21).
- **Higher-order functions** — functions in/out, apply_twice, compose (Q5, 29).
- **reduce/map/filter + lambda** (Q6, 22–23).
- **Generators** — yield, lazy sequences (Q7–9).
- **Recursion** — digits, power, reverse, GCD, search, Hanoi, flatten (Q10–15, 26–27).
- **Memoization** — manual cache and lru_cache (Q16–17).
- **Decorators** — timing, repeat, factory-decorators (Q18–19).
- **Argument tricks** — `*args`, `**kwargs`, defaults (Q3, 24–25).
- **Design** — validate/process/report separation (Q30).
