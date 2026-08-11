#!/usr/bin/env python3
"""Generates hidden-tests.json for Batch 4."""
import json
import os

Q = {}

def ll(args):  # render list-of-ints line
    return " ".join(str(x) for x in args) + "\n"

def add(qid, solve, tests, render):
    Q[qid] = {"solve": solve, "tests": tests, "render": render}

# Q301 tuple of two
add(301, lambda a: str((a[0], a[1])), [[5,9],[0,0],[-3,7],[10**6,-10**6],[1,2]],
    lambda s: ll([s[0], s[1]]))
# Q302 tuple length
add(302, lambda a: str(len(a[0])), [[[1,2,3,4]],[[7]],[[1,2,3,4,5,6,7,8]]],
    lambda s: ll(s[0]))
# Q303 first last
add(303, lambda a: f"First: {a[0][0]}\nLast: {a[0][-1]}",
    [[[3,7,2,9]],[[1,2]],[[-5,-3,7]]], lambda s: ll(s[0]))
# Q304 sum tuple
add(304, lambda a: str(sum(a[0])), [[[1,2,3,4]],[[7]],[[-5,5,-5,5]]], lambda s: ll(s[0]))
# Q305 set from list
add(305, lambda a: str(set(a[0])), [[[1,2,2,3]],[[1]],[[4,4,4,4]],[[3,1,3,2,1]]], lambda s: ll(s[0]))
# Q306 set length
add(306, lambda a: str(len(set(a[0]))), [[[1,2,2,3,3,3,4]],[[1,1,1]],[[1,2,3]]], lambda s: ll(s[0]))
# Q307 add to set
add(307, lambda a: str(set(a[0]) | {a[1]}), [[[1,2,3],5],[[1,2],1],[[4,4],9]],
    lambda s: ll(s[0]) + str(s[1]) + "\n")
# Q308 remove from set
add(308, lambda a: str(set(a[0]) - {a[1]}), [[[1,2,3,4],3],[[1,2],2],[[5,6,7],5]],
    lambda s: ll(s[0]) + str(s[1]) + "\n")
# Q309 union
add(309, lambda a: str(set(a[0]) | set(a[1])), [[[1,2,3],[3,4,5]],[[1],[1]],[[1,2],[3,4]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q310 intersection
add(310, lambda a: str(set(a[0]) & set(a[1])), [[[1,2,3,4],[3,4,5,6]],[[1,2],[3,4]],[[1,2],[1,2]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q311 difference
add(311, lambda a: str(set(a[0]) - set(a[1])), [[[1,2,3,4,5],[2,4]],[[1,2],[1,2]],[[5,6],[1]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q312 unique words set
add(312, lambda a: str(set(a[0].split())), [["the cat and the dog"],["hi"],["a a b c c"]],
    lambda s: s[0] + "\n")
# Q313 in set
add(313, lambda a: "Present" if a[1] in set(a[0]) else "Absent",
    [[[1,5,9,3],9],[[1,2,3],9],[[1,2],2]],
    lambda s: ll(s[0]) + str(s[1]) + "\n")
# Q314 unpack sum
add(314, lambda a: str(a[0]+a[1]), [[12,8],[0,0],[-3,10],[10**6,10**6]],
    lambda s: ll([s[0], s[1]]))
# Q315 types (no input)
add(315, lambda a: "<class 'tuple'>\n<class 'set'>", [[]], lambda s: "")
# Q316 distinct chars
add(316, lambda a: str(len(set(a[0]))), [["banana"],["abc"],["aaaa"],["hello"]], lambda s: s[0]+"\n")
# Q317 tuple of digits
add(317, lambda a: str(tuple(int(c) for c in str(a[0]))), [[4567],[1],[12345],[10**9],[100]],
    lambda s: str(s[0])+"\n")
# Q318 add multiples to set
def set_add_render(a):
    n, vals = a[0], a[1]
    return str(n) + "\n" + "\n".join(str(v) for v in vals) + "\n"
add(318, lambda a: str(set(a[1])), [[5,[1,2,1,3,2]],[1,[7]],[3,[1,1,1]]], set_add_render)
# Q319 dedup list via set
add(319, lambda a: str(list(set(a[0]))), [[[3,1,3,2,1,4]],[[1,1,1]],[[5,5,6]]], lambda s: ll(s[0]))
# Q320 max set
add(320, lambda a: str(max(set(a[0]))), [[[4,9,2,9,7]],[[1]],[[-5,-3,-1]]], lambda s: ll(s[0]))
# Q321 count common
add(321, lambda a: str(len(set(a[0]) & set(a[1]))), [[[1,2,3,4],[3,4,5]],[[1,2],[3,4]],[[1,2],[1,2]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q322 symmetric diff
add(322, lambda a: str(set(a[0]) ^ set(a[1])), [[[1,2,3],[3,4,5]],[[1,2],[1,2]],[[1],[2]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q323 subset
add(323, lambda a: "Subset" if set(a[0]) <= set(a[1]) else "Not subset",
    [[[1,2,3],[1,2,3,4,5]],[[1,2],[2,3]],[[1],[1]],[[1,2,3],[1,2]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q324 sum unique
add(324, lambda a: str(sum(set(a[0]))), [[[2,3,2,4,3,5]],[[1,1,1]],[[1,2,3]]], lambda s: ll(s[0]))
# Q325 tuple from list
add(325, lambda a: str(tuple(a[0])), [[[5,6,7]],[[1]],[[1,2,3]]], lambda s: ll(s[0]))
# Q326 unpack three
add(326, lambda a: repr((a[0]+a[1]+a[2])/3), [[4,6,8],[0,0,0],[10**6,10**6,10**6],[1,2,3]],
    lambda s: ll([s[0],s[1],s[2]]))
# Q327 count vowels set
add(327, lambda a: str(sum(1 for c in a[0].lower() if c in "aeiou")),
    [["Hello World"],["python"],["AEIOU"],["xyz"]], lambda s: s[0]+"\n")
# Q328 common list
add(328, lambda a: str(list(set(a[0]) & set(a[1]))), [[[1,2,3,4],[3,4,5,6]],[[1,2],[1,2]],[[1,2],[3,4]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q329 distinct vowels count
add(329, lambda a: str(len(set(a[0].lower()) & set("aeiou"))),
    [["beautiful"],["hello"],["xyz"],["aeiouAEIOU"]], lambda s: s[0]+"\n")
# Q330 swap tuple
add(330, lambda a: str(a[1])+"\n"+str(a[0]), [[3,7],[0,0],[-5,2],[10**6,-10**6]],
    lambda s: ll([s[0],s[1]]))
# Q331 2nd and 3rd
add(331, lambda a: str(a[0][1])+"\n"+str(a[0][2]), [[[10,20,30,40]],[[1,2,3]],[[5,6,7,8,9]]],
    lambda s: ll(s[0]))
# Q332 unique order (seen set)
add(332, lambda a: str(uniq_ord(a[0])), [[[4,1,4,2,1,3]],[[1]],[[1,1,1,2]]], lambda s: ll(s[0]))
def uniq_ord(l):
    out=[]; seen=set()
    for x in l:
        if x not in seen:
            seen.add(x); out.append(x)
    return out
# Q333 dedup string set
add(333, lambda a: dedup_str_set(a[0]), [["banana"],["hello"],["aabbcc"]], lambda s: s[0]+"\n")
def dedup_str_set(s):
    out=""; seen=set()
    for c in s:
        if c not in seen:
            seen.add(c); out+=c
    return out
# Q334 intersection three
add(334, lambda a: str(set(a[0]) & set(a[1]) & set(a[2])),
    [[[1,2,3,4],[2,3,4,5],[3,4,5,6]],[[1,2],[1,2],[1,2]],[[1,2],[3,4],[5,6]]],
    lambda s: ll(s[0]) + ll(s[1]) + ll(s[2]))
# Q335 size A-B
add(335, lambda a: str(len(set(a[0])-set(a[1]))), [[[1,2,3,4,5],[2,4,6]],[[1,2],[1,2]],[[5,6],[1]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q336 disjoint
add(336, lambda a: "Disjoint" if not (set(a[0]) & set(a[1])) else "Not disjoint",
    [[[1,2,3],[4,5,6]],[[1,2],[2,3]],[[1],[1]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q337 list of letter tuples
add(337, lambda a: str([tuple(w) for w in a[0].split()]),
    [["hi there"],["hello"],["a b c"]], lambda s: s[0]+"\n")
# Q338 union size
add(338, lambda a: str(len(set(a[0]) | set(a[1]))), [[[1,2,3],[3,4,5]],[[1],[1]],[[1,2],[3,4]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q339 second of each tuple (pairs)
def pairs_render(a):
    n = len(a)
    return str(n) + "\n" + "".join(ll(p) for p in a)
add(339, lambda a: "\n".join(str(p[1]) for p in a),
    [[[1,9],[2,8],[3,7]],[[5,5]],[[1,1],[2,2],[3,3],[4,4]]], pairs_render)
# Q340 all unique chars
add(340, lambda a: "Unique" if len(set(a[0]))==len(a[0]) else "Duplicate",
    [["python"],["hello"],["a"],["aabb"]], lambda s: s[0]+"\n")
# Q341 sum intersection
add(341, lambda a: str(sum(set(a[0]) & set(a[1]))), [[[1,2,3,4],[3,4,5]],[[1,2],[3,4]],[[1,2],[1,2]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q342 difference sorted list
add(342, lambda a: str(sorted(set(a[0])-set(a[1]))), [[[5,1,3,2,4],[2,4]],[[1,2],[1,2]],[[5,6],[1]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q343 tuple equality
add(343, lambda a: "Equal" if tuple(a[0])==tuple(a[1]) else "Not equal",
    [[[1,2,3],[1,2,3]],[[1,2],[2,1]],[[1],[1]],[[1,2],[1,2,3]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q344 symdiff sorted list
add(344, lambda a: str(sorted(set(a[0]) ^ set(a[1]))), [[[1,2,3],[3,4,5]],[[1,2],[1,2]],[[1],[2]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q345 max min set
add(345, lambda a: f"Max: {max(set(a[0]))}\nMin: {min(set(a[0]))}",
    [[[4,9,2,9,7]],[[5]],[[-3,0,7]]], lambda s: ll(s[0]))
# Q346 distinct digits
add(346, lambda a: str(len(set(str(a[0])))), [[112233],[1],[12345],[10**12],[11111]],
    lambda s: str(s[0])+"\n")
# Q347 union list
add(347, lambda a: str(list(set(a[0]) | set(a[1]))), [[[1,2,3],[3,4,5]],[[1],[1]],[[1,2],[3,4]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q348 tuple squares
add(348, lambda a: str(tuple(x**2 for x in a[0])), [[[2,3,4]],[[1]],[[-3,0,5]]], lambda s: ll(s[0]))
# Q349 empty set check
add(349, lambda a: str(set(a[0])) if a[0] else "Empty",
    [[[1,2,3]],[[]],[[5]],[[1,1]]], lambda s: ll(s[0]))
# Q350 first only sorted
add(350, lambda a: str(sorted(set(a[0])-set(a[1]))), [[[1,2,3,4,5],[2,4,6]],[[1,2],[3]],[[1],[1]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q351 even odd tuple
add(351, lambda a: (lambda e,o: f"{e} {o}")(
    len([x for x in a[0] if x%2==0]), len([x for x in a[0] if x%2!=0])),
    [[[1,2,3,4,5,6]],[[1]],[[2,4,6]]], lambda s: ll(s[0]))
# Q352 common chars sorted
add(352, lambda a: str(sorted(set(a[0]) & set(a[1]))), [["hello","world"],["abc","abd"],["a","b"]],
    lambda s: s[0]+"\n"+s[1]+"\n")
# Q353 sum even set
add(353, lambda a: str(sum(x for x in set(a[0]) if x%2==0)), [[[1,2,2,3,4,4,6]],[[1,3,5]],[[2,2,2]]],
    lambda s: ll(s[0]))
# Q354 rotate three
add(354, lambda a: str(a[2])+"\n"+str(a[0])+"\n"+str(a[1]),
    [[1,2,3],[0,0,0],[-1,-2,-3],[10**6,10**6-1,10**6-2]],
    lambda s: ll([s[0],s[1],s[2]]))
# Q355 distinct pairs count
add(355, lambda a: str(len(set(a[0]))*len(set(a[1]))), [[[1,2,3],[7,8]],[[1],[1]],[[1,1,2],[5,5,6]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q356 duplicates set
add(356, lambda a: str(dups_set(a[0])), [[[1,2,2,3,3,3,4]],[[1,2,3]],[[5,5,6,6]]],
    lambda s: ll(s[0]))
def dups_set(l):
    seen=set(); dup=set()
    for x in l:
        if x in seen:
            dup.add(x)
        else:
            seen.add(x)
    return dup
# Q357 first last digits tuple
add(357, lambda a: str((str(a[0])[0], str(a[0])[-1])), [[3825],[12],[10**12],[100],[987654]],
    lambda s: str(s[0])+"\n")
# Q358 set of digit chars
add(358, lambda a: str(set(c for c in a[0] if c.isdigit())),
    [["a1b2c3a1"],["hello"],["12345"],["a1a2a3"]], lambda s: s[0]+"\n")
# Q359 dup via len
add(359, lambda a: "Duplicate" if len(a[0])>len(set(a[0])) else "Unique",
    [[[1,2,3,2]],[[1,2,3]],[[5,5]]], lambda s: ll(s[0]))
# Q360 sum union
add(360, lambda a: str(sum(set(a[0]) | set(a[1]))), [[[1,2,3],[3,4,5]],[[1],[2]],[[1,1,2],[2,3]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q361 (A&B)-C
add(361, lambda a: str((set(a[0]) & set(a[1])) - set(a[2])),
    [[[1,2,3,4,5],[3,4,5,6,7],[5,6,7,8]],[[1,2],[1,2],[1]],[[1],[2],[3]]],
    lambda s: ll(s[0]) + ll(s[1]) + ll(s[2]))
# Q362 symdiff size
add(362, lambda a: str(len(set(a[0]) ^ set(a[1]))), [[[1,2,3],[3,4,5]],[[1,2],[1,2]],[[1],[2]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q363 tuple positions of char
add(363, lambda a: str(tuple(i for i,c in enumerate(a[0]) if c==a[1])),
    [["banana","a"],["hello","l"],["abc","x"]], lambda s: s[0]+"\n"+s[1]+"\n")
# Q364 common three lists
add(364, lambda a: str(set(a[0]) & set(a[1]) & set(a[2])),
    [[[1,2,3,4],[2,3,4,5],[3,4,5,6]],[[1,2],[1,2],[1,2]],[[1,2],[3,4],[5,6]]],
    lambda s: ll(s[0]) + ll(s[1]) + ll(s[2]))
# Q365 superset
add(365, lambda a: "Superset" if set(a[0]) >= set(a[1]) else "Not superset",
    [[[1,2,3,4,5],[2,4]],[[1,2],[3]],[[1,2],[1,2]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q366 tuple word lengths
add(366, lambda a: str(tuple(len(w) for w in a[0].split())),
    [["I love Python"],["hi"],["a bb ccc"]], lambda s: s[0]+"\n")
# Q367 set first letters
add(367, lambda a: str(set(w[0] for w in a[0].split())),
    [["apple banana cherry apple"],["a b c"],["hello"]], lambda s: s[0]+"\n")
# Q368 sum same index tuples
add(368, lambda a: str(tuple(a[0][i]+a[1][i] for i in range(len(a[0])))),
    [[[1,2,3],[10,20,30]],[[1],[2]],[[5,6],[7,8]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q369 remove B from A
add(369, lambda a: str(set(a[0]) - set(a[1])), [[[1,2,3,4,5],[2,4,6]],[[1,2],[1,2]],[[5],[1]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q370 vowels per word tuple
add(370, lambda a: str(tuple(sum(1 for c in w.lower() if c in "aeiou") for w in a[0].split())),
    [["hello world"],["aeiou"],["xyz hi"]], lambda s: s[0]+"\n")
# Q371 largest second largest distinct
add(371, lambda a: (lambda s: f"Largest: {sorted(s)[-1]}\nSecond: {sorted(s)[-2]}")(set(a[0])),
    [[[3,9,1,9,7,7]],[[1,2]],[[5,4,3,2,1]]], lambda s: ll(s[0]))
# Q372 set equality
add(372, lambda a: "Equal" if set(a[0])==set(a[1]) else "Not equal",
    [[[1,2,3],[3,1,2]],[[1,2],[2,3]],[[1],[1]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q373 common sorted
add(373, lambda a: str(sorted(set(a[0]) & set(a[1]))), [[[4,1,3,2],[5,3,4,6]],[[1,2],[3,4]],[[1,2],[1,2]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q374 distinct vowels sentence
add(374, lambda a: str(len(set(a[0].lower()) & set("aeiou"))),
    [["Hello beautiful world"],["xyz"],["aeiou"]], lambda s: s[0]+"\n")
# Q375 (A|B)-C
add(375, lambda a: str((set(a[0]) | set(a[1])) - set(a[2])),
    [[[1,2,3],[3,4,5],[4,5,6]],[[1,2],[3],[4]],[[1],[2],[1]]],
    lambda s: ll(s[0]) + ll(s[1]) + ll(s[2]))
# Q376 tuple first last list
add(376, lambda a: str((a[0][0], a[0][-1])), [[[3,5,7,2]],[[1,2]],[[-5,-3,-1]]], lambda s: ll(s[0]))
# Q377 distinct common chars
add(377, lambda a: str(len(set(a[0]) & set(a[1]))), [["hello","world"],["abc","abd"],["a","b"]],
    lambda s: s[0]+"\n"+s[1]+"\n")
# Q378 set digits
add(378, lambda a: str(set(str(a[0]))), [[12245],[1],[10**12],[999]], lambda s: str(s[0])+"\n")
# Q379 sum distinct
add(379, lambda a: str(sum(set(a[0]))), [[[1,2,2,3,3,3,4]],[[1,1]],[[1,2,3]]], lambda s: ll(s[0]))
# Q380 tuple multiples
add(380, lambda a: str(tuple(i*a[0] for i in range(1,a[1]+1))),
    [[5,4],[1,1],[7,3],[20,20]], lambda s: ll([s[0], s[1]]))
# Q381 only in A
add(381, lambda a: str(len(set(a[0])-set(a[1]))), [[[1,2,3,4,5],[2,4]],[[1,2],[3,4]],[[1],[1]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q382 second largest distinct
add(382, lambda a: str(sorted(set(a[0]))[-2]), [[[7,3,9,1,9,3]],[[1,2]],[[5,5,4,3]]],
    lambda s: ll(s[0]))
# Q383 A not in B order
add(383, lambda a: str([x for x in a[0] if x not in set(a[1])]),
    [[[1,2,3,4,5],[2,4,6]],[[1,2,3],[3]],[[5,6,7],[1,2]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q384 permutation
add(384, lambda a: "Permutation" if sorted(a[0])==sorted(a[1]) else "Not permutation",
    [["abc","cba"],["ab","ab"],["abc","abd"]], lambda s: s[0]+"\n"+s[1]+"\n")
# Q385 union three
add(385, lambda a: str(set(a[0]) | set(a[1]) | set(a[2])),
    [[[1,2],[2,3],[3,4]],[[1],[2],[3]],[[1,1],[2,2],[3,3]]],
    lambda s: ll(s[0]) + ll(s[1]) + ll(s[2]))
# Q386 matching index tuple
add(386, lambda a: str(tuple(i for i in range(len(a[0])) if a[0][i]==a[1][i])),
    [[[1,2,3,4],[1,5,3,4]],[[1],[2]],[[1,2],[1,2]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q387 chars common all words
add(387, lambda a: common_all_words(a[0].split()),
    [["cat cut cot"],["abc abc abc"],["a b c"]], lambda s: s[0]+"\n")
def common_all_words(words):
    s = set(words[0])
    for w in words[1:]:
        s &= set(w)
    return str(s)
# Q388 all even
add(388, lambda a: "All even" if all(x%2==0 for x in set(a[0])) else "Not all even",
    [[[2,4,6,8]],[[1,2,3]],[[2,2,2]],[[0,2]]], lambda s: ll(s[0]))
# Q389 first last vowel tuple
add(389, lambda a: first_last_vowel(a[0]),
    [["beautiful"],["hello"],["xyz"],["aeiou"]], lambda s: s[0]+"\n")
def first_last_vowel(s):
    v = [i for i,c in enumerate(s) if c in "aeiouAEIOU"]
    if not v:
        return "None"
    return str((s[v[0]], s[v[-1]]))
# Q390 common three sorted
add(390, lambda a: str(sorted(set(a[0]) & set(a[1]) & set(a[2]))),
    [[[5,1,3,2],[2,4,3,5],[3,2,5,7]],[[1,2],[1,2],[1,2]],[[1],[2],[3]]],
    lambda s: ll(s[0]) + ll(s[1]) + ll(s[2]))
# Q391 chars appear once sorted
add(391, lambda a: str(sorted(c for c in set(a[0]) if a[0].count(c)==1)),
    [["aabbccd"],["hello"],["abc"],["aabb"]], lambda s: s[0]+"\n")
# Q392 tuple unique order
add(392, lambda a: str(tuple(uniq_ord(a[0]))), [[[4,1,4,2,1,3]],[[1]],[[1,1,2]]], lambda s: ll(s[0]))
# Q393 subset lists
add(393, lambda a: "Subset" if set(a[0]) <= set(a[1]) else "Not subset",
    [[[1,2,3],[1,2,3,4,5]],[[1,2],[2,3]],[[1],[1]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q394 sum tuple endpoints
add(394, lambda a: str(a[0][0]+a[0][-1]), [[[3,5,7,2]],[[1,2]],[[-3,5,-7,10]]], lambda s: ll(s[0]))
# Q395 count common distinct
add(395, lambda a: str(len(set(a[0]) & set(a[1]))), [[[1,1,2,3],[2,2,3,4]],[[1,2],[3,4]],[[1],[1]]],
    lambda s: ll(s[0]) + ll(s[1]))
# Q396 second smallest distinct
add(396, lambda a: str(sorted(set(a[0]))[1]), [[[5,2,8,2,1]],[[1,2]],[[5,3,4,2]]], lambda s: ll(s[0]))
# Q397 digit positions tuple
add(397, lambda a: str(tuple(i for i,c in enumerate(a[0]) if c.isdigit())),
    [["a1b2c3"],["hello"],["12ab3"]], lambda s: s[0]+"\n")
# Q398 symdiff three
add(398, lambda a: str(set(a[0]) ^ set(a[1]) ^ set(a[2])),
    [[[1,2,3],[2,3,4],[3,4,5]],[[1],[1],[1]],[[1,2],[2,3],[3,4]]],
    lambda s: ll(s[0]) + ll(s[1]) + ll(s[2]))
# Q399 exactly two of three
add(399, lambda a: str(exactly_two(a[0], a[1], a[2])),
    [[[1,2,3],[2,3,4],[3,4,5]],[[1],[2],[3]],[[1,2],[1],[1]]],
    lambda s: ll(s[0]) + ll(s[1]) + ll(s[2]))
def exactly_two(A,B,C):
    sa,sb,sc = set(A),set(B),set(C)
    allv = sa | sb | sc
    return sum(1 for x in allv if ((x in sa)+(x in sb)+(x in sc))==2)
# Q400 tuple appear once
add(400, lambda a: str(tuple(x for x in uniq_ord(a[0]) if a[0].count(x)==1)),
    [[[1,2,2,3,4,4,5]],[[1,2,3]],[[1,1,2,2]]], lambda s: ll(s[0]))

# remove placeholders (Q318, Q339 re-added above)
for qid in [318, 339]:
    if qid in Q and Q[qid]["solve"] is None:
        del Q[qid]

def build():
    output = {"batch": 4, "topics": ["Variables","Data Types","Operators","Input and Output","Conditions","Loops","Strings","Lists","Tuples","Sets"], "questions": []}
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
