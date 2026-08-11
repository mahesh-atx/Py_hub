# Topic Drill 11 — Dictionaries

30 focused questions on: key-value pairs, accessing values, adding/updating, removing, `.keys()`, `.values()`, `.items()`, looping, and nested dictionaries.

> **Note on output:** Python prints a dictionary in key-insertion order in modern versions, and dictionary equality ignores order. When comparing your output, order does not matter.

**How to run:** Read input with `input()`, process, and `print()` the result.

---

## Q1. Create and Print a Dictionary
**Difficulty:** Very Easy
**Problem:** Create `{"name": "Aman", "age": 25}` and print it.
**Input:** None.
**Output:** Print the dictionary.
**Hint:** `d = {"name": "Aman", "age": 25}`.

## Q2. Access a Value by Key
**Difficulty:** Very Easy
**Problem:** Read a product name and a price, store in a dict with keys `"product"` and `"price"`, and print the price.
**Input:** Two lines.
**Output:** The price.
**Example:**
```
Input:
Laptop
55000
Output:
55000
```
**Hint:** `d["price"]`.

## Q3. Add a New Key
**Difficulty:** Easy
**Problem:** Read an item name and quantity, store them, then add key `"status"` with value `"ok"`, and print the dict.
**Input:** Two lines.
**Output:** The dictionary.
**Example:**
```
Input:
Rice
5
Output:
{'item': 'Rice', 'quantity': 5, 'status': 'ok'}
```
**Hint:** `d["status"] = "ok"`.

## Q4. Update a Value
**Difficulty:** Easy
**Problem:** Read a price, store under `"price"`, then increase it by 10% in place and print the new value.
**Input:** A single integer.
**Output:** The updated value.
**Example:**
```
Input:
1000
Output:
1100.0
```
**Hint:** `d["price"] = d["price"] * 1.1`.

## Q5. Number of Key-Value Pairs
**Difficulty:** Very Easy
**Problem:** Read three name-score pairs, store them, and print the number of entries.
**Input:** Six lines (3 pairs).
**Output:** Print `3`.
**Hint:** `len(d)`.

## Q6. Print the Keys
**Difficulty:** Easy
**Problem:** Read three city-country pairs, store them, and print the keys.
**Input:** Six lines.
**Output:** Print the keys view.
**Hint:** `print(d.keys())`.

## Q7. Print the Values
**Difficulty:** Easy
**Problem:** Read three name-age pairs, store them, and print the values.
**Input:** Six lines.
**Output:** Print the values view.
**Hint:** `print(d.values())`.

## Q8. Remove a Key
**Difficulty:** Easy
**Problem:** Read `n` key-value pairs and a target key (present), remove it, and print the dict.
**Input:** Line 1: `n`. Then `n` lines `key value`. Then the key to remove.
**Output:** The dictionary.
**Example:**
```
Input:
3
a 1
b 2
c 3
b
Output:
{'a': 1, 'c': 3}
```
**Hint:** `del d[key]`.

## Q9. Check If a Key Exists
**Difficulty:** Easy
**Problem:** Read `n` pairs and a query key, print `Found` or `Not found`.
**Input:** Line 1: `n`. Then pairs, then the query.
**Output:** The result.
**Example:**
```
Input:
2
apple 5
banana 3
banana
Output:
Found
```
**Hint:** `if query in d:`.

## Q10. Get With a Default
**Difficulty:** Easy
**Problem:** Read `n` pairs and a query key, print its value or `0` if absent.
**Input:** Line 1: `n`. Then pairs, then the query.
**Output:** The value.
**Example:**
```
Input:
2
a 10
b 20
c
Output:
0
```
**Hint:** `d.get(query, 0)`.

## Q11. Loop Over Items
**Difficulty:** Easy
**Problem:** Read `n` pairs and print each as `key: value`.
**Input:** Line 1: `n`. Then pairs.
**Output:** One line per pair.
**Example:**
```
Input:
2
x 5
y 9
Output:
x: 5
y: 9
```
**Hint:** `for k, v in d.items():`.

## Q12. Sum of All Values
**Difficulty:** Easy
**Problem:** Read `n` product-price pairs and print the total of all values.
**Input:** Line 1: `n`. Then pairs.
**Output:** The sum.
**Example:**
```
Input:
2
apple 10
banana 20
Output:
30
```
**Hint:** `sum(d.values())`.

## Q13. Key With Maximum Value
**Difficulty:** Medium
**Problem:** Read `n` name-score pairs and print the name with the highest score.
**Input:** Line 1: `n`. Then pairs.
**Output:** The name.
**Example:**
```
Input:
3
A 85
B 92
C 78
Output:
B
```
**Hint:** Loop over `.items()` tracking the best.

## Q14. Count Character Frequencies
**Difficulty:** Medium
**Problem:** Read a string and print a dictionary mapping each character to its count.
**Input:** A single line.
**Output:** The frequency dictionary.
**Example:**
```
Input:
hello
Output:
{'h': 1, 'e': 1, 'l': 2, 'o': 1}
```
**Hint:** `d[ch] = d.get(ch, 0) + 1`.

## Q15. Count Word Frequencies
**Difficulty:** Medium
**Problem:** Read a sentence and print a dictionary mapping each word to its count.
**Input:** A single line.
**Output:** The frequency dictionary.
**Example:**
```
Input:
the cat and the dog
Output:
{'the': 2, 'cat': 1, 'and': 1, 'dog': 1}
```
**Hint:** Loop over `.split()` and accumulate.

## Q16. Dictionary of Squares
**Difficulty:** Medium
**Problem:** Read `n` and print a dictionary mapping each number 1..n to its square.
**Input:** A single integer.
**Output:** The dictionary.
**Example:**
```
Input:
4
Output:
{1: 1, 2: 4, 3: 9, 4: 16}
```
**Hint:** `d[i] = i ** 2` in a loop.

## Q17. Nested Dictionary Access
**Difficulty:** Medium
**Problem:** Read a name, age, city; store in `{"person": {...}}`; print the city.
**Input:** Three lines.
**Output:** The city.
**Example:**
```
Input:
Aman
25
Pune
Output:
Pune
```
**Hint:** `d["person"]["city"]`.

## Q18. Average of Values
**Difficulty:** Medium
**Problem:** Read `n` name-score pairs and print the average score rounded to two decimals.
**Input:** Line 1: `n`. Then pairs.
**Output:** The average.
**Example:**
```
Input:
2
a 80
b 90
Output:
85.00
```
**Hint:** `sum(d.values()) / len(d)`.

## Q19. Sum of Values for Even Keys
**Difficulty:** Medium
**Problem:** Read `n` integer-key pairs and print the sum of values whose keys are even.
**Input:** Line 1: `n`. Then pairs `key value`.
**Output:** The sum.
**Example:**
```
Input:
3
1 10
2 20
4 30
Output:
50
```
**Hint:** Loop over `.items()` and check `k % 2 == 0`.

## Q20. Most Frequent Character
**Difficulty:** Medium
**Problem:** Read a string and print the most frequent character (first in case of a tie).
**Input:** A single line.
**Output:** The character.
**Example:**
```
Input:
abacb
Output:
a
```
**Hint:** Build a frequency dict and pick the max.

## Q21. Invert a Dictionary
**Difficulty:** Medium
**Problem:** Read `n` name-score pairs (distinct scores) and print a dict with scores as keys and names as values.
**Input:** Line 1: `n`. Then pairs.
**Output:** The inverted dictionary.
**Example:**
```
Input:
2
A 85
B 92
Output:
{85: 'A', 92: 'B'}
```
**Hint:** `inv[value] = key`.

## Q22. Count Words Starting With Each Letter
**Difficulty:** Medium
**Problem:** Read a sentence and print a dict mapping each starting letter (lowercased) to its word count.
**Input:** A single line.
**Output:** The dictionary.
**Example:**
```
Input:
apple ant banana bear
Output:
{'a': 2, 'b': 2}
```
**Hint:** `d[w[0].lower()] = d.get(..., 0) + 1`.

## Q23. Dictionary With a List Value
**Difficulty:** Medium
**Problem:** Read a name and three scores, store `{"name": ..., "scores": [..]}`, and print the sum of the scores.
**Input:** Four lines: name, then 3 scores.
**Output:** The sum.
**Example:**
```
Input:
A
1
2
3
Output:
6
```
**Hint:** `d = {"name": name, "scores": [s1, s2, s3]}` then `sum(d["scores"])`.

## Q24. Merge Two Dictionaries
**Difficulty:** Medium
**Problem:** Read two dicts (as `a:1,b:2`) and print the merged dict (second wins on conflicts).
**Input:** Two lines.
**Output:** The merged dict.
**Example:**
```
Input:
a:1,b:2
b:9,c:3
Output:
{'a': 1, 'b': 9, 'c': 3}
```
**Hint:** `d1.update(d2)`.

## Q25. Count Word Lengths
**Difficulty:** Medium
**Problem:** Read a sentence and print a dict mapping each word length to how many words have it.
**Input:** A single line.
**Output:** The dictionary.
**Example:**
```
Input:
I love Python
Output:
{1: 1, 4: 1, 6: 1}
```
**Hint:** `d[len(w)] = d.get(len(w), 0) + 1`.

## Q26. Group Words by Length
**Difficulty:** Hard
**Problem:** Read a sentence and print a dict mapping each word length to a list of words of that length.
**Input:** A single line.
**Output:** The grouped dictionary.
**Example:**
```
Input:
I love Python code
Output:
{1: ['I'], 4: ['love', 'code'], 6: ['Python']}
```
**Hint:** Use `.setdefault(len, []).append(w)`.

## Q27. Highest Total per Student (nested)
**Difficulty:** Hard
**Problem:** Read `n` lines each with a name and a score (names repeat). Print each student and their total.
**Input:** Line 1: `n`. Then `n` lines.
**Output:** `name: total` per line.
**Example:**
```
Input:
4
A 10
B 20
A 5
B 10
Output:
A: 15
B: 30
```
**Hint:** `d[name] = d.get(name, 0) + score`.

## Q28. Values Greater Than a Threshold
**Difficulty:** Medium
**Problem:** Read `n` pairs and a threshold, print how many values are strictly greater than it.
**Input:** Line 1: `n`. Then pairs, then the threshold.
**Output:** The count.
**Example:**
```
Input:
3
a 10
b 20
c 30
15
Output:
2
```
**Hint:** Count values `> threshold`.

## Q29. Print Sorted by Key
**Difficulty:** Medium
**Problem:** Read `n` pairs and print them sorted by key.
**Input:** Line 1: `n`. Then pairs.
**Output:** `key: value` sorted lines.
**Example:**
```
Input:
2
banana 3
apple 5
Output:
apple: 5
banana: 3
```
**Hint:** Loop over `sorted(d.keys())`.

## Q30. Grade From Average (nested)
**Difficulty:** Hard
**Problem:** Read `n` students (name + 3 scores each). Store each as `{"scores": [...], "grade": ...}` where grade is `A` (≥80), `B` (≥60), `C` (≥40), or `F`. Print the nested dict.
**Input:** Line 1: `n`. Then per student: name, then 3 scores.
**Output:** The nested dictionary.
**Example:**
```
Input:
1
A
80
90
70
Output:
{'A': {'scores': [80, 90, 70], 'grade': 'A'}}
```
**Hint:** Compute the average, assign a grade, store both.
