# Database Mutation

The package `db` provides a set of methods to perform mutation operations on the database.

## Mutation

The `Builder` function creates a new mutation builder for a specific schema.

```go
func Builder[T any](client Client, schemas ...string) *QueryBuilder[T]
```

A type parameter `T` is used to determine the schema and the type of the records returned by the query. `T` can be one of the following types:

- `SystemSchema`: A Go struct that was registered as a system schema.
- `*schema.Entity`: The mutation result will be a list of `*schema.Entity`. This is used for UserSchema and requires an additional parameter `schema` to specify the schema name.

### Create a mutation

::: code-group

```go [SystemSchema]
// Create a mutation builder to insert into the table `blog`
// Blog is a SystemSchema
mutation := db.Builder[Blog](client)
```

```go [UserSchema]
// Create a mutation builder to insert into the table `blog`
// "blog" is the schema name
mutation := db.Builder[*schema.Entity](client, "blog")
```

:::

## Create

```go
func Create[T any](ctx context.Context, data any) (t T, err error)
```

The `Create` method is used to insert a new record into the database and return the created record.

The `data` parameter accepts the following types:

- A `*schema.Entity`.
- A `map[string]any` or use `fs.Map` for short.

If the `data` is not satisfied, the method will return an error.

**To create a record with relation data, set the value of the relation field to one of the following:**

- A `*schema.Entity`: Use to set a `o2o` or `m2o` not owner relation.
- A `[]*schema.Entity`: Use to set a `o2m` or `m2m` relation.

**Example:**

```go
blog, err := mutation.Create(
  context.Background(),
  fs.Map{
    "title": "Hello World",
    "body":  "This is a blog post",
    "tags": []*schema.Entity{
      schema.NewEntity(1),
      schema.NewEntity(2),
    },
  },
)
```

## CreateFromJSON

```go
func CreateFromJSON[T any](
  ctx context.Context,
  data string,
) (t T, err error)
```

The `CreateFromJSON` method is used to insert a new record into the database from a JSON string and return the created record.

**Example:**

```go
blog, err := mutation.CreateFromJSON(
  context.Background(),
  `{
    "title": "Hello World",
    "body": "This is a blog post",
    "tags":[{"id": 1}, {"id": 2}]
  }`,
)
```

## Update

```go
func Update[T any](ctx context.Context, data any) (ts []T, err error)
```

The `Update` method is used to update records in the database and return the updated records.

The `data` parameter accepts the following types:

- A `*schema.Entity`.
- A `map[string]any` or use `fs.Map` for short.

If the `data` is not satisfied, the method will return an error.

::: danger IMPORTANT
The `Update` method requires a `Where` method to be called before calling the `Update` method.

If there is no `Where` method called before the `Update` method, the method will update all records in the table.
:::

**Example:**

```go
blogs, err := mutation.
  Where(db.EQ("id", 1)).
  Update(
    context.Background(),
    fs.Map{
      "title": "Hello World updated",
      "body":  "This is a blog post updated",
    },
  )
```

## Delete

```go
func Delete[T any](ctx context.Context) (affected int, err error)
```

The `Delete` method is used to delete records from the database and return the number of affected records.

::: danger IMPORTANT
The `Delete` method requires a `Where` method to be called before calling the `Delete` method.

If there is no `Where` method called before the `Delete` method, the method will delete all records in the table.
:::

**Example:**

```go
affected, err := mutation.
  Where(db.EQ("id", 1)).
  Delete(context.Background())
```
