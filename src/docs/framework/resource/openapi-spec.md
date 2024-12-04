# OpenAPI Spec

The OpenAPI specification is a standard way to describe your API. It includes information about the API's endpoints, request and response schemas, and more.

## Resource Spec

FastSchema automatically generates OpenAPI specification v3.1 for each resource. Under the hood, FastSchema uses [Ogen](https://ogen.dev/) to generate the OpenAPI spec.

The resource input/output type will be inferred from the function signature.

### Examples

::: code-group

```go [Simple Types]
func handler[T any](c fs.Context, input T) (T, error) {
	return input, nil
}

// Primitive types
fs.Post("/bool", handler[bool])
fs.Post("/int", handler[int])
fs.Post("/int8", handler[int8])
fs.Post("/int16", handler[int16])
fs.Post("/int32", handler[int32])
fs.Post("/int64", handler[int64])
fs.Post("/uint", handler[uint])
fs.Post("/uint8", handler[uint8])
fs.Post("/uint16", handler[uint16])
fs.Post("/uint32", handler[uint32])
fs.Post("/uint64", handler[uint64])
fs.Post("/uintptr", handler[uintptr])
fs.Post("/float32", handler[float32])
fs.Post("/float64", handler[float64])
fs.Post("/complex64", handler[complex64])
fs.Post("/complex128", handler[complex128])
fs.Post("/string", handler[string])

// Pointer to primitive types
fs.Post("/Ptr_bool", handler[*bool])
fs.Post("/Ptr_int", handler[*int])
fs.Post("/Ptr_int8", handler[*int8])
fs.Post("/Ptr_int16", handler[*int16])
fs.Post("/Ptr_int32", handler[*int32])
fs.Post("/Ptr_int64", handler[*int64])
fs.Post("/Ptr_uint", handler[*uint])
fs.Post("/Ptr_uint8", handler[*uint8])
fs.Post("/Ptr_uint16", handler[*uint16])
fs.Post("/Ptr_uint32", handler[*uint32])
fs.Post("/Ptr_uint64", handler[*uint64])
fs.Post("/Ptr_uintptr", handler[*uintptr])
fs.Post("/Ptr_float32", handler[*float32])
fs.Post("/Ptr_float64", handler[*float64])
fs.Post("/Ptr_complex64", handler[*complex64])
fs.Post("/Ptr_complex128", handler[*complex128])
fs.Post("/Ptr_string", handler[*string])

// Array of primitive types
fs.Post("/Arr_bool", handler[[3]bool])
fs.Post("/Arr_int", handler[[3]int])
fs.Post("/Arr_int8", handler[[3]int8])
fs.Post("/Arr_int16", handler[[3]int16])
fs.Post("/Arr_int32", handler[[3]int32])
fs.Post("/Arr_int64", handler[[3]int64])
fs.Post("/Arr_uint", handler[[3]uint])
fs.Post("/Arr_uint8", handler[[3]uint8])
fs.Post("/Arr_uint16", handler[[3]uint16])
fs.Post("/Arr_uint32", handler[[3]uint32])
fs.Post("/Arr_uint64", handler[[3]uint64])
fs.Post("/Arr_uintptr", handler[[3]uintptr])
fs.Post("/Arr_float32", handler[[3]float32])
fs.Post("/Arr_float64", handler[[3]float64])
fs.Post("/Arr_complex64", handler[[3]complex64])
fs.Post("/Arr_complex128", handler[[3]complex128])
fs.Post("/Arr_string", handler[[3]string])

// Array of pointer to primitive types
fs.Post("/Arr_Ptr_bool", handler[[3]*bool])
fs.Post("/Arr_Ptr_int", handler[[3]*int])
fs.Post("/Arr_Ptr_int8", handler[[3]*int8])
fs.Post("/Arr_Ptr_int16", handler[[3]*int16])
fs.Post("/Arr_Ptr_int32", handler[[3]*int32])
fs.Post("/Arr_Ptr_int64", handler[[3]*int64])
fs.Post("/Arr_Ptr_uint", handler[[3]*uint])
fs.Post("/Arr_Ptr_uint8", handler[[3]*uint8])
fs.Post("/Arr_Ptr_uint16", handler[[3]*uint16])
fs.Post("/Arr_Ptr_uint32", handler[[3]*uint32])
fs.Post("/Arr_Ptr_uint64", handler[[3]*uint64])
fs.Post("/Arr_Ptr_uintptr", handler[[3]*uintptr])
fs.Post("/Arr_Ptr_float32", handler[[3]*float32])
fs.Post("/Arr_Ptr_float64", handler[[3]*float64])
fs.Post("/Arr_Ptr_complex64", handler[[3]*complex64])
fs.Post("/Arr_Ptr_complex128", handler[[3]*complex128])
fs.Post("/Arr_Ptr_string", handler[[3]*string])

// Slice of primitive types
fs.Post("/Slice_bool", handler[[]bool])
fs.Post("/Slice_int", handler[[]int])
fs.Post("/Slice_int8", handler[[]int8])
fs.Post("/Slice_int16", handler[[]int16])
fs.Post("/Slice_int32", handler[[]int32])
fs.Post("/Slice_int64", handler[[]int64])
fs.Post("/Slice_uint", handler[[]uint])
fs.Post("/Slice_uint8", handler[[]uint8])
fs.Post("/Slice_uint16", handler[[]uint16])
fs.Post("/Slice_uint32", handler[[]uint32])
fs.Post("/Slice_uint64", handler[[]uint64])
fs.Post("/Slice_uintptr", handler[[]uintptr])
fs.Post("/Slice_float32", handler[[]float32])
fs.Post("/Slice_float64", handler[[]float64])
fs.Post("/Slice_complex64", handler[[]complex64])
fs.Post("/Slice_complex128", handler[[]complex128])
fs.Post("/Slice_string", handler[[]string])

// Slice of pointer to primitive types
fs.Post("/SlicePtr_bool", handler[[]*bool])
fs.Post("/SlicePtr_int", handler[[]*int])
fs.Post("/SlicePtr_int8", handler[[]*int8])
fs.Post("/SlicePtr_int16", handler[[]*int16])
fs.Post("/SlicePtr_int32", handler[[]*int32])
fs.Post("/SlicePtr_int64", handler[[]*int64])
fs.Post("/SlicePtr_uint", handler[[]*uint])
fs.Post("/SlicePtr_uint8", handler[[]*uint8])
fs.Post("/SlicePtr_uint16", handler[[]*uint16])
fs.Post("/SlicePtr_uint32", handler[[]*uint32])
fs.Post("/SlicePtr_uint64", handler[[]*uint64])
fs.Post("/SlicePtr_uintptr", handler[[]*uintptr])
fs.Post("/SlicePtr_float32", handler[[]*float32])
fs.Post("/SlicePtr_float64", handler[[]*float64])
fs.Post("/SlicePtr_complex64", handler[[]*complex64])
fs.Post("/SlicePtr_complex128", handler[[]*complex128])
fs.Post("/SlicePtr_string", handler[[]*string])

// Pointer to slice of pointer to primitive types
fs.Post("/PtrSlicePtr_bool", handler[*[]*bool])
fs.Post("/PtrSlicePtr_int", handler[*[]*int])
fs.Post("/PtrSlicePtr_int8", handler[*[]*int8])
fs.Post("/PtrSlicePtr_int16", handler[*[]*int16])
fs.Post("/PtrSlicePtr_int32", handler[*[]*int32])
fs.Post("/PtrSlicePtr_int64", handler[*[]*int64])
fs.Post("/PtrSlicePtr_uint", handler[*[]*uint])
fs.Post("/PtrSlicePtr_uint8", handler[*[]*uint8])
fs.Post("/PtrSlicePtr_uint16", handler[*[]*uint16])
fs.Post("/PtrSlicePtr_uint32", handler[*[]*uint32])
fs.Post("/PtrSlicePtr_uint64", handler[*[]*uint64])
fs.Post("/PtrSlicePtr_uintptr", handler[*[]*uintptr])
fs.Post("/PtrSlicePtr_float32", handler[*[]*float32])
fs.Post("/PtrSlicePtr_float64", handler[*[]*float64])
fs.Post("/PtrSlicePtr_complex64", handler[*[]*complex64])
fs.Post("/PtrSlicePtr_complex128", handler[*[]*complex128])
fs.Post("/PtrSlicePtr_string", handler[*[]*string])

// Map of primitive types with string key
fs.Post("/Map_Str_bool", handler[map[string]bool])
fs.Post("/Map_Str_int", handler[map[string]int])
fs.Post("/Map_Str_int8", handler[map[string]int8])
fs.Post("/Map_Str_int16", handler[map[string]int16])
fs.Post("/Map_Str_int32", handler[map[string]int32])
fs.Post("/Map_Str_int64", handler[map[string]int64])
fs.Post("/Map_Str_uint", handler[map[string]uint])
fs.Post("/Map_Str_uint8", handler[map[string]uint8])
fs.Post("/Map_Str_uint16", handler[map[string]uint16])
fs.Post("/Map_Str_uint32", handler[map[string]uint32])
fs.Post("/Map_Str_uint64", handler[map[string]uint64])
fs.Post("/Map_Str_uintptr", handler[map[string]uintptr])
fs.Post("/Map_Str_float32", handler[map[string]float32])
fs.Post("/Map_Str_float64", handler[map[string]float64])
fs.Post("/Map_Str_complex64", handler[map[string]complex64])
fs.Post("/Map_Str_complex128", handler[map[string]complex128])
fs.Post("/Map_Str_string", handler[map[string]string])

// Map of primitive types with string int
fs.Post("/Map_Int_bool", handler[map[int]bool])
fs.Post("/Map_Int_int", handler[map[int]int])
fs.Post("/Map_Int_int8", handler[map[int]int8])
fs.Post("/Map_Int_int16", handler[map[int]int16])
fs.Post("/Map_Int_int32", handler[map[int]int32])
fs.Post("/Map_Int_int64", handler[map[int]int64])
fs.Post("/Map_Int_uint", handler[map[int]uint])
fs.Post("/Map_Int_uint8", handler[map[int]uint8])
fs.Post("/Map_Int_uint16", handler[map[int]uint16])
fs.Post("/Map_Int_uint32", handler[map[int]uint32])
fs.Post("/Map_Int_uint64", handler[map[int]uint64])
fs.Post("/Map_Int_uintptr", handler[map[int]uintptr])
fs.Post("/Map_Int_float32", handler[map[int]float32])
fs.Post("/Map_Int_float64", handler[map[int]float64])
fs.Post("/Map_Int_complex64", handler[map[int]complex64])
fs.Post("/Map_Int_complex128", handler[map[int]complex128])
fs.Post("/Map_Int_string", handler[map[int]string])
```

```go [Struct Types]
type voteInput struct {
  PostID int `json:"post_id"`
  Vote   int `json:"vote"`
  Extra  struct {
    Favorite bool `json:"favorite"`
    Comment  struct {
      Title string `json:"title"`
      Body  string `json:"body"`
    } `json:"comment"`
  } `json:"extra"`
}

type voteOutput struct {
  Summary string `json:"summary"`
  Status  string `json:"status"`
  Note    struct {
    Message string `json:"message"`
    Email   string `json:"email"`
  } `json:"note"`
}

// Struct
fs.Post("/voteInput", handler[voteInput])

// Pointer to struct
fs.Post("/Ptr_voteInput", handler[*voteInput])

// Array of struct
fs.Post("/Arr_voteInput", handler[[5]voteInput])

// Slice of struct
fs.Post("/Slice_voteInput", handler[[]voteInput])

// Slice of struct pointer
fs.Post("/PtrSlicePtr_voteInput", handler[*[]*voteInput])

// Pointer to slice of pointer to struct
fs.Post("/Ptr_SlicePtr_voteInput", handler[*[]*voteInput])

// Map of struct with string key
fs.Post("/Map_Str_voteInput", handler[map[string]voteInput])

// Map of pointer to struct with string key
fs.Post("/Map_Str_Ptr_voteInput", handler[map[string]*voteInput])

// Map of struct with int key
fs.Post("/Map_Int_voteInput", handler[map[int]voteInput])

// Mixed types

// Slice of slice of slice of struct
fs.Post("/Slice_Slice_Slice_voteInput", handler[[][][]voteInput])

// Slice of map of struct with string key
fs.Post("/Slice_Map_Str_voteInput", handler[[]map[string]voteInput])

// Any
fs.Post("/any", handler[any])

// Slice of any
fs.Post("/Slice_any", handler[[]any])

// Map of any
fs.Post("/Map_any", handler[map[string]any])

// Map of any with string key
fs.Post("/Map_Str_any", handler[map[string]any])

// Nested struct
fs.Post("/userme", handler[fs.User])
fs.Post("/testpost", handler[*testpost])

fs.Post("/version", func(c app.Context, input *voteInput) (voteOutput, error) {
	return voteOutput{
		Summary: "Vote has been casted",
		Status:  "success",
		Note: struct {
			Message string `json:"message"`
			Email   string `json:"email"`
		}{
			Message: "Thank you for voting",
			Email:   "support@local.ltd",
		},
	}, nil
})
```

:::

::: warning Content-Type
Currently, FastSchema only supports generating OpenAPI specification for `application/json` content type.
:::

## API Documentation

The OpenAPI spec is generated automatically by FastSchema. You can access the OpenAPI Spec with following URL:

- **API documentation:** `https://{your-domain}/docs/openapi.json`
- **OAS viewer:** `https://{your-domain}/docs`
