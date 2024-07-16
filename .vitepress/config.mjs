import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';

export default defineConfig({
  srcDir: './src',
  outDir: './build',
  title: "FastSchema",
  titleTemplate: ":title - FastSchema",
  description: "A web framework and headless CMS written in Go",
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
          text: 'Headless CMS API',
          link: '/docs/headless-cms/',
          collapsed: false,
          items: [
            { text: 'Authentication', link: '/docs/headless-cms/authentication' },
            { text: 'List records', link: '/docs/headless-cms/list-records' },
            { text: 'Create record', link: '/docs/headless-cms/create-record' },
            { text: 'Update record', link: '/docs/headless-cms/update-record' },
            { text: 'Delete record', link: '/docs/headless-cms/delete-record' },
            { text: 'Bulk update', link: '/docs/headless-cms/bulk-update' },
            { text: 'Bulk delete', link: '/docs/headless-cms/bulk-delete' },
            { text: 'Realtime updates', link: '/docs/headless-cms/realtime-updates' },
          ],
        },
        {
          text: 'Web Framework',
          link: '/docs/web-framework/',
          collapsed: false,
          items: [
            {
              text: 'Application',
              link: '/docs/web-framework/application',
            },
            {
              text: 'Resource',
              link: '/docs/web-framework/resource/',
              collapsed: false,
              items: [
                { text: 'Handler', link: '/docs/web-framework/resource/handler' },
                { text: 'Meta', link: '/docs/web-framework/resource/meta' },
                { text: 'Helpers', link: '/docs/web-framework/resource/helpers' },
                { text: 'OpenAPI Spec', link: '/docs/web-framework/resource/openapi-spec' },
                { text: 'Resource resolver', link: '/docs/web-framework/resource/resolver' },
              ],
            },
            {
              text: 'Database',
              link: '/docs/web-framework/database/',
              collapsed: false,
              items: [
                { text: 'System Schema', link: '/docs/web-framework/database/system-schema' },
                { text: 'Query', link: '/docs/web-framework/database/query' },
                { text: 'Mutation', link: '/docs/web-framework/database/mutation' },
                { text: 'Relations', link: '/docs/web-framework/database/relations' },
                { text: 'Raw SQL', link: '/docs/web-framework/database/raw-sql' },
                { text: 'Migrations', link: '/docs/web-framework/database/migrations' },
              ],
            },
            { text: 'Hooks', link: '/docs/web-framework/hooks/' },
            { text: 'Logging', link: '/docs/web-framework/logging/' },
            { text: 'Storage', link: '/docs/web-framework/storage/' },
            { text: 'Testing', link: '/docs/web-framework/testing/' },
            { text: 'Deployment', link: '/docs/web-framework/deployment/' },
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
})
