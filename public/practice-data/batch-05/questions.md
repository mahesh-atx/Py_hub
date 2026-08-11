# Batch 5 — Python Fundamentals

## Topics Covered (ALL 12)
- Variables, Data Types, Operators, Input and Output
- Conditions, Loops
- Strings, Lists
- Tuples, Sets
- **Dictionaries** (key-value pairs, access, add/update, remove, `.keys()`, `.values()`, `.items()`, looping, nested dictionaries)
- **Functions** (creating, parameters, arguments, return, default parameters, keyword arguments, `*args`, `**kwargs`, scope, lambda)

> **Rules for this batch:** All earlier topics continue. **Dictionaries** and **Functions** are the two new topics. This is the hardest batch — questions combine many concepts.

**How to run:** Read input with `input()`, process, and `print()`.

---

## Q401. Create and Print a Dictionary

**Difficulty:** Very Easy

**Learning Objective:** Create a dictionary literal and print it.

**Problem:** Write a program that reads a name and an age, then stores them in a dictionary with keys `"name"` and `"age"`, and prints the dictionary.

**Input:** Two lines: `name` (a `str`), then `age` (an `int`).

**Output:** Print the dictionary `{"name": <name>, "age": <age>}`.

**Constraints:**
- The name is between 1 and 50 characters.
- `1 <= age <= 120`

**Example:**
```
Input:
Aman
25

Output:
{'name': 'Aman', 'age': 25}
```
**Explanation:** The two values are stored under their keys.

**Hint:** `d = {"name": name, "age": age}` then `print(d)`.

---

## Q402. Access a Value from a Dictionary

**Difficulty:** Very Easy

**Learning Objective:** Retrieve a value using a key.

**Problem:** Write a program that reads a product name and its price, stores them in a dictionary, and prints the price.

**Input:** Two lines: `product` (a `str`), then `price` (an `int`).

**Output:** Print the value associated with the key `"price"`.

**Constraints:**
- `1 <= price <= 10**6`

**Example:**
```
Input:
Laptop
55000

Output:
55000
```
**Explanation:** The price is retrieved from the dictionary.

**Hint:** `d["price"]`.

---

## Q403. Add a New Key to a Dictionary

**Difficulty:** Very Easy

**Learning Objective:** Insert a new key-value pair.

**Problem:** Write a program that reads an item name and a quantity, stores them in a dictionary, then adds a fixed key `"status"` with the value `"in stock"`, and prints the dictionary.

**Input:** Two lines: `item` (a `str`), then `quantity` (an `int`).

**Output:** Print the dictionary after adding `"status"`.

**Constraints:**
- `0 <= quantity <= 10**6`

**Example:**
```
Input:
Rice
5

Output:
{'item': 'Rice', 'quantity': 5, 'status': 'in stock'}
```
**Explanation:** A new key is added to the dictionary.

**Hint:** `d["status"] = "in stock"`.

---

## Q404. Update a Value in a Dictionary

**Difficulty:** Very Easy

**Learning Objective:** Change the value of an existing key.

**Problem:** Write a program that reads a price, stores it under the key `"price"`, then updates it to 10% more, and prints the new value.

**Input:** A single line containing an integer `price`.

**Output:** Print the value after increasing by 10%.

**Constraints:**
- `1 <= price <= 10**6`

**Example:**
```
Input:
2000

Output:
2200.0
```
**Explanation:** `2000 * 1.1 = 2200.0`.

**Hint:** `d["price"] = d["price"] * 1.1`.

---

## Q405. Get the Number of Key-Value Pairs

**Difficulty:** Very Easy

**Learning Objective:** Use `len()` on a dictionary.

**Problem:** Write a program that reads three keys and values (three name–score pairs), stores them in a dictionary, and prints the number of entries.

**Input:** Six lines: three pairs of (name, score).

**Output:** Print a single integer equal to the number of dictionary entries.

**Constraints:**
- Scores are integers in `[0, 100]`.

**Example:**
```
Input:
a
90
b
80
c
70

Output:
3
```
**Explanation:** The dictionary has 3 entries.

**Hint:** `len(d)`.

---

## Q406. Print the Keys of a Dictionary

**Difficulty:** Very Easy

**Learning Objective:** Use `.keys()` to get the keys.

**Problem:** Write a program that reads three city–country pairs, stores them in a dictionary, and prints the list of keys.

**Input:** Six lines: three pairs of (city, country).

**Output:** Print the keys as a list.

**Constraints:**
- Values are non-empty strings.

**Example:**
```
Input:
Delhi
India
Paris
France
Tokyo
Japan

Output:
dict_keys(['Delhi', 'Paris', 'Tokyo'])
```
**Explanation:** `.keys()` returns a view of the keys.

**Hint:** `print(d.keys())`.

---

## Q407. Print the Values of a Dictionary

**Difficulty:** Very Easy

**Learning Objective:** Use `.values()` to get the values.

**Problem:** Write a program that reads three name–age pairs, stores them in a dictionary, and prints the list of values.

**Input:** Six lines: three pairs of (name, age).

**Output:** Print the values as a list.

**Constraints:**
- Ages are integers.

**Example:**
```
Input:
a
10
b
20
c
30

Output:
dict_values([10, 20, 30])
```
**Explanation:** `.values()` returns a view of the values.

**Hint:** `print(d.values())`.

---

## Q408. Define and Call a Function That Greets

**Difficulty:** Very Easy

**Learning Objective:** Define a function and call it.

**Problem:** Write a program that defines a function `greet()` that prints `Hello from a function!`, then calls it.

**Input:** None.

**Output:** Print the greeting message.

**Constraints:**
- None.

**Example:**
```
Output:
Hello from a function!
```
**Explanation:** The function body runs when called.

**Hint:** `def greet(): print(...)` then `greet()`.

---

## Q409. Function That Returns the Sum of Two Numbers

**Difficulty:** Very Easy

**Learning Objective:** Write a function with parameters and a `return` value.

**Problem:** Write a program that reads two integers and prints their sum, using a function `add(a, b)` that returns the sum.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print the sum returned by the function.

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
**Explanation:** `add(12, 8)` returns 20.

**Hint:** `def add(a, b): return a + b`.

---

## Q410. Function With a Default Parameter

**Difficulty:** Very Easy

**Learning Objective:** Use a default parameter value.

**Problem:** Write a program that reads a number and prints `number * 2` using a function `double(x, factor=2)` that multiplies by `factor`.

**Input:** A single line containing an integer `n`.

**Output:** Print `n * 2`.

**Constraints:**
- `-10**6 <= n <= 10**6`

**Example:**
```
Input:
9

Output:
18
```
**Explanation:** The default factor of 2 is used.

**Hint:** `def double(x, factor=2): return x * factor`.

---

## Q411. Use Keyword Arguments

**Difficulty:** Very Easy

**Learning Objective:** Call a function using keyword arguments.

**Problem:** Write a program that reads `a` and `b` and prints `a - b` by calling a function `sub(x, y)` using keyword arguments.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print `a - b`.

**Constraints:**
- `-10**6 <= a, b <= 10**6`

**Example:**
```
Input:
10
3

Output:
7
```
**Explanation:** The function is called as `sub(x=a, y=b)`.

**Hint:** `def sub(x, y): return x - y` then `sub(x=a, y=b)`.

---

## Q412. Function That Uses *args

**Difficulty:** Easy

**Learning Objective:** Write a function that accepts a variable number of arguments with `*args`.

**Problem:** Write a program that reads `n`, then `n` integers, and prints their sum using a function `total(*args)` that sums all passed arguments.

**Input:** Line 1: `n`. Then `n` lines each containing an integer.

**Output:** Print the sum.

**Constraints:**
- `1 <= n <= 50`

**Example:**
```
Input:
4
1
2
3
4

Output:
10
```
**Explanation:** The function sums all its arguments.

**Hint:** `def total(*args): return sum(args)` then call `total(x1, x2, ...)`.

---

## Q413. Function That Uses **kwargs

**Difficulty:** Easy

**Learning Objective:** Write a function that accepts keyword arguments with `**kwargs`.

**Problem:** Write a program that reads a name and an age, then uses a function `describe(**kwargs)` that prints each key-value pair.

**Input:** Two lines: `name` (a `str`), then `age` (an `int`).

**Output:** Print two lines: `name = <name>` and `age = <age>`.

**Constraints:**
- The name is between 1 and 50 characters.

**Example:**
```
Input:
Aman
25

Output:
name = Aman
age = 25
```
**Explanation:** `**kwargs` collects the keyword arguments.

**Hint:** `def describe(**kwargs): for k, v in kwargs.items(): print(f"{k} = {v}")`.

---

## Q414. Function Returning the Larger of Two Numbers

**Difficulty:** Very Easy

**Learning Objective:** Write a function that uses a condition and returns a result.

**Problem:** Write a program that reads two integers and prints the larger, using a function `larger(a, b)` that returns the maximum.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print the larger value.

**Constraints:**
- `-10**9 <= a, b <= 10**9`

**Example:**
```
Input:
7
3

Output:
7
```
**Explanation:** The function returns the larger.

**Hint:** `def larger(a, b): if a > b: return a else: return b`.

---

## Q415. Function Checking Even/Odd

**Difficulty:** Very Easy

**Learning Objective:** Write a function that returns a classification.

**Problem:** Write a program that reads an integer and prints `Even` or `Odd` using a function `parity(n)` that returns `"Even"` or `"Odd"`.

**Input:** A single line containing an integer `n`.

**Output:** Print the result of the function.

**Constraints:**
- `-10**9 <= n <= 10**9`

**Example:**
```
Input:
14

Output:
Even
```
**Explanation:** The function returns `"Even"`.

**Hint:** `def parity(n): return "Even" if n % 2 == 0 else "Odd"`.

---

## Q416. Count Character Frequencies with a Dictionary

**Difficulty:** Easy

**Learning Objective:** Build a frequency dictionary for characters.

**Problem:** Write a program that reads a string and prints a dictionary mapping each character to how many times it appears.

**Input:** A single line containing a string `s`.

**Output:** Print the frequency dictionary.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
hello

Output:
{'h': 1, 'e': 1, 'l': 2, 'o': 1}
```
**Explanation:** Each character's count.

**Hint:** Loop over characters; if the character is a key, increment, else set to 1.

---

## Q417. Count Word Frequencies

**Difficulty:** Easy

**Learning Objective:** Build a word-frequency dictionary.

**Problem:** Write a program that reads a sentence and prints a dictionary mapping each word to its count.

**Input:** A single line containing a sentence.

**Output:** Print the word-frequency dictionary.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
the cat and the dog

Output:
{'the': 2, 'cat': 1, 'and': 1, 'dog': 1}
```
**Explanation:** Counts per word.

**Hint:** Use `.split()` and the same dictionary-accumulation pattern.

---

## Q418. Check If a Key Exists in a Dictionary

**Difficulty:** Easy

**Learning Objective:** Use the `in` operator to test dictionary membership.

**Problem:** Write a program that reads `n` key-value pairs, then a target key, and prints `Found` if the key is in the dictionary, otherwise `Not found`.

**Input:** Line 1: `n`. Then `n` lines each with a key (a word) and a value (an integer). Then one line with a target key.

**Output:** Print `Found` or `Not found`.

**Constraints:**
- `1 <= n <= 50`

**Example:**
```
Input:
3
apple 5
banana 3
cherry 7
banana

Output:
Found
```
**Explanation:** "banana" is a key.

**Hint:** `if target in d:`.

---

## Q419. Get a Value with a Default Using .get()

**Difficulty:** Easy

**Learning Objective:** Use `.get()` with a default value.

**Problem:** Write a program that reads `n` key-value pairs, then a query key, and prints its value. If the key is not present, print `0`.

**Input:** Line 1: `n`. Then `n` lines each with a key (word) and an integer value. Then one line with a query key.

**Output:** Print the value, or `0` if the key is absent.

**Constraints:**
- `1 <= n <= 50`

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
**Explanation:** "c" is not present, so the default 0 is used.

**Hint:** `d.get(query, 0)`.

---

## Q420. Loop Over a Dictionary's Items

**Difficulty:** Easy

**Learning Objective:** Iterate with `.items()` to get keys and values.

**Problem:** Write a program that reads `n` key-value pairs and prints each pair as `key: value`.

**Input:** Line 1: `n`. Then `n` lines each with a key (word) and an integer value.

**Output:** For each entry, print `<key>: <value>`.

**Constraints:**
- `1 <= n <= 50`

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
**Explanation:** `.items()` gives each key-value pair.

**Hint:** `for k, v in d.items(): print(f"{k}: {v}")`.

---

## Q421. Sum of All Values in a Dictionary

**Difficulty:** Easy

**Learning Objective:** Sum the values of a dictionary.

**Problem:** Write a program that reads `n` key-value pairs (product–price) and prints the total of all values.

**Input:** Line 1: `n`. Then `n` lines each with a product name and its integer price.

**Output:** Print a single integer equal to the sum of the prices.

**Constraints:**
- `1 <= n <= 50`
- Each price is in `[1, 10**6]`.

**Example:**
```
Input:
3
apple 10
banana 20
cherry 30

Output:
60
```
**Explanation:** `10 + 20 + 30 = 60`.

**Hint:** Loop over `d.values()` and accumulate.

---

## Q422. Find the Key with the Maximum Value

**Difficulty:** Easy

**Learning Objective:** Find the key associated with the largest value.

**Problem:** Write a program that reads `n` name–score pairs and prints the name with the highest score.

**Input:** Line 1: `n`. Then `n` lines each with a name and an integer score.

**Output:** Print the name with the maximum score.

**Constraints:**
- `1 <= n <= 50`
- Scores are in `[0, 100]`.

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
**Explanation:** B has the highest score (92).

**Hint:** Track the best key and best value while looping over `.items()`.

---

## Q423. Remove a Key from a Dictionary

**Difficulty:** Easy

**Learning Objective:** Use `del` or `.pop()` to remove an entry.

**Problem:** Write a program that reads `n` key-value pairs and a target key (guaranteed present), removes it, and prints the remaining dictionary.

**Input:** Line 1: `n`. Then `n` lines each with a key and an integer value. Then one line with the key to remove.

**Output:** Print the dictionary after removal.

**Constraints:**
- `1 <= n <= 50`

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
**Explanation:** "b" is removed.

**Hint:** `del d[key]` or `d.pop(key)`.

---

## Q424. Function That Doubles a Number (returns result)

**Difficulty:** Easy

**Learning Objective:** Write a function that transforms its input and returns it.

**Problem:** Write a program that reads an integer and prints its double, using a function `double(n)`.

**Input:** A single line containing an integer `n`.

**Output:** Print `2 * n`.

**Constraints:**
- `-10**6 <= n <= 10**6`

**Example:**
```
Input:
21

Output:
42
```
**Explanation:** The function doubles the value.

**Hint:** `def double(n): return 2 * n`.

---

## Q425. Function That Checks a Condition (is positive)

**Difficulty:** Easy

**Learning Objective:** Write a boolean-returning function.

**Problem:** Write a program that reads an integer and prints `True` if it is positive, otherwise `False`, using a function `is_positive(n)` that returns a boolean.

**Input:** A single line containing an integer `n`.

**Output:** Print the boolean result.

**Constraints:**
- `-10**9 <= n <= 10**9`

**Example:**
```
Input:
7

Output:
True
```
**Explanation:** The function returns `True`.

**Hint:** `def is_positive(n): return n > 0`.

---

## Q426. Use a Lambda for a Simple Operation

**Difficulty:** Easy

**Learning Objective:** Write and call a lambda function.

**Problem:** Write a program that reads two integers and prints their product using a lambda assigned to a variable.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print `a * b`.

**Constraints:**
- `-10**6 <= a, b <= 10**6`

**Example:**
```
Input:
6
7

Output:
42
```
**Explanation:** The lambda computes the product.

**Hint:** `mult = lambda x, y: x * y`.

---

## Q427. Dictionary with a List as a Value

**Difficulty:** Easy

**Learning Objective:** Store a list inside a dictionary.

**Problem:** Write a program that reads a student name and three scores, then stores them in a dictionary where the value is a list of the three scores, and prints the dictionary.

**Input:** Four lines: `name`, then three integers.

**Output:** Print the dictionary.

**Constraints:**
- Scores are in `[0, 100]`.

**Example:**
```
Input:
Aman
80
90
70

Output:
{'name': 'Aman', 'scores': [80, 90, 70]}
```
**Explanation:** The scores are stored as a list.

**Hint:** `d = {"name": name, "scores": [s1, s2, s3]}`.

---

## Q428. Average of the Values in a Dictionary

**Difficulty:** Easy

**Learning Objective:** Compute the average of dictionary values.

**Problem:** Write a program that reads `n` name–score pairs and prints the average score rounded to two decimal places.

**Input:** Line 1: `n`. Then `n` lines each with a name and an integer score.

**Output:** Print the average formatted to two decimal places.

**Constraints:**
- `1 <= n <= 50`
- Scores in `[0, 100]`.

**Example:**
```
Input:
3
a 80
b 90
c 70

Output:
80.00
```
**Explanation:** `(80+90+70)/3 = 80.0`.

**Hint:** Sum the values, divide by `len(d)`.

---

## Q429. Function With *args to Find the Maximum

**Difficulty:** Easy → Medium

**Learning Objective:** Use `*args` in a function that finds the maximum.

**Problem:** Write a program that reads `n`, then `n` integers, and prints the maximum using a function `my_max(*args)`.

**Input:** Line 1: `n`. Then `n` lines each containing an integer.

**Output:** Print the maximum.

**Constraints:**
- `1 <= n <= 50`

**Example:**
```
Input:
4
5
9
2
7

Output:
9
```
**Explanation:** The function finds the max of its arguments.

**Hint:** `def my_max(*args): return max(args)`.

---

## Q430. Count the Occurrences of Each Word (sorted output)

**Difficulty:** Easy → Medium

**Learning Objective:** Build and print a word-count dictionary.

**Problem:** Write a program that reads a sentence and prints the word counts as a dictionary.

**Input:** A single line containing a sentence.

**Output:** Print the frequency dictionary.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
apple banana apple cherry apple

Output:
{'apple': 3, 'banana': 1, 'cherry': 1}
```
**Explanation:** Counts per word.

**Hint:** Use the dictionary-accumulation pattern.

---

## Q431. Function Returning the Factorial

**Difficulty:** Easy → Medium

**Learning Objective:** Write a function that computes a factorial with a loop.

**Problem:** Write a program that reads `n` and prints `n!` using a function `factorial(n)`.

**Input:** A single line containing an integer `n` (`0 <= n <= 20`).

**Output:** Print `n!`.

**Constraints:**
- `0 <= n <= 20`

**Example:**
```
Input:
5

Output:
120
```
**Explanation:** `5! = 120`.

**Hint:** `def factorial(n): p = 1; for i in range(1, n+1): p *= i; return p`.

---

## Q432. Function That Returns a List

**Difficulty:** Easy → Medium

**Learning Objective:** Write a function that builds and returns a list.

**Problem:** Write a program that reads `n` and prints a list of the first `n` even numbers, using a function `first_evens(n)` that returns the list.

**Input:** A single line containing an integer `n`.

**Output:** Print the list `[2, 4, 6, ..., 2n]`.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
4

Output:
[2, 4, 6, 8]
```
**Explanation:** The function returns the list of evens.

**Hint:** Build the list inside the function and `return` it.

---

## Q433. Nested Dictionary Access

**Difficulty:** Easy → Medium

**Learning Objective:** Read a value from a nested dictionary.

**Problem:** Write a program that reads a name, age, and city, and stores them in a nested dictionary with an outer key `"person"` and inner keys `"name"`, `"age"`, `"city"`. Then print the city.

**Input:** Three lines: `name`, `age` (int), `city`.

**Output:** Print the city value.

**Constraints:**
- All values are non-empty.

**Example:**
```
Input:
Aman
25
Pune

Output:
Pune
```
**Explanation:** The city is retrieved from the nested dictionary.

**Hint:** `d = {"person": {"name": name, "age": age, "city": city}}`; `d["person"]["city"]`.

---

## Q434. Sum of All Values in a Nested Dictionary

**Difficulty:** Medium

**Learning Objective:** Iterate over a nested dictionary.

**Problem:** Write a program that reads `n` names and one score each, storing them as a dictionary of names → dictionaries with a `"score"` key, then prints the total of all scores.

**Input:** Line 1: `n`. Then `n` lines each with a name and an integer score.

**Output:** Print the total score.

**Constraints:**
- `1 <= n <= 50`

**Example:**
```
Input:
2
A 80
B 70

Output:
150
```
**Explanation:** The scores sum to 150.

**Hint:** Build `d[name] = {"score": score}` and sum `v["score"]`.

---

## Q435. Function Checking if a String Is a Palindrome

**Difficulty:** Medium

**Learning Objective:** Write a boolean function using string reversal.

**Problem:** Write a program that reads a string and prints `Palindrome` or `Not palindrome` using a function `is_palindrome(s)` that returns a boolean.

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
**Explanation:** The function returns `True`.

**Hint:** `def is_palindrome(s): return s == s[::-1]`.

---

## Q436. Count Vowels Using a Function and Dictionary

**Difficulty:** Medium

**Learning Objective:** Build a vowel-count dictionary inside a function.

**Problem:** Write a program that reads a string and prints a dictionary with keys `a, e, i, o, u` mapping to their counts (case-insensitive), using a function `vowel_counts(s)`.

**Input:** A single line containing a string `s`.

**Output:** Print the vowel-count dictionary.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
hello world

Output:
{'a': 0, 'e': 1, 'i': 0, 'o': 2, 'u': 0}
```
**Explanation:** Counts of each vowel.

**Hint:** Initialize all five vowels to 0 and increment when found.

---

## Q437. Merge Two Dictionaries

**Difficulty:** Medium

**Learning Objective:** Combine two dictionaries, letting the second override.

**Problem:** Write a program that reads two lines of key-value pairs (as `key:value,key:value`) and prints the merged dictionary (the second dict's values win on conflicts).

**Input:** Two lines, each formatted like `a:1,b:2`.

**Output:** Print the merged dictionary.

**Constraints:**
- Between 1 and 5 pairs per line.

**Example:**
```
Input:
a:1,b:2
b:9,c:3

Output:
{'a': 1, 'b': 9, 'c': 3}
```
**Explanation:** "b" is overridden by the second dict.

**Hint:** Parse each line into a dict, then `d1.update(d2)`.

---

## Q438. Function That Returns Multiple Values

**Difficulty:** Medium

**Learning Objective:** Return multiple values from a function (as a tuple).

**Problem:** Write a program that reads a number and, using a function `min_max_of_digits(n)` that returns the smallest and largest digits, prints both.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print the smallest and largest digit, each on its own line.

**Constraints:**
- `1 <= n <= 10**12`

**Example:**
```
Input:
4731

Output:
1
7
```
**Explanation:** Smallest digit is 1, largest is 7.

**Hint:** `def min_max_of_digits(n): ... return small, large`.

---

## Q439. Check for Duplicates Using a Dictionary

**Difficulty:** Medium

**Learning Objective:** Use a dictionary to detect duplicates and their counts.

**Problem:** Write a program that reads a list of integers and prints `Duplicate` if any value appears more than once, otherwise `Unique`. Use a frequency dictionary.

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

**Hint:** Build a frequency dictionary; if any count is greater than 1, it's a duplicate.

---

## Q440. Print the Most Frequent Character

**Difficulty:** Medium

**Learning Objective:** Use a frequency dictionary to find the most common character.

**Problem:** Write a program that reads a string and prints the character that appears most frequently. If there is a tie, print the one that appears first.

**Input:** A single line containing a string `s`.

**Output:** Print the most frequent character.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
abacb

Output:
a
```
**Explanation:** a and b both appear twice; a comes first.

**Hint:** Build counts, then pick the key with the highest count (break ties by first occurrence).

---

## Q441. Function That Counts Even Numbers in a List

**Difficulty:** Medium

**Learning Objective:** Write a function that processes a list and returns a count.

**Problem:** Write a program that reads a list of integers and prints how many are even, using a function `count_even(lst)`.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the count of even numbers.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 3 4 5 6

Output:
3
```
**Explanation:** Evens are 2, 4, 6.

**Hint:** `def count_even(lst): return sum(1 for x in lst if x % 2 == 0)`.

---

## Q442. Dictionary of Squares (1 to n)

**Difficulty:** Medium

**Learning Objective:** Build a dictionary mapping numbers to their squares.

**Problem:** Write a program that reads `n` and prints a dictionary where each key is a number from 1 to `n` and each value is its square.

**Input:** A single line containing an integer `n`.

**Output:** Print the dictionary `{1: 1, 2: 4, ..., n: n**2}`.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
4

Output:
{1: 1, 2: 4, 3: 9, 4: 16}
```
**Explanation:** Each number maps to its square.

**Hint:** `d[i] = i ** 2` in a loop.

---

## Q443. Sum of Values for Keys That Are Even

**Difficulty:** Medium

**Learning Objective:** Filter dictionary entries by a condition on the key.

**Problem:** Write a program that reads `n` key-value pairs where keys are integers, and prints the sum of the values whose keys are even.

**Input:** Line 1: `n`. Then `n` lines each with an integer key and an integer value.

**Output:** Print a single integer equal to the sum.

**Constraints:**
- `1 <= n <= 50`

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
**Explanation:** Keys 2 and 4 are even → 20 + 30 = 50.

**Hint:** Loop over `.items()` and add `v` when `k % 2 == 0`.

---

## Q444. Function Using Default Parameter to Compute Discount

**Difficulty:** Medium

**Learning Objective:** Use a default parameter in a real calculation.

**Problem:** Write a program that reads a price and a discount percentage, and prints the discounted price using a function `apply_discount(price, discount=10)` that subtracts the discount percent.

**Input:** Two lines: `price` (int), then `discount_percent` (int).

**Output:** Print the discounted price (a decimal).

**Constraints:**
- `1 <= price <= 10**6`
- `0 <= discount_percent <= 100`

**Example:**
```
Input:
1000
20

Output:
800.0
```
**Explanation:** `1000 * 0.8 = 800.0`.

**Hint:** `def apply_discount(price, discount=10): return price * (100 - discount) / 100`.

---

## Q445. Count Negative, Zero, and Positive in a List (dictionary result)

**Difficulty:** Medium

**Learning Objective:** Categorize list elements into a dictionary.

**Problem:** Write a program that reads a list of integers and prints a dictionary with keys `"neg"`, `"zero"`, `"pos"` mapping to their counts.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the counts dictionary.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
-2 0 3 -1 0 5

Output:
{'neg': 2, 'zero': 2, 'pos': 2}
```
**Explanation:** Two negatives, two zeros, two positives.

**Hint:** Initialize `{"neg": 0, "zero": 0, "pos": 0}` and increment.

---

## Q446. Function to Reverse a String (returns it)

**Difficulty:** Medium

**Learning Objective:** Write a function that reverses a string and returns it.

**Problem:** Write a program that reads a string and prints it reversed, using a function `reverse_str(s)`.

**Input:** A single line containing a string `s`.

**Output:** Print the reversed string.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
hello

Output:
olleh
```
**Explanation:** The function returns the reversed string.

**Hint:** `def reverse_str(s): return s[::-1]`.

---

## Q447. Dictionary of Letter Frequencies (only letters)

**Difficulty:** Medium

**Learning Objective:** Build a frequency dictionary for letters only.

**Problem:** Write a program that reads a string and prints a dictionary mapping each letter to its count, ignoring non-letter characters. (Assume only letters and spaces.)

**Input:** A single line containing a string `s`.

**Output:** Print the letter-frequency dictionary.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
hello world

Output:
{'h': 1, 'e': 1, 'l': 3, 'o': 2, 'w': 1, 'r': 1, 'd': 1}
```
**Explanation:** Spaces are ignored.

**Hint:** Skip `" "` and count the rest.

---

## Q448. Function That Returns Both Sum and Product

**Difficulty:** Medium

**Learning Objective:** Return two computed values from a function.

**Problem:** Write a program that reads two integers and, using a function `sum_product(a, b)` that returns a tuple `(a+b, a*b)`, prints both.

**Input:** Two lines: integers `a` and `b`.

**Output:** Print the sum then the product, each on its own line.

**Constraints:**
- `0 <= a, b <= 10**6`

**Example:**
```
Input:
7
8

Output:
15
56
```
**Explanation:** Sum is 15, product is 56.

**Hint:** `def sum_product(a, b): return (a + b, a * b)`.

---

## Q449. Count Occurrences of Each Digit in a Number

**Difficulty:** Medium → Hard

**Learning Objective:** Build a digit-frequency dictionary.

**Problem:** Write a program that reads a positive integer and prints a dictionary mapping each digit (as an integer key) to its count.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print the digit-frequency dictionary.

**Constraints:**
- `1 <= n <= 10**12`

**Example:**
```
Input:
112233

Output:
{1: 2, 2: 2, 3: 2}
```
**Explanation:** Each digit appears twice.

**Hint:** Loop over `str(n)`, convert each char to `int`, and count.

---

## Q450. Function Checking if a Number Is Prime

**Difficulty:** Medium → Hard

**Learning Objective:** Write a function that tests primality.

**Problem:** Write a program that reads an integer and prints `Prime` or `Not prime` using a function `is_prime(n)` that returns a boolean.

**Input:** A single line containing an integer `n` (`2 <= n <= 10**5`).

**Output:** Print `Prime` or `Not prime`.

**Constraints:**
- `2 <= n <= 10**5`

**Example:**
```
Input:
29

Output:
Prime
```
**Explanation:** The function returns `True`.

**Hint:** `def is_prime(n): for d in range(2, int(n**0.5)+1): if n % d == 0: return False; return True`.

---

## Q451. Use **kwargs to Build a Dictionary

**Difficulty:** Medium → Hard

**Learning Objective:** Collect keyword arguments into a dictionary.

**Problem:** Write a program that reads a name and an age, and prints a dictionary built by a function `make_dict(**kwargs)` that returns the kwargs dictionary.

**Input:** Two lines: `name` (a `str`), then `age` (an `int`).

**Output:** Print the dictionary `{'name': ..., 'age': ...}`.

**Constraints:**
- Values are non-empty.

**Example:**
```
Input:
Aman
25

Output:
{'name': 'Aman', 'age': 25}
```
**Explanation:** `**kwargs` collects them into a dict.

**Hint:** `def make_dict(**kwargs): return kwargs`.

---

## Q452. Count the Number of Unique Words (dictionary + set)

**Difficulty:** Medium → Hard

**Learning Objective:** Count distinct words and also report their frequencies.

**Problem:** Write a program that reads a sentence and prints two things on separate lines: the number of distinct words, and the most frequent word (the first one in case of a tie).

**Input:** A single line containing a sentence.

**Output:** Line 1: the number of distinct words. Line 2: the most frequent word.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
apple banana apple cherry banana apple

Output:
3
apple
```
**Explanation:** 3 distinct words; "apple" occurs 3 times (most).

**Hint:** Build a frequency dictionary; distinct count is `len(d)`; find the most frequent.

---

## Q453. Function to Convert Celsius to Fahrenheit

**Difficulty:** Medium → Hard

**Learning Objective:** Write a reusable unit-conversion function.

**Problem:** Write a program that reads a Celsius temperature and prints the Fahrenheit value using a function `to_fahrenheit(c)`.

**Input:** A single line containing an integer `c`.

**Output:** Print the Fahrenheit value as a decimal.

**Constraints:**
- `-100 <= c <= 100`

**Example:**
```
Input:
100

Output:
212.0
```
**Explanation:** `(100 * 9/5) + 32 = 212.0`.

**Hint:** `def to_fahrenheit(c): return c * 9 / 5 + 32`.

---

## Q454. Dictionary with List Values: Sum Each List

**Difficulty:** Medium → Hard

**Learning Objective:** Process a dictionary whose values are lists.

**Problem:** Write a program that reads `n` names and, for each, three integer scores, storing them in a dictionary mapping name → list of scores. Then print each name and the sum of its scores.

**Input:** Line 1: `n`. Then `n` blocks: each has a name line, then three score lines.

**Output:** For each name, print `<name>: <sum>`.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
2
A
1
2
3
B
4
5
6

Output:
A: 6
B: 15
```
**Explanation:** Sums of each score list.

**Hint:** Build `d[name] = [s1, s2, s3]`, then `sum(v)` for each.

---

## Q455. Function That Returns a Dictionary

**Difficulty:** Medium → Hard

**Learning Objective:** Write a function that builds and returns a dictionary.

**Problem:** Write a program that reads a string and prints a character-frequency dictionary, using a function `char_freq(s)` that returns the dictionary.

**Input:** A single line containing a string `s`.

**Output:** Print the frequency dictionary.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
aab

Output:
{'a': 2, 'b': 1}
```
**Explanation:** The function returns the counts.

**Hint:** `def char_freq(s): d = {}; ...; return d`.

---

## Q456. Highest and Second-Highest Value Keys

**Difficulty:** Medium → Hard

**Learning Objective:** Find the top two values in a dictionary.

**Problem:** Write a program that reads `n` name–score pairs and prints the names with the highest and second-highest scores.

**Input:** Line 1: `n`. Then `n` lines each with a name and an integer score.

**Output:** Print `Highest: <name>` and `Second: <name>` on two lines.

**Constraints:**
- `1 <= n <= 50`
- All scores are distinct.

**Example:**
```
Input:
3
A 85
B 92
C 78

Output:
Highest: B
Second: A
```
**Explanation:** B=92, A=85.

**Hint:** Find the best, then the best among the rest.

---

## Q457. Function to Count Vowels in a String

**Difficulty:** Medium → Hard

**Learning Objective:** Write a reusable vowel-counting function.

**Problem:** Write a program that reads a string and prints the number of vowels using a function `count_vowels(s)`.

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

**Hint:** `def count_vowels(s): return sum(1 for ch in s.lower() if ch in "aeiou")`.

---

## Q458. Invert a Dictionary (values become keys)

**Difficulty:** Medium → Hard

**Learning Objective:** Swap keys and values of a dictionary.

**Problem:** Write a program that reads `n` name–score pairs and prints a new dictionary where the scores are keys and the names are values.

**Input:** Line 1: `n`. Then `n` lines each with a name and an integer score. All scores are distinct.

**Output:** Print the inverted dictionary.

**Constraints:**
- `1 <= n <= 50`

**Example:**
```
Input:
2
A 85
B 92

Output:
{85: 'A', 92: 'B'}
```
**Explanation:** Values become keys and vice versa.

**Hint:** `inv[value] = key` for each pair.

---

## Q459. Function That Uses Both *args and **kwargs

**Difficulty:** Hard

**Learning Objective:** Write a function that accepts both positional and keyword arguments.

**Problem:** Write a program that reads `n`, then `n` integers, and a flag word `pos` or `sum`. Using a function `process(*args, **kwargs)` that returns the sum of all `args` if `kwargs["mode"] == "sum"`, or the product if it is `"prod"`, print the result.

**Input:** Line 1: `n`. Then `n` lines each with an integer. Then one line with the mode (`sum` or `prod`).

**Output:** Print the computed result.

**Constraints:**
- `1 <= n <= 20`
- Values are positive integers.

**Example:**
```
Input:
3
1
2
3
prod

Output:
6
```
**Explanation:** Product of 1, 2, 3 is 6.

**Hint:** `def process(*args, **kwargs): if kwargs["mode"] == "sum": return sum(args) else: return product`.

---

## Q460. Count Words of Each Length

**Difficulty:** Hard

**Learning Objective:** Build a dictionary mapping word length → count.

**Problem:** Write a program that reads a sentence and prints a dictionary mapping each word length to the number of words of that length.

**Input:** A single line containing a sentence.

**Output:** Print the length-count dictionary.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
I love Python

Output:
{1: 1, 4: 1, 6: 1}
```
**Explanation:** Length 1: "I"; 4: "love"; 6: "Python".

**Hint:** For each word, increment `d[len(word)]`.

---

## Q461. Function to Find the GCD (loop-based)

**Difficulty:** Hard

**Learning Objective:** Write a function that computes the greatest common divisor using a loop.

**Problem:** Write a program that reads two positive integers and prints their GCD, using a function `gcd(a, b)` that returns the largest number dividing both.

**Input:** Two lines: integers `a` and `b` (`1 <= a, b`).

**Output:** Print the GCD.

**Constraints:**
- `1 <= a, b <= 10**4`

**Example:**
```
Input:
12
18

Output:
6
```
**Explanation:** 6 divides both 12 and 18.

**Hint:** Loop from `min(a, b)` down to 1; the first that divides both is the GCD.

---

## Q462. Function That Returns a List of Divisors

**Difficulty:** Hard

**Learning Objective:** Write a function that returns a list of divisors.

**Problem:** Write a program that reads `n` and prints the list of its divisors, using a function `divisors(n)`.

**Input:** A single line containing an integer `n` (`1 <= n <= 10**4`).

**Output:** Print the list of divisors in ascending order.

**Constraints:**
- `1 <= n <= 10**4`

**Example:**
```
Input:
12

Output:
[1, 2, 3, 4, 6, 12]
```
**Explanation:** Divisors of 12.

**Hint:** Collect values where `n % i == 0`.

---

## Q463. Count the Frequency of Each Word Using .get()

**Difficulty:** Hard

**Learning Objective:** Use `.get()` to accumulate frequencies concisely.

**Problem:** Write a program that reads a sentence and prints the word-frequency dictionary, using `d.get(word, 0) + 1`.

**Input:** A single line containing a sentence.

**Output:** Print the frequency dictionary.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
cat dog cat bird dog cat

Output:
{'cat': 3, 'dog': 2, 'bird': 1}
```
**Explanation:** Counts per word.

**Hint:** `d[word] = d.get(word, 0) + 1`.

---

## Q464. Function to Check Armstrong Number

**Difficulty:** Hard

**Learning Objective:** Write a function that checks whether a three-digit number is an Armstrong number.

**Problem:** Write a program that reads a three-digit number and prints `Armstrong` or `Not armstrong` using a function `is_armstrong(n)`.

**Input:** A single line containing an integer `n` (`100 <= n <= 999`).

**Output:** Print `Armstrong` or `Not armstrong`.

**Constraints:**
- `100 <= n <= 999`

**Example:**
```
Input:
153

Output:
Armstrong
```
**Explanation:** `1^3 + 5^3 + 3^3 = 153`.

**Hint:** Extract the digits, cube and sum, compare to `n`.

---

## Q465. Nested Dictionary: Find the Student with the Highest Average

**Difficulty:** Hard

**Learning Objective:** Work with a nested dictionary of lists.

**Problem:** Write a program that reads `n` students, each with three scores, storing them as a dictionary mapping name → list of scores. Print the name of the student with the highest average.

**Input:** Line 1: `n`. Then for each student: a name line, then three score lines.

**Output:** Print the name with the highest average score.

**Constraints:**
- `1 <= n <= 20`
- Scores in `[0, 100]`.

**Example:**
```
Input:
2
A
80
90
70
B
60
70
80

Output:
A
```
**Explanation:** A's average is 80, B's is 70.

**Hint:** Compute each student's average while iterating `.items()`.

---

## Q466. Function to Compute the Sum of Digits

**Difficulty:** Hard

**Learning Objective:** Write a function that sums the digits of a number.

**Problem:** Write a program that reads a positive integer and prints the sum of its digits using a function `sum_digits(n)`.

**Input:** A single line containing an integer `n` (`1 <= n <= 10**9`).

**Output:** Print the digit sum.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
12345

Output:
15
```
**Explanation:** `1+2+3+4+5 = 15`.

**Hint:** `def sum_digits(n): total = 0; while n > 0: total += n % 10; n //= 10; return total`.

---

## Q467. Merge Frequency Dictionaries

**Difficulty:** Hard

**Learning Objective:** Combine two frequency dictionaries by adding counts.

**Problem:** Write a program that reads two strings and prints a single dictionary that is the sum of the character frequencies of both strings.

**Input:** Two lines: string `a`, then string `b`.

**Output:** Print the merged frequency dictionary.

**Constraints:**
- `1 <= len(a), len(b) <= 100`

**Example:**
```
Input:
ab
ac

Output:
{'a': 2, 'b': 1, 'c': 1}
```
**Explanation:** Counts are added.

**Hint:** Build each frequency dict, then add the second into the first.

---

## Q468. Function That Returns the Nth Fibonacci Number

**Difficulty:** Hard

**Learning Objective:** Write a function that computes the nth Fibonacci number.

**Problem:** Write a program that reads `n` and prints the `n`-th Fibonacci number (with F(1)=0, F(2)=1), using a function `fib(n)`.

**Input:** A single line containing an integer `n` (`1 <= n <= 30`).

**Output:** Print the nth Fibonacci number.

**Constraints:**
- `1 <= n <= 30`

**Example:**
```
Input:
6

Output:
5
```
**Explanation:** Fibonacci: 0,1,1,2,3,5 → 6th is 5.

**Hint:** `def fib(n): a, b = 0, 1; for _ in range(n-1): a, b = b, a+b; return a`.

---

## Q469. Most Frequent Word in a Sentence (function)

**Difficulty:** Hard

**Learning Objective:** Write a function that returns the most frequent word.

**Problem:** Write a program that reads a sentence and prints the most frequent word (the first one in case of a tie), using a function `most_frequent(sentence)`.

**Input:** A single line containing a sentence.

**Output:** Print the most frequent word.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
apple banana apple cherry apple

Output:
apple
```
**Explanation:** "apple" appears 3 times.

**Hint:** Build a frequency dict inside the function and return the max-count word.

---

## Q470. Dictionary of Sum of Scores per Student (nested)

**Difficulty:** Hard

**Learning Objective:** Aggregate multiple score entries per student.

**Problem:** Write a program that reads `n` lines, each with a student name and a score. Students can appear multiple times. Print each student and their total score.

**Input:** Line 1: `n`. Then `n` lines each with a name and an integer score.

**Output:** For each student, print `<name>: <total>` (in order of first appearance).

**Constraints:**
- `1 <= n <= 100`

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
**Explanation:** Totals aggregated per student.

**Hint:** Use `d[name] = d.get(name, 0) + score`.

---

## Q471. Function That Counts Words in a Sentence

**Difficulty:** Hard

**Learning Objective:** Write a function that counts words.

**Problem:** Write a program that reads a sentence and prints the number of words using a function `word_count(sentence)`.

**Input:** A single line containing a sentence.

**Output:** Print a single integer equal to the word count.

**Constraints:**
- Between 1 and 100 words.

**Example:**
```
Input:
Python is great fun

Output:
4
```
**Explanation:** The sentence has 4 words.

**Hint:** `def word_count(s): return len(s.split())`.

---

## Q472. Sort Dictionary Keys and Print

**Difficulty:** Hard

**Learning Objective:** Print dictionary entries sorted by key.

**Problem:** Write a program that reads `n` key-value pairs and prints them sorted by key (alphabetically/lexicographically).

**Input:** Line 1: `n`. Then `n` lines each with a key (a word) and an integer value.

**Output:** Print each `key: value` in sorted-key order.

**Constraints:**
- `1 <= n <= 50`

**Example:**
```
Input:
3
banana 3
apple 5
cherry 2

Output:
apple: 5
banana: 3
cherry: 2
```
**Explanation:** Entries printed in alphabetical order.

**Hint:** Loop over `sorted(d.keys())` and print `d[k]`.

---

## Q473. Function to Reverse the Words in a Sentence

**Difficulty:** Hard

**Learning Objective:** Write a function that reverses the order of words.

**Problem:** Write a program that reads a sentence and prints the words in reverse order, using a function `reverse_words(sentence)`.

**Input:** A single line containing a sentence.

**Output:** Print the words reversed in order.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
I love Python

Output:
Python love I
```
**Explanation:** Word order is reversed.

**Hint:** `def reverse_words(s): return " ".join(s.split()[::-1])`.

---

## Q474. Nested Dictionary: Average per Student

**Difficulty:** Hard

**Learning Objective:** Store and average scores per student in a nested dictionary.

**Problem:** Write a program that reads `n` students, each with three scores, and prints each student's average rounded to one decimal place.

**Input:** Line 1: `n`. Then for each student: a name line, then three score lines.

**Output:** For each student, print `<name>: <average>`.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
2
A
80
90
70
B
60
70
80

Output:
A: 80.0
B: 70.0
```
**Explanation:** Averages of each score list.

**Hint:** Store `d[name] = [s1, s2, s3]` and print `sum(v)/3`.

---

## Q475. Function to Check if a List Is Sorted

**Difficulty:** Hard

**Learning Objective:** Write a boolean function over a list.

**Problem:** Write a program that reads a list of integers and prints `Sorted` or `Not sorted` using a function `is_sorted(lst)`.

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
**Explanation:** The list is non-decreasing.

**Hint:** `def is_sorted(lst): return all(lst[i] <= lst[i+1] for i in range(len(lst)-1))`.

---

## Q476. Count the Frequency of Digits Using .get()

**Difficulty:** Hard

**Learning Objective:** Build a digit-frequency dictionary with `.get()`.

**Problem:** Write a program that reads a positive integer and prints a dictionary mapping each digit to its count, using `d.get(digit, 0) + 1`.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print the digit-frequency dictionary.

**Constraints:**
- `1 <= n <= 10**12`

**Example:**
```
Input:
122333

Output:
{1: 1, 2: 2, 3: 3}
```
**Explanation:** Counts per digit.

**Hint:** For each digit, `d[digit] = d.get(digit, 0) + 1`.

---

## Q477. Function Returning the Largest Element of a List

**Difficulty:** Hard

**Learning Objective:** Write a function that finds the maximum of a list.

**Problem:** Write a program that reads a list of integers and prints its largest element using a function `find_max(lst)`.

**Input:** A single line containing integers separated by spaces.

**Output:** Print the maximum value.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
3 9 1 7 5

Output:
9
```
**Explanation:** The largest is 9.

**Hint:** `def find_max(lst): best = lst[0]; for x in lst: if x > best: best = x; return best`.

---

## Q478. Dictionary Comprehension for Squares

**Difficulty:** Hard

**Learning Objective:** Build a dictionary with a comprehension.

**Problem:** Write a program that reads `n` and prints a dictionary mapping each number from 1 to `n` to its square, using a dictionary comprehension.

**Input:** A single line containing an integer `n`.

**Output:** Print the dictionary `{1: 1, ..., n: n**2}`.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
3

Output:
{1: 1, 2: 4, 3: 9}
```
**Explanation:** Each number maps to its square.

**Hint:** `{i: i ** 2 for i in range(1, n + 1)}`.

---

## Q479. Function to Count Even Digits in a Number

**Difficulty:** Hard

**Learning Objective:** Write a function that counts digits with a property.

**Problem:** Write a program that reads a positive integer and prints how many of its digits are even, using a function `count_even_digits(n)`.

**Input:** A single line containing an integer `n` (`n >= 1`).

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= n <= 10**12`

**Example:**
```
Input:
2468

Output:
4
```
**Explanation:** All four digits are even.

**Hint:** Loop over `str(n)` and count digits `% 2 == 0`.

---

## Q480. Group Words by Their Length (dictionary of lists)

**Difficulty:** Hard

**Learning Objective:** Build a dictionary mapping length → list of words.

**Problem:** Write a program that reads a sentence and prints a dictionary where each key is a word length and each value is a list of words of that length.

**Input:** A single line containing a sentence.

**Output:** Print the length-grouped dictionary.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
I love Python code

Output:
{1: ['I'], 4: ['love', 'code'], 6: ['Python']}
```
**Explanation:** Words grouped by length.

**Hint:** Use `.setdefault(length, [])` or check the key and append.

---

## Q481. Function That Returns the Sum of a Dictionary's Values

**Difficulty:** Hard

**Learning Objective:** Write a function that aggregates dictionary values.

**Problem:** Write a program that reads `n` key-value pairs and prints the sum of all values using a function `total_values(d)`.

**Input:** Line 1: `n`. Then `n` lines each with a key and an integer value.

**Output:** Print the sum.

**Constraints:**
- `1 <= n <= 50`

**Example:**
```
Input:
2
a 5
b 7

Output:
12
```
**Explanation:** `5 + 7 = 12`.

**Hint:** `def total_values(d): return sum(d.values())`.

---

## Q482. Check If a Word Appears in a Dictionary's Keys

**Difficulty:** Hard

**Learning Objective:** Write a function that checks membership in a dictionary.

**Problem:** Write a program that reads `n` key-value pairs and a query word, then prints `Found` or `Not found` using a function `has_key(d, word)`.

**Input:** Line 1: `n`. Then `n` lines each with a word and a value. Then one line with a query word.

**Output:** Print `Found` or `Not found`.

**Constraints:**
- `1 <= n <= 50`

**Example:**
```
Input:
2
apple 5
banana 3
apple

Output:
Found
```
**Explanation:** "apple" is a key.

**Hint:** `def has_key(d, word): return word in d`.

---

## Q483. Function to Compute the LCM

**Difficulty:** Hard

**Learning Objective:** Write a function that computes the least common multiple.

**Problem:** Write a program that reads two positive integers and prints their LCM using a function `lcm(a, b)`.

**Input:** Two lines: integers `a` and `b` (`1 <= a, b <= 10**4`).

**Output:** Print the LCM.

**Constraints:**
- `1 <= a, b <= 10**4`

**Example:**
```
Input:
4
6

Output:
12
```
**Explanation:** The smallest number divisible by both is 12.

**Hint:** The LCM is `a * b // gcd(a, b)`, or find the smallest multiple of `a` divisible by `b`.

---

## Q484. Count How Many Keys Have Values Above a Threshold

**Difficulty:** Hard

**Learning Objective:** Filter a dictionary by its values.

**Problem:** Write a program that reads `n` key-value pairs and a threshold `t`, then prints how many values are strictly greater than `t`.

**Input:** Line 1: `n`. Then `n` lines each with a key and an integer value. Then one line with `t`.

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= n <= 50`

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
**Explanation:** Values 20 and 30 are above 15.

**Hint:** Count values in `d.values()` that are `> t`.

---

## Q485. Function to Reverse a List In Place (return the list)

**Difficulty:** Hard

**Learning Objective:** Write a function that reverses a list and returns it.

**Problem:** Write a program that reads a list of integers and prints it reversed using a function `rev_list(lst)`.

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
**Explanation:** The list is reversed.

**Hint:** `def rev_list(lst): return lst[::-1]`.

---

## Q486. Nested Dictionary: Highest Total Score with Name

**Difficulty:** Hard

**Learning Objective:** Find the best student from a nested structure.

**Problem:** Write a program that reads `n` students, each with three scores, stores them in a nested dictionary (name → {"scores": [...]}), and prints the name with the highest total score.

**Input:** Line 1: `n`. Then for each student: a name line, then three score lines.

**Output:** Print the name with the highest total.

**Constraints:**
- `1 <= n <= 20`

**Example:**
```
Input:
2
A
10
20
30
B
40
50
60

Output:
B
```
**Explanation:** B's total (150) is higher than A's (60).

**Hint:** Sum each student's scores and track the best.

---

## Q487. Function That Checks if a Number Is a Power of Two

**Difficulty:** Hard

**Learning Objective:** Write a function that tests powers of two.

**Problem:** Write a program that reads an integer and prints `Yes` or `No` using a function `is_power_of_two(n)`.

**Input:** A single line containing an integer `n` (`1 <= n <= 10**9`).

**Output:** Print `Yes` or `No`.

**Constraints:**
- `1 <= n <= 10**9`

**Example:**
```
Input:
64

Output:
Yes
```
**Explanation:** 64 is a power of two.

**Hint:** Repeatedly divide by 2 while even; it is a power of two if it ends at 1.

---

## Q488. Function That Counts Uppercase Letters

**Difficulty:** Hard

**Learning Objective:** Write a function that counts uppercase characters.

**Problem:** Write a program that reads a string and prints how many uppercase letters it contains, using a function `count_upper(s)`.

**Input:** A single line containing a string `s`.

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= len(s) <= 1000`

**Example:**
```
Input:
Hello World

Output:
2
```
**Explanation:** H and W are uppercase.

**Hint:** Count characters in `"A"`–`"Z"`.

---

## Q489. Dictionary: Count Words Starting With Each Letter

**Difficulty:** Hard

**Learning Objective:** Build a dictionary mapping starting letter → word count.

**Problem:** Write a program that reads a sentence and prints a dictionary mapping each starting letter (lowercased) to the number of words that begin with it.

**Input:** A single line containing a sentence.

**Output:** Print the letter-count dictionary.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
apple ant banana bear

Output:
{'a': 2, 'b': 2}
```
**Explanation:** Two words start with 'a', two with 'b'.

**Hint:** Use the lowercase first letter as the key.

---

## Q490. Function to Compute the Average of a List

**Difficulty:** Hard

**Learning Objective:** Write a function that returns the average of a list.

**Problem:** Write a program that reads a list of integers and prints its average rounded to two decimal places, using a function `average(lst)`.

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

**Hint:** `def average(lst): return sum(lst) / len(lst)`.

---

## Q491. Function Using Default Parameter to Compute Tip

**Difficulty:** Hard

**Learning Objective:** Use a default parameter in a real-world calculation.

**Problem:** Write a program that reads a bill amount and a tip percentage, and prints the total including tip using a function `add_tip(bill, tip_percent=10)`.

**Input:** Two lines: `bill` (int), then `tip_percent` (int).

**Output:** Print the total as a decimal.

**Constraints:**
- `1 <= bill <= 10**6`
- `0 <= tip_percent <= 100`

**Example:**
```
Input:
1000
15

Output:
1150.0
```
**Explanation:** `1000 * 1.15 = 1150.0`.

**Hint:** `def add_tip(bill, tip_percent=10): return bill * (100 + tip_percent) / 100`.

---

## Q492. Count of Values Equal to Their Key

**Difficulty:** Hard

**Learning Objective:** Compare dictionary keys with values.

**Problem:** Write a program that reads `n` integer key-value pairs and prints how many pairs have the value equal to the key.

**Input:** Line 1: `n`. Then `n` lines each with an integer key and an integer value.

**Output:** Print a single integer equal to the count.

**Constraints:**
- `1 <= n <= 50`

**Example:**
```
Input:
3
1 1
2 5
3 3

Output:
2
```
**Explanation:** Pairs (1,1) and (3,3) match.

**Hint:** Count when `k == v` over `.items()`.

---

## Q493. Function That Returns the Mode (most frequent) of a List

**Difficulty:** Hard

**Learning Objective:** Write a function that returns the most frequent element.

**Problem:** Write a program that reads a list of integers and prints the most frequent value using a function `mode(lst)` (the first in case of a tie).

**Input:** A single line containing integers separated by spaces.

**Output:** Print the most frequent value.

**Constraints:**
- Between 1 and 100 integers.

**Example:**
```
Input:
1 2 2 3 2 4

Output:
2
```
**Explanation:** 2 appears 3 times.

**Hint:** Build a frequency dict in the function and return the max-count key.

---

## Q494. Merge Two Lists of Pairs into a Dictionary (with overwrite)

**Difficulty:** Hard

**Learning Objective:** Build a dictionary from lists of pairs and handle overrides.

**Problem:** Write a program that reads a list of `key:value` pairs on one line and another list of pairs on a second line, and prints the merged dictionary where the second list's values override the first for duplicate keys.

**Input:** Two lines, each formatted like `a:1,b:2`.

**Output:** Print the merged dictionary.

**Constraints:**
- Between 1 and 5 pairs per line.

**Example:**
```
Input:
a:1,b:2
b:9,c:3

Output:
{'a': 1, 'b': 9, 'c': 3}
```
**Explanation:** "b" is overridden.

**Hint:** Parse each list into a dict and update.

---

## Q495. Function to Check If a String Has All Unique Characters

**Difficulty:** Hard

**Learning Objective:** Write a boolean function using a set.

**Problem:** Write a program that reads a string and prints `Unique` or `Duplicate` using a function `all_unique(s)`.

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
**Explanation:** No repeated characters.

**Hint:** `def all_unique(s): return len(s) == len(set(s))`.

---

## Q496. Nested Dictionary: Build Grades from Scores

**Difficulty:** Hard

**Learning Objective:** Build a nested dictionary with computed grade values.

**Problem:** Write a program that reads `n` students, each with three scores, and prints a dictionary mapping each name to a nested dictionary with `"scores"` and `"grade"`, where the grade is the average mapped to `A` (≥80), `B` (≥60), `C` (≥40), or `F` (below 40).

**Input:** Line 1: `n`. Then for each student: a name line, then three score lines.

**Output:** Print the nested dictionary.

**Constraints:**
- `1 <= n <= 20`
- Scores in `[0, 100]`.

**Example:**
```
Input:
2
A
80
90
70
B
30
20
40

Output:
{'A': {'scores': [80, 90, 70], 'grade': 'A'}, 'B': {'scores': [30, 20, 40], 'grade': 'F'}}
```
**Explanation:** A's average is 80 → A; B's average is 30 → F.

**Hint:** Compute the average, assign a grade with conditions, and store both in a nested dict.

---

## Q497. Function That Returns the Second Largest of a List

**Difficulty:** Hard

**Learning Objective:** Write a function that finds the second largest value.

**Problem:** Write a program that reads a list of integers and prints its second largest element using a function `second_largest(lst)`.

**Input:** A single line containing at least 2 integers.

**Output:** Print the second largest value.

**Constraints:**
- Between 2 and 100 integers.

**Example:**
```
Input:
3 9 1 7 5

Output:
7
```
**Explanation:** Largest is 9, second is 7.

**Hint:** Sort a copy and take index `-2`, or track two values.

---

## Q498. Dictionary of Word Length Frequencies with Most Common Length

**Difficulty:** Hard

**Learning Objective:** Find the most common word length.

**Problem:** Write a program that reads a sentence, builds a dictionary of word-length counts, and prints the length that occurs most frequently (the smallest in case of a tie).

**Input:** A single line containing a sentence.

**Output:** Print a single integer equal to the most common word length.

**Constraints:**
- Between 1 and 50 words.

**Example:**
```
Input:
hi I am here now

Output:
2
```
**Explanation:** Lengths: 2,1,2,4,3 → length 2 occurs twice (most).

**Hint:** Build the length-count dict and pick the best length.

---

## Q499. Function Using Both *args and Default to Sum or Count

**Difficulty:** Hard

**Learning Objective:** Write a flexible function using `*args` and a default parameter.

**Problem:** Write a program that reads `n`, then `n` integers, and a mode word (`sum` or `count`). Using a function `stats(*args, mode="sum")` that returns the sum if mode is `sum`, otherwise the count of values, print the result.

**Input:** Line 1: `n`. Then `n` lines each with an integer. Then one line with the mode.

**Output:** Print the result.

**Constraints:**
- `1 <= n <= 50`

**Example:**
```
Input:
3
5
5
9
count

Output:
3
```
**Explanation:** Count mode returns 3 (number of values).

**Hint:** `def stats(*args, mode="sum"): return sum(args) if mode == "sum" else len(args)`.

---

## Q500. Nested Dictionary: Student Report Card with Per-Subject and Total

**Difficulty:** Hard

**Learning Objective:** Build a complete nested dictionary report card and print a summary.

**Problem:** Write a program that reads `n` students. Each student has three subject scores. Store each student as a nested dictionary with keys `"scores"` (a list) and `"total"` (the sum). Then print each student's name, total, and whether they passed (`Pass` if total ≥ 120, else `Fail`).

**Input:** Line 1: `n`. Then for each student: a name line, then three score lines.

**Output:** For each student, print `<name>: total=<total> <Pass|Fail>`.

**Constraints:**
- `1 <= n <= 20`
- Scores in `[0, 100]`.

**Example:**
```
Input:
2
A
50
50
50
B
20
30
40

Output:
A: total=150 Pass
B: total=90 Fail
```
**Explanation:** A's total 150 ≥ 120 → Pass; B's total 90 → Fail.

**Hint:** Build `d[name] = {"scores": [...], "total": ...}` then loop over `.items()` to print the summary.
