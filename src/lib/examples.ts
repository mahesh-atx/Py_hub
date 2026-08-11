import type { PyNode } from "@/types/filesystem";
import { genId } from "@/lib/filesystem/tree";

export interface ExampleFile {
  name: string;
  description: string;
  code: string;
}

export const EXAMPLE_FILES: ExampleFile[] = [
  {
    name: "hello.py",
    description: "Your very first Python program",
    code: `# Welcome to the browser Python IDE!
print("Hello, World!")

name = "Python"
print(f"Learning {name} is fun.")
`,
  },
  {
    name: "input.py",
    description: "Reading input with input()",
    code: `name = input("Enter your name: ")
age = int(input("Enter your age: "))

print(f"Hello {name}!")
print(f"You are {age} years old.")
`,
  },
  {
    name: "student_details.py",
    description: "Interactive form (acceptance test)",
    code: `print("=== Student Details ===")

name = input("Enter your name: ")
age = int(input("Enter your age: "))
marks = float(input("Enter your marks: "))

print()
print("=== Result ===")
print("Name:", name)
print("Age:", age)
print("Marks:", marks)

if marks >= 40:
    print("Status: Pass")
else:
    print("Status: Fail")
`,
  },
  {
    name: "calculator.py",
    description: "A simple arithmetic calculator",
    code: `a = float(input("First number: "))
op = input("Operation (+ - * /): ")
b = float(input("Second number: "))

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
    print("Unknown operation")
`,
  },
  {
    name: "conditions.py",
    description: "if / elif / else",
    code: `score = 73

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print("Score:", score, "Grade:", grade)
`,
  },
  {
    name: "loops.py",
    description: "for and while loops",
    code: `# Counting
for i in range(1, 6):
    print(i)

print("---")

# Sum 1..10
total = 0
n = 1
while n <= 10:
    total += n
    n += 1
print("Sum 1..10 =", total)
`,
  },
  {
    name: "functions.py",
    description: "Defining and calling functions",
    code: `def add(a, b):
    return a + b

def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(add(2, 3))
print(greet("Mahesh"))
print(greet("Solapur", greeting="Welcome"))
`,
  },
  {
    name: "lists.py",
    description: "Working with lists",
    code: `numbers = [5, 2, 8, 1, 9, 3]

print("Original:", numbers)
numbers.append(7)
numbers.sort()
print("Sorted:  ", numbers)
print("Sum:", sum(numbers), "Max:", max(numbers), "Min:", min(numbers))

# List comprehension
squares = [n * n for n in numbers]
print("Squares:", squares)
`,
  },
  {
    name: "dictionaries.py",
    description: "Key/value dictionaries",
    code: `student = {
    "name": "Mahesh",
    "age": 24,
    "city": "Solapur",
}

for key, value in student.items():
    print(f"{key}: {value}")

student["marks"] = 85.5
print("Updated:", student)
`,
  },
  {
    name: "file_handling.py",
    description: "Read/write the virtual filesystem",
    code: `# Write a file in the project, then read it back
with open("data.txt", "w") as f:
    f.write("Hello from a file!\\n")
    f.write("The file appears in the explorer after running.\\n")

with open("data.txt") as f:
    print(f.read())
`,
  },
  {
    name: "exceptions.py",
    description: "try / except error handling",
    code: `def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Cannot divide by zero"
    except TypeError:
        return "Invalid types"

print(divide(10, 2))
print(divide(10, 0))
`,
  },
  {
    name: "classes.py",
    description: "Object-oriented programming",
    code: `class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return f"{self.name} says Woof!"

d = Dog("Rex")
print(d.bark())
`,
  },
  {
    name: "numpy_demo.py",
    description: "Requires the numpy package",
    code: `# Install numpy from the Packages panel first
import numpy as np

arr = np.array([1, 2, 3, 4])
print("Array:", arr)
print("Mean :", arr.mean())
print("Doubled:", arr * 2)
`,
  },
  {
    name: "matplotlib_demo.py",
    description: "Plotting (requires matplotlib)",
    code: `# Install matplotlib from the Packages panel first
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]

plt.plot(x, y, marker="o")
plt.title("y = x squared")
plt.xlabel("x")
plt.ylabel("y")
plt.show()
`,
  },
  {
    name: "notebook_demo.ipynb",
    description: "Jupyter Notebook demo",
    code: `{
  "cells": [
    {
      "cell_type": "markdown",
      "source": [
        "# Jupyter Notebook Support\\n",
        "You can write markdown cells to document your code."
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "import math\\n",
        "print('Pi is roughly', math.pi)"
      ]
    },
    {
      "cell_type": "markdown",
      "source": [
        "## Plotting\\n",
        "You can even render Matplotlib plots directly into the PLOTS panel!"
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "# Make sure you install matplotlib from the Packages panel first!\\n",
        "import matplotlib.pyplot as plt\\n",
        "plt.plot([1, 2, 3], [1, 4, 9])\\n",
        "plt.title('Sample Notebook Plot')\\n",
        "plt.show()"
      ]
    }
  ]
}`,
  },
  {
    name: "data_science_demo.ipynb",
    description: "Advanced data visualization",
    code: `{
  "cells": [
    {
      "cell_type": "markdown",
      "source": [
        "# Data Science with Python\\n",
        "This notebook demonstrates using **numpy** and **matplotlib** together. First, ensure you have both installed from the Packages panel."
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "import numpy as np\\n",
        "import matplotlib.pyplot as plt\\n",
        "\\n",
        "x = np.linspace(0, 10, 100)\\n",
        "y1 = np.sin(x)\\n",
        "y2 = np.cos(x)\\n",
        "\\n",
        "plt.figure(figsize=(8, 4))\\n",
        "plt.plot(x, y1, label='sin(x)', color='blue')\\n",
        "plt.plot(x, y2, label='cos(x)', color='orange', linestyle='--')\\n",
        "plt.title('Sine and Cosine Waves')\\n",
        "plt.legend()\\n",
        "plt.show()"
      ]
    },
    {
      "cell_type": "markdown",
      "source": [
        "## Scatter Plots\\n",
        "You can also create scatter plots with random data."
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "N = 50\\n",
        "x_rand = np.random.rand(N)\\n",
        "y_rand = np.random.rand(N)\\n",
        "colors = np.random.rand(N)\\n",
        "area = (30 * np.random.rand(N))**2  # 0 to 15 point radii\\n",
        "\\n",
        "plt.scatter(x_rand, y_rand, s=area, c=colors, alpha=0.5)\\n",
        "plt.title('Random Scatter Plot')\\n",
        "plt.show()"
      ]
    }
  ]
}`,
  },
];

/** Convert example files into persistent PyNode records (flat list). */
export function exampleNodes(parentId: string | null = null): PyNode[] {
  const now = Date.now();
  return EXAMPLE_FILES.map((ex, i) => ({
    id: `example-${ex.name.replace(".", "-")}`,
    name: ex.name,
    parentId,
    kind: "file" as const,
    content: ex.code,
    createdAt: now + i,
    updatedAt: now + i,
  }));
}

export const DEFAULT_FILE = EXAMPLE_FILES[0];
