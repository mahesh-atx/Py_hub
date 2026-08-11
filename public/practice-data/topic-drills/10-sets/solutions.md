# Solutions — 10-sets

> Try each problem yourself first. Solutions are for checking after a genuine attempt.

## Q1. Create a Set

**Difficulty:** Very Easy

```python
s = {1, 2, 3}
print(s)
```

## Q2. Length of a Set

**Difficulty:** Very Easy

```python
lst = [int(x) for x in input().split()]
print(len(set(lst)))
```

## Q3. Add a Value to a Set

**Difficulty:** Easy

```python
s = set(int(x) for x in input().split())
x = int(input())
s.add(x)
print(s)
```

## Q4. Remove a Value From a Set

**Difficulty:** Easy

```python
s = set(int(x) for x in input().split())
x = int(input())
s.discard(x)
print(s)
```

## Q5. Union of Two Sets

**Difficulty:** Easy

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(A | B)
```

## Q6. Intersection of Two Sets

**Difficulty:** Easy

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(A & B)
```

## Q7. Difference of Two Sets

**Difficulty:** Easy

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(A - B)
```

## Q8. Remove Duplicates From a List

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
print(list(set(lst)))
```

## Q9. Count Unique Characters

**Difficulty:** Easy

```python
s = input()
print(len(set(s)))
```

## Q10. Check Membership

**Difficulty:** Easy

```python
s = set(int(x) for x in input().split())
x = int(input())
if x in s:
    print("Present")
else:
    print("Absent")
```

## Q11. Symmetric Difference

**Difficulty:** Medium

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(A ^ B)
```

## Q12. Check Subset

**Difficulty:** Medium

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
if A <= B:
    print("Subset")
else:
    print("Not subset")
```

## Q13. Check Superset

**Difficulty:** Medium

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
if A >= B:
    print("Superset")
else:
    print("Not superset")
```

## Q14. Sum of Unique Values

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
print(sum(set(lst)))
```

## Q15. Check Disjoint

**Difficulty:** Medium

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
if not (A & B):
    print("Disjoint")
else:
    print("Not disjoint")
```

## Q16. Count Distinct Digits

**Difficulty:** Medium

```python
n = int(input())
print(len(set(str(n))))
```

## Q17. Common Elements Count

**Difficulty:** Medium

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(len(A & B))
```

## Q18. Union Size

**Difficulty:** Medium

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(len(A | B))
```

## Q19. Only in A (size of A - B)

**Difficulty:** Medium

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(len(A - B))
```

## Q20. Common Values as a Sorted List

**Difficulty:** Medium

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(sorted(A & B))
```

## Q21. Check for Duplicates

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
if len(lst) > len(set(lst)):
    print("Duplicate")
else:
    print("Unique")
```

## Q22. Unique Vowels

**Difficulty:** Medium

```python
s = input().lower()
print(len(set(s) & set("aeiou")))
```

## Q23. Elements in A or B but Not in C

**Difficulty:** Hard

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
C = set(int(x) for x in input().split())
print((A | B) - C)
```

## Q24. Intersection of Three Sets

**Difficulty:** Medium

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
C = set(int(x) for x in input().split())
print(A & B & C)
```

## Q25. Unique Words in a Sentence

**Difficulty:** Medium

```python
s = input()
print(len(set(s.split())))
```

## Q26. Symmetric Difference Size

**Difficulty:** Medium

```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(len(A ^ B))
```

## Q27. Second Largest Distinct Value

**Difficulty:** Medium

```python
lst = [int(x) for x in input().split()]
print(sorted(set(lst))[-2])
```

## Q28. Max of a Set

**Difficulty:** Easy

```python
lst = [int(x) for x in input().split()]
print(max(set(lst)))
```

## Q29. Check If All Values Are Even

**Difficulty:** Medium

```python
s = set(int(x) for x in input().split())
if all(x % 2 == 0 for x in s):
    print("All even")
else:
    print("Not all even")
```

## Q30. Set of First Letters

**Difficulty:** Medium

```python
s = input()
print(set(w[0] for w in s.split()))
```
