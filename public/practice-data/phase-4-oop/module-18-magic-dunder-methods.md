# Module 18: Special (Magic/Dunder) Methods

## What are Magic Methods?

**Magic methods** (also called **dunder methods**, short for "double underscore") are special methods that Python calls automatically in response to certain operations.

They always start and end with two underscores: `__init__`, `__str__`, `__len__`.

You never call them directly. Python calls them for you:

| You write | Python calls |
| --- | --- |
| `Student("Mahesh")` | `Student.__init__(obj, "Mahesh")` |
| `print(obj)` | `obj.__str__()` |
| `len(obj)` | `obj.__len__()` |
| `obj1 + obj2` | `obj1.__add__(obj2)` |
| `obj[0]` | `obj.__getitem__(0)` |
| `obj()` | `obj.__call__()` |
| `for x in obj` | `obj.__iter__()` |
| `"x" in obj` | `obj.__contains__("x")` |

### Why they matter

Magic methods let your own classes behave like **built-in types**. Instead of `my_list.get_item(0)`, you write `my_list[0]`. Your class feels natural to anyone who knows Python.

```python
class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        return len(self.songs)

    def __getitem__(self, index):
        return self.songs[index]

    def __str__(self):
        return f"Playlist with {len(self.songs)} songs"

p = Playlist(["Song A", "Song B", "Song C"])

print(p)            # Playlist with 3 songs
print(len(p))       # 3
print(p[0])         # Song A
for song in p:
    print(song)     # works because of __getitem__
```

> 💡 Dunder methods are the reason Python feels consistent. `len()` works on strings, lists, dicts, and your custom class — all through the same `__len__` protocol.
>

---

## `__str__()`

`__str__()` defines the **readable, user-friendly** string version of your object. It is what `print()` and `str()` use.

### Without it

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

s = Student("Mahesh", 85)
print(s)        # <__main__.Student object at 0x7f8b1c0d5f10>
```

Useless output.

### With it

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def __str__(self):
        return f"Student: {self.name}, Marks: {self.marks}"

s = Student("Mahesh", 85)

print(s)          # Student: Mahesh, Marks: 85
print(str(s))     # Student: Mahesh, Marks: 85
print(f"{s}")     # Student: Mahesh, Marks: 85
```

### Rules

- It must **return a string**, not print one.
- Keep it readable for end users.

```python
# Wrong
def __str__(self):
    print(f"Student: {self.name}")     # ❌ returns None

# Wrong
def __str__(self):
    return self.marks                  # ❌ TypeError: must return str

# Correct
def __str__(self):
    return f"Student: {self.name}"
```

---

## `__repr__()`

`__repr__()` defines the **unambiguous, developer-facing** representation. It is what you see in the interactive shell and inside containers.

Ideally it should look like valid Python code that could recreate the object.

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def __repr__(self):
        return f"Student('{self.name}', {self.marks})"

s = Student("Mahesh", 85)

print(repr(s))       # Student('Mahesh', 85)
print(s)             # Student('Mahesh', 85)  ← falls back to __repr__
print([s])           # [Student('Mahesh', 85)] ← containers use __repr__
```

### `__str__` vs `__repr__`

| `__str__` | `__repr__` |
| --- | --- |
| For **end users** | For **developers** |
| Readable and friendly | Unambiguous and precise |
| Used by `print()`, `str()`, f-strings | Used by `repr()`, the REPL, containers |
| Falls back to `__repr__` if missing | Falls back to the default `<object at 0x...>` |

### Both together

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def __str__(self):
        return f"{self.name} scored {self.marks}"

    def __repr__(self):
        return f"Student(name='{self.name}', marks={self.marks})"

s = Student("Mahesh", 85)

print(s)             # Mahesh scored 85              ← __str__
print(repr(s))       # Student(name='Mahesh', marks=85) ← __repr__

students = [Student("Mahesh", 85), Student("Priya", 92)]
print(students)      # [Student(name='Mahesh', marks=85), Student(name='Priya', marks=92)]
```

Notice that printing a **list** shows `__repr__`, not `__str__`. This is why defining `__repr__` is so valuable when debugging.

> 💡 If you only write one, write `__repr__`. It works as a fallback for `__str__`, and it helps you in every debugging session.
>

---

## `__len__()`

`__len__()` makes `len()` work on your object. It must return a **non-negative integer**.

```python
class Team:
    def __init__(self, members):
        self.members = members

    def __len__(self):
        return len(self.members)

team = Team(["Mahesh", "Priya", "Ravi"])
print(len(team))      # 3
```

### It also affects truthiness

If `__bool__` is not defined, Python uses `__len__` to decide if the object is truthy.

```python
class Cart:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)

    def __len__(self):
        return len(self.items)

cart = Cart()

if not cart:
    print("Cart is empty")      # Cart is empty  ← len() == 0 means False

cart.add("Laptop")

if cart:
    print("Cart has items")     # Cart has items
```

### Explicit `__bool__`

```python
class Account:
    def __init__(self, balance):
        self.balance = balance

    def __bool__(self):
        return self.balance > 0

a1 = Account(1000)
a2 = Account(0)

print(bool(a1))     # True
print(bool(a2))     # False

if a1:
    print("Account is active")
```

`__bool__` takes priority over `__len__` when both exist.

---

## `__add__()`

`__add__()` defines what `+` does for your objects.

```python
class Money:
    def __init__(self, amount):
        self.amount = amount

    def __add__(self, other):
        return Money(self.amount + other.amount)

    def __str__(self):
        return f"₹{self.amount}"

m1 = Money(500)
m2 = Money(300)

print(m1 + m2)      # ₹800
```

### The full arithmetic family

```python
class Number:
    def __init__(self, value):
        self.value = value

    def __add__(self, other):
        return Number(self.value + other.value)

    def __sub__(self, other):
        return Number(self.value - other.value)

    def __mul__(self, other):
        return Number(self.value * other.value)

    def __truediv__(self, other):
        if other.value == 0:
            raise ZeroDivisionError("Cannot divide by zero")
        return Number(self.value / other.value)

    def __floordiv__(self, other):
        return Number(self.value // other.value)

    def __mod__(self, other):
        return Number(self.value % other.value)

    def __pow__(self, other):
        return Number(self.value ** other.value)

    def __str__(self):
        return str(self.value)

a = Number(10)
b = Number(3)

print(a + b)     # 13
print(a - b)     # 7
print(a * b)     # 30
print(a / b)     # 3.3333333333333335
print(a // b)    # 3
print(a % b)     # 1
print(a ** b)    # 1000
```

### Arithmetic dunder reference

| Operator | Method |
| --- | --- |
| `+` | `__add__` |
| `-` | `__sub__` |
| `*` | `__mul__` |
| `/` | `__truediv__` |
| `//` | `__floordiv__` |
| `%` | `__mod__` |
| `**` | `__pow__` |
| `-a` | `__neg__` |
| `+a` | `__pos__` |
| `abs(a)` | `__abs__` |
| `round(a)` | `__round__` |

---

## `__eq__()`

`__eq__()` defines what `==` means for your objects.

### Without it, Python compares memory addresses

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p1 = Point(1, 2)
p2 = Point(1, 2)

print(p1 == p2)     # False — different objects
print(p1 is p2)     # False
```

### With it

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = Point(3, 4)

print(p1 == p2)     # True
print(p1 == p3)     # False
print(p1 != p2)     # False — __ne__ is derived automatically
print(p1 is p2)     # False — still different objects
```

### `__eq__` and `__hash__`

Defining `__eq__` automatically sets `__hash__ = None`, making your object unhashable.

```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

p = Point(1, 2)
s = {p}     # ❌ TypeError: unhashable type: 'Point'
```

Add `__hash__` back if you need sets or dictionary keys:

```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

points = {Point(1, 2), Point(1, 2), Point(3, 4)}
print(points)       # {Point(1, 2), Point(3, 4)}  ← duplicates removed
```

The rule: **objects that are equal must have the same hash.**

---

## `__lt__()`

`__lt__()` defines `<`. It also enables `sorted()`, `min()`, and `max()`.

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def __lt__(self, other):
        return self.marks < other.marks

    def __repr__(self):
        return f"{self.name}({self.marks})"

students = [Student("Mahesh", 85), Student("Priya", 92), Student("Ravi", 78)]

print(sorted(students))            # [Ravi(78), Mahesh(85), Priya(92)]
print(min(students))               # Ravi(78)
print(max(students))               # Priya(92)
print(students[0] < students[1])   # True
```

### All comparison methods

```python
class Version:
    def __init__(self, major, minor):
        self.major = major
        self.minor = minor

    def _key(self):
        return (self.major, self.minor)

    def __eq__(self, other):
        return self._key() == other._key()

    def __lt__(self, other):
        return self._key() < other._key()

    def __le__(self, other):
        return self._key() <= other._key()

    def __gt__(self, other):
        return self._key() > other._key()

    def __ge__(self, other):
        return self._key() >= other._key()

    def __str__(self):
        return f"v{self.major}.{self.minor}"

v1 = Version(2, 5)
v2 = Version(3, 0)

print(v1 < v2)     # True
print(v1 > v2)     # False
print(v1 <= v2)    # True
print(v1 == v2)    # False
```

### The shortcut: `@total_ordering`

```python
from functools import total_ordering

@total_ordering
class Version:
    def __init__(self, major, minor):
        self.major, self.minor = major, minor

    def __eq__(self, other):
        return (self.major, self.minor) == (other.major, other.minor)

    def __lt__(self, other):
        return (self.major, self.minor) < (other.major, other.minor)

v1 = Version(2, 5)
v2 = Version(3, 0)

print(v1 < v2)     # True
print(v1 >= v2)    # False  ← generated automatically
print(v1 <= v2)    # True   ← generated automatically
```

### Comparison dunder reference

| Operator | Method |
| --- | --- |
| `==` | `__eq__` |
| `!=` | `__ne__` |
| `<` | `__lt__` |
| `<=` | `__le__` |
| `>` | `__gt__` |
| `>=` | `__ge__` |

---

## `__getitem__()`

`__getitem__()` makes your object support **indexing** with square brackets: `obj[key]`.

```python
class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __getitem__(self, index):
        return self.songs[index]

p = Playlist(["Song A", "Song B", "Song C"])

print(p[0])      # Song A
print(p[-1])     # Song C
print(p[0:2])    # ['Song A', 'Song B']  ← slicing works too
```

### It also enables iteration

If `__iter__` is not defined, Python falls back to calling `__getitem__` with 0, 1, 2, ... until `IndexError`.

```python
for song in p:
    print(song)
```

Output:

```
Song A
Song B
Song C
```

### The full container protocol

```python
class Inventory:
    def __init__(self):
        self.items = {}

    def __getitem__(self, key):
        return self.items[key]

    def __setitem__(self, key, value):
        self.items[key] = value

    def __delitem__(self, key):
        del self.items[key]

    def __contains__(self, key):
        return key in self.items

    def __len__(self):
        return len(self.items)

    def __iter__(self):
        return iter(self.items)

    def __str__(self):
        return str(self.items)

inv = Inventory()

inv["laptop"] = 5              # __setitem__
inv["mouse"] = 20              # __setitem__

print(inv["laptop"])           # 5      ← __getitem__
print("mouse" in inv)          # True   ← __contains__
print("keyboard" in inv)       # False
print(len(inv))                # 2      ← __len__

for item in inv:               # __iter__
    print(item, "→", inv[item])

del inv["mouse"]               # __delitem__
print(inv)                     # {'laptop': 5}
```

Output:

```
5
True
False
2
laptop → 5
mouse → 20
{'laptop': 5}
```

### Handling errors properly

```python
class SafeList:
    def __init__(self, items):
        self.items = items

    def __getitem__(self, index):
        if not isinstance(index, int):
            raise TypeError("Index must be an integer")
        if index >= len(self.items):
            raise IndexError("Index out of range")
        return self.items[index]

s = SafeList([1, 2, 3])
print(s[1])        # 2

try:
    print(s[10])
except IndexError as e:
    print("Error:", e)     # Error: Index out of range
```

---

## `__call__()`

`__call__()` makes an **object callable like a function**.

```python
class Greeter:
    def __init__(self, greeting):
        self.greeting = greeting

    def __call__(self, name):
        return f"{self.greeting}, {name}!"

hello = Greeter("Hello")
namaste = Greeter("Namaste")

print(hello("Mahesh"))       # Hello, Mahesh!
print(namaste("Priya"))      # Namaste, Priya!

print(callable(hello))       # True
```

The object `hello` behaves like a function, but it also **remembers state** (`self.greeting`).

### A multiplier factory

```python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, value):
        return value * self.factor

double = Multiplier(2)
triple = Multiplier(3)

print(double(5))      # 10
print(triple(5))      # 15

print(list(map(double, [1, 2, 3, 4])))    # [2, 4, 6, 8]
```

### A counter that remembers

```python
class Counter:
    def __init__(self):
        self.count = 0

    def __call__(self):
        self.count += 1
        return self.count

c = Counter()
print(c())     # 1
print(c())     # 2
print(c())     # 3
print(c.count) # 3
```

A plain function cannot do this cleanly — the object holds the state.

### A validator

```python
class RangeValidator:
    def __init__(self, minimum, maximum):
        self.minimum = minimum
        self.maximum = maximum

    def __call__(self, value):
        if not self.minimum <= value <= self.maximum:
            raise ValueError(f"Value must be between {self.minimum} and {self.maximum}")
        return value

validate_marks = RangeValidator(0, 100)
validate_age = RangeValidator(0, 150)

print(validate_marks(85))     # 85

try:
    validate_marks(150)
except ValueError as e:
    print("Error:", e)        # Error: Value must be between 0 and 100
```

---

## Other Common Magic Methods

### Object lifecycle

| Method | Triggered by | Purpose |
| --- | --- | --- |
| `__new__` | Object creation | Creates the instance |
| `__init__` | `Class()` | Initialises the instance |
| `__del__` | `del obj` | Cleanup before destruction |

### String and conversion

| Method | Triggered by | Purpose |
| --- | --- | --- |
| `__str__` | `print()`, `str()` | Readable text |
| `__repr__` | `repr()`, REPL | Developer text |
| `__format__` | `f"{obj:spec}"` | Custom formatting |
| `__int__` | `int(obj)` | Convert to integer |
| `__float__` | `float(obj)` | Convert to float |
| `__bool__` | `bool(obj)`, `if obj` | Truthiness |
| `__hash__` | `hash(obj)`, sets | Hash value |

### `__format__` example

```python
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    def __format__(self, spec):
        if spec == "F":
            return f"{self.celsius * 9 / 5 + 32:.1f}°F"
        elif spec == "K":
            return f"{self.celsius + 273.15:.2f}K"
        return f"{self.celsius}°C"

    def __str__(self):
        return f"{self.celsius}°C"

t = Temperature(25)

print(f"{t}")        # 25°C
print(f"{t:F}")      # 77.0°F
print(f"{t:K}")      # 298.15K
```

### Container methods

| Method | Triggered by |
| --- | --- |
| `__len__` | `len(obj)` |
| `__getitem__` | `obj[key]` |
| `__setitem__` | `obj[key] = value` |
| `__delitem__` | `del obj[key]` |
| `__contains__` | `x in obj` |
| `__iter__` | `for x in obj` |
| `__next__` | `next(obj)` |
| `__reversed__` | `reversed(obj)` |

### Building a proper iterator

```python
class Countdown:
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        self.current = self.start
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

for n in Countdown(5):
    print(n, end=" ")     # 5 4 3 2 1
```

### Attribute access

| Method | Triggered by |
| --- | --- |
| `__getattr__` | Accessing a **missing** attribute |
| `__getattribute__` | Accessing **any** attribute |
| `__setattr__` | `obj.x = value` |
| `__delattr__` | `del obj.x` |

```python
class FlexibleConfig:
    def __init__(self, **settings):
        self.__dict__.update(settings)

    def __getattr__(self, name):
        # only called when the attribute is NOT found normally
        return f"<'{name}' is not configured>"

config = FlexibleConfig(host="localhost", port=8080)

print(config.host)        # localhost
print(config.port)        # 8080
print(config.timeout)     # <'timeout' is not configured>
```

### Context manager methods

`__enter__` and `__exit__` make your object work with `with`.

```python
class DatabaseConnection:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"Connecting to {self.name}...")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print(f"Closing connection to {self.name}")
        return False       # False lets exceptions propagate

    def query(self, sql):
        print(f"Running: {sql}")

with DatabaseConnection("MyDB") as db:
    db.query("SELECT * FROM students")
```

Output:

```
Connecting to MyDB...
Running: SELECT * FROM students
Closing connection to MyDB
```

The `__exit__` runs even if an error occurs inside the block — this is exactly how `open()` works.

### A timer context manager

```python
import time

class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, *args):
        self.elapsed = time.time() - self.start
        print(f"Took {self.elapsed:.4f} seconds")

with Timer():
    total = sum(range(1_000_000))
```

---

## A Class Using Many Magic Methods

```python
class ShoppingCart:
    def __init__(self):
        self.items = {}

    def __setitem__(self, product, quantity):
        self.items[product] = quantity

    def __getitem__(self, product):
        return self.items.get(product, 0)

    def __delitem__(self, product):
        del self.items[product]

    def __contains__(self, product):
        return product in self.items

    def __len__(self):
        return sum(self.items.values())

    def __iter__(self):
        return iter(self.items.items())

    def __bool__(self):
        return len(self.items) > 0

    def __add__(self, other):
        combined = ShoppingCart()
        for product, qty in self.items.items():
            combined[product] = qty
        for product, qty in other.items.items():
            combined[product] = combined[product] + qty
        return combined

    def __str__(self):
        if not self.items:
            return "Cart is empty"
        lines = [f"  {p} x{q}" for p, q in self.items.items()]
        return "Cart:\n" + "\n".join(lines)

    def __repr__(self):
        return f"ShoppingCart({self.items})"

cart1 = ShoppingCart()
cart1["Laptop"] = 1
cart1["Mouse"] = 2

cart2 = ShoppingCart()
cart2["Mouse"] = 3
cart2["Keyboard"] = 1

print(cart1)
print()
print("Total items in cart1:", len(cart1))
print("Has Laptop?", "Laptop" in cart1)
print("Mouse quantity:", cart1["Mouse"])
print()

merged = cart1 + cart2
print(merged)
print()
print("Is merged cart non-empty?", bool(merged))
print(repr(merged))
```

Output:

```
Cart:
  Laptop x1
  Mouse x2

Total items in cart1: 3
Has Laptop? True
Mouse quantity: 2

Cart:
  Laptop x1
  Mouse x5
  Keyboard x1

Is merged cart non-empty? True
ShoppingCart({'Laptop': 1, 'Mouse': 5, 'Keyboard': 1})
```

---

## Common Mistakes

### 1. Printing instead of returning in `__str__`

```python
# Wrong
def __str__(self):
    print(f"Student: {self.name}")     # ❌ returns None → TypeError

# Correct
def __str__(self):
    return f"Student: {self.name}"
```

### 2. Returning a non-string from `__str__`

```python
# Wrong
def __str__(self):
    return self.marks        # ❌ TypeError: __str__ returned non-string

# Correct
def __str__(self):
    return str(self.marks)
```

### 3. `__len__` returning a negative or non-integer

```python
# Wrong
def __len__(self):
    return -1               # ❌ ValueError: __len__() should return >= 0

def __len__(self):
    return 3.5              # ❌ TypeError: 'float' object cannot be interpreted as an integer
```

### 4. Forgetting `__hash__` after `__eq__`

```python
class Point:
    def __eq__(self, other): ...
    # object becomes unhashable → cannot be used in a set or as a dict key
```

### 5. Infinite recursion in `__getattr__`

```python
# Wrong
class Demo:
    def __getattr__(self, name):
        return self.name         # ❌ triggers __getattr__ again → RecursionError

# Correct
class Demo:
    def __getattr__(self, name):
        raise AttributeError(f"No attribute named {name}")
```

### 6. Infinite recursion in `__setattr__`

```python
# Wrong
class Demo:
    def __setattr__(self, name, value):
        self.name = value            # ❌ calls __setattr__ again forever

# Correct
class Demo:
    def __setattr__(self, name, value):
        super().__setattr__(name, value)
        # or: self.__dict__[name] = value
```

### 7. Assuming `other` is the same type

```python
# Wrong
def __eq__(self, other):
    return self.x == other.x     # ❌ AttributeError when comparing to an int

# Correct
def __eq__(self, other):
    if not isinstance(other, Point):
        return NotImplemented
    return self.x == other.x
```

---

## Quick Reference

| Category | Method | Triggered by |
| --- | --- | --- |
| **Lifecycle** | `__new__` | Object creation |
| | `__init__` | `Class()` |
| | `__del__` | `del obj` |
| **String** | `__str__` | `print()`, `str()` |
| | `__repr__` | `repr()`, REPL, containers |
| | `__format__` | `f"{obj:spec}"` |
| **Arithmetic** | `__add__` | `a + b` |
| | `__sub__` | `a - b` |
| | `__mul__` | `a * b` |
| | `__truediv__` | `a / b` |
| | `__neg__` | `-a` |
| | `__abs__` | `abs(a)` |
| **Comparison** | `__eq__` | `a == b` |
| | `__lt__` | `a < b` |
| | `__gt__` | `a > b` |
| | `__hash__` | `hash(a)`, sets |
| **Container** | `__len__` | `len(obj)` |
| | `__getitem__` | `obj[key]` |
| | `__setitem__` | `obj[key] = v` |
| | `__delitem__` | `del obj[key]` |
| | `__contains__` | `x in obj` |
| | `__iter__` | `for x in obj` |
| | `__next__` | `next(obj)` |
| **Callable** | `__call__` | `obj()` |
| **Truthiness** | `__bool__` | `bool(obj)`, `if obj` |
| **Context** | `__enter__` | `with obj:` |
| | `__exit__` | End of `with` block |
| **Attributes** | `__getattr__` | Missing attribute |
| | `__setattr__` | `obj.x = v` |
