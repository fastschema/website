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

## Social / OAuth Login

Social providers (GitHub, Google, ...) are configured under `AUTH` (`enabled_providers` + per-provider `client_id`/`client_secret`). The dashboard renders a button per enabled provider; the enabled set is exposed by `GET /api/auth/methods` (`{ "providers": [...], "otp": bool }`, names only, never secrets).

Flow (browser):

1. The browser navigates to `GET /api/auth/{provider}/login`. The server signs a short-lived `state` carrier, sets a matching state cookie (CSRF binding), and redirects to the provider.
2. After consent, the provider redirects to `GET /api/auth/{provider}/callback`. The server verifies the `state` (and the binding cookie), then resolves or creates the user.
3. **The token is not placed in a cookie by the server.** The callback mints a single-use one-time code and redirects the browser to the dashboard login route with the code in the URL fragment (`/dash/login#code=<one_time_code>`).
4. The dashboard reads the code and calls `auth().exchange(code)` (`POST /api/auth/exchange`), receiving the token over a direct request and persisting it through the SDK auth store. Where the token lives (cookie, localStorage, ...) is the SDK's concern, not the server's.

Because the token is delivered through the one-time code rather than a server-set cookie, the storage mechanism stays pluggable on the client. The state cookie set in step 1 is a transient CSRF binding (not the token); it is matched on the callback and lapses by its short TTL.

---

## CLI / Native-App Login (RFC 8252)

A command-line tool or native desktop app can sign a user in **without ever handling the user's password or seeing the JWT in the browser**. The user logs in through the normal dash browser page by **any enabled method** (local, social, or OTP), and the resulting credential is delivered to the app's local loopback listener via a single-use one-time code, following the OAuth 2.0 for Native Apps pattern ([RFC 8252](https://datatracker.ietf.org/doc/html/rfc8252)).

This feature is **opt-in and disabled by default**. Enable it with `AUTH_CLI_LOGIN_ENABLED=true`.

### Why a one-time code

The token is minted server-side and stashed behind a short-lived, single-use one-time code. Only the code travels through the browser redirect; the loopback listener then exchanges the code for the token over a direct server-to-server request. The token itself never appears in any browser URL, response, or cookie during this flow. A PKCE (S256) challenge binds the exchange to the process that started it, defeating code interception.

### Flow

1. The native app starts a loopback HTTP listener on `127.0.0.1` (any free port) and generates a PKCE `code_verifier`.
2. App -> `POST /api/auth/cli/initiate` with the loopback `redirect_uri`, an opaque `correlation` value, and `code_challenge = base64url(sha256(code_verifier))`. The server validates the redirect target and returns a signed `carrier` plus an `authorize_url` (`/dash/login?cli=<carrier>`).
3. The app opens `authorize_url` in the user's browser. The dash renders the enabled login methods and the user signs in by any of them.
4. On success the server mints the token, stores it under a one-time code, and `302`-redirects the browser to the loopback `redirect_uri?code=<one_time_code>&state=<correlation>`.
5. The loopback listener -> `POST /api/auth/exchange` with `{ code, code_verifier }`. The server verifies PKCE, atomically consumes the code (single use), and returns the JWT **exactly once**.

### Initiate

**Request:**
```http
POST /api/auth/cli/initiate HTTP/1.1
Content-Type: application/json

{
  "redirect_uri": "http://127.0.0.1:54321/callback",
  "correlation": "a-random-opaque-value",
  "code_challenge": "BASE64URL_SHA256_OF_VERIFIER"
}
```

`code_challenge` is required (PKCE S256): native-app loopback redirects are interceptable by other local processes, so every code is bound to a verifier only the initiating process holds.

**Response:**
```json
{
  "carrier": "<signed-opaque-carrier>",
  "authorize_url": "/dash/login?cli=<signed-opaque-carrier>"
}
```

### Exchange

**Request:**
```http
POST /api/auth/exchange HTTP/1.1
Content-Type: application/json

{
  "code": "<one_time_code>",
  "code_verifier": "<original_code_verifier>"
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

The code is single-use and short-lived (60 seconds); a second exchange, an expired code, or a mismatched `code_verifier` returns `401`.

### Redirect target rules

`redirect_uri` is strictly validated before any code is issued, so the endpoint can never be used as an open redirector:

- **Loopback hosts** (`127.0.0.1`, `::1`, `localhost`) are always allowed on **any port**, over `http` or `https`. This is the normal case for native apps.
- **Non-loopback hosts** are allowed **only** over `https` and **only** when listed in `AUTH_CLI_ALLOWED_REDIRECT_HOSTS` (exact host match, no wildcards).

### Configuration

| Variable | Default | Description |
|---|---|---|
| `AUTH_CLI_LOGIN_ENABLED` | `false` | Master switch for the feature. When `false`, all `cli` endpoints return `403`. |
| `AUTH_CLI_ALLOWED_REDIRECT_HOSTS` | _(empty)_ | Comma-separated allowlist of non-loopback https redirect hosts. |

Programmatically (Go framework):

```go
app, _ := fastschema.New(&fs.Config{
  AuthConfig: &fs.AuthConfig{
    CLILogin: &fs.CLILoginConfig{
      Enabled:              true,
      AllowedRedirectHosts: []string{"app.example.com"},
    },
  },
})
```

### Security notes

- Disabled by default; only loopback redirects are accepted unless you explicitly allowlist https hosts.
- One-time codes are single-use, short-lived (60s), and high-entropy; PKCE S256 (required) binds the exchange to the initiating process.
- An exchange attempt consumes the code even when the PKCE verifier is wrong (fail-closed: this prevents brute-forcing the verifier on a live code). If an exchange fails, restart the flow.
- The token never touches the browser in this flow - it is delivered only over the server-to-server exchange.
- The browser-mediated step is bound to the browser that started it (a per-session state cookie is matched on the provider callback), closing login CSRF / session fixation.
- The one-time code store is in-process (single instance). For a multi-node deployment behind a load balancer, the exchange must reach the same instance that minted the code; a shared store is a planned follow-up.

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
| `AUTH_CLI_LOGIN_ENABLED` | `false` | Enable CLI / native-app login (see [CLI / Native-App Login](#cli-native-app-login-rfc-8252)) |
| `AUTH_CLI_ALLOWED_REDIRECT_HOSTS` | _(empty)_ | Comma-separated allowlist of extra non-loopback https redirect hosts |

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
