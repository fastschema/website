# Delete record

The delete record API endpoint allows you to delete a record from a schema. To delete a record, you need to send a `DELETE` request to the `/api/content/{schema}/{id}` endpoint.

**Example**

```http
DELETE /api/content/posts/1
```

The `DELETE` request deletes the record with the ID `1` from the `posts` schema.
