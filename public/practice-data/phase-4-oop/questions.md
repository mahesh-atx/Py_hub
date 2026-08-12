# 🧠 Phase 4 — 60 Practice Questions

Questions for **Modules 13–19**: classes and objects, constructors, encapsulation, abstraction, inheritance, polymorphism, and magic methods.

**Rules for this set:**

- Everything from Phases 1–3, plus classes, `__init__`, instance/class/static methods, properties, inheritance, `super()`, abstract base classes, and dunder methods.
- **Every question is a class design question.** Even where a function would do, write the class — the point is to develop instinct for what belongs in an object.
- Use type hints and docstrings throughout, as in Phase 3.

**How to use this file:**

1. Before writing code, list the **attributes** (what it knows) and **methods** (what it does) on paper.
2. Ask yourself: *would a plain dictionary do this job?* Sometimes it would, and recognising that is as valuable as writing the class.
3. Test every class by creating at least two instances and confirming they do not interfere with each other.

> 💡 **Tip:** The most common beginner error in this phase is putting data on the **class** that belongs on the **instance**. If two objects of your class accidentally share a list, you have hit it. Question 14 makes you produce the bug deliberately so you recognise it later.
>

---

## Tier 1 — Classes and Objects (Q1–Q12)

## Q1. First Class

Create a `Book` class with attributes `title`, `author` and `pages`, set in `__init__`. Create two book objects and print their attributes.

```
'Atomic Habits' by James Clear, 320 pages
```

**Explanation:** `self` is the instance, passed automatically when you call `obj.method()` — you declare it but never pass it. Attributes assigned as `self.x = ...` inside `__init__` belong to that one object; each new instance gets its own.

**Hint:** `def __init__(self, ...)` runs automatically when you write `ClassName(...)`.

---

## Q2. Method with Logic

Add a `reading_time(wpm=250)` method to `Book` that estimates reading hours, assuming 300 words per page. Return the value rounded to 1 decimal.

```python
book.reading_time()   # 6.4
```

Verify: `320 pages × 300 words ÷ 250 wpm ÷ 60 min = 6.4 hours`.

**Explanation:** A method is an ordinary function that happens to live in a class and receives the instance as its first argument. It can read and modify any `self.` attribute, which is the whole point — the data and the behaviour travel together.

**Hint:** Access the object's own data through `self.` inside the method body.

---

## Q3. Rectangle Class

Create `Rectangle` with `length` and `width`. Add methods `area()`, `perimeter()`, and `is_square()`.

```python
r = Rectangle(5, 5)
r.area()        # 25
r.is_square()   # True
```

**Explanation:** Store length and width in `__init__`, then compute area and perimeter in methods rather than storing them as attributes. Stored values go stale the moment someone changes a dimension; computed ones cannot.

**Hint:** `return self.length * self.width` — recompute from the current attributes each call.

---

## Q4. Circle with Validation

Create `Circle` with a `radius`. Raise `ValueError` in `__init__` if the radius is not positive. Add `area()` and `circumference()`.

```python
Circle(-3)   # ValueError: Radius must be positive, got -3
```

**Explanation:** Validate inside `__init__` and raise immediately, so an invalid object can never exist. Validating in the method that uses the value instead means the bad object sits around until something happens to touch it, and the traceback then points far away from the real cause.

**Hint:** Check the value before assigning it to `self`.

---

## Q5. Counter Object

Create a `Counter` class with `increment()`, `decrement()`, `reset()` and a `value` attribute. Ensure the count never goes below zero.

**Expected:**

```python
c = Counter()
c.increment(); c.increment(); c.increment()
c.decrement()
c.value          # 2
c.reset()
c.value          # 0
c.decrement()
c.value          # 0   <- never goes below zero
```

**Explanation:** The counter lives on the instance, so each `Counter()` object counts independently. `increment` must modify `self.count` rather than a local variable — writing `count = count + 1` creates a local and leaves the attribute untouched, with no error at all.

**Hint:** `self.count += 1` inside the method.

---

## Q6. Bank Account — First Version

Create `BankAccount` with `owner` and `balance`. Add `deposit(amount)` and `withdraw(amount)`, both validating that the amount is positive and that withdrawals do not exceed the balance. Return the new balance.

**Expected:**

```python
acc = BankAccount("Priya", 1000)
acc.deposit(500)      # 1500
acc.withdraw(200)     # 1300
acc.withdraw(5000)    # rejected — returns 1300, balance unchanged
acc.deposit(-100)     # rejected — amount must be positive
```

**Explanation:** Deposits and withdrawals both need validation: positive amount, and for withdrawal, sufficient funds. Check **before** mutating the balance — subtracting first and noticing the negative afterwards has already corrupted the account.

**Hint:** Return a boolean or raise, so the caller knows whether the transaction happened.

---

## Q7. Object Inspection

Using the `Book` class, demonstrate `type()`, `isinstance()`, `hasattr()`, `getattr()`, `setattr()` and `__dict__`. Print what each returns.

```python
book.__dict__   # {'title': '...', 'author': '...', 'pages': 320}
```

**Explanation:** `vars(obj)` (or `obj.__dict__`) shows the instance attributes as a dictionary; `dir(obj)` lists everything reachable including inherited methods and dunders. `type(obj).__name__` gives the class name as a plain string.

**Hint:** `vars()`, `dir()`, `type()`, `isinstance()` — all built in, no import needed.

---

## Q8. Temperature Class

Create a `Temperature` class storing degrees Celsius. Add methods to return Fahrenheit and Kelvin, and a method reporting whether water would freeze or boil at that temperature.

**Expected:**

```python
t = Temperature(37)
t.to_fahrenheit()    # 98.6
t.to_kelvin()        # 310.15
t.water_state()      # 'liquid'

Temperature(100).water_state()   # 'boils'
Temperature(0).water_state()     # 'freezes'
```

**Explanation:** Storing celsius and computing fahrenheit on demand keeps the two in step automatically. Store both as plain attributes and they drift apart the instant one is assigned — the classic argument for computed values over cached ones.

**Hint:** Keep one source of truth and derive the other from it.

---

## Q9. Student Record

Create a `Student` class with `name`, `roll_no` and a `marks` dictionary. Add `add_mark(subject, score)`, `total()`, `percentage()` and `grade()` using the Phase 1 grading scale.

**Expected:**

```python
s = Student("Rohan", "R01")
s.add_mark("Math", 78); s.add_mark("Science", 85); s.add_mark("English", 72)
s.total()        # 235
s.percentage()   # 78.33
s.grade()        # 'B'
```

**Explanation:** Group the marks in a list or dictionary rather than five separate attributes, so the total and average are one `sum()` call and adding a sixth subject changes nothing else.

**Hint:** `self.marks = marks` where `marks` is a list, then `sum(self.marks)`.

---

## Q10. Timer Class

Create a `Timer` class with `start()`, `stop()` and `elapsed()` using `time.perf_counter()`. Raise a `RuntimeError` if `stop()` is called before `start()`.

**Expected:**

```python
t = Timer()
t.elapsed()      # RuntimeError: timer was never started
t.start()
t.stop()
t.elapsed()      # a small float, e.g. 0.0001
```

**Explanation:** `time.perf_counter()` in `start()` and again in `stop()`, storing the difference. Calling `stop()` before `start()` must not crash — initialise the start time to `None` in `__init__` and check for it.

**Hint:** Store the start time on `self` so `stop()` can reach it.

---

## Q11. Playlist

Create a `Playlist` class holding a list of song titles. Add `add_song()`, `remove_song()`, `shuffle()` (using `random`), `total_songs()` and `show()`. Prevent duplicate songs.

**Expected:**

```python
p = Playlist()
p.add_song("Song A"); p.add_song("Song B")
p.add_song("Song A")     # rejected — duplicate
p.total_songs()          # 2
p.remove_song("Song A")
p.total_songs()          # 1
p.remove_song("Ghost")   # handled, not a crash
```

**Explanation:** A list attribute plus methods that guard it. `remove` on a missing song raises `ValueError`, so check membership first or catch it — either way the object should not blow up because a caller asked for something absent.

**Hint:** `if song in self.songs:` before removing.

---

## Q12. Point and Distance

Create a `Point` class with `x` and `y`. Add `distance_to(other)` using the Pythagorean formula, and `move(dx, dy)`.

```python
Point(0, 0).distance_to(Point(3, 4))   # 5.0
```

**Explanation:** Distance is `math.sqrt((x2-x1)**2 + (y2-y1)**2)`. The method takes **another Point** as its argument, so you access `self.x` and `other.x` — the first time a method receives an object of its own class, which is the pattern every operator overload uses.

**Hint:** `def distance_to(self, other):` then reach into `other.x` and `other.y`.

---

## Tier 2 — Constructors, Class and Static Methods (Q13–Q24)

## Q13. Instance vs Class Attribute

Create a `Dog` class where `species = "Canis familiaris"` is a class attribute and `name` is an instance attribute. Create three dogs, print each one's species, then change the class attribute and show that all three see the change.

**Expected:**

```python
a, b, c = Dog("Buddy"), Dog("Max"), Dog("Rex")
a.species                      # 'Canis familiaris'
Dog.species = "Canis lupus"
a.species, b.species, c.species    # all three now 'Canis lupus'
a.name, b.name                 # 'Buddy', 'Max'  <- instance attrs unaffected
```

**Explanation:** A class attribute is stored **once on the class**, so reassigning `Dog.species` is visible from all three instances immediately. Instance attributes like `name` live on each object separately and are unaffected. Careful: assigning `a.species = "X"` does **not** change the class attribute — it creates a new instance attribute that shadows it for that one object.

**Hint:** Change it through the class (`Dog.species = ...`), not through an instance.

---

## Q14. The Shared Mutable Trap

Deliberately create this bug: define a class with `tricks = []` as a **class** attribute, create two dog objects, append a trick to one, and show that both now have it. Then fix it by moving the list into `__init__`.

```
BEFORE FIX:
buddy.tricks: ['roll over']
max.tricks:   ['roll over']    <- the bug
AFTER FIX:
buddy.tricks: ['roll over']
max.tricks:   []
```

**Make sure you can explain why this happens.** It is the same root cause as Phase 3's mutable default argument.

**Explanation:** `tricks = []` is created **once**, when the class body executes, so both dogs share the identical list object — verified: `buddy.tricks is max.tricks` is `True`. Appending through one is visible through the other. Moving `self.tricks = []` into `__init__` builds a fresh list per instance. This is exactly the Phase 3 mutable-default trap in a different costume: a mutable object created once at definition time and then shared.

**Hint:** Print `id(dog.tricks)` for both objects — the same number proves the sharing.

---

## Q15. Instance Counter

Add a class attribute to `Student` that counts how many students have been created. Increment it in `__init__`. Add a class method `count()` returning the total.

**Expected:**

```python
for n in ["A", "B", "C", "D", "E"]:
    Student(n, "R" + n)
Student.count()      # 5
```

**Explanation:** Increment the class attribute through the **class name**, not through `self` — `Student.count += 1` updates the shared counter, while `self.count += 1` reads the class value once and then creates a per-instance attribute, leaving the real counter stuck at 0. No error either way.

**Hint:** A `@classmethod` receives `cls`, so it can return `cls.count`.

---

## Q16. Class Method as Alternative Constructor

Add `Book.from_string("Title|Author|Pages")` as a `@classmethod` that parses a string and returns a `Book` object.

```python
Book.from_string("Dune|Frank Herbert|412")
```

**Explanation:** An alternative constructor parses its input, then returns `cls(...)` — using `cls` rather than the hard-coded class name means subclasses get a working constructor for free. `"Dune|Frank Herbert|412"` splits on `|` into three parts, and the page count needs casting to `int`.

**Hint:** `@classmethod` decorator, first parameter `cls`, and `return cls(title, author, pages)`.

---

## Q17. Class Method Factory Chain

Add three alternative constructors to `Date`: `from_string("2025-03-15")`, `from_tuple((2025, 3, 15))` and `today()`. Each returns a `Date` object.

**Expected:**

```python
Date.from_string("2025-03-15").year     # 2025
Date.from_tuple((2025, 3, 15)).month    # 3
Date.today()                            # today's date as a Date object
```

**Explanation:** Three constructors, one object type. This is Python's answer to overloaded constructors in other languages: rather than one `__init__` guessing what it was handed, each named classmethod states its input format explicitly and converts it.

**Hint:** All three end in `return cls(year, month, day)` — only the parsing differs.

---

## Q18. Static Method Utility

Add a `@staticmethod` to a `MathHelper` class: `is_prime(n)`, `gcd(a, b)` and `is_leap_year(y)`. Call them without creating an instance.

```python
MathHelper.is_prime(97)   # True
```

**Explanation:** A `@staticmethod` takes neither `self` nor `cls` — it is a plain function namespaced inside the class. Use it when the logic is related to the class but needs none of its data. If you find yourself wanting `self`, it should have been an instance method.

**Hint:** Call it as `MathHelper.is_prime(97)` with no instance anywhere.

---

## Q19. Distinguishing the Three Method Types

In a single class, write one instance method, one class method and one static method. Each should print what it received (`self`, `cls`, or nothing). Call all three from both an instance and the class itself, and note which calls work.

**Explanation:** An instance method needs an object and fails when called on the class without one. A classmethod and a staticmethod both work either way — called through an instance, Python still passes the class (or nothing) rather than the object. That is the practical difference, and it is why factory methods are classmethods.

**Hint:** Try all six combinations and note which raise `TypeError`.

---

## Q20. Employee with ID Generation

Create an `Employee` class that auto-generates sequential employee IDs (`EMP001`, `EMP002`) using a class attribute counter. Add a class method to reset the counter.

**Expected:**

```python
Employee("Priya").emp_id     # 'EMP001'
Employee("Rohan").emp_id     # 'EMP002'
Employee("Anita").emp_id     # 'EMP003'
Employee.reset_counter()
Employee("New").emp_id       # 'EMP001'
```

**Explanation:** Increment the counter first, then format with `f"EMP{Employee._counter:03d}"` — the `03d` pads to three digits, giving `EMP001`. `reset_counter()` must be a classmethod setting `cls._counter = 0`, so the next employee starts again at `EMP001`.

**Hint:** `f"EMP{n:03d}"` handles the zero padding.

---

## Q21. Config Singleton-ish

Create a `Config` class holding settings in a class-level dictionary, with class methods `set(key, value)`, `get(key, default)` and `all()`. Demonstrate that changes are visible from anywhere without creating an instance.

**Expected:**

```python
Config.set("debug", True)
Config.set("retries", 3)
Config.get("debug")            # True
Config.get("missing", "n/a")   # 'n/a'
Config.all()                   # {'debug': True, 'retries': 3}
```

**Explanation:** Every method is a classmethod operating on one shared class-level dictionary, so there is no instance and no way to accidentally create a second copy of the config. That shared-mutable-state behaviour is a bug in Q14 and the entire feature here — the difference is whether you intended it.

**Hint:** `cls._settings[key] = value`, and `cls._settings.get(key, default)` for reads.

---

## Q22. Validating Constructor

Create a `Rectangle` whose `__init__` validates that both dimensions are positive numbers, raising `TypeError` for non-numbers and `ValueError` for non-positive values, with distinct messages.

**Expected:**

```python
Rectangle("5", 3)     # TypeError: length must be a number, got str
Rectangle(-5, 3)      # ValueError: length must be positive, got -5
Rectangle(0, 3)       # ValueError: length must be positive, got 0
Rectangle(5, 3)       # works
```

**Explanation:** Two different failures need two different exception types: `TypeError` when the argument is the wrong **kind** of thing, `ValueError` when it is the right kind with an unacceptable **value**. Check the type first — comparing a string with `< 0` raises `TypeError` anyway, but with a message that explains nothing.

**Hint:** `isinstance(x, (int, float))` for the type check; note `bool` passes it.

---

## Q23. Object Equality Without Dunders

Create two `Point` objects with identical coordinates. Show that `==` returns `False` and `is` returns `False`. Explain why. (You will fix this in Q40.)

**Explanation:** Both are `False`. Without `__eq__`, Python falls back to comparing **identity** — `==` behaves exactly like `is`, so two objects with identical data are still unequal. This is almost never what you want for value objects, and it silently breaks `in`, `.count()`, `.index()` and set membership.

**Hint:** You are not fixing this yet — just confirm both comparisons return `False` and understand why.

---

## Q24. The `__del__` Destructor

Add a `__del__` method to a class that prints a message. Create an object, delete it with `del`, and observe the message. Then explain why relying on `__del__` for cleanup is a bad idea compared with a `with` block.

**Expected:**

```python
obj = Resource("db")
del obj
# prints: Resource db is being destroyed
```

Then explain why `__del__` is unreliable: it runs when the garbage collector
decides to, which may be much later or never if a reference cycle exists.

**Explanation:** `del obj` removes one reference; `__del__` runs only when the **last** reference disappears and the garbage collector gets to it. With a reference cycle it may run much later, or never at the interpreter's discretion. That unpredictability is why cleanup belongs in a `with` block — `__exit__` is guaranteed to run, at a moment you can point to.

**Hint:** Create a second reference to the same object and watch `del` print nothing.

---

## Tier 3 — Encapsulation and Abstraction (Q25–Q36)

## Q25. Protected Members

Create a `Vehicle` class with a protected attribute `_speed`. Show that Python does not prevent access, and explain what the single underscore actually communicates.

**Expected:**

```python
v = Vehicle()
v._speed          # 0   <- works fine, Python does not block it
v._speed = 999    # also works
```

The single underscore is a **convention**, not enforcement. It means
"internal, do not rely on this" — nothing more.

**Explanation:** A single underscore is a **convention only** — `obj._balance` still works perfectly. It signals "internal, may change without warning" to other developers and to tooling. Python deliberately provides no enforcement.

**Hint:** Prefix the attribute with one underscore and access it anyway to prove nothing stops you.

---

## Q26. Private Members and Name Mangling

Create an `Account` with a private `__balance`. Show that `account.__balance` raises `AttributeError`, then show that `account._Account__balance` works. Explain name mangling.

**Explanation:** A double underscore triggers **name mangling**: `self.__secret` is stored as `_C__secret`, verified above. So `c.__secret` raises `AttributeError` while `c._C__secret` returns `42`. This is not security — it exists to stop subclasses accidentally colliding with a parent's attribute names.

**Hint:** Print `vars(obj)` to see the mangled name Python actually stored.

---

## Q27. Getters and Setters

Add `get_balance()` and `set_balance(amount)` methods to `Account`, with the setter rejecting negative values. Use them instead of direct attribute access.

**Expected:**

```python
acc.get_balance()       # 5000
acc.set_balance(7000)
acc.get_balance()       # 7000
acc.set_balance(-100)   # rejected, balance stays 7000
```

**Explanation:** Explicit `get_x()`/`set_x()` methods work but read badly in Python: `obj.set_age(obj.get_age() + 1)` where `obj.age += 1` would do. Write them once to see the mechanism, then compare with `@property` in Q28 — that is the point of doing both.

**Hint:** Store the real value in `self._age` and expose it through the two methods.

---

## Q28. The @property Decorator

Rewrite Q27 using `@property` and `@balance.setter` so that `account.balance = -100` raises `ValueError` while still reading like a plain attribute.

```python
account.balance          # 5000
account.balance = -100   # ValueError: Balance cannot be negative
```

**Explanation:** `@property` turns a method into an attribute access, so `obj.area` calls the method without parentheses. The matching `@area.setter` intercepts assignment. The huge advantage over Q27: you can add validation to an existing plain attribute **without changing any calling code**.

**Hint:** `@property` above the getter, `@name.setter` above the setter — both named identically.

---

## Q29. Computed Property

Create a `Circle` where `area` and `circumference` are read-only `@property` values computed from the radius. Setting `circle.area = 50` should raise `AttributeError`.

**Expected:**

```python
c = Circle(7)
c.area             # 153.94
c.circumference    # 43.98
c.area = 50        # AttributeError: property 'area' has no setter
```

**Explanation:** A computed property has no setter and no stored value; it recalculates from the current attributes every access. That guarantees it can never be stale, at the cost of recomputing each time — fine for arithmetic, worth caching if it hits a database.

**Hint:** Just the `@property` getter, returning an expression built from other attributes.

---

## Q30. Property with Validation Chain

Create a `Person` class where setting `age` validates the type and range (0–150), and setting `email` validates that it contains `@` and `.`. Both raise `ValueError` with useful messages.

**Expected:**

```python
p = Person("Rohan", 30, "rohan@mail.com")
p.age = 200           # ValueError: age must be 0-150, got 200
p.age = "thirty"      # ValueError (or TypeError) — not a number
p.email = "bad"       # ValueError: email must contain @ and a domain
p.email = "a@b.com"   # accepted
```

**Explanation:** Validation belongs in the setter, so every assignment path goes through it — including the one in `__init__`, provided `__init__` assigns to the public name (`self.age = age`) rather than the private one (`self._age = age`). Assigning directly to `_age` bypasses your own validation, which is the commonest mistake here.

**Hint:** In `__init__`, assign through the property name to reuse the validation.

---

## Q31. Temperature with Two-Way Property

Create a `Temperature` class storing Celsius internally, but exposing `fahrenheit` as a property with **both** a getter and a setter. Setting `temp.fahrenheit = 212` should make `temp.celsius` equal 100.

**Explanation:** Store celsius; expose fahrenheit as a property that converts on read and converts back on write. Setting `temp.fahrenheit = 212` must update the stored celsius to 100, so both readings stay consistent — one source of truth, two views of it.

**Hint:** The fahrenheit setter computes `self._celsius = (value - 32) * 5/9`.

---

## Q32. Read-Only ID

Create an `Order` class whose `order_id` is set once in `__init__` and exposed as a read-only property. Attempting to change it should raise `AttributeError`.

**Expected:**

```python
o = Order("ORD001")
o.order_id            # 'ORD001'
o.order_id = "ORD999" # AttributeError: property 'order_id' has no setter
```

**Explanation:** A property with a getter and **no setter** raises `AttributeError: property 'x' of 'Y' object has no setter` on assignment. That is genuine read-only enforcement, unlike the underscore convention in Q25 — the attribute cannot be reassigned from outside, only read.

**Hint:** Define the `@property` and simply do not write a `@x.setter`.

---

## Q33. First Abstract Class

Using `ABC` and `@abstractmethod`, create an abstract `Shape` with abstract methods `area()` and `perimeter()`. Show that instantiating `Shape()` directly raises `TypeError`.

```
TypeError: Can't instantiate abstract class Shape without an implementation
for abstract methods 'area', 'perimeter'
```

**Note:** the exact wording changed in recent Python versions — older tutorials show `with abstract methods area, perimeter`. The above is what Python 3.12+ prints.

**Explanation:** Inheriting from `ABC` and marking methods `@abstractmethod` makes the class impossible to instantiate directly — Python 3.13 reports `Can't instantiate abstract class Shape without an implementation for abstract methods 'area', 'perimeter'`. The error names every method you still owe.

**Hint:** `from abc import ABC, abstractmethod`, then `class Shape(ABC):`.

---

## Q34. Concrete Implementations

Implement `Circle`, `Rectangle` and `Triangle` as concrete subclasses of `Shape`. Store them in a list and print each one's area and perimeter in a loop.

**Expected:**

```python
shapes = [Circle(7), Rectangle(5, 3), Triangle(3, 4, 5)]
for s in shapes:
    print(f"{type(s).__name__}: area={s.area():.2f} perimeter={s.perimeter():.2f}")

# Circle: area=153.94 perimeter=43.98
# Rectangle: area=15.00 perimeter=16.00
# Triangle: area=6.00 perimeter=12.00
```

**Explanation:** A subclass becomes concrete only once it implements **every** abstract method. Miss one and instantiation still fails, with the missing name in the message. That is the guarantee an ABC buys you: the failure happens at construction, not later when something calls the method that was never written.

**Hint:** Implement all abstract methods, then instantiate to confirm it works.

---

## Q35. Abstract with Shared Behaviour

Extend `Shape` with a **concrete** method `describe()` that calls the abstract `area()`. Show that subclasses inherit `describe()` without reimplementing it.

**Expected:**

```python
Circle(7).describe()      # 'Circle with area 153.94'
Rectangle(5,3).describe() # 'Rectangle with area 15.00'
```

Neither subclass defines `describe()` — both inherit it, and it calls
each subclass's own `area()`.

**Explanation:** An abstract base can hold ordinary concrete methods too, and those can call the abstract ones. The base defines *how the pieces fit together* while subclasses supply the pieces — the template method pattern, and the main reason to prefer an ABC over a bare interface.

**Hint:** Write a normal method in the ABC that calls `self.area()`, which subclasses define.

---

## Q36. Abstract Payment Processor

Create an abstract `PaymentProcessor` with abstract `process(amount)` and `refund(transaction_id)`. Implement `UPIPayment`, `CardPayment` and `WalletPayment`, each with different validation rules and fees.

**Explanation:** Each processor implements the same abstract interface differently, so the calling code needs no `if payment_type == ...` chain — it just calls `processor.pay(amount)`. Adding a new payment method means adding one class and changing nothing else.

**Hint:** One abstract `process_payment`, three subclasses, one loop calling them uniformly.

---

## Tier 4 — Inheritance (Q37–Q46)

## Q37. Single Inheritance

Create `Animal` with `name` and a `speak()` method. Create `Dog` inheriting from it, overriding `speak()`. Demonstrate that `Dog` also has `name`.

**Expected:**

```python
d = Dog("Buddy")
d.name              # 'Buddy'      <- inherited from Animal
d.speak()           # 'Woof!'      <- overridden
Animal("Generic").speak()   # 'Some sound'
isinstance(d, Animal)       # True
```

**Explanation:** `Dog` inherits `name` and `__init__` from `Animal` without restating them, and overrides only `speak()`. `isinstance(d, Animal)` is `True` — a `Dog` **is an** `Animal`, which is the test for whether inheritance is the right tool at all.

**Hint:** `class Dog(Animal):` and define only what differs.

---

## Q38. super() in the Constructor

Create `Person(name, age)` and `Employee(name, age, salary)` where `Employee.__init__` calls `super().__init__(name, age)` before setting `salary`. Show what breaks if you forget the `super()` call.

**Expected:**

```python
# WITH super().__init__(name, age):
e = Employee("Priya", 30, 75000)
e.name, e.age, e.salary     # 'Priya', 30, 75000

# WITHOUT the super() call:
e.salary        # 75000
e.name          # AttributeError: 'Employee' object has no attribute 'name'
```

**Explanation:** Without `super().__init__(name, age)` the parent's `__init__` never runs, so `self.name` is never assigned and reading it raises `AttributeError` — but **only when something touches it**, which may be much later and far away. Object construction appears to succeed. Call `super()` first, then add the subclass's own attributes.

**Hint:** `super().__init__(name, age)` as the first line of the child's `__init__`.

---

## Q39. Multilevel Inheritance

Build a three-level chain: `Vehicle` → `Car` → `ElectricCar`. Each level adds attributes and overrides one method. Print the MRO with `ElectricCar.__mro__`.

**Expected:**

```python
ElectricCar.__mro__
# (<class 'ElectricCar'>, <class 'Car'>, <class 'Vehicle'>, <class 'object'>)
```

Four entries: the class itself, each parent in order, then `object`.

**Explanation:** Verified: `ElectricCar.__mro__` is `(ElectricCar, Car, Vehicle, object)`. Python searches that list left to right for every attribute and stops at the first match, which is precisely why an override in the child wins over the parent. Every class ends at `object`.

**Hint:** `ClassName.__mro__` or `ClassName.mro()` prints the resolution order.

---

## Q40. Hierarchical Inheritance

From one `Employee` base, create `Manager`, `Developer` and `Designer`. Each overrides a `calculate_bonus()` method with different rules. Store all three in a list and total the bonuses.

**Expected:**

```python
staff = [Manager("A", 100000), Developer("B", 80000), Designer("C", 70000)]
for s in staff:
    print(type(s).__name__, s.calculate_bonus())
# Manager 20000.0     (20%)
# Developer 12000.0   (15%)
# Designer 7000.0     (10%)
# total: 39000.0
```

Use whatever bonus rates you like — the point is that one loop calls three
different implementations.

**Explanation:** With 20%, 15% and 10% the bonuses are `20000.0`, `12000.0` and `7000.0`, totalling **39000.0**. One loop, three different implementations, no `if` statements about type — that is polymorphism, and it is why the list can hold mixed subclasses safely.

**Hint:** `sum(s.calculate_bonus() for s in staff)` after the loop.

---

## Q41. Multiple Inheritance and MRO

Create classes `Flyer` and `Swimmer`, each with a `move()` method. Create `Duck(Flyer, Swimmer)`. Determine which `move()` runs, then print `Duck.__mro__` to explain why.

**Expected:**

```python
Duck().move()      # 'Flying'   <- Flyer comes first in the bases
Duck.__mro__
# (<class 'Duck'>, <class 'Flyer'>, <class 'Swimmer'>, <class 'object'>)
```

Python resolves left to right through the base list.

**Explanation:** `Duck().move()` returns `'Flying'` because the MRO is `(Duck, Flyer, Swimmer, object)` and Python takes the first match. Reversing the base list to `Duck(Swimmer, Flyer)` reverses the answer — the order in which you write the parents is a real design decision, not cosmetic.

**Hint:** Swap the two base classes and re-run to confirm the behaviour flips.

---

## Q42. The Diamond Problem

Build the classic diamond: `A` → `B`, `A` → `C`, `B, C` → `D`. Put a print statement in each `__init__` and use `super()` throughout. Trace the order in which the constructors run.

**Expected:**

```python
D()
# D.__init__
# B.__init__
# C.__init__
# A.__init__      <- runs ONCE, not twice
```

The MRO is `D -> B -> C -> A -> object`. `super()` follows that chain, which
is why `A.__init__` is not called twice despite two paths reaching it.

**Explanation:** Verified order: `D → B → C → A`, with **`A.__init__` running exactly once** despite two paths reaching it. The MRO is `(D, B, C, A, object)`, and `super()` walks that single linear chain rather than the inheritance tree. That is the diamond problem solved — in languages without an MRO, `A` would initialise twice.

**Hint:** Every class in the diamond must call `super().__init__()`, including `A`, or the chain breaks.

---

## Q43. Method Overriding vs Extending

In a subclass, write one method that **replaces** the parent's behaviour entirely and another that **extends** it by calling `super().method()` first. Demonstrate the difference in output.

**Expected:**

```python
child.replaced()   # 'Child only'
child.extended()   # 'Parent version' then 'Child addition'
```

**Explanation:** Replacing means simply defining the method again — the parent's version is never reached. Extending means calling `super().method()` inside the override and adding to its result. Choose extending whenever the parent does setup that still needs to happen, which is nearly always true of `__init__`.

**Hint:** The only difference is whether the override calls `super()`.

---

## Q44. isinstance vs type

Given the `Vehicle` → `Car` → `ElectricCar` chain, compare `isinstance(tesla, Vehicle)` with `type(tesla) == Vehicle`. Explain why `isinstance` is almost always the right choice.

**Expected:**

```python
tesla = ElectricCar(...)
isinstance(tesla, Vehicle)      # True   <- respects inheritance
isinstance(tesla, ElectricCar)  # True
type(tesla) == Vehicle          # False  <- exact class only
type(tesla) == ElectricCar      # True
```

**Explanation:** `isinstance(tesla, Vehicle)` is `True` but `type(tesla) == Vehicle` is `False`. `isinstance` respects the inheritance chain; `type ==` demands the exact class and silently rejects every subclass. Code written with `type ==` breaks the day someone extends your class — which is the whole point of having classes.

**Hint:** Use `isinstance` unless you specifically need to exclude subclasses.

---

## Q45. Composition Over Inheritance

Model a `Car` that **has an** `Engine` (composition) rather than **is an** `Engine`. Then explain, in a comment, one situation where composition is clearly better than inheritance.

**Expected:**

```python
car = Car("Tesla", Engine(150))
car.engine.horsepower       # 150
car.start()                 # delegates to engine.start()
isinstance(car, Engine)     # False  <- a Car HAS an engine, it is not one
```

**Explanation:** `isinstance(car, Engine)` is `False` — a `Car` **has an** `Engine` rather than **being** one, so the engine is stored as an attribute and its methods are delegated to. Composition wins when the relationship is "has a", when you need to swap the part at runtime, or when inheriting would drag in methods that make no sense on the container.

**Hint:** Store the engine as `self.engine` and have `Car.start()` call `self.engine.start()`.

---

## Q46. Shape Hierarchy with Abstract Base

Combine Tiers 3 and 4: an abstract `Shape`, concrete `Circle`/`Rectangle`, then `Square` inheriting from `Rectangle` and enforcing equal sides through a property. Setting `square.side = 7` must update both dimensions.

**Expected:**

```python
sq = Square(5)
sq.area()        # 25
sq.side = 7
sq.length, sq.width    # 7, 7   <- both updated
sq.area()        # 49
```

**Explanation:** A `Square` is a `Rectangle` with a constraint, so `side` is a property whose setter writes **both** `length` and `width`: `sq.side = 7` gives area 49. Note this is the textbook example of inheritance being awkward — a Square passes `isinstance(sq, Rectangle)` but breaks any code that expects to set length and width independently.

**Hint:** The setter assigns to both underlying attributes; the getter returns either one.

---

## Tier 5 — Polymorphism and Magic Methods (Q47–Q56)

## Q47. Duck Typing

Create three unrelated classes — `Duck`, `Robot`, `Person` — each with a `speak()` method. Write a loop that calls `speak()` on all of them without any shared base class. Explain why this works.

**Expected:**

```python
for thing in [Duck(), Robot(), Person("Rohan")]:
    print(thing.speak())
# Quack!
# BEEP BOOP
# Hello, I am Rohan
```

No shared base class, no interface declaration. Python only checks that the
method exists at call time.

**Explanation:** Python never checks the type — it looks for a `speak` attribute at call time and calls it. No base class, no interface, no registration. The cost is that a missing method surfaces as an `AttributeError` at runtime rather than being caught up front, which is exactly the trade an ABC reverses.

**Hint:** The loop is identical regardless of the objects' types; that is the whole demonstration.

---

## Q48. Operator Overloading — Addition

Create a `Vector2D` class with `__add__`, `__sub__` and `__mul__` (scalar multiplication).

```python
Vector2D(2, 3) + Vector2D(4, 1)   # Vector2D(6, 4)
Vector2D(2, 3) * 3                # Vector2D(6, 9)
```

**Explanation:** `__add__` is what `+` calls, receiving the right-hand operand as `other`. `Vector2D(2,3) + Vector2D(4,1)` gives `(6, 4)` and `* 3` gives `(6, 9)`. Return a **new** object rather than mutating `self`, matching how `+` behaves for every built-in type. Note `3 * vector` needs `__rmul__` as well.

**Hint:** `return Vector2D(self.x + other.x, self.y + other.y)`.

---

## Q49. `__str__` vs `__repr__`

Add both to `Vector2D`. Make `__str__` human-friendly and `__repr__` unambiguous. Show what `print(v)`, `str(v)`, `repr(v)` and evaluating `v` in the REPL each produce.

```python
print(v)   # (2, 3)
repr(v)    # Vector2D(x=2, y=3)
```

**Explanation:** `print(v)` and `str(v)` use `__str__` for a human; `repr(v)` and the bare REPL echo use `__repr__` for a developer. If you define only one, define `__repr__` — `str()` falls back to it, but not the other way round. The convention is that `repr` output should be valid Python that recreates the object.

**Hint:** `__repr__` should read like the constructor call: `Vector2D(x=2, y=3)`.

---

## Q50. Comparison Dunders

Add `__eq__`, `__lt__`, `__le__`, `__gt__` and `__ge__` to a `Money` class comparing amounts. Then sort a list of `Money` objects.

**Bonus:** use `functools.total_ordering` to get all six from just `__eq__` and `__lt__`.

**Explanation:** Python derives nothing automatically: defining `__lt__` does not give you `__gt__`. `functools.total_ordering` fills in the other four from `__eq__` plus any one ordering method. `sorted()` needs only `__lt__`, which is why a class can sort correctly and still fail on `>`.

**Hint:** `@functools.total_ordering` above the class, then write just `__eq__` and `__lt__`.

---

## Q51. `__len__` and `__getitem__`

Create a `Playlist` class supporting `len(playlist)`, `playlist[0]`, and slicing `playlist[1:3]`. Also make it iterable so a `for` loop works.

**Expected:**

```python
p = Playlist(["A", "B", "C", "D"])
len(p)          # 4
p[0]            # 'A'
p[-1]           # 'D'
p[1:3]          # ['B', 'C']
for song in p:  # iterates A, B, C, D
    ...
```

**Explanation:** `__len__` powers `len()`, `__getitem__` powers indexing. `p[1:3]` passes a **`slice` object**, not an integer — delegating to the underlying list with `return self.songs[index]` handles integers, negatives and slices in one line. Defining `__getitem__` also makes the object iterable, because Python falls back to indexing from 0 until `IndexError`.

**Hint:** Delegate straight to the internal list and every indexing form works for free.

---

## Q52. `__contains__`

Add `__contains__` to `Playlist` so that `"Song Title" in playlist` works case-insensitively.

**Expected:**

```python
"song a" in p     # True   <- case-insensitive
"SONG A" in p     # True
"Ghost" in p      # False
```

**Explanation:** `in` calls `__contains__`. For case-insensitive matching, lowercase both the query and each stored title. Without `__contains__`, Python falls back to iterating and comparing with `==`, which would be case-sensitive.

**Hint:** `return any(song.lower() == item.lower() for song in self.songs)`.

---

## Q53. `__call__`

Create a `Multiplier` class whose instances can be called like functions.

```python
double = Multiplier(2)
double(15)   # 30
```

Compare this with the closure you wrote in Phase 3 Q22. When would you choose each?

**Explanation:** `__call__` makes an instance callable, so `double(15)` returns `30`. Compare with the Phase 3 closure: a closure is lighter and perfect for one behaviour, while a callable object can carry state, expose other methods, and be inspected or serialised. Choose the class when the function needs to remember or report more than one thing.

**Hint:** `def __call__(self, x): return x * self.factor`.

---

## Q54. Context Manager with `__enter__` / `__exit__`

Create a `FileManager` class usable in a `with` block that opens a file, yields it, and guarantees closure even if an exception occurs. Print messages in both dunders to trace the flow.

**Expected:**

```python
with FileManager("test.txt", "w") as f:
    f.write("hello")
# entering: opening test.txt
# exiting: closing test.txt

with FileManager("test.txt", "r") as f:
    raise ValueError("boom")
# entering: opening test.txt
# exiting: closing test.txt      <- still runs
# ValueError: boom
```

**Explanation:** `__enter__` runs on entry and its **return value** is what `as f` binds — returning `self` instead of the file is the usual mistake. `__exit__` runs on the way out whether or not an exception occurred, which is the guarantee the whole construct exists for. Return `False` (or nothing) from `__exit__` to let the exception propagate.

**Hint:** `__exit__(self, exc_type, exc_value, traceback)` — all four parameters are required.

---

## Q55. `__hash__` and Set Membership

Make a `Point` class hashable by defining both `__eq__` and `__hash__`. Show that two equal points collapse into one entry in a set. Then remove `__hash__` and observe the `TypeError`.

**Expected:**

```python
{Point(1, 2), Point(1, 2), Point(3, 4)}    # 2 elements, not 3

# after removing __hash__:
{Point(1, 2)}
# TypeError: unhashable type: 'Point'
```

**Explanation:** Two equal points collapse to **one** set entry, so the set has 2 elements. The catch: **defining `__eq__` automatically sets `__hash__` to `None`**, verified above, making the class unhashable and raising `TypeError: unhashable type: 'Point'`. You must define both together. Objects that compare equal must hash equal, so hash the same tuple you compare.

**Hint:** `def __hash__(self): return hash((self.x, self.y))` — mirror whatever `__eq__` uses.

---

## Q56. Full-Featured Class

Build a `Matrix` class implementing `__init__`, `__str__`, `__repr__`, `__add__`, `__sub__`, `__mul__` (matrix multiplication), `__eq__`, `__len__` and `__getitem__`. Validate dimensions in every operation, raising `ValueError` on a mismatch.

```python
A = Matrix([[1, 2], [3, 4]])
B = Matrix([[5, 6], [7, 8]])
print(A * B)
# 19 22
# 43 50
```

**Explanation:** `A * B` gives `[[19, 22], [43, 50]]`. Validate dimensions in every operation: addition and subtraction need identical shapes, multiplication needs A's columns to equal B's rows. Raise `ValueError` with the actual dimensions in the message — `"cannot multiply 2x3 by 2x3"` is debuggable, `"invalid dimensions"` is not.

**Hint:** Build `__str__` first; you will read its output constantly while debugging the rest.

---

## Tier 6 — Complete System Design (Q57–Q60)

These are full projects. Expect 2–4 hours each.

## Q57. Library Management System

Design a complete library system.

**Classes required:**
- `Book` — ISBN, title, author, copies_total, copies_available; a read-only `is_available` property
- `Member` (abstract) — with `StudentMember` and `FacultyMember` subclasses having different borrowing limits (3 vs 10) and loan periods (14 vs 30 days)
- `Loan` — book, member, issue date, due date, a computed `is_overdue` property and a `fine()` method (₹5 per day late)
- `Library` — manages the collections

**Library must support:**
- Add and remove books, with duplicate-ISBN handling
- Register members with auto-generated IDs
- Issue a book (checking availability and the member's limit)
- Return a book, computing any fine
- Search by title, author or ISBN (partial matches)
- Reports: currently issued, overdue loans, most borrowed book, total fines outstanding

**Requirements:** custom exceptions (`BookNotAvailableError`, `BorrowLimitExceededError`, `MemberNotFoundError`), full encapsulation, `__str__` on every class, and persistence to JSON.

**Hint:** Start with `Book` and `Member` alone and get borrowing working before adding `Loan`, fines or persistence. Model the fine as a method on `Loan`, since only a loan knows both the due date and today.

---

## Q58. E-Commerce Order System

**Classes required:**
- `Product` — id, name, price, stock; a `reduce_stock()` method that raises on insufficient inventory
- `CartItem` — product plus quantity, with a computed `subtotal` property
- `Cart` — supports `__len__`, `__iter__`, `__contains__`; add/remove/update quantity; computes totals
- `Discount` (abstract) — with `PercentageDiscount`, `FlatDiscount` and `BuyOneGetOne` subclasses, each implementing `apply(total)`
- `Customer` — with `RegularCustomer` and `PremiumCustomer` subclasses (premium gets free shipping and 5% off)
- `Order` — captures cart contents at checkout time, with a status state machine: `PENDING → CONFIRMED → SHIPPED → DELIVERED`, or `CANCELLED` from any state before shipping

**Business rules:**
- Shipping is ₹50, free above ₹500 or for premium customers
- Discounts apply before shipping
- Cancelling a confirmed order restores stock
- An order cannot skip states — attempting to do so raises `InvalidStateTransitionError`

Print a formatted invoice on checkout.

**Hint:** Let each `OrderItem` compute its own line total, and `Order` just sum them. Push every calculation to the object that owns the data it needs.

---

## Q59. Employee Payroll System

**Classes required:**
- `Employee` (abstract) — with abstract `calculate_pay()`
- `SalariedEmployee` — fixed monthly salary
- `HourlyEmployee` — hourly rate, with 1.5× overtime beyond 160 hours
- `CommissionEmployee` — base salary plus a percentage of sales
- `Manager(SalariedEmployee)` — adds a team list and a bonus based on team size

**Also required:**
- A `Department` class holding employees, supporting `__len__` and `__iter__`
- A `Payroll` class that processes everyone, computes tax using Phase 1's slab rules, and produces a payslip
- Sorting employees by pay using `__lt__` and `total_ordering`
- Department reports: total cost, average pay, highest/lowest paid, headcount by type

**Requirements:** every attribute properly encapsulated with properties, salary changes validated (no decrease over 20% without a flag), and the whole payroll exportable to CSV.

**Hint:** Make the base `Employee.calculate_pay()` abstract so a new employee type cannot be added without implementing it — that is the ABC earning its place.

---

## Q60. Design Your Own System

Pick a domain you actually understand — a gym, a restaurant, a hospital ward, a cricket team, a music streaming service — and design a complete object system for it.

**Minimum requirements:**

- At least **6 classes**
- At least one **abstract base class** with two or more concrete implementations
- At least one **inheritance chain three levels deep**
- At least one case of **composition** (a class holding instances of another)
- **Encapsulation** throughout — no public mutable attributes without a property
- At least **5 magic methods** across your classes
- At least **2 custom exceptions**
- **Persistence** to JSON, with full load/save round-trip
- A **menu-driven interface** that never crashes

**Before writing any code, produce a design document:**

1. List every class, its attributes and its methods
2. Draw the inheritance relationships
3. Note which classes contain which others
4. Write down three operations the system must support, and trace which objects collaborate for each

**Then** write the code. When you finish, compare it against your design document and note where the design changed — that gap is the most educational part of the exercise.

**Hint:** Write the class names and one sentence each **before** any code. If you cannot describe a class in one sentence, it is doing too much and should be split.

---

## Checking your work

1. **Verify the computed answers.** Q2's reading time is `320 × 300 ÷ 250 ÷ 60 = 6.4` hours. Q12's distance is exactly `5.0`. Q56's matrix product is `[[19, 22], [43, 50]]`.
2. **Test instance independence.** For every class, create two objects, modify one, and confirm the other is unaffected. Q14 exists because this fails more often than you would expect.
3. **Test the error paths.** Every `raise` you write should be triggered by at least one test call.
4. **Re-read your own code after a week.** If you cannot tell what a class is responsible for from its name and docstring, the design is wrong regardless of whether it runs.

> ⚠️ Two traps dominate this phase. First, **mutable class attributes** (Q14) — objects silently share state, and the bug surfaces far from its cause. Second, **inheritance used for code reuse rather than genuine "is-a" relationships**. A `Car` is not a kind of `Engine`, even though reusing the engine's code is tempting. When the relationship feels forced, use composition (Q45) instead.
>

---

[← Phase 4 index](README.md) · [Projects & Key Takeaways](projects-and-takeaways.md)
