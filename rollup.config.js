import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/JsonSchema/JsonSchema.vue',
  output: {
    format: 'esm',
    file: 'dist/JsonSchema.js'
  },
  plugins: [
    vue({
      defaultLang: { script: 'ts' }
    }),
    typescript({
      typescript: require('typescript'),
      objectHashIgnoreUnknownHack: true
    })
  ]
}
