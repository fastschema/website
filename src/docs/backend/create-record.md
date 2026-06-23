# Create record

The create record API endpoint allows you to create a new record in a schema. To create a record, you need to send a `POST` request to the `/api/content/{schema}` endpoint with the record data in the request body.

**Example**

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
  "name": "Example Post",
  "priority": 1,
  "category": { "id": "550e8400-e29b-41d4-a716-446655440001" },
  "tags": [{ "id": "550e8400-e29b-41d4-a716-446655440002" }, { "id": "550e8400-e29b-41d4-a716-446655440003" }]
}
```

```json [Response]
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Example Post",
    "priority": 1,
    "category": { "id": "550e8400-e29b-41d4-a716-446655440001", "name": "Category 1" },
    "tags": [
      { "id": "550e8400-e29b-41d4-a716-446655440002", "name": "Tag 2" },
      { "id": "550e8400-e29b-41d4-a716-446655440003", "name": "Tag 3" }
    ],
    "created_at": "2024-06-01T00:00:00Z",
    "updated_at": "2024-06-01T00:00:00Z"
  }
}
```
:::

The request body is a JSON object with the schema fields as keys and their values. The values can be simple or complex objects based on the field type. For example:
- The `name` field is a simple string value.
- The `priority` field is a simple integer value.
- The `category` field is a `o2m` relation field and we are going to attach the category with the specified UUID to the post.
- The `tags` field is a `m2m` relation field and we are going to attach multiple tags with the specified UUIDs to the post.
