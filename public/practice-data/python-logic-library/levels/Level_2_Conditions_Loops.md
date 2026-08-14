# Level 2 — Conditions + Loops (30 Questions)

**What this level teaches:** harder `if/elif/else` logic, counting and summing with conditions, `while` loops, `break`, nested loops, number patterns, and classic math problems (prime, factorial, Fibonacci, GCD, LCM).

**Total questions:** 30

> Write your own code first, then compare with the solution. The hint gives the idea, not the full answer.

---

## Question 1: Count positive and negative numbers

**What to do:** Given `numbers = [10, -5, 20, -8, 0, 15, -2]`, count positives and negatives and print both counts.

**Hint:** Two counters, one loop, `if` / `elif`. Zero is neither.

**Solution:**

```python
numbers = [10, -5, 20, -8, 0, 15, -2]

positive = 0
negative = 0

for number in numbers:
    if number > 0:
        positive += 1
    elif number < 0:
        negative += 1

print("Positive:", positive)
print("Negative:", negative)
```

**Logic:** One loop can answer several related questions at once.

---

## Question 2: Count vowels in a string

**What to do:** Given `text = "hello world"`, count the vowels (a, e, i, o, u) and print the count.

**Hint:** Check each character with `if character in "aeiou"`.

**Solution:**

```python
text = "hello world"

count = 0
for character in text:
    if character in "aeiou":
        count += 1

print(count)
```

**Logic:** Counting pattern with a membership test. (Answer: 3)

---

## Question 3: Reverse a string

**What to do:** Given `text = "python"`, print it reversed ("nohtyp") without using slicing.

**Hint:** Add each character to the *front*: `reversed_text = character + reversed_text`.

**Solution:**

```python
text = "python"

reversed_text = ""
for character in text:
    reversed_text = character + reversed_text

print(reversed_text)
```

**Logic:** Each new character is prepended, so the first character ends up last.

---

## Question 4: Find duplicate numbers

**What to do:** Given `numbers = [1, 2, 3, 4, 2, 5, 3, 6]`, print each value that appears more than once (print each duplicate once).

**Hint:** Keep a list of numbers you've seen before. If a number is already in it (and not yet reported), report it.

**Solution:**

```python
numbers = [1, 2, 3, 4, 2, 5, 3, 6]

seen = []
duplicates = []

for number in numbers:
    if number in seen and number not in duplicates:
        duplicates.append(number)
    seen.append(number)

print("Duplicates:", duplicates)
```

**Logic:** `seen` remembers past values; `duplicates` avoids printing the same duplicate twice.

---

## Question 5: Check palindrome

**What to do:** Given `text = "level"`, print "Palindrome" if it reads the same backwards, else "Not palindrome".

**Hint:** Build the reversed string in a loop, then compare with `==`.

**Solution:**

```python
text = "level"

reversed_text = ""
for character in text:
    reversed_text = character + reversed_text

if text == reversed_text:
    print("Palindrome")
else:
    print("Not palindrome")
```

**Logic:** Palindrome = "equal to its own reverse".

---

## Question 6: Find the second largest number

**What to do:** Given `numbers = [10, 45, 23, 89, 12, 67]`, print the second largest value.

**Hint:** Keep `largest` and `second_largest`, both starting at `float("-inf")`.

**Solution:**

```python
numbers = [10, 45, 23, 89, 12, 67]

largest = float("-inf")
second_largest = float("-inf")

for number in numbers:
    if number > largest:
        second_largest = largest
        largest = number
    elif number > second_largest and number != largest:
        second_largest = number

print(second_largest)
```

**Logic:** When a new champion arrives, the old champion becomes second. (Answer: 67)

---

## Question 7: Check if a number is prime

**What to do:** Given `number = 17`, print "Prime" or "Not prime". A prime has exactly two divisors: 1 and itself.

**Hint:** Try dividing the number by every value from 2 to `number - 1`. If any divides evenly, it's not prime. Use a flag.

**Solution:**

```python
number = 17

is_prime = True

if number < 2:
    is_prime = False

for i in range(2, number):
    if number % i == 0:
        is_prime = False
        break

if is_prime:
    print("Prime")
else:
    print("Not prime")
```

**Logic:** A flag (`is_prime`) starts as True and is switched off the moment we find a divisor.

---

## Question 8: Print prime numbers from 1 to 50

**What to do:** Print all prime numbers between 1 and 50, one per line.

**Hint:** Wrap Question 7's logic inside an outer loop that goes from 2 to 50.

**Solution:**

```python
for number in range(2, 51):
    is_prime = True
    for i in range(2, number):
        if number % i == 0:
            is_prime = False
            break
    if is_prime:
        print(number)
```

**Logic:** This is your first *nested loop*: an inner prime-check inside an outer counter.

---

## Question 9: Multiplication table

**What to do:** Given `number = 7`, print its multiplication table from 1 to 10, like `7 x 1 = 7`.

**Hint:** A simple loop from 1 to 10 that prints `number`, `i`, and `number * i`.

**Solution:**

```python
number = 7

for i in range(1, 11):
    print(number, "x", i, "=", number * i)
```

**Logic:** The table is just repeated multiplication — a perfect loop problem.

---

## Question 10: Factorial of a number

**What to do:** Given `n = 5`, print the factorial (5! = 5 × 4 × 3 × 2 × 1 = 120).

**Hint:** Like a running total, but you *multiply* instead of add. Start the box at 1.

**Solution:**

```python
n = 5

factorial = 1
for i in range(1, n + 1):
    factorial = factorial * i

print(factorial)
```

**Logic:** The running-product version of the total pattern. Start at 1 because multiplying by 0 would destroy everything.

---

## Question 11: Pattern — right triangle of stars

**What to do:** Print this pattern (5 rows):

```
*
**
***
****
*****
```

**Hint:** On row `i`, print `i` stars. Use `"*" * i`.

**Solution:**

```python
for i in range(1, 6):
    print("*" * i)
```

**Logic:** String repetition (`"*" * i`) makes patterns very short to write.

---

## Question 12: Pattern — 1 22 333 4444

**What to do:** Print:

```
1
22
333
4444
55555
```

**Hint:** On row `i`, repeat the *digit* `i`, `i` times: `str(i) * i`.

**Solution:**

```python
for i in range(1, 6):
    print(str(i) * i)
```

**Logic:** Convert the number to a string so it can be repeated.

---

## Question 13: Pattern — 1 12 123 1234

**What to do:** Print:

```
1
12
123
1234
12345
```

**Hint:** Row `i` needs an inner loop from 1 to `i` that builds the line digit by digit.

**Solution:**

```python
for i in range(1, 6):
    line = ""
    for j in range(1, i + 1):
        line = line + str(j)
    print(line)
```

**Logic:** This pattern forces a real nested loop — each row is itself a small sequence.

---

## Question 14: Pattern — inverted triangle

**What to do:** Print:

```
*****
****
***
**
*
```

**Hint:** Loop *downwards*: `range(5, 0, -1)` and print `i` stars.

**Solution:**

```python
for i in range(5, 0, -1):
    print("*" * i)
```

**Logic:** A downward `range` gives you shrinking rows for free.

---

## Question 15: Sum of digits of a number

**What to do:** Given `number = 1234`, print the sum of its digits (1 + 2 + 3 + 4 = 10).

**Hint:** Use a `while` loop: `number % 10` gives the last digit, `number // 10` removes it.

**Solution:**

```python
number = 1234

total = 0
while number > 0:
    total = total + number % 10
    number = number // 10

print(total)
```

**Logic:** Repeatedly peel off the last digit and add it, until nothing is left.

---

## Question 16: Count the digits in a number

**What to do:** Given `number = 987654`, print how many digits it has (should be 6).

**Hint:** Same peeling loop as Question 15, but count instead of sum.

**Solution:**

```python
number = 987654

count = 0
while number > 0:
    count = count + 1
    number = number // 10

print(count)
```

**Logic:** Every time you remove a digit, that's one more digit counted.

---

## Question 17: Reverse a number

**What to do:** Given `number = 1234`, print it reversed (4321) as a number.

**Hint:** In the peeling loop, build `reversed_number = reversed_number * 10 + digit`.

**Solution:**

```python
number = 1234

reversed_number = 0
while number > 0:
    digit = number % 10
    reversed_number = reversed_number * 10 + digit
    number = number // 10

print(reversed_number)
```

**Logic:** Multiplying by 10 shifts the old digits left, making room for the new digit on the right.

---

## Question 18: Check Armstrong number

**What to do:** An Armstrong number equals the sum of its own digits each raised to the power of the number of digits (e.g. 153 = 1³ + 5³ + 3³). Given `number = 153`, print "Armstrong" or "Not Armstrong".

**Hint:** Count digits with `len(str(number))`, then sum `digit ** power` in the peeling loop. Keep a copy of the original number for comparison.

**Solution:**

```python
number = 153
original = number

power = len(str(number))

total = 0
while number > 0:
    digit = number % 10
    total = total + digit ** power
    number = number // 10

if total == original:
    print("Armstrong")
else:
    print("Not Armstrong")
```

**Logic:** Combine three skills: digit counting, digit peeling, and comparison.

---

## Question 19: Fibonacci series up to N terms

**What to do:** Given `n = 10`, print the first 10 Fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.

**Hint:** Keep two variables `a, b = 0, 1`. Each step, print `a`, then do `a, b = b, a + b`.

**Solution:**

```python
n = 10

a, b = 0, 1
for i in range(n):
    print(a, end=" ")
    a, b = b, a + b
```

**Logic:** Each new number is the sum of the previous two — the two-variable update is the classic trick.

---

## Question 20: Sum of first N natural numbers

**What to do:** Given `n = 100`, print the sum 1 + 2 + ... + 100 (should be 5050).

**Hint:** Either use a loop with a running total, or the formula `n * (n + 1) // 2`.

**Solution:**

```python
n = 100

total = 0
for i in range(1, n + 1):
    total = total + i

print(total)

# Shortcut: print(n * (n + 1) // 2)
```

**Logic:** The loop version works for any range; the formula is a nice shortcut worth knowing.

---

## Question 21: Numbers divisible by both 3 and 5

**What to do:** Print all numbers from 1 to 50 that are divisible by **both** 3 and 5.

**Hint:** Two conditions joined with `and`. (Notice this equals "divisible by 15".)

**Solution:**

```python
for i in range(1, 51):
    if i % 3 == 0 and i % 5 == 0:
        print(i)
```

**Logic:** `and` means both conditions must be true at the same time.

---

## Question 22: Count numbers divisible by 3 or 5

**What to do:** Count how many numbers from 1 to 50 are divisible by 3 **or** 5, and print the count.

**Hint:** Join the two conditions with `or`.

**Solution:**

```python
count = 0
for i in range(1, 51):
    if i % 3 == 0 or i % 5 == 0:
        count += 1

print(count)
```

**Logic:** `or` is true when at least one condition holds. (Answer: 23)

---

## Question 23: FizzBuzz

**What to do:** For numbers 1 to 30: print "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for multiples of both, and the number itself otherwise.

**Hint:** Check the *both* case first, then 3 alone, then 5 alone, then `else`.

**Solution:**

```python
for i in range(1, 31):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
```

**Logic:** Order matters: the combined condition must be tested before the single ones.

---

## Question 24: Check leap year

**What to do:** Given `year = 2024`, print "Leap year" or "Not a leap year". Rule: divisible by 4, but not by 100 — unless also divisible by 400.

**Hint:** `(year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)`.

**Solution:**

```python
year = 2024

if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print("Leap year")
else:
    print("Not a leap year")
```

**Logic:** A compound condition with `and` inside parentheses, joined by `or`.

---

## Question 25: Largest of N numbers

**What to do:** Given `numbers = [5, 9, 3, 12, 7, 2]`, print the largest.

**Hint:** The "current best" pattern — start with `numbers[0]` and compare.

**Solution:**

```python
numbers = [5, 9, 3, 12, 7, 2]

largest = numbers[0]
for number in numbers:
    if number > largest:
        largest = number

print(largest)
```

**Logic:** Works for a list of *any* length — that's why the loop pattern beats `if/elif` chains here.

---

## Question 26: Sum digits until a single digit (digital root)

**What to do:** Given `number = 9875`, keep summing its digits until one digit remains. For 9875: 9+8+7+5 = 29 → 2+9 = 11 → 1+1 = **2**.

**Hint:** Outer `while number >= 10:` loop; inside, sum the digits once (Question 15) and make that the new number.

**Solution:**

```python
number = 9875

while number >= 10:
    total = 0
    while number > 0:
        total = total + number % 10
        number = number // 10
    number = total

print(number)
```

**Logic:** A loop that repeats a whole inner process until a stopping condition (`number < 10`) is met.

---

## Question 27: GCD of two numbers

**What to do:** Given `a = 36, b = 60`, print their greatest common divisor (should be 12).

**Hint:** Try every number from 1 up to the smaller of the two; remember the biggest one that divides both.

**Solution:**

```python
a, b = 36, 60

smaller = a if a < b else b

gcd = 1
for i in range(1, smaller + 1):
    if a % i == 0 and b % i == 0:
        gcd = i

print(gcd)
```

**Logic:** Check all candidates and keep the best one — the "current best" pattern again.

---

## Question 28: LCM of two numbers

**What to do:** Given `a = 12, b = 18`, print their least common multiple (should be 36).

**Hint:** Start at the larger number and keep adding 1 until you find a number divisible by both. Use `while True` + `break`.

**Solution:**

```python
a, b = 12, 18

lcm = a if a > b else b

while True:
    if lcm % a == 0 and lcm % b == 0:
        break
    lcm = lcm + 1

print(lcm)
```

**Logic:** The first number divisible by both is the LCM — `break` exits the moment we find it.

---

## Question 29: Pattern — pyramid

**What to do:** Print a centered pyramid of 5 rows:

```
    *
   ***
  *****
 *******
*********
```

**Hint:** Row `i` has `(rows - i)` spaces followed by `(2 * i - 1)` stars.

**Solution:**

```python
rows = 5

for i in range(1, rows + 1):
    print(" " * (rows - i) + "*" * (2 * i - 1))
```

**Logic:** Odd star counts (1, 3, 5, 7, 9) plus shrinking spaces create the triangle shape.

---

## Question 30: Pattern — diamond

**What to do:** Print a diamond of 9 rows (pyramid on top, inverted pyramid below):

```
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *
```

**Hint:** Run the pyramid loop upwards, then a second loop downwards from `rows - 1` to 1.

**Solution:**

```python
rows = 5

for i in range(1, rows + 1):
    print(" " * (rows - i) + "*" * (2 * i - 1))

for i in range(rows - 1, 0, -1):
    print(" " * (rows - i) + "*" * (2 * i - 1))
```

**Logic:** The diamond is just two pyramids sharing the middle row — build the top, then the bottom.

---

## Level 2 recap — what you now know

- **Nested loops** (Q8, Q13, Q29, Q30) — a loop inside a loop.
- **`while` loops** (Q15–18, Q26, Q28) — loop until a condition fails, not a fixed count.
- **`break`** (Q7, Q8, Q28) — exit a loop early.
- **Flags** (Q7) — a True/False variable that remembers whether something happened.
- **Two-variable tricks** (Q19) — Fibonacci, swapping, shifting values.
- **Compound conditions** (Q21–24) — `and`, `or`, parentheses.
- All of it still rests on the Level 1 patterns: **counting, totals, current-best, search, filter**.
