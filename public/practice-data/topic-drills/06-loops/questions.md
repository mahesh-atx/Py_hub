# Topic Drill 06 — Loops

30 focused questions on: `for`, `while`, `range()`, `break`, `continue`, `pass`, and nested loops.

**How to run:** Read input with `input()`, process, and `print()` the result.

---

## Q1. for Loop Over a Range
**Difficulty:** Very Easy
**Problem:** Read an integer `n` and print the numbers from 1 to `n`.
**Input:** A single integer.
**Output:** Numbers one per line.
**Example:**
```
Input:
3
Output:
1
2
3
```
**Hint:** `for i in range(1, n + 1): print(i)`.

## Q2. while Loop Countdown
**Difficulty:** Very Easy
**Problem:** Read an integer `n` and print from `n` down to 1 using a `while` loop.
**Input:** A single integer.
**Output:** Numbers one per line.
**Example:**
```
Input:
3
Output:
3
2
1
```
**Hint:** Decrement the counter each iteration.

## Q3. Sum With a for Loop
**Difficulty:** Easy
**Problem:** Read `n` and print the sum of numbers 1..n using a `for` loop.
**Input:** A single integer.
**Output:** The sum.
**Example:**
```
Input:
5
Output:
15
```
**Hint:** Accumulate into `total`.

## Q4. Sum With a while Loop
**Difficulty:** Easy
**Problem:** Read `n` and print the sum of numbers 1..n using a `while` loop.
**Input:** A single integer.
**Output:** The sum.
**Example:**
```
Input:
4
Output:
10
```
**Hint:** Use a counter that increments until `> n`.

## Q5. range() With a Step
**Difficulty:** Easy
**Problem:** Read `n` and print the even numbers from 2 to `n` using `range()` with a step.
**Input:** A single even integer.
**Output:** Even numbers one per line.
**Example:**
```
Input:
8
Output:
2
4
6
8
```
**Hint:** `range(2, n + 1, 2)`.

## Q6. break to Stop Early
**Difficulty:** Medium
**Problem:** Read `n` and print numbers 1..n, but stop (`break`) as soon as you print a multiple of 7.
**Input:** A single integer (≥7).
**Output:** Numbers up to and including the first multiple of 7.
**Example:**
```
Input:
10
Output:
1
2
3
4
5
6
7
```
**Hint:** `if i % 7 == 0: break`.

## Q7. continue to Skip
**Difficulty:** Medium
**Problem:** Read `n` and print numbers 1..n except those divisible by 3.
**Input:** A single integer.
**Output:** Numbers one per line.
**Example:**
```
Input:
6
Output:
1
2
4
5
```
**Hint:** `if i % 3 == 0: continue`.

## Q8. pass as a Placeholder
**Difficulty:** Easy
**Problem:** Read `n` and, in a loop, use `pass` inside an `if` that checks if the number is 5, otherwise print the number. (For `n` values that reach 5, just skip printing 5.)
**Input:** A single integer (≥5).
**Output:** Numbers 1..n except 5.
**Example:**
```
Input:
7
Output:
1
2
3
4
6
7
```
**Hint:** `if i == 5: pass` then `else: print(i)` — but you can also use `continue`.

## Q9. First N Even Numbers
**Difficulty:** Easy
**Problem:** Read `n` and print the first `n` even numbers (2, 4, 6, ...).
**Input:** A single integer.
**Output:** Numbers one per line.
**Example:**
```
Input:
4
Output:
2
4
6
8
```
**Hint:** Print `i * 2` for `i` in 1..n.

## Q10. while Loop That Runs a Fixed Number of Times
**Difficulty:** Medium
**Problem:** Read `n` and use a `while` loop with a counter to print "Iteration i" for i in 1..n.
**Input:** A single integer.
**Output:** Messages one per line.
**Example:**
```
Input:
2
Output:
Iteration 1
Iteration 2
```
**Hint:** Track a counter and stop when it exceeds `n`.

## Q11. Product With a for Loop (Factorial)
**Difficulty:** Easy
**Problem:** Read `n` and print `n!` using a loop.
**Input:** A single integer (0 ≤ n ≤ 20).
**Output:** The factorial.
**Example:**
```
Input:
5
Output:
120
```
**Hint:** `product *= i` for i in 1..n.

## Q12. Sum of Even Numbers 1..n
**Difficulty:** Easy
**Problem:** Read `n` and print the sum of even numbers from 1 to `n`.
**Input:** A single integer.
**Output:** The sum.
**Example:**
```
Input:
10
Output:
30
```
**Hint:** Add only when `i % 2 == 0`.

## Q13. Count Odd Numbers 1..n
**Difficulty:** Easy
**Problem:** Read `n` and print how many odd numbers are between 1 and `n`.
**Input:** A single integer.
**Output:** The count.
**Example:**
```
Input:
9
Output:
5
```
**Hint:** Use a counter.

## Q14. Nested Loop: Square of Asterisks
**Difficulty:** Medium
**Problem:** Read `n` and print an `n x n` square of `*`.
**Input:** A single integer.
**Output:** `n` rows of `*`.
**Example:**
```
Input:
3
Output:
***
***
***
```
**Hint:** Two nested `for` loops.

## Q15. Nested Loop: Triangle of Numbers
**Difficulty:** Medium
**Problem:** Read `n` and print a triangle where row `i` has numbers 1..i.
**Input:** A single integer.
**Output:** `n` rows.
**Example:**
```
Input:
3
Output:
1
1 2
1 2 3
```
**Hint:** Outer loop for rows, inner for columns.

## Q16. Multiplication Table
**Difficulty:** Easy
**Problem:** Read `n` and print `n x i = result` for i in 1..10.
**Input:** A single integer.
**Output:** 10 lines.
**Example:**
```
Input:
3
Output:
3 x 1 = 3
...
```
**Hint:** Loop i in 1..10.

## Q17. Sum of Digits With a while Loop
**Difficulty:** Medium
**Problem:** Read a positive integer and print the sum of its digits using a `while` loop.
**Input:** A single integer.
**Output:** The digit sum.
**Example:**
```
Input:
123
Output:
6
```
**Hint:** `total += n % 10; n //= 10`.

## Q18. Count Digits
**Difficulty:** Medium
**Problem:** Read a positive integer and print how many digits it has.
**Input:** A single integer.
**Output:** The digit count.
**Example:**
```
Input:
78654
Output:
5
```
**Hint:** Divide by 10 until 0, counting.

## Q19. Reverse a Number
**Difficulty:** Medium
**Problem:** Read a positive integer and print its digits reversed.
**Input:** A single integer.
**Output:** The reversed number.
**Example:**
```
Input:
4321
Output:
1234
```
**Hint:** Build `rev = rev * 10 + n % 10`.

## Q20. Sum of a Range a..b
**Difficulty:** Easy
**Problem:** Read two integers `a`, `b` and print the sum of numbers from `a` to `b`.
**Input:** Two lines.
**Output:** The sum.
**Example:**
```
Input:
4
7
Output:
22
```
**Hint:** Loop over `range(a, b + 1)`.

## Q21. First N Fibonacci Numbers
**Difficulty:** Medium
**Problem:** Read `n` and print the first `n` Fibonacci numbers (starting 0, 1).
**Input:** A single integer.
**Output:** Numbers one per line.
**Example:**
```
Input:
5
Output:
0
1
1
2
3
```
**Hint:** Track two previous terms.

## Q22. while Loop Until a Condition
**Difficulty:** Medium
**Problem:** Read `n`. Use a `while` loop that halves `n` (integer division by 2) each step, printing each value, until `n` becomes 0.
**Input:** A single positive integer.
**Output:** The halving sequence.
**Example:**
```
Input:
8
Output:
8
4
2
1
```
**Hint:** Print `n`, then `n //= 2`, stop when `n == 0`.

## Q23. break in a Nested Loop
**Difficulty:** Hard
**Problem:** Read `n`. Print a triangle of `*` where row `i` has `i` stars, but stop the entire program once the total stars printed reaches `n`.
**Input:** A single integer.
**Output:** Triangle rows.
**Example:**
```
Input:
3
Output:
*
**
```
**Hint:** Use a counter and `break` out of both loops.

## Q24. Nested Loop: Multiplication Triangle
**Difficulty:** Medium
**Problem:** Read `n` and print, for each `i` in 1..n, the products `i*1 i*2 ... i*i`.
**Input:** A single integer.
**Output:** `n` rows.
**Example:**
```
Input:
3
Output:
1
2 4
3 6 9
```
**Hint:** Nested loops over `i` and `j`.

## Q25. Sum of Squares
**Difficulty:** Easy
**Problem:** Read `n` and print the sum of squares 1²+2²+...+n².
**Input:** A single integer.
**Output:** The sum.
**Example:**
```
Input:
3
Output:
14
```
**Hint:** Add `i ** 2`.

## Q26. Print Numbers Divisible by 3 or 5
**Difficulty:** Easy
**Problem:** Read `n` and print all numbers from 1 to `n` that are divisible by 3 or 5.
**Input:** A single integer.
**Output:** Numbers one per line.
**Example:**
```
Input:
10
Output:
3
5
6
9
10
```
**Hint:** `if i % 3 == 0 or i % 5 == 0:`.

## Q27. while Loop With continue and break
**Difficulty:** Hard
**Problem:** Starting at 1, use a `while` loop to print numbers, skipping multiples of 3 with `continue`, and stopping (`break`) once you've printed 5 numbers.
**Input:** None.
**Output:** 5 numbers.
**Example:**
```
Output:
1
2
4
5
7
```
**Hint:** Count printed numbers; skip `%3==0`.

## Q28. Nested Loop: Hollow Square
**Difficulty:** Hard
**Problem:** Read `n` and print an `n x n` hollow square (border `*`, interior spaces).
**Input:** A single integer (≥3).
**Output:** `n` rows.
**Example:**
```
Input:
4
Output:
****
*  *
*  *
****
```
**Hint:** Print `*` only on borders.

## Q29. Sum of First N Odd Numbers
**Difficulty:** Easy
**Problem:** Read `n` and print the sum of the first `n` odd numbers (1, 3, 5, ...).
**Input:** A single integer.
**Output:** The sum.
**Example:**
```
Input:
3
Output:
9
```
**Hint:** The i-th odd number is `2*i - 1`.

## Q30. Largest Digit Using a Loop
**Difficulty:** Medium
**Problem:** Read a positive integer and print its largest digit.
**Input:** A single integer.
**Output:** The largest digit.
**Example:**
```
Input:
78219
Output:
9
```
**Hint:** Extract digits in a `while` loop and track the max.
