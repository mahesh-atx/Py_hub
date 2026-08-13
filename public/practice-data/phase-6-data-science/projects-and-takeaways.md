## 🧪 Practice Projects for Phase 6

After finishing all 6 modules, build these projects.

> 📖 **Every project below has a full step-by-step guide** — goal, prerequisites, numbered build steps, how it works, and a concrete finish line — in **[Project Build Guides](projects.md)**. Projects 1–3 there use the **[starter project](starter-project/README.md)**: 3,060 rows of deliberately messy data, because the modules teach Pandas on tidy data and real data is never tidy.

- [ ] **NumPy Image Manipulation** — load an image as an array, flip, crop, and adjust brightness with slicing
- [ ] **Matrix Calculator** — solve systems of equations, find inverses and eigenvalues with `np.linalg`
- [ ] **Weather Data Dashboard** — read a CSV, resample to monthly, plot trends with rolling averages
- [ ] **Titanic Survival EDA** — the classic starter dataset; analyse survival by class, sex, and age
- [ ] **Iris Dataset Analysis** — pair plots, correlation, and species comparison
- [ ] **Stock Price Analyser** — moving averages, daily returns, volatility, and a candlestick-style chart
- [ ] **Movie Ratings Explorer** — merge two datasets, find top-rated titles by genre
- [ ] **Customer Churn EDA** — find which features separate churners from loyal customers
- [ ] **Air Quality Analysis** — handle missing sensor data, detect outliers, plot seasonal patterns
- [ ] **Complete Capstone EDA** — pick any Kaggle dataset and produce a full report with findings and recommendations

---

## 📚 Key Takeaways for Phase 6

### NumPy

- The **ndarray** is the foundation of the entire data science stack.
- **Vectorise everything.** If you are looping over an array, there is a faster way.
- Slices are **views**, not copies — use `.copy()` when you need independence.
- `axis=0` collapses rows (column-wise); `axis=1` collapses columns (row-wise).
- Use `&`, `|`, `~` for boolean arrays — never `and`, `or`, `not`.
- `*` is element-wise; `@` is matrix multiplication.
- Always set `np.random.seed()` so your results are reproducible.

### Pandas

- **Series** = one labelled column; **DataFrame** = the whole table.
- `df.head()`, `.info()`, `.describe()`, `.isnull().sum()` — run these on every new dataset.
- `loc` selects by **label** (endpoint included); `iloc` by **position** (endpoint excluded).
- Single brackets give a Series; double brackets give a DataFrame.
- `groupby()` is the split-apply-combine engine — master named aggregations.
- Use `how='left'` as your default merge; an accidental `inner` join silently deletes rows.
- Most methods return a copy — remember to reassign.
- Always pass `index=False` when writing CSVs.

### Data Cleaning

- Cleaning is **80% of the job**. Budget your time accordingly.
- `NaN != NaN` — always use `.isna()`, never `== np.nan`.
- Fill with the **median** when outliers exist, the **mean** when they do not, the **mode** for categories.
- The **IQR method** is more robust than Z-scores for finding outliers.
- **Investigate** outliers before deleting them — sometimes they are the story.
- Fit scalers on **training data only**, then `.transform()` the test set.
- Use **one-hot** encoding for unordered categories; label encoding invents a false ranking.
- Convert repetitive text columns to `category` dtype for huge memory savings.

### Visualization

- Match the chart to the question: line for time, bar for categories, histogram for distribution, scatter for relationships.
- Call `savefig()` **before** `show()`.
- `plt.tight_layout()` fixes most layout problems.
- Bar charts should start at zero — truncated axes mislead.
- Prefer bar charts over pie charts beyond ~5 slices.
- Seaborn works directly with DataFrames and needs far less code than raw Matplotlib.
- Every chart needs a title, axis labels, and a one-line takeaway.

### Analysis

- Always compare **mean vs median** — a gap reveals skew.
- Report **count alongside mean**; a mean from 19 rows is not a mean from 870.
- Correlation ranges −1 to +1; **correlation never proves causation**.
- Check **statistical significance** (p-values), not just the size of a difference.
- Watch for **Simpson's Paradox** — always split aggregates into subgroups.
- **Plot your data.** Anscombe's quartet has identical statistics and four different shapes.
- Distinguish **absolute values from rates** — they often tell opposite stories.
- Separate **gross from net** figures in any business analysis.

> 💡 **Tip:** Phase 6 is the phase that makes you employable. The single best thing you can do now is take one real Kaggle dataset end to end — load it, clean it, explore it, visualise it, and write a report with three concrete findings and recommendations. Publish it on GitHub. One finished, well-documented analysis is worth more to an employer than ten tutorials you followed along with.

---

[← Module 29: Data Science Projects](module-29-python-data-science-projects.md) · [Project Build Guides →](projects.md) · [Phase 6 index](README.md)
