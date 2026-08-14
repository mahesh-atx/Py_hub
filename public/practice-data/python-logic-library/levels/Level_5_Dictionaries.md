# Level 5 — Dictionaries (30 Questions)

**What this level teaches:** creating and accessing dictionaries, updating data, looping over keys/values/items, frequency counting, finding the most frequent element, grouping values, nested dictionaries, and sorting.

**Total questions:** 30

> A dictionary maps **keys** to **values**: `{"name": "Rahul", "age": 25}`. Write your own code first, then check the solution.

---

## Question 1: Create a dictionary and access a value

**What to do:** Create `student = {"name": "Rahul", "age": 20, "city": "Beed"}` and print the value of `"name"`.

**Hint:** `student["name"]`.

**Solution:**

```python
student = {"name": "Rahul", "age": 20, "city": "Beed"}

print(student["name"])
```

**Logic:** Access a value by its key, like looking up a word in a real dictionary.

---

## Question 2: Add and update entries

**What to do:** Using `student` from Question 1, add a new key `"grade": "A"`, then change `"age"` to 21. Print the dictionary.

**Hint:** Assigning to an existing key updates it; assigning to a new key adds it.

**Solution:**

```python
student = {"name": "Rahul", "age": 20, "city": "Beed"}

student["grade"] = "A"   # new key → added
student["age"] = 21      # existing key → updated

print(student)
```

**Logic:** Same syntax does both jobs — Python decides based on whether the key exists.

---

## Question 3: Remove an entry

**What to do:** Given `student = {"name": "Rahul", "age": 20, "city": "Beed"}`, remove the `"city"` key using `del` and remove `"age"` using `pop()`. Print the result.

**Hint:** `del student["city"]` and `student.pop("age")`.

**Solution:**

```python
student = {"name": "Rahul", "age": 20, "city": "Beed"}

del student["city"]
age = student.pop("age")

print(student)
print("Removed age:", age)
```

**Logic:** `del` just deletes; `pop()` deletes *and returns* the value.

---

## Question 4: Loop over keys

**What to do:** Given `scores = {"math": 85, "science": 90, "english": 78}`, print every key, one per line.

**Hint:** `for key in scores:` — a plain loop over a dictionary gives its keys.

**Solution:**

```python
scores = {"math": 85, "science": 90, "english": 78}

for key in scores:
    print(key)
```

**Logic:** Iterating a dictionary visits its keys by default.

---

## Question 5: Loop over values

**What to do:** With the same `scores` dictionary, print every value, one per line.

**Hint:** `scores.values()`.

**Solution:**

```python
scores = {"math": 85, "science": 90, "english": 78}

for value in scores.values():
    print(value)
```

**Logic:** `.values()` gives you just the values, without the keys.

---

## Question 6: Loop over keys and values together

**What to do:** With the same `scores` dictionary, print each subject and its score in the form `math: 85`.

**Hint:** `scores.items()` gives (key, value) pairs — unpack them in the loop.

**Solution:**

```python
scores = {"math": 85, "science": 90, "english": 78}

for subject, score in scores.items():
    print(subject + ":", score)
```

**Logic:** `.items()` plus unpacking is the most common dictionary loop of all.

---

## Question 7: Check if a key exists

**What to do:** Given `student = {"name": "Rahul", "age": 20}`, print "Yes" if the key `"age"` exists, and check `"grade"` too.

**Hint:** The `in` operator works on keys: `"age" in student`.

**Solution:**

```python
student = {"name": "Rahul", "age": 20}

print("age" in student)     # True
print("grade" in student)   # False
```

**Logic:** Membership testing on a dictionary checks its *keys*.

---

## Question 8: Get a value with a default

**What to do:** Given `student = {"name": "Rahul", "age": 20}`, print `student["grade"]` safely — showing "No grade" if the key is missing.

**Hint:** `student.get("grade", "No grade")` — the second argument is the fallback.

**Solution:**

```python
student = {"name": "Rahul", "age": 20}

print(student.get("grade", "No grade"))
```

**Logic:** `get()` never crashes on a missing key; it returns the default instead.

---

## Question 9: Merge two dictionaries

**What to do:** Given `d1 = {"a": 1, "b": 2}` and `d2 = {"c": 3, "d": 4}`, combine them into one dictionary and print it.

**Hint:** `d1.update(d2)` changes `d1`, or `{**d1, **d2}` builds a new one.

**Solution:**

```python
d1 = {"a": 1, "b": 2}
d2 = {"c": 3, "d": 4}

d1.update(d2)
print(d1)

# Building a new dictionary instead:
print({**d1, **d2})
```

**Logic:** `update()` merges into an existing dictionary; keys from `d2` overwrite same-named keys in `d1`.

---

## Question 10: Frequency of elements in a list

**What to do:** Given `numbers = [1, 2, 2, 3, 3, 3, 4]`, build a dictionary showing how many times each number appears.

**Hint:** Loop over the list; if the number is already a key, add 1 to its count, else set its count to 1.

**Solution:**

```python
numbers = [1, 2, 2, 3, 3, 3, 4]

frequency = {}

for number in numbers:
    if number in frequency:
        frequency[number] += 1
    else:
        frequency[number] = 1

print(frequency)
```

**Logic:** The most important dictionary pattern — counting with "if key exists / else create it".

---

## Question 11: Frequency of characters in a string

**What to do:** Given `text = "banana"`, print a dictionary of how many times each letter appears.

**Hint:** Same counting pattern as Question 10, but looping over characters.

**Solution:**

```python
text = "banana"

frequency = {}

for character in text:
    if character in frequency:
        frequency[character] += 1
    else:
        frequency[character] = 1

print(frequency)
```

**Logic:** Once you know the counting pattern, the data source (list, string, tuple) doesn't matter.

---

## Question 12: Find the most frequent element

**What to do:** Given `numbers = [1, 3, 2, 3, 4, 3, 2]`, print the element that appears most often.

**Hint:** First build the frequency dictionary, then find the key with the biggest value — keep a "current best" key.

**Solution:**

```python
numbers = [1, 3, 2, 3, 4, 3, 2]

frequency = {}
for number in numbers:
    if number in frequency:
        frequency[number] += 1
    else:
        frequency[number] = 1

most_frequent = None
for key, value in frequency.items():
    if most_frequent is None or value > frequency[most_frequent]:
        most_frequent = key

print(most_frequent)
```

**Logic:** The "current best" pattern, applied to a dictionary's values. (Answer: 3)

---

## Question 13: Find keys with the smallest value

**What to do:** Given `scores = {"math": 85, "science": 90, "english": 78}`, print the subject with the lowest score.

**Hint:** Like Question 12, but compare with `<`. Or use `min(scores, key=scores.get)`.

**Solution:**

```python
scores = {"math": 85, "science": 90, "english": 78}

lowest_subject = None
for subject, score in scores.items():
    if lowest_subject is None or score < scores[lowest_subject]:
        lowest_subject = subject

print(lowest_subject)
print(min(scores, key=scores.get))  # one-line version
```

**Logic:** Two solutions to the same problem — the manual pattern and the built-in shortcut.

---

## Question 14: Group words by their first letter

**What to do:** Given `words = ["apple", "banana", "avocado", "cherry", "blueberry"]`, group them into a dictionary keyed by first letter.

**Hint:** For each word, if the first letter isn't a key yet, create it with an empty list `[]`; then append the word.

**Solution:**

```python
words = ["apple", "banana", "avocado", "cherry", "blueberry"]

groups = {}

for word in words:
    first = word[0]
    if first not in groups:
        groups[first] = []
    groups[first].append(word)

print(groups)
```

**Logic:** The grouping pattern — dictionary values that are *lists*.

---

## Question 15: Group numbers into even and odd

**What to do:** Given `numbers = [1, 2, 3, 4, 5, 6, 7, 8]`, build a dictionary like `{"even": [...], "odd": [...]}`.

**Hint:** Two fixed keys with lists — create both keys first, then append.

**Solution:**

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8]

groups = {"even": [], "odd": []}

for number in numbers:
    if number % 2 == 0:
        groups["even"].append(number)
    else:
        groups["odd"].append(number)

print(groups)
```

**Logic:** When the groups are known in advance, create the keys up front.

---

## Question 16: Invert a dictionary

**What to do:** Given `capitals = {"India": "Delhi", "Japan": "Tokyo"}`, build a new dictionary mapping city → country, and print it.

**Hint:** Loop over `.items()` and swap: `inverted[city] = country`.

**Solution:**

```python
capitals = {"India": "Delhi", "Japan": "Tokyo"}

inverted = {}

for country, city in capitals.items():
    inverted[city] = country

print(inverted)
```

**Logic:** Swapping keys and values — assuming the values are unique.

---

## Question 17: Sum of all values

**What to do:** Given `expenses = {"rent": 5000, "food": 3000, "travel": 1500}`, print the total of all values.

**Hint:** `sum(expenses.values())` or a loop.

**Solution:**

```python
expenses = {"rent": 5000, "food": 3000, "travel": 1500}

total = 0
for value in expenses.values():
    total += value

print(total)
print(sum(expenses.values()))  # shortcut
```

**Logic:** The running-total pattern over dictionary values. (Answer: 9500)

---

## Question 18: Keys with values above a threshold

**What to do:** Given `scores = {"math": 85, "science": 92, "english": 78, "history": 88}`, print the subjects scored **90 or above**.

**Hint:** Loop over `.items()` and filter with an `if`.

**Solution:**

```python
scores = {"math": 85, "science": 92, "english": 78, "history": 88}

for subject, score in scores.items():
    if score >= 90:
        print(subject)
```

**Logic:** The filter pattern over key-value pairs. (Answer: science)

---

## Question 19: Access a nested dictionary

**What to do:** Given a dictionary of students where each student maps to their marks, print Rahul's math marks (85).

```python
students = {
    "Rahul": {"math": 85, "science": 90},
    "Priya": {"math": 92, "science": 88}
}
```

**Hint:** Chain the keys: `students["Rahul"]["math"]`.

**Solution:**

```python
students = {
    "Rahul": {"math": 85, "science": 90},
    "Priya": {"math": 92, "science": 88}
}

print(students["Rahul"]["math"])
```

**Logic:** A dictionary inside a dictionary — access it layer by layer.

---

## Question 20: Store student information and print it

**What to do:** Store `name`, `age`, and `grade` in a dictionary, then print them in a friendly sentence using the keys.

**Hint:** Build the dictionary, then use the keys in a formatted string.

**Solution:**

```python
student = {"name": "Priya", "age": 19, "grade": "A+"}

print(student["name"], "is", student["age"], "years old and got grade", student["grade"])
```

**Logic:** Dictionaries are the natural way to store *structured information* about one thing.

---

## Question 21: Count word occurrences in a sentence

**What to do:** Given `sentence = "the cat and the dog"`, print a dictionary counting how many times each word appears.

**Hint:** `split()` the sentence into words, then apply the frequency pattern.

**Solution:**

```python
sentence = "the cat and the dog"

words = sentence.split()

word_count = {}
for word in words:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

print(word_count)
```

**Logic:** Split → count → dictionary. (Answer: the: 2, cat: 1, and: 1, dog: 1)

---

## Question 22: Find common keys of two dictionaries

**What to do:** Given `d1 = {"a": 1, "b": 2, "c": 3}` and `d2 = {"b": 20, "c": 30, "d": 40}`, print the keys that exist in both.

**Hint:** Convert the keys to sets and intersect: `set(d1) & set(d2)`.

**Solution:**

```python
d1 = {"a": 1, "b": 2, "c": 3}
d2 = {"b": 20, "c": 30, "d": 40}

common_keys = set(d1) & set(d2)

print(common_keys)
```

**Logic:** Level 4's set tools work beautifully on dictionary keys.

---

## Question 23: Sort a dictionary by keys

**What to do:** Given `scores = {"math": 85, "art": 90, "bio": 78}`, print the items sorted alphabetically by key.

**Hint:** `sorted(scores.items())` sorts (key, value) pairs by key automatically.

**Solution:**

```python
scores = {"math": 85, "art": 90, "bio": 78}

for subject, score in sorted(scores.items()):
    print(subject, score)
```

**Logic:** `.items()` gives pairs, and tuples sort by their first element — the key.

---

## Question 24: Sort a dictionary by values

**What to do:** With the same `scores` dictionary, print the items from lowest to highest score.

**Hint:** `sorted(scores.items(), key=lambda item: item[1])` — the `key` tells Python what to sort by.

**Solution:**

```python
scores = {"math": 85, "art": 90, "bio": 78}

for subject, score in sorted(scores.items(), key=lambda item: item[1]):
    print(subject, score)
```

**Logic:** `key=lambda item: item[1]` means "sort each pair by its second element (the value)".

---

## Question 25: Keep only unique values

**What to do:** Given `data = {"a": 1, "b": 2, "c": 1, "d": 3}`, remove entries whose value has already appeared, so each value stays once. Print the result.

**Hint:** Track seen values in a set; delete or skip repeated ones.

**Solution:**

```python
data = {"a": 1, "b": 2, "c": 1, "d": 3}

seen = set()
result = {}

for key, value in data.items():
    if value not in seen:
        result[key] = value
        seen.add(value)

print(result)
```

**Logic:** A set remembers which values have been used — the filter pattern again.

---

## Question 26: Top 3 most common words

**What to do:** Given `text = "apple banana apple orange banana apple grape apple mango banana"`, print the 3 most common words with their counts.

**Hint:** Build the frequency dictionary, then sort by count in reverse and take the first 3.

**Solution:**

```python
text = "apple banana apple orange banana apple grape apple mango banana"

word_count = {}
for word in text.split():
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

top3 = sorted(word_count.items(), key=lambda item: item[1], reverse=True)[:3]

print(top3)
```

**Logic:** Frequency + sort-by-value + slicing = a mini analytics engine.

---

## Question 27: Build a dictionary from two lists

**What to do:** Given `keys = ["name", "age", "city"]` and `values = ["Rahul", 20, "Beed"]`, combine them into one dictionary.

**Hint:** `dict(zip(keys, values))` — or a loop with indexes.

**Solution:**

```python
keys = ["name", "age", "city"]
values = ["Rahul", 20, "Beed"]

combined = dict(zip(keys, values))

print(combined)
```

**Logic:** `zip()` pairs up items position by position; `dict()` turns the pairs into key-value entries.

---

## Question 28: Check values with all() and any()

**What to do:** Given `scores = {"math": 85, "science": 90, "english": 78}`, print whether **all** scores are above 80, and whether **any** score is above 89.

**Hint:** `all(value > 80 for value in scores.values())` and the same with `any(...)`.

**Solution:**

```python
scores = {"math": 85, "science": 90, "english": 78}

print(all(value > 80 for value in scores.values()))   # False
print(any(value > 89 for value in scores.values()))   # True
```

**Logic:** `all` = every value passes; `any` = at least one passes.

---

## Question 29: Dictionary comprehension — squares

**What to do:** Build the dictionary `{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}` (number → its square) in a single line.

**Hint:** `{x: x * x for x in range(1, 6)}`.

**Solution:**

```python
squares = {x: x * x for x in range(1, 6)}

print(squares)
```

**Logic:** Dictionary comprehensions build dictionaries the way list comprehensions build lists.

---

## Question 30: Mini phone book

**What to do:** Build a small phone book: add three contacts, search for one, update a number, and delete a contact. Use a loop with `input()` so the user chooses the action.

**Hint:** A dictionary plus a `while True` menu with options add / search / update / delete / quit.

**Solution:**

```python
phone_book = {"Rahul": "9876543210", "Priya": "9123456780"}

while True:
    print("\n1. Add   2. Search   3. Update   4. Delete   5. Quit")
    choice = input("Choose an option: ")

    if choice == "1":
        name = input("Name: ")
        number = input("Number: ")
        phone_book[name] = number
        print("Added.")

    elif choice == "2":
        name = input("Name: ")
        print(phone_book.get(name, "Not found"))

    elif choice == "3":
        name = input("Name: ")
        if name in phone_book:
            phone_book[name] = input("New number: ")
            print("Updated.")
        else:
            print("Not found")

    elif choice == "4":
        name = input("Name: ")
        if phone_book.pop(name, None):
            print("Deleted.")
        else:
            print("Not found")

    elif choice == "5":
        print("Bye!")
        break

    else:
        print("Invalid option")
```

**Logic:** One small program that uses almost everything from this level: add, get, update, `in`, `pop`, and a menu loop.

---

## Level 5 recap — what you now know

- **Key-value thinking** — look things up by name, not by position (Q1–8).
- **The frequency pattern** — "if key exists, add 1; else, start at 1" (Q10–12, 21).
- **The grouping pattern** — dictionary values that are lists (Q14–15).
- **Nested dictionaries** — structured data inside structured data (Q19–20).
- **Sorting dictionaries** — by key (default) or by value with `key=lambda` (Q23–24, 26).
- **Building dictionaries** — from two lists with `zip()`, and with comprehensions (Q27, 29).
- **Real program shape** — menu + input + dictionary = phone book (Q30).
