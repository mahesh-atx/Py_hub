"""Reference cleaning pipeline for the messy e-commerce data.

Read this AFTER attempting Project 1 yourself. Every function here exists
because profile_raw.py found a specific defect.

Design rules:
  1. Never clean in place — return a new frame, keep the raw file untouched.
  2. Log every row you drop and why. Silent drops are how analyses go wrong.
  3. Flag suspicious rows rather than deleting them where possible.
"""

from pathlib import Path

import numpy as np
import pandas as pd

HERE = Path(__file__).resolve().parent.parent
NULL_TOKENS = ["", " ", "N/A", "n/a", "NA", "NULL", "null", "-", "?", "nan",
               "missing", "not recorded"]

CITY_CANON = {
    "mumbai": "Mumbai", "bombay": "Mumbai",
    "pune": "Pune", "poona": "Pune",
    "bengaluru": "Bengaluru", "bangalore": "Bengaluru",
    "delhi": "Delhi", "new delhi": "Delhi", "dehli": "Delhi",
    "chennai": "Chennai", "madras": "Chennai",
    "hyderabad": "Hyderabad",
    "kolkata": "Kolkata", "calcutta": "Kolkata",
    "ahmedabad": "Ahmedabad", "amdavad": "Ahmedabad",
}
CATEGORY_CANON = {
    "electronics": "Electronics",
    "clothing": "Clothing", "apparel": "Clothing",
    "home": "Home", "home & kitchen": "Home",
    "books": "Books",
    "grocery": "Grocery", "groceries": "Grocery",
}
PAYMENT_CANON = {
    "upi": "UPI",
    "credit card": "Credit Card", "cc": "Credit Card",
    "debit card": "Debit Card", "debit_card": "Debit Card",
    "net banking": "Net Banking", "netbanking": "Net Banking",
    "cod": "COD", "cash on delivery": "COD",
}


class CleaningLog:
    """Track what the pipeline did, so the report can state it honestly."""

    def __init__(self):
        self.entries: list[tuple[str, int, str]] = []

    def add(self, step: str, n: int, detail: str = ""):
        self.entries.append((step, n, detail))

    def report(self) -> str:
        lines = [f"{'step':<34} {'rows':>7}  detail", "-" * 72]
        for step, n, detail in self.entries:
            lines.append(f"{step:<34} {n:>7}  {detail}")
        return "\n".join(lines)


def to_na(s: pd.Series) -> pd.Series:
    """Turn all eleven spellings of 'missing' into a real NaN."""
    return s.astype(str).str.strip().replace(
        {t.strip(): np.nan for t in NULL_TOKENS}
    )


def parse_money(s: pd.Series) -> pd.Series:
    """'INR 1,140.67' / '₹2,499' / 'Rs. 598.67' / ' 599.22 ' -> float.

    Strips currency words, symbols and thousands separators, then converts.
    """
    cleaned = (
        to_na(s)
        .str.replace(r"(?i)\b(inr|rs\.?)\b", "", regex=True)
        .str.replace("₹", "", regex=False)
        .str.replace(",", "", regex=False)
        .str.strip()
    )
    return pd.to_numeric(cleaned, errors="coerce")


def parse_dates(s: pd.Series) -> pd.Series:
    """Five formats plus broken values. dayfirst=True for dd/mm/yyyy.

    NOTE the ambiguity: '02/01/2025' is 2 Jan under dayfirst, 1 Feb under
    US order. There is no way to resolve this from the data alone — you
    must ask whoever produced the file. We assume dd/mm (Indian convention).
    """
    return pd.to_datetime(to_na(s), format="mixed", dayfirst=True, errors="coerce")


def parse_discount(s: pd.Series) -> pd.Series:
    """'10%' -> 10.0, '10' -> 10.0, '0.10' -> 10.0. Normalise to percent."""
    txt = to_na(s).str.replace("%", "", regex=False).str.strip()
    num = pd.to_numeric(txt, errors="coerce")
    # Values <= 1 that came from a decimal fraction become percentages.
    is_fraction = txt.str.contains(r"^0\.\d+$", na=False)
    return np.where(is_fraction, num * 100, num)


def canon(s: pd.Series, mapping: dict) -> pd.Series:
    return to_na(s).str.strip().str.lower().map(mapping)


def clean_sales(raw: pd.DataFrame, log: CleaningLog) -> pd.DataFrame:
    df = raw.copy()
    log.add("loaded", len(df), "raw rows")

    before = len(df)
    df = df.drop_duplicates()
    log.add("dropped exact duplicates", before - len(df))

    df["order_date"] = parse_dates(df["order_date"])
    log.add("unparseable dates -> NaT", int(df["order_date"].isna().sum()))

    # AMBIGUITY DETECTOR: dd/mm vs mm/dd cannot be resolved from the data.
    # We assumed dayfirst=True. Where that assumption produces a date outside
    # the plausible business window, the row was almost certainly mm/dd.
    # Flag them rather than silently trusting the parse.
    window_end = pd.Timestamp("2025-06-30")
    impossible = df["order_date"] > window_end
    log.add("dates beyond business window", int(impossible.sum()),
            "likely mm/dd misread as dd/mm")
    df["date_ambiguous"] = impossible

    df["unit_price"] = parse_money(df["unit_price"])
    df["revenue"] = parse_money(df["revenue"])
    df["quantity"] = pd.to_numeric(to_na(df["quantity"]), errors="coerce")
    df["delivery_days"] = pd.to_numeric(to_na(df["delivery_days"]), errors="coerce")
    df["rating"] = pd.to_numeric(to_na(df["rating"]), errors="coerce")
    df["discount_pct"] = parse_discount(df["discount_pct"])

    df["city"] = canon(df["city"], CITY_CANON)
    df["category"] = canon(df["category"], CATEGORY_CANON)
    df["payment_method"] = canon(df["payment_method"], PAYMENT_CANON)
    df["customer_id"] = to_na(df["customer_id"])

    # --- impossible values: flag, then null the value, never silently keep ---
    #
    # TRAP: nulling quantity ALSO invalidates the revenue on that row, because
    # revenue was computed from the bad quantity. If you null only the quantity,
    # a qty=500 row keeps its inflated revenue AND escapes the cross-check below
    # (expected becomes NaN, so the comparison is skipped). In this dataset that
    # left 17 orders holding 59% of total revenue. Null both.
    bad_qty = (df["quantity"] <= 0) | (df["quantity"] > 100)
    log.add("impossible quantity -> NaN", int(bad_qty.sum()), "<=0 or >100")
    df.loc[bad_qty, ["quantity", "revenue"]] = np.nan

    bad_days = (df["delivery_days"] < 0) | (df["delivery_days"] > 30)
    log.add("impossible delivery_days -> NaN", int(bad_days.sum()), "<0 or >30")
    df.loc[bad_days, "delivery_days"] = np.nan

    bad_rating = (df["rating"] < 1) | (df["rating"] > 5)
    log.add("out-of-range rating -> NaN", int(bad_rating.sum()), "outside 1-5")
    df.loc[bad_rating, "rating"] = np.nan

    # --- cross-field validation: does revenue match qty x price x discount? ---
    expected = df["quantity"] * df["unit_price"] * (1 - df["discount_pct"] / 100)
    ratio = df["revenue"] / expected
    mismatch = ratio.notna() & ((ratio < 0.95) | (ratio > 1.05))
    log.add("revenue != qty x price", int(mismatch.sum()), ">5% off expected")
    df["revenue_suspect"] = mismatch

    # Recompute revenue where we can; keep the original in a separate column.
    df["revenue_reported"] = df["revenue"]
    df["revenue"] = np.where(mismatch & expected.notna(), expected, df["revenue"])
    still_missing = df["revenue"].isna() & expected.notna()
    df.loc[still_missing, "revenue"] = expected[still_missing]
    log.add("revenue recomputed", int((mismatch | still_missing).sum()))

    df["order_month"] = df["order_date"].dt.to_period("M").dt.to_timestamp()
    return df


def clean_customers(raw: pd.DataFrame, log: CleaningLog) -> pd.DataFrame:
    df = raw.copy()
    log.add("loaded customers", len(df))

    before = len(df)
    df = df.drop_duplicates()
    log.add("dropped duplicate customers", before - len(df))

    before = len(df)
    df = df.drop_duplicates(subset="customer_id", keep="first")
    log.add("dropped dup customer_id", before - len(df))

    df["customer_name"] = to_na(df["customer_name"]).str.strip().str.title()
    df["age"] = pd.to_numeric(to_na(df["age"]), errors="coerce")

    bad_age = (df["age"] < 13) | (df["age"] > 100)
    log.add("impossible age -> NaN", int(bad_age.sum()), "<13 or >100")
    df.loc[bad_age, "age"] = np.nan

    df["gender"] = (
        to_na(df["gender"]).str.strip().str.lower()
        .map({"m": "M", "male": "M", "f": "F", "female": "F", "o": "Other"})
    )
    df["city"] = canon(df["city"], CITY_CANON)
    df["signup_date"] = parse_dates(df["signup_date"])
    df["is_premium"] = (
        to_na(df["is_premium"]).str.strip().str.lower()
        .map({"yes": True, "y": True, "true": True, "1": True,
              "no": False, "n": False, "false": False, "0": False})
    )
    df["phone"] = (
        to_na(df["phone"]).str.replace(r"[^\d]", "", regex=True).str[-10:]
    )
    return df


def run(save: bool = True):
    log = CleaningLog()
    sales_raw = pd.read_csv(HERE / "data" / "sales_raw.csv", dtype=str, keep_default_na=False)
    cust_raw = pd.read_csv(HERE / "data" / "customers_raw.csv", dtype=str, keep_default_na=False)

    sales = clean_sales(sales_raw, log)
    customers = clean_customers(cust_raw, log)

    merged = sales.merge(customers, on="customer_id", how="left",
                         suffixes=("", "_cust"), validate="many_to_one")
    log.add("merged sales x customers", len(merged),
            f"{merged['customer_name'].isna().sum()} orders unmatched")

    if save:
        out = HERE / "data"
        sales.to_csv(out / "sales_clean.csv", index=False)
        customers.to_csv(out / "customers_clean.csv", index=False)
        merged.to_csv(out / "merged_clean.csv", index=False)

    return sales, customers, merged, log


if __name__ == "__main__":
    sales, customers, merged, log = run()
    print(log.report())
    print(f"\n{'='*72}\nRESULT\n{'='*72}")
    print(f"sales    : {len(sales):,} rows, {sales['revenue'].notna().sum():,} with revenue")
    print(f"customers: {len(customers):,} rows")
    print(f"merged   : {len(merged):,} rows")
    print(f"\ntotal revenue: Rs {sales['revenue'].sum():,.0f}")
    print("\ndtypes after cleaning:")
    print(sales.dtypes.to_string())
