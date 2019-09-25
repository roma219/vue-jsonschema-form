module.exports = {
  title: 'Vue JSON Schema',
  description: 'JSON Schema-based form generator - simple and customizable',
  base: '/vue-jsonschema-form/',
  themeConfig: {
    repo: 'roma219/vue-jsonschema-form',
    docsDir: 'docs',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: [
      {
        title: 'Usage',   // required
        path: '/foo/',      // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/'
        ]
      },
      {
        title: 'Customization',   // required
        path: '/bar/',      // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/'
        ]
      }
    ]
  }
}
