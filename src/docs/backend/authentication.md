# Authentication

FastSchema uses JWT (JSON Web Token) for authentication. The server generates tokens upon login and returns them to the client. Clients must store and send tokens in every subsequent request.

## Public Resources

Every FastSchema resource is protected by authentication except:

- Resources marked as `public` (set in resource registration).
- Resources granted to the `guest` role (which has no permissions by default).

---

## Authentication Endpoints

### Local Authentication

#### Login (Username/Email + Password)

**Request:**
```http
POST /api/auth/local/login HTTP/1.1
Content-Type: application/json

{
  "login": "admin",
  "password": "your_password"
}
```

**Response (Success):**
```json
{
  "token": "<access_token_jwt>",
  "expires": "2024-07-01T20:21:10Z",
  "refresh_token": "<refresh_token>",
  "refresh_token_expires": "2024-07-08T20:21:10Z"
}
```

- `token`: JWT access token.
- `expires`: Access token expiration time.
- `refresh_token`: Present only if `AUTH_ENABLE_REFRESH_TOKEN=true`.
- `refresh_token_expires`: Present only if refresh tokens enabled.

#### Register

**Request:**
```http
POST /api/auth/local/register HTTP/1.1
Content-Type: application/json

{
  "login": "newuser",
  "email": "newuser@example.com",
  "password": "secure_password"
}
```

**Response (Success):**
```json
{
  "message": "Registration successful. Please activate your account."
}
```

User account requires activation (via email link) before login.

#### Activate Account

**Request:**
```http
POST /api/auth/local/activate HTTP/1.1
Content-Type: application/json

{
  "token": "<activation_token_from_email>"
}
```

**Response:**
```json
{
  "message": "Account activated successfully"
}
```

#### Send Activation Email

**Request:**
```http
POST /api/auth/local/activate/send HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Activation email sent"
}
```

#### Password Recovery Request

**Request:**
```http
POST /api/auth/local/recover HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Recovery email sent"
}
```

#### Check Recovery Token

**Request:**
```http
POST /api/auth/local/recover/check HTTP/1.1
Content-Type: application/json

{
  "token": "<recovery_token_from_email>"
}
```

**Response:**
```json
{
  "valid": true
}
```

#### Reset Password

**Request:**
```http
POST /api/auth/local/recover/reset HTTP/1.1
Content-Type: application/json

{
  "token": "<recovery_token_from_email>",
  "password": "new_password"
}
```

**Response:**
```json
{
  "message": "Password reset successfully"
}
```

#### Change Email

Starts an authenticated email change. The request re-authenticates the caller with the current password, validates the new address (format, [registration policy](#registration-policy), and uniqueness), and creates a single-use pending change. It then sends two emails: a notification to the **current** address and a confirmation link to the **new** address. The account email is **not** changed until the new address is confirmed.

Email change is only available for **local (password) accounts**.

**Request:**
```http
POST /api/auth/local/email/change HTTP/1.1
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "new_email": "new@example.com",
  "current_password": "your_current_password"
}
```

**Response:**
```json
{
  "message": "A confirmation link has been sent to your new email address"
}
```

#### Confirm Email Change

Confirms a pending email change using the single-use, time-limited (24 hours) token delivered to the new address. On success, the account email is committed to the new value.

**Request:**
```http
POST /api/auth/local/email/confirm HTTP/1.1
Content-Type: application/json

{
  "token": "<token_from_new_email>"
}
```

**Response:**
```json
{
  "message": "Your email address has been updated"
}
```

::: tip Confirmation link
The confirmation link base defaults to `<base_url>/auth/local/email/confirm`. To point it at a custom page (for example, a dashboard route that calls the confirm endpoint), set `email_change_url` in the local provider configuration.
:::

---

## Session Management

### Get Current User

**Request:**
```http
GET /api/auth/me HTTP/1.1
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "login": "admin",
  "email": "admin@example.com",
  "activated": true,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Refresh Access Token

**Request:**
```http
POST /api/auth/token/refresh HTTP/1.1
Content-Type: application/json

{
  "refresh_token": "<refresh_token>"
}
```

**Response:**
```json
{
  "token": "<new_access_token>",
  "expires": "2024-07-01T20:21:10Z",
  "refresh_token": "<new_refresh_token>",
  "refresh_token_expires": "2024-07-08T20:21:10Z"
}
```

Required: `AUTH_ENABLE_REFRESH_TOKEN=true`

### Logout

**Request:**
```http
POST /api/auth/logout HTTP/1.1
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

---

## Passwordless Authentication (OTP)

### Request OTP Code

**Request:**
```http
POST /api/auth/otp/request HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "OTP sent to email",
  "expires_in": 300
}
```

- `expires_in`: OTP expiration in seconds.

### Verify OTP Code

**Request:**
```http
POST /api/auth/otp/verify HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com",
  "code": "123456"
}
```

**Response (Success):**
```json
{
  "token": "<access_token>",
  "expires": "2024-07-01T20:21:10Z",
  "refresh_token": "<refresh_token>",
  "refresh_token_expires": "2024-07-08T20:21:10Z"
}
```

Required: `AUTH_OTP_ENABLED=true`

---

## Registration Policy

FastSchema can apply an opt-in, built-in validation policy to **self-service signups**. The policy runs on **both** local email/password registration and OAuth/social signup, just before the user row is created. It does **not** apply to admin-created users (content API). By default (no policy configured) nothing is blocked.

The policy supports:

| Field | Description |
|---|---|
| `allowed_email_domains` | Allowlist. When non-empty, only emails on these domains may register. |
| `blocked_email_domains` | Denylist of email domains to reject. |
| `reserved_usernames` | Usernames that may not be registered (e.g. `admin`, `root`, `system`). |
| `normalize_email` | Lowercases the email domain and converts IDN domains to punycode. |

### Configure via environment variables

Each variable is a comma-separated list. Setting **any** of them enables the policy with `normalize_email` turned on.

| Variable | Description |
|---|---|
| `AUTH_REG_ALLOWED_DOMAINS` | Allowed email domains (allowlist). |
| `AUTH_REG_BLOCKED_DOMAINS` | Blocked email domains (denylist). |
| `AUTH_REG_RESERVED_USERNAMES` | Reserved usernames. |

```bash
AUTH_REG_ALLOWED_DOMAINS=example.com,acme.io
AUTH_REG_RESERVED_USERNAMES=admin,root,system
```

### Configure programmatically

When embedding FastSchema as a Go framework, set the policy on `AuthConfig`:

```go
app, _ := fastschema.New(&fs.Config{
  AuthConfig: &fs.AuthConfig{
    Registration: &fs.RegistrationPolicy{
      AllowedEmailDomains: []string{"example.com"},
      ReservedUsernames:   []string{"admin", "root"},
      NormalizeEmail:      true,
    },
  },
})
```

The built-in policy runs as the **first** `OnPreUserRegister` hook, so any custom hooks you register run afterwards on the already-normalized input.

### Custom signup rules (`OnPreUserRegister`)

For anything beyond the basics above — invite-only gating, blocking disposable-email or free-webmail domains, custom username rules — register an `OnPreUserRegister` hook. The hook fires for both local and OAuth signups, may mutate `Email`/`Username` (for example, to normalize them), and returning an error rejects the registration.

```go
app.OnPreUserRegister(func(ctx context.Context, in *fs.RegistrationInput) error {
  // Block a disposable-email domain
  if strings.HasSuffix(strings.ToLower(in.Email), "@tempmail.example") {
    return errors.BadRequest("Disposable email addresses are not allowed")
  }
  return nil
})
```

`RegistrationInput` carries the signup data:

| Field | Type | Description |
|---|---|---|
| `Email` | `string` | Signup email (mutable). |
| `Username` | `string` | Signup username (mutable). |
| `Provider` | `string` | `local` or the OAuth provider name. |
| `ProviderID` | `string` | OAuth provider subject id (empty for local). |
| `Profile` | `map[string]any` | Raw provider profile (OAuth only). |
| `IsOAuth` | `bool` | `true` for social-login registration. |

See the [Hooks](/docs/framework/hooks/#onpreuserregister) reference for more detail, or [Plugin Configuration](/docs/plugins/configuration#add-hooks) to register the hook from a JS plugin.

---

## Token Usage

Clients must send the access token in every authenticated request. Two methods:

### Method 1: Authorization Header

```http
GET /api/content/users/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Authorization: Bearer <access_token>
```

### Method 2: Cookie

```http
GET /api/content/users/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Cookie: token=<access_token>
```

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `AUTH_ENABLE_REFRESH_TOKEN` | `false` | Enable refresh token support |
| `AUTH_REFRESH_TOKEN_LIFETIME` | `604800` | Refresh token lifetime in seconds (7 days) |
| `AUTH_ACCESS_TOKEN_LIFETIME` | `604800` | Access token lifetime in seconds (7 days) or 15 minutes when refresh enabled |
| `AUTH_OTP_ENABLED` | `false` | Enable OTP passwordless authentication |
| `AUTH_OTP_LENGTH` | `6` | OTP code length |
| `AUTH_OTP_EXPIRATION` | `300` | OTP expiration in seconds (5 minutes) |
| `AUTH_OTP_MAX_ATTEMPTS` | `3` | Max verification attempts before OTP expires |
| `AUTH_REG_ALLOWED_DOMAINS` | _(empty)_ | Comma-separated allowlist of email domains for signup (see [Registration Policy](#registration-policy)) |
| `AUTH_REG_BLOCKED_DOMAINS` | _(empty)_ | Comma-separated denylist of email domains for signup |
| `AUTH_REG_RESERVED_USERNAMES` | _(empty)_ | Comma-separated list of usernames that cannot be registered |

### Email Templates

Activation and recovery emails are customizable via the `fs.EmailTemplates` configuration. See [Configuration](/docs/configuration) for details.

---

## Error Handling

Authentication errors return structured error responses. See [Error Codes Reference](/docs/error-codes) for details.

Example error response:
```json
{
  "code": "401",
  "message": "Unauthorized",
  "data": {
    "error": "invalid_credentials"
  }
}
```

---

## Token Expiration

- Access tokens expire after the configured lifetime (default: 7 days).
- Refresh tokens expire after their configured lifetime (default: 7 days).
- The server returns `401 Unauthorized` if a token is expired.
- Use `/api/auth/token/refresh` to obtain a new access token (requires refresh token support enabled).

---

## Security Notes

- Store access tokens securely (in-memory or secure storage, never localStorage for sensitive data).
- Refresh tokens should be stored securely and sent only with `/api/auth/token/refresh` requests.
- Always use HTTPS in production.
- Implement CSRF protections for cookie-based token transmission.
- Change `APP_KEY` via environment to invalidate all active tokens (security measure).

---

## See Also

- [Migration Guide: v0.9.x → v0.10.0](/docs/migration-0.10)
- [Error Codes Reference](/docs/error-codes)
- [Configuration](/docs/configuration)
