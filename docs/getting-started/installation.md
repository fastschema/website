---
sidebar_position: 1
---

# Installation

FastSchema, a Headless CMS written in Go, offers three straightforward methods for installation: using docker, downloading the pre-built binary from the GitHub Releases page and running it, or building and running it from the source code.

## Method 1: Using Docker

### 1. Pull the Docker Image:

```bash
docker pull ghcr.io/fastschema/fastschema:latest
```

### 2. Run the Docker Container:

```bash
docker run \
  -p 8000:8000 \
  -v ./data:/fastschema/data \
  ghcr.io/fastschema/fastschema:latest
```

**Example output:**

```
> APP_KEY is not set. A new key is generated and saved to /fastschema/data/.env
> Using the default sqlite db file path: /fastschema/data/fastschema.db
> Visit the following URL to setup the app: http://localhost:8000/dash/setup/?token=lUDRgoTUUNDsjCcitgGFTqwMZQPmYvlU
```

Now you can access to the FastSchema setup page by visiting [http://localhost:8000/setup?token=\{token\}](http://localhost:8000?token=\{token\}) (The setup token is displayed in the terminal).

## Method 2: Download the Binary from GitHub Releases

### 1. Download the Binary:

- Navigate to the FastSchema [GitHub Releases page](https://github.com/fastschema/fastschema/releases).
- Select the latest release.
- Download the appropriate binary for your operating system (e.g., Linux, macOS, Windows). For example: fastschema_0.0.4_linux_amd64.zip

### 2. Extract the Binary:

```bash
unzip fastschema_0.0.4_linux_amd64.zip
```

### 3. Run the Binary:

- Open a terminal or command prompt.
- Navigate to the directory containing the downloaded binary.
- Run the following command:
  ```bash
  ./fastschema start
  ```


## Method 3: Build from Source

### 1. Clone the Repository:

```bash
git clone https://github.com/fastschema/fastschema.git
cd fastschema
git submodule update --init --recursive
```

You will alose need to create an environment file `./pkg/dash/.env.production` for the dashboard. Please look at the example file `./pkg/dash/.env.example` for reference.

### 2. Build the Dashboard:

```bash
cd pkg/dash
yarn install && yarn build
cd ../../ && mkdir -p private/tmp
```

### 3. Build the Binary:

```bash
go build -o fastschema default/main.go
```

or run the development server:

```bash
make dev
```


## Configuration

Fastschema use environment variables for configuration. You can set the environment variables in a `.env` file in the root directory of the project.

```
APP_PORT=8000
APP_DASH_URL=http://localhost:8000/dash
APP_API_BASE_NAME=api
APP_KEY=a_random_key
DB_DRIVER=mysql
DB_NAME=fastschema
DB_HOST=127.0.0.4
DB_PORT=3306
DB_USER=root
DB_PASS=123
STORAGE_DEFAULT_DISK=local
STORAGE_DISKS=[{"name":"local","driver":"local","root":"/public/files","base_url":"http://localhost:8000/files"},{"name":"my_s3","driver":"s3","root":"/files","provider":"DigitalOcean","endpoint":"sfo3.digitaloceanspaces.com","region":"sfo3","bucket":"my_bucket","access_key_id":"s3_access_key_id","secret_access_key":"s3_secret_access_key","base_url":"https://cdn.site.local"}]
```
