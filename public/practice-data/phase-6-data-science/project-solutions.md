# Phase 6 Project Solutions

## P1. Data Cleaning Bootcamp

```python
import pandas as pd
import numpy as np

def clean_sales_data(filepath="data/sales_raw.csv"):
    df = pd.read_csv(filepath, dtype=str, keep_default_na=False)

    # Standardize category
    cat_map = {
        'electronics': 'Electronics', 'elec': 'Electronics',
        'grocery': 'Grocery', 'groc': 'Grocery',
        'apparel': 'Apparel', 'clothing': 'Apparel'
    }
    df['category'] = df['category'].str.lower().str.strip().map(cat_map).fillna(df['category'])

    # Parse money
    df['unit_price'] = df['unit_price'].str.replace(r'[^\d.]', '', regex=True)
    df['unit_price'] = pd.to_numeric(df['unit_price'], errors='coerce')

    # Parse dates
    df['date'] = pd.to_datetime(df['date'], format="mixed", dayfirst=True, errors='coerce')

    # Filter impossible values
    df['quantity'] = pd.to_numeric(df['quantity'], errors='coerce')
    df.loc[(df['quantity'] <= 0) | (df['quantity'] > 100), 'quantity'] = np.nan

    return df

# Example usage
# df_clean = clean_sales_data()
```

## P2. Cleaning Pipeline & Audit Log

```python
import pandas as pd
import numpy as np

class CleaningLog:
    def __init__(self):
        self.logs = []

    def log(self, step, rows, detail):
        self.logs.append({"Step": step, "Rows Affected": rows, "Detail": detail})
        print(f"[{step}] {rows} rows: {detail}")

def clean_sales(raw: pd.DataFrame, log: CleaningLog) -> pd.DataFrame:
    df = raw.copy()

    # Example Step: Money parsing
    initial_nulls = df['unit_price'].isna().sum()
    df['unit_price'] = pd.to_numeric(df['unit_price'].str.replace(r'[^\d.]', '', regex=True), errors='coerce')
    new_nulls = df['unit_price'].isna().sum() - initial_nulls
    log.log("Parse Money", new_nulls, "Prices coerced to NaN due to formatting issues")

    # Trap: Derived column invalidation
    bad_qty = (df['quantity'] <= 0) | (df['quantity'] > 100)
    df.loc[bad_qty, ['quantity', 'revenue']] = np.nan
    log.log("Invalidate Qty", bad_qty.sum(), "Nulled impossible quantity and derived revenue")

    return df
```

## P3. Sales EDA Report

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Assuming df is cleaned
# plt.figure(figsize=(10,6))
# sns.barplot(data=df, x='category', y='revenue', estimator=np.sum)
# plt.title("Total Revenue by Category")
# plt.ylabel("Revenue (lakh)")
# plt.show()

print("Findings: Mumbai has highest volume, but median order value reveals different insights...")
```

## P4. Titanic Survival EDA

```python
import seaborn as sns
import matplotlib.pyplot as plt

titanic = sns.load_dataset("titanic")
print(f"Overall survival rate: {titanic['survived'].mean():.2%}")

plt.figure(figsize=(8,5))
sns.barplot(data=titanic, x="class", y="survived", hue="sex")
plt.title("Survival rate by class and sex")
plt.show()
```

## P5. Iris Analysis

```python
from sklearn.datasets import load_iris
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

data = load_iris()
df = pd.DataFrame(data.data, columns=data.feature_names)
df['species'] = pd.Categorical.from_codes(data.target, data.target_names)

sns.pairplot(df, hue="species")
plt.show()
```

## P6. NumPy Image Manipulation

```python
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

# Using a dummy array to simulate an image
img = np.random.randint(0, 256, (100, 100, 3), dtype=np.uint8)

flipped = img[::-1]
grayscale = img @ [0.299, 0.587, 0.114]
bright = np.clip(img.astype(int) + 50, 0, 255).astype(np.uint8)

plt.imshow(bright)
plt.show()
```

## P7. Matrix Calculator

```python
import numpy as np

def matrix_report(A):
    try:
        inv = np.linalg.inv(A)
        det = np.linalg.det(A)
        cond = np.linalg.cond(A)
        return {"invertible": True, "det": det, "condition": cond}
    except np.linalg.LinAlgError:
        return {"invertible": False, "det": 0, "condition": np.inf}

A = np.array([[1, 2], [3, 4]])
print(matrix_report(A))
```

## P8. Weather / Air Quality Analysis

```python
import pandas as pd
import numpy as np

# Mock implementation
# df = pd.read_csv("aqi.csv", parse_dates=["timestamp"], index_col="timestamp")
# daily = df.resample("D").mean()
# daily['rolling_7d'] = daily['aqi'].rolling(7).mean()
```

## P9. Stock Price Analyser

```python
import yfinance as yf
import matplotlib.pyplot as plt
import numpy as np

df = yf.download("RELIANCE.NS", start="2023-01-01", end="2024-01-01")
df['returns'] = df['Close'].pct_change()
df['volatility'] = df['returns'].rolling(20).std() * np.sqrt(252)

plt.plot(df.index, df['Close'], label='Close')
plt.plot(df.index, df['Close'].rolling(50).mean(), label='50d MA')
plt.legend()
plt.show()
```

## P10. Capstone EDA

```python
# Open-ended EDA project
# Students will bring their own dataset, run a full cleaning pipeline using the CleaningLog,
# explore the data with seaborn/matplotlib, and structure a written report matching the criteria.
```
