# Topic Deep-Dive 1 — Conditions (30 Questions)

**Focus:** Advanced `if / elif / else` logic, compound conditions, edge cases, real-world decision rules.

**How to practice:** Read the task, think, write your own code. Use the hint if stuck. Only then check the solution.

---

## Question 1: Largest of four numbers

**What to do:** Given `a, b, c, d = 10, 25, 5, 30`, print the largest using only comparisons.

**Hint:** Maintain a "current best" variable and compare each number against it.

**Solution:**

```python
a, b, c, d = 10, 25, 5, 30

largest = a
if b > largest:
    largest = b
if c > largest:
    largest = c
if d > largest:
    largest = d

print(largest)
```

**Logic:** The "current best" pattern scales to any number of values.

---

## Question 2: Smallest of four numbers

**What to do:** With the same four numbers, print the smallest using only comparisons.

**Hint:** Same pattern with `<`.

**Solution:**

```python
a, b, c, d = 10, 25, 5, 30

smallest = a
if b < smallest:
    smallest = b
if c < smallest:
    smallest = c
if d < smallest:
    smallest = d

print(smallest)
```

**Logic:** Flipping the operator flips the problem.

---

## Question 3: Sort three numbers without sort()

**What to do:** Given `a, b, c = 15, 9, 20`, print them in ascending order using only `if` and swapping.

**Hint:** Swap values when they're out of order. After `if a > b: a, b = b, a`, the smallest of a and b is in `a`.

**Solution:**

```python
a, b, c = 15, 9, 20

if a > b:
    a, b = b, a
if b > c:
    b, c = c, b
if a > b:
    a, b = b, a

print(a, b, c)
```

**Logic:** Two passes of "bubble" comparisons push the largest to the end.

---

## Question 4: Triangle validity

**What to do:** Given three side lengths `a, b, c = 3, 4, 8`, print "Valid triangle" or "Invalid triangle".

**Hint:** A triangle is valid only if `a + b > c` AND `b + c > a` AND `c + a > b`.

**Solution:**

```python
a, b, c = 3, 4, 8

if a + b > c and b + c > a and c + a > b:
    print("Valid triangle")
else:
    print("Invalid triangle")
```

**Logic:** Three `and`-joined checks — all must pass.

---

## Question 5: Classify a triangle

**What to do:** Given sides `7, 7, 7`, print "Equilateral", "Isosceles", "Scalene", or "Invalid triangle".

**Hint:** Check validity first, then count how many sides are equal.

**Solution:**

```python
a, b, c = 7, 7, 7

if a + b > c and b + c > a and c + a > b:
    if a == b == c:
        print("Equilateral")
    elif a == b or b == c or c == a:
        print("Isosceles")
    else:
        print("Scalene")
else:
    print("Invalid triangle")
```

**Logic:** Nested conditions — the outer check must pass before the inner classification runs.

---

## Question 6: Second largest of four numbers

**What to do:** Given `a, b, c, d = 12, 45, 9, 33`, print the second largest using comparisons only.

**Hint:** Keep TWO variables: `largest` and `second`. Update both when a new champion arrives.

**Solution:**

```python
a, b, c, d = 12, 45, 9, 33

largest = float("-inf")
second = float("-inf")

for number in (a, b, c, d):
    if number > largest:
        second = largest
        largest = number
    elif number > second and number != largest:
        second = number

print(second)
```

**Logic:** The old largest becomes the second when a bigger one appears.

---

## Question 7: Character classifier

**What to do:** Given `ch = "7"`, print whether it is a vowel, consonant, digit, or special character.

**Hint:** Order matters: check `isalpha()` first, then vowels, then `isdigit()`.

**Solution:**

```python
ch = "7"

if ch.isalpha():
    if ch.lower() in "aeiou":
        print("Vowel")
    else:
        print("Consonant")
elif ch.isdigit():
    print("Digit")
else:
    print("Special character")
```

**Logic:** Layered checks — each category excludes the previous ones.

---

## Question 8: Electricity bill calculator

**What to do:** Given `units = 250`, compute the bill with slabs: first 100 units at ₹5 each, next 100 at ₹7, the rest at ₹10. Print the bill.

**Hint:** Handle each slab in its own branch; calculate the previous slabs' full cost inside later branches.

**Solution:**

```python
units = 250

if units <= 100:
    bill = units * 5
elif units <= 200:
    bill = 100 * 5 + (units - 100) * 7
else:
    bill = 100 * 5 + 100 * 7 + (units - 200) * 10

print("Bill: Rs.", bill)
```

**Logic:** Slab-based pricing — each branch adds the cost of everything before it. (Answer: 1700)

---

## Question 9: Income tax calculator

**What to do:** Given `income = 800000`, compute simplified tax: 0 up to ₹2.5L, 5% for 2.5L–5L, 10% for 5L–10L, 20% above 10L. Print the tax.

**Hint:** Work top-down or bottom-up; include the fixed tax of lower slabs inside higher branches.

**Solution:**

```python
income = 800000

if income <= 250000:
    tax = 0
elif income <= 500000:
    tax = (income - 250000) * 0.05
elif income <= 1000000:
    tax = 12500 + (income - 500000) * 0.10
else:
    tax = 62500 + (income - 1000000) * 0.20

print("Tax:", tax)
```

**Logic:** 12500 = 5% of 2.5L (the full lower slab); 62500 = that plus 10% of 5L. (Answer: 42500.0)

---

## Question 10: Age group classifier

**What to do:** Given `age = 25`, print the group: "Child" (<13), "Teenager" (13–19), "Adult" (20–59), or "Senior" (60+).

**Hint:** Chain `if/elif` with boundary conditions; use `age < 13` then `age < 20` then `age < 60`.

**Solution:**

```python
age = 25

if age < 13:
    print("Child")
elif age < 20:
    print("Teenager")
elif age < 60:
    print("Adult")
else:
    print("Senior")
```

**Logic:** Because each `elif` only runs if earlier checks failed, the boundaries write themselves.

---

## Question 11: Century checker

**What to do:** Given `year = 1900`, print "Century year" or "Not a century year".

**Hint:** A century year is divisible by 100 — check `year % 100 == 0`.

**Solution:**

```python
year = 1900

if year % 100 == 0:
    print("Century year")
else:
    print("Not a century year")
```

**Logic:** One modulo test decides it.

---

## Question 12: Zodiac sign

**What to do:** Given `month = 8, day = 14`, print the zodiac sign (use month/day ranges, e.g. Leo = Jul 23 – Aug 22).

**Hint:** Write conditions as `(month == 7 and day >= 23) or (month == 8 and day <= 22)`.

**Solution:**

```python
month, day = 8, 14

if (month == 3 and day >= 21) or (month == 4 and day <= 19):
    sign = "Aries"
elif (month == 4 and day >= 20) or (month == 5 and day <= 20):
    sign = "Taurus"
elif (month == 5 and day >= 21) or (month == 6 and day <= 20):
    sign = "Gemini"
elif (month == 6 and day >= 21) or (month == 7 and day <= 22):
    sign = "Cancer"
elif (month == 7 and day >= 23) or (month == 8 and day <= 22):
    sign = "Leo"
elif (month == 8 and day >= 23) or (month == 9 and day <= 22):
    sign = "Virgo"
elif (month == 9 and day >= 23) or (month == 10 and day <= 22):
    sign = "Libra"
elif (month == 10 and day >= 23) or (month == 11 and day <= 21):
    sign = "Scorpio"
elif (month == 11 and day >= 22) or (month == 12 and day <= 21):
    sign = "Sagittarius"
elif (month == 12 and day >= 22) or (month == 1 and day <= 19):
    sign = "Capricorn"
elif (month == 1 and day >= 20) or (month == 2 and day <= 18):
    sign = "Aquarius"
else:
    sign = "Pisces"

print(sign)
```

**Logic:** Ranges that cross month boundaries become `or`-joined pairs. (Answer: Leo)

---

## Question 13: Days in a month (leap-aware)

**What to do:** Given `month = 2, year = 2024`, print the number of days in that month.

**Hint:** List the 31-day months; February depends on leap-year logic.

**Solution:**

```python
month, year = 2, 2024

if month in (1, 3, 5, 7, 8, 10, 12):
    days = 31
elif month in (4, 6, 9, 11):
    days = 30
elif month == 2:
    if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
        days = 29
    else:
        days = 28
else:
    days = "Invalid month"

print(days)
```

**Logic:** `in` tuples compress many equality checks into one condition.

---

## Question 14: Time-of-day greeting

**What to do:** Given `hour = 17`, print "Good morning" (<12), "Good afternoon" (12–16), "Good evening" (17–21), or "Good night" (22+).

**Hint:** A simple hour chain like Question 10.

**Solution:**

```python
hour = 17

if hour < 12:
    print("Good morning")
elif hour < 17:
    print("Good afternoon")
elif hour < 22:
    print("Good evening")
else:
    print("Good night")
```

**Logic:** Same pattern, real-world use — this exact chain powers chat apps.

---

## Question 15: Rock-paper-scissors (single round)

**What to do:** Given `player = "rock", computer = "scissors"`, print who wins without any loops.

**Hint:** Handle tie first, then the three ways the player wins, `else` the computer wins.

**Solution:**

```python
player, computer = "rock", "scissors"

if player == computer:
    print("Tie")
elif (player == "rock" and computer == "scissors") or \
     (player == "paper" and computer == "rock") or \
     (player == "scissors" and computer == "paper"):
    print("Player wins")
else:
    print("Computer wins")
```

**Logic:** Encode only the player's winning cases; everything else loses.

---

## Question 16: Right triangle check

**What to do:** Given sides `3, 4, 5`, print "Right triangle" if they satisfy Pythagoras (a² + b² = c²), else "Not a right triangle".

**Hint:** Sort the sides first so the largest becomes the hypotenuse.

**Solution:**

```python
a, b, c = 3, 4, 5

sides = sorted((a, b, c))

if sides[0] ** 2 + sides[1] ** 2 == sides[2] ** 2:
    print("Right triangle")
else:
    print("Not a right triangle")
```

**Logic:** Sorting removes the "which side is the hypotenuse" problem.

---

## Question 17: Absolute value without abs()

**What to do:** Given `number = -12`, print its absolute value without using `abs()`.

**Hint:** If it's negative, flip the sign.

**Solution:**

```python
number = -12

if number < 0:
    result = -number
else:
    result = number

print(result)
```

**Logic:** `-(-12)` is `12` — the simplest conditional in math.

---

## Question 18: Clamp a number to a range

**What to do:** Given `value = 150, low = 0, high = 100`, print the value forced inside [low, high] — without using min() or max().

**Hint:** Two ifs: too small → raise to low; too big → lower to high.

**Solution:**

```python
value, low, high = 150, 0, 100

if value < low:
    value = low
if value > high:
    value = high

print(value)
```

**Logic:** "Clamping" is a standard game/graphics operation. (Answer: 100)

---

## Question 19: Sign of the product of three numbers

**What to do:** Given `a, b, c = -2, 3, -4`, print "Positive", "Negative", or "Zero" for their product — WITHOUT multiplying them.

**Hint:** If any number is 0 → Zero. Otherwise count the negatives: even count → Positive, odd → Negative.

**Solution:**

```python
a, b, c = -2, 3, -4

if a == 0 or b == 0 or c == 0:
    print("Zero")
else:
    negatives = (a < 0) + (b < 0) + (c < 0)
    if negatives % 2 == 0:
        print("Positive")
    else:
        print("Negative")
```

**Logic:** In Python, `True + True` is `2` — booleans are numbers. Even negatives → positive.

---

## Question 20: Quadrant of a point

**What to do:** Given `x, y = -3, 4`, print the quadrant (1–4), "Origin", "X-axis", or "Y-axis".

**Hint:** Handle axes/origin first, then use the signs of x and y.

**Solution:**

```python
x, y = -3, 4

if x == 0 and y == 0:
    print("Origin")
elif y == 0:
    print("X-axis")
elif x == 0:
    print("Y-axis")
elif x > 0 and y > 0:
    print("Quadrant 1")
elif x < 0 and y > 0:
    print("Quadrant 2")
elif x < 0 and y < 0:
    print("Quadrant 3")
else:
    print("Quadrant 4")
```

**Logic:** Special cases first, then sign combinations. (Answer: Quadrant 2)

---

## Question 21: Point inside a circle

**What to do:** Given a point `x, y = 3, 4` and a circle of radius 5 centered at the origin, print "Inside" or "Outside".

**Hint:** The point is inside when `x*x + y*y <= r*r`.

**Solution:**

```python
x, y, r = 3, 4, 5

if x * x + y * y <= r * r:
    print("Inside")
else:
    print("Outside")
```

**Logic:** The distance-squared trick avoids a square root.

---

## Question 22: Valid date check

**What to do:** Given `day, month, year = 31, 4, 2026`, print "Valid date" or "Invalid date" (check month range, day range, and February/leap rules).

**Hint:** Validate month first, then days-per-month with the leap-aware February logic.

**Solution:**

```python
day, month, year = 31, 4, 2026

if month < 1 or month > 12:
    print("Invalid date")
else:
    if month in (1, 3, 5, 7, 8, 10, 12):
        max_day = 31
    elif month in (4, 6, 9, 11):
        max_day = 30
    elif (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
        max_day = 29
    else:
        max_day = 28

    if 1 <= day <= max_day:
        print("Valid date")
    else:
        print("Invalid date")
```

**Logic:** Two-level validation — month validity first, then day bounds.

---

## Question 23: Conditional expression (one-line if)

**What to do:** Given `number = 10`, set `label = "even"` or `label = "odd"` using a one-line conditional expression, then print it.

**Hint:** `value_if_true if condition else value_if_false`.

**Solution:**

```python
number = 10

label = "even" if number % 2 == 0 else "odd"

print(label)
```

**Logic:** The ternary form is an *expression* — it produces a value, unlike an if *statement*.

---

## Question 24: if-elif vs match-case

**What to do:** Given `day = "sat"`, print whether it's a weekday or weekend using `match` (Python 3.10+). Then print the same result using if/elif.

**Hint:** `match day: case "sat" | "sun": ...` — the pipe means "or".

**Solution:**

```python
day = "sat"

match day:
    case "sat" | "sun":
        print("Weekend")
    case "mon" | "tue" | "wed" | "thu" | "fri":
        print("Weekday")
    case _:
        print("Invalid day")

if day in ("sat", "sun"):
    print("Weekend")
elif day in ("mon", "tue", "wed", "thu", "fri"):
    print("Weekday")
else:
    print("Invalid day")
```

**Logic:** `match` is a readable alternative for multi-value comparisons; `_` is the catch-all.

---

## Question 25: Traffic light simulator

**What to do:** Given `color = "yellow"`, print the action: red → "Stop", yellow → "Get ready", green → "Go", anything else → "Invalid color".

**Hint:** Normalize with `.lower()` first, then a simple chain.

**Solution:**

```python
color = "yellow"

color = color.lower()

if color == "red":
    print("Stop")
elif color == "yellow":
    print("Get ready")
elif color == "green":
    print("Go")
else:
    print("Invalid color")
```

**Logic:** `.lower()` makes the check forgiving of user input like "RED".

---

## Question 26: Movie ticket pricing

**What to do:** Given `age = 8, day = "Sat"`, compute the price: under 5 free, 5–12 → 100, 13–59 → 200, 60+ → 150, and weekends (Sat/Sun) add 20%.

**Hint:** Compute the base price with if/elif, then apply the weekend multiplier in a second if.

**Solution:**

```python
age, day = 8, "Sat"

if age < 5:
    price = 0
elif age <= 12:
    price = 100
elif age <= 59:
    price = 200
else:
    price = 150

if day in ("Sat", "Sun") and price > 0:
    price = price * 1.2

print("Ticket price:", price)
```

**Logic:** Two independent rules applied in sequence — age sets the base, day adjusts it.

---

## Question 27: Loan eligibility (nested conditions)

**What to do:** Given `age = 30, income = 40000, credit_score = 720`, print "Approved" if age ≥ 21, income ≥ 25000, AND credit score ≥ 700; "Borderline" if only the credit score is low (650–699); else "Rejected".

**Hint:** Nest the checks: age → income → score, with the borderline case inside.

**Solution:**

```python
age, income, credit_score = 30, 40000, 720

if age < 21:
    print("Rejected: too young")
elif income < 25000:
    print("Rejected: income too low")
elif credit_score >= 700:
    print("Approved")
elif credit_score >= 650:
    print("Borderline: needs review")
else:
    print("Rejected: poor credit")
```

**Logic:** Early rejection branches make each later check simpler — a real-world pattern.

---

## Question 28: Multiple of both 3 and 7

**What to do:** Given `number = 42`, print "Yes" if it's divisible by both 3 and 7, otherwise "No".

**Hint:** `number % 3 == 0 and number % 7 == 0` — or check `% 21`.

**Solution:**

```python
number = 42

if number % 3 == 0 and number % 7 == 0:
    print("Yes")
else:
    print("No")
```

**Logic:** Two modulo checks joined by `and` (equivalently, one check for 21).

---

## Question 29: Palindrome number check

**What to do:** Given `number = 121`, print "Palindrome" if the number reads the same backwards, else "Not palindrome".

**Hint:** Convert to a string and compare with its reverse — no loop needed.

**Solution:**

```python
number = 121

text = str(number)

if text == text[::-1]:
    print("Palindrome")
else:
    print("Not palindrome")
```

**Logic:** String reversal does in one slice what a loop would do in ten lines.

---

## Question 30: The "grade with bonus" decision

**What to do:** Given `marks = 88, attendance = 70`, print the final status: if marks ≥ 90 → "Excellent"; elif marks ≥ 75 AND attendance ≥ 75 → "Good"; elif marks ≥ 75 OR attendance ≥ 75 → "Average"; else → "Poor".

**Hint:** Watch the order — `and` is stricter than `or`, so check the `and` case first.

**Solution:**

```python
marks, attendance = 88, 70

if marks >= 90:
    print("Excellent")
elif marks >= 75 and attendance >= 75:
    print("Good")
elif marks >= 75 or attendance >= 75:
    print("Average")
else:
    print("Poor")
```

**Logic:** Condition ordering changes results — the stricter rule must come first. (Answer: Average)

---

## Conditions recap

- **Current-best chains** (Q1–2, 6) — compare and update, scales to N values.
- **Boundary chains** (Q8–10, 14) — each `elif` inherits the previous failures.
- **Compound conditions** (Q4, 19, 28, 30) — `and`, `or`, `not`, and parentheses.
- **Nested ifs** (Q5, 7, 13, 22, 27) — outer validity before inner classification.
- **Order matters** (Q7, 20, 30) — special cases and strict rules first.
- **Ternary expressions** (Q23) — conditions that produce values.
- **match-case** (Q24) — modern multi-value branching.
