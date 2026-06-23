# Update record

The update record API endpoint allows you to update an existing record in a schema. To update a record, you need to send a `PUT` request to the `/api/content/{schema}/{id}` endpoint with the update data in the request body.

## Supported operations

The update record API supports a variety of update operations, includes:

- Update a single field.
- Updating `o2o` and `o2m` relation fields.
- Adding and removing items from `m2m` relation fields.
- Clearing the value of a field.
- Performing expressions-based updates.

## Update data

The update data is a JSON object that contains the field data to update or the update operations to perform.

### Simple field update

To update a single field, you can provide the field name and the new value in the update data.

**Example**

```json
{
  "name": "Updated Post",
  "priority": 2,
  "category": { "id": "550e8400-e29b-41d4-a716-446655440001" },
  "tags": [{ "id": "550e8400-e29b-41d4-a716-446655440002" }, { "id": "550e8400-e29b-41d4-a716-446655440003" }]
}
```

A simple field update contains the schema field names as keys and the new values as values. The `new values` can be one of the following:

- A simple value to update the field. For example, the above update data updates the `name` field to `Updated Post` and the `priority` field to `2`.
- An object containing the new value for the relation field. For example, the above updates the `category` field to the category with the specified UUID and the `tags` field to the tags with the specified UUIDs.

### Operation-based update

To perform an operation-based update, you can use the operation as the key and the operation data as the value in the update data.

Supported operations:

- `$set`
- `$clear`
- `$add`
- `$expr`

**Example**

```json
{
  "$set": {
    "name": "Updated Post",
    "priority": 2,
    "category": { "id": "550e8400-e29b-41d4-a716-446655440001" }
  },
  "$clear": {
    "tags": true
  },
  "$add": {
    "tags": [{ "id": "550e8400-e29b-41d4-a716-446655440002" }, { "id": "550e8400-e29b-41d4-a716-446655440003" }]
  },
  "$expr": {
    "views": "views + 1",
    "description": "CONCAT(description, ' Updated')"
  }
}
```

## $set operation

The `$set` operation allows you to update the field with the new value.

**Example**

```json
{
  "$set": {
    "name": "Updated Post",
    "priority": 2,
    "category": { "id": "550e8400-e29b-41d4-a716-446655440001" },
    "tags": [{ "id": "550e8400-e29b-41d4-a716-446655440002" }, { "id": "550e8400-e29b-41d4-a716-446655440003" }]
  }
}
```

The $set property accepts an object with:

- The field names as keys: The field can be a simple field or a relation field.
- The new values as values: The new values can be simple values or objects for relation fields.
  - A simple value:
    - Set the `name` field to `Updated Post`.
    - Set the `priority` field to `2`.
  - A single relation field (single entity):
    - Set the `category` field to `{ "id": "550e8400-e29b-41d4-a716-446655440001" }`.
  - Multiple relation fields (array of entity):
    - Set the `tags` field to `[{ "id": "550e8400-e29b-41d4-a716-446655440002" }, { "id": "550e8400-e29b-41d4-a716-446655440003" }]`.

## $clear operation

The `$clear` operation allows you to clear the value of a field, including relation fields.

**Example**

```json
{
  "$clear": {
    "description": true,
    "category": true,
    "tags": [{ "id": "550e8400-e29b-41d4-a716-446655440002" }]
  }
}
```

The `$clear` property accepts an object with the field names as keys and the values as one of the following:

- `true`: Clear the field value.
  - Clear a simple field: Set the `description` field to `null`.
  - Clear all the relation fields: Set the `category` to empty.
- An array of objects: Clear the specific items from the `o2m` or `m2m` relation field.
  - Remove the specified UUIDs from the `tags` relation field.

## $add operation

The `$add` operation allows you to increment a numeric field or add new items to the `o2m` or `m2m` relation fields.

**Example**

```json
{
  "$add": {
    "views": 1,
    "tags": [{ "id": "550e8400-e29b-41d4-a716-446655440002" }, { "id": "550e8400-e29b-41d4-a716-446655440003" }]
  }
}
```

The `$add` property accepts an object with the field names as keys and the values as one of the following:

- A numeric value: Increment the `views` field by `1`.
- An array of objects: Add new items to the `o2m` or `m2m` relation fields.

## $expr operation

The `$expr` operation allows you to perform expressions-based updates on the fields.

**Example**

```json
{
  "$expr": {
    "views": "views + 1",
    "description": "CONCAT(description, ' Updated')"
  }
}
```

The `$expr` property accepts an object with the field names as keys and the values as the expressions to update the field.

The values of the `$expr` property must be a valid SQL expression that can be evaluated by the database.

## Example

To update a user record with a new data:

::: code-group

```http [Header]
PUT /api/content/post/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: en;q=0.9,ja;q=0.8
Authorization: Bearer <jwt token>
Cache-Control: max-age=0
Connection: keep-alive
Content-Type: application/json;charset=utf-8
Cookie: token=<jwt token>
Host: localhost:8000
Referer: http://localhost:8000/dash/
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
```

```json [Body]
{
  "name": "John Doe",
  "age": 30,
  "room": { "id": "550e8400-e29b-41d4-a716-446655440010" },
  "pets": [ { "id": "550e8400-e29b-41d4-a716-446655440011" }, { "id": "550e8400-e29b-41d4-a716-446655440012" } ],
  "groups": [ { "id": "550e8400-e29b-41d4-a716-446655440013" }, { "id": "550e8400-e29b-41d4-a716-446655440014" } ],
  "$set": {
    "bio": "Hello World",
    "address": "123 Main St",
    "department": { "id": "550e8400-e29b-41d4-a716-446655440020" },
    "roles": [ { "id": "550e8400-e29b-41d4-a716-446655440021" }, { "id": "550e8400-e29b-41d4-a716-446655440022" } ],
    "projects": [ { "id": "550e8400-e29b-41d4-a716-446655440023" }, { "id": "550e8400-e29b-41d4-a716-446655440024" } ]
  },
  "$clear": {
    "bio": true,
    "address": true,
    "room": true,
    "roles": true,
    "projects": true,
    "pets": [ { "id": "550e8400-e29b-41d4-a716-446655440011" }, { "id": "550e8400-e29b-41d4-a716-446655440012" } ],
    "groups": [ { "id": "550e8400-e29b-41d4-a716-446655440013" }, { "id": "550e8400-e29b-41d4-a716-446655440014" } ]
  },
  "$add": {
    "pets": [ { "id": "550e8400-e29b-41d4-a716-446655440011" }, { "id": "550e8400-e29b-41d4-a716-446655440012" } ],
    "groups": [ { "id": "550e8400-e29b-41d4-a716-446655440013" }, { "id": "550e8400-e29b-41d4-a716-446655440014" } ],
    "age": 1,
    "salary": 1000
  },
  "$expr": {
    "bio": "LOWER(`bio`)",
    "address": "CONCAT(`address`, ' ', `city`, ' ', `state`, ' ', `zip`)"
  }
}
```

:::
