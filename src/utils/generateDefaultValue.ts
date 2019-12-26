import { ISchema } from '@/types'
import { JSONSchema7 } from 'json-schema'

export const generateDefaultValue = (schema: ISchema) : { [key: string]: any } => {
  let defaultValue = schema.default

  if (schema.type === 'object') {
    defaultValue = {}
    Object.entries(schema.properties || {}).forEach(([propName, value]) => {
      console.log(value.default, value.type)
      if (value.default || value.type === 'object') defaultValue[propName] = generateDefaultValue(value)
    })
  }

  return defaultValue
}
