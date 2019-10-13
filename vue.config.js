const BundleAnalyzerPlugin = require('@bundle-analyzer/webpack-plugin')
const PacktrackerPlugin = require('@packtracker/webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin({ token: '2bba2506df16839b5fa01e3a2e56594744ad1786' }), new PacktrackerPlugin({
      project_token: '80ba883f-9a5b-495d-8676-cf33c6d4970a',
      upload: true,
      fail_build: true
    })],
    externals: {
      // 'vue': 'Vue'
    }
  },
  css: {
    extract: false
  }
}
