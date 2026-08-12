# Module 9: Functions

## What is a Function?

A **function** is a named block of reusable code that performs a specific task. You write it once, then call it as many times as you need.

```python
def greet():
    print("Hello, welcome to Python!")

greet()
greet()
```

Output:

```
Hello, welcome to Python!
Hello, welcome to Python!
```

### Why use functions?

- **Avoid repetition**: Write the logic once, reuse it everywhere (DRY — Don't Repeat Yourself).
- **Easier to read**: `calculate_total()` explains itself better than 20 lines of math.
- **Easier to fix**: If there is a bug, you fix it in one place.
- **Easier to test**: You can test each function separately.
- **Teamwork**: Different people can write different functions of the same project.

### Without a function vs with a function

Without:

```python
print("Area of square 1:", 5 * 5)
print("Area of square 2:", 8 * 8)
print("Area of square 3:", 12 * 12)
```

With:

```python
def area_of_square(side):
    return side * side

print("Area of square 1:", area_of_square(5))
print("Area of square 2:", area_of_square(8))
print("Area of square 3:", area_of_square(12))
```

---

## Defining and Calling a Function

### Syntax

```python
def function_name(parameters):
    """Optional docstring"""
    # body of the function
    return value
```

Breaking it down:

| Part | Meaning |
| --- | --- |
| `def` | Keyword that starts a function definition |
| `function_name` | Name you give the function (use `snake_case`) |
| `parameters` | Inputs the function accepts (optional) |
| `:` | Colon ends the header line |
| Indented body | The code that runs when the function is called |
| `return` | Sends a value back to the caller (optional) |

### Example

```python
def add(a, b):
    result = a + b
    return result

total = add(10, 5)
print(total)   # 15
```

### Important: define before you call

```python
greet()        # ❌ NameError: name 'greet' is not defined

def greet():
    print("Hello")
```

Python reads the file top to bottom, so the `def` must run before the call.

---

## Parameters vs Arguments

People mix these two words up, but they are different.

- **Parameter** — the variable name in the function definition.
- **Argument** — the actual value you pass when calling.

```python
def greet(name):        # 'name' is a PARAMETER
    print(f"Hello, {name}!")

greet("Mahesh")         # "Mahesh" is an ARGUMENT
```

Output:

```
Hello, Mahesh!
```

---

## The `return` Statement

`return` sends a value back to whoever called the function and **immediately exits** the function.

```python
def square(n):
    return n * n

x = square(6)
print(x)   # 36
```

### `return` vs `print()`

This is the most common beginner confusion.

| `print()` | `return` |
| --- | --- |
| Shows text on screen | Gives a value back to the program |
| Returns `None` | Returns the actual value |
| You cannot reuse the output | You can store the result in a variable |

```python
def add_print(a, b):
    print(a + b)

def add_return(a, b):
    return a + b

x = add_print(2, 3)     # prints 5
print(x)                # None  ← nothing was returned

y = add_return(2, 3)    # prints nothing
print(y)                # 5     ← value came back
print(y * 10)           # 50    ← you can keep using it
```

### Code after `return` never runs

```python
def test():
    return "first"
    print("This will never run")

print(test())   # first
```

### Returning multiple values

Python returns them as a **tuple**, which you can unpack.

```python
def calculate(a, b):
    return a + b, a - b, a * b

add, sub, mul = calculate(10, 3)
print(add)   # 13
print(sub)   # 7
print(mul)   # 30
```

### A function with no `return` returns `None`

```python
def greet():
    print("Hi")

result = greet()
print(result)   # None
```

---

## Types of Function Arguments

### 1. Positional arguments

Values are matched to parameters **by order**.

```python
def introduce(name, city):
    print(f"{name} lives in {city}")

introduce("Mahesh", "Mumbai")   # Mahesh lives in Mumbai
introduce("Mumbai", "Mahesh")   # Mumbai lives in Mahesh  ← wrong order, wrong meaning
```

### 2. Keyword arguments

You name the parameter, so order no longer matters.

```python
def introduce(name, city):
    print(f"{name} lives in {city}")

introduce(city="Mumbai", name="Mahesh")   # Mahesh lives in Mumbai
```

### 3. Default arguments

Give a parameter a fallback value used when the caller does not pass one.

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Mahesh")                    # Hello, Mahesh!
greet("Priya", "Good morning")     # Good morning, Priya!
```

**Rule:** parameters with defaults must come **after** ones without.

```python
def greet(greeting="Hello", name):   # ❌ SyntaxError
    pass
```

### 4. Variable-length positional arguments (`*args`)

Use `*args` when you don't know how many values will be passed. They arrive as a **tuple**.

```python
def total(*numbers):
    print(numbers)          # it's a tuple
    return sum(numbers)

print(total(1, 2, 3))          # (1, 2, 3) then 6
print(total(5, 10, 15, 20))    # (5, 10, 15, 20) then 50
print(total())                 # () then 0
```

### 5. Variable-length keyword arguments (`**kwargs`)

Collects any number of named arguments as a **dictionary**.

```python
def show_profile(**details):
    for key, value in details.items():
        print(f"{key}: {value}")

show_profile(name="Mahesh", age=25, city="Mumbai")
```

Output:

```
name: Mahesh
age: 25
city: Mumbai
```

### Correct order of parameters

When you use all of them together, this order is required:

```python
def demo(a, b=2, *args, **kwargs):
    print("a       =", a)
    print("b       =", b)
    print("args    =", args)
    print("kwargs  =", kwargs)

demo(1, 5, 10, 20, x=100, y=200)
```

Output:

```
a       = 1
b       = 5
args    = (10, 20)
kwargs  = {'x': 100, 'y': 200}
```

| Order | Type | Example |
| --- | --- | --- |
| 1 | Standard positional | `a` |
| 2 | Default | `b=2` |
| 3 | `*args` | `*args` |
| 4 | `**kwargs` | `**kwargs` |

### Unpacking arguments with `*` and `**`

You can also use `*` and `**` at the **call site** to spread a list or dict.

```python
def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
print(add(*nums))            # 6

data = {"a": 10, "b": 20, "c": 30}
print(add(**data))           # 60
```

---

## Scope of Variables

**Scope** decides where a variable can be seen and used.

### Local scope

A variable created inside a function only exists inside that function.

```python
def my_func():
    x = 10          # local variable
    print(x)

my_func()   # 10
print(x)    # ❌ NameError: name 'x' is not defined
```

### Global scope

A variable created outside all functions is global and can be **read** anywhere.

```python
x = 100          # global

def show():
    print(x)     # can read it

show()       # 100
print(x)     # 100
```

### The `global` keyword

To **modify** a global variable inside a function, declare it with `global`.

```python
count = 0

def increment():
    global count
    count += 1

increment()
increment()
print(count)   # 2
```

Without `global` you get an error:

```python
count = 0

def increment():
    count += 1     # ❌ UnboundLocalError

increment()
```

### The `nonlocal` keyword

Used in a nested function to modify a variable of the **enclosing** function.

```python
def outer():
    msg = "outer"

    def inner():
        nonlocal msg
        msg = "changed by inner"

    inner()
    print(msg)

outer()   # changed by inner
```

### The LEGB rule

Python looks up a name in this order:

| Letter | Scope | Meaning |
| --- | --- | --- |
| **L** | Local | Inside the current function |
| **E** | Enclosing | Inside any outer function |
| **G** | Global | At the top level of the file |
| **B** | Built-in | Names Python provides, like `print`, `len` |

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)

    inner()

outer()      # local
print(x)     # global
```

> ⚠️ Avoid using globals for normal work. Pass values in as parameters and send results back with `return` — it makes code far easier to debug.
>

---

## Docstrings

A **docstring** is a string on the first line of a function that explains what it does. Tools and `help()` read it.

```python
def area_of_circle(radius):
    """
    Calculate the area of a circle.

    Parameters:
        radius (float): The radius of the circle.

    Returns:
        float: The area of the circle.
    """
    return 3.14159 * radius ** 2

print(area_of_circle(5))       # 78.53975
print(area_of_circle.__doc__)  # prints the docstring
help(area_of_circle)           # nicely formatted documentation
```

### Good docstring practice

- Write one short line saying what the function does.
- Mention the parameters and what it returns.
- Use it for every function that is not completely obvious.

---

## Lambda (Anonymous) Functions

A **lambda** is a small, one-line function with no name.

### Syntax

```python
lambda arguments: expression
```

The expression is automatically returned — there is no `return` keyword.

```python
square = lambda x: x * x
print(square(5))   # 25

add = lambda a, b: a + b
print(add(3, 7))   # 10
```

### Normal function vs lambda

```python
# Normal function
def double(x):
    return x * 2

# Lambda equivalent
double = lambda x: x * 2
```

| Normal function (`def`) | Lambda |
| --- | --- |
| Has a name | Anonymous (usually unnamed) |
| Can have many statements | Only one expression |
| Uses `return` | Returns automatically |
| Good for complex logic | Good for short throwaway logic |

### Where lambdas are actually useful

```python
students = [("Mahesh", 85), ("Priya", 92), ("Ravi", 78)]

# Sort by marks
students.sort(key=lambda s: s[1])
print(students)   # [('Ravi', 78), ('Mahesh', 85), ('Priya', 92)]

# Sort by marks, highest first
students.sort(key=lambda s: s[1], reverse=True)
print(students)   # [('Priya', 92), ('Mahesh', 85), ('Ravi', 78)]
```

---

## `map()`, `filter()`, and `reduce()`

These three functions apply a function to a whole sequence. They pair very well with lambdas.

### `map()` — transform every item

```python
numbers = [1, 2, 3, 4, 5]

squares = list(map(lambda x: x ** 2, numbers))
print(squares)   # [1, 4, 9, 16, 25]

names = ["mahesh", "priya"]
upper = list(map(str.upper, names))
print(upper)     # ['MAHESH', 'PRIYA']
```

### `filter()` — keep only items that pass a test

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)     # [2, 4, 6, 8, 10]

big = list(filter(lambda x: x > 5, numbers))
print(big)       # [6, 7, 8, 9, 10]
```

### `reduce()` — squeeze a sequence into one value

`reduce()` lives in the `functools` module, so you must import it.

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

product = reduce(lambda a, b: a * b, numbers)
print(product)   # 120

maximum = reduce(lambda a, b: a if a > b else b, numbers)
print(maximum)   # 5
```

### Comprehension is often cleaner

```python
numbers = [1, 2, 3, 4, 5]

# map version
squares = list(map(lambda x: x ** 2, numbers))

# comprehension version — more Pythonic
squares = [x ** 2 for x in numbers]
```

---

## Recursion

**Recursion** is when a function calls itself to solve a smaller version of the same problem.

Every recursive function needs two things:

1. **Base case** — the condition that stops the recursion.
2. **Recursive case** — the function calling itself with a smaller input.

### Factorial

```python
def factorial(n):
    if n == 0 or n == 1:      # base case
        return 1
    return n * factorial(n - 1)   # recursive case

print(factorial(5))   # 120
```

How `factorial(5)` unfolds:

```
factorial(5) = 5 * factorial(4)
             = 5 * 4 * factorial(3)
             = 5 * 4 * 3 * factorial(2)
             = 5 * 4 * 3 * 2 * factorial(1)
             = 5 * 4 * 3 * 2 * 1
             = 120
```

### Fibonacci

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(10):
    print(fibonacci(i), end=" ")
```

Output:

```
0 1 1 2 3 5 8 13 21 34
```

### Sum of a list

```python
def list_sum(items):
    if not items:            # base case: empty list
        return 0
    return items[0] + list_sum(items[1:])

print(list_sum([1, 2, 3, 4, 5]))   # 15
```

### Missing base case = crash

```python
def bad(n):
    return n + bad(n - 1)    # never stops

bad(5)   # ❌ RecursionError: maximum recursion depth exceeded
```

Python's default recursion limit is 1000 calls:

```python
import sys
print(sys.getrecursionlimit())   # 1000
```

### Recursion vs loops

| Recursion | Loop |
| --- | --- |
| Elegant for tree/nested problems | Faster and uses less memory |
| Uses extra memory (call stack) | No stack growth |
| Can hit recursion limit | No limit issue |

Use recursion for naturally nested problems (folders inside folders, tree traversal). Use loops for simple repetition.

---

## How Python Passes Arguments

Python passes arguments by **object reference**. What happens depends on whether the object is mutable.

### Immutable types (int, float, str, tuple) — original is safe

```python
def change(x):
    x = 100
    print("Inside:", x)

num = 10
change(num)
print("Outside:", num)
```

Output:

```
Inside: 100
Outside: 10
```

### Mutable types (list, dict, set) — original CAN change

```python
def add_item(items):
    items.append(4)

my_list = [1, 2, 3]
add_item(my_list)
print(my_list)   # [1, 2, 3, 4]  ← original changed!
```

To protect the original, pass a copy:

```python
add_item(my_list.copy())
```

### ⚠️ The mutable default argument trap

```python
def add_item(item, items=[]):     # ❌ dangerous
    items.append(item)
    return items

print(add_item("a"))   # ['a']
print(add_item("b"))   # ['a', 'b']  ← unexpected!
```

The default list is created **once** and shared across all calls. The fix:

```python
def add_item(item, items=None):   # ✅ correct
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("a"))   # ['a']
print(add_item("b"))   # ['b']
```

---

## Function Annotations (Type Hints)

Type hints tell readers what types a function expects and returns. Python does **not** enforce them — they are documentation.

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

def add(a: int, b: int) -> int:
    return a + b

def average(numbers: list) -> float:
    return sum(numbers) / len(numbers)

print(greet("Mahesh"))       # Hello, Mahesh!
print(add.__annotations__)   # {'a': <class 'int'>, 'b': <class 'int'>, 'return': <class 'int'>}
```

They make large projects much easier to read and let editors catch mistakes early.

---

## Functions Are Objects

In Python, functions are values. You can store them in variables, pass them around, and return them.

```python
def greet(name):
    return f"Hello, {name}"

# Store in a variable
say_hi = greet
print(say_hi("Mahesh"))    # Hello, Mahesh

# Pass as an argument
def run_twice(func, value):
    print(func(value))
    print(func(value))

run_twice(greet, "Priya")

# Store in a list
operations = [len, str.upper, str.strip]
```

---

## Common Mistakes with Functions

### 1. Forgetting the parentheses when calling

```python
def greet():
    return "Hello"

print(greet)     # <function greet at 0x...>  ← the function object
print(greet())   # Hello                      ← the result
```

### 2. Forgetting to return

```python
# Wrong
def add(a, b):
    a + b

print(add(2, 3))   # None

# Correct
def add(a, b):
    return a + b

print(add(2, 3))   # 5
```

### 3. Shadowing built-in names

```python
# Wrong
def list(items):     # now the built-in list() is broken
    pass

# Correct
def make_list(items):
    pass
```

### 4. Wrong number of arguments

```python
def add(a, b):
    return a + b

add(1)          # ❌ TypeError: add() missing 1 required positional argument: 'b'
add(1, 2, 3)    # ❌ TypeError: add() takes 2 positional arguments but 3 were given
```

### 5. Doing too much in one function

A function should do **one** job. If you cannot describe it in one sentence, split it into smaller functions.

---

## Quick Reference

| Concept | Syntax | Example |
| --- | --- | --- |
| Define | `def name():` | `def greet():` |
| Call | `name()` | `greet()` |
| Parameter | `def f(x):` | `def square(n):` |
| Default | `def f(x=1):` | `def greet(name="Guest"):` |
| Return | `return value` | `return a + b` |
| Many positional | `*args` | `def total(*nums):` |
| Many keyword | `**kwargs` | `def profile(**info):` |
| Anonymous | `lambda x: expr` | `lambda x: x * 2` |
| Global change | `global var` | `global count` |
| Outer change | `nonlocal var` | `nonlocal msg` |
| Type hint | `def f(x: int) -> int:` | `def add(a: int) -> int:` |
