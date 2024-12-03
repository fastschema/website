---
prev:
  text: 'Concepts'
  link: '/docs/concepts'
next:
  text: 'Authentication'
  link: '/docs/backend/authentication'
---

# Backend as a Service

## Introduction

FastSchema is designed to be used as a BaaS, allowing you to easily manage your backend, automate database creation, and **generate APIs for seamless integration with your frontend applications**.

FastSchema provides a simple and easy-to-use Admin Panel that allows you to create and manage your content.

Each content type is defined by a schema, which is a JSON object that describes the structure of the content. You can create as many content types as you need, and each content type can have as many fields as you want.

::: tip Manage Schemas
You can manage your schema by going to the Admin Panel and clicking on the **Schemas** menu. From there, you can see a list of all the schemas, create, edit or delete them.
:::

## Routes

FastSchema provides a set of routes to interact with the system:

- **API routes:** `/api`
  - **Content routes:** `/api/content/{schema}`
  - **Schema routes:** `/api/schema`
  - **User routes:** `/api/user`
  - **Role routes:** `/api/role`
  - **File routes:** `/api/file`
  - **Tools routes:** `/api/tool`
  - **Realtime routes:** `/api/realtime`
- **API documentation:** `/docs`
- **Admin Panel:** `/dash`
- **Uploads:** `/files` _(if the local storage is used, the path `/files` may be different according to the configuration)_

::: warning The root route
The root route **`/`** is left empty for you to use it as you wish.

You can create your own landing page or any other page you want.
:::

### API Routes

All the API routes are prefixed with `/api`. The API routes are used to interact with the data. You can use the API to create, read, update, and delete records.

### Documentation

FastSchema provides a RESTful API to interact with the data. It also provides an OpenAPI documentation and a OAS viewer to help you understand the API.

::: tip Automatic API documentation generation
The OpenAPI documentation is generated automatically and contains all the schemas endpoints, system endpoints, and the user defined endpoints.
:::

You can access the API documentation and the OAS viewer by visiting the following URLs:

- **API documentation:** https://{your-domain}/docs/openapi.json
- **OAS viewer:** https://{your-domain}/docs

::: warning
By default, the API documentation and the OAS viewer require authentication. You will need to login as an admin user to access them.

You can also add the **`docs.spec`** and **`docs.viewer`** permissions to the **`guest`** role to allow anonymous access to the API documentation and the OAS viewer.
:::

### Admin Panel

The Admin Panel is used to manage the content. It provides a simple and easy-to-use interface to manage the schemas, records, users, roles, permissions, and other settings.

## List Schemas

The list of schemas shows the name, namespace, total fields of each schema, and the actions you can perform on each schema.

There are two kinds of schema: System Schema and User defined Schema. System Schema is the schema that is created by the system and cannot be deleted. User defined Schema is the schema that is created by the user and can be deleted.

You can also extend the system schema by adding new fields to it.

![List Schema](/static/images/schema-list.png)

## Create Schema

To create a new schema, click on the "New Schema" button. You will be taken to a form where you can enter the details of the schema.

There are two sections in the form: Schema and Fields.

In the Schema section, you can enter the name, namespace, select the label field, and choose to disable the timestamp or not.

In the Fields section, you can add, edit or delete fields. Each field has a name, label, type, and other properties.

![Create Schema](/static/images/schema-create.png)

## Create record

To create a new record, click on the schema name in the sidebar, under the `Content` menu. You will be taken to a form where you can enter the details of the record.

![Create Content](/static/images/content-create.png)

::: tip
All created records will be stored in the database and can be retrieved using the API.

Schemas, in the other hand, are stored in JSON files in the `data/schemas` directory.
:::

_Some example schemas are shown below:_

::: code-group

```json [data/schemas/category.json]
{
  "name": "category",
  "namespace": "categories",
  "label_field": "name",
  "fields": [
    {
      "type": "string",
      "name": "name",
      "label": "Name",
      "sortable": true
    },
    {
      "type": "relation",
      "name": "blogs",
      "label": "Blogs",
      "optional": true,
      "relation": {
        "schema": "blog",
        "field": "categories",
        "type": "m2m",
        "owner": true,
        "optional": true
      }
    }
  ]
}
```

```json [data/schemas/blog.json]
{
  "name": "blog",
  "namespace": "blogs",
  "label_field": "name",
  "fields": [
    {
      "type": "string",
      "name": "name",
      "label": "Name",
      "sortable": true
    },
    {
      "type": "string",
      "name": "description",
      "label": "Description",
      "optional": true,
      "renderer": {
        "class": "textarea"
      }
    },
    {
      "type": "file",
      "name": "image",
      "label": "Image",
      "optional": true,
      "relation": {
        "schema": "file",
        "field": "blog_image",
        "type": "o2m",
        "optional": true
      }
    },
    {
      "type": "relation",
      "name": "categories",
      "label": "Categories",
      "optional": true,
      "relation": {
        "schema": "category",
        "field": "blogs",
        "type": "m2m",
        "fk_columns": null,
        "optional": true
      }
    },
    {
      "type": "text",
      "name": "content",
      "label": "Content",
      "optional": true,
      "renderer": {
        "class": "editor"
      }
    }
  ]
}
```

```json [data/schemas/file.json]
{
  "name": "file",
  "namespace": "files",
  "label_field": "name",
  "is_system_schema": true,
  "fields": [
    {
      "type": "relation",
      "name": "blog_image",
      "label": "Blog_image",
      "optional": true,
      "relation": {
        "schema": "blog",
        "field": "image",
        "type": "o2m",
        "owner": true,
        "optional": true
      }
    }
  ]
}
```

:::
