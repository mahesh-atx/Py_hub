# 🔄 Module 4: Control Flow — Detailed Notes with Examples

> Control flow means controlling the order in which your code runs. This module covers conditionals, loops, and loop control statements — the building blocks of program logic.
> 

---

## 1. Conditional Statements

Conditional statements let your program make decisions based on whether something is true or false.

### `if` statement

Runs a block of code only if a condition is `True`.

```python
age = 20

if age >= 18:
    print("You are an adult.")
```

Output:

```
You are an adult.
```

#### How it works

1. Python checks the condition `age >= 18`.
2. If it is `True`, the indented code runs.
3. If it is `False`, the indented code is skipped.

```python
age = 15

if age >= 18:
    print("You are an adult.")

print("This always prints.")
```

Output:

```
This always prints.
```

### `if-else` statement

Provides two paths. One runs if the condition is `True`, the other if it is `False`.

```python
age = 16

if age >= 18:
    print("You are an adult.")
else:
    print("You are a minor.")
```

Output:

```
You are a minor.
```

#### Real-world example

```python
password = input("Enter password: ")

if password == "python123":
    print("Access granted.")
else:
    print("Access denied.")
```

### `if-elif-else` statement

Used when there are multiple possible conditions to check.

```python
marks = 85

if marks >= 90:
    print("Grade A")
elif marks >= 80:
    print("Grade B")
elif marks >= 70:
    print("Grade C")
else:
    print("Grade D")
```

Output:

```
Grade B
```

#### Important rules

- Conditions are checked from top to bottom.
- Only the first matching condition runs.
- `else` is optional and runs only if no condition matches.

```python
score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("D")

# Output: B (not C, because 80 matched first)
```

### Nested `if` statements

An `if` statement inside another `if` statement.

```python
age = 25
has_ticket = True

if age >= 18:
    if has_ticket:
        print("You can enter the movie.")
    else:
        print("Please buy a ticket.")
else:
    print("You are too young.")
```

Output:

```
You can enter the movie.
```

#### When to use nested if

Use nested `if` when a decision depends on another decision.

```python
username = "admin"
password = "1234"

if username == "admin":
    if password == "1234":
        print("Login successful")
    else:
        print("Wrong password")
else:
    print("User not found")
```

### Ternary operator (one-line if-else)

A compact way to write simple if-else statements.

```python
age = 20
status = "adult" if age >= 18 else "minor"
print(status)  # adult
```

Syntax: `value_if_true if condition else value_if_false`

#### Example

```python
num = 7
result = "Even" if num % 2 == 0 else "Odd"
print(result)  # Odd
```

---

## 2. Loops

Loops allow you to repeat a block of code multiple times.

### `for` loop

Used when you know how many times to repeat, or when iterating over a sequence.

#### Using `range()`

```python
for i in range(5):
    print(i)
```

Output:

```
0
1
2
3
4
```

#### How `range()` works

```python
range(5)         # 0, 1, 2, 3, 4
range(2, 8)      # 2, 3, 4, 5, 6, 7
range(1, 10, 2)  # 1, 3, 5, 7, 9
range(5, 0, -1)  # 5, 4, 3, 2, 1
```

#### Iterating over a list

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
```

Output:

```
apple
banana
cherry
```

#### Iterating over a string

```python
for letter in "Python":
    print(letter)
```

Output:

```
P
y
t
h
o
n
```

#### Using `for` with `else`

The `else` block runs after the loop completes normally (without `break`).

```python
for i in range(5):
    print(i)
else:
    print("Loop completed")
```

Output:

```
0
1
2
3
4
Loop completed
```

### `while` loop

Repeats code as long as a condition is `True`.

```python
count = 1

while count <= 5:
    print(count)
    count += 1
```

Output:

```
1
2
3
4
5
```

#### How it works

1. Check condition `count <= 5`.
2. If `True`, run the indented code.
3. Update `count`.
4. Repeat until condition becomes `False`.

#### Real-world example: countdown

```python
import time

countdown = 5
while countdown > 0:
    print(countdown)
    time.sleep(1)
    countdown -= 1
print("Blast off!")
```

#### `while` loop with `else`

```python
n = 3
while n > 0:
    print(n)
    n -= 1
else:
    print("Countdown finished")
```

Output:

```
3
2
1
Countdown finished
```

### Be careful with infinite loops

An infinite loop never stops because the condition is always `True`.

```python
# This will run forever unless you stop it
# while True:
#     print("Hello")
```

Always make sure the loop condition can eventually become `False`.

### Nested loops

A loop inside another loop.

```python
for i in range(1, 4):
    for j in range(1, 4):
        print(f"i={i}, j={j}")
```

Output:

```
i=1, j=1
i=1, j=2
i=1, j=3
i=2, j=1
i=2, j=2
i=2, j=3
i=3, j=1
i=3, j=2
i=3, j=3
```

#### Real-world example: multiplication table

```python
for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i * j:2}", end=" ")
    print()
```

Output:

```
1  2  3  4  5
2  4  6  8 10
3  6  9 12 15
4  8 12 16 20
5 10 15 20 25
```

---

## 3. Loop Control Statements

### `break`

Stops the loop immediately.

```python
for i in range(1, 10):
    if i == 5:
        break
    print(i)
```

Output:

```
1
2
3
4
```

#### Real-world example: find a number

```python
numbers = [3, 7, 2, 9, 4, 8]

for num in numbers:
    if num > 5:
        print(f"Found {num}")
        break
```

Output:

```
Found 7
```

### `continue`

Skips the current iteration and moves to the next one.

```python
for i in range(1, 6):
    if i == 3:
        continue
    print(i)
```

Output:

```
1
2
4
5
```

#### Real-world example: skip invalid inputs

```python
numbers = [10, -5, 20, -3, 30]

for num in numbers:
    if num < 0:
        continue
    print(num)
```

Output:

```
10
20
30
```

### `pass`

A placeholder that does nothing. It is used when you need valid syntax but haven't written the code yet.

```python
for i in range(5):
    pass  # TODO: implement later
```

#### Why use `pass`?

- Prevents syntax errors when you are designing a program structure.
- Useful as a temporary stub.

```python
def my_function():
    pass  # will implement later

class MyClass:
    pass  # will implement later
```

---

## 4. The `range()` Function in Detail

`range()` is one of the most commonly used functions in Python loops.

### Syntax

```python
range(stop)
range(start, stop)
range(start, stop, step)
```

- `start`: Starting number (default is 0).
- `stop`: Stop before this number (not included).
- `step`: Increment or decrement (default is 1).

### Examples

```python
# 0 to 4
for i in range(5):
    print(i)

# 2 to 7
for i in range(2, 8):
    print(i)

# Odd numbers from 1 to 9
for i in range(1, 10, 2):
    print(i)

# Reverse counting
for i in range(5, 0, -1):
    print(i)
```

### Converting range to a list

```python
print(list(range(5)))       # [0, 1, 2, 3, 4]
print(list(range(2, 8)))    # [2, 3, 4, 5, 6, 7]
print(list(range(1, 10, 2))) # [1, 3, 5, 7, 9]
```

---

## 5. Pattern Printing Programs

Pattern printing is a great way to practice loops and nested loops.

### Right-angled triangle

```python
n = 5
for i in range(1, n + 1):
    print("*" * i)
```

Output:

```
*
**
***
****
*****
```

### Inverted triangle

```python
n = 5
for i in range(n, 0, -1):
    print("*" * i)
```

Output:

```
*****
****
***
**
*
```

### Pyramid pattern

```python
n = 5
for i in range(1, n + 1):
    spaces = " " * (n - i)
    stars = "*" * (2 * i - 1)
    print(spaces + stars)
```

Output:

```
    *
   ***
  *****
 *******
*********
```

### Number pattern

```python
n = 5
for i in range(1, n + 1):
    for j in range(1, i + 1):
        print(j, end=" ")
    print()
```

Output:

```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

---

## 6. Common Control Flow Mistakes

### Mistake 1: Forgetting to update the loop variable in `while`

```python
# Wrong: infinite loop
count = 0
while count < 5:
    print(count)
    # forgot count += 1
```

```python
# Correct
count = 0
while count < 5:
    print(count)
    count += 1
```

### Mistake 2: Off-by-one errors with `range()`

```python
# Prints 1 to 4, not 1 to 5
for i in range(1, 5):
    print(i)
```

`range(1, 5)` stops before 5.

### Mistake 3: Using `=` instead of `==` in conditions

```python
# Wrong
if x = 5:
    print("x is 5")

# Correct
if x == 5:
    print("x is 5")
```

### Mistake 4: Wrong indentation

```python
# Wrong
for i in range(5):
print(i)

# Correct
for i in range(5):
    print(i)
```

---

## 7. Practice Projects for Module 4

1. **Calculator**: Ask the user for two numbers and an operator, then print the result.
2. **Number Guessing Game**: Computer picks a random number between 1 and 100. User guesses until correct, with "higher" or "lower" hints.
3. **Simple Quiz App**: Ask 5 questions, track score, print final result.
4. **Multiplication Table**: Print a multiplication table for any number the user enters.
5. **FizzBuzz**: Print numbers 1 to 100. If divisible by 3, print "Fizz"; by 5, print "Buzz"; by both, print "FizzBuzz".
6. **ATM Simulator**: Ask for PIN, show menu to check balance, deposit, or withdraw.
7. **Password Checker**: Check if a password is at least 8 characters long and contains a number.

---

## 8. Mini Project: Complete Number Guessing Game

```python
import random

secret = random.randint(1, 100)
attempts = 0

print("Guess the number between 1 and 100!")

while True:
    guess = int(input("Enter your guess: "))
    attempts += 1

    if guess < secret:
        print("Too low! Try again.")
    elif guess > secret:
        print("Too high! Try again.")
    else:
        print(f"Congratulations! You guessed it in {attempts} attempts.")
        break
```

### How it works

- `random.randint(1, 100)` picks a random number.
- The `while True` loop runs forever until `break`.
- The user keeps guessing until correct.
- `attempts` counts how many guesses were made.

---

## 9. Key Takeaways

- `if`, `elif`, and `else` help your program make decisions.
- `for` loops are used when you know how many times to repeat.
- `while` loops are used when you want to repeat until a condition becomes false.
- `break` exits a loop immediately.
- `continue` skips the current iteration.
- `pass` is a placeholder that does nothing.
- `range()` generates number sequences for loops.
- Pattern printing helps you master nested loops.
- Always watch out for infinite loops and off-by-one errors.

> 💡 **Tip:** Practice by writing small programs daily. Control flow is the foundation of every real-world Python program, from simple scripts to complex AI applications.
> 

[Module 4: Control Flow — Detailed Notes + Examples](https://app.notion.com/p/Module-4-Control-Flow-Detailed-Notes-Examples-bc1b5e6f594e4758aad5d84d256c3f34?pvs=21)
