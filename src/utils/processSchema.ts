import { JSONSchema7 } from 'json-schema'
import { ISchema, IUiSchema, IConfig, ComponentsConfig } from '@/types'
import { getComponent } from './getComponent'

export const processSchema = (schema: JSONSchema7, uiSchema?: IUiSchema, componentsConfig?: ComponentsConfig) : ISchema => {
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

      strippedSchema.properties[propName] = processSchema(propSchema as JSONSchema7, propUiSchema, componentsConfig)
    })
  }

  if (schema.items) {
    strippedSchema.items = processSchema(schema.items as JSONSchema7, uiSchema, componentsConfig)
  }

  // const component = getComponent(strippedSchema, componentsConfig, uiSchema)

  // todo: process conditions ("then") aswell

  return {
    ...strippedSchema,
    // ...component
  }
}
