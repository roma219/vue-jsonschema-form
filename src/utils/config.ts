import { IConfig } from '@/types'

const config : IConfig = {
  inputWrapper: {
    name: 'InputWrapper',
    props: (propName, schema, uiSchema) => ({
      title: schema.title || schema.title === '' ? schema.title : propName
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
      type: 'number'
    },
    name: 'ElInputNumber',
    eventName: 'input',
    props: (schema, uiSchema) => ({ min: schema.minimum, max: schema.maximum })
  },
  {
    matcher: {
      type: 'string'
    },
    // name: 'TextInput',
    name: 'ElInput',
    eventName: 'input'
  }, {
    matcher: {
      type: 'boolean'
    },
    // name: 'Checkbox',
    name: 'ElCheckbox',
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
