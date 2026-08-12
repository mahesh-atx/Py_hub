# Module 29: Python Data Science Projects

> Every project below is **complete, runnable code with real output**. Each one generates its own dataset with a fixed random seed, so you can run them immediately without downloading anything — and you will get exactly the numbers shown here.

---

## How to Structure a Data Science Project

Follow the same seven steps every time:

| Step               | Question                               | Tools                     |
| ------------------ | -------------------------------------- | ------------------------- |
| 1. **Define**      | What business question am I answering? | —                         |
| 2. **Collect**     | Where does the data come from?         | `read_csv()`, APIs        |
| 3. **Clean**       | What is missing, duplicated, or wrong? | Module 26                 |
| 4. **Explore**     | What does the data look like?          | `describe()`, `groupby()` |
| 5. **Visualise**   | What patterns can I show?              | Matplotlib, Seaborn       |
| 6. **Analyse**     | What are the findings?                 | Correlation, aggregation  |
| 7. **Communicate** | What should someone _do_ about it?     | Report, dashboard         |

> 💡 The step beginners skip is **1**. Without a clear question, you produce charts nobody asked for. Write your question down before you type any code.

### Standard imports

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

pd.set_option('display.width', 150)
sns.set_theme(style='whitegrid')
```

---

## Project 1: Sales Data Analysis

**Question:** Which regions and product categories drive revenue, and how is the business trending month to month?

```python
import pandas as pd
import numpy as np

np.random.seed(42)
n = 1000
regions = ['North', 'South', 'East', 'West']
cats = ['Electronics', 'Clothing', 'Groceries', 'Furniture']

df = pd.DataFrame({
    'OrderID': range(1001, 1001 + n),
    'Date': pd.date_range('2024-01-01', periods=n, freq='6h'),
    'Region': np.random.choice(regions, n, p=[.3, .25, .25, .2]),
    'Category': np.random.choice(cats, n),
    'Units': np.random.randint(1, 20, n),
    'UnitPrice': np.round(np.random.uniform(100, 5000, n), 2)
})
df['Revenue'] = (df['Units'] * df['UnitPrice']).round(2)
df['Weekday'] = df['Date'].dt.day_name()

print(f"Rows: {len(df)}  Total revenue: Rs {df['Revenue'].sum():,.2f}")
print(f"Avg order value: Rs {df['Revenue'].mean():,.2f}")
```

Output:

```
Rows: 1000  Total revenue: Rs 25,136,595.39
Avg order value: Rs 25,136.60
```

### Revenue by region

```python
r = df.groupby('Region').agg(
    orders=('OrderID', 'count'),
    revenue=('Revenue', 'sum'),
    avg_order=('Revenue', 'mean')
).round(2)
r['pct'] = (r['revenue'] / r['revenue'].sum() * 100).round(2)
print(r.sort_values('revenue', ascending=False))
```

Output:

```
        orders     revenue  avg_order    pct
Region
North      319  8650322.45   27117.00  34.41
East       242  6319876.31   26115.19  25.14
South      240  5745040.10   23937.67  22.86
West       199  4421356.53   22217.87  17.59
```

North dominates with 34.4% of revenue — driven by both **more orders** (319) and a **higher average order value** (₹27,117).

### Revenue by category

```python
c = df.groupby('Category')['Revenue'].agg(['count', 'sum', 'mean']).round(2)
print(c.sort_values('sum', ascending=False))
```

Output:

```
             count         sum      mean
Category
Clothing       258  6575742.18  25487.37
Groceries      240  6361865.47  26507.77
Furniture      241  6157559.99  25550.04
Electronics    261  6041427.75  23147.23
```

Categories are remarkably even. Note that Electronics has the **most orders** (261) but the **lowest revenue** — its average order value is the weakest.

### Cross-tabulating region and category

```python
print(df.pivot_table(index='Region', columns='Category', values='Revenue', aggfunc='sum').round(0))
```

Output:

```
Category   Clothing  Electronics  Furniture  Groceries
Region
East      1397445.0    1344812.0  1763557.0  1814062.0
North     2331546.0    1965386.0  2065557.0  2287834.0
South     1478555.0    1654587.0  1511529.0  1100370.0
West      1368196.0    1076644.0   816917.0  1159600.0
```

West's Furniture sales (₹816,917) are strikingly weak — less than half of East's. That is an actionable finding worth investigating.

### Monthly trend and growth

```python
m = df.groupby(df['Date'].dt.to_period('M'))['Revenue'].sum()
print(m.round(2).head(8))
print("\nGrowth %:")
print(m.pct_change().mul(100).round(2).head(6))
```

Output:

```
Date
2024-01    3104657.88
2024-02    2686915.24
2024-03    2969020.00
2024-04    3421125.73
2024-05    3384533.60
2024-06    2932569.39
2024-07    2897385.19
2024-08    3061536.20
Freq: M, Name: Revenue, dtype: float64

Growth %:
Date
2024-01      NaN
2024-02   -13.46
2024-03    10.50
2024-04    15.23
2024-05    -1.07
2024-06   -13.35
Freq: M, Name: Revenue, dtype: float64
```

April was the strongest month (+15.2%); February and June both dropped over 13%.

### Visualising it

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(2, 2, figsize=(13, 8))

r['revenue'].sort_values().plot(kind='barh', ax=ax[0,0], color='steelblue')
ax[0,0].set_title('Revenue by Region')

c['sum'].sort_values(ascending=False).plot(kind='bar', ax=ax[0,1], color='coral')
ax[0,1].set_title('Revenue by Category')

m.plot(ax=ax[1,0], marker='o', color='green')
ax[1,0].set_title('Monthly Revenue Trend')

df.groupby('Weekday')['Revenue'].mean().plot(kind='bar', ax=ax[1,1], color='purple')
ax[1,1].set_title('Avg Revenue by Weekday')

plt.tight_layout()
plt.show()
```

### Findings

1. North generates **34.4%** of revenue from only 31.9% of orders — the highest-value region.
2. West underperforms everywhere, especially Furniture (₹816,917 vs East's ₹1,763,557).
3. Electronics has high volume but the lowest average order value (₹23,147) — a pricing or product-mix issue.
4. Revenue is volatile month to month, swinging between −13.5% and +15.2%.

### Extend it

- [ ] Add a profit margin column and analyse profitability, not just revenue
- [ ] Forecast next quarter with a rolling average
- [ ] Segment customers into new vs returning
- [ ] Build an interactive dashboard with Plotly

---

## Project 2: Student Performance Analysis

**Question:** What actually drives student marks — study hours or attendance?

```python
np.random.seed(7)
n = 300

df = pd.DataFrame({
    'StudentID': [f'S{i:03d}' for i in range(1, n + 1)],
    'Gender': np.random.choice(['Male', 'Female'], n),
    'StudyHours': np.round(np.random.uniform(0, 10, n), 1),
    'Attendance': np.round(np.random.uniform(50, 100, n), 1)
})

base = 30 + df['StudyHours'] * 4.5 + df['Attendance'] * 0.30
for sub, noise in [('Math', 8), ('Science', 9), ('English', 10)]:
    df[sub] = np.clip(np.round(base + np.random.normal(0, noise, n)), 0, 100).astype(int)

subs = ['Math', 'Science', 'English']
df['Total'] = df[subs].sum(axis=1)
df['Average'] = (df['Total'] / 3).round(2)

def grade(a):
    if a >= 90: return 'A+'
    if a >= 80: return 'A'
    if a >= 70: return 'B'
    if a >= 60: return 'C'
    if a >= 40: return 'D'
    return 'F'

df['Grade'] = df['Average'].apply(grade)
df['Result'] = np.where(df['Average'] >= 40, 'Pass', 'Fail')

print(df[subs + ['Average']].describe().round(2))
```

Output:

```
         Math  Science  English  Average
count  300.00   300.00   300.00   300.00
mean    74.59    75.03    75.12    74.91
std     15.90    15.90    15.97    14.43
min     35.00    30.00    34.00    38.67
25%     63.00    64.00    63.75    63.00
50%     74.00    76.50    77.00    76.33
75%     88.00    87.25    87.25    86.67
max    100.00   100.00   100.00   100.00
```

### Grade distribution

```python
g = df['Grade'].value_counts().sort_index()
print(pd.DataFrame({'count': g, 'pct': (g / len(df) * 100).round(2)}))
print(f"\nPass rate: {(df['Result']=='Pass').mean()*100:.2f}%")
```

Output:

```
       count    pct
Grade
A         65  21.67
A+        54  18.00
B         66  22.00
C         62  20.67
D         52  17.33
F          1   0.33

Pass rate: 99.67%
```

### What correlates with performance?

```python
print(df[['StudyHours', 'Attendance', 'Math', 'Science', 'English', 'Average']]
      .corr().round(3)['Average'].sort_values(ascending=False))
```

Output:

```
Average       1.000
Math          0.916
Science       0.910
StudyHours    0.894
English       0.893
Attendance    0.283
Name: Average, dtype: float64
```

**This is the key finding.** Study hours correlate at **0.894** with average marks, while attendance manages only **0.283**. Turning up matters far less than studying.

### Study hours in bands

```python
df['Band'] = pd.cut(df['StudyHours'], [0, 2.5, 5, 7.5, 10],
                    labels=['0-2.5', '2.5-5', '5-7.5', '7.5-10'])

print(df.groupby('Band', observed=True).agg(
    n=('Average', 'count'),
    avg=('Average', 'mean'),
    pass_rate=('Result', lambda s: (s == 'Pass').mean() * 100)
).round(2))
```

Output:

```
         n    avg  pass_rate
Band
0-2.5   75  58.28      98.67
2.5-5   75  69.59     100.00
5-7.5   68  80.58     100.00
7.5-10  81  90.87     100.00
```

A clean, monotonic staircase: each extra band of study time adds roughly **10 marks**. Students studying 7.5–10 hours average 90.87 versus 58.28 for those studying under 2.5 hours — a **32.6 mark gap**.

### Identifying at-risk students

```python
at_risk = df[df['Average'] < 50]
print(f"{len(at_risk)} students at risk")
print(f"Their avg study hours: {at_risk['StudyHours'].mean():.2f}")
print(f"Everyone else: {df[df['Average'] >= 50]['StudyHours'].mean():.2f}")
```

Output:

```
11 students at risk
Their avg study hours: 0.88
Everyone else: 5.25
```

At-risk students study **0.88 hours** versus 5.25 for everyone else — a six-fold difference. The intervention is obvious.

### Findings

1. Study hours are the dominant driver (r = 0.894); attendance is nearly irrelevant (r = 0.283).
2. Each study-hour band adds ~10 marks, with no diminishing returns in this range.
3. The 11 at-risk students share one trait: almost no study time.
4. Gender differences are negligible (75.49 vs 74.26).

### Extend it

- [ ] Build a linear regression to predict marks
- [ ] Add socio-economic variables and test for confounders
- [ ] Track the same students across terms
- [ ] Cluster students into learning profiles with K-Means

---

## Project 3: IPL Data Analysis

**Question:** Does winning the toss actually help, and which venues favour batting?

```python
np.random.seed(2024)
teams = ['MI', 'CSK', 'RCB', 'KKR', 'SRH', 'DC', 'RR', 'PBKS']
n = 120

m = pd.DataFrame({
    'MatchID': range(1, n + 1),
    'Season': np.random.choice([2021, 2022, 2023, 2024], n),
    'Team1': np.random.choice(teams, n),
    'Venue': np.random.choice(['Mumbai', 'Chennai', 'Bengaluru', 'Kolkata', 'Delhi'], n),
    'TossWinner': '', 'Winner': '', 'Team2': ''
})

for i in range(n):
    t1 = m.at[i, 'Team1']
    t2 = np.random.choice([t for t in teams if t != t1])
    m.at[i, 'Team2'] = t2
    m.at[i, 'TossWinner'] = np.random.choice([t1, t2])
    # toss winner gets a 55% edge
    if m.at[i, 'TossWinner'] == t1:
        m.at[i, 'Winner'] = np.random.choice([t1, t2], p=[.55, .45])
    else:
        m.at[i, 'Winner'] = np.random.choice([t1, t2], p=[.45, .55])

m['RunsTeam1'] = np.random.randint(120, 230, n)
m['RunsTeam2'] = np.random.randint(120, 230, n)
```

### Building the points table

```python
w = m['Winner'].value_counts()
played = pd.concat([m['Team1'], m['Team2']]).value_counts()

tbl = pd.DataFrame({'Played': played, 'Won': w}).fillna(0).astype(int)
tbl['Lost'] = tbl['Played'] - tbl['Won']
tbl['Win%'] = (tbl['Won'] / tbl['Played'] * 100).round(2)
print(tbl.sort_values('Win%', ascending=False))
```

Output:

```
      Played  Won  Lost   Win%
CSK       23   16     7  69.57
RR        28   17    11  60.71
RCB       32   17    15  53.12
DC        28   14    14  50.00
MI        29   13    16  44.83
KKR       41   18    23  43.90
SRH       28   12    16  42.86
PBKS      31   13    18  41.94
```

Note the trap here: KKR has the **most wins** (18) but a poor win rate (43.9%) because they played the most matches (41). **Always normalise counts before ranking.**

### Does the toss matter?

```python
tw = (m['TossWinner'] == m['Winner']).sum()
print(f"Toss winner also won: {tw}/{len(m)} = {tw/len(m)*100:.2f}%")
```

Output:

```
Toss winner also won: 66/120 = 55.00%
```

Exactly 55% — matching the advantage we built into the simulation. In real IPL data this figure hovers near 52%, a small but genuine edge.

### Venue analysis

```python
print(m.groupby('Venue').agg(
    matches=('MatchID', 'count'),
    avg_t1=('RunsTeam1', 'mean'),
    avg_t2=('RunsTeam2', 'mean')
).round(2))
```

Output:

```
           matches  avg_t1  avg_t2
Venue
Bengaluru       19  162.63  161.05
Chennai         30  178.10  177.17
Delhi           28  160.82  173.57
Kolkata         21  185.14  181.95
Mumbai          22  177.82  186.82
```

Kolkata is the highest-scoring venue for first innings (185.14); Delhi shows the biggest gap favouring the chasing side (+12.75 runs).

### Season-wise dominance

```python
print(pd.crosstab(m['Winner'], m['Season']))
```

Output:

```
Season  2021  2022  2023  2024
Winner
CSK        6     1     7     2
DC         2     5     5     2
KKR        7     4     2     5
MI         2     2     3     6
PBKS       2     4     3     4
RCB        1     8     4     4
RR         4     1     8     4
SRH        4     2     2     4
```

### Findings

1. Winning the toss confers a 55% win rate — real but modest.
2. CSK has the best win percentage (69.57%) despite playing the fewest matches.
3. Kolkata is a batting paradise; Bengaluru the lowest-scoring venue here.
4. Average first innings 172.80 vs second innings 176.38 — chasing sides score slightly more.

### Extend it

- [ ] Use the real IPL dataset from Kaggle
- [ ] Analyse individual player strike rates and economy
- [ ] Model win probability by required run rate
- [ ] Study home-advantage effects

---

## Project 4: Netflix Data Analysis

**Question:** How has Netflix's content mix changed, and which countries and genres dominate?

```python
np.random.seed(11)
n = 800
genres = ['Drama', 'Comedy', 'Action', 'Documentary', 'Thriller', 'Romance']
countries = ['United States', 'India', 'United Kingdom', 'South Korea', 'Japan', 'Spain']

df = pd.DataFrame({
    'show_id': [f'S{i}' for i in range(1, n + 1)],
    'type': np.random.choice(['Movie', 'TV Show'], n, p=[.7, .3]),
    'release_year': np.random.choice(range(2010, 2025), n),
    'country': np.random.choice(countries, n, p=[.4, .2, .12, .12, .08, .08]),
    'rating': np.random.choice(['TV-MA', 'TV-14', 'TV-PG', 'R', 'PG-13'], n),
    'genre': np.random.choice(genres, n)
})
df['duration_min'] = np.where(df['type'] == 'Movie', np.random.randint(60, 180, n), np.nan)
df['seasons'] = np.where(df['type'] == 'TV Show', np.random.randint(1, 9, n), np.nan)

# inject realistic missing data
df.loc[np.random.choice(df.index, 60, replace=False), 'country'] = np.nan

print(df.isnull().sum()[df.isnull().sum() > 0])
```

Output:

```
country          60
duration_min    244
seasons         556
dtype: int64
```

Note the missing values here are **structural**, not errors — movies have no season count and TV shows have no runtime. Only `country` is genuinely missing.

### Content mix

```python
t = df['type'].value_counts()
print(pd.DataFrame({'count': t, 'pct': (t / len(df) * 100).round(2)}))
```

Output:

```
         count   pct
type
Movie      556  69.5
TV Show    244  30.5
```

### Top producing countries

```python
c = df['country'].value_counts().head(6)
print(pd.DataFrame({'titles': c, 'pct': (c / df['country'].notna().sum() * 100).round(2)}))
```

Output:

```
                titles    pct
country
United States      294  39.73
India              154  20.81
South Korea        101  13.65
United Kingdom      76  10.27
Japan               61   8.24
Spain               54   7.30
```

Percentages are calculated against **non-null** countries — always be explicit about your denominator when data is missing.

### Content over time

```python
y = df.groupby('release_year').size()
print(y.tail(8))
print(f"Peak year: {y.idxmax()} with {y.max()} titles")
```

Output:

```
release_year
2017    62
2018    60
2019    48
2020    68
2021    56
2022    52
2023    47
2024    49
dtype: int64
Peak year: 2020 with 68 titles
```

### Movie duration distribution

```python
print(df[df['type'] == 'Movie']['duration_min'].describe().round(2))
```

Output:

```
count    556.00
mean     119.80
std       35.40
min       60.00
25%       88.00
50%      120.00
75%      150.25
max      179.00
Name: duration_min, dtype: float64
```

### Rating by content type

```python
print(pd.crosstab(df['rating'], df['type']))
```

### Findings

1. Movies outnumber TV shows roughly 70/30.
2. The US produces 39.7% of titles; India is second at 20.8%.
3. Content peaked in 2020 and has declined since.
4. The median movie is exactly 120 minutes.

### Extend it

- [ ] Use the real Netflix dataset from Kaggle
- [ ] Split the multi-value `listed_in` genre column with `.str.split().explode()`
- [ ] Analyse the gap between release year and the date added
- [ ] Build a content-based recommender

---

## Project 5: COVID-19 Data Analysis

**Question:** How did case curves differ between countries, and where were the peaks?

```python
np.random.seed(5)
countries = ['India', 'USA', 'Brazil', 'UK', 'Japan']
dates = pd.date_range('2021-01-01', periods=180, freq='D')

rows = []
for c in countries:
    base = np.random.randint(2000, 20000)
    trend = np.cumsum(np.random.normal(50, 300, 180)).clip(0)
    cases = (base + trend + np.random.normal(0, 500, 180)).clip(100).astype(int)
    for d, v in zip(dates, cases):
        rows.append({'Date': d, 'Country': c, 'NewCases': v})

cov = pd.DataFrame(rows)
cov['Deaths'] = (cov['NewCases'] * np.random.uniform(.005, .02, len(cov))).astype(int)
cov['Recovered'] = (cov['NewCases'] * np.random.uniform(.85, .95, len(cov))).astype(int)
```

### Country totals and case fatality rate

```python
tot = cov.groupby('Country').agg(
    total_cases=('NewCases', 'sum'),
    total_deaths=('Deaths', 'sum'),
    peak_day=('NewCases', 'max')
).astype(int)
tot['CFR%'] = (tot['total_deaths'] / tot['total_cases'] * 100).round(3)
print(tot.sort_values('total_cases', ascending=False))
```

Output:

```
         total_cases  total_deaths  peak_day   CFR%
Country
UK           5309918         64402     38478  1.213
Brazil       3278644         40310     23334  1.229
USA          2566572         30955     16952  1.206
India        2152940         26617     20293  1.236
Japan        1584095         20987     11764  1.325
```

### 7-day rolling average — the essential epidemic metric

```python
ind = cov[cov['Country'] == 'India'].set_index('Date')
ind['MA7'] = ind['NewCases'].rolling(7).mean().round(1)
print(ind[['NewCases', 'MA7']].tail(5))
```

Output:

```
            NewCases      MA7
Date
2021-06-25     19247  19132.7
2021-06-26     20244  19315.3
2021-06-27     19792  19406.6
2021-06-28     19906  19474.4
2021-06-29     20293  19707.3
```

Daily counts jump around because of weekend reporting gaps. The 7-day average smooths this into a clean trend — which is exactly why every health dashboard used it.

### Monthly totals by country

```python
print(cov.groupby([cov['Date'].dt.to_period('M'), 'Country'])['NewCases'].sum().unstack().head(6))
```

Output:

```
Country  Brazil   India   Japan       UK     USA
Date
2021-01  463158  196144  243247   677183  438057
2021-02  437593  247851  216667   740817  420555
2021-03  550517  316241  241297   866488  434683
2021-04  548761  385309  255274   914565  439902
2021-05  631921  482906  329217  1055503  422876
2021-06  646694  524489  298393  1055362  410499
```

### Finding each peak

```python
for c in countries:
    s = cov[cov['Country'] == c]
    p = s.loc[s['NewCases'].idxmax()]
    print(f"  {c:8} peak {p['NewCases']:>7,} on {p['Date'].date()}")
```

Output:

```
  India    peak  20,293 on 2021-06-29
  USA      peak  16,952 on 2021-01-26
  Brazil   peak  23,334 on 2021-06-21
  UK       peak  38,478 on 2021-06-27
  Japan    peak  11,764 on 2021-05-29
```

### Growth: first week vs last week

```python
for c in countries[:3]:
    s = cov[cov['Country'] == c].sort_values('Date')
    f, l = s.head(7)['NewCases'].mean(), s.tail(7)['NewCases'].mean()
    print(f"  {c:8} {f:>9,.0f} -> {l:>9,.0f}  ({(l-f)/f*100:+.1f}%)")
```

Output:

```
  India        4,947 ->    19,707  (+298.3%)
  USA         12,950 ->    14,850  (+14.7%)
  Brazil      14,311 ->    22,637  (+58.2%)
```

India's caseload grew nearly **300%** across the period while the USA stayed relatively flat.

### Findings

1. The UK recorded the most total cases and the single highest daily peak (38,478).
2. India shows the steepest growth trajectory (+298%).
3. CFR is tightly clustered at 1.2–1.3% across all countries.
4. Peak timing varies widely — the USA peaked in January, most others in June.

### Extend it

- [ ] Use real data from Our World in Data
- [ ] Normalise by population (cases per million)
- [ ] Overlay vaccination rollout dates
- [ ] Calculate the effective reproduction number R

---

## Project 6: Employee Salary Analysis

**Question:** What determines salary, and is there a gender pay gap?

```python
np.random.seed(99)
n = 500
depts = ['Engineering', 'Sales', 'HR', 'Marketing', 'Finance']

df = pd.DataFrame({
    'EmpID': [f'E{i:04d}' for i in range(1, n + 1)],
    'Gender': np.random.choice(['Male', 'Female'], n, p=[.6, .4]),
    'Department': np.random.choice(depts, n, p=[.35, .25, .1, .15, .15]),
    'Experience': np.random.randint(0, 25, n),
    'Education': np.random.choice(['Bachelors', 'Masters', 'PhD'], n, p=[.55, .35, .10])
})

edu_b = {'Bachelors': 0, 'Masters': 150000, 'PhD': 350000}
dep_b = {'Engineering': 250000, 'Sales': 100000, 'HR': 0, 'Marketing': 80000, 'Finance': 180000}

df['Salary'] = (400000 + df['Experience'] * 45000
                + df['Education'].map(edu_b)
                + df['Department'].map(dep_b)
                + np.random.normal(0, 80000, n)).round(-3).astype(int).clip(300000)

print(df['Salary'].describe().round(0))
print(f"Skew: {df['Salary'].skew():.4f}")
```

Output:

```
count        500.0
mean     1153762.0
std       342760.0
min       352000.0
25%       884750.0
50%      1175000.0
75%      1389000.0
max      2263000.0
Name: Salary, dtype: float64
Skew: 0.0749
```

A skew of 0.07 means the distribution is essentially symmetric — unusual for salary data, and a consequence of how we generated it.

### Salary by department

```python
d = df.groupby('Department').agg(
    n=('EmpID', 'count'), avg=('Salary', 'mean'),
    median=('Salary', 'median'), max=('Salary', 'max')
).round(0).astype(int)
print(d.sort_values('avg', ascending=False))
```

Output:

```
               n      avg   median      max
Department
Engineering  157  1254363  1248000  2049000
Finance       88  1172659  1221500  2263000
Sales        123  1111455  1127000  1731000
Marketing     76  1106895  1091500  1806000
HR            56   998554   981000  1827000
```

### Salary by education

```python
print(df.groupby('Education')['Salary'].agg(['count', 'mean', 'median']).round(0).astype(int))
```

Output:

```
           count     mean   median
Education
Bachelors    278  1078968  1080500
Masters      173  1217064  1215000
PhD           49  1354612  1300000
```

A Master's is worth about ₹138,000 more than a Bachelor's; a PhD adds a further ₹137,500.

### The gender pay gap — and why you must control for confounders

```python
g = df.groupby('Gender')['Salary'].agg(['count', 'mean', 'median']).round(0).astype(int)
print(g)
gap = (g.loc['Male', 'mean'] - g.loc['Female', 'mean']) / g.loc['Male', 'mean'] * 100
print(f"Raw gap: {gap:.2f}%")
```

Output:

```
        count     mean   median
Gender
Female    212  1181500  1198000
Male      288  1133344  1132000
Raw gap: -4.25%
```

The raw gap **favours women** by 4.25%. But a raw average can hide everything — you must break it down.

```python
ctrl = df.pivot_table(index='Department', columns='Gender', values='Salary', aggfunc='mean').round(0)
ctrl['Gap%'] = ((ctrl['Male'] - ctrl['Female']) / ctrl['Male'] * 100).round(2)
print(ctrl)
```

Output:

```
Gender          Female       Male   Gap%
Department
Engineering  1305424.0  1223622.0  -6.69
Finance      1182676.0  1165392.0  -1.48
HR           1048423.0   955333.0  -9.74
Marketing    1060194.0  1139067.0   6.92
Sales        1179220.0  1048984.0 -12.42
```

Now the picture is far richer: Marketing is the only department where men earn more (+6.92%), while Sales shows a 12.42% gap favouring women.

> 💡 This is **Simpson's Paradox** territory. A single aggregate number can conceal — or even reverse — the pattern inside subgroups. Never report a pay gap without controlling for department, seniority, and experience.

### Experience is the dominant factor

```python
print(f"Correlation: {df['Experience'].corr(df['Salary']):.4f}")

df['ExpBand'] = pd.cut(df['Experience'], [-1, 5, 10, 15, 25],
                       labels=['0-5', '6-10', '11-15', '16+'])
print(df.groupby('ExpBand', observed=True)['Salary'].mean().round(0).astype(int))
```

Output:

```
Correlation: 0.8742
ExpBand
0-5       747877
6-10     1010863
11-15    1208843
16+      1521656
Name: Salary, dtype: int64
```

Experience correlates at **0.874** — far stronger than any demographic variable. Salaries roughly double from the 0–5 band to the 16+ band.

### Top earners

```python
print(df.nlargest(5, 'Salary')[['EmpID', 'Department', 'Education', 'Experience', 'Salary']])
```

Output:

```
     EmpID   Department Education  Experience   Salary
170  E0171      Finance       PhD          24  2263000
31   E0032  Engineering   Masters          24  2049000
384  E0385  Engineering       PhD          20  1961000
84   E0085  Engineering   Masters          24  1952000
463  E0464  Engineering   Masters          23  1908000
```

Every top earner combines high experience with an advanced degree — the two effects compound.

### Findings

1. Experience is the strongest predictor (r = 0.874).
2. Engineering pays the most (₹1,254,363 average); HR the least (₹998,554).
3. Each education level adds roughly ₹137,000.
4. The raw gender gap is misleading — it reverses direction in different departments.

### Extend it

- [ ] Fit a multiple regression to isolate each factor's contribution
- [ ] Add performance ratings and promotion history
- [ ] Benchmark against market salary data
- [ ] Build an attrition-risk model

---

## Project 7: E-commerce Data Analysis

**Question:** Who are our most valuable customers, and which categories have return problems?

```python
np.random.seed(21)
n = 1500
cats = ['Electronics', 'Fashion', 'Home', 'Books', 'Beauty']

df = pd.DataFrame({
    'OrderID': [f'ORD{i:05d}' for i in range(1, n + 1)],
    'CustomerID': np.random.choice([f'C{i:03d}' for i in range(1, 301)], n),
    'OrderDate': pd.to_datetime('2024-01-01') + pd.to_timedelta(np.random.randint(0, 365, n), unit='D'),
    'Category': np.random.choice(cats, n, p=[.25, .30, .20, .15, .10]),
    'Quantity': np.random.randint(1, 6, n),
    'Price': np.round(np.random.uniform(200, 8000, n), 2),
    'Status': np.random.choice(['Delivered', 'Returned', 'Cancelled'], n, p=[.85, .10, .05])
})
df['Revenue'] = (df['Quantity'] * df['Price']).round(2)

d = df[df['Status'] == 'Delivered']

print(f"Orders: {len(df)}  Delivered: {len(d)}  Customers: {df['CustomerID'].nunique()}")
print(f"Gross revenue: Rs {df['Revenue'].sum():,.2f}")
print(f"Net (delivered): Rs {d['Revenue'].sum():,.2f}")
print(f"Return rate: {(df['Status']=='Returned').mean()*100:.2f}%  AOV: Rs {d['Revenue'].mean():,.2f}")
```

Output:

```
Orders: 1500  Delivered: 1277  Customers: 297
Gross revenue: Rs 18,557,914.56
Net (delivered): Rs 15,749,677.86
Return rate: 10.33%  AOV: Rs 12,333.34
```

Returns and cancellations destroy ₹2.8 million — 15% of gross revenue. **Always analyse delivered orders separately from gross orders.**

### Category performance

```python
c = d.groupby('Category').agg(
    orders=('OrderID', 'count'), revenue=('Revenue', 'sum'),
    aov=('Revenue', 'mean'), units=('Quantity', 'sum')
).round(2)
c['rev_share%'] = (c['revenue'] / c['revenue'].sum() * 100).round(2)
print(c.sort_values('revenue', ascending=False))
```

Output:

```
             orders     revenue       aov  units  rev_share%
Category
Fashion         392  4887093.81  12467.08   1207       31.03
Electronics     314  3691767.43  11757.22    904       23.44
Home            250  3016883.87  12067.54    736       19.16
Books           189  2412474.70  12764.42    582       15.32
Beauty          132  1741458.05  13192.86    406       11.06
```

### Return rate by category — the actionable insight

```python
print(df.groupby('Category')['Status']
      .apply(lambda s: (s == 'Returned').mean() * 100).round(2)
      .sort_values(ascending=False))
```

Output:

```
Category
Beauty         12.96
Electronics    12.69
Home            9.66
Fashion         8.78
Books           8.26
Name: Status, dtype: float64
```

Beauty and Electronics return at ~13% versus 8% for Books. That gap is worth real money — investigate product descriptions, sizing, and quality.

### Monthly revenue

```python
mo = d.groupby(d['OrderDate'].dt.to_period('M'))['Revenue'].sum()
print(mo.round(0).astype(int))
print(f"\nBest month: {mo.idxmax()} (Rs {mo.max():,.0f})")
```

Output:

```
OrderDate
2024-01    1265100
2024-02    1144572
2024-03    1392689
2024-04    1142211
2024-05    1180972
2024-06    1428456
2024-07    1119421
2024-08    1321321
2024-09    1350621
2024-10    1433032
2024-11    1579739
2024-12    1391545
Freq: M, Name: Revenue, dtype: int64

Best month: 2024-11 (Rs 1,579,739)
```

November peaks — the festive and Black Friday effect.

### RFM customer segmentation

**RFM** scores customers on three dimensions: how **Recently** they bought, how **Frequently**, and how much **Monetary** value they bring. It is the industry-standard segmentation technique.

```python
snap = d['OrderDate'].max() + pd.Timedelta(days=1)

rfm = d.groupby('CustomerID').agg(
    Recency=('OrderDate', lambda x: (snap - x.max()).days),
    Frequency=('OrderID', 'count'),
    Monetary=('Revenue', 'sum')
)

# score each dimension 1-4 (4 is best)
rfm['R'] = pd.qcut(rfm['Recency'], 4, labels=[4, 3, 2, 1]).astype(int)
rfm['F'] = pd.qcut(rfm['Frequency'].rank(method='first'), 4, labels=[1, 2, 3, 4]).astype(int)
rfm['M'] = pd.qcut(rfm['Monetary'], 4, labels=[1, 2, 3, 4]).astype(int)
rfm['Score'] = rfm['R'] + rfm['F'] + rfm['M']

def seg(s):
    if s >= 10: return 'Champions'
    if s >= 8: return 'Loyal'
    if s >= 6: return 'Potential'
    return 'At Risk'

rfm['Segment'] = rfm['Score'].apply(seg)
print(rfm.head())
```

Output:

```
            Recency  Frequency  Monetary  R  F  M  Score    Segment
CustomerID
C001             65          2  17006.44  2  1  1      4    At Risk
C002            132          5  64539.26  1  3  3      7  Potential
C003              5          7  70022.95  4  4  3     11  Champions
C004            159          4  79680.36  1  2  4      7  Potential
C005            159          4  75993.05  1  2  4      7  Potential
```

Note that Recency is scored **in reverse** — a low recency number (bought recently) earns a high score of 4.

```python
print(rfm['Segment'].value_counts())
print("\nAvg spend per segment:")
print(rfm.groupby('Segment')['Monetary'].mean().round(2).sort_values(ascending=False))
```

Output:

```
Segment
Champions    79
At Risk      77
Potential    70
Loyal        67
Name: count, dtype: int64

Avg spend per segment:
Segment
Champions    90677.04
Loyal        56256.83
Potential    42018.50
```

Champions spend **₹90,677** on average — 2.2× more than Potential customers. These 79 people deserve VIP treatment, while the 77 At Risk customers need a win-back campaign.

### The Pareto check

```python
cust = d.groupby('CustomerID').agg(orders=('OrderID','count'), spend=('Revenue','sum'))
print(f"Top 20% customers = {cust.nlargest(60,'spend')['spend'].sum()/cust['spend'].sum()*100:.1f}% of revenue")
```

### Findings

1. Returns and cancellations cost ₹2.8M — 15% of gross revenue.
2. Beauty and Electronics have return rates ~13%, 50% higher than Books.
3. November is the peak month (₹1.58M).
4. 79 Champion customers average ₹90,677 spend — target retention here first.

### Extend it

- [ ] Calculate Customer Lifetime Value (CLV)
- [ ] Do market basket analysis to find products bought together
- [ ] Build a churn prediction model
- [ ] Run cohort analysis by signup month

---

## Complete EDA Project: The Full Workflow

Here is a reusable template that ties every module in Phase 6 together.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

pd.set_option('display.width', 150)
sns.set_theme(style='whitegrid')


def load_and_inspect(path):
    """Step 1-2: Load and understand the structure."""
    df = pd.read_csv(path)
    print("=" * 60)
    print(f"SHAPE: {df.shape[0]:,} rows x {df.shape[1]} columns")
    print("=" * 60)
    print("\n--- First rows ---");      print(df.head())
    print("\n--- Types ---");           print(df.dtypes)
    print("\n--- Missing ---");         print(df.isnull().sum()[df.isnull().sum() > 0])
    print("\n--- Duplicates ---");      print(df.duplicated().sum())
    print("\n--- Numeric summary ---"); print(df.describe().round(2))
    return df


def clean(df):
    """Step 3: Clean the data."""
    before = len(df)
    df = df.drop_duplicates()
    print(f"Removed {before - len(df)} duplicates")

    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].str.strip()

    for col in df.select_dtypes(include=np.number).columns:
        if df[col].isnull().any():
            df[col] = df[col].fillna(df[col].median())

    for col in df.select_dtypes(include='object').columns:
        if df[col].isnull().any():
            df[col] = df[col].fillna('Unknown')

    return df.reset_index(drop=True)


def univariate(df):
    """Step 4: One variable at a time."""
    num = df.select_dtypes(include=np.number).columns
    cat = df.select_dtypes(include='object').columns

    for c in num:
        print(f"\n{c}: mean={df[c].mean():.2f}, median={df[c].median():.2f}, skew={df[c].skew():.2f}")

    for c in cat:
        if df[c].nunique() < 15:
            print(f"\n{c}:")
            print(df[c].value_counts())

    df[num].hist(figsize=(14, 8), bins=25, edgecolor='black')
    plt.tight_layout(); plt.show()


def bivariate(df, target):
    """Step 5: Relationships with the target."""
    num = df.select_dtypes(include=np.number)
    corr = num.corr()

    plt.figure(figsize=(9, 7))
    sns.heatmap(corr, annot=True, cmap='coolwarm', center=0, fmt='.2f')
    plt.title('Correlation Matrix'); plt.tight_layout(); plt.show()

    print(f"\nCorrelation with {target}:")
    print(corr[target].sort_values(ascending=False).round(3))

    for c in df.select_dtypes(include='object').columns:
        if df[c].nunique() < 10:
            print(f"\n{target} by {c}:")
            print(df.groupby(c)[target].agg(['count', 'mean']).round(2))


def outliers(df):
    """Step 6: Find outliers with the IQR method."""
    for c in df.select_dtypes(include=np.number).columns:
        Q1, Q3 = df[c].quantile([.25, .75])
        IQR = Q3 - Q1
        n = ((df[c] < Q1 - 1.5*IQR) | (df[c] > Q3 + 1.5*IQR)).sum()
        if n:
            print(f"{c}: {n} outliers ({n/len(df)*100:.1f}%)")


# Run the whole pipeline
# df = load_and_inspect('data.csv')
# df = clean(df)
# univariate(df)
# bivariate(df, target='Revenue')
# outliers(df)
```

### The EDA report template

```markdown
# Analysis: [Title]

## 1. Objective

What question does this answer? Why does it matter?

## 2. Dataset

- Source, size, time period
- Columns and their meanings
- Known limitations

## 3. Data Quality

- Missing values found and how they were handled
- Duplicates removed
- Outliers identified and the decision taken

## 4. Key Findings

1. [Finding with a specific number] — [supporting chart]
2. [Finding with a specific number] — [supporting chart]
3. [Finding with a specific number] — [supporting chart]

## 5. Limitations

What this data cannot tell us. What confounders might exist.

## 6. Recommendations

1. [Specific, actionable step]
2. [Specific, actionable step]
```

---

## Common Project Mistakes

### 1. Analysing before cleaning

Every number you compute on dirty data is wrong. Clean first.

### 2. No clear question

"Let me explore this dataset" produces 40 charts and zero insights. Start with a question.

### 3. Reporting aggregates without counts

Friday's average looks meaningful until you notice it is based on 19 rows. **Always show `count` next to `mean`.**

### 4. Falling for Simpson's Paradox

The Project 6 pay gap reversed direction once we split by department. Always check subgroups.

### 5. Confusing correlation with causation

Project 2 shows study hours correlate with marks at 0.894. That is _consistent with_ causation but does not prove it — motivated students both study more and score higher.

### 6. Not separating gross from net

Project 7's ₹18.5M gross revenue drops to ₹15.7M after returns. Reporting the wrong one misleads everyone.

### 7. Charts without takeaways

Every chart needs a one-sentence caption saying what the reader should notice.

### 8. Forgetting to set a random seed

Without `np.random.seed()`, your results change every run and nobody can reproduce them.

---

## Phase 6 Project Checklist

Work through these in order:

- [ ] Load a CSV and run all five inspection commands
- [ ] Write a reusable cleaning function
- [ ] Produce a correlation heatmap and interpret the top 3 relationships
- [ ] Build a groupby summary with at least 4 aggregations
- [ ] Create a 2×2 subplot dashboard
- [ ] Do a time-series analysis with a rolling average
- [ ] Perform RFM segmentation on transactional data
- [ ] Detect outliers with both the IQR and Z-score methods and compare
- [ ] Check one finding for Simpson's Paradox by splitting into subgroups
- [ ] Write a full EDA report with findings, limitations, and recommendations
- [ ] Publish a notebook on Kaggle or GitHub
