// if (!process) process = {}n
// console.log(process)
import JsonSchema from './../../src/JsonSchema/JsonSchema.vue'
import VueHighlightJS from 'vue-highlightjs'
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/ocean.css';
import './styles.css'

export default ({ Vue, options, router, siteData })=>{
  Vue.use(VueHighlightJS, {
    languages: {
      javascript,
      json
    }
  })
  Vue.component('JsonSchema', JsonSchema)
}
