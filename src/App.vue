<template>
  <div id="app">
    <JsonSchema
      :config="config"
      :schema="schema"
      :ui-schema="uiSchema"
      v-model="value"
    />
    <pre>{{ formattedValue }}</pre>
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
  schema = {
    type: 'object',
    properties: {
      aaa: { type: 'string' },
      bbb: { type: 'boolean' },
      ccc: { type: 'string', enum: ['1', '2', '3'] },
      ddd: {
        type: 'object',
        properties: {
          a1: { type: 'string' },
          b2: { type: 'boolean' },
          ddd: {
            type: 'object',
            properties: {
              a1: { type: 'string' },
              b2: { type: 'boolean' }
            }
          }
        }
      }
    }
  }

  uiSchema = {

  }

  config = {

  }

  value = {
    aaa: '123asd',
    bbb: true,
    ccc: 3
  }

  get formattedValue () : string {
    return JSON.stringify(this.value, null, 2)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
