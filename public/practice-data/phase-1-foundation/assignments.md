# 📋 Phase 1 — Assignments

Five graded assignments for **Modules 1–4**. Each takes 1–3 hours and produces a program you can run and show someone.

**Constraints for every assignment in this phase:**

- Use **only** Phase 1 material — variables, `input()`, `print()`, type casting, operators, `if`/`elif`/`else`, `for`, `while`, `range()`, `break`/`continue`.
- **No lists, no functions, no imports.** Tracking a running total instead of collecting a list is the exercise.
- Every program must survive bad input without crashing.

> 💡 **Tip:** Before writing code, write the program's output on paper — exactly what it prints, line by line, for one example run. Programs written output-first are shorter and have fewer branches than programs written logic-first.
>

---

## 📋 Assignment 1 — Personal Finance Calculator

**Builds on:** Q4–Q12, Q24, Q31

**Scenario.** A one-screen tool that answers the money questions a salaried person actually asks.

### Tasks

- [ ] 1. **Take input** for monthly income, monthly expenses, an existing savings amount, and a savings goal.

- [ ] 2. **Compute and display:** monthly surplus, annual surplus, savings rate as a percentage to 1 decimal, and how many months to reach the goal. Format all currency with `₹` and comma separators — `₹1,455,300`, not `1455300`.

- [ ] 3. **Compound interest projection.** Ask for an annual interest rate. Show the savings balance after 1, 3, 5 and 10 years using `A = P(1 + r/100)^t`, each to 2 decimals.

   Verify with the practice question: ₹100,000 at 8% for 5 years = **146,932.81**.

- [ ] 4. **Income tax.** Compute tax using the Q31 cumulative slabs — 0% to ₹2.5L, 5% to ₹5L, 20% to ₹10L, 30% above.

   Verify: an income of ₹12,00,000 must produce exactly **₹172,500.00**.

- [ ] 5. **A verdict** using `if`/`elif`/`else`: savings rate above 30% is "Excellent", 20–30% "Good", 10–20% "Needs improvement", below 10% "At risk". If expenses exceed income, print a deficit warning instead.

- [ ] 6. **Input validation.** Negative income, negative expenses and a zero savings goal must each produce a clear message rather than a crash or a nonsense number.

### Marking guide

| Criterion | Weight |
| --- | --- |
| All six calculations correct | 30% |
| Tax slabs produce ₹172,500 on ₹12L | 20% |
| Currency formatted with `₹` and separators | 15% |
| Verdict logic covers every branch including deficit | 20% |
| Invalid input handled without crashing | 15% |

### Self-check

Enter expenses higher than income. If your program prints "months to goal: -14" you have not handled the deficit case — a negative surplus makes the goal unreachable, and the program must say so.

---

## 📋 Assignment 2 — Number Theory Explorer

**Builds on:** Q40–Q50

**Scenario.** A menu-driven tool that answers questions about a number. This is the assignment that builds loop fluency.

### Tasks

- [ ] 1. **A menu loop** offering eight operations, redisplaying after each, and exiting cleanly on choice 9.

- [ ] 2. **Implement each operation** on a user-supplied number:
   - Prime check, optimised to stop at √n. Verify `97` is prime.
   - All factors, and the count of them
   - Prime factorisation — `84` gives `2 × 2 × 3 × 7`
   - Factorial. Verify `6! = 720`, reject negatives
   - Digit count, digit sum and the number reversed. Verify `94721` gives `5`, `23`, `12749`
   - Armstrong check. Verify `9474` is Armstrong and `9475` is not
   - Perfect number check. Verify `28` is perfect
   - Collatz sequence with the step count. Verify `6` takes **8** steps

- [ ] 3. **A range mode.** Given two bounds, list every prime between them and count them. Verify: 10 to 50 gives **11 primes**, ending 47.

- [ ] 4. **Handle every edge case:** 0, 1, and negative numbers behave sensibly for every operation. State in a comment why 1 is neither prime nor composite.

- [ ] 5. **Track and display** how many calculations the user has performed when they exit.

### Marking guide

| Criterion | Weight |
| --- | --- |
| Menu loops correctly and exits cleanly | 15% |
| All eight operations produce the verified values | 40% |
| Prime check stops at √n, not n | 10% |
| Range mode finds 11 primes between 10 and 50 | 15% |
| Edge cases 0, 1 and negatives all handled | 20% |

### Self-check

Enter `1` for every operation. Factorial should give 1, prime check should say no, factors should give just `1`, and Collatz should terminate immediately. If any of those loops forever, your termination condition is wrong.

---

## 📋 Assignment 3 — Pattern Printing Portfolio

**Builds on:** Q51–Q56, Q60

**Scenario.** Twelve patterns, all driven by one user-supplied size. Pure nested-loop practice — no data structures can help you here.

### Tasks

- [ ] 1. **A menu** taking the pattern number and the size `n`, then printing it.

- [ ] 2. **Print all twelve:**
   - Right triangle of stars
   - Inverted right triangle
   - Left-aligned triangle (right-justified with spaces)
   - Centred pyramid
   - Inverted pyramid
   - Diamond (pyramid plus inverted pyramid)
   - Hollow square (border only)
   - Hollow triangle
   - Number triangle (`1` / `1 2` / `1 2 3`)
   - Floyd's triangle (continuous numbering)
   - Pascal's triangle, centred — computed with `value = value * (row - col) // (col + 1)`, since you have no lists
   - The multiplication grid from Q60, with aligned headers and separator lines

- [ ] 3. **Every pattern must work for n = 1 and n = 15**, not just n = 5. Test both.

- [ ] 4. **Alignment matters.** Use `f"{value:>5}"` style formatting so multi-digit numbers stay in their columns. A grid that breaks at n = 12 because 144 is three characters is not finished.

- [ ] 5. **A "print all" option** that displays every pattern for the chosen size in sequence.

### Marking guide

| Criterion | Weight |
| --- | --- |
| All twelve patterns correct at n = 5 | 40% |
| All twelve still correct at n = 1 and n = 15 | 25% |
| Pascal's triangle computed without lists | 15% |
| Multi-digit alignment holds | 10% |
| Menu with a print-all option | 10% |

### Self-check

Run Pascal's triangle at n = 10. Row 10 contains `126` — three digits. If your rows stop lining up, your padding is based on single-digit assumptions.

---

## 📋 Assignment 4 — ATM Simulator

**Builds on:** Q57

**Scenario.** The full version of practice Q57. A stateful program with authentication, validation and a transaction log — all without lists.

### Tasks

- [ ] 1. **Authentication.** A hard-coded PIN of `1234`, three attempts, then lock and exit with a clear message. Show the attempts remaining after each failure.

- [ ] 2. **A menu:** Check Balance, Deposit, Withdraw, Change PIN, Mini Statement, Exit. Starting balance ₹10,000.

- [ ] 3. **Deposit rules.** Must be positive, must be a multiple of 100, single deposit capped at ₹50,000. Reject each violation with a specific message — not one generic "invalid".

- [ ] 4. **Withdrawal rules.** Must be positive, a multiple of 100, not exceed the balance, not exceed ₹20,000 per transaction, and must leave a minimum balance of ₹500.

- [ ] 5. **Change PIN.** Require the old PIN, require the new PIN twice, and reject a new PIN that is not exactly 4 digits or is the same as the old one.

- [ ] 6. **Mini statement without lists.** Track the last three transactions using individual variables (`txn1_type`, `txn1_amount`, and so on), shifting them along on each new transaction. This constraint is the point of the exercise.

- [ ] 7. **On exit,** display: total transactions, total deposited, total withdrawn, and the closing balance.

### Marking guide

| Criterion | Weight |
| --- | --- |
| PIN lockout after exactly 3 attempts | 15% |
| All five withdrawal rules enforced separately | 25% |
| Deposit rules with specific messages | 15% |
| PIN change validated fully | 15% |
| Mini statement works using only variables | 20% |
| Exit summary correct | 10% |

### Self-check

Withdraw ₹9,600 from ₹10,000. It must be **rejected** — it leaves ₹400, below the ₹500 minimum. If it succeeds, you have checked `amount <= balance` instead of `balance - amount >= 500`.

---

## 📋 Assignment 5 — Student Report Card System

**Builds on:** Q58, Q59

**Scenario.** Process marks for several students, one after another, producing a formatted report — with no lists to store anything.

### Tasks

- [ ] 1. **Ask how many students**, then loop through them one at a time.

- [ ] 2. **For each student:** take a name, then marks in five subjects. Validate each mark is 0–100, re-asking for that same subject on invalid input.

- [ ] 3. **Per-student output:** total out of 500, percentage to 2 decimals, grade using the Q27 scale, pass/fail (all subjects ≥ 40), and the highest and lowest mark entered.

   Verify with the practice example: `78, 85, 92, 71, 75` gives total **401**, percentage **80.20**, grade **A**, highest **92**, lowest **71**.

- [ ] 4. **Running class statistics**, maintained without lists: class average, the topper's name and percentage, the lowest scorer, and counts of pass and fail.

- [ ] 5. **A formatted results table** printed as each student is processed, with aligned columns:

   ```
   Name          Total  Percent  Grade  Result
   ------------------------------------------
   Rohan           401    80.20      A    PASS
   ```

- [ ] 6. **A final summary:** class average to 2 decimals, topper, number passed, number failed, and the pass percentage.

- [ ] 7. **Handle the awkward cases:** zero students entered, and a single student (who is simultaneously topper and lowest).

### Marking guide

| Criterion | Weight |
| --- | --- |
| Per-subject validation re-asks correctly | 20% |
| The verification example produces 401 / 80.20 / A | 20% |
| Running statistics maintained without lists | 25% |
| Table columns aligned | 15% |
| Final summary correct | 10% |
| Zero-student and one-student cases handled | 10% |

### Self-check

Enter one student. They must appear as both topper and lowest scorer, and the class average must equal their percentage exactly. Programs that assume "at least two" break here.

---

## Grading yourself

- [ ] 1. **The self-checks target the specific failure** that makes each assignment wrong in a way that still *looks* like it works.
- [ ] 2. **Test the boundaries.** n = 1, zero students, exactly ₹500 remaining, a PIN attempt on the third try. Off-by-one errors live at boundaries.
- [ ] 3. **Rebuild one a week later.** If Assignment 4 takes you as long the second time, you memorised the structure rather than learning the logic.

> ⚠️ The constraint that makes this phase work is **no lists and no functions**. It will feel artificial — and it is — but tracking a running maximum in a variable, shifting three transaction slots by hand, and computing Pascal's triangle from the previous value all force you to *hold state deliberately*. Once Phase 2 gives you lists, you will use them knowing exactly what they save you.
>

---

[← Phase 1 index](README.md) · [Practice Questions](questions.md)
