# Bulk Update

The buld update API endpoint allows you to update multiple records in a schema. To update multiple records, you need to send a `PUT` request to the `/api/content/{schema}/update` endpoint with a filter query and the update data in the request body.

## Update filter

The `filter` query is a JSON object that contains the filter conditions to select the records to update.

**Example**

```http
PUT /api/content/post/?filter={"name":{"$like":"%post01%"},"categories.name":{"$like":"%category01%"}}
```

For more information on the filter query, see the [filter records](/docs/headless-cms/list-records.html#filter) documentation.

::: danger IMPORTANT

The bulk update API endpoint will update all records that match the filter query. Make sure to use the filter query carefully to avoid updating unintended records.

:::

## Update data

The update data is a JSON object that contains the field data to update or the update operations to perform.

Refer to the [update record](/docs/headless-cms/update-record.html#update-data) documentation for more information on the supported update operations and the update data format.

## Response

The bulk update API endpoint returns the number of records updated in the response body.
