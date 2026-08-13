# 🧠 Phase 6 — 60 Practice Questions

Questions for **Modules 24–29**: NumPy, Pandas, cleaning, visualisation and analysis.

## Before you start

```bash
cd starter-project
python data/make_messy_data.py    # generates the raw CSVs
python profile_raw.py             # see the damage before cleaning
```

Tiers 1–3 use small arrays and frames you create yourself. **Tiers 4–6 use the starter project's messy data**, where every expected value has been verified.

> 💡 **Tip:** For every Pandas operation, ask whether it returns a **copy** or a **view**. The `SettingWithCopyWarning` exists because Pandas often cannot tell you which one you got, and a chained assignment that silently does nothing is this library's signature failure mode.

---

## Tier 1 — NumPy Arrays (Q1–Q10)

## Q1. Create and inspect

Create a 1D array of 10 integers and a 3×4 array of zeros. For each print `shape`, `ndim`, `size` and `dtype`.

**Expected:**

```
1D: shape (10,)   ndim 1   size 10   dtype int64
2D: shape (3, 4)  ndim 2   size 12   dtype float64
```

**Explanation:** `shape` is the size of each dimension, `ndim` is how many dimensions, `size` is the total element count (`3×4 = 12`). Note the dtypes differ: integers give `int64` while `np.zeros` defaults to `float64`. Unlike a Python list, every element in an array shares one type — that uniformity is what makes NumPy fast.

**Hint:** `arr.shape`, `arr.ndim`, `arr.size`, `arr.dtype` — attributes, no parentheses.

---

## Q2. Array creation functions

Produce each: `arange(0,20,3)`, `linspace(0,1,5)`, `ones((2,3))`, `full((2,2),7)`, `eye(3)`, and a random array with `np.random.RandomState(0)`.

**Expected:** `linspace(0,1,5)` gives `[0., 0.25, 0.5, 0.75, 1.]`

**Explanation:** `arange` takes a **step** and excludes the endpoint; `linspace` takes a **count** and includes it, which is why `linspace(0,1,5)` gives exactly `[0, 0.25, 0.5, 0.75, 1.0]`. Use `linspace` whenever you need the endpoint or a precise number of points — `arange` with a float step accumulates rounding error.

**Hint:** `np.arange(start, stop, step)` versus `np.linspace(start, stop, num)`.

---

## Q3. Indexing and slicing

For a 5×5 array of `arange(25).reshape(5,5)`, extract: the third row, the second column, the top-left 2×2 block, the last two rows, and every other element of row 0.

**Expected** for `np.arange(25).reshape(5,5)`:

```
row 2        [10 11 12 13 14]
column 1     [ 1  6 11 16 21]
top-left 2x2 [[0 1]
              [5 6]]
last 2 rows  [[15 16 17 18 19]
              [20 21 22 23 24]]
row 0 step 2 [0 2 4]
```

**Explanation:** Indexing is `[row, column]` and slicing works per dimension. `a[2]` gives row 2; `a[:, 1]` gives column 1 as a 1D array; `a[:2, :2]` gives the corner block. Note `a[2]` and `a[2, :]` are the same thing, but `a[:, 1]` cannot be shortened — the row index must be given explicitly as `:`.

**Hint:** Comma-separated indices, one per dimension: `a[rows, columns]`.

---

## Q4. Boolean masking

From `arange(1,21)`, select values above 10, even values, and values divisible by 3. Then count how many satisfy each condition without a loop.

**Expected** for `np.arange(1,21)`:

```
> 10          [11 12 13 14 15 16 17 18 19 20]   count 10
even          [ 2  4  6  8 10 12 14 16 18 20]   count 10
div by 3      [ 3  6  9 12 15 18]               count  6
```

**Explanation:** `arr > 10` produces a boolean array, and indexing with it keeps only the `True` positions. Counting uses `.sum()` on the mask directly, because `True` is 1 — no loop needed. Combine conditions with `&` and `|`, **not** `and` and `or`, and wrap each in parentheses because `&` binds tighter than `>`.

**Hint:** `arr[arr > 10]` to select, `(arr > 10).sum()` to count.

---

## Q5. Vectorisation vs loops

Square every element of a 100,000-element array two ways: a Python loop and `arr ** 2`. Time both with `time.perf_counter` and report the ratio.

**Expected:** the vectorised version should be at least 50× faster. Explain why in a comment.

**Explanation:** The vectorised version is typically 50–100× faster. NumPy stores elements contiguously in one typed block and runs the loop in compiled C, while a Python loop creates a Python object for every element and dispatches the multiplication through the interpreter each time. The gap is about **where the loop runs**, not about the algorithm.

**Hint:** `time.perf_counter()` before and after each version, then divide.

---

## Q6. Broadcasting

Add a shape `(3,1)` array to a shape `(1,4)` array. Predict the result shape before running.

**Expected:** `(3,4)`

Then try `(3,2) + (3,)` and record the error. State the broadcasting rule that failed.

**Explanation:** `(3,1) + (1,4)` broadcasts to **(3,4)**: NumPy compares shapes right to left, and a dimension of 1 stretches to match. `(3,2) + (3,)` fails because the trailing dimensions 2 and 3 are neither equal nor 1. Reshaping to `(3,1)` would fix it — broadcasting rules are about shape alignment, not element count.

**Hint:** Align the shapes right-to-left; each pair must be equal or one of them must be 1.

---

## Q7. Aggregations along axes

For a 3×4 array compute: total sum, sum along axis 0, sum along axis 1, and the mean, max and argmax of each. Say in a comment what "axis 0" actually collapses.

**Expected** for `np.arange(12).reshape(3,4)`:

```
total sum      66
sum axis=0     [12 15 18 21]    <- collapses the ROWS, one value per column
sum axis=1     [ 6 22 38]       <- collapses the COLUMNS, one per row
mean            5.5
max            11
argmax         11
```

**Explanation:** `axis=0` **collapses the rows**, producing one value per column — `[12,15,18,21]`, four numbers from a 3×4 array. `axis=1` collapses the columns, giving three. The reliable way to remember it: the axis you name is the one that **disappears** from the result shape. Note `argmax` returns a flat index unless you pass an axis.

**Hint:** If the result has 4 values from a 3×4 array, you collapsed the 3 — that was axis 0.

---

## Q8. Reshaping

Reshape a 12-element array to `(3,4)`, `(4,3)`, `(2,2,3)` and `(-1,2)`. Explain what `-1` does. Then try reshaping to `(5,3)` and record the error.

**Expected:**

```
(3,4) ok    (4,3) ok    (2,2,3) ok    (-1,2) -> (6,2)
(5,3)  ValueError: cannot reshape array of size 12 into shape (5,3)
```

**Explanation:** `-1` means "work this dimension out from the total size", so `(-1,2)` on 12 elements gives `(6,2)`. Reshaping to `(5,3)` fails because `5×3 = 15 ≠ 12` — the element count must be preserved exactly. Only one dimension may be `-1`.

**Hint:** `arr.reshape(-1, 2)` when you know the columns but not the rows.

---

## Q9. dtype and overflow

Create an `int8` array with value 127 and add 1. Record the result.

**Expected:** `-128` — silent wraparound, no error. Explain what happened and how to prevent it.

**Explanation:** **`-128`, with no error at all.** `int8` holds −128 to 127, so 127 + 1 wraps around to the bottom of the range. NumPy chose fixed-width types for speed and does not check for overflow the way Python's unlimited `int` does. Prevent it by choosing a wider dtype (`int32`, `int64`) or by checking your value range before downcasting to save memory.

**Hint:** `np.iinfo(np.int8)` prints the exact min and max of the type.

---

## Q10. Copy vs view

Slice an array, modify the slice, and show the original changed. Then use `.copy()` and show it did not. State when NumPy gives you a view rather than a copy.

**Expected:**

```python
a = np.arange(10)
v = a[2:5]        # a VIEW
v[0] = 99
a[2]              # 99   <- the original changed

c = a[2:5].copy()
c[0] = 0
a[2]              # 99   <- unchanged
```

Basic slicing gives a view; fancy indexing and boolean masking give copies.

**Explanation:** Basic **slicing returns a view** — a window onto the same memory — so writing through it changes the original. Fancy indexing (`a[[1,3,5]]`) and boolean masking return **copies**. This is why an unexpected mutation can appear far from the code that caused it, and it is the same reference-versus-value question as Phase 2's list aliasing.

**Hint:** `arr.base is not None` tells you whether an array is a view of something else.

---

## Tier 2 — Pandas Fundamentals (Q11–Q22)

## Q11. Series and DataFrame

Create a Series from a dict and a DataFrame from a dict of lists. Print `shape`, `dtypes`, `index`, `columns` and `info()` for the frame.

**Expected:**

```
shape    (3, 2)
dtypes   name    object
         score    int64
index    RangeIndex(start=0, stop=3, step=1)
columns  Index(['name', 'score'], dtype='object')
```

**Explanation:** `shape` is `(rows, columns)`; `dtypes` is per column, because a DataFrame is a collection of Series that each have their own type. `info()` also reports non-null counts and memory use — it is the first thing to run on any frame you did not create yourself.

**Hint:** `pd.DataFrame({'col': [...], ...})` builds one from a dict of lists.

---

## Q12. Selection: `[]`, `loc`, `iloc`

On a 6-row frame, select: one column, two columns, rows 2–4 by position, rows by label, and a specific cell three different ways. State which method you would use in production code and why.

**Expected:** `df.loc[2, 'score']`, `df.iloc[2, 2]` and `df['score'][2]` all
return the same value.

Use `.loc` in production code — `[]` chaining triggers `SettingWithCopyWarning`
and `.iloc` breaks the moment rows are reordered.

**Explanation:** `df['col']` selects a column. `.loc` uses **labels** and includes the endpoint; `.iloc` uses **integer positions** and excludes it. That endpoint difference is the trap: `df.loc[0:2]` returns three rows while `df.iloc[0:2]` returns two. When the index happens to be 0,1,2… the two look interchangeable, and they are not.

**Hint:** `.loc[row_label, col_label]` and `.iloc[row_pos, col_pos]`.

---

## Q13. Boolean filtering

Filter rows on one condition, two conditions with `&`, and two with `|`. Then use `.isin()` and `~` for negation.

**Reminder:** Python's `and`/`or` do not work on Series — you must use `&`/`|` with brackets around each condition.

**Expected:** using `and` instead of `&` raises

```
ValueError: The truth value of a Series is ambiguous.
Use a.empty, a.bool(), a.item(), a.any() or a.all().
```

**Explanation:** Boolean filtering works like NumPy masking: `df[df['age'] > 30]`. Combine conditions with `&` and `|` and parenthesise each one, because Python's operator precedence puts `&` above `>`. Using `and` raises `ValueError: The truth value of a Series is ambiguous` — a genuinely helpful error message.

**Hint:** `df[(df.a > 1) & (df.b < 5)]` — brackets around every condition.

---

## Q14. Adding and dropping columns

Add a computed column, add one with `.assign()`, drop a column, and rename two. Show which operations return a new frame versus modifying in place.

**Expected:**

```
df['new'] = ...        modifies in place, returns None
df.assign(new=...)     returns a NEW frame, original untouched
df.drop('col', axis=1) returns a new frame unless inplace=True
df.rename(columns={})  returns a new frame unless inplace=True
```

**Explanation:** `df['new'] = ...` adds a column in place. `drop` needs `axis=1` for columns and returns a **new** frame unless you pass `inplace=True` — forgetting that is why "my drop did nothing" is such a common complaint. Assigning the result back is clearer than `inplace`.

**Hint:** `df = df.drop(columns=['a', 'b'])` — the `columns=` form needs no axis argument.

---

## Q15. Sorting

Sort by one column ascending, by two columns with mixed directions, and by index. Then use `nlargest(5, 'col')` and compare against `sort_values().head(5)`.

**Expected:** `nlargest(5,'score')` and `sort_values('score',ascending=False).head(5)`
return identical rows. `nlargest` is faster on big frames because it does not
sort the whole column.

**Explanation:** `sort_values('col')` sorts by a column and returns a new frame; `ascending=False` reverses it. The original index travels with the rows, so after sorting the index is out of order — call `.reset_index(drop=True)` if you need positional access afterwards.

**Hint:** `df.sort_values('col', ascending=False)`. Multiple columns: pass a list.

---

## Q16. `groupby` basics

Group by one column and compute the mean. Then group by two columns. Then use `.agg()` with different functions per column.

**Expected** for 6 rows split across two departments:

```
dept
X    30.0
Y    40.0
```

**Explanation:** `groupby` splits, applies and combines. Note the group keys become the **index** of the result and come back sorted **alphabetically**, not by value — so a "top categories" chart built straight from a groupby is really an alphabetical list. Add `.sort_values()`, and see Q45 where this matters for real.

**Hint:** `df.groupby('category')['revenue'].sum().sort_values(ascending=False)`

---

## Q17. `groupby` with multiple aggregations

For a sales frame, produce per-group: count, sum, mean, min and max in one call. Rename the resulting columns sensibly.

**Expected:**

```
      count  sum  mean  min  max
X         3   90  30.0   10   50
Y         3  120  40.0   20   60
```

**Explanation:** `.agg()` takes a dict mapping columns to functions, or a list of functions per column. The result gets a **MultiIndex** on the columns, which is why `result['revenue']['sum']` needs two lookups. Flatten it with `.columns = ['_'.join(c) for c in result.columns]` if that becomes tiresome.

**Hint:** `df.groupby('a').agg({'x': 'sum', 'y': ['mean', 'max']})`

---

## Q18. Merging

Merge two frames on a key with `inner`, `left`, `right` and `outer` joins. Report the row count for each and explain the differences.

**Expected** row counts for a 5-row left frame and a 4-row right frame
sharing 3 keys:

```
inner   3
left    5
right   4
outer   6
```

**Explanation:** `inner` keeps only matching keys, `left` keeps all left rows, `outer` keeps everything. The row counts differ predictably — 3, 5, 4, 6 here — and checking them after every merge is the cheapest bug detector in Pandas. A left join that returns fewer rows than the left frame is impossible; a left join that returns **more** means duplicate keys on the right.

**Hint:** Print `len(df)` before and after every merge, every time.

---

## Q19. The merge row-count trap

Merge where the right frame has duplicate keys. Show the row count **increasing** beyond the left frame's length. Then prevent it with `validate="many_to_one"` and record the error raised.

**Expected:**

```
left frame     5 rows
right frame    7 rows (2 duplicate keys)
merged        7 rows   <- MORE than the left frame

with validate="many_to_one":
MergeError: Merge keys are not unique in right dataset; not a many-to-one merge
```

**Explanation:** Duplicate keys on the right multiply rows: 5 left rows against 7 right rows with 2 duplicated keys gives **7** rows out. Nothing warns you — the frame just grows and every downstream sum is inflated. `validate="many_to_one"` raises `MergeError` instead, turning a silent data corruption into an immediate stop.

**Hint:** Add `validate="many_to_one"` to every merge where you expect a lookup table.

---

## Q20. Concatenation

Concatenate two frames vertically and horizontally. Show what happens when the columns do not match.

**Expected:**

```
vertical  (axis=0)   4 rows
horizontal(axis=1)   (2, 2)
mismatched columns   union of columns, 4 NaN cells filled in
```

**Explanation:** `axis=0` stacks rows, `axis=1` stacks columns side by side. When the columns do not match, `concat` takes the **union** and fills the gaps with `NaN` — no error, just unexpected nulls appearing in a frame you thought was complete. Pass `join='inner'` to keep only shared columns.

**Hint:** `pd.concat([df1, df2], axis=0, ignore_index=True)`

---

## Q21. Pivot tables

Build a pivot table with one index, one column and one value, using `sum`. Then add `margins=True` and verify the totals.

**Expected** with `margins=True`:

```
dept
X       90
Y      120
All    210
```

The `All` row must equal the sum of the others.

**Explanation:** `margins=True` adds an `All` row and column containing the totals, and the `All` row must equal the sum of the others — a built-in reconciliation check. Note `pivot_table` defaults to `aggfunc='mean'`, not `sum`, which quietly produces a completely different (and plausible) table if you forget to specify it.

**Hint:** `df.pivot_table(index=, columns=, values=, aggfunc='sum', margins=True)`

---

## Q22. `apply` vs vectorised

Compute a new column two ways: `df.apply(lambda row: ..., axis=1)` and a vectorised expression. Time both on 10,000 rows and report the ratio.

**Expected:** the vectorised version is typically **50–200× faster** on
10,000 rows. `apply(axis=1)` runs a Python function per row and cannot use
NumPy's C loops.

**Explanation:** The vectorised version is typically **50–200× faster** on 10,000 rows. `apply(axis=1)` calls a Python function once per row and cannot use NumPy's C loops — it is a `for` loop wearing a Pandas costume. Reach for `apply(axis=1)` only when the logic genuinely cannot be expressed as column arithmetic.

**Hint:** Try `df['a'] * df['b']` instead of `df.apply(lambda r: r.a * r.b, axis=1)`.

---

## Tier 3 — Cleaning Techniques (Q23–Q32)

## Q23. Detecting missing values

Create a frame with `NaN` values. Use `isnull().sum()`, `notnull()`, and compute the percentage missing per column.

**Expected:**

```
       nulls   pct
col_a      2  20.0%
col_b      0   0.0%
col_c      5  50.0%
```

**Explanation:** `isnull().sum()` counts per column; dividing by `len(df)` gives the percentage. Always report the **percentage** alongside the count — 5 missing means nothing until you know whether the frame has 10 rows or 10,000. And note this only catches real `NaN`, which is exactly the problem Q24 exposes.

**Hint:** `df.isnull().sum()` and `df.isnull().mean() * 100` in one small frame.

---

## Q24. The text-null problem

Create a frame where missing values are stored as the strings `"N/A"`, `"-"`, `""` and `"?"`. Show that `isnull().sum()` returns **zero** for every column. Then write the code that actually finds them.

**This is the single most important question in the tier.**

**Expected:**

```
df.isnull().sum()
col_a    0
col_b    0          <- reports perfectly clean data

df.isin(["N/A","-","","?"]).sum()
col_a    3
col_b    5          <- the truth
```

This is the single most important cell in the tier.

**Explanation:** **`isnull().sum()` returns 0 for every column** because `"N/A"`, `"-"`, `""` and `"?"` are all perfectly valid non-null **strings**. Pandas has no way to know they mean "missing". The column stays `object` dtype, every mean silently skips nothing and computes on garbage, and your data-quality report says the file is clean. Find them with `df.isin([...])` or fix them at load time with `pd.read_csv(..., na_values=[...])`.

**Hint:** `df.isin(["N/A", "-", "", "?"]).sum()` gives the real counts.

---

## Q25. Filling missing values

Fill with a constant, the mean, the median, forward-fill and backward-fill. For a column with 40% missing, argue in two sentences whether filling is appropriate at all.

**Expected:** mean and median filling both shrink the variance and bias any
model toward the centre. At 40% missing, imputation invents more data than it
preserves — flag the column instead, or drop it.

**Explanation:** Mean and median imputation both **shrink the variance** and pull every filled row toward the centre, which makes a model look more confident than the data justifies. Forward-fill assumes the previous value still applies — reasonable for a time series, wrong for unordered rows. At 40% missing you are inventing more than you are preserving: add a `was_missing` flag and keep the nulls, or drop the column.

**Hint:** `fillna(value)`, `fillna(df.col.mean())`, `ffill()`, `bfill()` — and ask whether any is honest.

---

## Q26. Dropping

Use `dropna()` with `how='any'`, `how='all'`, `thresh=`, and `subset=`. Report the row count after each.

**Expected** for a 10-row frame with scattered nulls:

```
original          10
how='any'          4
how='all'         10
thresh=2           8
subset=['col_a']   8
```

Your numbers depend on your test frame — the ordering of the counts is
what must make sense.

**Explanation:** `how='any'` drops a row with **any** null and is brutal — it took 10 rows to 4 here. `how='all'` only drops entirely empty rows, so it often changes nothing. `thresh=2` keeps rows with at least 2 non-null values; `subset=` restricts the check to named columns, which is usually what you actually want.

**Hint:** Print `len(df)` after each variant — the ordering of the counts is the lesson.

---

## Q27. Duplicates

Find exact duplicates with `duplicated()`, count them, and drop them with `keep='first'` and `keep=False`. Explain the difference.

**Expected:**

```
duplicated().sum()            3
drop_duplicates(keep='first') 7 rows kept
drop_duplicates(keep=False)   4 rows kept   <- drops ALL copies, not just repeats
```

**Explanation:** `keep='first'` removes repeats but keeps one copy of each — 7 rows survive. `keep=False` removes **every** copy of any duplicated row, including the original, leaving only the 4 rows that were unique to begin with. Use `keep=False` to investigate duplicates, `keep='first'` to clean them.

**Hint:** `df.duplicated().sum()` counts, `drop_duplicates()` removes.

---

## Q28. Outliers with IQR

Compute Q1, Q3 and IQR for a numeric column. Flag values outside `[Q1 − 1.5×IQR, Q3 + 1.5×IQR]`. Report how many, and the mean with and without them.

**Expected shape of result:**

```
Q1 45.2   Q3 55.8   IQR 10.6
fence [29.3, 71.7]
outliers found   5
mean with them   62.74
mean without     49.65
```

**Explanation:** The fence is `[Q1 − 1.5×IQR, Q3 + 1.5×IQR]`. Here 5 outliers drag the mean from **49.65 to 62.74** — a 26% distortion from five values. The median would barely move, which is the whole argument for reporting it on skewed data. This is the same IQR method Module 31 uses in Excel.

**Hint:** `q1, q3 = df.col.quantile([0.25, 0.75])` then `iqr = q3 - q1`.

---

## Q29. Outliers with Z-score

Flag values more than 3 standard deviations from the mean. Compare the count against the IQR method on the same column and explain why they differ.

**Expected:** the two methods disagree. Z-score uses the mean and standard
deviation, which the outliers themselves inflate — so extreme values raise
the threshold that should catch them. IQR uses quartiles and is unaffected.

**Explanation:** The two methods disagree, and the reason matters: **the z-score uses the mean and standard deviation, both of which the outliers themselves inflate**. Extreme values push the threshold outward until they no longer exceed it — the method is corrupted by exactly what it is looking for. IQR uses quartiles, which extreme values cannot move. Prefer IQR unless you know the data is normal.

**Hint:** Compute both counts on the same column and compare which values each one flags.

---

## Q30. String cleaning

For a column with mixed casing and stray whitespace, apply `.str.strip()`, `.str.lower()`, `.str.title()` and `.str.replace()`. Report the distinct count before and after.

**Expected:**

```
before: 7 distinct values  [' Mumbai ', 'MUMBAI', 'Mumbai', 'mumbai', ...]
after:  2 distinct values  ['Mumbai', 'Delhi']
```

**Explanation:** Seven variants collapse to two once you strip whitespace and normalise case. The order matters: `.str.strip()` before `.str.title()`, or `" mumbai"` becomes `" Mumbai"` and still differs from `"Mumbai"`. Always check `df.col.nunique()` before and after — the drop tells you how much drift there was.

**Hint:** Chain them: `df.col.str.strip().str.lower().str.title()`.

---

## Q31. Type conversion with errors

Convert a text column containing `"12500"`, `"₹12,500"` and `"N/A"` to numeric. Show that `pd.to_numeric()` without `errors='coerce'` raises, and with it silently produces `NaN`. Report how many values were lost.

**Expected:**

```
pd.to_numeric(col)
ValueError: Unable to parse string "₹12,500" at position 1

pd.to_numeric(col, errors='coerce')
[12500.0, nan, nan, 1234.0]     2 of 4 lost
```

**Explanation:** Without `errors='coerce'` the first unparseable value raises and you get nothing. With it, **2 of 4 become `NaN`** and the code continues happily — a silent 50% data loss. `errors='coerce'` is the right tool, but only if you count the losses afterwards. Strip `₹` and commas **first** and most values parse fine.

**Hint:** Count `result.isna().sum()` immediately after every `to_numeric(..., errors='coerce')`.

---

## Q32. Date parsing

Parse a column with mixed formats using `format="mixed"` and `dayfirst=True`. Report how many failed. Then find the ambiguous `dd/mm` vs `mm/dd` cases.

**Expected:**

```
parsed successfully   2904 of 3060
failed (NaT)           156
ambiguous dd/mm        16    <- dates landing after the data ends
```

**Explanation:** **156 of 3,060 fail entirely**, and worse, **16 parse successfully into the wrong date**. `dayfirst=True` reads `03/15/2024` as day 3 of month 15 — invalid, so it falls back — but reads `05/03/2024` as 5 March when the source meant 3 May. Both are valid dates, so nothing raises. Find them by looking for dates outside your known business window, as Q39 does.

**Hint:** `pd.to_datetime(col, format='mixed', dayfirst=True, errors='coerce')`, then check the range.

---

## Tier 4 — The Messy Dataset (Q33–Q42)

All values verified by running `profile_raw.py` and `src/clean.py` on the starter project.

## Q33. Load without conversion

Load `sales_raw.csv` with `dtype=str, keep_default_na=False`. Report the shape and confirm every dtype is `object`.

**Expected:** `3,060 rows × 13 columns`, all `object`.

Explain why both arguments are necessary.

**Explanation:** **3,060 × 13, every column `object`.** `dtype=str` stops Pandas guessing types and silently mangling values; `keep_default_na=False` stops it converting `"NA"` and `"null"` into real `NaN` before you have seen them. Together they give you the file **exactly as written** — which is the only honest starting point for a data-quality audit.

**Hint:** Both arguments are needed: one prevents type guessing, the other prevents null guessing.

---

## Q34. The isnull lie

Run `df.isnull().sum()` on the raw frame.

**Expected:** `0` for every column.

Now count the string nulls (`""`, `" "`, `"N/A"`, `"n/a"`, `"NA"`, `"NULL"`, `"null"`, `"-"`, `"?"`, `"nan"`, `"missing"`).

**Expected:**

| Column           | Missing | %     |
| ---------------- | ------- | ----- |
| `rating`         | 658     | 21.5% |
| `discount_pct`   | 248     | 8.1%  |
| `delivery_days`  | 211     | 6.9%  |
| `unit_price`     | 151     | 4.9%  |
| `revenue`        | 128     | 4.2%  |
| `customer_id`    | 98      | 3.2%  |
| `payment_method` | 95      | 3.1%  |
| `quantity`       | 58      | 1.9%  |
| `order_date`     | 41      | 1.3%  |

**Explanation:** **Zero for every column**, against **1,652 real missing values** across 9 columns. `rating` alone is 658 (21.5%). Every gap is a string, so Pandas counts it as present data. This single behaviour is why the phase exists: it breaks means, breaks `groupby`, breaks every model downstream, and reports perfect data quality while doing it.

**Hint:** Build the list of null-like strings first, then `df.isin(nulls).sum()`.

---

## Q35. Duplicates

Count exact duplicate rows in both raw files.

**Expected:** 60 in sales (2.0%), 15 in customers (2.9%).

**Explanation:** **60 duplicate sales rows (2.0%) and 15 duplicate customers (2.9%).** Duplicates inflate every total and every count, and because they are exact copies nothing looks wrong in a spot check. Deduplicate **before** aggregating, and record how many you removed — that number belongs in the cleaning log from Q53.

**Hint:** `df.duplicated().sum()` on each file, before any other cleaning.

---

## Q36. Spelling drift

Report the distinct count for `category`, `city`, `gender` and `is_premium`.

**Expected:** 5 real categories appear as **20** strings; 8 cities appear as **31**; gender has **15** variants; `is_premium` has **10**.

List the category variants and group them into the five real values.

**Explanation:** **5 categories appear as 20 strings, 8 cities as 31, gender has 15 variants and `is_premium` has 10.** Case differences, stray whitespace and alternative names (`Bombay` for `Mumbai`) all read as distinct values, so a `groupby` produces 31 city rows and every per-city total is wrong. `value_counts()` on each column is how you find this in thirty seconds.

**Hint:** `df.col.value_counts()` — read the full list, not just the head.

---

## Q37. The silent numeric loss

Run `pd.to_numeric(df['unit_price'])` without `errors='coerce'` and record the error. Then with it, and count the losses.

**Expected:** `1,043 of 3,060` parse successfully — **2,017 lost**.

Then strip `₹`, `Rs.`, `INR` and commas first, and report how many parse now.

**Explanation:** **Only 1,043 of 3,060 parse — 2,017 lost**, because values are written as `"INR 1,140.67"` and `"₹12,500"`. Stripping the currency markers and commas first recovers almost all of them. The lesson is the order of operations: clean the **text**, then convert the type. Converting first and coercing errors throws away two thirds of your data silently.

**Hint:** `.str.replace(r'[₹,]|Rs\\.|INR', '', regex=True).str.strip()` before `to_numeric`.

---

## Q38. Date chaos

Count unparseable dates with `format="mixed", dayfirst=True, errors="coerce"`.

**Expected:** `156 of 3,060`

List the five distinct formats present in the column.

**Explanation:** **156 of 3,060 are unparseable**, and the column contains five distinct formats. Real date columns are almost always like this when they have been touched by humans or exported from different systems. `format='mixed'` handles the variety; `errors='coerce'` handles the failures — but you must count what it discarded.

**Hint:** `df[parsed.isna() & df.order_date.ne('')]` shows you the raw strings that failed.

---

## Q39. The date ambiguity

After parsing with `dayfirst=True`, find orders dated after 2025-06-30 — beyond the generator's window.

**Expected:** `16` orders.

Look at their raw strings, explain what happened, and state why this cannot be fixed from the data alone.

**Explanation:** **16 orders land after 2025-06-30**, beyond the data's own window. Those are `mm/dd` dates misread as `dd/mm`: `05/03/2024` meant 3 May but parsed as 5 March. Both readings are valid dates, so no error is raised. **This cannot be fixed from the data alone** — only a day above 12 disambiguates, and these have none. You must ask the source system, or exclude them and say so.

**Hint:** Filter for dates beyond the known business window, then print their raw strings.

---

## Q40. Impossible values

Count values outside plausible ranges: quantity ≤ 0 or > 100, delivery days < 0 or > 30, rating outside 1–5, age outside 13–100.

**Expected:** `47`, `65`, `113`, `5`

**Explanation:** **47, 65, 113 and 5.** Range checks catch what type checks cannot: `-3` is a perfectly valid integer and a nonsensical quantity. Every numeric column has a plausible range implied by what it measures, and stating that range explicitly is a form of documentation as much as validation.

**Hint:** One boolean mask per rule, then `.sum()` each.

---

## Q41. Cross-field validation

Check whether `revenue` equals `quantity × unit_price × (1 − discount)` within 5%.

**Expected:** `84` rows disagree.

**Explanation:** **84 rows disagree** by more than 5%. Cross-field validation catches errors that no single-column check can see — each of quantity, price, discount and revenue looks individually plausible while being mutually inconsistent. Use a tolerance rather than `==`, because floating-point arithmetic and rounded stored values will never match exactly.

**Hint:** `(df.revenue - expected).abs() / df.revenue > 0.05`

---

## Q42. The derived-column trap

Null the `quantity` for the impossible values but **leave revenue alone**. Then find orders above ₹100,000.

**Expected:** `17` orders holding **59.1%** of total revenue, the largest at **₹29,67,539** — in a dataset whose plausible maximum is about ₹44,000.

Explain why nulling one column invalidated another, and fix it.

**Explanation:** **17 orders end up holding 59.1% of total revenue**, the largest at **₹29,67,539** in a dataset whose plausible maximum is about ₹44,000. Nulling `quantity` left the already-computed `revenue` in place, so the two columns now contradict each other. **Cleaning one column invalidates every column derived from it** — either recompute the derivatives or null them too.

**Hint:** After nulling any source column, ask what was computed from it.

---

## Tier 5 — Analysis and Visualisation (Q43–Q52)

Run `python src/clean.py` first. All values from `src/eda.py`.

## Q43. Headline numbers

After cleaning, report orders, date range, total revenue, mean and median order value, unique customers and mean rating.

**Expected:** 3,000 orders · 2024-01-01 to 2025-06-29 · ₹83,67,710 · mean **₹2,985** · median **₹1,967** · 499 customers · rating **3.67**

**Explanation:** **3,000 orders, ₹83,67,710 total, mean ₹2,985, median ₹1,967, 499 customers, rating 3.67.** These headline numbers are the first thing a reader sees and the last thing you should compute — every one depends on the cleaning decisions above it. Note 499 customers, not 500: one never ordered.

**Hint:** Compute these only after `src/clean.py` has run; on raw data they are all wrong.

---

## Q44. Mean vs median

The mean is **1.52×** the median. Explain what that ratio tells you about the distribution and which number belongs in a report headed "typical order value".

**Explanation:** A mean **1.52×** the median means a **right-skewed** distribution: most orders are small and a few large ones drag the average up. For a headline reading "typical order value" the **median (₹1,967)** is the honest number — the mean describes no actual customer. Report the mean when you need totals to reconcile, the median when you need a typical case.

**Hint:** A histogram of order value makes the skew obvious in one glance.

---

## Q45. Category breakdown

Group by category and report revenue, order count, average order and revenue share.

**Expected:** Electronics **₹30,06,289** (35.9%), Home 23.2%, Clothing 20.9%, Books 11.4%, Grocery 8.6%. All five must sum to ₹83,67,710.

**Explanation:** **Electronics ₹30,06,289 = 35.9%**, then Home 23.2%, Clothing 20.9%, Books 11.4%, Grocery 8.6%. The shares sum to exactly 100% and the values to ₹83,67,710 — that reconciliation is your correctness test. If the pieces do not sum to the whole, you have either dropped rows in the groupby or double-counted a merge.

**Hint:** `.sum()` the group totals and compare against `df.revenue.sum()`.

---

## Q46. Volume versus value

Report orders and average order value per city. Mumbai has the most orders (818) but an average of ₹3,130 against Hyderabad's ₹3,072.

Write two sentences distinguishing "our biggest city" by volume from by value.

**Explanation:** Mumbai leads on **volume** (818 orders) but its average order of ₹3,130 is barely above Hyderabad's ₹3,072. "Biggest city" therefore has two different answers depending on whether you mean most orders or most valuable customers — and a growth strategy built on the wrong one targets the wrong market. Always state which metric you ranked by.

**Hint:** Report count and mean side by side in one table; the tension is the finding.

---

## Q47. Monthly trend

Group by month and add a 3-month rolling average. Exclude the 16 ambiguous dates and state that you did.

**Explanation:** A 3-month rolling average smooths the month-to-month noise so the underlying direction is visible. Exclude the 16 ambiguous dates from Q39 **and say so in the chart caption** — with them included they land in months after the data ends and manufacture a dramatic collapse at the right-hand edge that is pure artefact.

**Hint:** `.rolling(3).mean()` leaves the first 2 months as NaN; that is correct.

---

## Q48. The null result

Compute the correlation between `delivery_days` and `rating`.

**Expected:** **−0.0201**

Then bucket delivery into 1–2, 3–4, 5–6 and 7+ days and report the mean rating for each. Write the finding as you would report it to a manager who expected faster delivery to improve ratings.

**Explanation:** **r = −0.0201** — essentially zero. Bucketing confirms it: mean rating barely moves across delivery speeds. The honest report is _"delivery speed does not predict rating in this data (r = −0.02, n = 2,043)"_, plus the caveat that 25% of ratings are missing. A null result with a sample size is a finding; hunting for a subgroup where the correlation looks real is not.

**Hint:** Report the correlation **and** the sample size. Neither means anything alone.

---

## Q49. Premium versus standard

Compare average order value and rating for premium and non-premium customers.

**Expected:** premium spend 5% more and rate **0.06 lower**.

State whether this is a finding or noise, and how you would decide.

**Explanation:** Premium customers spend 5% more and rate **0.06 lower**. A 0.06 difference on a 1–5 scale is almost certainly noise — decide it with a **t-test and a confidence interval**, not by eye. With enough rows even meaningless differences reach significance, so check the effect size too: 0.06 of a rating point changes no decision anyone would make.

**Hint:** `scipy.stats.ttest_ind` on the two groups, and look at the CI width.

---

## Q50. Missingness is not random

25.3% of orders have no rating. Test whether missing ratings correlate with anything else — delivery time, category, order value.

Then explain why the mean rating of 3.67 should be reported as an **upper bound**.

**Explanation:** **25.3% of ratings are missing, and not at random.** If dissatisfied customers skip the survey, the 3.67 average is computed only from people who bothered to respond — so it is an **upper bound** on true satisfaction, not an estimate of it. Test by comparing delivery time, category and order value between the rated and unrated groups: any difference proves the missingness carries information.

**Hint:** Create a `rating_missing` boolean and compare every other column across it.

---

## Q51. Five charts

Build: a histogram of order value with mean and median marked, a sorted bar chart of revenue by category, a monthly line chart with a rolling average, a box plot by category, and a horizontal bar of missingness per column.

Every chart must have labelled axes with units and a title stating the finding, not the variable name.

**Expected:** every chart must have labelled axes with units, and a title
stating the **finding** rather than the variable name.

Bad: "Revenue by Category". Good: "Electronics is 36% of revenue".

**Hint:** Write one small function that takes an axes and returns it, then call it five times. Titles state the finding: "Electronics is 36% of revenue", not "Revenue by Category".

---

## Q52. Chart critique

Take one of your charts and list three things wrong with the default Matplotlib output. Fix all three and show before and after.

**Expected** — the three defaults worth fixing on almost every Matplotlib chart:

```
1. No axis labels or units          -> ax.set_xlabel("Month"), set_ylabel("Revenue (Rs)")
2. Title names the variable         -> make it state the finding
3. Categories in arbitrary order    -> sort bars by value
```

**Explanation:** The three defaults worth fixing on nearly every Matplotlib chart: **no axis units**, **a title naming the variable instead of the finding**, and **categories in arbitrary order**. All three are the library being neutral rather than wrong — Matplotlib cannot know your units, your conclusion, or that alphabetical order is meaningless for a ranking.

**Hint:** Put your chart next to one from a newspaper and list every difference.

---

## Tier 6 — Reporting and Judgement (Q53–Q60)

## Q53. The cleaning log

Build a log recording every cleaning step, the rows affected and what was lost. Reproduce the reference output:

```
loaded                            3060
dropped exact duplicates            60
unparseable dates -> NaT           154
dates beyond business window        16
impossible quantity -> NaN          47
impossible delivery_days -> NaN     65
out-of-range rating -> NaN         113
revenue != qty x price              84
```

Then explain why a cleaning step you cannot describe is one you cannot defend.

**Explanation:** Every number in the log is a decision you made and must be able to defend. The log is what lets someone reproduce your figures, and what lets **you** explain six months later why the total is ₹83,67,710 and not something else. A cleaning step you cannot describe is one you cannot defend — and an analysis nobody can reproduce is an opinion.

**Hint:** Append a `(step, rows_affected)` tuple to a list at every stage, then print it as a table.

---

## Q54. Reconciliation

Your total revenue should reconcile three ways: summed directly, summed across categories, and summed across cities. Confirm all three give **₹83,67,710**.

State what a mismatch would mean.

**Explanation:** All three routes must give **₹83,67,710**. A mismatch means rows were lost or duplicated — most often a merge that dropped unmatched rows, or a `groupby` on a column containing nulls, since **`groupby` silently excludes null keys by default**. That single behaviour is the most common cause of totals that refuse to reconcile.

**Hint:** `dropna=False` in `groupby` keeps the null group visible so you can see what it holds.

---

## Q55. The caveats section

Write the data-quality caveats a report must state: orders with no revenue (197, 6.6%), unparseable dates (154), no rating (758, 25.3%), unmatched customers (97), recomputed revenues (84), ambiguous dates (16).

**Explanation:** Caveats belong **in the report**, not in your head: 197 orders with no revenue (6.6%), 154 unparseable dates, 758 missing ratings (25.3%), 97 unmatched customers, 84 recomputed revenues, 16 ambiguous dates. Stating them up front builds trust and pre-empts the question; discovering them after someone acts on your numbers destroys it.

**Hint:** One line per caveat: what the issue is, how many rows, and what you did about it.

---

## Q56. Merge validation

Merge sales with customers using `validate="many_to_one"`. Report the unmatched count.

**Expected:** `97` orders have no matching customer.

Then remove the `validate` argument and explain what protection you lost.

**Explanation:** **97 orders have no matching customer.** With `validate="many_to_one"`, Pandas raises immediately if the customer table has duplicate IDs — which would multiply your sales rows and inflate every total. Without it you lose that guarantee entirely and the corruption is silent: the frame just gets bigger and every sum goes up.

**Hint:** Use a **left** join to keep the unmatched orders visible rather than quietly dropping them.

---

## Q57. Predict before you look

Before running any analysis, write down your predictions: which category leads, whether faster delivery improves ratings, whether premium customers spend more. Then check. Report which you got wrong.

This is the anti-hindsight-bias exercise, and it only works if you write them down first.

**Hint:** Write the three predictions in a file and commit it before you run anything. Being wrong is the point — it is the only way to find out what you assumed.

---

## Q58. Reporting a null result

Three findings in this dataset show no signal: delivery speed versus rating, premium status, and payment method. Write one paragraph reporting all three as you would to a stakeholder who was hoping for the opposite.

**Hint:** Lead with what you tested and how much data you had, then the result, then what would be needed to detect an effect if one existed. "No signal at n=2,043" is very different from "no effect".

---

## Q59. The full report

Produce a written report: one-paragraph summary, three findings with numbers and charts, three null results, caveats, and recommendations. Order it so a reader who stops after the first paragraph still knows the key point.

**Hint:** Write the one-paragraph summary **last**, but put it first. If a reader stops after it, they should still know the key number and the recommendation.

---

## Q60. Break your own analysis

Deliberately introduce one plausible error — an inner join instead of a left join, a mean instead of a median, forgetting to exclude the ambiguous dates. Show what the report would have said, and how far wrong it would have been.

Then state which of your real analysis steps you are least confident about.

**Hint:** Pick the error you think is most likely to happen to you by accident. Quantify the damage in rupees — that is what makes the habit stick.

---

## Checking your work

1. **Run the reference implementation.** `python profile_raw.py` and `python src/clean.py` produce every number in Tiers 4–6. Compare against yours before reading the code.
2. **Reconciliation is your test.** Category and city breakdowns must both total ₹83,67,710.
3. **Do not read `src/clean.py` until Tier 4 is finished.** The reference solution will still be there in two hours; the learning will not.

> ⚠️ The trap that defines this phase is **`df.isnull().sum()` returning zero on a file with 1,652 missing values**. Every gap is hiding as a string. This one behaviour breaks means, breaks `groupby`, breaks every model you fit downstream — and it reports perfect data quality while doing it.

---

[← Phase 6 index](README.md) · [Project Guides](projects.md) · [Starter Project](starter-project/README.md)
