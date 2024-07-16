A Go struct contains very limited information for the schema generation. To provide more information about the schema, you can use one of the following methods:

### Customize schema using an unexported field with tag `fs`

```go{2}
type Category struct {
  _           any    `json:"-" fs:"label_field=slug"`
  Name        string `json:"name"`
  Slug        string `json:"slug"`
}
```

`fs` tag is a string that contains a list of properties separated by a semicolon. Each property is in the format `key=value`.

**Using the `fs` tag, you can customize the schema with the following properties:**

- `name`: Custom the schema name.
- `namespace`: Custom the schema namespace.
- `label_field`: Custom the label field.
- `disable_timestamp`: Disable the timestamp fields.
- `db`: Custom the DB index and unique constraint for the table.

**Example:**

::: code-group

```go [Go Struct]
type Category struct {
  _     any    `json:"-" fs:"name=cat;namespace=cats;label_field=slug"`
  Name  string `json:"name"`
  Slug  string `json:"slug"`
}
```

```json [Output Schema]
{
  "name": "cat",
  "namespace": "cats",
  "label_field": "slug",
  "fields": [
    {
      "type": "string",
      "name": "name",
      "label": "Name"
    },
    {
      "type": "string",
      "name": "slug",
      "label": "Slug"
    }
  ]
}
```

:::

**Additionally, you can use the `fs.db` tag to customize the DB index and unique constraint for the table.**
:::warning
The value of `fs.db` tag must be a valid [HJSON](https://github.com/hjson/hjson-go) string and satisfy the `schema.SchemaDB` type.
:::

::: code-group

```go [fs.db tag]
`fs.db:"{'indexes':[{'name':'idx_name','columns':['name'],'unique':true}]}"`
```

```json [Output Schema]
{
  "db": {
    "indexes": [
      {
        "name": "idx_name",
        "columns": ["name"],
        "unique": true
      }
    ]
  }
}
```

:::

### Customize schema using the `Schema()` method

A struct that implements the `CustomizableSchema` interface can return a custom schema information. These information will be merged with the generated schema.

::: code-group

```go{2} [schema.CustomizableSchema]
type CustomizableSchema interface {
	Schema() *Schema
}
```

:::

Using the `Schema()` method brings more flexibility to customize the schema. You can customize any part of the schema, such as the schema name, namespace, label field, DB, etc.

- `Name`: Custom the schema name
- `Namespace`: Custom the schema namespace
- `LabelField`: Custom the label field
- `Fields`: Custom the fields

::: warning Customize Fields using Schema method
The fields in the schema method will only be used to override the existing fields in the struct.

The updated fields in the schema method will be matched with the fields in the struct based on the field name.

If there are any fields returned by the schema method that are not in the struct, they will be ignored.

If you want to add new fields, you need to include them in the struct.
:::

**Example:**

::: code-group

```go [Go Struct]
type Category struct {
  Name  string `json:"name"`
  Slug  string `json:"slug"`
}

func (c Category) Schema() *Schema {
  return &Schema{
    Name: "cat",
    Namespace: "cats",
    LabelField: "slug",
    Fields: []*Field{
      {
        Type: "string",
        Name: "name",
        Label: "Category Name",
      },
      {
        Type: "string",
        Name: "slug",
        Label: "Category slug",
      },
    },
  }
}
```

```json [Output Schema]
{
  "name": "cat",
  "namespace": "cats",
  "label_field": "slug",
  "fields": [
    {
      "type": "string",
      "name": "name",
      "label": "Category Name"
    },
    {
      "type": "string",
      "name": "slug",
      "label": "Category Slug"
    }
  ]
}
```

::: danger IMPORTANT

A System Schema can be customized using both the `fs` tag and the `Schema()` method. If both are used, the `Schema()` method will override the `fs` tag.

:::
