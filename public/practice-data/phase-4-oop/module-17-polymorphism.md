# Module 17: Polymorphism

## What is Polymorphism?

**Polymorphism** comes from Greek: *poly* = many, *morph* = forms. It means **the same action behaves differently depending on the object**.

You call one method name, and each object responds in its own way.

### The simplest example

```python
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Cow:
    def speak(self):
        return "Moo!"

animals = [Dog(), Cat(), Cow()]

for animal in animals:
    print(animal.speak())
```

Output:

```
Woof!
Meow!
Moo!
```

The loop does not care what type each animal is. It just calls `speak()` and the right version runs.

### You have already used polymorphism

Python's built-ins are polymorphic:

```python
print(len("Hello"))          # 5   — counts characters
print(len([1, 2, 3, 4]))     # 4   — counts items
print(len({"a": 1, "b": 2})) # 2   — counts keys

print(5 + 3)                 # 8       — addition
print("Ma" + "hesh")         # Mahesh  — concatenation
print([1, 2] + [3, 4])       # [1, 2, 3, 4] — list joining
```

Same function, same operator — different behaviour based on the type.

### Types of polymorphism in Python

| Type | How it works | Section |
| --- | --- | --- |
| **Method overriding** | Child redefines a parent method | Below |
| **Method overloading** | Simulated with default args / `*args` | Below |
| **Duck typing** | Any object with the right method works | Below |
| **Operator overloading** | Define `__add__`, `__eq__`, etc. | Below |

### Why polymorphism matters

- **Flexibility**: One piece of code handles many types.
- **Extensibility**: Add a new class without touching existing code.
- **Cleaner code**: No long `if/elif` chains checking types.

Without polymorphism:

```python
def make_sound(animal):
    if isinstance(animal, Dog):
        print("Woof!")
    elif isinstance(animal, Cat):
        print("Meow!")
    elif isinstance(animal, Cow):
        print("Moo!")
    # every new animal means editing this function ❌
```

With polymorphism:

```python
def make_sound(animal):
    print(animal.speak())    # ✅ works for any animal, forever
```

---

## Method Overriding

**Method overriding** is polymorphism through inheritance: a child class replaces a parent's method with its own version.

```python
class Shape:
    def area(self):
        return 0

    def describe(self):
        print(f"{self.__class__.__name__} has area {self.area():.2f}")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):                       # overrides Shape.area
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):                       # overrides Shape.area
        return self.length * self.width

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):                       # overrides Shape.area
        return 0.5 * self.base * self.height

shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 8)]

for shape in shapes:
    shape.describe()
```

Output:

```
Circle has area 78.54
Rectangle has area 24.00
Triangle has area 12.00
```

Notice `describe()` is written **once** in the parent, yet it calls the correct `area()` for each shape. That is polymorphism at work.

### With abstract base classes

Combining Module 15's abstract classes with overriding is the standard professional pattern.

```python
from abc import ABC, abstractmethod

class Payment(ABC):
    def __init__(self, amount):
        self.amount = amount

    @abstractmethod
    def process(self):
        pass

class CreditCard(Payment):
    def process(self):
        print(f"Processing ₹{self.amount} via Credit Card")

class UPI(Payment):
    def process(self):
        print(f"Processing ₹{self.amount} via UPI")

class NetBanking(Payment):
    def process(self):
        print(f"Processing ₹{self.amount} via Net Banking")

payments = [CreditCard(1500), UPI(250), NetBanking(8000)]

for payment in payments:
    payment.process()
```

Output:

```
Processing ₹1500 via Credit Card
Processing ₹250 via UPI
Processing ₹8000 via Net Banking
```

Adding a new payment type requires **zero changes** to the loop.

### Runtime polymorphism

The decision of which method to run happens while the program is running, not when it is written.

```python
class Animal:
    def speak(self):
        print("Some sound")

class Dog(Animal):
    def speak(self):
        print("Woof!")

def make_it_speak(animal):
    animal.speak()      # Python decides at runtime

make_it_speak(Animal())   # Some sound
make_it_speak(Dog())      # Woof!
```

---

## Method Overloading (Python Approach)

**Method overloading** means having several methods with the same name but different parameters. Languages like Java and C++ support it directly.

**Python does not.** If you define a method twice, the second definition simply replaces the first.

```python
class Calculator:
    def add(self, a, b):
        return a + b

    def add(self, a, b, c):       # this replaces the one above
        return a + b + c

calc = Calculator()
print(calc.add(1, 2, 3))    # 6
print(calc.add(1, 2))       # ❌ TypeError: add() missing 1 required positional argument
```

But Python gives you three cleaner ways to get the same effect.

### 1. Default arguments

```python
class Calculator:
    def add(self, a, b=0, c=0):
        return a + b + c

calc = Calculator()
print(calc.add(5))          # 5
print(calc.add(5, 10))      # 15
print(calc.add(5, 10, 15))  # 30
```

### 2. `*args` — any number of arguments

```python
class Calculator:
    def add(self, *numbers):
        return sum(numbers)

    def multiply(self, *numbers):
        result = 1
        for n in numbers:
            result *= n
        return result

calc = Calculator()
print(calc.add(1, 2))              # 3
print(calc.add(1, 2, 3, 4, 5))     # 15
print(calc.add())                  # 0
print(calc.multiply(2, 3, 4))      # 24
```

### 3. Checking types inside the method

```python
class Area:
    def calculate(self, *args):
        if len(args) == 1:
            # circle
            return 3.14159 * args[0] ** 2
        elif len(args) == 2:
            # rectangle
            return args[0] * args[1]
        else:
            return "Invalid number of arguments"

a = Area()
print(a.calculate(5))         # 78.53975  (circle)
print(a.calculate(4, 6))      # 24        (rectangle)
```

### 4. `functools.singledispatchmethod` (advanced)

Python 3.8+ offers real type-based dispatch.

```python
from functools import singledispatchmethod

class Formatter:
    @singledispatchmethod
    def format(self, value):
        return f"Unknown type: {value}"

    @format.register
    def _(self, value: int):
        return f"Integer: {value}"

    @format.register
    def _(self, value: str):
        return f"String: '{value}'"

    @format.register
    def _(self, value: list):
        return f"List with {len(value)} items"

f = Formatter()
print(f.format(42))            # Integer: 42
print(f.format("hello"))       # String: 'hello'
print(f.format([1, 2, 3]))     # List with 3 items
print(f.format(3.14))          # Unknown type: 3.14
```

### Overloading vs overriding

| Method Overloading | Method Overriding |
| --- | --- |
| Same name, different parameters | Same name, same parameters |
| Within **one** class | Across **parent and child** classes |
| Resolved at compile time (other languages) | Resolved at runtime |
| ❌ Not natively supported in Python | ✅ Fully supported in Python |
| Simulated with defaults / `*args` | Just redefine the method |

---

## Duck Typing

> "If it walks like a duck and quacks like a duck, then it must be a duck."

**Duck typing** means Python does not care about an object's *type* — only about whether it has the *method* you are calling.

### No inheritance needed

```python
class Duck:
    def speak(self):
        return "Quack!"

class Person:
    def speak(self):
        return "Hello!"

class Robot:
    def speak(self):
        return "Beep boop!"

# These three classes are completely unrelated — no common parent

def make_speak(thing):
    print(thing.speak())

for obj in [Duck(), Person(), Robot()]:
    make_speak(obj)
```

Output:

```
Quack!
Hello!
Beep boop!
```

In Java you would need a shared interface. In Python, having the method is enough.

### A practical example

```python
class PDFExporter:
    def export(self, data):
        print(f"Exporting {len(data)} records to PDF")

class CSVExporter:
    def export(self, data):
        print(f"Exporting {len(data)} records to CSV")

class JSONExporter:
    def export(self, data):
        print(f"Exporting {len(data)} records to JSON")

def save_report(exporter, data):
    exporter.export(data)        # any object with .export() works

records = ["row1", "row2", "row3"]

save_report(PDFExporter(), records)
save_report(CSVExporter(), records)
save_report(JSONExporter(), records)
```

Output:

```
Exporting 3 records to PDF
Exporting 3 records to CSV
Exporting 3 records to JSON
```

### Duck typing with built-ins

Anything with `__len__` works with `len()`:

```python
class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        return len(self.songs)

p = Playlist(["Song A", "Song B", "Song C"])
print(len(p))     # 3
```

Anything with `__iter__` works in a `for` loop:

```python
class Countdown:
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        n = self.start
        while n > 0:
            yield n
            n -= 1

for number in Countdown(5):
    print(number, end=" ")     # 5 4 3 2 1
```

### Safe duck typing

Sometimes you should check first:

```python
def make_speak(thing):
    if hasattr(thing, "speak"):
        print(thing.speak())
    else:
        print("This object cannot speak")

class Rock:
    pass

make_speak(Duck())    # Quack!
make_speak(Rock())    # This object cannot speak
```

Or use EAFP, which is more Pythonic:

```python
def make_speak(thing):
    try:
        print(thing.speak())
    except AttributeError:
        print("This object cannot speak")
```

### Duck typing vs inheritance

| Duck typing | Inheritance |
| --- | --- |
| No shared parent needed | Requires a common parent |
| Checks behaviour at runtime | Enforced by the class hierarchy |
| Very flexible | More structured and explicit |
| Errors appear when called | Errors appear at class definition |
| Pythonic default | Better for enforcing a contract |

---

## Operator Overloading

**Operator overloading** lets your own classes work with Python's operators like `+`, `-`, `==`, and `<`.

You do this by defining special **dunder** methods.

### Without overloading

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p1 = Point(1, 2)
p2 = Point(3, 4)

print(p1 + p2)     # ❌ TypeError: unsupported operand type(s) for +: 'Point' and 'Point'
```

### With overloading

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)

    def __str__(self):
        return f"Point({self.x}, {self.y})"

p1 = Point(1, 2)
p2 = Point(3, 4)
p3 = p1 + p2

print(p3)          # Point(4, 6)
```

When Python sees `p1 + p2`, it calls `p1.__add__(p2)`.

### Arithmetic operators

| Operator | Method | Example |
| --- | --- | --- |
| `+` | `__add__(self, other)` | `a + b` |
| `-` | `__sub__(self, other)` | `a - b` |
| `*` | `__mul__(self, other)` | `a * b` |
| `/` | `__truediv__(self, other)` | `a / b` |
| `//` | `__floordiv__(self, other)` | `a // b` |
| `%` | `__mod__(self, other)` | `a % b` |
| `**` | `__pow__(self, other)` | `a ** b` |
| `-a` | `__neg__(self)` | `-a` |
| `abs(a)` | `__abs__(self)` | `abs(a)` |

### Comparison operators

| Operator | Method | Example |
| --- | --- | --- |
| `==` | `__eq__(self, other)` | `a == b` |
| `!=` | `__ne__(self, other)` | `a != b` |
| `<` | `__lt__(self, other)` | `a < b` |
| `>` | `__gt__(self, other)` | `a > b` |
| `<=` | `__le__(self, other)` | `a <= b` |
| `>=` | `__ge__(self, other)` | `a >= b` |

### Compound assignment

| Operator | Method |
| --- | --- |
| `+=` | `__iadd__(self, other)` |
| `-=` | `__isub__(self, other)` |
| `*=` | `__imul__(self, other)` |

If `__iadd__` is not defined, Python falls back to `__add__`.

### A complete Vector class

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __lt__(self, other):
        return self.magnitude() < other.magnitude()

    def __neg__(self):
        return Vector(-self.x, -self.y)

    def __abs__(self):
        return self.magnitude()

    def magnitude(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(4, 1)

print(v1 + v2)         # Vector(6, 4)
print(v1 - v2)         # Vector(-2, 2)
print(v1 * 3)          # Vector(6, 9)
print(-v1)             # Vector(-2, -3)
print(v1 == v2)        # False
print(v1 == Vector(2, 3))   # True
print(v1 < v2)         # True
print(abs(v1))         # 3.605551275463989
```

### A practical Money class

```python
class Money:
    def __init__(self, amount, currency="INR"):
        self.amount = amount
        self.currency = currency

    def __add__(self, other):
        if self.currency != other.currency:
            raise ValueError("Cannot add different currencies")
        return Money(self.amount + other.amount, self.currency)

    def __sub__(self, other):
        if self.currency != other.currency:
            raise ValueError("Cannot subtract different currencies")
        return Money(self.amount - other.amount, self.currency)

    def __eq__(self, other):
        return self.amount == other.amount and self.currency == other.currency

    def __lt__(self, other):
        return self.amount < other.amount

    def __str__(self):
        return f"{self.currency} {self.amount:.2f}"

wallet = Money(1500)
salary = Money(50000)

print(wallet + salary)          # INR 51500.00
print(salary - wallet)          # INR 48500.00
print(wallet < salary)          # True

try:
    print(Money(100, "INR") + Money(50, "USD"))
except ValueError as e:
    print("Error:", e)          # Error: Cannot add different currencies
```

### Handling unsupported types

Return `NotImplemented` so Python can try the other operand's method or raise a clear error.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return Point(self.x + other.x, self.y + other.y)

    def __str__(self):
        return f"Point({self.x}, {self.y})"

p = Point(1, 2)
print(p + Point(3, 4))    # Point(4, 6)
print(p + 5)              # ❌ TypeError: unsupported operand type(s)
```

### Reflected operators

`__radd__` handles the case where your object is on the **right** side.

```python
class Money:
    def __init__(self, amount):
        self.amount = amount

    def __add__(self, other):
        if isinstance(other, Money):
            return Money(self.amount + other.amount)
        return Money(self.amount + other)

    def __radd__(self, other):
        return self.__add__(other)      # handles  100 + money

    def __str__(self):
        return f"₹{self.amount}"

m = Money(500)
print(m + 100)      # ₹600  → calls __add__
print(100 + m)      # ₹600  → calls __radd__
```

This also makes `sum()` work:

```python
wallets = [Money(100), Money(200), Money(300)]
print(sum(wallets, Money(0)))     # ₹600
```

### `functools.total_ordering`

Define just `__eq__` and `__lt__`, and get the other four comparisons free.

```python
from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def __eq__(self, other):
        return self.marks == other.marks

    def __lt__(self, other):
        return self.marks < other.marks

    def __str__(self):
        return f"{self.name} ({self.marks})"

s1 = Student("Mahesh", 85)
s2 = Student("Priya", 92)

print(s1 < s2)     # True
print(s1 > s2)     # False  ← free
print(s1 <= s2)    # True   ← free
print(s1 >= s2)    # False  ← free
print(s1 != s2)    # True   ← free
```

### Sorting objects

Once `__lt__` exists, `sort()` and `sorted()` work.

```python
students = [Student("Mahesh", 85), Student("Priya", 92), Student("Ravi", 78)]

for s in sorted(students):
    print(s)
```

Output:

```
Ravi (78)
Mahesh (85)
Priya (92)
```

---

## Polymorphism with Functions and Inheritance

### One function, many types

```python
class Rectangle:
    def __init__(self, l, w):
        self.l, self.w = l, w

    def area(self):
        return self.l * self.w

class Square:
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

def print_area(shape):
    print(f"Area: {shape.area()}")

print_area(Rectangle(4, 5))    # Area: 20
print_area(Square(6))          # Area: 36
```

### Polymorphism in a collection

```python
class Employee:
    def __init__(self, name, base):
        self.name = name
        self.base = base

    def salary(self):
        return self.base

class Manager(Employee):
    def salary(self):
        return self.base + 20000

class Intern(Employee):
    def salary(self):
        return self.base * 0.5

staff = [Employee("Mahesh", 50000), Manager("Priya", 80000), Intern("Ravi", 20000)]

total = 0
for person in staff:
    pay = person.salary()
    print(f"{person.name}: ₹{pay:,.0f}")
    total += pay

print(f"Total payroll: ₹{total:,.0f}")
```

Output:

```
Mahesh: ₹50,000
Priya: ₹100,000
Ravi: ₹10,000
Total payroll: ₹160,000
```

---

## Common Mistakes

### 1. Expecting real method overloading

```python
# Wrong — the second definition wins
class Calc:
    def add(self, a, b): return a + b
    def add(self, a, b, c): return a + b + c

# Correct
class Calc:
    def add(self, *args): return sum(args)
```

### 2. Forgetting `__eq__` makes objects compare by identity

```python
class Point:
    def __init__(self, x):
        self.x = x

print(Point(5) == Point(5))     # False — different objects in memory
```

Define `__eq__` to compare by value.

### 3. Defining `__eq__` without `__hash__`

```python
class Point:
    def __init__(self, x):
        self.x = x

    def __eq__(self, other):
        return self.x == other.x

p = Point(1)
s = {p}      # ❌ TypeError: unhashable type: 'Point'
```

Defining `__eq__` sets `__hash__` to `None`. Add it back if you need sets or dict keys:

```python
class Point:
    def __init__(self, x):
        self.x = x

    def __eq__(self, other):
        return self.x == other.x

    def __hash__(self):
        return hash(self.x)

print({Point(1), Point(1)})     # one element — they are equal
```

### 4. Assuming `other` is the same type

```python
# Wrong
def __add__(self, other):
    return Point(self.x + other.x, self.y + other.y)     # crashes on p + 5

# Correct
def __add__(self, other):
    if not isinstance(other, Point):
        return NotImplemented
    return Point(self.x + other.x, self.y + other.y)
```

### 5. Overloading operators in confusing ways

```python
class Student:
    def __add__(self, other):
        self.marks = 0      # ❌ what does "adding students" even mean?
```

Only overload an operator when the meaning is obvious to a reader.

### 6. Changing the method signature when overriding

```python
class Shape:
    def area(self): pass

class Circle(Shape):
    def area(self, radius):     # ❌ breaks polymorphic calls
        return 3.14 * radius ** 2
```

---

## Quick Reference

| Concept | How | Example |
| --- | --- | --- |
| Method overriding | Redefine in child | `def speak(self):` in `Dog` |
| Method overloading | `*args` or defaults | `def add(self, *nums):` |
| Duck typing | Just call the method | `obj.speak()` |
| Add | `__add__` | `a + b` |
| Subtract | `__sub__` | `a - b` |
| Multiply | `__mul__` | `a * b` |
| Equal | `__eq__` | `a == b` |
| Less than | `__lt__` | `a < b` |
| Negate | `__neg__` | `-a` |
| Right-side add | `__radd__` | `5 + a` |
| Free comparisons | `@total_ordering` | Needs `__eq__` + `__lt__` |
| Unsupported type | `return NotImplemented` | Lets Python raise a clear error |
