# Logging

FastSchema provides a built-in logging system that can be used to log useful information about the application.

[zaplogger](https://pkg.go.dev/github.com/fastschema/fastschema/pkg/zaplogger) is a package that implements the `logger.Logger` interface and is built on top of the [Uber Zap](https://github.com/uber-go/zap) package, which is a high-performance logging library.

**Example Output:**

```json
{
  "level": "info",
  "ts": "2024-05-30T09:43:19.894050754+07:00",
  "caller": "restfulresolver/middlewares.go:58",
  "msg": "Request completed",
  "request_id": "0007d2f7-a767-43cf-ae48-9b2f9d3c099f",
  "params": [
    {
      "ip": "127.0.0.1",
      "latency": "0s",
      "method": "GET",
      "path": "/api/hello",
      "status": 200
    }
  ]
}
```

A log line consists of the following fields:

- `level`: The log level.
- `ts`: The timestamp of the log.
- `caller`: The file and line number where the log was called.
- `msg`: The log message.
- `request_id`: The request id of the incoming request if available.
- `params`: Additional parameters that are logged with the message.

## Logger Interface

```go
type Logger interface {
	Info(...any)
	Infof(string, ...any)
	Error(...any)
	Errorf(string, ...any)
	Debug(...any)
	Fatal(...any)
	Warn(...any)
	Panic(...any)
	DPanic(...any)
	WithContext(context LogContext, callerSkips ...int) Logger
}
```

## Configuration

FastSchema logger supports logging to both the console and a log file. You can configure the logger by providing a `logger.Config` object to the `NewZapLogger` function.

```go
type Config struct {
	Development    bool `json:"development"`
	LogFile        string
	CallerSkip     int
	DisableConsole bool
}
```

- `Development`: Whether to run the logger in development mode.
- `LogFile`: The path to the log file.
- `CallerSkip`: The number of stack frames to skip when logging.
- `DisableConsole`: Whether to disable console logging.

## Usage

FastSchema does not provide a global logger instance. Instead, you have to get the logger instance by using one of the following methods:

### Using `app.Logger()`:

This method returns the logger instance for the application.

```go
app, _ := fastschema.New(&fs.Config{
  SystemSchemas: []any{Tag{}, Blog{}},
})

app.Logger().Info("Hello, World!")
```

### Using `fs.Context.Logger()`:

This method returns the logger instance for the current request context.

FastSchema assign a request id to every incoming request, this request id is useful for tracking logs related to a specific request.

When you use `fs.Context.Logger()`, the logger will automatically include the request id in the log message, it is a good practice to use this method to log information in every resource handler.

```go
app, _ := fastschema.New(&fs.Config{
  SystemSchemas: []any{Tag{}, Blog{}},
})

app.API().Add(fs.Get("hello", func(ctx fs.Context, _ any) (any, error) {
	ctx.Logger().Info("Hello, World!")
  return "Hello World", nil
}, &fs.Meta{Public: true}))

app.Start()
```

**Example Output:**

::: code-group

```bash [Console]
2024-05-30T09:42:06.142592425+07:00	info	cmd/main.go:56	Hello, World!	{"request_id": "b3af6b86-ac69-491f-a82e-6f658dd9a315"}
2024-05-30T09:42:06.142723638+07:00	info	restfulresolver/middlewares.go:58	Request completed	{"request_id": "b3af6b86-ac69-491f-a82e-6f658dd9a315", "params": [{"ip":"127.0.0.1","latency":"0s","method":"GET","path":"/api/hello","status":200}]}
```

```json [Log file]
{"level":"info","ts":"2024-05-30T09:43:19.89399056+07:00","caller":"cmd/main.go:56","msg":"Hello, World!","request_id":"0007d2f7-a767-43cf-ae48-9b2f9d3c099f"}
{"level":"info","ts":"2024-05-30T09:43:19.894050754+07:00","caller":"restfulresolver/middlewares.go:58","msg":"Request completed","request_id":"0007d2f7-a767-43cf-ae48-9b2f9d3c099f","params":[{"ip":"127.0.0.1","latency":"0s","method":"GET","path":"/api/hello","status":200}]}
```

:::

## Custom log context

A log context is a map of key-value pairs that can be used to add additional information to the log message.

```go
ctx.Logger().WithContext(logger.LogContext{
	"key1": "value1",
	"key2": "value2",
}).Info("Hello, World!")
```

This will output the following log message:

```json
{
  "level": "info",
  "ts": "2024-05-30T09:50:25.586195304+07:00",
  "caller": "cmd/main.go:60",
  "msg": "Hello, World!",
  "key1": "value1",
  "key2": "value2"
}
```

## Caller Skips

The `CallerSkip` field in the `logger.Config` struct is used to skip a number of stack frames when logging. This is useful when you want to skip the logging of the logger's internal functions or unnecessary stack frames.

`CallerSkip` can be set at the application level or at the logger level.

::: code-group

```go [Application level]
app, _ := fastschema.New(&fs.Config{
	SystemSchemas: []any{Tag{}, Blog{}},
	LoggerConfig: &logger.Config{
		CallerSkip: 1,
	},
})
```

```go [Logger level]
ctx.Logger().WithContext(logger.LogContext{}, 1).Info("Hello, World!")
```
