# Assignment Solutions

## A10. Function Library and Test Suite
```python
# utils.py
import math

def is_prime(n: int) -> bool:
    """Returns True if n is prime, False otherwise. Raises TypeError if n is not an int."""
    if not isinstance(n, int): raise TypeError("n must be an integer")
    if n <= 1: return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0: return False
    return True

def factorial(n: int) -> int:
    """Returns n!. Raises ValueError if n is negative."""
    if n < 0: raise ValueError("n cannot be negative")
    if n == 0: return 1
    result = 1
    for i in range(1, n + 1): result *= i
    return result

def fibonacci(n: int) -> int:
    """Returns the nth Fibonacci number iteratively. Raises ValueError if n < 0."""
    if n < 0: raise ValueError("n cannot be negative")
    if n == 0: return 0
    a, b = 0, 1
    for _ in range(n - 1): a, b = b, a + b
    return b

def fib_recursive(n: int) -> int:
    """Recursive Fibonacci. Extremely slow for n > 30 because it computes the same subproblems repeatedly."""
    if n < 0: raise ValueError()
    if n <= 1: return n
    return fib_recursive(n - 1) + fib_recursive(n - 2)

def gcd(a: int, b: int) -> int:
    """Returns the greatest common divisor."""
    return math.gcd(a, b)

def lcm(a: int, b: int) -> int:
    """Returns the least common multiple."""
    if a == 0 or b == 0: return 0
    return abs(a * b) // gcd(a, b)

def reverse_number(n: int) -> int:
    """Reverses the digits of an integer. Preserves sign."""
    sign = -1 if n < 0 else 1
    return sign * int(str(abs(n))[::-1])

def digit_sum(n: int) -> int:
    """Returns sum of digits of n."""
    return sum(int(d) for d in str(abs(n)))

def is_palindrome(text: str) -> bool:
    """Checks if text is a palindrome ignoring case and non-alphanumeric chars."""
    cleaned = [c.lower() for c in text if c.isalnum()]
    return cleaned == cleaned[::-1]

def celsius_to_fahrenheit(c: float) -> float:
    """Converts Celsius to Fahrenheit."""
    return (c * 9/5) + 32

def safe_divide(a: float, b: float) -> float:
    """Divides a by b. Raises ValueError if b is 0."""
    if b == 0: raise ValueError("Division by zero")
    return a / b

def word_count(text: str) -> int:
    """Returns number of words in text."""
    return len(text.split())

def clean_text(text: str) -> str:
    """Returns text in lowercase with only letters and spaces."""
    return "".join(c for c in text.lower() if c.isalpha() or c.isspace())

def summarise(*numbers: float, **options) -> str:
    """Summarises a variable number of arguments based on **options."""
    if not numbers: return "No numbers provided."
    total = sum(numbers)
    rnd = options.get("round", 2)
    fmt = options.get("format", "text")
    if fmt == "json":
        return f'{{"sum": {round(total, rnd)}}}'
    return f"Sum is {round(total, rnd)}"

def make_multiplier(n: int):
    """Returns a function that multiplies its argument by n.
    The returned function remembers 'n' (closure)."""
    def multiplier(x: int) -> int:
        return x * n
    return multiplier

def apply_n_times(func, value, n: int):
    """Applies func to value n times."""
    result = value
    for _ in range(n): result = func(result)
    return result

def time_it(func, *args):
    """Times the execution of func(*args)."""
    import time
    start = time.perf_counter()
    result = func(*args)
    end = time.perf_counter()
    return result, end - start

# The mutable default trap
# BAD: def add_item(item, cart=[]):
# Because default arguments are evaluated ONCE when the function is defined,
# not every time it is called. The same list object is shared.
def add_item_safe(item, cart=None):
    if cart is None:
        cart = []
    cart.append(item)
    return cart

# test_utils.py (partial example of tests you would write)
def test_all():
    assert is_prime(97) == True
    assert is_prime(1) == False
    assert factorial(5) == 120
    assert fibonacci(10) == 55
    assert is_palindrome("A man a plan a canal Panama") == True
    try:
        factorial(-1)
        assert False, "Should have raised ValueError"
    except ValueError:
        pass
    print("All tests passed!")

if __name__ == "__main__":
    test_all()
```

## A11. File Processing Pipeline
```python
import csv
import json
import random
from collections import defaultdict

def generate_data(path: str):
    random.seed(42)
    regions = ["North", "South", "East", "West"]
    products = ["Widget", "Gadget", "Doohickey", "Widget, Large"]
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["date", "region", "product", "units", "unit_price"])
        for i in range(200):
            writer.writerow([
                f"2025-01-{random.randint(1,28):02d}",
                random.choice(regions),
                random.choice(products),
                random.randint(1, 50),
                round(random.uniform(10.0, 100.0), 2)
            ])

def read_methods_compare(path: str):
    # 1. csv.reader handles "Widget, Large" correctly
    with open(path, "r", encoding="utf-8") as f:
        valid_rows = list(csv.reader(f))
    
    # 2. manual split fails on commas inside quotes
    bad_rows = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            bad_rows.append(line.strip().split(","))
            
    print(f"csv.reader row 5 len: {len(valid_rows[5])}")
    print(f"manual split row 5 len: {len(bad_rows[5])}") # will be 6 if product has comma

def file_stats(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    return {
        "chars": len(content),
        "bytes": len(content.encode("utf-8")),
        "lines": content.count("\n") + 1,
        "words": len(content.split())
    }

def find_in_file(path: str, term: str):
    results = []
    with open(path, "r", encoding="utf-8") as f:
        for i, line in enumerate(f, 1):
            if term.lower() in line.lower():
                results.append((i, line.strip()))
    return results

def process_to_json(csv_path: str, json_path: str):
    grouped = defaultdict(list)
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            row["revenue"] = float(row["units"]) * float(row["unit_price"])
            grouped[row["region"]].append(row)
            
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(grouped, f, indent=2)

if __name__ == "__main__":
    generate_data("sales.csv")
    read_methods_compare("sales.csv")
    print(file_stats("sales.csv"))
    process_to_json("sales.csv", "sales.json")
```

## A12. Robust Error Handling
```python
def get_int(prompt: str, min_val: int = None, max_val: int = None) -> int:
    while True:
        try:
            val = int(input(prompt))
            if min_val is not None and val < min_val:
                print(f"Value must be >= {min_val}")
                continue
            if max_val is not None and val > max_val:
                print(f"Value must be <= {max_val}")
                continue
            return val
        except ValueError:
            print("Please enter a valid integer.")
        except KeyboardInterrupt:
            print("\nOperation cancelled by user.")
            exit(1)

class InsufficientFundsError(Exception):
    def __init__(self, requested, available):
        self.requested = requested
        self.available = available
        super().__init__(f"Requested {requested}, but only {available} available.")

def withdraw(amount, balance):
    if amount > balance:
        raise InsufficientFundsError(amount, balance)
    return balance - amount

def demo_bare_except_bug():
    # If we use except:, it catches NameError for 'typographical_error' and hides the bug!
    try:
        x = int("10")
        # typographical_error() 
    except ValueError:
        print("Caught the value error, bug remains visible if present.")

def process_file(path: str) -> dict:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            data = f.read()
            if not data:
                return {"success": False, "error": "File is empty", "data": None}
            return {"success": True, "error": None, "data": data}
    except FileNotFoundError:
        return {"success": False, "error": "File not found", "data": None}
    except IsADirectoryError:
        return {"success": False, "error": "Path is a directory", "data": None}
    except PermissionError:
        return {"success": False, "error": "Permission denied", "data": None}
    except UnicodeDecodeError:
        return {"success": False, "error": "File is binary", "data": None}

if __name__ == "__main__":
    try:
        withdraw(100, 50)
    except InsufficientFundsError as e:
        print(f"Failed. Shortfall: {e.requested - e.available}")
```

## A13. Expense Tracker with Persistence
```python
import json
import os
from datetime import datetime

class ValidationError(Exception): pass
class NotFoundError(Exception): pass

def load_expenses(path: str) -> list:
    if not os.path.exists(path): return []
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        print("Data file corrupted. Starting fresh.")
        return []

def save_expenses(expenses: list, path: str):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(expenses, f, indent=2)

def add_expense(expenses: list, date_str: str, category: str, amount: float, note: str):
    try:
        datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        raise ValidationError("Date must be YYYY-MM-DD")
        
    if amount <= 0:
        raise ValidationError("Amount must be positive")
        
    valid_cats = {"Food", "Transport", "Utilities", "Entertainment", "Other"}
    if category not in valid_cats:
        raise ValidationError(f"Category must be one of {valid_cats}")
        
    new_id = max((e.get("id", 0) for e in expenses), default=0) + 1
    expenses.append({
        "id": new_id,
        "date": date_str,
        "category": category,
        "amount": amount,
        "note": note
    })

def delete_expense(expenses: list, expense_id: int):
    for i, e in enumerate(expenses):
        if e["id"] == expense_id:
            del expenses[i]
            return
    raise NotFoundError(f"Expense {expense_id} not found.")

def filter_expenses(expenses: list, **criteria):
    results = expenses
    if "category" in criteria:
        results = [e for e in results if e["category"] == criteria["category"]]
    if "min_amount" in criteria:
        results = [e for e in results if e["amount"] >= criteria["min_amount"]]
    return results

def main():
    PATH = "expenses.json"
    expenses = load_expenses(PATH)
    
    while True:
        print("\n1. Add  2. Delete  3. View  4. Exit")
        choice = input("Choice: ")
        
        if choice == '4':
            break
        elif choice == '1':
            try:
                date = input("Date (YYYY-MM-DD): ")
                cat = input("Category: ")
                amt = float(input("Amount: "))
                note = input("Note: ")
                add_expense(expenses, date, cat, amt, note)
                save_expenses(expenses, PATH)
                print("Added.")
            except Exception as e:
                print(f"Error: {e}")
        elif choice == '2':
            try:
                eid = int(input("ID to delete: "))
                delete_expense(expenses, eid)
                save_expenses(expenses, PATH)
                print("Deleted.")
            except Exception as e:
                print(f"Error: {e}")
        elif choice == '3':
            for e in expenses:
                print(f"{e['id']}: {e['date']} - {e['category']} - ${e['amount']}")

if __name__ == "__main__":
    main()
```

## A14. Data Analysis CLI
```python
import sys
import csv
import random
import statistics

def generate_data(path: str):
    random.seed(42)
    categories = ["A", "B", "C"]
    with open(path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["date", "category", "amount"])
        
        rows = []
        for i in range(485):
            d = f"2025-01-{random.randint(1,28):02d}"
            c = random.choice(categories)
            a = round(random.uniform(10, 100), 2)
            rows.append([d, c, a])
            
        # Inject problems
        for _ in range(15): rows.append(["2025-01-01", "A", ""]) # missing amount
        for _ in range(8): rows.append(["invalid-date", "B", 50.0]) # invalid date
        
        # 5 duplicates
        for _ in range(5): rows.append(rows[0])
        
        random.shuffle(rows)
        for r in rows: writer.writerow(r)
    print("Injected: 15 missing amounts, 8 invalid dates, 5 duplicates. Total 513 rows.")

def load_data(path: str):
    good = []
    problems = []
    with open(path, "r") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader, 2):
            if not row.get("amount"):
                problems.append((i, "Missing amount"))
                continue
            try:
                amt = float(row["amount"])
            except ValueError:
                problems.append((i, "Invalid amount"))
                continue
                
            if "invalid" in row["date"]:
                problems.append((i, "Invalid date"))
                continue
                
            good.append({"date": row["date"], "category": row["category"], "amount": amt})
            
    # Deduplicate
    unique_good = []
    seen = set()
    for r in good:
        tup = (r["date"], r["category"], r["amount"])
        if tup not in seen:
            seen.add(tup)
            unique_good.append(r)
        else:
            problems.append(("?", "Duplicate row"))
            
    return unique_good, problems

def analyze(data: list):
    amounts = [r["amount"] for r in data]
    total = sum(amounts)
    mean = total / len(amounts) if amounts else 0
    
    # Hand-computed sample std dev
    if len(amounts) > 1:
        variance = sum((x - mean) ** 2 for x in amounts) / (len(amounts) - 1)
        std_dev = variance ** 0.5
    else:
        std_dev = 0
        
    print(f"Total: {total:.2f}, Mean: {mean:.2f}, StdDev: {std_dev:.2f}")
    
    if amounts and len(amounts) > 1:
        stat_std = statistics.stdev(amounts)
        print(f"Statistics module matches: {abs(std_dev - stat_std) < 0.001}")

if __name__ == "__main__":
    if len(sys.argv) < 2 or "--help" in sys.argv:
        print("Usage: python analyse.py data.csv [--report]")
        sys.exit(1)
        
    path = sys.argv[1]
    if path == "generate":
        generate_data("data.csv")
        sys.exit(0)
        
    try:
        good, problems = load_data(path)
        print(f"Loaded {len(good)} valid rows. Found {len(problems)} problems.")
        if "--report" in sys.argv:
            analyze(good)
    except FileNotFoundError:
        print(f"Error: {path} not found.")
        sys.exit(1)
```
