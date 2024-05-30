# List records

FastSchema use RQL to query the records. It supports various query parameters to enable you to filter, sort, and paginate the records.

To list the records, you can send a `GET` request to the `/api/content/{schema}` endpoint. The response will contain the list of records that match the query parameters.

## Pagination

Pagination allows users to retrieve resources in smaller, manageable chunks, reducing the response payload size and improving performance. It provides control over the number of resources returned in a single response, making it easier to navigate through large datasets.

To paginate the records, you can use the `limit` and `page` query parameters. The `limit` parameter specifies the number of records to return, while the `page` parameter specifies the page number.

**Example**

```http
GET /api/content/?filter={"name":{"$like":"%aaa%"}}&limit=2&page=2
```

::: details Example response

```json
{
  "data": {
    "total": 10,
    "per_page": 2,
    "current_page": 2,
    "last_page": 5,
    "items": [
      {
        "id": 8,
        "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "created_at": "2024-05-25T22:39:49Z"
      }
      {
        "id": 7,
        "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "created_at": "2024-05-25T22:39:49Z"
      }
    ]
  }
}
```

:::

::: tip Note
The default `limit` value is `10`, and the default `page` value is `1`. If you do not specify these parameters, the API will return the first 10 records.
:::

## Count

The count API allows users to retrieve the total count of resources that match specified filtering criteria without pagination. This feature is useful for obtaining an accurate count of resources that meet specific conditions, enabling users to perform analytics, generate reports, or gain insights into their data.

**Example**

```http
GET /api/content/post/?filter={"name":{"$like":"%aaa%"}}
```

::: tip Note
The count API will ignore the `limit`, `page` parameters and does not return the actual records. It only returns the total count of records that match the specified filtering criteria.
:::

## Select

The `select` query parameter allows you to specify which fields to include in the response. You can use the `select` parameter to retrieve only the fields you need, reducing the response payload size.

**Example**

```http
GET /api/content/post/?select=id,name,categories.name
```

::: details Example response

```json
{
  "data": [
    {
      "id": 1,
      "name": "Post 01",
      "categories": [
        {
          "name": "Category A"
        },
        {
          "name": "Category B"
        }
      ]
    },
    {
      "id": 2,
      "name": "Post 02",
      "categories": [
        {
          "name": "Category C"
        }
      ]
    }
  ]
}
```

:::

`select` also supports selecting the relationship fields. You can use the dot notation to select the fields of the related resources. In the example above, we are selecting the `name` field of the `categories` relationship.

::: danger Note
The selection of relationship fields does not support nested relationships.
:::

## Sort

The `sort` query parameter allows you to specify the sorting order of the records.

The `sort` parameter accepts a string containing the field name and the sorting direction. By default, the sorting direction is ascending. You can change the sorting direction by adding a prefix (`-` for descending, `+` for ascending).

- **Ascending**: `GET /api/content/post/?sort=name`
- **Descending**: `GET /api/content/post/?sort=-name`

## Filter

The `filter` query parameter allows you to filter the records based on specific criteria.

The `filter` parameter accepts an object containing the filter criteria based on the schema fields.

**Example**

```http
GET /api/content/post/?filter={"name":{"$like":"%post01%"},"categories.name":{"$like":"%category01%"}}
```

### Simple filter object

```json
{
  // (1) Match the field exactly
  "country": "USA",
  // (2) Multiple AND conditions
  "name": {
    "$like": "test%",
    "$neq": "test2"
  }
}
```

A simple filter object contains the field names as keys and the filter criteria as values. The filter criteria can be one of the following:

- A value to match the field exactly. For example, `(1)` filters the records with `country = 'USA'`.
- An object containing multiple `AND` conditions. For example, `(2)` filters the records with `name LIKE 'test%' AND name != 'test2'`.

All the filter criteria in the filter object are combined using the `AND` operator. For example, `(1)` and `(2)` are combined using the `AND` operator.

```sql
country = 'USA' AND (name LIKE 'test%' AND name != 'test2')
```

### Complex filter object

```json{7-32}
{
  "country": "USA",
  "name": {
    "$like": "test%",
    "$neq": "test2"
  },
  "$or": [
    {
      "email": {
        "$like": "test%",
        "$neq": "test2"
      },
      "age": {
        "$lt": 10
      }
    },
    {
      "age": 5
    },
    {
      "$and": [
        {
          "name": {
            "$neq": "test2"
          }
        },
        {
          "age": 15
        }
      ]
    }
  ]
}
```

A complex filter object is similar to a simple filter object but contains additional logical operators (`$or`, `$and`) to combine multiple filter criteria.

`$and` operator combines multiple filter criteria using the `AND` operator.

`$or` operator combines multiple filter criteria using the `OR` operator. For example, the above filter object filters the records with the following conditions:

```sql
country = 'USA' AND (name LIKE 'test%' AND name != 'test2') AND (
  (email LIKE 'test%' AND email != 'test2' AND age < 10) OR
  (age = 5) OR
  (name != 'test2' AND age = 15)
)
```

::: tip Filter by relationship fields

You can filter the records based on the fields of the related resources. You can use the dot notation to filter the fields of the related resources. For example, to filter the records based on the `name` field of the `categories` relationship:

```json{5-7}
{
  "name": {
    "$like": "%post01%"
  },
  "categories.name": {
    "$like": "%category01%"
  }
}
```

:::

## Supported operators

### $eq

The `$eq` operator matches the field exactly.

### $neq

The `$neq` operator matches the field that is not equal to the specified value.

### $gt and $gte

The `$gt` operator matches the field that is greater than the specified value. The `$gte` operator matches the field that is greater than or equal to the specified value.

### $lt and $lte

The `$lt` operator matches the field that is less than the specified value. The `$lte` operator matches the field that is less than or equal to the specified value.

### $like

The `$like` operator performs a string matching with wildcard support. You can use the `%` wildcard to match any sequence of characters.

### $in

The `$in` operator matches the field that is in the specified array.

```json
{
  "name": {
    "$in": ["John", "Doe"]
  }
}
```

### $nin

The `$nin` operator matches the field that is not in the specified array.

```json
{
  "name": {
    "$nin": ["John", "Doe"]
  }
}
```

### $null

The `$null` operator checks for null values.

```json
{
  "name": {
    "$null": true
  }
}
```

### $and

The `$and` operator combines multiple filter criteria using the `AND` operator.

### $or

The `$or` operator combines multiple filter criteria using the `OR` operator.

::: tip Supported data types
`$eq`, `$neq`, `$gt`, `$gte`, `$lt`, `$lte` operators support the following data types:

- String
- Number
- Boolean
- Date

:::

## Known issues

When filtering `$neq` operation on a `m2m` relation field, the relation is not filtered properly.

**For example:**

Assume that we have two schemas `post`, `tag` and the `post.tags` field is a `m2m` relation to the `tag.posts` field.

We want to filter the posts that do not have the tag with `id: 10001`.

```http
GET http://localhost:8000/api/content/post?select=id \

&filter={"tags.id":{"$neq":10001}}
```

The expected result should return the posts that:

- Have no tags.
- Have tags other than the tag with `id: 10001`.

The above request will perform the following SQL query, that is wrong:

```sql
SELECT * FROM `posts`
WHERE `posts`.`id` IN (
  SELECT `posts_tags`.`posts`
  FROM `posts_tags`
  JOIN `tags` AS `t1`
  ON `posts_tags`.`tags` = `t1`.`id`
  WHERE `id` <> 10001
)
ORDER BY `id` DESC
```

::: danger The problem

The above SQL query try to filter the `tags.id` from the join table `posts_tags`. This is incorrect because the join table is just storing the information for the posts that have the tags.

So, the posts that do not have any tags will not be returned in the result.

:::

The correct SQL query should be:

```sql
SELECT * FROM `posts`
WHERE `posts`.`id` NOT IN (
  SELECT `posts_tags`.`posts`
  FROM `posts_tags`
  JOIN `tags` AS `t1`
  ON `posts_tags`.`tags` = `t1`.`id`
  WHERE `id` = 10001
)
ORDER BY `id` DESC
```
