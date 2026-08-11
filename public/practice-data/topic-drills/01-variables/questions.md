# Topic Drill 01 — Variables

30 focused questions on: creating variables, naming rules, multiple assignment, constants, dynamic typing.

**How to run:** Read input with `input()`, process, and `print()` the result.

---

## Q1. Print the Value of a Variable
**Difficulty:** Very Easy
**Problem:** Create a variable `score` equal to `95` and print it.
**Input:** None.
**Output:** Print `95`.
**Example:** (none)
**Hint:** `score = 95` then `print(score)`.

## Q2. Store and Print a String
**Difficulty:** Very Easy
**Problem:** Create a variable `greeting` with the value `"Hello"` and print it.
**Input:** None.
**Output:** Print `Hello`.
**Hint:** Assign a string literal to the variable.

## Q3. Print a User-Provided Name
**Difficulty:** Very Easy
**Problem:** Read a name with `input()` and store it in a variable `name`, then print it.
**Input:** A single line with a name.
**Output:** Print the name.
**Hint:** `name = input()` then `print(name)`.

## Q4. Swap Two Variables
**Difficulty:** Easy
**Problem:** Read two integers, swap their values so `a` holds the second and `b` holds the first, then print both on separate lines.
**Input:** Two lines: integers `a` and `b`.
**Output:** The swapped values, each on its own line.
**Example:**
```
Input:
3
7
Output:
7
3
```
**Hint:** Use multiple assignment: `a, b = b, a`.

## Q5. Multiple Assignment of Three Values
**Difficulty:** Easy
**Problem:** Use a single line of multiple assignment to set `x, y, z = 5, 10, 15`, then print their sum.
**Input:** None.
**Output:** Print `30`.
**Hint:** Multiple assignment assigns in order.

## Q6. A Constant That Is Never Changed
**Difficulty:** Easy
**Problem:** Create a constant `PI = 3.14159`, read a radius, and print `2 * PI * radius` (the circumference).
**Input:** A single line with an integer `radius`.
**Output:** Print the circumference.
**Example:**
```
Input:
7
Output:
43.98226
```
**Hint:** In Python, constants are just variables named in UPPERCASE by convention.

## Q7. Dynamic Typing: Change a Variable's Type
**Difficulty:** Medium
**Problem:** Start with `data = 10` (an int). Then reassign `data = "hello"` (a string). Print `data` and then `type(data)`.
**Input:** None.
**Output:** Two lines: `hello` then `<class 'str'>`.
**Hint:** A variable can change type because Python is dynamically typed.

## Q8. Read Two Numbers Into Two Variables
**Difficulty:** Easy
**Problem:** Read two integers into variables `a` and `b` and print their product.
**Input:** Two lines: integers `a` and `b`.
**Output:** Print `a * b`.
**Example:**
```
Input:
6
9
Output:
54
```
**Hint:** Convert each with `int(input())`.

## Q9. Meaningful Variable Names
**Difficulty:** Easy
**Problem:** Read a distance (km) and a time (hours), store them in descriptive variables `distance` and `time_hours`, and print the speed (`distance / time_hours`).
**Input:** Two lines: `distance`, then `time_hours`.
**Output:** Print the speed.
**Example:**
```
Input:
300
5
Output:
60.0
```
**Hint:** Use clear names so the code reads like English.

## Q10. Invalid Identifier Awareness (choose a valid one)
**Difficulty:** Easy
**Problem:** Without running code, which of these is a valid variable name: `2count`, `my_var`, `class`, `my var`? Write a program that uses the valid one and prints it.
**Input:** None.
**Output:** Print `my_var`'s value, e.g. `hello`.
**Hint:** Names can't start with a digit, can't contain spaces, and can't be reserved words like `class`.

## Q11. Sum Stored in a Variable
**Difficulty:** Easy
**Problem:** Read two integers, store their sum in `total`, and print `total`.
**Input:** Two lines: integers `a` and `b`.
**Output:** Print the sum.
**Example:**
```
Input:
8
12
Output:
20
```
**Hint:** `total = a + b`.

## Q12. Reuse a Variable to Accumulate
**Difficulty:** Medium
**Problem:** Read three integers. Starting with `sum = 0`, add each input to `sum` (reusing the same variable) and print the final `sum`.
**Input:** Three lines of integers.
**Output:** Print the total.
**Example:**
```
Input:
1
2
3
Output:
6
```
**Hint:** `sum += value` adds and reassigns in place.

## Q13. Case Sensitivity of Variables
**Difficulty:** Medium
**Problem:** Read an integer, store it in lowercase variable `count`, then print `count` and `Count` separately. Notice that `Count` is a different (undefined) variable — but for this drill, also assign `Count = count` so the program runs, then print both.
**Input:** A single integer.
**Output:** Two lines: `count` then `Count` (same value).
**Hint:** Python is case-sensitive; `count` and `Count` are distinct names.

## Q14. Multiple Assignment from a Split
**Difficulty:** Medium
**Problem:** Read a line with two integers separated by a space, unpack them into two variables in one line, and print their sum.
**Input:** One line: `a b`.
**Output:** Print `a + b`.
**Example:**
```
Input:
4 9
Output:
13
```
**Hint:** `a, b = map(int, input().split())`.

## Q15. Reassign With a New Value
**Difficulty:** Easy
**Problem:** Set `value = 5`. Then reassign `value = value * 3`. Print `value`.
**Input:** None.
**Output:** Print `15`.
**Hint:** The right side uses the old value, then the result is stored back.

## Q16. Build a Sentence With Variables
**Difficulty:** Easy
**Problem:** Read a name and an age into variables, then print the sentence `Name is <age> years old.` using an f-string.
**Input:** Two lines: `name`, then `age`.
**Output:** The sentence.
**Example:**
```
Input:
Aman
25
Output:
Aman is 25 years old.
```
**Hint:** `f"{name} is {age} years old."`.

## Q17. Variable Storing a Float Result
**Difficulty:** Easy
**Problem:** Read two integers, store `a / b` in `result`, and print it.
**Input:** Two lines: `a`, then `b`.
**Output:** Print the division result.
**Example:**
```
Input:
10
4
Output:
2.5
```
**Hint:** True division always gives a float.

## Q18. Three Variables, Three Operations
**Difficulty:** Medium
**Problem:** Read three integers `a`, `b`, `c`. Store `a + b` in `s`, `b * c` in `p`, and `c - a` in `d`. Print `s`, `p`, `d` on separate lines.
**Input:** Three lines of integers.
**Output:** Three lines.
**Example:**
```
Input:
2
3
4
Output:
5
12
2
```
**Hint:** Compute each into its own named variable.

## Q19. Copying a Variable's Value
**Difficulty:** Easy
**Problem:** Set `a = 10`, then set `b = a`. Change `a` to `20`. Print `a` and `b`.
**Input:** None.
**Output:** Two lines: `20` then `10`.
**Hint:** `b = a` copies the value; later changing `a` doesn't change `b`.

## Q20. A Descriptive Variable for a Constant Rate
**Difficulty:** Easy
**Problem:** Read an amount and, using a constant `TAX_RATE = 0.05`, store the tax in `tax` and print it.
**Input:** A single integer amount.
**Output:** Print `amount * 0.05`.
**Example:**
```
Input:
1000
Output:
50.0
```
**Hint:** `tax = amount * TAX_RATE`.

## Q21. Store the Average
**Difficulty:** Easy
**Problem:** Read three integers and store their average in `avg`, then print it.
**Input:** Three lines of integers.
**Output:** Print the average.
**Example:**
```
Input:
4
6
8
Output:
6.0
```
**Hint:** `avg = (a + b + c) / 3`.

## Q22. Single Letter Variables (valid, discouraged)
**Difficulty:** Easy
**Problem:** Read two integers and assign them to `x` and `y`. Print `x + y` and `x * y` on separate lines.
**Input:** Two lines: `x`, `y`.
**Output:** Two lines.
**Example:**
```
Input:
5
7
Output:
12
35
```
**Hint:** Short names work but descriptive names are preferred.

## Q23. Dynamic Reassignment to a Different Value
**Difficulty:** Medium
**Problem:** Read an integer into `n`. Then reassign `n` to be `n + 1`, then `n * 2`, and print the final `n`.
**Input:** A single integer.
**Output:** Print the final value.
**Example:**
```
Input:
5
Output:
12
```
**Hint:** `(5 + 1) * 2 = 12`.

## Q24. Store Results of Multiple Conversions
**Difficulty:** Medium
**Problem:** Read a distance in kilometers, store `km * 0.621371` in `miles`, and print it.
**Input:** A single integer `km`.
**Output:** Print the miles.
**Example:**
```
Input:
10
Output:
6.21371
```
**Hint:** Assign the computed value to a variable, then print it.

## Q25. Combine Two Strings With a Variable
**Difficulty:** Easy
**Problem:** Read a first name and last name into variables and print the full name joined with a space.
**Input:** Two lines: `first`, `last`.
**Output:** Print `first last`.
**Example:**
```
Input:
Ada
Lovelace
Output:
Ada Lovelace
```
**Hint:** `full = first + " " + last`.

## Q26. Variable Holding a Boolean Result
**Difficulty:** Easy
**Problem:** Read an integer and store `n > 0` in a variable `is_positive`, then print it.
**Input:** A single integer.
**Output:** Print `True` or `False`.
**Example:**
```
Input:
7
Output:
True
```
**Hint:** Comparison expressions produce a boolean.

## Q27. Swap Without Multiple Assignment (with temp)
**Difficulty:** Medium
**Problem:** Read two integers `a` and `b`, swap them using a temporary variable `temp`, and print both.
**Input:** Two lines.
**Output:** The swapped values.
**Example:**
```
Input:
1
2
Output:
2
1
```
**Hint:** `temp = a; a = b; b = temp`.

## Q28. Variable Names With Underscores
**Difficulty:** Easy
**Problem:** Read a student's marks and total, store in `obtained_marks` and `total_marks`, and print the percentage `obtained_marks / total_marks * 100`.
**Input:** Two lines.
**Output:** Print the percentage.
**Example:**
```
Input:
42
50
Output:
84.0
```
**Hint:** Multi-word names use underscores.

## Q29. Chain of Variables
**Difficulty:** Medium
**Problem:** Read an integer `x`. Compute `y = x + 2`, `z = y * 3`, and print `z`.
**Input:** A single integer.
**Output:** Print the final value.
**Example:**
```
Input:
4
Output:
18
```
**Hint:** `(4 + 2) * 3 = 18`.

## Q30. Dynamic Typing Across Three Types
**Difficulty:** Medium
**Problem:** Start `v = 1`. Reassign `v = "two"`. Then reassign `v = 3.0`. Print each on its own line, and finally print `type(v)`.
**Input:** None.
**Output:** Three values then the type of the last.
**Hint:** The variable changes type from int to str to float.
