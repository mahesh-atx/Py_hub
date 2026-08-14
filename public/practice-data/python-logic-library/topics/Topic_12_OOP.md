# Topic Deep-Dive 12 — OOP (30 Questions)

**Focus:** properties, classmethods, operator overloading, iterators, abstract classes, dataclasses, enums, design patterns, and object composition.

**How to practice:** Read the task, write your own code, use the hint if stuck, then check the solution.

---

## Question 1: Class with multiple attributes

**What to do:** Create a `Book` class with title, author, and year. Make two books and print each one's year.

**Hint:** Three parameters in `__init__`, assigned to `self`.

**Solution:**

```python
class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year

book1 = Book("Python Basics", "R. Kumar", 2024)
book2 = Book("Algorithms", "S. Sharma", 2020)

print(book1.year)
print(book2.year)
```

**Logic:** Attributes = an object's stored state, set up at creation.

---

## Question 2: Method calling another method

**What to do:** Give `BankAccount` a `withdraw()` method that first calls `_has_enough(amount)` before reducing the balance.

**Hint:** Use `self._has_enough(amount)` — methods share the object through self.

**Solution:**

```python
class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def _has_enough(self, amount):
        return amount <= self.balance

    def withdraw(self, amount):
        if self._has_enough(amount):
            self.balance -= amount
            print("Withdrawn", amount)
        else:
            print("Not enough balance")

account = BankAccount(1000)
account.withdraw(400)
account.withdraw(2000)
```

**Logic:** Private helper methods keep public methods readable.

---

## Question 3: Instance vs class variables

**What to do:** Create a `Car` class with a class variable `wheels = 4` and an instance variable `color`. Show that changing one car's color doesn't affect another, but `Car.wheels` is shared.

**Hint:** Class variables live on the class; instance variables on `self`.

**Solution:**

```python
class Car:
    wheels = 4

    def __init__(self, color):
        self.color = color

car1 = Car("red")
car2 = Car("blue")

car1.color = "green"
print(car1.color, car2.color)   # green blue — independent
print(car1.wheels, car2.wheels) # 4 4 — shared
Car.wheels = 6
print(car1.wheels, car2.wheels) # 6 6 — changed for all
```

**Logic:** Instance state is per-object; class state is global to the class.

---

## Question 4: @property — computed attribute

**What to do:** Give `Circle` a radius and an `area` property that computes πr² on access.

**Hint:** `@property` makes a method behave like an attribute: `circle.area` (no parentheses).

**Solution:**

```python
import math

class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return math.pi * self.radius ** 2

circle = Circle(5)
print(circle.area)
```

**Logic:** Properties give attribute syntax with computed results.

---

## Question 5: Property setter with validation

**What to do:** Give `Temperature` a `celsius` property whose setter rejects values below -273.

**Hint:** `@celsius.setter` — validation inside the setter.

**Solution:**

```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273:
            raise ValueError("Below absolute zero")
        self._celsius = value

temp = Temperature()
temp.celsius = 25
print(temp.celsius)

try:
    temp.celsius = -500
except ValueError as e:
    print("Rejected:", e)
```

**Logic:** Setters guard the data — assignment becomes validated.

---

## Question 6: @classmethod — alternate constructor

**What to do:** Give `Point` a `from_string("3,4")` classmethod that builds a Point from a comma string.

**Hint:** `@classmethod` receives the CLASS as `cls` — call `cls(x, y)`.

**Solution:**

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    @classmethod
    def from_string(cls, text):
        x, y = text.split(",")
        return cls(int(x), int(y))

point = Point.from_string("3,4")
print(point.x, point.y)
```

**Logic:** Classmethods are factories — new ways to construct objects.

---

## Question 7: @staticmethod

**What to do:** Add `is_valid_radius(r)` as a staticmethod on Circle — it needs no object, just checks r > 0.

**Hint:** `@staticmethod` — no `self`, no `cls`.

**Solution:**

```python
class Circle:
    @staticmethod
    def is_valid_radius(radius):
        return radius > 0

print(Circle.is_valid_radius(5))
print(Circle.is_valid_radius(-1))
```

**Logic:** Staticmethods are plain functions grouped with their class.

---

## Question 8: Magic methods — __str__, __len__, __eq__

**What to do:** Give `Playlist` a list of songs plus `__str__`, `__len__`, and `__eq__` so printing, len(), and == all work naturally.

**Hint:** Each magic method returns the right type: str, int, bool.

**Solution:**

```python
class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __str__(self):
        return "Playlist with " + str(len(self.songs)) + " songs"

    def __len__(self):
        return len(self.songs)

    def __eq__(self, other):
        return self.songs == other.songs

a = Playlist(["Song A", "Song B"])
b = Playlist(["Song A", "Song B"])

print(a)
print(len(a))
print(a == b)
```

**Logic:** Magic methods make your objects behave like built-ins.

---

## Question 9: Operator overloading — __add__

**What to do:** Give `Point` an `__add__` so `p1 + p2` returns a new Point with summed coordinates.

**Hint:** `return Point(self.x + other.x, self.y + other.y)`.

**Solution:**

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)

    def __str__(self):
        return "Point(" + str(self.x) + ", " + str(self.y) + ")"

p1 = Point(1, 2)
p2 = Point(3, 4)

print(p1 + p2)
```

**Logic:** Overloading makes your types work with Python's operators.

---

## Question 10: Iterator class — __iter__/__next__

**What to do:** Write a `Countdown` class that iterates from n down to 1 — usable in a for loop.

**Hint:** `__next__` returns the next value and raises `StopIteration` when done.

**Solution:**

```python
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current < 1:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

for number in Countdown(5):
    print(number, end=" ")
print()
```

**Logic:** Implementing the iterator protocol lets for loops consume your objects.

---

## Question 11: __call__ — callable objects

**What to do:** Make a `Multiplier` class whose OBJECTS can be called like functions: `times5 = Multiplier(5); times5(4)`.

**Hint:** `def __call__(self, x): return x * self.factor`.

**Solution:**

```python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, x):
        return x * self.factor

times5 = Multiplier(5)
print(times5(4))
```

**Logic:** Callable objects = functions with memory.

---

## Question 12: __getitem__ — custom container

**What to do:** Write a `Squares` class where `squares[i]` returns i² for any i, using `__getitem__`.

**Hint:** `def __getitem__(self, i): return i * i` — no storage needed.

**Solution:**

```python
class Squares:
    def __getitem__(self, i):
        return i * i

squares = Squares()
print(squares[3])
print(squares[10])
```

**Logic:** `__getitem__` powers indexing — computed containers store nothing.

---

## Question 13: Inheritance + polymorphism — Shape family

**What to do:** Build `Shape` with `area()`, and subclasses `Circle` and `Rectangle` overriding it. Loop over a mixed list and call `.area()` on each.

**Hint:** Same method name, different behavior per class — that's polymorphism.

**Solution:**

```python
import math

class Shape:
    def area(self):
        return 0

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

shapes = [Circle(5), Rectangle(3, 4), Shape()]

for shape in shapes:
    print(round(shape.area(), 2))
```

**Logic:** One interface, many behaviors — the heart of OOP.

---

## Question 14: Multiple inheritance and MRO

**What to do:** Create `A` and `B`, both with a `greet()` method, and `C(A, B)`. Print which greet wins and inspect `C.__mro__`.

**Hint:** Method Resolution Order — left-to-right in the base list.

**Solution:**

```python
class A:
    def greet(self):
        print("Hello from A")

class B:
    def greet(self):
        print("Hello from B")

class C(A, B):
    pass

c = C()
c.greet()
print(C.__mro__)
```

**Logic:** The MRO tuple shows the exact search order — A wins because it's first.

---

## Question 15: super() across three levels

**What to do:** Build `Animal → Dog → Puppy` where each `__init__` calls `super().__init__()`, so creating a Puppy initializes the whole chain.

**Hint:** Each level calls super and adds its own attribute.

**Solution:**

```python
class Animal:
    def __init__(self, name):
        self.name = name
        print("Animal init:", name)

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
        print("Dog init:", breed)

class Puppy(Dog):
    def __init__(self, name, breed, toy):
        super().__init__(name, breed)
        self.toy = toy
        print("Puppy init:", toy)

puppy = Puppy("Tommy", "Labrador", "ball")
```

**Logic:** super() chains the constructors — every level runs in order.

---

## Question 16: Abstract base class

**What to do:** Define an abstract `Shape` with an abstract `area()`, implement it in `Square`, and show that Shape itself cannot be instantiated.

**Hint:** `from abc import ABC, abstractmethod` — abstract methods have no body.

**Solution:**

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

square = Square(4)
print(square.area())

try:
    Shape()
except TypeError as e:
    print("Cannot instantiate Shape — it's abstract")
```

**Logic:** Abstract classes enforce that every subclass implements the required methods.

---

## Question 17: Encapsulation — private state

**What to do:** Build `Account` with a `_balance` and public `deposit`/`withdraw` methods; show the balance is only changeable through them.

**Hint:** `_balance` is private BY CONVENTION; methods are the only sanctioned door.

**Solution:**

```python
class Account:
    def __init__(self, balance):
        self._balance = balance

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount

    def get_balance(self):
        return self._balance

account = Account(100)
account.deposit(50)
account.withdraw(30)
account.withdraw(9999)   # silently rejected

print(account.get_balance())
```

**Logic:** Data protected behind methods = no invalid states possible.

---

## Question 18: Composition — Car has an Engine

**What to do:** Build an `Engine` class and a `Car` class that CONTAINS an engine and delegates `start()` to it.

**Hint:** Pass an Engine into Car's constructor and store it as `self.engine`.

**Solution:**

```python
class Engine:
    def start(self):
        print("Engine started")

class Car:
    def __init__(self):
        self.engine = Engine()   # composition

    def start(self):
        print("Turning key...")
        self.engine.start()

car = Car()
car.start()
```

**Logic:** Composition = "has-a" — build complex objects from simpler ones.

---

## Question 19: Dataclasses

**What to do:** Define a `Student` dataclass with name and marks, create two students, and show the automatic `__repr__` and equality.

**Hint:** `from dataclasses import dataclass; @dataclass`.

**Solution:**

```python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    marks: float

s1 = Student("Rahul", 85.5)
s2 = Student("Rahul", 85.5)

print(s1)
print(s1 == s2)
```

**Logic:** Dataclasses auto-generate __init__, __repr__, and __eq__ — zero boilerplate.

---

## Question 20: Enum

**What to do:** Define a `Status` enum (PENDING, ACTIVE, DONE) and show iterating over it and accessing name/value.

**Hint:** `from enum import Enum; class Status(Enum): ...`.

**Solution:**

```python
from enum import Enum

class Status(Enum):
    PENDING = 1
    ACTIVE = 2
    DONE = 3

print(Status.ACTIVE)
print(Status.ACTIVE.name, Status.ACTIVE.value)

for status in Status:
    print(status)
```

**Logic:** Enums give fixed sets of named values — no more string typos.

---

## Question 21: Custom exception as a class

**What to do:** Build `InsufficientFundsError` with the amount stored, raise it from a withdrawal, and catch it to print the details.

**Hint:** Exceptions are classes — add `__init__` and attributes like any class.

**Solution:**

```python
class InsufficientFundsError(Exception):
    def __init__(self, balance, requested):
        self.balance = balance
        self.requested = requested
        super().__init__("Requested " + str(requested) + ", have " + str(balance))

class Wallet:
    def __init__(self, balance):
        self.balance = balance

    def spend(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount

wallet = Wallet(100)

try:
    wallet.spend(500)
except InsufficientFundsError as e:
    print("Failed:", e)
    print("Short by:", e.requested - e.balance)
```

**Logic:** Rich exception objects carry structured failure data.

---

## Question 22: Singleton pattern

**What to do:** Build a `Config` class where every instantiation returns the SAME object.

**Hint:** Override `__new__`; store the instance on the class.

**Solution:**

```python
class Config:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.settings = {}
        return cls._instance

c1 = Config()
c2 = Config()
c1.settings["theme"] = "dark"

print(c1 is c2)
print(c2.settings)
```

**Logic:** One shared instance no matter how many times you "create" it.

---

## Question 23: __lt__ — make objects sortable

**What to do:** Give `Player` a score and `__lt__` so a list of players sorts by score.

**Hint:** `def __lt__(self, other): return self.score < other.score` — then `sorted()` just works.

**Solution:**

```python
class Player:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def __lt__(self, other):
        return self.score < other.score

    def __str__(self):
        return self.name + ": " + str(self.score)

players = [Player("Amit", 45), Player("Bina", 90), Player("Chetan", 60)]

for player in sorted(players):
    print(player)
```

**Logic:** Define one comparison method and sorted/sort/min/max all work.

---

## Question 24: Duck typing

**What to do:** Write `make_sound(animal)` that calls `.speak()` — and pass it objects from UNRELATED classes that both have speak().

**Hint:** No inheritance needed — if it has speak(), it works.

**Solution:**

```python
class Dog:
    def speak(self):
        print("Woof!")

class Alarm:
    def speak(self):
        print("BEEP BEEP!")

def make_sound(thing):
    thing.speak()

make_sound(Dog())
make_sound(Alarm())
```

**Logic:** Python cares about WHAT an object can do, not what it IS.

---

## Question 25: Composition over inheritance — Report system

**What to do:** Build a `Report` that takes a `formatter` object and uses it to format its data — so new formatters plug in without changing Report.

**Hint:** Strategy pattern: `self.formatter.format(self.data)`.

**Solution:**

```python
class PlainFormatter:
    def format(self, data):
        return str(data)

class UpperFormatter:
    def format(self, data):
        return str(data).upper()

class Report:
    def __init__(self, data, formatter):
        self.data = data
        self.formatter = formatter

    def render(self):
        return self.formatter.format(self.data)

print(Report(["a", "b"], PlainFormatter()).render())
print(Report(["a", "b"], UpperFormatter()).render())
```

**Logic:** Plug-in behavior through composition — the Strategy pattern.

---

## Question 26: __slots__ — memory-efficient objects

**What to do:** Create a `Point` with `__slots__ = ("x", "y")` and show normal attribute access still works.

**Hint:** __slots__ prevents adding new attributes — but saves memory.

**Solution:**

```python
class Point:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x = x
        self.y = y

point = Point(1, 2)
print(point.x, point.y)
```

**Logic:** For millions of small objects, __slots__ cuts memory dramatically.

---

## Question 27: Class method as a counter

**What to do:** Track how many `User` objects exist using a class variable incremented in `__init__`, with a classmethod `get_count()`.

**Hint:** `cls.count` inside a @classmethod.

**Solution:**

```python
class User:
    count = 0

    def __init__(self, name):
        self.name = name
        User.count += 1

    @classmethod
    def get_count(cls):
        return cls.count

User("Rahul")
User("Priya")
User("Amit")

print(User.get_count())
```

**Logic:** Class-level bookkeeping with a classmethod accessor.

---

## Question 28: Nested class

**What to do:** Put a `Point` class inside a `Rectangle` class and use it for the rectangle's corner.

**Hint:** Reference it as `Rectangle.Point` from outside.

**Solution:**

```python
class Rectangle:
    class Point:
        def __init__(self, x, y):
            self.x = x
            self.y = y

    def __init__(self, x, y):
        self.corner = Rectangle.Point(x, y)

rect = Rectangle(5, 5)
print(rect.corner.x, rect.corner.y)
```

**Logic:** Nested classes group tightly-related types together.

---

## Question 29: __repr__ that can rebuild the object

**What to do:** Give `Point` a `__repr__` whose output, when evaluated, recreates the object.

**Hint:** Return `"Point(" + str(self.x) + ", " + str(self.y) + ")"` — then `eval(repr(p))` works.

**Solution:**

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return "Point(" + str(self.x) + ", " + str(self.y) + ")"

p = Point(3, 7)
print(repr(p))

copy = eval(repr(p))
print(copy.x, copy.y)
```

**Logic:** Good __repr__ doubles as a debugging AND serialization tool.

---

## Question 30: Complete mini-system — Account + Bank

**What to do:** Build `Account` (deposit/withdraw) and `Bank` (holds accounts, adds them, finds by name, totals all balances). Exercise every feature.

**Hint:** Bank stores Account objects; methods loop over them.

**Solution:**

```python
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            print(self.owner, "- insufficient funds")
        else:
            self.balance -= amount

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

    def total_balance(self):
        return sum(account.balance for account in self.accounts)

bank = Bank()
bank.add(Account("Rahul", 1000))
bank.add(Account("Priya", 2000))

account = bank.find("Rahul")
account.deposit(500)
account.withdraw(200)
account.withdraw(5000)

print("Total balance:", bank.total_balance())
```

**Logic:** Two classes collaborating — the shape of every real system.

---

## OOP recap

- **State & behavior** — attributes, methods, private helpers (Q1–3, 17).
- **Properties** — computed attributes, validated setters (Q4–5).
- **classmethod / staticmethod** — factories and utilities (Q6–7).
- **Magic methods** — str/len/eq, +, call, indexing, comparisons, repr (Q8–12, 23, 29).
- **Iterators** — __iter__/__next__ (Q10).
- **Inheritance** — polymorphism, MRO, super chains, ABCs (Q13–16).
- **Composition & patterns** — Engine-in-Car, Strategy, Singleton (Q18, 22, 25).
- **Modern tools** — dataclasses, enums, slots (Q19–20, 26).
- **OOP everywhere** — exceptions as classes, duck typing, nested classes (Q21, 24, 28).
- **Systems** — classes collaborating (Q30).
