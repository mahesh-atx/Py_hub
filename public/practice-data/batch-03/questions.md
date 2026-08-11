# Batch 3 — Python Fundamentals

## Topics Covered
- Variables
- Data Types
- Operators
- Input and Output
- Conditions
- Loops
- **Strings** (indexing, slicing, methods: `.upper()`, `.lower()`, `.strip()`, `.replace()`, `.split()`, `.join()`, f-strings)
- **Lists** (creating, indexing/slicing, `.append()`, `.insert()`, `.remove()`, `.pop()`, `.sort()`, `.reverse()`, looping)

> **Rules for this batch:** All earlier topics continue. **Strings** and **Lists** are the two new topics, introduced gradually. Do **not** use tuples, sets, dictionaries, or functions.

**How to run:** Read input with `input()`, process, and `print()`.

---

## Q201. Print Each Character of a String

**Difficulty:** Very Easy

**Learning Objective:** Loop over the characters of a string.

**Problem:** Write a program that reads a string and prints each of its characters on a separate line.

**Input:** A single line containing a string `s`.

**Output:** Print each character of `s`, one per line.

**Constraints:**
- `1 <= len(s) <= 100`

**Example:**
```
Input:
hi

Output:
h
i
```
**Explanation:** The characters of "hi" are printed one per line.

**Hint:** `for ch in s:` iterates over characters.

---

## Q202. Length of a String

**Difficulty:** Very Easy

**Learning Objective:** Use `len()` to find the number of characters in a string.

**Problem:** Write a program that reads a string and prints its length (number of characters).

**Input:** A single line containing a string `s`.

**Output:** Print a single integer equal to `len(s)`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
hello

Output:
5
```
**Explanation:** "hello" has 5 characters.

**Hint:** `len(s)` gives the length.

---

## Q203. Uppercase a String

**Difficulty:** Very Easy

**Learning Objective:** Use the `.upper()` method to convert a string to uppercase.

**Problem:** Write a program that reads a string and prints it in all uppercase letters.

**Input:** A single line containing a string `s`.

**Output:** Print `s.upper()`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
hello world

Output:
HELLO WORLD
```
**Explanation:** All characters are converted to uppercase.

**Hint:** `s.upper()`.

---

## Q204. Lowercase a String

**Difficulty:** Very Easy

**Learning Objective:** Use `.lower()` to convert a string to lowercase.

**Problem:** Write a program that reads a string and prints it in all lowercase letters.

**Input:** A single line containing a string `s`.

**Output:** Print `s.lower()`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
HELLO

Output:
hello
```
**Explanation:** All characters are converted to lowercase.

**Hint:** `s.lower()`.

---

## Q205. First Character of a String

**Difficulty:** Very Easy

**Learning Objective:** Access the first character using index 0.

**Problem:** Write a program that reads a string and prints its first character.

**Input:** A single line containing a string `s` with at least one character.

**Output:** Print `s[0]`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
Python

Output:
P
```
**Explanation:** The first character of "Python" is "P".

**Hint:** Strings are zero-indexed; `s[0]` is the first character.

---

## Q206. Last Character of a String

**Difficulty:** Very Easy

**Learning Objective:** Access the last character using a negative index.

**Problem:** Write a program that reads a string and prints its last character.

**Input:** A single line containing a string `s` with at least one character.

**Output:** Print `s[-1]`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
Python

Output:
n
```
**Explanation:** The last character of "Python" is "n".

**Hint:** Negative indexing counts from the end; `s[-1]` is the last character.

---

## Q207. String of a Given Length, Repeated

**Difficulty:** Very Easy

**Learning Objective:** Repeat a string with the `*` operator.

**Problem:** Write a program that reads a string `s` and an integer `n`, then prints `s` repeated `n` times.

**Input:** Two lines: `s` (a `str`), then `n` (an `int`).

**Output:** Print `s * n`.

**Constraints:**
- `1 <= n <= 10`

**Example:**
```
Input:
ab
3

Output:
ababab
```
**Explanation:** "ab" repeated 3 times is "ababab".

**Hint:** `s * n` repeats a string.

---

## Q208. First Half of a String

**Difficulty:** Very Easy

**Learning Objective:** Slice the first half of a string.

**Problem:** Write a program that reads a string of even length and prints the first half of it.

**Input:** A single line containing a string `s` of even length.

**Output:** Print the first `len(s) // 2` characters.

**Constraints:**
- `2 <= len(s) <= 1000`
- `len(s)` is even.

**Example:**
```
Input:
abcd

Output:
ab
```
**Explanation:** The first half of "abcd" is "ab".

**Hint:** `s[:len(s) // 2]`.

---

## Q209. Count of a Character in a String

**Difficulty:** Very Easy

**Learning Objective:** Count occurrences of a specific character using a loop.

**Problem:** Write a program that reads a string and a character, then prints how many times that character appears in the string.

**Input:** Two lines: `s` (a `str`), then `ch` (a single character `str`).

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
banana
a

Output:
3
```
**Explanation:** The letter "a" appears 3 times in "banana".

**Hint:** Loop over characters and count matches.

---

## Q210. Create a List of N Numbers

**Difficulty:** Very Easy

**Learning Objective:** Build a list of numbers 1 to n with a loop and `.append()`.

**Problem:** Write a program that reads `n` and prints a list containing the numbers from 1 to `n`.

**Input:** A single line containing an integer `n`.

**Output:** Print the list `[1, 2, 3, ..., n]`.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
4

Output:
[1, 2, 3, 4]
```
**Explanation:** The list holds 1 through 4.

**Hint:** Start `lst = []` and `lst.append(i)` inside a loop. Printing a list shows it with brackets and commas.

---

## Q211. First and Last Elements of a List

**Difficulty:** Very Easy

**Learning Objective:** Access list elements by index.

**Problem:** Write a program that reads a list of integers and prints its first and last elements.

**Input:** A single line containing integers separated by spaces.

**Output:** Print `First: <first>` and `Last: <last>` on two lines.

**Constraints:**
- The list has between 1 and 100 elements.
- Values are integers in `[-10**6, 10**6]`.

**Example:**
```
Input:
5 8 3 9

Output:
First: 5
Last: 9
```
**Explanation:** The first element is 5 and the last is 9.

**Hint:** Use `input().split()` to get a list of strings; `lst[0]` and `lst[-1]`.

---

## Q212. Sum of Elements of a List

**Difficulty:** Very Easy

**Learning Objective:** Sum the numeric elements of a list.

**Problem:** Write a program that reads a list of integers (on one line, space-separated) and prints their sum.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- The list has between 1 and 100 elements.
- Values are in `[-10**6, 10**6]`.

**Example:**
```
Input:
10 20 30

Output:
60
```
**Explanation:** `10 + 20 + 30 = 60`.

**Hint:** Loop over the list and accumulate a total (convert each element to `int`).

---

## Q213. Count of Elements in a List

**Difficulty:** Very Easy

**Learning Objective:** Determine the number of elements in a list with `len()`.

**Problem:** Write a program that reads a list of integers and prints how many elements it has.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the number of elements.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
7 2 9 1 4

Output:
5
```
**Explanation:** There are 5 numbers.

**Hint:** `len(lst)`.

---

## Q214. Largest Element of a List

**Difficulty:** Very Easy

**Learning Objective:** Find the maximum value in a list by tracking a running maximum.

**Problem:** Write a program that reads a list of integers and prints its largest element.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the maximum value.

**Constraints:**
- The list has at least 1 element.

**Example:**
```
Input:
12 7 30 4 19

Output:
30
```
**Explanation:** The largest is 30.

**Hint:** Start `mx` with the first element, then compare the rest.

---

## Q215. Smallest Element of a List

**Difficulty:** Very Easy

**Learning Objective:** Find the minimum value in a list.

**Problem:** Write a program that reads a list of integers and prints its smallest element.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the minimum value.

**Constraints:**
- The list has at least 1 element.

**Example:**
```
Input:
8 3 10 6

Output:
3
```
**Explanation:** The smallest is 3.

**Hint:** Track a running minimum.

---

## Q216. Print the Elements of a List

**Difficulty:** Very Easy

**Learning Objective:** Iterate over a list and print each element.

**Problem:** Write a program that reads a list of integers and prints each element on its own line.

**Input:** A single line containing integers separated by spaces.

**Output:** Print each integer on its own line.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
4 7 2

Output:
4
7
2
```
**Explanation:** Each element is printed on a new line.

**Hint:** `for x in lst: print(x)`.

---

## Q217. Reverse a List

**Difficulty:** Very Easy

**Learning Objective:** Use the `.reverse()` method to reverse a list.

**Problem:** Write a program that reads a list of integers and prints the list in reverse order.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the reversed list in Python list format.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
1 2 3 4

Output:
[4, 3, 2, 1]
```
**Explanation:** The list reversed is [4, 3, 2, 1].

**Hint:** `lst.reverse()` mutates the list in place; then print it.

---

## Q218. Sort a List

**Difficulty:** Very Easy

**Learning Objective:** Use `.sort()` to sort a list in ascending order.

**Problem:** Write a program that reads a list of integers and prints it sorted in ascending order.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the sorted list in Python list format.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
5 1 4 2

Output:
[1, 2, 4, 5]
```
**Explanation:** The sorted list is [1, 2, 4, 5].

**Hint:** `lst.sort()` sorts in place; then print.

---

## Q219. Append a Number to a List

**Difficulty:** Very Easy

**Learning Objective:** Use `.append()` to add an element to the end of a list.

**Problem:** Write a program that reads a list of integers and then a single integer `x`, and prints the list with `x` added to the end.

**Input:** Line 1: integers separated by spaces. Line 2: an integer `x`.

**Output:** Print the updated list.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
1 2 3
9

Output:
[1, 2, 3, 9]
```
**Explanation:** `9` is appended to the end.

**Hint:** `lst.append(x)` then print.

---

## Q220. Insert a Number at the Front of a List

**Difficulty:** Very Easy

**Learning Objective:** Use `.insert()` to add an element at a specific position.

**Problem:** Write a program that reads a list of integers and then a single integer `x`, and prints the list with `x` inserted at the front (index 0).

**Input:** Line 1: integers separated by spaces. Line 2: an integer `x`.

**Output:** Print the updated list.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
2 3 4
1

Output:
[1, 2, 3, 4]
```
**Explanation:** `1` is inserted at index 0.

**Hint:** `lst.insert(0, x)`.

---

## Q221. Remove the Last Element of a List

**Difficulty:** Easy

**Learning Objective:** Use `.pop()` to remove and print the last element.

**Problem:** Write a program that reads a list of integers, removes its last element, and prints both the removed element and the remaining list.

**Input:** A single line containing integers separated by spaces (at least 2 elements).

**Output:** Line 1: the removed element. Line 2: the remaining list.

**Constraints:**
- The list has at least 2 elements.

**Example:**
```
Input:
1 2 3 4

Output:
4
[1, 2, 3]
```
**Explanation:** The last element 4 is removed, leaving [1, 2, 3].

**Hint:** `removed = lst.pop()` then print `removed` and `lst`.

---

## Q222. Remove the First Element of a List

**Difficulty:** Easy

**Learning Objective:** Use `pop(0)` or slicing to remove the first element.

**Problem:** Write a program that reads a list of integers, removes its first element, and prints the remaining list.

**Input:** A single line containing integers separated by spaces (at least 2 elements).

**Output:** Print the remaining list.

**Constraints:**
- The list has at least 2 elements.

**Example:**
```
Input:
1 2 3 4

Output:
[2, 3, 4]
```
**Explanation:** The first element 1 is removed.

**Hint:** `lst.pop(0)` removes the element at index 0.

---

## Q223. Reverse a String

**Difficulty:** Easy

**Learning Objective:** Reverse a string using a slice with step `-1`.

**Problem:** Write a program that reads a string and prints it reversed.

**Input:** A single line containing a string `s`.

**Output:** Print `s[::-1]`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
hello

Output:
olleh
```
**Explanation:** "hello" reversed is "olleh".

**Hint:** `s[::-1]`.

---

## Q224. First Three Characters of a String

**Difficulty:** Easy

**Learning Objective:** Slice the first three characters of a string.

**Problem:** Write a program that reads a string of length at least 3 and prints its first three characters.

**Input:** A single line containing a string `s` with at least 3 characters.

**Output:** Print `s[:3]`.

**Constraints:**
- `3 <= len(s) <= 1000`

**Example:**
```
Input:
Python

Output:
Pyt
```
**Explanation:** The first 3 characters are "Pyt".

**Hint:** `s[:3]`.

---

## Q225. Last Three Characters of a String

**Difficulty:** Easy

**Learning Objective:** Slice the last three characters of a string.

**Problem:** Write a program that reads a string of length at least 3 and prints its last three characters.

**Input:** A single line containing a string `s` with at least 3 characters.

**Output:** Print `s[-3:]`.

**Constraints:**
- `3 <= len(s) <= 1000`

**Example:**
```
Input:
Python

Output:
hon
```
**Explanation:** The last 3 characters are "hon".

**Hint:** `s[-3:]`.

---

## Q226. Replace Spaces with Dashes

**Difficulty:** Easy

**Learning Objective:** Use `.replace()` to substitute characters.

**Problem:** Write a program that reads a string and prints it with every space replaced by a dash `-`.

**Input:** A single line containing a string `s`.

**Output:** Print `s.replace(" ", "-")`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
hello world

Output:
hello-world
```
**Explanation:** The space becomes a dash.

**Hint:** `s.replace(" ", "-")`.

---

## Q227. Remove Leading and Trailing Spaces

**Difficulty:** Easy

**Learning Objective:** Use `.strip()` to remove surrounding whitespace.

**Problem:** Write a program that reads a string that may have spaces at the start and end, and prints it without those surrounding spaces.

**Input:** A single line containing a string `s`.

**Output:** Print `s.strip()`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
   hello   

Output:
hello
```
**Explanation:** Leading and trailing spaces are removed.

**Hint:** `s.strip()`.

---

## Q228. Remove First and Last Characters of a String

**Difficulty:** Easy

**Learning Objective:** Slice a string to drop its first and last characters.

**Problem:** Write a program that reads a string of length at least 2 and prints it without its first and last characters.

**Input:** A single line containing a string `s` with at least 2 characters.

**Output:** Print `s[1:-1]`.

**Constraints:**
- `2 <= len(s) <= 1000`

**Example:**
```
Input:
hello

Output:
ell
```
**Explanation:** Dropping the first "h" and last "o" leaves "ell".

**Hint:** `s[1:-1]`.

---

## Q229. Add Two Lists

**Difficulty:** Easy

**Learning Objective:** Concatenate two lists with the `+` operator.

**Problem:** Write a program that reads two lists of integers (each on its own line) and prints their concatenation (first list followed by second).

**Input:** Two lines, each containing space-separated integers.

**Output:** Print the concatenated list.

**Constraints:**
- Each list has between 0 and 50 elements.

**Example:**
```
Input:
1 2 3
4 5

Output:
[1, 2, 3, 4, 5]
```
**Explanation:** The second list is appended to the first.

**Hint:** `lst1 + lst2`.

---

## Q230. Count Even Numbers in a List

**Difficulty:** Easy

**Learning Objective:** Count list elements satisfying a condition.

**Problem:** Write a program that reads a list of integers and prints how many of them are even.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the count of even numbers.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
1 2 3 4 5 6

Output:
3
```
**Explanation:** Even numbers are 2, 4, 6 — that's 3.

**Hint:** Loop and count when `x % 2 == 0`.

---

## Q231. Sum of Even Elements in a List

**Difficulty:** Easy

**Learning Objective:** Sum list elements that satisfy a condition.

**Problem:** Write a program that reads a list of integers and prints the sum of its even elements.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the sum of even numbers.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
1 2 3 4 5 6

Output:
12
```
**Explanation:** Even numbers 2+4+6 = 12.

**Hint:** Add `x` to a total when `x % 2 == 0`.

---

## Q232. Print the Middle Element of a List

**Difficulty:** Easy

**Learning Objective:** Access the middle element of an odd-length list.

**Problem:** Write a program that reads a list with an odd number of elements and prints the element in the exact middle.

**Input:** A single line containing an odd number of integers.

**Output:** Print the middle element.

**Constraints:**
- The list has between 1 and 99 elements (odd).

**Example:**
```
Input:
5 8 3 9 1

Output:
3
```
**Explanation:** With 5 elements, the middle is index 2 (value 3).

**Hint:** `lst[len(lst) // 2]`.

---

## Q233. Remove an Element by Value

**Difficulty:** Easy

**Learning Objective:** Use `.remove()` to delete an element by its value.

**Problem:** Write a program that reads a list of integers and a value `x`, removes the first occurrence of `x` from the list, and prints the updated list. It is guaranteed that `x` is present.

**Input:** Line 1: space-separated integers. Line 2: an integer `x`.

**Output:** Print the list after removing `x`.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
1 2 3 2 4
2

Output:
[1, 3, 2, 4]
```
**Explanation:** The first occurrence of 2 is removed.

**Hint:** `lst.remove(x)` removes the first match.

---

## Q234. Elements at Even Indices

**Difficulty:** Easy

**Learning Objective:** Access elements by position using an index loop.

**Problem:** Write a program that reads a list of integers and prints the elements at even indices (0, 2, 4, ...), each on its own line.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the elements at even indices, one per line.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
10 20 30 40 50

Output:
10
30
50
```
**Explanation:** Indices 0, 2, 4 hold 10, 30, 50.

**Hint:** Loop with `for i in range(len(lst))` and check `i % 2 == 0`.

---

## Q235. Elements at Odd Indices

**Difficulty:** Easy

**Learning Objective:** Access elements at odd positions.

**Problem:** Write a program that reads a list of integers and prints the elements at odd indices (1, 3, 5, ...), each on its own line.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the elements at odd indices, one per line.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
10 20 30 40 50

Output:
20
40
```
**Explanation:** Indices 1 and 3 hold 20 and 40.

**Hint:** Loop with index and check `i % 2 != 0`.

---

## Q236. Print Elements Greater Than a Threshold

**Difficulty:** Easy

**Learning Objective:** Filter a list by a comparison condition.

**Problem:** Write a program that reads a list of integers and a threshold `t`, then prints all elements greater than `t`.

**Input:** Line 1: space-separated integers. Line 2: an integer `t`.

**Output:** Print each element greater than `t`, one per line.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
3 8 5 12 1
4

Output:
8
5
12
```
**Explanation:** Values greater than 4.

**Hint:** Loop and print when `x > t`.

---

## Q237. Check If a Value Exists in a List

**Difficulty:** Easy

**Learning Objective:** Use the `in` operator to test membership.

**Problem:** Write a program that reads a list of integers and a value `x`, then prints `Found` if `x` is in the list, otherwise `Not found`.

**Input:** Line 1: space-separated integers. Line 2: an integer `x`.

**Output:** Print `Found` or `Not found`.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
5 8 3 9
3

Output:
Found
```
**Explanation:** 3 is present in the list.

**Hint:** Use `if x in lst:`.

---

## Q238. Count How Many Times a Value Appears in a List

**Difficulty:** Easy

**Learning Objective:** Count occurrences of a value in a list.

**Problem:** Write a program that reads a list of integers and a value `x`, then prints how many times `x` appears in the list.

**Input:** Line 1: space-separated integers. Line 2: an integer `x`.

**Output:** Print a single integer equal to the count.

**Constraints:**
- The list has between 1 and 100 elements.

**Example:**
```
Input:
1 2 3 2 4 2
2

Output:
3
```
**Explanation:** 2 appears 3 times.

**Hint:** Loop and count matches with `x`.

---

## Q239. Split a Comma-Separated String into a List

**Difficulty:** Easy

**Learning Objective:** Use `.split(",")` to break a string into list items.

**Problem:** Write a program that reads a string of comma-separated words and prints the list of words.

**Input:** A single line containing words separated by commas (no spaces).

**Output:** Print the list of words.

**Constraints:**
- Between 1 and 20 words.
- Words contain only letters.

**Example:**
```
Input:
apple,banana,cherry

Output:
['apple', 'banana', 'cherry']
```
**Explanation:** The string is split on commas.

**Hint:** `s.split(",")`.

---

## Q240. Join a List of Words into a Sentence

**Difficulty:** Easy

**Learning Objective:** Use `.join()` to combine list items into a string.

**Problem:** Write a program that reads a list of words (space-separated) and prints them joined by a single space.

**Input:** A single line containing words separated by spaces.

**Output:** Print the words joined by spaces.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
I love Python

Output:
I love Python
```
**Explanation:** The words joined with spaces reproduce the original sentence.

**Hint:** `" ".join(words)`.

---

## Q241. Count Words in a Sentence

**Difficulty:** Easy

**Learning Objective:** Use `.split()` and `len()` to count words.

**Problem:** Write a program that reads a sentence and prints how many words it contains (words are separated by single spaces).

**Input:** A single line containing a sentence.

**Output:** Print a single integer equal to the number of words.

**Constraints:**
- The sentence has between 1 and 100 words.

**Example:**
```
Input:
Hello world of Python

Output:
4
```
**Explanation:** The sentence has 4 words.

**Hint:** `len(s.split())`.

---

## Q242. Sum of a List Entered as Space-Separated Values

**Difficulty:** Easy → Medium

**Learning Objective:** Parse a space-separated line into a list of integers and sum it.

**Problem:** Write a program that reads a line of space-separated integers, converts them to a list of integers, and prints their sum.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- Between 1 and 100 integers.
- Values in `[-10**6, 10**6]`.

**Example:**
```
Input:
3 1 4 1 5

Output:
14
```
**Explanation:** The sum is 14.

**Hint:** Use a loop over `input().split()` converting each to `int` and adding.

---

## Q243. Average of a List

**Difficulty:** Easy → Medium

**Learning Objective:** Compute the average of list elements.

**Problem:** Write a program that reads a list of integers and prints their average rounded to two decimal places.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the average formatted to two decimal places.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
10 20 30 40

Output:
25.00
```
**Explanation:** The average is 25.0.

**Hint:** Sum all, divide by `len(lst)`, format with `:.2f`.

---

## Q244. Check Whether a String Is a Palindrome

**Difficulty:** Easy → Medium

**Learning Objective:** Compare a string with its reverse using slicing.

**Problem:** Write a program that reads a string and prints `Palindrome` if it reads the same forward and backward, otherwise `Not palindrome`.

**Input:** A single line containing a string `s`.

**Output:** Print `Palindrome` or `Not palindrome`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
madam

Output:
Palindrome
```
**Explanation:** "madam" reversed is "madam".

**Hint:** Compare `s` with `s[::-1]`.

---

## Q245. First Letter of Each Word

**Difficulty:** Easy → Medium

**Learning Objective:** Extract the first letter of each word in a sentence.

**Problem:** Write a program that reads a sentence and prints the first letter of each word, all together (no spaces).

**Input:** A single line containing a sentence.

**Output:** Print the first letters concatenated.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
Hello World Of Python

Output:
HWOP
```
**Explanation:** First letters H, W, O, P.

**Hint:** Split into words and print `word[0]` for each.

---

## Q246. Replace a Word in a Sentence

**Difficulty:** Easy → Medium

**Learning Objective:** Use `.replace()` to substitute a word.

**Problem:** Write a program that reads a sentence and two words, then prints the sentence with all occurrences of the first word replaced by the second.

**Input:** Line 1: a sentence. Line 2: `word1`. Line 3: `word2`.

**Output:** Print the updated sentence.

**Constraints:**
- The sentence has between 1 and 50 words.

**Example:**
```
Input:
I like apples
apples
mangoes

Output:
I like mangoes
```
**Explanation:** "apples" is replaced by "mangoes".

**Hint:** `sentence.replace(word1, word2)`.

---

## Q247. Uppercase the First Letter of Each Word

**Difficulty:** Easy → Medium

**Learning Objective:** Transform each word and join them back.

**Problem:** Write a program that reads a sentence and prints it with the first letter of each word capitalized (other letters unchanged).

**Input:** A single line containing a sentence.

**Output:** Print the sentence with each word's first letter uppercased.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
the quick brown fox

Output:
The Quick Brown Fox
```
**Explanation:** Each word's first letter is capitalized.

**Hint:** For each word, use `word[0].upper() + word[1:]`, then join with spaces.

---

## Q248. Remove Vowels from a String

**Difficulty:** Easy → Medium

**Learning Objective:** Build a new string by excluding certain characters.

**Problem:** Write a program that reads a string and prints it with all vowels (`a, e, i, o, u` — both cases) removed.

**Input:** A single line containing a string `s`.

**Output:** Print the string without vowels.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
hello world

Output:
hll wrld
```
**Explanation:** The vowels are removed.

**Hint:** Loop over characters and keep only non-vowels by building a new string.

---

## Q249. Count the Words in a Sentence (whitespace robust)

**Difficulty:** Easy → Medium

**Learning Objective:** Count words even with multiple spaces.

**Problem:** Write a program that reads a line and prints the number of words, where words are separated by any amount of whitespace (spaces or tabs).

**Input:** A single line containing a sentence with possibly multiple spaces.

**Output:** Print the number of words.

**Constraints:**
- Between 1 and 100 words.

**Example:**
```
Input:
hello   world  of   python

Output:
4
```
**Explanation:** Extra spaces are ignored; there are 4 words.

**Hint:** `s.split()` with no argument splits on any whitespace.

---

## Q250. Sort a List in Descending Order

**Difficulty:** Easy → Medium

**Learning Objective:** Sort a list in descending order.

**Problem:** Write a program that reads a list of integers and prints it sorted in descending order.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the list sorted from largest to smallest.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
5 1 4 2 9

Output:
[9, 5, 4, 2, 1]
```
**Explanation:** The list is sorted descending.

**Hint:** `lst.sort(reverse=True)`.

---

## Q251. Second Largest Element of a List

**Difficulty:** Medium

**Learning Objective:** Find the second largest value in a list.

**Problem:** Write a program that reads a list of integers and prints its second largest element. (There is a unique largest and a unique second largest.)

**Input:** A single line containing at least 2 integers.

**Output:** Print the second largest value.

**Constraints:**
- The list has between 2 and 100 distinct enough elements to have a second largest.

**Example:**
```
Input:
3 9 1 7 5

Output:
7
```
**Explanation:** The largest is 9 and the second largest is 7.

**Hint:** Track both the largest and second-largest values as you loop.

---

## Q252. Remove Duplicates from a List (keep first occurrence order)

**Difficulty:** Medium

**Learning Objective:** Build a new list keeping only the first occurrence of each value.

**Problem:** Write a program that reads a list of integers and prints a new list with duplicates removed, preserving the order of first appearance.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the deduplicated list.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 2 4 1 5

Output:
[1, 2, 3, 4, 5]
```
**Explanation:** Each value appears once, in order of first appearance.

**Hint:** Use a result list and add each value only if it is not already in it (use `in`).

---

## Q253. Check If Two Strings Are Anagrams

**Difficulty:** Medium

**Learning Objective:** Compare sorted character lists to test anagram status.

**Problem:** Write a program that reads two strings and prints `Anagram` if they contain exactly the same letters (same counts), otherwise `Not anagram`. (Order can differ; case-sensitive.)

**Input:** Two lines: string `a`, then string `b`.

**Output:** Print `Anagram` or `Not anagram`.

**Constraints:**
- `1 <= len(a), len(b) <= 100`

**Example:**
```
Input:
listen
silent

Output:
Anagram
```
**Explanation:** Both contain the letters l,i,s,t,e,n.

**Hint:** Sort the characters of both strings (e.g., `sorted(a)`) and compare.

---

## Q254. Sum of Positive Elements in a List

**Difficulty:** Medium

**Learning Objective:** Sum only the positive elements of a list.

**Problem:** Write a program that reads a list of integers and prints the sum of its positive elements.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the sum of positive numbers.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
-3 5 -1 8 0

Output:
13
```
**Explanation:** Positive numbers 5 + 8 = 13.

**Hint:** Add `x` when `x > 0`.

---

## Q255. Count of Negative Elements in a List

**Difficulty:** Medium

**Learning Objective:** Count negative elements of a list.

**Problem:** Write a program that reads a list of integers and prints how many are negative.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the count of negatives.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
-2 5 -3 -1 0 4

Output:
3
```
**Explanation:** -2, -3, -1 are negative.

**Hint:** Count when `x < 0`.

---

## Q256. Find the Index of a Value in a List

**Difficulty:** Medium

**Learning Objective:** Locate the position of a value in a list.

**Problem:** Write a program that reads a list of integers and a value `x`, then prints the index of the first occurrence of `x`. If `x` is not present, print `-1`.

**Input:** Line 1: space-separated integers. Line 2: an integer `x`.

**Output:** Print the index, or `-1` if not found.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
5 8 3 9 3
3

Output:
2
```
**Explanation:** The first 3 is at index 2.

**Hint:** Loop with index; return/print as soon as found.

---

## Q257. Reverse Each Word in a Sentence

**Difficulty:** Medium

**Learning Objective:** Transform each word of a sentence and rejoin.

**Problem:** Write a program that reads a sentence and prints each word reversed, while keeping the word order (words separated by single spaces).

**Input:** A single line containing a sentence.

**Output:** Print the sentence with each word reversed.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
hello world

Output:
olleh dlrow
```
**Explanation:** "hello"→"olleh", "world"→"dlrow".

**Hint:** Split, reverse each word with `w[::-1]`, join with spaces.

---

## Q258. Count of Even Elements at Even Indices

**Difficulty:** Medium

**Learning Objective:** Combine positional and value conditions.

**Problem:** Write a program that reads a list of integers and counts elements that are both at an even index AND are even numbers.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the count.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
2 3 4 6 8 1

Output:
3
```
**Explanation:** Index 0: 2 (even idx, even) ✓; idx 2: 4 ✓; idx 4: 8 ✓ → 3.

**Hint:** Loop with index; count when `i % 2 == 0 and value % 2 == 0`.

---

## Q259. First and Last Word of a Sentence

**Difficulty:** Medium

**Learning Objective:** Extract the first and last words of a sentence.

**Problem:** Write a program that reads a sentence and prints its first word and its last word.

**Input:** A single line containing a sentence with at least two words.

**Output:** Print `First: <first>` and `Last: <last>` on two lines.

**Constraints:**
- Between 2 and 50 words.

**Example:**
```
Input:
The quick brown fox

Output:
First: The
Last: fox
```
**Explanation:** The first word is "The", the last is "fox".

**Hint:** Split and use `words[0]` and `words[-1]`.

---

## Q260. Print the List of Digits of a Number

**Difficulty:** Medium

**Learning Objective:** Convert a number into a list of its digits.

**Problem:** Write a program that reads a positive integer and prints a list of its digits in order.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print a list where each element is one digit of `n`.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
4567

Output:
[4, 5, 6, 7]
```
**Explanation:** The digits in order.

**Hint:** Convert `n` to a string and loop over its characters, converting each to `int`.

---

## Q261. Elements Greater Than Their Neighbors (local peaks)

**Difficulty:** Medium

**Learning Objective:** Compare each element with its neighbors.

**Problem:** Write a program that reads a list of integers and counts the elements that are strictly greater than both their immediate left and right neighbors. The first and last elements are never counted.

**Input:** A single line containing at least 3 integers.

**Output:** Print a single integer equal to the count of local peaks.

**Constraints:**
- The list has between 3 and 100 integers.

**Example:**
```
Input:
1 5 2 4 3 9 0

Output:
2
```
**Explanation:** 5 (>1 and >2) and 9 (>3 and >0) are peaks.

**Hint:** Loop from index 1 to `len(lst)-1`, checking both neighbors.

---

## Q262. Check If a List Is Sorted Ascending

**Difficulty:** Medium

**Learning Objective:** Verify the sorted order of a list.

**Problem:** Write a program that reads a list of integers and prints `Sorted` if the elements are in non-decreasing order, otherwise `Not sorted`.

**Input:** A single line containing integers separated by spaces.

**Output:** Print `Sorted` or `Not sorted`.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 2 3 5

Output:
Sorted
```
**Explanation:** Each element is ≤ the next.

**Hint:** Check that every element is ≤ the one after it.

---

## Q263. Print Elements at Even Indices Using Slicing

**Difficulty:** Medium

**Learning Objective:** Use list slicing with a step.

**Problem:** Write a program that reads a list of integers and prints the sublist of elements at even indices (0, 2, 4, ...).

**Input:** A single line containing integers separated by spaces.

**Output:** Print the sublist `lst[::2]`.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
10 20 30 40 50

Output:
[10, 30, 50]
```
**Explanation:** Elements at indices 0, 2, 4.

**Hint:** `lst[::2]`.

---

## Q264. Print the Reverse of Each Number in a List

**Difficulty:** Medium

**Learning Objective:** Reverse each element of a list of numbers and build a new list.

**Problem:** Write a program that reads a list of positive integers and prints a new list where each element is the reverse of the original (digit order reversed; no leading zeros in the reversed value).

**Input:** A single line containing positive integers separated by spaces.

**Output:** Print the list of reversed numbers.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
123 45 6

Output:
[321, 54, 6]
```
**Explanation:** 123→321, 45→54, 6→6.

**Hint:** For each number, reverse its digits using a `while` loop, or convert to string and reverse then to `int`.

---

## Q265. Count Vowels in a String

**Difficulty:** Medium

**Learning Objective:** Count vowel characters in a string (case-insensitive).

**Problem:** Write a program that reads a string and prints the number of vowels (`a, e, i, o, u`, both cases) it contains.

**Input:** A single line containing a string `s`.

**Output:** Print a single integer equal to the vowel count.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
Hello WORLD

Output:
3
```
**Explanation:** Vowels are e, o, O → 3.

**Hint:** Convert to lowercase first, then count characters in "aeiou".

---

## Q266. Print Every Other Character of a String

**Difficulty:** Medium

**Learning Objective:** Slice a string with a step.

**Problem:** Write a program that reads a string and prints every other character starting from the first (indices 0, 2, 4, ...).

**Input:** A single line containing a string `s`.

**Output:** Print `s[::2]`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
abcdef

Output:
ace
```
**Explanation:** Characters at indices 0, 2, 4 are a, c, e.

**Hint:** `s[::2]`.

---

## Q267. Check Whether a String Starts and Ends With the Same Character

**Difficulty:** Medium

**Learning Objective:** Compare the first and last characters of a string.

**Problem:** Write a program that reads a string and prints `Yes` if its first and last characters are the same, otherwise `No`.

**Input:** A single line containing a string `s` with at least one character.

**Output:** Print `Yes` or `No`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
madam

Output:
Yes
```
**Explanation:** First and last characters are both "m".

**Hint:** Compare `s[0]` and `s[-1]`.

---

## Q268. Merge Two Lists Alternating

**Difficulty:** Medium

**Learning Objective:** Combine two lists by alternating their elements.

**Problem:** Write a program that reads two lists of equal length and prints a new list formed by alternating elements: first of A, first of B, second of A, second of B, etc.

**Input:** Two lines, each containing space-separated integers of the same length.

**Output:** Print the merged alternating list.

**Constraints:**
- Each list has between 1 and 50 elements.

**Example:**
```
Input:
1 2 3
9 8 7

Output:
[1, 9, 2, 8, 3, 7]
```
**Explanation:** Elements alternate between the two lists.

**Hint:** Loop over the indices and append `a[i]` then `b[i]`.

---

## Q269. Count the Number of Characters (no spaces)

**Difficulty:** Medium

**Learning Objective:** Count non-space characters in a string.

**Problem:** Write a program that reads a string and prints how many characters it has, ignoring spaces.

**Input:** A single line containing a string `s`.

**Output:** Print a single integer equal to the count of non-space characters.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
hello world

Output:
10
```
**Explanation:** "helloworld" has 10 characters (space excluded).

**Hint:** Loop and count characters that are not `" "`.

---

## Q270. Swap First and Last Elements of a List

**Difficulty:** Medium

**Learning Objective:** Swap the first and last elements of a list.

**Problem:** Write a program that reads a list of integers and prints the list with its first and last elements swapped.

**Input:** A single line containing at least 2 integers.

**Output:** Print the modified list.

**Constraints:**
- The list has between 2 and 100 elements.

**Example:**
```
Input:
1 2 3 4 5

Output:
[5, 2, 3, 4, 1]
```
**Explanation:** First (1) and last (5) are swapped.

**Hint:** Use `lst[0], lst[-1] = lst[-1], lst[0]`.

---

## Q271. List of Squares of Numbers in a List

**Difficulty:** Medium

**Learning Objective:** Transform every element of a list and build a new list.

**Problem:** Write a program that reads a list of integers and prints a new list where each element is the square of the original.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the list of squares.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
2 3 4

Output:
[4, 9, 16]
```
**Explanation:** 2→4, 3→9, 4→16.

**Hint:** Append `x ** 2` for each `x` into a new list.

---

## Q272. Find the Number of Occurrences of Each Character (report counts)

**Difficulty:** Medium

**Learning Objective:** Count unique characters without using a dictionary (by tracking visited characters in a list).

**Problem:** Write a program that reads a string and, for each distinct character (in order of first appearance), prints the character and how many times it occurs.

**Input:** A single line containing a string `s`.

**Output:** For each distinct character, print `<char>: <count>` on its own line.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
hello

Output:
h: 1
e: 1
l: 2
o: 1
```
**Explanation:** Counts per distinct character.

**Hint:** Keep a list of seen characters; for each, count occurrences with `.count()` or a loop. Dictionaries come in Batch 5; here use a list.

---

## Q273. Remove All Occurrences of a Value from a List

**Difficulty:** Medium

**Learning Objective:** Build a new list excluding all occurrences of a value.

**Problem:** Write a program that reads a list of integers and a value `x`, then prints a new list with all occurrences of `x` removed.

**Input:** Line 1: space-separated integers. Line 2: an integer `x`.

**Output:** Print the filtered list.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 2 4 2 5
2

Output:
[1, 3, 4, 5]
```
**Explanation:** All 2's are removed.

**Hint:** Build a new list keeping only values `!= x`.

---

## Q274. Print the Sum of Elements at Even Indices

**Difficulty:** Medium

**Learning Objective:** Sum elements by position.

**Problem:** Write a program that reads a list of integers and prints the sum of the elements at even indices (0, 2, 4, ...).

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
10 20 30 40 50

Output:
90
```
**Explanation:** Indices 0, 2, 4 → 10+30+50 = 90.

**Hint:** Loop with index and add when `i % 2 == 0`.

---

## Q275. Count Words That Start With a Given Letter

**Difficulty:** Medium

**Learning Objective:** Count words meeting a condition.

**Problem:** Write a program that reads a sentence and a letter, then prints how many words begin with that letter (case-insensitive).

**Input:** Line 1: a sentence. Line 2: a single letter.

**Output:** Print a single integer equal to the count.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
Apple and Banana are Awesome
a

Output:
4
```
**Explanation:** Apple, and, are, Awesome all start with "a" (case-insensitive).

**Hint:** Split words, lowercase the first letter, compare to the letter.

---

## Q276. Check If a String Contains Only Digits

**Difficulty:** Medium

**Learning Objective:** Verify the content of a string with a loop.

**Problem:** Write a program that reads a string and prints `Digits only` if every character is a digit, otherwise `Not digits only`. (The string has at least one character.)

**Input:** A single line containing a string `s`.

**Output:** Print `Digits only` or `Not digits only`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
12345

Output:
Digits only
```
**Explanation:** All characters are digits.

**Hint:** Loop and check `c >= "0" and c <= "9"` for each character (or use the fact that digits are 0–9).

---

## Q277. Print All Elements of a List Except the First and Last

**Difficulty:** Medium

**Learning Objective:** Slice out the middle of a list.

**Problem:** Write a program that reads a list of at least 3 integers and prints the middle elements (everything except the first and last).

**Input:** A single line containing at least 3 integers.

**Output:** Print the sublist `lst[1:-1]`.

**Constraints:**
- The list has between 3 and 100 elements.

**Example:**
```
Input:
1 2 3 4 5

Output:
[2, 3, 4]
```
**Explanation:** First and last removed.

**Hint:** `lst[1:-1]`.

---

## Q278. Reverse a List and Print It (without mutating original idea)

**Difficulty:** Medium

**Learning Objective:** Create a reversed copy using slicing.

**Problem:** Write a program that reads a list of integers and prints it reversed using slicing.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the reversed list.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4

Output:
[4, 3, 2, 1]
```
**Explanation:** The list reversed.

**Hint:** `lst[::-1]`.

---

## Q279. Largest and Smallest of a List

**Difficulty:** Medium

**Learning Objective:** Find both the max and min in one pass.

**Problem:** Write a program that reads a list of integers and prints its largest and smallest elements.

**Input:** A single line containing integers separated by spaces.

**Output:** Print `Largest: <max>` and `Smallest: <min>` on two lines.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
4 9 2 7 5

Output:
Largest: 9
Smallest: 2
```
**Explanation:** The max is 9, min is 2.

**Hint:** Track both as you loop.

---

## Q280. Print the Element at the Middle of a List (either of two middles)

**Difficulty:** Medium

**Learning Objective:** Handle an even-length list by choosing the first middle.

**Problem:** Write a program that reads a list of integers and prints the middle element. If the list has an even number of elements, print the element at index `len(lst) // 2 - 1` (the first of the two middle elements).

**Input:** A single line containing at least 1 integer.

**Output:** Print the chosen middle element.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4

Output:
2
```
**Explanation:** `len // 2 - 1 = 1`, so the element at index 1 (value 2).

**Hint:** Compute the index with a formula based on `len(lst)`.

---

## Q281. Count Elements Greater Than the Average

**Difficulty:** Medium

**Learning Objective:** Compute an average then count elements above it.

**Problem:** Write a program that reads a list of integers and prints how many elements are strictly greater than the average.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the count.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4 5

Output:
2
```
**Explanation:** Average is 3; elements greater than 3 are 4, 5 → 2.

**Hint:** First find the sum and average, then loop again to count.

---

## Q282. Shift a List Left by One

**Difficulty:** Medium

**Learning Objective:** Move every element one position to the left, wrapping the first to the end.

**Problem:** Write a program that reads a list of integers and prints it after shifting left by one position (the first element moves to the end).

**Input:** A single line containing at least 2 integers.

**Output:** Print the shifted list.

**Constraints:**
- Between 2 and 100 integers.

**Example:**
```
Input:
1 2 3 4

Output:
[2, 3, 4, 1]
```
**Explanation:** Every element moves left; the first wraps to the end.

**Hint:** Use `lst[1:] + [lst[0]]` or a loop with `.append()` and `.pop(0)`.

---

## Q283. Extract Digits That Appear in a String

**Difficulty:** Medium

**Learning Objective:** Filter a string to keep only digit characters.

**Problem:** Write a program that reads a string containing letters and digits, and prints a new string with only the digit characters (in their original order).

**Input:** A single line containing a string `s`.

**Output:** Print the substring of `s` containing only digits.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
a1b2c3

Output:
123
```
**Explanation:** The digits are 1, 2, 3.

**Hint:** Loop over characters and keep those that are digits.

---

## Q284. Count of Palindromic Words in a Sentence

**Difficulty:** Medium

**Learning Objective:** Apply a palindrome test to each word in a sentence.

**Problem:** Write a program that reads a sentence and prints how many of its words are palindromes (read the same forward and backward).

**Input:** A single line containing a sentence.

**Output:** Print a single integer equal to the count.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
madam noon radar

Output:
3
```
**Explanation:** "madam", "noon", and "radar" are all palindromes → 3.

**Hint:** For each word, check `w == w[::-1]`.

---

## Q285. Sum of Elements at Even Indices and Odd Indices Separately

**Difficulty:** Medium

**Learning Objective:** Separate sums by index parity.

**Problem:** Write a program that reads a list of integers and prints the sum of elements at even indices and the sum of elements at odd indices.

**Input:** A single line containing integers separated by spaces.

**Output:** Print two integers on one line: even-index sum, then odd-index sum.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4 5

Output:
9 6
```
**Explanation:** Even indices 0,2,4 → 1+3+5=9; odd indices 1,3 → 2+4=6.

**Hint:** Two totals, add based on `i % 2`.

---

## Q286. Check If a Sentence Contains a Word

**Difficulty:** Medium

**Learning Objective:** Use the `in` operator on a string.

**Problem:** Write a program that reads a sentence and a word, then prints `Present` if the word appears anywhere in the sentence (as a substring), otherwise `Absent`.

**Input:** Line 1: a sentence. Line 2: a word.

**Output:** Print `Present` or `Absent`.

**Constraints:**
- The sentence has between 1 and 50 words.

**Example:**
```
Input:
Python is great
great

Output:
Present
```
**Explanation:** "great" appears in the sentence.

**Hint:** Use `if word in sentence:`.

---

## Q287. Print Each Word with Its Length

**Difficulty:** Medium

**Learning Objective:** Report the length of each word in a sentence.

**Problem:** Write a program that reads a sentence and prints each word followed by its length.

**Input:** A single line containing a sentence.

**Output:** For each word, print `<word>: <length>`.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
hello world

Output:
hello: 5
world: 5
```
**Explanation:** Each word with its length.

**Hint:** Split and print `f"{w}: {len(w)}"`.

---

## Q288. Convert a List of Numbers to a Comma String

**Difficulty:** Medium

**Learning Objective:** Convert a list of numbers into a comma-separated string.

**Problem:** Write a program that reads a list of integers and prints them joined by commas.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the numbers joined by commas (no spaces).

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4

Output:
1,2,3,4
```
**Explanation:** Numbers joined with commas.

**Hint:** Convert each to a string and join with `",".join(...)`.

---

## Q289. Count of Elements in a List Equal to Their Index

**Difficulty:** Medium → Hard

**Learning Objective:** Compare list elements with their positions.

**Problem:** Write a program that reads a list of integers and prints how many elements are equal to their own index.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the count.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
0 2 2 3 9

Output:
3
```
**Explanation:** At index 0 value 0 ✓; index 2 value 2 ✓; index 3 value 3 ✓ → 3.

**Hint:** Loop with index and check `lst[i] == i`.

---

## Q290. Print the Longest Word in a Sentence

**Difficulty:** Medium → Hard

**Learning Objective:** Find the longest word in a sentence.

**Problem:** Write a program that reads a sentence and prints the longest word. If there is a tie, print the first one encountered.

**Input:** A single line containing a sentence.

**Output:** Print the longest word.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
The quick brown fox jumps

Output:
quick
```
**Explanation:** Both "quick" and "jumps" have length 5; "quick" is first.

**Hint:** Track the current longest word and its length.

---

## Q291. Reverse the Order of Words in a Sentence

**Difficulty:** Medium → Hard

**Learning Objective:** Reverse the order of words while keeping each word intact.

**Problem:** Write a program that reads a sentence and prints the words in reverse order.

**Input:** A single line containing a sentence.

**Output:** Print the words reversed in order, separated by spaces.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
I love Python

Output:
Python love I
```
**Explanation:** The word order is reversed.

**Hint:** Split into words, reverse the list, join with spaces.

---

## Q292. Elements Common to Two Lists

**Difficulty:** Medium → Hard

**Learning Objective:** Find values present in both lists without using sets.

**Problem:** Write a program that reads two lists of integers and prints a list of values that appear in both (no duplicates, in the order they appear in the first list).

**Input:** Two lines, each containing space-separated integers.

**Output:** Print the list of common values (deduplicated).

**Constraints:**
- Each list has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4
3 4 5 6

Output:
[3, 4]
```
**Explanation:** 3 and 4 are common.

**Hint:** For each value in the first list, include it in the result if it is in the second list and not already included.

---

## Q293. Count the Number of Uppercase and Lowercase Letters

**Difficulty:** Medium → Hard

**Learning Objective:** Classify characters by case using comparisons.

**Problem:** Write a program that reads a string and prints how many uppercase letters and how many lowercase letters it contains. Ignore other characters.

**Input:** A single line containing a string `s`.

**Output:** Print two integers on one line: uppercase count, then lowercase count.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
Hello World

Output:
2 8
```
**Explanation:** Uppercase H, W → 2; lowercase e,l,l,o,o,r,l,d → 8.

**Hint:** For each character, check if it is between "A"–"Z" (upper) or "a"–"z" (lower).

---

## Q294. Shift a List Right by One

**Difficulty:** Medium → Hard

**Learning Objective:** Move every element one position to the right, wrapping the last to the front.

**Problem:** Write a program that reads a list of integers and prints it after shifting right by one position (the last element moves to the front).

**Input:** A single line containing at least 2 integers.

**Output:** Print the shifted list.

**Constraints:**
- Between 2 and 100 integers.

**Example:**
```
Input:
1 2 3 4

Output:
[4, 1, 2, 3]
```
**Explanation:** Every element moves right; the last wraps to the front.

**Hint:** Use `[lst[-1]] + lst[:-1]`.

---

## Q295. Remove Duplicates from a String (preserve order)

**Difficulty:** Medium → Hard

**Learning Objective:** Deduplicate the characters of a string, keeping first occurrences.

**Problem:** Write a program that reads a string and prints it with duplicate characters removed, keeping the order of first appearance.

**Input:** A single line containing a string `s`.

**Output:** Print the deduplicated string.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
banana

Output:
ban
```
**Explanation:** Removing repeated characters gives "ban".

**Hint:** Build a new string and add each character only if it is not already in it.

---

## Q296. Print the Sum of the First and Last Elements of a List

**Difficulty:** Hard

**Learning Objective:** Access and combine the endpoints of a list.

**Problem:** Write a program that reads a list of integers and prints the sum of its first and last elements.

**Input:** A single line containing at least 2 integers.

**Output:** Print a single integer equal to `lst[0] + lst[-1]`.

**Constraints:**
- Between 2 and 100 integers.

**Example:**
```
Input:
3 5 7 2

Output:
5
```
**Explanation:** `3 + 2 = 5`.

**Hint:** Use `lst[0]` and `lst[-1]`.

---

## Q297. Elements Larger Than Both Neighbors and At Even Index

**Difficulty:** Hard

**Learning Objective:** Combine neighbor comparison with a positional constraint.

**Problem:** Write a program that reads a list of at least 3 integers and counts elements that are strictly greater than both neighbors AND located at an even index.

**Input:** A single line containing at least 3 integers.

**Output:** Print a single integer equal to the count.

**Constraints:**
- The list has between 3 and 100 integers.

**Example:**
```
Input:
3 1 2 1 5 1 4 1

Output:
3
```
**Explanation:** At index 2, value 2 > neighbors 1 and 1 (even index) ✓. At index 4, value 5 > 1 and 1 (even) ✓. At index 6, value 4 > 1 and 1 (even) ✓. Total 3.

**Hint:** Loop over even indices only, and check both neighbors.

---

## Q298. Second Most Frequent Character in a String

**Difficulty:** Hard

**Learning Objective:** Compute character frequencies using a list-based approach and find the second-highest frequency.

**Problem:** Write a program that reads a string and prints the character that has the second-highest frequency. If there is a tie for second place, print the one that appears first in the string.

**Input:** A single line containing a string `s` with at least 2 distinct characters.

**Output:** Print a single character.

**Constraints:**
- `2 <= len(s) <= 1000`
- The string has at least 2 distinct characters.

**Example:**
```
Input:
aabbbcc

Output:
a
```
**Explanation:** b appears 3 times, a and c appear 2 each. Second highest is 2; a appears first among those → "a".

**Hint:** First find the most frequent character, then find the character with the highest frequency among the rest.

---

## Q299. Check If a List Contains a Duplicate

**Difficulty:** Hard

**Learning Objective:** Detect any repeated value in a list without sets.

**Problem:** Write a program that reads a list of integers and prints `Duplicate` if any value appears more than once, otherwise `Unique`.

**Input:** A single line containing integers separated by spaces.

**Output:** Print `Duplicate` or `Unique`.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 2 4

Output:
Duplicate
```
**Explanation:** 2 appears twice.

**Hint:** Use a `seen` list; if a value is already in `seen`, a duplicate exists.

---

## Q300. Print the Longest Palindromic Word in a Sentence

**Difficulty:** Hard

**Learning Objective:** Combine palindrome testing with longest-word selection.

**Problem:** Write a program that reads a sentence and prints the longest palindromic word. If multiple have the same maximum length, print the first one. If no word is a palindrome, print `None`.

**Input:** A single line containing a sentence.

**Output:** Print the longest palindromic word, or `None`.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
madam went to see noon and level

Output:
madam
```
**Explanation:** Palindromes are "madam", "noon", "level" — all length 5; "madam" comes first.

**Hint:** For each word, check if it is a palindrome and track the longest one seen.
