# Security Protocols

- Do NOT expose API keys, secrets, tokens, or credentials in logs, outputs, or source code.
- Always store secrets in `.env` files or use environment variable managers.
- Use input validation (e.g., for forms, endpoints, CLI tools).
- Apply CORS headers, rate limiting, and authentication.
- Follow OWASP Top 10 principles.
- Use HTTPS. Never transmit sensitive data in plain text.
- Warn the user if a security misconfiguration is detected during build or deployment.
