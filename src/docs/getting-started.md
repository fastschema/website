# Getting Started

## Installation

This section provides instructions on how to install FastSchema as a Headless CMS.

If you are looking to use FastSchema as a Web Framework, you can follow the instructions in the [Web Framwork](/docs/web-framework) section.

### Method 1: Using Docker

1. **Pull the Docker Image**:

   ```bash
   docker pull ghcr.io/fastschema/fastschema:latest
   ```

2. **Run the Docker Container**:

   ```bash
   mkdir data
   docker run \
     -u "$UID" \
     -p 8000:8000 \
     -v ./data:/fastschema/data \
     ghcr.io/fastschema/fastschema:latest
   ```

::: details Example Output

```bash{2}
> Using app directory: /fastschema
> APP_KEY is not set. A new key is generated and saved to /fastschema/data/.env
> Using default sqlite db file: /fastschema/data/fastschema.db
> Serving files from disk [public:/files] at /fastschema/data/public
> Visit the following URL to setup the app: http://localhost:8000/dash/setup/?token=anpDXDBymatYLIITreQgGaVdhLanpDXD
```

:::

You can now process the setting up by visiting `http://localhost:8000?token={token}`.

_The setup token `{token}` is displayed in the terminal._

### Method 2: Download the Binary from GitHub Releases

1. **Download the Binary:**

   - Navigate to the FastSchema [GitHub Releases page](https://github.com/fastschema/fastschema/releases).

   - Select the latest release.

   - Download the appropriate binary for your operating system (e.g., Linux, macOS, Windows). For example: `fastschema_0.1.0_linux_amd64.zip`

2. **Extract the Binary:**

   ```bash
   unzip fastschema_0.1.0_linux_amd64.zip
   ```

3. **Run the Binary:**

   - Open a terminal or command prompt.

   - Navigate to the directory containing the downloaded binary.

   - Run the following command:

     ```bash
     ./fastschema start
     ```

### Method 3: Build from Source

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/fastschema/fastschema.git
   cd fastschema
   git submodule update --init --recursive
   ```

2. **Build the Dashboard:**

   ```bash
   cd pkg/dash
   yarn install && yarn build
   cd ../../ && mkdir -p private/tmp
   ```

   ::: warning
   You need to create an environment file `./pkg/dash/.env.production` for building the dashboard. Refer to `./pkg/dash/.env.example` for more information.
   :::

3. **Build and run the Binary:**

   ```bash
   go build -o fastschema cmd/main.go
   ./fastschema start
   ```

   or run the development server:

   ```bash
   make dev
   ```

## Setup

After you have installed FastSchema, you can access the setup page by visiting `http://localhost:8000?token={token}`.

The setup token is displayed in the terminal when you run FastSchema for the first time.

```bash{2}
Visit the following URL to setup the app:
http://localhost:8000/dash/setup/?token=anpDXDBymatYLIITreQgGaVdhLanpDXD
```

<img src="/static/images/fastschema-setup.png" alt="Fastschema setup" style="margin: auto" />

At the setup page, you will be asked to provide the following information:

- **Username**: The admin username.
- **Email**: The admin email.
- **Password**: The admin password.

After you have filled in the required information, click the **Setup** button to complete the setup process.

Congratulations! You have successfully installed FastSchema, you can now login and start creating your schemas and content.

## Configuration

Fastschema use environment variables for configuration. You can set the environment variables in `./data/.env` file or in the system environment.

By default, Fastschema uses SQLite as the database. You can change the database configuration by setting the following environment variables:

```ini
APP_KEY=a_32_characters_random_string
APP_PORT=8000
APP_BASE_URL=http://localhost:8000
APP_DASH_URL=http://localhost:8000/dash
APP_API_BASE_NAME=api
DB_DRIVER=mysql
DB_NAME=fastschema
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=123
STORAGE_DEFAULT_DISK=public
STORAGE_DISKS=[{"name":"public","driver":"local","root":"./public","public_path":"/files","base_url":"http://localhost:8000/files"},{"name":"my_s3","driver":"s3","root":"/files","provider":"DigitalOcean","endpoint":"sfo3.digitaloceanspaces.com","region":"sfo3","bucket":"my_bucket","access_key_id":"s3_access_key_id","secret_access_key":"s3_secret_access_key","base_url":"https://cdn.site.local"}]
```

For more information, refer to the [Configuration](/docs/configuration) documentation.
