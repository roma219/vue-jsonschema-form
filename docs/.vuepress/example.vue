<JsonSchema
  :schema="{
    type: 'object',
    properties: {
      a: { type: 'string', title: 'Text Input' },
      b: { type: 'number' },
      c: { type: 'boolean', default: true }
    }
  }"
  v-model="value"
/>
