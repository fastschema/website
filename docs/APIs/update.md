---
sidebar_position: 4
---

# Update

The update feature allows users to modify resources in the CMS based on specified filtering criteria. This feature supports a variety of operations, including setting field values, updating one-to-one (O2O) and one-to-many (O2M) relations, clearing fields and relations, adding entities to relations, and performing expressions-based updates.

## Payload

The update payload is a json object that contains columns and date to be updated. The payload can include the following operations:

### $set

The `$set` property is used to set fields and relations. It accepts an object with field names or relation names as keys and values to set as values.

For example:

```json
{
  "name": "John Doe",
  "age": 30,
  "room": { "id": 2 },
  "pets": [ { "id": 2 }, { "id": 3 } ],
  "groups": [ { "id": 4 }, { "id": 5 } ],
  "$set": {
    "bio": "Hello World",
    "address": "123 Main St",
    "sub_room": { "id": 2 },
    "sub_pets": [ { "id": 2 }, { "id": 3 } ],
    "sub_groups": [ { "id": 4 }, { "id": 5 } ]
  }
}
```

The `$set` property accepts an object with:
- The field name or relation name as key. The key must be a field name or a relation name.
- The value to set as value. The value type can be:
  - A value: The value will be set to the field. For example:
    - Set `name` to `"John Doe"`.
    - Set `age` to `30`.
    - Set `bio` to `"Hello World"`.
    - Set `address` to `"123 Main St"`.
  - An entity: The entity will be set to the relation. For example:
    - Set `room` to `{ "id": 2 }`.
    - Set `sub_room` to `{ "id": 2 }`.
  - An array of entities: The entities will be set to the relation. For example:
    - Set `pets` to `[ { "id": 2 }, { "id": 3 } ]`.
    - Set `groups` to `[ { "id": 4 }, { "id": 5 } ]`.
    - Set `sub_pets` to `[ { "id": 2 }, { "id": 3 } ]`.
    - Set `sub_groups` to `[ { "id": 4 }, { "id": 5 } ]`.

### $clear

The `$clear` property is used to clear fields and relations. It accepts an object with field names or relation names as keys and values indicating whether to clear as values.

`$clear` accepts an object with:
- The field name or relation name as key. The key must be a field name or a relation name.
- The value to clear as value. The value type can be:
  - A boolean: The field or relation will be cleared. For example:
    - Set `bio` and `address` to `null`.
    - Clear the `O2O` relation: `room`.
    - Clear the `O2M` relation: `sub_pets`.
    - Clear the `M2M` relation: `sub_groups`.
  - An array of entities: The entities will be removed from the relation. For example:
    - Remove `[{ "id": 2 }, { "id": 3 }]` from `pets`.
    - Remove `[{ "id": 4 }, { "id": 5 }]` from `groups`.

### $add

The `$add` property is used to add values to fields and entities to relations. It accepts an object with field names or relation names as keys and values to add as values.

Some use cases for `$add` include:
- Adding a numeric value to a numeric field.
- Adding items to `O2M` and `M2M` relations.

`$add` accepts an object with:
- The field name or relation name as key. The key must be a numeric field name or a relation name.
- The value to add as value. The value type can be:
  - A number: The value will be added to the field value. For example:
    - Adding `1` to `age`.
    - Adding `1000` to `salary`.
  - An array of entities: The entities will be added to the relation. For example:
    - Adding `[{ "id": 2 }, { "id": 3 }]` to `pets`.
    - Adding `[{ "id": 4 }, { "id": 5 }]` to `groups`.

### $expr

The `$expr` property is used to set fields with expressions. It accepts an object with field names as keys and expression strings as values:

- The field name as key. The key must be a field name (not a relation name).
- The expression as value. The value must be a string, and it must be a valid SQL expression.

## Example

To update a user with ID 1 based on certain filtering criteria, the following RQL query can be used:

```
PUT /api/users/1
```

The update payload can include various operations such as setting fields, updating relations, clearing fields and relations, adding entities to relations, and performing expressions-based updates.

```json
{
  "name": "John Doe",
  "age": 30,
  "room": { "id": 2 },
  "pets": [ { "id": 2 }, { "id": 3 } ],
  "groups": [ { "id": 4 }, { "id": 5 } ],
  "$set": {
    "bio": "Hello World",
    "address": "123 Main St",
    "sub_room": { "id": 2 },
    "sub_pets": [ { "id": 2 }, { "id": 3 } ],
    "sub_groups": [ { "id": 4 }, { "id": 5 } ]
  },
  "$clear": {
    "bio": true,
    "address": true,
    "room": true,
    "sub_pets": true,
    "sub_groups": true,
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

## Known Issues

When filtering $neq operation in a relation field, the relation is not filtered properly. For example:
```json
http://localhost:3000/api/content/category?select=id&filter={"tags.id":{"$neq":10001}}
```
The above query will perform the following SQL query:
```sql
SELECT * FROM `categories`
WHERE `categories`.`id` IN (
  SELECT `categories_tags`.`categories`
  FROM `categories_tags`
  JOIN `tags` AS `t1`
  ON `categories_tags`.`tags` = `t1`.`id`
  WHERE `id` <> 10001
)
ORDER BY `id` DESC
```

The problem is that the junction table `categories_tags` only contains the categories that have connected tags, so the categories that have no connected tags will not be returned. The correct SQL query should be:

```sql
SELECT * FROM `categories`
WHERE `categories`.`id` NOT IN (
  SELECT `categories_tags`.`categories`
  FROM `categories_tags`
  JOIN `tags` AS `t1`
  ON `categories_tags`.`tags` = `t1`.`id`
  WHERE `id` = 10001
)
ORDER BY `id` DESC
