# Database Query

The package `db` provides a query builder that allows you to build queries for the database.

In order to use the query builder, we need a db client. The db client can be created directly from the `entdbadapter` package or using the `fastschema` application.

Refer to the [Database Client](/docs/framework/database/#database-client) section for more information about creating a database client.

::: tip `client` parameter
From now on, we will refer to the `client` parameter as the database client.
:::

::: details Example types
To better understand the examples in this section, we will use the following types:

```go [types.go]
type Tag struct {
	ID    uint64  `json:"id"`
	Name  string  `json:"name"`
	Desc  string  `json:"desc"`
	Blogs []*Blog `json:"blogs" fs.relation:"{'type':'m2m','schema':'blog','field':'tags','owner':true}"`
}

type Blog struct {
	ID    uint64 `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
	Vote  int    `json:"votes"`
	Tags  []*Tag `json:"tags" fs.relation:"{'type':'m2m','schema':'tag','field':'blogs'}"`
}
```

:::

::: code-group

```go [Query Example]
// blogs has type []Blog
blogs, err := db.Builder[Blog](client).
	Select("id", "title", "tags.id", "tags.name").
	Where(db.Or(
		db.EQ("id", 1),
		db.EQ("title", "First Blog"),
	)).
	Order("-id").
	Limit(10).
	Offset(20).
	Get(context.Background())
```

:::

## Query Builder

The `Builder` function is used to create a new query builder for a specific schema:

```go
func Builder[T any](client Client, schemas ...string) *QueryBuilder[T]
```

A type parameter `T` is used to determine the schema and the type of the records returned by the query. `T` can be one of the following types:

- `SystemSchema`: A Go struct that was registered as a system schema.
- `*schema.Entity`: The query result will be a list of `*schema.Entity`. This is used for UserSchema and requires an additional parameter `schema` to specify the schema name.

### Query Builder for SystemSchema

To create a query builder for a system schema, pass the `SystemSchema` struct object as the second parameter.

This parameter can be a pointer to a struct or a struct type.

**Example:**

```go{4}
// Create a query builder to query from the table `blog`
// Blog is a SystemSchema
query := db.Builder[Blog](client)
```

### Query Builder for UserSchema

> _A UserSchema is a schema created by users through the Admin UI. It is stored in JSON format, can be used to generate database table and is't represented by a Go struct._

FastSchema need to know which schema/model the query is for. To do this, we pass the schema name as the second parameter.

**Example:**

```go{5}
// Create a query builder to query from the table `blog`
// "blog" is the schema name
query := db.Builder[*schema.Entity](client, "blog")
```

## Limit

The `Limit` method is used to limit the number of records returned by the query.

**Example:**

```go{2}
query := db.Builder[Blog](client)
query.Limit(10)
```

## Offset

The `Offset` method is used to skip a number of records before returning the result.

**Example:**

```go{2}
query := db.Builder[Blog](client)
query.Offset(20)
```

## Order

The `Order` method is used to sort the records returned by the query.

**Example:**

```go{3}
query := db.Builder[Blog](client)
// Descending order by id, remove `-` for ascending order
query.Order("-id")
```

## Select

The `Select` method is used to select specific fields from the records.

`Select` supports selecting fields from relations using the dot notation but not supported for nested relations.

**Example:**

```go{3}
query := db.Builder[Blog](client)
query.Select("id", "title", "tags.id", "tags.name")
```

## Where

The `Where` method is used to filter the records returned by the query.

**Example:**

```go{2-5}
query := db.Builder[Blog](client)
query.Where(db.Or(
	db.EQ("id", 1),
	db.EQ("title", "First Blog"),
))
```

## Get

The `Get` method is used to execute the query and return list of records that match the query.

**Example:**

::: code-group

```go{3} [SystemSchema]
query := db.Builder[Blog](client)
// records has type []*Blog
records, err := query.Get(context.Background())
```

```go{3} [UserSchema]
query := db.Builder(client, schema.NamedEntity("blog"))
// records has type []*schema.Entity
records, err := query.Get(context.Background())
```

:::

## First

The `First` method is used to execute the query and return the first record that match the query.

`First` return error if no record found.

**Example:**

::: code-group

```go{3} [SystemSchema]
query := db.Builder[Blog](client)
// record has type *Blog
record, err := query.First(context.Background())
```

```go{3} [UserSchema]
query := db.Builder(client, schema.NamedEntity("blog"))
// record has type *schema.Entity
record, err := query.First(context.Background())
```

:::

## Only

The `Only` method is used to execute the query and return the only record that match the query.

`Only` return error if no record found or more than one record found.

**Example:**

::: code-group

```go{3} [SystemSchema]
query := db.Builder[Blog](client)
// record has type *Blog
record, err := query.Only(context.Background())
```

```go{3} [UserSchema]
query := db.Builder(client, schema.NamedEntity("blog"))
// record has type *schema.Entity
record, err := query.Only(context.Background())
```

:::

## Count

The `Count` method is used to execute the query and return the number of records that match the query.

**Example:**

```go{3}
query := db.Builder[Blog](client)
count, err := query.Count(context.Background())
```
