import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'
import { isMatch } from 'underscore'
import { IComponent } from '@/types/jsonschema'

const defaultConfig = [{
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

export const getComponent = (schema: JSONSchema7, uiSchema = {}, config = {}) : IComponent | undefined => {
  const result = defaultConfig.find(configItem => {
    if (configItem.matcher) return isMatch(schema, configItem.matcher)
    if (configItem.contains) return schema.hasOwnProperty(configItem.contains)

    return false
  })

  if (!result) console.warn(`[vue-jsonschema-form] couldnt detect component for schema: ${schema}`)

  return result
}
