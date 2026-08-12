# Module 13: Introduction to OOP

## What is OOP?

**Object-Oriented Programming (OOP)** is a way of writing programs by modelling them as a collection of **objects** — things that hold data and know how to act on that data.

Instead of writing a long list of instructions, you describe the *things* in your problem and let them interact.

### Real-world thinking

Look around you. A **car** is an object. It has:

- **Data** (properties): colour, brand, speed, fuel level.
- **Behaviour** (actions): start, accelerate, brake, stop.

OOP lets you write code the same way:

```python
class Car:
    def __init__(self, brand, color):
        self.brand = brand      # data
        self.color = color      # data

    def start(self):            # behaviour
        print(f"The {self.color} {self.brand} is starting...")

my_car = Car("Toyota", "red")
my_car.start()
```

Output:

```
The red Toyota is starting...
```

### The four pillars of OOP

| Pillar | Meaning | Covered in |
| --- | --- | --- |
| **Encapsulation** | Bundle data and methods together, hide internal details | Module 15 |
| **Abstraction** | Show only what matters, hide the complexity | Module 15 |
| **Inheritance** | A new class reuses an existing class | Module 16 |
| **Polymorphism** | The same action behaves differently for different objects | Module 17 |

### Why use OOP?

- **Organisation**: Related data and functions live together in one place.
- **Reusability**: Write a class once, create thousands of objects from it.
- **Maintainability**: Change the class, and every object gets the fix.
- **Modelling**: Real problems (students, bank accounts, products) map naturally to objects.
- **Scalability**: Large projects stay manageable.
- **Teamwork**: Different people can own different classes.

---

## Procedural vs OOP

**Procedural programming** is what you have written so far — variables plus functions that act on them.

### The same problem, both ways

Procedural approach:

```python
# Data is loose, functions are separate
student1_name = "Mahesh"
student1_marks = 85

student2_name = "Priya"
student2_marks = 92

def display_student(name, marks):
    print(f"{name} scored {marks}")

def get_grade(marks):
    if marks >= 90:
        return "A"
    elif marks >= 80:
        return "B"
    return "C"

display_student(student1_name, student1_marks)
print(get_grade(student1_marks))
```

Output:

```
Mahesh scored 85
B
```

Object-oriented approach:

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def display(self):
        print(f"{self.name} scored {self.marks}")

    def get_grade(self):
        if self.marks >= 90:
            return "A"
        elif self.marks >= 80:
            return "B"
        return "C"

student1 = Student("Mahesh", 85)
student2 = Student("Priya", 92)

student1.display()
print(student1.get_grade())
student2.display()
print(student2.get_grade())
```

Output:

```
Mahesh scored 85
B
Priya scored 92
A
```

Notice how the data and the behaviour travel together. Adding a 100th student is one line, not five variables.

### Comparison

| Procedural | Object-Oriented |
| --- | --- |
| Built around **functions** | Built around **objects** |
| Data and functions are separate | Data and methods are bundled |
| Data is usually global and exposed | Data can be hidden inside the object |
| Top-down design | Bottom-up design |
| Hard to scale for big projects | Scales well |
| Reuse via functions | Reuse via inheritance |
| Good for small scripts | Good for large applications |

### When to use which

- **Procedural** — small scripts, one-off automation, simple data processing.
- **OOP** — anything with real-world entities, growing projects, code others will reuse.

> 💡 OOP is not "better" in every case. A 20-line script does not need classes. Use OOP when you notice yourself passing the same group of variables into many functions — that group wants to be an object.
>

---

## Classes

A **class** is a blueprint or template for creating objects. It defines what data an object will hold and what it can do.

The class itself is not an object. It is the *design*.

### Analogy

Think of a class as an architect's **blueprint** for a house:

- The blueprint is not a house — you cannot live in it.
- From one blueprint you can build many houses.
- Each house has the same structure but different paint, furniture, and owners.

| Class | Object |
| --- | --- |
| Blueprint of a house | An actual house |
| Cookie cutter | The cookies |
| Recipe | The cooked dish |
| `Student` class | `Student("Mahesh", 85)` |

### Defining a class

```python
class ClassName:
    # attributes (data)
    # methods (behaviour)
    pass
```

Class names use `CamelCase` (also called `PascalCase`) by convention.

```python
class Student:
    pass

class BankAccount:
    pass

class CarEngine:
    pass
```

### An empty class

```python
class Dog:
    pass

print(Dog)          # <class '__main__.Dog'>
print(type(Dog))    # <class 'type'>
```

`pass` is used because Python does not allow an empty block.

---

## Objects

An **object** (also called an **instance**) is a real thing created from a class. It has its own copy of the data.

### Creating an object

```python
class Dog:
    pass

dog1 = Dog()
dog2 = Dog()

print(dog1)          # <__main__.Dog object at 0x7f8b1c0d5f10>
print(type(dog1))    # <class 'Dog'>
```

You create an object by calling the class name with parentheses, just like a function.

### Each object is separate

```python
class Dog:
    pass

dog1 = Dog()
dog2 = Dog()

dog1.name = "Bruno"
dog2.name = "Rocky"

print(dog1.name)    # Bruno
print(dog2.name)    # Rocky
print(dog1 is dog2) # False — two different objects
```

Even though both came from the same class, they are independent.

### Class vs object in one picture

```
        class Student            ← the blueprint (written once)
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
 student1  student2  student3    ← the objects (created many times)
 "Mahesh"  "Priya"   "Ravi"
   85        92        78
```

---

## Creating Classes and Objects

### A complete first class

```python
class Student:
    def __init__(self, name, age, marks):
        self.name = name
        self.age = age
        self.marks = marks

    def display(self):
        print(f"Name: {self.name}, Age: {self.age}, Marks: {self.marks}")

# Creating objects
s1 = Student("Mahesh", 20, 85)
s2 = Student("Priya", 21, 92)

s1.display()
s2.display()
```

Output:

```
Name: Mahesh, Age: 20, Marks: 85
Name: Priya, Age: 21, Marks: 92
```

### Breaking it down

| Part | Meaning |
| --- | --- |
| `class Student:` | Starts the class definition |
| `def __init__(self, ...)` | The constructor — runs automatically on creation |
| `self` | Refers to the object being created |
| `self.name = name` | Stores data inside this specific object |
| `def display(self):` | A method — a function belonging to the class |
| `s1 = Student(...)` | Creates an object |
| `s1.display()` | Calls the method on that object |

### Accessing and changing attributes

```python
class Car:
    def __init__(self, brand, speed):
        self.brand = brand
        self.speed = speed

my_car = Car("Honda", 0)

# Read
print(my_car.brand)     # Honda
print(my_car.speed)     # 0

# Change
my_car.speed = 60
print(my_car.speed)     # 60

# Add a new attribute at runtime
my_car.color = "blue"
print(my_car.color)     # blue
```

Python lets you add attributes to an object after creation, though it is cleaner to define them in `__init__`.

### Deleting attributes and objects

```python
class Car:
    def __init__(self, brand):
        self.brand = brand

car = Car("Honda")
print(car.brand)     # Honda

del car.brand
print(car.brand)     # ❌ AttributeError: 'Car' object has no attribute 'brand'

del car              # deletes the whole object
```

### A class with behaviour

```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited {amount}. New balance: {self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds")
        else:
            self.balance -= amount
            print(f"Withdrew {amount}. New balance: {self.balance}")

    def show_balance(self):
        print(f"{self.owner}'s balance: {self.balance}")

account = BankAccount("Mahesh", 1000)
account.show_balance()
account.deposit(500)
account.withdraw(200)
account.withdraw(5000)
```

Output:

```
Mahesh's balance: 1000
Deposited 500. New balance: 1500
Withdrew 200. New balance: 1300
Insufficient funds
```

### Creating many objects with a loop

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def display(self):
        print(f"{self.name}: {self.marks}")

data = [("Mahesh", 85), ("Priya", 92), ("Ravi", 78)]

students = []
for name, marks in data:
    students.append(Student(name, marks))

for student in students:
    student.display()
```

Output:

```
Mahesh: 85
Priya: 92
Ravi: 78
```

---

## Useful Built-in Functions for Objects

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def display(self):
        pass

s = Student("Mahesh", 85)

print(type(s))                    # <class '__main__.Student'>
print(isinstance(s, Student))     # True
print(hasattr(s, "name"))         # True
print(hasattr(s, "city"))         # False
print(getattr(s, "name"))         # Mahesh
print(getattr(s, "city", "N/A"))  # N/A  (default if missing)

setattr(s, "city", "Mumbai")
print(s.city)                     # Mumbai

delattr(s, "city")
print(hasattr(s, "city"))         # False

print(s.__dict__)                 # {'name': 'Mahesh', 'marks': 85}
```

| Function | Purpose |
| --- | --- |
| `type(obj)` | The object's class |
| `isinstance(obj, Class)` | Is it an instance of that class? |
| `hasattr(obj, "x")` | Does it have that attribute? |
| `getattr(obj, "x")` | Get the attribute value |
| `setattr(obj, "x", v)` | Set the attribute |
| `delattr(obj, "x")` | Delete the attribute |
| `obj.__dict__` | Dictionary of all instance attributes |
| `dir(obj)` | List everything the object has |

---

## Docstrings in Classes

Document your classes exactly like functions.

```python
class Student:
    """
    Represents a student with a name and marks.

    Attributes:
        name (str): The student's name.
        marks (int): The student's marks out of 100.
    """

    def __init__(self, name, marks):
        """Initialise a Student with a name and marks."""
        self.name = name
        self.marks = marks

print(Student.__doc__)
help(Student)
```

---

## Common Mistakes for Beginners

### 1. Forgetting `self` in the method definition

```python
# Wrong
class Dog:
    def bark():
        print("Woof")

d = Dog()
d.bark()     # ❌ TypeError: bark() takes 0 positional arguments but 1 was given

# Correct
class Dog:
    def bark(self):
        print("Woof")
```

### 2. Forgetting `self.` when storing data

```python
# Wrong — name is just a local variable, lost immediately
class Student:
    def __init__(self, name):
        name = name

s = Student("Mahesh")
print(s.name)    # ❌ AttributeError

# Correct
class Student:
    def __init__(self, name):
        self.name = name
```

### 3. Forgetting the parentheses when creating an object

```python
class Dog:
    pass

d = Dog       # ❌ this is the class itself, not an object
d = Dog()     # ✅ this creates an object
```

### 4. Using a lowercase class name

```python
class student:      # works, but breaks convention
    pass

class Student:      # ✅ CamelCase is the standard
    pass
```

### 5. Expecting objects to share data

```python
class Counter:
    def __init__(self):
        self.count = 0

c1 = Counter()
c2 = Counter()

c1.count = 10
print(c2.count)     # 0 — objects are independent
```

---

## Quick Reference

| Concept | Syntax | Example |
| --- | --- | --- |
| Define a class | `class Name:` | `class Student:` |
| Constructor | `def __init__(self):` | `def __init__(self, name):` |
| Create an object | `obj = Name()` | `s = Student("Mahesh")` |
| Instance attribute | `self.x = value` | `self.name = name` |
| Method | `def method(self):` | `def display(self):` |
| Call a method | `obj.method()` | `s.display()` |
| Read an attribute | `obj.x` | `s.name` |
| Change an attribute | `obj.x = value` | `s.marks = 90` |
| Delete an attribute | `del obj.x` | `del s.marks` |
| Check the type | `isinstance(obj, Class)` | `isinstance(s, Student)` |
