# Deployment

FastSchema is a standalone application that can be deployed on any system supporting the target platform.

::: details **Supported architectures**:

- `darwin/amd64`
- `darwin/arm64`
- `linux/amd64`
- `linux/arm64`
- `linux/arm/v7`
- `windows/amd64`
- `windows/arm64`
  :::

FastSchema offers multiple deployment options, including running the application as a standalone binary or using Docker.

## Using Release Binaries

FastSchema is released in a binary format, which can be downloaded from the [releases page](https://github.com/fastschema/fastschema/releases).

::: tip Standalone and Dependency-Free Executable
The FastSchema binary is a standalone executable that can run on any system supporting the target platform.

It does not require any dependencies or a separate runtime environment.
:::

To run the binary, simply download it and execute it:

```bash
./fastschema start
```

## Using Docker

FastSchema provides a Docker image for running the application in a containerized environment.

The Docker image is available on the [GitHub Container Registry](https://ghcr.io/fastschema/fastschema).

To run FastSchema using Docker, pull the image and run it:

```bash
docker pull ghcr.io/fastschema/fastschema:latest
docker run \
  -p 8000:8000 \
  -v ./data:/fastschema/data \
  ghcr.io/fastschema/fastschema:latest
```

## Configuration

For more information on configuring FastSchema, refer to the [configuration](/docs/configuration) section.
