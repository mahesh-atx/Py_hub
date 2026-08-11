# Solutions — 11-dictionaries

> Try each problem yourself first. Solutions are for checking after a genuine attempt.

## Q1. Create and Print a Dictionary

**Difficulty:** Very Easy

```python
d = {"name": "Aman", "age": 25}
print(d)
```

## Q2. Access a Value by Key

**Difficulty:** Very Easy

```python
product = input()
price = int(input())
d = {"product": product, "price": price}
print(d["price"])
```

## Q3. Add a New Key

**Difficulty:** Easy

```python
item = input()
quantity = int(input())
d = {"item": item, "quantity": quantity}
d["status"] = "ok"
print(d)
```

## Q4. Update a Value

**Difficulty:** Easy

```python
d = {"price": int(input())}
d["price"] = d["price"] * 1.1
print(d["price"])
```

## Q5. Number of Key-Value Pairs

**Difficulty:** Very Easy

```python
d = {}
for _ in range(3):
    name = input()
    score = int(input())
    d[name] = score
print(len(d))
```

## Q6. Print the Keys

**Difficulty:** Easy

```python
d = {}
for _ in range(3):
    city = input()
    country = input()
    d[city] = country
print(d.keys())
```

## Q7. Print the Values

**Difficulty:** Easy

```python
d = {}
for _ in range(3):
    name = input()
    age = int(input())
    d[name] = age
print(d.values())
```

## Q8. Remove a Key

**Difficulty:** Easy

```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
target = input()
del d[target]
print(d)
```

## Q9. Check If a Key Exists

**Difficulty:** Easy

```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
query = input()
if query in d:
    print("Found")
else:
    print("Not found")
```

## Q10. Get With a Default

**Difficulty:** Easy

```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
query = input()
print(d.get(query, 0))
```

## Q11. Loop Over Items

**Difficulty:** Easy

```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
for k, v in d.items():
    print(f"{k}: {v}")
```

## Q12. Sum of All Values

**Difficulty:** Easy

```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
print(sum(d.values()))
```

## Q13. Key With Maximum Value

**Difficulty:** Medium

```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
best = None
best_score = -1
for name, score in d.items():
    if score > best_score:
        best_score = score
        best = name
print(best)
```

## Q14. Count Character Frequencies

**Difficulty:** Medium

```python
s = input()
d = {}
for ch in s:
    d[ch] = d.get(ch, 0) + 1
print(d)
```

## Q15. Count Word Frequencies

**Difficulty:** Medium

```python
s = input()
d = {}
for w in s.split():
    d[w] = d.get(w, 0) + 1
print(d)
```

## Q16. Dictionary of Squares

**Difficulty:** Medium

```python
n = int(input())
d = {}
for i in range(1, n + 1):
    d[i] = i ** 2
print(d)
```

## Q17. Nested Dictionary Access

**Difficulty:** Medium

```python
name = input()
age = int(input())
city = input()
d = {"person": {"name": name, "age": age, "city": city}}
print(d["person"]["city"])
```

## Q18. Average of Values

**Difficulty:** Medium

```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
print(f"{sum(d.values()) / len(d):.2f}")
```

## Q19. Sum of Values for Even Keys

**Difficulty:** Medium

```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[int(k)] = int(v)
total = 0
for k, v in d.items():
    if k % 2 == 0:
        total += v
print(total)
```

## Q20. Most Frequent Character

**Difficulty:** Medium

```python
s = input()
d = {}
for ch in s:
    d[ch] = d.get(ch, 0) + 1
best = None
best_count = -1
for ch in s:
    if d[ch] > best_count:
        best_count = d[ch]
        best = ch
print(best)
```

## Q21. Invert a Dictionary

**Difficulty:** Medium

```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
inv = {}
for k, v in d.items():
    inv[v] = k
print(inv)
```

## Q22. Count Words Starting With Each Letter

**Difficulty:** Medium

```python
s = input()
d = {}
for w in s.split():
    letter = w[0].lower()
    d[letter] = d.get(letter, 0) + 1
print(d)
```

## Q23. Dictionary With a List Value

**Difficulty:** Medium

```python
name = input()
s1 = int(input())
s2 = int(input())
s3 = int(input())
d = {"name": name, "scores": [s1, s2, s3]}
print(sum(d["scores"]))
```

## Q24. Merge Two Dictionaries

**Difficulty:** Medium

```python
def parse(line):
    d = {}
    for part in line.split(","):
        k, v = part.split(":")
        d[k] = int(v)
    return d
a = parse(input())
b = parse(input())
a.update(b)
print(a)
```

## Q25. Count Word Lengths

**Difficulty:** Medium

```python
s = input()
d = {}
for w in s.split():
    L = len(w)
    d[L] = d.get(L, 0) + 1
print(d)
```

## Q26. Group Words by Length

**Difficulty:** Hard

```python
s = input()
d = {}
for w in s.split():
    d.setdefault(len(w), []).append(w)
print(d)
```

## Q27. Highest Total per Student (nested)

**Difficulty:** Hard

```python
n = int(input())
d = {}
order = []
for _ in range(n):
    name, score = input().split()
    score = int(score)
    if name not in d:
        d[name] = 0
        order.append(name)
    d[name] += score
for name in order:
    print(f"{name}: {d[name]}")
```

## Q28. Values Greater Than a Threshold

**Difficulty:** Medium

```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
t = int(input())
print(sum(1 for v in d.values() if v > t))
```

## Q29. Print Sorted by Key

**Difficulty:** Medium

```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
for k in sorted(d.keys()):
    print(f"{k}: {d[k]}")
```

## Q30. Grade From Average (nested)

**Difficulty:** Hard

```python
n = int(input())
d = {}
for _ in range(n):
    name = input()
    s1 = int(input())
    s2 = int(input())
    s3 = int(input())
    avg = (s1 + s2 + s3) / 3
    if avg >= 80:
        grade = "A"
    elif avg >= 60:
        grade = "B"
    elif avg >= 40:
        grade = "C"
    else:
        grade = "F"
    d[name] = {"scores": [s1, s2, s3], "grade": grade}
print(d)
```
