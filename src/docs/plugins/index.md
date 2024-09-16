---
prev:
  text: "Realtime Updates"
  link: "/docs/headless-cms/realtime-updates"
next:
  text: "Plugin Configuration"
  link: "/docs/plugins/configuration"
---

# FastSchema Plugins System

The FastSchema Plugins System allows developers to extend the core functionality of FastSchema by writing JavaScript code, eliminating the need for deep familiarity with Golang. This approach empowers users to introduce custom features, manage content, and interact with FastSchema’s core APIs through a flexible plugin architecture.

Plugins are standalone modules that integrate with FastSchema to enhance or modify its behavior. By writing JavaScript code, developers can tap into the FastSchema event system, customize schemas, manage resources, and hook into the platform’s lifecycle events.

::: tip Javascript Runtime
FastSchema Plugins System using [Goja](https://github.com/dop251/goja) as the JavaScript runtime. Goja is an ECMAScript 5.1(JavaScript) engine written in pure Go. It was designed to be embedded in Go applications and provide a way to run scripts and evaluate expressions.
:::


## Overview

FastSchema plugins are designed to be modular, allowing developers to create custom features and extend the platform’s functionality. Plugins can be used to:

- Adding custom schema.
- Adding custom resources.
- Adding custom hooks.
- Modifying the FastSchema configuration object.
- Adding custom logic to the FastSchema lifecycle events.

## Structure

Basically, a FastSchema plugin is a directory located in the `data/plugins` directory that contains a `plugin.js` file. The `plugin.js` file is the entry point for the plugin and is responsible for exporting the plugin’s functionality.

**FastSchema Plugin Directory Structure**
```sh
fastschema-app
└── data
    └── plugins
        └── hello
            ├── plugin.js
            ├── product.json
            └── utils.js
```

## Lifecycle

The FastSchema Plugins System follows a lifecycle model that consists of the following stages:

1. **Configuration**: The plugin configuration function is called right after the FastSchema starts the bootstrapping process. It **ONLY** has access to the FastSchema configuration object and can modify it as needed.

2. **Initialization**: The plugin is initialized right after the FastSchema application is bootstrapped and before the server starts. It has access to various FastSchema APIs like `logger`, `db`, `context`, and `resources`.

3. **Execution**: The plugin’s resources and hooks are executed during the FastSchema application lifecycle. Resources are used to handle incoming requests, while hooks are used to intercept and modify the event flow.

```mermaid
sequenceDiagram
participant app as App
participant fs as FastSchema
participant manager as Plugins Manager
participant plugin as Plugin

Note over app,plugin: Start Bootstrapping

app->>+fs: Prepare Env <br/>& config
  fs->>+manager: Start<br/>Plugins Manager
    manager->>+plugin: Execute<br/>Config
    plugin-->>fs: Update App Config
    plugin-->>-manager: [Return]
    Note right of fs: After all plugins Config<br/>are executed
  manager-->>-fs: Configuration<br/>Complete


  Note over fs,plugin: Configuration Ready.<br/>FastSchema Initialization

  app-->>fs: Before<br/>start server

  fs->>+manager: Start Plugins<br/>initialization
    manager->>+plugin: Execute<br/>Init
    plugin-->>fs: Adding Resources,<br/>Execute custom logic
    plugin-->>-manager: [Return]
    Note right of fs: After all plugins Init<br/>are executed
  manager-->>-fs: Initialization<br/>complete
  
fs-->>-app: FastSchema<br/>Initialized
app->>+fs: Start Server
fs->>-fs: ...

opt Request Handling
  app->>+fs: Handle Request
    fs->>+plugin: Handle Request
    Note left of plugin: Execute<br/>handler
    plugin-->>-fs: [Return]
  fs-->>-app: Response Sent
end

opt Event Handling
  app->>+fs: Event Triggered<br/>(Pre/Post Hooks)
    fs->>+plugin: Trigger Hook
    Note left of plugin: Execute<br/>hook
    plugin-->>-fs: [Return]
  fs-->>-app: Event Handled
end

 ```

## Example

::: code-group

<<< @/partials/plugins/plugin.js{js} [plugin.js]
<<< @/partials/plugins/utils.js{js} [utils.js]
<<< @/partials/plugins/product.json{json} [product.json]

::: danger Rules
To ensure application stability and performance, the FastSchema Plugins System enforces a set of guidelines that developers should follow when building plugins. Please refer to the [Plugins Development Rules](/docs/plugins/rules) for more information.
:::
