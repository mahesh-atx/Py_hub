# Batch 4 — Python Fundamentals

## Topics Covered
- Variables
- Data Types
- Operators
- Input and Output
- Conditions
- Loops
- Strings
- Lists
- **Tuples** (creating, indexing, unpacking, methods)
- **Sets** (creating, add/remove, union, intersection, difference, deduplication)

> **Rules for this batch:** All earlier topics continue. **Tuples** and **Sets** are the two new topics, introduced gradually. Do **not** use dictionaries or functions.

**How to run:** Read input with `input()`, process, and `print()`.

---

## Q301. Create a Tuple from Two Values

**Difficulty:** Very Easy

**Learning Objective:** Build a tuple from two values and print it.

**Problem:** Write a program that reads two integers and prints them as a tuple.

**Input:** Two lines: integer `a`, then integer `b`.

**Output:** Print the tuple `(a, b)`.

**Constraints:**
- `-10**6 <= a, b <= 10**6`

**Example:**
```
Input:
5
9

Output:
(5, 9)
```
**Explanation:** The two values form a tuple.

**Hint:** `t = (a, b)` then `print(t)`.

---

## Q302. Length of a Tuple

**Difficulty:** Very Easy

**Learning Objective:** Use `len()` on a tuple.

**Problem:** Write a program that reads a line of space-separated integers and prints the length of the tuple formed from them.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the number of elements.

**Constraints:**
- Between 1 and 20 integers.

**Example:**
```
Input:
1 2 3 4

Output:
4
```
**Explanation:** The tuple has 4 elements.

**Hint:** `t = tuple(input().split())`; `len(t)`.

---

## Q303. First and Last Element of a Tuple

**Difficulty:** Very Easy

**Learning Objective:** Index a tuple.

**Problem:** Write a program that reads a line of space-separated integers and prints the first and last elements of the tuple.

**Input:** A single line containing at least 2 integers.

**Output:** Print `First: <t[0]>` and `Last: <t[-1]>` on two lines.

**Constraints:**
- Between 2 and 20 integers.

**Example:**
```
Input:
3 7 2 9

Output:
First: 3
Last: 9
```
**Explanation:** First element is 3, last is 9.

**Hint:** `t[0]` and `t[-1]`.

---

## Q304. Sum of Elements of a Tuple

**Difficulty:** Very Easy

**Learning Objective:** Sum the numeric elements of a tuple.

**Problem:** Write a program that reads a line of space-separated integers and prints the sum of the tuple elements.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- Between 1 and 20 integers.

**Example:**
```
Input:
1 2 3 4

Output:
10
```
**Explanation:** `1+2+3+4 = 10`.

**Hint:** Convert each to `int` and sum.

---

## Q305. Create a Set from a List of Values

**Difficulty:** Very Easy

**Learning Objective:** Build a set from values and understand its deduplicating nature.

**Problem:** Write a program that reads a line of space-separated integers and prints them as a set.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the set of the values.

**Constraints:**
- Between 1 and 20 integers.

**Example:**
```
Input:
1 2 2 3

Output:
{1, 2, 3}
```
**Explanation:** The set automatically removes duplicates.

**Hint:** `s = set(lst)` then print. (Output order may vary; see note below.)

---

## Q306. Length of a Set (number of unique values)

**Difficulty:** Very Easy

**Learning Objective:** Count distinct values in a list using a set.

**Problem:** Write a program that reads a line of space-separated integers and prints the number of distinct values.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the count of unique values.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 2 3 3 3 4

Output:
4
```
**Explanation:** Unique values are 1, 2, 3, 4.

**Hint:** `len(set(lst))`.

---

## Q307. Add an Element to a Set

**Difficulty:** Very Easy

**Learning Objective:** Use `.add()` to insert an element into a set.

**Problem:** Write a program that reads a line of space-separated integers and a single integer `x`, then prints the set after adding `x` (adding it only if not already present).

**Input:** Line 1: space-separated integers. Line 2: an integer `x`.

**Output:** Print the updated set.

**Constraints:**
- Between 1 and 20 integers.

**Example:**
```
Input:
1 2 3
5

Output:
{1, 2, 3, 5}
```
**Explanation:** 5 is added to the set.

**Hint:** `s.add(x)` then print.

---

## Q308. Remove an Element from a Set

**Difficulty:** Very Easy

**Learning Objective:** Use `.discard()` or `.remove()` to delete from a set.

**Problem:** Write a program that reads a line of space-separated integers and a value `x` that is guaranteed to be in the set, then prints the set after removing `x`.

**Input:** Line 1: space-separated integers. Line 2: an integer `x` (present in the set).

**Output:** Print the updated set.

**Constraints:**
- Between 1 and 20 integers.

**Example:**
```
Input:
1 2 3 4
3

Output:
{1, 2, 4}
```
**Explanation:** 3 is removed.

**Hint:** `s.remove(x)` or `s.discard(x)`.

---

## Q309. Union of Two Sets

**Difficulty:** Very Easy

**Learning Objective:** Compute the union of two sets using `|`.

**Problem:** Write a program that reads two lines of space-separated integers and prints the union of the two sets (all distinct values from both).

**Input:** Two lines, each containing space-separated integers.

**Output:** Print the union set.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3
3 4 5

Output:
{1, 2, 3, 4, 5}
```
**Explanation:** The union contains all distinct values.

**Hint:** `s1 | s2`.

---

## Q310. Intersection of Two Sets

**Difficulty:** Very Easy

**Learning Objective:** Compute the intersection of two sets using `&`.

**Problem:** Write a program that reads two lines of space-separated integers and prints the intersection of the two sets (values present in both).

**Input:** Two lines, each containing space-separated integers.

**Output:** Print the intersection set.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3 4
3 4 5 6

Output:
{3, 4}
```
**Explanation:** 3 and 4 are in both.

**Hint:** `s1 & s2`.

---

## Q311. Difference of Two Sets

**Difficulty:** Very Easy

**Learning Objective:** Compute the difference of two sets using `-`.

**Problem:** Write a program that reads two lines of space-separated integers and prints the difference `A - B` (values in the first set but not in the second).

**Input:** Two lines: first set A, then set B.

**Output:** Print the difference set.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3 4 5
2 4

Output:
{1, 3, 5}
```
**Explanation:** Values in A but not in B.

**Hint:** `A - B`.

---

## Q312. Create a Set of Unique Words

**Difficulty:** Very Easy

**Learning Objective:** Get distinct words from a sentence using a set.

**Problem:** Write a program that reads a sentence and prints the set of its unique words (case-sensitive, words separated by spaces).

**Input:** A single line containing a sentence.

**Output:** Print the set of unique words.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
the cat and the dog

Output:
{'and', 'the', 'cat', 'dog'}
```
**Explanation:** Unique words.

**Hint:** `set(sentence.split())`.

---

## Q313. Check If a Value Is in a Set

**Difficulty:** Very Easy

**Learning Objective:** Test membership in a set with `in`.

**Problem:** Write a program that reads a line of space-separated integers and a value `x`, then prints `Present` if `x` is in the set, otherwise `Absent`.

**Input:** Line 1: space-separated integers. Line 2: an integer `x`.

**Output:** Print `Present` or `Absent`.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 5 9 3
9

Output:
Present
```
**Explanation:** 9 is in the set.

**Hint:** `if x in s:`.

---

## Q314. Unpack a Tuple into Variables

**Difficulty:** Very Easy

**Learning Objective:** Unpack a two-element tuple into variables.

**Problem:** Write a program that reads two integers, stores them in a tuple, unpacks the tuple into two variables, and prints their sum.

**Input:** Two lines: integer `a`, then integer `b`.

**Output:** Print a single integer equal to `a + b`.

**Constraints:**
- `-10**6 <= a, b <= 10**6`

**Example:**
```
Input:
12
8

Output:
20
```
**Explanation:** The tuple is unpacked into two variables whose sum is printed.

**Hint:** `x, y = t` then `print(x + y)`.

---

## Q315. Print the Type of a Tuple and a Set

**Difficulty:** Very Easy

**Learning Objective:** Use `type()` to confirm the data types.

**Problem:** Write a program that prints the type of a tuple `(1, 2)` and the type of a set `{1, 2}`.

**Input:** None.

**Output:** Print the type of the tuple and the type of the set, each on its own line.

**Constraints:**
- None (no input).

**Example:**
```
Output:
<class 'tuple'>
<class 'set'>
```
**Explanation:** `type((1, 2))` and `type({1, 2})`.

**Hint:** `print(type((1, 2)))` and `print(type({1, 2}))`.

---

## Q316. Count Distinct Characters in a String

**Difficulty:** Very Easy

**Learning Objective:** Use a set to count unique characters.

**Problem:** Write a program that reads a string and prints the number of distinct characters it contains.

**Input:** A single line containing a string `s`.

**Output:** Print a single integer equal to the number of unique characters.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
banana

Output:
3
```
**Explanation:** Unique characters are b, a, n.

**Hint:** `len(set(s))`.

---

## Q317. Print the Tuple of a Number's Digits

**Difficulty:** Easy

**Learning Objective:** Build a tuple of digits from a number.

**Problem:** Write a program that reads a positive integer and prints a tuple of its digits in order.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print a tuple of the digits.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
4567

Output:
(4, 5, 6, 7)
```
**Explanation:** The digits in order form a tuple.

**Hint:** Loop over `str(n)` and collect `int(ch)` into a tuple.

---

## Q318. Add Multiple Values to a Set

**Difficulty:** Easy

**Learning Objective:** Insert several elements into a set and observe deduplication.

**Problem:** Write a program that reads `n`, then `n` integers, adds them to a set, and prints the resulting set.

**Input:** Line 1: `n`. Then `n` lines each containing an integer.

**Output:** Print the set.

**Constraints:**
- `1 <= n <= 50`

**Example:**
```
Input:
5
1
2
1
3
2

Output:
{1, 2, 3}
```
**Explanation:** The set holds only unique values.

**Hint:** Start an empty set and `.add()` each value.

---

## Q319. Remove Duplicates from a List Using a Set

**Difficulty:** Easy

**Learning Objective:** Deduplicate a list by converting to a set.

**Problem:** Write a program that reads a list of integers and prints a new list with duplicates removed (order does not matter).

**Input:** A single line containing integers separated by spaces.

**Output:** Print a list of the unique values (any order).

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
3 1 3 2 1 4

Output:
[1, 2, 3, 4]
```
**Explanation:** Unique values in some order.

**Hint:** `list(set(lst))`.

---

## Q320. Find the Largest Element of a Set

**Difficulty:** Easy

**Learning Objective:** Find the maximum of a set.

**Problem:** Write a program that reads a line of space-separated integers and prints the largest distinct value (using a set).

**Input:** A single line containing integers separated by spaces.

**Output:** Print the maximum value.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
4 9 2 9 7

Output:
9
```
**Explanation:** The largest value is 9.

**Hint:** `max(s)`.

---

## Q321. Count Common Elements of Two Lists

**Difficulty:** Easy

**Learning Objective:** Count values present in both lists using set intersection.

**Problem:** Write a program that reads two lines of integers and prints how many distinct values are common to both.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print a single integer equal to the size of the intersection.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4
3 4 5

Output:
2
```
**Explanation:** Common values are 3 and 4.

**Hint:** `len(set(A) & set(B))`.

---

## Q322. Elements in Either Set but Not Both (symmetric difference)

**Difficulty:** Easy

**Learning Objective:** Compute the symmetric difference of two sets using `^`.

**Problem:** Write a program that reads two lines of integers and prints the set of values that are in exactly one of the two sets.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print the symmetric difference set.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3
3 4 5

Output:
{1, 2, 4, 5}
```
**Explanation:** Values in exactly one set.

**Hint:** `A ^ B`.

---

## Q323. Check If One Set Is a Subset of Another

**Difficulty:** Easy

**Learning Objective:** Test subset relationships with `<=`.

**Problem:** Write a program that reads two lines of integers (A then B) and prints `Subset` if every element of A is in B, otherwise `Not subset`.

**Input:** Two lines: set A, then set B.

**Output:** Print `Subset` or `Not subset`.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3
1 2 3 4 5

Output:
Subset
```
**Explanation:** A is contained in B.

**Hint:** `if A <= B:`.

---

## Q324. Sum of Unique Elements

**Difficulty:** Easy

**Learning Objective:** Sum the distinct values of a list using a set.

**Problem:** Write a program that reads a list of integers and prints the sum of its distinct values.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the sum of unique values.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
2 3 2 4 3 5

Output:
14
```
**Explanation:** Unique values 2+3+4+5 = 14.

**Hint:** `sum(set(lst))`.

---

## Q325. Create a Tuple from a List

**Difficulty:** Easy

**Learning Objective:** Convert a list to a tuple.

**Problem:** Write a program that reads a list of integers and prints it as a tuple.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the tuple of the values.

**Constraints:**
- Between 1 and 20 integers.

**Example:**
```
Input:
5 6 7

Output:
(5, 6, 7)
```
**Explanation:** The values become a tuple.

**Hint:** `tuple(lst)`.

---

## Q326. Unpack a Three-Element Tuple

**Difficulty:** Easy

**Learning Objective:** Unpack a three-element tuple into three variables.

**Problem:** Write a program that reads three integers, stores them in a tuple, unpacks them, and prints their average as a decimal.

**Input:** Three lines: integers `a`, `b`, `c`.

**Output:** Print the value of `(a + b + c) / 3`.

**Constraints:**
- `0 <= a, b, c <= 10**6`

**Example:**
```
Input:
4
6
8

Output:
6.0
```
**Explanation:** Average of 4, 6, 8 is 6.0.

**Hint:** `x, y, z = t` then average.

---

## Q327. Count Vowels Using a Set

**Difficulty:** Easy

**Learning Objective:** Use a set to check membership in a group of characters.

**Problem:** Write a program that reads a string and prints the number of vowels (`a, e, i, o, u`, case-insensitive) using a set of vowels.

**Input:** A single line containing a string `s`.

**Output:** Print a single integer equal to the vowel count.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
Hello World

Output:
3
```
**Explanation:** Vowels e, o, o → 3.

**Hint:** Define `vowels = set("aeiou")` and check `ch.lower() in vowels`.

---

## Q328. Elements Present in Both Sets (print as list)

**Difficulty:** Easy

**Learning Objective:** Convert a set operation result to a list.

**Problem:** Write a program that reads two lines of integers and prints the common values as a list (any order).

**Input:** Two lines, each containing space-separated integers.

**Output:** Print the list of common values.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4
3 4 5 6

Output:
[3, 4]
```
**Explanation:** Common values as a list.

**Hint:** `list(set(A) & set(B))`.

---

## Q329. Number of Unique Vowels in a String

**Difficulty:** Easy

**Learning Objective:** Count distinct vowels using set intersection.

**Problem:** Write a program that reads a string and prints the number of distinct vowels it contains.

**Input:** A single line containing a string `s`.

**Output:** Print a single integer equal to the number of distinct vowels.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
beautiful

Output:
4
```
**Explanation:** "beautiful" has vowels e, a, u, i (u repeats), so distinct vowels are e, a, u, i → 4.

**Hint:** `len(set of lowercase letters & vowels)`.

---

## Q330. Swap Two Numbers Using a Tuple

**Difficulty:** Easy

**Learning Objective:** Use tuple packing/unpacking to swap values.

**Problem:** Write a program that reads two integers and prints them in swapped order (swap using tuple unpacking).

**Input:** Two lines: integers `a` and `b`.

**Output:** Print the two values swapped, each on its own line.

**Constraints:**
- `-10**6 <= a, b <= 10**6`

**Example:**
```
Input:
3
7

Output:
7
3
```
**Explanation:** The values are swapped.

**Hint:** `a, b = b, a` (tuple unpacking).

---

## Q331. Tuple Indexing: Print the 2nd and 3rd Elements

**Difficulty:** Easy → Medium

**Learning Objective:** Access elements at specific positions of a tuple.

**Problem:** Write a program that reads a tuple of integers (space-separated) and prints its 2nd and 3rd elements.

**Input:** A single line containing at least 3 integers.

**Output:** Print the element at index 1 and the element at index 2, each on its own line.

**Constraints:**
- The tuple has between 3 and 20 elements.

**Example:**
```
Input:
10 20 30 40

Output:
20
30
```
**Explanation:** Elements at indices 1 and 2.

**Hint:** `t[1]` and `t[2]`.

---

## Q332. Print Unique Elements in Original Order

**Difficulty:** Easy → Medium

**Learning Objective:** Deduplicate a list while preserving order using a set for fast checking.

**Problem:** Write a program that reads a list of integers and prints the unique values in the order of first appearance.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the list of unique values in first-appearance order.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
4 1 4 2 1 3

Output:
[4, 1, 2, 3]
```
**Explanation:** First appearances kept.

**Hint:** Use a `seen` set and an output list.

---

## Q333. Remove Duplicates from a String (set-based)

**Difficulty:** Easy → Medium

**Learning Objective:** Deduplicate characters of a string preserving order using a set.

**Problem:** Write a program that reads a string and prints it with duplicate characters removed, preserving the order of first appearance.

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
**Explanation:** Repeated characters removed.

**Hint:** Keep a `seen` set and add each character to the result only if not seen.

---

## Q334. Intersection of Three Sets

**Difficulty:** Easy → Medium

**Learning Objective:** Apply set intersection to three sets.

**Problem:** Write a program that reads three lines of integers and prints the set of values common to all three.

**Input:** Three lines, each containing space-separated integers.

**Output:** Print the intersection of all three sets.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3 4
2 3 4 5
3 4 5 6

Output:
{3, 4}
```
**Explanation:** Values common to all three.

**Hint:** `A & B & C`.

---

## Q335. Number of Elements in A but Not in B

**Difficulty:** Easy → Medium

**Learning Objective:** Report the size of a set difference.

**Problem:** Write a program that reads two lines of integers (A then B) and prints how many values are in A but not in B.

**Input:** Two lines: set A, then set B.

**Output:** Print a single integer equal to `len(A - B)`.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4 5
2 4 6

Output:
3
```
**Explanation:** In A but not B: 1, 3, 5 → 3.

**Hint:** `len(A - B)`.

---

## Q336. Check If Two Sets Are Disjoint

**Difficulty:** Easy → Medium

**Learning Objective:** Test whether two sets share no elements.

**Problem:** Write a program that reads two lines of integers and prints `Disjoint` if the two sets have no common elements, otherwise `Not disjoint`.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print `Disjoint` or `Not disjoint`.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3
4 5 6

Output:
Disjoint
```
**Explanation:** No common elements.

**Hint:** `if len(A & B) == 0:`.

---

## Q337. Convert Each Word to a Tuple of Its Letters

**Difficulty:** Easy → Medium

**Learning Objective:** Build a list of tuples, each holding the letters of a word.

**Problem:** Write a program that reads a sentence and prints a list where each element is a tuple of the letters of each word.

**Input:** A single line containing a sentence.

**Output:** Print the list of letter-tuples.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
hi there

Output:
[('h', 'i'), ('t', 'h', 'e', 'r', 'e')]
```
**Explanation:** Each word becomes a tuple of characters.

**Hint:** `[tuple(w) for w in sentence.split()]`.

---

## Q338. Union Size of Two Sets

**Difficulty:** Easy → Medium

**Learning Objective:** Report the size of the union of two sets.

**Problem:** Write a program that reads two lines of integers and prints how many distinct values exist across both sets combined.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print a single integer equal to `len(A | B)`.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3
3 4 5

Output:
5
```
**Explanation:** Union is {1,2,3,4,5}, size 5.

**Hint:** `len(A | B)`.

---

## Q339. Print the Second Element of Each Tuple in a List of Tuples

**Difficulty:** Easy → Medium

**Learning Objective:** Iterate over a list of tuples and access an element of each.

**Problem:** Write a program that reads `n`, then `n` lines each with two space-separated integers, builds a list of tuples, and prints the second element of each tuple.

**Input:** Line 1: `n`. Then `n` lines with two integers each.

**Output:** Print the second element of each tuple, one per line.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
3
1 9
2 8
3 7

Output:
9
8
7
```
**Explanation:** The second value of each tuple.

**Hint:** Build tuples `(a, b)` and print `t[1]` for each.

---

## Q340. Check If a String Has All Unique Characters

**Difficulty:** Medium

**Learning Objective:** Use a set to detect duplicate characters.

**Problem:** Write a program that reads a string and prints `Unique` if all its characters are distinct, otherwise `Duplicate`.

**Input:** A single line containing a string `s`.

**Output:** Print `Unique` or `Duplicate`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
python

Output:
Unique
```
**Explanation:** No character repeats.

**Hint:** Compare `len(s)` with `len(set(s))`.

---

## Q341. Sum of Common Elements

**Difficulty:** Medium

**Learning Objective:** Sum the elements in the intersection of two sets.

**Problem:** Write a program that reads two lines of integers and prints the sum of the values that are common to both sets.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print a single integer equal to the sum of the intersection.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4
3 4 5

Output:
7
```
**Explanation:** Common values 3 and 4 sum to 7.

**Hint:** `sum(A & B)`.

---

## Q342. Difference of Sets as a Sorted List

**Difficulty:** Medium

**Learning Objective:** Sort the result of a set operation.

**Problem:** Write a program that reads two lines of integers and prints the difference `A - B` as a sorted list.

**Input:** Two lines: set A, then set B.

**Output:** Print the sorted list of `A - B`.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
5 1 3 2 4
2 4

Output:
[1, 3, 5]
```
**Explanation:** `A - B` is {1,3,5}, sorted.

**Hint:** `sorted(A - B)`.

---

## Q343. Check Whether Two Tuples Are Equal

**Difficulty:** Medium

**Learning Objective:** Compare two tuples for equality (order matters).

**Problem:** Write a program that reads two lines of integers and prints `Equal` if the two tuples are identical (same elements in same order), otherwise `Not equal`.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print `Equal` or `Not equal`.

**Constraints:**
- Each tuple has between 1 and 10 elements.

**Example:**
```
Input:
1 2 3
1 2 3

Output:
Equal
```
**Explanation:** The tuples match element-for-element.

**Hint:** `if t1 == t2:`.

---

## Q344. Elements in Exactly One of Two Sets (list form)

**Difficulty:** Medium

**Learning Objective:** Convert symmetric difference to a sorted list.

**Problem:** Write a program that reads two lines of integers and prints the values that are in exactly one set, as a sorted list.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print the sorted list of the symmetric difference.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3
3 4 5

Output:
[1, 2, 4, 5]
```
**Explanation:** Values in exactly one set, sorted.

**Hint:** `sorted(A ^ B)`.

---

## Q345. Max and Min of a Set

**Difficulty:** Medium

**Learning Objective:** Find the max and min of a set.

**Problem:** Write a program that reads a line of space-separated integers and prints the maximum and minimum distinct values.

**Input:** A single line containing integers separated by spaces.

**Output:** Print `Max: <max>` and `Min: <min>` on two lines.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
4 9 2 9 7

Output:
Max: 9
Min: 2
```
**Explanation:** Max is 9, min is 2.

**Hint:** `max(s)` and `min(s)`.

---

## Q346. Number of Unique Digits in a Number

**Difficulty:** Medium

**Learning Objective:** Count distinct digits of a number using a set.

**Problem:** Write a program that reads a positive integer and prints how many distinct digits it has.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print a single integer equal to the count of distinct digits.

**Constraints:**
- `1 <= n <= 10**12`

**Example:**
```
Input:
112233

Output:
3
```
**Explanation:** Distinct digits are 1, 2, 3.

**Hint:** `len(set(str(n)))`.

---

## Q347. Union of Two Lists' Elements

**Difficulty:** Medium

**Learning Objective:** Find all distinct values from two lists using union.

**Problem:** Write a program that reads two lines of integers and prints all distinct values that appear in either list, as a list (any order).

**Input:** Two lines, each containing space-separated integers.

**Output:** Print the list of all unique values.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3
3 4 5

Output:
[1, 2, 3, 4, 5]
```
**Explanation:** All distinct values from both.

**Hint:** `list(set(A) | set(B))`.

---

## Q348. Tuple of Squares

**Difficulty:** Medium

**Learning Objective:** Build a tuple of computed values.

**Problem:** Write a program that reads a line of integers and prints a tuple where each element is the square of the corresponding input value.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the tuple of squares.

**Constraints:**
- Between 1 and 20 integers.

**Example:**
```
Input:
2 3 4

Output:
(4, 9, 16)
```
**Explanation:** Squares of 2, 3, 4.

**Hint:** Collect `x ** 2` for each and convert to a tuple.

---

## Q349. Check If a Set Is Empty

**Difficulty:** Medium

**Learning Objective:** Test whether a set is empty.

**Problem:** Write a program that reads a line of space-separated integers. If the line is empty (no numbers), print `Empty`; otherwise print the set. (An empty line is a valid input.)

**Input:** A single line, possibly empty.

**Output:** Print `Empty` if there are no numbers, otherwise print the set.

**Constraints:**
- Between 0 and 20 integers.

**Example:**
```
Input:
(empty line)

Output:
Empty
```
**Explanation:** No numbers were provided.

**Hint:** If `len(s) == 0` or the set is empty, print `Empty`.

---

## Q350. Elements in First Set Only (sorted list)

**Difficulty:** Medium

**Learning Objective:** Report the values unique to the first set.

**Problem:** Write a program that reads two lines of integers (A then B) and prints the values that are in A but not in B, as a sorted list.

**Input:** Two lines: set A, then set B.

**Output:** Print the sorted list of `A - B`.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4 5
2 4 6

Output:
[1, 3, 5]
```
**Explanation:** Values in A but not in B.

**Hint:** `sorted(A - B)`.

---

## Q351. Count of Even and Odd Elements in a Tuple

**Difficulty:** Medium

**Learning Objective:** Classify tuple elements by parity.

**Problem:** Write a program that reads a line of integers, builds a tuple, and prints the count of even and odd elements.

**Input:** A single line containing integers separated by spaces.

**Output:** Print two integers on one line: even count, then odd count.

**Constraints:**
- Between 1 and 20 integers.

**Example:**
```
Input:
1 2 3 4 5 6

Output:
3 3
```
**Explanation:** Evens 2,4,6 (3); odds 1,3,5 (3).

**Hint:** Loop over the tuple and count by `% 2`.

---

## Q352. Common Characters of Two Strings (set)

**Difficulty:** Medium

**Learning Objective:** Find characters shared by two strings using set intersection.

**Problem:** Write a program that reads two strings and prints a sorted list of the characters common to both (each distinct character once).

**Input:** Two lines: string `a`, then string `b`.

**Output:** Print the sorted list of common characters.

**Constraints:**
- `1 <= len(a), len(b) <= 100`

**Example:**
```
Input:
hello
world

Output:
['l', 'o']
```
**Explanation:** Characters l and o are in both.

**Hint:** `sorted(set(a) & set(b))`.

---

## Q353. Sum of Even Elements of a Set

**Difficulty:** Medium

**Learning Objective:** Sum even values in a set.

**Problem:** Write a program that reads a line of integers and prints the sum of the even numbers among the distinct values.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the sum of even distinct values.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 2 3 4 4 6

Output:
12
```
**Explanation:** Distinct evens are 2, 4, 6 → sum 12.

**Hint:** `sum(x for x in s if x % 2 == 0)`.

---

## Q354. Unpack a Tuple to Swap (three values)

**Difficulty:** Medium

**Learning Objective:** Rotate three values using tuple unpacking.

**Problem:** Write a program that reads three integers and prints them rotated right by one position (the last moves to the front), using tuple unpacking.

**Input:** Three lines: integers `a`, `b`, `c`.

**Output:** Print the three values in rotated order, each on its own line.

**Constraints:**
- `-10**6 <= a, b, c <= 10**6`

**Example:**
```
Input:
1
2
3

Output:
3
1
2
```
**Explanation:** The values rotate so the last becomes first.

**Hint:** `a, b, c = c, a, b`.

---

## Q355. Distinct Pairs Count (number of unique combinations of two sets)

**Difficulty:** Medium

**Learning Objective:** Count distinct ordered pairs formed from two sets.

**Problem:** Write a program that reads two lines of integers (sets A and B) and prints the number of distinct ordered pairs `(x, y)` where `x` is from A and `y` is from B.

**Input:** Two lines: set A, then set B.

**Output:** Print a single integer equal to `len(A) * len(B)`.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3
7 8

Output:
6
```
**Explanation:** 3 choices for x × 2 for y = 6 pairs.

**Hint:** The count is the product of the two set sizes.

---

## Q356. Elements Repeated in a List (duplicates report)

**Difficulty:** Medium

**Learning Objective:** Find values that appear more than once.

**Problem:** Write a program that reads a list of integers and prints a set of the values that appear more than once.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the set of duplicate values.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 2 3 3 3 4

Output:
{2, 3}
```
**Explanation:** 2 and 3 are repeated.

**Hint:** Track seen values and a duplicates set.

---

## Q357. Tuple of the First and Last Digits of a Number

**Difficulty:** Medium

**Learning Objective:** Extract the first and last digits and form a tuple.

**Problem:** Write a program that reads a positive integer and prints a tuple of its first and last digits.

**Input:** A single line containing an integer `n` (`n >= 10`).

**Output:** Print a tuple `(first_digit, last_digit)`.

**Constraints:**
- `10 <= n <= 10**12`

**Example:**
```
Input:
3825

Output:
(3, 5)
```
**Explanation:** First digit 3, last digit 5.

**Hint:** Convert to string, use `s[0]` and `s[-1]`.

---

## Q358. Set of All Digits from a String

**Difficulty:** Medium

**Learning Objective:** Extract all digit characters into a set.

**Problem:** Write a program that reads a string and prints a set of all the distinct digit characters it contains.

**Input:** A single line containing a string `s`.

**Output:** Print the set of distinct digits (as characters).

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
a1b2c3a1

Output:
{'1', '2', '3'}
```
**Explanation:** The distinct digit characters.

**Hint:** Loop and add characters that are digits to a set.

---

## Q359. Check If a List Has Duplicates (set-based)

**Difficulty:** Medium

**Learning Objective:** Detect duplicates by comparing list and set lengths.

**Problem:** Write a program that reads a list of integers and prints `Duplicate` if any value repeats, otherwise `Unique`.

**Input:** A single line containing integers separated by spaces.

**Output:** Print `Duplicate` or `Unique`.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 2

Output:
Duplicate
```
**Explanation:** 2 repeats.

**Hint:** Compare `len(lst)` with `len(set(lst))`.

---

## Q360. Sum of Distinct Elements Across Two Lists

**Difficulty:** Medium

**Learning Objective:** Sum the union of two lists' values.

**Problem:** Write a program that reads two lines of integers and prints the sum of all distinct values that appear in either list.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print a single integer equal to the sum of the union.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3
3 4 5

Output:
15
```
**Explanation:** Union {1,2,3,4,5} sums to 15.

**Hint:** `sum(set(A) | set(B))`.

---

## Q361. Elements in A and B but Not in C

**Difficulty:** Medium → Hard

**Learning Objective:** Combine multiple set operations.

**Problem:** Write a program that reads three lines of integers (sets A, B, C) and prints the set of values that are in A, in B, but not in C.

**Input:** Three lines: set A, set B, set C.

**Output:** Print the resulting set.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3 4 5
3 4 5 6 7
5 6 7 8

Output:
{3, 4}
```
**Explanation:** Values in A and B: {3,4,5}; remove those in C (5) → {3,4}.

**Hint:** `(A & B) - C`.

---

## Q362. Number of Values in Only One of Two Sets

**Difficulty:** Medium → Hard

**Learning Objective:** Report the size of the symmetric difference.

**Problem:** Write a program that reads two lines of integers and prints how many values are in exactly one of the two sets.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print a single integer equal to `len(A ^ B)`.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3
3 4 5

Output:
4
```
**Explanation:** {1,2,4,5} → size 4.

**Hint:** `len(A ^ B)`.

---

## Q363. Tuple of Positions of a Character in a String

**Difficulty:** Medium → Hard

**Learning Objective:** Collect the indices where a character occurs into a tuple.

**Problem:** Write a program that reads a string and a character, then prints a tuple of the indices where that character appears.

**Input:** Two lines: a string `s`, then a character `ch`.

**Output:** Print the tuple of indices.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
banana
a

Output:
(1, 3, 5)
```
**Explanation:** The letter "a" appears at indices 1, 3, 5.

**Hint:** Loop over the string with an index counter and collect matches.

---

## Q364. Common Elements of All Lists (three lists)

**Difficulty:** Medium → Hard

**Learning Objective:** Find values common to three lists using sets.

**Problem:** Write a program that reads three lines of integers and prints the set of values present in all three.

**Input:** Three lines, each containing space-separated integers.

**Output:** Print the intersection set.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4
2 3 4 5
3 4 5 6

Output:
{3, 4}
```
**Explanation:** Values common to all three.

**Hint:** `set(A) & set(B) & set(C)`.

---

## Q365. Check If Set A Is a Superset of B

**Difficulty:** Medium → Hard

**Learning Objective:** Test superset relationships with `>=`.

**Problem:** Write a program that reads two lines of integers (A then B) and prints `Superset` if every element of B is in A, otherwise `Not superset`.

**Input:** Two lines: set A, then set B.

**Output:** Print `Superset` or `Not superset`.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3 4 5
2 4

Output:
Superset
```
**Explanation:** A contains all of B.

**Hint:** `if A >= B:`.

---

## Q366. Tuple of the Lengths of Words in a Sentence

**Difficulty:** Medium → Hard

**Learning Objective:** Build a tuple of word lengths.

**Problem:** Write a program that reads a sentence and prints a tuple where each element is the length of the corresponding word.

**Input:** A single line containing a sentence.

**Output:** Print the tuple of lengths.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
I love Python

Output:
(1, 4, 6)
```
**Explanation:** Lengths of I, love, Python.

**Hint:** `tuple(len(w) for w in sentence.split())`.

---

## Q367. Set of First Letters of Words

**Difficulty:** Medium → Hard

**Learning Objective:** Collect distinct first letters of words.

**Problem:** Write a program that reads a sentence and prints the set of first letters of its words.

**Input:** A single line containing a sentence.

**Output:** Print the set of first letters.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
apple banana cherry apple

Output:
{'a', 'c', 'b'}
```
**Explanation:** First letters are a, b, c.

**Hint:** `set(w[0] for w in sentence.split())`.

---

## Q368. Sum of Two Tuple Elements at Same Index

**Difficulty:** Medium → Hard

**Learning Objective:** Combine elements from two tuples by position.

**Problem:** Write a program that reads two lines of integers of equal length, forms two tuples, and prints a tuple where each element is the sum of the corresponding elements of the two tuples.

**Input:** Two lines, each containing space-separated integers of the same length.

**Output:** Print the tuple of sums.

**Constraints:**
- Each tuple has between 1 and 10 elements.

**Example:**
```
Input:
1 2 3
10 20 30

Output:
(11, 22, 33)
```
**Explanation:** Each position is summed.

**Hint:** Loop over indices and build a tuple of `t1[i] + t2[i]`.

---

## Q369. Remove Elements Present in B from A (set)

**Difficulty:** Medium → Hard

**Learning Objective:** Remove the elements of one set from another.

**Problem:** Write a program that reads two lines of integers (A then B) and prints set A after removing every element that also appears in B.

**Input:** Two lines: set A, then set B.

**Output:** Print the updated set.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3 4 5
2 4 6

Output:
{1, 3, 5}
```
**Explanation:** Elements in B are removed from A.

**Hint:** `A - B`.

---

## Q370. Count of Vowels in Each Word (tuple)

**Difficulty:** Medium → Hard

**Learning Objective:** Count vowels per word and store in a tuple.

**Problem:** Write a program that reads a sentence and prints a tuple where each element is the number of vowels in the corresponding word.

**Input:** A single line containing a sentence.

**Output:** Print the tuple of vowel counts.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
hello world

Output:
(2, 1)
```
**Explanation:** "hello" has 2 vowels, "world" has 1.

**Hint:** For each word, count letters in the vowel set.

---

## Q371. Largest and Second Largest Distinct Values

**Difficulty:** Medium → Hard

**Learning Objective:** Find the top two distinct values using a set.

**Problem:** Write a program that reads a line of integers and prints the largest and second largest distinct values.

**Input:** A single line containing at least 2 distinct integers.

**Output:** Print `Largest: <max>` and `Second: <second>` on two lines.

**Constraints:**
- Between 2 and 100 integers with at least 2 distinct values.

**Example:**
```
Input:
3 9 1 9 7 7

Output:
Largest: 9
Second: 7
```
**Explanation:** Largest 9, second largest 7.

**Hint:** Convert to a set, sort descending, take first two.

---

## Q372. Are Two Sets Equal?

**Difficulty:** Medium → Hard

**Learning Objective:** Test set equality (ignores order and duplicates).

**Problem:** Write a program that reads two lines of integers and prints `Equal` if the two sets contain the same elements, otherwise `Not equal`.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print `Equal` or `Not equal`.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3
3 1 2

Output:
Equal
```
**Explanation:** Both sets are {1,2,3}.

**Hint:** `if set(A) == set(B):`.

---

## Q373. Elements Present in Both, in Sorted Order

**Difficulty:** Medium → Hard

**Learning Objective:** Present a set operation result in sorted order.

**Problem:** Write a program that reads two lines of integers and prints the common values as a sorted list.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print the sorted list of common values.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
4 1 3 2
5 3 4 6

Output:
[3, 4]
```
**Explanation:** Common values 3, 4 sorted.

**Hint:** `sorted(set(A) & set(B))`.

---

## Q374. Number of Unique Vowels Across a Sentence

**Difficulty:** Medium → Hard

**Learning Objective:** Count distinct vowels in a sentence using set intersection.

**Problem:** Write a program that reads a sentence and prints the number of distinct vowels (a, e, i, o, u, case-insensitive) it contains.

**Input:** A single line containing a sentence.

**Output:** Print a single integer equal to the count.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
Hello beautiful world

Output:
5
```
**Explanation:** Vowels present: e,o,u,a,i → 5.

**Hint:** `len(set(sentence.lower()) & set("aeiou"))`.

---

## Q375. Elements in First or Second But Not Third

**Difficulty:** Medium → Hard

**Learning Objective:** Combine union and difference across three sets.

**Problem:** Write a program that reads three lines of integers (A, B, C) and prints the set of values that are in A or B but not in C.

**Input:** Three lines: set A, set B, set C.

**Output:** Print the resulting set.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3
3 4 5
4 5 6

Output:
{1, 2, 3}
```
**Explanation:** A or B is {1,2,3,4,5}; remove C's elements {4,5} → {1,2,3}.

**Hint:** `(A | B) - C`.

---

## Q376. Tuple of the First and Last Elements of a List

**Difficulty:** Medium → Hard

**Learning Objective:** Combine list indexing with tuple creation.

**Problem:** Write a program that reads a list of integers and prints a tuple of its first and last elements.

**Input:** A single line containing at least 2 integers.

**Output:** Print a tuple `(first, last)`.

**Constraints:**
- Between 2 and 100 integers.

**Example:**
```
Input:
3 5 7 2

Output:
(3, 2)
```
**Explanation:** First is 3, last is 2.

**Hint:** `(lst[0], lst[-1])`.

---

## Q377. Number of Distinct Common Elements Across Two Strings

**Difficulty:** Medium → Hard

**Learning Objective:** Count distinct shared characters of two strings.

**Problem:** Write a program that reads two strings and prints the number of distinct characters common to both.

**Input:** Two lines: string `a`, then string `b`.

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= len(a), len(b) <= 100`

**Example:**
```
Input:
hello
world

Output:
2
```
**Explanation:** Common characters are l and o → 2.

**Hint:** `len(set(a) & set(b))`.

---

## Q378. Set of Digits Present in a Number

**Difficulty:** Medium → Hard

**Learning Objective:** Extract the distinct digits of a number into a set.

**Problem:** Write a program that reads a positive integer and prints a set of its digits.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print the set of distinct digits.

**Constraints:**
- `1 <= n <= 10**12`

**Example:**
```
Input:
12245

Output:
{'1', '2', '4', '5'}
```
**Explanation:** Distinct digits as characters.

**Hint:** `set(str(n))`.

---

## Q379. Sum of Distinct Elements in a List

**Difficulty:** Medium → Hard

**Learning Objective:** Use a set to sum unique values in a list.

**Problem:** Write a program that reads a list of integers and prints the sum of its distinct values.

**Input:** A single line containing integers separated by spaces.

**Output:** Print a single integer equal to the sum of unique values.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 2 3 3 3 4

Output:
10
```
**Explanation:** Unique values 1+2+3+4 = 10.

**Hint:** `sum(set(lst))`.

---

## Q380. Tuple of Multiples of a Number

**Difficulty:** Medium → Hard

**Learning Objective:** Build a tuple of the first n multiples of a number.

**Problem:** Write a program that reads a number `k` and a count `n`, then prints a tuple of the first `n` multiples of `k`.

**Input:** Two lines: integers `k` and `n`.

**Output:** Print the tuple `(k, 2k, 3k, ..., nk)`.

**Constraints:**
- `1 <= k <= 20`
- `1 <= n <= 20`

**Example:**
```
Input:
5
4

Output:
(5, 10, 15, 20)
```
**Explanation:** First 4 multiples of 5.

**Hint:** Build a tuple with a loop.

---

## Q381. Number of Elements Only in A (size of A-B)

**Difficulty:** Hard

**Learning Objective:** Report how many elements belong exclusively to A.

**Problem:** Write a program that reads two lines of integers (A then B) and prints how many values are in A but not in B.

**Input:** Two lines: set A, then set B.

**Output:** Print a single integer equal to `len(A - B)`.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4 5
2 4

Output:
3
```
**Explanation:** In A not in B: 1, 3, 5 → 3.

**Hint:** `len(A - B)`.

---

## Q382. Second Largest Distinct Value

**Difficulty:** Hard

**Learning Objective:** Find the second largest distinct value.

**Problem:** Write a program that reads a line of integers and prints the second largest distinct value. (There are at least 2 distinct values.)

**Input:** A single line containing integers separated by spaces.

**Output:** Print the second largest distinct value.

**Constraints:**
- Between 2 and 100 integers with at least 2 distinct values.

**Example:**
```
Input:
7 3 9 1 9 3

Output:
7
```
**Explanation:** Distinct sorted descending: 9, 7, 3, 1 → second is 7.

**Hint:** Sort the set descending and take the second element.

---

## Q383. Elements of A Not in B, in Order of A

**Difficulty:** Hard

**Learning Objective:** Filter list A keeping order, removing values present in set B.

**Problem:** Write a program that reads a list A (line 1) and a set B (line 2), and prints a list of the elements of A that are not in B, preserving A's order.

**Input:** Line 1: list A. Line 2: set B.

**Output:** Print the filtered list.

**Constraints:**
- Each has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4 5
2 4 6

Output:
[1, 3, 5]
```
**Explanation:** Elements of A not in B, in order.

**Hint:** Convert B to a set and use `in`.

---

## Q384. Check If a String Is a Permutation of Another (sets + counts)

**Difficulty:** Hard

**Learning Objective:** Verify two strings use the same characters with the same frequencies.

**Problem:** Write a program that reads two strings and prints `Permutation` if they contain exactly the same characters with the same counts (order can differ), otherwise `Not permutation`.

**Input:** Two lines: string `a`, then string `b`.

**Output:** Print `Permutation` or `Not permutation`.

**Constraints:**
- `1 <= len(a), len(b) <= 100`

**Example:**
```
Input:
abc
cba

Output:
Permutation
```
**Explanation:** Both contain a, b, c.

**Hint:** Compare `sorted(a)` with `sorted(b)` (as in anagrams).

---

## Q385. Union of Three Sets

**Difficulty:** Hard

**Learning Objective:** Compute the union of three sets.

**Problem:** Write a program that reads three lines of integers and prints the set of all distinct values from all three.

**Input:** Three lines, each containing space-separated integers.

**Output:** Print the union of all three sets.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2
2 3
3 4

Output:
{1, 2, 3, 4}
```
**Explanation:** All distinct values.

**Hint:** `A | B | C`.

---

## Q386. Tuple of Index Pairs Where Elements Match

**Difficulty:** Hard

**Learning Objective:** Collect matching indices between two lists into a tuple.

**Problem:** Write a program that reads two lists of equal length and prints a tuple of the indices where the two lists have equal values.

**Input:** Two lines, each containing space-separated integers of the same length.

**Output:** Print the tuple of matching indices.

**Constraints:**
- Each list has between 1 and 10 elements.

**Example:**
```
Input:
1 2 3 4
1 5 3 4

Output:
(0, 2, 3)
```
**Explanation:** Elements match at indices 0, 2, 3.

**Hint:** Loop over indices and collect matches.

---

## Q387. Number of Distinct Characters Common to All Words

**Difficulty:** Hard

**Learning Objective:** Find characters that appear in every word of a sentence.

**Problem:** Write a program that reads a sentence and prints the set of characters that appear in every word (case-sensitive).

**Input:** A single line containing a sentence.

**Output:** Print the set of common characters.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
cat cut cot

Output:
{'t'}
```
**Explanation:** "t" appears in all three words.

**Hint:** Start with the set of the first word and intersect with each subsequent word's set.

---

## Q388. Check Whether a Set Contains Only Even Numbers

**Difficulty:** Hard

**Learning Objective:** Test a property across all set elements.

**Problem:** Write a program that reads a line of integers and prints `All even` if every distinct value is even, otherwise `Not all even`.

**Input:** A single line containing integers separated by spaces.

**Output:** Print `All even` or `Not all even`.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
2 4 6 8

Output:
All even
```
**Explanation:** All values are even.

**Hint:** Loop over the set; if any value is odd, it's not all even.

---

## Q389. Pair of First and Last Vowels in a String

**Difficulty:** Hard

**Learning Objective:** Find the first and last vowel in a string and return them as a tuple.

**Problem:** Write a program that reads a string and prints a tuple of its first vowel and its last vowel. If the string has no vowels, print `None`.

**Input:** A single line containing a string `s`.

**Output:** Print the tuple of the first and last vowel, or `None`.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
beautiful

Output:
('e', 'u')
```
**Explanation:** First vowel e, last vowel u.

**Hint:** Loop to find the first vowel, then loop from the end to find the last.

---

## Q390. Values Present in All of Three Lists (sorted list)

**Difficulty:** Hard

**Learning Objective:** Present the three-way intersection as a sorted list.

**Problem:** Write a program that reads three lines of integers and prints the values common to all three as a sorted list.

**Input:** Three lines, each containing space-separated integers.

**Output:** Print the sorted list of common values.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
5 1 3 2
2 4 3 5
3 2 5 7

Output:
[2, 3, 5]
```
**Explanation:** Values common to all three, sorted.

**Hint:** `sorted(set(A) & set(B) & set(C))`.

---

## Q391. Distinct Characters That Appear Only Once

**Difficulty:** Hard

**Learning Objective:** Find characters that occur exactly once.

**Problem:** Write a program that reads a string and prints a sorted list of the characters that appear exactly once.

**Input:** A single line containing a string `s`.

**Output:** Print the sorted list of single-occurrence characters.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
aabbccd

Output:
['d']
```
**Explanation:** Only "d" appears once.

**Hint:** Use `.count()` or a seen/duplicate set approach.

---

## Q392. Tuple of Unique Elements in Order

**Difficulty:** Hard

**Learning Objective:** Produce a tuple of unique values preserving first-appearance order.

**Problem:** Write a program that reads a list of integers and prints a tuple of its unique values in the order of first appearance.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the tuple of unique values.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
4 1 4 2 1 3

Output:
(4, 1, 2, 3)
```
**Explanation:** Unique values in first-appearance order.

**Hint:** Use a `seen` set and a result list, then convert to tuple.

---

## Q393. Are All Elements of A in B (subset, list inputs)

**Difficulty:** Hard

**Learning Objective:** Test subset using set conversion on lists.

**Problem:** Write a program that reads two lines of integers (A then B) and prints `Subset` if every element of A appears in B, otherwise `Not subset`.

**Input:** Two lines: list A, then list B.

**Output:** Print `Subset` or `Not subset`.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 2 3
1 2 3 4 5

Output:
Subset
```
**Explanation:** A is contained in B.

**Hint:** `if set(A) <= set(B):`.

---

## Q394. Sum of the First and Last Elements of a Tuple

**Difficulty:** Hard

**Learning Objective:** Access and combine tuple endpoints.

**Problem:** Write a program that reads a tuple of integers (space-separated) and prints the sum of its first and last elements.

**Input:** A single line containing at least 2 integers.

**Output:** Print a single integer equal to `t[0] + t[-1]`.

**Constraints:**
- Between 2 and 20 integers.

**Example:**
```
Input:
3 5 7 2

Output:
5
```
**Explanation:** `3 + 2 = 5`.

**Hint:** `t[0] + t[-1]`.

---

## Q395. Count of Numbers in Both A and B, Counted by Value Frequency

**Difficulty:** Hard

**Learning Objective:** Count how many distinct values are present in both lists, weighted by nothing (simple intersection count).

**Problem:** Write a program that reads two lines of integers and prints the number of distinct values common to both lists.

**Input:** Two lines, each containing space-separated integers.

**Output:** Print a single integer equal to the count of common distinct values.

**Constraints:**
- Each line has between 1 and 100 integers.

**Example:**
```
Input:
1 1 2 3
2 2 3 4

Output:
2
```
**Explanation:** Common distinct values are 2 and 3 → 2.

**Hint:** `len(set(A) & set(B))`.

---

## Q396. Second Smallest Distinct Value

**Difficulty:** Hard

**Learning Objective:** Find the second smallest distinct value.

**Problem:** Write a program that reads a line of integers and prints the second smallest distinct value. (There are at least 2 distinct values.)

**Input:** A single line containing integers separated by spaces.

**Output:** Print the second smallest distinct value.

**Constraints:**
- Between 2 and 100 integers with at least 2 distinct values.

**Example:**
```
Input:
5 2 8 2 1

Output:
2
```
**Explanation:** Distinct sorted: 1, 2, 5, 8 → second is 2.

**Hint:** Sort the set ascending and take the second element.

---

## Q397. Tuple of Characters That Are Digits and Their Positions

**Difficulty:** Hard

**Learning Objective:** Collect positions of digit characters in a string into a tuple.

**Problem:** Write a program that reads a string and prints a tuple of the indices where the characters are digits.

**Input:** A single line containing a string `s`.

**Output:** Print the tuple of digit indices.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
a1b2c3

Output:
(1, 3, 5)
```
**Explanation:** Digits are at indices 1, 3, 5.

**Hint:** Loop with an index and collect matches.

---

## Q398. Symmetric Difference of Three Sets

**Difficulty:** Hard

**Learning Objective:** Compute the symmetric difference of three sets.

**Problem:** Write a program that reads three lines of integers (A, B, C) and prints the set of values that appear an odd number of times across the three sets.

**Input:** Three lines: set A, set B, set C.

**Output:** Print the resulting set.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3
2 3 4
3 4 5

Output:
{1, 3, 5}
```
**Explanation:** 1 appears once, 3 appears three times, 5 appears once — all odd counts.

**Hint:** The symmetric difference keeps values appearing an odd number of times. Compute `A ^ B ^ C`.

---

## Q399. Number of Elements Present in Exactly Two of Three Sets

**Difficulty:** Hard

**Learning Objective:** Count values appearing in exactly two of three sets.

**Problem:** Write a program that reads three lines of integers (A, B, C) and prints how many distinct values appear in exactly two of the three sets.

**Input:** Three lines: set A, set B, set C.

**Output:** Print a single integer equal to the count.

**Constraints:**
- Each line has between 1 and 20 integers.

**Example:**
```
Input:
1 2 3
2 3 4
3 4 5

Output:
2
```
**Explanation:** 2 appears in A,B (2); 4 appears in B,C (2). Values in exactly two sets are 2 and 4 → 2.

**Hint:** Count, for each value in the union, how many sets contain it.

---

## Q400. Tuple of Values Appearing Exactly Once in a List

**Difficulty:** Hard

**Learning Objective:** Find values that occur exactly once and return them as a tuple (in first-appearance order).

**Problem:** Write a program that reads a list of integers and prints a tuple of the values that appear exactly once, in the order of their first appearance.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the tuple of single-occurrence values.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 2 3 4 4 5

Output:
(1, 3, 5)
```
**Explanation:** 1, 3, 5 each appear once.

**Hint:** Determine which values appear exactly once, then build a tuple in first-appearance order.
