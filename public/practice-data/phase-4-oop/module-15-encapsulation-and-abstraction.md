# Module 15: Encapsulation and Abstraction

## What is Encapsulation?

**Encapsulation** means bundling data and the methods that work on that data into one unit (a class), and **restricting direct access** to some of that data.

Think of a **medicine capsule**: the powder inside is wrapped in a shell. You swallow the capsule; you do not handle the powder directly.

### Why restrict access?

Without protection, anyone can put your object into an invalid state:

```python
class BankAccount:
    def __init__(self, balance):
        self.balance = balance

acc = BankAccount(1000)
acc.balance = -50000        # ❌ nothing stops this nonsense
print(acc.balance)          # -50000
```

With encapsulation, the class controls every change:

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit must be positive")
            return
        self.__balance += amount

    def get_balance(self):
        return self.__balance

acc = BankAccount(1000)
acc.deposit(-500)            # Deposit must be positive
print(acc.get_balance())     # 1000 — still valid
```

### Benefits

- **Data protection**: Invalid values are rejected.
- **Validation**: Every change passes through your rules.
- **Flexibility**: You can change the internals without breaking other code.
- **Clear interface**: Users of your class see only what they need.

---

## Access Modifiers in Python

Python does not have real `private` or `protected` keywords like Java or C++. Instead it uses **naming conventions** with underscores.

| Type | Syntax | Meaning | Enforced? |
| --- | --- | --- | --- |
| **Public** | `name` | Anyone can use it | — |
| **Protected** | `_name` | Internal use; subclasses may use it | ❌ Convention only |
| **Private** | `__name` | Internal to this class only | ⚠️ Name mangling |

> 💡 Python's philosophy is "we are all consenting adults here". Nothing is truly locked. The underscores tell other programmers what they *should* touch, and Python trusts them.
>

---

## Public Members

**Public** members have no underscore. They can be accessed and changed from anywhere. This is the default.

```python
class Student:
    def __init__(self, name, marks):
        self.name = name        # public
        self.marks = marks      # public

    def display(self):          # public method
        print(f"{self.name}: {self.marks}")

s = Student("Mahesh", 85)

print(s.name)      # Mahesh — accessible
s.marks = 90       # modifiable
s.display()        # Mahesh: 90
```

Use public for data that genuinely has no rules attached to it.

---

## Protected Members

**Protected** members start with a **single underscore** `_`. This is a signal: *"this is internal — do not use it from outside, but subclasses may."*

Python does **not** enforce it. You can still access it, but you are breaking an agreement.

```python
class Employee:
    def __init__(self, name, salary):
        self.name = name           # public
        self._salary = salary      # protected

    def _calculate_bonus(self):    # protected method
        return self._salary * 0.1

    def show(self):
        print(f"{self.name} earns {self._salary}, bonus {self._calculate_bonus()}")

e = Employee("Mahesh", 50000)
e.show()

print(e._salary)     # 50000 — works, but you shouldn't do this
```

Output:

```
Mahesh earns 50000, bonus 5000.0
50000
```

### Protected members and inheritance

The real purpose is to share with subclasses.

```python
class Vehicle:
    def __init__(self, brand):
        self._brand = brand          # protected
        self._speed = 0

    def _accelerate(self, amount):
        self._speed += amount

class Car(Vehicle):
    def drive(self):
        self._accelerate(60)         # ✅ subclass uses the protected member
        print(f"{self._brand} is driving at {self._speed} km/h")

c = Car("Toyota")
c.drive()      # Toyota is driving at 60 km/h
```

---

## Private Members

**Private** members start with **two underscores** `__` (and do not end with two). Python applies **name mangling** to make them hard to reach from outside.

```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner              # public
        self.__balance = balance        # private

    def __log(self, message):           # private method
        print(f"[LOG] {message}")

    def deposit(self, amount):
        self.__balance += amount
        self.__log(f"Deposited {amount}")

    def get_balance(self):
        return self.__balance

acc = BankAccount("Mahesh", 1000)
acc.deposit(500)
print(acc.get_balance())      # 1500

print(acc.__balance)          # ❌ AttributeError: 'BankAccount' object has no attribute '__balance'
acc.__log("test")             # ❌ AttributeError
```

Output:

```
[LOG] Deposited 500
1500
AttributeError: 'BankAccount' object has no attribute '__balance'
```

### Name mangling explained

Python renames `__balance` to `_ClassName__balance` behind the scenes.

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance

acc = BankAccount(1000)

print(acc.__dict__)                # {'_BankAccount__balance': 1000}
print(acc._BankAccount__balance)   # 1000 — the mangled name works
```

So private members are **not truly private** — they are just renamed to discourage accidental access and to prevent name clashes in subclasses.

### Why name mangling exists

It stops a subclass from accidentally overwriting a parent's internal data.

```python
class Parent:
    def __init__(self):
        self.__value = "parent value"

    def show_parent(self):
        print(self.__value)

class Child(Parent):
    def __init__(self):
        super().__init__()
        self.__value = "child value"      # different variable!

    def show_child(self):
        print(self.__value)

c = Child()
c.show_parent()    # parent value
c.show_child()     # child value
print(c.__dict__)  # {'_Parent__value': 'parent value', '_Child__value': 'child value'}
```

Both survive independently — no accidental collision.

### The three levels together

```python
class Demo:
    def __init__(self):
        self.public = "Anyone can use me"
        self._protected = "Internal use, subclasses welcome"
        self.__private = "This class only"

    def show(self):
        print(self.public)
        print(self._protected)
        print(self.__private)

d = Demo()
d.show()

print(d.public)         # ✅ works
print(d._protected)     # ⚠️ works, but bad practice
print(d.__private)      # ❌ AttributeError
```

---

## Getters and Setters

**Getters** read a private attribute. **Setters** change it, with validation.

```python
class Student:
    def __init__(self, name, marks):
        self.__name = name
        self.__marks = marks

    # Getter
    def get_marks(self):
        return self.__marks

    # Setter
    def set_marks(self, marks):
        if 0 <= marks <= 100:
            self.__marks = marks
        else:
            print("Invalid marks. Must be between 0 and 100.")

    def get_name(self):
        return self.__name

s = Student("Mahesh", 85)

print(s.get_marks())     # 85

s.set_marks(95)
print(s.get_marks())     # 95

s.set_marks(150)         # Invalid marks. Must be between 0 and 100.
print(s.get_marks())     # 95 — unchanged
```

### Why this beats direct access

| Direct public attribute | Getter / setter |
| --- | --- |
| `s.marks = 150` accepted | Validated and rejected |
| No logging possible | Can log every change |
| No computed values | Can calculate on the fly |
| Cannot make it read-only | Just omit the setter |

### A read-only attribute

Provide a getter but no setter.

```python
class Circle:
    def __init__(self, radius):
        self.__radius = radius

    def get_radius(self):
        return self.__radius

    def get_area(self):                    # computed, always correct
        return 3.14159 * self.__radius ** 2

c = Circle(5)
print(c.get_radius())    # 5
print(c.get_area())      # 78.53975
```

---

## Property Decorator (`@property`)

Getters and setters work, but `s.get_marks()` is uglier than `s.marks`. The `@property` decorator gives you **the clean attribute syntax with the safety of a method**.

### Basic usage

```python
class Student:
    def __init__(self, name, marks):
        self.__name = name
        self.__marks = marks

    @property
    def marks(self):                  # getter
        return self.__marks

    @marks.setter
    def marks(self, value):           # setter
        if 0 <= value <= 100:
            self.__marks = value
        else:
            raise ValueError("Marks must be between 0 and 100")

s = Student("Mahesh", 85)

print(s.marks)      # 85  ← looks like an attribute, runs the getter

s.marks = 95        # ← looks like assignment, runs the setter
print(s.marks)      # 95

s.marks = 150       # ❌ ValueError: Marks must be between 0 and 100
```

### The three decorators

| Decorator | Purpose | Signature |
| --- | --- | --- |
| `@property` | Getter | `def x(self):` |
| `@x.setter` | Setter | `def x(self, value):` |
| `@x.deleter` | Deleter | `def x(self):` |

```python
class Student:
    def __init__(self, name):
        self.__name = name

    @property
    def name(self):
        print("Getting name")
        return self.__name

    @name.setter
    def name(self, value):
        print("Setting name")
        self.__name = value

    @name.deleter
    def name(self):
        print("Deleting name")
        del self.__name

s = Student("Mahesh")
print(s.name)        # Getting name → Mahesh
s.name = "Priya"     # Setting name
del s.name           # Deleting name
```

### Read-only property

Just leave out the setter.

```python
class Circle:
    def __init__(self, radius):
        self.__radius = radius

    @property
    def radius(self):
        return self.__radius

    @property
    def area(self):
        return 3.14159 * self.__radius ** 2

    @property
    def circumference(self):
        return 2 * 3.14159 * self.__radius

c = Circle(5)
print(c.radius)           # 5
print(c.area)             # 78.53975
print(c.circumference)    # 31.4159

c.area = 100              # ❌ AttributeError: can't set attribute
```

`area` behaves like data but is always calculated fresh — it can never go out of sync with `radius`.

### Computed properties

```python
class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width

    @property
    def area(self):
        return self.length * self.width

    @property
    def is_square(self):
        return self.length == self.width

r = Rectangle(5, 5)
print(r.area)         # 25
print(r.is_square)    # True

r.length = 10
print(r.area)         # 50 — updates automatically
print(r.is_square)    # False
```

### A full validated example

```python
class Person:
    def __init__(self, name, age, email):
        self.name = name          # goes through the setters
        self.age = age
        self.email = email

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value):
        if not value or not value.strip():
            raise ValueError("Name cannot be empty")
        self.__name = value.strip().title()

    @property
    def age(self):
        return self.__age

    @age.setter
    def age(self, value):
        if not isinstance(value, int):
            raise TypeError("Age must be an integer")
        if not 0 <= value <= 150:
            raise ValueError("Age must be between 0 and 150")
        self.__age = value

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, value):
        if "@" not in value:
            raise ValueError("Invalid email address")
        self.__email = value.lower()

    @property
    def is_adult(self):
        return self.__age >= 18

p = Person("  mahesh kumar  ", 25, "MAHESH@Email.com")
print(p.name)        # Mahesh Kumar   ← cleaned automatically
print(p.email)       # mahesh@email.com
print(p.is_adult)    # True

try:
    p.age = 200
except ValueError as e:
    print("Error:", e)     # Error: Age must be between 0 and 150
```

> 💡 Start with plain public attributes. When you later need validation, convert to `@property` — the calling code (`p.age = 25`) never changes. This is why Python developers do not write getters and setters upfront like in Java.
>

---

## What is Abstraction?

**Abstraction** means showing only the **essential features** and hiding the complicated details.

When you drive a car, you use the steering wheel, pedals, and gear stick. You do not need to know how fuel injection or the transmission works. That hidden complexity is abstraction.

### Abstraction vs Encapsulation

People confuse these constantly.

| Encapsulation | Abstraction |
| --- | --- |
| **Hides data** | **Hides implementation** |
| "How do I protect it?" | "What does the user need to see?" |
| Achieved with `_` and `__` | Achieved with abstract classes |
| About access control | About design and simplicity |
| Wrapping data in a capsule | Showing a simple interface |

They work together: encapsulation is *how* you often achieve abstraction.

### A simple example

```python
class CoffeeMachine:
    def __init__(self):
        self.__water = 1000
        self.__beans = 500

    def __heat_water(self):
        print("Heating water to 92°C...")

    def __grind_beans(self):
        print("Grinding beans...")

    def __brew(self):
        print("Brewing...")

    def make_coffee(self):          # the only thing the user needs
        self.__heat_water()
        self.__grind_beans()
        self.__brew()
        print("☕ Your coffee is ready!")

machine = CoffeeMachine()
machine.make_coffee()
```

Output:

```
Heating water to 92°C...
Grinding beans...
Brewing...
☕ Your coffee is ready!
```

The user calls one simple method. All the steps are hidden.

---

## Abstract Classes

An **abstract class** is a class that **cannot be instantiated** — it exists only to be inherited from. It defines a contract that subclasses must follow.

Python provides this through the `abc` module (**A**bstract **B**ase **C**lass).

### Creating one

```python
from abc import ABC, abstractmethod

class Shape(ABC):                    # inherit from ABC
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass
```

### You cannot create an object of it

```python
shape = Shape()      # ❌ TypeError: Can't instantiate abstract class Shape
                     #    with abstract methods area, perimeter
```

### Subclasses must implement every abstract method

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

    def perimeter(self):
        return 2 * (self.length + self.width)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.radius

r = Rectangle(5, 3)
c = Circle(4)

print(f"Rectangle → area: {r.area()}, perimeter: {r.perimeter()}")
print(f"Circle    → area: {c.area():.2f}, perimeter: {c.perimeter():.2f}")
```

Output:

```
Rectangle → area: 15, perimeter: 16
Circle    → area: 50.27, perimeter: 25.13
```

### Forgetting a method is caught immediately

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Triangle(Shape):
    def area(self):
        return 10
    # perimeter() is missing!

t = Triangle()    # ❌ TypeError: Can't instantiate abstract class Triangle
                  #    with abstract method perimeter
```

This is the whole point: the error appears when you create the object, not deep inside your program later.

---

## Abstract Methods

An **abstract method** is declared in the parent but has no real implementation. It is marked with `@abstractmethod`.

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    def __init__(self, name):
        self.name = name

    @abstractmethod
    def make_sound(self):
        """Every animal must define its own sound."""
        pass

    @abstractmethod
    def move(self):
        pass

    def sleep(self):                  # concrete method — inherited as-is
        print(f"{self.name} is sleeping 😴")

class Dog(Animal):
    def make_sound(self):
        return "Woof!"

    def move(self):
        return "runs on four legs"

class Bird(Animal):
    def make_sound(self):
        return "Tweet!"

    def move(self):
        return "flies"

animals = [Dog("Bruno"), Bird("Kiwi")]

for animal in animals:
    print(f"{animal.name} says {animal.make_sound()} and {animal.move()}")
    animal.sleep()
```

Output:

```
Bruno says Woof! and runs on four legs
Bruno is sleeping 😴
Kiwi says Tweet! and flies
Kiwi is sleeping 😴
```

### Abstract classes can have concrete methods

An abstract class is allowed to mix both. Subclasses inherit the concrete ones for free.

```python
from abc import ABC, abstractmethod

class Payment(ABC):
    def __init__(self, amount):
        self.amount = amount

    @abstractmethod
    def pay(self):
        pass

    def receipt(self):                # shared by all payment types
        print(f"Receipt: ₹{self.amount} paid successfully")

class CreditCardPayment(Payment):
    def pay(self):
        print(f"Paying ₹{self.amount} by credit card")

class UPIPayment(Payment):
    def pay(self):
        print(f"Paying ₹{self.amount} via UPI")

for payment in [CreditCardPayment(1500), UPIPayment(250)]:
    payment.pay()
    payment.receipt()
```

Output:

```
Paying ₹1500 by credit card
Receipt: ₹1500 paid successfully
Paying ₹250 via UPI
Receipt: ₹250 paid successfully
```

### Abstract properties

You can combine `@property` with `@abstractmethod`.

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @property
    @abstractmethod
    def wheels(self):
        pass

class Car(Vehicle):
    @property
    def wheels(self):
        return 4

class Bike(Vehicle):
    @property
    def wheels(self):
        return 2

print(Car().wheels)     # 4
print(Bike().wheels)    # 2
```

Note the order: `@property` goes on top, `@abstractmethod` directly above the function.

### Why abstract classes are useful

- **Enforce a contract**: Every subclass is guaranteed to have the required methods.
- **Prevent incomplete objects**: You cannot instantiate something half-finished.
- **Document intent**: The abstract class shows exactly what a subclass must provide.
- **Enable polymorphism**: You can treat all subclasses the same way (Module 17).

---

## Common Mistakes

### 1. Thinking `__` makes something truly private

```python
class Demo:
    def __init__(self):
        self.__secret = "hidden"

d = Demo()
print(d._Demo__secret)     # "hidden" — still reachable
```

It discourages access; it does not prevent it.

### 2. Using `__name__` style by accident

```python
class Demo:
    def __init__(self):
        self.__value__ = 10      # NOT private — dunder names are not mangled

d = Demo()
print(d.__value__)      # 10
```

Name mangling only applies to names with **two leading** underscores and **at most one trailing** underscore.

### 3. Infinite recursion in a property

```python
# Wrong
class Student:
    @property
    def marks(self):
        return self.marks        # ❌ calls itself forever → RecursionError

# Correct — use a different internal name
class Student:
    @property
    def marks(self):
        return self.__marks
```

### 4. Wrong decorator order on abstract properties

```python
# Wrong
class Demo(ABC):
    @abstractmethod
    @property
    def x(self): pass

# Correct
class Demo(ABC):
    @property
    @abstractmethod
    def x(self): pass
```

### 5. Forgetting to inherit from `ABC`

```python
from abc import abstractmethod

class Shape:                    # ❌ missing ABC
    @abstractmethod
    def area(self):
        pass

s = Shape()      # works! No error — the abstraction is not enforced
```

You must inherit from `ABC` (or set `metaclass=ABCMeta`) for `@abstractmethod` to have any effect.

### 6. Writing Java-style getters when you do not need them

```python
# Unnecessary in Python
class Point:
    def __init__(self, x):
        self.__x = x
    def get_x(self):
        return self.__x
    def set_x(self, v):
        self.__x = v

# Pythonic — just use a public attribute until you need validation
class Point:
    def __init__(self, x):
        self.x = x
```

---

## Quick Reference

| Concept | Syntax | Meaning |
| --- | --- | --- |
| Public | `self.name` | Open to everyone |
| Protected | `self._name` | Internal, subclasses may use |
| Private | `self.__name` | This class only (name mangled) |
| Mangled name | `obj._Class__name` | How Python stores it |
| Getter method | `def get_x(self):` | Read a private value |
| Setter method | `def set_x(self, v):` | Write with validation |
| Property getter | `@property` | Attribute-style read |
| Property setter | `@x.setter` | Attribute-style write |
| Property deleter | `@x.deleter` | Attribute-style delete |
| Abstract class | `class X(ABC):` | Cannot be instantiated |
| Abstract method | `@abstractmethod` | Subclass must implement |
| Import | `from abc import ABC, abstractmethod` | Required for abstract classes |
