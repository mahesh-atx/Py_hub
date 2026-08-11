#!/usr/bin/env python3
"""Generates hidden-tests.json for Batch 2."""
import json
import os

Q = {}

def add(qid, parse, solve, tests, inp=None):
    if inp is None:
        def inp(args):
            return "\n".join(str(x) for x in args) + "\n"
    Q[qid] = {"parse": parse, "solve": solve, "tests": tests, "inp": inp}

def conv(args, parse):
    out = []
    for a, t in zip(args, parse):
        if t == "int":
            out.append(int(a))
        elif t == "float":
            out.append(float(a))
        else:
            out.append(str(a))
    return out

# ---- Q101..Q200 ----
add(101, ["int"], lambda a: "Even" if a[0]%2==0 else "Odd",
    [[8],[3],[1],[10**6],[7],[2]])
add(102, ["int"], lambda a: "Positive" if a[0]>0 else "Non-positive",
    [[-3],[0],[10**6],[-10**6],[5]])
add(103, ["int"], lambda a: str(-a[0] if a[0]<0 else a[0]),
    [[-15],[0],[10**9],[-10**9],[42]])
add(104, ["int","int"], lambda a: str(a[0] if a[0]>=a[1] else a[1]),
    [[12,7],[3,3],[-5,2],[10**9,-10**9],[-7,-2]])
add(105, ["int","int"], lambda a: str(a[0] if a[0]<=a[1] else a[1]),
    [[9,4],[3,3],[-5,2],[10**9,-10**9],[-7,-2]])
add(106, ["int"], lambda a: "\n".join(str(i) for i in range(1,a[0]+1)),
    [[4],[1],[100],[3],[7]])
add(107, ["int"], lambda a: "\n".join(str(i) for i in range(a[0],0,-1)),
    [[3],[1],[100],[5],[10]])
add(108, ["int"], lambda a: "\n".join(str(i*2) for i in range(1,a[0]+1)),
    [[4],[1],[100],[5],[3]])
add(109, ["int"], lambda a: str(sum(range(1,a[0]+1))),
    [[5],[1],[10**4],[100],[0+1]])
add(110, ["int"], lambda a: str(__import__("math").factorial(a[0])),
    [[5],[0],[20],[10],[1],[7]])
add(111, ["int"], lambda a: str(sum(i for i in range(1,a[0]+1) if i%2==0)),
    [[10],[1],[10**4],[5],[100]])
add(112, ["int"], lambda a: str(len([i for i in range(1,a[0]+1) if i%2!=0])),
    [[9],[1],[10**4],[10],[3]])
add(113, ["int"], lambda a: "\n".join(str(i*3) for i in range(1,a[0]+1)),
    [[4],[1],[100],[3],[7]])
add(114, ["int"], lambda a: str(a[0]*2 if a[0]>0 else a[0]),
    [[7],[-4],[0],[10**6],[-10**6],[1]])
add(115, ["int"], lambda a: "Pass" if a[0]>=40 else "Fail",
    [[67],[40],[39],[100],[0]])
add(116, ["int"], lambda a: "\n".join(f"{a[0]} x {i} = {a[0]*i}" for i in range(1,11)),
    [[3],[1],[20],[7],[5]])
add(117, ["int"], lambda a: str(len(str(a[0]))),
    [[78654],[0],[10**9],[1],[100],[123456789]])
add(118, ["int"], lambda a: str(sum(int(c) for c in str(a[0]))),
    [[12345],[1],[10**9],[99999],[7],[0+1]])
add(119, ["int"], lambda a: str(int(str(a[0])[::-1])),
    [[4321],[1],[10**9],[123456789],[7],[100]])
add(120, ["int"], lambda a: "\n".join(str(i) for i in range(2,a[0]+1,2)),
    [[10],[2],[100],[8],[6]])
add(121, ["int"], lambda a: "\n".join(str(i) for i in range(1,a[0]+1,2)),
    [[9],[1],[100],[7],[10]])
add(122, ["int"], lambda a: str(len([i for i in range(1,a[0]+1) if i%3==0 and i%5==0])),
    [[30],[1],[10**5],[15],[100]])
add(123, ["int"], lambda a: "\n".join(str(i*i) for i in range(1,a[0]+1)),
    [[5],[1],[100],[3],[10]])
add(124, ["int","int"], lambda a: (lambda ev,od: f"Evens: {ev} Odds: {od}")(
    len([i for i in range(a[0],a[1]+1) if i%2==0]),
    len([i for i in range(a[0],a[1]+1) if i%2!=0])),
    [[3,8],[1,1],[-3,3],[-5,5],[10,20]])
add(125, ["int","int"], lambda a: "\n".join(str(i*a[0]) for i in range(1,a[1]+1)),
    [[7,4],[1,1],[20,100],[5,3],[10,2]])
add(126, ["int","int"], lambda a: str(sum(range(a[0],a[1]+1))),
    [[4,7],[-3,3],[1,10**4],[-10**4,10**4],[5,5]])
add(127, ["int","int"], lambda a: "Divisible" if a[0]%a[1]==0 else "Not divisible",
    [[24,6],[7,2],[10**6,1],[0,5],[-15,3]])
add(128, ["int"], lambda a: str(sum(range(1,a[0]+1))),
    [[10],[1],[10**4],[100],[5]])
add(129, ["int"], lambda a: "\n".join(str(2**i) for i in range(a[0]+1)),
    [[5],[0],[20],[3],[1]])
add(130, ["int"], lambda a: str(sum(i for i in range(1,a[0]+1) if i%2!=0)),
    [[9],[1],[10**4],[5],[10]])
add(131, ["int","int","int"], lambda a: str(len([i for i in range(a[1],a[2]+1) if i<a[0]])),
    [[10,7,15],[5,5,5],[0,-10,10],[10**5,-10**5,10**5],[3,1,5]])
add(132, ["int"], lambda a: "\n".join(" ".join(str(j) for j in range(1,i+1)) for i in range(1,a[0]+1)),
    [[4],[1],[20],[5],[3]])
add(133, ["int"], lambda a: "\n".join("*"*a[0] for _ in range(a[0])),
    [[3],[1],[20],[5],[2]])
add(134, ["int"], lambda a: "\n".join(" "*(a[0]-i)+"*"*i for i in range(1,a[0]+1)),
    [[4],[1],[20],[5],[3]])
add(135, ["int"], lambda a: (lambda x: x if x<10 else add135(x))(
    sum(int(c) for c in str(a[0])) if a[0]>=10 else a[0]),
    [[9875],[29],[7],[10**9],[11],[12345]])
def add135(x):
    while x >= 10:
        x = sum(int(c) for c in str(x))
    return x
add(136, ["int"], lambda a: prime(a[0]),
    [[29],[2],[97],[4],[1],[10],[15],[7],[100]])
def prime(x):
    if x < 2:
        return "Not prime"
    for d in range(2, int(x**0.5)+1):
        if x % d == 0:
            return "Not prime"
    return "Prime"
add(137, ["int"], lambda a: str(len([i for i in range(1,a[0]+1) if a[0]%i==0])),
    [[12],[1],[10**5],[7],[16],[100]])
add(138, ["int"], lambda a: "\n".join(str(i) for i in range(1,a[0]+1) if a[0]%i==0),
    [[20],[1],[12],[7],[100]])
add(139, ["int"], lambda a: str(sum(i for i in range(1,a[0]+1) if a[0]%i==0)),
    [[15],[1],[12],[10],[100],[7]])
add(140, ["int","int","int"], lambda a: str(min(a[0],a[1],a[2])),
    [[5,2,9],[1,1,1],[-3,-7,-2],[10**6,10**6-1,10**6-2],[7,3,5]])
add(141, ["int","int","int"], lambda a: str(max(a[0],a[1],a[2])),
    [[5,2,9],[1,1,1],[-3,-7,-2],[10**6,10**6-1,10**6-2],[7,3,5]])
add(142, ["int"], lambda a: grade(a[0]),
    [[82],[90],[75],[60],[40],[39],[100],[0]])
def grade(m):
    if m >= 90: return "A"
    elif m >= 75: return "B"
    elif m >= 60: return "C"
    elif m >= 40: return "D"
    else: return "F"
add(143, ["int"], lambda a: "Leap" if (a[0]%400==0 or (a[0]%4==0 and a[0]%100!=0)) else "Not leap",
    [[2024],[2000],[1900],[2021],[100],[4],[400],[1]])
add(144, ["int"], lambda a: str(sum(2*i-1 for i in range(1,a[0]+1))),
    [[4],[1],[10**4],[10],[100]])
add(145, ["int","int","int"], lambda a: "\n".join(str(i) for i in range(a[1],a[2]+1) if i%a[0]==0),
    [[4,6,20],[1,1,1],[10,-10,10],[7,0,50],[5,5,5]])
add(146, ["int","int"], lambda a: str(sum(i*a[0] for i in range(1,a[1]+1))),
    [[6,4],[1,1],[20,10**4],[5,10],[3,100]])
add(147, ["int"], lambda a: "\n".join("*"*(a[0]-i+1) for i in range(1,a[0]+1)),
    [[4],[1],[20],[5],[3]])
add(148, ["int"], lambda a: str(sum(i**3 for i in range(1,a[0]+1))),
    [[3],[1],[10**4],[10],[5]])
add(149, ["int"], lambda a: str(len([i for i in range(1,a[0]+1) if i%3==0 or i%5==0])),
    [[10],[1],[10**5],[15],[20],[7]])
# Q150: print numbers until first multiple of 7 inclusive
add(150, ["int"], lambda a: "\n".join(str(i) for i in range(1,a[0]+1) if i<=first_mult(a[0],7)),
    [[10],[7],[14],[100],[28]])
def first_mult(n, k):
    for i in range(1, n+1):
        if i % k == 0:
            return i
    return n
add(151, ["int"], lambda a: "\n".join(str(i) for i in range(1,a[0]+1) if i%3!=0),
    [[10],[1],[100],[7],[20]])
add(152, ["int","int","int"], lambda a: str(len([i for i in range(a[1],a[2]+1) if i%a[0]==0])),
    [[5,10,30],[1,1,1],[10,-5,5],[3,-10,10],[7,0,50]])
add(153, ["int","int"], lambda a: "\n".join(str(i) for i in range(a[0],a[1]-1,-2)),
    [[10,2],[20,1],[5,1],[100,90],[3,3-1]])
add(154, ["int","int","int","int","int","int"], lambda a:
    "\n".join(str(max(a[0],a[1])) for _ in [0]) + "\n" +
    "\n".join(str(max(a[2],a[3])) for _ in [0]) + "\n" +
    "\n".join(str(max(a[4],a[5])) for _ in [0]),
    [[4,9,3,3,7,2],[1,2,3,4,5,6],[-5,-1,0,0,10,10],[10**6,10**6-1,3,3,-2,-7],[5,5,5,5,5,5]])
add(155, ["int"], lambda a: (lambda ds: f"{sum(d for d in ds if d%2==0)} {sum(d for d in ds if d%2!=0)}")(
    [int(c) for c in str(a[0])]),
    [[2384],[12345],[1111],[2468],[1357],[10]])
add(156, ["int"], lambda a: "\n".join(str(x) for x in fib(a[0])),
    [[6],[1],[30],[10],[5]])
def fib(n):
    a, b = 0, 1
    out = []
    for _ in range(n):
        out.append(a)
        a, b = b, a+b
    return out
add(157, ["int"], lambda a: str(sum(1 for c in str(a[0]) if int(c)%2==0)),
    [[24613],[1],[10**9],[1111],[2020],[7]])
add(158, ["int"], lambda a: str(sum(i*6 for i in range(1,a[0]+1))),
    [[3],[1],[10**4],[5],[10]])
add(159, ["int"], lambda a: "\n".join(" ".join(str(i) for _ in range(i)) for i in range(1,a[0]+1)),
    [[4],[1],[20],[3],[5]])
add(160, ["int"], lambda a: "Palindrome" if str(a[0])==str(a[0])[::-1] else "Not palindrome",
    [[12321],[1],[10**9],[1221],[12345],[1111]])
add(161, ["int"], lambda a: str(sum(fib(a[0]))),
    [[5],[1],[30],[10],[7]])
add(162, ["int"], lambda a: "Perfect" if sum(i for i in range(1,a[0]) if a[0]%i==0)==a[0] else "Not perfect",
    [[28],[6],[12],[496],[10],[7]])
add(163, ["int"], lambda a: "\n\n".join("\n".join(f"{t} x {i} = {t*i}" for i in range(1,11)) for t in range(1,a[0]+1)),
    [[2],[1],[10],[3]])
add(164, ["int","int","int"], lambda a: str(len([i for i in range(a[1],a[2]+1) if i%a[0]==0])),
    [[3,-5,10],[1,-10,10],[7,0,50],[5,5,5],[-2,-10,10]])
add(165, ["int","int"], lambda a: "\n".join(str(x) for x in first_n_nonmultiples(a[0],a[1])),
    [[3,5],[2,3],[10,100],[2,7],[5,10]])
def first_n_nonmultiples(k, n):
    out = []
    x = 1
    while len(out) < n:
        if x % k != 0:
            out.append(x)
        x += 1
    return out
add(166, ["int"], lambda a: digitpos_sum(a[0]),
    [[253],[1],[10**9],[123],[111]])
def digitpos_sum(n):
    s = str(n)
    return str(sum(int(d)**(i+1) for i, d in enumerate(s)))
add(167, ["int"], lambda a: "Armstrong" if (lambda n: sum(int(c)**3 for c in str(n))==n)(a[0]) else "Not armstrong",
    [[153],[370],[371],[407],[123],[100],[999]])
add(168, ["int"], lambda a: hollow_square(a[0]),
    [[4],[3],[20],[5],[7]])
def hollow_square(n):
    out = []
    for i in range(n):
        if i==0 or i==n-1:
            out.append("*"*n)
        else:
            out.append("*"+" "*(n-2)+"*")
    return "\n".join(out)
def count_inp(a):
    n = a[0]
    vals = a[1]
    return str(n) + "\n" + "\n".join(str(v) for v in vals) + "\n"

add(169, None, lambda a: str(len([v for v in a[1] if v > 0])),
    [[5,[3,-1,0,7,-2]],[1,[5]],[3,[-1,-2,-3]],[4,[0,0,0,1]],[6,[1,2,3,4,5,6]]],
    inp=count_inp)
add(170, None, lambda a: str(sum(a[1])),
    [[4,[10,20,30,40]],[1,[7]],[5,[-5,5,-5,5,-5]],[3,[10**6,10**6,10**6]],[2,[0,0]]],
    inp=count_inp)
add(171, None, lambda a: f"{sum(a[1])/a[0]:.2f}",
    [[4,[10,20,30,40]],[1,[5]],[3,[1,2,3]],[5,[10**6,10**6,10**6,10**6,10**6]],[2,[7,9]]],
    inp=count_inp)
add(172, None, lambda a: str(max(a[1])),
    [[5,[12,7,30,4,19]],[1,[8]],[3,[-1,-5,-2]],[4,[10,10,10,10]],[5,[-10**6,-5,0,5,10**6]]],
    inp=count_inp)
add(173, None, lambda a: str(min(a[1])),
    [[4,[8,3,10,6]],[1,[8]],[3,[-1,-5,-2]],[4,[10,10,10,10]],[5,[-10**6,-5,0,5,10**6]]],
    inp=count_inp)
add(174, ["int","int"], lambda a: str(sum(i for i in range(1,a[1]+1) if i%a[0]==0)),
    [[4,15],[1,10**4],[20,100],[7,50],[5,30]])
add(175, ["int"], lambda a: "\n".join(" ".join(str(2*j) for j in range(1,i+1)) for i in range(1,a[0]+1)),
    [[4],[1],[20],[3],[5]])
add(176, ["int","int","int"], lambda a: (lambda ms: "\n".join(str(m) for m in ms)+f"\nCount: {len(ms)}")(
    [i for i in range(a[1],a[2]+1) if i%a[0]==0]),
    [[4,7,16],[1,1,1],[3,-5,10],[7,0,50],[10,10,30]])
add(177, ["int"], lambda a: "\n".join(str(sum(int(c) for c in str(i))) for i in range(1,a[0]+1)),
    [[5],[1],[1000],[100],[12]])
add(178, ["int"], lambda a: "Perfect square" if is_square(a[0]) else "Not perfect square",
    [[49],[1],[10**6],[36],[50],[100],[15]])
def is_square(x):
    i = 1
    while i*i <= x:
        if i*i == x:
            return True
        i += 1
    return False
add(179, ["int"], lambda a: "\n".join(str(p) for p in first_n_primes(a[0])),
    [[5],[1],[100],[10],[7]])
def first_n_primes(n):
    out = []
    x = 2
    while len(out) < n:
        if prime(x) == "Prime":
            out.append(x)
        x += 1
    return out
add(180, ["int"], lambda a: str(len([i for i in range(1,a[0]+1) if prime(i)=="Prime"])),
    [[10],[1],[10**4],[100],[50]])
add(181, ["int"], lambda a: str(sum(i for i in range(1,a[0]+1) if prime(i)=="Prime")),
    [[10],[1],[10**4],[100],[50]])
add(182, ["int"], lambda a: str(len([i for i in range(1,a[0]+1) if sum(int(c) for c in str(i))%2==0])),
    [[10],[1],[10**4],[100],[20]])
add(183, ["int","int"], lambda a: "\n".join(str(i) for i in range(1,a[1]+1) if sum(int(c) for c in str(i))==a[0]),
    [[5,20],[1,1],[10,100],[30,10**4],[7,50]])
add(184, ["int"], lambda a: "\n".join(" ".join(str(j) for j in range(a[0]-i+1,0,-1)) for i in range(1,a[0]+1)),
    [[4],[1],[20],[3],[5]])
add(185, ["int"], lambda a: f"{sum(1/i for i in range(1,a[0]+1)):.2f}",
    [[4],[1],[10**4],[100],[10]])
add(186, ["int"], lambda a: "\n".join(
    " ".join(str(i*j) for j in range(1,i+1)) + f" : {sum(i*j for j in range(1,i+1))}" for i in range(1,a[0]+1)),
    [[3],[1],[20],[4],[5]])
add(187, ["int"], lambda a: "Yes" if is_pow2(a[0]) else "No",
    [[32],[1],[2],[8],[10**9],[100],[6],[1024]])
def is_pow2(n):
    while n % 2 == 0 and n > 1:
        n //= 2
    return n == 1
add(188, ["int","int"], lambda a: "\n".join(str(i) for i in range(a[0],0,-1) if i%a[1]==0),
    [[10,3],[20,5],[7,7],[100,10],[12,4]])
add(189, ["int","int"], lambda a: str(sum(i for i in range(a[0],a[1]+1) if i%2==0)),
    [[4,9],[-3,3],[1,1],[10**4,10**4],[7,15]])
add(190, ["int","int"], lambda a: str(sum(1 for c in str(a[0]) if int(c)==a[1])),
    [[122345,2],[1,1],[10**9,0],[99999,9],[7,0],[2020,0]])
add(191, ["int"], lambda a: pyramid(a[0]),
    [[4],[1],[20],[5],[3]])
def pyramid(n):
    out = []
    for i in range(1, n+1):
        out.append(" "*(n-i)+"*"*(2*i-1))
    return "\n".join(out)
add(192, ["int"], lambda a: str(sum(1 for c in str(a[0]) if int(c)%3==0)),
    [[39015],[1],[10**9],[3333],[2020],[7]])
add(193, ["int"], lambda a: str(sum(i for i in range(1,a[0]+1) if sum(int(c) for c in str(i))%2==0)),
    [[10],[1],[10**4],[100],[20]])
add(194, ["int"], lambda a: "\n".join(str(i*i) for i in range(1, int(a[0]**0.5)+1)),
    [[20],[1],[10**6],[100],[50]])
add(195, ["int"], lambda a: str(sum(sum(int(c) for c in str(i)) for i in range(1,a[0]+1))),
    [[12],[1],[10**4],[100],[9]])
add(196, ["int"], lambda a: floyd(a[0]),
    [[4],[1],[20],[5],[3]])
def floyd(n):
    out = []
    c = 1
    for i in range(1, n+1):
        row = []
        for _ in range(i):
            row.append(str(c)); c += 1
        out.append(" ".join(row))
    return "\n".join(out)
add(197, ["int"], lambda a: str(sum(__import__("math").factorial(i) for i in range(1,a[0]+1))),
    [[4],[1],[15],[10],[7]])
add(198, ["int"], lambda a: str(max(int(c) for c in str(a[0]))),
    [[78219],[1],[10**9],[99999],[7],[2020]])
add(199, ["int"], lambda a: hollow_triangle(a[0]),
    [[5],[3],[20],[4],[7]])
def hollow_triangle(n):
    out = []
    for i in range(1, n+1):
        if i == 1:
            out.append("*")
        elif i == n:
            out.append("*"*n)
        else:
            out.append("*"+" "*(i-2)+"*")
    return "\n".join(out)
add(200, ["int"], lambda a: str(sum(sum(int(c) for c in str(p)) for p in range(1,a[0]+1) if prime(p)=="Prime")),
    [[10],[1],[10**4],[20],[100]])

def build():
    output = {"batch": 2, "topics": ["Variables","Data Types","Operators","Input and Output","Conditions","Loops"], "questions": []}
    for qid in sorted(Q):
        d = Q[qid]
        tests = []
        for args in d["tests"]:
            inp = d["inp"](args)
            if d["parse"] is None:
                parsed = args  # args is [n, [vals]]
            else:
                parsed = conv(args, d["parse"])
            expected = d["solve"](parsed)
            tests.append({"input": inp, "expected_output": expected})
        output["questions"].append({"question_id": qid, "tests": tests})
    return output

if __name__ == "__main__":
    data = build()
    assert len(data["questions"]) == 100, len(data["questions"])
    total = sum(len(q["tests"]) for q in data["questions"])
    print("questions:", len(data["questions"]), "total tests:", total)
    path = os.path.join(os.path.dirname(__file__), "hidden-tests.json")
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    print("wrote", path)
