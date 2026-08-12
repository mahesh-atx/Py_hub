# Module 25: Pandas

## What is Pandas?

**Pandas** is the library for working with **tabular data** — rows and columns, like a spreadsheet or a database table. If NumPy is about numbers, Pandas is about **labelled data**.

It is built on top of NumPy and is the single most-used tool in a data analyst's day.

```bash
pip install pandas
```

```python
import pandas as pd      # pd is the universal convention
import numpy as np

print(pd.__version__)    # 2.2.3
```

### The two core objects

| Object        | Dimensions | Think of it as                           |
| ------------- | ---------- | ---------------------------------------- |
| **Series**    | 1D         | A single column with labels              |
| **DataFrame** | 2D         | A whole table (many Series side by side) |

---

## Series

A **Series** is a one-dimensional labelled array. Every value has an **index**.

```python
s = pd.Series([10, 20, 30, 40, 50])
print(s)
```

Output:

```
0    10
1    20
2    30
3    40
4    50
dtype: int64
```

The left column is the **index** (auto-created 0,1,2…), the right is the **values**.

```python
print(s.dtype)     # int64
print(s.shape)     # (5,)
```

### Custom index

```python
s2 = pd.Series([10, 20, 30], index=['a', 'b', 'c'])
print(s2)
print(s2['b'])     # 20
```

Output:

```
a    10
b    20
c    30
dtype: int64
20
```

### From a dictionary

Keys become the index automatically.

```python
s3 = pd.Series({'Mumbai': 20.4, 'Delhi': 19.8, 'Pune': 7.4})
print(s3)
print(s3['Mumbai'])    # 20.4
```

Output:

```
Mumbai    20.4
Delhi     19.8
Pune       7.4
dtype: float64
20.4
```

### Filtering and maths

```python
print(s3[s3 > 10])
```

Output:

```
Mumbai    20.4
Delhi     19.8
dtype: float64
```

```python
print(s.mean())    # 30.0
print(s.sum())     # 150
print(s.max())     # 50
```

### Series vs list vs NumPy array

| Python list | NumPy array | Pandas Series                     |
| ----------- | ----------- | --------------------------------- |
| No labels   | No labels   | **Has an index**                  |
| Slow maths  | Fast maths  | Fast maths                        |
| Mixed types | One type    | One type (+ `NaN` support)        |
| —           | —           | Built-in `.mean()`, `.describe()` |

---

## DataFrame

A **DataFrame** is a 2D table — the object you will use 95% of the time.

### Creating one from a dictionary

```python
df = pd.DataFrame({
    'Name': ['Mahesh', 'Priya', 'Ravi', 'Anita'],
    'Age': [25, 23, 30, 28],
    'City': ['Mumbai', 'Delhi', 'Pune', 'Mumbai'],
    'Salary': [50000, 60000, 55000, 65000]
})
print(df)
```

Output:

```
     Name  Age    City  Salary
0  Mahesh   25  Mumbai   50000
1   Priya   23   Delhi   60000
2    Ravi   30    Pune   55000
3   Anita   28  Mumbai   65000
```

Each column is a Series. They all share one index.

### Other ways to create one

```python
# From a list of dictionaries — very common with APIs
pd.DataFrame([
    {'Name': 'Mahesh', 'Age': 25},
    {'Name': 'Priya', 'Age': 23}
])

# From a list of lists
pd.DataFrame([['Mahesh', 25], ['Priya', 23]], columns=['Name', 'Age'])

# From a NumPy array
pd.DataFrame(np.random.randn(3, 4), columns=['A', 'B', 'C', 'D'])
```

### Inspecting a DataFrame

These are the first commands you run on **any** new dataset.

```python
print(df.shape)            # (4, 4)   rows, columns
print(df.columns.tolist()) # ['Name', 'Age', 'City', 'Salary']
print(df.index)            # RangeIndex(start=0, stop=4, step=1)
```

```python
print(df.dtypes)
```

Output:

```
Name      object
Age        int64
City      object
Salary     int64
dtype: object
```

`object` means text (string) in Pandas.

### `head()` and `tail()`

```python
print(df.head(2))
```

Output:

```
     Name  Age    City  Salary
0  Mahesh   25  Mumbai   50000
1   Priya   23   Delhi   60000
```

```python
print(df.tail(2))
```

Output:

```
    Name  Age    City  Salary
2   Ravi   30    Pune   55000
3  Anita   28  Mumbai   65000
```

### `info()` — structure and missing values

```python
df.info()
```

Output:

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 4 entries, 0 to 3
Data columns (total 4 columns):
 #   Column  Non-Null Count  Dtype
---  ------  --------------  -----
 0   Name    4 non-null      object
 1   Age     4 non-null      int64
 2   City    4 non-null      object
 3   Salary  4 non-null      int64
dtypes: int64(2), object(2)
memory usage: 260.0+ bytes
```

The **Non-Null Count** instantly tells you where data is missing.

### `describe()` — summary statistics

```python
print(df.describe())
```

Output:

```
             Age        Salary
count   4.000000      4.000000
mean   26.500000  57500.000000
std     3.109126   6454.972244
min    23.000000  50000.000000
25%    24.500000  53750.000000
50%    26.500000  57500.000000
75%    28.500000  61250.000000
max    30.000000  65000.000000
```

Only numeric columns appear. Use `df.describe(include='all')` to include text columns.

### Inspection reference

| Method                     | Shows                      |
| -------------------------- | -------------------------- |
| `df.head(n)`               | First n rows               |
| `df.tail(n)`               | Last n rows                |
| `df.shape`                 | (rows, columns)            |
| `df.columns`               | Column names               |
| `df.index`                 | Row labels                 |
| `df.dtypes`                | Data type per column       |
| `df.info()`                | Structure + nulls + memory |
| `df.describe()`            | Statistics                 |
| `df.sample(n)`             | n random rows              |
| `df.nunique()`             | Unique values per column   |
| `df['col'].value_counts()` | Frequency counts           |

---

## Reading CSV, Excel, JSON

Real data comes from files, not typed dictionaries.

### CSV — the most common format

```python
df = pd.read_csv('data.csv')
```

Useful parameters:

```python
pd.read_csv('data.csv', sep=';')                 # different separator
pd.read_csv('data.csv', index_col=0)             # use column 0 as the index
pd.read_csv('data.csv', usecols=['Name', 'Age']) # only some columns
pd.read_csv('data.csv', nrows=100)               # only the first 100 rows
pd.read_csv('data.csv', skiprows=2)              # skip header junk
pd.read_csv('data.csv', na_values=['?', 'N/A'])  # treat these as missing
pd.read_csv('data.csv', parse_dates=['Date'])    # parse dates properly
pd.read_csv('data.csv', encoding='latin-1')      # fix encoding errors
```

### Writing CSV

```python
df = pd.DataFrame({
    'Name': ['Mahesh', 'Priya', 'Ravi'],
    'Age': [25, 23, 30],
    'Salary': [50000, 60000, 55000]
})

df.to_csv('out.csv', index=False)
print(open('out.csv').read())
```

Output:

```
Name,Age,Salary
Mahesh,25,50000
Priya,23,60000
Ravi,30,55000
```

> ⚠️ Always pass `index=False` when writing, unless the index is meaningful. Otherwise you get an unwanted extra column of 0,1,2… every time you save.

### Excel

Requires `pip install openpyxl`.

```python
df.to_excel('out.xlsx', index=False, sheet_name='Staff')
print(pd.read_excel('out.xlsx', sheet_name='Staff'))
```

Output:

```
     Name  Age  Salary
0  Mahesh   25   50000
1   Priya   23   60000
2    Ravi   30   55000
```

Writing several sheets at once:

```python
with pd.ExcelWriter('report.xlsx') as writer:
    df.to_excel(writer, sheet_name='Staff', index=False)
    df.to_excel(writer, sheet_name='Backup', index=False)
```

### JSON

```python
df.to_json('out.json', orient='records', indent=2)
print(open('out.json').read())
```

Output:

```
[
  {
    "Name":"Mahesh",
    "Age":25,
    "Salary":50000
  },
  {
    "Name":"Priya",
    "Age":23,
    "Salary":60000
  },
  {
    "Name":"Ravi",
    "Age":30,
    "Salary":55000
  }
]
```

```python
print(pd.read_json('out.json'))
```

Output:

```
     Name  Age  Salary
0  Mahesh   25   50000
1   Priya   23   60000
2    Ravi   30   55000
```

### Other sources

```python
pd.read_sql('SELECT * FROM users', connection)   # database
pd.read_html('https://example.com/table')        # tables from a web page
pd.read_clipboard()                              # whatever you just copied
pd.read_parquet('data.parquet')                  # fast columnar format
```

### Reader / writer reference

| Format     | Read                | Write             |
| ---------- | ------------------- | ----------------- |
| CSV        | `pd.read_csv()`     | `df.to_csv()`     |
| Excel      | `pd.read_excel()`   | `df.to_excel()`   |
| JSON       | `pd.read_json()`    | `df.to_json()`    |
| SQL        | `pd.read_sql()`     | `df.to_sql()`     |
| Parquet    | `pd.read_parquet()` | `df.to_parquet()` |
| Dictionary | `pd.DataFrame(d)`   | `df.to_dict()`    |

---

## Selecting Rows and Columns

We will use this slightly larger DataFrame for the rest of the module:

```python
df = pd.DataFrame({
    'Name': ['Mahesh', 'Priya', 'Ravi', 'Anita', 'Kiran', 'Sneha'],
    'Age': [25, 23, 30, 28, 35, 27],
    'City': ['Mumbai', 'Delhi', 'Pune', 'Mumbai', 'Delhi', 'Pune'],
    'Dept': ['IT', 'HR', 'IT', 'Finance', 'IT', 'HR'],
    'Salary': [50000, 60000, 55000, 65000, 80000, 52000]
})
print(df)
```

Output:

```
     Name  Age    City     Dept  Salary
0  Mahesh   25  Mumbai       IT   50000
1   Priya   23   Delhi       HR   60000
2    Ravi   30    Pune       IT   55000
3   Anita   28  Mumbai  Finance   65000
4   Kiran   35   Delhi       IT   80000
5   Sneha   27    Pune       HR   52000
```

### Selecting columns

```python
print(df['Name'].head(3))       # single column → Series
print(type(df['Name']))         # <class 'pandas.core.series.Series'>
```

Output:

```
0    Mahesh
1     Priya
2      Ravi
Name: Name, dtype: object
<class 'pandas.core.series.Series'>
```

```python
print(df[['Name', 'Salary']].head(3))     # list of columns → DataFrame
```

Output:

```
     Name  Salary
0  Mahesh   50000
1   Priya   60000
2    Ravi   55000
```

Remember: **one bracket gives a Series, double brackets give a DataFrame.**

### `loc` vs `iloc`

This is the most important distinction in Pandas.

| `loc`                     | `iloc`                          |
| ------------------------- | ------------------------------- |
| Selects by **label**      | Selects by **integer position** |
| `df.loc[0, 'Name']`       | `df.iloc[0, 0]`                 |
| End of slice **included** | End of slice **excluded**       |
| Works with boolean masks  | Does not                        |

```python
print(df.loc[0:2, ['Name', 'Salary']])
```

Output:

```
     Name  Salary
0  Mahesh   50000
1   Priya   60000
2    Ravi   55000
```

Note `0:2` returned **three** rows — `loc` includes the endpoint.

```python
print(df.iloc[0:2, 0:3])
```

Output:

```
     Name  Age    City
0  Mahesh   25  Mumbai
1   Priya   23   Delhi
```

Here `0:2` returned **two** rows — `iloc` excludes the endpoint, like normal Python slicing.

### Selecting a single row

```python
print(df.iloc[-1])      # last row
```

Output:

```
Name      Sneha
Age          27
City       Pune
Dept         HR
Salary    52000
Name: 5, dtype: object
```

### `loc` with a condition

```python
print(df.loc[df['Salary'] > 55000, ['Name', 'Salary']])
```

Output:

```
    Name  Salary
1  Priya   60000
3  Anita   65000
4  Kiran   80000
```

This "filter rows, pick columns" pattern is used constantly.

### Adding and removing columns

```python
df['Bonus'] = df['Salary'] * 0.10                    # new column
df['Total'] = df['Salary'] + df['Bonus']             # from other columns
df['Level'] = np.where(df['Salary'] > 55000, 'Senior', 'Junior')

df = df.drop('Bonus', axis=1)                        # drop a column
df = df.drop([0, 1], axis=0)                         # drop rows by index
```

Remember: `axis=0` means rows, `axis=1` means columns.

---

## Filtering Data

Filtering uses a **boolean mask** — exactly like NumPy.

```python
print(df[df['Age'] > 27])
```

Output:

```
    Name  Age    City     Dept  Salary
2   Ravi   30    Pune       IT   55000
3  Anita   28  Mumbai  Finance   65000
4  Kiran   35   Delhi       IT   80000
```

### Multiple conditions

```python
print(df[(df['Age'] > 25) & (df['City'] == 'Mumbai')])
```

Output:

```
    Name  Age    City     Dept  Salary
3  Anita   28  Mumbai  Finance   65000
```

> ⚠️ Use `&`, `|`, `~` — never `and`, `or`, `not`. Every condition needs its own parentheses.

### `isin()` — match any of several values

```python
print(df[df['City'].isin(['Mumbai', 'Pune'])])
```

Output:

```
     Name  Age    City     Dept  Salary
0  Mahesh   25  Mumbai       IT   50000
2    Ravi   30    Pune       IT   55000
3   Anita   28  Mumbai  Finance   65000
5   Sneha   27    Pune       HR   52000
```

### String filtering

```python
print(df[df['Name'].str.startswith('M')])
```

Output:

```
     Name  Age    City Dept  Salary
0  Mahesh   25  Mumbai   IT   50000
```

Other string filters:

```python
df[df['Name'].str.contains('ra')]
df[df['Name'].str.endswith('a')]
df[df['Name'].str.len() > 5]
```

### `query()` — a readable alternative

```python
print(df.query('Salary > 55000 and Age < 30'))
```

Output:

```
    Name  Age    City     Dept  Salary
1  Priya   23   Delhi       HR   60000
3  Anita   28  Mumbai  Finance   65000
```

Inside `query()` you can use plain `and` / `or`, which many people find easier to read.

### Negating a filter

```python
print(df[~(df['Dept'] == 'IT')])
```

Output:

```
    Name  Age    City     Dept  Salary
1  Priya   23   Delhi       HR   60000
3  Anita   28  Mumbai  Finance   65000
5  Sneha   27    Pune       HR   52000
```

### Filtering reference

| Task             | Code                            |
| ---------------- | ------------------------------- |
| Single condition | `df[df['Age'] > 25]`            |
| AND              | `df[(a) & (b)]`                 |
| OR               | `df[(a) \| (b)]`                |
| NOT              | `df[~(a)]`                      |
| In a list        | `df[df['c'].isin([...])]`       |
| Between          | `df[df['Age'].between(25, 30)]` |
| Missing          | `df[df['c'].isna()]`            |
| Text contains    | `df[df['c'].str.contains('x')]` |
| Readable syntax  | `df.query('Age > 25')`          |

---

## Sorting Data

```python
print(df.sort_values('Salary'))
```

Output:

```
     Name  Age    City     Dept  Salary
0  Mahesh   25  Mumbai       IT   50000
5   Sneha   27    Pune       HR   52000
2    Ravi   30    Pune       IT   55000
1   Priya   23   Delhi       HR   60000
3   Anita   28  Mumbai  Finance   65000
4   Kiran   35   Delhi       IT   80000
```

### Descending

```python
print(df.sort_values('Salary', ascending=False).head(3))
```

Output:

```
    Name  Age    City     Dept  Salary
4  Kiran   35   Delhi       IT   80000
3  Anita   28  Mumbai  Finance   65000
1  Priya   23   Delhi       HR   60000
```

### Sorting by several columns

```python
print(df.sort_values(['Dept', 'Salary'], ascending=[True, False]))
```

Output:

```
     Name  Age    City     Dept  Salary
3   Anita   28  Mumbai  Finance   65000
1   Priya   23   Delhi       HR   60000
5   Sneha   27    Pune       HR   52000
4   Kiran   35   Delhi       IT   80000
2    Ravi   30    Pune       IT   55000
```

Sorted by department A→Z, then by salary high→low **within** each department.

### `nlargest()` and `nsmallest()`

Faster and clearer than sorting the whole table.

```python
print(df.nlargest(3, 'Salary')[['Name', 'Salary']])
print(df.nsmallest(2, 'Age')[['Name', 'Age']])
```

Output:

```
    Name  Salary
4  Kiran   80000
3  Anita   65000
1  Priya   60000
    Name  Age
1  Priya   23
0  Mahesh   25
```

### Sorting by index

```python
df.sort_index()                    # by row labels
df.sort_index(axis=1)              # columns alphabetically
df = df.sort_values('Salary').reset_index(drop=True)   # renumber 0,1,2...
```

---

## GroupBy

**GroupBy** implements the _split → apply → combine_ pattern: split the data into groups, apply a calculation to each, combine the results.

This is the single most powerful feature in Pandas.

### Basic grouping

```python
print(df.groupby('Dept')['Salary'].mean())
```

Output:

```
Dept
Finance    65000.000000
HR         56000.000000
IT         61666.666667
Name: Salary, dtype: float64
```

### Several statistics at once

```python
print(df.groupby('Dept')['Salary'].agg(['count', 'mean', 'min', 'max', 'sum']))
```

Output:

```
         count          mean    min    max     sum
Dept
Finance      1  65000.000000  65000  65000   65000
HR           2  56000.000000  52000  60000  112000
IT           3  61666.666667  50000  80000  185000
```

### Counting group sizes

```python
print(df.groupby('Dept').size())
```

Output:

```
Dept
Finance    1
HR         2
IT         3
dtype: int64
```

### Grouping by several columns

```python
print(df.groupby(['City', 'Dept'])['Salary'].mean())
```

Output:

```
City    Dept
Delhi   HR         60000.0
        IT         80000.0
Mumbai  Finance    65000.0
        IT         50000.0
Pune    HR         52000.0
        IT         55000.0
Name: Salary, dtype: float64
```

### Named aggregations — the cleanest style

```python
print(df.groupby('Dept').agg(
    avg_sal=('Salary', 'mean'),
    headcount=('Name', 'count'),
    max_age=('Age', 'max')
))
```

Output:

```
              avg_sal  headcount  max_age
Dept
Finance  65000.000000          1       28
HR       56000.000000          2       27
IT       61666.666667          3       35
```

You control the output column names, which makes reports far more readable.

### `transform()` — keep the original shape

Where `agg()` collapses groups into one row each, `transform()` broadcasts the result back to every row.

```python
print(df.groupby('Dept')['Salary'].transform('mean'))
```

Output:

```
0    61666.666667
1    56000.000000
2    61666.666667
3    65000.000000
4    61666.666667
5    56000.000000
Name: Salary, dtype: float64
```

This is perfect for creating comparison columns:

```python
df['dept_avg'] = df.groupby('Dept')['Salary'].transform('mean')
df['vs_dept_avg'] = df['Salary'] - df['dept_avg']
```

### Looping over groups

```python
for name, group in df.groupby('Dept'):
    print(name, len(group))
```

Output:

```
Finance 1
HR 2
IT 3
```

### Top row per group

```python
print(df.groupby('Dept').apply(lambda g: g.nlargest(1, 'Salary'), include_groups=False))
```

Output:

```
            Name  Age    City  Salary
Dept
Finance 3  Anita   28  Mumbai   65000
HR      1  Priya   23   Delhi   60000
IT      4  Kiran   35   Delhi   80000
```

### Common aggregation functions

| Function             | Returns                   |
| -------------------- | ------------------------- |
| `mean()`             | Average                   |
| `sum()`              | Total                     |
| `count()`            | Non-null count            |
| `size()`             | Row count including nulls |
| `min()` / `max()`    | Extremes                  |
| `std()` / `var()`    | Spread                    |
| `median()`           | Middle value              |
| `nunique()`          | Distinct count            |
| `first()` / `last()` | First / last row          |
| `agg([...])`         | Several at once           |
| `transform(f)`       | Same shape as input       |

---

## Merge and Join

Combining tables is the everyday reality of data work.

```python
emp = pd.DataFrame({
    'emp_id': [1, 2, 3, 4],
    'name': ['Mahesh', 'Priya', 'Ravi', 'Anita'],
    'dept_id': [10, 20, 10, 30]
})

dept = pd.DataFrame({
    'dept_id': [10, 20, 40],
    'dept_name': ['IT', 'HR', 'Marketing']
})
```

Note that `dept_id` 30 has no department, and department 40 has no employees. Those mismatches show the difference between join types.

### Inner join (default) — only matches

```python
print(pd.merge(emp, dept, on='dept_id'))
```

Output:

```
   emp_id    name  dept_id dept_name
0       1  Mahesh       10        IT
1       2   Priya       20        HR
2       3    Ravi       10        IT
```

Anita (dept 30) and Marketing (dept 40) both disappear.

### Left join — keep all left rows

```python
print(pd.merge(emp, dept, on='dept_id', how='left'))
```

Output:

```
   emp_id    name  dept_id dept_name
0       1  Mahesh       10        IT
1       2   Priya       20        HR
2       3    Ravi       10        IT
3       4   Anita       30       NaN
```

Anita is kept, with `NaN` for the missing department.

### Right join — keep all right rows

```python
print(pd.merge(emp, dept, on='dept_id', how='right'))
```

Output:

```
   emp_id    name  dept_id  dept_name
0     1.0  Mahesh       10         IT
1     3.0    Ravi       10         IT
2     2.0   Priya       20         HR
3     NaN     NaN       40  Marketing
```

### Outer join — keep everything

```python
print(pd.merge(emp, dept, on='dept_id', how='outer'))
```

Output:

```
   emp_id    name  dept_id  dept_name
0     1.0  Mahesh       10         IT
1     3.0    Ravi       10         IT
2     2.0   Priya       20         HR
3     4.0   Anita       30        NaN
4     NaN     NaN       40  Marketing
```

### Join types compared

| Type    | Keeps                          |
| ------- | ------------------------------ |
| `inner` | Only rows matching in **both** |
| `left`  | **All** left rows + matches    |
| `right` | **All** right rows + matches   |
| `outer` | **All** rows from both         |

> 💡 `left` is the safest default in analysis — you keep every record from your main table and simply get `NaN` where the lookup failed. An accidental `inner` join silently deletes rows, which is a very easy way to get wrong answers.

### Merging on differently named columns

```python
pd.merge(emp, dept, left_on='dept_id', right_on='id')
```

### `concat()` — stacking tables

```python
d1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
d2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})

print(pd.concat([d1, d2], ignore_index=True))
```

Output:

```
   A  B
0  1  3
1  2  4
2  5  7
3  6  8
```

Without `ignore_index=True` the original index values 0,1,0,1 are kept.

Side by side:

```python
print(pd.concat([d1, d2], axis=1))
```

Output:

```
   A  B  A  B
0  1  3  5  7
1  2  4  6  8
```

### `join()` — merge on the index

```python
l = pd.DataFrame({'v': [1, 2]}, index=['a', 'b'])
r = pd.DataFrame({'w': [3, 4]}, index=['a', 'c'])

print(l.join(r))
print(l.join(r, how='outer'))
```

Output:

```
   v    w
a  1  3.0
b  2  NaN
     v    w
a  1.0  3.0
b  2.0  NaN
c  NaN  4.0
```

### `merge` vs `join` vs `concat`

| Function      | Use for                              |
| ------------- | ------------------------------------ |
| `pd.merge()`  | Joining on **columns** (most common) |
| `df.join()`   | Joining on the **index**             |
| `pd.concat()` | **Stacking** tables together         |

---

## Pivot Tables

A **pivot table** reshapes data into a summary grid — the same idea as pivot tables in Excel.

```python
print(df.pivot_table(index='City', columns='Dept', values='Salary', aggfunc='mean'))
```

Output:

```
Dept    Finance       HR       IT
City
Delhi       NaN  60000.0  80000.0
Mumbai  65000.0      NaN  50000.0
Pune        NaN  52000.0  55000.0
```

The parameters:

| Parameter    | Meaning                                    |
| ------------ | ------------------------------------------ |
| `index`      | What becomes the rows                      |
| `columns`    | What becomes the columns                   |
| `values`     | What gets aggregated                       |
| `aggfunc`    | How to aggregate (`mean`, `sum`, `count`…) |
| `fill_value` | Replacement for `NaN`                      |
| `margins`    | Add row/column totals                      |

### Filling the gaps

```python
print(df.pivot_table(index='City', columns='Dept', values='Salary',
                     aggfunc='mean', fill_value=0))
```

Output:

```
Dept    Finance       HR       IT
City
Delhi       0.0  60000.0  80000.0
Mumbai  65000.0      0.0  50000.0
Pune        0.0  52000.0  55000.0
```

### Several value columns

```python
print(df.pivot_table(index='City', values=['Salary', 'Age'], aggfunc='mean'))
```

Output:

```
         Age   Salary
City
Delhi   29.0  70000.0
Mumbai  26.5  57500.0
Pune    28.5  53500.0
```

### Adding totals with `margins`

```python
print(df.pivot_table(index='City', columns='Dept', values='Salary',
                     aggfunc='count', fill_value=0, margins=True))
```

Output:

```
Dept    Finance  HR  IT  All
City
Delhi         0   1   1    2
Mumbai        1   0   1    2
Pune          0   1   1    2
All           1   2   3    6
```

### `crosstab()` — frequency tables

```python
print(pd.crosstab(df['City'], df['Dept']))
```

Output:

```
Dept    Finance  HR  IT
City
Delhi         0   1   1
Mumbai        1   0   1
Pune          0   1   1
```

`crosstab()` is a shortcut for counting combinations of two columns.

### `melt()` — the reverse of pivot

`melt()` turns wide data back into long (tidy) format.

```python
wide = pd.DataFrame({
    'Name': ['Mahesh', 'Priya'],
    'Math': [85, 92],
    'Science': [78, 88]
})

print(pd.melt(wide, id_vars='Name', var_name='Subject', value_name='Marks'))
```

Output:

```
     Name  Subject  Marks
0  Mahesh     Math     85
1   Priya     Math     92
2  Mahesh  Science     78
3   Priya  Science     88
```

---

## Exporting Data

```python
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', index=False, sheet_name='Data')
df.to_json('output.json', orient='records', indent=2)
```

### To a Python object

```python
print(df.to_dict('records'))
```

Output:

```
[{'Name': 'Mahesh', 'Age': 25, 'Salary': 50000}, {'Name': 'Priya', 'Age': 23, 'Salary': 60000}, {'Name': 'Ravi', 'Age': 30, 'Salary': 55000}]
```

### Other export targets

```python
df.to_string(index=False)      # plain text, no index
df.to_markdown(index=False)    # Markdown table
df.to_html('table.html')       # HTML
df.to_clipboard()              # paste straight into Excel
df.to_sql('table', conn)       # database
df.to_parquet('data.parquet')  # fast columnar format
```

### Export options

```python
df.to_csv('out.csv', index=False, columns=['Name', 'Salary'])  # only some columns
df.to_csv('out.csv', index=False, sep='\t')                    # tab separated
df.to_csv('out.csv', index=False, float_format='%.2f')         # round floats
df.to_csv('out.csv', index=False, encoding='utf-8-sig')        # Excel-friendly UTF-8
```

---

## Common Mistakes

### 1. `and` / `or` instead of `&` / `|`

```python
df[(df['Age'] > 25) and (df['City'] == 'Mumbai')]   # ❌ ValueError
df[(df['Age'] > 25) & (df['City'] == 'Mumbai')]     # ✅
```

### 2. Forgetting parentheses

```python
df[df['Age'] > 25 & df['Salary'] > 50000]      # ❌ wrong precedence
df[(df['Age'] > 25) & (df['Salary'] > 50000)]  # ✅
```

### 3. Chained assignment (`SettingWithCopyWarning`)

```python
df[df['Age'] > 25]['Salary'] = 70000     # ❌ may not change df at all
df.loc[df['Age'] > 25, 'Salary'] = 70000 # ✅
```

### 4. Forgetting that most methods return a copy

```python
df.drop('col', axis=1)          # ❌ df is unchanged
df = df.drop('col', axis=1)     # ✅
```

### 5. Confusing `loc` and `iloc` slice endpoints

```python
df.loc[0:2]     # 3 rows — endpoint included
df.iloc[0:2]    # 2 rows — endpoint excluded
```

### 6. Writing the index by accident

```python
df.to_csv('out.csv')                 # ❌ adds an unnamed index column
df.to_csv('out.csv', index=False)    # ✅
```

### 7. Using `==` to find missing values

```python
df[df['col'] == np.nan]     # ❌ always empty — NaN != NaN
df[df['col'].isna()]        # ✅
```

### 8. Looping over rows

```python
# Slow
for i, row in df.iterrows():
    df.loc[i, 'total'] = row['a'] + row['b']

# Fast — vectorised
df['total'] = df['a'] + df['b']
```

---

## Quick Reference

| Task             | Code                                        |
| ---------------- | ------------------------------------------- |
| Import           | `import pandas as pd`                       |
| Read CSV         | `pd.read_csv('f.csv')`                      |
| Write CSV        | `df.to_csv('f.csv', index=False)`           |
| First rows       | `df.head()`                                 |
| Structure        | `df.info()`                                 |
| Statistics       | `df.describe()`                             |
| Shape            | `df.shape`                                  |
| One column       | `df['col']`                                 |
| Several columns  | `df[['a', 'b']]`                            |
| By label         | `df.loc[0, 'col']`                          |
| By position      | `df.iloc[0, 0]`                             |
| Filter           | `df[df['Age'] > 25]`                        |
| Multiple filters | `df[(a) & (b)]`                             |
| Readable filter  | `df.query('Age > 25')`                      |
| Sort             | `df.sort_values('col')`                     |
| Top n            | `df.nlargest(3, 'col')`                     |
| Group            | `df.groupby('col')['x'].mean()`             |
| Named agg        | `df.groupby('c').agg(m=('x','mean'))`       |
| Merge            | `pd.merge(a, b, on='id', how='left')`       |
| Stack            | `pd.concat([a, b])`                         |
| Pivot            | `df.pivot_table(index=, columns=, values=)` |
| Frequency        | `df['col'].value_counts()`                  |
| Unique           | `df['col'].unique()`                        |
| New column       | `df['new'] = df['a'] * 2`                   |
| Drop column      | `df.drop('c', axis=1)`                      |
| Reset index      | `df.reset_index(drop=True)`                 |
