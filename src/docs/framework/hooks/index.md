# Hooks

Hooks are functions that execute before or after an operation on a resource.

A Hook can be a resource hook, database hook, or application hook, allowing you to add custom logic to your APIs and extend FastSchema's functionality.

::: warning Help us improve

The FastSchema hooks system is still in its early stages, and we're actively working on enhancing it. If you have feedback or suggestions, please let us know.
:::

Most hooks have a similar signature:

```go
// The context object that was passed to the action
context.Context

// Middleware is a function that can be used to add middleware to a resource
type Middleware func(c Context) error

type QueryOption struct {
	Schema     *schema.Schema `json:"schema"`
	Limit      uint           `json:"limit"`
	Offset     uint           `json:"offset"`
	Columns    []string       `json:"columns"`
	Order      []string       `json:"order"`
	Predicates []*Predicate   `json:"predicates"`
	Query      string         `json:"query"`
	Args       any            `json:"args"`
	// For count query
	Column string `json:"column"`
	Unique bool   `json:"unique"`
}
```

## OnPreResolve

```go
func (a *App) OnPreResolve(middlewares ...fs.Middleware)
```

The `OnPreResolve` hook is executed before the resource handler is called. It can be used to add custom logic before the resource handler is executed.

**There are two possible behaviors for the `OnPreResolve` hook:**

- `Return nil` to continue with the normal flow.
- `Return an error` to stop the execution and return the error to the client.

**Example:**

```go{5-14}
app, _ := fastschema.New(&fs.Config{
  SystemSchemas: []any{Tag{}, Blog{}},
})

app.OnPreResolve(func(ctx fs.Context) error {
  user := ctx.User()
  resource := ctx.Resource()

  if user == nil && resource.ID() == "api.user.me" {
    return errors.Unauthenticated("You are not authenticated")
  }

  return nil
})

app.Start()
```

## OnPostResolve

```go{3}
func (a *App) OnPostResolve(middlewares ...fs.Middleware)
```

The `OnPostResolve` hook is executed after the resource handler is called. It can be used to add custom logic after the resource handler is executed or to manipulate the response before it is sent to the client.

**Example:**

```go{5-19}
app, _ := fastschema.New(&fs.Config{
  SystemSchemas: []any{Tag{}, Blog{}},
})

app.OnPostResolve(func(ctx fs.Context) error {
  // We only want to modify the response of the "api.hello" resource
  if ctx.Resource().ID() != "api.hello" {
    return nil
  }

  // If there was an error, we don't want to modify the response
  if ctx.Result().Error != nil {
    return nil
  }

  // Modify the response from "Hello World" to "Modified response"
  ctx.Result().Data = "Modified response"

  // Or set the result to a new value
  // ctx.Result(&fs.Result{ Data: "Modified response" })

  return nil
})

app.API().Add(fs.Get("hello", func(ctx fs.Context, _ any) (any, error) {
  return "Hello World", nil
}, &fs.Meta{Public: true}))

app.Start()
```

## OnPreDBQuery

```go{6}
type PreDBQuery = func(
	ctx context.Context,
	option *QueryOption,
) error

func (a *App) OnPreDBQuery(hooks ...db.PreDBQuery)
```

The `OnPreDBQuery` hook is executed before the database `Get`, `First`, `Only` operations are performed.

It can be used to manipulate the query before it is executed.

## OnPostDBQuery

```go{7}
type PostDBQuery = func(
	ctx context.Context,
	option *QueryOption,
	entities []*schema.Entity,
) ([]*schema.Entity, error)

func (a *App) OnPostDBQuery(hooks ...db.PostDBGet)
```

The `OnPostDBQuery` hook is executed after the database `Get`, `First`, `Only` operations is performed.

It can be used to manipulate the query result before it is returned to the client.

**Example:**

```go{5-22}
app, _ := fastschema.New(&fs.Config{
  SystemSchemas: []any{Tag{}, Blog{}},
})

app.OnPostDBQuery(func(
  ctx context.Context,
  query *db.QueryOption,
  entities []*schema.Entity,
) ([]*schema.Entity, error) {
  if query.Model.Schema().Name != "file" {
    return entities, nil
  }

  for _, entity := range entities {
    path := entity.GetString("path")

    if path != "" {
      entity.Set("url", app.Disk().URL(path))
    }
  }

  return entities, nil
})

app.Start()
```

## PreDBCreate

```go
type PreDBCreate = func(
	ctx context.Context,
	schema *schema.Schema,
	createData *schema.Entity,
) error

func (a *App) OnPreDBCreate(hooks ...db.PreDBCreate)
```

The `PreDBCreate` hook is executed before the database `Create` operation is performed.

It can be used to manipulate the data before it is created.

- `schema` is the schema of the entity.
- `createData` is the data used to create the entity.


## PostDBCreate

```go
type PostDBCreate = func(
	ctx context.Context,
	schema *schema.Schema,
	dataCreate *schema.Entity,
	id uint64,
) error

func (a *App) OnPostDBCreate(hooks ...db.PostDBCreate)
```

The `PostDBCreate` hook is executed after the database `Create` operation is performed.

It can be used to trigger additional actions after a new entity is created.

- `schema` is the schema of the entity.
- `id` is the ID of the created entity.
- `dataCreate` is the data used to create the entity.

**Example:**

```go{5-19}
app, _ := fastschema.New(&fs.Config{
  SystemSchemas: []any{Tag{}, Blog{}},
})

app.OnPostDBCreate(func(
  ctx context.Context,
	schema *schema.Schema,
	dataCreate *schema.Entity,
	id uint64,
) error {
  if schema.Name != "file" {
    return nil
  }

  // some logic to handle the file entity
  // e.g. move the file to a different location
  // or optimize the file for faster access

  return nil
})
```

## PreDBUpdate

```go
type PreDBUpdate = func(
	ctx context.Context,
	schema *schema.Schema,
	predicates []*Predicate,
	updateData *schema.Entity,
) error

func (a *App) OnPreDBUpdate(hooks ...db.PreDBUpdate)
```

The `PreDBUpdate` hook is executed before the database `Update` operation is performed.

It can be used to manipulate the update data or the predicates before the update is executed.

- `schema` is the schema of the entity.
- `predicates` are the predicates used to filter the entities for the update.
- `updateData` is the data used to update the entities.

## PostDBUpdate

```go
type PostDBUpdate = func(
	ctx context.Context,
	schema *schema.Schema,
	predicates []*Predicate,
	updateData *schema.Entity,
	originalEntities []*schema.Entity,
	affected int,
) error

func (a *App) OnPostDBUpdate(hooks ...db.PostDBUpdate)
```

The `PostDBUpdate` hook is executed after the database `Update` operation is performed.

It can be used to trigger additional actions after one or many entities are updated.

- `schema` is the schema of the entity.
- `predicates` are the predicates used to filter the entities for the update.
- `updateData` is the data used to update the entities.
- `originalEntities` are the entities before the update.
- `affected` is the number of entities affected by the update.

**Example:**

```go{5-21}
app, _ := fastschema.New(&fs.Config{
  SystemSchemas: []any{Tag{}, Blog{}},
})

app.OnPostDBUpdate(func(
  ctx context.Context,
	schema *schema.Schema,
	predicates []*Predicate,
	updateData *schema.Entity,
	originalEntities []*schema.Entity,
	affected int,
) error {
  if schema.Name != "tag" {
    return nil
  }

  // some logic to handle the tag entity update
  // e.g. update the tag in a search index
  // or update the tag in a cache

  return nil
})
```

## PreDBDelete

```go
type PreDBDelete = func(
	ctx context.Context,
	schema *schema.Schema,
	predicates []*Predicate,
) error

func (a *App) OnPreDBDelete(hooks ...db.PreDBDelete)
```

The `PreDBDelete` hook is executed before the database `Delete` operation is performed.

It can be used to manipulate the predicates before the delete is executed.

- `schema` is the schema of the entity.
- `predicates` are the predicates used to filter the entities for the delete.

## PostDBDelete

```go
type PostDBDelete = func(
  ctx context.Context,
	schema *schema.Schema,
	predicates []*Predicate,
	originalEntities []*schema.Entity,
	affected int,
) error

func (a *App) OnPostDBDelete(hooks ...db.PostDBDelete)
```

The `PostDBDelete` hook is executed after the database `Delete` operation is performed.

It can be used to trigger additional actions after one or many entities are deleted.

- `schema` is the schema of the entity.
- `predicates` are the predicates used to filter the entities for the delete.
- `originalEntities` are the entities before the delete.
- `affected` is the number of entities affected by the delete.

**Example:**

```go{5-21}
app, _ := fastschema.New(&fs.Config{
  SystemSchemas: []any{Tag{}, Blog{}},
})

app.OnPostDBDelete(func(
  ctx context.Context,
	schema *schema.Schema,
	predicates []*Predicate,
	originalEntities []*schema.Entity,
	affected int,
) error {
  if schema.Name != "tag" {
    return nil
  }

  // some logic to handle the tag entity delete
  // e.g. remove the tag from a search index
  // or remove the tag from a cache

  return nil
})
```

## PreDBExec
  
```go
type PreDBExec = func(
	ctx context.Context,
	option *QueryOption,
) error

func (a *App) OnPreDBExec(hooks ...db.PreDBExec)
```

The `PreDBExec` hook is executed before the database `Exec` operation is performed.

It can be used to manipulate the query before it is executed.


## PostDBExec

```go
type PostDBExec = func(
	ctx context.Context,
	option *QueryOption,
	result sql.Result,
) error

func (a *App) OnPostDBExec(hooks ...db.PostDBExec)
```

The `PostDBExec` hook is executed after the database `Exec` operation is performed.

It can be used to trigger additional actions after the query is executed.

- `result` is the result of the query execution.
