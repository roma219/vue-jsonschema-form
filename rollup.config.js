import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'
import progress from 'rollup-plugin-progress'

export default {
  input: 'src/JsonSchema/JsonSchema.vue',
  output: {
    format: 'esm',
    dir: 'dist',
    name: 'index',
    sourcemap: true,
    globals: {
      vue: 'Vue',
      vuelidate: 'vuelidate',
      'vuelidate/lib/validators/required': 'vuelidate/lib/validators/required',
      'vuelidate/lib/validators/minLength': 'vuelidate/lib/validators/minLength',
      'vuelidate/lib/validators/maxLength': 'vuelidate/lib/validators/maxLength',
      'vuelidate/lib/validators/minValue': 'vuelidate/lib/validators/minValue',
      'vuelidate/lib/validators/maxValue': 'vuelidate/lib/validators/maxValue'
    }
  },
  external: [
    'vue',
    'vuelidate',
    'vuelidate/lib/validators/required',
    'vuelidate/lib/validators/minLength',
    'vuelidate/lib/validators/maxLength',
    'vuelidate/lib/validators/minValue',
    'vuelidate/lib/validators/maxValue'
  ],
  plugins: [
    progress(),
    typescript(),
    vue(),
    buble({
      objectAssign: 'Object.assign'
    }),
    resolve(),
    commonjs(),
    terser(),
    visualizer({ sourcemap: true })
  ]
}
