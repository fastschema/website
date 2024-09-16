# Plugin APIs

::: tip Help us improve
The FastSchema Plugin APIs are still in early stages of development. It is not yet as powerful as we would like it to be. We are looking for contributors to help us improve the Plugin APIs.

If you are interested in contributing or have any feedback, please let us know by creating an issue on the FastSchema GitHub repository.
:::

FastSchema provides various APIs to interact with the FastSchema application through plugins. It allows plugins to perform tasks like querying the database, logging, and managing resources.

::: warning

FastSchema APIs are available in various parts of the plugin lifecycle, except for the following scopes:

- `Config` function scope: The `Config` function is executed right after the FastSchema start the bootstrapping process. It **ONLY** has access to the FastSchema configuration object and is used to modify the FastSchema configuration object.

- `Global` scope: The `Global` scope is excuted when the plugin is loaded and all the FastSchema APIs are not available.
:::

## $context

`$context` is a function that returns the `GO` context object. It's simply a wrapper around the `context.Background()` function from the `context` package.

```ts
const $context: () => FsContext;
```

::: tip
The `FsContext` object is a wrapper around the `fs.Context` object from FastSchema.

It also implements the `context.Context` interface from the Go standard library, so can be used as a context object.
:::

Some FastSchema APIs require the `GO` context object to perform tasks like querying the database, logging, and managing resources, etc. You can use the `$context` function to create the `GO` context object.

## $logger

`$logger` is a function that returns the FastSchema logger object. It allows you to log messages to the FastSchema logger.

```ts
const $logger: () => FsLogger;
```

Basically, the log can be printed to the stdout using js `console.log` function. But FastSchema provides a logger object to log messages to the FastSchema logger with different log levels like `Info`, `Warn`, `Error`, and `Debug`.

```ts
export interface FsLogger {
  Info: (...msgs: any) => void;
  Infof: (format: string, ...params: any) => void;
  Error: (...msgs: any) => void;
  Errorf: (format: string, ...params: any) => void;
  Debug: (...msgs: any) => void;
  Fatal: (...msgs: any) => void;
  Warn: (...msgs: any) => void;
  Panic: (...msgs: any) => void;
  DPanic: (...msgs: any) => void;
  WithContext: (context: FsLogContext, callerSkips?: int) => FsLogger;
}
```

## $db

`$db` is a function that returns the FastSchema database client object. It allows you to perform database operations like querying the database, inserting data, updating data, and deleting data.

```ts
const $db: () => FsDb;
```

The database client object provides various methods to perform database operations like `Query`, `Exec`, `Insert`, `Update`, and `Delete`.

```ts
export interface FsDb {
  Exec: (c: FsContext, sql: string, ...args: any) => FsDbExecResult;
  Query: (c: FsContext, sql: string, ...args: any) => FsEntity[];
  Builder: (schema: string) => FsDbQueryBuilder;
  Tx: (c: FsContext) => FsDb;
  Commit: () => void;
  Rollback: () => void;
}
```

### Raw SQL Queries

The Plugin APIs provide two methods to execute raw SQL queries on the database:

- `Exec`: The `Exec` method is used to execute a raw SQL query that doesn't return any rows. It returns the `FsDbExecResult` object that contains information about the query execution: last inserted ID, number of rows affected.
- `Query`: The `Query` method is used to execute a raw SQL query that returns rows. It returns an array of `FsEntity` objects that represent the rows returned by the query.

### Query Builder

The Query Builder provides a fluent interface to build SQL queries. It will perform additional validation and type checking on the query parameters.

```ts
export interface FsDbQueryBuilder {
  // Where: (...predicates: FsDbPredicate[]) => FsDbQueryBuilder;
  Where: (...predicates: Object[]) => FsDbQueryBuilder;

  // Mutation methods
  Create: (ctx: FsContext, dataCreate: any) => FsEntity;
  CreateFromJSON: (ctx: FsContext, json: string) => FsEntity;
  Update: (ctx: FsContext, updateData: any) => FsEntity[];
  Delete: (ctx: FsContext) => number;

  // Query methods
  Limit: (limit: number) => FsDbQueryBuilder;
  Offset: (offset: number) => FsDbQueryBuilder;
  Order: (...order: string[]) => FsDbQueryBuilder;
  Select: (...fields: string[]) => FsDbQueryBuilder;
  Count: (options: FsDbCountOption) => number;
  Get: (ctx: FsContext) => FsEntity[];
  First: (ctx: FsContext) => FsEntity;
  Only: (ctx: FsContext) => FsEntity;
}
```

### Transactions

The database client object provides methods to perform transaction operations on the database:

- `Tx`: The `Tx` method is used to start a new transaction. It returns a new database client object that represents the transaction.
- `Commit`: The `Commit` method is used to commit the transaction.
- `Rollback`: The `Rollback` method is used to rollback the transaction.
