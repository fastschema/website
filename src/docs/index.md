---
next:
  text: 'Getting Started'
  link: '/docs/getting-started'
---

# Introduction

FastSchema is an open-source headless Content Management System (CMS) designed to simplify the creation and management of structured content. By leveraging schema definitions, FastSchema automates the generation of databases and provides CRUD (Create, Read, Update, Delete) APIs effortlessly.

::: raw
<div class="tip custom-block" style="padding-top: 8px">
Just want to try it out? Skip to the <a href="/docs/getting-started" title="Fastschema Getting started">Getting started</a> section.
</div>
:::

## Overview

FastSchema core features are built on top of `schema`, a blueprint that outlines the structure of your content. This schema acts as the foundation upon which FastSchema builds your database tables and API endpoints, streamlining the development process and allowing you to focus on creating rich, dynamic content.

## Use Cases

- **A Headless CMS (No-Code Solution)**

  FastSchema is an ideal solution for building headless CMS applications that require dynamic content modeling without writing a line of code.

  It is designed to support API-first development, allowing you to define your content models and generate RESTful APIs effortlessly.

  With two line of commands, you can create a new project, define your content models, and start creating content instantly.

- **A Framework for web development**

  FastSchema is designed to be used as a framework for building web applications. It provides a set of tools and packages that simplify the development process.

  `Resource` is a core concept that represents an access point to your data. By defining resources, you can create custom endpoints and customize the behavior of your APIs.

  `Hooks` are functions that are executed before or after an operation is performed on a resource. A `Hook` can be a `resolver hook`, `database hook`, or `application hook`. They allow you to add custom logic to your APIs and extend the functionality of FastSchema.

  `ORM` is a powerful tool that simplifies the interaction with your database. It provides a set of methods for querying, creating, updating, and deleting records in your database.


## Features

Fastschema offers a comprehensive suite of features designed to streamline and simplify the process of building and managing dynamic web applications.

- **Automated Database Generation:** FastSchema automatically generates the necessary database tables based on your schema definition with flexible relationships model, eliminating the need for manual setup.

- **RESTful API Generation:** RESTful APIs are automatically generated based on the schema definition. Whenever you create or update a schema, the corresponding API endpoints are updated accordingly.

- **Dynamic Content Modeling:** Easily create and modify content models through the intuitive admin UI, with changes reflected instantly in the schema definition file.

- **Built-in File Management:** FastSchema provides a built-in file manager to manage media assets, enabling you to upload, organize, and serve files seamlessly.

- **Built-in Admin Control Panel:** FastSchema comes with a built-in admin control panel that allows you to manage content, users, manage permissions, and more.

- **Database Support:** MySQL, PostgreSQL, SQLite.

- **Role-Based Access Control:** Define roles and permissions to control access to content and features.

- **OpenAPI Specification (OAS) Generation:** FastSchema automatically generates OpenAPI Specification (OAS) documentation for your APIs, making it easy to understand and consume your APIs.

- **Extensible and Flexible:** Extend and customize FastSchema with Go code, build extensive features by leveraging the power of Resources, Hooks, ORM, and more.
