# Bulk Delete

The buld delete API endpoint allows you to delete multiple records in a schema. To delete multiple records, you need to send a `DELETE` request to the `/api/content/{schema}/delete` endpoint with a filter query to select the records to delete.

## Delete filter

The `filter` query is a JSON object that contains the filter conditions to select the records to delete.

**Example**

```http
DELETE /api/content/post/?filter={"name":{"$like":"%post01%"},"categories.name":{"$like":"%category01%"}}
```

For more information on the filter query, see the [filter records](/docs/backend/list-records.html#filter) documentation.

::: danger IMPORTANT

The bulk delete API endpoint will delete all records that match the filter query. Make sure to use the filter query carefully to avoid deleting unintended records.

:::

## Response

The bulk update API endpoint returns the number of records updated in the response body.
