Resource supports many convenient methods to help you build your application, these methods are also applicable to the resource manager.

### Clone

```go
func (r *Resource) Clone() *Resource
```

The `Clone` method creates a copy of the resource. This is useful when you want to create multiple resources with similar configurations.

### AddResource

```go
func (r *Resource) AddResource(
  name string,
  handler Handler,
  metas ...*Meta,
) (self *Resource)
```

The `AddResource` method adds a sub-resource to the resource. Sub-resources are resources that are nested within the main resource. They can be used to create hierarchical structures or to group related resources together.

`AddResource` returns the current resource, so you can chain multiple `AddResource` calls together.

This method is often used in the `ResourceManager` to create a resource hierarchy.

### Add

```go
func (r *Resource) Add(resources ...*Resource) (self *Resource)
```

The `Add` method adds one or more sub-resource to the resource. This is a convenient way to add multiple resources to the resource at once.

`Add` returns the current resource, so you can chain multiple `Add` calls together.

### Find

```go
func (r *Resource) Find(resourceID string) *Resource {
```

The `Find` method searches for a sub-resource by its ID. It returns the sub-resource if found, or `nil` if not found.

### Group

```go
Group(name string, metas ...*Meta) (group *Resource)
```

The `Group` method creates a new group resource. Group resources are used to group related resources together. They are similar to sub-resources, but they do not have a handler function.


### Other resource methods

- `ID() string`: Get the ID of the resource.
- `Name() string`: Get the name of the resource.
- `Path() string`: Get the path of the resource.
- `Handler() Handler`: Get the handler function of the resource.
- `Meta() *Meta`: Get the metadata of the resource.
- `Signature() Signatures`: Get the signature of the resource.
- `Resources() []*Resource`: Get the sub-resources of the resource.
- `IsGroup() bool`: Check if the resource is a group resource.
- `IsPublic() bool`: Check if the resource is public.
- `String() string`: Get the string representation of the resource.
- `Print()`: Print the resource to the console.
- `MarshalJSON() ([]byte, error)`: Marshal the resource to JSON.
