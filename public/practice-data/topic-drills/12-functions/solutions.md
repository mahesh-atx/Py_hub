# Solutions — 12-functions

> Try each problem yourself first. Solutions are for checking after a genuine attempt.

## Q1. Define and Call a Function

**Difficulty:** Very Easy

```python
def say_hello():
    print("Hello!")
say_hello()
```

## Q2. Function With a Parameter

**Difficulty:** Very Easy

```python
def greet(name):
    print(f"Hello, {name}!")
greet(input())
```

## Q3. Function With a Return

**Difficulty:** Very Easy

```python
def add(a, b):
    return a + b
a = int(input())
b = int(input())
print(add(a, b))
```

## Q4. Call a Function With Two Arguments

**Difficulty:** Very Easy

```python
def multiply(a, b):
    return a * b
a = int(input())
b = int(input())
print(multiply(a, b))
```

## Q5. Default Parameter

**Difficulty:** Easy

```python
def power(x, e=2):
    return x ** e
n = int(input())
print(power(n))
```

## Q6. Override a Default Parameter

**Difficulty:** Easy

```python
def power(x, e=2):
    return x ** e
x = int(input())
e = int(input())
print(power(x, e))
```

## Q7. Keyword Arguments

**Difficulty:** Easy

```python
def divide(dividend, divisor):
    return dividend / divisor
a = int(input())
b = int(input())
print(divide(dividend=a, divisor=b))
```

## Q8. Function Using *args

**Difficulty:** Medium

```python
def total(*args):
    return sum(args)
n = int(input())
values = [int(input()) for _ in range(n)]
print(total(*values))
```

## Q9. Function Using **kwargs

**Difficulty:** Medium

```python
def show(**kwargs):
    for k, v in kwargs.items():
        print(f"{k}={v}")
show(a=1, b=2)
```

## Q10. Function Returning a Boolean

**Difficulty:** Easy

```python
def is_even(n):
    return n % 2 == 0
n = int(input())
print(is_even(n))
```

## Q11. Function With a Conditional Return

**Difficulty:** Easy

```python
def larger(a, b):
    if a > b:
        return a
    else:
        return b
a = int(input())
b = int(input())
print(larger(a, b))
```

## Q12. Scope: Local Variable

**Difficulty:** Medium

```python
def f():
    x = 5
    return x
print(f())
```

## Q13. Scope: Function Can't See a Local Outside

**Difficulty:** Medium

```python
def f():
    y = 10
    return y
print(f())
```

## Q14. Function Returning Multiple Values

**Difficulty:** Medium

```python
def min_max(a, b):
    return (min(a, b), max(a, b))
a = int(input())
b = int(input())
lo, hi = min_max(a, b)
print(lo)
print(hi)
```

## Q15. Lambda for Addition

**Difficulty:** Easy

```python
add = lambda a, b: a + b
a = int(input())
b = int(input())
print(add(a, b))
```

## Q16. Lambda for a Square

**Difficulty:** Easy

```python
square = lambda x: x * x
n = int(input())
print(square(n))
```

## Q17. Function Computing a Factorial

**Difficulty:** Medium

```python
def factorial(n):
    p = 1
    for i in range(1, n + 1):
        p *= i
    return p
n = int(input())
print(factorial(n))
```

## Q18. Function Returning a List

**Difficulty:** Medium

```python
def first_evens(n):
    return [i * 2 for i in range(1, n + 1)]
n = int(input())
print(first_evens(n))
```

## Q19. Function Returning a String

**Difficulty:** Easy

```python
def reverse_str(s):
    return s[::-1]
s = input()
print(reverse_str(s))
```

## Q20. Function With a List Argument

**Difficulty:** Medium

```python
def sum_list(lst):
    return sum(lst)
lst = [int(x) for x in input().split()]
print(sum_list(lst))
```

## Q21. Function Counting Evens in a List

**Difficulty:** Medium

```python
def count_even(lst):
    return sum(1 for x in lst if x % 2 == 0)
lst = [int(x) for x in input().split()]
print(count_even(lst))
```

## Q22. Default Parameter in a Calculation

**Difficulty:** Medium

```python
def apply_discount(price, discount=10):
    return price * (100 - discount) / 100
price = int(input())
discount = int(input())
print(apply_discount(price, discount))
```

## Q23. Keyword Arguments With a Function

**Difficulty:** Medium

```python
def describe(name, age):
    return f"{name} is {age} years old"
name = input()
age = int(input())
print(describe(name=name, age=age))
```

## Q24. Function Using *args for Maximum

**Difficulty:** Medium

```python
def my_max(*args):
    return max(args)
n = int(input())
values = [int(input()) for _ in range(n)]
print(my_max(*values))
```

## Q25. Function Returning a Dictionary

**Difficulty:** Medium

```python
def make_dict(k, v):
    return {k: v}
k = input()
v = int(input())
print(make_dict(k, v))
```

## Q26. Global Variable Scope (read)

**Difficulty:** Medium

```python
rate = 5
def calc(value):
    return rate * value
n = int(input())
print(calc(n))
```

## Q27. Lambda With a List (map-style)

**Difficulty:** Medium

```python
double = lambda x: 2 * x
lst = [int(x) for x in input().split()]
print([double(x) for x in lst])
```

## Q28. Function With Both *args and **kwargs

**Difficulty:** Hard

```python
def stats(*args, mode="sum"):
    if mode == "sum":
        return sum(args)
    else:
        return len(args)
n = int(input())
values = [int(input()) for _ in range(n)]
mode = input()
print(stats(*values, mode=mode))
```

## Q29. Nested Function (inner helper)

**Difficulty:** Hard

```python
def outer():
    def inner(x):
        return x * 3
    return inner(3)
print(outer())
```

## Q30. Function Calling Another Function

**Difficulty:** Hard

```python
def square(x):
    return x * x
def sum_of_squares(a, b):
    return square(a) + square(b)
a = int(input())
b = int(input())
print(sum_of_squares(a, b))
```
