# 🧠 Phase 3 — 60 Practice Questions

Questions for **Modules 9–12**: functions, modules and packages, file handling, and exception handling.

**Rules for this set:**

- Everything from Phases 1–2, plus functions, `*args`/`**kwargs`, lambdas, `map`/`filter`/`reduce`, recursion, type hints, the standard library, file I/O, and `try`/`except`.
- **Every solution from Q1 onward must be written as a function** with a docstring and type hints, unless the question says otherwise.
- **No classes.** Those are Phase 4.
- Standard library imports are now allowed and encouraged: `math`, `random`, `datetime`, `os`, `sys`, `json`, `csv`, `functools`.

**How to use this file:**

1. Write the function signature and docstring **first**, before the body. Deciding what goes in and what comes out is most of the design.
2. Test each function with at least three inputs: a normal case, an edge case, and an invalid one.
3. From Tier 4 onward, files are created and deleted. Work in a scratch directory so you do not litter your project.

> 💡 **Tip:** A function that both computes something *and* prints it is harder to test and impossible to reuse. Make your functions **return** values and let the caller print. You will notice the difference immediately at Q40, when you start writing functions that call other functions.
>

## ✅ Check your answers automatically

This phase grades **return values, not printed text**:

```bash
cd tests
python run_tests.py --new 13    # creates answers/q13.py to write in
python run_tests.py 13 --diff   # grade it, and see which check failed
python run_tests.py --all       # everything you have attempted
```

The grader imports your file and calls your functions — `factorial(6)` must **return** `720`, and `factorial(-1)` must **raise** `ValueError`. **Names must match exactly**: a perfect function called `fact` scores zero when the question asked for `factorial`. Returning a tuple or a list is treated the same.

File questions run in a **scratch directory** that is created fresh and deleted afterwards, so nothing you write touches your real folders.

**50 of the 60 questions are graded automatically** across **166 checks**. The other 10 need a separate module file, real command-line arguments, today's date, your actual filesystem, or a whole multi-file project — each says so.

Stuck? [**solutions.md**](solutions.md) has a verified solution for every graded question — but write yours first. See [tests/README.md](tests/README.md).

---

## Tier 1 — Function Basics (Q1–Q12)

### Q1. Greet

Write `greet(name)` that returns a greeting string. Give it a docstring and a type hint. Call it three times.

```python
greet("Priya")   # 'Hello, Priya!'
```

**Explanation:** A docstring is the string literal on the **first line** of the body; a type hint annotates the parameter and the return, as in `def greet(name: str) -> str:`. Neither is enforced at runtime — Python will happily pass an integer — but both are read by your editor and by `help()`.

**Hint:** `return f"Hello, {name}!"` — return the string, do not print it.

---

### Q2. Rectangle Area with Defaults

Write `area(length, width=1)` that returns the area. Calling it with one argument should compute the area of a square-ish strip.

```python
area(5, 3)   # 15
area(7)      # 7
```

**Explanation:** `area(5, 3)` is `15`; `area(7)` uses the default width of 1 and returns `7`. Default parameters must come **after** all non-default ones, otherwise Python raises `SyntaxError: non-default argument follows default argument` at import time.

**Hint:** `def area(length: float, width: float = 1) -> float:`

---

### Q3. Multiple Return Values

Write `stats(a, b)` returning the sum, difference, product and quotient as a tuple. Handle division by zero by returning `None` for the quotient.

```python
stats(10, 4)   # (14, 6, 40, 2.5)
stats(10, 0)   # (10, 10, 0, None)
```

**Explanation:** `stats(10, 4)` returns `(14, 6, 40, 2.5)` — a bare `return a+b, a-b, a*b, q` packs those four values into a tuple automatically. Check `b == 0` **before** dividing; catching `ZeroDivisionError` afterwards also works, but testing first is clearer when the answer is a defined `None` rather than an error.

**Hint:** Compute the quotient into a variable first, guarded by an `if`, then return all four.

---

### Q4. Even Number Filter

Write `only_evens(numbers)` that returns a new list of the even numbers. Do not modify the input list.

```python
only_evens([1, 2, 3, 4, 5, 6])   # [2, 4, 6]
```

**Explanation:** `[1,2,3,4,5,6]` gives `[2, 4, 6]`. "Do not modify the input" is the real constraint: a comprehension builds a **new** list, whereas `numbers.remove(x)` in a loop would mutate the caller's data — a side effect they never asked for and cannot see from the call site.

**Hint:** `return [n for n in numbers if n % 2 == 0]`

---

### Q5. Celsius Converter with Validation

Write `to_fahrenheit(celsius)` that converts temperature but returns `None` if the input is below absolute zero (−273.15 °C).

```python
to_fahrenheit(37)      # 98.6
to_fahrenheit(-300)    # None
```

**Explanation:** `37°C` is `98.6°F`. Absolute zero is `-273.15°C`, below which the input is physically meaningless, so the function returns `None`. Returning `None` rather than raising is a design choice — it means every caller must remember to check, which is why raising `ValueError` is often the safer option.

**Hint:** Validate first, return `None` early, then do the conversion.

---

### Q6. Variable Arguments

Write `total(*numbers)` that sums any number of arguments and returns 0 for no arguments.

```python
total(1, 2, 3)      # 6
total()             # 0
total(5)            # 5
```

**Explanation:** `*numbers` collects every positional argument into a **tuple**. With no arguments that tuple is empty and `sum(())` is `0`, so the zero case needs no special handling — `sum()` already returns 0 for an empty iterable.

**Hint:** `def total(*numbers: float) -> float:` then `return sum(numbers)`

---

### Q7. Keyword Arguments

Write `describe(**details)` that prints each key-value pair on its own line, formatted as `Key: Value` with the key title-cased.

```python
describe(name="Rohan", age=25, city="Pune")
# Name: Rohan
# Age: 25
# City: Pune
```

**Explanation:** `**details` collects keyword arguments into a **dictionary**, so you iterate it with `.items()`. Since Python 3.7 that dictionary preserves the order the arguments were written in, which is why the output matches the call order rather than coming out alphabetical.

**Hint:** `for key, value in details.items():` then `print(f"{key.title()}: {value}")`

---

### Q8. Mixed Arguments

Write `order(item, quantity=1, *extras, **options)` and call it several ways to demonstrate how Python assigns each argument. Print what each parameter received.

```python
order("Pizza", 2, "extra cheese", "olives", size="large", delivery=True)
# item: Pizza
# quantity: 2
# extras: ('extra cheese', 'olives')
# options: {'size': 'large', 'delivery': True}
```

**Explanation:** Python fills parameters in a fixed order: positional first (`item`), then defaults (`quantity`), then everything else positional goes into `*extras` as a tuple, and every remaining keyword goes into `**options` as a dictionary. That order is also the order you must **declare** them in, or you get a `SyntaxError`.

**Hint:** Print all four parameters and call the function several ways to see what lands where.

---

### Q9. Scope Demonstration

Write a function that tries to modify a global counter without `global`, then one that uses `global` correctly. Print the counter before and after each. Explain the difference in a comment.

**Expected:**

```
counter before: 0
without global -> counter after: 0     (the function made a local copy)
with global    -> counter after: 1
```

**Explanation:** Assigning to a name inside a function makes it **local** for the whole function, so the first version creates a throwaway local `counter` and the global stays `0`. `global counter` tells Python to bind the outer name instead. Note you can *read* a global without declaring it — the declaration is only needed to **rebind** it.

**Hint:** The version without `global` may raise `UnboundLocalError` if you read the variable before assigning it.

---

### Q10. The Mutable Default Trap

Write `add_item(item, cart=[])` and call it three times with different items but no cart. Observe that the list persists between calls. Then write the corrected version using `None` as the default.

```python
add_item("apple")    # ['apple']
add_item("banana")   # ['apple', 'banana']   <- the bug
```

**This is one of Python's most notorious traps.** Make sure you can explain *why* it happens.

**Explanation:** The default `[]` is created **once**, when the `def` line executes — not on each call. Every call without a cart therefore shares that same list, so `add_item("banana")` returns `['apple', 'banana']`. The fix is `def add_item(item, cart=None):` then `if cart is None: cart = []`, which builds a fresh list per call. This applies to every mutable default: lists, dictionaries and sets.

**Hint:** Print `id(cart)` inside the function to prove it is the same object each time.

---

### Q11. Lambda Practice

Using lambdas only, create: a squaring function, a function returning the larger of two values, and a function checking whether a number is divisible by 3. Then sort a list of tuples by the second element using a lambda key.

```python
sorted([('a', 3), ('b', 1), ('c', 2)], key=lambda t: t[1])
# [('b', 1), ('c', 2), ('a', 3)]
```

**Explanation:** `sorted(..., key=lambda t: t[1])` sorts by the second tuple element, giving `[('b',1), ('c',2), ('a',3)]`. A lambda is a single **expression** whose value is returned automatically — no `return`, no statements, no loops. When you want to give it a name, use `def` instead; that is what `def` is for.

**Hint:** `key=` takes a function that maps each item to the value you want compared.

---

### Q12. map, filter, reduce

Given `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`:

- Use `map` to square every element
- Use `filter` to keep only elements divisible by 3
- Use `reduce` (from `functools`) to compute the product of all elements

```
Squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Divisible by 3: [3, 6, 9]
Product: 3628800
```

**Explanation:** Squares run `1, 4, 9 … 100`; the multiples of 3 are `[3, 6, 9]`; and the product of 1–10 is `3,628,800`, which is `10!`. `map` and `filter` return lazy iterators, so you must wrap them in `list()` to see anything. `reduce` needs `from functools import reduce` — it was removed from builtins in Python 3.

**Hint:** `reduce(lambda a, b: a * b, numbers)` folds the list down to one value.

---

## Tier 2 — Recursion and Function Design (Q13–Q24)

### Q13. Recursive Factorial

Write `factorial(n)` recursively. Include a base case and raise `ValueError` for negative input.

```python
factorial(6)    # 720
factorial(0)    # 1
factorial(-1)   # ValueError
```

**Explanation:** `6! = 720` and `0! = 1` — that second one is the base case, and getting it right is what stops the recursion. Without a base case you recurse until Python raises `RecursionError` at roughly 1,000 frames deep. Raise `ValueError` for negatives, because they have no factorial and would otherwise recurse forever.

**Hint:** `if n < 0: raise ValueError(...)`, `if n <= 1: return 1`, else `return n * factorial(n-1)`.

---

### Q14. Recursive Fibonacci

Write `fib(n)` recursively, then write an iterative version. Time both for `n = 30` and compare. Explain why the recursive version is so much slower.

```
fib(30) recursive: 832040 in 0.11 s
fib(30) iterative: 832040 in 0.00 s
```

Your exact timing will differ by machine — what matters is the **ratio**, which should be enormous. The recursive version recomputes `fib(28)` thousands of times.

**Explanation:** `fib(30) = 832040`. On this machine the recursive version took **0.110 s** — your timing will differ, the ratio will not. The reason is measurable: naive `fib(30)` makes **2,692,537 function calls** because each branch recomputes the same sub-results independently. The iterative version makes 30 loop iterations. The recursion tree has exponential width, O(2ⁿ), against the loop's O(n).

**Hint:** Add a counter to the recursive version and print how many times it was called.

---

### Q15. Memoized Fibonacci

Add memoization to the recursive version using a dictionary passed as a default argument, then rewrite it using `functools.lru_cache`. Time `fib(35)` for all three approaches.

**Expected (indicative — your times will differ, the ratio will not):**

```
plain recursion  fib(35) = 9227465   ~3.5 s
dict memo        fib(35) = 9227465   ~0.00002 s
lru_cache        fib(35) = 9227465   ~0.00002 s
```

**Explanation:** `fib(35) = 9227465`. Memoisation stores each result the first time it is computed, collapsing the exponential tree to a linear walk — 36 real computations instead of tens of millions. `functools.lru_cache` does exactly this in one decorator, and the dictionary-default trick shows what it is doing underneath. This is the one legitimate use of a mutable default argument, and even then `lru_cache` is clearer.

**Hint:** `@functools.lru_cache(maxsize=None)` above the plain recursive version is the whole change.

---

### Q16. Recursive Sum of Digits

Write `digit_sum(n)` that recursively sums a number's digits until a single digit remains.

```python
digit_sum(9875)   # 9+8+7+5=29 -> 2+9=11 -> 1+1=2 -> returns 2
```

**Explanation:** `9875 → 29 → 11 → 2`. Each pass sums the digits; the recursion continues while the result is still more than one digit. The base case is `n < 10`, at which point the number *is* its own digit sum. This value is the **digital root**, and it always equals `1 + (n-1) % 9` for positive `n` — worth checking your answer against.

**Hint:** Sum the digits once, then call yourself again if the result is still 10 or more.

---

### Q17. Recursive Power

Write `power(base, exp)` recursively without using `**`. Handle a negative exponent by returning the reciprocal.

```python
power(2, 10)   # 1024
power(2, -2)   # 0.25
```

**Explanation:** `power(2, 10) = 1024`; `power(2, -2) = 0.25`, because a negative exponent is the reciprocal of the positive one. Base case: any base to the power 0 is 1. For the negative case, compute `power(base, -exp)` and return `1 / result` rather than trying to recurse downwards past zero.

**Hint:** Three branches: exponent zero, exponent negative, exponent positive.

---

### Q18. Tower of Hanoi

Write `hanoi(n, source, target, auxiliary)` that prints each move and returns the total number of moves.

```
hanoi(3, 'A', 'C', 'B')
Move disk 1 from A to C
Move disk 2 from A to B
...
Total moves: 7
```

Verify that `n` disks always take exactly `2**n - 1` moves.

**Explanation:** `n` disks always take exactly `2ⁿ - 1` moves: 7 for 3 disks, 31 for 5, and **1,048,575** for 20. Each additional disk doubles the work, because you must move the whole stack above it, move the disk, then move that stack back. The recursion mirrors that sentence exactly — three lines, one for each phase.

**Hint:** `hanoi(n-1, source, auxiliary, target)`, move disk n, `hanoi(n-1, auxiliary, target, source)`.

---

### Q19. Recursive Binary Search

Implement binary search recursively, returning the index or `-1`.

```python
binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23)   # 5
binary_search([2, 5, 8], 100)                              # -1
```

**Explanation:** `23` sits at index 5. Recursive binary search passes a narrowed `low`/`high` pair down each call instead of looping. The base case is `low > high`, meaning the range is empty and the target is absent — return `-1`. Forgetting that case gives infinite recursion on a missing value.

**Hint:** Compare against `arr[mid]`, then recurse into the left or right half with adjusted bounds.

---

### Q20. Flatten a Nested List

Write `flatten(nested)` that recursively flattens arbitrarily deep nesting.

```python
flatten([1, [2, 3, [4, [5, 6]], 7], 8])
# [1, 2, 3, 4, 5, 6, 7, 8]
```

**Explanation:** The result is `[1,2,3,4,5,6,7,8]` from three levels of nesting. For each element, ask whether it is itself a list: if so recurse and extend with the result, otherwise append it. `isinstance(item, list)` is the test. This is genuine recursion rather than a loop, because you cannot know the depth in advance.

**Hint:** `if isinstance(item, list): result.extend(flatten(item)) else: result.append(item)`

---

### Q21. Recursive Palindrome

Check whether a string is a palindrome using recursion, with no loops and no slicing-and-reversing shortcut.

```python
is_palindrome("racecar")   # True
is_palindrome("python")    # False
```

**Explanation:** Compare the first and last characters; if they match, recurse on everything between them. Base case: a string of length 0 or 1 is always a palindrome. `racecar` → `aceca` → `cec` → `e` → `True`. Each call strips two characters, so the depth is half the length.

**Hint:** `return s[0] == s[-1] and is_palindrome(s[1:-1])` — the `and` short-circuits on a mismatch.

---

### Q22. Function Returning a Function

Write `multiplier(n)` that returns a new function multiplying its argument by `n`. Use it to build `double` and `triple`.

```python
double = multiplier(2)
double(15)   # 30
```

**This is a closure** — the returned function remembers `n`.

**Explanation:** `multiplier(2)` returns a function that has captured `n = 2`, so `double(15)` is `30`. The inner function keeps a live reference to the enclosing scope even after `multiplier` has returned — that is what makes it a **closure**. This is the mechanism decorators are built on.

**Hint:** Define a function inside the function and return it **without calling it** — no parentheses.

---

### Q23. Function as an Argument

Write `apply_twice(func, value)` that applies a function to a value twice. Test it with a lambda and with a named function.

```python
apply_twice(lambda x: x * 3, 5)   # 45
```

**Explanation:** `apply_twice(lambda x: x*3, 5)` computes `(5×3)×3 = 45`. Functions are ordinary objects in Python: you can pass them, store them in lists, and return them. Note `func(value)` calls it while a bare `func` is the object itself — passing `func()` by mistake calls it too early and passes the *result*.

**Hint:** `return func(func(value))`

---

### Q24. Simple Timing Wrapper

Write `time_it(func, *args)` that calls `func` with the given arguments, measures how long it takes with `time.perf_counter()`, and returns both the result and the elapsed time.

```python
result, elapsed = time_it(factorial, 500)
# elapsed: 0.000132 s
```

**Explanation:** `time.perf_counter()` is the right clock here — it is monotonic and high-resolution, unlike `time.time()`, which can jump backwards if the system clock is adjusted. Capture the start, call `func(*args)`, capture the end, and return both the result and the difference so the caller loses nothing.

**Hint:** `return result, end - start` — a tuple the caller unpacks.

---

## Tier 3 — Modules and the Standard Library (Q25–Q34)

### Q25. Build Your Own Module

Create a file `mymath.py` containing four functions: `add`, `subtract`, `is_prime`, and `factorial`. Add a module-level docstring. Import it from a separate file and use every function.

**Expected:**

```python
import mymath
mymath.add(2, 3)        # 5
mymath.subtract(9, 4)   # 5
mymath.is_prime(97)     # True
mymath.factorial(6)     # 720
mymath.__doc__          # your module docstring
```

**Explanation:** A module is just a `.py` file; importing it runs the file top to bottom once and caches it in `sys.modules`. The module docstring is the string literal at the very top of the file, and it becomes `mymath.__doc__`. Both files must be in the same directory, or Python will not find the import.

**Hint:** Put the docstring on line 1, before any imports or definitions.

---

### Q26. The `__name__` Guard

Add a test block to `mymath.py` guarded by `if __name__ == "__main__":`. Show that the tests run when you execute the file directly but not when you import it.

**Expected:**

```
$ python mymath.py
running self-tests...
all passed

$ python -c "import mymath"
(no output — the guard blocked the tests)
```

**Explanation:** When you run a file directly, Python sets `__name__` to `"__main__"`. When you import it, `__name__` is the module's own name (`"mymath"`). The guard therefore runs your tests only in the first case. Without it, importing the module would execute your test output as a side effect — which is exactly the kind of surprise that makes a library unusable.

**Hint:** `if __name__ == "__main__":` at the bottom, with the test calls indented under it.

---

### Q27. math Module Tour

Using `math`, compute and print: the square root of 144, the ceiling and floor of 7.3, factorial of 8, GCD of 48 and 60, the value of pi to 4 decimals, and `log10(1000)`.

```
sqrt(144) = 12.0
ceil(7.3) = 8, floor(7.3) = 7
8! = 40320
gcd(48, 60) = 12
pi = 3.1416
log10(1000) = 3.0
```

**Explanation:** `sqrt(144)=12.0`, `ceil(7.3)=8`, `floor(7.3)=7`, `8!=40320`, `gcd(48,60)=12`, `pi≈3.1416`, `log10(1000)=3.0`. Note `sqrt` returns a **float** even for a perfect square, while `ceil` and `floor` return **integers** in Python 3. `math.log10(1000)` gives exactly `3.0` here, but floating-point logs can land a hair off — never compare them with `==`.

**Hint:** `import math` and reach for `math.sqrt`, `math.ceil`, `math.floor`, `math.factorial`, `math.gcd`.

---

### Q28. random Module — Dice Simulation

Simulate rolling two dice 10,000 times with `random.seed(42)`. Count how often each total (2–12) appears and print the distribution as percentages. Compare against the theoretical probability of 7 (16.67%).

**Expected (with `random.seed(42)`, 10,000 rolls):**

```
total   count   percent   theoretical
   2      ~280     ~2.8%       2.78%
   7     ~1670    ~16.7%      16.67%
  12      ~275     ~2.8%       2.78%
```

Your counts will vary slightly; 7 must be the most common and the
percentages must approach the theoretical column.

**Explanation:** Two dice have 36 equally likely outcomes; six of them total 7, so the theoretical probability is `6/36 = 16.67%`, against `1/36 = 2.78%` for 2 and for 12. Measured here with `random.seed(42)` and `randint(1,6)` twice per roll: **7 appeared 1,704 times (17.04%)**, 2 appeared 270 (2.70%) and 12 appeared 311 (3.11%). Your exact counts depend on how many times you call `random` per roll — the seed fixes the *sequence*, not the outcome of a different algorithm. The shape must be a symmetric triangle peaking at 7.

**Hint:** Sum two separate `randint(1, 6)` calls. `randint(2, 12)` would be wrong — it makes every total equally likely.

---

### Q29. random Module — Password Generator

Write `generate_password(length=12, use_symbols=True)` that builds a random password containing at least one uppercase, one lowercase, one digit and (optionally) one symbol. Generate five and verify each meets the requirements.

**Expected:**

```python
p = generate_password(12)
len(p)                                   # 12
any(c.isupper() for c in p)              # True
any(c.islower() for c in p)              # True
any(c.isdigit() for c in p)              # True
any(not c.isalnum() for c in p)          # True
```

**Explanation:** Building a password from a single shuffled pool does **not** guarantee one of each character class — it only makes it likely, and "likely" fails silently on a small fraction of runs. Force it: pick one character from each required class first, fill the remainder from the combined pool, then shuffle the result so the guaranteed characters are not always at the front.

**Hint:** `string.ascii_uppercase`, `string.ascii_lowercase`, `string.digits` and `string.punctuation` give you the pools.

---

### Q30. datetime Basics

Using `datetime`, print: today's date, the current time, the date 100 days from now, the day of the week you were born, and the number of days until the next New Year.

**Explanation:** `date.today()` for the date, `datetime.now()` for the time. Arithmetic uses `timedelta`: `date.today() + timedelta(days=100)`. `.strftime('%A')` gives the weekday name. Subtracting two dates yields a `timedelta`, and `.days` pulls the whole number of days out of it.

**Hint:** `from datetime import date, datetime, timedelta`

---

### Q31. Age Calculator

Write `calculate_age(birth_date)` that takes a `date` object and returns exact age in years, months and days.

```python
calculate_age(date(1998, 7, 15))
# 27 years, 0 months, 12 days
```

**Explanation:** Subtract the years, then subtract one more if this year's birthday has not yet arrived — the comparison `(today.month, today.day) < (birth.month, birth.day)` handles that in one tuple comparison. ⚠️ **The expected output above is frozen in time.** For a birth date of 1998-07-15 the answer depends on when you run it: it was 27 years when this file was written, and is 28 as of August 2026. Any test asserting a fixed age will start failing on a birthday — pass a reference date in as a parameter so the function is testable.

**Hint:** Compare `(month, day)` tuples rather than writing nested `if` statements.

---

### Q32. os Module Exploration

Using `os`, print the current working directory, list all files in it, check whether a chosen file exists, get its size in bytes, and create then remove a test directory.

**Expected:**

```python
os.getcwd()                      # '/home/you/scratch'
os.listdir('.')                  # ['notes.txt', 'data.csv', ...]
os.path.exists('notes.txt')      # True
os.path.getsize('notes.txt')     # 142
os.makedirs('testdir')           # creates it
os.rmdir('testdir')              # removes it
```

**Explanation:** `os.path.exists()` before opening avoids a crash, but note the gap between checking and opening — the file can vanish in between, which is why catching `FileNotFoundError` is usually more robust than checking first. Use `os.path.join()` rather than concatenating with `/`, so your code works on Windows too.

**Hint:** `os.getcwd()`, `os.listdir()`, `os.path.getsize()`, `os.makedirs()`, `os.rmdir()`.

---

### Q33. sys Module

Write a script that reads command-line arguments with `sys.argv` and computes their sum. Print usage instructions and exit with `sys.exit(1)` if no arguments are given.

```bash
python sum_args.py 10 20 30
# Sum: 60

python sum_args.py
# Usage: python sum_args.py <numbers...>
```

**Explanation:** `sys.argv[0]` is the **script name**, so the actual arguments start at `sys.argv[1:]`. Every element is a string and must be cast before summing. `sys.exit(1)` signals failure to the shell; `sys.exit(0)` or falling off the end means success — that convention is what lets scripts be chained together.

**Hint:** `if len(sys.argv) < 2:` print usage and `sys.exit(1)`.

---

### Q34. Standard Library Scavenger Hunt

Using `dir()` and `help()`, find and demonstrate one useful function you did not previously know from each of: `math`, `random`, `string`, and `datetime`. Write a one-line comment explaining what each does.

**Hint:** `dir(module)` lists the names; `help(module.name)` explains one. Good candidates: `math.isclose`, `random.sample`, `string.punctuation`, `datetime.fromisoformat`.

---

## Tier 4 — File Handling (Q35–Q46)

Work in a scratch folder. Clean up your test files when done.

### Q35. Write and Read

Write five lines of text to `notes.txt`, then read the whole file back and print it. Use `with` in both cases.

**Explanation:** `with open(...)` closes the file automatically, even if an exception is raised inside the block — that is its entire purpose. Without it, a crash mid-write can leave data sitting in a buffer, never flushed to disk, and the file on disk is silently short.

**Hint:** `with open("notes.txt", "w") as f:` then `f.write(...)` per line.

---

### Q36. Read Line by Line

Read `notes.txt` and print each line prefixed with its line number, with trailing newlines stripped.

```
1: First line
2: Second line
```

**Explanation:** Iterating a file object yields lines **with** their trailing `\n` still attached, so `print(line)` produces a blank line between each. Strip it with `.rstrip("\n")`. Use `enumerate(f, start=1)` to number from 1 rather than maintaining your own counter.

**Hint:** `for i, line in enumerate(f, start=1):`

---

### Q37. Append vs Overwrite

Demonstrate the difference between mode `"w"` and mode `"a"` by writing to the same file twice with each and showing the resulting contents.

**Expected:**

```
after two "w" writes:  ['second write']       <- first was destroyed
after two "a" writes:  ['first', 'second']    <- both kept
```

**Explanation:** Mode `"w"` truncates the file to empty the moment it is opened — before you write anything — so two `"w"` writes leave only the second. Mode `"a"` seeks to the end and keeps both. This is the most destructive default in file handling: opening a file with `"w"` just to read it destroys it instantly.

**Hint:** Write, close, write again, then read back the whole file for each mode.

---

### Q38. Count File Statistics

Write `file_stats(path)` returning a dictionary with the number of lines, words and characters in a file.

```python
file_stats("notes.txt")
# {'lines': 5, 'words': 23, 'characters': 142}
```

**Explanation:** Read the file once and derive all three counts from the same content — `len(lines)`, `len(text.split())`, `len(text)`. Reading it three times is three times the I/O and risks the counts disagreeing if the file changes between reads. Note the character count includes the newline characters.

**Hint:** `return {"lines": ..., "words": ..., "characters": ...}`

---

### Q39. Copy a File

Write `copy_file(source, destination)` that copies a file line by line and returns the number of lines copied. Do not use `shutil`.

**Expected:**

```python
copy_file("notes.txt", "notes_copy.txt")   # 5
open("notes_copy.txt").read() == open("notes.txt").read()   # True
```

**Explanation:** Copying line by line preserves the content exactly, so the equality check passes. Open the source for reading and the destination for writing in the same `with` statement — `with open(a) as src, open(b, "w") as dst:` — and both close correctly. Count the lines as you go rather than reading the file again afterwards.

**Hint:** Two file handles in one `with`, separated by a comma.

---

### Q40. Search Within a File

Write `find_in_file(path, term)` returning a list of `(line_number, line_text)` tuples for every line containing the search term, case-insensitively.

**Expected:**

```python
find_in_file("notes.txt", "line")
# [(1, 'First line'), (2, 'Second line'), (3, 'Third line'), ...]
find_in_file("notes.txt", "ZZZ")
# []
```

**Explanation:** Case-insensitive matching means lowercasing **both** sides: `if term.lower() in line.lower()`. Return a list of `(line_number, line)` tuples, and an **empty list** when nothing matches — not `None`, because the caller can loop over an empty list without a special case.

**Hint:** `enumerate(f, start=1)` again, appending matches to a list.

---

### Q41. Word Frequency from a File

Read a text file, count word frequencies, and write the top 10 to `report.txt` in a formatted table. Reuse your Phase 2 logic, now wrapped in functions.

**Explanation:** This is Phase 2's word counting with an I/O layer around it. Keep them separate: one function reads the file, one counts, one formats the report. That separation is what makes the counting function testable without touching the disk at all.

**Hint:** `sorted(counts.items(), key=lambda kv: kv[1], reverse=True)[:10]` for the top ten.

---

### Q42. CSV Write and Read

Using the `csv` module, write a list of student dictionaries to `students.csv` with a header row, then read it back with `DictReader` and compute the class average.

```
name,math,science,english
Rohan,78,85,72
Priya,92,88,95
Class average: 85.00
```

**Explanation:** The average of `78, 85, 72, 92, 88, 95` is **85.00**. `DictReader` uses the header row as keys and gives you one dictionary per row — but every value arrives as a **string**, so `row['math'] + row['science']` concatenates text instead of adding. Cast with `int()` before any arithmetic.

**Hint:** `csv.DictWriter` needs `fieldnames=` and a `writeheader()` call.

---

### Q43. CSV Filtering

Read `students.csv`, filter for students whose average exceeds 80, and write those rows to `toppers.csv`. Report how many rows were kept out of how many read.

**Explanation:** Report both numbers — kept and read — because "12 toppers" means nothing without the denominator. Compute each student's average once into a variable rather than recomputing it inside the comparison and again for the output.

**Hint:** Read all rows first, filter in memory, then write the survivors in one pass.

---

### Q44. JSON Round Trip

Build a nested dictionary of configuration data. Write it to `config.json` with `indent=2`, read it back, and verify the loaded object equals the original.

```python
loaded == original   # True
```

**Explanation:** `json.dump(obj, f, indent=2)` writes formatted JSON; `json.load(f)` reads it back. The round trip is only lossless for JSON's own types — a tuple comes back as a **list**, and integer dictionary keys come back as **strings**, so `loaded == original` can be `False` even when nothing went wrong.

**Hint:** Use dictionaries, lists, strings, numbers, booleans and `None` only, and the comparison will pass.

---

### Q45. JSON Update

Read `config.json`, modify a nested value, add a new key, delete another, and write it back preserving formatting. Print before and after.

**Expected:**

```
before: {'app': {'name': 'demo', 'debug': False}, 'retries': 3}
after:  {'app': {'name': 'demo', 'debug': True}, 'version': '1.0'}
```
(`debug` changed, `version` added, `retries` deleted.)

**Explanation:** Read the whole structure into Python, modify the dictionary in memory, then write the entire thing back — JSON has no concept of editing in place. Nested values need nested access: `config["app"]["debug"] = True`. Use `.pop("retries", None)` to delete safely whether or not the key exists.

**Hint:** Load → mutate → dump. Three separate steps, and the file is only open for the first and last.

---

### Q46. Log File Analyser

Create a log file with lines in the format `2025-03-15 10:23:45 ERROR Database connection failed`. Write a function that reports: total lines, count by level (INFO/WARNING/ERROR), all error messages, and the busiest hour.

```
Total entries: 50
INFO: 32  WARNING: 12  ERROR: 6
Busiest hour: 10:00 (14 entries)
```

**Explanation:** Split each line on whitespace with a `maxsplit`, so the message itself is not chopped up: `line.split(maxsplit=3)` gives date, time, level and the rest intact. The busiest hour comes from the first two characters of the time field. Guard against malformed lines — a real log always has some.

**Hint:** Count levels into a dictionary and hours into another, in a single pass over the file.

---

## Tier 5 — Exception Handling (Q47–Q56)

### Q47. Safe Division

Write `safe_divide(a, b)` that returns the quotient, or `None` with a printed message on `ZeroDivisionError`.

```python
safe_divide(10, 2)   # 5.0
safe_divide(10, 0)   # None, prints 'Cannot divide by zero'
```

**Explanation:** `safe_divide(10, 2)` returns `5.0` — true division always returns a float. The zero case is caught and returns `None`. Catch `ZeroDivisionError` specifically rather than using a bare `except`, which would also swallow a `TypeError` from passing a string and leave you debugging the wrong thing.

**Hint:** `try: return a / b` / `except ZeroDivisionError:` / print and `return None`.

---

### Q48. Safe Integer Input

Write `get_int(prompt)` that repeatedly asks until the user enters a valid integer, catching `ValueError`.

```
Enter a number: abc
Invalid. Please enter a whole number.
Enter a number: 12
Got: 12
```

**Explanation:** `int("abc")` raises `ValueError`, so the loop catches it and asks again. The `while True` only exits via `return` on success. This is the standard input validation shape, and it is why `try`/`except` beats checking `.isdigit()` — `isdigit()` is `False` for `"-5"` and for `" 12 "`, both of which `int()` accepts happily.

**Hint:** Loop forever; return from inside the `try` when the cast succeeds.

---

### Q49. Multiple Exception Types

Write a function that reads a file and parses its first line as an integer. Catch `FileNotFoundError`, `ValueError` and `PermissionError` separately, with a distinct message for each.

**Expected:**

```
missing.txt   -> FileNotFoundError: no such file: missing.txt
/root/secret  -> PermissionError: cannot read /root/secret
letters.txt   -> ValueError: first line is not an integer
```

**Explanation:** Three different failures need three different messages, so list the `except` clauses separately — Python runs the **first** matching one. Order matters when the exceptions are related: a subclass must be caught before its parent, or the parent clause swallows it first. `FileNotFoundError` and `PermissionError` are both subclasses of `OSError`.

**Hint:** Stack several `except` clauses under one `try`, most specific first.

---

### Q50. else and finally

Write a function demonstrating all four blocks — `try`, `except`, `else`, `finally` — with print statements in each, so you can see the execution order in both the success and failure cases.

```
Success case: try -> else -> finally
Failure case: try -> except -> finally
```

**Explanation:** `else` runs only when the `try` block raised nothing; `finally` runs **always**, exception or not, and even if the `try` block executes a `return`. So the two orders are try→else→finally and try→except→finally. Put cleanup in `finally` and the success path in `else` — code after the `try` that belongs in `else` will also run after a caught exception, which is rarely what you want.

**Hint:** Print a marker in each of the four blocks and call the function twice.

---

### Q51. Raising Exceptions

Write `set_age(age)` that raises `ValueError` for a negative age and `TypeError` for a non-integer. Include a clear message in each.

```python
set_age(-5)      # ValueError: Age cannot be negative, got -5
set_age("ten")   # TypeError: Age must be an integer, got str
```

**Explanation:** Choose the exception type by what is wrong: `ValueError` when the type is right but the value is not, `TypeError` when the type itself is wrong. Include the offending value in the message — `f"Age cannot be negative, got {age}"` tells you what happened; a bare `"Invalid age"` does not. Check the type **first**, because `-5 < 0` would raise `TypeError` anyway on a string, but with a far less helpful message.

**Hint:** `isinstance(age, int)` for the type check, and note `bool` is a subclass of `int`.

---

### Q52. Custom Exception

Define `InsufficientFundsError` inheriting from `Exception`, with attributes for the requested and available amounts. Raise it from a withdrawal function and catch it, printing the shortfall.

```
InsufficientFundsError: requested ₹5000 but only ₹3200 available (short by ₹1800)
```

**Note:** Defining an exception class is allowed here even though classes are Phase 4 — the syntax is minimal and exceptions require it.

**Explanation:** A custom exception carries structured data, not just text: store `requested` and `available` as attributes in `__init__`, then the handler can compute the shortfall itself rather than parsing your message string. Always call `super().__init__(message)` so the exception still prints sensibly if nobody catches it.

**Hint:** `class InsufficientFundsError(Exception):` with an `__init__` taking both amounts.

---

### Q53. Assertions

Write a function computing an average that asserts the input list is non-empty. Show what happens when the assertion fails, and explain why assertions must not be used for validating user input.

**Expected:**

```python
average([1, 2, 3])   # 2.0
average([])          # AssertionError: cannot average an empty list
```

Then run with `python -O yourfile.py` and note the assertion is **skipped
entirely** — which is exactly why assertions must never validate user input.

**Explanation:** `average([1,2,3])` is `2.0`; the empty list trips the assertion. The critical part is the second half: running with `python -O` **strips every assert statement from the bytecode**, so the check simply does not exist in optimised mode. Assertions are for catching your own logic bugs during development; user input must be validated with a real `if` and a real `raise`.

**Hint:** `assert numbers, "cannot average an empty list"` — an empty list is falsy.

---

### Q54. Retry Logic

Write `retry(func, attempts=3)` that calls a function and retries on exception up to `attempts` times, with the attempt number printed each time. Re-raise the last exception if all attempts fail.

**Expected:**

```
attempt 1 failed: ConnectionError
attempt 2 failed: ConnectionError
attempt 3 succeeded
```

and when all attempts fail:

```
attempt 1 failed / attempt 2 failed / attempt 3 failed
ConnectionError raised to the caller
```

**Explanation:** Loop `attempts` times, returning immediately on success. The subtlety is the final failure: catch the exception each time, but on the **last** attempt re-raise it instead of swallowing it, or the caller gets `None` and no idea anything went wrong. Store the exception and `raise` it after the loop.

**Hint:** `for i in range(attempts):` with `try`/`except`, and re-raise when `i == attempts - 1`.

---

### Q55. Exception Chaining

Write a function that catches a low-level `ValueError` and raises a higher-level custom exception using `raise ... from err`. Print the full traceback and observe both exceptions.

**Expected:**

```
ValueError: invalid literal for int() with base 10: 'abc'

The above exception was the direct cause of the following exception:

ConfigurationError: could not parse the port setting
```

Both exceptions appear. That chain is what `from err` preserves.

**Explanation:** `raise NewError(...) from err` sets `__cause__`, which is what produces the *"The above exception was the direct cause of…"* line and keeps **both** tracebacks visible. Without `from err` you still get a chained traceback, but worded as *"During handling of the above exception, another exception occurred"* — which reads like a bug in your handler rather than a deliberate translation.

**Hint:** Catch the low-level error as `err`, then raise your own `from err`.

---

### Q56. Robust File Processor

Write `process_file(path)` that handles every realistic failure: file missing, file empty, permission denied, malformed content, and encoding errors. It should return a result dictionary with a `success` flag and an `error` message rather than crashing.

```python
process_file("missing.txt")
# {'success': False, 'error': 'File not found: missing.txt', 'data': None}
```

**Explanation:** Returning a result dictionary instead of raising pushes the decision to the caller — useful at a boundary such as a web handler, where a crash is not an option. Keep the shape identical in every branch (`success`, `error`, `data` always present) so callers never have to check whether a key exists. `UnicodeDecodeError` is the one people forget: a file that is not UTF-8 fails on **read**, not on open.

**Hint:** One `try` with several `except` clauses, each returning the same dictionary shape.

---

## Tier 6 — Integration Challenges (Q57–Q60)

Expect 45–90 minutes each.

### Q57. Contact Manager with Persistence

Build a contact manager that survives restarts by saving to JSON.

Requirements:

- `load_contacts(path)` — returns a dictionary, or an empty one if the file does not exist
- `save_contacts(contacts, path)` — writes with indentation
- `add_contact`, `search_contact`, `update_contact`, `delete_contact` — each a separate function with type hints and docstrings
- Validate that phone numbers are exactly 10 digits, raising a custom `ValidationError`
- A menu loop calling these functions
- Every file operation wrapped in exception handling
- On exit, save automatically and report how many contacts were written

**The test that matters:** run the program, add contacts, exit, restart. Your data must still be there.

**Hint:** Write `load_contacts` to return `{}` when the file is missing — that single decision removes the entire first-run special case from every other function.

---

### Q58. CSV Data Analysis Pipeline

Generate a CSV of 100 sales records (use `random` with a fixed seed for reproducibility), with columns: `date`, `region`, `product`, `units`, `unit_price`.

Then build an analysis pipeline as separate functions:

- `load_sales(path)` — returns a list of dictionaries, casting numeric fields
- `total_revenue(sales)` — overall
- `revenue_by(sales, key)` — grouped by any column, returning a dictionary
- `top_n(sales, key, n=5)` — the n highest by revenue
- `monthly_trend(sales)` — revenue per month
- `write_report(stats, path)` — a formatted text report

Handle malformed rows by skipping them and counting how many were skipped. Print the report and write it to `sales_report.txt`.

**Hint:** Make `revenue_by(sales, key)` take the column name as a string so one function serves region, product and month. Skip malformed rows with a counter, never silently.

---

### Q59. Text File Word Game

Build a word-guessing game that reads its word list from a file.

- `load_words(path)` — reads words, filters to those 5–10 letters long, raises a custom error if the file has no valid words
- `choose_word(words)` — random selection with a seed parameter for testing
- `display_progress(word, guessed)` — returns the masked word like `p _ t h _ n`
- `play_game(word, max_wrong=6)` — the main loop
- Track guessed letters, reject repeats, count wrong guesses
- Save a high-score table to JSON, appending each game's result
- Show statistics on exit: games played, win rate, average guesses

**Hint:** `display_progress` should return a string rather than printing, so you can test it without capturing output. Pass the random seed in as a parameter.

---

### Q60. Mini Expense Tracker

Build a complete expense tracker using everything from Phase 3.

**Data layer:**
- Store expenses as a list of dictionaries in `expenses.json`
- Each expense: `id`, `date`, `category`, `amount`, `note`

**Functions required:**
- `add_expense(...)` — validates date format with `datetime.strptime`, validates positive amount, auto-assigns the next id
- `delete_expense(expense_id)` — raises a custom `NotFoundError` if the id does not exist
- `filter_expenses(expenses, **criteria)` — flexible filtering by category, date range or amount range using `**kwargs`
- `summary_by_category(expenses)` — totals and percentages
- `monthly_report(expenses, year, month)` — full breakdown for one month
- `export_csv(expenses, path)` — writes a CSV export
- `import_csv(path)` — reads one back, validating every row and reporting failures

**Requirements:**
- Every function has a docstring and type hints
- Every file operation handles exceptions
- The menu loop never crashes, whatever the user types
- A `--demo` command-line flag (via `sys.argv`) that loads 20 sample expenses so you can test quickly

**Hint:** Do the JSON load and save in exactly two functions, and let every other function work on the in-memory list. Mixing file access into the logic is what makes these projects collapse.

---

## Checking your work

1. **Verify the recursion.** Q18's Hanoi must produce exactly `2**n - 1` moves. Q14's `fib(30)` is `832040`. Q12's product of 1–10 is `3628800`.
2. **Test the failure paths deliberately.** Delete a file your code expects. Pass a string where a number is expected. Feed an empty file. Your Tier 5 functions should handle every one without a traceback.
3. **Check that files actually persist.** Q57 and Q60 are only correct if the data survives a restart. Run, exit, run again.

> ⚠️ Two traps in this phase will cost you the most time. First, **the mutable default argument** from Q10 — it produces wrong results silently, with no error. Second, **bare `except:`** — it catches everything including `KeyboardInterrupt` and typos in your own code, turning a five-second bug hunt into an hour. Always catch the specific exception you expect.
>

---

[← Phase 3 index](README.md) · [Solutions](solutions.md) · [Test runner](tests/README.md) · [Projects & Key Takeaways](projects-and-takeaways.md)
