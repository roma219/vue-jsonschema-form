require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  title: 'Vue JSON Schema',
  description: 'JSON Schema-based form generator - simple and customizable',
  base: '/vue-jsonschema-form/',
  publicPath: 'docs/.vuepress/dist/',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    repo: 'roma219/vue-jsonschema-form',
    docsDir: 'docs',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: [
      {
        title: 'Installation',   // required
        path: '/installation/',      // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 0,
        children: [
          '/'
        ]
      },
      {
        title: 'Usage',   // required
        path: '/usage/',      // optional, which should be a absolute path.
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/'
        ]
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
