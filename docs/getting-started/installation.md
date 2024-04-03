---
sidebar_position: 1
---

# Installation

FastSchema, a Headless CMS written in Go, offers two straightforward methods for installation: downloading the pre-built binary from the GitHub Releases page and running it, or building and running it from the source code.

## Method 1: Download the Binary from GitHub Releases

### 1. Download the Binary:

- Navigate to the FastSchema [GitHub Releases page](https://github.com/fastschema/fastschema/releases).
- Select the latest release.
- Download the appropriate binary for your operating system (e.g., Linux, macOS, Windows). Fo example: fastschema_0.0.1_linux_amd64.zip

### 2. Extract the Binary:

```bash
unzip fastschema_0.0.1_linux_amd64.zip
```

### 3. Run the Binary:

- Open a terminal or command prompt.
- Navigate to the directory containing the downloaded binary.
- Run the following command:
  ```bash
  ./fastschema start
  ```

Now you can access to the FastSchema setup page by visiting [http://localhost:3000/setup?token=\{token\}](http://localhost:3000?token=\{token\}) (The setup token is displayed in the terminal).

## Method 2: Build from Source

### 1. Clone the Repository:

```bash
git clone https://github.com/fastschema/fastschema.git
cd fastschema
```

### 2. Build the Binary:

```bash
go build -o fastschema default/main.go
```


## Configuration

Fastschema use environment variables for configuration. You can set the environment variables in a `.env` file in the root directory of the project.

```
APP_PORT=3000
APP_DASH_URL=http://localhost:3000/dash
APP_API_BASE_NAME=api
APP_KEY=a_random_key
DB_DRIVER=mysql
DB_NAME=fastschema
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=123
STORAGE_DEFAULT_DISK=local
STORAGE_DISKS=[{"name":"local","driver":"local","root":"/public/files","base_url":"http://localhost:3000/files"},{"name":"my_s3","driver":"s3","root":"/files","provider":"DigitalOcean","endpoint":"sfo3.digitaloceanspaces.com","region":"sfo3","bucket":"my_bucket","access_key_id":"s3_access_key_id","secret_access_key":"s3_secret_access_key","base_url":"https://cdn.site.local"}]
```
