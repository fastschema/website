"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[936],{3893:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>l,metadata:()=>t,toc:()=>o});var i=s(4848),d=s(8453);const l={sidebar_position:4},r="Update",t={id:"APIs/update",title:"Update",description:"The update feature allows users to modify resources in the CMS based on specified filtering criteria. This feature supports a variety of operations, including setting field values, updating one-to-one (O2O) and one-to-many (O2M) relations, clearing fields and relations, adding entities to relations, and performing expressions-based updates.",source:"@site/docs/APIs/update.md",sourceDirName:"APIs",slug:"/APIs/update",permalink:"/docs/APIs/update",draft:!1,unlisted:!1,editUrl:"https://github.com/fastschema/website/tree/main/docs/APIs/update.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Create",permalink:"/docs/APIs/create"},next:{title:"Delete",permalink:"/docs/APIs/delete"}},a={},o=[{value:"Payload",id:"payload",level:2},{value:"$set",id:"set",level:3},{value:"$clear",id:"clear",level:3},{value:"$add",id:"add",level:3},{value:"$expr",id:"expr",level:3},{value:"Example",id:"example",level:2},{value:"Known Issues",id:"known-issues",level:2}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,d.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"update",children:"Update"}),"\n",(0,i.jsx)(n.p,{children:"The update feature allows users to modify resources in the CMS based on specified filtering criteria. This feature supports a variety of operations, including setting field values, updating one-to-one (O2O) and one-to-many (O2M) relations, clearing fields and relations, adding entities to relations, and performing expressions-based updates."}),"\n",(0,i.jsx)(n.h2,{id:"payload",children:"Payload"}),"\n",(0,i.jsx)(n.p,{children:"The update payload is a json object that contains columns and date to be updated. The payload can include the following operations:"}),"\n",(0,i.jsx)(n.h3,{id:"set",children:"$set"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"$set"})," property is used to set fields and relations. It accepts an object with field names or relation names as keys and values to set as values."]}),"\n",(0,i.jsx)(n.p,{children:"For example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "name": "John Doe",\n  "age": 30,\n  "room": { "id": 2 },\n  "pets": [ { "id": 2 }, { "id": 3 } ],\n  "groups": [ { "id": 4 }, { "id": 5 } ],\n  "$set": {\n    "bio": "Hello World",\n    "address": "123 Main St",\n    "sub_room": { "id": 2 },\n    "sub_pets": [ { "id": 2 }, { "id": 3 } ],\n    "sub_groups": [ { "id": 4 }, { "id": 5 } ]\n  }\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"$set"})," property accepts an object with:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The field name or relation name as key. The key must be a field name or a relation name."}),"\n",(0,i.jsxs)(n.li,{children:["The value to set as value. The value type can be:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["A value: The value will be set to the field. For example:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"name"})," to ",(0,i.jsx)(n.code,{children:'"John Doe"'}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"age"})," to ",(0,i.jsx)(n.code,{children:"30"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"bio"})," to ",(0,i.jsx)(n.code,{children:'"Hello World"'}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"address"})," to ",(0,i.jsx)(n.code,{children:'"123 Main St"'}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["An entity: The entity will be set to the relation. For example:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"room"})," to ",(0,i.jsx)(n.code,{children:'{ "id": 2 }'}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"sub_room"})," to ",(0,i.jsx)(n.code,{children:'{ "id": 2 }'}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["An array of entities: The entities will be set to the relation. For example:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"pets"})," to ",(0,i.jsx)(n.code,{children:'[ { "id": 2 }, { "id": 3 } ]'}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"groups"})," to ",(0,i.jsx)(n.code,{children:'[ { "id": 4 }, { "id": 5 } ]'}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"sub_pets"})," to ",(0,i.jsx)(n.code,{children:'[ { "id": 2 }, { "id": 3 } ]'}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"sub_groups"})," to ",(0,i.jsx)(n.code,{children:'[ { "id": 4 }, { "id": 5 } ]'}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"clear",children:"$clear"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"$clear"})," property is used to clear fields and relations. It accepts an object with field names or relation names as keys and values indicating whether to clear as values."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"$clear"})," accepts an object with:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The field name or relation name as key. The key must be a field name or a relation name."}),"\n",(0,i.jsxs)(n.li,{children:["The value to clear as value. The value type can be:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["A boolean: The field or relation will be cleared. For example:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Set ",(0,i.jsx)(n.code,{children:"bio"})," and ",(0,i.jsx)(n.code,{children:"address"})," to ",(0,i.jsx)(n.code,{children:"null"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Clear the ",(0,i.jsx)(n.code,{children:"O2O"})," relation: ",(0,i.jsx)(n.code,{children:"room"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Clear the ",(0,i.jsx)(n.code,{children:"O2M"})," relation: ",(0,i.jsx)(n.code,{children:"sub_pets"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Clear the ",(0,i.jsx)(n.code,{children:"M2M"})," relation: ",(0,i.jsx)(n.code,{children:"sub_groups"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["An array of entities: The entities will be removed from the relation. For example:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Remove ",(0,i.jsx)(n.code,{children:'[{ "id": 2 }, { "id": 3 }]'})," from ",(0,i.jsx)(n.code,{children:"pets"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Remove ",(0,i.jsx)(n.code,{children:'[{ "id": 4 }, { "id": 5 }]'})," from ",(0,i.jsx)(n.code,{children:"groups"}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"add",children:"$add"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"$add"})," property is used to add values to fields and entities to relations. It accepts an object with field names or relation names as keys and values to add as values."]}),"\n",(0,i.jsxs)(n.p,{children:["Some use cases for ",(0,i.jsx)(n.code,{children:"$add"})," include:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Adding a numeric value to a numeric field."}),"\n",(0,i.jsxs)(n.li,{children:["Adding items to ",(0,i.jsx)(n.code,{children:"O2M"})," and ",(0,i.jsx)(n.code,{children:"M2M"})," relations."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"$add"})," accepts an object with:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The field name or relation name as key. The key must be a numeric field name or a relation name."}),"\n",(0,i.jsxs)(n.li,{children:["The value to add as value. The value type can be:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["A number: The value will be added to the field value. For example:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Adding ",(0,i.jsx)(n.code,{children:"1"})," to ",(0,i.jsx)(n.code,{children:"age"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Adding ",(0,i.jsx)(n.code,{children:"1000"})," to ",(0,i.jsx)(n.code,{children:"salary"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["An array of entities: The entities will be added to the relation. For example:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Adding ",(0,i.jsx)(n.code,{children:'[{ "id": 2 }, { "id": 3 }]'})," to ",(0,i.jsx)(n.code,{children:"pets"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Adding ",(0,i.jsx)(n.code,{children:'[{ "id": 4 }, { "id": 5 }]'})," to ",(0,i.jsx)(n.code,{children:"groups"}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"expr",children:"$expr"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"$expr"})," property is used to set fields with expressions. It accepts an object with field names as keys and expression strings as values:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The field name as key. The key must be a field name (not a relation name)."}),"\n",(0,i.jsx)(n.li,{children:"The expression as value. The value must be a string, and it must be a valid SQL expression."}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,i.jsx)(n.p,{children:"To update a user with ID 1 based on certain filtering criteria, the following RQL query can be used:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"PUT /api/users/1\n"})}),"\n",(0,i.jsx)(n.p,{children:"The update payload can include various operations such as setting fields, updating relations, clearing fields and relations, adding entities to relations, and performing expressions-based updates."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "name": "John Doe",\n  "age": 30,\n  "room": { "id": 2 },\n  "pets": [ { "id": 2 }, { "id": 3 } ],\n  "groups": [ { "id": 4 }, { "id": 5 } ],\n  "$set": {\n    "bio": "Hello World",\n    "address": "123 Main St",\n    "sub_room": { "id": 2 },\n    "sub_pets": [ { "id": 2 }, { "id": 3 } ],\n    "sub_groups": [ { "id": 4 }, { "id": 5 } ]\n  },\n  "$clear": {\n    "bio": true,\n    "address": true,\n    "room": true,\n    "sub_pets": true,\n    "sub_groups": true,\n    "pets": [ { "id": 2 }, { "id": 3 } ],\n    "groups": [ { "id": 4 }, { "id": 5 } ]\n  },\n  "$add": {\n    "pets": [ { "id": 2 }, { "id": 3 } ],\n    "groups": [ { "id": 4 }, { "id": 5 } ],\n    "age": 1,\n    "salary": 1000\n  },\n  "$expr": {\n    "bio": "LOWER(`bio`)",\n    "address": "CONCAT(`address`, \' \', `city`, \' \', `state`, \' \', `zip`)"\n  }\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"known-issues",children:"Known Issues"}),"\n",(0,i.jsx)(n.p,{children:"When filtering $neq operation in a relation field, the relation is not filtered properly. For example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'http://localhost:3000/api/content/category?select=id&filter={"tags.id":{"$neq":10001}}\n'})}),"\n",(0,i.jsx)(n.p,{children:"The above query will perform the following SQL query:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"SELECT * FROM `categories`\nWHERE `categories`.`id` IN (\n  SELECT `categories_tags`.`categories`\n  FROM `categories_tags`\n  JOIN `tags` AS `t1`\n  ON `categories_tags`.`tags` = `t1`.`id`\n  WHERE `id` <> 10001\n)\nORDER BY `id` DESC\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The problem is that the junction table ",(0,i.jsx)(n.code,{children:"categories_tags"})," only contains the categories that have connected tags, so the categories that have no connected tags will not be returned. The correct SQL query should be:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"SELECT * FROM `categories`\nWHERE `categories`.`id` NOT IN (\n  SELECT `categories_tags`.`categories`\n  FROM `categories_tags`\n  JOIN `tags` AS `t1`\n  ON `categories_tags`.`tags` = `t1`.`id`\n  WHERE `id` = 10001\n)\nORDER BY `id` DESC\n"})})]})}function h(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>t});var i=s(6540);const d={},l=i.createContext(d);function r(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:r(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);