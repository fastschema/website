A resource manager is basically a normal resource with additional features.

```go
type ResourcesManager struct {
	*Resource
	Middlewares []Middleware
	Hooks       func() *Hooks
}
```

- **Middlewares:** Middlewares are functions that execute on every request. They do not have access or information about the resource handler. They can be used to add common functionalities like logging, authentication, etc.
- **Hooks:**: Hooks are functions that run before or after the main handler. They have access to the resource handler and can be used to modify the input/output or add additional functionalities.

### Create a resource manager

```go
resourceManager := fs.NewResourcesManager()
resourceManager.Add(
  fs.NewResource("hello", func(c fs.Context, _ any) (string, error) {
    return "Hello, World!", nil
  }, &fs.Meta{ Get: "/" }),
)
```
