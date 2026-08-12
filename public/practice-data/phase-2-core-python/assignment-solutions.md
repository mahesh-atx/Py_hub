# Assignment Solutions

## A5. Text Analysis Engine
```python
text = input("Paste your paragraph: ")
if not text.strip():
    text = "The quick brown fox jumps over the lazy dog. The dog is lazy, but the fox is quick!"

char_count = len(text)
char_no_spaces = len(text.replace(" ", ""))
paragraphs = len([p for p in text.split("\n\n") if p.strip()])
sentences = text.count(".") + text.count("!") + text.count("?")

words = text.split()
print(f"Characters (with spaces): {char_count}")
print(f"Characters (no spaces): {char_no_spaces}")
print(f"Words: {len(words)}")
print(f"Sentences: {sentences}")
print(f"Paragraphs: {paragraphs}")

clean_words = []
for w in words:
    clean = "".join(c for c in w if c.isalpha()).lower()
    if clean:
        clean_words.append(clean)
        
print(f"Words after cleaning: {len(clean_words)}")

freq = {}
for w in clean_words:
    freq[w] = freq.get(w, 0) + 1
    
top10 = sorted(freq.items(), key=lambda kv: (-kv[1], kv[0]))[:10]
print("\nTop 10 words:")
for w, c in top10: print(f"{w}: {c}")

stopwords = {"the", "a", "an", "is", "of", "and", "to", "in", "for", "on", "with", "that", "it", "as", "but"}
filtered = [w for w in clean_words if w not in stopwords]
freq_filtered = {}
for w in filtered: freq_filtered[w] = freq_filtered.get(w, 0) + 1
top10_filtered = sorted(freq_filtered.items(), key=lambda kv: (-kv[1], kv[0]))[:10]
print("\nTop 10 (no stopwords):")
for w, c in top10_filtered: print(f"{w}: {c}")

vowels = sum(1 for c in text.lower() if c in 'aeiou')
consonants = sum(1 for c in text.lower() if c.isalpha() and c not in 'aeiou')
digits = sum(1 for c in text if c.isdigit())
spaces = text.count(" ")
print(f"\nVowels: {vowels}, Consonants: {consonants}, Digits: {digits}, Spaces: {spaces}")

letter_freq = {}
for c in text.lower():
    if c.isalpha():
        letter_freq[c] = letter_freq.get(c, 0) + 1

if letter_freq:
    max_count = max(letter_freq.values())
    print("\nLetter Distribution:")
    for char in sorted(letter_freq.keys()):
        bars = int((letter_freq[char] / max_count) * 40)
        print(f"{char}: {'#' * bars}")

lengths = {}
for w in clean_words:
    lengths[len(w)] = lengths.get(len(w), 0) + 1
print("\nWord Lengths:")
for L in sorted(lengths.keys()):
    print(f"{L} letters: {lengths[L]}")

palindromes = {w for w in clean_words if len(w) >= 3 and w == w[::-1]}
print(f"\nPalindromes: {palindromes}")

clean_text = "".join(c for c in text.lower() if c.isalpha())
if clean_text == clean_text[::-1]:
    print("The entire paragraph is a palindrome!")

if len(clean_words) > 0 and sentences > 0:
    print(f"\nAvg word length: {sum(len(w) for w in clean_words) / len(clean_words):.2f}")
    print(f"Avg words per sentence: {len(clean_words) / sentences:.2f}")

hapax = [w for w, c in freq.items() if c == 1]
print(f"\nHapax legomena (total {len(hapax)}): {hapax[:10]}")
```

## A6. Sorting and Searching Laboratory
```python
data = [(i * 37) % 200 for i in range(200)]
sorted_builtin = sorted(data)

def bubble_sort(arr):
    a = list(arr)
    comps = 0
    swaps = 0
    n = len(a)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            comps += 1
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]
                swaps += 1
                swapped = True
        if not swapped:
            break
    return a, comps, swaps

def selection_sort(arr):
    a = list(arr)
    comps = 0
    swaps = 0
    n = len(a)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            comps += 1
            if a[j] < a[min_idx]:
                min_idx = j
        if min_idx != i:
            a[i], a[min_idx] = a[min_idx], a[i]
            swaps += 1
    return a, comps, swaps

def insertion_sort(arr):
    a = list(arr)
    comps = 0
    swaps = 0
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0:
            comps += 1
            if a[j] > key:
                a[j+1] = a[j]
                swaps += 1
                j -= 1
            else:
                break
        a[j+1] = key
    return a, comps, swaps

def merge_sort_count(arr):
    if len(arr) <= 1:
        return arr, 0
    mid = len(arr) // 2
    left, c_l = merge_sort_count(arr[:mid])
    right, c_r = merge_sort_count(arr[mid:])
    
    merged = []
    comps = c_l + c_r
    i = j = 0
    while i < len(left) and j < len(right):
        comps += 1
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged, comps

bub_arr, bub_c, bub_s = bubble_sort(data)
sel_arr, sel_c, sel_s = selection_sort(data)
ins_arr, ins_c, ins_s = insertion_sort(data)
mrg_arr, mrg_c = merge_sort_count(data)

print(f"Bubble sort matches: {bub_arr == sorted_builtin}")
print(f"Selection sort matches: {sel_arr == sorted_builtin}")
print(f"Insertion sort matches: {ins_arr == sorted_builtin}")
print(f"Merge sort matches: {mrg_arr == sorted_builtin}")

print("\nOperations:")
print(f"Bubble:    Comps={bub_c}, Swaps={bub_s}")
print(f"Selection: Comps={sel_c}, Swaps={sel_s}")
print(f"Insertion: Comps={ins_c}, Swaps={ins_s}")
print(f"Merge:     Comps={mrg_c}")

def linear_search(arr, target):
    comps = 0
    for i, val in enumerate(arr):
        comps += 1
        if val == target:
            return i, comps
    return -1, comps

def binary_search(arr, target):
    comps = 0
    low, high = 0, len(arr) - 1
    while low <= high:
        comps += 1
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid, comps
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1, comps

target = sorted_builtin[150]
l_idx, l_comps = linear_search(sorted_builtin, target)
b_idx, b_comps = binary_search(sorted_builtin, target)
print(f"\nLinear Search: index {l_idx} in {l_comps} comps")
print(f"Binary Search: index {b_idx} in {b_comps} comps")

idx, comps = binary_search(data, target)
print(f"Binary Search on unsorted: returned {idx} (incorrect without erroring)")
```

## A7. Student Grade Management System
```python
students = {}

while True:
    print("\n1. Add  2. View One  3. View All  4. Update Mark  5. Delete  6. Stats  7. Exit")
    choice = input("Choice: ")
    
    if choice == '7':
        break
        
    elif choice == '1':
        name = input("Name: ")
        if name in students:
            print("Student already exists.")
            continue
        marks = {}
        for sub in ["Math", "Sci", "Eng", "Hist", "Geo"]:
            while True:
                try:
                    m = float(input(f"{sub}: "))
                    if 0 <= m <= 100:
                        marks[sub] = m
                        break
                except:
                    pass
        pct = sum(marks.values()) / 5
        if pct >= 90: grade = 'A'
        elif pct >= 75: grade = 'B'
        elif pct >= 60: grade = 'C'
        elif pct >= 40: grade = 'D'
        else: grade = 'F'
        
        students[name] = {"marks": marks, "percentage": pct, "grade": grade}
        print("Added.")
        
    elif choice == '2':
        q = input("Search Name: ").lower()
        matches = {n: d for n, d in students.items() if q in n.lower()}
        if matches:
            for n, d in matches.items():
                print(f"{n}: {d['percentage']}% ({d['grade']}) - {d['marks']}")
        else:
            print("Not found.")
            
    elif choice == '3':
        if not students:
            print("Database empty.")
            continue
        sorted_st = sorted(students.items(), key=lambda kv: (-kv[1]['percentage'], kv[0]))
        print(f"{'Rank':<5} {'Name':<15} {'Total':>5} {'Pct':>7} {'Grade':>5}")
        for rank, (n, d) in enumerate(sorted_st, 1):
            total = sum(d['marks'].values())
            print(f"{rank:<5} {n:<15} {total:>5.1f} {d['percentage']:>7.2f} {d['grade']:>5}")
            
    elif choice == '4':
        name = input("Exact Name: ")
        if name in students:
            sub = input("Subject: ")
            if sub in students[name]['marks']:
                old_pct = students[name]['percentage']
                new_m = float(input("New mark: "))
                students[name]['marks'][sub] = new_m
                
                pct = sum(students[name]['marks'].values()) / 5
                if pct >= 90: grade = 'A'
                elif pct >= 75: grade = 'B'
                elif pct >= 60: grade = 'C'
                elif pct >= 40: grade = 'D'
                else: grade = 'F'
                
                students[name]['percentage'] = pct
                students[name]['grade'] = grade
                print(f"Updated. Pct: {old_pct:.2f}% -> {pct:.2f}%")
            else:
                print("Invalid subject.")
        else:
            print("Not found.")
            
    elif choice == '5':
        name = input("Exact Name: ")
        if name in students:
            if input(f"Confirm delete {name}? (y/n): ") == 'y':
                del students[name]
                print("Deleted.")
        else:
            print("Not found.")
            
    elif choice == '6':
        if not students:
            print("Database empty.")
            continue
        total_pct = sum(d['percentage'] for d in students.values())
        print(f"Class Average: {total_pct / len(students):.2f}%")
        
        sorted_st = sorted(students.items(), key=lambda kv: kv[1]['percentage'])
        print(f"Topper: {sorted_st[-1][0]} ({sorted_st[-1][1]['percentage']}%)")
        print(f"Lowest: {sorted_st[0][0]} ({sorted_st[0][1]['percentage']}%)")
        
        passes = sum(1 for d in students.values() if all(m >= 40 for m in d['marks'].values()))
        print(f"Pass: {passes}, Fail: {len(students) - passes}")
```

## A8. Contact Book with Search
```python
contacts = {}

while True:
    print("\n1. Add  2. Search Name  3. Search Tag  4. Tag Ops  5. Exit")
    choice = input("Choice: ")
    
    if choice == '5': break
        
    if choice == '1':
        name = input("Name: ")
        if name in contacts:
            print("Duplicate name.")
            continue
            
        phone = input("Phone: ").replace("+91", "").replace("-", "").replace(" ", "")
        if len(phone) != 10 or not phone.isdigit():
            print("Invalid phone.")
            continue
            
        email = input("Email: ")
        if "@" not in email or "." not in email.split("@")[-1]:
            print("Invalid email.")
            continue
            
        city = input("City: ")
        tags = set(input("Tags (comma separated): ").split(","))
        tags = {t.strip().lower() for t in tags if t.strip()}
        
        contacts[name] = {"phone": phone, "email": email, "city": city, "tags": tags}
        print("Added.")
        
    elif choice == '2':
        q = input("Search: ").lower()
        matches = {n: d for n, d in contacts.items() if q in n.lower()}
        print(f"{len(matches)} matches.")
        for n, d in matches.items():
            print(f"{n} - {d['phone']} - {d['tags']}")
            
    elif choice == '3':
        t = input("Tag: ").lower()
        matches = [n for n, d in contacts.items() if t in d['tags']]
        print(f"Found {len(matches)}: {matches}")
        
    elif choice == '4':
        t1 = input("Tag 1: ").lower()
        t2 = input("Tag 2: ").lower()
        
        s1 = {n for n, d in contacts.items() if t1 in d['tags']}
        s2 = {n for n, d in contacts.items() if t2 in d['tags']}
        
        print(f"Intersection (both): {s1 & s2}")
        print(f"Union (either): {s1 | s2}")
        print(f"Difference (T1 not T2): {s1 - s2}")
```

## A9. Data Structure Conversion Toolkit
```python
lol = [
    [1, "Alice", "Sales", 50000],
    [2, "Bob", "Engineering", 70000],
    [3, "Charlie", "Sales", 55000]
]

lot = [tuple(row) for row in lol]
lod = [{"id": r[0], "name": r[1], "dept": r[2], "salary": r[3]} for r in lol]
dod = {r[0]: {"name": r[1], "dept": r[2], "salary": r[3]} for r in lol}
dol = {
    "ids": [r[0] for r in lol],
    "names": [r[1] for r in lol],
    "depts": [r[2] for r in lol],
    "salaries": [r[3] for r in lol]
}

print("List of dicts back to list of lists:")
lol_recovered = [[d["id"], d["name"], d["dept"], d["salary"]] for d in lod]
print(lol_recovered == lol)

print("\nDeduplication tests:")
duplicates = [1, 2, 2, 3, 1, 4]
print(f"Original: {duplicates}")
print(f"Set (loses order): {list(set(duplicates))}")

seen = set()
ordered = []
for x in duplicates:
    if x not in seen:
        ordered.append(x)
        seen.add(x)
print(f"Loop seen-check: {ordered}")
print(f"Dict fromkeys: {list(dict.fromkeys(duplicates))}")

print("\nDictionary inversion:")
original = {"a": 1, "b": 2, "c": 1}
naive = {v: k for k, v in original.items()}
print(f"Naive swap (loses 'a'): {naive}")

safe = {}
for k, v in original.items():
    safe.setdefault(v, []).append(k)
print(f"Safe inversion: {safe}")

print("\nFrozenset as key:")
try:
    d = {set(["python", "sql"]): "Data Engineer"}
except TypeError as e:
    print(f"TypeError on set key: {e}")
    
d_safe = {frozenset(["python", "sql"]): "Data Engineer"}
print(f"Frozenset lookup: {d_safe[frozenset(['sql', 'python'])]}")
```
