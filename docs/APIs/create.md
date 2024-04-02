---
sidebar_position: 3
---

# Create

The create API allows users to add new resources to the CMS. This feature enables users to populate the CMS with new data by providing a payload containing the necessary information for creating the resources.


## Example

To create a new user in the CMS, the following RQL query can be used:

```
POST /api/users
```

The payload for creating a user includes various fields such as name, age, room, pets, and groups.

```json
{
  "name": "John Doe",
  "age": 30,
  "room": { "id": 2 },
  "pets": [ { "id": 2 }, { "id": 3 } ],
  "groups": [ { "id": 4 }, { "id": 5 } ]
}
```
