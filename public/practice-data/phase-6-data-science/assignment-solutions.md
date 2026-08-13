# 📊 Phase 6 — Chart Practice Solutions

Reference code for all 30 questions in [chart practice assignments](assignments.md). Every solution here was executed to render the target image in that file, so the code and the picture cannot disagree.

> ⚠️ Reading a solution you have not attempted feels like learning and is not. If you open one, close it, delete what you wrote, and reproduce the chart from memory. Recognising correct code and producing it are different skills, and only the second one is short.

There is more than one right answer to most of these. Yours is correct if the chart matches — the reference is a reasonable version, not the only one.

Tier 6 solutions read `merged_clean.csv` from the starter project. Run them from this directory, or adjust `DATA_PATH`.

---

## Tier 1 — One series, one axes (Q1–Q5)

## A1. Line chart

```python
x = np.arange(0, 11)
y = x ** 2

fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(x, y, color="#4C72B0", linewidth=2)
ax.set_xlabel("x")
ax.set_ylabel("x squared")
ax.set_title("Quadratic growth")
```

**The point of this one:** `plot` plus the three label calls. They are three separate methods, not one.

---

## A2. Bar chart, sorted, with value labels

```python
labels = ["Electronics", "Furniture", "Grocery", "Books", "Toys"]
values = [82, 61, 45, 30, 18]
order = sorted(zip(values, labels), reverse=True)
values, labels = [v for v, _ in order], [l for _, l in order]

fig, ax = plt.subplots(figsize=(7, 4))
ax.bar(labels, values, color="#4C72B0")
for i, v in enumerate(values):
    ax.text(i, v + 1.5, str(v), ha="center", fontsize=9)
ax.set_ylabel("Revenue (lakh)")
ax.set_title("Revenue by category")
ax.set_ylim(0, 95)
```

**The point of this one:** Sorting before plotting, and `ax.text` in a loop for value labels.

---

## A3. Horizontal bar chart

```python
labels = ["Python", "SQL", "Excel", "Power BI", "Pandas", "Git"]
values = [95, 88, 76, 64, 91, 55]
order = sorted(zip(values, labels))
values, labels = [v for v, _ in order], [l for _, l in order]

fig, ax = plt.subplots(figsize=(7, 4))
ax.barh(labels, values, color="#55A868")
for i, v in enumerate(values):
    ax.text(v + 1.5, i, str(v), va="center", fontsize=9)
ax.set_xlabel("Proficiency")
ax.set_title("Skills")
ax.set_xlim(0, 105)
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
```

**The point of this one:** `barh` inverts your mental model of sort order, plus spine removal.

---

## A4. Histogram

```python
rng = np.random.RandomState(0)
data = rng.lognormal(mean=1.0, sigma=0.6, size=1000)

fig, ax = plt.subplots(figsize=(7, 4))
ax.hist(data, bins=40, color="#4C72B0", alpha=0.85)
ax.set_xlabel("value")
ax.set_ylabel("frequency")
ax.set_title("Right-skewed distribution")
```

**The point of this one:** `hist` chooses 10 bins unless you say otherwise, and 10 is almost never right.

---

## A5. Donut chart

```python
labels = ["Chrome", "Safari", "Edge", "Firefox"]
values = [64, 19, 11, 6]

fig, ax = plt.subplots(figsize=(6, 5))
ax.pie(values, labels=labels, autopct="%1.1f%%", startangle=90,
       explode=(0.06, 0, 0, 0), wedgeprops=dict(width=0.45),
       colors=["#4C72B0", "#DD8452", "#55A868", "#C44E52"])
ax.set_title("Browser market share")
```

**The point of this one:** `wedgeprops=dict(width=...)` is the entire difference between a pie and a donut.

---

## Tier 2 — Several series on one chart (Q6–Q11)

## A6. Grouped bar chart

```python
labels = ["Q1", "Q2", "Q3", "Q4"]
y2023 = [45, 52, 48, 61]
y2024 = [52, 49, 63, 70]
x = np.arange(len(labels))
w = 0.35

fig, ax = plt.subplots(figsize=(7, 4))
ax.bar(x - w / 2, y2023, w, label="2023", color="#4C72B0")
ax.bar(x + w / 2, y2024, w, label="2024", color="#DD8452")
ax.set_xticks(x)
ax.set_xticklabels(labels)
ax.set_ylabel("Revenue (lakh)")
ax.set_title("Quarterly revenue by year")
ax.legend()
```

**The point of this one:** Matplotlib will not group bars for you. You position every bar by hand.

---

## A7. Stacked bar chart

```python
q = ["Q1", "Q2", "Q3", "Q4"]
online    = np.array([32, 41, 38, 55])
retail    = np.array([28, 25, 31, 24])
wholesale = np.array([12, 15, 18, 14])

fig, ax = plt.subplots(figsize=(7, 4))
ax.bar(q, online, label="Online", color="#4C72B0")
ax.bar(q, retail, bottom=online, label="Retail", color="#DD8452")
ax.bar(q, wholesale, bottom=online + retail, label="Wholesale", color="#55A868")
ax.set_ylabel("Revenue (lakh)")
ax.set_title("Revenue by channel")
ax.legend()
```

**The point of this one:** `bottom=` stacks, and it must receive arrays so `+` adds element-wise.

---

## A8. Count plot split by a second variable

```python
rng = np.random.RandomState(2)
df = pd.DataFrame({
    "category": rng.choice(["Electronics", "Grocery", "Apparel"], 300,
                           p=[0.45, 0.35, 0.20]),
    "payment": rng.choice(["Card", "UPI"], 300, p=[0.4, 0.6]),
})

fig, ax = plt.subplots(figsize=(7, 4))
sns.countplot(data=df, x="category", hue="payment", ax=ax, palette="Set2")
ax.set_xlabel("Category")
ax.set_ylabel("Orders")
ax.set_title("Orders by category and payment type")
```

**The point of this one:** `countplot` does its own aggregation; `barplot` does not.

---

## A9. Dual axis

```python
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
revenue = [120, 95, 160, 140, 175, 130]
units = [30, 42, 28, 35, 25, 38]

fig, ax = plt.subplots(figsize=(8, 4))
ax.bar(months, revenue, color="#4C72B0", label="revenue")
ax.set_ylabel("Revenue (lakh)", color="#4C72B0")
ax.tick_params(axis="y", labelcolor="#4C72B0")

ax2 = ax.twinx()
ax2.plot(months, units, color="#C44E52", marker="o", linewidth=2, label="units")
ax2.set_ylabel("Units", color="#C44E52")
ax2.tick_params(axis="y", labelcolor="#C44E52")

ax.set_title("Revenue and units")
```

**The point of this one:** `twinx()` makes a second axes sharing the x. Colour the labels or the chart is unreadable.

---

## A10. One highlighted bar

```python
labels = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Chennai",
          "Kolkata", "Hyderabad", "Jaipur"]
values = [312, 287, 241, 198, 176, 154, 168, 98]
focus = "Pune"
colors = ["#4C72B0" if l == focus else "#D3D3D3" for l in labels]

fig, ax = plt.subplots(figsize=(8, 4))
ax.bar(labels, values, color=colors)
i = labels.index(focus)
ax.text(i, values[i] + 8, str(values[i]), ha="center", fontsize=10,
        fontweight="bold", color="#4C72B0")
ax.set_ylabel("Orders")
ax.set_title("Pune sits fourth on order volume")
ax.set_ylim(0, 350)
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
```

**The point of this one:** Colour computed per bar from the data. The most useful storytelling trick there is.

---

## A11. Lollipop chart

```python
labels = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Chennai", "Kolkata", "Jaipur"]
values = [312, 287, 241, 198, 176, 154, 98]
order = sorted(zip(values, labels))
values, labels = [v for v, _ in order], [l for _, l in order]

fig, ax = plt.subplots(figsize=(7.5, 4.5))
ax.hlines(y=labels, xmin=0, xmax=values, color="#B0B8C4", linewidth=2)
ax.scatter(values, labels, color="#4C72B0", s=90, zorder=3)
for v, l in zip(values, labels):
    ax.text(v + 8, l, str(v), va="center", fontsize=9)
ax.set_xlabel("Orders")
ax.set_title("Orders by city")
ax.set_xlim(0, 355)
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
```

**The point of this one:** `hlines` plus `scatter`. Same information as a bar chart with a fraction of the ink.

---

## Tier 3 — Distributions (Q12–Q16)

## A12. Histogram with mean and median lines

```python
rng = np.random.RandomState(0)
data = rng.lognormal(mean=1.0, sigma=0.6, size=1000)

fig, ax = plt.subplots(figsize=(7, 4))
ax.hist(data, bins=40, color="#4C72B0", alpha=0.8)
ax.axvline(data.mean(), color="red", linestyle="--", linewidth=2,
           label=f"mean {data.mean():.2f}")
ax.axvline(np.median(data), color="green", linestyle="-", linewidth=2,
           label=f"median {np.median(data):.2f}")
ax.set_xlabel("value")
ax.set_ylabel("frequency")
ax.set_title("Right-skewed distribution")
ax.legend()
```

**The point of this one:** `axvline` for references, and a legend needs `label=` on each artist.

---

## A13. Box plot with the points overlaid

```python
rng = np.random.RandomState(3)
df = pd.DataFrame({
    "group": np.repeat(["A", "B", "C", "D"], 40),
    "value": np.concatenate([rng.normal(m, s, 40) for m, s in
                             [(50, 8), (58, 8), (46, 12), (62, 6)]]),
})

fig, ax = plt.subplots(figsize=(7, 4))
sns.boxplot(data=df, x="group", y="value", ax=ax, palette="Set2",
            hue="group", legend=False)
sns.stripplot(data=df, x="group", y="value", ax=ax,
              color="black", alpha=0.4, size=3)
ax.set_title("Distribution by group")
ax.set_xlabel("Group")
ax.set_ylabel("Value")
```

**The point of this one:** Seaborn draws onto an axes you already made, which is what lets you overlay two calls.

---

## A14. Violin plot

```python
rng = np.random.RandomState(6)
df = pd.DataFrame({
    "group": np.repeat(["Control", "Variant A", "Variant B"], 120),
    "score": np.concatenate([
        rng.normal(62, 9, 120),
        np.concatenate([rng.normal(55, 5, 60), rng.normal(78, 5, 60)]),
        rng.normal(70, 12, 120),
    ]),
})

fig, ax = plt.subplots(figsize=(7.5, 4.5))
sns.violinplot(data=df, x="group", y="score", ax=ax, inner="quartile",
               hue="group", palette="Set2", legend=False)
ax.set_xlabel("")
ax.set_ylabel("Score")
ax.set_title("Score distribution by group")
```

**The point of this one:** A violin shows the shape. Bimodality is invisible in a box plot, and it matters.

---

## A15. Bar chart with error bars

```python
models = ["Dummy", "LogReg", "Tree", "RF", "GBM"]
means  = [0.50, 0.89, 0.81, 0.88, 0.91]
sds    = [0.01, 0.009, 0.031, 0.012, 0.014]

fig, ax = plt.subplots(figsize=(7, 4.5))
ax.bar(models, means, yerr=sds, capsize=4, color="#4C72B0", ecolor="black")
ax.set_ylabel("ROC AUC")
ax.set_ylim(0, 1.05)
ax.set_title("Cross-validated AUC (mean +/- 1 sd over 5 folds)")
ax.grid(axis="y", alpha=0.3)
```

**The point of this one:** `yerr=` plus `capsize=`. Showing the spread is not decoration, it is the result.

---

## A16. Line with a shaded uncertainty band

```python
x = np.arange(1, 25)
mean = 50 + 3 * np.sqrt(x)
sd = 1.5 + 0.35 * x

fig, ax = plt.subplots(figsize=(8, 4))
ax.fill_between(x, mean - sd, mean + sd, color="#4C72B0", alpha=0.25,
                label="+/- 1 sd")
ax.plot(x, mean, color="#4C72B0", linewidth=2, label="forecast")
ax.set_xlabel("Month ahead")
ax.set_ylabel("Demand")
ax.set_title("Forecast with uncertainty band")
ax.legend()
```

**The point of this one:** `fill_between` takes a lower and an upper array. Draw order decides what is visible.

---

## Tier 4 — Relationships and matrices (Q17–Q21)

## A17. Scatter plot coloured by a third variable

```python
rng = np.random.RandomState(42)
x = rng.randn(200)
y = 2 * x + rng.randn(200)
z = x + y

fig, ax = plt.subplots(figsize=(7, 5))
sc = ax.scatter(x, y, c=z, cmap="viridis", s=40, alpha=0.7)
fig.colorbar(sc, ax=ax, label="x + y")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("Scatter coloured by a third variable")
```

**The point of this one:** `c=` plus `cmap=` encodes a third variable, and a colourbar is then mandatory.

---

## A18. Scatter with a fitted trend line

```python
rng = np.random.RandomState(9)
x = rng.uniform(0, 10, 80)
y = 2.4 * x + 5 + rng.randn(80) * 3

m, c = np.polyfit(x, y, 1)
r2 = np.corrcoef(x, y)[0, 1] ** 2
xs = np.linspace(x.min(), x.max(), 100)

fig, ax = plt.subplots(figsize=(7, 4.5))
ax.scatter(x, y, color="#4C72B0", alpha=0.7, s=35, label="observations")
ax.plot(xs, m * xs + c, color="#C44E52", linewidth=2,
        label=f"y = {m:.2f}x + {c:.2f}  (R2 = {r2:.3f})")
ax.set_xlabel("Ad spend (lakh)")
ax.set_ylabel("Sales (lakh)")
ax.set_title("Ad spend vs sales")
ax.legend()
```

**The point of this one:** `np.polyfit(x, y, 1)` → slope, intercept, in that order.

---

## A19. Correlation heatmap

```python
rng = np.random.RandomState(5)
n = 200
a = rng.randn(n)
b = a * 0.8 + rng.randn(n) * 0.6
c = -a * 0.5 + rng.randn(n) * 0.8
d = rng.randn(n)
e = b * 0.6 + d * 0.4
df = pd.DataFrame({"a": a, "b": b, "c": c, "d": d, "e": e})

fig, ax = plt.subplots(figsize=(6, 5))
sns.heatmap(df.corr(), annot=True, fmt=".2f", cmap="RdBu_r",
            center=0, vmin=-1, vmax=1, square=True, ax=ax)
ax.set_title("Correlation matrix")
```

**The point of this one:** `center=0` on a diverging colormap. Without it the colours are meaningless.

---

## A20. Pivot table heatmap

```python
rng = np.random.RandomState(8)
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
cats = ["Electronics", "Grocery", "Apparel", "Home"]
raw = pd.DataFrame({
    "month": np.repeat(months, 4),
    "category": cats * 6,
    "revenue": rng.randint(20, 120, 24),
})
pivot = raw.pivot_table(index="month", columns="category", values="revenue",
                        aggfunc="sum").loc[months]

fig, ax = plt.subplots(figsize=(7.5, 4.5))
sns.heatmap(pivot, annot=True, fmt=".0f", cmap="YlGnBu", ax=ax,
            cbar_kws={"label": "Revenue (lakh)"})
ax.set_title("Revenue by month and category")
ax.set_xlabel("")
ax.set_ylabel("")
```

**The point of this one:** `pivot_table` builds the matrix; its alphabetical sort quietly scrambles months.

---

## A21. Diverging bar chart

```python
regions = ["North", "South", "East", "West", "Central", "North-East"]
change  = [12.4, -5.1, 8.9, -14.2, 3.3, -1.8]
order = sorted(zip(change, regions))
change, regions = [c for c, _ in order], [r for _, r in order]
colors = ["#55A868" if v > 0 else "#C44E52" for v in change]

fig, ax = plt.subplots(figsize=(7.5, 4.5))
ax.barh(regions, change, color=colors)
ax.axvline(0, color="black", linewidth=0.8)
for i, v in enumerate(change):
    ax.text(v + (0.6 if v > 0 else -0.6), i, f"{v:+.1f}%",
            va="center", ha="left" if v > 0 else "right", fontsize=9)
ax.set_xlabel("Year on year change (%)")
ax.set_title("Growth by region")
ax.set_xlim(-19, 17)
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
```

**The point of this one:** A list of colours, one per bar, built by a comprehension over the values.

---

## Tier 5 — Composition and annotation (Q22–Q26)

## A22. Two by two subplot grid

```python
rng = np.random.RandomState(4)
x = np.arange(20)

fig, axes = plt.subplots(2, 2, figsize=(10, 7))
axes[0, 0].plot(x, np.cumsum(rng.randn(20)), color="#4C72B0")
axes[0, 0].set_title("Trend")
axes[0, 1].bar(["A", "B", "C", "D"], [12, 19, 7, 15], color="#DD8452")
axes[0, 1].set_title("Categories")
axes[1, 0].hist(rng.normal(0, 1, 400), bins=25, color="#55A868")
axes[1, 0].set_title("Distribution")
axes[1, 1].scatter(rng.randn(80), rng.randn(80), color="#C44E52", alpha=0.6)
axes[1, 1].set_title("Relationship")
fig.suptitle("Four views of the same dataset")
fig.tight_layout()
```

**The point of this one:** A 2×2 `axes` is a 2D array, and `tight_layout` is not optional once you have a suptitle.

---

## A23. Annotated peak

```python
rng = np.random.RandomState(17)
x = np.arange(24)
y = 50 + np.cumsum(rng.randn(24) * 5)
i = int(np.argmax(y))

fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(x, y, color="#4C72B0", linewidth=2)
ax.scatter([x[i]], [y[i]], color="red", s=80, zorder=5)
ax.annotate(f"peak {y[i]:.1f} at hour {i}", xy=(x[i], y[i]),
            xytext=(x[i] + 3.5, y[i] - 7),
            arrowprops=dict(arrowstyle="->", color="red"), color="red")
ax.set_xlabel("hour")
ax.set_ylabel("value")
ax.set_title("Peak highlighted")
ax.grid(alpha=0.3)
```

**The point of this one:** `argmax` to locate, `annotate` with `arrowprops` to point.

---

## A24. Time series with a rolling mean

```python
rng = np.random.RandomState(11)
idx = pd.date_range("2024-01-01", periods=120, freq="D")
s = pd.Series(100 + np.cumsum(rng.randn(120) * 2), index=idx)

fig, ax = plt.subplots(figsize=(9, 4))
ax.plot(s.index, s.values, color="grey", alpha=0.5, linewidth=1, label="daily")
ax.plot(s.index, s.rolling(7).mean(), color="#C44E52", linewidth=2,
        label="7-day mean")
ax.set_ylabel("Value")
ax.set_title("Daily series and its 7-day rolling mean")
ax.legend()
ax.grid(alpha=0.3)
fig.autofmt_xdate()
```

**The point of this one:** `rolling(7).mean()` leaves 6 leading NaNs, and matplotlib skips them silently.

---

## A25. Pareto chart

```python
labels = ["Scratched", "Wrong size", "Late", "Missing part", "Damaged box", "Other"]
counts = [142, 98, 61, 34, 21, 9]
order = sorted(zip(counts, labels), reverse=True)
counts, labels = [c for c, _ in order], [l for _, l in order]
cum = np.cumsum(counts) / sum(counts) * 100

fig, ax = plt.subplots(figsize=(8.5, 4.5))
ax.bar(labels, counts, color="#4C72B0")
ax.set_ylabel("Defects", color="#4C72B0")
ax.tick_params(axis="y", labelcolor="#4C72B0")

ax2 = ax.twinx()
ax2.plot(labels, cum, color="#C44E52", marker="o", linewidth=2)
ax2.axhline(80, color="grey", linestyle="--", linewidth=1)
ax2.set_ylabel("Cumulative %", color="#C44E52")
ax2.tick_params(axis="y", labelcolor="#C44E52")
ax2.set_ylim(0, 105)

ax.set_title("Pareto chart of defect causes")
fig.autofmt_xdate(rotation=20)
```

**The point of this one:** Two y axes with different units, and a cumulative line built from a sorted `cumsum`.

---

## A26. Slope chart

```python
data = [("Laptop", 82, 95), ("Phone", 74, 61), ("Tablet", 45, 58),
        ("Monitor", 63, 52), ("Keyboard", 38, 41)]

fig, ax = plt.subplots(figsize=(6.5, 5.5))
for name, before, after in data:
    col = "#55A868" if after >= before else "#C44E52"
    ax.plot([0, 1], [before, after], color=col, marker="o", linewidth=2)
    ax.text(-0.04, before, f"{name}  {before}", ha="right", va="center", fontsize=9)
    ax.text(1.04, after, f"{after}  {name}", ha="left", va="center", fontsize=9)

ax.set_xticks([0, 1])
ax.set_xticklabels(["Before", "After"])
ax.set_xlim(-0.5, 1.5)
ax.set_yticks([])
ax.set_title("Satisfaction score, before and after redesign")
for side in ["top", "right", "left", "bottom"]:
    ax.spines[side].set_visible(False)
```

**The point of this one:** A loop of two-point lines. Most unusual charts are ordinary primitives in a loop.

---

## Tier 6 — Report charts from the messy starter data (Q27–Q30)

## A27. Revenue by category from the starter data

```python
DATA_PATH = "starter-project/data/merged_clean.csv"

df = pd.read_csv(DATA_PATH)

cat = df.groupby("category")["revenue"].sum().sort_values(ascending=False)
total = df["revenue"].sum()

fig, ax = plt.subplots(figsize=(8, 4.5))
bars = ax.bar(cat.index, cat.values, color="#4C72B0")
for b, v in zip(bars, cat.values):
    ax.text(b.get_x() + b.get_width() / 2, v + 60000, f"{v/1e5:.1f}L",
            ha="center", fontsize=9)
top = cat.index[0]
ax.text(0, cat.iloc[0] * 0.55, f"{cat.iloc[0]/total*100:.1f}%\nof revenue",
        ha="center", color="white", fontsize=11, fontweight="bold")
ax.set_ylabel("Revenue (Rs)")
ax.set_title(f"{top} leads on revenue")
ax.set_ylim(0, 3.4e6)
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
```

**The point of this one:** The Phase 6 report chart. Aggregate, sort, label in the reader's units, title with the finding.

---

## A28. Monthly revenue trend

```python
DATA_PATH = "starter-project/data/merged_clean.csv"

df = pd.read_csv(DATA_PATH, parse_dates=["order_date", "order_month"])
valid = df[~df["date_ambiguous"]]

m = valid.groupby("order_month")["revenue"].sum()

fig, ax = plt.subplots(figsize=(9.5, 4.5))
ax.plot(m.index, m.values, color="#4C72B0", marker="o", linewidth=2)
ax.axhline(m.mean(), color="#8C8C8C", linestyle="--", linewidth=1,
           label=f"mean {m.mean()/1e5:.2f}L")
ax.set_ylabel("Revenue (Rs)")
ax.set_title("Monthly revenue, Jan 2024 to Jun 2025")
ax.set_ylim(0, 6.2e5)
ax.legend()
ax.grid(alpha=0.3)
fig.autofmt_xdate()
```

**The point of this one:** The date-ambiguity filter and the zero baseline. Two decisions that change the story.

---

## A29. City by category heatmap

```python
DATA_PATH = "starter-project/data/merged_clean.csv"

df = pd.read_csv(DATA_PATH)

pivot = df.pivot_table(index="city", columns="category",
                       values="revenue", aggfunc="sum") / 1e5
order = pivot.sum(axis=1).sort_values(ascending=False).index
pivot = pivot.loc[order]

fig, ax = plt.subplots(figsize=(8.5, 5))
sns.heatmap(pivot, annot=True, fmt=".2f", cmap="YlGnBu", ax=ax,
            cbar_kws={"label": "Revenue (lakh)"})
ax.set_title("Revenue by city and category (Rs lakh)")
ax.set_xlabel("")
ax.set_ylabel("")
```

**The point of this one:** Two-dimensional aggregation, then deliberate ordering and unit scaling.

---

## A30. The null result

```python
DATA_PATH = "starter-project/data/merged_clean.csv"

df = pd.read_csv(DATA_PATH)
d = df.dropna(subset=["delivery_days", "rating"])
r = d["delivery_days"].corr(d["rating"])

rng = np.random.RandomState(0)
jx = d["delivery_days"] + rng.uniform(-0.28, 0.28, len(d))
jy = d["rating"] + rng.uniform(-0.28, 0.28, len(d))

fig, ax = plt.subplots(figsize=(8, 4.5))
ax.scatter(jx, jy, s=12, alpha=0.25, color="#4C72B0")
means = d.groupby("delivery_days")["rating"].mean()
ax.plot(means.index, means.values, color="#C44E52", marker="o", linewidth=2,
        label="mean rating per delivery day")
ax.set_xlabel("Delivery days")
ax.set_ylabel("Rating")
ax.set_title(f"Delivery speed does not predict rating (r = {r:.4f}, n = {len(d):,})")
ax.legend()
ax.grid(alpha=0.3)
```

**The point of this one:** Jitter for overplotted integers, and the discipline of charting a null result.

---

[← Questions](assignments.md) · [Phase 6 index](README.md)
