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

| Name                 | Type        | Default                    |                                                     Description |
| -------------------- | :---------- | :------------------------- | --------------------------------------------------------------: |
| APP_KEY (\*)         | String      | -                          |                                                 Application key |
| APP_PORT             | Number      | 8000                       |                                                Application port |
| APP_BASE_URL         | String      | http://localhost:8000      |                                 The Base URL of the application |
| APP_DASH_URL         | String      | http://localhost:8000/dash |                             The Base URL of the admin dashboard |
| APP_API_BASE_NAME    | String      | api                        |                                               The API namespace |
| DB_DRIVER            | String      | sqlite                     | Database driver. Available values:<br>`sqlite`, `mysql`, `pgx`. |
| DB_NAME              | String      | -                          |                                                   Database name |
| DB_HOST              | Number      | localhost                  |                                                   Database host |
| DB_PORT              | Number      | -                          |                                                   Database port |
| DB_USER              | String      | -                          |                                                   Database user |
| DB_PASS              | String      | -                          |                                               Database password |
| STORAGE_DEFAULT_DISK | String      | public                     |                                               Default disk name |
| STORAGE_DISKS        | JSON string | -                          |                                    Array of disk configurations |

<div class="tip custom-block" style="padding-top:8px;">
(*) Required
</div>

## APP_KEY

`APP_KEY` is a 32 characters random string used for encryption and hashing. It is required for the application to run.

`APP_KEY` must be consistent across application deployments. If it is changed, all existing JWT tokens will be invalidated.

For the first time you run FastSchema, the application will generate a random `APP_KEY` and store it in the `data/.env` file.

## STORAGE_DISKS

`STORAGE_DISKS` is a JSON string representing an array of disk configurations. Each disk configuration is described by the following Go struct:

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

## STORAGE_DEFAULT_DISK

`STORAGE_DEFAULT_DISK` is the default disk name used for file storage. It must match one of the disk configurations in `STORAGE_DISKS`.

If `STORAGE_DEFAULT_DISK` is not set, the application will use the first disk configuration in `STORAGE_DISKS` as the default disk.

The default disk is used to store files uploaded by users and to serve uploaded files. If you are using FastSchema as a Web Framework, you can change change the storage destination by specifying the disk name.

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
