# Topic Drill 04 — Input and Output

30 focused questions on: `input()`, `print()`, f-strings, and output formatting.

**How to run:** Read input with `input()`, process, and `print()` the result.

---

## Q1. Read and Print a Line
**Difficulty:** Very Easy
**Problem:** Read a line and print exactly what was read.
**Input:** A single line.
**Output:** Print the line.
**Example:**
```
Input:
Hello
Output:
Hello
```
**Hint:** `print(input())`.

## Q2. Print With a Custom Separator
**Difficulty:** Easy
**Problem:** Print the values `1`, `2`, `3` separated by a dash using `print(..., sep="-")`.
**Input:** None.
**Output:** Print `1-2-3`.
**Hint:** `print(1, 2, 3, sep="-")`.

## Q3. Print on One Line With a Custom End
**Difficulty:** Easy
**Problem:** Print `"a"` and `"b"` on the same line with no space between them using `end=""`.
**Input:** None.
**Output:** Print `ab`.
**Hint:** `print("a", end=""); print("b")`.

## Q4. Read Two Integers on One Line
**Difficulty:** Easy
**Problem:** Read a line with two space-separated integers and print their sum.
**Input:** One line: `a b`.
**Output:** Print `a + b`.
**Example:**
```
Input:
4 9
Output:
13
```
**Hint:** `a, b = map(int, input().split())`.

## Q5. f-string With a Number
**Difficulty:** Easy
**Problem:** Read an integer and print `"You entered X."` using an f-string.
**Input:** A single integer.
**Output:** The message.
**Example:**
```
Input:
42
Output:
You entered 42.
```
**Hint:** `f"You entered {n}."`.

## Q6. Format a Float to Two Decimals
**Difficulty:** Easy
**Problem:** Read a decimal and print it rounded to two decimal places using f-string formatting.
**Input:** A single line.
**Output:** The formatted value.
**Example:**
```
Input:
3.14159
Output:
3.14
```
**Hint:** `f"{value:.2f}"`.

## Q7. Format an Integer in a Field Width
**Difficulty:** Easy
**Problem:** Read an integer and print it right-aligned in a width of 5 using `f"{n:5d}"`.
**Input:** A single integer.
**Output:** The integer padded with leading spaces.
**Example:**
```
Input:
7
Output:
    7
```
**Hint:** `f"{n:5d}"`.

## Q8. Combine Two Inputs in One Line
**Difficulty:** Easy
**Problem:** Read a name and an age, and print `"Name is Age years old."` in one f-string.
**Input:** Two lines.
**Output:** The message.
**Example:**
```
Input:
Aman
25
Output:
Aman is 25 years old.
```
**Hint:** `f"{name} is {age} years old."`.

## Q9. Print an Arithmetic Result
**Difficulty:** Easy
**Problem:** Read two integers and print `"Sum: a+b"`.
**Input:** Two lines.
**Output:** Print `Sum: <total>`.
**Example:**
```
Input:
3
4
Output:
Sum: 7
```
**Hint:** `print(f"Sum: {a + b}")`.

## Q10. Multiple print() Calls Stack Lines
**Difficulty:** Very Easy
**Problem:** Print `"line1"`, `"line2"`, `"line3"` each with its own `print()` call.
**Input:** None.
**Output:** Three lines.
**Hint:** Each `print()` adds a newline.

## Q11. Read Three Values on One Line
**Difficulty:** Medium
**Problem:** Read a line with three space-separated integers and print their average.
**Input:** One line: `a b c`.
**Output:** Print the average.
**Example:**
```
Input:
1 2 3
Output:
2.0
```
**Hint:** `a, b, c = map(int, input().split())`.

## Q12. f-string With Expressions Inside Braces
**Difficulty:** Easy
**Problem:** Read an integer `n` and print `f"Double: {n * 2}"`.
**Input:** A single integer.
**Output:** The message.
**Example:**
```
Input:
5
Output:
Double: 10
```
**Hint:** You can compute inside the braces.

## Q13. Format a Percentage
**Difficulty:** Medium
**Problem:** Read marks obtained and total, and print the percentage as `84.0%`.
**Input:** Two lines.
**Output:** The percentage with a `%` sign.
**Example:**
```
Input:
42
50
Output:
84.0%
```
**Hint:** `f"{(obtained/total)*100:.1f}%"`.

## Q14. Print a List
**Difficulty:** Easy
**Problem:** Read a line of space-separated integers, store them in a list, and print the list.
**Input:** A single line.
**Output:** Print the list.
**Example:**
```
Input:
1 2 3
Output:
[1, 2, 3]
```
**Hint:** `lst = [int(x) for x in input().split()]` then `print(lst)`.

## Q15. Read a Character and Repeat
**Difficulty:** Easy
**Problem:** Read a character and an integer, and print the character repeated using f-string width formatting.
**Input:** Two lines.
**Output:** Print the repeated character.
**Example:**
```
Input:
*
5
Output:
*****
```
**Hint:** `f"{char * n}"` works, or use `*`.

## Q16. Multiple Inputs With a Loop
**Difficulty:** Medium
**Problem:** Read a count `n`, then read `n` integers (each on its own line) and print their sum.
**Input:** Line 1: `n`. Then `n` lines.
**Output:** Print the sum.
**Example:**
```
Input:
3
1
2
3
Output:
6
```
**Hint:** Loop `n` times calling `input()`.

## Q17. Print With Padding on Both Sides
**Difficulty:** Medium
**Problem:** Read a word and print it centered in a width of 10 using `f"{word:^10}"`.
**Input:** A single word.
**Output:** The centered word.
**Hint:** `^` centers.

## Q18. f-string With Multiple Values
**Difficulty:** Easy
**Problem:** Read `a`, `b`, `c` and print `f"a={a} b={b} c={c}"`.
**Input:** Three lines.
**Output:** The formatted line.
**Example:**
```
Input:
1
2
3
Output:
a=1 b=2 c=3
```
**Hint:** Put all three in one f-string.

## Q19. Left-Align a String in a Field
**Difficulty:** Medium
**Problem:** Read a word and print it left-aligned in a width of 8 using `f"{word:<8}"` followed by an exclamation mark.
**Input:** A single word.
**Output:** The padded word then `!`.
**Hint:** `<` left-aligns.

## Q20. Print the Type of Input
**Difficulty:** Easy
**Problem:** Read a line and print `f"Type: {type(value)}"`.
**Input:** A single line.
**Output:** Print `Type: <class 'str'>`.
**Hint:** `input()` always gives a string.

## Q21. Format With Thousand Separators
**Difficulty:** Medium
**Problem:** Read an integer and print it with commas as thousands separators using `f"{n:,}"`.
**Input:** A single integer.
**Output:** The formatted number.
**Example:**
```
Input:
1000000
Output:
1,000,000
```
**Hint:** `f"{n:,}"`.

## Q22. Read and Split Into Words
**Difficulty:** Medium
**Problem:** Read a sentence and print the number of words.
**Input:** A single line.
**Output:** Print the word count.
**Example:**
```
Input:
Hello world of Python
Output:
4
```
**Hint:** `len(input().split())`.

## Q23. Print Multiple Results on Separate Lines
**Difficulty:** Medium
**Problem:** Read two integers and print the sum, difference, and product, each on its own line.
**Input:** Two lines.
**Output:** Three lines.
**Example:**
```
Input:
6
3
Output:
9
3
18
```
**Hint:** Use three `print()` calls or one with `sep="\n"`.

## Q24. f-string With a Float Field Width
**Difficulty:** Medium
**Problem:** Read a decimal and print it in a width of 8 with 2 decimals using `f"{value:8.2f}"`.
**Input:** A single line.
**Output:** The padded, rounded value.
**Example:**
```
Input:
5.5
Output:
    5.50
```
**Hint:** `f"{value:8.2f}"` = width 8, 2 decimals.

## Q25. Escape a Curly Brace in an f-string
**Difficulty:** Medium
**Problem:** Print the literal text `The set has 3 items` where the `{` and `}` are literal using an f-string with `{{` and `}}`.
**Input:** None.
**Output:** Print `The set has 3 items`.
**Hint:** Double braces `{{` print a single literal brace.

## Q26. Read a Value and Echo With Labels
**Difficulty:** Easy
**Problem:** Read a name and print `f"Hello {name}!"`.
**Input:** A single line.
**Output:** The greeting.
**Example:**
```
Input:
Zara
Output:
Hello Zara!
```
**Hint:** f-string interpolation.

## Q27. Print a Table Row
**Difficulty:** Medium
**Problem:** Read `item`, `qty`, and `price`, and print a single row `f"{item:<10}{qty:>4}{price:>8.2f}"`.
**Input:** Three lines.
**Output:** The formatted row.
**Example:**
```
Input:
Apple
3
2.5
Output:
Apple          3     2.50
```
**Hint:** Use field widths and alignment.

## Q28. Read Two Numbers on the Same Line and Print Sum
**Difficulty:** Easy
**Problem:** Read a single line with two space-separated integers and print their sum.
**Input:** One line: `a b`.
**Output:** Print the sum.
**Example:**
```
Input:
8 12
Output:
20
```
**Hint:** `map(int, input().split())`.

## Q29. Format With a Plus Sign for Positives
**Difficulty:** Medium
**Problem:** Read an integer and print it with a leading `+` if positive using `f"{n:+d}"`.
**Input:** A single integer.
**Output:** The signed number.
**Example:**
```
Input:
5
Output:
+5
```
**Hint:** `+` flag shows the sign.

## Q30. Build a Multi-Line Output
**Difficulty:** Medium
**Problem:** Read three integers and print them joined by `" | "` using `print(*values, sep=" | ")`.
**Input:** Three lines.
**Output:** One line with values separated by ` | `.
**Example:**
```
Input:
1
2
3
Output:
1 | 2 | 3
```
**Hint:** Unpack the list into `print(*lst, sep=...)`.
