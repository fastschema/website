---
prev:
  text: "Delete Record"
  link: "/docs/backend/delete-record"
next:
  text: "Application"
  link: "/docs/framework/application"
---

# FastSchema Web Framework

FastSchema is a flexible and extensible application that allows you to customize and extend its functionality to meet your specific requirements.

FastSchema is built using the Go programming language and leverages a number of open-source libraries to provide its core functionality. Some of the key dependencies include:

- [Fiber](https://gofiber.io/)
- [Ent](https://entgo.io/)
- [Rclone](https://rclone.org/)
- [Zap](https://pkg.go.dev/go.uber.org/zap)
- [Next.js](https://nextjs.org/)
- [Shadcn](https://ui.shadcn.com/)
- [TipTap](https://www.tiptap.dev/)

## Prerequisites

Before you can install FastSchema, you need to have the following prerequisites installed on your system:

- An installation of Go 1.18 or later.
- A tool to edit Go code, such as Visual Studio Code or GoLand.
- A command-line terminal.

Additionally, you need to have a basic understanding of the Go programming language and how to use the command line to run Go programs.

## Installation

To install FastSchema, run the following command in your terminal:

```bash
go get github.com/fastschema/fastschema
```

## Getting Started

This is a basic example of how to use FastSchema to create a simple web application:

```go
package main

import (
  "github.com/fastschema/fastschema/fs"
  "github.com/fastschema/fastschema"
)

func main() {
  app, _ := fastschema.New(&fs.Config{
    Port: "8000",
  })

  app.AddResource(fs.Get("/", func(c fs.Context, _ any) (string, error) {
    return "Hello World", nil
  }))

  app.Start()
}
```

## Some examples

### Create a public resource

By default, all resources require authentication. To create a public resource, you can set the `Public` field to `true` in the resource Metadata:

```go
app.AddResource(fs.Get("/", func(c fs.Context, _ any) (string, error) {
  return "Hello World", nil
}, &fs.Meta{Public: true}))
```

### Response html

```go
// Add a resource that will be served at /about
app.AddResource(fs.Get("/about", func(c fs.Context, _ any) (any, error) {
  header := make(http.Header)
  header.Set("Content-Type", "text/html")

  return &fs.HTTPResponse{
    StatusCode: http.StatusOK,
    Header:     header,
    Body: []byte(`<!DOCTYPE html><html>
      <head><title>About</title></head>
      <body><h1>About</h1></p></body>
    </html>`),
  }, nil
}, &fs.Meta{Public: true}))
```

### Add a resource to the `API` group

To add a resource to the `API` group, you can use the `API` method on the `App` object:

```go
app.API().Add(fs.Get("/hello", func(c fs.Context, _ any) (any, error) {
  return fs.Map{"message": "Hello, World!"}, nil
}))
```

### Create a group of resources

You can create a group of resources by using the `Group` method on the `Resources` object:

```go
app.Resources().
  Group("docs", &fs.Meta{Prefix: "/docs"}).
  Add(fs.Get("/getting-started", func(c fs.Context, _ any) (any, error) {
    return fs.Map{"message": "Getting started with Fastschema"}, nil
  }, public))
```
