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
  "category": { "id": 3 },
  "tags": [{ "id": 4 }, { "id": 5 }]
}
```

A simple field update contains the schema field names as keys and the new values as values. The `new values` can be one of the following:

- A simple value to update the field. For example, the above update data updates the `name` field to `Updated Post` and the `priority` field to `2`.
- An object containing the new value for the relation field. For example, the above updates the `category` field to the category with `id: 3` and the `tags` field to the tags with `id: 4` and `id: 5`.

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
    "category": { "id": 3 }
  },
  "$clear": {
    "tags": true
  },
  "$add": {
    "tags": [{ "id": 4 }, { "id": 5 }]
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
    "category": { "id": 3 },
    "tags": [{ "id": 4 }, { "id": 5 }]
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
    - Set the `category` field to `{ "id": 3 }`.
  - Multiple relation fields (array of entity):
    - Set the `tags` field to `[{ "id": 4 }, { "id": 5 }]`.

## $clear operation

The `$clear` operation allows you to clear the value of a field, including relation fields.

**Example**

```json
{
  "$clear": {
    "description": true,
    "category": true,
    "tags": [{ "id": 4 }]
  }
}
```

The `$clear` property accepts an object with the field names as keys and the values as one of the following:

- `true`: Clear the field value.
  - Clear a simple field: Set the `description` field to `null`.
  - Clear all the relation fields: Set the `category` to empty.
- An array of objects: Clear the specific items from the `o2m` or `m2m` relation field.
  - Remove the `[ { "id": 4 } ]` from the `tags` relation field.

## $add operation

The `$add` operation allows you to increment a numeric field or add new items to the `o2m` or `m2m` relation fields.

**Example**

```json
{
  "$add": {
    "views": 1,
    "tags": [{ "id": 4 }, { "id": 5 }]
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

To update a user record with ID `1` with the new data:

::: code-group

```http [Header]
POST /api/content/post
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
  "room": { "id": 2 },
  "pets": [ { "id": 2 }, { "id": 3 } ],
  "groups": [ { "id": 4 }, { "id": 5 } ],
  "$set": {
    "bio": "Hello World",
    "address": "123 Main St",
    "department": { "id": 2 },
    "roles": [ { "id": 2 }, { "id": 3 } ],
    "projects": [ { "id": 4 }, { "id": 5 } ]
  },
  "$clear": {
    "bio": true,
    "address": true,
    "room": true,
    "roles": true,
    "projects": true,
    "pets": [ { "id": 2 }, { "id": 3 } ],
    "groups": [ { "id": 4 }, { "id": 5 } ]
  },
  "$add": {
    "pets": [ { "id": 2 }, { "id": 3 } ],
    "groups": [ { "id": 4 }, { "id": 5 } ],
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
