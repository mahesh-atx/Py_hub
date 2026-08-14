# Level 9 — Small Projects (30 Questions)

**What this level teaches:** building complete mini-programs that combine *everything* from Levels 1–8 — loops, conditions, collections, functions, files, and classes. Each project is a question: read the goal, try it yourself, then study the solution.

**Total projects:** 30

> These are real programs. Type them, run them, then break them and fix them — that's where the learning happens.

---

## Project 1: Basic calculator

**What to do:** Ask the user for two numbers and an operator (+, -, *, /), then print the result. Handle division by zero.

**Hint:** An `if/elif` chain on the operator — that's the whole program.

**Solution:**

```python
a = float(input("First number: "))
b = float(input("Second number: "))
op = input("Operator (+, -, *, /): ")

if op == "+":
    print(a + b)
elif op == "-":
    print(a - b)
elif op == "*":
    print(a * b)
elif op == "/":
    if b == 0:
        print("Cannot divide by zero")
    else:
        print(a / b)
else:
    print("Invalid operator")
```

**Logic:** Input → decision → output. The simplest complete program shape.

---

## Project 2: Calculator with a loop

**What to do:** Upgrade Project 1 so the calculator keeps working until the user types "quit".

**Hint:** Wrap everything in `while True` and check for quit before doing math.

**Solution:**

```python
while True:
    command = input("Enter operation (like 5 + 3) or 'quit': ")
    if command.lower() == "quit":
        print("Bye!")
        break

    parts = command.split()
    if len(parts) != 3:
        print("Use the format: number operator number")
        continue

    a, op, b = parts
    try:
        a, b = float(a), float(b)
    except ValueError:
        print("Invalid numbers")
        continue

    if op == "+":
        print(a + b)
    elif op == "-":
        print(a - b)
    elif op == "*":
        print(a * b)
    elif op == "/":
        print("Cannot divide by zero" if b == 0 else a / b)
    else:
        print("Invalid operator")
```

**Logic:** The never-crash loop from Level 7, now powering a real tool.

---

## Project 3: Number guessing game

**What to do:** The computer picks a random number from 1 to 100. The user guesses; the computer says "too high" or "too low" until they get it. Print the number of attempts.

**Hint:** `random.randint(1, 100)` plus a compare-and-loop.

**Solution:**

```python
import random

secret = random.randint(1, 100)
attempts = 0

while True:
    guess = int(input("Guess a number (1-100): "))
    attempts += 1

    if guess < secret:
        print("Too low!")
    elif guess > secret:
        print("Too high!")
    else:
        print("Correct! You took", attempts, "attempts.")
        break
```

**Logic:** A loop + feedback = the classic guessing game.

---

## Project 4: Guessing game with limited attempts

**What to do:** Same game, but the player gets only 7 tries. Print "You lost" with the secret number if they run out.

**Hint:** A `for` loop over `range(7)` instead of `while True`, with a `break` on success.

**Solution:**

```python
import random

secret = random.randint(1, 100)

for attempt in range(1, 8):
    guess = int(input("Attempt " + str(attempt) + "/7 — guess: "))
    if guess < secret:
        print("Too low!")
    elif guess > secret:
        print("Too high!")
    else:
        print("Correct in", attempt, "attempts!")
        break
else:
    print("Out of attempts! The number was", secret)
```

**Logic:** The `for/else` runs `else` only when the loop ends *without* `break` — perfect for "you lost".

---

## Project 5: Computer guesses YOUR number

**What to do:** You think of a number from 1 to 100. The computer guesses using binary search; you answer "h" (higher), "l" (lower), or "c" (correct).

**Hint:** Keep `low` and `high`; guess the middle `(low + high) // 2`; shrink the range based on the answer.

**Solution:**

```python
low, high = 1, 100
print("Think of a number between 1 and 100.")
input("Press Enter when you are ready...")

attempts = 0
while True:
    guess = (low + high) // 2
    attempts += 1
    answer = input("Is it " + str(guess) + "? (h/l/c): ").lower()

    if answer == "h":
        low = guess + 1
    elif answer == "l":
        high = guess - 1
    else:
        print("I guessed it in", attempts, "tries!")
        break
```

**Logic:** Binary search — cut the possibilities in half every time. At most 7 guesses for 1–100.

---

## Project 6: To-do list

**What to do:** A menu-driven to-do list: add, view, mark done, and quit. Store tasks in a list.

**Hint:** List + `while True` menu, same skeleton as the Level 5 phone book.

**Solution:**

```python
tasks = []

while True:
    print("\n1. Add task  2. View tasks  3. Mark done  4. Quit")
    choice = input("Choose: ")

    if choice == "1":
        tasks.append(input("Task: "))
        print("Added.")
    elif choice == "2":
        if not tasks:
            print("No tasks.")
        for i, task in enumerate(tasks):
            print(str(i + 1) + ". " + task)
    elif choice == "3":
        index = int(input("Task number to mark done: ")) - 1
        if 0 <= index < len(tasks):
            print("Done:", tasks.pop(index))
        else:
            print("Invalid number")
    elif choice == "4":
        print("Bye!")
        break
    else:
        print("Invalid choice")
```

**Logic:** `enumerate` numbers your tasks for you — a very handy loop tool.

---

## Project 7: Expense tracker

**What to do:** Record expenses (name + amount), then show all expenses and the total.

**Hint:** Store each expense as a small dictionary inside a list.

**Solution:**

```python
expenses = []

while True:
    print("\n1. Add expense  2. Show all  3. Total  4. Quit")
    choice = input("Choose: ")

    if choice == "1":
        name = input("Expense name: ")
        amount = float(input("Amount: "))
        expenses.append({"name": name, "amount": amount})
        print("Saved.")
    elif choice == "2":
        for expense in expenses:
            print(expense["name"], "-", expense["amount"])
    elif choice == "3":
        total = sum(expense["amount"] for expense in expenses)
        print("Total:", total)
    elif choice == "4":
        print("Bye!")
        break
```

**Logic:** A list of dictionaries — the standard way to store many structured records.

---

## Project 8: Quiz game

**What to do:** Ask 3 multiple-choice questions, check the answers, and print the final score.

**Hint:** Store each question as a dictionary with question, options, and answer.

**Solution:**

```python
questions = [
    {"q": "What is 2 + 2?", "options": ["a) 3", "b) 4", "c) 5"], "answer": "b"},
    {"q": "Which keyword starts a function?", "options": ["a) func", "b) define", "c) def"], "answer": "c"},
    {"q": "What does len('abc') return?", "options": ["a) 2", "b) 3", "c) 4"], "answer": "b"},
]

score = 0
for question in questions:
    print("\n" + question["q"])
    for option in question["options"]:
        print(option)
    answer = input("Your answer: ").lower()
    if answer == question["answer"]:
        print("Correct!")
        score += 1
    else:
        print("Wrong. The answer was", question["answer"])

print("\nFinal score:", score, "out of", len(questions))
```

**Logic:** Data-driven design — adding a new question means adding one dictionary, not new code.

---

## Project 9: Student grade system

**What to do:** For a list of students with marks, calculate each student's grade (A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60, else F) and print a report.

**Hint:** A function `get_grade(marks)` + a loop over students.

**Solution:**

```python
def get_grade(marks):
    if marks >= 90:
        return "A"
    elif marks >= 80:
        return "B"
    elif marks >= 70:
        return "C"
    elif marks >= 60:
        return "D"
    return "F"

students = [
    {"name": "Rahul", "marks": 92},
    {"name": "Priya", "marks": 85},
    {"name": "Amit", "marks": 74},
    {"name": "Sneha", "marks": 55},
]

for student in students:
    print(student["name"], "-", student["marks"], "-", get_grade(student["marks"]))
```

**Logic:** Functions + data = a clean report generator.

---

## Project 10: Contact book

**What to do:** A menu-driven contact book: add, search, list, delete contacts (name → number). Use a dictionary.

**Hint:** This is the Level 5 phone book with a few more features.

**Solution:**

```python
contacts = {}

while True:
    print("\n1. Add  2. Search  3. List  4. Delete  5. Quit")
    choice = input("Choose: ")

    if choice == "1":
        name = input("Name: ")
        contacts[name] = input("Number: ")
        print("Saved.")
    elif choice == "2":
        name = input("Name: ")
        print(contacts.get(name, "Not found"))
    elif choice == "3":
        for name, number in contacts.items():
            print(name, "-", number)
    elif choice == "4":
        name = input("Name: ")
        print("Deleted:", contacts.pop(name, "Not found"))
    elif choice == "5":
        print("Bye!")
        break
```

**Logic:** A dictionary IS a contact book — the menu is just the interface around it.

---

## Project 11: Number analyzer

**What to do:** For a list of numbers, print the count, sum, average, largest, smallest, and how many are even. Break the logic into small functions.

**Hint:** One function per statistic; one loop to gather input, or a fixed list to start.

**Solution:**

```python
def analyze(numbers):
    print("Count:", len(numbers))
    print("Sum:", sum(numbers))
    print("Average:", sum(numbers) / len(numbers))
    print("Largest:", max(numbers))
    print("Smallest:", min(numbers))
    even = len([n for n in numbers if n % 2 == 0])
    print("Even numbers:", even)

numbers = [15, 8, 23, 42, 7, 19, 30]
analyze(numbers)
```

**Logic:** Every statistic you learned in Level 1, packaged as one tool.

---

## Project 12: Word counter

**What to do:** For a given text, print the total number of words and the top 5 most common words with counts.

**Hint:** `split()`, a frequency dictionary, and `sorted(..., key=lambda ...)`.

**Solution:**

```python
text = "apple banana apple orange banana apple grape apple mango banana grape apple kiwi"

words = text.split()
frequency = {}
for word in words:
    if word in frequency:
        frequency[word] += 1
    else:
        frequency[word] = 1

print("Total words:", len(words))

top5 = sorted(frequency.items(), key=lambda item: item[1], reverse=True)[:5]
for word, count in top5:
    print(word, "-", count)
```

**Logic:** The Level 5 frequency pattern becomes a text-analysis tool.

---

## Project 13: Simple password manager

**What to do:** Store site → password in a dictionary with functions to add, get, and list *sites only* (never print the passwords when listing).

**Hint:** Functions + dictionary; the list view prints keys only.

**Solution:**

```python
vault = {}

def add(site, password):
    vault[site] = password
    print("Saved password for", site)

def get(site):
    return vault.get(site, "Not found")

def list_sites():
    print("Sites:", ", ".join(vault.keys()))

add("email", "abc123")
add("bank", "xyz789")
add("social", "qwe456")

print("Bank password:", get("bank"))
list_sites()
```

**Logic:** Hiding the values in the list view is a first taste of "don't leak secrets".

---

## Project 14: Inventory system

**What to do:** Track products (name → quantity). Support add stock, sell stock (refuse if not enough), and show inventory.

**Hint:** A dictionary with quantities; selling decreases the value.

**Solution:**

```python
inventory = {}

while True:
    print("\n1. Add stock  2. Sell  3. Show  4. Quit")
    choice = input("Choose: ")

    if choice == "1":
        item = input("Item: ")
        qty = int(input("Quantity: "))
        inventory[item] = inventory.get(item, 0) + qty
        print("Updated.")
    elif choice == "2":
        item = input("Item: ")
        qty = int(input("Quantity: "))
        if inventory.get(item, 0) < qty:
            print("Not enough stock.")
        else:
            inventory[item] -= qty
            print("Sold.")
    elif choice == "3":
        for item, qty in inventory.items():
            print(item, "-", qty)
    elif choice == "4":
        print("Bye!")
        break
```

**Logic:** `inventory.get(item, 0)` safely reads missing keys — Level 5 skill in action.

---

## Project 15: Library management

**What to do:** Manage books (title, author) with functions to add, search, and remove books, plus a list of all books.

**Hint:** A list of book dictionaries + search loops — or a small `Book` class.

**Solution:**

```python
library = []

def add_book(title, author):
    library.append({"title": title, "author": author})

def search(title):
    for book in library:
        if book["title"].lower() == title.lower():
            return book
    return None

def remove_book(title):
    book = search(title)
    if book:
        library.remove(book)
        print("Removed:", title)
    else:
        print("Book not found")

add_book("Python Basics", "R. Kumar")
add_book("Data Structures", "S. Sharma")

found = search("python basics")
print("Found:", found)

remove_book("Data Structures")
print("Library:", library)
```

**Logic:** Search-by-title with case-insensitive matching — a tiny database engine.

---

## Project 16: Rock-paper-scissors

**What to do:** Play rock-paper-scissors against the computer until you type "quit". Show who wins each round.

**Hint:** `random.choice(["rock", "paper", "scissors"])` and a win-rule dictionary or if-chain.

**Solution:**

```python
import random

options = ["rock", "paper", "scissors"]

while True:
    player = input("Rock, paper, scissors (or quit): ").lower()
    if player == "quit":
        print("Bye!")
        break
    if player not in options:
        print("Invalid choice")
        continue

    computer = random.choice(options)
    print("Computer:", computer)

    if player == computer:
        print("It's a tie!")
    elif (player == "rock" and computer == "scissors") or \
         (player == "paper" and computer == "rock") or \
         (player == "scissors" and computer == "paper"):
        print("You win!")
    else:
        print("Computer wins!")
```

**Logic:** Encode the rules once, loop forever — a complete game in ~25 lines.

---

## Project 17: Hangman

**What to do:** The computer picks a word; the player guesses letters. Show blanks that fill in, allow 6 wrong guesses, and end with win/lose.

**Hint:** Show the word as underscores; reveal positions where the guess matches; count wrong guesses.

**Solution:**

```python
import random

words = ["python", "program", "computer", "keyboard", "monitor"]
word = random.choice(words)
guessed = set()
wrong = 0
max_wrong = 6

while wrong < max_wrong:
    display = ""
    for letter in word:
        if letter in guessed:
            display += letter + " "
        else:
            display += "_ "
    print(display.strip())
    print("Wrong guesses:", wrong, "of", max_wrong)

    guess = input("Guess a letter: ").lower()
    if guess in guessed:
        print("Already guessed that!")
        continue

    guessed.add(guess)

    if guess not in word:
        wrong += 1

    if all(letter in guessed for letter in word):
        print("You win! The word was:", word)
        break
else:
    print("You lost! The word was:", word)
```

**Logic:** `all(...)` checks if every letter has been guessed — a neat win condition.

---

## Project 18: Tic-tac-toe (2 players)

**What to do:** A two-player tic-tac-toe on a 3×3 board. Players take turns placing X and O; the game detects wins and draws.

**Hint:** Store the board as a list of 9 cells; check the 8 winning lines after each move.

**Solution:**

```python
board = [" "] * 9
player = "X"

win_lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],   # rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],   # columns
    [0, 4, 8], [2, 4, 6]               # diagonals
]

def show_board():
    print(board[0], "|", board[1], "|", board[2])
    print("--+---+--")
    print(board[3], "|", board[4], "|", board[5])
    print("--+---+--")
    print(board[6], "|", board[7], "|", board[8])

def check_winner():
    for line in win_lines:
        if board[line[0]] == board[line[1]] == board[line[2]] != " ":
            return board[line[0]]
    return None

for turn in range(9):
    show_board()
    move = int(input("Player " + player + ", choose 1-9: ")) - 1
    if board[move] != " ":
        print("Taken! Try again.")
        continue

    board[move] = player
    winner = check_winner()
    if winner:
        show_board()
        print(winner, "wins!")
        break

    player = "O" if player == "X" else "X"
else:
    show_board()
    print("It's a draw!")
```

**Logic:** The 8 winning lines stored as index triples — check them all after every move.

---

## Project 19: Dice rolling simulator

**What to do:** Roll two dice and print the total. Keep rolling until the user says stop.

**Hint:** Two `random.randint(1, 6)` calls and an input loop.

**Solution:**

```python
import random

while True:
    command = input("Press Enter to roll (or 'quit'): ")
    if command.lower() == "quit":
        print("Bye!")
        break

    die1 = random.randint(1, 6)
    die2 = random.randint(1, 6)
    print("Dice:", die1, "and", die2, "— total:", die1 + die2)
```

**Logic:** Randomness + a loop = endless fun with 10 lines.

---

## Project 20: ATM simulator

**What to do:** A bank machine with a PIN (fixed, e.g. 1234), and options: check balance, deposit, withdraw, quit. Only allow 3 PIN attempts.

**Hint:** Class or simple variables; a counter for failed PIN attempts.

**Solution:**

```python
pin = "1234"
balance = 10000

attempts = 3
entered = ""
while entered != pin and attempts > 0:
    entered = input("Enter PIN: ")
    if entered != pin:
        attempts -= 1
        print("Wrong PIN.", attempts, "attempts left")

if entered != pin:
    print("Card blocked!")
else:
    while True:
        print("\n1. Balance  2. Deposit  3. Withdraw  4. Quit")
        choice = input("Choose: ")

        if choice == "1":
            print("Balance:", balance)
        elif choice == "2":
            balance += float(input("Amount: "))
            print("Deposited.")
        elif choice == "3":
            amount = float(input("Amount: "))
            if amount > balance:
                print("Insufficient balance")
            else:
                balance -= amount
                print("Withdrawn.")
        elif choice == "4":
            print("Thank you!")
            break
```

**Logic:** Two nested loops — one for login, one for the session. A real program's structure.

---

## Project 21: Temperature converter

**What to do:** Convert between Celsius and Fahrenheit in both directions, with a menu.

**Hint:** F = C × 9/5 + 32 and C = (F − 32) × 5/9.

**Solution:**

```python
while True:
    print("\n1. C to F  2. F to C  3. Quit")
    choice = input("Choose: ")

    if choice == "1":
        c = float(input("Celsius: "))
        print(c * 9 / 5 + 32, "F")
    elif choice == "2":
        f = float(input("Fahrenheit: "))
        print((f - 32) * 5 / 9, "C")
    elif choice == "3":
        print("Bye!")
        break
```

**Logic:** Two formulas, one menu — the converter template you can extend to any unit.

---

## Project 22: Currency converter (fixed rates)

**What to do:** Convert INR to USD and EUR using fixed rates (1 USD = 83 INR, 1 EUR = 90 INR), both directions, with a menu.

**Hint:** Store rates in a dictionary and reuse the menu pattern.

**Solution:**

```python
rates = {"USD": 83.0, "EUR": 90.0}

while True:
    print("\n1. INR to foreign  2. Foreign to INR  3. Quit")
    choice = input("Choose: ")

    if choice == "1":
        amount = float(input("Amount in INR: "))
        print("USD:", amount / rates["USD"])
        print("EUR:", amount / rates["EUR"])
    elif choice == "2":
        currency = input("Currency (USD/EUR): ").upper()
        if currency in rates:
            amount = float(input("Amount in " + currency + ": "))
            print("INR:", amount * rates[currency])
        else:
            print("Unknown currency")
    elif choice == "3":
        print("Bye!")
        break
```

**Logic:** Data in a dictionary + one menu = a converter that's easy to extend with more currencies.

---

## Project 23: BMI calculator

**What to do:** Ask for weight (kg) and height (meters), compute BMI = weight / height², and print the category: Underweight (<18.5), Normal (<25), Overweight (<30), else Obese.

**Hint:** One formula + an if/elif chain for the category.

**Solution:**

```python
weight = float(input("Weight in kg: "))
height = float(input("Height in meters: "))

bmi = weight / (height ** 2)
print("Your BMI is", round(bmi, 1))

if bmi < 18.5:
    print("Underweight")
elif bmi < 25:
    print("Normal")
elif bmi < 30:
    print("Overweight")
else:
    print("Obese")
```

**Logic:** Health apps are just math + conditions — you now have both.

---

## Project 24: Password generator

**What to do:** Generate a random password of a chosen length using letters (upper and lower), digits, and symbols.

**Hint:** `random.choice()` over a big character set, in a loop.

**Solution:**

```python
import random
import string

length = int(input("Password length: "))

characters = string.ascii_letters + string.digits + "!@#$%^&*"
password = ""

for _ in range(length):
    password += random.choice(characters)

print("Password:", password)
```

**Logic:** The `string` module gives ready-made character sets — and `random.choice` does the rest.

---

## Project 25: Mad Libs

**What to do:** Ask the user for a noun, a verb, and an adjective, then insert them into a story template and print it.

**Hint:** Store the story with `{}` placeholders and use `.format()` — or simple string addition.

**Solution:**

```python
noun = input("Enter a noun: ")
verb = input("Enter a verb: ")
adjective = input("Enter an adjective: ")

story = "The {} {} {}s over the lazy dog every morning.".format(adjective, noun, verb)

print(story)
```

**Logic:** String formatting turns user input into a story — simple and fun.

---

## Project 26: Palindrome checker tool

**What to do:** A tool that keeps asking for text and says whether it's a palindrome (ignoring case and spaces) until the user types "quit".

**Hint:** Normalize with `lower()` + remove spaces, then compare with the reverse.

**Solution:**

```python
def is_palindrome(text):
    clean = ""
    for character in text.lower():
        if character.isalpha():
            clean += character
    return clean == clean[::-1]

while True:
    text = input("Enter text (or 'quit'): ")
    if text.lower() == "quit":
        print("Bye!")
        break
    if is_palindrome(text):
        print("Palindrome!")
    else:
        print("Not a palindrome.")
```

**Logic:** Level 3 logic wrapped in a function, running in a never-crash loop.

---

## Project 27: Prime number generator

**What to do:** Ask for a range (start and end) and print all prime numbers in it.

**Hint:** The Level 6 `is_prime` function + a loop over the range.

**Solution:**

```python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

start = int(input("Start: "))
end = int(input("End: "))

primes = [n for n in range(start, end + 1) if is_prime(n)]
print("Primes:", primes)
```

**Logic:** The `sqrt` optimization makes the check fast even for large ranges.

---

## Project 28: Fibonacci generator

**What to do:** Ask how many Fibonacci numbers to print, then print them on one line.

**Hint:** The two-variable trick from Level 2, with `input()` for the count.

**Solution:**

```python
count = int(input("How many Fibonacci numbers? "))

a, b = 0, 1
for _ in range(count):
    print(a, end=" ")
    a, b = b, a + b
print()
```

**Logic:** `end=" "` keeps everything on one line — a small printing trick with big readability payoff.

---

## Project 29: Mini diary (saves to a file)

**What to do:** A diary that appends entries (with today's date) to `diary.txt`, and can show all entries.

**Hint:** `datetime.date.today()` + append mode — Levels 7 and 8 combined.

**Solution:**

```python
import datetime

def add_entry():
    text = input("Write your entry: ")
    today = datetime.date.today().strftime("%d-%b-%Y")
    with open("diary.txt", "a") as file:
        file.write(today + ": " + text + "\n")
    print("Saved.")

def show_entries():
    try:
        with open("diary.txt", "r") as file:
            print(file.read())
    except FileNotFoundError:
        print("No entries yet.")

while True:
    print("\n1. Add entry  2. Show diary  3. Quit")
    choice = input("Choose: ")

    if choice == "1":
        add_entry()
    elif choice == "2":
        show_entries()
    elif choice == "3":
        print("Bye!")
        break
```

**Logic:** Persistence + dates + functions — a real application you'd actually use.

---

## Project 30: Student record system (files + OOP)

**What to do:** The final boss. A `Student` class (name, marks). Add students, save them to `students.csv`, load them back, and print the class average. Menu-driven.

**Hint:** Combine the `Student` class, the `csv` module, and the menu loop.

**Solution:**

```python
import csv

class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def __str__(self):
        return self.name + " - " + str(self.marks)

students = []

def add_student():
    name = input("Name: ")
    marks = float(input("Marks: "))
    students.append(Student(name, marks))
    print("Added.")

def save():
    with open("students.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Name", "Marks"])
        for student in students:
            writer.writerow([student.name, student.marks])
    print("Saved to students.csv")

def load():
    students.clear()
    try:
        with open("students.csv", "r") as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:
                students.append(Student(row[0], float(row[1])))
        print("Loaded.")
    except FileNotFoundError:
        print("No saved file yet.")

def report():
    if not students:
        print("No students.")
        return
    for student in students:
        print(student)
    average = sum(s.marks for s in students) / len(students)
    print("Class average:", average)

while True:
    print("\n1. Add  2. Save  3. Load  4. Report  5. Quit")
    choice = input("Choose: ")

    if choice == "1":
        add_student()
    elif choice == "2":
        save()
    elif choice == "3":
        load()
    elif choice == "4":
        report()
    elif choice == "5":
        print("Bye!")
        break
```

**Logic:** OOP + files + CSV + menu — every level in one program. If you can build this, you've completed the course.

---

## Level 9 recap — what you now know

Every project reuses the same few skeletons:

- **Menu program** — `while True` + options (Projects 2, 6, 7, 10, 14, 20–22, 29, 30).
- **Game loop** — random target + compare + repeat (Projects 3–5, 16–19).
- **Data-driven design** — questions/books/contacts stored as data, not code (Projects 8, 10, 15).
- **Report generator** — data in, analysis out (Projects 9, 11, 12).
- **File-backed app** — data survives restarts (Projects 29, 30).
- **OOP app** — classes + files + menus (Projects 15, 30).

**Where to go next:** make each project *bigger* — add more options, better validation, nicer output. Then build your own ideas using these skeletons. You now know enough Python to build almost anything you can describe.
