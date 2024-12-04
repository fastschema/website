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

A field can also be customized using [Customize schema using a struct method](/docs/framework/database/system-schema.html#customize-schema-using-a-struct-method)
:::

### Customize with tag `fs.setter`

::: warning

`fs.setter` and `fs.getter` tags must by a valid [expr](https://github.com/expr-lang/expr) expression that return the desired value.

The expression can access the following variables:
- $db: Provides access to the database instance, enabling queries.
- $context: The context object.
- $args: Includes custom arguments passed to the rule:
    - Schema: The schema object.
    - Entity: The entity object.
    - Value: The field value before applying the setter/getter.
    - Exist: A boolean value that indicates whether the field value exists.
:::

`fs.setter` tag is used to define the setter method for the field. This method will be called before the schema object is saved to the database.

Using the `fs.setter` tag, you will be able to customize the field value before saving it to the database.

Some common use cases for the setter method are:

- Setting the default value for the field.
- Formatting the field value before saving it to the database.
- Encrypting the field value before saving it to the database.

**Example:**

*Set the author field to the current user ID*

```go [Go Struct]
type Blog struct {
  Author *Author* `json:"author" fs.setter:"$context.Value('user').ID"`
}
```

*Set the encrypted password field*

```go [Go Struct]
type User struct {
  Password string `json:"password" fs.setter:"fs.setter:"$args.Exist && $args.Value != '' ? $hash($args.Value) : $undefined"`
}
```


### Customize with tag `fs.getter`

`fs.getter` tag is used to define the getter method for the field. This method will be called before the schema object is returned to the client.

Using the `fs.getter` tag, you will be able to customize the field value before returning it to the client.

Some common use cases for the getter method are:

- Hiding sensitive information from the client.
- Formatting the field value before returning it to the client.
- Decrypting the field value before returning it to the client.

**Example:**

*Hide the password field*

```go [Go Struct]
type User struct {
  Password string `json:"password" fs.getter:"$undefined"`
}
```
