import { JSONSchema7 } from 'json-schema'
import { ISchema, IUiSchema, ComponentsConfig } from '@/types'
import { getComponent } from './getComponent'

export const processSchema = (schema: JSONSchema7) : ISchema => {
  const { title, description, items, minLength, maxLength, minimum, maximum } = schema

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
