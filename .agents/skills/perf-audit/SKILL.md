---
name: perf-audit
description: Analyzes computational complexity, memory allocation, and runtime bottlenecks. Enforces vectorization, caching, query optimization, and resource efficiency across algorithms and pipelines.
---

# Perf-Audit: Performance, Memory & Complexity Optimization

Write code that scales cleanly under load. Eliminate premature optimization, but never introduce avoidable $O(n^2)$ loops, memory leaks, unindexed queries, or blocking operations.

---

## 1. Complexity & Algorithmic Guardrails
- **Time Complexity:** Explicitly evaluate loop iterations. Avoid nested traversals where a hash map (`O(1)` lookups) or sorting (`O(n log n)`) reduces an $O(n^2)$ bottleneck.
- **Space & Memory Overhead:** 
  - Stream large datasets, file reads, or network payloads via iterators/generators instead of loading entire payloads into memory at once.
  - Delete or let go of references to large intermediate structures early to allow garbage collection.
- **Vectorization Over Iteration:** In numerical, ML, or data-intensive workflows (NumPy, PyTorch, Polars, Pandas), strictly avoid row-by-row iteration (`for` loops / `iterrows`). Use vectorized broadcast operations and tensor math.

---

## 2. I/O, Network & Database Discipline
- **N+1 Query Elimination:** Batch database requests and foreign-key fetches. Never issue individual select queries inside loop constructs.
- **Index Awareness:** Ensure filter columns, join keys, and sort attributes rely on indexed fields.
- **Non-blocking Execution:** Run network I/O, heavy file operations, and external API requests asynchronously or in background worker threads without blocking main event loops.

---

## 3. Frontend & UI Runtime
- **Render Minimization:** Prevent unnecessary component re-renders by stabilizing callbacks, memoizing expensive derived state, and structuring component trees cleanly.
- **DOM & Layout Throttling:** Debounce or throttle high-frequency events (scroll, resize, search input). Avoid layout thrashing caused by alternating DOM writes and style reads.
- **Bundle & Asset Impact:** Lazy-load non-critical routes and heavy dynamic libraries instead of bundling them into the initial payload.

---

## 4. Audit Checklist for Code Changes
Before approving any performance-critical section, verify:
- [ ] What is the worst-case runtime complexity ($O$ notation)?
- [ ] Is data copied unnecessarily in memory?
- [ ] Can calculations be cached or precomputed?
- [ ] Is there any unclosed stream, listener, or database connection pool leak?
