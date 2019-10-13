<template>
  <div id="app">
    <JsonSchema
      class="schema"
      :schema="schema"
      :ui-schema="uiSchema"
      v-model="value"
      @init-default="value = $event"
    />
    <pre>{{ formattedValue }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import JsonSchema from './JsonSchema'
import { IConfig } from '@/types'

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
    }
  }

  uiSchema = {
    properties: {
      ccc: { order: 1, uiType: 'radio' },
      ddd: {
        properties: {
          b2: { order: 2 },
          ddd: { order: 1 }
        }
      }
    }
  }

  elementsUiConfig : IConfig = {
    components: [{
      matcher: {
        type: 'number'
      },
      componentName: 'ElInputNumber',
      eventName: 'input',
      props: (schema, uiSchema) => ({ min: schema.minimum, max: schema.maximum })
    },
    {
      matcher: {
        type: 'string'
      },
      componentName: 'ElInput',
      eventName: 'input'
    }, {
      matcher: {
        type: 'boolean'
      },
      componentName: 'ElCheckbox',
      eventName: 'input'
    }]
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
  padding: 20px 0;
}

.schema {
  margin-right: 100px;
}
</style>
