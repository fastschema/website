# Resource Resolver

In FastSchema, Client requests don't go directly to the Resource. Instead, they are routed by a resolver, which directs the request to the appropriate Resource.

Currently, FastSchema uses a RestfulResolver, which routes requests based on the HTTP method and path. In the future, additional resolvers, such as a GraphQL resolver, may be introduced.

## Restful Resolver

The package `github.com/fastschema/fastschema/pkg/restfulresolver` is a built-in resolver that routes requests based on the HTTP method and path. It is the default resolver for FastSchema.

It's built on top of the [GoFiber](https://gofiber.io) for fast and efficient routing.

## Create Restful Resolver

```go
func NewRestResolver(
	resourceManager *fs.ResourcesManager,
	logger logger.Logger,
	staticFSs ...*fs.StaticFs,
) *RestSolver
```

To create a new `RestfulResolver`, you need to provide a `ResourceManager` and a `Logger`. Optionally, you can also provide a list of `StaticFs` to serve static files.

`RestfulResolver` will create a new web server, populate it with routes based on the resources in the `ResourceManager`, and start the server.

## Methods

The RestResolver has the following methods:

- `Server() *Server`: Returns the underlying GoFiber server.
- `Start(address string) error`: Starts the server on the specified port.
- `Shutdown() error`: Stops the server.
