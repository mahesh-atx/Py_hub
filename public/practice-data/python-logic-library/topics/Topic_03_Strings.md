# Topic Deep-Dive 3 — Strings (30 Questions)

**Focus:** character analysis, slicing, case conversions, string algorithms, transformations, and ciphers.

**How to practice:** Read the task, write your own code, use the hint if stuck, then check the solution.

---

## Question 1: Count uppercase letters

**What to do:** Given `text = "Hello World"`, count the uppercase letters.

**Hint:** The `isupper()` method is True only for A–Z.

**Solution:**

```python
text = "Hello World"

count = 0
for character in text:
    if character.isupper():
        count += 1

print(count)
```

**Logic:** The counting pattern with a case check. (Answer: 2)

---

## Question 2: Count lowercase letters

**What to do:** Given `text = "Hello World"`, count the lowercase letters.

**Hint:** `islower()` — but note spaces and punctuation are neither.

**Solution:**

```python
text = "Hello World"

count = 0
for character in text:
    if character.islower():
        count += 1

print(count)
```

**Logic:** Case classification is exact — only true lowercase letters count. (Answer: 8)

---

## Question 3: Count digits in a string

**What to do:** Given `text = "abc123def456"`, count how many characters are digits.

**Hint:** `isdigit()`.

**Solution:**

```python
text = "abc123def456"

count = 0
for character in text:
    if character.isdigit():
        count += 1

print(count)
```

**Logic:** The same counting skeleton, a different predicate. (Answer: 6)

---

## Question 4: Count special characters

**What to do:** Given `text = "hi@there!2026"`, count characters that are NOT letters and NOT digits.

**Hint:** Special = not `isalpha()` and not `isdigit()` (spaces usually excluded too — `not isspace()`).

**Solution:**

```python
text = "hi@there!2026"

count = 0
for character in text:
    if not character.isalpha() and not character.isdigit() and not character.isspace():
        count += 1

print(count)
```

**Logic:** Three negations define "everything else". (Answer: 2)

---

## Question 5: Count words starting with a vowel

**What to do:** Given `sentence = "apple is an orange fruit"`, count the words that start with a vowel.

**Hint:** `split()` into words, then check `word[0].lower() in "aeiou"`.

**Solution:**

```python
sentence = "apple is an orange fruit"

count = 0
for word in sentence.split():
    if word[0].lower() in "aeiou":
        count += 1

print(count)
```

**Logic:** Normalize the first letter to lowercase before comparing. (Answer: 4)

---

## Question 6: Longest word (with ties)

**What to do:** Given `sentence = "the quick brown fox jumps over the lazy dog"`, print ALL the longest words (if several tie, print each).

**Hint:** First find the maximum length, then collect every word of that length.

**Solution:**

```python
sentence = "the quick brown fox jumps over the lazy dog"

words = sentence.split()
max_length = max(len(word) for word in words)

for word in words:
    if len(word) == max_length:
        print(word)
```

**Logic:** Two passes — find the target length, then filter. (Answer: quick, brown, jumps)

---

## Question 7: Shortest word

**What to do:** With the same sentence, print the shortest word.

**Hint:** `min(words, key=len)` — or the current-best pattern with `<`.

**Solution:**

```python
sentence = "the quick brown fox jumps over the lazy dog"

words = sentence.split()

shortest = words[0]
for word in words:
    if len(word) < len(shortest):
        shortest = word

print(shortest)
```

**Logic:** The current-best pattern with length as the comparison key. (Answer: the)

---

## Question 8: Word frequency in a sentence

**What to do:** Given `sentence = "the cat and the dog and the bird"`, print a dictionary of how many times each word appears.

**Hint:** The dictionary counting pattern over `split()`.

**Solution:**

```python
sentence = "the cat and the dog and the bird"

frequency = {}
for word in sentence.split():
    if word in frequency:
        frequency[word] += 1
    else:
        frequency[word] = 1

print(frequency)
```

**Logic:** "If key exists add 1, else start at 1."

---

## Question 9: Reverse each word (keep word order)

**What to do:** Given `sentence = "hello world"`, print "olleh dlrow" — each word reversed, order kept.

**Hint:** Reverse each word with `word[::-1]`, then `join` them back.

**Solution:**

```python
sentence = "hello world"

result = " ".join(word[::-1] for word in sentence.split())

print(result)
```

**Logic:** Apply reversal per word, not per sentence.

---

## Question 10: Capitalize words without title()

**What to do:** Given `text = "python is fun"`, print "Python Is Fun" without using `title()`.

**Hint:** Split, capitalize each word with `word[0].upper() + word[1:]`, then join.

**Solution:**

```python
text = "python is fun"

result = " ".join(word[0].upper() + word[1:] for word in text.split())

print(result)
```

**Logic:** Manual capitalization teaches what `title()` does internally.

---

## Question 11: Swap case without swapcase()

**What to do:** Given `text = "Hello World"`, swap the case of every letter using a loop.

**Hint:** `"A".lower()` gives "a"; `"a".upper()` gives "A". Test with `isupper()`.

**Solution:**

```python
text = "Hello World"

result = ""
for character in text:
    if character.isupper():
        result += character.lower()
    elif character.islower():
        result += character.upper()
    else:
        result += character

print(result)
```

**Logic:** A character-by-character transformation loop.

---

## Question 12: Remove vowels from a string

**What to do:** Given `text = "beautiful"`, print the string with all vowels removed.

**Hint:** Build a new string from characters `not in "aeiou"`.

**Solution:**

```python
text = "beautiful"

result = ""
for character in text:
    if character not in "aeiou":
        result += character

print(result)
```

**Logic:** Filter + build. (Answer: "btfl")

---

## Question 13: Keep only consonants

**What to do:** Given `text = "hello world"`, print only the consonant letters (spaces and punctuation removed too).

**Hint:** `isalpha()` first, then `not in "aeiou"`.

**Solution:**

```python
text = "hello world"

result = ""
for character in text:
    if character.isalpha() and character not in "aeiou":
        result += character

print(result)
```

**Logic:** Two conditions joined by `and` — letter AND not a vowel.

---

## Question 14: Replace spaces with underscores

**What to do:** Given `text = "user name here"`, print "user_name_here" without using `replace()`.

**Hint:** Loop and swap `" "` for `"_"`.

**Solution:**

```python
text = "user name here"

result = ""
for character in text:
    if character == " ":
        result += "_"
    else:
        result += character

print(result)
```

**Logic:** A transformation loop — the manual version of `replace`.

---

## Question 15: Check if two strings differ by exactly one character

**What to do:** Given `s1 = "code"` and `s2 = "cole"`, print "Yes" if they have the same length and differ in exactly one position.

**Hint:** `zip()` the strings and count mismatches.

**Solution:**

```python
s1, s2 = "code", "cole"

if len(s1) != len(s2):
    print("No")
else:
    differences = 0
    for a, b in zip(s1, s2):
        if a != b:
            differences += 1
    if differences == 1:
        print("Yes")
    else:
        print("No")
```

**Logic:** `zip` pairs characters position by position; one mismatch = "Yes".

---

## Question 16: Print all substrings

**What to do:** Given `text = "abc"`, print every possible substring (a, ab, abc, b, bc, c).

**Hint:** Two nested loops: the start index `i` and the end index `j`, then slice `text[i:j]`.

**Solution:**

```python
text = "abc"

for i in range(len(text)):
    for j in range(i + 1, len(text) + 1):
        print(text[i:j])
```

**Logic:** Every substring is defined by a (start, end) pair — enumerate them all.

---

## Question 17: Character frequency dictionary

**What to do:** Given `text = "mississippi"`, print a dictionary counting each character.

**Hint:** The counting pattern over characters.

**Solution:**

```python
text = "mississippi"

frequency = {}
for character in text:
    if character in frequency:
        frequency[character] += 1
    else:
        frequency[character] = 1

print(frequency)
```

**Logic:** Characters are the items now — the pattern is identical.

---

## Question 18: Most frequent character

**What to do:** Given `text = "mississippi"`, print the character that appears most often.

**Hint:** Build the frequency dictionary, then find the key with the max value.

**Solution:**

```python
text = "mississippi"

frequency = {}
for character in text:
    frequency[character] = frequency.get(character, 0) + 1

most = max(frequency, key=frequency.get)
print(most)
```

**Logic:** `max` with `key=` finds the largest *by value*. (Answer: "i" or "s" — both 4)

---

## Question 19: Check if a string has all unique characters

**What to do:** Given `text = "abcdef"`, print "Unique" if no character repeats, else "Not unique".

**Hint:** Compare `len(set(text))` with `len(text)`.

**Solution:**

```python
text = "abcdef"

if len(set(text)) == len(text):
    print("Unique")
else:
    print("Not unique")
```

**Logic:** A set collapses repeats — if its size shrank, something repeated.

---

## Question 20: First non-repeating character

**What to do:** Given `text = "swiss"`, print the first character that appears only once (should be "w").

**Hint:** For each character in order, check `text.count(character) == 1`.

**Solution:**

```python
text = "swiss"

for character in text:
    if text.count(character) == 1:
        print(character)
        break
```

**Logic:** Scan left to right; the first character with count 1 wins.

---

## Question 21: Check if one string is a rotation of another

**What to do:** Given `s1 = "waterbottle"` and `s2 = "erbottlewat"`, print "Rotation" if one is a rotation of the other.

**Hint:** If `s2` is a rotation of `s1`, then `s2` is a substring of `s1 + s1`.

**Solution:**

```python
s1, s2 = "waterbottle", "erbottlewat"

if len(s1) == len(s2) and s2 in s1 + s1:
    print("Rotation")
else:
    print("Not a rotation")
```

**Logic:** Doubling the string makes every rotation appear inside it.

---

## Question 22: Count occurrences of a substring

**What to do:** Given `text = "abababa"` and `sub = "aba"`, count how many times "aba" appears (overlapping counts: 3).

**Hint:** `text.count(sub)` handles overlapping matches.

**Solution:**

```python
text = "abababa"
sub = "aba"

print(text.count(sub))
```

**Logic:** `count()` on strings counts overlapping occurrences. (Answer: 3)

---

## Question 23: Remove duplicate characters (keep order)

**What to do:** Given `text = "banana"`, print "ban" — each character only once, in first-appearance order.

**Hint:** Build a result string; add a character only if `not in result`.

**Solution:**

```python
text = "banana"

result = ""
for character in text:
    if character not in result:
        result += character

print(result)
```

**Logic:** The "add only what is new" pattern for strings.

---

## Question 24: Sort the characters of a string

**What to do:** Given `text = "python"`, print its characters sorted alphabetically as a string.

**Hint:** `"".join(sorted(text))`.

**Solution:**

```python
text = "python"

print("".join(sorted(text)))
```

**Logic:** `sorted()` returns a list of characters; `join` glues them back.

---

## Question 25: Split a string into chunks of n

**What to do:** Given `text = "abcdefghij"` and `n = 3`, print `["abc", "def", "ghi", "j"]`.

**Hint:** Slice with a step: `text[i:i+n] for i in range(0, len(text), n)`.

**Solution:**

```python
text = "abcdefghij"
n = 3

chunks = [text[i:i + n] for i in range(0, len(text), n)]

print(chunks)
```

**Logic:** Stepping by n and slicing n characters is the classic chunking idiom.

---

## Question 26: Insert a substring in the middle

**What to do:** Given `text = "abcdef"` and `sub = "XY"`, print "abcXYdef".

**Hint:** `mid = len(text) // 2`, then `text[:mid] + sub + text[mid:]`.

**Solution:**

```python
text = "abcdef"
sub = "XY"

mid = len(text) // 2

print(text[:mid] + sub + text[mid:])
```

**Logic:** Two slices around the midpoint plus the insert.

---

## Question 27: Find all words containing "@"

**What to do:** Given `text = "contact us at help@site.com or info@site.com today"`, print all words containing "@".

**Hint:** Split and filter with `"@" in word`.

**Solution:**

```python
text = "contact us at help@site.com or info@site.com today"

emails = [word for word in text.split() if "@" in word]

print(emails)
```

**Logic:** The filter pattern with a substring membership test.

---

## Question 28: snake_case → CamelCase

**What to do:** Given `text = "user_first_name"`, print "UserFirstName".

**Hint:** Split on "_", capitalize each piece, join without separators.

**Solution:**

```python
text = "user_first_name"

result = "".join(word.capitalize() for word in text.split("_"))

print(result)
```

**Logic:** `split` + `capitalize` + empty-`join` — a real-world conversion.

---

## Question 29: CamelCase → snake_case

**What to do:** Given `text = "UserFirstName"`, print "user_first_name".

**Hint:** Loop over characters; before each uppercase letter insert "_" and lowercase it.

**Solution:**

```python
text = "UserFirstName"

result = ""
for character in text:
    if character.isupper():
        result += "_" + character.lower()
    else:
        result += character

print(result.lstrip("_"))
```

**Logic:** Uppercase letters mark word boundaries — convert them to "_lower".

---

## Question 30: Caesar cipher (encrypt + decrypt)

**What to do:** Write functions to encrypt and decrypt text with a Caesar shift of 3. Encrypt "hello", then decrypt the result back.

**Hint:** Shift each letter's position in the alphabet using `ord`/`chr` and modulo 26; leave non-letters alone.

**Solution:**

```python
def caesar(text, shift):
    result = ""
    for character in text:
        if character.isalpha():
            base = ord("a") if character.islower() else ord("A")
            result += chr((ord(character) - base + shift) % 26 + base)
        else:
            result += character
    return result

encrypted = caesar("hello", 3)
print(encrypted)                    # khoor
print(caesar(encrypted, -3))        # hello
```

**Logic:** `% 26` wraps the alphabet — the core of every shift cipher.

---

## Strings recap

- **Character classification** — `isupper`, `islower`, `isdigit`, `isalpha`, `isspace` (Q1–4).
- **Word-level operations** — `split` + process + `join` (Q5–10).
- **Frequency analysis** — counting characters/words with dicts (Q8, 17–18).
- **Uniqueness tricks** — sets for unique chars, `count()` for repeats (Q19–20, 23).
- **Slicing gymnastics** — chunks, inserts, rotations (Q16, 21, 25–26).
- **Case conversions** — snake ↔ Camel (Q28–29).
- **Ciphers** — Caesar shift with `ord`/`chr` + modulo (Q30).
