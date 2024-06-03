A field is a single piece of data that is stored for each item in the CMS. Fields can be of different types, such as text, number, date, or relationship. Each field has a name, type, and other properties that define how the data should be stored and displayed.

::: details type (\*)

The type of the field. This can be one of the following values:

- `bool`: A boolean value that can be true or false.
- `time`: A time value that includes both date and time.
- `json`: A JSON object that can store any type of data.
- `uuid`: A unique identifier that is generated automatically.
- `bytes`: A byte array that can store binary data.
- `enum`: An enumeration of values that can be selected from a list. Enum fields have an additional property called `enums` that defines the possible values for the field.
- `string`: A string value that can store short text.
- `text`: A text value that can store long text.
- `int`: An integer value.
- `int8`: A 8-bit integer value.
- `int16`: A 16-bit integer value.
- `int32`: A 32-bit integer value.
- `int64`: A 64-bit integer value.
- `uint`: An unsigned integer value.
- `uint8`: A 8-bit unsigned integer value.
- `uint16`: A 16-bit unsigned integer value.
- `uint32`: A 32-bit unsigned integer value.
- `uint64`: A 64-bit unsigned integer value.
- `float32`: A 32-bit floating point value.
- `float64`: A 64-bit floating point value.
- `relation`: A relationship to another schema. Relation fields have an additional property called `relation` that defines the relationship between the field and another schema.
- `file`: A special type of `relation` field that represents a file upload that alway has a relationship to the `file` schema.

:::

::: details name (\*)

The name of the field. This is used to identify the field in the CMS and must be unique within the schema.

:::

::: details label (\*)

The label of the field. This is used to display the field in the CMS and should be a human-readable name.

:::

::: details multiple

A boolean value that determines whether the field can store multiple values. Currently, it only take effect in `file` field.

:::

::: details size

The size of the field. This is used to determine the maximum length of the field and is used to define the size of the field in the database.

:::

::: details unique

A boolean value that determines whether the field should be unique. If a field is unique, each value in the field must be unique within the schema.

:::

::: details optional

A boolean value that determines whether the field is optional. If a field is optional, it can be null.

:::

::: details default

The default value of the field. This is used to set a default value for the field if no value is provided.

There are some special default values that can be used for specific field types:

- `NOW()`: The current date and time.
- `time in RFC3339`: Will be parsed to the time.Time value.

:::

::: details sortable

A boolean value that determines whether the field can be used to sort items in the CMS.

:::

::: details filterable

A boolean value that determines whether the field can be used to search for items in the CMS.

:::

::: details optional

A boolean value that determines whether the field is optional. If the relationship is optional, the field can be null.

:::

::: details is_system_field

A boolean value that determines whether the field is a system field.

A system field is a field that was created from Go code.

A field that was created by user from the Admin or JSON file is not a system field.

A system field can only be extended and cannot be deleted.
:::

::: details is_locked

A boolean value that determines whether the field is locked.

A locked field cannot be modified through the API and can only be modified by the Go code.
:::

::: details renderer

Is used to determine the field renderer in the frontend for the field.

`renderer` accept an object that has the following properties: - `class`: The class name of the field renderer. - `settings`: a key-value object that hold the settings for the field renderer.

:::

::: details enums

Use for `enum` field. It accept an array of object that represent the possible values for the field. Each object has the following properties:

- `value`: The value of the enum.
- `label`: The label of the enum.

:::

::: details relation

Use for `relation` field. It accept an object that represent the relationship between the field and another schema. It has the following properties:

- `schema`: The name of the schema that the field is related to.
- `field`: The name of the field in the related schema that the field is related to.
- `type`: The type of the relationship. This can be one of the following values:
  - `o2o`: A one-to-one relationship where each item in the schema is related to one item in the related schema.
  - `o2m`: A one-to-many relationship where each item in the schema is related to multiple items in the related schema.
  - `m2m`: A many-to-many relationship where multiple items in the schema are related to multiple items in the related schema.
- `owner`: A boolean value that determines whether the field is the owner of the relationship, only take effect in `o2m` and `o2o` relationship.

  **The schema that hold the foreign key will have `owner=false`**

  For example, field `post.category` that is o2m relationship to `category.posts` field.

  The post schema will has a foreign key to the category schema: `category_id`, so the field `category.posts` will be the owner of the relationship and `category.posts` will have `owner=true`.

- `fk_columns`: Use to override the default foreign key column name. By default, the foreign key column name is the name of the related schema with `_id` suffix.

  **For example:** field `post.category` that is o2m relationship to `category.posts` field. The default foreign key column name is `category_id`, but you can override it to `cat_id` by setting `fk_columns` to `{"target_column": "cat_id"}`.

:::

::: details db

The database configuration for the field. It accept an object that has the following properties:

- `attr`: A string that represent the field attributes in the database.
- `collation`: A string that represent the collation of the field in the database: utf8mb4_unicode_ci, utf8mb4_general_ci,...
- `increment`: A boolean value that determines whether the field is auto-incremented.
- `key`: A string that represent the key of the field in the database: PRI, UNI or MUL.
  :::
