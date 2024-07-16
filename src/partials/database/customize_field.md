A Go struct property includes only the field name and type, which is quite limited.

In contrast, a Schema Field contains additional properties that allow for greater customization (see [Field](/docs/concepts.html#field)).

FastSchema enables you to provide more detailed information about the field using `struct tags` for customization.

### Customize with tag `json`

`json` tag is used to marshal and unmarshal the field value to/from JSON string.

FastSchema uses the `json` tag to customize the field `name`.

### Customize with tag `fs`

`fs` tag is a string that contains a list of properties separated by a semicolon. Each property is in the format `key=value`.

**Using the `fs` tag, you can customize the field with the following properties:**

- `label_field`: Select the field as the schema label field.
- `type`: Custom the field type, refer to [Field](/docs/concepts.html#field) for the list of available types.
- `label`: Custom the field label.
- `size`: Custom the field size.
- `multiple`: Custom the field to accept multiple values. Only field with type `file` supports this property.
- `unique`: Flag the field as unique.
- `optional`: Allow the field to be optional.
- `sortable`: Allow the field to be sortable through the API.
- `filterable`: Allow the field to be filterable through the API.
- `default`: Set the default value for the field.

**Example:**

::: code-group

```go [Go Struct]
type Category struct {
  Slug  string `json:"slug" fs:"unique;size=255;label=Url"`
  Name  string `json:"name" fs:"label_field;filterable`
  Views int    `json:"views" fs:"type=uint64;optional;sortable"`
  Note  string `json:"note" fs:"optional;default=Empty Note"`
  Image any    `json:"image" fs:"type=file;multiple;optional"`
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
      "name": "slug",
      "label": "Url",
      "size": 255,
      "unique": true
    },
    {
      "type": "string",
      "name": "name",
      "label": "Name",
      "filterable": true
    },
    {
      "type": "uint64",
      "name": "views",
      "optional": true,
      "sortable": true
    },
    {
      "type": "string",
      "name": "note",
      "optional": true,
      "default": "Empty Note"
    },
    {
      "type": "file",
      "name": "image",
      "multiple": true,
      "optional": true
    }
  ]
}
```
:::

### Customize with tag `fs.enums`

`fs.enums` tag is used to define the list of enum values for the field if the field type is `enum`.

The value of `fs.enums` tag must meet the following criteria:

- A valid [HJSON](https://github.com/hjson/hjson-go) string.
- Represent the `[]*schema.FieldEnum` type.

**Example:**

::: code-group

```go [Go Struct]
type Category struct {
  Status string `json:"status" fs:"type=enum" fs.enums:"[{'value':'active','label':'Active'},{'value':'inactive','label':'Inactive'}]"`
}
```

```hjson [Formatted HJSON]
[
  {
    'value': 'active',
    'label': 'Active'
  },
  {
    'value': 'inactive',
    'label': 'Inactive'
  }
]
```

```json [Output Schema]
{
  "name": "category",
  "namespace": "categories",
  "label_field": "name",
  "fields": [
    {
      "type": "enum",
      "name": "status",
      "enums": [
        {
          "value": "active",
          "label": "Active"
        },
        {
          "value": "inactive",
          "label": "Inactive"
        }
      ]
    }
  ]
}
```

:::

### Custom with tag `fs.relation`

`fs.relation` tag is used to define the relation between the field and another schema.

The value of `fs.relation` tag must meet the following criteria:

- A valid [HJSON](https://github.com/hjson/hjson-go) string.
- Represent the `*schema.Relation` type.

**Example:**

::: code-group

```go [Go Structs]
type Tag struct {
  Name  string  `json:"name"`
  Blogs []*Blog `json:"blogs" fs.relation:"{'type':'m2m','schema':'blog','field':'tags','owner':true}"`
}

type Blog struct {
  Name  string `json:"name"`
  Tags  []*Tag `json:"tags" fs.relation:"{'type':'m2m','schema':'tag','field':'blogs'}"`
}
```

```hjson [Formatted HJSONs]
// tag.blogs
{
  'type': 'm2m',
  'schema': 'blog',
  'field': 'tags',
  'owner': true
}

// blog.tags
{
  'type': 'm2m',
  'schema': 'tag',
  'field': 'blogs'
}
```

```json [Output Schemas]
// data/schemas/tag.json
{
  "name": "tag",
  "namespace": "tags",
  "label_field": "name",
  "fields": [
    {
      "type": "string",
      "name": "name"
    },
    {
      "type": "m2m",
      "name": "blogs",
      "relation": {
        "type": "m2m",
        "schema": "blog",
        "field": "tags",
        "owner": true
      }
    }
  ]
}

// data/schemas/blog.json
{
  "name": "blog",
  "namespace": "blogs",
  "label_field": "name",
  "fields": [
    {
      "type": "string",
      "name": "name"
    },
    {
      "type": "m2m",
      "name": "tags",
      "relation": {
        "type": "m2m",
        "schema": "tag",
        "field": "blogs"
      }
    }
  ]
}
```

:::

### Customize with tag `fs.renderer`

`fs.renderer` tag is used to define the frontend renderer for the field.

The value of `fs.renderer` tag must meet the following criteria:

- A valid [HJSON](https://github.com/hjson/hjson-go) string.
- Represent the `*schema.FieldRenderer` type.

**Example:**

::: code-group

```go [Go Struct]
type Blog struct {
  Name    string `json:"name"`
  Content string `json:"content" fs.renderer:"{'class':'editor','settings':{'height':500}}"`
}

```

```hjson [Formatted HJSON]
{
  'class': 'editor',
  'settings': {
    'height': 500
  }
}
```

```json [Output Schema]
{
  "name": "blog",
  "namespace": "blogs",
  "label_field": "name",
  "fields": [
    {
      "type": "string",
      "name": "name"
    },
    {
      "type": "string",
      "name": "content",
      "renderer": {
        "class": "editor",
        "settings": {
          "height": 500
        }
      }
    }
  ]
}
```

:::

### Customize with tag `fs.db`

`fs.db` tag is used to define the database properties for the field.

The value of `fs.db` tag must meet the following criteria:

- A valid [HJSON](https://github.com/hjson/hjson-go) string.
- Represent the `*schema.FieldDB` type.

**Example:**

::: code-group

```go [Go Struct]
type Blog struct {
  Name    string `json:"name" fs.db:"{'collation':'utf8mb4_unicode_ci','key':'PRIMARY'}"`
}
```

```hjson [Formatted HJSONs]
{
  'collation': 'utf8mb4_unicode_ci',
  'key': 'PRIMARY'
}
```

```json [Output Schema]
{
  "name": "blog",
  "namespace": "blogs",
  "label_field": "name",
  "fields": [
    {
      "type": "string",
      "name": "name",
      "db": {
        "collation": "utf8mb4_unicode_ci",
        "key": "PRIMARY"
      }
    }
  ]
}
```

:::

::: tip

A field can also be customized using [Customize schema using a struct method](/docs/web-framework/database/system-schema.html#customize-schema-using-a-struct-method)
:::
