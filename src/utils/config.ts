import { IConfig } from '@/types'

const config : IConfig = {
  inputWrapper: {
    componentName: 'InputWrapper',
    props: (propName, schema, uiSchema) => ({
      title: schema.title || schema.title === '' ? schema.title : propName,
      vertical: schema.type === 'object'
    })
  },
  components: [{
    matcher: {
      type: 'object'
    },
    componentName: 'JsonSchemaForm',
    eventName: 'input'
  }, {
    contains: 'enum',
    componentName: 'Select',
    eventName: 'input',
    props: (schema, uiSchema) => ({ options: schema.enum })
  }, {
    matcher: {
      type: 'string'
    },
    componentName: 'TextInput',
    eventName: 'input'
  }, {
    matcher: {
      type: 'boolean'
    },
    componentName: 'Checkbox',
    eventName: 'input'
  }],
  errorMessages: {
    minLength: (value: number) => `Minimal length: ${value}`,
    maxLength: (value: number) => `Maximum length: ${value}`,
    minValue: (value: number) => `Minimal value: ${value}`,
    maxValue: (value: number) => `Maximum value: ${value}`,
    required: 'Field is required',
    default: 'Invalid Value'
  }
}

export default config
