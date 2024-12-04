---
layout: home
title: FastSchema - All-in-One Backend as a Service
titleTemplate: FastSchema - All-in-One Backend as a Service

hero:
  name: "FastSchema"
  text: "All-in-One Backend as a Service"
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
    details: "Customize with <b>Go code</b> or <b>JS plugins</b>, build extensive features by leveraging the powerful of Resources, Hooks, ORM..."
---

<script setup>
import HomeFeatures from '../.vitepress/components/HomeFeatures.vue'
import OASOutputWithCustomResource from '../.vitepress/components/OASOutputWithCustomResource.vue'
</script>

<!-- Use Cases tabs -->

## Use FastSchema in the ways that suit your needs
*Launch a complete backend in seconds or utilize it as a versatile web framework*

:::tabs
== BaaS ⚡️
::: code-group

<<< @/partials/code-use-as-baas/Command{bash}
<<< @/partials/code-use-as-baas/Output{bash}

== Web Framework 🚀
::: code-group

<<< @/partials/code-use-as-framework/main.go{go}

<<< @/partials/code-use-as-framework/types.go{go}

::: details This will automatically generate OpenAPI spec
<OASOutputWithCustomResource />

== Plugins System 🧩
::: code-group 

<<< @/partials/plugins/plugin.js{js} [plugin.js]
<<< @/partials/plugins/utils.js{js} [utils.js]
<<< @/partials/plugins/product.json{json} [product.json]

== Access Control 🛡️
::: code-group

<<< @/partials/access-control/check-ip.js{js}
<<< @/partials/access-control/query-db.js{js}
<<< @/partials/access-control/modify-request.js{js}

== Setter/Getter ✨
::: code-group

<<< @/partials/database/setter.js{js}
<<< @/partials/database/getter.js{js}


:::

<!-- Home Features -->
<HomeFeatures />
