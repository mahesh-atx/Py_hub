# Topic Drill 03 — Operators

30 focused questions on: arithmetic (`+ - * / // % **`), comparison (`== != > < >= <=`), logical (`and or not`), assignment (`= += -= *= /=`), membership (`in not in`), identity (`is is not`).

**How to run:** Read input with `input()`, process, and `print()` the result.

---

## Q1. Addition
**Difficulty:** Very Easy
**Problem:** Read two integers and print their sum.
**Input:** Two lines.
**Output:** Print `a + b`.
**Example:**
```
Input:
5
7
Output:
12
```
**Hint:** Use `+`.

## Q2. Subtraction
**Difficulty:** Very Easy
**Problem:** Read two integers and print `a - b`.
**Input:** Two lines.
**Output:** Print the difference.
**Example:**
```
Input:
10
3
Output:
7
```
**Hint:** Order matters.

## Q3. Multiplication
**Difficulty:** Very Easy
**Problem:** Read two integers and print their product.
**Input:** Two lines.
**Output:** Print `a * b`.
**Example:**
```
Input:
6
9
Output:
54
```
**Hint:** Use `*`.

## Q4. True Division
**Difficulty:** Very Easy
**Problem:** Read two integers and print `a / b`.
**Input:** Two lines (`b != 0`).
**Output:** Print the decimal result.
**Example:**
```
Input:
10
4
Output:
2.5
```
**Hint:** `/` gives a float.

## Q5. Floor Division
**Difficulty:** Very Easy
**Problem:** Read two integers and print `a // b`.
**Input:** Two lines.
**Output:** Print the integer quotient.
**Example:**
```
Input:
17
5
Output:
3
```
**Hint:** `//` rounds down to a whole number.

## Q6. Modulo (Remainder)
**Difficulty:** Very Easy
**Problem:** Read two integers and print `a % b`.
**Input:** Two lines.
**Output:** Print the remainder.
**Example:**
```
Input:
17
5
Output:
2
```
**Hint:** `%` gives the remainder.

## Q7. Exponentiation
**Difficulty:** Very Easy
**Problem:** Read two integers and print `a ** b`.
**Input:** Two lines.
**Output:** Print the power.
**Example:**
```
Input:
2
10
Output:
1024
```
**Hint:** `**` raises to a power.

## Q8. Equality Comparison
**Difficulty:** Very Easy
**Problem:** Read two integers and print `a == b`.
**Input:** Two lines.
**Output:** Print `True` or `False`.
**Example:**
```
Input:
3
3
Output:
True
```
**Hint:** `==` tests equality.

## Q9. Greater Than
**Difficulty:** Very Easy
**Problem:** Read two integers and print `a > b`.
**Input:** Two lines.
**Output:** `True` or `False`.
**Example:**
```
Input:
7
3
Output:
True
```
**Hint:** Use `>`.

## Q10. Not Equal
**Difficulty:** Very Easy
**Problem:** Read two integers and print `a != b`.
**Input:** Two lines.
**Output:** `True` or `False`.
**Example:**
```
Input:
5
5
Output:
False
```
**Hint:** `!=` means "not equal."

## Q11. Logical AND
**Difficulty:** Easy
**Problem:** Read two integers and print `(a > 0) and (b > 0)`.
**Input:** Two lines.
**Output:** `True` or `False`.
**Example:**
```
Input:
3
-2
Output:
False
```
**Hint:** `and` is true only if both are true.

## Q12. Logical OR
**Difficulty:** Easy
**Problem:** Read two integers and print `(a > 0) or (b > 0)`.
**Input:** Two lines.
**Output:** `True` or `False`.
**Example:**
```
Input:
-1
4
Output:
True
```
**Hint:** `or` is true if at least one is true.

## Q13. Logical NOT
**Difficulty:** Easy
**Problem:** Read an integer and print `not (n > 0)`.
**Input:** A single integer.
**Output:** `True` or `False`.
**Example:**
```
Input:
5
Output:
False
```
**Hint:** `not` flips the boolean.

## Q14. Add and Assign (+=)
**Difficulty:** Easy
**Problem:** Read two integers. Start with `total = a`, then do `total += b`. Print `total`.
**Input:** Two lines.
**Output:** Print the result.
**Example:**
```
Input:
5
3
Output:
8
```
**Hint:** `total += b` is `total = total + b`.

## Q15. Multiply and Assign (*=)
**Difficulty:** Easy
**Problem:** Read two integers. Start with `p = a`, then `p *= b`. Print `p`.
**Input:** Two lines.
**Output:** Print the result.
**Example:**
```
Input:
4
6
Output:
24
```
**Hint:** `p *= b` multiplies in place.

## Q16. Subtract and Assign (-=)
**Difficulty:** Easy
**Problem:** Read an integer. Start with `n = 100`, then `n -= value`. Print `n`.
**Input:** A single integer.
**Output:** Print the result.
**Example:**
```
Input:
25
Output:
75
```
**Hint:** `n -= value`.

## Q17. Divide and Assign (/=)
**Difficulty:** Easy
**Problem:** Read an integer. Start with `x = 20`, then `x /= value`. Print `x`.
**Input:** A single integer.
**Output:** Print the result.
**Example:**
```
Input:
4
Output:
5.0
```
**Hint:** `x /= value` gives a float.

## Q18. Membership `in` (string)
**Difficulty:** Easy
**Problem:** Read a sentence and a letter, and print whether the letter is `in` the sentence.
**Input:** Two lines: sentence, then letter.
**Output:** `True` or `False`.
**Example:**
```
Input:
hello
e
Output:
True
```
**Hint:** `letter in sentence`.

## Q19. Membership `not in`
**Difficulty:** Easy
**Problem:** Read two words and print `word1 not in word2`.
**Input:** Two lines.
**Output:** `True` or `False`.
**Example:**
```
Input:
cat
concatenate
Output:
False
```
**Hint:** "cat" is a substring of "concatenate", so `not in` is False.

## Q20. Identity `is` for None
**Difficulty:** Medium
**Problem:** Read a value (may be the literal `None`). Print whether the value `is None`.
**Input:** A single line (or `None`).
**Output:** `True` or `False`.
**Example:**
```
Input:
None
Output:
True
```
**Hint:** `value is None`.

## Q21. Identity `is not`
**Difficulty:** Medium
**Problem:** Read a value and print `value is not None`.
**Input:** A single line (or `None`).
**Output:** `True` or `False`.
**Example:**
```
Input:
hello
Output:
True
```
**Hint:** `is not` checks they are not the same object.

## Q22. Order of Operations
**Difficulty:** Medium
**Problem:** Read two integers `a`, `b` and print `a + b * 2` (multiplication before addition).
**Input:** Two lines.
**Output:** Print the result.
**Example:**
```
Input:
3
4
Output:
11
```
**Hint:** `3 + 4*2 = 3 + 8 = 11`.

## Q23. Chained Comparison
**Difficulty:** Medium
**Problem:** Read three integers and print `a < b < c` (chained comparison).
**Input:** Three lines.
**Output:** `True` or `False`.
**Example:**
```
Input:
1
2
3
Output:
True
```
**Hint:** Chained comparisons check all at once.

## Q24. Combine Arithmetic and Comparison
**Difficulty:** Medium
**Problem:** Read two integers and print `(a + b) > (a * b)`.
**Input:** Two lines.
**Output:** `True` or `False`.
**Example:**
```
Input:
1
2
Output:
True
```
**Hint:** `3 > 2` is True.

## Q25. Logical Operators With Arithmetic
**Difficulty:** Medium
**Problem:** Read an integer and print `(n % 2 == 0) and (n > 0)`.
**Input:** A single integer.
**Output:** `True` or `False`.
**Example:**
```
Input:
6
Output:
True
```
**Hint:** 6 is even and positive.

## Q26. Use += to Accumulate a Sum
**Difficulty:** Medium
**Problem:** Read three integers and use `+=` to add them into one total, then print it.
**Input:** Three lines.
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
**Hint:** `total += value` three times.

## Q27. `in` With a List
**Difficulty:** Medium
**Problem:** Read a list of integers (space-separated) and a value, and print whether the value is in the list.
**Input:** Line 1: integers. Line 2: a value.
**Output:** `True` or `False`.
**Example:**
```
Input:
1 2 3
2
Output:
True
```
**Hint:** `value in lst`.

## Q28. `is` With Integers (interning note)
**Difficulty:** Medium
**Problem:** Read an integer and print `n is 10`.
**Input:** A single integer.
**Output:** `True` or `False`.
**Example:**
```
Input:
10
Output:
True
```
**Hint:** For small integers Python reuses objects, so `10 is 10` is True. (Prefer `==` normally.)

## Q29. Compound Comparison of Three Values
**Difficulty:** Medium
**Problem:** Read three integers and print `max(a, b, c) == c` using a comparison.
**Input:** Three lines.
**Output:** `True` or `False`.
**Example:**
```
Input:
1
2
3
Output:
True
```
**Hint:** `max(a, b, c)` gives the largest.

## Q30. Arithmetic With Assignment Operators
**Difficulty:** Medium
**Problem:** Read an integer `n`. Start `x = 10`, then apply `x += n`, `x *= 2`, `x -= 5`. Print the final `x`.
**Input:** A single integer.
**Output:** Print the final value.
**Example:**
```
Input:
3
Output:
21
```
**Hint:** `(10 + 3) * 2 - 5 = 21`.
