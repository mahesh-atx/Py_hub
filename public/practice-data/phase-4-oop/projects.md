# 🚀 Practice Projects for Phase 4

Projects for **Modules 13–19**: classes, constructors, attributes, methods, encapsulation, abstraction, inheritance, polymorphism, and magic/dunder methods.

**Rules for this set:**

- Class names in `CamelCase`, methods and attributes in `snake_case`.
- Every class gets an `__init__` that sets all its attributes, plus `__str__` (and `__repr__` where asked).
- Validate input in `__init__` or with `@property` setters; raise errors instead of printing them deep in the logic.
- Keep internal data protected with `_` or `__`; use `ABC` where a project asks for abstraction.
- One class = one responsibility.

---

## P1. Shape Hierarchy

**Difficulty:** Easy
**Learning Objective:** Use an `ABC` with `@abstractmethod` so every subclass is forced to implement `area()` and `perimeter()`.

**Scenario.** An abstract `Shape` base class and three concrete shapes — `Circle`, `Rectangle`, `Triangle` — each with `area()` and `perimeter()`. A driver that stores shapes of different types in one list and calls the same methods on all of them (polymorphism).

**Requirements**

- [ ]  `Shape(ABC)` with `@abstractmethod area()` and `perimeter()`; instantiating `Shape()` raises `TypeError`.
- [ ]  `Circle` stores radius, validates `radius > 0`.
- [ ]  `Rectangle` stores length and width; `Triangle` stores three sides and validates the **triangle inequality** (each side < sum of the other two).
- [ ]  `area()` uses Heron's formula for the triangle: `s = (a+b+c)/2`, `sqrt(s(s-a)(s-b)(s-c))`.
- [ ]  `__str__` on each: `Circle(r=5, area=78.54, perimeter=31.42)`.
- [ ]  Driver loop: user picks a shape and dimensions; prints `area`/`perimeter` — one list, one loop, no `if/elif` on type.

**Sample Run**

```
Choose shape (circle/rectangle/triangle): triangle
Side a: 3
Side b: 4
Side c: 5
area=6.00  perimeter=12.00
```

**Hint:** `from abc import ABC, abstractmethod`. Heron's formula needs `(s-a)*(s-b)*(s-c)` — a tiny wrong parenthesis changes every answer.

---

## P2. Vector Math Class

**Difficulty:** Medium
**Learning Objective:** Overload arithmetic and comparison operators — `+`, `-`, `*`, `==`, and `abs()` — so your class feels built-in.

**Scenario.** A 2D `Vector` class where `+`, `-`, `*` (scalar), `==`, and `abs()` all work naturally. Then a small demo REPL: `v = Vector(3, 4)`, `print(abs(v))` → `5.0`.

**Requirements**

- [ ]  `Vector(x, y)` two float components; `__add__`, `__sub__` return new `Vector`s.
- [ ]  `__mul__` supports `v * 2` (scalar); also handle `2 * v` with `__rmul__`.
- [ ]  `__eq__` and `__ne__` compare components; a `Vector` never equals a tuple or int (return `False`, no crash).
- [ ]  `__abs__` returns the Euclidean length (float).
- [ ]  `__repr__` returns `Vector(3.0, 4.0)` — used by the demo.
- [ ]  `__iadd__` support: `v += Vector(1, 1)` mutates in place and returns `self`.

**Sample Run**

```
v = Vector(3, 4)
w = Vector(1, 2)
v + w = Vector(4.0, 6.0)
v - w = Vector(2.0, 2.0)
v * 2 = Vector(6.0, 8.0)
abs(v) = 5.0
v == Vector(3, 4) : True
```

**Hint:** `__neq__` — Python derives `!=` from `__eq__` automatically in modern versions, so implement `__eq__` and let `!=` work. Return `Vector(...)` from `__add__`, not a tuple.

---

## P3. Custom Container

**Difficulty:** Medium
**Learning Objective:** Implement the container protocol — `__len__`, `__getitem__`, `__iter__`, `__contains__`, `__setitem__` — on a `Stack` and a `Queue`.

**Scenario.** Two classic containers. `Stack` is LIFO with push/pop; `Queue` is FIFO with enqueue/dequeue. Both support `len()`, indexing, iteration, and `in` checks, so `for item in stack` and `stack[0]` work.

**Requirements**

- [ ]  `Stack.push(x)`, `Stack.pop()` (raises `IndexError` on empty), `peek()`.
- [ ]  `Queue.enqueue(x)`, `dequeue()`, `peek()`.
- [ ]  `__len__`, `__getitem__` (negative indices work), `__iter__` yields items in pop order.
- [ ]  `__contains__` for `x in stack`.
- [ ]  `__setitem__` on the stack updates an item by position (document what position 0 means: top).
- [ ]  `__repr__`: `Stack([3, 2, 1])` (top last in the list).

**Sample Run**

```
stack = Stack(); stack.push(1); stack.push(2); stack.push(3)
len(stack) = 3      stack[0] = 3      3 in stack = True
list(stack) = [3, 2, 1]
queue = Queue(); enqueue a, b, c
dequeue() = a      list(queue) = [b, c]
```

**Hint:** Implement with an internal `_items` list; `__iter__` can `return iter(self._items)` or `yield from`. Empty-pop raising `IndexError` matches Python conventions.

---

## P4. Animal Kingdom

**Difficulty:** Easy
**Learning Objective:** Multilevel inheritance with polymorphic `speak()` and correct `super().__init__()` chains.

**Scenario.** `Animal → Mammal → Dog` with polymorphic `speak()`, plus a `speak_all(animals)` function that accepts any iterable of animals and prints each sound. A zoo can hold a list of mixed animals.

**Requirements**

- [ ]  `Animal(name)` with `name`, `speak()` returning a generic `"...makes a sound."`, `__str__` returning `name (Animal)`.
- [ ]  `Mammal(Animal)` — adds `warm_blooded = True`, calls `super().__init__(name)`, overrides `speak()` to `"...mammal sound."`
- [ ]  `Dog(Mammal)` overrides `speak()` to `"Bark!"`, adds a `fetch()` method.
- [ ]  Add `Cat(Mammal)` with `"Meow!"` to show the polymorphic pattern.
- [ ]  `speak_all(animals)` prints one line per animal using the `name` too: `Rex (Dog): Bark!`
- [ ]  Show `Dog.mro()` output in a comment (a demo of MRO).

**Sample Run**

```
Rex (Dog): Bark!
Tom (Cat): Meow!
Rex fetched the ball.
[Class Dog MRO: Dog -> Mammal -> Animal -> object]
```

**Hint:** `super().__init__(name)` in `Mammal` is mandatory — without it `Animal` never sets `name` and every attribute errors.

---

## P5. Temperature Class

**Difficulty:** Medium
**Learning Objective:** Use `@property` + setters so conversions happen automatically and validation lives in one place.

**Scenario.** A `Temperature` class where the user sets `temp.celsius` and reads `temp.fahrenheit` / `temp.kelvin` as properties, and vice versa — setting any of the three updates the internal stored Kelvin value.

**Requirements**

- [ ]  Internal storage is always Kelvin: `self._kelvin`.
- [ ]  `__init__(self, celsius=0)` uses the celsius property setter.
- [ ]  Properties `celsius`, `fahrenheit`, `kelvin` — only `kelvin` has a real setter; celsius setter converts `C = K - 273.15`.
- [ ]  Validation: `temp.kelvin = -5` raises `ValueError("Temperature cannot be below absolute zero")` — no direct attribute writes.
- [ ]  `__str__`: `25.0 C = 77.0 F = 298.15 K`.
- [ ]  No storing X and Y and Z — one source of truth.

**Sample Run**

```
t = Temperature()            # 0 C
t.celsius = 25
t.fahrenheit = 77.0 -> ok
t.fahrenheit = -500 -> ValueError: Temperature cannot be below absolute zero
print(t) -> 25.0 C = 77.0 F = 298.15 K
```

**Hint:** Setter pattern: `@temp.setter def kelvin(self, v): if v < ABS_ZERO: raise ValueError(...); self._kelvin = v`. All other properties delegate through `kelvin`.

---

## P6. Playing Card Deck

**Difficulty:** Medium
**Learning Objective:** Compose two classes (`Card` and `Deck`) and implement shuffle, deal, and `__getitem__`/`__len__` on the deck.

**Scenario.** A `Card(rank, suit)` and a `Deck` of 52 cards with `shuffle()`, `deal()` (removes and returns the top card), `cut()` (moves the top half to the bottom), and Pythonic sequence support.

**Requirements**

- [ ]  `Card.__repr__` = `"A♠"`, rank order `A,2..10,J,Q,K`, suits `♠♥♦♣`.
- [ ]  `Deck` builds all 52 cards; `shuffle()` uses `random.shuffle(self._cards)`.
- [ ]  `deal()` returns the top card and removes it; dealing from an empty deck raises `IndexError`.
- [ ]  `__len__`, `__getitem__` so `deck[0]` and `deck[::-1]` work.
- [ ]  `cut(n=26)` moves the first n cards to the bottom in order.
- [ ]  Demo: shuffle, deal a 5-card hand, print remaining count.

**Sample Run**

```
Deck created: 52 cards.
After shuffle: ['Q♣', '3♦', ...]
Hand: J♠ 5♥ K♦ 2♣ 9♠
Cards remaining: 47
```

**Hint:** `rank = "A23456789TJQK"` — use `"T"` for 10 to keep card strings equal length. `random.shuffle` works in place.

---

## P7. Matrix Class

**Difficulty:** Hard
**Learning Objective:** Overload operators for 2D data with shape validation — the closest a beginner gets to a real numeric library.

**Scenario.** A `Matrix` class supporting `+`, `-`, `*` (matrix multiplication), scalar multiplication, `__getitem__` with `(row, col)` tuples, and `transpose()`. Shape mismatches raise `ValueError` with clear messages.

**Requirements**

- [ ]  `__init__` takes a list of lists; validate rectangular shape (all rows same length) or raise `ValueError`.
- [ ]  `__add__`/`__sub__` require identical shapes, else `ValueError("Matrices must have the same shape")`.
- [ ]  `__mul__` is **matrix multiplication** — check `A.cols == B.rows`; `__rmul__` supports `2 * M`.
- [ ]  `M[i, j]` indexed with a tuple; `M[i, j] = v` via `__setitem__`.
- [ ]  `transpose()` returns a new Matrix; `__str__` prints rows aligned: `[[1, 2], [3, 4]]`.
- [ ]  Demo: build two matrices, print sum, product, transpose.

**Sample Run**

```
A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
A + B = [[6, 8], [10, 12]]
A * B = [[19, 22], [43, 50]]
A.transpose() = [[1, 3], [2, 4]]
```

**Hint:** Matrix product: `result[i][j] = sum(A[i][k] * B[k][j] for k in range(A.cols))`. Validate in `__init__` with `len(set(len(r) for r in rows)) == 1`.

---

## P8. Time Duration Class

**Difficulty:** Medium
**Learning Objective:** Operator overloading for time math — add, subtract, compare, and total-seconds conversion.

**Scenario.** A `Duration` class in hours/minutes/seconds. Durations add, subtract, compare (`<`, `==`), convert to seconds, and repeat with `*` (e.g. workouts). Negative durations are invalid.

**Requirements**

- [ ]  Store total seconds internally: `self._seconds`; `__init__` accepts h/m/s keyword args.
- [ ]  `total_seconds()` property; `__add__` and `__sub__` return new `Duration`.
- [ ]  Subtraction must never produce a negative duration — raise `ValueError` instead.
- [ ]  `__mul__` with a number: `Duration(h=1) * 2`; `__rmul__` too. Validate multiplier is a non-negative number.
- [ ]  Comparison operators `__lt__`, `__le__`, `__eq__`, `__gt__` (derive the rest from `__lt__`/`__eq__` with mixed types handled safely).
- [ ]  `__str__` as `1:02:30` (zero-padded), `__repr__` as `Duration(h=1, m=2, s=30)`.

**Sample Run**

```
d1 = Duration(h=1, m=2, s=30)   print(d1) -> 1:02:30
d2 = Duration(m=45)             d1 + d2 = 1:47:30
d1 - d2 -> ValueError: Duration cannot be negative
d1 * 2 = 2:05:00
d1 > d2 = True
```

**Hint:** Keep a single integer; convert in `__str__` with divmod: `h, rem = divmod(total, 3600); m, s = divmod(rem, 60)`.

---

## P9. Parking Lot System

**Difficulty:** Hard
**Learning Objective:** A complete OOP composition design — `Vehicle` subclasses, slot allocation, tickets, and fee calculation with polymorphism.

**Scenario.** A parking lot with `Car`, `Truck`, and `Motorcycle` vehicles, each with a different hourly rate. The lot tracks free spots, issues tickets with entry time, and calculates fees on exit. Two floors, 20 spots total.

**Requirements**

- [ ]  `Vehicle` base: license plate, `type_name`, `hourly_rate`; subclasses set them (polymorphism for the fee).
- [ ]  `ParkingLot` with fixed `spots`; `park(vehicle)` assigns the lowest free spot or raises `LotFullError`.
- [ ]  `exit(spot)` needs `datetime` for the parking duration; fee = hours * vehicle rate (round hours up).
- [ ]  Ticket prints spot number, plate, entry time, and the due fee on exit.
- [ ]  `available()` prints free spots like `Floor 1: 1,2,5,9  Floor 2: 13,16`.
- [ ]  Menu: `1. Park` `2. Exit` `3. Availability` `4. Summary` `5. Quit`; bad input errors are raised and caught at the menu level.

**Sample Run**

```
1. Park  2. Exit  3. Availability  4. Summary  5. Quit
Choice: 1
Vehicle type (car/truck/bike): truck
Plate: MH-12-AB-1234
Parked at spot 1. Ticket: spot 1, MH-12-AB-1234, 10:02
Choice: 2
Spot: 1
Duration 2h 5m, fee: 125.00 (truck rate 50/hr)
Freed spot 1.
```

**Hint:** Round hours up with `math.ceil(duration.total_seconds() / 3600)`. Keep `self._vehicles = {spot: vehicle}` so exit prints the right rate via the vehicle object.

---

## P10. Complete Capstone

**Difficulty:** Hard
**Learning Objective:** Everything in one project — four OOP pillars, composition, magic methods, file persistence, custom exceptions, and a menu-driven UI.

**Scenario.** A **Library Management System** tying Modules 13–19 together: `Book`, `Member`, and `Library` classes; JSON persistence; custom exceptions; and a full interactive menu. This is the "finish a project end to end" experience that Phase 4 exists for.

**Requirements**

- [ ]  `Book(title, author, isbn)` with `@property` validation (isbn must be a string of digits), `__eq__`/`__hash__` on isbn, `__str__`.
- [ ]  `Member(name, member_id)` validates name length; membership as a composition of the library.
- [ ]  `Library` holds books and members, exposes `add_book`, `register_member`, `issue`, `return_book`, `search(title_substring)` returning a list (composition).
- [ ]  `IssueError` chain: `BookUnavailableError` (already issued), `MemberLimitError` (max 3 books), all raised, not printed.
- [ ]  Persistence: `library.json` saves books (issued state) and members; load at startup, save on every change.
- [ ]  Magic methods on `Library`: `__len__` = books count, `__contains__` = isbn membership, `__iter__` over books.
- [ ]  Menu: `1. Add Book` `2. Search` `3. Register Member` `4. Issue` `5. Return` `6. Library Status` `7. Exit`.
- [ ]  `Library Status` prints totals and the list of currently issued books.

**Sample Run**

```
1. Add Book  2. Search  3. Register Member  4. Issue  5. Return  6. Status  7. Exit
Choice: 1
Title: The Pragmatic Programmer
Author: Hunt & Thomas
ISBN: 9780201616224
Added: Book('9780201616224')
Choice: 4
ISBN: 9780201616224
Member: 1
Issued to member 1.
Choice: 6
Books: 1   Members: 1
Issued: 9780201616224 -> Member#1
```

**Hint:** Draw the design before coding: things = Book, Member, Library; know = attributes; do = methods; relations = Library **has** Books and Members (composition). Build in this order: `Book` → test it → `Member` → test → `Library` → persistence last.