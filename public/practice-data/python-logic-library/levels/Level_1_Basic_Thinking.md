# Level 1 — Basic Thinking (30 Questions)

**What this level teaches:** print, variables, `for` loops, `if/elif/else`, `%` (modulo), running totals, counting, finding largest/smallest, and your first list & string operations.

**Total questions:** 30

> Try to write your own code first, then check the solution. The **Hint** gives you the key idea without giving away the whole answer.

---

## Question 1: Print numbers from 1 to 10

**What to do:** Print the numbers 1, 2, 3, ... up to 10, one per line.

**Hint:** `range(1, 11)` starts at 1 and stops just *before* 11. The step is 1 by default.

**Solution:**

```python
for i in range(1, 11):
    print(i)
```

**Logic:** Start at 1, keep increasing by 1, stop at 10.

---

## Question 2: Print numbers from 10 to 1

**What to do:** Print the numbers 10, 9, 8, ... down to 1, one per line.

**Hint:** Give `range()` a *negative* step: `range(10, 0, -1)`.

**Solution:**

```python
for i in range(10, 0, -1):
    print(i)
```

**Logic:** Start at 10 and decrease by 1 each time, stopping when you reach 0 (0 itself is not printed).

---

## Question 3: Print even numbers from 1 to 20

**What to do:** Print only the even numbers between 1 and 20 (both included in the range you check).

**Hint:** A number is even when `number % 2 == 0` — the remainder after dividing by 2 is zero.

**Solution:**

```python
for i in range(1, 21):
    if i % 2 == 0:
        print(i)
```

**Logic:** `%` gives the remainder. If `number % 2 == 0`, the number divides evenly by 2, so it is even.

---

## Question 4: Print odd numbers from 1 to 20

**What to do:** Print only the odd numbers between 1 and 20.

**Hint:** The opposite of `i % 2 == 0` is `i % 2 != 0` (`!=` means "not equal").

**Solution:**

```python
for i in range(1, 21):
    if i % 2 != 0:
        print(i)
```

**Logic:** If dividing by 2 leaves a remainder, the number is odd.

---

## Question 5: Print multiples of 5 from 1 to 50

**What to do:** Print every number from 1 to 50 that is a multiple of 5.

**Hint:** A number is a multiple of 5 when `i % 5 == 0`.

**Solution:**

```python
for i in range(1, 51):
    if i % 5 == 0:
        print(i)
```

**Expected output:**

```
5
10
15
20
...
50
```

**Logic:** The `% 5` trick generalises: `i % n == 0` means "i is a multiple of n".

---

## Question 6: Find the sum of numbers from 1 to 10

**What to do:** Calculate 1 + 2 + 3 + ... + 10 and print the total (should be 55).

**Hint:** Keep a `total` variable that starts at 0, and add each number to it inside the loop.

**Solution:**

```python
total = 0

for i in range(1, 11):
    total = total + i

print(total)
```

**Logic:** Think of `total` as a box that keeps the running sum.

```
total = 0
total = 0 + 1
total = 1 + 2
total = 3 + 3
...
```

---

## Question 7: Find the sum of even numbers from 1 to 100

**What to do:** Add up only the even numbers from 1 to 100 and print the total.

**Hint:** Combine two patterns: the running total **and** the even check (`if i % 2 == 0`).

**Solution:**

```python
total = 0

for i in range(1, 101):
    if i % 2 == 0:
        total = total + i

print(total)
```

**Logic:** Only add `i` to the total when the condition is true. (Answer: 2550)

---

## Question 8: Count numbers from 1 to 100 that are divisible by 3

**What to do:** Count how many numbers between 1 and 100 are divisible by 3, and print that count.

**Hint:** `count = 0` then `count = count + 1` each time the condition holds.

**Solution:**

```python
count = 0

for i in range(1, 101):
    if i % 3 == 0:
        count = count + 1

print(count)
```

**Logic:** Notice the difference between the two ideas:

- `total` → **adding values** (question 7)
- `count` → **counting how many times** something happens (this question)

---

## Question 9: Check whether a number is positive, negative, or zero

**What to do:** Given `number = -5`, print "Positive", "Negative", or "Zero" depending on its value.

**Hint:** Three cases need `if` / `elif` / `else`.

**Solution:**

```python
number = -5

if number > 0:
    print("Positive")
elif number < 0:
    print("Negative")
else:
    print("Zero")
```

**Logic:** `elif` is checked only when the earlier `if` was false. `else` catches everything left over.

---

## Question 10: Check whether a number is even or odd

**What to do:** Given `number = 17`, print "Even" or "Odd".

**Hint:** Reuse the `% 2 == 0` idea from Question 3.

**Solution:**

```python
number = 17

if number % 2 == 0:
    print("Even")
else:
    print("Odd")
```

**Logic:** There are only two possibilities, so a simple `if/else` is enough.

---

## Question 11: Find the largest of two numbers

**What to do:** Given `a = 25` and `b = 40`, print the larger one.

**Hint:** One `if/else` comparing `a` and `b`.

**Solution:**

```python
a = 25
b = 40

if a > b:
    print(a)
else:
    print(b)
```

**Logic:** If `a` is greater, print `a`; otherwise `b` is greater (or equal, and printing `b` is fine).

---

## Question 12: Find the smallest of two numbers

**What to do:** Given `a = 25` and `b = 40`, print the smaller one.

**Hint:** Flip the comparison operator from Question 11.

**Solution:**

```python
a = 25
b = 40

if a < b:
    print(a)
else:
    print(b)
```

**Logic:** Same pattern as Question 11, just with `<` instead of `>`.

---

## Question 13: Find the largest of three numbers

**What to do:** Given `a = 25`, `b = 40`, `c = 15`, print the largest.

**Hint:** Start with `largest = a`, then compare `b` and `c` against it one at a time.

**Solution:**

```python
a = 25
b = 40
c = 15

largest = a

if b > largest:
    largest = b

if c > largest:
    largest = c

print(largest)
```

**Logic:** An important pattern. Instead of one huge condition, maintain a variable: `largest` = "what I currently think is largest", then keep checking and updating it.

---

## Question 14: Find the smallest of three numbers

**What to do:** Given `a = 25`, `b = 40`, `c = 15`, print the smallest.

**Hint:** Same "current best" pattern as Question 13, with `<`.

**Solution:**

```python
a = 25
b = 40
c = 15

smallest = a

if b < smallest:
    smallest = b

if c < smallest:
    smallest = c

print(smallest)
```

**Logic:** Same maintain-a-variable pattern, flipped for the minimum.

---

## Question 15: Find the largest number in a list

**What to do:** Given `numbers = [10, 45, 23, 89, 12]`, print the largest value.

**Hint:** Start with `largest = numbers[0]`, then loop through the list and update when you find something bigger.

**Solution:**

```python
numbers = [10, 45, 23, 89, 12]

largest = numbers[0]

for number in numbers:
    if number > largest:
        largest = number

print(largest)
```

**Logic:** One of the most important beginner logic patterns — the "current best" pattern applied to a loop.

---

## Question 16: Find the smallest number in a list

**What to do:** Given `numbers = [10, 45, 23, 89, 12]`, print the smallest value.

**Hint:** Same as Question 15, but look for numbers *smaller* than the current best.

**Solution:**

```python
numbers = [10, 45, 23, 89, 12]

smallest = numbers[0]

for number in numbers:
    if number < smallest:
        smallest = number

print(smallest)
```

**Logic:** The minimum version of the "current best" pattern.

---

## Question 17: Find the sum of all numbers in a list

**What to do:** Given `numbers = [10, 20, 30, 40, 50]`, print the total (should be 150).

**Hint:** Running-total pattern again, but now you add each item of the list instead of a `range`.

**Solution:**

```python
numbers = [10, 20, 30, 40, 50]

total = 0

for number in numbers:
    total = total + number

print(total)
```

**Logic:** The same running-total box, filled from list items.

---

## Question 18: Count how many numbers are even

**What to do:** Given `numbers = [10, 15, 22, 31, 40, 51, 60]`, count the even numbers and print the count.

**Hint:** Counting pattern + `number % 2 == 0` check.

**Solution:**

```python
numbers = [10, 15, 22, 31, 40, 51, 60]

count = 0

for number in numbers:
    if number % 2 == 0:
        count = count + 1

print(count)
```

**Logic:** Increment the counter only when the condition is true. (Answer: 4)

---

## Question 19: Count how many numbers are odd

**What to do:** With the same list `numbers = [10, 15, 22, 31, 40, 51, 60]`, count the odd numbers and print the count.

**Hint:** Change the condition to `number % 2 != 0`.

**Solution:**

```python
numbers = [10, 15, 22, 31, 40, 51, 60]

count = 0

for number in numbers:
    if number % 2 != 0:
        count = count + 1

print(count)
```

**Logic:** The same counting pattern — only the condition changes. (Answer: 3)

---

## Question 20: Calculate the average of numbers in a list

**What to do:** Given `numbers = [10, 20, 30, 40, 50]`, print the average (should be 30.0).

**Hint:** Average = total ÷ number of items. You know both patterns already.

**Solution:**

```python
numbers = [10, 20, 30, 40, 50]

total = 0

for number in numbers:
    total = total + number

average = total / len(numbers)

print(average)
```

**Logic:** Combining two ideas:

- sum → `total`
- count → `len(numbers)`

Then `average = total / count`.

---

## Question 21: Count the number of characters in a string

**What to do:** Given `text = "python"`, count the characters using a loop (don't use `len()`).

**Hint:** A string is a sequence — you can loop over it character by character.

**Solution:**

```python
text = "python"

count = 0

for character in text:
    count = count + 1

print(count)
```

**Logic:** You could use `len()`, but writing the loop yourself is good practice for understanding how iteration works.

---

## Question 22: Count vowels in a string

**What to do:** Given `text = "programming"`, count how many characters are vowels (a, e, i, o, u) and print the count.

**Hint:** `if character in "aeiou"` checks whether one character is a vowel.

**Solution:**

```python
text = "programming"

count = 0

for character in text:
    if character in "aeiou":
        count = count + 1

print(count)
```

**Logic:**

```
take one character
        ↓
is it a vowel?
        ↓
yes → increase count
        ↓
no → continue
```

---

## Question 23: Count consonants in a string

**What to do:** Given `text = "python"`, count the consonants (letters that are not vowels) and print the count.

**Hint:** `if character not in "aeiou"` — the `not in` operator.

**Solution:**

```python
text = "python"

count = 0

for character in text:
    if character not in "aeiou":
        count = count + 1

print(count)
```

**A better version that ignores spaces:**

```python
text = "hello world"

count = 0

for character in text:
    if character.isalpha() and character not in "aeiou":
        count += 1

print(count)
```

**Logic:** The second version uses `isalpha()` so spaces and punctuation are not counted as consonants.

---

## Question 24: Reverse a string

**What to do:** Given `text = "python"`, build the reversed string "nohtyp" using a loop.

**Hint:** Add each character to the *front* of the result: `reversed_text = character + reversed_text`.

**Solution:**

```python
text = "python"

reversed_text = ""

for character in text:
    reversed_text = character + reversed_text

print(reversed_text)
```

**Trace it:**

```
p       → p
y       → yp
t       → typ
h       → htyp
o       → ohtyp
n       → nohtyp
```

**Logic:** A very useful exercise because it shows how a variable's value changes over time, one step at a time.

---

## Question 25: Check whether a string is a palindrome

**What to do:** A palindrome reads the same forward and backward (e.g. "madam", "level", "racecar"). Given `text = "madam"`, print "Palindrome" or "Not palindrome".

**Hint:** Reuse the reverse logic from Question 24, then compare with `==`.

**Solution:**

```python
text = "madam"

reversed_text = ""

for character in text:
    reversed_text = character + reversed_text

if text == reversed_text:
    print("Palindrome")
else:
    print("Not palindrome")
```

**Logic:** If the reversed string equals the original, the string reads the same both ways.

---

## Question 26: Count a specific character

**What to do:** Given `text = "banana"`, count how many times the letter "a" appears.

**Hint:** Loop over characters and compare each one with `"a"`.

**Solution:**

```python
text = "banana"

count = 0

for character in text:
    if character == "a":
        count += 1

print(count)
```

**Expected output:**

```
3
```

**Logic:** Counting pattern + an equality check against a fixed target.

---

## Question 27: Find the first occurrence of a character

**What to do:** Given `text = "programming"` and `target = "g"`, print the *index* of the first "g" and stop searching afterwards.

**Hint:** Use `range(len(text))` to get indexes, and `break` to stop as soon as you find the target.

**Solution:**

```python
text = "programming"
target = "g"

for i in range(len(text)):
    if text[i] == target:
        print("Found at index:", i)
        break
```

**Logic:** The important new idea is `break`. Once we find what we want, there is no reason to keep looping.

---

## Question 28: Count positive and negative numbers

**What to do:** Given `numbers = [10, -5, 20, -8, 0, 15, -2]`, count how many numbers are positive and how many are negative. Print both counts.

**Hint:** Two counters, one loop, and an `if/elif` chain.

**Solution:**

```python
numbers = [10, -5, 20, -8, 0, 15, -2]

positive = 0
negative = 0

for number in numbers:
    if number > 0:
        positive += 1
    elif number < 0:
        negative += 1

print("Positive:", positive)
print("Negative:", negative)
```

**Logic:** One loop can solve multiple related tasks at the same time. Zero belongs to neither group.

---

## Question 29: Find numbers greater than 10

**What to do:** Given `numbers = [5, 12, 8, 20, 3, 15, 7]`, print every number that is greater than 10, one per line.

**Hint:** Simple filter — an `if` inside a loop that prints matching items.

**Solution:**

```python
numbers = [5, 12, 8, 20, 3, 15, 7]

for number in numbers:
    if number > 10:
        print(number)
```

**Expected output:**

```
12
20
15
```

**Logic:** This is the *filter* pattern: loop, test a condition, keep (print/collect) the items that pass.

---

## Question 30: Find the second largest number

**What to do:** Given `numbers = [10, 45, 23, 89, 12, 67]`, print the second largest number.

**Hint:** Keep *two* "current best" variables: `largest` and `second_largest`. Start both at `float("-inf")` (negative infinity — smaller than any real number).

**Solution:**

```python
numbers = [10, 45, 23, 89, 12, 67]

largest = float("-inf")
second_largest = float("-inf")

for number in numbers:

    if number > largest:
        second_largest = largest
        largest = number

    elif number > second_largest and number != largest:
        second_largest = number

print(second_largest)
```

**Expected output:**

```
67
```

**Logic:**

```
number = 10
largest = 10
second = nothing

number = 45
45 > 10
→ second = 10
→ largest = 45

number = 23
23 < 45
23 > 10
→ second = 23

number = 89
89 > 45
→ second = 45
→ largest = 89

...
```

This is the kind of step-by-step thinking you want to develop.

---

## The important patterns you've just learned

Don't try to memorize all 30 solutions. Notice the patterns.

**Pattern 1 — Counting**

```python
count = 0

for item in items:
    if condition:
        count += 1
```

Used in questions 8, 18, 19, 22, 23, 26 and 28.

**Pattern 2 — Running total**

```python
total = 0

for item in items:
    total += item
```

Used in questions 6, 7, 17 and 20.

**Pattern 3 — Find largest**

```python
largest = numbers[0]

for number in numbers:
    if number > largest:
        largest = number
```

**Pattern 4 — Find smallest**

```python
smallest = numbers[0]

for number in numbers:
    if number < smallest:
        smallest = number
```

**Pattern 5 — Search**

```python
for item in items:
    if item == target:
        # found
```

**Pattern 6 — Filter**

```python
for item in items:
    if condition:
        print(item)
```

**Pattern 7 — Build a new value**

```python
result = ""

for character in text:
    result = character + result
```

These patterns are much more important than memorizing individual programs.
