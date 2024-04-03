"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[235],{6056:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>c,toc:()=>d});var s=n(4848),i=n(8453);const a={sidebar_position:3},r="Extend",c={id:"extend",title:"Extend",description:"FastSchema is a flexible and extensible application that allows you to customize and extend its functionality to meet your specific requirements. This guide provides an overview of the different ways you can extend FastSchema, including customizing the API, adding new features, and integrating with third-party services.",source:"@site/docs/extend.md",sourceDirName:".",slug:"/extend",permalink:"/docs/extend",draft:!1,unlisted:!1,editUrl:"https://github.com/fastschema/website/tree/main/docs/extend.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Delete",permalink:"/docs/APIs/delete"}},o={},d=[{value:"Using Fastschema as a module",id:"using-fastschema-as-a-module",level:2},{value:"Create a new project",id:"create-a-new-project",level:3},{value:"Adding a new resource",id:"adding-a-new-resource",level:3},{value:"Hooks",id:"hooks",level:3}];function l(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"extend",children:"Extend"}),"\n",(0,s.jsx)(t.p,{children:"FastSchema is a flexible and extensible application that allows you to customize and extend its functionality to meet your specific requirements. This guide provides an overview of the different ways you can extend FastSchema, including customizing the API, adding new features, and integrating with third-party services."}),"\n",(0,s.jsx)(t.h2,{id:"using-fastschema-as-a-module",children:"Using Fastschema as a module"}),"\n",(0,s.jsx)(t.h3,{id:"create-a-new-project",children:"Create a new project"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-go",children:'package main\n\nimport (\n\t"github.com/fastschema/fastschema"\n)\n\nfunc main() {\n\tnewApp, err := fastschema.New(&fastschema.AppConfig{})\n\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\n\tnewApp.Start()\n}\n'})}),"\n",(0,s.jsx)(t.h3,{id:"adding-a-new-resource",children:"Adding a new resource"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-go",children:'newApp.AddResource(\n\tapp.NewResource("hello", func(c app.Context, _ *any) (any, error) {\n\t\treturn "Welcome to fastschema", nil\n\t}, app.Meta{app.GET: ""}),\n)\n'})}),"\n",(0,s.jsxs)(t.p,{children:["This code snippet demonstrates how to create a new resource in FastSchema. The ",(0,s.jsx)(t.code,{children:"AddResource"}),' method is used to define a new resource with a unique name, handler function, and HTTP method. In this example, the resource is named "hello" and returns a welcome message when accessed via a GET request.']}),"\n",(0,s.jsxs)(t.p,{children:["You can now access this resource by sending a GET request to ",(0,s.jsx)(t.code,{children:"/api/hello"}),"."]}),"\n",(0,s.jsx)(t.h3,{id:"hooks",children:"Hooks"}),"\n",(0,s.jsx)(t.p,{children:"Currently, FastSchema supports the following hooks:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"OnBeforeResolve"}),": Triggered before resolving the request."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"OnAfterResolve"}),": Triggered after resolving the request."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"OnAfterDBContentList"}),": Triggered after fetching the content from the database."]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Example"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-go",children:'newApp.OnAfterDBContentList(func(query *db.QueryOptions, entities []*schema.Entity) ([]*schema.Entity, error) {\n\tif query.Model.Schema().Name != "media" {\n\t\treturn entities, nil\n\t}\n\n\tfor _, entity := range entities {\n\t\tpath := entity.GetString("path")\n\t\tif path != "" {\n\t\t\tentity.Set("url", newApp.Disk().URL(entity.GetString("path")))\n\t\t}\n\t}\n\n\treturn entities, nil\n})\n'})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Here's the full example:"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-go",children:'package main\n\nimport (\n\t"github.com/fastschema/fastschema"\n\t"github.com/fastschema/fastschema/app"\n\t"github.com/fastschema/fastschema/db"\n\t"github.com/fastschema/fastschema/schema"\n)\n\nfunc main() {\n\tnewApp, err := fastschema.New(&fastschema.AppConfig{})\n\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\n\tnewApp.AddResource(\n\t\tapp.NewResource("home", func(c app.Context, _ *any) (any, error) {\n\t\t\treturn "Welcome to fastschema", nil\n\t\t}, app.Meta{app.GET: ""}),\n\t)\n\n\tnewApp.OnAfterDBContentList(\n\t\tfunc(query *db.QueryOptions, entities []*schema.Entity) ([]*schema.Entity, error) {\n\t\t\tif query.Model.Schema().Name != "media" {\n\t\t\t\treturn entities, nil\n\t\t\t}\n\n\t\t\tfor _, entity := range entities {\n\t\t\t\tentity.Set("custom", true)\n\t\t\t}\n\n\t\t\treturn entities, nil\n\t\t},\n\t)\n\n\tnewApp.Start()\n}\n'})})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>c});var s=n(6540);const i={},a=s.createContext(i);function r(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);