# Application

The FastSchema Application is an instance of the FastSchema Web Framework that you can use to create and run web applications.

The Application provides a number of methods and properties that allow you to configure and customize the behavior of your web application.

## Creating Application

```go
app, err := fastschema.New(&fs.Config{})

if err != nil {
  log.Fatal(err)
}

app.AddResource(fs.Get("/", func(c fs.Context, _ any) (string, error) {
  return "Hello World", nil
}))

app.Start()
```

The above code creates a new instance of the FastSchema Application using default configuration options and starts the application.

The default FastSchema Application includes all the features and functionality of a full BaaS, including real-time data syncing, automatic database generation, ready-to-use RESTful APIs, and an intuitive Admin Panel for effortless content management.

## Configuration

You can customize the behavior of the FastSchema Application by providing a configuration object when creating a new instance of the Application.

```go
app, err := fastschema.New(&fs.Config{
  Port:               "8001",
  BaseURL:            "http://localhost:8001",
  HideResourcesInfo:  true,
})
```

The `fs.Config` struct allows you to configure the following options:

```go
type Config struct {
	Dir               string
	AppKey            string
	Port              string
	BaseURL           string
	DashURL           string
	APIBaseName       string
	DashBaseName      string
	Logger            logger.Logger
	DB                db.Client
	StorageConfig     *StorageConfig
	HideResourcesInfo bool
	SystemSchemas     []any // types to build the system schemas
}
```

### Dir

The `Dir` option allows you to specify the directory where the FastSchema Application should use to store files and data.

If you do not specify a directory, the FastSchema Application will use the current working directory.

### AppKey

The `AppKey` option allows you to specify a unique key for your FastSchema Application. This key is used to encrypt and decrypt sensitive data in the FastSchema Application.

If you do not specify an `AppKey`, the FastSchema Application will use the environment variable `APP_KEY`.

If the `APP_KEY` environment variable is not set, the FastSchema Application will generate a random key and store it in the `data/.env` file.

### Port

The `Port` option allows you to specify the port number that the FastSchema Application should use to listen for incoming requests.

The default port is `8000`.

### BaseURL

The default `BaseURL` is `http://localhost:<port>`, this is useful when you are running the FastSchema Application locally.

When you deploy the FastSchema Application to a production environment, you should set the `BaseURL` to the URL of your production server.

### DashURL

The `DashURL` option allows you to specify the URL where the FastSchema Admin Panel should be accessible.

The default `DashURL` is `http://localhost:<port>/admin`.

### APIBaseName

By default, all the API routes are prefixed with `/api`, you can change this prefix by setting the `APIBaseName` option.

### DashBaseName

By default, all the Admin Panel routes are prefixed with `/admin`, you can change this prefix by setting the `DashBaseName` option.

::: warning

Changing the `APIBaseName` and `DashBaseName` affect the functionality of the FastSchema Admin Panel and the Admin frontend source code must be updated accordingly.

The `APIBaseName` and `DashBaseName` should not contain any special characters, spaces or slashes.
:::

### Logger

The `Logger` option allows you to specify a custom logger that the FastSchema Application should use to log messages.

If no logger is specified, the FastSchema Application will use the default logger which logs messages to the console and saves them to a log file `data/logs/app.log`.

For more information on how to create a custom logger, see the [Logger](/docs/web-framework/logging/) documentation.

### DB

The `DB` option allows you to specify a custom database client that the FastSchema Application should use to connect to the database.

If no database client is specified, the FastSchema Application will use the default database client.

The default DB client will also looking for the configuration from the environment variables. If there is no environment variable set, it will use a SQLite database.

For more information on how to create a custom database client, see the [Database](/docs/web-framework/database/) documentation.

### StorageConfig

The `StorageConfig` option allows you to specify the configuration for the storage system that the FastSchema Application should use to store files and data.

If no storage configuration is specified, the FastSchema Application will use a local storage system as its default storage system.

For more information on how to create a custom storage system, see the [Storage](/docs/web-framework/storage/) documentation.

### HideResourcesInfo

The `HideResourcesInfo` option allows you to disable printing the resources information in the console when the FastSchema Application starts.

### SystemSchemas

The `SystemSchemas` option allows you to specify the types that the FastSchema Application should use to build the system schemas.

This accepts a list of any types that you want to use to build the system schemas.

For more information on how to create system schema types, see the [System Schema](/docs/web-framework/database/system-schema) documentation.

## Methods

The FastSchema Application provides a number of methods that allow you to interact with the application and customize its behavior.

It implements the `fs.App` interface which includes the following methods:

```go
type App interface {
	Key() string
	SchemaBuilder() *schema.Builder
	DB() db.Client
	Resources() *ResourcesManager
	Reload(ctx context.Context, migration *db.Migration) (err error)
	Logger() logger.Logger
	UpdateCache(ctx context.Context) error
	Roles() []*Role
	Disk(names ...string) Disk
	Disks() []Disk

	AddResource(resource *Resource)
	AddMiddlewares(hooks ...Middleware)
	Hooks() *Hooks
	OnPreResolve(hooks ...Middleware)
	OnPostResolve(hooks ...Middleware)
	OnPostDBGet(db.PostDBGet)
}
```

### AddResource

The `AddResource` method allows you to add a new resource to the FastSchema Application.

```go
app.AddResource(fs.Get("/", func(c fs.Context, _ any) (string, error) {
  return "Hello World", nil
}))
```

### AddMiddlewares

The `AddMiddlewares` method allows you to add one or more middleware functions to the FastSchema Application.

```go
app.AddMiddlewares(func(c Context) error {
  return nil
})
```

### OnPreResolve, OnPostResolve, OnPostDBGet

These methods allow you to add hooks to the FastSchema Application.

For more information on how to use hooks, see the [Hooks](/docs/web-framework/hooks/) documentation.
