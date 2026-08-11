#!/usr/bin/env python3
# Generates hidden-tests.json for Batch 1.
# For each question we define a solution function and a set of test inputs.
# Expected outputs are COMPUTED by running the solution, guaranteeing correctness.
import json

def b1():
    Q = {}

    # helper to build a solver from a single-expression formula producing a string
    def conv(vals):
        return "\n".join(str(v) for v in vals) + "\n"

    def add(qid, parse_types, solve, tests, out_is_float=False):
        Q[qid] = {"parse": parse_types, "solve": solve, "tests": tests, "out_is_float": out_is_float}

    # Q1 welcome
    add(1, ["str"], lambda s: f"Hello, {s[0]}! Welcome to Python.",
        [["Alice"],["Bob"],["Zara Khan"],["M"],["x"],["Ravi"]])
    # Q2 sum
    add(2, ["int","int"], lambda s: str(s[0]+s[1]),
        [[7,5],[-3,10],[0,0],[10**9,10**9],[-10**9,-10**9],[5,-5]])
    # Q3 difference
    add(3, ["int","int"], lambda s: str(s[0]-s[1]),
        [[20,7],[5,5],[0,0],[-3,10],[10**9,-10**9],[-10**9,10**9]])
    # Q4 product
    add(4, ["int","int"], lambda s: str(s[0]*s[1]),
        [[6,9],[0,5],[-4,3],[10**9,2],[-10**9,-2],[7,0]])
    # Q5 division (float)
    add(5, ["int","int"], lambda s: repr(s[0]/s[1]),
        [[10,4],[7,2],[3,1],[20,8],[1,3],[100,25]], out_is_float=True)
    # Q6 rectangle area
    add(6, ["int","int"], lambda s: str(s[0]*s[1]),
        [[8,5],[1,1],[10**6,10**6],[3,7],[100,50],[2,9]])
    # Q7 square perimeter
    add(7, ["int"], lambda s: str(4*s[0]),
        [[6],[1],[10**6],[12],[7],[0+1]])
    # Q8 cube volume
    add(8, ["int"], lambda s: str(s[0]**3),
        [[4],[1],[10],[1000],[3],[2]])
    # Q9 meters to cm
    add(9, ["int"], lambda s: str(s[0]*100),
        [[3],[0],[10**6],[50],[7],[12345]])
    # Q10 hours to minutes
    add(10, ["int"], lambda s: str(s[0]*60),
        [[2],[0],[10**6],[1],[24],[100]])
    # Q11 average of three
    add(11, ["int","int","int"], lambda s: repr((s[0]+s[1]+s[2])/3),
        [[4,6,8],[1,1,1],[0,0,0],[10,20,30],[100,200,300],[3,4,5]], out_is_float=True)
    # Q12 remainder
    add(12, ["int","int"], lambda s: str(s[0]%s[1]),
        [[17,5],[-17,5],[100,10],[7,3],[10**6,999],[0,7]])
    # Q13 integer division
    add(13, ["int","int"], lambda s: str(s[0]//s[1]),
        [[17,5],[100,3],[10**9,10**6],[7,2],[5,5],[1,2]])
    # Q14 first last name
    add(14, ["str","str"], lambda s: f"{s[0]} {s[1]}",
        [["Ada","Lovelace"],["John","Smith"],["A","B"],["Marie","Curie"],["S","K"]])
    # Q15 age next year
    add(15, ["int"], lambda s: f"Next year you will be {s[0]+1} years old.",
        [[25],[1],[150],[99],[18]])
    # Q16 celsius to fahrenheit
    add(16, ["int"], lambda s: repr(s[0]*9/5+32),
        [[0],[100],[-40],[25],[-100],[37]], out_is_float=True)
    # Q17 total pay bonus
    add(17, ["int","int"], lambda s: f"Total pay: {s[0]+s[1]}",
        [[30000,5000],[0,0],[10**6,10**6],[1000,1],[500,500]])
    # Q18 double
    add(18, ["int"], lambda s: str(s[0]*2),
        [[21],[0],[-7],[10**6],[-10**6],[1]])
    # Q19 square
    add(19, ["int"], lambda s: str(s[0]**2),
        [[-7],[0],[10**6],[-10**6],[5],[2]])
    # Q20 km to miles
    add(20, ["int"], lambda s: repr(s[0]*0.621371),
        [[10],[0],[10000],[1],[500],[7]], out_is_float=True)
    # Q21 simple interest
    add(21, ["int","int","int"], lambda s: repr(s[0]*s[1]*s[2]/100),
        [[10000,5,3],[1000,10,1],[10**6,100,10],[5000,4,2],[100,1,1]], out_is_float=True)
    # Q22 gross pay
    add(22, ["int","int"], lambda s: f"Gross pay: {s[0]*s[1]:.2f}",
        [[500,40],[10000,300],[1,1],[1500,20],[2500,50]])
    # Q23 rectangle perimeter
    add(23, ["int","int"], lambda s: str(2*(s[0]+s[1])),
        [[7,3],[1,1],[10**6,10**6],[10,20],[5,5],[0+1,0+1]])
    # Q24 split bill
    add(24, ["int","int"], lambda s: repr(s[0]/s[1]),
        [[120,5],[1,1],[10**6,10000],[1000,4],[77,7]], out_is_float=True)
    # Q25 distance on line
    add(25, ["int","int"], lambda s: str(abs(s[0]-s[1])),
        [[-3,5],[10,10],[10**9,-10**9],[-5,-2],[0,0],[7,1]])
    # Q26 total with tax
    add(26, ["int","int"], lambda s: repr(s[0]+s[0]*s[1]/100),
        [[200,10],[100,0],[10**6,100],[50,50],[1000,12]], out_is_float=True)
    # Q27 average speed
    add(27, ["int","int"], lambda s: repr(s[0]/s[1]),
        [[300,5],[10**6,10000],[1,1],[100,4],[7,2]], out_is_float=True)
    # Q28 price after discount
    add(28, ["int","int"], lambda s: repr(s[0]-s[0]*s[1]/100),
        [[500,20],[100,0],[10**6,100],[200,10],[999,33]], out_is_float=True)
    # Q29 seconds to minutes/seconds
    add(29, ["int"], lambda s: f"{s[0]//60} minutes and {s[0]%60} seconds",
        [[95],[0],[10**9],[60],[59],[3600]])
    # Q30 power
    add(30, ["int","int"], lambda s: str(s[0]**s[1]),
        [[2,10],[20,0],[3,5],[1,10],[5,2],[10,10]])
    # Q31 age in days
    add(31, ["int"], lambda s: str(s[0]*365),
        [[30],[1],[120],[10],[0+1],[100]])
    # Q32 runs total
    add(32, ["int","int","int"], lambda s: str(s[0]+s[1]+s[2]),
        [[245,180,310],[0,0,0],[10**6,10**6,10**6],[100,200,50],[7,7,7]])
    # Q33 triangle perimeter
    add(33, ["int","int","int"], lambda s: str(s[0]+s[1]+s[2]),
        [[3,4,5],[1,1,1],[10**6,10**6,10**6],[10,20,30],[5,5,5]])
    # Q34 average of four
    add(34, ["int","int","int","int"], lambda s: repr((s[0]+s[1]+s[2]+s[3])/4),
        [[2,4,6,8],[0,0,0,0],[10**6,10**6,10**6,10**6],[1,2,3,4],[100,100,100,100]], out_is_float=True)
    # Q35 circle circumference
    add(35, ["int"], lambda s: repr(2*3.14159*s[0]),
        [[7],[1],[10**6],[0+1],[10],[100]], out_is_float=True)
    # Q36 km per liter
    add(36, ["int","int"], lambda s: f"{s[0]/s[1]:.2f} km per liter",
        [[420,20],[10**6,1],[1,1],[100,4],[7,2]])
    # Q37 total cost
    add(37, ["int","int"], lambda s: str(s[0]*s[1]),
        [[45,6],[10**6,10**4],[1,1],[0+1,0+1],[100,10]])
    # Q38 weekly wages
    add(38, ["int"], lambda s: str(s[0]*5),
        [[800],[1],[10**6],[0+1],[1000]])
    # Q39 remaining distance
    add(39, ["int","int"], lambda s: str(s[0]-s[1]),
        [[1000,350],[10**6,1],[1,1],[500,250],[777,123]])
    # Q40 celsius to kelvin
    add(40, ["int"], lambda s: repr(s[0]+273.15),
        [[25],[-273],[500],[0],[100]], out_is_float=True)
    # Q41 electricity bill
    add(41, ["int"], lambda s: repr(150+s[0]*7.5),
        [[100],[0],[10**5],[1],[50],[10**5]], out_is_float=True)
    # Q42 rectangle perimeter from area+side
    add(42, ["int","int"], lambda s: str(2*(s[1]+s[0]//s[1])),
        [[24,4],[100,10],[10**6,10**3],[20,5],[36,6],[50,25]])
    # Q43 diff product vs sum
    add(43, ["int","int"], lambda s: str(abs(s[0]*s[1]-(s[0]+s[1]))),
        [[4,6],[-3,10],[0,0],[1,1],[10,10],[-5,-5]])
    # Q44 gpa avg four rounded
    add(44, ["int","int","int","int"], lambda s: f"{(s[0]+s[1]+s[2]+s[3])/4:.1f}",
        [[88,92,77,85],[100,100,100,100],[0,0,0,0],[50,60,70,80],[90,95,85,80]])
    # Q45 rupees to paise
    add(45, ["int"], lambda s: str(s[0]*100),
        [[15],[0],[10**6],[100],[25],[7]])
    # Q46 seconds to hours
    add(46, ["int"], lambda s: str(s[0]//3600),
        [[7300],[0],[10**9],[3600],[3599],[7200]])
    # Q47 remainder of sum
    add(47, ["int","int","int"], lambda s: str((s[0]+s[1])%s[2]),
        [[17,8,7],[0,0,1],[10**6,10**6,999],[5,5,10],[100,200,50]])
    # Q48 distance per person
    add(48, ["int","int"], lambda s: f"{s[0]/s[1]:.2f}",
        [[250,4],[10**6,1],[1,1],[100,3],[77,7]])
    # Q49 days to weeks
    add(49, ["int"], lambda s: f"{s[0]//7} weeks and {s[0]%7} days",
        [[17],[0],[10**9],[7],[6],[14]])
    # Q50 BMI
    add(50, ["int","float"], lambda s: f"{s[0]/(s[1]**2):.1f}",
        [[70,1.75],[20,2.5],[300,0.5],[50,1.6],[80,1.8]])
    # Q51 triangle area
    add(51, ["float","float"], lambda s: repr(s[0]*s[1]/2),
        [[10.0,6.0],[0.1,0.1],[1000,1000],[3.5,4.0],[2.0,7.0]], out_is_float=True)
    # Q52 cakes ceiling
    add(52, ["int","int"], lambda s: str((s[0]+s[1]-1)//s[1]),
        [[26,5],[1,1],[10**6,100],[100,100],[7,2],[30,6]])
    # Q53 bulk discount
    add(53, ["int","int","int"], lambda s: repr(s[0]*s[1]*(100-s[2])/100),
        [[100,5,20],[10**6,1,0],[1,10**4,100],[50,10,50],[200,3,10]], out_is_float=True)
    # Q54 grade percentage
    add(54, ["int","int"], lambda s: f"{(s[0]/s[1])*100:.1f}",
        [[42,50],[0,1000],[1000,1000],[25,100],[30,40]])
    # Q55 elapsed minutes
    add(55, ["int","int","int","int"], lambda s: str((s[2]*60+s[3])-(s[0]*60+s[1])),
        [[9,15,11,45],[0,0,0,59],[12,0,13,0],[8,30,8,45],[10,0,23,59]])
    # Q56 cylinder volume
    add(56, ["int","int"], lambda s: f"{3.14159*s[0]**2*s[1]:.1f}",
        [[3,5],[1,1],[1000,1000],[10,10],[7,3],[2,10]])
    # Q57 sharing toys
    add(57, ["int","int"], lambda s: f"Each child gets {s[0]//s[1]} toys and {s[0]%s[1]} are left over.",
        [[29,6],[10**6,10**4],[1,1],[100,7],[50,5]])
    # Q58 fuel cost
    add(58, ["int","int","int"], lambda s: f"{(s[1]/s[0])*s[2]:.2f}",
        [[15,300,110],[50,10**6,1000],[1,1,1],[10,100,50],[20,400,120]])
    # Q59 bill discount tip
    add(59, ["int","int","int"], lambda s: f"{s[0]*(100-s[1])/100*(100+s[2])/100:.2f}",
        [[1000,10,5],[10**6,0,0],[1,100,100],[500,20,10],[2000,50,50]])
    # Q60 years to seconds
    add(60, ["int"], lambda s: str(s[0]*365*24*60*60),
        [[1],[0],[100],[2],[10],[0+1]])
    # Q61 split bill one not paying
    add(61, ["int","int"], lambda s: f"{s[0]/(s[1]-1):.2f}",
        [[500,6],[10**6,2],[1,2],[1000,11],[700,3]])
    # Q62 area circle
    add(62, ["int"], lambda s: f"{3.14159*s[0]**2:.2f}",
        [[5],[1],[10**4],[10],[7],[100]])
    # Q63 reverse two-digit
    add(63, ["int"], lambda s: str((s[0]%10)*10+(s[0]//10)),
        [[47],[10],[99],[85],[23],[90]])
    # Q64 sum digits two-digit
    add(64, ["int"], lambda s: str(s[0]//10+s[0]%10),
        [[38],[10],[99],[55],[11],[90]])
    # Q65 product digits two-digit
    add(65, ["int"], lambda s: str((s[0]//10)*(s[0]%10)),
        [[25],[10],[99],[33],[41],[20]])
    # Q66 sum digits three-digit
    add(66, ["int"], lambda s: str(s[0]//100+(s[0]//10)%10+s[0]%10),
        [[256],[100],[999],[123],[505],[987]])
    # Q67 rupees to paise decimal
    add(67, ["float"], lambda s: str(round(s[0]*100)),
        [[12.50],[0.0],[1000000.0],[7.05],[0.99],[123.45]])
    # Q68 percentage of number
    add(68, ["int","int"], lambda s: f"{s[0]*s[1]/100:.2f}",
        [[80,25],[10**6,100],[-10**6,50],[0,0],[150,10]])
    # Q69 total distance two speeds
    add(69, ["int","int","int","int"], lambda s: str(s[0]*s[1]+s[2]*s[3]),
        [[60,2,80,1],[10**4,10**4,10**4,10**4],[1,1,1,1],[50,3,40,4],[100,1,200,2]])
    # Q70 difference squares
    add(70, ["int","int"], lambda s: str(s[0]**2-s[1]**2),
        [[7,3],[5,5],[10**6,1],[-3,4],[0,2],[2,1]])
    # Q71 fahrenheit to celsius
    add(71, ["int"], lambda s: f"{(s[0]-32)*5/9:.1f}",
        [[100],[-40],[32],[300],[-100],[212]])
    # Q72 circumference from radius
    add(72, ["int"], lambda s: f"{2*3.14159*s[0]:.2f}",
        [[10],[1],[10**4],[7],[5],[100]])
    # Q73 sum first n natural
    add(73, ["int"], lambda s: str(s[0]*(s[0]+1)//2),
        [[10],[1],[10**6],[100],[5],[0+1]])
    # Q74 bulk discount + tax
    add(74, ["int","int","int","int"], lambda s: f"{s[0]*s[1]*(100-s[2])/100*(100+s[3])/100:.2f}",
        [[200,3,10,8],[10**6,1,0,0],[1,10**4,100,100],[100,5,20,10],[50,10,0,50]])
    # Q75 avg five
    add(75, ["int","int","int","int","int"], lambda s: f"{(s[0]+s[1]+s[2]+s[3]+s[4])/5:.2f}",
        [[10,20,30,40,50],[0,0,0,0,0],[10**6]*5,[1,2,3,4,5],[100,90,80,70,60]])
    # Q76 buses ceiling
    add(76, ["int","int"], lambda s: str((s[0]+s[1]-1)//s[1]),
        [[75,20],[10**6,100],[1,1],[100,100],[30,30],[0+1,0+1]])
    # Q77 year decade
    add(77, ["int"], lambda s: str(s[0]//10),
        [[2024],[0],[10**6],[10],[9],[1999]])
    # Q78 cost per student
    add(78, ["int","int"], lambda s: f"{s[0]/s[1]:.2f}",
        [[3000,25],[10**6,10**4],[1,1],[1000,3],[5000,40]])
    # Q79 average marks percent
    add(79, ["int","int","int"], lambda s: repr((s[0]+s[1]+s[2])/3),
        [[80,90,70],[0,0,0],[100,100,100],[50,60,70],[33,66,99]], out_is_float=True)
    # Q80 falling distance
    add(80, ["int"], lambda s: repr(0.5*9.8*s[0]**2),
        [[3],[0],[1000],[1],[10],[5]], out_is_float=True)
    # Q81 sum squares
    add(81, ["int","int"], lambda s: str(s[0]**2+s[1]**2),
        [[3,4],[0,0],[-3,4],[10**6,0],[5,12],[1,1]])
    # Q82 hypotenuse
    add(82, ["int","int"], lambda s: f"{(s[0]**2+s[1]**2)**0.5:.1f}",
        [[3,4],[1,1],[10**4,10**4],[6,8],[5,12],[0+1,0+1]])
    # Q83 quadruple +10
    add(83, ["int"], lambda s: str(s[0]*4+10),
        [[5],[0],[-10**6],[10**6],[7],[-2]])
    # Q84 last two digits
    add(84, ["int"], lambda s: str(s[0]%100),
        [[123456],[100],[10**12],[1000000],[1001],[999999]])
    # Q85 sum digits four-digit
    add(85, ["int"], lambda s: str(s[0]//1000+(s[0]//100)%10+(s[0]//10)%10+s[0]%10),
        [[2357],[1000],[9999],[1234],[5050],[1111]])
    # Q86 last digit
    add(86, ["int"], lambda s: str(s[0]%10),
        [[749],[-12],[0],[10**12],[5],[1000]])
    # Q87 distance A to C
    add(87, ["int","int"], lambda s: str(s[0]+s[1]),
        [[120,80],[1,1],[10**6,10**6],[100,200],[50,50]])
    # Q88 budget left
    add(88, ["int","int","int","int"], lambda s: str(s[0]-s[1]-s[2]-s[3]),
        [[5000,1200,800,1500],[10**6,1,1,1],[1000,250,250,250],[777,100,100,100],[50,10,20,10]])
    # Q89 total parcel weight
    add(89, ["int","int","int"], lambda s: f"Total weight: {s[0]+s[1]+s[2]} kg",
        [[5,8,3],[1,1,1],[10**4,10**4,10**4],[10,20,30],[2,2,2]])
    # Q90 minutes to hours
    add(90, ["int"], lambda s: f"{s[0]//60} hours and {s[0]%60} minutes",
        [[135],[0],[10**9],[60],[59],[120]])
    # Q91 average and product
    add(91, ["int","int"], lambda s: repr((s[0]+s[1])/2)+"\n"+str(s[0]*s[1]),
        [[8,12],[0,0],[1,1],[10**6,10**6],[5,5]], out_is_float=True)
    # Q92 round trip
    add(92, ["int"], lambda s: str(s[0]*2),
        [[150],[1],[10**6],[0+1],[250]])
    # Q93 full pages
    add(93, ["int","int"], lambda s: str(s[0]//s[1]),
        [[150,40],[10**6,100],[1,1],[100,10],[50,7]])
    # Q94 delivery fee
    add(94, ["int","int"], lambda s: f"Grand total: {s[0]+s[1]}",
        [[1200,100],[1,0],[10**6,10000],[500,500],[10,10]])
    # Q95 circumference from diameter
    add(95, ["int"], lambda s: f"{3.14159*s[0]:.2f}",
        [[14],[1],[10**5],[10],[7],[100]])
    # Q96 sum a..b
    add(96, ["int","int"], lambda s: str((s[1]-s[0]+1)*(s[0]+s[1])//2),
        [[5,9],[1,10],[10**6,10**6],[-5,5],[-10**6,10**6],[7,7]])
    # Q97 power of two
    add(97, ["int"], lambda s: str((s[0] & (s[0]-1)) == 0),
        [[64],[1],[8],[16],[7],[3],[100],[2],[1024]])
    # Q98 reverse three-digit
    add(98, ["int"], lambda s: str((s[0]%10)*100+((s[0]//10)%10)*10+s[0]//100),
        [[372],[100],[999],[123],[505],[987]])
    # Q99 tens minus ones
    add(99, ["int"], lambda s: str(s[0]//10-s[0]%10),
        [[83],[10],[99],[50],[21],[90]])
    # Q100 final bill discount tax tip
    add(100, ["int","int","int","int"], lambda s: f"{s[0]*(100-s[1])/100*(100+s[2])/100*(100+s[3])/100:.2f}",
        [[2000,10,5,10],[10**6,0,0,0],[1,100,100,100],[1000,50,0,0],[500,20,10,5],[1000,10,5,15]])

    return Q

def build():
    Q = b1()
    output = {"batch": 1, "topics": ["Variables","Data Types","Operators","Input and Output"],
              "questions": []}
    for qid in sorted(Q):
        d = Q[qid]
        tests = []
        for vals in d["tests"]:
            inp = "\n".join(str(v) for v in vals) + "\n"
            if d["parse"] == ["str"]:
                expected = d["solve"]([vals[0]])
            else:
                # convert according to parse types
                converted = []
                for v, t in zip(vals, d["parse"]):
                    converted.append(float(v) if t == "float" else int(v) if t == "int" else str(v))
                res = d["solve"](converted)
                expected = res
            tests.append({"input": inp, "expected_output": expected})
        output["questions"].append({"question_id": qid, "tests": tests})
    return output

if __name__ == "__main__":
    import os
    data = build()
    # sanity: count
    assert len(data["questions"]) == 100, len(data["questions"])
    total = sum(len(q["tests"]) for q in data["questions"])
    print("questions:", len(data["questions"]), "total tests:", total)
    path = os.path.join(os.path.dirname(__file__), "hidden-tests.json")
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    print("wrote", path)
