import { JSONSchema7 } from 'json-schema'
import { ISchema } from '@/types'

export const processSchema = (schema: JSONSchema7) : ISchema => {
  const strippedSchema : any = {
    ...schema,
    type: (schema.type !== 'null' && ((typeof schema.type) !== 'object')) ? schema.type : 'string'
  }

  if (schema.properties) {
    strippedSchema.properties = {}

    Object.entries(schema.properties).forEach(([propName, propSchema]) => {
      strippedSchema.properties[propName] = processSchema(propSchema as JSONSchema7)
    })
  }

  if (schema.items) strippedSchema.items = processSchema(schema.items as JSONSchema7)

  return strippedSchema
}
