"""Build the Phase 6 chart practice set.

Renders 30 target images into `images/practice/` and writes two markdown files:

    chart-practice.md             the questions  (image + data + spec, no code)
    chart-practice-solutions.md   the reference code, verified by running it

Run it from this directory:

    python make-chart-practice.py

Questions 27-30 read `starter-project/data/merged_clean.csv`, so run
`python src/clean.py` inside the starter project first. If that file is
missing those four charts are skipped with a warning and the rest still build.

This script is the single source of truth. Both markdown files are generated,
so the images, the questions and the solutions cannot drift apart.
"""

import re
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

HERE = Path(__file__).resolve().parent
IMG = HERE / "images" / "practice"
DATA = HERE / "starter-project" / "data" / "merged_clean.csv"

BLUE, ORANGE, GREEN, RED, GREY = "#4C72B0", "#DD8452", "#55A868", "#C44E52", "#8C8C8C"


# ===================================================================== specs
# Each question:
#   tier    section it belongs to
#   title   the question heading
#   brief   one sentence describing what the reader is looking at
#   data    the setup code the learner is given (never gives away the answer)
#   code    the reference solution, executed to render the image
#   must    the checklist of things the chart has to contain
#   expect  exact strings and measured values
#   check   the specific way this one goes silently wrong
#   why     one line, shown in the solutions file

Q = []


def q(**kw):
    Q.append(kw)


# ----------------------------------------------------- Tier 1: single series
q(
    tier=1, title="Line chart",
    brief="A single blue line showing y = x squared from 0 to 10, with both "
          "axes labelled and a title.",
    data="x = np.arange(0, 11)\ny = x ** 2",
    code='''
x = np.arange(0, 11)
y = x ** 2

fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(x, y, color="#4C72B0", linewidth=2)
ax.set_xlabel("x")
ax.set_ylabel("x squared")
ax.set_title("Quadratic growth")
''',
    must=["one line, no markers", "x label, y label and a title"],
    expect="title `Quadratic growth` · xlabel `x` · ylabel `x squared`. "
           "The curve passes through (10, 100).",
    check="Your y axis must reach **100**. If it stops at 10 you plotted `x`, not `x ** 2`.",
    why="`plot` plus the three label calls. They are three separate methods, not one.",
)

q(
    tier=1, title="Bar chart, sorted, with value labels",
    brief="Five categories as vertical bars, tallest on the left, with the "
          "value printed above each bar.",
    data='labels = ["Electronics", "Furniture", "Grocery", "Books", "Toys"]\n'
         'values = [82, 61, 45, 30, 18]',
    code='''
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
''',
    must=["5 bars, descending left to right", "a text label above every bar",
          "y limit leaving room for the top label"],
    expect="title `Revenue by category` · ylabel `Revenue (lakh)`. "
           "Bar heights **82, 61, 45, 30, 18**.",
    check="Sort the values **and the labels together**. `values.sort()` on its "
          "own leaves every label attached to the wrong bar, raises nothing, "
          "and produces a chart that looks completely professional.",
    why="Sorting before plotting, and `ax.text` in a loop for value labels.",
)

q(
    tier=1, title="Horizontal bar chart",
    brief="Six skills as horizontal bars with the longest at the top, values "
          "printed to the right of each bar, and no top or right spine.",
    data='labels = ["Python", "SQL", "Excel", "Power BI", "Pandas", "Git"]\n'
         'values = [95, 88, 76, 64, 91, 55]',
    code='''
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
''',
    must=["6 horizontal bars, longest at the top", "value labels to the right",
          "top and right spines removed"],
    expect="title `Skills` · xlabel `Proficiency`. Python (95) at the top, "
           "Git (55) at the bottom.",
    check="`barh` draws the **first** item at the **bottom**, so you sort "
          "**ascending** to get the largest at the top. Sorting descending — "
          "which is correct for `ax.bar` — silently flips the whole chart.",
    why="`barh` inverts your mental model of sort order, plus spine removal.",
)

q(
    tier=1, title="Histogram",
    brief="A histogram of 1,000 right-skewed values in 40 bins.",
    data='rng = np.random.RandomState(0)\n'
         'data = rng.lognormal(mean=1.0, sigma=0.6, size=1000)',
    code='''
rng = np.random.RandomState(0)
data = rng.lognormal(mean=1.0, sigma=0.6, size=1000)

fig, ax = plt.subplots(figsize=(7, 4))
ax.hist(data, bins=40, color="#4C72B0", alpha=0.85)
ax.set_xlabel("value")
ax.set_ylabel("frequency")
ax.set_title("Right-skewed distribution")
''',
    must=["exactly 40 bins", "x and y labels naming what is counted"],
    expect="title `Right-skewed distribution` · xlabel `value` · ylabel "
           "`frequency`. A long tail to the right, peak near 2.5.",
    check="Count the bars: **40**. The default is 10, and a histogram with the "
          "default bin count will hide the shape you are trying to show.",
    why="`hist` chooses 10 bins unless you say otherwise, and 10 is almost never right.",
)

q(
    tier=1, title="Donut chart",
    brief="Browser market share as a donut — a pie with a hole — each slice "
          "labelled with its percentage and the largest slice pulled out.",
    data='labels = ["Chrome", "Safari", "Edge", "Firefox"]\n'
         'values = [64, 19, 11, 6]',
    code='''
labels = ["Chrome", "Safari", "Edge", "Firefox"]
values = [64, 19, 11, 6]

fig, ax = plt.subplots(figsize=(6, 5))
ax.pie(values, labels=labels, autopct="%1.1f%%", startangle=90,
       explode=(0.06, 0, 0, 0), wedgeprops=dict(width=0.45),
       colors=["#4C72B0", "#DD8452", "#55A868", "#C44E52"])
ax.set_title("Browser market share")
''',
    must=["4 slices with a hole in the middle", "a percentage inside each slice",
          "the Chrome slice offset from the centre"],
    expect="title `Browser market share`. Percentages **64.0%, 19.0%, 11.0%, "
           "6.0%**, summing to 100.",
    check="The percentages must sum to **100.0**. If you see the raw numbers "
          "64, 19, 11, 6 instead, your `autopct` format string is printing "
          "the value rather than the share.",
    why="`wedgeprops=dict(width=...)` is the entire difference between a pie and a donut.",
)

# -------------------------------------------------- Tier 2: several series
q(
    tier=2, title="Grouped bar chart",
    brief="Four quarters on the x axis with two series, 2023 and 2024, drawn "
          "side by side rather than on top of each other.",
    data='labels = ["Q1", "Q2", "Q3", "Q4"]\n'
         'y2023 = [45, 52, 48, 61]\n'
         'y2024 = [52, 49, 63, 70]',
    code='''
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
''',
    must=["8 bars in 4 clearly separated pairs", "a legend naming the two years",
          "quarter names centred under each pair"],
    expect="title `Quarterly revenue by year` · ylabel `Revenue (lakh)`. "
           "Q3 shows the largest year-on-year jump, 48 → 63.",
    check="If the bars overlap, your width and your offset disagree — the "
          "offset must be exactly `width / 2`. If the x labels vanish, you set "
          "the ticks but not the tick labels.",
    why="Matplotlib will not group bars for you. You position every bar by hand.",
)

q(
    tier=2, title="Stacked bar chart",
    brief="The same four quarters, but each bar split into three stacked "
          "segments: Online, Retail and Wholesale.",
    data='q = ["Q1", "Q2", "Q3", "Q4"]\n'
         'online    = np.array([32, 41, 38, 55])\n'
         'retail    = np.array([28, 25, 31, 24])\n'
         'wholesale = np.array([12, 15, 18, 14])',
    code='''
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
''',
    must=["4 bars of 3 segments each, 12 rectangles in total",
          "segments stacked, never overlapping", "a legend naming the channels"],
    expect="title `Revenue by channel` · ylabel `Revenue (lakh)`. "
           "The Q4 bar is the tallest at **93** (55 + 24 + 14).",
    check="Every layer above the first needs `bottom=`. Miss one and that "
          "segment starts from zero, hiding the layer underneath it. Also note "
          "the data is given as **numpy arrays** — with plain lists, "
          "`online + retail` concatenates into 8 elements instead of adding.",
    why="`bottom=` stacks, and it must receive arrays so `+` adds element-wise.",
)

q(
    tier=2, title="Count plot split by a second variable",
    brief="Order counts for three product categories, each split into two "
          "payment types drawn side by side.",
    data='rng = np.random.RandomState(2)\n'
         'df = pd.DataFrame({\n'
         '    "category": rng.choice(["Electronics", "Grocery", "Apparel"], 300,\n'
         '                           p=[0.45, 0.35, 0.20]),\n'
         '    "payment": rng.choice(["Card", "UPI"], 300, p=[0.4, 0.6]),\n'
         '})',
    code='''
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
''',
    must=["6 bars in 3 pairs", "a legend titled with the splitting column"],
    expect="title `Orders by category and payment type` · xlabel `Category` · "
           "ylabel `Orders`. Bar heights **61 and 79** (Electronics), "
           "**45 and 61** (Grocery), **24 and 30** (Apparel).",
    check="If every bar has height 1 you aggregated first. `countplot` counts "
          "the rows itself — hand it the raw frame, not a `value_counts()`.",
    why="`countplot` does its own aggregation; `barplot` does not.",
)

q(
    tier=2, title="Dual axis",
    brief="Revenue as bars against the left axis and units as a line against "
          "the right axis, with each y label coloured to match its series.",
    data='months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]\n'
         'revenue = [120, 95, 160, 140, 175, 130]\n'
         'units = [30, 42, 28, 35, 25, 38]',
    code='''
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
''',
    must=["6 bars and 1 line", "two y axes with different scales",
          "both y labels and both sets of tick labels coloured"],
    expect="title `Revenue and units` · left ylabel `Revenue (lakh)` · right "
           "ylabel `Units`. The line peaks in Feb, the bars peak in May — the "
           "two series move in opposite directions, which is the whole point.",
    check="If the line lies flat along the bottom you plotted units on the "
          "**left** axis, where the revenue scale (0–175) crushes a 25–42 "
          "series into nothing. It renders perfectly and says nothing.",
    why="`twinx()` makes a second axes sharing the x. Colour the labels or the chart is unreadable.",
)

q(
    tier=2, title="One highlighted bar",
    brief="Eight cities as bars, every one light grey except the single bar "
          "the chart is about, which is dark blue and the only one labelled.",
    data='labels = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Chennai",\n'
         '          "Kolkata", "Hyderabad", "Jaipur"]\n'
         'values = [312, 287, 241, 198, 176, 154, 168, 98]\n'
         'focus = "Pune"',
    code='''
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
''',
    must=["8 bars in the original order, not sorted",
          "exactly one coloured bar and seven grey ones",
          "exactly one text label", "a title that states the finding"],
    expect="title `Pune sits fourth on order volume` · ylabel `Orders`. "
           "One text label reading **198**.",
    check="Exactly **one** dark bar and **one** label. Label all eight and the "
          "chart stops making a point. Note the title is a sentence, not "
          "`Orders by city` — that is the difference between a chart and a "
          "finding.",
    why="Colour computed per bar from the data. The most useful storytelling trick there is.",
)

q(
    tier=2, title="Lollipop chart",
    brief="Seven cities as thin horizontal stems ending in a filled circle, "
          "largest at the top, each labelled with its value.",
    data='labels = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Chennai", "Kolkata", "Jaipur"]\n'
         'values = [312, 287, 241, 198, 176, 154, 98]',
    code='''
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
''',
    must=["7 stems, each ending in a dot", "no bar rectangles at all",
          "Mumbai at the top, Jaipur at the bottom", "value labels beside each dot"],
    expect="title `Orders by city` · xlabel `Orders`. Mumbai **312** at the "
           "top, Jaipur **98** at the bottom.",
    check="Each dot must sit exactly at the end of its stem. If the dots drift "
          "off, `scatter` received its arguments as `(y, x)` — the stem call "
          "takes `y` first and the scatter call takes `x` first, which is easy "
          "to get backwards.",
    why="`hlines` plus `scatter`. Same information as a bar chart with a fraction of the ink.",
)

# ----------------------------------------------------- Tier 3: distributions
q(
    tier=3, title="Histogram with mean and median lines",
    brief="The same right-skewed histogram, now with a red dashed line at the "
          "mean, a green solid line at the median, and a legend giving both values.",
    data='rng = np.random.RandomState(0)\n'
         'data = rng.lognormal(mean=1.0, sigma=0.6, size=1000)',
    code='''
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
''',
    must=["40 bins", "2 vertical reference lines",
          "a legend showing both values to 2 decimals"],
    expect="Legend reads **mean 3.15** and **median 2.63**. The mean line sits "
           "to the right of the median line.",
    check="On right-skewed data the mean is always dragged **right** of the "
          "median by the tail. If yours are the other way round you swapped "
          "them — and that ordering is exactly the point the chart exists to "
          "make. Same reasoning as the outlier discussion in Module 26.",
    why="`axvline` for references, and a legend needs `label=` on each artist.",
)

q(
    tier=3, title="Box plot with the points overlaid",
    brief="Four groups compared with box plots, with every individual "
          "observation drawn on top as a small semi-transparent black dot.",
    data='rng = np.random.RandomState(3)\n'
         'df = pd.DataFrame({\n'
         '    "group": np.repeat(["A", "B", "C", "D"], 40),\n'
         '    "value": np.concatenate([rng.normal(m, s, 40) for m, s in\n'
         '                             [(50, 8), (58, 8), (46, 12), (62, 6)]]),\n'
         '})',
    code='''
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
''',
    must=["4 boxes with whiskers", "160 individual points drawn over them",
          "both seaborn calls on the same axes"],
    expect="title `Distribution by group` · xlabel `Group` · ylabel `Value`. "
           "Group C is visibly the widest, group D the narrowest.",
    check="The dots must land **inside** the boxes. If you end up with two "
          "figures — one empty, one with the points — you forgot `ax=ax` on "
          "one of the two seaborn calls. Seaborn silently creates its own "
          "figure when you do not give it one.",
    why="Seaborn draws onto an axes you already made, which is what lets you overlay two calls.",
)

q(
    tier=3, title="Violin plot",
    brief="Three experiment groups compared with violins, showing the full "
          "shape of each distribution, with dashed quartile lines inside.",
    data='rng = np.random.RandomState(6)\n'
         'df = pd.DataFrame({\n'
         '    "group": np.repeat(["Control", "Variant A", "Variant B"], 120),\n'
         '    "score": np.concatenate([\n'
         '        rng.normal(62, 9, 120),\n'
         '        np.concatenate([rng.normal(55, 5, 60), rng.normal(78, 5, 60)]),\n'
         '        rng.normal(70, 12, 120),\n'
         '    ]),\n'
         '})',
    code='''
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
''',
    must=["3 violins", "dashed quartile lines inside each one",
          "no x axis label"],
    expect="title `Score distribution by group` · ylabel `Score` · xlabel "
           "empty. **Variant A is clearly two-humped.**",
    check="Variant A must show **two bulges**. If it looks like one fat blob "
          "you drew a boxplot instead — and that is precisely the finding a "
          "boxplot hides. Variant A's median sits between two groups of users "
          "and describes neither of them.",
    why="A violin shows the shape. Bimodality is invisible in a box plot, and it matters.",
)

q(
    tier=3, title="Bar chart with error bars",
    brief="Five model scores as bars, each carrying a black vertical error bar "
          "with caps showing the standard deviation across folds.",
    data='models = ["Dummy", "LogReg", "Tree", "RF", "GBM"]\n'
         'means  = [0.50, 0.89, 0.81, 0.88, 0.91]\n'
         'sds    = [0.01, 0.009, 0.031, 0.012, 0.014]',
    code='''
models = ["Dummy", "LogReg", "Tree", "RF", "GBM"]
means  = [0.50, 0.89, 0.81, 0.88, 0.91]
sds    = [0.01, 0.009, 0.031, 0.012, 0.014]

fig, ax = plt.subplots(figsize=(7, 4.5))
ax.bar(models, means, yerr=sds, capsize=4, color="#4C72B0", ecolor="black")
ax.set_ylabel("ROC AUC")
ax.set_ylim(0, 1.05)
ax.set_title("Cross-validated AUC (mean +/- 1 sd over 5 folds)")
ax.grid(axis="y", alpha=0.3)
''',
    must=["5 bars", "an error bar with visible caps on each",
          "horizontal gridlines only", "y axis running 0 to about 1.05"],
    expect="title `Cross-validated AUC (mean +/- 1 sd over 5 folds)` · ylabel "
           "`ROC AUC`. GBM (0.91) and LogReg (0.89) overlap within their error "
           "bars — the chart does not let you claim GBM won.",
    check="If the caps are invisible, check `capsize` — it defaults to 0. A bar "
          "chart of means with no error bars is a lie of omission, and it is "
          "the single most common chart in bad model reports.",
    why="`yerr=` plus `capsize=`. Showing the spread is not decoration, it is the result.",
)

q(
    tier=3, title="Line with a shaded uncertainty band",
    brief="A forecast line with a shaded band around it showing plus or minus "
          "one standard deviation, widening as the forecast goes further out.",
    data="x = np.arange(1, 25)\nmean = 50 + 3 * np.sqrt(x)\nsd = 1.5 + 0.35 * x",
    code='''
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
''',
    must=["one line with a transparent band around it",
          "the band narrow on the left and wide on the right",
          "both the line and the band in the legend"],
    expect="title `Forecast with uncertainty band` · xlabel `Month ahead` · "
           "ylabel `Demand`. The band spans roughly ±1.85 at month 1 and ±9.9 "
           "at month 24.",
    check="Draw the band **before** the line, or the fill covers it. And if "
          "your band is a constant width you passed a single number where the "
          "per-point `sd` array was needed — which quietly claims your "
          "24-month forecast is as certain as your 1-month one.",
    why="`fill_between` takes a lower and an upper array. Draw order decides what is visible.",
)

# ---------------------------------------------------- Tier 4: relationships
q(
    tier=4, title="Scatter plot coloured by a third variable",
    brief="200 points positioned by x and y, coloured by a third variable "
          "using the viridis colormap, with a colourbar on the right.",
    data='rng = np.random.RandomState(42)\n'
         'x = rng.randn(200)\n'
         'y = 2 * x + rng.randn(200)\n'
         'z = x + y',
    code='''
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
''',
    must=["200 semi-transparent points", "a colourbar labelled `x + y`",
          "colour varying along the trend, not randomly"],
    expect="title `Scatter coloured by a third variable` · xlabel `x` · ylabel "
           "`y` · colourbar label `x + y`. Two axes objects exist in the "
           "figure: the plot and the colourbar.",
    check="`fig.colorbar` needs the object **returned by** `ax.scatter`, not "
          "the data. Passing `z` raises; passing nothing at all leaves a chart "
          "where colour means something and nothing says what.",
    why="`c=` plus `cmap=` encodes a third variable, and a colourbar is then mandatory.",
)

q(
    tier=4, title="Scatter with a fitted trend line",
    brief="80 observations with a straight best-fit line through them, and the "
          "fitted equation with its R squared printed in the legend.",
    data='rng = np.random.RandomState(9)\n'
         'x = rng.uniform(0, 10, 80)\n'
         'y = 2.4 * x + 5 + rng.randn(80) * 3',
    code='''
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
''',
    must=["80 points and 1 straight line",
          "the fitted slope, intercept and R squared in the legend",
          "the line spanning the full x range"],
    expect="The legend reads **y = 2.40x + 5.53  (R2 = 0.846)**. Note the "
           "slope is not exactly the 2.4 the data was built from — 80 noisy "
           "points do not recover the truth precisely, and pretending "
           "otherwise is how people over-claim.",
    check="`np.polyfit(x, y, 1)` returns **slope first, intercept second**. "
          "Swap them and you get a line with the right numbers in the wrong "
          "places. A slope near 0.4 instead of 2.4 means you passed `y` and "
          "`x` the wrong way round and fitted x on y.",
    why="`np.polyfit(x, y, 1)` → slope, intercept, in that order.",
)

q(
    tier=4, title="Correlation heatmap",
    brief="A correlation matrix of five variables as an annotated heatmap, "
          "coloured red to blue, centred on zero, values to two decimals.",
    data='rng = np.random.RandomState(5)\n'
         'n = 200\n'
         'a = rng.randn(n)\n'
         'b = a * 0.8 + rng.randn(n) * 0.6\n'
         'c = -a * 0.5 + rng.randn(n) * 0.8\n'
         'd = rng.randn(n)\n'
         'e = b * 0.6 + d * 0.4\n'
         'df = pd.DataFrame({"a": a, "b": b, "c": c, "d": d, "e": e})',
    code='''
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
''',
    must=["a 5x5 grid of 25 annotated cells", "square cells",
          "a diverging colour scale centred on zero, running -1 to 1"],
    expect="title `Correlation matrix`. The diagonal is all **1.00** and the "
           "deepest red. `a` and `b` correlate **+0.80**, `a` and `c` "
           "**-0.52**, and they are opposite colours.",
    check="Without `center=0` the colours lie about the sign — a correlation of "
          "-0.52 can end up the same shade as +0.2 just because of where the "
          "data happens to sit. Set `center=0`, `vmin=-1` and "
          "`vmax=1` so the scale is fixed and honest regardless of what the "
          "data happens to contain.",
    why="`center=0` on a diverging colormap. Without it the colours are meaningless.",
)

q(
    tier=4, title="Pivot table heatmap",
    brief="Revenue by month and category as an annotated heatmap, integers "
          "with no decimals, on the yellow-green-blue colormap.",
    data='rng = np.random.RandomState(8)\n'
         'months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]\n'
         'cats = ["Electronics", "Grocery", "Apparel", "Home"]\n'
         'raw = pd.DataFrame({\n'
         '    "month": np.repeat(months, 4),\n'
         '    "category": cats * 6,\n'
         '    "revenue": rng.randint(20, 120, 24),\n'
         '})',
    code='''
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
''',
    must=["a 6x4 grid of 24 annotated cells", "integers, no decimal points",
          "rows in calendar order", "a colourbar labelled with the unit"],
    expect="title `Revenue by month and category`. Rows read **Jan, Feb, Mar, "
           "Apr, May, Jun** top to bottom.",
    check="`pivot_table` sorts its index **alphabetically**, giving you Apr, "
          "Feb, Jan, Jun, Mar, May. The heatmap renders beautifully and every "
          "month is in the wrong place. Reorder explicitly with `.loc[months]` "
          "and check the index after **every** aggregation — the same silent "
          "reordering bites `groupby` in Module 25.",
    why="`pivot_table` builds the matrix; its alphabetical sort quietly scrambles months.",
)

q(
    tier=4, title="Diverging bar chart",
    brief="Percentage change by region as horizontal bars, green where "
          "positive and red where negative, split by a line at zero.",
    data='regions = ["North", "South", "East", "West", "Central", "North-East"]\n'
         'change  = [12.4, -5.1, 8.9, -14.2, 3.3, -1.8]',
    code='''
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
''',
    must=["6 bars, 3 green and 3 red", "a vertical line at zero",
          "labels on the outer end of every bar, with a sign",
          "bars sorted from most negative at the bottom"],
    expect="title `Growth by region` · xlabel `Year on year change (%)`. "
           "Labels read **+12.4%**, **+8.9%**, **+3.3%**, **-1.8%**, "
           "**-5.1%**, **-14.2%**.",
    check="The colours must be computed **from the data**, one per bar. Passing "
          "a single colour string gives you six identical bars and throws away "
          "the only thing the chart was for. Labels on negative bars need "
          "`ha='right'` or they overlap the bar.",
    why="A list of colours, one per bar, built by a comprehension over the values.",
)

# ------------------------------------------- Tier 5: composition, annotation
q(
    tier=5, title="Two by two subplot grid",
    brief="Four panels in a 2x2 grid — line, bar, histogram, scatter — each "
          "with its own title, under one overall figure title.",
    data='rng = np.random.RandomState(4)\nx = np.arange(20)',
    code='''
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
''',
    must=["4 panels", "4 individual titles plus 1 figure title",
          "no overlapping text anywhere"],
    expect="suptitle `Four views of the same dataset`; panel titles `Trend`, "
           "`Categories`, `Distribution`, `Relationship`.",
    check="`plt.subplots(2, 2)` returns a **2D** array. `axes[0]` is an entire "
          "row, so `axes[0].plot(...)` raises `AttributeError: 'numpy.ndarray' "
          "object has no attribute 'plot'`. Use `axes[0, 0]` or flatten it "
          "with `axes.ravel()` first. And without `fig.tight_layout()` the "
          "suptitle lands on top of the panel titles.",
    why="A 2×2 `axes` is a 2D array, and `tight_layout` is not optional once you have a suptitle.",
)

q(
    tier=5, title="Annotated peak",
    brief="A line chart where the single highest point is marked with a red "
          "dot and an arrow pointing at it, labelled with its value.",
    data='rng = np.random.RandomState(17)\n'
         'x = np.arange(24)\n'
         'y = 50 + np.cumsum(rng.randn(24) * 5)',
    code='''
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
''',
    must=["1 line", "1 red dot sitting exactly on the maximum",
          "1 arrow annotation naming the peak value and its position",
          "gridlines"],
    expect="title `Peak highlighted` · xlabel `hour` · ylabel `value`. The "
           "annotation reads **peak 78.4 at hour 11**, placed below and to the right of the dot so it does not collide with the title.",
    check="`np.argmax` returns the **index**; `np.max` returns the **value**. "
          "Using the value as an index puts your dot at a real, valid, "
          "completely wrong location — hour 76 does not exist here, so you get "
          "an `IndexError` if you are lucky and a misplaced dot if the numbers "
          "happen to be small enough.",
    why="`argmax` to locate, `annotate` with `arrowprops` to point.",
)

q(
    tier=5, title="Time series with a rolling mean",
    brief="120 noisy daily values in light grey with a bold 7-day rolling mean "
          "over the top, dates rotated on the x axis.",
    data='rng = np.random.RandomState(11)\n'
         'idx = pd.date_range("2024-01-01", periods=120, freq="D")\n'
         's = pd.Series(100 + np.cumsum(rng.randn(120) * 2), index=idx)',
    code='''
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
''',
    must=["2 lines, the raw series faint and the smoothed one bold",
          "readable, rotated date labels", "a legend"],
    expect="title `Daily series and its 7-day rolling mean` · ylabel `Value`. "
           "The red line starts **6 days after** the grey one.",
    check="That 6-day gap is the rolling window filling up and it is **correct**. "
          "If your red line starts on day 1 you used `min_periods=1`, which "
          "computes a '7-day mean' from a single observation and hides the "
          "fact that you do not have a week of data yet.",
    why="`rolling(7).mean()` leaves 6 leading NaNs, and matplotlib skips them silently.",
)

q(
    tier=5, title="Pareto chart",
    brief="Defect counts as bars sorted largest first, with a cumulative "
          "percentage line on a right-hand axis and a dashed reference line at "
          "80 percent. The classic 80/20 chart.",
    data='labels = ["Scratched", "Wrong size", "Late", "Missing part", "Damaged box", "Other"]\n'
         'counts = [142, 98, 61, 34, 21, 9]',
    code='''
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
''',
    must=["6 bars in descending order",
          "a cumulative line on a second y axis running 0 to about 105",
          "a dashed horizontal line at 80", "rotated category labels"],
    expect="title `Pareto chart of defect causes` · left ylabel `Defects` · "
           "right ylabel `Cumulative %`. The line ends at exactly **100%** and "
           "crosses 80% at the third bar — the top 3 of 6 causes are "
           "**82.5%** of all defects.",
    check="The `cumsum` must run on the **sorted** counts. Run it before "
          "sorting and the line wanders up and down instead of rising "
          "monotonically — which is visually obvious once you know to look, "
          "and invisible if you do not.",
    why="Two y axes with different units, and a cumulative line built from a sorted `cumsum`.",
)

q(
    tier=5, title="Slope chart",
    brief="Two columns, Before and After, with one line per product connecting "
          "its two values. Lines that rose are green, lines that fell are red. "
          "Every endpoint carries its name and value.",
    data='data = [("Laptop", 82, 95), ("Phone", 74, 61), ("Tablet", 45, 58),\n'
         '        ("Monitor", 63, 52), ("Keyboard", 38, 41)]',
    code='''
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
''',
    must=["5 two-point lines", "3 green and 2 red",
          "10 text labels, one at each endpoint",
          "only two x ticks, no y ticks, no spines"],
    expect="title `Satisfaction score, before and after redesign`. Phone "
           "(74→61) and Monitor (63→52) are the red lines.",
    check="Compute the colour **inside** the loop, per product. Working it out "
          "once outside gives you five identical lines and no comparison. "
          "There is no `slope_chart()` function anywhere in matplotlib or "
          "seaborn — this is a loop of two-point lines and nothing more, which "
          "is worth knowing because most 'exotic' charts are exactly this.",
    why="A loop of two-point lines. Most unusual charts are ordinary primitives in a loop.",
)

# ------------------------------------------- Tier 6: the real starter data
q(
    tier=6, real=True, title="Revenue by category from the starter data",
    brief="The five product categories of the cleaned starter dataset as "
          "sorted bars, labelled in lakh, with the leading category's share "
          "annotated on the chart.",
    data='df = pd.read_csv("starter-project/data/merged_clean.csv")',
    code='''
df = pd.read_csv(DATA)

cat = df.groupby("category")["revenue"].sum().sort_values(ascending=False)
total = df["revenue"].sum()

fig, ax = plt.subplots(figsize=(8, 4.5))
bars = ax.bar(cat.index, cat.values, color=BLUE)
for b, v in zip(bars, cat.values):
    ax.text(b.get_x() + b.get_width() / 2, v + 60000, f"{v/1e5:.1f}L",
            ha="center", fontsize=9)
top = cat.index[0]
ax.text(0, cat.iloc[0] * 0.55, f"{cat.iloc[0]/total*100:.1f}%\\nof revenue",
        ha="center", color="white", fontsize=11, fontweight="bold")
ax.set_ylabel("Revenue (Rs)")
ax.set_title(f"{top} leads on revenue")
ax.set_ylim(0, 3.4e6)
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
''',
    must=["5 bars, descending", "each bar labelled in lakh, one decimal",
          "the share of the top category written inside its bar",
          "a title that names the finding"],
    expect="title `Electronics leads on revenue` · ylabel `Revenue (Rs)`. Bar "
           "labels **30.1L, 19.4L, 17.5L, 9.5L, 7.2L** and the annotation "
           "**35.9% of revenue**. Total revenue is ₹83,67,710.",
    check="`groupby` returns categories in **alphabetical** order — Books, "
          "Clothing, Electronics, Grocery, Home. Forget `.sort_values()` and "
          "your 'ranking' chart is an alphabetical list that happens to look "
          "like a ranking. Verify the bars sum to ₹83,67,710.",
    why="The Phase 6 report chart. Aggregate, sort, label in the reader's units, title with the finding.",
)

q(
    tier=6, real=True, title="Monthly revenue trend",
    brief="Total revenue per month across the 18 months of the starter data, "
          "as a line with markers, with the mean drawn as a dashed reference.",
    data='df = pd.read_csv("starter-project/data/merged_clean.csv",\n'
         '                 parse_dates=["order_date", "order_month"])\n'
         'valid = df[~df["date_ambiguous"]]',
    code='''
df = pd.read_csv(DATA, parse_dates=["order_date", "order_month"])
valid = df[~df["date_ambiguous"]]

m = valid.groupby("order_month")["revenue"].sum()

fig, ax = plt.subplots(figsize=(9.5, 4.5))
ax.plot(m.index, m.values, color=BLUE, marker="o", linewidth=2)
ax.axhline(m.mean(), color=GREY, linestyle="--", linewidth=1,
           label=f"mean {m.mean()/1e5:.2f}L")
ax.set_ylabel("Revenue (Rs)")
ax.set_title("Monthly revenue, Jan 2024 to Jun 2025")
ax.set_ylim(0, 6.2e5)
ax.legend()
ax.grid(alpha=0.3)
fig.autofmt_xdate()
''',
    must=["18 points on one line", "a dashed horizontal mean line",
          "the y axis starting at zero", "rotated date labels"],
    expect="title `Monthly revenue, Jan 2024 to Jun 2025` · ylabel `Revenue "
           "(Rs)`. Peak **₹5,55,119** in Aug 2024, trough **₹3,44,360** in Apr "
           "2025, mean **4.37L**.",
    check="Two traps here, and both produce a chart that looks fine. First, "
          "filter out `date_ambiguous` rows — with them included, 16 orders "
          "land in months after the data ends and manufacture a **98% revenue "
          "collapse** at the right edge. Second, **start the y axis at zero**: "
          "let matplotlib autoscale and this flat-ish series turns into a "
          "dramatic mountain range that is entirely an artefact of the axis.",
    why="The date-ambiguity filter and the zero baseline. Two decisions that change the story.",
)

q(
    tier=6, real=True, title="City by category heatmap",
    brief="Revenue for every city and category combination in the starter "
          "data, as an annotated heatmap in lakh.",
    data='df = pd.read_csv("starter-project/data/merged_clean.csv")',
    code='''
df = pd.read_csv(DATA)

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
''',
    must=["a 7x5 grid of 35 annotated cells",
          "cities ordered by total revenue, largest at the top",
          "a colourbar labelled with the unit"],
    expect="title `Revenue by city and category (Rs lakh)`. Mumbai is the top "
           "row; Mumbai × Electronics is the largest single cell at **9.11** "
           "lakh. Hyderabad is the bottom row.",
    check="`pivot_table` gives you cities alphabetically — Ahmedabad first, "
          "Mumbai in the middle. Sort by the row totals so the eye finds the "
          "important row immediately. And divide by 1e5 **before** plotting, "
          "not after: annotating raw rupees writes `910812` into every cell "
          "and the grid becomes unreadable.",
    why="Two-dimensional aggregation, then deliberate ordering and unit scaling.",
)

q(
    tier=6, real=True, title="The null result",
    brief="Delivery days against customer rating for every order that has "
          "both, with the correlation stated in the title. This chart's job is "
          "to show that there is nothing there.",
    data='df = pd.read_csv("starter-project/data/merged_clean.csv")\n'
         'd = df.dropna(subset=["delivery_days", "rating"])',
    code='''
df = pd.read_csv(DATA)
d = df.dropna(subset=["delivery_days", "rating"])
r = d["delivery_days"].corr(d["rating"])

rng = np.random.RandomState(0)
jx = d["delivery_days"] + rng.uniform(-0.28, 0.28, len(d))
jy = d["rating"] + rng.uniform(-0.28, 0.28, len(d))

fig, ax = plt.subplots(figsize=(8, 4.5))
ax.scatter(jx, jy, s=12, alpha=0.25, color=BLUE)
means = d.groupby("delivery_days")["rating"].mean()
ax.plot(means.index, means.values, color=RED, marker="o", linewidth=2,
        label="mean rating per delivery day")
ax.set_xlabel("Delivery days")
ax.set_ylabel("Rating")
ax.set_title(f"Delivery speed does not predict rating (r = {r:.4f}, n = {len(d):,})")
ax.legend()
ax.grid(alpha=0.3)
''',
    must=["a jittered scatter of every valid order",
          "a red line of the mean rating for each delivery day",
          "the correlation and the sample size in the title",
          "a title that states the null result plainly"],
    expect="title `Delivery speed does not predict rating (r = -0.0201, n = "
           "2,043)`. The red mean line is close to flat, wandering between "
           "**3.55 and 3.79** across the nine delivery-day values.",
    check="Both variables are integers, so a raw scatter draws every point on "
          "top of about forty others and shows you a neat grid of dots that "
          "says nothing about density. **Jitter** them. The other trap is "
          "reporting nothing at all: r = -0.0201 on n = 2,043 is a real, "
          "publishable finding, and a chart that says so honestly is worth "
          "more than a chart that hunts for a correlation until one appears.",
    why="Jitter for overplotted integers, and the discipline of charting a null result.",
)


# ===================================================================== build
TIERS = {
    1: ("Tier 1 — One series, one axes (Q1–Q5)",
        "Nothing layered, nothing grouped. The whole task is noticing that a "
        "title, an x label and a y label are three separate method calls, and "
        "that sorting happens before plotting."),
    2: ("Tier 2 — Several series on one chart (Q6–Q11)",
        "Two or more things to compare. Every one of these fails in the same "
        "way: the drawing works, the positioning or the scale is wrong, and "
        "nothing raises."),
    3: ("Tier 3 — Distributions (Q12–Q16)",
        "Charts that show a **shape** rather than a value. This is where the "
        "difference between summarising data and hiding data starts to matter."),
    4: ("Tier 4 — Relationships and matrices (Q17–Q21)",
        "Two variables at once, sometimes three. Colour stops being decoration "
        "and starts carrying information, which means it now needs a legend or "
        "a colourbar."),
    5: ("Tier 5 — Composition and annotation (Q22–Q26)",
        "More than one axes, or an annotation that has to point at a location "
        "you computed. These are the charts you cannot produce by copying a "
        "snippet, because the snippet does not know where your peak is."),
    6: ("Tier 6 — Report charts from the messy starter data (Q27–Q30)",
        "The real thing. These four use `merged_clean.csv` from the starter "
        "project, so every number below is measured from the same 3,000 rows "
        "you cleaned. This is what the job actually looks like: aggregate, "
        "order deliberately, label in the reader's units, and title the chart "
        "with the finding rather than the variable names."),
}


def render(spec, path):
    plt.close("all")
    ns = dict(np=np, pd=pd, plt=plt, sns=sns, matplotlib=matplotlib,
              DATA=DATA, BLUE=BLUE, ORANGE=ORANGE, GREEN=GREEN, RED=RED, GREY=GREY)
    exec(compile(spec["code"], f"<q{spec['n']}>", "exec"), ns)
    fig = plt.gcf()
    if not fig.get_axes():
        raise RuntimeError("no axes created")
    fig.savefig(path, dpi=100, bbox_inches="tight")
    plt.close(fig)


def main():
    IMG.mkdir(parents=True, exist_ok=True)
    have_data = DATA.exists()
    if not have_data:
        print(f"WARNING: {DATA} missing — Tier 6 images will not be rebuilt.")
        print("  Run: cd starter-project && python src/clean.py")

    for i, spec in enumerate(Q, 1):
        spec["n"] = i
        spec["img"] = f"images/practice/q{i:02d}.png"

    for spec in Q:
        if spec.get("real") and not have_data:
            continue
        render(spec, HERE / spec["img"])
        print(f"  rendered q{spec['n']:02d}  {spec['title']}")

    # ---------------------------------------------------------- questions
    L = []
    L.append("# 📊 Phase 6 — 30 Chart Practice Questions")
    L.append("")
    L.append("**Every question is a picture.** Look at the chart, then write the "
             "matplotlib or seaborn code that produces it. The data is given to "
             "you, so any difference you see is your chart code and not your "
             "numbers.")
    L.append("")
    L.append("This is the companion to [Module 27: Data Visualization]"
             "(module-27-data-visualization.md). That module shows you the "
             "syntax; this file finds out whether you can produce it from a "
             "blank file, which is a different skill and the one you are "
             "actually short of.")
    L.append("")
    L.append("Solutions are in a **separate file** — "
             "[chart-practice-solutions.md](chart-practice-solutions.md) — on "
             "purpose. Having them one scroll away is the difference between "
             "practice and reading.")
    L.append("")
    L.append("---")
    L.append("")
    L.append("## Before you start")
    L.append("")
    L.append("Assume this prelude in every answer. Do not import anything else "
             "unless the question shows an import:")
    L.append("")
    L.append("```python")
    L.append("import matplotlib.pyplot as plt")
    L.append("import numpy as np")
    L.append("import pandas as pd")
    L.append("import seaborn as sns")
    L.append("```")
    L.append("")
    L.append("Build every figure with `fig, ax = plt.subplots(...)` rather than "
             "the bare `plt.` calls. The module shows both; the object API is "
             "the one that survives contact with subplots, twin axes and "
             "seaborn.")
    L.append("")
    L.append("**Tier 6 needs the starter project's cleaned data:**")
    L.append("")
    L.append("```bash")
    L.append("cd starter-project")
    L.append("python data/make_messy_data.py")
    L.append("python src/clean.py            # writes data/merged_clean.csv")
    L.append("```")
    L.append("")
    L.append("| Tier | Questions | Focus |")
    L.append("| --- | --- | --- |")
    for t in sorted(TIERS):
        ns = [s["n"] for s in Q if s["tier"] == t]
        name = TIERS[t][0].split("—")[1].split("(")[0].strip()
        L.append(f"| {t} | Q{ns[0]}–Q{ns[-1]} | {name} |")
    L.append("")
    L.append("> 💡 **Tip:** Spend a full minute looking at the image before you "
             "type. Count the bars. Read the axis labels out loud. Note what is "
             "sorted, what is annotated, what is grey and what is coloured. "
             "Most failures on these questions are observation failures, not "
             "coding failures.")
    L.append(">")
    L.append("")
    L.append("---")
    L.append("")

    for t in sorted(TIERS):
        head, intro = TIERS[t]
        L.append(f"## {head}")
        L.append("")
        L.append(intro)
        L.append("")
        for spec in [s for s in Q if s["tier"] == t]:
            L.append(f"### Q{spec['n']}. {spec['title']}")
            L.append("")
            L.append(f"![Q{spec['n']}: {spec['title']}]({spec['img']})")
            L.append("")
            L.append(spec["brief"])
            L.append("")
            L.append("**Data:**")
            L.append("")
            L.append("```python")
            L.append(spec["data"])
            L.append("```")
            L.append("")
            L.append("**Your chart must have:**")
            L.append("")
            for m in spec["must"]:
                L.append(f"- {m}")
            L.append("")
            L.append(f"**Expected:** {spec['expect']}")
            L.append("")
            L.append(f"> ⚠️ **Self-check:** {spec['check']}")
            L.append(">")
            L.append("")
            L.append("---")
            L.append("")

    L.append("## Common Mistakes")
    L.append("")
    L.append("Every one of these renders without an error. That is what makes "
             "them worth a section — a traceback tells you to fix something, a "
             "silently wrong chart gets presented to your manager.")
    L.append("")
    L.append("### 1. Sorting the values and forgetting the labels")
    L.append("")
    L.append("```python")
    L.append("values.sort(reverse=True)          # ❌ every label now points at the wrong bar")
    L.append("")
    L.append("order = sorted(zip(values, labels), reverse=True)   # ✅ they move together")
    L.append("values, labels = [v for v, _ in order], [l for _, l in order]")
    L.append("```")
    L.append("")
    L.append("Nothing raises, the chart looks professional, and every number is "
             "attached to the wrong category. **Q2, Q11, Q21, Q26 and Q27 all "
             "depend on getting this right.**")
    L.append("")
    L.append("### 2. Sorting `barh` in the direction that feels correct")
    L.append("")
    L.append("`ax.barh` draws the **first** item at the **bottom**. To put the "
             "largest at the top you sort **ascending** — the opposite of what "
             "you would do for `ax.bar`. Sorting descending flips the entire "
             "chart upside down without complaint.")
    L.append("")
    L.append("### 3. Letting an aggregation choose your order")
    L.append("")
    L.append("```python")
    L.append("df.groupby('category')['revenue'].sum()      # alphabetical, not ranked")
    L.append("df.pivot_table(index='month', ...).index     # ['Apr','Feb','Jan','Jun','Mar','May']")
    L.append("```")
    L.append("")
    L.append("Both return something sorted by **label**, and both look entirely "
             "reasonable plotted. Add `.sort_values()` or `.loc[months]` and "
             "check the index after every aggregation. This is the same trap "
             "as the `groupby` ordering warning in Module 25.")
    L.append("")
    L.append("### 4. Autoscaled y axes on a bar chart")
    L.append("")
    L.append("Matplotlib starts a bar chart's y axis wherever it likes. On "
             "values clustered between 340,000 and 555,000 that turns a 60% "
             "variation into a chart that looks like a 10× swing. **Bar charts "
             "and area charts start at zero.** Line charts may not have to, but "
             "you should still say so out loud when they do not — see Q28.")
    L.append("")
    L.append("### 5. Forgetting `ax=ax` on a seaborn call")
    L.append("")
    L.append("Seaborn quietly creates its own figure when you do not give it "
             "one. You end up with two images — your empty one and seaborn's — "
             "and if you are saving `plt.gcf()` you may well save the wrong "
             "one. Every seaborn call in this file passes `ax=ax`.")
    L.append("")
    L.append("### 6. Overplotting integer data without jitter")
    L.append("")
    L.append("Ratings 1–5 against delivery days 1–7 gives 35 possible "
             "positions. Two thousand orders land on those 35 dots and the "
             "chart shows you a tidy grid that carries no information about "
             "density. Jitter, or use transparency, or both — Q30.")
    L.append("")
    L.append("### 7. `argmax` versus `max`")
    L.append("")
    L.append("`np.argmax` returns the **index**, `np.max` returns the "
             "**value**. Using one where you meant the other places your "
             "annotation at a real, valid, completely wrong location.")
    L.append("")
    L.append("### 8. Titling the chart with the variable names")
    L.append("")
    L.append("`Revenue by category` describes the axes, which the reader can "
             "already see. `Electronics leads on revenue` states the finding. "
             "The second one takes the same number of characters and does the "
             "reader's work for them.")
    L.append("")
    L.append("---")
    L.append("")
    L.append("## Quick Reference")
    L.append("")
    L.append("| You want | Call |")
    L.append("| --- | --- |")
    for a, b in [
        ("A line", "`ax.plot(x, y)`"),
        ("Vertical bars", "`ax.bar(labels, values)`"),
        ("Horizontal bars", "`ax.barh(labels, values)` — first item at the bottom"),
        ("Stacked bars", "`ax.bar(x, b, bottom=a)` with numpy arrays"),
        ("Grouped bars", "`ax.bar(x - w/2, a, w)` and `ax.bar(x + w/2, b, w)`"),
        ("Histogram", "`ax.hist(data, bins=40)` — the default 10 is rarely right"),
        ("Scatter", "`ax.scatter(x, y, s=40, alpha=0.7)`"),
        ("Colour as a third variable", "`ax.scatter(..., c=z, cmap='viridis')` + `fig.colorbar(sc, ax=ax)`"),
        ("Donut", "`ax.pie(v, autopct='%1.1f%%', wedgeprops=dict(width=0.45))`"),
        ("Reference line", "`ax.axhline(y)` / `ax.axvline(x)`"),
        ("Shaded band", "`ax.fill_between(x, lo, hi, alpha=0.25)` — before the line"),
        ("Error bars", "`ax.bar(..., yerr=sd, capsize=4, ecolor='black')`"),
        ("Stems and dots", "`ax.hlines(y, 0, v)` then `ax.scatter(v, y)`"),
        ("Value labels", "`ax.text(x, y, s, ha='center')` in a loop"),
        ("Arrow annotation", "`ax.annotate(s, xy=..., xytext=..., arrowprops=dict(arrowstyle='->'))`"),
        ("Second y axis", "`ax2 = ax.twinx()`"),
        ("Panel grid", "`fig, axes = plt.subplots(2, 2)` then `axes[0, 0]`"),
        ("Legend", "`label=` on each artist, then `ax.legend()`"),
        ("Grid", "`ax.grid(alpha=0.3)` or `ax.grid(axis='y', alpha=0.3)`"),
        ("Remove a spine", "`ax.spines['top'].set_visible(False)`"),
        ("Rotate date ticks", "`fig.autofmt_xdate()`"),
        ("Stop overlapping text", "`fig.tight_layout()`"),
        ("Figure-level title", "`fig.suptitle('...')`"),
        ("Box / violin / count", "`sns.boxplot(data=df, x=..., y=..., ax=ax)` — same signature for all three"),
        ("Points over a box plot", "`sns.stripplot(..., ax=ax, color='black', alpha=0.4, size=3)`"),
        ("Correlation heatmap", "`sns.heatmap(df.corr(), annot=True, fmt='.2f', cmap='RdBu_r', center=0, ax=ax)`"),
        ("Matrix for a heatmap", "`df.pivot_table(index=..., columns=..., values=..., aggfunc='sum')`"),
        ("Trend line", "`m, c = np.polyfit(x, y, 1)`"),
        ("Rolling mean", "`s.rolling(7).mean()` — leaves 6 leading NaNs"),
        ("Force a zero baseline", "`ax.set_ylim(0, None)`"),
    ]:
        L.append(f"| {a} | {b} |")
    L.append("")
    L.append("---")
    L.append("")
    L.append("[← Phase 6 index](README.md) · "
             "[Module 27: Data Visualization](module-27-data-visualization.md) · "
             "[Solutions](chart-practice-solutions.md) · "
             "[60 Practice Questions](practice-questions.md)")
    L.append("")
    (HERE / "chart-practice.md").write_text("\n".join(L))

    # ---------------------------------------------------------- solutions
    S = []
    S.append("# 📊 Phase 6 — Chart Practice Solutions")
    S.append("")
    S.append("Reference code for all 30 questions in "
             "[chart-practice.md](chart-practice.md). Every solution here was "
             "executed to render the target image in that file, so the code and "
             "the picture cannot disagree.")
    S.append("")
    S.append("> ⚠️ Reading a solution you have not attempted feels like "
             "learning and is not. If you open one, close it, delete what you "
             "wrote, and reproduce the chart from memory. Recognising correct "
             "code and producing it are different skills, and only the second "
             "one is short.")
    S.append(">")
    S.append("")
    S.append("There is more than one right answer to most of these. Yours is "
             "correct if the chart matches — the reference is a reasonable "
             "version, not the only one.")
    S.append("")
    S.append("Tier 6 solutions read `merged_clean.csv` from the starter "
             "project. Run them from this directory, or adjust `DATA_PATH`.")
    S.append("")
    S.append("---")
    S.append("")
    for t in sorted(TIERS):
        S.append(f"## {TIERS[t][0]}")
        S.append("")
        for spec in [s for s in Q if s["tier"] == t]:
            S.append(f"### Q{spec['n']}. {spec['title']}")
            S.append("")
            body = spec["code"].strip()
            if spec.get("real"):
                body = (body
                        .replace("pd.read_csv(DATA,", 'pd.read_csv(DATA_PATH,')
                        .replace("pd.read_csv(DATA)", 'pd.read_csv(DATA_PATH)')
                        .replace("color=BLUE", 'color="#4C72B0"')
                        .replace("color=GREY", 'color="#8C8C8C"')
                        .replace("color=RED", 'color="#C44E52"')
                        .replace("color=ORANGE", 'color="#DD8452"')
                        .replace("color=GREEN", 'color="#55A868"'))
                body = ('DATA_PATH = "starter-project/data/merged_clean.csv"\n\n'
                        + body)
            S.append("```python")
            S.append(body)
            S.append("```")
            S.append("")
            S.append(f"**The point of this one:** {spec['why']}")
            S.append("")
            S.append("---")
            S.append("")
    S.append("[← Questions](chart-practice.md) · [Phase 6 index](README.md)")
    S.append("")
    (HERE / "chart-practice-solutions.md").write_text("\n".join(S))

    print(f"\nwrote chart-practice.md and chart-practice-solutions.md "
          f"({len(Q)} questions)")


if __name__ == "__main__":
    main()
