# Module 10: Modules & Packages

## What is a Module?

A **module** is simply a Python file (`.py`) containing functions, variables, and classes that you can reuse in other files.

Instead of writing everything in one giant file, you split your code into logical modules and import what you need.

### Why use modules?

- **Organisation**: Related code stays together in one file.
- **Reusability**: Write once, import into many projects.
- **Namespace separation**: `math.sqrt` and `my_module.sqrt` can coexist.
- **Easier maintenance**: Small files are easier to read and fix.

### Creating your own module

Create a file called `calculator.py`:

```python
# calculator.py

PI = 3.14159

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    return a / b
```

Now use it in another file, `main.py`, in the same folder:

```python
# main.py
import calculator

print(calculator.add(10, 5))        # 15
print(calculator.multiply(4, 3))    # 12
print(calculator.PI)                # 3.14159
```

---

## Ways to Import

### 1. `import module`

Imports the whole module. You must use the module name as a prefix.

```python
import math

print(math.sqrt(16))    # 4.0
print(math.pi)          # 3.141592653589793
```

### 2. `import module as alias`

Gives the module a shorter nickname.

```python
import math as m

print(m.sqrt(25))       # 5.0
```

Very common in data science:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

### 3. `from module import name`

Imports specific items directly — no prefix needed.

```python
from math import sqrt, pi

print(sqrt(36))    # 6.0
print(pi)          # 3.141592653589793
```

### 4. `from module import name as alias`

```python
from math import sqrt as square_root

print(square_root(49))   # 7.0
```

### 5. `from module import *` (not recommended)

Imports everything into your namespace.

```python
from math import *

print(sqrt(64))   # 8.0
```

> ⚠️ Avoid `import *`. It pollutes your namespace and can silently overwrite your own variables and functions. You also lose track of where a name came from.
>

### Comparison

| Style | Prefix needed? | Best for |
| --- | --- | --- |
| `import math` | Yes — `math.sqrt()` | Clear, safe, default choice |
| `import math as m` | Yes — `m.sqrt()` | Long module names |
| `from math import sqrt` | No — `sqrt()` | When you need 1–3 specific items |
| `from math import *` | No | Avoid it |

---

## Built-in Modules You Should Know

Python ships with a huge **standard library** — modules that are already installed.

### `math` — mathematical functions

```python
import math

print(math.sqrt(16))        # 4.0
print(math.pow(2, 3))       # 8.0
print(math.floor(4.7))      # 4
print(math.ceil(4.2))       # 5
print(math.factorial(5))    # 120
print(math.pi)              # 3.141592653589793
print(math.e)               # 2.718281828459045
print(math.gcd(12, 18))     # 6
print(math.fabs(-10))       # 10.0
```

### `random` — random numbers

```python
import random

print(random.random())              # random float between 0.0 and 1.0
print(random.randint(1, 10))        # random int from 1 to 10 (both included)
print(random.randrange(0, 10, 2))   # random even number below 10
print(random.uniform(1, 5))         # random float between 1 and 5

colors = ["red", "green", "blue", "yellow"]
print(random.choice(colors))        # one random item
print(random.sample(colors, 2))     # two unique random items

random.shuffle(colors)              # shuffles the list in place
print(colors)
```

### `datetime` — dates and times

```python
import datetime

now = datetime.datetime.now()
print(now)                          # 2026-07-27 14:30:45.123456

today = datetime.date.today()
print(today)                        # 2026-07-27

print(now.year)                     # 2026
print(now.month)                    # 7
print(now.day)                      # 27
print(now.hour)                     # 14

# Formatting a date
print(now.strftime("%d-%m-%Y"))        # 27-07-2026
print(now.strftime("%d %B %Y"))        # 27 July 2026
print(now.strftime("%H:%M:%S"))        # 14:30:45

# Parsing a string into a date
d = datetime.datetime.strptime("15-08-2025", "%d-%m-%Y")
print(d)                               # 2025-08-15 00:00:00

# Date arithmetic
tomorrow = today + datetime.timedelta(days=1)
print(tomorrow)

next_week = today + datetime.timedelta(weeks=1)
print(next_week)
```

Common `strftime` codes:

| Code | Meaning | Example |
| --- | --- | --- |
| `%d` | Day (2 digits) | `27` |
| `%m` | Month (2 digits) | `07` |
| `%Y` | Year (4 digits) | `2026` |
| `%y` | Year (2 digits) | `26` |
| `%B` | Month name | `July` |
| `%A` | Weekday name | `Monday` |
| `%H` | Hour (24-hour) | `14` |
| `%M` | Minute | `30` |
| `%S` | Second | `45` |

### `os` — operating system operations

```python
import os

print(os.getcwd())                  # current working directory
print(os.listdir())                 # list files in current folder

os.mkdir("new_folder")              # create a folder
os.rename("old.txt", "new.txt")     # rename a file
os.remove("unwanted.txt")           # delete a file

print(os.path.exists("data.txt"))   # True or False
print(os.path.join("folder", "file.txt"))   # folder/file.txt
print(os.path.basename("/home/user/file.txt"))   # file.txt
print(os.path.splitext("report.pdf"))            # ('report', '.pdf')

print(os.name)                      # 'posix' on Linux/Mac, 'nt' on Windows
```

### `sys` — interpreter and system info

```python
import sys

print(sys.version)              # Python version
print(sys.platform)             # 'win32', 'linux', 'darwin'
print(sys.path)                 # where Python looks for modules
print(sys.argv)                 # command-line arguments

sys.exit()                      # stop the program
```

Command-line arguments example — save as `script.py`:

```python
import sys

print("Script name:", sys.argv[0])
print("Arguments:", sys.argv[1:])
```

Run it:

```bash
python script.py hello 123
```

Output:

```
Script name: script.py
Arguments: ['hello', '123']
```

### `time` — timing and delays

```python
import time

print(time.time())              # seconds since 1 January 1970

start = time.time()
time.sleep(2)                   # pause for 2 seconds
end = time.time()
print(f"Took {end - start:.2f} seconds")

print(time.ctime())             # readable current time
```

### `json` — read and write JSON

```python
import json

data = {"name": "Mahesh", "age": 25, "skills": ["Python", "SQL"]}

# Python object → JSON string
json_string = json.dumps(data)
print(json_string)

# Pretty printed
print(json.dumps(data, indent=4))

# JSON string → Python object
parsed = json.loads(json_string)
print(parsed["name"])           # Mahesh
```

### `statistics` — basic statistics

```python
import statistics

marks = [85, 92, 78, 90, 85]

print(statistics.mean(marks))     # 86
print(statistics.median(marks))   # 85
print(statistics.mode(marks))     # 85
print(statistics.stdev(marks))    # 5.431390245600108
```

### Standard library quick list

| Module | Use for |
| --- | --- |
| `math` | Maths functions |
| `random` | Random numbers and choices |
| `datetime` | Dates and times |
| `os` | Files, folders, environment |
| `sys` | Interpreter and CLI arguments |
| `time` | Delays and timing |
| `json` | JSON data |
| `re` | Regular expressions |
| `collections` | `Counter`, `defaultdict`, `deque` |
| `statistics` | Mean, median, mode |
| `csv` | Reading/writing CSV files |
| `pathlib` | Modern file path handling |

---

## The `dir()` and `help()` Functions

Use these to explore any module without leaving Python.

```python
import math

print(dir(math))     # list every name inside the math module
help(math.sqrt)      # documentation for one function
help(math)           # documentation for the whole module
```

---

## The `__name__` Variable and `__main__`

Every Python file has a built-in variable called `__name__`.

- When you **run** a file directly, `__name__` is `"__main__"`.
- When you **import** it, `__name__` is the module's name.

### Demonstration

`mymodule.py`:

```python
# mymodule.py
def greet():
    print("Hello from mymodule")

print("__name__ is:", __name__)
```

Running it directly:

```bash
python mymodule.py
```

```
__name__ is: __main__
```

Importing it from another file:

```python
import mymodule
```

```
__name__ is: mymodule
```

### Why this matters

Without protection, test code runs every time someone imports your module:

```python
# calculator.py
def add(a, b):
    return a + b

print(add(2, 3))     # ❌ runs even when imported
```

The fix — the standard `if __name__ == "__main__":` guard:

```python
# calculator.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

if __name__ == "__main__":
    # This block runs ONLY when calculator.py is run directly
    print("Testing calculator...")
    print(add(2, 3))         # 5
    print(subtract(9, 4))    # 5
```

Now importing is clean:

```python
import calculator
print(calculator.add(10, 20))   # 30, and no test output
```

> 💡 Put this guard in every module you write. It separates "library code" from "script code".
>

---

## What is a Package?

A **package** is a folder containing multiple modules. It lets you organise a big project into a tree of files.

### Package structure

```
myproject/
│
├── main.py
│
└── mypackage/
    ├── __init__.py
    ├── math_utils.py
    └── string_utils.py
```

The `__init__.py` file marks the folder as a package. It can be empty. (From Python 3.3+ it is technically optional, but including it is still the safe, standard practice.)

### Building the package

`mypackage/math_utils.py`:

```python
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b
```

`mypackage/string_utils.py`:

```python
def to_upper(text):
    return text.upper()

def reverse(text):
    return text[::-1]
```

`mypackage/__init__.py`:

```python
# can be empty, or expose things for convenience
from .math_utils import add, multiply
from .string_utils import to_upper, reverse
```

### Using the package

`main.py`:

```python
# Option 1: import a module from the package
from mypackage import math_utils
print(math_utils.add(5, 3))          # 8

# Option 2: import a specific function
from mypackage.string_utils import reverse
print(reverse("Python"))             # nohtyP

# Option 3: works because of __init__.py
from mypackage import add
print(add(10, 20))                   # 30
```

### Sub-packages

Packages can be nested as deeply as you need:

```
myproject/
└── mypackage/
    ├── __init__.py
    ├── math_utils.py
    └── data/
        ├── __init__.py
        └── loader.py
```

```python
from mypackage.data.loader import load_file
```

### Module vs Package

| Module | Package |
| --- | --- |
| A single `.py` file | A folder of modules |
| `calculator.py` | `mypackage/` |
| `import calculator` | `import mypackage.calculator` |
| Small, focused | Groups related modules |

---

## Installing Third-Party Packages with pip

`pip` is Python's package installer. It downloads packages from **PyPI** (Python Package Index) at [pypi.org](https://pypi.org).

### Common pip commands

```bash
pip install requests              # install a package
pip install requests==2.28.0      # install a specific version
pip install --upgrade requests    # upgrade to the latest version
pip uninstall requests            # remove a package
pip list                          # list installed packages
pip show requests                 # details about one package
pip freeze                        # list with exact versions
```

### `requirements.txt`

Save your project's dependencies so anyone can recreate your environment.

```bash
pip freeze > requirements.txt
```

The file looks like this:

```
requests==2.31.0
numpy==1.26.0
pandas==2.1.0
```

Install everything from it:

```bash
pip install -r requirements.txt
```

### Useful third-party packages

| Package | Use for |
| --- | --- |
| `requests` | HTTP requests / calling APIs |
| `numpy` | Numerical arrays and maths |
| `pandas` | Data analysis with tables |
| `matplotlib` | Charts and plots |
| `flask` / `django` | Web development |
| `beautifulsoup4` | Web scraping |
| `pillow` | Image processing |
| `openpyxl` | Excel files |

### Example: using `requests`

```bash
pip install requests
```

```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)    # 200
print(response.json())         # response as a Python dictionary
```

---

## Virtual Environments

A **virtual environment** is an isolated Python setup for one project. Different projects can then use different package versions without clashing.

### Why you need them

Imagine Project A needs `numpy 1.20` and Project B needs `numpy 1.26`. Installing globally means one project breaks. Virtual environments solve this completely.

### Creating and using one

```bash
# Create a virtual environment named 'venv'
python -m venv venv
```

Activate it:

```bash
# Windows
venv\Scripts\activate

# Mac / Linux
source venv/bin/activate
```

Your prompt changes to show it is active:

```
(venv) C:\myproject>
```

Now install packages — they go only into this project:

```bash
pip install requests numpy
```

Deactivate when you are done:

```bash
deactivate
```

> 💡 Create a virtual environment for **every** new project. It is a one-line command and saves hours of dependency pain later.
>

---

## How Python Finds Modules

When you write `import mymodule`, Python searches in this order:

1. The current directory of the running script.
2. The directories listed in the `PYTHONPATH` environment variable.
3. The standard library directories.
4. The `site-packages` folder (where pip installs things).

You can see the full search path:

```python
import sys

for path in sys.path:
    print(path)
```

You can also add a folder at runtime:

```python
import sys
sys.path.append("/path/to/my/modules")

import my_custom_module
```

---

## Common Mistakes with Modules

### 1. Naming your file the same as a standard module

```python
# You create a file named random.py
import random
print(random.randint(1, 10))   # ❌ AttributeError
```

Python imports **your** `random.py` instead of the real one. Never name files `math.py`, `random.py`, `json.py`, `os.py`, etc.

### 2. Circular imports

```python
# a.py
import b

# b.py
import a      # ❌ ImportError — they import each other endlessly
```

Fix by moving shared code into a third module, or by importing inside the function that needs it.

### 3. Forgetting the module prefix

```python
import math

print(sqrt(16))        # ❌ NameError
print(math.sqrt(16))   # ✅ 4.0
```

### 4. Leaving out `__init__.py` in older setups

If your package will not import, add an empty `__init__.py` to the folder.

### 5. Forgetting to activate the virtual environment

```bash
pip install requests    # goes to the global Python, not your project
```

Always activate first, then install.

---

## Quick Reference

| Task | Command / Syntax |
| --- | --- |
| Import a module | `import math` |
| Import with alias | `import numpy as np` |
| Import one item | `from math import sqrt` |
| Import everything | `from math import *` (avoid) |
| Explore a module | `dir(math)`, `help(math)` |
| Script guard | `if __name__ == "__main__":` |
| Install a package | `pip install requests` |
| List packages | `pip list` |
| Save dependencies | `pip freeze > requirements.txt` |
| Install dependencies | `pip install -r requirements.txt` |
| Create virtual env | `python -m venv venv` |
| Activate (Windows) | `venv\Scripts\activate` |
| Activate (Mac/Linux) | `source venv/bin/activate` |
| Deactivate | `deactivate` |
