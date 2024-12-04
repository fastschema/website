import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import { withMermaid } from 'vitepress-plugin-mermaid';

const config = defineConfig({
  srcDir: './src',
  outDir: './build',
  title: "FastSchema",
  titleTemplate: ":title - FastSchema",
  description: "All-in-One Backend as a Service with Headless CMS Power",
  ignoreDeadLinks: true,
  lastUpdated: true,
  head: [
    ['link', {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/fastschema-logo-small.svg'
    }],
    ['link', {
      rel: 'icon',
      type: 'image/png',
      href: '/fastschema-logo-small.png'
    }],
  ],
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  },
  sitemap: {
    hostname: 'https://fastschema.com',
    lastmodDateOnly: false,
  },
  themeConfig: {
    logo: '/static/images/logo.svg',
    editLink: {
      pattern: 'https://github.com/fastschema/website/edit/master/src/:path'
    },
    search: {
      provider: 'algolia',
      options: {
        appId: 'OY3YHFZHM7',
        apiKey: '30e67619561e5281c059434069557cd7',
        indexName: 'fastschema'
      },
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/docs/getting-started' },
    ],
    sidebar: {
      '/docs/': [
        {
          text: 'Introduction',
          link: '/docs/',
          collapsed: false,
          items: [
            { text: 'Getting Started', link: '/docs/getting-started' },
            { text: 'Configuration', link: '/docs/configuration' },
            { text: 'Directory Structure', link: '/docs/directory-structure' },
            { text: 'Concepts', link: '/docs/concepts' },
          ]
        },
        {
          text: 'Backend',
          link: '/docs/backend/',
          collapsed: false,
          items: [
            { text: 'Access Control', link: '/docs/backend/access-control' },
            { text: 'Authentication', link: '/docs/backend/authentication' },
            { text: 'List records', link: '/docs/backend/list-records' },
            { text: 'Create record', link: '/docs/backend/create-record' },
            { text: 'Update record', link: '/docs/backend/update-record' },
            { text: 'Delete record', link: '/docs/backend/delete-record' },
            { text: 'Bulk update', link: '/docs/backend/bulk-update' },
            { text: 'Bulk delete', link: '/docs/backend/bulk-delete' },
            { text: 'Realtime updates', link: '/docs/backend/realtime-updates' },
          ],
        },
        {
          text: 'Plugins',
          link: '/docs/plugins/',
          collapsed: false,
          items: [
            { text: 'Configuration', link: '/docs/plugins/configuration' },
            { text: 'Initialization', link: '/docs/plugins/initialization' },
            { text: 'APIs', link: '/docs/plugins/apis' },
            { text: 'Rules', link: '/docs/plugins/rules' },
          ],
        },
        {
          text: 'Framework',
          link: '/docs/framework/',
          collapsed: false,
          items: [
            {
              text: 'Application',
              link: '/docs/framework/application',
            },
            {
              text: 'Resource',
              link: '/docs/framework/resource/',
              collapsed: false,
              items: [
                { text: 'Handler', link: '/docs/framework/resource/handler' },
                { text: 'Meta', link: '/docs/framework/resource/meta' },
                { text: 'Helpers', link: '/docs/framework/resource/helpers' },
                { text: 'OpenAPI Spec', link: '/docs/framework/resource/openapi-spec' },
                { text: 'Resource resolver', link: '/docs/framework/resource/resolver' },
              ],
            },
            {
              text: 'Database',
              link: '/docs/framework/database/',
              collapsed: false,
              items: [
                { text: 'System Schema', link: '/docs/framework/database/system-schema' },
                { text: 'Query', link: '/docs/framework/database/query' },
                { text: 'Mutation', link: '/docs/framework/database/mutation' },
                { text: 'Relations', link: '/docs/framework/database/relations' },
                { text: 'Raw SQL', link: '/docs/framework/database/raw-sql' },
                { text: 'Transaction', link: '/docs/framework/database/transaction' },
                { text: 'Migrations', link: '/docs/framework/database/migrations' },
              ],
            },
            { text: 'Hooks', link: '/docs/framework/hooks/' },
            { text: 'Logging', link: '/docs/framework/logging/' },
            { text: 'Storage', link: '/docs/framework/storage/' },
            { text: 'Mail', link: '/docs/framework/mail/' },
            { text: 'Testing', link: '/docs/framework/testing/' },
            { text: 'Deployment', link: '/docs/framework/deployment/' },
          ],
        },
        {
          text: 'SDK',
          link: '/docs/sdk/',
          collapsed: false,
        }
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/fastschema/fastschema' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/ngocphuongnb" target="_blank">Ngoc Phuong</a> and contributors.'
    },
  }
});

export default withMermaid({
  ...config,
  mermaid: {
    // https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults
  },
  mermaidPlugin: {
    class: 'mermaid',
  },
});
