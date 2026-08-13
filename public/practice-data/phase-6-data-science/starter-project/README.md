# Starter Project — Messy E-Commerce Data

The dataset the rest of Phase 6 is missing: **not clean**.

Modules 24–29 teach Pandas on tidy data. Real data is not tidy. This project gives you 3,060 order rows with eleven spellings of "missing", five date formats, prices stored as `"INR 1,140.67"`, duplicate rows, impossible ages, and a revenue column that disagrees with quantity × price.

Every number below was produced by running the code.

---

## Quick start

```bash
cd starter-project

python data/make_messy_data.py   # generate the raw files (deterministic)
python profile_raw.py            # look at the damage BEFORE cleaning
python src/clean.py              # the reference cleaning pipeline
python src/eda.py                # the analysis
python src/charts.py             # the report figures
```

> ⚠️ **Do not read `src/clean.py` first.** Run `profile_raw.py`, then attempt the cleaning yourself (Projects 1–2 in the [guides](../projects.md)). Reading the answer before trying costs you the entire lesson. The reference solution will still be there in two hours.
>

---

## What's in here

```
starter-project/
├── data/
│   ├── make_messy_data.py      ← generator; edit the defect rates to make it harder
│   ├── sales_raw.csv           ← 3,060 rows x 13 cols, everything is text
│   └── customers_raw.csv       ←   515 rows x  9 cols
├── profile_raw.py              ← run this first, always
├── src/
│   ├── clean.py                ← reference cleaning pipeline + CleaningLog
│   ├── eda.py                  ← the analysis that produces report numbers
│   └── charts.py               ← 5 report figures
└── figures/                    ← generated PNGs
```

---

## The damage, measured

`python profile_raw.py` output:

```
sales_raw.csv: 3,060 rows x 13 columns

-- dtypes as loaded --
order_id          object
order_date        object
quantity          object
unit_price        object
revenue           object       <- every single column is text
...

-- exact duplicate rows --
   60 (2.0%)

-- 'missing' disguised as text --
column           pandas NaN  text nulls  real total
order_date                0          41         41 ( 1.3%)
customer_id               0          98         98 ( 3.2%)
quantity                  0          58         58 ( 1.9%)
unit_price                0         151        151 ( 4.9%)
discount_pct              0         248        248 ( 8.1%)
revenue                   0         128        128 ( 4.2%)
payment_method            0          95         95 ( 3.1%)
delivery_days             0         211        211 ( 6.9%)
rating                    0         658        658 (21.5%)
```

**Look at the `pandas NaN` column: it is zero everywhere.** `df.isnull().sum()` reports a perfectly clean dataset. Every missing value is hiding as the *string* `"N/A"`, `"-"`, `"?"`, `"NULL"` or `""`. This single fact is why `df.isnull().sum()` is the most over-trusted line in data science.

Spelling drift:

```
category   20 unique: [' Books', 'Apparel', 'BOOKS', 'Books', 'CLOTHING',
                       'Clothing', 'ELECTRONICS', 'Electronics', 'Electronics ', ...]
city       31 unique   (Mumbai / mumbai / MUMBAI / ' Mumbai ' / Bombay)
gender     15 unique: ['-', '?', 'F', 'Female', 'M', 'Male', 'N/A', 'NA', ...]
is_premium 10 unique: ['0', '1', 'FALSE', 'N', 'No', 'TRUE', 'Y', 'Yes', 'no', 'yes']
```

Five categories became 20. Eight cities became 31. `groupby("category")` on this returns 20 groups and every number is wrong.

Dates and money:

```
unparseable dates: 156 of 3060
formats present: '2024-12-19'  '20/10/2024'  'January 13, 2025'
                 '26-Apr-24'   '02/01/2025'  '2024-13-45'

unit_price examples: ['INR 1,140.67', '1,390.92', '603.58', 'Rs. 598.67',
                      ' 599.22 ', '1270', 'INR 2,642.34']
pd.to_numeric(unit_price) -> 1043 of 3060 succeed (2017 lost)
```

**Naive parsing silently destroys two-thirds of your revenue data.** It does not raise; it returns `NaN` and your totals are quietly wrong.

---

## The reference pipeline

`python src/clean.py`:

```
step                                  rows  detail
------------------------------------------------------------------------
loaded                                3060  raw rows
dropped exact duplicates                60
unparseable dates -> NaT               154
dates beyond business window            16  likely mm/dd misread as dd/mm
impossible quantity -> NaN              47  <=0 or >100
impossible delivery_days -> NaN         65  <0 or >30
out-of-range rating -> NaN             113  outside 1-5
revenue != qty x price                  84  >5% off expected
revenue recomputed                     477
loaded customers                       515
dropped duplicate customers             15
impossible age -> NaN                    5  <13 or >100
merged sales x customers              3000  97 orders unmatched
```

The `CleaningLog` class exists because **a cleaning step you cannot describe is a cleaning step you cannot defend.** When someone asks "why is revenue lower than the finance report?", this log is your answer.

> Generated figure: `figures/01-cleaning-impact.png` (appears after you run the chart pipeline).

---

## Two bugs this project caught (in my own pipeline)

These were both found by running the code, and both are preserved because they are the most instructive part of the project.

### 1. Nulling one column invalidated another

The pipeline nulls `quantity` when it is impossible (`500`, `-2`, `0`). But `revenue` was *derived* from that bad quantity. Nulling only `quantity` left the inflated revenue in place — **and** it escaped the cross-check, because `expected = quantity × price` became `NaN`, so the comparison was skipped entirely.

Result: **17 orders held 59.1% of total revenue.** The largest was ₹29,67,539 in a dataset whose maximum plausible order is about ₹44,000.

```python
# WRONG — revenue survives
df.loc[bad_qty, "quantity"] = np.nan

# RIGHT — a derived value dies with its input
df.loc[bad_qty, ["quantity", "revenue"]] = np.nan
```

After the fix: max order ₹39,146, mean/median ratio 3.66 → **1.52**.

> ⚠️ Whenever you null a column, ask what else was computed *from* it. Derived columns do not know their input became invalid.
>

### 2. dd/mm vs mm/dd is unresolvable from the data

`'01/08/2025'` is 1 August under `dayfirst=True` and 8 January under US convention. The generator emits both formats. Parsing everything as dd/mm pushed **16 orders into months after the data ends**, producing a fake 98% revenue collapse in the monthly trend.

```
2025-06-01      157  417799.0     369618.0    20.0
2025-07-01        5    9716.0     258070.0   -98.0   <- not real
2025-08-01        3    5516.0     144344.0   -43.0   <- not real
```

There is **no way to fix this from the data alone** — you have to ask whoever produced the file. The honest response is to detect and flag it:

```python
window_end = pd.Timestamp("2025-06-30")
df["date_ambiguous"] = df["order_date"] > window_end
```

The EDA then excludes those rows and says so. A plausible-looking chart with a fake cliff in it is worse than a chart with a footnote.

---

## Analysis findings

`python src/eda.py`:

| Metric | Value |
| --- | --- |
| Orders | 3,000 |
| Date range | 2024-01-01 to 2025-06-29 |
| Total revenue | ₹83,67,710 |
| Mean order value | ₹2,985 |
| **Median order value** | **₹1,967** |
| Unique customers | 499 |
| Mean rating | 3.67 (from 2,242 rated orders) |

Mean is **1.52×** the median — right-skewed. Report the median as the typical order.

```
             orders    revenue  avg_order  avg_rating  rev_share_%
Electronics     601  3006289.0     5320.9         3.7         35.9
Home            618  1940328.8     3345.4         3.7         23.2
Clothing        566  1749938.1     3314.3         3.8         20.9
Books           635   950142.9     1615.9         3.6         11.4
Grocery         580   721011.4     1330.3         3.7          8.6
```

Electronics: **36% of revenue from 20% of orders.**

By city, the picture is flatter than the classic Pareto story:

```
           orders    revenue  avg_order  cum_share_%
Mumbai        818  2384948.0     3130.0         28.0
Ahmedabad     402  1139596.0     2991.0         42.0
Kolkata       393  1081499.0     2899.0         55.0
Delhi         386  1070216.0     2989.0         68.0
Chennai       368   984099.0     2877.0         80.0
Bengaluru     334   862602.0     2765.0         90.0
Hyderabad     299   844749.0     3072.0        100.0
```

It takes **6 of 7 cities** to reach 80% of revenue, and average order value barely varies (₹2,765–₹3,130). Mumbai leads on **volume**, not on customer value. Those are two different business conclusions, and only the second one is true here.

> Generated figure: `figures/03-category-city.png` (appears after you run the chart pipeline).

### Three honest null results

Good analysis reports what *isn't* there. All three of these are real:

```
correlation(delivery_days, rating) = -0.0201
```

Delivery speed does **not** predict rating here. 1–2 day deliveries average 3.72; 7+ day deliveries average 3.65.

```
            orders  avg_order  avg_rating
is_premium
False         1446    2928.41        3.70
True          1457    3087.16        3.64
```

Premium customers spend 5% more and rate slightly *lower*. Not the story anyone wants.

```
                orders  avg_order  avg_delivery  avg_rating
Credit Card        827    2842.48          3.59        3.66
Net Banking        534    3011.53          3.70        3.68
UPI                521    2950.16          3.48        3.76
```

Payment method barely moves anything.

> Generated figure: `figures/05-null-result-and-missingness.png` (appears after you run the chart pipeline).

**Resisting the urge to find a story in noise is the skill.** A junior analyst reports "UPI users rate 0.10 higher!". A good one checks whether 0.10 on a 5-point scale across 521 orders means anything, and reports that it does not.

---

## Caveats the report must state

```
orders with no revenue figure : 197 (6.6%)
orders with unparseable date  : 154
orders with no rating         : 758 (25.3%)
orders not matched to customer: 97
revenue figures recomputed    : 84
ambiguous dd/mm vs mm/dd dates: 16
```

The rating gap matters most: **1 in 4 orders has no rating, and that missingness is almost certainly not random.** Unhappy customers often just don't rate. So 3.67 is an **upper bound**, not an estimate — a sentence that belongs in the report.

---

## Making it harder

`data/make_messy_data.py` is yours to edit. Raise the defect rates, add new ones:

```python
maybe_null(value, rng, 0.02)   # -> 0.20 for brutal missingness
```

Ideas: negative prices, a `country` column that is 99% "India" and 1% "india ", timestamps in two timezones, a customer ID that changes format halfway through the file, and free-text address fields.

---

## Known limitations

- **Synthetic.** Defects were injected deliberately, so they are findable. Real data hides worse ones — and sometimes the "defect" is the actual business logic.
- **Small.** 3,060 rows fits in memory instantly. At 50 million rows, `df.apply()` becomes a two-hour problem and the techniques change.
- **No ground truth for the ambiguous dates.** By design — that's the lesson.
- **Cleaning decisions are opinions.** Nulling ratings outside 1–5 assumes the scale is 1–5. If the business used 0–10 for one quarter, this pipeline is destroying valid data. Always ask.

---

[← Phase 6 index](../README.md) · [Project guides →](../projects.md)
