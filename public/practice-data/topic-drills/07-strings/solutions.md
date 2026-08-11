# Solutions — 07-strings

> Try each problem yourself first. Solutions are for checking after a genuine attempt.

## Q1. String Length

**Difficulty:** Very Easy

```python
s = input()
print(len(s))
```

## Q2. First Character

**Difficulty:** Very Easy

```python
s = input()
print(s[0])
```

## Q3. Last Character

**Difficulty:** Very Easy

```python
s = input()
print(s[-1])
```

## Q4. Uppercase

**Difficulty:** Very Easy

```python
s = input()
print(s.upper())
```

## Q5. Lowercase

**Difficulty:** Very Easy

```python
s = input()
print(s.lower())
```

## Q6. Strip Whitespace

**Difficulty:** Easy

```python
s = input()
print(s.strip())
```

## Q7. Replace a Character

**Difficulty:** Easy

```python
s = input()
ch = input()
print(s.replace(" ", ch))
```

## Q8. Split a String

**Difficulty:** Easy

```python
s = input()
print(s.split())
```

## Q9. Join a List of Words

**Difficulty:** Easy

```python
words = input().split()
print(" - ".join(words))
```

## Q10. Slice First Three Characters

**Difficulty:** Easy

```python
s = input()
print(s[:3])
```

## Q11. Slice Last Three Characters

**Difficulty:** Easy

```python
s = input()
print(s[-3:])
```

## Q12. Reverse a String

**Difficulty:** Easy

```python
s = input()
print(s[::-1])
```

## Q13. Remove First and Last Characters

**Difficulty:** Easy

```python
s = input()
print(s[1:-1])
```

## Q14. Check Palindrome

**Difficulty:** Medium

```python
s = input()
if s == s[::-1]:
    print("Palindrome")
else:
    print("Not palindrome")
```

## Q15. Count a Character

**Difficulty:** Easy

```python
s = input()
ch = input()
print(s.count(ch))
```

## Q16. Middle Character(s)

**Difficulty:** Medium

```python
s = input()
n = len(s)
if n % 2 == 1:
    print(s[n // 2])
else:
    print(s[n // 2 - 1 : n // 2 + 1])
```

## Q17. Every Other Character

**Difficulty:** Easy

```python
s = input()
print(s[::2])
```

## Q18. Replace a Word

**Difficulty:** Medium

```python
s = input()
w1 = input()
w2 = input()
print(s.replace(w1, w2))
```

## Q19. Count Words

**Difficulty:** Easy

```python
s = input()
print(len(s.split()))
```

## Q20. Uppercase First Letter of Each Word

**Difficulty:** Medium

```python
s = input()
print(" ".join(w[0].upper() + w[1:] for w in s.split()))
```

## Q21. Reverse Each Word

**Difficulty:** Medium

```python
s = input()
print(" ".join(w[::-1] for w in s.split()))
```

## Q22. First Letter of Each Word

**Difficulty:** Medium

```python
s = input()
print("".join(w[0] for w in s.split()))
```

## Q23. Check if Starts and Ends With Same Character

**Difficulty:** Easy

```python
s = input()
if s[0] == s[-1]:
    print("Yes")
else:
    print("No")
```

## Q24. Count Vowels

**Difficulty:** Medium

```python
s = input().lower()
print(sum(1 for c in s if c in "aeiou"))
```

## Q25. Split on a Specific Character

**Difficulty:** Medium

```python
s = input()
print(s.split(","))
```

## Q26. Strip and Uppercase

**Difficulty:** Easy

```python
s = input()
print(s.strip().upper())
```

## Q27. Extract Digits

**Difficulty:** Medium

```python
s = input()
print("".join(c for c in s if c.isdigit()))
```

## Q28. Remove Vowels

**Difficulty:** Medium

```python
s = input()
print("".join(c for c in s if c.lower() not in "aeiou"))
```

## Q29. Word Lengths

**Difficulty:** Medium

```python
s = input()
for w in s.split():
    print(f"{w}: {len(w)}")
```

## Q30. Reverse the Order of Words

**Difficulty:** Medium

```python
s = input()
print(" ".join(s.split()[::-1]))
```
