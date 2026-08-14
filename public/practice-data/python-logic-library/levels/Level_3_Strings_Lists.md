# Level 3 — Strings + Lists (30 Questions)

**What this level teaches:** slicing, `split()`/`join()`, string methods (`isalpha`, `isdigit`, `title`, `replace`), list operations (`append`, `sort`, `in`), and classic problems: longest word, anagrams, common elements, removing duplicates.

**Total questions:** 30

> Write your own code first, then check the solution.

---

## Question 1: Reverse a string with slicing

**What to do:** Given `text = "python"`, print its reverse using slicing (no loop this time).

**Hint:** `text[::-1]` walks through the string backwards.

**Solution:**

```python
text = "python"

print(text[::-1])
```

**Logic:** Slice syntax `[start:stop:step]` — a step of `-1` means "go backwards".

---

## Question 2: Count letters in a string

**What to do:** Given `text = "Hello, World!"`, count only the letters (ignore spaces and punctuation) and print the count.

**Hint:** Loop over characters and check `character.isalpha()`.

**Solution:**

```python
text = "Hello, World!"

count = 0
for character in text:
    if character.isalpha():
        count += 1

print(count)
```

**Logic:** `isalpha()` is True only for letters a–z / A–Z. (Answer: 10)

---

## Question 3: Count vowels and consonants

**What to do:** Given `text = "hello world"`, print the number of vowels and the number of consonants separately.

**Hint:** Two counters; test `character.isalpha()` first, then `in "aeiou"`.

**Solution:**

```python
text = "hello world"

vowels = 0
consonants = 0

for character in text:
    if character.isalpha():
        if character in "aeiou":
            vowels += 1
        else:
            consonants += 1

print("Vowels:", vowels)
print("Consonants:", consonants)
```

**Logic:** Classify each letter into exactly one of two boxes.

---

## Question 4: Palindrome (ignoring case and spaces)

**What to do:** Given `text = "A man a plan a canal Panama"`, check if it is a palindrome ignoring spaces and letter case.

**Hint:** First *clean* the text: lowercase it and keep only letters. Then compare with its reverse.

**Solution:**

```python
text = "A man a plan a canal Panama"

clean = ""
for character in text.lower():
    if character.isalpha():
        clean = clean + character

if clean == clean[::-1]:
    print("Palindrome")
else:
    print("Not palindrome")
```

**Logic:** Normalize the input first, then the plain palindrome check works.

---

## Question 5: Find the longest word

**What to do:** Given `sentence = "The quick brown fox jumps"`, print the longest word.

**Hint:** `sentence.split()` turns the sentence into a list of words. Then use the "current best" pattern with `len()`.

**Solution:**

```python
sentence = "The quick brown fox jumps"

words = sentence.split()

longest = ""
for word in words:
    if len(word) > len(longest):
        longest = word

print(longest)
```

**Logic:** Split → compare lengths → keep the biggest. (Answer: "quick")

---

## Question 6: Find repeated characters

**What to do:** Given `text = "programming"`, print each character that appears more than once (print each one only once).

**Hint:** Keep two strings: one of characters seen, one of duplicates already reported.

**Solution:**

```python
text = "programming"

seen = ""
repeated = ""

for character in text:
    if character in seen and character not in repeated:
        repeated = repeated + character
    seen = seen + character

print("Repeated characters:", repeated)
```

**Logic:** Second time you meet a character → it's a duplicate. The `repeated` list prevents double-reporting.

---

## Question 7: Find common elements of two lists

**What to do:** Given `list1 = [1, 2, 3, 4, 5]` and `list2 = [4, 5, 6, 7, 8]`, print the elements that appear in both.

**Hint:** Loop over one list and check `if item in list2`.

**Solution:**

```python
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]

common = []
for item in list1:
    if item in list2 and item not in common:
        common.append(item)

print(common)
```

**Logic:** The `in` operator tests membership; the extra check avoids duplicates in the result.

---

## Question 8: Remove duplicates from a list (keep order)

**What to do:** Given `numbers = [1, 2, 2, 3, 4, 4, 5]`, produce `[1, 2, 3, 4, 5]` while keeping the original order.

**Hint:** Build a new list, appending an item only if it is not already there.

**Solution:**

```python
numbers = [1, 2, 2, 3, 4, 4, 5]

result = []
for number in numbers:
    if number not in result:
        result.append(number)

print(result)
```

**Logic:** "Add only what is new" — a building pattern that preserves order.

---

## Question 9: Sort a list ascending

**What to do:** Given `numbers = [42, 7, 19, 3, 88]`, print the list sorted from smallest to largest.

**Hint:** Use `sorted(numbers)` (returns a new list) or `numbers.sort()` (changes the list itself).

**Solution:**

```python
numbers = [42, 7, 19, 3, 88]

print(sorted(numbers))

# Or in-place:
# numbers.sort()
# print(numbers)
```

**Logic:** Python sorts for you — the skill is knowing when to use each version.

---

## Question 10: Sort a list descending

**What to do:** Given `numbers = [42, 7, 19, 3, 88]`, print the list sorted from largest to smallest.

**Hint:** Add `reverse=True`.

**Solution:**

```python
numbers = [42, 7, 19, 3, 88]

print(sorted(numbers, reverse=True))
```

**Logic:** The same tool, flipped direction.

---

## Question 11: Search for a value in a list

**What to do:** Given `numbers = [10, 25, 40, 55, 70]` and `target = 40`, print "Found at index X" or "Not found".

**Hint:** Use `if target in numbers` for the check and `numbers.index(target)` for the position — or loop with a flag.

**Solution:**

```python
numbers = [10, 25, 40, 55, 70]
target = 40

found = False
for i in range(len(numbers)):
    if numbers[i] == target:
        print("Found at index", i)
        found = True
        break

if not found:
    print("Not found")
```

**Logic:** The search pattern from Level 1, upgraded with a `found` flag for the "not found" case.

---

## Question 12: Largest and smallest in one pass

**What to do:** Given `numbers = [34, 12, 89, 5, 61]`, print both the largest and the smallest value using a single loop.

**Hint:** Maintain two "current best" variables at once.

**Solution:**

```python
numbers = [34, 12, 89, 5, 61]

largest = numbers[0]
smallest = numbers[0]

for number in numbers:
    if number > largest:
        largest = number
    if number < smallest:
        smallest = number

print("Largest:", largest)
print("Smallest:", smallest)
```

**Logic:** Two independent `if`s — a number can update either variable (or both).

---

## Question 13: Sum of list elements

**What to do:** Given `numbers = [5, 10, 15, 20]`, print the sum using a loop, and again using `sum()`.

**Hint:** `sum(numbers)` is the built-in shortcut.

**Solution:**

```python
numbers = [5, 10, 15, 20]

total = 0
for number in numbers:
    total += number

print("Loop:", total)
print("Built-in:", sum(numbers))
```

**Logic:** Know both ways — the loop teaches the idea, `sum()` is what you'll use in real code.

---

## Question 14: Average of a list

**What to do:** Given `numbers = [10, 20, 35, 45]`, print the average.

**Hint:** `sum(numbers) / len(numbers)`.

**Solution:**

```python
numbers = [10, 20, 35, 45]

average = sum(numbers) / len(numbers)

print(average)
```

**Logic:** Total divided by count. (Answer: 27.5)

---

## Question 15: Count occurrences of an element

**What to do:** Given `numbers = [4, 7, 4, 9, 4, 2]` and `target = 4`, count how many times 4 appears.

**Hint:** Either loop and count, or use the built-in `numbers.count(target)`.

**Solution:**

```python
numbers = [4, 7, 4, 9, 4, 2]
target = 4

count = 0
for number in numbers:
    if number == target:
        count += 1

print(count)
print(numbers.count(target))  # built-in shortcut
```

**Logic:** The counting pattern again — and the built-in that does it in one call.

---

## Question 16: Concatenate two lists

**What to do:** Given `list1 = [1, 2, 3]` and `list2 = [4, 5, 6]`, create the combined list `[1, 2, 3, 4, 5, 6]` in two different ways.

**Hint:** `list1 + list2` makes a new list; `list1.extend(list2)` changes `list1` itself.

**Solution:**

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

combined = list1 + list2
print(combined)

list1.extend(list2)
print(list1)
```

**Logic:** `+` builds a new list; `extend` modifies the existing one. Know the difference.

---

## Question 17: First and last elements

**What to do:** Given `numbers = [10, 20, 30, 40, 50]`, print the first and the last element.

**Hint:** Index `0` for the first, index `-1` for the last.

**Solution:**

```python
numbers = [10, 20, 30, 40, 50]

print("First:", numbers[0])
print("Last:", numbers[-1])
```

**Logic:** Negative indexes count from the end — `-1` is always the last item.

---

## Question 18: Check if a list is empty

**What to do:** Given `numbers = []`, print "Empty" if it has no elements, otherwise "Not empty".

**Hint:** An empty list is "falsy" — `if not numbers:` works, or use `len(numbers) == 0`.

**Solution:**

```python
numbers = []

if not numbers:
    print("Empty")
else:
    print("Not empty")
```

**Logic:** Empty lists (and strings) act like `False` in a condition.

---

## Question 19: Merge two lists alternately

**What to do:** Given `list1 = [1, 3, 5]` and `list2 = [2, 4, 6, 8, 10]`, build `[1, 2, 3, 4, 5, 6, 8, 10]` — one item from each list in turn, appending the leftovers of the longer list.

**Hint:** Loop up to `max(len(list1), len(list2))` and guard each append with an index check.

**Solution:**

```python
list1 = [1, 3, 5]
list2 = [2, 4, 6, 8, 10]

merged = []
max_len = max(len(list1), len(list2))

for i in range(max_len):
    if i < len(list1):
        merged.append(list1[i])
    if i < len(list2):
        merged.append(list2[i])

print(merged)
```

**Logic:** Index-guards stop you from reading past the end of the shorter list.

---

## Question 20: Swap first and last elements

**What to do:** Given `numbers = [1, 2, 3, 4, 5]`, swap the first and last elements so the list becomes `[5, 2, 3, 4, 1]`.

**Hint:** Python can swap two variables in one line: `a, b = b, a`.

**Solution:**

```python
numbers = [1, 2, 3, 4, 5]

numbers[0], numbers[-1] = numbers[-1], numbers[0]

print(numbers)
```

**Logic:** Tuple-style assignment swaps values without a temporary variable.

---

## Question 21: Count even and odd numbers in a list

**What to do:** Given `numbers = [3, 8, 11, 14, 17, 20]`, print how many are even and how many are odd.

**Hint:** Two counters and the `% 2` test.

**Solution:**

```python
numbers = [3, 8, 11, 14, 17, 20]

even = 0
odd = 0

for number in numbers:
    if number % 2 == 0:
        even += 1
    else:
        odd += 1

print("Even:", even)
print("Odd:", odd)
```

**Logic:** Every number lands in exactly one of the two counters.

---

## Question 22: Change letter case

**What to do:** Given `text = "Hello World"`, print it in all uppercase, all lowercase, and with the case of every letter swapped.

**Hint:** `upper()`, `lower()`, `swapcase()`.

**Solution:**

```python
text = "Hello World"

print(text.upper())
print(text.lower())
print(text.swapcase())
```

**Logic:** String methods return a *new* string — the original `text` is unchanged.

---

## Question 23: Count words in a sentence

**What to do:** Given `sentence = "Python is fun to learn"`, print the number of words (should be 5).

**Hint:** `split()` breaks on spaces; `len()` counts the pieces.

**Solution:**

```python
sentence = "Python is fun to learn"

words = sentence.split()

print(len(words))
```

**Logic:** Word count = length of the split list.

---

## Question 24: Check if two strings are anagrams

**What to do:** Given `word1 = "listen"` and `word2 = "silent"`, print "Anagrams" if they contain the same letters, else "Not anagrams".

**Hint:** Sort the characters of both strings and compare: `sorted(word1) == sorted(word2)`.

**Solution:**

```python
word1 = "listen"
word2 = "silent"

if sorted(word1) == sorted(word2):
    print("Anagrams")
else:
    print("Not anagrams")
```

**Logic:** Anagrams become identical when their letters are sorted.

---

## Question 25: Capitalize the first letter of each word

**What to do:** Given `text = "python is fun"`, print "Python Is Fun".

**Hint:** Use the string method `title()`.

**Solution:**

```python
text = "python is fun"

print(text.title())
```

**Logic:** `title()` capitalizes the first letter of every word.

---

## Question 26: Remove spaces from a string

**What to do:** Given `text = "a b c d"`, print "abcd".

**Hint:** `text.replace(" ", "")` — or loop and skip spaces.

**Solution:**

```python
text = "a b c d"

print(text.replace(" ", ""))

# Loop version:
result = ""
for character in text:
    if character != " ":
        result += character
print(result)
```

**Logic:** `replace` swaps every space for an empty string, effectively deleting them.

---

## Question 27: Extract digits from a string

**What to do:** Given `text = "abc123def456"`, print only the digits: "123456".

**Hint:** Loop over characters and keep the ones where `character.isdigit()` is True.

**Solution:**

```python
text = "abc123def456"

digits = ""
for character in text:
    if character.isdigit():
        digits += character

print(digits)
```

**Logic:** A filter that builds a new string from the passing characters.

---

## Question 28: Check if a string is only digits

**What to do:** Given `text = "12345"`, print "Only digits" or "Not only digits".

**Hint:** `text.isdigit()` returns True only if every character is a digit.

**Solution:**

```python
text = "12345"

if text.isdigit():
    print("Only digits")
else:
    print("Not only digits")
```

**Logic:** One built-in check replaces a whole loop — but you already know how the loop would look.

---

## Question 29: Elements at even indexes

**What to do:** Given `numbers = [10, 20, 30, 40, 50, 60]`, print the elements at even indexes: 10, 30, 50.

**Hint:** Slicing with a step: `numbers[::2]`.

**Solution:**

```python
numbers = [10, 20, 30, 40, 50, 60]

print(numbers[::2])
```

**Logic:** Step 2 skips every second element, starting from index 0.

---

## Question 30: Reverse the words in a sentence

**What to do:** Given `sentence = "hello world python"`, print the words in reverse order: "python world hello".

**Hint:** `split()` the sentence, then use `" ".join(...)` with a reversed list of words.

**Solution:**

```python
sentence = "hello world python"

words = sentence.split()

reversed_sentence = " ".join(words[::-1])

print(reversed_sentence)
```

**Logic:** Split into words, reverse the *list* (not the letters), then join with spaces.

---

## Level 3 recap — what you now know

- **Slicing** — `text[::-1]`, `numbers[::2]` (Q1, Q29).
- **`split()` and `join()`** — the two most important string↔list converters (Q5, Q23, Q30).
- **String methods** — `isalpha`, `isdigit`, `upper/lower`, `title`, `replace` (Q2–4, Q22, Q25–28).
- **List methods** — `append`, `extend`, `count`, `index`, `sort`, `sorted` (Q7–16).
- **Building new lists** — remove duplicates, merge alternately, common elements (Q7–8, Q19).
- **Normalize before comparing** — cleaning text before a palindrome/anagram check (Q4, Q24).
