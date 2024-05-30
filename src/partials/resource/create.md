**Example:**

```go
package main

import (
  "github.com/fastwego/fastschema/fs"
)

type Input struct {
  Name string `json:"name"`
}

type Output struct {
  Message string `json:"message"`
}

func main() {
  handler := func(c fs.Context, input *Input) (*Output, error) {
    return &Output{
      Message: "Hello, " + input.Name,
    }, nil
  }

  meta := &fs.Meta{Get: "/"}
  rs := fs.NewResource("hello", handler, &fs.Meta{Get: "/"})
}
```

**Let's break down the code above:**

1. We define two structs, `Input` and `Output`, that represent the input and output of the resource, we call them resource Signatures.
2. We define a handler function that processes the request and returns a response.
   - `c fs.Context` is the context object that contains information about the request.
   - `input *Input` is the input/payload data that the resource receives.
   - `*Output` is the output/response data that the resource returns.
3. We create a metadata object that contains information about the resource. In this case, we specify that the resource can be accessed via the HTTP `GET` method.
4. We create a new resource using the `NewResource` function. We pass in the name, handler function, and metadata object as parameters.


### NewResource

```go
func NewResource[Input, Output any](
	name string,
	handler HandlerFn[Input, Output],
	metas ...*Meta,
) *Resource
```

To create a resource, you can use the `NewResource` function. This function takes the following parameters:

- `name`: the name of the resource.
- `handler`: a function that processes the request and returns a response.
- `metas`: a list of metadata objects that contain additional information about the resource.
