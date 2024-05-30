A schema is a blueprint for the data that will be stored in the CMS. It defines the structure of the data, including the types of data that can be stored and the relationships between different types of data.

A Schema is a JSON object that includes the following fields:

- `name` (\*): The name of the schema. This is used to identify the schema in the CMS and must be unique.
- `namespace` (\*): The namespace of the schema. This is used to create database tables and API endpoints.
- `label_field` (\*): The field that will be used as the label for items in the CMS. This is typically a human-readable field like a title or name.
- `disable_timestamp`: A boolean value that determines whether the schema should include timestamp fields like `created_at` and `updated_at`.
- `is_system_schema`: A boolean value that determines whether the schema is a system schema. A System schema is a schema that come built-in with the CMS or a schema that was created from a Go struct. A system schema can only be extended and cannot be deleted.
- `db`: The database configuration for the schema. Currently, it support adding indexes and unique constraints to the schema.
- `fields` (\*): An array of field objects that define the fields that will be stored for each item in the CMS.
