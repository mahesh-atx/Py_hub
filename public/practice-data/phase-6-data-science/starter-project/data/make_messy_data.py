"""Generate a deliberately messy e-commerce dataset.

Every defect here was chosen because it appears in real exported data:
mixed date formats, currency symbols in numeric columns, six different
spellings of "missing", inconsistent casing, duplicate rows, impossible
values, and a revenue column that disagrees with quantity x price.

Deterministic: same seed -> byte-identical CSVs.

Run:  python data/make_messy_data.py
"""

import random
from pathlib import Path

import numpy as np
import pandas as pd

SEED = 42
HERE = Path(__file__).resolve().parent

CITIES = {
    "Mumbai": "Maharashtra",
    "Pune": "Maharashtra",
    "Bengaluru": "Karnataka",
    "Delhi": "Delhi",
    "Chennai": "Tamil Nadu",
    "Hyderabad": "Telangana",
    "Kolkata": "West Bengal",
    "Ahmedabad": "Gujarat",
}
# Real-world spelling drift: the same city arrives four different ways.
CITY_VARIANTS = {
    "Mumbai": ["Mumbai", "mumbai", "MUMBAI", " Mumbai ", "Bombay"],
    "Pune": ["Pune", "pune", "PUNE", " Pune", "Poona"],
    "Bengaluru": ["Bengaluru", "bengaluru", "Bangalore", "BANGALORE", " Bengaluru "],
    "Delhi": ["Delhi", "delhi", "New Delhi", "NEW DELHI", "Dehli"],
    "Chennai": ["Chennai", "chennai", "CHENNAI", "Madras"],
    "Hyderabad": ["Hyderabad", "hyderabad", "HYDERABAD", " Hyderabad"],
    "Kolkata": ["Kolkata", "kolkata", "Calcutta", "KOLKATA"],
    "Ahmedabad": ["Ahmedabad", "ahmedabad", "AHMEDABAD", "Amdavad"],
}

CATEGORIES = {
    "Electronics": [("Wireless Earbuds", 2499), ("Power Bank", 1299), ("Smart Watch", 3999)],
    "Clothing": [("Cotton Kurta", 899), ("Denim Jeans", 1599), ("Running Shoes", 2299)],
    "Home": [("Bedsheet Set", 1199), ("Pressure Cooker", 2799), ("Table Lamp", 749)],
    "Books": [("Novel", 399), ("Textbook", 1250), ("Cookbook", 650)],
    "Grocery": [("Basmati Rice 5kg", 550), ("Olive Oil 1L", 780), ("Coffee 500g", 425)],
}
CATEGORY_VARIANTS = {
    "Electronics": ["Electronics", "electronics", "ELECTRONICS", "Electronics "],
    "Clothing": ["Clothing", "clothing", "Apparel", "CLOTHING"],
    "Home": ["Home", "home", "Home & Kitchen", "HOME"],
    "Books": ["Books", "books", "BOOKS", " Books"],
    "Grocery": ["Grocery", "grocery", "Groceries", "GROCERY"],
}

PAYMENTS = ["UPI", "upi", "Credit Card", "credit card", "CC", "Debit Card",
            "debit_card", "Net Banking", "netbanking", "COD", "Cash on Delivery"]

# Six ways of saying "this value is absent".
NULL_TOKENS = ["", " ", "N/A", "n/a", "NA", "NULL", "null", "-", "?", "nan", "missing"]


def messy_date(dt: pd.Timestamp, rng: random.Random) -> str:
    """Same date, five different formats, plus a few that are simply broken."""
    style = rng.random()
    if style < 0.45:
        return dt.strftime("%Y-%m-%d")
    if style < 0.65:
        return dt.strftime("%d/%m/%Y")
    if style < 0.78:
        return dt.strftime("%d-%b-%y")
    if style < 0.88:
        return dt.strftime("%B %d, %Y")
    if style < 0.95:
        return dt.strftime("%m/%d/%Y")          # US order - ambiguous with dd/mm!
    return rng.choice(["2024-13-45", "31/02/2024", "not recorded", ""])


def messy_price(value: float, rng: random.Random) -> str:
    """Numbers arrive as text, with currency symbols and thousands separators."""
    style = rng.random()
    if style < 0.35:
        return f"{value:,.2f}"
    if style < 0.55:
        return f"₹{value:,.0f}"
    if style < 0.70:
        return f"Rs. {value:,.2f}"
    if style < 0.85:
        return f"{value:.0f}"
    if style < 0.93:
        return f" {value:,.2f} "
    return f"INR {value:,.2f}"


def maybe_null(value, rng: random.Random, p: float):
    return rng.choice(NULL_TOKENS) if rng.random() < p else value


def build(n_orders: int = 3000):
    rng = random.Random(SEED)
    np_rng = np.random.RandomState(SEED)

    # ---------- customers ----------
    n_customers = 500
    first = ["Aarav", "Priya", "Rohan", "Sneha", "Vikram", "Ananya", "Karan", "Divya",
             "Arjun", "Meera", "Rahul", "Kavya", "Siddharth", "Pooja", "Nikhil", "Isha"]
    last = ["Sharma", "Patel", "Reddy", "Iyer", "Singh", "Nair", "Gupta", "Joshi",
            "Kulkarni", "Desai", "Rao", "Menon"]

    customers = []
    for i in range(1, n_customers + 1):
        base_city = rng.choice(list(CITIES))
        name = f"{rng.choice(first)} {rng.choice(last)}"
        # Names arrive with random casing and stray whitespace.
        style = rng.random()
        if style < 0.15:
            name = name.upper()
        elif style < 0.30:
            name = name.lower()
        elif style < 0.40:
            name = f"  {name} "

        age = rng.randint(18, 70)
        if rng.random() < 0.02:
            age = rng.choice([0, 999, -5, 150])          # impossible ages

        customers.append({
            "customer_id": f"C{i:04d}",
            "customer_name": name,
            "age": maybe_null(age, rng, 0.06),
            "gender": maybe_null(rng.choice(["M", "F", "male", "female", "Male", "Female", "O"]), rng, 0.04),
            "city": rng.choice(CITY_VARIANTS[base_city]),
            "state": CITIES[base_city],
            "signup_date": messy_date(
                pd.Timestamp("2022-01-01") + pd.Timedelta(days=rng.randint(0, 900)), rng),
            "phone": rng.choice([
                f"+91-{rng.randint(7000000000, 9999999999)}",
                f"{rng.randint(7000000000, 9999999999)}",
                f"+91 {rng.randint(70000, 99999)} {rng.randint(10000, 99999)}",
                f"0{rng.randint(7000000000, 9999999999)}",
            ]),
            "is_premium": rng.choice(["Yes", "No", "yes", "no", "Y", "N", "TRUE", "FALSE", "1", "0"]),
        })

    cust_df = pd.DataFrame(customers)
    # 3% of customer rows are exact duplicates.
    dupes = cust_df.sample(frac=0.03, random_state=SEED)
    cust_df = pd.concat([cust_df, dupes], ignore_index=True)

    # ---------- orders ----------
    orders = []
    for i in range(1, n_orders + 1):
        cat = rng.choice(list(CATEGORIES))
        product, base_price = rng.choice(CATEGORIES[cat])
        cust = rng.choice(customers)

        qty = rng.choices([1, 2, 3, 4, 5, 10], weights=[45, 25, 12, 8, 7, 3])[0]
        if rng.random() < 0.015:
            qty = rng.choice([-2, 0, 500])               # impossible quantities

        price = base_price * rng.uniform(0.9, 1.1)
        discount = rng.choices([0, 5, 10, 15, 20, 25], weights=[40, 15, 20, 10, 10, 5])[0]

        true_revenue = qty * price * (1 - discount / 100) if isinstance(qty, int) and qty > 0 else 0
        # 4% of rows have a revenue that disagrees with qty x price x discount.
        recorded_revenue = true_revenue * rng.uniform(1.5, 3.0) if rng.random() < 0.04 else true_revenue

        order_dt = pd.Timestamp("2024-01-01") + pd.Timedelta(days=rng.randint(0, 545))

        orders.append({
            "order_id": f"ORD{i:05d}",
            "order_date": messy_date(order_dt, rng),
            "customer_id": maybe_null(cust["customer_id"], rng, 0.03),
            "city": rng.choice(CITY_VARIANTS[[k for k, v in CITIES.items()
                                              if v == cust["state"]][0]]),
            "category": rng.choice(CATEGORY_VARIANTS[cat]),
            "product": product,
            "quantity": maybe_null(qty, rng, 0.02),
            "unit_price": maybe_null(messy_price(price, rng), rng, 0.05),
            "discount_pct": maybe_null(
                rng.choice([f"{discount}%", str(discount), f"{discount/100:.2f}"]), rng, 0.08),
            "revenue": maybe_null(messy_price(recorded_revenue, rng), rng, 0.04),
            "payment_method": maybe_null(rng.choice(PAYMENTS), rng, 0.03),
            "delivery_days": maybe_null(
                rng.choices([1, 2, 3, 4, 5, 6, 7, 8, -1, 0, 99],
                            weights=[14, 18, 18, 15, 12, 8, 6, 5, 1, 2, 1])[0], rng, 0.07),
            "rating": maybe_null(
                rng.choices([1, 2, 3, 4, 5, 0, 6, 4.5],
                            weights=[6, 9, 20, 30, 28, 3, 2, 2])[0], rng, 0.22),
        })

    ord_df = pd.DataFrame(orders)
    # 2% exact duplicate orders (the classic double-submit).
    dupes = ord_df.sample(frac=0.02, random_state=SEED)
    ord_df = pd.concat([ord_df, dupes], ignore_index=True)
    ord_df = ord_df.sample(frac=1.0, random_state=SEED).reset_index(drop=True)

    return ord_df, cust_df


if __name__ == "__main__":
    orders, customers = build()
    orders.to_csv(HERE / "sales_raw.csv", index=False)
    customers.to_csv(HERE / "customers_raw.csv", index=False)

    print(f"sales_raw.csv     : {orders.shape[0]:,} rows x {orders.shape[1]} cols")
    print(f"customers_raw.csv : {customers.shape[0]:,} rows x {customers.shape[1]} cols")
    print("\nEvery column below is stored as text. That is the first problem.")
    print(orders.dtypes.to_string())
