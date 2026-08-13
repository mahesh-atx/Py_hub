# 📌 Phase 6: Python for Data Science (Weeks 17–20)

> Where Python becomes a data science tool. NumPy, Pandas, cleaning, visualisation, analysis, and seven complete projects.

**Modules 24–29** · 6 modules + projects

| #   | File                                                                                 | Contents                                                                                                                                                                              |
| --- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | [Module 24: NumPy](module-24-numpy.md)                                               | ndarrays, indexing & boolean masks, reshaping, vectorised operations, broadcasting, ufuncs, random, linear algebra                                                                    |
| 2   | [Module 25: Pandas](module-25-pandas.md)                                             | Series & DataFrames, CSV/Excel/JSON I/O, `loc` vs `iloc`, filtering, sorting, groupby, merge/join, pivot tables                                                                       |
| 3   | [Module 26: Data Cleaning & Preprocessing](module-26-data-cleaning-preprocessing.md) | Missing values, duplicates, outliers, dtype conversion, string cleaning, datetimes, scaling, encoding, binning                                                                        |
| 4   | [Module 27: Data Visualization](module-27-data-visualization.md)                     | Matplotlib line/bar/pie/histogram/scatter/subplots; Seaborn distribution, box, violin, heatmap, pair and count plots                                                                  |
| 5   | [Module 28: Data Analysis](module-28-data-analysis.md)                               | The EDA workflow, descriptive statistics, correlation with significance testing, grouping, trends, 4 case studies                                                                     |
| 6   | [Module 29: Data Science Projects](module-29-python-data-science-projects.md)        | 7 full projects: Sales, Student Performance, IPL, Netflix, COVID-19, Employee Salary, E-commerce (with RFM)                                                                           |
| —   | [Projects & Key Takeaways](projects-and-takeaways.md)                                | 10 practice projects and the phase summary                                                                                                                                            |
| —   | [Project Build Guides](projects.md)                                            | Step-by-step instructions for all 10 projects: goal, prerequisites, numbered steps, how it works, and a finish line                                                                   |
| 🧠  | [**60 Practice Questions**](questions.md)                                   | NumPy, Pandas, cleaning, visualisation — Tiers 4–6 use the messy starter data with verified answers                                                                                   |
| 📊  | [**30 Chart Practice Questions**](assignments.md)                                 | Each question is an image — write the matplotlib/seaborn code that reproduces it. Tier 6 rebuilds four report charts from the starter data ([solutions](assignment-solutions.md)) |
| —   | [Starter Project](starter-project/README.md)                                         | **Deliberately messy data** — 3,060 rows the modules do not prepare you for, plus a reference cleaning pipeline and EDA                                                               |

---

## The starter project: data that is actually messy

Modules 24–29 teach Pandas on tidy data. **Real data is not tidy**, and that gap is where most self-taught analysts stall. [`starter-project/`](starter-project/README.md) closes it:

```bash
cd starter-project
python data/make_messy_data.py   # 3,060 orders, every column stored as text
python profile_raw.py            # see the damage before cleaning
python src/clean.py              # reference pipeline with an audit log
python src/eda.py                # the analysis
python src/charts.py             # 5 report figures
```

| What the raw file does to you | Measured                                                                |
| ----------------------------- | ----------------------------------------------------------------------- |
| `df.isnull().sum()` reports   | **0 missing values** — every gap hides as `"N/A"`, `"-"`, `"?"`, `""`   |
| Actual missing values         | **1,652** across 9 columns                                              |
| 5 categories appear as        | **20 distinct strings** (`Books` / `BOOKS` / `" Books"` / `Apparel`)    |
| 8 cities appear as            | **31 distinct strings** (`Mumbai` / `mumbai` / `Bombay` / `" Mumbai "`) |
| `pd.to_numeric(unit_price)`   | **loses 2,017 of 3,060 rows** silently (`"INR 1,140.67"`)               |
| Date formats present          | **5**, plus unparseable values and a dd/mm vs mm/dd ambiguity           |
| Exact duplicate rows          | 60 orders, 15 customers                                                 |

Building the reference pipeline surfaced **two real bugs**, both preserved in the notes because they are the most instructive part:

1. **Nulling `quantity` left the derived `revenue` intact** — 17 orders ended up holding **59.1% of total revenue**, the largest at ₹29,67,539 in a dataset whose plausible maximum is ~₹44,000.
2. **`dayfirst=True` misread US-format dates**, pushing 16 orders into months after the data ends and producing a fake **98% revenue collapse** in the monthly trend.

The EDA also produces three honest **null results** — delivery speed does not predict rating (r = −0.0201), premium customers rate slightly _lower_, and payment method barely matters. Reporting those is the skill.

---

[← Phase 4: Object-Oriented Programming](../phase-4-oop/README.md) · Return to the [curriculum index](../README.md)
