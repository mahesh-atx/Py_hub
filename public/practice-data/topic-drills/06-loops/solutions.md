# Solutions — 06-loops

> Try each problem yourself first. Solutions are for checking after a genuine attempt.

## Q1. for Loop Over a Range

**Difficulty:** Very Easy

```python
n = int(input())
for i in range(1, n + 1):
    print(i)
```

## Q2. while Loop Countdown

**Difficulty:** Very Easy

```python
n = int(input())
while n >= 1:
    print(n)
    n -= 1
```

## Q3. Sum With a for Loop

**Difficulty:** Easy

```python
n = int(input())
total = 0
for i in range(1, n + 1):
    total += i
print(total)
```

## Q4. Sum With a while Loop

**Difficulty:** Easy

```python
n = int(input())
total = 0
i = 1
while i <= n:
    total += i
    i += 1
print(total)
```

## Q5. range() With a Step

**Difficulty:** Easy

```python
n = int(input())
for i in range(2, n + 1, 2):
    print(i)
```

## Q6. break to Stop Early

**Difficulty:** Medium

```python
n = int(input())
for i in range(1, n + 1):
    print(i)
    if i % 7 == 0:
        break
```

## Q7. continue to Skip

**Difficulty:** Medium

```python
n = int(input())
for i in range(1, n + 1):
    if i % 3 == 0:
        continue
    print(i)
```

## Q8. pass as a Placeholder

**Difficulty:** Easy

```python
n = int(input())
for i in range(1, n + 1):
    if i == 5:
        pass
    else:
        print(i)
```

## Q9. First N Even Numbers

**Difficulty:** Easy

```python
n = int(input())
for i in range(1, n + 1):
    print(i * 2)
```

## Q10. while Loop That Runs a Fixed Number of Times

**Difficulty:** Medium

```python
n = int(input())
i = 1
while i <= n:
    print(f"Iteration {i}")
    i += 1
```

## Q11. Product With a for Loop (Factorial)

**Difficulty:** Easy

```python
n = int(input())
p = 1
for i in range(1, n + 1):
    p *= i
print(p)
```

## Q12. Sum of Even Numbers 1..n

**Difficulty:** Easy

```python
n = int(input())
total = 0
for i in range(1, n + 1):
    if i % 2 == 0:
        total += i
print(total)
```

## Q13. Count Odd Numbers 1..n

**Difficulty:** Easy

```python
n = int(input())
count = 0
for i in range(1, n + 1):
    if i % 2 != 0:
        count += 1
print(count)
```

## Q14. Nested Loop: Square of Asterisks

**Difficulty:** Medium

```python
n = int(input())
for _ in range(n):
    print("*" * n)
```

## Q15. Nested Loop: Triangle of Numbers

**Difficulty:** Medium

```python
n = int(input())
for row in range(1, n + 1):
    print(" ".join(str(c) for c in range(1, row + 1)))
```

## Q16. Multiplication Table

**Difficulty:** Easy

```python
n = int(input())
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
```

## Q17. Sum of Digits With a while Loop

**Difficulty:** Medium

```python
n = int(input())
total = 0
while n > 0:
    total += n % 10
    n //= 10
print(total)
```

## Q18. Count Digits

**Difficulty:** Medium

```python
n = int(input())
count = 0
while n > 0:
    n //= 10
    count += 1
print(count)
```

## Q19. Reverse a Number

**Difficulty:** Medium

```python
n = int(input())
rev = 0
while n > 0:
    rev = rev * 10 + (n % 10)
    n //= 10
print(rev)
```

## Q20. Sum of a Range a..b

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
print(sum(range(a, b + 1)))
```

## Q21. First N Fibonacci Numbers

**Difficulty:** Medium

```python
n = int(input())
a, b = 0, 1
for _ in range(n):
    print(a)
    a, b = b, a + b
```

## Q22. while Loop Until a Condition

**Difficulty:** Medium

```python
n = int(input())
while n > 0:
    print(n)
    n //= 2
```

## Q23. break in a Nested Loop

**Difficulty:** Hard

```python
n = int(input())
total_stars = 0
for row in range(1, n + 1):
    line = ""
    for _ in range(row):
        line += "*"
        total_stars += 1
    print(line)
    if total_stars >= n:
        break
```

## Q24. Nested Loop: Multiplication Triangle

**Difficulty:** Medium

```python
n = int(input())
for i in range(1, n + 1):
    print(" ".join(str(i * j) for j in range(1, i + 1)))
```

## Q25. Sum of Squares

**Difficulty:** Easy

```python
n = int(input())
total = 0
for i in range(1, n + 1):
    total += i ** 2
print(total)
```

## Q26. Print Numbers Divisible by 3 or 5

**Difficulty:** Easy

```python
n = int(input())
for i in range(1, n + 1):
    if i % 3 == 0 or i % 5 == 0:
        print(i)
```

## Q27. while Loop With continue and break

**Difficulty:** Hard

```python
x = 1
count = 0
while count < 5:
    if x % 3 == 0:
        x += 1
        continue
    print(x)
    count += 1
    x += 1
```

## Q28. Nested Loop: Hollow Square

**Difficulty:** Hard

```python
n = int(input())
for r in range(n):
    line = ""
    for c in range(n):
        if r == 0 or r == n - 1 or c == 0 or c == n - 1:
            line += "*"
        else:
            line += " "
    print(line)
```

## Q29. Sum of First N Odd Numbers

**Difficulty:** Easy

```python
n = int(input())
total = 0
for i in range(1, n + 1):
    total += 2 * i - 1
print(total)
```

## Q30. Largest Digit Using a Loop

**Difficulty:** Medium

```python
n = int(input())
mx = 0
while n > 0:
    if n % 10 > mx:
        mx = n % 10
    n //= 10
print(mx)
```
