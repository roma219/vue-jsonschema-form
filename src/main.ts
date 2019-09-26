import Vue from 'vue'
import App from './App.vue'
import { Input, InputNumber, Checkbox, FormItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Input.name, Input)
Vue.component(Checkbox.name, Checkbox)
Vue.component(InputNumber.name, InputNumber)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
