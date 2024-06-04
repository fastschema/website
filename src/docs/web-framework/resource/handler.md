# Resource Handler

The `handler` is an important part of the resource. It does the main business logic of the resource. The handler function takes the following parameters:

## Context

The context object contains information about the request, It implements the `fs.Context` interface.

You can use the context object to access information about the request, such as the requesting user, request parameters, and request body.

```go
type Context interface {
	ID() string
	User() *User
	Value(string, ...any) (val any)
	Logger() logger.Logger
	Parse(any) error
	Context() context.Context
	Args() map[string]string
	Arg(string, ...string) string
	ArgInt(string, ...int) int
	Entity() (*schema.Entity, error)
	Resource() *Resource
	AuthToken() string
	Next() error
	Result(...*Result) *Result
	Files() ([]*File, error)
}
```

## Input

A `POST` or `PUT` request may contain a payload, FastSchema will automatically parse the payload into the `Input` struct.

The `input` parameter will be `nil` in the following cases:

- The request is not a `POST` or `PUT` request.
- The request payload is an empty object `{}`.
- We decide to ignore the payload by using `any` as the input type: `func(c fs.Context, _ any) (Output, error)`

::: warning Content-Type

FastSchema will only parse the request payload if the `Content-Type` header is set to `application/json`.

If FastSchema cannot parse the payload into the `Input` struct, it will return an error and the handler will not be called.
:::

## Output

The handler function should return an `Output` and an error. The `Output` value will be serialized as JSON and sent back to the client.

The `Output` can be any type, including a primitive type, a struct, etc.

### Send HTML response

```go
resource := fs.Get("/about", func(c fs.Context, _ any) (string, error) {
	header := make(http.Header)
	header.Set("Content-Type", "text/html")

	return &fs.HTTPResponse{
		StatusCode: http.StatusOK,
		Header:     header,
		Body: []byte(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>About</title>
			</head>
			<body>
				<h1>About</h1>
				<p>This is the about page.</p>
			</body>
			</html>
		`),
	}, nil
})
```
