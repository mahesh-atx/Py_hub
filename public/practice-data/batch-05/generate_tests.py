#!/usr/bin/env python3
"""Generates hidden-tests.json for Batch 5."""
import json
import os

Q = {}

def ll(args):
    return " ".join(str(x) for x in args) + "\n"

def add(qid, solve, tests, render):
    Q[qid] = {"solve": solve, "tests": tests, "render": render}

def pairs_render(a):
    pairs = a[0]
    n = len(pairs)
    return str(n) + "\n" + "".join(f"{k} {v}\n" for k, v in pairs)

def pairs_render_query(a):
    pairs, q = a[0], a[1]
    return pairs_render([pairs]) + str(q) + "\n"

def std_render(vals):
    return "\n".join(str(x) for x in vals) + "\n"

# ---- Q401..Q500 ----
add(401, lambda a: str({"name": a[0], "age": a[1]}), [["Aman",25],["Bob",1],["Z",100]],
    lambda s: std_render([s[0], s[1]]))
add(402, lambda a: str({"product": a[0], "price": a[1]}["price"]), [["Laptop",55000],["x",1],["p",10**6]],
    lambda s: std_render([s[0], s[1]]))
add(403, lambda a: str({"item": a[0], "quantity": a[1], "status": "in stock"}),
    [["Rice",5],["x",0],["Pen",100]], lambda s: std_render([s[0], s[1]]))
add(404, lambda a: repr({"price": a[0]}["price"]*1.1), [[2000],[1],[10**6],[500],[7]],
    lambda s: std_render([s[0]]))
add(405, lambda a: str(len({a[0]: a[1], a[2]: a[3], a[4]: a[5]})),
    [["a",90,"b",80,"c",70],["x",1,"y",2,"z",3]], lambda s: std_render(s))
add(406, lambda a: str(dict(zip(a[::2], a[1::2])).keys()),
    [["Delhi","India","Paris","France","Tokyo","Japan"]], lambda s: std_render(s))
add(407, lambda a: str(dict(zip(a[::2], a[1::2])).values()),
    [["a",10,"b",20,"c",30]], lambda s: std_render(s))
add(408, lambda a: "Hello from a function!", [[]], lambda s: "")
add(409, lambda a: str(a[0]+a[1]), [[12,8],[0,0],[-3,10],[10**6,10**6]],
    lambda s: std_render([s[0], s[1]]))
add(410, lambda a: str(a[0]*2), [[9],[0],[-10**6],[10**6],[5]], lambda s: std_render([s[0]]))
add(411, lambda a: str(a[0]-a[1]), [[10,3],[5,5],[-3,7],[0,0]], lambda s: std_render([s[0], s[1]]))
def args_render(a):
    n, vals = a[0], a[1]
    return str(n) + "\n" + "\n".join(str(v) for v in vals) + "\n"
add(412, lambda a: str(sum(a[1])), [[4,[1,2,3,4]],[1,[7]],[3,[10**6,10**6,10**6]]], args_render)
add(413, lambda a: f"name = {a[0]}\nage = {a[1]}", [["Aman",25],["x",1]], lambda s: std_render(s))
add(414, lambda a: str(max(a[0], a[1])), [[7,3],[5,5],[-3,7],[10**9,-10**9]],
    lambda s: std_render([s[0], s[1]]))
add(415, lambda a: "Even" if a[0]%2==0 else "Odd", [[14],[7],[0],[-4],[10**9]],
    lambda s: std_render([s[0]]))
def char_freq(s):
    d = {}
    for c in s:
        d[c] = d.get(c, 0) + 1
    return d
add(416, lambda a: str(char_freq(a[0])), [["hello"],["a"],["aabbb"],["abcabc"]],
    lambda s: s[0]+"\n")
add(417, lambda a: str(char_freq_words(a[0])), [["the cat and the dog"],["hi"],["a a b"]],
    lambda s: s[0]+"\n")
def char_freq_words(s):
    d = {}
    for w in s.split():
        d[w] = d.get(w, 0) + 1
    return d
add(418, lambda a: "Found" if a[1] in dict(a[0]) else "Not found",
    [[[("apple",5),("banana",3),("cherry",7)], "banana"],
     [[("a",1),("b",2)], "z"], [[("x",9)], "x"]], pairs_render_query)
def pairs_to_dict(pairs):
    return {k: v for k, v in pairs}
add(419, lambda a: str(dict(a[0]).get(a[1], 0)),
    [[[("a",10),("b",20)], "c"], [[("a",10)], "a"], [[("x",5)], "y"]], pairs_render_query)
add(420, lambda a: "\n".join(f"{k}: {v}" for k, v in a[0]),
    [[[("x",5),("y",9)]], [[("a",1),("b",2),("c",3)]], [[("p",7)]]], pairs_render)
add(421, lambda a: str(sum(v for _, v in a[0])),
    [[[("apple",10),("banana",20),("cherry",30)]], [[("a",5)]], [[("a",1),("b",2)]]], pairs_render)
add(422, lambda a: max(a[0], key=lambda p: p[1])[0],
    [[[("A",85),("B",92),("C",78)]], [[("A",10)]], [[("A",5),("B",9),("C",2)]]], pairs_render)
add(423, lambda a: str({k: v for k, v in a[0] if k != a[1]}),
    [[[("a",1),("b",2),("c",3)], "b"], [[("a",1)], "a"], [[("x",5),("y",6)], "x"]], pairs_render_query)
add(424, lambda a: str(2*a[0]), [[21],[0],[-10**6],[10**6],[1]], lambda s: std_render([s[0]]))
add(425, lambda a: str(a[0] > 0), [[7],[-3],[0],[10**9],[-10**9]], lambda s: std_render([s[0]]))
add(426, lambda a: str(a[0]*a[1]), [[6,7],[0,0],[-3,4],[10**6,10**6]],
    lambda s: std_render([s[0], s[1]]))
add(427, lambda a: str({"name": a[0], "scores": [a[1], a[2], a[3]]}),
    [["Aman",80,90,70],["x",1,2,3]], lambda s: std_render(s))
add(428, lambda a: f"{sum(v for _, v in a[0])/len(a[0]):.2f}",
    [[[("a",80),("b",90),("c",70)]], [[("a",50)]], [[("a",100),("b",0)]]], pairs_render)
add(429, lambda a: str(max(a[1])), [[4,[5,9,2,7]],[1,[5]],[3,[-1,-5,-2]]], args_render)
add(430, lambda a: str(char_freq_words(a[0])), [["apple banana apple cherry apple"],["a a"],["x y x"]],
    lambda s: s[0]+"\n")
add(431, lambda a: str(fact(a[0])), [[5],[0],[20],[10],[1],[7]], lambda s: std_render([s[0]]))
def fact(n):
    p = 1
    for i in range(1, n+1):
        p *= i
    return p
add(432, lambda a: str(list(range(2, 2*a[0]+1, 2))), [[4],[1],[20],[3],[5]],
    lambda s: std_render([s[0]]))
add(433, lambda a: str({"person": {"name": a[0], "age": a[1], "city": a[2]}}["person"]["city"]),
    [["Aman",25,"Pune"],["x",1,"Delhi"]], lambda s: std_render(s))
add(434, lambda a: str(sum(v for _, v in a[0])),
    [[[("A",80),("B",70)]], [[("A",10)]], [[("A",5),("B",6),("C",7)]]], pairs_render)
add(435, lambda a: "Palindrome" if a[0]==a[0][::-1] else "Not palindrome",
    [["madam"],["hello"],["a"],["racecar"]], lambda s: s[0]+"\n")
def vowel_counts(s):
    d = {v: 0 for v in "aeiou"}
    for c in s.lower():
        if c in d:
            d[c] += 1
    return d
add(436, lambda a: str(vowel_counts(a[0])), [["hello world"],["aeiou"],["xyz"]],
    lambda s: s[0]+"\n")
def parse_kv_line(line):
    d = {}
    for part in line.split(","):
        k, v = part.split(":")
        d[k] = int(v)
    return d
add(437, lambda a: str({**parse_kv_line(a[0]), **parse_kv_line(a[1])}),
    [["a:1,b:2","b:9,c:3"],["a:1","a:2"],["x:5","y:6"]],
    lambda s: s[0]+"\n"+s[1]+"\n")
def min_max_digits(n):
    ds = [int(c) for c in str(n)]
    return str(min(ds)) + "\n" + str(max(ds))
add(438, lambda a: min_max_digits(a[0]), [[4731],[1],[10**12],[987654],[5]],
    lambda s: std_render([s[0]]))
add(439, lambda a: "Duplicate" if len(a[0])>len(set(a[0])) else "Unique",
    [[[1,2,3,2,4]],[[1,2,3]],[[5,5]]], lambda s: ll(s[0]))
def most_freq_char(s):
    d = char_freq(s)
    best = None; bcnt = -1
    for c in s:
        if d[c] > bcnt:
            bcnt = d[c]; best = c
    return best
add(440, lambda a: most_freq_char(a[0]), [["abacb"],["aab"],["hello"],["aaaa"]],
    lambda s: s[0]+"\n")
add(441, lambda a: str(sum(1 for x in a[0] if x%2==0)),
    [[[1,2,3,4,5,6]],[[1,3,5]],[[2,4,6]]], lambda s: ll(s[0]))
add(442, lambda a: str({i: i**2 for i in range(1, a[0]+1)}),
    [[4],[1],[20],[3],[5]], lambda s: std_render([s[0]]))
add(443, lambda a: str(sum(v for k, v in a[0] if k % 2 == 0)),
    [[[(1,10),(2,20),(4,30)]], [[(1,5),(3,7)]], [[(2,9),(4,1)]]], pairs_render)
add(444, lambda a: repr(a[0]*(100-a[1])/100),
    [[1000,20],[100,0],[10**6,100],[500,10]], lambda s: std_render([s[0], s[1]]))
def sign_counts(lst):
    d = {"neg": 0, "zero": 0, "pos": 0}
    for x in lst:
        if x < 0: d["neg"] += 1
        elif x == 0: d["zero"] += 1
        else: d["pos"] += 1
    return str(d)
add(445, lambda a: sign_counts(a[0]), [[[-2,0,3,-1,0,5]],[[0]],[[-1,1,-1,1]]],
    lambda s: ll(s[0]))
add(446, lambda a: a[0][::-1], [["hello"],["a"],["python"]], lambda s: s[0]+"\n")
def letter_freq(s):
    d = {}
    for c in s:
        if c != " ":
            d[c] = d.get(c, 0) + 1
    return str(d)
add(447, lambda a: letter_freq(a[0]), [["hello world"],["a b c"],["python"]],
    lambda s: s[0]+"\n")
add(448, lambda a: str(a[0]+a[1])+"\n"+str(a[0]*a[1]),
    [[7,8],[0,0],[10**6,10**6],[5,5]], lambda s: std_render([s[0], s[1]]))
def digit_freq(n):
    d = {}
    for c in str(n):
        i = int(c)
        d[i] = d.get(i, 0) + 1
    return str(d)
add(449, lambda a: digit_freq(a[0]), [[112233],[1],[10**12],[999],[12345]],
    lambda s: std_render([s[0]]))
def is_prime(n):
    if n < 2: return False
    for d in range(2, int(n**0.5)+1):
        if n % d == 0: return False
    return True
add(450, lambda a: "Prime" if is_prime(a[0]) else "Not prime",
    [[29],[2],[97],[4],[1],[100],[7]], lambda s: std_render([s[0]]))
add(451, lambda a: str({"name": a[0], "age": a[1]}),
    [["Aman",25],["x",1]], lambda s: std_render(s))
add(452, lambda a: (lambda d: f"{len(d)}\n{max(d, key=d.get)}")(char_freq_words(a[0])),
    [["apple banana apple cherry banana apple"],["a b a"],["x x x"]], lambda s: s[0]+"\n")
add(453, lambda a: repr(a[0]*9/5+32), [[100],[-40],[0],[37]], lambda s: std_render([s[0]]))
def block_scores_render(students):  # students = [ (name, [s1,s2,s3]) ... ]
    return str(len(students)) + "\n" + "".join(f"{n}\n" + "\n".join(str(x) for x in sc) + "\n" for n, sc in students)
add(454, lambda a: "\n".join(f"{n}: {sum(sc)}" for n, sc in a),
    [[("A",[1,2,3]),("B",[4,5,6])], [("X",[10,20,30])]], block_scores_render)
def char_freq_str(s):
    return str(char_freq(s))
add(455, lambda a: char_freq_str(a[0]), [["aab"],["hello"],["x"]], lambda s: s[0]+"\n")
def top_two(d):
    items = sorted(d.items(), key=lambda p: p[1])
    return f"Highest: {items[-1][0]}\nSecond: {items[-2][0]}"
add(456, lambda a: top_two(dict(a[0])),
    [[[("A",85),("B",92),("C",78)]], [[("A",10),("B",20)]], [[("x",5),("y",9),("z",3)]]], pairs_render)
add(457, lambda a: str(sum(1 for c in a[0].lower() if c in "aeiou")),
    [["Hello World"],["python"],["AEIOU"]], lambda s: s[0]+"\n")
add(458, lambda a: str({v: k for k, v in a[0]}),
    [[[("A",85),("B",92)]], [[("x",5)]], [[("A",1),("B",2),("C",3)]]], pairs_render)
def process_args(vals, mode):
    if mode == "sum":
        return str(sum(vals))
    p = 1
    for v in vals: p *= v
    return str(p)
add(459, lambda a: process_args(a[1], a[2]),
    [[3,[1,2,3],"prod"],[2,[1,2],"sum"],[4,[2,2,2,2],"prod"]],
    lambda s: args_render([s[0], s[1]]) + s[2] + "\n")
def length_counts(sentence):
    d = {}
    for w in sentence.split():
        d[len(w)] = d.get(len(w), 0) + 1
    return str(d)
add(460, lambda a: length_counts(a[0]), [["I love Python"],["a bb ccc"],["hi"]],
    lambda s: s[0]+"\n")
def gcd(a, b):
    for i in range(min(a, b), 0, -1):
        if a % i == 0 and b % i == 0:
            return i
add(461, lambda a: str(gcd(a[0], a[1])), [[12,18],[1,1],[7,13],[100,75],[48,36]],
    lambda s: std_render([s[0], s[1]]))
add(462, lambda a: str([i for i in range(1, a[0]+1) if a[0] % i == 0]),
    [[12],[1],[10**4],[7],[100]], lambda s: std_render([s[0]]))
add(463, lambda a: str(char_freq_words(a[0])), [["cat dog cat bird dog cat"],["a b a"]],
    lambda s: s[0]+"\n")
def is_armstrong(n):
    return sum(int(c)**3 for c in str(n)) == n
add(464, lambda a: "Armstrong" if is_armstrong(a[0]) else "Not armstrong",
    [[153],[370],[371],[407],[123],[100]], lambda s: std_render([s[0]]))
def best_avg(students):
    best = None; bavg = -1
    for n, sc in students:
        avg = sum(sc)/3
        if avg > bavg:
            bavg = avg; best = n
    return best
add(465, lambda a: best_avg(a),
    [[("A",[80,90,70]),("B",[60,70,80])], [("X",[100,100,100])], [("A",[0,0,0]),("B",[50,50,50])]],
    block_scores_render)
def sum_digits(n):
    t = 0
    while n > 0:
        t += n % 10
        n //= 10
    return t
add(466, lambda a: str(sum_digits(a[0])), [[12345],[1],[10**9],[999],[7]],
    lambda s: std_render([s[0]]))
add(467, lambda a: str(merge_freq(char_freq(a[0]), char_freq(a[1]))),
    [["ab","ac"],["a","a"],["x","y"]], lambda s: s[0]+"\n"+s[1]+"\n")
def merge_freq(d1, d2):
    out = dict(d1)
    for k, v in d2.items():
        out[k] = out.get(k, 0) + v
    return out
def fib(n):
    a, b = 0, 1
    for _ in range(n-1):
        a, b = b, a+b
    return a
add(468, lambda a: str(fib(a[0])), [[6],[1],[2],[30],[10],[7]],
    lambda s: std_render([s[0]]))
add(469, lambda a: max(char_freq_words(a[0]), key=char_freq_words(a[0]).get),
    [["apple banana apple cherry apple"],["a b a"],["x"]], lambda s: s[0]+"\n")
def agg_scores(pairs):
    d = {}
    order = []
    for k, v in pairs:
        if k not in d:
            d[k] = 0; order.append(k)
        d[k] += v
    return "\n".join(f"{k}: {d[k]}" for k in order)
add(470, lambda a: agg_scores(a[0]),
    [[[("A",10),("B",20),("A",5),("B",10)]], [[("X",7)]], [[("A",1),("A",2),("B",3)]]], pairs_render)
add(471, lambda a: str(len(a[0].split())), [["Python is great fun"],["hi"],["a b c d e"]],
    lambda s: s[0]+"\n")
add(472, lambda a: "\n".join(f"{k}: {dict(a[0])[k]}" for k in sorted(dict(a[0]).keys())),
    [[[("banana",3),("apple",5),("cherry",2)]], [[("b",1),("a",2)]], [[("z",9),("a",1),("m",5)]]],
    pairs_render)
add(473, lambda a: " ".join(a[0].split()[::-1]), [["I love Python"],["hi"],["a b c"]],
    lambda s: s[0]+"\n")
def avg_report(students):
    return "\n".join(f"{n}: {sum(sc)/3:.1f}" for n, sc in students)
add(474, lambda a: avg_report(a),
    [[("A",[80,90,70]),("B",[60,70,80])], [("X",[50,50,50])]], block_scores_render)
add(475, lambda a: "Sorted" if all(a[0][i]<=a[0][i+1] for i in range(len(a[0])-1)) else "Not sorted",
    [[[1,2,2,3,5]],[[3,2,1]],[[1,2,3]],[[5,5,5]]], lambda s: ll(s[0]))
add(476, lambda a: digit_freq(a[0]), [[122333],[1],[10**12],[222]], lambda s: std_render([s[0]]))
add(477, lambda a: str(max(a[0])), [[[3,9,1,7,5]],[[5]],[[-3,-1,-5]]], lambda s: ll(s[0]))
add(478, lambda a: str({i: i**2 for i in range(1, a[0]+1)}),
    [[3],[1],[20],[5]], lambda s: std_render([s[0]]))
add(479, lambda a: str(sum(1 for c in str(a[0]) if int(c)%2==0)),
    [[2468],[1],[10**12],[13579],[2020]], lambda s: std_render([s[0]]))
def group_words(sentence):
    d = {}
    for w in sentence.split():
        d.setdefault(len(w), []).append(w)
    return str(d)
add(480, lambda a: group_words(a[0]), [["I love Python code"],["a bb ccc"],["hi there"]],
    lambda s: s[0]+"\n")
add(481, lambda a: str(sum(v for _, v in a[0])),
    [[[("a",5),("b",7)]], [[("x",10)]], [[("a",1),("b",2),("c",3)]]], pairs_render)
add(482, lambda a: "Found" if a[1] in dict(a[0]) else "Not found",
    [[[("apple",5),("banana",3)], "apple"], [[("a",1),("b",2)], "z"], [[("x",9)], "x"]],
    pairs_render_query)
def lcm(a, b):
    for m in range(max(a, b), a*b+1, max(a, b)):
        if m % a == 0 and m % b == 0:
            return m
add(483, lambda a: str(lcm(a[0], a[1])), [[4,6],[1,1],[7,13],[5,10],[12,18]],
    lambda s: std_render([s[0], s[1]]))
add(484, lambda a: str(sum(1 for _, v in a[0] if v > a[1])),
    [[[("a",10),("b",20),("c",30)], 15], [[("a",5)], 0], [[("a",1),("b",2)], 3]],
    pairs_render_query)
add(485, lambda a: str(a[0][::-1]), [[[1,2,3,4]],[[5]],[[9,8,7]]], lambda s: ll(s[0]))
def best_total(students):
    best = None; bt = -1
    for n, sc in students:
        t = sum(sc)
        if t > bt:
            bt = t; best = n
    return best
add(486, lambda a: best_total(a),
    [[("A",[10,20,30]),("B",[40,50,60])], [("X",[5,5,5])]], block_scores_render)
def is_pow2(n):
    while n > 1 and n % 2 == 0:
        n //= 2
    return n == 1
add(487, lambda a: "Yes" if is_pow2(a[0]) else "No",
    [[64],[1],[2],[8],[10**9],[100],[6]], lambda s: std_render([s[0]]))
add(488, lambda a: str(sum(1 for c in a[0] if "A" <= c <= "Z")),
    [["Hello World"],["PYTHON"],["python"],["aBcD"]], lambda s: s[0]+"\n")
def letter_group(sentence):
    d = {}
    for w in sentence.split():
        L = w[0].lower()
        d[L] = d.get(L, 0) + 1
    return str(d)
add(489, lambda a: letter_group(a[0]), [["apple ant banana bear"],["a b a"],["Hi there"]],
    lambda s: s[0]+"\n")
add(490, lambda a: f"{sum(a[0])/len(a[0]):.2f}",
    [[[10,20,30,40]],[[5]],[[1,2,3]]], lambda s: ll(s[0]))
add(491, lambda a: repr(a[0]*(100+a[1])/100),
    [[1000,15],[100,0],[10**6,100],[500,10]], lambda s: std_render([s[0], s[1]]))
add(492, lambda a: str(sum(1 for k, v in a[0] if k == v)),
    [[[(1,1),(2,5),(3,3)]], [[(1,2),(3,4)]], [[(5,5)]]], pairs_render)
def mode(lst):
    d = char_freq_int(lst)
    best = None; bcnt = -1
    for x in lst:
        if d[x] > bcnt:
            bcnt = d[x]; best = x
    return best
def char_freq_int(lst):
    d = {}
    for x in lst:
        d[x] = d.get(x, 0) + 1
    return d
add(493, lambda a: str(mode(a[0])), [[[1,2,2,3,2,4]],[[1,2,3]],[[5,5,6,6]]], lambda s: ll(s[0]))
add(494, lambda a: str({**parse_kv_line(a[0]), **parse_kv_line(a[1])}),
    [["a:1,b:2","b:9,c:3"],["a:1","a:2"],["x:5","y:6"]],
    lambda s: s[0]+"\n"+s[1]+"\n")
add(495, lambda a: "Unique" if len(a[0])==len(set(a[0])) else "Duplicate",
    [["python"],["hello"],["a"],["aabb"]], lambda s: s[0]+"\n")
def grade_report(students):
    out = {}
    for n, sc in students:
        avg = sum(sc)/3
        if avg >= 80: g = "A"
        elif avg >= 60: g = "B"
        elif avg >= 40: g = "C"
        else: g = "F"
        out[n] = {"scores": sc, "grade": g}
    return str(out)
add(496, lambda a: grade_report(a),
    [[("A",[80,90,70]),("B",[30,20,40])], [("X",[50,60,70])]], block_scores_render)
add(497, lambda a: str(sorted(a[0])[-2]), [[[3,9,1,7,5]],[[1,2]],[[10,10,1]]], lambda s: ll(s[0]))
def most_common_len(sentence):
    d = {}
    for w in sentence.split():
        d[len(w)] = d.get(len(w), 0) + 1
    return str(min([k for k in d if d[k] == max(d.values())]))
add(498, lambda a: most_common_len(a[0]), [["hi I am here now"],["a bb ccc"],["xx yy zz"]],
    lambda s: s[0]+"\n")
def stats(vals, mode):
    return str(sum(vals)) if mode == "sum" else str(len(vals))
add(499, lambda a: stats(a[1], a[2]),
    [[3,[5,5,9],"count"],[2,[1,2],"sum"],[4,[7,7,7,7],"count"]],
    lambda s: args_render([s[0], s[1]]) + s[2] + "\n")
def report(students):
    lines = []
    for n, sc in students:
        t = sum(sc)
        res = "Pass" if t >= 120 else "Fail"
        lines.append(f"{n}: total={t} {res}")
    return "\n".join(lines)
add(500, lambda a: report(a),
    [[("A",[50,50,50]),("B",[20,30,40])], [("X",[40,40,40])], [("Y",[100,100,100])]],
    block_scores_render)

def build():
    output = {"batch": 5, "topics": ["Variables","Data Types","Operators","Input and Output","Conditions","Loops","Strings","Lists","Tuples","Sets","Dictionaries","Functions"], "questions": []}
    for qid in sorted(Q):
        d = Q[qid]
        tests = []
        for args in d["tests"]:
            inp = d["render"](args)
            expected = d["solve"](args)
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
