---
sidebar_position: 2
---

# Count

The count API allows users to retrieve the total count of resources that match specified filtering criteria without pagination. This feature is useful for obtaining an accurate count of resources that meet specific conditions, enabling users to perform analytics, generate reports, or gain insights into their data.

## Example

To count the number of users that match a certain filtering criteria, the following RQL query can be used:

```
GET /api/users/count?filter={"age":{"$gte":18}}
```
