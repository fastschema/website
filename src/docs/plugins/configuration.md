# Plugin Configuration

Plugin configuration allows you to modify the FastSchema configuration object. You can also add custom schemas and hooks to the FastSchema application.

## Config function

```js [plugin.js]
const Config = config => {
  // Add product schema
  config.AddSchemas(product);

  // Change the fastschema port to 9000
  config.port = '9000';
}
```

A plugin may or may not include a configuration function. To define one, simply create a function named `Config` within the `plugin.js` file.

The `Config` function accepts the FastSchema configuration object as its argument.

::: warning Note
The `Config` function is called right after the FastSchema start the bootstrapping process.

It **ONLY** has access to the FastSchema configuration object and cannot access any other FastSchema APIs.
:::

```js [plugin.js]
const Config = config => {
  // Add product schema
  config.AddSchemas(product);

  // Change the fastschema port to 9000
  config.port = '9000';
}
```

The `config` object provides the following properties:

```ts
export interface FsAppConfig {
  dir: string;
  app_key: string;
  port: string;
  base_url: string;
  dash_url: string;
  api_base_name: string;
  dash_base_name: string;
  logger_config?: FsLoggerConfig;
  db_config?: FsDbConfig;
  storage_config?: FsStorageConfig;
  hide_resources_info: boolean;
  auth_config?: FsAuthConfig;

  AddSchemas(...schemas: SchemaRawData[]): void;

  OnPreResolve(...hooks: _FsResolveHook[]): void;
  OnPostResolve(...hooks: _FsResolveHook[]): void;

  OnPreDBQuery(...hooks: _FsPreDBQueryHook[]): void;
  OnPostDBQuery(...hooks: _FsPostDBQueryHook[]): void;

  OnPreDBExec(...hooks: _FsPreDBExecHook[]): void;
  OnPostDBExec(...hooks: _FsPostDBExecHook[]): void;

  OnPreDBCreate(...hooks: _FsPreDBCreateHook[]): void;
  OnPostDBCreate(...hooks: _FsPostDBCreateHook[]): void;

  OnPreDBUpdate(...hooks: _FsPreDBUpdateHook[]): void;
  OnPostDBUpdate(...hooks: _FsPostDBUpdateHook[]): void;

  OnPreDBDelete(...hooks: _FsPreDBDeleteHook[]): void;
  OnPostDBDelete(...hooks: _FsPostDBDeleteHook[]): void;
}
```

## Modify configuration

You can modify the FastSchema configuration object by changing its properties. For example, you can change the FastSchema port to `9000` by setting the `port` property to `9000`.

```js [plugin.js]
const Config = config => {
  // Change the fastschema port to 9000
  config.port = '9000';
}
```

While the most [configuration properties](/docs/framework/application#configuration) can be modified, some properties are specific to the Go runtime and cannot be changed.

For more information on the FastSchema configuration object, refer to the [Typescript definition](https://github.com/fastschema/fastschema/tree/master/plugins/js/)

## Add System schemas

You can add system schemas to the FastSchema application by calling the `AddSchemas` method on the configuration object.

```js [plugin.js]
const Config = config => {
  // Add product schema
  config.AddSchemas(product);
}
```

A schema is an object that defines the structure of a resource. For more information on schemas, refer to the [Schema documentation](/docs/concepts#schema).

::: code-group
<<< @/partials/plugins/product.json{json} [product.json]

```ts [types.d.ts]
export interface SchemaRawData {
  name: string;
  namespace: string;
  label_field: string;
  fields: Field[];
  disable_timestamp?: boolean;
  is_system_schema?: boolean;
  is_junction_schema?: boolean;
}

export interface Field {
  type: FieldType | string;
  name: string;
  multiple?: boolean;
  is_system_field?: boolean;
  is_locked?: boolean;
  server_name?: string;
  label: string;
  renderer?: FieldRenderer;
  size?: number;
  unique?: boolean;
  optional?: boolean;
  default?: any;
  sortable?: boolean;
  filterable?: boolean;
  db?: FieldDB | null;
  enums?: FieldEnum[];
  relation?: FieldRelation;
}
```
:::

## Add Hooks

FastSchema supports hooks that allow you to execute custom code at various stages of the application lifecycle, referred to as [hooks](/docs/framework/hooks/).

All hooks are supported in the plugin configuration function. You can add hooks by calling the corresponding method on the configuration object.

```js
const Config = config => {
  config.OnPreResolve(hookPreResolve);
  config.OnPostResolve(hookPostResolve);

  config.OnPreDBQuery(hookPreDBQuery);
  config.OnPostDBQuery(hookPostDBQuery);

  config.OnPreDBExec(hookPreDBExec);
  config.OnPostDBExec(hookPostDBExec);

  config.OnPreDBCreate(hookPreDBCreate);
  config.OnPostDBCreate(hookPostDBCreate);

  config.OnPreDBUpdate(hookPreDBUpdate);
  config.OnPostDBUpdate(hookPostDBUpdate);

  config.OnPreDBDelete(hookPreDBDelete);
  config.OnPostDBDelete(hookPostDBDelete);
}
```

**Hooks types:**

```ts
export type _FsResolveHook = (ctx: FsContext) => Promise<void> | void;

export type _FsPreDBQueryHook = (
  ctx: FsContext,
  option: FsQueryOption,
) => Promise<void> | void;

export type _FsPostDBQueryHook = (
  ctx: FsContext,
  option: FsQueryOption,
  entities: FsEntity[],
) => Promise<void> | void;

export type _FsPreDBExecHook = (
  ctx: FsContext,
  option: FsQueryOption,
) => Promise<void> | void;

export type _FsPostDBExecHook = (
  ctx: FsContext,
  option: FsQueryOption,
  result: FsDbExecResult,
) => Promise<void> | void;

export type _FsPreDBCreateHook = (
  ctx: FsContext,
  schema: SchemaRawData,
  entity: FsEntity,
) => Promise<void> | void;

export type _FsPostDBCreateHook = (
  ctx: FsContext,
  schema: SchemaRawData,
  entity: FsEntity,
  createdId: number,
) => Promise<void> | void;

export type _FsPreDBUpdateHook = (
  ctx: FsContext,
  schema: SchemaRawData,
  predicates: FsDbPredicate[],
  createData: FsEntity,
) => Promise<void> | void;

export type _FsPostDBUpdateHook = (
  ctx: FsContext,
  schema: SchemaRawData,
  predicates: FsDbPredicate[],
  createData: FsEntity,
  originalEntities: FsEntity[],
  affected: number,
) => Promise<void> | void;

export type _FsPreDBDeleteHook = (
  ctx: FsContext,
  schema: SchemaRawData,
  predicates: FsDbPredicate[],
) => Promise<void> | void;

export type _FsPostDBDeleteHook = (
  ctx: FsContext,
  schema: SchemaRawData,
  predicates: FsDbPredicate[],
  originalEntities: FsEntity[],
  affected: number,
) => Promise<void> | void;
```
