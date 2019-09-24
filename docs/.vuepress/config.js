module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  base: '/vue-jsonschema-form/',
  themeConfig: {
    repo: 'roma219/vue-jsonschema-form',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'hmhm', link: 'https://google.com' }
    ],
    sidebar: [
      {
        title: 'Group 1',   // required
        path: '/foo/',      // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/'
        ]
      }
    ]
  }
}
