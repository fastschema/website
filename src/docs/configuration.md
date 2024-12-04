# Configuration

Fastschema use environment variables for configuration. There are two ways to set the environment variables:

1. **Using system environment variables.**
   ::: code-group

   ```bash{2-4} [Docker]
   docker run \
     -e APP_KEY=S5BZycqw4ad8NLAjzmE7gMfCTHDJUGWu \
     -e APP_BASE_URL=https://myapp.ltd \
     -e APP_DASH_URL=https://myapp.ltd/dash \
     -u "$UID" \
     -p 8000:8000 \
     -v ./data:/fastschema/data \
     ghcr.io/fastschema/fastschema:latest
   ```

   ```bash{1-3} [Executable]
   APP_KEY=S5BZycqw4ad8NLAjzmE7gMfCTHDJUGWu \
   APP_BASE_URL=https://myapp.ltd \
   APP_DASH_URL=https://myapp.ltd/dash \
   ./fastschema start
   ```

2. **Using environment file `data/.env`.**
   ::: code-group

   ```ini{1-3} [data/.env]
   APP_KEY=S5BZycqw4ad8NLAjzmE7gMfCTHDJUGWu
   APP_BASE_URL=https://myapp.ltd
   APP_DASH_URL=https://myapp.ltd/dash
   ```

## Available variables

| Name                        | Type        | Default                    |                                                          Description |
| --------------------------- | :---------- | :------------------------- | -------------------------------------------------------------------: |
| APP_KEY (\*)                | String      | -                          |                                                      Application key |
| APP_PORT                    | Number      | 8000                       |                                                     Application port |
| APP_BASE_URL                | String      | http://localhost:8000      |                                      The Base URL of the application |
| APP_DASH_URL                | String      | http://localhost:8000/dash |                                  The Base URL of the admin dashboard |
| APP_API_BASE_NAME           | String      | api                        |                                                    The API namespace |
| DB_DRIVER                   | String      | sqlite                     |      Database driver. Available values:<br>`sqlite`, `mysql`, `pgx`. |
| DB_NAME                     | String      | -                          |                                                        Database name |
| DB_HOST                     | Number      | localhost                  |                                                        Database host |
| DB_PORT                     | Number      | -                          |                                                        Database port |
| DB_USER                     | String      | -                          |                                                        Database user |
| DB_PASS                     | String      | -                          |                                                    Database password |
| DB_DISABLE_FOREIGN_KEYS     | Boolean     | -                          |     Database disable foreign keys. Available values: `true`, `false` |
| AUTH                        | JSON string | -                          |                                          Auth provider configuration |
| STORAGE                     | JSON string | -                          |                                         Array of disk configurations |
| MAIL                        | JSON string | -                          |                   Mail configuration that implements `fs.MailConfig` |

<div class="tip custom-block" style="padding-top:8px;">
(*) Required
</div>

## APP_KEY

`APP_KEY` is a 32 characters random string used for encryption and hashing. It is required for the application to run.

`APP_KEY` must be consistent across application deployments. If it is changed, all existing JWT tokens will be invalidated.

For the first time you run FastSchema, the application will generate a random `APP_KEY` and store it in the `data/.env` file.


## AUTH

`AUTH` is a JSON string representing `fs.AuthConfig` object.

```go
type AuthConfig struct {
	EnabledProviders []string       `json:"enabled_providers"`
	Providers        map[string]Map `json:"providers"`
}
```

*The `local` provider is enabled by default.*

For example, to enable the `github` and `google` providers:

```json
{
  "enabled_providers": [
    "github",
    "google"
  ],
  "providers": {
    "local": {
      "activation_method": "email",
      "activation_url": "http://localhost:3001/activation",
      "recovery_url": "http://localhost:3001/recover"
    },
    "github": {
      "client_id": "github_client_id",
      "client_secret": "github_client_secret"
    },
    "google": {
      "client_id": "xxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
      "client_secret": "xxx"
    },
    "twitter": {
      "consumer_key": "twitter_consumer_key",
      "consumer_secret": "twitter_consumer_secret"
    }
  }
}
```

## STORAGE

`STORAGE` is a JSON string representing `fs.StorageConfig` object with disk configurations.

```go
type StorageConfig struct {
	DefaultDisk string        `json:"default_disk"`
	Disks       []*DiskConfig `json:"disks"`
}
```

```go
// github.com/fastschema/fastschema/fs/fs.go
type DiskConfig struct {
	Name            string        `json:"name"`
	Driver          string        `json:"driver"`
	Root            string        `json:"root"`
	BaseURL         string        `json:"base_url"`
	PublicPath      string        `json:"public_path"`
	Provider        string        `json:"provider"`
	Endpoint        string        `json:"endpoint"`
	Region          string        `json:"region"`
	Bucket          string        `json:"bucket"`
	AccessKeyID     string        `json:"access_key_id"`
	SecretAccessKey string        `json:"secret_access_key"`
	ACL             string        `json:"acl"`
	GetBaseURL      func() string `json:"-"`
}
```

If there is no disk configuration, the application will use the default disk configuration:

```json
[
  {
    "name": "public",
    "driver": "local",
    "root": "./public",
    "public_path": "/files",
    "base_url": "http://localhost:8000/files"
  }
]
```

## MAIL

`MAIL` is a JSON string representing `fs.MailConfig` object.

```go
type MailConfig struct {
	SenderName        string `json:"sender_name"`
	SenderMail        string `json:"sender_mail"`
	DefaultClientName string `json:"default_client"`
	Clients           []Map  `json:"clients"`
}
```

`Clients` is an array of `Map` objects. Each `Map` object represents a mail client configuration.

**Example:**

```json
{
  "sender_name": "FastSchema Accounts",
  "sender_mail": "accounts@fastschema.com",
  "default_client": "mailtrapsmtp",
  "clients": [
    {
      "name": "mailtrapsmtp",
      "driver": "smtp",
      "host": "sandbox.smtp.mailtrap.io",
      "port": 2525,
      "username": "username",
      "password": "password"
    }
  ]
}
```

## Minimum configuration

The minimum configuration required to run FastSchema is:

```ini
APP_KEY=S5BZycqw4ad8NLAjzmE7gMfCTHDJUGWu
```

If you want to use a difference database driver other than SQLite, you need to update the `.env` file accordingly.

```ini
APP_KEY=S5BZycqw4ad8NLAjzmE7gMfCTHDJUGWu
DB_DRIVER=mysql     // [!code ++]
DB_NAME=fastschema  // [!code ++]
DB_USER=root        // [!code ++]
DB_PASS=secret      // [!code ++]
```
