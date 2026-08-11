# Solutions — 04-input-output

> Try each problem yourself first. Solutions are for checking after a genuine attempt.

## Q1. Read and Print a Line

**Difficulty:** Very Easy

```python
print(input())
```

## Q2. Print With a Custom Separator

**Difficulty:** Easy

```python
print(1, 2, 3, sep="-")
```

## Q3. Print on One Line With a Custom End

**Difficulty:** Easy

```python
print("a", end="")
print("b")
```

## Q4. Read Two Integers on One Line

**Difficulty:** Easy

```python
a, b = map(int, input().split())
print(a + b)
```

## Q5. f-string With a Number

**Difficulty:** Easy

```python
n = int(input())
print(f"You entered {n}.")
```

## Q6. Format a Float to Two Decimals

**Difficulty:** Easy

```python
v = float(input())
print(f"{v:.2f}")
```

## Q7. Format an Integer in a Field Width

**Difficulty:** Easy

```python
n = int(input())
print(f"{n:5d}")
```

## Q8. Combine Two Inputs in One Line

**Difficulty:** Easy

```python
name = input()
age = int(input())
print(f"{name} is {age} years old.")
```

## Q9. Print an Arithmetic Result

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
print(f"Sum: {a + b}")
```

## Q10. Multiple print() Calls Stack Lines

**Difficulty:** Very Easy

```python
print("line1")
print("line2")
print("line3")
```

## Q11. Read Three Values on One Line

**Difficulty:** Medium

```python
a, b, c = map(int, input().split())
print((a + b + c) / 3)
```

## Q12. f-string With Expressions Inside Braces

**Difficulty:** Easy

```python
n = int(input())
print(f"Double: {n * 2}")
```

## Q13. Format a Percentage

**Difficulty:** Medium

```python
obtained = int(input())
total = int(input())
print(f"{(obtained / total) * 100:.1f}%")
```

## Q14. Print a List

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
print(lst)
```

## Q15. Read a Character and Repeat

**Difficulty:** Easy

```python
ch = input()
n = int(input())
print(ch * n)
```

## Q16. Multiple Inputs With a Loop

**Difficulty:** Medium

```python
n = int(input())
total = 0
for _ in range(n):
    total += int(input())
print(total)
```

## Q17. Print With Padding on Both Sides

**Difficulty:** Medium

```python
word = input()
print(f"{word:^10}")
```

## Q18. f-string With Multiple Values

**Difficulty:** Easy

```python
a = int(input())
b = int(input())
c = int(input())
print(f"a={a} b={b} c={c}")
```

## Q19. Left-Align a String in a Field

**Difficulty:** Medium

```python
word = input()
print(f"{word:<8}!")
```

## Q20. Print the Type of Input

**Difficulty:** Easy

```python
value = input()
print(f"Type: {type(value)}")
```

## Q21. Format With Thousand Separators

**Difficulty:** Medium

```python
n = int(input())
print(f"{n:,}")
```

## Q22. Read and Split Into Words

**Difficulty:** Medium

```python
print(len(input().split()))
```

## Q23. Print Multiple Results on Separate Lines

**Difficulty:** Medium

```python
a = int(input())
b = int(input())
print(a + b)
print(a - b)
print(a * b)
```

## Q24. f-string With a Float Field Width

**Difficulty:** Medium

```python
v = float(input())
print(f"{v:8.2f}")
```

## Q25. Escape a Curly Brace in an f-string

**Difficulty:** Medium

```python
print(f"The set has {{3}} items")
```

## Q26. Read a Value and Echo With Labels

**Difficulty:** Easy

```python
name = input()
print(f"Hello {name}!")
```

## Q27. Print a Table Row

**Difficulty:** Medium

```python
item = input()
qty = int(input())
price = float(input())
print(f"{item:<10}{qty:>4}{price:>8.2f}")
```

## Q28. Read Two Numbers on the Same Line and Print Sum

**Difficulty:** Easy

```python
a, b = map(int, input().split())
print(a + b)
```

## Q29. Format With a Plus Sign for Positives

**Difficulty:** Medium

```python
n = int(input())
print(f"{n:+d}")
```

## Q30. Build a Multi-Line Output

**Difficulty:** Medium

```python
values = [int(input()) for _ in range(3)]
print(*values, sep=" | ")
```
