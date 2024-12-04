In FastSchema, a Resource is a component that processes user requests and returns responses. It functions similarly to a controller in the MVC pattern or a resolver in GraphQL.

Resources can be grouped, which is useful for organizing related endpoints. For example, you might group all user-related resources together.

Each Resource must have a handler, a function that processes the user request and returns the response.

When defining a Resource, you can specify the input data that it expects and the output data that it returns. This is useful for documenting the API and for validating the input and output data.

Client requests don't go directly to the Resource. Instead, they are routed by a resolver, which directs the request to the appropriate Resource. Currently, FastSchema uses a RestfulResolver, which routes requests based on the HTTP method and path. In the future, additional resolvers, such as a GraphQL resolver, may be introduced.

For more information, refer to the [Resource Documentation](/docs/framework/resource/).
