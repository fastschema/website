# Plugins Development Rules

## No Inlining

FastSchema Plugins System allows developers to register resource handlers and hooks with js function. However, the js function must not be inlined when registering.

The js function **MUST** be defined independently in the **GLOBAL SCOPE** and then registered using the function name.


#### Not working
```js
// Hook function
config.OnPreResolve(ctx => {
  // Do something
});

// Resource handler
plugin.resources.Add(ctx=> {
  return 'pong';
}, { get: 'ping' });
```

#### Working
```js{1-9}
// Hook function
const OnPreResolve = ctx => {
  // Do something
};

// Resource handler
const ping = ctx => {
  return 'pong';
};

const Config = config => {
  config.OnPreResolve(OnPreResolve);
}

const Init = plugin => {
  plugin.resources.Add(ping);
}
```

## Global Scope

FastSchema Plugins System using Goja Runtime to execute the js code. The JS file will be compiled to Goja Program and executed in the Goja Runtime.

The execution of a Goja Program takes time and resources. To mitigate this, FastSchema Plugins using `sync.Pool` to manage the Goja Runtime.

The `sync.Pool` will store the Goja Runtime and reuse it for the next execution. This will reduce the overhead of creating a new Goja Runtime for each execution. It will also reduce the overhead of Golang Garbage Collector.

### Global Scope Variables

Because of reusing the Goja Runtime, the Global Scope of the JS file will be shared between executions.
This can lead to unexpected behavior if the Global Scope variables are mutated.

```js

let counter = 0;

const OnPreResolve = ctx => {
  counter++;
};
```

In the example above, the `counter` variable will be shared between executions. In the `OnPreResolve`, the `counter` will be incremented by 1. But if the execution is done multiple times, the `counter` will be incremented multiple times in a new or shared runtime (which can't be guaranteed). It may be 1, 2, 3, or any other value.

**To mitigate this, we should not MUTATE the variable in the Global Scope.**

```js
// BAD
let counter = 0;

// GOOD
const counter = 0;
```

### Global Scope Functions

When registering a js function as a resource handler or hook, the function name will be used as a key to register the function.

Whenever a resource handler or hook needs to be executed, the FastSchema Plugins System look up the function in Goja Runtime using its name.

If the function is defined in a nested scope, the function lookup will fail and the system will throw an error.

To make sure the function is registered correctly, the function **MUST** be defined in the Global Scope.

```js
// NOT WORKING
const Config = config => {
  const OnPreResolve = ctx => {
    // Do something
  };

  config.OnPreResolve(OnPreResolve);
};

// WORKING
const OnPreResolve = ctx => {
  // Do something
};

const Config = config => {
  config.OnPreResolve(OnPreResolve);
};
```
