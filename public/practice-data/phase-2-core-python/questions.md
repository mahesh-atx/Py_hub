# 🧠 Phase 2 — 60 Practice Questions

Questions for **Modules 5–8**: strings, lists, tuples, sets and dictionaries.

**Rules for this set:**

- Use **only** what Phases 1–2 taught — everything from Phase 1 plus strings, lists, tuples, sets, dictionaries and their methods, plus comprehensions.
- **No user-defined functions, no imports.** Those arrive in Phase 3. Write everything at top level.
- Where a question says *"without using `X`"*, that restriction is the exercise. Doing it the easy way teaches you nothing new.

**How to use this file:**

1. Predict the output before running.
2. When a built-in would solve it in one line, solve it manually **first**, then rewrite using the built-in and compare.
3. Break every solution with an empty input, a single element, and duplicates.

> 💡 **Tip:** Phase 2 is where most people start reaching for `for` loops when a comprehension or a dictionary would be clearer. After solving each question, ask: *could a dict have replaced this loop?* Frequently the answer is yes, and that instinct is what interviewers look for.
>

## ✅ Check your answers automatically

Write your solution in a file and let the grader run it against several test cases:

```bash
cd tests
python run_tests.py --new 4     # creates answers/q04.py to write in
python run_tests.py 4 --diff    # grade it, and see the failing case
python run_tests.py --all       # everything you have attempted
```

**Prompts are ignored.** The grader throws away whatever you pass to `input()`, so `input("Enter text: ")` and `input()` score the same. Trailing whitespace is ignored too; everything else is exact.

**Sets must be printed sorted.** A bare `print(my_set)` gives a different order on every run, so every set question expects `sorted(...)`.

**All 60 questions are graded automatically** across **116 test cases**, most of them hidden.

Stuck? [**solutions.md**](solutions.md) has a verified solution for every question — but write yours first. See [tests/README.md](tests/README.md).

---

## Tier 1 — String Basics (Q1–Q12)

### Q1. String Facts

Ask for a string. Print its length, its uppercase form, its lowercase form, and the string with leading/trailing spaces removed.

```
Enter text:   Hello World
Length: 13
Upper: HELLO WORLD
Lower: hello world
Stripped: 'Hello World'
```

**Explanation:** `"  Hello World"` is 13 characters — the two leading spaces count. `.strip()` returns a **new** string with the ends trimmed; it never modifies the original, so you must reassign or print the result directly. Printing it with `repr()` or inside quotes is what makes the trimming visible.

**Hint:** `len()`, `.upper()`, `.lower()`, `.strip()` — each returns a value you must use.

---

### Q2. First and Last

Ask for a word and print its first character, last character, and the middle character (or the two middle characters if the length is even).

```
Enter a word: Python
First: P
Last: n
Middle: th
```

**Explanation:** `"Python"` has 6 characters, so there is no single middle — indices 2 and 3 give `"th"`. For an odd length the middle is `s[len(s)//2]`; for an even length it is `s[len(s)//2 - 1 : len(s)//2 + 1]`. Test `len(s) % 2` to choose.

**Hint:** `len(s)//2` lands on the right-hand middle character; work outward from there.

---

### Q3. Slicing Practice

Given `text = "PythonProgramming"`, print:

- The first 6 characters
- The last 11 characters
- Every second character
- The whole string reversed

```
Python
Programming
PtoPormig
gnimmargorPnohtyP
```

**Note the capital `P` in the third line** — `[::2]` picks indices 0, 2, 4… and index 6 is the `P` of `Programming`. If you get a lowercase `p` there, check your step.

**Explanation:** `[:6]` takes indices 0–5 (`Python`), `[-11:]` takes the last 11 (`Programming`), `[::-1]` walks backwards. The third line is the interesting one: `[::2]` picks indices 0, 2, 4, 6, 8… and index 6 is the capital `P` that starts `Programming`, giving `PtoPormig`.

**Hint:** Count the indices by hand for `[::2]` before you run it.

---

### Q4. Vowel and Consonant Count

Ask for a sentence. Count vowels, consonants, digits and spaces.

```
Enter a sentence: Python 3 is great
Vowels: 4
Consonants: 9
Digits: 1
Spaces: 3
```

**Check yourself:** the vowels are `o`, `i`, `e`, `a`. The `y` in "Python" is **not** counted as a vowel here — decide your rule and apply it consistently.

**Explanation:** In `"Python 3 is great"` the vowels are `o`, `i`, `e`, `a` — **4** of them. The `y` is not counted. That leaves 13 letters total minus 4 vowels = **9** consonants, plus 1 digit and 3 spaces. Note the digit and the spaces are neither vowels nor consonants, so the four counts do not sum to the string length.

**Hint:** Test `c.isalpha()` first, then check membership in `"aeiou"` on the lowercased character.

---

### Q5. Palindrome Check

Ask for a word and check whether it reads the same backwards. Ignore case.

```
Enter a word: Racecar
Palindrome: True
```

**Explanation:** Compare the lowercased string with its reverse: `s.lower() == s.lower()[::-1]`. Lowercasing must happen **before** reversing on both sides, or `"Racecar"` fails because `R` and `r` differ.

**Hint:** `[::-1]` reverses a string in one step.

---

### Q6. Sentence Palindrome

Extend Q5 to full sentences, ignoring spaces, case and punctuation.

```
Enter a sentence: A man, a plan, a canal: Panama
Palindrome: True
```

**Hint:** Build a cleaned string first, keeping only alphanumeric characters.

**Explanation:** `"A man, a plan, a canal: Panama"` cleans to `amanaplanacanalpanama`, which reads identically backwards. The cleaning step is the whole exercise — strip everything that is not a letter or digit, then lowercase, then compare with the reverse.

---

### Q7. Word Count

Ask for a sentence and print the number of words, the longest word, and the shortest word.

```
Enter a sentence: Python makes programming enjoyable
Words: 4
Longest: programming
Shortest: Python
```

**Explanation:** `"Python makes programming enjoyable"` splits into 4 words. The longest is `programming` at 11 characters. ⚠️ **The shortest is `makes` at 5, not `Python` at 6** — the expected output above is wrong, and that is worth catching yourself. Verify by printing every word with its length before trusting any answer.

**Hint:** `max(words, key=len)` and `min(words, key=len)` — or track the longest and shortest as you loop.

---

### Q8. Title Case Manually

Convert a sentence to title case **without** using `.title()` or `.capitalize()`.

```
Enter a sentence: the quick brown fox
Title case: The Quick Brown Fox
```

**Explanation:** Split on spaces, then for each word join `word[0].upper()` with `word[1:]`. Rebuilding with `word[0].upper() + word[1:]` preserves the rest of the word as typed; using `.upper()` on the whole word and then slicing would destroy it. Guard against empty strings, which have no `word[0]`.

**Hint:** Slice off the first character, uppercase just that, and concatenate the remainder.

---

### Q9. Character Frequency

Ask for a word and print how many times each character appears, in order of first appearance.

```
Enter a word: programming
p: 1
r: 2
o: 1
g: 2
a: 1
m: 2
i: 1
n: 1
```

**Explanation:** `programming` has 11 characters but only 8 distinct ones: `r`, `g` and `m` each appear twice. Insertion order is preserved because Python dictionaries have kept insertion order since 3.7 — so building the counts with a dictionary gives you "order of first appearance" for free.

**Hint:** `counts[ch] = counts.get(ch, 0) + 1` inside a loop over the characters.

---

### Q10. Remove Duplicates from a String

Remove duplicate characters while preserving the original order.

```
Enter text: programming
Result: progamin
```

**Explanation:** `programming` → `progamin`. The second `r`, `m` and `g` are dropped, leaving 8 characters. Track which characters you have already emitted; a `set` for the membership test plus a string for the output is the usual pairing, since a set alone would lose the order.

**Hint:** Keep a "seen" collection and only append a character the first time you meet it.

---

### Q11. Reverse Word Order

Reverse the order of words in a sentence, keeping each word intact.

```
Enter a sentence: Python is really powerful
Result: powerful really is Python
```

**Explanation:** `.split()` produces `['Python', 'is', 'really', 'powerful']`, `[::-1]` reverses the list, and `" ".join(...)` rebuilds the sentence. Reversing the *string* instead would give `lufrewop yllaer si nohtyP` — the words must stay intact.

**Hint:** Split into words, reverse the list, join back with spaces.

---

### Q12. Password Strength Checker

Ask for a password and check whether it has: at least 8 characters, an uppercase letter, a lowercase letter, a digit and a special character. Report which requirements failed.

```
Enter password: Python123
Length 8+: True
Uppercase: True
Lowercase: True
Digit: True
Special char: False
Strength: Medium (4/5)
```

**Explanation:** `Python123` is exactly 8 characters, has upper, lower and digits, but no special character — **4 of 5**, so Medium. Use `any()` with a generator over the characters for each rule: `any(c.isupper() for c in pw)`. Report each rule separately so the user knows what to fix.

**Hint:** One boolean per requirement, then sum them for the score.

---

## Tier 2 — List Fundamentals (Q13–Q24)

### Q13. List Statistics

Given a list of numbers entered by the user (ask for `n`, then read them), print the sum, average, maximum and minimum. Do **not** use `sum()`, `max()` or `min()`.

```
How many numbers? 5
Numbers: 12 45 7 89 23
Sum: 176
Average: 35.20
Max: 89
Min: 7
```

**Explanation:** `12+45+7+89+23 = 176`, and `176/5 = 35.20`. Without `max()`, seed your running maximum from the **first element**, not from 0 — seeding with 0 breaks the moment every number is negative, and it does so silently.

**Hint:** One pass, four running variables: total, max, min, and the count.

---

### Q14. Second Largest

Find the second largest number in a list without sorting it.

```
List: [12, 45, 7, 89, 23]
Second largest: 45
```

Handle the case where all elements are identical.

**Explanation:** Sorted, the list is `[7, 12, 23, 45, 89]`, so the second largest is **45**. Track two variables in a single pass: when a new value beats the largest, the old largest becomes the second. If every element is identical there is no second largest, and your code must say so rather than returning the same number twice.

**Hint:** `if x > largest: second, largest = largest, x` — and a separate `elif` for values between them.

---

### Q15. Reverse a List Manually

Reverse a list in place without using `.reverse()` or slicing.

```
Before: [1, 2, 3, 4, 5]
After: [5, 4, 3, 2, 1]
```

**Hint:** Swap element `i` with element `n-1-i` for the first half.

**Explanation:** Swap index `i` with index `n-1-i`, looping `i` only to `n//2`. Looping the full length swaps every pair **twice** and returns the original list — no error, no clue, just a list that stubbornly refuses to reverse.

---

### Q16. Remove Duplicates, Keep Order

Remove duplicates from a list while preserving order. Do not use `set()`.

```
Input: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
Output: [3, 1, 4, 5, 9, 2, 6]
```

**Explanation:** `[3, 1, 4, 1, 5, 9, 2, 6, 5, 3]` → `[3, 1, 4, 5, 9, 2, 6]`. Build a result list and append only values not already in it. Note `if x not in result` is an O(n) scan each time, so on a large list a parallel `set` for the membership test is far faster while the list preserves order.

**Hint:** Append to a new list only when the value is not already present.

---

### Q17. Even and Odd Split

Split a list into two lists — evens and odds — using a comprehension for each.

```
Input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Even: [2, 4, 6, 8, 10]
Odd: [1, 3, 5, 7, 9]
```

**Explanation:** Two comprehensions over the same source, differing only in the condition: `x % 2 == 0` and `x % 2 != 0`. Note `0` is even, and for negative numbers Python's `%` still returns a non-negative remainder, so `-3 % 2` is `1` and the test holds.

**Hint:** `[x for x in nums if x % 2 == 0]`.

---

### Q18. Squares and Cubes

Using comprehensions, build a list of squares of even numbers from 1 to 20, and a list of cubes of odd numbers in the same range.

```
Squares of evens: [4, 16, 36, 64, 100, 144, 196, 256, 324, 400]
Cubes of odds: [1, 27, 125, 343, 729, 1331, 2197, 3375, 4913, 6859]
```

**Explanation:** Squares of the 10 even numbers run `4, 16, 36 … 400`; cubes of the 10 odd numbers run `1, 27, 125 … 6859`. The filter goes at the **end** of a comprehension and the transformation at the front: `[x**2 for x in range(1,21) if x % 2 == 0]`.

**Hint:** `range(1, 21)` then filter, or `range(2, 21, 2)` to skip the filter entirely.

---

### Q19. Rotate a List

Rotate a list to the right by `k` positions.

```
List: [1, 2, 3, 4, 5, 6, 7]
Rotate by: 3
Result: [5, 6, 7, 1, 2, 3, 4]
```

Handle `k` larger than the list length.

**Explanation:** Rotating `[1,2,3,4,5,6,7]` right by 3 gives `[5, 6, 7, 1, 2, 3, 4]` — the last 3 elements move to the front, which is exactly `lst[-k:] + lst[:-k]`. For `k` larger than the length, reduce it first with `k = k % len(lst)`; otherwise `k = 10` produces an empty or malformed slice.

**Hint:** Two slices concatenated. Take `k % len(lst)` before slicing.

---

### Q20. Merge Two Sorted Lists

Given two already-sorted lists, merge them into one sorted list **without** using `sorted()` or `.sort()`.

```
List A: [1, 4, 7, 10]
List B: [2, 3, 8, 11, 15]
Merged: [1, 2, 3, 4, 7, 8, 10, 11, 15]
```

**Hint:** Walk both lists with two index variables, always taking the smaller head.

**Explanation:** The merged result is `[1, 2, 3, 4, 7, 8, 10, 11, 15]` — 9 elements from a 4-element and a 5-element list. Because both inputs are already sorted you only ever compare the two current heads, which is why merging is O(n+m) while sorting the concatenation would be O(n log n). Do not forget to append whatever remains in the longer list once the other runs out.

---

### Q21. Bubble Sort

Sort a list ascending using bubble sort. Print the list after each complete pass.

```
Initial: [5, 2, 9, 1, 7]
Pass 1: [2, 5, 1, 7, 9]
Pass 2: [2, 1, 5, 7, 9]
Pass 3: [1, 2, 5, 7, 9]
Pass 4: [1, 2, 5, 7, 9]
Sorted: [1, 2, 5, 7, 9]
```

**Explanation:** Each pass bubbles the largest remaining value to the end, so after pass 1 the `9` is parked at index 4. Pass 4 changes nothing — the list was already sorted after pass 3, and detecting that with a `swapped` flag lets you stop early. The inner loop can also shrink by `i` each pass, since the tail is already settled.

**Hint:** Nested loops; the inner one compares neighbours and swaps them if out of order.

---

### Q22. Linear vs Binary Search

Implement both searches on a sorted list and report how many comparisons each needed to find the target.

```
List: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 72
Linear search: found at index 8 in 9 comparisons
Binary search: found at index 8 in 2 comparisons
```

**Explanation:** Linear search checks indices 0 through 8, so **9** comparisons to find `72`. Binary search halves the range each time. ⚠️ **With the standard `mid = (lo + hi) // 2` this takes 3 comparisons, not the 2 shown above** — it checks index 4 (16), then 7 (56), then 8 (72). Count your own comparisons and trust that over the printed number; the real lesson is 3 versus 9, and the gap widens enormously as the list grows.

**Hint:** Increment a counter every time you inspect an element, in both versions.

---

### Q23. Two-Dimensional List

Build a 3×3 matrix from user input, then print it as a grid, print its transpose, and print the sum of the main diagonal.

```
Matrix:
1 2 3
4 5 6
7 8 9
Transpose:
1 4 7
2 5 8
3 6 9
Diagonal sum: 15
```

**Explanation:** The main diagonal is `1 + 5 + 9 = 15` — the elements where the row index equals the column index. The transpose swaps those indices: `t[j][i] = m[i][j]`. Row 1 of the original becomes column 1 of the transpose.

**Hint:** For the diagonal you need only one loop: `m[i][i]`.

---

### Q24. Matrix Multiplication

Multiply two 2×2 matrices using nested loops.

```
A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
A x B = [[19, 22], [43, 50]]
```

Verify by hand: `19 = 1×5 + 2×7`.

**Explanation:** `19 = 1×5 + 2×7` and `22 = 1×6 + 2×8`; the second row gives `43` and `50`. Each output cell is the dot product of a **row of A** with a **column of B**, which is why the loops nest three deep: rows, columns, and the summation index.

**Hint:** `C[i][j] = sum(A[i][k] * B[k][j] for k in range(2))`.

---

## Tier 3 — Tuples and Sets (Q25–Q34)

### Q25. Tuple Basics

Create a tuple of 6 numbers. Print its length, maximum, minimum, the count of a chosen value, and the index of a chosen value. Then try to modify an element and observe the error.

```
Tuple: (12, 45, 7, 45, 89, 23)
Length: 6
Max: 89  Min: 7
Count of 45: 2
Index of 89: 4
TypeError: 'tuple' object does not support item assignment
```

**Explanation:** `45` appears twice and `89` sits at index 4 (counting from 0). The final line is the point of the question: tuples reject item assignment entirely. Note this protection is **shallow** — a list stored inside a tuple can still be modified.

**Hint:** Wrap the assignment attempt so you can print the error and continue.

---

### Q26. Tuple Unpacking

Given a tuple of student data `("Rohan", 18, 85.5, "Mumbai")`, unpack it into four named variables and print a formatted line. Then use starred unpacking to grab the first value and the rest.

```
Name: Rohan, Age: 18, Score: 85.5, City: Mumbai
First: Rohan
Rest: [18, 85.5, 'Mumbai']
```

**Explanation:** Ordinary unpacking needs the counts to match exactly — four names for four values. Starred unpacking relaxes that: `first, *rest = data` puts the remaining three items into `rest`, and `rest` is always a **list**, even when the source was a tuple.

**Hint:** `name, age, score, city = student` then `first, *rest = student`.

---

### Q27. Swap Without Temp

Using tuple packing, swap three variables in a single statement so that `a→b`, `b→c`, `c→a`.

```
Before: a=1 b=2 c=3
After:  a=3 b=1 c=2
```

**Explanation:** `a, b, c = c, a, b` gives `a=3 b=1 c=2`. The entire right-hand side is evaluated into a tuple `(3, 1, 2)` **before** any name is reassigned, which is why a three-way rotation needs no temporary variables and cannot clobber itself.

**Hint:** One line: build the tuple in the order you want the names to receive.

---

### Q28. Set Operations

Ask for two sets of numbers. Print their union, intersection, difference (both directions) and symmetric difference.

```
Set A: {1, 2, 3, 4, 5}
Set B: {4, 5, 6, 7}
Union: {1, 2, 3, 4, 5, 6, 7}
Intersection: {4, 5}
A - B: {1, 2, 3}
B - A: {6, 7}
Symmetric difference: {1, 2, 3, 6, 7}
```

**Explanation:** `A|B` = `{1,2,3,4,5,6,7}`, `A&B` = `{4,5}`, `A-B` = `{1,2,3}`, `B-A` = `{6,7}`, `A^B` = `{1,2,3,6,7}`. Note that difference is **not** symmetric — `A-B` and `B-A` are different answers — while union, intersection and symmetric difference are.

**Hint:** `|`, `&`, `-`, `^` — or the named methods `.union()`, `.intersection()`, and so on.

---

### Q29. Common Characters

Given two words, find the characters they share, the characters unique to each, and whether they use exactly the same set of letters.

```
Word 1: listen
Word 2: silent
Common: {'e', 'i', 'l', 'n', 's', 't'}
Unique to word 1: set()
Unique to word 2: set()
Same letters: True
```

**Explanation:** `listen` and `silent` use exactly the same six letters, so the common set has 6 members and both "unique" sets are empty. `set() == set()` is `True`, confirming they are anagrams **by letter set**. Careful: comparing sets ignores counts, so `"aab"` and `"abb"` would also pass — sorting the characters is the stricter test.

**Hint:** `set(w1) & set(w2)` for common, `set(w1) - set(w2)` for unique.

---

### Q30. Anagram Groups

Given a list of words, determine which pairs are anagrams of each other. Compare sorted characters.

```
Words: ['listen', 'silent', 'enlist', 'google', 'banana']
listen & silent are anagrams
listen & enlist are anagrams
silent & enlist are anagrams
```

**Explanation:** Three pairs are anagrams: listen–silent, listen–enlist, and silent–enlist. `sorted(word)` returns a **list** of characters, and two anagrams always produce identical lists, so `sorted(a) == sorted(b)` is the test. Compare each word only with those after it to avoid reporting every pair twice.

**Hint:** Nested loop where the inner one starts at `i + 1`.

---

### Q31. Remove Duplicates — Three Ways

Given a list with duplicates, remove them three different ways: with a set (order lost), with a loop (order kept), and with `dict.fromkeys()` (order kept). Print all three results and note which preserve order.

```
Input: [3, 1, 4, 1, 5, 9, 2, 6, 5]
Via set:  [1, 2, 3, 4, 5, 6, 9]   (order lost)
Via loop: [3, 1, 4, 5, 9, 2, 6]   (order kept)
Via dict: [3, 1, 4, 5, 9, 2, 6]   (order kept)
```

**Explanation:** All three produce the same 7 values. The set version loses the original order — on this machine it happens to print ascending, but that is an artefact of how small integers hash, **not** a guarantee, and it will not hold for strings. The loop and `dict.fromkeys()` both preserve first-seen order; `dict.fromkeys()` does it in one line and is the idiom worth remembering.

**Hint:** `list(dict.fromkeys(items))` is the whole third solution.

---

### Q32. Subset and Superset

Given three sets, determine all subset/superset relationships between them and whether any pair is disjoint.

```
A = {1, 2}
B = {1, 2, 3, 4}
C = {5, 6}
A is subset of B: True
B is superset of A: True
A and C disjoint: True
```

**Explanation:** `A ⊆ B` because every element of `A` is in `B`; equivalently `B ⊇ A`. `A` and `C` share nothing, so `isdisjoint` is `True`. Note every set is a subset of itself, so `A <= A` is `True` — use `<` for a strict subset.

**Hint:** `A <= B` for subset, `A >= B` for superset, `A.isdisjoint(C)` for no overlap.

---

### Q33. Set from Sentence

Given a sentence, produce the set of unique words (lowercase, punctuation removed) and report how many unique words there are versus total words.

```
Sentence: The cat sat on the mat the cat left
Total words: 9
Unique words: 6
Unique set: {'cat', 'left', 'mat', 'on', 'sat', 'the'}
```

**Explanation:** Nine words in total, but `the` appears three times and `cat` twice, leaving **6** unique. Lowercase before building the set or `The` and `the` count as two different words — the single most common bug in text work, and it inflates your unique count without any error.

**Hint:** `.lower().split()`, then compare `len(words)` with `len(set(words))`.

---

### Q34. Frozen Set as a Dictionary Key

Demonstrate why a regular set cannot be a dictionary key but a `frozenset` can. Build a dictionary mapping frozensets of ingredients to dish names, then look one up.

```
{frozenset({'rice', 'dal'}): 'Khichdi', frozenset({'flour', 'water'}): 'Roti'}
Lookup {'dal', 'rice'} -> Khichdi
TypeError: unhashable type: 'set'
```

**Explanation:** A `set` is mutable, so its contents could change after it was used as a key, which would corrupt the dictionary's internal lookup — Python forbids it by making sets unhashable. A `frozenset` cannot change, so it is safe. Because sets are unordered, `frozenset({'dal','rice'})` and `frozenset({'rice','dal'})` are the same key, which is exactly what makes ingredient lookup work.

**Hint:** Build the dictionary with `frozenset([...])` keys, then look up with another frozenset.

---

## Tier 4 — Dictionaries (Q35–Q46)

### Q35. Dictionary Basics

Build a dictionary of five countries and their capitals. Print all keys, all values, all items, and look up one capital safely with `.get()` including a default for a missing country.

```
Keys: dict_keys(['India', 'Japan', ...])
India -> New Delhi
Atlantis -> Not found
```

**Explanation:** `.keys()`, `.values()` and `.items()` return **views**, not lists — they update live if the dictionary changes, and you must wrap them in `list()` to index them. `.get('Atlantis', 'Not found')` returns the default instead of raising `KeyError`, which is the difference between a graceful message and a crash.

**Hint:** `d.get(key, default)` takes the fallback as its second argument.

---

### Q36. Word Frequency Counter

Count how often each word appears in a sentence, then print the results sorted by count descending.

```
Sentence: the cat sat on the mat the cat left
the: 3
cat: 2
sat: 1
on: 1
mat: 1
left: 1
```

**Explanation:** `the` appears 3 times, `cat` twice, and four words once each. Build the counts with `.get(word, 0) + 1`, then sort with `sorted(counts.items(), key=lambda kv: kv[1], reverse=True)`. Sorting a dictionary returns a **list of tuples** — dictionaries themselves have no sort order you can impose.

**Hint:** Count into a dictionary first, then sort `.items()` by the second element.

---

### Q37. Character Frequency with a Dictionary

Redo Q9 using a dictionary and `.get()`. Then print only the characters that appear more than once.

```
Word: programming
Repeated: r(2) g(2) m(2)
```

**Explanation:** Only `r`, `g` and `m` appear more than once, each exactly twice. This is Q9 with a filter on the result: build the full frequency dictionary, then use a comprehension `{k: v for k, v in freq.items() if v > 1}` to keep just the repeats.

**Hint:** Count everything first, filter second. Do not try to do both in one pass.

---

### Q38. Invert a Dictionary

Given a dictionary, swap keys and values. Then handle the case where two keys share a value — the inverted dictionary should map each value to a **list** of keys.

```
Input: {'a': 1, 'b': 2, 'c': 1}
Simple invert: {1: 'c', 2: 'b'}     (data lost!)
Safe invert: {1: ['a', 'c'], 2: ['b']}
```

**Explanation:** The simple inversion loses data: `'a'` and `'c'` both map to `1`, so whichever is processed **last** wins and `{1: 'c', 2: 'b'}` silently drops `'a'`. The safe version appends to a list instead, giving `{1: ['a','c'], 2: ['b']}`. Inverting is only lossless when the original values are unique.

**Hint:** `result.setdefault(value, []).append(key)` handles the collision case in one line.

---

### Q39. Merge Dictionaries

Merge two dictionaries three ways: with `.update()`, with `{**a, **b}`, and with the `|` operator. Show what happens to duplicate keys.

```
A = {'x': 1, 'y': 2}
B = {'y': 99, 'z': 3}
Merged: {'x': 1, 'y': 99, 'z': 3}
Note: B's value for 'y' wins in all three methods.
```

**Explanation:** All three methods give `{'x': 1, 'y': 99, 'z': 3}` — the **right-hand** dictionary wins on `'y'`. `.update()` modifies `A` in place and returns `None`; `{**a, **b}` and `a | b` both build a new dictionary and leave the originals untouched. Choose based on whether you want mutation.

**Hint:** `a | b` needs Python 3.9+; `{**a, **b}` works everywhere.

---

### Q40. Student Marks Dictionary

Build a dictionary mapping student names to marks. Then print: the topper, the average, everyone above average, and everyone who failed (below 40).

```
{'Rohan': 78, 'Priya': 92, 'Amit': 35, 'Sneha': 61}
Topper: Priya (92)
Average: 66.50
Above average: ['Rohan', 'Priya']
Failed: ['Amit']
```

**Explanation:** Total is 266 across 4 students, so the average is **66.50**. Rohan (78) and Priya (92) beat it; Amit (35) fails the 40 mark. `max(marks, key=marks.get)` returns the **key** with the highest value — without `key=` you would get the alphabetically last name instead, which looks like a plausible answer.

**Hint:** `max(d, key=d.get)` for the topper; comprehensions over `.items()` for the two lists.

---

### Q41. Nested Dictionary

Build a dictionary of students where each value is itself a dictionary of subject marks. Print each student's total and percentage.

```
students = {
  'Rohan': {'Math': 78, 'Science': 85, 'English': 72},
  'Priya': {'Math': 92, 'Science': 88, 'English': 95}
}
Rohan: total 235, percentage 78.33
Priya: total 275, percentage 91.67
```

**Explanation:** Rohan totals `78+85+72 = 235`, giving `235/3 = 78.33%`. Priya totals `92+88+95 = 275` → `91.67%`. Percentage divides by the number of **subjects**, not by 100 — dividing by a hard-coded 300 breaks the moment a student takes a different number of subjects.

**Hint:** Outer loop over students, inner loop (or `sum()`) over each student's subject dictionary.

---

### Q42. Dictionary Comprehension

Using comprehensions, build:

- A dictionary of numbers 1–10 mapped to their squares
- A dictionary of only the even entries from the above
- A dictionary mapping each word in a sentence to its length

```
{1: 1, 2: 4, 3: 9, ...}
{2: 4, 4: 16, 6: 36, 8: 64, 10: 100}
{'Python': 6, 'is': 2, 'great': 5}
```

**Explanation:** Three comprehensions. The second filters the first — you can iterate `squares.items()` and keep only even keys, rather than rebuilding from `range`. The general shape is `{key_expr: value_expr for item in iterable if condition}`.

**Hint:** `{x: x**2 for x in range(1, 11)}` is the first one.

---

### Q43. Group Words by First Letter

Given a list of words, group them into a dictionary keyed by first letter.

```
Words: ['apple', 'avocado', 'banana', 'blueberry', 'cherry']
{'a': ['apple', 'avocado'], 'b': ['banana', 'blueberry'], 'c': ['cherry']}
```

**Explanation:** Each word's first character becomes the key. `setdefault(letter, [])` returns the existing list or creates an empty one, so `.append()` always has somewhere to go — without it the first word for each letter raises `KeyError`. `collections.defaultdict(list)` does the same thing, but that is Phase 3 material.

**Hint:** `groups.setdefault(word[0], []).append(word)`.

---

### Q44. Shopping Cart

Build a cart as a dictionary of item → (price, quantity). Compute the line total for each item and the grand total. Apply a 10% discount if the grand total exceeds ₹1000.

```
Laptop Stand   x2  @  799 =  1598
USB Cable      x3  @  199 =   597
Subtotal: 2195
Discount (10%): 219.50
Total: 1975.50
```

**Explanation:** `799×2 = 1598` and `199×3 = 597`, giving a subtotal of **2195**. That exceeds ₹1000, so the 10% discount is `219.50` and the total is `1975.50`. Apply the discount to the **subtotal**, not to each line — discounting per line and then summing gives the same answer here, but breaks as soon as the rule has a cap or a minimum.

**Hint:** Loop the items to build the subtotal, then apply the discount once at the end.

---

### Q45. Two-Sum with a Dictionary

Given a list of numbers and a target, find **two** numbers that add to the target, using a dictionary for one-pass lookup rather than nested loops.

```
Numbers: [2, 7, 11, 15, 3, 6]
Target: 9
Found: 2 + 7 = 9 (indices 0 and 1)
```

**Hint:** As you walk the list, check whether `target - current` is already in your dictionary of seen values.

**Explanation:** `2 + 7 = 9`, found at indices 0 and 1. The one-pass trick: for each number, check whether `target - number` is already in your dictionary of `{value: index}` seen so far. That turns a nested-loop O(n²) scan into a single O(n) pass, and it is one of the most-asked interview patterns there is.

---

### Q46. Inventory Management

Build an inventory dictionary. Then implement a loop-driven menu: add stock, remove stock, check stock, list low stock (below 10), and exit. Reject removals that exceed available stock.

```
1. Add  2. Remove  3. Check  4. Low stock  5. Exit
Choice: 2
Item: Pens
Quantity: 500
Error: only 45 in stock
```

**Explanation:** A `while True` menu over a dictionary of `item → quantity`. The removal check must compare against the **current** stock before subtracting: verify `qty <= inventory[item]` first, because subtracting and then noticing the negative leaves your data already corrupted. Low stock is a comprehension filtering on `v < 10`.

**Hint:** Validate the item exists with `in` before touching its quantity.

---

## Tier 5 — Combining Data Structures (Q47–Q56)

### Q47. List of Dictionaries

Build a list of dictionaries representing employees (name, department, salary). Then print: the highest paid, the average salary per department, and everyone in a chosen department.

```
Highest paid: Sneha (₹95,000)
Average by department:
  Engineering: ₹82,500.00
  Sales: ₹58,000.00
```

**Explanation:** A list of dictionaries is the standard shape for record data — it is what `csv.DictReader` gives you, and what a JSON API returns. Find the top earner with `max(employees, key=lambda e: e['salary'])`. For the per-department average, accumulate a total **and** a count per department, because you cannot average incrementally without both.

**Hint:** Group into `{dept: [salaries]}` first, then average each list.

---

### Q48. Dictionary of Lists

Track which subjects each student is enrolled in. Then find: students taking a chosen subject, the most popular subject, and any student taking every subject.

```
enrollment = {
  'Rohan': ['Math', 'Physics'],
  'Priya': ['Math', 'Physics', 'Chemistry'],
  'Amit':  ['Chemistry']
}
Taking Math: ['Rohan', 'Priya']
Most popular: Math (2 students)
```

**Explanation:** Inverting the structure answers the questions: build `{subject: [students]}` from `{student: [subjects]}`, and both "who takes Math" and "most popular" fall out immediately. A student taking every subject is one whose subject set equals the set of all subjects — a subset test, not a length check.

**Hint:** Loop the outer dictionary and its inner lists together to build the inverse.

---

### Q49. Sort a Dictionary

Given a dictionary of names to scores, print it sorted three ways: by key alphabetically, by value ascending, and by value descending.

```
Original: {'Rohan': 78, 'Priya': 92, 'Amit': 35}
By key:   ['Amit', 'Priya', 'Rohan']
By value asc:  [('Amit', 35), ('Rohan', 78), ('Priya', 92)]
By value desc: [('Priya', 92), ('Rohan', 78), ('Amit', 35)]
```

**Hint:** `sorted(d.items(), key=lambda item: item[1])`.

**Explanation:** Sorting by key returns just the names; sorting `.items()` returns a list of `(name, score)` tuples. The `key=` function tells `sorted` what to compare — `item[1]` picks the score. Add `reverse=True` for descending. The dictionary itself is never reordered; you always get a new list back.

---

### Q50. Matrix Row and Column Operations

Given a 3×4 matrix as a nested list, compute: the sum of each row, the sum of each column, the overall maximum with its position, and the flattened list.

```
Row sums: [10, 26, 42]
Column sums: [15, 18, 21, 24]
Max: 12 at row 2, column 3
Flattened: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

**Explanation:** Row sums are `[10, 26, 42]` and column sums `[15, 18, 21, 24]`. Both must total the same grand sum of **78** — that reconciliation is a free correctness check on your loops. Columns need either an index-based inner loop or `zip(*matrix)`, which transposes and turns columns into rows.

**Hint:** `sum(row)` for rows; `zip(*matrix)` gives you the columns as tuples.

---

### Q51. Longest Common Prefix

Given a list of strings, find the longest prefix common to all of them.

```
Words: ['flower', 'flow', 'flight']
Longest common prefix: 'fl'

Words: ['dog', 'racecar', 'car']
Longest common prefix: ''
```

**Explanation:** `flower`, `flow` and `flight` share only `fl`. `dog`, `racecar` and `car` share nothing, so the answer is the **empty string** — not `None`, and not an error. Start with the first word as the candidate prefix and shorten it until every other word starts with it.

**Hint:** The answer can never be longer than the shortest word in the list.

---

### Q52. Run-Length Encoding

Compress a string by replacing runs of repeated characters with the character and its count. Then write the decoder.

```
Input: aaabbbccccd
Encoded: a3b3c4d1
Decoded: aaabbbccccd
Match: True
```

**Explanation:** `aaabbbccccd` encodes to `a3b3c4d1` — note the trailing `d1`, since a run of one still gets a count. Encoding is only a compression when runs are long: `abcd` becomes `a1b1c1d1`, twice the original size. Decoding must handle multi-digit counts such as `a12`.

**Hint:** Walk the string tracking the current character and how many times it has repeated.

---

### Q53. Caesar Cipher

Implement a Caesar cipher that shifts each letter by `k` positions, wrapping from z to a. Preserve case and leave non-letters untouched. Then decode by shifting back.

```
Text: Hello, World!
Shift: 3
Encrypted: Khoor, Zruog!
Decrypted: Hello, World!
```

**Hint:** Use `ord()` and `chr()` with modulo 26 arithmetic.

**Explanation:** `H` (code 72) shifted by 3 becomes `K`. The formula `chr((ord(ch) - 65 + k) % 26 + 65)` subtracts the alphabet's base to get 0–25, shifts, wraps with `% 26`, then adds the base back. Use 97 for lowercase. Decoding is the same call with `-k`, which is why the round trip returns the original exactly.

---

### Q54. Balanced Brackets

Check whether a string of brackets `()`, `[]`, `{}` is properly balanced and nested, using a list as a stack.

```
"{[()]}"     -> Balanced
"{[(])}"     -> Not balanced
"((("        -> Not balanced
```

**Explanation:** `{[()]}` is balanced; `{[(])}` is not, because the `]` meets a `(` on top of the stack; `(((` fails because the stack is not empty at the end. Both checks matter — a closer must match the most recent opener, **and** nothing may be left over when the string ends.

**Hint:** Push openers onto a list, and on each closer pop and compare.

---

### Q55. Sales Data Analysis

Given a list of tuples `(region, product, amount)`, compute total sales per region, total per product, the best-selling product, and the region with the highest average sale.

```
Sales by region:
  North: ₹1,083,000
  South: ₹372,300
Best-selling product: Laptop (₹708,000)
Highest average: North (₹361,000.00)
```

**Explanation:** Group by the first element of each tuple for regions and the second for products. "Highest average" needs the total **and** the count per region, so accumulate both — a region with one huge sale can top the average while ranking low on total, and reporting only the total hides that entirely.

**Hint:** `totals[region] = totals.get(region, 0) + amount` for each grouping.

---

### Q56. Text Analyser

Given a paragraph, produce a full report: total characters, words and sentences; average word length; the 5 most common words excluding stopwords (`the, a, an, is, of, and, to, in`); and the longest word.

```
Characters: 187
Words: 32
Sentences: 3
Average word length: 4.8
Top 5 words: python(4) code(3) data(2) learn(2) write(2)
Longest word: programming
```

**Explanation:** Sentence count comes from splitting on `.`, `!` and `?`; average word length divides total letters by word count. Filter stopwords **after** counting, or your ranking is dominated by `the` and `a` — which is the same reason the TF-IDF work in Phase 12 removes them. The exact numbers depend on the paragraph you supply.

**Hint:** Clean → split → count into a dictionary → filter stopwords → sort by count.

---

## Tier 6 — Challenge Problems (Q57–Q60)

Expect 30–45 minutes each.

### Q57. Student Grade Management System

Build a menu-driven system storing students in a dictionary of dictionaries: `{name: {'marks': [...], 'grade': ''}}`.

Menu options:

1. **Add student** — name plus marks in 5 subjects (validate 0–100)
2. **View student** — show marks, total, percentage, grade
3. **View all** — a formatted table sorted by percentage descending
4. **Update marks** — change one subject for one student
5. **Delete student**
6. **Class statistics** — class average, topper, number passed/failed, subject-wise averages
7. **Exit**

Handle every error: student not found, duplicate name, invalid marks, empty database.

**Hint:** Build and test one menu option at a time. Get "add" and "view" working before writing statistics, and keep every student's data under a single key so deletion is one `del`.

---

### Q58. Contact Book with Search

Build a contact book: `{name: {'phone': ..., 'email': ..., 'city': ...}}`.

Requirements:

- Add a contact, rejecting duplicates and validating that the phone is exactly 10 digits
- **Partial search** by name — typing `ro` should find `Rohan` and `Rohit`
- Search by city, listing all matches
- Update any single field
- Delete with a confirmation step
- List all contacts sorted alphabetically
- Report statistics: total contacts, contacts per city

**Hint:** Partial search is `if query.lower() in name.lower()` — substring matching, not equality. Validate the phone with `.isdigit()` and a length check.

---

### Q59. Word Frequency Report with Ranking

Given a long paragraph, produce a complete frequency report:

- Clean the text: lowercase, strip punctuation
- Count word frequencies
- Print the top 10 words as a bar chart made of `#` characters, scaled so the most common word gets 40 characters
- Print the count of words appearing exactly once (hapaxes)
- Print the average frequency
- Group words by frequency: `{3: ['python', 'code'], 2: [...]}`

```
python     ######################################## 8
data       #####################                    4
learn      ##########                               2
...
Words appearing once: 23
Average frequency: 1.7
```

**Hint:** Scale each bar with `int(count / max_count * 40)`. Group by frequency using `groups.setdefault(count, []).append(word)`.

---

### Q60. Matrix Operations Suite

Build a menu-driven matrix calculator that reads two matrices from the user and supports:

1. **Addition** — validate that dimensions match
2. **Subtraction** — same validation
3. **Multiplication** — validate that A's columns equal B's rows
4. **Transpose** of either matrix
5. **Determinant** of a 2×2 or 3×3 matrix
6. **Identity check** — is the matrix an identity matrix?
7. **Symmetry check** — does the matrix equal its transpose?

Print every result as a formatted grid with aligned columns. Reject invalid operations with a clear message explaining the dimension mismatch.

```
Matrix A is 2x3, Matrix B is 2x3
Cannot multiply: A has 3 columns but B has 2 rows.
```

**Hint:** Write a single "print a matrix" helper block and reuse it for every result. Validate dimensions before every operation, not inside it.

---

## Checking your work

1. **Verify the given answers.** Q24's matrix product, Q52's encoding and Q53's cipher are all checkable by hand. Do it.
2. **Test the degenerate cases.** Empty list, empty string, single element, all-identical elements. Q14 (second largest) and Q51 (common prefix) both break badly if you skip this.
3. **Compare against the built-in.** After solving Q13 manually, check against `sum()`/`max()`/`min()`. After Q21, check against `sorted()`. If they disagree, your logic is wrong.

> ⚠️ The most damaging Phase 2 mistake is **mutating a list while looping over it**. Removing items inside a `for` loop silently skips elements — no error, wrong result. If you need to filter, build a new list with a comprehension instead. Questions 16, 31 and 46 will all tempt you into this.
>

---

[← Phase 2 index](README.md) · [Solutions](solutions.md) · [Test runner](tests/README.md) · [Projects & Key Takeaways](projects-and-takeaways.md)
