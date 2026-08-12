# Module 19: OOP Projects and Practice

> This module puts everything from Modules 13–18 into real, complete programs. Every project below is **runnable code with real output**. Type them out, run them, then extend them with your own features.
>

---

## How to Approach an OOP Project

Before writing any code, answer four questions:

| Question | Produces |
| --- | --- |
| What are the **things** in my problem? | Your classes |
| What does each thing **know**? | Attributes |
| What can each thing **do**? | Methods |
| How do the things **relate**? | Inheritance ("is-a") or composition ("has-a") |

### Example: a library system

- **Things**: Book, Member, Library → three classes
- **Book knows**: title, author, ISBN, copies available
- **Book can**: be issued, be returned
- **Relationship**: a Library **has** Books and Members → composition

### The design checklist

- [ ]  Class names in `CamelCase`, methods in `snake_case`
- [ ]  Every class has an `__init__` that sets all its attributes
- [ ]  Add `__str__` (for users) and `__repr__` (for debugging)
- [ ]  Validate input in `__init__` or with `@property` setters
- [ ]  Keep internal data protected with `_` or `__`
- [ ]  Raise custom exceptions instead of printing errors deep in the logic
- [ ]  Use an abstract base class when subclasses must implement something
- [ ]  One class = one responsibility

---

## Project 1: Student Management System

**Concepts used:** class attributes, `@property` validation, `__str__`, `__repr__`, `__lt__`, `__eq__`, `__len__`, sorting objects.

```python
class Student:
    school = "ABC Institute"
    total_students = 0

    def __init__(self, roll_no, name, marks):
        self.roll_no = roll_no
        self.name = name
        self.marks = marks              # goes through the setter
        Student.total_students += 1

    @property
    def marks(self):
        return self.__marks

    @marks.setter
    def marks(self, value):
        if not isinstance(value, (int, float)):
            raise TypeError("Marks must be a number")
        if not 0 <= value <= 100:
            raise ValueError("Marks must be between 0 and 100")
        self.__marks = value

    @property
    def grade(self):
        if self.marks >= 90:
            return "A+"
        elif self.marks >= 80:
            return "A"
        elif self.marks >= 70:
            return "B"
        elif self.marks >= 60:
            return "C"
        elif self.marks >= 40:
            return "D"
        return "F"

    @property
    def passed(self):
        return self.marks >= 40

    def __str__(self):
        status = "PASS" if self.passed else "FAIL"
        return f"{self.roll_no:<6}{self.name:<15}{self.marks:<8}{self.grade:<7}{status}"

    def __repr__(self):
        return f"Student({self.roll_no}, '{self.name}', {self.marks})"

    def __lt__(self, other):
        return self.marks < other.marks

    def __eq__(self, other):
        return self.roll_no == other.roll_no


class StudentManagement:
    def __init__(self):
        self.students = []

    def add(self, student):
        if student in self.students:
            print(f"Roll no {student.roll_no} already exists")
            return False
        self.students.append(student)
        print(f"Added: {student.name}")
        return True

    def remove(self, roll_no):
        for s in self.students:
            if s.roll_no == roll_no:
                self.students.remove(s)
                print(f"Removed: {s.name}")
                return True
        print(f"Roll no {roll_no} not found")
        return False

    def search(self, roll_no):
        for s in self.students:
            if s.roll_no == roll_no:
                return s
        return None

    def display_all(self):
        if not self.students:
            print("No students")
            return
        print(f"\n{'Roll':<6}{'Name':<15}{'Marks':<8}{'Grade':<7}Status")
        print("-" * 45)
        for s in self.students:
            print(s)

    def topper(self):
        return max(self.students) if self.students else None

    def average(self):
        if not self.students:
            return 0
        return sum(s.marks for s in self.students) / len(self.students)

    def rank_list(self):
        return sorted(self.students, reverse=True)

    def __len__(self):
        return len(self.students)


sms = StudentManagement()
sms.add(Student(101, "Mahesh", 85))
sms.add(Student(102, "Priya", 92))
sms.add(Student(103, "Ravi", 38))
sms.add(Student(104, "Anita", 76))
sms.add(Student(101, "Duplicate", 50))

sms.display_all()

print(f"\nTotal students: {len(sms)}")
print(f"Class average: {sms.average():.2f}")
print(f"Topper: {sms.topper().name} ({sms.topper().marks})")

print("\nRank list:")
for i, s in enumerate(sms.rank_list(), 1):
    print(f"  {i}. {s.name} - {s.marks} ({s.grade})")

try:
    Student(105, "Bad", 150)
except ValueError as e:
    print(f"\nValidation works: {e}")
```

Output:

```
Added: Mahesh
Added: Priya
Added: Ravi
Added: Anita
Roll no 101 already exists

Roll  Name           Marks   Grade  Status
---------------------------------------------
101   Mahesh         85      A      PASS
102   Priya          92      A+     PASS
103   Ravi           38      F      FAIL
104   Anita          76      B      PASS

Total students: 4
Class average: 72.75
Topper: Priya (92)

Rank list:
  1. Priya - 92 (A+)
  2. Mahesh - 85 (A)
  3. Anita - 76 (B)
  4. Ravi - 38 (F)

Validation works: Marks must be between 0 and 100
```

### Extend it yourself

- [ ]  Save and load students from a CSV file (Module 11)
- [ ]  Add multiple subjects per student
- [ ]  Add attendance tracking
- [ ]  Generate a printable report card

---

## Project 2: Bank Account System

**Concepts used:** abstract base classes, inheritance, method overriding, custom exceptions, protected members, `@property`, class attributes as auto-incrementing IDs.

```python
from abc import ABC, abstractmethod
from datetime import datetime


class InsufficientFundsError(Exception):
    pass


class InvalidAmountError(Exception):
    pass


class Account(ABC):
    bank_name = "Python National Bank"
    _account_counter = 1000

    def __init__(self, holder, balance=0):
        Account._account_counter += 1
        self._account_no = Account._account_counter
        self._holder = holder
        self._balance = balance
        self._transactions = []
        self._log("OPEN", balance)

    def _log(self, kind, amount):
        self._transactions.append({
            "type": kind,
            "amount": amount,
            "balance": self._balance,
            "time": datetime.now().strftime("%H:%M:%S")
        })

    @property
    def balance(self):
        return self._balance

    @property
    def account_no(self):
        return self._account_no

    @property
    def holder(self):
        return self._holder

    def deposit(self, amount):
        if amount <= 0:
            raise InvalidAmountError("Deposit must be positive")
        self._balance += amount
        self._log("DEPOSIT", amount)
        print(f"Deposited {amount}. Balance: {self._balance}")

    def withdraw(self, amount):
        if amount <= 0:
            raise InvalidAmountError("Withdrawal must be positive")
        if amount > self._available():
            raise InsufficientFundsError(
                f"Cannot withdraw {amount}. Available: {self._available()}")
        self._balance -= amount
        self._log("WITHDRAW", amount)
        print(f"Withdrew {amount}. Balance: {self._balance}")

    def _available(self):
        return self._balance

    @abstractmethod
    def calculate_interest(self):
        pass

    @abstractmethod
    def account_type(self):
        pass

    def statement(self):
        print(f"\n--- {self.account_type()} #{self._account_no} ({self._holder}) ---")
        for t in self._transactions:
            print(f"  {t['time']}  {t['type']:<10}{t['amount']:>10.2f}  bal {t['balance']:>10.2f}")
        print(f"  Interest earned: {self.calculate_interest():.2f}")

    def __str__(self):
        return f"{self.account_type()} #{self._account_no} | {self._holder} | Bal: {self._balance:.2f}"


class SavingsAccount(Account):
    INTEREST_RATE = 0.04
    MIN_BALANCE = 500

    def _available(self):
        return self._balance - self.MIN_BALANCE     # must keep a minimum

    def calculate_interest(self):
        return self._balance * self.INTEREST_RATE

    def account_type(self):
        return "Savings"


class CurrentAccount(Account):
    OVERDRAFT = 10000

    def _available(self):
        return self._balance + self.OVERDRAFT       # overdraft allowed

    def calculate_interest(self):
        return 0.0

    def account_type(self):
        return "Current"


class FixedDeposit(Account):
    INTEREST_RATE = 0.075

    def __init__(self, holder, balance, years):
        super().__init__(holder, balance)
        self.years = years

    def withdraw(self, amount):
        raise InsufficientFundsError("Cannot withdraw from a Fixed Deposit before maturity")

    def calculate_interest(self):
        return self._balance * self.INTEREST_RATE * self.years

    def account_type(self):
        return "FixedDeposit"


print(f"Welcome to {Account.bank_name}\n")

s = SavingsAccount("Mahesh", 5000)
c = CurrentAccount("Priya", 2000)
f = FixedDeposit("Ravi", 100000, 3)

for acc in (s, c, f):
    print(acc)
print()

s.deposit(2000)
s.withdraw(6000)

try:
    s.withdraw(1000)
except InsufficientFundsError as e:
    print("Error:", e)

c.withdraw(8000)

try:
    f.withdraw(100)
except InsufficientFundsError as e:
    print("Error:", e)

s.statement()
f.statement()
```

Output:

```
Welcome to Python National Bank

Savings #1001 | Mahesh | Bal: 5000.00
Current #1002 | Priya | Bal: 2000.00
FixedDeposit #1003 | Ravi | Bal: 100000.00

Deposited 2000. Balance: 7000
Withdrew 6000. Balance: 1000
Error: Cannot withdraw 1000. Available: 500
Withdrew 8000. Balance: -6000
Error: Cannot withdraw from a Fixed Deposit before maturity

--- Savings #1001 (Mahesh) ---
  07:04:21  OPEN         5000.00  bal    5000.00
  07:04:21  DEPOSIT      2000.00  bal    7000.00
  07:04:21  WITHDRAW     6000.00  bal    1000.00
  Interest earned: 40.00

--- FixedDeposit #1003 (Ravi) ---
  07:04:21  OPEN       100000.00  bal  100000.00
  Interest earned: 22500.00
```

Notice how `_available()` is overridden differently by each subclass — that single method makes savings accounts enforce a minimum balance, current accounts allow overdraft, and fixed deposits block withdrawals entirely. That is polymorphism doing real work.

### Extend it yourself

- [ ]  Add a `transfer(to_account, amount)` method
- [ ]  Add PIN authentication before any transaction
- [ ]  Persist accounts to a JSON file
- [ ]  Add a `Bank` class that holds all accounts and can search them

---

## Project 3: Library Management System

**Concepts used:** composition, dictionaries of objects, `@property`, date handling, fine calculation, borrowing limits.

```python
from datetime import date, timedelta


class Book:
    def __init__(self, isbn, title, author, copies=1):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.total_copies = copies
        self.available_copies = copies

    @property
    def is_available(self):
        return self.available_copies > 0

    def __str__(self):
        return f"{self.isbn:<8}{self.title:<28}{self.author:<18}{self.available_copies}/{self.total_copies}"

    def __repr__(self):
        return f"Book('{self.isbn}', '{self.title}')"


class Member:
    MAX_BOOKS = 3

    def __init__(self, member_id, name):
        self.member_id = member_id
        self.name = name
        self.borrowed = {}

    @property
    def can_borrow(self):
        return len(self.borrowed) < self.MAX_BOOKS

    def __str__(self):
        return f"{self.name} ({self.member_id}) - {len(self.borrowed)} book(s)"


class Library:
    LOAN_DAYS = 14
    FINE_PER_DAY = 5

    def __init__(self, name):
        self.name = name
        self.books = {}
        self.members = {}

    def add_book(self, book):
        if book.isbn in self.books:
            self.books[book.isbn].total_copies += book.total_copies
            self.books[book.isbn].available_copies += book.total_copies
        else:
            self.books[book.isbn] = book
        print(f"Added: {book.title}")

    def register(self, member):
        self.members[member.member_id] = member
        print(f"Registered: {member.name}")

    def issue(self, isbn, member_id):
        book = self.books.get(isbn)
        member = self.members.get(member_id)
        if not book:
            return print("Book not found")
        if not member:
            return print("Member not found")
        if not book.is_available:
            return print(f"'{book.title}' is not available")
        if not member.can_borrow:
            return print(f"{member.name} reached the limit of {Member.MAX_BOOKS}")
        if isbn in member.borrowed:
            return print(f"{member.name} already has this book")

        book.available_copies -= 1
        member.borrowed[isbn] = date.today()
        due = date.today() + timedelta(days=self.LOAN_DAYS)
        print(f"Issued '{book.title}' to {member.name}. Due: {due}")

    def return_book(self, isbn, member_id, days_late=0):
        member = self.members.get(member_id)
        if not member or isbn not in member.borrowed:
            return print("This book was not borrowed")

        book = self.books[isbn]
        book.available_copies += 1
        del member.borrowed[isbn]

        fine = days_late * self.FINE_PER_DAY
        msg = f"Returned '{book.title}'"
        print(msg + (f". Fine: {fine}" if fine else ". No fine"))

    def catalogue(self):
        print(f"\n{'ISBN':<8}{'Title':<28}{'Author':<18}Available")
        print("-" * 62)
        for b in self.books.values():
            print(b)


lib = Library("City Library")

lib.add_book(Book("B001", "Python Crash Course", "Eric Matthes", 2))
lib.add_book(Book("B002", "Clean Code", "Robert Martin", 1))
lib.add_book(Book("B003", "The Pragmatic Programmer", "Hunt & Thomas", 1))
print()

lib.register(Member("M01", "Mahesh"))
lib.register(Member("M02", "Priya"))
print()

lib.issue("B001", "M01")
lib.issue("B002", "M01")
lib.issue("B002", "M02")

lib.catalogue()
print()

lib.return_book("B002", "M01", days_late=3)
lib.catalogue()
```

Output:

```
Added: Python Crash Course
Added: Clean Code
Added: The Pragmatic Programmer

Registered: Mahesh
Registered: Priya

Issued 'Python Crash Course' to Mahesh. Due: 2026-08-10
Issued 'Clean Code' to Mahesh. Due: 2026-08-10
'Clean Code' is not available

ISBN    Title                       Author            Available
--------------------------------------------------------------
B001    Python Crash Course         Eric Matthes      1/2
B002    Clean Code                  Robert Martin     0/1
B003    The Pragmatic Programmer    Hunt & Thomas     1/1

Returned 'Clean Code'. Fine: 15

ISBN    Title                       Author            Available
--------------------------------------------------------------
B001    Python Crash Course         Eric Matthes      1/2
B002    Clean Code                  Robert Martin     1/1
B003    The Pragmatic Programmer    Hunt & Thomas     1/1
```

### Extend it yourself

- [ ]  Calculate `days_late` automatically from the real due date
- [ ]  Add a `Librarian` class with admin powers
- [ ]  Add a reservation queue for unavailable books
- [ ]  Search books by title or author

---

## Project 4: Employee Management System

**Concepts used:** abstract classes, hierarchical inheritance, polymorphic salary calculation, `@property` validation, sorting with `__lt__`.

```python
from abc import ABC, abstractmethod


class Employee(ABC):
    company = "TechCorp"
    _id_counter = 0

    def __init__(self, name, base_salary):
        Employee._id_counter += 1
        self.emp_id = f"E{Employee._id_counter:03d}"
        self.name = name
        self.base_salary = base_salary

    @property
    def base_salary(self):
        return self.__base

    @base_salary.setter
    def base_salary(self, v):
        if v <= 0:
            raise ValueError("Salary must be positive")
        self.__base = v

    @abstractmethod
    def calculate_salary(self):
        pass

    @abstractmethod
    def role(self):
        pass

    def __str__(self):
        return f"{self.emp_id:<6}{self.name:<12}{self.role():<12}{self.calculate_salary():>12,.2f}"

    def __lt__(self, other):
        return self.calculate_salary() < other.calculate_salary()


class Developer(Employee):
    def __init__(self, name, base, language):
        super().__init__(name, base)
        self.language = language

    def calculate_salary(self):
        return self.base_salary * 1.10          # 10% tech allowance

    def role(self):
        return "Developer"


class Manager(Employee):
    def __init__(self, name, base, team_size):
        super().__init__(name, base)
        self.team_size = team_size

    def calculate_salary(self):
        return self.base_salary + (self.team_size * 2000)   # per-head bonus

    def role(self):
        return "Manager"


class Intern(Employee):
    def calculate_salary(self):
        return self.base_salary * 0.5           # stipend

    def role(self):
        return "Intern"


class Company:
    def __init__(self, name):
        self.name = name
        self.employees = []

    def hire(self, e):
        self.employees.append(e)
        print(f"Hired {e.name} as {e.role()}")

    def fire(self, emp_id):
        for e in self.employees:
            if e.emp_id == emp_id:
                self.employees.remove(e)
                print(f"Removed {e.name}")
                return
        print("Employee not found")

    def payroll(self):
        return sum(e.calculate_salary() for e in self.employees)

    def display(self):
        print(f"\n{'ID':<6}{'Name':<12}{'Role':<12}{'Salary':>12}")
        print("-" * 42)
        for e in sorted(self.employees, reverse=True):
            print(e)
        print("-" * 42)
        print(f"{'TOTAL':<30}{self.payroll():>12,.2f}")

    def by_role(self, role):
        return [e for e in self.employees if e.role() == role]

    def __len__(self):
        return len(self.employees)


c = Company("TechCorp")
c.hire(Developer("Mahesh", 60000, "Python"))
c.hire(Manager("Priya", 80000, 5))
c.hire(Developer("Ravi", 55000, "Java"))
c.hire(Intern("Anita", 20000))

c.display()

print(f"\nHeadcount: {len(c)}")
print("Developers:", [e.name for e in c.by_role("Developer")])
```

Output:

```
Hired Mahesh as Developer
Hired Priya as Manager
Hired Ravi as Developer
Hired Anita as Intern

ID    Name        Role              Salary
------------------------------------------
E002  Priya       Manager        90,000.00
E001  Mahesh      Developer      66,000.00
E003  Ravi        Developer      60,500.00
E004  Anita       Intern         10,000.00
------------------------------------------
TOTAL                           226,500.00

Headcount: 4
Developers: ['Mahesh', 'Ravi']
```

One `payroll()` method correctly sums three completely different salary formulas — the `Company` class never checks any employee's type.

### Extend it yourself

- [ ]  Add leave tracking and deduct unpaid leave
- [ ]  Add a `give_raise(percent)` method
- [ ]  Add departments with their own budgets
- [ ]  Export the payroll to CSV

---

## Project 5: Inventory Management System

**Concepts used:** magic methods for a container (`__getitem__`, `__setitem__`, `__contains__`, `__len__`, `__iter__`), `@property` validation, custom exceptions, low-stock alerts.

```python
class OutOfStockError(Exception):
    pass


class Product:
    def __init__(self, sku, name, price, quantity=0, reorder_level=5):
        self.sku = sku
        self.name = name
        self.price = price
        self.quantity = quantity
        self.reorder_level = reorder_level

    @property
    def price(self):
        return self.__price

    @price.setter
    def price(self, v):
        if v < 0:
            raise ValueError("Price cannot be negative")
        self.__price = v

    @property
    def quantity(self):
        return self.__qty

    @quantity.setter
    def quantity(self, v):
        if v < 0:
            raise ValueError("Quantity cannot be negative")
        self.__qty = v

    @property
    def total_value(self):
        return self.price * self.quantity

    @property
    def needs_restock(self):
        return self.quantity <= self.reorder_level

    def __str__(self):
        flag = " ⚠️ LOW" if self.needs_restock else ""
        return f"{self.sku:<7}{self.name:<15}{self.price:>9,.2f}{self.quantity:>6}{self.total_value:>12,.2f}{flag}"

    def __repr__(self):
        return f"Product('{self.sku}', '{self.name}', {self.price})"


class Inventory:
    def __init__(self, name):
        self.name = name
        self._products = {}

    def __setitem__(self, sku, product):
        self._products[sku] = product

    def __getitem__(self, sku):
        if sku not in self._products:
            raise KeyError(f"SKU {sku} not found")
        return self._products[sku]

    def __contains__(self, sku):
        return sku in self._products

    def __len__(self):
        return len(self._products)

    def __iter__(self):
        return iter(self._products.values())

    def add(self, p):
        self._products[p.sku] = p
        print(f"Added {p.name}")

    def stock_in(self, sku, qty):
        p = self[sku]
        p.quantity += qty
        print(f"Stocked in {qty} x {p.name}. Now: {p.quantity}")

    def stock_out(self, sku, qty):
        p = self[sku]
        if qty > p.quantity:
            raise OutOfStockError(f"Only {p.quantity} x {p.name} left, requested {qty}")
        p.quantity -= qty
        print(f"Shipped {qty} x {p.name}. Now: {p.quantity}")

    @property
    def total_value(self):
        return sum(p.total_value for p in self)

    def low_stock(self):
        return [p for p in self if p.needs_restock]

    def report(self):
        print(f"\n{'SKU':<7}{'Product':<15}{'Price':>9}{'Qty':>6}{'Value':>12}")
        print("-" * 54)
        for p in sorted(self, key=lambda x: x.total_value, reverse=True):
            print(p)
        print("-" * 54)
        print(f"{'TOTAL INVENTORY VALUE':<37}{self.total_value:>12,.2f}")


inv = Inventory("Main Warehouse")
inv.add(Product("SKU001", "Laptop", 55000, 10))
inv.add(Product("SKU002", "Mouse", 800, 50))
inv.add(Product("SKU003", "Keyboard", 1500, 3))
inv.add(Product("SKU004", "Monitor", 12000, 8))

inv.report()
print()

inv.stock_out("SKU001", 4)
inv.stock_in("SKU003", 20)

try:
    inv.stock_out("SKU002", 100)
except OutOfStockError as e:
    print("Error:", e)

print("\nItems needing restock:", [p.name for p in inv.low_stock()])
print("SKU002 in inventory?", "SKU002" in inv)
print("Distinct products:", len(inv))

inv.report()
```

Output:

```
Added Laptop
Added Mouse
Added Keyboard
Added Monitor

SKU    Product            Price   Qty       Value
------------------------------------------------------
SKU001 Laptop         55,000.00    10  550,000.00
SKU004 Monitor        12,000.00     8   96,000.00
SKU002 Mouse             800.00    50   40,000.00
SKU003 Keyboard        1,500.00     3    4,500.00 ⚠️ LOW
------------------------------------------------------
TOTAL INVENTORY VALUE                  690,500.00

Shipped 4 x Laptop. Now: 6
Stocked in 20 x Keyboard. Now: 23
Error: Only 50 x Mouse left, requested 100

Items needing restock: []
SKU002 in inventory? True
Distinct products: 4

SKU    Product            Price   Qty       Value
------------------------------------------------------
SKU001 Laptop         55,000.00     6  330,000.00
SKU004 Monitor        12,000.00     8   96,000.00
SKU002 Mouse             800.00    50   40,000.00
SKU003 Keyboard        1,500.00    23   34,500.00
------------------------------------------------------
TOTAL INVENTORY VALUE                  500,500.00
```

Because of the magic methods, `Inventory` behaves like a built-in container: `inv["SKU001"]`, `"SKU002" in inv`, `len(inv)`, and `for p in inv` all work naturally.

### Extend it yourself

- [ ]  Add supplier details and purchase orders
- [ ]  Track stock movement history with timestamps
- [ ]  Add product categories with per-category reports
- [ ]  Save the inventory to JSON on exit and reload on start

---

## Project 6: Mini E-commerce Cart

**Concepts used:** the Strategy pattern with abstract classes, composition, magic methods, computed properties, formatted invoice output.

```python
from abc import ABC, abstractmethod


class Product:
    def __init__(self, pid, name, price):
        self.pid = pid
        self.name = name
        self.price = price

    def __str__(self):
        return f"{self.name} (₹{self.price:,.2f})"

    def __repr__(self):
        return f"Product('{self.pid}', '{self.name}', {self.price})"

    def __eq__(self, other):
        return isinstance(other, Product) and self.pid == other.pid

    def __hash__(self):
        return hash(self.pid)


class CartItem:
    def __init__(self, product, quantity=1):
        self.product = product
        self.quantity = quantity

    @property
    def subtotal(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.product.name:<18}{self.quantity:>4}{self.product.price:>11,.2f}{self.subtotal:>12,.2f}"


class Discount(ABC):
    @abstractmethod
    def apply(self, total):
        pass

    @abstractmethod
    def describe(self):
        pass


class NoDiscount(Discount):
    def apply(self, total):
        return total

    def describe(self):
        return "No discount"


class PercentDiscount(Discount):
    def __init__(self, percent):
        self.percent = percent

    def apply(self, total):
        return total * (1 - self.percent / 100)

    def describe(self):
        return f"{self.percent}% off"


class FlatDiscount(Discount):
    def __init__(self, amount):
        self.amount = amount

    def apply(self, total):
        return max(0, total - self.amount)

    def describe(self):
        return f"₹{self.amount} off"


class Cart:
    TAX_RATE = 0.18

    def __init__(self, customer):
        self.customer = customer
        self._items = {}
        self.discount = NoDiscount()

    def add(self, product, qty=1):
        if product.pid in self._items:
            self._items[product.pid].quantity += qty
        else:
            self._items[product.pid] = CartItem(product, qty)
        print(f"Added {qty} x {product.name}")

    def remove(self, pid):
        if pid in self._items:
            print(f"Removed {self._items.pop(pid).product.name}")
        else:
            print("Item not in cart")

    def update_qty(self, pid, qty):
        if pid not in self._items:
            return print("Item not in cart")
        if qty <= 0:
            return self.remove(pid)
        self._items[pid].quantity = qty
        print(f"Updated {self._items[pid].product.name} to qty {qty}")

    def __len__(self):
        return sum(i.quantity for i in self._items.values())

    def __iter__(self):
        return iter(self._items.values())

    def __contains__(self, pid):
        return pid in self._items

    def __bool__(self):
        return bool(self._items)

    @property
    def subtotal(self):
        return sum(i.subtotal for i in self)

    @property
    def after_discount(self):
        return self.discount.apply(self.subtotal)

    @property
    def tax(self):
        return self.after_discount * self.TAX_RATE

    @property
    def total(self):
        return self.after_discount + self.tax

    def checkout(self):
        if not self:
            return print("Cart is empty")
        print(f"\n{'=' * 50}")
        print(f"  INVOICE — {self.customer}")
        print("=" * 50)
        print(f"{'Item':<18}{'Qty':>4}{'Price':>11}{'Subtotal':>12}")
        print("-" * 50)
        for item in self:
            print(item)
        print("-" * 50)
        print(f"{'Subtotal':<33}{self.subtotal:>16,.2f}")
        print(f"{self.discount.describe():<33}{self.after_discount - self.subtotal:>16,.2f}")
        print(f"{'GST (18%)':<33}{self.tax:>16,.2f}")
        print("=" * 50)
        print(f"{'TOTAL':<33}{self.total:>16,.2f}")
        print("=" * 50)


laptop = Product("P1", "Laptop", 55000)
mouse = Product("P2", "Mouse", 800)
kb = Product("P3", "Keyboard", 1500)

cart = Cart("Mahesh")
cart.add(laptop)
cart.add(mouse, 2)
cart.add(kb)
cart.add(mouse, 1)

print(f"\nTotal units in cart: {len(cart)}")
print("Has keyboard?", "P3" in cart)

cart.update_qty("P2", 5)

cart.discount = PercentDiscount(10)
cart.checkout()

cart.discount = FlatDiscount(5000)
cart.checkout()
```

Output:

```
Added 1 x Laptop
Added 2 x Mouse
Added 1 x Keyboard
Added 1 x Mouse

Total units in cart: 5
Has keyboard? True
Updated Mouse to qty 5

==================================================
  INVOICE — Mahesh
==================================================
Item               Qty      Price    Subtotal
--------------------------------------------------
Laptop               1  55,000.00   55,000.00
Mouse                5     800.00    4,000.00
Keyboard             1   1,500.00    1,500.00
--------------------------------------------------
Subtotal                                60,500.00
10% off                                 -6,050.00
GST (18%)                                9,801.00
==================================================
TOTAL                                   64,251.00
==================================================

==================================================
  INVOICE — Mahesh
==================================================
Item               Qty      Price    Subtotal
--------------------------------------------------
Laptop               1  55,000.00   55,000.00
Mouse                5     800.00    4,000.00
Keyboard             1   1,500.00    1,500.00
--------------------------------------------------
Subtotal                                60,500.00
₹5000 off                               -5,000.00
GST (18%)                                9,990.00
==================================================
TOTAL                                   65,490.00
==================================================
```

Swapping `cart.discount` from `PercentDiscount` to `FlatDiscount` changes the entire pricing behaviour without touching the `Cart` class. This is the **Strategy pattern** — one of the most useful OOP designs you will ever learn.

### Extend it yourself

- [ ]  Add stock checks against an `Inventory` object
- [ ]  Add an `Order` class with a status (placed, shipped, delivered)
- [ ]  Add multiple payment methods with an abstract `Payment` class
- [ ]  Add a wishlist and "save for later"

---

## Build a Complete OOP-Based Project

Now combine everything into one capstone application.

### Suggested capstone: School Management System

Bring together every concept from Phase 4:

```
SchoolManagementSystem/
│
├── main.py                  # menu-driven entry point
├── models/
│   ├── __init__.py
│   ├── person.py            # Person (abstract base)
│   ├── student.py           # Student(Person)
│   ├── teacher.py           # Teacher(Person)
│   └── course.py            # Course
├── services/
│   ├── __init__.py
│   ├── enrollment.py        # links students and courses
│   └── grading.py           # grade calculation
├── storage/
│   ├── __init__.py
│   └── repository.py        # save/load JSON
└── exceptions.py            # custom exception classes
```

### Requirements checklist

Your capstone should demonstrate:

- [ ]  **Abstraction** — an abstract `Person` base class with `@abstractmethod`
- [ ]  **Inheritance** — `Student` and `Teacher` both inherit from `Person`
- [ ]  **Encapsulation** — private attributes with `@property` validation
- [ ]  **Polymorphism** — a `describe()` method behaving differently per type
- [ ]  **Magic methods** — `__str__`, `__repr__`, `__eq__`, `__len__`, `__getitem__`
- [ ]  **Composition** — a `Course` **has** enrolled `Student` objects
- [ ]  **Class methods** — factory methods like `Student.from_dict()`
- [ ]  **Static methods** — validation helpers
- [ ]  **Custom exceptions** — `EnrollmentFullError`, `StudentNotFoundError`
- [ ]  **Modules and packages** — code split across files with `__init__.py`
- [ ]  **File handling** — save and load state as JSON
- [ ]  **Exception handling** — the menu never crashes on bad input

### A skeleton to start from

```python
# models/person.py
from abc import ABC, abstractmethod


class Person(ABC):
    _id_counter = 0

    def __init__(self, name, age):
        Person._id_counter += 1
        self._id = Person._id_counter
        self.name = name
        self.age = age

    @property
    def age(self):
        return self.__age

    @age.setter
    def age(self, value):
        if not 0 < value < 120:
            raise ValueError("Invalid age")
        self.__age = value

    @property
    def id(self):
        return self._id

    @abstractmethod
    def role(self):
        pass

    @abstractmethod
    def describe(self):
        pass

    def __str__(self):
        return f"[{self._id}] {self.name} ({self.role()})"

    def __repr__(self):
        return f"{self.__class__.__name__}('{self.name}', {self.age})"
```

```python
# models/student.py
from .person import Person


class Student(Person):
    def __init__(self, name, age, grade_level):
        super().__init__(name, age)
        self.grade_level = grade_level
        self.courses = []
        self.grades = {}

    def role(self):
        return "Student"

    def describe(self):
        return f"{self.name} studies in grade {self.grade_level}"

    @property
    def gpa(self):
        if not self.grades:
            return 0.0
        return sum(self.grades.values()) / len(self.grades)

    @classmethod
    def from_dict(cls, data):
        return cls(data["name"], data["age"], data["grade_level"])

    def to_dict(self):
        return {"name": self.name, "age": self.age, "grade_level": self.grade_level}

    def __len__(self):
        return len(self.courses)
```

### Development steps

1. **Design first** — write down your classes, attributes, and methods on paper.
2. **Build one class at a time** — test each one before moving on.
3. **Add the relationships** — enrollment, grading.
4. **Add persistence** — JSON save and load.
5. **Add the menu loop** — wrap everything in `try`/`except`.
6. **Refactor** — anything repeated three times should become a method.

### More capstone ideas

| Project | Key classes | Concepts stressed |
| --- | --- | --- |
| **Hospital Management** | `Patient`, `Doctor`, `Appointment`, `Bill` | Inheritance, scheduling |
| **Hotel Booking** | `Room`, `Booking`, `Guest`, `Hotel` | Composition, date handling |
| **Quiz Engine** | `Question`, `MCQ`, `TrueFalse`, `Quiz` | Polymorphism, abstract classes |
| **Parking Lot** | `Vehicle`, `Car`, `Bike`, `Slot`, `Ticket` | Inheritance, pricing strategies |
| **Chess/Tic-Tac-Toe** | `Piece`, `Board`, `Player`, `Game` | Magic methods, game state |
| **Music Player** | `Track`, `Album`, `Playlist`, `Player` | Container magic methods |
| **Blog System** | `User`, `Post`, `Comment`, `Blog` | Composition, relationships |

---

## Common Project Mistakes

### 1. Making one giant class

```python
# Wrong — this class does everything
class Library:
    def add_book(self): ...
    def calculate_fine(self): ...
    def send_email(self): ...
    def generate_pdf(self): ...
    def connect_database(self): ...
```

Split it. One class = one responsibility.

### 2. Using inheritance where composition fits

```python
# Wrong — a Library is not a Book
class Library(Book):
    pass

# Correct — a Library HAS books
class Library:
    def __init__(self):
        self.books = []
```

### 3. Printing instead of returning

```python
# Wrong — you cannot reuse this value
def calculate_total(self):
    print(self.price * self.qty)

# Correct
def calculate_total(self):
    return self.price * self.qty
```

### 4. No validation

```python
# Wrong
self.marks = marks          # accepts -50 or 500

# Correct
@marks.setter
def marks(self, value):
    if not 0 <= value <= 100:
        raise ValueError("Marks must be 0-100")
    self.__marks = value
```

### 5. Storing everything in raw dictionaries

```python
# Wrong — no validation, no methods, easy to typo a key
students = [{"name": "Mahesh", "marks": 85}]

# Correct
students = [Student("Mahesh", 85)]
```

### 6. Forgetting `__str__` and `__repr__`

Debugging a list of `<object at 0x7f8b...>` is painful. Always add them.

---

## Phase 4 Practice Checklist

Work through these in order:

- [ ]  Create a `Book` class with title, author, price, and a `__str__`
- [ ]  Add `@property` validation so price cannot be negative
- [ ]  Create `EBook` and `PrintedBook` subclasses with different shipping costs
- [ ]  Make books sortable by price using `__lt__`
- [ ]  Build a `BookShelf` container with `__len__`, `__getitem__`, and `__iter__`
- [ ]  Add a custom `BookNotFoundError` exception
- [ ]  Make the shelf save and load from JSON
- [ ]  Add an abstract `Discount` class with two implementations
- [ ]  Write `__eq__` and `__hash__` so books work inside a `set`
- [ ]  Wrap it all in a menu-driven program that never crashes
