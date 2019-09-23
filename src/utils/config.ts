import { IConfig } from '@/types'

const config : IConfig = {
  inputWrapper: {
    name: 'InputWrapper',
    props: (propName, schema, uiSchema) => ({
      title: schema.title || propName
    })
  },
  components: [{
    matcher: {
      type: 'object'
    },
    name: 'JsonSchemaForm',
    eventName: 'input'
  }, {
    contains: 'enum',
    name: 'Select',
    eventName: 'input',
    props: (schema, uiSchema) => ({ options: schema.enum })
  }, {
    matcher: {
      type: 'string'
    },
    name: 'TextInput',
    eventName: 'input'
  }, {
    matcher: {
      type: 'boolean'
    },
    name: 'Checkbox',
    eventName: 'input'
  }]
}

export default config
