# Module 1: Getting Started with Python

## What is Python?

**Python** is a high-level, interpreted, general-purpose programming language. It was created by Guido van Rossum and first released in 1991. It is one of the most beginner-friendly languages because its syntax is very close to plain English.

### Why is Python so popular?

- **Easy to read and write**: Python code looks clean and simple.
- **Huge community**: You can find help, tutorials, and libraries for almost anything.
- **Used everywhere**: Web development, data science, AI/ML, automation, game development, scripting, and more.
- **Lots of libraries**: You can use built-in and third-party libraries to avoid reinventing the wheel.
- **Cross-platform**: Python works on Windows, macOS, and Linux.

### Example: Python vs other languages

Printing "Hello, World!" in Python:

```python
print("Hello, World!")
```

In Java:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

Python is much shorter and simpler for the same task.

---

## Installing Python and Setting Up the IDE

### Step 1: Download Python

1. Go to [python.org/downloads](https://www.python.org/downloads/).
2. Download the latest stable Python 3 version (prefer 3.10 or above).
3. During installation:
    - **Windows**: Check the box **"Add Python to PATH"** before clicking Install.
    - **Mac**: Follow the installer instructions.

### Step 2: Verify Installation

Open your terminal/command prompt and type:

```bash
python --version
```

or on some systems:

```bash
python3 --version
```

Expected output:

```
Python 3.12.0
```

### Step 3: Choose an IDE (Integrated Development Environment)

An IDE is a tool where you write, run, and debug code.

| IDE | Best For | Features |
| --- | --- | --- |
| **VS Code** | Beginners, all-round | Lightweight, free, huge extensions |
| **PyCharm** | Heavy Python development | Powerful debugging, code completion |
| **Jupyter Notebook** | Data Science | Run code in small blocks, see outputs inline |

For beginners, **VS Code** is recommended. Install the official Python extension from Microsoft.

### Step 4: Install pip (usually comes with Python)

`pip` is Python's package manager. It lets you install third-party libraries.

```bash
pip --version
```

Install a library:

```bash
pip install requests
```

---

## Writing Your First Python Program

Create a file named `hello.py` and write:

```python
print("Hello, World!")
```

Run it:

```bash
python hello.py
```

Output:

```
Hello, World!
```

### How `print()` works

`print()` is a built-in function. It shows output on the screen. You pass the value you want to display inside the parentheses.

```python
print(10)           # prints number 10
print(3.14)         # prints float
print(True)         # prints True
print("Python")     # prints Python
```

---

## Understanding the Python Interpreter

Python is an **interpreted language**. This means the Python interpreter reads and executes your code one line at a time, instead of compiling the whole program first.

### Two ways to run Python code

#### 1. Interactive Mode (REPL — Read, Evaluate, Print, Loop)

Open the terminal and type `python` or `python3`. You get a prompt `>>>` where you can type code line by line and immediately see results.

```python
>>> 2 + 3
5
>>> print("Hello")
Hello
>>> exit()
```

Good for quick experiments and calculations.

#### 2. Script Mode

Write the full program in a file (e.g., `program.py`) and run it:

```bash
python program.py
```

Good for real projects and saving your work.

### Example of a script

```python
# program.py
name = "Mahesh"
print("Hello, " + name)
```

Run:

```bash
python program.py
```

Output:

```
Hello, Mahesh
```

---

## Python Syntax and Indentation Rules

Python does **not** use curly braces `{}` or semicolons `;` like many other languages. Instead, it uses **indentation** (whitespace) to define blocks of code.

### Rules of indentation

1. Use **4 spaces** per indentation level (PEP 8 standard).
2. Never mix tabs and spaces.
3. All lines in the same block must have the same indentation.

### Example of correct indentation

```python
if 5 > 3:
    print("5 is greater than 3")
    print("This is inside the if block")
print("This is outside the if block")
```

Output:

```
5 is greater than 3
This is inside the if block
This is outside the if block
```

### Example of incorrect indentation

```python
if 5 > 3:
print("This will cause an error")
```

Error:

```
IndentationError: expected an indented block
```

---

## Comments in Python

Comments are lines that are ignored by the interpreter. They help explain your code.

### Single-line comment

Use `#` for comments that fit on one line.

```python
# This is a single-line comment
x = 10  # this is also a comment
```

### Multi-line comment

You can use triple quotes `"""` or `'''` for longer comments. These are technically multi-line strings, but if not assigned to a variable, Python ignores them.

```python
"""
This is a multi-line comment.
It can span multiple lines.
Use it to explain larger sections of code.
"""

x = 10
```

### Multi-line string stored in a variable

```python
message = """This is a
multi-line string"""
print(message)
```

Output:

```
This is a
multi-line string
```

### Good commenting practices

- Don't write what the code does if it's obvious. Write **why** it does it.
- Keep comments short and meaningful.
- Update comments when you change code.
