# Module 14: Constructors, Attributes, and Methods

## `__init__()` Constructor

The `__init__()` method is Python's **constructor**. It runs automatically the moment you create an object, and its job is to set up the object's starting data.

The name comes from "initialise". The double underscores on both sides make it a **dunder** (double underscore) method — a special method Python calls for you.

### Without a constructor

```python
class Student:
    pass

s = Student()
s.name = "Mahesh"      # you must set everything manually
s.marks = 85
```

This is tedious and easy to forget.

### With a constructor

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

s = Student("Mahesh", 85)     # data is set automatically
print(s.name)     # Mahesh
print(s.marks)    # 85
```

### It runs automatically

```python
class Demo:
    def __init__(self):
        print("Constructor called! Object created.")

d1 = Demo()
d2 = Demo()
```

Output:

```
Constructor called! Object created.
Constructor called! Object created.
```

You never call `__init__()` yourself — Python calls it when you write `Demo()`.

### Constructor with default values

```python
class Student:
    def __init__(self, name, marks=0, city="Unknown"):
        self.name = name
        self.marks = marks
        self.city = city

s1 = Student("Mahesh")
s2 = Student("Priya", 92, "Delhi")

print(s1.name, s1.marks, s1.city)    # Mahesh 0 Unknown
print(s2.name, s2.marks, s2.city)    # Priya 92 Delhi
```

### Validation inside the constructor

A constructor is a great place to reject bad data.

```python
class Student:
    def __init__(self, name, marks):
        if not name:
            raise ValueError("Name cannot be empty")
        if not 0 <= marks <= 100:
            raise ValueError("Marks must be between 0 and 100")
        self.name = name
        self.marks = marks

s = Student("Mahesh", 85)      # fine

try:
    bad = Student("Ravi", 150)
except ValueError as e:
    print("Error:", e)          # Error: Marks must be between 0 and 100
```

### Python has only one constructor

Unlike Java or C++, you **cannot** define `__init__` twice — the second one simply replaces the first.

```python
class Demo:
    def __init__(self, a):
        print("First constructor")

    def __init__(self, a, b):    # this one wins
        print("Second constructor")

d = Demo(1, 2)      # Second constructor
d = Demo(1)         # ❌ TypeError: missing 1 required positional argument
```

Use default arguments or `*args` instead:

```python
class Point:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

p1 = Point()          # 0, 0
p2 = Point(3)         # 3, 0
p3 = Point(3, 4)      # 3, 4
```

### `__new__()` vs `__init__()`

For completeness: `__new__()` actually **creates** the object, then `__init__()` **initialises** it. You almost never need `__new__()`.

```python
class Demo:
    def __new__(cls):
        print("1. __new__ creates the object")
        return super().__new__(cls)

    def __init__(self):
        print("2. __init__ initialises it")

d = Demo()
```

Output:

```
1. __new__ creates the object
2. __init__ initialises it
```

### The destructor `__del__()`

Runs when the object is destroyed.

```python
class Demo:
    def __init__(self, name):
        self.name = name
        print(f"{self.name} created")

    def __del__(self):
        print(f"{self.name} destroyed")

d = Demo("Object1")
del d
```

Output:

```
Object1 created
Object1 destroyed
```

> ⚠️ Do not rely on `__del__()` for important cleanup like closing files. Python's garbage collector decides when it runs. Use `with` statements or explicit `close()` methods instead.
>

---

## Instance Attributes

**Instance attributes** belong to one specific object. Every object gets its own separate copy.

They are created with `self.` inside a method — usually `__init__`.

```python
class Student:
    def __init__(self, name, marks):
        self.name = name        # instance attribute
        self.marks = marks      # instance attribute

s1 = Student("Mahesh", 85)
s2 = Student("Priya", 92)

print(s1.name)    # Mahesh
print(s2.name)    # Priya

s1.marks = 90     # only changes s1
print(s1.marks)   # 90
print(s2.marks)   # 92
```

Each object stores its own data:

```python
print(s1.__dict__)    # {'name': 'Mahesh', 'marks': 90}
print(s2.__dict__)    # {'name': 'Priya', 'marks': 92}
```

### Adding attributes outside `__init__`

```python
class Student:
    def __init__(self, name):
        self.name = name

    def set_city(self, city):
        self.city = city        # created when this method is called

s = Student("Mahesh")
print(hasattr(s, "city"))    # False

s.set_city("Mumbai")
print(s.city)                # Mumbai
```

This works but is discouraged — define every attribute in `__init__` so readers can see the full shape of the object in one place.

---

## Class Attributes

**Class attributes** belong to the class itself and are **shared by every object**. They are defined directly inside the class body, outside any method.

```python
class Student:
    school = "ABC High School"     # class attribute — shared

    def __init__(self, name):
        self.name = name           # instance attribute — unique

s1 = Student("Mahesh")
s2 = Student("Priya")

print(s1.school)        # ABC High School
print(s2.school)        # ABC High School
print(Student.school)   # ABC High School — accessible on the class too
```

### Changing a class attribute

Change it on the **class** and every object sees the change:

```python
Student.school = "XYZ High School"

print(s1.school)    # XYZ High School
print(s2.school)    # XYZ High School
```

But assigning through an **object** creates a new instance attribute that shadows the class one:

```python
class Student:
    school = "ABC School"

    def __init__(self, name):
        self.name = name

s1 = Student("Mahesh")
s2 = Student("Priya")

s1.school = "DEF School"     # creates an INSTANCE attribute on s1 only

print(s1.school)          # DEF School   ← instance attribute
print(s2.school)          # ABC School   ← still the class attribute
print(Student.school)     # ABC School   ← class unchanged

print(s1.__dict__)        # {'name': 'Mahesh', 'school': 'DEF School'}
print(s2.__dict__)        # {'name': 'Priya'}
```

> ⚠️ This shadowing behaviour confuses many beginners. To change a value for *everyone*, always assign through the class: `Student.school = "..."`, never `s1.school = "..."`.
>

### Counting objects — the classic use case

```python
class Student:
    count = 0                    # shared counter

    def __init__(self, name):
        self.name = name
        Student.count += 1       # update on the CLASS

s1 = Student("Mahesh")
s2 = Student("Priya")
s3 = Student("Ravi")

print(Student.count)    # 3
print(s1.count)         # 3 — readable from any object
```

### ⚠️ Mutable class attributes are shared

This is a real trap, just like mutable default arguments.

```python
class Student:
    subjects = []                # ❌ shared list!

    def __init__(self, name):
        self.name = name

    def add_subject(self, subject):
        self.subjects.append(subject)

s1 = Student("Mahesh")
s2 = Student("Priya")

s1.add_subject("Math")
print(s2.subjects)    # ['Math']  ← Priya got Mahesh's subject!
```

The fix — make it an instance attribute:

```python
class Student:
    def __init__(self, name):
        self.name = name
        self.subjects = []       # ✅ each object gets its own list

    def add_subject(self, subject):
        self.subjects.append(subject)

s1 = Student("Mahesh")
s2 = Student("Priya")

s1.add_subject("Math")
print(s1.subjects)    # ['Math']
print(s2.subjects)    # []
```

### Instance vs class attributes

| Instance attribute | Class attribute |
| --- | --- |
| Defined with `self.x` inside a method | Defined directly in the class body |
| One copy **per object** | **One copy shared** by all objects |
| Different for each object | Same for every object |
| `self.name = name` | `school = "ABC"` |
| Use for data unique to an object | Use for constants and shared counters |

### How Python looks up an attribute

When you write `obj.x`, Python searches:

1. The **instance** dictionary (`obj.__dict__`).
2. The **class** dictionary (`Class.__dict__`).
3. Any **parent classes**.
4. Otherwise → `AttributeError`.

---

## Instance Methods

**Instance methods** are the normal methods you have been writing. They take `self` as the first parameter and can read and change the object's data.

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):              # instance method
        self.balance += amount
        return self.balance

    def withdraw(self, amount):             # instance method
        if amount > self.balance:
            return "Insufficient funds"
        self.balance -= amount
        return self.balance

    def display(self):                      # instance method
        print(f"{self.owner}: {self.balance}")

acc = BankAccount("Mahesh", 1000)
acc.deposit(500)
acc.display()          # Mahesh: 1500
print(acc.withdraw(2000))   # Insufficient funds
```

### Methods calling other methods

Use `self.` to call one method from another.

```python
class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

    def perimeter(self):
        return 2 * (self.length + self.width)

    def summary(self):
        print(f"Area: {self.area()}")            # calling own method
        print(f"Perimeter: {self.perimeter()}")

r = Rectangle(5, 3)
r.summary()
```

Output:

```
Area: 15
Perimeter: 16
```

---

## Class Methods

A **class method** works with the **class**, not with one object. It receives `cls` (the class) instead of `self`, and you mark it with the `@classmethod` decorator.

```python
class Student:
    count = 0
    school = "ABC School"

    def __init__(self, name):
        self.name = name
        Student.count += 1

    @classmethod
    def get_count(cls):
        return cls.count

    @classmethod
    def change_school(cls, new_school):
        cls.school = new_school

s1 = Student("Mahesh")
s2 = Student("Priya")

print(Student.get_count())     # 2
print(s1.get_count())          # 2 — can also be called on an object

Student.change_school("XYZ School")
print(s1.school)               # XYZ School
print(s2.school)               # XYZ School
```

### Factory methods — the most useful pattern

Class methods are perfect for creating objects in alternative ways.

```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_string(cls, data):
        """Create a Student from 'name-age' text."""
        name, age = data.split("-")
        return cls(name, int(age))

    @classmethod
    def from_dict(cls, data):
        """Create a Student from a dictionary."""
        return cls(data["name"], data["age"])

    def display(self):
        print(f"{self.name} is {self.age} years old")

s1 = Student("Mahesh", 20)
s2 = Student.from_string("Priya-21")
s3 = Student.from_dict({"name": "Ravi", "age": 22})

s1.display()    # Mahesh is 20 years old
s2.display()    # Priya is 21 years old
s3.display()    # Ravi is 22 years old
```

Using `cls(...)` instead of `Student(...)` means subclasses get the right type automatically.

---

## Static Methods

A **static method** is a plain function that lives inside a class for organisational reasons. It takes **neither** `self` nor `cls`, and it cannot touch instance or class data.

Mark it with `@staticmethod`.

```python
class MathHelper:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def is_even(n):
        return n % 2 == 0

    @staticmethod
    def celsius_to_fahrenheit(c):
        return (c * 9 / 5) + 32

print(MathHelper.add(5, 3))                    # 8
print(MathHelper.is_even(10))                  # True
print(MathHelper.celsius_to_fahrenheit(100))   # 212.0

# Can also be called on an object
m = MathHelper()
print(m.add(2, 3))                             # 5
```

### A practical mix of all three

```python
class Employee:
    company = "TechCorp"
    count = 0

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.count += 1

    def display(self):                          # instance method
        print(f"{self.name} earns {self.salary} at {Employee.company}")

    @classmethod
    def total_employees(cls):                   # class method
        return cls.count

    @classmethod
    def from_csv(cls, row):                     # factory class method
        name, salary = row.split(",")
        return cls(name, float(salary))

    @staticmethod
    def is_valid_salary(salary):                # static method
        return salary > 0

e1 = Employee("Mahesh", 50000)
e2 = Employee.from_csv("Priya,60000")

e1.display()
e2.display()
print("Total employees:", Employee.total_employees())
print("Valid salary?", Employee.is_valid_salary(-100))
```

Output:

```
Mahesh earns 50000 at TechCorp
Priya earns 60000.0 at TechCorp
Total employees: 2
Valid salary? False
```

### The three method types compared

| | Instance method | Class method | Static method |
| --- | --- | --- | --- |
| Decorator | none | `@classmethod` | `@staticmethod` |
| First parameter | `self` | `cls` | none |
| Can access instance data | ✅ Yes | ❌ No | ❌ No |
| Can access class data | ✅ Yes | ✅ Yes | ❌ No |
| Called on | Object | Class or object | Class or object |
| Use it for | Working with one object's data | Shared data, factory methods | Utility helpers |

### How to choose

Ask yourself:

- Does it need **this object's** data? → instance method (`self`)
- Does it need the **class** (shared data, or creating instances)? → class method (`cls`)
- Does it need **neither**? → static method

---

## `self` and `cls`

### What is `self`?

`self` is a reference to **the object the method was called on**. Python passes it automatically.

```python
class Student:
    def __init__(self, name):
        self.name = name

    def display(self):
        print(f"Name: {self.name}")

s = Student("Mahesh")
s.display()
```

Behind the scenes, `s.display()` becomes:

```python
Student.display(s)      # this is literally what Python does
```

That is why `self` must be the first parameter — it receives the object.

### Proving it

```python
class Demo:
    def show(self):
        print("self is:", self)

d = Demo()
d.show()
print("d is   :", d)
```

Output (addresses will differ, but they match):

```
self is: <__main__.Demo object at 0x7f9c1a2b3d50>
d is   : <__main__.Demo object at 0x7f9c1a2b3d50>
```

### `self` is just a convention

The name is not a keyword. This works, but never do it:

```python
class Student:
    def __init__(banana, name):     # works, but confusing
        banana.name = name

    def display(banana):
        print(banana.name)

s = Student("Mahesh")
s.display()     # Mahesh
```

Always use `self`. Every Python developer expects it.

### What is `cls`?

`cls` is a reference to **the class itself**, passed automatically to class methods.

```python
class Student:
    school = "ABC School"

    @classmethod
    def show_class(cls):
        print("cls is:", cls)
        print("school :", cls.school)

Student.show_class()
```

Output:

```
cls is: <class '__main__.Student'>
school : ABC School
```

### `self` vs `cls` side by side

| `self` | `cls` |
| --- | --- |
| Refers to the **object** | Refers to the **class** |
| Used in instance methods | Used in class methods |
| Passed automatically | Passed automatically |
| Accesses instance + class data | Accesses class data only |
| `self.name` | `cls.count` |

### Both in one class

```python
class Counter:
    total = 0

    def __init__(self, name):
        self.name = name          # self → this object
        Counter.total += 1        # class attribute

    def show_name(self):
        print(f"This object's name: {self.name}")

    @classmethod
    def show_total(cls):
        print(f"Total objects: {cls.total}")

c1 = Counter("First")
c2 = Counter("Second")

c1.show_name()          # This object's name: First
c2.show_name()          # This object's name: Second
Counter.show_total()    # Total objects: 2
```

---

## Common Mistakes

### 1. Forgetting `self` in the parameter list

```python
# Wrong
class Demo:
    def show():
        print("Hello")

Demo().show()    # ❌ TypeError: show() takes 0 positional arguments but 1 was given

# Correct
class Demo:
    def show(self):
        print("Hello")
```

### 2. Forgetting `self.` when using an attribute

```python
# Wrong
class Student:
    def __init__(self, name):
        self.name = name

    def display(self):
        print(name)      # ❌ NameError: name 'name' is not defined

# Correct
    def display(self):
        print(self.name)
```

### 3. Using a mutable class attribute

```python
# Wrong — shared across all objects
class Cart:
    items = []

# Correct — one list per object
class Cart:
    def __init__(self):
        self.items = []
```

### 4. Updating a class counter through `self`

```python
class Student:
    count = 0

    def __init__(self):
        self.count += 1        # ❌ creates an instance attribute, class stays 0

s1 = Student()
s2 = Student()
print(Student.count)   # 0

# Correct
    def __init__(self):
        Student.count += 1     # ✅ or type(self).count += 1
```

### 5. Adding `self` to a static method

```python
# Wrong
class Helper:
    @staticmethod
    def add(self, a, b):     # static methods get no self
        return a + b

# Correct
class Helper:
    @staticmethod
    def add(a, b):
        return a + b
```

### 6. Forgetting the decorator

```python
# Wrong — cls is treated as a normal parameter
class Demo:
    def get_count(cls):
        return cls.count

# Correct
class Demo:
    @classmethod
    def get_count(cls):
        return cls.count
```

---

## Quick Reference

| Concept | Syntax | Example |
| --- | --- | --- |
| Constructor | `def __init__(self):` | `def __init__(self, name):` |
| Destructor | `def __del__(self):` | Cleanup on delete |
| Instance attribute | `self.x = value` | `self.name = name` |
| Class attribute | `x = value` in class body | `school = "ABC"` |
| Instance method | `def m(self):` | `def display(self):` |
| Class method | `@classmethod` + `cls` | `def count(cls):` |
| Static method | `@staticmethod`, no first arg | `def add(a, b):` |
| Access instance data | `self.attr` | `self.marks` |
| Access class data | `cls.attr` or `Class.attr` | `Student.count` |
| Object's attributes | `obj.__dict__` | `{'name': 'Mahesh'}` |
