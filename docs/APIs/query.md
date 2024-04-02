---
sidebar_position: 1
---

# Query

Fastschema use RQL (Resource Query Language) to query the data. RQL is a query language that allows you to query the data in a flexible way. You can filter, sort, paginate, include, select, and more.

## Pagination

Pagination allows users to retrieve resources in smaller, manageable chunks, reducing the response payload size and improving performance. It provides control over the number of resources returned in a single response, making it easier to navigate through large datasets.

Pagination supports the following query parameters:
- **page**: The page number to retrieve.
- **limit**: The number of resources to return per page.

## Select

This feature allows users to specify which fields they want to include in the response when fetching resources. It provides flexibility in tailoring the response payload to include only the necessary fields, reducing unnecessary data transfer.

#### Example

To select specific fields for users, such as id, name, and categories.name, the following RQL query can be used:

```
GET /api/posts/?select=id,name,categories.name
```

**Response**

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

## Sort

Sorting allows users to specify the order in which resources should be returned based on the values of a particular field. This feature provides control over the presentation of data and enhances usability by arranging resources in a meaningful order.

#### Example

To sort users based on their age in ascending or descending order, the following RQL queries can be used:

- Ascending order:
  ```
  GET /api/users/?sort=age
  ```
- Descending order:
  ```
  GET /api/users/?sort=-age
  ```

## Filter

### Query with no filter

This query type allows users to retrieve resources without applying any filters.

#### Example

To retrieve all users without applying any filters, the following RQL query can be used:

```
GET /api/users/
```

### Query with column filter

This query type allows users to retrieve resources while applying filters based on specified conditions using various operators.

#### Operators Supported:

- **$eq**: Equal to
- **$neq**: Not equal to
- **$gt**: Greater than
- **$gte**: Greater than or equal to
- **$lt**: Less than
- **$lte**: Less than or equal to
- **$like**: String matching with wildcard support
- **$in**: In array
- **$nin**: Not in array
- **$null**: Null value check
- **$and**: Logical AND operation
- **$or**: Logical OR operation

#### Example of query object

```json
{
    "name": {
        "$like": "test%",
        "$neq": "test2"
    },
    "$or": [
        {
            "email": {
                "$neq": "test",
                "$like": "test%"
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
                    "age": 5
                }
            ]
        }
    ]
}

```

### Query with relations Filter

This query type allows users to retrieve resources based on filtering criteria that involve related entities or fields.

#### Example

To retrieve resources based on filtering criteria involving related entities, such as categories, the following RQL query can be used:

```
GET /api/posts/?filter={"name":{"$like":"%post01%"},"categories.name":{"$like":"%category01%"}}
```

```
{
    "name": {
        "$like": "%post01%"
    },
    "categories.name": {
        "$like": "%category01%"
    }
}
```
