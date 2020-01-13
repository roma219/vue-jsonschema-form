require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  title: 'Vue JSON Schema',
  description: 'JSON Schema-based form generator - simple and customizable',
  base: '/vue-jsonschema-form/',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    repo: 'roma219/vue-jsonschema-form',
    docsDir: 'docs',
    search: true,
    displayAllHeaders: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: [
      {
        title: 'Guide',
        path: '/guide/',
        collapsable: false,
        sidebarDepth: 1
      },
      {
        title: 'Examples',
        path: '/examples/'
      }
    ]
  },
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // All options of ts-loader
        },
      },
      'register-components',
      {
        componentsDir: 'JsonSchema/'
      }
    ]
  ],
  configureWebpack: (config) => {
    return { plugins: [
      new webpack.EnvironmentPlugin({ ...process.env })
    ]}
  }
}
