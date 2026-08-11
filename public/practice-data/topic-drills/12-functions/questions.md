# Topic Drill 12 — Functions

30 focused questions on: creating functions, parameters, arguments, return values, default parameters, keyword arguments, `*args`, `**kwargs`, scope, and lambda functions.

**How to run:** Read input with `input()`, call a function, and `print()` the result.

---

## Q1. Define and Call a Function
**Difficulty:** Very Easy
**Problem:** Define a function `say_hello()` that prints `Hello!`, then call it.
**Input:** None.
**Output:** Print `Hello!`.
**Hint:** `def say_hello(): print("Hello!")` then call it.

## Q2. Function With a Parameter
**Difficulty:** Very Easy
**Problem:** Define `greet(name)` that prints `Hello, <name>!`, then call it with input.
**Input:** A single line (a name).
**Output:** The greeting.
**Example:**
```
Input:
Aman
Output:
Hello, Aman!
```
**Hint:** `def greet(name): print(f"Hello, {name}!")`.

## Q3. Function With a Return
**Difficulty:** Very Easy
**Problem:** Define `add(a, b)` that returns `a + b`, then print the result of calling it.
**Input:** Two lines.
**Output:** The sum.
**Example:**
```
Input:
5
7
Output:
12
```
**Hint:** `def add(a, b): return a + b`.

## Q4. Call a Function With Two Arguments
**Difficulty:** Very Easy
**Problem:** Define `multiply(a, b)` returning `a * b`, and print the result of multiplying two inputs.
**Input:** Two lines.
**Output:** The product.
**Example:**
```
Input:
6
7
Output:
42
```
**Hint:** Pass both inputs as arguments.

## Q5. Default Parameter
**Difficulty:** Easy
**Problem:** Define `power(x, e=2)` returning `x ** e`. Call it once with one argument and print the result (so it squares).
**Input:** A single integer.
**Output:** The square.
**Example:**
```
Input:
7
Output:
49
```
**Hint:** `def power(x, e=2): return x ** e`.

## Q6. Override a Default Parameter
**Difficulty:** Easy
**Problem:** Use `power(x, e=2)` from above but call it with two arguments to compute a cube.
**Input:** Two lines: `x`, then `e`.
**Output:** `x ** e`.
**Example:**
```
Input:
2
10
Output:
1024
```
**Hint:** Pass both arguments to override the default.

## Q7. Keyword Arguments
**Difficulty:** Easy
**Problem:** Define `divide(dividend, divisor)` returning the division. Call it using keyword arguments and print.
**Input:** Two lines.
**Output:** The division result.
**Example:**
```
Input:
10
2
Output:
5.0
```
**Hint:** `divide(dividend=a, divisor=b)`.

## Q8. Function Using *args
**Difficulty:** Medium
**Problem:** Define `total(*args)` that returns the sum of all arguments. Read `n` and `n` integers, call `total(*values)`, print.
**Input:** Line 1: `n`. Then `n` lines.
**Output:** The sum.
**Example:**
```
Input:
3
1
2
3
Output:
6
```
**Hint:** `def total(*args): return sum(args)`.

## Q9. Function Using **kwargs
**Difficulty:** Medium
**Problem:** Define `show(**kwargs)` that prints each `key=value`. Call with `a=1, b=2`.
**Input:** None.
**Output:** Two lines: `a=1` then `b=2`.
**Hint:** Loop over `kwargs.items()`.

## Q10. Function Returning a Boolean
**Difficulty:** Easy
**Problem:** Define `is_even(n)` returning a boolean, and print the result for an input.
**Input:** A single integer.
**Output:** `True` or `False`.
**Example:**
```
Input:
8
Output:
True
```
**Hint:** `def is_even(n): return n % 2 == 0`.

## Q11. Function With a Conditional Return
**Difficulty:** Easy
**Problem:** Define `larger(a, b)` returning the larger, and print it.
**Input:** Two lines.
**Output:** The larger.
**Example:**
```
Input:
7
3
Output:
7
```
**Hint:** Use `if`/`else` or `max`.

## Q12. Scope: Local Variable
**Difficulty:** Medium
**Problem:** Define a function that sets a local `x = 5` and returns it. Print the returned value.
**Input:** None.
**Output:** Print `5`.
**Hint:** The variable is local to the function.

## Q13. Scope: Function Can't See a Local Outside
**Difficulty:** Medium
**Problem:** Define a function with a local variable `y = 10` that returns `y`. Print the function's return. Then try printing `y` outside (this will error — for this drill, just print the function result).
**Input:** None.
**Output:** Print `10`.
**Hint:** Return the local value so it's accessible via the return.

## Q14. Function Returning Multiple Values
**Difficulty:** Medium
**Problem:** Define `min_max(a, b)` returning `(min, max)`, unpack the result, and print both.
**Input:** Two lines.
**Output:** Two lines: min then max.
**Example:**
```
Input:
3
7
Output:
3
7
```
**Hint:** `return (min(a,b), max(a,b))`.

## Q15. Lambda for Addition
**Difficulty:** Easy
**Problem:** Create `add = lambda a, b: a + b`, and print `add(x, y)` for two inputs.
**Input:** Two lines.
**Output:** The sum.
**Example:**
```
Input:
4
9
Output:
13
```
**Hint:** A lambda is a one-line anonymous function.

## Q16. Lambda for a Square
**Difficulty:** Easy
**Problem:** Create `square = lambda x: x * x`, and print it for an input.
**Input:** A single integer.
**Output:** The square.
**Example:**
```
Input:
6
Output:
36
```
**Hint:** `lambda x: x * x`.

## Q17. Function Computing a Factorial
**Difficulty:** Medium
**Problem:** Define `factorial(n)` returning `n!`, and print it.
**Input:** A single integer (0 ≤ n ≤ 20).
**Output:** The factorial.
**Example:**
```
Input:
5
Output:
120
```
**Hint:** Loop to multiply 1..n.

## Q18. Function Returning a List
**Difficulty:** Medium
**Problem:** Define `first_evens(n)` returning a list of the first `n` even numbers, and print it.
**Input:** A single integer.
**Output:** The list.
**Example:**
```
Input:
4
Output:
[2, 4, 6, 8]
```
**Hint:** Build a list inside the function and `return` it.

## Q19. Function Returning a String
**Difficulty:** Easy
**Problem:** Define `reverse_str(s)` returning the reversed string, and print it.
**Input:** A single line.
**Output:** The reversed string.
**Example:**
```
Input:
hello
Output:
olleh
```
**Hint:** `return s[::-1]`.

## Q20. Function With a List Argument
**Difficulty:** Medium
**Problem:** Define `sum_list(lst)` returning the sum, and print it for a list input.
**Input:** A single line (space-separated integers).
**Output:** The sum.
**Example:**
```
Input:
1 2 3
Output:
6
```
**Hint:** `def sum_list(lst): return sum(lst)`.

## Q21. Function Counting Evens in a List
**Difficulty:** Medium
**Problem:** Define `count_even(lst)` returning the number of even elements, and print it.
**Input:** A single line.
**Output:** The count.
**Example:**
```
Input:
1 2 3 4 5 6
Output:
3
```
**Hint:** Loop and count `% 2 == 0`.

## Q22. Default Parameter in a Calculation
**Difficulty:** Medium
**Problem:** Define `apply_discount(price, discount=10)` returning the discounted price, and print it for two inputs.
**Input:** Two lines: price, discount.
**Output:** The discounted price.
**Example:**
```
Input:
1000
20
Output:
800.0
```
**Hint:** `return price * (100 - discount) / 100`.

## Q23. Keyword Arguments With a Function
**Difficulty:** Medium
**Problem:** Define `describe(name, age)` returning `"<name> is <age> years old"`, and call it with keyword arguments.
**Input:** Two lines.
**Output:** The sentence.
**Example:**
```
Input:
Aman
25
Output:
Aman is 25 years old
```
**Hint:** `describe(name=..., age=...)`.

## Q24. Function Using *args for Maximum
**Difficulty:** Medium
**Problem:** Define `my_max(*args)` returning the maximum, and print it for `n` values.
**Input:** Line 1: `n`. Then `n` lines.
**Output:** The max.
**Example:**
```
Input:
3
5
9
2
Output:
9
```
**Hint:** `def my_max(*args): return max(args)`.

## Q25. Function Returning a Dictionary
**Difficulty:** Medium
**Problem:** Define `make_dict(k, v)` returning `{k: v}`, and print it.
**Input:** Two lines.
**Output:** The dictionary.
**Example:**
```
Input:
apple
5
Output:
{'apple': 5}
```
**Hint:** `return {k: v}`.

## Q26. Global Variable Scope (read)
**Difficulty:** Medium
**Problem:** Set a global `rate = 5`. Define a function that reads (but doesn't modify) `rate` and returns `rate * value`. Print the result.
**Input:** A single integer.
**Output:** `5 * value`.
**Example:**
```
Input:
3
Output:
15
```
**Hint:** Functions can read global variables.

## Q27. Lambda With a List (map-style)
**Difficulty:** Medium
**Problem:** Create `double = lambda x: 2 * x`, and print `[double(x) for x in lst]` for a list input.
**Input:** A single line.
**Output:** The doubled list.
**Example:**
```
Input:
1 2 3
Output:
[2, 4, 6]
```
**Hint:** Use the lambda inside a list comprehension.

## Q28. Function With Both *args and **kwargs
**Difficulty:** Hard
**Problem:** Define `stats(*args, mode="sum")` returning the sum if mode is `"sum"`, else the count. Read `n`, `n` integers, and a mode; print.
**Input:** Line 1: `n`. Then `n` lines. Then the mode.
**Output:** The result.
**Example:**
```
Input:
3
5
5
9
count
Output:
3
```
**Hint:** Use `kwargs`/`mode` to decide.

## Q29. Nested Function (inner helper)
**Difficulty:** Hard
**Problem:** Define an outer function `outer()` that defines an inner function `inner(x)` returning `x * 3`, then calls it and returns the result.
**Input:** None.
**Output:** Print `9`.
**Hint:** Define the inner function inside the outer one and call it.

## Q30. Function Calling Another Function
**Difficulty:** Hard
**Problem:** Define `square(x)` returning `x*x`, and `sum_of_squares(a, b)` that calls `square` and returns `square(a) + square(b)`. Print the result.
**Input:** Two lines.
**Output:** The sum of squares.
**Example:**
```
Input:
3
4
Output:
25
```
**Hint:** `sum_of_squares` calls `square(a)` and `square(b)`.
