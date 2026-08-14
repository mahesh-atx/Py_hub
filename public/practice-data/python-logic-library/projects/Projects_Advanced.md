# Advanced Projects — 30 Build-It-Yourself Projects

**This file is different from the topic files.** Each project is a real application. The **Build plan** tells you HOW to think about building it — try to build it yourself first, step by step. Only look at the solution when you're stuck or finished.

**Skills needed:** everything from Levels 1–9 and the 12 topic deep-dives. Some projects use only the standard library (SQLite, tkinter, turtle, sockets, zipfile, hashlib, json, csv, urllib); GUI projects must be run on your own computer.

---

## Project 1: To-Do App with SQLite

**What to build:** A to-do list that survives restarts, backed by a real SQLite database. Features: add task, list tasks, mark done, delete, and quit.

**Build plan:**
1. Create a `tasks` table (id, task, done) with `sqlite3`.
2. Write helper functions for each action using SQL (`INSERT`, `SELECT`, `UPDATE`, `DELETE`).
3. Build the menu loop calling those functions.
4. Re-run the program — tasks should still be there.

**Hint:** Every operation is one SQL statement. Use `conn.commit()` after changes.

**Solution:**

```python
import sqlite3

def connect():
    conn = sqlite3.connect("todo.db")
    conn.execute("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, task TEXT, done INTEGER)")
    return conn

def add_task(task):
    conn = connect()
    conn.execute("INSERT INTO tasks (task, done) VALUES (?, 0)", (task,))
    conn.commit()
    conn.close()
    print("Added.")

def list_tasks():
    conn = connect()
    rows = conn.execute("SELECT id, task, done FROM tasks").fetchall()
    conn.close()
    if not rows:
        print("No tasks.")
    for task_id, task, done in rows:
        status = "X" if done else " "
        print(f"[{status}] {task_id}. {task}")

def mark_done(task_id):
    conn = connect()
    conn.execute("UPDATE tasks SET done = 1 WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    print("Marked done.")

def delete_task(task_id):
    conn = connect()
    conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    print("Deleted.")

while True:
    print("\n1. Add  2. List  3. Mark done  4. Delete  5. Quit")
    choice = input("Choose: ")

    if choice == "1":
        add_task(input("Task: "))
    elif choice == "2":
        list_tasks()
    elif choice == "3":
        mark_done(int(input("Task id: ")))
    elif choice == "4":
        delete_task(int(input("Task id: ")))
    elif choice == "5":
        print("Bye!")
        break
```

**Make it yours:** add "list only pending" and due dates.

---

## Project 2: Expense Tracker with SQLite + Monthly Report

**What to build:** Record expenses (name, amount, category, date). Features: add expense, list all, show total by category, show monthly report.

**Build plan:**
1. Create the `expenses` table with a date column (store as `YYYY-MM-DD`).
2. Add/list are simple SQL; the report groups by `strftime('%Y-%m', date)`.
3. For category totals, sum amounts grouped by category.
4. Menu loop with the three reports.

**Hint:** `SELECT category, SUM(amount) FROM expenses GROUP BY category`.

**Solution:**

```python
import sqlite3

def connect():
    conn = sqlite3.connect("expenses.db")
    conn.execute("""CREATE TABLE IF NOT EXISTS expenses
                    (id INTEGER PRIMARY KEY, name TEXT, amount REAL,
                     category TEXT, date TEXT)""")
    return conn

def add_expense(name, amount, category, date):
    conn = connect()
    conn.execute("INSERT INTO expenses (name, amount, category, date) VALUES (?, ?, ?, ?)",
                 (name, amount, category, date))
    conn.commit()
    conn.close()
    print("Saved.")

def list_expenses():
    conn = connect()
    rows = conn.execute("SELECT name, amount, category, date FROM expenses").fetchall()
    conn.close()
    for name, amount, category, date in rows:
        print(f"{date} | {name} | {category} | Rs. {amount}")

def category_report():
    conn = connect()
    rows = conn.execute("SELECT category, SUM(amount) FROM expenses GROUP BY category").fetchall()
    conn.close()
    for category, total in rows:
        print(f"{category}: Rs. {total}")

def monthly_report():
    conn = connect()
    rows = conn.execute(
        "SELECT strftime('%Y-%m', date), SUM(amount) FROM expenses GROUP BY strftime('%Y-%m', date)"
    ).fetchall()
    conn.close()
    for month, total in rows:
        print(f"{month}: Rs. {total}")

while True:
    print("\n1. Add  2. List  3. By category  4. Monthly  5. Quit")
    choice = input("Choose: ")

    if choice == "1":
        name = input("Name: ")
        amount = float(input("Amount: "))
        category = input("Category: ")
        date = input("Date (YYYY-MM-DD): ")
        add_expense(name, amount, category, date)
    elif choice == "2":
        list_expenses()
    elif choice == "3":
        category_report()
    elif choice == "4":
        monthly_report()
    elif choice == "5":
        print("Bye!")
        break
```

**Make it yours:** filter reports by month or category.

---

## Project 3: CLI Password Manager (hashed, file-backed)

**What to build:** A password vault storing site → password, where passwords are stored HASHED (sha256), in a JSON file. Features: add, get, list sites, quit.

**Build plan:**
1. Use a JSON file as storage; load it into a dict at startup.
2. `add` hashes the password with `hashlib.sha256` before storing.
3. `get` returns the hash (real managers verify, they don't reveal).
4. Save the dict back to JSON after every change.

**Hint:** `hashlib.sha256(password.encode()).hexdigest()` is the one-way fingerprint.

**Solution:**

```python
import json
import hashlib
import os

FILE = "vault.json"

def load():
    if os.path.exists(FILE):
        with open(FILE, "r") as f:
            return json.load(f)
    return {}

def save(vault):
    with open(FILE, "w") as f:
        json.dump(vault, f, indent=2)

def add(vault, site, password):
    vault[site] = hashlib.sha256(password.encode()).hexdigest()
    save(vault)
    print("Stored (hashed) for", site)

def check(vault, site, password):
    hashed = hashlib.sha256(password.encode()).hexdigest()
    return vault.get(site) == hashed

vault = load()

while True:
    print("\n1. Add  2. Verify password  3. List sites  4. Quit")
    choice = input("Choose: ")

    if choice == "1":
        add(vault, input("Site: "), input("Password: "))
    elif choice == "2":
        site = input("Site: ")
        password = input("Password: ")
        print("Correct!" if check(vault, site, password) else "Wrong password or site missing")
    elif choice == "3":
        print("Sites:", ", ".join(vault.keys()))
    elif choice == "4":
        print("Bye!")
        break
```

**Make it yours:** a master password that must match before the menu opens.

---

## Project 4: Tic-Tac-Toe with an Unbeatable AI (Minimax)

**What to build:** Play tic-tac-toe vs the computer. The AI uses the minimax algorithm — it can never lose, only win or draw.

**Build plan:**
1. Represent the board as a list of 9 cells. You are "X", the AI is "O".
2. Write `winning(board, player)` checking the 8 lines.
3. Write `minimax(board, is_ai)`: if the game is over, return +1 (AI wins) / -1 (human wins) / 0 (draw). Otherwise try every empty cell, recurse, and take the best score.
4. `best_move(board)` picks the AI's move from minimax.
5. The main loop alternates human and AI until someone wins or the board is full.

**Hint:** Minimax = "what's the worst that can happen after this move?" — the AI picks the move whose worst case is best.

**Solution:**

```python
WIN_LINES = [
    (0, 1, 2), (3, 4, 5), (6, 7, 8),
    (0, 3, 6), (1, 4, 7), (2, 5, 8),
    (0, 4, 8), (2, 4, 6),
]

def winner(board):
    for a, b, c in WIN_LINES:
        if board[a] == board[b] == board[c] != " ":
            return board[a]
    return None

def full(board):
    return " " not in board

def minimax(board, is_ai):
    w = winner(board)
    if w == "O":
        return 1
    if w == "X":
        return -1
    if full(board):
        return 0

    scores = []
    for i, cell in enumerate(board):
        if cell == " ":
            board[i] = "O" if is_ai else "X"
            scores.append(minimax(board, not is_ai))
            board[i] = " "
    return max(scores) if is_ai else min(scores)

def best_move(board):
    best_score, best_i = -2, -1
    for i, cell in enumerate(board):
        if cell == " ":
            board[i] = "O"
            score = minimax(board, False)
            board[i] = " "
            if score > best_score:
                best_score, best_i = score, i
    return best_i

def show(board):
    for i in range(0, 9, 3):
        print(" " + " | ".join(board[i:i+3]))
        if i < 6:
            print("---+---+---")

board = [" "] * 9

while True:
    show(board)
    move = int(input("Your move (1-9): ")) - 1
    if board[move] != " ":
        print("Taken! Try again.")
        continue
    board[move] = "X"

    if winner(board) == "X":
        show(board)
        print("You win!")
        break
    if full(board):
        show(board)
        print("Draw!")
        break

    board[best_move(board)] = "O"
    if winner(board) == "O":
        show(board)
        print("AI wins!")
        break
```

**Make it yours:** add difficulty levels — easy AI picks random moves.

---

## Project 5: Sudoku Solver (backtracking)

**What to build:** A program that solves ANY valid sudoku puzzle using backtracking: try a number, recurse; if stuck, undo and try the next.

**Build plan:**
1. Store the puzzle as a 9×9 list of lists; 0 = empty cell.
2. `find_empty()` returns the first empty position.
3. `is_valid(board, num, row, col)` checks the row, column, and 3×3 box.
4. `solve(board)`: if no empty cell → solved. Otherwise try 1–9, recursing after each valid placement, backtracking on failure.
5. Print the solved grid.

**Hint:** Backtracking = systematic trial and error with undo.

**Solution:**

```python
PUZZLE = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
]

def find_empty(board):
    for row in range(9):
        for col in range(9):
            if board[row][col] == 0:
                return row, col
    return None

def is_valid(board, num, row, col):
    if num in board[row]:
        return False
    if num in [board[r][col] for r in range(9)]:
        return False
    box_row, box_col = (row // 3) * 3, (col // 3) * 3
    for r in range(box_row, box_row + 3):
        for c in range(box_col, box_col + 3):
            if board[r][c] == num:
                return False
    return True

def solve(board):
    empty = find_empty(board)
    if empty is None:
        return True
    row, col = empty
    for num in range(1, 10):
        if is_valid(board, num, row, col):
            board[row][col] = num
            if solve(board):
                return True
            board[row][col] = 0   # backtrack
    return False

solve(PUZZLE)

for row in PUZZLE:
    print(row)
```

**Make it yours:** read the puzzle from a file, and add a puzzle generator.

---

## Project 6: Snake Game (turtle)

**What to build:** The classic snake game: the snake grows when it eats food, dies when it hits a wall or itself, and the score shows on screen. Uses the `turtle` module.

**Build plan:**
1. A turtle screen with keyboard bindings for the four directions.
2. The snake = a list of turtle segments; move by adding a head and removing the tail.
3. Food = a randomly placed square; when the head touches it, grow the snake and increase score.
4. Check wall collision and self-collision each frame.
5. A game loop using `screen.update()` inside a `while`.

**Hint:** Run this on your own computer (it opens a window — won't work in a browser preview). The move trick: insert a new head segment and `stamp`/erase, or move each segment to the one ahead.

**Solution:**

```python
import turtle
import random
import time

# Setup
screen = turtle.Screen()
screen.title("Snake Game")
screen.bgcolor("black")
screen.setup(600, 600)
screen.tracer(0)

snake = []
for i in range(3):
    segment = turtle.Turtle()
    segment.shape("square")
    segment.color("green")
    segment.penup()
    segment.goto(-20 * i, 0)
    snake.append(segment)

food = turtle.Turtle()
food.shape("circle")
food.color("red")
food.penup()
food.goto(random.randint(-14, 14) * 20, random.randint(-14, 14) * 20)

score_display = turtle.Turtle()
score_display.hideturtle()
score_display.penup()
score_display.color("white")
score_display.goto(0, 260)

direction = "right"
score = 0

def go_up():
    global direction
    if direction != "down":
        direction = "up"

def go_down():
    global direction
    if direction != "up":
        direction = "down"

def go_left():
    global direction
    if direction != "right":
        direction = "left"

def go_right():
    global direction
    if direction != "left":
        direction = "right"

screen.listen()
screen.onkey(go_up, "Up")
screen.onkey(go_down, "Down")
screen.onkey(go_left, "Left")
screen.onkey(go_right, "Right")

while True:
    screen.update()
    time.sleep(0.1)

    # Move: new head in the current direction
    head = snake[0]
    x, y = head.xcor(), head.ycor()
    if direction == "up":
        y += 20
    elif direction == "down":
        y -= 20
    elif direction == "left":
        x -= 20
    elif direction == "right":
        x += 20
    new_head = turtle.Turtle()
    new_head.shape("square")
    new_head.color("green")
    new_head.penup()
    new_head.goto(x, y)
    snake.insert(0, new_head)

    # Wall collision
    if abs(x) > 280 or abs(y) > 280:
        score_display.clear()
        score_display.write("Game Over! Score: " + str(score), align="center", font=("Arial", 20, "bold"))
        break

    # Eat food?
    if new_head.distance(food) < 20:
        food.goto(random.randint(-14, 14) * 20, random.randint(-14, 14) * 20)
        score += 10
        score_display.clear()
        score_display.write("Score: " + str(score), align="center", font=("Arial", 16, "bold"))
    else:
        tail = snake.pop()
        tail.hideturtle()

    # Self collision
    for segment in snake[1:]:
        if new_head.distance(segment) < 15:
            score_display.clear()
            score_display.write("Game Over! Score: " + str(score), align="center", font=("Arial", 20, "bold"))
            screen.exitonclick()
            raise SystemExit

screen.exitonclick()
```

**Make it yours:** increasing speed as the score grows, and a high-score file.

---

## Project 7: Hangman with tkinter GUI

**What to build:** A hangman game with a real window: the word shown as underscores, letter buttons, remaining guesses, and win/lose states.

**Build plan:**
1. A tkinter window with a Label for the word display and one for status.
2. Buttons for A–Z; clicking one disables it and checks the guess.
3. Reveal matching letters; count wrong guesses (max 6).
4. Win when all letters are revealed; lose at 6 wrong guesses.
5. A "New Game" button that resets everything.

**Hint:** Run locally (GUI). Keep the game STATE (word, guessed, wrong) in plain variables — tkinter is just the view.

**Solution:**

```python
import tkinter as tk
import random

WORDS = ["python", "program", "computer", "keyboard", "monitor", "hangman"]

word = random.choice(WORDS)
guessed = set()
wrong = 0
MAX_WRONG = 6

root = tk.Tk()
root.title("Hangman")

display = tk.Label(root, text="", font=("Courier", 24))
display.pack(pady=10)

status = tk.Label(root, text="", font=("Arial", 14))
status.pack()

buttons_frame = tk.Frame(root)
buttons_frame.pack(pady=10)

buttons = {}

def update_display():
    shown = " ".join(letter if letter in guessed else "_" for letter in word)
    display.config(text=shown)
    status.config(text=f"Wrong guesses: {wrong}/{MAX_WRONG}")

def guess(letter):
    global wrong
    if letter in guessed:
        return
    guessed.add(letter)
    buttons[letter].config(state="disabled")
    if letter not in word:
        wrong += 1
    update_display()

    if all(letter in guessed for letter in word):
        status.config(text="You win! The word was " + word)
        disable_all()
    elif wrong >= MAX_WRONG:
        status.config(text="You lose! The word was " + word)
        disable_all()

def disable_all():
    for button in buttons.values():
        button.config(state="disabled")

for i, letter in enumerate("abcdefghijklmnopqrstuvwxyz"):
    button = tk.Button(buttons_frame, text=letter.upper(), width=3,
                       command=lambda l=letter: guess(l))
    button.grid(row=i // 9, column=i % 9)
    buttons[letter] = button

def new_game():
    global word, guessed, wrong
    word = random.choice(WORDS)
    guessed = set()
    wrong = 0
    for button in buttons.values():
        button.config(state="normal")
    update_display()

tk.Button(root, text="New Game", command=new_game).pack(pady=10)

update_display()
root.mainloop()
```

**Make it yours:** draw the actual hangman figure step by step.

---

## Project 8: Calculator with tkinter GUI

**What to build:** A working calculator app: number buttons, + − × ÷, clear, equals, and a display.

**Build plan:**
1. A display Label/Entry showing the current expression.
2. Number buttons append to the expression.
3. Operator buttons append too.
4. "=" evaluates the expression with `eval` inside try/except (show "Error" on failure).
5. "C" clears everything.

**Hint:** Keep ONE string variable `expression` — every button edits it.

**Solution:**

```python
import tkinter as tk

expression = ""

def press(value):
    global expression
    expression += value
    display.config(text=expression)

def evaluate():
    global expression
    try:
        result = str(eval(expression))
        display.config(text=result)
        expression = result
    except Exception:
        display.config(text="Error")
        expression = ""

def clear():
    global expression
    expression = ""
    display.config(text="")

root = tk.Tk()
root.title("Calculator")

display = tk.Label(root, text="", font=("Arial", 24), anchor="e", width=18, relief="sunken")
display.grid(row=0, column=0, columnspan=4, padx=5, pady=5)

buttons = [
    ("7", 1, 0), ("8", 1, 1), ("9", 1, 2), ("/", 1, 3),
    ("4", 2, 0), ("5", 2, 1), ("6", 2, 2), ("*", 2, 3),
    ("1", 3, 0), ("2", 3, 1), ("3", 3, 2), ("-", 3, 3),
    ("0", 4, 0), (".", 4, 1), ("+", 4, 2), ("=", 4, 3),
]

for text, row, col in buttons:
    command = evaluate if text == "=" else (lambda t=text: press(t))
    tk.Button(root, text=text, width=5, height=2, command=command).grid(row=row, column=col)

tk.Button(root, text="C", width=22, height=1, command=clear).grid(row=5, column=0, columnspan=4)

root.mainloop()
```

**Make it yours:** add parentheses, square root, and backspace.

---

## Project 9: Digital Clock (tkinter)

**What to build:** A live digital clock showing time and date, updating every second.

**Build plan:**
1. A big Label for the time.
2. A function that reads `datetime.now()` and updates the label.
3. `root.after(1000, update)` schedules the next update — that's the loop.

**Hint:** `after()` is how tkinter apps animate without blocking.

**Solution:**

```python
import tkinter as tk
import datetime

root = tk.Tk()
root.title("Digital Clock")

clock = tk.Label(root, font=("Courier", 60), fg="lime", bg="black")
clock.pack(padx=30, pady=20)

date_label = tk.Label(root, font=("Arial", 20), fg="lime", bg="black")
date_label.pack(pady=10)

def update():
    now = datetime.datetime.now()
    clock.config(text=now.strftime("%H:%M:%S"))
    date_label.config(text=now.strftime("%A, %d %B %Y"))
    root.after(1000, update)

update()
root.mainloop()
```

**Make it yours:** a 12-hour mode and an alarm feature.

---

## Project 10: Text Adventure Game

**What to build:** A small world of connected rooms. The player moves with north/south/east/west, can look around, and wins by reaching the goal room.

**Build plan:**
1. Model each room as a dict: `{"description": ..., "north": "kitchen", ...}`.
2. Start the player in "hall"; each command looks up the direction in the current room.
3. `look` prints the description and visible exits; `quit` ends the game.
4. Reaching the "treasure" room prints a victory message and ends the game.

**Hint:** The whole game is a dict lookup plus a loop — state machines in action.

**Solution:**

```python
rooms = {
    "hall": {
        "description": "A dusty hall. Doors lead north and east.",
        "north": "kitchen", "east": "garden",
    },
    "kitchen": {
        "description": "A kitchen smelling of old bread. South returns to the hall.",
        "south": "hall",
    },
    "garden": {
        "description": "An overgrown garden. West is the hall, north is the cellar.",
        "west": "hall", "north": "cellar",
    },
    "cellar": {
        "description": "A dark cellar. Something glitters in the corner...",
        "south": "garden", "east": "treasure",
    },
    "treasure": {
        "description": "YOU FOUND THE TREASURE! You win!",
    },
}

current = "hall"
print("Type: north/south/east/west, look, or quit")

while True:
    room = rooms[current]
    if current == "treasure":
        print(room["description"])
        break

    command = input("> ").strip().lower()

    if command == "quit":
        print("Bye!")
        break
    elif command == "look":
        print(room["description"])
        exits = [key for key in room if key != "description"]
        print("Exits:", ", ".join(exits))
    elif command in room:
        current = room[command]
        print(rooms[current]["description"])
    else:
        print("You can't go that way.")
```

**Make it yours:** items to pick up, locked doors, and a map command.

---

## Project 11: Bank Management System (OOP + JSON file)

**What to build:** A banking system with Account objects, transactions, and data saved to a JSON file so accounts survive restarts.

**Build plan:**
1. `Account` class: owner, balance, deposit, withdraw (with insufficient-funds guard).
2. `Bank` class: add account, find by owner, transfer between accounts, total balance.
3. Save/load the accounts list to `bank_data.json` (store owner+balance dicts).
4. Menu: create account, deposit, withdraw, transfer, report, quit.

**Hint:** Split the app into OOP logic (classes) and persistence (json functions).

**Solution:**

```python
import json
import os

FILE = "bank_data.json"

class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds")
            return False
        self.balance -= amount
        return True

class Bank:
    def __init__(self):
        self.accounts = []

    def add(self, account):
        self.accounts.append(account)

    def find(self, owner):
        for account in self.accounts:
            if account.owner == owner:
                return account
        return None

    def transfer(self, from_owner, to_owner, amount):
        sender = self.find(from_owner)
        receiver = self.find(to_owner)
        if sender and receiver and sender.withdraw(amount):
            receiver.deposit(amount)
            return True
        print("Transfer failed")
        return False

    def total_balance(self):
        return sum(account.balance for account in self.accounts)

def save(bank):
    data = [{"owner": a.owner, "balance": a.balance} for a in bank.accounts]
    with open(FILE, "w") as f:
        json.dump(data, f, indent=2)

def load():
    bank = Bank()
    if os.path.exists(FILE):
        with open(FILE, "r") as f:
            for item in json.load(f):
                bank.add(Account(item["owner"], item["balance"]))
    return bank

bank = load()

while True:
    print("\n1. New account  2. Deposit  3. Withdraw  4. Transfer  5. Report  6. Quit")
    choice = input("Choose: ")

    if choice == "1":
        owner = input("Owner name: ")
        if bank.find(owner):
            print("Account exists")
        else:
            bank.add(Account(owner, float(input("Opening balance: "))))
            save(bank)
    elif choice == "2":
        account = bank.find(input("Owner: "))
        if account:
            account.deposit(float(input("Amount: ")))
            save(bank)
    elif choice == "3":
        account = bank.find(input("Owner: "))
        if account:
            account.withdraw(float(input("Amount: ")))
            save(bank)
    elif choice == "4":
        bank.transfer(input("From: "), input("To: "), float(input("Amount: ")))
        save(bank)
    elif choice == "5":
        for account in bank.accounts:
            print(account.owner, "-", account.balance)
        print("Total:", bank.total_balance())
    elif choice == "6":
        save(bank)
        print("Bye!")
        break
```

**Make it yours:** account numbers, transaction history, interest calculation.

---

## Project 12: Student Management System (CSV)

**What to build:** Manage students with names and marks, stored in CSV, with add, list, grade report, and delete.

**Build plan:**
1. Load `students.csv` into a list of dicts at startup (handle missing file).
2. `add` appends a student and rewrites the file.
3. `report` lists students with letter grades (A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60, else F).
4. `delete` removes by name and rewrites.
5. Menu loop.

**Hint:** Rewrite-the-whole-file is the simplest CSV editing strategy.

**Solution:**

```python
import csv
import os

FILE = "students.csv"
FIELDS = ["name", "marks"]

def load():
    if not os.path.exists(FILE):
        return []
    with open(FILE, "r") as f:
        return list(csv.DictReader(f))

def save(students):
    with open(FILE, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(students)

def grade(marks):
    if marks >= 90:
        return "A"
    if marks >= 80:
        return "B"
    if marks >= 70:
        return "C"
    if marks >= 60:
        return "D"
    return "F"

students = load()

while True:
    print("\n1. Add  2. List  3. Report  4. Delete  5. Quit")
    choice = input("Choose: ")

    if choice == "1":
        students.append({"name": input("Name: "), "marks": float(input("Marks: "))})
        save(students)
        print("Added.")
    elif choice == "2":
        for student in students:
            print(student["name"], "-", student["marks"])
    elif choice == "3":
        for student in students:
            print(student["name"], "-", student["marks"], "-", grade(float(student["marks"])))
    elif choice == "4":
        name = input("Name to delete: ")
        students = [s for s in students if s["name"] != name]
        save(students)
        print("Deleted (if present).")
    elif choice == "5":
        print("Bye!")
        break
```

**Make it yours:** subjects per student, class average, and rank list.

---

## Project 13: Weather App (urllib + OpenWeatherMap)

**What to build:** Type a city, get the current temperature and conditions from the OpenWeatherMap API.

**Build plan:**
1. Get a free API key from openweathermap.org.
2. Build the URL: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric`.
3. Fetch with `urllib.request.urlopen`, parse the JSON.
4. Print temperature, description, and humidity.

**Hint:** Needs internet and a real API key — run it locally.

**Solution:**

```python
import urllib.request
import json

API_KEY = "YOUR_API_KEY_HERE"   # free key from openweathermap.org

def get_weather(city):
    url = (
        "https://api.openweathermap.org/data/2.5/weather?q="
        + city + "&appid=" + API_KEY + "&units=metric"
    )
    try:
        with urllib.request.urlopen(url) as response:
            data = json.load(response)
        temperature = data["main"]["temp"]
        description = data["weather"][0]["description"]
        humidity = data["main"]["humidity"]
        print(city.title(), "-", description)
        print("Temperature:", temperature, "C")
        print("Humidity:", humidity, "%")
    except Exception as e:
        print("Could not fetch weather:", e)

city = input("Enter a city: ")
get_weather(city)
```

**Make it yours:** a 5-day forecast view and Celsius/Fahrenheit toggle.

---

## Project 14: Live Currency Converter (urllib + API)

**What to build:** Convert amounts between currencies using LIVE rates fetched from a free exchange-rate API.

**Build plan:**
1. Fetch rates from `https://open.er-api.com/v6/latest/USD` (no key needed).
2. Parse the JSON `rates` dict.
3. Convert: `amount / rates[from] * rates[to]`.
4. Loop asking for amount and currencies until quit.

**Hint:** Pick one base currency (USD) and route every conversion through it.

**Solution:**

```python
import urllib.request
import json

URL = "https://open.er-api.com/v6/latest/USD"

def fetch_rates():
    with urllib.request.urlopen(URL) as response:
        data = json.load(response)
    return data["rates"]

print("Fetching live rates...")
try:
    rates = fetch_rates()
    print("Available (sample):", ", ".join(list(rates)[:10]), "...")
except Exception as e:
    print("Network error:", e)
    raise SystemExit

while True:
    amount_text = input("\nAmount (or 'quit'): ")
    if amount_text.lower() == "quit":
        print("Bye!")
        break

    try:
        amount = float(amount_text)
        from_currency = input("From currency (e.g. INR): ").upper()
        to_currency = input("To currency (e.g. USD): ").upper()
        result = amount / rates[from_currency] * rates[to_currency]
        print(amount, from_currency, "=", round(result, 2), to_currency)
    except KeyError:
        print("Unknown currency code")
    except ValueError:
        print("Invalid amount")
```

**Make it yours:** cache rates to a file and refresh only once a day.

---

## Project 15: File Organizer

**What to build:** A tool that sorts files in a folder into subfolders by extension (Images, Documents, Videos, etc.).

**Build plan:**
1. Map extensions to category names in a dict.
2. `os.makedirs(category, exist_ok=True)` for each needed folder.
3. For each file in the folder, find its extension's category (or "Others") and move it with `shutil.move`.
4. Print a summary of moves.

**Hint:** The category dict IS the entire business logic.

**Solution:**

```python
import os
import shutil

CATEGORIES = {
    "Images": [".jpg", ".jpeg", ".png", ".gif", ".bmp"],
    "Documents": [".pdf", ".doc", ".docx", ".txt", ".md"],
    "Videos": [".mp4", ".avi", ".mkv", ".mov"],
    "Audio": [".mp3", ".wav", ".flac"],
    "Code": [".py", ".js", ".html", ".css", ".java"],
}

FOLDER = "Downloads"

# Create a sample folder with mixed files (so the demo runs anywhere):
os.makedirs(FOLDER, exist_ok=True)
for name in ("photo.jpg", "notes.txt", "movie.mp4", "song.mp3", "script.py", "archive.xyz"):
    with open(os.path.join(FOLDER, name), "w") as f:
        f.write("sample")

def organize(folder):
    moved = 0
    for name in os.listdir(folder):
        path = os.path.join(folder, name)
        if os.path.isdir(path):
            continue
        extension = os.path.splitext(name)[1].lower()
        category = "Others"
        for cat, extensions in CATEGORIES.items():
            if extension in extensions:
                category = cat
                break
        target_dir = os.path.join(folder, category)
        os.makedirs(target_dir, exist_ok=True)
        shutil.move(path, os.path.join(target_dir, name))
        print("Moved", name, "->", category)
        moved += 1
    print("Organized", moved, "files")

organize(FOLDER)
```

**Make it yours:** add a --dry-run flag and date-based folders.

---

## Project 16: Duplicate File Finder (hashlib)

**What to build:** Scan a folder tree and report files with identical content (same hash), grouping them.

**Build plan:**
1. Walk the tree with `os.walk`.
2. Hash each file's bytes with `hashlib.sha256` (read in binary mode).
3. Group file paths by hash in a dict.
4. Print every group that has more than one path.

**Hint:** Same content = same hash — the hash IS the comparison.

**Solution:**

```python
import os
import hashlib

FOLDER = "scan_dir"

# Create a sample tree: two identical files + one different
os.makedirs(os.path.join(FOLDER, "sub"), exist_ok=True)
for path, content in [
    (os.path.join(FOLDER, "a.txt"), "same content"),
    (os.path.join(FOLDER, "sub", "b.txt"), "same content"),
    (os.path.join(FOLDER, "c.txt"), "different content"),
]:
    with open(path, "w") as f:
        f.write(content)

def hash_file(path):
    hasher = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            hasher.update(chunk)
    return hasher.hexdigest()

groups = {}
for root, dirs, files in os.walk(FOLDER):
    for name in files:
        path = os.path.join(root, name)
        digest = hash_file(path)
        groups.setdefault(digest, []).append(path)

found = False
for digest, paths in groups.items():
    if len(paths) > 1:
        found = True
        print("Duplicates (" + digest[:8] + "...):")
        for path in paths:
            print("   ", path)

if not found:
    print("No duplicates found.")
```

**Make it yours:** an interactive mode that offers to delete the copies.

---

## Project 17: Backup Tool (zipfile + datetime)

**What to build:** One command that zips a whole folder into a timestamped archive, then verifies the archive's contents.

**Build plan:**
1. Build the archive name from the folder name + date (`backup_myproject_2026-08-14.zip`).
2. Walk the folder and add every file to a `ZipFile`.
3. Print the archive's contents back as verification.
4. Store backups in a `backups/` directory.

**Hint:** `zipfile.ZipFile(path, "w")` + `archive.write(filepath)` per file.

**Solution:**

```python
import os
import zipfile
import datetime

SOURCE = "myproject"
BACKUP_DIR = "backups"

# Create a sample project folder (so the demo runs anywhere):
os.makedirs(SOURCE, exist_ok=True)
for name in ("main.py", "data.csv", "notes.md"):
    with open(os.path.join(SOURCE, name), "w") as f:
        f.write("sample content for " + name)

def backup(folder):
    os.makedirs(BACKUP_DIR, exist_ok=True)
    today = datetime.date.today().strftime("%Y-%m-%d")
    archive_name = "backup_" + folder + "_" + today + ".zip"
    archive_path = os.path.join(BACKUP_DIR, archive_name)

    count = 0
    with zipfile.ZipFile(archive_path, "w") as archive:
        for root, dirs, files in os.walk(folder):
            for name in files:
                full_path = os.path.join(root, name)
                archive.write(full_path)
                count += 1

    print("Backup created:", archive_path, "(", count, "files )")

    with zipfile.ZipFile(archive_path, "r") as archive:
        print("Contents:")
        for name in archive.namelist():
            print("   ", name)

backup(SOURCE)
```

**Make it yours:** keep only the last 5 backups, deleting older ones.

---

## Project 18: Web Scraper (urllib + re)

**What to build:** Fetch a web page, extract its title and all its links, using only the standard library.

**Build plan:**
1. `urllib.request.urlopen(url)` to get the HTML.
2. Decode the bytes to text.
3. Regex: `<title>(.*?)</title>` for the title, `href="([^"]+)"` for links.
4. Print the title and the first 10 links.

**Hint:** Regex scraping is brittle but educational — real projects use BeautifulSoup.

**Solution:**

```python
import urllib.request
import re

URL = "https://example.com"

def scrape(url):
    with urllib.request.urlopen(url) as response:
        html = response.read().decode("utf-8", errors="ignore")

    title_match = re.search(r"<title>(.*?)</title>", html, re.IGNORECASE)
    title = title_match.group(1).strip() if title_match else "No title found"

    links = re.findall(r'href="([^"]+)"', html)

    print("Title:", title)
    print("Links found:", len(links))
    for link in links[:10]:
        print("   ", link)

scrape(URL)
```

**Make it yours:** follow links one level deep and collect all titles.

---

## Project 19: Rule-Based Chatbot

**What to build:** A chatbot that answers from keyword rules: greetings, how-are-you, name, time, bye, and a fallback. Extensible by adding rules.

**Build plan:**
1. Store rules as a list of `(keywords, response)` pairs.
2. For each user input, find the first rule whose keywords appear in the text.
3. Respond with the matched rule's response, or the fallback.
4. Loop until the user says bye/quit.

**Hint:** The rules list IS the bot's brain — adding a rule adds a skill.

**Solution:**

```python
import datetime

RULES = [
    (["hello", "hi", "hey"], "Hello! How can I help you today?"),
    (["how are you", "how do you do"], "I'm just code, but I'm running great! How about you?"),
    (["your name", "who are you"], "I'm PyBot, a rule-based chatbot."),
    (["time"], "It is " + datetime.datetime.now().strftime("%H:%M") + "."),
    (["weather"], "I can't check the weather yet, but I hear it's nice outside!"),
    (["bye", "goodbye", "quit"], "Goodbye! Have a great day."),
]

FALLBACK = "Interesting! Tell me more, or ask about the time, the weather, or my name."

def respond(text):
    text = text.lower()
    for keywords, response in RULES:
        if any(keyword in text for keyword in keywords):
            return response
    return FALLBACK

print("PyBot: Hello! Type 'quit' to exit.")
while True:
    user = input("You: ")
    if user.lower() in ("quit", "bye", "goodbye"):
        print("PyBot: Goodbye!")
        break
    print("PyBot:", respond(user))
```

**Make it yours:** let rules store functions, not just strings (e.g. a dice roll).

---

## Project 20: Quiz App with a JSON Question Bank

**What to build:** A quiz game whose questions live in a JSON file — editable without touching code. Features: play a quiz, add questions, and see the score.

**Build plan:**
1. Load `questions.json` into a list at startup (create it with defaults if missing).
2. `play` loops the questions, checks answers, counts score.
3. `add` appends a question and saves the file.
4. Menu loop.

**Hint:** Separating DATA (JSON) from CODE (the quiz engine) is the whole lesson.

**Solution:**

```python
import json
import os

FILE = "questions.json"

DEFAULT_QUESTIONS = [
    {"question": "What is 2 + 2?", "options": ["3", "4", "5"], "answer": "4"},
    {"question": "Which keyword defines a function?", "options": ["func", "def", "define"], "answer": "def"},
    {"question": "What does len('abc') return?", "options": ["2", "3", "4"], "answer": "3"},
]

def load():
    if not os.path.exists(FILE):
        return list(DEFAULT_QUESTIONS)
    with open(FILE, "r") as f:
        return json.load(f)

def save(questions):
    with open(FILE, "w") as f:
        json.dump(questions, f, indent=2)

def play(questions):
    score = 0
    for question in questions:
        print("\n" + question["question"])
        for option in question["options"]:
            print("  -", option)
        answer = input("Your answer: ").strip()
        if answer.lower() == question["answer"].lower():
            print("Correct!")
            score += 1
        else:
            print("Wrong. The answer was", question["answer"])
    print("\nScore:", score, "out of", len(questions))

questions = load()

while True:
    print("\n1. Play  2. Add question  3. Quit")
    choice = input("Choose: ")

    if choice == "1":
        play(questions)
    elif choice == "2":
        new_question = {
            "question": input("Question: "),
            "options": input("Options (comma separated): ").split(","),
            "answer": input("Answer: "),
        }
        questions.append(new_question)
        save(questions)
        print("Saved.")
    elif choice == "3":
        print("Bye!")
        break
```

**Make it yours:** categories, timers per question, and a high-score file.

---

## Project 21: Morse Code Translator

**What to build:** A translator that converts text ↔ Morse code in both directions.

**Build plan:**
1. A dict mapping each letter/digit to its Morse pattern (and a reverse dict).
2. `encode(text)`: map each character, joining dots/dashes with spaces and words with " / ".
3. `decode(morse)`: split on spaces, map back.
4. A demo: encode "SOS" and decode "... --- ...".

**Hint:** The reverse dict: `{code: char for char, code in MORSE.items()}`.

**Solution:**

```python
MORSE = {
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".",
    "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---",
    "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---",
    "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
    "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--",
    "Z": "--..",
    "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
    "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
}

REVERSE = {code: char for char, code in MORSE.items()}

def encode(text):
    words = []
    for word in text.upper().split():
        words.append(" ".join(MORSE[char] for char in word if char in MORSE))
    return " / ".join(words)

def decode(morse):
    words = []
    for word in morse.split(" / "):
        words.append("".join(REVERSE[code] for code in word.split() if code in REVERSE))
    return " ".join(words)

encoded = encode("SOS")
print("Encoded:", encoded)

decoded = decode(encoded)
print("Decoded:", decoded)
```

**Make it yours:** play the code as beeps using `winsound` or a sound file.

---

## Project 22: Password Strength Checker + Generator

**What to build:** One tool that (a) scores a password's strength with reasons, and (b) generates strong random passwords.

**Build plan:**
1. Scoring: length ≥ 12, has upper, lower, digit, symbol — count the checks passed.
2. Give a verdict: Weak / Medium / Strong with the missing pieces listed.
3. Generator: sample from all character classes, guaranteeing at least one of each.
4. Demo both.

**Hint:** `secrets` module (not `random`) is the right tool for passwords.

**Solution:**

```python
import secrets
import string

def check_strength(password):
    checks = {
        "length (12+)": len(password) >= 12,
        "uppercase": any(c.isupper() for c in password),
        "lowercase": any(c.islower() for c in password),
        "digit": any(c.isdigit() for c in password),
        "symbol": any(c in "!@#$%^&*" for c in password),
    }
    passed = sum(checks.values())
    missing = [name for name, ok in checks.items() if not ok]

    if passed == 5:
        verdict = "Strong"
    elif passed >= 3:
        verdict = "Medium"
    else:
        verdict = "Weak"

    print("Verdict:", verdict, "(", passed, "/5 checks )")
    if missing:
        print("Missing:", ", ".join(missing))

def generate(length=16):
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    password = [
        secrets.choice(string.ascii_lowercase),
        secrets.choice(string.ascii_uppercase),
        secrets.choice(string.digits),
        secrets.choice("!@#$%^&*"),
    ]
    password += [secrets.choice(alphabet) for _ in range(length - 4)]
    secrets.SystemRandom().shuffle(password)
    return "".join(password)

check_strength("python123")
check_strength("Py#th0n!2026Xz")
print("Generated:", generate())
```

**Make it yours:** a "days to crack" estimate based on the character space.

---

## Project 23: Email Sender (smtplib)

**What to build:** Send an email from your Gmail account using Python's smtplib.

**Build plan:**
1. Create an app password in your Google account (Settings → Security → App passwords).
2. Build the message with `email.message.EmailMessage`.
3. Connect with `smtplib.SMTP_SSL("smtp.gmail.com", 465)`, log in, and send.

**Hint:** Never hardcode passwords in real code — use environment variables or input().

**Solution:**

```python
import smtplib
from email.message import EmailMessage

SENDER = "you@gmail.com"
APP_PASSWORD = "your-16-char-app-password"   # NOT your normal password

def send_email(to, subject, body):
    message = EmailMessage()
    message["From"] = SENDER
    message["To"] = to
    message["Subject"] = subject
    message.set_content(body)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(SENDER, APP_PASSWORD)
        server.send_message(message)
    print("Sent to", to)

# send_email("friend@example.com", "Hello from Python", "This was sent by a script!")
print("Uncomment the call above and fill in real credentials to send.")
```

**Make it yours:** attachments, HTML bodies, and sending to a list of recipients.

---

## Project 24: Local Chat App (sockets)

**What to build:** A two-program chat: `server.py` listens, `client.py` connects, and both can send messages back and forth on your local network.

**Build plan:**
1. Server: bind to `0.0.0.0:12345`, accept one client.
2. Loop: receive a message and print it, then send your reply.
3. Client: connect to `127.0.0.1:12345`, then the same send/receive loop.
4. Run the server first, then the client, in two terminals.

**Hint:** Sockets are raw pipes — you define the protocol (here: plain text lines).

**Solution:**

```python
# File: server.py — run this first
import socket

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("0.0.0.0", 12345))
server.listen(1)
print("Server listening on port 12345...")

connection, address = server.accept()
print("Client connected:", address)

while True:
    data = connection.recv(1024).decode()
    if not data or data.strip().lower() == "quit":
        print("Client disconnected")
        break
    print("Client:", data)
    reply = input("You: ")
    connection.send(reply.encode())

connection.close()
server.close()
```

```python
# File: client.py — run this second, in another terminal
import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(("127.0.0.1", 12345))
print("Connected to server.")

while True:
    message = input("You: ")
    client.send(message.encode())
    if message.strip().lower() == "quit":
        break
    reply = client.recv(1024).decode()
    print("Server:", reply)

client.close()
```

**Make it yours:** threading so both sides can send at any time, and multiple clients.

---

## Project 25: Markdown → HTML Converter

**What to build:** Convert a small Markdown file into HTML: headings, bold, italic, bullet lists, and paragraphs.

**Build plan:**
1. Read the markdown line by line.
2. Line rules: `## ` → `<h2>`, `# ` → `<h1>`, `- ` → list items, empty line → paragraph break.
3. Inline rules: `**bold**` → `<b>`, `*italic*` → `<i>`.
4. Write the result wrapped in `<html><body>...</body></html>`.

**Hint:** Process in order — block-level lines first, then inline replacements on each line.

**Solution:**

```python
MARKDOWN = """# My Title

This is a **bold** move and this is *italic*.

## Section

- first item
- second item

The end.
"""

def convert(markdown):
    html_lines = ["<html><body>"]
    in_list = False

    for line in markdown.split("\n"):
        stripped = line.strip()

        if stripped.startswith("## "):
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append("<h2>" + stripped[3:] + "</h2>")
        elif stripped.startswith("# "):
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append("<h1>" + stripped[2:] + "</h1>")
        elif stripped.startswith("- "):
            if not in_list:
                html_lines.append("<ul>")
                in_list = True
            html_lines.append("<li>" + stripped[2:] + "</li>")
        elif stripped == "":
            if in_list:
                html_lines.append("</ul>")
                in_list = False
        else:
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append("<p>" + stripped + "</p>")

    if in_list:
        html_lines.append("</ul>")
    html_lines.append("</body></html>")

    html = "\n".join(html_lines)

    # Inline replacements
    html = html.replace("**", "<b>", 1)
    while "**" in html:
        html = html.replace("**", "</b>", 1)
        if "**" in html:
            html = html.replace("**", "<b>", 1)
    html = html.replace("*", "<i>", 1)
    while "*" in html:
        html = html.replace("*", "</i>", 1)
        if "*" in html:
            html = html.replace("*", "<i>", 1)

    return html

result = convert(MARKDOWN)
print(result)

with open("output.html", "w") as f:
    f.write(result)
print("\nSaved to output.html")
```

**Make it yours:** support links, code blocks, and numbered lists.

---

## Project 26: Wordle Clone

**What to build:** The word-guessing game: 6 tries to guess a 5-letter word, with per-letter feedback (green = right place, yellow = in word, gray = absent).

**Build plan:**
1. A word list; pick a random secret.
2. Each guess must be a 5-letter word from the list.
3. Feedback loop: exact matches first, then count remaining letters for yellows.
4. Win if guessed; lose after 6 tries revealing the word.

**Hint:** Feedback needs two passes — mark greens first so yellows don't double-count.

**Solution:**

```python
import random

WORDS = ["apple", "grape", "mango", "peach", "plumb", "berry", "lemon", "melon"]

secret = random.choice(WORDS)

print("Guess the 5-letter word. 6 tries. G = correct spot, Y = in word, . = absent")

for attempt in range(1, 7):
    guess = input("Guess " + str(attempt) + "/6: ").strip().lower()

    if len(guess) != 5 or not guess.isalpha():
        print("Must be a 5-letter word.")
        continue

    if guess == secret:
        print("GGGGG — You win!")
        break

    # Feedback: mark exact matches first
    feedback = ["."] * 5
    remaining = list(secret)
    for i in range(5):
        if guess[i] == secret[i]:
            feedback[i] = "G"
            remaining[i] = None
    for i in range(5):
        if feedback[i] == "." and guess[i] in remaining:
            feedback[i] = "Y"
            remaining[remaining.index(guess[i])] = None

    print("".join(feedback))
else:
    print("Out of tries! The word was", secret)
```

**Make it yours:** colored output with ANSI codes and a bigger word list from a file.

---

## Project 27: Library Management with SQLite

**What to build:** A library system with books (title, author), members, and issue/return tracking — all in SQLite.

**Build plan:**
1. Tables: `books` (id, title, author, available), `members` (id, name), `loans` (id, book_id, member_id).
2. Add books and members.
3. Issue: check availability, insert a loan, mark the book unavailable.
4. Return: delete the loan, mark the book available.
5. Reports: all books with status, all loans.

**Hint:** A loan is a JOIN table connecting books and members — relational design in miniature.

**Solution:**

```python
import sqlite3

def connect():
    conn = sqlite3.connect("library.db")
    conn.execute("""CREATE TABLE IF NOT EXISTS books
                    (id INTEGER PRIMARY KEY, title TEXT, author TEXT, available INTEGER DEFAULT 1)""")
    conn.execute("""CREATE TABLE IF NOT EXISTS members
                    (id INTEGER PRIMARY KEY, name TEXT)""")
    conn.execute("""CREATE TABLE IF NOT EXISTS loans
                    (id INTEGER PRIMARY KEY, book_id INTEGER, member_id INTEGER)""")
    return conn

def add_book(title, author):
    conn = connect()
    conn.execute("INSERT INTO books (title, author) VALUES (?, ?)", (title, author))
    conn.commit()
    conn.close()
    print("Book added.")

def add_member(name):
    conn = connect()
    conn.execute("INSERT INTO members (name) VALUES (?)", (name,))
    conn.commit()
    conn.close()
    print("Member added.")

def issue_book(book_id, member_id):
    conn = connect()
    book = conn.execute("SELECT available FROM books WHERE id = ?", (book_id,)).fetchone()
    if book and book[0] == 1:
        conn.execute("INSERT INTO loans (book_id, member_id) VALUES (?, ?)", (book_id, member_id))
        conn.execute("UPDATE books SET available = 0 WHERE id = ?", (book_id,))
        conn.commit()
        print("Issued.")
    else:
        print("Book not available or not found.")
    conn.close()

def return_book(book_id):
    conn = connect()
    conn.execute("DELETE FROM loans WHERE book_id = ?", (book_id,))
    conn.execute("UPDATE books SET available = 1 WHERE id = ?", (book_id,))
    conn.commit()
    conn.close()
    print("Returned.")

def report():
    conn = connect()
    rows = conn.execute("SELECT id, title, author, available FROM books").fetchall()
    conn.close()
    for book_id, title, author, available in rows:
        status = "Available" if available else "Issued"
        print(book_id, "|", title, "by", author, "|", status)

while True:
    print("\n1. Add book  2. Add member  3. Issue  4. Return  5. Report  6. Quit")
    choice = input("Choose: ")

    if choice == "1":
        add_book(input("Title: "), input("Author: "))
    elif choice == "2":
        add_member(input("Member name: "))
    elif choice == "3":
        issue_book(int(input("Book id: ")), int(input("Member id: ")))
    elif choice == "4":
        return_book(int(input("Book id: ")))
    elif choice == "5":
        report()
    elif choice == "6":
        print("Bye!")
        break
```

**Make it yours:** due dates, overdue fines, and search by author.

---

## Project 28: Habit Tracker with Streaks

**What to build:** Track daily habits and compute your current streak for each. Data persists in a JSON file.

**Build plan:**
1. Store habits as `{habit: [list of YYYY-MM-DD dates]}` in `habits.json`.
2. `add_habit`, `check_in` (append today), `remove_habit`.
3. Streak = count consecutive days ending today (walk backwards from today).
4. Report shows each habit, its streak, and total check-ins.

**Hint:** The streak algorithm: start from today, while the date is in the list, count and go back one day.

**Solution:**

```python
import json
import os
import datetime

FILE = "habits.json"

def load():
    if os.path.exists(FILE):
        with open(FILE, "r") as f:
            return json.load(f)
    return {}

def save(habits):
    with open(FILE, "w") as f:
        json.dump(habits, f, indent=2)

def streak(dates):
    if not dates:
        return 0
    date_set = set(dates)
    today = datetime.date.today()
    count = 0
    while today.strftime("%Y-%m-%d") in date_set:
        count += 1
        today -= datetime.timedelta(days=1)
    return count

habits = load()

while True:
    print("\n1. Add habit  2. Check in  3. Remove  4. Report  5. Quit")
    choice = input("Choose: ")

    if choice == "1":
        habits[input("Habit name: ")] = []
        save(habits)
    elif choice == "2":
        name = input("Habit: ")
        if name in habits:
            today = datetime.date.today().strftime("%Y-%m-%d")
            if today not in habits[name]:
                habits[name].append(today)
            save(habits)
            print("Checked in!")
        else:
            print("Habit not found")
    elif choice == "3":
        habits.pop(input("Habit: "), None)
        save(habits)
    elif choice == "4":
        for name, dates in habits.items():
            print(name, "- streak:", streak(dates), "| total:", len(dates))
    elif choice == "5":
        print("Bye!")
        break
```

**Make it yours:** weekly view as a 7-cell grid, and "best streak ever".

---

## Project 29: Stock Portfolio Tracker (OOP + CSV)

**What to build:** Track a portfolio of stocks: buy/sell shares, compute current value and profit/loss per holding, and persist to CSV.

**Build plan:**
1. `Stock` class: symbol, quantity, average buy price.
2. `Portfolio` class: list of stocks, `buy()`, `sell()`, `value()` (quantity × current price), `save()`/`load()` with CSV.
3. Current prices: a small dict of sample prices.
4. Report shows each holding and the totals.

**Hint:** Average buy price updates on every buy: (old_qty×old_price + new_qty×new_price) / total_qty.

**Solution:**

```python
import csv
import os

FILE = "portfolio.csv"

PRICES = {"AAPL": 220.0, "GOOG": 180.0, "TSLA": 250.0, "MSFT": 420.0}

class Stock:
    def __init__(self, symbol, quantity, avg_price):
        self.symbol = symbol
        self.quantity = quantity
        self.avg_price = avg_price

    def value(self):
        return self.quantity * PRICES.get(self.symbol, self.avg_price)

    def profit(self):
        return self.value() - self.quantity * self.avg_price

class Portfolio:
    def __init__(self):
        self.stocks = []

    def buy(self, symbol, quantity, price):
        for stock in self.stocks:
            if stock.symbol == symbol:
                total_qty = stock.quantity + quantity
                stock.avg_price = (stock.quantity * stock.avg_price + quantity * price) / total_qty
                stock.quantity = total_qty
                return
        self.stocks.append(Stock(symbol, quantity, price))

    def sell(self, symbol, quantity):
        for stock in self.stocks:
            if stock.symbol == symbol:
                if quantity > stock.quantity:
                    print("Not enough shares")
                else:
                    stock.quantity -= quantity
                    if stock.quantity == 0:
                        self.stocks.remove(stock)
                return
        print("Stock not in portfolio")

    def save(self):
        with open(FILE, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["symbol", "quantity", "avg_price"])
            for stock in self.stocks:
                writer.writerow([stock.symbol, stock.quantity, round(stock.avg_price, 2)])

    def load(self):
        self.stocks = []
        if os.path.exists(FILE):
            with open(FILE, "r") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    self.stocks.append(Stock(row["symbol"], int(row["quantity"]), float(row["avg_price"])))

    def report(self):
        total_value = 0
        for stock in self.stocks:
            print(stock.symbol, "| shares:", stock.quantity,
                  "| value:", round(stock.value(), 2),
                  "| P/L:", round(stock.profit(), 2))
            total_value += stock.value()
        print("Total portfolio value:", round(total_value, 2))

portfolio = Portfolio()
portfolio.buy("AAPL", 10, 200.0)
portfolio.buy("TSLA", 5, 240.0)
portfolio.buy("AAPL", 5, 210.0)   # average price updates
portfolio.sell("TSLA", 2)

portfolio.save()

loaded = Portfolio()
loaded.load()
print("Reloaded from CSV:")
loaded.report()
```

**Make it yours:** fetch live prices from an API and add dividends.

---

## Project 30: Recipe Book (JSON persistence)

**What to build:** Store recipes (name, ingredients, steps, category), search them, and persist everything in a JSON file.

**Build plan:**
1. Each recipe is a dict; the book is a dict keyed by recipe name (or a list).
2. `add`, `search` (by name or category), `list_all`, and `delete`.
3. Load at startup, save after every change.
4. Demo: add two recipes, save, reload, and search.

**Hint:** Search = filter over the recipes list with `in` checks.

**Solution:**

```python
import json
import os

FILE = "recipes.json"

def load():
    if os.path.exists(FILE):
        with open(FILE, "r") as f:
            return json.load(f)
    return []

def save(recipes):
    with open(FILE, "w") as f:
        json.dump(recipes, f, indent=2)

def add(recipes, name, ingredients, steps, category):
    recipes.append({
        "name": name,
        "ingredients": ingredients,
        "steps": steps,
        "category": category,
    })
    save(recipes)

def search(recipes, query):
    query = query.lower()
    return [r for r in recipes
            if query in r["name"].lower()
            or query in r["category"].lower()
            or any(query in ing.lower() for ing in r["ingredients"])]

recipes = load()

add(recipes,
    "Pasta Alfredo",
    ["pasta", "cream", "cheese", "garlic"],
    ["Boil pasta", "Mix cream and cheese", "Serve hot"],
    "Italian")

add(recipes,
    "Mango Lassi",
    ["mango", "yogurt", "sugar", "ice"],
    ["Blend everything", "Serve chilled"],
    "Drinks")

results = search(recipes, "pasta")
print("Search results for 'pasta':")
for recipe in results:
    print(" -", recipe["name"], "|", recipe["category"])
    print("   Ingredients:", ", ".join(recipe["ingredients"]))

print("\nAll categories:", sorted({r["category"] for r in recipes}))

reloaded = load()
print("Reloaded from JSON:", len(reloaded), "recipes")
```

**Make it yours:** a menu interface, ratings, and "what can I cook with these ingredients".

---

## Advanced projects recap

| # | Project | Key skill |
|---|---------|-----------|
| 1–2, 27 | To-Do / Expenses / Library | **SQLite** — real databases |
| 3 | Password manager | **hashlib** — security thinking |
| 4 | Tic-tac-toe AI | **minimax** — game theory |
| 5 | Sudoku solver | **backtracking** — algorithmic thinking |
| 6–9 | Snake, Hangman, Calculator, Clock | **GUI** — turtle & tkinter |
| 10 | Text adventure | **state machines** |
| 11, 29 | Bank, Portfolio | **OOP + persistence** |
| 12 | Student system | **CSV** |
| 13–14, 18 | Weather, Currency, Scraper | **APIs & networking** |
| 15–17 | Organizer, Duplicates, Backup | **os/shutil/zipfile** — file mastery |
| 19 | Chatbot | **rule systems** |
| 20, 30 | Quiz, Recipe book | **JSON + data-driven design** |
| 21 | Morse translator | **mapping tables** |
| 22 | Password tools | **secrets + validation** |
| 23–24 | Email, Chat | **smtplib & sockets** |
| 25 | Markdown converter | **parsing** |
| 26 | Wordle | **feedback algorithms** |
| 28 | Habit tracker | **date math + streaks** |

**After these 30:** you can build anything. The last step is your own idea — take one of these skeletons, change the data, and make it yours.
