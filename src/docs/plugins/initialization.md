# Plugin Initialization

Plugin initialization is executed right after the FastSchema application is bootstrapped and before the server starts.

It has access to various FastSchema APIs like `logger`, `db`, `context`, and `resources`.

Plugin initialization allows performing tasks like querying the database, logging, and registering resources.

## Init function

::: code-group

```js [plugin.js]
const ping = ctx => {
  return 'pong';
};

const world = ctx => {
  return 'Hello World';
};

/** @param {FsPlugin} plugin */
const Init = plugin => {
  $logger().Info('Hello plugin is initializing...');
  const products = $db().Query($context(), 'SELECT * FROM products');
  $logger().Info('Products:', products);

  plugin.resources
    .Group('hello')
    .Add(ping, { public: true })
    .Add(world, { public: true });
};
```

```ts [types.d.ts]
export interface FsPlugin {
  name: string;
  resources: FsResource;
}

```
:::

## Resources

Plugin `Init` function provides access to the `resources` object which allows registering resources.

The `resources` object provides methods to create a new resource group, add a new resource to the group, remove a resource, find a resource, and get the list of resources.

```ts
export interface FsResource {
  // Create a new resource group and return it
  Group: (name: string, meta?: FsMeta) => FsResource;
  // Add a new resource to the group and return the working resource
  Add: (handler: FsResourceHandler, meta?: FsMeta) => FsResource;
  Remove: (resourceId: string) => ThisParameterType;
  Find: (resourceID: string) => FsResource;
  ID: () => string;
  Name: () => string;
  Meta: () => FsMeta | null;
  Resources: () => FsResource[];
  IsGroup: () => bool;
  IsPublic: () => bool;
  String: () => string;
  MarshalJSON: () => BinaryType;
}
```

### Resource group

Resource group is a collection of resources that can be used to group related resources together.

The `Group` method accepts the following parameters:

- `name` - The name of the resource group.
- `meta` - The metadata object.

If there the `prefix` is not set through the `meta` object, the group name will be used as the group prefix.

The `Group` method returns a new resource group object.

```js
const group = plugin.resources.Group('hello');
```

### Registering a resource

The `Add` method is used to register a new resource to the group or to the root. It accepts the following parameters:

- `handler` - The resource handler function. The handler function MUST NOT be an inline function. Refer to the [No Inline Rules](/docs/plugins/rules#no-inlining) section for more information.

- `meta` - The metadata object.

The `Add` method returns the working resource object.

### Meta object

The `meta` object is used to provide additional information about the resource. The `meta` object can contain the following properties:

- `public` - A boolean value that indicates whether the resource is public or not. Default is `false`, which means the request user role must be allowed to access the resource.
- `prefix` - A string value that is used as a prefix for the resource path. If the `prefix` is not set, the resource name will be used as the prefix.
- `get`,`head`,`post`,`put`,`delete`,`connect`,`options`,`trace`,`patch`,`ws` - A string value that is used to set the resource method and path. If the method is not set, the resource will be attached to the GET method with the resource name as the path.
