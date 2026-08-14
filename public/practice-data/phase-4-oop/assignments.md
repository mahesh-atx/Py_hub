# 📋 Phase 4 — Assignments

Six graded assignments for **Modules 13–19**. Each takes 3–6 hours; the capstone takes longer.

**Constraints for this phase:**

- Everything is a class design problem. Even where a function would do, write the class — developing the instinct is the point.
- Type hints and docstrings throughout, as in Phase 3.
- Persist to JSON where an assignment asks for it.

> 💡 **Tip:** Before writing any class, list its **attributes** (what it knows) and **methods** (what it does) on paper, then ask *"would a dictionary do this job?"* Sometimes the honest answer is yes. Recognising that is as valuable as writing the class.
>

---

## 📋 Assignment 15 — Class Design Fundamentals

**Builds on:** Q1–Q24

**Scenario.** Build six small classes that each teach one thing, and produce the two bugs that define this phase.

**Deliverable.** `fundamentals.py` plus a written answer file.

### Tasks

1. **Six classes**, each with `__init__`, at least two methods, and a docstring: `Book`, `Rectangle`, `Circle`, `BankAccount`, `Student`, `Point`.

2. **Verified computations:**
   - `Book.reading_time()` for 320 pages at 300 words/page and 250 wpm = **6.4** hours
   - `Point(0,0).distance_to(Point(3,4))` = **5.0**
   - `Rectangle(5,5).is_square()` = `True`
   - `Circle(-3)` raises `ValueError` with a message naming the bad value

3. **The shared mutable class attribute bug.** Define `Dog` with `tricks = []` at class level. Create two dogs, append a trick to one, and show **both** now have it. Then fix it by moving the list into `__init__`. Your output must show:

   ```
   BEFORE FIX:  buddy.tricks: ['roll over']   max.tricks: ['roll over']
   AFTER FIX:   buddy.tricks: ['roll over']   max.tricks: []
   ```

   Explain the mechanism in a comment, and connect it to Phase 3's mutable default argument — they share a root cause.

4. **Instance counter.** Add a class attribute to `Student` counting instances, incremented in `__init__`, with a `@classmethod` returning the count. Create five students and verify.

5. **All three method types in one class.** An instance method, a `@classmethod` and a `@staticmethod`, each printing what it received. Call all three from both an instance and the class, and record which calls work.

6. **Alternative constructors.** `Book.from_string("Dune|Frank Herbert|412")` as a `@classmethod`. Then add `Date.from_string`, `Date.from_tuple` and `Date.today()`.

7. **Object identity.** Create two `Point` objects with identical coordinates. Show `==` is `False` and `is` is `False`. Explain why, and note that Assignment 18 fixes it.

8. **Object inspection.** Demonstrate `type()`, `isinstance()`, `hasattr()`, `getattr()`, `setattr()` and `__dict__` on one object, printing each result.

9. **Written answers (4–6 sentences each).** What is `self` actually? Why does a class attribute shared between instances surprise people? When would you use a `@staticmethod` rather than a module-level function?

### Marking guide

| Criterion | Weight |
| --- | --- |
| Six classes with the verified computations | 25% |
| Shared mutable bug produced **and** fixed | 25% |
| Three method types demonstrated correctly | 15% |
| Alternative constructors work | 15% |
| Identity vs equality shown | 10% |
| Written answers show understanding | 10% |

### Self-check

Create two `Student` objects and modify one's marks. If the other changes too, you have the shared-mutable bug in your own code — which is a better lesson than task 3.

---

## 📋 Assignment 16 — Encapsulation and Validation

**Builds on:** Q25–Q36

**Scenario.** Make a class impossible to put into an invalid state.

**Deliverable.** `encapsulated.py`.

### Tasks

1. **A `BankAccount` with a private `__balance`.** Show that `account.__balance` raises `AttributeError` and `account._BankAccount__balance` works. Explain name mangling in a comment.

2. **Three access levels** in one class: public, `_protected`, `__private`. Demonstrate access to each from outside and explain what each level actually communicates in Python — since none of them truly enforce anything.

3. **Getters and setters first.** `get_balance()` and `set_balance(amount)` with validation. Use them for a full deposit/withdraw cycle.

4. **Then rewrite with `@property`.** `account.balance = -100` must raise `ValueError` while `account.balance` still reads like a plain attribute. Compare the call sites and state which reads better.

5. **A read-only computed property.** `Circle.area` and `Circle.circumference` computed from radius. Setting `circle.area = 50` must raise `AttributeError`.

6. **A two-way property.** `Temperature` stores Celsius internally but exposes `fahrenheit` with both a getter and a setter. Setting `temp.fahrenheit = 212` must make `temp.celsius` equal `100.0`.

7. **A validation chain.** `Person` where setting `age` validates type and range (0–150) and setting `email` validates it contains `@` and a `.` after it. Each raises `ValueError` with a message naming the bad value.

8. **A read-only ID.** `Order.order_id` set once in `__init__`, exposed as a property with no setter.

9. **Abstract base class.** `Shape(ABC)` with abstract `area()` and `perimeter()`. Show that `Shape()` raises:

   ```
   TypeError: Can't instantiate abstract class Shape without an implementation
   for abstract methods 'area', 'perimeter'
   ```

10. **Concrete implementations.** `Circle`, `Rectangle`, `Triangle` inheriting from `Shape`. Put all three in a list and print each area and perimeter in one loop — the payoff of the abstract base.

11. **A concrete method on the abstract class.** Add `describe()` to `Shape` that calls the abstract `area()`. Show subclasses inherit it without reimplementing.

### Marking guide

| Criterion | Weight |
| --- | --- |
| Name mangling demonstrated both ways | 15% |
| Property rewrite compared against getters/setters | 20% |
| Two-way temperature property correct | 15% |
| Validation chain with specific messages | 15% |
| Abstract class raises on instantiation | 20% |
| Polymorphic loop over three shapes | 15% |

### Self-check

Try every route into an invalid state: the constructor, the property setter, and direct `_Class__attribute` access. If any of them lets you set a negative balance, your encapsulation has a hole — and the third one always does, which is the honest lesson about Python's privacy model.

---

## 📋 Assignment 17 — Inheritance Hierarchy

**Builds on:** Q37–Q46

**Scenario.** Build every inheritance type, then discover where inheritance is the wrong tool.

**Deliverable.** `hierarchy.py` plus an MRO trace document.

### Tasks

1. **Single inheritance.** `Animal` → `Dog`, overriding `speak()`. Show `Dog` inherits `name`.

2. **`super()` in the constructor.** `Person(name, age)` → `Employee(name, age, salary)`. Then **deliberately omit** the `super().__init__()` call, show the `AttributeError` it causes, and restore it.

3. **Multilevel.** `Vehicle` → `Car` → `ElectricCar`, each adding attributes and overriding one method. Print `ElectricCar.__mro__` and explain each entry.

4. **Hierarchical.** One `Employee` base with `Manager`, `Developer` and `Designer`, each overriding `calculate_bonus()` differently. Store all three in a list and total the bonuses in one loop.

5. **Multiple inheritance and the MRO.** `Flyer` and `Swimmer` both with `move()`. `Duck(Flyer, Swimmer)`. Determine which `move()` runs *before* running it, then verify with `__mro__`.

6. **The diamond problem.** `A` → `B`, `A` → `C`, `B, C` → `D`. Put a print in every `__init__` and use `super()` throughout. Trace the exact order the constructors run and explain why `A.__init__` runs only once.

7. **Override vs extend.** In one subclass write one method that replaces the parent entirely and another that calls `super().method()` first then adds to it. Show both outputs.

8. **`isinstance` vs `type`.** On the `ElectricCar` chain, compare `isinstance(tesla, Vehicle)` with `type(tesla) == Vehicle`. Explain why `isinstance` is almost always correct.

9. **Composition instead.** Model `Car` **has an** `Engine` rather than **is an** `Engine`. Then write three sentences on a case where composition is clearly better — and one where inheritance genuinely is.

10. **Combine it all.** An abstract `Shape`, concrete `Rectangle`, then `Square(Rectangle)` enforcing equal sides through a property. Setting `square.side = 7` must update both dimensions. Note in a comment why `Square` inheriting from `Rectangle` is a classic design argument.

### Marking guide

| Criterion | Weight |
| --- | --- |
| All five inheritance types built | 25% |
| Missing `super()` failure demonstrated | 10% |
| Diamond constructor order traced correctly | 20% |
| MRO printed and explained for two hierarchies | 15% |
| Override vs extend shown side by side | 15% |
| Composition example with justification | 15% |

### Self-check

In your diamond, `A.__init__` must print exactly **once**. If it prints twice, you called `A.__init__(self)` directly somewhere instead of using `super()` — which is precisely the problem the MRO exists to solve.

---

## 📋 Assignment 18 — Polymorphism and Magic Methods

**Builds on:** Q47–Q56

**Scenario.** Make your objects behave like built-in types.

**Deliverable.** `magic.py`.

### Tasks

1. **Duck typing.** Three unrelated classes — `Duck`, `Robot`, `Person` — each with `speak()`. Loop over all three calling `speak()` with no shared base class. Explain why this works in Python and would not in Java.

2. **A `Vector2D` class** with `__add__`, `__sub__`, `__mul__` (scalar) and `__truediv__`. Verify `Vector2D(2,3) + Vector2D(4,1)` gives `(6,4)` and `Vector2D(2,3) * 3` gives `(6,9)`.

3. **`__str__` vs `__repr__`.** Add both to `Vector2D`. `str(v)` gives `(2, 3)`; `repr(v)` gives `Vector2D(x=2, y=3)`. Show what `print(v)`, `str(v)`, `repr(v)` and a bare `v` in the REPL each produce, and state the rule for which to implement first.

4. **Comparison dunders.** A `Money` class with `__eq__`, `__lt__`, `__le__`, `__gt__`, `__ge__`. Sort a list of `Money` objects. Then redo it with `functools.total_ordering` and only `__eq__` and `__lt__` — confirm identical behaviour with less code.

5. **Container behaviour.** A `Playlist` supporting `len(playlist)`, `playlist[0]`, slicing `playlist[1:3]`, iteration in a `for` loop, and `"Song" in playlist` case-insensitively via `__contains__`.

6. **`__call__`.** A `Multiplier` class whose instances are callable — `double(15)` returns `30`. Compare against the Phase 3 closure that did the same thing, and state when you would choose each.

7. **A context manager.** `FileManager` with `__enter__` and `__exit__`, usable in a `with` block, guaranteeing closure even when an exception is raised inside. Print in both dunders to trace the flow, and demonstrate the exception case.

8. **`__hash__` and sets.** Make `Point` hashable by defining both `__eq__` and `__hash__`. Show two equal points collapsing to one entry in a set. Then remove `__hash__` and record the `TypeError`.

9. **A full-featured `Matrix`.** `__init__`, `__str__`, `__repr__`, `__add__`, `__sub__`, `__mul__` (matrix multiplication), `__eq__`, `__len__`, `__getitem__`. Every operation validates dimensions and raises `ValueError` with a message naming both shapes.

   Verify: `Matrix([[1,2],[3,4]]) * Matrix([[5,6],[7,8]])` = `[[19, 22], [43, 50]]`.

### Marking guide

| Criterion | Weight |
| --- | --- |
| Duck typing loop with explanation | 10% |
| `Vector2D` arithmetic verified | 15% |
| `__str__`/`__repr__` distinction demonstrated | 15% |
| `total_ordering` reproduces manual comparisons | 15% |
| `Playlist` supports len, index, slice, iterate, contains | 20% |
| Context manager survives an exception | 10% |
| `Matrix` product = `[[19,22],[43,50]]` with validation | 15% |

### Self-check

Define `__eq__` on a class without `__hash__` and try to put it in a set. The `TypeError: unhashable type` is Python protecting you — objects that compare equal must hash equally, and Python will not guess how.

---

## 📋 Assignment 19 — Library Management System

**Builds on:** Q57

**Scenario.** The full version of practice Q57 — the assignment that combines every OOP concept.

**Deliverable.** `library/` package with modules, plus `library.json`.

### Tasks

1. **`Book`** — ISBN, title, author, `copies_total`, `copies_available`, with a read-only `is_available` property and `__str__`.

2. **`Member(ABC)`** with abstract `borrow_limit` and `loan_period_days`. Then `StudentMember` (3 books, 14 days) and `FacultyMember` (10 books, 30 days).

3. **`Loan`** — book, member, issue date, due date, a computed `is_overdue` property, and a `fine()` method at ₹5 per day late. Use `datetime`.

4. **`Library`** managing all collections, with methods for: add/remove book (handling duplicate ISBNs), register member with an auto-generated ID, issue, return, and search.

5. **Issue rules.** Reject if no copies available, if the member is at their limit, or if the member has an unpaid fine above ₹100. Three distinct custom exceptions: `BookNotAvailableError`, `BorrowLimitExceededError`, `OutstandingFineError`.

6. **Return** computes the fine, updates availability, and closes the loan.

7. **Search** by title, author or ISBN with partial, case-insensitive matching.

8. **Six reports:** currently issued, overdue loans with fines, most borrowed book, total outstanding fines, members at their limit, and books never borrowed.

9. **Magic methods used meaningfully.** `__str__` on every class, `__len__` on `Library` returning the book count, `__contains__` for ISBN lookup, `__iter__` over books.

10. **Persistence.** Save and load the whole library to JSON, including loans with dates. Verify a full round-trip: run, issue books, exit, restart, and confirm the loans are still there.

11. **A menu-driven interface** that never crashes and catches every custom exception with a readable message.

### Marking guide

| Criterion | Weight |
| --- | --- |
| Abstract `Member` with two working subclasses | 15% |
| All three issue rules with distinct exceptions | 20% |
| Fine calculation correct against dates | 15% |
| Six reports produce correct results | 20% |
| Four magic methods used meaningfully | 10% |
| JSON round-trip preserves loans and dates | 20% |

### Self-check

Issue a book, exit, restart, and check the due date. If it has shifted or become a string, your JSON serialisation is not handling `datetime` — which is the single most common persistence bug in Python.

---

## 📋 Capstone — Design Your Own System

**Builds on:** Q60 and everything above

**Scenario.** Pick a domain you genuinely understand and design a complete object system for it. A gym, a restaurant, a hospital ward, a cricket team, a music service — anything you can describe without research.

**Deliverable.** A design document, the code, and a reflection.

### Tasks

**Phase A — design before code**

1. **List every class**, its attributes and its methods, on paper.
2. **Draw the inheritance relationships** and mark which classes are abstract.
3. **Note the compositions** — which classes hold instances of which.
4. **Write three operations** the system must support, and trace which objects collaborate for each.

**Phase B — build it**

5. At least **six classes**.
6. At least one **abstract base class** with two or more concrete implementations.
7. At least one **inheritance chain three levels deep**.
8. At least one genuine **composition** relationship.
9. **Encapsulation throughout** — no public mutable attribute without a property guarding it.
10. At least **five magic methods** across your classes, each chosen because it makes the class read better.
11. At least **two custom exceptions**, raised and caught.
12. **JSON persistence** with a verified round-trip.
13. A **menu-driven interface** that never crashes.

**Phase C — reflect**

14. **Compare the code against your design document.** List every place the design changed during implementation, and why. This gap is the most educational part of the whole assignment.
15. **Name one class you would remove** if you started again, and one you would split in two.
16. **State one place you used inheritance** where composition would have been better, or explain why you are confident every inheritance relationship is a genuine "is-a".

### Marking guide

| Criterion | Weight |
| --- | --- |
| Design document produced **before** the code | 15% |
| Six classes with a coherent responsibility each | 15% |
| Abstract base with two implementations | 10% |
| Three-level chain plus a composition | 15% |
| Five magic methods, each justified | 10% |
| Two custom exceptions | 5% |
| JSON round-trip verified | 15% |
| Reflection is specific about design changes | 15% |

### Self-check

Hand your design document to someone and ask them to guess what the system does. If they cannot, the class names are wrong — and naming is most of design. Then reread your own code a week later: if you cannot tell what a class is responsible for from its name and docstring, the design is wrong regardless of whether it runs.

---

## Grading yourself

1. **Instance independence is testable.** For every class, create two objects, modify one, and confirm the other is untouched. Assignment 15 exists because this fails more often than anyone expects.
2. **Every `raise` needs a test.** All six assignments define custom exceptions — trigger each one at least once.
3. **Persistence is binary.** Assignments 19 and the capstone either survive a restart with intact dates or they do not.

> ⚠️ Two mistakes dominate this phase. **Mutable class attributes** — objects silently share state and the bug surfaces far from its cause. And **inheritance used for code reuse rather than a genuine "is-a" relationship**. A `Car` is not a kind of `Engine`, however convenient reusing the code feels. When the relationship feels forced, it is: use composition.
>

---

[← Phase 4 index](README.md) · [Practice Questions](practice-questions.md)
