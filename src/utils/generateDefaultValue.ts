import { ISchema } from '@/types'
import { JSONSchema7 } from 'json-schema'

export const generateDefaultValue = (schema: ISchema) : { [key: string]: any } => {
  let defaultValue = schema.default

  if (schema.type === 'object') {
    defaultValue = {}
    if (schema.properties) {
      Object.entries(schema.properties).forEach(([propName, value]) => {
        if (value.default || value.type === 'object') defaultValue[propName] = generateDefaultValue(value)
      })
    }
  }

  return defaultValue
}
