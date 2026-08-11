# Topic Drill 09 — Tuples

30 focused questions on: creating tuples, indexing, unpacking, and tuple methods.

**How to run:** Read input with `input()`, process, and `print()` the result.

---

## Q1. Create a Tuple
**Difficulty:** Very Easy
**Problem:** Create the tuple `(1, 2, 3)` and print it.
**Input:** None.
**Output:** Print `(1, 2, 3)`.
**Hint:** `t = (1, 2, 3)`.

## Q2. Length of a Tuple
**Difficulty:** Very Easy
**Problem:** Read a line of space-separated integers, form a tuple, and print its length.
**Input:** A single line.
**Output:** The count.
**Example:**
```
Input:
1 2 3
Output:
3
```
**Hint:** `tuple(...)` then `len(t)`.

## Q3. Index a Tuple
**Difficulty:** Very Easy
**Problem:** Read a tuple (space-separated integers) and print the element at index 1.
**Input:** A single line.
**Output:** `t[1]`.
**Example:**
```
Input:
10 20 30
Output:
20
```
**Hint:** Index 1.

## Q4. Last Element of a Tuple
**Difficulty:** Very Easy
**Problem:** Read a tuple and print its last element.
**Input:** A single line.
**Output:** `t[-1]`.
**Example:**
```
Input:
10 20 30
Output:
30
```
**Hint:** Negative index.

## Q5. Sum of a Tuple
**Difficulty:** Easy
**Problem:** Read a tuple of integers and print their sum.
**Input:** A single line.
**Output:** The sum.
**Example:**
```
Input:
1 2 3 4
Output:
10
```
**Hint:** `sum(t)`.

## Q6. Unpack a Two-Element Tuple
**Difficulty:** Easy
**Problem:** Read two integers, form a tuple, unpack it into two variables, and print their sum.
**Input:** Two lines.
**Output:** The sum.
**Example:**
```
Input:
5
7
Output:
12
```
**Hint:** `a, b = t`.

## Q7. Unpack a Three-Element Tuple
**Difficulty:** Easy
**Problem:** Read three integers, form a tuple, unpack it, and print the average.
**Input:** Three lines.
**Output:** The average.
**Example:**
```
Input:
2
4
6
Output:
4.0
```
**Hint:** `x, y, z = t`.

## Q8. Swap Using a Tuple
**Difficulty:** Easy
**Problem:** Read two integers and print them swapped using tuple unpacking.
**Input:** Two lines.
**Output:** The swapped values.
**Example:**
```
Input:
1
2
Output:
2
1
```
**Hint:** `a, b = b, a`.

## Q9. Count an Element in a Tuple
**Difficulty:** Easy
**Problem:** Read a tuple and a value, and print how many times the value appears.
**Input:** Line 1: integers. Line 2: a value.
**Output:** The count.
**Example:**
```
Input:
1 2 2 3
2
Output:
2
```
**Hint:** `t.count(x)`.

## Q10. Index of an Element in a Tuple
**Difficulty:** Medium
**Problem:** Read a tuple and a value (present), and print the index of its first occurrence.
**Input:** Line 1: integers. Line 2: a value.
**Output:** The index.
**Example:**
```
Input:
5 8 3 8
8
Output:
1
```
**Hint:** `t.index(x)`.

## Q11. Tuple From a List
**Difficulty:** Easy
**Problem:** Read a list (space-separated integers) and print it as a tuple.
**Input:** A single line.
**Output:** Print the tuple.
**Example:**
```
Input:
1 2 3
Output:
(1, 2, 3)
```
**Hint:** `tuple(lst)`.

## Q12. First and Last of a Tuple
**Difficulty:** Easy
**Problem:** Read a tuple and print its first and last elements.
**Input:** A single line.
**Output:** Two lines.
**Example:**
```
Input:
3 7 2 9
Output:
3
9
```
**Hint:** `t[0]` and `t[-1]`.

## Q13. Slice a Tuple
**Difficulty:** Easy
**Problem:** Read a tuple and print the slice from index 1 to 3 (exclusive).
**Input:** A single line.
**Output:** The slice.
**Example:**
```
Input:
10 20 30 40
Output:
(20, 30)
```
**Hint:** `t[1:3]`.

## Q14. Tuple of a Number's Digits
**Difficulty:** Medium
**Problem:** Read a positive integer and print a tuple of its digits.
**Input:** A single integer.
**Output:** The digit tuple.
**Example:**
```
Input:
456
Output:
(4, 5, 6)
```
**Hint:** Loop over `str(n)` and convert each to int.

## Q15. Immutability Awareness (try and handle)
**Difficulty:** Medium
**Problem:** Read a tuple and print `Immutable` (do not try to change it). Just print the type of the tuple.
**Input:** A single line.
**Output:** Print `<class 'tuple'>`.
**Hint:** `type(t)`.

## Q16. Tuple Unpacking From a Function-Like Assign
**Difficulty:** Medium
**Problem:** Read a line with `a,b` (comma-separated) and unpack the two values into variables, then print their sum.
**Input:** A single line like `3,7`.
**Output:** The sum.
**Example:**
```
Input:
3,7
Output:
10
```
**Hint:** Split on comma and convert.

## Q17. Nested Tuple Access
**Difficulty:** Medium
**Problem:** Create the tuple `(1, (2, 3), 4)` and print the inner value `3` (element at index 1, then index 1 inside).
**Input:** None.
**Output:** Print `3`.
**Hint:** `t[1][1]`.

## Q18. Tuple of Squares
**Difficulty:** Medium
**Problem:** Read a list and print a tuple of the squares of its elements.
**Input:** A single line.
**Output:** The tuple of squares.
**Example:**
```
Input:
2 3 4
Output:
(4, 9, 16)
```
**Hint:** `tuple(x ** 2 for x in lst)`.

## Q19. Count Even Elements in a Tuple
**Difficulty:** Medium
**Problem:** Read a tuple and print how many elements are even.
**Input:** A single line.
**Output:** The count.
**Example:**
```
Input:
1 2 3 4 5 6
Output:
3
```
**Hint:** Loop and check `% 2`.

## Q20. Unpack With Underscore
**Difficulty:** Medium
**Problem:** Read three integers, unpack into `a`, `_`, `c` (ignoring the middle), and print `a + c`.
**Input:** Three lines.
**Output:** The sum.
**Example:**
```
Input:
1
2
3
Output:
4
```
**Hint:** Use `_` for the unused value.

## Q21. Check If a Tuple Is a Palindrome
**Difficulty:** Medium
**Problem:** Read a tuple and print `Palindrome` if it equals its reverse.
**Input:** A single line.
**Output:** `Palindrome` or `Not palindrome`.
**Example:**
```
Input:
1 2 2 1
Output:
Palindrome
```
**Hint:** Compare `t` with `t[::-1]`.

## Q22. First Element of Each of Several Tuples
**Difficulty:** Medium
**Problem:** Read `n`, then `n` lines each with two integers, and print the first element of each tuple.
**Input:** Line 1: `n`. Then `n` lines.
**Output:** First elements, one per line.
**Example:**
```
Input:
2
1 9
2 8
Output:
1
2
```
**Hint:** Form each tuple and print `t[0]`.

## Q23. Tuple of Word Lengths
**Difficulty:** Medium
**Problem:** Read a sentence and print a tuple of the lengths of its words.
**Input:** A single line.
**Output:** The tuple.
**Example:**
```
Input:
hi there
Output:
(2, 5)
```
**Hint:** `tuple(len(w) for w in sentence.split())`.

## Q24. Maximum and Minimum of a Tuple
**Difficulty:** Medium
**Problem:** Read a tuple and print its maximum and minimum.
**Input:** A single line.
**Output:** Two lines: max then min.
**Example:**
```
Input:
3 9 1 7
Output:
9
1
```
**Hint:** `max(t)` and `min(t)`.

## Q25. Concatenate Two Tuples
**Difficulty:** Medium
**Problem:** Read two lines of integers and print the concatenation of their tuples.
**Input:** Two lines.
**Output:** The combined tuple.
**Example:**
```
Input:
1 2
3 4
Output:
(1, 2, 3, 4)
```
**Hint:** `t1 + t2`.

## Q26. Sum of First and Last of a Tuple
**Difficulty:** Easy
**Problem:** Read a tuple and print the sum of its first and last elements.
**Input:** A single line.
**Output:** The sum.
**Example:**
```
Input:
3 5 7 2
Output:
5
```
**Hint:** `t[0] + t[-1]`.

## Q27. Tuple of Multiples
**Difficulty:** Medium
**Problem:** Read a number `k` and a count `n`, and print a tuple of the first `n` multiples of `k`.
**Input:** Two lines.
**Output:** The tuple.
**Example:**
```
Input:
5
3
Output:
(5, 10, 15)
```
**Hint:** Build with a loop and `tuple()`.

## Q28. Check If a Value Is in a Tuple
**Difficulty:** Easy
**Problem:** Read a tuple and a value, and print `Present` or `Absent`.
**Input:** Line 1: integers. Line 2: a value.
**Output:** The result.
**Example:**
```
Input:
1 5 9
5
Output:
Present
```
**Hint:** `if x in t:`.

## Q29. Unpack Nested Pairs
**Difficulty:** Hard
**Problem:** Read `n`, then `n` lines each with two integers. Build a list of tuples, then print the second element of each tuple on its own line.
**Input:** Line 1: `n`. Then `n` lines.
**Output:** Second elements.
**Example:**
```
Input:
2
1 9
2 8
Output:
9
8
```
**Hint:** Collect `(a, b)` tuples and print `t[1]`.

## Q30. Tuple of Elements at Even Indices
**Difficulty:** Medium
**Problem:** Read a tuple and print a tuple of the elements at even indices.
**Input:** A single line.
**Output:** The filtered tuple.
**Example:**
```
Input:
10 20 30 40 50
Output:
(10, 30, 50)
```
**Hint:** `t[::2]`.
