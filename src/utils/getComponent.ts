import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'
import { isMatch } from 'underscore'
import { IComponent, ISchema } from '@/types'
import config from './config'

export const getComponent = (schema: ISchema, uiSchema = {}) : IComponent | undefined => {
  const component = config.components.find(configItem => {
    if (configItem.matcher) return isMatch(schema, configItem.matcher)
    if (configItem.contains) return schema.hasOwnProperty(configItem.contains) && !!(schema as any)[configItem.contains]

    return false
  })

  if (!component) console.warn(`[vue-jsonschema-form] couldnt detect component for schema: ${schema}`)

  return component
}
