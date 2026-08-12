# Phase 6 — Project Build Guides

Step-by-step instructions for all 10 projects from [Projects & Key Takeaways](projects-and-takeaways.md).

Each guide has the same five parts:

- **Goal** — what you will have when you finish
- **You need** — prerequisites and data
- **Build it** — numbered steps
- **How it works** — the mechanism, so you are not just copying
- **Done when** — a concrete finish line

Projects 1–3 use the [starter project](starter-project/README.md) — deliberately messy data that the modules do not cover. Projects 4–10 use public datasets you fetch yourself.

> 💡 **Tip:** The single highest-value habit in this phase is writing down what you _expect_ before you run the code. "I expect Electronics to be the top category" — then check. When you are wrong, you have learned something. When you skip this step, you just read output and forget it.

---

## Difficulty and time

| #   | Project                        | Difficulty | Time    | Data             |
| --- | ------------------------------ | ---------- | ------- | ---------------- |
| 1   | Data Cleaning Bootcamp         | ●●○        | 4–6 h   | starter project  |
| 2   | Cleaning Pipeline & Audit Log  | ●●○        | 3–4 h   | starter project  |
| 3   | Sales EDA Report               | ●●●        | 5–7 h   | starter project  |
| 4   | Titanic Survival EDA           | ●○○        | 2–3 h   | seaborn built-in |
| 5   | Iris Analysis                  | ●○○        | 1–2 h   | sklearn built-in |
| 6   | NumPy Image Manipulation       | ●○○        | 2–3 h   | any photo        |
| 7   | Matrix Calculator              | ●●○        | 2–3 h   | none             |
| 8   | Weather / Air Quality Analysis | ●●○        | 4–5 h   | bundled CSV     |
| 9   | Stock Price Analyser           | ●●○        | 3–4 h   | bundled CSV     |
| 10  | Capstone EDA                   | ●●●        | 10–15 h | your choice      |

---

## P1. Data Cleaning Bootcamp

**Goal:** Turn 3,060 rows of text sludge into a typed, analysable DataFrame — by hand, before reading the reference solution.

**You need:** `starter-project/data/sales_raw.csv` and `customers_raw.csv`. Modules 25–26.

### Build it

1. **Generate the data:** `python data/make_messy_data.py`.

2. **Load it as text, deliberately:**

   ```python
   df = pd.read_csv("data/sales_raw.csv", dtype=str, keep_default_na=False)
   ```

   `dtype=str` stops Pandas guessing. `keep_default_na=False` stops it converting `"NA"` to `NaN` behind your back — you want to _see_ the mess.

3. **Run `df.isnull().sum()` and note that it returns zero everywhere.** Then run:

   ```python
   for c in df.columns:
       print(c, df[c].astype(str).str.strip().isin(["", "N/A", "NA", "-", "?", "NULL", "null", "n/a", "nan", "missing"]).sum())
   ```

   The real answer is 1,652 missing values across the file. **This gap is the most important thing in this project.**

4. **Find the spelling drift:** `df["category"].value_counts()`. Five real categories appear as 20 strings. Do the same for `city`, `payment_method`, `gender`, `is_premium`.

5. **Build a canonical mapping** for each — lowercase, strip, then `.map()` to the clean value. Do _not_ use `.replace()` with 20 entries; a dict-based `.map()` on a normalised key is shorter and catches variants you did not enumerate (they become `NaN`, visibly).

6. **Parse the money columns.** `pd.to_numeric(df["unit_price"])` loses 2,017 of 3,060 rows. Strip `₹`, `Rs.`, `INR`, and commas with a regex first, then convert.

7. **Parse the dates.** Five formats plus broken values. Use `format="mixed", dayfirst=True, errors="coerce"`.

8. **Check the parsed dates for impossible values** — anything after your business window is a mm/dd string misread as dd/mm. Flag them; you cannot fix them from the data.

9. **Find impossible values** in every numeric column: quantity ≤ 0 or > 100, delivery days < 0 or > 30, ratings outside 1–5, ages outside 13–100.

10. **Cross-check revenue against `quantity × unit_price × (1 − discount)`.** 84 rows disagree by more than 5%.

11. **Only now** open `src/clean.py` and compare. What did you miss?

### How it works

Every defect here maps to a real-world cause. Mixed date formats come from multiple data-entry systems. Currency symbols come from a report exported for humans. Six spellings of "missing" come from six developers over six years. `Bombay` and `Mumbai` come from a database migration nobody finished.

Step 3 is the crux. **`df.isnull().sum()` only sees what Pandas already decided was null.** Text nulls are invisible to it, and they silently break `mean()`, `groupby()`, and every model you fit downstream. Checking for _string_ nulls is a separate, deliberate act.

Step 6 matters because `pd.to_numeric` with `errors="coerce"` fails **silently** — it returns `NaN` and your revenue total is quietly two-thirds too low. No exception, no warning.

> ⚠️ Never clean in place. Keep `sales_raw.csv` untouched and write `sales_clean.csv`. You will get a cleaning rule wrong, and you need to be able to rerun from the original. Treat raw data as read-only, always.

### Done when

`df.dtypes` shows `datetime64` and `float64` where they belong, `category` has exactly 5 values, and you can state how many rows you altered and why.

---

## P2. Cleaning Pipeline & Audit Log

**Goal:** Turn your ad-hoc cleaning into a rerunnable function that reports what it did.

**You need:** Project 1.

### Build it

1. **Move every cleaning step into a named function** — `parse_money`, `parse_dates`, `canon_city`. Each takes a Series and returns a Series.

2. **Write a `CleaningLog` class** that collects `(step, rows_affected, detail)` tuples and prints a table. Copy the shape from `src/clean.py`.

3. **Log every mutation:** rows dropped, values nulled, values recomputed. If a step changes data and does not log, add the log line.

4. **Chain it into `clean_sales(raw, log) -> DataFrame`** that takes raw and returns clean, with no side effects and no file I/O inside.

5. **Add the trap from the reference solution.** When you null an impossible `quantity`, also null the `revenue` derived from it:

   ```python
   df.loc[bad_qty, ["quantity", "revenue"]] = np.nan
   ```

   Skip this and 17 orders keep inflated revenue — 59% of your total.

6. **Write the merge** with `validate="many_to_one"`. If customer IDs are not unique, this raises instead of silently fanning out your row count.

7. **Print the log** and read it as if you were the finance manager asking why revenue dropped.

8. **Write 5 tests** with pytest: `parse_money("₹1,299")` returns `1299.0`, `to_na("N/A")` returns `NaN`, the pipeline is idempotent (running twice gives the same result).

### How it works

The log is not documentation — it is the artefact that makes your analysis defensible. Every cleaning decision destroys information. When your total revenue is ₹83.7 lakh and the finance system says ₹91 lakh, the log tells you the difference is 197 orders with unparseable prices plus 84 recomputed revenues. Without it you are guessing.

`validate="many_to_one"` is the cheapest bug prevention in Pandas. A duplicated key on the right side of a merge silently multiplies your rows, and the resulting revenue total is inflated in a way that looks completely plausible.

Step 5 generalises: **when you invalidate a column, everything derived from it is also invalid.** Derived columns do not know their input changed.

### Done when

`clean_sales(raw, log)` runs end to end, the log accounts for every altered row, and running it twice produces identical output.

---

## P3. Sales EDA Report

**Goal:** A written report a manager could act on — including the findings that are null.

**You need:** Project 2. Modules 27–28.

### Build it

1. **Write your expectations first**, on paper. Which category leads? Does faster delivery mean better ratings? Do premium customers spend more? Commit to answers before looking.

2. **Headline numbers:** order count, date range, total revenue, mean _and_ median order value, unique customers.

3. **Compare mean to median.** Here mean is 1.52× median — right-skewed. Report the **median** as the typical order; the mean is dragged by a tail.

4. **Group by category and city.** Add a `rev_share_%` column and a cumulative share. Check whether the Pareto pattern actually holds — here it takes **6 of 7 cities** to reach 80%, which is _not_ the usual story.

5. **Separate volume from value.** Mumbai has the most orders (818) but its average order value (₹3,130) is barely above Hyderabad's (₹3,072). "Mumbai is our best city" is true for volume and false for value.

6. **Monthly trend with a 3-month rolling average.** Exclude the ambiguous dates or your chart shows a fake 98% collapse.

7. **Test the delivery→rating hypothesis.** Correlation is **−0.0201**. There is no relationship. Write that down as a finding.

8. **Test premium vs non-premium.** Premium customers spend 5% more and rate 0.06 _lower_. Also a finding.

9. **Build 5 charts** with the rules from Module 27: sort bars by value, label units, annotate the number that matters, no pie charts with 8 slices.

10. **Write the report** in this order: one-paragraph summary → 3 findings with numbers → 3 things that showed no signal → caveats → recommendations.

11. **Write the caveats section honestly.** 25.3% of orders have no rating, and unhappy customers disproportionately don't rate — so 3.67 is an **upper bound**, not an estimate.

### How it works

Step 1 protects you from hindsight bias. Every result looks obvious after you see it; writing predictions down is the only way to find out whether you actually understood the domain.

Steps 7 and 8 are the heart of this project. **Reporting a null result is harder than reporting a finding**, because nobody is pleased by it. But an analyst who says "delivery speed does not affect ratings in this data, so the logistics investment won't move satisfaction" has saved the company more money than one who finds a spurious 0.10 difference and recommends a project.

The mean/median distinction in step 3 is the most common way business dashboards mislead. Average order value of ₹2,985 sounds like the typical customer spends ₹2,985. Half of them spend under ₹1,967.

> 💡 **Tip:** Write the caveats section _first_, before the findings. It forces you to confront how much of your data is missing before you get attached to a conclusion. Then write findings you can still defend given those caveats.

### Done when

Someone who has never seen the data can read your report and correctly state what to do next — and what you could not determine.

---

## P4. Titanic Survival EDA

**Goal:** The classic starter EDA, done properly with hypothesis-first discipline.

**You need:** `starter-project/data/titanic.csv` — bundled offline, same dataset as `sns.load_dataset("titanic")`. Modules 27–28.

### Build it

1. **Load and profile.** `pd.read_csv("starter-project/data/titanic.csv")`, then `df.info()`, `df.describe()`, `df.isnull().sum()`. Note `age` is 20% missing and `deck` is 77% missing.

2. **Decide what to do about `deck` before you analyse anything.** 77% missing means you either drop the column or treat "missing" as its own category. Both are defensible; silently letting it into a `groupby` is not.

3. **Baseline first:** overall survival rate (38%). Every later number is compared to this.

4. **Survival by sex:** 74% vs 19%. This is the dominant effect — find it before anything else.

5. **Survival by class**, then **class within sex**. The interaction matters: third-class women survived at a higher rate than first-class men.

6. **Bin age** into child / adult / elderly and check survival. Handle the 20% missing explicitly — does `age.isna()` correlate with survival? (It does; that itself is informative.)

7. **Build a crosstab** of `sex × class` with survival rate as the value, and heatmap it.

8. **Write three sentences** stating who survived, who didn't, and the one interaction that surprised you.

### How it works

Titanic is the standard first dataset because the dominant signal (sex) is enormous and obvious, which lets you check your technique against a known answer. If your analysis does not show ~74% vs ~19%, your code has a bug.

Step 6 is where it gets interesting. Missing `age` is not random — it correlates with lower survival, probably because records for third-class passengers were less complete. **Missingness itself is data.** Testing whether `isna()` predicts your target is a habit worth building.

### Done when

You can state the survival rate for any sex × class combination and explain the interaction in one sentence.

---

## P5. Iris Analysis

**Goal:** A fast, complete EDA on the cleanest dataset that exists — as a control.

**You need:** `starter-project/data/iris.csv` — bundled offline, identical to `sklearn.datasets.load_iris()` (or load it directly with `load_iris` if you prefer). 

### Build it

1. **Load into a DataFrame** with proper column names and a species column.
2. **`describe()` grouped by species.** Note how separated setosa is on petal measurements.
3. **Pair plot** coloured by species. One species separates completely; two overlap.
4. **Correlation matrix** with a heatmap. Petal length and width correlate at 0.96.
5. **Box plots** of each feature by species.
6. **Answer one question:** which single measurement best separates the three species? Justify it from the plots.
7. **Compare with Project 1.** Iris took 90 minutes; the messy data took six hours. **Reflect on why.**

### How it works

Iris is a _control_, not a challenge. It has 150 rows, no missing values, no duplicates, four numeric columns and a clean label. Nothing in it resembles work.

That is exactly why step 7 matters. The ratio between Project 1 and Project 5 — roughly 4:1 — is the real ratio of cleaning to analysis in this job. Most tutorials only ever show you the Iris end, which is why people are shocked by their first real dataset.

### Done when

You have a pair plot, a correlation heatmap, and a one-sentence answer to step 6.

---

## P6. NumPy Image Manipulation

**Goal:** Understand that an image is just an array, by manipulating one with slicing.

**You need:** `pip install pillow`, any JPEG. Module 24.

### Build it

1. **Load as an array:**
   ```python
   from PIL import Image
   import numpy as np
   img = np.array(Image.open("photo.jpg"))
   print(img.shape, img.dtype)   # (height, width, 3) uint8
   ```
2. **Flip** vertically with `img[::-1]` and horizontally with `img[:, ::-1]`. No library call — pure slicing.
3. **Crop** the centre with `img[h//4:3*h//4, w//4:3*w//4]`.
4. **Grayscale** with the luminance weights: `img @ [0.299, 0.587, 0.114]`.
5. **Brighten** with `np.clip(img.astype(int) + 50, 0, 255).astype(np.uint8)`.
6. **Break it deliberately:** brighten _without_ the `astype(int)` and watch bright pixels wrap around to black. That is `uint8` overflow.
7. **Split channels** and display R, G, B separately.
8. **Downsample** with `img[::4, ::4]` and compare file sizes.

### How it works

Step 6 is the lesson. `uint8` holds 0–255; `200 + 100` becomes `44`, silently, with no warning. Every numeric dtype has a range, and NumPy will wrap rather than raise. This is the same class of bug as integer overflow in C, and it shows up in real pipelines whenever someone adds to a `uint8` column.

The luminance weights in step 4 are not arbitrary — human eyes are most sensitive to green, hence 0.587. A naive `img.mean(axis=2)` produces a visibly wrong grayscale.

### Done when

You have all six transformations rendered side by side, and you can explain the overflow in step 6.

---

## P7. Matrix Calculator

**Goal:** A working linear algebra toolkit, connecting Module 24 to Phase 5.

**You need:** NumPy. Module 20 (linear algebra) helps.

### Build it

1. **Solve a 3×3 system** with `np.linalg.solve(A, b)`.
2. **Verify** with `A @ x` and `np.allclose(A @ x, b)`. Never trust a solver without checking.
3. **Compute the inverse** and confirm `A @ inv(A)` is the identity — using `np.allclose`, not `==`.
4. **Try to invert a singular matrix** and catch `LinAlgError`.
5. **Compute the determinant** for a nearly-singular matrix and note how close to zero it gets.
6. **Eigenvalues and eigenvectors** with `np.linalg.eig`; verify `A @ v = λv`.
7. **Compare `solve` against `inv(A) @ b`** on a 500×500 matrix. Time both.
8. **Build a CLI** that reads a matrix and reports rank, determinant, condition number, and invertibility.

### How it works

Step 3 teaches floating-point reality: `A @ inv(A)` gives `0.9999999999999998` on the diagonal, not `1.0`. **`==` on floats is almost always a bug.** `np.allclose` exists for this.

Step 7 is the practical one. `np.linalg.solve` is both faster and more numerically stable than computing an inverse and multiplying. Inverting a matrix to solve a system is a habit from hand-written algebra that does not transfer to computation.

The condition number in step 8 tells you how much a small change in input perturbs the output. A high condition number means your "solution" is meaningless — a real issue in regression with collinear features, which is exactly the Phase 10 multicollinearity problem.

### Done when

Your CLI reports all four properties, and you can state why `solve` beats `inv`.

---

## P8. Weather / Air Quality Analysis

**Goal:** Time-based analysis on real Indian public data, with genuine gaps.

**You need:** `starter-project/data/weather_sample.csv` — a bundled 3-year daily series for Delhi and Mumbai (identical to what you would fetch from data.gov.in) with real sensor gaps: a 72-hour Delhi outage, scattered missing days, one impossible 9999 AQI sensor error, and a genuine Diwali spike. If you have internet access you may substitute live CPCB AQI data from [data.gov.in](https://data.gov.in) — the bundled file is the no-network fallback. Modules 25–28.

### Build it

1. **Load the bundled file.** `pd.read_csv("starter-project/data/weather_sample.csv")`, then profile it exactly as in Project 1. Expect missing timestamps and a senseless sensor value.
2. **Profile it** exactly as in Project 1. Expect encoding problems, merged header rows, and footnotes in the data.
3. **Parse the timestamp column** and set it as a DatetimeIndex.
4. **Check for gaps:** `df.index.to_series().diff().value_counts()`. Real sensor data has missing hours, not a clean hourly series.
5. **Resample to daily and monthly** with `.resample("D").mean()`.
6. **Decide how to handle gaps.** Forward-fill, interpolate, or leave `NaN`? A forward-fill across a 3-day sensor outage invents data. Document your choice.
7. **Rolling averages:** 7-day and 30-day, plotted over the raw series.
8. **Seasonal pattern:** group by month across years. In Indian AQI data, winter is dramatically worse — check whether your city shows it.
9. **Outliers:** IQR method from Module 26. Distinguish sensor errors (AQI of 9999) from real pollution spikes (Diwali).
10. **Write up** which months are worst, how much data was missing, and how you handled it.

### How it works

Step 9 is the judgement call that separates analysts. An AQI of 9999 is a sensor fault. An AQI of 450 on Diwali night is real and is _the most important data point in the file_. A blanket "drop everything above the 99th percentile" deletes the signal you were hired to find.

Step 6 matters because interpolation is a lie you tell for convenience. Sometimes it is the right lie — a 1-hour gap between 180 and 184 is safely 182. A 3-day gap is not interpolatable, and filling it produces a chart that looks complete and is fiction.

`resample` only works on a DatetimeIndex, which is why step 3 comes first. This is the single most useful Pandas feature for any time-based data and it is worth mastering here.

### Done when

You have a seasonal chart, a documented gap-handling decision, and a defensible separation of sensor errors from real spikes.

---

## P9. Stock Price Analyser

**Goal:** Returns, volatility and moving averages on real market data.

**You need:** `starter-project/data/stock_sample.csv` — a bundled daily OHLCV series for two Indian stocks (`RELIANCE`, `TCS`) and `NIFTY50`, generated to behave like a real 2023–24 calendar (weekends and ~2% holidays missing). `yfinance` cannot run inside this browser sandbox, so the bundled file is the offline equivalent. Modules 25, 27.

### Build it

1. **Load the bundled file:**
   ```python
   df = pd.read_csv("starter-project/data/stock_sample.csv")
   df = df[df["symbol"] == "RELIANCE"].copy()
   ```
   Or, on a machine with internet, `yf.download("RELIANCE.NS", start="2023-01-01", end="2025-01-01")` — the exercises are identical.
2. **Note the gaps** — weekends and holidays. The index is _not_ continuous. Never `resample("D")` without deciding what a non-trading day means.
3. **Daily returns:** `df["Close"].pct_change()`.
4. **Cumulative return:** `(1 + returns).cumprod()`.
5. **Moving averages:** 20-day and 50-day, plotted with the close price.
6. **Rolling volatility:** `returns.rolling(20).std() * np.sqrt(252)` — annualised.
7. **Drawdown:** running maximum minus current value, as a percentage. Find the worst peak-to-trough.
8. **Compare two stocks** — correlate their daily returns.
9. **Plot a candlestick-style chart** with OHLC data.
10. **Write the caveat:** you have just done technical analysis on 500 observations. State clearly that none of this predicts future prices.

### How it works

Step 6's `sqrt(252)` is the annualisation factor — 252 trading days per year, and volatility scales with the square root of time. Getting this wrong by using 365 is a common and quietly wrong mistake.

Step 3 uses percentage change rather than absolute change because a ₹10 move on a ₹100 stock and a ₹1,000 stock are entirely different events. Returns are comparable across assets; prices are not.

Step 10 is not optional. Financial time series are the easiest place in data science to fool yourself: any moving-average crossover strategy looks profitable on historical data if you do not account for transaction costs, survivorship bias, and the fact that you chose the stock _after_ seeing its chart.

### Done when

You have a price chart with both moving averages, an annualised volatility series, the maximum drawdown as a percentage, and a written caveat.

---

## P10. Capstone EDA

**Goal:** A complete, publishable analysis on a dataset you chose.

**You need:** Projects 1–9. Budget 10–15 hours.

### Build it

1. **Pick a dataset you genuinely care about.** Your own bank statements, Spotify history, cricket stats, data.gov.in, or a Kaggle set with under 1,000 upvotes (popular ones are already cleaned to death).

2. **Write the question first**, before looking at the data. One sentence: "Which factors most affect X?" A capstone without a question becomes a tour of `value_counts()`.

3. **Profile before analysing.** Reuse `profile_raw.py`. Report shape, dtypes, missingness, duplicates, cardinality.

4. **Clean with an audit log.** Reuse Project 2's `CleaningLog`.

5. **Answer your question.** Use grouping, aggregation, correlation, and at least one statistical test from Module 23 (t-test or chi-square) so your claim of a difference has support beyond eyeballing.

6. **Build 5–8 charts.** Every one must answer a question. If you cannot write a one-sentence caption stating the finding, delete the chart.

7. **Find at least one null result** and report it as prominently as your positive findings.

8. **Structure the write-up:**
   - Question and why it matters (1 paragraph)
   - Data source, size, and how you got it
   - Cleaning summary with the audit log
   - Findings, each with a number and a chart
   - What showed no signal
   - Caveats and limitations
   - What you would do with more time or data

9. **Publish it** — GitHub with a rendered notebook, or a blog post. A capstone nobody can see does not count.

10. **Get one person to read it** who does not know the dataset, and ask them to tell you what you found. If they cannot, rewrite.

### How it works

Step 2 is what separates a portfolio piece from a homework exercise. "I analysed the Netflix dataset" is not interesting. "Does Netflix add more international content in Q4, and did that change after 2020?" is a question with an answer someone might care about.

Step 5 matters because a difference in group means is not a finding until you know whether it could be noise. Module 23's t-test is three lines and turns "Group A looks higher" into "Group A is higher, p = 0.003".

Step 10 is the real test. Analysis that only makes sense to its author is not analysis, it is a notebook. Communication is the deliverable.

> 💡 **Tip:** Deliberately include a section titled "What I got wrong." Every real analysis has a false start — a hypothesis that died, a cleaning rule you had to reverse, a chart that misled you. Documenting it demonstrates judgement far more convincingly than a flawless narrative, which every reviewer knows is edited.

### Done when

A stranger can read your write-up, understand what you found, and correctly state what you could not conclude.

---

## Common traps across all projects

| Trap                                     | Symptom                                           | Fix                                               |
| ---------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| Trusting `df.isnull().sum()`             | "No missing data!" on a file with 1,652 gaps      | Check for text nulls separately                   |
| `pd.to_numeric` without `errors=`        | Two-thirds of rows silently become NaN            | Strip symbols first, then coerce and count losses |
| Cleaning in place                        | Cannot rerun after a bad rule                     | Raw files are read-only; write to `_clean.csv`    |
| Nulling a column but not its derivatives | 17 orders held 59% of revenue                     | Null derived columns together                     |
| `dayfirst` guessing                      | Fake 98% revenue collapse                         | Detect impossible dates and flag them             |
| Merging without `validate=`              | Row count silently inflates                       | `validate="many_to_one"`                          |
| Reporting the mean on skewed data        | "Typical order ₹2,985" when half are under ₹1,967 | Report median, or both                            |
| Alphabetical bar charts                  | Reader cannot see the ranking                     | Sort by value                                     |
| Hunting for a story                      | Reporting a 0.10 difference as a finding          | Report null results honestly                      |
| Ignoring missingness patterns            | Rating average is biased upward                   | Test whether `isna()` correlates with your target |
| No caveats section                       | Overconfident conclusions                         | Write caveats before findings                     |

---

[← Projects & Key Takeaways](projects-and-takeaways.md) · [Starter project →](starter-project/README.md) · [Phase 6 index](README.md)
