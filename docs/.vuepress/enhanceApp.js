import JsonSchema from './../../src/JsonSchema/JsonSchema.vue'
import VueHighlightJS from 'vue-highlightjs'

export default ({ Vue, options, router, siteData })=>{
  Vue.use(VueHighlightJS)
  Vue.component('JsonSchema', JsonSchema)
}
