---
name: test-first
description: Enforces test-driven development (TDD) discipline. Mandates writing minimal failing tests or assertions before implementing logic, covers edge cases, and strictly forbids deleting or weakening tests to pass builds.
---

# Test-First: Test-Driven Development & Validation

Write the verification before the implementation. Reliable software is defined by its boundaries, expectations, and failure modes before any production logic is introduced.

---

## 1. The Red-Green-Refactor Cycle
Whenever adding a new feature, fixing a bug, or changing behavior:
1. **Red (Write the failing test first):**
   - Write a minimal test defining the expected input/output or behavior.
   - Run or trace the test to confirm it fails for the correct reason (missing logic, not syntax or import errors).
2. **Green (Minimal code to pass):**
   - Implement the smallest amount of code required to make the test pass.
   - Do not write speculative extra logic that is not tested.
3. **Refactor (Clean up under safety):**
   - Clean up code structure, naming, and performance while ensuring all tests stay green.

---

## 2. Bug Fix Protocol
- **Reproduce First:** Never touch production code to fix a reported bug without first writing a regression test that isolates and fails on that exact bug.
- **Root Cause Validation:** Ensure the test targets the underlying flaw, not just a symptom.
- **Pass & Guard:** Once fixed, the test remains in the suite permanently to prevent regressions.

---

## 3. Test Coverage Requirements
Every test suite or unit test must cover:
- **Happy Path:** The standard, expected valid input and successful execution.
- **Boundary & Limits:** Zero, null/None, empty collections, maximum values, off-by-one indices.
- **Failure Modes:** Malformed inputs, missing fields, expected thrown exceptions, or error status codes.
- **Deterministic Runs:** No tests depending on network state, unseeded randomness, or system time without mocking.

---

## 4. Uncompromising Rules (Anti-Patterns)
- **Never delete or relax a test:** If a test fails after your changes, investigate and fix the implementation. Never delete, comment out, or relax assertions just to make the test run green.
- **No pure mock theater:** Mock external boundaries (databases, HTTP APIs, disk I/O), but avoid mocking the internal business logic being tested.
- **Fast execution:** Keep unit tests lightweight and fast-running so they can run continuously during editing.
