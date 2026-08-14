# 🔑 Phase 3 — Solutions

A worked solution for every question in [questions.md](questions.md).

**These stay inside Phase 3's rules.** Everything from Phases 1-2, plus functions, `*args`/`**kwargs`, lambdas, `map`/`filter`/`reduce`, recursion, type hints, the standard library, file I/O and `try`/`except`. No classes, except where a question needs a custom exception. If a solution here uses something you have not met yet, that is a bug; tell me.

Every solution was **executed against the full test suite** — 166 checks across 50 questions — and passes all of them.

> ⚠️ Reading a solution you have not attempted feels like learning and is not. If you open one, close it, delete what you wrote, and reproduce it from memory. Recognising correct code and writing it from a blank file are different skills, and only the second one is short.
>

**There is more than one right answer.** These are written to be *readable*, not shortest. If yours passes and you can explain it line by line, yours is correct.

This phase grades **return values, not printed text**. The grader imports your file and calls your functions, so **the names must match exactly** - a perfect `fact()` scores zero when the question asked for `factorial()`. Some checks require an exception to be raised.

```bash
cd tests
python run_tests.py --new 4     # write your own first
python run_tests.py 4 --diff    # then check it
```

---

## Contents

| # | Question | Checks |
| --- | --- | --- |
| Q1 | [Greet](#q1-greet) | 3 |
| Q2 | [Rectangle Area with Defaults](#q2-rectangle-area-with-defaults) | 4 |
| Q3 | [Multiple Return Values](#q3-multiple-return-values) | 3 |
| Q4 | [Even Number Filter](#q4-even-number-filter) | 4 |
| Q5 | [Celsius Converter with Validation](#q5-celsius-converter-with-validation) | 4 |
| Q6 | [Variable Arguments](#q6-variable-arguments) | 4 |
| Q7 | [Keyword Arguments](#q7-keyword-arguments) | 2 |
| Q8 | [Mixed Arguments](#q8-mixed-arguments) | 2 |
| Q9 | [Scope Demonstration](#q9-scope-demonstration) | 4 |
| Q10 | [The Mutable Default Trap](#q10-the-mutable-default-trap) | 4 |
| Q11 | [Lambda Practice](#q11-lambda-practice) | 5 |
| Q12 | [map, filter, reduce](#q12-map-filter-reduce) | 3 |
| Q13 | [Recursive Factorial](#q13-recursive-factorial) | 5 |
| Q14 | [Recursive Fibonacci](#q14-recursive-fibonacci) | 5 |
| Q15 | [Memoized Fibonacci](#q15-memoized-fibonacci) | 4 |
| Q16 | [Recursive Sum of Digits](#q16-recursive-sum-of-digits) | 4 |
| Q17 | [Recursive Power](#q17-recursive-power) | 4 |
| Q18 | [Tower of Hanoi](#q18-tower-of-hanoi) | 4 |
| Q19 | [Recursive Binary Search](#q19-recursive-binary-search) | 4 |
| Q20 | [Flatten a Nested List](#q20-flatten-a-nested-list) | 4 |
| Q21 | [Recursive Palindrome](#q21-recursive-palindrome) | 4 |
| Q22 | [Function Returning a Function](#q22-function-returning-a-function) | 3 |
| Q23 | [Function as an Argument](#q23-function-as-an-argument) | 3 |
| Q24 | [Simple Timing Wrapper](#q24-simple-timing-wrapper) | 4 |
| Q25 | [Build Your Own Module](#q25-build-your-own-module) | manual |
| Q26 | [The `__name__` Guard](#q26-the-name-guard) | manual |
| Q27 | [math Module Tour](#q27-math-module-tour) | 7 |
| Q28 | [random Module — Dice Simulation](#q28-random-module-dice-simulation) | 4 |
| Q29 | [random Module — Password Generator](#q29-random-module-password-generator) | 5 |
| Q30 | [datetime Basics](#q30-datetime-basics) | manual |
| Q31 | [Age Calculator](#q31-age-calculator) | 3 |
| Q32 | [os Module Exploration](#q32-os-module-exploration) | manual |
| Q33 | [sys Module](#q33-sys-module) | manual |
| Q34 | [Standard Library Scavenger Hunt](#q34-standard-library-scavenger-hunt) | manual |
| Q35 | [Write and Read](#q35-write-and-read) | 3 |
| Q36 | [Read Line by Line](#q36-read-line-by-line) | 2 |
| Q37 | [Append vs Overwrite](#q37-append-vs-overwrite) | 1 |
| Q38 | [Count File Statistics](#q38-count-file-statistics) | 1 |
| Q39 | [Copy a File](#q39-copy-a-file) | 2 |
| Q40 | [Search Within a File](#q40-search-within-a-file) | 3 |
| Q41 | [Word Frequency from a File](#q41-word-frequency-from-a-file) | 2 |
| Q42 | [CSV Write and Read](#q42-csv-write-and-read) | 2 |
| Q43 | [CSV Filtering](#q43-csv-filtering) | 1 |
| Q44 | [JSON Round Trip](#q44-json-round-trip) | 2 |
| Q45 | [JSON Update](#q45-json-update) | 3 |
| Q46 | [Log File Analyser](#q46-log-file-analyser) | 4 |
| Q47 | [Safe Division](#q47-safe-division) | 3 |
| Q48 | [Safe Integer Input](#q48-safe-integer-input) | 3 |
| Q49 | [Multiple Exception Types](#q49-multiple-exception-types) | 3 |
| Q50 | [else and finally](#q50-else-and-finally) | 2 |
| Q51 | [Raising Exceptions](#q51-raising-exceptions) | 4 |
| Q52 | [Custom Exception](#q52-custom-exception) | 3 |
| Q53 | [Assertions](#q53-assertions) | 3 |
| Q54 | [Retry Logic](#q54-retry-logic) | 3 |
| Q55 | [Exception Chaining](#q55-exception-chaining) | 3 |
| Q56 | [Robust File Processor](#q56-robust-file-processor) | 4 |
| Q57 | [Contact Manager with Persistence](#q57-contact-manager-with-persistence) | manual |
| Q58 | [CSV Data Analysis Pipeline](#q58-csv-data-analysis-pipeline) | manual |
| Q59 | [Text File Word Game](#q59-text-file-word-game) | manual |
| Q60 | [Mini Expense Tracker](#q60-mini-expense-tracker) | manual |

---

## Tier 1 — Function Basics (Q1–Q12)

### Q1. Greet

```python
def greet(name: str) -> str:
    """Return a greeting for the given name."""
    return f"Hello, {name}!"
```

**What to notice:** The docstring is the first line of the body; type hints annotate but do not enforce.

**Checked with:**

```python
greet("Priya")   # -> 'Hello, Priya!'
greet("A")   # -> 'Hello, A!'
greet("")   # -> 'Hello, !'
```

---

### Q2. Rectangle Area with Defaults

```python
def area(length: float, width: float = 1) -> float:
    """Return the area of a rectangle. Width defaults to 1."""
    return length * width
```

**What to notice:** Default parameters must come after all non-default ones.

**Checked with:**

```python
area(5, 3)   # -> 15
area(7)   # -> 7
area(0, 9)   # -> 0
area(2.5, 4)   # -> 10.0
```

---

### Q3. Multiple Return Values

```python
def stats(a, b):
    """Return (sum, difference, product, quotient). Quotient is None if b is 0."""
    if b == 0:
        quotient = None
    else:
        quotient = a / b
    return a + b, a - b, a * b, quotient
```

**What to notice:** A bare `return a, b, c` packs the values into a tuple automatically.

**Checked with:**

```python
stats(10, 4)   # -> [14, 6, 40, 2.5]
stats(10, 0)   # -> [10, 10, 0, None]
stats(-3, 3)   # -> [0, -6, -9, -1.0]
```

---

### Q4. Even Number Filter

```python
def only_evens(numbers):
    """Return a new list containing only the even numbers."""
    return [n for n in numbers if n % 2 == 0]
```

**What to notice:** A comprehension builds a NEW list, so the caller's data is untouched.

**Checked with:**

```python
only_evens([1, 2, 3, 4, 5, 6])   # -> [2, 4, 6]
only_evens([])   # -> []
only_evens([1, 3, 5])   # -> []
_x = [1,2,3]; only_evens(_x); _x   # -> [1, 2, 3]
```

---

### Q5. Celsius Converter with Validation

```python
def to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit, or None below absolute zero."""
    if celsius < -273.15:
        return None
    return celsius * 9 / 5 + 32
```

**What to notice:** Validate and return early, then do the real work.

**Checked with:**

```python
to_fahrenheit(37)   # -> 98.6
to_fahrenheit(-300)   # -> None
to_fahrenheit(0)   # -> 32.0
to_fahrenheit(-273.15)   # -> -459.66999999999996
```

---

### Q6. Variable Arguments

```python
def total(*numbers):
    """Return the sum of any number of arguments; 0 when given none."""
    return sum(numbers)
```

**What to notice:** `sum(())` is 0, so the empty case needs no special handling.

**Checked with:**

```python
total(1, 2, 3)   # -> 6
total()   # -> 0
total(5)   # -> 5
total(-1, 1)   # -> 0
```

---

### Q7. Keyword Arguments

```python
def describe(**details):
    """Print each key-value pair as 'Key: Value'."""
    for key, value in details.items():
        print(f"{key.title()}: {value}")
```

**What to notice:** `**kwargs` arrives as a dictionary, in the order the arguments were written.

**Checked with:**

```python
_out(describe, name="Rohan", age=25)   # -> 'Name: Rohan\nAge: 25'
_out(describe)   # -> ''
```

---

### Q8. Mixed Arguments

```python
def order(item, quantity=1, *extras, **options):
    """Return every parameter so the caller can see what landed where."""
    return item, quantity, extras, options
```

**What to notice:** Positional, then defaults, then `*extras` as a tuple, then `**options` as a dict.

**Checked with:**

```python
order("Pizza", 2, "extra cheese", "olives", size="large")   # -> ['Pizza', 2, ['extra cheese', 'olives'], {'size': 'large'}]
order("Tea")   # -> ['Tea', 1, [], {}]
```

---

### Q9. Scope Demonstration

```python
counter = 0

def without_global():
    """Assigning here makes a LOCAL variable; the global is untouched."""
    counter = 1
    return counter

def with_global():
    """`global` rebinds the outer name."""
    global counter
    counter = counter + 1
    return counter
```

**What to notice:** Assigning to a name inside a function makes it local for the WHOLE function.

**Checked with:**

```python
without_global()   # -> 1
counter   # -> 0
with_global()   # -> 1
counter   # -> 1
```

---

### Q10. The Mutable Default Trap

```python
def add_item_buggy(item, cart=[]):
    """The default list is created ONCE and shared between calls."""
    cart.append(item)
    return cart

def add_item(item, cart=None):
    """The fix: build a fresh list on every call."""
    if cart is None:
        cart = []
    cart.append(item)
    return cart
```

**What to notice:** The default `[]` is created once at definition time and shared by every call.

**Checked with:**

```python
add_item_buggy("apple"); add_item_buggy("banana")   # -> ['apple', 'banana']
add_item("x")   # -> ['x']
add_item("y")   # -> ['y']
add_item("z", ["seed"])   # -> ['seed', 'z']
```

---

### Q11. Lambda Practice

```python
square = lambda x: x * x
larger = lambda a, b: a if a > b else b
divisible_by_three = lambda n: n % 3 == 0

def sort_by_second(pairs):
    """Sort a list of tuples by the second element."""
    return sorted(pairs, key=lambda pair: pair[1])
```

**What to notice:** A lambda is a single expression whose value is returned automatically.

**Checked with:**

```python
square(6)   # -> 36
larger(3, 9)   # -> 9
divisible_by_three(9)   # -> True
divisible_by_three(10)   # -> False
sort_by_second([('a', 3), ('b', 1), ('c', 2)])   # -> [['b', 1], ['c', 2], ['a', 3]]
```

---

### Q12. map, filter, reduce

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

squares = list(map(lambda n: n ** 2, numbers))
divisible = list(filter(lambda n: n % 3 == 0, numbers))
product = reduce(lambda a, b: a * b, numbers)
```

**What to notice:** `map` and `filter` return lazy iterators - wrap them in `list()` to see anything.

**Checked with:**

```python
squares   # -> [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
divisible   # -> [3, 6, 9]
product   # -> 3628800
```

---

## Tier 2 — Recursion and Function Design (Q13–Q24)

### Q13. Recursive Factorial

```python
def factorial(n: int) -> int:
    """Return n! recursively. Raises ValueError for negative input."""
    if n < 0:
        raise ValueError("factorial is undefined for negative numbers")
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```

**What to notice:** The base case is what stops the recursion; without it you hit RecursionError.

**Checked with:**

```python
factorial(6)   # -> 720
factorial(0)   # -> 1
factorial(1)   # -> 1
factorial(10)   # -> 3628800
factorial(-1)   # raises ValueError
```

---

### Q14. Recursive Fibonacci

```python
def fib(n: int) -> int:
    """Recursive Fibonacci - simple, and exponentially slow."""
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

def fib_iterative(n: int) -> int:
    """Same answer, one loop, linear time."""
    current, next_one = 0, 1
    for _ in range(n):
        current, next_one = next_one, current + next_one
    return current
```

**What to notice:** Naive fib(30) makes 2,692,537 calls because it recomputes the same values.

**Checked with:**

```python
fib(10)   # -> 55
fib(0)   # -> 0
fib(1)   # -> 1
fib_iterative(30)   # -> 832040
fib_iterative(0)   # -> 0
```

---

### Q15. Memoized Fibonacci

```python
from functools import lru_cache

def fib_memo(n, cache=None):
    """Recursive Fibonacci that remembers what it has already computed."""
    if cache is None:
        cache = {}
    if n in cache:
        return cache[n]
    if n < 2:
        return n
    cache[n] = fib_memo(n - 1, cache) + fib_memo(n - 2, cache)
    return cache[n]

@lru_cache(maxsize=None)
def fib_cached(n):
    """The same idea, using the standard library."""
    if n < 2:
        return n
    return fib_cached(n - 1) + fib_cached(n - 2)
```

**What to notice:** Memoisation collapses the exponential tree into a linear walk.

**Checked with:**

```python
fib_memo(35)   # -> 9227465
fib_cached(35)   # -> 9227465
fib_memo(0)   # -> 0
fib_cached(1)   # -> 1
```

---

### Q16. Recursive Sum of Digits

```python
def digit_sum(n: int) -> int:
    """Add the digits repeatedly until one digit is left."""
    if n < 10:
        return n
    total = 0
    for character in str(n):
        total = total + int(character)
    return digit_sum(total)
```

**What to notice:** 9875 -> 29 -> 11 -> 2. The base case is a single digit.

**Checked with:**

```python
digit_sum(9875)   # -> 2
digit_sum(5)   # -> 5
digit_sum(99)   # -> 9
digit_sum(0)   # -> 0
```

---

### Q17. Recursive Power

```python
def power(base, exp):
    """Raise base to exp recursively, without using **."""
    if exp == 0:
        return 1
    if exp < 0:
        return 1 / power(base, -exp)
    return base * power(base, exp - 1)
```

**What to notice:** Three branches: exponent zero, negative, positive.

**Checked with:**

```python
power(2, 10)   # -> 1024
power(2, -2)   # -> 0.25
power(5, 0)   # -> 1
power(3, 3)   # -> 27
```

---

### Q18. Tower of Hanoi

```python
def hanoi(n, source="A", target="C", auxiliary="B"):
    """Print each move and return the total number of moves."""
    if n == 0:
        return 0
    moves = hanoi(n - 1, source, auxiliary, target)
    print(f"Move disk {n} from {source} to {target}")
    moves = moves + 1
    return moves + hanoi(n - 1, auxiliary, target, source)
```

**What to notice:** n disks always take exactly 2^n - 1 moves.

**Checked with:**

```python
hanoi(3)   # -> 7
hanoi(1)   # -> 1
hanoi(5)   # -> 31
hanoi(0)   # -> 0
```

---

### Q19. Recursive Binary Search

```python
def binary_search(numbers, target, low=0, high=None):
    """Return the index of target, or -1. Recursive."""
    if high is None:
        high = len(numbers) - 1
    if low > high:
        return -1
    middle = (low + high) // 2
    if numbers[middle] == target:
        return middle
    if numbers[middle] < target:
        return binary_search(numbers, target, middle + 1, high)
    return binary_search(numbers, target, low, middle - 1)
```

**What to notice:** The base case is `low > high`, meaning the range is empty.

**Checked with:**

```python
binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23)   # -> 5
binary_search([2, 5, 8], 100)   # -> -1
binary_search([], 1)   # -> -1
binary_search([7], 7)   # -> 0
```

---

### Q20. Flatten a Nested List

```python
def flatten(nested):
    """Flatten a list nested to any depth."""
    result = []
    for item in nested:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result
```

**What to notice:** `isinstance(item, list)` decides whether to recurse or append.

**Checked with:**

```python
flatten([1, [2, 3, [4, [5, 6]], 7], 8])   # -> [1, 2, 3, 4, 5, 6, 7, 8]
flatten([])   # -> []
flatten([[[[1]]]])   # -> [1]
flatten([1, 2, 3])   # -> [1, 2, 3]
```

---

### Q21. Recursive Palindrome

```python
def is_palindrome(text: str) -> bool:
    """Check a string recursively, comparing the two ends."""
    if len(text) <= 1:
        return True
    if text[0] != text[-1]:
        return False
    return is_palindrome(text[1:-1])
```

**What to notice:** `and` short-circuits, so a mismatch stops the recursion immediately.

**Checked with:**

```python
is_palindrome("racecar")   # -> True
is_palindrome("python")   # -> False
is_palindrome("")   # -> True
is_palindrome("aa")   # -> True
```

---

### Q22. Function Returning a Function

```python
def multiplier(n):
    """Return a function that multiplies its argument by n."""
    def multiply(x):
        return x * n
    return multiply
```

**What to notice:** The inner function keeps a live reference to `n` - that is a closure.

**Checked with:**

```python
multiplier(2)(15)   # -> 30
multiplier(3)(7)   # -> 21
double = multiplier(2); double(4)   # -> 8
```

---

### Q23. Function as an Argument

```python
def apply_twice(func, value):
    """Apply func to value, then to the result."""
    return func(func(value))
```

**What to notice:** `func` is the object; `func(x)` calls it. Passing `func()` calls it too early.

**Checked with:**

```python
apply_twice(lambda x: x * 3, 5)   # -> 45
apply_twice(lambda s: s + '!', 'hi')   # -> 'hi!!'
apply_twice(abs, -4)   # -> 4
```

---

### Q24. Simple Timing Wrapper

```python
import time

def time_it(func, *args):
    """Call func with args; return (result, elapsed_seconds)."""
    start = time.perf_counter()
    result = func(*args)
    return result, time.perf_counter() - start
```

**What to notice:** `perf_counter` is monotonic; `time.time()` can jump backwards.

**Checked with:**

```python
time_it(sum, [1, 2, 3])[0]   # -> 6
time_it(len, 'abcd')[0]   # -> 4
isinstance(time_it(sum, [1])[1], float)   # -> True
time_it(sum, [1])[1] >= 0   # -> True
```

---

## Tier 3 — Modules and the Standard Library (Q25–Q34)

### Q25. Build Your Own Module

*Not automatically graded — This question asks you to create a separate `mymath.py` file and import it, which the grader cannot check from a single answer file. Build it and confirm every function works.*

---

### Q26. The `__name__` Guard

*Not automatically graded — This needs you to run the same file two different ways - directly and via an import - and compare. Do it at the command line.*

---

### Q27. math Module Tour

```python
import math

results = {
    "sqrt": math.sqrt(144),
    "ceil": math.ceil(7.3),
    "floor": math.floor(7.3),
    "factorial": math.factorial(8),
    "gcd": math.gcd(48, 60),
    "pi": round(math.pi, 4),
    "log10": math.log10(1000),
}
```

**What to notice:** `sqrt` returns a float even for a perfect square; `ceil`/`floor` return ints.

**Checked with:**

```python
results["sqrt"]   # -> 12.0
results["ceil"]   # -> 8
results["floor"]   # -> 7
results["factorial"]   # -> 40320
results["gcd"]   # -> 12
results["pi"]   # -> 3.1416
results["log10"]   # -> 3.0
```

---

### Q28. random Module — Dice Simulation

```python
import random

def roll_two_dice(rolls=10000, seed=42):
    """Roll two dice many times; return {total: count}."""
    random.seed(seed)
    counts = {}
    for _ in range(rolls):
        total = random.randint(1, 6) + random.randint(1, 6)
        counts[total] = counts.get(total, 0) + 1
    return counts
```

**What to notice:** Two `randint(1,6)` calls, not one `randint(2,12)` - the distributions differ.

**Checked with:**

```python
sum(roll_two_dice().values())   # -> 10000
sorted(roll_two_dice().keys())   # -> [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
max(roll_two_dice(), key=roll_two_dice().get)   # -> 7
roll_two_dice(1000, 1) == roll_two_dice(1000, 1)   # -> True
```

---

### Q29. random Module — Password Generator

```python
import random
import string

def generate_password(length=12, use_symbols=True, seed=None):
    """Build a password guaranteed to contain one of each required class."""
    if seed is not None:
        random.seed(seed)
    pools = [string.ascii_uppercase, string.ascii_lowercase, string.digits]
    if use_symbols:
        pools.append(string.punctuation)

    # Take one from each pool first, so the guarantee actually holds.
    chosen = [random.choice(pool) for pool in pools]
    everything = "".join(pools)
    while len(chosen) < length:
        chosen.append(random.choice(everything))

    random.shuffle(chosen)
    return "".join(chosen)
```

**What to notice:** Pick one from each pool FIRST, then fill and shuffle, or the guarantee is only likely.

**Checked with:**

```python
len(generate_password(12, seed=1))   # -> 12
any(c.isupper() for c in generate_password(12, seed=2))   # -> True
any(c.isdigit() for c in generate_password(12, seed=3))   # -> True
any(not c.isalnum() for c in generate_password(12, seed=4))   # -> True
generate_password(20, seed=5) == generate_password(20, seed=5)   # -> True
```

---

### Q30. datetime Basics

*Not automatically graded — The answers depend on today's date, so there is no fixed expected value. Run it and sanity-check each line by hand.*

---

### Q31. Age Calculator

```python
from datetime import date

def calculate_age(birth_date, today=None):
    """Return (years, months, days) of exact age."""
    if today is None:
        today = date.today()

    years = today.year - birth_date.year
    months = today.month - birth_date.month
    days = today.day - birth_date.day

    if days < 0:
        months = months - 1
        # Borrow the length of the previous month.
        previous_month = today.month - 1 or 12
        previous_year = today.year if today.month > 1 else today.year - 1
        if previous_month in (1, 3, 5, 7, 8, 10, 12):
            days = days + 31
        elif previous_month == 2:
            leap = previous_year % 4 == 0 and (previous_year % 100 != 0
                                               or previous_year % 400 == 0)
            days = days + (29 if leap else 28)
        else:
            days = days + 30
    if months < 0:
        years = years - 1
        months = months + 12
    return years, months, days
```

**What to notice:** Borrow the length of the PREVIOUS month, which is 29 days in a leap February.

**Checked with:**

```python
calculate_age(__import__('datetime').date(1998, 7, 15), __import__('datetime').date(2025, 7, 27))   # -> [27, 0, 12]
calculate_age(__import__('datetime').date(2000, 1, 1), __import__('datetime').date(2020, 1, 1))   # -> [20, 0, 0]
calculate_age(__import__('datetime').date(2000, 3, 15), __import__('datetime').date(2020, 3, 14))   # -> [19, 11, 28]
```

---

### Q32. os Module Exploration

*Not automatically graded — This inspects your real filesystem, so the results differ on every machine. Run it and read the output.*

---

### Q33. sys Module

*Not automatically graded — This needs real command-line arguments. Run it from a terminal:  `python sum_args.py 10 20 30`*

---

### Q34. Standard Library Scavenger Hunt

*Not automatically graded — Open-ended exploration - there is no single right answer. Pick a function from each module and explain what it does.*

---

## Tier 4 — File Handling (Q35–Q46)

### Q35. Write and Read

```python
def write_notes(path="notes.txt"):
    """Write five lines and return how many were written."""
    lines = ["First line", "Second line", "Third line", "Fourth line", "Fifth line"]
    with open(path, "w") as handle:
        for line in lines:
            handle.write(line + "\n")
    return len(lines)

def read_notes(path="notes.txt"):
    """Read the whole file back as one string."""
    with open(path) as handle:
        return handle.read()
```

**What to notice:** `with` closes the file even if the block raises.

**Checked with:**

```python
write_notes()   # -> 5
read_notes().count(chr(10))   # -> 5
read_notes().startswith('First line')   # -> True
```

---

### Q36. Read Line by Line

```python
def numbered_lines(path="notes.txt"):
    """Return a list of 'N: text' strings, newlines stripped."""
    result = []
    with open(path) as handle:
        for index, line in enumerate(handle, start=1):
            result.append(f"{index}: {line.rstrip(chr(10))}")
    return result
```

**What to notice:** Iterating a file keeps the trailing newline; strip it.

**Checked with:**

```python
numbered_lines()   # -> ['1: First line', '2: Second line', '3: Third line']
len(numbered_lines())   # -> 3
```

---

### Q37. Append vs Overwrite

```python
def demo_write_modes(path="modes.txt"):
    """Show that "w" truncates and "a" appends. Returns (w_lines, a_lines)."""
    with open(path, "w") as handle:
        handle.write("first write\n")
    with open(path, "w") as handle:
        handle.write("second write\n")
    with open(path) as handle:
        after_w = handle.read().splitlines()

    with open(path, "w") as handle:
        handle.write("first\n")
    with open(path, "a") as handle:
        handle.write("second\n")
    with open(path) as handle:
        after_a = handle.read().splitlines()

    return after_w, after_a
```

**What to notice:** Mode `w` truncates the instant the file is opened, before you write anything.

**Checked with:**

```python
demo_write_modes()   # -> [['second write'], ['first', 'second']]
```

---

### Q38. Count File Statistics

```python
def file_stats(path):
    """Return {'lines': n, 'words': n, 'characters': n}."""
    with open(path) as handle:
        text = handle.read()
    return {
        "lines": len(text.splitlines()),
        "words": len(text.split()),
        "characters": len(text),
    }
```

**What to notice:** Read once and derive all three counts from the same text.

**Checked with:**

```python
file_stats("notes.txt")   # -> {'lines': 3, 'words': 6, 'characters': 34}
```

---

### Q39. Copy a File

```python
def copy_file(source, destination):
    """Copy line by line; return the number of lines copied."""
    count = 0
    with open(source) as src, open(destination, "w") as dst:
        for line in src:
            dst.write(line)
            count = count + 1
    return count
```

**What to notice:** Two handles in one `with`, separated by a comma.

**Checked with:**

```python
copy_file("notes.txt", "copy.txt")   # -> 3
open("copy.txt").read() == open("notes.txt").read()   # -> True
```

---

### Q40. Search Within a File

```python
def find_in_file(path, term):
    """Return [(line_number, line)] for lines containing term, ignoring case."""
    matches = []
    with open(path) as handle:
        for index, line in enumerate(handle, start=1):
            if term.lower() in line.lower():
                matches.append((index, line.rstrip(chr(10))))
    return matches
```

**What to notice:** Lowercase both sides for a case-insensitive match; return `[]` when nothing matches.

**Checked with:**

```python
find_in_file("notes.txt", "line")   # -> [[1, 'First line'], [2, 'Second line'], [3, 'Third line']]
find_in_file("notes.txt", "ZZZ")   # -> []
find_in_file("notes.txt", "FIRST")   # -> [[1, 'First line']]
```

---

### Q41. Word Frequency from a File

```python
def word_frequency(path):
    """Return a {word: count} dictionary for a text file."""
    counts = {}
    with open(path) as handle:
        for word in handle.read().lower().split():
            cleaned = "".join(c for c in word if c.isalnum())
            if cleaned:
                counts[cleaned] = counts.get(cleaned, 0) + 1
    return counts

def top_words(counts, n=10):
    """Return the n most common (word, count) pairs."""
    return sorted(counts.items(), key=lambda pair: (-pair[1], pair[0]))[:n]
```

**What to notice:** Keep the counting separate from the file reading so it can be tested alone.

**Checked with:**

```python
word_frequency("words.txt")["the"]   # -> 3
top_words(word_frequency("words.txt"), 2)   # -> [['the', 3], ['cat', 2]]
```

---

### Q42. CSV Write and Read

```python
import csv

def write_students(path="students.csv"):
    """Write a CSV with a header row; return the number of data rows."""
    rows = [
        {"name": "Rohan", "math": 78, "science": 85, "english": 72},
        {"name": "Priya", "math": 92, "science": 88, "english": 95},
    ]
    with open(path, "w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=["name", "math", "science", "english"])
        writer.writeheader()
        writer.writerows(rows)
    return len(rows)

def class_average(path="students.csv"):
    """Read the CSV back and average every subject mark."""
    total = 0
    count = 0
    with open(path) as handle:
        for row in csv.DictReader(handle):
            for subject in ("math", "science", "english"):
                total = total + int(row[subject])   # values arrive as TEXT
                count = count + 1
    return round(total / count, 2)
```

**What to notice:** `DictReader` gives every value as TEXT - cast before doing arithmetic.

**Checked with:**

```python
write_students()   # -> 2
class_average()   # -> 85.0
```

---

### Q43. CSV Filtering

```python
import csv

def filter_toppers(source="students.csv", destination="toppers.csv", cutoff=80):
    """Keep students whose average beats the cutoff. Return (kept, read)."""
    kept = 0
    read = 0
    with open(source) as handle:
        rows = list(csv.DictReader(handle))
        fields = ["name", "math", "science", "english"]
    with open(destination, "w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for row in rows:
            read = read + 1
            average = (int(row["math"]) + int(row["science"]) + int(row["english"])) / 3
            if average > cutoff:
                writer.writerow(row)
                kept = kept + 1
    return kept, read
```

**What to notice:** Report both numbers: 'kept 1 of 2' means something, '1' does not.

**Checked with:**

```python
filter_toppers()   # -> [1, 2]
```

---

### Q44. JSON Round Trip

```python
import json

def save_config(data, path="config.json"):
    """Write a dictionary as indented JSON."""
    with open(path, "w") as handle:
        json.dump(data, handle, indent=2)
    return path

def load_config(path="config.json"):
    """Read it back."""
    with open(path) as handle:
        return json.load(handle)
```

**What to notice:** A tuple comes back from JSON as a list, and integer keys come back as strings.

**Checked with:**

```python
_c = {"app": {"name": "demo", "debug": False}, "retries": 3}; save_config(_c); load_config() == _c   # -> True
load_config()["app"]["name"]   # -> 'demo'
```

---

### Q45. JSON Update

```python
import json

def update_config(path="config.json"):
    """Change a nested value, add a key, delete another. Return (before, after)."""
    with open(path) as handle:
        data = json.load(handle)
    before = json.loads(json.dumps(data))

    data["app"]["debug"] = True
    data["version"] = "1.0"
    data.pop("retries", None)

    with open(path, "w") as handle:
        json.dump(data, handle, indent=2)
    return before, data
```

**What to notice:** Load, mutate in memory, dump. JSON has no concept of editing in place.

**Checked with:**

```python
update_config()[1]["app"]["debug"]   # -> True
"retries" in update_config()[1]   # -> False
update_config()[1]["version"]   # -> '1.0'
```

---

### Q46. Log File Analyser

```python
def analyse_log(path):
    """Return counts by level, the error messages, and the busiest hour."""
    levels = {}
    errors = []
    hours = {}
    total = 0

    with open(path) as handle:
        for line in handle:
            parts = line.split(maxsplit=3)
            if len(parts) < 4:
                continue
            date_part, time_part, level, message = parts
            total = total + 1
            levels[level] = levels.get(level, 0) + 1
            hour = time_part[:2]
            hours[hour] = hours.get(hour, 0) + 1
            if level == "ERROR":
                errors.append(message.rstrip(chr(10)))

    busiest = max(hours, key=hours.get) if hours else None
    return {"total": total, "levels": levels, "errors": errors, "busiest_hour": busiest}
```

**What to notice:** `split(maxsplit=3)` keeps the message intact instead of chopping it up.

**Checked with:**

```python
analyse_log("app.log")["total"]   # -> 4
analyse_log("app.log")["levels"]   # -> {'ERROR': 1, 'INFO': 2, 'WARNING': 1}
analyse_log("app.log")["errors"]   # -> ['Database connection failed']
analyse_log("app.log")["busiest_hour"]   # -> '10'
```

---

## Tier 5 — Exception Handling (Q47–Q56)

### Q47. Safe Division

```python
def safe_divide(a, b):
    """Return a / b, or None (with a message) when b is zero."""
    try:
        return a / b
    except ZeroDivisionError:
        print("Cannot divide by zero")
        return None
```

**What to notice:** Catch `ZeroDivisionError` specifically, not a bare `except`.

**Checked with:**

```python
safe_divide(10, 2)   # -> 5.0
safe_divide(10, 0)   # -> None
_out(safe_divide, 1, 0)   # -> 'Cannot divide by zero'
```

---

### Q48. Safe Integer Input

```python
def get_int(prompt="Enter a number: "):
    """Ask until the user types a valid whole number."""
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Invalid. Please enter a whole number.")
```

**What to notice:** `try`/`except` beats `.isdigit()`, which rejects `-5` and accepts nothing else odd.

**Checked with:**

```python
_feed(["abc", "12"], get_int)   # -> 12
_feed(["7"], get_int)   # -> 7
_feed(["x", "y", "-3"], get_int)   # -> -3
```

---

### Q49. Multiple Exception Types

```python
def read_first_int(path):
    """Parse the first line as an integer, naming each failure separately."""
    try:
        with open(path) as handle:
            return int(handle.readline().strip())
    except FileNotFoundError:
        return f"FileNotFoundError: no such file: {path}"
    except PermissionError:
        return f"PermissionError: cannot read {path}"
    except ValueError:
        return "ValueError: first line is not an integer"
```

**What to notice:** Python runs the FIRST matching except clause, so order matters for related errors.

**Checked with:**

```python
read_first_int("number.txt")   # -> 42
read_first_int("missing.txt")   # -> 'FileNotFoundError: no such file: missing.txt'
read_first_int("letters.txt")   # -> 'ValueError: first line is not an integer'
```

---

### Q50. else and finally

```python
def demo(value):
    """Show the order of try / except / else / finally."""
    order = []
    try:
        order.append("try")
        10 / value
    except ZeroDivisionError:
        order.append("except")
    else:
        order.append("else")
    finally:
        order.append("finally")
    return order
```

**What to notice:** `else` runs only on success; `finally` runs always, even after a `return`.

**Checked with:**

```python
demo(2)   # -> ['try', 'else', 'finally']
demo(0)   # -> ['try', 'except', 'finally']
```

---

### Q51. Raising Exceptions

```python
def set_age(age):
    """Validate an age, raising the right kind of error."""
    if isinstance(age, bool) or not isinstance(age, int):
        raise TypeError(f"Age must be an integer, got {type(age).__name__}")
    if age < 0:
        raise ValueError(f"Age cannot be negative, got {age}")
    return age
```

**What to notice:** `TypeError` for the wrong kind of thing, `ValueError` for a bad value of the right kind.

**Checked with:**

```python
set_age(30)   # -> 30
set_age(0)   # -> 0
set_age(-5)   # raises ValueError
set_age("ten")   # raises TypeError
```

---

### Q52. Custom Exception

```python
class InsufficientFundsError(Exception):
    """Raised when a withdrawal exceeds the available balance."""

    def __init__(self, requested, available):
        self.requested = requested
        self.available = available
        self.shortfall = requested - available
        super().__init__(
            f"requested {requested} but only {available} available "
            f"(short by {self.shortfall})")

def withdraw(balance, amount):
    """Return the new balance, or raise InsufficientFundsError."""
    if amount > balance:
        raise InsufficientFundsError(amount, balance)
    return balance - amount
```

**What to notice:** Store the numbers as attributes so the handler need not parse your message.

**Checked with:**

```python
withdraw(5000, 1000)   # -> 4000
withdraw(3200, 5000)   # raises InsufficientFundsError
_shortfall()   # -> 1800
```

---

### Q53. Assertions

```python
def average(numbers):
    """Average a list. The assertion catches a programming error, not user input."""
    assert numbers, "cannot average an empty list"
    return sum(numbers) / len(numbers)
```

**What to notice:** `python -O` strips every assert, which is why they must not validate user input.

**Checked with:**

```python
average([1, 2, 3])   # -> 2.0
average([])   # raises AssertionError
average([10])   # -> 10.0
```

---

### Q54. Retry Logic

```python
def retry(func, attempts=3):
    """Call func, retrying on any exception. Re-raise the last failure."""
    last_error = None
    for attempt in range(1, attempts + 1):
        try:
            return func()
        except Exception as error:
            last_error = error
            print(f"attempt {attempt} failed: {type(error).__name__}")
    raise last_error
```

**What to notice:** Re-raise on the last attempt, or the caller gets None and no idea why.

**Checked with:**

```python
retry(lambda: 42)   # -> 42
_flaky_ok()   # -> 'ok'
_always_fails()   # raises ConnectionError
```

---

### Q55. Exception Chaining

```python
class ConfigurationError(Exception):
    """Raised when a setting cannot be parsed."""

def parse_port(text):
    """Turn a low-level ValueError into a meaningful error, keeping the cause."""
    try:
        return int(text)
    except ValueError as error:
        raise ConfigurationError("could not parse the port setting") from error
```

**What to notice:** `from err` sets `__cause__` and keeps both tracebacks visible.

**Checked with:**

```python
parse_port("8080")   # -> 8080
parse_port("abc")   # raises ConfigurationError
_cause_is_valueerror()   # -> True
```

---

### Q56. Robust File Processor

```python
def process_file(path):
    """Never crash. Always return the same dictionary shape."""
    try:
        with open(path, encoding="utf-8") as handle:
            text = handle.read()
    except FileNotFoundError:
        return {"success": False, "error": f"File not found: {path}", "data": None}
    except PermissionError:
        return {"success": False, "error": f"Permission denied: {path}", "data": None}
    except UnicodeDecodeError:
        return {"success": False, "error": f"File is not valid UTF-8: {path}",
                "data": None}

    if not text.strip():
        return {"success": False, "error": f"File is empty: {path}", "data": None}
    return {"success": True, "error": None, "data": text}
```

**What to notice:** Keep the dictionary shape identical in every branch so callers never check for keys.

**Checked with:**

```python
process_file("missing.txt")   # -> {'success': False, 'error': 'File not found: missing.txt', 'data': None}
process_file("good.txt")["success"]   # -> True
process_file("empty.txt")["success"]   # -> False
process_file("good.txt")["data"]   # -> 'hello\n'
```

---

## Tier 6 — Integration Challenges (Q57–Q60)

### Q57. Contact Manager with Persistence

*Not automatically graded — A full project. Graded by whether your data survives a restart, which the automatic grader cannot judge. Run it, add contacts, exit, restart.*

---

### Q58. CSV Data Analysis Pipeline

*Not automatically graded — A full pipeline built from several functions of your own design. Check each function separately as you write it.*

---

### Q59. Text File Word Game

*Not automatically graded — An interactive game. Play it, and verify the high-score file grows.*

---

### Q60. Mini Expense Tracker

*Not automatically graded — A complete application. Test each function as you build it, then run the menu end to end.*

---

[← Questions](questions.md) · [Test runner](tests/README.md) · [Phase 3 index](README.md)
