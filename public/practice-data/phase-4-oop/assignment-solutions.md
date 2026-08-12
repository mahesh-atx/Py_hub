# Assignment Solutions

## A15. Class Design Fundamentals
```python
import math

class Book:
    def __init__(self, title: str, author: str, pages: int):
        self.title = title
        self.author = author
        self.pages = pages
        
    def reading_time(self, words_per_page: int = 300, words_per_minute: int = 250) -> float:
        total_words = self.pages * words_per_page
        minutes = total_words / words_per_minute
        return minutes / 60
        
    @classmethod
    def from_string(cls, data: str):
        title, author, pages = data.split("|")
        return cls(title, author, int(pages))

class Rectangle:
    def __init__(self, length: float, width: float):
        self.length = length
        self.width = width
        
    def is_square(self) -> bool:
        return self.length == self.width

class Circle:
    def __init__(self, radius: float):
        if radius < 0:
            raise ValueError(f"Radius cannot be negative, got {radius}")
        self.radius = radius

class Point:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y
        
    def distance_to(self, other: 'Point') -> float:
        return math.sqrt((self.x - other.x)**2 + (self.y - other.y)**2)

class Student:
    instance_count = 0
    
    def __init__(self, name: str):
        self.name = name
        Student.instance_count += 1
        
    @classmethod
    def get_count(cls) -> int:
        return cls.instance_count
        
    def instance_method(self):
        print(f"Instance method called on {self}")
        
    @classmethod
    def class_method(cls):
        print(f"Class method called on {cls}")
        
    @staticmethod
    def static_method():
        print("Static method called (no self or cls)")

class Dog:
    # BAD: tricks = [] # Shared mutable state
    
    def __init__(self, name: str):
        self.name = name
        self.tricks = [] # FIX: Instance-specific list
        
    def add_trick(self, trick: str):
        self.tricks.append(trick)

if __name__ == "__main__":
    print(f"Book reading time: {Book('Dune', 'Herbert', 320).reading_time():.1f} hours")
    print(f"Distance: {Point(0,0).distance_to(Point(3,4))}")
    print(f"Is square: {Rectangle(5,5).is_square()}")
    
    try:
        Circle(-3)
    except ValueError as e:
        print(f"Caught expected error: {e}")
        
    buddy = Dog("Buddy")
    max_dog = Dog("Max")
    buddy.add_trick("roll over")
    print(f"buddy tricks: {buddy.tricks}  max tricks: {max_dog.tricks}")
    
    s = Student("Alice")
    s.instance_method()
    s.class_method()
    s.static_method()
    Student.class_method()
    Student.static_method()
    # Student.instance_method() # Fails: needs instance
    
    p1 = Point(1, 1)
    p2 = Point(1, 1)
    print(f"p1 == p2: {p1 == p2}") # False because no __eq__
    print(f"p1 is p2: {p1 is p2}") # False because different objects
```

## A16. Encapsulation and Validation
```python
from abc import ABC, abstractmethod
import math

class BankAccount:
    def __init__(self, initial_balance: float):
        self.public_val = 1
        self._protected_val = 2
        self.__balance = initial_balance
        
    def get_balance(self) -> float:
        return self.__balance
        
    def set_balance(self, amount: float):
        if amount < 0: raise ValueError("Balance cannot be negative")
        self.__balance = amount

class PropertyAccount:
    def __init__(self, initial_balance: float):
        self._balance = initial_balance
        
    @property
    def balance(self) -> float:
        return self._balance
        
    @balance.setter
    def balance(self, amount: float):
        if amount < 0: raise ValueError("Balance cannot be negative")
        self._balance = amount

class Temperature:
    def __init__(self, celsius: float):
        self.celsius = celsius
        
    @property
    def fahrenheit(self) -> float:
        return (self.celsius * 9/5) + 32
        
    @fahrenheit.setter
    def fahrenheit(self, value: float):
        self.celsius = (value - 32) * 5/9

class Person:
    def __init__(self, age: int, email: str):
        self.age = age
        self.email = email
        
    @property
    def age(self) -> int: return self._age
    
    @age.setter
    def age(self, value: int):
        if not isinstance(value, int) or not (0 <= value <= 150):
            raise ValueError(f"Invalid age: {value}")
        self._age = value
        
    @property
    def email(self) -> str: return self._email
    
    @email.setter
    def email(self, value: str):
        if "@" not in value or "." not in value.split("@")[-1]:
            raise ValueError(f"Invalid email: {value}")
        self._email = value

class Order:
    def __init__(self, order_id: str):
        self._order_id = order_id
        
    @property
    def order_id(self) -> str:
        return self._order_id

class Shape(ABC):
    @abstractmethod
    def area(self) -> float: pass
    
    @abstractmethod
    def perimeter(self) -> float: pass
    
    def describe(self) -> str:
        return f"A {self.__class__.__name__} with area {self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius
    def area(self) -> float: return math.pi * self.radius ** 2
    def perimeter(self) -> float: return 2 * math.pi * self.radius

class Rectangle(Shape):
    def __init__(self, w: float, h: float):
        self.w = w
        self.h = h
    def area(self) -> float: return self.w * self.h
    def perimeter(self) -> float: return 2 * (self.w + self.h)

class Triangle(Shape):
    def __init__(self, a: float, b: float, c: float):
        self.a = a
        self.b = b
        self.c = c
    def perimeter(self) -> float: return self.a + self.b + self.c
    def area(self) -> float:
        s = self.perimeter() / 2
        return math.sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))

if __name__ == "__main__":
    acc = BankAccount(100)
    try: print(acc.__balance)
    except AttributeError as e: print("Mangled:", e)
    print("Accessible via mangled name:", acc._BankAccount__balance)
    
    shapes = [Circle(5), Rectangle(4, 5), Triangle(3, 4, 5)]
    for s in shapes:
        print(s.describe(), "Perimeter:", round(s.perimeter(), 2))
```

## A17. Inheritance Hierarchy
```python
class Animal:
    def __init__(self, name: str):
        self.name = name
    def speak(self) -> str: return "..."

class Dog(Animal):
    def speak(self) -> str: return "Bark"

class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

class Employee(Person):
    def __init__(self, name: str, age: int, salary: float):
        # Deliberately omitting super().__init__(name, age) breaks name and age
        super().__init__(name, age)
        self.salary = salary

class Vehicle: pass
class Car(Vehicle): pass
class ElectricCar(Car): pass

class EmployeeBase:
    def calculate_bonus(self) -> float: return 0.0

class Manager(EmployeeBase):
    def calculate_bonus(self) -> float: return 1000.0

class Developer(EmployeeBase):
    def calculate_bonus(self) -> float: return 500.0

class Flyer:
    def move(self): print("Flying")

class Swimmer:
    def move(self): print("Swimming")

class Duck(Flyer, Swimmer): pass

class A:
    def __init__(self):
        print("A init")
        super().__init__()

class B(A):
    def __init__(self):
        print("B init")
        super().__init__()

class C(A):
    def __init__(self):
        print("C init")
        super().__init__()

class D(B, C):
    def __init__(self):
        print("D init")
        super().__init__()

# Composition example
class Engine:
    def start(self): print("Engine starts")

class CarComposed:
    def __init__(self):
        self.engine = Engine() # HAS-A
    def start(self):
        self.engine.start()

if __name__ == "__main__":
    d = D()
    print("MRO of D:", [c.__name__ for c in D.__mro__])
    # A runs once because super() follows the MRO (D -> B -> C -> A -> object)
    
    duck = Duck()
    duck.move() # Prints "Flying" because Flyer is first in MRO
```

## A18. Polymorphism and Magic Methods
```python
import functools

class Vector2D:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y
        
    def __add__(self, other: 'Vector2D') -> 'Vector2D':
        return Vector2D(self.x + other.x, self.y + other.y)
        
    def __mul__(self, scalar: float) -> 'Vector2D':
        return Vector2D(self.x * scalar, self.y * scalar)
        
    def __str__(self) -> str:
        return f"({self.x}, {self.y})"
        
    def __repr__(self) -> str:
        return f"Vector2D(x={self.x}, y={self.y})"

@functools.total_ordering
class Money:
    def __init__(self, amount: float):
        self.amount = amount
        
    def __eq__(self, other: 'Money') -> bool:
        if not isinstance(other, Money): return NotImplemented
        return self.amount == other.amount
        
    def __lt__(self, other: 'Money') -> bool:
        if not isinstance(other, Money): return NotImplemented
        return self.amount < other.amount

class Playlist:
    def __init__(self, songs: list):
        self.songs = songs
        
    def __len__(self) -> int: return len(self.songs)
    
    def __getitem__(self, index): return self.songs[index]
    
    def __contains__(self, song: str) -> bool:
        return any(s.lower() == song.lower() for s in self.songs)

class Multiplier:
    def __init__(self, factor: int):
        self.factor = factor
        
    def __call__(self, value: int) -> int:
        return value * self.factor

class FileManager:
    def __init__(self, name: str):
        self.name = name
        
    def __enter__(self):
        print(f"Opening {self.name}")
        return self
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing {self.name}. Exception: {exc_type}")
        return False # do not suppress exceptions

class Matrix:
    def __init__(self, rows: list[list[float]]):
        self.rows = rows
        
    def __mul__(self, other: 'Matrix') -> 'Matrix':
        if len(self.rows[0]) != len(other.rows):
            raise ValueError(f"Cannot multiply shapes")
        result = [[sum(a * b for a, b in zip(self_row, other_col))
                   for other_col in zip(*other.rows)]
                  for self_row in self.rows]
        return Matrix(result)

    def __str__(self):
        return str(self.rows)

if __name__ == "__main__":
    v1 = Vector2D(2, 3)
    v2 = Vector2D(4, 1)
    print(f"v1 + v2 = {v1 + v2}")
    
    with FileManager("test.txt") as f:
        print("Inside context")
```

## A19. Library Management System
```python
from abc import ABC, abstractmethod
from datetime import datetime, timedelta
import json

class BookNotAvailableError(Exception): pass
class BorrowLimitExceededError(Exception): pass
class OutstandingFineError(Exception): pass

class Book:
    def __init__(self, isbn: str, title: str, author: str, total: int, available: int):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.copies_total = total
        self.copies_available = available
        
    @property
    def is_available(self) -> bool:
        return self.copies_available > 0
        
    def __str__(self) -> str:
        return f"'{self.title}' by {self.author}"

class Member(ABC):
    def __init__(self, member_id: str, name: str):
        self.member_id = member_id
        self.name = name
        self.fine_balance = 0.0
        
    @property
    @abstractmethod
    def borrow_limit(self) -> int: pass
    
    @property
    @abstractmethod
    def loan_period_days(self) -> int: pass

class StudentMember(Member):
    @property
    def borrow_limit(self) -> int: return 3
    @property
    def loan_period_days(self) -> int: return 14

class FacultyMember(Member):
    @property
    def borrow_limit(self) -> int: return 10
    @property
    def loan_period_days(self) -> int: return 30

class Loan:
    def __init__(self, isbn: str, member_id: str, issue_date: str, due_date: str):
        self.isbn = isbn
        self.member_id = member_id
        self.issue_date = datetime.strptime(issue_date, "%Y-%m-%d")
        self.due_date = datetime.strptime(due_date, "%Y-%m-%d")
        
    @property
    def is_overdue(self) -> bool:
        return datetime.now() > self.due_date
        
    def fine(self) -> float:
        if self.is_overdue:
            days = (datetime.now() - self.due_date).days
            return days * 5.0
        return 0.0

class Library:
    def __init__(self):
        self.books = {}
        self.members = {}
        self.loans = []
        
    def issue(self, isbn: str, member_id: str):
        book = self.books.get(isbn)
        member = self.members.get(member_id)
        
        if not book or not book.is_available:
            raise BookNotAvailableError()
            
        current_loans = sum(1 for L in self.loans if L.member_id == member_id)
        if current_loans >= member.borrow_limit:
            raise BorrowLimitExceededError()
            
        if member.fine_balance > 100:
            raise OutstandingFineError()
            
        book.copies_available -= 1
        issue_date = datetime.now()
        due_date = issue_date + timedelta(days=member.loan_period_days)
        self.loans.append(Loan(isbn, member_id, issue_date.strftime("%Y-%m-%d"), due_date.strftime("%Y-%m-%d")))
```

## Capstone - Design Your Own System
*(This is an open-ended assignment. A student will design their own classes, abstract base classes, persistence layer, and custom exceptions to model a real-world domain of their choosing, applying all OOP principles learned.)*
```python
# Example structure:
# class BaseEntity(ABC): ...
# class ConcreteEntityA(BaseEntity): ...
# class ConcreteEntityB(BaseEntity): ...
# class SystemManager: ...
# Persistence to system.json
```
