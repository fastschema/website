# System Schema

## Userschema

A UserSchema is a schema created by users through the Admin UI. It is stored in JSON format, can be used to generate database table and is't represented by a Go struct.

For more information, see [Schema](/docs/concepts.html#schema).

From now on, we will refer to the `UserSchema` as `Schema`.

## SystemSchema

A System Schema is a Schema generated from a Go struct, designed to store system-level data such as users, roles, and permissions.

A System Schema can also be used to define any Schema from within the Go code.

System Schemas are created exclusively through Go code and cannot be deleted. However, they can be extended by users via the Admin UI.

**Example:**

::: code-group

```go [Go Struct]
type Category struct {
  Name  string `json:"name"`
  Slug  string `json:"slug"`
}
```

```json [Output Schema]
{
  "name": "category",
  "namespace": "categories",
  "label_field": "name",
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

## Schema generation

A `System Schema` itself is just a Go Struct, and is not a valid `schema.Schema` object. FastSchema will generate an actual Schema object from the Go struct, following the rules below.

- `name`: Created using the snake case of the struct name. For example,

  `Category` -> `category`.

- `namespace`: Created using the plural form of the schema name. For example,

  `category` -> `categories`.
- `label_field`: Using the first string field in the struct.
- `fields`: An array of fields in the struct.
  - `type`: Field type is created based on the Go type of the field.
  - `name`: Field name is created using the snake case of the field name.
  - `label`: Field label is created using the field name.

::: warning
The `label_field` is required for all system schemas. If the struct does not have a string field, an error will be thrown.

Only the exported fields of the struct are considered for the schema fields.

Field that has a tag `json:"-"` will be ignored.
:::

## Customize schema

<!--@include: ../../../partials/database/customize_schema.md-->

## Customize field

<!--@include: ../../../partials/database/customize_field.md-->
