# Level 6 — Functions (30 Questions)

**What this level teaches:** defining functions, parameters, `return`, default arguments, `*args`/`**kwargs`, lambda + `map`/`filter`/`sorted`, recursion, and turning your earlier solutions into reusable functions.

**Total questions:** 30

> A function = a named block of code you can call again and again. Write your own code first, then check the solution.

---

## Question 1: Your first function

**What to do:** Write a function `greet()` that prints "Hello, welcome to Python!" and call it.

**Hint:** `def greet():` — remember the parentheses and the colon.

**Solution:**

```python
def greet():
    print("Hello, welcome to Python!")

greet()
```

**Logic:** `def` defines; calling the name runs the body.

---

## Question 2: Function with a parameter

**What to do:** Write a function `greet(name)` that prints "Hello, <name>!" and call it with "Rahul" and with "Priya".

**Hint:** Parameters are variables the caller fills in: `greet("Rahul")`.

**Solution:**

```python
def greet(name):
    print("Hello, " + name + "!")

greet("Rahul")
greet("Priya")
```

**Logic:** Parameters make one function work for many inputs.

---

## Question 3: Function with a return value

**What to do:** Write a function `double(n)` that *returns* `n * 2`, and print the result of `double(21)`.

**Hint:** `return` sends a value back to the caller; `print` only shows it on screen.

**Solution:**

```python
def double(n):
    return n * 2

print(double(21))
```

**Logic:** `return` is the difference between a function that *does* something and one that *gives something back*.

---

## Question 4: Function with multiple parameters

**What to do:** Write a function `add(a, b)` that returns `a + b`, and test it with 5 and 7.

**Hint:** Parameters are separated by commas.

**Solution:**

```python
def add(a, b):
    return a + b

print(add(5, 7))
```

**Logic:** Each parameter receives its matching argument by position.

---

## Question 5: Default parameter values

**What to do:** Write a function `greet(name="friend")` that prints "Hello, <name>!". Call it with no arguments and with "Amit".

**Hint:** A default value lets the argument be optional.

**Solution:**

```python
def greet(name="friend"):
    print("Hello, " + name + "!")

greet()          # uses the default
greet("Amit")    # overrides the default
```

**Logic:** Defaults make functions flexible — callers can skip what they don't need.

---

## Question 6: Keyword arguments

**What to do:** Write a function `introduce(name, age)` and call it using keyword arguments so the order doesn't matter: `introduce(age=20, name="Rahul")`.

**Hint:** Keyword arguments match by *name*, not by position.

**Solution:**

```python
def introduce(name, age):
    print(name, "is", age, "years old")

introduce(age=20, name="Rahul")
```

**Logic:** Named arguments make calls readable and order-independent.

---

## Question 7: Return multiple values

**What to do:** Write a function `min_max(numbers)` that returns both the smallest and the largest value of a list as a tuple.

**Hint:** `return smallest, largest` — Python packs them into a tuple automatically.

**Solution:**

```python
def min_max(numbers):
    smallest = numbers[0]
    largest = numbers[0]
    for number in numbers:
        if number < smallest:
            smallest = number
        if number > largest:
            largest = number
    return smallest, largest

s, l = min_max([34, 12, 89, 5, 61])
print("Smallest:", s)
print("Largest:", l)
```

**Logic:** One `return` statement, two values — unpacked by the caller.

---

## Question 8: Function — check even or odd

**What to do:** Write a function `is_even(n)` that returns True for even numbers and False for odd ones. Test it on 4 and 7.

**Hint:** `return n % 2 == 0` — the comparison itself is already True or False.

**Solution:**

```python
def is_even(n):
    return n % 2 == 0

print(is_even(4))   # True
print(is_even(7))   # False
```

**Logic:** Functions that return True/False are called *predicates* — very useful for filtering.

---

## Question 9: Function — maximum of two numbers

**What to do:** Write a function `max_of_two(a, b)` and test it with 25 and 40.

**Hint:** `return a if a > b else b`.

**Solution:**

```python
def max_of_two(a, b):
    if a > b:
        return a
    else:
        return b

print(max_of_two(25, 40))
```

**Logic:** Turning a Level 1 solution into a function — this is how code gets reused.

---

## Question 10: Function — maximum of three numbers

**What to do:** Write a function `max_of_three(a, b, c)` — try reusing `max_of_two` inside it.

**Hint:** The max of three is the max of (the max of two) and the third.

**Solution:**

```python
def max_of_two(a, b):
    if a > b:
        return a
    return b

def max_of_three(a, b, c):
    return max_of_two(max_of_two(a, b), c)

print(max_of_three(25, 40, 15))
```

**Logic:** Functions can call functions — you build bigger tools out of smaller ones.

---

## Question 11: Function — is prime

**What to do:** Write a function `is_prime(n)` that returns True if `n` is prime, and print all primes from 2 to 30 using it.

**Hint:** Wrap the Level 2 prime check in a function, then call it inside a loop.

**Solution:**

```python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True

for number in range(2, 31):
    if is_prime(number):
        print(number)
```

**Logic:** `return` inside a loop exits the function immediately — the flag variable disappears.

---

## Question 12: Function — factorial

**What to do:** Write a function `factorial(n)` that returns n! and test it with 5.

**Hint:** The Level 2 loop, with a `return` at the end.

**Solution:**

```python
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result = result * i
    return result

print(factorial(5))
```

**Logic:** Same logic as before — now callable anywhere.

---

## Question 13: Function — sum of a list

**What to do:** Write a function `list_sum(numbers)` and test it with `[1, 2, 3, 4, 5]`.

**Hint:** Running-total pattern inside the function.

**Solution:**

```python
def list_sum(numbers):
    total = 0
    for number in numbers:
        total += number
    return total

print(list_sum([1, 2, 3, 4, 5]))
```

**Logic:** Input list → loop → return total. (Answer: 15)

---

## Question 14: Function — count vowels

**What to do:** Write a function `count_vowels(text)` and test it with "programming".

**Hint:** The Level 1 vowel loop with a `return count` at the end.

**Solution:**

```python
def count_vowels(text):
    count = 0
    for character in text:
        if character in "aeiou":
            count += 1
    return count

print(count_vowels("programming"))
```

**Logic:** Every counting problem converts into a function the same way. (Answer: 3)

---

## Question 15: Function — reverse a string

**What to do:** Write a function `reverse_string(text)` that returns the reversed string, and test it with "python".

**Hint:** Build the result with `character + result` and return it.

**Solution:**

```python
def reverse_string(text):
    result = ""
    for character in text:
        result = character + result
    return result

print(reverse_string("python"))
```

**Logic:** The Level 1 builder pattern inside a function.

---

## Question 16: Function — is palindrome

**What to do:** Write a function `is_palindrome(text)` that returns True if `text` reads the same backwards. Test with "madam" and "python".

**Hint:** Reuse `reverse_string` — don't rewrite the logic.

**Solution:**

```python
def reverse_string(text):
    result = ""
    for character in text:
        result = character + result
    return result

def is_palindrome(text):
    return text == reverse_string(text)

print(is_palindrome("madam"))   # True
print(is_palindrome("python"))  # False
```

**Logic:** Reuse — the whole point of functions.

---

## Question 17: Function — largest in a list

**What to do:** Write a function `find_largest(numbers)` and test it with `[10, 45, 23, 89, 12]`.

**Hint:** The "current best" pattern wrapped in a function.

**Solution:**

```python
def find_largest(numbers):
    largest = numbers[0]
    for number in numbers:
        if number > largest:
            largest = number
    return largest

print(find_largest([10, 45, 23, 89, 12]))
```

**Logic:** Your most-used pattern becomes a reusable tool.

---

## Question 18: Function — second largest

**What to do:** Write a function `second_largest(numbers)` and test it with `[10, 45, 23, 89, 12, 67]`.

**Hint:** The two-variable trick from Level 1 Question 30, inside a function.

**Solution:**

```python
def second_largest(numbers):
    largest = float("-inf")
    second = float("-inf")
    for number in numbers:
        if number > largest:
            second = largest
            largest = number
        elif number > second and number != largest:
            second = number
    return second

print(second_largest([10, 45, 23, 89, 12, 67]))
```

**Logic:** Encapsulate the trickiest Level 1 logic so you never have to re-derive it.

---

## Question 19: Function — remove duplicates

**What to do:** Write a function `remove_duplicates(items)` that returns a new list with duplicates removed, keeping order. Test with `[1, 2, 2, 3, 4, 4, 5]`.

**Hint:** Build a result list, appending only new items.

**Solution:**

```python
def remove_duplicates(items):
    result = []
    for item in items:
        if item not in result:
            result.append(item)
    return result

print(remove_duplicates([1, 2, 2, 3, 4, 4, 5]))
```

**Logic:** The Level 3 "add only what is new" pattern as a function.

---

## Question 20: *args — any number of arguments

**What to do:** Write a function `add_all(*args)` that returns the sum of however many numbers it receives. Test with `add_all(1, 2)` and `add_all(1, 2, 3, 4, 5)`.

**Hint:** `*args` collects all arguments into a tuple called `args`.

**Solution:**

```python
def add_all(*args):
    total = 0
    for number in args:
        total += number
    return total

print(add_all(1, 2))
print(add_all(1, 2, 3, 4, 5))
```

**Logic:** With `*args`, your function works for any number of inputs.

---

## Question 21: **kwargs — named arguments

**What to do:** Write a function `show_details(**kwargs)` that prints each key-value pair it receives. Test with `show_details(name="Rahul", age=20, city="Beed")`.

**Hint:** `**kwargs` collects named arguments into a dictionary.

**Solution:**

```python
def show_details(**kwargs):
    for key, value in kwargs.items():
        print(key + ":", value)

show_details(name="Rahul", age=20, city="Beed")
```

**Logic:** `**kwargs` turns named arguments into a dictionary you can loop over.

---

## Question 22: Lambda — square a number

**What to do:** Create a lambda function that squares a number and use it on 9.

**Hint:** `square = lambda x: x * x`.

**Solution:**

```python
square = lambda x: x * x

print(square(9))
```

**Logic:** A lambda is a small anonymous function — handy when you need a function in one line.

---

## Question 23: Lambda with map()

**What to do:** Given `numbers = [1, 2, 3, 4, 5]`, produce a list of their squares using `map()` and a lambda.

**Hint:** `map(function, list)` applies the function to every element; wrap in `list()` to see it.

**Solution:**

```python
numbers = [1, 2, 3, 4, 5]

squares = list(map(lambda x: x * x, numbers))

print(squares)
```

**Logic:** `map` = "apply the same operation to everything".

---

## Question 24: Lambda with filter()

**What to do:** Given `numbers = [5, 12, 8, 20, 3, 15, 7]`, produce a list of only the numbers greater than 10 using `filter()`.

**Hint:** `filter(predicate, list)` keeps elements for which the lambda returns True.

**Solution:**

```python
numbers = [5, 12, 8, 20, 3, 15, 7]

big = list(filter(lambda x: x > 10, numbers))

print(big)
```

**Logic:** `filter` is the Level 1 filter pattern built into Python.

---

## Question 25: Lambda with sorted()

**What to do:** Given `pairs = [(1, 3), (4, 1), (2, 2)]`, sort the list by the *second* element of each tuple.

**Hint:** `sorted(pairs, key=lambda pair: pair[1])`.

**Solution:**

```python
pairs = [(1, 3), (4, 1), (2, 2)]

sorted_pairs = sorted(pairs, key=lambda pair: pair[1])

print(sorted_pairs)
```

**Logic:** The `key` function tells `sorted()` *what* to compare. (Answer: [(4, 1), (2, 2), (1, 3)])

---

## Question 26: Recursion — countdown

**What to do:** Write a recursive function `countdown(n)` that prints n, n-1, ..., 1 and stops. Call it with 5.

**Hint:** A function that calls itself — with a base case that stops the recursion.

**Solution:**

```python
def countdown(n):
    if n == 0:
        return
    print(n)
    countdown(n - 1)

countdown(5)
```

**Logic:** Every recursive function needs a *base case* (n == 0 here) to stop, or it runs forever.

---

## Question 27: Recursion — factorial

**What to do:** Write a recursive function `factorial(n)` using the rule n! = n × (n-1)!, with 0! = 1.

**Hint:** Base case: `if n == 0: return 1`. Otherwise `return n * factorial(n - 1)`.

**Solution:**

```python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))
```

**Logic:** The problem shrinks by one each call until it hits the base case, then the results multiply back up.

---

## Question 28: Recursion — Fibonacci

**What to do:** Write a recursive function `fib(n)` that returns the n-th Fibonacci number (fib(0)=0, fib(1)=1). Test with `fib(10)` (should be 55).

**Hint:** Base cases for n == 0 and n == 1; otherwise `return fib(n-1) + fib(n-2)`.

**Solution:**

```python
def fib(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)

print(fib(10))
```

**Logic:** Two base cases this time — the definition itself is recursive.

---

## Question 29: Build a program from multiple functions

**What to do:** Write functions `get_average(numbers)`, `get_max(numbers)`, and `get_min(numbers)`, then one `analyze(numbers)` function that calls all three and prints a summary. Test with `[10, 20, 30, 40, 50]`.

**Hint:** Split the problem into small functions, then let one function "conduct" the others.

**Solution:**

```python
def get_average(numbers):
    return sum(numbers) / len(numbers)

def get_max(numbers):
    return max(numbers)

def get_min(numbers):
    return min(numbers)

def analyze(numbers):
    print("Average:", get_average(numbers))
    print("Maximum:", get_max(numbers))
    print("Minimum:", get_min(numbers))

analyze([10, 20, 30, 40, 50])
```

**Logic:** Breaking a big problem into small functions makes code easier to read, test, and reuse.

---

## Question 30: Calculator using functions

**What to do:** Write functions `add`, `subtract`, `multiply`, `divide`, and a menu loop that lets the user pick an operation and enter two numbers.

**Hint:** Each operation is its own function; a `while True` loop handles the menu, and `quit` breaks out.

**Solution:**

```python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    return a / b

while True:
    print("\n1. Add  2. Subtract  3. Multiply  4. Divide  5. Quit")
    choice = input("Choose: ")

    if choice == "5":
        print("Bye!")
        break

    a = float(input("First number: "))
    b = float(input("Second number: "))

    if choice == "1":
        print("Result:", add(a, b))
    elif choice == "2":
        print("Result:", subtract(a, b))
    elif choice == "3":
        print("Result:", multiply(a, b))
    elif choice == "4":
        print("Result:", divide(a, b))
    else:
        print("Invalid choice")
```

**Logic:** Functions + menu loop = a complete mini-application. You'll build much bigger versions in Level 9.

---

## Level 6 recap — what you now know

- **def / parameters / return** — the core of functions (Q1–7).
- **Predicates** — functions that return True/False (Q8, 11, 16).
- **Wrapping earlier solutions** — every Level 1–5 pattern becomes a reusable function (Q9–19).
- **Flexible signatures** — defaults, keyword args, `*args`, `**kwargs` (Q5–6, 20–21).
- **Lambda + map/filter/sorted** — one-line operations on collections (Q22–25).
- **Recursion** — a function calling itself, always with a base case (Q26–28).
- **Composition** — small functions working together in one program (Q29–30).
