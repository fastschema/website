# Raw SQL

Raw SQL allow executing SQL queries directly against the database. This can be useful when you need to perform complex queries that are not supported by the FastSchema query builder.

## Exec

Exec executes a query that does not return records. For example, in SQL, INSERT or UPDATE.

**`Exec` accepts the following parameters:**
- `ctx`: A context.Context object
- `client`: A database client
- `query`: A SQL query
- `args`: Arguments to pass to the query

```go [Exec]
func Exec(
  ctx context.Context,
  client Client,
  query string,
  args ...any,
) (sql.Result, error)
```

Exec returns a `sql.Result` or error if the query fails.

```go
// A Result summarizes an executed SQL command.
type Result interface {
	// LastInsertId returns the integer generated by the database
	// in response to a command. Typically this will be from an
	// "auto increment" column when inserting a new row. Not all
	// databases support this feature, and the syntax of such
	// statements varies.
	LastInsertId() (int64, error)

	// RowsAffected returns the number of rows affected by an
	// update, insert, or delete. Not every database or database
	// driver may support this.
	RowsAffected() (int64, error)
}
```

**Example:**

```go
result, err := db.Exec(
  ctx, client,
  "UPDATE blogs SET vote = vote + ?, updated_at = ? WHERE id = ?",
  1, time.Now(), 10,
)
```

## Query

Query executes a query that returns rows, typically a SELECT in SQL.

```go
func Query[T any](
  ctx context.Context,
  client Client,
  query string,
  args ...any,
) (ts []T, err error)
```

**`Query` accepts the following parameters:**
- `ctx`: A context.Context object
- `client`: A database client
- `query`: A SQL query
- `args`: Arguments to pass to the query

**_Additionally, a type parameter is required in order to specify the type of the result. The type parameter can be:_**
- ***schema.Entity:** The result rows will be scanned into a slice of `*schema.Entity`. This is helpful if you don't want to scan the result row into a struct.
- **A struct type:** `Query` will scan the result rows into a slice of the specified struct. The struct fields must match the columns in the result rows.

**Example:**

::: code-group
```go [Use Struct]
type Blog struct {
  ID        int
  Title     string
  Content   string
  Vote      int
  CreatedAt time.Time
  UpdatedAt time.Time
}

// blogs has the type []Blog
blogs, err := db.Query[Blog](
  ctx, client,
  "SELECT * FROM blogs WHERE id > ?",
  1,
)
```

```go [Use *schema.Entity]
// blogs has the type []*schema.Entity
blogs, err := db.Query[*schema.Entity](
  ctx, client,
  "SELECT * FROM blogs WHERE id > ?",
  1,
)
```
:::
