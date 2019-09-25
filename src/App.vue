<template>
  <div id="app">
    <JsonSchema
      class="schema"
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
      aaa: { type: 'string', minLength: 1 },
      bbb: { type: 'boolean' },
      ccc: { type: 'string', enum: ['1', '2', '3'] },
      ddd: {
        type: 'object',
        title: '',
        properties: {
          a1: { type: 'string', minLength: 1, maxLength: 5 },
          b2: { type: 'boolean' },
          ddd: {
            type: 'object',
            properties: {
              a1: { type: 'number', minimum: 3, maximum: 10 },
              b2: { type: 'boolean' }
            }
          }
        }
      }
    }
  }

  uiSchema = {
    properties: {
      ccc: { order: 1 },
      ddd: {
        properties: {
          b2: { order: 2 },
          ddd: { order: 1 }
        }
      }
    }
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
  color: #2c3e50;
  display: flex;
  padding: 20px;
}

.schema {
  margin-right: 100px;
}
</style>
