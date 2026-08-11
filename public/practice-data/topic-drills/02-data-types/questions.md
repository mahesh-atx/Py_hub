# Topic Drill 02 — Data Types

30 focused questions on: `int`, `float`, `str`, `bool`, `None`, `type()`, and type conversion with `int()`, `float()`, `str()`, `bool()`.

**How to run:** Read input with `input()`, process, and `print()` the result.

---

## Q1. Print the Type of an Integer
**Difficulty:** Very Easy
**Problem:** Print the type of `10`.
**Input:** None.
**Output:** Print `<class 'int'>`.
**Hint:** `print(type(10))`.

## Q2. Print the Type of a Float
**Difficulty:** Very Easy
**Problem:** Print the type of `3.14`.
**Input:** None.
**Output:** Print `<class 'float'>`.
**Hint:** `print(type(3.14))`.

## Q3. Print the Type of a String
**Difficulty:** Very Easy
**Problem:** Print the type of `"hello"`.
**Input:** None.
**Output:** Print `<class 'str'>`.
**Hint:** `print(type("hello"))`.

## Q4. Print the Type of a Boolean
**Difficulty:** Very Easy
**Problem:** Print the type of `True`.
**Input:** None.
**Output:** Print `<class 'bool'>`.
**Hint:** `print(type(True))`.

## Q5. Print the Value of None
**Difficulty:** Very Easy
**Problem:** Print the value of `None`.
**Input:** None.
**Output:** Print `None`.
**Hint:** `print(None)` — `None` represents "no value."

## Q6. Convert a String to an Integer
**Difficulty:** Very Easy
**Problem:** Read a string that holds a whole number, convert it with `int()`, and print the result as an integer plus 1.
**Input:** A single line.
**Output:** Print `int(value) + 1`.
**Example:**
```
Input:
5
Output:
6
```
**Hint:** `n = int(input())` then `print(n + 1)`.

## Q7. Convert a String to a Float
**Difficulty:** Very Easy
**Problem:** Read a string holding a decimal, convert with `float()`, and print it doubled.
**Input:** A single line.
**Output:** Print `float(value) * 2`.
**Example:**
```
Input:
2.5
Output:
5.0
```
**Hint:** `f = float(input())`.

## Q8. Convert an Integer to a String
**Difficulty:** Easy
**Problem:** Read an integer, convert it to a string with `str()`, and print the string repeated 3 times.
**Input:** A single integer.
**Output:** Print the digit string three times.
**Example:**
```
Input:
7
Output:
777
```
**Hint:** `s = str(n)` then `s * 3`.

## Q9. Convert a Number to a Boolean
**Difficulty:** Medium
**Problem:** Read an integer and print `bool(n)`.
**Input:** A single integer.
**Output:** Print `True` or `False`.
**Example:**
```
Input:
0
Output:
False
```
**Hint:** `0` is falsy; any non-zero number is truthy.

## Q10. Convert a String to a Boolean
**Difficulty:** Medium
**Problem:** Read a line and print `bool(line)`.
**Input:** A single line (may be empty).
**Output:** Print `True` or `False`.
**Example:**
```
Input:
(empty line)
Output:
False
```
**Hint:** An empty string is falsy; a non-empty string is truthy.

## Q11. Type of an Arithmetic Result
**Difficulty:** Easy
**Problem:** Read two integers and print the type of `a / b` and the type of `a + b`.
**Input:** Two lines.
**Output:** Two lines: the type of the division, then the type of the sum.
**Example:**
```
Input:
4
2
Output:
<class 'float'>
<class 'int'>
```
**Hint:** `/` always yields a float; `+` on ints yields an int.

## Q12. Type Conversion in a Formula
**Difficulty:** Easy
**Problem:** Read a Celsius value as a string, convert it with `float()`, and print it in Fahrenheit.
**Input:** A single line.
**Output:** Print `c * 9/5 + 32`.
**Example:**
```
Input:
100
Output:
212.0
```
**Hint:** `c = float(input())`.

## Q13. Integer vs Float Division
**Difficulty:** Easy
**Problem:** Read two integers and print both `a / b` and `a // b`.
**Input:** Two lines.
**Output:** Two lines.
**Example:**
```
Input:
17
5
Output:
3.4
3
```
**Hint:** `/` gives the exact decimal; `//` gives the floor quotient.

## Q14. The Type of None
**Difficulty:** Very Easy
**Problem:** Print the type of `None`.
**Input:** None.
**Output:** Print `<class 'NoneType'>`.
**Hint:** `print(type(None))`.

## Q15. String to Int for Two Numbers
**Difficulty:** Easy
**Problem:** Read two strings, convert each with `int()`, and print their sum.
**Input:** Two lines.
**Output:** Print the sum.
**Example:**
```
Input:
12
30
Output:
42
```
**Hint:** `a = int(input())`.

## Q16. Float to Int (truncation)
**Difficulty:** Medium
**Problem:** Read a decimal, convert it to an integer with `int()`, and print both the original and the truncated value.
**Input:** A single line.
**Output:** Two lines: the original, then the integer.
**Example:**
```
Input:
7.9
Output:
7.9
7
```
**Hint:** `int(7.9)` truncates toward zero, giving 7.

## Q17. Check the Type of Input (it's always a string)
**Difficulty:** Easy
**Problem:** Read a number with `input()` (do NOT convert it), and print `type(value)`.
**Input:** A single line, e.g. `5`.
**Output:** Print `<class 'str'>`.
**Hint:** `input()` always returns a string.

## Q18. Bool of a Negative Number
**Difficulty:** Easy
**Problem:** Read an integer and print `bool(n)`.
**Input:** A single integer.
**Output:** `True` or `False`.
**Example:**
```
Input:
-5
Output:
True
```
**Hint:** Any non-zero value (including negatives) is truthy.

## Q19. Concatenate Strings After Conversion
**Difficulty:** Medium
**Problem:** Read an integer `n`, convert it to a string, and print `"The number is " + str(n)`.
**Input:** A single integer.
**Output:** Print the concatenated message.
**Example:**
```
Input:
42
Output:
The number is 42
```
**Hint:** You cannot add a string and an int; convert first.

## Q20. Type of a Bool Expression
**Difficulty:** Easy
**Problem:** Read two integers and print the type of `a > b`.
**Input:** Two lines.
**Output:** Print `<class 'bool'>`.
**Hint:** Comparisons produce booleans.

## Q21. Sum of Floats
**Difficulty:** Easy
**Problem:** Read two decimals, convert with `float()`, and print their sum.
**Input:** Two lines.
**Output:** Print the sum.
**Example:**
```
Input:
1.5
2.25
Output:
3.75
```
**Hint:** `float()` each input.

## Q22. Distinguish 0 and 0.0 Types
**Difficulty:** Medium
**Problem:** Print the type of `0` and the type of `0.0`.
**Input:** None.
**Output:** Two lines: `<class 'int'>` then `<class 'float'>`.
**Hint:** The decimal point makes it a float.

## Q23. Convert and Average
**Difficulty:** Medium
**Problem:** Read three decimals, convert each with `float()`, and print their average.
**Input:** Three lines.
**Output:** Print the average.
**Example:**
```
Input:
1
2
3
Output:
2.0
```
**Hint:** Sum and divide by 3.

## Q24. String Multiplication by an Int
**Difficulty:** Easy
**Problem:** Read a character and an integer, and print the character repeated that many times.
**Input:** Two lines: a single character, then an integer.
**Output:** Print the repeated character.
**Example:**
```
Input:
*
5
Output:
*****
```
**Hint:** `char * n` repeats a string.

## Q25. Type After Reassignment
**Difficulty:** Medium
**Problem:** Start `x = 5`. Reassign `x = 5.0`. Print `type(x)`.
**Input:** None.
**Output:** Print `<class 'float'>`.
**Hint:** The variable's type changed to float.

## Q26. int() of a Float-Looking String
**Difficulty:** Medium
**Problem:** Read a line like `"7"` and convert to int, then print it plus 1.
**Input:** A single line.
**Output:** Print `int + 1`.
**Example:**
```
Input:
7
Output:
8
```
**Hint:** `int()` works on a string that looks like a whole number.

## Q27. The Boolean of an Empty and Non-Empty String
**Difficulty:** Easy
**Problem:** Print `bool("")` and `bool("a")`.
**Input:** None.
**Output:** Two lines: `False` then `True`.
**Hint:** Empty string is falsy.

## Q28. Use str() in an f-string Alternative
**Difficulty:** Medium
**Problem:** Read an integer and print `"Value: " + str(n)`.
**Input:** A single integer.
**Output:** Print the message.
**Example:**
```
Input:
99
Output:
Value: 99
```
**Hint:** Convert the int before concatenating.

## Q29. Type of a Nested Conversion
**Difficulty:** Medium
**Problem:** Print the type of `int(float("3.7"))`.
**Input:** None.
**Output:** Print `<class 'int'>`.
**Hint:** `float("3.7")` → `3.7`; `int(3.7)` → `3`, an int.

## Q30. Mixed Type Awareness
**Difficulty:** Medium
**Problem:** Read a decimal, convert to float, then convert that to int, and print the integer result.
**Input:** A single line.
**Output:** Print the truncated integer.
**Example:**
```
Input:
9.99
Output:
9
```
**Hint:** Chain `int(float(input()))`.
