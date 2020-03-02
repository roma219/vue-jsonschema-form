import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-replace'

export default {
  input: 'src/entry.ts',
  output: {
    format: 'esm',
    dir: 'dist',
    name: 'index',
    sourcemap: true
    // globals: {
    //   vue: 'Vue',
    //   vuelidate: 'vuelidate'
    // }
  },
  // external: [
  //   'vue',
  //   'vuelidate',
  //   'vuelidate/*'
  // ],
  plugins: [
    progress(),
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BUILD': JSON.stringify('web')
    }),
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
