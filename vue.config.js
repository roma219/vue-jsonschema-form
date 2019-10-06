const BundleAnalyzerPlugin = require('@bundle-analyzer/webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin({ token: '2bba2506df16839b5fa01e3a2e56594744ad1786' })],
    externals: {
      lodash: {
        commonjs: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  },
  css: {
    extract: false
  }
}
