# Topic Drill 10 — Sets

30 focused questions on: creating sets, adding/removing values, union, intersection, difference, and removing duplicates.

> **Note on output:** Python prints a set's elements in arbitrary order (e.g. `{1, 2, 3}` may print as `{3, 1, 2}`). When comparing your output, order inside the braces does not matter.

**How to run:** Read input with `input()`, process, and `print()` the result.

---

## Q1. Create a Set
**Difficulty:** Very Easy
**Problem:** Create the set `{1, 2, 3}` and print it.
**Input:** None.
**Output:** Print the set.
**Hint:** `s = {1, 2, 3}`.

## Q2. Length of a Set
**Difficulty:** Very Easy
**Problem:** Read a list of integers and print the number of distinct values (length of the set).
**Input:** A single line.
**Output:** The count.
**Example:**
```
Input:
1 2 2 3
Output:
3
```
**Hint:** `len(set(lst))`.

## Q3. Add a Value to a Set
**Difficulty:** Easy
**Problem:** Read a list and a value, and print the set after adding the value.
**Input:** Line 1: integers. Line 2: a value.
**Output:** The updated set.
**Example:**
```
Input:
1 2 3
9
Output:
{1, 2, 3, 9}
```
**Hint:** `s.add(x)`.

## Q4. Remove a Value From a Set
**Difficulty:** Easy
**Problem:** Read a list and a value (present), and print the set after removing it.
**Input:** Line 1: integers. Line 2: a value.
**Output:** The updated set.
**Example:**
```
Input:
1 2 3 4
3
Output:
{1, 2, 4}
```
**Hint:** `s.discard(x)`.

## Q5. Union of Two Sets
**Difficulty:** Easy
**Problem:** Read two lines of integers and print the union of their sets.
**Input:** Two lines.
**Output:** The union set.
**Example:**
```
Input:
1 2 3
3 4 5
Output:
{1, 2, 3, 4, 5}
```
**Hint:** `A | B`.

## Q6. Intersection of Two Sets
**Difficulty:** Easy
**Problem:** Read two lines of integers and print the intersection of their sets.
**Input:** Two lines.
**Output:** The intersection set.
**Example:**
```
Input:
1 2 3 4
3 4 5
Output:
{3, 4}
```
**Hint:** `A & B`.

## Q7. Difference of Two Sets
**Difficulty:** Easy
**Problem:** Read two lines of integers (A then B) and print `A - B`.
**Input:** Two lines.
**Output:** The difference set.
**Example:**
```
Input:
1 2 3 4
2 4
Output:
{1, 3}
```
**Hint:** `A - B`.

## Q8. Remove Duplicates From a List
**Difficulty:** Easy
**Problem:** Read a list and print a list of its unique values (any order).
**Input:** A single line.
**Output:** The deduplicated list.
**Example:**
```
Input:
3 1 3 2 1
Output:
[1, 2, 3]
```
**Hint:** `list(set(lst))`.

## Q9. Count Unique Characters
**Difficulty:** Easy
**Problem:** Read a string and print the number of distinct characters.
**Input:** A single line.
**Output:** The count.
**Example:**
```
Input:
banana
Output:
3
```
**Hint:** `len(set(s))`.

## Q10. Check Membership
**Difficulty:** Easy
**Problem:** Read a list and a value, and print `Present` or `Absent` using a set.
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
**Hint:** `if x in set(lst):`.

## Q11. Symmetric Difference
**Difficulty:** Medium
**Problem:** Read two lines of integers and print the values in exactly one of the two sets.
**Input:** Two lines.
**Output:** The symmetric difference set.
**Example:**
```
Input:
1 2 3
3 4 5
Output:
{1, 2, 4, 5}
```
**Hint:** `A ^ B`.

## Q12. Check Subset
**Difficulty:** Medium
**Problem:** Read two lines (A then B) and print `Subset` if A is contained in B.
**Input:** Two lines.
**Output:** `Subset` or `Not subset`.
**Example:**
```
Input:
1 2
1 2 3 4
Output:
Subset
```
**Hint:** `A <= B`.

## Q13. Check Superset
**Difficulty:** Medium
**Problem:** Read two lines (A then B) and print `Superset` if A contains B.
**Input:** Two lines.
**Output:** `Superset` or `Not superset`.
**Example:**
```
Input:
1 2 3 4
2 4
Output:
Superset
```
**Hint:** `A >= B`.

## Q14. Sum of Unique Values
**Difficulty:** Medium
**Problem:** Read a list and print the sum of its distinct values.
**Input:** A single line.
**Output:** The sum.
**Example:**
```
Input:
1 2 2 3 4 4
Output:
10
```
**Hint:** `sum(set(lst))`.

## Q15. Check Disjoint
**Difficulty:** Medium
**Problem:** Read two lines and print `Disjoint` if the sets share no elements.
**Input:** Two lines.
**Output:** `Disjoint` or `Not disjoint`.
**Example:**
```
Input:
1 2 3
4 5 6
Output:
Disjoint
```
**Hint:** Check if `A & B` is empty.

## Q16. Count Distinct Digits
**Difficulty:** Medium
**Problem:** Read a positive integer and print how many distinct digits it has.
**Input:** A single integer.
**Output:** The count.
**Example:**
```
Input:
112233
Output:
3
```
**Hint:** `len(set(str(n)))`.

## Q17. Common Elements Count
**Difficulty:** Medium
**Problem:** Read two lines and print how many values are common to both sets.
**Input:** Two lines.
**Output:** The count.
**Example:**
```
Input:
1 2 3 4
3 4 5
Output:
2
```
**Hint:** `len(A & B)`.

## Q18. Union Size
**Difficulty:** Medium
**Problem:** Read two lines and print the number of distinct values across both.
**Input:** Two lines.
**Output:** The count.
**Example:**
```
Input:
1 2 3
3 4
Output:
4
```
**Hint:** `len(A | B)`.

## Q19. Only in A (size of A - B)
**Difficulty:** Medium
**Problem:** Read two lines (A then B) and print how many values are in A but not B.
**Input:** Two lines.
**Output:** The count.
**Example:**
```
Input:
1 2 3 4 5
2 4
Output:
3
```
**Hint:** `len(A - B)`.

## Q20. Common Values as a Sorted List
**Difficulty:** Medium
**Problem:** Read two lines and print the common values as a sorted list.
**Input:** Two lines.
**Output:** The sorted list.
**Example:**
```
Input:
4 1 3 2
5 3 4 6
Output:
[3, 4]
```
**Hint:** `sorted(A & B)`.

## Q21. Check for Duplicates
**Difficulty:** Easy
**Problem:** Read a list and print `Duplicate` if any value repeats, else `Unique`.
**Input:** A single line.
**Output:** The result.
**Example:**
```
Input:
1 2 3 2
Output:
Duplicate
```
**Hint:** Compare `len(lst)` with `len(set(lst))`.

## Q22. Unique Vowels
**Difficulty:** Medium
**Problem:** Read a string and print the number of distinct vowels it contains.
**Input:** A single line.
**Output:** The count.
**Example:**
```
Input:
beautiful
Output:
4
```
**Hint:** `len(set(lowercase) & set("aeiou"))`.

## Q23. Elements in A or B but Not in C
**Difficulty:** Hard
**Problem:** Read three lines (A, B, C) and print `(A | B) - C`.
**Input:** Three lines.
**Output:** The resulting set.
**Example:**
```
Input:
1 2 3
3 4 5
4 5 6
Output:
{1, 2, 3}
```
**Hint:** `(A | B) - C`.

## Q24. Intersection of Three Sets
**Difficulty:** Medium
**Problem:** Read three lines and print the values common to all three.
**Input:** Three lines.
**Output:** The intersection set.
**Example:**
```
Input:
1 2 3 4
2 3 4 5
3 4 5 6
Output:
{3, 4}
```
**Hint:** `A & B & C`.

## Q25. Unique Words in a Sentence
**Difficulty:** Medium
**Problem:** Read a sentence and print the number of distinct words.
**Input:** A single line.
**Output:** The count.
**Example:**
```
Input:
the cat and the dog
Output:
4
```
**Hint:** `len(set(sentence.split()))`.

## Q26. Symmetric Difference Size
**Difficulty:** Medium
**Problem:** Read two lines and print how many values are in exactly one set.
**Input:** Two lines.
**Output:** The count.
**Example:**
```
Input:
1 2 3
3 4 5
Output:
4
```
**Hint:** `len(A ^ B)`.

## Q27. Second Largest Distinct Value
**Difficulty:** Medium
**Problem:** Read a list (at least 2 distinct values) and print the second largest distinct value.
**Input:** A single line.
**Output:** The value.
**Example:**
```
Input:
7 3 9 1 9
Output:
7
```
**Hint:** `sorted(set(lst))[-2]`.

## Q28. Max of a Set
**Difficulty:** Easy
**Problem:** Read a list and print the largest distinct value.
**Input:** A single line.
**Output:** The max.
**Example:**
```
Input:
4 9 2 9 7
Output:
9
```
**Hint:** `max(set(lst))`.

## Q29. Check If All Values Are Even
**Difficulty:** Medium
**Problem:** Read a list and print `All even` if every distinct value is even.
**Input:** A single line.
**Output:** `All even` or `Not all even`.
**Example:**
```
Input:
2 4 6
Output:
All even
```
**Hint:** Loop over the set and check `% 2`.

## Q30. Set of First Letters
**Difficulty:** Medium
**Problem:** Read a sentence and print the set of the first letters of its words.
**Input:** A single line.
**Output:** The set.
**Example:**
```
Input:
apple banana cherry
Output:
{'a', 'b', 'c'}
```
**Hint:** `set(w[0] for w in sentence.split())`.
