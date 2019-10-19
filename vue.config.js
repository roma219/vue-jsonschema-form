const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    node: {
      Buffer: false
    },
    externals: {
      vuelidate: 'vuelidate',
      'vuelidate/lib/validators/required': 'vuelidate/lib/validators/required',
      'vuelidate/lib/validators/minLength': 'vuelidate/lib/validators/minLength',
      'vuelidate/lib/validators/maxLength': 'vuelidate/lib/validators/maxLength',
      'vuelidate/lib/validators/minValue': 'vuelidate/lib/validators/minValue',
      'vuelidate/lib/validators/maxValue': 'vuelidate/lib/validators/maxValue'
    }
  },
  // configureWebpack: config => {
  //   // config.plugins.push(new BundleAnalyzerPlugin())

  //   config.externals = {
  //     vue: 'Vue',
  //     vuelidate: 'vuelidate'
  //   }

  //   config.node.Buffer = false

  //   if (process.env.TARGET === 'lib') {
  //     config.externals['vuelidate'] = {
  //       commonjs: 'vuelidate',
  //       commonjs2: 'vuelidate',
  //       root: 'vuelidate',
  //       amd: 'vuelidate'
  //     }
  //   }
  // },
  css: {
    extract: false
  }
}
