import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'
import { ISchema, IUiSchema, IConfig } from '@/types'
import { getComponent } from './getComponent'

export const processSchema = (schema: JSONSchema7, uiSchema?: IUiSchema, config?: IConfig) : ISchema => {
  const { title, description, items, minLength, maxLength, minimum, maximum } = schema

  const strippedSchema : any = {
    title,
    description,
    minLength,
    maxLength,
    minimum,
    maximum,
    items,
    default: schema.default,
    enum: schema.enum,
    type: (schema.type !== 'null' && ((typeof schema.type) !== 'object')) ? schema.type : 'string'
  }

  Object.keys(strippedSchema).forEach(key => strippedSchema[key] === undefined && delete strippedSchema[key])

  if (schema.properties) {
    strippedSchema.properties = {}

    Object.entries(schema.properties).forEach(([propName, propSchema]) => {
      const propUiSchema = uiSchema?.properties?.[propName] || undefined

      strippedSchema.properties[propName] = processSchema(propSchema as JSONSchema7, propUiSchema, config)
    })
  }

  if (schema.items) {
    strippedSchema.items = processSchema(schema.items as JSONSchema7, uiSchema, config)
  }

  const component = getComponent(strippedSchema, uiSchema, config)

  return {
    ...strippedSchema,
    ...component
  }
}
