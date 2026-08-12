# 🚀 Practice Projects for Phase 1

Projects for **Modules 1–4**: variables, data types, operators, conditionals and loops.

**Rules for this set:**

- Use **only** Phase 1 material — variables, `input()`, `print()`, type casting, operators, `if`/`elif`/`else`, `for`, `while`, `range()`, `break`/`continue`.
- **No lists, no functions, no imports** — except `import random` where a question explicitly says so. Solving projects without them forces you to build logic instead of reaching for a tool.
- Every project must survive bad input (negative numbers, empty input) without crashing.
- Before typing, write the project's output on paper for one example run. Programs written output-first are shorter and have fewer bugs.

---

## P1. Calculator

**Difficulty:** Easy
**Learning Objective:** Combine input, type casting, operators, and conditionals into a single working program.

**Scenario.** A command-line calculator that performs addition, subtraction, multiplication, and division. The user picks an operation, enters two numbers, and gets the result.

**Requirements**

- [ ]  Print a menu: `1. Add`, `2. Subtract`, `3. Multiply`, `4. Divide`, `5. Exit`.
- [ ]  Ask the user to choose an option, then read the two numbers with `input()`.
- [ ]  Perform the chosen operation and print the result formatted to 2 decimal places.
- [ ]  Division by zero must print a friendly `Cannot divide by zero!` message instead of crashing.
- [ ]  An invalid menu choice prints `Invalid choice!` and re-shows the menu (use a loop).
- [ ]  Choosing `5` prints `Goodbye!` and exits the loop.

**Sample Run**

```
1. Add
2. Subtract
3. Multiply
4. Divide
5. Exit
Choose: 1
First number: 12.5
Second number: 7.25
Result: 19.75
```

**Hint:** Repeat the menu inside a `while True:` loop and use `break` only on option 5. Convert numbers with `float()`.

---

## P2. Number Guessing Game

**Difficulty:** Medium
**Learning Objective:** Use `import random`, loops, and conditionals with a running attempt counter.

**Scenario.** The computer picks a secret number between 1 and 100. The user guesses until they find it; after each guess the program says whether the guess is too high, too low, or correct — and how many attempts it took. This is the one project where `import random` is allowed.

**Requirements**

- [ ]  Generate the secret with `random.randint(1, 100)`.
- [ ]  Keep asking for guesses until the secret is found.
- [ ]  Print `Too high!` / `Too low!` after every wrong guess.
- [ ]  Track and print the attempt count when the number is found.
- [ ]  Reject guesses outside 1–100 with a warning without counting them as an attempt.
- [ ]  After winning, ask `Play again? (y/n)` and restart or exit.

**Sample Run**

```
Guess the number (1-100): 50
Too high!
Guess the number (1-100): 25
Too low!
Guess the number (1-100): 37
Correct! You took 3 attempts.
Play again? (y/n): n
```

**Hint:** `random.randint(1, 100)` includes both 1 and 100. Count attempts only for valid guesses.

---

## P3. Simple Quiz App

**Difficulty:** Medium
**Learning Objective:** Combine conditionals, a question loop, and score tracking in one interactive program.

**Scenario.** A 5-question quiz. Each question shows four options; the user types the option letter and gets immediate feedback. At the end, the program prints the score out of 5 and a verdict.

**Requirements**

- [ ]  5 hand-written questions (e.g. `What is 2 ** 10?` with options `a) 20 b) 100 c) 1024 d) 512`).
- [ ]  Accept `a`, `b`, `c`, or `d` (case-insensitive) as the answer.
- [ ]  Print `Correct!` / `Wrong! The answer is c)` after each question.
- [ ]  Track the score and print `You scored 4/5` plus a verdict: 5/5 `Excellent`, 3-4 `Good`, else `Keep practicing`.
- [ ]  Invalid option letters must not crash the quiz — ask again.

**Sample Run**

```
Q1. What is 2 ** 10?
   a) 20   b) 100   c) 1024   d) 512
Your answer: c
Correct!
...
You scored 4/5
Verdict: Good
```

**Hint:** Store nothing in lists — compare the user's letter with the correct letter using `if`/`elif` and add 1 to the score when right.

---

## P4. Multiplication Table

**Difficulty:** Easy
**Learning Objective:** Practice `for` loops, `range()`, and clean f-string formatting.

**Scenario.** The user enters any number; the program prints its multiplication table from 1 to 10, and optionally up to a custom limit.

**Requirements**

- [ ]  Ask for the number and print `Table of 7:` before the table.
- [ ]  Print each row as `7 x 1 = 7` through `7 x 10 = 70`.
- [ ]  Ask `Print up to which number? (default 10)` — an empty input uses 10.
- [ ]  Reject negative numbers and numbers above 20 with a message.
- [ ]  Align results with a simple line of `-` separators between rows.

**Sample Run**

```
Enter a number: 7
Print up to which number? (default 10): 5
Table of 7:
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
```

**Hint:** `range(1, limit + 1)` — remember `range` stops before the second argument.

---

## P5. FizzBuzz

**Difficulty:** Easy
**Learning Objective:** Master division, modulo, and the ordering of `if`/`elif`/`else` conditions.

**Scenario.** Print the numbers 1 to 100, but replace every multiple of 3 with `Fizz`, every multiple of 5 with `Buzz`, and every multiple of both with `FizzBuzz`.

**Requirements**

- [ ]  Print one value per line for 1 through 100.
- [ ]  `FizzBuzz` must appear for 15, 30, 45, etc. — check it **before** checking `Fizz` alone.
- [ ]  Do not use lists or functions. A plain loop is the whole exercise.
- [ ]  After the loop, print the count of how many numbers were `FizzBuzz`.

**Sample Run**

```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
...
FizzBuzz count: 6
```

**Hint:** Check the combined condition `n % 15 == 0` (or `n % 3 == 0 and n % 5 == 0`) first, then `n % 3 == 0`, then `n % 5 == 0`.

---

## P6. ATM Simulator

**Difficulty:** Hard
**Learning Objective:** Build a full menu-driven program with validation, a secret PIN, and a stateful balance.

**Scenario.** A bank ATM with a saved PIN, a starting balance, and four operations: check balance, deposit, withdraw, exit. A locked-out user must be handled gracefully.

**Requirements**

- [ ]  Define a PIN (e.g. `1234`); the user gets **3 attempts** before the program says `Card blocked.` and exits.
- [ ]  Main menu: `1. Check Balance`, `2. Deposit`, `3. Withdraw`, `4. Exit`.
- [ ]  Withdrawals must reject amounts `> balance` with `Insufficient funds!` and amounts `<= 0`.
- [ ]  Print the updated balance after every transaction with a currency format like `Balance: $1,250.00`.
- [ ]  Invalid menu choices re-show the menu without crashing.
- [ ]  The program keeps its state across the session and only ends on `4`.

**Sample Run**

```
Enter PIN: 1111
Wrong PIN. Attempts left: 2
Enter PIN: 1234
1. Check Balance  2. Deposit  3. Withdraw  4. Exit
Choice: 3
Amount: 5000
Insufficient funds! Your balance is $1,250.00
Choice: 3
Amount: 250
Withdrew $250.00. Balance: $1,000.00
Choice: 4
Thank you for using ATM!
```

**Hint:** Keep `balance` updated with `balance +=` and `balance -=` inside the loop; check `amount <= 0 or amount > balance` before subtracting.

---

## P7. Password Checker

**Difficulty:** Easy
**Learning Objective:** Validate user input with string methods and conditions, and loop until input is valid.

**Scenario.** A security tool that checks whether a password meets the rules: at least 8 characters, contains at least one digit, one uppercase letter, and one lowercase letter. It keeps asking until a valid password is entered.

**Requirements**

- [ ]  Loop until the entered password passes all four rules.
- [ ]  Print one line per failed rule: `Must be at least 8 characters`, `Must contain a digit`, `Must contain an uppercase letter`, `Must contain a lowercase letter` (use `if`/`elif` so each appears once).
- [ ]  When valid, print `Password set successfully.`
- [ ]  Use `.isupper()`, `.islower()`, `.isdigit()` and `len()` — nothing else.
- [ ]  Verify no space characters are present (`Must not contain spaces`).

**Sample Run**

```
Enter password: abc
Must be at least 8 characters
Must contain a digit
Must contain an uppercase letter
Enter password: Password1
Password set successfully.
```

**Hint:** Loop with `while True:` plus a `valid = True` flag; set it to `False` and print any missing rule, then `break` when it survives all checks.