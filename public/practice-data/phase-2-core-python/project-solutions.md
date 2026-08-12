# Project Solutions

## P1. Contact Book
```python
contacts = {}

while True:
    print("1. Add  2. Search  3. List All  4. Delete  5. Exit")
    choice = input("Choice: ")
    
    if choice == '1':
        name = input("Name: ").strip()
        phone = input("Phone: ").strip()
        if phone.isdigit():
            contacts[name] = phone
            print(f"Added {name} -> {phone}")
        else:
            print("Phone number must contain only digits.")
            
    elif choice == '2':
        name = input("Name: ").strip()
        if name in contacts:
            print(f"{name}: {contacts[name]}")
        else:
            print(f"No contact found for \"{name}\"")
            
    elif choice == '3':
        for name in sorted(contacts.keys()):
            print(f"{name}: {contacts[name]}")
            
    elif choice == '4':
        name = input("Name: ").strip()
        if name in contacts:
            del contacts[name]
            print(f"Deleted {name}.")
        else:
            print(f"No contact found for \"{name}\"")
            
    elif choice == '5':
        print("Bye!")
        break
        
    else:
        print("Invalid choice.")
```

## P2. Quiz App
```python
questions = [
    {"q": "Which data structure is mutable and ordered?", "options": ["tuple", "list", "set", "dict"], "answer": "b"},
    {"q": "Which structure stores key-value pairs?", "options": ["tuple", "list", "set", "dict"], "answer": "d"},
    {"q": "Which of these removes duplicates automatically?", "options": ["tuple", "list", "set", "dict"], "answer": "c"},
    {"q": "Which structure is immutable?", "options": ["tuple", "list", "set", "dict"], "answer": "a"}
]

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
        print("Correct!")
        score += 1
    else:
        print(f"Wrong! The correct answer was {q['answer']})")

print(f"You scored {score}/{len(questions)}")
pct = score / len(questions)
if pct >= 0.8:
    print("Verdict: Excellent")
elif pct >= 0.5:
    print("Verdict: Good")
else:
    print("Verdict: Keep practicing")
```

## P3. Word Counter
```python
while True:
    sentence = input("Enter a sentence: ")
    if not sentence.strip():
        print("No words to count.")
        continue
        
    words = sentence.split()
    counts = {}
    
    for word in words:
        clean_word = word.strip(".,!?").lower()
        if clean_word:
            counts[clean_word] = counts.get(clean_word, 0) + 1
            
    if not counts:
        print("No words to count.")
        continue
        
    sorted_words = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))
    for word, count in sorted_words:
        print(f"{word} -> {count}")
        
    again = input("Count another sentence? (y/n): ").lower()
    if again != 'y':
        break
```

## P4. Palindrome Checker
```python
while True:
    phrase = input("Enter a phrase: ")
    if phrase.lower() == 'quit':
        break
        
    clean_phrase = "".join(ch for ch in phrase if ch.isalpha()).lower()
    
    if not clean_phrase:
        print("Nothing to check.")
    elif clean_phrase == clean_phrase[::-1]:
        print(f"\"{clean_phrase}\" is a palindrome.")
    else:
        print(f"\"{clean_phrase}\" is not a palindrome.")
```

## P5. To-Do List
```python
tasks = []
done = []

while True:
    print("1. Add  2. List  3. Mark Done  4. Remove  5. Exit")
    choice = input("Choice: ").strip()
    
    if choice == '1':
        task = input("Task: ").strip()
        if not task:
            print("Task cannot be empty.")
        else:
            tasks.append(task)
            done.append(False)
            print(f"Added: {task}")
            
    elif choice == '2':
        if not tasks:
            print("No tasks.")
        for i, task in enumerate(tasks, 1):
            status = "x" if done[i-1] else " "
            print(f"{i}. [{status}] {task}")
            
    elif choice == '3':
        num_str = input("Task number: ").strip()
        if num_str.isdigit():
            idx = int(num_str) - 1
            if 0 <= idx < len(tasks):
                done[idx] = True
                print(f"Task {idx+1} marked as done.")
            else:
                print("Invalid task number.")
        else:
            print("Please enter a number.")
            
    elif choice == '4':
        num_str = input("Task number: ").strip()
        if num_str.isdigit():
            idx = int(num_str) - 1
            if 0 <= idx < len(tasks):
                removed = tasks.pop(idx)
                done.pop(idx)
                print(f"Removed: {removed}")
            else:
                print("Invalid task number.")
        else:
            print("Please enter a number.")
            
    elif choice == '5':
        break
    else:
        print("Invalid choice.")
```

## P6. Duplicate Remover
```python
line = input("Enter numbers: ")
parts = line.split()
unique = []
seen = set()
duplicates = 0

for p in parts:
    if p.isdigit() or (p.startswith('-') and p[1:].isdigit()):
        num = int(p)
        if num not in seen:
            unique.append(num)
            seen.add(num)
        else:
            duplicates += 1

if not unique:
    print("Nothing to deduplicate.")
else:
    print(f"Unique numbers: {' '.join(str(n) for n in unique)}")
    print(f"Sorted: {' '.join(str(n) for n in sorted(unique))}")
    print(f"Removed {duplicates} duplicates.")
```

## P7. Inventory System
```python
inventory = {}

while True:
    print("1. Add Item  2. Restock  3. Sell  4. Low Stock Report  5. Total Value  6. Exit")
    choice = input("Choice: ").strip()
    
    if choice == '1':
        name = input("Item: ").strip()
        if name in inventory:
            print(f"Warning: {name} already exists. Overwriting.")
        price = float(input("Price: "))
        stock = int(input("Stock: "))
        if price > 0 and stock >= 0:
            inventory[name] = {"price": price, "stock": stock}
            print(f"Added {name} at ${price:.2f} x {stock}")
        else:
            print("Price and stock must be non-negative.")
            
    elif choice == '2':
        name = input("Item: ").strip()
        if name in inventory:
            amount = int(input("Amount to add: "))
            if amount > 0:
                inventory[name]["stock"] += amount
                print(f"Restocked {name}. New stock: {inventory[name]['stock']}")
            else:
                print("Amount must be positive.")
        else:
            print("Item not found.")
            
    elif choice == '3':
        name = input("Item: ").strip()
        if name in inventory:
            amount = int(input("Amount to sell: "))
            if amount <= 0:
                print("Amount must be positive.")
            elif amount > inventory[name]["stock"]:
                print(f"Not enough stock for \"{name}\" ({inventory[name]['stock']} in stock).")
            else:
                inventory[name]["stock"] -= amount
                print(f"Sold {amount} {name}. Remaining stock: {inventory[name]['stock']}")
        else:
            print("Item not found.")
            
    elif choice == '4':
        low = False
        for name, data in inventory.items():
            if data["stock"] < 5:
                print(f"LOW STOCK: {name} ({data['stock']})")
                low = True
        if not low:
            print("All items are well stocked.")
            
    elif choice == '5':
        total = sum(data["price"] * data["stock"] for data in inventory.values())
        print(f"Total Value: ${total:,.2f}")
        
    elif choice == '6':
        break
```

## P8. Number Frequency Counter
```python
counts = {}
distinct = 0

while True:
    val = input("Enter numbers (type 'done' to finish): ").strip()
    if val.lower() == 'done':
        break
        
    if val.isdigit() or (val.startswith('-') and val[1:].isdigit()):
        num = int(val)
        if num not in counts:
            distinct += 1
        counts[num] = counts.get(num, 0) + 1
    else:
        print("Invalid number. Session ended.")
        break

if counts:
    sorted_items = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))
    for num, count in sorted_items:
        print(f"{num}: {count}")
        
    print(f"{distinct} distinct numbers")
    mode = sorted_items[0][0]
    print(f"Mode: {mode}")
else:
    print("No numbers entered.")
```
