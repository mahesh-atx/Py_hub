# 🔑 Phase 1 — Solutions

A worked solution for every question in [questions.md](questions.md).

**These stay inside Phase 1's rules.** Only variables, `input()`, `print()`, type casting, operators, `if`/`elif`/`else`, `for`, `while`, `range()`, `break` and `continue` — no lists, no functions, no imports, and no clever one-liners. If a solution here uses something you have not met yet, that is a bug; tell me.

Every solution was **executed against the full test suite** — 216 test cases across 59 questions — and passes all of them.

> ⚠️ Reading a solution you have not attempted feels like learning and is not. If you open one, close it, delete what you wrote, and reproduce it from memory. Recognising correct code and writing it from a blank file are different skills, and only the second one is short.
>

**There is more than one right answer.** These are written to be *readable*, not shortest. If yours passes the tests and you can explain it line by line, yours is correct.

**Prompts do not matter.** The grader ignores whatever you pass to `input()`, so `input()` with no message scores the same as the wording used here.

```bash
cd tests
python run_tests.py --new 4     # write your own first
python run_tests.py 4 --diff    # then check it
```

---

## Contents

| # | Question | Test cases |
| --- | --- | --- |
| Q1 | [Hello, You](#q1-hello-you) | 1 |
| Q2 | [Variable Swap Display](#q2-variable-swap-display) | 1 |
| Q3 | [Type Detective](#q3-type-detective) | 1 |
| Q4 | [Rectangle Area](#q4-rectangle-area) | 4 |
| Q5 | [Seconds Breakdown](#q5-seconds-breakdown) | 5 |
| Q6 | [Temperature Converter](#q6-temperature-converter) | 4 |
| Q7 | [Simple Interest](#q7-simple-interest) | 3 |
| Q8 | [Currency Formatting](#q8-currency-formatting) | 5 |
| Q9 | [Circle Properties](#q9-circle-properties) | 4 |
| Q10 | [Integer Division Explorer](#q10-integer-division-explorer) | 4 |
| Q11 | [Age in Days](#q11-age-in-days) | 4 |
| Q12 | [Bill Splitter](#q12-bill-splitter) | 4 |
| Q13 | [Even or Odd](#q13-even-or-odd) | 4 |
| Q14 | [Last Digit](#q14-last-digit) | 4 |
| Q15 | [Digit Sum of a 3-Digit Number](#q15-digit-sum-of-a-3-digit-number) | 4 |
| Q16 | [Reverse a 3-Digit Number](#q16-reverse-a-3-digit-number) | 4 |
| Q17 | [Comparison Chain](#q17-comparison-chain) | 4 |
| Q18 | [Logical Truth Table](#q18-logical-truth-table) | 1 |
| Q19 | [Bitwise Basics](#q19-bitwise-basics) | 4 |
| Q20 | [Check Power of Two](#q20-check-power-of-two) | 5 |
| Q21 | [Membership Test](#q21-membership-test) | 4 |
| Q22 | [Identity vs Equality](#q22-identity-vs-equality) | manual |
| Q23 | [Precedence Puzzle](#q23-precedence-puzzle) | 1 |
| Q24 | [Compound Interest](#q24-compound-interest) | 3 |
| Q25 | [Positive, Negative or Zero](#q25-positive-negative-or-zero) | 4 |
| Q26 | [Largest of Three](#q26-largest-of-three) | 4 |
| Q27 | [Grade Calculator](#q27-grade-calculator) | 7 |
| Q28 | [Leap Year](#q28-leap-year) | 5 |
| Q29 | [Triangle Validity](#q29-triangle-validity) | 4 |
| Q30 | [Electricity Bill](#q30-electricity-bill) | 5 |
| Q31 | [Income Tax Slabs](#q31-income-tax-slabs) | 5 |
| Q32 | [Character Classifier](#q32-character-classifier) | 4 |
| Q33 | [Calculator with Validation](#q33-calculator-with-validation) | 4 |
| Q34 | [BMI Category](#q34-bmi-category) | 4 |
| Q35 | [Ticket Pricing](#q35-ticket-pricing) | 4 |
| Q36 | [Nested Conditions — Loan Eligibility](#q36-nested-conditions-loan-eligibility) | 4 |
| Q37 | [Count to N](#q37-count-to-n) | 4 |
| Q38 | [Sum and Average](#q38-sum-and-average) | 3 |
| Q39 | [Multiplication Table](#q39-multiplication-table) | 3 |
| Q40 | [Factorial](#q40-factorial) | 5 |
| Q41 | [Fibonacci Series](#q41-fibonacci-series) | 4 |
| Q42 | [Prime Check](#q42-prime-check) | 5 |
| Q43 | [Primes in a Range](#q43-primes-in-a-range) | 4 |
| Q44 | [Digit Operations](#q44-digit-operations) | 4 |
| Q45 | [Armstrong Number](#q45-armstrong-number) | 5 |
| Q46 | [GCD and LCM](#q46-gcd-and-lcm) | 4 |
| Q47 | [Number Guessing Game](#q47-number-guessing-game) | 3 |
| Q48 | [Menu-Driven Program](#q48-menu-driven-program) | 4 |
| Q49 | [Collatz Sequence](#q49-collatz-sequence) | 4 |
| Q50 | [Perfect Numbers](#q50-perfect-numbers) | 1 |
| Q51 | [Right Triangle of Stars](#q51-right-triangle-of-stars) | 3 |
| Q52 | [Inverted Right Triangle](#q52-inverted-right-triangle) | 3 |
| Q53 | [Centred Pyramid](#q53-centred-pyramid) | 3 |
| Q54 | [Number Triangle](#q54-number-triangle) | 3 |
| Q55 | [Floyd's Triangle](#q55-floyd-s-triangle) | 3 |
| Q56 | [Pascal's Triangle](#q56-pascal-s-triangle) | 3 |
| Q57 | [ATM Simulator](#q57-atm-simulator) | 4 |
| Q58 | [Student Report Card](#q58-student-report-card) | 3 |
| Q59 | [Number Analysis Report](#q59-number-analysis-report) | 3 |
| Q60 | [Multiplication Table Grid](#q60-multiplication-table-grid) | 3 |

---

## Tier 1 — Variables, Types and Printing (Q1–Q12)

### Q1. Hello, You

```python
print("Hello, World!")
print("Priya Sharma")
print("Learning Python")
```

**What to notice:** Three separate `print()` calls make three lines.

**Sample case** — input *(no input)*:

```
Hello, World!
Priya Sharma
Learning Python
```

---

### Q2. Variable Swap Display

```python
a = 10
b = 25
print(f"Before: a = {a}, b = {b}")

# Swapping: Python builds (b, a) on the right first, then assigns.
a, b = b, a

print(f"After: a = {a}, b = {b}")
```

**What to notice:** `a, b = b, a` builds the pair on the right first, so no temporary variable is needed.

**Sample case** — input *(no input)*:

```
Before: a = 10, b = 25
After: a = 25, b = 10
```

---

### Q3. Type Detective

```python
whole_number = 42
decimal_number = 3.14
text = "Python"
truth_value = True
nothing = None

print(whole_number, type(whole_number))
print(decimal_number, type(decimal_number))
print(text, type(text))
print(truth_value, type(truth_value))
print(nothing, type(nothing))
```

**What to notice:** Each value is stored in its own clearly named variable, then printed with its type.

**Sample case** — input *(no input)*:

```
42 <class 'int'>
3.14 <class 'float'>
Python <class 'str'>
True <class 'bool'>
None <class 'NoneType'>
```

---

### Q4. Rectangle Area

```python
length = int(input("Enter length: "))
width = int(input("Enter width: "))

area = length * width
perimeter = 2 * (length + width)

print(f"Area: {area}")
print(f"Perimeter: {perimeter}")
```

**What to notice:** `int()` around each `input()` — without it you would be multiplying text.

**Sample case** — input `12`, `5`:

```
Area: 60
Perimeter: 34
```

Also tested on 3 hidden cases: `1 1`, `100 250`, `7 3`

---

### Q5. Seconds Breakdown

```python
total_seconds = int(input("Enter seconds: "))

hours = total_seconds // 3600          # whole hours
remaining = total_seconds % 3600       # what is left over
minutes = remaining // 60
seconds = remaining % 60

print(f"{total_seconds} seconds = {hours} hours, {minutes} minutes, {seconds} seconds")
```

**What to notice:** `//` takes the whole part, `%` keeps the leftover. Do hours first, then reuse the remainder.

**Sample case** — input `7385`:

```
7385 seconds = 2 hours, 3 minutes, 5 seconds
```

Also tested on 4 hidden cases: `0`, `59`, `86399`, `3600`

---

### Q6. Temperature Converter

```python
celsius = float(input("Enter Celsius: "))

fahrenheit = celsius * 9 / 5 + 32

print(f"{celsius}\u00b0C = {fahrenheit:.1f}\u00b0F")
```

**What to notice:** Write `9 / 5`, not `9 // 5` — integer division would turn every answer into `C + 32`.

**Sample case** — input `37`:

```
37.0°C = 98.6°F
```

Also tested on 3 hidden cases: `0`, `-40`, `100`

---

### Q7. Simple Interest

```python
principal = float(input("Principal: "))
rate = float(input("Rate: "))
years = float(input("Time (years): "))

interest = principal * rate * years / 100
total = principal + interest

print(f"Interest: {interest:.2f}")
print(f"Total amount: {total:.2f}")
```

**What to notice:** Simple interest is linear: the same amount is added each year.

**Sample case** — input `50000`, `7.5`, `3`:

```
Interest: 11250.00
Total amount: 61250.00
```

Also tested on 2 hidden cases: `1000 10 1`, `25000 0 5`

---

### Q8. Currency Formatting

```python
amount = int(input("Enter amount: "))

# The comma in {amount:,} adds thousands separators.
print(f"Total: \u20b9{amount:,}")
```

**What to notice:** The `,` inside `{amount:,}` is what inserts the thousands separators.

**Sample case** — input `1455300`:

```
Total: ₹1,455,300
```

Also tested on 4 hidden cases: `0`, `999`, `1000`, `123456789`

---

### Q9. Circle Properties

```python
pi = 3.14159
radius = float(input("Enter radius: "))

circumference = 2 * pi * radius
area = pi * radius * radius

print(f"Circumference: {circumference:.2f}")
print(f"Area: {area:.2f}")
```

**What to notice:** `radius * radius` (or `radius ** 2`). `radius ^ 2` is a different operator entirely.

**Sample case** — input `7`:

```
Circumference: 43.98
Area: 153.94
```

Also tested on 3 hidden cases: `1`, `0`, `2.5`

---

### Q10. Integer Division Explorer

```python
a = int(input("First number: "))
b = int(input("Second number: "))

print(f"{a} / {b} = {a / b}")      # true division, always a float
print(f"{a} // {b} = {a // b}")    # floor division, drops the remainder
print(f"{a} % {b} = {a % b}")      # the remainder itself
print(f"{a} ** {b} = {a ** b}")    # a to the power of b
```

**What to notice:** Four operators, four different answers. `/` always gives a float; `//` throws the remainder away.

**Sample case** — input `17`, `5`:

```
17 / 5 = 3.4
17 // 5 = 3
17 % 5 = 2
17 ** 5 = 1419857
```

Also tested on 3 hidden cases: `10 3`, `7 7`, `2 8`

---

### Q11. Age in Days

```python
age = int(input("Enter age: "))

days = age * 365
hours = days * 24
minutes = hours * 60

print(f"Days: {days}")
print(f"Hours: {hours}")
print(f"Minutes: {minutes}")
```

**What to notice:** Each line is built from the one above it, so the arithmetic only happens once.

**Sample case** — input `25`:

```
Days: 9125
Hours: 219000
Minutes: 13140000
```

Also tested on 3 hidden cases: `0`, `1`, `100`

---

### Q12. Bill Splitter

```python
total = float(input("Bill amount: "))
people = int(input("Number of people: "))

each = round(total / people, 2)
collected = each * people
difference = abs(round(total - collected, 2))

print(f"Each pays: {each:.2f}")
print(f"Rounding difference: {difference:.2f}")
```

**What to notice:** Three people paying ₹833.33 covers ₹2499.99 — the missing paisa is the point of the question.

**Sample case** — input `2500`, `3`:

```
Each pays: 833.33
Rounding difference: 0.01
```

Also tested on 3 hidden cases: `100 4`, `1000 7`, `50 1`

---

## Tier 2 — Operators and Expressions (Q13–Q24)

### Q13. Even or Odd

```python
number = int(input("Enter a number: "))

# A comparison is already True or False, so it can go straight in the f-string.
print(f"Is {number} even? {number % 2 == 0}")
```

**What to notice:** A comparison is already `True` or `False`, so it drops straight into the f-string.

**Sample case** — input `47`:

```
Is 47 even? False
```

Also tested on 3 hidden cases: `0`, `-3`, `100`

---

### Q14. Last Digit

```python
number = int(input("Enter a number: "))

last_digit = number % 10

print(f"Last digit: {last_digit}")
```

**What to notice:** `% 10` always gives the last digit, because we count in base 10.

**Sample case** — input `48293`:

```
Last digit: 3
```

Also tested on 3 hidden cases: `7`, `100`, `9`

---

### Q15. Digit Sum of a 3-Digit Number

```python
number = int(input("Enter a 3-digit number: "))

hundreds = number // 100          # 472 // 100 -> 4
tens = (number // 10) % 10        # 472 // 10 -> 47, then 47 % 10 -> 7
units = number % 10               # 472 % 10 -> 2

print(f"Digits: {hundreds} {tens} {units}")
print(f"Sum: {hundreds + tens + units}")
```

**What to notice:** `//` shifts digits off the right, `%` grabs the last one. Combine them to reach any digit.

**Sample case** — input `472`:

```
Digits: 4 7 2
Sum: 13
```

Also tested on 3 hidden cases: `100`, `999`, `505`

---

### Q16. Reverse a 3-Digit Number

```python
number = int(input("Enter a 3-digit number: "))

hundreds = number // 100
tens = (number // 10) % 10
units = number % 10

# Rebuild with the place values swapped round.
reversed_number = units * 100 + tens * 10 + hundreds

print(f"Reversed: {reversed_number}")
```

**What to notice:** Pull the digits out, then rebuild the number with the place values swapped.

**Sample case** — input `472`:

```
Reversed: 274
```

Also tested on 3 hidden cases: `100`, `999`, `120`

---

### Q17. Comparison Chain

```python
a = int(input("a: "))
b = int(input("b: "))
c = int(input("c: "))

is_largest = a > b and a > c

print(f"Is a the largest? {is_largest}")
```

**What to notice:** Two comparisons joined by `and` produce a single boolean.

**Sample case** — input `15`, `9`, `12`:

```
Is a the largest? True
```

Also tested on 3 hidden cases: `1 5 3`, `7 7 7`, `9 2 9`

---

### Q18. Logical Truth Table

```python
print("A     B     A and B   A or B    not A")

# Four rows, written out one at a time - no loops needed.
a = True
b = True
print(f"{str(a):<6}{str(b):<6}{str(a and b):<10}{str(a or b):<10}{str(not a)}")

a = True
b = False
print(f"{str(a):<6}{str(b):<6}{str(a and b):<10}{str(a or b):<10}{str(not a)}")

a = False
b = True
print(f"{str(a):<6}{str(b):<6}{str(a and b):<10}{str(a or b):<10}{str(not a)}")

a = False
b = False
print(f"{str(a):<6}{str(b):<6}{str(a and b):<10}{str(a or b):<10}{str(not a)}")
```

**What to notice:** Four rows written out one at a time. Only `False or False` is `False`.

**Sample case** — input *(no input)*:

```
A     B     A and B   A or B    not A
True  True  True      True      False
True  False False     True      False
False True  False     True      True
False False False     False     True
```

---

### Q19. Bitwise Basics

```python
a = int(input("a: "))
b = int(input("b: "))

print(f"a & b = {a & b}")        # 1 only where BOTH bits are 1
print(f"a | b = {a | b}")        # 1 where EITHER bit is 1
print(f"a ^ b = {a ^ b}")        # 1 where the bits DIFFER
print(f"a << 1 = {a << 1}")      # shift left = double
print(f"a >> 1 = {a >> 1}")      # shift right = halve
```

**What to notice:** Write 12 and 10 in binary on paper first and the answers become obvious.

**Sample case** — input `12`, `10`:

```
a & b = 8
a | b = 14
a ^ b = 6
a << 1 = 24
a >> 1 = 6
```

Also tested on 3 hidden cases: `5 3`, `0 7`, `255 15`

---

### Q20. Check Power of Two

```python
number = int(input("Enter a number: "))

# A power of two has exactly one bit set, so n and n-1 share no bits.
is_power = number > 0 and number & (number - 1) == 0

print(f"Is power of two? {is_power}")
```

**What to notice:** A power of two has exactly one bit set, so `n` and `n - 1` have no bits in common.

**Sample case** — input `64`:

```
Is power of two? True
```

Also tested on 4 hidden cases: `1`, `0`, `6`, `1024`

---

### Q21. Membership Test

```python
character = input("Enter a character: ")

is_vowel = character.lower() in "aeiou"

print(f"Is vowel? {is_vowel}")
```

**What to notice:** `in` searches a string directly. Lowercase first so `A` works too.

**Sample case** — input `e`:

```
Is vowel? True
```

Also tested on 3 hidden cases: `z`, `A`, `u`

---

### Q22. Identity vs Equality

*Manual — The `is` results depend on how your interpreter folds constants, so there is no single correct output. Run it and record what you see.*

```python
a = 1000
b = 1000
print(f"1000 == 1000 -> {a == b}")
print(f"1000 is 1000 -> {a is b}")

c = 100
d = 100
print(f"100 == 100 -> {c == d}")
print(f"100 is 100 -> {c is d}")

# Now force two separate objects and watch `is` change.
e = int("1000")
print(f"forced apart: == gives {a == e}, is gives {a is e}")
```

**What to notice:** There is no single right answer here — that is the lesson.

---

### Q23. Precedence Puzzle

```python
print(2 + 3 * 4 ** 2)          # ** first, then *, then +   -> 50
print((2 + 3) * 4 ** 2)        # brackets force 5 * 16      -> 80
print(10 - 4 - 3)              # left to right              -> 3
print(2 ** 3 ** 2)             # ** goes RIGHT to left      -> 512
print(not True and False)      # not binds tighter than and -> False
print(True or False and False) # and binds tighter than or  -> True
```

**What to notice:** `**` binds tightest and goes right-to-left; `and` binds tighter than `or`.

**Sample case** — input *(no input)*:

```
50
80
3
512
False
True
```

---

### Q24. Compound Interest

```python
principal = float(input("Principal: "))
rate = float(input("Rate: "))
years = int(input("Years: "))

amount = principal * (1 + rate / 100) ** years
interest = amount - principal

print(f"Amount: {amount:.2f}")
print(f"Interest earned: {interest:.2f}")
```

**What to notice:** Compound interest earns interest on the interest, so it beats simple interest.

**Sample case** — input `100000`, `8`, `5`:

```
Amount: 146932.81
Interest earned: 46932.81
```

Also tested on 2 hidden cases: `1000 5 1`, `50000 0 10`

---

## Tier 3 — Conditionals (Q25–Q36)

### Q25. Positive, Negative or Zero

```python
number = float(input("Enter a number: "))

if number > 0:
    print("Positive")
elif number < 0:
    print("Negative")
else:
    print("Zero")
```

**What to notice:** Three outcomes need `if`/`elif`/`else`. Let `else` catch zero.

**Sample case** — input `-14`:

```
Negative
```

Also tested on 3 hidden cases: `0`, `7`, `-0.5`

---

### Q26. Largest of Three

```python
a = int(input("a: "))
b = int(input("b: "))
c = int(input("c: "))

if a >= b and a >= c:
    print(f"Largest: {a}")
elif b >= a and b >= c:
    print(f"Largest: {b}")
else:
    print(f"Largest: {c}")
```

**What to notice:** If the first two checks fail, `c` must be the largest — no condition needed.

**Sample case** — input `34`, `71`, `28`:

```
Largest: 71
```

Also tested on 3 hidden cases: `5 5 5`, `9 2 3`, `1 2 8`

---

### Q27. Grade Calculator

```python
marks = int(input("Enter marks: "))

# Check the range FIRST, before working out any grade.
if marks < 0 or marks > 100:
    print("Invalid marks")
elif marks >= 90:
    print("Grade: A+")
elif marks >= 80:
    # Reaching here already proves marks < 90, so one test is enough.
    print("Grade: A")
elif marks >= 70:
    print("Grade: B")
elif marks >= 60:
    print("Grade: C")
elif marks >= 40:
    print("Grade: D")
else:
    print("Grade: Fail")
```

**What to notice:** Validate the range **first**. Each `elif` then needs only one comparison.

**Sample case** — input `84`:

```
Grade: A
```

Also tested on 6 hidden cases: `90`, `39`, `100`, `-5`, `101`, `40`

---

### Q28. Leap Year

```python
year = int(input("Enter year: "))

if year % 4 == 0 and (year % 100 != 0 or year % 400 == 0):
    print(f"{year} is a leap year")
else:
    print(f"{year} is not a leap year")
```

**What to notice:** Divisible by 4, and either not a century year or divisible by 400.

**Sample case** — input `1900`:

```
1900 is not a leap year
```

Also tested on 4 hidden cases: `2000`, `2024`, `2023`, `1600`

---

### Q29. Triangle Validity

```python
a = float(input("Side 1: "))
b = float(input("Side 2: "))
c = float(input("Side 3: "))

if a + b > c and a + c > b and b + c > a:
    if a == b and b == c:
        print("Valid triangle: Equilateral")
    elif a == b or b == c or a == c:
        print("Valid triangle: Isosceles")
    else:
        print("Valid triangle: Scalene")
else:
    print("Not a valid triangle")
```

**What to notice:** Check the triangle is possible before deciding what kind it is.

**Sample case** — input `5`, `5`, `8`:

```
Valid triangle: Isosceles
```

Also tested on 3 hidden cases: `3 4 5`, `6 6 6`, `1 2 10`

---

### Q30. Electricity Bill

```python
units = int(input("Enter units: "))

bill = 0

# Work from the top slab down, taking each band off as we go.
if units > 300:
    bill = bill + (units - 300) * 12
    units = 300
if units > 200:
    bill = bill + (units - 200) * 8
    units = 200
if units > 100:
    bill = bill + (units - 100) * 5
    units = 100
bill = bill + units * 3

print(f"Bill: \u20b9{bill}")
```

**What to notice:** Only the units inside each band are charged at that band's rate.

**Sample case** — input `250`:

```
Bill: ₹1200
```

Also tested on 4 hidden cases: `50`, `100`, `500`, `0`

---

### Q31. Income Tax Slabs

```python
income = float(input("Enter annual income: "))

tax = 0.0

# Same idea as the electricity bill: only the income inside each
# band is taxed at that band's rate.
if income > 1000000:
    tax = tax + (income - 1000000) * 0.30
    income = 1000000
if income > 500000:
    tax = tax + (income - 500000) * 0.20
    income = 500000
if income > 250000:
    tax = tax + (income - 250000) * 0.05

print(f"Tax payable: \u20b9{tax:.2f}")
```

**What to notice:** Same cumulative idea as the electricity bill — nobody pays 30% on their whole income.

**Sample case** — input `1200000`:

```
Tax payable: ₹172500.00
```

Also tested on 4 hidden cases: `250000`, `500000`, `0`, `10000000`

---

### Q32. Character Classifier

```python
character = input("Enter a character: ")

# Letters and digits each sit in one continuous block of character codes,
# so a range test works.
if "A" <= character <= "Z":
    print("Uppercase letter")
elif "a" <= character <= "z":
    print("Lowercase letter")
elif "0" <= character <= "9":
    print("Digit")
else:
    print("Special character")
```

**What to notice:** Characters compare by their codes, and each block of letters is contiguous.

**Sample case** — input `7`:

```
Digit
```

Also tested on 3 hidden cases: `A`, `z`, `@`

---

### Q33. Calculator with Validation

```python
a = float(input("First number: "))
operator = input("Operator: ")
b = float(input("Second number: "))

if operator == "+":
    print(f"Result: {a + b}")
elif operator == "-":
    print(f"Result: {a - b}")
elif operator == "*":
    print(f"Result: {a * b}")
elif operator == "/":
    # Check for zero BEFORE dividing, not after.
    if b == 0:
        print("Error: cannot divide by zero")
    else:
        print(f"Result: {a / b}")
elif operator == "%":
    if b == 0:
        print("Error: cannot divide by zero")
    else:
        print(f"Result: {a % b}")
else:
    print("Error: unrecognised operator")
```

**What to notice:** Test for a zero divisor **before** dividing, not after.

**Sample case** — input `10`, `/`, `0`:

```
Error: cannot divide by zero
```

Also tested on 3 hidden cases: `10 + 5`, `9 * 3`, `7 ^ 2`

---

### Q34. BMI Category

```python
weight = float(input("Weight (kg): "))
height = float(input("Height (m): "))

bmi = weight / (height ** 2)

print(f"BMI: {bmi:.1f}")

if bmi < 18.5:
    print("Category: Underweight")
elif bmi < 25:
    print("Category: Normal")
elif bmi < 30:
    print("Category: Overweight")
else:
    print("Category: Obese")
```

**What to notice:** Square the height. Doubling it gives a wrong answer that still looks plausible.

**Sample case** — input `68`, `1.75`:

```
BMI: 22.2
Category: Normal
```

Also tested on 3 hidden cases: `50 1.8`, `95 1.7`, `85 1.7`

---

### Q35. Ticket Pricing

```python
age = int(input("Age: "))
student = input("Student? (yes/no): ")
tuesday = input("Tuesday? (yes/no): ")

price = 250.0

# Apply the rules in the order the question gives them.
if age < 12 or age > 60:
    price = price * 0.5

if student == "yes":
    price = price - 30

if tuesday == "yes":
    price = price * 0.8

print(f"Final price: \u20b9{price:.2f}")
```

**What to notice:** Keep one `price` variable and change it step by step, in the stated order.

**Sample case** — input `65`, `no`, `yes`:

```
Final price: ₹100.00
```

Also tested on 3 hidden cases: `30 no no`, `10 yes yes`, `25 yes no`

---

### Q36. Nested Conditions — Loan Eligibility

```python
age = int(input("Age: "))
income = float(input("Monthly income: "))
score = int(input("Credit score: "))

# Check each rule in turn and stop at the first failure, so we can
# name the actual reason.
if age < 21 or age > 60:
    print("Rejected: age outside 21-60")
elif income < 25000:
    print("Rejected: income below 25000")
elif score < 700:
    print("Rejected: credit score below 700")
else:
    print("Approved")
```

**What to notice:** Checking in order and stopping at the first failure is what lets you name the reason.

**Sample case** — input `30`, `22000`, `750`:

```
Rejected: income below 25000
```

Also tested on 3 hidden cases: `18 50000 800`, `35 60000 650`, `40 30000 720`

---

## Tier 4 — Loops (Q37–Q50)

### Q37. Count to N

```python
n = int(input("Enter n: "))

line = ""
for i in range(1, n + 1):
    if line == "":
        line = str(i)
    else:
        line = line + " " + str(i)

print(line)
```

**What to notice:** Build the line as a string so there is no trailing space at the end.

**Sample case** — input `10`:

```
1 2 3 4 5 6 7 8 9 10
```

Also tested on 3 hidden cases: `1`, `5`, `20`

---

### Q38. Sum and Average

```python
count = int(input("How many numbers? "))

total = 0
for i in range(1, count + 1):
    number = float(input(f"Number {i}: "))
    total = total + number

average = total / count

print(f"Sum: {total:.0f}")
print(f"Average: {average:.2f}")
```

**What to notice:** A running total inside the loop — you cannot store the numbers yet.

**Sample case** — input `4`, `10`, `25`, `8`, `17`:

```
Sum: 60
Average: 15.00
```

Also tested on 2 hidden cases: `1 5`, `3 -1 0 1`

---

### Q39. Multiplication Table

```python
n = int(input("Enter a number: "))

for i in range(1, 11):
    # :2 pads to a width of 2 so the columns line up.
    print(f"{n} x {i:2} = {n * i:2}")
```

**What to notice:** `{i:2}` pads to two characters so the columns line up.

**Sample case** — input `7`:

```
7 x  1 =  7
7 x  2 = 14
7 x  3 = 21
7 x  4 = 28
7 x  5 = 35
7 x  6 = 42
7 x  7 = 49
7 x  8 = 56
7 x  9 = 63
7 x 10 = 70
```

Also tested on 2 hidden cases: `1`, `12`

---

### Q40. Factorial

```python
n = int(input("Enter a number: "))

if n < 0:
    print("Invalid: negative")
else:
    result = 1                 # start at 1, NOT 0
    for i in range(2, n + 1):
        result = result * i
    print(f"{n}! = {result}")
```

**What to notice:** Start the accumulator at **1**. Starting at 0 makes every answer 0.

**Sample case** — input `6`:

```
6! = 720
```

Also tested on 4 hidden cases: `0`, `1`, `10`, `-3`

---

### Q41. Fibonacci Series

```python
n = int(input("Enter n: "))

current = 0
next_one = 1
line = ""

for i in range(n):
    if line == "":
        line = str(current)
    else:
        line = line + " " + str(current)
    # Move both forward together.
    current, next_one = next_one, current + next_one

print(line)
```

**What to notice:** Track two numbers and move them forward together.

**Sample case** — input `10`:

```
0 1 1 2 3 5 8 13 21 34
```

Also tested on 3 hidden cases: `1`, `2`, `15`

---

### Q42. Prime Check

```python
n = int(input("Enter a number: "))

if n < 2:
    print(f"{n} is not prime")
else:
    is_prime = True
    i = 2
    # Only test up to the square root: a factor pair always has
    # one member at or below it.
    while i * i <= n:
        if n % i == 0:
            is_prime = False
            break
        i = i + 1

    if is_prime:
        print(f"{n} is prime")
    else:
        print(f"{n} is not prime")
```

**What to notice:** Stop at the square root: a factor pair always has one member at or below it.

**Sample case** — input `97`:

```
97 is prime
```

Also tested on 4 hidden cases: `2`, `1`, `4`, `9973`

---

### Q43. Primes in a Range

```python
start = int(input("Start: "))
end = int(input("End: "))

line = ""
count = 0

for n in range(start, end + 1):
    if n < 2:
        continue

    is_prime = True
    i = 2
    while i * i <= n:
        if n % i == 0:
            is_prime = False
            break
        i = i + 1

    if is_prime:
        if line == "":
            line = str(n)
        else:
            line = line + " " + str(n)
        count = count + 1

print(line)
print(f"Count: {count}")
```

**What to notice:** Q42's test wrapped in an outer loop. `continue` skips 0 and 1 cleanly.

**Sample case** — input `10`, `50`:

```
11 13 17 19 23 29 31 37 41 43 47
Count: 11
```

Also tested on 3 hidden cases: `1 10`, `90 100`, `2 2`

---

### Q44. Digit Operations

```python
n = int(input("Enter a number: "))

digits = 0
total = 0
reversed_number = 0

remaining = n
while remaining > 0:
    digit = remaining % 10              # take the last digit
    digits = digits + 1
    total = total + digit
    reversed_number = reversed_number * 10 + digit
    remaining = remaining // 10         # shrink the number

print(f"Digits: {digits}")
print(f"Sum: {total}")
print(f"Reversed: {reversed_number}")
```

**What to notice:** One loop does all three jobs: count, sum, and rebuild the number backwards.

**Sample case** — input `94721`:

```
Digits: 5
Sum: 23
Reversed: 12749
```

Also tested on 3 hidden cases: `5`, `1000`, `999999`

---

### Q45. Armstrong Number

```python
n = int(input("Enter a number: "))

# First pass: count the digits.
digits = 0
remaining = n
while remaining > 0:
    digits = digits + 1
    remaining = remaining // 10

# Second pass: raise each digit to that power and add them up.
total = 0
remaining = n
while remaining > 0:
    digit = remaining % 10
    total = total + digit ** digits
    remaining = remaining // 10

if total == n:
    print(f"{n} is an Armstrong number")
else:
    print(f"{n} is not an Armstrong number")
```

**What to notice:** The exponent is the **digit count**, so it needs its own first pass.

**Sample case** — input `9474`:

```
9474 is an Armstrong number
```

Also tested on 4 hidden cases: `153`, `370`, `9475`, `5`

---

### Q46. GCD and LCM

```python
first = int(input("First: "))
second = int(input("Second: "))

# Euclid's method: replace (a, b) with (b, a % b) until b is 0.
a = first
b = second
while b != 0:
    remainder = a % b
    a = b
    b = remainder

gcd = a
lcm = first * second // gcd

print(f"GCD: {gcd}")
print(f"LCM: {lcm}")
```

**What to notice:** Euclid's method: replace `(a, b)` with `(b, a % b)` until `b` is 0.

**Sample case** — input `48`, `60`:

```
GCD: 12
LCM: 240
```

Also tested on 3 hidden cases: `7 13`, `12 12`, `100 75`

---

### Q47. Number Guessing Game

```python
secret = 42
attempts = 0

while True:
    guess = int(input("Guess: "))
    attempts = attempts + 1

    if guess > secret:
        print("Too high")
    elif guess < secret:
        print("Too low")
    else:
        print(f"Correct! You took {attempts} attempts.")
        break
```

**What to notice:** `while True` with `break` on the correct guess. Count every attempt, including the last.

**Sample case** — input `50`, `25`, `42`:

```
Too high
Too low
Correct! You took 3 attempts.
```

Also tested on 2 hidden cases: `42`, `1 99 50 40 42`

---

### Q48. Menu-Driven Program

```python
while True:
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Exit")
    choice = input("Choice: ")

    if choice == "4":
        print("Goodbye!")
        break

    if choice != "1" and choice != "2" and choice != "3":
        print("Invalid choice")
        continue

    a = float(input("First number: "))
    b = float(input("Second number: "))

    if choice == "1":
        print(f"Result: {a + b:.0f}")
    elif choice == "2":
        print(f"Result: {a - b:.0f}")
    else:
        print(f"Result: {a * b:.0f}")
```

**What to notice:** Print the menu **inside** the loop so it reappears after each operation.

**Sample case** — input `1`, `10`, `5`, `4`:

```
1. Add
2. Subtract
3. Multiply
4. Exit
Result: 15
1. Add
2. Subtract
3. Multiply
4. Exit
Goodbye!
```

Also tested on 3 hidden cases: `4`, `9 4`, `3 6 7 2 10 4 4`

---

### Q49. Collatz Sequence

```python
n = int(input("Enter n: "))

line = str(n)
steps = 0

while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    line = line + " " + str(n)
    steps = steps + 1

print(line)
print(f"Steps: {steps}")
```

**What to notice:** 9 numbers means 8 steps — count the arrows, not the values.

**Sample case** — input `6`:

```
6 3 10 5 16 8 4 2 1
Steps: 8
```

Also tested on 3 hidden cases: `1`, `27`, `16`

---

### Q50. Perfect Numbers

```python
line = ""

for n in range(2, 10000):
    # Add up the divisors below n.
    total = 0
    for i in range(1, n // 2 + 1):
        if n % i == 0:
            total = total + i

    if total == n:
        if line == "":
            line = str(n)
        else:
            line = line + " " + str(n)

print(line)
```

**What to notice:** A divisor cannot be larger than half the number, so the inner loop can stop at `n // 2`.

**Sample case** — input *(no input)*:

```
6 28 496 8128
```

---

## Tier 5 — Pattern Printing (Q51–Q56)

### Q51. Right Triangle of Stars

```python
n = int(input("n = "))

for i in range(1, n + 1):
    print("*" * i)
```

**What to notice:** `"*" * i` repeats the star, so no inner loop is needed.

**Sample case** — input `5`:

```
*
**
***
****
*****
```

Also tested on 2 hidden cases: `1`, `3`

---

### Q52. Inverted Right Triangle

```python
n = int(input("n = "))

# Count downwards instead of up.
for i in range(n, 0, -1):
    print("*" * i)
```

**What to notice:** Count down instead of up and the body stays identical to Q51.

**Sample case** — input `5`:

```
*****
****
***
**
*
```

Also tested on 2 hidden cases: `1`, `3`

---

### Q53. Centred Pyramid

```python
n = int(input("n = "))

for i in range(1, n + 1):
    spaces = n - i
    stars = 2 * i - 1
    print(" " * spaces + "*" * stars)
```

**What to notice:** Row `i` needs `n - i` spaces and `2i - 1` stars — always an odd number.

**Sample case** — input `5`:

```
    *
   ***
  *****
 *******
*********
```

Also tested on 2 hidden cases: `1`, `4`

---

### Q54. Number Triangle

```python
n = int(input("n = "))

for i in range(1, n + 1):
    line = ""
    for j in range(1, i + 1):
        if line == "":
            line = str(j)
        else:
            line = line + " " + str(j)
    print(line)
```

**What to notice:** The inner loop's endpoint depends on the outer loop's variable.

**Sample case** — input `5`:

```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

Also tested on 2 hidden cases: `1`, `3`

---

### Q55. Floyd's Triangle

```python
n = int(input("n = "))

counter = 1                      # declared OUTSIDE, so it keeps rising

for i in range(1, n + 1):
    line = ""
    for j in range(i):
        if line == "":
            line = str(counter)
        else:
            line = line + " " + str(counter)
        counter = counter + 1
    print(line)
```

**What to notice:** The counter is declared **outside** both loops so it keeps rising across rows.

**Sample case** — input `4`:

```
1
2 3
4 5 6
7 8 9 10
```

Also tested on 2 hidden cases: `1`, `6`

---

### Q56. Pascal's Triangle

```python
n = int(input("n = "))

for row in range(n):
    line = ""
    value = 1
    for col in range(row + 1):
        if line == "":
            line = str(value)
        else:
            line = line + " " + str(value)
        # Each entry comes from the one before it.
        value = value * (row - col) // (col + 1)
    print(" " * (n - row - 1) + line)
```

**What to notice:** Each entry is computed from the one to its left, so no previous row needs storing.

**Sample case** — input `5`:

```
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
```

Also tested on 2 hidden cases: `1`, `7`

---

## Tier 6 — Combining Everything (Q57–Q60)

### Q57. ATM Simulator

```python
balance = 10000
pin_attempts = 0
transactions = 0
unlocked = False

while pin_attempts < 3:
    pin = input("Enter PIN: ")
    pin_attempts = pin_attempts + 1
    if pin == "1234":
        unlocked = True
        break
    print("Wrong PIN")

if not unlocked:
    print("Card locked")
else:
    while True:
        print("1. Balance  2. Deposit  3. Withdraw  4. Exit")
        choice = input("Choice: ")

        if choice == "1":
            print(f"Balance: \u20b9{balance}")

        elif choice == "2":
            amount = int(input("Amount: "))
            if amount <= 0:
                print("Deposit must be positive")
            else:
                balance = balance + amount
                transactions = transactions + 1
                print(f"Deposited \u20b9{amount}. Balance: \u20b9{balance}")

        elif choice == "3":
            amount = int(input("Amount: "))
            if amount <= 0:
                print("Withdrawal must be positive")
            elif amount % 100 != 0:
                print("Amount must be a multiple of 100")
            elif amount > balance:
                print("Insufficient funds")
            else:
                balance = balance - amount
                transactions = transactions + 1
                print(f"Withdrawn \u20b9{amount}. Balance: \u20b9{balance}")

        elif choice == "4":
            print(f"Transactions: {transactions}")
            break

        else:
            print("Invalid choice")
```

**What to notice:** Four separate things to track: PIN attempts, balance, transaction count, and the menu loop.

**Sample case** — input `1234`, `3`, `2500`, `4`:

```
1. Balance  2. Deposit  3. Withdraw  4. Exit
Withdrawn ₹2500. Balance: ₹7500
1. Balance  2. Deposit  3. Withdraw  4. Exit
Transactions: 1
```

Also tested on 3 hidden cases: `0000 1111 2222`, `1234 1 4`, `1234 3 250 3 99999 2 500 4`

---

### Q58. Student Report Card

```python
name = input("Student name: ")

total = 0
highest = -1                     # start below any possible mark
lowest = 101                     # start above any possible mark
passed = True

for i in range(1, 6):
    # Keep asking until this subject's mark is valid.
    while True:
        mark = int(input(f"Subject {i} marks: "))
        if mark >= 0 and mark <= 100:
            break
        print("Invalid. Enter marks between 0 and 100.")

    total = total + mark
    if mark > highest:
        highest = mark
    if mark < lowest:
        lowest = mark
    if mark < 40:
        passed = False

percentage = total / 500 * 100

print(f"Total: {total} / 500")
print(f"Percentage: {percentage:.2f}")

if percentage >= 90:
    grade = "A+"
elif percentage >= 80:
    grade = "A"
elif percentage >= 70:
    grade = "B"
elif percentage >= 60:
    grade = "C"
elif percentage >= 40:
    grade = "D"
else:
    grade = "Fail"

print(f"Grade: {grade}")

if passed:
    print("Result: PASS")
else:
    print("Result: FAIL")

print(f"Highest: {highest}  Lowest: {lowest}")
```

**What to notice:** An inner `while` re-asks for the same subject until the mark is valid.

**Sample case** — input `Rohan`, `78`, `105`, `85`, `92`, `71`, `75`:

```
Invalid. Enter marks between 0 and 100.
Total: 401 / 500
Percentage: 80.20
Grade: A
Result: PASS
Highest: 92  Lowest: 71
```

Also tested on 2 hidden cases: `Priya 100 100 100 100 100`, `Amit 35 40 50 60 70`

---

### Q59. Number Analysis Report

```python
count = int(input("How many numbers? "))

positives = 0
negatives = 0
zeros = 0
evens = 0
odds = 0
total = 0
largest = 0
smallest = 0
largest_prime = 0
found_prime = False

for i in range(1, count + 1):
    number = int(input(f"Number {i}: "))
    total = total + number

    if number > 0:
        positives = positives + 1
    elif number < 0:
        negatives = negatives + 1
    else:
        zeros = zeros + 1

    if number % 2 == 0:
        evens = evens + 1
    else:
        odds = odds + 1

    # On the first number, seed both max and min from it.
    if i == 1:
        largest = number
        smallest = number
    else:
        if number > largest:
            largest = number
        if number < smallest:
            smallest = number

    # Is this one prime?
    if number >= 2:
        is_prime = True
        j = 2
        while j * j <= number:
            if number % j == 0:
                is_prime = False
                break
            j = j + 1
        if is_prime:
            if not found_prime or number > largest_prime:
                largest_prime = number
                found_prime = True

average = total / count

print(f"Positives: {positives}  Negatives: {negatives}  Zeros: {zeros}")
print(f"Even: {evens}  Odd: {odds}")
print(f"Sum: {total}  Average: {average:.2f}")
print(f"Max: {largest}  Min: {smallest}")

if found_prime:
    print(f"Largest prime: {largest_prime}")
else:
    print("Largest prime: None")
```

**What to notice:** Seed max and min from the **first** number, not from 0 — negatives would break that.

**Sample case** — input `6`, `17`, `-4`, `0`, `23`, `8`, `-11`:

```
Positives: 3  Negatives: 2  Zeros: 1
Even: 3  Odd: 3
Sum: 33  Average: 5.50
Max: 23  Min: -11
Largest prime: 23
```

Also tested on 2 hidden cases: `3 4 6 8`, `1 7`

---

### Q60. Multiplication Table Grid

```python
n = int(input("Enter n: "))

print()

# Header row.
header = "     |"
for j in range(1, n + 1):
    header = header + f"{j:5}"
print(header)

# Separator line.
print("-----+" + "-" * (5 * n))

# One line per row.
for i in range(1, n + 1):
    line = f"{i:4} |"
    for j in range(1, n + 1):
        line = line + f"{i * j:5}"
    print(line)
```

**What to notice:** `{value:5}` right-aligns every cell in five characters, so the grid stays square.

**Sample case** — input `5`:

```

     |    1    2    3    4    5
-----+-------------------------
   1 |    1    2    3    4    5
   2 |    2    4    6    8   10
   3 |    3    6    9   12   15
   4 |    4    8   12   16   20
   5 |    5   10   15   20   25
```

Also tested on 2 hidden cases: `1`, `3`

---

[← Questions](questions.md) · [Test runner](tests/README.md) · [Phase 1 index](README.md)
