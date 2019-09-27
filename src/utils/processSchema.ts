import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'
import { ISchema, IUiSchema, IConfig } from '@/types'
import { getComponent } from './getComponent'
import pick from 'lodash/pick'

export const processSchema = (schema: JSONSchema7, uiSchema ?: IUiSchema, config ?: IConfig) : ISchema => {
  const strippedSchema : any = {
    ...pick(schema, ['title', 'description', 'minLength', 'maxLength', 'minimum', 'maximum']),
    type: (schema.type && schema.type !== 'null' && ((typeof schema.type) !== 'object')) ? schema.type : 'string'
  }

  if (schema.properties) {
    strippedSchema.properties = {}

    Object.entries(schema.properties).forEach(([propName, propSchema]) => {
      const propUiSchema = (uiSchema && uiSchema.properties && uiSchema.properties[propName]) || undefined

      strippedSchema.properties[propName] = processSchema(propSchema as JSONSchema7, propUiSchema, config)
    })
  }

  const component = getComponent(strippedSchema, uiSchema, config)

  return {
    ...strippedSchema,
    ...component
  }
}
