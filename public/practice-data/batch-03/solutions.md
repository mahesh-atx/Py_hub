# Batch 3 — Solutions

> ⚠️ **Try the problem yourself first.**

## Q201. Print Each Character
```python
s = input()
for ch in s:
    print(ch)
```

## Q202. Length of a String
```python
s = input()
print(len(s))
```

## Q203. Uppercase a String
```python
s = input()
print(s.upper())
```

## Q204. Lowercase a String
```python
s = input()
print(s.lower())
```

## Q205. First Character
```python
s = input()
print(s[0])
```

## Q206. Last Character
```python
s = input()
print(s[-1])
```

## Q207. String Repeated
```python
s = input()
n = int(input())
print(s * n)
```

## Q208. First Half of a String
```python
s = input()
print(s[:len(s) // 2])
```

## Q209. Count of a Character
```python
s = input()
ch = input()
count = 0
for c in s:
    if c == ch:
        count += 1
print(count)
```

## Q210. List of Numbers 1 to N
```python
n = int(input())
lst = []
for i in range(1, n + 1):
    lst.append(i)
print(lst)
```

## Q211. First and Last Elements
```python
lst = input().split()
print(f"First: {lst[0]}")
print(f"Last: {lst[-1]}")
```

## Q212. Sum of a List
```python
lst = [int(x) for x in input().split()]
print(sum(lst))
```

## Q213. Count of Elements
```python
lst = input().split()
print(len(lst))
```

## Q214. Largest Element
```python
lst = [int(x) for x in input().split()]
mx = lst[0]
for x in lst:
    if x > mx:
        mx = x
print(mx)
```

## Q215. Smallest Element
```python
lst = [int(x) for x in input().split()]
mn = lst[0]
for x in lst:
    if x < mn:
        mn = x
print(mn)
```

## Q216. Print Elements
```python
lst = [int(x) for x in input().split()]
for x in lst:
    print(x)
```

## Q217. Reverse a List
```python
lst = [int(x) for x in input().split()]
lst.reverse()
print(lst)
```

## Q218. Sort a List
```python
lst = [int(x) for x in input().split()]
lst.sort()
print(lst)
```

## Q219. Append a Number
```python
lst = [int(x) for x in input().split()]
x = int(input())
lst.append(x)
print(lst)
```

## Q220. Insert at Front
```python
lst = [int(x) for x in input().split()]
x = int(input())
lst.insert(0, x)
print(lst)
```

## Q221. Remove Last Element
```python
lst = [int(x) for x in input().split()]
removed = lst.pop()
print(removed)
print(lst)
```

## Q222. Remove First Element
```python
lst = [int(x) for x in input().split()]
lst.pop(0)
print(lst)
```

## Q223. Reverse a String
```python
s = input()
print(s[::-1])
```

## Q224. First Three Characters
```python
s = input()
print(s[:3])
```

## Q225. Last Three Characters
```python
s = input()
print(s[-3:])
```

## Q226. Replace Spaces with Dashes
```python
s = input()
print(s.replace(" ", "-"))
```

## Q227. Strip Spaces
```python
s = input()
print(s.strip())
```

## Q228. Remove First and Last Characters
```python
s = input()
print(s[1:-1])
```

## Q229. Add Two Lists
```python
a = [int(x) for x in input().split()]
b = [int(x) for x in input().split()]
print(a + b)
```

## Q230. Count Even Numbers
```python
lst = [int(x) for x in input().split()]
count = 0
for x in lst:
    if x % 2 == 0:
        count += 1
print(count)
```

## Q231. Sum of Even Elements
```python
lst = [int(x) for x in input().split()]
total = 0
for x in lst:
    if x % 2 == 0:
        total += x
print(total)
```

## Q232. Middle Element (odd length)
```python
lst = [int(x) for x in input().split()]
print(lst[len(lst) // 2])
```

## Q233. Remove an Element by Value
```python
lst = [int(x) for x in input().split()]
x = int(input())
lst.remove(x)
print(lst)
```

## Q234. Elements at Even Indices
```python
lst = [int(x) for x in input().split()]
for i in range(len(lst)):
    if i % 2 == 0:
        print(lst[i])
```

## Q235. Elements at Odd Indices
```python
lst = [int(x) for x in input().split()]
for i in range(len(lst)):
    if i % 2 != 0:
        print(lst[i])
```

## Q236. Elements Greater Than Threshold
```python
lst = [int(x) for x in input().split()]
t = int(input())
for x in lst:
    if x > t:
        print(x)
```

## Q237. Check If Value Exists
```python
lst = [int(x) for x in input().split()]
x = int(input())
if x in lst:
    print("Found")
else:
    print("Not found")
```

## Q238. Count Occurrences of a Value
```python
lst = [int(x) for x in input().split()]
x = int(input())
count = 0
for v in lst:
    if v == x:
        count += 1
print(count)
```

## Q239. Split Comma-Separated String
```python
s = input()
print(s.split(","))
```

## Q240. Join Words into a Sentence
```python
words = input().split()
print(" ".join(words))
```

## Q241. Count Words
```python
s = input()
print(len(s.split()))
```

## Q242. Sum of a List (parse from line)
```python
lst = [int(x) for x in input().split()]
print(sum(lst))
```

## Q243. Average of a List
```python
lst = [int(x) for x in input().split()]
print(f"{sum(lst) / len(lst):.2f}")
```

## Q244. Palindrome String
```python
s = input()
if s == s[::-1]:
    print("Palindrome")
else:
    print("Not palindrome")
```

## Q245. First Letter of Each Word
```python
s = input()
for word in s.split():
    print(word[0], end="")
```

## Q246. Replace a Word
```python
sentence = input()
word1 = input()
word2 = input()
print(sentence.replace(word1, word2))
```

## Q247. Capitalize Each Word
```python
s = input()
words = s.split()
result = []
for w in words:
    result.append(w[0].upper() + w[1:])
print(" ".join(result))
```

## Q248. Remove Vowels
```python
s = input()
result = ""
for ch in s:
    if ch.lower() not in "aeiou":
        result += ch
print(result)
```

## Q249. Count Words (robust whitespace)
```python
s = input()
print(len(s.split()))
```

## Q250. Sort Descending
```python
lst = [int(x) for x in input().split()]
lst.sort(reverse=True)
print(lst)
```

## Q251. Second Largest
```python
lst = [int(x) for x in input().split()]
lst.sort()
print(lst[-2])
```

## Q252. Remove Duplicates (keep order)
```python
lst = [int(x) for x in input().split()]
result = []
for x in lst:
    if x not in result:
        result.append(x)
print(result)
```

## Q253. Anagram
```python
a = input()
b = input()
if sorted(a) == sorted(b):
    print("Anagram")
else:
    print("Not anagram")
```

## Q254. Sum of Positive Elements
```python
lst = [int(x) for x in input().split()]
total = 0
for x in lst:
    if x > 0:
        total += x
print(total)
```

## Q255. Count Negative Elements
```python
lst = [int(x) for x in input().split()]
count = 0
for x in lst:
    if x < 0:
        count += 1
print(count)
```

## Q256. Find the Index of a Value
```python
lst = [int(x) for x in input().split()]
x = int(input())
idx = -1
for i in range(len(lst)):
    if lst[i] == x:
        idx = i
        break
print(idx)
```

## Q257. Reverse Each Word
```python
s = input()
words = s.split()
reversed_words = [w[::-1] for w in words]
print(" ".join(reversed_words))
```

## Q258. Even at Even Index
```python
lst = [int(x) for x in input().split()]
count = 0
for i in range(len(lst)):
    if i % 2 == 0 and lst[i] % 2 == 0:
        count += 1
print(count)
```

## Q259. First and Last Word
```python
words = input().split()
print(f"First: {words[0]}")
print(f"Last: {words[-1]}")
```

## Q260. List of Digits
```python
n = int(input())
digits = []
for ch in str(n):
    digits.append(int(ch))
print(digits)
```

## Q261. Local Peaks
```python
lst = [int(x) for x in input().split()]
count = 0
for i in range(1, len(lst) - 1):
    if lst[i] > lst[i-1] and lst[i] > lst[i+1]:
        count += 1
print(count)
```

## Q262. Check Sorted
```python
lst = [int(x) for x in input().split()]
sorted_flag = True
for i in range(len(lst) - 1):
    if lst[i] > lst[i+1]:
        sorted_flag = False
        break
if sorted_flag:
    print("Sorted")
else:
    print("Not sorted")
```

## Q263. Even Indices via Slicing
```python
lst = [int(x) for x in input().split()]
print(lst[::2])
```

## Q264. Reverse Each Number
```python
lst = [int(x) for x in input().split()]
result = []
for x in lst:
    rev = 0
    while x > 0:
        rev = rev * 10 + (x % 10)
        x //= 10
    result.append(rev)
print(result)
```

## Q265. Count Vowels
```python
s = input().lower()
count = 0
for ch in s:
    if ch in "aeiou":
        count += 1
print(count)
```

## Q266. Every Other Character
```python
s = input()
print(s[::2])
```

## Q267. First and Last Character Same
```python
s = input()
if s[0] == s[-1]:
    print("Yes")
else:
    print("No")
```

## Q268. Merge Alternating
```python
a = [int(x) for x in input().split()]
b = [int(x) for x in input().split()]
result = []
for i in range(len(a)):
    result.append(a[i])
    result.append(b[i])
print(result)
```

## Q269. Count Non-Space Characters
```python
s = input()
count = 0
for ch in s:
    if ch != " ":
        count += 1
print(count)
```

## Q270. Swap First and Last
```python
lst = [int(x) for x in input().split()]
lst[0], lst[-1] = lst[-1], lst[0]
print(lst)
```

## Q271. Squares of a List
```python
lst = [int(x) for x in input().split()]
result = []
for x in lst:
    result.append(x ** 2)
print(result)
```

## Q272. Count Each Character
```python
s = input()
seen = []
for ch in s:
    if ch not in seen:
        seen.append(ch)
for ch in seen:
    print(f"{ch}: {s.count(ch)}")
```

## Q273. Remove All Occurrences
```python
lst = [int(x) for x in input().split()]
x = int(input())
result = []
for v in lst:
    if v != x:
        result.append(v)
print(result)
```

## Q274. Sum at Even Indices
```python
lst = [int(x) for x in input().split()]
total = 0
for i in range(len(lst)):
    if i % 2 == 0:
        total += lst[i]
print(total)
```

## Q275. Words Starting With a Letter
```python
sentence = input()
letter = input().lower()
count = 0
for w in sentence.split():
    if w[0].lower() == letter:
        count += 1
print(count)
```

## Q276. Check Digits Only
```python
s = input()
digits_only = True
if len(s) == 0:
    digits_only = False
for ch in s:
    if not ("0" <= ch <= "9"):
        digits_only = False
        break
if digits_only:
    print("Digits only")
else:
    print("Not digits only")
```

## Q277. Middle Elements
```python
lst = [int(x) for x in input().split()]
print(lst[1:-1])
```

## Q278. Reverse a List (slicing)
```python
lst = [int(x) for x in input().split()]
print(lst[::-1])
```

## Q279. Largest and Smallest
```python
lst = [int(x) for x in input().split()]
print(f"Largest: {max(lst)}")
print(f"Smallest: {min(lst)}")
```

## Q280. Middle of a List (either middle)
```python
lst = [int(x) for x in input().split()]
if len(lst) % 2 == 0:
    print(lst[len(lst) // 2 - 1])
else:
    print(lst[len(lst) // 2])
```

## Q281. Count Greater Than Average
```python
lst = [int(x) for x in input().split()]
avg = sum(lst) / len(lst)
count = 0
for x in lst:
    if x > avg:
        count += 1
print(count)
```

## Q282. Shift Left by One
```python
lst = [int(x) for x in input().split()]
first = lst.pop(0)
lst.append(first)
print(lst)
```

## Q283. Extract Digits from String
```python
s = input()
result = ""
for ch in s:
    if "0" <= ch <= "9":
        result += ch
print(result)
```

## Q284. Count Palindromic Words
```python
s = input()
count = 0
for w in s.split():
    if w == w[::-1]:
        count += 1
print(count)
```

## Q285. Even/Odd Index Sums
```python
lst = [int(x) for x in input().split()]
even_sum = 0
odd_sum = 0
for i in range(len(lst)):
    if i % 2 == 0:
        even_sum += lst[i]
    else:
        odd_sum += lst[i]
print(even_sum, odd_sum)
```

## Q286. Word in Sentence
```python
sentence = input()
word = input()
if word in sentence:
    print("Present")
else:
    print("Absent")
```

## Q287. Each Word with Length
```python
s = input()
for w in s.split():
    print(f"{w}: {len(w)}")
```

## Q288. Numbers Joined by Comma
```python
lst = [int(x) for x in input().split()]
strings = [str(x) for x in lst]
print(",".join(strings))
```

## Q289. Elements Equal to Index
```python
lst = [int(x) for x in input().split()]
count = 0
for i in range(len(lst)):
    if lst[i] == i:
        count += 1
print(count)
```

## Q290. Longest Word
```python
s = input()
best = ""
for w in s.split():
    if len(w) > len(best):
        best = w
print(best)
```

## Q291. Reverse Word Order
```python
s = input()
words = s.split()
words.reverse()
print(" ".join(words))
```

## Q292. Common Elements
```python
a = [int(x) for x in input().split()]
b = [int(x) for x in input().split()]
result = []
for x in a:
    if x in b and x not in result:
        result.append(x)
print(result)
```

## Q293. Uppercase and Lowercase Counts
```python
s = input()
up = 0
lo = 0
for ch in s:
    if "A" <= ch <= "Z":
        up += 1
    elif "a" <= ch <= "z":
        lo += 1
print(up, lo)
```

## Q294. Shift Right by One
```python
lst = [int(x) for x in input().split()]
last = lst.pop()
lst.insert(0, last)
print(lst)
```

## Q295. Deduplicate a String
```python
s = input()
result = ""
for ch in s:
    if ch not in result:
        result += ch
print(result)
```

## Q296. First + Last Elements
```python
lst = [int(x) for x in input().split()]
print(lst[0] + lst[-1])
```

## Q297. Even-Index Local Peaks
```python
lst = [int(x) for x in input().split()]
count = 0
for i in range(2, len(lst) - 1, 2):
    if lst[i] > lst[i-1] and lst[i] > lst[i+1]:
        count += 1
print(count)
```

## Q298. Second Most Frequent Character
```python
s = input()
order = []
for ch in s:
    if ch not in order:
        order.append(ch)
# find most frequent count
counts = {}
for ch in order:
    counts[ch] = s.count(ch)
most = max(counts.values())
# second highest among the rest
best = None
best_count = -1
for ch in order:
    if counts[ch] != most and counts[ch] > best_count:
        best_count = counts[ch]
        best = ch
print(best)
```

## Q299. Check for Duplicate
```python
lst = [int(x) for x in input().split()]
seen = []
dup = False
for x in lst:
    if x in seen:
        dup = True
        break
    seen.append(x)
if dup:
    print("Duplicate")
else:
    print("Unique")
```

## Q300. Longest Palindromic Word
```python
s = input()
best = None
for w in s.split():
    if w == w[::-1]:
        if best is None or len(w) > len(best):
            best = w
if best is None:
    print("None")
else:
    print(best)
```

---

## Batch 3 Recap
- You mastered string indexing, slicing (`s[:3]`, `s[-3:]`, `s[::-1]`, `s[::2]`), and methods (`.upper()`, `.lower()`, `.strip()`, `.replace()`, `.split()`, `.join()`).
- You built, indexed, sliced, sorted, reversed, appended, inserted, removed, and popped from lists.
- You solved membership, counting, filtering, deduplication, anagram, palindrome, and peak problems.
- You converted between strings and lists and processed sentences word by word.
- You frequently combined loops, conditions, and earlier arithmetic topics.

Tuples and Sets (Batch 4) build directly on your new list-handling skills.
