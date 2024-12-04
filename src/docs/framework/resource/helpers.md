# Resource Helpers

## Restful helpers

In the previous section, we've learned that a single resource supports multiple HTTP methods/path.

If you are not planning to use all the HTTP methods, you can the following helper functions to shorten the code.

### Interface

```go
func Helper[Input, Output any](
  name string,
  handler HandlerFn[Input, Output],
  metas ...*Meta,
) *Resource
```

### Example

```go
rs := fs.Get("/path", func(c fs.Context, input *Input) (*Output, error) {
  return &Output{
    Message: "Hello, " + input.Name,
  }, nil
})
```

### Changes compared to the full version

- `fs.Get` is used instead of `fs.NewResource` and we don't need to specify the HTTP method in the meta object.
- The path is passed as the first argument and is used as the resource name.

### Supported helpers

- `fs.Get`
- `fs.Head`
- `fs.Post`
- `fs.Put`
- `fs.Delete`
- `fs.Patch`
- `fs.Options`
- `fs.Connect`
- `fs.Trace`
