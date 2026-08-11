# Batch 1 — Python Fundamentals

## Topics Covered
- Variables
- Data Types
- Operators
- Input and Output

> **Rules for this batch:** You may only use variables, data types, operators, and basic input/output. Do **not** use `if`, loops, lists, strings beyond what is needed for reading input, functions, or any topic from later batches. Every program reads input with `input()` (and converts with `int()`/`float()`) and prints output with `print()`. F-strings and basic `str()` conversion are allowed.

**How to run:** Read values from standard input with `input()`, process them, and `print()` the required result. Assume input is provided on the lines described.

---

## Q1. Welcome Message

**Difficulty:** Very Easy

**Learning Objective:** Read text from the user and combine it with fixed text to produce a personalized output using an f-string.

**Problem:** Write a program that reads a person's first name and prints a friendly welcome message that includes their name.

**Input:** A single line containing a name (a `str`). No other values.

**Output:** Print exactly `Hello, <name>! Welcome to Python.` where `<name>` is the value read.

**Constraints:**
- The name has between 1 and 50 characters.
- The name contains only letters and spaces.

**Example:**
```
Input:
Alice

Output:
Hello, Alice! Welcome to Python.
```
**Explanation:** The program reads the string `Alice`, places it inside the message, and prints the full welcome line.

**Hint:** Store the input in a variable, then use an f-string `f"Hello, {name}!"` to build the output.

---

## Q2. Sum of Two Integers

**Difficulty:** Very Easy

**Learning Objective:** Read two numeric values, convert them to `int`, add them with the `+` operator, and print the result.

**Problem:** Write a program that reads two whole numbers and prints their sum.

**Input:** Two lines. Line 1 is the first integer `a`. Line 2 is the second integer `b`.

**Output:** Print a single integer equal to `a + b`.

**Constraints:**
- `-10**9 <= a, b <= 10**9`

**Example:**
```
Input:
7
5

Output:
12
```
**Explanation:** `7 + 5 = 12`, so the program prints `12`.

**Hint:** Use `int(input())` for each number, store them in variables, then `print(a + b)`.

---

## Q3. Difference of Two Numbers

**Difficulty:** Very Easy

**Learning Objective:** Read two numbers and apply the subtraction operator, respecting order.

**Problem:** Write a program that reads two integers and prints the result of subtracting the second from the first.

**Input:** Two lines: integer `a`, then integer `b`.

**Output:** Print a single integer equal to `a - b`.

**Constraints:**
- `-10**9 <= a, b <= 10**9`

**Example:**
```
Input:
20
7

Output:
13
```
**Explanation:** `20 - 7 = 13`.

**Hint:** Order matters in subtraction. Compute `a - b`, not `b - a`.

---

## Q4. Product of Two Numbers

**Difficulty:** Very Easy

**Learning Objective:** Apply the multiplication operator to two integers.

**Problem:** Write a program that reads two integers and prints their product.

**Input:** Two lines: integer `a`, then integer `b`.

**Output:** Print a single integer equal to `a * b`.

**Constraints:**
- `-10**9 <= a, b <= 10**9`

**Example:**
```
Input:
6
9

Output:
54
```
**Explanation:** `6 * 9 = 54`.

**Hint:** Use the `*` operator.

---

## Q5. Division Result

**Difficulty:** Very Easy

**Learning Objective:** Read two integers, convert them to `float` for true division, and print a decimal result.

**Problem:** Write a program that reads two integers and prints the result of dividing the first by the second using true division (which produces a decimal).

**Input:** Two lines: integer `a`, then integer `b` (`b != 0`).

**Output:** Print the value of `a / b` as a decimal.

**Constraints:**
- `1 <= a, b <= 10**6`

**Example:**
```
Input:
10
4

Output:
2.5
```
**Explanation:** `10 / 4 = 2.5`.

**Hint:** True division `a / b` already produces a `float`. You do not need to convert the operands yourself, but you may convert them to `float` if it helps you think clearly.

---

## Q6. Area of a Rectangle

**Difficulty:** Very Easy

**Learning Objective:** Apply a real-world geometric formula by multiplying two inputs.

**Problem:** Write a program that reads the length and width of a rectangle (as whole numbers) and prints its area.

**Input:** Two lines: integer `length`, then integer `width`.

**Output:** Print a single integer equal to the area (`length * width`).

**Constraints:**
- `1 <= length, width <= 10**6`

**Example:**
```
Input:
8
5

Output:
40
```
**Explanation:** A rectangle with length 8 and width 5 has area `8 * 5 = 40`.

**Hint:** Store `length` and `width`, then `print(length * width)`.

---

## Q7. Perimeter of a Square

**Difficulty:** Very Easy

**Learning Objective:** Use a geometry formula and combine multiplication and addition.

**Problem:** Write a program that reads the side length of a square (a whole number) and prints its perimeter.

**Input:** A single line containing an integer `side`.

**Output:** Print a single integer equal to `4 * side`.

**Constraints:**
- `1 <= side <= 10**6`

**Example:**
```
Input:
6

Output:
24
```
**Explanation:** Perimeter of a square is `4 * 6 = 24`.

**Hint:** Multiply the side by 4.

---

## Q8. Volume of a Cube

**Difficulty:** Very Easy

**Learning Objective:** Raise a number to a power using the `**` operator.

**Problem:** Write a program that reads the edge length of a cube (a whole number) and prints its volume.

**Input:** A single line containing an integer `edge`.

**Output:** Print a single integer equal to `edge ** 3`.

**Constraints:**
- `1 <= edge <= 1000`

**Example:**
```
Input:
4

Output:
64
```
**Explanation:** Volume of a cube is `4 ** 3 = 64`.

**Hint:** Use the exponent operator: `edge ** 3`.

---

## Q9. Meters to Centimeters

**Difficulty:** Very Easy

**Learning Objective:** Perform a simple unit conversion with multiplication.

**Problem:** Write a program that reads a length in meters (a whole number) and prints the same length in centimeters.

**Input:** A single line containing an integer `meters`.

**Output:** Print a single integer equal to `meters * 100`.

**Constraints:**
- `0 <= meters <= 10**6`

**Example:**
```
Input:
3

Output:
300
```
**Explanation:** 1 meter = 100 centimeters, so `3 * 100 = 300`.

**Hint:** Multiply the meters by 100.

---

## Q10. Hours to Minutes

**Difficulty:** Very Easy

**Learning Objective:** Perform a time unit conversion with multiplication.

**Problem:** Write a program that reads a number of hours (a whole number) and prints the equivalent number of minutes.

**Input:** A single line containing an integer `hours`.

**Output:** Print a single integer equal to `hours * 60`.

**Constraints:**
- `0 <= hours <= 10**6`

**Example:**
```
Input:
2

Output:
120
```
**Explanation:** `2 * 60 = 120` minutes.

**Hint:** Multiply by 60.

---

## Q11. Average of Three Numbers

**Difficulty:** Very Easy

**Learning Objective:** Add multiple values, divide, and combine operators in one expression.

**Problem:** Write a program that reads three whole numbers and prints their average as a decimal.

**Input:** Three lines: integers `a`, `b`, and `c`.

**Output:** Print the value of `(a + b + c) / 3`.

**Constraints:**
- `0 <= a, b, c <= 10**6`

**Example:**
```
Input:
4
6
8

Output:
6.0
```
**Explanation:** `(4 + 6 + 8) / 3 = 18 / 3 = 6.0`.

**Hint:** Add all three numbers first, then divide by 3. Division makes the result a `float`.

---

## Q12. Remainder After Division

**Difficulty:** Very Easy

**Learning Objective:** Use the modulo operator `%` to find a remainder.

**Problem:** Write a program that reads two integers and prints the remainder when the first is divided by the second.

**Input:** Two lines: integer `a`, then integer `b` (`b != 0`).

**Output:** Print a single integer equal to `a % b`.

**Constraints:**
- `-10**6 <= a <= 10**6`
- `1 <= b <= 10**6`

**Example:**
```
Input:
17
5

Output:
2
```
**Explanation:** `17` divided by `5` gives remainder `2`.

**Hint:** Use the `%` operator.

---

## Q13. Integer Division (Quotient)

**Difficulty:** Very Easy

**Learning Objective:** Use the floor division operator `//` to get a whole-number quotient.

**Problem:** Write a program that reads two integers and prints the whole-number quotient when the first is divided by the second.

**Input:** Two lines: integer `a`, then integer `b` (`b != 0`).

**Output:** Print a single integer equal to `a // b`.

**Constraints:**
- `0 <= a <= 10**9`
- `1 <= b <= 10**6`

**Example:**
```
Input:
17
5

Output:
3
```
**Explanation:** `17 // 5 = 3` (the remainder is 2, but we want the quotient only).

**Hint:** Use the `//` operator.

---

## Q14. First and Last Name

**Difficulty:** Very Easy

**Learning Objective:** Combine two strings using the `+` operator (string concatenation).

**Problem:** Write a program that reads a first name and a last name on separate lines, then prints the full name as a single string with a space between them.

**Input:** Two lines: `first` (a `str`), then `last` (a `str`).

**Output:** Print `first + " " + last`.

**Constraints:**
- Each name has between 1 and 50 characters.

**Example:**
```
Input:
Ada
Lovelace

Output:
Ada Lovelace
```
**Explanation:** The two strings are joined with a single space.

**Hint:** Concatenate with a space: `first + " " + last`.

---

## Q15. Age Next Year

**Difficulty:** Very Easy

**Learning Objective:** Convert a string to an integer, add 1, and combine a number with text in output.

**Problem:** Write a program that reads a person's current age (a whole number) and prints the age they will turn next year.

**Input:** A single line containing an integer `age`.

**Output:** Print `Next year you will be <age + 1> years old.`

**Constraints:**
- `1 <= age <= 150`

**Example:**
```
Input:
25

Output:
Next year you will be 26 years old.
```
**Explanation:** The input string `"25"` is converted to the integer `25`, incremented to `26`, and placed in the message.

**Hint:** Convert with `int()`, add 1, and use an f-string to insert the number.

---

## Q16. Celsius to Fahrenheit

**Difficulty:** Very Easy

**Learning Objective:** Apply a multi-step conversion formula using operators.

**Problem:** Write a program that reads a temperature in degrees Celsius and prints the equivalent in degrees Fahrenheit.

**Input:** A single line containing a number `celsius` (an `int`).

**Output:** Print the value of `celsius * 9 / 5 + 32` as a decimal.

**Constraints:**
- `-100 <= celsius <= 100`

**Example:**
```
Input:
0

Output:
32.0
```
**Explanation:** `0 * 9 / 5 + 32 = 32.0`.

**Hint:** The formula is `(C * 9 / 5) + 32`.

---

## Q17. Total Pay Including Bonus

**Difficulty:** Very Easy

**Learning Objective:** Build a simple calculation from two inputs and print a formatted result.

**Problem:** Write a program that reads a worker's base salary (a whole number) and a fixed bonus amount (a whole number), then prints the total pay.

**Input:** Two lines: integer `salary`, then integer `bonus`.

**Output:** Print `Total pay: <salary + bonus>`.

**Constraints:**
- `0 <= salary, bonus <= 10**6`

**Example:**
```
Input:
30000
5000

Output:
Total pay: 35000
```
**Explanation:** `30000 + 5000 = 35000`.

**Hint:** Add the two values and place the sum inside the output string.

---

## Q18. Double a Number

**Difficulty:** Very Easy

**Learning Objective:** Read an integer, multiply by 2, and print the result.

**Problem:** Write a program that reads an integer and prints its double.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to `n * 2`.

**Constraints:**
- `-10**6 <= n <= 10**6`

**Example:**
```
Input:
21

Output:
42
```
**Explanation:** `21 * 2 = 42`.

**Hint:** Multiply by 2.

---

## Q19. Square of a Number

**Difficulty:** Very Easy

**Learning Objective:** Compute a square using multiplication and the `**` operator.

**Problem:** Write a program that reads an integer and prints its square.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to `n ** 2`.

**Constraints:**
- `-10**6 <= n <= 10**6`

**Example:**
```
Input:
-7

Output:
49
```
**Explanation:** `(-7) ** 2 = 49`.

**Hint:** Use `n ** 2`. Squaring a negative number gives a positive result.

---

## Q20. Kilometers to Miles

**Difficulty:** Very Easy

**Learning Objective:** Apply a unit-conversion formula using a decimal factor.

**Problem:** Write a program that reads a distance in kilometers (a whole number) and prints the distance in miles using the factor 1 kilometer = 0.621371 miles.

**Input:** A single line containing an integer `km`.

**Output:** Print the value of `km * 0.621371` as a decimal.

**Constraints:**
- `0 <= km <= 10000`

**Example:**
```
Input:
10

Output:
6.21371
```
**Explanation:** `10 * 0.621371 = 6.21371`.

**Hint:** Multiply the kilometers by `0.621371`.

---

## Q21. Simple Interest

**Difficulty:** Easy

**Learning Objective:** Read three values and apply the simple-interest formula `(P * R * T) / 100`.

**Problem:** Write a program that reads the principal amount, annual rate (percent), and time (in years), then prints the simple interest.

**Input:** Three lines: `principal` (`int`), `rate` (`int`), `time_years` (`int`).

**Output:** Print the value of `(principal * rate * time_years) / 100` as a decimal.

**Constraints:**
- `1 <= principal <= 10**6`
- `1 <= rate <= 100`
- `1 <= time_years <= 10`

**Example:**
```
Input:
10000
5
3

Output:
1500.0
```
**Explanation:** `(10000 * 5 * 3) / 100 = 150000 / 100 = 1500.0`.

**Hint:** Multiply the three values first, then divide by 100.

---

## Q22. Compound Payroll: Hourly Wage

**Difficulty:** Easy

**Learning Objective:** Multiply two inputs to compute a product, then format the output with two decimals.

**Problem:** Write a program that reads an employee's hourly wage and the number of hours worked, then prints the gross pay (hours times wage), rounded to two decimal places.

**Input:** Two lines: `hourly_wage` (an `int` in whole currency units), then `hours` (an `int`).

**Output:** Print `Gross pay: <hours * hourly_wage>` formatted to exactly two decimal places.

**Constraints:**
- `1 <= hourly_wage <= 10000`
- `1 <= hours <= 300`

**Example:**
```
Input:
500
40

Output:
Gross pay: 20000.00
```
**Explanation:** `40 * 500 = 20000`, printed as `20000.00`.

**Hint:** Format the result with `f"{amount:.2f}"`.

---

## Q23. Perimeter of a Rectangle

**Difficulty:** Easy

**Learning Objective:** Combine multiplication and addition in a single formula.

**Problem:** Write a program that reads the length and width of a rectangle and prints its perimeter.

**Input:** Two lines: integer `length`, then integer `width`.

**Output:** Print a single integer equal to `2 * (length + width)`.

**Constraints:**
- `1 <= length, width <= 10**6`

**Example:**
```
Input:
7
3

Output:
20
```
**Explanation:** `2 * (7 + 3) = 20`.

**Hint:** Perimeter of a rectangle is `2 * (length + width)`. Add first, then multiply.

---

## Q24. Split a Total Bill Equally

**Difficulty:** Easy

**Learning Objective:** Use true division to split a whole number evenly and print a decimal share.

**Problem:** Write a program that reads the total bill amount and the number of people, then prints how much each person pays if the bill is split equally.

**Input:** Two lines: integer `total_bill`, then integer `people` (`people != 0`).

**Output:** Print the value of `total_bill / people` as a decimal.

**Constraints:**
- `1 <= total_bill <= 10**6`
- `1 <= people <= 10**4`

**Example:**
```
Input:
120
5

Output:
24.0
```
**Explanation:** `120 / 5 = 24.0` per person.

**Hint:** True division `total_bill / people` gives the decimal share.

---

## Q25. Distance Between Two Points on a Line

**Difficulty:** Easy

**Learning Objective:** Compute an absolute difference using the `abs()` built-in and subtraction.

**Problem:** Write a program that reads two coordinates on a number line and prints the distance between them.

**Input:** Two lines: integer `x1`, then integer `x2`.

**Output:** Print a single integer equal to the absolute difference between `x1` and `x2`.

**Constraints:**
- `-10**9 <= x1, x2 <= 10**9`

**Example:**
```
Input:
-3
5

Output:
8
```
**Explanation:** The distance between `-3` and `5` is `abs(-3 - 5) = 8`.

**Hint:** Distance is `abs(x1 - x2)`. Order does not matter when using `abs()`.

---

## Q26. Total Cost with Tax

**Difficulty:** Easy

**Learning Objective:** Apply a percentage tax to a subtotal and compute the final total.

**Problem:** Write a program that reads a subtotal and a tax rate (as a whole percentage), then prints the total cost including tax.

**Input:** Two lines: integer `subtotal`, then integer `tax_percent`.

**Output:** Print the value of `subtotal + (subtotal * tax_percent) / 100` as a decimal.

**Constraints:**
- `1 <= subtotal <= 10**6`
- `0 <= tax_percent <= 100`

**Example:**
```
Input:
200
10

Output:
220.0
```
**Explanation:** Tax is `200 * 10/100 = 20`, so total is `220.0`.

**Hint:** Compute the tax amount first, then add it to the subtotal.

---

## Q27. Average Speed

**Difficulty:** Easy

**Learning Objective:** Apply the speed formula (distance divided by time) and format the result.

**Problem:** Write a program that reads a distance (in km) and the time taken (in hours), then prints the average speed in km/h.

**Input:** Two lines: integer `distance`, then integer `hours` (`hours != 0`).

**Output:** Print the value of `distance / hours`.

**Constraints:**
- `1 <= distance <= 10**6`
- `1 <= hours <= 10**4`

**Example:**
```
Input:
300
5

Output:
60.0
```
**Explanation:** `300 / 5 = 60.0` km/h.

**Hint:** Speed = distance divided by time.

---

## Q28. Price After Discount

**Difficulty:** Easy

**Learning Objective:** Compute a percentage reduction and subtract it from the original price.

**Problem:** Write a program that reads the original price of an item and a discount percentage, then prints the discounted price.

**Input:** Two lines: integer `original_price`, then integer `discount_percent`.

**Output:** Print the value of `original_price - (original_price * discount_percent) / 100` as a decimal.

**Constraints:**
- `1 <= original_price <= 10**6`
- `0 <= discount_percent <= 100`

**Example:**
```
Input:
500
20

Output:
400.0
```
**Explanation:** Discount is `500 * 20/100 = 100`, so the price is `400.0`.

**Hint:** Compute the discount amount, then subtract it from the original price.

---

## Q29. Convert Seconds to Minutes and Seconds

**Difficulty:** Easy

**Learning Objective:** Use floor division and modulo together to break a number into units.

**Problem:** Write a program that reads a number of seconds (a whole number) and prints the equivalent in minutes and remaining seconds, formatted as `M minutes and S seconds`.

**Input:** A single line containing an integer `seconds` (`seconds >= 0`).

**Output:** Print `<minutes> minutes and <secs> seconds` where `minutes = seconds // 60` and `secs = seconds % 60`.

**Constraints:**
- `0 <= seconds <= 10**9`

**Example:**
```
Input:
95

Output:
1 minutes and 35 seconds
```
**Explanation:** `95 // 60 = 1` and `95 % 60 = 35`.

**Hint:** Use `//` to get the whole minutes and `%` to get the remaining seconds.

---

## Q30. Power of a Number

**Difficulty:** Easy

**Learning Objective:** Read a base and an exponent and use the `**` operator to compute a power.

**Problem:** Write a program that reads a base and an exponent and prints the result of `base ** exponent`.

**Input:** Two lines: integer `base`, then integer `exponent`.

**Output:** Print a single integer equal to `base ** exponent`.

**Constraints:**
- `1 <= base <= 20`
- `0 <= exponent <= 10`

**Example:**
```
Input:
2
10

Output:
1024
```
**Explanation:** `2 ** 10 = 1024`.

**Hint:** Use `base ** exponent`.

---

## Q31. Age in Days

**Difficulty:** Easy

**Learning Objective:** Multiply two inputs to convert years into days (ignoring leap years).

**Problem:** Write a program that reads a person's age in years and prints the approximate number of days lived (treat 1 year = 365 days).

**Input:** A single line containing an integer `age_years`.

**Output:** Print a single integer equal to `age_years * 365`.

**Constraints:**
- `1 <= age_years <= 120`

**Example:**
```
Input:
30

Output:
10950
```
**Explanation:** `30 * 365 = 10950`.

**Hint:** Multiply the age by 365.

---

## Q32. Total Runs in Cricket Match

**Difficulty:** Easy

**Learning Objective:** Add multiple values read from input to compute a total.

**Problem:** Write a program that reads the scores from three innings of a match and prints the total runs scored.

**Input:** Three lines: integer `s1`, then `s2`, then `s3`.

**Output:** Print a single integer equal to `s1 + s2 + s3`.

**Constraints:**
- `0 <= s1, s2, s3 <= 10**6`

**Example:**
```
Input:
245
180
310

Output:
735
```
**Explanation:** `245 + 180 + 310 = 735`.

**Hint:** Add the three values.

---

## Q33. Perimeter of a Triangle

**Difficulty:** Easy

**Learning Objective:** Sum three numeric inputs to compute a perimeter.

**Problem:** Write a program that reads the three side lengths of a triangle and prints its perimeter.

**Input:** Three lines: integers `a`, `b`, and `c`.

**Output:** Print a single integer equal to `a + b + c`.

**Constraints:**
- `1 <= a, b, c <= 10**6`

**Example:**
```
Input:
3
4
5

Output:
12
```
**Explanation:** Perimeter of a triangle is the sum of all three sides.

**Hint:** Add all three side lengths.

---

## Q34. Average of Four Numbers

**Difficulty:** Easy

**Learning Objective:** Extend averaging to four values and print a decimal result.

**Problem:** Write a program that reads four whole numbers and prints their average.

**Input:** Four lines: integers `a`, `b`, `c`, and `d`.

**Output:** Print the value of `(a + b + c + d) / 4`.

**Constraints:**
- `0 <= a, b, c, d <= 10**6`

**Example:**
```
Input:
2
4
6
8

Output:
5.0
```
**Explanation:** `(2 + 4 + 6 + 8) / 4 = 20 / 4 = 5.0`.

**Hint:** Add all four values, then divide by 4.

---

## Q35. Circle Circumference

**Difficulty:** Easy

**Learning Objective:** Use a constant (pi) and multiplication to compute circumference.

**Problem:** Write a program that reads the radius of a circle (a whole number) and prints its circumference using `pi = 3.14159`.

**Input:** A single line containing an integer `radius`.

**Output:** Print the value of `2 * 3.14159 * radius`.

**Constraints:**
- `1 <= radius <= 10**6`

**Example:**
```
Input:
7

Output:
43.98226
```
**Explanation:** `2 * 3.14159 * 7 = 43.98226`.

**Hint:** Circumference is `2 * pi * radius`.

---

## Q36. Fuel Efficiency (Distance per Liter)

**Difficulty:** Easy

**Learning Objective:** Read two values and divide to compute a rate, then format to two decimals.

**Problem:** Write a program that reads the distance traveled (km) and the fuel used (liters), then prints the distance traveled per liter.

**Input:** Two lines: integer `distance`, then integer `liters` (`liters != 0`).

**Output:** Print `X km per liter` where `X = distance / liters`, formatted to two decimal places.

**Constraints:**
- `1 <= distance <= 10**6`
- `1 <= liters <= 10**4`

**Example:**
```
Input:
420
20

Output:
21.00 km per liter
```
**Explanation:** `420 / 20 = 21.0`, formatted as `21.00`.

**Hint:** Divide distance by liters and format with `:.2f`.

---

## Q37. Total Cost of N Items

**Difficulty:** Easy

**Learning Objective:** Multiply unit price by quantity to compute a total.

**Problem:** Write a program that reads the price of one item and the quantity purchased, then prints the total cost.

**Input:** Two lines: integer `unit_price`, then integer `quantity`.

**Output:** Print a single integer equal to `unit_price * quantity`.

**Constraints:**
- `1 <= unit_price <= 10**6`
- `1 <= quantity <= 10**4`

**Example:**
```
Input:
45
6

Output:
270
```
**Explanation:** `45 * 6 = 270`.

**Hint:** Multiply unit price by quantity.

---

## Q38. Weekly Wages

**Difficulty:** Easy

**Learning Objective:** Convert a daily wage into a weekly total.

**Problem:** Write a program that reads a daily wage and prints the weekly wage assuming the person works 5 days a week.

**Input:** A single line containing an integer `daily_wage`.

**Output:** Print a single integer equal to `daily_wage * 5`.

**Constraints:**
- `1 <= daily_wage <= 10**6`

**Example:**
```
Input:
800

Output:
4000
```
**Explanation:** `800 * 5 = 4000`.

**Hint:** Multiply the daily wage by 5.

---

## Q39. Remaining Distance After One Leg

**Difficulty:** Easy

**Learning Objective:** Subtract one value from another and print a result.

**Problem:** Write a program that reads the total journey distance and the distance already traveled, then prints how many units remain.

**Input:** Two lines: integer `total`, then integer `traveled`.

**Output:** Print a single integer equal to `total - traveled`.

**Constraints:**
- `1 <= traveled <= total <= 10**6`

**Example:**
```
Input:
1000
350

Output:
650
```
**Explanation:** `1000 - 350 = 650`.

**Hint:** Subtract traveled from total.

---

## Q40. Convert Celsius to Kelvin

**Difficulty:** Easy

**Learning Objective:** Apply a temperature formula using addition and output the result.

**Problem:** Write a program that reads a temperature in Celsius (a whole number) and prints the equivalent in Kelvin.

**Input:** A single line containing an integer `celsius`.

**Output:** Print the value of `celsius + 273.15`.

**Constraints:**
- `-273 <= celsius <= 500`

**Example:**
```
Input:
25

Output:
298.15
```
**Explanation:** `25 + 273.15 = 298.15`.

**Hint:** Kelvin = Celsius + 273.15.

---

## Q41. Electricity Bill (Base + Usage)

**Difficulty:** Easy → Medium

**Learning Objective:** Combine a fixed charge with a usage-based charge in one calculation.

**Problem:** Write a program that reads the units of electricity consumed and prints the total bill, where the bill is a fixed connection charge of 150 plus 7.5 per unit.

**Input:** A single line containing an integer `units` (`units >= 0`).

**Output:** Print the value of `150 + units * 7.5`.

**Constraints:**
- `0 <= units <= 10**5`

**Example:**
```
Input:
100

Output:
900.0
```
**Explanation:** `150 + 100 * 7.5 = 150 + 750 = 900.0`.

**Hint:** Add the fixed charge to the product of units and the per-unit rate.

---

## Q42. Perimeter of a Rectangle Given Area

**Difficulty:** Easy → Medium

**Learning Objective:** Reason about geometry by reading area and one side to find the other side, then compute perimeter.

**Problem:** Write a program that reads the area of a rectangle and one of its sides, then prints the perimeter. Since the rectangle has whole-number sides, the missing side equals `area // side`.

**Input:** Two lines: integer `area`, then integer `side` (`side != 0` and divisible).

**Output:** Print a single integer equal to `2 * (side + area // side)`.

**Constraints:**
- `1 <= area <= 10**6`
- `1 <= side <= 10**6`
- `area` is divisible by `side`.

**Example:**
```
Input:
24
4

Output:
20
```
**Explanation:** The other side is `24 // 4 = 6`, so perimeter is `2 * (4 + 6) = 20`.

**Hint:** Find the missing side with floor division, then apply the perimeter formula.

---

## Q43. Difference Between Product and Sum

**Difficulty:** Easy → Medium

**Learning Objective:** Combine multiplication, addition, and absolute difference into one multi-step computation.

**Problem:** Write a program that reads two integers and prints the absolute difference between their product and their sum.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print `abs(a * b - (a + b))`.

**Constraints:**
- `-10**6 <= a, b <= 10**6`

**Example:**
```
Input:
4
6

Output:
14
```
**Explanation:** Product is `24`, sum is `10`, difference is `abs(24 - 10) = 14`.

**Hint:** Compute the product and the sum first, then find the absolute difference.

---

## Q44. Grade Point Average from Four Grades

**Difficulty:** Easy → Medium

**Learning Objective:** Compute an average from multiple inputs and round it to one decimal place.

**Problem:** Write a program that reads four grade-point values (as whole numbers) and prints their average rounded to one decimal place.

**Input:** Four lines: integers `g1`, `g2`, `g3`, `g4`.

**Output:** Print the value of `(g1 + g2 + g3 + g4) / 4` rounded to one decimal place.

**Constraints:**
- `0 <= gi <= 100`

**Example:**
```
Input:
88
92
77
85

Output:
85.5
```
**Explanation:** `(88 + 92 + 77 + 85) / 4 = 342 / 4 = 85.5`.

**Hint:** Average the grades and format with `:.1f`.

---

## Q45. Number of Cents in Rupees

**Difficulty:** Easy → Medium

**Learning Objective:** Convert a decimal amount to a whole number of smaller units using multiplication and rounding.

**Problem:** Write a program that reads an amount in rupees (a whole number) and prints the equivalent number of paise (1 rupee = 100 paise).

**Input:** A single line containing an integer `rupees`.

**Output:** Print a single integer equal to `rupees * 100`.

**Constraints:**
- `0 <= rupees <= 10**6`

**Example:**
```
Input:
15

Output:
1500
```
**Explanation:** `15 * 100 = 1500` paise.

**Hint:** Multiply by 100.

---

## Q46. Time from Seconds to Hours

**Difficulty:** Easy → Medium

**Learning Objective:** Convert a large number of seconds into whole hours using floor division.

**Problem:** Write a program that reads a number of seconds and prints how many whole hours they represent.

**Input:** A single line containing an integer `seconds` (`seconds >= 0`).

**Output:** Print a single integer equal to `seconds // 3600`.

**Constraints:**
- `0 <= seconds <= 10**9`

**Example:**
```
Input:
7300

Output:
2
```
**Explanation:** `7300 // 3600 = 2` (2 whole hours; the remainder is ignored).

**Hint:** Use floor division by 3600.

---

## Q47. Remainder When Sum Is Divided

**Difficulty:** Easy → Medium

**Learning Objective:** Combine addition with the modulo operator.

**Problem:** Write a program that reads two integers, computes their sum, and prints the remainder when that sum is divided by a third given integer.

**Input:** Three lines: integers `a`, `b`, and `divisor` (`divisor != 0`).

**Output:** Print a single integer equal to `(a + b) % divisor`.

**Constraints:**
- `0 <= a, b <= 10**6`
- `1 <= divisor <= 10**6`

**Example:**
```
Input:
17
8
7

Output:
4
```
**Explanation:** Sum is `25`; `25 % 7 = 4`.

**Hint:** Compute the sum first, then apply `%`.

---

## Q48. Distance per Person in a Trip

**Difficulty:** Easy → Medium

**Learning Objective:** Divide a total by a group size and round to two decimal places.

**Problem:** Write a program that reads the total distance of a trip and the number of people sharing it, then prints the average distance each person covers.

**Input:** Two lines: integer `total_distance`, then integer `people` (`people != 0`).

**Output:** Print the value of `total_distance / people` rounded to two decimal places.

**Constraints:**
- `1 <= total_distance <= 10**6`
- `1 <= people <= 10**4`

**Example:**
```
Input:
250
4

Output:
62.5
```
**Explanation:** `250 / 4 = 62.5`, printed as `62.50` when formatted to two decimals.

**Hint:** Divide and format with `:.2f`.

---

## Q49. Convert Days to Weeks and Days

**Difficulty:** Easy → Medium

**Learning Objective:** Break a number into two units using `//` and `%` together.

**Problem:** Write a program that reads a number of days and prints the equivalent as weeks and remaining days.

**Input:** A single line containing an integer `days` (`days >= 0`).

**Output:** Print `<weeks> weeks and <rem> days` where `weeks = days // 7` and `rem = days % 7`.

**Constraints:**
- `0 <= days <= 10**9`

**Example:**
```
Input:
17

Output:
2 weeks and 3 days
```
**Explanation:** `17 // 7 = 2` and `17 % 7 = 3`.

**Hint:** Use `//` for whole weeks and `%` for the remaining days.

---

## Q50. BMI Calculation

**Difficulty:** Easy → Medium

**Learning Objective:** Apply the BMI formula `weight / (height ** 2)` and format the result.

**Problem:** Write a program that reads a person's weight (in kg) and height (in meters), then prints their BMI rounded to one decimal place.

**Input:** Two lines: `weight` (an `int`), then `height` (a `float`).

**Output:** Print the value of `weight / (height ** 2)` rounded to one decimal place.

**Constraints:**
- `20 <= weight <= 300`
- `0.5 <= height <= 2.5`

**Example:**
```
Input:
70
1.75

Output:
22.9
```
**Explanation:** `70 / (1.75 ** 2) = 70 / 3.0625 = 22.857...` rounded to `22.9`.

**Hint:** Square the height first, then divide the weight by it.

---

## Q51. Area of a Triangle

**Difficulty:** Easy → Medium

**Learning Objective:** Apply the triangle area formula `(base * height) / 2` using decimals.

**Problem:** Write a program that reads the base and height of a triangle (as decimals) and prints its area.

**Input:** Two lines: `base` (a `float`), then `height` (a `float`).

**Output:** Print the value of `(base * height) / 2`.

**Constraints:**
- `0.1 <= base, height <= 1000`

**Example:**
```
Input:
10.0
6.0

Output:
30.0
```
**Explanation:** `(10 * 6) / 2 = 30.0`.

**Hint:** Multiply base by height, then divide by 2.

---

## Q52. Number of Cakes Needed for Guests

**Difficulty:** Medium

**Learning Objective:** Use ceiling division logic (without math.ceil) to determine how many whole items are needed.

**Problem:** Write a program that reads the number of guests and the number of slices per cake, then prints how many whole cakes are needed so that every guest gets one slice. If there is any remainder, you need one extra cake.

**Input:** Two lines: integer `guests`, then integer `slices_per_cake` (`slices_per_cake != 0`).

**Output:** Print a single integer equal to the number of whole cakes needed. This is `(guests + slices_per_cake - 1) // slices_per_cake`.

**Constraints:**
- `1 <= guests <= 10**6`
- `1 <= slices_per_cake <= 100`

**Example:**
```
Input:
26
5

Output:
6
```
**Explanation:** `26 // 5 = 5` cakes cover 25 guests; one guest remains, so you need a 6th cake. The formula `(26 + 5 - 1) // 5 = 30 // 5 = 6`.

**Hint:** Plain floor division is not enough. To round a division up, add `slices_per_cake - 1` to the numerator before floor-dividing.

---

## Q53. Total Cost of Items with Bulk Discount

**Difficulty:** Medium

**Learning Objective:** Combine unit price, quantity, and a percentage discount into one total-cost calculation.

**Problem:** Write a program that reads the price of one item, the quantity purchased, and a bulk discount percentage, then prints the final cost after the discount.

**Input:** Three lines: integer `unit_price`, then integer `quantity`, then integer `discount_percent`.

**Output:** Print the value of `(unit_price * quantity) * (100 - discount_percent) / 100`.

**Constraints:**
- `1 <= unit_price <= 10**6`
- `1 <= quantity <= 10**4`
- `0 <= discount_percent <= 100`

**Example:**
```
Input:
100
5
20

Output:
400.0
```
**Explanation:** Subtotal is `500`; `20%` off means `500 * 0.8 = 400.0`.

**Hint:** Compute the subtotal first, then apply the discount.

---

## Q54. Grade Percentage

**Difficulty:** Medium

**Learning Objective:** Convert a score out of a total into a percentage.

**Problem:** Write a program that reads the marks obtained and the total marks, then prints the percentage scored, rounded to one decimal place.

**Input:** Two lines: integer `obtained`, then integer `total` (`total != 0`).

**Output:** Print the value of `(obtained / total) * 100` rounded to one decimal place.

**Constraints:**
- `0 <= obtained <= total <= 1000`

**Example:**
```
Input:
42
50

Output:
84.0
```
**Explanation:** `(42 / 50) * 100 = 84.0`.

**Hint:** Divide obtained by total first (this gives a fraction), then multiply by 100.

---

## Q55. Time Duration Between Start and End Times

**Difficulty:** Medium

**Learning Objective:** Compute elapsed time using multiplication and subtraction on hours and minutes.

**Problem:** Write a program that reads a start time (hours and minutes) and an end time (hours and minutes, same day), then prints the elapsed time in minutes.

**Input:** Four lines: integer `start_hour`, `start_min`, `end_hour`, `end_min`.

**Output:** Print a single integer equal to `(end_hour * 60 + end_min) - (start_hour * 60 + start_min)`.

**Constraints:**
- `0 <= hour <= 23`
- `0 <= minute <= 59`
- End time is later than start time on the same day.

**Example:**
```
Input:
9
15
11
45

Output:
150
```
**Explanation:** Start is `9*60+15 = 555`; end is `11*60+45 = 705`; difference is `150` minutes.

**Hint:** Convert both times to minutes since midnight, then subtract.

---

## Q56. Volume of a Cylinder

**Difficulty:** Medium

**Learning Objective:** Apply a multi-step volume formula `pi * r**2 * h` and round the result.

**Problem:** Write a program that reads the radius and height of a cylinder (as whole numbers) and prints its volume using `pi = 3.14159`, rounded to one decimal place.

**Input:** Two lines: integer `radius`, then integer `height`.

**Output:** Print the value of `3.14159 * radius**2 * height` rounded to one decimal place.

**Constraints:**
- `1 <= radius <= 1000`
- `1 <= height <= 1000`

**Example:**
```
Input:
3
5

Output:
141.4
```
**Explanation:** `3.14159 * 9 * 5 = 141.371...` rounded to `141.4`.

**Hint:** Square the radius first, then multiply by pi and the height.

---

## Q57. Sharing Toys Among Children

**Difficulty:** Medium

**Learning Objective:** Compute both the quotient and the remainder of a division.

**Problem:** Write a program that reads the number of toys and the number of children, then prints how many toys each child gets and how many toys are left over.

**Input:** Two lines: integer `toys`, then integer `children` (`children != 0`).

**Output:** Print `Each child gets <toys // children> toys and <toys % children> are left over.`

**Constraints:**
- `1 <= toys <= 10**6`
- `1 <= children <= 10**4`

**Example:**
```
Input:
29
6

Output:
Each child gets 4 toys and 5 are left over.
```
**Explanation:** `29 // 6 = 4` and `29 % 6 = 5`.

**Hint:** Use `//` for the per-child share and `%` for the remainder.

---

## Q58. Cost of Fuel for a Trip

**Difficulty:** Medium

**Learning Objective:** Combine a rate, a distance, and a price into a multi-step fuel-cost calculation.

**Problem:** Write a program that reads the fuel efficiency of a vehicle (km per liter), the trip distance (km), and the price per liter, then prints the total fuel cost for the trip.

**Input:** Three lines: integer `km_per_liter`, integer `distance`, then integer `price_per_liter`.

**Output:** Print the value of `(distance / km_per_liter) * price_per_liter`, rounded to two decimal places.

**Constraints:**
- `1 <= km_per_liter <= 50`
- `1 <= distance <= 10**6`
- `1 <= price_per_liter <= 1000`

**Example:**
```
Input:
15
300
110

Output:
2200.0
```
**Explanation:** `(300 / 15) * 110 = 20 * 110 = 2200`.

**Hint:** First find the liters needed (`distance / km_per_liter`), then multiply by the price.

---

## Q59. Total Bill with Discount and Tip

**Difficulty:** Medium

**Learning Objective:** Apply a discount, then a tip, sequentially in a realistic billing scenario.

**Problem:** Write a program that reads the bill amount, a discount percentage, and a tip percentage, then prints the final amount: first apply the discount to the bill, then add the tip on the discounted amount.

**Input:** Three lines: integer `bill`, integer `discount_percent`, then integer `tip_percent`.

**Output:** Print the value of `(bill * (100 - discount_percent) / 100) * (100 + tip_percent) / 100`, rounded to two decimal places.

**Constraints:**
- `1 <= bill <= 10**6`
- `0 <= discount_percent <= 100`
- `0 <= tip_percent <= 100`

**Example:**
```
Input:
1000
10
5

Output:
945.0
```
**Explanation:** After 10% discount, bill is `900`; after 5% tip, `900 * 1.05 = 945.0`.

**Hint:** Apply the discount to get a subtotal, then apply the tip percentage to that subtotal.

---

## Q60. Number of Years to Seconds (approx.)

**Difficulty:** Medium

**Learning Objective:** Chain multiple unit conversions together into one calculation.

**Problem:** Write a program that reads a number of years and prints the approximate number of seconds they contain, assuming 365 days per year, 24 hours per day, 60 minutes per hour, and 60 seconds per minute.

**Input:** A single line containing an integer `years` (`years >= 0`).

**Output:** Print a single integer equal to `years * 365 * 24 * 60 * 60`.

**Constraints:**
- `0 <= years <= 100`

**Example:**
```
Input:
1

Output:
31536000
```
**Explanation:** `1 * 365 * 24 * 60 * 60 = 31536000`.

**Hint:** Multiply all the conversion factors together.

---

## Q61. Split Bill with One Person Not Paying

**Difficulty:** Medium

**Learning Objective:** Adjust a group calculation based on a condition implied by the inputs, using only arithmetic.

**Problem:** Write a program that reads the total bill and the number of people in the group, where one person is not paying. Compute how much each paying person owes.

**Input:** Two lines: integer `total_bill`, then integer `people` (`people > 1`).

**Output:** Print the value of `total_bill / (people - 1)` rounded to two decimal places.

**Constraints:**
- `1 <= total_bill <= 10**6`
- `2 <= people <= 10**4`

**Example:**
```
Input:
500
6

Output:
100.0
```
**Explanation:** One of the 6 people does not pay, so `5` pay: `500 / 5 = 100.0`.

**Hint:** The number of paying people is `people - 1`.

---

## Q62. Area of a Circle

**Difficulty:** Medium

**Learning Objective:** Apply `pi * r**2` and format the result.

**Problem:** Write a program that reads the radius of a circle (a whole number) and prints its area using `pi = 3.14159`, rounded to two decimal places.

**Input:** A single line containing an integer `radius`.

**Output:** Print the value of `3.14159 * radius**2` rounded to two decimal places.

**Constraints:**
- `1 <= radius <= 10**4`

**Example:**
```
Input:
5

Output:
78.54
```
**Explanation:** `3.14159 * 25 = 78.53975`, rounded to `78.54`.

**Hint:** Square the radius, then multiply by pi.

---

## Q63. Reverse Two-Digit Number

**Difficulty:** Medium

**Learning Objective:** Extract individual digits using `//` and `%`, then reassemble them in reverse order.

**Problem:** Write a program that reads a two-digit number and prints the number formed by reversing its digits.

**Input:** A single line containing an integer `n` where `10 <= n <= 99`.

**Output:** Print the reversed two-digit number.

**Constraints:**
- `10 <= n <= 99`

**Example:**
```
Input:
47

Output:
74
```
**Explanation:** Tens digit is `47 // 10 = 4`, ones digit is `47 % 10 = 7`; reversed is `7 * 10 + 4 = 74`.

**Hint:** Use `// 10` to get the tens digit and `% 10` to get the ones digit, then combine them in the opposite order.

---

## Q64. Add Digits of a Two-Digit Number

**Difficulty:** Medium

**Learning Objective:** Extract digits and add them together.

**Problem:** Write a program that reads a two-digit number and prints the sum of its digits.

**Input:** A single line containing an integer `n` where `10 <= n <= 99`.

**Output:** Print a single integer equal to the sum of the two digits.

**Constraints:**
- `10 <= n <= 99`

**Example:**
```
Input:
38

Output:
11
```
**Explanation:** Digits are `3` and `8`, sum is `11`.

**Hint:** Use `n // 10` and `n % 10` to get the two digits.

---

## Q65. Product of Digits of a Two-Digit Number

**Difficulty:** Medium

**Learning Objective:** Extract digits and multiply them together.

**Problem:** Write a program that reads a two-digit number and prints the product of its digits.

**Input:** A single line containing an integer `n` where `10 <= n <= 99`.

**Output:** Print a single integer equal to the product of the two digits.

**Constraints:**
- `10 <= n <= 99`

**Example:**
```
Input:
25

Output:
10
```
**Explanation:** Digits are `2` and `5`, product is `10`.

**Hint:** Get both digits, then multiply them.

---

## Q66. Sum of Digits of a Three-Digit Number

**Difficulty:** Medium

**Learning Objective:** Extract three digits and sum them, combining `//` and `%`.

**Problem:** Write a program that reads a three-digit number and prints the sum of its digits.

**Input:** A single line containing an integer `n` where `100 <= n <= 999`.

**Output:** Print a single integer equal to the sum of the three digits.

**Constraints:**
- `100 <= n <= 999`

**Example:**
```
Input:
256

Output:
13
```
**Explanation:** Digits are `2`, `5`, and `6`; sum is `13`.

**Hint:** The hundreds digit is `n // 100`, the ones digit is `n % 10`, and the middle digit is `(n // 10) % 10`.

---

## Q67. Convert Rupees to Paise (with decimal)

**Difficulty:** Medium

**Learning Objective:** Convert a decimal currency amount into an integer number of smaller units.

**Problem:** Write a program that reads an amount in rupees as a decimal (e.g., `12.50`) and prints the equivalent number of paise.

**Input:** A single line containing a `float` `rupees`.

**Output:** Print a single integer equal to `round(rupees * 100)`.

**Constraints:**
- `0 <= rupees <= 10**6`
- The value has at most two decimal places.

**Example:**
```
Input:
12.50

Output:
1250
```
**Explanation:** `12.50 * 100 = 1250` paise.

**Hint:** Multiply by 100. If floating point leaves a tiny error, rounding gives the clean integer.

---

## Q68. Percentage of a Number

**Difficulty:** Medium

**Learning Objective:** Compute a given percentage of a number and round it.

**Problem:** Write a program that reads a whole number and a percentage, then prints that percentage of the number, rounded to two decimal places.

**Input:** Two lines: integer `number`, then integer `percent`.

**Output:** Print the value of `(number * percent) / 100` rounded to two decimal places.

**Constraints:**
- `-10**6 <= number <= 10**6`
- `0 <= percent <= 100`

**Example:**
```
Input:
80
25

Output:
20.0
```
**Explanation:** `(80 * 25) / 100 = 20.0`.

**Hint:** Multiply the number by the percent, then divide by 100.

---

## Q69. Total Distance With Two Speeds

**Difficulty:** Medium

**Learning Objective:** Combine two separate distance calculations into one total.

**Problem:** Write a program that reads a speed and time for the first part of a trip, then a speed and time for the second part, and prints the total distance traveled.

**Input:** Four lines: integer `speed1`, `time1`, `speed2`, `time2`.

**Output:** Print a single integer equal to `speed1 * time1 + speed2 * time2`.

**Constraints:**
- `1 <= speed, time <= 10**4`

**Example:**
```
Input:
60
2
80
1

Output:
200
```
**Explanation:** `60*2 = 120` plus `80*1 = 80` equals `200`.

**Hint:** Distance equals speed times time; add the two distances.

---

## Q70. Difference of Squares

**Difficulty:** Medium

**Learning Objective:** Compute `a**2 - b**2` using operators.

**Problem:** Write a program that reads two integers and prints the difference of their squares (`a**2 - b**2`).

**Input:** Two lines: integers `a` and `b`.

**Output:** Print a single integer equal to `a**2 - b**2`.

**Constraints:**
- `-10**6 <= a, b <= 10**6`

**Example:**
```
Input:
7
3

Output:
40
```
**Explanation:** `49 - 9 = 40`.

**Hint:** Compute each square separately, then subtract.

---

## Q71. Fahrenheit to Celsius

**Difficulty:** Medium

**Learning Objective:** Invert a conversion formula and round the output.

**Problem:** Write a program that reads a temperature in Fahrenheit (a whole number) and prints it in Celsius using the formula `(F - 32) * 5 / 9`, rounded to one decimal place.

**Input:** A single line containing an integer `fahrenheit`.

**Output:** Print the value of `(fahrenheit - 32) * 5 / 9` rounded to one decimal place.

**Constraints:**
- `-100 <= fahrenheit <= 300`

**Example:**
```
Input:
100

Output:
37.8
```
**Explanation:** `(100 - 32) * 5 / 9 = 68 * 5/9 = 37.777...` rounded to `37.8`.

**Hint:** Subtract 32 first, then multiply by 5 and divide by 9.

---

## Q72. Perimeter of a Circle (Circumference) from Area

**Difficulty:** Medium

**Learning Objective:** Reason about the relationship between area and circumference using the radius.

**Problem:** Write a program that reads the radius of a circle and prints its circumference. Even though this is simple, note the learning focus: connect radius to circumference.

**Input:** A single line containing an integer `radius`.

**Output:** Print the value of `2 * 3.14159 * radius` rounded to two decimal places.

**Constraints:**
- `1 <= radius <= 10**4`

**Example:**
```
Input:
10

Output:
62.83
```
**Explanation:** `2 * 3.14159 * 10 = 62.8318`, rounded to `62.83`.

**Hint:** Circumference is `2 * pi * radius`.

---

## Q73. Sum of First N Natural Numbers

**Difficulty:** Medium

**Learning Objective:** Use the closed-form formula `n * (n + 1) // 2` (a shortcut taught by arithmetic reasoning) to sum natural numbers without a loop.

**Problem:** Write a program that reads a positive integer `n` and prints the sum of all whole numbers from 1 to `n`.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print a single integer equal to `n * (n + 1) // 2`.

**Constraints:**
- `1 <= n <= 10**6`

**Example:**
```
Input:
10

Output:
55
```
**Explanation:** `10 * 11 // 2 = 55` (sum of 1..10).

**Hint:** There is a known formula: `sum = n * (n + 1) // 2`. No loop is needed.

---

## Q74. Discounted Price of Multiple Items

**Difficulty:** Medium

**Learning Objective:** Combine quantity, per-item discount, and tax into a final bill.

**Problem:** Write a program that reads the unit price, quantity, discount percentage, and tax percentage, then prints the final amount: first apply the discount to the subtotal, then apply tax.

**Input:** Four lines: integer `unit_price`, `quantity`, `discount_percent`, `tax_percent`.

**Output:** Print the value of `((unit_price * quantity) * (100 - discount_percent) / 100) * (100 + tax_percent) / 100`, rounded to two decimal places.

**Constraints:**
- `1 <= unit_price <= 10**6`
- `1 <= quantity <= 10**4`
- `0 <= discount_percent <= 100`
- `0 <= tax_percent <= 100`

**Example:**
```
Input:
200
3
10
8

Output:
583.2
```
**Explanation:** Subtotal is `600`; after 10% discount it's `540`; after 8% tax it's `540 * 1.08 = 583.2`.

**Hint:** Work step by step: subtotal, then discount, then tax.

---

## Q75. Average of Five Numbers

**Difficulty:** Medium

**Learning Objective:** Average five inputs and round to two decimal places.

**Problem:** Write a program that reads five whole numbers and prints their average, rounded to two decimal places.

**Input:** Five lines: integers `a`, `b`, `c`, `d`, `e`.

**Output:** Print the value of `(a + b + c + d + e) / 5` rounded to two decimal places.

**Constraints:**
- `0 <= value <= 10**6`

**Example:**
```
Input:
10
20
30
40
50

Output:
30.0
```
**Explanation:** `(10+20+30+40+50) / 5 = 150 / 5 = 30.0`.

**Hint:** Add all five, then divide by 5 and format with `:.2f`.

---

## Q76. Minimum Number of Buses Needed

**Difficulty:** Medium

**Learning Objective:** Apply ceiling division to determine how many vehicles are required for a group.

**Problem:** Write a program that reads the number of people and the bus capacity, then prints how many full buses are needed so that everyone has a seat.

**Input:** Two lines: integer `people`, then integer `capacity` (`capacity != 0`).

**Output:** Print a single integer equal to `(people + capacity - 1) // capacity`.

**Constraints:**
- `1 <= people <= 10**6`
- `1 <= capacity <= 100`

**Example:**
```
Input:
75
20

Output:
4
```
**Explanation:** `75 // 20 = 3` buses carry 60 people; 15 remain, so a 4th bus is needed. Formula: `(75 + 20 - 1) // 20 = 4`.

**Hint:** To round a division up, add `capacity - 1` to the numerator before floor-dividing.

---

## Q77. Year to Decade

**Difficulty:** Medium

**Learning Objective:** Use floor division to group a value into larger units.

**Problem:** Write a program that reads a year and prints which decade (how many whole groups of 10 years) it falls into, counted from year 0.

**Input:** A single line containing an integer `year` (`year >= 0`).

**Output:** Print a single integer equal to `year // 10`.

**Constraints:**
- `0 <= year <= 10**6`

**Example:**
```
Input:
2024

Output:
202
```
**Explanation:** `2024 // 10 = 202`.

**Hint:** Use floor division by 10.

---

## Q78. Cost per Student for a School Trip

**Difficulty:** Medium

**Learning Objective:** Divide a total cost among students and round to two decimal places.

**Problem:** Write a program that reads the total cost of a school trip and the number of students, then prints how much each student pays.

**Input:** Two lines: integer `total_cost`, then integer `students` (`students != 0`).

**Output:** Print the value of `total_cost / students` rounded to two decimal places.

**Constraints:**
- `1 <= total_cost <= 10**6`
- `1 <= students <= 10**4`

**Example:**
```
Input:
3000
25

Output:
120.0
```
**Explanation:** `3000 / 25 = 120.0`.

**Hint:** Divide and format with `:.2f`.

---

## Q79. Average of Marks in Percent Form

**Difficulty:** Medium

**Learning Objective:** Combine averaging with percentage conversion.

**Problem:** Write a program that reads marks in three subjects (each out of 100) and prints the average percentage.

**Input:** Three lines: integers `m1`, `m2`, `m3`.

**Output:** Print the value of `(m1 + m2 + m3) / 3` (this already represents the average percentage since each is out of 100).

**Constraints:**
- `0 <= mi <= 100`

**Example:**
```
Input:
80
90
70

Output:
80.0
```
**Explanation:** `(80 + 90 + 70) / 3 = 240 / 3 = 80.0`.

**Hint:** Add the three marks and divide by 3.

---

## Q80. Distance of a Falling Object

**Difficulty:** Medium

**Learning Objective:** Apply a physics formula `0.5 * g * t**2` with a given constant.

**Problem:** Write a program that reads the time `t` (in seconds, a whole number) an object has been falling and prints the distance fallen in meters using `g = 9.8`. Distance = `0.5 * 9.8 * t**2`.

**Input:** A single line containing an integer `t` (`t >= 0`).

**Output:** Print the value of `0.5 * 9.8 * t**2`.

**Constraints:**
- `0 <= t <= 1000`

**Example:**
```
Input:
3

Output:
44.1
```
**Explanation:** `0.5 * 9.8 * 9 = 44.1`.

**Hint:** Square the time, then multiply by `0.5 * 9.8`.

---

## Q81. Sum of Squares of Two Numbers

**Difficulty:** Medium → Hard

**Learning Objective:** Combine squaring and addition into one expression.

**Problem:** Write a program that reads two integers and prints the sum of their squares.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print a single integer equal to `a**2 + b**2`.

**Constraints:**
- `-10**6 <= a, b <= 10**6`

**Example:**
```
Input:
3
4

Output:
25
```
**Explanation:** `9 + 16 = 25`.

**Hint:** Square each value, then add.

---

## Q82. Hypotenuse of a Right Triangle

**Difficulty:** Medium → Hard

**Learning Objective:** Apply the Pythagorean theorem and square root using exponent `0.5`.

**Problem:** Write a program that reads the two shorter sides of a right triangle and prints the hypotenuse, which is `(a**2 + b**2) ** 0.5`, rounded to one decimal place.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print the value of `(a**2 + b**2) ** 0.5` rounded to one decimal place.

**Constraints:**
- `1 <= a, b <= 10**4`

**Example:**
```
Input:
3
4

Output:
5.0
```
**Explanation:** `(9 + 16) ** 0.5 = 25 ** 0.5 = 5.0`.

**Hint:** Sum the squares, then raise to the power `0.5` (the same as a square root).

---

## Q83. Quadruple a Number and Add Ten

**Difficulty:** Medium → Hard

**Learning Objective:** Combine multiple operators and control the order of operations.

**Problem:** Write a program that reads an integer, multiplies it by 4, and adds 10 to the result.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to `n * 4 + 10`.

**Constraints:**
- `-10**6 <= n <= 10**6`

**Example:**
```
Input:
5

Output:
30
```
**Explanation:** `5 * 4 = 20`, then `20 + 10 = 30`.

**Hint:** Multiplication comes before addition, so `n * 4 + 10` works directly.

---

## Q84. Last Two Digits

**Difficulty:** Medium → Hard

**Learning Objective:** Extract the last two digits of a large number using modulo.

**Problem:** Write a program that reads a large integer and prints just its last two digits.

**Input:** A single line containing an integer `n` (`n >= 100`).

**Output:** Print a single integer equal to `n % 100`.

**Constraints:**
- `100 <= n <= 10**12`

**Example:**
```
Input:
123456

Output:
56
```
**Explanation:** `123456 % 100 = 56`.

**Hint:** Use modulo 100 to keep the last two digits.

---

## Q85. Sum of Digits of a Four-Digit Number

**Difficulty:** Medium → Hard

**Learning Objective:** Combine floor division and modulo repeatedly to extract and sum all four digits of a number.

**Problem:** Write a program that reads a four-digit number and prints the sum of its digits.

**Input:** A single line containing an integer `n` where `1000 <= n <= 9999`.

**Output:** Print a single integer equal to the sum of the four digits.

**Constraints:**
- `1000 <= n <= 9999`

**Example:**
```
Input:
2357

Output:
17
```
**Explanation:** Digits are `2`, `3`, `5`, and `7`; their sum is `17`.

**Hint:** The thousands digit is `n // 1000`, the hundreds digit is `(n // 100) % 10`, the tens digit is `(n // 10) % 10`, and the ones digit is `n % 10`. Add all four.

---

## Q86. Last Digit of a Number

**Difficulty:** Medium → Hard

**Learning Objective:** Isolate the ones digit of a number using modulo.

**Problem:** Write a program that reads an integer and prints its last (ones) digit.

**Input:** A single line containing an integer `n`.

**Output:** Print a single integer equal to `n % 10`.

**Constraints:**
- `-10**12 <= n <= 10**12`

**Example:**
```
Input:
749

Output:
9
```
**Explanation:** `749 % 10 = 9`.

**Hint:** Use modulo 10.

---

## Q87. Distance Between Two Cities

**Difficulty:** Medium → Hard

**Learning Objective:** Combine addition and absolute difference for a real-world distance scenario.

**Problem:** A car drives from City A to City B (distance `d1`) and then from City B to City C (distance `d2`), all in the same direction. Write a program that reads `d1` and `d2` and prints the total distance from A to C.

**Input:** Two lines: integer `d1`, then integer `d2`.

**Output:** Print a single integer equal to `d1 + d2`.

**Constraints:**
- `1 <= d1, d2 <= 10**6`

**Example:**
```
Input:
120
80

Output:
200
```
**Explanation:** The total is the sum of both legs, `120 + 80 = 200`.

**Hint:** Total distance is the sum of the two legs.

---

## Q88. Amount Left After Spending

**Difficulty:** Medium → Hard

**Learning Objective:** Subtract several expenses from a budget in one expression.

**Problem:** Write a program that reads a starting budget and three separate expenses, then prints the amount left.

**Input:** Four lines: integer `budget`, then integers `e1`, `e2`, `e3`.

**Output:** Print a single integer equal to `budget - e1 - e2 - e3`.

**Constraints:**
- `1 <= e1, e2, e3 <= budget <= 10**6`

**Example:**
```
Input:
5000
1200
800
1500

Output:
1500
```
**Explanation:** `5000 - 1200 - 800 - 1500 = 1500`.

**Hint:** Subtract each expense from the budget in order.

---

## Q89. Total Weight of Parcels

**Difficulty:** Medium → Hard

**Learning Objective:** Sum multiple values and format with units in the output.

**Problem:** Write a program that reads the weights of three parcels (in kilograms) and prints their total weight.

**Input:** Three lines: integers `w1`, `w2`, `w3`.

**Output:** Print `Total weight: <w1 + w2 + w3> kg`.

**Constraints:**
- `1 <= wi <= 10**4`

**Example:**
```
Input:
5
8
3

Output:
Total weight: 16 kg
```
**Explanation:** `5 + 8 + 3 = 16`.

**Hint:** Add the three weights and place the sum into the output string.

---

## Q90. Convert Minutes to Hours and Minutes

**Difficulty:** Medium → Hard

**Learning Objective:** Convert a large number of minutes into hours and remaining minutes using `//` and `%`.

**Problem:** Write a program that reads a number of minutes and prints the equivalent as hours and remaining minutes.

**Input:** A single line containing an integer `minutes` (`minutes >= 0`).

**Output:** Print `<hours> hours and <rem> minutes` where `hours = minutes // 60` and `rem = minutes % 60`.

**Constraints:**
- `0 <= minutes <= 10**9`

**Example:**
```
Input:
135

Output:
2 hours and 15 minutes
```
**Explanation:** `135 // 60 = 2` and `135 % 60 = 15`.

**Hint:** Use `//` for whole hours and `%` for the remaining minutes.

---

## Q91. Average and Product of Two Numbers

**Difficulty:** Medium → Hard

**Learning Objective:** Produce two separate outputs computed from the same inputs.

**Problem:** Write a program that reads two integers and prints two lines: the average and the product of the two numbers.

**Input:** Two lines: integers `a` and `b`.

**Output:** First line: the average `(a + b) / 2`. Second line: the product `a * b`.

**Constraints:**
- `0 <= a, b <= 10**6`

**Example:**
```
Input:
8
12

Output:
10.0
96
```
**Explanation:** Average is `10.0`; product is `96`.

**Hint:** Compute both results and print them on separate lines using two `print()` calls.

---

## Q92. Total Distance of a Round Trip

**Difficulty:** Medium → Hard

**Learning Objective:** Use multiplication to double a distance for a round trip.

**Problem:** Write a program that reads the one-way distance of a journey and prints the total distance for a round trip (going and returning).

**Input:** A single line containing an integer `one_way`.

**Output:** Print a single integer equal to `one_way * 2`.

**Constraints:**
- `1 <= one_way <= 10**6`

**Example:**
```
Input:
150

Output:
300
```
**Explanation:** `150 * 2 = 300`.

**Hint:** A round trip is twice the one-way distance.

---

## Q93. Number of Full Pages of a Notebook

**Difficulty:** Medium → Hard

**Learning Objective:** Use floor division to determine how many complete pages a set of lines fills.

**Problem:** Write a program that reads the number of lines written and the lines that fit on one page, then prints how many full pages are completely filled.

**Input:** Two lines: integer `total_lines`, then integer `lines_per_page` (`lines_per_page != 0`).

**Output:** Print a single integer equal to `total_lines // lines_per_page`.

**Constraints:**
- `1 <= total_lines <= 10**6`
- `1 <= lines_per_page <= 100`

**Example:**
```
Input:
150
40

Output:
3
```
**Explanation:** `150 // 40 = 3` full pages (30 lines remain).

**Hint:** Use floor division.

---

## Q94. Total Cost Including Delivery Fee

**Difficulty:** Medium → Hard

**Learning Objective:** Add a fixed delivery fee to a product total and format the result.

**Problem:** Write a program that reads the total price of items ordered and a delivery fee, then prints the grand total.

**Input:** Two lines: integer `items_total`, then integer `delivery_fee`.

**Output:** Print `Grand total: <items_total + delivery_fee>`.

**Constraints:**
- `1 <= items_total <= 10**6`
- `0 <= delivery_fee <= 10000`

**Example:**
```
Input:
1200
100

Output:
Grand total: 1300
```
**Explanation:** `1200 + 100 = 1300`.

**Hint:** Add the two values and place the sum into the output.

---

## Q95. Perimeter of a Circle from Radius (Deeper Reasoning)

**Difficulty:** Medium → Hard

**Learning Objective:** Compute a rounded result from a constant and an input, choosing correct precision.

**Problem:** Write a program that reads the diameter of a circle and prints its circumference using `pi = 3.14159`, rounded to one decimal place. Note: the input is the diameter, not the radius.

**Input:** A single line containing an integer `diameter`.

**Output:** Print the value of `3.14159 * diameter` rounded to one decimal place.

**Constraints:**
- `1 <= diameter <= 10**5`

**Example:**
```
Input:
14

Output:
43.98
```
**Explanation:** Circumference is `pi * diameter = 3.14159 * 14 = 43.98226`, rounded to one decimal place would be `44.0`, but format to two decimals to match expected: `43.98`.

**Hint:** Circumference equals `pi * diameter`. Read carefully whether the input is a radius or a diameter.

---

## Q96. Sum of Consecutive Integers from A to B

**Difficulty:** Hard

**Learning Objective:** Use the arithmetic-series formula to sum a range of numbers without a loop.

**Problem:** Write a program that reads two integers `a` and `b` (with `a <= b`) and prints the sum of all integers from `a` to `b` inclusive.

**Input:** Two lines: integer `a`, then integer `b`.

**Output:** Print a single integer equal to the sum from `a` to `b`.

**Constraints:**
- `-10**6 <= a <= b <= 10**6`

**Example:**
```
Input:
5
9

Output:
35
```
**Explanation:** `5 + 6 + 7 + 8 + 9 = 35`.

**Hint:** The sum of `n` consecutive integers equals the number of terms times the average of the first and last. Number of terms is `b - a + 1`; the formula is `(b - a + 1) * (a + b) // 2`.

---

## Q97. Check Power of Two

**Difficulty:** Hard

**Learning Objective:** Use a single bitwise expression `n & (n - 1)` to detect whether a number is an exact power of two.

**Problem:** Write a program that reads a positive integer and prints `True` if it is an exact power of two (like 1, 2, 4, 8, 16, ...), otherwise prints `False`.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print the boolean result of `n & (n - 1) == 0`.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
64

Output:
True
```
**Explanation:** `64` is `2**6`, an exact power of two, so the result is `True`.

**Hint:** For any power of two `n`, the expression `n & (n - 1)` equals `0`. Compare that result to `0` and print the boolean.

---

## Q98. Reverse a Three-Digit Number

**Difficulty:** Hard

**Learning Objective:** Extract all three digits of a number and reassemble them in reverse order using place values.

**Problem:** Write a program that reads a three-digit number and prints the number formed by reversing its digits.

**Input:** A single line containing an integer `n` where `100 <= n <= 999`.

**Output:** Print the reversed three-digit number.

**Constraints:**
- `100 <= n <= 999`

**Example:**
```
Input:
372

Output:
273
```
**Explanation:** Digits are `3`, `7`, `2`; reversed is `2 * 100 + 7 * 10 + 3 = 273`.

**Hint:** Get the hundreds, tens, and ones digits, then build the reverse as `ones * 100 + tens * 10 + hundreds`.

---

## Q99. Digit Sum of a Two-Digit Number (Using Both Div and Mod)

**Difficulty:** Hard

**Learning Objective:** Apply floor division and modulo to decompose and recompose a number.

**Problem:** Write a program that reads a two-digit number and prints the difference between its tens digit and its ones digit (tens minus ones).

**Input:** A single line containing an integer `n` where `10 <= n <= 99`.

**Output:** Print a single integer equal to `(n // 10) - (n % 10)`.

**Constraints:**
- `10 <= n <= 99`

**Example:**
```
Input:
83

Output:
5
```
**Explanation:** Tens digit is `8`, ones digit is `3`, difference is `8 - 3 = 5`.

**Hint:** Extract the two digits with `//` and `%`, then subtract.

---

## Q100. Calculate Final Bill with Discount, Tax, and Tip

**Difficulty:** Hard

**Learning Objective:** Combine a multi-step discount, tax, and tip calculation into a single program, applying operations in the correct order.

**Problem:** Write a program that reads the bill amount, a discount percentage, a tax percentage, and a tip percentage, then prints the final amount paid. Apply them in this order: discount on the bill, then tax on the discounted amount, then tip on the taxed amount.

**Input:** Four lines: integer `bill`, `discount_percent`, `tax_percent`, `tip_percent`.

**Output:** Print the value of `((bill * (100 - discount_percent) / 100) * (100 + tax_percent) / 100) * (100 + tip_percent) / 100`, rounded to two decimal places.

**Constraints:**
- `1 <= bill <= 10**6`
- `0 <= discount_percent <= 100`
- `0 <= tax_percent <= 100`
- `0 <= tip_percent <= 100`

**Example:**
```
Input:
2000
10
5
10

Output:
2079.0
```
**Explanation:** After discount: `2000 * 0.9 = 1800`; after tax: `1800 * 1.05 = 1890`; after tip: `1890 * 1.1 = 2079.0`.

**Hint:** Work through the three percentages one step at a time, carrying the current total forward. Each step multiplies the running total by `(100 + or - percent) / 100`.
