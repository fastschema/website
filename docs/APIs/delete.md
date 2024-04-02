---
sidebar_position: 5
---

# Delete

The delete API allows users to remove resources from the CMS based on specified filtering criteria. This feature enables users to perform bulk deletion operations, removing multiple resources that meet specific conditions in a single request.

## Example

To delete users based on certain filtering criteria, the following RQL query can be used:

```
DELETE /api/users/?filter={"age":{"$lt":18}}
```
