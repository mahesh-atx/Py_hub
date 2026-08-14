# 🔑 Phase 4 — Solutions

A worked solution for every question in [questions.md](questions.md).

**These stay inside Phase 4's rules.** Everything from Phases 1-3, plus classes: `__init__`, instance and class attributes, class and static methods, properties, inheritance, abstract base classes and magic methods. If a solution here uses something you have not met yet, that is a bug; tell me.

Every solution was **executed against the full test suite** — 192 checks across 56 questions — and passes all of them.

> ⚠️ Reading a solution you have not attempted feels like learning and is not. If you open one, close it, delete what you wrote, and reproduce it from memory. Recognising correct code and writing it from a blank file are different skills, and only the second one is short.
>

**There is more than one right answer.** These are written to be *readable*, not shortest. If yours passes and you can explain it line by line, yours is correct.

This phase grades **object behaviour**. The grader builds instances, calls methods and reads attributes, so class and method **names must match the question exactly**. Some checks require an exception to be raised.

```bash
cd tests
python run_tests.py --new 4     # write your own first
python run_tests.py 4 --diff    # then check it
```

---

## Contents

| # | Question | Checks |
| --- | --- | --- |
| Q1 | [First Class](#q1-first-class) | 3 |
| Q2 | [Method with Logic](#q2-method-with-logic) | 3 |
| Q3 | [Rectangle Class](#q3-rectangle-class) | 5 |
| Q4 | [Circle with Validation](#q4-circle-with-validation) | 4 |
| Q5 | [Counter Object](#q5-counter-object) | 3 |
| Q6 | [Bank Account — First Version](#q6-bank-account-first-version) | 4 |
| Q7 | [Object Inspection](#q7-object-inspection) | 3 |
| Q8 | [Temperature Class](#q8-temperature-class) | 3 |
| Q9 | [Student Record](#q9-student-record) | 4 |
| Q10 | [Timer Class](#q10-timer-class) | 3 |
| Q11 | [Playlist](#q11-playlist) | 3 |
| Q12 | [Point and Distance](#q12-point-and-distance) | 3 |
| Q13 | [Instance vs Class Attribute](#q13-instance-vs-class-attribute) | 3 |
| Q14 | [The Shared Mutable Trap](#q14-the-shared-mutable-trap) | 4 |
| Q15 | [Instance Counter](#q15-instance-counter) | 2 |
| Q16 | [Class Method as Alternative Constructor](#q16-class-method-as-alternative-constructor) | 3 |
| Q17 | [Class Method Factory Chain](#q17-class-method-factory-chain) | 4 |
| Q18 | [Static Method Utility](#q18-static-method-utility) | 5 |
| Q19 | [Distinguishing the Three Method Types](#q19-distinguishing-the-three-method-types) | 5 |
| Q20 | [Employee with ID Generation](#q20-employee-with-id-generation) | 3 |
| Q21 | [Config Singleton-ish](#q21-config-singleton-ish) | 3 |
| Q22 | [Validating Constructor](#q22-validating-constructor) | 4 |
| Q23 | [Object Equality Without Dunders](#q23-object-equality-without-dunders) | 3 |
| Q24 | [The `__del__` Destructor](#q24-the-del-destructor) | 2 |
| Q25 | [Protected Members](#q25-protected-members) | 3 |
| Q26 | [Private Members and Name Mangling](#q26-private-members-and-name-mangling) | 4 |
| Q27 | [Getters and Setters](#q27-getters-and-setters) | 3 |
| Q28 | [The @property Decorator](#q28-the-property-decorator) | 3 |
| Q29 | [Computed Property](#q29-computed-property) | 3 |
| Q30 | [Property with Validation Chain](#q30-property-with-validation-chain) | 4 |
| Q31 | [Temperature with Two-Way Property](#q31-temperature-with-two-way-property) | 3 |
| Q32 | [Read-Only ID](#q32-read-only-id) | 3 |
| Q33 | [First Abstract Class](#q33-first-abstract-class) | 3 |
| Q34 | [Concrete Implementations](#q34-concrete-implementations) | 4 |
| Q35 | [Abstract with Shared Behaviour](#q35-abstract-with-shared-behaviour) | 3 |
| Q36 | [Abstract Payment Processor](#q36-abstract-payment-processor) | 4 |
| Q37 | [Single Inheritance](#q37-single-inheritance) | 4 |
| Q38 | [super() in the Constructor](#q38-super-in-the-constructor) | 4 |
| Q39 | [Multilevel Inheritance](#q39-multilevel-inheritance) | 3 |
| Q40 | [Hierarchical Inheritance](#q40-hierarchical-inheritance) | 4 |
| Q41 | [Multiple Inheritance and MRO](#q41-multiple-inheritance-and-mro) | 2 |
| Q42 | [The Diamond Problem](#q42-the-diamond-problem) | 3 |
| Q43 | [Method Overriding vs Extending](#q43-method-overriding-vs-extending) | 3 |
| Q44 | [isinstance vs type](#q44-isinstance-vs-type) | 4 |
| Q45 | [Composition Over Inheritance](#q45-composition-over-inheritance) | 3 |
| Q46 | [Shape Hierarchy with Abstract Base](#q46-shape-hierarchy-with-abstract-base) | 4 |
| Q47 | [Duck Typing](#q47-duck-typing) | 2 |
| Q48 | [Operator Overloading — Addition](#q48-operator-overloading-addition) | 4 |
| Q49 | [`__str__` vs `__repr__`](#q49-str-vs-repr) | 3 |
| Q50 | [Comparison Dunders](#q50-comparison-dunders) | 4 |
| Q51 | [`__len__` and `__getitem__`](#q51-len-and-getitem) | 5 |
| Q52 | [`__contains__`](#q52-contains) | 3 |
| Q53 | [`__call__`](#q53-call) | 3 |
| Q54 | [Context Manager with `__enter__` / `__exit__`](#q54-context-manager-with-enter-exit) | 3 |
| Q55 | [`__hash__` and Set Membership](#q55-hash-and-set-membership) | 4 |
| Q56 | [Full-Featured Class](#q56-full-featured-class) | 5 |
| Q57 | [Library Management System](#q57-library-management-system) | manual |
| Q58 | [E-Commerce Order System](#q58-e-commerce-order-system) | manual |
| Q59 | [Employee Payroll System](#q59-employee-payroll-system) | manual |
| Q60 | [Design Your Own System](#q60-design-your-own-system) | manual |

---

## Tier 1 — Classes and Objects (Q1–Q12)

### Q1. First Class

```python
class Person:
    """A person with a name and an age."""

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

**What to notice:** `self` is the instance; you declare it but never pass it.

**Checked with:**

```python
Person("Priya", 30).name   # -> 'Priya'
Person("Priya", 30).age   # -> 30
isinstance(Person("A", 1), Person)   # -> True
```

---

### Q2. Method with Logic

```python
class Person:
    """A person who can introduce themselves."""

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        return f"Hi, I am {self.name} and I am {self.age} years old."

    def is_adult(self):
        return self.age >= 18
```

**What to notice:** A method reaches its object's data through `self.`.

**Checked with:**

```python
Person("Priya", 30).introduce()   # -> 'Hi, I am Priya and I am 30 years old.'
Person("Kid", 10).is_adult()   # -> False
Person("Adult", 18).is_adult()   # -> True
```

---

### Q3. Rectangle Class

```python
class Rectangle:
    """A rectangle that computes its own measurements."""

    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

    def perimeter(self):
        return 2 * (self.length + self.width)

    def is_square(self):
        return self.length == self.width
```

**What to notice:** Compute in a method rather than storing, so the value can never go stale.

**Checked with:**

```python
Rectangle(5, 5).area()   # -> 25
Rectangle(5, 5).is_square()   # -> True
Rectangle(4, 6).perimeter()   # -> 20
Rectangle(4, 6).is_square()   # -> False
_r = Rectangle(2, 3); _r.length = 10; _r.area()   # -> 30
```

---

### Q4. Circle with Validation

```python
class Circle:
    """A circle that refuses to exist with an invalid radius."""

    PI = 3.14159

    def __init__(self, radius):
        if not isinstance(radius, (int, float)) or isinstance(radius, bool):
            raise TypeError("radius must be a number")
        if radius <= 0:
            raise ValueError("radius must be positive")
        self.radius = radius

    def area(self):
        return Circle.PI * self.radius ** 2

    def circumference(self):
        return 2 * Circle.PI * self.radius
```

**What to notice:** Validate in `__init__` so an invalid object can never exist.

**Checked with:**

```python
round(Circle(7).area(), 2)   # -> 153.94
round(Circle(7).circumference(), 2)   # -> 43.98
Circle(-1)   # raises ValueError
Circle("5")   # raises TypeError
```

---

### Q5. Counter Object

```python
class Counter:
    """Each Counter object counts independently."""

    def __init__(self, start=0):
        self.count = start

    def increment(self):
        self.count = self.count + 1
        return self.count

    def reset(self):
        self.count = 0
        return self.count
```

**What to notice:** `self.count += 1` updates the attribute; a bare `count = count + 1` makes a local.

**Checked with:**

```python
_c = Counter(); _c.increment(); _c.increment(); _c.count   # -> 2
_a = Counter(); _b = Counter(); _a.increment(); _b.count   # -> 0
_c = Counter(5); _c.reset()   # -> 0
```

---

### Q6. Bank Account — First Version

```python
class BankAccount:
    """A minimal account that validates every transaction."""

    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            return False
        self.balance = self.balance + amount
        return True

    def withdraw(self, amount):
        # Check BEFORE changing the balance.
        if amount <= 0 or amount > self.balance:
            return False
        self.balance = self.balance - amount
        return True
```

**What to notice:** Check before mutating - subtracting first already corrupts the balance.

**Checked with:**

```python
_a = BankAccount('R', 1000); _a.deposit(500); _a.balance   # -> 1500
_a = BankAccount('R', 1000); _a.withdraw(2000)   # -> False
_a = BankAccount('R', 1000); _a.withdraw(2000); _a.balance   # -> 1000
BankAccount('R').deposit(-5)   # -> False
```

---

### Q7. Object Inspection

```python
class Book:
    """A book, used here to demonstrate object inspection."""

    def __init__(self, title, author):
        self.title = title
        self.author = author

    def summary(self):
        return f"{self.title} by {self.author}"
```

**What to notice:** `vars(obj)` shows instance attributes; `dir(obj)` shows everything reachable.

**Checked with:**

```python
sorted(vars(Book("Dune", "Herbert")).keys())   # -> ['author', 'title']
type(Book("Dune", "Herbert")).__name__   # -> 'Book'
"summary" in dir(Book("Dune", "Herbert"))   # -> True
```

---

### Q8. Temperature Class

```python
class Temperature:
    """Store Celsius once; derive Fahrenheit on demand."""

    def __init__(self, celsius):
        self.celsius = celsius

    def to_fahrenheit(self):
        return self.celsius * 9 / 5 + 32

    def to_kelvin(self):
        return self.celsius + 273.15
```

**What to notice:** One stored value, several derived views.

**Checked with:**

```python
Temperature(37).to_fahrenheit()   # -> 98.6
Temperature(0).to_kelvin()   # -> 273.15
_t = Temperature(0); _t.celsius = 100; _t.to_fahrenheit()   # -> 212.0
```

---

### Q9. Student Record

```python
class Student:
    """A student with marks kept together in one list."""

    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def total(self):
        return sum(self.marks)

    def average(self):
        return self.total() / len(self.marks)

    def grade(self):
        average = self.average()
        if average >= 90:
            return "A+"
        elif average >= 80:
            return "A"
        elif average >= 70:
            return "B"
        elif average >= 60:
            return "C"
        elif average >= 40:
            return "D"
        return "Fail"
```

**What to notice:** Group the marks in a list so adding a subject changes nothing else.

**Checked with:**

```python
Student('R', [78, 85, 92, 71, 75]).total()   # -> 401
round(Student('R', [78, 85, 92, 71, 75]).average(), 2)   # -> 80.2
Student('R', [78, 85, 92, 71, 75]).grade()   # -> 'A'
Student('X', [30, 30, 30]).grade()   # -> 'Fail'
```

---

### Q10. Timer Class

```python
import time

class Timer:
    """Measure elapsed time between start() and stop()."""

    def __init__(self):
        self.started_at = None
        self.elapsed = 0.0

    def start(self):
        self.started_at = time.perf_counter()
        return self

    def stop(self):
        if self.started_at is None:
            return 0.0
        self.elapsed = time.perf_counter() - self.started_at
        self.started_at = None
        return self.elapsed
```

**What to notice:** Initialise the start time to None so `stop()` before `start()` does not crash.

**Checked with:**

```python
Timer().stop()   # -> 0.0
_t = Timer(); _t.start(); _t.stop() >= 0   # -> True
isinstance(Timer().elapsed, float)   # -> True
```

---

### Q11. Playlist

```python
class Playlist:
    """A named list of songs, guarded against missing entries."""

    def __init__(self, name):
        self.name = name
        self.songs = []

    def add(self, song):
        self.songs.append(song)
        return len(self.songs)

    def remove(self, song):
        if song in self.songs:
            self.songs.remove(song)
            return True
        return False

    def total(self):
        return len(self.songs)
```

**What to notice:** Guard `remove` - a missing song should not raise.

**Checked with:**

```python
_p = Playlist('Mix'); _p.add('A'); _p.add('B'); _p.total()   # -> 2
_p = Playlist('Mix'); _p.add('A'); _p.remove('Ghost')   # -> False
_p = Playlist('Mix'); _p.add('A'); _p.remove('A'); _p.songs   # -> []
```

---

### Q12. Point and Distance

```python
import math

class Point:
    """A 2D point that can measure distance to another point."""

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def distance_to(self, other):
        return math.sqrt((self.x - other.x) ** 2 + (self.y - other.y) ** 2)
```

**What to notice:** The method takes ANOTHER Point, so you reach into `other.x`.

**Checked with:**

```python
Point(0, 0).distance_to(Point(3, 4))   # -> 5.0
Point(1, 1).distance_to(Point(1, 1))   # -> 0.0
round(Point(0, 0).distance_to(Point(1, 1)), 4)   # -> 1.4142
```

---

## Tier 2 — Constructors, Class and Static Methods (Q13–Q24)

### Q13. Instance vs Class Attribute

```python
class Dog:
    """species is shared by the class; name belongs to each dog."""

    species = "Canis familiaris"

    def __init__(self, name):
        self.name = name
```

**What to notice:** Assigning `a.species = x` creates an instance attribute that shadows the class one.

**Checked with:**

```python
Dog("Buddy").species   # -> 'Canis familiaris'
_a = Dog("Buddy"); Dog.species = "Canis lupus"; _a.species   # -> 'Canis lupus'
Dog("Buddy").name   # -> 'Buddy'
```

---

### Q14. The Shared Mutable Trap

```python
class DogBuggy:
    """tricks is created ONCE and shared by every instance."""

    tricks = []

    def __init__(self, name):
        self.name = name

class Dog:
    """The fix: give each dog its own list in __init__."""

    def __init__(self, name):
        self.name = name
        self.tricks = []
```

**What to notice:** The class-level list is created once and shared - `a.tricks is b.tricks` is True.

**Checked with:**

```python
_a = DogBuggy("buddy"); _b = DogBuggy("max"); _a.tricks.append("roll over"); _b.tricks   # -> ['roll over']
_a = DogBuggy("x"); _b = DogBuggy("y"); _a.tricks is _b.tricks   # -> True
_a = Dog("buddy"); _b = Dog("max"); _a.tricks.append("roll over"); _b.tricks   # -> []
Dog("x").tricks is Dog("y").tricks   # -> False
```

---

### Q15. Instance Counter

```python
class Student:
    """Counts how many students have been created."""

    total_created = 0

    def __init__(self, name, roll):
        self.name = name
        self.roll = roll
        # Increment through the CLASS, not through self.
        Student.total_created = Student.total_created + 1

    @classmethod
    def count(cls):
        return cls.total_created
```

**What to notice:** Increment through the CLASS name; `self.count += 1` silently creates a per-object copy.

**Checked with:**

```python
Student.total_created = 0; [Student(n, 'R') for n in 'ABCDE']; Student.count()   # -> 5
Student.total_created = 0; Student.count()   # -> 0
```

---

### Q16. Class Method as Alternative Constructor

```python
class Book:
    """A book that can also be built from a delimited string."""

    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    @classmethod
    def from_string(cls, text):
        title, author, pages = text.split("|")
        return cls(title, author, int(pages))
```

**What to notice:** Return `cls(...)`, not the hard-coded class name, so subclasses work too.

**Checked with:**

```python
Book.from_string("Dune|Frank Herbert|412").title   # -> 'Dune'
Book.from_string("Dune|Frank Herbert|412").pages   # -> 412
type(Book.from_string("A|B|1")).__name__   # -> 'Book'
```

---

### Q17. Class Method Factory Chain

```python
from datetime import date

class Date:
    """Three ways to build the same object."""

    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, text):
        year, month, day = text.split("-")
        return cls(int(year), int(month), int(day))

    @classmethod
    def from_tuple(cls, values):
        return cls(values[0], values[1], values[2])

    @classmethod
    def today(cls):
        now = date.today()
        return cls(now.year, now.month, now.day)
```

**What to notice:** Python's answer to overloaded constructors: several named classmethods.

**Checked with:**

```python
Date.from_string("2025-03-15").year   # -> 2025
Date.from_tuple((2025, 3, 15)).month   # -> 3
Date.from_string("2025-03-15").day   # -> 15
isinstance(Date.today().year, int)   # -> True
```

---

### Q18. Static Method Utility

```python
class MathHelper:
    """Utilities that need no instance data."""

    @staticmethod
    def is_prime(n):
        if n < 2:
            return False
        i = 2
        while i * i <= n:
            if n % i == 0:
                return False
            i = i + 1
        return True

    @staticmethod
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    @staticmethod
    def is_leap_year(year):
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)
```

**What to notice:** A staticmethod takes neither `self` nor `cls` - it is namespaced, nothing more.

**Checked with:**

```python
MathHelper.is_prime(97)   # -> True
MathHelper.is_prime(1)   # -> False
MathHelper.gcd(48, 60)   # -> 12
MathHelper.is_leap_year(1900)   # -> False
MathHelper.is_leap_year(2000)   # -> True
```

---

### Q19. Distinguishing the Three Method Types

```python
class Demo:
    """One class holding all three method types."""

    label = "Demo"

    def instance_method(self):
        return f"instance, self is {type(self).__name__}"

    @classmethod
    def class_method(cls):
        return f"class, cls is {cls.__name__}"

    @staticmethod
    def static_method():
        return "static, no automatic argument"
```

**What to notice:** An instance method called on the class raises TypeError; the other two do not.

**Checked with:**

```python
Demo().instance_method()   # -> 'instance, self is Demo'
Demo.class_method()   # -> 'class, cls is Demo'
Demo.static_method()   # -> 'static, no automatic argument'
Demo().class_method()   # -> 'class, cls is Demo'
Demo.instance_method()   # raises TypeError
```

---

### Q20. Employee with ID Generation

```python
class Employee:
    """Generates sequential IDs like EMP001."""

    _counter = 0

    def __init__(self, name):
        self.name = name
        Employee._counter = Employee._counter + 1
        self.emp_id = f"EMP{Employee._counter:03d}"

    @classmethod
    def reset_counter(cls):
        cls._counter = 0
```

**What to notice:** `f"EMP{n:03d}"` does the zero padding.

**Checked with:**

```python
Employee.reset_counter(); Employee('Priya').emp_id   # -> 'EMP001'
Employee.reset_counter(); Employee('A'); Employee('B').emp_id   # -> 'EMP002'
Employee.reset_counter(); [Employee(c) for c in 'ABC']; Employee.reset_counter(); Employee('New').emp_id   # -> 'EMP001'
```

---

### Q21. Config Singleton-ish

```python
class Config:
    """Settings shared everywhere, with no instance needed."""

    _settings = {}

    @classmethod
    def set(cls, key, value):
        cls._settings[key] = value

    @classmethod
    def get(cls, key, default=None):
        return cls._settings.get(key, default)

    @classmethod
    def all(cls):
        return dict(cls._settings)
```

**What to notice:** Shared mutable state is a bug in Q14 and the whole feature here.

**Checked with:**

```python
Config._settings = {}; Config.set('debug', True); Config.get('debug')   # -> True
Config.get('missing', 'n/a')   # -> 'n/a'
Config._settings = {}; Config.set('a', 1); Config.set('b', 2); Config.all()   # -> {'a': 1, 'b': 2}
```

---

### Q22. Validating Constructor

```python
class Rectangle:
    """Rejects bad dimensions with the right kind of error."""

    def __init__(self, length, width):
        for name, value in (("length", length), ("width", width)):
            if isinstance(value, bool) or not isinstance(value, (int, float)):
                raise TypeError(f"{name} must be a number, "
                                f"got {type(value).__name__}")
            if value <= 0:
                raise ValueError(f"{name} must be positive, got {value}")
        self.length = length
        self.width = width
```

**What to notice:** Check the type first - comparing a string with `< 0` raises a confusing TypeError.

**Checked with:**

```python
Rectangle(5, 3).length   # -> 5
Rectangle("5", 3)   # raises TypeError
Rectangle(-5, 3)   # raises ValueError
Rectangle(0, 3)   # raises ValueError
```

---

### Q23. Object Equality Without Dunders

```python
class Point:
    """No __eq__, so Python compares identity instead of value."""

    def __init__(self, x, y):
        self.x = x
        self.y = y
```

**What to notice:** Without `__eq__`, Python compares identity, so two identical objects are unequal.

**Checked with:**

```python
Point(1, 2) == Point(1, 2)   # -> False
Point(1, 2) is Point(1, 2)   # -> False
_p = Point(1, 2); _p == _p   # -> True
```

---

### Q24. The `__del__` Destructor

```python
class Resource:
    """__del__ runs when the last reference disappears - eventually."""

    def __init__(self, name):
        self.name = name

    def __del__(self):
        print(f"Resource {self.name} is being destroyed")
```

**What to notice:** `del` removes one reference; `__del__` runs only when the last one goes.

**Checked with:**

```python
Resource('db').name   # -> 'db'
_r = Resource('x'); _r2 = _r; del _r; 'still alive'   # -> 'still alive'
```

---

## Tier 3 — Encapsulation and Abstraction (Q25–Q36)

### Q25. Protected Members

```python
class Account:
    """A single underscore is a convention, not a lock."""

    def __init__(self, balance):
        self._balance = balance

    def get_balance(self):
        return self._balance
```

**What to notice:** One underscore is a convention. Nothing stops you reading it.

**Checked with:**

```python
Account(100).get_balance()   # -> 100
Account(100)._balance   # -> 100
_a = Account(100); _a._balance = 999; _a.get_balance()   # -> 999
```

---

### Q26. Private Members and Name Mangling

```python
class Secret:
    """A double underscore triggers name mangling."""

    def __init__(self):
        self.__value = 42

    def reveal(self):
        return self.__value
```

**What to notice:** Two underscores mangle the name to `_ClassName__attr`.

**Checked with:**

```python
Secret().reveal()   # -> 42
Secret()._Secret__value   # -> 42
Secret().__value   # raises AttributeError
list(vars(Secret()).keys())   # -> ['_Secret__value']
```

---

### Q27. Getters and Setters

```python
class Person:
    """Explicit getter and setter - verbose, but it shows the mechanism."""

    def __init__(self, age):
        self._age = age

    def get_age(self):
        return self._age

    def set_age(self, value):
        if value < 0:
            raise ValueError("age cannot be negative")
        self._age = value
```

**What to notice:** Verbose, but it shows the mechanism that `@property` hides.

**Checked with:**

```python
Person(30).get_age()   # -> 30
_p = Person(30); _p.set_age(31); _p.get_age()   # -> 31
Person(30).set_age(-1)   # raises ValueError
```

---

### Q28. The @property Decorator

```python
class Rectangle:
    """@property turns a method into an attribute access."""

    def __init__(self, length, width):
        self.length = length
        self.width = width

    @property
    def area(self):
        return self.length * self.width
```

**What to notice:** `@property` lets you add validation later without changing any calling code.

**Checked with:**

```python
Rectangle(5, 3).area   # -> 15
_r = Rectangle(5, 3); _r.length = 10; _r.area   # -> 30
callable(Rectangle(1, 1).area)   # -> False
```

---

### Q29. Computed Property

```python
class Order:
    """A computed property can never go stale."""

    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

    @property
    def total(self):
        return self.price * self.quantity
```

**What to notice:** No setter, no stored value - it recalculates every time.

**Checked with:**

```python
Order(100, 3).total   # -> 300
_o = Order(100, 3); _o.quantity = 5; _o.total   # -> 500
_o = Order(10, 1); _o.total = 99   # raises SyntaxError
```

---

### Q30. Property with Validation Chain

```python
class Person:
    """Validation lives in the setter, so every path goes through it."""

    def __init__(self, age):
        # Assign through the PROPERTY, so __init__ is validated too.
        self.age = age

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if not isinstance(value, int) or isinstance(value, bool):
            raise TypeError("age must be an integer")
        if value < 0 or value > 150:
            raise ValueError("age must be between 0 and 150")
        self._age = value
```

**What to notice:** Assign through the property in `__init__`, or you bypass your own validation.

**Checked with:**

```python
Person(30).age   # -> 30
Person(-1)   # raises ValueError
_p = Person(30); _p.age = 200   # raises SyntaxError
Person("x")   # raises TypeError
```

---

### Q31. Temperature with Two-Way Property

```python
class Temperature:
    """One stored value, two views of it."""

    def __init__(self, celsius=0):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9 / 5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5 / 9
```

**What to notice:** The setter converts back, so both readings always agree.

**Checked with:**

```python
Temperature(37).fahrenheit   # -> 98.6
_t = Temperature(); _t.fahrenheit = 212; _t.celsius   # -> 100.0
_t = Temperature(); _t.fahrenheit = 32; _t.celsius   # -> 0.0
```

---

### Q32. Read-Only ID

```python
class User:
    """A property with no setter is genuinely read-only."""

    def __init__(self, user_id, name):
        self._user_id = user_id
        self.name = name

    @property
    def user_id(self):
        return self._user_id
```

**What to notice:** A property with no setter raises AttributeError on assignment - real enforcement.

**Checked with:**

```python
User(7, 'R').user_id   # -> 7
_u = User(7, 'R'); _u.user_id = 9   # raises SyntaxError
_u = User(7, 'R'); _u.name = 'X'; _u.name   # -> 'X'
```

---

### Q33. First Abstract Class

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    """Cannot be instantiated until every abstract method is implemented."""

    @abstractmethod
    def area(self):
        ...

    @abstractmethod
    def perimeter(self):
        ...
```

**What to notice:** The error names every abstract method you still owe.

**Checked with:**

```python
Shape()   # raises TypeError
hasattr(Shape, 'area')   # -> True
len(Shape.__abstractmethods__)   # -> 2
```

---

### Q34. Concrete Implementations

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        ...

    @abstractmethod
    def perimeter(self):
        ...

class Rectangle(Shape):
    """Concrete: implements BOTH abstract methods."""

    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

    def perimeter(self):
        return 2 * (self.length + self.width)

class Incomplete(Shape):
    """Still abstract: perimeter is missing."""

    def area(self):
        return 0
```

**What to notice:** Miss one abstract method and the class is still abstract.

**Checked with:**

```python
Rectangle(5, 3).area()   # -> 15
Rectangle(5, 3).perimeter()   # -> 16
Incomplete()   # raises TypeError
isinstance(Rectangle(1, 1), Shape)   # -> True
```

---

### Q35. Abstract with Shared Behaviour

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    """The base can hold concrete helpers that call the abstract parts."""

    @abstractmethod
    def area(self):
        ...

    def describe(self):
        return f"{type(self).__name__} with area {self.area()}"

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2
```

**What to notice:** The base defines how the pieces fit; subclasses supply the pieces.

**Checked with:**

```python
Square(4).area()   # -> 16
Square(4).describe()   # -> 'Square with area 16'
isinstance(Square(1), Shape)   # -> True
```

---

### Q36. Abstract Payment Processor

```python
from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def pay(self, amount):
        ...

class CardProcessor(PaymentProcessor):
    def pay(self, amount):
        return f"Charged {amount} to card"

class UpiProcessor(PaymentProcessor):
    def pay(self, amount):
        return f"Collected {amount} via UPI"
```

**What to notice:** One interface, several implementations, no `if type ==` anywhere.

**Checked with:**

```python
CardProcessor().pay(500)   # -> 'Charged 500 to card'
UpiProcessor().pay(500)   # -> 'Collected 500 via UPI'
[p().pay(10) for p in (CardProcessor, UpiProcessor)]   # -> ['Charged 10 to card', 'Collected 10 via UPI']
PaymentProcessor()   # raises TypeError
```

---

## Tier 4 — Inheritance (Q37–Q46)

### Q37. Single Inheritance

```python
class Animal:
    """The base class holds what every animal shares."""

    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

class Dog(Animal):
    """Inherits name and __init__; overrides only speak."""

    def speak(self):
        return "Woof!"
```

**What to notice:** `isinstance(d, Animal)` is True - a Dog IS an Animal.

**Checked with:**

```python
Dog("Buddy").name   # -> 'Buddy'
Dog("Buddy").speak()   # -> 'Woof!'
Animal("Generic").speak()   # -> 'Some sound'
isinstance(Dog("B"), Animal)   # -> True
```

---

### Q38. super() in the Constructor

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

class Employee(Person):
    """super() runs the parent's __init__ first."""

    def __init__(self, name, age, salary):
        super().__init__(name, age)
        self.salary = salary

class BrokenEmployee(Person):
    """Forgetting super() means name and age are never set."""

    def __init__(self, name, age, salary):
        self.salary = salary
```

**What to notice:** Without `super()`, the parent's attributes are never set - and it fails later, not here.

**Checked with:**

```python
Employee("Priya", 30, 75000).name   # -> 'Priya'
Employee("Priya", 30, 75000).salary   # -> 75000
BrokenEmployee("Priya", 30, 75000).salary   # -> 75000
BrokenEmployee("Priya", 30, 75000).name   # raises AttributeError
```

---

### Q39. Multilevel Inheritance

```python
class Vehicle:
    def __init__(self, brand):
        self.brand = brand

    def describe(self):
        return f"Vehicle: {self.brand}"

class Car(Vehicle):
    def __init__(self, brand, doors):
        super().__init__(brand)
        self.doors = doors

    def describe(self):
        return f"Car: {self.brand}, {self.doors} doors"

class ElectricCar(Car):
    def __init__(self, brand, doors, range_km):
        super().__init__(brand, doors)
        self.range_km = range_km

    def describe(self):
        return f"ElectricCar: {self.brand}, {self.range_km}km range"
```

**What to notice:** Python searches the MRO left to right and stops at the first match.

**Checked with:**

```python
[c.__name__ for c in ElectricCar.__mro__]   # -> ['ElectricCar', 'Car', 'Vehicle', 'object']
ElectricCar("Tesla", 4, 500).brand   # -> 'Tesla'
ElectricCar("Tesla", 4, 500).describe()   # -> 'ElectricCar: Tesla, 500km range'
```

---

### Q40. Hierarchical Inheritance

```python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def calculate_bonus(self):
        return 0.0

class Manager(Employee):
    def calculate_bonus(self):
        return self.salary * 0.20

class Developer(Employee):
    def calculate_bonus(self):
        return self.salary * 0.15

class Designer(Employee):
    def calculate_bonus(self):
        return self.salary * 0.10
```

**What to notice:** One loop calls three different implementations - that is polymorphism.

**Checked with:**

```python
Manager("A", 100000).calculate_bonus()   # -> 20000.0
Developer("B", 80000).calculate_bonus()   # -> 12000.0
Designer("C", 70000).calculate_bonus()   # -> 7000.0
sum(s.calculate_bonus() for s in [Manager("A", 100000), Developer("B", 80000), Designer("C", 70000)])   # -> 39000.0
```

---

### Q41. Multiple Inheritance and MRO

```python
class Flyer:
    def move(self):
        return "Flying"

class Swimmer:
    def move(self):
        return "Swimming"

class Duck(Flyer, Swimmer):
    """Python searches the bases left to right."""
```

**What to notice:** Swap the base classes and the answer flips. Base order is a real decision.

**Checked with:**

```python
Duck().move()   # -> 'Flying'
[c.__name__ for c in Duck.__mro__]   # -> ['Duck', 'Flyer', 'Swimmer', 'object']
```

---

### Q42. The Diamond Problem

```python
order = []

class A:
    def __init__(self):
        order.append("A")

class B(A):
    def __init__(self):
        order.append("B")
        super().__init__()

class C(A):
    def __init__(self):
        order.append("C")
        super().__init__()

class D(B, C):
    def __init__(self):
        order.append("D")
        super().__init__()
```

**What to notice:** `A.__init__` runs exactly ONCE, because `super()` follows the linear MRO.

**Checked with:**

```python
order.clear(); D(); order   # -> ['D', 'B', 'C', 'A']
order.clear(); D(); order.count('A')   # -> 1
[c.__name__ for c in D.__mro__]   # -> ['D', 'B', 'C', 'A', 'object']
```

---

### Q43. Method Overriding vs Extending

```python
class Parent:
    def replaced(self):
        return "Parent version"

    def extended(self):
        return "Parent version"

class Child(Parent):
    def replaced(self):
        """Ignores the parent entirely."""
        return "Child only"

    def extended(self):
        """Builds on the parent's result."""
        return super().extended() + " then Child addition"
```

**What to notice:** The only difference is whether the override calls `super()`.

**Checked with:**

```python
Child().replaced()   # -> 'Child only'
Child().extended()   # -> 'Parent version then Child addition'
Parent().replaced()   # -> 'Parent version'
```

---

### Q44. isinstance vs type

```python
class Vehicle:
    pass

class Car(Vehicle):
    pass

class ElectricCar(Car):
    pass
```

**What to notice:** `type(x) == C` rejects every subclass, which breaks the moment someone extends you.

**Checked with:**

```python
isinstance(ElectricCar(), Vehicle)   # -> True
isinstance(ElectricCar(), ElectricCar)   # -> True
type(ElectricCar()) == Vehicle   # -> False
type(ElectricCar()) == ElectricCar   # -> True
```

---

### Q45. Composition Over Inheritance

```python
class Engine:
    """A part, not a parent."""

    def __init__(self, horsepower):
        self.horsepower = horsepower

    def start(self):
        return f"Engine with {self.horsepower}hp started"

class Car:
    """A Car HAS an Engine - it is not one."""

    def __init__(self, brand, engine):
        self.brand = brand
        self.engine = engine

    def start(self):
        return self.engine.start()
```

**What to notice:** A Car HAS an Engine, so `isinstance(car, Engine)` is False.

**Checked with:**

```python
Car('Tesla', Engine(150)).engine.horsepower   # -> 150
Car('Tesla', Engine(150)).start()   # -> 'Engine with 150hp started'
isinstance(Car('Tesla', Engine(150)), Engine)   # -> False
```

---

### Q46. Shape Hierarchy with Abstract Base

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        ...

class Rectangle(Shape):
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

class Square(Rectangle):
    """A square keeps both sides equal through one property."""

    def __init__(self, side):
        super().__init__(side, side)

    @property
    def side(self):
        return self.length

    @side.setter
    def side(self, value):
        self.length = value
        self.width = value
```

**What to notice:** The `side` setter writes BOTH dimensions, so the square stays square.

**Checked with:**

```python
Square(5).area()   # -> 25
_s = Square(5); _s.side = 7; (_s.length, _s.width)   # -> [7, 7]
_s = Square(5); _s.side = 7; _s.area()   # -> 49
isinstance(Square(1), Shape)   # -> True
```

---

## Tier 5 — Polymorphism and Magic Methods (Q47–Q56)

### Q47. Duck Typing

```python
class Duck:
    def speak(self):
        return "Quack!"

class Robot:
    def speak(self):
        return "BEEP BOOP"

class Person:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"Hello, I am {self.name}"
```

**What to notice:** No base class, no interface - Python just looks for the method at call time.

**Checked with:**

```python
[t.speak() for t in [Duck(), Robot(), Person("Rohan")]]   # -> ['Quack!', 'BEEP BOOP', 'Hello, I am Rohan']
issubclass(Robot, Duck)   # -> False
```

---

### Q48. Operator Overloading — Addition

```python
class Vector2D:
    """Operator overloading returns NEW objects."""

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector2D(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector2D(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        return Vector2D(self.x * scalar, self.y * scalar)

    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)
```

**What to notice:** Return a NEW object, matching how `+` behaves for every built-in type.

**Checked with:**

```python
(Vector2D(2, 3) + Vector2D(4, 1)).x   # -> 6
(Vector2D(2, 3) + Vector2D(4, 1)).y   # -> 4
(Vector2D(2, 3) * 3).x   # -> 6
(Vector2D(5, 5) - Vector2D(1, 2)).y   # -> 3
```

---

### Q49. `__str__` vs `__repr__`

```python
class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        """For humans."""
        return f"({self.x}, {self.y})"

    def __repr__(self):
        """For developers - should look like the constructor call."""
        return f"Vector2D(x={self.x}, y={self.y})"
```

**What to notice:** If you define only one, define `__repr__` - `str()` falls back to it.

**Checked with:**

```python
str(Vector2D(2, 3))   # -> '(2, 3)'
repr(Vector2D(2, 3))   # -> 'Vector2D(x=2, y=3)'
f'{Vector2D(2, 3)}'   # -> '(2, 3)'
```

---

### Q50. Comparison Dunders

```python
from functools import total_ordering

@total_ordering
class Money:
    """total_ordering fills in the other four comparisons."""

    def __init__(self, amount):
        self.amount = amount

    def __eq__(self, other):
        return self.amount == other.amount

    def __lt__(self, other):
        return self.amount < other.amount

    def __repr__(self):
        return f"Money({self.amount})"
```

**What to notice:** `total_ordering` fills in the other four from `__eq__` plus `__lt__`.

**Checked with:**

```python
Money(10) < Money(20)   # -> True
Money(30) >= Money(30)   # -> True
Money(10) > Money(20)   # -> False
[m.amount for m in sorted([Money(30), Money(10), Money(20)])]   # -> [10, 20, 30]
```

---

### Q51. `__len__` and `__getitem__`

```python
class Playlist:
    """Delegating to the inner list gives indexing and slicing for free."""

    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        return len(self.songs)

    def __getitem__(self, index):
        return self.songs[index]
```

**What to notice:** Delegating to the inner list gives integers, negatives, slices and iteration free.

**Checked with:**

```python
len(Playlist(['A', 'B', 'C', 'D']))   # -> 4
Playlist(['A', 'B', 'C', 'D'])[0]   # -> 'A'
Playlist(['A', 'B', 'C', 'D'])[-1]   # -> 'D'
Playlist(['A', 'B', 'C', 'D'])[1:3]   # -> ['B', 'C']
[s for s in Playlist(['A', 'B'])]   # -> ['A', 'B']
```

---

### Q52. `__contains__`

```python
class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __contains__(self, item):
        """`in` calls this. Lowercase both sides for a fair comparison."""
        return any(song.lower() == item.lower() for song in self.songs)
```

**What to notice:** Without `__contains__`, `in` falls back to iterating and comparing exactly.

**Checked with:**

```python
'song a' in Playlist(['Song A', 'Song B'])   # -> True
'SONG A' in Playlist(['Song A', 'Song B'])   # -> True
'Ghost' in Playlist(['Song A', 'Song B'])   # -> False
```

---

### Q53. `__call__`

```python
class Multiplier:
    """__call__ makes an instance behave like a function."""

    def __init__(self, factor):
        self.factor = factor

    def __call__(self, value):
        return value * self.factor
```

**What to notice:** A closure is lighter; a callable object can carry state and expose other methods.

**Checked with:**

```python
Multiplier(2)(15)   # -> 30
_d = Multiplier(3); _d(7)   # -> 21
callable(Multiplier(2))   # -> True
```

---

### Q54. Context Manager with `__enter__` / `__exit__`

```python
class FileManager:
    """__enter__ returns what `as` binds; __exit__ always runs."""

    def __init__(self, path, mode):
        self.path = path
        self.mode = mode
        self.handle = None

    def __enter__(self):
        print(f"entering: opening {self.path}")
        self.handle = open(self.path, self.mode)
        return self.handle

    def __exit__(self, exc_type, exc_value, traceback):
        print(f"exiting: closing {self.path}")
        if self.handle:
            self.handle.close()
        return False
```

**What to notice:** `__enter__` returns what `as` binds - returning `self` instead is the usual slip.

**Checked with:**

```python
_w()   # -> 'hello'
_closed()   # -> True
_exit_runs_on_error()   # -> True
```

---

### Q55. `__hash__` and Set Membership

```python
class Point:
    """Defining __eq__ sets __hash__ to None, so define both."""

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)

    def __hash__(self):
        return hash((self.x, self.y))

class Unhashable:
    def __init__(self, x):
        self.x = x

    def __eq__(self, other):
        return self.x == other.x
```

**What to notice:** Defining `__eq__` sets `__hash__` to None, so you must define both.

**Checked with:**

```python
len({Point(1, 2), Point(1, 2), Point(3, 4)})   # -> 2
Point(1, 2) == Point(1, 2)   # -> True
{Unhashable(1)}   # raises TypeError
Unhashable.__hash__ is None   # -> True
```

---

### Q56. Full-Featured Class

```python
class Matrix:
    """A small matrix type with validation in every operation."""

    def __init__(self, rows):
        self.rows = rows

    def __str__(self):
        return "\n".join(" ".join(str(v) for v in row) for row in self.rows)

    def __repr__(self):
        return f"Matrix({self.rows})"

    def __len__(self):
        return len(self.rows)

    def __getitem__(self, index):
        return self.rows[index]

    def __eq__(self, other):
        return self.rows == other.rows

    def __add__(self, other):
        if len(self.rows) != len(other.rows) or len(self.rows[0]) != len(other.rows[0]):
            raise ValueError("shapes differ - cannot add")
        return Matrix([[a + b for a, b in zip(r1, r2)]
                       for r1, r2 in zip(self.rows, other.rows)])

    def __sub__(self, other):
        if len(self.rows) != len(other.rows) or len(self.rows[0]) != len(other.rows[0]):
            raise ValueError("shapes differ - cannot subtract")
        return Matrix([[a - b for a, b in zip(r1, r2)]
                       for r1, r2 in zip(self.rows, other.rows)])

    def __mul__(self, other):
        if len(self.rows[0]) != len(other.rows):
            raise ValueError(f"cannot multiply {len(self.rows)}x{len(self.rows[0])} "
                             f"by {len(other.rows)}x{len(other.rows[0])}")
        result = []
        for i in range(len(self.rows)):
            row = []
            for j in range(len(other.rows[0])):
                total = 0
                for k in range(len(other.rows)):
                    total = total + self.rows[i][k] * other.rows[k][j]
                row.append(total)
            result.append(row)
        return Matrix(result)
```

**What to notice:** Build `__str__` first; you will read its output constantly while debugging.

**Checked with:**

```python
(Matrix([[1, 2], [3, 4]]) * Matrix([[5, 6], [7, 8]])).rows   # -> [[19, 22], [43, 50]]
(Matrix([[1, 2]]) + Matrix([[3, 4]])).rows   # -> [[4, 6]]
str(Matrix([[1, 2], [3, 4]]))   # -> '1 2\n3 4'
len(Matrix([[1], [2], [3]]))   # -> 3
Matrix([[1]]) * Matrix([[1, 2], [3, 4]])   # raises ValueError
```

---

## Tier 6 — Complete System Design (Q57–Q60)

### Q57. Library Management System

*Not automatically graded — A full system with several interacting classes. Build it class by class and test each one as you go - the grader cannot judge a whole design.*

---

### Q58. E-Commerce Order System

*Not automatically graded — A complete order system. Let each OrderItem compute its own line total and have Order simply sum them.*

---

### Q59. Employee Payroll System

*Not automatically graded — A payroll hierarchy. Make the base `calculate_pay()` abstract so a new employee type cannot be added without implementing it.*

---

### Q60. Design Your Own System

*Not automatically graded — Your own design. Write the class names and one sentence each BEFORE any code; if a class needs more than one sentence, split it.*

---

[← Questions](questions.md) · [Test runner](tests/README.md) · [Phase 4 index](README.md)
