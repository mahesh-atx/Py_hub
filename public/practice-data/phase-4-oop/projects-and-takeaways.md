## 🧪 Practice Projects for Phase 4

> 🧠 **Want more reps before the projects?** [**60 Practice Questions**](practice-questions.md) covers this phase in graded difficulty order, from a one-line warm-up to a multi-hour build.
>

After finishing all 7 modules, build these projects:

- [ ]  **Shape Hierarchy** — abstract `Shape` with `Circle`, `Rectangle`, `Triangle`, all with `area()` and `perimeter()`
- [ ]  **Vector Math Class** — overload `+`, `-`, `*`, `==`, `abs()` for 2D vectors
- [ ]  **Custom Container** — build a `Stack` and `Queue` class with `__len__`, `__getitem__`, `__iter__`
- [ ]  **Animal Kingdom** — multilevel inheritance with `Animal → Mammal → Dog`, polymorphic `speak()`
- [ ]  **Temperature Class** — `@property` conversions between Celsius, Fahrenheit, and Kelvin
- [ ]  **Playing Card Deck** — `Card` and `Deck` classes with shuffle, deal, and `__repr__`
- [ ]  **Matrix Class** — overload `+`, `*`, and `__getitem__` for 2D matrices
- [ ]  **Time Duration Class** — add and subtract durations with operator overloading
- [ ]  **Parking Lot System** — `Vehicle` subclasses, slot allocation, ticket and fee calculation
- [ ]  **Complete Capstone** — a full menu-driven system using all four OOP pillars, modules, files, and exceptions

---

## 📚 Key Takeaways for Phase 4

- **OOP** models your program as objects that hold data (attributes) and behaviour (methods).
- A **class** is the blueprint; an **object** is the real thing built from it.
- `__init__()` is the constructor — it runs automatically and sets up the object's data.
- `self` refers to the **object**; `cls` refers to the **class**.
- **Instance attributes** are unique per object; **class attributes** are shared by all.
- Never use a **mutable class attribute** like `items = []` — make it an instance attribute.
- Use `@classmethod` for factory methods and shared data, `@staticmethod` for pure helpers.
- **Encapsulation**: `_protected` is a convention, `__private` triggers name mangling. Nothing is truly locked.
- Prefer `@property` over Java-style `get_x()` / `set_x()` — you get clean syntax with full validation.
- **Abstraction**: `ABC` + `@abstractmethod` forces subclasses to implement required methods.
- **Inheritance** models an "is-a" relationship. Always call `super().__init__()` in the child.
- Know the five types: single, multiple, multilevel, hierarchical, and hybrid.
- **MRO** (`Class.__mro__`) decides which method wins in multiple inheritance. `super()` follows it.
- **Polymorphism** lets one piece of code work with many types — it kills long `if/elif` type checks.
- Python has **no method overloading** — use default arguments or `*args` instead.
- **Duck typing**: if the object has the method, Python does not care about its type.
- **Magic methods** make your classes feel built-in: `__str__`, `__len__`, `__getitem__`, `__add__`, `__eq__`.
- Always write `__repr__` — it makes every debugging session easier.
- Defining `__eq__` removes hashability; add `__hash__` if you need sets or dict keys.
- **Prefer composition over inheritance** when the relationship is "has-a" rather than "is-a".
- One class = one responsibility. If you cannot describe it in one sentence, split it.

> 💡 **Tip:** OOP only clicks when you build something real. Reading about inheritance teaches you the syntax; writing a Bank Account system where `SavingsAccount` and `CurrentAccount` genuinely need different withdrawal rules teaches you *why* it exists. Pick one capstone project and finish it end to end — that single project will teach you more than all seven modules of notes.
>
