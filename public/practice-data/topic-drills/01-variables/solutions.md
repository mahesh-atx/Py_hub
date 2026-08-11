# Solutions — 01-variables

> Try each problem yourself first. Solutions are for checking after a genuine attempt.

## Q1. Print the Value of a Variable

**Difficulty:** Very Easy

```python
score = 95
print(score)
```

## Q2. Store and Print a String

**Difficulty:** Very Easy

```python
greeting = "Hello"
print(greeting)
```

## Q3. Print a User-Provided Name

**Difficulty:** Very Easy

```python
name = input()
print(name)
```

## Q4. Swap Two Variables

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
a, b = b, a
print(a)
print(b)
```

## Q5. Multiple Assignment of Three Values

**Difficulty:** Easy

```python
x, y, z = 5, 10, 15
print(x + y + z)
```

## Q6. A Constant That Is Never Changed

**Difficulty:** Easy

```python
PI = 3.14159
radius = int(input())
print(2 * PI * radius)
```

## Q7. Dynamic Typing: Change a Variable's Type

**Difficulty:** Medium

```python
data = 10
data = "hello"
print(data)
print(type(data))
```

## Q8. Read Two Numbers Into Two Variables

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
print(a * b)
```

## Q9. Meaningful Variable Names

**Difficulty:** Easy

```python
distance = int(input())
time_hours = int(input())
print(distance / time_hours)
```

## Q10. Invalid Identifier Awareness

**Difficulty:** Easy

```python
my_var = "hello"
print(my_var)
```

## Q11. Sum Stored in a Variable

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
total = a + b
print(total)
```

## Q12. Reuse a Variable to Accumulate

**Difficulty:** Medium

```python
total = 0
for _ in range(3):
    total += int(input())
print(total)
```

## Q13. Case Sensitivity of Variables

**Difficulty:** Medium

```python
count = int(input())
Count = count
print(count)
print(Count)
```

## Q14. Multiple Assignment from a Split

**Difficulty:** Medium

```python
a, b = map(int, input().split())
print(a + b)
```

## Q15. Reassign With a New Value

**Difficulty:** Easy

```python
value = 5
value = value * 3
print(value)
```

## Q16. Build a Sentence With Variables

**Difficulty:** Easy

```python
name = input()
age = int(input())
print(f"{name} is {age} years old.")
```

## Q17. Variable Storing a Float Result

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
result = a / b
print(result)
```

## Q18. Three Variables, Three Operations

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
c = int(input())
s = a + b
p = b * c
d = c - a
print(s)
print(p)
print(d)
```

## Q19. Copying a Variable's Value

**Difficulty:** Easy

```python
a = 10
b = a
a = 20
print(a)
print(b)
```

## Q20. A Descriptive Variable for a Constant Rate

**Difficulty:** Easy

```python
TAX_RATE = 0.05
amount = int(input())
tax = amount * TAX_RATE
print(tax)
```

## Q21. Store the Average

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
c = int(input())
avg = (a + b + c) / 3
print(avg)
```

## Q22. Single Letter Variables

**Difficulty:** Easy

```python
x = int(input())
y = int(input())
print(x + y)
print(x * y)
```

## Q23. Dynamic Reassignment to a Different Value

**Difficulty:** Medium

```python
n = int(input())
n = n + 1
n = n * 2
print(n)
```

## Q24. Store Results of Multiple Conversions

**Difficulty:** Medium

```python
km = int(input())
miles = km * 0.621371
print(miles)
```

## Q25. Combine Two Strings With a Variable

**Difficulty:** Easy

```python
first = input()
last = input()
full = first + " " + last
print(full)
```

## Q26. Variable Holding a Boolean Result

**Difficulty:** Easy

```python
n = int(input())
is_positive = n > 0
print(is_positive)
```

## Q27. Swap Without Multiple Assignment

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
temp = a
a = b
b = temp
print(a)
print(b)
```

## Q28. Variable Names With Underscores

**Difficulty:** Easy

```python
obtained_marks = int(input())
total_marks = int(input())
print(obtained_marks / total_marks * 100)
```

## Q29. Chain of Variables

**Difficulty:** Medium

```python
x = int(input())
y = x + 2
z = y * 3
print(z)
```

## Q30. Dynamic Typing Across Three Types

**Difficulty:** Medium

```python
v = 1
print(v)
v = "two"
print(v)
v = 3.0
print(v)
print(type(v))
```
