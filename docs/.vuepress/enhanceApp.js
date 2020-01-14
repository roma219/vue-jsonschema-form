import JsonSchema from './../../src/JsonSchema/JsonSchema.vue'
import JsonSchemaForm from './../../src/JsonSchema/JsonSchemaForm.vue'
import JsonSchemaArray from './../../src/JsonSchema/JsonSchemaArray.vue'
import TextInput from './../../src/components/TextInput.vue'
import Checkbox from './../../src/components/Checkbox.vue'
import Radio from './../../src/components/Radio.vue'
import Select from './../../src/components/Select.vue'
import InputWrapper from './../../src/components/InputWrapper.vue'
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
  Vue.component('JsonSchemaArray', JsonSchemaArray)
  Vue.component('JsonSchemaForm', JsonSchemaForm)
  Vue.component('TextInput', TextInput)
  Vue.component('Checkbox', Checkbox)
  Vue.component('Radio', Radio)
  Vue.component('Select', Select)
  Vue.component('InputWrapper', InputWrapper)
}
