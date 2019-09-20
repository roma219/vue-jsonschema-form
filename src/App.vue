<template>
  <div id="app">
    <JsonSchema :schema="testSchema" v-model="testValue"/>
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
  testSchema = {
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

  testValue = {
    aaa: '123asd',
    bbb: true,
    ccc: 3
  }

  get formattedValue () : string {
    return JSON.stringify(this.testValue, null, 2)
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
