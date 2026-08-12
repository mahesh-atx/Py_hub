# Module 24: NumPy

## Introduction to NumPy

**NumPy** (Numerical Python) is the foundation of the entire Python data science ecosystem. Pandas, Matplotlib, Scikit-learn, and TensorFlow are all built on top of it.

Its core object is the **ndarray** — a fast, memory-efficient array of numbers.

### Installing and importing

```bash
pip install numpy
```

```python
import numpy as np      # np is the universal convention

print(np.__version__)   # 2.3.5
```

### Why not just use lists?

Python lists are flexible but slow for maths. NumPy arrays are stored in one continuous block of memory and operate on whole arrays at once.

```python
# Python list — addition joins them
print([1, 2, 3] + [4, 5, 6])            # [1, 2, 3, 4, 5, 6]

# NumPy array — addition does real maths
print(np.array([1, 2, 3]) + np.array([4, 5, 6]))   # [5 7 9]
```

### List vs NumPy array

| Python list                         | NumPy array                     |
| ----------------------------------- | ------------------------------- |
| Can hold mixed types                | All items must be the same type |
| Slow for maths                      | 10–100× faster                  |
| Loops needed for element-wise maths | Vectorised — no loops           |
| More memory per item                | Compact memory layout           |
| Built-in                            | Needs `pip install numpy`       |

### Vectorisation — the big idea

```python
# Slow, the "Python" way
numbers = [1, 2, 3, 4, 5]
squares = [n ** 2 for n in numbers]

# Fast, the "NumPy" way — no loop at all
numbers = np.array([1, 2, 3, 4, 5])
squares = numbers ** 2
```

> 💡 The golden rule of NumPy: **if you are writing a `for` loop over an array, there is almost certainly a faster vectorised way.**

---

## Creating Arrays

### From a Python list

```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])
print(a)            # [1 2 3 4 5]
print(type(a))      # <class 'numpy.ndarray'>
print(a.dtype)      # int64
```

### 2D and 3D arrays

```python
b = np.array([[1, 2, 3], [4, 5, 6]])
print(b)
```

Output:

```
[[1 2 3]
 [4 5 6]]
```

- **1D** array = a vector
- **2D** array = a matrix (rows and columns)
- **3D** array = a stack of matrices

### Built-in creation functions

```python
print(np.zeros((2, 3)))          # filled with 0.0
print(np.ones((2, 3), dtype=int))# filled with 1
print(np.full((2, 3), 7))        # filled with 7
print(np.eye(3))                 # identity matrix
```

Output:

```
[[0. 0. 0.]
 [0. 0. 0.]]
[[1 1 1]
 [1 1 1]]
[[7 7 7]
 [7 7 7]]
[[1. 0. 0.]
 [0. 1. 0.]
 [0. 0. 1.]]
```

### `arange()` and `linspace()`

```python
print(np.arange(0, 10, 2))      # [0 2 4 6 8]      — step of 2
print(np.linspace(0, 1, 5))     # [0. 0.25 0.5 0.75 1.] — 5 evenly spaced values
```

| Function                        | Meaning                                      |
| ------------------------------- | -------------------------------------------- |
| `np.arange(start, stop, step)`  | Like `range()` — you control the **step**    |
| `np.linspace(start, stop, num)` | You control the **count**; endpoint included |

### Creation reference

| Function                | Creates                                |
| ----------------------- | -------------------------------------- |
| `np.array(list)`        | Array from a list                      |
| `np.zeros(shape)`       | All zeros                              |
| `np.ones(shape)`        | All ones                               |
| `np.full(shape, value)` | All the same value                     |
| `np.eye(n)`             | Identity matrix                        |
| `np.arange(a, b, step)` | Range with a step                      |
| `np.linspace(a, b, n)`  | `n` evenly spaced values               |
| `np.empty(shape)`       | Uninitialised (fast, contains garbage) |

### Array attributes

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])

print(arr.shape)      # (2, 3)   rows, columns
print(arr.ndim)       # 2        number of dimensions
print(arr.size)       # 6        total elements
print(arr.dtype)      # int64    data type
print(arr.itemsize)   # 8        bytes per element
print(arr.nbytes)     # 48       total bytes
```

### Data types

```python
print(np.array([1, 2, 3], dtype=float))     # [1. 2. 3.]
print(np.array([1.7, 2.3], dtype=int))      # [1 2]  ← truncated, not rounded
print(np.array([1, 2, 3]).astype(str))      # ['1' '2' '3']
```

Common dtypes: `int32`, `int64`, `float32`, `float64`, `bool`, `str`.

---

## Array Indexing and Slicing

### 1D indexing

```python
a = np.array([10, 20, 30, 40, 50])

print(a[0])       # 10
print(a[-1])      # 50
print(a[1:4])     # [20 30 40]
print(a[:3])      # [10 20 30]
print(a[2:])      # [30 40 50]
print(a[::2])     # [10 30 50]   every 2nd
print(a[::-1])    # [50 40 30 20 10]  reversed
```

This is exactly like list slicing from Phase 2.

### 2D indexing

Use `array[row, column]`.

```python
m = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

print(m[0, 0])      # 1
print(m[1, 2])      # 6
print(m[2, -1])     # 9

print(m[0])         # [1 2 3]   entire first row
print(m[:, 1])      # [2 5 8]   entire second column
```

### 2D slicing

```python
print(m[0:2, 1:3])
```

Output:

```
[[2 3]
 [5 6]]
```

Reverse every row:

```python
print(m[:, ::-1])
```

Output:

```
[[3 2 1]
 [6 5 4]
 [9 8 7]]
```

| Syntax        | Meaning         |
| ------------- | --------------- |
| `m[0]`        | First row       |
| `m[:, 0]`     | First column    |
| `m[1, 2]`     | Single element  |
| `m[0:2, 1:3]` | Sub-matrix      |
| `m[:, ::-1]`  | Reverse columns |

### Boolean indexing — the most useful feature

Filter an array with a condition.

```python
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

print(arr[arr > 5])              # [ 6  7  8  9 10]
print(arr[arr % 2 == 0])         # [ 2  4  6  8 10]
print(arr[(arr > 3) & (arr < 8)])# [4 5 6 7]
print(arr[(arr < 3) | (arr > 8)])# [ 1  2  9 10]
```

> ⚠️ Use `&`, `|`, and `~` — **not** `and`, `or`, `not`. And always wrap each condition in parentheses, because `&` has higher precedence than `>`.

### `np.where()`

```python
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

print(np.where(arr > 5, "high", "low"))
print(np.where(arr > 5))
```

Output:

```
['low' 'low' 'low' 'low' 'low' 'high' 'high' 'high' 'high' 'high']
(array([5, 6, 7, 8, 9]),)
```

With three arguments it replaces values; with one it returns the **indices** where the condition is true.

### Fancy indexing

Pass a list of indices.

```python
a = np.array([10, 20, 30, 40, 50])

print(a[[0, 2, 4]])                      # [10 30 50]
print(a[[True, False, True, False, True]])  # [10 30 50]
```

### ⚠️ Slices are views, not copies

This surprises everyone coming from lists.

```python
orig = np.array([1, 2, 3, 4, 5])
s = orig[1:4]
s[0] = 999
print(orig)        # [  1 999   3   4   5]  ← the original changed!
```

Use `.copy()` to get an independent array:

```python
orig = np.array([1, 2, 3, 4, 5])
c = orig[1:4].copy()
c[0] = 999
print(orig)        # [1 2 3 4 5]  ← safe
```

Python lists copy on slice; NumPy arrays create a **view** for performance.

---

## Array Reshaping

`reshape()` changes the shape without changing the data. The total number of elements must stay the same.

```python
r = np.arange(12)
print(r)           # [ 0  1  2  3  4  5  6  7  8  9 10 11]

print(r.reshape(3, 4))
```

Output:

```
[[ 0  1  2  3]
 [ 4  5  6  7]
 [ 8  9 10 11]]
```

```python
print(r.reshape(2, 6))
```

Output:

```
[[ 0  1  2  3  4  5]
 [ 6  7  8  9 10 11]]
```

### Using `-1` to auto-calculate

```python
print(r.reshape(3, -1))      # NumPy works out that -1 means 4
```

Output:

```
[[ 0  1  2  3]
 [ 4  5  6  7]
 [ 8  9 10 11]]
```

You can only use `-1` once.

### Flattening

```python
m = np.arange(12).reshape(3, 4)

print(m.flatten())    # [ 0  1  2  3  4  5  6  7  8  9 10 11]  ← a copy
print(m.ravel())      # [ 0  1  2  3  4  5  6  7  8  9 10 11]  ← a view when possible
```

### Transpose

```python
m = np.arange(12).reshape(3, 4)
print(m.T)
```

Output:

```
[[ 0  4  8]
 [ 1  5  9]
 [ 2  6 10]
 [ 3  7 11]]
```

### Adding a dimension

```python
x = np.array([1, 2, 3])

print(x.reshape(-1, 1))         # turn a row into a column
print(x[:, np.newaxis].shape)   # (3, 1)
```

Output:

```
[[1]
 [2]
 [3]]
(3, 1)
```

### Joining and splitting

```python
p = np.array([1, 2, 3])
q = np.array([4, 5, 6])

print(np.concatenate([p, q]))    # [1 2 3 4 5 6]
print(np.hstack([p, q]))         # [1 2 3 4 5 6]   horizontal
print(np.vstack([p, q]))         # stacked as rows
print(np.split(np.arange(9), 3))
```

Output:

```
[1 2 3 4 5 6]
[1 2 3 4 5 6]
[[1 2 3]
 [4 5 6]]
[array([0, 1, 2]), array([3, 4, 5]), array([6, 7, 8])]
```

| Function        | Purpose            |
| --------------- | ------------------ |
| `reshape(r, c)` | Change shape       |
| `flatten()`     | To 1D (copy)       |
| `ravel()`       | To 1D (view)       |
| `.T`            | Transpose          |
| `concatenate()` | Join arrays        |
| `vstack()`      | Stack vertically   |
| `hstack()`      | Stack horizontally |
| `split()`       | Split into pieces  |

---

## Array Operations

### Element-wise arithmetic

Every operation applies to all elements at once — no loops.

```python
a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

print(a + b)      # [11 22 33 44]
print(a - b)      # [ -9 -18 -27 -36]
print(a * b)      # [ 10  40  90 160]
print(b / a)      # [10. 10. 10. 10.]
print(b // a)     # [10 10 10 10]
print(a ** 2)     # [ 1  4  9 16]
print(b % 3)      # [1 2 0 1]
```

### Aggregation functions

```python
arr = np.array([[1, 2, 3],
                [4, 5, 6]])

print(arr.sum())          # 21
print(arr.min())          # 1
print(arr.max())          # 6
print(arr.mean())         # 3.5
print(arr.std())          # 1.7078251276599332
print(arr.var())          # 2.9166666666666665
print(arr.argmin())       # 0    index of the minimum
print(arr.argmax())       # 5    index of the maximum
print(arr.cumsum())       # [ 1  3  6 10 15 21]
print(arr.prod())         # 720
```

### The `axis` parameter

This is the concept most beginners struggle with.

- `axis=0` → operate **down the columns** (collapse rows)
- `axis=1` → operate **across the rows** (collapse columns)

```python
arr = np.array([[1, 2, 3],
                [4, 5, 6]])

print(arr.sum())          # 21        everything
print(arr.sum(axis=0))    # [5 7 9]   column totals
print(arr.sum(axis=1))    # [ 6 15]   row totals
```

Think of `axis` as _the dimension that disappears_.

### Comparison and boolean aggregation

```python
x = np.array([1, 2, 3, 4, 5])

print(x > 3)            # [False False False  True  True]
print((x > 3).sum())    # 2      — True counts as 1
print((x > 3).any())    # True   — is at least one True?
print((x > 3).all())    # False  — are they all True?
```

Counting with `.sum()` on a boolean array is an extremely common trick.

---

## Broadcasting

**Broadcasting** lets NumPy do arithmetic on arrays of different shapes by automatically "stretching" the smaller one.

### Scalar broadcasting

```python
arr = np.array([1, 2, 3, 4])

print(arr * 2)      # [2 4 6 8]
print(arr + 10)     # [11 12 13 14]
```

The scalar is applied to every element — no loop, no copying.

### Row broadcasting

```python
m = np.array([[1, 2, 3],
              [4, 5, 6]])

print(m + np.array([10, 20, 30]))
```

Output:

```
[[11 22 33]
 [14 25 36]]
```

The 1D array `[10, 20, 30]` is added to **each row**.

### Column broadcasting

```python
col = np.array([[10], [20]])
print(m + col)
```

Output:

```
[[11 12 13]
 [24 25 26]]
```

### Creating a grid

```python
print(np.arange(3).reshape(3, 1) + np.arange(3))
```

Output:

```
[[0 1 2]
 [1 2 3]
 [2 3 4]]
```

A `(3,1)` and a `(3,)` combine into a `(3,3)` result.

### The broadcasting rules

Compare shapes from the **right**. Two dimensions are compatible when:

1. They are **equal**, or
2. One of them is **1**.

| Shape A  | Shape B  | Result   | Works? |
| -------- | -------- | -------- | ------ |
| `(3, 4)` | `(4,)`   | `(3, 4)` | ✅     |
| `(3, 4)` | `(3, 1)` | `(3, 4)` | ✅     |
| `(3, 1)` | `(1, 4)` | `(3, 4)` | ✅     |
| `(3, 4)` | `(3,)`   | —        | ❌     |

```python
np.array([[1, 2, 3], [4, 5, 6]]) + np.array([1, 2])
# ❌ ValueError: operands could not be broadcast together with shapes (2,3) (2,)
```

---

## Mathematical Functions

NumPy's **ufuncs** (universal functions) apply element-wise to whole arrays.

### Powers and roots

```python
v = np.array([1, 4, 9, 16, 25])

print(np.sqrt(v))            # [1. 2. 3. 4. 5.]
print(np.square([1, 2, 3]))  # [1 4 9]
```

### Exponential and logarithms

```python
print(np.round(np.exp([0, 1, 2]), 4))     # [1.     2.7183 7.3891]
print(np.round(np.log([1, np.e, 10]), 4)) # [0.     1.     2.3026]
print(np.log10([1, 10, 100]))             # [0. 1. 2.]
print(np.log2([1, 2, 8]))                 # [0. 1. 3.]
```

`np.log()` is the **natural** log (base e).

### Trigonometry

```python
ang = np.array([0, np.pi/6, np.pi/4, np.pi/2])

print(np.round(np.sin(ang), 4))   # [0.     0.5    0.7071 1.    ]
print(np.round(np.cos(ang), 4))   # [1.     0.866  0.7071 0.    ]
```

### Rounding

```python
print(np.abs([-1, -2, 3]))        # [1 2 3]
print(np.round([1.4, 1.5, 2.6]))  # [1. 2. 3.]
print(np.floor([1.7, -1.7]))      # [ 1. -2.]
print(np.ceil([1.2, -1.2]))       # [ 2. -1.]
```

### Constants

```python
print(np.round(np.pi, 2))     # 3.14
print(np.round(np.e, 4))      # 2.7183
print(np.inf, np.nan)
```

### Function reference

| Function                              | Purpose              |
| ------------------------------------- | -------------------- |
| `np.sqrt()`                           | Square root          |
| `np.square()`                         | Square               |
| `np.power(a, b)`                      | `a` to the power `b` |
| `np.exp()`                            | e^x                  |
| `np.log()`                            | Natural log          |
| `np.log10()` / `np.log2()`            | Base 10 / base 2 log |
| `np.sin()` / `np.cos()` / `np.tan()`  | Trigonometry         |
| `np.abs()`                            | Absolute value       |
| `np.round()`                          | Round to n decimals  |
| `np.floor()` / `np.ceil()`            | Round down / up      |
| `np.sum()` / `np.mean()` / `np.std()` | Statistics           |
| `np.median()` / `np.percentile()`     | More statistics      |
| `np.unique()`                         | Unique values        |
| `np.sort()`                           | Sorted copy          |

---

## Random Module

`np.random` generates random numbers for simulations, sampling, and test data.

### Setting a seed for reproducibility

```python
np.random.seed(42)
print(np.round(np.random.rand(3), 4))     # [0.3745 0.9507 0.732 ]
```

With the same seed you get the same "random" numbers every run. **Always set a seed** in tutorials, tests, and anything you need to reproduce.

### Uniform floats — `rand()`

```python
np.random.seed(42)
print(np.round(np.random.rand(3), 4))
print(np.round(np.random.rand(2, 3), 4))
```

Output:

```
[0.3745 0.9507 0.732 ]
[[0.5987 0.156  0.156 ]
 [0.0581 0.8662 0.6011]]
```

Values are between 0 and 1.

### Standard normal — `randn()`

```python
np.random.seed(42)
print(np.round(np.random.randn(5), 4))    # [ 0.4967 -0.1383  0.6477  1.523  -0.2342]
```

Mean 0, standard deviation 1. Values can be negative.

### Random integers — `randint()`

```python
np.random.seed(0)
print(np.random.randint(1, 100, 5))       # [45 48 65 68 68]
print(np.random.randint(1, 7, (2, 3)))    # a 2×3 grid of dice rolls
```

Output:

```
[45 48 65 68 68]
[[2 4 6]
 [3 5 1]]
```

The upper bound is **exclusive**.

### Sampling — `choice()`

```python
np.random.seed(1)
print(np.random.choice([1, 2, 3, 4, 5], 3))     # [4 5 1]
print(np.random.choice(['a', 'b', 'c'], 5))     # ['b' 'b' 'a' 'a' 'b']
```

### Shuffling

```python
np.random.seed(7)
a = np.arange(10)
np.random.shuffle(a)        # shuffles in place
print(a)                    # [8 5 0 2 1 9 7 3 6 4]

print(np.random.permutation(5))   # [3 1 0 4 2]  ← returns a new array
```

### Distributions

```python
np.random.seed(3)
print(np.round(np.random.normal(100, 15, 5), 2))    # mean 100, std 15
print(np.round(np.random.uniform(0, 10, 5), 4))     # between 0 and 10
```

Output:

```
[126.83 106.55 101.45  72.05  95.84]
[0.5147 4.4081 0.2988 4.5683 6.4914]
```

### The modern Generator API

NumPy now recommends `default_rng()` over the legacy functions.

```python
rng = np.random.default_rng(42)

print(rng.integers(1, 100, 5))         # [ 9 77 65 44 43]
print(np.round(rng.random(3), 4))      # [0.6974 0.0942 0.9756]
```

| Legacy                     | Modern                            |
| -------------------------- | --------------------------------- |
| `np.random.seed(42)`       | `rng = np.random.default_rng(42)` |
| `np.random.rand(3)`        | `rng.random(3)`                   |
| `np.random.randint(1, 10)` | `rng.integers(1, 10)`             |
| `np.random.choice(a)`      | `rng.choice(a)`                   |

Both work. You will see the legacy style in most tutorials and older code.

---

## Linear Algebra Basics

### Element-wise `*` vs matrix `@`

This is the single most important distinction.

```python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print(A * B)      # element-wise multiplication
print(A @ B)      # true matrix multiplication
```

Output:

```
[[ 5 12]
 [21 32]]
[[19 22]
 [43 50]]
```

`A @ B`, `np.dot(A, B)`, and `np.matmul(A, B)` all give the same matrix product.

### Vector operations

```python
u = np.array([1, 2, 3])
v = np.array([4, 5, 6])

print(np.dot(u, v))       # 32          dot product
print(np.cross(u, v))     # [-3  6 -3]  cross product
```

### Matrix properties

```python
A = np.array([[1, 2], [3, 4]])

print(A.T)                          # transpose
print(np.linalg.det(A))             # -2.0000000000000004
print(np.round(np.linalg.inv(A), 4))# inverse
print(np.trace(A))                  # 5   sum of the diagonal
print(np.linalg.matrix_rank(A))     # 2
```

Output:

```
[[1 3]
 [2 4]]
-2.0000000000000004
[[-2.   1. ]
 [ 1.5 -0.5]]
5
2
```

Notice `det(A)` is `-2.0000000000000004`, not exactly `-2`. That is normal **floating-point error** — never compare floats with `==`; use `np.isclose()`.

### Eigenvalues and eigenvectors

```python
w, vec = np.linalg.eig(A)
print(np.round(w, 4))       # [-0.3723  5.3723]
print(np.round(vec, 4))
```

Output:

```
[-0.3723  5.3723]
[[-0.8246 -0.416 ]
 [ 0.5658 -0.9094]]
```

### Solving a system of equations

Solve:

```
2x + 1y = 5
1x + 3y = 10
```

```python
C = np.array([[2, 1], [1, 3]])
d = np.array([5, 10])

print(np.linalg.solve(C, d))     # [1. 3.]
```

So `x = 1` and `y = 3`.

### Vector norm

```python
print(round(np.linalg.norm([3, 4]), 4))     # 5.0
```

The magnitude of the vector (Pythagoras: √(3² + 4²) = 5).

### Linear algebra reference

| Function                   | Purpose                      |
| -------------------------- | ---------------------------- |
| `A @ B`                    | Matrix multiplication        |
| `np.dot(a, b)`             | Dot product                  |
| `np.cross(a, b)`           | Cross product                |
| `A.T`                      | Transpose                    |
| `np.linalg.det(A)`         | Determinant                  |
| `np.linalg.inv(A)`         | Inverse                      |
| `np.linalg.solve(A, b)`    | Solve `Ax = b`               |
| `np.linalg.eig(A)`         | Eigenvalues and eigenvectors |
| `np.linalg.norm(v)`        | Vector magnitude             |
| `np.linalg.matrix_rank(A)` | Rank                         |
| `np.trace(A)`              | Sum of the diagonal          |
| `np.identity(n)`           | Identity matrix              |

---

## Common Mistakes

### 1. Using `and` / `or` with arrays

```python
arr = np.array([1, 2, 3, 4, 5])

print(arr[(arr > 2) and (arr < 5)])    # ❌ ValueError: truth value is ambiguous
print(arr[(arr > 2) & (arr < 5)])      # ✅ [3 4]
```

### 2. Forgetting parentheses in conditions

```python
print(arr[arr > 2 & arr < 5])      # ❌ wrong precedence
print(arr[(arr > 2) & (arr < 5)])  # ✅
```

### 3. Expecting a slice to be a copy

```python
s = arr[1:3]
s[0] = 999        # ❌ also changes arr
s = arr[1:3].copy()   # ✅ independent
```

### 4. Mixing up `axis=0` and `axis=1`

```python
arr.sum(axis=0)   # column totals (collapses rows)
arr.sum(axis=1)   # row totals (collapses columns)
```

### 5. Confusing `*` with `@`

```python
A * B     # element-wise
A @ B     # matrix product
```

### 6. Reshaping to an incompatible size

```python
np.arange(10).reshape(3, 4)    # ❌ ValueError: cannot reshape array of size 10 into shape (3,4)
```

### 7. Comparing floats with `==`

```python
print(0.1 + 0.2 == 0.3)                    # False
print(np.isclose(0.1 + 0.2, 0.3))          # True  ✅
```

### 8. Looping instead of vectorising

```python
# Slow
result = np.array([x ** 2 for x in arr])

# Fast
result = arr ** 2
```

---

## Quick Reference

| Task           | Code                                |
| -------------- | ----------------------------------- |
| Import         | `import numpy as np`                |
| From list      | `np.array([1, 2, 3])`               |
| Zeros / ones   | `np.zeros((2,3))`, `np.ones((2,3))` |
| Range          | `np.arange(0, 10, 2)`               |
| Evenly spaced  | `np.linspace(0, 1, 5)`              |
| Shape / size   | `arr.shape`, `arr.size`, `arr.ndim` |
| Reshape        | `arr.reshape(3, 4)`                 |
| Flatten        | `arr.flatten()`                     |
| Transpose      | `arr.T`                             |
| Slice 2D       | `arr[0:2, 1:3]`                     |
| Column         | `arr[:, 0]`                         |
| Filter         | `arr[arr > 5]`                      |
| Conditional    | `np.where(cond, a, b)`              |
| Copy           | `arr.copy()`                        |
| Sum by column  | `arr.sum(axis=0)`                   |
| Sum by row     | `arr.sum(axis=1)`                   |
| Mean / std     | `arr.mean()`, `arr.std()`           |
| Matrix product | `A @ B`                             |
| Inverse        | `np.linalg.inv(A)`                  |
| Solve `Ax=b`   | `np.linalg.solve(A, b)`             |
| Random seed    | `np.random.seed(42)`                |
| Random ints    | `np.random.randint(1, 100, 5)`      |
