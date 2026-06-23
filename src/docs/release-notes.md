# Release Notes

## v0.10.0 — June 2024

**Breaking Changes** — See [Migration Guide: v0.9.x → v0.10.0](/docs/migration-0.10) before upgrading.

### Major Features

#### UUID v7 Primary Keys (Default)
- New schemas default to UUID v7 primary keys (string) instead of integer auto-increment.
- Existing ID schemes still supported: `auto-increment-uint64`, `custom-string-pk`.
- All REST responses now return `id` as strings.
- **Requires fresh install** — no automatic data migration.

#### Refresh Token Support
- Optional long-lived session tokens via `AUTH_ENABLE_REFRESH_TOKEN`.
- Access token lifetime: **7 days** (default) or **15 minutes** (with refresh enabled).
- Refresh token lifetime: **7 days** (default).
- Enabled via environment: `AUTH_ENABLE_REFRESH_TOKEN=true`.

#### OTP Passwordless Authentication
- Email-based one-time-password (OTP) for passwordless login.
- Configurable OTP length, expiration, and max attempts.
- `/api/auth/otp/request` and `/api/auth/otp/verify` endpoints.
- Customizable email templates for activation and recovery.

#### Structured Error Codes
- Validation errors now use HTTP 422 with dotted error codes.
- Example: `field.type.invalid`, `schema.label_field.not_found`, `relation.target.not_found`.
- Programmatic error handling in Go and REST clients.
- Full reference: [Error Codes](/docs/error-codes).

### Breaking Changes

| Change | Impact | Migration |
|--------|--------|-----------|
| UUID Primary Keys | REST `id` fields are now strings | Update client code to handle string IDs |
| Auth Endpoints | `/api/user/login` → `/api/auth/local/login` | Update login calls to new endpoints |
| Error Model | HTTP 422 + dotted codes | Update error handling to parse structured responses |
| Refresh Tokens | New optional feature | Enable via `AUTH_ENABLE_REFRESH_TOKEN` env var |

### What's New

- **Go 1.24** support (upgraded from 1.18).
- Improved error reporting with context-aware messages.
- Email template customization for auth flows.
- System schema documentation updates.

### Bug Fixes

- Fixed token validation timing issues.
- Improved relation field handling in mutations.
- Enhanced schema validation error messages.

### Deprecated

- `/api/user/login` endpoint removed (use `/api/auth/local/login`).
- `/api/user/me` endpoint removed (use `/api/auth/me`).

### Documentation

- New [Migration Guide](/docs/migration-0.10) for v0.9.x → v0.10.0.
- New [Error Codes Reference](/docs/error-codes).
- Updated [Authentication](/docs/backend/authentication) docs.
- Updated [System Schema](/docs/framework/database/system-schema) docs.

### Downloads

- **Binary releases:** [GitHub Releases](https://github.com/fastschema/fastschema/releases/tag/v0.10.0)
- **Docker:** `ghcr.io/fastschema/fastschema:v0.10.0`
- **npm (SDK):** `fastschema@1.4.1`

---

## Previous Releases

For older releases, see [GitHub Releases](https://github.com/fastschema/fastschema/releases).
