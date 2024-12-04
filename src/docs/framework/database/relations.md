# Database relations

Relations are a way to connect two schemas. They are used to define how two tables are connected to each other.

Fastschema relations are defined by the `schema.Relation` interface and can be created based on [struct tag relation](/docs/framework/database/system-schema.html#custom-with-tag-fs-relation) or custom schema method.

```go
type Relation struct {
	TargetSchemaName string             `json:"schema"`          // target schema name
	TargetFieldName  string             `json:"field,omitempty"` // target field name, aka the back reference field name
	Type             RelationType       `json:"type"`            // the relation type: o2o, o2m, m2m
	Owner            bool               `json:"owner,omitempty"` // the relation owner: true, false
	FKColumns        *RelationFKColumns `json:"fk_columns"`
	JunctionTable    string             `json:"junction_table,omitempty"` // junction table name for m2m relation
	Optional         bool               `json:"optional"`
}
```

- `TargetSchemaName`: the target schema name
- `TargetFieldName`: the target relation field name, aka the back reference field name
- `Type`: the relation type: o2o, o2m, m2m
- `Owner`: the relation owner: true, false
- `FKColumns`: the foreign key columns
- `JunctionTable`: the junction table name for m2m relation
- `Optional`: the optional flag

::: warning Important


The target relation field is the field name of the target relation schema that points back to the relation field.

**For example:**

- **O2O**: The relation field **post.post_meta** is linked to the **post_meta** schema --> the target relation field should be **post_meta.post**.
- **O2M**: The relation field is **post.comments** is linked to the **comment** schema --> the target relation field should be **comment.post**.
- **M2M**: The relation field is **post.categories** is linked to the **category** schema --> the target relation field should be **category.posts**.
:::

## Relation Owner

The relation owner is used to define which schema is the owner of the relation.

The owner schema is the schema that does not have any information about the relation in its schema definition. The non-owner schema, on the other hand, must store the information about the owner schema, usually in the form of a foreign key.

The relation owner only applies to one-to-one and one-to-many relations. In many-to-many relations, there is no owner schema.

_For example, consider the following relations:_

**O2O:**

The relation between a `Post` schema and a `PostMeta` schema. Each post has one post meta, and each post meta belongs to one post.

The `Post` schema is the owner of the relation, and the `PostMeta` schema is the non-owner. The `PostMeta` schema must have a foreign key `PostID` to the `Post` schema.

**O2M:**

The relation between a `Post` schema and a `Comment` schema. Each post has many comments, and each comment belongs to one post.

The `Post` schema is the owner of the relation, and the `Comment` schema is the non-owner. The `Comment` schema must have a foreign key `PostID` to the `Post` schema.

## Struct Tag Relation

The relation between two schemas can be defined using the `fs.relation` struct tag.

`fs.relation` is a HJSON string that represents the `schema.Relation` struct.

```go
`fs.relation:"{'type':'o2o','schema':'post_meta','field':'post','owner':true}"`

`fs.relation:"{'type':'o2o','schema':'post','field':'post_meta'}"`
```

<!-- ## Customize the foreign key columns

In non-owner schema, the foreign key columns will be created by the system automatically. However, you can customize the foreign key columns by using the `fk_columns` property in the `fs.relation` struct tag. -->


## One-to-One

In a one-to-one relation, each record in the first table is related to one record in the second table. This is the simplest type of relation.

For example, consider a `Student` schema and a `Profile` schema. Each student has one profile, and each profile belongs to one student.

::: code-group
```go [System Schema]
type Student struct {
	ID      int      `json:"id"`
	Name    string   `json:"name"`
	Profile *Profile `json:"profile" fs.relation:"{'type':'o2o','schema':'profile','field':'student','owner':true}"`
}

type Profile struct {
	ID        int      `json:"id"`
	Address   string   `json:"address"`
	StudentID int      `json:"student_id"`
	Student   *Student `json:"student" fs.relation:"{'type':'o2o','schema':'student','field':'profile'}"`
}

```
:::

In the example above, we use the struct tag `fs.relation` to define the relation between the `Student` and `Profile` schemas:

- `fs.relation:"{'type':'o2o','schema':'profile','field':'student','owner':true}"`
- `fs.relation:"{'type':'o2o','schema':'student','field':'profile'}`

The `Student` schema has a `Profile` field, and the `Profile` schema has a `Student` field. The `owner` field is set to `true` in the `Student` schema, which means that the `Student` schema is the owner of the relation and the `Profile` schema must has a foreign key to the `Student` schema (`StudentID` field).


## One-to-Many

In a one-to-many relation, each record in the first table is related to one or more records in the second table.

For example, consider a `Post` schema and a `Comment` schema. Each post has many comments, and each comment belongs to one post.

::: code-group
```go [System Schema]
type Post struct {
  ID       int        `json:"id"`
  Title    string     `json:"title"`
  Comments []*Comment `json:"comments" fs.relation:"{'type':'o2m','schema':'comment','field':'post','owner':true}"`
}

type Comment struct {
  ID      int    `json:"id"`
  Content string `json:"content"`
  PostID  int    `json:"post_id"`
  Post    *Post  `json:"post" fs.relation:"{'type':'o2o','schema':'post','field':'comments'}"`
}
```
:::

In the example above, we use the struct tag `fs.relation` to define the relation between the `Post` and `Comment` schemas:

- `fs.relation:"{'type':'o2m','schema':'comment','field':'post','owner':true}"`
- `fs.relation:"{'type':'o2o','schema':'post','field':'comments'}`

The `Post` schema has a `Comments` field, and the `Comment` schema has a `Post` field. The `owner` field is set to `true` in the `Post` schema, which means that the `Post` schema is the owner of the relation and the `Comment` schema must has a foreign key to the `Post` schema (`PostID` field).

## Many-to-Many

In a many-to-many relation, each record in the first table is related to one or more records in the second table, and vice versa.

For example, consider a `Post` schema and a `Category` schema. Each post can have many categories, and each category can have many posts.

::: code-group
```go [System Schema]
type Post struct {
  ID         int         `json:"id"`
  Title      string      `json:"title"`
  Categories []*Category `json:"categories" fs.relation:"{'type':'m2m','schema':'category','field':'posts'}"`
}

type Category struct {
  ID    int    `json:"id"`
  Name  string `json:"name"`
  Posts []*Post `json:"posts" fs.relation:"{'type':'m2m','schema':'post','field':'categories'}"`
}
```
:::

In the example above, we use the struct tag `fs.relation` to define the relation between the `Post` and `Category` schemas:

- `fs.relation:"{'type':'m2m','schema':'category','field':'posts'}"`
- `fs.relation:"{'type':'m2m','schema':'post','field':'categories'}`

The `Post` schema has a `Categories` field, and the `Category` schema has a `Posts` field. There is no owner schema in a many-to-many relation.
