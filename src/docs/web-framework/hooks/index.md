# Hooks

Hooks are functions that execute before or after an operation on a resource.

A Hook can be a resource hook, database hook, or application hook, allowing you to add custom logic to your APIs and extend FastSchema's functionality.

::: warning Help us improve

The FastSchema hooks system is still in its early stages, and we're actively working on enhancing it. If you have feedback or suggestions, please let us know.
:::


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

## OnPostDBGet

```go{6}
type PostDBGet = func(
  query *QueryOption,
  entities []*schema.Entity,
) ([]*schema.Entity, error)

func (a *App) OnPostDBGet(hooks ...db.PostDBGet)
```

The `OnPostDBGet` hook is executed after the database `Get`, `First`, `Only` operations is performed.

It can be used to manipulate the query result before it is returned to the client.

**Example:**

```go{5-22}
app, _ := fastschema.New(&fs.Config{
  SystemSchemas: []any{Tag{}, Blog{}},
})

app.OnPostDBGet(func(
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
