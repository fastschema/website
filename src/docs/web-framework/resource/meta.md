# Resource Meta

The `metas` parameter is optional, if specified, the first meta object in the list will be used as the resource's metadata.

The `meta` object contain additional information about the resource.

## HTTP Methods

A single resource can support multiple HTTP endpoints/methods. You can specify the HTTP methods that the resource supports using the following properties:

```go
meta := &fs.Meta{
  Get: "/getmethod",
  Head: "/headmethod",
  Post: "/postmethod",
  Put: "/putmethod",
  Delete: "/deletemethod",
  Patch: "/patchmethod",
  Options: "/optionsmethod",
  Connect: "/connectmethod",
  Trace: "/tracemethod",
}
```

::: warning Ignore methods

FastSchema need to check if a resource has support for a specific method.

If a method have path set to an empty string, it will be ignored.

```go
meta := &fs.Meta{
  Get: "/getmethod",
  Post: "",
}
```

If you are planning to use the resource for the root path, you can set the path to **`/`**

```go
meta := &fs.Meta{
  Get: "/",
}
```

:::

## Prefix

Specify the prefix that the resource should be registered under.

```go
meta := &fs.Meta{
  Prefix: "/api/v1",
}
```

## Args

The `Args` property is a map of query parameters that the resource accepts. Each key in the map is the name of the query parameter, and the value is an `Arg` object that contains information about the query parameter.

```go
meta := &fs.Meta{
  Get: "/search",
  Args: fs.Args{
    "search": fs.Arg{
      Type:        fs.TypeString,
      Required:    true,
      Description: "Search query",
      Example:     "Hello",
    },
    "limit": fs.Arg{
      Type:        fs.TypeInt,
      Description: "Limit the number of items to return",
      Example:     10,
    },
  },
}
```

## Public

The `Public` flag indicates whether the resource is public or requires authentication. By default, resources are not public.

```go
meta := &fs.Meta{
  Public: true,
}
```
