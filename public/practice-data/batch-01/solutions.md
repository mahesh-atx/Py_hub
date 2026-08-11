# Batch 1 — Solutions

> ⚠️ **Try the problem yourself first.** These solutions are meant to be checked only after you have genuinely attempted each question.

**Reading input note:** Each solution reads one value per line with `input()` and converts it when needed. This is the coding-platform style described in the questions.

---

## Q1. Welcome Message
```python
name = input()
print(f"Hello, {name}! Welcome to Python.")
```

## Q2. Sum of Two Integers
```python
a = int(input())
b = int(input())
print(a + b)
```

## Q3. Difference of Two Numbers
```python
a = int(input())
b = int(input())
print(a - b)
```

## Q4. Product of Two Numbers
```python
a = int(input())
b = int(input())
print(a * b)
```

## Q5. Division Result
```python
a = int(input())
b = int(input())
print(a / b)
```

## Q6. Area of a Rectangle
```python
length = int(input())
width = int(input())
print(length * width)
```

## Q7. Perimeter of a Square
```python
side = int(input())
print(4 * side)
```

## Q8. Volume of a Cube
```python
edge = int(input())
print(edge ** 3)
```

## Q9. Meters to Centimeters
```python
meters = int(input())
print(meters * 100)
```

## Q10. Hours to Minutes
```python
hours = int(input())
print(hours * 60)
```

## Q11. Average of Three Numbers
```python
a = int(input())
b = int(input())
c = int(input())
print((a + b + c) / 3)
```

## Q12. Remainder After Division
```python
a = int(input())
b = int(input())
print(a % b)
```

## Q13. Integer Division (Quotient)
```python
a = int(input())
b = int(input())
print(a // b)
```

## Q14. First and Last Name
```python
first = input()
last = input()
print(first + " " + last)
```

## Q15. Age Next Year
```python
age = int(input())
print(f"Next year you will be {age + 1} years old.")
```

## Q16. Celsius to Fahrenheit
```python
celsius = int(input())
print(celsius * 9 / 5 + 32)
```

## Q17. Total Pay Including Bonus
```python
salary = int(input())
bonus = int(input())
print(f"Total pay: {salary + bonus}")
```

## Q18. Double a Number
```python
n = int(input())
print(n * 2)
```

## Q19. Square of a Number
```python
n = int(input())
print(n ** 2)
```

## Q20. Kilometers to Miles
```python
km = int(input())
print(km * 0.621371)
```

## Q21. Simple Interest
```python
principal = int(input())
rate = int(input())
time_years = int(input())
print((principal * rate * time_years) / 100)
```

## Q22. Hourly Wage (Gross Pay)
```python
hourly_wage = int(input())
hours = int(input())
print(f"Gross pay: {hours * hourly_wage:.2f}")
```

## Q23. Perimeter of a Rectangle
```python
length = int(input())
width = int(input())
print(2 * (length + width))
```

## Q24. Split a Total Bill Equally
```python
total_bill = int(input())
people = int(input())
print(total_bill / people)
```

## Q25. Distance Between Two Points on a Line
```python
x1 = int(input())
x2 = int(input())
print(abs(x1 - x2))
```

## Q26. Total Cost with Tax
```python
subtotal = int(input())
tax_percent = int(input())
print(subtotal + subtotal * tax_percent / 100)
```

## Q27. Average Speed
```python
distance = int(input())
hours = int(input())
print(distance / hours)
```

## Q28. Price After Discount
```python
original_price = int(input())
discount_percent = int(input())
print(original_price - original_price * discount_percent / 100)
```

## Q29. Convert Seconds to Minutes and Seconds
```python
seconds = int(input())
minutes = seconds // 60
secs = seconds % 60
print(f"{minutes} minutes and {secs} seconds")
```

## Q30. Power of a Number
```python
base = int(input())
exponent = int(input())
print(base ** exponent)
```

## Q31. Age in Days
```python
age_years = int(input())
print(age_years * 365)
```

## Q32. Total Runs in Cricket Match
```python
s1 = int(input())
s2 = int(input())
s3 = int(input())
print(s1 + s2 + s3)
```

## Q33. Perimeter of a Triangle
```python
a = int(input())
b = int(input())
c = int(input())
print(a + b + c)
```

## Q34. Average of Four Numbers
```python
a = int(input())
b = int(input())
c = int(input())
d = int(input())
print((a + b + c + d) / 4)
```

## Q35. Circle Circumference
```python
radius = int(input())
pi = 3.14159
print(2 * pi * radius)
```

## Q36. Fuel Efficiency (Distance per Liter)
```python
distance = int(input())
liters = int(input())
print(f"{distance / liters:.2f} km per liter")
```

## Q37. Total Cost of N Items
```python
unit_price = int(input())
quantity = int(input())
print(unit_price * quantity)
```

## Q38. Weekly Wages
```python
daily_wage = int(input())
print(daily_wage * 5)
```

## Q39. Remaining Distance After One Leg
```python
total = int(input())
traveled = int(input())
print(total - traveled)
```

## Q40. Convert Celsius to Kelvin
```python
celsius = int(input())
print(celsius + 273.15)
```

## Q41. Electricity Bill (Base + Usage)
```python
units = int(input())
print(150 + units * 7.5)
```

## Q42. Perimeter of a Rectangle Given Area
```python
area = int(input())
side = int(input())
other = area // side
print(2 * (side + other))
```

## Q43. Difference Between Product and Sum
```python
a = int(input())
b = int(input())
product = a * b
total = a + b
print(abs(product - total))
```

## Q44. Grade Point Average from Four Grades
```python
g1 = int(input())
g2 = int(input())
g3 = int(input())
g4 = int(input())
print(f"{(g1 + g2 + g3 + g4) / 4:.1f}")
```

## Q45. Number of Cents in Rupees
```python
rupees = int(input())
print(rupees * 100)
```

## Q46. Time from Seconds to Hours
```python
seconds = int(input())
print(seconds // 3600)
```

## Q47. Remainder When Sum Is Divided
```python
a = int(input())
b = int(input())
divisor = int(input())
print((a + b) % divisor)
```

## Q48. Distance per Person in a Trip
```python
total_distance = int(input())
people = int(input())
print(f"{total_distance / people:.2f}")
```

## Q49. Convert Days to Weeks and Days
```python
days = int(input())
weeks = days // 7
rem = days % 7
print(f"{weeks} weeks and {rem} days")
```

## Q50. BMI Calculation
```python
weight = int(input())
height = float(input())
bmi = weight / (height ** 2)
print(f"{bmi:.1f}")
```

## Q51. Area of a Triangle
```python
base = float(input())
height = float(input())
print((base * height) / 2)
```

## Q52. Number of Cakes Needed for Guests
```python
guests = int(input())
slices_per_cake = int(input())
cakes = (guests + slices_per_cake - 1) // slices_per_cake
print(cakes)
```

## Q53. Total Cost of Items with Bulk Discount
```python
unit_price = int(input())
quantity = int(input())
discount_percent = int(input())
subtotal = unit_price * quantity
print(subtotal * (100 - discount_percent) / 100)
```

## Q54. Grade Percentage
```python
obtained = int(input())
total = int(input())
print(f"{(obtained / total) * 100:.1f}")
```

## Q55. Time Duration Between Start and End Times
```python
start_hour = int(input())
start_min = int(input())
end_hour = int(input())
end_min = int(input())
start_total = start_hour * 60 + start_min
end_total = end_hour * 60 + end_min
print(end_total - start_total)
```

## Q56. Volume of a Cylinder
```python
radius = int(input())
height = int(input())
pi = 3.14159
volume = pi * radius ** 2 * height
print(f"{volume:.1f}")
```

## Q57. Sharing Toys Among Children
```python
toys = int(input())
children = int(input())
print(f"Each child gets {toys // children} toys and {toys % children} are left over.")
```

## Q58. Cost of Fuel for a Trip
```python
km_per_liter = int(input())
distance = int(input())
price_per_liter = int(input())
liters = distance / km_per_liter
print(f"{liters * price_per_liter:.2f}")
```

## Q59. Total Bill with Discount and Tip
```python
bill = int(input())
discount_percent = int(input())
tip_percent = int(input())
after_discount = bill * (100 - discount_percent) / 100
final = after_discount * (100 + tip_percent) / 100
print(f"{final:.2f}")
```

## Q60. Number of Years to Seconds (approx.)
```python
years = int(input())
seconds = years * 365 * 24 * 60 * 60
print(seconds)
```

## Q61. Split Bill with One Person Not Paying
```python
total_bill = int(input())
people = int(input())
paying = people - 1
print(f"{total_bill / paying:.2f}")
```

## Q62. Area of a Circle
```python
radius = int(input())
pi = 3.14159
print(f"{pi * radius ** 2:.2f}")
```

## Q63. Reverse Two-Digit Number
```python
n = int(input())
tens = n // 10
ones = n % 10
print(ones * 10 + tens)
```

## Q64. Add Digits of a Two-Digit Number
```python
n = int(input())
print(n // 10 + n % 10)
```

## Q65. Product of Digits of a Two-Digit Number
```python
n = int(input())
print((n // 10) * (n % 10))
```

## Q66. Sum of Digits of a Three-Digit Number
```python
n = int(input())
hundreds = n // 100
tens = (n // 10) % 10
ones = n % 10
print(hundreds + tens + ones)
```

## Q67. Convert Rupees to Paise (with decimal)
```python
rupees = float(input())
print(round(rupees * 100))
```

## Q68. Percentage of a Number
```python
number = int(input())
percent = int(input())
print(f"{number * percent / 100:.2f}")
```

## Q69. Total Distance With Two Speeds
```python
speed1 = int(input())
time1 = int(input())
speed2 = int(input())
time2 = int(input())
print(speed1 * time1 + speed2 * time2)
```

## Q70. Difference of Squares
```python
a = int(input())
b = int(input())
print(a ** 2 - b ** 2)
```

## Q71. Fahrenheit to Celsius
```python
fahrenheit = int(input())
print(f"{(fahrenheit - 32) * 5 / 9:.1f}")
```

## Q72. Circumference from Radius
```python
radius = int(input())
pi = 3.14159
print(f"{2 * pi * radius:.2f}")
```

## Q73. Sum of First N Natural Numbers
```python
n = int(input())
print(n * (n + 1) // 2)
```

## Q74. Discounted Price of Multiple Items
```python
unit_price = int(input())
quantity = int(input())
discount_percent = int(input())
tax_percent = int(input())
subtotal = unit_price * quantity
after_discount = subtotal * (100 - discount_percent) / 100
final = after_discount * (100 + tax_percent) / 100
print(f"{final:.2f}")
```

## Q75. Average of Five Numbers
```python
a = int(input())
b = int(input())
c = int(input())
d = int(input())
e = int(input())
print(f"{(a + b + c + d + e) / 5:.2f}")
```

## Q76. Minimum Number of Buses Needed
```python
people = int(input())
capacity = int(input())
buses = (people + capacity - 1) // capacity
print(buses)
```

## Q77. Year to Decade
```python
year = int(input())
print(year // 10)
```

## Q78. Cost per Student for a School Trip
```python
total_cost = int(input())
students = int(input())
print(f"{total_cost / students:.2f}")
```

## Q79. Average of Marks in Percent Form
```python
m1 = int(input())
m2 = int(input())
m3 = int(input())
print((m1 + m2 + m3) / 3)
```

## Q80. Distance of a Falling Object
```python
t = int(input())
g = 9.8
print(0.5 * g * t ** 2)
```

## Q81. Sum of Squares of Two Numbers
```python
a = int(input())
b = int(input())
print(a ** 2 + b ** 2)
```

## Q82. Hypotenuse of a Right Triangle
```python
a = int(input())
b = int(input())
hyp = (a ** 2 + b ** 2) ** 0.5
print(f"{hyp:.1f}")
```

## Q83. Quadruple a Number and Add Ten
```python
n = int(input())
print(n * 4 + 10)
```

## Q84. Last Two Digits
```python
n = int(input())
print(n % 100)
```

## Q85. Sum of Digits of a Four-Digit Number
```python
n = int(input())
thousands = n // 1000
hundreds = (n // 100) % 10
tens = (n // 10) % 10
ones = n % 10
print(thousands + hundreds + tens + ones)
```

## Q86. Last Digit of a Number
```python
n = int(input())
print(n % 10)
```

## Q87. Distance Between Two Cities
```python
d1 = int(input())
d2 = int(input())
print(d1 + d2)
```

## Q88. Amount Left After Spending
```python
budget = int(input())
e1 = int(input())
e2 = int(input())
e3 = int(input())
print(budget - e1 - e2 - e3)
```

## Q89. Total Weight of Parcels
```python
w1 = int(input())
w2 = int(input())
w3 = int(input())
print(f"Total weight: {w1 + w2 + w3} kg")
```

## Q90. Convert Minutes to Hours and Minutes
```python
minutes = int(input())
hours = minutes // 60
rem = minutes % 60
print(f"{hours} hours and {rem} minutes")
```

## Q91. Average and Product of Two Numbers
```python
a = int(input())
b = int(input())
print((a + b) / 2)
print(a * b)
```

## Q92. Total Distance of a Round Trip
```python
one_way = int(input())
print(one_way * 2)
```

## Q93. Number of Full Pages of a Notebook
```python
total_lines = int(input())
lines_per_page = int(input())
print(total_lines // lines_per_page)
```

## Q94. Total Cost Including Delivery Fee
```python
items_total = int(input())
delivery_fee = int(input())
print(f"Grand total: {items_total + delivery_fee}")
```

## Q95. Circumference from Diameter
```python
diameter = int(input())
pi = 3.14159
print(f"{pi * diameter:.2f}")
```

## Q96. Sum of Consecutive Integers from A to B
```python
a = int(input())
b = int(input())
n = b - a + 1
print(n * (a + b) // 2)
```

## Q97. Check Power of Two
```python
n = int(input())
print((n & (n - 1)) == 0)
```
> The expression `n & (n - 1)` is `0` exactly when `n` is a power of two. We compare to `0` and print the boolean.

## Q98. Reverse a Three-Digit Number
```python
n = int(input())
hundreds = n // 100
tens = (n // 10) % 10
ones = n % 10
print(ones * 100 + tens * 10 + hundreds)
```

## Q99. Digit Difference (Tens Minus Ones)
```python
n = int(input())
tens = n // 10
ones = n % 10
print(tens - ones)
```

## Q100. Final Bill with Discount, Tax, and Tip
```python
bill = int(input())
discount_percent = int(input())
tax_percent = int(input())
tip_percent = int(input())

after_discount = bill * (100 - discount_percent) / 100
after_tax = after_discount * (100 + tax_percent) / 100
final = after_tax * (100 + tip_percent) / 100
print(f"{final:.2f}")
```

---

## Batch 1 Recap
- You read input with `input()` and convert with `int()`, `float()`.
- You built expressions with arithmetic `+ - * / // % **`, comparison, and used `abs()`, `round()`.
- You formatted output with f-strings (`f"{x:.2f}"`).
- You broke numbers into digits/units using `//` and `%`.
- You applied the "ceiling division" trick `(a + b - 1) // b` for real-world rounding up.

These skills carry forward into every later batch.
