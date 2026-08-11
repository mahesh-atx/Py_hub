# Batch 4 — Solutions

> ⚠️ **Try the problem yourself first.**
> **Note on sets:** Python prints sets like `{1, 2, 3}`, but the *order* of elements inside the braces is not guaranteed. The judge accepts any order for set outputs.

## Q301. Create a Tuple from Two Values
```python
a = int(input())
b = int(input())
t = (a, b)
print(t)
```

## Q302. Length of a Tuple
```python
t = tuple(input().split())
print(len(t))
```

## Q303. First and Last Element of a Tuple
```python
t = tuple(input().split())
print(f"First: {t[0]}")
print(f"Last: {t[-1]}")
```

## Q304. Sum of Elements of a Tuple
```python
t = [int(x) for x in input().split()]
print(sum(t))
```

## Q305. Create a Set from a List
```python
lst = input().split()
s = set(lst)
print(s)
```
> Note: This prints the values as strings. The judge compares set contents ignoring order.

## Q306. Length of a Set
```python
lst = [int(x) for x in input().split()]
print(len(set(lst)))
```

## Q307. Add an Element to a Set
```python
lst = [int(x) for x in input().split()]
s = set(lst)
x = int(input())
s.add(x)
print(s)
```

## Q308. Remove an Element from a Set
```python
lst = [int(x) for x in input().split()]
s = set(lst)
x = int(input())
s.discard(x)
print(s)
```

## Q309. Union of Two Sets
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(A | B)
```

## Q310. Intersection of Two Sets
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(A & B)
```

## Q311. Difference of Two Sets
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(A - B)
```

## Q312. Set of Unique Words
```python
words = input().split()
print(set(words))
```

## Q313. Check If a Value Is in a Set
```python
s = set(int(x) for x in input().split())
x = int(input())
if x in s:
    print("Present")
else:
    print("Absent")
```

## Q314. Unpack a Tuple
```python
a = int(input())
b = int(input())
t = (a, b)
x, y = t
print(x + y)
```

## Q315. Print the Type of a Tuple and a Set
```python
print(type((1, 2)))
print(type({1, 2}))
```

## Q316. Count Distinct Characters
```python
s = input()
print(len(set(s)))
```

## Q317. Tuple of a Number's Digits
```python
n = int(input())
digits = []
for ch in str(n):
    digits.append(int(ch))
print(tuple(digits))
```

## Q318. Add Multiple Values to a Set
```python
n = int(input())
s = set()
for _ in range(n):
    s.add(int(input()))
print(s)
```

## Q319. Remove Duplicates Using a Set
```python
lst = [int(x) for x in input().split()]
print(list(set(lst)))
```

## Q320. Largest Element of a Set
```python
s = set(int(x) for x in input().split())
print(max(s))
```

## Q321. Count Common Elements
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(len(A & B))
```

## Q322. Symmetric Difference
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(A ^ B)
```

## Q323. Check Subset
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
if A <= B:
    print("Subset")
else:
    print("Not subset")
```

## Q324. Sum of Unique Elements
```python
lst = [int(x) for x in input().split()]
print(sum(set(lst)))
```

## Q325. Create a Tuple from a List
```python
lst = [int(x) for x in input().split()]
print(tuple(lst))
```

## Q326. Unpack a Three-Element Tuple
```python
a = int(input())
b = int(input())
c = int(input())
t = (a, b, c)
x, y, z = t
print((x + y + z) / 3)
```

## Q327. Count Vowels Using a Set
```python
s = input().lower()
vowels = set("aeiou")
count = 0
for ch in s:
    if ch in vowels:
        count += 1
print(count)
```

## Q328. Common Elements as a List
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(list(A & B))
```

## Q329. Distinct Vowels
```python
s = input().lower()
print(len(set(s) & set("aeiou")))
```

## Q330. Swap Two Numbers Using a Tuple
```python
a = int(input())
b = int(input())
a, b = b, a
print(a)
print(b)
```

## Q331. 2nd and 3rd Elements of a Tuple
```python
t = tuple(input().split())
print(t[1])
print(t[2])
```

## Q332. Unique Elements in Order (set for fast check)
```python
lst = [int(x) for x in input().split()]
result = []
seen = set()
for x in lst:
    if x not in seen:
        seen.add(x)
        result.append(x)
print(result)
```

## Q333. Deduplicate a String (set-based)
```python
s = input()
seen = set()
result = ""
for ch in s:
    if ch not in seen:
        seen.add(ch)
        result += ch
print(result)
```

## Q334. Intersection of Three Sets
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
C = set(int(x) for x in input().split())
print(A & B & C)
```

## Q335. Number of Elements in A but Not in B
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(len(A - B))
```

## Q336. Check Disjoint
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
if len(A & B) == 0:
    print("Disjoint")
else:
    print("Not disjoint")
```

## Q337. Each Word as a Tuple of Letters
```python
sentence = input()
print([tuple(w) for w in sentence.split()])
```

## Q338. Union Size
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(len(A | B))
```

## Q339. Second Element of Each Tuple
```python
n = int(input())
for _ in range(n):
    a, b = map(int, input().split())
    t = (a, b)
    print(t[1])
```

## Q340. All Unique Characters
```python
s = input()
if len(s) == len(set(s)):
    print("Unique")
else:
    print("Duplicate")
```

## Q341. Sum of Common Elements
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(sum(A & B))
```

## Q342. Difference as Sorted List
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(sorted(A - B))
```

## Q343. Tuple Equality
```python
t1 = tuple(input().split())
t2 = tuple(input().split())
if t1 == t2:
    print("Equal")
else:
    print("Not equal")
```

## Q344. Symmetric Difference as Sorted List
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(sorted(A ^ B))
```

## Q345. Max and Min of a Set
```python
s = set(int(x) for x in input().split())
print(f"Max: {max(s)}")
print(f"Min: {min(s)}")
```

## Q346. Number of Unique Digits
```python
n = int(input())
print(len(set(str(n))))
```

## Q347. Union of Two Lists
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(list(A | B))
```

## Q348. Tuple of Squares
```python
lst = [int(x) for x in input().split()]
print(tuple(x ** 2 for x in lst))
```

## Q349. Check If a Set Is Empty
```python
line = input().split()
s = set(line)
if len(s) == 0:
    print("Empty")
else:
    print(s)
```

## Q350. First Set Only (sorted list)
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(sorted(A - B))
```

## Q351. Even and Odd in a Tuple
```python
t = tuple(int(x) for x in input().split())
even = 0
odd = 0
for x in t:
    if x % 2 == 0:
        even += 1
    else:
        odd += 1
print(even, odd)
```

## Q352. Common Characters of Two Strings
```python
a = input()
b = input()
print(sorted(set(a) & set(b)))
```

## Q353. Sum of Even Elements of a Set
```python
s = set(int(x) for x in input().split())
total = 0
for x in s:
    if x % 2 == 0:
        total += x
print(total)
```

## Q354. Rotate Three Values
```python
a = int(input())
b = int(input())
c = int(input())
a, b, c = c, a, b
print(a)
print(b)
print(c)
```

## Q355. Distinct Pairs Count
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(len(A) * len(B))
```

## Q356. Repeated Values in a List
```python
lst = [int(x) for x in input().split()]
seen = set()
dups = set()
for x in lst:
    if x in seen:
        dups.add(x)
    else:
        seen.add(x)
print(dups)
```

## Q357. First and Last Digits as a Tuple
```python
n = input()
print((n[0], n[-1]))
```

## Q358. Set of Digit Characters
```python
s = input()
digits = set()
for ch in s:
    if ch.isdigit():
        digits.add(ch)
print(digits)
```

## Q359. Duplicate Detection (set)
```python
lst = [int(x) for x in input().split()]
if len(lst) > len(set(lst)):
    print("Duplicate")
else:
    print("Unique")
```

## Q360. Sum of Distinct Across Two Lists
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(sum(A | B))
```

## Q361. In A and B but Not C
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
C = set(int(x) for x in input().split())
print((A & B) - C)
```

## Q362. Symmetric Difference Size
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(len(A ^ B))
```

## Q363. Positions of a Character
```python
s = input()
ch = input()
positions = []
for i in range(len(s)):
    if s[i] == ch:
        positions.append(i)
print(tuple(positions))
```

## Q364. Common to All Three Lists
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
C = set(int(x) for x in input().split())
print(A & B & C)
```

## Q365. Check Superset
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
if A >= B:
    print("Superset")
else:
    print("Not superset")
```

## Q366. Tuple of Word Lengths
```python
sentence = input()
print(tuple(len(w) for w in sentence.split()))
```

## Q367. Set of First Letters
```python
sentence = input()
print(set(w[0] for w in sentence.split()))
```

## Q368. Sum Two Tuples by Index
```python
t1 = tuple(int(x) for x in input().split())
t2 = tuple(int(x) for x in input().split())
result = []
for i in range(len(t1)):
    result.append(t1[i] + t2[i])
print(tuple(result))
```

## Q369. Remove B's Elements from A
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(A - B)
```

## Q370. Vowels per Word
```python
sentence = input()
vowels = set("aeiou")
counts = []
for w in sentence.split():
    c = 0
    for ch in w.lower():
        if ch in vowels:
            c += 1
    counts.append(c)
print(tuple(counts))
```

## Q371. Largest and Second Largest Distinct
```python
lst = [int(x) for x in input().split()]
s = sorted(set(lst))
print(f"Largest: {s[-1]}")
print(f"Second: {s[-2]}")
```

## Q372. Set Equality
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
if A == B:
    print("Equal")
else:
    print("Not equal")
```

## Q373. Common Values Sorted
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(sorted(A & B))
```

## Q374. Distinct Vowels in a Sentence
```python
sentence = input().lower()
print(len(set(sentence) & set("aeiou")))
```

## Q375. In A or B but Not C
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
C = set(int(x) for x in input().split())
print((A | B) - C)
```

## Q376. First and Last Elements as a Tuple
```python
lst = [int(x) for x in input().split()]
print((lst[0], lst[-1]))
```

## Q377. Distinct Common Characters Count
```python
a = input()
b = input()
print(len(set(a) & set(b)))
```

## Q378. Set of Digits of a Number
```python
n = input()
print(set(n))
```

## Q379. Sum of Distinct Elements
```python
lst = [int(x) for x in input().split()]
print(sum(set(lst)))
```

## Q380. Tuple of Multiples
```python
k = int(input())
n = int(input())
result = []
for i in range(1, n + 1):
    result.append(i * k)
print(tuple(result))
```

## Q381. Elements Only in A
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(len(A - B))
```

## Q382. Second Largest Distinct
```python
lst = [int(x) for x in input().split()]
print(sorted(set(lst))[-2])
```

## Q383. A's Elements Not in B, in Order
```python
A = [int(x) for x in input().split()]
B = set(int(x) for x in input().split())
result = []
for x in A:
    if x not in B:
        result.append(x)
print(result)
```

## Q384. Permutation Check
```python
a = input()
b = input()
if sorted(a) == sorted(b):
    print("Permutation")
else:
    print("Not permutation")
```

## Q385. Union of Three Sets
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
C = set(int(x) for x in input().split())
print(A | B | C)
```

## Q386. Matching Indices as a Tuple
```python
a = [int(x) for x in input().split()]
b = [int(x) for x in input().split()]
result = []
for i in range(len(a)):
    if a[i] == b[i]:
        result.append(i)
print(tuple(result))
```

## Q387. Characters in Every Word
```python
sentence = input()
words = sentence.split()
common = set(words[0])
for w in words[1:]:
    common = common & set(w)
print(common)
```

## Q388. All Even Set
```python
s = set(int(x) for x in input().split())
all_even = True
for x in s:
    if x % 2 != 0:
        all_even = False
        break
if all_even:
    print("All even")
else:
    print("Not all even")
```

## Q389. First and Last Vowels
```python
s = input()
vowels = "aeiouAEIOU"
first = None
last = None
for ch in s:
    if ch in vowels:
        if first is None:
            first = ch
        last = ch
if first is None:
    print("None")
else:
    print((first, last))
```

## Q390. Common to All Three (sorted)
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
C = set(int(x) for x in input().split())
print(sorted(A & B & C))
```

## Q391. Characters Appearing Once
```python
s = input()
result = []
for ch in s:
    if s.count(ch) == 1:
        result.append(ch)
print(sorted(result))
```

## Q392. Unique Elements as a Tuple
```python
lst = [int(x) for x in input().split()]
result = []
seen = set()
for x in lst:
    if x not in seen:
        seen.add(x)
        result.append(x)
print(tuple(result))
```

## Q393. Subset from Lists
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
if A <= B:
    print("Subset")
else:
    print("Not subset")
```

## Q394. Sum of Tuple Endpoints
```python
t = tuple(int(x) for x in input().split())
print(t[0] + t[-1])
```

## Q395. Count Common Distinct
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
print(len(A & B))
```

## Q396. Second Smallest Distinct
```python
lst = [int(x) for x in input().split()]
print(sorted(set(lst))[1])
```

## Q397. Positions of Digit Characters
```python
s = input()
positions = []
for i in range(len(s)):
    if s[i].isdigit():
        positions.append(i)
print(tuple(positions))
```

## Q398. Symmetric Difference of Three Sets
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
C = set(int(x) for x in input().split())
print(A ^ B ^ C)
```

## Q399. Values in Exactly Two of Three Sets
```python
A = set(int(x) for x in input().split())
B = set(int(x) for x in input().split())
C = set(int(x) for x in input().split())
all_values = A | B | C
count = 0
for x in all_values:
    appearances = (x in A) + (x in B) + (x in C)
    if appearances == 2:
        count += 1
print(count)
```

## Q400. Values Appearing Exactly Once (tuple)
```python
lst = [int(x) for x in input().split()]
result = []
seen = set()
for x in lst:
    if x not in seen:
        seen.add(x)
# now build those appearing exactly once, in first-appearance order
for x in lst:
    if lst.count(x) == 1 and x not in result:
        result.append(x)
print(tuple(result))
```

---

## Batch 4 Recap
- You created and indexed tuples, unpacked them (`a, b, c = t`), and used them for swapping and grouping.
- You created sets, added/removed elements, and used `| & - ^ <= >=` for union, intersection, difference, symmetric difference, and subset/superset tests.
- You used sets to deduplicate lists and strings, count distinct values/digits/characters/vowels, and detect duplicates.
- You combined tuples, lists, strings, and sets with loops and conditions.

Dictionaries and Functions (Batch 5) build directly on this, giving you the final tools for the fundamentals course.
