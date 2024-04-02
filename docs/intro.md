---
sidebar_position: 1
---

# Introduction

FastSchema is an open-source headless Content Management System (CMS) designed to simplify the creation and management of structured content. By leveraging schema definitions, FastSchema automates the generation of databases and provides CRUD (Create, Read, Update, Delete) APIs effortlessly.


## Overview

At the core of FastSchema lies its schema definition, a blueprint that outlines the structure of your content. This schema acts as the foundation upon which FastSchema builds your database tables and API endpoints, streamlining the development process and allowing you to focus on creating rich, dynamic content.

## Features

Fastschema offers a comprehensive suite of features designed to streamline and simplify the process of building and managing dynamic web applications. Whether you're a developer, designer, or content creator, our platform provides the tools you need to create, deploy, and maintain powerful web experiences with ease.

- Automated Database Generation.
- RESTful API Generation.
- Dynamic Content Modeling.
- Built-in File Management.
- Built-in Admin Control Panel.
- Database Support: MySQL, PostgreSQL, SQLite.
- Role-Based Access Control.


## Schema Definition

The schema definition is structured JSON that encapsulates the characteristics of your content model. Let's take a closer look at a sample schema definition:

**post.json**

```json
{
  "name": "post",
  "namespace": "posts",
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
      "name": "category",
      "label": "Category",
      "renderer": {},
      "relation": {
        "schema": "category",
        "field": "posts",
        "type": "o2m"
      },
    }
  ]
}
```

**category.json**

```json
{
  "name": "category",
  "namespace": "categories",
  "label_field": "name",
  "fields": [
    {
      "type": "string",
      "name": "name",
      "label": "Name",
      "optional": true,
      "sortable": true
    },
    {
      "type": "text",
      "name": "content",
      "label": "Content",
      "renderer": {
        "class": "editor"
      },
      "optional": true,
      "sortable": true
    },
    {
      "type": "relation",
      "name": "posts",
      "label": "Posts",
      "optional": true,
      "relation": {
        "schema": "post",
        "field": "category",
        "type": "o2m",
        "owner": true,
        "optional": true
      }
    }
  ]
}
```

## Features

FastSchema boasts several key features:

- **Automated Database Generation:** With a defined schema, FastSchema automatically generates the necessary database tables, eliminating the need for manual setup.
- **CRUD API Generation:** FastSchema creates CRUD APIs based on the schema, enabling seamless interaction with your content.
- **Dynamic Content Modeling:** Easily create and modify content models through the intuitive admin UI, with changes reflected instantly in the schema definition file.
- **Flexible Relationships:** Define relationships between content models, such as one-to-many or many-to-many, to create complex data structures.

FastSchema simplifies the process of building and managing structured content, providing developers with a powerful toolset to create dynamic, data-driven applications. With its schema-driven approach, automated database generation, and CRUD API creation, FastSchema accelerates development workflows and empowers teams to focus on delivering exceptional digital experiences.

Get started with FastSchema today and revolutionize the way you manage content in your applications!
