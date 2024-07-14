# Database Migrations

`FastSchema` Database is built on top of the `ent` framework, which provides a powerful and flexible way to check for changes in the schema and apply them to the database.

Whenever you make changes to the schema, the changes will be detected and saved int the `MigrationDir` directory. The changes will also be applied to the database automatically.

By default, the `MigrationDir` directory is set to `./data/migrations`. You can change this directory by changing the application configuration.

```go{9}
sb, _ := schema.NewBuilderFromDir("data/schemas", Blog{}, Tag{})
config := &db.Config{
  Driver:       "mysql",
  Name:         "fastschema2",
  Host:         "localhost",
  Port:         "3306",
  User:         "root",
  Pass:         "123",
  DisableForeignKeys:         true,
  MigrationDir: "data/migrations",
}

client, _ := entdbadapter.NewClient(config, sb)
```
