# Batch 2 — Python Fundamentals

## Topics Covered
- Variables
- Data Types
- Operators
- Input and Output
- **Conditions** (`if`, `elif`, `else`, nested, ternary)
- **Loops** (`for`, `while`, `range()`, `break`, `continue`, `pass`, nested loops)

> **Rules for this batch:** Topics 1–4 (variables, data types, operators, I/O) continue to appear. **Conditions** and **Loops** are the two new topics, introduced gradually. Do **not** use lists, tuples, sets, dictionaries, functions, or string methods beyond basic input. Strings are used only as raw text (comparison and printing). Loops work over numbers and `range()`.

**How to run:** Read input from standard input with `input()`, process it, and `print()` the result.

---

## Q101. Even or Odd

**Difficulty:** Very Easy

**Learning Objective:** Use `if/else` to branch on the modulo remainder of a number.

**Problem:** Write a program that reads a positive integer and prints `Even` if it is divisible by 2, otherwise prints `Odd`.

**Input:** A single line containing an integer `n`.

**Output:** Print `Even` or `Odd`.

**Constraints:**
- `1 <= n <= 10**6`

**Example:**
```
Input:
8

Output:
Even
```
**Explanation:** `8 % 2 == 0`, so it is even.

**Hint:** Check `if n % 2 == 0:`.

---

## Q102. Positive or Non-Positive

**Difficulty:** Very Easy

**Learning Objective:** Branch on the sign of a number using a comparison.

**Problem:** Write a program that reads an integer and prints `Positive` if it is greater than 0, otherwise prints `Non-positive`.

**Input:** A single line containing an integer `n`.

**Output:** Print `Positive` or `Non-positive`.

**Constraints:**
- `-10**6 <= n <= 10**6`

**Example:**
```
Input:
-3

Output:
Non-positive
```
**Explanation:** `-3` is not greater than 0.

**Hint:** Use `if n > 0:`.

---

## Q103. Absolute Value Without abs()

**Difficulty:** Very Easy

**Learning Objective:** Compute absolute value using a conditional instead of the built-in.

**Problem:** Write a program that reads an integer and prints its absolute value without using the `abs()` function.

**Input:** A single line containing an integer `n`.

**Output:** Print the absolute value of `n`.

**Constraints:**
- `-10**9 <= n <= 10**9`

**Example:**
```
Input:
-15

Output:
15
```
**Explanation:** The absolute value of `-15` is `15`.

**Hint:** If `n < 0`, multiply it by `-1`; otherwise print it unchanged.

---

## Q104. Larger of Two Numbers

**Difficulty:** Very Easy

**Learning Objective:** Compare two values with `if/else` and print the larger.

**Problem:** Write a program that reads two integers and prints the larger of the two. If they are equal, print either one.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print the larger value.

**Constraints:**
- `-10**9 <= a, b <= 10**9`

**Example:**
```
Input:
12
7

Output:
12
```
**Explanation:** `12` is larger than `7`.

**Hint:** Use `if a > b:` to choose which variable to print.

---

## Q105. Smaller of Two Numbers

**Difficulty:** Very Easy

**Learning Objective:** Print the smaller of two inputs using a conditional.

**Problem:** Write a program that reads two integers and prints the smaller of the two.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print the smaller value.

**Constraints:**
- `-10**9 <= a, b <= 10**9`

**Example:**
```
Input:
9
4

Output:
4
```
**Explanation:** `4` is smaller than `9`.

**Hint:** Use `if a < b:` to choose which to print.

---

## Q106. Print Numbers 1 to N

**Difficulty:** Very Easy

**Learning Objective:** Use a `for` loop with `range()` to print a sequence of numbers.

**Problem:** Write a program that reads a positive integer `n` and prints all integers from 1 to `n`, one per line.

**Input:** A single line containing an integer `n`.

**Output:** Print each integer from 1 to `n`, each on its own line.

**Constraints:**
- `1 <= n <= 100`

**Example:**
```
Input:
4

Output:
1
2
3
4
```
**Explanation:** The loop prints 1, 2, 3, 4.

**Hint:** `for i in range(1, n + 1): print(i)`.

---

## Q107. Count from N Down to 1

**Difficulty:** Very Easy

**Learning Objective:** Use `range()` with a step of `-1` to count downward.

**Problem:** Write a program that reads a positive integer `n` and prints the numbers from `n` down to 1, each on its own line.

**Input:** A single line containing an integer `n`.

**Output:** Print each integer from `n` down to 1.

**Constraints:**
- `1 <= n <= 100`

**Example:**
```
Input:
3

Output:
3
2
1
```
**Explanation:** The loop counts from 3 down to 1.

**Hint:** `range(n, 0, -1)` counts downward.

---

## Q108. First N Even Numbers

**Difficulty:** Very Easy

**Learning Objective:** Print a custom sequence using a loop and arithmetic.

**Problem:** Write a program that reads `n` and prints the first `n` even numbers starting from 2.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` lines: `2`, `4`, `6`, ... up to the `n`-th even number.

**Constraints:**
- `1 <= n <= 100`

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
**Explanation:** The first 4 even numbers are 2, 4, 6, 8.

**Hint:** The `i`-th even number is `i * 2` for `i` from 1 to `n`.

---

## Q109. Sum of Numbers 1 to N

**Difficulty:** Very Easy

**Learning Objective:** Accumulate a running total in a loop.

**Problem:** Write a program that reads a positive integer `n` and prints the sum of all integers from 1 to `n`.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum 1 + 2 + ... + n.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
5

Output:
15
```
**Explanation:** `1 + 2 + 3 + 4 + 5 = 15`.

**Hint:** Start `total = 0`, add each number inside the loop, then print after the loop.

---

## Q110. Product of Numbers 1 to N (Factorial)

**Difficulty:** Very Easy

**Learning Objective:** Accumulate a running product in a loop.

**Problem:** Write a program that reads a non-negative integer `n` and prints `n!` (the product of all integers from 1 to `n`). Note: `0! = 1`.

**Input:** A single line containing an integer `n` (`0 <= n <= 20`).

**Output:** Print a single integer equal to `n!`.

**Constraints:**
- `0 <= n <= 20`

**Example:**
```
Input:
5

Output:
120
```
**Explanation:** `5! = 5 * 4 * 3 * 2 * 1 = 120`.

**Hint:** Start `product = 1`. Multiply by each number from 1 to `n`. If `n` is 0, the loop doesn't run and the result stays 1.

---

## Q111. Sum of Even Numbers from 1 to N

**Difficulty:** Very Easy

**Learning Objective:** Combine a loop with a condition to sum only even numbers.

**Problem:** Write a program that reads `n` and prints the sum of all even numbers from 1 to `n` (inclusive).

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum of even numbers from 1 to `n`.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
10

Output:
30
```
**Explanation:** Even numbers from 1 to 10 are 2+4+6+8+10 = 30.

**Hint:** Inside the loop, use `if i % 2 == 0:` to add only even numbers.

---

## Q112. Count Odd Numbers from 1 to N

**Difficulty:** Very Easy

**Learning Objective:** Count values that satisfy a condition inside a loop.

**Problem:** Write a program that reads `n` and prints how many odd numbers there are between 1 and `n` (inclusive).

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the count of odd numbers from 1 to `n`.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
9

Output:
5
```
**Explanation:** The odd numbers are 1, 3, 5, 7, 9 — that's 5 of them.

**Hint:** Use a counter variable, increment it inside an `if i % 2 != 0:` block.

---

## Q113. First N Multiples of 3

**Difficulty:** Very Easy

**Learning Objective:** Generate multiples using arithmetic inside a loop.

**Problem:** Write a program that reads `n` and prints the first `n` multiples of 3.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` lines: `3`, `6`, `9`, ... (the first `n` multiples of 3).

**Constraints:**
- `1 <= n <= 100`

**Example:**
```
Input:
4

Output:
3
6
9
12
```
**Explanation:** The first 4 multiples of 3 are 3, 6, 9, 12.

**Hint:** The `i`-th multiple is `i * 3`.

---

## Q114. Print the Number Itself or Its Double

**Difficulty:** Very Easy

**Learning Objective:** Conditionally transform a value before printing.

**Problem:** Write a program that reads an integer. If it is positive, print it doubled; otherwise print it unchanged.

**Input:** A single line containing an integer `n`.

**Output:** Print `n * 2` if `n > 0`, otherwise print `n`.

**Constraints:**
- `-10**6 <= n <= 10**6`

**Example:**
```
Input:
7

Output:
14
```
**Explanation:** `7` is positive, so we print `14`.

**Hint:** Use `if n > 0:` to decide.

---

## Q115. Grade Description

**Difficulty:** Very Easy

**Learning Objective:** Branch on a single threshold with `if/else`.

**Problem:** Write a program that reads a numeric grade and prints `Pass` if the grade is 40 or more, otherwise prints `Fail`.

**Input:** A single line containing an integer `grade`.

**Output:** Print `Pass` or `Fail`.

**Constraints:**
- `0 <= grade <= 100`

**Example:**
```
Input:
67

Output:
Pass
```
**Explanation:** `67 >= 40`, so `Pass`.

**Hint:** Use `if grade >= 40:`.

---

## Q116. Multiplication Table of a Number

**Difficulty:** Very Easy

**Learning Objective:** Print a formatted multiplication table using a loop.

**Problem:** Write a program that reads an integer `n` and prints its multiplication table from 1 to 10.

**Input:** A single line containing an integer `n`.

**Output:** Print 10 lines in the format `n x i = result` for `i` from 1 to 10.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
3

Output:
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
3 x 5 = 15
3 x 6 = 18
3 x 7 = 21
3 x 8 = 24
3 x 9 = 27
3 x 10 = 30
```
**Explanation:** Each line multiplies `n` by a number from 1 to 10.

**Hint:** Use `for i in range(1, 11): print(f"{n} x {i} = {n*i}")`.

---

## Q117. Count Digits in a Number

**Difficulty:** Easy

**Learning Objective:** Count how many digits a number has using a `while` loop.

**Problem:** Write a program that reads a non-negative integer and prints how many digits it has.

**Input:** A single line containing an integer `n` (`n >= 0`).

**Output:** Print a single integer equal to the number of digits in `n`.

**Constraints:**
- `0 <= n <= 10**9`

**Example:**
```
Input:
78654

Output:
5
```
**Explanation:** The number 78654 has 5 digits.

**Hint:** Repeatedly divide by 10 using `//` until the number becomes 0, counting each division.

---

## Q118. Sum of Digits of Any Positive Number

**Difficulty:** Easy

**Learning Objective:** Use a `while` loop to extract and sum all digits of a number.

**Problem:** Write a program that reads a positive integer and prints the sum of its digits.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print a single integer equal to the sum of the digits of `n`.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
12345

Output:
15
```
**Explanation:** `1 + 2 + 3 + 4 + 5 = 15`.

**Hint:** Use `while n > 0:` and add `n % 10` to the total, then `n //= 10`.

---

## Q119. Reverse the Digits of a Number

**Difficulty:** Easy

**Learning Objective:** Reassemble digits in reverse order using a `while` loop.

**Problem:** Write a program that reads a positive integer and prints the number formed by reversing its digits.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print the reversed number (leading zeros are dropped).

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
4321

Output:
1234
```
**Explanation:** The digits reversed give 1234.

**Hint:** Keep building the result as `rev = rev * 10 + (n % 10)` while extracting digits with `n //= 10`.

---

## Q120. Print Numbers 2, 4, 6, ... up to N

**Difficulty:** Easy

**Learning Objective:** Use a step value in `range()` to generate a sequence.

**Problem:** Write a program that reads an even positive integer `n` and prints all even numbers from 2 up to `n`, each on its own line.

**Input:** A single line containing an even integer `n`.

**Output:** Print each even number from 2 to `n`.

**Constraints:**
- `2 <= n <= 100`
- `n` is even.

**Example:**
```
Input:
10

Output:
2
4
6
8
10
```
**Explanation:** All even numbers from 2 to 10.

**Hint:** `range(2, n + 1, 2)` produces exactly those numbers.

---

## Q121. Print Odd Numbers from 1 to N

**Difficulty:** Easy

**Learning Objective:** Generate odd numbers using a step in `range()`.

**Problem:** Write a program that reads `n` and prints all odd numbers from 1 to `n` (inclusive), each on its own line.

**Input:** A single line containing an integer `n`.

**Output:** Print each odd number from 1 to `n`.

**Constraints:**
- `1 <= n <= 100`

**Example:**
```
Input:
9

Output:
1
3
5
7
9
```
**Explanation:** The odd numbers from 1 to 9.

**Hint:** `range(1, n + 1, 2)`.

---

## Q122. Count Numbers Divisible by Both 3 and 5

**Difficulty:** Easy

**Learning Objective:** Combine a loop with a compound `and` condition.

**Problem:** Write a program that reads `n` and prints how many numbers from 1 to `n` are divisible by both 3 and 5.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the count of numbers divisible by both 3 and 5 in the range 1..n.

**Constraints:**
- `1 <= n <= 10**5`

**Example:**
```
Input:
30

Output:
2
```
**Explanation:** The numbers 15 and 30 are divisible by both 3 and 5.

**Hint:** A number is divisible by both when `i % 3 == 0 and i % 5 == 0`.

---

## Q123. Print Square of Each Number from 1 to N

**Difficulty:** Easy

**Learning Objective:** Print computed values from each loop iteration.

**Problem:** Write a program that reads `n` and prints the square of each number from 1 to `n`.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` lines, each being `i**2` for `i` from 1 to `n`.

**Constraints:**
- `1 <= n <= 100`

**Example:**
```
Input:
5

Output:
1
4
9
16
25
```
**Explanation:** `1^2, 2^2, ..., 5^2`.

**Hint:** `print(i ** 2)` inside a loop.

---

## Q124. Count Even and Odd Numbers in a Range

**Difficulty:** Easy

**Learning Objective:** Track two counters in one loop.

**Problem:** Write a program that reads two integers `a` and `b` (with `a <= b`) and prints how many even and how many odd numbers there are between them, inclusive.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print `Evens: <count> Odds: <count>` on one line.

**Constraints:**
- `-10**5 <= a <= b <= 10**5`

**Example:**
```
Input:
3
8

Output:
Evens: 3 Odds: 3
```
**Explanation:** Numbers 3..8: evens 4,6,8 (3); odds 3,5,7 (3).

**Hint:** Use two counters. In a loop over `range(a, b + 1)`, increment the right one based on `i % 2`.

---

## Q125. First N Multiples of a Given Number

**Difficulty:** Easy

**Learning Objective:** Generate multiples of any base with a loop.

**Problem:** Write a program that reads a number `k` and a count `n`, then prints the first `n` multiples of `k`.

**Input:** Two lines: integers `k` and `n`.

**Output:** Print `n` lines: `k`, `2k`, `3k`, ..., `nk`.

**Constraints:**
- `1 <= k <= 20`
- `1 <= n <= 100`

**Example:**
```
Input:
7
4

Output:
7
14
21
28
```
**Explanation:** The first 4 multiples of 7.

**Hint:** The `i`-th multiple is `i * k`.

---

## Q126. Sum of All Numbers from A to B

**Difficulty:** Easy

**Learning Objective:** Sum a contiguous range given by two inputs.

**Problem:** Write a program that reads two integers `a` and `b` (with `a <= b`) and prints the sum of all integers from `a` to `b` inclusive.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- `-10**4 <= a <= b <= 10**4`

**Example:**
```
Input:
4
7

Output:
22
```
**Explanation:** `4 + 5 + 6 + 7 = 22`.

**Hint:** Loop from `a` to `b` inclusive and add each value.

---

## Q127. Check If a Number Is Divisible by Another

**Difficulty:** Easy

**Learning Objective:** Use the modulo operator inside a condition to test divisibility.

**Problem:** Write a program that reads two integers and prints `Divisible` if the first is divisible by the second, otherwise prints `Not divisible`.

**Input:** Two lines: integers `a` and `b` (`b != 0`).

**Output:** Print `Divisible` or `Not divisible`.

**Constraints:**
- `-10**6 <= a <= 10**6`
- `1 <= b <= 10**6`

**Example:**
```
Input:
24
6

Output:
Divisible
```
**Explanation:** `24 % 6 == 0`.

**Hint:** Check `a % b == 0`.

---

## Q128. Print the Sum of First N Natural Numbers (Loop Version)

**Difficulty:** Easy

**Learning Objective:** Re-derive the sum of natural numbers using a loop (contrast with the formula from Batch 1).

**Problem:** Write a program that reads `n` and prints the sum of the first `n` natural numbers by looping (even though you know the formula, use a loop here).

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum 1..n.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
10

Output:
55
```
**Explanation:** Sum of 1..10 is 55.

**Hint:** Accumulate with a running total inside a loop.

---

## Q129. First N Powers of 2

**Difficulty:** Easy

**Learning Objective:** Print an exponential sequence with a loop.

**Problem:** Write a program that reads `n` and prints the values `2**0`, `2**1`, ..., `2**n`.

**Input:** A single line containing an integer `n` (`0 <= n <= 20`).

**Output:** Print `n+1` lines, each being a power of 2.

**Constraints:**
- `0 <= n <= 20`

**Example:**
```
Input:
5

Output:
1
2
4
8
16
32
```
**Explanation:** `2^0=1` through `2^5=32`.

**Hint:** Loop `i` from 0 to `n` and print `2 ** i`.

---

## Q130. Sum of Odd Numbers from 1 to N

**Difficulty:** Easy

**Learning Objective:** Sum only odd numbers using a conditional inside a loop.

**Problem:** Write a program that reads `n` and prints the sum of all odd numbers from 1 to `n` inclusive.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum of odd numbers in 1..n.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
9

Output:
25
```
**Explanation:** `1 + 3 + 5 + 7 + 9 = 25`.

**Hint:** Add `i` to the total only when `i % 2 != 0`.

---

## Q131. Count of Numbers Less Than a Threshold

**Difficulty:** Easy

**Learning Objective:** Count how many values in a range fall below a threshold.

**Problem:** Write a program that reads a threshold `t` and a range `a` to `b`, then prints how many numbers in `a..b` (inclusive) are less than `t`.

**Input:** Three lines: integers `t`, `a`, and `b`.

**Output:** Print a single integer equal to the count.

**Constraints:**
- `-10**5 <= a <= b <= 10**5`
- `-10**5 <= t <= 10**5`

**Example:**
```
Input:
10
7
15

Output:
3
```
**Explanation:** Numbers 7, 8, 9 (3 values) are less than 10.

**Hint:** Loop over the range and count when `i < t`.

---

## Q132. Print a Triangle of Numbers

**Difficulty:** Easy → Medium

**Learning Objective:** Use nested loops to build a simple numeric pattern.

**Problem:** Write a program that reads `n` and prints a triangle of `n` rows where row `i` contains the numbers 1 through `i`.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` rows. Row 1 is `1`, row 2 is `1 2`, ..., row `n` is `1 2 ... n`. Numbers in a row are separated by a space.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
4

Output:
1
1 2
1 2 3
1 2 3 4
```
**Explanation:** Each row shows numbers from 1 up to the row number.

**Hint:** Use one loop for rows and an inner loop (or `range`) to print the numbers in each row, adding a space between them.

---

## Q133. Print a Square of Asterisks

**Difficulty:** Easy → Medium

**Learning Objective:** Use nested loops to print a grid pattern.

**Problem:** Write a program that reads `n` and prints an `n x n` square of `*` characters.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` lines, each containing `n` asterisks with no spaces between them.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
3

Output:
***
***
***
```
**Explanation:** A 3x3 block of asterisks.

**Hint:** Two nested loops, each running `n` times; print `*` without newline then a newline at the end of each row.

---

## Q134. Right-Aligned Triangle of Asterisks

**Difficulty:** Easy → Medium

**Learning Objective:** Combine spaces and symbols in a loop to create a right-aligned pattern.

**Problem:** Write a program that reads `n` and prints `n` rows. Row `i` has `n - i` spaces followed by `i` asterisks.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` lines forming a right-aligned triangle.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
4

Output:
   *
  **
 ***
****
```
**Explanation:** Row 1 has 3 spaces then `*`; row 4 has 0 spaces then `****`.

**Hint:** For row `i`, print `n - i` spaces then `i` asterisks. Build each row's string with a loop or string multiplication (string multiplication is allowed here since it is basic string building).

---

## Q135. Sum of Digits Until a Single Digit (Digit Root)

**Difficulty:** Easy → Medium

**Learning Objective:** Repeat digit-summing until a single digit remains.

**Problem:** Write a program that reads a positive integer and repeatedly sums its digits until the result is a single digit, then prints that single digit.

**Input:** A single line containing an integer `n` (`1 <= n <= 10**9`).

**Output:** Print the single digit that results.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
9875

Output:
2
```
**Explanation:** `9+8+7+5=29`, then `2+9=11`, then `1+1=2`.

**Hint:** Use a `while` loop: while the number has more than one digit, replace it with the sum of its digits.

---

## Q136. Check Whether a Number Is Prime

**Difficulty:** Easy → Medium

**Learning Objective:** Test a number for primality by checking divisors in a loop.

**Problem:** Write a program that reads a positive integer and prints `Prime` if it has exactly two distinct positive divisors (1 and itself), otherwise prints `Not prime`.

**Input:** A single line containing an integer `n` (`2 <= n <= 10**5`).

**Output:** Print `Prime` or `Not prime`.

**Constraints:**
- `2 <= n <= 10**5`

**Example:**
```
Input:
29

Output:
Prime
```
**Explanation:** 29 has no divisors other than 1 and itself.

**Hint:** Loop from 2 to `n - 1` (or `int(n**0.5) + 1`) and check if any divides `n`.

---

## Q137. Count Divisors of a Number

**Difficulty:** Easy → Medium

**Learning Objective:** Count all divisors of a number using a loop.

**Problem:** Write a program that reads a positive integer and prints how many positive divisors it has.

**Input:** A single line containing an integer `n` (`1 <= n <= 10**5`).

**Output:** Print a single integer equal to the number of divisors.

**Constraints:**
- `1 <= n <= 10**5`

**Example:**
```
Input:
12

Output:
6
```
**Explanation:** The divisors of 12 are 1, 2, 3, 4, 6, 12 — six of them.

**Hint:** Count how many `i` from 1 to `n` satisfy `n % i == 0`.

---

## Q138. Print Divisors of a Number

**Difficulty:** Easy → Medium

**Learning Objective:** Print all divisors of a number in ascending order.

**Problem:** Write a program that reads a positive integer and prints all its divisors, one per line, in ascending order.

**Input:** A single line containing an integer `n`.

**Output:** Print each divisor of `n` on its own line, from smallest to largest.

**Constraints:**
- `1 <= n <= 10**5`

**Example:**
```
Input:
20

Output:
1
2
4
5
10
20
```
**Explanation:** Divisors of 20 in order.

**Hint:** Loop from 1 to `n` and print when `n % i == 0`.

---

## Q139. Sum of Divisors

**Difficulty:** Easy → Medium

**Learning Objective:** Sum all divisors of a number.

**Problem:** Write a program that reads a positive integer and prints the sum of all its divisors (including 1 and itself).

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum of divisors of `n`.

**Constraints:**
- `1 <= n <= 10**5`

**Example:**
```
Input:
15

Output:
24
```
**Explanation:** `1 + 3 + 5 + 15 = 24`.

**Hint:** Add `i` to a total whenever `n % i == 0`.

---

## Q140. Find the Smallest of Three Numbers

**Difficulty:** Medium

**Learning Objective:** Compare three values and find the minimum using nested or chained conditions.

**Problem:** Write a program that reads three integers and prints the smallest one.

**Input:** Three lines: integers `a`, `b`, `c`.

**Output:** Print the smallest of the three.

**Constraints:**
- `-10**6 <= a, b, c <= 10**6`

**Example:**
```
Input:
5
2
9

Output:
2
```
**Explanation:** The smallest is 2.

**Hint:** Compare `a` with `b` and `c` using nested `if`, or use chained comparisons, to find the minimum.

---

## Q141. Largest of Three Numbers

**Difficulty:** Medium

**Learning Objective:** Compare three values and find the maximum.

**Problem:** Write a program that reads three integers and prints the largest one.

**Input:** Three lines: integers `a`, `b`, `c`.

**Output:** Print the largest of the three.

**Constraints:**
- `-10**6 <= a, b, c <= 10**6`

**Example:**
```
Input:
5
2
9

Output:
9
```
**Explanation:** The largest is 9.

**Hint:** Compare the three values to determine the maximum.

---

## Q142. Grade Based on Marks

**Difficulty:** Medium

**Learning Objective:** Use `if/elif/else` to map a score to multiple categories.

**Problem:** Write a program that reads a mark out of 100 and prints a letter grade: `A` if 90+, `B` if 75–89, `C` if 60–74, `D` if 40–59, and `F` if below 40.

**Input:** A single line containing an integer `mark`.

**Output:** Print one of `A`, `B`, `C`, `D`, or `F`.

**Constraints:**
- `0 <= mark <= 100`

**Example:**
```
Input:
82

Output:
B
```
**Explanation:** 82 is in the 75–89 range, so `B`.

**Hint:** Check the highest range first and work downward with `elif`.

---

## Q143. Leap Year Check

**Difficulty:** Medium

**Learning Objective:** Combine divisibility rules with logical operators for a classic decision problem.

**Problem:** Write a program that reads a year and prints `Leap` if it is a leap year, otherwise `Not leap`. A year is a leap year if divisible by 400, or divisible by 4 but not by 100.

**Input:** A single line containing an integer `year`.

**Output:** Print `Leap` or `Not leap`.

**Constraints:**
- `1 <= year <= 10**5`

**Example:**
```
Input:
2024

Output:
Leap
```
**Explanation:** 2024 is divisible by 4 but not by 100.

**Hint:** The condition is `year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)`.

---

## Q144. Sum of First N Odd Numbers

**Difficulty:** Medium

**Learning Objective:** Sum the first `n` odd numbers using a loop and observe the pattern.

**Problem:** Write a program that reads `n` and prints the sum of the first `n` odd numbers (1, 3, 5, ...).

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum of the first `n` odd numbers.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
4

Output:
16
```
**Explanation:** `1 + 3 + 5 + 7 = 16`.

**Hint:** The `i`-th odd number is `2*i - 1`. Sum them.

---

## Q145. Print Numbers in a Range That Are Multiples of a Number

**Difficulty:** Medium

**Learning Objective:** Filter a range for multiples and print them.

**Problem:** Write a program that reads a number `k`, a start `a`, and an end `b`, then prints all numbers from `a` to `b` (inclusive) that are multiples of `k`, one per line.

**Input:** Three lines: integers `k`, `a`, `b`.

**Output:** Print each multiple of `k` in `a..b` on its own line.

**Constraints:**
- `1 <= k <= 10`  - `-10**4 <= a <= b <= 10**4`

**Example:**
```
Input:
4
6
20

Output:
8
12
16
20
```
**Explanation:** Multiples of 4 between 6 and 20.

**Hint:** Loop over the range and print when `i % k == 0`.

---

## Q146. Sum of the First N Multiples of a Number

**Difficulty:** Medium

**Learning Objective:** Sum the first `n` multiples of a number.

**Problem:** Write a program that reads a number `k` and a count `n`, then prints the sum of the first `n` multiples of `k`.

**Input:** Two lines: integers `k` and `n`.

**Output:** Print a single integer equal to `k + 2k + ... + nk`.

**Constraints:**
- `1 <= k <= 20`
- `1 <= n <= 10**4`

**Example:**
```
Input:
6
4

Output:
60
```
**Explanation:** `6 + 12 + 18 + 24 = 60`.

**Hint:** Sum `i * k` for `i` from 1 to `n`.

---

## Q147. Print a Diamond Row Pattern (Half Pyramid, descending)

**Difficulty:** Medium

**Learning Objective:** Build a descending triangle pattern with nested loops.

**Problem:** Write a program that reads `n` and prints `n` rows where row `i` contains numbers from 1 down to 1... Actually print `n` rows where the `i`-th row contains `n - i + 1` asterisks.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` rows; row `i` has `n - i + 1` asterisks.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
4

Output:
****
***
**
*
```
**Explanation:** Row 1 has 4 asterisks, row 4 has 1.

**Hint:** The number of asterisks in row `i` is `n - i + 1`.

---

## Q148. Sum of Cubes of First N Numbers

**Difficulty:** Medium

**Learning Objective:** Accumulate a sum of powers in a loop.

**Problem:** Write a program that reads `n` and prints the sum of the cubes of the first `n` natural numbers (1³ + 2³ + ... + n³).

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum of cubes.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
3

Output:
36
```
**Explanation:** `1 + 8 + 27 = 36`.

**Hint:** Add `i ** 3` to a total inside the loop.

---

## Q149. Count Multiples of 3 or 5

**Difficulty:** Medium

**Learning Objective:** Count numbers divisible by 3 or 5 using a compound condition.

**Problem:** Write a program that reads `n` and prints how many numbers from 1 to `n` are divisible by 3 or by 5.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= n <= 10**5`

**Example:**
```
Input:
10

Output:
5
```
**Explanation:** Multiples of 3 or 5 up to 10: 3, 5, 6, 9, 10 — that's 5.

**Hint:** Use `if i % 3 == 0 or i % 5 == 0:`.

---

## Q150. Print Numbers Until a Multiple of 7 (using break)

**Difficulty:** Medium

**Learning Objective:** Use `break` to stop a loop early.

**Problem:** Write a program that reads `n` and prints numbers from 1 to `n`, but stops (breaks) as soon as it prints a number that is a multiple of 7.

**Input:** A single line containing an integer `n`.

**Output:** Print the numbers from 1 up to and including the first multiple of 7 (which must be ≤ n).

**Constraints:**
- `7 <= n <= 100`

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
**Explanation:** The first multiple of 7 is 7, so we stop after printing it.

**Hint:** Inside the loop, `if i % 7 == 0: print(i); break`.

---

## Q151. Print Numbers Except Multiples of 3 (using continue)

**Difficulty:** Medium

**Learning Objective:** Use `continue` to skip values in a loop.

**Problem:** Write a program that reads `n` and prints all numbers from 1 to `n` except those divisible by 3.

**Input:** A single line containing an integer `n`.

**Output:** Print each number from 1 to `n` that is not divisible by 3.

**Constraints:**
- `1 <= n <= 100`

**Example:**
```
Input:
10

Output:
1
2
4
5
7
8
10
```
**Explanation:** The multiples of 3 (3, 6, 9) are skipped.

**Hint:** Use `if i % 3 == 0: continue` to skip.

---

## Q152. Count of Numbers in a Range Divisible by a Number

**Difficulty:** Medium

**Learning Objective:** Count multiples within a sub-range.

**Problem:** Write a program that reads a divisor `k`, a start `a`, and an end `b`, then prints how many numbers in `a..b` are divisible by `k`.

**Input:** Three lines: integers `k`, `a`, `b`.

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= k <= 100`
- `-10**4 <= a <= b <= 10**4`

**Example:**
```
Input:
5
10
30

Output:
5
```
**Explanation:** Multiples of 5 between 10 and 30: 10,15,20,25,30 — 5 of them.

**Hint:** Loop over the range and count when `i % k == 0`.

---

## Q153. Reverse Counting in Steps

**Difficulty:** Medium

**Learning Objective:** Use `range()` with a custom start, stop, and negative step.

**Problem:** Write a program that reads two integers `start` and `stop` (with `start > stop`), and prints the numbers from `start` down to `stop` (inclusive) using a step of `-2`.

**Input:** Two lines: integers `start` and `stop`.

**Output:** Print each number from `start` down to `stop` stepping by 2.

**Constraints:**
- `-10**3 <= stop < start <= 10**3`

**Example:**
```
Input:
10
2

Output:
10
8
6
4
2
```
**Explanation:** Stepping down by 2 from 10 to 2.

**Hint:** `range(start, stop - 1, -2)`.

---

## Q154. Print the Larger of Two Numbers for 3 Pairs (loop + condition)

**Difficulty:** Medium

**Learning Objective:** Repeat a conditional comparison inside a loop reading multiple inputs.

**Problem:** Write a program that reads 3 pairs of integers (each pair on two lines) and, for each pair, prints the larger number.

**Input:** Six lines, forming 3 pairs of integers.

**Output:** Print the larger of each pair, one per line.

**Constraints:**
- `-10**6 <= value <= 10**6`

**Example:**
```
Input:
4
9
3
3
7
2

Output:
9
3
7
```
**Explanation:** Pair (4,9) → 9, (3,3) → 3, (7,2) → 7.

**Hint:** Loop 3 times; read two numbers each time and print the larger.

---

## Q155. Sum of Even and Odd Digits Separately

**Difficulty:** Medium

**Learning Objective:** Classify digits of a number into two running sums.

**Problem:** Write a program that reads a positive integer and prints the sum of its even digits and the sum of its odd digits.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print two integers on one line: the sum of even digits, then the sum of odd digits.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
2384

Output:
14 3
```
**Explanation:** Digits are 2(even), 3(odd), 8(even), 4(even). Even sum = 2+8+4 = 14; odd sum = 3.

**Hint:** Extract digits in a `while` loop; add to one of two totals based on whether the digit is even or odd.

---

## Q156. Print First N Terms of the Fibonacci Series

**Difficulty:** Medium

**Learning Objective:** Generate a recurrence-based sequence with a loop.

**Problem:** Write a program that reads `n` and prints the first `n` terms of the Fibonacci sequence (starting with 0, 1).

**Input:** A single line containing an integer `n`.

**Output:** Print `n` numbers: `0, 1, 1, 2, 3, ...` each on its own line.

**Constraints:**
- `1 <= n <= 30`

**Example:**
```
Input:
6

Output:
0
1
1
2
3
5
```
**Explanation:** The first 6 Fibonacci numbers.

**Hint:** Keep two variables for the last two terms; each step, the next term is their sum, then update both.

---

## Q157. Count Digits That Are Even

**Difficulty:** Medium

**Learning Objective:** Count digits of a number that satisfy a property.

**Problem:** Write a program that reads a positive integer and prints how many of its digits are even (0 is even).

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print a single integer equal to the count of even digits.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
24613

Output:
3
```
**Explanation:** Digits 2, 4, 6 are even (3 of them).

**Hint:** In a `while` loop, check `digit % 2 == 0` for each digit.

---

## Q158. Sum of First N Multiples of Both 2 and 3 (i.e. multiples of 6)

**Difficulty:** Medium

**Learning Objective:** Sum numbers divisible by 6 (divisible by both 2 and 3).

**Problem:** Write a program that reads `n` and prints the sum of the first `n` numbers divisible by 6.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum of the first `n` multiples of 6.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
3

Output:
36
```
**Explanation:** 6 + 12 + 18 = 36.

**Hint:** The `i`-th multiple of 6 is `i * 6`; sum them.

---

## Q159. Print a Number Triangle (floyd-like first column)

**Difficulty:** Medium

**Learning Objective:** Combine nested loops with a running counter for a triangular number pattern.

**Problem:** Write a program that reads `n` and prints `n` rows. Row `i` contains the numbers `i` repeated `i` times, separated by spaces.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` rows; row `i` has `i` copies of the number `i`.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
4

Output:
1
2 2
3 3 3
4 4 4 4
```
**Explanation:** Row 3 has three 3's, etc.

**Hint:** Outer loop for rows, inner loop for the number of copies.

---

## Q160. Check If a Number Is a Palindrome (digit reversal)

**Difficulty:** Medium

**Learning Objective:** Reverse a number with a loop and compare it to the original.

**Problem:** Write a program that reads a positive integer and prints `Palindrome` if it reads the same forward and backward, otherwise `Not palindrome`.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print `Palindrome` or `Not palindrome`.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
12321

Output:
Palindrome
```
**Explanation:** Reversed 12321 is 12321.

**Hint:** Reverse the digits with a `while` loop and compare the reversed number to the original.

---

## Q161. Print the Sum of the First N Fibonacci Numbers

**Difficulty:** Medium

**Learning Objective:** Accumulate a total while generating a sequence.

**Problem:** Write a program that reads `n` and prints the sum of the first `n` Fibonacci numbers (starting 0, 1).

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- `1 <= n <= 30`

**Example:**
```
Input:
5

Output:
7
```
**Explanation:** 0 + 1 + 1 + 2 + 3 = 7.

**Hint:** Add each generated term to a running total.

---

## Q162. Perfect Number Check

**Difficulty:** Medium

**Learning Objective:** Check whether a number equals the sum of its proper divisors.

**Problem:** Write a program that reads a positive integer and prints `Perfect` if it equals the sum of its proper divisors (all divisors except itself), otherwise prints `Not perfect`.

**Input:** A single line containing an integer `n` (`2 <= n <= 10**5`).

**Output:** Print `Perfect` or `Not perfect`.

**Constraints:**
- `2 <= n <= 10**5`

**Example:**
```
Input:
28

Output:
Perfect
```
**Explanation:** Proper divisors of 28: 1+2+4+7+14 = 28.

**Hint:** Sum divisors from 1 to `n-1` (excluding `n`), then compare to `n`.

---

## Q163. Print Multiplication Tables from 1 to N

**Difficulty:** Medium

**Learning Objective:** Use nested loops to print multiple multiplication tables.

**Problem:** Write a program that reads `n` and prints the multiplication tables for numbers 1 through `n`, each from 1 to 10. Separate tables with a blank line.

**Input:** A single line containing an integer `n`.

**Output:** For each `t` from 1 to `n`, print 10 lines `t x i = t*i`, then a blank line.

**Constraints:**
- `1 <= n <= 10`

**Example:**
```
Input:
2

Output:
1 x 1 = 1
1 x 2 = 2
...
2 x 1 = 2
2 x 2 = 4
...
```
**Explanation:** Full tables for 1 and 2.

**Hint:** Outer loop over `t`, inner loop over `i` from 1 to 10.

---

## Q164. Count of Multiples in a Range (inclusive, both bounds)

**Difficulty:** Medium

**Learning Objective:** Count multiples within a range using a formula-free loop approach.

**Problem:** Write a program that reads a divisor `k` and two integers `a`, `b` (with `a <= b`), and prints how many numbers in the inclusive range `[a, b]` are divisible by `k`.

**Input:** Three lines: integers `k`, `a`, `b`.

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= k <= 100`
- `-10**4 <= a <= b <= 10**4`

**Example:**
```
Input:
3
-5
10

Output:
5
```
**Explanation:** Multiples of 3 in [-5,10]: -3,0,3,6,9 — 5 of them.

**Hint:** Loop over `range(a, b+1)` and count when `i % k == 0`. Remember `0 % k == 0`.

---

## Q165. Print the First N Numbers That Are Not Multiples of a Number

**Difficulty:** Medium

**Learning Objective:** Collect the first `n` values satisfying a condition.

**Problem:** Write a program that reads a number `k` and a count `n`, then prints the first `n` positive integers that are **not** multiples of `k`.

**Input:** Two lines: integers `k` and `n`.

**Output:** Print `n` numbers, each on its own line.

**Constraints:**
- `2 <= k <= 10`
- `1 <= n <= 100`

**Example:**
```
Input:
3
5

Output:
1
2
4
5
7
```
**Explanation:** The first 5 positive integers not divisible by 3.

**Hint:** Use a counter. Loop over increasing numbers and print + count when `num % k != 0`, stopping when the counter reaches `n`.

---

## Q166. Sum of Digits Raised to Their Position

**Difficulty:** Medium

**Learning Objective:** Combine digit extraction with exponentiation and summation.

**Problem:** Write a program that reads a positive integer and prints the sum where each digit is raised to its position. Position 1 is the leftmost digit.

**Input:** A single line containing an integer `n` (`1 <= n <= 10**9`).

**Output:** Print a single integer equal to the sum of `digit ** position` for each digit.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
253

Output:
54
```
**Explanation:** `2**1 + 5**2 + 3**3 = 2 + 25 + 27 = 54`.

**Hint:** You need to know the number of digits first, or extract digits into the correct positions. Determine the total length of `n`, then process digits from the left.

---

## Q167. Armstrong Number Check (3-digit)

**Difficulty:** Medium

**Learning Objective:** Check whether a three-digit number equals the sum of the cubes of its digits.

**Problem:** Write a program that reads a three-digit number and prints `Armstrong` if it equals the sum of the cubes of its digits, otherwise `Not armstrong`.

**Input:** A single line containing an integer `n` (`100 <= n <= 999`).

**Output:** Print `Armstrong` or `Not armstrong`.

**Constraints:**
- `100 <= n <= 999`

**Example:**
```
Input:
153

Output:
Armstrong
```
**Explanation:** `1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153`.

**Hint:** Extract the three digits, cube each, sum them, and compare to `n`.

---

## Q168. Print a Hollow Square

**Difficulty:** Medium

**Learning Objective:** Use conditions inside nested loops to draw a hollow shape.

**Problem:** Write a program that reads `n` and prints an `n x n` hollow square: border filled with `*` and the interior empty (spaces).

**Input:** A single line containing an integer `n` (`n >= 3`).

**Output:** Print `n` lines forming a hollow square of asterisks.

**Constraints:**
- `3 <= n <= 20`

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
**Explanation:** Only the border is `*`; the interior is spaces.

**Hint:** For each cell, print `*` when it is on the first/last row or first/last column, otherwise a space.

---

## Q169. Count the Number of Positive Numbers in a Set of Inputs

**Difficulty:** Medium

**Learning Objective:** Read a fixed number of inputs and count those satisfying a condition.

**Problem:** Write a program that first reads a count `n`, then reads `n` integers (one per line), and prints how many of them are positive.

**Input:** Line 1 is `n`. Then `n` lines each containing one integer.

**Output:** Print a single integer equal to the count of positive numbers.

**Constraints:**
- `1 <= n <= 100`

**Example:**
```
Input:
5
3
-1
0
7
-2

Output:
2
```
**Explanation:** The positive numbers are 3 and 7.

**Hint:** Loop `n` times, reading and checking each value.

---

## Q170. Sum of All Inputs

**Difficulty:** Medium

**Learning Objective:** Read an unknown-count-but-given-count series of inputs and sum them.

**Problem:** Write a program that first reads a count `n`, then reads `n` integers, and prints their sum.

**Input:** Line 1 is `n`. Then `n` lines each containing an integer.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- `1 <= n <= 100`
- Each value is in `[-10**6, 10**6]`.

**Example:**
```
Input:
4
10
20
30
40

Output:
100
```
**Explanation:** `10+20+30+40 = 100`.

**Hint:** Accumulate a running total over `n` iterations.

---

## Q171. Average of N Inputs

**Difficulty:** Medium

**Learning Objective:** Average a variable-length list of inputs.

**Problem:** Write a program that first reads a count `n`, then reads `n` integers, and prints their average rounded to two decimal places.

**Input:** Line 1 is `n`. Then `n` lines each containing an integer.

**Output:** Print the average formatted to two decimal places.

**Constraints:**
- `1 <= n <= 100`

**Example:**
```
Input:
4
10
20
30
40

Output:
25.00
```
**Explanation:** Average is 25.0.

**Hint:** Sum all inputs, then divide by `n` and format with `:.2f`.

---

## Q172. Find the Maximum of N Inputs

**Difficulty:** Medium

**Learning Objective:** Track the running maximum while reading many inputs.

**Problem:** Write a program that first reads a count `n`, then reads `n` integers, and prints the largest one.

**Input:** Line 1 is `n`. Then `n` lines each containing an integer.

**Output:** Print the maximum value.

**Constraints:**
- `1 <= n <= 100`

**Example:**
```
Input:
5
12
7
30
4
19

Output:
30
```
**Explanation:** The largest is 30.

**Hint:** Initialize a maximum with the first value, then compare each subsequent value.

---

## Q173. Find the Minimum of N Inputs

**Difficulty:** Medium

**Learning Objective:** Track the running minimum while reading many inputs.

**Problem:** Write a program that first reads a count `n`, then reads `n` integers, and prints the smallest one.

**Input:** Line 1 is `n`. Then `n` lines each containing an integer.

**Output:** Print the minimum value.

**Constraints:**
- `1 <= n <= 100`

**Example:**
```
Input:
4
8
3
10
6

Output:
3
```
**Explanation:** The smallest is 3.

**Hint:** Initialize the minimum with the first value, then compare.

---

## Q174. Sum of Numbers from 1 to N That Are Divisible by a Number

**Difficulty:** Medium

**Learning Objective:** Sum filtered values from 1 to n.

**Problem:** Write a program that reads a divisor `k` and `n`, then prints the sum of all numbers from 1 to `n` that are divisible by `k`.

**Input:** Two lines: integers `k` and `n`.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- `1 <= k <= 20`
- `1 <= n <= 10**4`

**Example:**
```
Input:
4
15

Output:
24
```
**Explanation:** Multiples of 4 up to 15 are 4, 8, 12; their sum is 24.

**Hint:** Loop 1..n and add when divisible by `k`.

---

## Q175. Print a Triangle of Even Numbers

**Difficulty:** Medium

**Learning Objective:** Generate a number pattern using even numbers with nested loops.

**Problem:** Write a program that reads `n` and prints `n` rows. Row `i` contains the first `i` even numbers (2, 4, 6, ...), each separated by a space.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` rows; row `i` has `i` even numbers.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
4

Output:
2
2 4
2 4 6
2 4 6 8
```
**Explanation:** Row `i` shows the first `i` even numbers.

**Hint:** For each row, loop from 1 to the row number and print the corresponding even number with a space.

---

## Q176. Print Numbers in a Range Divisible by a Number (both inclusive) with Count

**Difficulty:** Medium → Hard

**Learning Objective:** Combine printing and counting in one loop.

**Problem:** Write a program that reads a divisor `k`, and range `a` to `b`, prints all numbers in `[a, b]` divisible by `k` (one per line), and on the final line prints the count.

**Input:** Three lines: integers `k`, `a`, `b`.

**Output:** Each multiple on its own line, then a final line `Count: <n>`.

**Constraints:**
- `1 <= k <= 100`
- `-10**4 <= a <= b <= 10**4`

**Example:**
```
Input:
4
7
16

Output:
8
12
16
Count: 3
```
**Explanation:** Multiples of 4 in [7,16] are 8,12,16.

**Hint:** Loop and both print and count in the same `if`.

---

## Q177. Print the Sum of Digits of Each Number from 1 to N

**Difficulty:** Medium → Hard

**Learning Objective:** Nest a digit-summing loop inside a counting loop.

**Problem:** Write a program that reads `n` and prints, for each number from 1 to `n`, the sum of its digits.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` lines; line `i` is the sum of the digits of `i`.

**Constraints:**
- `1 <= n <= 1000`

**Example:**
```
Input:
5

Output:
1
2
3
4
5
```
**Explanation:** 1→1, 2→2, ..., 5→5.

**Hint:** For each `i`, use an inner `while` loop to sum its digits.

---

## Q178. Check Whether a Number Is Perfect Square

**Difficulty:** Medium → Hard

**Learning Objective:** Determine if a number has an integer square root using a loop.

**Problem:** Write a program that reads a positive integer and prints `Perfect square` if it is the square of an integer, otherwise `Not perfect square`.

**Input:** A single line containing an integer `n` (`1 <= n <= 10**6`).

**Output:** Print `Perfect square` or `Not perfect square`.

**Constraints:**
- `1 <= n <= 10**6`

**Example:**
```
Input:
49

Output:
Perfect square
```
**Explanation:** `49 = 7**2`.

**Hint:** Loop from 1 up to `int(n**0.5)+1` and check if `i*i == n`.

---

## Q179. Print First N Prime Numbers

**Difficulty:** Medium → Hard

**Learning Objective:** Combine prime testing with a counting loop to generate a list of primes.

**Problem:** Write a program that reads `n` and prints the first `n` prime numbers, one per line.

**Input:** A single line containing an integer `n`.

**Output:** Print the first `n` primes (2, 3, 5, 7, ...), one per line.

**Constraints:**
- `1 <= n <= 100`

**Example:**
```
Input:
5

Output:
2
3
5
7
11
```
**Explanation:** The first 5 prime numbers.

**Hint:** Loop over increasing integers, test each for primality, and stop once you've printed `n` primes.

---

## Q180. Count Prime Numbers from 1 to N

**Difficulty:** Medium → Hard

**Learning Objective:** Count numbers that are prime within a range.

**Problem:** Write a program that reads `n` and prints how many prime numbers exist between 1 and `n` (inclusive).

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
10

Output:
4
```
**Explanation:** Primes up to 10 are 2,3,5,7 — 4 of them.

**Hint:** Count each number that is prime.

---

## Q181. Print the Sum of Primes from 1 to N

**Difficulty:** Medium → Hard

**Learning Objective:** Sum all primes within a range.

**Problem:** Write a program that reads `n` and prints the sum of all prime numbers from 1 to `n` (inclusive).

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
10

Output:
17
```
**Explanation:** 2+3+5+7 = 17.

**Hint:** Sum each prime found in the range.

---

## Q182. Count of Numbers with an Even Digit Sum from 1 to N

**Difficulty:** Medium → Hard

**Learning Objective:** Combine digit-summing with a classification condition.

**Problem:** Write a program that reads `n` and prints how many numbers from 1 to `n` have an even digit sum.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
10

Output:
4
```
**Explanation:** Digit sums for 1..10 are 1,2,3,4,5,6,7,8,9,1. The even ones are 2,4,6,8 → 4 numbers.

**Hint:** For each number, sum its digits and count when that sum is even.

---

## Q183. Print Numbers Whose Digit Sum Equals a Target

**Difficulty:** Medium → Hard

**Learning Objective:** Filter a range by a digit-sum criterion.

**Problem:** Write a program that reads a target `t` and an upper bound `n`, then prints all numbers from 1 to `n` whose digit sum equals `t`.

**Input:** Two lines: integers `t` and `n`.

**Output:** Print each matching number on its own line.

**Constraints:**
- `1 <= t <= 30`
- `1 <= n <= 10**4`

**Example:**
```
Input:
5
20

Output:
5
14
```
**Explanation:** Numbers ≤ 20 whose digits sum to 5: 5 and 14.

**Hint:** For each number, compute digit sum and print if it equals `t`.

---

## Q184. Print an Inverted Right Triangle of Numbers

**Difficulty:** Medium → Hard

**Learning Objective:** Combine a descending row count with number printing.

**Problem:** Write a program that reads `n` and prints `n` rows. Row `i` (starting at 1) contains the numbers `n - i + 1` down to 1.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` rows as described, numbers separated by spaces.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
4

Output:
4 3 2 1
3 2 1
2 1
1
```
**Explanation:** Row 1 lists 4..1, row 2 lists 3..1, etc.

**Hint:** Outer loop for rows; inner loop prints from the row's starting value down to 1.

---

## Q185. Sum of the Series 1 + 1/2 + 1/3 + ... + 1/N

**Difficulty:** Medium → Hard

**Learning Objective:** Accumulate a sum of reciprocal fractions.

**Problem:** Write a program that reads `n` and prints the sum of the harmonic series `1 + 1/2 + 1/3 + ... + 1/n`.

**Input:** A single line containing an integer `n`.

**Output:** Print the sum rounded to two decimal places.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
4

Output:
2.08
```
**Explanation:** `1 + 0.5 + 0.333... + 0.25 = 2.083...` ≈ 2.08.

**Hint:** Add `1 / i` for each `i` from 1 to `n`.

---

## Q186. Print the Sum of Each Row in a Multiplication Triangle

**Difficulty:** Medium → Hard

**Learning Objective:** Compute a row-wise total inside nested loops.

**Problem:** Write a program that reads `n` and prints `n` rows. Row `i` contains the products `i * 1, i * 2, ..., i * i`, then a space and the sum of that row.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` rows; each row shows the products followed by `: <sum>`.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
3

Output:
1 : 1
2 4 : 6
3 6 9 : 18
```
**Explanation:** Row 3 products 3,6,9 sum to 18.

**Hint:** Inner loop accumulates the product sum while printing.

---

## Q187. Check Whether a Number Is a Power of Two (loop version)

**Difficulty:** Medium → Hard

**Learning Objective:** Determine if a number is a power of two using repeated division.

**Problem:** Write a program that reads a positive integer and prints `Yes` if it is an exact power of two (1, 2, 4, 8, ...), otherwise `No`.

**Input:** A single line containing an integer `n` (`1 <= n <= 10**9`).

**Output:** Print `Yes` or `No`.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
32

Output:
Yes
```
**Explanation:** 32 is a power of two.

**Hint:** Repeatedly divide by 2 while the number is even and greater than 1; it is a power of two if it ends at 1.

---

## Q188. Print Numbers from N Down to 1 That Are Multiples of a Number

**Difficulty:** Medium → Hard

**Learning Objective:** Combine reverse iteration with a divisibility filter.

**Problem:** Write a program that reads `n` and `k`, then prints all numbers from `n` down to 1 that are divisible by `k`.

**Input:** Two lines: integers `n` and `k`.

**Output:** Print each qualifying number on its own line, from largest to smallest.

**Constraints:**
- `1 <= k <= n <= 100`

**Example:**
```
Input:
10
3

Output:
9
6
3
```
**Explanation:** Multiples of 3 from 10 down to 1.

**Hint:** Loop downward with `range(n, 0, -1)` and check `% k`.

---

## Q189. Sum of Even Numbers from A to B

**Difficulty:** Medium → Hard

**Learning Objective:** Sum filtered values within an arbitrary range.

**Problem:** Write a program that reads two integers `a` and `b` (with `a <= b`) and prints the sum of all even numbers in `[a, b]`.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- `-10**4 <= a <= b <= 10**4`

**Example:**
```
Input:
4
9

Output:
18
```
**Explanation:** Even numbers 4,6,8 sum to 18.

**Hint:** Loop over the range and add when even.

---

## Q190. Count Digits Equal to a Given Digit

**Difficulty:** Medium → Hard

**Learning Objective:** Count occurrences of a specific digit in a number.

**Problem:** Write a program that reads a positive integer `n` and a digit `d` (`0 <= d <= 9`), then prints how many times `d` appears in `n`.

**Input:** Two lines: integer `n`, then digit `d`.

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
122345
2

Output:
2
```
**Explanation:** The digit 2 appears twice in 122345.

**Hint:** Extract each digit in a `while` loop and count when it equals `d`.

---

## Q191. Print a Full Pyramid of Asterisks

**Difficulty:** Medium → Hard

**Learning Objective:** Build a centered pyramid pattern with nested loops.

**Problem:** Write a program that reads `n` and prints a centered pyramid of asterisks with `n` rows. Row `i` has `n - i` leading spaces then `2*i - 1` asterisks.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` rows forming a pyramid.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
4

Output:
   *
  ***
 *****
*******
```
**Explanation:** Row 3 has 1 space and 5 asterisks.

**Hint:** For each row, print the required spaces then the required asterisks.

---

## Q192. Print the Number of Digits That Are Multiples of 3

**Difficulty:** Medium → Hard

**Learning Objective:** Count digits with a divisibility property.

**Problem:** Write a program that reads a positive integer and prints how many of its digits are divisible by 3 (0 counts as divisible by 3).

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
39015

Output:
3
```
**Explanation:** Digits 3, 0, 9 are divisible by 3; that's 3 of them (5 is not, 1 is not).

**Hint:** Check `digit % 3 == 0` for each digit.

---

## Q193. Sum of All Numbers From 1 to N Whose Digit Sum Is Even

**Difficulty:** Hard

**Learning Objective:** Combine digit-summing, classification, and accumulation.

**Problem:** Write a program that reads `n` and prints the sum of all numbers from 1 to `n` that have an even digit sum.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
10

Output:
20
```
**Explanation:** Numbers with even digit sum up to 10: 2,4,6,8 sum to 20.

**Hint:** For each number, sum digits; add the whole number to the total when the digit sum is even.

---

## Q194. Print All Perfect Squares Up to N

**Difficulty:** Hard

**Learning Objective:** Generate perfect squares up to a bound.

**Problem:** Write a program that reads `n` and prints all perfect squares (1, 4, 9, 16, ...) that are less than or equal to `n`.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print each perfect square on its own line.

**Constraints:**
- `1 <= n <= 10**6`

**Example:**
```
Input:
20

Output:
1
4
9
16
```
**Explanation:** The squares 1,4,9,16 are ≤ 20.

**Hint:** Loop `i` from 1 while `i*i <= n`, printing `i*i`.

---

## Q195. Sum of the Digits of All Numbers from 1 to N

**Difficulty:** Hard

**Learning Objective:** Accumulate digit sums across a whole range.

**Problem:** Write a program that reads `n` and prints the total sum of all digits of all numbers from 1 to `n`. For example, for 1..12 that is 1+2+...+9+1+0+1+1+1+2.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the total digit sum.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
12

Output:
51
```
**Explanation:** 1+2+3+4+5+6+7+8+9+1+0+1+1+1+2 = 51.

**Hint:** For each number, add its digit sum to a grand total.

---

## Q196. Print a Number Triangle with Increasing Columns (Floyd's Triangle)

**Difficulty:** Hard

**Learning Objective:** Use a single running counter across nested loops.

**Problem:** Write a program that reads `n` and prints Floyd's triangle: `n` rows, row `i` has `i` consecutive numbers starting from 1 overall.

**Input:** A single line containing an integer `n`.

**Output:** Print `n` rows as described, numbers separated by spaces.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
4

Output:
1
2 3
4 5 6
7 8 9 10
```
**Explanation:** A single counter fills the triangle row by row.

**Hint:** Keep one counter that increments with every number printed.

---

## Q197. Sum of the Series of Factorials (1! + 2! + ... + N!)

**Difficulty:** Hard

**Learning Objective:** Compute factorials incrementally and sum them.

**Problem:** Write a program that reads `n` and prints the sum `1! + 2! + ... + n!`.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- `1 <= n <= 15`

**Example:**
```
Input:
4

Output:
33
```
**Explanation:** `1! + 2! + 3! + 4! = 1 + 2 + 6 + 24 = 33`.

**Hint:** Update the factorial by multiplying by the next number inside the loop.

---

## Q198. Print the Largest Digit of a Number

**Difficulty:** Hard

**Learning Objective:** Track the maximum digit while extracting digits.

**Problem:** Write a program that reads a positive integer and prints its largest digit.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print a single integer equal to the largest digit.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
78219

Output:
9
```
**Explanation:** The largest digit is 9.

**Hint:** Initialize a maximum with 0 and update it as you extract each digit.

---

## Q199. Print a Hollow Triangle of Asterisks

**Difficulty:** Hard

**Learning Objective:** Combine boundary conditions with nested loops for a hollow shape.

**Problem:** Write a program that reads `n` and prints a hollow right triangle: row `i` has `i` characters where the first and last character of each row are `*` (and the last row is all `*`), with spaces in between.

**Input:** A single line containing an integer `n` (`n >= 3`).

**Output:** Print `n` rows forming a hollow triangle.

**Constraints:**
- `3 <= n <= 20`

**Example:**
```
Input:
5

Output:
*
**
* *
*  *
*****
```
**Explanation:** Interior cells are spaces; borders are `*`.

**Hint:** For each row, print `*` at the start, `*` at the end, and spaces in between; the last row is all `*`.

---

## Q200. Print the Sum of the Digits of All Numbers in a Range That Are Prime

**Difficulty:** Hard

**Learning Objective:** Combine primality testing, digit summing, and accumulation.

**Problem:** Write a program that reads `n` and prints the total digit sum of all prime numbers from 1 to `n`. For example, for `n=10`, primes are 2,3,5,7 whose digits sum to 17.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to the total digit sum of all primes in the range.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
10

Output:
17
```
**Explanation:** Primes 2,3,5,7 → digit sums 2+3+5+7 = 17.

**Hint:** Check each number for primality; if prime, add the sum of its digits to the total.
