```go
type Resource struct {
	id         string
	group      bool
	resources  []*Resource
	name       string
	handler    Handler
	meta       *Meta
	signatures Signatures
}
```

A resource is an object that created from a `fastschema.Resource` struct. It has the following properties:

- `id`: a unique identifier for the resource. This is generated automatically by The resource manager.
- `group`: a boolean value that indicates whether the resource is a group or not. A group resource contains other resources.
- `resources`: a list of resources that are contained within the group resource.
- `name`: the name of the resource.
- `handler`: a function that processes the request and returns a response.
- `meta`: a metadata object that contains additional information about the resource.
- `signatures`: a list of signatures that define the input and output of the resource.
