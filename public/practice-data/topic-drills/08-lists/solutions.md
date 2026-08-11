# Solutions — 08-lists

> Try each problem yourself first. Solutions are for checking after a genuine attempt.

## Q1. Create a List Literal

**Difficulty:** Very Easy

```python
lst = [10, 20, 30]
print(lst)
```

## Q2. Length of a List

**Difficulty:** Very Easy

```python
lst = input().split()
print(len(lst))
```

## Q3. First Element

**Difficulty:** Very Easy

```python
lst = input().split()
print(lst[0])
```

## Q4. Last Element

**Difficulty:** Very Easy

```python
lst = input().split()
print(lst[-1])
```

## Q5. Sum of a List

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
print(sum(lst))
```

## Q6. Append a Value

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
x = int(input())
lst.append(x)
print(lst)
```

## Q7. Insert at the Front

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
x = int(input())
lst.insert(0, x)
print(lst)
```

## Q8. Pop the Last Element

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
removed = lst.pop()
print(removed)
print(lst)
```

## Q9. Remove by Value

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
x = int(input())
lst.remove(x)
print(lst)
```

## Q10. Sort Ascending

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
lst.sort()
print(lst)
```

## Q11. Sort Descending

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
lst.sort(reverse=True)
print(lst)
```

## Q12. Reverse a List

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
lst.reverse()
print(lst)
```

## Q13. Slice a List

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
print(lst[1:3])
```

## Q14. Loop Over a List

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
for x in lst:
    print(x)
```

## Q15. Count Even Numbers

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
print(sum(1 for x in lst if x % 2 == 0))
```

## Q16. Largest Element

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
print(max(lst))
```

## Q17. Second Largest

**Difficulty:** Medium

```python
lst = sorted(int(x) for x in input().split())
print(lst[-2])
```

## Q18. Index of a Value

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
x = int(input())
print(lst.index(x) if x in lst else -1)
```

## Q19. Check Membership

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
x = int(input())
if x in lst:
    print("Found")
else:
    print("Not found")
```

## Q20. Count Occurrences

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
x = int(input())
print(lst.count(x))
```

## Q21. Elements at Even Indices

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
for i in range(len(lst)):
    if i % 2 == 0:
        print(lst[i])
```

## Q22. Remove All Occurrences

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
x = int(input())
print([v for v in lst if v != x])
```

## Q23. Remove Duplicates (keep order)

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
result = []
for x in lst:
    if x not in result:
        result.append(x)
print(result)
```

## Q24. List of Squares

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
print([x ** 2 for x in lst])
```

## Q25. Sum of Even Elements

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
print(sum(x for x in lst if x % 2 == 0))
```

## Q26. Check If Sorted

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
sorted_flag = all(lst[i] <= lst[i+1] for i in range(len(lst)-1))
if sorted_flag:
    print("Sorted")
else:
    print("Not sorted")
```

## Q27. Swap First and Last

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
lst[0], lst[-1] = lst[-1], lst[0]
print(lst)
```

## Q28. Shift Left by One

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
print(lst[1:] + [lst[0]])
```

## Q29. Elements Greater Than Their Neighbors

**Difficulty:** Hard

```python
lst = [int(x) for x in input().split()]
count = 0
for i in range(1, len(lst) - 1):
    if lst[i] > lst[i-1] and lst[i] > lst[i+1]:
        count += 1
print(count)
```

## Q30. Average of a List

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
print(f"{sum(lst) / len(lst):.2f}")
```
