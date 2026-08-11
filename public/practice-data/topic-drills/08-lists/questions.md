# Topic Drill 08 — Lists

30 focused questions on: creating lists, indexing/slicing, adding/removing items, `.append()`, `.insert()`, `.remove()`, `.pop()`, `.sort()`, `.reverse()`, and list looping.

**How to run:** Read input with `input()`, process, and `print()` the result.

---

## Q1. Create a List Literal
**Difficulty:** Very Easy
**Problem:** Create the list `[10, 20, 30]` and print it.
**Input:** None.
**Output:** Print `[10, 20, 30]`.
**Hint:** `lst = [10, 20, 30]`.

## Q2. Length of a List
**Difficulty:** Very Easy
**Problem:** Read a list of integers (space-separated) and print its length.
**Input:** A single line.
**Output:** The count.
**Example:**
```
Input:
1 2 3 4
Output:
4
```
**Hint:** `len(lst)`.

## Q3. First Element
**Difficulty:** Very Easy
**Problem:** Read a list and print its first element.
**Input:** A single line.
**Output:** `lst[0]`.
**Example:**
```
Input:
5 8 3
Output:
5
```
**Hint:** Index 0.

## Q4. Last Element
**Difficulty:** Very Easy
**Problem:** Read a list and print its last element.
**Input:** A single line.
**Output:** `lst[-1]`.
**Example:**
```
Input:
5 8 3
Output:
3
```
**Hint:** Negative index.

## Q5. Sum of a List
**Difficulty:** Easy
**Problem:** Read a list of integers and print their sum.
**Input:** A single line.
**Output:** The sum.
**Example:**
```
Input:
1 2 3
Output:
6
```
**Hint:** `sum(lst)`.

## Q6. Append a Value
**Difficulty:** Easy
**Problem:** Read a list and a value, and print the list after `.append(value)`.
**Input:** Line 1: integers. Line 2: a value.
**Output:** The updated list.
**Example:**
```
Input:
1 2 3
9
Output:
[1, 2, 3, 9]
```
**Hint:** `lst.append(x)`.

## Q7. Insert at the Front
**Difficulty:** Easy
**Problem:** Read a list and a value, and print the list after `.insert(0, value)`.
**Input:** Line 1: integers. Line 2: a value.
**Output:** The updated list.
**Example:**
```
Input:
2 3 4
1
Output:
[1, 2, 3, 4]
```
**Hint:** `lst.insert(0, x)`.

## Q8. Pop the Last Element
**Difficulty:** Easy
**Problem:** Read a list, remove its last element with `.pop()`, and print the removed value then the list.
**Input:** A single line.
**Output:** Two lines: removed, then remaining list.
**Example:**
```
Input:
1 2 3
Output:
3
[1, 2]
```
**Hint:** `removed = lst.pop()`.

## Q9. Remove by Value
**Difficulty:** Medium
**Problem:** Read a list and a value, and print the list after `.remove(value)` (first occurrence).
**Input:** Line 1: integers. Line 2: a value (present).
**Output:** The updated list.
**Example:**
```
Input:
1 2 3 2
2
Output:
[1, 3, 2]
```
**Hint:** `lst.remove(x)`.

## Q10. Sort Ascending
**Difficulty:** Easy
**Problem:** Read a list and print it sorted ascending.
**Input:** A single line.
**Output:** The sorted list.
**Example:**
```
Input:
3 1 2
Output:
[1, 2, 3]
```
**Hint:** `lst.sort()`.

## Q11. Sort Descending
**Difficulty:** Easy
**Problem:** Read a list and print it sorted descending.
**Input:** A single line.
**Output:** The sorted list.
**Example:**
```
Input:
1 3 2
Output:
[3, 2, 1]
```
**Hint:** `lst.sort(reverse=True)`.

## Q12. Reverse a List
**Difficulty:** Easy
**Problem:** Read a list and print it reversed.
**Input:** A single line.
**Output:** The reversed list.
**Example:**
```
Input:
1 2 3
Output:
[3, 2, 1]
```
**Hint:** `lst.reverse()`.

## Q13. Slice a List
**Difficulty:** Easy
**Problem:** Read a list of at least 4 elements and print the sublist from index 1 to 3 (exclusive).
**Input:** A single line.
**Output:** The slice `lst[1:3]`.
**Example:**
```
Input:
10 20 30 40
Output:
[20, 30]
```
**Hint:** `lst[1:3]`.

## Q14. Loop Over a List
**Difficulty:** Easy
**Problem:** Read a list of integers and print each element on its own line.
**Input:** A single line.
**Output:** One element per line.
**Example:**
```
Input:
4 7 2
Output:
4
7
2
```
**Hint:** `for x in lst: print(x)`.

## Q15. Count Even Numbers
**Difficulty:** Easy
**Problem:** Read a list and print how many elements are even.
**Input:** A single line.
**Output:** The count.
**Example:**
```
Input:
1 2 3 4
Output:
2
```
**Hint:** Loop and check `% 2`.

## Q16. Largest Element
**Difficulty:** Easy
**Problem:** Read a list and print its largest element.
**Input:** A single line.
**Output:** The maximum.
**Example:**
```
Input:
3 9 1 7
Output:
9
```
**Hint:** `max(lst)` or track a running max.

## Q17. Second Largest
**Difficulty:** Medium
**Problem:** Read a list (at least 2 elements) and print its second largest.
**Input:** A single line.
**Output:** The second largest.
**Example:**
```
Input:
3 9 1 7
Output:
7
```
**Hint:** Sort a copy and take index `-2`.

## Q18. Index of a Value
**Difficulty:** Medium
**Problem:** Read a list and a value, and print the index of the first occurrence (or `-1` if absent).
**Input:** Line 1: integers. Line 2: a value.
**Output:** The index.
**Example:**
```
Input:
5 8 3 9
3
Output:
2
```
**Hint:** `lst.index(x)` or a loop.

## Q19. Check Membership
**Difficulty:** Easy
**Problem:** Read a list and a value, and print `Found` or `Not found`.
**Input:** Line 1: integers. Line 2: a value.
**Output:** The result.
**Example:**
```
Input:
1 5 9
5
Output:
Found
```
**Hint:** `if x in lst:`.

## Q20. Count Occurrences
**Difficulty:** Easy
**Problem:** Read a list and a value, and print how many times it appears.
**Input:** Line 1: integers. Line 2: a value.
**Output:** The count.
**Example:**
```
Input:
1 2 2 3 2
2
Output:
3
```
**Hint:** `lst.count(x)`.

## Q21. Elements at Even Indices
**Difficulty:** Medium
**Problem:** Read a list and print the elements at even indices (0, 2, 4, ...).
**Input:** A single line.
**Output:** One per line (or a list).
**Example:**
```
Input:
10 20 30 40 50
Output:
10
30
50
```
**Hint:** Loop with index and check `i % 2 == 0`.

## Q22. Remove All Occurrences
**Difficulty:** Medium
**Problem:** Read a list and a value, and print a new list with all occurrences of the value removed.
**Input:** Line 1: integers. Line 2: a value.
**Output:** The filtered list.
**Example:**
```
Input:
1 2 3 2 4
2
Output:
[1, 3, 4]
```
**Hint:** Build a new list keeping only `!= value`.

## Q23. Remove Duplicates (keep order)
**Difficulty:** Medium
**Problem:** Read a list and print a new list with duplicates removed, preserving first-appearance order.
**Input:** A single line.
**Output:** The deduplicated list.
**Example:**
```
Input:
1 2 1 3 2
Output:
[1, 2, 3]
```
**Hint:** Add to a result only if not already present.

## Q24. List of Squares
**Difficulty:** Medium
**Problem:** Read a list and print a new list with each element squared.
**Input:** A single line.
**Output:** The squared list.
**Example:**
```
Input:
2 3 4
Output:
[4, 9, 16]
```
**Hint:** Append `x ** 2` per element.

## Q25. Sum of Even Elements
**Difficulty:** Medium
**Problem:** Read a list and print the sum of its even elements.
**Input:** A single line.
**Output:** The sum.
**Example:**
```
Input:
1 2 3 4 5 6
Output:
12
```
**Hint:** Add when `% 2 == 0`.

## Q26. Check If Sorted
**Difficulty:** Medium
**Problem:** Read a list and print `Sorted` if non-decreasing, else `Not sorted`.
**Input:** A single line.
**Output:** The result.
**Example:**
```
Input:
1 2 2 3
Output:
Sorted
```
**Hint:** Check each adjacent pair.

## Q27. Swap First and Last
**Difficulty:** Medium
**Problem:** Read a list and print it with the first and last elements swapped.
**Input:** A single line.
**Output:** The modified list.
**Example:**
```
Input:
1 2 3 4
Output:
[4, 2, 3, 1]
```
**Hint:** `lst[0], lst[-1] = lst[-1], lst[0]`.

## Q28. Shift Left by One
**Difficulty:** Medium
**Problem:** Read a list and print it shifted left by one (first element moves to the end).
**Input:** A single line.
**Output:** The shifted list.
**Example:**
```
Input:
1 2 3 4
Output:
[2, 3, 4, 1]
```
**Hint:** `lst[1:] + [lst[0]]`.

## Q29. Elements Greater Than Their Neighbors
**Difficulty:** Hard
**Problem:** Read a list (≥3 elements) and count the elements strictly greater than both neighbors.
**Input:** A single line.
**Output:** The count.
**Example:**
```
Input:
1 5 2 4 3
Output:
1
```
**Hint:** Check middle indices only.

## Q30. Average of a List
**Difficulty:** Medium
**Problem:** Read a list and print its average rounded to two decimal places.
**Input:** A single line.
**Output:** The average.
**Example:**
```
Input:
10 20 30 40
Output:
25.00
```
**Hint:** `sum(lst) / len(lst)`.
