# Testing

FastSchema provides a set of testing utilities that can be used to test your FastSchema application.

## Logger

The `logger` package provides a mock implementation of the `logger.Logger` interface that can be used for testing.

It supports recording log messages and checking if a specific log message was recorded.

```go
mockLogger := logger.CreateMockLogger()
```

By default, the mock logger prints log messages to the console. You can disable this behavior by passing a `true` value to the `CreateMockLogger` function to suppress console output.

The mock logger provides an additional method `Last` that returns the last log message recorded. You can use this method to check for the correctness of the log messages.

```go
type MockLoggerMessage struct {
	Type   string `json:"type"`
	Params []any  `json:"params"`
}

func (m MockLoggerMessage) String() string {
	return fmt.Sprintf("%s: %v", m.Type, m.Params)
}

func (l *MockLogger) Last() MockLoggerMessage
```

## Database

The `database` package provides a mock implementation of the `db.Client` interface that can be used for testing.

### NewTestClient

The `NewTestClient` function creates a new test client that uses an in-memory SQLite database. The test client can be used to test the behavior of the database client without connecting to a real database.

`NewTestClient` function returns a `db.Client` interface that can be used to interact with the in-memory database.

### createMockAdapter

A helper function that creates a mock adapter for the database. The mock adapter does not connect to a real database and use `sqlmock` to simulate database interactions.

We can use it for testing the generated SQL queries and the behavior of the database client.


## HTTP

Thanks to the `GoFiber` framework, the restfulresolver package is compatible with the net/http/httptest package, enabling you to test HTTP handlers effectively.

```go
Test(req *http.Request, msTimeout ...int) (resp *http.Response, err error)
```

The `Test` method create a test connection to the HTTP handler and returns the response.

**Example:**

```go
sb, _ := schema.NewBuilderFromDir(t.TempDir(), fs.SystemSchemaTypes...)
db, _ := entdbadapter.NewTestClient(
  utils.Must(os.MkdirTemp("", "migrations")),
  sb,
)

toolService := toolservice.New(&testApp{sb: sb, db: db})
resources := fs.NewResourcesManager()
resources.Group("tool").
  Add(fs.Get("stats", func(c fs.Context, _ any) (any, error) {
    return "stats", nil
  }))

assert.NoError(t, resources.Init())
server := restfulresolver.NewRestfulResolver(
  resources,
  logger.CreateMockLogger(true),
).Server()

req := httptest.NewRequest("GET", "/tool/stats", nil)
resp := utils.Must(server.Test(req))
defer func() { assert.NoError(t, resp.Body.Close()) }()
assert.Equal(t, 200, resp.StatusCode)
response := utils.Must(utils.ReadCloserToString(resp.Body))
assert.Contains(t, response, `stats`)
```
