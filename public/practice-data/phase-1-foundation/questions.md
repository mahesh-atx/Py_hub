# 🧠 Phase 1 — 60 Practice Questions

Questions for **Modules 1–4**: variables, data types, operators, conditionals and loops.

**Rules for this set:**

- Use **only** what Phase 1 taught — variables, `input()`, `print()`, type casting, operators, `if`/`elif`/`else`, `for`, `while`, `range()`, `break`/`continue`.
- **No lists, no functions, no imports.** Those arrive in Phases 2 and 3. Solving these without them is the whole point — it forces you to build logic instead of reaching for a tool.
- Difficulty increases as you go. Q1 takes a minute; Q60 will take half an hour.

**How to use this file:**

1. Read the question and write down your approach *before* typing.
2. Type the code yourself. Do not copy-paste.
3. Run it, then **deliberately break it** — feed it a negative number, a zero, an empty input.
4. If you are stuck for more than 20 minutes, re-read the relevant module section, then try again.

> 💡 **Tip:** Every question shows expected output. Match it **exactly**, including spacing and punctuation. Getting output format right is a real skill — a report that says `Total:1234` instead of `Total: 1,234` gets sent back.
>

---

## Tier 1 — Variables, Types and Printing (Q1–Q12)

## Q1. Hello, You

Print exactly three lines: `Hello, World!`, then your name, then the text `Learning Python`.

```
Hello, World!
Priya Sharma
Learning Python
```

**How to solve:**
1. Call the `print()` function with the string `Hello, World!`.
2. Call the `print()` function with a string containing your name.
3. Call the `print()` function with the string `Learning Python`.

**Explanation:** `print()` adds a newline each time it is called, so three separate calls produce three lines. A single call with `\n` inside the string would look identical in the output but is harder to read and edit.

**Hint:** Three calls to `print()`, one per line.

---

## Q2. Variable Swap Display

Create two variables `a = 10` and `b = 25`. Print them in the format below, then swap their values and print again.

```
Before: a = 10, b = 25
After: a = 25, b = 10
```

**How to solve:**
1. Initialize variables `a` and `b` with their starting values.
2. Print the initial values in the required format.
3. Swap the values using multiple assignment (`a, b = b, a`).
4. Print the swapped values in the required format.

**Hint:** Python lets you write `a, b = b, a` on one line.

**Explanation:** `a, b = b, a` works because Python builds the tuple `(b, a)` on the right **first**, then unpacks it into the names on the left. That is why you do not need a temporary variable — the old values are already safely captured before either name is reassigned.

---

## Q3. Type Detective

Create five variables: an integer, a float, a string, a boolean, and the value `None`. Print each value followed by its type using `type()`.

```
42 <class 'int'>
3.14 <class 'float'>
Python <class 'str'>
True <class 'bool'>
None <class 'NoneType'>
```

**How to solve:**
1. Define five variables, assigning each a value of the specified data type.
2. For each variable, use a `print()` statement.
3. Inside `print()`, pass the variable's value and `type(variable)` separated by a comma.

**Explanation:** `type(x)` returns the class object itself, which prints as `<class 'int'>`. Note `None` has its own type, `NoneType`, and `True` is of type `bool` — not `int`, even though `True == 1` is `True`.

**Hint:** `print(value, type(value))` passes two arguments and prints both.

---

## Q4. Rectangle Area

Ask the user for the length and width of a rectangle. Print the area and the perimeter.

```
Enter length: 12
Enter width: 5
Area: 60
Perimeter: 34
```

**How to solve:**
1. Prompt the user for the length and width, wrapping the `input()` calls in `int()` to cast them to integers.
2. Calculate the area by multiplying the length and width.
3. Calculate the perimeter by multiplying the sum of length and width by 2.
4. Print the calculated area and perimeter.

**Remember:** `input()` always returns a string. You must cast it.

**Explanation:** Area is `12 × 5 = 60`. Perimeter is `2 × (12 + 5) = 34`. The trap is that `input()` hands you the **string** `"12"`, and `"12" * 5` would give `"1212121212"` instead of 60 — no error, just nonsense.

**Hint:** Wrap each `input()` in `int()` before doing arithmetic.

---

## Q5. Seconds Breakdown

Ask the user for a number of seconds. Convert it to hours, minutes and seconds.

```
Enter seconds: 7385
7385 seconds = 2 hours, 3 minutes, 5 seconds
```

**How to solve:**
1. Prompt the user for the number of seconds and cast the input to an integer.
2. Divide the total seconds by 3600 using integer division (`//`) to get the hours.
3. Use modulo (`%`) 3600 to get the remaining seconds.
4. Divide the remaining seconds by 60 using integer division to get the minutes.
5. Use modulo 60 on the remaining seconds to get the final seconds.
6. Print the formatted breakdown string.

**Hint:** Use `//` for whole hours and `%` for the remainder.

**Explanation:** `7385 // 3600 = 2` whole hours. The leftover is `7385 % 3600 = 185` seconds, which gives `185 // 60 = 3` minutes and `185 % 60 = 5` seconds. Each step uses `//` for the whole part and `%` for what remains.

---

## Q6. Temperature Converter

Ask for a temperature in Celsius and print it in Fahrenheit, rounded to 1 decimal place.

Formula: `F = C × 9/5 + 32`

```
Enter Celsius: 37
37.0°C = 98.6°F
```

**How to solve:**
1. Prompt for a Celsius temperature and cast it to a float.
2. Compute the Fahrenheit equivalent using the formula `C * 9 / 5 + 32`.
3. Print the formatted string using f-strings with `:.1f` to round values to 1 decimal place.

**Explanation:** `37 × 9/5 + 32 = 66.6 + 32 = 98.6`. Write `9/5` rather than `9//5` — integer division would give `1`, turning every temperature into `C + 32`.

**Hint:** `f"{value:.1f}"` rounds to one decimal place.

---

## Q7. Simple Interest

Ask for principal, rate and time. Compute simple interest (`P × R × T / 100`) and the total amount. Format both to 2 decimals.

```
Principal: 50000
Rate: 7.5
Time (years): 3
Interest: 11250.00
Total amount: 61250.00
```

**How to solve:**
1. Ask the user for principal, rate, and time, converting them to float.
2. Calculate simple interest using the formula `(P * R * T) / 100`.
3. Compute the total amount by adding the simple interest to the principal.
4. Print both results formatted to 2 decimal places using `:.2f` in an f-string.

**Explanation:** `50000 × 7.5 × 3 / 100 = 11,250.00`, and the total is `50000 + 11250 = 61,250.00`. Simple interest is linear — the same ₹3,750 is added each year, because interest is never earned on interest.

**Hint:** Divide by 100 last to keep the intermediate numbers whole.

---

## Q8. Currency Formatting

Ask for an amount and print it with a rupee symbol and comma separators.

```
Enter amount: 1455300
Total: ₹1,455,300
```

**How to solve:**
1. Prompt for an amount and cast the input to an integer.
2. Use an f-string to print the amount with a leading rupee symbol and a `,` format specifier.

**Hint:** f-strings support `{value:,}` for thousand separators.

**Explanation:** The `,` in `f"{value:,}"` is a format specifier that inserts thousands separators, giving `1,455,300`. Note this is the international grouping, not the Indian lakh/crore style, which would be `14,55,300`.

---

## Q9. Circle Properties

Ask for a radius. Print the circumference and area using `3.14159` as pi, each to 2 decimals.

```
Enter radius: 7
Circumference: 43.98
Area: 153.94
```

**How to solve:**
1. Prompt the user for the radius and cast it to float.
2. Compute the circumference using `2 * 3.14159 * radius`.
3. Compute the area using `3.14159 * (radius ** 2)`.
4. Print the calculated values to 2 decimal places using `:.2f` in an f-string.

**Explanation:** Circumference is `2 × 3.14159 × 7 = 43.98`. Area is `3.14159 × 7² = 153.94`. Use `7 ** 2` or `7 * 7` for the square — `7 ^ 2` is the bitwise XOR operator and silently returns `5`.

**Hint:** `f"{value:.2f}"` for two decimals.

---

## Q10. Integer Division Explorer

Ask for two integers. Print the result of `/`, `//`, `%` and `**` for them, each clearly labelled.

```
First number: 17
Second number: 5
17 / 5 = 3.4
17 // 5 = 3
17 % 5 = 2
17 ** 5 = 1419857
```

**How to solve:**
1. Ask the user for two integers and cast them.
2. Evaluate and print the results of division (`/`), integer division (`//`), modulo (`%`), and exponentiation (`**`).
3. Ensure each result includes an explicit label matching the requested format.

**Explanation:** For `17` and `5`: `/` always returns a float (`3.4`), `//` floors to `3`, `%` gives the remainder `2`, and `**` raises to the power (`1419857`). Note `17 // 5` is `3` while `17 / 5` is `3.4` — the first discards the remainder rather than rounding, so `19 // 5` is also `3`.

**Hint:** Print each on its own line with a label so you can compare them.

---

## Q11. Age in Days

Ask for a person's age in years. Print approximately how many days, hours and minutes they have lived. Use 365 days per year.

```
Enter age: 25
Days: 9125
Hours: 219000
Minutes: 13140000
```

**How to solve:**
1. Prompt for the age and cast to integer.
2. Compute the days lived by multiplying the age by 365.
3. Compute the hours lived by multiplying the days by 24.
4. Compute the minutes lived by multiplying the hours by 60.
5. Print all three values.

**Explanation:** `25 × 365 = 9,125` days. Hours are `9125 × 24 = 219,000`, and minutes are `219000 × 60 = 13,140,000`. Derive each line from the previous number rather than recomputing from the age — fewer places to make a mistake.

**Hint:** Compute days first, then build hours and minutes from that.

---

## Q12. Bill Splitter

Ask for a total bill amount and the number of people. Print each person's share to 2 decimals, and the amount left over in paise if the split is uneven.

```
Bill amount: 2500
Number of people: 3
Each pays: 833.33
Rounding difference: 0.01
```

**How to solve:**
1. Ask the user for the total bill amount (as float) and number of people (as integer).
2. Calculate each person's exact share by dividing the total bill by the number of people.
3. Round the share to 2 decimal places using `round()`.
4. Calculate the rounding difference by subtracting the sum of the rounded shares from the original bill amount.
5. Print the rounded share and the rounding difference formatted to 2 decimals.

**Hint:** Compute `round(total/n, 2) * n` and compare with the original.

**Explanation:** `2500 / 3 = 833.333…`, which rounds to `833.33` each. Three people paying that covers `2499.99`, leaving `0.01` unaccounted for. This is why real billing systems assign the rounding difference to one payer rather than letting it vanish.

---

## Tier 2 — Operators and Expressions (Q13–Q24)

## Q13. Even or Odd

Ask for a number. Print whether it is even or odd. Do **not** use `if` — use the modulo result inside an f-string with a comparison.

```
Enter a number: 47
Is 47 even? False
```

**How to solve:**
1. Ask the user for a number.
2. Evaluate `number % 2 == 0` within an f-string to determine if it is even.
3. Print the formatted result.

**Explanation:** `47 % 2` is `1`, so `47 % 2 == 0` evaluates to `False`. The comparison itself produces a boolean, so you can drop it straight into an f-string with no `if` needed.

**Hint:** `f"Is {n} even? {n % 2 == 0}"` — the expression is evaluated inside the braces.

---

## Q14. Last Digit

Ask for any integer and print its last digit without converting to a string.

```
Enter a number: 48293
Last digit: 3
```

**How to solve:**
1. Prompt for a number and cast it to an integer.
2. Use modulo 10 to extract the last digit.
3. Print the extracted digit.

**Explanation:** `48293 % 10 = 3`. Dividing by 10 leaves a remainder that is always the last digit, because our number system is base 10. The same idea with `% 100` gives the last two digits.

**Hint:** Modulo by 10.

---

## Q15. Digit Sum of a 3-Digit Number

Ask for a 3-digit number. Extract each digit using `//` and `%`, then print the digits and their sum.

```
Enter a 3-digit number: 472
Digits: 4 7 2
Sum: 13
```

**How to solve:**
1. Prompt for a 3-digit number.
2. Extract each digit using combinations of integer division `//` and modulo `%`.
3. Calculate the sum of the digits and print both the digits and the sum.

**Explanation:** For `472`: `472 // 100 = 4` isolates the hundreds; `(472 // 10) % 10 = 7` shifts right one place then takes the last digit; `472 % 10 = 2`. Their sum is `13`. Each digit is extracted by combining a shift (`//`) with a remainder (`%`).

**Hint:** Get the hundreds with `// 100`, the units with `% 10`, and the tens by combining both.

---

## Q16. Reverse a 3-Digit Number

Using only arithmetic, reverse a 3-digit number.

```
Enter a 3-digit number: 472
Reversed: 274
```

**How to solve:**
1. Read a 3-digit number from the user.
2. Extract the hundreds, tens, and units digits.
3. Reconstruct the reversed number by multiplying the extracted units by 100, tens by 10, and hundreds by 1, then summing them.

**Explanation:** `472` reversed is `(2 × 100) + (7 × 10) + 4 = 274`. You are rebuilding the number with the place values swapped: the units digit becomes the hundreds digit, the hundreds digit becomes the units.

**Hint:** Extract all three digits as in Q15, then multiply each by its new place value.

---

## Q17. Comparison Chain

Ask for three numbers. Using comparison and logical operators only (no `if`), print whether the first is the largest.

```
a: 15
b: 9
c: 12
Is a the largest? True
```

**How to solve:**
1. Ask the user for three numbers.
2. Use the `and` operator to evaluate if the first number is greater than the other two.
3. Print the boolean result directly within an f-string.

**Explanation:** `15 > 9 and 15 > 12` is `True and True`, so the answer is `True`. A comparison already produces a boolean, so combining them with `and` gives you the answer directly — no `if` statement required.

**Hint:** Two comparisons joined by `and`, placed inside an f-string.

---

## Q18. Logical Truth Table

Print a truth table for `and`, `or` and `not` over `True` and `False`. No loops needed — write it out.

```
A     B     A and B   A or B    not A
True  True  True      True      False
True  False False     True      False
False True  False     True      True
False False False     False     True
```

**How to solve:**
1. Print the header row with appropriate spacing.
2. Manually determine the boolean outcome of each logical combination.
3. Print each row using formatting to ensure the columns align.

**Explanation:** `and` is `True` only when both sides are; `or` is `True` when at least one is; `not` flips the value. The only surprising row is `False or False`, which is `False` — `or` needs at least one `True`.

**Hint:** Print a header line, then one line per combination. String literals are fine here.

---

## Q19. Bitwise Basics

Ask for two integers. Print the result of `&`, `|`, `^`, `<<1` and `>>1` for the first number.

```
a: 12
b: 10
a & b = 8
a | b = 14
a ^ b = 6
a << 1 = 24
a >> 1 = 6
```

**How to solve:**
1. Read two integers from the user.
2. Evaluate and print the results for bitwise AND (`&`), OR (`|`), and XOR (`^`).
3. Evaluate and print the results for left shift (`<<`) and right shift (`>>`) on the first integer.

**Explanation:** `12` is `1100` in binary and `10` is `1010`. AND keeps bits set in both (`1000` = 8); OR keeps bits set in either (`1110` = 14); XOR keeps bits set in exactly one (`0110` = 6). Shifting left doubles (`24`), shifting right halves and discards the remainder (`6`).

**Hint:** Write out both numbers in binary on paper first — the results become obvious.

---

## Q20. Check Power of Two

Determine whether a number is a power of two using a **single bitwise expression**.

```
Enter a number: 64
Is power of two? True
```

**How to solve:**
1. Read an integer from the user.
2. Evaluate the bitwise expression `n & (n - 1) == 0`.
3. Print the boolean outcome inside an f-string.

**Hint:** For any power of two `n`, the expression `n & (n - 1)` equals 0.

**Explanation:** `64` is `1000000` and `63` is `0111111`. A power of two has exactly one bit set, so subtracting 1 flips that bit off and turns every bit below it on. The two numbers therefore share no bits and `64 & 63 == 0`. Any number with two or more bits set keeps at least one bit in common.

---

## Q21. Membership Test

Ask the user for a single character. Using the `in` operator on a string of vowels, print whether it is a vowel.

```
Enter a character: e
Is vowel? True
```

**How to solve:**
1. Ask the user for a character.
2. Convert the character to lowercase (or check against both cases).
3. Use the `in` operator to check if it's within the string of vowels.

**Explanation:** `in` tests membership, so `"e" in "aeiou"` is `True`. Handle case by lowercasing the input first, or by putting both cases in the vowel string.

**Hint:** `"aeiou"` is just a string, and `in` searches it directly.

---

## Q22. Identity vs Equality

Create two variables holding the value `1000` as separate literals, and two holding `100`. Print the result of `==` and `is` for both pairs, and explain in a comment what you observe.

```
1000 == 1000 -> True
1000 is 1000 -> ?
100 == 100 -> True
100 is 100 -> ?
```

**How to solve:**
1. Assign the value `1000` to two distinct variables and `100` to two other distinct variables.
2. Print the evaluation of `==` and `is` for both pairs.
3. Observe the output and add a comment explaining the results.

**Note:** The `is` results may surprise you. Small integers are cached by Python; large ones may not be. Write down what your version does.

**Explanation:** `==` compares **value** and is always `True` here. `is` compares **identity**. Python caches small integers from -5 to 256, so those are always the same object. Larger integers are not cached — but if both `1000` literals sit in the same block of code, the compiler may still fold them into one constant, so `is` can print `True` anyway. Force the issue with `b = int("1000")`: then `a is b` is `False` while `a == b` stays `True`. **Use `==` for values, always.**

**Hint:** Try it again with `int("1000")` and see whether the answer changes.

---

## Q23. Precedence Puzzle

Without running it, predict the output of each expression below. Then run them and check.

```python
print(2 + 3 * 4 ** 2)
print((2 + 3) * 4 ** 2)
print(10 - 4 - 3)
print(2 ** 3 ** 2)
print(not True and False)
print(True or False and False)
```

**How to solve:**
1. Review each expression and apply order of operations precedence.
2. Document your prediction in a comment above each print statement.
3. Run the code and compare the outputs.

Write your prediction as a comment above each line before running.

**Explanation:** `**` binds tightest, then `*`, then `+`. So `2 + 3 * 4 ** 2` is `2 + 3 × 16 = 50`, while brackets force `(2+3) × 16 = 80`. `-` is left-to-right so `10 - 4 - 3 = 3`, but `**` is **right**-to-left, making `2 ** 3 ** 2` equal `2 ** 9 = 512`, not `8 ** 2 = 64`. `and` binds tighter than `or`, so `True or (False and False)` is `True`.

**Hint:** The two that catch people are `2 ** 3 ** 2` and the `and`/`or` line.

---

## Q24. Compound Interest

Ask for principal, annual rate and years. Compute compound interest using `A = P(1 + r/100)**t`. Print the amount and the interest earned, both to 2 decimals.

```
Principal: 100000
Rate: 8
Years: 5
Amount: 146932.81
Interest earned: 46932.81
```

**How to solve:**
1. Read principal, rate, and time as floats.
2. Calculate the final amount using the compound interest formula `P * (1 + r/100)**t`.
3. Calculate the interest earned by subtracting the principal from the final amount.
4. Print both values to 2 decimal places.

**Explanation:** `100000 × 1.08⁵ = 146,932.81`, so the interest is `46,932.81` — noticeably more than simple interest would give (`₹40,000`), because each year's interest earns interest in the years that follow.

**Hint:** `(1 + r/100) ** t` — the whole bracket is raised to the power.

---

## Tier 3 — Conditionals (Q25–Q36)

## Q25. Positive, Negative or Zero

Ask for a number and classify it.

```
Enter a number: -14
Negative
```

**How to solve:**
1. Prompt for a number and cast to float or int.
2. Use an `if/elif/else` structure to check if it's > 0, < 0, or zero.
3. Print the corresponding classification.

**Explanation:** Three outcomes need `if`/`elif`/`else`. Test `> 0` and `< 0` explicitly and let `else` catch zero — testing `== 0` first also works, but relying on `else` for it means one fewer comparison to get wrong.

**Hint:** Order the branches so every number falls into exactly one.

---

## Q26. Largest of Three

Ask for three numbers and print the largest, using `if`/`elif`/`else`. Do not use `max()`.

```
a: 34
b: 71
c: 28
Largest: 71
```

**How to solve:**
1. Ask for three numbers and cast them.
2. Use an `if` statement to check if the first is largest, an `elif` for the second, and an `else` for the third.
3. Print the largest value.

**Explanation:** With `34`, `71`, `28` the answer is `71`. The standard shape is: check whether `a` beats both others, `elif` `b` beats both, `else` it must be `c`. The final branch needs no condition, because if the first two failed then `c` is the only candidate left.

**Hint:** `if a >= b and a >= c:` — comparing against both others in one condition.

---

## Q27. Grade Calculator

Ask for a mark out of 100 and print the grade:

| Marks | Grade |
| --- | --- |
| 90–100 | A+ |
| 80–89 | A |
| 70–79 | B |
| 60–69 | C |
| 40–59 | D |
| Below 40 | Fail |

```
Enter marks: 84
Grade: A
```

Also reject invalid input: marks below 0 or above 100 should print `Invalid marks`.

**How to solve:**
1. Ask for the marks and cast to float/int.
2. First check if the marks are invalid (<0 or >100).
3. Use a descending `elif` chain (>=90, >=80, etc.) to assign the grade.
4. Print the final grade.

**Explanation:** `84` falls in the 80–89 band, so the grade is `A`. Because `elif` only runs when every branch above it failed, you can write `elif marks >= 80` without repeating `and marks <= 89` — reaching that line already proves the mark is below 90. Validate the 0–100 range **before** the grade chain.

**Hint:** Test from the highest grade downwards so each `elif` needs only one comparison.

---

## Q28. Leap Year

Ask for a year and determine whether it is a leap year.

A year is a leap year if it is divisible by 4, **except** century years, which must be divisible by 400.

```
Enter year: 1900
1900 is not a leap year
```

Test with 2000, 1900, 2024 and 2023.

**How to solve:**
1. Read the year as an integer.
2. Determine if it's a leap year using the rule: divisible by 4 AND (not divisible by 100 OR divisible by 400).
3. Print the appropriate output.

**Explanation:** `1900` is divisible by 4 and by 100, but **not** by 400, so it is not a leap year. `2000` is divisible by 400, so it is. `2024` is divisible by 4 and not a century year, so it is. `2023` fails immediately. The rule is: divisible by 4, **and** either not divisible by 100 or divisible by 400.

**Hint:** `year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)` in a single expression.

---

## Q29. Triangle Validity

Ask for three side lengths. Print whether they can form a triangle (the sum of any two sides must exceed the third), and if so, whether it is equilateral, isosceles or scalene.

```
Side 1: 5
Side 2: 5
Side 3: 8
Valid triangle: Isosceles
```

**How to solve:**
1. Read the three side lengths as numbers.
2. Check if they form a valid triangle (`a+b>c and a+c>b and b+c>a`).
3. If valid, check for equilateral (3 equal sides), isosceles (2 equal sides), or scalene (no equal sides) and print the classification.

**Explanation:** `5 + 5 = 10 > 8`, and the other two pairs clearly pass, so the triangle is valid. Two sides are equal and the third differs, making it isosceles. Check validity **first** — classifying an impossible triangle produces a confident, meaningless answer.

**Hint:** Three inequality checks for validity, then compare the sides for equality.

---

## Q30. Electricity Bill

Ask for units consumed and compute the bill using slab rates:

| Units | Rate per unit |
| --- | --- |
| First 100 | ₹3 |
| Next 100 (101–200) | ₹5 |
| Next 100 (201–300) | ₹8 |
| Above 300 | ₹12 |

Charges are **cumulative** — 250 units costs `100×3 + 100×5 + 50×8`.

```
Enter units: 250
Bill: ₹1200
```

**How to solve:**
1. Read the number of units consumed.
2. Use a cumulative approach: if units > 300, compute the 300+ chunk, then subtract it. Repeat for each slab.
3. Sum the charges and print the final bill.

**Explanation:** `250` units costs `100×3 + 100×5 + 50×8 = 300 + 500 + 400 = ₹1,200`. The slabs are cumulative, so only the units **inside** each band are charged at that band's rate. Charging all 250 units at ₹8 would give ₹2,000 — the classic mistake, and it produces a bill that looks plausible.

**Hint:** Subtract each completed slab as you go: how many units are left after the first 100?

---

## Q31. Income Tax Slabs

Ask for annual income and compute tax using these cumulative slabs:

| Income range | Rate |
| --- | --- |
| Up to ₹2,50,000 | 0% |
| ₹2,50,001 – ₹5,00,000 | 5% |
| ₹5,00,001 – ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

```
Enter annual income: 1200000
Tax payable: ₹172500.00
```

Verify by hand: `0 + 12500 + 100000 + 60000 = 172500`.

**How to solve:**
1. Read the annual income.
2. Calculate tax in cumulative slabs using `if/elif` logic, subtracting the base of each slab to find the taxable amount at that rate.
3. Print the calculated tax to 2 decimal places.

**Explanation:** `0 + 12,500 + 100,000 + 60,000 = ₹172,500.00`. The first ₹2.5 lakh is free; the next ₹2.5 lakh is taxed at 5% (₹12,500); the next ₹5 lakh at 20% (₹100,000); and only the final ₹2 lakh at 30% (₹60,000). Nobody pays 30% on their whole income — the same cumulative logic as Q30.

**Hint:** Work out how much income falls in each band before multiplying by its rate.

---

## Q32. Character Classifier

Ask for a single character and classify it as uppercase letter, lowercase letter, digit, or special character. Use comparison operators on the character itself, not string methods.

```
Enter a character: 7
Digit
```

**How to solve:**
1. Read a single character string.
2. Use range comparisons (e.g., `'a' <= ch <= 'z'`) to classify it as uppercase, lowercase, or digit.
3. Use `else` for special characters and print the classification.

**Hint:** `'0' <= ch <= '9'` works because characters compare by their codes.

**Explanation:** `'0' <= ch <= '9'` is `True` for `"7"`, so it is classified as a digit. Characters compare by their underlying codes, and digits, uppercase letters and lowercase letters each occupy a contiguous block, which is what makes the range test work.

---

## Q33. Calculator with Validation

Ask for two numbers and an operator (`+`, `-`, `*`, `/`, `%`). Perform the operation. Handle division by zero and an unrecognised operator gracefully.

```
First number: 10
Operator: /
Second number: 0
Error: cannot divide by zero
```

**How to solve:**
1. Read two numbers and an operator character.
2. Explicitly check for `/` or `%` combined with a zero divisor before evaluating.
3. Execute the operation matching the string operator and print the result or an error if invalid.

**Explanation:** Division by zero must be caught **before** dividing — testing the operator and then the divisor. Checking after the fact is too late, because the error has already been raised. An unrecognised operator falls through to a final `else`.

**Hint:** Check `if op == '/' and b == 0:` before performing any arithmetic.

---

## Q34. BMI Category

Ask for weight in kg and height in metres. Compute BMI (`weight / height²`), print it to 1 decimal, and classify:

| BMI | Category |
| --- | --- |
| Below 18.5 | Underweight |
| 18.5–24.9 | Normal |
| 25.0–29.9 | Overweight |
| 30.0 and above | Obese |

```
Weight (kg): 68
Height (m): 1.75
BMI: 22.2
Category: Normal
```

**How to solve:**
1. Prompt for weight and height as floats.
2. Compute BMI as `weight / (height ** 2)`.
3. Use an `if/elif` chain to classify the BMI into the correct category and print it.

**Explanation:** `68 / 1.75² = 68 / 3.0625 = 22.2`, which sits in the 18.5–24.9 band, so the category is Normal. Square the height, do not double it — `1.75 * 2` gives `3.5` and a plausible-looking BMI of 19.4.

**Hint:** `height ** 2`, and round only when printing.

---

## Q35. Ticket Pricing

A cinema charges ₹250 base. Apply these rules **in order**:

- Age under 12 or over 60: 50% off
- Student (ask yes/no): additional ₹30 off
- Tuesday (ask yes/no): additional 20% off the running total

Print the final price to 2 decimals.

```
Age: 65
Student? (yes/no): no
Tuesday? (yes/no): yes
Final price: ₹100.00
```

**How to solve:**
1. Start with the base price of ₹250.
2. Check age and apply a 50% discount if applicable.
3. Check student status and subtract ₹30 if applicable.
4. Check if it's Tuesday and apply a 20% discount on the current running total.
5. Print the final price formatted to 2 decimals.

**Explanation:** Age 65 qualifies for 50% off: `250 → 125`. Not a student, so no ₹30 comes off. Tuesday takes 20% off the **running total**: `125 × 0.8 = ₹100.00`. Order matters — applying the 20% before the age discount would give the same answer here, but adding the flat ₹30 at a different point would not.

**Hint:** Keep one `price` variable and modify it step by step, in the order given.

---

## Q36. Nested Conditions — Loan Eligibility

Ask for age, monthly income and credit score. Approve a loan only if **all** of these hold: age between 21 and 60, income at least ₹25,000, and credit score at least 700. If rejected, print the **first** reason that failed.

```
Age: 30
Monthly income: 22000
Credit score: 750
Rejected: income below 25000
```

**How to solve:**
1. Read the three inputs.
2. Check each condition in order using `if` and `elif` for failures, printing the specific rejection reason.
3. Use a final `else` for approval when all checks pass.

**Explanation:** Age 30 passes, income ₹22,000 fails the ₹25,000 minimum, so that is the reason reported — the credit score is never examined. Checking conditions in order and stopping at the first failure is what lets you name a specific reason instead of a generic rejection.

**Hint:** Use `if` / `elif` for the failure cases, and put the approval in the final `else`.

---

## Tier 4 — Loops (Q37–Q50)

## Q37. Count to N

Ask for a number `n` and print every integer from 1 to `n` on one line, separated by spaces.

```
Enter n: 10
1 2 3 4 5 6 7 8 9 10
```

**How to solve:**
1. Ask the user for a number `n`.
2. Use a `for` loop with `range(1, n + 1)`.
3. Print each number inside the loop, setting `end=" "` to avoid newlines.

**Hint:** `print(i, end=" ")` prints without a newline.

**Explanation:** `range(1, n + 1)` runs from 1 up to and including `n`. The `+ 1` is needed because `range` excludes its endpoint, so `range(1, 10)` would stop at 9.

---

## Q38. Sum and Average

Ask for `n`, then read `n` numbers one at a time. Print their sum and average.

```
How many numbers? 4
Number 1: 10
Number 2: 25
Number 3: 8
Number 4: 17
Sum: 60
Average: 15.00
```

**How to solve:**
1. Read the number of elements `n`.
2. Initialise a `total = 0` variable.
3. Use a loop that runs `n` times to ask for a number and add it to `total`.
4. After the loop, calculate the average and print both total and average.

**Explanation:** `10 + 25 + 8 + 17 = 60`, and `60 / 4 = 15.00`. Keep a running total inside the loop rather than trying to store the numbers — you do not have lists yet, and a running total is what you would use anyway.

**Hint:** Initialise `total = 0` before the loop, then add to it each pass.

---

## Q39. Multiplication Table

Ask for a number and print its table from 1 to 10, aligned.

```
Enter a number: 7
7 x  1 =  7
7 x  2 = 14
...
7 x 10 = 70
```

**How to solve:**
1. Ask the user for a number.
2. Use a `for` loop running from 1 to 10.
3. In each iteration, multiply the number by the loop variable.
4. Print the result formatted nicely with fixed widths (e.g., `f"{n} x {i:2} = {n*i:2}"`).

**Explanation:** One loop from 1 to 10, printing `n × i` each time. The alignment comes from a width specifier such as `f"{i:2}"` and `f"{n*i:2}"`, which pads short numbers with a leading space so the columns line up.

**Hint:** `f"{n} x {i:2} = {n*i:2}"`.

---

## Q40. Factorial

Ask for a non-negative integer and compute its factorial with a loop. Reject negative input.

```
Enter a number: 6
6! = 720
```

**How to solve:**
1. Read the integer `n` and ensure it's non-negative.
2. Initialize `result = 1`.
3. Use a `for` loop to iterate from 1 to `n`.
4. Multiply `result` by each number and print the final factorial.

**Explanation:** `6! = 6 × 5 × 4 × 3 × 2 × 1 = 720`. Start the accumulator at **1**, not 0 — starting at 0 makes every product zero, which is a silent, total failure. `0!` is defined as 1, so a correct loop handles it with no special case.

**Hint:** `result = 1` before the loop, then multiply by each value.

---

## Q41. Fibonacci Series

Ask for `n` and print the first `n` Fibonacci numbers.

```
Enter n: 10
0 1 1 2 3 5 8 13 21 34
```

**How to solve:**
1. Read `n`.
2. Initialize two variables, e.g., `a = 0` and `b = 1`.
3. Loop `n` times, printing `a` on each pass.
4. Update the variables to the next terms using multiple assignment `a, b = b, a + b`.

**Explanation:** `0 1 1 2 3 5 8 13 21 34`. Each term is the sum of the two before it. Track just two variables and advance them together with `a, b = b, a + b` — the same simultaneous-assignment trick as Q2.

**Hint:** Start with `a, b = 0, 1` and print `a` each pass.

---

## Q42. Prime Check

Ask for a number and determine whether it is prime. Optimise by looping only up to the square root.

```
Enter a number: 97
97 is prime
```

**How to solve:**
1. Read a number `n`.
2. If `n < 2`, it's not prime.
3. Use a `while` loop starting from 2 up to the square root (`i * i <= n`).
4. If `n % i == 0`, it's not prime. Otherwise, it is prime.

**Hint:** Loop `i` from 2 while `i * i <= n`.

**Explanation:** `97` has no divisor up to `√97 ≈ 9.85`, so it is prime. Checking beyond the square root is wasted work: if `n = p × q` and both were larger than `√n`, their product would exceed `n`. So any factor pair must include one value at or below the square root.

---

## Q43. Primes in a Range

Print all prime numbers between two user-supplied bounds, and count them.

```
Start: 10
End: 50
11 13 17 19 23 29 31 37 41 43 47
Count: 11
```

**How to solve:**
1. Ask for a start and end range.
2. Use an outer loop to iterate through every number in the range.
3. Use an inner loop to check if the current number is prime.
4. Keep a running count and print each prime found.

**Explanation:** Between 10 and 50 there are **11** primes: `11 13 17 19 23 29 31 37 41 43 47`. This is Q42's test wrapped in an outer loop — a nested loop where the inner one decides primality and the outer one supplies candidates.

**Hint:** Reuse the Q42 logic inside a loop over the range, with a counter.

---

## Q44. Digit Operations

Ask for any positive integer. Using a loop, print the number of digits, the sum of digits, and the number reversed.

```
Enter a number: 94721
Digits: 5
Sum: 23
Reversed: 12749
```

**How to solve:**
1. Prompt for a number and initialize count=0, sum=0, reversed=0.
2. Use a `while number > 0` loop.
3. In each pass, extract the last digit with `% 10`. Update count, sum, and reverse variables.
4. Shrink the number using integer division `// 10` and repeat until 0.

**Explanation:** For `94721`: 5 digits, digit sum `9+4+7+2+1 = 23`, reversed `12749`. One loop can produce all three — strip the last digit with `% 10`, add it to the sum, build the reversal with `rev = rev * 10 + digit`, then shrink the number with `n //= 10` and repeat until it hits 0.

**Hint:** `while n > 0:` and shrink `n` by `// 10` each pass.

---

## Q45. Armstrong Number

An Armstrong number of `d` digits equals the sum of its digits each raised to the power `d`. For example `153 = 1³ + 5³ + 3³`. Check whether a number is Armstrong.

```
Enter a number: 9474
9474 is an Armstrong number
```

**Test with:** 153, 370, 9474, 9475.

**How to solve:**
1. Ask for a number.
2. Store the original number and find the number of digits.
3. Use a `while` loop to extract each digit and add its value raised to the power of the digit count to a running sum.
4. Compare the sum with the original number.

**Explanation:** `9474` has 4 digits and `9⁴ + 4⁴ + 7⁴ + 4⁴ = 6561 + 256 + 2401 + 256 = 9474`, so it qualifies. `9475` does not. The exponent is the **digit count**, not a fixed 3 — hard-coding 3 works for 153 and 370 and then fails silently on the four-digit cases.

**Hint:** Count the digits first, then loop again to accumulate the powered sum.

---

## Q46. GCD and LCM

Ask for two numbers. Compute their GCD using the Euclidean algorithm (repeatedly replace the pair `(a, b)` with `(b, a % b)` until `b` is 0), then LCM as `a * b // gcd`.

```
First: 48
Second: 60
GCD: 12
LCM: 240
```

**How to solve:**
1. Prompt for two numbers, `a` and `b`.
2. Save the original values.
3. Use a `while b:` loop replacing `a, b` with `b, a % b` until `b` is 0 to find the GCD.
4. Compute LCM using the formula `(original_a * original_b) // GCD`.

**Explanation:** `gcd(48, 60)`: `60 % 48 = 12`, then `48 % 12 = 0`, so the GCD is `12`. LCM is `48 × 60 // 12 = 240`. Euclid's method works because any common divisor of two numbers also divides their remainder, so the pair shrinks fast while keeping the same GCD.

**Hint:** `while b:` then `a, b = b, a % b`. The answer is left in `a`.

---

## Q47. Number Guessing Game

Pick a secret number (hard-code it, e.g. 42). Let the user guess repeatedly. After each wrong guess say "Too high" or "Too low". Count the attempts and stop when correct.

```
Guess: 50
Too high
Guess: 25
Too low
Guess: 42
Correct! You took 3 attempts.
```

**How to solve:**
1. Hardcode a secret integer.
2. Use a `while True` loop with a counter to take guesses.
3. If the guess is correct, break the loop. If higher/lower, print the appropriate hint.
4. Print the final success message with the total attempts.

**Explanation:** A `while True` loop with a counter, broken by `break` when the guess is right. Increment the counter on **every** guess including the last, or your final tally is one short.

**Hint:** Compare with `>` and `<` to choose the message, and `break` on equality.

---

## Q48. Menu-Driven Program

Build a loop-based menu:

```
1. Add
2. Subtract
3. Multiply
4. Exit
Choice:
```

For options 1–3, ask for two numbers and show the result, then show the menu again. Option 4 exits. Handle invalid choices.

**How to solve:**
1. Use a `while True` loop to display the menu options on every pass.
2. Ask for the user's choice. If 4, `break` the loop.
3. For choices 1, 2, or 3, read two numbers and perform the requested math operation.
4. Handle any invalid strings safely.

**Explanation:** A `while True` loop that reprints the menu each pass, with `break` on the exit option. Read the choice as a string and compare to `"1"`, or cast it — but if you cast, non-numeric input raises `ValueError` and crashes the menu.

**Hint:** Show the menu inside the loop, not before it, so it reappears after each operation.

---

## Q49. Collatz Sequence

Start with any positive integer `n`. If even, halve it. If odd, compute `3n + 1`. Repeat until you reach 1. Print the full sequence and the number of steps.

```
Enter n: 6
6 3 10 5 16 8 4 2 1
Steps: 8
```

**How to solve:**
1. Prompt for a number `n`.
2. Initialize a counter for steps.
3. Use a `while n != 1` loop, incrementing the counter each pass.
4. Inside, use `if/else` to update `n` based on whether it is even or odd.
5. Print the full sequence and the total steps.

**Explanation:** From 6: `6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1`. That is 9 numbers and therefore **8** steps — the count of arrows, not of values. Off-by-one here is the most likely mistake.

**Hint:** `while n != 1:` and increment a counter inside the loop.

---

## Q50. Perfect Numbers

A perfect number equals the sum of its proper divisors (`6 = 1 + 2 + 3`). Find all perfect numbers below 10,000.

```
6 28 496 8128
```

**How to solve:**
1. Loop `n` from 1 to 9999.
2. For each `n`, initialize a sum of divisors to 0.
3. Iterate from 1 up to `n // 2` to find divisors and add them to the sum.
4. If the sum equals `n`, print the number.

**Explanation:** The perfect numbers below 10,000 are `6, 28, 496, 8128`. For each candidate, sum the divisors below it and compare. A plain double loop tests around 50 million pairs and takes a few seconds — stopping the inner loop at `n // 2` roughly halves that, since no divisor other than `n` itself can exceed half.

**Hint:** Outer loop over candidates, inner loop accumulating divisors that divide evenly.

---

## Tier 5 — Pattern Printing (Q51–Q56)

Each of these uses nested loops. Ask the user for `n` (the number of rows) in every case.

## Q51. Right Triangle of Stars

```
n = 5
*
**
***
****
*****
```

**How to solve:**
1. Ask the user for `n`.
2. Use a `for` loop from 1 to `n` (inclusive).
3. In each iteration, print `*` multiplied by the current loop variable `i`.

**Explanation:** Row `i` prints `i` stars, so the inner loop runs `i` times. `print("*" * i)` does the same job without an inner loop, which is worth noticing — string repetition often replaces a whole loop.

**Hint:** `for i in range(1, n + 1):` then print `i` stars.

---

## Q52. Inverted Right Triangle

```
n = 5
*****
****
***
**
*
```

**How to solve:**
1. Prompt for `n`.
2. Use a loop that counts downwards from `n` to 1.
3. In each pass, multiply the `*` string by the loop counter and print it.

**Explanation:** Row `i` prints `n - i + 1` stars. Alternatively, count **down** with `range(n, 0, -1)` and print `i` stars, which keeps the body identical to Q51 and moves all the change into the range.

**Hint:** Either reverse the range or invert the count inside the loop.

---

## Q53. Centred Pyramid

```
n = 5
    *
   ***
  *****
 *******
*********
```

**How to solve:**
1. Prompt for `n`.
2. Loop `i` from 1 to `n`.
3. Print `n - i` spaces concatenated with `2 * i - 1` stars.

**Hint:** Row `i` needs `n - i` spaces followed by `2i - 1` stars.

**Explanation:** Row `i` needs `n - i` leading spaces and `2i - 1` stars: row 1 is 4 spaces and 1 star, row 5 is 0 spaces and 9 stars. The star count is always odd, which is what makes the pyramid symmetrical around its centre.

---

## Q54. Number Triangle

```
n = 5
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

**How to solve:**
1. Read `n`.
2. Use an outer loop from 1 to `n`.
3. Inside, use an inner loop from 1 to the current outer loop value.
4. Print the inner loop variable with `end=" "`, and use a blank `print()` after the inner loop.

**Explanation:** Row `i` prints the numbers 1 to `i`, so the inner loop is `range(1, i + 1)`. Use `print(j, end=" ")` inside and a bare `print()` after the inner loop to end the line.

**Hint:** The inner loop's endpoint depends on the outer loop's variable.

---

## Q55. Floyd's Triangle

Numbers increase continuously across rows.

```
n = 4
1
2 3
4 5 6
7 8 9 10
```

**How to solve:**
1. Read `n`.
2. Initialize a counter to 1 before the loops.
3. Use an outer loop for the rows and an inner loop for the columns of each row.
4. Print the counter, increment it, and print a newline at the end of each row.

**Explanation:** The counter never resets between rows — it keeps rising across the whole triangle, so 4 rows end at `1+2+3+4 = 10`. Declare the counter **before** the outer loop; putting it inside restarts each row and gives you Q54 again.

**Hint:** One counter outside both loops, incremented after every number printed.

---

## Q56. Pascal's Triangle

Each number is the sum of the two above it. Print `n` rows, centred.

```
n = 5
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
```

**How to solve:**
1. Read `n`.
2. Loop `row` from 0 to `n - 1`.
3. Print leading spaces for formatting.
4. Use a nested loop to calculate the value dynamically based on the previous column's value and print it.

**Hint:** Without lists, compute each entry from the previous one using the formula `value = value * (row - col) // (col + 1)`, starting each row at 1.

**Explanation:** Row 4 is `1 4 6 4 1`. Each entry comes from the one to its left: multiply by `(row - col)` and integer-divide by `(col + 1)`. Starting from 1: `1×4//1 = 4`, `4×3//2 = 6`, `6×2//3 = 4`, `4×1//4 = 1`. This avoids needing to store the previous row, which you cannot do without lists.

---

## Tier 6 — Combining Everything (Q57–Q60)

These are longer. Expect 20–40 minutes each.

## Q57. ATM Simulator

Start with a balance of ₹10,000 and a hard-coded PIN of `1234`.

1. Ask for the PIN. Allow **3 attempts**, then lock and exit.
2. On success, show a menu: Check Balance, Deposit, Withdraw, Exit.
3. Deposits must be positive.
4. Withdrawals must be positive, a multiple of 100, and not exceed the balance.
5. After every transaction, show the updated balance.
6. Count and display the total number of transactions on exit.

```
Enter PIN: 1234
1. Balance  2. Deposit  3. Withdraw  4. Exit
Choice: 3
Amount: 2500
Withdrawn ₹2500. Balance: ₹7500
```

**How to solve:**
1. Handle PIN authentication with a loop and a 3-attempt limit.
2. If successful, enter a `while True` main menu loop.
3. Implement `Deposit` and `Withdraw` using conditional statements to validate amounts.
4. Maintain a running balance and a transaction counter, then print them appropriately.

**Explanation:** Four separate pieces of state: attempt count, balance, transaction count, and the menu loop. The multiple-of-100 rule is `amount % 100 == 0`. Validate in order — positive, then multiple of 100, then affordable — so the message names the actual problem.

**Hint:** One loop for the PIN with its own counter, then a second `while True` for the menu.

---

## Q58. Student Report Card

Ask for a student's name, then marks in 5 subjects one at a time. Validate each mark is 0–100 — if invalid, ask again for that same subject.

Then print:

- Total and percentage (2 decimals)
- Overall grade using the Q27 scale
- Whether the student passed (all subjects ≥ 40)
- The highest and lowest mark entered

```
Student name: Rohan
Subject 1 marks: 78
Subject 2 marks: 105
Invalid. Enter marks between 0 and 100.
Subject 2 marks: 85
...
Total: 401 / 500
Percentage: 80.20
Grade: A
Result: PASS
Highest: 92  Lowest: 71
```

**How to solve:**
1. Ask for the student's name.
2. Loop 5 times to collect marks, using an inner loop to ensure each mark is between 0 and 100.
3. Accumulate total marks, keep track of highest and lowest, and track if any subject is < 40.
4. Compute percentage, assign grade via `if/elif`, and print the final report.

**Note:** You cannot store the marks in a list yet. Track the running total, highest and lowest as you go.

**Explanation:** `401 / 500 × 100 = 80.20%`, which is grade `A` on the Q27 scale. Without lists you must track four running values: total, highest, lowest, and whether any mark fell below 40. Seed the highest at a very low number and the lowest at a very high one, or seed both from the first mark entered.

**Hint:** Re-ask for the same subject with an inner `while` until the mark is valid.

---

## Q59. Number Analysis Report

Ask how many numbers the user will enter, then read them one at a time. Without using a list, report:

- Count of positives, negatives and zeros
- Count of even and odd numbers
- Sum, average (2 decimals), maximum and minimum
- The largest prime entered (or "None" if there were no primes)

```
How many numbers? 6
Number 1: 17
Number 2: -4
Number 3: 0
Number 4: 23
Number 5: 8
Number 6: -11
Positives: 3  Negatives: 2  Zeros: 1
Even: 3  Odd: 3
Sum: 33  Average: 5.50
Max: 23  Min: -11
Largest prime: 23
```

**How to solve:**
1. Read the total count of numbers to process.
2. Initialize multiple tracking variables (positives, negatives, sum, max, min, largest prime).
3. Loop `n` times to process each number dynamically.
4. For each number, update counters, compare for min/max, test for primality, and update largest prime.

**Explanation:** For `17, -4, 0, 23, 8, -11`: 3 positive, 2 negative, 1 zero; 3 even and 3 odd (zero counts as even); sum `33`, average `5.50`, max `23`, min `-11`, largest prime `23`. Note the counts must reconcile — positives plus negatives plus zeros must equal the total, and that is a free check on your logic.

**Hint:** One pass, several counters. Track the largest prime as you go rather than storing anything.

---

## Q60. Multiplication Table Grid

Print a formatted multiplication grid from 1 to `n`, with row and column headers and separating lines.

```
Enter n: 5

     |    1    2    3    4    5
-----+-------------------------
   1 |    1    2    3    4    5
   2 |    2    4    6    8   10
   3 |    3    6    9   12   15
   4 |    4    8   12   16   20
   5 |    5   10   15   20   25
```

**How to solve:**
1. Read `n`.
2. Use a `for` loop to print the top column headers and separator line.
3. Use an outer loop for rows, starting each by printing the row header.
4. Use an inner loop to print the multiplied values, formatting each cell to a fixed width.

**Hint:** Use `f"{value:>5}"` to right-align each cell in 5 characters.

**Explanation:** A nested loop with `f"{value:>5}"` right-aligning every cell in 5 characters, so single and double digits still line up. The header row and the separator line are printed before the loops start; the row header is printed at the start of each outer pass.

---

## Checking your work

There are no solutions in this file, and that is deliberate. Instead:

1. **Test the edge cases.** For every question, ask: what happens with 0? With a negative? With 1? With a very large number?
2. **Verify by hand.** Q31's tax answer is checkable with a calculator. Q45's Armstrong numbers are listed. Q50's perfect numbers are `6, 28, 496, 8128`.
3. **Re-solve from scratch after a week.** If you can write Q42 (prime check) from memory in under 5 minutes, you own it. If not, you recognised the answer rather than knowing it.

> ⚠️ The single most common mistake in this set will be **forgetting that `input()` returns a string**. `input() + 5` raises `TypeError`, but `input() * 3` silently repeats the text three times — no error, wrong answer. Cast every numeric input immediately.
>

---

[← Phase 1 index](README.md) · [Projects & Key Takeaways](projects-and-takeaways.md)
