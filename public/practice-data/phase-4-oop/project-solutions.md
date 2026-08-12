# Project Solutions

## P1. Shape Hierarchy
```python
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
        
    @abstractmethod
    def perimeter(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        if radius <= 0:
            raise ValueError("Radius must be positive")
        self.radius = radius
        
    def area(self):
        return math.pi * (self.radius ** 2)
        
    def perimeter(self):
        return 2 * math.pi * self.radius
        
    def __str__(self):
        return f"Circle(r={self.radius}, area={self.area():.2f}, perimeter={self.perimeter():.2f})"

class Rectangle(Shape):
    def __init__(self, length, width):
        if length <= 0 or width <= 0:
            raise ValueError("Dimensions must be positive")
        self.length = length
        self.width = width
        
    def area(self):
        return self.length * self.width
        
    def perimeter(self):
        return 2 * (self.length + self.width)
        
    def __str__(self):
        return f"Rectangle(l={self.length}, w={self.width}, area={self.area():.2f}, perimeter={self.perimeter():.2f})"

class Triangle(Shape):
    def __init__(self, a, b, c):
        if a <= 0 or b <= 0 or c <= 0:
            raise ValueError("Sides must be positive")
        if a + b <= c or a + c <= b or b + c <= a:
            raise ValueError("Triangle inequality violated")
        self.a = a
        self.b = b
        self.c = c
        
    def area(self):
        s = (self.a + self.b + self.c) / 2
        return math.sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))
        
    def perimeter(self):
        return self.a + self.b + self.c
        
    def __str__(self):
        return f"Triangle(a={self.a}, b={self.b}, c={self.c}, area={self.area():.2f}, perimeter={self.perimeter():.2f})"

def main():
    while True:
        choice = input("Choose shape (circle/rectangle/triangle/exit): ").strip().lower()
        if choice == 'exit':
            break
            
        try:
            if choice == 'circle':
                r = float(input("Radius: "))
                shape = Circle(r)
            elif choice == 'rectangle':
                l = float(input("Length: "))
                w = float(input("Width: "))
                shape = Rectangle(l, w)
            elif choice == 'triangle':
                a = float(input("Side a: "))
                b = float(input("Side b: "))
                c = float(input("Side c: "))
                shape = Triangle(a, b, c)
            else:
                print("Invalid shape")
                continue
                
            print(f"area={shape.area():.2f}  perimeter={shape.perimeter():.2f}")
        except ValueError as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()
```

## P2. Vector Math Class
```python
import math

class Vector:
    def __init__(self, x, y):
        self.x = float(x)
        self.y = float(y)
        
    def __add__(self, other):
        if not isinstance(other, Vector):
            return NotImplemented
        return Vector(self.x + other.x, self.y + other.y)
        
    def __sub__(self, other):
        if not isinstance(other, Vector):
            return NotImplemented
        return Vector(self.x - other.x, self.y - other.y)
        
    def __mul__(self, scalar):
        if not isinstance(scalar, (int, float)):
            return NotImplemented
        return Vector(self.x * scalar, self.y * scalar)
        
    def __rmul__(self, scalar):
        return self.__mul__(scalar)
        
    def __eq__(self, other):
        if not isinstance(other, Vector):
            return False
        return math.isclose(self.x, other.x) and math.isclose(self.y, other.y)
        
    def __abs__(self):
        return math.sqrt(self.x**2 + self.y**2)
        
    def __iadd__(self, other):
        if not isinstance(other, Vector):
            return NotImplemented
        self.x += other.x
        self.y += other.y
        return self
        
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

if __name__ == "__main__":
    v = Vector(3, 4)
    w = Vector(1, 2)
    print(f"v + w = {v + w}")
    print(f"v - w = {v - w}")
    print(f"v * 2 = {v * 2}")
    print(f"abs(v) = {abs(v)}")
    print(f"v == Vector(3, 4) : {v == Vector(3, 4)}")
```

## P3. Custom Container
```python
class Stack:
    def __init__(self, items=None):
        self._items = list(items) if items else []
        
    def push(self, item):
        self._items.append(item)
        
    def pop(self):
        if not self._items:
            raise IndexError("pop from empty stack")
        return self._items.pop()
        
    def peek(self):
        if not self._items:
            raise IndexError("peek from empty stack")
        return self._items[-1]
        
    def __len__(self):
        return len(self._items)
        
    def __getitem__(self, index):
        # Index 0 is the top of the stack (the last element added)
        if index >= len(self._items) or index < -len(self._items):
            raise IndexError("stack index out of range")
        actual_idx = len(self._items) - 1 - index if index >= 0 else -1 - index
        return self._items[actual_idx]
        
    def __setitem__(self, index, value):
        if index >= len(self._items) or index < -len(self._items):
            raise IndexError("stack index out of range")
        actual_idx = len(self._items) - 1 - index if index >= 0 else -1 - index
        self._items[actual_idx] = value
        
    def __iter__(self):
        # Iterate from top to bottom
        for item in reversed(self._items):
            yield item
            
    def __contains__(self, item):
        return item in self._items
        
    def __repr__(self):
        return f"Stack({list(reversed(self._items))})"


class Queue:
    def __init__(self, items=None):
        self._items = list(items) if items else []
        
    def enqueue(self, item):
        self._items.append(item)
        
    def dequeue(self):
        if not self._items:
            raise IndexError("dequeue from empty queue")
        return self._items.pop(0)
        
    def peek(self):
        if not self._items:
            raise IndexError("peek from empty queue")
        return self._items[0]
        
    def __len__(self):
        return len(self._items)
        
    def __getitem__(self, index):
        return self._items[index]
        
    def __iter__(self):
        return iter(self._items)
        
    def __contains__(self, item):
        return item in self._items
        
    def __repr__(self):
        return f"Queue({self._items})"

if __name__ == "__main__":
    stack = Stack()
    stack.push(1); stack.push(2); stack.push(3)
    print(f"len(stack) = {len(stack)}")
    print(f"stack[0] = {stack[0]}")
    print(f"3 in stack = {3 in stack}")
    print(f"list(stack) = {list(stack)}")
    
    queue = Queue()
    queue.enqueue('a'); queue.enqueue('b'); queue.enqueue('c')
    print(f"dequeue() = {queue.dequeue()}")
    print(f"list(queue) = {list(queue)}")
```

## P4. Animal Kingdom
```python
class Animal:
    def __init__(self, name):
        self.name = name
        
    def speak(self):
        return "...makes a sound."
        
    def __str__(self):
        return f"{self.name} ({self.__class__.__name__})"

class Mammal(Animal):
    def __init__(self, name):
        super().__init__(name)
        self.warm_blooded = True
        
    def speak(self):
        return "...mammal sound."

class Dog(Mammal):
    def speak(self):
        return "Bark!"
        
    def fetch(self):
        print(f"{self.name} fetched the ball.")

class Cat(Mammal):
    def speak(self):
        return "Meow!"

def speak_all(animals):
    for animal in animals:
        print(f"{animal.name} ({animal.__class__.__name__}): {animal.speak()}")

if __name__ == "__main__":
    rex = Dog("Rex")
    tom = Cat("Tom")
    
    speak_all([rex, tom])
    rex.fetch()
    
    mro = " -> ".join(c.__name__ for c in Dog.mro())
    print(f"[Class Dog MRO: {mro}]")
```

## P5. Temperature Class
```python
class Temperature:
    def __init__(self, celsius=0):
        self._kelvin = 0
        self.celsius = celsius
        
    @property
    def kelvin(self):
        return self._kelvin
        
    @kelvin.setter
    def kelvin(self, v):
        if v < 0:
            raise ValueError("Temperature cannot be below absolute zero")
        self._kelvin = v
        
    @property
    def celsius(self):
        return self.kelvin - 273.15
        
    @celsius.setter
    def celsius(self, v):
        self.kelvin = v + 273.15
        
    @property
    def fahrenheit(self):
        return self.celsius * 9/5 + 32
        
    @fahrenheit.setter
    def fahrenheit(self, v):
        self.celsius = (v - 32) * 5/9
        
    def __str__(self):
        return f"{self.celsius:.1f} C = {self.fahrenheit:.1f} F = {self.kelvin:.2f} K"

if __name__ == "__main__":
    t = Temperature()
    t.celsius = 25
    try:
        t.fahrenheit = -500
    except ValueError as e:
        print(f"ValueError: {e}")
    print(t)
```

## P6. Playing Card Deck
```python
import random

class Card:
    def __init__(self, rank, suit):
        self.rank = rank
        self.suit = suit
        
    def __repr__(self):
        return f"{self.rank}{self.suit}"

class Deck:
    def __init__(self):
        ranks = "A23456789TJQK"
        suits = "♠♥♦♣"
        self._cards = [Card(r, s) for s in suits for r in ranks]
        
    def shuffle(self):
        random.shuffle(self._cards)
        
    def deal(self):
        if not self._cards:
            raise IndexError("deal from empty deck")
        return self._cards.pop()
        
    def cut(self, n=26):
        if 0 <= n <= len(self._cards):
            self._cards = self._cards[n:] + self._cards[:n]
            
    def __len__(self):
        return len(self._cards)
        
    def __getitem__(self, index):
        return self._cards[index]

if __name__ == "__main__":
    deck = Deck()
    print(f"Deck created: {len(deck)} cards.")
    deck.shuffle()
    print(f"After shuffle: {deck[:5]}...")
    
    hand = [deck.deal() for _ in range(5)]
    print(f"Hand: {' '.join(str(c) for c in hand)}")
    print(f"Cards remaining: {len(deck)}")
```

## P7. Matrix Class
```python
class Matrix:
    def __init__(self, rows):
        if not rows:
            raise ValueError("Matrix cannot be empty")
        cols = len(rows[0])
        if any(len(r) != cols for r in rows):
            raise ValueError("All rows must have the same length")
        self.rows = [list(r) for r in rows]
        self.nrows = len(self.rows)
        self.ncols = cols
        
    def __add__(self, other):
        if not isinstance(other, Matrix) or (self.nrows, self.ncols) != (other.nrows, other.ncols):
            raise ValueError("Matrices must have the same shape")
        return Matrix([[self[i, j] + other[i, j] for j in range(self.ncols)] for i in range(self.nrows)])
        
    def __sub__(self, other):
        if not isinstance(other, Matrix) or (self.nrows, self.ncols) != (other.nrows, other.ncols):
            raise ValueError("Matrices must have the same shape")
        return Matrix([[self[i, j] - other[i, j] for j in range(self.ncols)] for i in range(self.nrows)])
        
    def __mul__(self, other):
        if isinstance(other, (int, float)):
            return Matrix([[val * other for val in row] for row in self.rows])
        elif isinstance(other, Matrix):
            if self.ncols != other.nrows:
                raise ValueError(f"Cannot multiply {self.nrows}x{self.ncols} by {other.nrows}x{other.ncols}")
            result = [[sum(self[i, k] * other[k, j] for k in range(self.ncols)) for j in range(other.ncols)] for i in range(self.nrows)]
            return Matrix(result)
        return NotImplemented
        
    def __rmul__(self, scalar):
        return self.__mul__(scalar)
        
    def __getitem__(self, idx):
        i, j = idx
        return self.rows[i][j]
        
    def __setitem__(self, idx, value):
        i, j = idx
        self.rows[i][j] = value
        
    def transpose(self):
        return Matrix([[self[i, j] for i in range(self.nrows)] for j in range(self.ncols)])
        
    def __str__(self):
        return "[" + ", ".join(str(r) for r in self.rows) + "]"
        
    def __repr__(self):
        return self.__str__()

if __name__ == "__main__":
    A = Matrix([[1, 2], [3, 4]])
    B = Matrix([[5, 6], [7, 8]])
    print(f"A + B = {A + B}")
    print(f"A * B = {A * B}")
    print(f"A.transpose() = {A.transpose()}")
```

## P8. Time Duration Class
```python
class Duration:
    def __init__(self, h=0, m=0, s=0):
        self._seconds = h * 3600 + m * 60 + s
        if self._seconds < 0:
            raise ValueError("Duration cannot be negative")
            
    @property
    def total_seconds(self):
        return self._seconds
        
    def __add__(self, other):
        if not isinstance(other, Duration):
            return NotImplemented
        return Duration(s=self._seconds + other._seconds)
        
    def __sub__(self, other):
        if not isinstance(other, Duration):
            return NotImplemented
        if self._seconds < other._seconds:
            raise ValueError("Duration cannot be negative")
        return Duration(s=self._seconds - other._seconds)
        
    def __mul__(self, scalar):
        if not isinstance(scalar, (int, float)) or scalar < 0:
            raise ValueError("Multiplier must be a non-negative number")
        return Duration(s=int(self._seconds * scalar))
        
    def __rmul__(self, scalar):
        return self.__mul__(scalar)
        
    def __lt__(self, other):
        if not isinstance(other, Duration): return NotImplemented
        return self._seconds < other._seconds
        
    def __le__(self, other):
        if not isinstance(other, Duration): return NotImplemented
        return self._seconds <= other._seconds
        
    def __eq__(self, other):
        if not isinstance(other, Duration): return False
        return self._seconds == other._seconds
        
    def __str__(self):
        h, rem = divmod(self._seconds, 3600)
        m, s = divmod(rem, 60)
        return f"{h}:{m:02d}:{s:02d}"
        
    def __repr__(self):
        h, rem = divmod(self._seconds, 3600)
        m, s = divmod(rem, 60)
        return f"Duration(h={h}, m={m}, s={s})"

if __name__ == "__main__":
    d1 = Duration(h=1, m=2, s=30)
    print(d1)
    d2 = Duration(m=45)
    print(f"d1 + d2 = {d1 + d2}")
    try:
        d1 - d2
    except ValueError as e:
        print(f"d1 - d2 -> ValueError: {e}")
    print(f"d1 * 2 = {d1 * 2}")
    print(f"d1 > d2 = {d1 > d2}")
```

## P9. Parking Lot System
```python
import math
from datetime import datetime

class LotFullError(Exception): pass
class SpotEmptyError(Exception): pass
class InvalidVehicleError(Exception): pass

class Vehicle:
    def __init__(self, plate):
        self.plate = plate
        self.type_name = "Unknown"
        self.hourly_rate = 0.0

class Car(Vehicle):
    def __init__(self, plate):
        super().__init__(plate)
        self.type_name = "Car"
        self.hourly_rate = 20.0

class Truck(Vehicle):
    def __init__(self, plate):
        super().__init__(plate)
        self.type_name = "Truck"
        self.hourly_rate = 50.0

class Motorcycle(Vehicle):
    def __init__(self, plate):
        super().__init__(plate)
        self.type_name = "Motorcycle"
        self.hourly_rate = 10.0

class ParkingLot:
    def __init__(self, total_spots=20):
        self.total_spots = total_spots
        self._vehicles = {}
        self._entry_times = {}
        
    def park(self, vehicle):
        for spot in range(1, self.total_spots + 1):
            if spot not in self._vehicles:
                self._vehicles[spot] = vehicle
                entry = datetime.now()
                self._entry_times[spot] = entry
                return spot, entry
        raise LotFullError("Parking lot is full")
        
    def exit(self, spot):
        if spot not in self._vehicles:
            raise SpotEmptyError(f"No vehicle at spot {spot}")
        vehicle = self._vehicles.pop(spot)
        entry = self._entry_times.pop(spot)
        
        # In a real app, use datetime.now(). For demo, simulate + 2h 5m
        from datetime import timedelta
        exit_time = entry + timedelta(hours=2, minutes=5)
        
        duration = exit_time - entry
        hours = math.ceil(duration.total_seconds() / 3600)
        fee = hours * vehicle.hourly_rate
        
        return vehicle, duration, fee
        
    def available(self):
        f1, f2 = [], []
        for spot in range(1, self.total_spots + 1):
            if spot not in self._vehicles:
                if spot <= 10: f1.append(str(spot))
                else: f2.append(str(spot))
        return f"Floor 1: {','.join(f1)}  Floor 2: {','.join(f2)}"

def main():
    lot = ParkingLot()
    while True:
        print("1. Park  2. Exit  3. Availability  4. Summary  5. Quit")
        choice = input("Choice: ").strip()
        
        try:
            if choice == '1':
                vtype = input("Vehicle type (car/truck/bike): ").strip().lower()
                plate = input("Plate: ").strip()
                if vtype == 'car': v = Car(plate)
                elif vtype == 'truck': v = Truck(plate)
                elif vtype in ('bike', 'motorcycle'): v = Motorcycle(plate)
                else: raise InvalidVehicleError("Invalid vehicle type")
                
                spot, entry = lot.park(v)
                time_str = entry.strftime("%H:%M")
                print(f"Parked at spot {spot}. Ticket: spot {spot}, {plate}, {time_str}")
                
            elif choice == '2':
                spot = int(input("Spot: "))
                vehicle, duration, fee = lot.exit(spot)
                
                h, r = divmod(duration.total_seconds(), 3600)
                m = r // 60
                
                print(f"Duration {int(h)}h {int(m)}m, fee: {fee:.2f} ({vehicle.type_name.lower()} rate {vehicle.hourly_rate}/hr)")
                print(f"Freed spot {spot}.")
                
            elif choice == '3':
                print(lot.available())
            elif choice == '4':
                print(f"Occupied spots: {len(lot._vehicles)}/{lot.total_spots}")
            elif choice == '5':
                break
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()
```

## P10. Complete Capstone
```python
import json

class LibraryError(Exception): pass
class BookUnavailableError(LibraryError): pass
class MemberLimitError(LibraryError): pass

class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = str(isbn)
        
    @property
    def isbn(self):
        return self._isbn
        
    @isbn.setter
    def isbn(self, value):
        if not str(value).isdigit():
            raise ValueError("ISBN must be digits only")
        self._isbn = str(value)
        
    def __eq__(self, other):
        if not isinstance(other, Book): return False
        return self.isbn == other.isbn
        
    def __hash__(self):
        return hash(self.isbn)
        
    def __str__(self):
        return f"Book('{self.isbn}')"
        
    def to_dict(self):
        return {"title": self.title, "author": self.author, "isbn": self.isbn}

class Member:
    def __init__(self, name, member_id):
        if len(name) < 2:
            raise ValueError("Name too short")
        self.name = name
        self.member_id = str(member_id)
        
    def to_dict(self):
        return {"name": self.name, "member_id": self.member_id}

class Library:
    def __init__(self):
        self._books = {}
        self._members = {}
        self._issued = {}
        
    def add_book(self, book):
        self._books[book.isbn] = book
        self.save()
        
    def register_member(self, member):
        self._members[member.member_id] = member
        self.save()
        
    def issue(self, isbn, member_id):
        if isbn not in self._books: raise LibraryError("Book not in catalog")
        if member_id not in self._members: raise LibraryError("Member not found")
        if isbn in self._issued: raise BookUnavailableError("Book already issued")
        
        count = sum(1 for mid in self._issued.values() if mid == member_id)
        if count >= 3: raise MemberLimitError("Max 3 books allowed")
        
        self._issued[isbn] = member_id
        self.save()
        
    def return_book(self, isbn):
        if isbn in self._issued:
            del self._issued[isbn]
            self.save()
            return True
        return False
        
    def search(self, substring):
        q = substring.lower()
        return [b for b in self._books.values() if q in b.title.lower() or q in b.author.lower()]
        
    def __len__(self):
        return len(self._books)
        
    def __contains__(self, isbn):
        return isbn in self._books
        
    def __iter__(self):
        return iter(self._books.values())
        
    def load(self, filepath="library.json"):
        try:
            with open(filepath, "r") as f:
                data = json.load(f)
                self._books = {isbn: Book(**b) for isbn, b in data.get("books", {}).items()}
                self._members = {mid: Member(**m) for mid, m in data.get("members", {}).items()}
                self._issued = data.get("issued", {})
        except (FileNotFoundError, json.JSONDecodeError):
            pass
            
    def save(self, filepath="library.json"):
        data = {
            "books": {isbn: b.to_dict() for isbn, b in self._books.items()},
            "members": {mid: m.to_dict() for mid, m in self._members.items()},
            "issued": self._issued
        }
        with open(filepath, "w") as f:
            json.dump(data, f, indent=2)

def main():
    lib = Library()
    lib.load()
    
    while True:
        print("1. Add Book  2. Search  3. Register Member  4. Issue  5. Return  6. Status  7. Exit")
        choice = input("Choice: ").strip()
        try:
            if choice == '1':
                t = input("Title: ")
                a = input("Author: ")
                i = input("ISBN: ")
                b = Book(t, a, i)
                lib.add_book(b)
                print(f"Added: {b}")
                
            elif choice == '2':
                q = input("Search string: ")
                results = lib.search(q)
                for b in results:
                    status = "Issued" if b.isbn in lib._issued else "Available"
                    print(f"{b.title} by {b.author} ({b.isbn}) - {status}")
                    
            elif choice == '3':
                n = input("Name: ")
                mid = input("Member ID: ")
                m = Member(n, mid)
                lib.register_member(m)
                print(f"Registered member {mid}.")
                
            elif choice == '4':
                i = input("ISBN: ")
                mid = input("Member: ")
                lib.issue(i, mid)
                print(f"Issued to member {mid}.")
                
            elif choice == '5':
                i = input("ISBN: ")
                if lib.return_book(i):
                    print("Returned successfully.")
                else:
                    print("Book was not issued.")
                    
            elif choice == '6':
                print(f"Books: {len(lib)}   Members: {len(lib._members)}")
                for i, mid in lib._issued.items():
                    print(f"Issued: {i} -> Member#{mid}")
                    
            elif choice == '7':
                break
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()
```
