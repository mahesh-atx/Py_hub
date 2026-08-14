# Level 8 — Python Modules + OOP (30 Questions)

**What this level teaches:** using built-in modules (`math`, `random`, `datetime`, `statistics`), creating and importing your own module, and object-oriented programming — classes, objects, `__init__`, methods, inheritance, and class variables.

**Total questions:** 30

> Modules = reusable files of code. Classes = blueprints for objects. Write your own code first, then check the solution.

---

## Question 1: Use the math module — square root

**What to do:** Import `math` and print the square root of 144.

**Hint:** `math.sqrt(144)`.

**Solution:**

```python
import math

print(math.sqrt(144))
```

**Logic:** `import` loads a module; `module.function()` uses it. (Answer: 12.0)

---

## Question 2: Math constants and rounding

**What to do:** Print the value of `math.pi` rounded to 2 decimal places, and show `math.ceil(4.2)` and `math.floor(4.8)`.

**Hint:** `round(math.pi, 2)`, `math.ceil(x)` rounds up, `math.floor(x)` rounds down.

**Solution:**

```python
import math

print(round(math.pi, 2))   # 3.14
print(math.ceil(4.2))      # 5
print(math.floor(4.8))     # 4
```

**Logic:** `ceil` = smallest integer ≥ x; `floor` = largest integer ≤ x.

---

## Question 3: Random number in a range

**What to do:** Import `random` and print a random integer between 1 and 6 (like rolling a die).

**Hint:** `random.randint(1, 6)` — both endpoints included.

**Solution:**

```python
import random

print(random.randint(1, 6))
```

**Logic:** Each run gives a different value — this is how dice games start.

---

## Question 4: Random choice from a list

**What to do:** Given `fruits = ["apple", "banana", "mango", "orange"]`, pick and print one random fruit.

**Hint:** `random.choice(fruits)`.

**Solution:**

```python
import random

fruits = ["apple", "banana", "mango", "orange"]

print(random.choice(fruits))
```

**Logic:** `choice()` picks a single element — no loop needed.

---

## Question 5: Shuffle a list

**What to do:** Given `cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`, shuffle it and print the result.

**Hint:** `random.shuffle(cards)` changes the list in place.

**Solution:**

```python
import random

cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

random.shuffle(cards)

print(cards)
```

**Logic:** `shuffle()` mixes the list itself — no return value, just a rearranged list.

---

## Question 6: Today's date with datetime

**What to do:** Import `datetime` and print today's date.

**Hint:** `datetime.date.today()`.

**Solution:**

```python
import datetime

today = datetime.date.today()

print(today)
```

**Logic:** The `datetime` module gives you real-world time and dates.

---

## Question 7: Format a date nicely

**What to do:** Print today's date in the format `14-Aug-2026` using `strftime()`.

**Hint:** `today.strftime("%d-%b-%Y")` — `%d` day, `%b` short month, `%Y` full year.

**Solution:**

```python
import datetime

today = datetime.date.today()

print(today.strftime("%d-%b-%Y"))
```

**Logic:** `strftime` = "string format time" — you pick the pattern.

---

## Question 8: Days between two dates

**What to do:** Calculate how many days are between `2026-01-01` and today, and print it.

**Hint:** Subtracting two dates gives a `timedelta`; read its `.days`.

**Solution:**

```python
import datetime

start = datetime.date(2026, 1, 1)
today = datetime.date.today()

difference = today - start

print(difference.days, "days since the start of 2026")
```

**Logic:** Date minus date = a timedelta — and `.days` gives the number of whole days.

---

## Question 9: Statistics module — mean

**What to do:** Given `numbers = [10, 20, 30, 40, 50]`, print their mean (average) using the `statistics` module.

**Hint:** `statistics.mean(numbers)`.

**Solution:**

```python
import statistics

numbers = [10, 20, 30, 40, 50]

print(statistics.mean(numbers))
```

**Logic:** Real data work uses the `statistics` module instead of hand-rolled averages. (Answer: 30)

---

## Question 10: Create your own module

**What to do:** Create a file `mymath.py` with functions `add(a, b)` and `multiply(a, b)`. Then, in a second file, import it and use both functions.

**Hint:** A module is just a `.py` file — import it by name (without `.py`).

**Solution:**

```python
# File: mymath.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b
```

```python
# File: main.py (same folder as mymath.py)
import mymath

print(mymath.add(3, 4))
print(mymath.multiply(3, 4))
```

**Logic:** Any Python file is a module. Import it and call `module.function()`.

---

## Question 11: Import a specific function from a module

**What to do:** From `mymath`, import only `add` and use it directly without the `mymath.` prefix.

**Hint:** `from mymath import add`.

**Solution:**

```python
from mymath import add

print(add(10, 5))
```

**Logic:** `from X import Y` brings one name directly into your file.

---

## Question 12: Your first class and object

**What to do:** Create a class `Dog` with an attribute `name`, make an object from it, and print the dog's name.

**Hint:** `class Dog:` then `dog1 = Dog()` then `dog1.name = "Tommy"`.

**Solution:**

```python
class Dog:
    pass

dog1 = Dog()
dog1.name = "Tommy"

print(dog1.name)
```

**Logic:** A class is a blueprint; an object is one built from it. Attributes can be added with `object.attribute = value`.

---

## Question 13: Class with __init__

**What to do:** Rewrite `Dog` so the name is set by `__init__` when the object is created. Create two dogs with different names and print both.

**Hint:** `def __init__(self, name): self.name = name` — `self` refers to the object being created.

**Solution:**

```python
class Dog:
    def __init__(self, name):
        self.name = name

dog1 = Dog("Tommy")
dog2 = Dog("Bruno")

print(dog1.name)
print(dog2.name)
```

**Logic:** `__init__` runs automatically when you call `Dog(...)` — it sets up each new object.

---

## Question 14: A class method

**What to do:** Give `Dog` a method `bark()` that prints "<name> says woof!". Create a dog and call the method.

**Hint:** Methods are functions inside a class; they always take `self` first.

**Solution:**

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(self.name + " says woof!")

dog1 = Dog("Tommy")
dog1.bark()
```

**Logic:** `self` lets the method reach the object's own data.

---

## Question 15: __str__ — printable objects

**What to do:** Add `__str__` to `Dog` so that `print(dog1)` shows something friendly like "Dog named Tommy".

**Hint:** `def __str__(self): return "Dog named " + self.name`.

**Solution:**

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return "Dog named " + self.name

dog1 = Dog("Tommy")
print(dog1)
```

**Logic:** `__str__` controls what `print(object)` displays.

---

## Question 16: Bank account class

**What to do:** Create a `BankAccount` class with an owner and a balance, and methods `deposit(amount)`, `withdraw(amount)` (refuse if insufficient balance), and `show()` to display the balance. Test all three.

**Hint:** Each method changes or reads `self.balance`.

**Solution:**

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            print("Not enough balance.")
        else:
            self.balance -= amount

    def show(self):
        print(self.owner, "balance:", self.balance)

account = BankAccount("Rahul", 1000)
account.deposit(500)
account.withdraw(200)
account.withdraw(5000)  # should be refused
account.show()
```

**Logic:** Real-world behavior = state (balance) + methods that safely change it.

---

## Question 17: Rectangle class

**What to do:** Create a `Rectangle` class with `width` and `height`, and methods `area()` and `perimeter()`. Test with 5 × 3.

**Hint:** area = width × height; perimeter = 2 × (width + height).

**Solution:**

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(5, 3)
print("Area:", rect.area())
print("Perimeter:", rect.perimeter())
```

**Logic:** Methods that *compute from* the object's attributes — no extra data stored.

---

## Question 18: Student class

**What to do:** Create a `Student` class with `name` and a list of `marks`, and a method `average()` that returns the mean mark. Test it.

**Hint:** `sum(self.marks) / len(self.marks)`.

**Solution:**

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def average(self):
        return sum(self.marks) / len(self.marks)

student = Student("Priya", [85, 90, 78])
print(student.name, "average:", student.average())
```

**Logic:** Attributes can hold lists — objects bundle data of any shape.

---

## Question 19: Count how many objects were created

**What to do:** Add a *class variable* `count` to `Student` that tracks how many students have been created. Create three students and print `Student.count`.

**Hint:** Class variables live on the class itself, shared by all objects — increment it inside `__init__`.

**Solution:**

```python
class Student:
    count = 0

    def __init__(self, name):
        self.name = name
        Student.count += 1

s1 = Student("Rahul")
s2 = Student("Priya")
s3 = Student("Amit")

print("Students created:", Student.count)
```

**Logic:** `self.x` is per-object; `Class.x` is shared by the whole class. (Answer: 3)

---

## Question 20: Inheritance — basics

**What to do:** Create a base class `Animal` with `__init__(self, name)` and method `speak()` printing "Some sound". Create a `Dog` class that *inherits* from `Animal`, and a dog object. Call `speak()` on it.

**Hint:** `class Dog(Animal):` — the child class gets everything from the parent.

**Solution:**

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print("Some sound")

class Dog(Animal):
    pass

dog = Dog("Tommy")
print(dog.name)   # inherited __init__
dog.speak()       # inherited method
```

**Logic:** Inheritance = "is-a" relationship. A Dog *is an* Animal, so it gets Animal's behavior for free.

---

## Question 21: Inheritance — override a method

**What to do:** Give `Dog` its own `speak()` method that prints "Woof!" so it replaces the inherited one.

**Hint:** Define `speak()` inside `Dog` — it shadows the parent's version.

**Solution:**

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print("Some sound")

class Dog(Animal):
    def speak(self):
        print("Woof!")

class Cat(Animal):
    def speak(self):
        print("Meow!")

Dog("Tommy").speak()
Cat("Kitty").speak()
```

**Logic:** Overriding lets each child customize inherited behavior — same method name, different result.

---

## Question 22: Using super()

**What to do:** Create `Animal.__init__` that sets `name` and a `Dog.__init__` that sets an extra `breed` while reusing the parent's setup via `super()`.

**Hint:** `super().__init__(name)` calls the parent's `__init__`.

**Solution:**

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

dog = Dog("Tommy", "Labrador")
print(dog.name)
print(dog.breed)
```

**Logic:** `super()` = "call the parent's version" — you extend instead of rewriting.

---

## Question 23: Two classes working together

**What to do:** Create a `Book` class (title, author) and a `Library` class that holds a list of books with methods `add_book()` and `show_books()`. Add two books and show the library.

**Hint:** The library's list holds `Book` objects.

**Solution:**

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

class Library:
    def __init__(self):
        self.books = []

    def add_book(self, book):
        self.books.append(book)

    def show_books(self):
        for book in self.books:
            print(book.title, "by", book.author)

library = Library()
library.add_book(Book("Python Basics", "R. Kumar"))
library.add_book(Book("Data Structures", "S. Sharma"))

library.show_books()
```

**Logic:** Objects can contain other objects — this is how real systems are built.

---

## Question 24: A method that returns a computed value

**What to do:** Give `Rectangle` a method `is_square()` that returns True when width equals height.

**Hint:** `return self.width == self.height`.

**Solution:**

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def is_square(self):
        return self.width == self.height

print(Rectangle(4, 4).is_square())   # True
print(Rectangle(4, 5).is_square())   # False
```

**Logic:** Predicate methods — returning True/False about an object's state.

---

## Question 25: Static method

**What to do:** Add a static method `is_valid_grade(grade)` to a `Student` class that returns True if the grade is between 0 and 100. Call it directly on the class.

**Hint:** `@staticmethod` — no `self`, called as `Student.is_valid_grade(85)`.

**Solution:**

```python
class Student:
    @staticmethod
    def is_valid_grade(grade):
        return 0 <= grade <= 100

print(Student.is_valid_grade(85))    # True
print(Student.is_valid_grade(150))   # False
```

**Logic:** Static methods are helpers attached to the class that don't need an object.

---

## Question 26: To-do list as a class

**What to do:** Create a `TodoList` class with methods `add(task)`, `remove(task)`, and `show()`. Test all three.

**Hint:** Store tasks in `self.tasks = []` — methods manipulate the list.

**Solution:**

```python
class TodoList:
    def __init__(self):
        self.tasks = []

    def add(self, task):
        self.tasks.append(task)

    def remove(self, task):
        if task in self.tasks:
            self.tasks.remove(task)
        else:
            print("Task not found")

    def show(self):
        for task in self.tasks:
            print("-", task)

todo = TodoList()
todo.add("Buy milk")
todo.add("Study Python")
todo.remove("Buy milk")
todo.show()
```

**Logic:** A class wraps a list plus its operations into one clean object.

---

## Question 27: Private attributes with getters and setters

**What to do:** Create a `Temperature` class that stores its value in a "private" attribute `_celsius`, with `set_celsius()` (rejects values below -273) and `get_celsius()` methods.

**Hint:** The underscore `_celsius` signals "private" by convention; access it only through the methods.

**Solution:**

```python
class Temperature:
    def __init__(self):
        self._celsius = 0

    def set_celsius(self, value):
        if value < -273:
            print("Below absolute zero — rejected.")
        else:
            self._celsius = value

    def get_celsius(self):
        return self._celsius

temp = Temperature()
temp.set_celsius(25)
print(temp.get_celsius())
temp.set_celsius(-500)  # rejected
```

**Logic:** Getters/setters control *how* data changes — the beginning of encapsulation.

---

## Question 28: __str__ vs __repr__

**What to do:** Give a `Point` class both `__str__` (friendly, for users) and `__repr__` (technical, for developers), then print a Point both ways.

**Hint:** `print(obj)` uses `__str__`; `repr(obj)` uses `__repr__`.

**Solution:**

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return "Point at (" + str(self.x) + ", " + str(self.y) + ")"

    def __repr__(self):
        return "Point(x=" + str(self.x) + ", y=" + str(self.y) + ")"

p = Point(3, 7)
print(p)          # uses __str__
print(repr(p))    # uses __repr__
```

**Logic:** `__str__` is for humans; `__repr__` is for debugging and developers.

---

## Question 29: Inheritance chain — three levels

**What to do:** Build `Animal` → `Dog` → `Puppy` (three levels). The puppy inherits from the dog which inherits from the animal. Create a Puppy and call a method defined at the very top.

**Hint:** `class Puppy(Dog):` — inheritance chains just keep going.

**Solution:**

```python
class Animal:
    def breathe(self):
        print("Breathing...")

class Dog(Animal):
    def bark(self):
        print("Woof!")

class Puppy(Dog):
    pass

puppy = Puppy()
puppy.bark()      # from Dog
puppy.breathe()   # from Animal
```

**Logic:** A child inherits from its parent *and* everything above it.

---

## Question 30: Manage a list of employees

**What to do:** Create an `Employee` class (name, salary) with `show()`. Create three employees, store them in a list, print them all, and print the total salary bill.

**Hint:** Loop over the list of objects and use each object's methods/attributes.

**Solution:**

```python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def show(self):
        print(self.name, "-", self.salary)

employees = [
    Employee("Amit", 30000),
    Employee("Sneha", 45000),
    Employee("Ravi", 38000),
]

for emp in employees:
    emp.show()

total = 0
for emp in employees:
    total += emp.salary

print("Total salary bill:", total)
```

**Logic:** Lists of objects + loops = the standard shape of real applications.

---

## Level 8 recap — what you now know

- **Built-in modules** — `math`, `random`, `datetime`, `statistics` (Q1–9).
- **Your own modules** — any `.py` file, imported with `import` or `from ... import` (Q10–11).
- **Classes and objects** — blueprints and instances (Q12–13).
- **`__init__` and `self`** — setting up new objects (Q13).
- **Methods** — functions that act on an object's data (Q14, 16–18).
- **Special methods** — `__str__`, `__repr__` (Q15, 28).
- **Class variables** — shared across all objects (Q19).
- **Inheritance** — `class Child(Parent)`, overriding, `super()`, chains (Q20–22, 29).
- **Composition** — objects inside objects (Q23, 30).
- **Encapsulation** — private attributes + getters/setters (Q27).
