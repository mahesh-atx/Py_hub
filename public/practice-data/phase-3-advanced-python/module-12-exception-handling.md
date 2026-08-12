# Module 12: Exception Handling

## What is an Exception?

An **exception** is an error that happens **while your program is running**. When Python hits one and you have not handled it, the program stops immediately and prints an error message.

```python
print("Start")
print(10 / 0)      # ZeroDivisionError
print("End")       # never runs
```

Output:

```
Start
Traceback (most recent call last):
  File "main.py", line 2, in <module>
    print(10 / 0)
ZeroDivisionError: division by zero
```

**Exception handling** lets you catch these errors and keep the program running.

---

## Syntax Errors vs Exceptions

These are two different things and people often confuse them.

| Syntax Error | Exception |
| --- | --- |
| Broken grammar in the code | Valid code that fails while running |
| Found **before** the program starts | Found **during** execution |
| Cannot be caught with `try` | Can be caught with `try` |
| Example: missing colon | Example: dividing by zero |

### Syntax error

```python
if 5 > 3
    print("Hello")     # ❌ SyntaxError: expected ':'
```

The program never runs at all.

### Exception

```python
number = int("hello")   # ❌ ValueError
```

The code is grammatically fine, but it fails when it runs.

---

## Common Built-in Exceptions

| Exception | When it happens | Example |
| --- | --- | --- |
| `ZeroDivisionError` | Dividing by zero | `10 / 0` |
| `ValueError` | Right type, wrong value | `int("abc")` |
| `TypeError` | Wrong type used | `"5" + 5` |
| `NameError` | Variable does not exist | `print(undefined_var)` |
| `IndexError` | List index out of range | `[1,2,3][10]` |
| `KeyError` | Dictionary key missing | `{"a":1}["b"]` |
| `FileNotFoundError` | File does not exist | `open("missing.txt")` |
| `AttributeError` | Object has no such attribute | `"text".push()` |
| `ImportError` | Module cannot be imported | `import nonexistent` |
| `IndentationError` | Wrong indentation | Misaligned block |
| `KeyboardInterrupt` | User pressed Ctrl+C | During `input()` |
| `PermissionError` | No permission for the file | Writing to a locked file |
| `OverflowError` | Number too large | Huge float maths |
| `StopIteration` | Iterator exhausted | `next()` past the end |

### Seeing them in action

```python
print(10 / 0)                # ZeroDivisionError: division by zero
print(int("abc"))            # ValueError: invalid literal for int()
print("5" + 5)               # TypeError: can only concatenate str to str
print([1, 2, 3][10])         # IndexError: list index out of range
print({"a": 1}["b"])         # KeyError: 'b'
print(undefined_variable)    # NameError: name 'undefined_variable' is not defined
```

---

## The `try` and `except` Block

### Syntax

```python
try:
    # code that might cause an error
except ExceptionType:
    # code that runs if that error happens
```

### Basic example

```python
try:
    result = 10 / 0
    print(result)
except ZeroDivisionError:
    print("You cannot divide by zero!")

print("Program continues")
```

Output:

```
You cannot divide by zero!
Program continues
```

The program did **not** crash.

### A practical example

```python
try:
    age = int(input("Enter your age: "))
    print(f"Next year you will be {age + 1}")
except ValueError:
    print("Please enter a valid number!")
```

Sample run:

```
Enter your age: twenty
Please enter a valid number!
```

---

## Catching Multiple Exceptions

### Separate `except` blocks

Each error type gets its own handler.

```python
try:
    num1 = int(input("Enter first number: "))
    num2 = int(input("Enter second number: "))
    print(num1 / num2)
except ValueError:
    print("Please enter valid numbers!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
```

### One block for several exceptions

Group them in a tuple.

```python
try:
    num = int(input("Enter a number: "))
    print(10 / num)
except (ValueError, ZeroDivisionError):
    print("Invalid input or division by zero!")
```

### Order matters

Python checks `except` blocks top to bottom, so put **specific** exceptions before **general** ones.

```python
# Wrong — Exception catches everything first
try:
    print(10 / 0)
except Exception:
    print("Some error")
except ZeroDivisionError:      # never reached
    print("Division error")

# Correct — specific first
try:
    print(10 / 0)
except ZeroDivisionError:
    print("Division error")
except Exception:
    print("Some other error")
```

---

## Catching the Generic `Exception`

`Exception` is the parent of almost all errors, so it catches nearly anything.

```python
try:
    result = 10 / 0
except Exception:
    print("Something went wrong")
```

### Getting the error message with `as`

```python
try:
    result = 10 / 0
except Exception as e:
    print("Error:", e)
    print("Type:", type(e).__name__)
```

Output:

```
Error: division by zero
Type: ZeroDivisionError
```

### Bare `except` — avoid it

```python
# Bad — hides real bugs and even catches Ctrl+C
try:
    risky_code()
except:
    pass

# Better
try:
    risky_code()
except Exception as e:
    print(f"Error occurred: {e}")
```

> ⚠️ Never write a bare `except:` with `pass` inside. It swallows every error silently and makes bugs almost impossible to find. Always catch the most specific exception you can.
>

---

## The `else` Block

The `else` block runs **only if no exception was raised**.

```python
try:
    number = int(input("Enter a number: "))
except ValueError:
    print("That's not a number!")
else:
    print(f"You entered {number}. Great!")
```

Run 1:

```
Enter a number: 42
You entered 42. Great!
```

Run 2:

```
Enter a number: hello
That's not a number!
```

### Why `else` is useful

It keeps the risky line alone inside `try`, so you do not accidentally catch errors from unrelated code.

```python
# Less clear — both lines are inside try
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found")

# Clearer — try holds only the risky operation
try:
    file = open("data.txt", "r")
except FileNotFoundError:
    print("File not found")
else:
    content = file.read()
    print(content)
    file.close()
```

---

## The `finally` Block

The `finally` block runs **always** — whether there was an error or not, and even if you `return` early.

```python
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found")
finally:
    print("This always runs")
```

### Its real purpose: cleanup

```python
try:
    file = open("data.txt", "r")
    content = file.read()
    print(content)
except FileNotFoundError:
    print("File not found")
finally:
    try:
        file.close()
        print("File closed")
    except NameError:
        pass
```

### `finally` runs even after `return`

```python
def test():
    try:
        return "from try"
    finally:
        print("finally still runs")

print(test())
```

Output:

```
finally still runs
from try
```

---

## The Complete Structure

All four blocks together:

```python
try:
    # risky code
except SomeError:
    # runs if that error happens
else:
    # runs if NO error happened
finally:
    # always runs
```

### Full example

```python
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero")
        return None
    except TypeError:
        print("Error: Please provide numbers only")
        return None
    else:
        print("Division successful")
        return result
    finally:
        print("Division attempt finished\n")

print(divide(10, 2))
print(divide(10, 0))
print(divide(10, "a"))
```

Output:

```
Division successful
Division attempt finished

5.0
Error: Cannot divide by zero
Division attempt finished

None
Error: Please provide numbers only
Division attempt finished

None
```

### Execution order summary

| Block | Runs when |
| --- | --- |
| `try` | Always attempted first |
| `except` | Only if a matching error occurred |
| `else` | Only if **no** error occurred |
| `finally` | Always, no matter what |

---

## Raising Exceptions with `raise`

Use `raise` to trigger an exception yourself when something is wrong in your logic.

### Basic `raise`

```python
age = -5

if age < 0:
    raise ValueError("Age cannot be negative")
```

Output:

```
ValueError: Age cannot be negative
```

### Inside a function

```python
def set_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    print(f"Age set to {age}")

set_age(25)         # Age set to 25

try:
    set_age(-5)
except ValueError as e:
    print("Caught:", e)     # Caught: Age cannot be negative
```

### Re-raising an exception

Handle it partially (for example, log it), then pass it up.

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print("Logging the error:", e)
    raise          # send it up to the caller
```

### `raise ... from ...`

Keeps the original cause visible in the traceback.

```python
try:
    int("abc")
except ValueError as e:
    raise RuntimeError("Failed to parse config") from e
```

---

## The `assert` Statement

`assert` checks that a condition is true. If it is false, it raises an `AssertionError`.

### Syntax

```python
assert condition, "Error message"
```

### Examples

```python
age = 25
assert age > 0, "Age must be positive"
print("Valid age")      # Valid age

age = -5
assert age > 0, "Age must be positive"   # ❌ AssertionError: Age must be positive
```

```python
def calculate_average(numbers):
    assert len(numbers) > 0, "List cannot be empty"
    return sum(numbers) / len(numbers)

print(calculate_average([10, 20, 30]))   # 20.0
print(calculate_average([]))             # AssertionError: List cannot be empty
```

### `assert` vs `raise`

| `assert` | `raise` |
| --- | --- |
| For debugging and internal checks | For real error handling |
| Removed when Python runs with `-O` | Always active |
| Catches "this should never happen" bugs | Handles expected bad input |

> ⚠️ Never use `assert` to validate user input or for security checks — assertions are stripped out when Python runs in optimised mode (`python -O`).
>

---

## Custom Exceptions

You can define your own exception classes for your project's specific errors. Inherit from `Exception`.

### Creating one

```python
class InsufficientFundsError(Exception):
    """Raised when the account has insufficient funds"""
    pass

class InvalidAgeError(Exception):
    """Raised when the age is invalid"""
    pass
```

### Using it

```python
class InsufficientFundsError(Exception):
    pass

balance = 1000

def withdraw(amount):
    global balance
    if amount > balance:
        raise InsufficientFundsError(f"Cannot withdraw {amount}. Balance is only {balance}")
    balance -= amount
    print(f"Withdrew {amount}. New balance: {balance}")

try:
    withdraw(500)
    withdraw(2000)
except InsufficientFundsError as e:
    print("Error:", e)
```

Output:

```
Withdrew 500. New balance: 500
Error: Cannot withdraw 2000. Balance is only 500
```

### Custom exception with extra data

```python
class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

try:
    raise ValidationError("email", "Invalid email format")
except ValidationError as e:
    print(e)             # email: Invalid email format
    print(e.field)       # email
    print(e.message)     # Invalid email format
```

### An exception hierarchy for a project

```python
class AppError(Exception):
    """Base class for all app errors"""
    pass

class DatabaseError(AppError):
    pass

class NetworkError(AppError):
    pass

try:
    raise DatabaseError("Connection failed")
except AppError as e:              # catches every app error
    print(f"App error: {e}")
```

---

## Exception Hierarchy

All exceptions inherit from `BaseException`. Simplified view:

```
BaseException
 ├── SystemExit
 ├── KeyboardInterrupt
 └── Exception
      ├── ArithmeticError
      │    └── ZeroDivisionError
      ├── LookupError
      │    ├── IndexError
      │    └── KeyError
      ├── ValueError
      ├── TypeError
      ├── NameError
      ├── AttributeError
      ├── OSError
      │    ├── FileNotFoundError
      │    └── PermissionError
      └── ImportError
```

This is why catching a parent also catches its children:

```python
try:
    print([1, 2, 3][10])
except LookupError:            # IndexError is a LookupError
    print("Lookup failed")
```

Catch `Exception`, not `BaseException`, so that Ctrl+C still works:

```python
try:
    risky()
except Exception:      # ✅ lets KeyboardInterrupt through
    print("Handled")
```

---

## Nested `try` Blocks

```python
try:
    file = open("data.txt", "r")
    try:
        number = int(file.read())
        print(10 / number)
    except ValueError:
        print("File does not contain a valid number")
    except ZeroDivisionError:
        print("The number in the file is zero")
    finally:
        file.close()
except FileNotFoundError:
    print("File not found")
```

---

## Exceptions in Loops

Keep the loop running even when one item fails.

```python
numbers = ["10", "20", "abc", "30", "xyz"]
total = 0

for item in numbers:
    try:
        total += int(item)
    except ValueError:
        print(f"Skipping invalid value: {item}")

print("Total:", total)
```

Output:

```
Skipping invalid value: abc
Skipping invalid value: xyz
Total: 60
```

### Retry loop for user input

```python
while True:
    try:
        age = int(input("Enter your age: "))
        break
    except ValueError:
        print("Invalid input. Please enter a number.")

print(f"Your age is {age}")
```

Sample run:

```
Enter your age: abc
Invalid input. Please enter a number.
Enter your age: -
Invalid input. Please enter a number.
Enter your age: 25
Your age is 25
```

---

## Getting Full Error Details with `traceback`

```python
import traceback

try:
    result = 10 / 0
except Exception as e:
    print("Error type:", type(e).__name__)
    print("Error message:", e)
    print("\nFull traceback:")
    traceback.print_exc()
```

This prints the complete stack trace while your program keeps running — perfect for logging.

---

## Practical Examples

### 1. Safe calculator

```python
def calculator():
    try:
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))
        operation = input("Enter operation (+ - * /): ")

        if operation == "+":
            result = num1 + num2
        elif operation == "-":
            result = num1 - num2
        elif operation == "*":
            result = num1 * num2
        elif operation == "/":
            result = num1 / num2
        else:
            raise ValueError("Invalid operation")

    except ValueError as e:
        print("Invalid input:", e)
    except ZeroDivisionError:
        print("Cannot divide by zero")
    else:
        print(f"Result: {result}")
    finally:
        print("Thank you for using the calculator")

calculator()
```

### 2. Safe file reader

```python
def read_file(filename):
    try:
        with open(filename, "r") as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: '{filename}' does not exist")
        return None
    except PermissionError:
        print(f"Error: no permission to read '{filename}'")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

content = read_file("data.txt")
if content:
    print(content)
```

### 3. Validating user registration

```python
class ValidationError(Exception):
    pass

def register(username, password, age):
    if len(username) < 3:
        raise ValidationError("Username must be at least 3 characters")
    if len(password) < 8:
        raise ValidationError("Password must be at least 8 characters")
    if not isinstance(age, int):
        raise ValidationError("Age must be a number")
    if age < 13:
        raise ValidationError("You must be at least 13 years old")
    print(f"User '{username}' registered successfully")

users = [
    ("mahesh", "password123", 25),
    ("ab", "password123", 25),
    ("priya", "123", 22),
    ("ravi", "securepass", 10)
]

for username, password, age in users:
    try:
        register(username, password, age)
    except ValidationError as e:
        print(f"Registration failed for '{username}': {e}")
```

Output:

```
User 'mahesh' registered successfully
Registration failed for 'ab': Username must be at least 3 characters
Registration failed for 'priya': Password must be at least 8 characters
Registration failed for 'ravi': You must be at least 13 years old
```

### 4. Safe dictionary access

```python
person = {"name": "Mahesh", "age": 25}

# With try/except
try:
    print(person["city"])
except KeyError:
    print("Key 'city' not found")

# With .get() — often simpler
print(person.get("city", "Unknown"))    # Unknown
```

---

## Best Practices

### 1. Catch specific exceptions

```python
# Bad
try:
    value = int(user_input)
except Exception:
    print("Error")

# Good
try:
    value = int(user_input)
except ValueError:
    print("Please enter a valid number")
```

### 2. Never silence errors

```python
# Bad
try:
    risky_operation()
except:
    pass

# Good
try:
    risky_operation()
except SpecificError as e:
    logger.error(f"Operation failed: {e}")
```

### 3. Keep the `try` block small

```python
# Bad — which line failed?
try:
    data = load_data()
    processed = process(data)
    save(processed)
except Exception:
    print("Something failed")

# Good
try:
    data = load_data()
except FileNotFoundError:
    print("Data file missing")
    return
```

### 4. Write useful error messages

```python
# Bad
raise ValueError("Error")

# Good
raise ValueError(f"Expected age between 0 and 150, got {age}")
```

### 5. Use `finally` or `with` for cleanup

```python
# Good — with handles closing automatically
with open("data.txt") as file:
    process(file)
```

### 6. Do not use exceptions for normal flow

```python
# Bad
try:
    value = my_dict[key]
except KeyError:
    value = default

# Good
value = my_dict.get(key, default)
```

---

## LBYL vs EAFP

Two different philosophies for handling problems.

### LBYL — Look Before You Leap

Check first, then act.

```python
import os

if os.path.exists("data.txt"):
    with open("data.txt") as file:
        print(file.read())
else:
    print("File not found")
```

### EAFP — Easier to Ask Forgiveness than Permission

Just try it and handle the failure.

```python
try:
    with open("data.txt") as file:
        print(file.read())
except FileNotFoundError:
    print("File not found")
```

**Python prefers EAFP.** It avoids race conditions (the file could be deleted between the check and the open) and usually reads more cleanly.

---

## Common Mistakes with Exceptions

### 1. Catching too broadly

```python
# Wrong — hides typos and real bugs
try:
    result = calculate()
except Exception:
    result = 0
```

### 2. Wrong order of `except` blocks

```python
# Wrong — the first one catches everything
try:
    risky()
except Exception:
    pass
except ValueError:      # unreachable
    pass
```

### 3. Forgetting that `finally` overrides `return`

```python
def test():
    try:
        return 1
    finally:
        return 2      # this wins

print(test())   # 2
```

### 4. Using exceptions instead of validation

```python
# Wrong
try:
    age = int(input("Age: "))
except:
    age = 0

# Better — tell the user what went wrong and retry
while True:
    try:
        age = int(input("Age: "))
        break
    except ValueError:
        print("Please enter a whole number")
```

### 5. Catching `BaseException`

```python
# Wrong — you can no longer stop the program with Ctrl+C
try:
    while True:
        pass
except BaseException:
    pass
```

---

## Quick Reference

| Keyword | Purpose |
| --- | --- |
| `try` | Wrap code that might fail |
| `except` | Handle a specific error |
| `except X as e` | Handle it and capture the error object |
| `else` | Run only if no error occurred |
| `finally` | Always run (cleanup) |
| `raise` | Trigger an exception yourself |
| `raise ... from ...` | Raise while keeping the original cause |
| `assert` | Debug-time sanity check |

| Exception | Typical cause |
| --- | --- |
| `ValueError` | `int("abc")` |
| `TypeError` | `"5" + 5` |
| `ZeroDivisionError` | `10 / 0` |
| `IndexError` | `lst[99]` |
| `KeyError` | `d["missing"]` |
| `FileNotFoundError` | `open("nope.txt")` |
| `NameError` | Using an undefined variable |
| `AttributeError` | Calling a method that does not exist |
