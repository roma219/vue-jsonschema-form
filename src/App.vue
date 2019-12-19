<template>
  <div id="app">
    <JsonSchema
      class="schema"
      :schema="schema"
      :ui-schema="uiSchema"
      v-model="value"
    />
    <pre>{{ formattedValue }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import JsonSchema from './JsonSchema'

const schema = {
  type: 'object',
  properties: {
    aaa: { type: 'number', maximum: 10 },
    arr: {
      type: 'array',
      items: { type: 'object', properties: { a: { type: 'string', minLength: 2 }, b: { type: 'boolean' } } }
    },
    bbb: { type: 'boolean' },
    ccc: { type: 'string', enum: ['1', '2', '3'], format: 'radio' },
    ddd: {
      type: 'object',
      title: '',
      properties: {
        a1: { type: 'string', minLength: 1, maxLength: 5 },
        b2: { type: 'boolean', default: true },
        ddd: {
          type: 'object',
          properties: {
            a1: { type: 'string', default: 'aaa' },
            b2: { type: 'boolean' }
          }
        }
      }
    }
  },
  if: {
    properties: {
      aaa: {
        const: 10
      }
    }
  },
  then: {
    properties: {
      newField: { type: 'string' }
    }
  }
}

@Component({
  name: 'App',
  components: { JsonSchema }
})
export default class App extends Vue {
  get schema () {
    return schema
  }

  uiSchema = {
    properties: {
      ccc: { order: 1, uiType: 'radio', disabled: true },
      ddd: {
        properties: {
          b2: { order: 2 },
          ddd: { order: 1 }
        }
      }
    }
  }

  value = {
    arr: [{ a: 'qwerty', b: true }],
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
  padding: 20px 0;
}

.schema {
  margin-right: 100px;
  width: 400px!important;
}
</style>
