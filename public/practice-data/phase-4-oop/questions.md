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

**How to solve:**
1. Define a `Book` class with an `__init__` method taking `title`, `author`, and `pages`.
2. Inside `__init__`, assign these parameters to instance attributes using `self`.
3. Instantiate the class twice with different data and print the attributes.

**Explanation:** `self` is the instance, passed automatically when you call `obj.method()` — you declare it but never pass it. Attributes assigned as `self.x = ...` inside `__init__` belong to that one object; each new instance gets its own.

**Hint:** `def __init__(self, ...)` runs automatically when you write `ClassName(...)`.

---

## Q2. Method with Logic

Add a `reading_time(wpm=250)` method to `Book` that estimates reading hours, assuming 300 words per page. Return the value rounded to 1 decimal.

```python
book.reading_time()   # 6.4
```

Verify: `320 pages × 300 words ÷ 250 wpm ÷ 60 min = 6.4 hours`.

**How to solve:**
1. Define a method `reading_time` inside the `Book` class that takes `wpm` with a default of 250.
2. Calculate reading time by multiplying `self.pages` by 300, dividing by `wpm`, and dividing by 60.
3. Return the result rounded to 1 decimal place using the `round()` function.

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

**How to solve:**
1. Define a `Rectangle` class with an `__init__` storing `length` and `width`.
2. Create `area()` and `perimeter()` methods that compute their respective formulas using `self.length` and `self.width`.
3. Create an `is_square()` method that returns True if `self.length == self.width`.

**Explanation:** Store length and width in `__init__`, then compute area and perimeter in methods rather than storing them as attributes. Stored values go stale the moment someone changes a dimension; computed ones cannot.

**Hint:** `return self.length * self.width` — recompute from the current attributes each call.

---

## Q4. Circle with Validation

Create `Circle` with a `radius`. Raise `ValueError` in `__init__` if the radius is not positive. Add `area()` and `circumference()`.

```python
Circle(-3)   # ValueError: Radius must be positive, got -3
```

**How to solve:**
1. In `Circle.__init__`, check if `radius <= 0`. If so, raise a `ValueError` with a descriptive message.
2. If valid, assign `self.radius = radius`.
3. Implement `area()` and `circumference()` using `math.pi` and `self.radius`.

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

**How to solve:**
1. Create a `Counter` class initializing `self.value = 0` in `__init__`.
2. Implement `increment()` to add 1 to `self.value`, and `reset()` to set it to 0.
3. Implement `decrement()` to subtract 1, ensuring it only does so if `self.value > 0`.

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

**How to solve:**
1. Define `BankAccount` with `owner` and `balance` in `__init__`.
2. In `deposit()`, check if amount is positive, add to `balance`, and return it.
3. In `withdraw()`, check if amount is positive and `<=` current balance. Deduct if valid, otherwise reject, and return the balance.

**Explanation:** Deposits and withdrawals both need validation: positive amount, and for withdrawal, sufficient funds. Check **before** mutating the balance — subtracting first and noticing the negative afterwards has already corrupted the account.

**Hint:** Return a boolean or raise, so the caller knows whether the transaction happened.

---

## Q7. Object Inspection

Using the `Book` class, demonstrate `type()`, `isinstance()`, `hasattr()`, `getattr()`, `setattr()` and `__dict__`. Print what each returns.

```python
book.__dict__   # {'title': '...', 'author': '...', 'pages': 320}
```

**How to solve:**
1. Instantiate a `Book` object.
2. Pass the object to `type()`, `isinstance()`, `vars()`, and `dir()` to inspect its type and attributes.
3. Use `hasattr()`, `getattr()`, and `setattr()` to check for, retrieve, and modify an attribute dynamically, printing the results.

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

**How to solve:**
1. Create `Temperature` with `self.celsius` in `__init__`.
2. Add methods `to_fahrenheit()` and `to_kelvin()` that calculate and return the respective converted values.
3. Add `water_state()` that returns 'freezes' if `<= 0`, 'boils' if `>= 100`, and 'liquid' otherwise.

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

**How to solve:**
1. Initialize `name`, `roll_no`, and an empty dictionary `self.marks` in `Student.__init__`.
2. In `add_mark()`, update `self.marks[subject] = score`.
3. Compute `total()` using `sum(self.marks.values())`, calculate `percentage()`, and return the appropriate letter grade in `grade()`.

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

**How to solve:**
1. In `Timer.__init__`, set `self._start_time` and `self._elapsed` to None or 0.
2. In `start()`, record the current time using `time.perf_counter()`.
3. In `stop()`, check if started, calculate the difference, and store it. Raise `RuntimeError` if stopped before starting or if `elapsed()` is called without a valid time.

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

**How to solve:**
1. Create `Playlist` with an empty list `self.songs`.
2. In `add_song()`, check if the song is not already in `self.songs` before appending.
3. In `remove_song()`, remove if it exists. Use `random.shuffle()` for `shuffle()`, and `len()` for `total_songs()`.

**Explanation:** A list attribute plus methods that guard it. `remove` on a missing song raises `ValueError`, so check membership first or catch it — either way the object should not blow up because a caller asked for something absent.

**Hint:** `if song in self.songs:` before removing.

---

## Q12. Point and Distance

Create a `Point` class with `x` and `y`. Add `distance_to(other)` using the Pythagorean formula, and `move(dx, dy)`.

```python
Point(0, 0).distance_to(Point(3, 4))   # 5.0
```

**How to solve:**
1. Initialize `Point` with `self.x` and `self.y`.
2. In `distance_to(other)`, apply the distance formula using `self.x, self.y` and `other.x, other.y`.
3. In `move(dx, dy)`, add `dx` to `self.x` and `dy` to `self.y`.

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

**How to solve:**
1. Define a `Dog` class with `species = "Canis familiaris"` at the class level.
2. In `__init__`, accept `name` and assign it to `self.name`.
3. Create instances, print their `species`, then change `Dog.species` and verify the instances reflect the change while their names remain unaffected.

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

**How to solve:**
1. First, create the bug by defining `tricks = []` inside the class body, not in `__init__`. Add a trick to one instance and show it affects both.
2. Fix it by removing `tricks = []` from the class body.
3. Instead, define `self.tricks = []` inside `__init__` so each instance gets its own list.

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

**How to solve:**
1. Add `count = 0` as a class attribute in `Student`.
2. Inside `__init__`, increment it using `Student.count += 1`.
3. Add a `@classmethod` named `count()` that returns `cls.count`.

**Explanation:** Increment the class attribute through the **class name**, not through `self` — `Student.count += 1` updates the shared counter, while `self.count += 1` reads the class value once and then creates a per-instance attribute, leaving the real counter stuck at 0. No error either way.

**Hint:** A `@classmethod` receives `cls`, so it can return `cls.count`.

---

## Q16. Class Method as Alternative Constructor

Add `Book.from_string("Title|Author|Pages")` as a `@classmethod` that parses a string and returns a `Book` object.

```python
Book.from_string("Dune|Frank Herbert|412")
```

**How to solve:**
1. Above the new method, add the `@classmethod` decorator.
2. Define `from_string(cls, data_str)`.
3. Split `data_str` on `"|"`, convert the third element to an `int`, and return `cls(title, author, pages)`.

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

**How to solve:**
1. Define a `Date` class with `__init__(self, year, month, day)`.
2. Add `@classmethod from_string(cls, date_str)` that splits the string on `"-"` and returns `cls()`.
3. Add `@classmethod from_tuple(cls, date_tuple)` that unpacks the tuple, and `today(cls)` that uses `datetime.date.today()` to return `cls()`.

**Explanation:** Three constructors, one object type. This is Python's answer to overloaded constructors in other languages: rather than one `__init__` guessing what it was handed, each named classmethod states its input format explicitly and converts it.

**Hint:** All three end in `return cls(year, month, day)` — only the parsing differs.

---

## Q18. Static Method Utility

Add a `@staticmethod` to a `MathHelper` class: `is_prime(n)`, `gcd(a, b)` and `is_leap_year(y)`. Call them without creating an instance.

```python
MathHelper.is_prime(97)   # True
```

**How to solve:**
1. In `MathHelper`, add the `@staticmethod` decorator before each utility method.
2. Define the methods `is_prime(n)`, `gcd(a, b)`, and `is_leap_year(y)` as normal functions without `self` or `cls`.
3. Call them using `MathHelper.method_name()` directly.

**Explanation:** A `@staticmethod` takes neither `self` nor `cls` — it is a plain function namespaced inside the class. Use it when the logic is related to the class but needs none of its data. If you find yourself wanting `self`, it should have been an instance method.

**Hint:** Call it as `MathHelper.is_prime(97)` with no instance anywhere.

---

## Q19. Distinguishing the Three Method Types

In a single class, write one instance method, one class method and one static method. Each should print what it received (`self`, `cls`, or nothing). Call all three from both an instance and the class itself, and note which calls work.

**How to solve:**
1. Define a class with an instance method (takes `self`), a `@classmethod` (takes `cls`), and a `@staticmethod` (takes nothing).
2. Inside each method, print the argument it receives or a distinct message.
3. Call each method from an instance and from the class, using `try/except` if necessary to handle `TypeError` for the instance method called on the class.

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

**How to solve:**
1. Add `_counter = 0` as a class attribute in `Employee`.
2. In `__init__`, increment `Employee._counter` and set `self.emp_id` using an f-string with `:03d` padding.
3. Create a `@classmethod reset_counter(cls)` that sets `cls._counter = 0`.

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

**How to solve:**
1. Create a `Config` class with a class attribute dictionary `_settings = {}`.
2. Implement `@classmethod set(cls, key, value)` and `@classmethod get(cls, key, default=None)` to manipulate `cls._settings`.
3. Implement `@classmethod all(cls)` to return the dictionary, and test without instantiating `Config`.

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

**How to solve:**
1. In `Rectangle.__init__`, use `isinstance(val, (int, float))` and `not isinstance(val, bool)` to check type. If false, raise `TypeError`.
2. Next, check if `val <= 0`. If true, raise `ValueError`.
3. Perform these checks for both `length` and `width` before assigning to `self`.

**Explanation:** Two different failures need two different exception types: `TypeError` when the argument is the wrong **kind** of thing, `ValueError` when it is the right kind with an unacceptable **value**. Check the type first — comparing a string with `< 0` raises `TypeError` anyway, but with a message that explains nothing.

**Hint:** `isinstance(x, (int, float))` for the type check; note `bool` passes it.

---

## Q23. Object Equality Without Dunders

Create two `Point` objects with identical coordinates. Show that `==` returns `False` and `is` returns `False`. Explain why. (You will fix this in Q40.)

**How to solve:**
1. Define a basic `Point` class storing `x` and `y`. Do not implement `__eq__`.
2. Instantiate `p1 = Point(1, 2)` and `p2 = Point(1, 2)`.
3. Evaluate `p1 == p2` and `p1 is p2`, and print the results (both will be `False`).

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

**How to solve:**
1. Define a class with an `__init__` storing a name, and a `__del__(self)` method that prints `"Resource {self.name} is being destroyed"`.
2. Instantiate the object, then call `del obj` and observe the print output.
3. Write a brief comment explaining that `__del__` execution timing is up to the garbage collector and can be delayed by reference cycles, making `with` blocks a better choice for explicit cleanup.

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

**How to solve:**
1. Create a `Vehicle` class and initialize `self._speed = 0` in `__init__`.
2. Instantiate `Vehicle` and access `v._speed`, printing its value.
3. Modify `v._speed = 999` and print it again to show it was changed successfully, then write a comment explaining the underscore convention.

**Explanation:** A single underscore is a **convention only** — `obj._balance` still works perfectly. It signals "internal, may change without warning" to other developers and to tooling. Python deliberately provides no enforcement.

**Hint:** Prefix the attribute with one underscore and access it anyway to prove nothing stops you.

---

## Q26. Private Members and Name Mangling

Create an `Account` with a private `__balance`. Show that `account.__balance` raises `AttributeError`, then show that `account._Account__balance` works. Explain name mangling.

**How to solve:**
1. Define an `Account` class with `self.__balance = 0` in `__init__`.
2. Create an instance `account` and attempt to access `account.__balance` (which will raise `AttributeError`).
3. Access the attribute using its mangled name `account._Account__balance` and verify it works.

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

**How to solve:**
1. In `Account`, store the balance in a private or protected attribute (e.g., `self._balance`).
2. Add `get_balance(self)` that returns `self._balance`.
3. Add `set_balance(self, amount)` that updates `self._balance` only if `amount >= 0`, and reject negative values.

**Explanation:** Explicit `get_x()`/`set_x()` methods work but read badly in Python: `obj.set_age(obj.get_age() + 1)` where `obj.age += 1` would do. Write them once to see the mechanism, then compare with `@property` in Q28 — that is the point of doing both.

**Hint:** Store the real value in `self._age` and expose it through the two methods.

---

## Q28. The @property Decorator

Rewrite Q27 using `@property` and `@balance.setter` so that `account.balance = -100` raises `ValueError` while still reading like a plain attribute.

```python
account.balance          # 5000
account.balance = -100   # ValueError: Balance cannot be negative
```

**How to solve:**
1. In `Account`, define a method `balance(self)` decorated with `@property` that returns `self._balance`.
2. Define a second method `balance(self, value)` decorated with `@balance.setter`.
3. Inside the setter, raise a `ValueError` if `value < 0`, otherwise update `self._balance`. Test it via attribute assignment.

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

**How to solve:**
1. Define a `Circle` class with `radius` in `__init__`.
2. Create an `area(self)` method decorated with `@property` that returns `math.pi * self.radius ** 2`.
3. Do the same for `circumference(self)` and test that assigning to `circle.area` raises an `AttributeError`.

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

**How to solve:**
1. In `Person.__init__`, assign `self.name`, `self.age`, and `self.email` using the public property names.
2. Create `@property` and `@age.setter` for `age`. In the setter, check if `isinstance(value, (int, float))` and `0 <= value <= 150`, raising `ValueError` otherwise.
3. Create `@property` and `@email.setter` for `email`. In the setter, verify `"@" in value` and `"." in value`.

**Explanation:** Validation belongs in the setter, so every assignment path goes through it — including the one in `__init__`, provided `__init__` assigns to the public name (`self.age = age`) rather than the private one (`self._age = age`). Assigning directly to `_age` bypasses your own validation, which is the commonest mistake here.

**Hint:** In `__init__`, assign through the property name to reuse the validation.

---

## Q31. Temperature with Two-Way Property

Create a `Temperature` class storing Celsius internally, but exposing `fahrenheit` as a property with **both** a getter and a setter. Setting `temp.fahrenheit = 212` should make `temp.celsius` equal 100.

**How to solve:**
1. Define `Temperature` with `self._celsius` initialized in `__init__`.
2. Create a `@property fahrenheit(self)` that returns `self._celsius * 9/5 + 32`.
3. Create `@fahrenheit.setter` that updates `self._celsius` to `(value - 32) * 5/9`. Test by assigning to `temp.fahrenheit`.

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

**How to solve:**
1. In `Order.__init__`, store the id in a private attribute like `self._order_id`.
2. Define a method `order_id(self)` decorated with `@property` returning `self._order_id`.
3. Do not define a setter for `order_id`. Test that assigning a new value to `order_id` raises an `AttributeError`.

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

**How to solve:**
1. Import `ABC` and `abstractmethod` from the `abc` module.
2. Define `class Shape(ABC):` and inside it, create `area(self)` and `perimeter(self)` methods, both decorated with `@abstractmethod` and passing.
3. Attempt to instantiate `Shape()` and catch the resulting `TypeError` to observe the message.

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

**How to solve:**
1. Define `Circle(Shape)`, `Rectangle(Shape)`, and `Triangle(Shape)`.
2. Provide concrete implementations for `area()` and `perimeter()` in all three subclasses using the appropriate math formulas.
3. Instantiate them, store them in a list, and loop through to print their names, areas, and perimeters.

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

**How to solve:**
1. In the `Shape` ABC, add a concrete method `describe(self)`.
2. Inside `describe(self)`, return a formatted string that includes `type(self).__name__` and calls `self.area()`.
3. Call `describe()` on instances of `Circle` and `Rectangle` to show it works.

**Explanation:** An abstract base can hold ordinary concrete methods too, and those can call the abstract ones. The base defines *how the pieces fit together* while subclasses supply the pieces — the template method pattern, and the main reason to prefer an ABC over a bare interface.

**Hint:** Write a normal method in the ABC that calls `self.area()`, which subclasses define.

---

## Q36. Abstract Payment Processor

Create an abstract `PaymentProcessor` with abstract `process(amount)` and `refund(transaction_id)`. Implement `UPIPayment`, `CardPayment` and `WalletPayment`, each with different validation rules and fees.

**How to solve:**
1. Create `PaymentProcessor(ABC)` with abstract methods `process(amount)` and `refund(transaction_id)`.
2. Create subclasses `UPIPayment`, `CardPayment`, and `WalletPayment`.
3. Implement the abstract methods in each subclass with distinct print statements or simple logic, then test by iterating over a list of processors and calling `process()`.

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

**How to solve:**
1. Define `Animal` with an `__init__` setting `self.name` and a `speak()` method returning a generic sound.
2. Define `class Dog(Animal):` and override `speak()` to return `"Woof!"`.
3. Instantiate `Dog("Buddy")`, access `d.name`, call `d.speak()`, and verify `isinstance(d, Animal)`.

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

**How to solve:**
1. Define `Person(name, age)` assigning them to `self`.
2. Define `Employee(name, age, salary)` inheriting from `Person`. Inside `__init__`, call `super().__init__(name, age)` before setting `self.salary = salary`.
3. Instantiate `Employee` and test attributes. Comment out the `super()` call to observe the `AttributeError`.

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

**How to solve:**
1. Create `Vehicle`, then `class Car(Vehicle):`, then `class ElectricCar(Car):`, overriding or adding something at each level.
2. Print `ElectricCar.__mro__` to view the Method Resolution Order.
3. Observe how it matches the class hierarchy down to `object`.

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

**How to solve:**
1. Create `Employee` with `name` and `salary` in `__init__`.
2. Create three subclasses (`Manager`, `Developer`, `Designer`) inheriting from `Employee`. Each should implement `calculate_bonus()` returning `self.salary * rate`.
3. Store instances in a list, iterate through it, print each bonus, and compute the sum using polymorphism.

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

**How to solve:**
1. Create `Flyer` with `move(self)` returning `'Flying'` and `Swimmer` with `move(self)` returning `'Swimming'`.
2. Create `class Duck(Flyer, Swimmer): pass` and instantiate it.
3. Call `Duck().move()` and print `Duck.__mro__` to confirm Python found the method in the first parent.

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

**How to solve:**
1. Create `A`, then `B(A)` and `C(A)`, then `D(B, C)`.
2. In every `__init__`, add a print statement like `print("A.__init__")` and call `super().__init__()`.
3. Instantiate `D()` and observe the print order, verifying `A`'s constructor only runs once.

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

**How to solve:**
1. In a base class, define `replaced(self)` and `extended(self)` returning strings.
2. In the subclass, define `replaced(self)` returning a completely new string.
3. In the subclass, define `extended(self)`, call `super().extended()`, and append new text to its result.

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

**How to solve:**
1. Instantiate `tesla = ElectricCar(...)`.
2. Evaluate `isinstance(tesla, Vehicle)` and `type(tesla) == Vehicle`.
3. Print the results. Understand that `isinstance` checks the whole MRO while `type()` only checks exact class identity.

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

**How to solve:**
1. Create `Engine` with `horsepower` and a `start()` method.
2. Create `Car` with `name` and `engine` (an instance of `Engine`) stored as `self.engine`.
3. Define `Car.start()` to call `self.engine.start()` and verify that `isinstance(car, Engine)` is `False`.

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

**How to solve:**
1. Define `Shape(ABC)` with abstract `area()`.
2. Define `Rectangle(Shape)` with `length` and `width`.
3. Define `Square(Rectangle)`. In its `__init__`, call `super().__init__(side, side)`. Add a `@property side` and a setter that updates both `self.length` and `self.width` to keep them equal.

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

**How to solve:**
1. Create `Duck`, `Robot`, and `Person`, giving each a `speak()` method returning a unique string. Do not make them inherit from anything.
2. Put instances of all three in a list.
3. Write a `for` loop to iterate over the list and call `speak()` on each item, observing that it works purely via duck typing.

**Explanation:** Python never checks the type — it looks for a `speak` attribute at call time and calls it. No base class, no interface, no registration. The cost is that a missing method surfaces as an `AttributeError` at runtime rather than being caught up front, which is exactly the trade an ABC reverses.

**Hint:** The loop is identical regardless of the objects' types; that is the whole demonstration.

---

## Q48. Operator Overloading — Addition

Create a `Vector2D` class with `__add__`, `__sub__` and `__mul__` (scalar multiplication).

```python
Vector2D(2, 3) + Vector2D(4, 1)   # Vector2D(6, 4)
Vector2D(2, 3) * 3                # Vector2D(6, 9)
```

**How to solve:**
1. Create `Vector2D` storing `x` and `y`.
2. Implement `__add__(self, other)` returning a new `Vector2D(self.x + other.x, self.y + other.y)`. Do the same for `__sub__`.
3. Implement `__mul__(self, scalar)` returning `Vector2D(self.x * scalar, self.y * scalar)`. Optionally implement `__rmul__` for left-side multiplication.

**Explanation:** `__add__` is what `+` calls, receiving the right-hand operand as `other`. `Vector2D(2,3) + Vector2D(4,1)` gives `(6, 4)` and `* 3` gives `(6, 9)`. Return a **new** object rather than mutating `self`, matching how `+` behaves for every built-in type. Note `3 * vector` needs `__rmul__` as well.

**Hint:** `return Vector2D(self.x + other.x, self.y + other.y)`.

---

## Q49. `__str__` vs `__repr__`

Add both to `Vector2D`. Make `__str__` human-friendly and `__repr__` unambiguous. Show what `print(v)`, `str(v)`, `repr(v)` and evaluating `v` in the REPL each produce.

```python
print(v)   # (2, 3)
repr(v)    # Vector2D(x=2, y=3)
```

**How to solve:**
1. In `Vector2D`, define `__str__(self)` returning a formatted string like `f"({self.x}, {self.y})"`.
2. Define `__repr__(self)` returning `f"Vector2D(x={self.x}, y={self.y})"`.
3. Test by printing the object and using the `repr()` function.

**Explanation:** `print(v)` and `str(v)` use `__str__` for a human; `repr(v)` and the bare REPL echo use `__repr__` for a developer. If you define only one, define `__repr__` — `str()` falls back to it, but not the other way round. The convention is that `repr` output should be valid Python that recreates the object.

**Hint:** `__repr__` should read like the constructor call: `Vector2D(x=2, y=3)`.

---

## Q50. Comparison Dunders

Add `__eq__`, `__lt__`, `__le__`, `__gt__` and `__ge__` to a `Money` class comparing amounts. Then sort a list of `Money` objects.

**Bonus:** use `functools.total_ordering` to get all six from just `__eq__` and `__lt__`.

**How to solve:**
1. Define a `Money` class with an `amount`.
2. Import `total_ordering` from `functools` and apply `@total_ordering` above the class.
3. Implement `__eq__(self, other)` returning `self.amount == other.amount` and `__lt__(self, other)` returning `self.amount < other.amount`. The decorator provides the rest.

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

**How to solve:**
1. In `Playlist`, define `__len__(self)` returning `len(self.songs)`.
2. Define `__getitem__(self, index)` returning `self.songs[index]`.
3. Verify that `len()`, indexing `[0]`, slicing `[1:3]`, and `for` loops all work automatically.

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

**How to solve:**
1. In `Playlist`, add `__contains__(self, item)`.
2. Lowercase the `item` and compare it against the lowercase versions of the strings in `self.songs`.
3. Return `True` if a match is found, `False` otherwise, and test with the `in` operator.

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

**How to solve:**
1. Define a `Multiplier` class holding a `factor` from `__init__`.
2. Add `__call__(self, x)` returning `x * self.factor`.
3. Instantiate `double = Multiplier(2)` and call `double(15)`.

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

**How to solve:**
1. Define `FileManager` with `filename` and `mode` in `__init__`.
2. In `__enter__(self)`, print a message, open the file, store it in `self.file`, and return it.
3. In `__exit__(self, exc_type, exc_val, exc_tb)`, print a message and call `self.file.close()`.

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

**How to solve:**
1. In `Point`, define `__eq__(self, other)` comparing `x` and `y`.
2. Define `__hash__(self)` returning `hash((self.x, self.y))`. Test putting duplicates in a `set`.
3. Remove or comment out `__hash__` and attempt to use the set again to see the `TypeError`.

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

**How to solve:**
1. Start with `Matrix.__init__` storing the 2D list. Implement `__str__` and `__repr__`.
2. Implement `__add__` and `__sub__` checking dimensions first.
3. Implement `__mul__` for matrix multiplication, checking if `len(self.data[0]) == len(other.data)`. Raise `ValueError` if dimensions don't match.

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

**How to solve:**
1. Outline `Book` and `Member` classes with basic properties.
2. Add `Library` to manage the collection and write tests for basic borrowing.
3. Introduce the `Loan` class to track dates and calculate fines. Finally, add JSON persistence methods.

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

**How to solve:**
1. Start by modeling `Product`, `CartItem`, and `Cart`.
2. Define the `Discount` abstract base class and its concrete subclasses.
3. Create `Order` that takes a `Cart` and a `Customer`, handles state transitions, applies discounts, calculates shipping, and prints the invoice.

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

**How to solve:**
1. Define the abstract `Employee` and its concrete implementations.
2. Build `Department` to hold employees and compute departmental stats.
3. Build `Payroll` to iterate over all employees in departments, compute taxes, generate payslips, and handle the CSV export.

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

**How to solve:**
1. Write the design document defining the classes, attributes, methods, and relationships.
2. Implement the abstract base classes and their concrete implementations first.
3. Build the core logic (composition and relationships), followed by custom exceptions, JSON persistence, and finally the interactive menu.

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
