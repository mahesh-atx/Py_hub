
import builtins as _b, io as _io, contextlib as _ctx

def _out(func, *a, **k):
    """Capture what a function prints."""
    buf = _io.StringIO()
    with _ctx.redirect_stdout(buf):
        func(*a, **k)
    return "\n".join(l.rstrip() for l in buf.getvalue().rstrip("\n").split("\n"))

def _feed(values, func, *a, **k):
    """Run func with input() answering from `values`."""
    it = iter(values)
    real = _b.input
    _b.input = lambda prompt="": next(it)
    try:
        with _ctx.redirect_stdout(_io.StringIO()):
            return func(*a, **k)
    finally:
        _b.input = real

def _shortfall():
    try:
        withdraw(3200, 5000)
    except Exception as e:
        return getattr(e, "shortfall", None)

_state = {"n": 0}
def _flaky():
    _state["n"] += 1
    if _state["n"] < 3:
        raise ConnectionError("boom")
    return "ok"

def _flaky_ok():
    _state["n"] = 0
    with _ctx.redirect_stdout(_io.StringIO()):
        return retry(_flaky)

def _always_fails():
    def bad():
        raise ConnectionError("always")
    with _ctx.redirect_stdout(_io.StringIO()):
        return retry(bad, attempts=2)

def _cause_is_valueerror():
    try:
        parse_port("abc")
    except Exception as e:
        return isinstance(e.__cause__, ValueError)
    return False

def _w():
    with FileManager("ctx.txt", "w") as f:
        f.write("hello")
    with FileManager("ctx.txt", "r") as f:
        return f.read()

def _closed():
    m = FileManager("ctx.txt", "w")
    with m as f:
        f.write("x")
    return m.handle.closed

def _exit_runs_on_error():
    m = FileManager("ctx.txt", "w")
    try:
        with m as f:
            raise ValueError("boom")
    except ValueError:
        pass
    return m.handle.closed
