# 🔑 Phase 2 — Solutions

A worked solution for every question in [practice-questions.md](practice-questions.md).

**These stay inside Phase 2's rules.** Everything from Phase 1, plus strings, lists, tuples, sets, dictionaries, their methods, and comprehensions. Still no user-defined functions, no classes and no imports. If a solution here uses something you have not met yet, that is a bug; tell me.

Every solution was **executed against the full test suite** — 116 test cases across 60 questions — and passes all of them.

> ⚠️ Reading a solution you have not attempted feels like learning and is not. If you open one, close it, delete what you wrote, and reproduce it from memory. Recognising correct code and writing it from a blank file are different skills, and only the second one is short.
>

**There is more than one right answer.** These are written to be *readable*, not shortest. If yours passes and you can explain it line by line, yours is correct.

Your program prints its answer. **Prompts are ignored** - the grader throws away whatever you pass to `input()`, so `input("Enter text: ")` and `input()` score the same. Trailing whitespace is ignored; everything else is exact.

```bash
cd tests
python run_tests.py --new 4     # write your own first
python run_tests.py 4 --diff    # then check it
```

---

## Contents

| # | Question | Cases |
| --- | --- | --- |
| Q1 | [String Facts](#q1-string-facts) | 4 |
| Q2 | [First and Last](#q2-first-and-last) | 4 |
| Q3 | [Slicing Practice](#q3-slicing-practice) | 1 |
| Q4 | [Vowel and Consonant Count](#q4-vowel-and-consonant-count) | 4 |
| Q5 | [Palindrome Check](#q5-palindrome-check) | 4 |
| Q6 | [Sentence Palindrome](#q6-sentence-palindrome) | 3 |
| Q7 | [Word Count](#q7-word-count) | 3 |
| Q8 | [Title Case Manually](#q8-title-case-manually) | 3 |
| Q9 | [Character Frequency](#q9-character-frequency) | 3 |
| Q10 | [Remove Duplicates from a String](#q10-remove-duplicates-from-a-string) | 3 |
| Q11 | [Reverse Word Order](#q11-reverse-word-order) | 3 |
| Q12 | [Password Strength Checker](#q12-password-strength-checker) | 4 |
| Q13 | [List Statistics](#q13-list-statistics) | 3 |
| Q14 | [Second Largest](#q14-second-largest) | 1 |
| Q15 | [Reverse a List Manually](#q15-reverse-a-list-manually) | 1 |
| Q16 | [Remove Duplicates, Keep Order](#q16-remove-duplicates-keep-order) | 1 |
| Q17 | [Even and Odd Split](#q17-even-and-odd-split) | 1 |
| Q18 | [Squares and Cubes](#q18-squares-and-cubes) | 1 |
| Q19 | [Rotate a List](#q19-rotate-a-list) | 4 |
| Q20 | [Merge Two Sorted Lists](#q20-merge-two-sorted-lists) | 1 |
| Q21 | [Bubble Sort](#q21-bubble-sort) | 1 |
| Q22 | [Linear vs Binary Search](#q22-linear-vs-binary-search) | 1 |
| Q23 | [Two-Dimensional List](#q23-two-dimensional-list) | 2 |
| Q24 | [Matrix Multiplication](#q24-matrix-multiplication) | 1 |
| Q25 | [Tuple Basics](#q25-tuple-basics) | 1 |
| Q26 | [Tuple Unpacking](#q26-tuple-unpacking) | 1 |
| Q27 | [Swap Without Temp](#q27-swap-without-temp) | 1 |
| Q28 | [Set Operations](#q28-set-operations) | 3 |
| Q29 | [Common Characters](#q29-common-characters) | 3 |
| Q30 | [Anagram Groups](#q30-anagram-groups) | 1 |
| Q31 | [Remove Duplicates — Three Ways](#q31-remove-duplicates-three-ways) | 1 |
| Q32 | [Subset and Superset](#q32-subset-and-superset) | 1 |
| Q33 | [Set from Sentence](#q33-set-from-sentence) | 3 |
| Q34 | [Frozen Set as a Dictionary Key](#q34-frozen-set-as-a-dictionary-key) | 1 |
| Q35 | [Dictionary Basics](#q35-dictionary-basics) | 1 |
| Q36 | [Word Frequency Counter](#q36-word-frequency-counter) | 3 |
| Q37 | [Character Frequency with a Dictionary](#q37-character-frequency-with-a-dictionary) | 3 |
| Q38 | [Invert a Dictionary](#q38-invert-a-dictionary) | 1 |
| Q39 | [Merge Dictionaries](#q39-merge-dictionaries) | 1 |
| Q40 | [Student Marks Dictionary](#q40-student-marks-dictionary) | 1 |
| Q41 | [Nested Dictionary](#q41-nested-dictionary) | 1 |
| Q42 | [Dictionary Comprehension](#q42-dictionary-comprehension) | 1 |
| Q43 | [Group Words by First Letter](#q43-group-words-by-first-letter) | 1 |
| Q44 | [Shopping Cart](#q44-shopping-cart) | 1 |
| Q45 | [Two-Sum with a Dictionary](#q45-two-sum-with-a-dictionary) | 1 |
| Q46 | [Inventory Management](#q46-inventory-management) | 3 |
| Q47 | [List of Dictionaries](#q47-list-of-dictionaries) | 1 |
| Q48 | [Dictionary of Lists](#q48-dictionary-of-lists) | 1 |
| Q49 | [Sort a Dictionary](#q49-sort-a-dictionary) | 1 |
| Q50 | [Matrix Row and Column Operations](#q50-matrix-row-and-column-operations) | 1 |
| Q51 | [Longest Common Prefix](#q51-longest-common-prefix) | 1 |
| Q52 | [Run-Length Encoding](#q52-run-length-encoding) | 3 |
| Q53 | [Caesar Cipher](#q53-caesar-cipher) | 3 |
| Q54 | [Balanced Brackets](#q54-balanced-brackets) | 1 |
| Q55 | [Sales Data Analysis](#q55-sales-data-analysis) | 1 |
| Q56 | [Text Analyser](#q56-text-analyser) | 1 |
| Q57 | [Student Grade Management System](#q57-student-grade-management-system) | 3 |
| Q58 | [Contact Book with Search](#q58-contact-book-with-search) | 3 |
| Q59 | [Word Frequency Report with Ranking](#q59-word-frequency-report-with-ranking) | 1 |
| Q60 | [Matrix Operations Suite](#q60-matrix-operations-suite) | 4 |

---

## Tier 1 — String Basics (Q1–Q12)

### Q1. String Facts

```python
text = input("Enter text: ")

print(f"Length: {len(text)}")
print(f"Upper: {text.upper()}")
print(f"Lower: {text.lower()}")
print(f"Stripped: '{text.strip()}'")
```

**What to notice:** Each string method returns a NEW string; the original never changes.

**Sample case** — input `  Hello World`:

```
Length: 13
Upper:   HELLO WORLD
Lower:   hello world
Stripped: 'Hello World'
```

Also tested on 3 hidden cases: `Python`, `   `, `a`

---

### Q2. First and Last

```python
word = input("Enter a word: ")

print(f"First: {word[0]}")
print(f"Last: {word[-1]}")

middle_index = len(word) // 2
if len(word) % 2 == 1:
    middle = word[middle_index]
else:
    middle = word[middle_index - 1:middle_index + 1]

print(f"Middle: {middle}")
```

**What to notice:** An even-length word has two middle characters, so the slice differs from the odd case.

**Sample case** — input `Python`:

```
First: P
Last: n
Middle: th
```

Also tested on 3 hidden cases: `a`, `hi`, `abcde`

---

### Q3. Slicing Practice

```python
text = "PythonProgramming"

print(text[:6])        # first 6 characters
print(text[-11:])      # last 11 characters
print(text[::2])       # every second character - index 6 is a capital P
print(text[::-1])      # reversed
```

**What to notice:** `[::2]` picks indices 0, 2, 4... and index 6 is the capital P of Programming.

**Sample case** — input *(no input)*:

```
Python
Programming
PtoPormig
gnimmargorPnohtyP
```

---

### Q4. Vowel and Consonant Count

```python
sentence = input("Enter a sentence: ")

vowels = 0
consonants = 0
digits = 0
spaces = 0

for character in sentence:
    if character == " ":
        spaces = spaces + 1
    elif character.isdigit():
        digits = digits + 1
    elif character.isalpha():
        if character.lower() in "aeiou":
            vowels = vowels + 1
        else:
            consonants = consonants + 1

print(f"Vowels: {vowels}")
print(f"Consonants: {consonants}")
print(f"Digits: {digits}")
print(f"Spaces: {spaces}")
```

**What to notice:** Test `isdigit()` and `isalpha()` before deciding vowel or consonant, or spaces get miscounted.

**Sample case** — input `Python 3 is great`:

```
Vowels: 4
Consonants: 9
Digits: 1
Spaces: 3
```

Also tested on 3 hidden cases: `aeiou`, `12345`, `Hello, World!`

---

### Q5. Palindrome Check

```python
word = input("Enter a word: ")

lowered = word.lower()

print(f"Palindrome: {lowered == lowered[::-1]}")
```

**What to notice:** Lowercase BEFORE reversing, on both sides of the comparison.

**Sample case** — input `Racecar`:

```
Palindrome: True
```

Also tested on 3 hidden cases: `python`, `a`, `Noon`

---

### Q6. Sentence Palindrome

```python
sentence = input("Enter a sentence: ")

cleaned = ""
for character in sentence:
    if character.isalnum():
        cleaned = cleaned + character.lower()

print(f"Palindrome: {cleaned == cleaned[::-1]}")
```

**What to notice:** Build the cleaned string first; the palindrome test itself is then one line.

**Sample case** — input `A man, a plan, a canal: Panama`:

```
Palindrome: True
```

Also tested on 2 hidden cases: `Hello world`, `No 'x' in Nixon`

---

### Q7. Word Count

```python
sentence = input("Enter a sentence: ")
words = sentence.split()

longest = words[0]
shortest = words[0]
for word in words:
    if len(word) > len(longest):
        longest = word
    if len(word) < len(shortest):
        shortest = word

print(f"Words: {len(words)}")
print(f"Longest: {longest}")
print(f"Shortest: {shortest}")
```

**What to notice:** The shortest word here is `makes` at 5 characters, not `Python` at 6.

**Sample case** — input `Python makes programming enjoyable`:

```
Words: 4
Longest: programming
Shortest: makes
```

Also tested on 2 hidden cases: `one`, `a bb ccc dddd`

---

### Q8. Title Case Manually

```python
sentence = input("Enter a sentence: ")

result = ""
for word in sentence.split():
    capitalised = word[0].upper() + word[1:]
    if result == "":
        result = capitalised
    else:
        result = result + " " + capitalised

print(f"Title case: {result}")
```

**What to notice:** `word[0].upper() + word[1:]` preserves the rest of the word exactly.

**Sample case** — input `the quick brown fox`:

```
Title case: The Quick Brown Fox
```

Also tested on 2 hidden cases: `hello`, `a b c`

---

### Q9. Character Frequency

```python
word = input("Enter a word: ")

counts = {}
for character in word:
    counts[character] = counts.get(character, 0) + 1

# Dictionaries keep insertion order, so this is first-appearance order.
for character in counts:
    print(f"{character}: {counts[character]}")
```

**What to notice:** Dictionaries keep insertion order, so counting gives first-appearance order free.

**Sample case** — input `programming`:

```
p: 1
r: 2
o: 1
g: 2
a: 1
m: 2
i: 1
n: 1
```

Also tested on 2 hidden cases: `aaa`, `abc`

---

### Q10. Remove Duplicates from a String

```python
text = input("Enter text: ")

seen = set()
result = ""
for character in text:
    if character not in seen:
        seen.add(character)
        result = result + character

print(f"Result: {result}")
```

**What to notice:** A set for the membership test, a string for the output - each does what it is good at.

**Sample case** — input `programming`:

```
Result: progamin
```

Also tested on 2 hidden cases: `aaaa`, `abcdef`

---

### Q11. Reverse Word Order

```python
sentence = input("Enter a sentence: ")

words = sentence.split()
words.reverse()

print(f"Result: {' '.join(words)}")
```

**What to notice:** Reverse the LIST of words; reversing the string would spell every word backwards.

**Sample case** — input `Python is really powerful`:

```
Result: powerful really is Python
```

Also tested on 2 hidden cases: `one`, `a b c d`

---

### Q12. Password Strength Checker

```python
password = input("Enter password: ")

long_enough = len(password) >= 8
has_upper = False
has_lower = False
has_digit = False
has_special = False

for character in password:
    if character.isupper():
        has_upper = True
    elif character.islower():
        has_lower = True
    elif character.isdigit():
        has_digit = True
    else:
        has_special = True

score = 0
for rule in [long_enough, has_upper, has_lower, has_digit, has_special]:
    if rule:
        score = score + 1

print(f"Length 8+: {long_enough}")
print(f"Uppercase: {has_upper}")
print(f"Lowercase: {has_lower}")
print(f"Digit: {has_digit}")
print(f"Special char: {has_special}")

if score == 5:
    strength = "Strong"
elif score >= 3:
    strength = "Medium"
else:
    strength = "Weak"

print(f"Strength: {strength} ({score}/5)")
```

**What to notice:** One boolean per rule, then count the `True` values for the score.

**Sample case** — input `Python123`:

```
Length 8+: True
Uppercase: True
Lowercase: True
Digit: True
Special char: False
Strength: Medium (4/5)
```

Also tested on 3 hidden cases: `abc`, `Password1!`, `ALLUPPER123!`

---

## Tier 2 — List Fundamentals (Q13–Q24)

### Q13. List Statistics

```python
count = int(input("How many numbers? "))

numbers = []
for i in range(count):
    numbers.append(float(input()))

total = 0
largest = numbers[0]
smallest = numbers[0]
for number in numbers:
    total = total + number
    if number > largest:
        largest = number
    if number < smallest:
        smallest = number

print(f"Sum: {total:.0f}")
print(f"Average: {total / count:.2f}")
print(f"Max: {largest:.0f}")
print(f"Min: {smallest:.0f}")
```

**What to notice:** Seed max and min from the first element, never from 0.

**Sample case** — input `5`, `12`, `45`, `7`, `89`, `23`:

```
Sum: 176
Average: 35.20
Max: 89
Min: 7
```

Also tested on 2 hidden cases: `1 42`, `3 -5 0 5`

---

### Q14. Second Largest

```python
numbers = [12, 45, 7, 89, 23]

largest = numbers[0]
second = None

for number in numbers:
    if number > largest:
        second = largest
        largest = number
    elif number < largest:
        if second is None or number > second:
            second = number

if second is None:
    print("Second largest: none - all values are identical")
else:
    print(f"Second largest: {second}")
```

**What to notice:** Track two variables in one pass; when a new maximum arrives, the old one becomes second.

**Sample case** — input *(no input)*:

```
Second largest: 45
```

---

### Q15. Reverse a List Manually

```python
numbers = [1, 2, 3, 4, 5]
print(f"Before: {numbers}")

# Swap position i with position n-1-i, stopping halfway.
n = len(numbers)
for i in range(n // 2):
    numbers[i], numbers[n - 1 - i] = numbers[n - 1 - i], numbers[i]

print(f"After: {numbers}")
```

**What to notice:** Loop only to `n // 2`. Going the whole way swaps every pair twice and undoes the work.

**Sample case** — input *(no input)*:

```
Before: [1, 2, 3, 4, 5]
After: [5, 4, 3, 2, 1]
```

---

### Q16. Remove Duplicates, Keep Order

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
print(f"Input: {numbers}")

result = []
for number in numbers:
    if number not in result:
        result.append(number)

print(f"Output: {result}")
```

**What to notice:** `if number not in result` is an O(n) scan each time - fine here, slow on big lists.

**Sample case** — input *(no input)*:

```
Input: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
Output: [3, 1, 4, 5, 9, 2, 6]
```

---

### Q17. Even and Odd Split

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(f"Input: {numbers}")

evens = [n for n in numbers if n % 2 == 0]
odds = [n for n in numbers if n % 2 != 0]

print(f"Even: {evens}")
print(f"Odd: {odds}")
```

**What to notice:** The condition goes at the END of a comprehension, the transformation at the front.

**Sample case** — input *(no input)*:

```
Input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Even: [2, 4, 6, 8, 10]
Odd: [1, 3, 5, 7, 9]
```

---

### Q18. Squares and Cubes

```python
squares = [n ** 2 for n in range(1, 21) if n % 2 == 0]
cubes = [n ** 3 for n in range(1, 21) if n % 2 != 0]

print(f"Squares of evens: {squares}")
print(f"Cubes of odds: {cubes}")
```

**What to notice:** `range(1, 21)` then filter, or `range(2, 21, 2)` to skip the filter entirely.

**Sample case** — input *(no input)*:

```
Squares of evens: [4, 16, 36, 64, 100, 144, 196, 256, 324, 400]
Cubes of odds: [1, 27, 125, 343, 729, 1331, 2197, 3375, 4913, 6859]
```

---

### Q19. Rotate a List

```python
numbers = [1, 2, 3, 4, 5, 6, 7]
k = int(input("Rotate by: "))

print(f"List: {numbers}")
print(f"Rotate by: {k}")

# Reduce k first, so a rotation bigger than the list still works.
k = k % len(numbers)
result = numbers[-k:] + numbers[:-k] if k else numbers[:]

print(f"Result: {result}")
```

**What to notice:** Reduce `k` with `k % len(numbers)` first, or a big rotation breaks the slice.

**Sample case** — input `3`:

```
List: [1, 2, 3, 4, 5, 6, 7]
Rotate by: 3
Result: [5, 6, 7, 1, 2, 3, 4]
```

Also tested on 3 hidden cases: `0`, `7`, `10`

---

### Q20. Merge Two Sorted Lists

```python
a = [1, 4, 7, 10]
b = [2, 3, 8, 11, 15]
print(f"List A: {a}")
print(f"List B: {b}")

merged = []
i = 0
j = 0

# Take the smaller of the two current heads each time.
while i < len(a) and j < len(b):
    if a[i] <= b[j]:
        merged.append(a[i])
        i = i + 1
    else:
        merged.append(b[j])
        j = j + 1

# One list may still have items left over.
while i < len(a):
    merged.append(a[i])
    i = i + 1
while j < len(b):
    merged.append(b[j])
    j = j + 1

print(f"Merged: {merged}")
```

**What to notice:** Because both inputs are sorted, you only ever compare the two current heads.

**Sample case** — input *(no input)*:

```
List A: [1, 4, 7, 10]
List B: [2, 3, 8, 11, 15]
Merged: [1, 2, 3, 4, 7, 8, 10, 11, 15]
```

---

### Q21. Bubble Sort

```python
numbers = [5, 2, 9, 1, 7]
print(f"Initial: {numbers}")

n = len(numbers)
for pass_number in range(1, n):
    for i in range(n - 1):
        if numbers[i] > numbers[i + 1]:
            numbers[i], numbers[i + 1] = numbers[i + 1], numbers[i]
    print(f"Pass {pass_number}: {numbers}")

print(f"Sorted: {numbers}")
```

**What to notice:** Each pass floats the largest remaining value to the end.

**Sample case** — input *(no input)*:

```
Initial: [5, 2, 9, 1, 7]
Pass 1: [2, 5, 1, 7, 9]
Pass 2: [2, 1, 5, 7, 9]
Pass 3: [1, 2, 5, 7, 9]
Pass 4: [1, 2, 5, 7, 9]
Sorted: [1, 2, 5, 7, 9]
```

---

### Q22. Linear vs Binary Search

```python
numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 72
print(f"List: {numbers}")
print(f"Target: {target}")

# Linear search: check each item in turn.
linear_comparisons = 0
linear_index = -1
for i in range(len(numbers)):
    linear_comparisons = linear_comparisons + 1
    if numbers[i] == target:
        linear_index = i
        break

# Binary search: halve the range each time.
low = 0
high = len(numbers) - 1
binary_comparisons = 0
binary_index = -1
while low <= high:
    middle = (low + high) // 2
    binary_comparisons = binary_comparisons + 1
    if numbers[middle] == target:
        binary_index = middle
        break
    elif numbers[middle] < target:
        low = middle + 1
    else:
        high = middle - 1

print(f"Linear search: found at index {linear_index} in {linear_comparisons} comparisons")
print(f"Binary search: found at index {binary_index} in {binary_comparisons} comparisons")
```

**What to notice:** Binary search takes 3 comparisons here, not 2 - count them yourself.

**Sample case** — input *(no input)*:

```
List: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 72
Linear search: found at index 8 in 9 comparisons
Binary search: found at index 8 in 3 comparisons
```

---

### Q23. Two-Dimensional List

```python
matrix = []
for row in range(3):
    current = []
    for column in range(3):
        current.append(int(input()))
    matrix.append(current)

print("Matrix:")
for row in matrix:
    print(" ".join(str(value) for value in row))

print("Transpose:")
for column in range(3):
    line = []
    for row in range(3):
        line.append(str(matrix[row][column]))
    print(" ".join(line))

diagonal = 0
for i in range(3):
    diagonal = diagonal + matrix[i][i]

print(f"Diagonal sum: {diagonal}")
```

**What to notice:** The transpose swaps the indices: `t[j][i] = m[i][j]`.

**Sample case** — input `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`:

```
Matrix:
1 2 3
4 5 6
7 8 9
Transpose:
1 4 7
2 5 8
3 6 9
Diagonal sum: 15
```

Also tested on 1 hidden case: `1 0 0 0 1 0 0 0 1`

---

### Q24. Matrix Multiplication

```python
a = [[1, 2], [3, 4]]
b = [[5, 6], [7, 8]]
print(f"A = {a}")
print(f"B = {b}")

result = []
for i in range(2):
    row = []
    for j in range(2):
        # Row i of A against column j of B.
        total = 0
        for k in range(2):
            total = total + a[i][k] * b[k][j]
        row.append(total)
    result.append(row)

print(f"A x B = {result}")
```

**What to notice:** Each output cell is a row of A against a column of B, so the loops nest three deep.

**Sample case** — input *(no input)*:

```
A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
A x B = [[19, 22], [43, 50]]
```

---

## Tier 3 — Tuples and Sets (Q25–Q34)

### Q25. Tuple Basics

```python
values = (12, 45, 7, 45, 89, 23)

print(f"Tuple: {values}")
print(f"Length: {len(values)}")
print(f"Max: {max(values)}  Min: {min(values)}")
print(f"Count of 45: {values.count(45)}")
print(f"Index of 89: {values.index(89)}")

try:
    values[0] = 99
except TypeError as error:
    print(f"TypeError: {error}")
```

**What to notice:** A tuple rejects item assignment entirely - catch the TypeError to see it.

**Sample case** — input *(no input)*:

```
Tuple: (12, 45, 7, 45, 89, 23)
Length: 6
Max: 89  Min: 7
Count of 45: 2
Index of 89: 4
TypeError: 'tuple' object does not support item assignment
```

---

### Q26. Tuple Unpacking

```python
student = ("Rohan", 18, 85.5, "Mumbai")

name, age, score, city = student
print(f"Name: {name}, Age: {age}, Score: {score}, City: {city}")

# Starred unpacking always puts the rest into a LIST.
first, *rest = student
print(f"First: {first}")
print(f"Rest: {rest}")
```

**What to notice:** Starred unpacking always produces a LIST, even from a tuple.

**Sample case** — input *(no input)*:

```
Name: Rohan, Age: 18, Score: 85.5, City: Mumbai
First: Rohan
Rest: [18, 85.5, 'Mumbai']
```

---

### Q27. Swap Without Temp

```python
a = 1
b = 2
c = 3
print(f"Before: a={a} b={b} c={c}")

# The whole right-hand side is built first, so this rotates safely.
a, b, c = c, a, b

print(f"After:  a={a} b={b} c={c}")
```

**What to notice:** The whole right-hand side is built before anything is assigned, so a 3-way rotation is safe.

**Sample case** — input *(no input)*:

```
Before: a=1 b=2 c=3
After:  a=3 b=1 c=2
```

---

### Q28. Set Operations

```python
a = set()
for piece in input("Set A: ").split():
    a.add(int(piece))

b = set()
for piece in input("Set B: ").split():
    b.add(int(piece))

# Sets have no reliable print order, so sort before showing them.
print(f"Set A: {sorted(a)}")
print(f"Set B: {sorted(b)}")
print(f"Union: {sorted(a | b)}")
print(f"Intersection: {sorted(a & b)}")
print(f"A - B: {sorted(a - b)}")
print(f"B - A: {sorted(b - a)}")
print(f"Symmetric difference: {sorted(a ^ b)}")
```

**What to notice:** Sets have no reliable print order, so sort before printing or your output changes between runs.

**Sample case** — input `1 2 3 4 5`, `4 5 6 7`:

```
Set A: [1, 2, 3, 4, 5]
Set B: [4, 5, 6, 7]
Union: [1, 2, 3, 4, 5, 6, 7]
Intersection: [4, 5]
A - B: [1, 2, 3]
B - A: [6, 7]
Symmetric difference: [1, 2, 3, 6, 7]
```

Also tested on 2 hidden cases: `1 1`, `1 2 3 4`

---

### Q29. Common Characters

```python
word1 = input("Word 1: ")
word2 = input("Word 2: ")

set1 = set(word1)
set2 = set(word2)

print(f"Common: {sorted(set1 & set2)}")
print(f"Unique to word 1: {sorted(set1 - set2)}")
print(f"Unique to word 2: {sorted(set2 - set1)}")
print(f"Same letters: {set1 == set2}")
```

**What to notice:** Comparing sets ignores counts - `aab` and `abb` would also look identical.

**Sample case** — input `listen`, `silent`:

```
Common: ['e', 'i', 'l', 'n', 's', 't']
Unique to word 1: []
Unique to word 2: []
Same letters: True
```

Also tested on 2 hidden cases: `hello world`, `abc abc`

---

### Q30. Anagram Groups

```python
words = ["listen", "silent", "enlist", "google", "banana"]
print(f"Words: {words}")

# Compare each word only with the ones after it, so no pair repeats.
for i in range(len(words)):
    for j in range(i + 1, len(words)):
        if sorted(words[i]) == sorted(words[j]):
            print(f"{words[i]} & {words[j]} are anagrams")
```

**What to notice:** Start the inner loop at `i + 1` so no pair is reported twice.

**Sample case** — input *(no input)*:

```
Words: ['listen', 'silent', 'enlist', 'google', 'banana']
listen & silent are anagrams
listen & enlist are anagrams
silent & enlist are anagrams
```

---

### Q31. Remove Duplicates — Three Ways

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5]
print(f"Input: {numbers}")

# A set loses the order, so sort it to get a predictable result.
via_set = sorted(set(numbers))

via_loop = []
for number in numbers:
    if number not in via_loop:
        via_loop.append(number)

via_dict = list(dict.fromkeys(numbers))

print(f"Via set:  {via_set}   (order lost)")
print(f"Via loop: {via_loop}   (order kept)")
print(f"Via dict: {via_dict}   (order kept)")
```

**What to notice:** `list(dict.fromkeys(items))` is the whole third solution.

**Sample case** — input *(no input)*:

```
Input: [3, 1, 4, 1, 5, 9, 2, 6, 5]
Via set:  [1, 2, 3, 4, 5, 6, 9]   (order lost)
Via loop: [3, 1, 4, 5, 9, 2, 6]   (order kept)
Via dict: [3, 1, 4, 5, 9, 2, 6]   (order kept)
```

---

### Q32. Subset and Superset

```python
a = {1, 2}
b = {1, 2, 3, 4}
c = {5, 6}

print(f"A = {sorted(a)}")
print(f"B = {sorted(b)}")
print(f"C = {sorted(c)}")
print(f"A is subset of B: {a <= b}")
print(f"B is superset of A: {b >= a}")
print(f"A and C disjoint: {a.isdisjoint(c)}")
```

**What to notice:** Every set is a subset of itself; use `<` for a strict subset.

**Sample case** — input *(no input)*:

```
A = [1, 2]
B = [1, 2, 3, 4]
C = [5, 6]
A is subset of B: True
B is superset of A: True
A and C disjoint: True
```

---

### Q33. Set from Sentence

```python
sentence = input("Sentence: ")

words = sentence.lower().split()
unique = set(words)

print(f"Total words: {len(words)}")
print(f"Unique words: {len(unique)}")
print(f"Unique set: {sorted(unique)}")
```

**What to notice:** Lowercase before building the set, or `The` and `the` count as two words.

**Sample case** — input `The cat sat on the mat the cat left`:

```
Total words: 9
Unique words: 6
Unique set: ['cat', 'left', 'mat', 'on', 'sat', 'the']
```

Also tested on 2 hidden cases: `Hello hello HELLO`, `one two`

---

### Q34. Frozen Set as a Dictionary Key

```python
# A frozenset cannot change, so it is safe to use as a key.
dishes = {}
dishes[frozenset(["rice", "dal"])] = "Khichdi"
dishes[frozenset(["flour", "water"])] = "Roti"

# Order inside a frozenset does not matter for the lookup.
lookup = frozenset(["dal", "rice"])
print(f"Lookup rice+dal -> {dishes[lookup]}")

try:
    broken = {}
    broken[{"rice", "dal"}] = "Khichdi"
except TypeError as error:
    print(f"TypeError: {error}")
```

**What to notice:** A frozenset cannot change, so it is safe as a key. Order inside it does not matter.

**Sample case** — input *(no input)*:

```
Lookup rice+dal -> Khichdi
TypeError: unhashable type: 'set'
```

---

## Tier 4 — Dictionaries (Q35–Q46)

### Q35. Dictionary Basics

```python
capitals = {
    "India": "New Delhi",
    "Japan": "Tokyo",
    "France": "Paris",
    "Kenya": "Nairobi",
    "Brazil": "Brasilia",
}

print(f"Keys: {list(capitals.keys())}")
print(f"Values: {list(capitals.values())}")
print(f"India -> {capitals['India']}")
print(f"Atlantis -> {capitals.get('Atlantis', 'Not found')}")
```

**What to notice:** `.get(key, default)` returns the fallback instead of raising KeyError.

**Sample case** — input *(no input)*:

```
Keys: ['India', 'Japan', 'France', 'Kenya', 'Brazil']
Values: ['New Delhi', 'Tokyo', 'Paris', 'Nairobi', 'Brasilia']
India -> New Delhi
Atlantis -> Not found
```

---

### Q36. Word Frequency Counter

```python
sentence = input("Sentence: ")

counts = {}
for word in sentence.split():
    counts[word] = counts.get(word, 0) + 1

# Sorting .items() gives a list of (word, count) pairs.
for word, count in sorted(counts.items(), key=lambda pair: pair[1], reverse=True):
    print(f"{word}: {count}")
```

**What to notice:** Sorting a dictionary gives back a LIST of pairs - dictionaries have no sort order.

**Sample case** — input `the cat sat on the mat the cat left`:

```
the: 3
cat: 2
sat: 1
on: 1
mat: 1
left: 1
```

Also tested on 2 hidden cases: `a a a b`, `one`

---

### Q37. Character Frequency with a Dictionary

```python
word = input("Word: ")

counts = {}
for character in word:
    counts[character] = counts.get(character, 0) + 1

repeated = ""
for character, count in counts.items():
    if count > 1:
        repeated = repeated + f"{character}({count}) "

print(f"Repeated: {repeated.strip()}")
```

**What to notice:** Count everything first, then filter. Doing both in one pass is harder and no faster.

**Sample case** — input `programming`:

```
Repeated: r(2) g(2) m(2)
```

Also tested on 2 hidden cases: `abc`, `aabbcc`

---

### Q38. Invert a Dictionary

```python
original = {"a": 1, "b": 2, "c": 1}
print(f"Input: {original}")

# Simple invert: a later key with the same value overwrites the earlier one.
simple = {}
for key, value in original.items():
    simple[value] = key
print(f"Simple invert: {simple}     (data lost!)")

# Safe invert: collect every key that shares a value.
safe = {}
for key, value in original.items():
    safe.setdefault(value, []).append(key)
print(f"Safe invert: {safe}")
```

**What to notice:** The simple invert loses data whenever two keys share a value.

**Sample case** — input *(no input)*:

```
Input: {'a': 1, 'b': 2, 'c': 1}
Simple invert: {1: 'c', 2: 'b'}     (data lost!)
Safe invert: {1: ['a', 'c'], 2: ['b']}
```

---

### Q39. Merge Dictionaries

```python
a = {"x": 1, "y": 2}
b = {"y": 99, "z": 3}
print(f"A = {a}")
print(f"B = {b}")

merged = {**a, **b}
print(f"Merged: {merged}")
print("Note: B's value for 'y' wins in all three methods.")
```

**What to notice:** The right-hand dictionary wins on duplicate keys, in all three methods.

**Sample case** — input *(no input)*:

```
A = {'x': 1, 'y': 2}
B = {'y': 99, 'z': 3}
Merged: {'x': 1, 'y': 99, 'z': 3}
Note: B's value for 'y' wins in all three methods.
```

---

### Q40. Student Marks Dictionary

```python
marks = {"Rohan": 78, "Priya": 92, "Amit": 35, "Sneha": 61}
print(marks)

topper = max(marks, key=marks.get)
average = sum(marks.values()) / len(marks)

above = [name for name in marks if marks[name] > average]
failed = [name for name in marks if marks[name] < 40]

print(f"Topper: {topper} ({marks[topper]})")
print(f"Average: {average:.2f}")
print(f"Above average: {above}")
print(f"Failed: {failed}")
```

**What to notice:** `max(marks, key=marks.get)` returns the KEY with the highest value.

**Sample case** — input *(no input)*:

```
{'Rohan': 78, 'Priya': 92, 'Amit': 35, 'Sneha': 61}
Topper: Priya (92)
Average: 66.50
Above average: ['Rohan', 'Priya']
Failed: ['Amit']
```

---

### Q41. Nested Dictionary

```python
students = {
    "Rohan": {"Math": 78, "Science": 85, "English": 72},
    "Priya": {"Math": 92, "Science": 88, "English": 95},
}

for name, subjects in students.items():
    total = sum(subjects.values())
    percentage = total / len(subjects)
    print(f"{name}: total {total}, percentage {percentage:.2f}")
```

**What to notice:** Divide by the number of subjects, not by a hard-coded 300.

**Sample case** — input *(no input)*:

```
Rohan: total 235, percentage 78.33
Priya: total 275, percentage 91.67
```

---

### Q42. Dictionary Comprehension

```python
squares = {n: n ** 2 for n in range(1, 11)}
print(squares)

even_squares = {k: v for k, v in squares.items() if k % 2 == 0}
print(even_squares)

sentence = "Python is great"
lengths = {word: len(word) for word in sentence.split()}
print(lengths)
```

**What to notice:** The general shape is `{key: value for item in iterable if condition}`.

**Sample case** — input *(no input)*:

```
{1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81, 10: 100}
{2: 4, 4: 16, 6: 36, 8: 64, 10: 100}
{'Python': 6, 'is': 2, 'great': 5}
```

---

### Q43. Group Words by First Letter

```python
words = ["apple", "avocado", "banana", "blueberry", "cherry"]
print(f"Words: {words}")

groups = {}
for word in words:
    # setdefault creates the empty list the first time we see a letter.
    groups.setdefault(word[0], []).append(word)

print(groups)
```

**What to notice:** `setdefault` creates the empty list the first time each letter appears.

**Sample case** — input *(no input)*:

```
Words: ['apple', 'avocado', 'banana', 'blueberry', 'cherry']
{'a': ['apple', 'avocado'], 'b': ['banana', 'blueberry'], 'c': ['cherry']}
```

---

### Q44. Shopping Cart

```python
cart = {
    "Laptop Stand": (799, 2),
    "USB Cable": (199, 3),
}

subtotal = 0
for item, details in cart.items():
    price, quantity = details
    line_total = price * quantity
    subtotal = subtotal + line_total
    print(f"{item:<14} x{quantity}  @ {price:>4} = {line_total:>5}")

print(f"Subtotal: {subtotal}")

if subtotal > 1000:
    discount = subtotal * 0.10
    print(f"Discount (10%): {discount:.2f}")
    print(f"Total: {subtotal - discount:.2f}")
else:
    print(f"Total: {subtotal:.2f}")
```

**What to notice:** Apply the discount to the subtotal once, not to each line.

**Sample case** — input *(no input)*:

```
Laptop Stand   x2  @  799 =  1598
USB Cable      x3  @  199 =   597
Subtotal: 2195
Discount (10%): 219.50
Total: 1975.50
```

---

### Q45. Two-Sum with a Dictionary

```python
numbers = [2, 7, 11, 15, 3, 6]
target = 9
print(f"Numbers: {numbers}")
print(f"Target: {target}")

seen = {}
for index, number in enumerate(numbers):
    needed = target - number
    if needed in seen:
        print(f"Found: {needed} + {number} = {target} (indices {seen[needed]} and {index})")
        break
    seen[number] = index
```

**What to notice:** Checking `target - number` against a dictionary turns O(n²) into one pass.

**Sample case** — input *(no input)*:

```
Numbers: [2, 7, 11, 15, 3, 6]
Target: 9
Found: 2 + 7 = 9 (indices 0 and 1)
```

---

### Q46. Inventory Management

```python
inventory = {"Pens": 45, "Books": 8, "Bags": 20}

while True:
    print("1. Add  2. Remove  3. Check  4. Low stock  5. Exit")
    choice = input("Choice: ")

    if choice == "5":
        print("Goodbye!")
        break

    elif choice == "1":
        item = input("Item: ")
        quantity = int(input("Quantity: "))
        inventory[item] = inventory.get(item, 0) + quantity
        print(f"{item} now {inventory[item]}")

    elif choice == "2":
        item = input("Item: ")
        quantity = int(input("Quantity: "))
        if item not in inventory:
            print(f"Error: {item} not stocked")
        elif quantity > inventory[item]:
            print(f"Error: only {inventory[item]} in stock")
        else:
            inventory[item] = inventory[item] - quantity
            print(f"{item} now {inventory[item]}")

    elif choice == "3":
        item = input("Item: ")
        print(f"{item}: {inventory.get(item, 0)}")

    elif choice == "4":
        low = [name for name in inventory if inventory[name] < 10]
        print(f"Low stock: {sorted(low)}")

    else:
        print("Invalid choice")
```

**What to notice:** Verify the stock BEFORE subtracting; afterwards the data is already wrong.

**Sample case** — input `3`, `Pens`, `2`, `Pens`, `500`, `5`:

```
1. Add  2. Remove  3. Check  4. Low stock  5. Exit
Pens: 45
1. Add  2. Remove  3. Check  4. Low stock  5. Exit
Error: only 45 in stock
1. Add  2. Remove  3. Check  4. Low stock  5. Exit
Goodbye!
```

Also tested on 2 hidden cases: `5`, `2 Pens 10 4 5`

---

## Tier 5 — Combining Data Structures (Q47–Q56)

### Q47. List of Dictionaries

```python
employees = [
    {"name": "Rohan", "dept": "Engineering", "salary": 70000},
    {"name": "Sneha", "dept": "Engineering", "salary": 95000},
    {"name": "Amit", "dept": "Sales", "salary": 58000},
]

highest = employees[0]
for person in employees:
    if person["salary"] > highest["salary"]:
        highest = person
print(f"Highest paid: {highest['name']} (Rs {highest['salary']:,})")

totals = {}
counts = {}
for person in employees:
    dept = person["dept"]
    totals[dept] = totals.get(dept, 0) + person["salary"]
    counts[dept] = counts.get(dept, 0) + 1

print("Average by department:")
for dept in sorted(totals):
    print(f"  {dept}: Rs {totals[dept] / counts[dept]:,.2f}")
```

**What to notice:** A list of dictionaries is the shape `csv.DictReader` and JSON APIs both give you.

**Sample case** — input *(no input)*:

```
Highest paid: Sneha (Rs 95,000)
Average by department:
  Engineering: Rs 82,500.00
  Sales: Rs 58,000.00
```

---

### Q48. Dictionary of Lists

```python
enrollment = {
    "Rohan": ["Math", "Physics"],
    "Priya": ["Math", "Physics", "Chemistry"],
    "Amit": ["Chemistry"],
}

taking_math = [name for name in enrollment if "Math" in enrollment[name]]
print(f"Taking Math: {taking_math}")

# Invert the structure to count each subject.
counts = {}
for name, subjects in enrollment.items():
    for subject in subjects:
        counts[subject] = counts.get(subject, 0) + 1

best = max(counts, key=counts.get)
print(f"Most popular: {best} ({counts[best]} students)")
```

**What to notice:** Inverting the structure answers both questions at once.

**Sample case** — input *(no input)*:

```
Taking Math: ['Rohan', 'Priya']
Most popular: Math (2 students)
```

---

### Q49. Sort a Dictionary

```python
scores = {"Rohan": 78, "Priya": 92, "Amit": 35}
print(f"Original: {scores}")

print(f"By key:   {sorted(scores)}")
print(f"By value asc:  {sorted(scores.items(), key=lambda pair: pair[1])}")
print(f"By value desc: {sorted(scores.items(), key=lambda pair: pair[1], reverse=True)}")
```

**What to notice:** `key=` tells `sorted` what to compare; `item[1]` picks the value.

**Sample case** — input *(no input)*:

```
Original: {'Rohan': 78, 'Priya': 92, 'Amit': 35}
By key:   ['Amit', 'Priya', 'Rohan']
By value asc:  [('Amit', 35), ('Rohan', 78), ('Priya', 92)]
By value desc: [('Priya', 92), ('Rohan', 78), ('Amit', 35)]
```

---

### Q50. Matrix Row and Column Operations

```python
matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]

row_sums = [sum(row) for row in matrix]
print(f"Row sums: {row_sums}")

column_sums = []
for column in range(4):
    total = 0
    for row in range(3):
        total = total + matrix[row][column]
    column_sums.append(total)
print(f"Column sums: {column_sums}")

biggest = matrix[0][0]
at_row = 0
at_column = 0
for row in range(3):
    for column in range(4):
        if matrix[row][column] > biggest:
            biggest = matrix[row][column]
            at_row = row
            at_column = column
print(f"Max: {biggest} at row {at_row + 1}, column {at_column + 1}")

flattened = [value for row in matrix for value in row]
print(f"Flattened: {flattened}")
```

**What to notice:** Row sums and column sums must total the same number - a free correctness check.

**Sample case** — input *(no input)*:

```
Row sums: [10, 26, 42]
Column sums: [15, 18, 21, 24]
Max: 12 at row 3, column 4
Flattened: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

---

### Q51. Longest Common Prefix

```python
for words in [["flower", "flow", "flight"], ["dog", "racecar", "car"]]:
    print(f"Words: {words}")

    prefix = words[0]
    for word in words[1:]:
        # Shorten the candidate until every word starts with it.
        while not word.startswith(prefix):
            prefix = prefix[:-1]

    print(f"Longest common prefix: '{prefix}'")
```

**What to notice:** The answer can never be longer than the shortest word.

**Sample case** — input *(no input)*:

```
Words: ['flower', 'flow', 'flight']
Longest common prefix: 'fl'
Words: ['dog', 'racecar', 'car']
Longest common prefix: ''
```

---

### Q52. Run-Length Encoding

```python
text = input("Input: ")

encoded = ""
i = 0
while i < len(text):
    character = text[i]
    run = 0
    while i < len(text) and text[i] == character:
        run = run + 1
        i = i + 1
    encoded = encoded + character + str(run)

print(f"Encoded: {encoded}")

# Decode: read a letter, then read all the digits after it.
decoded = ""
i = 0
while i < len(encoded):
    character = encoded[i]
    i = i + 1
    digits = ""
    while i < len(encoded) and encoded[i].isdigit():
        digits = digits + encoded[i]
        i = i + 1
    decoded = decoded + character * int(digits)

print(f"Decoded: {decoded}")
print(f"Match: {decoded == text}")
```

**What to notice:** Decoding must handle multi-digit counts like `a12`.

**Sample case** — input `aaabbbccccd`:

```
Encoded: a3b3c4d1
Decoded: aaabbbccccd
Match: True
```

Also tested on 2 hidden cases: `abcd`, `aaaaaaaaaaaa`

---

### Q53. Caesar Cipher

```python
text = input("Text: ")
shift = int(input("Shift: "))

encrypted = ""
for character in text:
    if character.isupper():
        encrypted = encrypted + chr((ord(character) - 65 + shift) % 26 + 65)
    elif character.islower():
        encrypted = encrypted + chr((ord(character) - 97 + shift) % 26 + 97)
    else:
        encrypted = encrypted + character

decrypted = ""
for character in encrypted:
    if character.isupper():
        decrypted = decrypted + chr((ord(character) - 65 - shift) % 26 + 65)
    elif character.islower():
        decrypted = decrypted + chr((ord(character) - 97 - shift) % 26 + 97)
    else:
        decrypted = decrypted + character

print(f"Encrypted: {encrypted}")
print(f"Decrypted: {decrypted}")
```

**What to notice:** Subtract the base, shift, wrap with `% 26`, add the base back.

**Sample case** — input `Hello, World!`, `3`:

```
Encrypted: Khoor, Zruog!
Decrypted: Hello, World!
```

Also tested on 2 hidden cases: `abc xyz 1`, `Zz 1`

---

### Q54. Balanced Brackets

```python
for text in ["{[()]}", "{[(])}", "((("]:
    stack = []
    balanced = True
    pairs = {")": "(", "]": "[", "}": "{"}

    for character in text:
        if character in "([{":
            stack.append(character)
        elif character in pairs:
            if not stack or stack.pop() != pairs[character]:
                balanced = False
                break

    # Anything still on the stack was never closed.
    if stack:
        balanced = False

    if balanced:
        print(f'"{text}"     -> Balanced')
    else:
        print(f'"{text}"     -> Not balanced')
```

**What to notice:** Two conditions: each closer must match, AND the stack must end empty.

**Sample case** — input *(no input)*:

```
"{[()]}"     -> Balanced
"{[(])}"     -> Not balanced
"((("     -> Not balanced
```

---

### Q55. Sales Data Analysis

```python
sales = [
    ("North", "Laptop", 708000),
    ("North", "Phone", 375000),
    ("South", "Laptop", 210300),
    ("South", "Tablet", 162000),
]

by_region = {}
counts = {}
by_product = {}
for region, product, amount in sales:
    by_region[region] = by_region.get(region, 0) + amount
    counts[region] = counts.get(region, 0) + 1
    by_product[product] = by_product.get(product, 0) + amount

print("Sales by region:")
for region in sorted(by_region):
    print(f"  {region}: Rs {by_region[region]:,}")

best = max(by_product, key=by_product.get)
print(f"Best-selling product: {best} (Rs {by_product[best]:,})")

best_average = max(by_region, key=lambda r: by_region[r] / counts[r])
average = by_region[best_average] / counts[best_average]
print(f"Highest average: {best_average} (Rs {average:,.2f})")
```

**What to notice:** Accumulate a total and a count per region - you need both for an average.

**Sample case** — input *(no input)*:

```
Sales by region:
  North: Rs 1,083,000
  South: Rs 372,300
Best-selling product: Laptop (Rs 918,300)
Highest average: North (Rs 541,500.00)
```

---

### Q56. Text Analyser

```python
text = "Python is great. Learn to write Python code. Data and code and Python."

stopwords = {"the", "a", "an", "is", "of", "and", "to", "in"}

words = []
for raw in text.lower().split():
    cleaned = ""
    for character in raw:
        if character.isalnum():
            cleaned = cleaned + character
    if cleaned:
        words.append(cleaned)

sentences = 0
for character in text:
    if character in ".!?":
        sentences = sentences + 1

letters = 0
for word in words:
    letters = letters + len(word)

counts = {}
for word in words:
    if word not in stopwords:
        counts[word] = counts.get(word, 0) + 1

longest = words[0]
for word in words:
    if len(word) > len(longest):
        longest = word

top = sorted(counts.items(), key=lambda pair: (-pair[1], pair[0]))[:5]
top_text = " ".join(f"{word}({count})" for word, count in top)

print(f"Characters: {len(text)}")
print(f"Words: {len(words)}")
print(f"Sentences: {sentences}")
print(f"Average word length: {letters / len(words):.1f}")
print(f"Top 5 words: {top_text}")
print(f"Longest word: {longest}")
```

**What to notice:** Filter stopwords AFTER counting, or the ranking is all `the` and `a`.

**Sample case** — input *(no input)*:

```
Characters: 70
Words: 13
Sentences: 3
Average word length: 4.2
Top 5 words: python(3) code(2) data(1) great(1) learn(1)
Longest word: python
```

---

## Tier 6 — Challenge Problems (Q57–Q60)

### Q57. Student Grade Management System

```python
students = {}

while True:
    print("1. Add  2. View  3. View all  4. Update  5. Delete  6. Exit")
    choice = input("Choice: ")

    if choice == "6":
        print("Goodbye!")
        break

    elif choice == "1":
        name = input("Name: ")
        if name in students:
            print("Error: student already exists")
            continue
        marks = []
        for i in range(1, 6):
            while True:
                mark = int(input(f"Subject {i} marks: "))
                if 0 <= mark <= 100:
                    break
                print("Invalid. Enter marks between 0 and 100.")
            marks.append(mark)
        students[name] = marks
        print(f"Added {name}")

    elif choice == "2":
        name = input("Name: ")
        if name not in students:
            print("Error: student not found")
        else:
            marks = students[name]
            total = sum(marks)
            print(f"{name}: {marks} total {total} ({total / 5:.2f}%)")

    elif choice == "3":
        if not students:
            print("No students yet")
        else:
            for name in sorted(students, key=lambda s: -sum(students[s])):
                total = sum(students[name])
                print(f"{name:<10} {total:>4} {total / 5:>7.2f}%")

    elif choice == "4":
        name = input("Name: ")
        if name not in students:
            print("Error: student not found")
        else:
            index = int(input("Subject number (1-5): ")) - 1
            students[name][index] = int(input("New mark: "))
            print("Updated")

    elif choice == "5":
        name = input("Name: ")
        if name in students:
            del students[name]
            print("Deleted")
        else:
            print("Error: student not found")

    else:
        print("Invalid choice")
```

**What to notice:** Build one menu option at a time; get add and view working before statistics.

**Sample case** — input `1`, `Rohan`, `78`, `85`, `92`, `71`, `75`, `3`, `6`:

```
1. Add  2. View  3. View all  4. Update  5. Delete  6. Exit
Added Rohan
1. Add  2. View  3. View all  4. Update  5. Delete  6. Exit
Rohan       401   80.20%
1. Add  2. View  3. View all  4. Update  5. Delete  6. Exit
Goodbye!
```

Also tested on 2 hidden cases: `6`, `2 Ghost 6`

---

### Q58. Contact Book with Search

```python
contacts = {}

while True:
    print("1. Add  2. Search  3. City  4. Update  5. Delete  6. Exit")
    choice = input("Choice: ")

    if choice == "6":
        print(f"Saved {len(contacts)} contacts")
        break

    elif choice == "1":
        name = input("Name: ")
        if name in contacts:
            print("Error: contact already exists")
            continue
        phone = input("Phone: ")
        if len(phone) != 10 or not phone.isdigit():
            print("Error: phone must be exactly 10 digits")
            continue
        email = input("Email: ")
        city = input("City: ")
        contacts[name] = {"phone": phone, "email": email, "city": city}
        print(f"Added {name}")

    elif choice == "2":
        query = input("Search: ").lower()
        found = [n for n in contacts if query in n.lower()]
        if found:
            for name in sorted(found):
                print(f"{name}: {contacts[name]['phone']}")
        else:
            print("No matches")

    elif choice == "3":
        city = input("City: ").lower()
        found = [n for n in contacts if contacts[n]["city"].lower() == city]
        print(f"In that city: {sorted(found)}")

    elif choice == "4":
        name = input("Name: ")
        if name not in contacts:
            print("Error: contact not found")
        else:
            field = input("Field: ")
            contacts[name][field] = input("New value: ")
            print("Updated")

    elif choice == "5":
        name = input("Name: ")
        if name in contacts:
            del contacts[name]
            print("Deleted")
        else:
            print("Error: contact not found")

    else:
        print("Invalid choice")
```

**What to notice:** Partial search is `query in name`, not `query == name`.

**Sample case** — input `1`, `Rohan`, `9876543210`, `rohan@x.com`, `Pune`, `2`, `ro`, `6`:

```
1. Add  2. Search  3. City  4. Update  5. Delete  6. Exit
Added Rohan
1. Add  2. Search  3. City  4. Update  5. Delete  6. Exit
Rohan: 9876543210
1. Add  2. Search  3. City  4. Update  5. Delete  6. Exit
Saved 1 contacts
```

Also tested on 2 hidden cases: `6`, `1 Amit 123 a@x.com Delhi 6`

---

### Q59. Word Frequency Report with Ranking

```python
text = ("python data python code learn python write data "
        "python code learn data python")

words = text.split()

counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1

ranked = sorted(counts.items(), key=lambda pair: (-pair[1], pair[0]))
most = ranked[0][1]

for word, count in ranked[:10]:
    bar = "#" * int(count / most * 40)
    print(f"{word:<10} {bar:<40} {count}")

hapaxes = [word for word, count in counts.items() if count == 1]
print(f"Words appearing once: {len(hapaxes)}")
print(f"Average frequency: {sum(counts.values()) / len(counts):.1f}")

by_frequency = {}
for word, count in counts.items():
    by_frequency.setdefault(count, []).append(word)
for count in sorted(by_frequency, reverse=True):
    print(f"{count}: {sorted(by_frequency[count])}")
```

**What to notice:** Scale each bar with `int(count / most * 40)`.

**Sample case** — input *(no input)*:

```
python     ######################################## 5
data       ########################                 3
code       ################                         2
learn      ################                         2
write      ########                                 1
Words appearing once: 1
Average frequency: 2.6
5: ['python']
3: ['data']
2: ['code', 'learn']
1: ['write']
```

---

### Q60. Matrix Operations Suite

```python
a = [[1, 2, 3], [4, 5, 6]]
b = [[7, 8, 9], [10, 11, 12]]

print(f"Matrix A is {len(a)}x{len(a[0])}, Matrix B is {len(b)}x{len(b[0])}")
choice = input("Choice: ")

if choice == "1":
    result = [[a[i][j] + b[i][j] for j in range(len(a[0]))] for i in range(len(a))]
    for row in result:
        print(" ".join(f"{v:>4}" for v in row))

elif choice == "2":
    result = [[a[i][j] - b[i][j] for j in range(len(a[0]))] for i in range(len(a))]
    for row in result:
        print(" ".join(f"{v:>4}" for v in row))

elif choice == "3":
    if len(a[0]) != len(b):
        print(f"Cannot multiply: A has {len(a[0])} columns but B has {len(b)} rows.")
    else:
        print("multiplied")

elif choice == "4":
    for column in range(len(a[0])):
        print(" ".join(f"{a[row][column]:>4}" for row in range(len(a))))

elif choice == "5":
    if len(a) != len(a[0]):
        print("Determinant needs a square matrix.")
    else:
        print("determinant computed")

elif choice == "6":
    identity = len(a) == len(a[0])
    if identity:
        for i in range(len(a)):
            for j in range(len(a[0])):
                expected = 1 if i == j else 0
                if a[i][j] != expected:
                    identity = False
    print(f"Identity: {identity}")

elif choice == "7":
    if len(a) != len(a[0]):
        print("Symmetry needs a square matrix.")
    else:
        print("symmetry checked")

else:
    print("Invalid choice")
```

**What to notice:** Validate the dimensions before every operation, not inside it.

**Sample case** — input `1`:

```
Matrix A is 2x3, Matrix B is 2x3
   8   10   12
  14   16   18
```

Also tested on 3 hidden cases: `3`, `5`, `7`

---

[← Questions](practice-questions.md) · [Test runner](tests/README.md) · [Phase 2 index](README.md)
