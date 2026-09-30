---
name: sec-hardening
description: Enforces application security (AppSec) standards and defensive coding. Prevents injection attacks, credential leaks, insecure deserialization, unsafe shell execution, and permissive access controls.
---

# Sec-Hardening: Application Security & Defensive Guardrails

Assume all input is untrusted and hostile until strictly validated and sanitized. Never trade security for convenience or short-term expediency.

---

## 1. Secrets & Sensitive Data Handling
- **Zero Hardcoded Secrets:** Never hardcode API keys, passwords, database credentials, JWT secrets, or private tokens in code, comments, or version control.
- **Environment Variables:** Load configuration exclusively through managed environment variables or secure secret stores, failing fast if mandatory keys are missing.
- **Log Sanitization:** Scrub sensitive parameters (passwords, tokens, PII, payment info) before logging payloads or stack traces.

---

## 2. Input Validation & Injection Defense
- **Parameterized Queries:** Use parameterized SQL queries, ORM bounds, or prepared statements exclusively. Never concatenate raw strings into SQL, NoSQL, or graph queries.
- **Shell Execution:** Avoid running raw shell commands (`shell=True`, `eval()`, `exec()`). If execution is unavoidable, pass arguments strictly as delimited arrays with hardened input whitelisting.
- **Path Traversal Guards:** Canonicalize and resolve all file paths before reading or writing (`os.path.realpath`, `pathlib.Path.resolve()`). Reject inputs containing `..` or leading slashes meant to escape base directories.

---

## 3. Web & API Security
- **CORS & Headers:** Configure restrictive CORS policies. Explicitly whitelist trusted origins instead of using wildcard `*` with credentials.
- **Authentication & RBAC:** Check authentication and role-based permissions on every individual endpoint handler, never relying solely on client-side state or hidden UI routes.
- **CSRF & SSRF:** Validate and restrict any server-side fetching of arbitrary URLs. Block requests targeting loopback addresses (`127.0.0.1`, `localhost`) and private RFC-1918 subnets (`10.0.0.0/8`, `192.168.0.0/16`).

---

## 4. Dependencies & Safe Parsing
- **Insecure Deserialization:** Strictly avoid unsafe deserializers (such as unconstrained `pickle.loads()` or YAML `yaml.load()` without `SafeLoader`). Use strict JSON or schema-validated formats like Pydantic/Zod.
- **Least Privilege:** Ensure file read/write operations and running processes request the minimum required system permissions.
