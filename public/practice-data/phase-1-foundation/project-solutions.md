# Project Solutions

## P1. Calculator
```python
while True:
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")
    print("5. Exit")
    choice = input("Choose: ")
    
    if choice == '5':
        print("Goodbye!")
        break
        
    if choice not in ['1', '2', '3', '4']:
        print("Invalid choice!")
        continue
        
    num1 = float(input("First number: "))
    num2 = float(input("Second number: "))
    
    if choice == '1':
        print(f"Result: {num1 + num2:.2f}")
    elif choice == '2':
        print(f"Result: {num1 - num2:.2f}")
    elif choice == '3':
        print(f"Result: {num1 * num2:.2f}")
    elif choice == '4':
        if num2 == 0:
            print("Cannot divide by zero!")
        else:
            print(f"Result: {num1 / num2:.2f}")
```

## P2. Number Guessing Game
```python
import random

secret = random.randint(1, 100)
attempts = 0

while True:
    guess_str = input("Guess the number (1-100): ")
    if not guess_str.isdigit():
        print("Please enter a valid number.")
        continue
        
    guess = int(guess_str)
    if guess < 1 or guess > 100:
        print("Guess out of range! Please pick between 1 and 100.")
        continue
        
    attempts += 1
    if guess < secret:
        print("Too low!")
    elif guess > secret:
        print("Too high!")
    else:
        print(f"Correct! You took {attempts} attempts.")
        play_again = input("Play again? (y/n): ").lower()
        if play_again == 'y':
            secret = random.randint(1, 100)
            attempts = 0
        else:
            break
```

## P3. Simple Quiz App
```python
score = 0

print("Q1. What is 2 ** 10?")
print("   a) 20   b) 100   c) 1024   d) 512")
while True:
    ans = input("Your answer: ").lower()
    if ans in ['a', 'b', 'c', 'd']:
        if ans == 'c':
            print("Correct!")
            score += 1
        else:
            print("Wrong! The answer is c)")
        break

print("Q2. What is the output of 3 // 2?")
print("   a) 1.5   b) 1   c) 2   d) Error")
while True:
    ans = input("Your answer: ").lower()
    if ans in ['a', 'b', 'c', 'd']:
        if ans == 'b':
            print("Correct!")
            score += 1
        else:
            print("Wrong! The answer is b)")
        break

print("Q3. Which operator is used for string concatenation?")
print("   a) +   b) &   c) *   d) -")
while True:
    ans = input("Your answer: ").lower()
    if ans in ['a', 'b', 'c', 'd']:
        if ans == 'a':
            print("Correct!")
            score += 1
        else:
            print("Wrong! The answer is a)")
        break

print("Q4. How do you start a comment in Python?")
print("   a) //   b) /*   c) <!--   d) #")
while True:
    ans = input("Your answer: ").lower()
    if ans in ['a', 'b', 'c', 'd']:
        if ans == 'd':
            print("Correct!")
            score += 1
        else:
            print("Wrong! The answer is d)")
        break

print("Q5. Which function gets input from the user?")
print("   a) get()   b) read()   c) input()   d) ask()")
while True:
    ans = input("Your answer: ").lower()
    if ans in ['a', 'b', 'c', 'd']:
        if ans == 'c':
            print("Correct!")
            score += 1
        else:
            print("Wrong! The answer is c)")
        break

print(f"You scored {score}/5")
if score == 5:
    print("Verdict: Excellent")
elif score >= 3:
    print("Verdict: Good")
else:
    print("Verdict: Keep practicing")
```

## P4. Multiplication Table
```python
num_str = input("Enter a number: ")
num = int(num_str)

if num < 0 or num > 20:
    print("Please enter a positive number up to 20.")
else:
    limit_str = input("Print up to which number? (default 10): ")
    if limit_str == "":
        limit = 10
    else:
        limit = int(limit_str)
        
    print(f"Table of {num}:")
    print("-" * 15)
    for i in range(1, limit + 1):
        print(f"{num} x {i} = {num * i}")
```

## P5. FizzBuzz
```python
fizzbuzz_count = 0

for i in range(1, 101):
    if i % 15 == 0:
        print("FizzBuzz")
        fizzbuzz_count += 1
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)

print(f"FizzBuzz count: {fizzbuzz_count}")
```

## P6. ATM Simulator
```python
correct_pin = "1234"
balance = 1250.00
attempts = 3

while attempts > 0:
    pin = input("Enter PIN: ")
    if pin == correct_pin:
        break
    attempts -= 1
    if attempts > 0:
        print(f"Wrong PIN. Attempts left: {attempts}")

if attempts == 0:
    print("Card blocked.")
else:
    while True:
        print("1. Check Balance  2. Deposit  3. Withdraw  4. Exit")
        choice = input("Choice: ")
        
        if choice == '1':
            print(f"Balance: ${balance:,.2f}")
        elif choice == '2':
            amount = float(input("Amount: "))
            if amount > 0:
                balance += amount
                print(f"Deposited ${amount:,.2f}. Balance: ${balance:,.2f}")
            else:
                print("Invalid amount!")
        elif choice == '3':
            amount = float(input("Amount: "))
            if amount <= 0:
                print("Invalid amount!")
            elif amount > balance:
                print(f"Insufficient funds! Your balance is ${balance:,.2f}")
            else:
                balance -= amount
                print(f"Withdrew ${amount:,.2f}. Balance: ${balance:,.2f}")
        elif choice == '4':
            print("Thank you for using ATM!")
            break
        else:
            print("Invalid choice!")
```

## P7. Password Checker
```python
while True:
    password = input("Enter password: ")
    
    if len(password) < 8:
        print("Must be at least 8 characters")
        continue
        
    has_digit = False
    has_upper = False
    has_lower = False
    has_space = False
    
    for char in password:
        if char.isdigit():
            has_digit = True
        elif char.isupper():
            has_upper = True
        elif char.islower():
            has_lower = True
        elif char.isspace():
            has_space = True
            
    if has_space:
        print("Must not contain spaces")
        continue
    elif not has_digit:
        print("Must contain a digit")
        continue
    elif not has_upper:
        print("Must contain an uppercase letter")
        continue
    elif not has_lower:
        print("Must contain a lowercase letter")
        continue
        
    print("Password set successfully.")
    break
```
