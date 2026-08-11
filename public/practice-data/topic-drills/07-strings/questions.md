# Topic Drill 07 — Strings

30 focused questions on: indexing, slicing, string methods (`.upper()`, `.lower()`, `.strip()`, `.replace()`, `.split()`, `.join()`), and f-strings.

**How to run:** Read input with `input()`, process, and `print()` the result.

---

## Q1. String Length
**Difficulty:** Very Easy
**Problem:** Read a string and print its length.
**Input:** A single line.
**Output:** Print the length.
**Example:**
```
Input:
hello
Output:
5
```
**Hint:** `len(s)`.

## Q2. First Character
**Difficulty:** Very Easy
**Problem:** Read a string and print its first character.
**Input:** A single line.
**Output:** Print `s[0]`.
**Example:**
```
Input:
Python
Output:
P
```
**Hint:** Index 0.

## Q3. Last Character
**Difficulty:** Very Easy
**Problem:** Read a string and print its last character.
**Input:** A single line.
**Output:** Print `s[-1]`.
**Example:**
```
Input:
Python
Output:
n
```
**Hint:** Negative indexing.

## Q4. Uppercase
**Difficulty:** Very Easy
**Problem:** Read a string and print it in uppercase.
**Input:** A single line.
**Output:** Print `s.upper()`.
**Example:**
```
Input:
hello
Output:
HELLO
```
**Hint:** Use `.upper()`.

## Q5. Lowercase
**Difficulty:** Very Easy
**Problem:** Read a string and print it in lowercase.
**Input:** A single line.
**Output:** Print `s.lower()`.
**Example:**
```
Input:
WORLD
Output:
world
```
**Hint:** Use `.lower()`.

## Q6. Strip Whitespace
**Difficulty:** Easy
**Problem:** Read a string that may have leading/trailing spaces and print it stripped.
**Input:** A single line.
**Output:** Print `s.strip()`.
**Example:**
```
Input:
  hi  
Output:
hi
```
**Hint:** Use `.strip()`.

## Q7. Replace a Character
**Difficulty:** Easy
**Problem:** Read a string and a character, and print the string with all spaces replaced by that character.
**Input:** Line 1: string. Line 2: character.
**Output:** The replaced string.
**Example:**
```
Input:
a b c
-
Output:
a-b-c
```
**Hint:** `s.replace(" ", ch)`.

## Q8. Split a String
**Difficulty:** Easy
**Problem:** Read a sentence and print the list of words from `.split()`.
**Input:** A single line.
**Output:** Print the list.
**Example:**
```
Input:
hello world
Output:
['hello', 'world']
```
**Hint:** `s.split()`.

## Q9. Join a List of Words
**Difficulty:** Easy
**Problem:** Read a line of space-separated words and print them joined by ` - `.
**Input:** A single line.
**Output:** The joined string.
**Example:**
```
Input:
a b c
Output:
a - b - c
```
**Hint:** `" - ".join(words)`.

## Q10. Slice First Three Characters
**Difficulty:** Easy
**Problem:** Read a string (length ≥3) and print its first three characters.
**Input:** A single line.
**Output:** Print `s[:3]`.
**Example:**
```
Input:
Python
Output:
Pyt
```
**Hint:** Slice from 0 to 3.

## Q11. Slice Last Three Characters
**Difficulty:** Easy
**Problem:** Read a string (length ≥3) and print its last three characters.
**Input:** A single line.
**Output:** Print `s[-3:]`.
**Example:**
```
Input:
Python
Output:
hon
```
**Hint:** Negative slice.

## Q12. Reverse a String
**Difficulty:** Easy
**Problem:** Read a string and print it reversed.
**Input:** A single line.
**Output:** Print `s[::-1]`.
**Example:**
```
Input:
hello
Output:
olleh
```
**Hint:** Slice with step `-1`.

## Q13. Remove First and Last Characters
**Difficulty:** Easy
**Problem:** Read a string (length ≥2) and print it without its first and last characters.
**Input:** A single line.
**Output:** Print `s[1:-1]`.
**Example:**
```
Input:
hello
Output:
ell
```
**Hint:** Slice from 1 to -1.

## Q14. Check Palindrome
**Difficulty:** Medium
**Problem:** Read a string and print `Palindrome` if it equals its reverse.
**Input:** A single line.
**Output:** `Palindrome` or `Not palindrome`.
**Example:**
```
Input:
madam
Output:
Palindrome
```
**Hint:** Compare `s` with `s[::-1]`.

## Q15. Count a Character
**Difficulty:** Easy
**Problem:** Read a string and a character, and print how many times the character appears.
**Input:** Line 1: string. Line 2: character.
**Output:** The count.
**Example:**
```
Input:
banana
a
Output:
3
```
**Hint:** `s.count(ch)`.

## Q16. Middle Character(s)
**Difficulty:** Medium
**Problem:** Read a string and print its middle character (if odd length) or the two middle characters (if even length).
**Input:** A single line.
**Output:** The middle.
**Example:**
```
Input:
hello
Output:
l
```
**Hint:** Use `len(s) // 2` and slicing.

## Q17. Every Other Character
**Difficulty:** Easy
**Problem:** Read a string and print every other character (indices 0, 2, 4, ...).
**Input:** A single line.
**Output:** Print `s[::2]`.
**Example:**
```
Input:
abcdef
Output:
ace
```
**Hint:** Step of 2.

## Q18. Replace a Word
**Difficulty:** Medium
**Problem:** Read a sentence and two words, and print the sentence with `word1` replaced by `word2`.
**Input:** Three lines: sentence, word1, word2.
**Output:** The updated sentence.
**Example:**
```
Input:
I like apples
apples
mangoes
Output:
I like mangoes
```
**Hint:** `s.replace(word1, word2)`.

## Q19. Count Words
**Difficulty:** Easy
**Problem:** Read a sentence and print the number of words.
**Input:** A single line.
**Output:** The word count.
**Example:**
```
Input:
Hello world of Python
Output:
4
```
**Hint:** `len(s.split())`.

## Q20. Uppercase First Letter of Each Word
**Difficulty:** Medium
**Problem:** Read a sentence and print it with each word's first letter capitalized.
**Input:** A single line.
**Output:** The transformed sentence.
**Example:**
```
Input:
the quick brown fox
Output:
The Quick Brown Fox
```
**Hint:** `w[0].upper() + w[1:]` per word, then join.

## Q21. Reverse Each Word
**Difficulty:** Medium
**Problem:** Read a sentence and print each word reversed, keeping word order.
**Input:** A single line.
**Output:** The transformed sentence.
**Example:**
```
Input:
hello world
Output:
olleh dlrow
```
**Hint:** Reverse each word with `w[::-1]`.

## Q22. First Letter of Each Word
**Difficulty:** Medium
**Problem:** Read a sentence and print the first letter of each word concatenated.
**Input:** A single line.
**Output:** The initials string.
**Example:**
```
Input:
Hello World Of Python
Output:
HWOP
```
**Hint:** `w[0]` for each word.

## Q23. Check if Starts and Ends With Same Character
**Difficulty:** Easy
**Problem:** Read a string and print `Yes` if its first and last characters are the same.
**Input:** A single line.
**Output:** `Yes` or `No`.
**Example:**
```
Input:
madam
Output:
Yes
```
**Hint:** Compare `s[0]` and `s[-1]`.

## Q24. Count Vowels
**Difficulty:** Medium
**Problem:** Read a string and print the number of vowels (`aeiou`, case-insensitive).
**Input:** A single line.
**Output:** The count.
**Example:**
```
Input:
Hello
Output:
2
```
**Hint:** Loop and check membership in `"aeiou"`.

## Q25. Split on a Specific Character
**Difficulty:** Medium
**Problem:** Read a line like `apple,banana,cherry` and print the list from splitting on commas.
**Input:** A single line.
**Output:** Print the list.
**Example:**
```
Input:
apple,banana
Output:
['apple', 'banana']
```
**Hint:** `s.split(",")`.

## Q26. Strip and Uppercase
**Difficulty:** Easy
**Problem:** Read a string with surrounding spaces, strip it, then uppercase it, and print.
**Input:** A single line.
**Output:** The transformed string.
**Example:**
```
Input:
  hi  
Output:
HI
```
**Hint:** `s.strip().upper()`.

## Q27. Extract Digits
**Difficulty:** Medium
**Problem:** Read a string and print a new string with only its digit characters.
**Input:** A single line.
**Output:** The digits-only string.
**Example:**
```
Input:
a1b2c3
Output:
123
```
**Hint:** Loop and keep characters that are digits.

## Q28. Remove Vowels
**Difficulty:** Medium
**Problem:** Read a string and print it with all vowels removed.
**Input:** A single line.
**Output:** The vowel-free string.
**Example:**
```
Input:
hello
Output:
hll
```
**Hint:** Keep only non-vowels.

## Q29. Word Lengths
**Difficulty:** Medium
**Problem:** Read a sentence and print each word followed by its length.
**Input:** A single line.
**Output:** `word: length` per line.
**Example:**
```
Input:
hi there
Output:
hi: 2
there: 5
```
**Hint:** Loop over `.split()` and use `len(w)`.

## Q30. Reverse the Order of Words
**Difficulty:** Medium
**Problem:** Read a sentence and print the words in reverse order.
**Input:** A single line.
**Output:** The reversed-order sentence.
**Example:**
```
Input:
I love Python
Output:
Python love I
```
**Hint:** Split, reverse the list, join.
