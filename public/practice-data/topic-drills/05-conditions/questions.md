# Topic Drill 05 — Conditions

30 focused questions on: `if`, `elif`, `else`, nested conditions, multiple conditions, and ternary expressions.

**How to run:** Read input with `input()`, process, and `print()` the result.

---

## Q1. Basic if
**Difficulty:** Very Easy
**Problem:** Read an integer. If it is greater than 0, print `Positive`; otherwise print `Non-positive`.
**Input:** A single integer.
**Output:** `Positive` or `Non-positive`.
**Example:**
```
Input:
5
Output:
Positive
```
**Hint:** `if n > 0:` ... `else:` ...

## Q2. if/else Parity
**Difficulty:** Very Easy
**Problem:** Read an integer and print `Even` if divisible by 2, otherwise `Odd`.
**Input:** A single integer.
**Output:** `Even` or `Odd`.
**Example:**
```
Input:
8
Output:
Even
```
**Hint:** Check `n % 2 == 0`.

## Q3. if/elif/else Grade
**Difficulty:** Easy
**Problem:** Read a mark out of 100 and print `High` (≥80), `Mid` (≥50), or `Low` (below 50).
**Input:** A single integer.
**Output:** One of `High`, `Mid`, `Low`.
**Example:**
```
Input:
75
Output:
Mid
```
**Hint:** Use `elif` between the branches.

## Q4. Nested if
**Difficulty:** Medium
**Problem:** Read two integers. If `a > 0`, then inside that branch check if `b > 0` and print `Both positive`; otherwise (if a>0 but b≤0) print `Only a positive`. If `a ≤ 0`, print `Not a positive`.
**Input:** Two lines.
**Output:** The message.
**Example:**
```
Input:
3
2
Output:
Both positive
```
**Hint:** Put one `if` inside another.

## Q5. Multiple Conditions With and
**Difficulty:** Easy
**Problem:** Read an integer and print `Yes` if it is between 10 and 20 inclusive (use `and`).
**Input:** A single integer.
**Output:** `Yes` or `No`.
**Example:**
```
Input:
15
Output:
Yes
```
**Hint:** `if n >= 10 and n <= 20:`.

## Q6. Ternary Expression
**Difficulty:** Easy
**Problem:** Read an integer and print `"even"` or `"odd"` using a ternary expression assigned to a variable.
**Input:** A single integer.
**Output:** `even` or `odd`.
**Example:**
```
Input:
4
Output:
even
```
**Hint:** `result = "even" if n % 2 == 0 else "odd"`.

## Q7. Ternary for Larger of Two
**Difficulty:** Easy
**Problem:** Read two integers and print the larger using a ternary.
**Input:** Two lines.
**Output:** The larger value.
**Example:**
```
Input:
7
3
Output:
7
```
**Hint:** `larger = a if a > b else b`.

## Q8. Leap Year (multiple conditions)
**Difficulty:** Medium
**Problem:** Read a year and print `Leap` if divisible by 400, or divisible by 4 but not 100; otherwise `Not leap`.
**Input:** A single integer.
**Output:** `Leap` or `Not leap`.
**Example:**
```
Input:
2024
Output:
Leap
```
**Hint:** `year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)`.

## Q9. if/elif Chain for Signs
**Difficulty:** Easy
**Problem:** Read an integer and print `Positive`, `Negative`, or `Zero`.
**Input:** A single integer.
**Output:** The word.
**Example:**
```
Input:
-3
Output:
Negative
```
**Hint:** Use `elif` for the middle cases.

## Q10. Nested Ternary
**Difficulty:** Medium
**Problem:** Read an integer and print `Positive`, `Zero`, or `Negative` using a nested ternary expression.
**Input:** A single integer.
**Output:** The word.
**Example:**
```
Input:
0
Output:
Zero
```
**Hint:** `"Positive" if n > 0 else ("Zero" if n == 0 else "Negative")`.

## Q11. Comparison Chain
**Difficulty:** Easy
**Problem:** Read three integers and print `Yes` if they are in strictly increasing order.
**Input:** Three lines.
**Output:** `Yes` or `No`.
**Example:**
```
Input:
1
2
3
Output:
Yes
```
**Hint:** `if a < b < c:`.

## Q12. Multiple Conditions With or
**Difficulty:** Easy
**Problem:** Read an integer and print `Yes` if it is divisible by 3 or by 5.
**Input:** A single integer.
**Output:** `Yes` or `No`.
**Example:**
```
Input:
9
Output:
Yes
```
**Hint:** `if n % 3 == 0 or n % 5 == 0:`.

## Q13. Nested if/else for Max of Three
**Difficulty:** Medium
**Problem:** Read three integers and print the largest using nested conditions.
**Input:** Three lines.
**Output:** The largest value.
**Example:**
```
Input:
3
7
5
Output:
7
```
**Hint:** Compare `a` with `b` and `c`.

## Q14. Ternary to Choose a String
**Difficulty:** Easy
**Problem:** Read a score and print `Pass` or `Fail` (pass if ≥ 40) using a ternary.
**Input:** A single integer.
**Output:** `Pass` or `Fail`.
**Example:**
```
Input:
55
Output:
Pass
```
**Hint:** `"Pass" if score >= 40 else "Fail"`.

## Q15. if/elif/else for Temperature Category
**Difficulty:** Medium
**Problem:** Read a temperature and print `Hot` (≥30), `Warm` (≥20), `Cool` (≥10), or `Cold` (below 10).
**Input:** A single integer.
**Output:** The category.
**Example:**
```
Input:
25
Output:
Warm
```
**Hint:** Check the highest range first.

## Q16. Nested Conditions for a Rectangle
**Difficulty:** Medium
**Problem:** Read two sides. If both are positive, print `Area` and the area; otherwise print `Invalid`.
**Input:** Two lines.
**Output:** `Area <value>` or `Invalid`.
**Example:**
```
Input:
4
5
Output:
Area 20
```
**Hint:** Nest the area check inside `if a > 0 and b > 0:`.

## Q17. Ternary Inside a String
**Difficulty:** Easy
**Problem:** Read an integer and print `"It is n."` plus either `"even"` or `"odd"` using a ternary in an f-string.
**Input:** A single integer.
**Output:** A message.
**Example:**
```
Input:
3
Output:
It is 3 odd.
```
**Hint:** `f"It is {n} {'even' if n%2==0 else 'odd'}."`.

## Q18. Multiple Conditions With not
**Difficulty:** Medium
**Problem:** Read an integer and print `Yes` if it is NOT (between 1 and 5) — i.e., `not (1 <= n <= 5)`.
**Input:** A single integer.
**Output:** `Yes` or `No`.
**Example:**
```
Input:
9
Output:
Yes
```
**Hint:** `if not (1 <= n <= 5):`.

## Q19. if/elif for Number of Digits (1, 2, or 3+)
**Difficulty:** Medium
**Problem:** Read an integer and print `One digit`, `Two digits`, or `Many digits` based on how many digits it has.
**Input:** A single integer (positive).
**Output:** The category.
**Example:**
```
Input:
99
Output:
Two digits
```
**Hint:** Use `len(str(n))` in the conditions.

## Q20. Ternary to Return Absolute Value
**Difficulty:** Medium
**Problem:** Read an integer and print its absolute value using a ternary.
**Input:** A single integer.
**Output:** The absolute value.
**Example:**
```
Input:
-7
Output:
7
```
**Hint:** `n if n >= 0 else -n`.

## Q21. Nested if/elif for a Menu Choice
**Difficulty:** Medium
**Problem:** Read a single character (`a`, `s`, `m`) and print `Add`, `Subtract`, or `Multiply` accordingly; otherwise print `Unknown`.
**Input:** A single character.
**Output:** The word.
**Example:**
```
Input:
a
Output:
Add
```
**Hint:** Use `if/elif/else` on the character.

## Q22. Multiple Conditions With and/or Combined
**Difficulty:** Medium
**Problem:** Read an integer and print `Yes` if it is (positive and even) or (negative and odd).
**Input:** A single integer.
**Output:** `Yes` or `No`.
**Example:**
```
Input:
6
Output:
Yes
```
**Hint:** `if (n > 0 and n % 2 == 0) or (n < 0 and n % 2 != 0):`.

## Q23. Ternary With a Computation
**Difficulty:** Medium
**Problem:** Read two integers and print `a + b` if `a > b`, else `a * b`.
**Input:** Two lines.
**Output:** The result.
**Example:**
```
Input:
3
5
Output:
15
```
**Hint:** `result = a + b if a > b else a * b`.

## Q24. if/elif/else for a Triangle Sides Check
**Difficulty:** Hard
**Problem:** Read three side lengths and print `Valid` if they can form a triangle (each side < sum of other two), otherwise `Invalid`.
**Input:** Three lines.
**Output:** `Valid` or `Invalid`.
**Example:**
```
Input:
3
4
5
Output:
Valid
```
**Hint:** `if a < b + c and b < a + c and c < a + b:`.

## Q25. Nested Ternary for Three Categories
**Difficulty:** Medium
**Problem:** Read a score and print `Excellent` (≥90), `Good` (≥60), or `Needs work` using a nested ternary.
**Input:** A single integer.
**Output:** The category.
**Example:**
```
Input:
85
Output:
Good
```
**Hint:** Chain ternaries.

## Q26. if to Guard Division by Zero
**Difficulty:** Medium
**Problem:** Read two integers. If `b == 0`, print `Cannot divide`; otherwise print `a / b`.
**Input:** Two lines.
**Output:** The message or result.
**Example:**
```
Input:
5
0
Output:
Cannot divide
```
**Hint:** Check `b` before dividing.

## Q27. Multiple Conditions to Classify a Number
**Difficulty:** Hard
**Problem:** Read an integer and print `Special` if it is divisible by 2 and 3 and 5; otherwise `Normal`.
**Input:** A single integer.
**Output:** `Special` or `Normal`.
**Example:**
```
Input:
30
Output:
Special
```
**Hint:** `if n % 2 == 0 and n % 3 == 0 and n % 5 == 0:`.

## Q28. Ternary in a Comparison Loop Setting
**Difficulty:** Medium
**Problem:** Read two integers and print `"First"` if `a > b`, `"Second"` if `b > a`, else `"Equal"` using if/elif/else.
**Input:** Two lines.
**Output:** The word.
**Example:**
```
Input:
7
7
Output:
Equal
```
**Hint:** Three-way branch.

## Q29. Nested if/else for a Login-Style Check
**Difficulty:** Medium
**Problem:** Read a username and password. If the username is `"admin"`, then if the password is `"1234"` print `Welcome`; otherwise `Wrong password`. If the username is not admin, print `Unknown user`.
**Input:** Two lines.
**Output:** The message.
**Example:**
```
Input:
admin
1234
Output:
Welcome
```
**Hint:** Nest the password check inside the username check.

## Q30. Ternary With Logical Operators
**Difficulty:** Hard
**Problem:** Read three integers and print `a` if it is the maximum, else `b` if it is the maximum, else `c`. Use ternary/logical logic to output the maximum value.
**Input:** Three lines.
**Output:** The maximum value.
**Example:**
```
Input:
1
9
4
Output:
9
```
**Hint:** Use nested conditions or ternaries to select the max.
