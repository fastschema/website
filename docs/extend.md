---
sidebar_position: 3
---

# Extend

FastSchema is a flexible and extensible application that allows you to customize and extend its functionality to meet your specific requirements. This guide provides an overview of the different ways you can extend FastSchema, including customizing the API, adding new features, and integrating with third-party services.

## Using Fastschema as a module

### Create a new project

```go
package main

import (
	"github.com/fastschema/fastschema"
)

func main() {
	newApp, err := fastschema.New(&fastschema.AppConfig{})

	if err != nil {
		panic(err)
	}

	newApp.Start()
}
```

### Adding a new resource

```go
newApp.AddResource(
	app.NewResource("hello", func(c app.Context, _ *any) (any, error) {
		return "Welcome to fastschema", nil
	}, app.Meta{app.GET: ""}),
)
```

This code snippet demonstrates how to create a new resource in FastSchema. The `AddResource` method is used to define a new resource with a unique name, handler function, and HTTP method. In this example, the resource is named "hello" and returns a welcome message when accessed via a GET request.

You can now access this resource by sending a GET request to `/api/hello`.

### Hooks

Currently, FastSchema supports the following hooks:
- `OnBeforeResolve`: Triggered before resolving the request.
- `OnAfterResolve`: Triggered after resolving the request.
- `OnAfterDBContentList`: Triggered after fetching the content from the database.

**Example**

```go
newApp.OnAfterDBContentList(func(query *db.QueryOptions, entities []*schema.Entity) ([]*schema.Entity, error) {
	if query.Model.Schema().Name != "media" {
		return entities, nil
	}

	for _, entity := range entities {
		entity.Set("custom", true)
	}

	return entities, nil
})
```

**Here's the full example:**

```go
package main

import (
	"github.com/fastschema/fastschema"
	"github.com/fastschema/fastschema/app"
	"github.com/fastschema/fastschema/db"
	"github.com/fastschema/fastschema/schema"
)

func main() {
	newApp, err := fastschema.New(&fastschema.AppConfig{})

	if err != nil {
		panic(err)
	}

	newApp.AddResource(
		app.NewResource("home", func(c app.Context, _ *any) (any, error) {
			return "Welcome to fastschema", nil
		}, app.Meta{app.GET: ""}),
	)

	newApp.OnAfterDBContentList(func(query *db.QueryOptions, entities []*schema.Entity) ([]*schema.Entity, error) {
		if query.Model.Schema().Name != "media" {
			return entities, nil
		}

		for _, entity := range entities {
			entity.Set("custom", true)
		}

		return entities, nil
	})

	newApp.Start()
}
```
