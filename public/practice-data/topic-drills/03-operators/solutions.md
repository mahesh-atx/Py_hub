# Solutions — 03-operators

> Try each problem yourself first. Solutions are for checking after a genuine attempt.

## Q1. Addition

**Difficulty:** Very Easy

```python
a = int(input())
b = int(input())
print(a + b)
```

## Q2. Subtraction

**Difficulty:** Very Easy

```python
a = int(input())
b = int(input())
print(a - b)
```

## Q3. Multiplication

**Difficulty:** Very Easy

```python
a = int(input())
b = int(input())
print(a * b)
```

## Q4. True Division

**Difficulty:** Very Easy

```python
a = int(input())
b = int(input())
print(a / b)
```

## Q5. Floor Division

**Difficulty:** Very Easy

```python
a = int(input())
b = int(input())
print(a // b)
```

## Q6. Modulo (Remainder)

**Difficulty:** Very Easy

```python
a = int(input())
b = int(input())
print(a % b)
```

## Q7. Exponentiation

**Difficulty:** Very Easy

```python
a = int(input())
b = int(input())
print(a ** b)
```

## Q8. Equality Comparison

**Difficulty:** Very Easy

```python
a = int(input())
b = int(input())
print(a == b)
```

## Q9. Greater Than

**Difficulty:** Very Easy

```python
a = int(input())
b = int(input())
print(a > b)
```

## Q10. Not Equal

**Difficulty:** Very Easy

```python
a = int(input())
b = int(input())
print(a != b)
```

## Q11. Logical AND

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
print((a > 0) and (b > 0))
```

## Q12. Logical OR

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
print((a > 0) or (b > 0))
```

## Q13. Logical NOT

**Difficulty:** Easy

```python
n = int(input())
print(not (n > 0))
```

## Q14. Add and Assign (+=)

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
total = a
total += b
print(total)
```

## Q15. Multiply and Assign (*=)

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
p = a
p *= b
print(p)
```

## Q16. Subtract and Assign (-=)

**Difficulty:** Easy

```python
n = int(input())
v = 100
v -= n
print(v)
```

## Q17. Divide and Assign (/=)

**Difficulty:** Easy

```python
n = int(input())
x = 20
x /= n
print(x)
```

## Q18. Membership `in` (string)

**Difficulty:** Easy

```python
sentence = input()
letter = input()
print(letter in sentence)
```

## Q19. Membership `not in`

**Difficulty:** Easy

```python
word1 = input()
word2 = input()
print(word1 not in word2)
```

## Q20. Identity `is` for None

**Difficulty:** Medium

```python
value = input()
print(value is None)
```

## Q21. Identity `is not`

**Difficulty:** Medium

```python
value = input()
print(value is not None)
```

## Q22. Order of Operations

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
print(a + b * 2)
```

## Q23. Chained Comparison

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
c = int(input())
print(a < b < c)
```

## Q24. Combine Arithmetic and Comparison

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
print((a + b) > (a * b))
```

## Q25. Logical Operators With Arithmetic

**Difficulty:** Medium

```python
n = int(input())
print((n % 2 == 0) and (n > 0))
```

## Q26. Use += to Accumulate a Sum

**Difficulty:** Medium

```python
total = 0
for _ in range(3):
    total += int(input())
print(total)
```

## Q27. `in` With a List

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
value = int(input())
print(value in lst)
```

## Q28. `is` With Integers

**Difficulty:** Medium

```python
n = int(input())
print(n is 10)
```

## Q29. Compound Comparison of Three Values

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
c = int(input())
print(max(a, b, c) == c)
```

## Q30. Arithmetic With Assignment Operators

**Difficulty:** Medium

```python
n = int(input())
x = 10
x += n
x *= 2
x -= 5
print(x)
```
