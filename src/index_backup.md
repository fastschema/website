---
layout: home

hero:
  name: "FastSchema"
  text: "A Go web framework and Headless CMS"
  tagline: Simplify your web development
  actions:
    - theme: brand
      text: Documentation
      link: /docs/
    - theme: alt
      text: Github
      link: https://github.com/fastschema/fastschema

features:
  - title: Dynamic Content Modeling
    icon:
      src: /static/images/content.svg
    details: Easily create and modify content models through the intuitive admin UI, without writing a line of code.
  - title: Rich built-in Features
    icon:
      src: /static/images/features.svg
    details: "Effortlessly create web app with built-in features: Admin Control Panel, File manger, OAS, RBAC, and more."
  - title: Extensible and Flexible
    icon:
      src: /static/images/extend.svg
    details: "Extend and customize with Go code, build extensive features by leveraging the powerful of Resources, Hooks, ORM."
---

<script setup>
import HomeFeatures from '../.vitepress/components/HomeFeatures.vue'
import OASOutputWithCustomResource from '../.vitepress/components/OASOutputWithCustomResource.vue'
</script>

<!-- ## Try it in seconds ⚡️ -->

## Get started in seconds

::: code-group

```bash [Command]
docker pull ghcr.io/fastschema/fastschema:latest
docker run \
  -p 8000:8000 \
  -v ./data:/fastschema/data \
  ghcr.io/fastschema/fastschema:latest
```

```bash [Output]
> Using app directory: /fastschema
> Serving files from disk [public:/files] at /fastschema/data/public
> Visit the following URL to setup the app: http://localhost:8000/dash/setup/?token=lUDRgoTUUNDsjCcitgGFTqwMZQPmYvlU
```

:::

## Easy to customize 🚀

::: code-group

```go [main.go]
package main

import (
  "github.com/fastschema/fastschema/fs"
  "github.com/fastschema/fastschema"
)

func main() {
  app, _ := fastschema.New(&fs.Config{
    SchemaTypes: []any{Tag{}, Blog{}},
  })

  app.API().Add(fs.Post("/blogvote", func(c fs.Context, vote *Payload) (*Response, error) {
    _, err := db.Mutation[Blog](app.DB()).
      Where(db.EQ("id", vote.ID)).
      Update(c.Context(), fs.Map{
        "$expr": fs.Map{"vote": "vote + 1"},
      })

    return &Response{
      Success: err == nil,
      Message: fmt.Sprintf("Vote for %d: %v", vote.ID, err),
    }, nil
  }))

  log.Fatal(app.Start())
}

```

```go [types.go]
package main

type Tag struct {
  ID    int     `json:"id"`
  Name  string  `json:"name"`
  Desc  string  `json:"desc"`
  Blogs []*Blog `json:"blogs" fs.relation:"{'type':'m2m','schema':'blog','field':'tags','owner':true}"`
}

type Blog struct {
  ID    int    `json:"id"`
  Title string `json:"title"`
  Body  string `json:"body"`
  Tags  []*Tag `json:"tags" fs.relation:"{'type':'m2m','schema':'tag','field':'blogs'}"`
}

type Payload struct {
  ID      int     `json:"id"`
  Comment string  `json:"comment"`
}

type Response struct {
  Success bool    `json:"success"`
  Message string  `json:"message"`
}
```

:::

::: details This will automatically generate OpenAPI spec

<OASOutputWithCustomResource />

:::



<HomeFeatures />
