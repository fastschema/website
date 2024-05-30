---
prev:
  text: "Resource Resolver"
  link: "/docs/web-framework/resource/resolver"
next:
  text: "System Schema"
  link: "/docs/web-framework/database/system-schema"
---

# Database

FastSchema provides a built-in database package `db` allows you to interact with a database using a simple and intuitive API.

[entdbadapter](https://pkg.go.dev/github.com/fastschema/fastschema/pkg/entdbadapter) is a package that implements the `db.Client` interface and is built on top of the [Ent](https://entgo.io) ORM, which provides a powerful and flexible way to interact with databases.

If you want to use a different ORM or database package, you can implement the `db.Client` interface for your package and use it with FastSchema.


## DB Client interface

```go
type Client interface {
  Dialect() string
  Exec(c context.Context, query string, args any) (sql.Result, error)
  Query(c context.Context, query string, args any) ([]*schema.Entity, error)
  Rollback() error
  Commit() error
  CreateDBModel(s *schema.Schema, rs ...*schema.Relation) Model
  Tx(c context.Context) (Client, error)
  IsTx() bool
  Model(name string, types ...any) (Model, error)
  Close() error
  SchemaBuilder() *schema.Builder
  Reload(c context.Context, sb *schema.Builder, m *Migration)(Client, error)
  DB() *sql.DB
  Config() *Config
  Hooks() *Hooks
}
```



## Configuration

::: code-group

```go [github.com/fastschema/fastschema/db]
type Config struct {
	Driver          string
	Name            string
	Host            string
	Port            string
	User            string
	Pass            string
	Logger          logger.Logger
	LogQueries      bool
	MigrationDir    string
	IgnoreMigration bool
	Hooks           func() *Hooks
}
```

:::

- `Driver`: The database driver to use. Supported drivers are `mysql`, `pgx`, and `sqlite`.
- `Name`: The name of the database.
- `Host`: The database host.
- `Port`: The database port.
- `User`: The database user.
- `Pass`: The database password.
- `Logger`: The logger to use for logging database queries.
- `LogQueries`: Whether to log database queries.
- `MigrationDir`: The directory where migration files are stored.
- `IgnoreMigration`: Whether to ignore migration files.
- `Hooks`: A function that returns db hooks.

::: danger IMPORTANT
The `MigrationDir` is required, so you must provide a valid directory path.
:::

## Schema Builder

Schema Builder is an instance of `schema.Builder` and is an important part of FastSchema.

Its primary responsibility is to parse user-generated schemas (created through the Admin UI) and convert them into database schemas.

Moreover, for convenience, the Schema Builder can generate a database schema from any Go struct.

```go
func NewBuilderFromDir(
  dir string,
  systemSchemaTypes ...any,
) (*Builder, error)
```

- `dir`: The directory where the schema JSON files are stored.
- `systemSchemaTypes`: The system schema types.

**Example:**

```go
type Blog struct {
  Name string `json:"name"`
  Description string `json:"description"`
}

type Category struct {
  Name string `json:"name"`
  Description string `json:"description"`
}

schemaDir := "data/schemas"
builder, err := schema.NewBuilderFromDir(schemaDir, Blog{}, Category{})
```

## Database Client

The database client is an instance of `db.Client` and is used to interact with the database.

There are two methods to create a new database client:

### Create Database client directly from the `entdbadapter` package

To create a new database client, you need to pass the database configuration and the schema builder.

**Example:**

```go{18}
schemaDir := "data/schemas"
migrationDir := "data/migrations"
builder, err := schema.NewBuilderFromDir(schemaDir, Blog{}, Tag{})
if err != nil {
  log.Fatal(err)
}

config := &db.Config{
  Driver:       "mysql",
  Name:         "fastschema2",
  Host:         "localhost",
  Port:         "3306",
  User:         "root",
  Pass:         "123",
  MigrationDir: migrationDir,
}

client, err := entdbadapter.NewClient(config, builder)
if err != nil {
  log.Fatal(err)
}
```

### Create Database client using the `fastschema` application

When creating a new `fastschema` application, a database client is automatically created and added to the application.

The database client is accessible through the `app.DB()` method.

**Example:**

```go{3-11,18}
app, err := fastschema.New(&fs.Config{
  SystemSchemas: []any{Tag{}, Blog{}},
  DBConfig: &db.Config{
    Driver:       "mysql",
    Name:         "fastschema",
    Host:         "localhost",
    Port:         "3306",
    User:         "root",
    Pass:         "123",
    MigrationDir: migrationDir,
  },
})

if err != nil {
  log.Fatal(err)
}

client := app.DB()
```

`DBConfig` can be omitted if you have the following environment variables set:

- `DB_DRIVER`
- `DB_NAME`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASS`
- `DB_LOGGING`
