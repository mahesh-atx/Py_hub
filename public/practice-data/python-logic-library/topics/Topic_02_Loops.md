# Topic Deep-Dive 2 — Loops (30 Questions)

**Focus:** `while` loops, nested loops, `break`/`continue`/`else`, series and patterns, classic loop-based math problems.

**How to practice:** Read the task, write your own code, use the hint if stuck, then check the solution.

---

## Question 1: Sum of squares 1..n

**What to do:** Given `n = 5`, print 1² + 2² + 3² + 4² + 5² (should be 55).

**Hint:** Running-total pattern with `i * i` added each step.

**Solution:**

```python
n = 5

total = 0
for i in range(1, n + 1):
    total += i * i

print(total)
```

**Logic:** The total pattern from Level 1 with a computed addend.

---

## Question 2: Sum of cubes 1..n

**What to do:** Given `n = 4`, print 1³ + 2³ + 3³ + 4³ (should be 100).

**Hint:** Same pattern with `i ** 3`.

**Solution:**

```python
n = 4

total = 0
for i in range(1, n + 1):
    total += i ** 3

print(total)
```

**Logic:** Changing what you add changes the series — the loop skeleton stays identical.

---

## Question 3: Product of numbers in a range

**What to do:** Given `start = 2, end = 6`, print 2 × 3 × 4 × 5 × 6 (should be 720).

**Hint:** The running-total pattern, but start at 1 and multiply.

**Solution:**

```python
start, end = 2, 6

product = 1
for i in range(start, end + 1):
    product *= i

print(product)
```

**Logic:** Initializing the accumulator to 1 (not 0) is what makes multiplication work.

---

## Question 4: Multiplication table with while

**What to do:** Given `number = 6`, print its table from 1 to 10 using a `while` loop.

**Hint:** A counter `i = 1` and `while i <= 10:` — remember to increment `i`.

**Solution:**

```python
number = 6

i = 1
while i <= 10:
    print(number, "x", i, "=", number * i)
    i += 1
```

**Logic:** The while version needs all three parts you manage manually: start, condition, increment.

---

## Question 5: Reverse multiplication table

**What to do:** Given `number = 6`, print its table from 10 down to 1.

**Hint:** Count backwards with a `for` loop using a negative step, or a while loop.

**Solution:**

```python
number = 6

for i in range(10, 0, -1):
    print(number, "x", i, "=", number * i)
```

**Logic:** A downward range flips the table order.

---

## Question 6: Count digits using while

**What to do:** Given `number = 987654`, print how many digits it has using a `while` loop (no strings).

**Hint:** Repeatedly do `number //= 10` and count each pass until the number becomes 0.

**Solution:**

```python
number = 987654

count = 0
while number > 0:
    count += 1
    number //= 10

print(count)
```

**Logic:** Every `//10` strips one digit; count the strips. (Answer: 6)

---

## Question 7: Sum of odd numbers 1..n

**What to do:** Given `n = 10`, print the sum of odd numbers from 1 to n (1+3+5+7+9 = 25).

**Hint:** Either filter with `i % 2 != 0`, or start at 1 and step by 2.

**Solution:**

```python
n = 10

total = 0
for i in range(1, n + 1, 2):
    total += i

print(total)
```

**Logic:** `range(1, n+1, 2)` visits only the odd numbers — the filter is built into the step.

---

## Question 8: Print a list in reverse using indexes

**What to do:** Given `numbers = [10, 20, 30, 40, 50]`, print the elements from last to first using an index loop.

**Hint:** Loop `i` from `len(numbers) - 1` down to 0.

**Solution:**

```python
numbers = [10, 20, 30, 40, 50]

for i in range(len(numbers) - 1, -1, -1):
    print(numbers[i])
```

**Logic:** Index-based reverse traversal — the same idea as reversing a string.

---

## Question 9: Nested loop — multiplication grid

**What to do:** Print a 5×5 grid where each cell is `i * j`, as aligned columns.

**Hint:** Two nested loops; use `end="\t"` to space the columns and `print()` to end each row.

**Solution:**

```python
for i in range(1, 6):
    for j in range(1, 6):
        print(i * j, end="\t")
    print()
```

**Logic:** The outer loop draws rows, the inner loop fills each row.

---

## Question 10: Nested loop — all pairs with i < j

**What to do:** Given `n = 4`, print every pair `(i, j)` with `i < j` and `i, j` from 1 to 4.

**Hint:** Inner loop starts at `i + 1` — that automatically guarantees `i < j`.

**Solution:**

```python
n = 4

for i in range(1, n + 1):
    for j in range(i + 1, n + 1):
        print("(" + str(i) + ", " + str(j) + ")")
```

**Logic:** Starting the inner range at `i + 1` builds the condition into the loop itself.

---

## Question 11: Rectangle of stars (rows × cols)

**What to do:** Print a 3-row × 5-column rectangle of stars.

**Hint:** Outer loop for rows, inner loop for columns, `print("*", end="")`, then a bare `print()`.

**Solution:**

```python
rows, cols = 3, 5

for i in range(rows):
    for j in range(cols):
        print("*", end="")
    print()
```

**Logic:** The classic 2D pattern — one star at a time, newline per row.

---

## Question 12: Hollow square

**What to do:** Print a 5×5 hollow square of stars (border only).

**Hint:** Print `*` when the position is on the border (`i == 0` or `i == n-1` or `j == 0` or `j == n-1`), else a space.

**Solution:**

```python
n = 5

for i in range(n):
    for j in range(n):
        if i == 0 or i == n - 1 or j == 0 or j == n - 1:
            print("*", end="")
        else:
            print(" ", end="")
    print()
```

**Logic:** Border = first/last row OR first/last column. A single condition inside a nested loop.

---

## Question 13: Hollow pyramid

**What to do:** Print a hollow pyramid of 5 rows (stars on the edges only).

**Hint:** Like the solid pyramid, but print a star only at the row's start, end, or on the bottom row.

**Solution:**

```python
rows = 5

for i in range(1, rows + 1):
    line = " " * (rows - i)
    for j in range(2 * i - 1):
        if i == rows or j == 0 or j == 2 * i - 2:
            line += "*"
        else:
            line += " "
    print(line)
```

**Logic:** Build each line piece by piece; the border test decides star vs space.

---

## Question 14: Palindromic number pyramid

**What to do:** Print:

```
   1
  121
 12321
1234321
```

**Hint:** Row i is "1..i" followed by "i-1..1". Build the left and right halves separately.

**Solution:**

```python
for i in range(1, 5):
    left = "".join(str(j) for j in range(1, i + 1))
    right = "".join(str(j) for j in range(i - 1, 0, -1))
    print(" " * (4 - i) + left + right)
```

**Logic:** Two small loops per row — ascending digits, then descending.

---

## Question 15: Floyd's triangle

**What to do:** Print:

```
1
2 3
4 5 6
7 8 9 10
```

**Hint:** Keep a counter that never resets; the row number i controls how many numbers go in that row.

**Solution:**

```python
n = 1
for i in range(1, 5):
    for j in range(i):
        print(n, end=" ")
        n += 1
    print()
```

**Logic:** One counter shared across all rows — the nested loop just places it.

---

## Question 16: Pascal's triangle

**What to do:** Print the first 5 rows of Pascal's triangle (each number = sum of the two above it).

**Hint:** Keep the previous row in a list; build each new row as `[1] + [row[j] + row[j+1] ...] + [1]`.

**Solution:**

```python
rows = 5

row = [1]
for i in range(rows):
    print(row)
    row = [1] + [row[j] + row[j + 1] for j in range(len(row) - 1)] + [1]
```

**Logic:** Pascal's rule in one list comprehension — the classic loop-into-list transformation.

---

## Question 17: Collatz sequence (3n+1)

**What to do:** Given `n = 13`, print the Collatz sequence until it reaches 1: if n is even → n/2, else → 3n+1.

**Hint:** A `while n != 1` loop with an if/else inside.

**Solution:**

```python
n = 13

while n != 1:
    print(n, end=" ")
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1

print(1)
```

**Logic:** An open-ended loop — you can't predict the steps in advance; the condition decides.

---

## Question 18: Sum of harmonic series

**What to do:** Given `n = 5`, print 1 + 1/2 + 1/3 + 1/4 + 1/5 rounded to 4 decimals (2.2833).

**Hint:** Loop from 1 to n adding `1 / i`.

**Solution:**

```python
n = 5

total = 0
for i in range(1, n + 1):
    total += 1 / i

print(round(total, 4))
```

**Logic:** The total pattern with fractional addends.

---

## Question 19: Compute x^n without **

**What to do:** Given `x = 2, n = 10`, print 2^10 using a loop (1024).

**Hint:** Multiply a result by x, n times.

**Solution:**

```python
x, n = 2, 10

result = 1
for _ in range(n):
    result *= x

print(result)
```

**Logic:** Exponentiation is repeated multiplication. `_` says "I don't need the loop variable".

---

## Question 20: Count a digit inside a number

**What to do:** Given `number = 122333` and `digit = 3`, print how many times the digit 3 appears.

**Hint:** Convert the number to a string and count — or peel digits with a while loop.

**Solution:**

```python
number = 122333
digit = 3

count = 0
for ch in str(number):
    if ch == str(digit):
        count += 1

print(count)
```

**Logic:** The counting pattern over a string form of the number. (Answer: 3)

---

## Question 21: Print ASCII characters in a range

**What to do:** Print the uppercase letters A–Z using their ASCII codes.

**Hint:** `chr(65)` is "A", `chr(90)` is "Z" — loop over the codes.

**Solution:**

```python
for code in range(65, 91):
    print(chr(code), end="")
print()
```

**Logic:** Loops generate characters too — `chr` converts codes to letters.

---

## Question 22: Guessing loop with attempts and feedback

**What to do:** The secret number is 42. Let the user guess up to 5 times, telling them "Too low" or "Too high". Print success or failure.

**Hint:** A `for` loop over the attempts, `break` on success, and the `else` clause for "ran out of tries".

**Solution:**

```python
secret = 42

for attempt in range(1, 6):
    guess = int(input("Guess: "))
    if guess == secret:
        print("Correct!")
        break
    elif guess < secret:
        print("Too low")
    else:
        print("Too high")
else:
    print("Out of attempts. The number was", secret)
```

**Logic:** `for/else` — the `else` runs only when the loop finishes without `break`.

---

## Question 23: Sum of Fibonacci numbers up to N

**What to do:** Given `n = 100`, print the sum of all Fibonacci numbers that are ≤ 100 (0+1+1+2+3+5+8+13+21+34+55+89 = 232).

**Hint:** Generate the sequence with the two-variable trick, adding each term while it's ≤ n.

**Solution:**

```python
n = 100

total = 0
a, b = 0, 1
while a <= n:
    total += a
    a, b = b, a + b

print(total)
```

**Logic:** A while loop with a "small enough to include" condition.

---

## Question 24: Find all divisors of a number

**What to do:** Given `n = 36`, print all its divisors in ascending order.

**Hint:** Loop from 1 to n and print i when `n % i == 0`.

**Solution:**

```python
n = 36

for i in range(1, n + 1):
    if n % i == 0:
        print(i, end=" ")
print()
```

**Logic:** The filter pattern — keep only what divides evenly.

---

## Question 25: Perfect number check

**What to do:** Given `n = 28`, print "Perfect" if the sum of its proper divisors equals n (28 = 1+2+4+7+14), else "Not perfect".

**Hint:** Loop to n-1 (proper divisors exclude n itself), sum the divisors, compare.

**Solution:**

```python
n = 28

total = 0
for i in range(1, n):
    if n % i == 0:
        total += i

if total == n:
    print("Perfect")
else:
    print("Not perfect")
```

**Logic:** Divisors + running total + comparison — three patterns combined.

---

## Question 26: Strong number check

**What to do:** Given `n = 145`, print "Strong" if the sum of the factorials of its digits equals n (1! + 4! + 5! = 145), else "Not strong".

**Hint:** Peel digits in a while loop and use `math.factorial` on each.

**Solution:**

```python
import math

n = 145
original = n

total = 0
while n > 0:
    digit = n % 10
    total += math.factorial(digit)
    n //= 10

if total == original:
    print("Strong")
else:
    print("Not strong")
```

**Logic:** The digit-peeling loop with a per-digit computation.

---

## Question 27: Build a string by skipping vowels

**What to do:** Given `text = "programming"`, build and print a new string with all vowels removed.

**Hint:** The build pattern — add a character only when it's NOT in "aeiou".

**Solution:**

```python
text = "programming"

result = ""
for character in text:
    if character not in "aeiou":
        result += character

print(result)
```

**Logic:** Filter + build in one loop. (Answer: "prgrmmng")

---

## Question 28: continue — skip multiples of 3

**What to do:** Print numbers 1 to 10, skipping the multiples of 3, using `continue`.

**Hint:** `if i % 3 == 0: continue` jumps straight to the next iteration.

**Solution:**

```python
for i in range(1, 11):
    if i % 3 == 0:
        continue
    print(i)
```

**Logic:** `continue` skips the rest of the loop body — the opposite of `break`.

---

## Question 29: Count pairs that sum to a target

**What to do:** Given `numbers = [1, 5, 3, 4, 2]` and `target = 6`, count how many pairs (i < j) sum to the target.

**Hint:** Two nested loops with the inner loop starting after the outer index.

**Solution:**

```python
numbers = [1, 5, 3, 4, 2]
target = 6

count = 0
for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):
        if numbers[i] + numbers[j] == target:
            count += 1

print(count)
```

**Logic:** The `i + 1` start prevents double-counting and self-pairs. (Answer: 2)

---

## Question 30: Number diamond

**What to do:** Print:

```
   1
  121
 12321
1234321
 12321
  121
   1
```

**Hint:** Build the top half with a rising loop, the bottom half with a falling loop — both reusing Question 14's row logic.

**Solution:**

```python
for i in range(1, 5):
    left = "".join(str(j) for j in range(1, i + 1))
    right = "".join(str(j) for j in range(i - 1, 0, -1))
    print(" " * (4 - i) + left + right)

for i in range(3, 0, -1):
    left = "".join(str(j) for j in range(1, i + 1))
    right = "".join(str(j) for j in range(i - 1, 0, -1))
    print(" " * (4 - i) + left + right)
```

**Logic:** Two mirrored loops — the same row-building code, one going up and one going down.

---

## Loops recap

- **while loops** (Q4, 6, 17, 23, 26) — loop until a condition, not a fixed count.
- **Nested loops** (Q9–16, 29, 30) — grids, pairs, and patterns.
- **break / continue / else** (Q22, 28) — controlling iteration from inside.
- **Digit peeling** (Q6, 26) — `% 10` and `// 10` to process numbers digit by digit.
- **Running total / product** (Q1–3, 7, 18, 25) — the core accumulator pattern.
- **Two-variable updates** (Q23) — Fibonacci and friends.
- **Build-a-line patterns** (Q13–16, 30) — constructing strings piece by piece.
