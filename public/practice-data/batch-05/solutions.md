# Batch 5 — Solutions

> ⚠️ **Try the problem yourself first.** Dictionary output order does not matter to the judge (dictionary equality ignores order), and numeric strings compare equal to integers.

## Q401. Create and Print a Dictionary
```python
name = input()
age = int(input())
d = {"name": name, "age": age}
print(d)
```

## Q402. Access a Value
```python
product = input()
price = int(input())
d = {"product": product, "price": price}
print(d["price"])
```

## Q403. Add a New Key
```python
item = input()
quantity = int(input())
d = {"item": item, "quantity": quantity}
d["status"] = "in stock"
print(d)
```

## Q404. Update a Value
```python
price = int(input())
d = {"price": price}
d["price"] = d["price"] * 1.1
print(d["price"])
```

## Q405. Number of Pairs
```python
d = {}
for _ in range(3):
    name = input()
    score = int(input())
    d[name] = score
print(len(d))
```

## Q406. Print the Keys
```python
d = {}
for _ in range(3):
    city = input()
    country = input()
    d[city] = country
print(d.keys())
```

## Q407. Print the Values
```python
d = {}
for _ in range(3):
    name = input()
    age = int(input())
    d[name] = age
print(d.values())
```

## Q408. Define and Call a Function
```python
def greet():
    print("Hello from a function!")

greet()
```

## Q409. Function Returning a Sum
```python
def add(a, b):
    return a + b

x = int(input())
y = int(input())
print(add(x, y))
```

## Q410. Default Parameter
```python
def double(x, factor=2):
    return x * factor

n = int(input())
print(double(n))
```

## Q411. Keyword Arguments
```python
def sub(x, y):
    return x - y

a = int(input())
b = int(input())
print(sub(x=a, y=b))
```

## Q412. Function with *args
```python
def total(*args):
    return sum(args)

n = int(input())
values = []
for _ in range(n):
    values.append(int(input()))
print(total(*values))
```

## Q413. Function with **kwargs
```python
def describe(**kwargs):
    for k, v in kwargs.items():
        print(f"{k} = {v}")

name = input()
age = int(input())
describe(name=name, age=age)
```

## Q414. Function Returning the Larger
```python
def larger(a, b):
    if a > b:
        return a
    else:
        return b

x = int(input())
y = int(input())
print(larger(x, y))
```

## Q415. Function Checking Even/Odd
```python
def parity(n):
    return "Even" if n % 2 == 0 else "Odd"

n = int(input())
print(parity(n))
```

## Q416. Character Frequencies
```python
s = input()
d = {}
for ch in s:
    d[ch] = d.get(ch, 0) + 1
print(d)
```

## Q417. Word Frequencies
```python
s = input()
d = {}
for w in s.split():
    d[w] = d.get(w, 0) + 1
print(d)
```

## Q418. Check If a Key Exists
```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
target = input()
if target in d:
    print("Found")
else:
    print("Not found")
```

## Q419. Get with a Default
```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
query = input()
print(d.get(query, 0))
```

## Q420. Loop Over Items
```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
for k, v in d.items():
    print(f"{k}: {v}")
```

## Q421. Sum of All Values
```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
print(sum(d.values()))
```

## Q422. Key with Maximum Value
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

## Q423. Remove a Key
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

## Q424. Function That Doubles
```python
def double(n):
    return 2 * n

n = int(input())
print(double(n))
```

## Q425. Boolean Function
```python
def is_positive(n):
    return n > 0

n = int(input())
print(is_positive(n))
```

## Q426. Lambda
```python
mult = lambda x, y: x * y
a = int(input())
b = int(input())
print(mult(a, b))
```

## Q427. Dictionary with a List Value
```python
name = input()
s1 = int(input())
s2 = int(input())
s3 = int(input())
d = {"name": name, "scores": [s1, s2, s3]}
print(d)
```

## Q428. Average of Values
```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
print(f"{sum(d.values()) / len(d):.2f}")
```

## Q429. *args Maximum
```python
def my_max(*args):
    return max(args)

n = int(input())
values = []
for _ in range(n):
    values.append(int(input()))
print(my_max(*values))
```

## Q430. Word Counts
```python
s = input()
d = {}
for w in s.split():
    d[w] = d.get(w, 0) + 1
print(d)
```

## Q431. Factorial Function
```python
def factorial(n):
    p = 1
    for i in range(1, n + 1):
        p *= i
    return p

n = int(input())
print(factorial(n))
```

## Q432. Function Returning a List
```python
def first_evens(n):
    result = []
    for i in range(1, n + 1):
        result.append(i * 2)
    return result

n = int(input())
print(first_evens(n))
```

## Q433. Nested Dictionary Access
```python
name = input()
age = int(input())
city = input()
d = {"person": {"name": name, "age": age, "city": city}}
print(d["person"]["city"])
```

## Q434. Sum in a Nested Dictionary
```python
n = int(input())
d = {}
for _ in range(n):
    name, score = input().split()
    d[name] = {"score": int(score)}
total = 0
for v in d.values():
    total += v["score"]
print(total)
```

## Q435. Palindrome Function
```python
def is_palindrome(s):
    return s == s[::-1]

s = input()
if is_palindrome(s):
    print("Palindrome")
else:
    print("Not palindrome")
```

## Q436. Vowel Counts Dictionary
```python
def vowel_counts(s):
    d = {"a": 0, "e": 0, "i": 0, "o": 0, "u": 0}
    for ch in s.lower():
        if ch in d:
            d[ch] += 1
    return d

s = input()
print(vowel_counts(s))
```

## Q437. Merge Two Dictionaries
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

## Q438. Return Multiple Values
```python
def min_max_of_digits(n):
    digits = [int(c) for c in str(n)]
    return min(digits), max(digits)

n = int(input())
small, large = min_max_of_digits(n)
print(small)
print(large)
```

## Q439. Duplicate Detection with a Dictionary
```python
lst = [int(x) for x in input().split()]
d = {}
for x in lst:
    d[x] = d.get(x, 0) + 1
if any(count > 1 for count in d.values()):
    print("Duplicate")
else:
    print("Unique")
```

## Q440. Most Frequent Character
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

## Q441. Count Evens in a List
```python
def count_even(lst):
    count = 0
    for x in lst:
        if x % 2 == 0:
            count += 1
    return count

lst = [int(x) for x in input().split()]
print(count_even(lst))
```

## Q442. Dictionary of Squares
```python
n = int(input())
d = {}
for i in range(1, n + 1):
    d[i] = i ** 2
print(d)
```

## Q443. Sum for Even Keys
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

## Q444. Discount with Default Parameter
```python
def apply_discount(price, discount=10):
    return price * (100 - discount) / 100

price = int(input())
discount = int(input())
print(apply_discount(price, discount))
```

## Q445. Negative/Zero/Positive Counts
```python
lst = [int(x) for x in input().split()]
d = {"neg": 0, "zero": 0, "pos": 0}
for x in lst:
    if x < 0:
        d["neg"] += 1
    elif x == 0:
        d["zero"] += 1
    else:
        d["pos"] += 1
print(d)
```

## Q446. Reverse a String Function
```python
def reverse_str(s):
    return s[::-1]

s = input()
print(reverse_str(s))
```

## Q447. Letter Frequencies
```python
s = input()
d = {}
for ch in s:
    if ch != " ":
        d[ch] = d.get(ch, 0) + 1
print(d)
```

## Q448. Sum and Product
```python
def sum_product(a, b):
    return (a + b, a * b)

a = int(input())
b = int(input())
s, p = sum_product(a, b)
print(s)
print(p)
```

## Q449. Digit Frequencies
```python
n = int(input())
d = {}
for ch in str(n):
    digit = int(ch)
    d[digit] = d.get(digit, 0) + 1
print(d)
```

## Q450. Prime Function
```python
def is_prime(n):
    if n < 2:
        return False
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            return False
    return True

n = int(input())
if is_prime(n):
    print("Prime")
else:
    print("Not prime")
```

## Q451. **kwargs to Dictionary
```python
def make_dict(**kwargs):
    return kwargs

name = input()
age = int(input())
print(make_dict(name=name, age=age))
```

## Q452. Distinct Words and Most Frequent
```python
s = input()
d = {}
for w in s.split():
    d[w] = d.get(w, 0) + 1
print(len(d))
print(max(d, key=d.get))
```

## Q453. Celsius to Fahrenheit Function
```python
def to_fahrenheit(c):
    return c * 9 / 5 + 32

c = int(input())
print(to_fahrenheit(c))
```

## Q454. Sum Each Score List
```python
n = int(input())
d = {}
for _ in range(n):
    name = input()
    s1 = int(input())
    s2 = int(input())
    s3 = int(input())
    d[name] = [s1, s2, s3]
for name, scores in d.items():
    print(f"{name}: {sum(scores)}")
```

## Q455. Function Returning a Dictionary
```python
def char_freq(s):
    d = {}
    for ch in s:
        d[ch] = d.get(ch, 0) + 1
    return d

s = input()
print(char_freq(s))
```

## Q456. Highest and Second Highest
```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
# highest
best = max(d, key=d.get)
# second highest
best_val = d[best]
second = None
second_val = -1
for name, score in d.items():
    if name != best and score > second_val:
        second_val = score
        second = name
print(f"Highest: {best}")
print(f"Second: {second}")
```

## Q457. Count Vowels Function
```python
def count_vowels(s):
    count = 0
    for ch in s.lower():
        if ch in "aeiou":
            count += 1
    return count

s = input()
print(count_vowels(s))
```

## Q458. Invert a Dictionary
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

## Q459. Function with *args and **kwargs
```python
def process(*args, **kwargs):
    if kwargs["mode"] == "sum":
        return sum(args)
    p = 1
    for x in args:
        p *= x
    return p

n = int(input())
values = []
for _ in range(n):
    values.append(int(input()))
mode = input()
print(process(*values, mode=mode))
```

## Q460. Count Words by Length
```python
s = input()
d = {}
for w in s.split():
    d[len(w)] = d.get(len(w), 0) + 1
print(d)
```

## Q461. GCD Function
```python
def gcd(a, b):
    for i in range(min(a, b), 0, -1):
        if a % i == 0 and b % i == 0:
            return i

a = int(input())
b = int(input())
print(gcd(a, b))
```

## Q462. Divisors Function
```python
def divisors(n):
    result = []
    for i in range(1, n + 1):
        if n % i == 0:
            result.append(i)
    return result

n = int(input())
print(divisors(n))
```

## Q463. Word Frequencies with .get()
```python
s = input()
d = {}
for w in s.split():
    d[w] = d.get(w, 0) + 1
print(d)
```

## Q464. Armstrong Function
```python
def is_armstrong(n):
    s = 0
    for ch in str(n):
        s += int(ch) ** 3
    return s == n

n = int(input())
if is_armstrong(n):
    print("Armstrong")
else:
    print("Not armstrong")
```

## Q465. Highest Average Student
```python
n = int(input())
d = {}
for _ in range(n):
    name = input()
    s1 = int(input())
    s2 = int(input())
    s3 = int(input())
    d[name] = [s1, s2, s3]
best = None
best_avg = -1
for name, scores in d.items():
    avg = sum(scores) / 3
    if avg > best_avg:
        best_avg = avg
        best = name
print(best)
```

## Q466. Sum of Digits Function
```python
def sum_digits(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total

n = int(input())
print(sum_digits(n))
```

## Q467. Merge Frequency Dictionaries
```python
def char_freq(s):
    d = {}
    for ch in s:
        d[ch] = d.get(ch, 0) + 1
    return d

a = char_freq(input())
b = char_freq(input())
for k, v in b.items():
    a[k] = a.get(k, 0) + v
print(a)
```

## Q468. Nth Fibonacci Function
```python
def fib(n):
    a, b = 0, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return a

n = int(input())
print(fib(n))
```

## Q469. Most Frequent Word Function
```python
def most_frequent(sentence):
    d = {}
    for w in sentence.split():
        d[w] = d.get(w, 0) + 1
    return max(d, key=d.get)

sentence = input()
print(most_frequent(sentence))
```

## Q470. Aggregate Scores per Student
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

## Q471. Word Count Function
```python
def word_count(sentence):
    return len(sentence.split())

sentence = input()
print(word_count(sentence))
```

## Q472. Print Sorted by Key
```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
for k in sorted(d.keys()):
    print(f"{k}: {d[k]}")
```

## Q473. Reverse Words Function
```python
def reverse_words(sentence):
    return " ".join(sentence.split()[::-1])

sentence = input()
print(reverse_words(sentence))
```

## Q474. Average per Student
```python
n = int(input())
d = {}
for _ in range(n):
    name = input()
    s1 = int(input())
    s2 = int(input())
    s3 = int(input())
    d[name] = [s1, s2, s3]
for name, scores in d.items():
    print(f"{name}: {sum(scores) / 3:.1f}")
```

## Q475. Sorted Check Function
```python
def is_sorted(lst):
    for i in range(len(lst) - 1):
        if lst[i] > lst[i + 1]:
            return False
    return True

lst = [int(x) for x in input().split()]
if is_sorted(lst):
    print("Sorted")
else:
    print("Not sorted")
```

## Q476. Digit Frequencies with .get()
```python
n = int(input())
d = {}
for ch in str(n):
    digit = int(ch)
    d[digit] = d.get(digit, 0) + 1
print(d)
```

## Q477. Find Max Function
```python
def find_max(lst):
    best = lst[0]
    for x in lst:
        if x > best:
            best = x
    return best

lst = [int(x) for x in input().split()]
print(find_max(lst))
```

## Q478. Dictionary Comprehension
```python
n = int(input())
print({i: i ** 2 for i in range(1, n + 1)})
```

## Q479. Count Even Digits Function
```python
def count_even_digits(n):
    count = 0
    for ch in str(n):
        if int(ch) % 2 == 0:
            count += 1
    return count

n = int(input())
print(count_even_digits(n))
```

## Q480. Group Words by Length
```python
sentence = input()
d = {}
for w in sentence.split():
    L = len(w)
    if L not in d:
        d[L] = []
    d[L].append(w)
print(d)
```

## Q481. Sum of Dictionary Values Function
```python
def total_values(d):
    return sum(d.values())

n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
print(total_values(d))
```

## Q482. Has Key Function
```python
def has_key(d, word):
    return word in d

n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
word = input()
if has_key(d, word):
    print("Found")
else:
    print("Not found")
```

## Q483. LCM Function
```python
def lcm(a, b):
    for m in range(max(a, b), a * b + 1, max(a, b)):
        if m % a == 0 and m % b == 0:
            return m

a = int(input())
b = int(input())
print(lcm(a, b))
```

## Q484. Count Values Above a Threshold
```python
n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = int(v)
t = int(input())
count = 0
for v in d.values():
    if v > t:
        count += 1
print(count)
```

## Q485. Reverse List Function
```python
def rev_list(lst):
    return lst[::-1]

lst = [int(x) for x in input().split()]
print(rev_list(lst))
```

## Q486. Highest Total Student
```python
n = int(input())
d = {}
for _ in range(n):
    name = input()
    s1 = int(input())
    s2 = int(input())
    s3 = int(input())
    d[name] = {"scores": [s1, s2, s3]}
best = None
best_total = -1
for name, info in d.items():
    total = sum(info["scores"])
    if total > best_total:
        best_total = total
        best = name
print(best)
```

## Q487. Power of Two Function
```python
def is_power_of_two(n):
    while n > 1 and n % 2 == 0:
        n //= 2
    return n == 1

n = int(input())
if is_power_of_two(n):
    print("Yes")
else:
    print("No")
```

## Q488. Count Uppercase Function
```python
def count_upper(s):
    count = 0
    for ch in s:
        if "A" <= ch <= "Z":
            count += 1
    return count

s = input()
print(count_upper(s))
```

## Q489. Words by Starting Letter
```python
sentence = input()
d = {}
for w in sentence.split():
    letter = w[0].lower()
    d[letter] = d.get(letter, 0) + 1
print(d)
```

## Q490. Average Function
```python
def average(lst):
    return sum(lst) / len(lst)

lst = [int(x) for x in input().split()]
print(f"{average(lst):.2f}")
```

## Q491. Tip with Default Parameter
```python
def add_tip(bill, tip_percent=10):
    return bill * (100 + tip_percent) / 100

bill = int(input())
tip = int(input())
print(add_tip(bill, tip))
```

## Q492. Values Equal to Key
```python
n = int(input())
count = 0
for _ in range(n):
    k, v = input().split()
    if int(k) == int(v):
        count += 1
print(count)
```

## Q493. Mode Function
```python
def mode(lst):
    d = {}
    for x in lst:
        d[x] = d.get(x, 0) + 1
    return max(d, key=d.get)

lst = [int(x) for x in input().split()]
print(mode(lst))
```

## Q494. Merge Lists of Pairs
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

## Q495. All Unique Function
```python
def all_unique(s):
    return len(s) == len(set(s))

s = input()
if all_unique(s):
    print("Unique")
else:
    print("Duplicate")
```

## Q496. Grade Report
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

## Q497. Second Largest Function
```python
def second_largest(lst):
    return sorted(lst)[-2]

lst = [int(x) for x in input().split()]
print(second_largest(lst))
```

## Q498. Most Common Word Length
```python
sentence = input()
d = {}
for w in sentence.split():
    L = len(w)
    d[L] = d.get(L, 0) + 1
most = max(d.values())
# smallest length with the max count
result = min(L for L in d if d[L] == most)
print(result)
```

## Q499. Flexible Function with *args and Default
```python
def stats(*args, mode="sum"):
    if mode == "sum":
        return sum(args)
    else:
        return len(args)

n = int(input())
values = []
for _ in range(n):
    values.append(int(input()))
mode = input()
print(stats(*values, mode=mode))
```

## Q500. Student Report Card
```python
n = int(input())
d = {}
for _ in range(n):
    name = input()
    s1 = int(input())
    s2 = int(input())
    s3 = int(input())
    total = s1 + s2 + s3
    d[name] = {"scores": [s1, s2, s3], "total": total}
for name, info in d.items():
    result = "Pass" if info["total"] >= 120 else "Fail"
    print(f"{name}: total={info['total']} {result}")
```

---

## Batch 5 Recap — You Finished the Course!
You can now:
- Build and manipulate dictionaries (add, update, remove, iterate keys/values/items, nested dictionaries).
- Write reusable functions with parameters, default parameters, keyword arguments, `*args`, `**kwargs`, returns, and lambdas.
- Understand scope by keeping variables local inside functions.
- Combine **all 12 fundamentals topics** into realistic, multi-step programs.

You have completed a 500-problem progressive course. You started with `print("Hello, World!")`-level syntax and finished by writing dictionary-driven report cards and flexible functions. You are ready to solve real problems on your own.
