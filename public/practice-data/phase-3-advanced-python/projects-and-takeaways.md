## 🧪 Practice Projects for Phase 3

> 🧠 **Want more reps before the projects?** [**60 Practice Questions**](questions.md) covers this phase in graded difficulty order, from a one-line warm-up to a multi-hour build.
>

After finishing all 4 modules, build these projects:

- [ ]  **Scientific Calculator** — functions for each operation, error handling for bad input
- [ ]  **Contact Book with File Storage** — save and load contacts from a JSON file
- [ ]  **Expense Tracker** — add expenses to a CSV, generate a monthly summary
- [ ]  **Student Report Card Generator** — read marks from a file, calculate grades, write a report
- [ ]  **Password Manager (basic)** — store and retrieve credentials from a file
- [ ]  **Custom Utility Package** — build your own `mytools` package with math and string modules
- [ ]  **Log File Analyser** — read a log file, count error types, print statistics
- [ ]  **Quiz App with Persistence** — questions from JSON, scores appended to a file
- [ ]  **File Organiser** — sort files in a folder into subfolders by extension using `os`
- [ ]  **Bank Account Simulator** — custom exceptions for insufficient funds and invalid amounts

---

## 📚 Key Takeaways for Phase 3

- **Functions** make code reusable. Use `return` to send values back, not `print()`.
- Understand the four argument types: positional, keyword, default, and `*args` / `**kwargs`.
- **Scope** follows the LEGB rule — Local, Enclosing, Global, Built-in. Avoid globals where you can.
- **Lambdas** are for short, throwaway logic; use `def` for anything with real logic.
- Never use a **mutable default argument** like `def f(x=[])` — use `None` instead.
- **Modules** are single `.py` files; **packages** are folders of modules with an `__init__.py`.
- Always guard script code with `if __name__ == "__main__":`.
- Use **virtual environments** for every project and save dependencies in `requirements.txt`.
- Always use `with open(...)` for files — it closes them automatically, even on error.
- Know the difference between `"w"` (erases) and `"a"` (appends). This mistake destroys data.
- Use `csv` and `json` modules instead of parsing text by hand.
- Catch **specific** exceptions, never a bare `except:` with `pass`.
- `else` runs when there is no error; `finally` runs no matter what.
- Write **custom exceptions** for your own project's error conditions.
- Python prefers **EAFP** (try it and handle failure) over **LBYL** (check first).

> 💡 **Tip:** Phase 3 is where you stop writing scripts and start writing *programs*. Take every small project from Phase 1 and 2, and rewrite it using functions, separate modules, file storage, and proper error handling. That refactoring exercise teaches more than any tutorial.
>
