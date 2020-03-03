import { ComponentsConfig, WrapperComponentConfig } from '@/types'

export const defaultComponents : ComponentsConfig = [{
  matcher: {
    type: 'array'
  },
  componentName: 'JsonSchemaArray',
  eventName: 'input'
}, {
  uiSchemaMatcher: {
    uiType: 'radio'
  },
  componentName: 'Radio',
  eventName: 'input',
  props: (propName, schema) => ({ options: schema.enum })
}, {
  matcher: {
    type: 'object'
  },
  componentName: 'JsonSchemaForm',
  eventName: 'input'
}, {
  contains: 'enum',
  componentName: 'Select',
  eventName: 'input',
  props: (propName, schema, uiSchema) => ({ options: schema.enum })
}, {
  matcher: {
    type: 'number'
  },
  componentName: 'TextInput',
  props: () => ({ type: 'number' }),
  eventName: 'input'
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
}]

export const inputWrapper : WrapperComponentConfig = {
  componentName: 'InputWrapper',
  props: (propName, schema, uiSchema) => ({
    title: schema.title || schema.title === '' ? schema.title : propName,
    disabled: uiSchema?.disabled,
    vertical: schema.type === 'object' || schema.type === 'array'
  })
}
