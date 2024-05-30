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

<!-- Use Cases tabs -->

## Use FastSchema in the ways that suit your needs
*Launch a headless CMS in seconds or utilize as a web framework.*

:::tabs
== Headless CMS ⚡️
::: code-group

<<< @/partials/code-use-as-headless-cms/Command{bash}
<<< @/partials/code-use-as-headless-cms/Output{bash}

== Web Framework 🚀
::: code-group

<<< @/partials/code-use-as-framework/main.go{go}

<<< @/partials/code-use-as-framework/types.go{go}

::: details This will automatically generate OpenAPI spec
<OASOutputWithCustomResource />

:::

<!-- Home Features -->
<HomeFeatures />
