# Solutions — 09-tuples

> Try each problem yourself first. Solutions are for checking after a genuine attempt.

## Q1. Create a Tuple

**Difficulty:** Very Easy

```python
t = (1, 2, 3)
print(t)
```

## Q2. Length of a Tuple

**Difficulty:** Very Easy

```python
t = tuple(input().split())
print(len(t))
```

## Q3. Index a Tuple

**Difficulty:** Very Easy

```python
t = tuple(input().split())
print(t[1])
```

## Q4. Last Element of a Tuple

**Difficulty:** Very Easy

```python
t = tuple(input().split())
print(t[-1])
```

## Q5. Sum of a Tuple

**Difficulty:** Easy

```python
t = tuple(int(x) for x in input().split())
print(sum(t))
```

## Q6. Unpack a Two-Element Tuple

**Difficulty:** Easy

```python
t = (int(input()), int(input()))
a, b = t
print(a + b)
```

## Q7. Unpack a Three-Element Tuple

**Difficulty:** Easy

```python
t = (int(input()), int(input()), int(input()))
x, y, z = t
print((x + y + z) / 3)
```

## Q8. Swap Using a Tuple

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
a, b = b, a
print(a)
print(b)
```

## Q9. Count an Element in a Tuple

**Difficulty:** Easy

```python
t = tuple(int(x) for x in input().split())
x = int(input())
print(t.count(x))
```

## Q10. Index of an Element in a Tuple

**Difficulty:** Medium

```python
t = tuple(int(x) for x in input().split())
x = int(input())
print(t.index(x))
```

## Q11. Tuple From a List

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
print(tuple(lst))
```

## Q12. First and Last of a Tuple

**Difficulty:** Easy

```python
t = tuple(int(x) for x in input().split())
print(t[0])
print(t[-1])
```

## Q13. Slice a Tuple

**Difficulty:** Easy

```python
t = tuple(int(x) for x in input().split())
print(t[1:3])
```

## Q14. Tuple of a Number's Digits

**Difficulty:** Medium

```python
n = int(input())
print(tuple(int(c) for c in str(n)))
```

## Q15. Immutability Awareness

**Difficulty:** Medium

```python
t = tuple(input().split())
print(type(t))
```

## Q16. Tuple Unpacking From a Function-Like Assign

**Difficulty:** Medium

```python
a, b = input().split(",")
print(int(a) + int(b))
```

## Q17. Nested Tuple Access

**Difficulty:** Medium

```python
t = (1, (2, 3), 4)
print(t[1][1])
```

## Q18. Tuple of Squares

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
print(tuple(x ** 2 for x in lst))
```

## Q19. Count Even Elements in a Tuple

**Difficulty:** Medium

```python
t = tuple(int(x) for x in input().split())
print(sum(1 for x in t if x % 2 == 0))
```

## Q20. Unpack With Underscore

**Difficulty:** Medium

```python
a = int(input())
_ = int(input())
c = int(input())
print(a + c)
```

## Q21. Check If a Tuple Is a Palindrome

**Difficulty:** Medium

```python
t = tuple(int(x) for x in input().split())
if t == t[::-1]:
    print("Palindrome")
else:
    print("Not palindrome")
```

## Q22. First Element of Each of Several Tuples

**Difficulty:** Medium

```python
n = int(input())
for _ in range(n):
    a, b = map(int, input().split())
    t = (a, b)
    print(t[0])
```

## Q23. Tuple of Word Lengths

**Difficulty:** Medium

```python
s = input()
print(tuple(len(w) for w in s.split()))
```

## Q24. Maximum and Minimum of a Tuple

**Difficulty:** Medium

```python
t = tuple(int(x) for x in input().split())
print(max(t))
print(min(t))
```

## Q25. Concatenate Two Tuples

**Difficulty:** Medium

```python
t1 = tuple(int(x) for x in input().split())
t2 = tuple(int(x) for x in input().split())
print(t1 + t2)
```

## Q26. Sum of First and Last of a Tuple

**Difficulty:** Easy

```python
t = tuple(int(x) for x in input().split())
print(t[0] + t[-1])
```

## Q27. Tuple of Multiples

**Difficulty:** Medium

```python
k = int(input())
n = int(input())
print(tuple(i * k for i in range(1, n + 1)))
```

## Q28. Check If a Value Is in a Tuple

**Difficulty:** Easy

```python
t = tuple(int(x) for x in input().split())
x = int(input())
if x in t:
    print("Present")
else:
    print("Absent")
```

## Q29. Unpack Nested Pairs

**Difficulty:** Hard

```python
n = int(input())
for _ in range(n):
    a, b = map(int, input().split())
    t = (a, b)
    print(t[1])
```

## Q30. Tuple of Elements at Even Indices

**Difficulty:** Medium

```python
t = tuple(int(x) for x in input().split())
print(t[::2])
```
