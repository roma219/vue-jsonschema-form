export default {
  inputWrapper: {
    name: 'InputWrapper',
    props: (propName: string, schema: any, uiSchema = {}) => ({
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
    props: (schema: any, uiSchema: {}) => ({ options: schema.enum })
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
