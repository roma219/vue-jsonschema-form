<template>
  <div id="app">
    <JsonSchema :schema="testSchema" v-model="testValue"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import JsonSchema from './components/JsonSchema/index.vue'

@Component({
  name: 'App',
  components: {
    JsonSchema
  }
})
export default class App extends Vue {
  testSchema = {
    type: 'object',
    properties: {
      aaa: { type: 'string', __component__: 'TextInput', __eventName__: 'input' },
      bbb: { type: 'boolean', __component__: 'Checkbox', __eventName__: 'input' },
      ccc: { type: 'enum', __component__: 'Select', __eventName__: 'input', enum: [1, 2, 3] },
      ddd: {
        type: 'object',
        __component__: 'JsonSchemaForm',
        __eventName__: 'input',
        properties: {
          a1: { type: 'string', __component__: 'TextInput', __eventName__: 'input' },
          b2: { type: 'boolean', __component__: 'Checkbox', __eventName__: 'input' }
        }
      }
    }
  }

  testValue = {
    aaa: '123asd',
    bbb: true,
    value: 3
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
