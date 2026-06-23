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
