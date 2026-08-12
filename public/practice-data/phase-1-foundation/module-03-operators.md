# 🔢 Module 3: Operators — Detailed Notes with Examples

> Operators are symbols that tell Python to perform specific mathematical, logical, or comparison operations. Mastering them is essential before writing real programs.
> 

---

## 1. Arithmetic Operators

Used for math operations.

| Operator | Name | Example | Result | Explanation |
| --- | --- | --- | --- | --- |
| `+` | Addition | `5 + 3` | `8` | Adds two numbers |
| `-` | Subtraction | `5 - 3` | `2` | Subtracts right from left |
| `*` | Multiplication | `5 * 3` | `15` | Multiplies two numbers |
| `/` | Division | `7 / 2` | `3.5` | Always returns a float |
| `//` | Floor Division | `7 // 2` | `3` | Divides and rounds down |
| `%` | Modulus | `7 % 2` | `1` | Returns the remainder |
| `**` | Exponentiation | `2 ** 3` | `8` | Raises to a power |

### Basic examples

```python
a = 17
b = 5

print(a + b)    # 22
print(a - b)    # 12
print(a * b)    # 85
print(a / b)    # 3.4
print(a // b)   # 3
print(a % b)    # 2
print(a ** b)   # 1419857
```

### Real-world examples

```python
# Check if a number is even or odd
num = 7
if num % 2 == 0:
    print("Even")
else:
    print("Odd")

# Get last digit of a number
last_digit = 1234 % 10
print(last_digit)  # 4

# Calculate area of square
side = 5
area = side ** 2
print(area)  # 25

# Split items equally among people
items = 23
people = 5
per_person = items // people
leftover = items % people
print(f"Each person gets {per_person}, leftover: {leftover}")
```

Output:

```
Each person gets 4, leftover: 3
```

### Important notes

- `/` always returns a float, even if the division is exact.
- `//` returns the floor (rounded down) result, also as a float if either operand is a float.

```python
print(8 / 2)    # 4.0
print(8 // 2)   # 4
print(7.5 // 2) # 3.0
```

---

## 2. Comparison (Relational) Operators

Compare two values and return a boolean (`True` or `False`).

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `5 != 3` | `True` |
| `>` | Greater than | `5 > 3` | `True` |
| `<` | Less than | `5 < 3` | `False` |
| `>=` | Greater than or equal | `5 >= 5` | `True` |
| `<=` | Less than or equal | `5 <= 3` | `False` |

### Examples

```python
x = 10
y = 20

print(x == y)  # False
print(x != y)  # True
print(x > y)   # False
print(x < y)   # True
print(x >= 10) # True
print(y <= 15) # False
```

### Common mistake: `=` vs `==`

```python
x = 5     # assigns 5 to x
print(x == 5)   # True, compares
print(x = 5)    # SyntaxError! You cannot use = in print()
```

### Comparing strings

```python
print("apple" == "apple")  # True
print("apple" < "banana")  # True (compares alphabetically)
print("Z" > "a")           # False (uppercase has lower ASCII values)
```

### Comparing different types

```python
print(5 == 5.0)    # True (values are equal)
print(5 == "5")    # False (different types)
```

---

## 3. Logical Operators

Combine boolean expressions.

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `and` | True if both are True | `True and False` | `False` |
| `or` | True if at least one is True | `True or False` | `True` |
| `not` | Reverses the value | `not True` | `False` |

### Truth table

| A | B | A and B | A or B | not A |
| --- | --- | --- | --- | --- |
| True | True | True | True | False |
| True | False | False | True | False |
| False | True | False | True | True |
| False | False | False | False | True |

### Real-world examples

```python
age = 25
has_id = True

if age >= 18 and has_id:
    print("Allowed to enter")

is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print("No work today")

is_raining = True
if not is_raining:
    print("Go for a walk")
else:
    print("Stay indoors")
```

### Short-circuit behavior

```python
# and stops at first False
result = False and print("This won't print")
# or stops at first True
result = True or print("This won't print")
```

---

## 4. Assignment Operators

Shortcuts for updating a variable.

| Operator | Same as | Example | Result if x = 10 |
| --- | --- | --- | --- |
| `=` | Assignment | `x = 10` | `10` |
| `+=` | `x = x +` | `x += 5` | `15` |
| `-=` | `x = x -` | `x -= 3` | `7` |
| `*=` | `x = x *` | `x *= 2` | `20` |
| `/=` | `x = x /` | `x /= 2` | `5.0` |
| `//=` | `x = x //` | `x //= 3` | `3` |
| `%=` | `x = x %` | `x %= 3` | `1` |
| `**=` | `x = x **` | `x **= 2` | `100` |

### Example

```python
score = 100
score += 10   # 110
score -= 20   # 90
score *= 2    # 180
score /= 3    # 60.0

print(score)  # 60.0
```

---

## 5. Bitwise Operators

Work on binary representation of numbers. Useful in low-level programming, networking, and optimization.

| Operator | Name | Operation |
| --- | --- | --- |
| `&` | AND | 1 if both bits are 1 |
| `\ | ` | OR |
| `^` | XOR | 1 if bits are different |
| `~` | NOT | Inverts all bits |
| `<<` | Left Shift | Shifts bits left |
| `>>` | Right Shift | Shifts bits right |

### Examples

```python
a = 5   # binary: 101
b = 3   # binary: 011

print(a & b)   # 1  (001)
print(a | b)   # 7  (111)
print(a ^ b)   # 6  (110)
print(~a)      # -6 (inverts all bits)
print(a << 1)  # 10 (1010)
print(a >> 1)  # 2  (10)
```

### Real-world use case: checking permissions

```python
READ = 4   # 100 in binary
WRITE = 2  # 010 in binary
EXECUTE = 1  # 001 in binary

user_permission = 5  # 101 in binary (read + execute)

can_read = user_permission & READ
print(can_read > 0)  # True

can_write = user_permission & WRITE
print(can_write > 0)  # False
```

---

## 6. Identity Operators

Check if two variables point to the **same object in memory**.

| Operator | Meaning | Example |
| --- | --- | --- |
| `is` | True if same object | `x is y` |
| `is not` | True if different objects | `x is not y` |

### Examples

```python
a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(a is b)      # True (same object)
print(a is c)      # False (different objects, same values)
print(a == c)      # True (values are equal)
print(a is not c)  # True
```

### Identity with small integers

Python reuses small integer objects for performance (-5 to 256).

```python
x = 5
y = 5
print(x is y)  # True (same object)

x = 1000
y = 1000
print(x is y)  # False (different objects, same value)
```

### When to use `is` vs `==`

- Use `==` to check if values are equal.
- Use `is` to check if two variables refer to the same object (rarely needed for beginners).

```python
x = None
if x is None:
    print("x has no value")
```

---

## 7. Membership Operators

Test whether a value is inside a sequence (string, list, tuple, dictionary keys, etc.).

| Operator | Meaning | Example |
| --- | --- | --- |
| `in` | True if value exists | `"a" in "apple"` |
| `not in` | True if value does not exist | `5 not in [1, 2, 3]` |

### Examples

```python
fruits = ["apple", "banana", "cherry"]

print("apple" in fruits)       # True
print("grape" not in fruits)   # True
print("m" in "Mahesh")         # True
print("z" not in "Mahesh")     # True

# Check if a substring exists
sentence = "Python is easy to learn"
print("Python" in sentence)    # True
print("hard" in sentence)      # False
```

### Membership in dictionary keys

```python
person = {"name": "Mahesh", "age": 25}
print("name" in person)        # True
print("Mahesh" in person)      # False (checks keys, not values)
```

---

## Operator Precedence

Operator precedence determines the order in which operations are performed. Use parentheses `()` to make the order explicit.

### Precedence table (highest to lowest)

1. `()` — Parentheses
2. `**` — Exponentiation
3. `~`, `+x`, `-x` — Unary operators
4. `*`, `/`, `//`, `%` — Multiplication, division, floor division, modulus
5. `+`, `-` — Addition and subtraction
6. `<<`, `>>` — Bitwise shifts
7. `&` — Bitwise AND
8. `^` — Bitwise XOR
9. `\|` — Bitwise OR
10. `==`, `!=`, `>`, `<`, `>=`, `<=` — Comparisons
11. `not` — Logical NOT
12. `and` — Logical AND
13. `or` — Logical OR

### Examples

```python
result = 2 + 3 * 4
print(result)  # 14, not 20 (multiplication before addition)

result = (2 + 3) * 4
print(result)  # 20 (parentheses first)

result = 10 > 5 and 3 < 8
print(result)  # True

result = not True or False
print(result)  # False (not first, then or)
```

### Practical example

```python
# Calculate average of three numbers
a = 10
b = 20
c = 30
average = (a + b + c) / 3
print(average)  # 20.0
```

---

## Common Mistakes and Interview Questions

### Mistake 1: Using `=` in conditions

```python
# Wrong
if x = 5:
    print("x is 5")

# Correct
if x == 5:
    print("x is 5")
```

### Mistake 2: Confusing `and`/`or` with `&`/`|` for booleans

```python
# These work for booleans
print(True and False)  # False
print(True & False)    # False

# But & and | are bitwise, not logical
# Always use and/or for boolean logic
```

### Interview question: What is `5 + 3 * 2`?

```python
print(5 + 3 * 2)  # 11 (multiplication first)
```

### Interview question: Difference between `==` and `is`

- `==` compares values.
- `is` compares memory addresses (object identity).

```python
a = [1, 2]
b = [1, 2]
print(a == b)  # True
print(a is b)  # False
```

---

## 📝 Practice Exercises for Module 3

Try these in your IDE:

1. Write a program that takes two numbers from the user and prints their sum, difference, product, quotient, and remainder.
2. Check if a year is a leap year (divisible by 4, but not by 100 unless also by 400).
3. Write a program that checks if a character is a vowel.
4. Create a simple calculator that asks the user for two numbers and an operator (+, -, *, /), then prints the result.
5. Check if a user has admin permissions using bitwise operators.

---

## 🎯 Key Takeaways

- Arithmetic operators handle math: `+`, `-`, `*`, `/`, `//`, `%`, `**`.
- Comparison operators return `True` or `False`: `==`, `!=`, `>`, `<`, `>=`, `<=`.
- Logical operators combine conditions: `and`, `or`, `not`.
- Assignment operators save typing: `+=`, `-=`, `*=`, etc.
- Bitwise operators work on binary data: `&`, `\|`, `^`, `~`, `<<`, `>>`.
- Identity operators check object identity: `is`, `is not`.
- Membership operators check if something exists inside a sequence: `in`, `not in`.
- Always use parentheses to make complex expressions clear.

> 💡 **Tip:** Write down each operator in your own notebook with one example. This will help you remember them during coding interviews and real projects.
> 

[Module 3: Operators — Detailed Notes + Examples](https://app.notion.com/p/Module-3-Operators-Detailed-Notes-Examples-0b1261b1c1a14e9eb0ab8619dfa67150?pvs=21)
