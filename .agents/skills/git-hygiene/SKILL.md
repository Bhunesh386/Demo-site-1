---
name: git-hygiene
description: Enforces clean version control habits, atomic commits, conventional commit syntax, clean branch management, and strict repository hygiene. Prevents dirty diffs and accidental check-ins of unwanted files.
---

# Git-Hygiene: Version Control Discipline & Clean Diffs

Keep version history clean, linear, and easy to review. Every commit must represent a single logical change with a precise, descriptive message.

---

## 1. Conventional Commits Standard
Commit messages must strictly follow the Conventional Commits format:

```text
<type>(<scope>): <short imperative summary>

[optional detailed body explaining *why*, not *what*]
[optional footer / issue references]

