# Storage

FastSchema provides a powerful filesystem abstraction thanks to the wonderful [rclone](https://rclone.org/) package.

The FastSchema rclone integration provides straightforward drivers for various storage systems, making it easy to implement and switch between them.

The [rclonefs](https://pkg.go.dev/github.com/fastschema/fastschema/pkg/rclonefs) package offers a filesystem abstraction that allows reading and writing files across different storage systems.

Supported storage systems include:

- Local filesystem
- S3 compatible storage

::: warning Help Wanted

The FastSchema filesystem is still in its early stages and lacks support for many storage systems.

If you're using an unsupported storage system, please consider contributing a driver for it or requesting support via  [GitHub issues](https://github.com/fastschema/fastschema/issues)

:::

## Disk interface

A `Disk` is a filesystem that can be used to read and write files to and from a specific storage system.

```go
type Disk interface {
	Name() string
	Root() string
	URL(filepath string) string
	Delete(c context.Context, filepath string) error
	Put(c context.Context, file *File) (*File, error)
	PutReader(c context.Context, in io.Reader, size uint64, mime, dst string) (*File, error)
	PutMultipart(c context.Context, m *multipart.FileHeader, dsts ...string) (*File, error)
	LocalPublicPath() string
}
```

## Disk Configuration

::: code-group

```go [StorageConfig]
type StorageConfig struct {
	DefaultDisk string        `json:"default_disk"`
	Disks       []*DiskConfig `json:"disks"`
}
```

```go [DiskConfig]
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
}
```

:::

A FastSchema application may have multiple disks, each with a unique name and configuration.

A default disk is used for general file storage, while additional disks can be configured for specific purposes.

**Defaukt disk configuration:**

```json
{
  "name": "public",
  "driver": "local",
  "root": "./public",
  "public_path": "/files",
  "base_url": "http://localhost:8000/files"
}
```

There are two methods for configuring disks:

- Using environment variables:
  - `STORAGE`: A string representing a JSON object with disk configurations.
- Using application configuration:
  - `app.Config.StorageConfig`: A `StorageConfig` object with disk configurations.

If there is no configuration for the default disk, the first disk in the configuration will be used as the default disk.

## Usage

### Creating a new disk
```go
disks, err = rclonefs.NewFromConfig(
  storageDisksConfig, // []*DiskConfig
  localRoot, // string representing the local root path
)
 ```

### Using a disk

A storage disk is accessed using the `app.Disk()` method.

```go
Disk(names ...string) Disk
```

_If no disk name is provided, the default disk will be used._

```go
// Get the default disk
disk := app.Disk()

// Get a specific disk
awsS3Disk := app.Disk("awss3")

// Get disk name
diskName := disk.Name()

// Get disk root
diskRoot := disk.Root()

// Get disk URL
diskURL := disk.URL("path/to/file")

// Put a file
file, err := disk.Put(c, &fs.File{
  Name: "file.txt",
  Path: "path/to/file.txt",
  Type: "text/plain",
  Size: 1024,
  Reader: strings.NewReader("Hello, World!"),
})
```
