# Solutions — 05-conditions

> Try each problem yourself first. Solutions are for checking after a genuine attempt.

## Q1. Basic if

**Difficulty:** Very Easy

```python
n = int(input())
if n > 0:
    print("Positive")
else:
    print("Non-positive")
```

## Q2. if/else Parity

**Difficulty:** Very Easy

```python
n = int(input())
if n % 2 == 0:
    print("Even")
else:
    print("Odd")
```

## Q3. if/elif/else Grade

**Difficulty:** Easy

```python
n = int(input())
if n >= 80:
    print("High")
elif n >= 50:
    print("Mid")
else:
    print("Low")
```

## Q4. Nested if

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
if a > 0:
    if b > 0:
        print("Both positive")
    else:
        print("Only a positive")
else:
    print("Not a positive")
```

## Q5. Multiple Conditions With and

**Difficulty:** Easy

```python
n = int(input())
if n >= 10 and n <= 20:
    print("Yes")
else:
    print("No")
```

## Q6. Ternary Expression

**Difficulty:** Easy

```python
n = int(input())
result = "even" if n % 2 == 0 else "odd"
print(result)
```

## Q7. Ternary for Larger of Two

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
larger = a if a > b else b
print(larger)
```

## Q8. Leap Year (multiple conditions)

**Difficulty:** Medium

```python
year = int(input())
if year % 400 == 0 or (year % 4 == 0 and year % 100 != 0):
    print("Leap")
else:
    print("Not leap")
```

## Q9. if/elif Chain for Signs

**Difficulty:** Easy

```python
n = int(input())
if n > 0:
    print("Positive")
elif n < 0:
    print("Negative")
else:
    print("Zero")
```

## Q10. Nested Ternary

**Difficulty:** Medium

```python
n = int(input())
print("Positive" if n > 0 else ("Zero" if n == 0 else "Negative"))
```

## Q11. Comparison Chain

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
c = int(input())
if a < b < c:
    print("Yes")
else:
    print("No")
```

## Q12. Multiple Conditions With or

**Difficulty:** Easy

```python
n = int(input())
if n % 3 == 0 or n % 5 == 0:
    print("Yes")
else:
    print("No")
```

## Q13. Nested if/else for Max of Three

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
c = int(input())
if a >= b and a >= c:
    print(a)
elif b >= c:
    print(b)
else:
    print(c)
```

## Q14. Ternary to Choose a String

**Difficulty:** Easy

```python
score = int(input())
print("Pass" if score >= 40 else "Fail")
```

## Q15. if/elif/else for Temperature Category

**Difficulty:** Medium

```python
t = int(input())
if t >= 30:
    print("Hot")
elif t >= 20:
    print("Warm")
elif t >= 10:
    print("Cool")
else:
    print("Cold")
```

## Q16. Nested Conditions for a Rectangle

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
if a > 0 and b > 0:
    print(f"Area {a * b}")
else:
    print("Invalid")
```

## Q17. Ternary Inside a String

**Difficulty:** Easy

```python
n = int(input())
print(f"It is {n} {'even' if n % 2 == 0 else 'odd'}.")
```

## Q18. Multiple Conditions With not

**Difficulty:** Medium

```python
n = int(input())
if not (1 <= n <= 5):
    print("Yes")
else:
    print("No")
```

## Q19. if/elif for Number of Digits

**Difficulty:** Medium

```python
n = int(input())
d = len(str(n))
if d == 1:
    print("One digit")
elif d == 2:
    print("Two digits")
else:
    print("Many digits")
```

## Q20. Ternary to Return Absolute Value

**Difficulty:** Medium

```python
n = int(input())
print(n if n >= 0 else -n)
```

## Q21. Nested if/elif for a Menu Choice

**Difficulty:** Medium

```python
c = input()
if c == "a":
    print("Add")
elif c == "s":
    print("Subtract")
elif c == "m":
    print("Multiply")
else:
    print("Unknown")
```

## Q22. Multiple Conditions With and/or Combined

**Difficulty:** Medium

```python
n = int(input())
if (n > 0 and n % 2 == 0) or (n < 0 and n % 2 != 0):
    print("Yes")
else:
    print("No")
```

## Q23. Ternary With a Computation

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
result = a + b if a > b else a * b
print(result)
```

## Q24. if/elif/else for a Triangle Sides Check

**Difficulty:** Hard

```python
a = int(input())
b = int(input())
c = int(input())
if a < b + c and b < a + c and c < a + b:
    print("Valid")
else:
    print("Invalid")
```

## Q25. Nested Ternary for Three Categories

**Difficulty:** Medium

```python
n = int(input())
print("Excellent" if n >= 90 else ("Good" if n >= 60 else "Needs work"))
```

## Q26. if to Guard Division by Zero

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
if b == 0:
    print("Cannot divide")
else:
    print(a / b)
```

## Q27. Multiple Conditions to Classify a Number

**Difficulty:** Hard

```python
n = int(input())
if n % 2 == 0 and n % 3 == 0 and n % 5 == 0:
    print("Special")
else:
    print("Normal")
```

## Q28. Ternary in a Comparison Loop Setting

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
if a > b:
    print("First")
elif b > a:
    print("Second")
else:
    print("Equal")
```

## Q29. Nested if/else for a Login-Style Check

**Difficulty:** Medium

```python
user = input()
password = input()
if user == "admin":
    if password == "1234":
        print("Welcome")
    else:
        print("Wrong password")
else:
    print("Unknown user")
```

## Q30. Ternary With Logical Operators

**Difficulty:** Hard

```python
a = int(input())
b = int(input())
c = int(input())
print(a if a >= b and a >= c else (b if b >= c else c))
```
