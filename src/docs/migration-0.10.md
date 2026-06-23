# Migration Guide: v0.9.x → v0.10.0

**⚠️ BREAKING CHANGES — Fresh Install Only**

v0.10.0 introduces breaking changes that are **incompatible with existing v0.9.x databases**. There is **no automatic migration path** for existing data. You must:

1. Back up your existing database.
2. Perform a fresh install of v0.10.0.
3. Manually migrate data if required.

---

## Breaking Changes

### BC-1: UUID Primary Keys (ID Format)

**Change:** The default primary key is now **UUID v7** (string), not integer.

**What changed:**
- New schemas default to `id: UUID` (auto-generated UUIDv7 string).
- All REST API responses return `"id": "550e8400-e29b-41d4-a716-446655440000"` (string).
- Go SDK/Framework receives `id` as a `string`, not `int` or `uint64`.

**Customize if needed:**
- Override with `auto-increment-uint64` for integer IDs.
- Use `custom-string-pk` for custom string primary keys.
- See [System Schema](/docs/framework/database/system-schema) for details.

**REST Example:**

Before (v0.9.x):
```json
{
  "id": 1,
  "name": "John"
}
```

After (v0.10.0):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John"
}
```

### BC-2: Error Response Model (HTTP 422)

**Change:** Validation errors now use **HTTP 422** with structured error codes.

**Before (v0.9.x):**
```json
{
  "code": "400",
  "message": "Invalid field type",
  "data": null
}
```

**After (v0.10.0):**
```json
{
  "code": "422",
  "message": "schema validation failed",
  "data": {
    "schema": "post",
    "field_errors": [
      {
        "code": "field.type.invalid",
        "field": "status",
        "message": "field type 'invalid_type' is not recognized"
      }
    ]
  }
}
```

Errors now include **dotted error codes** (e.g., `field.type.invalid`, `schema.label_field.not_found`) for programmatic handling.

See [Error Codes Reference](/docs/error-codes) for the complete list.

### BC-3: Authentication Endpoint Changes

**Change:** Login and auth endpoints moved from `/api/user/*` to `/api/auth/*`.

**Endpoints changed:**

| Old (v0.9.x) | New (v0.10.0) |
|---|---|
| `POST /api/user/login` | `POST /api/auth/local/login` |
| `GET /api/user/me` | `GET /api/auth/me` |
| — | `POST /api/auth/logout` |
| — | `POST /api/auth/token/refresh` |
| — | `POST /api/auth/otp/request` (passwordless) |
| — | `POST /api/auth/otp/verify` |

**Login Response - Refresh Token Support:**

Refresh tokens are **opt-in** via `AUTH_ENABLE_REFRESH_TOKEN` env var. Default: **disabled**.

```json
{
  "token": "<access_token>",
  "expires": "2024-06-24T20:21:10Z",
  "refresh_token": "<refresh_token>",
  "refresh_token_expires": "2024-07-01T20:21:10Z"
}
```

- Access token lifetime: **7 days** (default) or **15 minutes** (when refresh enabled).
- Refresh token lifetime: **7 days** (default).
- `refresh_token` and `refresh_token_expires` fields omitted if refresh is disabled.

### BC-4: Refresh Token Environment (New)

**New environment variables:**

```bash
AUTH_ENABLE_REFRESH_TOKEN=true
AUTH_REFRESH_TOKEN_LIFETIME=604800  # 7 days in seconds
```

Default behavior (both unset): Refresh tokens **disabled**.

### BC-5: OTP Passwordless Authentication (New)

**Feature:** Email-based one-time-password (OTP) authentication for passwordless login.

**Environment:**
```bash
AUTH_OTP_ENABLED=true
AUTH_OTP_LENGTH=6
AUTH_OTP_EXPIRATION=300  # seconds
AUTH_OTP_MAX_ATTEMPTS=3
```

**Flow:**
1. User requests OTP: `POST /api/auth/otp/request { "email": "user@example.com" }`
2. Server sends email with OTP code.
3. User verifies: `POST /api/auth/otp/verify { "email": "user@example.com", "code": "123456" }`
4. Response includes `token` and optional `refresh_token` (same format as login).

**Email Templates:** Activation and recovery emails are now customizable via `fs.EmailTemplates` configuration. See [Configuration](/docs/configuration) for details.

---

## Migration Checklist

- [ ] Back up existing v0.9.x database.
- [ ] Update client code to expect UUID strings instead of integers for `id` fields.
- [ ] Update login endpoint calls to `/api/auth/local/login`.
- [ ] Update token refresh logic to use `/api/auth/token/refresh` if using refresh tokens.
- [ ] Add error handling for HTTP 422 with dotted error codes.
- [ ] Test OTP flow if using passwordless auth.
- [ ] Review [Error Codes Reference](/docs/error-codes) for application-specific error handling.

---

## What's New

- **UUID v7 Primary Keys:** Distributed ID generation, better sortability.
- **Refresh Tokens:** Optional token refresh for long-lived sessions.
- **OTP Passwordless Auth:** Email-based authentication without passwords.
- **Structured Error Codes:** Machine-readable error identification.
- **Email Template Customization:** Branded activation and recovery emails.

---

## Further Reading

- [Error Codes Reference](/docs/error-codes)
- [System Schema (Primary Keys)](/docs/framework/database/system-schema)
- [Authentication](/docs/backend/authentication)
- [Configuration](/docs/configuration)
