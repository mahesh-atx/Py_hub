# Assignment Solutions

## A1. Personal Finance Calculator
```python
income = float(input("Monthly income: "))
expenses = float(input("Monthly expenses: "))
savings = float(input("Existing savings: "))
goal = float(input("Savings goal: "))

if income < 0 or expenses < 0:
    print("Income and expenses cannot be negative.")
elif goal <= 0:
    print("Savings goal must be greater than zero.")
else:
    surplus = income - expenses
    annual_surplus = surplus * 12
    savings_rate = (surplus / income) * 100 if income > 0 else 0
    
    print(f"Monthly surplus: ₹{surplus:,.2f}")
    print(f"Annual surplus: ₹{annual_surplus:,.2f}")
    print(f"Savings rate: {savings_rate:.1f}%")
    
    if surplus > 0:
        months_to_goal = (goal - savings) / surplus
        if months_to_goal < 0:
            months_to_goal = 0
        print(f"Months to reach goal: {months_to_goal:.1f}")
    else:
        print("Deficit warning: Expenses exceed or equal income, goal unreachable.")
        
    rate = float(input("Annual interest rate (%): "))
    for years in [1, 3, 5, 10]:
        amount = savings * (1 + rate / 100) ** years
        print(f"Balance after {years} years: ₹{amount:,.2f}")
        
    annual_income = income * 12
    tax = 0
    if annual_income > 1000000:
        tax += (annual_income - 1000000) * 0.30
        tax += 500000 * 0.20
        tax += 250000 * 0.05
    elif annual_income > 500000:
        tax += (annual_income - 500000) * 0.20
        tax += 250000 * 0.05
    elif annual_income > 250000:
        tax += (annual_income - 250000) * 0.05
        
    print(f"Estimated annual tax: ₹{tax:,.2f}")
    
    if surplus < 0:
        print("Verdict: Deficit")
    elif savings_rate > 30:
        print("Verdict: Excellent")
    elif savings_rate >= 20:
        print("Verdict: Good")
    elif savings_rate >= 10:
        print("Verdict: Needs improvement")
    else:
        print("Verdict: At risk")
```

## A2. Number Theory Explorer
```python
calculations = 0

while True:
    print("\n--- Menu ---")
    print("1. Prime check")
    print("2. All factors")
    print("3. Prime factorisation")
    print("4. Factorial")
    print("5. Digit stats")
    print("6. Armstrong check")
    print("7. Perfect number check")
    print("8. Collatz sequence")
    print("9. Range mode (Primes)")
    print("10. Exit")
    
    choice = input("Choice: ")
    if choice == '10':
        break
        
    if choice not in list("123456789"):
        print("Invalid choice.")
        continue
        
    if choice == '9':
        start = int(input("Start: "))
        end = int(input("End: "))
        count = 0
        for num in range(start, end + 1):
            if num > 1:
                is_prime = True
                i = 2
                while i * i <= num:
                    if num % i == 0:
                        is_prime = False
                        break
                    i += 1
                if is_prime:
                    print(num, end=" ")
                    count += 1
        print(f"\nFound {count} primes.")
        calculations += 1
        continue
        
    n = int(input("Enter a number: "))
    
    if choice == '1':
        if n <= 1:
            print("Not prime (1 is neither prime nor composite, <=0 are not prime).")
        else:
            is_prime = True
            i = 2
            while i * i <= n:
                if n % i == 0:
                    is_prime = False
                    break
                i += 1
            print(f"{n} is {'prime' if is_prime else 'not prime'}.")
            
    elif choice == '2':
        if n <= 0:
            print("Factors are usually defined for positive integers.")
        else:
            count = 0
            for i in range(1, n + 1):
                if n % i == 0:
                    print(i, end=" ")
                    count += 1
            print(f"\n{count} factors.")
            
    elif choice == '3':
        if n <= 1:
            print("No prime factorisation for numbers <= 1.")
        else:
            temp = n
            i = 2
            first = True
            while i * i <= temp:
                while temp % i == 0:
                    if not first:
                        print(" × ", end="")
                    print(i, end="")
                    first = False
                    temp //= i
                i += 1
            if temp > 1:
                if not first:
                    print(" × ", end="")
                print(temp)
            else:
                print()
                
    elif choice == '4':
        if n < 0:
            print("Factorial of negative is undefined.")
        else:
            fact = 1
            for i in range(1, n + 1):
                fact *= i
            print(f"{n}! = {fact}")
            
    elif choice == '5':
        temp = abs(n)
        count = 0
        total = 0
        rev = 0
        if temp == 0:
            count = 1
        while temp > 0:
            digit = temp % 10
            count += 1
            total += digit
            rev = rev * 10 + digit
            temp //= 10
        if n < 0: rev = -rev
        print(f"Digits: {count}, Sum: {total}, Reversed: {rev}")
        
    elif choice == '6':
        if n < 0:
            print("Negative numbers are not Armstrong.")
        else:
            temp = n
            digits = 0
            while temp > 0:
                digits += 1
                temp //= 10
            if n == 0: digits = 1
            
            temp = n
            total = 0
            while temp > 0:
                total += (temp % 10) ** digits
                temp //= 10
            print(f"{n} is {'an Armstrong' if total == n else 'not an Armstrong'} number.")
            
    elif choice == '7':
        if n <= 0:
            print("Not a perfect number.")
        else:
            total = 0
            for i in range(1, n):
                if n % i == 0:
                    total += i
            print(f"{n} is {'perfect' if total == n else 'not perfect'}.")
            
    elif choice == '8':
        if n <= 0:
            print("Collatz sequence requires positive integers.")
        else:
            steps = 0
            temp = n
            while temp != 1:
                if temp % 2 == 0:
                    temp //= 2
                else:
                    temp = temp * 3 + 1
                steps += 1
            print(f"Collatz sequence for {n} took {steps} steps.")
            
    calculations += 1

print(f"Total calculations performed: {calculations}")
```

## A3. Pattern Printing Portfolio
```python
while True:
    print("\n1. Right triangle      2. Inverted right      3. Left-aligned")
    print("4. Centred pyramid     5. Inverted pyramid    6. Diamond")
    print("7. Hollow square       8. Hollow triangle     9. Number triangle")
    print("10. Floyd's triangle   11. Pascal's triangle  12. Multi grid")
    print("13. Print all          14. Exit")
    
    choice = int(input("Choice: "))
    if choice == 14:
        break
        
    n = int(input("Size n: "))
    
    patterns_to_run = [choice] if choice != 13 else range(1, 13)
    
    for pat in patterns_to_run:
        print(f"\n--- Pattern {pat} ---")
        
        if pat == 1:
            for i in range(1, n + 1):
                print("*" * i)
                
        elif pat == 2:
            for i in range(n, 0, -1):
                print("*" * i)
                
        elif pat == 3:
            for i in range(1, n + 1):
                print(" " * (n - i) + "*" * i)
                
        elif pat == 4:
            for i in range(1, n + 1):
                print(" " * (n - i) + "*" * (2 * i - 1))
                
        elif pat == 5:
            for i in range(n, 0, -1):
                print(" " * (n - i) + "*" * (2 * i - 1))
                
        elif pat == 6:
            for i in range(1, n + 1):
                print(" " * (n - i) + "*" * (2 * i - 1))
            for i in range(n - 1, 0, -1):
                print(" " * (n - i) + "*" * (2 * i - 1))
                
        elif pat == 7:
            for i in range(n):
                if i == 0 or i == n - 1:
                    print("*" * n)
                else:
                    if n > 1:
                        print("*" + " " * (n - 2) + "*")
                    else:
                        print("*")
                        
        elif pat == 8:
            for i in range(1, n + 1):
                if i == 1:
                    print("*" * i)
                elif i == n:
                    print("*" * n)
                else:
                    print("*" + " " * (i - 2) + "*")
                    
        elif pat == 9:
            for i in range(1, n + 1):
                for j in range(1, i + 1):
                    print(j, end=" ")
                print()
                
        elif pat == 10:
            num = 1
            for i in range(1, n + 1):
                for j in range(1, i + 1):
                    print(f"{num:>3}", end=" ")
                    num += 1
                print()
                
        elif pat == 11:
            for row in range(n):
                print(" " * (n - row), end="")
                val = 1
                for col in range(row + 1):
                    print(f"{val:>3}", end=" ")
                    val = val * (row - col) // (col + 1)
                print()
                
        elif pat == 12:
            for i in range(1, n + 1):
                for j in range(1, n + 1):
                    print(f"{i * j:>4}", end=" ")
                print()
```

## A4. ATM Simulator
```python
pin = "1234"
attempts = 3
balance = 10000.0

txn1_type, txn1_amount = "", 0.0
txn2_type, txn2_amount = "", 0.0
txn3_type, txn3_amount = "", 0.0

total_txns = 0
total_deposited = 0.0
total_withdrawn = 0.0

while attempts > 0:
    entered = input("Enter PIN: ")
    if entered == pin:
        break
    attempts -= 1
    if attempts > 0:
        print(f"Wrong PIN. {attempts} attempts remaining.")
        
if attempts == 0:
    print("Locked out. Exiting.")
else:
    while True:
        print("\n1. Check Balance  2. Deposit  3. Withdraw")
        print("4. Change PIN     5. Mini Statement  6. Exit")
        choice = input("Choice: ")
        
        if choice == '1':
            print(f"Balance: ₹{balance:,.2f}")
            
        elif choice == '2':
            amount = float(input("Deposit amount: "))
            if amount <= 0:
                print("Amount must be positive.")
            elif amount % 100 != 0:
                print("Amount must be a multiple of 100.")
            elif amount > 50000:
                print("Single deposit capped at ₹50,000.")
            else:
                balance += amount
                total_deposited += amount
                total_txns += 1
                
                txn3_type, txn3_amount = txn2_type, txn2_amount
                txn2_type, txn2_amount = txn1_type, txn1_amount
                txn1_type, txn1_amount = "Deposit", amount
                
                print(f"Deposited ₹{amount:,.2f}. New Balance: ₹{balance:,.2f}")
                
        elif choice == '3':
            amount = float(input("Withdraw amount: "))
            if amount <= 0:
                print("Amount must be positive.")
            elif amount % 100 != 0:
                print("Amount must be a multiple of 100.")
            elif amount > 20000:
                print("Single withdrawal capped at ₹20,000.")
            elif amount > balance:
                print("Insufficient balance.")
            elif balance - amount < 500:
                print("Must leave a minimum balance of ₹500.")
            else:
                balance -= amount
                total_withdrawn += amount
                total_txns += 1
                
                txn3_type, txn3_amount = txn2_type, txn2_amount
                txn2_type, txn2_amount = txn1_type, txn1_amount
                txn1_type, txn1_amount = "Withdraw", amount
                
                print(f"Withdrawn ₹{amount:,.2f}. New Balance: ₹{balance:,.2f}")
                
        elif choice == '4':
            old = input("Old PIN: ")
            if old != pin:
                print("Incorrect old PIN.")
            else:
                new1 = input("New PIN: ")
                new2 = input("Confirm new PIN: ")
                if new1 != new2:
                    print("PINs do not match.")
                elif len(new1) != 4 or not new1.isdigit():
                    print("PIN must be exactly 4 digits.")
                elif new1 == pin:
                    print("New PIN cannot be the same as old PIN.")
                else:
                    pin = new1
                    print("PIN changed successfully.")
                    
        elif choice == '5':
            print("\nMini Statement (Last 3):")
            if txn1_type: print(f"1. {txn1_type}: ₹{txn1_amount:,.2f}")
            if txn2_type: print(f"2. {txn2_type}: ₹{txn2_amount:,.2f}")
            if txn3_type: print(f"3. {txn3_type}: ₹{txn3_amount:,.2f}")
            if not txn1_type: print("No transactions yet.")
            print(f"Current Balance: ₹{balance:,.2f}")
            
        elif choice == '6':
            print("\n--- Summary ---")
            print(f"Total transactions: {total_txns}")
            print(f"Total deposited: ₹{total_deposited:,.2f}")
            print(f"Total withdrawn: ₹{total_withdrawn:,.2f}")
            print(f"Closing balance: ₹{balance:,.2f}")
            break
        else:
            print("Invalid choice.")
```

## A5. Student Report Card System
```python
num_students = int(input("How many students? "))

class_total_pct = 0.0
topper_name = ""
topper_pct = -1.0
lowest_name = ""
lowest_pct = 101.0
pass_count = 0
fail_count = 0

print(f"{'Name':<15} {'Total':>5} {'Percent':>8} {'Grade':>5} {'Result':>6}")
print("-" * 42)

for _ in range(num_students):
    name = input("Name: ")
    
    m1, m2, m3, m4, m5 = -1, -1, -1, -1, -1
    
    while m1 < 0 or m1 > 100:
        m1 = float(input("Subject 1: "))
    while m2 < 0 or m2 > 100:
        m2 = float(input("Subject 2: "))
    while m3 < 0 or m3 > 100:
        m3 = float(input("Subject 3: "))
    while m4 < 0 or m4 > 100:
        m4 = float(input("Subject 4: "))
    while m5 < 0 or m5 > 100:
        m5 = float(input("Subject 5: "))
        
    total = m1 + m2 + m3 + m4 + m5
    pct = total / 5
    
    highest = m1
    if m2 > highest: highest = m2
    if m3 > highest: highest = m3
    if m4 > highest: highest = m4
    if m5 > highest: highest = m5
    
    lowest = m1
    if m2 < lowest: lowest = m2
    if m3 < lowest: lowest = m3
    if m4 < lowest: lowest = m4
    if m5 < lowest: lowest = m5
    
    if pct >= 90: grade = 'A'
    elif pct >= 75: grade = 'B'
    elif pct >= 60: grade = 'C'
    elif pct >= 40: grade = 'D'
    else: grade = 'F'
    
    if m1 >= 40 and m2 >= 40 and m3 >= 40 and m4 >= 40 and m5 >= 40:
        result = "PASS"
        pass_count += 1
    else:
        result = "FAIL"
        fail_count += 1
        
    print(f"{name:<15} {int(total):>5} {pct:>8.2f} {grade:>5} {result:>6}")
    
    class_total_pct += pct
    if pct > topper_pct:
        topper_pct = pct
        topper_name = name
    if pct < lowest_pct:
        lowest_pct = pct
        lowest_name = name

print("\n--- Final Summary ---")
if num_students > 0:
    class_avg = class_total_pct / num_students
    pass_pct = (pass_count / num_students) * 100
    print(f"Class average: {class_avg:.2f}%")
    print(f"Topper: {topper_name} ({topper_pct:.2f}%)")
    print(f"Lowest scorer: {lowest_name} ({lowest_pct:.2f}%)")
    print(f"Passed: {pass_count}")
    print(f"Failed: {fail_count}")
    print(f"Pass percentage: {pass_pct:.1f}%")
else:
    print("No students processed.")
```
