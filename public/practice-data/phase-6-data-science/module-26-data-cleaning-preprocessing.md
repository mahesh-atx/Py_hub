# Module 26: Data Cleaning & Preprocessing

## Why Data Cleaning Matters

Real data is **messy**. It has missing values, duplicates, typos, wrong data types, and impossible numbers.

> Data scientists spend roughly **80% of their time** cleaning data and only 20% analysing it. This module is where most of your real work will happen.

### What can go wrong

| Problem           | Example                              |
| ----------------- | ------------------------------------ |
| Missing values    | Empty cells, `NaN`, `None`, `"N/A"`  |
| Duplicates        | The same customer entered twice      |
| Outliers          | An age of 500, a salary of -₹1000    |
| Wrong data type   | Numbers stored as text               |
| Inconsistent text | `"Mumbai"`, `"mumbai"`, `" MUMBAI "` |
| Bad dates         | `"15/01/2024"` vs `"2024-01-15"`     |
| Different scales  | Age (0–100) vs Salary (0–1,000,000)  |
| Text categories   | Models need numbers, not `"Mumbai"`  |

The rule: **garbage in, garbage out.** A perfect model on dirty data gives perfectly wrong answers.

---

## Missing Values

Pandas represents missing data as `NaN` (Not a Number), or `NaT` for missing dates.

Our messy sample:

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Name': ['Mahesh', 'Priya', None, 'Anita', 'Kiran', 'Mahesh'],
    'Age': [25, np.nan, 30, 28, 35, 25],
    'City': ['Mumbai', 'Delhi', 'Pune', None, 'Delhi', 'Mumbai'],
    'Salary': [50000, 60000, np.nan, 65000, 80000, 50000]
})
print(df)
```

Output:

```
     Name   Age    City   Salary
0  Mahesh  25.0  Mumbai  50000.0
1   Priya   NaN   Delhi  60000.0
2    None  30.0    Pune      NaN
3   Anita  28.0    None  65000.0
4   Kiran  35.0   Delhi  80000.0
5  Mahesh  25.0  Mumbai  50000.0
```

### Detecting missing values

```python
print(df.isnull().sum())
```

Output:

```
Name      1
Age       1
City      1
Salary    1
dtype: int64
```

This is the **first command you should run** on any new dataset.

```python
print(df.isnull().sum().sum())              # 4    total missing cells
print((df.isnull().sum() / len(df) * 100).round(2))   # percentage per column
print(df.isnull().any(axis=1).sum())        # 3    rows with any missing value
```

Output:

```
4
Name      16.67
Age       16.67
City      16.67
Salary    16.67
dtype: float64
3
```

| Method                    | Returns                 |
| ------------------------- | ----------------------- |
| `df.isnull()`             | `True`/`False` grid     |
| `df.isnull().sum()`       | Count per column        |
| `df.notnull()`            | The opposite            |
| `df.isnull().any(axis=1)` | Which rows have any gap |
| `df.info()`               | Non-null counts         |

### Dropping missing values

```python
print(df.dropna())          # drop any row with a missing value
```

Output:

```
     Name   Age    City   Salary
0  Mahesh  25.0  Mumbai  50000.0
4   Kiran  35.0   Delhi  80000.0
5  Mahesh  25.0  Mumbai  50000.0
```

Half the data is gone — this is why dropping is often the wrong choice.

```python
print(df.dropna(subset=['Age']))   # only drop where Age is missing
```

Output:

```
     Name   Age    City   Salary
0  Mahesh  25.0  Mumbai  50000.0
2    None  30.0    Pune      NaN
3   Anita  28.0    None  65000.0
4   Kiran  35.0   Delhi  80000.0
5  Mahesh  25.0  Mumbai  50000.0
```

```python
print(df.dropna(thresh=3))     # keep rows with at least 3 non-null values
```

Output:

```
     Name   Age    City   Salary
0  Mahesh  25.0  Mumbai  50000.0
1   Priya   NaN   Delhi  60000.0
3   Anita  28.0    None  65000.0
4   Kiran  35.0   Delhi  80000.0
5  Mahesh  25.0  Mumbai  50000.0
```

| Parameter        | Effect                                     |
| ---------------- | ------------------------------------------ |
| `how='any'`      | Drop if **any** value is missing (default) |
| `how='all'`      | Drop only if **all** values are missing    |
| `subset=['col']` | Only look at these columns                 |
| `thresh=n`       | Keep rows with at least n valid values     |
| `axis=1`         | Drop **columns** instead of rows           |

### Filling missing values

```python
print(df.fillna(0))     # fill everything with 0
```

Filling numbers with the **mean**:

```python
d = df.copy()
d['Age'] = d['Age'].fillna(d['Age'].mean())
print(d['Age'].round(2).tolist())     # [25.0, 28.6, 30.0, 28.0, 35.0, 25.0]
```

Filling with the **median** (better when outliers exist):

```python
d2 = df.copy()
d2['Age'] = d2['Age'].fillna(d2['Age'].median())
print(d2['Age'].tolist())      # [25.0, 28.0, 30.0, 28.0, 35.0, 25.0]
```

Filling text with the **mode** (most frequent value):

```python
d3 = df.copy()
d3['City'] = d3['City'].fillna(d3['City'].mode()[0])
print(d3['City'].tolist())
# ['Mumbai', 'Delhi', 'Pune', 'Delhi', 'Delhi', 'Mumbai']
```

### Forward, backward, and interpolated fill

```python
print(df['Age'].ffill().tolist())         # [25.0, 25.0, 30.0, 28.0, 35.0, 25.0]
print(df['Age'].bfill().tolist())         # [25.0, 30.0, 30.0, 28.0, 35.0, 25.0]
print(df['Age'].interpolate().tolist())   # [25.0, 27.5, 30.0, 28.0, 35.0, 25.0]
```

- `ffill()` copies the value **before** the gap.
- `bfill()` copies the value **after** the gap.
- `interpolate()` estimates a value in between — ideal for time series.

### Different strategy per column

```python
print(df.fillna({
    'Age': 0,
    'City': 'Unknown',
    'Salary': df['Salary'].mean(),
    'Name': 'N/A'
}))
```

Output:

```
     Name   Age     City   Salary
0  Mahesh  25.0   Mumbai  50000.0
1   Priya   0.0    Delhi  60000.0
2     N/A  30.0     Pune  61000.0
3   Anita  28.0  Unknown  65000.0
4   Kiran  35.0    Delhi  80000.0
5  Mahesh  25.0   Mumbai  50000.0
```

### Choosing a strategy

| Situation                   | Recommended approach                  |
| --------------------------- | ------------------------------------- |
| Very few rows missing (<5%) | Drop them                             |
| Numeric, no outliers        | Fill with the **mean**                |
| Numeric, has outliers       | Fill with the **median**              |
| Categorical text            | Fill with the **mode** or `"Unknown"` |
| Time series                 | `ffill()` or `interpolate()`          |
| Missing is meaningful       | Keep it, add an `is_missing` flag     |
| Column is >60% empty        | Drop the whole column                 |

> ⚠️ Never use `==` to find missing values. `np.nan == np.nan` is `False`. Always use `.isna()` or `.isnull()`.

---

## Duplicate Data

```python
df = pd.DataFrame({
    'Name': ['Mahesh', 'Priya', 'Mahesh', 'Ravi', 'Priya'],
    'City': ['Mumbai', 'Delhi', 'Mumbai', 'Pune', 'Delhi'],
    'Salary': [50000, 60000, 50000, 55000, 62000]
})
print(df)
```

Output:

```
     Name    City  Salary
0  Mahesh  Mumbai   50000
1   Priya   Delhi   60000
2  Mahesh  Mumbai   50000
3    Ravi    Pune   55000
4   Priya   Delhi   62000
```

Row 2 is a full duplicate of row 0. Rows 1 and 4 share a name but have different salaries.

### Detecting duplicates

```python
print(df.duplicated())
print(df.duplicated().sum())      # 1
```

Output:

```
0    False
1    False
2     True
3    False
4    False
dtype: bool
1
```

Only row 2 is flagged — the **first** occurrence is not considered a duplicate.

See all copies together:

```python
print(df[df.duplicated(keep=False)])
```

Output:

```
     Name    City  Salary
0  Mahesh  Mumbai   50000
2  Mahesh  Mumbai   50000
```

### Removing duplicates

```python
print(df.drop_duplicates())
```

Output:

```
     Name    City  Salary
0  Mahesh  Mumbai   50000
1   Priya   Delhi   60000
3    Ravi    Pune   55000
4   Priya   Delhi   62000
```

### Duplicates based on specific columns

```python
print(df.drop_duplicates(subset=['Name']))
```

Output:

```
     Name    City  Salary
0  Mahesh  Mumbai   50000
1   Priya   Delhi   60000
3    Ravi    Pune   55000
```

Now both Priya rows collapse to one, even though their salaries differ.

### Which copy to keep

```python
print(df.drop_duplicates(subset=['Name'], keep='last'))
```

Output:

```
     Name    City  Salary
0  Mahesh  Mumbai   50000
3    Ravi    Pune   55000
4   Priya   Delhi   62000
```

```python
print(df.drop_duplicates(keep=False))     # remove ALL copies
```

Output:

```
    Name   City  Salary
1  Priya  Delhi   60000
3   Ravi   Pune   55000
4  Priya  Delhi   62000
```

| `keep` value | Behaviour                |
| ------------ | ------------------------ |
| `'first'`    | Keep the first (default) |
| `'last'`     | Keep the last            |
| `False`      | Drop every copy          |

> 💡 Think carefully about `subset`. Two customers can genuinely share a name — deduplicating on `Name` alone would delete a real person. Deduplicate on a true identifier like an email or ID.

---

## Handling Outliers

An **outlier** is a value far outside the normal range. It may be a genuine extreme value or a data-entry error.

```python
s = pd.Series([10, 12, 13, 12, 11, 14, 13, 100, 12, 11])
print(s.describe())
```

Output:

```
count     10.00000
mean      20.80000
std       27.85199
min       10.00000
25%       11.25000
50%       12.00000
75%       13.00000
max      100.00000
dtype: float64
```

The mean is 20.8 but the median is only 12 — that gap is the classic signature of an outlier.

### The IQR method (most common)

```python
Q1 = s.quantile(0.25)
Q3 = s.quantile(0.75)
IQR = Q3 - Q1

lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

print(Q1, Q3, IQR, lower, upper)
```

Output:

```
11.25 13.0 1.75 8.625 15.625
```

Anything below 8.625 or above 15.625 counts as an outlier.

```python
print(s[(s < lower) | (s > upper)].tolist())    # [100]
```

### Removing outliers

```python
print(s[(s >= lower) & (s <= upper)].tolist())
# [10, 12, 13, 12, 11, 14, 13, 12, 11]
```

### Capping instead of removing (winsorising)

```python
print(s.clip(lower, upper).tolist())
# [10.0, 12.0, 13.0, 12.0, 11.0, 14.0, 13.0, 15.625, 12.0, 11.0]
```

The 100 becomes 15.625 — you keep the row but limit its damage. This is usually better than deleting data.

### The Z-score method

A Z-score says how many standard deviations a value is from the mean. The usual cutoff is 3.

```python
z = (s - s.mean()) / s.std()
print(z.round(3).tolist())
```

Output:

```
[-0.388, -0.316, -0.28, -0.316, -0.352, -0.244, -0.28, 2.844, -0.316, -0.352]
```

```python
print(s[abs(z) < 3].tolist())
# [10, 12, 13, 12, 11, 14, 13, 100, 12, 11]
```

⚠️ Notice the 100 **survived** — its Z-score is 2.844, just under 3. This happens because the outlier itself inflates the standard deviation, hiding itself.

### IQR vs Z-score

| IQR                                     | Z-score                               |
| --------------------------------------- | ------------------------------------- |
| Uses quartiles                          | Uses mean and standard deviation      |
| **Robust** — outliers do not distort it | Outliers distort the calculation      |
| Works on skewed data                    | Assumes a roughly normal distribution |
| ✅ Safer default                        | Use only for normal-ish data          |

### For a whole DataFrame

```python
def remove_outliers_iqr(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    low, high = Q1 - 1.5 * IQR, Q3 + 1.5 * IQR
    return df[(df[column] >= low) & (df[column] <= high)]
```

### Should you remove them?

| Keep the outlier when                       | Remove or cap when           |
| ------------------------------------------- | ---------------------------- |
| It is a genuine extreme (a real CEO salary) | It is impossible (age = 500) |
| It is the thing you are studying (fraud)    | It is a typo (an extra zero) |
| You have very little data                   | It is a sensor error         |

Always **investigate** an outlier before deleting it. Sometimes the outlier is the most interesting row in the dataset.

---

## Data Type Conversion

Wrong data types break everything. Numbers stored as text cannot be added; dates stored as text cannot be sorted properly.

```python
d = pd.DataFrame({'a': ['1', '2', '3'], 'b': ['1.5', '2.5', 'x'], 'c': [1, 2, 3]})
print(d.dtypes)
```

Output:

```
a    object
b    object
c     int64
dtype: object
```

`object` means text.

### `astype()` — direct conversion

```python
d['a'] = d['a'].astype(int)
print(d['a'].dtype)      # int64

print(d['c'].astype(float).tolist())   # [1.0, 2.0, 3.0]
print(d['c'].astype(str).tolist())     # ['1', '2', '3']
```

`astype()` fails loudly if any value cannot be converted.

### `pd.to_numeric()` — safe conversion

```python
d['b'] = pd.to_numeric(d['b'], errors='coerce')
print(d['b'].tolist())      # [1.5, 2.5, nan]
```

`errors='coerce'` turns unconvertible values into `NaN` instead of crashing. You can then decide what to do with them.

| `errors` value | Behaviour                  |
| -------------- | -------------------------- |
| `'raise'`      | Throw an error (default)   |
| `'coerce'`     | Bad values become `NaN`    |
| `'ignore'`     | Leave the column unchanged |

### Nullable integers

Plain `int` columns cannot hold `NaN`, so Pandas silently converts them to `float`. Use the capital-I `Int64` type instead:

```python
print(pd.Series([1, 2, None]).astype('Int64').tolist())
# [1, 2, <NA>]
```

### The `category` type saves huge memory

For text columns with few distinct values:

```python
e = pd.DataFrame({'cat': ['a', 'b', 'a', 'b'] * 100})

print(e['cat'].memory_usage(deep=True))                      # 20132
print(e['cat'].astype('category').memory_usage(deep=True))   # 740
```

That is a **27× reduction**. Always convert repetitive text columns to `category` on large datasets.

### Conversion reference

| Task         | Code                                      |
| ------------ | ----------------------------------------- |
| To integer   | `df['c'].astype(int)`                     |
| To float     | `df['c'].astype(float)`                   |
| To string    | `df['c'].astype(str)`                     |
| To category  | `df['c'].astype('category')`              |
| Nullable int | `df['c'].astype('Int64')`                 |
| Safe numeric | `pd.to_numeric(df['c'], errors='coerce')` |
| To datetime  | `pd.to_datetime(df['c'])`                 |
| Whole frame  | `df.astype({'a': int, 'b': float})`       |

---

## String Cleaning

Text columns are almost always inconsistent. Pandas gives you every Python string method through the `.str` accessor.

```python
s = pd.Series(['  Mahesh ', 'PRIYA', 'ravi  ', 'An!ta', 'kiran123'])
```

### Whitespace and case

```python
print(s.str.strip().tolist())    # ['Mahesh', 'PRIYA', 'ravi', 'An!ta', 'kiran123']
print(s.str.lower().tolist())    # ['  mahesh ', 'priya', 'ravi  ', 'an!ta', 'kiran123']
print(s.str.upper().tolist())    # ['  MAHESH ', 'PRIYA', 'RAVI  ', 'AN!TA', 'KIRAN123']
```

### Chaining — the standard cleaning pattern

```python
print(s.str.strip().str.title().tolist())
# ['Mahesh', 'Priya', 'Ravi', 'An!Ta', 'Kiran123']
```

### Replacing

```python
print(s.str.replace(' ', '', regex=False).tolist())
# ['Mahesh', 'PRIYA', 'ravi', 'An!ta', 'kiran123']

print(s.str.replace(r'[^a-zA-Z]', '', regex=True).tolist())
# ['Mahesh', 'PRIYA', 'ravi', 'Anta', 'kiran']
```

The regex version strips out digits and punctuation, leaving only letters.

### Splitting

```python
names = pd.Series(['Mahesh Kumar', 'Priya Singh'])

print(names.str.split(' ').tolist())
# [['Mahesh', 'Kumar'], ['Priya', 'Singh']]

print(names.str.split(' ', expand=True))
```

Output:

```
        0      1
0  Mahesh  Kumar
1   Priya  Singh
```

`expand=True` splits into separate columns — perfect for splitting a full name into first and last.

### Extracting with regex

```python
emails = pd.Series(['a@x.com', 'b@y.org'])
print(emails.str.extract(r'@(\w+)\.')[0].tolist())    # ['x', 'y']
```

### Slicing and searching

```python
print(s.str.strip().str[:3].tolist())          # ['Mah', 'PRI', 'rav', 'An!', 'kir']
print(s.str.contains('a', case=False).tolist())# [True, True, True, True, True]
print(s.str.len().tolist())                    # [9, 5, 6, 5, 8]
```

### Standardising categories

```python
print(pd.Series(['IT', 'it', 'It ']).str.strip().str.upper().unique())    # ['IT']
```

Three different spellings become one clean category.

### Cleaning numbers stored as text

```python
print(pd.Series(['1,200', '2,500']).str.replace(',', '').astype(int).tolist())
# [1200, 2500]
```

### String method reference

| Method                                   | Purpose                       |
| ---------------------------------------- | ----------------------------- |
| `.str.strip()`                           | Remove surrounding whitespace |
| `.str.lower()` / `.upper()` / `.title()` | Change case                   |
| `.str.replace(a, b)`                     | Replace text                  |
| `.str.contains(x)`                       | Boolean search                |
| `.str.startswith()` / `.endswith()`      | Prefix / suffix check         |
| `.str.split(sep)`                        | Split into a list             |
| `.str.split(sep, expand=True)`           | Split into columns            |
| `.str.extract(regex)`                    | Pull out a pattern            |
| `.str.len()`                             | Length                        |
| `.str[0:3]`                              | Slice characters              |
| `.str.cat(sep=)`                         | Join values together          |
| `.str.zfill(n)`                          | Pad with leading zeros        |

---

## Date and Time Data

Dates read from a CSV arrive as plain text. You must convert them before you can do anything useful.

```python
d = pd.Series(['2024-01-15', '2024-06-30', '2024-12-25'])
dt = pd.to_datetime(d)

print(dt.dtype)      # datetime64[ns]
```

### The `.dt` accessor

Once converted, a whole toolkit opens up.

```python
print(dt.dt.year.tolist())         # [2024, 2024, 2024]
print(dt.dt.month.tolist())        # [1, 6, 12]
print(dt.dt.day.tolist())          # [15, 30, 25]
print(dt.dt.day_name().tolist())   # ['Monday', 'Sunday', 'Wednesday']
print(dt.dt.month_name().tolist()) # ['January', 'June', 'December']
print(dt.dt.quarter.tolist())      # [1, 2, 4]
print(dt.dt.dayofweek.tolist())    # [0, 6, 2]   Monday=0, Sunday=6
```

### Formatting dates

```python
print(dt.dt.strftime('%d-%m-%Y').tolist())
# ['15-01-2024', '30-06-2024', '25-12-2024']
```

### Parsing awkward formats

```python
print(pd.to_datetime('15/01/2024', dayfirst=True))     # 2024-01-15 00:00:00
```

`dayfirst=True` is essential for Indian and European date formats where the day comes first.

### Handling bad dates

```python
print(pd.to_datetime(pd.Series(['2024-01-15', 'bad']), errors='coerce').tolist())
# [Timestamp('2024-01-15 00:00:00'), NaT]
```

`NaT` (Not a Time) is the datetime version of `NaN`.

### Date arithmetic

```python
print((dt.max() - dt.min()).days)      # 345

print((dt + pd.Timedelta(days=30)).dt.strftime('%Y-%m-%d').tolist())
# ['2024-02-14', '2024-07-30', '2025-01-24']
```

### Generating date ranges

```python
print(pd.date_range('2024-01-01', periods=5, freq='D').strftime('%Y-%m-%d').tolist())
# ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05']

print(pd.date_range('2024-01-01', periods=3, freq='ME').strftime('%Y-%m-%d').tolist())
# ['2024-01-31', '2024-02-29', '2024-03-31']
```

| Frequency code | Meaning     |
| -------------- | ----------- |
| `'D'`          | Day         |
| `'W'`          | Week        |
| `'ME'`         | Month end   |
| `'MS'`         | Month start |
| `'QE'`         | Quarter end |
| `'YE'`         | Year end    |
| `'h'`          | Hour        |

### Common date tasks

```python
df['Date'] = pd.to_datetime(df['Date'])          # convert on load
df['Year'] = df['Date'].dt.year                  # extract features
df['Month'] = df['Date'].dt.month
df['Weekday'] = df['Date'].dt.day_name()
df['IsWeekend'] = df['Date'].dt.dayofweek >= 5

df = df.set_index('Date')                        # for time-series work
monthly = df.resample('ME')['Sales'].sum()       # monthly totals
```

---

## Feature Scaling (Normalization & Standardization)

Machine learning algorithms that measure distance get confused when columns have wildly different ranges.

```python
df = pd.DataFrame({
    'Age': [25, 30, 35, 40, 45],
    'Salary': [30000, 50000, 70000, 90000, 110000]
})
print(df)
```

Salary values are ~2,000× larger than Age. An algorithm would treat Salary as vastly more important purely because of its scale.

### Normalization (Min-Max scaling)

Squeezes every value into the range 0 to 1.

```
x_scaled = (x - min) / (max - min)
```

```python
norm = (df - df.min()) / (df.max() - df.min())
print(norm)
```

Output:

```
    Age  Salary
0  0.00    0.00
1  0.25    0.25
2  0.50    0.50
3  0.75    0.75
4  1.00    1.00
```

### Standardization (Z-score scaling)

Rescales to a mean of 0 and standard deviation of 1.

```
x_scaled = (x - mean) / std
```

```python
std = (df - df.mean()) / df.std()
print(std.round(4))
```

Output:

```
      Age  Salary
0 -1.2649 -1.2649
1 -0.6325 -0.6325
2  0.0000  0.0000
3  0.6325  0.6325
4  1.2649  1.2649
```

### Using scikit-learn

```python
from sklearn.preprocessing import MinMaxScaler, StandardScaler, RobustScaler
import numpy as np

mm = MinMaxScaler()
print(np.round(mm.fit_transform(df), 4))
```

Output:

```
[[0.   0.  ]
 [0.25 0.25]
 [0.5  0.5 ]
 [0.75 0.75]
 [1.   1.  ]]
```

```python
sc = StandardScaler()
print(np.round(sc.fit_transform(df), 4))
```

Output:

```
[[-1.4142 -1.4142]
 [-0.7071 -0.7071]
 [ 0.      0.    ]
 [ 0.7071  0.7071]
 [ 1.4142  1.4142]]
```

The values differ slightly from the manual version because scikit-learn divides by the **population** standard deviation while Pandas uses the **sample** standard deviation.

Verifying the result:

```python
print(np.round(sc.fit_transform(df).mean(axis=0), 10))   # [ 0. -0.]  → mean is 0
print(np.round(sc.fit_transform(df).std(axis=0), 4))     # [1. 1.]    → std is 1
```

### RobustScaler — for data with outliers

Uses the median and IQR instead of mean and standard deviation.

```python
rb = RobustScaler()
print(np.round(rb.fit_transform(df), 4))
```

Output:

```
[[-1.  -1. ]
 [-0.5 -0.5]
 [ 0.   0. ]
 [ 0.5  0.5]
 [ 1.   1. ]]
```

### Which scaler to choose

| Scaler             | Output range   | Best for                                 |
| ------------------ | -------------- | ---------------------------------------- |
| **MinMaxScaler**   | 0 to 1         | Neural networks, image data, no outliers |
| **StandardScaler** | mean 0, std 1  | Most ML algorithms, roughly normal data  |
| **RobustScaler**   | Median-centred | Data with outliers                       |

### When scaling is required

| Needs scaling                 | Does not need scaling      |
| ----------------------------- | -------------------------- |
| KNN, K-Means (distance-based) | Decision Trees             |
| SVM                           | Random Forest              |
| Linear / Logistic Regression  | Gradient Boosting, XGBoost |
| Neural networks               | Naive Bayes                |
| PCA                           | —                          |

> ⚠️ Fit the scaler on the **training set only**, then apply it to the test set with `.transform()`. Calling `.fit_transform()` on your test data leaks information and inflates your scores.

---

## Encoding Categorical Data

Machine learning models need numbers. Text categories must be converted.

```python
d = pd.DataFrame({
    'City': ['Mumbai', 'Delhi', 'Pune', 'Mumbai'],
    'Size': ['S', 'L', 'M', 'L']
})
```

### One-Hot Encoding — for unordered categories

Creates a separate 0/1 column for each category.

```python
print(pd.get_dummies(d, columns=['City']))
```

Output:

```
  Size  City_Delhi  City_Mumbai  City_Pune
0    S       False         True      False
1    L        True        False      False
2    M       False        False       True
3    L       False         True      False
```

Getting integers and avoiding the dummy variable trap:

```python
print(pd.get_dummies(d, columns=['City'], drop_first=True, dtype=int))
```

Output:

```
  Size  City_Mumbai  City_Pune
0    S            1          0
1    L            0          0
2    M            0          1
3    L            1          0
```

`drop_first=True` removes one column because it is redundant — if a row is not Mumbai and not Pune, it must be Delhi. This avoids multicollinearity in linear models.

### Label Encoding — assigns a number per category

```python
from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()
print(le.fit_transform(d['City']))    # [1 0 2 1]
print(list(le.classes_))              # ['Delhi', 'Mumbai', 'Pune']
```

Categories are numbered alphabetically.

> ⚠️ Label encoding creates a **false ordering**. Here Pune=2 and Delhi=0, so a model might conclude "Pune > Delhi", which is meaningless. Only use label encoding for the **target variable** or for genuinely ordered categories.

### Ordinal Encoding — for categories with real order

```python
order = {'S': 1, 'M': 2, 'L': 3}
print(d['Size'].map(order).tolist())     # [1, 3, 2, 3]
```

Here the numbers are meaningful — Large really is bigger than Small. Define the mapping yourself so the order is correct.

### Other options

```python
print(d['City'].astype('category').cat.codes.tolist())    # [1, 0, 2, 1]

codes, uniques = pd.factorize(d['City'])
print(codes, list(uniques))     # [0 1 2 0] ['Mumbai', 'Delhi', 'Pune']
```

`factorize()` numbers by order of appearance rather than alphabetically.

### Choosing an encoding

| Encoding      | Use when                         | Watch out for                         |
| ------------- | -------------------------------- | ------------------------------------- |
| **One-Hot**   | No natural order (city, colour)  | Column explosion with many categories |
| **Label**     | Target variable, or ordered data | Creates a fake ordering               |
| **Ordinal**   | Real order (S/M/L, Low/High)     | You must define the mapping           |
| **Frequency** | Very many categories             | Ties between equally common values    |

---

## Binning Continuous Data

Turning numbers into categories often makes patterns clearer.

### `cut()` — fixed bin edges

```python
ages = pd.Series([15, 25, 35, 45, 55, 65])

print(pd.cut(ages, bins=[0, 18, 35, 60, 100],
             labels=['Teen', 'Young', 'Middle', 'Senior']).tolist())
```

Output:

```
['Teen', 'Young', 'Young', 'Middle', 'Senior', 'Senior']
```

### `qcut()` — equal-sized groups (quantiles)

```python
print(pd.qcut(pd.Series([1, 2, 3, 4, 5, 6, 7, 8]), 4,
              labels=['Q1', 'Q2', 'Q3', 'Q4']).tolist())
```

Output:

```
['Q1', 'Q1', 'Q2', 'Q2', 'Q3', 'Q3', 'Q4', 'Q4']
```

| `cut()`                                | `qcut()`                             |
| -------------------------------------- | ------------------------------------ |
| You define the boundaries              | Pandas splits by quantile            |
| Bins can have different counts         | Each bin has the same count          |
| Use for meaningful ranges (age groups) | Use for quartiles, deciles, rankings |

---

## A Complete Cleaning Pipeline

Putting the whole module together:

```python
def clean_data(df):
    # 1. Remove exact duplicates
    df = df.drop_duplicates()

    # 2. Standardise text columns
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].str.strip().str.title()

    # 3. Fix data types
    df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
    df['Amount'] = pd.to_numeric(df['Amount'], errors='coerce')

    # 4. Handle missing values
    df['Amount'] = df['Amount'].fillna(df['Amount'].median())
    df['Category'] = df['Category'].fillna('Unknown')

    # 5. Cap outliers
    Q1, Q3 = df['Amount'].quantile([0.25, 0.75])
    IQR = Q3 - Q1
    df['Amount'] = df['Amount'].clip(Q1 - 1.5 * IQR, Q3 + 1.5 * IQR)

    # 6. Engineer features
    df['Year'] = df['Date'].dt.year
    df['Month'] = df['Date'].dt.month

    # 7. Tidy the index
    return df.reset_index(drop=True)
```

### The cleaning checklist

- [ ] `df.info()` and `df.describe()` — understand the shape
- [ ] `df.isnull().sum()` — find the gaps
- [ ] `df.duplicated().sum()` — find duplicates
- [ ] Check `dtypes` — fix anything stored as text
- [ ] `df['col'].unique()` on text columns — spot inconsistent spellings
- [ ] Look for impossible values (negative ages, future dates)
- [ ] Decide on a missing-value strategy per column
- [ ] Investigate outliers before removing them
- [ ] Scale numeric features if the model needs it
- [ ] Encode categorical features
- [ ] Save the cleaned dataset separately — **never overwrite the raw data**

---

## Common Mistakes

### 1. Comparing to `NaN` with `==`

```python
df[df['col'] == np.nan]     # ❌ always empty
df[df['col'].isna()]        # ✅
```

### 2. Filling the mean when outliers exist

```python
df['Salary'].fillna(df['Salary'].mean())     # ❌ skewed by outliers
df['Salary'].fillna(df['Salary'].median())   # ✅ robust
```

### 3. Dropping too much

```python
df.dropna()     # ❌ can delete most of your dataset
```

Always check `len(df)` before and after.

### 4. Scaling before splitting into train and test

```python
# ❌ data leakage — test statistics influence the scaler
X_scaled = scaler.fit_transform(X)
X_train, X_test = train_test_split(X_scaled)

# ✅ correct order
X_train, X_test = train_test_split(X)
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

### 5. Label encoding unordered categories

```python
le.fit_transform(df['City'])     # ❌ implies Pune > Delhi
pd.get_dummies(df['City'])       # ✅
```

### 6. Forgetting to reassign

```python
df.drop_duplicates()          # ❌ result thrown away
df = df.drop_duplicates()     # ✅
```

### 7. Overwriting the raw data

```python
df.to_csv('data.csv')                 # ❌ original destroyed
df.to_csv('data_cleaned.csv')         # ✅
```

### 8. Cleaning without looking first

Run `df.sample(10)` and actually read the rows. Automated cleaning applied blindly creates silent errors.

---

## Quick Reference

| Task               | Code                                      |
| ------------------ | ----------------------------------------- |
| Count missing      | `df.isnull().sum()`                       |
| Drop missing rows  | `df.dropna()`                             |
| Drop by column     | `df.dropna(subset=['c'])`                 |
| Fill with value    | `df.fillna(0)`                            |
| Fill with mean     | `df['c'].fillna(df['c'].mean())`          |
| Forward fill       | `df['c'].ffill()`                         |
| Interpolate        | `df['c'].interpolate()`                   |
| Find duplicates    | `df.duplicated().sum()`                   |
| Drop duplicates    | `df.drop_duplicates()`                    |
| Dedupe on columns  | `df.drop_duplicates(subset=['c'])`        |
| IQR bounds         | `Q1 - 1.5*IQR`, `Q3 + 1.5*IQR`            |
| Cap outliers       | `df['c'].clip(low, high)`                 |
| To numeric         | `pd.to_numeric(df['c'], errors='coerce')` |
| To datetime        | `pd.to_datetime(df['c'])`                 |
| To category        | `df['c'].astype('category')`              |
| Strip whitespace   | `df['c'].str.strip()`                     |
| Title case         | `df['c'].str.title()`                     |
| Replace text       | `df['c'].str.replace(a, b)`               |
| Split into columns | `df['c'].str.split(' ', expand=True)`     |
| Extract year       | `df['d'].dt.year`                         |
| Weekday name       | `df['d'].dt.day_name()`                   |
| Normalise          | `MinMaxScaler().fit_transform(X)`         |
| Standardise        | `StandardScaler().fit_transform(X)`       |
| One-hot encode     | `pd.get_dummies(df, columns=['c'])`       |
| Label encode       | `LabelEncoder().fit_transform(y)`         |
| Bin by range       | `pd.cut(s, bins=[...])`                   |
| Bin by quantile    | `pd.qcut(s, 4)`                           |
