# Module 16: Inheritance

## What is Inheritance?

**Inheritance** lets a new class reuse the attributes and methods of an existing class. The new class gets everything the old one has, and can add or change whatever it needs.

- **Parent class** (also called base class or superclass) — the one being inherited from.
- **Child class** (also called derived class or subclass) — the one that inherits.

### Real-world thinking

A **Dog** *is an* **Animal**. Every animal eats and sleeps, so a dog does too — you should not have to write that code again.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating")

    def sleep(self):
        print(f"{self.name} is sleeping")

class Dog(Animal):              # Dog inherits from Animal
    def bark(self):
        print(f"{self.name} says Woof!")

d = Dog("Bruno")
d.eat()      # inherited from Animal
d.sleep()    # inherited from Animal
d.bark()     # Dog's own method
```

Output:

```
Bruno is eating
Bruno is sleeping
Bruno says Woof!
```

### Syntax

```python
class Parent:
    # parent code

class Child(Parent):
    # child code — automatically has everything Parent has
```

### Why use inheritance?

- **Code reuse**: Write shared logic once in the parent.
- **Less repetition**: No copy-pasting between similar classes.
- **Easy updates**: Fix the parent, and every child is fixed.
- **Logical structure**: Models real "is-a" relationships.
- **Polymorphism**: Lets you treat different children uniformly (Module 17).

### The "is-a" test

Use inheritance only when the child genuinely **is a** kind of the parent.

| Relationship | Correct? |
| --- | --- |
| Dog **is an** Animal | ✅ Use inheritance |
| Car **is a** Vehicle | ✅ Use inheritance |
| Manager **is an** Employee | ✅ Use inheritance |
| Car **has an** Engine | ❌ Use composition (an attribute) instead |
| Student **has a** Address | ❌ Use composition |

---

## Single Inheritance

**One child inherits from one parent.** This is the simplest and most common form.

```
Parent
  │
Child
```

```python
class Vehicle:
    def __init__(self, brand, wheels):
        self.brand = brand
        self.wheels = wheels

    def start(self):
        print(f"{self.brand} is starting")

    def stop(self):
        print(f"{self.brand} has stopped")

class Car(Vehicle):
    def honk(self):
        print(f"{self.brand} goes Beep Beep!")

car = Car("Toyota", 4)
car.start()     # Toyota is starting
car.honk()      # Toyota goes Beep Beep!
car.stop()      # Toyota has stopped

print(car.wheels)    # 4
```

### Checking relationships

```python
print(isinstance(car, Car))        # True
print(isinstance(car, Vehicle))    # True — a Car IS a Vehicle
print(issubclass(Car, Vehicle))    # True
print(issubclass(Vehicle, Car))    # False
```

---

## Multiple Inheritance

**One child inherits from two or more parents.** The child gets features from all of them.

```
Parent1   Parent2
    \       /
     \     /
      Child
```

```python
class Father:
    def __init__(self):
        self.eye_color = "brown"

    def skills(self):
        print("Father: driving, cooking")

class Mother:
    def __init__(self):
        self.hair_color = "black"

    def talents(self):
        print("Mother: singing, painting")

class Child(Father, Mother):
    def own_skill(self):
        print("Child: programming")

c = Child()
c.skills()       # Father: driving, cooking
c.talents()      # Mother: singing, painting
c.own_skill()    # Child: programming
```

### A practical example

```python
class Swimmer:
    def swim(self):
        print("Can swim 🏊")

class Flyer:
    def fly(self):
        print("Can fly 🦅")

class Duck(Swimmer, Flyer):
    def quack(self):
        print("Quack! 🦆")

d = Duck()
d.swim()
d.fly()
d.quack()
```

Output:

```
Can swim 🏊
Can fly 🦅
Quack! 🦆
```

### The Diamond Problem and MRO

What if both parents define the same method? Which one wins?

```python
class A:
    def show(self):
        print("A's show")

class B(A):
    def show(self):
        print("B's show")

class C(A):
    def show(self):
        print("C's show")

class D(B, C):
    pass

d = D()
d.show()      # B's show
```

The shape of this is a diamond:

```
      A
     / \
    B   C
     \ /
      D
```

Python resolves it with the **MRO (Method Resolution Order)** — the exact order it searches classes.

```python
print(D.__mro__)
```

Output:

```
(<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)
```

Or more readably:

```python
for cls in D.mro():
    print(cls.__name__)
```

Output:

```
D
B
C
A
object
```

Python looks in `D` → `B` → `C` → `A` → `object` and uses the first `show()` it finds, which is `B`'s.

The MRO is computed with the **C3 linearisation** algorithm. The practical rules are:

1. The class itself comes first.
2. Parents are searched **left to right** as written in the class definition.
3. A parent never appears before its own children.

> 💡 Multiple inheritance is powerful but easy to misuse. If your class hierarchy needs a diagram to understand, prefer composition — store objects as attributes instead of inheriting.
>

---

## Multilevel Inheritance

**A chain of inheritance** — a child becomes the parent of another child.

```
Grandparent
     │
   Parent
     │
   Child
```

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} eats food")

class Dog(Animal):
    def bark(self):
        print(f"{self.name} barks")

class Puppy(Dog):
    def weep(self):
        print(f"{self.name} weeps")

p = Puppy("Bruno")
p.eat()     # from Animal   (grandparent)
p.bark()    # from Dog      (parent)
p.weep()    # its own
```

Output:

```
Bruno eats food
Bruno barks
Bruno weeps
```

### A three-level real example

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display(self):
        print(f"Name: {self.name}, Age: {self.age}")

class Employee(Person):
    def __init__(self, name, age, salary):
        super().__init__(name, age)
        self.salary = salary

    def display(self):
        super().display()
        print(f"Salary: {self.salary}")

class Manager(Employee):
    def __init__(self, name, age, salary, team_size):
        super().__init__(name, age, salary)
        self.team_size = team_size

    def display(self):
        super().display()
        print(f"Team size: {self.team_size}")

m = Manager("Mahesh", 35, 90000, 8)
m.display()
```

Output:

```
Name: Mahesh, Age: 35
Salary: 90000
Team size: 8
```

Each level adds its own piece and delegates the rest upward with `super()`.

---

## Hierarchical Inheritance

**Multiple children inherit from one parent.** This is extremely common.

```
        Parent
       /   |   \
  Child1 Child2 Child3
```

```python
class Shape:
    def __init__(self, name):
        self.name = name

    def describe(self):
        print(f"This is a {self.name}")

class Circle(Shape):
    def __init__(self, radius):
        super().__init__("Circle")
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, length, width):
        super().__init__("Rectangle")
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

class Triangle(Shape):
    def __init__(self, base, height):
        super().__init__("Triangle")
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 8)]

for shape in shapes:
    shape.describe()
    print(f"Area: {shape.area():.2f}\n")
```

Output:

```
This is a Circle
Area: 78.54

This is a Rectangle
Area: 24.00

This is a Triangle
Area: 12.00
```

---

## Hybrid Inheritance

**A combination of two or more types** of inheritance in one hierarchy.

```
        Person
       /      \
  Student    Employee
       \      /
     WorkingStudent
```

This mixes hierarchical (two children of `Person`) with multiple (`WorkingStudent` has two parents).

```python
class Person:
    def __init__(self, name):
        self.name = name

    def show_person(self):
        print(f"Person: {self.name}")

class Student(Person):
    def __init__(self, name, course):
        super().__init__(name)
        self.course = course

    def show_student(self):
        print(f"Studies: {self.course}")

class Employee(Person):
    def __init__(self, name, company):
        super().__init__(name)
        self.company = company

    def show_employee(self):
        print(f"Works at: {self.company}")

class WorkingStudent(Student, Employee):
    def __init__(self, name, course, company):
        Person.__init__(self, name)
        self.course = course
        self.company = company

    def show_all(self):
        self.show_person()
        self.show_student()
        self.show_employee()

ws = WorkingStudent("Mahesh", "Computer Science", "TechCorp")
ws.show_all()

print()
for cls in WorkingStudent.mro():
    print(cls.__name__)
```

Output:

```
Person: Mahesh
Studies: Computer Science
Works at: TechCorp

WorkingStudent
Student
Employee
Person
object
```

### The five types at a glance

| Type | Structure | Description |
| --- | --- | --- |
| **Single** | `A → B` | One child, one parent |
| **Multiple** | `A, B → C` | One child, many parents |
| **Multilevel** | `A → B → C` | A chain of inheritance |
| **Hierarchical** | `A → B, A → C` | Many children, one parent |
| **Hybrid** | Mixed | Any combination of the above |

---

## Method Overriding

**Method overriding** means a child class provides its own version of a method that already exists in the parent. The child's version wins.

```python
class Animal:
    def speak(self):
        print("Animal makes a sound")

class Dog(Animal):
    def speak(self):                    # overrides the parent
        print("Dog says Woof!")

class Cat(Animal):
    def speak(self):                    # overrides the parent
        print("Cat says Meow!")

a = Animal()
d = Dog()
c = Cat()

a.speak()    # Animal makes a sound
d.speak()    # Dog says Woof!
c.speak()    # Cat says Meow!
```

### Rules for overriding

1. The method name must be **exactly the same**.
2. It must be defined in a **child** class.
3. Python does not check the parameters — but keeping them compatible is good practice.

### Extending instead of replacing

Often you want the parent's behaviour **plus** something extra. Call the parent with `super()`.

```python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def display(self):
        print(f"Name: {self.name}")
        print(f"Salary: {self.salary}")

class Manager(Employee):
    def __init__(self, name, salary, department):
        super().__init__(name, salary)
        self.department = department

    def display(self):
        super().display()               # run the parent's version first
        print(f"Department: {self.department}")

m = Manager("Mahesh", 90000, "IT")
m.display()
```

Output:

```
Name: Mahesh
Salary: 90000
Department: IT
```

### Calling the parent explicitly

You can also name the parent class directly, though `super()` is preferred.

```python
class Child(Parent):
    def method(self):
        Parent.method(self)     # works, but you must pass self
        super().method()        # ✅ cleaner and safer
```

### Overriding `__init__`

```python
class Vehicle:
    def __init__(self, brand):
        self.brand = brand
        print("Vehicle constructor called")

class Car(Vehicle):
    def __init__(self, brand, model):
        super().__init__(brand)      # must call this to set self.brand
        self.model = model
        print("Car constructor called")

c = Car("Toyota", "Corolla")
print(c.brand, c.model)
```

Output:

```
Vehicle constructor called
Car constructor called
Toyota Corolla
```

Forgetting `super().__init__()` means the parent's attributes are never created:

```python
class Car(Vehicle):
    def __init__(self, brand, model):
        self.model = model          # ❌ forgot super()

c = Car("Toyota", "Corolla")
print(c.brand)      # ❌ AttributeError: 'Car' object has no attribute 'brand'
```

---

## `super()` Function

`super()` gives you access to the **parent class** (more precisely, the next class in the MRO).

### Three main uses

```python
class Parent:
    def __init__(self, value):
        self.value = value

    def show(self):
        print(f"Parent value: {self.value}")

class Child(Parent):
    def __init__(self, value, extra):
        super().__init__(value)         # 1. call parent constructor
        self.extra = extra

    def show(self):
        super().show()                  # 2. call parent method
        print(f"Child extra: {self.extra}")

c = Child(10, 20)
c.show()
```

Output:

```
Parent value: 10
Child extra: 20
```

### Why `super()` beats naming the parent

```python
# Hard-coded — breaks if you change the parent class name
class Child(Parent):
    def __init__(self):
        Parent.__init__(self)

# Flexible — works no matter what the parent is called
class Child(Parent):
    def __init__(self):
        super().__init__()
```

Benefits:

- No need to repeat the parent's name.
- You can rename or swap the parent without editing every method.
- It follows the **MRO**, which matters enormously in multiple inheritance.
- You do not pass `self` manually.

### `super()` in multiple inheritance

`super()` follows the MRO chain, so each class gets called exactly once.

```python
class A:
    def __init__(self):
        print("A init")

class B(A):
    def __init__(self):
        print("B init start")
        super().__init__()
        print("B init end")

class C(A):
    def __init__(self):
        print("C init start")
        super().__init__()
        print("C init end")

class D(B, C):
    def __init__(self):
        print("D init start")
        super().__init__()
        print("D init end")

d = D()
```

Output:

```
D init start
B init start
C init start
A init
C init end
B init end
D init end
```

Even though `B` and `C` both inherit from `A`, `A.__init__` ran **only once**. This is called **cooperative multiple inheritance** and it is exactly why `super()` exists.

Compare with explicit parent calls:

```python
class D(B, C):
    def __init__(self):
        B.__init__(self)     # this would call A twice
        C.__init__(self)
```

### `super()` in multilevel chains

```python
class Grandparent:
    def greet(self):
        print("Hello from Grandparent")

class Parent(Grandparent):
    def greet(self):
        super().greet()
        print("Hello from Parent")

class Child(Parent):
    def greet(self):
        super().greet()
        print("Hello from Child")

Child().greet()
```

Output:

```
Hello from Grandparent
Hello from Parent
Hello from Child
```

---

## Other Useful Inheritance Tools

### `isinstance()` and `issubclass()`

```python
class Animal: pass
class Dog(Animal): pass

d = Dog()

print(isinstance(d, Dog))        # True
print(isinstance(d, Animal))     # True — inherited
print(isinstance(d, str))        # False

print(issubclass(Dog, Animal))   # True
print(issubclass(Animal, Dog))   # False
```

### Inspecting the hierarchy

```python
class A: pass
class B(A): pass
class C(B): pass

print(C.__bases__)      # (<class 'B'>,)  — direct parents
print(C.__mro__)        # full resolution order
print(A.__subclasses__())  # [<class 'B'>]
```

### Every class inherits from `object`

```python
class Demo:
    pass

print(Demo.__bases__)     # (<class 'object'>,)
print(issubclass(Demo, object))    # True
```

This is why every object already has `__str__`, `__eq__`, and friends (Module 18).

### Preventing inheritance issues with `pass`

If a child needs nothing extra:

```python
class SpecialError(Exception):
    pass          # inherits everything, adds a distinct type
```

---

## Composition vs Inheritance

Inheritance is not always the answer. **Composition** means storing another object as an attribute.

```python
# Inheritance — "is-a"
class Car(Vehicle):
    pass

# Composition — "has-a"
class Engine:
    def start(self):
        print("Engine started")

class Car:
    def __init__(self):
        self.engine = Engine()      # a Car HAS an Engine

    def start(self):
        self.engine.start()
        print("Car is ready")

c = Car()
c.start()
```

Output:

```
Engine started
Car is ready
```

| Inheritance | Composition |
| --- | --- |
| "is-a" relationship | "has-a" relationship |
| Tight coupling | Loose coupling |
| Harder to change later | Easy to swap parts |
| `class Car(Vehicle)` | `self.engine = Engine()` |

> 💡 A widely used guideline: **prefer composition over inheritance**. Use inheritance when the child truly is a specialised version of the parent; otherwise store an object as an attribute.
>

---

## Common Mistakes

### 1. Forgetting `super().__init__()`

```python
# Wrong
class Child(Parent):
    def __init__(self, x, y):
        self.y = y          # parent's attributes never created

# Correct
class Child(Parent):
    def __init__(self, x, y):
        super().__init__(x)
        self.y = y
```

### 2. Wrong parent order in multiple inheritance

```python
class A:
    def show(self): print("A")

class B:
    def show(self): print("B")

class C(A, B):
    pass

C().show()      # A — the leftmost parent wins
```

If you wanted `B`'s behaviour, write `class C(B, A)`.

### 3. An impossible MRO

```python
class A: pass
class B(A): pass

class C(A, B):      # ❌ TypeError: Cannot create a consistent MRO
    pass
```

A parent cannot come before its own child. Write `class C(B, A)` instead.

### 4. Overriding without matching behaviour

```python
class Shape:
    def area(self):
        return 0

class Circle(Shape):
    def area(self, radius):     # ⚠️ different signature breaks polymorphism
        return 3.14 * radius ** 2

shapes = [Shape(), Circle()]
for s in shapes:
    print(s.area())     # ❌ TypeError on Circle
```

Keep the signature compatible, or store `radius` in `__init__`.

### 5. Using inheritance for "has-a"

```python
# Wrong — a Car is not an Engine
class Car(Engine):
    pass

# Correct
class Car:
    def __init__(self):
        self.engine = Engine()
```

### 6. Deep inheritance chains

Five or six levels deep becomes impossible to follow. Two or three levels is usually plenty.

---

## Quick Reference

| Concept | Syntax | Meaning |
| --- | --- | --- |
| Inherit | `class Child(Parent):` | Child gets Parent's members |
| Multiple | `class C(A, B):` | Inherit from several parents |
| Call parent constructor | `super().__init__(args)` | Initialise the parent part |
| Call parent method | `super().method()` | Run the parent's version |
| Override | Redefine a method in the child | Child's version wins |
| Check instance | `isinstance(obj, Class)` | Is it that type (or a subclass)? |
| Check subclass | `issubclass(Child, Parent)` | Is one a subclass of the other? |
| Direct parents | `Class.__bases__` | Tuple of immediate parents |
| Resolution order | `Class.__mro__` or `Class.mro()` | Full lookup order |
| All children | `Class.__subclasses__()` | List of direct subclasses |
