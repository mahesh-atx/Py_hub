#!/usr/bin/env python3
"""Generates hidden-tests.json for Batch 3."""
import json
import os

Q = {}

def list_line(args):
    return " ".join(str(x) for x in args) + "\n"

def two_lines(l1, l2):
    return list_line(l1) + l2 + "\n"

def add(qid, solve, tests, render):
    Q[qid] = {"solve": solve, "tests": tests, "render": render}

# Q201 char per line
add(201, lambda a: "\n".join(a[0]), [[s] for s in ["hi","a","hello","python","xy","abcde"]],
    lambda s: s[0] + "\n")
# Q202 length
add(202, lambda a: str(len(a[0])), [["hello"],["a"],["x"*1000],["python"],[""]] ,
    lambda s: s[0] + "\n")
# Q203 upper
add(203, lambda a: a[0].upper(), [["hello world"],["AbC"],["python"],["XyZ 123"]] ,
    lambda s: s[0] + "\n")
# Q204 lower
add(204, lambda a: a[0].lower(), [["HELLO"],["AbC"],["PYTHON"],["XyZ 123"]] ,
    lambda s: s[0] + "\n")
# Q205 first char
add(205, lambda a: a[0][0], [["Python"],["a"],["hello"],["xyz"]] ,
    lambda s: s[0] + "\n")
# Q206 last char
add(206, lambda a: a[0][-1], [["Python"],["a"],["hello"],["xyz"]] ,
    lambda s: s[0] + "\n")
# Q207 repeat
add(207, lambda a: a[0]*a[1], [["ab",3],["x",1],["hi",10],["z",5],["ab",0+1]] ,
    lambda s: s[0] + "\n" + str(s[1]) + "\n")
# Q208 first half
add(208, lambda a: a[0][:len(a[0])//2], [["abcd"],["abcdef"],["hi"],["python"]] ,
    lambda s: s[0] + "\n")
# Q209 count char
add(209, lambda a: str(a[0].count(a[1])), [["banana","a"],["hello","l"],["aaaa","a"],["xyz","q"]] ,
    lambda s: s[0] + "\n" + s[1] + "\n")
# Q210 list 1..n
add(210, lambda a: str(list(range(1,a[0]+1))), [[4],[1],[20],[5],[3]] ,
    lambda s: str(s[0]) + "\n")
# Q211 first and last
add(211, lambda a: f"First: {a[0][0]}\nLast: {a[0][-1]}",
    [[[5,8,3,9]],[[1]],[[-5,-3,7]],[[10,20,30]]],
    lambda s: list_line(s[0]))
# Q212 sum list
add(212, lambda a: str(sum(a[0])), [[[10,20,30]],[[1]],[[-5,5,-5,5]],[[1,2,3,4,5]]] ,
    lambda s: list_line(s[0]))
# Q213 count elements
add(213, lambda a: str(len(a[0])), [[[7,2,9,1,4]],[[1]],[[1,2,3,4,5,6]]] ,
    lambda s: list_line(s[0]))
# Q214 max
add(214, lambda a: str(max(a[0])), [[[12,7,30,4,19]],[[5]],[[-3,-1,-5]],[[10,10,10]]] ,
    lambda s: list_line(s[0]))
# Q215 min
add(215, lambda a: str(min(a[0])), [[[8,3,10,6]],[[5]],[[-3,-1,-5]],[[10,10,10]]] ,
    lambda s: list_line(s[0]))
# Q216 elements each line
add(216, lambda a: "\n".join(str(x) for x in a[0]), [[[4,7,2]],[[1]],[[-3,0,3,9]]] ,
    lambda s: list_line(s[0]))
# Q217 reverse list
add(217, lambda a: str(a[0][::-1]), [[[1,2,3,4]],[[5]],[[9,7,5,3,1]]] ,
    lambda s: list_line(s[0]))
# Q218 sort
add(218, lambda a: str(sorted(a[0])), [[[5,1,4,2]],[[1]],[[9,3,7,1,5]]] ,
    lambda s: list_line(s[0]))
# Q219 append
add(219, lambda a: str(a[0]+[a[1]]), [[[1,2,3],9],[[5],0],[[1,2,3,4,5],10]] ,
    lambda s: list_line(s[0]) + str(s[1]) + "\n")
# Q220 insert front
add(220, lambda a: str([a[1]]+a[0]), [[[2,3,4],1],[[5],0],[[1,2,3],9]] ,
    lambda s: list_line(s[0]) + str(s[1]) + "\n")
# Q221 pop last
add(221, lambda a: str(a[0][-1])+"\n"+str(a[0][:-1]),
    [[[1,2,3,4]],[[7,8]],[[5,6,7,8,9]]] ,
    lambda s: list_line(s[0]))
# Q222 pop first
add(222, lambda a: str(a[0][1:]), [[[1,2,3,4]],[[7,8]],[[5,6,7,8,9]]] ,
    lambda s: list_line(s[0]))
# Q223 reverse string
add(223, lambda a: a[0][::-1], [["hello"],["a"],["python"],["ab"]] ,
    lambda s: s[0] + "\n")
# Q224 first three
add(224, lambda a: a[0][:3], [["Python"],["abcdef"],["xyz"],["helloworld"]] ,
    lambda s: s[0] + "\n")
# Q225 last three
add(225, lambda a: a[0][-3:], [["Python"],["abcdef"],["xyz"],["helloworld"]] ,
    lambda s: s[0] + "\n")
# Q226 replace spaces
add(226, lambda a: a[0].replace(" ","-"), [["hello world"],["a b c"],["no"]],
    lambda s: s[0] + "\n")
# Q227 strip
add(227, lambda a: a[0].strip(), [["   hello   "],[" hi "],["no spaces"],["\t tab\t"]] ,
    lambda s: s[0] + "\n")
# Q228 remove first+last
add(228, lambda a: a[0][1:-1], [["hello"],["abcd"],["python"],["xy"]] ,
    lambda s: s[0] + "\n")
# Q229 concat lists
add(229, lambda a: str(a[0]+a[1]), [[[1,2,3],[4,5]],[[],[1]],[[9,8],[7,6,5]]] ,
    lambda s: list_line(s[0]) + list_line(s[1]))
# Q230 count evens
add(230, lambda a: str(len([x for x in a[0] if x%2==0])), [[[1,2,3,4,5,6]],[[1,3,5]],[[2,4,6]]] ,
    lambda s: list_line(s[0]))
# Q231 sum evens
add(231, lambda a: str(sum(x for x in a[0] if x%2==0)), [[[1,2,3,4,5,6]],[[1,3,5]],[[2,4,6]]] ,
    lambda s: list_line(s[0]))
# Q232 middle
add(232, lambda a: str(a[0][len(a[0])//2]), [[[5,8,3,9,1]],[[7]],[[1,2,3,4,5]]] ,
    lambda s: list_line(s[0]))
# Q233 remove by value
add(233, lambda a: (lambda l: l)(a[0][:a[0].index(a[1])] + a[0][a[0].index(a[1])+1:]).__str__(),
    [[[1,2,3,2,4],2],[[5,5,5],5],[[1,2,3],3],[[7,8,9],8]] ,
    lambda s: list_line(s[0]) + str(s[1]) + "\n")
# Q234 even indices
add(234, lambda a: "\n".join(str(x) for i,x in enumerate(a[0]) if i%2==0),
    [[[10,20,30,40,50]],[[1]],[[1,2,3,4]]] ,
    lambda s: list_line(s[0]))
# Q235 odd indices
add(235, lambda a: "\n".join(str(x) for i,x in enumerate(a[0]) if i%2!=0),
    [[[10,20,30,40,50]],[[1,2]],[[1,2,3,4]]] ,
    lambda s: list_line(s[0]))
# Q236 > threshold
add(236, lambda a: "\n".join(str(x) for x in a[0] if x>a[1]),
    [[[3,8,5,12,1],4],[[1,2,3],0],[[5,5,5],5]] ,
    lambda s: list_line(s[0]) + str(s[1]) + "\n")
# Q237 in list
add(237, lambda a: "Found" if a[1] in a[0] else "Not found",
    [[[5,8,3,9],3],[[1,2,3],9],[[1,2,3],1]] ,
    lambda s: list_line(s[0]) + str(s[1]) + "\n")
# Q238 count value
add(238, lambda a: str(a[0].count(a[1])), [[[1,2,3,2,4,2],2],[[1,2,3],9],[[5,5,5],5]] ,
    lambda s: list_line(s[0]) + str(s[1]) + "\n")
# Q239 split comma
add(239, lambda a: str(a[0].split(",")), [["apple,banana,cherry"],["one"],["a,b,c,d"]] ,
    lambda s: s[0] + "\n")
# Q240 join words
add(240, lambda a: " ".join(a[0]), [[["I","love","Python"]],[["hi"]],[["a","b","c"]]] ,
    lambda s: list_line(s[0]))
# Q241 count words
add(241, lambda a: str(len(a[0].split())), [["Hello world of Python"],["hi"],["a b c d e"]] ,
    lambda s: s[0] + "\n")
# Q242 sum ints line
add(242, lambda a: str(sum(int(x) for x in a[0])), [[[3,1,4,1,5]],[[0]],[[-5,5,-5,5]]] ,
    lambda s: list_line(s[0]))
# Q243 average list
add(243, lambda a: f"{sum(a[0])/len(a[0]):.2f}", [[[10,20,30,40]],[[5]],[[1,2,3]]] ,
    lambda s: list_line(s[0]))
# Q244 palindrome string
add(244, lambda a: "Palindrome" if a[0]==a[0][::-1] else "Not palindrome",
    [["madam"],["hello"],["a"],["racecar"]] ,
    lambda s: s[0] + "\n")
# Q245 first letter of each word
add(245, lambda a: "".join(w[0] for w in a[0].split()), [["Hello World Of Python"],["hi"],["a b c"]] ,
    lambda s: s[0] + "\n")
# Q246 replace word
add(246, lambda a: a[0].replace(a[1],a[2]),
    [["I like apples","apples","mangoes"],["hello hello","hello","bye"],["a b","x","y"]] ,
    lambda s: s[0]+"\n"+s[1]+"\n"+s[2]+"\n")
# Q247 capitalize words
add(247, lambda a: " ".join(w[0].upper()+w[1:] for w in a[0].split()),
    [["the quick brown fox"],["hello"],["a b c"]] ,
    lambda s: s[0] + "\n")
# Q248 remove vowels
add(248, lambda a: "".join(c for c in a[0] if c.lower() not in "aeiou"),
    [["hello world"],["python"],["AEIOU aeiou"]] ,
    lambda s: s[0] + "\n")
# Q249 words robust
add(249, lambda a: str(len(a[0].split())), [["hello   world  of   python"],["hi"],["a b"]] ,
    lambda s: s[0] + "\n")
# Q250 sort desc
add(250, lambda a: str(sorted(a[0], reverse=True)), [[[5,1,4,2,9]],[[1]],[[1,2,3]]] ,
    lambda s: list_line(s[0]))
# Q251 second largest
add(251, lambda a: str(sorted(a[0])[-2]), [[[3,9,1,7,5]],[[1,2]],[[10,10,1]]] ,
    lambda s: list_line(s[0]))
# Q252 remove dup keep order
add(252, lambda a: dedup_list(a[0]),
    [[[1,2,3,2,4,1,5]],[[1]],[[1,1,1]],[[4,3,4,2,3]]] ,
    lambda s: list_line(s[0]))
def dedup_list(l):
    out = []
    for x in l:
        if x not in out:
            out.append(x)
    return str(out)
# Q253 anagram
add(253, lambda a: "Anagram" if sorted(a[0])==sorted(a[1]) else "Not anagram",
    [["listen","silent"],["hello","olleh"],["abc","abd"],["a","a"]] ,
    lambda s: s[0]+"\n"+s[1]+"\n")
# Q254 sum positive
add(254, lambda a: str(sum(x for x in a[0] if x>0)), [[[-3,5,-1,8,0]],[[1,2,3]],[[-1,-2]]] ,
    lambda s: list_line(s[0]))
# Q255 count negative
add(255, lambda a: str(len([x for x in a[0] if x<0])), [[[-2,5,-3,-1,0,4]],[[1,2,3]],[[-1,-2]]] ,
    lambda s: list_line(s[0]))
# Q256 find index
add(256, lambda a: str(a[0].index(a[1]) if a[1] in a[0] else -1),
    [[[5,8,3,9,3],3],[[1,2,3],9],[[1,2,3],1]] ,
    lambda s: list_line(s[0]) + str(s[1]) + "\n")
# Q257 reverse each word
add(257, lambda a: " ".join(w[::-1] for w in a[0].split()),
    [["hello world"],["python"],["a b c"]] ,
    lambda s: s[0] + "\n")
# Q258 even idx and even val
add(258, lambda a: str(len([1 for i,x in enumerate(a[0]) if i%2==0 and x%2==0])),
    [[[2,3,4,6,8,1]],[[1,2,3]],[[2,2,2]]] ,
    lambda s: list_line(s[0]))
# Q259 first and last word
add(259, lambda a: f"First: {a[0].split()[0]}\nLast: {a[0].split()[-1]}",
    [["The quick brown fox"],["hi there"],["a b c d"]] ,
    lambda s: s[0] + "\n")
# Q260 digits list
add(260, lambda a: str([int(c) for c in str(a[0])]), [[4567],[1],[10**9],[12345],[100]] ,
    lambda s: str(s[0]) + "\n")
# Q261 local peaks
add(261, lambda a: str(len([1 for i in range(1,len(a[0])-1) if a[0][i]>a[0][i-1] and a[0][i]>a[0][i+1]])),
    [[[1,5,2,4,3,9,0]],[[1,2,3,2,1]],[[3,2,1]],[[1,3,2,4,3,5,4]]] ,
    lambda s: list_line(s[0]))
# Q262 sorted check
add(262, lambda a: "Sorted" if all(a[0][i]<=a[0][i+1] for i in range(len(a[0])-1)) else "Not sorted",
    [[[1,2,2,3,5]],[[3,2,1]],[[1,2,3]],[[5,5,5]]] ,
    lambda s: list_line(s[0]))
# Q263 even indices slice
add(263, lambda a: str(a[0][::2]), [[[10,20,30,40,50]],[[1]],[[1,2,3,4]]] ,
    lambda s: list_line(s[0]))
# Q264 reverse each number
add(264, lambda a: str([rev_num(x) for x in a[0]]), [[[123,45,6]],[[7]],[[100,120,5]]] ,
    lambda s: list_line(s[0]))
def rev_num(n):
    return int(str(n)[::-1])
# Q265 count vowels
add(265, lambda a: str(sum(1 for c in a[0].lower() if c in "aeiou")),
    [["Hello WORLD"],["python"],["AEIOU"],["xyz"]] ,
    lambda s: s[0] + "\n")
# Q266 every other char
add(266, lambda a: a[0][::2], [["abcdef"],["python"],["a"],["hello"]] ,
    lambda s: s[0] + "\n")
# Q267 start end same
add(267, lambda a: "Yes" if a[0][0]==a[0][-1] else "No",
    [["madam"],["hello"],["a"],["ab"]] ,
    lambda s: s[0] + "\n")
# Q268 merge alternating
add(268, lambda a: str(merge_alt(a[0],a[1])),
    [[[1,2,3],[9,8,7]],[[1],[2]],[[5,6],[7,8]]] ,
    lambda s: list_line(s[0]) + list_line(s[1]))
def merge_alt(a,b):
    out = []
    for i in range(len(a)):
        out.append(a[i]); out.append(b[i])
    return out
# Q269 count non-space
add(269, lambda a: str(sum(1 for c in a[0] if c!=" ")),
    [["hello world"],["python"],["a b c"],[" "]] ,
    lambda s: s[0] + "\n")
# Q270 swap first last
add(270, lambda a: str(swap_fl(a[0])),
    [[[1,2,3,4,5]],[[1,2]],[[9,8,7,6]]] ,
    lambda s: list_line(s[0]))
def swap_fl(l):
    l[0], l[-1] = l[-1], l[0]
    return l
# Q271 squares
add(271, lambda a: str([x**2 for x in a[0]]), [[[2,3,4]],[[1]],[[-3,0,5]]] ,
    lambda s: list_line(s[0]))
# Q272 char counts
add(272, lambda a: char_counts(a[0]),
    [["hello"],["a"],["aab"],["abca"]] ,
    lambda s: s[0] + "\n")
def char_counts(s):
    seen = []
    out = []
    for c in s:
        if c not in seen:
            seen.append(c)
            out.append(f"{c}: {s.count(c)}")
    return "\n".join(out)
# Q273 remove all occurrences
add(273, lambda a: str([x for x in a[0] if x!=a[1]]),
    [[[1,2,3,2,4,2,5],2],[[1,2,3],9],[[5,5,5],5]] ,
    lambda s: list_line(s[0]) + str(s[1]) + "\n")
# Q274 sum even indices
add(274, lambda a: str(sum(x for i,x in enumerate(a[0]) if i%2==0)),
    [[[10,20,30,40,50]],[[1]],[[1,2,3,4,5]]] ,
    lambda s: list_line(s[0]))
# Q275 words start letter
add(275, lambda a: str(len([w for w in a[0].split() if w[0].lower()==a[1].lower()])),
    [["Apple and Banana are Awesome","a"],["hello world","h"],["hi","x"]] ,
    lambda s: s[0]+"\n"+s[1]+"\n")
# Q276 digits only
add(276, lambda a: "Digits only" if a[0].isdigit() else "Not digits only",
    [["12345"],["12a"],["0"],[""]] ,
    lambda s: s[0] + "\n")
# Q277 middle elements
add(277, lambda a: str(a[0][1:-1]), [[[1,2,3,4,5]],[[1,2,3]],[[5,6,7,8,9]]] ,
    lambda s: list_line(s[0]))
# Q278 reverse slice
add(278, lambda a: str(a[0][::-1]), [[[1,2,3,4]],[[7]],[[9,8,7]]] ,
    lambda s: list_line(s[0]))
# Q279 max and min
add(279, lambda a: f"Largest: {max(a[0])}\nSmallest: {min(a[0])}",
    [[[4,9,2,7,5]],[[7]],[[-3,0,5]]] ,
    lambda s: list_line(s[0]))
# Q280 middle even
add(280, lambda a: str(a[0][len(a[0])//2 - 1 if len(a[0])%2==0 else len(a[0])//2]),
    [[[1,2,3,4]],[[1,2,3]],[[1,2,3,4,5]]] ,
    lambda s: list_line(s[0]))
# Q281 count > average
add(281, lambda a: (lambda avg: str(len([x for x in a[0] if x>avg])))(sum(a[0])/len(a[0])),
    [[[1,2,3,4,5]],[[5,5,5]],[[1,1,1,9]]] ,
    lambda s: list_line(s[0]))
# Q282 shift left
add(282, lambda a: str(a[0][1:] + [a[0][0]]), [[[1,2,3,4]],[[5,6]],[[1,2,3]]] ,
    lambda s: list_line(s[0]))
# Q283 digits in string
add(283, lambda a: "".join(c for c in a[0] if c.isdigit()),
    [["a1b2c3"],["hello"],["12345"],["a b c1"]] ,
    lambda s: s[0] + "\n")
# Q284 palindromic words
add(284, lambda a: str(len([w for w in a[0].split() if w==w[::-1]])),
    [["madam noon radar"],["hello"],["a b c"]] ,
    lambda s: s[0] + "\n")
# Q285 even/odd index sums
add(285, lambda a: f"{sum(x for i,x in enumerate(a[0]) if i%2==0)} {sum(x for i,x in enumerate(a[0]) if i%2!=0)}",
    [[[1,2,3,4,5]],[[1]],[[1,2,3]]] ,
    lambda s: list_line(s[0]))
# Q286 word in sentence
add(286, lambda a: "Present" if a[1] in a[0] else "Absent",
    [["Python is great","great"],["hello world","python"],["hi","h"]] ,
    lambda s: s[0]+"\n"+s[1]+"\n")
# Q287 word lengths
add(287, lambda a: "\n".join(f"{w}: {len(w)}" for w in a[0].split()),
    [["hello world"],["hi"],["a bb ccc"]] ,
    lambda s: s[0] + "\n")
# Q288 join comma
add(288, lambda a: ",".join(str(x) for x in a[0]),
    [[[1,2,3,4]],[[7]],[[10,20,30]]] ,
    lambda s: list_line(s[0]))
# Q289 index equals value
add(289, lambda a: str(len([1 for i,x in enumerate(a[0]) if i==x])),
    [[[0,2,2,3,9]],[[1]],[[0,1,2,3]]] ,
    lambda s: list_line(s[0]))
# Q290 longest word
add(290, lambda a: longest_word(a[0].split()),
    [["The quick brown fox jumps"],["hi there"],["a bb ccc dd"]] ,
    lambda s: s[0] + "\n")
def longest_word(words):
    best = ""
    for w in words:
        if len(w) > len(best):
            best = w
    return best
# Q291 reverse words
add(291, lambda a: " ".join(a[0].split()[::-1]),
    [["I love Python"],["hello"],["a b c"]] ,
    lambda s: s[0] + "\n")
# Q292 common elements
add(292, lambda a: str(common(a[0],a[1])),
    [[[1,2,3,4],[3,4,5,6]],[[1,2],[1,2]],[[1,2,3],[4,5,6]]] ,
    lambda s: list_line(s[0]) + list_line(s[1]))
def common(a,b):
    out = []
    for x in a:
        if x in b and x not in out:
            out.append(x)
    return out
# Q293 upper/lower counts
add(293, lambda a: (lambda up,lo: f"{up} {lo}")(
    sum(1 for c in a[0] if "A"<=c<="Z"), sum(1 for c in a[0] if "a"<=c<="z")),
    [["Hello World"],["PYTHON"],["python"],["aBcD"]] ,
    lambda s: s[0] + "\n")
# Q294 shift right
add(294, lambda a: str([a[0][-1]] + a[0][:-1]), [[[1,2,3,4]],[[5,6]],[[1,2,3]]] ,
    lambda s: list_line(s[0]))
# Q295 dedup string
add(295, lambda a: dedup_str(a[0]),
    [["banana"],["hello"],["aabbcc"],["abc"]] ,
    lambda s: s[0] + "\n")
def dedup_str(s):
    out = ""
    for c in s:
        if c not in out:
            out += c
    return out
# Q296 first+last
add(296, lambda a: str(a[0][0]+a[0][-1]), [[[3,5,7,2]],[[1,2]],[[-3,5,-7,10]]] ,
    lambda s: list_line(s[0]))
# Q297 peaks even index
add(297, lambda a: str(len([1 for i in range(2,len(a[0])-1,2) if a[0][i]>a[0][i-1] and a[0][i]>a[0][i+1]])),
    [[[3,1,2,1,5,1,4,1]],[[1,3,2,3,1]],[[2,1,2,1,2]]] ,
    lambda s: list_line(s[0]))
# Q298 second most frequent char
add(298, lambda a: second_freq(a[0]),
    [["aabbbcc"],["aab"],["abcdddeee"]] ,
    lambda s: s[0] + "\n")
def second_freq(s):
    # order of first appearance
    order = []
    for c in s:
        if c not in order:
            order.append(c)
    counts = {c: s.count(c) for c in order}
    # most frequent
    mx = max(counts.values())
    # second: highest among those != most-frequent char(s)
    # We'll pick the character with the highest count excluding the one(s) with mx.
    best = None
    bestc = -1
    for c in order:
        if counts[c] != mx:
            if counts[c] > bestc:
                bestc = counts[c]
                best = c
    return best
# Q299 duplicate
add(299, lambda a: "Duplicate" if has_dup(a[0]) else "Unique",
    [[[1,2,3,2,4]],[[1,2,3]],[[5,5]]] ,
    lambda s: list_line(s[0]))
def has_dup(l):
    seen = []
    for x in l:
        if x in seen:
            return True
        seen.append(x)
    return False
# Q300 longest palindromic word
add(300, lambda a: longest_palindrome(a[0].split()),
    [["madam went to see noon and level"],["hello world"],["abc racecar def"]] ,
    lambda s: s[0] + "\n")
def longest_palindrome(words):
    best = None
    for w in words:
        if w == w[::-1]:
            if best is None or len(w) > len(best):
                best = w
    return best if best is not None else "None"

def build():
    output = {"batch": 3, "topics": ["Variables","Data Types","Operators","Input and Output","Conditions","Loops","Strings","Lists"], "questions": []}
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
