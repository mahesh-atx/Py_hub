# Module 2: Variables and Data Types

## What is a Variable?

A **variable** is a name that refers to a value stored in memory. Think of it as a labeled box where you keep data.

```python
name = "Mahesh"
age = 25
pi = 3.14
```

Here:

- `name` stores the string `"Mahesh"`
- `age` stores the integer `25`
- `pi` stores the float `3.14`

### How variables work

When you write `x = 10`, Python:

1. Creates an integer object `10` in memory.
2. Creates a label `x` pointing to that object.

You can change what the variable points to:

```python
x = 10
x = 20
print(x)  # 20
```

---

## Variable Naming Rules and Conventions

### Rules (must follow)

1. Variable names must start with a letter or underscore `_`.
2. Variable names cannot start with a number.
3. Variable names can only contain letters, numbers, and underscores.
4. Variable names are case-sensitive.
5. You cannot use Python reserved keywords as variable names.

### Valid variable names

```python
name = "Mahesh"
_age = 25
user2 = "active"
first_name = "Mahesh"
```

### Invalid variable names

```python
2name = "Mahesh"     # starts with number
first-name = "A"     # hyphen not allowed
class = "Math"       # class is a reserved keyword
```

### Python reserved keywords

```python
False, None, True, and, as, assert, async, await, break, class, continue,
def, del, elif, else, except, finally, for, from, global, if, import, in,
is, lambda, nonlocal, not, or, pass, raise, return, try, while, with, yield
```

### Naming conventions

| Style | Use case | Example |
| --- | --- | --- |
| `snake_case` | Variables and functions | `first_name`, `total_score` |
| `UPPER_SNAKE_CASE` | Constants | `MAX_SIZE`, `PI` |
| `CamelCase` | Classes | `PersonDetails` |

```python
first_name = "Mahesh"
MAX_SIZE = 100
PI = 3.14159
```

---

## Core Data Types in Python

### 1. Integer (`int`)

Whole numbers without decimals.

```python
age = 25
year = 2024
negative = -10
big_number = 1_000_000  # underscores make big numbers readable

print(age)         # 25
print(type(age))   # <class 'int'>
```

### 2. Float (`float`)

Numbers with decimal points.

```python
price = 19.99
height = 5.9
scientific = 2.5e3  # 2500.0

print(price)         # 19.99
print(type(price))   # <class 'float'>
print(scientific)    # 2500.0
```

### 3. Complex (`complex`)

Numbers with real and imaginary parts.

```python
z = 3 + 4j
print(z)          # (3+4j)
print(type(z))    # <class 'complex'>
print(z.real)     # 3.0
print(z.imag)     # 4.0
```

Used in advanced math and signal processing.

### 4. String (`str`)

Text data. Strings are written in single, double, or triple quotes.

```python
name = 'Mahesh'
city = "Mumbai"
quote = """Python is awesome."""

print(name)         # Mahesh
print(type(name))   # <class 'str'>
```

Strings are indexed starting from 0:

```python
name = "Mahesh"
print(name[0])   # M
print(name[3])   # h
print(name[-1])  # h (last character)
```

### 5. Boolean (`bool`)

Only two possible values: `True` or `False`.

```python
is_logged_in = True
has_error = False

print(is_logged_in)   # True
print(type(is_logged_in))  # <class 'bool'>
```

### 6. NoneType (`None`)

Represents the absence of a value or a null value.

```python
result = None
print(result)        # None
print(type(result))  # <class 'NoneType'>
```

---

## `type()` and `id()` Functions

### `type()`

Returns the data type of a value.

```python
x = 10
print(type(x))      # <class 'int'>

y = "Hello"
print(type(y))      # <class 'str'>
```

### `id()`

Returns the memory address where the value is stored.

```python
x = 10
print(id(x))   # memory address of x
```

---

## Dynamic Typing in Python

Python is **dynamically typed**. This means you don't need to declare the type of a variable. The type is determined automatically when you assign a value.

```python
x = 10          # int
print(type(x))  # <class 'int'>

x = "Hello"     # now str
print(type(x))  # <class 'str'>

x = 3.14        # now float
print(type(x))  # <class 'float'>
```

This is flexible but can also cause bugs if you're not careful. Always use meaningful variable names.

---

## Type Casting (Type Conversion)

Type casting means converting a value from one data type to another.

### Common type casting functions

| Function | Description | Example |
| --- | --- | --- |
| `int()` | Converts to integer | `int("10")` → `10` |
| `float()` | Converts to float | `float("3.14")` → `3.14` |
| `str()` | Converts to string | `str(100)` → `"100"` |
| `bool()` | Converts to boolean | `bool(1)` → `True` |
| `list()` | Converts to list | `list("abc")` → `['a', 'b', 'c']` |

### Examples

```python
# String to int
num_str = "25"
num = int(num_str)
print(num + 5)      # 30

# Int to float
x = 10
print(float(x))     # 10.0

# Number to string
age = 25
print("I am " + str(age) + " years old.")  # I am 25 years old.

# Boolean conversion
print(bool(0))      # False
print(bool(1))      # True
print(bool(""))     # False (empty string)
print(bool("Hi"))   # True
```

### Invalid type casting

```python
x = int("hello")  # ValueError: invalid literal for int()
```

You cannot convert a non-numeric string to an integer.

---

## Taking Input from User

The `input()` function reads a line of text from the user.

### Important: `input()` always returns a string

```python
name = input("Enter your name: ")
print("Hello, " + name)
```

Sample run:

```
Enter your name: Mahesh
Hello, Mahesh
```

### Converting input to numbers

```python
age = int(input("Enter your age: "))
print("Next year you will be", age + 1)
```

Sample run:

```
Enter your age: 25
Next year you will be 26
```

### Multiple inputs

```python
a = int(input("Enter first number: "))
b = int(input("Enter second number: "))
print("Sum:", a + b)
```

---

## Print Formatting

### 1. f-strings (Recommended)

Prefix the string with `f` and put variables inside curly braces `{}`.

```python
name = "Mahesh"
age = 25
print(f"My name is {name} and I am {age} years old.")
```

Output:

```
My name is Mahesh and I am 25 years old.
```

You can also do expressions inside:

```python
print(f"Next year I will be {age + 1}")
```

### 2. `.format()` method

```python
name = "Mahesh"
age = 25
print("My name is {} and I am {} years old.".format(name, age))
```

You can also use positional or named placeholders:

```python
print("My name is {0} and I am {1} years old.".format(name, age))
print("My name is {n} and I am {a} years old.".format(n=name, a=age))
```

### 3. `%` formatting (Older style)

```python
name = "Mahesh"
age = 25
print("My name is %s and I am %d years old." % (name, age))
```

Common format specifiers:

| Specifier | Meaning | Example | Output |
| --- | --- | --- | --- |
| `%s` | String | `"Mahesh"` | `Mahesh` |
| `%d` | Integer | `25` | `25` |
| `%f` | Float | `3.14159` | `3.141590` |
| `%.2f` | Float with 2 decimals | `3.14159` | `3.14` |
| `%10s` | String padded to 10 chars | `"Hi"` |         `Hi` |

### Formatting numbers

```python
pi = 3.14159
print(f"Pi = {pi:.2f}")          # Pi = 3.14
print(f"Pi = {pi:.4f}")          # Pi = 3.1416
print(f"Number = {42:05d}")      # Number = 0004
```
