# Topic Deep-Dive 10 — Errors (30 Questions)

**Focus:** catching and raising exceptions, custom exceptions, assertions, context managers, and crash-proof program design.

**How to practice:** Read the task, write your own code, use the hint if stuck, then check the solution. Many solutions trigger errors ON PURPOSE — that's the point.

---

## Question 1: Catch TypeError

**What to do:** Add a string and an int (`"5" + 3`), catch the resulting error, and print a friendly message.

**Hint:** The error type is `TypeError`.

**Solution:**

```python
try:
    result = "5" + 3
    print(result)
except TypeError:
    print("Cannot add a string and an integer")
```

**Logic:** Mismatched types raise TypeError — the catch keeps the program alive.

---

## Question 2: Catch IndexError

**What to do:** Access `items[10]` on a 3-element list, catch the error, and print "Index out of range".

**Hint:** `IndexError` fires when the position doesn't exist.

**Solution:**

```python
items = [1, 2, 3]

try:
    print(items[10])
except IndexError:
    print("Index out of range")
```

**Logic:** Bounds checking by exception — no manual `len()` needed.

---

## Question 3: Catch KeyError

**What to do:** Read `data["missing"]` from a dict that lacks that key, catch it, and print "Key not found".

**Hint:** `KeyError` — or better, avoid it with `.get()`.

**Solution:**

```python
data = {"name": "Rahul"}

try:
    print(data["missing"])
except KeyError:
    print("Key not found")

print(data.get("missing", "safe default"))
```

**Logic:** Both styles shown — catching the error, and preventing it entirely.

---

## Question 4: Catch AttributeError

**What to do:** Call `number.upper()` on an int (ints have no `upper`), catch the error, and print "That method does not exist".

**Hint:** `AttributeError` means "no such attribute/method".

**Solution:**

```python
number = 42

try:
    print(number.upper())
except AttributeError:
    print("That method does not exist for this type")
```

**Logic:** AttributeError catches wrong-method mistakes — common when refactoring.

---

## Question 5: Catch NameError

**What to do:** Print `undefined_variable` inside a try, catch the NameError, and print "Variable not defined".

**Hint:** `NameError` fires for names Python has never seen.

**Solution:**

```python
try:
    print(undefined_variable)
except NameError:
    print("Variable not defined")
```

**Logic:** Catching NameError is rare in production — but understanding it helps debug.

---

## Question 6: Raise your own exception

**What to do:** Write `set_age(age)` that raises a ValueError when age is negative, and test it with -5.

**Hint:** `raise ValueError("message")` — inside a condition.

**Solution:**

```python
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

try:
    set_age(-5)
except ValueError as e:
    print("Caught:", e)
```

**Logic:** `raise` lets YOUR code report problems using the standard error system.

---

## Question 7: Custom exception class

**What to do:** Create `InvalidAgeError(Exception)`, raise it from `set_age`, and catch it specifically.

**Hint:** Custom exceptions are just subclasses of `Exception`.

**Solution:**

```python
class InvalidAgeError(Exception):
    pass

def set_age(age):
    if age < 0:
        raise InvalidAgeError("Age cannot be negative: " + str(age))
    return age

try:
    set_age(-3)
except InvalidAgeError as e:
    print("Custom error caught:", e)
```

**Logic:** Named error types let callers react to YOUR specific failures.

---

## Question 8: raise ... from — exception chaining

**What to do:** Catch a ValueError, then raise a new RuntimeError that links back to the original using `from`.

**Hint:** `raise RuntimeError("message") from original` preserves the cause chain.

**Solution:**

```python
try:
    try:
        int("abc")
    except ValueError as original:
        raise RuntimeError("Bad data in config") from original
except RuntimeError as e:
    print("Caught:", e)
    print("Original cause:", e.__cause__)
```

**Logic:** The `from` clause records WHY the new error happened — and `e.__cause__` lets you read that chain programmatically.

---

## Question 9: Assertions

**What to do:** Use `assert` to check that a function's input is positive, and show what happens when it fails.

**Hint:** `assert condition, "message"` raises AssertionError when the condition is False.

**Solution:**

```python
def divide(a, b):
    assert b != 0, "Division by zero attempted"
    return a / b

print(divide(10, 2))

try:
    divide(10, 0)
except AssertionError as e:
    print("Assertion failed:", e)
```

**Logic:** Assertions document assumptions and catch programmer errors early.

---

## Question 10: Full try/except/else/finally chain

**What to do:** Read an int from input, square it, and print "Success" in `else`, "Failed" in `except`, and "Finished" in `finally` — so all three blocks show.

**Hint:** `else` runs only on success; `finally` always runs.

**Solution:**

```python
text = "9"

try:
    number = int(text)
except ValueError:
    print("Failed")
else:
    print("Success:", number * number)
finally:
    print("Finished")
```

**Logic:** The complete lifecycle — attempt, handle failure, celebrate success, always clean up.

---

## Question 11: Order of multiple except blocks

**What to do:** Show that `except Exception` must come AFTER specific handlers — otherwise it swallows everything.

**Hint:** Python matches except blocks top to bottom; specific first.

**Solution:**

```python
try:
    int("abc")
except ValueError:
    print("Specific: not a number")
except Exception:
    print("General: something else went wrong")
```

**Logic:** Order matters — the first matching block wins.

---

## Question 12: Tuple of exceptions in one except

**What to do:** Catch BOTH ValueError and TypeError with a single except block.

**Hint:** `except (ValueError, TypeError):`.

**Solution:**

```python
def risky(value):
    return value + 1

for value in ("abc", None, 5):
    try:
        print(risky(value))
    except (ValueError, TypeError):
        print("Bad value:", value)
```

**Logic:** Grouping related errors keeps handlers DRY. (None + 1 → TypeError; prints fine for 5)

---

## Question 13: Nested try blocks

**What to do:** An outer try reads a list index, an inner try converts the item to int — show both levels catching their own errors.

**Hint:** One try inside another; inner errors don't leak if caught inside.

**Solution:**

```python
data = ["10", "abc"]

for i in range(3):
    try:
        item = data[i]
        try:
            number = int(item)
            print("Converted:", number)
        except ValueError:
            print("Item", item, "is not a number")
    except IndexError:
        print("Index", i, "is out of range")
```

**Logic:** Each risky operation gets its own guard — layered safety.

---

## Question 14: Access the exception object

**What to do:** Catch an error and print its message and its TYPE using the `as` keyword.

**Hint:** `except ValueError as e:` — `e` is the exception object; `type(e).__name__` names it.

**Solution:**

```python
try:
    int("xyz")
except ValueError as e:
    print("Type:", type(e).__name__)
    print("Message:", e)
```

**Logic:** The exception object carries the details — log them, don't just swallow them.

---

## Question 15: Log exceptions to a file

**What to do:** Cause an error, catch it, and append its message to `error_log.txt`, then print the log.

**Hint:** Inside the except block, open the log in append mode and write `str(e)`.

**Solution:**

```python
def risky(x):
    return 10 / x

for value in (2, 0):
    try:
        risky(value)
    except ZeroDivisionError as e:
        with open("error_log.txt", "a") as log:
            log.write("ZeroDivisionError: " + str(e) + "\n")

with open("error_log.txt", "r") as log:
    print(log.read())
```

**Logic:** Persisting errors is the first step of real production monitoring.

---

## Question 16: Retry with a limited number of attempts

**What to do:** Ask for a number, allowing only 3 attempts, then give up gracefully.

**Hint:** A for loop over attempts with try/except inside, and an else clause after the loop.

**Solution:**

```python
for attempt in range(1, 4):
    try:
        number = int(input("Attempt " + str(attempt) + " - enter a number: "))
        print("Got it:", number)
        break
    except ValueError:
        print("Invalid.")
else:
    print("Failed after 3 attempts.")
```

**Logic:** Loop + try/except + for/else = the standard retry skeleton.

---

## Question 17: Validate function arguments with raise

**What to do:** Write `calculate_percentage(part, whole)` that raises ValueError when `part > whole` or `whole <= 0`.

**Hint:** Two guards at the top of the function, each with a clear message.

**Solution:**

```python
def calculate_percentage(part, whole):
    if whole <= 0:
        raise ValueError("Whole must be positive")
    if part > whole:
        raise ValueError("Part cannot exceed the whole")
    return (part / whole) * 100

print(calculate_percentage(40, 200))

try:
    calculate_percentage(150, 100)
except ValueError as e:
    print("Rejected:", e)
```

**Logic:** Fail fast — reject bad input at the door, not halfway through.

---

## Question 18: Check the exception hierarchy

**What to do:** Show that ZeroDivisionError and ValueError are both subclasses of Exception using `issubclass`.

**Hint:** `issubclass(ZeroDivisionError, Exception)`.

**Solution:**

```python
print(issubclass(ZeroDivisionError, Exception))   # True
print(issubclass(ValueError, Exception))          # True
print(issubclass(Exception, BaseException))       # True
```

**Logic:** Understanding the hierarchy explains why `except Exception` catches both.

---

## Question 19: Ignore an exception deliberately

**What to do:** Try to delete a file that may not exist, ignoring the failure — with a comment explaining when this is acceptable.

**Hint:** `except FileNotFoundError: pass` — deliberate, documented silence.

**Solution:**

```python
import os

# Acceptable here: we only wanted to ensure the file is gone.
try:
    os.remove("tf_nonexistent.txt")
except FileNotFoundError:
    pass

print("Continues without crashing")
```

**Logic:** Silently ignoring is fine when the goal is already achieved — but comment it.

---

## Question 20: finally for cleanup

**What to do:** Open a file, write to it, and use `finally` to guarantee the close — even with an error in between.

**Hint:** The close belongs in `finally`.

**Solution:**

```python
file = open("tf_finally.txt", "w")

try:
    file.write("data line\n")
    raise RuntimeError("something broke mid-write")
except RuntimeError as e:
    print("Handled:", e)
finally:
    file.close()
    print("File closed in finally")

with open("tf_finally.txt", "r") as f:
    print("Content survived:", f.read().strip())
```

**Logic:** finally guarantees cleanup — though `with` does this automatically.

---

## Question 21: try/except inside a function returning a default

**What to do:** Write `safe_int(text)` that returns the integer or 0 when conversion fails — never raising.

**Hint:** The except block returns the default.

**Solution:**

```python
def safe_int(text):
    try:
        return int(text)
    except ValueError:
        return 0

print(safe_int("42"))
print(safe_int("abc"))
```

**Logic:** Wrapping risky operations in safe functions localizes error handling.

---

## Question 22: Continue the loop on error

**What to do:** Given `data = ["1", "2", "abc", "4"]`, sum the convertible values, skipping bad entries with `continue`.

**Hint:** except block prints a warning and continues the loop.

**Solution:**

```python
data = ["1", "2", "abc", "4"]

total = 0
for item in data:
    try:
        total += int(item)
    except ValueError:
        print("Skipping bad value:", item)
        continue

print("Total:", total)
```

**Logic:** Error-tolerant loops process everything they can, skip what they can't.

---

## Question 23: Print a full traceback

**What to do:** Trigger a ZeroDivisionError and print its FULL traceback using the `traceback` module, then continue the program.

**Hint:** `traceback.print_exc()` inside the except block.

**Solution:**

```python
import traceback

try:
    result = 1 / 0
except ZeroDivisionError:
    print("Error detected. Full traceback:")
    traceback.print_exc()

print("Program continues")
```

**Logic:** Full tracebacks show the call stack — exactly what you need when debugging.

---

## Question 24: Warnings module

**What to do:** Issue a DeprecationWarning from a function and show it appearing once.

**Hint:** `import warnings; warnings.warn("message", DeprecationWarning)`.

**Solution:**

```python
import warnings

def old_function():
    warnings.warn("old_function is deprecated, use new_function", DeprecationWarning)
    return "result"

print(old_function())
```

**Logic:** Warnings flag problems without stopping execution — for library authors.

---

## Question 25: Context manager class (__enter__/__exit__)

**What to do:** Write a `Timer` class usable with `with` — it prints the elapsed time when the block ends.

**Hint:** `__enter__` starts the clock; `__exit__` stops it and prints.

**Solution:**

```python
import time

class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        elapsed = time.perf_counter() - self.start
        print("Block took", round(elapsed, 4), "seconds")

with Timer():
    total = sum(range(1_000_000))

print(total)
```

**Logic:** Any class with `__enter__`/`__exit__` works with the `with` statement.

---

## Question 26: contextlib.contextmanager

**What to do:** Create the same Timer behavior with a generator and the `@contextmanager` decorator.

**Hint:** `yield` splits the function into setup and cleanup halves.

**Solution:**

```python
import time
from contextlib import contextmanager

@contextmanager
def timer():
    start = time.perf_counter()
    yield
    elapsed = time.perf_counter() - start
    print("Block took", round(elapsed, 4), "seconds")

with timer():
    total = sum(range(1_000_000))

print(total)
```

**Logic:** Code before `yield` = __enter__; code after = __exit__. Much shorter.

---

## Question 27: Handle KeyboardInterrupt

**What to do:** Write a loop that catches Ctrl+C (KeyboardInterrupt) and exits with a friendly message.

**Hint:** `except KeyboardInterrupt:` around the loop body.

**Solution:**

```python
import time

try:
    while True:
        print("Working... (press Ctrl+C to stop)")
        time.sleep(0.5)
except KeyboardInterrupt:
    print("\nInterrupted by user. Goodbye!")
```

**Logic:** KeyboardInterrupt inherits from BaseException, NOT Exception — catch it explicitly.

---

## Question 28: Process a file, skipping bad lines

**What to do:** Create `tf_numbers.txt` mixing numbers and junk, then print the sum of the valid lines only.

**Hint:** Per-line try/except with a counter of skipped lines.

**Solution:**

```python
with open("tf_numbers.txt", "w") as file:
    file.write("10\nabc\n20\n30\nxyz\n")

total = 0
skipped = 0
with open("tf_numbers.txt", "r") as file:
    for line in file:
        try:
            total += int(line.strip())
        except ValueError:
            skipped += 1

print("Sum:", total)
print("Skipped lines:", skipped)
```

**Logic:** Real data is messy — process the good, count the bad. (Answer: 60, 2)

---

## Question 29: Guard a whole calculator operation

**What to do:** Write `safe_divide(a, b)` handling ZeroDivisionError AND TypeError, returning a message instead of crashing.

**Hint:** Two excepts or a tuple of exceptions.

**Solution:**

```python
def safe_divide(a, b):
    try:
        return a / b
    except (ZeroDivisionError, TypeError):
        return "Cannot divide those values"

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide("10", 2))
```

**Logic:** Defensive functions return answers or explanations — never crashes.

---

## Question 30: raise ... from None — suppress chaining

**What to do:** Catch a ValueError and raise a custom error with `from None` — hiding the original from the traceback.

**Hint:** `raise MyError("message") from None` replaces the cause chain.

**Solution:**

```python
class ConfigError(Exception):
    pass

try:
    try:
        number = int("not_a_number")
    except ValueError:
        raise ConfigError("Config contains an invalid number") from None
except ConfigError as e:
    print("Caught:", e)
    print("Cause hidden:", e.__cause__ is None)
```

**Logic:** `from None` says "the original cause is not useful here" — `e.__cause__` is None, so logs stay clean.

---

## Errors recap

- **The big five built-ins** — ValueError, TypeError, KeyError, IndexError, AttributeError (Q1–5).
- **Raising** — `raise`, custom classes, chaining with `from`/`from None` (Q6–8, 30).
- **Assertions** — programmer-error checks (Q9).
- **The full toolkit** — try/except/else/finally, ordering, tuples (Q10–12).
- **Nested and layered guards** (Q13).
- **Exception objects** — `as e`, messages, hierarchy (Q14, 18).
- **Production patterns** — logging, retries, safe functions, tolerant loops (Q15–16, 21–22, 28–29).
- **Tracebacks & warnings** (Q23–24).
- **Context managers** — class-based and @contextmanager (Q25–26).
- **KeyboardInterrupt** — handling Ctrl+C (Q27).
