# Batch 2 — Solutions

> ⚠️ **Try the problem yourself first.** Solutions are for checking after a genuine attempt.

## Q101. Even or Odd
```python
n = int(input())
if n % 2 == 0:
    print("Even")
else:
    print("Odd")
```

## Q102. Positive or Non-Positive
```python
n = int(input())
if n > 0:
    print("Positive")
else:
    print("Non-positive")
```

## Q103. Absolute Value Without abs()
```python
n = int(input())
if n < 0:
    n = n * -1
print(n)
```

## Q104. Larger of Two Numbers
```python
a = int(input())
b = int(input())
if a > b:
    print(a)
else:
    print(b)
```

## Q105. Smaller of Two Numbers
```python
a = int(input())
b = int(input())
if a < b:
    print(a)
else:
    print(b)
```

## Q106. Print Numbers 1 to N
```python
n = int(input())
for i in range(1, n + 1):
    print(i)
```

## Q107. Count from N Down to 1
```python
n = int(input())
for i in range(n, 0, -1):
    print(i)
```

## Q108. First N Even Numbers
```python
n = int(input())
for i in range(1, n + 1):
    print(i * 2)
```

## Q109. Sum of Numbers 1 to N
```python
n = int(input())
total = 0
for i in range(1, n + 1):
    total += i
print(total)
```

## Q110. Product of Numbers 1 to N (Factorial)
```python
n = int(input())
product = 1
for i in range(1, n + 1):
    product *= i
print(product)
```

## Q111. Sum of Even Numbers from 1 to N
```python
n = int(input())
total = 0
for i in range(1, n + 1):
    if i % 2 == 0:
        total += i
print(total)
```

## Q112. Count Odd Numbers from 1 to N
```python
n = int(input())
count = 0
for i in range(1, n + 1):
    if i % 2 != 0:
        count += 1
print(count)
```

## Q113. First N Multiples of 3
```python
n = int(input())
for i in range(1, n + 1):
    print(i * 3)
```

## Q114. Print the Number Itself or Its Double
```python
n = int(input())
if n > 0:
    print(n * 2)
else:
    print(n)
```

## Q115. Grade Description
```python
grade = int(input())
if grade >= 40:
    print("Pass")
else:
    print("Fail")
```

## Q116. Multiplication Table of a Number
```python
n = int(input())
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
```

## Q117. Count Digits in a Number
```python
n = int(input())
count = 0
while n > 0:
    n //= 10
    count += 1
if count == 0:
    count = 1
print(count)
```

## Q118. Sum of Digits of Any Positive Number
```python
n = int(input())
total = 0
while n > 0:
    total += n % 10
    n //= 10
print(total)
```

## Q119. Reverse the Digits of a Number
```python
n = int(input())
rev = 0
while n > 0:
    rev = rev * 10 + (n % 10)
    n //= 10
print(rev)
```

## Q120. Print Even Numbers 2 to N
```python
n = int(input())
for i in range(2, n + 1, 2):
    print(i)
```

## Q121. Print Odd Numbers 1 to N
```python
n = int(input())
for i in range(1, n + 1, 2):
    print(i)
```

## Q122. Count Numbers Divisible by Both 3 and 5
```python
n = int(input())
count = 0
for i in range(1, n + 1):
    if i % 3 == 0 and i % 5 == 0:
        count += 1
print(count)
```

## Q123. Print Square of Each Number 1 to N
```python
n = int(input())
for i in range(1, n + 1):
    print(i ** 2)
```

## Q124. Count Even and Odd in a Range
```python
a = int(input())
b = int(input())
evens = 0
odds = 0
for i in range(a, b + 1):
    if i % 2 == 0:
        evens += 1
    else:
        odds += 1
print(f"Evens: {evens} Odds: {odds}")
```

## Q125. First N Multiples of a Number
```python
k = int(input())
n = int(input())
for i in range(1, n + 1):
    print(i * k)
```

## Q126. Sum of All Numbers from A to B
```python
a = int(input())
b = int(input())
total = 0
for i in range(a, b + 1):
    total += i
print(total)
```

## Q127. Check Divisibility
```python
a = int(input())
b = int(input())
if a % b == 0:
    print("Divisible")
else:
    print("Not divisible")
```

## Q128. Sum of First N Natural Numbers (Loop)
```python
n = int(input())
total = 0
for i in range(1, n + 1):
    total += i
print(total)
```

## Q129. First N Powers of 2
```python
n = int(input())
for i in range(0, n + 1):
    print(2 ** i)
```

## Q130. Sum of Odd Numbers 1 to N
```python
n = int(input())
total = 0
for i in range(1, n + 1):
    if i % 2 != 0:
        total += i
print(total)
```

## Q131. Count Numbers Less Than a Threshold
```python
t = int(input())
a = int(input())
b = int(input())
count = 0
for i in range(a, b + 1):
    if i < t:
        count += 1
print(count)
```

## Q132. Triangle of Numbers
```python
n = int(input())
for row in range(1, n + 1):
    for col in range(1, row + 1):
        print(col, end=" ")
    print()
```

## Q133. Square of Asterisks
```python
n = int(input())
for _ in range(n):
    for _ in range(n):
        print("*", end="")
    print()
```

## Q134. Right-Aligned Triangle
```python
n = int(input())
for row in range(1, n + 1):
    print(" " * (n - row) + "*" * row)
```

## Q135. Sum of Digits Until a Single Digit
```python
n = int(input())
while n >= 10:
    s = 0
    while n > 0:
        s += n % 10
        n //= 10
    n = s
print(n)
```

## Q136. Check Prime
```python
n = int(input())
prime = True
for d in range(2, int(n ** 0.5) + 1):
    if n % d == 0:
        prime = False
        break
if prime:
    print("Prime")
else:
    print("Not prime")
```

## Q137. Count Divisors
```python
n = int(input())
count = 0
for i in range(1, n + 1):
    if n % i == 0:
        count += 1
print(count)
```

## Q138. Print Divisors
```python
n = int(input())
for i in range(1, n + 1):
    if n % i == 0:
        print(i)
```

## Q139. Sum of Divisors
```python
n = int(input())
total = 0
for i in range(1, n + 1):
    if n % i == 0:
        total += i
print(total)
```

## Q140. Smallest of Three
```python
a = int(input())
b = int(input())
c = int(input())
if a < b and a < c:
    print(a)
elif b < c:
    print(b)
else:
    print(c)
```

## Q141. Largest of Three
```python
a = int(input())
b = int(input())
c = int(input())
if a > b and a > c:
    print(a)
elif b > c:
    print(b)
else:
    print(c)
```

## Q142. Grade Based on Marks
```python
mark = int(input())
if mark >= 90:
    print("A")
elif mark >= 75:
    print("B")
elif mark >= 60:
    print("C")
elif mark >= 40:
    print("D")
else:
    print("F")
```

## Q143. Leap Year
```python
year = int(input())
if year % 400 == 0 or (year % 4 == 0 and year % 100 != 0):
    print("Leap")
else:
    print("Not leap")
```

## Q144. Sum of First N Odd Numbers
```python
n = int(input())
total = 0
for i in range(1, n + 1):
    total += 2 * i - 1
print(total)
```

## Q145. Multiples in a Range
```python
k = int(input())
a = int(input())
b = int(input())
for i in range(a, b + 1):
    if i % k == 0:
        print(i)
```

## Q146. Sum of First N Multiples
```python
k = int(input())
n = int(input())
total = 0
for i in range(1, n + 1):
    total += i * k
print(total)
```

## Q147. Descending Triangle
```python
n = int(input())
for row in range(1, n + 1):
    print("*" * (n - row + 1))
```

## Q148. Sum of Cubes
```python
n = int(input())
total = 0
for i in range(1, n + 1):
    total += i ** 3
print(total)
```

## Q149. Count Multiples of 3 or 5
```python
n = int(input())
count = 0
for i in range(1, n + 1):
    if i % 3 == 0 or i % 5 == 0:
        count += 1
print(count)
```

## Q150. Print Until a Multiple of 7 (break)
```python
n = int(input())
for i in range(1, n + 1):
    print(i)
    if i % 7 == 0:
        break
```

## Q151. Print Except Multiples of 3 (continue)
```python
n = int(input())
for i in range(1, n + 1):
    if i % 3 == 0:
        continue
    print(i)
```

## Q152. Count Multiples in a Range
```python
k = int(input())
a = int(input())
b = int(input())
count = 0
for i in range(a, b + 1):
    if i % k == 0:
        count += 1
print(count)
```

## Q153. Reverse Counting in Steps
```python
start = int(input())
stop = int(input())
for i in range(start, stop - 1, -2):
    print(i)
```

## Q154. Larger of Each of 3 Pairs
```python
for _ in range(3):
    a = int(input())
    b = int(input())
    if a > b:
        print(a)
    else:
        print(b)
```

## Q155. Sum of Even and Odd Digits
```python
n = int(input())
even_sum = 0
odd_sum = 0
while n > 0:
    digit = n % 10
    if digit % 2 == 0:
        even_sum += digit
    else:
        odd_sum += digit
    n //= 10
print(even_sum, odd_sum)
```

## Q156. First N Fibonacci Terms
```python
n = int(input())
a, b = 0, 1
for _ in range(n):
    print(a)
    a, b = b, a + b
```

## Q157. Count Even Digits
```python
n = int(input())
count = 0
while n > 0:
    if (n % 10) % 2 == 0:
        count += 1
    n //= 10
print(count)
```

## Q158. Sum of First N Multiples of 6
```python
n = int(input())
total = 0
for i in range(1, n + 1):
    total += i * 6
print(total)
```

## Q159. Number Repeated in a Triangle
```python
n = int(input())
for row in range(1, n + 1):
    for _ in range(row):
        print(row, end=" ")
    print()
```

## Q160. Palindrome Number
```python
n = int(input())
original = n
rev = 0
while n > 0:
    rev = rev * 10 + (n % 10)
    n //= 10
if original == rev:
    print("Palindrome")
else:
    print("Not palindrome")
```

## Q161. Sum of First N Fibonacci
```python
n = int(input())
a, b = 0, 1
total = 0
for _ in range(n):
    total += a
    a, b = b, a + b
print(total)
```

## Q162. Perfect Number
```python
n = int(input())
total = 0
for i in range(1, n):
    if n % i == 0:
        total += i
if total == n:
    print("Perfect")
else:
    print("Not perfect")
```

## Q163. Multiplication Tables 1 to N
```python
n = int(input())
for t in range(1, n + 1):
    for i in range(1, 11):
        print(f"{t} x {i} = {t * i}")
    print()
```

## Q164. Count Multiples (both bounds)
```python
k = int(input())
a = int(input())
b = int(input())
count = 0
for i in range(a, b + 1):
    if i % k == 0:
        count += 1
print(count)
```

## Q165. First N Non-Multiples
```python
k = int(input())
n = int(input())
found = 0
num = 1
while found < n:
    if num % k != 0:
        print(num)
        found += 1
    num += 1
```

## Q166. Sum of Digits Raised to Position
```python
n = input()          # read as string to know digit count
length = len(n)
total = 0
for pos, ch in enumerate(n, start=1):
    total += int(ch) ** pos
print(total)
```
> Note: The hint told you to determine the length first. Reading as a string is the easiest way; converting each character back with `int()` keeps this within the allowed topic set.

## Q167. Armstrong Number (3-digit)
```python
n = int(input())
a = n // 100
b = (n // 10) % 10
c = n % 10
if a**3 + b**3 + c**3 == n:
    print("Armstrong")
else:
    print("Not armstrong")
```

## Q168. Hollow Square
```python
n = int(input())
for r in range(n):
    for c in range(n):
        if r == 0 or r == n - 1 or c == 0 or c == n - 1:
            print("*", end="")
        else:
            print(" ", end="")
    print()
```

## Q169. Count Positive Numbers
```python
n = int(input())
count = 0
for _ in range(n):
    x = int(input())
    if x > 0:
        count += 1
print(count)
```

## Q170. Sum of All Inputs
```python
n = int(input())
total = 0
for _ in range(n):
    total += int(input())
print(total)
```

## Q171. Average of N Inputs
```python
n = int(input())
total = 0
for _ in range(n):
    total += int(input())
print(f"{total / n:.2f}")
```

## Q172. Maximum of N Inputs
```python
n = int(input())
mx = int(input())
for _ in range(n - 1):
    x = int(input())
    if x > mx:
        mx = x
print(mx)
```

## Q173. Minimum of N Inputs
```python
n = int(input())
mn = int(input())
for _ in range(n - 1):
    x = int(input())
    if x < mn:
        mn = x
print(mn)
```

## Q174. Sum of Multiples of a Number up to N
```python
k = int(input())
n = int(input())
total = 0
for i in range(1, n + 1):
    if i % k == 0:
        total += i
print(total)
```

## Q175. Triangle of Even Numbers
```python
n = int(input())
for row in range(1, n + 1):
    for col in range(1, row + 1):
        print(col * 2, end=" ")
    print()
```

## Q176. Multiples with Count
```python
k = int(input())
a = int(input())
b = int(input())
count = 0
for i in range(a, b + 1):
    if i % k == 0:
        print(i)
        count += 1
print(f"Count: {count}")
```

## Q177. Digit Sum of Each Number 1 to N
```python
n = int(input())
for i in range(1, n + 1):
    x = i
    s = 0
    while x > 0:
        s += x % 10
        x //= 10
    print(s)
```

## Q178. Perfect Square
```python
n = int(input())
square = False
i = 1
while i * i <= n:
    if i * i == n:
        square = True
        break
    i += 1
if square:
    print("Perfect square")
else:
    print("Not perfect square")
```

## Q179. First N Primes
```python
n = int(input())
count = 0
num = 2
while count < n:
    is_prime = True
    for d in range(2, int(num ** 0.5) + 1):
        if num % d == 0:
            is_prime = False
            break
    if is_prime:
        print(num)
        count += 1
    num += 1
```

## Q180. Count Primes 1 to N
```python
n = int(input())
count = 0
for num in range(2, n + 1):
    is_prime = True
    for d in range(2, int(num ** 0.5) + 1):
        if num % d == 0:
            is_prime = False
            break
    if is_prime:
        count += 1
print(count)
```

## Q181. Sum of Primes 1 to N
```python
n = int(input())
total = 0
for num in range(2, n + 1):
    is_prime = True
    for d in range(2, int(num ** 0.5) + 1):
        if num % d == 0:
            is_prime = False
            break
    if is_prime:
        total += num
print(total)
```

## Q182. Count Numbers with Even Digit Sum
```python
n = int(input())
count = 0
for i in range(1, n + 1):
    x = i
    s = 0
    while x > 0:
        s += x % 10
        x //= 10
    if s % 2 == 0:
        count += 1
print(count)
```

## Q183. Numbers Whose Digit Sum Equals Target
```python
t = int(input())
n = int(input())
for i in range(1, n + 1):
    x = i
    s = 0
    while x > 0:
        s += x % 10
        x //= 10
    if s == t:
        print(i)
```

## Q184. Inverted Triangle of Numbers
```python
n = int(input())
for row in range(1, n + 1):
    for col in range(n - row + 1, 0, -1):
        print(col, end=" ")
    print()
```

## Q185. Harmonic Sum
```python
n = int(input())
total = 0.0
for i in range(1, n + 1):
    total += 1 / i
print(f"{total:.2f}")
```

## Q186. Row Products with Sum
```python
n = int(input())
for row in range(1, n + 1):
    s = 0
    for col in range(1, row + 1):
        print(row * col, end=" ")
        s += row * col
    print(f": {s}")
```

## Q187. Power of Two (loop)
```python
n = int(input())
while n > 1 and n % 2 == 0:
    n //= 2
if n == 1:
    print("Yes")
else:
    print("No")
```

## Q188. Multiples Downward
```python
n = int(input())
k = int(input())
for i in range(n, 0, -1):
    if i % k == 0:
        print(i)
```

## Q189. Sum of Even Numbers A to B
```python
a = int(input())
b = int(input())
total = 0
for i in range(a, b + 1):
    if i % 2 == 0:
        total += i
print(total)
```

## Q190. Count Occurrences of a Digit
```python
n = int(input())
d = int(input())
count = 0
while n > 0:
    if n % 10 == d:
        count += 1
    n //= 10
print(count)
```

## Q191. Full Pyramid
```python
n = int(input())
for row in range(1, n + 1):
    print(" " * (n - row) + "*" * (2 * row - 1))
```

## Q192. Count Digits Divisible by 3
```python
n = int(input())
count = 0
while n > 0:
    if (n % 10) % 3 == 0:
        count += 1
    n //= 10
print(count)
```

## Q193. Sum of Numbers with Even Digit Sum
```python
n = int(input())
total = 0
for i in range(1, n + 1):
    x = i
    s = 0
    while x > 0:
        s += x % 10
        x //= 10
    if s % 2 == 0:
        total += i
print(total)
```

## Q194. Perfect Squares Up to N
```python
n = int(input())
i = 1
while i * i <= n:
    print(i * i)
    i += 1
```

## Q195. Total Digit Sum 1 to N
```python
n = int(input())
grand = 0
for i in range(1, n + 1):
    x = i
    while x > 0:
        grand += x % 10
        x //= 10
print(grand)
```

## Q196. Floyd's Triangle
```python
n = int(input())
counter = 1
for row in range(1, n + 1):
    for _ in range(row):
        print(counter, end=" ")
        counter += 1
    print()
```

## Q197. Sum of Factorials
```python
n = int(input())
fact = 1
total = 0
for i in range(1, n + 1):
    fact *= i
    total += fact
print(total)
```

## Q198. Largest Digit
```python
n = int(input())
mx = 0
while n > 0:
    if n % 10 > mx:
        mx = n % 10
    n //= 10
print(mx)
```

## Q199. Hollow Triangle
```python
n = int(input())
for row in range(1, n + 1):
    if row == 1:
        print("*")
    elif row == n:
        print("*" * n)
    else:
        print("*" + " " * (row - 2) + "*")
```

## Q200. Total Digit Sum of Primes
```python
n = int(input())
grand = 0
for num in range(2, n + 1):
    is_prime = True
    for d in range(2, int(num ** 0.5) + 1):
        if num % d == 0:
            is_prime = False
            break
    if is_prime:
        x = num
        while x > 0:
            grand += x % 10
            x //= 10
print(grand)
```

---

## Batch 2 Recap
- You mastered `if/elif/else`, nested conditions, and the ternary idea.
- You used `for` with `range()`, `while`, `break`, `continue`, and nested loops.
- You solved classic problems: primality, divisors, palindromes, Armstrong numbers, Fibonacci, perfect numbers, and many number patterns.
- You read variable-length inputs and tracked running totals, counts, maximums, and minimums.
- Topics from Batch 1 (arithmetic, `%`, `//`, digit extraction, formatting) kept appearing throughout.

These pattern-drawing and number-theory skills feed directly into Batch 3 (Strings and Lists).
