# Project Solutions

## P1. Scientific Calculator
```python
def add(a, b):
    return a + b

def sub(a, b):
    return a - b

def mul(a, b):
    return a * b

def div(a, b):
    if b == 0:
        return None
    return a / b

def pow(a, b):
    return a ** b

def sqrt(n):
    if n < 0:
        return None
    return n ** 0.5

def fact(n):
    if n < 0 or not isinstance(n, int):
        return None
    if n == 0:
        return 1
    return n * fact(n - 1)

def main():
    while True:
        print("1. Add  2. Subtract  3. Multiply  4. Divide  5. Power  6. Square Root  7. Factorial  8. Exit")
        choice = input("Choice: ").strip()
        
        if choice == '8':
            break
            
        if choice not in list("1234567"):
            print("Invalid choice.")
            continue
            
        if choice in list("12345"):
            try:
                a = float(input("First number: "))
                b = float(input("Second number: "))
            except ValueError:
                print("Invalid input.")
                continue
                
            if choice == '1': res = add(a, b)
            elif choice == '2': res = sub(a, b)
            elif choice == '3': res = mul(a, b)
            elif choice == '4':
                res = div(a, b)
                if res is None:
                    print("Cannot divide by zero!")
                    continue
            elif choice == '5': res = pow(a, b)
            
            print(f"Result: {res:.4f}")
            
        elif choice == '6':
            try:
                n = float(input("n: "))
            except ValueError:
                print("Invalid input.")
                continue
            res = sqrt(n)
            if res is None:
                print("Cannot take square root of negative number.")
            else:
                print(f"Result: {res:.4f}")
                
        elif choice == '7':
            try:
                n = int(input("n: "))
            except ValueError:
                print("n must be a whole number.")
                continue
            res = fact(n)
            if res is None:
                print("n must be a whole number >= 0.")
            else:
                print(f"{n}! = {res}")

if __name__ == "__main__":
    main()
```

## P2. Contact Book with File Storage
```python
import json

def load_contacts(filepath="contacts.json"):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            contacts = json.load(f)
            print(f"Loading contacts... {len(contacts)} contacts loaded.")
            return contacts
    except FileNotFoundError:
        print("Loading contacts... 0 contacts loaded.")
        return {}
    except json.JSONDecodeError:
        print("contacts.json is corrupt, starting fresh.")
        return {}

def save_contacts(contacts, filepath="contacts.json"):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(contacts, f, indent=2)
    print(f"Saved. Remaining on disk: {len(contacts)} contacts.")

def main():
    contacts = load_contacts()
    
    while True:
        print("1. Add  2. Search  3. List All  4. Delete  5. Exit")
        choice = input("Choice: ").strip()
        
        if choice == '1':
            name = input("Name: ").strip()
            phone = input("Phone: ").strip()
            contacts[name] = phone
            save_contacts(contacts)
            
        elif choice == '2':
            q = input("Search Name: ").strip().lower()
            found = False
            for name, phone in contacts.items():
                if q in name.lower():
                    print(f"{name}: {phone}")
                    found = True
            if not found:
                print("No contacts found.")
                
        elif choice == '3':
            print(f"{len(contacts)} contacts.")
            for name in sorted(contacts.keys()):
                print(f"{name}: {contacts[name]}")
                
        elif choice == '4':
            name = input("Name: ").strip()
            if name in contacts:
                del contacts[name]
                save_contacts(contacts)
            else:
                print("No contact found.")
                
        elif choice == '5':
            break

if __name__ == "__main__":
    main()
```

## P3. Expense Tracker
```python
import csv
from datetime import datetime

def add_expense(filepath="expenses.csv"):
    date = input("Date (YYYY-MM-DD) or empty for today: ").strip()
    if not date:
        date = datetime.now().strftime("%Y-%m-%d")
        
    category = input("Category: ").strip()
    if not category:
        print("Category cannot be empty.")
        return
        
    try:
        amount = float(input("Amount: "))
        if amount <= 0:
            print("Amount must be positive.")
            return
    except ValueError:
        print("Invalid amount.")
        return
        
    note = input("Note: ").strip()
    
    file_exists = False
    try:
        with open(filepath, "r") as f:
            file_exists = True
    except FileNotFoundError:
        pass
        
    with open(filepath, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(["date", "category", "amount", "note"])
        writer.writerow([date, category, amount, note])
    print("Expense added.")

def monthly_summary(filepath="expenses.csv"):
    month = input("Month (YYYY-MM): ").strip()
    totals = {}
    total_spent = 0.0
    
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row["date"].startswith(month):
                    cat = row["category"]
                    amt = float(row["amount"])
                    totals[cat] = totals.get(cat, 0.0) + amt
                    total_spent += amt
    except FileNotFoundError:
        print("No expenses recorded yet.")
        return
        
    if not totals:
        print("No expenses for that month.")
        return
        
    sorted_cats = sorted(totals.items(), key=lambda kv: (-kv[1], kv[0]))
    
    lines = [f"{month} summary:", f"  Total: {total_spent:.2f}"]
    for cat, amt in sorted_cats:
        lines.append(f"  {cat}: {amt:.2f}")
    lines.append(f"Top category: {sorted_cats[0][0]}")
    
    report_text = "\n".join(lines)
    print(report_text)
    
    with open("summary.txt", "w", encoding="utf-8") as f:
        f.write(report_text + "\n")
    print("Report written to summary.txt")

def main():
    while True:
        print("1. Add Expense  2. Monthly Summary  3. Exit")
        choice = input("Choice: ").strip()
        if choice == '1':
            add_expense()
        elif choice == '2':
            monthly_summary()
        elif choice == '3':
            break

if __name__ == "__main__":
    main()
```

## P4. Student Report Card Generator
```python
import csv

def generate_report():
    students = {}
    skipped = 0
    
    try:
        with open("marks.csv", "r", encoding="utf-8") as f:
            print("Reading marks.csv... ")
            reader = csv.DictReader(f)
            for row in reader:
                name = row.get("name", "").strip()
                try:
                    mark = float(row.get("marks", ""))
                    if not name:
                        skipped += 1
                        continue
                    if name not in students:
                        students[name] = []
                    students[name].append(mark)
                except ValueError:
                    skipped += 1
    except FileNotFoundError:
        print("marks.csv not found.")
        return
        
    if skipped > 0:
        print(f"Skipped {skipped} invalid row{'s' if skipped > 1 else ''}.")
        
    results = []
    class_sum = 0
    class_count = 0
    
    for name, marks in students.items():
        avg = sum(marks) / len(marks)
        class_sum += avg
        class_count += 1
        
        if avg >= 90: grade = 'A'
        elif avg >= 75: grade = 'B'
        elif avg >= 60: grade = 'C'
        elif avg >= 40: grade = 'D'
        else: grade = 'F'
        
        results.append((name, avg, grade))
        
    results.sort(key=lambda x: (-x[1], x[0]))
    
    lines = ["=== Class Report ==="]
    for name, avg, grade in results:
        lines.append(f"{name} - {avg:.2f} - {grade}")
        
    if class_count > 0:
        overall_avg = class_sum / class_count
        lines.append(f"Class average: {overall_avg:.2f}")
        
    report = "\n".join(lines)
    print("Report written to report.txt")
    print(report)
    
    with open("report.txt", "w", encoding="utf-8") as f:
        f.write(report + "\n")

if __name__ == "__main__":
    generate_report()
```

## P5. Password Manager (basic)
```python
import json

def load_vault(filepath="vault.json"):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def save_vault(vault, filepath="vault.json"):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(vault, f, indent=2)

def main():
    pin = input("Enter PIN: ").strip()
    if pin != "2468":
        attempts = 2
        while attempts > 0:
            pin = input(f"Wrong. Enter PIN ({attempts} left): ").strip()
            if pin == "2468":
                break
            attempts -= 1
        if attempts == 0:
            print("Locked.")
            return

    vault = load_vault()
    
    while True:
        print("1. Save Credential  2. Get Credential  3. List Services  4. Delete  5. Exit")
        choice = input("Choice: ").strip()
        
        if choice == '1':
            svc = input("Service: ").strip()
            if not svc:
                print("Service cannot be empty.")
                continue
            usr = input("Username: ").strip()
            if not usr:
                print("Username cannot be empty.")
                continue
            pwd = input("Password: ")
            if len(pwd) < 6:
                print("Password must be at least 6 characters.")
                continue
                
            vault[svc] = {"username": usr, "password": pwd}
            save_vault(vault)
            print(f"Saved {svc}.")
            
        elif choice == '2':
            svc = input("Service: ").strip()
            if svc in vault:
                print(f"Username: {vault[svc]['username']}\nPassword: {vault[svc]['password']}")
            else:
                print("Not found.")
                
        elif choice == '3':
            for svc in sorted(vault.keys()):
                print(f"- {svc}")
                
        elif choice == '4':
            svc = input("Service: ").strip()
            if svc in vault:
                del vault[svc]
                save_vault(vault)
                print(f"Deleted {svc}.")
            else:
                print("Not found.")
                
        elif choice == '5':
            break

if __name__ == "__main__":
    main()
```

## P6. Custom Utility Package
```python
# Create mytools/__init__.py
"""
from .mathutil import is_prime, gcd, lcm, factorial
from .strutil import reverse, count_vowels, is_palindrome, title_case
__all__ = ['is_prime', 'gcd', 'lcm', 'factorial', 'reverse', 'count_vowels', 'is_palindrome', 'title_case']
"""

# Create mytools/mathutil.py
"""
import math

def is_prime(n):
    if n < 2: return False
    for i in range(2, math.isqrt(n) + 1):
        if n % i == 0:
            return False
    return True

def gcd(a, b):
    if a == 0 and b == 0: raise ValueError("gcd(0, 0) is undefined")
    return math.gcd(a, b)

def lcm(a, b):
    if a == 0 and b == 0: raise ValueError("lcm(0, 0) is undefined")
    return abs(a*b) // gcd(a, b)

def factorial(n):
    if n < 0: raise ValueError("Factorial of negative number")
    return math.factorial(n)

if __name__ == "__main__":
    print(is_prime(97))
"""

# Create mytools/strutil.py
"""
def reverse(s):
    return s[::-1]

def count_vowels(s):
    return sum(1 for c in s.lower() if c in 'aeiou')

def is_palindrome(s):
    clean = "".join(c for c in s.lower() if c.isalpha())
    return clean == clean[::-1]

def title_case(s):
    return s.title()

if __name__ == "__main__":
    print(reverse("hello"))
"""

# Create demo.py
"""
from mytools import *

print(f"Prime checks: 2->{is_prime(2)} 97->{is_prime(97)} 99->{is_prime(99)}")
print(f"gcd(48, 36) = {gcd(48, 36)}")
print(f"lcm(4, 6) = {lcm(4, 6)}")
print(f"'recursion' reversed = '{reverse('recursion')}'")
print(f"vowels in 'hello world' = {count_vowels('hello world')}")
"""
```

## P7. Log File Analyser
```python
def parse_line(line):
    if not line.startswith("["):
        return None
    try:
        time = line[1:20]
        rest = line[22:]
        parts = rest.split(maxsplit=1)
        if len(parts) < 2:
            return None
        level, msg = parts
        return {"time": time, "level": level, "msg": msg.strip()}
    except Exception:
        return None

def summarise(log_lines):
    levels = {"INFO": 0, "WARN": 0, "ERROR": 0}
    errors = {}
    hours = {}
    ignored = 0
    
    for line in log_lines:
        parsed = parse_line(line)
        if not parsed:
            ignored += 1
            continue
            
        lvl = parsed["level"]
        if lvl in levels:
            levels[lvl] += 1
        else:
            levels[lvl] = 1
            
        if lvl == "ERROR":
            msg = parsed["msg"]
            errors[msg] = errors.get(msg, 0) + 1
            
        hr = parsed["time"][11:13]
        hours[hr] = hours.get(hr, 0) + 1
        
    return {"levels": levels, "errors": errors, "hours": hours, "ignored": ignored}

def report(stats):
    if stats["ignored"] > 0:
        print(f"Ignored {stats['ignored']} malformed lines.")
        
    print("Levels:")
    for lvl in ["INFO", "WARN", "ERROR"]:
        print(f"  {lvl}: {stats['levels'].get(lvl, 0)}")
        
    print("Top errors:")
    sorted_errs = sorted(stats["errors"].items(), key=lambda kv: (-kv[1], kv[0]))
    for i, (msg, cnt) in enumerate(sorted_errs[:3], 1):
        print(f"  {i}. {msg} ({cnt})")
        
    print("Busiest hour:")
    if stats["hours"]:
        busiest = max(stats["hours"].items(), key=lambda kv: kv[1])
        hr = busiest[0]
        cnt = busiest[1]
        print(f"  {hr}:00-{hr}:59 ({cnt} lines)")

def main():
    try:
        with open("server.log", "r", encoding="utf-8") as f:
            lines = f.readlines()
        print(f"Reading server.log... {len(lines)} lines read")
        stats = summarise(lines)
        report(stats)
    except FileNotFoundError:
        print("server.log not found.")

if __name__ == "__main__":
    main()
```

## P8. Quiz App with Persistence
```python
import json
import csv
from datetime import datetime

def main():
    try:
        with open("questions.json", "r", encoding="utf-8") as f:
            questions = json.load(f)
            print(f"Loading questions.json... {len(questions)} questions.")
    except Exception as e:
        print(f"Failed to load questions: {e}")
        return
        
    name = input("Name: ").strip()
    if not name:
        print("Name cannot be empty.")
        return
        
    score = 0
    letters = ['a', 'b', 'c', 'd']
    
    for i, q in enumerate(questions, 1):
        print(f"Q{i}. {q['q']}")
        opts = q['options']
        print(f"   a) {opts[0]}   b) {opts[1]}   c) {opts[2]}   d) {opts[3]}")
        
        while True:
            ans = input("Your answer: ").lower().strip()
            if ans in letters:
                break
            print("Please enter a, b, c, or d.")
            
        if ans == q['answer']:
            score += 1
            
    print(f"({score}/{len(questions)} correct)")
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open("scores.csv", "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([name, score, timestamp])
    print("Appended to scores.csv.")
    
    print("=== Leaderboard ===")
    scores = []
    try:
        with open("scores.csv", "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            for row in reader:
                if len(row) >= 3:
                    scores.append((row[0], int(row[1]), row[2]))
    except FileNotFoundError:
        pass
        
    scores.sort(key=lambda r: (-r[1], r[2]))
    for i, (n, s, t) in enumerate(scores[:5], 1):
        print(f"{i}. {n}    {s} {t}")

if __name__ == "__main__":
    main()
```

## P9. File Organiser
```python
import os
import shutil

def main():
    base_dir = "./files/"
    if not os.path.exists(base_dir):
        print(f"Directory {base_dir} not found.")
        return
        
    files = [f for f in os.listdir(base_dir) if os.path.isfile(os.path.join(base_dir, f))]
    print(f"Scanning {base_dir} ... {len(files)} files found")
    
    counts = {"Documents": 0, "Images": 0, "Data": 0, "Other": 0}
    
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in ['.pdf', '.docx', '.txt']:
            folder = "Documents"
        elif ext in ['.png', '.jpg', '.jpeg', '.gif']:
            folder = "Images"
        elif ext in ['.csv', '.json', '.log']:
            folder = "Data"
        else:
            folder = "Other"
            
        dest_dir = os.path.join(base_dir, folder)
        os.makedirs(dest_dir, exist_ok=True)
        
        src_path = os.path.join(base_dir, f)
        dest_path = os.path.join(dest_dir, f)
        
        try:
            shutil.move(src_path, dest_path)
            print(f"Moved {f} -> {folder}/")
            counts[folder] += 1
        except Exception as e:
            print(f"Failed to move {f}: {e}")
            
    print("Summary:")
    for k, v in counts.items():
        print(f"  {k}: {v}")

if __name__ == "__main__":
    main()
```

## P10. Bank Account Simulator
```python
import json

class BankError(Exception):
    pass

class InsufficientFundsError(BankError):
    pass

class NegativeAmountError(BankError):
    pass

class AccountNotFoundError(BankError):
    pass

accounts = {}
next_id = 1

def load_accounts():
    global accounts, next_id
    try:
        with open("accounts.json", "r") as f:
            data = json.load(f)
            accounts = {int(k): v for k, v in data["accounts"].items()}
            next_id = data["next_id"]
    except (FileNotFoundError, json.JSONDecodeError):
        pass

def save_accounts():
    with open("accounts.json", "w") as f:
        json.dump({"accounts": accounts, "next_id": next_id}, f, indent=2)

def create_account(name):
    global next_id
    acc_id = next_id
    accounts[acc_id] = {"name": name, "balance": 0.0}
    next_id += 1
    save_accounts()
    return acc_id

def deposit(acc_id, amount):
    if acc_id not in accounts:
        raise AccountNotFoundError(f"Account {acc_id} not found")
    if amount <= 0:
        raise NegativeAmountError("Deposit amount must be positive")
    accounts[acc_id]["balance"] += amount
    save_accounts()

def withdraw(acc_id, amount):
    if acc_id not in accounts:
        raise AccountNotFoundError(f"Account {acc_id} not found")
    if amount <= 0:
        raise NegativeAmountError("Withdrawal amount must be positive")
    if accounts[acc_id]["balance"] < amount:
        raise InsufficientFundsError(f"Insufficient funds in account {acc_id} (balance {accounts[acc_id]['balance']:.2f})")
    accounts[acc_id]["balance"] -= amount
    save_accounts()

def transfer(from_id, to_id, amount):
    if from_id not in accounts:
        raise AccountNotFoundError(f"Source account {from_id} not found")
    if to_id not in accounts:
        raise AccountNotFoundError(f"Destination account {to_id} not found")
    if amount <= 0:
        raise NegativeAmountError("Transfer amount must be positive")
    if accounts[from_id]["balance"] < amount:
        raise InsufficientFundsError(f"Insufficient funds in account {from_id} (balance {accounts[from_id]['balance']:.2f})")
        
    accounts[from_id]["balance"] -= amount
    accounts[to_id]["balance"] += amount
    save_accounts()

def main():
    load_accounts()
    while True:
        print("1. Create Account  2. Deposit  3. Withdraw  4. Transfer  5. Balances  6. Exit")
        choice = input("Choice: ").strip()
        
        try:
            if choice == '1':
                name = input("Name: ")
                acc_id = create_account(name)
                print(f"Created account {acc_id}.")
            elif choice == '2':
                acc_id = int(input("Account: "))
                amt = float(input("Amount: "))
                deposit(acc_id, amt)
                print("Deposit successful.")
            elif choice == '3':
                acc_id = int(input("Account: "))
                amt = float(input("Amount: "))
                withdraw(acc_id, amt)
                print("Withdrawal successful.")
            elif choice == '4':
                from_id = int(input("From account: "))
                to_id = int(input("To account: "))
                amt = float(input("Amount: "))
                transfer(from_id, to_id, amt)
                print("Transfer successful.")
            elif choice == '5':
                for acc_id, data in accounts.items():
                    print(f"{acc_id}: {data['name']} - ${data['balance']:.2f}")
            elif choice == '6':
                break
        except BankError as e:
            print(f"Operation failed: {e}")
        except ValueError:
            print("Invalid number format.")

if __name__ == "__main__":
    main()
```
